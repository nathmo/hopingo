// f-heat-sep and f-heat-source (module F, part d, step U10): the heat
// equation on ]0 ; L[ by separation of variables, with Dirichlet or Neumann
// conditions, a term −cu, a coefficient a(t), and a source term.
//
// Data are built from the answer: the modes (sin or cos of nπx/L), the rate
// λₙ = k(nπ/L)² + c of each mode (bₙ′ = −λₙbₙ), the coefficients of the
// initial condition (read when it is a sum of modes, a sine series
// otherwise), u = Σ bₙ(0) e^(−λₙt) Xₙ(x). Every line is a named value judged
// by `prob` with variables (fourier-d-kit.js); the traps f_heat_rate,
// f_neumann_sine, f_heat_bc_coef and f_heat_source_steady are wrong texts in
// the parts' cfg.traps (rules/fd.js).

import { q, qt, term, sumT, rd, piT, decay, argT, fdItem, fdProblem, mcqMulti, H, MT, KEYS } from './fourier-d-kit.js';
import { examTag } from './kit.js';

const SEP = 'f-heat-sep';
const SRC = 'f-heat-source';
const SUB = {
  modes: { id: 'modes', label: 'modes selon les conditions au bord', skill: SEP },
  ode: { id: 'ode', label: 'EDO de chaque coefficient', skill: 'a2-ode-linear1' },
  initial: { id: 'initial', label: 'série de la condition initiale', skill: 'f-sine-cosine' },
  assemble: { id: 'assemble', label: 'assembler u(x, t)', skill: SEP },
};
const SUB_SRC = {
  initial: { id: 'initial', label: 'série de la condition initiale', skill: 'f-sine-cosine' },
  source: { id: 'source', label: 'développer la source', skill: SRC },
  ode: { id: 'ode', label: 'EDO de chaque mode', skill: SRC },
  solve: { id: 'solve', label: 'résoudre les modes', skill: SRC },
  assemble: { id: 'assemble', label: 'assembler u(x, t)', skill: SEP },
};

// ---------- the interval ]0 ; L[ ----------

// L: 'pi', 1 or 2. Texts of the frequency nπ/L.
const LT = { pi: 'π', 1: '1', 2: '2' };
const Lnum = (L) => (L === 'pi' ? Math.PI : L);
// Argument of the mode n (n a number): 'x', '3x', 'πx', '3πx/2'.
const modeArg = (L, n) => (L === 'pi' ? argT(n) : argT(q(n, L), 'πx'));
// Argument of the mode n (n a letter).
const genArg = (L) => (L === 'pi' ? 'nx' : L === 1 ? 'nπx' : 'nπx/2');
const genArgR = (L) => (L === 'pi' ? 'nx' : L === 1 ? 'nπx' : 'nπx/2');
// k·(nπ/L)² + c, n a letter.
function rateGen(L, k, c) {
  let main;
  if (L === 'pi') main = term(k, 'n^2');
  else {
    const K = q(k, L * L);
    main = `${K.n === 1 ? '' : K.n}n^2π^2${K.d === 1 ? '' : `/${K.d}`}`;
  }
  return sumT([main, c ? qt(c) : '']);
}
// The same for a number n.
function rateOf(L, k, c, n) {
  if (L === 'pi') return qt(k * n * n + c);
  return sumT([piT(q(k * n * n, L * L), 2), c ? qt(c) : '']);
}
// Readable rate (for notes): '9π²/4 + 1'.
const rateR = (r) => rd(r).replace(/\^2/g, '²').replace(/\+/g, ' + ').replace(/(\d|π|²)−/g, '$1 − ');

// The PDE as HTML: u_t = k u_xx − c u (a(t) instead of k).
function pdeHtml(k, c, a, src) {
  const kk = a ? `(${rd(a.html)})` : k === 1 ? '' : `${k}`;
  return `<i>u</i><sub>t</sub> = ${kk}<i>u</i><sub>xx</sub>${c ? ` − ${c === 1 ? '' : c}<i>u</i>` : ''}${src ? ` + ${src}` : ''}`;
}
const bcHtml = (bc, L) => (bc === 'D'
  ? `<i>u</i>(0, <i>t</i>) = <i>u</i>(${LT[L]}, <i>t</i>) = 0`
  : `<i>u</i><sub>x</sub>(0, <i>t</i>) = <i>u</i><sub>x</sub>(${LT[L]}, <i>t</i>) = 0`);

// ---------- f-heat-sep: trigonometric initial conditions ----------

const COEFS = [1, 2, 3, -1, -2, -3, 4, q(1, 2), q(-1, 2)];

