// a2-ode-homog-subst (module A2, part h, step U6): y′ = F(y/x), y = x·v.
// Parts: y′ = (xv)′ (`equiv` with v a function of x: implicit {v: 'w'}),
// then the equation in v (`ode` with unknown v: reduced, separated,
// integrated, constant, v), then back to y (`ode` in y). F(v) − v ∈ {cos²v,
// e^(−v), v², 1 + v², sin v, c}; the initial condition is at x = 1.

import { MT, linesItem, examTag } from './kit.js';
import { partsScript, tpl, sup } from './a2-kit.js';
import { qt, q, sumT, term, rd, H, E, modeOf, mcq4, opt } from './analyse2-h-kit.js';

const SK = 'a2-ode-homog-subst';
const SUB = [
  { id: 'recognize', label: 'reconnaître y′ = F(y/x)', skill: SK },
  { id: 'substitute', label: 'y = xv, y′ = v + xv′', skill: SK },
  { id: 'reduce', label: 'équation en v', skill: SK },
  { id: 'separate', label: 'séparer et intégrer', skill: 'a2-ode-separable' },
  { id: 'ic', label: 'condition initiale', skill: SK },
  { id: 'back', label: 'revenir à y', skill: SK },
];
const KEYS = ['calcx', 'calcfn', 'a2', 'anal'];

// The families: R = F(v) − v, the forms of the equation (original, and
// after y = xv), the lines in v, the solution.
function family(rng) {
  const kind = rng.pick(['cos2', 'cos2', 'exp', 'exp', 'sq', 'one', 'sin', 'const']);
  if (kind === 'cos2') {
    const [v0, C] = rng.pick([['0', '0'], ['π/4', '1'], ['-π/4', '-1']]);
    const vT = `arctan(${sumT(['ln(x)', C])})`;
    return {
      kind, R: 'cos(v)^2', v0, C, domain: [0.5, 3], vRange: [-1.5, 1.5],
      forms: [{ eq: "x y'-y=x cos(y/x)^2", sub: "x(v+x v')-x v=x cos(v)^2" }, { eq: "y'=y/x+cos(y/x)^2", sub: "v+x v'=v+cos(v)^2" }],
      sep: 'dv/cos(v)^2 = dx/x', rel: 'tan(v) = ln(x) + C', mid: null, v: vT, y: `x ${vT}`, prim: 'tan v',
      late: C === '0' ? null : `x arctan(ln(x))+${v0}`, wrongV: vT,
    };
  }
  if (kind === 'exp') {
    const [v0, C] = rng.pick([['0', '1'], ['ln(2)', '2']]);
    const vT = `ln(ln(x)+${C})`;
    return {
      kind, R: 'e^(-v)', v0, C, domain: [0.5, 3], vRange: [-3, 2.5],
      forms: [{ eq: "x y'=y+x e^(-y/x)", sub: "x(v+x v')=x v+x e^(-v)" }, { eq: "y'=y/x+e^(-y/x)", sub: "v+x v'=v+e^(-v)" }],
      sep: 'e^v dv = dx/x', rel: 'e^v = ln(x) + C', mid: null, v: vT, y: `x ${vT}`, prim: 'e^v',
      late: null, wrongV: vT,
    };
  }
  if (kind === 'sq') {
    const v0 = rng.pick([1, -1]);
    const C = qt(q(-1, v0));
    const vT = `-1/(${sumT(['ln(x)', C])})`;
    return {
      kind, R: 'v^2', v0: String(v0), C, domain: [0.5, 2], vRange: v0 > 0 ? [0.05, 6] : [-6, -0.05],
      forms: [{ eq: "x^2 y'=x y+y^2", sub: "x^2(v+x v')=x^2 v+x^2 v^2" }, { eq: "x y'=y+y^2/x", sub: "x(v+x v')=x v+x v^2" }],
      sep: 'dv/v^2 = dx/x', rel: '-1/v = ln(x) + C', mid: null, v: vT, y: `-x/(${sumT(['ln(x)', C])})`, prim: '−1/v',
      late: null, wrongV: vT,
    };
  }
  if (kind === 'one') {
    const [v0, C] = rng.pick([['0', '0'], ['1', 'π/4']]);
    const vT = `tan(${sumT(['ln(x)', C])})`;
    return {
      kind, R: '1+v^2', v0, C, domain: v0 === '0' ? [0.5, 3] : [0.5, 2], vRange: [-6, 6],
      forms: [{ eq: "x^2 y'=x^2+x y+y^2", sub: "x^2(v+x v')=x^2+x^2 v+x^2 v^2" }, { eq: "x y'=x+y+y^2/x", sub: "x(v+x v')=x+x v+x v^2" }],
      sep: 'dv/(1+v^2) = dx/x', rel: 'arctan(v) = ln(x) + C', mid: null, v: vT, y: `x ${vT}`, prim: 'arctan v',
      late: v0 === '0' ? null : `x tan(ln(x))+${v0}`, wrongV: vT,
    };
  }
  if (kind === 'sin') {
    return {
      kind, R: 'sin(v)', v0: 'π/2', C: '0', domain: [0.5, 3], vRange: [0.1, 3],
      forms: [{ eq: "x y'=y+x sin(y/x)", sub: "x(v+x v')=x v+x sin(v)" }, { eq: "y'=y/x+sin(y/x)", sub: "v+x v'=v+sin(v)" }],
      sep: 'dv/sin(v) = dx/x', rel: 'ln(|tan(v/2)|) = ln(x) + C', mid: 'tan(v/2) = x', v: '2arctan(x)', y: '2x arctan(x)', prim: 'ln|tan(v/2)|',
      late: null, wrongV: '2arctan(x)',
    };
  }
  const c = rng.pick([1, 2, 3]);
  const v0 = rng.pick([0, 1, 2]);
  const vT = sumT([term(c, 'ln(x)'), v0 ? String(v0) : '']);
  return {
    kind, R: String(c), v0: String(v0), C: String(v0), domain: [0.5, 3], vRange: [-5, 8],
    forms: [{ eq: `x y'-y=${c === 1 ? '' : c}x`, sub: `x(v+x v')-x v=${c === 1 ? '' : c}x` }, { eq: `x y'=y+${c === 1 ? '' : c}x`, sub: `x(v+x v')=x v+${c === 1 ? '' : c}x` }],
    sep: c === 1 ? 'dv = dx/x' : `dv = (${c}/x) dx`, rel: `v = ${term(c, 'ln(x)')} + C`, mid: null, v: vT, y: sumT([term(c, 'x ln(x)'), v0 ? term(v0, 'x') : '']), prim: 'v',
    late: v0 ? sumT([term(c, 'x ln(x)'), String(v0)]) : null, wrongV: vT,
  };
}

