// Generators of module A1, part l (step U4): complex numbers at BA1.
// Catalogue: docs/universite/A1-analyse-1.md, « Complexes »:
// a1-cplx-exam and a1-cplx-zn-conj.
//
// a1-cplx-exam: lines in parts, judge `complex` — the quotient brought to
// a + bi (iᵏ reduced, conjugate), its polar form (r > 0, φ principal),
// then zᵐ by Moivre back to a + bi; or Re/Im of wᵐ with w = ±1 ± i√3,
// ±√3 ± i. Levels: 1–2 guided (blanks on the iᵏ, then on r and φ;
// decisions at level 2), 3 « choose the action », 4 free, 5 alone (a
// multiple choice of the exam, or the lines without help).
// a1-cplx-zn-conj: zⁿ = z̄, 1/z̄, |z|, c·z̄ in parts — z̄ (or |z|) in r and
// φ (`complex` with the real letters r, φ), the moduli (`solset` in r on
// [0 ; +∞[, with the decision « r = 0 first »), the arguments (`solset`
// in φ with k), the set of solutions (`complex`, form `set`, from
// « z = 0 ou zᵐ = 1 »), then the count (`value`).

import { Q } from '../../math/rational.js';
import { CQ } from '../../cas/complex.js';
import { parse } from '../../cas/parse.js';
import { blankLine } from '../../judges/lines.js';
import { MT, linesItem, mcq, tfItem } from './kit.js';
import { modeOf, H, E, partsScript, piText, fr, sup } from './analyse1-e-kit.js';

const CX = { complex: true };
const q = (n, d = 1) => new Q(n, d);
const uniqHtml = (opts) => opts.filter((o, i, a) => a.findIndex((x) => x.html === o.html) === i);
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));

// ---------- numbers as text ----------

// θ = c·π brought into ]−π ; π].
export function principal(c) {
  const k = Math.ceil((c.valueOf() - 1) / 2);
  return c.sub(q(2 * k));
}
// e^(iθ) with θ = c·π: e^(iπ), e^(-3iπ/4), e^(9iπ/2).
export function expI(c) {
  const s = c.n < 0 ? '-' : '';
  const a = Math.abs(c.n);
  return `e^(${s}${a === 1 ? '' : a}iπ${c.d === 1 ? '' : `/${c.d}`})`;
}
const polarText = (r, c) => (c.n === 0 ? r : r === '1' ? expI(c) : `${r}${expI(c)}`);

// a + bi with a, b whole numbers: 3 − 2i, −i, 16.
export function gaussText(re, im) {
  const a = Number(re);
  const b = Number(im);
  const bi = b === 1 ? 'i' : b === -1 ? '-i' : `${b}i`;
  if (b === 0) return String(a);
  if (a === 0) return bi;
  return `${a}${b > 0 ? '+' : ''}${bi}`;
}

// A number q·√s (s = 1, 2, 3) as text: 3, −1/2, √3, 3√3/2, −√2/2.
function surd(qq, s) {
  if (qq.n === 0) return '0';
  const sg = qq.n < 0 ? '-' : '';
  const a = Math.abs(qq.n);
  if (s === 1) return `${sg}${a}${qq.d === 1 ? '' : `/${qq.d}`}`;
  return `${sg}${a === 1 ? '' : a}√${s}${qq.d === 1 ? '' : `/${qq.d}`}`;
}
// The imaginary part q·√s·i as text: i, −2i, 3i/2, i√3/2, −2i√3.
function surdI(qq, s) {
  const sg = qq.n < 0 ? '-' : '';
  const a = Math.abs(qq.n);
  const den = qq.d === 1 ? '' : `/${qq.d}`;
  if (s === 1) return `${sg}${a === 1 ? '' : a}i${den}`;
  return `${sg}${a === 1 ? '' : a}i√${s}${den}`;
}
// cos and sin of c·π for c with denominator 1, 2, 3, 4 or 6: [q, s] pairs.
function trigExact(c) {
  const t = principal(c);
  const deg = Math.round(t.valueOf() * 180);
  const TABLE = {
    0: [[1, 1], [0, 1]], 30: [[q(1, 2), 3], [q(1, 2), 1]], 45: [[q(1, 2), 2], [q(1, 2), 2]], 60: [[q(1, 2), 1], [q(1, 2), 3]],
    90: [[0, 1], [1, 1]], 120: [[q(-1, 2), 1], [q(1, 2), 3]], 135: [[q(-1, 2), 2], [q(1, 2), 2]], 150: [[q(-1, 2), 3], [q(1, 2), 1]], 180: [[-1, 1], [0, 1]],
  };
  const neg = deg < 0;
  const row = TABLE[Math.abs(deg)];
  if (!row) return null;
  const [[cq, cs], [sq, ss]] = row;
  return { cos: [Q.of(cq), cs], sin: [neg ? Q.of(sq).neg() : Q.of(sq), ss] };
}
// r0·e^(iθ) written a + bi when θ is a known angle, else r0·e^(iθ).
function rootText(r0, c) {
  const t = trigExact(c);
  if (!t) return polarText(r0 === 1 ? '1' : String(r0), principal(c));
  const re = t.cos[0].mul(r0);
  const im = t.sin[0].mul(r0);
  const reT = surd(re, t.cos[1]);
  if (im.n === 0) return reT;
  const imT = surdI(im, t.sin[1]);
  return re.n === 0 ? imT : `${reT}${im.n > 0 ? '+' : ''}${imT}`;
}

// Blanks on the sub-expressions of a line chosen by pick(node) → [nodes].
function blankBy(line, pick) {
  const node = parse(line.math, CX);
  const holes = pick(node).filter(Boolean);
  return holes.length ? { ...line, ...blankLine(node, holes, CX) } : line;
}
const strip = (n) => (n.t === 'paren' ? strip(n.e) : n);
// The terms of a sum (bin + and −), without their sign.
function termsOf(n, out = []) {
  n = strip(n);
  if (n.t === 'bin' && (n.op === '+' || n.op === '-')) { termsOf(n.l, out); out.push(strip(n.r)); return out; }
  out.push(n.t === 'neg' ? strip(n.e) : n);
  return out;
}
// r and the exponent of r·e^(iθ).
function polarHoles(n) {
  n = strip(n);
  if (n.t === 'bin' && n.op === '×') return [n.l, strip(n.r).e];
  return [n.e];
}

// ======================================================================
// a1-cplx-exam
// ======================================================================

