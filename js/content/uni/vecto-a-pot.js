// v-pot-find and v-pot-lambda (module V, part a, step U10): a potential φ
// found step by step (judge antideriv with grad), and the parameter λ for
// which rot F = 0. Catalogue: docs/universite/VCF-analyse-3-4.md.
//
// Built backwards: φ is drawn (monomials of degree ≤ 3, sin(xz), e^(xy)),
// F = ∇φ. The steps are φ = G₁ + α(y, z) (the terms of φ with x), then
// G₁ + G₂ + β(z), then + G₃ + C, then the constant from φ(P) = 0. The
// judge's cfg.traps holds the wrong potentials of the traps (G₁ + C, the
// three primitives added, ∫ c·vᵏ = c·vᵏ⁺¹, −φ). For λ, one or two
// contributions a·m of ∇φ become (kλ + a − kλ₀)·m, so that rot F =
// (λ − λ₀)·rot B.

import {
  T, sum, sub, d, text, randPoly, isZero, nVars, dependsOn, at, ML, tupML, fieldML, ptT, q, fq,
  vParts, mcqD, opt, decision, act, H, examTag, problemItem,
} from './vecto-a-kit.js';
import { t } from '../../i18n.js';

const PF = 'v-pot-find';
const PL = 'v-pot-lambda';
const XYZ = ['x', 'y', 'z'];

// ---------- φ and its steps ----------

const SPECIALS = [T(1, [0, 0, 0], 'sin', { k: 1, e: [1, 0, 1] }), T(1, [0, 0, 0], 'exp', { k: 1, e: [1, 1, 0] })];

// φ in n variables: every variable used, a mixed term, a term without x.
function phiOf(rng, n, { special = false, poly = false } = {}) {
  for (let tt = 0; tt < 200; tt++) {
    let phi = randPoly(rng, n, rng.int(3, 4), { maxDeg: 3, minDeg: 1, coefs: [-3, -2, -1, 1, 2, 3, 4, 5] });
    if (special && !poly && rng.chance(0.5)) {
      const s = rng.pick(SPECIALS.filter((x) => n === 3 || !dependsOn(x, 2)));
      phi = sum(phi, [{ ...s, c: q(rng.pick([1, 2, -1])) }]);
    }
    if ([...Array(n).keys()].some((i) => !phi.some((x) => dependsOn(x, i)))) continue;
    if (!phi.some((x) => nVars(x) >= 2)) continue;
    if (!phi.some((x) => !dependsOn(x, 0))) continue;
    if (phi.every((x) => x.e.every((k) => k === 0) && !x.f)) continue;
    if (phi.some((x) => !x.f && x.e.every((k) => k === 0))) continue; // no constant term
    const F = [...Array(n).keys()].map((i) => d(phi, i));
    if (F.some(isZero) || F.some((c) => c.length > 4)) continue;
    return { phi, F, n };
  }
  const phi = n === 3 ? sum([T(1, [2, 1, 0]), T(1, [1, 0, 1]), T(1, [0, 0, 2])]) : sum([T(1, [2, 1, 0]), T(3, [0, 1, 0])]);
  return { phi, F: [...Array(n).keys()].map((i) => d(phi, i)), n, fallback: true };
}

// A point P with φ₀(P) whole, |φ₀(P)| ≤ 30 and ≠ 0.
function pointFor(rng, phi, n) {
  for (let tt = 0; tt < 60; tt++) {
    const P = [...Array(n).keys()].map(() => rng.int(-2, 3));
    const v = at(phi, [...P, 0, 0].slice(0, 3));
    if (v === null || v.d !== 1 || Math.abs(v.n) > 30 || v.n === 0) continue;
    return { P, phi0: v };
  }
  return null;
}

const unknown = (n, k) => (n === 3 ? ['α(y, z)', 'β(z)'][k] : ['α(y)'][k]);

