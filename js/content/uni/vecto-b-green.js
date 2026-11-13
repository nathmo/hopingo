// v-green and v-green-flux (module V, part b, step U10): Green's theorem
// ∮ F · dl = ∬ rot F (rot F constant: ∮ = rot F × aire), the area by
// ½∮(x dy − y dx), the case where Green does not apply (a singularity in
// the domain), and the flux form ∮ F · ν dl = ∬ div F on squares,
// triangles and discs. Items are partsItem (vecto-b-kit.js): parts `equiv`
// (rot F, div F), `domain` (bounds), `param` (a boundary), `vector` (ν),
// `definite` (the integrals).

import {
  KEYS, q, qs, cm, sum, poly, piT, fr, pick, SG, H, MT, PML, VML,
  vecJudge, defJudge, eqJudge, partsItem, examTag, choice, opt, decision, menu,
} from './vecto-b-kit.js';
import { t } from '../../i18n.js';

const COS2 = t('On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t.');
const XY = ['x', 'y'];

// ---------- v-green ----------

// A domain D of the plane, its area (texts) and ∬_D c dx dy.
function domain2(rng, kinds) {
  const kind = pick(rng, kinds);
  if (kind === 'disk') {
    const R = pick(rng, [1, 2, 3]);
    return { kind, id: `disk${R}`, html: t('le disque D = {x² + y² ≤ {a}}', { a: R * R }), area: q(R * R), areaPi: true, int: (c) => `int(int(${cm(c, 'r')}, r, 0, ${R}), φ, 0, 2π)`, coords: t('en polaires (dx dy = r dr dφ)'), R };
  }
  if (kind === 'half') {
    const R = pick(rng, [1, 2, 3]);
    return { kind, id: `half${R}`, html: t('le demi-disque D = {x² + y² ≤ {a}, y ≥ 0}', { a: R * R }), area: q(R * R, 2), areaPi: true, int: (c) => `int(int(${cm(c, 'r')}, r, 0, ${R}), φ, 0, π)`, coords: t('en polaires'), R };
  }
  if (kind === 'ellipse') {
    const [a, b] = rng.shuffle([2, 3, 4]).slice(0, 2);
    return { kind, id: `ell${a}${b}`, html: t('l\'ellipse pleine D = {x²/{a} + y²/{b} ≤ 1}', { a: a * a, b: b * b }), area: q(a * b), areaPi: true, int: (c) => `int(int(${cm(c * a * b, 'r')}, r, 0, 1), φ, 0, 2π)`, coords: t('avec x = {a}r cos φ, y = {b}r sin φ (dx dy = {c}r dr dφ)', { a, b, c: a * b }), a, b };
  }
  if (kind === 'square') {
    const s = pick(rng, [1, 2, 3]);
    return { kind, id: `sq${s}`, html: t('le carré D = [0 ; {s}] × [0 ; {s}]', { s }), area: q(s * s), areaPi: false, int: (c) => `int(int(${c}, y, 0, ${s}), x, 0, ${s})`, coords: '', s };
  }
  const a = pick(rng, [1, 2, 3, 4]);
  const b = pick(rng, [2, 4, 6].filter((x) => x !== a));
  return { kind: 'tri', id: `tri${a}${b}`, html: t('le triangle D de sommets (0, 0), ({a}, 0) et (0, {b})', { a, b }), area: q(a * b, 2), areaPi: false, int: (c) => `int(int(${c}, y, 0, ${sum([String(b), cm(q(-b, a), 'x')])}), x, 0, ${a})`, coords: '', a, b };
}
const areaT = (D, c = 1) => (D.areaPi ? piT(D.area.mul(c)) : qs(D.area.mul(c)));

