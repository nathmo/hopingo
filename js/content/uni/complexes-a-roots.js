// Generators of module G8, part a (unit `complexes`, step U4): n-th roots,
// square roots in algebraic form, quadratics with complex coefficients
// (with the exam problem E6). Catalogue: docs/universite/G-gymnase-2.md,
// G8. Helpers: complexes-a-kit.js; the first three skills are in
// complexes-a.js.
//
// The sets of solutions are judged by `complex` with form 'set': a line
// is an equation in z (or δ) with coefficients in ℚ(i), or a finite set
// {…}. When w is not in ℚ(i) (−8 + 8i√3), the last part starts from the
// roots written r·e^(iθ) and asks for their algebraic form. The arguments
// nθ = φ + 2kπ are a `solset` part in θ with k.

import { linesItem, mcq, tfItem, answerItem, examTag } from './kit.js';
import { problemItem } from './kit-problem.js';
import {
  q, nz, modeOf, H, E, partsScript, M, fr, frs, ALG, EXP, ASK, SET, Sd, cz, czText, czAdd, czExact, cqText,
  polarToCz, principalT, piT, expText, trigText, unitText, isNiceAngle, options, clean, bl, cq, joinT, termsOf, par,
} from './complexes-a-kit.js';
import { t } from '../../i18n.js';

const zt = cqText;
const ARGS = { kind: 'solset', v: 'θ', vars: ['θ'], periodic: true };
const KEYS_ALL = ['calc', 'cplx', 'set', 'trig', 'greek', 'calcfn'];

function prep(judge, lines, level, blanks = [], start = null) {
  const mode = modeOf(level);
  let out = clean(judge, lines, mode, start);
  if (mode === 'guided') out = out.map((l, i) => (l.kind === 'eq' ? bl(l, blanks[i] ?? [l.math], judge) : l));
  return out;
}
const setText = (xs) => `{${xs.join(' ; ')}}`;
const SUP = { 2: '²', 3: '³', 4: '⁴', 6: '⁶' };
// A numerator: in brackets when it has two parts.
const numer = (z) => (z.re.n && z.im.n ? `(${zt(z)})` : zt(z));

// ======================================================================
// g8-nth-roots
// ======================================================================

const NR = 'g8-nth-roots';
const NR_SUB = [
  { id: 'wexp', label: t('forme exponentielle de w'), skill: 'g8-polar' },
  { id: 'mod', label: t('module des racines'), skill: NR },
  { id: 'args', label: 'arguments', skill: NR },
  { id: 'alg', label: t('forme algébrique'), skill: 'g3-exact' },
  { id: 'ctl', label: t('contrôle'), skill: NR },
  { id: 'roots', label: t('les n racines'), skill: NR },
];
const NR_CHOICES = [
  { id: 'wexp', label: t('Écrire w sous forme exponentielle') },
  { id: 'mod', label: t('Module des racines : |z| = ρ^(1/n)') },
  { id: 'args', label: t('Arguments : nθ = φ + 2kπ, puis diviser par n') },
  { id: 'spacing', label: 'Arguments : θ = φ/n + 2kπ', rule: 'g8_roots_spacing', why: t('On divise tout par n, la période aussi : θ = φ/n + 2kπ/n.') },
  { id: 'alg', label: t('Forme algébrique de chaque racine') },
  { id: 'ctl', label: t('Contrôle : élever une racine à la puissance n') },
  { id: 'roots', label: t('Écrire les n racines') },
  { id: 'one', label: t('Écrire la racine évidente seulement'), rule: 'g8_roots_only_one', why: t('Il y a n racines, pas une seule.') },
];

const MODS = { 2: [1, 2, 3], 3: [1, 2, 3], 4: [1, 2], 6: [1, 2] };
const PHIS = [q(1, 2), q(-1, 2), q(1), q(1, 3), q(2, 3), q(-1, 3), q(-2, 3), q(1, 4), q(3, 4), q(-1, 4), q(-3, 4)];

// zⁿ = w (gen), zⁿ = 1 (unity), (z − a)ⁿ = w (shift).
function rootData(rng, kind, ns, exactW = false) {
  for (let k = 0; k < 300; k++) {
    const n = rng.pick(kind === 'unity' ? ns.filter((x) => x > 2) : ns);
    const rr = kind === 'unity' ? 1 : rng.pick(MODS[n]);
    const phi = kind === 'unity' ? q(0) : rng.pick(PHIS);
    const rho = new Sd(rr ** n);
    const w = polarToCz(rho, phi);
    if (exactW && !czExact(w)) continue;
    const angles = Array.from({ length: n }, (_, j) => principalT(phi.div(n).add(q(2 * j, n))));
    if (!angles.every(isNiceAngle)) continue;
    const us = angles.map((tq) => polarToCz(rr, tq));
    let a = null;
    let zs = us;
    if (kind === 'shift') {
      a = cq(rng.int(-3, 3), rng.int(-3, 3));
      if (a.isZero()) continue;
      zs = us.map((u) => czAdd(cz(a.re, a.im), u));
      if (zs.some((z) => !z)) continue;
    }
    // A root with rational parts, for the check (zₖ)ⁿ = w.
    const rat = us.filter((u) => u.re.isRational() && u.im.isRational());
    const ctl = rat.find((u) => !u.im.isZero()) ?? rat.find((u) => u.re.sign() < 0) ?? null;
    return { kind, n, rr, phi, rho, w, angles, us, a, zs, ctl };
  }
  return null;
}
const FALLBACK = () => {
  const angles = [q(-1, 6), q(1, 2), q(-5, 6)];
  const us = angles.map((tq) => polarToCz(2, tq));
  return { kind: 'gen', n: 3, rr: 2, phi: q(-1, 2), rho: new Sd(8), w: cz(0, -8), angles, us, a: null, zs: us, ctl: us[1], fallback: true };
};

