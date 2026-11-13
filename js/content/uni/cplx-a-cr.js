// c-cauchy-riemann and c-harmonic-conj (module C, part a, step U10).
//
// c-cauchy-riemann: f(x + iy) split into u + iv (cvalue with z = x + iy,
// final: one imaginary term), the four partial derivatives (equiv in x and
// y), then either f′(z) = u_x + i v_x written in z (holomorphic f) or the
// points where Cauchy-Riemann holds (judge system: an isolated point, so f
// is holomorphic on no open set). Functions: z² + pz, z³, e^z, sinh z,
// cosh z; |z − c|², z·Re z, |z|² + i(px + qy), z̄².
// c-harmonic-conj: v = Im f for f = a z² + b z³ + c z + e·e^z + d·i z²
// (level 5 and open: z³ + e^(z²) + c z): Δv = 0 (equiv), u by the gradient
// (antideriv with grad = (v_y, −v_x), name u), f(z) in z with a real
// constant C (cvalue, z = x + iy, C a real sample letter).

import {
  M, rd, term, joinT, CV, EQXY, KEYS_XY, linesOf, choice, opt, H, examTag, problemItem, multiOf,
} from './cplx-a-kit.js';
import { t } from '../../i18n.js';

const KEYS = KEYS_XY;
const eq = (math, note, subgoal, blank) => ({ math, note, subgoal, blank });
const pd = (f, v) => `pd(${f}, ${v})`;

// ======================================================================
// c-cauchy-riemann
// ======================================================================

const CR = 'c-cauchy-riemann';
const CR_SUB = [
  { id: 'uv', label: t('u et v'), skill: CR },
  { id: 'partials', label: t('dérivées partielles'), skill: 'a2-partials' },
  { id: 'compare', label: t('comparer u_x et v_y, u_y et −v_x'), skill: CR },
  { id: 'conclude', label: 'conclure', skill: CR },
];

// {name (z), start (x, y), lines (u + iv), u, v, ux, uy, vx, vy, holo, fp | sys, sol}
function holoData(rng) {
  const kind = rng.pick(['sq', 'sq', 'cube', 'exp', 'sinh', 'cosh']);
  if (kind === 'sq') {
    const p = rng.pick([1, 2, 3, -1, -2]);
    const u = joinT(['x^2', '-y^2', term(p, 'x')]);
    const v = joinT(['2xy', term(p, 'y')]);
    return {
      key: `sq:${p}`, name: joinT(['z^2', term(p, 'z')]), start: `(x+iy)^2${p < 0 ? '-' : '+'}${Math.abs(p) === 1 ? '' : Math.abs(p)}(x+iy)`,
      lines: [joinT(['x^2', '2i·xy', '-y^2', term(p, 'x'), term(p, 'i·y')]), `${u}+i(${v})`], u, v,
      ux: joinT(['2x', String(p)]), vy: joinT(['2x', String(p)]), uy: '-2y', vx: '2y', holo: true, fp: joinT(['2z', String(p)]),
    };
  }
  if (kind === 'cube') {
    return {
      key: 'cube', name: 'z^3', start: '(x+iy)^3', lines: ['x^3-3xy^2+i(3x^2y-y^3)'], u: 'x^3-3xy^2', v: '3x^2y-y^3',
      ux: '3x^2-3y^2', vy: '3x^2-3y^2', uy: '-6xy', vx: '6xy', holo: true, fp: '3z^2',
    };
  }
  if (kind === 'exp') {
    return {
      key: 'exp', name: 'e^z', start: 'e^(x+iy)', lines: ['e^x·cos(y)+i·e^x·sin(y)'], u: 'e^x·cos(y)', v: 'e^x·sin(y)',
      ux: 'e^x·cos(y)', vy: 'e^x·cos(y)', uy: '-e^x·sin(y)', vx: 'e^x·sin(y)', holo: true, fp: 'e^z',
    };
  }
  if (kind === 'sinh') {
    return {
      key: 'sinh', name: 'sinh(z)', start: 'sinh(x+iy)', lines: ['sinh(x)cos(y)+i·cosh(x)sin(y)'], u: 'sinh(x)cos(y)', v: 'cosh(x)sin(y)',
      ux: 'cosh(x)cos(y)', vy: 'cosh(x)cos(y)', uy: '-sinh(x)sin(y)', vx: 'sinh(x)sin(y)', holo: true, fp: 'cosh(z)',
    };
  }
  return {
    key: 'cosh', name: 'cosh(z)', start: 'cosh(x+iy)', lines: ['cosh(x)cos(y)+i·sinh(x)sin(y)'], u: 'cosh(x)cos(y)', v: 'sinh(x)sin(y)',
    ux: 'sinh(x)cos(y)', vy: 'sinh(x)cos(y)', uy: '-cosh(x)sin(y)', vx: 'cosh(x)sin(y)', holo: true, fp: 'sinh(z)',
  };
}