// F = (−b y + p(x), a x + q(y)) with rot F = a + b.
function fieldG(rng, plain) {
  const a = pick(rng, [1, 2, 3]);
  const b = pick(rng, [1, 2, 3]);
  const p = plain ? '' : pick(rng, ['', 'x^2', '3x', '-x^2', '2']);
  const qq = plain ? '' : pick(rng, ['', 'y^2', '-2y', 'y^3', '1']);
  const P = sum([cm(-b, 'y'), p]);
  const Q = sum([cm(a, 'x'), qq]);
  return { a, b, P, Q, rot: a + b, id: `${a}${b}${p}${qq}` };
}
const Fhtml = (F) => `F = (${MT(F.P)}, ${MT(F.Q)})`;

const SUB_GREEN = [
  SG('rot', 'rot F = ∂F₂/∂x − ∂F₁/∂y', 'v-ops'),
  SG('formula', t('appliquer Green'), 'v-green'),
  SG('param', t('paramétrer le bord'), 'v-curve-param'),
  SG('integrand', t('l\'intégrande sur le bord'), 'v-green'),
  SG('circulation', t('intégrale sur le bord'), 'v-line-vector'),
  SG('value', t('calculer l\'intégrale double'), 'a2-fubini-rect'),
];

const rotPart = (F, level) => ({
  html: t('rot F (un nombre en 2D) :'), ask: 'rot F =', start: `pd(${F.Q}, x) - pd(${F.P}, y)`,
  judge: eqJudge(XY),
  menu: menu('rot F = ∂F₂/∂x − ∂F₁/∂y', [{ label: 'rot F = ∂F₁/∂y − ∂F₂/∂x', rule: 'v_rot_sign', why: t('L\'ordre est ∂F₂/∂x − ∂F₁/∂y.') }]),
  lines: [{ math: String(F.rot), subgoal: 'rot', blank: [String(F.rot)] }],
});

function greenParts(F, D, level) {
  const c = F.rot;
  const greenDec = decision(t('Que faire ?'), [
    { id: 'green', label: t('Green : ∮ F · dl = ∬_D rot F dx dy'), valid: true, ref: true },
    { id: 'border', label: t('Paramétrer le bord et calculer ∮ F · dl directement'), valid: true, quality: 'poor', why: D.kind === 'tri' || D.kind === 'square' ? t('Juste, mais le bord a plusieurs côtés à paramétrer, alors que rot F est constant : Green donne tout de suite rot F × aire.') : t('Juste, mais rot F est constant : Green donne tout de suite rot F × aire.') },
    { id: 'area', label: t('Par Green, ∮ F · dl = aire(D)'), valid: false, rule: 'v_green_no_rot', why: t('Green dit ∬ rot F, pas ∬ 1 : il faut calculer rot F.') },
  ], [2, 3, 4]);
  const first = rotPart(F, level);
  first.decisions = [greenDec];
  return [first, {
    html: t('Green : ∮ F · dl = ∬_D rot F dx dy = ∬_D {c} dx dy{a} :', { c, a: D.coords ? `, ${D.coords}` : '' }), ask: '∮ F · dl =', start: D.int(c),
    judge: defJudge({ v_green_no_rot: [{ line: areaT(D), ctx: { rot: String(c) } }] }),
    menu: menu(t('Intégrer la constante rot F sur D'), [{ label: t('Prendre l\'aire de D'), rule: 'v_green_no_rot', why: t('rot F vaut ') + c + t(', pas 1.') }]),
    lines: [{ math: areaT(D, c), subgoal: 'value', blank: [areaT(D, c)], note: t('{c} × aire(D)', { c }) }],
  }];
}

function greenCirculation(level, rng, opts) {
  const F = fieldG(rng, level === 1);
  const D = domain2(rng, ['disk', 'ellipse', 'square', 'tri', 'half']);
  return partsItem({
    skill: 'v-green', level, parts: greenParts(F, D, level), keys: KEYS,
    prompt: t('Calcule ∮_∂D F · dl pour {a} et {html}, le bord ∂D étant orienté positivement (D à gauche).', { a: Fhtml(F), html: D.html }),
    hints: H(t('Calcule d\'abord rot F : est-il constant ?'), t('∮ F · dl = ∬_D ({rot}) dx dy = {rot} × aire(D).', { rot: F.rot }), `${MT(D.int(F.rot), { vars: ['r', 'φ'] })}.`),
    subgoals: SUB_GREEN, key: `v-green:${level}:${F.id}:${D.id}`, exam: examTag(opts, 3),
  });
}