// The lines of the potential, its judge and its traps.
export function potential(D, { at: P = null } = {}) {
  const { phi, F, n } = D;
  const G1 = phi.filter((x) => dependsOn(x, 0));
  const R1 = phi.filter((x) => !dependsOn(x, 0));
  const G2 = n === 3 ? R1.filter((x) => dependsOn(x, 1)) : R1;
  const G3 = n === 3 ? R1.filter((x) => !dependsOn(x, 1)) : [];
  const t1 = text(G1);
  const t12 = text(sum(G1, G2));
  const tall = text(phi);
  const vars = XYZ.slice(0, n);
  const lines = [];
  lines.push({ math: `φ = ${t1} + ${unknown(n, 0)}`, note: t('∫ F₁ dx = {a} : la « constante » dépend de {b}', { a: ML(t1), b: n === 3 ? t('y et z') : 'y' }), subgoal: 'integrate-x', blank: [t1] });
  if (n === 3) {
    const dy = text(d(G2, 1));
    lines.push({ math: `φ = ${t12} + β(z)`, note: t('∂φ/∂y = {a} + ∂α/∂y doit valoir F₂ : ∂α/∂y = {b}', { a: ML(text(d(G1, 1))), b: ML(dy) }), subgoal: 'compare-y', blank: G2.length ? [text(G2)] : [] });
    const dz = text(d(G3, 2));
    lines.push({ math: `φ = ${tall} + C`, note: t('∂φ/∂z = {a} + β′(z) doit valoir F₃ : β′(z) = {b}', { a: ML(text(d(sum(G1, G2), 2))), b: ML(dz) }), subgoal: 'compare-z', blank: G3.length ? [text(G3)] : [] });
  } else {
    lines.push({ math: `φ = ${tall} + C`, note: t('∂φ/∂y = {a} + α′(y) doit valoir F₂ : α′(y) = {b}', { a: ML(text(d(G1, 1))), b: ML(text(d(G2, 1))) }), subgoal: 'compare-y', blank: G2.length ? [text(G2)] : [] });
  }
  if (P) {
    const C = P.phi0.neg();
    lines.push({ math: `C = ${C}`, note: t('φ{a} = {b} + C doit valoir 0', { a: ptT(P.P), b: fq(P.phi0) }), subgoal: 'constant', blank: [String(C)] });
    lines.push({ math: `φ = ${text(sum(phi, [T(C, [0, 0, 0])]))}`, note: t('Le potentiel demandé'), subgoal: 'final' });
  }
  // Traps.
  const traps = {};
  if (R1.length) traps.v_pot_const_fn = [{ line: `φ = ${t1} + C`, ctx: {} }];
  const mixed = phi.filter((x) => nVars(x) >= 2);
  if (mixed.length) traps.v_pot_double_count = [{ line: `φ = ${text(sum(...phi.map((x) => [{ ...x, c: x.c.mul(nVars(x)) }])))} + C`, ctx: { term: ML(text([mixed[0]])) } }];
  // ∫ c·k·xᵏ⁻¹ dx written c·k·xᵏ (division by k forgotten), for G₁.
  const badG1 = sum(G1.map((x) => (x.f || x.e[0] < 2 ? x : { ...x, c: x.c.mul(x.e[0]) })));
  const polyTerm = G1.find((x) => !x.f && x.e[0] >= 2);
  if (polyTerm) traps.v_pot_poly_integral = [{ line: `φ = ${text(badG1)} + ${unknown(n, 0)}`, ctx: { term: ML(text([T(polyTerm.c.mul(polyTerm.e[0]), polyTerm.e.map((k, i) => (i === 0 ? k - 1 : k)))])), want: ML(text([polyTerm])) } }];
  traps.v_potential_sign = [{ line: `φ = ${text(sub([], phi))} + C`, ctx: {} }];
  const judge = { kind: 'antideriv', grad: F.map((c) => text(c)), vars, funcs: ['α', 'β'], ...(P ? { at: { point: P.P, value: 0 } } : {}), traps };
  return { judge, lines, G1, G2, G3 };
}

