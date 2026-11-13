// a2-ode-const2 (module A2, part h, step U6): ay″ + by′ + cy = 0. Built
// from the roots (two integers, a double integer root, or α ± iβ). Parts:
// the characteristic polynomial (`equiv` in x and r: y = e^(rx) put in the
// equation), its roots (`complex` with form 'set' and unknown r), the
// general solution and the Cauchy problem (`ode` of order 2; cfg.char feeds
// the traps a2_ode_double_root, a2_ode_complex_swap, a2_ode_char_sign).

import { MT, linesItem, examTag } from './kit.js';
import { partsScript, tpl, sup } from './a2-kit.js';
import { q, qt, term, sumT, polyT, fac, expT, rd, H, E, modeOf, mcq4, opt, tfOf } from './analyse2-h-kit.js';
import { t } from '../../i18n.js';

const SK = 'a2-ode-const2';
const SUB = [
  { id: 'char', label: t('équation caractéristique'), skill: 'quad-formula' },
  { id: 'roots', label: t('racines'), skill: 'quad-formula' },
  { id: 'form', label: t('forme de la solution'), skill: SK },
  { id: 'ic', label: t('constantes (système 2 × 2)'), skill: 'eq-systems' },
  { id: 'final', label: t('solution du problème de Cauchy'), skill: SK },
];
const KEYS = ['calcx', 'calcfn', 'a2', 'anal', 'cplx'];

// c·body, with body '1' meaning the number c.
const ct = (c, body) => (body === '1' ? qt(c) : term(c, body));
const trig = (fn, b) => `${fn}(${b === 1 ? '' : b}x)`;

// The roots and the equation: {kind, a, b, c, r1, r2 | r | al, be, P (text
// of the characteristic polynomial), eq, gen (general solution)}.
export function rootsData(rng, kinds = ['real', 'real', 'double', 'complex', 'complex']) {
  const kind = rng.pick(kinds);
  const a = rng.pick([1, 1, 1, 2, 3]);
  let b; let c; let d;
  if (kind === 'real') {
    let r1 = rng.int(-4, 4);
    let r2 = rng.int(-4, 4);
    while (r2 === r1) r2 = rng.int(-4, 4);
    if (r1 > r2) [r1, r2] = [r2, r1];
    b = -a * (r1 + r2); c = a * r1 * r2;
    d = { r1, r2 };
    d.gen = sumT([r1 ? `C_1 ${expT(r1)}` : 'C_1', r2 ? `C_2 ${expT(r2)}` : 'C_2']);
    d.char = { kind, r1: String(r1), r2: String(r2) };
    d.rootsLine = `r = ${r1} ou r = ${r2}`;
    d.mid = `${a === 1 ? '' : a}${r1 ? `(${sumT(['r', qt(-r1)])})` : 'r'}(${sumT(['r', r2 ? qt(-r2) : ''])}) = 0`;
  } else if (kind === 'double') {
    const r = rng.pick([-3, -2, -1, 1, 2, 3]);
    b = -2 * a * r; c = a * r * r;
    d = { r, gen: r ? `(C_1+C_2 x)${expT(r)}` : 'C_1+C_2 x' };
    d.char = { kind, r: String(r) };
    d.rootsLine = `r = ${r}`;
    d.mid = `${a === 1 ? '' : a}(${sumT(['r', r ? qt(-r) : ''])})^2 = 0`;
  } else {
    const al = rng.int(-2, 2);
    const be = rng.pick([1, 2, 3]);
    b = -2 * a * al; c = a * (al * al + be * be);
    const inner = `C_1 ${trig('cos', be)}+C_2 ${trig('sin', be)}`;
    d = { al, be, gen: al ? `${expT(al)}(${inner})` : inner };
    d.char = { kind, a: String(al), b: String(be) };
    const bi = be === 1 ? 'i' : `${be}i`;
    d.rootsLine = al ? `r = ${al}+${bi} ou r = ${al}-${bi}` : `r = ${bi} ou r = -${bi}`;
    d.mid = al ? `${a === 1 ? '' : a}((${sumT(['r', qt(-al)])})^2+${be * be}) = 0` : `r^2 = -${be * be}`;
  }
  const P = polyT([[a, 'r^2'], [b, 'r'], [c, '']]);
  const eq = `${sumT([`${fac(a)}y''`, term(b, "y'"), term(c, 'y')])}=0`;
  const start = `${sumT([`${fac(a)}d(d(e^(r x)))`, term(b, 'd(e^(r x))'), term(c, 'e^(r x)')])}`;
  const expanded = sumT([term(a, 'r^2 e^(r x)'), term(b, 'r e^(r x)'), term(c, 'e^(r x)')]);
  return { kind, a, b, c, ...d, P, eq, start, expanded, factored: `(${P})e^(r x)` };
}