const EX = 'a1-cplx-exam';
const EX_SUB = [
  { id: 'alg', label: 'réduire iᵏ, conjugué', skill: 'g8-algebraic' },
  { id: 'polar', label: 'forme polaire', skill: 'g8-polar' },
  { id: 'moivre', label: 'Moivre', skill: 'g8-moivre' },
  { id: 'power', label: 'zᵐ en a + bi', skill: EX },
];
const EX_CHOICES = [
  { id: 'ik', label: 'Réduire les puissances de i modulo 4' },
  { id: 'conj', label: 'Multiplier haut et bas par le conjugué du dénominateur' },
  { id: 'alg', label: 'Revenir à la forme a + bi' },
  { id: 'polar', label: 'Passer en forme polaire r·e^(iφ), r > 0' },
  { id: 'moivre', label: 'Appliquer Moivre : (r·e^(iφ))ᵐ = rᵐ·e^(imφ)' },
  { id: 'reduce', label: 'Ramener l\'argument dans ]−π ; π]' },
  { id: 'part', label: 'Prendre la partie réelle ou imaginaire : r·cos θ, r·sin θ' },
  { id: 'eval', label: 'Calculer la valeur exacte' },
  { id: 'split', label: 'Élever la partie réelle et la partie imaginaire séparément', why: 'Une puissance ne se distribue pas sur une somme : (a + bi)ᵐ ≠ aᵐ + bᵐiᵐ.' },
];
const cA = { kind: 'complex', complex: true };
const cP = { kind: 'complex', complex: true, form: 'exp', arg: 'principal' };
const cR = { kind: 'complex', complex: true, form: 'real' };

// z = a + bi with a polar form of φ multiple of π/4, never a positive real.
function zPick(rng) {
  if (rng.chance(0.65)) {
    const m = rng.pick([1, 1, 2, 2, 3]);
    const sa = rng.pick([1, -1]);
    const sb = rng.pick([1, -1]);
    return { a: sa * m, b: sb * m, r: m === 1 ? '√2' : `${m}√2`, rc: m, s2: true, phi: q(sb * (sa > 0 ? 1 : 3), 4) };
  }
  const R = rng.pick([1, 2]);
  const [a, b, phi] = rng.pick([[-R, 0, q(1)], [0, R, q(1, 2)], [0, -R, q(-1, 2)]]);
  return { a, b, r: String(R), rc: R, s2: false, phi };
}
// rᵐ as text: (c√2)ᵐ = cᵐ·2^(m/2).
function rPow(z, m) {
  const c = z.rc ** m * (z.s2 ? 2 ** Math.floor(m / 2) : 1);
  const root = z.s2 && m % 2 === 1;
  return { text: root ? (c === 1 ? '√2' : `${c}√2`) : String(c), value: c * (root ? Math.SQRT2 : 1) };
}

// α·i^p + β·i^q equal to u + vi, p and q in [5 ; 99], α, β in [−6 ; 6] ∖ {0}.
function numerator(u, v, rng) {
  const P = (pm) => { let p = 4 * rng.int(1, 24) + pm; if (p < 5) p += 4; return p; };
  const term = (val, pm) => ({ a: [0, 1].includes(pm) ? val : -val, p: P(pm) });
  let terms;
  if (u !== 0 && v !== 0) terms = rng.shuffle([term(u, rng.pick([0, 2])), term(v, rng.pick([1, 3]))]);
  else {
    const val = u !== 0 ? u : v;
    const kinds = u !== 0 ? [0, 2] : [1, 3];
    for (let t = 0; t < 50 && !terms; t++) {
      const [pm1, pm2] = [rng.pick(kinds), rng.pick(kinds)];
      const s1 = [0, 1].includes(pm1) ? 1 : -1;
      const s2 = [0, 1].includes(pm2) ? 1 : -1;
      const alpha = rng.pick([-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]);
      const beta = (val - alpha * s1) * s2;
      if (beta !== 0 && Math.abs(beta) <= 6) terms = [{ a: alpha, p: P(pm1) }, { a: beta, p: P(pm2) }];
    }
    if (!terms) return null;
  }
  const coef = (a, body) => (a === 1 ? body : a === -1 ? `-${body}` : `${a}${body}`);
  const join = (parts) => parts.reduce((s, t) => (s ? (t.startsWith('-') ? `${s}${t}` : `${s}+${t}`) : t), '');
  const text = join(terms.map((t) => coef(t.a, `i^${t.p}`)));
  // Reduced: α·i^(p mod 4).
  const red = (t) => {
    const k = t.p % 4;
    const val = [t.a, t.a, -t.a, -t.a][k];
    return [0, 2].includes(k) ? String(val) : coef(val, 'i');
  };
  const reduced = join(terms.map(red));
  return { text, reduced, terms };
}

function exData(rng) {
  for (let t = 0; t < 200; t++) {
    const z = zPick(rng);
    const m = rng.int(4, 14);
    const R = rPow(z, m);
    if (R.value > 4100) continue;
    const s = rng.pick([1, -1]);
    const N = new CQ(z.a, z.b).mul(new CQ(1, s));
    const num = numerator(N.re.valueOf(), N.im.valueOf(), rng);
    if (!num) continue;
    const zm = new CQ(z.a, z.b).pow(m);
    const Th = z.phi.mul(m);
    return { z, m, R, s, N, num, zm, Th, ThP: principal(Th) };
  }
  return null;
}
const FALLBACK_EX = () => {
  const z = { a: -1, b: -1, r: '√2', rc: 1, s2: true, phi: q(-3, 4) };
  return { z, m: 6, R: { text: '8', value: 8 }, s: 1, N: new CQ(0, -2), num: { text: '3i^7+i^13', reduced: '-3i+i', terms: [{ a: 3, p: 7 }, { a: 1, p: 13 }] }, zm: new CQ(0, -8), Th: q(-9, 2), ThP: q(-1, 2), fallback: true };
};

