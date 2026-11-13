// c-int-rational and c-int-trig (module C, part b, step U10): real integrals
// by residues. Rational: ∫_ℝ p/q dx = 2πi Σ_{Im z_k > 0} Res (deg q ≥ deg p + 2),
// with the arc bound at level 4 (judge `arcb`) and the even integral on
// [0 ; +∞[ at level 5. Trigonometric: z = e^(iθ), the integrand rewritten in
// z (`cval` with vars ['z'], one fraction), the pole inside |z| < 1, its
// residue, 2πi Res; level 5 with the parameters a, b. The conclusion of each
// item is a `definite` part (the value checked by quadrature).

import { Q } from '../../math/rational.js';
import {
  q, cq, cT, cP, rd, CM, resLabel, mathLabel, CV, P, resRat, checkRes, checkValue, SG, L, chain, choice, opt, scaledOpt, niceC,
  partsItem, H, examTag, KEYS, pick, asProblem,
} from './cplx-b-kit.js';
import { evalFloat } from '../../cas/numeric.js';
import { parse } from '../../cas/parse.js';
import { t } from '../../i18n.js';

const SR = 'c-int-rational';
const ST = 'c-int-trig';

// The value of a definite integral by quadrature (VERIFY: the reference values).
function quadCheck(intText, valueText) {
  const v = evalFloat(parse(intText), {});
  checkValue(valueText, v);
}

// ======================================================================
// c-int-rational
// ======================================================================

// p/q with q of degree 4 or 2 (no real root), poles of the upper half-plane.
function ratData(rng) {
  const kind = pick(rng, ['ab', 'ab', 'sq2', 'q4', 'x2ab', 'one', 'x2q4']);
  const I = cq(0, 1);
  if (kind === 'one') {
    const a = pick(rng, [1, 2, 3]);
    return mk(`1/(x^2+${a * a})`, P.of(1), P.of(a * a, 0, 1), [cq(0, a)], `π/${a}`.replace('/1', ''), { arcLow: `R^2-${a * a}`, arcNum: '1', triangle: `R^2+${a * a}` });
  }
  if (kind === 'ab' || kind === 'x2ab') {
    const [a, b] = pick(rng, [[1, 2], [1, 3], [2, 3]]);
    const num = kind === 'ab' ? P.of(1) : P.of(0, 0, 1);
    const D = P.mul(P.of(a * a, 0, 1), P.of(b * b, 0, 1));
    // ∫ 1/((x²+a²)(x²+b²)) = π/(ab(a+b)); ∫ x²/(…) = π/(a+b)
    const val = kind === 'ab' ? q(1, a * b * (a + b)) : q(1, a + b);
    const f = kind === 'ab' ? `1/((x^2+${a * a})(x^2+${b * b}))` : `x^2/((x^2+${a * a})(x^2+${b * b}))`;
    return mk(f, num, D, [cq(0, a), cq(0, b)], piQ(val), { arcLow: `(R^2-${a * a})(R^2-${b * b})`, arcNum: kind === 'ab' ? '1' : 'R^2', triangle: `(R^2+${a * a})(R^2+${b * b})` });
  }
  if (kind === 'sq2') {
    const a = pick(rng, [1, 2]);
    return mk(`1/(x^2+${a * a})^2`, P.of(1), P.pow(P.of(a * a, 0, 1), 2), [cq(0, a)], piQ(q(1, 2 * a ** 3)), { arcLow: `(R^2-${a * a})^2`, arcNum: '1', triangle: `(R^2+${a * a})^2`, double: true });
  }
  if (kind === 'q4') return mk('1/(x^4+4)', P.of(1), P.of(4, 0, 0, 0, 1), [cq(1, 1), cq(-1, 1)], 'π/4', { arcLow: 'R^4-4', arcNum: '1', triangle: 'R^4+4' });
  return mk('x^2/(x^4+4)', P.of(0, 0, 1), P.of(4, 0, 0, 0, 1), [cq(1, 1), cq(-1, 1)], 'π/2', { arcLow: 'R^4-4', arcNum: 'R^2', triangle: 'R^4+4' });
  function mk(f, N, D, ups, value, extra) {
    const res = ups.map((z) => resRat(N, D, z));
    const lows = ups.map((z) => z.conj());
    const resLow = lows.map((z) => resRat(N, D, z));
    const S = res.reduce((s, r) => s.add(r), cq(0));
    const SL = resLow.reduce((s, r) => s.add(r), cq(0));
    void I;
    return { f, fz: f.replace(/x/g, 'z'), N, D, ups, lows, res, resLow, S, SL, value, id: f, ...extra };
  }
}
// π·r as text: 'π/6', 'π', '3π/4'.
function piQ(r) {
  const n = r.n === 1 ? '' : r.n === -1 ? '-' : String(r.n);
  return r.d === 1 ? `${n}π` : `${n}π/${r.d}`;
}

