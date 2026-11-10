// Generators of module A2, part i (unit `analyse2`, step U6): the
// particular solution and the Cauchy problem (a2-ode-particular, with the
// catalogue's example E1 « Résonance »). Catalogue:
// docs/universite/A2-analyse-2.md. Helpers: analyse2-i-kit.js.
//
// An item is built from its answer: the roots of the characteristic
// equation (real, double or complex), the right-hand side (P(x)e^(mx),
// a polynomial, cos or sin kx, resonant in half the items), the particular
// solution y_p with integer coefficients (the right-hand side is L[y_p]),
// the constants C₁, C₂ (the initial conditions are y(0), y′(0)). Its parts:
//   roots      solset (or complex for α ± iβ): « r = 1 ou r = 2 »
//   y_h        ode {final: 'homog'}
//   form       a decision (the trial form, resonance or not)
//   L[y_p]     equiv in x, A, B (no derivative left)
//   identify   system in A, B (skipped when it reads « A = … » already)
//   y_p        ode {final: 'particular'}
//   y          ode (with ic: y, then C₁ = … ; C₂ = …, then y)
//   value      value {expect, form: 'closed'} (problems)

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { closedNumber } from '../../cas/closedform.js';
import { linesItem, examTag, A2_KEYS } from './a2-kit.js';
import { N, H, E, SEG, stepMenus, fr } from './analyse1-e-kit.js';
import { asProblem } from './kit-problem.js';
import {
  q, cmul, sum, basisText, trigText, T, combine, scale, termsText, initial, fit, valueAt,
  applyL, qp, qpText, identify, blankValues, blankMatches, blankTail, mcq4, vfMcq, M,
} from './analyse2-i-kit.js';

const SK = 'a2-ode-particular';
export const PART_SUB = [
  { id: 'char', label: 'équation caractéristique et racines', skill: 'a2-ode-const2' },
  { id: 'homog', label: 'solution homogène', skill: 'a2-ode-const2' },
  { id: 'form', label: 'forme de y_p', skill: SK },
  { id: 'derive', label: 'L[y_p]', skill: SK },
  { id: 'coeffs', label: 'coefficients de y_p', skill: SK },
  { id: 'general', label: 'y = y_h + y_p', skill: 'a2-ode-structure' },
  { id: 'ic', label: 'conditions initiales', skill: SK },
];

// ---------- the data ----------

// Roots: {kind: 'real', r1, r2} | {kind: 'double', r} | {kind: 'cplx', a, b}.
export function rootsInfo(R, u = 'y') {
  let p;
  let qq;
  let h1;
  let h2;
  let yh;
  let line;
  let judge = { kind: 'solset', v: 'r' };
  const e = (r) => basisText(T(1, 0, r));
  if (R.kind === 'real') {
    p = -(R.r1 + R.r2); qq = R.r1 * R.r2;
    h1 = T(1, 0, R.r1); h2 = T(1, 0, R.r2);
    yh = sum([cmul(1, `C_1${e(R.r1) ? ` ${e(R.r1)}` : ''}`), `C_2${e(R.r2) ? ` ${e(R.r2)}` : ''}`]);
    line = `r = ${R.r1} ou r = ${R.r2}`;
  } else if (R.kind === 'double') {
    p = -2 * R.r; qq = R.r * R.r;
    h1 = T(1, 0, R.r); h2 = T(1, 1, R.r);
    yh = R.r === 0 ? 'C_1+C_2 x' : `(C_1+C_2 x)${e(R.r)}`;
    line = `r = ${R.r}`;
  } else {
    p = -2 * R.a; qq = R.a * R.a + R.b * R.b;
    h1 = T(1, 0, R.a, 'c', R.b); h2 = T(1, 0, R.a, 's', R.b);
    const trig = `C_1 cos(${R.b === 1 ? 'x' : `${R.b}x`})+C_2 sin(${R.b === 1 ? 'x' : `${R.b}x`})`;
    yh = R.a === 0 ? trig : `${e(R.a)}(${trig})`;
    const im = R.b === 1 ? 'i' : `${R.b}i`;
    line = R.a === 0 ? `r = ${im} ou r = -${im}` : `r = ${R.a}+${im} ou r = ${R.a}-${im}`;
    judge = { kind: 'complex', form: 'set', unknown: 'r' };
  }
  const char = `${sum(['r^2', cmul(p, 'r'), N(qq)])}=0`;
  const lhs = sum([`${u}''`, cmul(p, `${u}'`), cmul(qq, u)]);
  return { p, q: qq, h1, h2, yh, line, judge, char, lhs };
}

