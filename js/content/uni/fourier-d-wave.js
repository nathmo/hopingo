// f-wave (module F, part d, step U10): the wave equation u_tt = c²u_xx.
// On ℝ, the Fourier transform in x gives û_tt + c²α²û = 0, so û =
// û₀(α) cos(cαt) when u_t(x, 0) = 0, and u = (u₀(x + ct) + u₀(x − ct))/2
// (FP8); the initial condition u₀ is a line of the table (F6, F7, F8, w = 1).
// On ]0 ; π[ with Dirichlet conditions, each mode sin(nx) is an oscillator
// bₙ″ + (cn)²bₙ = 0. Lines are named values judged by `prob` with variables
// (fourier-d-kit.js); the trap f_wave_factor (c² for c, ¼ for ½) is wrong
// texts in cfg.traps (rules/fd.js); f_ft_deriv_sign is a decision.

import { q, qt, term, sumT, rd, argT, fdItem, fdProblem, mcqMulti, mcqOne, H, MT, KEYS, KEYS_FT } from './fourier-d-kit.js';
import { examTag } from './kit.js';
import { fourierTableHtml } from './fourier-tables.js';

const SK = 'f-wave';
const SUB = {
  speed: { id: 'speed', label: 'lire c', skill: SK },
  transform: { id: 'transform', label: 'transformer l\'EDP', skill: SK },
  modes: { id: 'modes', label: 'modes et pulsations', skill: SK },
  solve: { id: 'solve', label: 'résoudre chaque oscillateur', skill: SK },
  assemble: { id: 'assemble', label: 'assembler u(x, t)', skill: SK },
};

const CS = [q(1, 2), q(1), q(2), q(3)];
// c·α·t, c·n·t… as a product text: 'αt/2', '2αt', 'αt'.
const prodT = (c, body) => argT(q(c), body);

// The initial conditions u₀ of the table (w = 1): text, its transform, the line.
const U0 = [
  { f: 'e^(-x^2)', F: '(1/√2)e^(-α^2/4)', line: 'F8', at: (y) => `e^(-(${y})^2)`, times: (k) => `(1/√2)e^(-α^2/4)${k}` },
  { f: '1/(1+x^2)', F: '√(π/2)e^(-|α|)', line: 'F6', at: (y) => `1/(1+(${y})^2)`, times: (k) => `√(π/2)e^(-|α|)${k}` },
  { f: 'e^(-|x|)', F: '√(2/π)/(1+α^2)', line: 'F7', at: (y) => `e^(-|${y}|)`, times: (k) => `√(2/π)${k}/(1+α^2)` },
];

// u_tt = c²u_xx as HTML: « u_tt − ¼u_xx = 0 » for c = ½ (2021), « u_tt = 4u_xx ».
function pdeHtml(c) {
  const c2 = q(c).mul(q(c));
  if (c2.d !== 1) return `<i>u</i><sub>tt</sub> − ${c2.n === 1 ? '' : c2.n}<sup>1</sup>⁄<sub>${c2.d}</sub> <i>u</i><sub>xx</sub> = 0`.replace('<sup>1</sup>⁄<sub>4</sub>', '¼');
  return `<i>u</i><sub>tt</sub> = ${c2.n === 1 ? '' : c2.n}<i>u</i><sub>xx</sub>`;
}

// ---------- on ℝ: Fourier in x ----------

function lineData(rng, o = {}) {
  const c = o.c ?? rng.pick(CS);
  const c2 = c.mul(c);
  const U = rng.pick(U0);
  const ct = prodT(c, 't');
  const cos = (k) => `cos(${prodT(k, 'αt')})`;
  const shift = (k) => [`x+${prodT(k, 't')}`, `x-${prodT(k, 't')}`];
  const [p, m] = shift(c);
  const u = `(${U.at(p)}+${U.at(m)})/2`;
  const uhat = U.times(cos(c));
  const ode = term(c2.neg(), 'α^2û');
  const same = c.eq(1);
  const [p2, m2] = shift(c2);
  return {
    c, c2, U, ct, u, uhat, ode,
    wrong: {
      c: same ? [] : [qt(c2)],
      ode: same ? [] : [term(c.neg(), 'α^2û'), '-α^2û'].filter((t) => t !== ode),
      uhat: same ? [] : [U.times(cos(c2))],
      u: [`(${U.at(p)}+${U.at(m)})/4`, ...(same ? [] : [`(${U.at(p2)}+${U.at(m2)})/2`])],
    },
    id: `R:${qt(c)}:${U.line}`,
    spec: { kind: 'wave', c: c.valueOf(), L: null, ic: U.f, ic1: '0' },
  };
}

