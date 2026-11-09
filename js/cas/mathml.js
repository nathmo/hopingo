// AST → MathML string (spec §11). University content is shown with native
// MathML; the school units keep their HTML rendering.
//
// toMathML(node, {display, highlight, blanks, dvar})
//   display    'block' or 'inline' (default)
//   highlight  path (array of child keys) of a sub-expression to set off
//   blanks     {id: {text, active}} contents of guided blanks
// Explicit × shows as ·, a number before a letter as an invisible product,
// derivatives as (…)′.

import { prec, toReadable, PREC, LOGIC_SYMBOL } from './print.js';
import { getAt } from './ast.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const mo = (s, attrs = '') => `<mo${attrs}>${s}</mo>`;
const row = (...xs) => `<mrow>${xs.join('')}</mrow>`;
const paren = (s) => row(mo('(', ' stretchy="false"'), s, mo(')', ' stretchy="false"'));
const CONSTS = { pi: '<mi>π</mi>', e: '<mi>e</mi>', i: '<mi>i</mi>', inf: '<mi mathvariant="normal">∞</mi>' };
const FN_NAMES = { Log: 'Log', log: 'log', ln: 'ln' };
const REL = { '=': '=', '<': '&lt;', '>': '&gt;', '≤': '≤', '≥': '≥', '≠': '≠' };

function startsWithNumber(n) {
  if (n.t === 'num' || n.t === 'float') return true;
  if (n.t === 'bin' && n.op === '×') return startsWithNumber(n.l);
  if (n.t === 'frac' || n.t === 'pow') return startsWithNumber(n.t === 'frac' ? n.n : n.b);
  return false;
}