const uName = (d) => (d.kind === 'shift' ? 'u' : 'z');
function eqText(d, v = 'z') {
  const lhs = d.a ? `(${joinT([v, ...termsOf(d.a.neg())])})` : v;
  return `${lhs}^${d.n}=${czText(d.w)}`;
}
// θ = φ/n + 2kπ/n as text.
function argText(d) {
  const base = d.phi.div(d.n);
  const step = { 2: 'kπ', 3: '2kπ/3', 4: 'kπ/2', 6: 'kπ/3' }[d.n];
  return `θ=${base.n === 0 ? step : `${piT(base)}+${step}`}`;
}
const argStart = (d) => `${d.n}θ=${d.phi.n === 0 ? '2kπ' : `${piT(d.phi)}+2kπ`}`;

function nrParts(d, level) {
  const u = uName(d);
  const parts = [];
  const exactW = !!czExact(d.w);
  const wS = czText(d.w);
  if (d.phi.n !== 0 && level >= 2) {
    parts.push({ html: t('Écris w = {wS} sous forme exponentielle :', { wS: M(wS) }), ask: 'w =', start: wS, judge: EXP, lines: prep(EXP, [E(expText(d.rho, d.phi), 'w = ρ·e^(iφ)', 'wexp', 'wexp')], level, [[d.rho.text()]]) });
  }
  const modLines = [E(String(d.rr), `|${u}|${SUP[d.n]} = ${fr(d.rho.text())}`, 'mod', 'mod')];
  parts.push({ html: t('Module des racines : |{u}|{v1} = |w| = {v2}, donc |{u}| =', { u, v1: SUP[d.n], v2: fr(d.rho.text()) }), ask: `|${u}| =`, start: `|${u}|`, judge: ASK(d.rr), lines: prep(ASK(d.rr), modLines, level) });
  const stepT = { 2: 'kπ', 3: '2kπ/3', 4: 'kπ/2', 6: 'kπ/3' }[d.n];
  parts.push({ html: t('Arguments : {v1} = |{u}|·e^(iθ), et {n}θ = φ + 2kπ. Résous en θ :', { v1: u === 'u' ? 'u' : 'z', u, n: d.n }), ask: '', start: argStart(d), judge: ARGS, lines: prep(ARGS, [E(argText(d), t('Diviser par {n}, la période aussi', { n: d.n }), 'args', 'args')], level, [[stepT]]) });
  // One part per root (levels 1 to 3).
  if (level <= 3) {
    d.angles.forEach((tq, k) => {
      const uk = d.us[k];
      if (tq.n === 0) return; // u₀ = rr is already written a + bi
      const lines = prep(ALG, [
        E(trigText(d.rr, tq), 'r(cos θ + i sin θ)', 'alg', 'alg'),
        E(d.rr === 1 ? unitText(tq) : `${d.rr}(${unitText(tq)})`, t('Valeurs exactes'), 'alg', 'alg'),
        E(czText(uk), t('Forme algébrique'), 'alg', 'alg'),
      ], level, [[piT(tq)], [unitText(tq)], level === 1 ? [] : [czText(uk)]]);
      parts.push({ html: `k = ${k} : ${u}${'₀₁₂₃₄₅'[k]} =`, ask: `${u}${'₀₁₂₃₄₅'[k]} =`, start: expText(d.rr, tq), judge: ALG, lines });
    });
    if (d.ctl && exactW) {
      parts.push({ html: t('Contrôle : {v1} =', { v1: M(`(${czText(d.ctl)})^${d.n}`) }), ask: '', start: `(${czText(d.ctl)})^${d.n}`, judge: ALG, lines: prep(ALG, [E(wS, t('On retrouve w'), 'ctl', 'ctl')], level) });
    }
  }
  // The set of solutions: from the equation when w is in ℚ(i), else from
  // the roots written r·e^(iθ).
  const set = setText(d.zs.map(czText));
  const fromEq = exactW;
  const startSet = fromEq ? eqText(d) : setText(d.angles.map((tq) => (d.a ? `${zt(d.a)}+${expText(d.rr, tq)}` : expText(d.rr, tq))));
  parts.push({
    html: fromEq ? t('Les solutions de {v1}, sous forme algébrique :', { v1: M(eqText(d)) }) : t('Les solutions{v1}, sous forme algébrique :', { v1: d.a ? ` z = ${frs(zt(d.a))} + u` : '' }),
    ask: 'S =', start: startSet, judge: SET(), lines: prep(SET(), [E(set, t('Les {n} racines', { n: d.n }), 'roots', 'roots')], level, [level === 1 ? [czText(d.zs[d.n - 1])] : []]),
  });
  return parts;
}

function nrItem(level, rng, opts = {}) {
  const ns = level === 1 ? [2, 3] : level <= 3 ? [2, 3, 4] : [2, 3, 4, 6];
  const kinds = level === 5 || opts.exam === 'open' ? ['gen', 'gen', 'shift'] : level >= 4 ? ['gen', 'gen', 'unity', 'shift'] : ['gen', 'gen', 'unity'];
  const kind = rng.pick(kinds);
  const d = rootData(rng, kind, ns, level <= 3 && kind !== 'unity') || FALLBACK();
  const parts = nrParts(d, level);
  const { start, judge, script } = partsScript(parts, level, NR_CHOICES);
  const eq = eqText(d);
  const roots = d.zs.map(czText);
  const given = level === 1 && d.phi.n !== 0 ? t(' On donne w = {v1} = {v2}.', { v1: M(czText(d.w)), v2: M(expText(d.rho, d.phi)) }) : '';
  return linesItem({
    skill: NR, level, mode: modeOf(level), start, judge, script,
    prompt: (d.a
      ? (level === 5
        ? t('Résous dans ℂ : {eq}. Pose u = {u}. Donne les {n} solutions sous forme algébrique, sans aide.', { eq: M(eq), u: M(joinT(['z', ...termsOf(d.a.neg())])), n: d.n })
        : t('Résous dans ℂ : {eq}. Pose u = {u}. Donne les {n} solutions sous forme algébrique.', { eq: M(eq), u: M(joinT(['z', ...termsOf(d.a.neg())])), n: d.n }))
      : (level === 5
        ? t('Résous dans ℂ : {eq}. Donne les {n} solutions sous forme algébrique, sans aide.', { eq: M(eq), n: d.n })
        : t('Résous dans ℂ : {eq}. Donne les {n} solutions sous forme algébrique.', { eq: M(eq), n: d.n }))) + given,
    hints: H(t('Il y a {n} racines, de module {rr} et d\'arguments espacés de 2π/{n}.', { n: d.n, rr: d.rr }), `θ = ${M(piT(d.phi.div(d.n)))} + 2kπ/□`, M(setText(roots))),
    subgoals: NR_SUB, keys: KEYS_ALL, tapActions: level === 3 ? 'steps' : null,
    key: `${NR}:${level}:${eq}`, exam: examTag(opts, 4), fallback: !!d.fallback,
  });
}

