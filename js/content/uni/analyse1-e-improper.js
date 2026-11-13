// Generators of module A1, part e: improper integrals (a1-improper-calc,
// a1-improper-compare, a1-improper-rational). Catalogue:
// docs/universite/A1-analyse-1.md, « Intégrales généralisées ».
//
// Values and improper integrals are lines of the `definite` judge (bounds
// 0⁺, 2⁻, ∞ and lim(…) lines); a divergent integral is a function of its
// bound b (judge `equiv`), then a `limit` line. Comparisons are limits of
// f(x)·(x − a)^α at each problem point (`limit`). The verdict of
// convention 5 (« Nature ? », then « Quel critère ? ») opens the last part:
// after the computation for a1-improper-calc (the value is written once
// more: « I = »), before the justification of the last problem point for
// a1-improper-compare.

import { asProblem } from './kit-problem.js';
import { MT, linesItem, mcq, tfItem, examTag } from './kit.js';
import { parse } from '../../cas/parse.js';
import { toReadable } from '../../cas/print.js';
import {
  V, q, N, nz, modeOf, H, E, KEYS, blanked, partsScript, cterm, piText, joinSum, fr, sup,
  verdictLines,
} from './analyse1-e-kit.js';
import { t } from '../../i18n.js';

const KEYS_E = [...KEYS, 'greek', 'letters'];
const RD = (t) => toReadable(parse(t));
const vfMcq = (skill, statement, truth, rng, { key, why, ruleIfTrue = null }) => mcq({
  skill, level: 4, prompt: t('Vrai ou faux ?<br>« {statement} »', { statement }), keepOrder: true,
  options: [{ html: t('Vrai'), correct: truth, rule: truth ? null : ruleIfTrue }, { html: t('Faux'), correct: !truth }],
  key: `${skill}:tf:${key}`, solution: [{ html: why, note: '' }], expectedSec: 60, exam: { format: 'tf', points: 1 },
}, rng);
const uniq = (opts) => opts.filter((o, i, a) => a.findIndex((x) => x.html === o.html) === i);

// ======================================================================
// a1-improper-calc
// ======================================================================

const IC = 'a1-improper-calc';
const IC_SUB = [
  { id: 'spot', label: t('repérer le point problème'), skill: IC },
  { id: 'prim', label: t('primitive'), skill: 'a1-int-subst' },
  { id: 'lim', label: t('passer à la limite'), skill: 'a1-fn-limits' },
  { id: 'verdict', label: t('conclure'), skill: IC },
];
const IC_CHOICES = [
  { id: 'subst', label: t('Changer de variable (et de bornes)') },
  { id: 'split', label: t('Séparer en termes simples') },
  { id: 'prim', label: t('Primitive, puis limite à la borne') },
  { id: 'eval', label: t('Évaluer') },
  { id: 'lim', label: t('Passer à la limite') },
  { id: 'ignore', label: t('Évaluer la primitive directement au point problème'), rule: 'a1_improper_singularity_ignored', why: t('La fonction n\'est pas bornée là : il faut une limite.') },
];
const IC_CRIT = [
  { id: 'lim', label: t('La limite de l\'intégrale propre, quand la borne tend vers le point problème') },
  { id: 'zero', label: t('f(x) tend vers 0 à la borne') },
  { id: 'cont', label: t('f est continue sur l\'intervalle ouvert') },
  { id: 'alt', label: t('Le critère de Leibniz') },
];

// (px + q)/√(b − x) on [b − L ; b⁻[, with t = b − x: (N − pt)/√t on
// ]0⁺ ; L], N = pb + q. Null if the numbers are not nice.
function icSqrt(b, L, p, qq) {
  const a = b - L;
  const Nn = p * b + qq;
  if (p * a + qq <= 0 || Nn <= 0 || Nn > 9) return null;
  const r = Math.sqrt(L);
  const c2 = q(2 * p, 3);
  const value = q(2 * Nn * r).sub(c2.mul(L * r));
  if (value.n <= 0) return null;
  const num = `${p === 1 ? '' : p}x${qq > 0 ? `+${qq}` : qq < 0 ? qq : ''}`;
  const f = `${qq ? `(${num})` : num}/√(${b}-x)`;
  const tnum = `${Nn}-${p === 1 ? '' : p}t`;
  const prim = joinSum([`${2 * Nn}√t`, cterm(c2.neg(), 't^(3/2)')]);
  const top = String(2 * Nn * r);
  const at = `${top}-${N(c2.mul(L * r))}`;
  return {
    kind: 'sqrt', f, a: String(a), b: String(b), start: `int(${f},x,${a},${b}⁻)`, value, prim,
    point: `${b}⁻`, why: t('f n\'est pas bornée quand x → {b}⁻', { b }),
    lines: [
      E(`int((${tnum})/√t,t,0⁺,${L})`, `t = ${b} − x, dx = −dt ; x = ${fr(a)} → t = ${L}, x → ${b}⁻ → t → 0⁺`, 'prim', 'subst'),
      E(`lim(bracket(${prim},t,ε,${L}),ε,0⁺)`, t('Primitive, puis limite en 0⁺'), 'lim', 'prim'),
      E(at, t('Évaluer'), 'lim', 'eval'),
      E(N(value), t('Calculer'), 'lim', 'eval')],
    decision: [
      { id: 'subst', label: `t = ${b} − x`, valid: true, ref: true },
      { id: 'subst-sqrt', label: `t = √(${b} − x)`, valid: true, quality: 'good' },
      { id: 'parts', label: t('Parties avec u = {num}', { num: RD(num) }), valid: true, quality: 'poor', why: t('Juste, mais il faut une deuxième primitive ; la substitution évite ce détour.') },
      { id: 'ignore', label: t('Primitive puis évaluer en {b} directement', { b }), valid: false, rule: 'a1_improper_singularity_ignored', why: t('f n\'est pas bornée en {b} : on calcule ∫ jusqu\'à {b} − ε, puis la limite.', { b }) },
    ],
    blanks: [[0, [String(L)]], [2, [top]]],
    hint: t('Le problème est en {b} : pose t = {b} − x, la borne devient 0⁺.', { b }),
  };
}