// Constants for y(0) = Y0, y′(0) = Y1 and the solution written out, or null.
function cauchy(d, Y0, Y1) {
  let C1; let C2; let y;
  if (d.kind === 'real') {
    C2 = q(Y1 - d.r1 * Y0, d.r2 - d.r1); C1 = q(Y0).sub(C2);
    y = sumT([ct(C1, expT(d.r1)), ct(C2, expT(d.r2))]);
  } else if (d.kind === 'double') {
    C1 = q(Y0); C2 = q(Y1 - d.r * Y0);
    if (C2.n === 0) y = ct(C1, expT(d.r));
    else if (C1.n === 0) y = `${term(C2, 'x')} ${expT(d.r)}`;
    else y = `(${sumT([qt(C1), term(C2, 'x')])})${expT(d.r)}`;
  } else {
    C1 = q(Y0); C2 = q(Y1 - d.al * Y0, d.be);
    const inner = sumT([ct(C1, trig('cos', d.be)), ct(C2, trig('sin', d.be))]);
    y = d.al ? `${expT(d.al)}(${inner})` : inner;
  }
  if (C1.d > 6 || C2.d > 6 || (C1.n === 0 && C2.n === 0)) return null;
  return { C1, C2, y, line: `C_1 = ${qt(C1)} ; C_2 = ${qt(C2)}` };
}

const formOptions = (d) => {
  const o = (id, label, why, rule) => ({ id, label, valid: d.kind === id, ...(d.kind === id ? {} : { why, ...(rule ? { rule } : {}) }) });
  return [
    o('real', t('Deux racines réelles distinctes : C₁e^(r₁x) + C₂e^(r₂x)'), d.kind === 'double' ? t('Une racine double ne donne qu\'une exponentielle : C₁e^(rx) + C₂e^(rx) n\'a qu\'une constante.') : t('Les racines ne sont pas réelles.'), d.kind === 'double' ? 'a2_ode_double_root' : null),
    o('double', t('Racine double : (C₁ + C₂x)e^(rx)'), t('Les deux racines sont distinctes.')),
    o('complex', t('Racines α ± iβ : e^(αx)(C₁ cos βx + C₂ sin βx)'), t('Les racines sont réelles.')),
  ];
};
const deltaDecision = (d) => {
  const D = d.b * d.b - 4 * d.a * d.c;
  const o = (id, label, ok) => ({ id, label, valid: ok, ...(ok ? {} : { why: `Δ = ${rd(d.b)}² − 4·${d.a}·${rd(d.c)} = ${rd(D)}.` }) });
  return { kind: 'decision', prompt: t('Le discriminant de {P} est :', { P: sup(d.P) }), options: [o('pos', t('Δ > 0 : deux racines réelles'), D > 0), o('zero', t('Δ = 0 : une racine double'), D === 0), o('neg', t('Δ < 0 : deux racines complexes conjuguées'), D < 0)] };
};

