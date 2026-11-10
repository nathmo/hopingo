// f-laplace-eq (module F, part d, step U10): Laplace's equation Δu = 0 in
// the unit disk (u = a₀/2 + Σ rⁿ(aₙ cos nθ + bₙ sin nθ), the coefficients
// read on u(1, θ), then back to x, y) and in the half-plane x > 0 (Fourier
// in y: û_xx = α²û, the bounded solution û = ĝ(α)e^(−|α|x), ĝ by the table
// line F6, u by F6 again with w = x + w₀; GC 2022). Lines are named values
// judged by `prob` with variables, and ĝ by the `transform` judge
// (fourier-d-kit.js); the trap f_half_plane_abs (e^(|α|x) kept) is a wrong
// text in cfg.traps and a decision (rules/fd.js).

import { q, qt, term, sumT, rd, fdItem, fdProblem, H, MT, KEYS_POLAR, KEYS_FT } from './fourier-d-kit.js';
import { examTag } from './kit.js';
import { fourierTableHtml } from './fourier-tables.js';

const SK = 'f-laplace-eq';
const SUB = {
  form: { id: 'form', label: 'forme de la solution', skill: SK },
  coefficients: { id: 'coefficients', label: 'coefficients sur le bord', skill: SK },
  assemble: { id: 'assemble', label: 'assembler u', skill: SK },
};

// ---------- the disk ----------

// rⁿcos(nθ) and rⁿsin(nθ) in x, y (n ≤ 3), as monomials [coefficient, x^i y^j].
const CART = {
  cos: { 1: [[1, 'x']], 2: [[1, 'x^2'], [-1, 'y^2']], 3: [[1, 'x^3'], [-3, 'xy^2']] },
  sin: { 1: [[1, 'y']], 2: [[2, 'xy']], 3: [[3, 'x^2y'], [-1, 'y^3']] },
};
const MONO_ORDER = ['x^3', 'x^2y', 'xy^2', 'y^3', 'x^2', 'xy', 'y^2', 'x', 'y'];
// m + Σ c·(rⁿ trig(nθ)) in x, y, expanded and collected.
function cartesian(m, terms) {
  const acc = new Map();
  for (const t of terms) for (const [k, mono] of CART[t.fn][t.n]) acc.set(mono, (acc.get(mono) ?? q(0)).add(q(t.c).mul(q(k))));
  return sumT([...MONO_ORDER.filter((x) => acc.has(x)).map((x) => term(acc.get(x), x)), m ? String(m) : '']);
}
const COEF = [1, 2, 3, -1, -2, 4, q(1, 2)];
const trig = (fn, n, v = 'θ') => `${fn}(${n === 1 ? '' : n}${v})`;
const rpow = (n) => (n === 1 ? 'r' : `r^${n}`);

// u(1, θ) = m + a cos(pθ) + b sin(qθ) (one of a, b may be 0), or the cube
// sin³θ, cos³θ (level 5: linearise first).
function diskData(rng, o = {}) {
  if (o.cube) {
    const fn = rng.pick(['sin', 'cos']);
    const m = rng.pick([0, 0, 1, 2]);
    // sin³θ = (3 sin θ − sin 3θ)/4 ; cos³θ = (3 cos θ + cos 3θ)/4.
    const c1 = q(3, 4);
    const c3 = fn === 'sin' ? q(-1, 4) : q(1, 4);
    const terms = [{ fn, n: 1, c: c1 }, { fn, n: 3, c: c3 }];
    return build(m, terms, { g: sumT([m ? String(m) : '', `${fn}(θ)^3`]), cube: fn });
  }
  const m = rng.pick([0, 1, 2, 3, -1]);
  const p = rng.int(1, 3);
  const qq = rng.int(1, 3);
  const a = rng.pick(COEF);
  const b = rng.chance(0.6) ? rng.pick(COEF) : 0;
  const terms = [{ fn: 'cos', n: p, c: q(a) }, ...(b ? [{ fn: 'sin', n: qq, c: q(b) }] : [])];
  return build(m, terms, {});
}

