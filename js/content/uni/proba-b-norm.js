// Generators of module P, part b (step U7): the normal law (standardise,
// read Φ), normal quantiles (retrieve μ or σ), law of Y = g(X) and sampling
// by F⁻¹. Catalogue: docs/universite/P-probabilites.md. Tools: proba-kit.js,
// proba-b-kit.js; traps: js/cas/rules/pb.js.
//
// Table readings (convention 3 of the catalogue): z is on the 0,025 grid at
// levels 1 to 3; Φ(z) is expected as printed in Table 1 (#phi), and the
// values of the neighbouring grid points are accepted (phiAccepted).

import { statItem, coefItem, openItem, choice, tf, numCounter, H, SM, examTag } from './proba-kit.js';
import { MT } from './kit.js';
import { q, qt, qs, dx, dl, fr } from './proba-b-kit.js';
import { Phi, PhiInv, phiTable, phiAccepted, phiInvTable, roundTo } from '../../cas/stats.js';

const pickOf = (rng, xs) => xs[rng.int(0, xs.length - 1)];
const v6 = (x) => String(Number(Number(x).toFixed(6)));
const zt = (z) => dl(z, 3); // a grid value, comma: 1,25 ; −0,5
const pz = (z) => (z < 0 ? `(${zt(z)})` : zt(z));
const zs = (z) => fr(String(Number(z.toFixed(3))));
const phiT = (z) => phiTable(z) ?? roundTo(Phi(z), 3);

// ======================================================================
// p-normal-std
// ======================================================================

const NS = 'p-normal-std';
const NS_SUB = [{ id: 'std', label: 'standardiser, lire Φ', skill: NS }];
const SIGMAS = [2, 4, 5, 8, 10, 15, 20, 25];

// z on the grid with x = μ + zσ written with at most one decimal.
function gridZ(rng, sigma, lo, hi) {
  for (let k = 0; k < 200; k++) {
    const z = rng.int(Math.round(lo / 0.025), Math.round(hi / 0.025)) * 0.025;
    if (Math.abs(z) < 0.2) continue;
    const d = z * sigma;
    if (Math.abs(d * 10 - Math.round(d * 10)) < 1e-9) return Number(z.toFixed(3));
  }
  return 1;
}
const xOf = (mu, z, s) => Number((mu + z * s).toFixed(1));

function zPart(name, x, mu, s, viaVar = false) {
  const z = (x - mu) / s;
  return { label: `z${name}`, name: `z${name}`, kind: 'stat', expect: `(${x}-${mu})/${s}`, action: 'Standardiser : z = (x − μ)/σ',
    traps: { p_standardize_var: { values: [v6((x - mu) / (s * s))], ctx: { var: s * s, 'σ': s } } },
    wrongActions: [{ label: 'Diviser par la variance', rule: 'p_standardize_var', why: `On divise par l'écart-type σ = ${s}, pas par la variance.` }],
    lines: [{ math: `(${fr(x)}-${mu})/${s}`, blank: [fr(x)], subgoal: 'std' }, { math: zt(z), blank: [zt(z)] }], z, viaVar };
}
// Φ at |z| (a positive grid value), read in the table; carried: #phi of the student's z.
function phiPart(name, zName, z, neg = false) {
  const a = Math.abs(z);
  return { label: `Φ(${zs(a)})`, name, kind: 'stat', expect: neg ? `#phi(-$${zName})` : `#phi($${zName})`, accept: phiAccepted(a), action: 'Lire Φ dans la table',
    lines: [{ math: zt(phiT(a)), blank: [zt(phiT(a))], subgoal: 'std' }] };
}

function nsItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return nsMcq(rng, opts);
  if (opts.exam === 'tf') return nsTf(rng, opts);
  const kind = level <= 2 ? pickOf(rng, ['right', 'left']) : level === 5 ? pickOf(rng, ['cond', 'diff']) : pickOf(rng, ['right', 'left', 'between', 'var']);
  const s = pickOf(rng, SIGMAS);
  const mu = pickOf(rng, [10, 20, 50, 100, 120, 170, 500]);
  if (kind === 'diff') return nsDiff(level, rng, opts);
  const base = { skill: NS, level, subgoals: NS_SUB, exam: examTag(opts) };
  if (kind === 'right' || kind === 'var') {
    const z = gridZ(rng, s, 0.5, 2.5);
    const x = xOf(mu, z, s);
    const Pv = 1 - phiT(z);
    const parts = [];
    if (kind === 'var') {
      parts.push({ label: 'σ', name: 'sig', kind: 'prob', expect: String(s), action: 'σ = √(variance)',
        traps: { p_normal_sigma2: { values: [String(s * s)] } },
        decisions: [{ prompt: `Dans N(${mu} ; ${s * s}), que vaut ${s * s} ?`, options: [
          { id: 'var', label: 'La variance σ²', valid: true },
          { id: 'sd', label: 'L\'écart-type σ', valid: false, rule: 'p_normal_sigma2', why: `Le cours écrit N(μ, σ²) : ${s * s} est la variance, σ = √${s * s} = ${s}.` }] }],
        lines: [{ math: `√${s * s}`, blank: [String(s * s)] }, { math: String(s) }] });
    }
    parts.push(zPart('', x, mu, s), phiPart('phi', 'z', z),
      { label: `Pr(X>${fr(x)})`, name: 'P', kind: 'stat', expect: '1-$phi', action: 'Complément : 1 − Φ(z)',
        traps: { p_upper_tail: { values: [v6(phiT(z))], ctx: { z: zs(z), v: zt(phiT(z)) } } },
        decisions: [{ prompt: 'Queue gauche ou droite ?', levels: [2], options: [
          { id: 'r', label: 'À droite : Pr(X > x) = 1 − Φ(z)', valid: true },
          { id: 'l', label: 'Φ(z) directement', valid: false, rule: 'p_upper_tail', why: 'Φ(z) est Pr(Z ≤ z) ; on demande au-dessus.' }] }],
        lines: [{ math: `1-${zt(phiT(z))}`, blank: [zt(phiT(z))], subgoal: 'std' }, { math: zt(Pv) }] });
    return statItem({ ...base, key: `${level}:${kind}:${mu}:${s}:${x}`, parts,
      prompt: `X ~ N(${mu} ; ${kind === 'var' ? s * s : `${s}²`}). Calcule Pr(X > ${fr(x)}) avec la table de Φ.`,
      hints: H('Ramène-toi à Z = (X − μ)/σ, puis Pr(Z > z) = 1 − Φ(z).', `z = (${fr(x)} − ${mu})/□`, `Pr = 1 − ${zt(phiT(z))} = ${zt(Pv)}`) });
  }
  if (kind === 'left') {
    const z = -gridZ(rng, s, 0.5, 2.5);
    const x = xOf(mu, z, s);
    const p = phiT(-z);
    return statItem({ ...base, key: `${level}:left:${mu}:${s}:${x}`,
      prompt: `X ~ N(${mu} ; ${s}²). Calcule Pr(X < ${fr(x)}) avec la table de Φ.`,
      parts: [zPart('', x, mu, s), phiPart('phi', 'z', z, true),
        { label: `Pr(X<${fr(x)})`, name: 'P', kind: 'stat', expect: '1-$phi', action: 'Symétrie : Φ(−a) = 1 − Φ(a)',
          traps: { p_phi_negative: { values: [v6(p), v6(-p)], ctx: { z: zs(-z), v: zt(1 - p) } } },
          decisions: [{ prompt: `Φ(${zs(z)}) avec une valeur négative ?`, levels: [1, 2], options: [
            { id: 'sym', label: `Φ(${zs(z)}) = 1 − Φ(${zs(-z)})`, valid: true },
            { id: 'neg', label: `Φ(${zs(z)}) = −Φ(${zs(-z)})`, valid: false, rule: 'p_phi_negative', why: 'Φ est une probabilité, entre 0 et 1 : par symétrie Φ(−a) = 1 − Φ(a).' }] }],
          lines: [{ math: `1-${zt(p)}`, blank: [zt(p)], subgoal: 'std' }, { math: zt(1 - p) }] }],
      hints: H('z est négatif : Φ(−a) = 1 − Φ(a).', `Pr = 1 − Φ(□)`, `Pr = 1 − ${zt(p)} = ${zt(1 - p)}`) });
  }
  if (kind === 'between') {
    const z1 = -gridZ(rng, s, 0.5, 2);
    const z2 = gridZ(rng, s, 0.5, 2.5);
    const x1 = xOf(mu, z1, s);
    const x2 = xOf(mu, z2, s);
    const p1 = phiT(-z1);
    const p2 = phiT(z2);
    const Pv = p2 - (1 - p1);
    return statItem({ ...base, key: `${level}:between:${mu}:${s}:${x1}:${x2}`,
      prompt: `X ~ N(${mu} ; ${s}²). Calcule Pr(${fr(x1)} < X < ${fr(x2)}) avec la table de Φ.`,
      parts: [zPart('1', x1, mu, s), zPart('2', x2, mu, s), phiPart('p2', 'z2', z2), phiPart('p1', 'z1', z1, true),
        { label: 'Pr', name: 'P', kind: 'stat', expect: '$p2-(1-$p1)', action: 'Φ(z₂) − Φ(z₁), avec la symétrie',
          traps: { p_phi_negative: { values: [v6(p2 - p1), v6(p2 + p1)], ctx: { z: zs(-z1), v: zt(1 - p1) } }, p_upper_tail: { values: [v6(1 - p2 + (1 - p1))] } },
          lines: [{ math: `${zt(p2)}-(1-${zt(p1)})`, blank: [`1-${zt(p1)}`], subgoal: 'std' }, { math: zt(Pv) }] }],
      hints: H('Pr(a < X < b) = Φ(z₂) − Φ(z₁), et Φ(−a) = 1 − Φ(a).', `Pr = ${zt(p2)} − (1 − □)`, `Pr = ${zt(Pv)}`) });
  }
  // cond: Pr(X > b | X > a), a < b above the mean.
  const za = gridZ(rng, s, 0.25, 1);
  const zb = gridZ(rng, s, 1.25, 2.5);
  const xa = xOf(mu, za, s);
  const xb = xOf(mu, zb, s);
  const pa = phiT(za);
  const pb = phiT(zb);
  return statItem({ ...base, key: `${level}:cond:${mu}:${s}:${xa}:${xb}`,
    prompt: `La taille X (cm) suit N(${mu} ; ${s}²). Calcule Pr(X > ${fr(xb)} | X > ${fr(xa)}) avec la table de Φ.`,
    parts: [zPart('1', xa, mu, s), zPart('2', xb, mu, s), phiPart('pa', 'z1', za), phiPart('pb', 'z2', zb),
      { label: 'Pr', name: 'P', kind: 'stat', expect: '(1-$pb)/(1-$pa)', tol: 0.002, action: 'Conditionner',
        traps: { p_upper_tail: { values: [v6(pb / pa)] }, p_cond_denominator: { values: [v6(1 - pb)] } },
        lines: [{ math: `(1-${zt(pb)})/(1-${zt(pa)})`, subgoal: 'std' }, { math: dl((1 - pb) / (1 - pa), 3) }] }],
    hints: [] });
}