function lineParts(d, o = {}) {
  return [
    {
      label: 'c', shown: 'c', name: 'c', vars: [], expect: qt(d.c), title: 'La vitesse c (u_tt = c²u_xx)', action: 'Lire c sur l\'équation',
      traps: d.wrong.c.length ? { f_wave_factor: d.wrong.c } : undefined,
      wrongActions: [{ label: `Prendre c = ${rd(qt(d.c2))}, le coefficient de u_xx`, rule: d.c.eq(1) ? undefined : 'f_wave_factor', why: 'Le coefficient devant u_xx est c², pas c.' }],
      lines: [{ math: qt(d.c), subgoal: 'speed', blank: [qt(d.c)] }],
    },
    {
      label: 'û_tt', shown: 'ûₜₜ', labels: ['û_tt(α,t)'], name: 'ode', vars: ['α', 'û'], domain: { 'α': [-3, 3], 'û': [-2, 2] }, expect: d.ode,
      title: 'La transformée de Fourier en x de l\'EDP (FP4)', action: 'Transformer l\'EDP en x',
      traps: d.wrong.ode.length ? { f_wave_factor: d.wrong.ode } : undefined,
      decisions: [{ prompt: 'ℱ(u_xx)(α, t) = ?', levels: [2, 3], options: [
        { id: 'ok', label: '(iα)²û = −α²û', valid: true },
        { id: 'sign', label: 'α²û', valid: false, rule: 'f_ft_deriv_sign', why: 'ℱ(f′) = iαf̂, donc ℱ(f″) = (iα)²f̂ = −α²f̂ : i² = −1.' },
        { id: 'one', label: 'iαû', valid: false, why: 'C\'est la transformée de la dérivée première ; u_xx dérive deux fois.' },
      ] }],
      lines: [{ math: d.ode, subgoal: 'transform', blank: [d.ode.replace(/û$/, '')] }],
    },
    {
      label: 'û', shown: 'û(α, t)', labels: ['û(α,t)', 'û(α;t)'], name: 'uhat', vars: ['α', 't'], domain: { 'α': [-3, 3], t: [0, 2] }, expect: d.uhat,
      title: 'û(α, t) : û(α, 0) = û₀(α) par la table, û_t(α, 0) = 0', action: 'Résoudre l\'EDO en t avec û₀ de la table',
      traps: d.wrong.uhat.length ? { f_wave_factor: d.wrong.uhat } : undefined,
      notes: o.noNote ? [] : [`u₀ = ${MT(d.U.f)} : ligne ${d.U.line} de la table, avec w = 1.`],
      lines: [{ math: d.uhat, subgoal: 'solve', blank: [prodT(d.c, 'αt')], blank2: [d.U.F] }],
    },
    {
      label: 'u', shown: 'u(x, t)', labels: ['u(x,t)', 'u(x;t)'], name: 'u', vars: ['x', 't'], domain: { x: [-2, 2], t: [0, 2] }, expect: d.u,
      title: 'Retour en x : cos(cαt) = (e^(icαt) + e^(−icαt))/2 et FP8', action: 'Revenir en x par la translation (FP8)',
      traps: { f_wave_factor: d.wrong.u },
      wrongActions: [{ label: 'Diviser par 4', rule: 'f_wave_factor', why: 'cos = (e^(i·) + e^(−i·))/2 : un seul facteur ½.' }],
      lines: [{ math: d.u, subgoal: 'assemble', blank: [prodT(d.c, 't')] }],
    },
  ];
}

const linePrompt = (d) => `Résous ${pdeHtml(d.c)} sur ℝ, avec <i>u</i>(<i>x</i>, 0) = ${MT(d.U.f)} et <i>u</i><sub>t</sub>(<i>x</i>, 0) = 0, par la transformée de Fourier en x. ${fourierTableHtml()}`;