const POT_MENU = (n, withAt) => [
  act('int', t('Intégrer F₁ en x, avec une fonction inconnue {a}', { a: unknown(n, 0) })),
  act('cmp', t('Dériver φ en la variable suivante et comparer à la composante de F')),
  ...(withAt ? [act('const', t('Fixer la constante avec la condition φ(P) = 0'))] : []),
  act('constC', t('Intégrer F₁ en x, avec une constante C'), false, { rule: 'v_pot_const_fn', why: t('Ce qui ne dépend pas de x peut encore dépendre des autres variables.') }),
  act('three', t('Additionner ∫F₁ dx, ∫F₂ dy et ∫F₃ dz'), false, { rule: 'v_pot_double_count', why: t('Les termes mixtes seraient comptés plusieurs fois.') }),
];

// ---------- v-pot-find ----------

const PF_SUB = [
  { id: 'integrate-x', label: t('intégrer F₁ en x'), skill: PF },
  { id: 'compare-y', label: t('comparer à F₂'), skill: PF },
  { id: 'compare-z', label: t('comparer à F₃'), skill: PF },
  { id: 'constant', label: t('fixer la constante'), skill: PF },
  { id: 'final', label: t('le potentiel'), skill: PF },
  { id: 'value', label: 'φ(B) − φ(A)', skill: 'a1-int-direct' },
];
const START_DECISION = decision(t('Par quelle variable commences-tu ?'), [
  { id: 'x', label: t('Intégrer F₁ en x'), valid: true, ref: true },
  { id: 'y', label: t('Intégrer F₂ en y'), valid: true, quality: 'poor', why: t('Possible aussi : on suit ici l\'ordre x, y, z.') },
  { id: 'all', label: t('Intégrer les trois composantes et additionner'), valid: false, rule: 'v_pot_double_count', why: t('Les termes mixtes seraient comptés plusieurs fois.') },
], { levels: [2] });