// Level 5 (série 6): Pr(X > Y) for two independent normals.
function nsDiff(level, rng, opts) {
  const [a, b, c] = pickOf(rng, [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10]]);
  const m2 = pickOf(rng, [60, 70, 80]);
  const z = gridZ(rng, c, 0.5, 2);
  const dmu = Number((z * c).toFixed(1));
  const m1 = m2 + dmu;
  const p = phiT(z);
  return statItem({ skill: NS, level, key: `${level}:diff:${m1}:${m2}:${c}`, exam: examTag(opts), subgoals: NS_SUB, hints: [],
    prompt: `X ~ N(${fr(m1)} ; ${a}²) et Y ~ N(${m2} ; ${b}²) sont indépendantes. Calcule Pr(X > Y) avec la table de Φ.`,
    parts: [
      { label: 'E[X−Y]', name: 'm', kind: 'prob', expect: `${m1}-${m2}`, lines: [{ math: `${fr(m1)}-${m2}`, subgoal: 'std' }, { math: fr(dmu) }] },
      { label: 'σ(X−Y)', name: 's', kind: 'prob', expect: `√(${a * a}+${b * b})`, traps: { p_standardize_var: { values: [String(a + b), String(a * a + b * b)] } },
        lines: [{ math: `√(${a}^2+${b}^2)`, subgoal: 'std' }, { math: String(c) }] },
      { label: 'z', name: 'z', kind: 'stat', expect: '$m/$s', lines: [{ math: zt(z) }] },
      { label: 'Pr(X−Y>0)', name: 'P', kind: 'stat', expect: '#phi($z)', accept: phiAccepted(z), traps: { p_upper_tail: { values: [v6(1 - p)] } },
        lines: [{ math: `Φ(${zt(z)})`, subgoal: 'std' }, { math: zt(p) }] },
    ] });
}

function nsMcq(rng, opts) {
  const s = pickOf(rng, [2, 4, 5, 10]);
  const mu = pickOf(rng, [20, 50, 100]);
  const z = pickOf(rng, [0.5, 1, 1.5, 2]);
  const x = mu + z * s;
  const right = 1 - phiT(z);
  const wv = (x - mu) / (s * s);
  return choice({ skill: NS, level: 4, key: `mcq:${mu}:${s}:${x}`, exam: examTag(opts),
    prompt: `X ~ N(${mu} ; ${s * s}). Que vaut Pr(X > ${fr(x)}) ?`,
    right: zt(right), wrongs: [{ html: zt(phiT(z)), rule: 'p_upper_tail' }, { html: zt(1 - phiT(Math.round(wv / 0.025) * 0.025)), rule: 'p_standardize_var' }],
    fillers: [{ html: zt(1 - phiT(z / 2)) }, { html: zt(phiT(z) - 0.5) }, { html: '0,5' }] }, rng);
}

function nsTf(rng, opts) {
  const s = pickOf(rng, [2, 3, 4]);
  if (rng.chance(0.4)) {
    return tf({ skill: NS, key: 'abs196', exam: examTag(opts), truth: true, statement: 'Si X ~ N(0 ; 1), alors Pr(|X| < 1,96) ≈ 0,95.', explanation: 'Vrai : 2Φ(1,96) − 1 = 2 · 0,975 − 1 = 0,95.' });
  }
  return tf({ skill: NS, key: `var:${s}`, exam: examTag(opts), truth: false, ruleIfTrue: 'p_normal_sigma2',
    statement: `Si X ~ N(0 ; ${s * s}), alors Pr(X > ${s}) = 1 − Φ(${s}).`,
    explanation: `Faux : σ = ${s}, donc Pr(X > ${s}) = 1 − Φ(1) = 0,159, alors que 1 − Φ(${s}) = ${zt(1 - phiT(s))}.`,
    counter: numCounter({ vars: [{ v: 'p', label: `Pr(X > ${s}) =` }], hyp: '|p-0,159|<0,002', pred: `|p-${dl(1 - phiT(s), 4)}|<0,002`, answer: { p: '0,159' } }) });
}