const SUB_R = [SG('poles', t('pôles du demi-plan supérieur'), 'c-res-theorem'), SG('residues', t('résidus'), 'c-res-simple'), SG('residues-m', t('résidu en un pôle double'), 'c-res-multiple'), SG('arc', t('l\'arc tend vers 0'), 'c-arc-estimate'), SG('value', t('valeur de l\'intégrale'), SR)];

const intLabel = (lo = '-∞', hi = '+∞') => `int(…)`.replace('…', `${lo}${hi}`);
void intLabel;

function ratParts(d, level, { arc = false, even = false } = {}) {
  const parts = [];
  const intText = `int(${d.f}, x, -∞, +∞)`;
  const decision = {
    kind: 'decision', prompt: t('On ferme [−R ; R] par un demi-cercle. Quels pôles sont à l\'intérieur ?'), levels: [2, 3],
    options: [
      { id: 'up', label: t('Ceux du demi-plan supérieur : {a}', { a: d.ups.map((z) => rd(cT(z))).join(t(' et ')) }), valid: true, ref: true },
      { id: 'low', label: t('Ceux du demi-plan inférieur : {a}', { a: d.lows.map((z) => rd(cT(z))).join(t(' et ')) }), valid: false, rule: 'c_upper_half_lower_pole', why: t('Avec le demi-cercle du haut (parcouru dans le sens positif), seuls les pôles d\'Im > 0 sont dedans.') },
      { id: 'all', label: t('Tous les pôles de q'), valid: false, rule: 'c_pole_outside_counted', why: t('Les pôles d\'Im < 0 sont hors du contour : ils ne comptent pas.') },
    ],
  };
  const MENU = [
    { id: 'res', label: t('Résidu : p(z₀)/q′(z₀) (ou dériver pour un pôle double)'), valid: true },
    { id: 'sum', label: t('2πi × somme des résidus du haut'), valid: true },
    { id: 'arc', label: t('Majorer l\'intégrale sur l\'arc'), valid: true },
    { id: 'low', label: t('Prendre les pôles d\'Im < 0'), valid: false, rule: 'c_upper_half_lower_pole', why: t('Le contour ferme en haut.') },
  ];
  d.ups.forEach((z, k) => {
    const J = CV(resLabel(cT(z)), cT(d.res[k]));
    const qd = P.der(d.D);
    const sub = d.double ? null : `${cP(P.ev(d.N, z))}/(${cT(P.ev(qd, z))})`;
    const lines = chain(J, [sub, cT(d.res[k])]);
    parts.push({
      html: k === 0 ? (even ? t('Les pôles du demi-plan supérieur :') : '') : t('Pôle {a} :', { a: CM(cT(z)) }), ask: 'Res =', start: J.label, judge: J, menu: MENU,
      decisions: k === 0 ? [decision] : [],
      lines: lines.map((tt, j) => L(tt, j === lines.length - 1 ? t('Calculer') : `p(z₀)/q′(z₀), z₀ = ${rd(cT(z))}`, d.double ? 'residues-m' : 'residues', { blank: [tt] })),
    });
  });
  if (arc) {
    const J = { kind: 'arcb', rel: '≤', arc: [0, Math.PI], R: [4, 50], traps: { c_arc_triangle: [`πR·${d.arcNum}/(${d.triangle})`] } };
    parts.push({ html: t('L\'arc C_R (demi-cercle supérieur, longueur πR) :'), ask: '|∫_{C_R}| ≤', start: `πR|${d.fz}|`, judge: J, lines: [L(`πR·${d.arcNum}/(${d.arcLow})`, t('Longueur × max ; cette borne tend vers 0'), 'arc')] });
  }
  const value = `${cP(cq(0, 2))}`;
  void value;
  const sumT = d.res.length === 1 ? cT(d.res[0]) : d.res.map((r) => cP(r)).join('+');
  const traps = {
    c_upper_half_lower_pole: [`2πi(${d.resLow.map((r) => cP(r)).join('+')})`],
    c_pole_outside_counted: [`2πi(${[...d.res, ...d.resLow].map((r) => cP(r)).join('+')})`],
    c_residue_2pii: [cT(d.S)],
  };
  const JS = CV(mathLabel('∫_ℝ f(x) dx', '<msub><mo>∫</mo><mi>ℝ</mi></msub><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mi>d</mi><mi>x</mi>'), d.value, { form: 'real', traps });
  const lines = chain(JS, [`2πi(${sumT})`, d.value]);
  parts.push({ html: t('Théorème des résidus (l\'arc tend vers 0) :'), ask: '∫_ℝ f =', start: JS.label, judge: JS, menu: MENU, lines: lines.map((tt, j) => L(tt, j === lines.length - 1 ? t('Calculer') : t('2πi × Σ des résidus du haut'), j === lines.length - 1 ? 'value' : 'poles', { blank: [tt] })) });
  quadCheck(intText, d.value);
  parts.push({
    html: even ? t('Conclusion : f est paire.') : t('Conclusion :'), ask: even ? '∫₀^∞ f =' : '∫_ℝ f =', start: even ? `int(${d.f}, x, 0, +∞)` : intText, judge: { kind: 'definite' },
    lines: even ? [L(`(1/2)${intText}`, t('Parité : la moitié de ∫_ℝ'), 'value'), L(halfT(d.value), t('La valeur'), 'value')] : [L(d.value, t('La valeur'), 'value')],
  });
  return parts;
}
// value/2 as text ('π/6' → 'π/12').
function halfT(v) {
  const m = /^(\d*)π(?:\/(\d+))?$/.exec(v);
  if (!m) return `(${v})/2`;
  const r = q(m[1] ? Number(m[1]) : 1, m[2] ? Number(m[2]) : 1).div(2);
  return piQ(r);
}