// Integrands with a value: (a) (px + q)/√(b − x) on [a ; b⁻[ ; (b) xⁿ·ln x
// on ]0⁺ ; 1] ; (c) (x^k + c)/x^m on [1 ; +∞[ ; (e) k·cos x/√(sin x).
function icConv(rng, kind) {
  if (kind === 'sqrt') {
    for (let i = 0; i < 200; i++) {
      const d = icSqrt(rng.int(1, 3), rng.pick([1, 1, 4]), rng.int(1, 3), rng.int(-3, 5));
      if (d) return d;
    }
    return { ...icSqrt(2, 1, 1, 0), fallback: true };
  }
  if (kind === 'log') {
    const n = rng.pick([0, 1, 1, 2, 3]);
    const f = n === 0 ? 'ln(x)' : `${n === 1 ? 'x' : `x^${n}`}×ln(x)`;
    const m = n + 1;
    const pw = (v) => (m === 1 ? v : `${v}^${m}`);
    const prim = m === 1 ? 'x×ln(x)-x' : `${pw('x')}/${m}×ln(x)-${pw('x')}/${m * m}`;
    const atE = m === 1 ? 'ε×ln(ε)-ε' : `${pw('ε')}/${m}×ln(ε)-${pw('ε')}/${m * m}`;
    const value = q(-1, m * m);
    return {
      kind, f, a: '0⁺', b: '1', start: `int(${f},x,0⁺,1)`, value, prim, point: '0⁺', why: t('ln x n\'est pas bornée quand x → 0⁺'),
      lines: [
        E(`lim(bracket(${prim},x,ε,1),ε,0⁺)`, t('Parties : u = ln x, v′ = {p1}', { p1: m === 1 ? '1' : `x^${n}`.replace('x^1', 'x') }), 'prim', 'prim'),
        E(`${N(value)}-lim(${atE},ε,0⁺)`, t('Évaluer en 1'), 'lim', 'eval'),
        E(N(value), t('{p1} → 0 (croissances comparées)', { p1: m === 1 ? 'ε·ln ε' : `${sup(`ε^${m}`)}·ln ε` }), 'lim', 'lim')],
      decision: [
        { id: 'parts', label: t('Parties avec u = ln x'), valid: true, ref: true },
        { id: 'parts-bad', label: t('Parties avec u = {p1}, v′ = ln x', { p1: n === 0 ? '1' : `x^${n}`.replace('x^1', 'x') }), valid: false, why: t('Il faudrait connaître une primitive de ln x : c\'est justement ce qu\'on cherche.') },
        { id: 'ignore', label: t('Primitive puis évaluer en 0 directement'), valid: false, rule: 'a1_improper_singularity_ignored', why: t('ln 0 n\'existe pas : on intègre de ε à 1, puis ε → 0⁺.') },
        { id: 'subst', label: 't = ln x', valid: true, quality: 'poor', why: t('Juste, mais on arrive à ∫ t·e^((n + 1)t) dt sur ]−∞ ; 0] : il faut quand même des parties.') },
      ],
      blanks: [[1, [N(value)]]],
      hint: t('Parties avec u = ln x : on intègre de ε à 1, puis ε → 0⁺.'),
    };
  }
  if (kind === 'inf') {
    const [k, m] = rng.pick([['3/2', 3], ['1', 3], ['1/2', 2]]);
    const c = rng.int(1, 6);
    // x^k/x^m = x^p1, c/x^m = c·x^(−m).
    const p1 = { '3/2': '-3/2', 1: '-2', '1/2': '-3/2' }[k];
    const I1 = p1 === '-3/2' ? q(2) : q(1);
    const prim1 = p1 === '-3/2' ? '-2x^(-1/2)' : '-x^(-1)';
    const c2 = q(c, m - 1);
    const prim = joinSum([prim1, cterm(c2.neg(), `x^(${1 - m})`)]);
    const value = I1.add(c2);
    const xk = k === '1' ? 'x' : `x^(${k})`;
    const split = `x^(${p1})+${c}x^(${-m})`;
    return {
      kind, f: `(${xk}+${c})/x^${m}`, a: '1', b: '∞', start: `int((${xk}+${c})/x^${m},x,1,∞)`, value, prim, point: '+∞', why: t('la borne est infinie'),
      lines: [
        E(`int(${split},x,1,∞)`, t('Séparer'), 'prim', 'split'),
        E(`lim(bracket(${prim},x,1,b),b,+∞)`, t('Primitive, puis limite en +∞'), 'lim', 'prim'),
        E(`${N(I1)}+${N(c2)}`, t('Les puissances négatives de b tendent vers 0'), 'lim', 'lim'),
        E(N(value), t('Calculer'), 'lim', 'eval')],
      decision: [
        { id: 'split', label: t('Séparer : {split}', { split: RD(split) }), valid: true, ref: true },
        { id: 'parts', label: t('Intégration par parties'), valid: false, why: t('Inutile : une fois séparée, chaque puissance s\'intègre directement.') },
        { id: 'div', label: t('L\'intégrale diverge : la borne est infinie'), valid: false, rule: 'a1_improper_undefined_means_diverge', why: t('Une borne infinie rend l\'intégrale généralisée, pas divergente : ∫₁^∞ dx/x² = 1.') },
        { id: 'ignore', label: t('Remplacer ∞ par un grand nombre'), valid: false, why: t('On écrit une limite : lim quand b → +∞ de ∫₁ᵇ.') },
      ],
      blanks: [[0, [p1]], [2, [N(c2)]]],
      hint: t('Sépare en deux puissances de x, puis intègre de 1 à b et fais b → +∞.'),
    };
  }
  // cos x/√(sin x) on ]0⁺ ; π/6] or ]0⁺ ; π/2].
  const k = rng.int(1, 3);
  const b = rng.pick(['π/6', 'π/2']);
  const value = b === 'π/6' ? null : q(2 * k);
  const f = `${k === 1 ? '' : k}cos(x)/√(sin(x))`;
  const valText = b === 'π/6' ? `${k === 1 ? '' : k}√2` : N(value);
  return {
    kind: 'trig', prim: `${2 * k}√(sin(x))`, f, a: '0⁺', b, start: `int(${f},x,0⁺,${b})`, valueText: valText, point: '0⁺', why: t('√(sin x) → 0 quand x → 0⁺'),
    lines: [
      E(`lim(bracket(${2 * k}√(sin(x)),x,ε,${b}),ε,0⁺)`, t('u = sin x : primitive 2√(sin x)'), 'prim', 'prim'),
      E(`${2 * k}√(sin(${b}))`, '√(sin ε) → 0', 'lim', 'lim'),
      E(valText, t('Calculer'), 'lim', 'eval')],
    decision: [
      { id: 'subst', label: t('u = sin x, du = cos x dx'), valid: true, ref: true },
      { id: 'parts', label: t('Parties avec u = cos x'), valid: false, why: t('cos x est la dérivée de sin x : c\'est une forme u′/√u.') },
      { id: 'ignore', label: t('Primitive puis évaluer en 0 directement'), valid: true, quality: 'poor', why: t('Ici 2√(sin x) est continue en 0, donc ça marche, mais il faut l\'écrire comme une limite.') },
      { id: 'div', label: t('Diverge : f n\'est pas définie en 0'), valid: false, rule: 'a1_improper_undefined_means_diverge', why: t('Une borne où f n\'est pas définie rend l\'intégrale généralisée, pas divergente.') },
    ],
    blanks: [[1, [`${2 * k}`]]],
    hint: t('Forme u′/√u avec u = sin x : une primitive est 2√u.'),
  };
}
const Q1 = (t) => { const [a, b] = t.split('/'); return q(Number(a), Number(b ?? 1)); };