function nsCoef(rng) {
  const s = pickOf(rng, SIGMAS);
  const mu = pickOf(rng, [20, 50, 100]);
  const z = gridZ(rng, s, 0.5, 2.5);
  const x = xOf(mu, z, s);
  return coefItem({ skill: NS, key: `coef:${mu}:${s}:${x}`, exam: { format: 'coef', points: 1 },
    prompt: `X ~ N(${mu} ; ${s}²). Calcule Pr(X > ${fr(x)}) avec la table de Φ (au millième).`,
    parts: [{ label: `Pr(X>${fr(x)})`, kind: 'stat', expect: v6(1 - phiT(z)), accept: phiAccepted(z).map((v) => 1 - v), traps: { p_upper_tail: { values: [v6(phiT(z))] } }, lines: [{ math: zt(1 - phiT(z)) }] }],
    subgoals: NS_SUB });
}

// ======================================================================
// p-normal-inverse
// ======================================================================

const NI = 'p-normal-inverse';
const NI_SUB = [{ id: 'std', label: 'complément, standardiser', skill: NS }, { id: 'inv', label: 'lire Φ⁻¹', skill: NI }, { id: 'iso', label: 'isoler σ', skill: 'iso-formula' }];
// Upper share s, level p = 1 − s, as texts.
// d: the decimals Table 2 prints for that p (0,990 → 2,326).
const SHARES = [{ s: '0,1', p: '0,9', d: 2 }, { s: '0,2', p: '0,8', d: 2 }, { s: '0,25', p: '0,75', d: 2 }, { s: '0,05', p: '0,95', d: 2 }, { s: '0,025', p: '0,975', d: 3 }, { s: '0,01', p: '0,99', d: 3 }, { s: '0,02', p: '0,98', d: 3 }];
const zOf = (S) => roundTo(PhiInv(num(S.p)), S.d);
const num = (t) => Number(t.replace(',', '.'));
const pct = (t) => fr(String(Number((num(t) * 100).toFixed(1))));

function levelPart(S, phiArg) {
  return { label: `Φ(${phiArg})`, name: 'lev', kind: 'prob', expect: S.p, action: 'Complément : la part en dessous',
    traps: { p_upper_tail: { values: [S.s] } },
    lines: [{ math: `1-${S.s}`, blank: [S.s], subgoal: 'std' }, { math: S.p }] };
}
function zInvPart(S) {
  const z = zOf(S);
  const dec = S.d;
  return { label: 'z', name: 'z', kind: 'stat', expect: v6(z), decimals: Math.max(2, dec), accept: [z], action: 'Lire Φ⁻¹ dans la table 2',
    traps: { p_phi_inverse_side: { values: [v6(-z)], ctx: {} }, p_quantile_inverse: { values: [v6(roundTo(Phi(num(S.p)), 3))] } },
    wrongActions: [{ label: `Lire Φ(${S.p})`, rule: 'p_quantile_inverse', why: `On cherche z tel que Φ(z) = ${S.p}, pas la valeur de Φ en ${S.p}.` }],
    lines: [{ math: `Φ⁻¹(${S.p})`, subgoal: 'inv' }, { math: dl(z, dec) }], z };
}

function niItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return niMcq(rng, opts);
  if (opts.exam === 'tf') return niTf(rng, opts);
  const S0 = pickOf(rng, level <= 2 ? SHARES.slice(0, 4) : SHARES);
  const S = (level === 5 || opts.exam === 'open') ? pickOf(rng, SHARES.slice(0, 3)) : S0;
  const z = zOf(S);
  const sig = pickOf(rng, [2, 4, 5, 10]);
  const mu = pickOf(rng, [50, 84, 100, 250, 500]);
  const kind = opts.exam === 'coef' ? 'sigma' : level <= 2 ? 'sigma' : level === 5 || opts.exam === 'open' ? 'sigma5' : pickOf(rng, ['sigma', 'mu', 'seuil']);
  const base = { skill: NI, level, subgoals: NI_SUB, exam: examTag(opts) };
  if (kind === 'mu') {
    const c = mu - Math.round(z * sig);
    const M = c + z * sig;
    return statItem({ ...base, key: `${level}:mu:${S.s}:${sig}:${c}`,
      prompt: `Le poids X d'un paquet suit N(μ ; ${sig}²). ${pct(S.s)} % des paquets pèsent moins de ${c} g. Trouve μ (au dixième).`,
      parts: [levelPart(S, `(μ − ${c})/${sig}`), zInvPart(S),
        { label: 'μ', name: 'mu', kind: 'stat', decimals: 1, expect: `${c}+$z*${sig}`, action: 'Isoler μ',
          traps: { p_phi_inverse_side: { values: [v6(c - z * sig)] } },
          lines: [{ math: `${c}+${dl(z, 3)}×${sig}`, subgoal: 'iso' }, { math: dl(M, 1) }] }],
      hints: H(`${pct(S.s)} % en dessous de ${c} : (μ − ${c})/σ = Φ⁻¹(${S.p}).`, `μ = ${c} + □·${sig}`, `μ = ${dx(M, 1)}`) });
  }
  if (kind === 'seuil') {
    const c = mu + z * sig;
    return statItem({ ...base, key: `${level}:seuil:${S.s}:${sig}:${mu}`,
      prompt: `X ~ N(${mu} ; ${sig}²). Trouve le seuil c dépassé par seulement ${pct(S.s)} % des valeurs (au dixième).`,
      parts: [levelPart(S, `(c − ${mu})/${sig}`), zInvPart(S),
        { label: 'c', name: 'c', kind: 'stat', decimals: 1, expect: `${mu}+$z*${sig}`, action: 'Isoler c',
          traps: { p_phi_inverse_side: { values: [v6(mu - z * sig)] } },
          lines: [{ math: `${mu}+${dl(z, 3)}×${sig}`, subgoal: 'iso' }, { math: dl(c, 1) }] }],
      hints: H('Les valeurs du haut : Φ((c − μ)/σ) = 1 − part.', `c = ${mu} + □·${sig}`, `c = ${dx(c, 1)}`) });
  }
  // sigma: Pr(X > c) = s with c = μ + d.
  const mj = pickOf(rng, [60, 70, 84]);
  const sj = pickOf(rng, [4, 5, 8, 10]);
  const d = Math.max(2, Math.round(z * sj));
  const c = mj + d;
  const sg = Number((d / z).toFixed(2));
  const parts = [levelPart(S, `${d}/σ`), zInvPart(S),
    { label: 'σ', name: 'sig', kind: 'stat', decimals: 2, expect: `${d}/$z`, action: 'Isoler σ',
      traps: { p_phi_inverse_side: { values: [v6(-d / z)] } },
      lines: [{ math: `${d}/${dl(z, 3)}`, subgoal: 'iso' }, { math: dl(sg, 2) }] }];
  if (kind === 'sigma5') {
    const c2 = c + d;
    const z2 = Number(((2 * d) / sg).toFixed(2));
    parts.push({ label: 'z₂', name: 'z2', kind: 'stat', decimals: 2, expect: `${2 * d}/$sig`, lines: [{ math: `${2 * d}/${dl(sg, 2)}` }, { math: dl(z2, 2) }] },
      { label: `Pr(X>${c2})`, name: 'P', kind: 'stat', expect: '1-Φ($z2)', tol: 0.002, traps: { p_upper_tail: { values: [v6(Phi(z2))] } },
        lines: [{ math: `1-Φ(${dl(z2, 2)})`, subgoal: 'std' }, { math: dl(1 - Phi(z2), 3) }] });
  }
  const o = { ...base, key: `${level}:${kind}:${S.s}:${mj}:${d}`,
    prompt: `Un lancer de javelot X (m) suit N(${mj} ; σ²). On sait que Pr(X > ${c}) = ${S.s}. Trouve σ (au centième)${kind === 'sigma5' ? `, puis Pr(X > ${c + d})` : ''}.`,
    parts,
    hints: H(`Pr(X > ${c}) = ${S.s}, c'est Φ(${d}/σ) = ${S.p} : cherche ${S.p} dans la table 2.`, `${d}/σ = ${dl(z, 3)}, donc σ = □`, `σ = ${dx(sg, 2)}`) };
  if (opts.exam === 'open') return openItem({ ...o, exam: { format: 'open', points: 8 } }, 8, rng);
  if (opts.exam === 'coef') return coefItem({ ...o, exam: { format: 'coef', points: 1 }, parts: parts.slice(0, 3) });
  return statItem(o);
}

function niMcq(rng, opts) {
  const S = pickOf(rng, SHARES.slice(0, 5));
  const z = zOf(S);
  return choice({ skill: NI, level: 4, key: `mcq:${S.s}`, exam: examTag(opts),
    prompt: `Z ~ N(0 ; 1). Quel nombre z vérifie Pr(Z > z) = ${S.s} ?`,
    right: dl(z, 3), wrongs: [{ html: fr(dl(-z, 3)), rule: 'p_phi_inverse_side' }, { html: dl(roundTo(Phi(num(S.p)), 3), 3), rule: 'p_quantile_inverse' }],
    fillers: [{ html: dl(phiInvTable(1 - num(S.s) / 2), 3) }, { html: dl(z + 0.5, 3) }] }, rng);
}

function niTf(rng, opts) {
  if (rng.chance(0.5)) return tf({ skill: NI, key: 'q975', exam: examTag(opts), truth: true, statement: 'Le quantile d\'ordre 0,975 de N(0 ; 1) vaut 1,96.', explanation: 'Vrai : Φ(1,96) = 0,975 (table 2).' });
  return tf({ skill: NI, key: 'q95', exam: examTag(opts), truth: false, ruleIfTrue: 'p_one_two_sided',
    statement: 'Le quantile d\'ordre 0,95 de N(0 ; 1) vaut 1,96.',
    explanation: 'Faux : Φ⁻¹(0,95) = 1,64 (1,645). 1,96 est le quantile d\'ordre 0,975.',
    counter: numCounter({ vars: [{ v: 'z', label: 'Φ⁻¹(0,95) =' }], hyp: '|z-1,645|<0,01', pred: '|z-1,96|<0,01', answer: { z: '1,645' } }) });
}

