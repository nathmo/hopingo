// c-elem-fn and c-equations (module C, part a, step U10).
//
// c-elem-fn: Log z (|z|, Arg z, then ln|z| + i Arg z), z^α = e^(α Log z),
// cos(bi), sin(bi), |e^z|; level 5: |cos(x + iy)|² then « cos z est-il
// borné ? ». Parts judged by cvalue (js/judges/cplx-ca.js): the final
// forms of the course (e^(−π/2), ln √2 − 3πi/4).
// c-equations: a cosh z + b sinh z = c (w = e^z) and q cos z = p, q sin z =
// p (w = e^(iz)), built from the roots w₁, w₂. Three parts: the polynomial
// in w (cfamily, final 'poly'), its roots (complex, set), the families
// z = Log w + 2kπi (cfamily, final 'family').

import { CQ, carg, cabs, exactComplex } from '../../cas/complex.js';
import { parse } from '../../cas/parse.js';
import {
  q, cq, M, rd, zt, piT, piIT, joinT, term, CV, CF, SETW, KEYS, linesOf, choice, opt, H, examTag, problemItem, multiOf,
} from './cplx-a-kit.js';
import { t } from '../../i18n.js';

// ======================================================================
// c-elem-fn
// ======================================================================

const EF = 'c-elem-fn';
const EF_SUB = [
  { id: 'modulus', label: t('module |z|'), skill: 'g8-polar' },
  { id: 'arg', label: t('argument principal'), skill: 'g8-polar' },
  { id: 'log', label: 'Log z = ln|z| + i Arg z', skill: EF },
  { id: 'def', label: t('définition de z^α, cos z, e^z'), skill: EF },
  { id: 'hyp', label: 'cos(iy) = cosh y', skill: 'g2-hyp-def' },
];

// Points z = a + bi of nice modulus and argument: {z, sq, r, ln, t (Arg/π)}.
const PARTS = [['1', '1', 1, 1], ['1', '√3', 1, 3], ['√3', '1', 3, 1], ['2', '2', 4, 4], ['0', '1', 0, 1], ['0', '2', 0, 4], ['0', '3', 0, 9], ['1', '0', 1, 0], ['2', '0', 4, 0]];
const R_OF = { 1: ['1', ''], 2: ['√2', 'ln(√2)'], 4: ['2', 'ln(2)'], 8: ['2√2', 'ln(2√2)'], 9: ['3', 'ln(3)'] };
const imT = (b) => (b === '1' ? 'i' : b === '√3' ? 'i√3' : `${b}i`);
function logPoints() {
  const out = [];
  for (const [a, b, a2, b2] of PARTS) {
    for (const sa of [1, -1]) {
      for (const sb of [1, -1]) {
        if ((a === '0' && sa < 0) || (b === '0' && sb < 0)) continue;
        const re = a === '0' ? '' : `${sa < 0 ? '-' : ''}${a}`;
        const im = b === '0' ? '' : `${sb < 0 ? '-' : ''}${imT(b)}`;
        const z = joinT([re, im]);
        const x = sa * (a === '√3' ? Math.sqrt(3) : Number(a));
        const y = sb * (b === '√3' ? Math.sqrt(3) : Number(b));
        const tt = Math.round((Math.atan2(y, x) / Math.PI) * 12);
        const [r, ln] = R_OF[a2 + b2];
        out.push({ z, sq: `${a2}+${b2}`, zero: a2 === 0 || b2 === 0, r, ln, t: q(tt, 12), negReal: b === '0' && sa < 0, posReal: b === '0' && sa > 0 });
      }
    }
  }
  return out.filter((p) => !p.posReal);
}
const LOGS = logPoints();

function logData(rng, level) {
  const pool = LOGS.filter((p) => (level <= 3 ? !p.negReal : true));
  const p = rng.pick(pool);
  const logT = joinT([p.ln, piIT(p.t)]);
  return { kind: 'log', ...p, logT, key: `log:${p.z}` };
}