const rootsList = (R) => (R.kind === 'real' ? [R.r1, R.r2] : R.kind === 'double' ? [R.r, R.r] : []);
const mult = (R, m) => rootsList(R).filter((r) => r === m).length;

function pickRoots(rng, kind) {
  if (kind === 'real') {
    const r1 = rng.int(-4, 3);
    const r2 = rng.int(r1 + 1, 4);
    return { kind, r1, r2 };
  }
  if (kind === 'double') return { kind, r: rng.int(-3, 3) };
  return { kind: 'cplx', a: rng.int(-2, 2), b: rng.int(1, 3) };
}

// A particular-solution item, from its answer. want: {rhs, res, unknown}.
export function particularData(rng, want = {}) {
  for (let i = 0; i < 200; i++) {
    const rhs = want.rhs || rng.pick(['exp', 'exp', 'poly', 'trig', 'trig']);
    const res = want.res ?? rng.chance(0.5);
    const u = want.unknown || 'y';
    let R;
    let m = 0;
    let k = 0;
    let s = 0;
    let yp;
    let form; // the trial form: text and its quasi-polynomial (unknowns A, B)
    let unknowns;
    if (rhs === 'exp') {
      if (res) {
        R = pickRoots(rng, rng.chance(0.3) ? 'double' : 'real');
        m = R.kind === 'double' ? R.r : rng.pick([R.r1, R.r2]);
        if (m === 0) continue;
      } else {
        R = pickRoots(rng, rng.pick(['real', 'real', 'double', 'cplx']));
        m = rng.pick([-3, -2, -1, 1, 2, 3]);
        if (mult(R, m)) continue;
      }
      s = mult(R, m);
      const A = rng.pick([-4, -3, -2, -1, 1, 2, 3, 4]);
      yp = [T(A, s, m)];
      form = { text: `A ${basisText(T(1, s, m))}`, qp: qp([[`${s}|1`, { A: q(1) }]]) };
      unknowns = ['A'];
    } else if (rhs === 'poly') {
      R = pickRoots(rng, rng.pick(['real', 'double', 'cplx']));
      if (rootsList(R).includes(0)) continue;
      const deg = rng.pick([0, 1, 1]);
      const A = rng.pick([-3, -2, -1, 1, 2, 3]);
      if (deg === 0) {
        yp = [T(A, 0, 0)];
        form = { text: 'A', qp: qp([['0|1', { A: q(1) }]]) };
        unknowns = ['A'];
      } else {
        const B = rng.int(-3, 3);
        yp = combine([T(A, 1, 0), T(B, 0, 0)]);
        form = { text: 'A x+B', qp: qp([['1|1', { A: q(1) }], ['0|1', { B: q(1) }]]) };
        unknowns = ['A', 'B'];
      }
    } else {
      k = rng.int(1, 3);
      const kx = k === 1 ? 'x' : `${k}x`;
      if (res) {
        R = { kind: 'cplx', a: 0, b: k };
        s = 1;
        const c = rng.pick([-3, -2, -1, 1, 2, 3]);
        yp = [T(c, 1, 0, rng.chance(0.5) ? 'c' : 's', k)];
      } else {
        R = pickRoots(rng, rng.pick(['real', 'double', 'cplx', 'cplx']));
        const { p, q: qq } = rootsInfo(R);
        if (p === 0 && qq === k * k) continue;
        // c·sin kx (or cos): A = −pk·c/D, B = (q − k²)c/D (sin); integers.
        const a1 = qq - k * k;
        const b1 = p * k;
        const g = gcdI(Math.abs(a1), Math.abs(b1));
        const sgn = rng.pick([1, -1]);
        const D = a1 * a1 + b1 * b1;
        const c = (sgn * D) / g;
        if (Math.abs(c) > 40 || D === 0) continue;
        const sinR = rng.chance(0.5);
        const A = sinR ? (-b1 * sgn) / g : (a1 * sgn) / g;
        const B = sinR ? (a1 * sgn) / g : (b1 * sgn) / g;
        if (Math.abs(A) > 6 || Math.abs(B) > 6) continue;
        yp = combine([T(A, 0, 0, 'c', k), T(B, 0, 0, 's', k)]);
      }
      const pre = s ? 'x' : '';
      form = { text: `${pre}${pre ? '(' : ''}A cos(${kx})+B sin(${kx})${pre ? ')' : ''}`, qp: qp([[`${s}|c`, { A: q(1) }], [`${s}|s`, { B: q(1) }]]) };
      unknowns = ['A', 'B'];
    }
    const info = rootsInfo(R, u);
    // The right-hand side: L[y_p].
    const ypQP = qp(yp.map((t) => [`${t.j}|${t.tr}`, { '': t.c }]));
    const rhsQP = applyL(ypQP, info.p, info.q, m, k);
    const rhsText = qpText(rhsQP, m, k);
    if (!rhsText || rhsText === '0') continue;
    if ([...rhsQP.values()].some((f) => Math.abs(f[''].n) > 60)) continue;
    const Lform = applyL(form.qp, info.p, info.q, m, k);
    const id = identify(Lform, rhsQP, unknowns);
    if (!id) continue;
    // The constants, then the initial conditions.
    const c1 = q(rng.int(-3, 3));
    const c2 = q(rng.int(-3, 3));
    if (c1.n === 0 && c2.n === 0) continue;
    const sol = combine([...scale([info.h1], c1), ...scale([info.h2], c2), ...yp]);
    const [y0, y1] = initial(sol);
    if (Math.abs(y0.n) > 12 || Math.abs(y1.n) > 20 || y0.d > 6 || y1.d > 6) continue;
    const d = finish({ R, info, rhs, res: s > 0, s, m, k, u, yp, form, unknowns, Lform, rhsQP, rhsText, id, c1, c2, sol, y0, y1 }, rng);
    if (d) return d;
  }
  return null;
}