// The time coefficients a(t) of the 2019 exam: {text, html, A (∫₀ᵗ a)}.
const A_T = [
  { text: '2+sin(t)+3t^2', html: '2 + sin t + 3t²', A: '2t+1-cos(t)+t^3' },
  { text: '1+2t', html: '1 + 2t', A: 't+t^2' },
  { text: '1+t^2', html: '1 + t²', A: 't+t^3/3' },
  { text: '2+cos(t)', html: '2 + cos t', A: '2t+sin(t)' },
  { text: 'e^t', html: 'eᵗ', A: 'e^t-1' },
];

// {bc, L, k, c, a, modes: [{n, b}], m (constant term, Neumann), …texts}.
function trigData(rng, o = {}) {
  const bc = o.bc ?? rng.pick(['D', 'D', 'N']);
  const a = o.aT ? rng.pick(A_T) : null;
  const L = a ? 'pi' : bc === 'D' ? rng.pick(['pi', 'pi', 1, 2]) : rng.pick(['pi', 2]);
  const k = a ? 1 : L === 'pi' ? rng.pick([1, 1, 2]) : 1;
  const c = o.withC ? rng.pick([1, 2, 3]) : 0;
  const count = o.count ?? rng.pick([2, 2, 3]);
  const ns = [];
  while (ns.length < count) {
    const n = rng.int(1, 5);
    if (!ns.includes(n)) ns.push(n);
  }
  ns.sort((x, y) => x - y);
  const modes = ns.map((n) => ({ n, b: rng.pick(COEFS) }));
  const m = bc === 'N' ? rng.pick([0, 1, 2, 3, -1, -2, -3, -3]) : 0;
  const fn = bc === 'D' ? 'sin' : 'cos';
  const other = bc === 'D' ? 'cos' : 'sin';
  // Exponent of the mode n: λₙ t, or n²A(t).
  const expo = (n, cc = c, kk = k, LL = L, lin = false) => {
    if (a) return lin ? `e^(-${n === 1 ? '' : n}(${a.A}))` : `e^(-${n * n === 1 ? '' : n * n}(${a.A}))`;
    const r = lin ? sumT([LL === 'pi' ? qt(kk * n) : piT(q(kk * n, LL), 1), cc ? qt(cc) : '']) : rateOf(LL, kk, cc, n);
    return decay(r);
  };
  const constTerm = (cc = c) => (m ? term(m, cc ? decay(qt(cc)) : '') : '');
  const uOf = (opts = {}) => sumT([
    opts.noConst ? '' : constTerm(),
    ...modes.map(({ n, b }) => term(b, `${expo(n, c, opts.k ?? k, opts.L ?? L, opts.lin)}${opts.fn ?? fn}(${modeArg(L, n)})`)),
  ]);
  const ic = sumT([m ? qt(m) : '', ...modes.map(({ n, b }) => term(b, `${fn}(${modeArg(L, n)})`))]);
  const u = uOf();
  const wrongs = {
    rateLin: a ? uOf({ lin: true }) : uOf({ lin: true }),
    rateNoPi: L !== 'pi' ? uOf({ L: 'pi' }) : null,
    sine: bc === 'N' ? uOf({ fn: 'sin', noConst: true }) : null,
    cosine: bc === 'D' ? uOf({ fn: 'cos' }) : null,
  };
  return {
    bc, L, k, c, a, modes, m, fn, other, ic, u, wrongs,
    id: `${bc}:${L}:${k}:${c}:${a ? A_T.indexOf(a) : '-'}:${m}:${modes.map((x) => `${x.n}*${qt(x.b)}`).join(',')}`,
    nFrom: bc === 'N' ? 0 : 1,
    X: `${fn}(${genArg(L)})`,
    rate: a ? null : rateGen(L, k, c),
    spec: { kind: 'heat', k, c, a: a?.text, L: Lnum(L), bc, ic },
  };
}