function lineItem(level, rng, opts, o = {}) {
  const d = lineData(rng, o);
  return fdItem({
    skill: SK, level, key: `${level}:${d.id}`, prompt: linePrompt(d), parts: lineParts(d), exam: opts.exam ? examTag(opts) : false,
    hints: H('Transforme en x : ℱ(u_xx) = (iα)²û. On obtient un oscillateur en t pour chaque α.',
      `û_tt = −c²α²û avec c = ${rd(qt(d.c))}, donc û = û₀(α) cos(${rd(prodT(d.c, 'αt'))}).`,
      `u(x, t) = ${MT(d.u)}`),
    subgoals: [SUB.speed, SUB.transform, SUB.solve, SUB.assemble], keys: KEYS_FT, pde: { spec: d.spec, u: d.u },
    noHints: level >= 5 || undefined,
  });
}

// ---------- on ]0 ; π[: separation of variables ----------

const AMP = [1, 2, 3, -1, -2];

function boxData(rng, o = {}) {
  const c = o.c ?? rng.pick(o.distinct ? [q(1), q(2), q(3), q(1, 2)] : [q(1), q(1), q(2), q(3), q(1, 2)]);
  const p = rng.int(1, 4);
  let qq = rng.int(1, 4);
  if (o.distinct) while (qq === p) qq = rng.int(1, 4);
  const A = rng.pick(AMP);
  const B = o.noVelocity ? 0 : rng.pick(AMP);
  const om = (n) => c.mul(q(n));
  const bP = sumT([term(A, `cos(${prodT(om(p), 't')})`), qq === p && B ? term(q(B).div(om(p)), `sin(${prodT(om(p), 't')})`) : '']);
  const bQ = B && qq !== p ? term(q(B).div(om(qq)), `sin(${prodT(om(qq), 't')})`) : null;
  const sinx = (n) => `sin(${argT(n)})`;
  // b(t)·sin(nx): brackets only around a sum.
  const prodS = (b, n) => (/.[+-]/.test(b) ? `(${b})${sinx(n)}` : `${b}${sinx(n)}`);
  const u = sumT([prodS(bP, p), bQ ? prodS(bQ, qq) : '']);
  const c2 = c.mul(c);
  const om2 = (n) => c2.mul(q(n));
  const same = c.eq(1);
  const bPw = sumT([term(A, `cos(${prodT(om2(p), 't')})`), qq === p && B ? term(q(B).div(om2(p)), `sin(${prodT(om2(p), 't')})`) : '']);
  const bQw = bQ ? term(q(B).div(om2(qq)), `sin(${prodT(om2(qq), 't')})`) : null;
  return {
    c, p, q: qq, A, B, bP, bQ, u,
    omega: term(c, 'n'),
    ic: term(A, sinx(p)), ic1: B ? term(B, sinx(qq)) : '0',
    wrong: {
      omega: same ? [] : [term(c2, 'n'), 'n'],
      bP: same ? [] : [bPw],
      bQ: bQ && !same ? [bQw] : [],
      u: same ? [] : [sumT([prodS(bPw, p), bQw ? prodS(bQw, qq) : ''])],
    },
    id: `I:${qt(c)}:${p}:${qq}:${A}:${B}`,
    spec: { kind: 'wave', c: c.valueOf(), L: Math.PI, ic: term(A, sinx(p)), ic1: B ? term(B, sinx(qq)) : '0' },
  };
}

const sub = (n) => String(n).split('').map((x) => '₀₁₂₃₄₅₆₇₈₉'[x]).join('');