// z^α = e^(α Log z): z on the unit circle with α ∈ {i, 2i, −i, 1 + i, i/2},
// or z of modulus 2 or 4 with α = 1/2 (a square root).
const POW_Z1 = [['i', q(1, 2)], ['-1', q(1)], ['-i', q(-1, 2)]];
const POW_A = [['i', 0, 1], ['2i', 0, 2], ['-i', 0, -1], ['1+i', 1, 1], ['i/2', 0, q(1, 2)]];
const POW_Z2 = [['2i', '2', 'ln(2)', q(1, 2)], ['-4', '4', 'ln(4)', q(1)], ['4i', '4', 'ln(4)', q(1, 2)], ['-2i', '2', 'ln(2)', q(-1, 2)], ['1+i√3', '2', 'ln(2)', q(1, 3)], ['-4i', '4', 'ln(4)', q(-1, 2)]];
// Exact cos and sin of tπ for t a multiple of 1/4 or 1/6 (texts).
function cosSin(tt) {
  const k = ((Math.round(q(tt).valueOf() * 12) % 24) + 24) % 24;
  const C = { 0: '1', 2: '√3/2', 3: '√2/2', 4: '1/2', 6: '0', 8: '-1/2', 9: '-√2/2', 10: '-√3/2', 12: '-1', 14: '-√3/2', 15: '-√2/2', 16: '-1/2', 18: '0', 20: '1/2', 21: '√2/2', 22: '√3/2' };
  const S = { 0: '0', 2: '1/2', 3: '√2/2', 4: '√3/2', 6: '1', 8: '√3/2', 9: '√2/2', 10: '1/2', 12: '0', 14: '-1/2', 15: '-√2/2', 16: '-√3/2', 18: '-1', 20: '-√3/2', 21: '-√2/2', 22: '-1/2' };
  return C[k] !== undefined && S[k] !== undefined ? [C[k], S[k]] : null;
}
// m·(c + i s) as text, m a text factor ('' for 1, '√2', 'e^(-π/2)').
function polarText(m, tt) {
  const cs = cosSin(tt);
  if (!cs) return null;
  const [c, s] = cs;
  const mul = (x) => {
    if (x === '0') return '';
    if (!m) return x;
    if (x === '1') return m;
    if (x === '-1') return `-${m}`;
    // √2·√2/2 = 1, 2·√3/2 = √3: products of a root and a radical.
    if (m === '√2' && /^-?√2\/2$/.test(x)) return x.startsWith('-') ? '-1' : '1';
    if (m === '2' && /\/2$/.test(x)) return x.replace('/2', '');
    if (m === '√2' && /^-?√3\/2$/.test(x)) return x.replace('√3/2', '√6/2');
    if (m === '√2' && /^-?1\/2$/.test(x)) return x.replace('1/2', '√2/2');
    return `${x.startsWith('-') ? '-' : ''}(${x.replace('-', '')})${m}`;
  };
  const re = mul(c);
  let im = mul(s);
  if (im) im = im === '1' ? 'i' : im === '-1' ? '-i' : im === m && m.startsWith('e') ? `i${m}` : im === `-${m}` && m.startsWith('e') ? `-i${m}` : `${im}i`;
  return joinT([re, im]);
}

function powData(rng) {
  for (let k = 0; k < 200; k++) {
    if (rng.chance(0.65)) {
      const [z, tt] = rng.pick(POW_Z1);
      const [al, a, b] = rng.pick(POW_A);
      // e^(α·iθ) = e^(−bθπ)·e^(i·aθπ).
      const mod = q(b).mul(tt).neg();
      const ang = q(a).mul(tt);
      const m = mod.n === 0 ? '' : `e^(${piT(mod)})`;
      const fin = polarText(m, ang);
      if (!fin || (a !== 0 && ang.d > 2 && m)) continue;
      const logz = piIT(tt);
      const exp1 = `e^(${al === 'i' ? 'i' : `(${al})`}·${logz.startsWith('-') ? `(${logz})` : logz})`;
      const lines = [`e^(${al === 'i' ? 'i' : `(${al})`}·Log(${z}))`, exp1];
      if (a !== 0 && mod.n !== 0) lines.push(`e^(${joinT([piT(mod), piIT(ang)])})`);
      lines.push(fin);
      return { kind: 'pow', z, al, start: `${z.length > 1 ? `(${z})` : z}^${al.length > 1 ? `(${al})` : al}`, lines, fin, key: `pow:${z}:${al}` };
    }
    const [z, r, ln, tt] = rng.pick(POW_Z2);
    const ang = tt.div(2);
    const m = r === '4' ? '2' : '√2';
    const fin = polarText(m, ang);
    if (!fin) continue;
    const lines = [`e^((1/2)·Log(${z}))`, `e^((1/2)(${joinT([ln, piIT(tt)])}))`, `${m}e^(${piIT(ang)})`, fin];
    return { kind: 'pow', z, al: '1/2', start: `(${z})^(1/2)`, lines, fin, key: `sqrt:${z}` };
  }
  return { kind: 'pow', z: 'i', al: 'i', start: 'i^i', lines: ['e^(i·Log(i))', 'e^(i·(π/2)i)', 'e^(-π/2)'], fin: 'e^(-π/2)', key: 'pow:fallback', fallback: true };
}