function build(m, terms, extra) {
  const g = extra.g ?? sumT([m ? String(m) : '', ...terms.map((t) => term(t.c, trig(t.fn, t.n)))]);
  const uPolar = sumT([m ? String(m) : '', ...terms.map((t) => term(t.c, `${rpow(t.n)}${trig(t.fn, t.n)}`))]);
  const uCart = cartesian(m, terms);
  const uNeg = sumT([m ? String(m) : '', ...terms.map((t) => term(t.c, `r^(-${t.n})${trig(t.fn, t.n)}`))]);
  const uNoR = sumT([m ? String(m) : '', ...terms.map((t) => term(t.c, trig(t.fn, t.n)))]);
  return {
    m, terms, g, uPolar, uCart, uNeg, uNoR, ...extra,
    id: `disk:${g}`,
    spec: { kind: 'disk', g: g.replace(/\^3/, '^3'), vars: ['x', 'y'] },
  };
}

const formDecision = () => ({
  prompt: 'Quelle partie radiale pour le mode n ?', levels: [2, 3], options: [
    { id: 'rn', label: 'rⁿ : bornée au centre du disque', valid: true },
    { id: 'r-n', label: 'r⁻ⁿ', valid: false, why: 'r⁻ⁿ explose en r = 0, qui est dans le disque : on garde rⁿ.' },
    { id: 'en', label: 'eⁿʳ', valid: false, why: 'En polaires, Δ(R(r)cos nθ) = 0 donne r²R″ + rR′ − n²R = 0 : R = rⁿ ou r⁻ⁿ.' },
  ],
});

function diskParts(d, level) {
  const parts = [{
    label: 'R_n', shown: 'Rₙ(r)', labels: ['R_n(r)'], name: 'R', vars: ['r', 'n'], domain: { r: [0.1, 1], n: { int: [1, 10] } }, expect: 'r^n',
    title: 'Les modes Rₙ(r)cos(nθ), Rₙ(r)sin(nθ) : la partie radiale', action: 'Choisir la partie radiale des modes',
    decisions: [formDecision()],
    wrongActions: [{ label: 'Prendre r⁻ⁿ', why: 'r⁻ⁿ explose au centre du disque.' }],
    lines: [{ math: 'r^n', subgoal: 'form', blank: ['n'] }],
  }];
  if (d.cube) {
    const c3 = d.terms[1].c;
    const fn = d.cube;
    const L = fn === 'sin' ? 'b' : 'a';
    parts.push({
      label: `${L}_1`, shown: `${L}₁`, name: `${L}1`, vars: [], expect: '3/4',
      title: `Linéariser : ${fn}³θ = ${L}₁ ${fn} θ + ${L}₃ ${fn} 3θ`, action: 'Linéariser le bord',
      notes: [fn === 'sin' ? 'sin 3θ = 3 sin θ − 4 sin³θ.' : 'cos 3θ = 4 cos³θ − 3 cos θ.'],
      wrongActions: [{ label: `Prendre ${L}₃ = 1 (le cube comme un mode)`, why: `${fn}³θ n'est pas ${fn} 3θ : il faut la formule du triple de l'angle.` }],
      lines: [{ math: '3/4', subgoal: 'coefficients', blank: ['3/4'] }],
    }, {
      label: `${L}_3`, shown: `${L}₃`, name: `${L}3`, vars: [], expect: qt(c3),
      title: `Le coefficient ${L}₃`, action: 'Lire le coefficient du mode 3',
      lines: [{ math: qt(c3), subgoal: 'coefficients', blank: [qt(c3)] }],
    });
  }
  parts.push({
    label: 'u', shown: 'u(r, θ)', labels: ['u(r,θ)', 'u(r;θ)'], name: 'u', vars: ['r', 'θ'], domain: { r: [0.1, 1], 'θ': [0, 6.28] }, expect: d.uPolar,
    title: 'u(r, θ) : les coefficients se lisent sur u(1, θ)', action: 'Lire les coefficients sur le bord et écrire u(r, θ)',
    wrongActions: [{ label: 'Recopier u(1, θ) sans les rⁿ', why: 'Chaque mode n porte le facteur rⁿ : seul le terme constant n\'en a pas.' }],
    lines: [{ math: d.uPolar, subgoal: d.cube ? 'assemble' : 'coefficients', blank: [rpow(d.terms[d.terms.length - 1].n)], blank2: d.terms.map((t) => rpow(t.n)) }],
  });
  if (level >= 3 || d.cube) {
    parts.push({
      label: 'u', shown: 'u(x, y)', labels: ['u(x,y)', 'u(x;y)'], name: 'uxy', vars: ['x', 'y'], domain: { x: [-0.7, 0.7], y: [-0.7, 0.7] }, expect: d.uCart,
      title: 'u en x et y (x = r cos θ, y = r sin θ)', action: 'Revenir en x, y',
      wrongActions: [{ label: 'Remplacer r par x et θ par y', why: 'x = r cos θ et y = r sin θ : r²cos 2θ = x² − y², r sin θ = y…' }],
      lines: [{ math: d.uCart, subgoal: 'assemble' }],
    });
  }
  return parts;
}