function pfItem(level, rng, opts) {
  const n = level <= 2 ? 3 : rng.pick([2, 3, 3]);
  const withAt = level === 5 || opts.exam === 'open' || (level === 4 && rng.chance(0.5));
  let D;
  let P = null;
  for (let tt = 0; tt < 50; tt++) {
    D = phiOf(rng, n, { special: level >= 3, poly: level === 5 });
    if (!withAt) break;
    P = pointFor(rng, D.phi, n);
    if (P) break;
  }
  if (withAt && !P) {
    // Fallback: φ = x²y + xz + z² (P = (1 ; 2 ; −1)) or x²y + 3y (P = (1 ; 1)).
    const phi = n === 3 ? sum([T(1, [2, 1, 0]), T(1, [1, 0, 1]), T(1, [0, 0, 2])]) : sum([T(1, [2, 1, 0]), T(3, [0, 1, 0])]);
    D = { phi, F: [...Array(n).keys()].map((i) => d(phi, i)), n, fallback: true };
    P = n === 3 ? { P: [1, 2, -1], phi0: q(2) } : { P: [1, 1], phi0: q(4) };
  }
  const pot = potential(D, { at: P });
  const parts = [{ start: 'φ', judge: pot.judge, lines: pot.lines, decisions: [START_DECISION], menu: POT_MENU(n, !!P) }];
  let extra = '';
  if (level === 5) {
    // ∫_Γ F · dl along γ(t) = (t ; 2t³ ; t⁹) (n = 3) or (t ; 2t³), from A = γ(0) to B = γ(1).
    const A = [0, 0, 0].slice(0, n);
    const B = [1, 2, 1].slice(0, n);
    const phiB = at(D.phi, [...B, 0].slice(0, 3));
    const phiA = at(D.phi, [...A, 0].slice(0, 3));
    const W = phiB.sub(phiA);
    parts.push({
      html: t('Le travail le long de Γ :'), ask: '∫_Γ F · dl =', start: 'W', judge: { kind: 'definite', vars: ['W'], known: { W: String(W) } },
      decisions: [decision(t('Comment calcules-tu ce travail ?'), [
        { id: 'pot', label: t('Avec le potentiel : φ(B) − φ(A)'), valid: true, ref: true },
        { id: 'param', label: t('En paramétrant Γ'), valid: true, quality: 'poor', why: t('Juste, mais très long ici : avec t⁹, le calcul devient lourd. F = ∇φ donne directement φ(B) − φ(A).') },
      ])],
      lines: [{ math: `(${phiB})-(${phiA})`, note: t('φ(B) − φ(A), B = {a}, A = {b} (la constante s\'en va)', { a: ptT(B), b: ptT(A) }), subgoal: 'value' }, { math: String(W), note: t('Le travail'), subgoal: 'value' }],
    });
    extra = t(' Puis calcule ∫<sub>Γ</sub> F · dl, où Γ est la courbe γ(t) = {a}, t ∈ [0 ; 1].', { a: tupML(n === 3 ? ['t', '2t^3', 't^9'] : ['t', '2t^3']) });
  }
  const FT = D.F.map((c) => text(c));
  const ex = opts.exam ? examTag(opts, 4) : false;
  return vParts({
    skill: PF, level, parts, subgoals: PF_SUB, exam: ex, fallback: D.fallback,
    prompt: t('Soit {a} sur {b} (convexe, et rot F = 0). Trouve φ telle que F = ∇φ{c}.{extra}', { a: fieldML(FT), b: n === 3 ? 'ℝ³' : 'ℝ²', c: P ? t(' et φ{a} = 0', { a: ptT(P.P) }) : '', extra }),
    key: `${PF}:${level}:${FT.join('|')}:${P ? P.P : ''}`,
    hints: H(t('Intègre F₁ en x ; la « constante » dépend de {a}. Puis dérive en y et compare à F₂.', { a: n === 3 ? t('y et z : α(y, z)') : 'y : α(y)' }), `${ML(pot.lines[0].math)}`, `${ML(pot.lines[1].math)}`),
  });
}

function pfMcq(level, rng, opts) {
  const D = phiOf(rng, 3, { special: false });
  const pot = potential(D);
  const tr = pot.judge.traps;
  const show = (tt) => ML(tt);
  return mcqD({
    skill: PF, level, exam: examTag(opts), key: `${PF}:mcq:${text(D.phi)}`, fallback: D.fallback,
    prompt: t('Soit {a}. Une fonction potentiel de F (F = ∇φ) est :', { a: fieldML(D.F.map((c) => text(c))) }),
    right: show(`φ = ${text(D.phi)}`),
    wrongs: [
      tr.v_pot_double_count && opt(show(tr.v_pot_double_count[0].line.replace(/ \+ C$/, '')), 'v_pot_double_count'),
      tr.v_pot_const_fn && opt(show(tr.v_pot_const_fn[0].line.replace(/ \+ C$/, '')), 'v_pot_const_fn'),
      opt(show(tr.v_potential_sign[0].line.replace(/ \+ C$/, '')), 'v_potential_sign'),
      tr.v_pot_poly_integral && opt(show(tr.v_pot_poly_integral[0].line.replace(/ \+ α\(y, z\)$/, '')), 'v_pot_poly_integral'),
    ].filter(Boolean),
    solution: [{ html: t('{a}, puis {b}, et enfin {c}. Vérification : ∇φ = F.', { a: ML(pot.lines[0].math), b: ML(pot.lines[1].math), c: ML(pot.lines[2].math) }), note: '' }],
  }, rng);
}

// ---------- v-pot-lambda ----------