function exQuotientLines(level, rng, opts) {
  const d = exData(rng) || FALLBACK_EX();
  const { z, m, R, s } = d;
  const den = `(1${s > 0 ? '+' : '-'}i)`;
  const conj = `(1${s > 0 ? '-' : '+'}i)`;
  const Q0 = `(${d.num.text})/${den}`;
  const zText = gaussText(z.a, z.b);
  const Ntext = gaussText(d.N.re.valueOf(), d.N.im.valueOf());
  const polar = polarText(z.r, z.phi);
  const finalText = gaussText(d.zm.re.valueOf(), d.zm.im.valueOf());
  // Part 1: z in a + bi.
  const l1 = [
    E(`(${d.num.reduced})/${den}`, 'Réduire iᵏ modulo 4', 'alg', 'ik'),
    E(`${/[+-]/.test(Ntext.slice(1)) ? `(${Ntext})` : Ntext}${conj}/2`, `Multiplier haut et bas par ${s > 0 ? '1 − i' : '1 + i'}`, 'alg', 'conj'),
    E(zText, 'Forme algébrique', 'alg', 'alg'),
  ];
  if (level === 1) l1[0] = blankBy(l1[0], (n) => termsOf(strip(n).n));
  if (level === 2) {
    l1[0] = blankBy(l1[0], (n) => [strip(n).n]);
    l1[2] = blankBy(l1[2], (n) => (termsOf(n).length === 2 ? termsOf(n) : [n]));
  }
  // Part 2: polar form.
  const l2 = [E(polar, `r = ${fr(z.r)}, φ = ${fr(piText(z.phi))}`, 'polar', 'polar')];
  if (level <= 2) l2[0] = blankBy(l2[0], polarHoles);
  const negPhi = principal(z.phi.add(q(1)));
  const polarDecision = { kind: 'decision', prompt: `Module et argument de z = ${MT(zText, CX)} :`, options: rng.shuffle([
    { id: 'ok', label: `r = ${fr(z.r)}, φ = ${fr(piText(z.phi))}`, valid: true, ref: true },
    { id: 'neg', label: `r = −${fr(z.r)}, φ = ${fr(piText(negPhi))}`, valid: false, rule: 'a1_polar_r_negative', why: `Le module est positif : r = |z| = ${fr(z.r)}. Le signe se met dans l'argument.` },
  ]) };
  // Part 3: zᵐ by Moivre.
  const l3 = [
    E(`(${polar})^${m}`, 'Forme polaire', 'polar', 'polar'),
    E(polarText(R.text, d.Th), 'Moivre : rᵐ et m·φ', 'moivre', 'moivre'),
  ];
  if (!d.ThP.eq(d.Th) && d.ThP.n !== 0) l3.push(E(polarText(R.text, d.ThP), 'Argument dans ]−π ; π]', 'moivre', 'reduce'));
  l3.push(E(finalText, 'Forme algébrique', 'power', 'alg'));
  if (level === 1) l3[1] = blankBy(l3[1], (n) => [polarHoles(n)[0]]);
  if (level === 2) l3[1] = blankBy(l3[1], polarHoles);
  const powDecision = { kind: 'decision', prompt: `Pour calculer z^${m} :`, options: [
    { id: 'moivre', label: 'Forme polaire, puis Moivre', valid: true, ref: true },
    { id: 'binom', label: `Développer (${fr(zText)})${sup(`^${m}`)} avec le binôme`, valid: true, quality: 'poor', why: `Juste, mais il y a ${m + 1} termes à calculer : la forme polaire va plus vite.` },
    { id: 'split', label: `Élever ${fr(gaussText(z.a, 0))} et ${fr(gaussText(0, z.b))} à la puissance ${m} séparément`, valid: false, why: 'Une puissance ne se distribue pas sur une somme.' },
  ] };
  const parts = [
    { start: Q0, judge: cA, lines: l1 },
    { html: 'Forme polaire de z (r > 0, φ dans ]−π ; π]) :', ask: 'z =', start: zText, judge: cP, pre: level === 2 ? [polarDecision] : [], lines: l2 },
    { html: `Calcule z${sup(`^${m}`)} et écris-le sous la forme a + bi :`, ask: `z${sup(`^${m}`)} =`, start: zText === "i" ? `i^${m}` : `(${zText})^${m}`, judge: cA, pre: level === 2 ? [powDecision] : [], lines: l3 },
  ];
  const { start, judge, script } = partsScript(parts, level, EX_CHOICES);
  return linesItem({
    skill: EX, level, mode: modeOf(level), start, judge, script,
    prompt: `Soit z = ${MT(Q0, CX)}. Écris z sous la forme a + bi, puis sous forme polaire, et calcule ${MT(`z^${m}`, { vars: ['z'] })}.`,
    hints: H('Réduis les exposants de i modulo 4, puis débarrasse-toi du dénominateur avec son conjugué. Pour la puissance, passe en forme polaire avec r > 0.',
      `z = ${MT(zText, CX)} = ${z.r === '1' ? '' : `${fr(z.r)}·`}e^(i·▢), puis z${sup(`^${m}`)} = ${R.text === '1' ? '' : `${fr(R.text)}·`}e^(i·▢).`,
      `z = ${MT(zText, CX)} = ${MT(polar, CX)}, donc z${sup(`^${m}`)} = ${MT(polarText(R.text, d.Th), CX)} = ${MT(finalText, CX)}.`),
    subgoals: EX_SUB, keys: ['cplx', 'calc'], tapActions: level === 3 ? 'steps' : null,
    key: `${EX}:${level}:${Q0}:${m}`, exam: false, fallback: !!d.fallback, noHints: level >= 5 || !!opts.noHints,
  });
}