// ======================================================================
// p-transform
// ======================================================================

const TR = 'p-transform';
const TR_SUB = [{ id: 'dinv', label: 'dériver g⁻¹', skill: 'a1-deriv-inverse' }, { id: 'rec', label: 'reconnaître', skill: 'p-family' }, { id: 'form', label: 'formule', skill: TR }];
const LAMS = [q(1, 2), q(1), q(2), q(3)];
// λ·x and e^(−λx) as texts for the core: x/2, 2x.
const lx = (lam, v = 'x') => (lam.eq(1) ? v : lam.d === 1 ? `${lam.n}${v}` : `${v}/${lam.d}`);
const expT = (lam, v = 'x') => `e^(-${lx(lam, v)})`;
const lamT = (lam) => (lam.eq(1) ? '' : lam.d === 1 ? String(lam.n) : `(1/${lam.d})`);

function trExp(level, rng) {
  const lam = pickOf(rng, LAMS);
  const L = qt(lam);
  const fx = lam.eq(1) ? expT(lam) : `${lamT(lam)}${expT(lam)}`;
  const dg = lam.eq(1) ? `-${expT(lam)}` : `-${lamT(lam)}${expT(lam)}`;
  return {
    key: `exp:${L}`, prompt: `U ~ U(0 ; 1) et X = −ln(U)/λ avec λ = ${qs(lam)}. Trouve la densité de X.`,
    parts: [
      { label: 'g⁻¹(x)', name: 'gi', kind: 'prob', vars: ['x'], domain: { x: [0.1, 3] }, expect: expT(lam), action: 'Inverser g',
        decisions: [{ prompt: 'Le support de X ?', options: [
          { id: 'ok', label: 'u ∈ ]0 ; 1[ donne x ∈ ]0 ; +∞[', valid: true },
          { id: 'same', label: 'x ∈ ]0 ; 1[, comme U', valid: false, rule: 'p_transform_support', why: 'Le support change avec g : u ∈ ]0 ; 1[ donne x = −ln(u)/λ ∈ ]0 ; ∞[.' }] }],
        lines: [{ math: expT(lam), blank: [lx(lam)], subgoal: 'form' }] },
      { label: '(g⁻¹)′(x)', name: 'dg', kind: 'prob', vars: ['x'], domain: { x: [0.1, 3] }, expect: dg, action: 'Dériver g⁻¹',
        lines: [{ math: dg, subgoal: 'dinv', blank: [lx(lam)] }] },
      { label: 'f_X(x)', name: 'f', kind: 'prob', vars: ['x'], domain: { x: [0.1, 3] }, expect: fx, action: 'f_U(g⁻¹(x))·|(g⁻¹)′(x)|',
        traps: { p_transform_jacobian: { values: ['1'], ctx: { d: `${qs(lam)}e^(−${qs(lam)}x)`, v: '∞' } }, p_transform_abs: { values: [dg] } },
        decisions: [{ prompt: 'Que reconnais-tu ?', levels: [3, 4, 5], options: [
          { id: 'exp', label: `X ~ exp(${qs(lam)})`, valid: true },
          { id: 'unif', label: 'X ~ U(0 ; 1)', valid: false, rule: 'p_transform_jacobian', why: 'f_U vaut 1, mais il faut multiplier par |(g⁻¹)′(x)|.' }] }],
        lines: [{ math: `1×${lam.eq(1) ? expT(lam) : `${lamT(lam)}${expT(lam)}`}`, subgoal: 'form', blank: [lam.eq(1) ? expT(lam) : `${lamT(lam)}${expT(lam)}`] }] },
    ],
    hints: H('Inverse g, dérive l\'inverse, prends la valeur absolue.', `f_X(x) = 1·|□|`, `f_X(x) = ${fx} : X ~ exp(${qs(lam)})`),
    fx, lam,
  };
}