const PL_SUB = [
  { id: 'rot', label: 'rot F', skill: 'v-ops' },
  { id: 'solve', label: t('trouver λ'), skill: PL },
  { id: 'integrate-x', label: t('intégrer F₁ en x'), skill: PF },
  { id: 'compare-y', label: t('comparer à F₂'), skill: PF },
  { id: 'compare-z', label: t('comparer à F₃'), skill: PF },
  { id: 'constant', label: t('fixer la constante'), skill: PF },
  { id: 'final', label: t('le potentiel'), skill: PF },
];
const ROT_IDX = [[2, 1, 1, 2], [0, 2, 2, 0], [1, 0, 0, 1]];
const SUBS = ['₁', '₂', '₃'];
const rotOf = ([P, Q, R]) => [sub(d(R, 1), d(Q, 2)), sub(d(P, 2), d(R, 0)), sub(d(Q, 0), d(P, 1))];
const keyE = (e) => e.join(',');

// a + λ·b as text: per monomial, the coefficient (bλ + a).
function lamText(A, B) {
  const map = new Map();
  for (const tt of A) map.set(keyE(tt.e), { e: tt.e, a: tt.c, b: q(0) });
  for (const tt of B) { const k = keyE(tt.e); const o = map.get(k) || { e: tt.e, a: q(0), b: q(0) }; o.b = o.b.add(tt.c); map.set(k, o); }
  let out = '';
  for (const o of [...map.values()]) {
    if (o.a.n === 0 && o.b.n === 0) continue;
    const mono = text([T(1, o.e)]);
    const body = mono === '1' ? '' : mono;
    let coef;
    if (o.b.n === 0) { const s = text([T(o.a, o.e)]); out += out && !s.startsWith('-') ? `+${s}` : s; continue; }
    const lb = o.b.eq(1) ? 'λ' : o.b.eq(-1) ? '-λ' : `${o.b}λ`;
    if (o.a.n === 0) coef = lb;
    else if (o.b.n > 0) coef = `(${lb}${o.a.n > 0 ? '+' : ''}${o.a})`;
    else coef = `(${o.a}${lb})`;
    const s = body ? `${coef}${coef.startsWith('(') ? '' : ''}${body}` : coef;
    out += out && !s.startsWith('-') ? `+${s}` : s;
  }
  return out || '0';
}

function plData(rng) {
  for (let tt = 0; tt < 200; tt++) {
    const { phi, F } = phiOf(rng, 3, { poly: true });
    const l0 = rng.pick([-2, -1, 1, 2, 3]);
    const mixed = phi.filter((x) => nVars(x) >= 2 && !x.f);
    if (mixed.length < 1) continue;
    const A = F.map((c) => [...c]);
    const B = [[], [], []];
    // One or two contributions a·m of ∇φ get the coefficient kλ + (a − kλ₀).
    const picks = rng.shuffle(mixed).slice(0, 2);
    const used = new Set();
    for (const term of picks) {
      const vars = [0, 1, 2].filter((i) => term.e[i] > 0 && !used.has(i));
      if (!vars.length) continue;
      const i = rng.pick(vars);
      used.add(i);
      const mono = term.e.map((k, j) => (j === i ? k - 1 : k));
      const k = rng.pick([1, 1, 2, -1]);
      A[i] = sum(A[i], [T(-k * l0, mono)]);
      B[i] = sum(B[i], [T(k, mono)]);
    }
    const rotB = rotOf(B);
    if (rotB.filter((r) => !isZero(r)).length < 2) continue;
    const rotA = rotOf(A);
    const Ftext = [0, 1, 2].map((i) => lamText(A[i], B[i]));
    if (Ftext.some((x) => x === '0')) continue;
    return { phi, F, A, B, l0, rotA, rotB, Ftext };
  }
  // Fallback (catalogue): F = (2xy + λz ; λx² ; x + 2z), λ₀ = 1.
  const phi = sum([T(1, [2, 1, 0]), T(1, [1, 0, 1]), T(1, [0, 0, 2])]);
  const F = [0, 1, 2].map((i) => d(phi, i));
  const A = [[T(2, [1, 1, 0])], [], [T(1, [1, 0, 0]), T(2, [0, 0, 1])]];
  const B = [[T(1, [0, 0, 1])], [T(1, [2, 0, 0])], []];
  return { phi, F, A, B, l0: 1, rotA: rotOf(A), rotB: rotOf(B), Ftext: [0, 1, 2].map((i) => lamText(A[i], B[i])), fallback: true };
}