function gcdI(a, b) { while (b) [a, b] = [b, a % b]; return a || 1; }

// Texts, the value at x₁ and the traps' answers.
function finish(d, rng) {
  const { info, u, yp, sol, y0, y1 } = d;
  d.eq = `${info.lhs}=${d.rhsText}`;
  d.ypText = termsText(yp);
  d.general = `${u} = ${sum([info.yh, d.ypText])}`;
  d.final = `${u} = ${termsText(sol)}`;
  d.consts = `C_1 = ${N(d.c1)} ; C_2 = ${N(d.c2)}`;
  const trig = sol.some((t) => t.tr !== '1');
  d.x1 = trig ? (sol.every((t) => t.m.n === 0) ? rng.pick(['π', 'π/2']) : 'π') : '1';
  d.value = valueAt(sol, d.x1);
  if (!d.value) return null;
  // Wrong answers: constants fitted on y_h alone (ic before y_p), y_h
  // alone (resonance: no form without x works), y_p with the wrong sign or
  // halved; y_p from an incomplete form.
  const withYp = (part) => {
    const [a, b] = fit(info.h1, info.h2, part, y0, y1);
    const s = combine([...scale([info.h1], a), ...scale([info.h2], b), ...part]);
    return { a, b, terms: s, text: `${u} = ${termsText(s)}`, value: valueAt(s, d.x1) };
  };
  const before = (() => {
    const [a, b] = fit(info.h1, info.h2, [], y0, y1);
    const s = combine([...scale([info.h1], a), ...scale([info.h2], b), ...yp]);
    return { a, b, terms: s, text: `${u} = ${termsText(s)}`, value: valueAt(s, d.x1), consts: `C_1 = ${N(a)} ; C_2 = ${N(b)}` };
  })();
  d.wrong = {};
  if (!(before.a.eq(d.c1) && before.b.eq(d.c2))) d.wrong.icBefore = before;
  if (d.res) d.wrong.res = withYp([]);
  d.wrong.flip = withYp(scale(yp, -1));
  d.wrong.half = withYp(scale(yp, q(1, 2)));
  d.wrong.incomplete = incompleteYp(d);
  d.trap = {
    res: d.res ? [`${u} = ${d.info.yh}`, d.wrong.res.text] : [],
    icBefore: d.wrong.icBefore ? [d.wrong.icBefore.consts, d.wrong.icBefore.text] : [],
    incomplete: d.wrong.incomplete ? [`${u}_p = ${d.wrong.incomplete.yp}`] : [],
    ctx: { ...resCtx(d), ...icCtx(d) },
  };
  return d;
}

