// n-ode-rk (module N, part g, step U9): Heun, Crank-Nicolson, Runge-Kutta.
// Catalogue: docs/universite/N-analyse-numerique.md, n-ode-rk.
//
// Data: as n-ode-euler (u′ = λu + g(t)), the rows of Heun and CN exact.
// L1 the table of one step of Heun, k₁ and k₂ to fill (t and u given);
// L2 one free step of Heun (k₁, k₂, u₁); L3 recognise a scheme from its
// formula (a multiple choice); L4 two steps of Heun, then u₁ by
// Crank-Nicolson (lines, f affine in u); L5 the program of Heun, then the
// table of errors with a column Heun (ordre 2).
// Exam: mcq (the scheme of GM 2012 with f = −u + sin(tu), Crank-Nicolson;
// or u₁ by Heun with the trap k₂ = f(t + h, u + k₁)).

import { linesItem, mcq, examTag } from './kit.js';
import { mcqDistinct } from './alglin-kit.js';
import { refCode, codeItem, iterTable, H } from './numerique-kit.js';
import { odeData, fShow, nice, problemText, gAt, R } from './numerique-g-kit.js';
import { sqrtReadtable } from './numerique-g-euler.js';

const RK = 'n-ode-rk';
const SUB = [
  { id: 'k1', label: 'k₁ = f(tₙ, uₙ)', skill: RK },
  { id: 'k2', label: 'k₂, la pente au point prédit', skill: RK },
  { id: 'update', label: 'uₙ₊₁ = uₙ + h(k₁ + k₂)/2', skill: RK },
  { id: 'cn', label: 'Crank-Nicolson', skill: RK },
  { id: 'euler', label: 'un pas d\'Euler (la prédiction)', skill: 'n-ode-euler' },
];
const KEYS = ['calc'];

const HEUN_COLS = [{ id: 't', label: 'tₙ' }, { id: 'k1', label: 'k₁' }, { id: 'k2', label: 'k₂' }, { id: 'u', label: 'uₙ' }];

function heunTable(rng, level) {
  const d = odeData(rng, { schemes: ['Heun', 'CN'], steps: 2 });
  const n = level === 4 ? 3 : 2;
  const rows = d.rows.Heun;
  const phi = { ...d.phiOf('Heun'), tol: 1e-9 };
  let then = null;
  if (level === 4) {
    const c1 = d.rows.CN[1].u;
    const h = d.h;
    const g0 = gAt(d.g, 0);
    const g1 = gAt(d.g, h);
    // h/2 in brackets: 1/10/2 cannot be typed (a denominator starts no fraction).
    const line = `(${d.u0}+(${h})/2×((${d.lam})×${d.u0}+${g0})+(${h})/2×${g1})/(1-(${h})/2×(${d.lam}))`;
    then = linesItem({
      skill: RK, level: 4, mode: 'free', keys: KEYS,
      prompt: `Même problème, un pas de Crank-Nicolson : u₁ = u₀ + (h/2)(f(t₀, u₀) + f(t₁, u₁)). Combien vaut u₁ ?`,
      start: 'u_1', judge: { kind: 'value', expect: String(c1), form: 'irreducible', ode: d.phiOf('CN') },
      script: [
        { kind: 'eq', math: line, note: 'u₁ figure des deux côtés : on l\'isole', subgoal: 'cn' },
        { kind: 'eq', math: String(c1), note: 'u₁ par Crank-Nicolson', subgoal: 'cn' },
      ],
      hints: [], noHints: true, subgoals: SUB, key: `${RK}:4then:${d.f}:${h}:${d.u0}`,
    });
  }
  return iterTable({
    skill: RK, level, key: `${level}:${d.f}:${d.h}:${d.u0}`, n, cols: HEUN_COLS,
    prompt: `${problemText(d)}. Méthode de Heun : k₁ = f(tₙ, uₙ), k₂ = f(tₙ₊₁, uₙ + h·k₁), uₙ₊₁ = uₙ + (h/2)(k₁ + k₂). ${level === 1 ? 'Remplis k₁ et k₂ (u₁ est donné).' : 'Remplis k₁, k₂ et uₙ.'}`,
    phi, then,
    given: (k, id) => k === 0 || id === 't' || (level === 1 && id === 'u'),
    hints: H('Heun : un pas d\'Euler pour prédire, puis la moyenne des deux pentes.',
      `k₂ = f(${nice(d.h)} ; ${d.u0} + ${nice(d.h)}·□)`,
      `k₁ = ${nice(rows[1].k1)}, k₂ = ${nice(rows[1].k2)}, u₁ = ${nice(rows[1].u)}.`),
    subgoals: SUB, baits: ['n_heun_k2'], fallback: d.fallback,
  });
}