// w = r·e^(iφ) with r = 2 and φ a multiple of π/6 (not of π/2).
const W = [
  ['1+i√3', q(1, 3)], ['-1+i√3', q(2, 3)], ['1-i√3', q(-1, 3)], ['-1-i√3', q(-2, 3)],
  ['√3+i', q(1, 6)], ['-√3+i', q(5, 6)], ['√3-i', q(-1, 6)], ['-√3-i', q(-5, 6)],
];
function exPartLines(level, rng, opts) {
  const [w, phi] = rng.pick(W);
  const m = rng.int(3, 10);
  const part = rng.pick(['Re', 'Im']);
  const R = 2 ** m;
  const Th = phi.mul(m);
  const t = trigExact(Th);
  const [vq, vs] = part === 'Re' ? t.cos : t.sin;
  const value = surd(vq.mul(R), vs);
  const fn = part === 'Re' ? 'cos' : 'sin';
  const pw = polarText('2', phi);
  const l1 = [E(pw, `r = 2, φ = ${fr(piText(phi))}`, 'polar', 'polar')];
  const l2 = [
    E(`${part}((${pw})^${m})`, 'Forme polaire', 'polar', 'polar'),
    E(`${part}(${polarText(String(R), Th)})`, 'Moivre', 'moivre', 'moivre'),
    E(`${R}${fn}(${piText(Th)})`, `${part}(r·e^(iθ)) = r·${fn} θ`, 'power', 'part'),
    E(value, 'Valeur exacte', 'power', 'eval'),
  ];
  if (level <= 2) l1[0] = blankBy(l1[0], polarHoles);
  if (level === 1) l2[1] = blankBy(l2[1], (n) => [polarHoles(strip(n).args[0])[0]]);
  if (level === 2) l2[2] = blankBy(l2[2], (n) => [strip(n).r ?? n]);
  const parts = [
    { start: w, judge: cP, lines: l1 },
    { html: `Calcule ${part}(w${sup(`^${m}`)}) :`, ask: `${part}(w${sup(`^${m}`)}) =`, start: `${part}((${w})^${m})`, judge: cR, lines: l2 },
  ];
  const { start, judge, script } = partsScript(parts, level, EX_CHOICES);
  return linesItem({
    skill: EX, level, mode: modeOf(level), start, judge, script,
    prompt: `Soit w = ${MT(w, CX)}. Écris w sous forme polaire, puis calcule ${part === 'Re' ? 'la partie réelle' : 'la partie imaginaire'} de ${MT(`w^${m}`, { vars: ['w'] })}.`,
    hints: H(`Passe en forme polaire : |w| = 2. Puis Moivre, et ${part}(r·e^(iθ)) = r·${fn} θ.`,
      `w = 2·e^(i·▢), donc w${sup(`^${m}`)} = ${R}·e^(i·▢).`,
      `${MT(`${part}(${polarText(String(R), Th)})`, CX)} = ${MT(`${R}${fn}(${piText(Th)})`)} = ${MT(value)}.`),
    subgoals: EX_SUB, keys: ['cplx', 'calc'], tapActions: level === 3 ? 'steps' : null,
    key: `${EX}:${level}:part:${w}:${m}:${part}`, exam: false, noHints: level >= 5 || !!opts.noHints,
  });
}

// Multiple choice (a): zᵐ for the quotient; distractors from the traps.
function exPowerMcq(level, rng, exam) {
  const d = exData(rng) || FALLBACK_EX();
  const { z, m, s } = d;
  const Q0 = `(${d.num.text})/(1${s > 0 ? '+' : '-'}i)`;
  const right = d.zm;
  const opt = (c, extra) => ({ html: MT(gaussText(c.re.valueOf(), c.im.valueOf()), CX), ...extra });
  // iᵏ reduced as −i^(k mod 4): the numerator changes sign term by term.
  const wrongNum = d.num.terms.reduce((acc, t) => acc.add(new CQ(0, 1).pow(t.p % 4).mul(-t.a)), new CQ(0));
  const wrongZ = wrongNum.div(new CQ(1, s));
  const cands = [
    opt(right, { correct: true }),
    opt(wrongZ.pow(m), { correct: false, rule: 'a1_cplx_ik_mod' }),
    ...(m % 2 === 1 ? [opt(right.neg(), { correct: false, rule: 'a1_polar_r_negative' })] : []),
    opt(right.conj(), { correct: false }),
    opt(right.mul(new CQ(0, 1)), { correct: false }),
    opt(right.neg(), { correct: false }),
    opt(right.mul(new CQ(0, -1)), { correct: false }),
    opt(right.mul(2), { correct: false }),
    opt(new CQ(z.a, z.b).pow(m - 1), { correct: false }),
  ];
  const options = uniqHtml(cands).filter((o, i, a) => o.correct || !a.some((x, j) => j < i && x.correct && x.html === o.html)).slice(0, 4);
  return mcq({
    skill: EX, level, prompt: `Soit z = ${MT(Q0, CX)}. Alors ${MT(`z^${m}`, { vars: ['z'] })} =`, options,
    key: `${EX}:mcq:${Q0}:${m}`, expectedSec: 240, exam, fallback: !!d.fallback,
    solution: [{ html: `z = ${MT(gaussText(z.a, z.b), CX)} = ${MT(polarText(z.r, z.phi), CX)}, donc z${sup(`^${m}`)} = ${MT(polarText(d.R.text, d.Th), CX)} = ${MT(gaussText(right.re.valueOf(), right.im.valueOf()), CX)}.`, note: '' }],
  }, rng);
}

// Multiple choice (b): w = 1 + i√3 …, which statement is true?
function exStatementMcq(level, rng, exam) {
  const [w, phi] = rng.pick(W);
  const k = phi.mul(6).valueOf(); // φ = kπ/6
  const mod12 = (x) => ((x % 12) + 12) % 12;
  const pool = [];
  for (let m = 4; m <= 14; m++) {
    const t = mod12(k * m);
    const R = 2 ** m;
    pool.push({ html: `${MT(`w^${m}`, { vars: ['w'] })} ∈ ℝ`, truth: t % 6 === 0 });
    pool.push({ html: `Re(${MT(`w^${m}`, { vars: ['w'] })}) > 0`, truth: [0, 1, 2, 10, 11].includes(t) });
    pool.push({ html: `Im(${MT(`w^${m}`, { vars: ['w'] })}) < 0`, truth: t >= 7 });
    pool.push({ html: `${MT(`w^${m}`, { vars: ['w'] })} est imaginaire pur`, truth: t % 6 === 3 });
    const c = rng.int(3, 9);
    if (Math.abs(R - c ** 3) > 10) pool.push({ html: `|${MT(`w^${m}`, { vars: ['w'] })}| > ${c}³`, truth: R > c ** 3 });
  }
  const trues = pool.filter((p) => p.truth);
  const falses = rng.shuffle(pool.filter((p) => !p.truth));
  const right = rng.pick(trues);
  const options = [{ html: right.html, correct: true }, ...uniqHtml(falses).filter((f) => f.html !== right.html).slice(0, 3).map((f) => ({ html: f.html, correct: false }))];
  return mcq({
    skill: EX, level, prompt: `Soit w = ${MT(w, CX)}. Quelle affirmation est vraie ?`, options,
    key: `${EX}:mcq:stmt:${w}:${right.html}`, expectedSec: 240, exam,
    solution: [{ html: `w = ${MT(polarText('2', phi), CX)} : wᵐ = 2ᵐ·e^(i·m·${fr(piText(phi))}). On lit le quadrant de m·${fr(piText(phi))}, et |wᵐ| = 2ᵐ.`, note: '' }],
  }, rng);
}

