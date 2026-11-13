// c-int-fourier (module C, part b, step U10): ∫_ℝ R(x) cos(αx) dx and
// ∫_ℝ R(x) sin(αx) dx through J = ∫_ℝ R(x) e^(iαx) dx: closed in the upper
// half-plane when α > 0, in the lower one when α < 0 (then ∮ = −2πi Σ Res).
// R ∈ {1/(x² + a²), x/(x² + a²), x/(x⁴ + 4), 1/((x² + 1)(x² + 4))}. Parts:
// the residues of R(z)e^(iαz) (`cval`), the sum (x/(x⁴ + 4)), J (`cval`,
// with the wrong values of c_jordan_alpha_sign, c_upper_half_lower_pole,
// c_eiax_cos and c_residue_2pii), the arc at level 4 (`arcb`; not for
// x/(x² + a²), where the ML bound does not tend to 0: Jordan's lemma), the
// real integral (`definite`, its value given in cfg.known: an oscillating
// integral on ℝ is out of reach of the quadrature). Level 5 and the open
// variant: the exam example C1 (11 points, format 2022).

import { toText } from '../../cas/print.js';
import { parse } from '../../cas/parse.js';
import { evalComplex } from '../../cas/complex.js';
import {
  cq, cT, cP, rd, CM, resLabel, mathLabel, CV, P, resRat, checkRes, checkValue, SG, L, chain, choice, opt,
  partsItem, problemItem, H, examTag, KEYS, pick,
} from './cplx-b-kit.js';
import { mcq } from './kit.js';
import { t } from '../../i18n.js';

const SK = 'c-int-fourier';
const SUB = [SG('poles', t('pôles du bon demi-plan'), 'c-res-theorem'), SG('residues', t('résidus de R(z)e^(iαz)'), 'c-res-simple'), SG('arc', t('l\'arc tend vers 0'), 'c-arc-estimate'), SG('sum', t('somme des résidus'), SK), SG('value', t('valeur de l\'intégrale'), SK)];

// e^(k) as text ('e^(-2)').
const ek = (k) => `e^(${k})`;
// k as a factor before a letter: '' for 1, '-' for −1.
const kT = (k) => (k === 1 ? '' : k === -1 ? '-' : String(k));
const sinT = (al) => (al < 0 ? `-sin(${-al})` : `sin(${al})`);

