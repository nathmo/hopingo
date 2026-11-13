// Generators of module A2, part i (unit `analyse2`, step U6): stability
// of y″ + p(a)y′ + q(a)y = 0 according to a parameter (a2-ode-stability).
// Catalogue: docs/universite/A2-analyse-2.md.
//
// p(a) is affine, q(a) affine, quadratic or a positive constant, with
// integer roots; the set {p > 0} ∩ {q > 0} (computed by js/cas/sets.js) must
// be one interval, neither empty nor ℝ. Parts: the characteristic
// polynomial (equiv in r, a), the criterion (a decision whose wrong options
// are the traps), the boundary (a decision), the set (solset in a). The
// traps' sets are written in the solset configuration (cfg._stab, read by
// js/cas/rules/a2i.js) and are the distractors of the multiple choice.

import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { evalFloat } from '../../cas/numeric.js';
import { solutionSet, setToNode, setEqual } from '../../cas/sets.js';
import { linesItem, tfItem, examTag, A2_KEYS } from './a2-kit.js';
import { N, H, E, fr } from './analyse1-e-kit.js';
import { assemble } from './analyse2-i-part.js';
import { sum, blankMatches, mcq4, M } from './analyse2-i-kit.js';
import { t } from '../../i18n.js';

const SK = 'a2-ode-stability';
const SUB = [
  { id: 'char', label: t('équation caractéristique'), skill: 'a2-ode-const2' },
  { id: 'criterion', label: t('critère p > 0 et q > 0'), skill: SK },
  { id: 'solve', label: t('résoudre les inégalités en a'), skill: 'param-quadratic' },
  { id: 'boundary', label: t('les bornes'), skill: SK },
];

const setOf = (text) => solutionSet(parse(text), { v: 'a' });
const setText = (S) => toText(setToNode(S)).replace(/;/g, ' ; ');
const lin = (s, r) => (s > 0 ? (r === 0 ? 'a' : `a${r > 0 ? '-' : '+'}${Math.abs(r)}`) : (r === 0 ? '-a' : `${r}-a`));
// c0 + c1·a + c2·a², the constant first when c2 < 0 < c0 (« 4 − a² »).
function polyA([c0, c1, c2]) {
  const t2 = c2 === 1 ? 'a^2' : c2 === -1 ? '-a^2' : `${c2}a^2`;
  const t1 = c1 === 0 ? '' : c1 === 1 ? 'a' : c1 === -1 ? '-a' : `${c1}a`;
  const t0 = c0 === 0 ? '' : String(c0);
  return c2 < 0 && c0 > 0 ? sum([t0, t1, t2]) : sum([t2, t1, t0]);
}
const paren = (s) => (/^[a-z]$|^\d+(\/\d+)?$/.test(s) ? s : `(${s})`);

// The closed version of a set of one interval: [1 ; 2], [−1 ; +∞[.
function closedText(S) {
  const p = S.parts[0];
  const b = (x) => toText(parse(N(x.q ?? x.x)));
  const lo = p.lo.x === -Infinity ? ']-∞' : `[${b(p.lo)}`;
  const hi = p.hi.x === Infinity ? '+∞[' : `${b(p.hi)}]`;
  return `${lo} ; ${hi}`;
}