// Divergent integrals: (d) k/(c − x) on [c − 1 ; c⁻[, 1/(x ln x) on
// [e ; +∞[, (f) the interior point of ∫₋₁¹ dx/x² (cut at 0).
function icDiv(rng, kind) {
  if (kind === 'pole') {
    const k = rng.int(1, 3);
    const c = rng.int(1, 3);
    const f = `${k === 1 ? '' : k}/(${c}-x)`.replace(/^\//, '1/');
    const goal = `${cterm(-k, `ln(${c}-b)`)}`;
    return {
      kind, k, f, start0: `int(${f},x,${c - 1},b)`, display: `int(${f},x,${c - 1},${c}⁻)`, v: 'b', to: String(c), dir: '-', dom: [c - 0.95, c - 0.05], goal,
      lines0: [E(`bracket(${cterm(-k, `ln(${c}-x)`)},x,${c - 1},b)`, t('Primitive'), 'prim', 'prim'), E(goal, t('Évaluer : ln 1 = 0'), 'prim', 'eval')],
      point: `${c}⁻`, why: t('f n\'est pas bornée quand x → {c}⁻', { c }), conv: 'div', wrongRule: null,
      hint: t('Intègre de {p1} à b < {c}, puis fais b → {c}⁻.', { p1: c - 1, c }),
    };
  }
  if (kind === 'xlnx') {
    return {
      kind, f: '1/(x×ln(x))', start0: 'int(1/(x×ln(x)),x,e,b)', display: 'int(1/(x×ln(x)),x,e,∞)', v: 'b', to: '+∞', dom: [3, 30], goal: 'ln(ln(b))',
      lines0: [E('bracket(ln(ln(x)),x,e,b)', t('Forme u′/u avec u = ln x'), 'prim', 'prim'), E('ln(ln(b))', 'ln(ln e) = ln 1 = 0', 'prim', 'eval')],
      point: '+∞', why: t('la borne est infinie'), conv: 'div',
      hint: t('u = ln x : 1/(x ln x) = u′/u. Intègre de e à b, puis b → +∞.'),
    };
  }
  const k = rng.int(1, 3);
  const f = `${k === 1 ? '' : k}/x^2`.replace(/^\//, '1/');
  return {
    kind: 'inside', k, f, start0: `int(${f},x,ε,1)`, display: `int(${f},x,-1,1)`, v: 'ε', to: '0', dir: '+', dom: [0.05, 0.9], goal: `${k}/ε-${k}`,
    lines0: [E(`bracket(${`-${k}/x`},x,ε,1)`, t('Primitive sur [ε ; 1]'), 'prim', 'prim'), E(`${k}/ε-${k}`, t('Évaluer'), 'prim', 'eval')],
    point: '0', why: t('f n\'est pas bornée en 0, à l\'intérieur de [−1 ; 1]'), conv: 'div',
    hint: t('f n\'est pas bornée en 0 : coupe en 0 et regarde ∫ de 0⁺ à 1, de ε à 1 puis ε → 0⁺.'),
  };
}

function icItem(level, rng, opts = {}) {
  if (opts.exam === 'mcq' || level === 5) {
    const it = icMcq(rng);
    return opts.exam ? it : { ...it, level: 5, exam: false };
  }
  if (opts.exam === 'tf') return icTf(rng);
  const div = rng.chance(level === 1 ? 0.15 : 0.3);
  return div ? icDivItem(level, rng, opts) : icConvItem(level, rng, opts);
}

function icConvItem(level, rng, opts) {
  const kind = rng.pick(['sqrt', 'sqrt', 'log', 'inf', 'trig']);
  const d = icConv(rng, kind);
  const fallback = !!d.fallback;
  const valText = d.valueText ?? N(d.value);
  const lines = d.lines.map((l) => ({ ...l }));
  if (level === 1) for (const [i, texts] of d.blanks) lines[i] = blanked(lines[i], texts);
  if (level === 2) {
    const i = lines.findIndex((l) => l.math.includes('bracket('));
    lines[i] = blanked(lines[i], [d.prim]);
  }
  const pre = [];
  if (level === 2) pre.push({ kind: 'decision', prompt: t('Quelle méthode ?'), options: d.decision.filter((o) => o.ref || o.rule).slice(0, 2) });
  if (level === 3) pre.push({ kind: 'decision', prompt: t('Quelle méthode ?'), options: d.decision });
  const verdict = verdictLines('abs', {
    rules: { div: 'a1_improper_undefined_means_diverge' },
    whys: { div: t('La borne {point} rend l\'intégrale généralisée, pas divergente : la limite existe et elle est finie.', { point: d.point }) },
    criteria: IC_CRIT, correct: 'lim',
  });
  const parts = [
    { start: d.start, judge: { kind: 'definite' }, pre, lines },
    { html: t('Conclusion.'), ask: 'I =', start: d.start, judge: { kind: 'definite' }, pre: verdict, lines: [E(valText, t('L\'intégrale converge'), 'verdict', 'eval')] },
  ];
  const { start, judge, script } = partsScript(parts, level, IC_CHOICES);
  const spot = level === 1 ? t(' Le seul point problème est {point} : {why}.', { point: d.point, why: d.why }) : '';
  return linesItem({
    skill: IC, level, mode: modeOf(level), start, judge, script,
    prompt: t('Calcule {start}, ou montre qu\'elle diverge.{spot}', { start: MT(d.start), spot }),
    hints: H(d.hint, MT(lines[1].math), `${MT(d.start)} = ${MT(valText)}`),
    subgoals: IC_SUB, keys: KEYS_E, tapActions: level === 3 ? 'steps' : null,
    key: `${IC}:${level}:${d.start}`, exam: examTag(opts), fallback,
  });
}

function icDivItem(level, rng, opts) {
  const d = icDiv(rng, rng.pick(['pole', 'pole', 'xlnx', 'inside']));
  const lines0 = d.lines0.map((l) => ({ ...l }));
  if (level === 1) lines0[1] = blanked(lines0[1], [d.kind === 'xlnx' ? 'ln(b)' : d.v === 'b' ? `${d.to}-b` : 'ε']);
  const pre = [];
  if (d.kind === 'inside' && level >= 2) {
    pre.push({ kind: 'decision', prompt: t('{display} : que fais-tu ?', { display: RD(d.display) }), options: [
      { id: 'cut', label: t('f n\'est pas bornée en 0 : couper en 0, et calculer chaque morceau par une limite'), valid: true },
      { id: 'ftc', label: t('Primitive {p1}, puis évaluer entre −1 et 1', { p1: RD(`-${d.k}/x`) }), valid: false, rule: 'a1_improper_singularity_ignored', why: t('f n\'est pas bornée en 0 : le théorème fondamental ne s\'applique pas sur [−1 ; 1]. D\'ailleurs f > 0, l\'intégrale ne peut pas être négative.') },
    ] });
  }
  const verdict = verdictLines('div', {
    rules: d.kind === 'inside' ? { abs: 'a1_improper_singularity_ignored' } : {},
    whys: { abs: t('La limite est infinie : l\'intégrale diverge.'), semi: t('La limite est infinie : l\'intégrale diverge.') },
    criteria: IC_CRIT, correct: 'lim',
  });
  const lim = { kind: 'limit', v: d.v, to: d.to, ...(d.dir ? { dir: d.dir } : {}) };
  const parts = [
    { start: d.start0, judge: { kind: 'equiv', vars: [d.v], domain: { [d.v]: d.dom }, target: 'goal', goal: d.goal }, pre, lines: lines0 },
    { html: t('Conclusion : la limite quand {v} → {p1}.', { v: d.v, p1: d.to === '+∞' ? '+∞' : `${d.to}${d.dir === '-' ? '⁻' : '⁺'}` }), ask: 'lim =', start: d.goal, judge: lim, pre: verdict, lines: [E('+∞', t('La limite est infinie : l\'intégrale diverge'), 'verdict', 'lim')] },
  ];
  const { start, judge, script } = partsScript(parts, level, IC_CHOICES);
  const what = d.kind === 'inside' ? t(' Commence par le morceau {p1} : intègre de ε à 1.', { p1: MT(`int(${d.f},x,0⁺,1)`) }) : t(' Intègre d\'abord jusqu\'à b.');
  return linesItem({
    skill: IC, level, mode: modeOf(level), start, judge, script,
    declares: { vars: [d.v] },
    prompt: t('Calcule {display}, ou montre qu\'elle diverge.{what}', { display: MT(d.display), what }),
    hints: H(d.hint, MT(lines0[0].math), `${MT(d.goal)} → +∞`),
    subgoals: IC_SUB, keys: KEYS_E, tapActions: level === 3 ? 'steps' : null,
    key: `${IC}:${level}:${d.display}`, exam: examTag(opts),
  });
}

function icMcq(rng) {
  const kind = rng.pick(['sqrt', 'inf', 'log', 'pole', 'inside']);
  if (kind === 'pole' || kind === 'inside') {
    const d = icDiv(rng, kind);
    const k = d.k || 1;
    const options = kind === 'inside'
      ? [{ html: t('L\'intégrale diverge.'), correct: true }, { html: t('Elle converge et vaut {p1}.', { p1: MT(String(-2 * k)) }), correct: false, rule: 'a1_improper_singularity_ignored' },
        { html: t('Elle converge et vaut {p1}.', { p1: MT(String(2 * k)) }), correct: false }, { html: t('Elle converge et vaut 0 (f est paire).'), correct: false }]
      : [{ html: t('L\'intégrale diverge.'), correct: true }, { html: t('Elle converge et vaut {p1}.', { p1: MT(String(k)) }), correct: false },
        { html: t('Elle converge et vaut 0.'), correct: false }, { html: t('Elle converge et vaut {p1}.', { p1: MT(`${k === 1 ? '' : k}ln(2)`) }), correct: false }];
    return mcq({
      skill: IC, level: 4, prompt: `${MT(d.display)} :`, options, key: `${IC}:mcq:${d.display}`, expectedSec: 240, exam: { format: 'mcq', points: 1 },
      solution: [{ html: t('{p1}{p2} : on intègre jusqu\'à {v} et {goal} → +∞. L\'intégrale diverge.', { p1: d.why[0].toUpperCase(), p2: d.why.slice(1), v: d.v, goal: MT(d.goal) }), note: '' }],
    }, rng);
  }
  const d = icConv(rng, kind) || icConv(rng, 'log');
  const v = d.value;
  const options = uniq([
    { html: t('Elle converge et vaut {p1}.', { p1: MT(N(v)) }), correct: true },
    { html: t('Elle diverge : f n\'est pas définie en {p1}.', { p1: d.point.replace('⁻', '').replace('⁺', '') }).replace('en +∞', 'en +∞'), correct: false, rule: 'a1_improper_undefined_means_diverge' },
    { html: t('Elle converge et vaut {p1}.', { p1: MT(N(v.neg())) }), correct: false },
    { html: t('Elle converge et vaut {p1}.', { p1: MT(N(v.mul(2))) }), correct: false },
  ]);
  return mcq({
    skill: IC, level: 4, prompt: `${MT(d.start)} :`, options, key: `${IC}:mcq:${d.start}`, expectedSec: 240, exam: { format: 'mcq', points: 1 },
    solution: [{ html: t('{hint} On trouve {p1} : une borne singulière rend l\'intégrale généralisée, pas divergente.', { hint: d.hint, p1: MT(N(v)) }), note: '' }],
  }, rng);
}

function icTf(rng) {
  const kind = rng.pick(['cont', 'cont', 'sqrt', 'ln', 'inside']);
  if (kind === 'cont') {
    return tfItem({
      skill: IC, level: 4, statement: t('Pour tout α > 0, la fonction x ↦ 1/x^α est continue sur ]0 ; 1], donc ∫ de 0⁺ à 1 de dx/x^α converge.'), truth: false,
      counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R+' }], pred: 'a<1', ask: [{ v: 'a', label: 'α =' }], answer: { a: '1' } },
      ruleIfTrue: 'a1_improper_singularity_ignored', key: 'cont', exam: { format: 'tf', points: 1 },
      explanation: t('Faux : la continuité sur l\'intervalle ouvert ne suffit pas. Pour α = 1, ∫ de ε à 1 de dx/x = −ln ε → +∞.'),
    });
  }
  if (kind === 'sqrt') {
    const k = rng.int(1, 4);
    return tfItem({ skill: IC, level: 4, statement: t('∫ de 0⁺ à {p1} de dx/√x converge et vaut {p2}.', { p1: k * k, p2: 2 * k }), truth: true, key: `sqrt:${k}`, exam: { format: 'tf', points: 1 },
      explanation: t('Vrai : [2√x] de ε à {p1} = {p2} − 2√ε → {p2}.', { p1: k * k, p2: 2 * k }) });
  }
  if (kind === 'ln') {
    return vfMcq(IC, t('ln n\'est pas définie en 0, donc ∫ de 0⁺ à 1 de ln x dx diverge.'), false, rng, {
      key: 'ln', ruleIfTrue: 'a1_improper_undefined_means_diverge', why: t('Faux : [x ln x − x] de ε à 1 = −1 − ε ln ε + ε → −1. L\'intégrale converge et vaut −1.'),
    });
  }
  return vfMcq(IC, '∫₋₁¹ dx/x² = [−1/x]₋₁¹ = −2.', false, rng, {
    key: 'inside', ruleIfTrue: 'a1_improper_singularity_ignored', why: t('Faux : 1/x² n\'est pas bornée en 0. Le morceau ∫ de 0⁺ à 1 vaut lim (1/ε − 1) = +∞ : l\'intégrale diverge.'),
  });
}

// ======================================================================
// a1-improper-compare
// ======================================================================

const CP = 'a1-improper-compare';
const CP_SUB = [
  { id: 'spot', label: t('repérer les points problèmes'), skill: IC },
  { id: 'compare', label: t('comparer à 1/xᵅ'), skill: 'a1-ser-compare' },
  { id: 'verdict', label: t('conclure'), skill: CP },
  { id: 'value', label: t('calculer la valeur'), skill: 'a1-int-subst' },
];
const CP_CHOICES = [
  { id: 'simplify', label: t('Simplifier le quotient f(x)/g(x)') },
  { id: 'lim', label: t('Passer à la limite') },
  { id: 'subst', label: t('Changer de variable') },
  { id: 'prim', label: t('Primitive, puis limite') },
  { id: 'eval', label: t('Calculer') },
];
const CP_CRIT = [
  { id: 'cmp', label: t('Comparaison à 1/xᵅ par la limite du quotient (α < 1 en un point fini, α > 1 en +∞)') },
  { id: 'zero', label: t('f(x) tend vers 0 en +∞') },
  { id: 'alt', label: t('Le critère de Leibniz') },
  { id: 'ratio', label: t('Le critère de d\'Alembert') },
];

// √m (simplified) for m whole, and 1/√m as a closed form.
// m = s²·r with r square-free: 1/√m = √r/(s·r).
const sqParts = (m) => { let s = 1; for (let k = 2; k * k <= m; k++) while (m % (s * s * k * k) === 0) s *= k; return { s, r: m / (s * s) }; };
const piOverSqrt = (m) => { const { s, r } = sqParts(m); return r === 1 ? (s === 1 ? 'π' : `π/${s}`) : `√${r}π/${s * r}`; };
const invSqrt = (m) => { const { s, r } = sqParts(m); return r === 1 ? N(q(1, s)) : `√${r}/${s * r}`; };
// (x − a) written: x − 2, x.
const xm = (a) => (a === 0 ? 'x' : `x-${a}`);
// The power of the comparison at a point: xᵅ, (x − 2)ᵅ, (3 − x)ᵅ.
const gPow = (pt) => (pt.to === '+∞' || pt.to === '0' ? 'xᵅ' : pt.dir === '-' ? `(${pt.to} − x)ᵅ` : `(x − ${pt.to})ᵅ`);

// Problem points: [{at: '1⁺', to, dir, g (html), alpha, start, lines, conv}].
function cpData(rng, kind) {
  if (kind === 'b' || kind === 'b2') {
    const a = rng.int(1, 4);
    const c = rng.int(1, 4);
    const m = a + c;
    const f = kind === 'b' ? `1/(√(${xm(a)})(x+${c}))` : `1/√((${xm(a)})(x+${c}))`;
    const p1 = kind === 'b'
      ? { at: `${a}⁺`, to: String(a), dir: '+', g: `1/(x − ${a})^(1/2)`, gt: `(${xm(a)})^(1/2)`, alpha: '1/2', start: `√(${xm(a)})×${f}`, lines: [E(`1/(x+${c})`, t('Simplifier'), 'compare', 'simplify'), E(N(q(1, m)), t('Limite'), 'compare', 'lim')], conv: true }
      : { at: `${a}⁺`, to: String(a), dir: '+', g: `1/(x − ${a})^(1/2)`, gt: `(${xm(a)})^(1/2)`, alpha: '1/2', start: `√(${xm(a)})×${f}`, lines: [E(`1/√(x+${c})`, t('Simplifier'), 'compare', 'simplify'), E(invSqrt(m), t('Limite'), 'compare', 'lim')], conv: true };
    const p2 = kind === 'b'
      ? { at: '+∞', to: '+∞', g: '1/x^(3/2)', gt: 'x^(3/2)', alpha: '3/2', start: `x^(3/2)×${f}`, lines: [E(`1/(√(1-${a}/x)(1+${c}/x))`, t('Diviser par x^(3/2)'), 'compare', 'simplify'), E('1', t('Limite'), 'compare', 'lim')], conv: true }
      : { at: '+∞', to: '+∞', g: '1/x', gt: 'x', alpha: '1', start: `x×${f}`, lines: [E(`1/√((1-${a}/x)(1+${c}/x))`, t('Diviser par x'), 'compare', 'simplify'), E('1', t('Limite'), 'compare', 'lim')], conv: false };
    const out = { kind, f, lo: `${a}⁺`, hi: '∞', I: `int(${f},x,${a}⁺,∞)`, points: [p1, p2], wrongG: [[`1/x^(1/2)`, `1/(x − ${a})`], kind === 'b' ? ['1/x', '1/x²'] : ['1/x^(1/2)', '1/x²']] };
    if (kind === 'b') {
      out.value = { lines: [
        E(`int(2/(t^2+${m}),t,0,∞)`, `t = √(x − ${a}) : x = t² + ${a}, dx = 2t dt`, 'value', 'subst'),
        E(`lim(bracket((2/√${m})arctan(t/√${m}),t,0,b),b,+∞)`, t('Primitive, puis limite'), 'value', 'prim'),
        E(piOverSqrt(m), 'Arctg → π/2', 'value', 'eval')] };
      out.wrongG[1] = ['1/x', '1/x²'];
    }
    return out;
  }
  if (kind === 'a') {
    const a = rng.int(1, 3);
    const L = rng.pick([1, 2, 3, 4]);
    const b = a + L;
    const f = `1/√((${xm(a)})(${b}-x))`;
    const lim = invSqrt(L);
    return {
      kind, f, lo: `${a}⁺`, hi: `${b}⁻`, I: `int(${f},x,${a}⁺,${b}⁻)`,
      points: [
        { at: `${a}⁺`, to: String(a), dir: '+', g: `1/(x − ${a})^(1/2)`, gt: `(${xm(a)})^(1/2)`, alpha: '1/2', start: `√(${xm(a)})×${f}`, lines: [E(`1/√(${b}-x)`, t('Simplifier'), 'compare', 'simplify'), E(lim, t('Limite'), 'compare', 'lim')], conv: true },
        { at: `${b}⁻`, to: String(b), dir: '-', g: `1/(${b} − x)^(1/2)`, gt: `(${b}-x)^(1/2)`, alpha: '1/2', start: `√(${b}-x)×${f}`, lines: [E(`1/√(${xm(a)})`, t('Simplifier'), 'compare', 'simplify'), E(lim, t('Limite'), 'compare', 'lim')], conv: true },
      ],
      wrongG: [[`1/(x − ${a})`, `1/x^(1/2)`], [`1/(${b} − x)`, '1/x²']],
      value: { lines: [
        E(`lim(bracket(arcsin((2x-${2 * a + L})/${L}),x,${a}+ε,${b}-ε),ε,0⁺)`, t('Primitive : Arcsin((2x − {p1})/{L})', { p1: 2 * a + L, L }), 'value', 'prim'),
        E('π', 'Arcsin 1 − Arcsin(−1)', 'value', 'eval')] },
    };
  }
  if (kind === 'zero') {
    const [al, txt, conv] = rng.pick([['1/2', '√x', true], ['1/3', 'x^(1/3)', true], ['1', 'x', false], ['3/2', 'x√x', false], ['2/3', 'x^(2/3)', true]]);
    const c = rng.int(1, 4);
    const f = `1/(${txt}(${c}+x))`;
    const gt = al === '1' ? 'x' : `x^(${al})`;
    return {
      kind, f, lo: '0⁺', hi: '1', I: `int(${f},x,0⁺,1)`,
      points: [{ at: '0⁺', to: '0', dir: '+', g: `1/x^${al.includes('/') ? `(${al})` : al}`, gt, alpha: al, start: `${gt}×${f}`, lines: [E(`1/(${c}+x)`, t('Simplifier'), 'compare', 'simplify'), E(N(q(1, c)), t('Limite'), 'compare', 'lim')], conv }],
      wrongG: [[al === '1' ? '1/x²' : '1/x', `1/(${c} + x)`]],
    };
  }
  // A rational function on [1 ; +∞[: deg Q − deg P = α.
  for (let i = 0; i < 200; i++) {
    const al = rng.pick([1, 2, 2, 3]);
    const k = rng.int(1, 4);
    const p = rng.int(1, 6);
    const qq = rng.int(1, 6);
    const degP = al === 3 ? 0 : al === 2 ? rng.pick([0, 1]) : 1;
    const degQ = degP + al;
    if (degQ > 3 || (degP === 0 && al === 2 && degQ !== 2)) continue;
    const P = degP === 0 ? String(k) : `${k === 1 ? '' : k}x+${p}`;
    const Qt = `x^${degQ}+${qq}`;
    const f = degP === 0 ? `${k}/(${Qt})` : `(${P})/(${Qt})`;
    const gt = al === 1 ? 'x' : `x^${al}`;
    const simp = degP === 0 ? `${k}/(1+${qq}/x^${degQ})` : `(${k}+${p}/x)/(1+${qq}/x^${degQ})`;
    return {
      kind: 'rat', f, lo: '1', hi: '∞', I: `int(${f},x,1,∞)`,
      points: [{ at: '+∞', to: '+∞', g: sup(`1/x${al === 1 ? '' : `^${al}`}`), gt, alpha: String(al), start: `${gt}×${f}`, lines: [E(simp, sup(t('Diviser par x^{degQ}', { degQ })), 'compare', 'simplify'), E(String(k), t('Limite'), 'compare', 'lim')], conv: al > 1 }],
      wrongG: [[al === 1 ? '1/x²' : '1/x', sup(`1/x^${al + 1}`)]],
    };
  }
  return null;
}

// The decision « compare to which g » at a point (with α typed after).
function gDecision(pt, wrong, n) {
  const opts = [{ id: 'g', label: `g(x) = ${pt.g}`, valid: true, ref: true, then: { ask: 'α =', expect: pt.alpha } }];
  wrong.slice(0, n - 1).forEach((w, i) => opts.push({ id: `w${i}`, label: `g(x) = ${w}`, valid: false, why: t('Près de {at}, f(x)·{p1} a une limite finie et non nulle : compare à {g}.', { at: pt.at, p1: pt.gt.replace(/\^\((\d+\/\d+)\)/, '^($1)'), g: pt.g }) }));
  return { kind: 'decision', prompt: t('En {at}, à quelle fonction g compares-tu f ?', { at: pt.at }), options: opts };
}
// The verdict at one point (« α = 1/2 < 1 : converge »).
function pointVerdict(pt) {
  const a = Q1(pt.alpha);
  const atInf = pt.to === '+∞';
  const sign = a.eq(1) ? '=' : a.valueOf() < 1 ? '<' : '>';
  const swapped = !a.eq(1);
  return { kind: 'decision', prompt: t('En {at}, α = {alpha}{p1}. Près de {at}, ∫ f :', { at: pt.at, alpha: fr(pt.alpha), p1: a.eq(1) ? '' : ` ${sign} 1` }), options: [
    { id: 'conv', label: t('converge'), valid: pt.conv, ...(!pt.conv && swapped ? { rule: 'a1_alpha_criteria_swapped' } : {}), why: atInf ? t('En +∞, dx/xᵅ converge seulement si α > 1.') : t('En {at}, dx/(x − a)ᵅ converge seulement si α < 1.', { at: pt.at }) },
    { id: 'div', label: t('diverge'), valid: !pt.conv, ...(pt.conv && swapped ? { rule: 'a1_alpha_criteria_swapped' } : {}), why: atInf ? t('En +∞, dx/xᵅ converge si α > 1.') : t('En {at}, dx/(x − a)ᵅ converge si α < 1.', { at: pt.at }) },
  ] };
}

function cpItem(level, rng, opts = {}) {
  if (opts.exam === 'mcq') return cpMcq(rng);
  if (opts.exam === 'tf') return cpTf(rng);
  if (opts.exam === 'open') return RATIONAL_OPEN(rng, opts);
  const kinds = level === 5 ? ['b', 'a', 'b2'] : level <= 2 ? ['b', 'b2', 'zero', 'rat', 'a'] : ['b', 'b2', 'a', 'zero', 'rat'];
  let d = null;
  for (let i = 0; i < 20 && !d; i++) d = cpData(rng, rng.pick(kinds));
  const pts = d.points;
  const allConv = pts.every((p) => p.conv);
  const nG = level === 1 ? 2 : 3;
  const parts = pts.map((pt, i) => {
    const lines = pt.lines.map((l) => ({ ...l }));
    if (level === 1) lines[1] = blanked(lines[1], [lines[1].math]);
    const pre = [];
    if (i > 0) pre.push(pointVerdict(pts[i - 1]));
    if (level <= 3) pre.push(gDecision(pt, d.wrongG[i], nG));
    return {
      html: t('En {at} : compare f à 1/{pt}, et calcule la limite de f(x)·{pt2}.', { at: pt.at, pt: gPow(pt), pt2: gPow(pt) }),
      ask: 'lim =', start: pt.start, judge: { kind: 'limit', v: V, to: pt.to, ...(pt.dir ? { dir: pt.dir } : {}) }, pre, lines,
    };
  });
  const verdict = verdictLines(allConv ? 'abs' : 'div', {
    rules: allConv ? { div: 'a1_alpha_criteria_swapped' } : { abs: pts.length > 1 && pts[0].conv ? 'a1_improper_one_end_only' : null },
    whys: allConv ? { div: t('Chaque point problème donne une intégrale convergente.') }
      : { abs: pts.length > 1 ? t('Il y a deux points problèmes, {p1} et {p2} : chacun doit converger.', { p1: pts[0].at, p2: pts[1].at }) : t('La comparaison donne une intégrale divergente.') },
    criteria: CP_CRIT, correct: 'cmp',
  });
  const last = parts.at(-1);
  if (level === 5 && d.value && allConv) {
    parts.push({ html: t('Valeur de l\'intégrale :'), ask: 'I =', start: d.I, judge: { kind: 'definite' }, pre: [pointVerdict(pts.at(-1)), ...verdict], lines: d.value.lines });
  } else {
    last.pre = [...(last.pre || []), ...(pts.length > 1 ? [pointVerdict(pts.at(-1))] : []), ...verdict];
    last.html = t('{html} Conclus, puis justifie par la limite.', { html: last.html });
  }
  if (level >= 2) {
    const spots = pts.map((p) => p.at);
    const other = pts.length > 1 ? [spots[1]] : [d.lo === '1' ? t('1 et +∞') : t('0⁺ et 1')];
    parts[0].pre = [{ kind: 'decision', prompt: t('Où sont les points problèmes ?'), options: [
      { id: 'all', label: spots.join(t(' et ')), valid: true },
      { id: 'one', label: pts.length > 1 ? t('seulement {p1}', { p1: other[0] }) : other[0], valid: false, ...(pts.length > 1 ? { rule: 'a1_improper_one_end_only' } : {}), why: pts.length > 1 ? t('f pose problème en {p1} et en {p2} : chacun compte.', { p1: spots[0], p2: spots[1] }) : t('f est continue en {p1} : le seul problème est {p2}.', { p1: d.lo === '1' ? '1' : '1', p2: spots[0] }) },
    ] }, ...(parts[0].pre || [])];
  }
  const { start, judge, script } = partsScript(parts, level, CP_CHOICES);
  const spotNote = level === 1 ? t(' Points problèmes : {p1}.', { p1: pts.map((p) => t('{at} (compare à {g})', { at: p.at, g: p.g })).join(' ; ') }) : '';
  return linesItem({
    skill: CP, level, mode: modeOf(level), start, judge, script,
    prompt: t('{I} converge-t-elle ? Étudie chaque point problème sans calculer l\'intégrale{p1}.{spotNote}', { I: MT(d.I), p1: level === 5 && d.value && allConv ? t(', puis calcule-la') : '', spotNote }),
    hints: H(t('{p1} Compare à {p2}.', { p1: pts.length > 1 ? t('Deux problèmes : en {p1} et en {p2}.', { p1: pts[0].at, p2: pts[1].at }) : t('Un seul problème : en {p1}.', { p1: pts[0].at }), p2: pts.map((p) => p.g).join(t(' puis à ')) }),
      pts.map((p) => t('en {at}, α = ▢', { at: p.at })).join(' ; '),
      t('{list} : {verdict}.', { list: pts.map((p) => t('en {at}, α = {alpha}', { at: p.at, alpha: fr(p.alpha) })).join(' ; '), verdict: allConv ? t('converge') : t('diverge') })),
    subgoals: CP_SUB, keys: KEYS_E, tapActions: level === 3 ? 'steps' : null,
    key: `${CP}:${level}:${d.I}`, exam: examTag(opts),
  });
}

function cpMcq(rng) {
  const d = cpData(rng, rng.pick(['b', 'b2', 'a', 'zero', 'rat'])) || cpData(rng, 'b');
  const pts = d.points;
  const allConv = pts.every((p) => p.conv);
  const why = (p) => t('en {at}, α = {alpha}', { at: p.at, alpha: fr(p.alpha) });
  let options;
  if (pts.length > 1 && allConv) {
    options = [
      { html: t('Converge : {p1} et {p2}.', { p1: why(pts[0]), p2: why(pts[1]) }), correct: true },
      { html: t('Diverge : {p1} {p2}.', { p1: why(pts[0]), p2: pts[0].to === '+∞' ? '> 1' : '< 1' }), correct: false, rule: 'a1_alpha_criteria_swapped' },
      { html: t('Converge : {p1}, et c\'est le seul point à étudier.', { p1: why(pts[1]) }), correct: false, rule: 'a1_improper_one_end_only' },
      { html: t('Diverge : f(x) ≥ 1/(x{p1})² près de {p2}, et cette intégrale diverge.', { p1: d.lo === '0⁺' ? '' : ` + ${pts.length}`, p2: pts[0].at }).replace('(x + 2)²', '(x − a)'), correct: false, rule: 'a1_compare_wrong_direction' },
    ];
  } else if (pts.length > 1) {
    options = [
      { html: t('Diverge : {p1}.', { p1: why(pts[1]) }), correct: true },
      { html: t('Converge : {p1} < 1.', { p1: why(pts[0]) }), correct: false, rule: 'a1_improper_one_end_only' },
      { html: t('Converge : f(x) ≥ 1/x² pour x grand, et ∫₁^∞ dx/x² converge.'), correct: false, rule: 'a1_compare_wrong_direction' },
      { html: t('Converge : {p1} et {p2}.', { p1: why(pts[1]), p2: why(pts[0]) }), correct: false, rule: 'a1_alpha_criteria_swapped' },
    ];
  } else {
    const p = pts[0];
    const atInf = p.to === '+∞';
    const a = Q1(p.alpha);
    options = [
      { html: t('{verdict} : {why}.', { verdict: p.conv ? t('Converge') : t('Diverge'), why: why(p) }), correct: true },
      ...(a.eq(1) ? [{ html: t('Converge : {p} et f(x) → 0.', { p: why(p) }), correct: false, rule: 'a1_improper_lim_zero_converges' }]
        : [{ html: t('{verdict} : {why} {cmp}.', { verdict: p.conv ? t('Diverge') : t('Converge'), why: why(p), cmp: a.valueOf() < 1 ? '< 1' : '> 1' }), correct: false, rule: 'a1_alpha_criteria_swapped' }]),
      { html: p.conv ? t('Diverge : f(x) ≤ {p1} {p2}, et cette intégrale diverge.', { p1: atInf ? '1/x' : '1/x', p2: atInf ? t('pour x grand') : t('près de 0') }) : t('Converge : f(x) ≥ {p1}, et cette intégrale converge.', { p1: atInf ? '1/x³' : '1/√x' }), correct: false, rule: 'a1_compare_wrong_direction' },
      { html: t('{verdict} : {reason}.', { verdict: p.conv ? t('Diverge') : t('Converge'), reason: atInf ? t('la borne est infinie') : t('f n\'est pas définie en 0') }), correct: false, rule: p.conv ? 'a1_improper_undefined_means_diverge' : null },
    ];
  }
  return mcq({
    skill: CP, level: 4, prompt: `${MT(d.I)} :`, options: uniq(options), key: `${CP}:mcq:${d.I}`, expectedSec: 240, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `${pts.map((p) => t('En {at}, f(x) ~ c·{g} : α = {alpha}, {p1}.', { at: p.at, g: p.g, alpha: fr(p.alpha), p1: p.conv ? t('converge') : t('diverge') })).join(' ')} ${allConv ? t('L\'intégrale converge.') : t('L\'intégrale diverge.')}`, note: '' }],
  }, rng);
}