// cos(bi), sin(bi), |e^(a + bi)|.
function trigData(rng) {
  const b = rng.pick([1, 2, 3]);
  const kind = rng.pick(['cos', 'sin', 'abs']);
  const bi = b === 1 ? 'i' : `${b}i`;
  const eb = b === 1 ? 'e' : `e^${b}`;
  if (kind === 'cos') {
    return { kind, start: `cos(${bi})`, lines: [`(e^(i·${bi})+e^(-i·${bi}))/2`, `(e^(-${b})+${eb})/2`], fin: `(e^(-${b})+${eb})/2`, key: `cos:${b}`, b };
  }
  if (kind === 'sin') {
    return { kind, start: `sin(${bi})`, lines: [`(e^(i·${bi})-e^(-i·${bi}))/(2i)`, `(e^(-${b})-${eb})/(2i)`, `i(${eb}-e^(-${b}))/2`], fin: `i(${eb}-e^(-${b}))/2`, key: `sin:${b}`, b };
  }
  const a = rng.pick([1, 2, 3, -1, -2]);
  const ea = a === 1 ? 'e' : `e^${a < 0 ? `(${a})` : a}`;
  return { kind, start: `|e^(${a}+${bi})|`, lines: [`|${ea}|·|e^(${bi})|`, ea], fin: ea, key: `abs:${a}:${b}`, a, b };
}

const EF_MENU = (right) => [
  { id: 'mod', label: '|a + bi| = √(a² + b²)' },
  { id: 'arg', label: t('Arg z dans ]−π ; π], selon le quadrant') },
  { id: 'log', label: 'Log z = ln|z| + i Arg z' },
  { id: 'pow', label: 'z^α = e^(α Log z)' },
  { id: 'cos', label: 'cos z = (e^(iz) + e^(−iz))/2, sin z = (e^(iz) − e^(−iz))/(2i)' },
  { id: 'abs', label: '|e^z| = e^(Re z) : |e^(iy)| = 1' },
  { id: 'branch', label: t('Prendre Arg dans [0 ; 2π['), rule: 'c_log_branch', why: t('L\'argument principal est dans ]−π ; π], pas dans [0 ; 2π[.') },
].map((o) => ({ ...o, valid: o.id === right, why: o.why || t('Ce n\'est pas la formule à utiliser ici.') }));

const eq = (math, note, subgoal, blank) => ({ math, note, subgoal, blank });

function efLines(level, rng, opts) {
  const roll = rng.next();
  const L = { level, keys: KEYS, exam: examTag(opts, 2), subgoals: EF_SUB };
  if (roll < (level <= 2 ? 0.6 : 0.45)) {
    const d = logData(rng, level);
    const cfg = CV();
    const real = CV({ final: 'number' });
    const parts = [];
    const modLines = d.zero ? [eq(d.r, '|a + bi| = √(a² + b²)', 'modulus', [d.r])] : [eq(`√(${d.sq})`, '|a + bi| = √(a² + b²)', 'modulus', [d.sq]), eq(d.r, '', 'modulus', [d.r])];
    const argLine = eq(piT(d.t), t('Arg z ∈ ]−π ; π], selon le quadrant de z'), 'arg', [piT(d.t).replace(/^-/, '')]);
    const logLines = [eq(d.logT, 'Log z = ln|z| + i Arg z', 'log', [d.ln || piIT(d.t), piIT(d.t).replace(/^-/, '').replace(/^\((.*)\)i$/, '$1')].filter(Boolean))];
    if (level === 1) {
      parts.push({ html: t('On donne |z| = {r} et Arg z = {a}.', { r: M(d.r), a: M(piT(d.t)) }), start: `Log(${d.z})`, judge: cfg, lines: logLines, menu: EF_MENU('log') });
    } else {
      parts.push({ start: `|${d.z}|`, judge: real, lines: modLines, menu: EF_MENU('mod') });
      parts.push({ html: t('L\'argument principal :'), ask: 'Arg z =', start: `arg(${d.z})`, judge: real, lines: [argLine], menu: EF_MENU('arg') });
      parts.push({ html: t('Le logarithme principal :'), ask: 'Log z =', start: `Log(${d.z})`, judge: cfg, lines: level === 2 ? logLines : [eq(`ln(|${d.z}|)+i·arg(${d.z})`, 'Log z = ln|z| + i Arg z', 'log'), eq(d.logT, '', 'log')], menu: EF_MENU('log') });
    }
    return linesOf({
      ...L, skill: EF, key: `${EF}:${level}:${d.key}`,
      prompt: level === 1 ? t('Calcule le logarithme principal {a}.', { a: M(`Log(${d.z})`) }) : t('Calcule le logarithme principal {a} : d\'abord |z| et Arg z.', { a: M(`Log(${d.z})`) }),
      parts,
      hints: H(t('Log z = ln|z| + i Arg z, avec Arg z dans ]−π ; π].'), `Arg(${rd(d.z)}) = ${rd(piT(d.t))}, |z| = ${rd(d.r)}`, M(`Log(${d.z}) = ${d.logT}`)),
    });
  }
  if (roll < 0.8) {
    const d = powData(rng);
    const lines = d.lines.map((m, i) => eq(m, i === 0 ? 'z^α = e^(α Log z)' : i === 1 ? 'Log z = ln|z| + i Arg z' : '', i === 0 ? 'def' : 'log', i === d.lines.length - 1 ? [d.fin] : i === 0 ? [`Log(${d.z})`] : []));
    return linesOf({
      ...L, skill: EF, key: `${EF}:${level}:${d.key}`, fallback: d.fallback,
      prompt: t('Calcule {start} (détermination principale), sous la forme a + bi.', { start: M(d.start) }),
      parts: [{ start: d.start, judge: CV(), lines, menu: EF_MENU('pow') }],
      hints: H(t('z^α = e^(α Log z) : commence par Log z = ln|z| + i Arg z.'), M(lines[1].math), M(`${d.start} = ${d.fin}`)),
    });
  }
  const d = trigData(rng);
  const isAbs = d.kind === 'abs';
  const lines = d.lines.map((m, i) => eq(m, i === 0 ? (isAbs ? '|e^z| = e^(Re z), |e^(iy)| = 1' : d.kind === 'cos' ? 'cos z = (e^(iz) + e^(−iz))/2' : 'sin z = (e^(iz) − e^(−iz))/(2i)') : i === 1 && !isAbs ? 'i·i = −1' : '', i === 0 ? 'def' : 'hyp', i === d.lines.length - 1 ? [d.fin] : []));
  return linesOf({
    ...L, skill: EF, key: `${EF}:${level}:${d.key}`,
    prompt: isAbs ? t('Calcule {start}.', { start: M(d.start) }) : t('Calcule {start} avec la définition par l\'exponentielle.', { start: M(d.start) }),
    parts: [{ start: d.start, judge: CV(), lines, menu: EF_MENU(isAbs ? 'abs' : 'cos') }],
    hints: H(isAbs ? t('|e^(x + iy)| = eˣ·|e^(iy)|, et |e^(iy)| = 1.') : t('Remplace z par la définition avec e^(iz) ; i·i = −1.'), M(lines[0].math), M(`${d.start} = ${d.fin}`)),
  });
}