export function stabData(rng) {
  for (let i = 0; i < 200; i++) {
    const al = rng.int(-3, 3);
    const s1 = rng.pick([1, 1, -1]);
    const P = lin(s1, al);
    const kind = rng.pick(['affine', 'quad', 'quad', 'const']);
    let Qt;
    let qSolve;
    if (kind === 'const') {
      Qt = rng.pick(['1', '2', '4', '9']);
      qSolve = null;
    } else if (kind === 'affine') {
      const be = rng.int(-3, 3);
      const s2 = rng.pick([1, -1]);
      if (be === al) continue;
      Qt = lin(s2, be);
      qSolve = s2 > 0 ? `a>${be}` : `a<${be}`;
    } else {
      const b1 = rng.int(-3, 2);
      const b2 = rng.int(b1 + 1, 3);
      const s3 = rng.pick([-1, -1, 1]);
      // ±(a − b1)(a − b2), expanded; « 4 − a² » with the constant first.
      Qt = polyA([s3 * b1 * b2, -s3 * (b1 + b2), s3]);
      qSolve = s3 < 0 ? `${b1}<a<${b2}` : `(a<${b1} ou a>${b2})`;
    }
    const pSolve = s1 > 0 ? `a>${al}` : `a<${al}`;
    const crit = `${P}>0 et ${Qt}>0`;
    const S = setOf(crit);
    if (S.parts.length !== 1) continue;
    const st = setText(S);
    if (st === 'ℝ' || st === '∅') continue;
    const Sp = setOf(`${P}>0`);
    const Sq = setOf(`${Qt}>0`);
    const Sd = setOf(`(${P})^2-4(${Qt})<0`);
    const one = [Sp, Sq].filter((x) => !setEqual(x, S)).map(setText);
    const disc = setEqual(Sd, S) ? null : setText(Sd);
    const closed = closedText(S);
    // The boundary: the first finite end of S.
    const part = S.parts[0];
    const end = Number.isFinite(part.lo.x) ? part.lo : part.hi;
    const bq = end.q ?? null;
    if (!bq) continue;
    const at = (s) => evalFloat(parse(s), { a: bq.n / bq.d });
    const pb = at(P);
    const qb = at(Qt);
    let racine;
    let sol;
    if (Math.abs(qb) < 1e-12) { racine = '0'; sol = 'y = 1'; } else if (Math.abs(pb) < 1e-12 && qb > 0) {
      const k = Math.sqrt(qb);
      if (!Number.isInteger(Math.round(qb * 1e6) / 1e6)) continue;
      const ks = Number.isInteger(k) ? (k === 1 ? '' : String(k)) : `√${Math.round(qb)}`;
      racine = ks.startsWith('√') ? `±i${ks}` : `±${ks}i`;
      sol = `y = cos(${ks}${ks.startsWith('√') ? ' ' : ''}x)`;
    } else continue;
    const lhs = sum(["y''", `${paren(P)} y'`, Qt === '1' ? 'y' : `${paren(Qt)} y`]);
    return {
      P, Qt, kind, eq: `${lhs}=0`, crit, st, closed, one, disc, pSolve, qSolve,
      inter: [pSolve, qSolve].filter(Boolean).join(' et '),
      ctx: { borne: fr(N(bq)), racine, sol },
      char: sum(['r^2', `${paren(P)} r`, Qt]),
      delta: `${/^[a-z]$/.test(P) ? `${P}^2` : `(${P})^2`}-${/^\d+$/.test(Qt) ? 4 * Number(Qt) : `4(${Qt})`}`,
    };
  }
  return { ...FALLBACK, fallback: true };
}

// 2020 Q15: y″ + (α + 1)y′ + y/4 = 0, X = ]−1 ; +∞[.
const FALLBACK = {
  P: 'a+1', Qt: '1/4', kind: 'const', eq: "y''+(a+1)y'+(1/4)y=0", crit: 'a+1>0 et 1/4>0', st: ']-1 ; +∞[', closed: '[-1 ; +∞[',
  one: ['ℝ'], disc: ']-2 ; 0[', pSolve: 'a>-1', qSolve: null, inter: 'a>-1', ctx: { borne: '−1', racine: '±i/2', sol: 'y = cos(x/2)' }, char: 'r^2+(a+1) r+1/4', delta: '(a+1)^2-1',
};

const CHOICES = [
  { id: 'char', label: t('Remplacer y par e^(rx) : l\'équation caractéristique') },
  { id: 'solve', label: t('Résoudre chaque inégalité en a') },
  { id: 'inter', label: t('Prendre l\'intersection (les deux conditions)') },
  { id: 'union', label: t('Prendre la réunion des deux ensembles'), rule: 'a2_ode_stability_one_coef', why: t('Il faut p > 0 et q > 0 : c\'est l\'intersection.') },
];