// The area of an ellipse by ½∮(x dy − y dx).
function greenArea(level, rng, opts) {
  const [a, b] = rng.shuffle([2, 3, 4]).slice(0, 2);
  const g = `(${a}cos(t) ; ${b}sin(t))`;
  const parts = [{
    html: t('Le bord, orienté positivement :'), start: 'γ(t)',
    judge: { kind: 'param', curve: { ref: g, t: [0, '2π'], closed: true } },
    menu: menu('γ(t) = (a cos t, b sin t), t ∈ [0 ; 2π]', [{ label: 'γ(t) = (a cos t, −b sin t)', rule: 'v_orientation_reversed', why: t('Ce sens parcourt le bord avec D à droite.') }]),
    lines: [{ math: `${g}, t ∈ [0 ; 2π]`, subgoal: 'param', blank: [`${a}cos(t)`, '2π'] }],
  }, {
    html: t('aire(D) = ½ ∮ (x dy − y dx) :'), ask: t('aire(D) ='), start: `(1/2)int(${a}cos(t)·${b}cos(t) - ${b}sin(t)·(-${a}sin(t)), t, 0, 2π)`,
    judge: defJudge(),
    menu: menu(t('Remplacer x, y, dx, dy, puis simplifier avec cos² + sin² = 1'), [{ label: t('aire = ∮ (x dy − y dx), sans ½'), why: t('x dy − y dx a pour rot 2 : il faut le facteur ½.') }]),
    lines: [{ math: `(1/2)int(${a * b}, t, 0, 2π)`, subgoal: 'integrand', blank: [String(a * b)] }, { math: piT(a * b), subgoal: 'value', blank: [piT(a * b)] }],
  }];
  return partsItem({
    skill: 'v-green', level, parts, keys: KEYS,
    prompt: t('Par Green, calcule l\'aire de l\'ellipse D = {x²/{a} + y²/{b} ≤ 1} avec aire(D) = ½ ∮_∂D (x dy − y dx).', { a: a * a, b: b * b }),
    hints: H(t('Paramètre le bord dans le sens positif, puis remplace x, y, dx = x′(t) dt, dy = y′(t) dt.'), `γ(t) = (${a} cos t, ${b} sin t) : x dy − y dx = ${a * b}(cos²t + sin²t) dt.`, t('aire = ½ ∫₀^{2π} {a} dt.', { a: a * b })),
    subgoals: SUB_GREEN, key: `v-green:${level}:area${a}${b}`, exam: examTag(opts, 3),
  });
}