const sh = (v, a) => (a === 0 ? v : `(${v}${a > 0 ? '-' : '+'}${Math.abs(a)})`);
function nonHoloData(rng) {
  const kind = rng.pick(['abs', 'abs', 're', 'lin', 'conj2']);
  if (kind === 'abs') {
    const a = rng.int(-2, 2);
    const b = rng.int(-2, 2);
    const c = joinT([String(a), term(b, 'i')]);
    const u = `${sh('x', a)}^2+${sh('y', b)}^2`;
    return {
      key: `abs:${a}:${b}`, name: `|${joinT(['z', String(-a), term(-b, 'i')])}|^2`, start: `|${joinT(['x', String(-a), 'iy', term(-b, 'i')])}|^2`,
      lines: [u], u, v: '0', ux: a ? `2${sh('x', a)}` : '2x', vy: '0', uy: b ? `2${sh('y', b)}` : '2y', vx: '0', holo: false,
      sys: `${a ? `2${sh('x', a)}` : '2x'} = 0 ; ${b ? `2${sh('y', b)}` : '2y'} = 0`, sol: [a, b],
    };
  }
  if (kind === 're') {
    return {
      key: 're', name: 'z·Re(z)', start: '(x+iy)x', lines: ['x^2+i·xy'], u: 'x^2', v: 'xy',
      ux: '2x', vy: 'x', uy: '0', vx: 'y', holo: false, sys: '2x = x ; 0 = -y', sol: [0, 0],
    };
  }
  if (kind === 'lin') {
    const p = rng.pick([2, -2, 4, -4]);
    const qq = rng.pick([2, -2, 4, 6]);
    const v = joinT([term(p, 'x'), term(qq, 'y')]);
    return {
      key: `lin:${p}:${qq}`, name: `|z|^2+i(${v})`, start: `|x+iy|^2+i(${v})`, lines: [`x^2+y^2+i(${v})`], u: 'x^2+y^2', v,
      ux: '2x', vy: String(qq), uy: '2y', vx: String(p), holo: false, sys: `2x = ${qq} ; 2y = ${-p}`, sol: [qq / 2, -p / 2],
    };
  }
  return {
    key: 'conj2', name: 'conj(z)^2', start: '(x-iy)^2', lines: ['x^2-y^2-2i·xy'], u: 'x^2-y^2', v: '-2xy',
    ux: '2x', vy: '-2x', uy: '-2y', vx: '-2y', holo: false, sys: '2x = -2x ; -2y = 2y', sol: [0, 0],
  };
}

const CR_MENU = (right) => [
  { id: 'uv', label: t('Remplacer z par x + iy, puis séparer partie réelle et partie imaginaire') },
  { id: 'dx', label: t('Dériver par rapport à x (y est une constante)') },
  { id: 'dy', label: t('Dériver par rapport à y (x est une constante)') },
  { id: 'fp', label: t('f′(z) = u_x + i v_x, puis écrire en z') },
  { id: 'sys', label: t('Résoudre u_x = v_y et u_y = −v_x') },
  { id: 'abs', label: t('Prendre u = |f| et v = arg f'), why: t('u et v sont les parties réelle et imaginaire de f.') },
].map((o) => ({ ...o, valid: o.id === right, why: o.why || t('Ce n\'est pas l\'étape à faire maintenant.') }));