// The initial condition the constants fitted on y_h alone break (a2_ode_ic_before_particular).
function icCtx(d) {
  if (!d.wrong.icBefore) return {};
  const [v0, v1] = initial(d.wrong.icBefore.terms);
  if (!v0.eq(d.y0)) return { which: d.u, valeur: fr(N(v0)), want: fr(N(d.y0)) };
  return { which: `${d.u}′`, valeur: fr(N(v1)), want: fr(N(d.y1)) };
}

// The form without x and its root, for the explanation of a2_ode_resonance_no_x.
function resCtx(d) {
  if (!d.res) return {};
  const noX = d.rhs === 'exp' ? `A${basisText(T(1, 0, d.m))}` : d.form.text.replace(/^x\(/, '').replace(/\)$/, '');
  const root = d.rhs === 'exp' ? String(d.m) : `${d.k === 1 ? '' : d.k}i`;
  return { noX: fr(noX.replace(/\^\(([^)]*)\)/g, '^{$1}').replace(/\^x/g, '^{x}')), root: fr(root), withX: fr(d.form.text.replace(/\^\(([^)]*)\)/g, '^{$1}')) };
}

// y_p from a form without one of its terms (A sin kx alone for sin kx; A x
// alone for a polynomial): the coefficient read on the term of the
// right-hand side only. null when that form works anyway.
function incompleteYp(d) {
  const { info, k, rhsQP } = d;
  if (d.rhs === 'trig' && !d.res && info.p !== 0) {
    const tr = rhsQP.has('0|s') && rhsQP.get('0|s')[''].n !== 0 ? 's' : 'c';
    const c = rhsQP.get(`0|${tr}`)[''];
    const kq = info.q - k * k;
    if (!kq) return null;
    return { yp: termsText([T(c.div(kq), 0, 0, tr, k)]), form: `A ${trigText(tr, k)}` };
  }
  if (d.rhs === 'poly' && d.unknowns.length === 2 && info.p !== 0) {
    const c = rhsQP.get('1|1')?.[''];
    if (!c || c.n === 0) return null;
    return { yp: termsText([T(c.div(info.q), 1, 0)]), form: 'A x' };
  }
  return null;
}

// The catalogue's example E1: u″ + 4u = 8 sin 2x, u(0) = 1, u′(0) = 0, u(π) = 1 − 2π.
export function e1Data(rng) {
  const R = { kind: 'cplx', a: 0, b: 2 };
  const info = rootsInfo(R, 'u');
  const yp = [T(-2, 1, 0, 'c', 2)];
  const form = { text: 'x(A cos(2x)+B sin(2x))', qp: qp([['1|c', { A: q(1) }], ['1|s', { B: q(1) }]]) };
  const rhsQP = applyL(qp([['1|c', { '': q(-2) }]]), 0, 4, 0, 2);
  const Lform = applyL(form.qp, 0, 4, 0, 2);
  const sol = combine([T(1, 0, 0, 'c', 2), T(1, 0, 0, 's', 2), ...yp]);
  const d = finish({
    R, info, rhs: 'trig', res: true, s: 1, m: 0, k: 2, u: 'u', yp, form, unknowns: ['A', 'B'], Lform, rhsQP, rhsText: qpText(rhsQP, 0, 2),
    id: identify(Lform, rhsQP, ['A', 'B']), c1: q(1), c2: q(1), sol, y0: q(1), y1: q(0),
  }, { pick: () => 'π' });
  return { ...d, fallback: true };
}

// ---------- the parts ----------