// F = (−y, x)/(x² + y²): not defined at 0, which is in the disc.
function greenSingular(level, rng, opts) {
  const R = pick(rng, [1, 2, 3]);
  const R2 = R * R;
  const g = `(${cm(R, 'cos(t)')} ; ${cm(R, 'sin(t)')})`;
  const parts = [{
    html: t('Le bord, orienté positivement :'), start: 'γ(t)',
    judge: { kind: 'param', curve: { ref: g, t: [0, '2π'], closed: true } },
    decisions: [decision(t('Green s\'applique-t-il sur ce disque ?'), [
      { id: 'no', label: t('Non : F n\'est pas défini en (0, 0), qui est dans le disque'), valid: true, ref: true },
      { id: 'yes', label: t('Oui : rot F = 0, donc ∮ F · dl = 0'), valid: false, rule: 'v_green_singular', why: t('Green demande F de classe C¹ sur tout le disque : F n\'est pas défini en (0, 0). On calcule ∮ directement.') },
    ])],
    menu: menu(t('Paramétrer le cercle et calculer directement'), [{ label: t('Green : ∬ rot F = 0'), rule: 'v_green_singular', why: t('F n\'est pas défini en (0, 0) : pas de Green.') }]),
    lines: [{ math: `${g}, t ∈ [0 ; 2π]`, subgoal: 'param', blank: [cm(R, 'sin(t)'), '2π'] }],
  }, {
    html: t('F(γ(t)) · γ′(t) dt, puis l\'intégrale :'), ask: '∮ F · dl =', start: `int(((${cm(-R, 'sin(t)')})(${cm(-R, 'sin(t)')}) + (${cm(R, 'cos(t)')})(${cm(R, 'cos(t)')}))/${R2}, t, 0, 2π)`,
    judge: defJudge({ v_green_singular: [{ line: '0', ctx: { direct: '2π' } }] }),
    menu: menu(t('Simplifier avec sin² + cos² = 1'), [{ label: t('Répondre 0 par Green'), rule: 'v_green_singular', why: t('Green ne s\'applique pas ici.') }]),
    lines: [{ math: 'int(1, t, 0, 2π)', subgoal: 'circulation', blank: ['1'] }, { math: '2π', subgoal: 'circulation', blank: ['2π'] }],
  }];
  return partsItem({
    skill: 'v-green', level, parts, keys: KEYS,
    prompt: t('Soit F = (−y, x)/(x² + y²). Calcule ∮_∂D F · dl sur le bord du disque D = {x² + y² ≤ {R2}}, orienté positivement. (On a rot F = 0 là où F est défini.)', { R2 }),
    hints: H(t('Où F est-il défini ? Green demande F ∈ C¹ sur tout D.'), `γ(t) = (${R} cos t, ${R} sin t) : F(γ(t)) · γ′(t) = (${R2} sin²t + ${R2} cos²t)/${R2}.`, '∮ F · dl = ∫₀^{2π} 1 dt.'),
    subgoals: SUB_GREEN, key: `v-green:${level}:sing${R}`, exam: examTag(opts, 3),
  });
}

// Level 5: Green checked on a half-disc, both members, F = (−b y, a x).
function greenVerify(level, rng, opts) {
  const a = pick(rng, [1, 2, 3]);
  const b = pick(rng, [1, 2, 3]);
  const R = pick(rng, [1, 2, 3]);
  const R2 = R * R;
  const F = { a, b, P: cm(-b, 'y'), Q: cm(a, 'x'), rot: a + b };
  const D = { int: (c) => `int(int(${cm(c, 'r')}, r, 0, ${R}), φ, 0, π)`, area: q(R2, 2), areaPi: true, coords: t('en polaires') };
  const [rot, dbl] = greenParts(F, D, level);
  dbl.html = t('∬_D rot F dx dy, en polaires :');
  dbl.ask = '∬_D rot F dx dy =';
  const arc = `(${cm(R, 'cos(t)')} ; ${cm(R, 'sin(t)')})`;
  const half = q((a + b) * R2, 2);
  const parts = [rot, dbl, {
    html: t('Le bord : le diamètre [−{R} ; {R}] (sur y = 0, F · γ′ = 0), puis le demi-cercle, paramétré dans le sens positif :', { R }), ask: 'γ(t) =', start: 'γ(t)',
    judge: { kind: 'param', curve: { ref: arc, t: [0, 'π'] } },
    lines: [{ math: `${arc}, t ∈ [0 ; π]`, subgoal: 'param' }],
  }, {
    html: t('Sur le demi-cercle, ∫ F(γ(t)) · γ′(t) dt :'), ask: '∫ F · dl =', start: `int(${cm(b * R2, 'sin(t)^2')}+${cm(a * R2, 'cos(t)^2')}, t, 0, π)`,
    judge: defJudge({ v_orientation_reversed: [piT(half.neg())] }),
    lines: [{ math: piT(half), subgoal: 'circulation' }],
  }];
  return partsItem({
    skill: 'v-green', level, parts, keys: KEYS,
    prompt: t('Vérifie le théorème de Green pour {a} sur le demi-disque D = {x² + y² ≤ {R2}, y ≥ 0} : calcule les deux membres. {COS2}', { a: Fhtml(F), R2, COS2 }),
    hints: [], subgoals: SUB_GREEN, key: `v-green:5:half${a}${b}${R}`, exam: examTag(opts, 3),
  });
}

