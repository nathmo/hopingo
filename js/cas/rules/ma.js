// Traps of module M, part a (blocs, projecteurs, décomposition spectrale,
// matrices définies positives; see js/cas/rules/m.js).
// DEFS: {id: {name, judges, transform?, wrongValues?, explain?, check}}.
// Traps of this part: m_schur_order, m_schur_sign, m_householder_factor,
// m_spectral_entrywise, m_sylvester_semidef, m_sylvester_negdef.
//
// The transform traps replay on the `mat` lines, from what the generator
// puts in the judge's cfg (js/content/uni/matrices-a.js):
//   cfg.schur = {A11, A12, A21, A22}   the blocks (texts) of the line « S »
//   cfg.householder = {u}              u (text) on the line « H »
//   cfg.spectral = {A, f}              A (text), f: 'sqrt' | 'inv' | 'pow2' | 'pow3' on the line « f(A) »
// The decision traps are offered by the items (decisions, options).

import * as MX from '../matrix.js';
import { Q } from '../../math/rational.js';
import { parseExpr, evalAst, toQ, fromQ, Mx, S, valueText, radicalNode } from '../matexpr.js';
import { lit, sqrt as sqrtNode, num } from '../ast.js';

const matQ = (text) => { try { return toQ(evalAst(parseExpr(String(text), {}), {}, {})); } catch { return null; } };
const mline = (value) => ({ t: 'mline', ops: [], assigns: [], label: null, body: null, value });
const R = (s) => String(s).replace(/-/g, '−');

export const DEFS = {
  m_schur_order: {
    name: 'Complément de Schur avec les facteurs dans le mauvais ordre',
    judges: ['mat'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.schur;
      if (!s) return [];
      const [A11, A12, A21, A22] = [s.A11, s.A12, s.A21, s.A22].map(matQ);
      if (!A11 || !A12 || !A21 || !A22 || A12[0].length !== A11.length || A21.length !== A11.length) return [];
      const Ai = MX.inverse(A11);
      if (!Ai) return [];
      return [{ node: mline(fromQ(MX.sub(A22, MX.mul(MX.mul(A12, Ai), A21)))), ctx: {} }];
    },
    check: { judge: { kind: 'mat', expect: '[[1,0],[0,1]]', names: { A_11: '[[2,1],[1,1]]', A_12: '[[1,0],[1,1]]', A_21: '[[0,1],[1,1]]', A_22: '[[2,2],[1,2]]' }, schur: { A11: '[[2,1],[1,1]]', A12: '[[1,0],[1,1]]', A21: '[[0,1],[1,1]]', A22: '[[2,2],[1,2]]' } }, prev: 'S', line: '[[3,2],[0,1]]' },
  },
  m_schur_sign: {
    name: 'Complément de Schur avec un signe +',
    judges: ['mat'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.schur;
      if (!s) return [];
      const [A11, A12, A21, A22] = [s.A11, s.A12, s.A21, s.A22].map(matQ);
      if (!A11 || !A12 || !A21 || !A22) return [];
      const Ai = MX.inverse(A11);
      if (!Ai) return [];
      const P = MX.mul(MX.mul(A21, Ai), A12);
      const right = MX.sub(A22, P);
      const txt = right.length === 1 && right[0].length === 1 ? String(right[0][0]) : MX.text(right);
      return [{ node: mline(fromQ(MX.add(A22, P))), ctx: { '…': R(txt) } }];
    },
    check: { judge: { kind: 'mat', expect: '[[1,0],[0,1]]', names: { A_11: '[[2,1],[1,1]]', A_12: '[[1,0],[1,1]]', A_21: '[[0,1],[1,1]]', A_22: '[[2,2],[1,2]]' }, schur: { A11: '[[2,1],[1,1]]', A12: '[[1,0],[1,1]]', A21: '[[0,1],[1,1]]', A22: '[[2,2],[1,2]]' } }, prev: 'S', line: '[[3,4],[2,3]]' },
  },
  m_householder_factor: {
    name: 'Symétrie de Householder écrite I − P',
    judges: ['mat'],
    transform(prev, ctx) {
      const u = ctx?.cfg?.householder?.u;
      const v = u ? matQ(u) : null;
      if (!v) return [];
      const col = v.map((r) => r[0]);
      const uu = MX.dot(col, col);
      if (uu.n === 0) return [];
      const P = col.map((a) => col.map((b) => a.mul(b).div(uu)));
      return [{ node: mline(fromQ(MX.sub(MX.identity(col.length), P))), ctx: {} }];
    },
    check: { judge: { kind: 'mat', expect: '[[7/9,-4/9,-4/9],[-4/9,1/9,-8/9],[-4/9,-8/9,1/9]]', householder: { u: '(1 ; 2 ; 2)' } }, prev: 'H', line: '[[8/9,-2/9,-2/9],[-2/9,5/9,-4/9],[-2/9,-4/9,5/9]]' },
  },
  m_spectral_entrywise: {
    name: 'f(A) calculée case par case',
    judges: ['mat'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.spectral;
      const A = s ? matQ(s.A) : null;
      if (!A) return [];
      const f = s.f;
      if (f === 'sqrt' && A.flat().some((x) => x.n < 0)) return [];
      if (f === 'inv' && A.flat().some((x) => x.n === 0)) return [];
      const cell = (x) => {
        if (f === 'inv') return lit(Q.of(1).div(x));
        if (f === 'pow3') return lit(x.mul(x).mul(x));
        const r = radicalNode(Math.sqrt(x.valueOf()));
        return r ?? sqrtNode(lit(x));
      };
      const M = Mx(A.map((r) => r.map(cell)));
      return [{ node: mline(M), ctx: { 'ta matrice': R(valueText(M)) } }];
    },
    check: { judge: { kind: 'mat', expect: '[[2,1],[1,2]]', spectral: { A: '[[5,4],[4,5]]', f: 'sqrt' } }, prev: '√A', line: '[[√5,2],[2,√5]]' },
  },
};

export { matQ, mline, R, Q, Mx, S, valueText, radicalNode, lit, sqrtNode, num };