function crParts(d, level) {
  const split = CV({ vars: ['x', 'y'], real: ['x', 'y'], final: 'split' });
  const parts = [];
  const uvLines = d.lines.map((m, i) => eq(m, i === 0 ? 'z = x + iy' : t('regrouper les termes en i'), 'uv', i === d.lines.length - 1 ? [d.v === '0' ? d.u : d.v] : []));
  const start = d.start;
  if (level === 1) {
    parts.push({ html: t('On a {a} et {b}.', { a: M(`u = ${d.u}`), b: M(`v = ${d.v}`) }), ask: 'u_x =', start: pd(d.u, 'x'), judge: EQXY(), lines: [eq(d.ux, t('y constante'), 'partials', [d.ux])], menu: CR_MENU('dx') });
  } else {
    parts.push({
      start, judge: split, lines: uvLines, menu: CR_MENU('uv'),
      decisions: [{
        kind: 'decision', prompt: t('Comment étudier f ?'), levels: [3], options: [
          { id: 'uv', label: t('Écrire u et v, puis vérifier Cauchy-Riemann'), valid: true, ref: true },
          d.holo
            ? { id: 'comp', label: t('Reconnaître une fonction holomorphe connue'), valid: true, quality: 'poor', why: t('Juste, mais on demande ici de vérifier Cauchy-Riemann avec u et v.') }
            : { id: 'comp', label: t('Reconnaître une fonction holomorphe connue'), valid: false, rule: 'c_conj_not_holo', why: t('{name} contient z̄, |z| ou Re z : ce n\'est pas une composition de fonctions holomorphes.', { name: rd(d.name) }) },
        ],
      }],
    });
    parts.push({ html: t('Les dérivées partielles :'), ask: 'u_x =', start: pd(d.u, 'x'), judge: EQXY(), lines: [eq(d.ux, t('y constante'), 'partials', [d.ux])], menu: CR_MENU('dx') });
  }
  parts.push({ html: t('Puis v_y :'), ask: 'v_y =', start: pd(d.v, 'y'), judge: EQXY(), lines: [eq(d.vy, t('x constante'), 'partials', [d.vy])], menu: CR_MENU('dy') });
  parts.push({ html: 'u_y :', ask: 'u_y =', start: pd(d.u, 'y'), judge: EQXY(), lines: [eq(d.uy, t('x constante'), 'partials', [d.uy])], menu: CR_MENU('dy') });
  parts.push({ html: 'v_x :', ask: 'v_x =', start: pd(d.v, 'x'), judge: EQXY(), lines: [eq(d.vx, t('y constante'), 'partials', [d.vx])], menu: CR_MENU('dx') });
  const compare = {
    kind: 'decision', prompt: t('Les équations de Cauchy-Riemann sont :'), options: [
      { id: 'cr', label: t('u_x = v_y et u_y = −v_x'), valid: true },
      { id: 'sign', label: t('u_x = v_y et u_y = v_x'), valid: false, rule: 'c_cr_sign', why: t('Le signe : u_y = −v_x.') },
      { id: 'swap', label: t('u_x = u_y et v_x = v_y'), valid: false, why: t('On compare la dérivée de u en x avec celle de v en y.') },
    ],
  };
  if (d.holo) {
    parts.push({
      html: level <= 2 ? t('u_x = v_y = {ux} et u_y = −v_x = {uy} partout : f est holomorphe sur ℂ, et f′ = u_x + i v_x.', { ux: M(d.ux), uy: M(d.uy) }) : t('Conclus, et calcule la dérivée :'), ask: 'f′(z) =',
      start: `${d.ux}+i(${d.vx})`, judge: CV({ vars: ['x', 'y', 'z'], real: ['x', 'y'], z: true, final: 'z' }), decisions: [compare],
      lines: [eq(d.fp, t('écrire en z = x + iy'), 'conclude', [d.fp])], menu: CR_MENU('fp'),
    });
  } else {
    parts.push({
      html: t('Cauchy-Riemann n\'est vérifié qu\'aux points solutions du système :'), ask: '⇔',
      start: d.sys, judge: { kind: 'system', vars: ['x', 'y'], solutions: [d.sol.map(String)] }, decisions: [compare],
      lines: [eq(`x = ${d.sol[0]} ; y = ${d.sol[1]}`, t('un seul point : f n\'est holomorphe sur aucun ouvert'), 'conclude', [String(d.sol[0]), String(d.sol[1])])], menu: CR_MENU('sys'),
    });
  }
  // The first part's html when the item starts with u, v given.
  return parts;
}