function trSquare() {
  return {
    key: 'sq', prompt: 'X ~ U(0 ; 1) et Y = X². Trouve la densité de Y sur son support.',
    parts: [
      { label: 'g⁻¹(y)', name: 'gi', kind: 'prob', vars: ['y'], domain: { y: [0.05, 0.95] }, expect: '√y', action: 'Inverser g',
        decisions: [{ prompt: 'Le support de Y ?', options: [
          { id: 'ok', label: 'x ∈ ]0 ; 1[ donne y = x² ∈ ]0 ; 1[', valid: true },
          { id: 'big', label: 'y ∈ ]0 ; +∞[', valid: false, rule: 'p_transform_support', why: 'Le support change avec g : x ∈ ]0 ; 1[ donne y = x² ∈ ]0 ; 1[.' }] }],
        lines: [{ math: '√y', subgoal: 'form' }] },
      { label: '(g⁻¹)′(y)', name: 'dg', kind: 'prob', vars: ['y'], domain: { y: [0.05, 0.95] }, expect: '1/(2√y)', action: 'Dériver g⁻¹', lines: [{ math: '1/(2√y)', subgoal: 'dinv', blank: ['2√y'] }] },
      { label: 'f_Y(y)', name: 'f', kind: 'prob', vars: ['y'], domain: { y: [0.05, 0.95] }, expect: '1/(2√y)', action: 'f_X(g⁻¹(y))·|(g⁻¹)′(y)|',
        traps: { p_transform_jacobian: { values: ['1'], ctx: { d: '1/(2√y)', v: '∞' } } },
        lines: [{ math: '1×1/(2√y)', subgoal: 'form', blank: ['1/(2√y)'] }] },
    ],
    hints: H('Inverse g sur ]0 ; 1[ : x = √y, puis dérive.', 'f_Y(y) = 1·|□|', 'f_Y(y) = 1/(2√y) sur ]0 ; 1[') };
}

function trAffine(rng) {
  const lam = pickOf(rng, LAMS);
  const a = pickOf(rng, [2, 3, 4]);
  const b = pickOf(rng, [0, 1, 2]);
  const r = lam.div(a);
  const inner = b ? `(y-${b})` : 'y';
  const f = `${qt(r)}e^(-${qt(r)}×${inner})`;
  return {
    key: `aff:${qt(lam)}:${a}:${b}`, prompt: `X ~ exp(λ) avec λ = ${qs(lam)}, et Y = ${a}X${b ? ` + ${b}` : ''}. Trouve la densité de Y sur ]${b} ; +∞[.`,
    parts: [
      { label: 'g⁻¹(y)', name: 'gi', kind: 'prob', vars: ['y'], domain: { y: [b + 0.2, b + 4] }, expect: `${inner}/${a}`, action: 'Inverser g', lines: [{ math: `${inner}/${a}`, subgoal: 'form' }] },
      { label: '(g⁻¹)′(y)', name: 'dg', kind: 'prob', vars: ['y'], domain: { y: [b + 0.2, b + 4] }, expect: `1/${a}`, action: 'Dériver g⁻¹', lines: [{ math: `1/${a}`, subgoal: 'dinv' }] },
      { label: 'f_Y(y)', name: 'f', kind: 'prob', vars: ['y'], domain: { y: [b + 0.2, b + 4] }, expect: f, action: 'f_X(g⁻¹(y))·|(g⁻¹)′(y)|',
        traps: {
          p_scale_density: { values: [`${a}×${qt(lam)}e^(-${qt(lam)}×${inner})`, `${qt(lam)}e^(-${qt(lam)}×${a}y)`], ctx: { a } },
          p_transform_jacobian: { values: [`${qt(lam)}e^(-${qt(lam)}×${inner}/${a})`], ctx: { d: `1/${a}`, v: a } },
        },
        lines: [{ math: `${qt(lam)}e^(-${qt(lam)}×${inner}/${a})×1/${a}`, subgoal: 'form', blank: [`1/${a}`] }] },
    ],
    hints: H('Inverse g : x = (y − b)/a ; la densité est divisée par a.', `f_Y(y) = f_X(□)·1/${a}`, `f_Y(y) = ${f}`) };
}

function trSample(rng) {
  const kind = pickOf(rng, ['exp', 'pareto', 'weib']);
  if (kind === 'exp') {
    const lam = pickOf(rng, [2, 3, 4]);
    return { key: `samp:exp:${lam}`, prompt: `On veut tirer X de fonction de répartition F(x) = 1 − e^(−${lam}x) (x ≥ 0) à partir de U ~ U(0 ; 1). Donne F⁻¹(u).`,
      parts: [{ label: 'F⁻¹(u)', name: 'Fi', kind: 'prob', vars: ['u'], domain: { u: [0.05, 0.95] }, expect: `-ln(1-u)/${lam}`, action: 'Résoudre F(x) = u',
        traps: { p_quantile_inverse: { values: [`1-e^(-${lam}u)`] } }, lines: [{ math: `-ln(1-u)/${lam}`, subgoal: 'form', blank: ['1-u'] }] }],
      hints: H('Résous F(x) = u en x.', `e^(−${lam}x) = □`, `F⁻¹(u) = −ln(1 − u)/${lam}`) };
  }
  if (kind === 'pareto') {
    const al = pickOf(rng, [2, 3, 4]);
    return { key: `samp:par:${al}`, prompt: `On veut tirer X de fonction de répartition F(x) = 1 − x^(−${al}) (x ≥ 1) à partir de U ~ U(0 ; 1). Donne F⁻¹(u).`,
      parts: [{ label: 'F⁻¹(u)', name: 'Fi', kind: 'prob', vars: ['u'], domain: { u: [0.05, 0.95] }, expect: `(1-u)^(-1/${al})`, action: 'Résoudre F(x) = u',
        traps: { p_quantile_inverse: { values: [`1-u^(-${al})`] } }, lines: [{ math: `(1-u)^(-1/${al})`, subgoal: 'form', blank: ['1-u'] }] }],
      hints: H('Résous F(x) = u en x.', `x^(−${al}) = □`, `F⁻¹(u) = (1 − u)^(−1/${al})`) };
  }
  const k = pickOf(rng, [2, 3]);
  return { key: `samp:weib:${k}`, prompt: `On veut tirer X de fonction de répartition F(x) = 1 − e^(−x^${k}) (x ≥ 0, Weibull) à partir de U ~ U(0 ; 1). Donne F⁻¹(u).`,
    parts: [{ label: 'F⁻¹(u)', name: 'Fi', kind: 'prob', vars: ['u'], domain: { u: [0.05, 0.95] }, expect: `(-ln(1-u))^(1/${k})`, action: 'Résoudre F(x) = u',
      lines: [{ math: `(-ln(1-u))^(1/${k})`, subgoal: 'form', blank: ['1-u'] }] }],
    hints: H('Résous F(x) = u en x.', `x^${k} = −ln(□)`, `F⁻¹(u) = (−ln(1 − u))^(1/${k})`) };
}

function trItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return trMcq(rng, opts);
  if (opts.exam === 'tf') return trTf(rng, opts);
  if (opts.exam === 'coef') return trCoef(rng);
  const kind = opts.exam === 'open' || level <= 2 ? 'exp' : level === 5 ? pickOf(rng, ['exp', 'affine']) : pickOf(rng, ['exp', 'square', 'affine', 'sample']);
  const o = kind === 'exp' ? trExp(level, rng) : kind === 'square' ? trSquare() : kind === 'affine' ? trAffine(rng) : trSample(rng);
  const item = { skill: TR, level, key: `${level}:${o.key}`, prompt: o.prompt, parts: o.parts, hints: o.hints, subgoals: TR_SUB, exam: examTag(opts) };
  if (opts.exam === 'open') return openItem({ ...item, exam: { format: 'open', points: 10 } }, 10, rng);
  return statItem(item);
}

function trMcq(rng, opts) {
  const lam = pickOf(rng, LAMS.slice(1));
  const fx = `${lamT(lam)}${expT(lam)}`;
  const V = { vars: ['x'] };
  return choice({ skill: TR, level: 4, key: `mcq:${qt(lam)}`, exam: examTag(opts),
    prompt: `U ~ U(0 ; 1) et X = −ln(U)/λ avec λ = ${qs(lam)}. Quelle est la densité de X ?`,
    right: `${SM(fx, V)} pour x > 0`,
    wrongs: [{ html: `${SM('1', V)} pour x > 0`, rule: 'p_transform_jacobian' }, { html: `${SM(`-${fx}`, V)} pour x > 0`, rule: 'p_transform_abs' }, { html: `${SM(fx, V)} pour 0 < x < 1`, rule: 'p_transform_support' }],
    fillers: [] }, rng);
}

function trTf(rng, opts) {
  if (rng.chance(0.4)) return tf({ skill: TR, key: 'chi', exam: examTag(opts), truth: true, statement: 'Si Z ~ N(0 ; 1), alors Z² ~ χ²(1).', explanation: 'Vrai : c\'est la définition de χ²(1) (et χ²(1) = Γ(1/2, 2)).' });
  const a = pickOf(rng, [2, 3]);
  return tf({ skill: TR, key: `scale:${a}`, exam: examTag(opts), truth: false, ruleIfTrue: 'p_scale_density',
    statement: `Si Y = ${a}X, alors f_Y(y) = ${a}·f_X(y).`,
    explanation: `Faux : pour X ~ U(0 ; 1), ${a}·f_X vaut ${a} sur [0 ; 1] et intègre à ${a}, pas à 1. La bonne formule est f_Y(y) = f_X(y/${a})/${a}.`,
    counter: numCounter({ vars: [{ v: 'I', label: `X ~ U(0 ; 1) : ∫ ${a}·f_X(y) dy =` }], hyp: `I=${a}`, pred: 'I=1', answer: { I: String(a) } }) });
}

function trCoef(rng) {
  const lam = pickOf(rng, [2, 3]);
  const v = lam * Math.exp(-lam);
  return coefItem({ skill: TR, key: `coef:${lam}`, exam: { format: 'coef', points: 1 },
    prompt: `U ~ U(0 ; 1) et X = −ln(U)/${lam}. Que vaut la densité de X en x = 1 (au millième) ?`,
    parts: [{ label: 'f_X(1)', kind: 'stat', expect: `${lam}e^(-${lam})`, traps: { p_transform_jacobian: { values: ['1'] }, p_transform_abs: { values: [v6(-v)] } }, lines: [{ math: dl(v, 3) }] }], subgoals: TR_SUB });
}

export const GEN = {
  [NS]: (level, rng, profile, opts = {}) => (opts.exam === 'coef' ? nsCoef(rng) : nsItem(level, rng, profile, opts)),
  [NI]: niItem,
  [TR]: trItem,
};
void qs;