const CHOICES = [
  { id: 'roots', label: 'Résoudre l\'équation caractéristique' },
  { id: 'homog', label: 'Écrire la solution homogène y_h' },
  { id: 'derive', label: 'Remplacer y_p par la forme dans le membre de gauche' },
  { id: 'ident', label: 'Identifier les coefficients' },
  { id: 'yp', label: 'Écrire y_p avec ses coefficients' },
  { id: 'general', label: 'Écrire y = y_h + y_p' },
  { id: 'consts', label: 'Fixer C₁ et C₂ avec les conditions initiales' },
  { id: 'final', label: 'Remplacer C₁ et C₂ dans y' },
  { id: 'icfirst', label: 'Fixer C₁ et C₂ sur y_h, puis ajouter y_p', rule: 'a2_ode_ic_before_particular', why: 'Les conditions initiales portent sur la solution entière y = y_h + y_p : écris d\'abord y.' },
];

// Decision lines on the form of y_p: « m racine ? » (level 3) and the form.
function formDecisions(d, level) {
  const out = [];
  const { s, m, k, rhs } = d;
  const what = rhs === 'exp' ? `m = ${m}` : rhs === 'trig' ? `${k === 1 ? '' : k}i` : '0';
  if (level === 3) {
    const opts = [
      { id: 's0', label: `${what} n'est pas racine de l'équation caractéristique`, valid: s === 0, why: `Remplace r par ${what} dans l'équation caractéristique.` },
      { id: 's1', label: `${what} est racine simple`, valid: s === 1, why: s === 0 ? `${what} n'annule pas l'équation caractéristique.` : 'Relis les racines.' },
    ];
    if (rhs === 'exp') opts.push({ id: 's2', label: `${what} est racine double`, valid: s === 2, why: 'Relis les racines.' });
    out.push({ kind: 'decision', prompt: `Le second membre est ${M(d.rhsText)}. Est-ce un cas de résonance ?`, options: opts });
  }
  const opts = [];
  const res = (label, valid, why, rule = null) => opts.push({ id: `f${opts.length}`, label, valid, why, ...(rule && !valid ? { rule } : {}) });
  if (rhs === 'exp') {
    for (const j of [0, 1, 2]) {
      const valid = j === s;
      const why = j < s ? `${M(basisText(T(1, j, m)))} est solution de l'équation homogène : elle donne 0. ${m} est racine${s === 2 ? ' double' : ''} : multiplie par ${s === 2 ? 'x²' : 'x'}.` : `${m} ${s ? `est racine ${s === 1 ? 'simple' : 'double'}` : 'n\'est pas racine'} : la forme est A${s ? (s === 1 ? 'x' : 'x²') : ''}e^{${m}x}.`;
      res(M(`A ${basisText(T(1, j, m))}`), valid, why, j < s ? 'a2_ode_resonance_no_x' : null);
    }
  } else if (rhs === 'trig') {
    const kx = k === 1 ? 'x' : `${k}x`;
    const both = `A cos(${kx})+B sin(${kx})`;
    if (s) {
      res(M(both), false, `A cos ${kx} + B sin ${kx} est solution de l'équation homogène : elle donne 0. Comme ${what} est racine, multiplie par x.`, 'a2_ode_resonance_no_x');
      res(M(`x(${both})`), true, '');
      res(M(`x^2(${both})`), false, `${what} est racine simple : un seul facteur x.`);
    } else {
      res(M(both), true, '');
      if (d.info.p !== 0) {
        const tr = d.rhsQP.has('0|s') && d.rhsQP.get('0|s')[''].n !== 0 ? 'sin' : 'cos';
        res(M(`A ${tr}(${kx})`), false, `Le terme en ${d.unknown || 'y'}′ crée un ${tr === 'sin' ? 'cos' : 'sin'} : il faut les deux termes.`, 'a2_ode_yp_incomplete');
      }
      res(M(`x(${both})`), false, `${what} n'est pas racine : pas de facteur x.`);
    }
  } else {
    const deg = d.unknowns.length - 1;
    if (deg === 1) {
      res(M('A x+B'), true, '');
      if (d.info.p !== 0) res(M('A x'), false, 'Le terme en y′ crée une constante à partir de Ax : il faut aussi B.', 'a2_ode_yp_incomplete');
      res(M('x(A x+B)'), false, '0 n\'est pas racine : pas de facteur x.');
    } else {
      res(M('A'), true, '');
      res(M('A x'), false, '0 n\'est pas racine : une constante suffit.');
    }
  }
  out.push({ kind: 'decision', prompt: `Quelle forme pour ${d.u}_p ?`, options: opts });
  return out;
}