function crLines(level, rng, opts, holo = rng.chance(0.55)) {
  const d = holo ? holoData(rng) : nonHoloData(rng);
  return linesOf({
    level, skill: CR, key: `${CR}:${level}:${d.key}`, keys: KEYS, subgoals: CR_SUB, exam: examTag(opts, 2.5),
    prompt: t('{a}. Écris u et v, calcule leurs dérivées partielles et étudie les équations de Cauchy-Riemann.', { a: M(`f(z) = ${d.name}`) }),
    parts: crParts(d, level),
    hints: H(t('Écris u = Re f et v = Im f en x et y, puis compare u_x avec v_y et u_y avec −v_x.'), `${M(`u_x = ${d.ux}`)}, ${M(`v_y = ${d.vy}`)}`, d.holo ? `f′(z) = ${M(d.fp)}` : M(d.sys)),
  });
}

function crProblem(level, rng, opts) {
  const a = crLines(4, rng, {}, true);
  const b = crLines(4, rng, {}, false);
  const first = rng.chance(0.5);
  const [p1, p2] = first ? [a, b] : [b, a];
  return problemItem({
    skill: CR, level, key: `${level}:${p1.key}:${p2.key}`, exam: examTag(opts, 6),
    prompt: t('Étudie l\'holomorphie des deux fonctions (Cauchy-Riemann).'),
    parts: [{ item: p1, points: 3, title: t('Première fonction') }, { item: p2, points: 3, title: t('Seconde fonction') }],
  });
}

const HOLO = ['z^2+3z', 'e^z', 'sinh(z)', 'z^3', 'cos(z)', 'e^(2z)', 'z^2·e^z'];
const NONHOLO = [['conj(z)', 'c_conj_not_holo'], ['|z|^2', 'c_conj_not_holo'], ['z·Re(z)', 'c_conj_not_holo'], ['e^(conj(z))', 'c_conj_not_holo'], ['x^2-y^2+i(2xy+y)', null], ['Im(z)', 'c_conj_not_holo']];

function crMcq(level, rng, opts) {
  if (opts.multi) {
    const pool = [...HOLO.map((f) => ({ html: M(`f(z) = ${f}`), correct: true })), ...NONHOLO.map(([f, r]) => ({ html: M(`f(z) = ${f}`), correct: false, rule: r }))];
    const s = multiOf(rng, pool.map((x) => ({ ...x, truth: x.correct })), 5);
    return choice({ skill: CR, level, multi: true, key: `multi:${s.map((x) => pool.findIndex((y) => y.html === x.html)).join('')}`, exam: examTag(opts, 2), prompt: t('Cochez les fonctions holomorphes sur ℂ (z = x + iy).'), options: s.map(({ truth, ...x }) => x) }, rng);
  }
  const right = rng.pick(HOLO);
  const wrongs = [];
  const pool = [...NONHOLO];
  while (wrongs.length < 3) { const [f, r] = pool.splice(rng.int(0, pool.length - 1), 1)[0]; wrongs.push(opt(`f(z) = ${f}`, r)); }
  return choice({
    skill: CR, level, key: `mcq:${right}:${wrongs.map((w) => w.html.length).join('')}`, exam: examTag(opts, 2),
    prompt: t('Laquelle de ces fonctions est holomorphe sur ℂ (z = x + iy) ?'),
    right: M(`f(z) = ${right}`), wrongs,
    solution: [{ html: t('{a} est une composition de fonctions holomorphes. Pour z̄ : u_x = 1 ≠ v_y = −1.', { a: M(`f(z) = ${right}`) }), note: '' }],
  }, rng);
}

