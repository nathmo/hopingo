// Generators of module A2, part e (step U6): stationary points (∇f = 0,
// judge `system`) and their nature with the 2 × 2 Hessian (judges `mat`,
// `det`, `value`, and a decision per point). Catalogue:
// docs/universite/A2-analyse-2.md, `a2-crit-points`, `a2-hessian-2x2`.
//
// f is built from its stationary points (families of the catalogue):
//   A  f = p(x) + q(y), p′ = c₁(x − a₁)(x − a₂), q′ = c₂(y − b₁)(y − b₂): 4 points
//   B  f = σ(x³ + 3xy² − 3sx − 6ty), s = a² + b², t = ab: (a, b), (b, a), −…
//   B0 the same with b = 0: xy = 0, a case « x = 0 ou y = 0 »
//   C  f = x³ + εy³ + 3kxy: x(x³ + εk³) = 0, points (0, 0) and (−εk, −k)

import {
  q, XY, KEYS, poly, padd, pscale, pmul, psub, pd, pat, ptxt, N, ptT, ptR, listT, rd, RD, substT,
  sysCfg, SML, partsLines, linesItem, mcq4, vfMcq, tfItem, problemItem, natureDecision, H, E, MT, blanked, examTag,
} from './analyse2-e-kit.js';

export const CP = 'a2-crit-points';
export const H2 = 'a2-hessian-2x2';

const CP_SUB = [
  { id: 'gradient', label: 'dérivées partielles', skill: 'a2-partials' },
  { id: 'system', label: 'système ∇f = 0', skill: 'eq-systems' },
  { id: 'transform', label: 'transformer le système', skill: 'eq-systems' },
  { id: 'cases', label: 'séparer les cas', skill: 'eq-systems' },
  { id: 'list', label: 'liste des points', skill: CP },
];
const H2_SUB = [
  { id: 'hessian', label: 'hessienne', skill: 'a2-partials' },
  { id: 'det', label: 'déterminant', skill: 'l-det-cofactor' },
  { id: 'classify', label: 'nature des points', skill: H2 },
];

const CP_CHOICES = [
  { id: 'grad', label: 'Calculer une dérivée partielle' },
  { id: 'simplify', label: 'Simplifier chaque équation (diviser par une constante)' },
  { id: 'factor', label: 'Factoriser une équation' },
  { id: 'express', label: 'Exprimer y en fonction de x' },
  { id: 'subst', label: 'Substituer dans l\'autre équation' },
  { id: 'sumprod', label: 'Former (x + y)² et (x − y)²' },
  { id: 'cases', label: 'Séparer les cas (« … ou … »)' },
  { id: 'list', label: 'Écrire la liste des points' },
  { id: 'divide', label: 'Diviser par x (ou par y)', rule: 'a2_crit_divide', why: 'x (ou y) peut valoir 0 : diviser par lui perd les solutions où il est nul. Factorise et sépare les cas.' },
];
const H2_CHOICES = [
  { id: 'hessian', label: 'Calculer la hessienne' },
  { id: 'det', label: 'Calculer det H' },
  { id: 'evaldet', label: 'Évaluer det H au point' },
  { id: 'evalfxx', label: 'Évaluer f_xx au point' },
  { id: 'evalf', label: 'Calculer la valeur de f au point' },
  { id: 'fromdet', label: 'Conclure avec det H seul', rule: 'a2_hess_det_only', why: 'det H > 0 dit seulement que les deux valeurs propres ont le même signe : le signe de f_xx sépare le minimum du maximum.' },
];
// The choices of a menu: the actions used, the trap, one more.
const choicesOf = (all, acts, extra) => all.filter((c) => acts.includes(c.id) || extra.includes(c.id));

// ---------- texts ----------

// (x − a) as a factor: x, (x-2), (x+3).
const lf = (v, a) => (a === 0 ? v : `(${v}${a > 0 ? '-' : '+'}${Math.abs(a)})`);
const cT = (c) => (c === 1 ? '' : c === -1 ? '-' : String(c));
// c(v − a₁)(v − a₂), the bare letter first.
const fact2 = (c, v, a1, a2) => `${cT(c)}${a2 === 0 ? lf(v, a2) + lf(v, a1) : lf(v, a1) + lf(v, a2)}`;
const eqs = (...xs) => xs.join(' ; ');
const sortPts = (pts) => [...pts].sort((u, v) => u[0] - v[0] || u[1] - v[1]);

// ---------- data ----------

function famA(rng) {
  for (let i = 0; i < 200; i++) {
    const c1 = rng.pick([3, -3, 6, -6]);
    const c2 = rng.pick([3, -3, 6, -6]);
    const r = () => { let a = rng.int(-3, 5); let b = rng.int(-3, 5); if (a > b) [a, b] = [b, a]; return [a, b]; };
    let [a1, a2] = r();
    let [b1, b2] = r();
    if (a1 === a2 || b1 === b2) continue;
    // A root 0 (the division trap) in about half the items.
    if (rng.chance(0.5) && ![a1, a2, b1, b2].includes(0)) {
      if (rng.chance(0.5)) { if (a1 < 0 && a2 > 0) continue; [a1, a2] = a2 <= 0 ? [a1, 0] : [0, a2]; } else { if (b1 < 0 && b2 > 0) continue; [b1, b2] = b2 <= 0 ? [b1, 0] : [0, b2]; }
      if (a1 === a2 || b1 === b2) continue;
    }
    if ((c1 * (a1 + a2)) % 2 || (c2 * (b1 + b2)) % 2) continue;
    const p = poly([[q(c1, 3), [3, 0]], [q(-c1 * (a1 + a2), 2), [2, 0]], [c1 * a1 * a2, [1, 0]]]);
    const qq = poly([[q(c2, 3), [0, 3]], [q(-c2 * (b1 + b2), 2), [0, 2]], [c2 * b1 * b2, [0, 1]]]);
    const f = padd(p, qq);
    const pts = [[a1, b1], [a1, b2], [a2, b1], [a2, b2]];
    const fx = pd(f, 0);
    const fy = pd(f, 1);
    const fa = fact2(c1, 'x', a1, a2);
    const fb = fact2(c2, 'y', b1, b2);
    const lines = [
      { math: eqs(`${fa} = 0`, `${fb} = 0`), note: 'Factoriser chaque équation', act: 'factor', sub: 'transform' },
      { math: eqs(`(x = ${a1} ou x = ${a2})`, `(y = ${b1} ou y = ${b2})`), note: 'Un produit est nul si l\'un des facteurs l\'est : 2 × 2 = 4 cas', act: 'cases', sub: 'cases' },
    ];
    return { fam: 'A', f, fx, fy, pts, lines, factors: [fa, fb], zero: [a1, a2, b1, b2].includes(0) };
  }
  return null;
}