function modeDecision(d) {
  const opts = d.bc === 'D'
    ? [
      { id: 'sin', label: `Des sinus ${MT(`sin(${genArgR(d.L)})`)}, n ≥ 1 : ils s'annulent en 0 et en ${LT[d.L]}`, valid: true },
      { id: 'cos', label: `Des cosinus ${MT(`cos(${genArgR(d.L)})`)}, n ≥ 0`, valid: false, why: 'cos 0 = 1 ≠ 0 : les cosinus ne vérifient pas u = 0 aux bords.' },
    ]
    : [
      { id: 'cos', label: `Des cosinus ${MT(`cos(${genArgR(d.L)})`)}, n ≥ 0 : leur dérivée s'annule en 0 et en ${LT[d.L]}`, valid: true },
      { id: 'sin', label: `Des sinus ${MT(`sin(${genArgR(d.L)})`)}, n ≥ 1`, valid: false, rule: 'f_neumann_sine', why: 'u_x = 0 aux bords : ce sont les cosinus qui vérifient cette condition (la dérivée de sin vaut ±nπ/L aux bords).' },
    ];
  return { prompt: 'Quels modes ?', options: opts };
}
const zeroDecision = () => ({
  prompt: 'Le mode n = 0 ?', levels: [3], options: [
    { id: 'keep', label: 'Il compte : X₀ = 1 vérifie u_x = 0, son coefficient est a₀/2', valid: true },
    { id: 'drop', label: 'Il n\'existe pas : on commence à n = 1', valid: false, why: 'cos(0·x) = 1 a une dérivée nulle : c\'est un mode de Neumann, porté par a₀/2.' },
  ],
});
const readDecision = (trig) => ({
  prompt: 'La condition initiale est-elle déjà une somme de modes ?', levels: [2, 3], options: trig
    ? [
      { id: 'read', label: 'Oui : on lit ses coefficients sur les modes', valid: true, ref: true },
      { id: 'int', label: 'Non : on calcule ses coefficients par des intégrales (2/L)∫₀ᴸ…', valid: true, quality: 'poor', why: 'Juste, mais inutile : les intégrales redonnent les coefficients qu\'on lit.' },
    ]
    : [
      { id: 'int', label: 'Non : on calcule bₙ(0) par la série en sinus', valid: true, ref: true },
      { id: 'read', label: 'Oui : u(x, 0) est déjà un mode', valid: false, why: 'u(x, 0) n\'est pas une somme finie de sinus : il faut sa série en sinus sur ]0 ; L[.' },
    ],
});

// The lines item of a trigonometric initial condition (levels 1 to 4).
function trigItem(level, rng, opts, o = {}) {
  const d = trigData(rng, o);
  // The coefficients: bₙ (sines) or aₙ (cosines, a₀/2 the constant term).
  const co = d.bc === 'N' ? 'a' : 'b';
  const nDom = { n: { int: [d.nFrom, 30] } };
  const xDom = { x: [0, Lnum(d.L)] };
  const parts = [];
  parts.push({
    label: 'X_n', shown: 'Xₙ(x)', labels: ['X_n(x)'], name: 'X', vars: ['x', 'n'], domain: { ...xDom, ...nDom }, expect: d.X,
    title: 'Les modes', action: 'Choisir les modes selon les conditions au bord',
    traps: d.bc === 'N' ? { f_neumann_sine: [`sin(${genArg(d.L)})`] } : undefined,
    decisions: [modeDecision(d), ...(d.bc === 'N' ? [zeroDecision()] : [])],
    wrongActions: d.bc === 'N' ? [{ label: 'Prendre les sinus, comme pour Dirichlet', rule: 'f_neumann_sine', why: 'u_x = 0 aux bords : ce sont les cosinus qui vérifient cette condition.' }] : [],
    lines: [{ math: d.X, subgoal: 'modes', blank: [genArg(d.L)], blank2: [d.X] }],
  });
  if (d.a) {
    parts.push({
      label: 'A(t)', shown: 'A(t)', name: 'A', vars: ['t'], domain: { t: [0, 1] }, expect: d.a.A,
      title: `Chaque coefficient vérifie bₙ′ = −n²a(t) bₙ, donc bₙ(t) = bₙ(0) e<sup>−n²A(t)</sup> avec A(t) = ∫₀ᵗ a(s) ds`,
      action: 'Résoudre l\'EDO de chaque coefficient',
      wrongActions: [{ label: 'Traiter a(t) comme une constante : e^(−n²a(t)t)', why: 'a dépend de t : la solution de b′ = −n²a(t)b est b(0)e^(−n²∫₀ᵗa).' }],
      lines: [{ math: d.a.A, subgoal: 'ode', blank: [d.a.A.split(/(?=[+-])/)[0]], blank2: [d.a.A] }],
    });
  } else {
    const lin = sumT([d.L === 'pi' ? term(d.k, 'n') : `${d.k === 1 ? '' : d.k}nπ${d.L === 1 ? '' : `/${d.L}`}`, d.c ? qt(d.c) : '']);
    const noPi = sumT([term(d.k, 'n^2'), d.c ? qt(d.c) : '']);
    const rateTraps = [lin, ...(d.L !== 'pi' ? [noPi] : [])].filter((t) => t !== d.rate);
    parts.push({
      label: 'λ_n', shown: 'λₙ', name: 'lambda', vars: ['n'], domain: nDom, expect: d.rate,
      title: `Chaque coefficient vérifie ${co}ₙ′ = −λₙ ${co}ₙ, donc ${co}ₙ(t) = ${co}ₙ(0) e<sup>−λₙt</sup>`,
      action: 'Résoudre l\'EDO de chaque coefficient',
      traps: { f_heat_rate: rateTraps },
      wrongActions: [{ label: 'Décroissance e^(−nt), linéaire en n', rule: 'f_heat_rate', why: 'u_xx dérive deux fois Xₙ : le mode n décroît comme e^(−k(nπ/L)²t).' }],
      lines: [{ math: d.rate, subgoal: 'ode', blank: [d.rate.split(/(?=[+])/)[0]], blank2: [d.rate] }],
    });
  }
  const uTraps = { f_heat_rate: [d.wrongs.rateLin, d.wrongs.rateNoPi].filter(Boolean) };
  if (d.wrongs.sine) uTraps.f_neumann_sine = [d.wrongs.sine];
  // Guided blanks of u: the rates of the modes (level 1: the last one).
  const rates = d.modes.map(({ n }) => (d.a ? null : rateOf(d.L, d.k, d.c, n))).filter(Boolean);
  parts.push({
    label: 'u', shown: 'u(x, t)', labels: ['u(x,t)', 'u(x;t)'], name: 'u', vars: ['x', 't'], domain: { ...xDom, t: [0, 0.5] }, expect: d.u,
    title: 'La solution', action: 'Sommer les modes, avec les coefficients de u(x, 0)',
    traps: uTraps,
    decisions: [readDecision(true)],
    wrongActions: [{ label: 'Garder u(x, 0) sans facteur en t', why: 'Chaque mode décroît avec son propre taux : u dépend de t.' }],
    lines: [{ math: d.u, subgoal: 'assemble', blank: rates.length ? [rates[rates.length - 1]] : [d.modes[0].n === 1 ? 'x' : String(d.modes[0].n)], blank2: rates.length > 1 ? rates : undefined }],
  });
  const prompt = `Résous ${pdeHtml(d.k, d.c, d.a)} sur ]0 ; ${LT[d.L]}[, avec ${bcHtml(d.bc, d.L)} et <i>u</i>(<i>x</i>, 0) = ${MT(d.ic)}.`;
  const hint2 = d.a ? `bₙ(t) = bₙ(0) e<sup>−n²A(t)</sup>, avec A(t) = ∫₀ᵗ (${rd(d.a.html)}) ds.` : `${co}ₙ(t) = ${co}ₙ(0) e<sup>−λₙt</sup> avec λₙ = ${rateR(d.rate)}.`;
  return fdItem({
    skill: SEP, level, key: `${level}:${d.id}`, prompt, parts, exam: opts.exam ? examTag(opts) : false,
    hints: H(d.bc === 'D' ? 'Dirichlet : des sinus sin(nπx/L), n ≥ 1. Chaque coefficient vérifie une EDO linéaire en t ; la condition initiale donne bₙ(0).' : 'Neumann : des cosinus cos(nπx/L), n = 0 compris (le terme constant a₀/2). Chaque coefficient vérifie une EDO linéaire en t ; la condition initiale donne aₙ(0).',
      hint2, `u(x, t) = ${MT(d.u)}`),
    subgoals: [SUB.modes, SUB.ode, SUB.assemble], keys: KEYS,
    pde: { spec: d.spec, u: d.u },
    noHints: level >= 5 || undefined,
  });
}