function boxParts(d) {
  const parts = [
    {
      label: 'ω_n', shown: 'ωₙ', name: 'omega', vars: ['n'], domain: { n: { int: [1, 30] } }, expect: d.omega,
      title: 'Les modes sin(nx) : bₙ″ + ωₙ² bₙ = 0', action: 'Séparer : modes sin(nx) et pulsations',
      traps: d.wrong.omega.length ? { f_wave_factor: d.wrong.omega } : undefined,
      decisions: [{ prompt: 'Quelle méthode ?', levels: [3], options: [
        { id: 'sep', label: 'Séparation des variables : l\'intervalle ]0 ; π[ est borné', valid: true },
        { id: 'ft', label: 'Transformée de Fourier en x', valid: false, why: 'u n\'est définie que sur ]0 ; π[ avec des conditions aux bords : on développe sur les modes sin(nx).' },
      ] }],
      wrongActions: [{ label: 'Pulsation c²n', rule: d.c.eq(1) ? undefined : 'f_wave_factor', why: 'bₙ″ = −c²n²bₙ : la pulsation est cn, la racine de c²n².' }],
      lines: [{ math: d.omega, subgoal: 'modes', blank: [d.omega] }],
    },
    {
      label: `b_${d.p}`, shown: `b${sub(d.p)}(t)`, labels: [`b_${d.p}(t)`], name: 'bp', vars: ['t'], domain: { t: [0, 2] }, expect: d.bP,
      title: `Le mode n = ${d.p} : b${sub(d.p)}(0) = ${rd(qt(d.A))}, b${sub(d.p)}′(0) = ${d.q === d.p ? rd(qt(d.B)) : '0'}`, action: `Résoudre l'oscillateur du mode ${d.p}`,
      traps: d.wrong.bP.length ? { f_wave_factor: d.wrong.bP } : undefined,
      lines: [{ math: d.bP, subgoal: 'solve', blank: [prodT(d.c.mul(q(d.p)), 't')] }],
    },
  ];
  if (d.bQ) {
    parts.push({
      label: `b_${d.q}`, shown: `b${sub(d.q)}(t)`, labels: [`b_${d.q}(t)`], name: 'bq', vars: ['t'], domain: { t: [0, 2] }, expect: d.bQ,
      title: `Le mode n = ${d.q} : b${sub(d.q)}(0) = 0, b${sub(d.q)}′(0) = ${rd(qt(d.B))}`, action: `Résoudre l'oscillateur du mode ${d.q}`,
      traps: d.wrong.bQ.length ? { f_wave_factor: d.wrong.bQ } : undefined,
      wrongActions: [{ label: `b${sub(d.q)} = ${rd(qt(d.B))} sin(ω t), sans diviser par ω`, why: `b′(0) = ω·C : il faut C = ${rd(qt(d.B))}/ω.` }],
      lines: [{ math: d.bQ, subgoal: 'solve', blank: [prodT(d.c.mul(q(d.q)), 't')] }],
    });
  }
  parts.push({
    label: 'u', shown: 'u(x, t)', labels: ['u(x,t)', 'u(x;t)'], name: 'u', vars: ['x', 't'], domain: { x: [0, Math.PI], t: [0, 2] }, expect: d.u,
    title: 'La solution', action: 'Assembler u = Σ bₙ(t) sin(nx)',
    traps: d.wrong.u.length ? { f_wave_factor: d.wrong.u } : undefined,
    lines: [{ math: d.u, subgoal: 'assemble', blank: [argT(d.p)] }],
  });
  return parts;
}

const boxPrompt = (d) => `Résous ${pdeHtml(d.c)} sur ]0 ; π[, avec <i>u</i>(0, <i>t</i>) = <i>u</i>(π, <i>t</i>) = 0, <i>u</i>(<i>x</i>, 0) = ${MT(d.ic)} et <i>u</i><sub>t</sub>(<i>x</i>, 0) = ${MT(d.ic1)}.`;

function boxItem(level, rng, opts, o = {}) {
  const d = boxData(rng, o);
  return fdItem({
    skill: SK, level, key: `${level}:${d.id}`, prompt: boxPrompt(d), parts: boxParts(d), exam: opts.exam ? examTag(opts) : false,
    hints: H('Chaque mode sin(nx) est un oscillateur : bₙ″ + (cn)²bₙ = 0, avec bₙ(0) et bₙ′(0) lus sur les conditions initiales.',
      `ωₙ = ${rd(d.omega)} ; b(t) = b(0) cos(ωt) + (b′(0)/ω) sin(ωt).`,
      `u(x, t) = ${MT(d.u)}`),
    subgoals: [SUB.modes, SUB.solve, SUB.assemble], keys: KEYS, pde: { spec: d.spec, u: d.u },
    noHints: level >= 5 || undefined,
  });
}

// ---------- multiple choice (2021) ----------