function ratLines(level, rng, opts = {}) {
  const d = ratData(rng);
  d.ups.forEach((z, k) => checkRes(d.fz, cT(z), cT(d.res[k])));
  const even = level === 5;
  const parts = ratParts(d, level, { arc: level >= 4 || !!opts.exam, even });
  if (level === 1) parts[0].notes = [t('On ferme par le demi-cercle supérieur : pôles {a}.', { a: d.ups.map((z) => CM(cT(z))).join(t(' et ')) })];
  return partsItem({
    skill: SR, level,
    prompt: even ? t('Calcule ∫₀^∞ {a} dx avec le théorème des résidus.', { a: CM(d.f) }) : (level >= 4 ? t('Calcule ∫_ℝ {a} dx avec le théorème des résidus. Justifie que l\'intégrale sur l\'arc tend vers 0.', { a: CM(d.f) }) : t('Calcule ∫_ℝ {a} dx avec le théorème des résidus.', { a: CM(d.f) })),
    parts, keys: [...KEYS, 'anal'], subgoals: SUB_R,
    hints: H(t('Ferme par un demi-cercle en haut ; seuls les pôles d\'Im > 0 comptent.'), `∫_ℝ f = 2πi (${d.ups.map((z) => `Res(f ; ${rd(cT(z))})`).join(' + ')})`, d.ups.map((z, k) => `Res(f ; ${CM(cT(z))}) = ${CM(cT(d.res[k]))}`).join(' ; ')),
    key: `${SR}:${level}:${d.id}`, exam: examTag(opts, 7),
    baits: ['c_upper_half_lower_pole', 'c_pole_outside_counted', 'c_residue_2pii'],
  });
}