export function toMathML(node, opts = {}) {
  const dvar = opts.dvar || 'x';
  const hl = opts.highlight ? getAt(node, opts.highlight) : null;
  const blanks = opts.blanks || {};

  const wrap = (n, min) => (prec(n) < min ? paren(M(n)) : M(n));

  function M(n) {
    const s = body(n);
    return n === hl ? `<mrow class="m-hl" mathbackground="#fff3bf">${s}</mrow>` : s;
  }

  function body(n) {
    switch (n.t) {
      case 'num': return `<mn>${esc(n.s)}</mn>`;
      case 'float': return n.x < 0 ? row(mo('−'), `<mn>${String(-n.x).replace('.', ',')}</mn>`) : `<mn>${String(n.x).replace('.', ',')}</mn>`;
      case 'const': return CONSTS[n.name] ?? `<mi>${esc(n.name)}</mi>`;
      case 'sym': {
        const base = `<mi>${esc(n.name)}</mi>`;
        if (!n.sub) return base;
        const sub = typeof n.sub === 'object' ? M(n.sub.t === 'paren' ? n.sub.e : n.sub) : `<mi>${esc(n.sub)}</mi>`;
        return `<msub>${base}${sub}</msub>`;
      }
      case 'blank': {
        const b = blanks[n.id] || {};
        const content = b.html ?? (b.text ? `<mtext>${esc(b.text)}</mtext>` : '<mtext>  </mtext>');
        return `<mrow class="m-blank${b.active ? ' active' : ''}${b.bad ? ' bad' : ''}" data-blank="${n.id}">${content}</mrow>`;
      }
      case 'paren': return paren(M(n.e));
      case 'neg': return row(mo('−'), prec(n.e) <= 1 || n.e.t === 'neg' ? paren(M(n.e)) : M(n.e));
      case 'bin': {
        if (n.op === '+' || n.op === '-') {
          const r = n.r.t === 'neg' || prec(n.r) < (n.op === '-' ? 2 : 1) ? paren(M(n.r)) : M(n.r);
          return row(M(n.l), mo(n.op === '-' ? '−' : '+'), r);
        }
        if (n.op === '÷') return row(wrap(n.l, 2), mo('÷'), n.r.t === 'neg' ? paren(M(n.r)) : wrap(n.r, 3));
        const rProd = n.r.t === 'bin' && n.r.op === '×';
        const r = n.r.t === 'neg' || (prec(n.r) < 3 && !(rProd && n.implicit === undefined)) ? paren(M(n.r)) : M(n.r);
        const bothNumbers = startsWithNumber(n.r) && (n.l.t === 'num' || n.l.t === 'float' || n.l.t === 'frac');
        const invisible = !bothNumbers && (n.implicit === true || (n.l.t === 'num' && n.implicit === undefined));
        return row(wrap(n.l, 2), mo(invisible ? '&#x2062;' : bothNumbers ? '×' : '·'), r);
      }
      case 'frac': return `<mfrac>${M(stripP(n.n))}${M(stripP(n.d))}</mfrac>`;
      case 'pow': {
        const b = n.b.t === 'fn' ? M(n.b) : wrap(n.b, 6);
        return `<msup>${b.startsWith('<mrow') ? b : row(b)}${M(stripP(n.e))}</msup>`;
      }
      case 'sqrt': return `<msqrt>${M(stripP(n.e))}</msqrt>`;
      case 'root': return `<mroot>${M(stripP(n.e))}${M(n.n)}</mroot>`;
      case 'abs': return row(mo('|', ' stretchy="false"'), M(n.e), mo('|', ' stretchy="false"'));
      case 'fn': {
        const name = `<mi>${esc(FN_NAMES[n.name] ?? n.name)}</mi>`;
        return row(name, mo('&#x2061;'), paren(n.args.map(M).join(mo(','))));
      }
      case 'deriv': {
        const marks = '′'.repeat(Math.min(n.n, 3));
        const inner = n.e.t === 'sym' ? M(n.e) : paren(M(stripP(n.e)));
        if (n.v === dvar) return row(inner, mo(marks, ' lspace="0" rspace="0"'));
        const d = n.n > 1 ? `<msup><mi mathvariant="normal">d</mi><mn>${n.n}</mn></msup>` : '<mi mathvariant="normal">d</mi>';
        const dv = n.n > 1 ? `<msup><mi>${esc(n.v)}</mi><mn>${n.n}</mn></msup>` : `<mi>${esc(n.v)}</mi>`;
        return row(`<mfrac>${d}${row('<mi mathvariant="normal">d</mi>', dv)}</mfrac>`, inner);
      }
      case 'rel': {
        const op = { '=': '=', '<': '&lt;', '>': '&gt;', '≤': '≤', '≥': '≥', '≠': '≠' }[n.op];
        return row(M(n.l), mo(op), M(n.r));
      }
      case 'chain': return row(...n.items.map((x, i) => (i ? mo(REL[n.ops[i - 1]]) + M(x) : M(x))));
      case 'in': return row(M(n.l), mo(n.op), M(n.r));
      case 'list': return row(...n.items.map((x, i) => (i ? mo(';', ' separator="true"') + '<mspace width="0.5em"/>' + M(x) : M(x))));
      case 'not': return row(mo('¬'), prec(n.e) < PREC.sum ? paren(M(n.e)) : M(n.e));
      case 'logic': case 'setop': {
        const me = prec(n);
        const right = n.t === 'logic' && (n.op === 'imp' || n.op === 'iff');
        const l = prec(n.l) < me || (right && prec(n.l) === me) ? paren(M(n.l)) : M(n.l);
        const r = prec(n.r) < me || (!right && prec(n.r) === me) ? paren(M(n.r)) : M(n.r);
        return row(l, mo(n.t === 'logic' ? LOGIC_SYMBOL[n.op] : n.op), r);
      }
      case 'set': {
        const fence = (s) => mo(s, ' stretchy="false"');
        if (n.kind === 'named') return `<mi mathvariant="normal">${n.name}</mi>`;
        const B = (b) => (b.t === 'const' && b.name === 'inf' ? row(mo('+'), M(b)) : M(b));
        if (n.kind === 'interval') return row(fence(n.loOpen ? ']' : '['), B(n.lo), mo(';'), B(n.hi), fence(n.hiOpen ? '[' : ']'));
        if (n.kind === 'finite') {
          if (!n.items.length) return row(fence('{'), fence('}'));
          return row(fence('{'), ...n.items.map((x, i) => (i ? mo(';') + M(x) : M(x))), fence('}'));
        }
        return row(fence('{'), M(n.head), mo('|'), M(n.cond), fence('}'));
      }
      default: return `<mtext>${esc(n.t)}</mtext>`;
    }
  }
  const stripP = (n) => (n.t === 'paren' ? n.e : n);

  const display = opts.display === 'block' ? ' display="block"' : '';
  const alt = esc(toReadable(node, { dvar })).replace(/"/g, '&quot;');
  return `<math alttext="${alt}"${display}>${M(node)}</math>`;
}