function greenMcq(level, rng, opts) {
  const F = fieldG(rng, false);
  const R = pick(rng, [1, 2, 3]);
  const area = q(R * R);
  const show = (tt) => MT(tt, {});
  return choice({
    skill: 'v-green', level, key: `v-green:mcq:${F.id}:${R}`, exam: examTag(opts),
    prompt: t('Soit {a} et D le disque de rayon {R} centré en 0, ∂D orienté positivement. ∮_∂D F · dl =', { a: Fhtml(F), R }),
    right: show(piT(area.mul(F.rot))),
    wrongs: [opt(show(piT(area)), 'v_green_no_rot'), opt(show(piT(area.mul(-F.rot))), 'v_orientation_reversed'), opt(show(piT(area.mul(F.a - F.b))), 'v_rot_sign'), opt(show(piT(q(2 * R * F.rot))))],
    solution: [{ html: t('rot F = {a} − (−{b}) = {rot} ; par Green, ∮ F · dl = {rot} · π · {c}.', { a: F.a, b: F.b, rot: F.rot, c: R * R }), note: '' }],
    expectedSec: 150,
  }, rng);
}

function greenGen(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return greenMcq(4, rng, opts);
  if (opts.exam === 'open') return greenCirculation(4, rng, opts);
  if (level === 5) return greenVerify(level, rng, opts);
  if (level === 1) return greenCirculation(level, rng, opts);
  const r = rng.next();
  if (level === 4 && r < 0.3) return greenArea(level, rng, opts);
  if (level >= 2 && r > 0.75) return greenSingular(level, rng, opts);
  return greenCirculation(level, rng, opts);
}

// ---------- v-green-flux ----------

function fluxField(rng, D) {
  if (D.kind === 'exam') {
    const c = pick(rng, [1, 2, 3]);
    return { P: cm(c, 'x^2'), Q: 'y cos(x^2)', div: `${cm(2 * c, 'x')}+cos(x^2)`, rot: '-2x y sin(x^2)', xdiv: `${cm(2 * c, 'x^2')}+x cos(x^2)`, id: `cos${c}`, c };
  }
  const c1 = pick(rng, [1, 2, -1]);
  const c2 = pick(rng, [0, 1, 3]);
  const qk = D.kind === 'disk' ? pick(rng, ['1', 'x^2']) : pick(rng, ['1', 'x', 'x^2']);
  const P = sum([cm(c1, 'x^2'), cm(c2, 'x')]);
  const Q = qk === '1' ? 'y' : `${qk === 'x' ? 'x' : 'x^2'} y`;
  const div = poly([c2 + (qk === '1' ? 1 : 0), 2 * c1 + (qk === 'x' ? 1 : 0), qk === 'x^2' ? 1 : 0], 'x');
  const rot = qk === '1' ? '0' : qk === 'x' ? 'y' : '2x y';
  const xdiv = poly([0, c2 + (qk === '1' ? 1 : 0), 2 * c1 + (qk === 'x' ? 1 : 0), qk === 'x^2' ? 1 : 0], 'x');
  return { P, Q, div, rot, xdiv, id: `${c1}${c2}${qk}`, c1, c2, qk };
}

function fluxDomain(rng, kinds) {
  const kind = pick(rng, kinds);
  if (kind === 'exam') return { kind, id: 'exam', a: 'sqrt(π)', aT: '√π', tri: true, html: t('le triangle A de sommets (0, 0), (√π, 0) et (√π, √π)') };
  if (kind === 'tri') { const a = pick(rng, [1, 2, 3]); return { kind, id: `tri${a}`, a: String(a), aT: String(a), tri: true, html: t('le triangle A de sommets (0, 0), ({a}, 0) et ({a}, {a})', { a }) }; }
  if (kind === 'square') { const a = pick(rng, [1, 2, 3]); return { kind, id: `sq${a}`, a: String(a), aT: String(a), html: t('le carré A = [0 ; {a}] × [0 ; {a}]', { a }) }; }
  const R = pick(rng, [1, 2]);
  return { kind: 'disk', id: `disk${R}`, R, html: t('le disque A = {x² + y² ≤ {a}}', { a: R * R }) };
}

