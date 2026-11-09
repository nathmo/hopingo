// AST → text. toText gives keypad text that parse() reads back (the same
// tree for parsed input; the same value for trees built by the
// constructors, which have no brackets of their own). toReadable gives a
// display text: x², ·, −, ′ (for review files and short messages).

const PREC = {
  list: -5, imp: -4, or: -3, and: -2, not: -1, rel: 0, union: 0.3, inter: 0.6, sum: 1, prod: 2, neg: 3, frac: 4, pow: 5, atom: 6,
};
export { PREC };
const SUB = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' };

export function prec(n) {
  switch (n.t) {
    case 'list': return PREC.list;
    case 'logic': return n.op === 'and' ? PREC.and : n.op === 'or' ? PREC.or : PREC.imp;
    case 'not': return PREC.not;
    case 'rel': case 'chain': case 'in': return PREC.rel;
    case 'setop': return n.op === '∪' ? PREC.union : PREC.inter;
    case 'bin': return n.op === '+' || n.op === '-' ? PREC.sum : PREC.prod;
    case 'neg': return PREC.neg;
    case 'frac': return PREC.frac;
    case 'pow': return PREC.pow;
    case 'float': return n.x < 0 ? PREC.neg : PREC.atom;
    case 'sum': return PREC.prod; // Σ reads like a prefix: (Σ k)² keeps its brackets
    default: return PREC.atom;
  }
}

const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻' };
const CONST_TEXT = { pi: 'π', e: 'e', i: 'i', inf: '∞' };
export const LOGIC_SYMBOL = { and: '∧', or: '∨', imp: '⇒', iff: '⇔' };
// Conditions on a variable read as words, as in the course: x > 0 et x < 3.
export const LOGIC_WORD = { and: 'et', or: 'ou', imp: '⇒', iff: '⇔' };

// Can this right factor follow a number without a × sign? (3x, 2sin(x), 5(x+1))
function startsWithLetter(n) {
  switch (n.t) {
    case 'sym': case 'const': case 'fn': case 'sqrt': case 'paren': case 'deriv': case 'root': case 'sum': return true;
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
        if (juxt) return `${l}${prec(n.r) < PREC.frac && !rProd && n.r.t !== 'sum' ? `(${P(n.r)})` : P(n.r)}`;
        const r = n.r.t === 'neg' || (prec(n.r) < PREC.neg && n.r.t !== 'sum' && !(rProd && n.implicit === undefined)) ? `(${P(n.r)})` : P(n.r);
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
      case 'sum': {
        if (readable) return `Σ_{${n.k}=${P(n.lo)}}^{${P(n.hi)}} ${prec(n.e) < PREC.prod || n.e.t === 'neg' ? `(${P(n.e)})` : P(n.e)}`;
        inArgs++;
        const s = `sum(${P(n.e)},${n.k},${P(n.lo)},${P(n.hi)})`;
        inArgs--;
        return s;
      }
      case 'abs': return `|${P(n.e)}|`;
      case 'fn': {
        if (n.name === 'logb') {
          const b = n.args[0].t === 'paren' ? n.args[0].e : n.args[0];
          const simple = b.t === 'num' || b.t === 'sym' || b.t === 'const';
          if (readable && b.t === 'num' && /^\d+$/.test(b.s)) return `log${[...b.s].map((c) => SUB[c]).join('')}(${P(n.args[1])})`;
          return `log_${simple ? P(b) : `(${P(b)})`}(${P(n.args[1])})`;
        }
        return `${n.name}(${n.args.map(P).join(',')})`;
      }
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
      case 'chain': return n.items.map((x, i) => (i ? `${readable ? ` ${n.ops[i - 1]} ` : n.ops[i - 1]}${P(x)}` : P(x))).join('');
      case 'in': return `${P(n.l)}${readable ? ` ${n.op} ` : n.op}${P(n.r)}`;
      case 'list': return n.items.map(P).join(readable ? ' ; ' : ';');
      case 'not': return `¬${prec(n.e) < PREC.sum ? `(${P(n.e)})` : P(n.e)}`;
      case 'logic': case 'setop': {
        const me = prec(n);
        const right = n.t === 'logic' && (n.op === 'imp' || n.op === 'iff');
        const l = prec(n.l) < me || (right && prec(n.l) === me) ? `(${P(n.l)})` : P(n.l);
        const r = prec(n.r) < me || (!right && prec(n.r) === me) ? `(${P(n.r)})` : P(n.r);
        const op = n.t === 'logic' ? (readable ? LOGIC_WORD[n.op] : LOGIC_SYMBOL[n.op]) : n.op;
        return readable ? `${l} ${op} ${r}` : `${l}${op}${r}`;
      }
      case 'set': {
        const sep = readable ? ' ; ' : ';';
        if (n.kind === 'named') return n.name;
        const B = (b) => (b.t === 'const' && b.name === 'inf' ? '+∞' : P(b));
        if (n.kind === 'interval') return `${n.loOpen ? ']' : '['}${B(n.lo)}${sep}${B(n.hi)}${n.hiOpen ? '[' : ']'}`;
        if (n.kind === 'finite') return `{${n.items.map(P).join(sep)}}`;
        return `{${P(n.head)}${readable ? ' | ' : '|'}${P(n.cond)}}`;
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