const CHOICES = [
  { id: 'subst', label: t('Remplacer y par e^(rx)') },
  { id: 'factor', label: t('Mettre e^(rx) en facteur') },
  { id: 'solve', label: t('Résoudre l\'équation caractéristique') },
  { id: 'form', label: t('Écrire la forme de la solution') },
  { id: 'ic', label: t('Trouver C₁ et C₂ avec les conditions initiales') },
  { id: 'final', label: t('Écrire la solution du problème') },
  { id: 'sign', label: t('Racines : changer le signe des coefficients'), rule: 'a2_ode_char_sign', why: t('Les racines de r² + pr + q ont pour somme −p : vérifie en remplaçant.') },
];

function data(rng, withIc) {
  for (let i = 0; i < 200; i++) {
    const d = rootsData(rng);
    if (!withIc) return d;
    const Y0 = rng.int(-2, 3);
    const Y1 = rng.int(-3, 4);
    const k = cauchy(d, Y0, Y1);
    if (k) return { ...d, Y0, Y1, ...k };
  }
  const d = rootsData({ pick: (l) => l[l.length - 1], int: () => 0 });
  return { ...d, Y0: 0, Y1: 1, ...cauchy(d, 0, 1), fallback: true };
}

function linesVariant(level, rng, opts) {
  const withIc = level >= 4 || rng.chance(0.5);
  const d = data(rng, withIc);
  const ode = { kind: 'ode', eq: d.eq, unknown: 'y', v: 'x', order: 2, char: d.char, ...(withIc ? { ic: { x: 0, y: d.Y0, dy: d.Y1 } } : {}), domain: { x: [-1, 1] } };
  const parts = [];
  if (level >= 2) {
    parts.push({ start: d.start, judge: { kind: 'equiv', vars: ['x', 'r'], target: 'goal', goal: d.factored, domain: { x: [-1, 1], r: [-2, 2] } }, lines: [...(level <= 3 ? [E(d.expanded, t('Dériver e^(rx)'), 'char', 'subst')] : []), E(d.factored, t('Mettre e^(rx) en facteur'), 'char', 'factor')] });
  }
  const rootLines = [E(d.mid, t('Factoriser (ou Δ)'), 'roots', 'solve'), E(d.rootsLine, t('Racines'), 'roots', 'solve')];
  if (d.kind === 'real' && level >= 4) rootLines.shift();
  if (level === 1) {
    const hole = d.kind === 'real' ? String(d.r2) : d.kind === 'double' ? String(d.r) : (d.be === 1 ? 'i' : `${d.be}i`);
    rootLines[rootLines.length - 1] = { ...rootLines[rootLines.length - 1], ...tpl(d.rootsLine, [hole], { complex: true, vars: ['r'] }) };
  }
  parts.push({
    html: t('e^(rx) ≠ 0 : équation caractéristique. Ses racines :'), ask: 'r =', start: `${d.P} = 0`, judge: { kind: 'complex', form: 'set', unknown: 'r', char: d.char },
    pre: level === 3 ? [deltaDecision(d)] : [], lines: rootLines,
  });
  const yLines = [E(`y = ${d.gen}`, t('Forme de la solution'), 'form', 'form')];
  if (withIc) yLines.push(E(d.line, `y(0) = ${rd(d.Y0)}, y′(0) = ${rd(d.Y1)}`, 'ic', 'ic'), E(`y = ${d.y}`, t('Solution du problème'), 'final', 'final'));
  if (level === 1) {
    const holes = d.kind === 'real' ? [expT(d.r1), expT(d.r2)].filter((s) => s !== '1') : d.kind === 'double' ? [expT(d.r)].filter((s) => s !== '1') : [trig('cos', d.be), trig('sin', d.be)];
    yLines[0] = { ...yLines[0], ...tpl(yLines[0].math, holes) };
  }
  parts.push({ html: withIc ? t('Solution générale, puis les conditions initiales.') : t('Solution générale :'), ask: 'y =', start: d.eq, judge: ode, pre: level === 2 || level === 3 ? [{ kind: 'decision', prompt: t('Quelle forme ?'), options: formOptions(d) }] : [], lines: yLines });
  const { start, judge, script } = partsScript(parts, level, CHOICES);
  const icText = withIc ? `, y(0) = ${rd(d.Y0)}, y′(0) = ${rd(d.Y1)}` : '';
  return linesItem({
    skill: SK, level, mode: modeOf(level), start, judge, script,
    prompt: `${withIc ? t('Résous {eq}{ic}.', { eq: MT(d.eq), ic: icText }) : t('Donne la solution générale de {eq}{ic}.', { eq: MT(d.eq), ic: icText })} ${level === 1 ? t('Équation caractéristique : {P}.', { P: MT(`${d.P} = 0`, { vars: ['r'] }) }) : t('Remplace d\'abord y par e^(rx).')}`,
    hints: H(t('Remplace y par e^(rx) : tu obtiens {P}.', { P: MT(`${d.P} = 0`, { vars: ['r'] }) }),
      t('Racines : {r} ; donc y = …', { r: MT(d.rootsLine, { complex: true }) }),
      `${MT(`y = ${d.gen}`)}`),
    subgoals: SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SK}:${level}:${d.eq}${icText}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// ---------- multiple choice: the general solution ----------

function wrongForms(d) {
  const out = [];
  if (d.kind === 'double') {
    out.push(opt(`y = C_1 ${expT(d.r)}+C_2 ${expT(d.r)}`, 'a2_ode_double_root'));
    out.push(opt(`y = (C_1+C_2 x)${expT(-d.r)}`, 'a2_ode_char_sign'));
    out.push(opt(`y = C_1 ${trig('cos', Math.abs(d.r) || 1)}+C_2 ${trig('sin', Math.abs(d.r) || 1)}`));
  } else if (d.kind === 'real') {
    if (d.r1 !== -d.r2) out.push(opt(`y = ${sumT([`C_1 ${expT(-d.r1)}`.replace(' 1', ''), `C_2 ${expT(-d.r2)}`.replace(' 1', '')])}`, 'a2_ode_char_sign'));
    out.push(opt(`y = (C_1+C_2 x)${expT(d.r1 || d.r2)}`));
    out.push(opt(`y = ${expT(d.r1 || 1)}(C_1 ${trig('cos', Math.abs(d.r2) || 1)}+C_2 ${trig('sin', Math.abs(d.r2) || 1)})`));
  } else {
    if (d.al) out.push(opt(`y = ${expT(d.be)}(C_1 ${trig('cos', Math.abs(d.al))}+C_2 ${trig('sin', Math.abs(d.al))})`, 'a2_ode_complex_swap'));
    if (d.al) out.push(opt(`y = ${expT(-d.al)}(C_1 ${trig('cos', d.be)}+C_2 ${trig('sin', d.be)})`, 'a2_ode_char_sign'));
    out.push(opt(`y = ${sumT([`C_1 ${expT(d.al + d.be)}`, `C_2 ${expT(d.al - d.be)}`]).replace(/ 1(?=$|[+-])/g, '')}`));
    out.push(opt(`y = ${d.al ? expT(d.al) : ''}(C_1 ${trig('cos', 2 * d.be)}+C_2 ${trig('sin', 2 * d.be)})`));
  }
  return out;
}

function mcqVariant(level, rng, opts) {
  const d = rootsData(rng, ['real', 'double', 'double', 'complex', 'complex']);
  return mcq4({
    skill: SK, level, key: `${SK}:mcq:${d.eq}`, exam: examTag(opts),
    prompt: t('La solution générale de {eq} est :', { eq: MT(d.eq) }),
    right: MT(`y = ${d.gen}`), wrongs: wrongForms(d),
    fillers: [opt(`y = C_1 ${expT(1)}+C_2 ${expT(2)}`), opt(`y = C_1 x+C_2`), opt(`y = C_1 ${trig('cos', 1)}+C_2 ${trig('sin', 1)}`)],
    solution: [{ html: t('Équation caractéristique {P} : {r}.', { P: MT(`${d.P} = 0`, { vars: ['r'] }), r: MT(d.rootsLine, { complex: true }) }), note: '' }],
    expectedSec: 120,
  }, rng);
}

// ---------- true/false ----------

function statements(rng) {
  const k = rng.pick([1, 2, 3]);
  const k2 = k * k;
  const r = rng.pick([1, 2, 3]);
  const kx = k === 1 ? 'x' : `${k}x`;
  return [
    { key: `bnd${k}`, truth: true, text: t('Toutes les solutions de y″ + {k2}y = 0 sont bornées sur ℝ.', { k2: k2 === 1 ? '' : k2 }), why: t('Vrai : r = ±{k}i, y = C₁ cos {kx} + C₂ sin {kx}, bornée par |C₁| + |C₂|.', { k: k === 1 ? '' : k, kx }) },
    {
      key: `unb${k}`, truth: false, text: t('Toutes les solutions de y″ − {k2}y = 0 sont bornées sur [0 ; +∞[.', { k2: k2 === 1 ? '' : k2 }),
      why: t('Faux : r = ±{k}, et y = e^({kx}) est une solution qui tend vers +∞.', { k, kx }),
      counter: { kind: 'a2', prop: 'odeUnbounded', params: { eq: `y''-${k2 === 1 ? '' : k2}y=0` }, ask: [{ v: 'y', label: t('Une solution non bornée : y(x) ='), keys: KEYS }], answer: { y: `e^(${kx})` } },
    },
    { key: `damp${k}`, truth: true, text: t('Toute solution de y″ + 2y′ + {c}y = 0 tend vers 0 en +∞.', { c: 1 + k2 }), why: t('Vrai : r = −1 ± {k}i, y = e^(−x)(C₁ cos {kx} + C₂ sin {kx}) → 0.', { k: k === 1 ? '' : k, kx }) },
    {
      key: `grow${k}`, truth: false, text: t('Toute solution de y″ − 2y′ + {c}y = 0 tend vers 0 en +∞.', { c: 1 + k2 }), ruleIfTrue: 'a2_ode_char_sign',
      why: t('Faux : r = 1 ± {k}i, la partie réelle est positive : e^x cos {kx} n\'est même pas bornée.', { k: k === 1 ? '' : k, kx }),
      counter: { kind: 'a2', prop: 'odeUnbounded', params: { eq: `y''-2y'+${1 + k2}y=0` }, ask: [{ v: 'y', label: t('Une solution qui ne tend pas vers 0 : y(x) ='), keys: KEYS }], answer: { y: `e^x cos(${kx})` } },
    },
    {
      key: `dbl${r}`, truth: false, text: t('La solution générale de y″ − {b}y′ + {c}y = 0 est y = C₁e^({r}x) + C₂e^({r}x).', { b: 2 * r, c: r * r, r: r === 1 ? '' : r }), ruleIfTrue: 'a2_ode_double_root',
      why: t('Faux : C₁e^({r}x) + C₂e^({r}x) = (C₁ + C₂)e^({r}x) n\'a qu\'une constante. La racine {r} est double : y = (C₁ + C₂x)e^({r}x).', { r }),
      counter: { kind: 'a2', prop: 'odeOutside', params: { eq: `y''-${2 * r}y'+${r * r}y=0`, family: `C e^(${r}x)`, domain: { x: [-1, 1] } }, ask: [{ v: 'y', label: t('Une solution qui n\'est pas de cette forme : y(x) ='), keys: KEYS }], answer: { y: `x e^(${r}x)` } },
    },
  ];
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'tf') return tfOf(SK, rng.pick(statements(rng)), 4, examTag(opts));
    if (opts.exam === 'mcq') return mcqVariant(4, rng, opts);
    if (level === 5 && rng.chance(0.5)) return mcqVariant(5, rng, opts);
    return linesVariant(level, rng, opts);
  },
};