function nrMcq(rng) {
  const d = rootData(rng, 'gen', [3, 4, 6], true) || FALLBACK();
  const eq = eqText(d);
  const right = { html: M(setText(d.zs.map(czText))) };
  const wrongs = [{ html: M(setText([czText(d.zs[0])])), rule: 'g8_roots_only_one' }];
  const half = d.angles.map((_, k) => principalT(d.phi.div(d.n).add(q(k, d.n))));
  if (half.every(isNiceAngle)) wrongs.push({ html: M(setText(half.map((tq) => czText(polarToCz(d.rr, tq))))), rule: 'g8_roots_spacing' });
  if (d.rho.value !== d.rr) wrongs.push({ html: M(setText(d.angles.map((tq) => czText(polarToCz(d.rho, tq))))) });
  wrongs.push({ html: M(setText(d.zs.map((z) => czText({ re: z.im, im: z.re })))) });
  wrongs.push({ html: M(setText(d.zs.slice(0, 2).map(czText))), rule: 'g8_roots_only_one' });
  return mcq({
    skill: NR, level: 4, prompt: t('Les solutions dans ℂ de {eq} sont :', { eq: M(eq) }),
    options: options(right, wrongs),
    key: `${NR}:mcq:${eq}`, expectedSec: 150, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `w = ${M(expText(d.rho, d.phi))} : |z| = ${d.rr}, ${M(argText(d))}, k = 0, …, ${d.n - 1}.`, note: '' }],
  }, rng);
}

const NR_TF = [
  { s: 'Pour tout z ∈ ℂ et tout n ∈ ℕ* : si zⁿ = 1, alors z = 1 ou z = −1.', vars: ['z', 'n'], hyp: 'z^n=1', pred: 'z=1 ou z=-1', answer: { z: 'i', n: '4' }, why: t('Avec z = i et n = 4 : i⁴ = 1. zⁿ = 1 a n solutions, les sommets d\'un polygone régulier.') },
  { s: 'Pour tout z ∈ ℂ : si z³ = 8, alors z = 2.', vars: ['z'], hyp: 'z^3=8', pred: 'z=2', answer: { z: '-1+i√3' }, rule: 'g8_roots_only_one', why: t('z³ = 8 a trois solutions : 2, −1 + i√3 et −1 − i√3.') },
  { s: 'Pour tout z ∈ ℂ : si z⁴ = 16, alors z = 2 ou z = −2.', vars: ['z'], hyp: 'z^4=16', pred: 'z=2 ou z=-2', answer: { z: '2i' }, rule: 'g8_roots_only_one', why: t('z⁴ = 16 a quatre solutions : ±2 et ±2i.') },
  { s: 'L\'équation z⁴ = 1 a exactement 4 solutions dans ℂ.', truth: true, why: t('1, i, −1 et −i : un carré inscrit dans le cercle unité.') },
  { s: 'Pour tout n ≥ 2, les solutions de zⁿ = 1 sont toutes de module 1.', truth: true, why: t('|z|ⁿ = |zⁿ| = 1, donc |z| = 1.') },
  { s: 'Si z₀ est une solution de z³ = w, alors z₀·e^(2iπ/3) aussi.', truth: true, why: '(z₀·e^(2iπ/3))³ = z₀³·e^(2iπ) = w.' },
  { s: 'Pour tout z ∈ ℂ et tout n ∈ ℕ* : si zⁿ = −1, alors z = −1.', vars: ['z', 'n'], hyp: 'z^n=-1', pred: 'z=-1', answer: { z: 'i', n: '2' }, why: t('Avec z = i et n = 2 : i² = −1. Les solutions de zⁿ = −1 sont espacées de 2π/n.') },
];

function nrTf(rng) {
  const tq = rng.pick(NR_TF);
  const truth = tq.truth ?? false;
  const labels = { z: 'z =', n: 'n =' };
  return tfItem({
    skill: NR, level: 4, statement: t(tq.s), truth,
    counter: truth ? null : { kind: 'complex', vars: tq.vars, doms: { n: 'N*' }, hyp: tq.hyp, pred: tq.pred, ask: tq.vars.map((v) => ({ v, label: labels[v], keys: ['calc', 'cplx'] })), answer: tq.answer },
    ruleIfTrue: tq.rule || null,
    explanation: tq.why, key: `${NR}:${tq.s}`, exam: { format: 'tf', points: 1 },
  });
}

// ======================================================================
// g8-sqrt-alg
// ======================================================================

const SA = 'g8-sqrt-alg';
const SA_SUB = [
  { id: 'parts', label: t('parties réelle et imaginaire'), skill: SA },
  { id: 'mod', label: t('module'), skill: SA },
  { id: 'solve', label: t('résoudre'), skill: 'eq-systems' },
  { id: 'signs', label: t('signes'), skill: SA },
];
const SA_CHOICES = [
  { id: 'pose', label: t('Poser z = x + iy et développer z²') },
  { id: 'parts', label: t('Identifier parties réelle et imaginaire') },
  { id: 'mod', label: t('Module : x² + y² = |w|') },
  { id: 'solve', label: 'Additionner ou soustraire : x² et y²' },
  { id: 'signs', label: t('Signes : xy a le signe de b') },
  { id: 'sqrt', label: t('Écrire √w'), rule: 'g8_sqrt_symbol_complex', why: t('Le symbole √ est réservé aux réels positifs : cherche x + iy.') },
];
const XY = { kind: 'complex', complex: true, form: 'any', vars: ['x', 'y'] };