// ---------- f-heat-sep: initial condition to develop (level 5, open) ----------

// u(x, 0) = f on ]0 ; π[ (or 1 on ]0 ; 1[), Dirichlet: the sine series of f.
const POLY = [
  { f: '1', L: 'pi', bn: '2(1-(-1)^n)/(nπ)', I: '(1-(-1)^n)/n', integrand: 'sin(nx)' },
  { f: 'x(π-x)', L: 'pi', bn: '4(1-(-1)^n)/(πn^3)', I: '2(1-(-1)^n)/n^3', integrand: 'x(π-x)sin(nx)' },
  { f: 'x', L: 'pi', bn: '2(-1)^(n+1)/n', I: 'π(-1)^(n+1)/n', integrand: 'x sin(nx)' },
  { f: 'π-x', L: 'pi', bn: '2/n', I: 'π/n', integrand: '(π-x)sin(nx)' },
  { f: '1', L: 1, bn: '2(1-(-1)^n)/(nπ)', I: '(1-(-1)^n)/(nπ)', integrand: 'sin(nπx)' },
];
const IC_PI = [POLY[0], POLY[1]];
const IC_1 = [POLY[4], { f: 'x(1-x)', L: 1, bn: '4(1-(-1)^n)/(π^3n^3)', I: '2(1-(-1)^n)/(π^3n^3)', integrand: 'x(1-x)sin(nπx)' }];