function decisions(d, level) {
  const out = [];
  if (level === 3) {
    out.push({ kind: 'decision', prompt: t('Comment décider ?'), options: [
      { id: 'coef', label: t('Critère des coefficients : p > 0 et q > 0'), valid: true },
      { id: 'delta', label: t('Calculer les racines selon le signe de Δ'), valid: true, quality: 'poor', why: t('Juste, mais il y a trois cas à traiter (Δ > 0, Δ = 0, Δ < 0) : le critère des coefficients est plus court.') },
    ] });
  }
  out.push({ kind: 'decision', prompt: t('Toutes les solutions tendent vers 0 si et seulement si :'), options: [
    { id: 'pq', label: t('{a} et {b}', { a: M(`${d.P}>0`), b: M(`${d.Qt}>0`) }), valid: true },
    { id: 'disc', label: `Δ = ${M(d.delta)} < 0`, valid: false, rule: 'a2_ode_stability_discriminant', why: t('Δ < 0 donne des oscillations, amorties ou non. C\'est le signe de la partie réelle des racines qui compte.') },
    { id: 'p', label: t('{a} seulement', { a: M(`${d.P}>0`) }), valid: false, rule: 'a2_ode_stability_one_coef', why: t('Si q < 0, une racine est positive même si p > 0 : il faut les deux conditions.') },
    d.kind !== 'const' && { id: 'q', label: t('{a} seulement', { a: M(`${d.Qt}>0`) }), valid: false, rule: 'a2_ode_stability_one_coef', why: t('Si p < 0, la somme des racines −p est positive : une racine a une partie réelle positive.') },
  ].filter(Boolean) });
  if (level >= 2) {
    const c = { b: d.ctx.borne, r: d.ctx.racine, sol: d.ctx.sol };
    out.push({ kind: 'decision', prompt: t('En a = {b}, les solutions tendent-elles toutes vers 0 ?', c), options: [
      { id: 'no', label: t('Non : r = {r} est racine, {sol} ne tend pas vers 0. Inégalités strictes.', c), valid: true },
      { id: 'yes', label: t('Oui : on garde les bornes'), valid: false, rule: 'a2_ode_stability_boundary', why: t('En a = {b}, r = {r} est racine : {sol} ne tend pas vers 0.', c) },
    ] });
  }
  return out;
}