function famB(rng, zero) {
  for (let i = 0; i < 200; i++) {
    const a = rng.int(1, 4);
    const b = zero ? 0 : rng.int(1, 3);
    if (!zero && b >= a) continue;
    const sg = rng.pick([1, -1]);
    const s = a * a + b * b;
    const t = a * b;
    const f = pscale(poly([[1, [3, 0]], [3, [1, 2]], [-3 * s, [1, 0]], [-6 * t, [0, 1]]]), sg);
    const fx = pd(f, 0);
    const fy = pd(f, 1);
    let pts;
    let lines;
    if (zero) {
      pts = [[0, a], [0, -a], [a, 0], [-a, 0]];
      lines = [
        { math: eqs(`x^2+y^2 = ${s}`, 'xy = 0'), note: `Diviser par ${rd(3 * sg)} et par ${rd(6 * sg)}`, act: 'simplify', sub: 'system' },
        { math: eqs('(x = 0 ou y = 0)', `x^2+y^2 = ${s}`), note: 'xy = 0 : x = 0 ou y = 0 (sans diviser !)', act: 'factor', sub: 'cases' },
        { math: `(x = 0 ; y^2 = ${s}) ou (y = 0 ; x^2 = ${s})`, note: 'Les deux cas', act: 'cases', sub: 'cases' },
        { math: listT(pts), note: 'Les points stationnaires', act: 'list', sub: 'list' },
      ];
    } else {
      pts = [[a, b], [b, a], [-b, -a], [-a, -b]];
      lines = [
        { math: eqs(`x^2+y^2 = ${s}`, `xy = ${t}`), note: `Diviser par ${rd(3 * sg)} et par ${rd(6 * sg)}`, act: 'simplify', sub: 'system' },
        { math: eqs(`(x+y)^2 = ${(a + b) ** 2}`, `(x-y)^2 = ${(a - b) ** 2}`), note: `(x ± y)² = x² + y² ± 2xy = ${s} ± ${2 * t}`, act: 'sumprod', sub: 'transform' },
        { math: eqs(`(x+y = ${a + b} ou x+y = ${-(a + b)})`, `(x-y = ${a - b} ou x-y = ${b - a})`), note: 'Racines carrées : 4 cas', act: 'cases', sub: 'cases' },
        { math: listT(pts), note: 'Chaque cas est un système linéaire', act: 'list', sub: 'list' },
      ];
    }
    return { fam: zero ? 'B0' : 'B', f, fx, fy, pts, lines, zero: !!zero };
  }
  return null;
}

function famC(rng) {
  const k = rng.pick([1, 2, 3, -1, -2, -3]);
  const e = rng.pick([1, -1]);
  const f = poly([[1, [3, 0]], [e, [0, 3]], [3 * k, [1, 1]]]);
  const fx = pd(f, 0);
  const fy = pd(f, 1);
  const pts = [[0, 0], [-e * k, -k]];
  const yT = k === 1 ? '-x^2' : k === -1 ? 'x^2' : `${k > 0 ? '-' : ''}x^2/${Math.abs(k)}`;
  const c3 = e * k ** 3;
  const lines = [
    { math: eqs(`y = ${yT}`, `${e === 1 ? '' : '-'}y^2${k > 0 ? '+' : '-'}${Math.abs(k) === 1 ? '' : Math.abs(k)}x = 0`), note: `1re équation : y = ${RD(yT, XY)} ; la 2e divisée par 3`, act: 'express', sub: 'transform' },
    { math: eqs(`y = ${yT}`, `x(x^3${c3 > 0 ? '+' : '-'}${Math.abs(c3)}) = 0`), note: 'Substituer y dans la 2e équation, puis mettre x en facteur (sans diviser par x)', act: 'subst', sub: 'transform' },
    { math: eqs(`y = ${yT}`, `(x = 0 ou x = ${-e * k})`), note: `x = 0, ou x³ = ${-c3}`, act: 'cases', sub: 'cases' },
    { math: listT(pts), note: `y = ${RD(yT, XY)} dans chaque cas`, act: 'list', sub: 'list' },
  ];
  return { fam: 'C', f, fx, fy, pts, lines, zero: true };
}