export function fourierData(rng, { kind = null, al = null } = {}) {
  kind = kind || pick(rng, ['one', 'one', 'xa', 'x4', 'ab']);
  // α < 0 only for the even R (cos integrals): their values stay positive.
  al = al ?? (kind === 'one' || kind === 'ab' ? pick(rng, [1, 2, 3, -1, -2, -3]) : pick(rng, [1, 2, 3]));
  const s = al > 0 ? 1 : -1;
  const A = Math.abs(al);
  let N; let D; let poles; let R; let J; let real; let trig; let arc = null; let a = 1;
  if (kind === 'one') {
    a = pick(rng, [1, 2, 3]);
    N = P.of(1); D = P.of(a * a, 0, 1); poles = [cq(0, s * a)];
    R = `1/(x^2+${a * a})`; trig = 'cos';
    J = `πe^(${-A * a})${a === 1 ? '' : `/${a}`}`; real = J;
    arc = { num: '1', low: `R^2-${a * a}`, tri: `R^2+${a * a}`, R0: a + 1 };
  } else if (kind === 'xa') {
    a = pick(rng, [1, 2, 3]);
    N = P.of(0, 1); D = P.of(a * a, 0, 1); poles = [cq(0, s * a)];
    R = `x/(x^2+${a * a})`; trig = 'sin';
    J = `${s < 0 ? '-' : ''}iπe^(${-A * a})`; real = `${s < 0 ? '-' : ''}πe^(${-A * a})`;
  } else if (kind === 'x4') {
    N = P.of(0, 1); D = P.of(4, 0, 0, 0, 1); poles = [cq(1, s), cq(-1, s)];
    R = 'x/(x^4+4)'; trig = 'sin';
    J = `${s < 0 ? '-' : ''}(iπ/2)e^(${-A})sin(${A})`; real = `${s < 0 ? '-' : ''}(π/2)e^(${-A})sin(${A})`;
    arc = { num: 'R', low: 'R^4-4', tri: 'R^4+4', R0: 3 };
  } else {
    N = P.of(1); D = P.mul(P.of(1, 0, 1), P.of(4, 0, 1)); poles = [cq(0, s), cq(0, 2 * s)];
    R = '1/((x^2+1)(x^2+4))'; trig = 'cos';
    J = `πe^(${-A})/3-πe^(${-2 * A})/6`; real = J;
    arc = { num: '1', low: '(R^2-1)(R^2-4)', tri: '(R^2+1)(R^2+4)', R0: 3 };
  }
  const E = al === 1 ? 'e^(iz)' : al === -1 ? 'e^(-iz)' : `e^(${al}iz)`;
  const Rz = R.replace(/x/g, 'z');
  const fz = R.startsWith('1/') ? `${E}/${R.slice(2).replace(/x/g, 'z')}` : `z${E}/${R.slice(2).replace(/x/g, 'z')}`;
  const res = poles.map((z) => {
    const c = resRat(N, D, z);
    const ex = z.mul(cq(0, al));
    const exT = cT(ex);
    return { z, c, sub: `${cP(c)}e^(${kT(al)}i(${cT(z)}))`, val: c.eq(1) ? ek(exT) : `${cP(c)}e^(${exT})`, cos: `${cP(c)}cos(${al}(${cT(z)}))` };
  });
  const others = poles.map((z) => z.conj()).map((z) => {
    const c = resRat(N, D, z);
    return { z, c, val: `${cP(c)}e^(${cT(z.mul(cq(0, al)))})` };
  });
  const sgn = s > 0 ? '2πi' : '-2πi';
  const sumRes = res.map((r) => r.val).join('+');
  // Σ Res = e^(−|α|) sin|α|/4 on either side (the lower residues for α < 0).
  const sumText = kind === 'x4' ? `e^(${-A})sin(${A})/4` : null;
  // cos is even: the integral is written with |α| (α < 0 only for the even R).
  const intText = `int(${R.startsWith('1/') ? `${trig}(${kT(A)}x)/${R.slice(2)}` : `x${trig}(${kT(al)}x)/${R.slice(2)}`}, x, -∞, +∞)`;
  return { kind, al, s, A, a, N, D, poles, R, Rz, fz, E, J, real, trig, arc, res, others, sgn, sumRes, sumText, intText, id: `${kind}:${a}:${al}` };
}

function verify(d) {
  d.res.forEach((r) => checkRes(d.fz, cT(r.z), r.val));
  const v = evalComplex(parse(`${d.sgn}(${d.sumRes})`, { complex: true }), {});
  checkValue(d.J, v);
  if (d.sumText) checkValue(d.sumText, evalComplex(parse(d.sumRes, { complex: true }), {}));
}

const halfPlane = (s) => (s > 0 ? t('Le demi-plan supérieur (Im z ≥ 0)') : t('Le demi-plan inférieur (Im z ≤ 0)'));
const Jlabel = (d) => mathLabel('J', '<mi>J</mi>');