function sqrtData(rng, pure = false) {
  const x = rng.int(1, 6);
  const y = pure ? x * rng.pick([1, -1]) : nz(rng, -6, 6);
  const z = cq(x, y);
  const w = z.mul(z);
  return { x, y, z, w, m: x * x + y * y, a: w.re.n, b: w.im.n };
}

// The parts of « δ² = w » by x + iy: (x + iy)², |w|, x², y², signs, set.
function sqrtParts(d, level, { v = 'z', withPose = level >= 2, decide = level === 2 || level === 3, setStart = null, setJudge = null } = {}) {
  const parts = [];
  const ws = zt(d.w);
  if (withPose) {
    parts.push({ html: t('Pose {v1} = x + iy et développe {v1}² :', { v1: v }), ask: `${v}² =`, start: '(x+iy)^2', judge: XY, lines: prep(XY, [E('x^2-y^2+2xyi', '(x + iy)² = x² + 2ixy + i²y²', 'parts', 'pose')], level, [['y^2']]) });
  }
  const sys = `x² − y² = ${fr(d.a)} et 2xy = ${fr(d.b)}`;
  parts.push({
    html: withPose
      ? t('On identifie avec {w} : {sys}. Module : x² + y² = {m} =', { w: M(ws), sys, m: M(`|${ws}|`) })
      : t('Module : x² + y² = {m} =', { m: M(`|${ws}|`) }), ask: 'x² + y² =',
    start: `|${ws}|`, judge: ALG,
    lines: prep(ALG, [...(d.a ? [E(`√(${d.a * d.a}+${d.b * d.b})`, '|a + bi| = √(a² + b²)', 'mod', 'mod')] : []), E(String(d.m), d.a ? t('Calculer') : '|bi| = |b|', 'mod', 'mod')], level, d.a ? [[String(d.b * d.b)], []] : [[]]),
  });
  parts.push({ html: `x² = (|w| + a)/2 = (${d.m} ${d.a < 0 ? '−' : '+'} ${Math.abs(d.a)})/2 :`.replace(level >= 4 ? /x² = .*$/ : /$^/, 'x² ='), ask: 'x² =', start: 'x^2', judge: ASK(d.x * d.x), lines: prep(ASK(d.x * d.x), [E(String(d.x * d.x), t('Additionner les équations'), 'solve', 'solve')], level) });
  parts.push({ html: 'y² =', ask: 'y² =', start: 'y^2', judge: ASK(d.y * d.y), lines: prep(ASK(d.y * d.y), [E(String(d.y * d.y), t('Soustraire les équations'), 'solve', 'solve')], level) });
  const same = d.b > 0;
  const pre = decide ? [{ kind: 'decision', prompt: t('2xy = {b} {v1} 0. Les racines sont :', { b: fr(d.b), v1: same ? '>' : '<' }), options: [
    { id: 'two', label: same ? t('x et y de même signe : ±({z})', { z: frs(zt(d.z)) }) : t('x et y de signes contraires : ±({z})', { z: frs(zt(d.z)) }), valid: true },
    { id: 'four', label: t('les quatre : ±{x} ± {v1}i', { x: d.x, v1: Math.abs(d.y) }), valid: false, rule: 'g8_sqrt_signs', why: t('({v1})² = {v2} : seules deux combinaisons de signes conviennent.', { v1: frs(zt(d.z.conj())), v2: frs(zt(d.z.conj().mul(d.z.conj()))) }) },
    { id: 'wrong', label: `±(${frs(zt(d.z.conj()))})`, valid: false, rule: 'g8_sqrt_signs', why: same ? t('2xy = {b} : x et y ont le même signe.', { b: fr(d.b) }) : t('2xy = {b} : x et y ont des signes contraires.', { b: fr(d.b) }) },
  ] }] : [];
  const roots = setText([zt(d.z), zt(d.z.neg())]);
  const sj = setJudge || SET(v);
  parts.push({ html: t('Les racines carrées de {ws} :', { ws: M(ws) }), ask: 'S =', start: setStart || `${v}^2=${ws}`, judge: sj, pre, lines: prep(sj, [E(roots, t('Deux racines opposées'), 'signs', 'signs')], level, [[zt(d.z.neg())]]) });
  return parts;
}

function saItem(level, rng, opts = {}) {
  if (level === 5) return quadItem(5, rng, opts, { skill: SA, chain: true });
  const pure = rng.chance(0.2);
  const d = sqrtData(rng, pure);
  const solve = rng.chance(0.4);
  const parts = sqrtParts(d, level);
  const { start, judge, script } = partsScript(parts, level, SA_CHOICES);
  const ws = zt(d.w);
  const sys = level === 1 ? t(' On a x² − y² = {v1} et 2xy = {v2}.', { v1: M(String(d.a)), v2: M(String(d.b)) }) : '';
  return linesItem({
    skill: SA, level, mode: modeOf(level), start, judge, script,
    prompt: solve
      ? t('Résous dans ℂ : {eq}, sous forme algébrique, avec z = x + iy.{sys}', { eq: M(`z^2=${ws}`), sys })
      : t('Trouve les racines carrées de {w}, sous forme algébrique, avec z = x + iy.{sys}', { w: M(ws), sys }),
    hints: H(t('Ajoute l\'équation des modules : x² + y² = |w|. Avec x² − y² = a, tu trouves x² et y².'), `x² = (${d.m} ${d.a < 0 ? '−' : '+'} ${Math.abs(d.a)})/2 = □`, M(setText([zt(d.z), zt(d.z.neg())]))),
    subgoals: SA_SUB, keys: ['calc', 'cplx', 'set'], tapActions: level === 3 ? 'steps' : null,
    key: `${SA}:${level}:${ws}`, exam: examTag(opts),
  });
}