function exTf(rng) {
  const kind = rng.pick(['roots4', 'arg', 'omega', 'ik', 'rneg', 'real', 'rePos']);
  const exam = { format: 'tf', points: 1 };
  if (kind === 'roots4') {
    return tfItem({ skill: EX, level: 4, statement: 'Pour tout réel y ≠ 0, l\'équation z⁴ = iy a exactement 4 solutions distinctes.', truth: true, key: 'roots4', exam,
      explanation: 'Vrai : iy ≠ 0 a un module |y| > 0, et ses racines quatrièmes sont |y|^(1/4)·e^(i(φ + 2kπ)/4), k = 0, 1, 2, 3 : quatre arguments distincts.' });
  }
  if (kind === 'arg') {
    const [th, p] = rng.pick([[q(1, 4), 2], [q(1, 6), 2], [q(1, 6), 3], [q(1, 8), 3], [q(1, 5), 2]]);
    const res = th.mul(-p);
    return tfItem({ skill: EX, level: 4, statement: `Si arg z = ${fr(piText(th))}, alors arg(1/z${sup(`^${p}`)}) = ${fr(piText(res))}.`, truth: true, key: `arg:${th}:${p}`, exam,
      explanation: `Vrai : z = r·e^(i${fr(piText(th))}), donc 1/z${sup(`^${p}`)} = r${sup(`^-${p}`)}·e^(−${p}i${fr(piText(th))}) avec r${sup(`^-${p}`)} > 0 ; ${fr(piText(res))} est dans ]−π ; π].` });
  }
  if (kind === 'omega') {
    return tfItem({ skill: EX, level: 4, statement: 'Pour tout ω ≠ 0, il existe une infinité de nombres complexes z tels que Im(ωz) = 0.', truth: true, key: 'omega', exam,
      explanation: 'Vrai : z = t/ω avec t réel quelconque donne ωz = t, réel. Les z forment une droite par 0.' });
  }
  if (kind === 'ik') {
    const r = rng.pick([1, 3]);
    const val = r === 1 ? 'i' : '−i';
    const wrongVal = r === 1 ? '−i' : 'i';
    return tfItem({
      skill: EX, level: 4, statement: `Pour tout n ∈ ℕ, i^(4n + ${r}) = ${wrongVal}.`, truth: false, key: `ik:${r}`, exam,
      counter: { kind: 'refute', quants: [{ q: '∀', v: 'n', dom: 'N' }], pred: `sin((4n+${r})π/2)=${r === 1 ? -1 : 1}`, ask: [{ v: 'n', label: 'n =' }], answer: { n: '1' } },
      ruleIfTrue: 'a1_cplx_ik_mod',
      explanation: `Faux : i⁴ = 1, donc i^(4n + ${r}) = i${sup(`^${r}`)} = ${val} pour tout n. Par exemple n = 1 : i${sup(`^${4 + r}`)} = ${val}.`,
    });
  }
  if (kind === 'rneg') {
    const [th, txt] = rng.pick([[q(1, 3), 'π/3'], [q(1, 4), 'π/4'], [q(2, 3), '2π/3']]);
    void th;
    return tfItem({
      skill: EX, level: 4, statement: `Pour tout réel r ≠ 0, le nombre r·e^(i${txt}) a pour module r et pour argument ${txt}.`, truth: false, key: `rneg:${txt}`, exam,
      counter: { kind: 'refute', quants: [{ q: '∀', v: 'r', dom: 'R' }], pred: 'r=0 ∨ |r|=r', hyp: 'r≠0', ask: [{ v: 'r', label: 'r =' }], answer: { r: '-2' } },
      ruleIfTrue: 'a1_polar_r_negative',
      explanation: `Faux pour r < 0 : −2·e^(i${txt}) a pour module 2 et pour argument ${txt} ± π. Un module est toujours positif.`,
    });
  }
  // (1 + i)ⁿ ∉ ℝ, Re((1 + i)ⁿ) ≥ 0: false for some n.
  const [w, k] = rng.pick([['1+i', 4], ['1+i√3', 6], ['√3+i', 12], ['1-i', 4]]);
  // φ = ±2π/k.
  const phiDen = k / 2;
  const sgn = w.includes('-') ? -1 : 1;
  if (kind === 'real') {
    return tfItem({
      skill: EX, level: 4, statement: `Pour tout n ∈ ℕ*, ${MT(`(${w})^n`, { ...CX, vars: ['n'] })} n'est pas réel.`, truth: false, key: `real:${w}`, exam,
      counter: { kind: 'refute', quants: [{ q: '∀', v: 'n', dom: 'N*' }], pred: `sin(nπ/${phiDen})≠0`, ask: [{ v: 'n', label: 'n =' }], answer: { n: String(phiDen) } },
      explanation: `Faux : arg(${fr(w)}) = ${sgn < 0 ? '−' : ''}π/${phiDen}, donc (${fr(w)})ⁿ est réel dès que n·π/${phiDen} est un multiple de π, par exemple n = ${phiDen}.`,
    });
  }
  return tfItem({
    skill: EX, level: 4, statement: `Pour tout n ∈ ℕ*, Re(${MT(`(${w})^n`, { ...CX, vars: ['n'] })}) ≥ 0.`, truth: false, key: `re:${w}`, exam,
    counter: { kind: 'refute', quants: [{ q: '∀', v: 'n', dom: 'N*' }], pred: `cos(nπ/${phiDen})≥0`, ask: [{ v: 'n', label: 'n =' }], answer: { n: String(phiDen) } },
    explanation: `Faux : Re((${fr(w)})ⁿ) = |${fr(w)}|ⁿ·cos(nπ/${phiDen}), négatif pour n = ${phiDen} (cos π = −1).`,
  });
}

export function exItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return exTf(rng);
  if (opts.exam === 'mcq') return rng.chance(0.55) ? exPowerMcq(4, rng, { format: 'mcq', points: 1 }) : exStatementMcq(4, rng, { format: 'mcq', points: 1 });
  if (level === 5) {
    const k = rng.int(0, 3);
    if (k === 0) return exPowerMcq(5, rng, false);
    if (k === 1) return exStatementMcq(5, rng, false);
    return k === 2 ? exQuotientLines(5, rng, opts) : exPartLines(5, rng, opts);
  }
  return rng.chance(0.7) ? exQuotientLines(level, rng, opts) : exPartLines(level, rng, opts);
}

// ======================================================================
// a1-cplx-zn-conj
// ======================================================================