// The parts of an item. o: {level, ic, value, roots}.
function partsOf(d, o) {
  const { u, info, level } = { ...d, level: o.level };
  const parts = [];
  const odeCfg = (extra = {}) => ({ kind: 'ode', eq: d.eq, unknown: u, order: 2, _p: d.trap, ...extra });
  if (o.roots) {
    parts.push({ html: 'Équation caractéristique : ses racines.', ask: 'r :', start: info.char, judge: info.judge, lines: [E(info.line, 'Racines de l\'équation caractéristique', 'char', 'roots')] });
  }
  if (o.homog) {
    const l = E(`${u}_h = ${info.yh}`, 'Solution de l\'équation homogène', 'homog', 'homog');
    parts.push({ html: `Solution de l'équation homogène ${M(`${info.lhs}=0`)} :`, ask: `${u}_h =`, start: d.eq, judge: odeCfg({ final: 'homog' }), lines: [l] });
  }
  // L[y_p] with the trial form.
  const F = d.form.text;
  const Lstart = sum([`d(${F},x,2)`, cmul(info.p, `d(${F},x)`), cmul(info.q, `(${F})`)]);
  const Lline = qpText(d.Lform, d.m, d.k);
  const vars = ['x', ...d.unknowns];
  const derive = E(Lline, `${u}_p = ${d.form.text} remplacée dans le membre de gauche`, 'derive', 'derive');
  if (level <= 2) Object.assign(derive, blankMatches(Lline, /-?\d+(?=[AB])/g, level === 1 ? 1 : 2));
  parts.push({
    html: `Remplace ${u}_p = ${M(d.form.text)} dans le membre de gauche :`, ask: `L[${u}_p] =`,
    start: Lstart, judge: { kind: 'equiv', vars, target: 'no-prime' },
    pre: level >= 2 ? formDecisions(d, level) : [],
    lines: [derive],
  });
  // Identification.
  const solLine = d.unknowns.map((x) => `${x} = ${N(d.id.sol[x])}`).join(' ; ');
  const sysStart = d.id.eqs.join(' ; ');
  // (Not at level 3: the menus of the « choose the action » mode read CAS lines.)
  if (sysStart !== solLine && d.id.eqs.length && level !== 3) {
    parts.push({
      html: `Identifie les coefficients de ${M(Lline)} = ${M(d.rhsText)} :`, ask: d.unknowns.join(', ') + ' :',
      start: sysStart, judge: { kind: 'system', vars: d.unknowns, solutions: [d.unknowns.map((x) => N(d.id.sol[x]))] },
      lines: [E(solLine, 'Résoudre', 'coeffs', 'ident')],
    });
  }
  const ypl = E(`${u}_p = ${d.ypText}`, 'Les coefficients dans la forme', 'coeffs', 'yp');
  if (level <= 2) Object.assign(ypl, blankMatches(ypl.math, /(?<=[=+)]\s*|^)-?(\d+|\(\d+\/\d+\))(?=[a-zA-Z]|$)/g, level === 1 ? 1 : 2));
  parts.push({ html: 'La solution particulière :', ask: `${u}_p =`, start: d.eq, judge: odeCfg({ final: 'particular' }), lines: [ypl] });
  // y = y_h + y_p, then the constants.
  const gl = E(d.general, 'y = y_h + y_p', 'general', 'general');
  if (level === 1) Object.assign(gl, blankTail(gl.math, d.ypText));
  const lines = [gl];
  if (o.ic) {
    const cl = E(d.consts, `${u}(0) = ${fr(N(d.y0))}, ${u}′(0) = ${fr(N(d.y1))}`, 'ic', 'consts');
    if (level <= 2) Object.assign(cl, blankValues(cl.math, level === 1 ? 1 : null));
    lines.push(cl, E(d.final, 'La solution du problème de Cauchy', 'ic', 'final'));
  }
  parts.push({
    html: o.ic ? 'La solution générale, puis les conditions initiales :' : 'La solution générale :', ask: `${u} =`,
    start: d.eq, judge: odeCfg(o.ic ? { ic: { x: 0, y: N(d.y0), dy: N(d.y1) } } : {}), lines,
  });
  if (o.value) {
    parts.push({ html: `La valeur demandée :`, ask: `${u}(${d.x1}) =`, start: `${u}(${d.x1})`, judge: { kind: 'value', expect: d.value, form: 'closed' }, lines: [E(d.value, `Remplacer x par ${d.x1}`, 'ic', 'value')] });
  }
  return parts;
}