function ratMcq(rng, opts) {
  const d = ratData(rng);
  d.ups.forEach((z, k) => checkRes(d.fz, cT(z), cT(d.res[k])));
  const multi = !!opts.multi;
  return choice({
    skill: SR, level: 4, key: `${SR}:mcq:${d.id}:${multi}`, exam: examTag(opts, 2), multi,
    prompt: multi ? t('Pour I = ∫_ℝ {a} dx, quelles affirmations sont vraies ? (plusieurs réponses possibles)', { a: CM(d.f) }) : `∫_ℝ ${CM(d.f)} dx =`,
    right: multi ? `I = ${CM(d.value)}` : CM(d.value), rightText: multi ? null : d.value,
    rights: multi ? [`I = 2πi (${d.ups.map((z) => `Res(f ; ${CM(cT(z))})`).join(' + ')})`] : [],
    wrongs: multi
      ? [{ html: `I = 2πi (${d.lows.map((z) => `Res(f ; ${CM(cT(z))})`).join(' + ')})`, rule: 'c_upper_half_lower_pole' }, { html: t('I = 0, car la somme de tous les résidus est nulle'), rule: 'c_pole_outside_counted' }, { html: `I = ${CM(cT(d.S))}`, rule: 'c_residue_2pii' }]
      : [scaledOpt('-1', d.value, 'c_upper_half_lower_pole'), opt('0', 'c_pole_outside_counted'), scaledOpt('2', d.value), opt(cT(d.S), 'c_residue_2pii')],
    fillers: [scaledOpt('1/2', d.value), scaledOpt('3/2', d.value)],
    solution: [{ html: t('Pôles du haut : {a} ; ∫ = 2πi Σ Res = {b}.', { a: d.ups.map((z) => CM(cT(z))).join(', '), b: CM(d.value) }), note: '' }],
    expectedSec: 180,
  }, rng);
}

// ======================================================================
// c-int-trig
// ======================================================================

const TRIG = [[2, 1], [2, -1], [3, 2], [3, -2], [5, 3], [5, -3], [5, 4], [5, -4], [3, 1], [3, -1]];
// √D as text, and 1/√D rationalised: [√D text, 1/√D text, 2π/√D text].
function rootD(D) {
  const r = Math.round(Math.sqrt(D));
  if (r * r === D) return { s: String(r), inv: `1/${r}`, val: piQ(q(2, r)), res: r === 1 ? '-i' : `-i/${r}` };
  // D = 8: √8 = 2√2.
  if (D === 8) return { s: '2√2', inv: '√2/4', val: 'π√2/2', res: '-i√2/4' };
  return { s: `√${D}`, inv: `√${D}/${D}`, val: `2π√${D}/${D}`, res: `-i√${D}/${D}` };
}

function trigData(rng) {
  const [a, b] = pick(rng, TRIG);
  const kind = pick(rng, ['cos', 'sin']);
  const D = a * a - b * b;
  const R = rootD(D);
  const sB = b < 0 ? `-${-b}` : `+${b}`;
  const f = `1/(${a}${sB === '+1' ? '+' : sB === '-1' ? '-' : sB}${kind}(θ))`;
  const sub = kind === 'cos' ? `1/(${a}${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}(z+1/z)/2)·1/(iz)` : `1/(${a}${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}(z-1/z)/(2i))·1/(iz)`;
  // One fraction: cos: −2i/(bz² + 2az + b) (written with a positive z² when b < 0), sin: 2/(bz² + 2iaz − b).
  const lead = (c) => (c === 1 ? '' : c === -1 ? '-' : String(c));
  let g;
  let zin;
  if (kind === 'cos') {
    g = b > 0 ? `-2i/(${lead(b)}z^2+${2 * a}z+${b})` : `2i/(${lead(-b)}z^2-${2 * a}z+${-b})`;
    zin = b === 1 ? `${R.s}-${a}` : b === -1 ? `${a}-${R.s}` : b > 0 ? `(${R.s}-${a})/${b}` : `(${a}-${R.s})/${-b}`;
  } else {
    g = `2/(${lead(b)}z^2+${2 * a}iz${b > 0 ? '-' : '+'}${Math.abs(b)})`;
    zin = b === 1 ? `i(${R.s}-${a})` : b === -1 ? `i(${a}-${R.s})` : b > 0 ? `i(${R.s}-${a})/${b}` : `i(${a}-${R.s})/${-b}`;
  }
  let zout = kind === 'cos' ? (b > 0 ? `-(${R.s}+${a})/${b}` : `(${R.s}+${a})/${-b}`) : (b > 0 ? `-i(${R.s}+${a})/${b}` : `i(${R.s}+${a})/${-b}`);
  // √D whole: the roots are exact numbers of ℚ(i).
  const r = Math.round(Math.sqrt(D));
  if (r * r === D) {
    const zi = q(r - a, b);
    const zo = q(-r - a, b);
    zin = kind === 'cos' ? String(zi) : cT(cq(0, zi));
    zout = kind === 'cos' ? String(zo) : cT(cq(0, zo));
  }
  const qp = kind === 'cos' ? (b > 0 ? `${2 * b}z+${2 * a}` : `${-2 * b}z-${2 * a}`) : `${2 * b}z+${2 * a}i`;
  const num = kind === 'cos' ? (b > 0 ? '-2i' : '2i') : '2';
  const resSub = `${num}/(${qp.replace(/z/g, `(${zin})`)})`;
  // The trap c_trig_sub: the factor 2 of the a-term forgotten after multiplying.
  const gWrong = kind === 'cos' ? (b > 0 ? `-2i/(${lead(b)}z^2+${a}z+${b})` : `2i/(${lead(-b)}z^2-${a}z+${-b})`) : `2/(${lead(b)}z^2+${a}iz${b > 0 ? '-' : '+'}${Math.abs(b)})`;
  return { a, b, kind, D, R, f, sub, g, zin, zout, resSub, gWrong, id: `${kind}:${a}:${b}` };
}