// Level 5: |cos(x + iy)|² = cos²x + sinh²y, then « cos z est-il borné ? ».
function efProblem(level, rng, opts) {
  const fn = rng.pick(['cos', 'sin']);
  const c = fn === 'cos';
  const cfg = CV({ vars: ['x', 'y'], real: ['x', 'y'], goal: c ? 'cos(x)^2+sinh(y)^2' : 'sin(x)^2+sinh(y)^2' });
  const lines = [
    eq(c ? '|cos(x)cosh(y)-i·sin(x)sinh(y)|^2' : '|sin(x)cosh(y)+i·cos(x)sinh(y)|^2', c ? 'cos(x + iy) = cos x cosh y − i sin x sinh y' : 'sin(x + iy) = sin x cosh y + i cos x sinh y', 'def'),
    eq(c ? 'cos(x)^2cosh(y)^2+sin(x)^2sinh(y)^2' : 'sin(x)^2cosh(y)^2+cos(x)^2sinh(y)^2', '|a + bi|² = a² + b²', 'def'),
    eq(c ? 'cos(x)^2+sinh(y)^2' : 'sin(x)^2+sinh(y)^2', t('cosh² = 1 + sinh², puis cos² + sin² = 1'), 'hyp'),
  ];
  const part1 = linesOf({
    level: 4, skill: EF, key: `${EF}:${level}:mod:${fn}`, keys: [...KEYS, 'a2'],
    prompt: t('Montre que {a}.', { a: M(`|${fn}(x+iy)|^2 = ${lines[2].math}`) }),
    parts: [{ start: `|${fn}(x+iy)|^2`, judge: cfg, lines }], subgoals: EF_SUB,
    hints: H('', '', ''),
  });
  const part2 = choice({
    skill: EF, level, key: `${level}:bounded:${fn}`,
    prompt: t('{fn} z est-elle bornée sur ℂ ?', { fn }),
    right: t('Non : {a} ≥ {b}, qui tend vers l\'infini.', { a: M(`|${fn}(iy)|`), b: M('|sinh(y)|') }),
    wrongs: [
      { html: t('Oui : {a} comme sur ℝ.', { a: M(`|${fn}(z)| ≤ 1`) }), rule: 'c_cos_bounded' },
      { html: t('Oui, par {a}.', { a: M(`${fn}(x)^2+sinh(y)^2 ≤ 2`) }), rule: 'c_cos_bounded' },
      { html: t('Seulement sur les droites horizontales y = 0.') },
    ],
  }, rng);
  return problemItem({
    skill: EF, level, prompt: t('Module de {fn} z, puis borne.', { fn }), key: `${EF}:${level}:${fn}`, exam: examTag(opts, 3),
    parts: [{ item: part1, points: 2, title: `|${fn}(x + iy)|²` }, { item: part2, points: 1, title: t('{fn} z bornée ?', { fn }) }],
  });
}