// The script of an item made of parts (with menus at level 3).
export function assemble(parts, level, choices) {
  const script = [];
  let first = null;
  parts.forEach((p, i) => {
    let judge = p.judge;
    if (level === 3) {
      const menus = stepMenus(p.start, p.lines, choices);
      judge = { ...judge, menus, menu: menus[0]?.options };
    }
    if (i === 0) {
      first = { start: p.start, judge };
      if (p.html) script.push({ kind: 'note', html: p.html });
    } else script.push(SEG(p.html, p.ask, p.start, judge));
    for (const n of p.notes || []) script.push({ kind: 'note', html: n });
    for (const dec of p.pre || []) script.push(dec);
    for (const n of p.after || []) script.push({ kind: 'note', html: n });
    script.push(...p.lines);
  });
  return { ...first, script };
}

const icText = (d) => `${d.u}(0) = ${fr(N(d.y0))} et ${d.u}′(0) = ${fr(N(d.y1))}`;

function hintsOf(d) {
  const { s, m, rhs, k } = d;
  const what = rhs === 'exp' ? `${m}` : rhs === 'trig' ? `${k === 1 ? '' : k}i` : '0';
  return H(
    `Racines de l'équation caractéristique : ${M(d.info.line)}. ${what} ${s ? `est racine${s === 2 ? ' double' : ''} : multiplie la forme habituelle par ${s === 2 ? 'x²' : 'x'}` : 'n\'est pas racine : la forme habituelle suffit'}.`,
    `${d.u}_p = ${M(d.form.text)}, et ${M(qpText(d.Lform, d.m, d.k))} = ${M(d.rhsText)}.`,
    `${M(`${d.u}_p = ${d.ypText}`)}`,
  );
}