const SUB_T = [SG('substitute', 'z = e^(iθ)', ST), SG('rewrite', t('intégrande en z'), ST), SG('poles', t('pôle dans |z| < 1'), 'c-res-theorem'), SG('residue', t('résidu'), 'c-res-theorem'), SG('value', 'valeur', ST)];
const gML = '<mi>g</mi><mo>(</mo><mi>z</mi><mo>)</mo>';

function trigParts(d, level) {
  const MENU = [
    { id: 'sub', label: t('Remplacer cos θ (ou sin θ) et dθ = dz/(iz)'), valid: true },
    { id: 'frac', label: t('Réduire en une seule fraction de z'), valid: true },
    { id: 'pole', label: t('Garder le pôle de |z| < 1'), valid: true },
    { id: 'res', label: t('Résidu p(z₀)/q′(z₀)'), valid: true },
    { id: 'sum', label: t('2πi × le résidu'), valid: true },
    { id: 'nodz', label: t('Remplacer dθ par dz'), valid: false, rule: 'c_trig_sub', why: t('z = e^(iθ) donne dz = iz dθ : dθ = dz/(iz).') },
  ];
  const JG = CV(mathLabel('g(z)', gML), d.g, { vars: ['z'], domain: { z: [-0.9, 0.9] }, form: 'ratz', traps: { c_trig_sub: [{ line: d.gWrong, ctx: { missing: t('le facteur 2 devant {a}', { a: d.kind === 'cos' ? `${d.a}z` : `${d.a}iz` }) } }] } });
  const JP = CV(mathLabel('z₀'), d.zin, { form: 'any', traps: { c_pole_outside_counted: [{ line: d.zout, ctx: { z: rd(d.zout), d: t('plus grand que 1'), R: '1' } }] } });
  const JR = CV(resLabel('z₀', 'g'), d.R.res, {});
  const JV = CV(mathLabel('I'), d.R.val, { form: 'real', traps: { c_residue_2pii: [d.R.res] } });
  const parts = [
    { start: JG.label, judge: JG, menu: MENU, lines: [L(d.sub, `z = e^(iθ) : ${d.kind} θ = ${d.kind === 'cos' ? '(z + 1/z)/2' : '(z − 1/z)/(2i)'}, dθ = dz/(iz)`, 'substitute', { blank: [d.kind === 'cos' ? '(z+1/z)/2' : '(z-1/z)/(2i)'] }), L(d.g, t('Multiplier en haut et en bas'), 'rewrite', { blank: [d.g] })] },
    { html: t('I = ∮_{|z| = 1} g(z) dz avec g(z) = {a}. Le pôle de g dans |z| < 1 :', { a: CM(d.g) }), ask: 'z₀ =', start: JP.label, judge: JP, menu: MENU, lines: [L(d.zin, t('Racines du dénominateur ; leur produit vaut 1 (ou −1)'), 'poles', { blank: [d.zin] })] },
    { html: t('Son résidu :'), ask: 'Res =', start: JR.label, judge: JR, menu: MENU, lines: chain(JR, [d.resSub, d.R.res]).map((tt, j, a) => L(tt, j === a.length - 1 ? t('Simplifier') : 'p(z₀)/q′(z₀)', 'residue', { blank: [tt] })) },
    { html: t('Théorème des résidus :'), ask: 'I =', start: JV.label, judge: JV, menu: MENU, lines: chain(JV, [`2πi(${d.R.res})`, d.R.val]).map((tt, j, a) => L(tt, j === a.length - 1 ? t('Calculer') : '2πi × Res', 'value', { blank: [tt] })) },
  ];
  const intText = `int(${d.f}, θ, 0, 2π)`;
  quadCheck(intText, d.R.val);
  parts.push({ html: t('Conclusion :'), ask: 'I =', start: intText, judge: { kind: 'definite' }, lines: [L(d.R.val, t('La valeur'), 'value')] });
  if (level === 3) {
    parts[1].decisions = [{
      kind: 'decision', prompt: t('Les racines du dénominateur sont z₁ et z₂, avec z₁z₂ de module 1. Lequel garder ?'),
      options: [
        { id: 'in', label: t('Celle de module < 1 : {zin}', { zin: rd(d.zin) }), valid: true, ref: true },
        { id: 'out', label: t('Celle de module > 1 : {zout}', { zout: rd(d.zout) }), valid: false, rule: 'c_pole_outside_counted', why: t('Elle est hors du cercle unité : elle ne compte pas.') },
        { id: 'both', label: t('Les deux'), valid: false, rule: 'c_pole_outside_counted', why: t('Une seule racine est dans |z| < 1.') },
      ],
    }];
  }
  return parts;
}