// ======================================================================
// c-harmonic-conj
// ======================================================================

const HC = 'c-harmonic-conj';
const HC_SUB = [
  { id: 'harmonic', label: 'Δv = 0', skill: HC },
  { id: 'integrate', label: t('u_x = v_y, intégrer en x'), skill: HC },
  { id: 'compare', label: t('u_y = −v_x fixe α(y)'), skill: 'c-cauchy-riemann' },
  { id: 'in-z', label: t('écrire f en z'), skill: HC },
];

// v = Im f for f = a z² + b z³ + c z + e e^z + d i z² (+ g e^(z²)).
function hcData(rng, big = false) {
  for (let k = 0; k < 200; k++) {
    const a = rng.pick([0, 0, 1, 2, 3, -1]);
    const b = rng.pick([0, 0, 1]);
    const c = rng.pick([0, 1, 2, 3, -2, -3]);
    const e = big ? 0 : rng.pick([0, 0, 0, 1]);
    const d = a ? 0 : rng.pick([0, 0, 1]);
    const g = big ? 1 : 0;
    const bb = big ? 1 : b;
    const n = [a, bb, c, e, d, g].filter(Boolean).length;
    if (n < (big ? 2 : 1) || n > 3) continue;
    // v must depend on x and on y.
    if (!a && !bb && !e && !d && !g) continue;
    const T = (c0, body) => term(c0, body);
    const v = joinT([T(2 * a, 'xy'), T(3 * bb, 'x^2y'), T(-bb, 'y^3'), T(c, 'y'), T(e, 'e^x·sin(y)'), T(d, 'x^2'), T(-d, 'y^2'), g ? 'e^(x^2-y^2)·sin(2xy)' : '']);
    const vx = joinT([T(2 * a, 'y'), T(6 * bb, 'xy'), T(e, 'e^x·sin(y)'), T(2 * d, 'x'), g ? '2e^(x^2-y^2)(x·sin(2xy)+y·cos(2xy))' : '']);
    const vy = joinT([T(2 * a, 'x'), T(3 * bb, 'x^2'), T(-3 * bb, 'y^2'), String(c), T(e, 'e^x·cos(y)'), T(-2 * d, 'y'), g ? '2e^(x^2-y^2)(x·cos(2xy)-y·sin(2xy))' : '']);
    const vxx = joinT([T(6 * bb, 'y'), T(e, 'e^x·sin(y)'), String(2 * d)]);
    const vyy = joinT([T(-6 * bb, 'y'), T(-e, 'e^x·sin(y)'), String(-2 * d)]);
    const lapSum = joinT([T(6 * bb, 'y'), T(e, 'e^x·sin(y)'), String(2 * d), T(-6 * bb, 'y'), T(-e, 'e^x·sin(y)'), String(-2 * d)]);
    // u = ∫ v_y dx + α(y), α = −a y².
    const uint = joinT([T(a, 'x^2'), T(bb, 'x^3'), T(-3 * bb, 'xy^2'), T(c, 'x'), T(e, 'e^x·cos(y)'), T(-2 * d, 'xy'), g ? 'e^(x^2-y^2)·cos(2xy)' : '']);
    const u = joinT([uint, T(-a, 'y^2')]);
    const fz = joinT([term(bb, 'z^3'), term(a, 'z^2'), term(d, 'i·z^2'), term(c, 'z'), term(e, 'e^z'), g ? 'e^(z^2)' : '']);
    const wrongCR = a ? joinT([uint, T(a, 'y^2')]) : null;
    const conjF = joinT([term(bb, 'z^3'), term(a, 'conj(z)^2'), term(d, 'i·z^2'), term(c, 'z'), term(e, 'e^z'), g ? 'e^(z^2)' : '']);
    return { a, b: bb, c, e, d, g, v, vx, vy, vxx, vyy, lapSum, uint, u, fz, wrongCR, conjF, key: `${a}:${bb}:${c}:${e}:${d}:${g}` };
  }
  return null;
}
const FALLBACK = { a: 1, b: 0, c: 3, e: 0, d: 0, g: 0, v: '2xy+3y', vx: '2y', vy: '2x+3', vxx: '0', vyy: '0', lapSum: '0', uint: 'x^2+3x', u: 'x^2+3x-y^2', fz: 'z^2+3z', wrongCR: 'x^2+3x+y^2', conjF: 'conj(z)^2+3z', key: 'fallback', fallback: true };