// The sine series of u(x, 0): the integral Iₙ = ∫₀ᴸ u(x, 0) sin(nπx/L) dx
// (judge equiv, from the integral to a closed form), then bₙ(0) = (2/L)Iₙ.
function seriesParts(P, L) {
  const nDom = { n: { int: [1, 40] } };
  const first = P.I.split(/[/(]/)[0] || P.I.split('/')[0];
  return [
    {
      judge: { kind: 'equiv', vars: ['n'], domain: nDom, target: 'no-int' }, start: `int(${P.integrand}, x, 0, ${L === 'pi' ? 'π' : 1})`,
      title: `La série en sinus de u(x, 0) : d'abord Iₙ = ∫₀${L === 'pi' ? '^π' : '¹'} u(x, 0) ${L === 'pi' ? 'sin(nx)' : 'sin(nπx)'} dx`,
      action: 'Calculer l\'intégrale de la série en sinus',
      lines: [{ math: P.I, subgoal: 'initial', blank: [first || P.I] }],
    },
    {
      label: 'b_n(0)', shown: 'bₙ(0)', labels: ['b_n'], name: 'b0', vars: ['n'], domain: nDom, expect: P.bn,
      title: 'Le coefficient bₙ(0) de la série en sinus', action: 'Mettre le facteur de la série en sinus',
      traps: { f_heat_bc_coef: [`(1/2)(${P.bn})`] },
      wrongActions: [{ label: 'bₙ(0) = (1/L)Iₙ', rule: 'f_heat_bc_coef', why: 'Sur ]0 ; L[, le prolongement impair double l\'intégrale : bₙ(0) = (2/L)Iₙ.' }],
      lines: [{ math: P.bn, subgoal: 'initial', blank: [P.bn.split('/')[0]] }],
    },
  ];
}

function polyData(rng) {
  const P = rng.pick(POLY);
  const k = 1;
  const L = P.L;
  const rate = rateGen(L, k, 0);
  const ser = (bn, r) => `sum(${bn}${decay(r).replace(/t\)$/, 't)')}sin(${genArg(L)}), n, 1, ∞)`;
  const u = ser(`(${P.bn})`, rate);
  return {
    ...P, k, rate, u,
    half: `(${P.bn})/2`,
    uLin: ser(`(${P.bn})`, L === 'pi' ? 'n' : 'nπ'),
    uHalf: ser(`(1/2)(${P.bn})`, rate),
    id: `poly:${POLY.indexOf(P)}`,
    spec: { kind: 'heat', k, c: 0, L: Lnum(L), bc: 'D', ic: P.f },
  };
}

function polyParts(d) {
  const nDom = { n: { int: [1, 40] } };
  return [
    {
      label: 'X_n', shown: 'Xₙ(x)', labels: ['X_n(x)'], name: 'X', vars: ['x', 'n'], domain: { x: [0, Lnum(d.L)], ...nDom }, expect: `sin(${genArg(d.L)})`,
      title: 'Les modes', action: 'Choisir les modes selon les conditions au bord',
      decisions: [modeDecision({ bc: 'D', L: d.L })],
      lines: [{ math: `sin(${genArg(d.L)})`, subgoal: 'modes', blank: [genArg(d.L)] }],
    },
    ...seriesParts(d, d.L).map((p, i) => (i === 0 ? { ...p, decisions: [readDecision(false)] } : p)),
    {
      label: 'λ_n', shown: 'λₙ', name: 'lambda', vars: ['n'], domain: nDom, expect: d.rate,
      title: 'Chaque coefficient vérifie bₙ′ = −λₙ bₙ', action: 'Résoudre l\'EDO de chaque coefficient',
      traps: { f_heat_rate: [d.L === 'pi' ? 'n' : 'nπ'] },
      wrongActions: [{ label: 'Décroissance e^(−nt)', rule: 'f_heat_rate', why: 'Le mode n décroît comme e^(−(nπ/L)²t).' }],
      lines: [{ math: d.rate, subgoal: 'ode', blank: [d.rate] }],
    },
    {
      label: 'u', shown: 'u(x, t)', labels: ['u(x,t)', 'u(x;t)'], name: 'u', vars: ['x', 't'], domain: { x: [0, Lnum(d.L)], t: [0.05, 0.5] }, expect: d.u,
      title: 'La solution (une série)', action: 'Sommer les modes',
      traps: { f_heat_rate: [d.uLin], f_heat_bc_coef: [d.uHalf] },
      lines: [{ math: d.u, subgoal: 'assemble', blank: [d.rate] }],
    },
  ];
}

const polyPrompt = (d) => `Résous ${pdeHtml(1, 0)} sur ]0 ; ${LT[d.L]}[, avec ${bcHtml('D', d.L)} et <i>u</i>(<i>x</i>, 0) = ${MT(d.f)}. Écris u comme une série (sum(…, n, 1, ∞)).`;

function polyItem(level, rng, opts) {
  const d = polyData(rng);
  return fdItem({
    skill: SEP, level, key: `${level}:${d.id}`, prompt: polyPrompt(d), parts: polyParts(d), exam: opts.exam ? examTag(opts) : false,
    hints: H('Dirichlet : des sinus. u(x, 0) n\'est pas une somme de modes : calcule sa série en sinus, bₙ(0) = (2/L)∫₀ᴸ u(x, 0) sin(nπx/L) dx.', `bₙ(0) = ${MT(d.bn)}`, `u(x, t) = ${MT(d.u)}`),
    subgoals: [SUB.modes, SUB.initial, SUB.ode, SUB.assemble], keys: KEYS, pde: { spec: d.spec, u: d.u },
    noHints: level >= 5 || undefined,
  });
}

// ---------- f-heat-sep: exam variants ----------

function sepMcq(rng, opts) {
  const d = trigData(rng, { bc: rng.pick(['D', 'N']), withC: false });
  const lim = d.bc === 'D' || !d.m ? '0' : qt(d.m);
  const limWrong = d.bc === 'D' ? (d.modes[0].b ? qt(d.modes[0].b) : '1') : d.m ? '0' : qt(d.modes[0].b);
  const rateN = d.L === 'pi' ? term(d.k, 'n^2') : rateGen(d.L, d.k, 0);
  const co = d.bc === 'N' ? 'a' : 'b';
  const wrongs = [
    { html: `u(x, t) = ${MT(d.wrongs.rateLin)}`, rule: 'f_heat_rate' },
    d.wrongs.sine && { html: `u(x, t) = ${MT(d.wrongs.sine)}`, rule: 'f_neumann_sine' },
    d.wrongs.cosine && { html: `u(x, t) = ${MT(d.wrongs.cosine)}` },
    d.wrongs.rateNoPi && { html: `u(x, t) = ${MT(d.wrongs.rateNoPi)}`, rule: 'f_heat_rate' },
    { html: `Pour tout x, u(x, t) → ${MT(limWrong)} quand t → ∞.` },
    { html: `Le coefficient du mode n vérifie ${co}ₙ′ = −${MT(d.L === 'pi' ? 'n' : 'nπ')}·${co}ₙ.`, rule: 'f_heat_rate' },
  ].filter(Boolean);
  const right = [`u(x, t) = ${MT(d.u)}`];
  if (rng.chance(0.6)) right.push(`Pour tout x, u(x, t) → ${MT(lim)} quand t → ∞.`);
  else right.push(`Le coefficient du mode n vérifie ${co}ₙ′ = −${MT(`(${rateN})`)}·${co}ₙ.`);
  return mcqMulti({
    skill: SEP, level: 4, key: `mcq:${d.id}`, exam: examTag(opts),
    prompt: `On résout ${pdeHtml(d.k, 0)} sur ]0 ; ${LT[d.L]}[, avec ${bcHtml(d.bc, d.L)} et <i>u</i>(<i>x</i>, 0) = ${MT(d.ic)}. Cochez les affirmations vraies.`,
    right, wrongs: rng.shuffle(wrongs), count: 5,
    solution: [{ html: `${d.bc === 'D' ? 'Dirichlet : des sinus' : 'Neumann : des cosinus, n = 0 compris'} ; chaque mode décroît comme e<sup>−k(nπ/L)²t</sup> : u(x, t) = ${MT(d.u)}.`, note: '' }],
    expectedSec: 240,
  }, rng);
}

function sepOpen(rng, opts) {
  const exam = { format: 'open', points: 6 };
  if (rng.chance(0.5)) {
    const d = polyData(rng);
    return fdProblem({ skill: SEP, key: `${SEP}:open:${d.id}`, prompt: polyPrompt(d), parts: polyParts(d), exam, keys: KEYS, subgoals: [SUB.modes, SUB.initial, SUB.ode, SUB.assemble], pde: { spec: d.spec, u: d.u }, level: 4 }, [1, 1, 1, 1, 2]);
  }
  const it = trigItem(4, rng, { exam: 'open' }, { bc: 'N', withC: true });
  return fdProblemFrom(it, [1.5, 2, 2.5], exam);
}

// A lines item as a problem (its segments are the steps).
function fdProblemFrom(it, points, exam) {
  return fdProblem({ skill: it.skill, key: `${it.key}:open`, prompt: it.prompt, item: it, exam, level: it.level }, points);
}

// ---------- f-heat-source ----------

// u_t − k u_xx = s·sin(ω_K x) on ]0 ; L[, Dirichlet, u(x, 0) = f.
function srcData(rng) {
  const L = rng.pick(['pi', 'pi', 'pi', 1]);
  const K = L === 'pi' ? rng.pick([1, 2, 2, 3]) : rng.pick([1, 2]);
  const s = rng.pick([1, 1, 2, 3]);
  const IC = rng.pick(L === 'pi' ? IC_PI : IC_1);
  const rate = rateGen(L, 1, 0);
  const rK = rateOf(L, 1, 0, K);
  // b_K(0): the formula at n = K.
  const odd = K % 2 === 1;
  const over = (num, den, pi) => (den === 1 ? `${num}/${pi}` : `${num}/(${den}${pi})`);
  const b0K = !odd ? '0' : IC.f === '1' ? over(4, K, 'π') : IC.f === 'x(π-x)' ? over(8, K ** 3, 'π') : over(8, K ** 3, 'π^3');
  const S = q(s, K * K);
  const steady = L === 'pi' ? qt(S) : over(S.n, S.d, 'π^2');
  const E = decay(rK);
  const bK = sumT([b0K === '0' ? '' : `(${b0K})${E}`, `(${steady})(1-${E})`]);
  const arg = (n) => (L === 'pi' ? argT(n) : argT(n, 'πx'));
  const series = `sum((${IC.bn})${decay(rate)}sin(${genArg(L)}), n, 1, ∞)`;
  const u = `${series}+(${steady})(1-${E})sin(${arg(K)})`;
  const steadyOnly = sumT([b0K === '0' ? '' : `(${b0K})${E}`, `${steady}`]);
  const wrongs = {
    steady: [steady, ...(b0K === '0' ? [] : [steadyOnly])],
    uSteady: `${series}+(${steady})sin(${arg(K)})`,
    uLin: `sum((${IC.bn})${decay(L === 'pi' ? 'n' : 'nπ')}sin(${genArg(L)}), n, 1, ∞)+(${steady})(1-${E})sin(${arg(K)})`,
  };
  return {
    L, K, s, IC, rate, rK, b0K, steady, bK, u, series, wrongs,
    src: term(s, `sin(${arg(K)})`),
    bnT: `(${IC.bn})${decay(rate)}`,
    id: `${L}:${K}:${s}:${IC.f}`,
    spec: { kind: 'heat', k: 1, c: 0, src: term(s, `sin(${arg(K)})`), L: Lnum(L), bc: 'D', ic: IC.f },
  };
}

// The parts of the whole problem (F4 of the catalogue), by name.
function srcParts(d) {
  const nDom = { n: { int: [1, 40] } };
  const L = d.L;
  return {
    integral: seriesParts(d.IC, L)[0],
    coef: seriesParts(d.IC, L)[1],
    source: {
      label: `β_${d.K}`, shown: `β${'₀₁₂₃₄₅'[d.K]}`, labels: [`β_${d.K}`], name: 'beta', vars: [], expect: String(d.s),
      title: `La source sur les modes : ${MT(d.src)} = Σ βₙ ${MT(`sin(${genArg(L)})`)}`, action: 'Développer la source sur les modes',
      notes: [`Seul le mode n = ${d.K} reçoit la source : les autres βₙ sont nuls.`],
      wrongActions: [{ label: 'Calculer βₙ pour tout n par une intégrale', why: 'Juste mais inutile : la source est déjà un mode.' }],
      lines: [{ math: String(d.s), subgoal: 'source', blank: [String(d.s)] }],
    },
    ode: {
      label: 'λ_n', shown: 'λₙ', name: 'lambda', vars: ['n'], domain: nDom, expect: d.rate,
      title: 'Chaque mode vérifie bₙ′ + λₙ bₙ = βₙ', action: 'Écrire l\'EDO de chaque mode',
      traps: { f_heat_rate: [L === 'pi' ? 'n' : 'nπ'] },
      wrongActions: [{ label: 'bₙ′ + n bₙ = βₙ', rule: 'f_heat_rate', why: 'u_xx dérive deux fois sin(nπx/L) : le facteur est (nπ/L)².' }],
      lines: [{ math: d.rate, subgoal: 'ode', blank: [d.rate] }],
    },
    free: {
      label: 'b_n(t)', shown: `bₙ(t), n ≠ ${d.K}`, labels: ['b_n(t)', 'b_n'], name: 'bn', vars: ['n', 't'], domain: { ...nDom, t: [0, 0.5] }, expect: d.bnT,
      title: `Les modes sans source (n ≠ ${d.K})`, action: 'Résoudre les modes sans source',
      traps: { f_heat_rate: [`(${d.IC.bn})${decay(L === 'pi' ? 'n' : 'nπ')}`] },
      lines: [{ math: d.bnT, subgoal: 'solve', blank: [decay(d.rate)] }],
    },
    forced: {
      label: `b_${d.K}(t)`, shown: `b${'₀₁₂₃₄₅'[d.K]}(t)`, labels: [`b_${d.K}`], name: 'bK', vars: ['t'], domain: { t: [0, 1] }, expect: d.bK,
      title: `Le mode n = ${d.K}, avec b${'₀₁₂₃₄₅'[d.K]}(0) = ${MT(d.b0K)}`, action: `Résoudre le mode n = ${d.K} (solution particulière + homogène)`,
      traps: { f_heat_source_steady: d.wrongs.steady },
      wrongActions: [{ label: `Prendre la solution stationnaire seule, b${'₀₁₂₃₄₅'[d.K]} = ${rd(d.steady)}`, rule: 'f_heat_source_steady', why: `b${'₀₁₂₃₄₅'[d.K]}(0) = ${rd(d.b0K)} : la partie stationnaire doit être corrigée par un terme en e^(−λt).` }],
      lines: [{ math: d.bK, subgoal: 'solve', blank: [d.steady], blank2: [d.steady, decay(d.rK)] }],
    },
    assemble: {
      label: 'u', shown: 'u(x, t)', labels: ['u(x,t)', 'u(x;t)'], name: 'u', vars: ['x', 't'], domain: { x: [0, Lnum(L)], t: [0.05, 0.5] }, expect: d.u,
      title: 'La solution', action: 'Assembler u(x, t)',
      traps: { f_heat_source_steady: [d.wrongs.uSteady], f_heat_rate: [d.wrongs.uLin] },
      lines: [{ math: d.u, subgoal: 'assemble', blank: [d.steady] }],
    },
  };
}

const srcPrompt = (d, whole = true) => `${whole ? 'Résous' : 'On résout'} <i>u</i><sub>t</sub> − <i>u</i><sub>xx</sub> = ${MT(d.src)} sur ]0 ; ${LT[d.L]}[, avec ${bcHtml('D', d.L)} et <i>u</i>(<i>x</i>, 0) = ${MT(d.IC.f)}, en développant u(x, t) = Σ bₙ(t) ${MT(`sin(${genArg(d.L)})`)}.${whole ? ' Écris u avec une série (sum(…, n, 1, ∞)).' : ''}`;
const srcHints = (d) => H(
  'Développe aussi la source sur les modes sin(nπx/L) : chaque coefficient vérifie bₙ′ + λₙbₙ = βₙ, une EDO linéaire d\'ordre 1.',
  `Le mode ${d.K} : b(t) = b(0)e<sup>−λt</sup> + (β/λ)(1 − e<sup>−λt</sup>), avec β = ${d.s}.`,
  `b${'₀₁₂₃₄₅'[d.K]}(t) = ${MT(d.bK)}`);
const srcSpec = (d) => ({ spec: d.spec, u: d.u });

function srcItem(level, rng, opts) {
  const d = srcData(rng);
  const P = srcParts(d);
  // Levels 1 to 3: separate parts (the forced mode, the initial series, then the chain without u).
  const ALL = ['integral', 'coef', 'source', 'ode', 'free', 'forced', 'assemble'];
  const pick = level === 1 ? ['source', 'ode', 'forced']
    : level === 2 ? ['ode', 'integral', 'coef', 'free']
      : level === 3 ? ['source', 'ode', 'integral', 'coef', 'forced']
        : ALL;
  const subs = [...new Set(pick.map((k) => ({ integral: 'initial', coef: 'initial', source: 'source', ode: 'ode', free: 'solve', forced: 'solve', assemble: 'assemble' })[k]))].map((k) => SUB_SRC[k]);
  const lead = level === 1 ? ` On a b${'₀₁₂₃₄₅'[d.K]}(0) = ${MT(d.b0K)}.` : '';
  const item = {
    skill: SRC, level, key: `${level}:${d.id}`, prompt: `${srcPrompt(d, level >= 4)}${level <= 3 ? ' Fais seulement les étapes demandées.' : ''}${lead}`,
    parts: pick.map((k) => P[k]), hints: srcHints(d), subgoals: subs, keys: KEYS, pde: pick.includes('assemble') ? srcSpec(d) : undefined,
  };
  if (level === 5 || opts.exam) {
    return fdProblem({ ...item, level: opts.exam ? 4 : 5, exam: opts.exam ? { format: 'open', points: 8 } : false, key: `${SRC}:F4:${d.id}`, parts: ALL.map((k) => P[k]), subgoals: Object.values(SUB_SRC), pde: srcSpec(d) }, [1, 1, 1, 1, 1.5, 1.5, 1]);
  }
  return fdItem(item);
}

// ---------- the generators ----------

export const GEN = {
  [SEP]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return sepMcq(rng, opts);
    if (opts.exam === 'open') return sepOpen(rng, opts);
    if (level === 5) return polyItem(5, rng, opts);
    if (level === 4) return trigItem(4, rng, opts, rng.chance(0.6) ? { bc: 'N', withC: true } : { bc: 'D', aT: true });
    if (level === 3) return trigItem(3, rng, opts, { withC: rng.chance(0.3) });
    return trigItem(level, rng, opts, { count: 2 });
  },
  [SRC]: (level, rng, profile, opts = {}) => srcItem(level, rng, opts),
};
export { fdProblemFrom };
