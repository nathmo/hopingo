// Traps of module A2, part e (step U6): what makes the catalogue's traps
// of this part work (the table itself is META in rules/a2.js). DEFS: {id:
// {name, judges, transform, wrongValues, explain, check}}; explain()
// falls back on the catalogue's text.
//
// The judge `system` (∇f = 0, Lagrange) compares a trap's candidate with
// the student's line by their lost solutions. a2_crit_divide (no λ) and
// a2_lagrange_divide (with λ) divide an equation of the previous line by a
// variable that can be 0 (its every term holds that variable), or drop the
// case « variable = 0 » of a line of cases. a2_quadform_matrix_half
// replays on a `mat` line when the generator gives cfg.a2quad = {doubled:
// text of the matrix with its off-diagonal entries doubled} (not
// cfg.quadform, which makes l_quadform_offdiag of module L replay first).
// The other traps are wrong answers: options of the multiple choices,
// decisions and true/false statements of the skills.

import { parseLine, text as sysText } from '../../judges/system.js';
import * as mat from '../../judges/mat.js';
import { sub, div, sym, num, rel, dependsOn } from '../ast.js';
import { evalFloat } from '../numeric.js';
import { parse } from '../parse.js';
import { normalize, pretty } from '../normal.js';
import { t } from '../../i18n.js';

const pointVars = (cfg) => cfg.vars.filter((v) => !(cfg.elim || []).includes(v) && v !== 'λ');

// D vanishes wherever v = 0 (and not everywhere): dividing by v loses roots.
function divisibleBy(D, v, vars) {
  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed / 2147483647) * 4 - 2; };
  let nonzero = false;
  for (let k = 0; k < 6; k++) {
    const env = Object.fromEntries(vars.map((w) => [w, rnd()]));
    const a = evalFloat(D, env);
    if (Number.isFinite(a) && Math.abs(a) > 1e-9) nonzero = true;
    env[v] = 0;
    const b = evalFloat(D, env);
    if (!Number.isFinite(b) || Math.abs(b) > 1e-9) return false;
  }
  return nonzero;
}

const zeroRel = (n) => rel('=', n, num(0));
function quotient(D, v) {
  const n = div(D, sym(v));
  try { return pretty(normalize(n)); } catch { return n; }
}

// Every way to change one leaf of the tree (f(leaf) → [new leaves]) or to
// drop one case of an « ou » (drop(item) → boolean).
function variants(t, f, drop) {
  if (t.rel) return f(t).map((x) => x);
  if (t.point) return [];
  if (t.group) return variants(t.group, f, drop).map((g) => ({ group: g }));
  const out = [];
  t.items.forEach((it, i) => {
    for (const w of variants(it, f, drop)) out.push({ op: t.op, items: t.items.map((x, j) => (j === i ? w : x)) });
    if (t.op === 'or' && drop(it)) {
      const rest = t.items.filter((_, j) => j !== i);
      out.push(rest.length === 1 ? rest[0] : { op: 'or', items: rest });
    }
  });
  return out;
}

// The reference points with coordinate v = 0, as text.
function lostText(cfg, v) {
  const pv = pointVars(cfg);
  const i = cfg.vars.indexOf(v);
  const pts = cfg.solutions.filter((s) => Math.abs(evalFloat(parse(String(s[i])), {})) < 1e-12);
  const seen = new Set();
  const out = [];
  for (const s of pts) {
    const pt = `(${pv.map((w) => String(s[cfg.vars.indexOf(w)]).replace(/-/g, '−')).join(' ; ')})`;
    if (!seen.has(pt)) { seen.add(pt); out.push(pt); }
  }
  return out.join(', ') || t('d\'autres points');
}

// The candidates of a division by a variable (lagrange: the system has λ).
function divideCands(prev, cfg, lagrange) {
  if (prev?.t !== 'sys' || !cfg?.vars) return [];
  if (cfg.vars.includes('λ') !== lagrange) return [];
  const out = [];
  for (const v of pointVars(cfg)) {
    const f = (leaf) => {
      const D = sub(leaf.rel.l, leaf.rel.r);
      if (!divisibleBy(D, v, cfg.vars)) return [];
      const Q = quotient(D, v);
      // « v = 0 » itself: its case is dropped below.
      if (!cfg.vars.some((w) => dependsOn(Q, w))) return [];
      return [{ rel: zeroRel(Q) }];
    };
    const isZero = (r) => {
      const l = r.l.t === 'paren' ? r.l.e : r.l;
      return l.t === 'sym' && l.name === v && evalFloat(r.r, {}) === 0;
    };
    // A case « v = 0 », alone or inside a bracket of equations.
    const drop = (it) => {
      const t = it.group ?? it;
      if (t.rel) return isZero(t.rel);
      return t.op === 'and' && t.items.some((x) => x.rel && isZero(x.rel));
    };
    for (const tree of variants(prev.tree, f, drop)) {
      let node;
      try { node = parseLine(cfg, sysText(cfg, { t: 'sys', tree })); } catch { continue; }
      out.push({ node, ctx: { facteur: v, points: lostText(cfg, v) } });
    }
  }
  return out;
}