function hcParts(d, level) {
  const lap = `${pd(pd(d.v, 'x'), 'x')}+${pd(pd(d.v, 'y'), 'y')}`;
  const lapLines = d.g || (d.vxx === '0' && d.vyy === '0') ? [eq('0', 'v_xx + v_yy', 'harmonic', ['0'])] : [eq(d.lapSum, 'v_xx + v_yy', 'harmonic', [d.vxx]), eq('0', '', 'harmonic', ['0'])];
  const grad = { kind: 'antideriv', grad: [d.vy, `-(${d.vx})`], vars: ['x', 'y'], name: 'u', traps: d.wrongCR ? { c_cr_sign: [`u = ${d.wrongCR}+C`] } : {} };
  const hasAlpha = d.a !== 0;
  const parts = [];
  {
    parts.push({ html: t('v doit être harmonique :'), ask: 'Δv =', start: lap, judge: EQXY('constant'), lines: lapLines, menu: HC_MENU('lap') });
    parts.push({
      html: t('u_x = v_y, intégré en x, puis u_y = −v_x :'), ask: 'u =', start: `u = int(${d.vy}, x)`, judge: grad,
      decisions: [{
        kind: 'decision', prompt: t('Comment trouver u ?'), levels: [3], options: [
          { id: 'cr', label: t('Intégrer les équations de Cauchy-Riemann'), valid: true, ref: true },
          { id: 'guess', label: t('Reconnaître Im de zⁿ, de e^z, de e^(z²)'), valid: true },
          { id: 'sign', label: t('Intégrer u_y = v_x'), valid: false, rule: 'c_cr_sign', why: t('Cauchy-Riemann : u_y = −v_x.') },
        ],
      }],
      lines: [eq(`u = ${d.uint}+α(y)`, t('u_x = v_y, intégré en x'), 'integrate', [d.uint]), eq(`u = ${d.u}+C`, t('u_y = −v_x fixe α(y)'), 'compare', hasAlpha ? [term(-d.a, 'y^2')] : [d.uint])],
      menu: HC_MENU('int'),
    });
  }
  parts.push({
    html: level <= 2 ? t('Sur l\'axe réel, f(x) = u(x, 0) + i v(x, 0) ; puis on remplace x par z :') : t('f = u + iv, écrite en z :'), ask: 'f(z) =',
    start: `${d.u}+C+i(${d.v})`, judge: CV({ vars: ['x', 'y', 'z', 'C'], real: ['x', 'y', 'C'], z: true, final: 'z' }),
    decisions: [{
      kind: 'decision', prompt: t('La constante C est :'), options: [
        { id: 'real', label: t('réelle : Im f = v est imposée'), valid: true },
        { id: 'cplx', label: t('complexe quelconque'), valid: false, rule: 'c_harmonic_const_imag', why: t('Une constante iC changerait v = Im f, qui est donnée.') },
      ],
    }],
    lines: [eq(`${d.fz}+C`, t('f(x) = u(x, 0) + i v(x, 0), puis x → z'), 'in-z', [d.fz])],
    menu: HC_MENU('z'),
  });
  return parts;
}
const HC_MENU = (right) => [
  { id: 'lap', label: t('Calculer v_xx + v_yy') },
  { id: 'int', label: t('Intégrer u_x = v_y en x, puis u_y = −v_x') },
  { id: 'z', label: t('Écrire f(x) = u(x, 0) + i v(x, 0), puis remplacer x par z') },
  { id: 'sign', label: t('Intégrer u_y = v_x'), rule: 'c_cr_sign', why: t('Cauchy-Riemann : u_y = −v_x.') },
].map((o) => ({ ...o, valid: o.id === right, why: o.why || t('Ce n\'est pas l\'étape à faire maintenant.') }));