// ∬_A div F: its integral, the integral after the inner one, the value.
function fluxValue(F, D) {
  if (D.kind === 'exam') return { I: `int(int(${F.div}, y, 0, x), x, 0, ${D.a})`, inner: `int(${F.xdiv}, x, 0, ${D.a})`, value: `${cm(q(2 * F.c, 3), 'π√π')}` };
  if (D.kind === 'disk') {
    const R = D.R;
    // div = 2c1 x + c2 + q(x): ∬ x = 0 ; ∬ 1 = πR² ; ∬ x² = πR⁴/4.
    const c = q(F.c2).add(F.qk === '1' ? q(1) : q(0)).mul(R * R).add(F.qk === 'x^2' ? q(R ** 4, 4) : q(0));
    const divPolar = F.div.replace(/x/g, '(r cos(φ))');
    return { I: `int(int((${divPolar}) r, r, 0, ${R}), φ, 0, 2π)`, inner: null, value: piT(c) };
  }
  const a = Number(D.a);
  // square: ∫₀ᵃ a·div dx ; triangle: ∫₀ᵃ x·div dx.
  const pw = (k) => q(a ** (k + 1), k + 1);
  const coef = (k) => {
    const tt = { 0: F.c2 + (F.qk === '1' ? 1 : 0), 1: 2 * F.c1 + (F.qk === 'x' ? 1 : 0), 2: F.qk === 'x^2' ? 1 : 0 };
    return q(tt[k]);
  };
  if (D.tri) {
    const v = [0, 1, 2].reduce((s, k) => s.add(coef(k).mul(pw(k + 1))), q(0));
    return { I: `int(int(${F.div}, y, 0, x), x, 0, ${a})`, inner: `int(${F.xdiv}, x, 0, ${a})`, value: qs(v) };
  }
  const v = [0, 1, 2].reduce((s, k) => s.add(coef(k).mul(pw(k))), q(0)).mul(a);
  return { I: `int(int(${F.div}, y, 0, ${a}), x, 0, ${a})`, inner: `int(${cm(a, `(${F.div})`)}, x, 0, ${a})`, value: qs(v) };
}

const SUB_GFLUX = [
  SG('theorem', t('forme flux de Green'), 'v-green-flux'),
  SG('div', 'div F', 'v-green-flux'),
  SG('bounds', t('bornes du domaine'), 'a2-domain-describe'),
  SG('value', t('intégrale double'), 'a2-domain-describe'),
];