export function fourierParts(d, level, { arc = false, decisions = true, sum = true } = {}) {
  const parts = [];
  const MENU = [
    { id: 'eiaz', label: t('Intégrer R(z)e^(iαz) sur le contour'), valid: true },
    { id: 'res', label: t('Résidu : e^(iαz₀) · p(z₀)/q′(z₀)'), valid: true },
    { id: 'sum', label: t('{a} × la somme des résidus', { a: d.s > 0 ? '2πi' : '−2πi' }), valid: true },
    { id: 'arc', label: t('Majorer l\'intégrale sur l\'arc'), valid: true },
    { id: 're', label: d.trig === 'cos' ? t('Prendre la partie réelle') : t('Prendre la partie imaginaire'), valid: true },
    { id: 'cos', label: t('Intégrer R(z){trig}({a}z) sur le contour', { trig: d.trig, a: Math.abs(d.al) === 1 ? '' : Math.abs(d.al) }), valid: false, rule: 'c_eiax_cos', why: t('{trig}(αz) contient e^(−iαz), qui explose dans l\'autre demi-plan : l\'arc ne tend pas vers 0.', { trig: d.trig }) },
  ];
  const decs = decisions ? [
    {
      kind: 'decision', prompt: t('Quelle fonction intégrer sur le contour ?'), levels: [2, 3],
      options: [
        { id: 'e', label: d.trig === 'cos' ? t('R(z)e^(iαz) = {a}, puis la partie réelle', { a: CM(d.fz) }) : t('R(z)e^(iαz) = {a}, puis la partie imaginaire', { a: CM(d.fz) }), valid: true, ref: true },
        { id: 'cos', label: t('R(z){trig}(αz), directement', { trig: d.trig }), valid: false, rule: 'c_eiax_cos', why: t('|{trig}(αz)| croît comme e^(|α| |Im z|) : l\'intégrale sur l\'arc ne tend pas vers 0.', { trig: d.trig }) },
      ],
    },
    {
      kind: 'decision', prompt: t('α = {al}. Quel demi-cercle ?', { al: d.al }), levels: [2, 3],
      options: [
        { id: 'good', label: halfPlane(d.s), valid: true, ref: true },
        { id: 'bad', label: halfPlane(-d.s), valid: false, rule: 'c_jordan_alpha_sign', why: t('|e^(iαz)| = e^(−α Im z) : avec α = {al}, il est borné quand Im z {a} 0.', { al: d.al, a: d.s > 0 ? '≥' : '≤' }) },
      ],
    },
  ] : [];
  d.res.forEach((r, k) => {
    const J = CV(resLabel(cT(r.z)), r.val, { form: 'value' });
    const lines = chain(J, [r.sub, r.val]);
    parts.push({
      html: k === 0 ? '' : t('Pôle {a} :', { a: CM(cT(r.z)) }), ask: 'Res =', start: J.label, judge: J, menu: MENU, decisions: k === 0 ? decs : [],
      lines: lines.map((tt, j) => L(tt, j === lines.length - 1 ? t('Calculer l\'exposant') : `e^(iαz₀) · p(z₀)/q′(z₀), z₀ = ${rd(cT(r.z))}`, j === 0 && k === 0 ? 'poles' : 'residues', { blank: [tt] })),
    });
  });
  if (sum && d.sumText) {
    const JS = CV(mathLabel('Σ Res', '<mo>Σ</mo><mi>Res</mi>'), d.sumText, { form: 'algebraic' });
    parts.push({ html: t('La somme des résidus :'), ask: 'Σ Res =', start: JS.label, judge: JS, menu: MENU, lines: chain(JS, [d.sumRes, d.sumText]).map((tt, j, a) => L(tt, j === a.length - 1 ? 'e^(ix) − e^(−ix) = 2i sin x' : t('Additionner'), 'sum', { blank: [tt] })) });
  }
  if (arc && d.arc) {
    const J = { kind: 'arcb', rel: '≤', arc: d.s > 0 ? [0, Math.PI] : [Math.PI, 2 * Math.PI], R: [d.arc.R0, 50], traps: { c_arc_triangle: [`πR·${d.arc.num}/(${d.arc.tri})`] } };
    parts.push({ html: d.s > 0 ? t('L\'arc C_R (demi-cercle supérieur, longueur πR) : |e^(iαz)| ≤ 1 dessus.') : t('L\'arc C_R (demi-cercle inférieur, longueur πR) : |e^(iαz)| ≤ 1 dessus.'), ask: '|∫_{C_R}| ≤', start: `πR|${d.fz}|`, judge: J, menu: MENU, lines: [L(`πR·${d.arc.num}/(${d.arc.low})`, t('Longueur × max ; tend vers 0'), 'arc')] });
  }
  const traps = {
    c_jordan_alpha_sign: [{ line: `${d.s > 0 ? '-2πi' : '2πi'}(${d.others.map((o) => o.val).join('+')})`, ctx: { alpha: String(d.al).replace('-', '−'), sign: d.s > 0 ? '≥' : '≤' } }],
    c_upper_half_lower_pole: [`${d.s > 0 ? '2πi' : '-2πi'}(${d.others.map((o) => o.val).join('+')})`],
    c_residue_2pii: [d.sumRes],
    ...(d.trig === 'cos' ? { c_eiax_cos: [`${d.sgn}(${d.res.map((r) => r.cos).join('+')})`] } : {}),
  };
  const JV = CV(Jlabel(d), d.J, { form: /i/.test(d.J) ? 'algebraic' : 'real', traps });
  const vl = chain(JV, [`${d.sgn}(${d.sumText && sum ? d.sumText : d.sumRes})`, d.J]);
  parts.push({ html: d.arc ? t('Théorème des résidus (l\'arc tend vers 0) : J = ∫_ℝ R(x)e^(iαx) dx.') : t('Théorème des résidus (lemme de Jordan pour l\'arc) : J = ∫_ℝ R(x)e^(iαx) dx.'), ask: 'J =', start: JV.label, judge: JV, menu: MENU, lines: vl.map((tt, j) => L(tt, j === vl.length - 1 ? t('Simplifier') : `${d.s > 0 ? '2πi' : '−2πi'} × Σ Res`, 'value', { blank: [tt] })) });
  const known = { [toText(parse(d.intText))]: d.real };
  parts.push({ html: d.trig === 'cos' ? t('Partie réelle de J :') : t('Partie imaginaire de J :'), ask: '∫_ℝ … =', start: d.intText, judge: { kind: 'definite', known }, lines: [L(d.real, d.trig === 'cos' ? 'Re J' : 'Im J', 'value')] });
  return parts;
}

