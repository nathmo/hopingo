// Traps of module M, part d (systèmes x′ = Ax, exponentielle de matrice,
// systèmes discrets; see js/cas/rules/m.js). DEFS: {id: {name, judges,
// transform?, explain?, check}}.
//
// Fields the generators of js/content/uni/matrices-d.js put in the cfg of
// a judge, read here:
//   mat     companion: ['5', '6']  the line is the companion matrix of
//                                  ÿ + 5ẏ + 6y = 0 (m_companion_sign)
//   odevec  modes: [{l: '1/2', v: '(1 ; 1)', c: '2'}]  the eigenvalues,
//                                  eigenvectors and coefficients of x0
//                                  (m_discrete_exp)
// The odevec traps rebuild the line a student who makes the mistake
// writes, as a line node of js/judges/odevec.js (lineOf), compared by its
// values. The stability traps are wrong options of decisions and multiple
// choices (baits); m_expm_sum is the « vrai » of a true/false.

import * as MX from '../matrix.js';
import { Q } from '../../math/rational.js';
import { mapNode } from '../ast.js';
import { evalFloat } from '../numeric.js';
import { exactValue } from '../normal.js';
import { evalAst, parseExpr, parseMatLine, normalizeMatText, envOf, Mx, fromQ } from '../matexpr.js';
import { t } from '../../i18n.js';

// A line node of the judge odevec (js/judges/odevec.js reads its lines the
// same way; importing it here would close a cycle through diagnose.js).
function lineOf(cfg, text) {
  const t = normalizeMatText(text);
  const consts = /^c_\d\s*=/.test(t) ? Object.fromEntries(t.split(';').map((p) => { const [k, v] = p.split('='); return [k.trim().replace('_', ''), evalAst(parseExpr(v, {}), {}, {}).n]; }).map(([k, n]) => [k, evalFloat(n, {})])) : null;
  if (consts) return { t: 'mline', ops: [], assigns: [], label: null, body: null, value: null, consts, text: t };
  try {
    const opts = { vars: [cfg.v || (cfg.discrete ? 'k' : 't'), 'c', 'λ'], names: cfg.names };
    const l = parseMatLine(t, opts);
    const n = (qRows(cfg.A) || [[0, 0]]).length;
    l.value = evalAst(l.body, { ...envOf(opts) }, opts, n);
    return { t: 'mline', ...l, text: t };
  } catch { return null; }
}

const q = (x) => (x instanceof Q ? x : MX.q(String(x)));
const qt = (x) => String(q(x));
const R = (t) => String(t).replace(/-/g, '−');
// Exact rows of a matrix text (null if an entry is not rational).
function qRows(text) {
  try {
    const v = evalAst(parseExpr(String(text), {}), {}, {});
    if (v.k !== 'm') return null;
    const rows = v.rows.map((r) => r.map((x) => exactValue(x)));
    return rows.flat().every(Boolean) ? rows : null;
  } catch { return null; }
}
const expoT = (l) => { const x = q(l); if (x.eq(1)) return 't'; if (x.eq(-1)) return '-t'; return x.d === 1 ? `${qt(x)}t` : `(${qt(x)})t`; };
const eT = (l) => (q(l).n === 0 ? '1' : `e^(${expoT(l)})`);
const polyR = (a, b) => R(`λ² ${q(a).n < 0 ? '−' : '+'} ${qt(q(a).n < 0 ? q(a).neg() : q(a))}λ ${q(b).n < 0 ? '−' : '+'} ${qt(q(b).n < 0 ? q(b).neg() : q(b))}`).replace(/ 1λ/, ' λ');
const line = (rows) => ({ t: 'mline', ops: [], assigns: [], label: null, body: null, value: fromQ(rows) });

// The double eigenvalue of a 2 × 2 (tr² = 4 det), or null.
function doubleEig(A) {
  if (!A || A.length !== 2) return null;
  const tr = A[0][0].add(A[1][1]);
  const det = MX.det(A);
  if (!tr.mul(tr).eq(det.mul(new Q(4)))) return null;
  return tr.div(new Q(2));
}