const FALLBACK = () => {
  // 2019 Q17: x³ + y³ + 3x² − 9y² − 8 (family A, roots 0, −2 and 0, 6).
  const f = poly([[1, [3, 0]], [1, [0, 3]], [3, [2, 0]], [-9, [0, 2]], [-8, [0, 0]]]);
  const pts = [[-2, 0], [-2, 6], [0, 0], [0, 6]];
  return {
    fam: 'A', f, fx: pd(f, 0), fy: pd(f, 1), pts, zero: true, factors: ['3x(x+2)', '3y(y-6)'], fallback: true,
    lines: [
      { math: eqs('3x(x+2) = 0', '3y(y-6) = 0'), note: 'Factoriser chaque équation', act: 'factor', sub: 'transform' },
      { math: eqs('(x = -2 ou x = 0)', '(y = 0 ou y = 6)'), note: 'Un produit est nul si l\'un des facteurs l\'est : 4 cas', act: 'cases', sub: 'cases' },
    ],
  };
};

// fams: allowed families. Adds the texts, the Hessian and the natures.
export function critData(rng, fams = ['A', 'B', 'B0', 'C']) {
  const fam = rng.pick(fams);
  const d = (fam === 'A' ? famA(rng) : fam === 'C' ? famC(rng) : famB(rng, fam === 'B0')) || FALLBACK();
  d.fT = ptxt(d.f, XY);
  d.fxT = ptxt(d.fx, XY);
  d.fyT = ptxt(d.fy, XY);
  d.start = eqs(`${d.fxT} = 0`, `${d.fyT} = 0`);
  d.pts = d.pts.map((p) => p.map((x) => q(x)));
  d.cfg = sysCfg(XY, sortPts(d.pts).map((p) => p.map(String)));
  d.fxx = pd(d.fx, 0);
  d.fxy = pd(d.fx, 1);
  d.fyy = pd(d.fy, 1);
  d.det = psub(pmul(d.fxx, d.fyy), pmul(d.fxy, d.fxy));
  d.HT = `[[${ptxt(d.fxx, XY)}, ${ptxt(d.fxy, XY)}], [${ptxt(d.fxy, XY)}, ${ptxt(d.fyy, XY)}]]`;
  d.detT = ptxt(d.det, XY);
  d.info = d.pts.map((p) => {
    const det = pat(d.det, p);
    const fxx = pat(d.fxx, p);
    const nature = det.n < 0 ? 'saddle' : det.n === 0 ? 'none' : fxx.n > 0 ? 'min' : 'max';
    return { p, det, fxx, nature, value: pat(d.f, p) };
  });
  return d;
}

const andList = (xs) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} et ${xs[xs.length - 1]}` : xs[0]);
const env = (p) => ({ x: N(p[0]), y: N(p[1]) });
const NAT_WORD = { min: 'minimum local', max: 'maximum local', saddle: 'point selle', none: 'on ne peut pas conclure avec H' };

// ---------- parts ----------

// The gradient: one part per partial derivative.
function gradParts(d, level) {
  const line = (t, which) => {
    const l = E(t, `Dériver en ${which}, ${which === 'x' ? 'y' : 'x'} constant`, 'gradient', 'grad');
    return level <= 2 ? blanked(l, [firstPos(t)], { vars: XY }) : l;
  };
  return [
    { start: `pd(${d.fT},x)`, judge: { kind: 'equiv', vars: XY, target: 'no-prime' }, lines: [line(d.fxT, 'x')] },
    { html: 'Puis ∂f/∂y :', ask: '∂f/∂y =', start: `pd(${d.fT},y)`, judge: { kind: 'equiv', vars: XY, target: 'no-prime' }, lines: [line(d.fyT, 'y')] },
  ];
}
// A positive term of a polynomial text (a blank of the guided levels).
function firstPos(t) {
  const terms = t.replace(/-/g, '+-').split('+').filter(Boolean);
  return terms.find((x) => !x.startsWith('-') && /[xy]/.test(x)) || terms.find((x) => !x.startsWith('-')) || t;
}

// The system ∇f = 0, from its first line on.
function systemPart(d, level, { from = 0, pre = [] } = {}) {
  const lines = d.lines.slice(from).map((l) => E(l.math, l.note, l.sub, l.act));
  return {
    html: 'Résous ∇f = 0 :', ask: '⇔',
    start: from ? d.lines[from - 1].math : d.start, judge: d.cfg, pre, lines,
  };
}

// The nature of each point: H, det H, then per point det H(p) (and f_xx(p)),
// a decision, and the value of f at a local extremum to end.
export function classifyParts(d, pts, level, { withH = true } = {}) {
  const parts = [];
  if (withH) {
    parts.push({
      html: 'La hessienne de f :', ask: 'H =', start: 'H = ?', judge: { kind: 'mat', vars: XY, expect: d.HT },
      lines: [E(d.HT, 'H = [[f_xx, f_xy], [f_xy, f_yy]]', 'hessian', 'hessian')],
    });
    parts.push({
      html: 'Son déterminant :', ask: 'det H =', start: `det${d.HT.replace(/\s+/g, '')}`, judge: { kind: 'det', vars: XY, target: 'any' },
      lines: [E(d.detT, 'det H = f_xx·f_yy − f_xy²', 'det', 'det')],
    });
  }
  let pending = null;
  const decide = (it) => {
    const rules = {};
    const whys = {
      min: it.det.n > 0 ? `f_xx = ${rd(N(it.fxx))} < 0 : c'est un maximum.` : it.det.n < 0 ? 'det H < 0 : les valeurs propres sont de signes opposés.' : 'det H = 0 : la hessienne ne décide pas.',
      max: it.det.n > 0 ? `f_xx = ${rd(N(it.fxx))} > 0 : c'est un minimum.` : it.det.n < 0 ? 'det H < 0 : les valeurs propres sont de signes opposés.' : 'det H = 0 : la hessienne ne décide pas.',
      saddle: it.det.n > 0 ? 'det H > 0 : les deux valeurs propres ont le même signe, ce n\'est pas un point selle.' : 'det H = 0 : la hessienne ne décide pas.',
      none: 'det H ≠ 0 : la hessienne décide.',
    };
    if (it.nature === 'max') rules.min = 'a2_hess_det_only';
    if (it.nature === 'none') rules.saddle = 'a2_hess_degenerate';
    const info = it.det.n > 0 ? `det H = ${rd(N(it.det))} > 0 et f_xx = ${rd(N(it.fxx))}` : `det H = ${rd(N(it.det))}`;
    return natureDecision(`En ${ptR(it.p)} : ${info}. Nature du point ?`, it.nature, rules, whys);
  };
  for (const it of pts) {
    const e = env(it.p);
    const l = E(N(it.det), `det H${ptR(it.p)}`, 'det', 'evaldet');
    parts.push({
      html: `Au point ${ptR(it.p)} :`, ask: 'det H =', start: substT(d.detT, e, XY), judge: { kind: 'value' },
      pre: pending ? [pending] : [], lines: [level <= 2 ? blanked(l, [N(it.det)], { vars: XY }) : l],
    });
    if (it.det.n > 0) {
      const m = E(N(it.fxx), 'det H > 0 : le signe de f_xx décide', 'classify', 'evalfxx');
      parts.push({
        html: 'det H > 0 : le signe de f_xx décide.', ask: 'f_xx =', start: substT(ptxt(d.fxx, XY), e, XY), judge: { kind: 'value' },
        lines: [level <= 2 ? blanked(m, [N(it.fxx)], { vars: XY }) : m],
      });
    }
    pending = decide(it);
  }
  // The value of f at a local extremum (else at the last point).
  const ext = pts.find((x) => x.nature === 'min' || x.nature === 'max') || pts[pts.length - 1];
  const word = ext.nature === 'min' ? 'du minimum local' : ext.nature === 'max' ? 'du maximum local' : 'de f en ce point';
  parts.push({
    html: `Valeur ${word} en ${ptR(ext.p)} :`, ask: 'f =', start: substT(d.fT, env(ext.p), XY), judge: { kind: 'value' },
    pre: [pending], lines: [E(N(ext.value), 'Remplacer x et y dans f', 'classify', 'evalf')],
  });
  return parts;
}