function saMcq(rng) {
  const d = sqrtData(rng);
  const ws = zt(d.w);
  const S = (z) => M(setText([zt(z), zt(z.neg())]));
  const right = { html: S(d.z) };
  const wrongs = [
    { html: M(setText([zt(d.z), zt(d.z.neg()), zt(d.z.conj()), zt(d.z.conj().neg())])), rule: 'g8_sqrt_signs' },
    { html: S(d.z.conj()), rule: 'g8_sqrt_signs' },
    { html: S(cq(d.y, d.x)) },
    { html: S(cq(d.x * d.x, d.y * d.y)) },
  ];
  return mcq({
    skill: SA, level: 4, prompt: t('Les racines carrées de {ws} sont :', { ws: M(ws) }),
    options: options(right, wrongs),
    key: `${SA}:mcq:${ws}`, expectedSec: 150, exam: { format: 'mcq', points: 1 },
    solution: [{ html: d.b > 0
      ? t('x² − y² = {a}, 2xy = {b}, x² + y² = {m} : x² = {x2}, y² = {y2}, même signe.', { a: fr(d.a), b: fr(d.b), m: d.m, x2: d.x * d.x, y2: d.y * d.y })
      : t('x² − y² = {a}, 2xy = {b}, x² + y² = {m} : x² = {x2}, y² = {y2}, signes contraires.', { a: fr(d.a), b: fr(d.b), m: d.m, x2: d.x * d.x, y2: d.y * d.y }), note: '' }],
  }, rng);
}

const SA_TF = [
  { s: 'Pour tout δ ∈ ℂ : (δ̄)² = δ².', vars: ['d'], pred: 'conj(d)^2=d^2', answer: { d: '1+i' }, rule: 'g8_sqrt_signs', why: t('Avec δ = 1 + i : (1 − i)² = −2i, mais (1 + i)² = 2i. Changer le signe de y seul ne donne pas une racine du même nombre.') },
  { s: 'Pour tous réels x et y : (x + iy)² = x² + y² + 2xyi.', vars: ['x', 'y'], doms: { x: 'R', y: 'R' }, pred: '(x+iy)^2=x^2+y^2+2xyi', answer: { x: '0', y: '1' }, rule: 'g8_i_squared', why: t('(iy)² = i²y² = −y² : (x + iy)² = x² − y² + 2xyi (avec x = 0, y = 1 : i² = −1, pas 1).') },
  { s: 'Si δ² = w, alors (−δ)² = w.', truth: true, why: t('(−δ)² = δ² : les racines carrées vont par paires opposées.') },
  { s: 'Tout nombre complexe w ≠ 0 a exactement deux racines carrées dans ℂ.', truth: true, why: t('Ce sont les deux racines de z² = w : ±δ, opposées.') },
  { s: 'Si x + iy est une racine carrée de a + bi avec b > 0, alors x et y ont le même signe.', truth: true, why: '2xy = b > 0.' },
  { s: 'Pour tout w ∈ ℂ : si δ² = w, alors |δ|² = |w|.', truth: true, why: t('|δ²| = |δ|² : c\'est la troisième équation x² + y² = |w|.') },
];

function saTf(rng) {
  const tq = rng.pick(SA_TF);
  const truth = tq.truth ?? false;
  const labels = { d: 'δ =', x: 'x =', y: 'y =' };
  return tfItem({
    skill: SA, level: 4, statement: t(tq.s), truth,
    counter: truth ? null : { kind: 'complex', vars: tq.vars, doms: tq.doms, pred: tq.pred, ask: tq.vars.map((v) => ({ v, label: labels[v], keys: ['calc', 'cplx'] })), answer: tq.answer },
    ruleIfTrue: tq.rule || null,
    explanation: tq.why, key: `${SA}:${tq.s}`, exam: { format: 'tf', points: 1 },
  });
}

// ======================================================================
// g8-quadratic
// ======================================================================

const QU = 'g8-quadratic';
const QU_SUB = [
  { id: 'disc', label: 'discriminant', skill: QU },
  { id: 'sqrt', label: t('racine carrée de Δ'), skill: SA },
  { id: 'formula', label: t('formule'), skill: 'quad-formula' },
  { id: 'simp', label: t('simplifier'), skill: 'g8-algebraic' },
  { id: 'viete', label: t('contrôle par Viète'), skill: QU },
];
const QU_CHOICES = [
  { id: 'disc', label: 'Calculer Δ = b² − 4ac' },
  { id: 'sqrt', label: t('Racine carrée de Δ : δ = x + iy avec δ² = Δ') },
  { id: 'sym', label: t('Écrire √Δ = i√(−Δ)'), rule: 'g8_sqrt_symbol_complex', why: t('Δ n\'est pas un réel négatif : √ n\'a pas de sens ici. Cherche δ = x + iy.') },
  { id: 'formula', label: 'Formule z = (−b ± δ)/(2a)' },
  { id: 'simp', label: t('Simplifier la division') },
  { id: 'viete', label: t('Contrôle : z₁ + z₂ = −b/a') },
  { id: 'set', label: t('Écrire les deux solutions') },
];

const A_CPLX = [cq(1, 1), cq(0, 1), cq(1, -1), cq(2)];
function quadData(rng, kind) {
  for (let k = 0; k < 300; k++) {
    const a = kind === 'cplx' ? rng.pick(A_CPLX) : kind === 'real' && rng.chance(0.3) ? cq(2) : cq(1);
    let z1;
    let z2;
    if (kind === 'real') {
      z1 = cq(rng.int(-3, 3), rng.int(1, 3));
      z2 = z1.conj();
    } else {
      z1 = cq(rng.int(-3, 3), rng.int(-3, 3));
      z2 = cq(rng.int(-3, 3), rng.int(-3, 3));
    }
    if (z1.eq(z2)) continue;
    const b = a.mul(z1.add(z2)).neg();
    const c = a.mul(z1).mul(z2);
    const D = b.mul(b).sub(a.mul(c).mul(4));
    let delta = a.mul(z1.sub(z2));
    if (delta.re.n < 0 || (delta.re.n === 0 && delta.im.n < 0)) delta = delta.neg();
    if (kind !== 'real' && (delta.re.n === 0 || delta.im.n === 0)) continue;
    if (Math.abs(D.re.n) > 80 || Math.abs(D.im.n) > 80 || c.isZero()) continue;
    // z₁ = (−b + δ)/(2a), z₂ = (−b − δ)/(2a).
    const two = a.mul(2);
    const r1 = b.neg().add(delta).div(two);
    const r2 = b.neg().sub(delta).div(two);
    return { kind, a, b, c, D, delta, two, r1, r2, b2: b.mul(b), ac4: a.mul(c).mul(4) };
  }
  return null;
}
// i√m simplified: 2i√17, 3i, i√10.
function surdI(m) {
  let k = 1;
  let s = m;
  for (let f = 2; f * f <= s; f++) while (s % (f * f) === 0) { s /= f * f; k *= f; }
  return `${k === 1 ? '' : k}i${s === 1 ? '' : `√${s}`}`;
}
const QFALL = () => {
  const a = cq(1); const b = cq(-3, -1); const c = cq(4, 3);
  return { kind: 'one', a, b, c, D: cq(-8, -6), delta: cq(1, -3), two: cq(2), r1: cq(2, -1), r2: cq(1, 2), b2: b.mul(b), ac4: c.mul(4), fallback: true };
};