// ---------- L3: recognise a scheme ----------

const NAMES = { EP: 'Euler progressif', ER: 'Euler rétrograde', CN: 'Crank-Nicolson', Heun: 'Heun', none: 'Aucun de ces schémas' };
const GENERIC = {
  EP: 'uₙ₊₁ = uₙ + h·f(tₙ, uₙ)',
  ER: 'uₙ₊₁ = uₙ + h·f(tₙ₊₁, uₙ₊₁)',
  CN: 'uₙ₊₁ = uₙ + (h/2)·(f(tₙ, uₙ) + f(tₙ₊₁, uₙ₊₁))',
  Heun: 'uₙ₊₁ = uₙ + (h/2)·(f(tₙ, uₙ) + f(tₙ₊₁, uₙ + h·f(tₙ, uₙ)))',
  none: 'uₙ₊₁ = uₙ + (h/2)·(f(tₙ, uₙ) + f(tₙ₊₁, uₙ))',
};
// GM 2012: f(t, u) = −u + sin(tu), written out (Δt = h, tₙ = nh).
const GM = {
  EP: 'uₙ₊₁ = uₙ + Δt·(−uₙ + sin(nΔt·uₙ))',
  ER: 'uₙ₊₁ = uₙ + Δt·(−uₙ₊₁ + sin((n + 1)Δt·uₙ₊₁))',
  CN: 'uₙ₊₁ = uₙ + (Δt/2)·(−uₙ − uₙ₊₁ + sin(nΔt·uₙ) + sin((n + 1)Δt·uₙ₊₁))',
  none: 'uₙ₊₁ = uₙ + (Δt/2)·(−2uₙ + sin(nΔt·uₙ) + sin((n + 1)Δt·uₙ))',
};
const WHY = {
  EP: 'la pente au début du pas seulement : explicite, ordre 1',
  ER: 'la pente au nouveau point (tₙ₊₁, uₙ₊₁) : implicite, ordre 1',
  CN: 'la moyenne des pentes aux deux bouts, uₙ₊₁ dans les deux membres : implicite, ordre 2',
  Heun: 'la moyenne de la pente au début et de la pente au point prédit par Euler : explicite, ordre 2',
  none: 'le second terme évalue f en (tₙ₊₁, uₙ) : ce n\'est ni Crank-Nicolson (il faudrait uₙ₊₁) ni Heun (il faudrait uₙ + h·f(tₙ, uₙ))',
};

function recognise(rng, level, opts = {}, forceGM = false) {
  const gm = forceGM || rng.chance(0.5);
  const pool = gm ? ['EP', 'ER', 'CN', 'none'] : ['EP', 'ER', 'CN', 'Heun', 'none'];
  const s = forceGM ? 'CN' : rng.pick(pool);
  const formula = gm ? GM[s] : GENERIC[s];
  const others = rng.shuffle(Object.keys(NAMES).filter((k) => k !== s));
  const wrongs = others.map((k) => ({ html: NAMES[k], rule: s === 'none' && k === 'CN' ? 'n_cn_explicit' : null }));
  // The trap first, then the others.
  wrongs.sort((a, b) => (b.rule ? 1 : 0) - (a.rule ? 1 : 0));
  return mcqDistinct({
    skill: RK, level, key: `${RK}:rec:${gm ? 'gm' : 'f'}:${s}`, exam: opts.exam ? examTag(opts) : false,
    prompt: `${gm ? 'Pour u′ = −u + sin(tu), tₙ = nΔt, on considère' : 'Pour u′ = f(t, u), on considère'} le schéma<br><b>${formula}</b><br>De quel schéma s'agit-il ?`,
    right: NAMES[s], wrongs: wrongs.slice(0, 3),
    solution: [{ html: `${NAMES[s]} : ${WHY[s]}.`, note: '' }],
  }, rng);
}

