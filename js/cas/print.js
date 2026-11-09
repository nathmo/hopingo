// AST → text. toText gives keypad text that parse() reads back (the same
// tree for parsed input; the same value for trees built by the
// constructors, which have no brackets of their own). toReadable gives a
// display text: x², ·, −, ′ (for review files and short messages).

const PREC = { rel: 0, sum: 1, prod: 2, neg: 3, frac: 4, pow: 5, atom: 6 };

export function prec(n) {
  switch (n.t) {
    case 'rel': return PREC.rel;
    case 'bin': return n.op === '+' || n.op === '-' ? PREC.sum : PREC.prod;
    case 'neg': return PREC.neg;
    case 'frac': return PREC.frac;
    case 'pow': return PREC.pow;
    case 'float': return n.x < 0 ? PREC.neg : PREC.atom;
    default: return PREC.atom;
  }
}

const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻' };
const CONST_TEXT = { pi: 'π', e: 'e', i: 'i', inf: '∞' };

// Can this right factor follow a number without a × sign? (3x, 2sin(x), 5(x+1))
function startsWithLetter(n) {
  switch (n.t) {
    case 'sym': case 'const': case 'fn': case 'sqrt': case 'paren': case 'deriv': case 'root': return true;
    case 'pow': return startsWithLetter(n.b) && n.b.t !== 'num';
    case 'bin':
      if (n.op === '+' || n.op === '-') return true; // printed in brackets
      return n.op === '×' && n.implicit !== false && startsWithLetter(n.l);
    default: return false;
  }
}

function printer(style, opts) {
  const readable = style === 'readable';
  const dvar = opts.dvar || 'x';
  const marks = opts.marks || null;
  const MINUS = readable ? '−' : '-';
  let inArgs = 0;

  const wrap = (n, min) => (prec(n) < min ? `(${P(n)})` : P(n));

  function P(n) {
    const s = body(n);
    return marks?.has(n) ? `⟦${s}⟧` : s;
  }

  function body(n) {
    switch (n.t) {
      case 'num': return inArgs ? n.s.replace(',', '.') : n.s;
      case 'float': return String(n.x).replace('.', inArgs ? '.' : ',').replace('-', MINUS);
      case 'const': return CONST_TEXT[n.name] ?? n.name;
      case 'sym': {
        if (!n.sub) return n.name;
        if (typeof n.sub !== 'object') return `${n.name}_${n.sub}`;
        const sub = n.sub.t === 'paren' ? n.sub : (n.sub.t === 'num' || n.sub.t === 'sym' ? n.sub : { t: 'paren', e: n.sub });
        return `${n.name}_${P(sub)}`;
      }
      case 'blank': return '□';
      case 'paren': return `(${P(n.e)})`;
      case 'neg': {
        const e = n.e;
        return `${MINUS}${prec(e) <= PREC.sum || e.t === 'neg' ? `(${P(e)})` : P(e)}`;
      }
      case 'bin': {
        if (n.op === '+' || n.op === '-') {
          const r = n.r.t === 'neg' || prec(n.r) < (n.op === '-' ? PREC.prod : PREC.sum) ? `(${P(n.r)})` : P(n.r);
          const op = n.op === '-' ? MINUS : '+';
          return readable && !inArgs ? `${P(n.l)} ${op} ${r}` : `${P(n.l)}${op}${r}`;
        }
        if (n.op === '÷') return `${wrap(n.l, PREC.prod)}÷${n.r.t === 'neg' ? `(${P(n.r)})` : wrap(n.r, PREC.neg)}`;
        const l = wrap(n.l, PREC.prod);
        // Built trees may nest products to the right: a·(b·c) needs no brackets.
        const rProd = n.r.t === 'bin' && n.r.op === '×';
        const juxt = n.implicit === true
          || (n.implicit === undefined && n.l.t === 'num' && startsWithLetter(n.r) && (prec(n.r) >= PREC.pow || rProd || prec(n.r) === PREC.sum));
        if (juxt) return `${l}${prec(n.r) < PREC.frac && !rProd ? `(${P(n.r)})` : P(n.r)}`;
        const r = n.r.t === 'neg' || (prec(n.r) < PREC.neg && !(rProd && n.implicit === undefined)) ? `(${P(n.r)})` : P(n.r);
        return `${l}${readable ? '·' : '×'}${r}`;
      }
      case 'frac': return `${wrap(n.n, PREC.pow)}/${wrap(n.d, PREC.pow)}`;
      case 'pow': {
        const b = wrap(n.b, PREC.atom);
        const e = n.e;
        if (readable) {
          const v = e.t === 'num' ? e.s : e.t === 'neg' && e.e.t === 'num' ? `-${e.e.s}` : null;
          if (v && /^-?\d+$/.test(v)) return b + [...v].map((c) => SUP[c]).join('');
        }
        if (e.t === 'neg' && prec(e.e) === PREC.atom) return `${b}^${MINUS}${P(e.e)}`;
        return `${b}^${prec(e) === PREC.atom ? P(e) : `(${P(e)})`}`;
      }
      case 'sqrt': return `√${wrap(n.e, PREC.atom)}`;
      case 'root': { inArgs++; const s = `root(${P(n.n)},${P(n.e)})`; inArgs--; return s; }
      case 'abs': return `|${P(n.e)}|`;
      case 'fn': return `${n.name}(${n.args.map(P).join(',')})`;
      case 'deriv': {
        if (n.e.t === 'paren') return body({ ...n, e: n.e.e });
        if (readable) {
          const marksN = "'".repeat(n.n).replace(/'/g, '′');
          const inner = n.e.t === 'sym' ? P(n.e) : `(${P(n.e)})`;
          return n.v === dvar ? `${inner}${marksN}` : `d${n.n > 1 ? n.n : ''}/d${n.v}${n.n > 1 ? n.n : ''} ${inner}`;
        }
        inArgs++;
        const e = P(n.e);
        inArgs--;
        if (n.n === 1 && n.v === dvar) return `d(${e})`;
        return n.n === 1 ? `d(${e},${n.v})` : `d(${e},${n.v},${n.n})`;
      }
      case 'rel': {
        const op = readable ? ` ${n.op} ` : n.op;
        return `${P(n.l)}${op}${P(n.r)}`;
      }
      default: throw new Error(`Cannot print node ${n.t}`);
    }
  }
  return P;
}

// opts.dvar: the variable d(f) means (default x). opts.marks: a Set of
// nodes to wrap in ⟦ ⟧ (used to locate blanks).
export const toText = (node, opts = {}) => printer('text', opts)(node);
export const toReadable = (node, opts = {}) => printer('readable', opts)(node);