const EF_STATEMENTS = [
  { html: t('{a} pour tout z', { a: M('|e^z| = e^(Re(z))') }), truth: true },
  { html: t('{a} est périodique de période {b}', { a: M('e^z'), b: M('2πi') }), truth: true },
  { html: t('cos z est bornée sur ℂ'), truth: false, rule: 'c_cos_bounded' },
  { html: t('{a} pour tout y réel', { a: M('cos(iy) = cosh(y)') }), truth: true },
  { html: t('{a} est un nombre réel', { a: M('i^i') }), truth: true },
  { html: `${M('Log(-1) = -iπ')}`, truth: false, rule: 'c_log_branch' },
  { html: t('{a} pour tous z₁, z₂ non nuls', { a: M('Log(z_1z_2) = Log(z_1)+Log(z_2)') }), truth: false, rule: 'c_log_branch' },
  { html: t('{a} pour tous z₁, z₂', { a: M('√(z_1z_2) = √(z_1)√(z_2)') }), truth: false, rule: 'c_sqrt_i' },
  { html: t('l\'équation {a} a une solution', { a: M('e^z = 0') }), truth: false },
  { html: t('{a} ≤ 1 pour tout z', { a: M('|sin(z)|') }), truth: false, rule: 'c_cos_bounded' },
];

function efMcq(level, rng, opts) {
  if (opts.multi) {
    const s = multiOf(rng, EF_STATEMENTS, 5);
    return choice({ skill: EF, level, multi: true, key: `multi:${s.map((x) => EF_STATEMENTS.indexOf(x)).join('')}`, exam: examTag(opts, 2), prompt: t('Cochez les affirmations vraies.'), options: s.map((x) => ({ html: x.html, correct: x.truth, rule: x.truth ? null : x.rule ?? null })) }, rng);
  }
  const d = logData(rng, 5);
  const tt = d.t;
  const other = tt.valueOf() > 0 ? tt.sub(2) : tt.add(2);
  const lnBad = d.r === '√2' ? 'ln(2)' : d.r === '2' ? 'ln(4)' : d.r === '3' ? 'ln(9)' : d.r === '2√2' ? 'ln(8)' : 'ln(2)';
  return choice({
    skill: EF, level, key: `mcq:${d.key}`, exam: examTag(opts, 2),
    prompt: `${M(`Log(${d.z})`)} = ?`,
    right: M(d.logT),
    wrongs: [
      opt(joinT([d.ln, piIT(other)]), 'c_log_branch'),
      opt(joinT([lnBad, piIT(tt)])),
      tt.n ? opt(joinT([d.ln, piIT(tt.neg())])) : null,
      opt(joinT([d.ln, piIT(tt), '2kπi'])),
    ],
    solution: [{ html: t('|z| = {r}, Arg z = {a} ∈ ]−π ; π], donc {b}.', { r: M(d.r), a: M(piT(tt)), b: M(`Log(${d.z}) = ${d.logT}`) }), note: '' }],
  }, rng);
}

// ======================================================================
// c-equations
// ======================================================================

const EQ = 'c-equations';
const EQ_SUB = [
  { id: 'substitute', label: t('poser w = e^z'), skill: EQ },
  { id: 'polynomial', label: t('équation polynomiale en w'), skill: EQ },
  { id: 'roots', label: t('racines du trinôme'), skill: 'g8-quadratic' },
  { id: 'log', label: 'e^z = w ⟺ z = Log w + 2kπi', skill: 'c-elem-fn' },
];

const W1 = ['1', '-1', 'i', '-i', '2', '-2', '1/2', '-1/2', '2i', '-2i', 'i/2', '-i/2', '3', '1/3', 'i/3', '-i/3', '3i', '-3i', '1+i', '1-i', '-1+i', '-1-i'];
const parseCQ = (tt) => exactComplex(parse(tt, { complex: true }), {});
const LN = (r2) => ({ 1: '', 4: 'ln(2)', '1/4': '-ln(2)', 9: 'ln(3)', '1/9': '-ln(3)', 2: 'ln(√2)' })[String(r2)];
// Log w as text, or null.
function logText(w) {
  const r2 = w.abs2();
  const ln = LN(r2.toString());
  if (ln === undefined) return null;
  const tt = Math.round((carg(w.toFloat()) / Math.PI) * 4);
  return joinT([ln, piIT(q(tt, 4))]);
}
// −i·Log w as text (z with w = e^(iz)).
function logIText(w) {
  const r2 = w.abs2();
  const ln = LN(r2.toString());
  if (ln === undefined) return null;
  const tt = Math.round((carg(w.toFloat()) / Math.PI) * 4);
  const re = piT(q(tt, 4));
  const im = ln ? (ln.startsWith('-') ? `i·${ln.slice(1)}` : `-i·${ln}`) : '';
  return joinT([re, im]);
}
const cqTerm = (c, body) => {
  // c·body for c real or purely imaginary.
  if (c.im.n === 0) return term(c.re, body);
  if (c.re.n === 0) return term(c.im, `i${body}`);
  return `(${zt(c)})${body}`;
};