const intML = (d) => CM(d.intText.replace(/^int\((.*), x, -∞, \+∞\)$/, '$1'));

function fourierLines(level, rng, opts = {}) {
  const d = fourierData(rng);
  verify(d);
  const parts = fourierParts(d, level, { arc: level >= 4 });
  if (level === 1) {
    const fz = CM(d.fz);
    const up = d.s > 0;
    parts[0].notes = [d.trig === 'cos'
      ? (up ? t('On intègre f(z) = {fz} sur [−R ; R] fermé par le demi-cercle supérieur (Im z ≥ 0), puis on prend la partie réelle.', { fz }) : t('On intègre f(z) = {fz} sur [−R ; R] fermé par le demi-cercle inférieur (Im z ≤ 0), puis on prend la partie réelle.', { fz }))
      : (up ? t('On intègre f(z) = {fz} sur [−R ; R] fermé par le demi-cercle supérieur (Im z ≥ 0), puis on prend la partie imaginaire.', { fz }) : t('On intègre f(z) = {fz} sur [−R ; R] fermé par le demi-cercle inférieur (Im z ≤ 0), puis on prend la partie imaginaire.', { fz }))];
  }
  return partsItem({
    skill: SK, level, prompt: d.al < 0 ? t('Calcule ∫_ℝ {a} dx avec le théorème des résidus, en passant par J = ∫_ℝ {b} dx (α = {c}).', { a: intML(d), b: CM(`${d.fz.replace(/z/g, 'x')}`), c: rd(String(d.al)) }) : t('Calcule ∫_ℝ {a} dx avec le théorème des résidus.', { a: intML(d) }),
    parts, keys: [...KEYS, 'anal'], subgoals: SUB,
    hints: H(d.s > 0 ? t('Intègre R(z)e^(iαz) : avec α = {al}, |e^(iαz)| ≤ 1 quand Im z ≥ 0, on ferme en haut.', { al: d.al }) : t('Intègre R(z)e^(iαz) : avec α = {al}, |e^(iαz)| ≤ 1 quand Im z ≤ 0, on ferme en bas.', { al: d.al }), `Res = e^(iαz₀) p(z₀)/q′(z₀) : ${d.res.map((r) => CM(r.sub)).join(' ; ')}`, `J = ${CM(d.J)}`),
    key: `${SK}:${level}:${d.id}`, exam: examTag(opts),
    baits: ['c_eiax_cos', 'c_jordan_alpha_sign', 'c_upper_half_lower_pole', 'c_residue_2pii'],
  });
}