function cpTf(rng) {
  const kind = rng.pick(['lim0', 'lim0', 'swap0', 'swapInf', 'cosh', 'sin', 'spikes']);
  if (kind === 'lim0') {
    return tfItem({
      skill: CP, level: 4, statement: t('Pour tout α > 0, x^(−α) → 0 quand x → +∞, donc ∫₁^∞ dx/x^α converge.'), truth: false,
      counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R+' }], pred: 'a>1', ask: [{ v: 'a', label: 'α =' }], answer: { a: '1' } },
      ruleIfTrue: 'a1_improper_lim_zero_converges', key: 'lim0', exam: { format: 'tf', points: 1 },
      explanation: t('Faux : 1/x → 0, mais ∫₁ᵇ dx/x = ln b → +∞. Une fonction qui tend vers 0 ne suffit pas.'),
    });
  }
  if (kind === 'swap0') {
    return tfItem({
      skill: CP, level: 4, statement: t('Pour tout α > 1, ∫ de 0⁺ à 1 de dx/x^α converge.'), truth: false,
      counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R+' }], pred: 'a>1⇒a<1', hyp: 'a>1', ask: [{ v: 'a', label: 'α =' }], answer: { a: '2' } },
      ruleIfTrue: 'a1_alpha_criteria_swapped', key: 'swap0', exam: { format: 'tf', points: 1 },
      explanation: t('Faux : en 0⁺, dx/x^α converge seulement si α < 1. Pour α = 2, ∫ de ε à 1 vaut 1/ε − 1 → +∞.'),
    });
  }
  if (kind === 'swapInf') {
    return tfItem({
      skill: CP, level: 4, statement: t('Pour tout α ∈ ]0 ; 1[, ∫₁^∞ dx/x^α converge.'), truth: false,
      counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R+' }], pred: '0<a<1⇒a>1', hyp: '0<a<1', ask: [{ v: 'a', label: 'α =' }], answer: { a: '1/2' } },
      ruleIfTrue: 'a1_alpha_criteria_swapped', key: 'swapInf', exam: { format: 'tf', points: 1 },
      explanation: t('Faux : en +∞, dx/x^α converge seulement si α > 1. Pour α = 1/2, ∫₁ᵇ dx/√x = 2√b − 2 → +∞.'),
    });
  }
  if (kind === 'cosh') {
    return tfItem({ skill: CP, level: 4, statement: t('∫₀^∞ dx/(2 + cosh x) converge.'), truth: true, key: 'cosh', exam: { format: 'tf', points: 1 },
      explanation: t('Vrai : 0 < 1/(2 + cosh x) ≤ 2e^(−x), et ∫₀^∞ e^(−x) dx = 1.') });
  }
  if (kind === 'sin') {
    return tfItem({ skill: CP, level: 4, statement: t('∫₁^∞ sin(x)/x² dx converge absolument.'), truth: true, key: 'sin', exam: { format: 'tf', points: 1 },
      explanation: t('Vrai : |sin x/x²| ≤ 1/x², et ∫₁^∞ dx/x² converge (α = 2 > 1).') });
  }
  return vfMcq(CP, t('Si f ≥ 0 est continue et ∫₁^∞ f(x) dx converge, alors f(x) → 0 quand x → +∞.'), false, rng, {
    key: 'spikes', ruleIfTrue: 'a1_improper_lim_zero_converges', why: t('Faux : prends des pics de hauteur 1 et de largeur 1/n² en chaque entier n. L\'aire totale vaut environ Σ 1/(2n²), finie, mais f(n) = 1 pour tout n.'),
  });
}