function statements(c) {
  const c2 = c.mul(c);
  const k = (x) => (x.eq(1) ? '' : x.d === 1 ? `${x.n}` : `(${x.n === 1 ? '' : x.n}α²/${x.d})`);
  const odeT = (x) => (x.d === 1 ? `û<sub>tt</sub> + ${k(x)}α²û = 0` : `û<sub>tt</sub> + ${k(x)}û = 0`);
  const cosT = (x) => `û(α, t) = û₀(α) cos(${rd(prodT(x, 'αt'))})`;
  const dal = (x, den) => `u(x, t) = (u₀(x + ${rd(prodT(x, 't'))}) + u₀(x − ${rd(prodT(x, 't'))}))/${den}`;
  const right = [odeT(c2), cosT(c), dal(c, 2)];
  const wrong = [
    { html: odeT(c2).replace(' + ', ' − '), rule: 'f_ft_deriv_sign' },
    { html: dal(c, 4), rule: 'f_wave_factor' },
    { html: `û(α, t) = û₀(α) cosh(${rd(prodT(c, 'αt'))})`, rule: 'f_ft_deriv_sign' },
  ];
  if (!c.eq(1)) {
    wrong.push({ html: odeT(c), rule: 'f_wave_factor' }, { html: cosT(c2), rule: 'f_wave_factor' }, { html: dal(c2, 2), rule: 'f_wave_factor' });
  } else wrong.push({ html: dal(c, 1) });
  return { right, wrong };
}

function waveMcq(rng, opts) {
  const c = rng.pick(CS);
  const s = statements(c);
  const right = rng.shuffle([...s.right]).slice(0, rng.int(1, 3));
  return mcqMulti({
    skill: SK, level: 4, key: `mcq:${qt(c)}:${right.length}`, exam: examTag(opts),
    prompt: `On résout ${pdeHtml(c)} sur ℝ, avec <i>u</i>(<i>x</i>, 0) = u₀(<i>x</i>) et <i>u</i><sub>t</sub>(<i>x</i>, 0) = 0, par la transformée de Fourier en x (û₀ = ℱ(u₀)). Cochez les affirmations vraies.`,
    right, wrongs: rng.shuffle(s.wrong), count: 5,
    solution: [{ html: `c = ${rd(qt(c))} ; ${s.right.join(' ; ')}.`, note: '' }],
    expectedSec: 240,
  }, rng);
}

// The part « quel û ? » of the level-5 problem (a single answer).
function uhatChoice(rng, level) {
  const c = rng.pick(CS.filter((x) => !x.eq(1)));
  const s = statements(c);
  return mcqOne({
    skill: SK, level, key: `uhat:${qt(c)}`,
    prompt: `Sur ℝ, ${pdeHtml(c)}, <i>u</i>(<i>x</i>, 0) = u₀(<i>x</i>), <i>u</i><sub>t</sub>(<i>x</i>, 0) = 0. Que vaut û(α, t) ?`,
    right: s.right[1],
    wrongs: [{ html: `û(α, t) = û₀(α) cos(${rd(prodT(c.mul(c), 'αt'))})`, rule: 'f_wave_factor' }, { html: `û(α, t) = û₀(α) cosh(${rd(prodT(c, 'αt'))})`, rule: 'f_ft_deriv_sign' }, { html: `û(α, t) = û₀(α) e<sup>−${rd(prodT(c, '|α|t'))}</sup>` }],
    solution: [{ html: `û_tt + c²α²û = 0 avec c = ${rd(qt(c))} : ${s.right[1]}.`, note: '' }],
  }, rng);
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return waveMcq(rng, opts);
    if (opts.exam === 'open') {
      const d = boxData(rng, { distinct: true });
      return fdProblem({ skill: SK, level: 4, key: `${SK}:open:${d.id}`, prompt: boxPrompt(d), parts: boxParts(d), exam: { format: 'open', points: 6 }, keys: KEYS, subgoals: [SUB.modes, SUB.solve, SUB.assemble], pde: { spec: d.spec, u: d.u } }, [1.5, 1.5, 1.5, 1.5]);
    }
    if (level === 5) {
      const d = boxData(rng, { distinct: true });
      return fdProblem({ skill: SK, level: 5, key: `${SK}:5:${d.id}`, prompt: `D'abord une question sur ℝ, puis : ${boxPrompt(d).replace('Résous', 'résous')}`, partPrompt: boxPrompt(d), title: 'Sur ]0 ; π[', parts: boxParts(d), keys: KEYS, subgoals: [SUB.modes, SUB.solve, SUB.assemble], pde: { spec: d.spec, u: d.u } }, 4,
        [{ item: uhatChoice(rng, 5), points: 1, title: 'Sur ℝ : la transformée', before: true }]);
    }
    if (level === 1) return boxItem(1, rng, opts, { noVelocity: rng.chance(0.5) });
    if (level === 2) return lineItem(2, rng, opts);
    return rng.chance(0.5) ? lineItem(level, rng, opts) : boxItem(level, rng, opts, { distinct: rng.chance(0.7) });
  },
};