// The exam example C1 (11 points): ∫_ℝ x e^(iαx)/(x⁴ + 4) dx.
function fourierC1(level, rng, opts = {}) {
  const al = pick(rng, [1, 2, 3]);
  const d = fourierData(rng, { kind: 'x4', al });
  verify(d);
  const p1 = mcq({
    skill: SK, level, key: `${SK}:c1f:${al}`,
    prompt: t('Quelle fonction et quel contour ?'),
    options: [
      { html: t('f(z) = {a} ; segment [−R ; R] et demi-cercle supérieur', { a: CM(d.fz) }), correct: true },
      { html: t('f(z) = {a} ; segment [−R ; R] et demi-cercle inférieur', { a: CM(d.fz) }), correct: false, rule: 'c_jordan_alpha_sign' },
      { html: t('f(z) = {a} ; segment [−R ; R] et demi-cercle supérieur', { a: CM(`z sin(${kT(al)}z)/(z^4+4)`) }), correct: false, rule: 'c_eiax_cos' },
      { html: t('f(z) = {a} ; le cercle |z| = 1', { a: CM(d.fz) }), correct: false },
    ],
  }, rng);
  const p2 = mcq({
    skill: SK, level, key: `${SK}:c1p:${al}`,
    prompt: t('Les pôles de f dans le demi-plan supérieur :'),
    options: [
      { html: t('{a} et {b}', { a: CM('1+i'), b: CM('-1+i') }), correct: true },
      { html: t('{a}, {b}, {c} et {d}', { a: CM('1+i'), b: CM('-1+i'), c: CM('1-i'), d: CM('-1-i') }), correct: false, rule: 'c_pole_outside_counted' },
      { html: t('{a} et {b}', { a: CM('1-i'), b: CM('-1-i') }), correct: false, rule: 'c_upper_half_lower_pole' },
      { html: t('{a} seulement', { a: CM('√2 i') }), correct: false },
    ],
  }, rng);
  const parts = fourierParts(d, 4, { arc: true, decisions: false });
  const item = partsItem({ skill: SK, level, prompt: t('Les résidus, la somme, J, l\'arc et la conclusion.'), parts, keys: [...KEYS, 'anal'], subgoals: SUB, hints: [], key: `${SK}:c1l:${al}` });
  return problemItem({
    skill: SK, level, key: `C1:${al}`, exam: opts.exam ? examTag(opts, 11) : false,
    prompt: t('Calculer, avec le théorème des résidus et en simplifiant, ∫_ℝ {a} dx (format 2022, 11 points). En déduire ∫_ℝ {b} dx.', { a: CM(`xe^(${kT(al)}ix)/(x^4+4)`), b: CM(`x sin(${kT(al)}x)/(x^4+4)`) }),
    parts: [
      { item: p1, points: 1, title: t('Fonction et contour') },
      { item: p2, points: 1.5, title: t('Pôles du demi-plan supérieur') },
      // Residues 1,5 + 1,5 ; sum 0,5 ; ∮ 1 ; arc 3 ; conclusion 1.
      { item, points: [1.5, 1.5, 0.5, 3, 1, 1], title: t('Résidus, somme, arc et conclusion') },
    ],
  });
}

function fourierMcq(rng, opts) {
  const a = pick(rng, [1, 2, 3]);
  const al = pick(rng, [1, 2, 3, -1, -2]);
  const A = Math.abs(al);
  const k = A * a;
  const div = a === 1 ? '' : `/${a}`;
  const val = `πe^(${-k})${div}`;
  const R = `cos(${kT(A)}x)/(x^2+${a * a})`;
  if (opts.multi) {
    return choice({
      skill: SK, level: 4, key: `${SK}:mcq:m:${a}:${al}`, exam: examTag(opts, 2), multi: true, count: 5,
      prompt: t('I = ∫_ℝ {a} dx. Quelles affirmations sont vraies ? (plusieurs réponses possibles)', { a: CM(R) }),
      right: `I = ${CM(val)}`, rights: [`I = Re ∫_ℝ ${CM(`e^(${al}ix)/(x^2+${a * a})`)} dx`],
      wrongs: [
        { html: al > 0 ? t('On ferme dans le demi-plan inférieur') : t('On ferme dans le demi-plan supérieur'), rule: 'c_jordan_alpha_sign' },
        { html: t('On intègre {a} sur le contour fermé', { a: CM(`cos(${al}z)/(z^2+${a * a})`) }), rule: 'c_eiax_cos' },
        { html: `I = ${CM(`πcosh(${k})${div}`)}`, rule: 'c_eiax_cos' },
      ],
      solution: [{ html: `I = Re(2πi Res) = ${CM(val)}.`, note: '' }],
      expectedSec: 180,
    }, rng);
  }
  return choice({
    skill: SK, level: 4, key: `${SK}:mcq:${a}:${al}`, exam: examTag(opts, 2),
    prompt: `∫_ℝ ${CM(R)} dx =`,
    right: CM(val), rightText: val,
    wrongs: [opt(`πe^(${k})${div}`, 'c_jordan_alpha_sign'), opt(`π${div}`), opt(`πcosh(${k})${div}`, 'c_eiax_cos'), opt(`-πe^(${-k})${div}`, 'c_upper_half_lower_pole')],
    fillers: [opt(`2πe^(${-k})${div}`)],
    solution: [{ html: `∫ = Re ∫ e^(iαx)/(x² + a²) dx = Re(2πi · e^(−|α|a)/(2ai)) = ${CM(val)}.`, note: '' }],
    expectedSec: 150,
  }, rng);
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return fourierMcq(rng, opts);
    if (opts.exam === 'open' || level === 5) return fourierC1(5, rng, opts);
    return fourierLines(level, rng, opts);
  },
};