// ---------- L5: the program ----------

export const HEUN = refCode(`def heun(f, t0, u0, T, N):
    h = (T - t0) / N
    t = t0
    u = u0
    for n in range(N):
        k1 = f(t, u)
        k2 = «f(t + h, u + h * k1)»
        u = «u + h / 2 * (k1 + k2)»
        t = t + h
    return u
`);
const TRAPS = { 0: [{ text: 'f(t + h, u + k1)', rule: 'n_heun_k2' }] };
const FILLERS = { 0: ['f(t, u + h * k1)', 'f(t + h, u)'], 1: ['u + h * (k1 + k2)', 'u + h * k2', 'u + (k1 + k2) / 2'] };
const TESTS = [
  { setup: 'def f(t, u): return -2*u', expr: 'heun(f, 0, 1.0, 0.1, 1)', expect: '0.82', tol: 1e-12 },
  { setup: 'def f(t, u): return t', expr: 'heun(f, 0, 0.0, 1, 1)', expect: '0.5', tol: 1e-12 },
  { setup: 'def f(t, u): return 2/15*u*(1 - u/1000)', expr: 'heun(f, 0, 100.0, 100, 20)', expect: '999.9533941083979', tol: 1e-9 },
];

function level5(rng) {
  return codeItem({
    skill: RK, level: 5, ref: HEUN, blanks: [0, 1], traps: TRAPS, wrong: { 1: 'u + h * (k1 + k2)' }, rng,
    prompt: 'Complète la méthode de Heun : une prédiction par Euler, puis la moyenne des deux pentes.',
    tests: TESTS, then: sqrtReadtable(rng, 5, { heun: true }),
    hints: [], subgoals: SUB, key: '5',
  });
}

// ---------- exam ----------

function examMcq(rng, opts) {
  if (rng.chance(0.5)) return recognise(rng, 4, opts, true);
  const d = odeData(rng, { schemes: ['Heun', 'EP', 'CN'], steps: 1, gs: [0] });
  const h = d.h;
  const k1 = d.rows.Heun[1].k1;
  const bad = d.u0 + (h.valueOf() / 2) * (k1.valueOf() + d.lam * (d.u0 + k1.valueOf()));
  return mcqDistinct({
    skill: RK, level: 4, key: `${RK}:mcq:${d.lam}:${h}:${d.u0}`, exam: examTag(opts),
    prompt: `u′ = ${fShow(d.lam, 0)}, u(0) = ${d.u0}, h = ${nice(h)}. Un pas de la méthode de Heun donne u₁ =`,
    right: nice(d.rows.Heun[1].u),
    wrongs: [
      { html: String(Number(bad.toPrecision(10))).replace('.', ',').replace('-', '−'), rule: 'n_heun_k2' },
      { html: nice(d.rows.EP[1].u) },
      { html: nice(d.rows.CN[1].u), rule: null },
    ],
    fillers: [{ html: nice(d.rows.Heun[1].u.add(h)) }],
    solution: [{ html: `k₁ = ${nice(k1)}, k₂ = f(t₁, u₀ + h·k₁) = ${nice(d.rows.Heun[1].k2)}, u₁ = u₀ + (h/2)(k₁ + k₂) = ${nice(d.rows.Heun[1].u)}.`, note: '' }],
  }, rng);
}

export const GEN = {
  [RK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return examMcq(rng, opts);
    switch (level) {
      case 1: return heunTable(rng, 1);
      case 2: return heunTable(rng, 2);
      case 3: return recognise(rng, 3);
      case 4: return heunTable(rng, 4);
      default: return level5(rng);
    }
  },
};

export { R };