const ZN = 'a1-cplx-zn-conj';
const ZN_SUB = [
  { id: 'polar', label: 'forme polaire', skill: 'g8-polar' },
  { id: 'r0', label: 'cas r = 0', skill: ZN },
  { id: 'list', label: 'lister et compter', skill: ZN },
];
const ZN_CHOICES = [
  { id: 'subst', label: 'Poser z = r·e^(iφ) et l\'écrire en r et φ' },
  { id: 'case', label: 'Mettre r en facteur : le cas r = 0 d\'abord' },
  { id: 'mod', label: 'Résoudre en r ≥ 0' },
  { id: 'arg', label: 'Identifier les arguments à 2kπ près' },
  { id: 'solve', label: 'Isoler φ' },
  { id: 'list', label: 'Lister les solutions' },
  { id: 'count', label: 'Compter les solutions' },
  { id: 'divide', label: 'Diviser par r', rule: 'a1_zn_conj_r0', why: 'Si r = 0 est solution, diviser par r la fait disparaître : regarde r = 0 d\'abord.' },
];
const kpi = (num, den) => {
  // φ = (num/den)·kπ as text: kπ/2, 2kπ/5, kπ.
  const g = gcd(num, den);
  const a = num / g;
  const b = den / g;
  return `${a === 1 ? '' : a}kπ${b === 1 ? '' : `/${b}`}`;
};

// The equation and what each part needs. form: conj, inv, abs, cconj.
function znData(rng, form = null) {
  const f = form || rng.pick(['conj', 'conj', 'inv', 'abs', 'cconj']);
  if (f === 'cconj') {
    const [c, n, r0] = rng.pick([[4, 3, 2], [8, 4, 2], [9, 3, 3], [27, 4, 3]]);
    return { f, n, c, r0, m: n + 1, zero: true, count: n + 2,
      eqText: `z${sup(`^${n}`)} = ${c}z̄`, subst: [`${c}conj(re^(iφ))`, `${c}re^(-iφ)`], left: `r^${n}`,
      rEq: `r^${n}=${c}r`, rLines: [`r=0 ou r^${n - 1}=${c}`, `r=0 ou r=${r0}`], argStart: `${n}φ=-φ+2kπ`, argLines: [`${n + 1}φ=2kπ`, `φ=${kpi(2, n + 1)}`],
      setStart: `z=0 ou z^${n + 1}=${r0 ** (n + 1)}` };
  }
  const n = f === 'inv' ? rng.int(3, 7) : rng.int(2, 7);
  if (f === 'inv') {
    return { f, n, r0: 1, m: n - 1, zero: false, count: n - 1,
      eqText: `z${sup(`^${n}`)} = 1/z̄`, subst: ['1/conj(re^(iφ))', '(1/r)e^(iφ)'], left: `r^${n}`,
      rEq: `r^${n}=1/r`, rLines: [`r^${n + 1}=1`, 'r=1'], argStart: `${n}φ=φ+2kπ`, argLines: [`${n - 1}φ=2kπ`, `φ=${kpi(2, n - 1)}`],
      setStart: `z^${n - 1}=1` };
  }
  if (f === 'abs') {
    return { f, n, r0: 1, m: n, zero: true, count: n + 1,
      eqText: `z${sup(`^${n}`)} = |z|`, subst: ['|re^(iφ)|', 'r'], left: `r^${n}`,
      rEq: `r^${n}=r`, rLines: n === 2 ? ['r=0 ou r=1'] : [`r=0 ou r^${n - 1}=1`, 'r=0 ou r=1'], argStart: `${n}φ=2kπ`, argLines: [`φ=${kpi(2, n)}`],
      setStart: `z=0 ou z^${n}=1` };
  }
  return { f: 'conj', n, r0: 1, m: n + 1, zero: true, count: n + 2,
    eqText: `z${sup(`^${n}`)} = z̄`, subst: ['conj(re^(iφ))', 're^(-iφ)'], left: `r^${n}`,
    rEq: `r^${n}=r`, rLines: n === 2 ? ['r=0 ou r=1'] : [`r=0 ou r^${n - 1}=1`, 'r=0 ou r=1'], argStart: `${n}φ=-φ+2kπ`, argLines: [`${n + 1}φ=2kπ`, `φ=${kpi(2, n + 1)}`],
    setStart: `z=0 ou z^${n + 1}=1` };
}
// The solutions, listed: 0 and r0·e^(2ikπ/m).
function znSet(d) {
  const items = [];
  if (d.zero) items.push('0');
  for (let k = 0; k < d.m; k++) items.push(rootText(d.r0, principal(q(2 * k, d.m))));
  return `{${items.join(' ; ')}}`;
}
const rPowT = (k) => (k === 1 ? 'r' : `r${sup(`^${k}`)}`);
const cSub = { kind: 'complex', complex: true, form: 'any', vars: ['r', 'φ'], domain: { r: [0.5, 3], φ: [-3, 3] } };
const cSet = { kind: 'complex', complex: true, form: 'set', itemForm: 'any' };