function hyperData(rng) {
  for (let k = 0; k < 200; k++) {
    const [t1, t2] = [rng.pick(W1), rng.pick(W1)];
    if (t1 === t2) continue;
    const w1 = parseCQ(t1);
    const w2 = parseCQ(t2);
    const p = w1.mul(w2);
    const s = w1.add(w2);
    if (p.im.n !== 0 || (s.re.n !== 0 && s.im.n !== 0)) continue;
    // A = a + b, a = A(1 + p)/2, b = A(1 − p)/2, c = A·s/2: whole numbers.
    let A = 0;
    for (let m = 1; m <= 12 && !A; m++) {
      const a = q(m).mul(q(1).add(p.re)).div(2);
      const b = q(m).mul(q(1).sub(p.re)).div(2);
      const c = s.mul(cq(m)).mul(cq(q(1, 2)));
      if (a.d === 1 && b.d === 1 && c.re.d === 1 && c.im.d === 1) A = m;
    }
    if (!A) continue;
    const a = q(A).mul(q(1).add(p.re)).div(2);
    const b = q(A).mul(q(1).sub(p.re)).div(2);
    const c = s.mul(cq(A)).mul(cq(q(1, 2)));
    if (a.n === 0 || b.n === 0 && rng.chance(0.8)) continue;
    if (Math.abs(a.n) > 6 || Math.abs(b.n) > 6 || Math.abs(c.re.n) + Math.abs(c.im.n) > 8 || c.isZero()) continue;
    const L1 = logText(w1);
    const L2 = logText(w2);
    if (L1 === null || L2 === null) continue;
    const eqT = `${joinT([term(a, 'cosh(z)'), term(b, 'sinh(z)')])} = ${zt(c)}`;
    const subT = `${joinT([term(a.div(2), '(w+1/w)'), term(b.div(2), '(w-1/w)')])} = ${zt(c)}`;
    const g = [A, 2 * c.re.n, 2 * c.im.n, a.sub(b).n].reduce((x, y) => { x = Math.abs(x); y = Math.abs(y); while (y) [x, y] = [y, x % y]; return x; }, 0) || 1;
    const poly = `${joinT([term(q(A, g), 'w^2'), cqTerm(c.mul(cq(q(-2, g))), 'w'), String(a.sub(b).div(g))])} = 0`;
    // Δ = 4c² − 4A(a − b).
    const D = c.mul(c).mul(cq(4)).sub(cq(q(4 * A).mul(a.sub(b)))).mul(cq(q(1, g * g)));
    return {
      kind: 'hyp', eqT, subT, poly, D, roots: [t1, t2], sols: [L1 || '0', L2 || '0'], period: '2πi', periodText: '2kπi',
      sub: 'w = e^z', logLine: `z = Log(${t1})+2kπi ou z = Log(${t2})+2kπi ; k ∈ ℤ`,
      fam: `z = ${famT(L1, '2kπi')} ou z = ${famT(L2, '2kπi')} ; k ∈ ℤ`, needLog: !(w1.im.n === 0 && w1.re.valueOf() > 0 && w2.im.n === 0 && w2.re.valueOf() > 0), key: `hyp:${t1}:${t2}`,
    };
  }
  return null;
}
const famT = (base, per) => (base && base !== '0' ? `${base}+${per}` : per);

// q cos z = p or q sin z = p (|p/q| > 1): w = e^(iz), real or imaginary roots.
const TRIG = [[2, '2', '1/2', 'cos'], [3, '3', '1/3', 'cos'], [-2, '-2', '-1/2', 'cos'], [-3, '-3', '-1/3', 'cos'], [2, '2i', 'i/2', 'sin'], [3, '3i', 'i/3', 'sin'], [-2, '-2i', '-i/2', 'sin'], [-3, '-3i', '-i/3', 'sin']];
function trigEqData(rng) {
  const [r, t1, t2, fn] = rng.pick(TRIG);
  const w1 = parseCQ(t1);
  const w2 = parseCQ(t2);
  // cos z = (r + 1/r)/2, sin z = (r + 1/r)/2 for w = ri.
  const val = q(r).add(q(1, r)).div(2);
  const [P, Qd] = [val.n, val.d];
  const eqT = `${Qd}${fn}(z) = ${P}`;
  const subT = fn === 'cos' ? `${term(q(Qd, 2), '(w+1/w)')} = ${P}` : `${Qd}(w-1/w)/(2i) = ${P}`;
  const g = Qd % 2 === 0 ? 2 : 1;
  const poly = fn === 'cos' ? `${joinT([term(Qd / g, 'w^2'), term(-2 * P / g, 'w'), String(Qd / g)])} = 0` : `${joinT([term(Qd / g, 'w^2'), term(-2 * P / g, 'iw'), String(-Qd / g)])} = 0`;
  const L1 = logIText(w1);
  const L2 = logIText(w2);
  const needLog = !(w1.im.n === 0 && w1.re.valueOf() > 0 && w2.im.n === 0 && w2.re.valueOf() > 0);
  const D = (fn === 'cos' ? cq(4 * P * P - 4 * Qd * Qd) : cq(-4 * P * P + 4 * Qd * Qd)).mul(cq(q(1, g * g)));
  return {
    kind: fn, eqT, subT, poly, D, roots: [t1, t2], sols: [L1, L2], period: '2π', periodText: '2kπ',
    sub: 'w = e^(iz)', logLine: `z = -i·Log(${t1})+2kπ ou z = -i·Log(${t2})+2kπ ; k ∈ ℤ`,
    fam: `z = ${famT(L1, '2kπ')} ou z = ${famT(L2, '2kπ')} ; k ∈ ℤ`, needLog, key: `${fn}:${r}`,
  };
}