function stabItem(level, rng, opts, d) {
  const stab = { closed: d.closed, one: d.one, ...(d.disc ? { disc: d.disc } : {}), ctx: d.ctx };
  const charLine = E(d.char, t('y = e^{rx}, puis diviser par e^{rx}'), 'char', 'char');
  const lines = [];
  if (level <= 3 && d.inter !== d.crit) lines.push(E(d.inter, t('Chaque inégalité'), 'solve', 'solve'));
  lines.push(E(d.st, t('Intersection, bornes exclues'), 'boundary', 'inter'));
  if (level <= 2) {
    if (lines.length > 1) Object.assign(lines[0], blankMatches(lines[0].math, /-?\d+/g, level === 1 ? 2 : 4));
    Object.assign(lines[lines.length - 1], blankMatches(lines[lines.length - 1].math, level === 1 ? /-?\d+/g : /-?\d+|[+-]∞/g, level === 1 ? 1 : 2));
  }
  const parts = [
    { start: `(d(e^(r x),x,2)+${paren(d.P)} d(e^(r x),x)+${paren(d.Qt)} e^(r x))/e^(r x)`, judge: { kind: 'equiv', vars: ['r', 'a', 'x'], target: 'no-prime' }, lines: [charLine] },
    {
      html: t('L\'ensemble des valeurs de a :'), ask: t('a :'), start: d.crit, judge: { kind: 'solset', v: 'a', _stab: stab },
      notes: level === 1 ? [t('Critère : toutes les solutions tendent vers 0 ⇔ {p} et {q} (bornes exclues).', { p: M(`${d.P}>0`), q: M(`${d.Qt}>0`) })] : [],
      pre: level >= 2 ? decisions(d, level) : [], lines,
    },
  ];
  const { start, judge, script } = assemble(parts, level, CHOICES);
  return linesItem({
    skill: SK, level, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', start, judge, script,
    prompt: t('Pour quelles valeurs de a toutes les solutions de {eq} tendent-elles vers 0 en +∞ ? Écris d\'abord le polynôme caractéristique (remplace y par {e}).', { eq: M(d.eq), e: M('e^(r x)') }),
    hints: H(t('Pour r² + pr + q, les deux racines ont une partie réelle négative si et seulement si p > 0 et q > 0 (bornes exclues).'),
      t('{p} et {q}, puis l\'intersection.', { p: M(`${d.P}>0`), q: M(`${d.Qt}>0`) }), t('{i}, donc a ∈ {s}.', { i: M(d.inter), s: M(d.st) })),
    subgoals: SUB, keys: A2_KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SK}:${level}:${d.eq}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// 2020 Q15: X = ?
function stabMcq(level, rng, opts, d) {
  const wrongs = [
    { html: M(d.closed), rule: 'a2_ode_stability_boundary' },
    ...d.one.map((s) => ({ html: M(s), rule: 'a2_ode_stability_one_coef' })),
    d.disc && { html: M(d.disc), rule: 'a2_ode_stability_discriminant' },
  ].filter(Boolean);
  const fillers = ['ℝ', '∅', ']0 ; +∞['].map((s) => ({ html: M(s) }));
  return mcq4({
    skill: SK, level, prompt: t('Soit X l\'ensemble des a ∈ ℝ pour lesquels toutes les solutions de {eq} tendent vers 0 en +∞. Alors X =', { eq: M(d.eq) }),
    right: M(d.st), wrongs, fillers, key: `${SK}:mcq:${d.eq}`,
    solution: [{ html: t('{p} et {q} : {i}', { p: M(`${d.P}>0`), q: M(`${d.Qt}>0`), i: M(d.inter) }), note: t('Critère p > 0 et q > 0') }, { html: `X = ${M(d.st)}`, note: t('En a = {b}, {sol} ne tend pas vers 0.', { b: d.ctx.borne, sol: d.ctx.sol }) }],
    exam: opts.exam ? examTag(opts) : false, expectedSec: 150, fallback: !!d.fallback,
  }, rng);
}

// The catalogue's V/F: « Si p > 0, toutes les solutions … tendent vers 0 ».
const TF = [
  { hyp: 'p>0', say: 'p > 0', truth: false, rule: 'a2_ode_stability_one_coef', answer: { p: '1', q: '-1' }, why: t('Faux : avec p = 1 et q = −1, r² + r − 1 = 0 a une racine positive, et e^{rx} ne tend pas vers 0.') },
  { hyp: 'q>0', say: 'q > 0', truth: false, rule: 'a2_ode_stability_one_coef', answer: { p: '0', q: '1' }, why: t('Faux : avec p = 0 et q = 1, y = cos x oscille sans s\'amortir.') },
  { hyp: 'p^2-4q<0', say: 'p² − 4q < 0', truth: false, rule: 'a2_ode_stability_discriminant', answer: { p: '0', q: '1' }, why: t('Faux : avec p = 0, q = 1 (Δ = −4), y = cos x ne tend pas vers 0. Δ < 0 donne des oscillations, amorties seulement si p > 0.') },
  { hyp: null, say: 'p > 0 et q > 0', truth: true, why: t('Vrai : la somme des racines −p est négative et leur produit q positif, donc les deux parties réelles sont négatives (−p/2 pour des racines complexes).') },
];

function stabTf(level, rng, opts) {
  const st = rng.pick(TF);
  return tfItem({
    skill: SK, level, statement: t('Si {say}, toutes les solutions de y″ + py′ + qy = 0 tendent vers 0 en +∞.', { say: st.say === 'p > 0 et q > 0' ? t('p > 0 et q > 0') : st.say }), truth: st.truth,
    counter: st.truth ? null : {
      kind: 'refute', quants: [{ q: '∀', v: 'p', dom: 'R' }, { q: '∀', v: 'q', dom: 'R' }], pred: `${st.hyp}⇒(p>0∧q>0)`, hyp: st.hyp,
      ask: [{ v: 'p', label: 'p =' }, { v: 'q', label: 'q =' }], answer: st.answer,
    },
    ruleIfTrue: st.rule || null, explanation: st.why, key: st.say, exam: examTag(opts),
    hints: H(t('Toutes les solutions tendent vers 0 ⇔ les deux racines ont une partie réelle < 0 ⇔ p > 0 et q > 0.'), t('Cherche p, q qui vérifient l\'hypothèse avec p ≤ 0 ou q ≤ 0.'), 'p = 0, q = 1 : y = cos x.'),
  });
}

export function genStability(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return stabTf(4, rng, opts);
  const d = stabData(rng);
  if (opts.exam === 'mcq') return stabMcq(4, rng, opts, d);
  if (level === 5) return stabMcq(5, rng, opts, d);
  return stabItem(level, rng, opts, d);
}
