// Traps of module M, part c (puissance, SVD de rang k, normes, conditionnement, Gershgorin; see js/cas/rules/m.js).
// DEFS: {id: {name, judges, transform?, wrongValues?, explain?, check}}.
// Traps of this part: m_power_ratio, m_inverse_power_value, m_rankk_wrong_sigma, m_norm_1_inf_swap, m_norm2_eig, m_cond_eig_nonsym, m_cond_det, m_gersh_radius_diag.
//
// The value traps read fields the generators (js/content/uni/matrices-c-*.js)
// put in the judge's configuration:
//   speed   {l1, l2}           a line « |λ₂/λ₁| = … » (power method)
//   invpow  {sigma, mu}        a line « λ = … » after the inverse power, μ_k → mu
//   lowrank {s2: [σᵢ²], k}     a line « ‖A − A_k‖ = … »
//   mnorm   {A, p}             a line « ‖A‖_p = … », p '1' | 'inf' | '2' | 'F'
//   mcond   {A}                a line « κ₂(A) = … »
//   gersh   {A, i}             a line « Rᵢ = … » (radius of the row disc i, from 0)
// A candidate is the number the trap gives, as an exact node when it is
// rational or ±(a/b)√c, else a float node.

import { toText } from '../print.js';
import { radicalNode } from '../matexpr.js';
import * as LF from '../linalg-float.js';

const numOf = (t) => {
  const s = String(t).replace(/−/g, '-').trim();
  const m = /^(-?\d+)(?:\/(\d+))?$/.exec(s);
  return m ? Number(m[1]) / (m[2] ? Number(m[2]) : 1) : NaN;
};
const node = (x) => radicalNode(x) ?? { t: 'float', x };
// Eigenvalues (2 × 2 in closed form, so that a double one stays real).
function eigOf(A) {
  if (A.length !== 2) return LF.eig(A);
  const [[a, b], [c, d]] = A;
  const tr = a + d;
  const disc = tr * tr - 4 * (a * d - b * c);
  if (disc < -1e-12) return [{ re: tr / 2, im: Math.sqrt(-disc) / 2 }, { re: tr / 2, im: -Math.sqrt(-disc) / 2 }];
  const r = Math.sqrt(Math.max(disc, 0));
  return [{ re: (tr + r) / 2, im: 0 }, { re: (tr - r) / 2, im: 0 }];
}
const matOf = (text) => String(text).replace(/\s/g, '').slice(2, -2).split('],[').map((r) => r.split(',').map(numOf));
// A number as the explanations show it: 3√2, 7/2, else 3 decimals.
const show = (x) => {
  const r = radicalNode(x);
  return r ? toText(r).replace(/×/g, '').replace(/-/g, '−') : x.toFixed(3).replace('.', ',').replace('-', '−');
};