// a·z² + b·z + c = 0 as text.
function coefText(k, v) {
  if (k.isZero()) return '';
  if (k.eq(1)) return v;
  if (k.eq(-1)) return `-${v}`;
  if (k.re.n && k.im.n) {
    if (k.re.n < 0 && k.im.n < 0) return `-(${zt(k.neg())})${v}`;
    return `(${zt(k)})${v}`;
  }
  return `${zt(k)}${v}`;
}
export const quadText = (d, v = 'z') => `${joinT([coefText(d.a, `${v}^2`), coefText(d.b, v), ...termsOf(d.c)])}=0`;
const plainPos = (z) => z.isReal() && z.re.n > 0;
const discStart = (d) => `${plainPos(d.b) ? zt(d.b) : `(${zt(d.b)})`}^2-4${d.a.eq(1) ? '' : plainPos(d.a) ? `×${zt(d.a)}` : `(${zt(d.a)})`}${plainPos(d.c) ? `×${zt(d.c)}` : `(${zt(d.c)})`}`;
const formula = (d, sgn) => `(${par(d.b.neg())}${sgn}(${zt(d.delta)}))/${d.two.isReal() ? zt(d.two) : `(${zt(d.two)})`}`;

// Δ, δ (by x + iy at level 5 of g8-sqrt-alg), then z₁ and z₂ or the set.
function quadParts(d, level, { chain = false } = {}) {
  const parts = [];
  const Ds = zt(d.D);
  const expand = joinT([...termsOf(d.b2), ...termsOf(d.ac4.neg())]);
  parts.push({ start: discStart(d), judge: ALG, lines: prep(ALG, [E(expand, 'b² et 4ac', 'disc', 'disc'), E(Ds, t('Regrouper'), 'disc', 'disc')], level, [[(termsOf(d.ac4.neg()).filter(Boolean).at(-1) || '').replace(/^-/, '')], []]) });
  const real = d.D.isReal();
  const decide = level === 2 || level === 3;
  const pre = [];
  if (level <= 2 && !chain) {
    const m = d.delta.abs2().n;
    pre.push({ kind: 'note', html: real ? t('Δ = {Ds} est un réel négatif : δ = i√{v1}.', { Ds: frs(Ds), v1: -d.D.re.n }) : t('δ = x + iy avec δ² = Δ : x² − y² = {n}, 2xy = {n2}, x² + y² = |Δ| = {m}.', { n: fr(d.D.re.n), n2: fr(d.D.im.n), m }) });
  }
  if (decide && !chain) {
    pre.push({ kind: 'decision', prompt: t('Comment trouver δ, une racine carrée de Δ = {Ds} ?', { Ds: frs(Ds) }), options: real ? [
      { id: 'ineg', label: t('Δ est un réel négatif : δ = i√{v1}', { v1: -d.D.re.n }), valid: true },
      { id: 'xy', label: t('Poser δ = x + iy avec δ² = Δ'), valid: true },
      { id: 'none', label: t('Pas de solution : Δ < 0'), valid: false, why: t('Dans ℂ, un réel négatif a deux racines carrées : ±i√(−Δ).') },
    ] : [
      { id: 'xy', label: t('Poser δ = x + iy avec δ² = Δ'), valid: true },
      { id: 'sym', label: t('δ = i√({v1}), comme pour un réel négatif', { v1: frs(zt(d.D.neg())) }), valid: false, rule: 'g8_sqrt_symbol_complex', why: t('La règle √(−a) = i√a ne vaut que pour a réel positif. Ici Δ n\'est pas réel.') },
      { id: 'parts', label: t('Prendre la racine de chaque partie de Δ'), valid: false, why: t('√ ne se calcule pas partie par partie : (x + iy)² = x² − y² + 2xyi.') },
    ] });
  }
  if (chain) {
    // Level 5 of g8-sqrt-alg: δ by x + iy, every step written.
    const dd = { x: d.delta.re.n, y: d.delta.im.n, z: d.delta, w: d.D, m: d.delta.abs2().n, a: d.D.re.n, b: d.D.im.n };
    parts.push(...sqrtParts(dd, level, { v: 'δ', withPose: false, decide: false }));
  } else {
    parts.push({ html: t('δ, une racine carrée de Δ : résous δ² = Δ.'), ask: 'δ ∈', start: `δ^2=${Ds}`, judge: SET('δ'), pre, lines: prep(SET('δ'), [E(setText([zt(d.delta), zt(d.delta.neg())]), 'δ et −δ', 'sqrt', 'sqrt')], level, [[zt(d.delta.neg())]]) });
  }
  if (level <= 3) {
    [['+', d.r1, '₁'], ['-', d.r2, '₂']].forEach(([sgn, r, ix]) => {
      const N = d.b.neg()[sgn === '+' ? 'add' : 'sub'](d.delta);
      const lines = [E(`${numer(N)}/${d.two.isReal() ? zt(d.two) : `(${zt(d.two)})`}`, `−b ${sgn === '+' ? '+' : '−'} δ`, 'formula', 'formula')];
      if (!d.two.isReal()) lines.push(E(`${numer(N.mul(d.two.conj()))}/${d.two.abs2().n}`, t('Conjugué du dénominateur'), 'simp', 'simp'));
      lines.push(E(zt(r), t('Simplifier'), 'simp', 'simp'));
      parts.push({ html: `z${ix} = (−b ${sgn === '+' ? '+' : '−'} δ)/(2a) =`, ask: `z${ix} =`, start: formula(d, sgn), judge: ALG, lines: prep(ALG, lines, level, [[zt(N)], [], []]) });
    });
    if (level !== 2) {
      // z₁ + z₂ = −b/a (left out when both roots are a single term).
      const sum = `${numer(d.r1)}+${numer(d.r2)}`;
      const useSum = (d.r1.re.n && d.r1.im.n) || (d.r2.re.n && d.r2.im.n);
      if (useSum) parts.push({ html: t('Contrôle par Viète : z₁ + z₂ (doit valoir −b/a) ='), ask: 'z₁ + z₂ =', start: sum, judge: ALG, lines: prep(ALG, [E(zt(d.r1.add(d.r2)), `−b/a = ${frs(zt(d.r1.add(d.r2)))}`, 'viete', 'viete')], level) });
    }
  } else {
    parts.push({ html: t('Les solutions, sous forme algébrique :'), ask: 'S =', start: quadText(d), judge: SET(), lines: [E(setText([zt(d.r1), zt(d.r2)]), t('z = (−b ± δ)/(2a), simplifié'), 'formula', 'set')] });
  }
  return parts;
}