export const DEFS = {
  m_companion_sign: {
    name: t('Matrice compagne sans changer les signes'),
    judges: ['mat'],
    example: [t('[[0, 1], [6, 5]] pour ÿ + 5ẏ + 6y = 0'), '[[0, 1], [−6, −5]]'],
    transform(prev, ctx) {
      const c = ctx?.cfg?.companion;
      if (!c) return [];
      const [a, b] = c.map(q);
      const out = [[b, a], [b, a.neg()], [b.neg(), a]];
      const nb = b.neg();
      const na = a.neg();
      const ddot = R(`ÿ = ${qt(nb)}y ${na.n < 0 ? '−' : '+'} ${na.n < 0 ? qt(a).replace(/^1$/, '') : qt(na).replace(/^1$/, '')}ẏ`);
      return out.map(([x, y]) => ({ node: line([[new Q(0), new Q(1)], [x, y]]), ctx: { p: polyR(y.neg(), x.neg()), q: polyR(a, b), ddot } }));
    },
    explain: (ctx = {}) => (ctx.p
      ? t('{ddot} : la ligne du bas porte les coefficients <b>changés de signe</b>. Contrôle : le polynôme de ta matrice est {p}, pas {q}.', { ddot: ctx.ddot, p: ctx.p, q: ctx.q })
      : t('On isole ÿ : ÿ + 5ẏ + 6y = 0 donne ÿ = −6y − 5ẏ, donc la ligne du bas est (−6, −5). Contrôle : le polynôme caractéristique de la matrice compagne doit être celui de l\'équation.')),
    check: { judge: { kind: 'mat', expect: '[[0,1],[-6,-5]]', companion: ['5', '6'] }, prev: 'A', line: '[[0,1],[6,5]]' },
  },
  m_modes_c_equals_x0: {
    name: t('Coefficients des modes pris égaux à x(0)'),
    judges: ['odevec'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg;
      if (!cfg?.x0 || cfg.want === 'expm') return [];
      const x0 = qRows(cfg.x0);
      if (!x0) return [];
      const vals = x0.map((r) => r[0]);
      const out = [];
      const cl = lineOf(cfg, vals.map((x, i) => `c_${i + 1} = ${qt(x)}`).join(' ; '));
      if (cl) out.push({ node: cl, ctx: {} });
      // The general line with c = x(0).
      if (prev?.value?.k === 'm' && prev.value.rows[0].length === 1) {
        const sub = (n) => mapNode(n, (x) => {
          if (x.t !== 'sym' || x.name !== 'c' || !x.sub) return x;
          const k = Number(typeof x.sub === 'object' ? x.sub.v ?? NaN : x.sub) - 1;
          return Number.isInteger(k) && vals[k] !== undefined ? { t: 'num', v: vals[k] } : x;
        });
        const rows = prev.value.rows.map((r) => r.map(sub));
        out.push({ node: { t: 'mline', ops: [], assigns: [], label: null, body: null, value: Mx(rows), text: 'c = x(0)' }, ctx: {} });
      }
      return out;
    },
    explain: () => t('Les cᵢ sont les coordonnées de x(0) dans la base des vecteurs propres : il faut résoudre Pc = x(0), c₁v₁ + c₂v₂ = x(0). Ils ne sont égaux aux composantes de x(0) que si P = I.'),
    check: { judge: { kind: 'odevec', A: '[[0,1],[-6,-5]]', x0: '(1 ; 0)', want: 'solution' }, prev: 'x(t) = c_1e^(-2t)(1 ; -2) + c_2e^(-3t)(1 ; -3)', line: 'c_1 = 1 ; c_2 = 0' },
  },
  m_stab_discrete_in_cont: {
    name: t('Critère |λ| < 1 appliqué à ẋ = Ax'),
    judges: [],
    explain: (ctx = {}) => (ctx.λ
      ? t('En continu, le mode e^{λt} tend vers 0 si Re λ < 0. Avec λ = {l} > 0, il explose même si |λ| < 1.', { l: ctx.λ })
      : t('En continu, le mode e^{λt} tend vers 0 si Re λ < 0 : |λ| < 1 est le critère des systèmes discrets. Avec λ = 1/2, e^{t/2} explose.')),
    check: { bait: { skill: 'm-ode-modes', level: 2 } },
  },
  m_stab_cont_in_discrete: {
    name: t('Critère Re λ < 0 appliqué à x_{k+1} = Ax_k'),
    judges: [],
    explain: (ctx = {}) => (ctx.λ
      ? t('En discret, le mode est λᵏ : il tend vers 0 si |λ| < 1. Avec λ = {l}, |λ|ᵏ grandit.', { l: ctx.λ })
      : t('En discret, le mode est λᵏ : il tend vers 0 si |λ| < 1, quel que soit le signe de λ. Avec λ = −2, Re λ < 0 mais |−2|ᵏ grandit.')),
    check: { bait: { skill: 'm-discrete', level: 2 } },
  },
  m_stab_imag_part: {
    name: t('Stabilité lue sur la partie imaginaire'),
    judges: [],
    explain: () => t('La partie imaginaire b de λ = a ± ib donne la fréquence des oscillations (cos bt, sin bt) ; c\'est la partie réelle a qui dit si elles s\'amortissent : e^{at} → 0 si a < 0.'),
    check: { bait: { skill: 'm-ode-modes', level: 4 } },
  },
  m_discrete_exp: {
    name: t('Modes discrets écrits e^{λk}'),
    judges: ['odevec'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg;
      if (!cfg?.discrete || !cfg.modes) return [];
      const term = (m, c) => `${c}e^((${qt(m.l)})k)${m.v}`;
      const general = cfg.modes.map((m, i) => term(m, `${i ? '+' : ''}c_${i + 1}`)).join('');
      const part = cfg.modes.map((m, i) => { const c = q(m.c); return c.n === 0 ? '' : term(m, `${i ? '+' : ''}(${qt(c)})`); }).join('');
      return [general, part].filter(Boolean).map((t) => lineOf(cfg, `x_k = ${t}`)).filter(Boolean).map((node) => ({ node, ctx: { λ: R(cfg.modes[0].l) } }));
    },
    explain: (ctx = {}) => (ctx.λ
      ? t('En discret, chaque pas multiplie par λ : après k pas, λᵏ = ({l})ᵏ, pas e^{λk}. L\'exponentielle est le cas continu.', { l: ctx.λ })
      : t('En discret, chaque pas multiplie par λ : après k pas, λᵏ, pas e^{λk}. L\'exponentielle est le cas continu.')),
    check: { judge: { kind: 'odevec', A: '[[5/4,-3/4],[3/2,-1]]', discrete: true, x0: '(1 ; 0)', want: 'solution', modes: [{ l: '1/2', v: '(1 ; 1)', c: '2' }, { l: '-1/4', v: '(1 ; 2)', c: '-1' }] }, prev: 'x_k', line: 'x_k = 2e^(k/2)(1 ; 1) - e^(-k/4)(1 ; 2)' },
  },
  m_expm_entrywise: {
    name: t('Exponentielle de chaque case'),
    judges: ['odevec'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg;
      if (cfg?.want !== 'expm') return [];
      const A = qRows(cfg.A);
      if (!A) return [];
      const node = lineOf(cfg, `[${A.map((r) => `[${r.map(eT).join(',')}]`).join(',')}]`);
      return node ? [{ node, ctx: {} }] : [];
    },
    explain: () => t('e^{At} = Σ (At)ᵏ/k!, pas la matrice des e^{aᵢⱼt}. Contrôle : en t = 0, ta matrice a des 1 partout, pas I.'),
    check: { judge: { kind: 'odevec', A: '[[1,1],[-1,3]]', want: 'expm' }, prev: 'e^(At)', line: '[[e^t, e^t],[e^(-t), e^(3t)]]' },
  },
  m_expm_sum: {
    name: t('e^{A+B} = e^A e^B sans AB = BA'),
    judges: [],
    explain: () => t('e^{A+B} = e^A e^B demande AB = BA. Contre-exemple : A = [[0, 1], [0, 0]], B = [[0, 0], [1, 0]] ne commutent pas, et e^{A+B} ≠ e^A e^B.'),
    check: { bait: { skill: 'm-expm', exam: 'tf' } },
  },
  m_expm_double_no_t: {
    name: t('Terme tN oublié pour une valeur double'),
    judges: ['odevec'],
    transform(prev, ctx) {
      const cfg = ctx?.cfg;
      const A = qRows(cfg?.A);
      const l = doubleEig(A);
      if (!l || A.every((r, i) => r.every((x, j) => (i === j ? x.eq(l) : x.n === 0)))) return [];
      const c = { λ: R(qt(l)) };
      if (cfg.want === 'expm') {
        const node = lineOf(cfg, `${eT(l)}·[[1,0],[0,1]]`);
        return node ? [{ node, ctx: c }] : [];
      }
      const x0 = cfg.x0 ? qRows(cfg.x0) : null;
      if (!x0) return [];
      const node = lineOf(cfg, `${eT(l)}·(${x0.map((r) => qt(r[0])).join(' ; ')})`);
      return node ? [{ node, ctx: c }] : [];
    },
    explain: (ctx = {}) => t('A n\'est pas diagonalisable (N = A − {l}I ≠ 0) : e^{At} = e^{λt}(I + tN). Contrôle : la dérivée de e^{λt}I vaut λe^{λt}I, pas Ae^{At}.', { l: ctx.λ ? `(${ctx.λ})` : 'λ' }),
    check: { judge: { kind: 'odevec', A: '[[1,1],[-1,3]]', want: 'expm' }, prev: 'e^(At)', line: 'e^(2t)·[[1,0],[0,1]]' },
  },
};