// ======================================================================
// a1-improper-rational (long problem, catalogue exam example E2)
// ======================================================================

const IR = 'a1-improper-rational';
const IR_SUB = [
  { id: 'conv', label: t('convergence'), skill: CP },
  { id: 'factor', label: t('factoriser Q'), skill: 'g0-horner' },
  { id: 'pfd', label: t('décomposition en éléments simples'), skill: 'g0-pfd-general' },
  { id: 'prim', label: t('primitive'), skill: 'a1-int-rational' },
  { id: 'group', label: t('regrouper les Log'), skill: IR },
  { id: 'lim', label: t('limite en +∞'), skill: 'a1-fn-limits' },
  { id: 'value', label: t('valeur'), skill: IR },
];
const IR_CHOICES = [
  { id: 'lim', label: t('Limite de x²·f(x) en +∞ (critère de convergence)') },
  { id: 'factor', label: t('Racine de Q, factoriser (Horner)') },
  { id: 'pfd', label: t('Décomposer en éléments simples') },
  { id: 'split', label: t('Séparer : dérivée du dénominateur + constante') },
  { id: 'prim', label: t('Primitives (Log et Arctg)') },
  { id: 'group', label: t('Regrouper les Log') },
  { id: 'eval', label: t('Calculer') },
  { id: 'apart', label: t('Limite de chaque Log séparément'), rule: 'a1_improper_log_split_limit', why: t('Chaque Log part à l\'infini : ∞ − ∞ n\'est pas un résultat. Regroupe avant la limite.') },
];