function quadItem(level, rng, opts = {}, { skill = QU, chain = false } = {}) {
  const kind = rng.next() < 0.2 && !chain ? 'real' : level === 1 ? 'one' : rng.pick(['one', 'cplx', 'cplx']);
  const d = quadData(rng, chain ? rng.pick(['one', 'cplx']) : kind) || QFALL();
  const parts = quadParts(d, level, { chain });
  if (level === 2 && !d.a.eq(1) && !chain) {
    parts[0].pre = [{ kind: 'decision', prompt: t('a = {v1} : comment commencer ?', { v1: frs(zt(d.a)) }), options: [
      { id: 'direct', label: t('Formule directe avec a, b, c'), valid: true, quality: 'good' },
      { id: 'divide', label: t('Diviser d\'abord l\'équation par a'), valid: true, quality: 'good', why: t('Possible aussi : les coefficients changent, les solutions non.') },
    ] }];
  }
  const { start, judge, script } = partsScript(parts, level, QU_CHOICES);
  const eq = quadText(d);
  const sub = chain ? [...SA_SUB, ...QU_SUB.filter((x) => x.id !== 'sqrt')] : QU_SUB;
  return linesItem({
    skill, level, mode: modeOf(level), start, judge, script,
    prompt: chain
      ? t('Résous dans ℂ : {eq}. Calcule Δ, puis une racine carrée δ de Δ avec δ = x + iy, puis les solutions, sans aide.', { eq: M(eq) })
      : t('Résous dans ℂ : {eq}. Commence par Δ = b² − 4ac.', { eq: M(eq) }),
    hints: H(t('Même formule que dans ℝ : Δ = b² − 4ac, puis z = (−b ± δ)/(2a), où δ² = Δ se trouve avec δ = x + iy.'), t('z = {v1} ou avec −', { v1: M(`(${par(d.b.neg())}±(□))/${d.two.isReal() ? zt(d.two) : `(${zt(d.two)})`}`.replace('±', '+')) }), M(setText([zt(d.r1), zt(d.r2)]))),
    subgoals: sub, keys: KEYS_ALL, tapActions: level === 3 ? 'steps' : null,
    key: `${skill}:${level}:${eq}`, exam: examTag(opts, 4), fallback: !!d.fallback,
  });
}

// The exam problem E6 (MAN 2017 Q6) with other numbers: 7 points,
// [[1, 1], [1, 1], [1], [1, 1]].
function quadProblem(level, rng, opts = {}) {
  const d = quadData(rng, 'cplx') || QFALL();
  const eq = quadText(d);
  const Ds = zt(d.D);
  const mk = (o) => linesItem({ skill: QU, level, mode: 'free', keys: KEYS_ALL, subgoals: QU_SUB, hints: [], key: `${QU}:${level}:E6:${eq}:${o.key}`, ...o });
  const P1 = partsScript([
    { start: `(${zt(d.b)})^2`, judge: ALG, lines: [E(zt(d.b2), 'b²', 'disc')] },
    { html: 'Δ = b² − 4ac =', ask: 'Δ =', start: `${zt(d.b2)}-4${d.a.eq(1) ? '' : `(${zt(d.a)})`}(${zt(d.c)})`, judge: ALG, lines: clean(ALG, [E(joinT([...termsOf(d.b2), ...termsOf(d.ac4.neg())]), '4ac', 'disc'), E(Ds, 'Δ', 'disc')], 'free') },
  ], 4, []);
  const part1 = mk({ ...P1, prompt: t('Calcule le discriminant : b² ='), key: 'disc' });
  const P2 = partsScript([
    { start: `|${Ds}|`, judge: ALG, lines: [E(String(d.delta.abs2().n), 'x² + y² = |Δ|', 'sqrt')] },
    { html: t('δ = x + iy avec δ² = Δ :'), ask: 'δ ∈', start: `δ^2=${Ds}`, judge: SET('δ'), lines: [E(`δ=${zt(d.delta)} ou δ=${zt(d.delta.neg())}`, 'x² − y², 2xy et x² + y²', 'sqrt')] },
  ], 4, []);
  const part2 = mk({ ...P2, prompt: t('Racine carrée de Δ : d\'abord |Δ| ='), key: 'sqrt' });
  const den = d.two.isReal() ? zt(d.two) : `(${zt(d.two)})`;
  const mb = par(d.b.neg());
  const F = (top, sgn1, sgn2) => M(setText([`(${top}${sgn1}(${zt(d.delta)}))/${den}`, `(${top}${sgn2}(${zt(d.delta)}))/${den}`]));
  const part3 = mcq({
    skill: QU, level, prompt: t('Les solutions z₁ et z₂ sont :'), key: `${QU}:${level}:E6f:${eq}`, expectedSec: 60,
    options: options({ html: F(mb, '+', '-') }, [
      { html: F(par(d.b), '+', '-') },
      { html: M(setText([`(${mb}+(${zt(d.delta)}))/2`, `(${mb}-(${zt(d.delta)}))/2`])) },
      { html: M(setText([`(${mb}+(${Ds}))/${den}`, `(${mb}-(${Ds}))/${den}`])) },
    ]),
    solution: [{ html: 'z = (−b ± δ)/(2a).', note: '' }],
  }, rng);
  const simp = (sgn, r) => {
    const N = d.b.neg()[sgn === '+' ? 'add' : 'sub'](d.delta);
    const lines = clean(ALG, [E(`${numer(N)}/${den}`, `−b ${sgn === '+' ? '+' : '−'} δ`, 'simp'), ...(d.two.isReal() ? [] : [E(`${numer(N.mul(d.two.conj()))}/${d.two.abs2().n}`, t('Conjugué'), 'simp')]), E(zt(r), t('Simplifier'), 'simp')], 'free');
    return { start: formula(d, sgn), judge: ALG, lines };
  };
  const P4 = partsScript([simp('+', d.r1), { html: 'z₂ =', ask: 'z₂ =', ...simp('-', d.r2) }], 4, []);
  const part4 = mk({ ...P4, prompt: t('Simplifie : z₁ ='), key: 'simp' });
  return problemItem({
    skill: QU, level, prompt: t('Donne, sous forme algébrique simplifiée, les racines de P(z) = {v1}.', { v1: M(eq.replace(/=0$/, '')) }),
    parts: [
      { item: part1, points: [1, 1], title: t('1. Discriminant') },
      { item: part2, points: [1, 1], title: t('2. Racine carrée de Δ') },
      { item: part3, points: [1], title: t('3. Formule') },
      { item: part4, points: [1, 1], title: t('4. Simplifier') },
    ],
    key: eq, exam: opts.exam ? { format: 'open', points: 7 } : false, expectedSec: 900, fallback: !!d.fallback,
  });
}