function gfluxParts(F, D, V, level) {
  const theorem = decision('∮_∂A F · ν dl = ?', [
    { id: 'div', label: '∬_A div F dx dy', valid: true, ref: true },
    { id: 'rot', label: '∬_A rot F dx dy', valid: false, rule: 'v_div_rot_confuse', why: t('Avec la normale ν, c\'est la divergence : ce qui sort du domaine.') },
  ]);
  const method = decision(t('Comment calculer ce flux ?'), [
    { id: 'green', label: t('Forme flux de Green : ∬_A div F'), valid: true, ref: true },
    { id: 'sides', label: D.kind === 'disk' ? t('Paramétrer le cercle et calculer ∮ F · ν dl') : t('Calculer côté par côté, avec la normale de chaque côté'), valid: true, quality: 'poor', why: t('Juste, mais il faut paramétrer le bord et sa normale ; Green le ramène à une intégrale double.') },
  ], [3]);
  const parts = [{
    html: t('A est régulier et F ∈ C¹ : ∮_∂A F · ν dl = ∬_A div F dx dy. D\'abord div F :'), ask: 'div F =', start: `pd(${F.P}, x) + pd(${F.Q}, y)`,
    judge: eqJudge(XY, { traps: { v_div_rot_confuse: F.rot === '0' ? [] : [{ line: F.rot, ctx: { used: 'rot F' } }] } }),
    decisions: [theorem, method],
    menu: menu('div F = ∂F₁/∂x + ∂F₂/∂y', [{ label: 'rot F = ∂F₂/∂x − ∂F₁/∂y', rule: 'v_div_rot_confuse', why: t('Avec ν, c\'est la divergence.') }]),
    lines: [{ math: F.div, subgoal: 'div', blank: [F.div.split(/(?=[+-])/)[0]] }],
  }];
  if (level >= 2 && D.kind !== 'disk') {
    const yhi = D.tri ? 'x' : D.a;
    parts.push({
      html: t('Les bornes de A (type I : x à l\'extérieur) :'), ask: 'A :', start: 'A',
      judge: { kind: 'domain', coords: 'cart', vars: XY, region: [`0 ≤ x ≤ ${D.a}`, `0 ≤ y ≤ ${yhi}`], box: [[0, Number(D.a === 'sqrt(π)' ? Math.sqrt(Math.PI) : D.a)], [0, Number(D.a === 'sqrt(π)' ? Math.sqrt(Math.PI) : D.a)]], order: ['x', 'y'], shape: 'typeI' },
      menu: menu(t('0 ≤ x ≤ a, puis y entre 0 et le bord du haut'), [{ label: t('y à l\'extérieur, avec une borne en x'), rule: 'v_fubini_bounds', why: t('Une borne qui dépend de x doit être celle de l\'intégrale intérieure.') }]),
      lines: [{ math: `0 ≤ x ≤ ${D.a} ; 0 ≤ y ≤ ${yhi}`, subgoal: 'bounds' }],
    });
  }
  const order = D.tri ? [decision(t('Dans quel ordre intégrer ?'), [
    { id: 'xy', label: `∫₀^${D.aT} (∫₀ˣ … dy) dx`, valid: true, ref: true },
    { id: 'yx', label: `∫₀ˣ (∫₀^${D.aT} … dx) dy`, valid: false, rule: 'v_fubini_bounds', why: t('La borne x dépend de x : l\'intégrale en y doit être à l\'intérieur.') },
  ], [2, 3, 4])] : [];
  parts.push({
    html: t('∬_A div F dx dy{a} :', { a: D.kind === 'disk' ? t(', en polaires') : '' }), ask: '∮ F · ν dl =', start: V.I,
    judge: defJudge(),
    decisions: order,
    menu: menu(t('Intégrer d\'abord en y, puis en x'), [{ label: t('Échanger l\'ordre sans changer les bornes'), rule: 'v_fubini_bounds', why: t('Les bornes vont avec l\'ordre.') }]),
    lines: [...(V.inner ? [{ math: V.inner, subgoal: 'value' }] : []), { math: V.value, subgoal: 'value', blank: [V.value] }],
  });
  return parts;
}

function gfluxItem(level, rng, opts) {
  const D = fluxDomain(rng, level === 1 ? ['square', 'tri'] : ['exam', 'tri', 'square', 'disk', 'tri']);
  const F = fluxField(rng, D);
  const V = fluxValue(F, D);
  return partsItem({
    skill: 'v-green-flux', level, parts: gfluxParts(F, D, V, level), keys: KEYS,
    prompt: t('Soit {a} et {html}. Calcule le flux sortant ∮_∂A F · ν dl, ν étant la normale extérieure unité.', { a: Fhtml(F), html: D.html }),
    hints: H(t('ν est la normale : c\'est la forme « divergence » de Green, ∮ F · ν dl = ∬_A div F.'), `div F = ${MT(F.div, { vars: XY })} ; ${V.inner ? MT(V.I, { vars: XY }) : t('en polaires')}.`, `${MT(V.inner || V.I, { vars: XY })}.`),
    subgoals: SUB_GFLUX, key: `v-green-flux:${level}:${F.id}:${D.id}`, exam: examTag(opts, 5),
  });
}