function znLines(level, rng, opts) {
  const d = znData(rng);
  const rDom = d.f === 'inv' ? ']0 ; +∞[' : '[0 ; +∞[';
  const sR = { kind: 'solset', v: 'r', domain: rDom };
  const sPhi = { kind: 'solset', v: 'φ', periodic: true };
  const set = znSet(d);
  const l0 = [E(d.subst[1], d.f === 'abs' ? '|z| = r' : d.f === 'inv' ? '1/z̄ = 1/(r·e^(−iφ))' : 'Le conjugué change le signe de φ', 'polar', 'subst')];
  const rNote = (i) => (d.zero ? (i === 0 ? 'Cas r = 0, puis r > 0' : 'r ≥ 0') : (i === 0 && d.rLines.length > 1 ? 'Multiplier par r > 0' : 'r > 0'));
  const lr = d.rLines.map((t, i) => E(t, rNote(i), 'r0', i === 0 && d.zero ? 'case' : 'mod'));
  const la = d.argLines.map((t, i) => E(t, i === d.argLines.length - 1 ? 'Isoler φ' : 'Regrouper', 'polar', i === d.argLines.length - 1 ? 'solve' : 'arg'));
  const ls = [E(set, d.zero ? 'z = 0, et les racines' : 'Les racines', 'list', 'list')];
  const lc = [E(String(d.count), `${d.zero ? '1 + ' : ''}${d.m} solutions`, 'list', 'count')];
  if (level === 1) {
    l0[0] = blankBy(l0[0], (n) => (d.f === 'abs' ? [n] : [strip(n).r?.e ?? strip(n).e ?? n]));
    const lastR = lr.length - 1;
    lr[lastR] = { ...lr[lastR], ...blankRVal(lr[lastR].math, String(d.r0)) };
    la[0] = blankCoef(la[0]);
  }
  if (level === 2) la[la.length - 1] = blankPhi(la[la.length - 1]);
  const caseNote = d.zero
    ? { kind: 'note', html: 'Cas r = 0 : z = 0 est solution. Cas r > 0 : on peut diviser par r.' }
    : { kind: 'note', html: 'z = 0 est exclu : 1/z̄ n\'existe pas. Donc r > 0.' };
  const caseDecision = d.zero
    ? { kind: 'decision', prompt: `${MT(d.rEq, { vars: ['r'] })} : avant de diviser par r,`, options: rng.shuffle([
      { id: 'case', label: 'je regarde d\'abord r = 0 : z = 0 est solution', valid: true, ref: true },
      { id: 'divide', label: `je divise par r : ${fr(sup(d.left))} ÷ r`, valid: false, rule: 'a1_zn_conj_r0', why: 'r = 0 vérifie l\'équation en r : diviser par r fait perdre la solution z = 0.' },
    ]) }
    : { kind: 'decision', prompt: 'Et r = 0 ?', options: rng.shuffle([
      { id: 'excl', label: 'z = 0 est exclu : 1/z̄ n\'existe pas', valid: true, ref: true },
      { id: 'sol', label: 'z = 0 est solution', valid: false, why: 'En z = 0, z̄ = 0 et 1/z̄ n\'est pas défini : 0 n\'est pas solution.' },
    ]) };
  const pre = level === 1 ? [caseNote] : [caseDecision];
  const parts = [
    { start: d.subst[0], judge: cSub, lines: l0 },
    { html: `Modules : ${d.f === 'inv' ? 'r > 0' : 'r ≥ 0'}.`, ask: 'r :', start: d.rEq, judge: sR, pre, lines: lr },
    { html: 'Arguments (cas r > 0), à 2kπ près :', ask: 'φ :', start: d.argStart, judge: sPhi, lines: la },
    { html: 'L\'ensemble des solutions :', ask: 'S =', start: d.setStart, judge: cSet, lines: ls },
    { html: 'Nombre de solutions distinctes :', ask: 'N =', start: 'N', judge: { kind: 'value', expect: String(d.count) }, lines: lc },
  ];
  const { start, judge, script } = partsScript(parts, level, ZN_CHOICES);
  return linesItem({
    skill: ZN, level, mode: modeOf(level), start, judge, script,
    prompt: `Résous dans ℂ l'équation ${d.eqText}. Pose z = r·e^(iφ) (r ≥ 0) : écris ${d.f === 'abs' ? '|z|' : d.f === 'inv' ? '1/z̄' : d.f === 'cconj' ? `${d.c}z̄` : 'z̄'} en r et φ, résous en r, puis en φ, liste les solutions et compte-les.`,
    hints: H(d.zero ? 'Pose z = r·e^(iφ). Avant de diviser par r, regarde si r = 0 marche.' : 'Pose z = r·e^(iφ). Ici z = 0 est exclu, donc r > 0.',
      `r > 0 : ${rPowT(d.f === 'inv' ? d.n + 1 : d.n - 1)} = ${d.f === 'cconj' ? d.c : 1} et e^(i·▢·φ) = 1.`,
      `r = ${d.r0} et φ = ${fr(d.argLines[d.argLines.length - 1].slice(2))}${d.zero ? ` ; avec z = 0, cela fait ${d.count} solutions` : ` : ${d.count} solutions`}.`),
    subgoals: ZN_SUB, keys: ['cplx', 'trig', 'calc'], tapActions: level === 3 ? 'steps' : null,
    key: `${ZN}:${level}:${d.f}:${d.n}:${d.c ?? 1}`, exam: false, noHints: level >= 5,
  });
}
// Level 1 blanks: the value of r in « r = 0 ou r = 2 », the coefficient of φ.
function blankRVal(math, r0) {
  const node = parse(math, { vars: ['r'] });
  let hole = null;
  const visit = (n) => {
    n = strip(n);
    if (n.t === 'logic') { visit(n.l); visit(n.r); return; }
    if (n.t === 'rel' && strip(n.r).t === 'num' && String(strip(n.r).v.n) === r0) hole = n.r;
  };
  visit(node);
  return hole ? blankLine(node, [hole], { vars: ['r'] }) : { math };
}
function blankCoef(line) {
  const node = parse(line.math, { vars: ['φ'] });
  const l = strip(node.l);
  const hole = l.t === 'bin' && l.op === '×' ? l.l : null;
  return hole ? { ...line, ...blankLine(node, [hole], { vars: ['φ'] }) } : line;
}
function blankPhi(line) {
  const node = parse(line.math, { vars: ['φ'] });
  return { ...line, ...blankLine(node, [node.r], { vars: ['φ'] }) };
}

// « The equation has … distinct solutions » (exam and level 5).
function znCountMcq(level, rng, exam) {
  const d = znData(rng);
  const cands = [
    { v: d.count, correct: true },
    { v: d.n, correct: false, rule: 'a1_zn_conj_polynomial_count' },
    ...(d.zero ? [{ v: d.count - 1, correct: false, rule: 'a1_zn_conj_r0' }] : []),
    { v: d.count + 1, correct: false },
    { v: 2 * d.n, correct: false },
    { v: d.n - 1, correct: false },
    { v: d.n + 1, correct: false },
    { v: d.n + 2, correct: false },
    { v: d.count + 2, correct: false },
  ];
  const seen = new Set();
  const options = [];
  for (const c of cands) {
    if (seen.has(c.v) || options.length >= 4 || c.v < 1) continue;
    seen.add(c.v);
    options.push({ html: `${c.v} solution${c.v > 1 ? 's' : ''} distincte${c.v > 1 ? 's' : ''}`, correct: c.correct, ...(c.rule ? { rule: c.rule } : {}) });
  }
  return mcq({
    skill: ZN, level, prompt: `Dans ℂ, l'équation ${d.eqText} a :`, options,
    key: `${ZN}:mcq:${d.f}:${d.n}:${d.c ?? 1}`, expectedSec: 240, exam,
    solution: [{ html: `z = r·e^(iφ). ${d.zero ? 'r = 0 donne z = 0. ' : 'z = 0 est exclu. '}Pour r > 0 : r = ${d.r0} et ${d.m} arguments φ = 2kπ/${d.m}. En tout, ${d.count} solutions : ${MT(znSet(d), CX)}.`, note: '' }],
  }, rng);
}