function quMcq(rng) {
  const d = quadData(rng, rng.pick(['one', 'cplx'])) || QFALL();
  const eq = quadText(d);
  if (rng.chance(0.5)) {
    // The roots.
    const S = (a, b) => M(setText([zt(a), zt(b)]));
    const wrongs = [];
    if (!d.D.isReal()) {
      // δ taken as i√|Δ|, as if Δ were a negative real.
      const ia = surdI(d.delta.abs2().n);
      const den = d.two.isReal() ? zt(d.two) : `(${zt(d.two)})`;
      wrongs.push({ html: M(setText([`(${par(d.b.neg())}+${ia})/${den}`, `(${par(d.b.neg())}-${ia})/${den}`])), rule: 'g8_sqrt_symbol_complex' });
    }
    wrongs.push({ html: S(d.r1.neg(), d.r2.neg()) });
    wrongs.push({ html: S(d.r1.conj(), d.r2.conj()) });
    wrongs.push({ html: S(d.r1, d.r2.neg()) });
    return mcq({
      skill: QU, level: 4, prompt: t('Les solutions dans ℂ de {eq} sont :', { eq: M(eq) }),
      options: options({ html: S(d.r1, d.r2) }, wrongs),
      key: `${QU}:mcq:roots:${eq}`, expectedSec: 240, exam: { format: 'mcq', points: 1 },
      solution: [{ html: `Δ = ${M(zt(d.D))}, δ = ${M(zt(d.delta))}, z = (−b ± δ)/(2a).`, note: '' }],
    }, rng);
  }
  // The discriminant, with i² taken as +1.
  const plus = (u, v) => cq(u.re.mul(v.re).add(u.im.mul(v.im)), u.re.mul(v.im).add(u.im.mul(v.re)));
  const Dp = plus(d.b, d.b).sub(plus(d.a, d.c).mul(4));
  const wrongs = [];
  if (!Dp.eq(d.D)) wrongs.push({ html: M(zt(Dp)), rule: 'g8_i_squared' });
  wrongs.push({ html: M(zt(d.b2.add(d.ac4))) });
  wrongs.push({ html: M(zt(d.b2.sub(d.a.mul(d.c).mul(2)))) });
  wrongs.push({ html: M(zt(d.D.neg())) });
  return mcq({
    skill: QU, level: 4, prompt: t('Le discriminant Δ de {eq} vaut :', { eq: M(eq) }),
    options: options({ html: M(zt(d.D)) }, wrongs),
    key: `${QU}:mcq:disc:${eq}`, expectedSec: 150, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `Δ = ${M(discStart(d))} = ${M(zt(d.D))}.`, note: '' }],
  }, rng);
}

function quCoef(rng) {
  for (let k = 0; k < 200; k++) {
    const d = quadData(rng, rng.pick(['one', 'cplx', 'real']));
    if (!d || d.r1.im.eq(d.r2.im)) continue;
    const top = d.r1.im.valueOf() > d.r2.im.valueOf() ? d.r1 : d.r2;
    const eq = quadText(d);
    return answerItem({
      skill: QU, level: 4, prompt: t('Résous {eq} dans ℂ et donne la partie réelle de la solution dont la partie imaginaire est la plus grande.', { eq: M(eq) }),
      expected: top.re.toString(),
      solution: [{ html: `Δ = ${M(zt(d.D))}, δ = ${M(zt(d.delta))} : z₁ = ${M(zt(d.r1))}, z₂ = ${M(zt(d.r2))}.`, note: '' }],
      key: eq, exam: { format: 'coef', points: 1 },
    });
  }
  return null;
}

// ======================================================================

export const GEN = {
  [NR]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return nrMcq(rng);
    if (opts.exam === 'tf') return nrTf(rng);
    if (opts.exam === 'open') return nrItem(5, rng, opts);
    return nrItem(level, rng, opts);
  },
  [SA]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return saMcq(rng);
    if (opts.exam === 'tf') return saTf(rng);
    return saItem(level, rng, opts);
  },
  [QU]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return quMcq(rng);
    if (opts.exam === 'coef') return quCoef(rng);
    if (opts.exam === 'open' || level === 5) return quadProblem(5, rng, opts);
    return quadItem(level, rng, opts);
  },
};