// Level 5: both members on the square [0 ; a]², side by side.
function gfluxVerify(level, rng, opts) {
  const D = fluxDomain(rng, ['square']);
  const F = fluxField(rng, D);
  const V = fluxValue(F, D);
  const a = Number(D.a);
  const pA = poly([0, F.c2, F.c1], 'x').replace(/x/g, `(${a})`);
  const qx = F.qk;
  const right = q(F.c1 * a * a + F.c2 * a).mul(a);
  const top = q(a).mul(qx === '1' ? q(a) : qx === 'x' ? q(a * a, 2) : q(a ** 3, 3));
  const parts = gfluxParts(F, D, V, 4).filter((p) => p.judge.kind !== 'domain');
  parts[0].decisions = [];
  parts.push({
    html: t('Le bord, côté par côté. Sur le côté x = {a}, parcouru par γ(t) = ({a}, t), t ∈ [0 ; {a}] : ν = (γ₂′, −γ₁′)/|γ′| =', { a }), ask: 'ν =', start: 'ν',
    judge: vecJudge('(1 ; 0)', ['t'], { v_nu_formula: ['(-1 ; 0)'] }),
    lines: [{ math: '(1 ; 0)', subgoal: 'theorem' }],
  }, {
    html: t('∫ F · ν dl sur le côté x = {a} :', { a }), ask: '∫ F · ν dl =', start: `int(${pA}, t, 0, ${a})`,
    judge: defJudge({ v_nu_formula: [qs(right.neg())] }),
    lines: [{ math: qs(right), subgoal: 'value' }],
  }, {
    html: t('Sur le côté y = {a} (ν = (0, 1)) : ∫ F · ν dl = ∫₀^{a} F₂(x, {a}) dx, et sur les côtés y = 0 et x = 0, F · ν = 0. La somme des côtés :', { a }), ask: '∮ F · ν dl =', start: `${qs(right)}+int(${qx === '1' ? String(a) : cm(a, qx)}, x, 0, ${a})`,
    judge: defJudge(),
    lines: [{ math: qs(right.add(top)), subgoal: 'value' }],
  });
  return partsItem({
    skill: 'v-green-flux', level, parts, keys: KEYS,
    prompt: t('Vérifie la forme flux de Green pour {a} sur le carré A = [0 ; {a2}] × [0 ; {a2}] : calcule ∬_A div F, puis ∮_∂A F · ν dl côté par côté.', { a: Fhtml(F), a2: a }),
    hints: [], subgoals: SUB_GFLUX, key: `v-green-flux:5:${F.id}:${D.id}`, exam: examTag(opts),
  });
}

function gfluxMcq(level, rng, opts) {
  const al = pick(rng, [1, 2, 3]);
  const be = pick(rng, [1, 2, 3]);
  const R = pick(rng, [1, 2, 3]);
  const v = q((al + be) * R * R);
  const show = (tt) => MT(tt, {});
  return choice({
    skill: 'v-green-flux', level, key: `v-green-flux:mcq:${al}${be}${R}`, exam: examTag(opts),
    prompt: t('Soit F = ({a}, {b}) et A le disque de rayon {R} centré en 0, ν la normale extérieure unité. ∮_∂A F · ν dl =', { a: cm(al, 'x'), b: cm(be, 'y'), R }),
    right: show(piT(v)),
    wrongs: [opt(show('0'), 'v_div_rot_confuse'), opt(show(piT(v.neg())), 'v_nu_formula'), opt(show(piT(q(R * R)))), opt(show(piT(q(2 * R * (al + be)))))],
    solution: [{ html: t('div F = {al} + {be} = {a}, donc ∮ F · ν dl = ∬_A {a} = {a} · π · {b}.', { al, be, a: al + be, b: R * R }), note: '' }],
    expectedSec: 120,
  }, rng);
}

function gfluxGen(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return gfluxMcq(4, rng, opts);
  if (opts.exam === 'open') return gfluxItem(4, rng, opts);
  if (level === 5) return gfluxVerify(level, rng, opts);
  return gfluxItem(level, rng, opts);
}

export const GEN = { 'v-green': greenGen, 'v-green-flux': gfluxGen };