export const DEFS = {
  a2_crit_divide: {
    name: t('Division par une variable qui peut être nulle'),
    judges: ['system'],
    transform: (prev, ctx) => divideCands(prev, ctx.cfg, false),
    explain: (ctx = {}) => (ctx.facteur
      ? t('Tu as divisé par {facteur}. Il peut valoir 0 : le cas {facteur} = 0 donne aussi {points}.', { facteur: ctx.facteur, points: ctx.points })
      : t('Tu as divisé par une variable. Elle peut valoir 0 : ce cas donne aussi des points stationnaires. Factorise et sépare les cas.')),
    check: {
      judge: { kind: 'system', vars: ['x', 'y'], solutions: [['0', '0'], ['-1', '-1']] },
      prev: 'y = -x^2 ; x(x^3+1) = 0', line: 'y = -x^2 ; x^3+1 = 0',
    },
  },
  a2_stationary_is_extremum: {
    name: t('Point stationnaire pris pour un extremum'),
    judges: [],
    check: { counter: { kind: 'a2', prop: 'stationaryNotExtremum', params: {} }, answers: { f: 'x^2+y^2' } },
  },
  a2_hess_det_only: {
    name: t('det H > 0 lu comme « minimum »'),
    judges: [],
    explain: (ctx = {}) => (ctx.det !== undefined
      ? t('det H = {det} > 0 dit seulement que les deux valeurs propres ont le même signe. f_xx = {fxx} < 0 : c\'est un maximum.', { det: ctx.det, fxx: ctx.fxx })
      : t('det H > 0 dit seulement que les valeurs propres ont le même signe (en 2 × 2). C\'est le signe de f_xx qui sépare le minimum du maximum ; en 3 × 3, il faut aussi Δ₁ et Δ₂.')),
    check: { bait: { skill: 'a2-hessian-2x2', exam: 'mcq' } },
  },
  a2_hess_degenerate: {
    name: t('det H = 0 lu comme « point selle »'),
    judges: [],
    check: { bait: { skill: 'a2-hessian-2x2', exam: 'mcq' } },
  },
  a2_hess_partial_minors: {
    name: t('Nature lue sur Δ₁ et Δ₃ seulement'),
    judges: [],
    explain: (ctx = {}) => (ctx.d2 !== undefined
      ? t('Il faut les trois mineurs : −, +, −. Ici Δ₂ = {d2} < 0 : H n\'est pas définie négative.', { d2: ctx.d2 })
      : t('Il faut les trois mineurs : −, +, − pour un maximum. Avec Δ₁ < 0 et Δ₃ < 0 seulement, Δ₂ peut être négatif : H n\'est alors pas définie négative.')),
    check: { bait: { skill: 'a2-hessian-3x3', exam: 'tf' } },
  },
  a2_compact_boundary_forgot: {
    name: t('Bord oublié sur un compact'),
    judges: [],
    check: { bait: { skill: 'a2-extrema-compact', exam: 'mcq' } },
  },
  a2_compact_corner_forgot: {
    name: t('Coins du bord oubliés'),
    judges: [],
    check: { bait: { skill: 'a2-extrema-compact', exam: 'mcq' } },
  },
  a2_lagrange_divide: {
    name: t('Lagrange : division par une variable qui peut être nulle'),
    judges: ['system'],
    transform: (prev, ctx) => divideCands(prev, ctx.cfg, true),
    explain: (ctx = {}) => (ctx.facteur
      ? t('Diviser par {facteur} suppose {facteur} ≠ 0. Le cas {facteur} = 0 donne les points {points}, à comparer aussi.', { facteur: ctx.facteur, points: ctx.points })
      : t('Diviser par une variable suppose qu\'elle n\'est pas nulle. Le cas « variable = 0 » donne d\'autres candidats, à comparer aussi.')),
    check: {
      judge: { kind: 'system', vars: ['x', 'y', 'λ'], elim: ['λ'], solutions: [['√6', '0', '0'], ['-√6', '0', '0'], ['√2', '√2', '√2/2'], ['√2', '-√2', '√2/2'], ['-√2', '√2', '-√2/2'], ['-√2', '-√2', '-√2/2']] },
      prev: 'y^2 = 2λx ; 2x y = 4λy ; x^2+2y^2 = 6', line: 'y^2 = 2λx ; x = 2λ ; x^2+2y^2 = 6',
    },
  },
  a2_lagrange_no_constraint: {
    name: t('Lagrange : point hors de la contrainte'),
    judges: [],
    check: { bait: { skill: 'a2-lagrange', exam: 'mcq' } },
  },
  a2_lagrange_count: {
    name: t('Lagrange : points de max comptés à moitié'),
    judges: [],
    check: { bait: { skill: 'a2-lagrange', exam: 'mcq' } },
  },
  a2_lagrange_no_compare: {
    name: t('Lagrange : candidat pris pour l\'extremum sans comparer'),
    judges: [],
    check: { bait: { skill: 'a2-lagrange', exam: 'mcq' } },
  },
  a2_quadform_matrix_half: {
    name: t('Matrice d\'une forme quadratique : termes croisés non partagés'),
    judges: ['mat'],
    transform: (prev, ctx) => {
      const d = ctx.cfg?.a2quad?.doubled;
      if (!d) return [];
      return [{ node: mat.parseLine({ kind: 'mat' }, d), ctx: {} }];
    },
    check: {
      judge: { kind: 'mat', expect: '[[0,1/2,0],[1/2,0,1],[0,1,0]]', a2quad: { doubled: '[[0,1,0],[1,0,2],[0,2,0]]' } },
      prev: 'A = ?', line: '[[0,1,0],[1,0,2],[0,2,0]]',
    },
  },
};