const fML = (d) => MT(d.fT, { vars: XY });
export const matML = (t, vars = XY) => SML({ kind: 'mat', vars }, t);

// ---------- a2-crit-points ----------

function critLines(level, rng, opts) {
  const fams = level === 1 ? ['A'] : level === 2 ? ['A', 'B0'] : ['A', 'B', 'B0', 'C'];
  const d = critData(rng, fams);
  const parts = [];
  let prompt;
  if (level === 1) {
    // ∇f given; each equation factorised with blanks, then the cases.
    parts.push({
      start: d.fxT, judge: { kind: 'equiv', vars: XY, target: 'goal', goal: d.factors[0] },
      lines: [blanked(E(d.factors[0], 'Mettre en facteur', 'transform', 'factor'), factorHoles(d.factors[0]), { vars: XY })],
    });
    parts.push({
      html: 'Factorise ∂f/∂y :', ask: '∂f/∂y =', start: d.fyT, judge: { kind: 'equiv', vars: XY, target: 'goal', goal: d.factors[1] },
      lines: [blanked(E(d.factors[1], 'Mettre en facteur', 'transform', 'factor'), factorHoles(d.factors[1]), { vars: XY })],
    });
    parts.push({ ...systemPart(d, level, { from: 1 }), html: 'Un produit est nul si l\'un des facteurs l\'est. Écris les cas : « (x = … ou x = …) ; (y = … ou y = …) ».' });
    prompt = `Points stationnaires de f(x, y) = ${fML(d)}. On a ∂f/∂x = ${MT(d.fxT, { vars: XY })} et ∂f/∂y = ${MT(d.fyT, { vars: XY })}. Factorise ∂f/∂x :`;
  } else {
    parts.push(...gradParts(d, level));
    const sys = systemPart(d, level);
    // Level 2: the decision comes before the first line of cases.
    if (level === 2) {
      const k = sys.lines.findIndex((l) => /ou/.test(l.math));
      sys.lines.splice(k, 0, casesDecision(d, k));
    }
    parts.push(sys);
    prompt = `Trouve tous les points stationnaires de f(x, y) = ${fML(d)}. Calcule ∂f/∂x :`;
  }
  const acts = [...new Set([...parts.flatMap((p) => p.lines.map((l) => l.act)).filter(Boolean)])];
  return partsLines({
    skill: CP, level, prompt, parts, choices: choicesOf(CP_CHOICES, acts, d.zero ? ['divide', 'express'] : ['express', 'divide']),
    hints: critHints(d), subgoals: CP_SUB, key: `${CP}:${level}:${d.fT}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// Blanks of a factorised text: its brackets (x-2) and a bare letter.
function factorHoles(t) {
  const out = (t.match(/\([^()]*\)/g) || []).map((x) => x.slice(1, -1));
  return out.length ? out.slice(0, 2) : [t];
}

function casesDecision(d, k) {
  const before = k > 0 ? d.lines[k - 1].math : d.start;
  if (d.fam === 'B') {
    return {
      kind: 'decision', prompt: 'x² + y² et xy sont connus. Comment trouver x et y ?', options: [
        { id: 'sum', label: 'Former (x + y)² et (x − y)², puis prendre les racines (± !)', valid: true },
        { id: 'pos', label: 'Former (x + y)² et (x − y)², et garder les racines positives', valid: false, why: 'Une racine carrée donne deux signes : x + y = ±…, et chaque signe donne des points.' },
        { id: 'div', label: 'Diviser xy = … par x pour exprimer y', valid: false, rule: 'a2_crit_divide', why: 'Possible ici (x ≠ 0), mais on tombe sur une équation de degré 4. La somme et le produit vont plus vite.' },
      ],
    };
  }
  return {
    kind: 'decision', prompt: `Comment exploiter le système ${SML(d.cfg, before)} ?`, options: [
      { id: 'cases', label: 'Un produit est nul si l\'un des facteurs l\'est : on sépare les cas', valid: true },
      { id: 'div', label: 'Diviser par la variable en facteur', valid: false, rule: 'a2_crit_divide', why: 'Cette variable peut valoir 0 : on perdrait les points où elle est nulle.' },
      { id: 'one', label: 'Garder seulement le facteur qui n\'est pas une variable seule', valid: false, rule: 'a2_crit_divide', why: 'Chaque facteur nul donne des solutions : il faut tous les cas.' },
    ],
  };
}

function critHints(d) {
  const tip = { A: 'Chaque équation ne contient qu\'une lettre : factorise-la.', B: 'Simplifie, puis forme (x + y)² et (x − y)² avec x² + y² et xy.', B0: 'xy = 0 : x = 0 ou y = 0. Ne divise pas par x !', C: 'Exprime y avec la 1re équation, substitue, puis mets x en facteur (ne divise pas par x).' }[d.fam];
  const mid = d.lines[Math.min(1, d.lines.length - 1)];
  return H(`Calcule ∂f/∂x et ∂f/∂y, puis résous ∇f = 0 sans diviser par une expression qui peut s'annuler. ${tip}`,
    `Le système devient ${SML(d.cfg, d.lines[0].math)}.`,
    `${SML(d.cfg, mid.math)}, puis les points ${d.pts.map((p) => ptR(p.map(String))).join(', ')}.`);
}

// Level 5: alone, chained with the nature of each point.
function critChain(level, rng, opts, skill = CP) {
  const d = critData(rng, ['A', 'B', 'B0', 'C']);
  const pts = pickClassify(d, rng, d.info.length);
  const parts = [...gradParts(d, 5), systemPart(d, 5), ...classifyParts(d, pts, 5)];
  return partsLines({
    skill, level, prompt: `Trouve les points stationnaires de f(x, y) = ${fML(d)}, puis donne la nature de chacun (hessienne). Commence par ∂f/∂x :`,
    parts, choices: [], hints: [], noHints: true, subgoals: [...CP_SUB, ...H2_SUB], key: `${skill}:${level}:chain:${d.fT}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}
// Points to classify, in the order of the system: extrema and saddles.
function pickClassify(d, rng, n) {
  const ext = d.info.filter((x) => x.nature === 'min' || x.nature === 'max');
  const sad = d.info.filter((x) => x.nature === 'saddle');
  if (n >= d.info.length) return d.info;
  const chosen = [rng.pick(ext), rng.pick(sad)].filter(Boolean);
  for (const x of d.info) if (chosen.length < n && !chosen.includes(x)) chosen.push(x);
  return d.info.filter((x) => chosen.includes(x));
}

// mcq: « Les points stationnaires de f sont : ».
function critMcq(level, rng, opts) {
  const d = critData(rng, ['A', 'B0', 'C', 'B']);
  const P = d.pts.map((p) => p.map(String));
  const show = (pts) => (pts.length ? [...pts].sort((u, v) => Number(u[0]) - Number(v[0]) || Number(u[1]) - Number(v[1])).map(ptR).join(', ') : 'aucun');
  // Divided by x (or y): the points where it is 0 are lost.
  const wrongs = [];
  for (const i of [0, 1]) {
    const kept = P.filter((p) => p[i] !== '0');
    if (kept.length && kept.length < P.length) { wrongs.push({ html: show(kept), rule: 'a2_crit_divide' }); break; }
  }
  wrongs.push({ html: show(P.slice(0, Math.max(1, P.length / 2))) });
  wrongs.push({ html: show(P.map((p) => p.map((x) => (x === '0' ? '0' : x.startsWith('-') ? x.slice(1) : `-${x}`)))) });
  wrongs.push({ html: show([...P, ['1', '1']].filter((p, i, a) => a.findIndex((u) => u.join() === p.join()) === i)) });
  wrongs.push({ html: show(P.map(([x, y]) => [y, x])) });
  return mcq4({
    skill: CP, level, prompt: `Soit f(x, y) = ${fML(d)}. Les points stationnaires de f sont :`,
    right: show(P), wrongs, fillers: [{ html: show([...P, ['0', '0']].filter((p, i, a) => a.findIndex((u) => u.join() === p.join()) === i)) }, { html: show(P.slice(1)) }],
    key: `mcq:${d.fT}`, exam: examTag(opts, 3), expectedSec: 150, fallback: !!d.fallback,
    solution: [{ html: `∇f = 0 : ${SML(d.cfg, d.start)}`, note: '' }, ...d.lines.map((l) => ({ html: SML(d.cfg, l.math), note: l.note }))],
  }, rng);
}

// tf: the catalogue's two statements, and a stationary point to check.
function critTf(level, rng, opts) {
  const kind = rng.pick(['false', 'false', 'c1', 'point']);
  if (kind === 'false') {
    return tfItem({
      skill: CP, level, statement: 'Si ∇f(a) = 0, alors f a un extremum local en a.', truth: false,
      counter: { kind: 'a2', prop: 'stationaryNotExtremum', params: {}, ask: [{ v: 'f', label: 'f(x, y) =', keys: ['calc', 'a2'] }], answer: { f: rng.pick(['x^2-y^2', 'x y', 'x^3+y^2', 'y^2-x^2']) } },
      ruleIfTrue: 'a2_stationary_is_extremum', prompt: 'Vrai ou faux ? Si c\'est faux, donne une fonction f(x, y) pour laquelle (0, 0) contredit l\'énoncé.',
      explanation: 'Faux : x² − y² a ∇f(0, 0) = 0, mais (0, 0) est un point selle (f > 0 sur l\'axe des x, f < 0 sur l\'axe des y).',
      key: `false:${rng.int(0, 9)}`, exam: examTag(opts), hints: H('Pense à une fonction qui monte dans une direction et descend dans l\'autre.', 'Un point selle est stationnaire.', 'x² − y² en (0, 0).'),
    });
  }
  if (kind === 'c1') {
    return tfItem({
      skill: CP, level, statement: 'Si f est de classe C¹ sur un ouvert et a un extremum local en un point p de cet ouvert, alors ∇f(p) = 0.', truth: true,
      ruleIfFalse: null, explanation: 'Vrai : t ↦ f(p + t·eᵢ) a un extremum en t = 0, donc sa dérivée ∂f/∂xᵢ(p) est nulle (condition nécessaire, point intérieur).',
      key: 'c1', exam: examTag(opts), hints: H('Restreins f à une droite passant par p.', 'Une fonction d\'une variable dérivable a f′ = 0 en un extremum intérieur.', 'Chaque ∂f/∂xᵢ(p) est nul.'),
    });
  }
  const d = critData(rng, ['A', 'B', 'C', 'B0']);
  const p = rng.pick(d.pts);
  return tfItem({
    skill: CP, level, statement: `${ptR(p.map(String))} est un point stationnaire de f(x, y) = ${fML(d)}.`, truth: true,
    explanation: `Vrai : ∂f/∂x = ${MT(d.fxT, { vars: XY })} et ∂f/∂y = ${MT(d.fyT, { vars: XY })} s'annulent en ${ptR(p.map(String))}.`,
    key: `pt:${d.fT}:${p.join()}`, exam: examTag(opts), fallback: !!d.fallback,
    hints: H('Calcule les deux dérivées partielles.', 'Remplace x et y par les coordonnées du point.', 'Les deux valent 0.'),
  });
}

export function critPoints(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return critMcq(4, rng, opts);
  if (opts.exam === 'tf') return critTf(4, rng, opts);
  if (level === 5) return critChain(5, rng, opts);
  return critLines(level, rng, opts);
}

// ---------- a2-hessian-2x2 ----------

// Degenerate points (det H = 0): the catalogue's bank, with the direct study.
const DEGEN = [
  { f: 'x^4+y^4', H: '[[0, 0], [0, 0]]', nature: 'min', why: 'f ≥ 0 = f(0, 0) partout', path: 'y = 0', restr: 'x^4', v: 'x' },
  { f: 'x^2+y^4', H: '[[2, 0], [0, 0]]', nature: 'min', why: 'f ≥ 0 = f(0, 0) partout', path: 'x = 0', restr: 'y^4', v: 'y' },
  { f: 'x^2y^2', H: '[[0, 0], [0, 0]]', nature: 'min', why: 'f ≥ 0 = f(0, 0) partout (minimum non strict)', path: 'y = x', restr: 'x^4', v: 'x' },
  { f: '-x^4-y^4', H: '[[0, 0], [0, 0]]', nature: 'max', why: 'f ≤ 0 = f(0, 0) partout', path: 'y = 0', restr: '-x^4', v: 'x' },
  { f: 'x^4-y^4', H: '[[0, 0], [0, 0]]', nature: 'saddle', why: 'f(x, 0) = x⁴ > 0 et f(0, y) = −y⁴ < 0', path: 'y = 0', restr: 'x^4', v: 'x' },
  { f: 'x^3+y^2', H: '[[0, 0], [0, 2]]', nature: 'saddle', why: 'sur la droite y = 0, f = x³ change de signe en 0', path: 'y = 0', restr: 'x^3', v: 'x' },
];

function hessLines(level, rng, opts) {
  if (level === 4 && rng.chance(0.3)) return degenerateLines(level, rng, opts);
  const d = critData(rng, ['A', 'B', 'B0', 'C']);
  const n = level <= 3 ? 2 : Math.min(d.info.length, 3);
  const pts = pickClassify(d, rng, n);
  const parts = classifyParts(d, pts, level, { withH: level >= 2 });
  const given = level === 1 ? ` Sa hessienne est H = ${matML(d.HT)}, de déterminant det H = ${MT(d.detT, { vars: XY })}.` : '';
  const tree = level <= 2 ? '<br>Arbre : det H &lt; 0 → point selle ; det H &gt; 0 et f_xx &gt; 0 → minimum ; det H &gt; 0 et f_xx &lt; 0 → maximum ; det H = 0 → on ne peut pas conclure.' : '';
  const first = level === 1 ? `Calcule det H en ${ptR(pts[0].p)} :` : 'Calcule la hessienne H :';
  const acts = [...new Set(parts.flatMap((p) => p.lines.map((l) => l.act)))];
  return partsLines({
    skill: H2, level, parts, choices: choicesOf(H2_CHOICES, acts, ['fromdet']),
    prompt: `Les points ${andList(pts.map((x) => ptR(x.p)))} sont des points stationnaires de f(x, y) = ${fML(d)}. Donne leur nature.${given}${tree}<br>${first}`,
    hints: H('Calcule det H au point ; s\'il est positif, regarde le signe de f_xx.',
      `${ptR(pts[0].p)} : det H = ${MT(substT(d.detT, env(pts[0].p), XY))} = …`,
      `${ptR(pts[0].p)} : det H = ${rd(N(pts[0].det))}${pts[0].det.n > 0 ? `, f_xx = ${rd(N(pts[0].fxx))}` : ''} : ${NAT_WORD[pts[0].nature]}.`),
    subgoals: H2_SUB, key: `${H2}:${level}:${d.fT}:${pts.map((x) => x.p.join()).join('|')}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// det H(0, 0) = 0: the Hessian does not decide; restriction to a line.
function degenerateLines(level, rng, opts) {
  const g = rng.pick(DEGEN);
  const parts = [
    { start: 'H(0 ; 0) = ?', judge: { kind: 'mat', expect: g.H }, lines: [E(g.H, 'Dérivées secondes en (0, 0)', 'hessian', 'hessian')] },
    {
      html: 'Son déterminant :', ask: 'det H =', start: `det${g.H.replace(/\s+/g, '')}`, judge: { kind: 'det', target: 'number' },
      lines: [E('0', 'det H(0, 0) = 0', 'det', 'det')],
    },
    {
      html: `La hessienne ne décide pas : on étudie f directement. Restriction de f à la droite ${g.path} :`, ask: 'f =',
      start: substT(g.f, g.path === 'y = 0' ? { y: '0' } : g.path === 'x = 0' ? { x: '0' } : { y: 'x' }, XY), judge: { kind: 'equiv', vars: XY, target: 'any' },
      pre: [{
        kind: 'decision', prompt: 'det H(0, 0) = 0. Que peut-on conclure avec la hessienne ?', options: [
          { id: 'none', label: 'Rien : il faut étudier f autour de (0, 0)', valid: true },
          { id: 'saddle', label: 'C\'est un point selle', valid: false, rule: 'a2_hess_degenerate', why: 'x⁴ + y⁴ et x⁴ − y⁴ ont la même hessienne nulle en (0, 0) : l\'une a un minimum, l\'autre non.' },
          { id: 'noext', label: 'Ce n\'est pas un extremum', valid: false, rule: 'a2_hess_degenerate', why: 'x⁴ + y⁴ a une hessienne nulle en (0, 0) et pourtant un minimum.' },
        ],
      }],
      lines: [E(g.restr, `f sur ${g.path}`, 'classify', 'restrict')],
    },
    {
      html: 'Valeur de f en (0, 0) :', ask: 'f(0, 0) =', start: substT(g.f, { x: '0', y: '0' }, XY), judge: { kind: 'value' },
      pre: [natureDecision(`f(0, 0) = 0 et, sur la droite ${g.path}, f = ${RD(g.restr, XY)}. Nature de (0, 0) ?`, g.nature, { saddle: g.nature === 'min' || g.nature === 'max' ? 'a2_hess_degenerate' : undefined }, {
        min: g.nature === 'saddle' ? `Non : ${g.why}.` : 'Regarde le signe de f.', max: g.nature === 'saddle' ? `Non : ${g.why}.` : 'Regarde le signe de f.',
        saddle: `Non : ${g.why}.`, none: 'On a étudié f directement : on peut conclure.',
      })],
      lines: [E('0', 'f(0, 0) = 0', 'classify', 'evalf')],
    },
  ];
  return partsLines({
    skill: H2, level, parts, choices: [],
    prompt: `(0, 0) est un point stationnaire de f(x, y) = ${MT(g.f, { vars: XY })}. Donne sa nature. Calcule H(0, 0) :`,
    hints: H('Calcule H(0, 0). Si det H = 0, la hessienne ne décide pas : étudie le signe de f − f(0, 0).', `Restreins f à ${g.path}.`, `${g.why} : ${NAT_WORD[g.nature] === 'point selle' ? 'pas d\'extremum (point selle)' : NAT_WORD[g.nature]}.`),
    subgoals: H2_SUB, key: `${H2}:${level}:degen:${g.f}`, exam: examTag(opts),
  });
}

// Level 5 (2019 Q17, 2021 Q17): the points, then a multiple choice on their nature.
function hessProblem(level, rng, opts) {
  const d = critData(rng, ['A', 'B', 'B0', 'C']);
  const sys = partsLines({
    skill: H2, level, parts: [...gradParts(d, 5), systemPart(d, 5)], choices: [], hints: [], noHints: true,
    prompt: `Points stationnaires de f(x, y) = ${fML(d)}. Calcule ∂f/∂x :`, subgoals: CP_SUB, key: `${H2}:5:sys:${d.fT}`,
  });
  return problemItem({
    skill: H2, level, prompt: `Soit f(x, y) = ${fML(d)}. Trouve ses points stationnaires, puis choisis l'affirmation vraie sur leur nature.`,
    parts: [
      { item: sys, points: 4, title: 'Points stationnaires' },
      { item: natureMcq(d, rng, level), points: 3, title: 'Nature des points' },
    ],
    key: `${level}:${d.fT}`, exam: examTag(opts, 7), fallback: !!d.fallback,
  });
}

// « Laquelle des affirmations suivantes est vraie ? » (2019 Q17).
function natureMcq(d, rng, level, opts = {}) {
  const say = (it, nat) => `f a ${{ min: 'un minimum local', max: 'un maximum local', saddle: 'un point selle' }[nat]} en ${ptR(it.p)}`;
  const ext = d.info.filter((x) => x.nature === 'min' || x.nature === 'max');
  const sad = d.info.filter((x) => x.nature === 'saddle');
  const right = rng.pick(ext);
  const wrongs = [];
  const mx = d.info.find((x) => x.nature === 'max');
  if (mx) wrongs.push({ html: say(mx, 'min'), rule: 'a2_hess_det_only' });
  if (sad.length) wrongs.push({ html: say(sad[0], right.nature), rule: 'a2_stationary_is_extremum' });
  wrongs.push({ html: say(right, 'saddle') });
  const other = ext.find((x) => x !== right);
  if (other) wrongs.push({ html: say(other, other.nature === 'min' ? 'max' : 'min') });
  if (sad[1]) wrongs.push({ html: say(sad[1], 'max') });
  const fillers = [{ html: say(right, right.nature === 'min' ? 'max' : 'min') }, ...sad.map((x) => ({ html: say(x, right.nature === 'min' ? 'max' : 'min') }))];
  return mcq4({
    skill: H2, level, prompt: `Soit f(x, y) = ${fML(d)}, dont les points stationnaires sont ${d.pts.map((p) => ptR(p.map(String))).join(', ')}. Laquelle de ces affirmations est vraie ?`,
    right: say(right, right.nature), wrongs, fillers, key: `mcq:${d.fT}`, exam: opts.exam || false, expectedSec: 150, fallback: !!d.fallback,
    solution: [{ html: `H = ${matML(d.HT)}, det H = ${MT(d.detT, { vars: XY })}`, note: '' },
      ...d.info.map((x) => ({ html: `${ptR(x.p)} : det H = ${rd(N(x.det))}${x.det.n > 0 ? `, f_xx = ${rd(N(x.fxx))}` : ''} : ${NAT_WORD[x.nature]}`, note: '' }))],
  }, rng);
}

// mcq on a degenerate point (det H = 0 and an extremum).
function degenerateMcq(level, rng, opts) {
  const g = rng.pick(DEGEN.filter((x) => x.nature !== 'saddle'));
  const word = g.nature === 'min' ? 'un minimum local' : 'un maximum local';
  return mcq4({
    skill: H2, level, prompt: `Soit f(x, y) = ${MT(g.f, { vars: XY })}. On a ∇f(0, 0) = 0 et det H(0, 0) = 0. Laquelle de ces affirmations est vraie ?`,
    right: `(0, 0) est ${word} de f`,
    wrongs: [
      { html: '(0, 0) est un point selle, puisque det H(0, 0) = 0', rule: 'a2_hess_degenerate' },
      { html: `(0, 0) est ${g.nature === 'min' ? 'un maximum local' : 'un minimum local'} de f` },
      { html: '(0, 0) n\'est pas un point stationnaire de f' },
    ],
    key: `mcq:degen:${g.f}`, exam: examTag(opts, 3), expectedSec: 90,
    solution: [{ html: `det H = 0 : la hessienne ne décide pas. Mais ${g.why} : ${word}.`, note: '' }],
  }, rng);
}

function hessTf(level, rng, opts) {
  const kind = rng.pick(['zero', 'zero', 'pos', 'neg']);
  if (kind === 'zero') {
    return tfItem({
      skill: H2, level, statement: 'Si a est un point stationnaire de f ∈ C² et det H_f(a) = 0, alors f n\'a pas d\'extremum local en a.', truth: false,
      counter: { kind: 'a2', prop: 'degenerateExtremum', params: {}, ask: [{ v: 'f', label: 'f(x, y) =', keys: ['calc', 'a2'] }], answer: { f: rng.pick(['x^4+y^4', 'x^2y^2', 'x^2+y^4']) } },
      ruleIfTrue: 'a2_hess_degenerate', prompt: 'Vrai ou faux ? Si c\'est faux, donne une fonction f(x, y) avec a = (0, 0) qui contredit l\'énoncé.',
      explanation: 'Faux : x⁴ + y⁴ a ∇f(0, 0) = 0 et une hessienne nulle en (0, 0), mais (0, 0) est un minimum (f ≥ 0).',
      key: `zero:${rng.int(0, 9)}`, exam: examTag(opts), hints: H('det H = 0 : la hessienne ne décide pas, dans un sens comme dans l\'autre.', 'Cherche une fonction de degré 4.', 'x⁴ + y⁴.'),
    });
  }
  if (kind === 'pos') {
    return tfItem({
      skill: H2, level, statement: 'Soit f ∈ C²(ℝ²) et a un point stationnaire de f. Si det H_f(a) > 0, alors f a un extremum local en a.', truth: true,
      explanation: 'Vrai en dimension 2 : det H > 0 dit que les deux valeurs propres ont le même signe ; f_xx(a) ≠ 0 donne ce signe (minimum ou maximum). Faux en dimension 3 : (−, −, +) a aussi un produit positif.',
      key: 'pos', exam: examTag(opts), hints: H('det H est le produit des deux valeurs propres.', 'Même signe : H est définie positive ou négative.', 'Vrai (en 2 × 2).'),
    });
  }
  return tfItem({
    skill: H2, level, statement: 'Soit f ∈ C²(ℝ²) et a un point stationnaire de f. Si det H_f(a) < 0, alors a est un point selle.', truth: true,
    explanation: 'Vrai : det H < 0 veut dire deux valeurs propres de signes opposés ; f monte dans une direction propre et descend dans l\'autre.',
    key: 'neg', exam: examTag(opts), hints: H('det H est le produit des valeurs propres.', 'Signes opposés.', 'Point selle.'),
  });
}

export function hessian2(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return rng.chance(0.3) ? degenerateMcq(4, rng, opts) : natureMcq(critData(rng), rng, 4, { exam: examTag(opts, 3) });
  if (opts.exam === 'tf') return hessTf(4, rng, opts);
  if (level === 5) return hessProblem(5, rng, opts);
  return hessLines(level, rng, opts);
}

void linesItem; void vfMcq;