const diskPrompt = (d) => `Résous Δu = 0 dans le disque unité, avec <i>u</i>(1, θ) = ${MT(d.g, { vars: ['θ'] })} (coordonnées polaires).`;

function diskItem(level, rng, opts, o = {}) {
  const d = diskData(rng, o);
  return fdItem({
    skill: SK, level, key: `${level}:${d.id}`, prompt: diskPrompt(d), parts: diskParts(d, level), exam: opts.exam ? examTag(opts) : false,
    hints: H('u = a₀/2 + Σ rⁿ(aₙ cos nθ + bₙ sin nθ) : le bord u(1, θ) se lit comme une série de Fourier en θ.',
      `Sur le bord : ${[d.m ? `a₀/2 = ${rd(String(d.m))}` : null, ...d.terms.map((t) => `${t.fn === 'cos' ? 'a' : 'b'}${'₀₁₂₃'[t.n]} = ${rd(qt(t.c))}`)].filter(Boolean).join(', ')}${d.cube ? ' (après linéarisation)' : ''} ; le mode n porte le facteur rⁿ.`,
      `u(r, θ) = ${MT(d.uPolar, { vars: ['r', 'θ'] })}`),
    subgoals: [SUB.form, SUB.coefficients, SUB.assemble], keys: KEYS_POLAR,
    pde: { spec: { kind: 'disk', g: d.g, vars: ['r', 'θ'] }, u: d.uPolar },
    noHints: level >= 5 || undefined,
  });
}

// ---------- the half-plane x > 0 ----------

function halfData(rng) {
  const w = rng.pick([1, 2, 2, 3]);
  const A = rng.chance(0.5) ? w : rng.pick([1, 2, 4].filter((x) => x !== w));
  const k = q(A, w);
  const g = `${A}/(y^2+${w * w})`;
  const kT = k.eq(1) ? '' : k.d === 1 ? `${k.n}` : `(${qt(k)})`;
  const ghat = `${kT}√(π/2)e^(-${w === 1 ? '' : w}|α|)`;
  const uhat = `${kT}√(π/2)e^(-(x+${w})|α|)`;
  const u = `${kT}(x+${w})/(y^2+(x+${w})^2)`;
  return {
    w, A, k, g, ghat, uhat, u,
    wrong: { uhat: [`${kT}√(π/2)e^(-${w === 1 ? '' : w}|α|)e^(|α|x)`] },
    id: `half:${A}:${w}`,
    spec: { kind: 'half', g },
  };
}