function rotPartL(D, i, first) {
  const [b, a, e, c] = ROT_IDX[i];
  const start = `pd(${D.Ftext[b]},${XYZ[a]})-pd(${D.Ftext[e]},${XYZ[c]})`;
  const goal = lamText(D.rotA[i], D.rotB[i]);
  const judge = { kind: 'equiv', vars: [...XYZ, 'λ'], domain: { x: [-3, 3], y: [-3, 3], z: [-3, 3], λ: [-3, 3] }, target: 'no-int', goal, rot: true, traps: { v_rot_sign: [{ line: `-(${goal})`, ctx: { i: i + 1, want: goal } }] } };
  const dA = lamText(d(D.A[b], a), d(D.B[b], a));
  const dB = lamText(d(D.A[e], c), d(D.B[e], c));
  return {
    html: first ? null : t('Composante {a} de rot F :', { a: i + 1 }), ask: `(rot F)${SUBS[i]} =`, start, judge,
    lines: [{ math: `${dA}-(${dB})`, note: `∂F${SUBS[b]}/∂${XYZ[a]} − ∂F${SUBS[e]}/∂${XYZ[c]}`, subgoal: 'rot', blank: [dA, dB] }, { math: goal, note: t('On simplifie'), subgoal: 'rot' }],
    menu: [act('derive', t('Dériver, puis faire la différence (λ est une constante)')), act('swap', t('Échanger l\'ordre des deux dérivées'), false, { rule: 'v_rot_sign', why: t('L\'ordre est fixé : x → y → z → x.') })],
  };
}

// Coefficients (in λ) of a component (λ − λ₀)·R: the equations « coef = 0 ».
function equationsOf(D) {
  const eqs = [];
  D.rotB.forEach((rb, i) => {
    if (isZero(rb)) return;
    // One monomial of R is enough: its coefficient is c·(λ − λ₀).
    const tt = rb[0];
    const ra = D.rotA[i].find((x) => keyE(x.e) === keyE(tt.e));
    const a = ra ? ra.c : q(0);
    eqs.push(`${tt.c.eq(1) ? '' : tt.c.eq(-1) ? '-' : tt.c}λ${a.n === 0 ? '' : a.n > 0 ? `+${a}` : a}=0`);
  });
  return [...new Set(eqs)];
}

const SUM_DECISION = decision(t('Comment écris-tu rot F = 0 ?'), [
  { id: 'comp', label: t('Chaque composante de rot F est nulle, pour tout (x, y, z)'), valid: true, ref: true },
  { id: 'sum', label: t('La somme des composantes de rot F est nulle'), valid: false, rule: 'v_rot_scalar_sum', why: t('Une somme nulle ne dit pas que chaque terme est nul : rot F est un vecteur.') },
], { levels: [2, 3, 4] });