export const DEFS = {
  m_power_ratio: {
    name: 'Vitesse |λ₁/λ₂| au lieu de |λ₂/λ₁|',
    judges: ['value'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.speed;
      if (!s) return [];
      const l1 = numOf(s.l1);
      const l2 = numOf(s.l2);
      if (!l2) return [];
      return [{ node: node(Math.abs(l1 / l2)), ctx: { '…': show(Math.abs(l2 / l1)) } }];
    },
    check: { judge: { kind: 'value', expect: '1/2', form: 'irreducible', speed: { l1: '4', l2: '2' } }, prev: '|λ_2/λ_1|', line: '2' },
  },
  m_inverse_power_value: {
    name: 'Puissance inverse : μ pris pour λ',
    judges: ['value'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.invpow;
      if (!s) return [];
      const sigma = numOf(s.sigma);
      const mu = numOf(s.mu);
      if (!mu) return [];
      const c = { '…': show(sigma + 1 / mu) };
      return [mu, 1 / mu, sigma + mu].map((x) => ({ node: node(x), ctx: c }));
    },
    check: { judge: { kind: 'value', expect: '2', form: 'irreducible', invpow: { sigma: '1', mu: '1' } }, prev: 'λ', line: '1' },
  },
  m_rankk_wrong_sigma: {
    name: 'Erreur de rang k : mauvais σ',
    judges: ['value'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.lowrank;
      if (!s) return [];
      const s2 = s.s2.map(numOf);
      const k = s.k;
      const c = { '…': show(Math.sqrt(s2[k] ?? 0)) };
      const out = [{ node: node(Math.sqrt(s2[k - 1])), ctx: c }];
      if (s2[k] !== undefined) out.push({ node: node(s2[k]), ctx: c });
      return out;
    },
    check: { judge: { kind: 'value', expect: '3√2', form: 'exact', lowrank: { s2: ['72', '18'], k: 1 } }, prev: 'E_1', line: '6√2' },
  },
  m_norm_1_inf_swap: {
    name: '‖·‖₁ et ‖·‖∞ échangées',
    judges: ['value'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.mnorm;
      if (!s || (s.p !== '1' && s.p !== 'inf')) return [];
      const A = matOf(s.A);
      const one = LF.norm(A, 1);
      const inf = LF.norm(A, Infinity);
      if (one === inf) return [];
      return [{ node: node(s.p === '1' ? inf : one), ctx: { c: show(one), l: show(inf) } }];
    },
    explain: (ctx = {}) => (ctx.c
      ? `‖·‖₁ somme les <b>colonnes</b>, ‖·‖∞ les <b>lignes</b> : ici ‖A‖₁ = ${ctx.c} et ‖A‖∞ = ${ctx.l}. Moyen mnémotechnique : le 1 est vertical, le ∞ est couché.`
      : '‖·‖₁ somme les <b>colonnes</b>, ‖·‖∞ les <b>lignes</b>. Moyen mnémotechnique : le 1 est vertical, le ∞ est couché.'),
    check: { judge: { kind: 'value', expect: '7', form: 'irreducible', mnorm: { A: '[[3,0],[4,5]]', p: '1' } }, prev: 'N_1', line: '9' },
  },
  m_norm2_eig: {
    name: '‖A‖₂ lue sur les valeurs propres de A',
    judges: ['value'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.mnorm;
      if (!s || s.p !== '2') return [];
      const A = matOf(s.A);
      const e = eigOf(A);
      if (e.some((z) => Math.abs(z.im) > 1e-9)) return [];
      const rho = Math.max(...e.map((z) => Math.abs(z.re)));
      const lmax = Math.max(...e.map((z) => z.re));
      const out = [{ node: node(rho) }];
      if (lmax > 0) out.push({ node: node(Math.sqrt(lmax)) });
      return out;
    },
    check: { judge: { kind: 'value', expect: '3√5', form: 'exact', mnorm: { A: '[[3,0],[4,5]]', p: '2' } }, prev: 'N_2', line: '5' },
  },
  m_cond_eig_nonsym: {
    name: 'κ₂ lu sur les valeurs propres d\'une matrice non symétrique',
    judges: ['value'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.mcond;
      if (!s) return [];
      const A = matOf(s.A);
      const e = eigOf(A);
      if (e.some((z) => Math.abs(z.im) > 1e-9) || e.some((z) => Math.abs(z.re) < 1e-12)) return [];
      const m = e.map((z) => Math.abs(z.re));
      return [{ node: node(Math.max(...m) / Math.min(...m)) }];
    },
    check: { judge: { kind: 'value', expect: '3+2√2', form: 'exact', mcond: { A: '[[1,2],[0,1]]' } }, prev: 'κ_2', line: '1' },
  },
  m_cond_det: {
    name: '« det petit ⇒ mal conditionnée »',
    judges: [],
    explain: () => 'Un petit déterminant ne veut pas dire mauvais conditionnement : det(10⁻³I) = 10⁻⁹ en dimension 3, mais κ = 1. Multiplier A par un nombre ne change pas κ.',
    check: { bait: { skill: 'm-cond', exam: 'tf' } },
  },
  m_gersh_radius_diag: {
    name: 'Rayon de Gershgorin avec la diagonale',
    judges: ['value'],
    transform(prev, ctx) {
      const s = ctx?.cfg?.gersh;
      if (!s) return [];
      const A = matOf(s.A);
      const row = s.by === 'cols' ? A.map((r) => r[s.i]) : A[s.i];
      const R = row.reduce((t, x, j) => t + (j === s.i ? 0 : Math.abs(x)), 0);
      if (!row[s.i]) return [];
      return [{ node: node(R + Math.abs(row[s.i])), ctx: { '…': show(R) } }];
    },
    check: { judge: { kind: 'value', expect: '2', form: 'irreducible', gersh: { A: '[[4,1,0],[1,-3,1],[0,1,7]]', i: 1 } }, prev: 'R_2', line: '5' },
  },
};