// f = A/(x + r) + (−Ax + C)/(x² + 2rx + s), s = r² + d; K = C + Ar is the
// coefficient of the Arctg and of x in P = Kx + (As + Cr).
function irData(rng) {
  for (let i = 0; i < 200; i++) {
    const r = rng.int(1, 2);
    const dd = rng.pick([1, 1, 4]);
    const s = r * r + dd;
    const A = nz(rng, -4, 4);
    const K = rng.int(1, 6);
    const a = rng.int(0, 1);
    const C = K - A * r;
    const P0 = A * s + C * r;
    if (K * a + P0 <= 0 || P0 === 0 || Math.abs(P0) > 12 || Math.abs(C) > 9) continue;
    if (r === 1 && s === 3 && K === 7 && P0 === -2) continue;
    return { r, dd, s, A, K, C, P0, a };
  }
  return { r: 1, dd: 1, s: 2, A: -2, K: 4, C: 6, P0: 2, a: 1, fallback: true };
}

function irSolve(d) {
  const { r, dd, s, A, K, C, P0, a } = d;
  const sd = Math.sqrt(dd);
  const P = `${K === 1 ? '' : K}x${P0 > 0 ? `+${P0}` : P0 < 0 ? P0 : ''}`;
  const Qt = `x^3+${3 * r}x^2+${2 * r * r + s}x+${r * s}`;
  const Q2 = `x^2+${2 * r}x+${s}`;
  const lin = `x+${r}`;
  const f = `(${P})/(${Qt})`;
  const numB = joinSum([cterm(-A, 'x'), C ? String(C) : '']);
  const des = joinSum([`${A}/(${lin})`, `(${numB})/(${Q2})`]);
  const atanArg = sd === 1 ? lin : `(${lin})/${sd}`;
  const kAt = q(K, sd);
  const prim = joinSum([cterm(A, `ln(${lin})`), cterm(q(-A, 2), `ln(${Q2})`), cterm(kAt, `arctan(${atanArg})`)]);
  const split = joinSum([`int(${A}/(${lin}),x)`, `int(${cterm(q(-A, 2), `(2x+${2 * r})`) || '0'}/(${Q2}),x)`, `int(${K}/((${lin})^2+${dd}),x)`]);
  const grouped = joinSum([cterm(q(A, 2), `ln((${lin})^2/(${Q2}))`), cterm(kAt, `arctan(${atanArg})`)]);
  const limVal = kAt.div(2);
  // I = Kπ/(2√d) − F(a), F(a) = (A/2)ln((a + r)²/Q2(a)) + (K/√d)·arctan((a + r)/√d).
  const ar = a + r;
  const q2a = a * a + 2 * r * a + s;
  const w = q(ar, sd);
  let piCoef = limVal;
  let atan = '';
  if (w.eq(1)) piCoef = piCoef.sub(kAt.div(4));
  else atan = cterm(kAt.neg(), `arctan(${N(w)})`);
  const lnArg = q(q2a, ar * ar);
  const lnTerm = lnArg.eq(1) ? '' : cterm(q(A, 2), `ln(${N(lnArg)})`);
  const value = joinSum([piText(piCoef), lnTerm, atan]);
  return { P, Qt, Q2, lin, f, des, prim, split, grouped, limText: piText(limVal), value, factored: `(${P})/((${lin})(${Q2}))`, I: `int(${f},x,${a},∞)` };
}