function eqData(rng) {
  if (rng.chance(0.6)) {
    const d = hyperData(rng);
    if (d) return d;
  }
  return trigEqData(rng);
}

function eqParts(d, level) {
  const hyp = d.kind === 'hyp';
  const cfg1 = CF({ sols: d.sols, roots: d.roots, period: d.period, periodText: d.periodText, final: 'poly' });
  const cfg3 = CF({ sols: d.sols, roots: d.roots, period: d.period, periodText: d.periodText, final: 'family' });
  const decision = {
    kind: 'decision', prompt: t('Quel changement de variable ?'), levels: [2, 3], options: [
      { id: 'ez', label: 'w = e^z', valid: hyp, ...(hyp ? {} : { why: t('cos z et sin z s\'écrivent avec e^(iz) : pose w = e^(iz).') }) },
      { id: 'eiz', label: 'w = e^(iz)', valid: !hyp, ...(!hyp ? {} : { why: t('cosh z et sinh z s\'écrivent avec e^z : pose w = e^z.') }) },
      { id: 'z2', label: 'w = z²', valid: false, why: t('L\'équation n\'est pas polynomiale en z.') },
    ],
  };
  const Dneg = d.D.im.n === 0 && d.D.re.n < 0;
  const notes = Dneg ? [t('Δ = {a} < 0 : ses racines carrées sont imaginaires (√(−a) = i√a).', { a: rd(zt(d.D)) })] : [];
  return [
    {
      html: level <= 3 ? t('{a}, avec {sub} ≠ 0.', { a: hyp ? t('cosh z = (w + 1/w)/2 et sinh z = (w − 1/w)/2') : d.kind === 'cos' ? 'cos z = (w + 1/w)/2' : 'sin z = (w − 1/w)/(2i)', sub: d.sub }) : '',
      start: d.eqT, judge: cfg1, decisions: [decision],
      lines: [
        eq(d.subT, `${d.sub}`, 'substitute', ['w+1/w']),
        eq(d.poly, t('multiplier par 2w (w ≠ 0), simplifier'), 'polynomial', [d.poly.split(' = ')[0]]),
      ],
      menu: [
        { id: 'sub', label: t('Poser {sub}', { sub: d.sub }), valid: true },
        { id: 'mult', label: t('Multiplier par 2w'), valid: true },
        { id: 'log', label: t('Prendre le Log des deux côtés'), valid: false, why: t('Il faut d\'abord une équation en w.') },
      ],
    },
    {
      html: t('Les racines du trinôme en w :'), ask: 'w :', start: d.poly, judge: SETW, notes,
      lines: [eq(`w = ${d.roots[0]} ou w = ${d.roots[1]}`, t('formule du trinôme'), 'roots', d.roots)],
      menu: [
        { id: 'delta', label: t('Δ = b² − 4ac, puis (−b ± δ)/(2a) avec δ² = Δ'), valid: true },
        { id: 'sqrt', label: t('Prendre √Δ = −√|Δ| quand Δ < 0'), valid: false, rule: 'c_sqrt_i', why: t('Si Δ < 0, ses racines carrées sont ±i√|Δ|.') },
      ],
    },
    {
      html: level >= 4 ? t('Les solutions en z :') : hyp ? 'e^z = w ⟺ z = Log w + 2kπi :' : 'e^(iz) = w ⟺ iz = Log w + 2kπi ⟺ z = −i Log w + 2kπ :', ask: 'z :', start: `w = ${d.roots[0]} ou w = ${d.roots[1]}`, judge: cfg3,
      lines: [...(d.needLog && level !== 1 ? [eq(d.logLine, hyp ? 'z = Log w + 2kπi' : 'z = −i Log w + 2kπ', 'log')] : []), eq(d.fam, 'Log w = ln|w| + i Arg w', 'log', d.sols.filter((x) => x && x !== '0'))],
      menu: [
        { id: 'fam', label: hyp ? 'z = Log w + 2kπi, k ∈ ℤ' : 'z = −i Log w + 2kπ, k ∈ ℤ', valid: true },
        { id: 'one', label: t('z = Log w (une seule solution)'), valid: false, rule: 'c_exp_periodic', why: t('e^z est 2πi-périodique : il y a une famille de solutions.') },
      ],
    },
  ];
}

