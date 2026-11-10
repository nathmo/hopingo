// Traps of module N, part d (see js/cas/rules/n.js).
// DEFS: {id: {name, judges, transform?, wrongValues?, explain?, check, code?}}.
// Traps of this part: n_fd_centered_h, n_fd_taylor_sign, n_fd_smaller_h, n_fd_order_conditions, n_proof_same_xi, n_proof_constant_depends_h.
//
// They read fields the generators (js/content/uni/numerique-d-*.js) put in
// the judge's configuration:
//   fd       {fp, fm, h}          a value line « δᶜf = … » (decimals as texts)
//   taylor   {k, last}            an equiv line developing f(x + kh) with
//                                 the letters A, B, C and `last` (D, U or V)
//   sameXi   {from, to}           an equiv line where the remainder `from`
//                                 (V) must not be replaced by `to` (U)
//   proofC   {terms: [[c, L]], h} an equiv line « C = … » (a number): the
//                                 constant written with f‴(ξ) or with h
// A code trap gives `code: {skill, text}` (tests/n-engine.test.js).

import { parse } from '../parse.js';
import { mapNode } from '../ast.js';

const P = (t) => parse(String(t), { vars: ['h', 'A', 'B', 'C', 'D', 'U', 'V', 'x', 't'] });
const plusText = (k, L) => {
  const K = Math.abs(k);
  const c2 = K * K;
  const c3 = K * K * K;
  return `A+${K === 1 ? '' : K}hB+${c2}/2h^2C+${c3}/6h^3${L}`;
};

export const DEFS = {
  n_fd_centered_h: {
    name: 'Différence centrée divisée par h au lieu de 2h',
    judges: ['value', 'code'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.fd;
      if (!s) return [];
      return [{ node: P(`(${s.fp}-(${s.fm}))/(${s.h})`), ctx: { '2h': String(2 * Number(String(s.h).replace(',', '.'))).replace('.', ',') } }];
    },
    code: { skill: 'n-fd-basic', text: '(f(x + h) - f(x - h)) / h', levels: [5] },
    check: { judge: { kind: 'value', form: 'any', expect: '3,01', fd: { fp: '1,331', fm: '0,729', h: '0,1' } }, prev: 'δ', line: '6,02' },
  },
  n_fd_taylor_sign: {
    name: 'Développement de f(x − h) avec tous les signes +',
    judges: ['equiv'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.taylor;
      if (!s || s.k >= 0) return [];
      return [{ node: P(plusText(s.k, s.last || 'D')), ctx: {} }];
    },
    check: {
      judge: { kind: 'equiv', vars: ['t', 'x', 'h', 'A', 'B', 'C', 'D'], funcs: ['f'], defs: { f: 'A+B(t-x)+C(t-x)^2/2+D(t-x)^3/6' }, target: 'goal', goal: 'A-hB+1/2h^2C-1/6h^3D', taylor: { k: -1, last: 'D' } },
      prev: 'f(x-h)', line: 'A+hB+1/2h^2C+1/6h^3D',
    },
  },
  n_fd_smaller_h: {
    name: '« Plus h est petit, mieux c’est » (arrondi oublié)',
    judges: ['readtable'],
    check: { bait: { skill: 'n-fd-roundoff', level: 3 } },
  },
  n_fd_order_conditions: {
    name: 'Ordre 2 annoncé avec la consistance seule',
    judges: ['readtable'],
    check: { bait: { skill: 'n-fd-build', level: 3 } },
  },
  n_proof_same_xi: {
    name: 'Les deux restes f‴(ξ₁) et f‴(ξ₂) simplifiés ensemble',
    judges: ['equiv', 'blocks'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.sameXi;
      if (!s) return [];
      return [{ node: mapNode(prev, (n) => (n.t === 'sym' && n.name === s.from && !n.sub ? { t: 'sym', name: s.to } : n)), ctx: {} }];
    },
    check: {
      judge: { kind: 'equiv', vars: ['h', 'A', 'B', 'C', 'U', 'V'], target: 'goal', goal: '-1/3h^2U+2/3h^2V', sameXi: { from: 'V', to: 'U' } },
      prev: 'B-(2hB+2/3h^3U-4/3h^3V)/(2h)', line: '1/3h^2U',
    },
  },
  n_proof_constant_depends_h: {
    name: 'Constante qui dépend de ξ ou de h',
    // The catalogue's row has « | » inside its cells: META (rules/n.js)
    // reads it wrongly, so the example and the explanation are given here.
    example: ['C = |f‴(ξ)|/3', 'C = 1, avec max|f‴|'],
    explain: (ctx = {}) => `Ta constante contient ${ctx.sym ?? 'ξ ou h'} : elle doit être indépendante de h (et de f si l'énoncé met max|f⁽ᵖ⁾|). On majore |f‴(ξ)| par max|f‴|.`,
    judges: ['equiv', 'blocks'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.proofC;
      if (!s) return [];
      const lin = s.terms.map(([c, L]) => `${c}${L}`).join('+');
      const absd = s.terms.map(([c, L]) => `${c}×abs(${L})`).join('+');
      const total = s.terms.reduce((acc, [c]) => `${acc}+${c}`, '0');
      return [
        { node: P(lin), ctx: { sym: 'f‴(ξ)' } },
        { node: P(absd), ctx: { sym: 'f‴(ξ)' } },
        { node: P(`(${total})h^2`), ctx: { sym: 'h' } },
      ];
    },
    check: {
      judge: { kind: 'equiv', vars: ['h', 'U', 'V'], target: 'constant', subst: { K: '1' }, proofC: { terms: [['1/3', 'U'], ['2/3', 'V']] } },
      prev: 'K', line: '1/3U+2/3V',
    },
  },
};