function irItem(level, rng, opts = {}, onlyConv = false) {
  const d = irData(rng);
  const z = irSolve(d);
  const { r, K, a } = d;
  const xa = `[${a} ; +∞[`;
  const convLines = level <= 3
    ? [E(`(${K}+${d.P0}/x)/(1+${3 * r}/x+${2 * r * r + d.s}/x^2+${r * d.s}/x^3)`.replace('+-', '-'), t('Diviser par x³'), 'conv', 'lim'), E(String(K), `f(x) ~ ${K}/x²`, 'conv', 'lim')]
    : [E(String(K), `f(x) ~ ${K}/x²`, 'conv', 'lim')];
  if (level === 1) convLines[convLines.length - 1] = blanked(convLines.at(-1), [String(K)]);
  const verdict = verdictLines('abs', {
    rules: { div: 'a1_improper_undefined_means_diverge' },
    whys: { div: t('deg Q − deg P = 2 : f(x) ~ {K}/x², α = 2 > 1, et Q ne s\'annule pas sur {xa}.', { K, xa }) },
    criteria: CP_CRIT, correct: 'cmp',
  });
  const qDecision = { kind: 'decision', prompt: t('Q s\'annule-t-il sur {xa} ?', { xa }), options: [
    { id: 'no', label: t('Non : sa seule racine réelle est −{r}', { r }), valid: true },
    { id: 'yes', label: t('Oui'), valid: false, why: t('Q(−{r}) = 0 et x² + {p1}x + {s} n\'a pas de racine réelle : Q > 0 sur {xa}.', { r, p1: 2 * r, s: d.s, xa }) },
  ] };
  const parts = [{ start: `x^2×${z.f}`, judge: { kind: 'limit', v: V, to: '+∞' }, pre: [qDecision, ...verdict], lines: convLines }];
  if (onlyConv) return { d, z, parts };
  const des = [E(z.factored, `Q(−${r}) = 0 : Q = ${RD(`(${z.lin})(${z.Q2})`)}`, 'factor', 'factor'), E(z.des, t('Décomposition en éléments simples'), 'pfd', 'pfd')];
  if (level === 1) des[1] = blanked(des[1], [String(d.A), String(d.C)].filter((t) => t !== '0'));
  if (level === 2) des[0] = blanked(des[0], [z.lin]);
  parts.push({ html: t('(b) Factorise Q, puis décompose f en éléments simples :'), ask: 'f(x) =', start: z.f, judge: { kind: 'equiv', vars: [V], domain: { x: [a + 0.1, a + 4] }, target: 'partial-fractions' }, lines: level === 1 ? [des[1]] : des });
  const primLines = [E(z.split, t('{p1} = {p2}, et {Q2} = {p3}', { p1: RD(joinSum([cterm(-d.A, 'x'), d.C ? String(d.C) : ''])), p2: RD(`${cterm(q(-d.A, 2), `(2x+${2 * r})`)}+${K}`), Q2: RD(z.Q2), p3: RD(`(${z.lin})^2+${d.dd}`) }), 'prim', 'split'), E(`${z.prim}+C`, t('Primitives : Log et Arctg'), 'prim', 'prim')];
  if (level <= 2) primLines[1] = blanked(primLines[1], [`arctan(${d.dd === 1 ? z.lin : `(${z.lin})/2`})`]);
  parts.push({ html: t('Primitive de f :'), ask: '∫ f(x) dx =', start: `int(${z.des},x)`, judge: { kind: 'antideriv', v: V, domain: { x: [a, a + 5] } }, lines: level >= 4 ? [primLines[1]] : primLines });
  const limLines = [E(z.grouped, t('Regrouper les Log'), 'group', 'group'), E(z.limText, t('Log 1 = 0 et Arctg → π/2'), 'lim', 'lim')];
  if (level === 1) limLines[0] = blanked(limLines[0], [`(${z.lin})^2/(${z.Q2})`]);
  parts.push({ html: t('Limite de la primitive en +∞ (regroupe les Log avant) :'), ask: 'lim =', start: z.prim, judge: { kind: 'limit', v: V, to: '+∞' }, lines: limLines });
  parts.push({ html: t('Valeur de I :'), ask: 'I =', start: z.I, judge: { kind: 'definite' }, lines: [E(`lim(bracket(${z.prim},x,${a},b),b,+∞)`, 'I = lim F(b) − F(a)', 'value', 'eval'), E(z.value, t('Retrancher F({a})', { a }), 'value', 'eval')] });
  const { start, judge, script } = partsScript(parts, level, IR_CHOICES);
  const factorNote = level === 1 ? t(' On donne Q(x) = ({lin})({Q2}).', { lin: MT(z.lin), Q2: MT(z.Q2) }) : '';
  return linesItem({
    skill: IR, level, mode: modeOf(level), start, judge, script,
    prompt: t('I = {I}. (a) Montre que I converge. (b) Calcule I.{factorNote}', { I: MT(z.I), factorNote }),
    hints: H(t('−{r} est racine du dénominateur. Regroupe les Log avant de faire tendre x vers +∞.', { r }),
      t('Regroupe {p1} en un seul Log.', { p1: MT(joinSum([cterm(d.A, `ln(${z.lin})`), cterm(q(-d.A, 2), `ln(${z.Q2})`)])) }), MT(z.grouped)),
    subgoals: IR_SUB, keys: KEYS_E, tapActions: level === 3 ? 'steps' : null,
    key: `${IR}:${level}:${z.I}`, exam: examTag(opts, 12), fallback: !!d.fallback, expectedSec: level >= 4 ? 600 : 300,
  });
}