function eqLines(level, rng, opts) {
  const d = eqData(rng);
  const parts = eqParts(d, level);
  return linesOf({
    level, skill: EQ, key: `${EQ}:${level}:${d.key}`, keys: [...KEYS, 'set'], exam: examTag(opts, 3), subgoals: EQ_SUB,
    prompt: t('Résous dans ℂ : {eqT}.', { eqT: M(d.eqT) }),
    parts,
    hints: H(t('Pose {sub} : {a}.', { sub: d.sub, a: d.kind === 'hyp' ? 'cosh z = (w + 1/w)/2, sinh z = (w − 1/w)/2' : d.kind === 'cos' ? 'cos z = (w + 1/w)/2' : 'sin z = (w − 1/w)/(2i)' }), t('{poly}, puis {a}', { poly: M(d.poly), a: M(`w = ${d.roots[0]} ou w = ${d.roots[1]}`) }), M(d.fam)),
  });
}

const EQ_STATEMENTS = [
  { html: `${M('e^z = 1 ⇔ z = 2kπi')}, k ∈ ℤ`, truth: true },
  { html: t('{a} n\'a pas de solution', { a: M('e^z = -1') }), truth: false },
  { html: `${M('e^z = i ⇔ z = iπ/2')}`, truth: false, rule: 'c_exp_periodic' },
  { html: t('{a} a des solutions dans ℂ', { a: M('cos(z) = 2') }), truth: true },
  { html: `${M('sinh(z) = 0 ⇔ z = kπi')}, k ∈ ℤ`, truth: true },
  { html: t('les racines carrées de {a} sont ±4', { a: M('-16') }), truth: false, rule: 'c_sqrt_i' },
  { html: t('{a} n\'a pas de solution', { a: M('cosh(z) = 0') }), truth: false },
];

function eqMcq(level, rng, opts) {
  if (opts.multi) {
    const s = multiOf(rng, EQ_STATEMENTS, 5);
    return choice({ skill: EQ, level, multi: true, key: `multi:${s.map((x) => EQ_STATEMENTS.indexOf(x)).join('')}`, exam: examTag(opts, 2), prompt: t('Cochez les affirmations vraies.'), options: s.map((x) => ({ html: x.html, correct: x.truth, rule: x.truth ? null : x.rule ?? null })) }, rng);
  }
  const d = eqData(rng);
  const per = d.periodText;
  const half = d.kind === 'hyp' ? 'kπi' : 'kπ';
  const pts = `z = ${d.sols[0]} ou z = ${d.sols[1]}`;
  const halfT = `z = ${famT(d.sols[0], half)} ou z = ${famT(d.sols[1], half)} ; k ∈ ℤ`;
  const conjT = d.kind === 'hyp' ? `z = ${famT(logText(parseCQ(d.roots[0]).conj()), per)} ou z = ${famT(logText(parseCQ(d.roots[1]).conj()), per)} ; k ∈ ℤ` : `z = ${famT(logText(parseCQ(d.roots[0])), per)} ou z = ${famT(logText(parseCQ(d.roots[1])), per)} ; k ∈ ℤ`;
  return choice({
    skill: EQ, level, key: `mcq:${d.key}`, exam: examTag(opts, 2),
    prompt: t('L\'ensemble des solutions de {eqT} est :', { eqT: M(d.eqT) }),
    right: M(d.fam),
    wrongs: [opt(pts, 'c_exp_periodic'), opt(halfT), opt(conjT)],
    solution: [{ html: t('{sub} : {poly}, {a}, d\'où {fam}.', { sub: d.sub, poly: M(d.poly), a: M(`w = ${d.roots[0]} ou w = ${d.roots[1]}`), fam: M(d.fam) }), note: '' }],
    expectedSec: 150,
  }, rng);
}

function eqProblem(level, rng, opts) {
  const it = eqLines(4, rng, {});
  const p = problemItem({
    skill: EQ, level, prompt: it.prompt, key: `${EQ}:${level}:${it.key}`, exam: examTag(opts, 3),
    parts: [{ item: { ...it, prompt: '' }, points: [1, 1, 1] }],
  });
  return p;
}

export const GEN = {
  [EF]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return efMcq(4, rng, opts);
    if (level === 5) return rng.chance(0.5) ? efProblem(5, rng, opts) : efLines(5, rng, opts);
    return efLines(level, rng, opts);
  },
  [EQ]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return eqMcq(4, rng, opts);
    if (opts.exam === 'open' || level === 5) return eqProblem(level === 5 ? 5 : 4, rng, opts);
    return eqLines(level, rng, opts);
  },
};

void CQ; void cabs; void SETW;