function trigLines(level, rng, opts = {}) {
  const d = trigData(rng);
  checkRes(d.g, d.zin, d.R.res);
  const parts = trigParts(d, level);
  if (level === 1) parts[0].notes = [t('Avec z = e^(iθ) : {a}, dθ = dz/(iz), et θ ∈ [0 ; 2π] parcourt le cercle |z| = 1.', { a: d.kind === 'cos' ? 'cos θ = (z + 1/z)/2' : 'sin θ = (z − 1/z)/(2i)' })];
  return partsItem({
    skill: ST, level, prompt: t('Calcule I = ∫₀^{2π} {a} dθ avec le théorème des résidus.', { a: CM(d.f.replace(/θ/g, 'θ')) }),
    parts, keys: [...KEYS, 'greek', 'anal'], subgoals: SUB_T,
    hints: H(t('Pose z = e^(iθ) ; dθ = dz/(iz), et l\'intégrale devient une intégrale sur |z| = 1.'), `g(z) = ${CM(d.sub)} = …`, `g(z) = ${CM(d.g)}`),
    key: `${ST}:${level}:${d.id}`, exam: examTag(opts, 5),
    baits: ['c_trig_sub', 'c_pole_outside_counted'],
  });
}

// L5: ∫₀^{2π} dθ/(a + b sin θ), a > |b| > 0, in letters.
function trigParam(level, rng) {
  const dom = { z: [-0.9, 0.9], a: [3, 5], b: [0.5, 2] };
  const vars = ['z', 'a', 'b'];
  const JG = CV(mathLabel('g(z)', gML), '2/(bz^2+2aiz-b)', { vars, domain: dom, form: 'ratz' });
  const JP = CV(mathLabel('z₀'), 'i(√(a^2-b^2)-a)/b', { vars: ['a', 'b'], domain: dom, form: 'any' });
  const JR = CV(resLabel('z₀', 'g'), '-i/√(a^2-b^2)', { vars: ['a', 'b'], domain: dom, form: 'value' });
  const JV = CV(mathLabel('I'), '2π/√(a^2-b^2)', { vars: ['a', 'b'], domain: dom, form: 'value', traps: { c_residue_2pii: ['-i/√(a^2-b^2)'] } });
  const parts = [
    { start: JG.label, judge: JG, lines: [L('1/(a+b(z-1/z)/(2i))·1/(iz)', 'z = e^(iθ)', 'substitute'), L('2/(bz^2+2aiz-b)', t('Une fraction'), 'rewrite')] },
    { html: t('Le pôle dans |z| < 1 :'), ask: 'z₀ =', start: JP.label, judge: JP, lines: [L('i(√(a^2-b^2)-a)/b', t('Le produit des racines vaut −1'), 'poles')] },
    { html: t('Son résidu :'), ask: 'Res =', start: JR.label, judge: JR, lines: chain(JR, ['2/(2bi(√(a^2-b^2)-a)/b+2ai)', '-i/√(a^2-b^2)']).map((tt) => L(tt, t('p(z₀)/q′(z₀), simplifié'), 'residue')) },
    { html: t('Théorème des résidus :'), ask: 'I =', start: JV.label, judge: JV, lines: [L('2π/√(a^2-b^2)', '2πi × Res', 'value')] },
  ];
  return partsItem({
    skill: ST, level, prompt: t('Soit a > |b| > 0. Calcule I = ∫₀^{2π} dθ/(a + b sin θ) avec le théorème des résidus (résultat en fonction de a et b).'),
    parts, keys: [...KEYS, 'greek', 'letters'], subgoals: SUB_T, hints: [], key: `${ST}:5:param:${rng.int(0, 3)}`,
  });
}