// {z : zᵖ(|z| − R) = 0} ∩ {Re z = a}.
function znInterMcq(level, rng, exam) {
  const [R, a, im] = rng.pick([[2, 1, '√3'], [2, -1, '√3'], [5, 3, '4'], [5, -4, '3'], [5, 4, '3'], [2, 0, '2'], [3, 0, '3'], [10, 6, '8'], [4, 2, '2√3']]);
  const p = rng.int(2, 4);
  const pt = (s) => (a === 0 ? `${s}${im === '1' ? '' : im}i` : im.includes('√') ? `${a}${s}${im.replace(/^(\d*)√(\d)$/, (m0, c, r) => `${c}i√${r}`)}` : `${a}${s}${im}i`);
  const both = `{${pt('+')} ; ${pt('-')}}`;
  const withZero = `{0 ; ${pt('+')} ; ${pt('-')}}`;
  const right = a === 0 ? withZero : both;
  const wrongIm = a === 0 ? `{0 ; ${R}}` : `{${pt('+')}}`;
  const cands = [
    { html: MT(right, CX), correct: true },
    { html: MT(a === 0 ? both : withZero, CX), correct: false, ...(a === 0 ? { rule: 'a1_zn_conj_r0' } : {}) },
    { html: MT(wrongIm, CX), correct: false },
    { html: '∅', correct: false },
  ];
  return mcq({
    skill: ZN, level, prompt: `Soit A = {z ∈ ℂ : z${sup(`^${p}`)}(|z| − ${R}) = 0} et B = {z ∈ ℂ : Re z = ${fr(String(a))}}. Alors A ∩ B =`, options: uniqHtml(cands),
    key: `${ZN}:mcq:inter:${R}:${a}:${p}`, expectedSec: 240, exam,
    solution: [{ html: `A = {0} ∪ {|z| = ${R}} (un produit est nul si un facteur l'est). Sur le cercle |z| = ${R}, Re z = ${fr(String(a))} donne Im z = ±${fr(im)}${a === 0 ? ' ; et 0 ∈ B' : ' ; 0 ∉ B'}.`, note: '' }],
  }, rng);
}

function znTf(rng) {
  const kind = rng.pick(['atmost', 'abs0', 'module', 'count6', 'unit', 'cpos']);
  const exam = { format: 'tf', points: 1 };
  if (kind === 'atmost') {
    return tfItem({
      skill: ZN, level: 4, statement: 'Pour tout n ≥ 2, l\'équation zⁿ = z̄ a au plus n solutions dans ℂ.', truth: false, key: 'atmost', exam,
      counter: { kind: 'refute', quants: [{ q: '∀', v: 'n', dom: 'N' }], pred: 'n<2 ∨ n+2≤n', hyp: 'n≥2', ask: [{ v: 'n', label: 'n =' }], answer: { n: '3' } },
      ruleIfTrue: 'a1_zn_conj_polynomial_count',
      explanation: 'Faux : zⁿ = z̄ a n + 2 solutions, 0 et les racines (n + 1)-ièmes de 1. Par exemple z³ = z̄ en a 5. Ce n\'est pas un polynôme en z.',
    });
  }
  if (kind === 'abs0') {
    return tfItem({
      skill: ZN, level: 4, statement: 'Pour tout n ≥ 1, les solutions de zⁿ = |z| sont exactement les racines n-ièmes de 1.', truth: false, key: 'abs0', exam,
      counter: { kind: 'refute', quants: [{ q: '∀', v: 'n', dom: 'N*' }], pred: '0^n≠0', ask: [{ v: 'n', label: 'n =' }], answer: { n: '2' } },
      ruleIfTrue: 'a1_zn_conj_r0',
      explanation: 'Faux : z = 0 est aussi solution (0ⁿ = 0 = |0|), et ce n\'est pas une racine de l\'unité. Pour tout n, par exemple n = 2.',
    });
  }
  if (kind === 'module') {
    const n = rng.pick([3, 5]);
    return tfItem({
      skill: ZN, level: 4, statement: `Pour tout réel c > 0, les solutions non nulles de z${sup(`^${n}`)} = c·z̄ ont pour module c.`, truth: false, key: `module:${n}`, exam,
      counter: { kind: 'refute', quants: [{ q: '∀', v: 'c', dom: 'R+' }], pred: n === 3 ? '√c=c' : 'c^(1/4)=c', ask: [{ v: 'c', label: 'c =' }], answer: { c: n === 3 ? '4' : '16' } },
      explanation: `Faux : les modules donnent r${sup(`^${n}`)} = c·r, donc r${sup(`^${n - 1}`)} = c et r = c^(1/${n - 1}), qui vaut c seulement pour c = 1. Par exemple c = ${n === 3 ? 4 : 16} : r = 2.`,
    });
  }
  if (kind === 'count6') {
    const n = rng.int(3, 7);
    return tfItem({ skill: ZN, level: 4, statement: `L'équation z${sup(`^${n}`)} = |z| a exactement ${n + 1} solutions dans ℂ.`, truth: true, key: `count6:${n}`, exam,
      explanation: `Vrai : r = 0 donne z = 0 ; pour r > 0, r${sup(`^${n - 1}`)} = 1 et ${n}φ = 2kπ : les ${n} racines ${n}-ièmes de 1. En tout ${n + 1}.` });
  }
  if (kind === 'unit') {
    const n = rng.int(2, 6);
    return tfItem({ skill: ZN, level: 4, statement: `Toute solution non nulle de z${sup(`^${n}`)} = z̄ est de module 1.`, truth: true, key: `unit:${n}`, exam,
      explanation: `Vrai : les modules donnent r${sup(`^${n}`)} = r ; si r ≠ 0, r${sup(`^${n - 1}`)} = 1, donc r = 1.` });
  }
  const [c, n] = rng.pick([[4, 3], [8, 4], [9, 3], [27, 4]]);
  return tfItem({ skill: ZN, level: 4, statement: `L'équation z${sup(`^${n}`)} = ${c}z̄ a exactement ${n + 2} solutions dans ℂ.`, truth: true, key: `cpos:${c}:${n}`, exam,
    explanation: `Vrai : z = 0, et pour r > 0 : r${sup(`^${n - 1}`)} = ${c} et ${n + 1}φ = 2kπ, soit ${n + 1} solutions de module ${Math.round(c ** (1 / (n - 1)))}.` });
}

export function znItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return znTf(rng);
  if (opts.exam === 'mcq') return rng.chance(0.7) ? znCountMcq(4, rng, { format: 'mcq', points: 1 }) : znInterMcq(4, rng, { format: 'mcq', points: 1 });
  if (level === 5) {
    const k = rng.int(0, 2);
    if (k === 0) return znCountMcq(5, rng, false);
    if (k === 1) return znInterMcq(5, rng, false);
    return znLines(5, rng, opts);
  }
  return znLines(level, rng, opts);
}