function hcLines(level, rng, opts, big = false) {
  const d = hcData(rng, big) || FALLBACK;
  return linesOf({
    level, skill: HC, key: `${HC}:${level}:${d.key}`, keys: KEYS, subgoals: HC_SUB, exam: examTag(opts, 5), fallback: d.fallback,
    prompt: t('Trouve f holomorphe sur ℂ telle que {a}, et écris-la en z.', { a: M(`Im(f) = ${d.v}`) }),
    parts: hcParts(d, level),
    hints: H(t('Vérifie Δv = 0, puis u_x = v_y donne u à une fonction α(y) près ; u_y = −v_x fixe α.'), M(`u = ${d.uint}+α(y)`), M(`u = ${d.u}+C`)),
  });
}

function hcProblem(level, rng, opts) {
  const it = hcLines(4, rng, {}, true);
  return problemItem({
    skill: HC, level, prompt: it.prompt, key: `${level}:${it.key}`, exam: examTag(opts, 5),
    parts: [{ item: { ...it, prompt: '' }, points: [1, 2, 2] }],
  });
}

const HC_STATEMENTS = [
  { html: t('{a} est la partie imaginaire d\'une fonction holomorphe', { a: M('v = x^2-y^2') }), truth: true },
  { html: t('{a} est la partie imaginaire d\'une fonction holomorphe', { a: M('v = x^2+y^2') }), truth: false },
  { html: t('si v est donnée, f est déterminée à une constante réelle près'), truth: true },
  { html: t('si v est donnée, f est déterminée à une constante complexe près'), truth: false, rule: 'c_harmonic_const_imag' },
  { html: t('la partie réelle d\'une fonction holomorphe est harmonique'), truth: true },
  { html: t('{a} pour toute fonction holomorphe f = u + iv', { a: M('u_y = v_x') }), truth: false, rule: 'c_cr_sign' },
];

function hcMcq(level, rng, opts) {
  if (opts.multi) {
    const s = multiOf(rng, HC_STATEMENTS, 5);
    return choice({ skill: HC, level, multi: true, key: `multi:${s.map((x) => HC_STATEMENTS.indexOf(x)).join('')}`, exam: examTag(opts, 2), prompt: t('Cochez les affirmations vraies.'), options: s.map((x) => ({ html: x.html, correct: x.truth, rule: x.truth ? null : x.rule ?? null })) }, rng);
  }
  let d = null;
  for (let k = 0; k < 50 && !(d && d.a); k++) d = hcData(rng);
  if (!d || !d.a) d = FALLBACK;
  return choice({
    skill: HC, level, key: `mcq:${d.key}`, exam: examTag(opts, 2), fallback: d.fallback,
    prompt: t('f est holomorphe sur ℂ et {a}. Alors :', { a: M(`Im(f) = ${d.v}`) }),
    right: `${M(`f(z) = ${d.fz}+C`)}, C ∈ ℝ`,
    wrongs: [
      { html: `${M(`f(z) = ${d.conjF}+C`)}, C ∈ ℝ`, rule: 'c_cr_sign' },
      { html: `${M(`f(z) = ${d.fz}+C`)}, C ∈ ℂ`, rule: 'c_harmonic_const_imag' },
      { html: `${M(`f(z) = i(${d.fz})+C`)}, C ∈ ℝ` },
    ],
    solution: [{ html: t('u = {u} + C par Cauchy-Riemann ; sur l\'axe réel f(x) = u(x, 0) + i v(x, 0), donc {a} avec C réel.', { u: M(d.u), a: M(`f(z) = ${d.fz}+C`) }), note: '' }],
    expectedSec: 150,
  }, rng);
}

export const GEN = {
  [CR]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return crMcq(4, rng, opts);
    if (opts.exam === 'open' || level === 5) return crProblem(level === 5 ? 5 : 4, rng, opts);
    return crLines(level, rng, opts);
  },
  [HC]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return hcMcq(4, rng, opts);
    if (opts.exam === 'open' || level === 5) return hcProblem(level === 5 ? 5 : 4, rng, opts);
    return hcLines(level, rng, opts);
  },
};