function trigMcq(rng, opts) {
  const d = trigData(rng);
  checkRes(d.g, d.zin, d.R.res);
  if (opts.multi) {
    return choice({
      skill: ST, level: 4, key: `${ST}:mcq:multi:${d.id}`, exam: examTag(opts, 2), multi: true, count: 5,
      prompt: t('I = ∫₀^{2π} {a} dθ. Quelles affirmations sont vraies ? (plusieurs réponses possibles)', { a: CM(d.f) }),
      right: `I = ∮_{|z| = 1} ${CM(d.g)} dz`, rights: [`I = ${CM(d.R.val)}`, t('Le seul pôle de l\'intégrande dans |z| < 1 est {a}', { a: CM(d.zin) })],
      wrongs: [{ html: `I = ∮_{|z| = 1} ${CM(d.gWrong)} dz`, rule: 'c_trig_sub' }, { html: `I = ${CM(niceC(`2(${d.R.val})`) || `2(${d.R.val})`)}`, rule: null }, { html: `I = 2πi (Res(g ; ${CM(d.zin)}) + Res(g ; ${CM(d.zout)}))`, rule: 'c_pole_outside_counted' }],
      solution: [{ html: t('z = e^(iθ) : I = ∮ {a} dz, pôle intérieur {b}, résidu {c}, I = {d}.', { a: CM(d.g), b: CM(d.zin), c: CM(d.R.res), d: CM(d.R.val) }), note: '' }],
      expectedSec: 240,
    }, rng);
  }
  return choice({
    skill: ST, level: 4, key: `${ST}:mcq:${d.id}`, exam: examTag(opts, 2),
    prompt: `∫₀^{2π} ${CM(d.f)} dθ =`,
    right: CM(d.R.val), rightText: d.R.val,
    wrongs: [scaledOpt('1/2', d.R.val, 'c_trig_sub'), scaledOpt('2', d.R.val), scaledOpt('-1', d.R.val), scaledOpt('i', d.R.val, 'c_residue_2pii')],
    fillers: [opt('0', 'c_pole_outside_counted'), opt('π')],
    solution: [{ html: t('I = ∮ {a} dz, résidu {b} en {c}, I = {d}.', { a: CM(d.g), b: CM(d.R.res), c: CM(d.zin), d: CM(d.R.val) }), note: '' }],
    expectedSec: 240,
  }, rng);
}

export const GEN = {
  [SR]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return ratMcq(rng, opts);
    if (opts.exam === 'open') return asProblem(ratLines(4, rng, opts), 7);
    return ratLines(level, rng, opts);
  },
  [ST]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return trigMcq(rng, opts);
    if (opts.exam === 'open') return asProblem(trigLines(4, rng, opts), 5);
    if (level === 5) return rng.chance(0.5) ? trigParam(5, rng) : trigLines(5, rng, opts);
    return trigLines(level, rng, opts);
  },
};

void Q;