function halfParts(d) {
  return [
    {
      label: 'û_xx', shown: 'ûₓₓ', labels: ['û_xx(x,α)'], name: 'ode', vars: ['α', 'û'], domain: { 'α': [-3, 3], 'û': [-2, 2] }, expect: 'α^2û',
      title: 'La transformée de Fourier en y de Δu = 0', action: 'Transformer l\'équation en y',
      decisions: [{ prompt: 'ℱ_y(u_yy) = ?', levels: [2, 3], options: [
        { id: 'ok', label: '(iα)²û = −α²û', valid: true },
        { id: 'sign', label: 'α²û', valid: false, rule: 'f_ft_deriv_sign', why: 'ℱ(f″) = (iα)²f̂ = −α²f̂ : i² = −1.' },
      ] }],
      lines: [{ math: 'α^2û', subgoal: 'form', blank: ['α^2'] }],
    },
    {
      judge: { kind: 'transform', transform: 'fourier', v: 'y', s: 'α', f: d.g, F: d.ghat, dir: 'forward' }, start: d.g,
      title: `Le bord : ĝ(α) = ℱ(u(0, ·))(α), par la ligne F6 (w = ${d.w})`, action: 'Transformer le bord avec la table',
      lines: [{ math: d.ghat, subgoal: 'coefficients' }],
    },
    {
      label: 'û', shown: 'û(x, α)', labels: ['û(x,α)', 'û(x;α)'], name: 'uhat', vars: ['x', 'α'], domain: { x: [0, 3], 'α': [-3, 3] }, expect: d.uhat,
      title: 'û(x, α) = A(α)e^(|α|x) + B(α)e^(−|α|x), bornée quand x → ∞', action: 'Garder la solution bornée',
      traps: { f_half_plane_abs: d.wrong.uhat },
      decisions: [{ prompt: 'Quelle solution garder ?', options: [
        { id: 'bounded', label: 'B(α)e^(−|α|x) seule : elle reste bornée quand x → ∞', valid: true },
        { id: 'both', label: 'Les deux termes, A(α)e^(|α|x) + B(α)e^(−|α|x)', valid: false, rule: 'f_half_plane_abs', why: 'e^(|α|x) explose quand x → ∞ : il faut A = 0.' },
        { id: 'alpha', label: 'B(α)e^(−αx)', valid: false, why: 'Pour α < 0, e^(−αx) explose : c\'est |α| qu\'il faut.' },
      ] }],
      wrongActions: [{ label: 'Garder A(α)e^(|α|x) + B(α)e^(−|α|x)', rule: 'f_half_plane_abs', why: 'e^(|α|x) explose quand x → ∞ : il faut A = 0.' }],
      lines: [{ math: d.uhat, subgoal: 'form', blank: [`x+${d.w}`] }],
    },
    {
      label: 'u', shown: 'u(x, y)', labels: ['u(x,y)', 'u(x;y)'], name: 'u', vars: ['x', 'y'], domain: { x: [0, 3], y: [-3, 3] }, expect: d.u,
      title: `Retour en y : la ligne F6 avec w = x + ${d.w}`, action: 'Inverser avec la table (F6, w = x + …)',
      lines: [{ math: d.u, subgoal: 'assemble', blank: [`x+${d.w}`] }],
    },
  ];
}

const halfPrompt = (d) => `Trouve la solution bornée de Δu = 0 dans le demi-plan x > 0, avec <i>u</i>(0, <i>y</i>) = ${MT(d.g, { vars: ['y'] })}, par la transformée de Fourier en y. ${fourierTableHtml()}`;

function halfItem(level, rng, opts) {
  const d = halfData(rng);
  return fdItem({
    skill: SK, level, key: `${level}:${d.id}`, prompt: halfPrompt(d), parts: halfParts(d), exam: opts.exam ? examTag(opts) : false,
    hints: H('Transforme en y : û_xx − α²û = 0. Garde la solution bornée e^(−|α|x), et lis ĝ dans la table (F6).',
      `ĝ(α) = ${MT(d.ghat, { vars: ['α'] })}, donc û(x, α) = ĝ(α)e<sup>−|α|x</sup>.`,
      `û(x, α) = ${MT(d.uhat, { vars: ['x', 'α'] })} : c'est F6 avec w = x + ${d.w}.`),
    subgoals: [SUB.form, SUB.coefficients, SUB.assemble], keys: KEYS_FT,
    pde: { spec: d.spec, u: d.u },
    noHints: level >= 5 || undefined,
  });
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'open') {
      const d = halfData(rng);
      return fdProblem({ skill: SK, level: 4, key: `${SK}:open:${d.id}`, prompt: halfPrompt(d), parts: halfParts(d), exam: { format: 'open', points: 4 }, keys: KEYS_FT, subgoals: Object.values(SUB), pde: { spec: d.spec, u: d.u } }, [1, 1, 1, 1]);
    }
    if (level === 5) return diskItem(5, rng, opts, { cube: true });
    if (level === 1 || level === 2) return rng.chance(0.65) ? diskItem(level, rng, opts) : halfItem(level, rng, opts);
    if (level === 3) return rng.chance(0.4) ? diskItem(3, rng, opts) : halfItem(3, rng, opts);
    return rng.chance(0.5) ? diskItem(4, rng, opts) : halfItem(4, rng, opts);
  },
};