function plItem(level, rng, opts) {
  const D = plData(rng);
  const parts = [0, 1, 2].map((i) => rotPartL(D, i, i === 0));
  const eqs = equationsOf(D);
  parts.push({
    html: t('Les équations, vraies pour tout (x, y, z) :'), ask: 'λ :', start: eqs.join(' ∧ '),
    judge: { kind: 'solset', v: 'λ', domain: 'R' },
    decisions: [SUM_DECISION],
    lines: [{ math: `λ = ${D.l0}`, note: t('ℝ³ est convexe : pour λ = {a}, F dérive d\'un potentiel ; pour λ ≠ {a}, rot F ≠ 0 et non', { a: fq(D.l0) }), subgoal: 'solve', blank: [String(D.l0)] }],
  });
  const withPhi = level === 5 || opts.exam === 'open' || (level === 4 && rng.chance(0.5));
  let P = null;
  if (withPhi) {
    P = level === 5 || opts.exam === 'open' ? pointFor(rng, D.phi, 3) : null;
    const pot = potential({ phi: D.phi, F: D.F, n: 3 }, { at: P });
    parts.push({ html: t('Pour λ = {a}, trouve φ{b} :', { a: fq(D.l0), b: P ? t(' avec φ{a} = 0', { a: ptT(P.P) }) : '' }), ask: 'φ =', start: 'φ', judge: pot.judge, lines: pot.lines, menu: POT_MENU(3, !!P) });
  }
  const prompt = t('Soit F(x, y, z) = {a} sur ℝ³, où λ est un réel. Pour quelles valeurs de λ F dérive-t-il d\'un potentiel ?{b}', { a: tupML(D.Ftext), b: withPhi ? t(' Pour cette valeur, trouve φ telle que F = ∇φ{a}.', { a: P ? t(' et φ{a} = 0', { a: ptT(P.P) }) : '' }) : '' });
  const item = vParts({
    skill: PL, level, parts, subgoals: PL_SUB, exam: opts.exam ? examTag(opts, 6) : false, fallback: D.fallback,
    prompt, key: `${PL}:${level}:${D.Ftext.join('|')}:${P ? P.P : ''}`,
    hints: H(t('rot F = 0 veut dire trois équations, vraies en tout point : une par composante.'), `(rot F)${SUBS[D.rotB.findIndex((r) => !isZero(r))]} = ${ML(lamText(D.rotA[D.rotB.findIndex((r) => !isZero(r))], D.rotB[D.rotB.findIndex((r) => !isZero(r))]))}`, `${eqs.map((e) => ML(e)).join(' et ')} : λ = ${fq(D.l0)}`),
  });
  if (opts.exam === 'open') {
    // Barème 2022 (6 pts): rot 2 (+1 for the domain, with λ), λ 1… here: rot 3, λ 1, φ 2.
    const pts = [1, 1, 1, 1, 2];
    return problemItem({ skill: PL, level, prompt, parts: [{ item: { ...item, prompt: '' }, points: pts }], key: item.key, exam: examTag(opts, 6) });
  }
  return item;
}

function plMcq(level, rng, opts) {
  const D = plData(rng);
  const l0 = D.l0;
  const S = sum(...D.rotB);
  return mcqD({
    skill: PL, level, exam: examTag(opts), key: `${PL}:mcq:${D.Ftext.join('|')}`, fallback: D.fallback,
    prompt: t('Soit F(x, y, z) = {a} sur ℝ³. F dérive d\'un potentiel si et seulement si :', { a: tupML(D.Ftext) }),
    right: `λ = ${fq(l0)}`,
    wrongs: [opt(`λ = ${fq(-l0)}`, 'v_rot_sign'), isZero(S) ? null : opt(`λ = ${fq(l0)} ou ${ML(`${text(S)}=0`)}`, 'v_rot_scalar_sum'), opt(`λ = ${fq(l0 + 1)}`)],
    fillers: [opt(t('pour aucune valeur de λ')), opt(t('pour toute valeur de λ'))],
    solution: [{ html: t('rot F = (λ − {a})·{b} : chaque composante doit être nulle en tout point, donc λ = {a}. ℝ³ est convexe : la condition suffit.', { a: fq(l0), b: tupML(D.rotB.map((r) => text(r))) }), note: '' }],
  }, rng);
}

export const GEN = {
  [PF]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return pfMcq(4, rng, opts);
    return pfItem(opts.exam ? 4 : level, rng, opts);
  },
  [PL]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return plMcq(4, rng, opts);
    return plItem(opts.exam ? 4 : level, rng, opts);
  },
};