// a1-improper-compare, open variant: part (a) of the rational problem.
function RATIONAL_OPEN(rng, opts) {
  const { d, z, parts } = irItem(4, rng, opts, true);
  const { start, judge, script } = partsScript(parts, 4, CP_CHOICES);
  return linesItem({
    skill: CP, level: 4, mode: 'free', start, judge, script,
    prompt: t('I = {I}. Montre que I converge, sans la calculer.', { I: MT(z.I) }),
    hints: [], subgoals: CP_SUB, keys: KEYS_E,
    key: `${CP}:open:${z.I}`, exam: examTag(opts, 2), fallback: !!d.fallback,
  });
}

export const GEN = {
  [IC]: (level, rng, profile, opts = {}) => icItem(level, rng, opts),
  [CP]: (level, rng, profile, opts = {}) => cpItem(level, rng, opts),
  // Step U4: level 5 and the open variant are `problem` items, with the
  // catalogue's barème (E2): convergence 2, factorisation and DES 4,
  // primitive 2, regrouping and limit 3, value 1.
  [IR]: (level, rng, profile, opts = {}) => {
    const it = irItem(opts.exam ? 5 : level, rng, opts);
    return level === 5 || opts.exam ? asProblem(it, 12, { points: [2, 4, 2, 3, 1] }) : it;
  },
};