function particularItem(level, rng, opts, d) {
  const ic = level >= 3 && level !== 3 ? true : level === 3 ? rng.chance(0.5) : false;
  const parts = partsOf(d, { level, ic, roots: false, homog: level >= 2, value: false });
  const { start, judge, script } = assemble(parts, level, CHOICES);
  const given = level === 1 ? ` Solution homogène : ${M(`${d.u}_h = ${d.info.yh}`)}.` : '';
  return linesItem({
    skill: SK, level, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', start, judge, script,
    prompt: ic ? `Résous ${M(d.eq)} avec ${icText(d)}.${given}` : `Trouve la solution générale de ${M(d.eq)}.${given}`,
    hints: hintsOf(d), subgoals: PART_SUB, keys: A2_KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SK}:${level}:${d.eq}:${ic ? d.consts : ''}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// The whole problem (level 5, E1): roots, y_h, form, coefficients, y, the
// constants, the value. 10 points, the barème of E1.
function particularProblem(rng, opts, d) {
  const parts = partsOf(d, { level: 5, ic: true, roots: true, homog: true, value: true });
  const { start, judge, script } = assemble(parts, 5, CHOICES);
  const it = linesItem({
    skill: SK, level: 5, mode: 'free', start, judge, script, noHints: true,
    prompt: `Trouve la solution de ${M(d.eq)} avec ${icText(d)}, puis calcule ${d.u}(${d.x1}).`,
    hints: [], subgoals: PART_SUB, keys: A2_KEYS,
    key: `${SK}:5:${d.eq}:${d.consts}`, exam: opts.exam === 'open' ? { format: 'open', points: 10 } : false, fallback: !!d.fallback,
  });
  // E1: roots 1, y_h 1, form and L[y_p] 2, coefficients 2, y and the constants 3, value 1.
  const hasSys = parts.length === 7;
  const points = hasSys ? [1, 1, 2, 1, 1, 3, 1] : [1, 1, 2, 2, 3, 1];
  return asProblem(it, 10, { points });
}

// u(x₁) = ? (2021 Q15).
function particularMcq(level, rng, opts, d) {
  const val = (w) => (w?.value ? { html: M(w.value) } : null);
  const wrongs = [
    d.wrong.icBefore && { ...val(d.wrong.icBefore), rule: 'a2_ode_ic_before_particular' },
    d.wrong.res && { ...val(d.wrong.res), rule: 'a2_ode_resonance_no_x' },
    val(d.wrong.flip),
    val(d.wrong.half),
  ].filter((w) => w && w.html);
  const fillers = [scale(d.sol, -1), combine([...d.sol, T(1, 0, 0)]), combine([...d.sol, T(-1, 0, 0)])].map((t) => ({ html: M(valueAt(t, d.x1)) }));
  return mcq4({
    skill: SK, level, prompt: `Soit ${d.u} la solution de ${M(d.eq)} avec ${icText(d)}. Alors ${d.u}(${d.x1}) vaut :`,
    right: M(d.value), wrongs, fillers,
    key: `${SK}:mcq:${d.eq}:${d.consts}`, solution: [{ html: M(d.general), note: 'Solution générale' }, { html: M(d.final), note: 'Conditions initiales' }, { html: `${d.u}(${d.x1}) = ${M(d.value)}`, note: '' }],
    exam: opts.exam ? examTag(opts) : false, expectedSec: 240, fallback: !!d.fallback,
  }, rng);
}

// V/F on the form of y_p (the catalogue's statement: A sin 3x for y″ + 9y = sin 3x).
function particularTf(rng, opts, d) {
  const cands = [];
  const good = d.form.text;
  cands.push({ form: good, truth: true, why: `C'est la bonne forme : ${M(`${d.u}_p = ${d.ypText}`)} convient.` });
  if (d.res) {
    const noX = d.rhs === 'exp' ? `A ${basisText(T(1, 0, d.m))}` : d.form.text.replace(/^x\(/, '').replace(/\)$/, '');
    cands.push({ form: noX, truth: false, rule: 'a2_ode_resonance_no_x', why: `Résonance : ${M(noX)} est solution de l'équation homogène, elle donne 0. Il faut ${M(good)}.` });
    if (d.rhs === 'trig') {
      const tr = d.rhsQP.has('0|s') && d.rhsQP.get('0|s')[''].n !== 0 ? 'sin' : 'cos';
      const one = `A ${tr}(${d.k === 1 ? 'x' : `${d.k}x`})`;
      cands.push({ form: one, truth: false, rule: 'a2_ode_resonance_no_x', why: `Résonance : ${M(one)} est solution de l'équation homogène, elle donne 0. Il faut ${M(good)}.` });
    }
  }
  if (d.wrong.incomplete) {
    const one = d.wrong.incomplete.form;
    cands.push({ form: one, truth: false, rule: 'a2_ode_yp_incomplete', why: `${M(one)} ne suffit pas : le terme en ${d.u}′ crée un terme de plus. Il faut ${M(good)}.` });
  }
  const c = rng.pick(cands);
  return vfMcq(SK, `Pour ${M(d.eq)}, il existe une solution particulière de la forme ${M(`${d.u}_p = ${c.form}`)}.`, c.truth, rng, {
    key: `${d.eq}:${c.form}`, why: c.why, ruleIfTrue: c.rule || null,
  });
}

export function genParticular(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return particularTf(rng, opts, particularData(rng) || e1Data(rng));
  if (opts.exam === 'mcq') return particularMcq(4, rng, opts, particularData(rng, { unknown: rng.pick(['y', 'u']) }) || e1Data(rng));
  if (opts.exam === 'open' || (level === 5 && rng.chance(0.5))) {
    // E1-like: resonance with cos or sin, or any other right-hand side.
    // The value u(x₁) must be a closed number for the judge (e^(kπ) is not).
    let d = null;
    for (let i = 0; i < 20 && !d; i++) {
      d = particularData(rng, rng.chance(0.6) ? { rhs: 'trig', res: true, unknown: 'u' } : { unknown: 'u' });
      if (d && closedNumber(parse(d.value)) !== true) d = null;
    }
    return particularProblem(rng, opts, d || e1Data(rng));
  }
  if (level === 5) return particularMcq(5, rng, { ...opts, exam: false }, particularData(rng, { unknown: 'u' }) || e1Data(rng));
  const d = particularData(rng) || e1Data(rng);
  return particularItem(level, rng, opts, d);
}