const CHOICES = [
  { id: 'subst', label: 'Poser y = xv : y′ = v + xv′' },
  { id: 'reduce', label: 'Simplifier : x·v′ = F(v) − v' },
  { id: 'sep', label: 'Séparer : les v d\'un côté, les x de l\'autre' },
  { id: 'int', label: 'Intégrer des deux côtés' },
  { id: 'ic', label: 'Condition initiale : v(1) = y(1)' },
  { id: 'solve', label: 'Isoler v' },
  { id: 'back', label: 'Revenir à y = x·v' },
  { id: 'yv', label: 'Dériver y = xv : y′ = v', rule: 'a2_ode_homog_derivative', why: 'y = x·v est un produit : y′ = v + x·v′.' },
];

function linesVariant(level, rng, opts) {
  const f = family(rng);
  const form = rng.pick(f.forms);
  const vEq = `x v'=${f.R}`;
  const odeV = { kind: 'ode', eq: vEq, unknown: 'v', v: 'x', order: 1, ic: { x: 1, y: f.v0 }, domain: { x: f.domain }, yRange: f.vRange };
  const odeY = { kind: 'ode', eq: form.eq, unknown: 'y', v: 'x', order: 1, ic: { x: 1, y: f.v0 }, domain: { x: f.domain } };
  const recognize = {
    kind: 'decision', prompt: 'L\'équation s\'écrit-elle y′ = F(y/x) ?', options: [
      { id: 'yes', label: `Oui : y′ = y/x + ${sup(f.R.replace(/v/g, '(y/x)'))}`, valid: true },
      { id: 'no', label: 'Non, il faut une autre méthode', valid: false, why: 'Divise par x (ou x²) : chaque terme ne dépend que de y/x.' },
    ],
  };
  const vLines = [E(vEq, 'Simplifier', 'reduce', 'reduce'), E(f.sep, 'Séparer', 'separate', 'sep'), E(f.rel, 'Intégrer', 'separate', 'int'), E(`C = ${f.C}`, `v(1) = y(1)/1 = ${rd(f.v0)}`, 'ic', 'ic')];
  if (f.mid) vLines.push(E(f.mid, 'Enlever ln et |…|', 'ic', 'solve'));
  vLines.push(E(`v = ${f.v}`, 'Isoler v', 'ic', 'solve'));
  // The « choose the action » menus read the previous line with the CAS: the
  // separated form is written with ∫ there.
  if (level === 3 && f.kind === 'const') vLines.splice(1, 1);
  else if (level === 3) vLines[1] = E(`int(1/(${f.R}),v) = int(1/x,x)`, 'Séparer', 'separate', 'sep');
  if (level === 1) vLines[0] = { ...vLines[0], ...tpl(vEq, [f.R]) };
  if (level === 2) vLines[2] = { ...vLines[2], ...tpl(f.rel, [f.rel.split(' = ')[0]]) };
  const parts = [];
  if (level >= 2) {
    parts.push({
      start: 'd(x v)', judge: { kind: 'equiv', vars: ['x', 'v', 'w'], implicit: { v: 'w' }, target: 'no-prime', domain: { x: [0.5, 2] } },
      pre: level === 3 ? [recognize] : [], lines: [E("v+x v'", 'Règle du produit', 'substitute', 'subst')],
    });
  }
  parts.push({ html: 'Remplace y par xv et y′ par v + xv′ : l\'équation en v.', ask: 'v =', start: form.sub, judge: odeV, lines: vLines });
  parts.push({ html: 'Reviens à y = x·v.', ask: 'y =', start: 'y = x v', judge: odeY, lines: [E(`y = ${f.y}`, 'y = x·v', 'back', 'back')] });
  const { start, judge, script } = partsScript(parts, level, CHOICES);
  return linesItem({
    skill: SK, level, mode: modeOf(level), start, judge, script,
    prompt: `Résous ${MT(form.eq)}, y(1) = ${MT(f.v0)}, pour x > 0.${level >= 2 ? ' Pose y = x·v(x), puis écris y′ = (xv)′.' : ' On pose y = x·v(x) : y′ = v + x·v′.'}`,
    hints: H('Pose y = xv et dérive avec la règle du produit ; l\'équation devient séparable en v.',
      `y′ = v + x·v′, puis x·v′ = ${sup(f.R)} ; ∫ dv/(${sup(f.R)}) = ${f.prim}.`,
      `${MT(vEq)}, puis ${MT(f.rel)}.`),
    subgoals: SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SK}:${level}:${form.eq}:${f.v0}`, exam: examTag(opts),
  });
}

function mcqVariant(level, rng, opts) {
  const f = family(rng);
  const form = rng.pick(f.forms);
  return mcq4({
    skill: SK, level, key: `${SK}:mcq:${form.eq}:${f.v0}`, exam: examTag(opts),
    prompt: `La solution de ${MT(form.eq)}, y(1) = ${MT(f.v0)}, pour x > 0, est :`,
    right: MT(`y = ${f.y}`),
    wrongs: [
      opt(`y = ${f.v0 === '0' ? '0' : `${f.v0}x`}`, 'a2_ode_homog_derivative'),
      f.late && opt(`y = ${f.late}`, 'a2_ode_sep_constant_late'),
      opt(`y = ${f.wrongV}`),
    ],
    fillers: [opt(`y = x^2 ${f.wrongV}`), opt(`y = ${f.wrongV}/x`)],
    solution: [{ html: `y = xv, y′ = v + xv′ : ${MT(`x v'=${f.R}`)} ; ${MT(f.rel)}, C = ${rd(f.C)}, v = ${MT(f.v)}.`, note: '' }],
    expectedSec: 180,
  }, rng);
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return mcqVariant(4, rng, opts);
    if (level === 5 && rng.chance(0.5)) return mcqVariant(5, rng, opts);
    return linesVariant(level, rng, opts);
  },
};
