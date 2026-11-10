// Generators of module A1, part f (step U4): sequences. The ε-N definition
// (a1-seq-eps-n-def), N(ε) by the definition (a1-seq-eps-n), limits with
// indeterminate forms (a1-seq-limits). Catalogue:
// docs/universite/A1-analyse-1.md.
//
// a1-seq-eps-n-def: blocks `define` at levels 1 to 3 (the formula with one
// hole, two holes, then all of it with decoys), tokens (judge `logic`) at
// levels 4 and 5 and in the `open` variant; L is a letter or a number.
// a1-seq-eps-n: lines in three parts: |aₙ − L| simplified (`equiv`, target
// `short`), bounded by c/nᵖ (`equiv` with rel '≤', from 1, simple), then
// N(ε) (`delta`, mode 'N', with the real aₙ). Level 5: a problem, the
// definition (tokens, 1 point) then the proof (3 points); `open`: the
// proof (1 + 1 + 1).
// a1-seq-limits: lines judged by `limit` (discrete); the templates of the
// catalogue but (f) Log(n + eⁿ)/(n + 1) (eⁿ overflows in the numeric
// check), plus comparisons of n^p and aⁿ. Level 5: a multiple choice or
// free lines without help.

import { parse, tryParse } from '../../cas/parse.js';
import { toReadable } from '../../cas/print.js';
import { limitOf } from '../../judges/limit.js';
import { sameLimit } from '../../cas/limit.js';
import { MT, MM, FM, linesItem, mcq, tfItem, blocksItem, tokensItem } from './kit.js';
import { problemItem } from './kit-problem.js';
import { q, N, nz, modeOf, H, E, blanked, partsScript, uniq, vfMcq, asLevel5, frT } from './analyse1-f-kit.js';

const ED = 'a1-seq-eps-n-def';
const EN = 'a1-seq-eps-n';
const SL = 'a1-seq-limits';

// |aₙ − L| in text (L a number).
const gapT = (L) => (L === 0 ? '|aₙ|' : L < 0 ? `|aₙ + ${-L}|` : `|aₙ − ${L}|`);
// A line as readable text (notes are plain text).
const RD = (t) => toReadable(parse(t, { vars: ['n'] }));
// Mathematics if the core reads it, else text.
const ML = (t) => { const n = tryParse(t); return n ? MM(n) : t; };
const SEQ_KEYS = ['calc', 'seq'];

// ======================================================================
// a1-seq-eps-n-def
// ======================================================================

// |aₙ − L| written for a letter or a number L.
function gapOf(L) {
  if (L === '0') return '|a_n|';
  if (L.startsWith('-')) return `|a_n + ${L.slice(1)}|`;
  return `|a_n − ${L}|`;
}

// The definitions: quantifiers, body, decoy pieces.
function edDef(rng, kind) {
  const L = rng.pick(['L', 'L', 'L', '0', '2', '3', '-1', '-2']);
  const gap = gapOf(L);
  const Lname = L === 'L' ? 'L' : frT(L);
  switch (kind) {
    case 'plus': return {
      kind, name: 'lim aₙ = +∞', qs: [['∀', 'M > 0'], ['∃', 'N ∈ ℕ'], ['∀', 'n ≥ N']], body: 'a_n ≥ M',
      decoys: ['ε > 0', 'a_n ≤ M', '|a_n − L| ≤ ε'], L: null,
    };
    case 'minus': return {
      kind, name: 'lim aₙ = −∞', qs: [['∀', 'M > 0'], ['∃', 'N ∈ ℕ'], ['∀', 'n ≥ N']], body: 'a_n ≤ −M',
      decoys: ['ε > 0', 'a_n ≥ M', 'a_n ≤ M'], L: null,
    };
    case 'cauchy': return {
      kind, name: '(aₙ) est une suite de Cauchy', qs: [['∀', 'ε > 0'], ['∃', 'N ∈ ℕ'], ['∀', 'm, n ≥ N']], body: '|a_m − a_n| ≤ ε',
      decoys: ['ε ≥ 0', '|a_(n+1) − a_n| ≤ ε', 'n ≥ N'], L: null,
    };
    case 'neg': return {
      kind, name: `(aₙ) ne tend pas vers ${Lname}`, qs: [['∃', 'ε > 0'], ['∀', 'N ∈ ℕ'], ['∃', 'n ≥ N']], body: `${gap} > ε`,
      decoys: ['M > 0', 'a_n ≥ M', ...(L === '0' ? [] : ['|a_n| > ε'])], L,
    };
    default: return {
      kind: 'lim', name: `lim aₙ = ${Lname}`, qs: [['∀', 'ε > 0'], ['∃', 'N ∈ ℕ'], ['∀', 'n ≥ N']], body: `${gap} ≤ ε`,
      decoys: ['ε ≥ 0', 'M > 0', 'a_n ≥ M', ...(L === '0' ? [] : ['|a_n| ≤ ε'])], L,
    };
  }
}
const targetOf = (D) => `${D.qs.map(([s, b]) => `${s}${b}`).join(' ')}, ${D.body}`;
const piecesOf = (D, decoys) => [...D.qs.map(([, b]) => b), D.body, ...(decoys ? D.decoys : [])].filter((t, i, a) => a.indexOf(t) === i).map((text) => ({ text }));

const ED_HINT1 = 'On te donne ε (ou M) d\'abord ; tu dois trouver un rang N qui marche pour tous les n après. N dépend de ε, pas de n.';

function edBlocks(level, rng) {
  const D = edDef(rng, rng.pick(['lim', 'lim', 'lim', 'plus', 'minus']));
  const blk = (t) => `<span class="blk-math">${t}</span>`;
  const blocks = D.qs.map(([s, b], i) => ({
    id: `q${i}`, html: blk(`${s}${ML(b)}`), needs: i ? [`q${i - 1}`] : [],
    ...(i ? { orderRule: 'g9_quant_order', earlyWhy: `Pas encore : « ${s}${b} » dépend de ce qui est choisi avant.` } : {}),
  }));
  blocks.push({ id: 'body', html: blk(`, ${ML(D.body)}`), needs: ['q2'], earlyWhy: 'Place d\'abord les trois quantificateurs.' });
  const first = D.qs[0];
  const DECOYS = [
    { html: blk(`∃${ML(first[1])}`), distractor: 'g9_quant_order', why: `${first[1][0]} est donné d'abord, et pour tous les ${first[1]} : c'est ∀.` },
    { html: blk(`∃${ML('N ∈ ℕ')} qui dépend de n`), distractor: 'a1_n_depends_on_n', why: 'N doit être fixé dès que ε est donné : il ne peut pas dépendre de n.' },
    { html: blk(`∀${ML('N ∈ ℕ')}`), distractor: 'g9_quant_order', why: 'Il suffit d\'un rang N qui marche : c\'est ∃N, choisi après ε.' },
  ];
  const nDecoys = level === 3 ? 2 : 1;
  rng.shuffle(DECOYS).slice(0, nDecoys).forEach((x, i) => blocks.push({ id: `d${i}`, needs: [], ...x }));
  let placed = [];
  let order = ['q0', 'q1', 'q2', 'body'];
  if (level === 1) {
    if (rng.chance(0.5)) { placed = ['q0', 'q1']; order = ['q2', 'body']; } else { placed = ['q0', 'q1', 'q2']; order = ['body']; }
  }
  if (level === 2) { placed = ['q0']; order = ['q1', 'q2', 'body']; }
  const cfg = { pieces: piecesOf(D, false) };
  return blocksItem({
    skill: ED, level, mode: 'define',
    prompt: `Construis la définition : « ${D.name} ».${placed.length ? ' Le début est placé.' : ''} Touche les morceaux dans l'ordre.`,
    blocks: rng.shuffle(blocks), goal: 'body', order, placed,
    hints: H(ED_HINT1, `${D.qs[0][0]}${D.qs[0][1]} ∃▢ ∀▢, ${D.body.replace(/_n/g, 'ₙ').replace(/_m/g, 'ₘ')}`, FM(targetOf(D), cfg)),
    subgoals: [{ id: 'quant', label: 'ordre des quantificateurs', skill: 'g9-quant-write' }, { id: 'def', label: 'définition', skill: ED }],
    solution: [{ html: FM(targetOf(D), cfg), note: D.name }],
    key: `${D.name}:${placed.length}:${level}`,
  });
}

function edTokens(level, rng, opts = {}) {
  const kind = opts.exam === 'open' ? rng.pick(['lim', 'lim', 'plus'])
    : level === 5 ? rng.pick(['neg', 'neg', 'plus', 'minus', 'cauchy']) : rng.pick(['lim', 'lim', 'plus', 'minus', 'cauchy']);
  const D = edDef(rng, kind);
  const pieces = piecesOf(D, true);
  const cfg = { pieces };
  const target = targetOf(D);
  const neg = kind === 'neg';
  return tokensItem({
    skill: ED, level, pieces, target, start: target,
    prompt: neg ? `Écris avec des quantificateurs : « ${D.name} » (la négation de la définition de la limite).` : `Donne la définition précise : « ${D.name} ».`,
    hints: H(neg ? 'Nie la définition de la limite : chaque ∀ devient ∃, chaque ∃ devient ∀, et l\'inégalité finale est niée.' : ED_HINT1,
      `${D.qs[0][0]}${D.qs[0][1]} …`, FM(target, cfg)),
    noHints: level === 5 || !!opts.exam,
    baits: neg ? ['g9_neg_one_quant', 'g9_neg_pred_kept'] : ['g9_quant_order'],
    key: `${D.name}:${level}`, solution: [{ html: FM(target, cfg), note: D.name }],
    exam: opts.exam ? { format: opts.exam, points: 1 } : false,
  });
}

function edTf(rng) {
  const kind = rng.pick(['swap', 'swap', 'strict', 'eps', 'n']);
  if (kind === 'swap') {
    return tfItem({
      skill: ED, level: 4, statement: 'Toute suite (aₙ) qui converge vers L vérifie : ∃N ∈ ℕ ∀ε > 0 ∀n ≥ N, |aₙ − L| ≤ ε.', truth: false,
      counter: {
        kind: 'sequence', v: 'n', from: 1, hyp: [{ p: 'converges' }],
        concl: { p: 'eventuallyConstant', say: 'la suite vérifie ∃N ∀ε > 0 ∀n ≥ N, |aₙ − L| ≤ ε, c\'est-à-dire aₙ = L à partir d\'un rang' },
        ask: [{ v: 'a', label: 'aₙ =', keys: SEQ_KEYS }], answer: { a: '1/n' },
      },
      ruleIfTrue: 'g9_quant_order', key: 'swap', exam: { format: 'tf', points: 1 },
      explanation: 'Faux : avec ∃N avant ∀ε, |aₙ − L| ≤ ε pour tous les ε > 0 force aₙ = L dès n ≥ N. aₙ = 1/n converge vers 0 sans jamais valoir 0.',
    });
  }
  if (kind === 'strict') {
    return tfItem({ skill: ED, level: 4, statement: 'Dans la définition de lim aₙ = L, on peut remplacer |aₙ − L| ≤ ε par |aₙ − L| < ε.', truth: true, key: 'strict', exam: { format: 'tf', points: 1 },
      explanation: 'Vrai : si |aₙ − L| ≤ ε/2 à partir d\'un rang, alors |aₙ − L| < ε. Les deux définitions disent la même chose.' });
  }
  if (kind === 'eps') {
    return tfItem({ skill: ED, level: 4, statement: 'Dans la définition de lim aₙ = L, le rang N peut dépendre de ε.', truth: true, key: 'eps', exam: { format: 'tf', points: 1 },
      explanation: 'Vrai : ∃N vient après ∀ε, donc N est choisi en fonction de ε (N(ε) = 5/ε, par exemple).' });
  }
  return vfMcq(ED, 'Dans la définition de lim aₙ = L, le rang N peut dépendre de n.', false, rng, {
    key: 'n', ruleIfTrue: 'a1_n_depends_on_n', why: 'Faux : N est choisi avant n (∃N ∀n ≥ N). Il ne dépend que de ε.',
  });
}

function epsDef(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return edTf(rng);
  if (opts.exam === 'open') return edTokens(4, rng, opts);
  if (level <= 3) return edBlocks(level, rng);
  return edTokens(level, rng, opts);
}

// ======================================================================
// a1-seq-eps-n
// ======================================================================

const EN_SUB = [
  { id: 'simplify', label: 'simplifier |aₙ − L|', skill: EN },
  { id: 'bound', label: 'majorer', skill: 'g1-bound' },
  { id: 'N', label: 'N(ε)', skill: EN },
  { id: 'def', label: 'définition ε-N', skill: ED },
];
const EN_CHOICES = [
  { id: 'common', label: 'Réduire au même dénominateur' },
  { id: 'simplify', label: 'Simplifier' },
  { id: 'bound', label: 'Majorer : enlever le terme positif du dénominateur' },
  { id: 'bigger', label: 'Majorer en ajoutant un terme au dénominateur', rule: 'a1_bound_wrong_direction', why: 'Un dénominateur plus grand donne une fraction plus petite : ce n\'est pas une majoration.' },
  { id: 'solve', label: 'Résoudre « majorant ≤ ε » en n, puis choisir N' },
];

// c·n + d written out.
function lin(c, d, v = 'n') {
  const head = c === 1 ? v : c === -1 ? `-${v}` : `${c}${v}`;
  return d === 0 ? head : `${head}${d > 0 ? '+' : ''}${d}`;
}
const minusL = (L) => (L < 0 ? `+${-L}` : `-${L}`);

// {kind, f (aₙ), L, start (|aₙ − L|), simp: [lines], bound?, N, Nnum}
function enData(rng, kinds) {
  for (let i = 0; i < 200; i++) {
    const kind = rng.pick(kinds);
    if (kind === 'aff') {
      const L = nz(rng, -5, 5);
      const b = rng.int(1, 5);
      const c = nz(rng, -9, 9);
      const K = L * b + c;
      const f = `(${lin(L, K)})/(n+${b})`;
      const k = Math.abs(c);
      return {
        kind, f, L, k, start: `abs(${f}${minusL(L)})`,
        simp: [
          E(`abs(${lin(L, K)}${L < 0 ? '+' : '-'}${Math.abs(L) === 1 ? '' : Math.abs(L)}(n+${b}))/(n+${b})`, 'Réduire au même dénominateur', 'simplify', 'common'),
          E(`${k}/(n+${b})`, 'Simplifier : il reste une constante en haut', 'simplify', 'simplify'),
        ],
        hole1: lin(L, K) === `${L}n` ? null : `${lin(L, K)}${L < 0 ? '+' : '-'}${Math.abs(L) === 1 ? '' : Math.abs(L)}(n+${b})`,
        goal: `${k}/(n+${b})`, bound: `${k}/n`, boundNote: `n + ${b} ≥ n`, N: `${k}/ε`, p: 1,
      };
    }
    if (kind === 'quad') {
      const L = nz(rng, -3, 3);
      const b = rng.int(1, 5);
      const c = rng.int(-9, 9);
      const k = Math.abs(c - L * b);
      if (k === 0 || k > 30) continue;
      const num = `${L === 1 ? '' : L === -1 ? '-' : L}n^2${c === 0 ? '' : c > 0 ? `+${c}` : c}`;
      const f = `(${num})/(n^2+${b})`;
      return {
        kind, f, L, k, start: `abs(${f}${minusL(L)})`,
        simp: [
          E(`abs(${num}${L < 0 ? '+' : '-'}${Math.abs(L) === 1 ? '' : Math.abs(L)}(n^2+${b}))/(n^2+${b})`, 'Réduire au même dénominateur', 'simplify', 'common'),
          E(`${k}/(n^2+${b})`, 'Simplifier', 'simplify', 'simplify'),
        ],
        hole1: `${num}${L < 0 ? '+' : '-'}${Math.abs(L) === 1 ? '' : Math.abs(L)}(n^2+${b})`,
        goal: `${k}/(n^2+${b})`, bound: `${k}/n^2`, boundNote: `n² + ${b} ≥ n²`, N: k === 1 ? '1/√ε' : `√(${k}/ε)`, p: 2,
      };
    }
    if (kind === 'add') {
      const L = nz(rng, -5, 5);
      const b = rng.int(1, 5);
      const c = rng.int(1, 9);
      const f = `${L}+${c}/(n^2+${b})`;
      return {
        kind, f, L, k: c, start: `abs(${f}${minusL(L)})`,
        simp: [E(`${c}/(n^2+${b})`, `Simplifier : ${c}/(n² + ${b}) > 0`, 'simplify', 'simplify')],
        goal: `${c}/(n^2+${b})`, bound: `${c}/n^2`, boundNote: `n² + ${b} ≥ n²`, N: c === 1 ? '1/√ε' : `√(${c}/ε)`, p: 2,
      };
    }
    // alt: L + (−1)ⁿ·c/n, already simple.
    const L = rng.int(-5, 5);
    const c = rng.int(1, 9);
    const f = `${L === 0 ? '' : `${L}+`}(-1)^n×${c}/n`;
    return {
      kind: 'alt', f, L, k: c, start: L === 0 ? `abs(${f})` : `abs(${f}${minusL(L)})`,
      simp: [E(`${c}/n`, '|(−1)ⁿ| = 1', 'simplify', 'simplify')],
      goal: `${c}/n`, bound: null, N: `${c}/ε`, p: 1,
    };
  }
  return null;
}
const FALLBACK_EN = () => ({
  kind: 'aff', f: '(3n+1)/(n+2)', L: 3, k: 5, start: 'abs((3n+1)/(n+2)-3)',
  simp: [E('abs(3n+1-3(n+2))/(n+2)', 'Réduire au même dénominateur', 'simplify', 'common'), E('5/(n+2)', 'Simplifier : il reste une constante en haut', 'simplify', 'simplify')],
  hole1: '3n+1-3(n+2)', goal: '5/(n+2)', bound: '5/n', boundNote: 'n + 2 ≥ n', N: '5/ε', p: 1, fallback: true,
});

function enLines(level, rng, opts = {}, { kinds, problemPart = false } = {}) {
  const d = enData(rng, kinds || (level <= 2 ? ['aff', 'aff', 'quad', 'add'] : ['aff', 'aff', 'quad', 'add', 'alt'])) || FALLBACK_EN();
  const V = { vars: ['n'] };
  const sJudge = { kind: 'equiv', vars: ['n'], domain: { n: { int: [1, 40] } }, target: 'short', goal: d.goal };
  const bJudge = { kind: 'equiv', vars: ['n'], rel: '≤', from: 1, simple: true };
  const nJudge = { kind: 'delta', mode: 'N', f: d.f, L: String(d.L), from: 1, rules: { dependsOnVar: 'a1_n_depends_on_n' } };
  const simp = level === 1 ? [d.simp.at(-1)] : [...d.simp];
  if (level === 1) simp[0] = blanked(simp[0], [String(d.k)], V);
  if (level === 2 && simp.length > 1 && d.hole1) simp[0] = blanked(simp[0], [d.hole1], V);
  if (level === 2) simp[simp.length - 1] = blanked(simp.at(-1), [String(d.k)], V);
  const parts = [{ start: d.start, judge: sJudge, lines: simp }];
  if (d.bound) {
    const line = E(d.bound, `Majorer : ${d.boundNote}`, 'bound', 'bound');
    parts.push({ html: `Majore ${MT(d.goal, V)} par une expression simple c/n${d.p === 2 ? '²' : ''} :`, ask: null, start: d.goal, judge: bJudge, lines: [level <= 2 ? blanked(line, [String(d.k)], V) : line] });
  }
  const last = d.bound || d.goal;
  const nLine = E(d.N, `${RD(last)} ≤ ε dès que n ≥ ${RD(d.N)}`, 'N', 'solve');
  parts.push({ html: `Résous ${MT(last, V)} ≤ ε en n : choisis N(ε).`, ask: 'N =', start: 'N', judge: nJudge, lines: [level === 1 ? blanked(nLine, [String(d.k)]) : nLine] });
  const { start, judge, script } = partsScript(parts, level, EN_CHOICES);
  script.push({ kind: 'note', html: `Pour tout n ≥ N(ε) = ${MT(d.N)}, ${gapT(d.L)} ≤ ${MT(last, V)} ≤ ε : lim aₙ = ${frT(d.L)}.` });
  const fShow = MT(d.f, V);
  return linesItem({
    skill: EN, level, mode: problemPart ? 'free' : modeOf(level), start, judge, script,
    prompt: `${problemPart ? 'Deuxième partie : prouve' : 'Montre'} par la définition que lim aₙ = ${frT(d.L)} pour aₙ = ${fShow} : simplifie ${gapT(d.L)}${d.bound ? `, majore-le par c/n${d.p === 2 ? '²' : ''}` : ''}, puis donne N(ε) tel que ${gapT(d.L)} ≤ ε pour tout n ≥ N(ε).`,
    hints: H('Calcule |aₙ − L|, puis remplace-le par plus grand et plus simple (c/n ou c/n²), et résous « c/n ≤ ε ».',
      `${gapT(d.L)} = ${MT(d.goal, V)}${d.bound ? ` ≤ ${MT(d.bound, V)}` : ''} ≤ ε dès que n ≥ ▢`,
      `${MT(d.goal, V)}${d.bound ? ` ≤ ${MT(d.bound, V)}` : ''} ≤ ε dès que n ≥ ${MT(d.N)} : N(ε) = ${MT(d.N)}`),
    noHints: level === 5 || problemPart || !!opts.exam,
    subgoals: EN_SUB, keys: ['calc', 'greek', 'seq'], tapActions: level === 3 ? 'steps' : null,
    declares: { vars: ['n'] }, key: `${EN}:${level}:${d.f}`, exam: false, fallback: !!d.fallback,
  });
}

function enProblem(rng, opts) {
  const def = edTokens(4, rng, {});
  const p1 = { ...def, prompt: 'Première partie : donne la définition de lim aₙ = L.', exam: false };
  const p2 = enLines(4, rng, {}, { kinds: ['aff', 'quad', 'add'], problemPart: true });
  const segs = p2.script.filter((l) => l.kind === 'segment').length + 1;
  return problemItem({
    skill: EN, level: opts.exam ? 4 : 5, prompt: 'Définition, puis preuve par la définition.',
    parts: [{ item: p1, points: 1, title: 'Définition' }, { item: p2, points: Array(segs).fill(1), title: 'Preuve' }],
    key: `l5:${p2.key}`, exam: false, expectedSec: 600, fallback: p2.fallback,
  });
}

function enOpen(rng, opts) {
  const p = enLines(4, rng, {}, { kinds: ['aff', 'aff', 'quad', 'add'], problemPart: true });
  const segs = p.script.filter((l) => l.kind === 'segment').length + 1;
  return problemItem({
    skill: EN, level: 4, prompt: p.prompt.replace('Deuxième partie : prouve', 'Montre'),
    parts: [{ item: { ...p, prompt: '' }, points: Array(segs).fill(1) }],
    key: `open:${p.key}`, exam: { format: 'open', points: segs }, expectedSec: 480, fallback: p.fallback,
  });
}

function enTf(rng) {
  const kind = rng.pick(['dep', 'never', 'nines', 'bigger', 'square']);
  if (kind === 'dep') {
    return vfMcq(EN, 'Pour aₙ = 1/n et L = 0, N(ε) = 1/n convient.', false, rng, { key: 'dep', ruleIfTrue: 'a1_n_depends_on_n', why: 'Faux : N doit être fixé dès que ε est donné ; il ne peut pas dépendre de n. N(ε) = 1/ε convient.' });
  }
  if (kind === 'never') {
    return vfMcq(EN, 'Une suite convergente n\'atteint jamais sa limite.', false, rng, { key: 'never', ruleIfTrue: 'a1_limit_never_reached', why: 'Faux : la suite constante aₙ = 3 tend vers 3 et vaut 3 à chaque rang. Ce qui compte : |aₙ − L| finit sous tout ε > 0.' });
  }
  if (kind === 'nines') {
    return vfMcq(EN, '0,999… < 1, car la suite 0,9 ; 0,99 ; 0,999 ; … n\'atteint jamais 1.', false, rng, { key: 'nines', ruleIfTrue: 'a1_limit_never_reached', why: 'Faux : 0,999… est la limite de cette suite, et cette limite vaut 1 (|1 − 0,99…9| = 10⁻ⁿ → 0). Donc 0,999… = 1.' });
  }
  if (kind === 'bigger') {
    const c = rng.int(2, 9);
    return tfItem({ skill: EN, level: 4, statement: `Pour aₙ = ${c}/n et L = 0, N(ε) = ${c}/ε convient, et N(ε) = ${2 * c}/ε aussi.`, truth: true, key: `bigger:${c}`, exam: { format: 'tf', points: 1 },
      explanation: `Vrai : pour n ≥ ${c}/ε, ${c}/n ≤ ε. Tout N plus grand convient aussi.` });
  }
  return tfItem({ skill: EN, level: 4, statement: 'Pour aₙ = 1/n² et L = 0, N(ε) = 1/√ε convient.', truth: true, key: 'square', exam: { format: 'tf', points: 1 },
    explanation: 'Vrai : n ≥ 1/√ε donne n² ≥ 1/ε, donc 1/n² ≤ ε.' });
}

function epsN(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return enTf(rng);
  if (opts.exam === 'open') return enOpen(rng, opts);
  if (level === 5) return enProblem(rng, opts);
  return enLines(level, rng, opts);
}

// ======================================================================
// a1-seq-limits
// ======================================================================

const SL_SUB = [
  { id: 'simplify', label: 'conjugué, simplifier', skill: 'rat-simplify' },
  { id: 'log', label: 'croissances comparées', skill: 'g2-log-rules' },
  { id: 'limit', label: 'passer à la limite', skill: SL },
];
const SL_CHOICES = [
  { id: 'factor', label: 'Mettre le terme dominant en facteur (diviser en haut et en bas)' },
  { id: 'conj', label: 'Multiplier et diviser par la quantité conjuguée' },
  { id: 'simplify', label: 'Simplifier' },
  { id: 'exp', label: 'Écrire uᵛ = e^(v·ln u)' },
  { id: 'growth', label: 'Croissances comparées' },
  { id: 'limit', label: 'Passer à la limite' },
  { id: 'zero', label: 'Remplacer ∞ − ∞ par 0', rule: 'a1_indet_inf_minus_inf', why: '∞ − ∞ est indéterminé : l\'écart peut tendre vers n\'importe quoi.' },
];
const LIM = { kind: 'limit', v: 'n', to: '+∞', discrete: true, vars: ['n'] };
const V = { vars: ['n'] };

// c·n^k as text (k ≥ 0), with its sign kept.
function mono(c, k) {
  const head = k === 0 ? String(c) : `${c === 1 ? '' : c === -1 ? '-' : c}n${k === 1 ? '' : `^${k}`}`;
  return head;
}
const joinT = (ts) => ts.filter(Boolean).reduce((s, t) => (s ? (t.startsWith('-') ? `${s}${t}` : `${s}+${t}`) : t), '');
// c·n^(k − m) after dividing by n^m.
function divTerm(c, k, m) {
  const e = k - m;
  if (e > 0) return mono(c, e);
  if (e === 0) return String(c);
  return `${c}/n${-e === 1 ? '' : `^${-e}`}`;
}
const nPow = (m) => (m === 1 ? 'n' : `n${'⁰¹²³⁴⁵⁶⁷⁸⁹'[m]}`);

function slPoly(rng, finite) {
  for (let i = 0; i < 200; i++) {
    const p = rng.int(1, 3);
    const qd = rng.int(1, 3);
    // A line « −∞ + 1 » has the same limit: the lines items end on a number.
    if (finite && p > qd) continue;
    const a = nz(rng, -9, 9);
    const b = rng.int(1, 9);
    const ia = rng.int(0, p - 1);
    const ib = rng.int(0, qd - 1);
    const a2 = rng.chance(0.85) ? nz(rng, -9, 9) : 0;
    const b2 = nz(rng, -9, 9);
    const P = [[a, p], [a2, ia]].filter(([c]) => c);
    const Q = [[b, qd], [b2, ib]];
    const den = (n) => Q.reduce((s, [c, k]) => s + c * n ** k, 0);
    let ok = true;
    for (let n = 1; n <= 60; n++) if (den(n) <= 0) ok = false;
    if (!ok) continue;
    const r = q(a, b);
    const value = p === qd ? N(r) : p < qd ? '0' : a > 0 ? '+∞' : '-∞';
    const Pt = joinT(P.map(([c, k]) => mono(c, k)));
    const Qt = joinT(Q.map(([c, k]) => mono(c, k)));
    const start = `${P.length > 1 ? `(${Pt})` : Pt}/(${Qt})`;
    const divided = `${P.length > 1 ? `(${joinT(P.map(([c, k]) => divTerm(c, k, qd)))})` : `(${divTerm(a, p, qd)})`}/(${joinT(Q.map(([c, k]) => divTerm(c, k, qd)))})`;
    // The lowest terms kept (a1_dominant_term_wrong).
    const lowP = P.length > 1 ? P[1] : P[0];
    const wrongLow = lowP[1] === ib && P.length > 1 ? N(q(lowP[0], b2)) : null;
    return {
      kind: 'poly', start, value,
      lines: [E(divided, `Diviser en haut et en bas par ${nPow(qd)}`, 'simplify', 'factor'), E(value, p === qd ? 'Les termes en 1/n tendent vers 0' : p < qd ? 'Le numérateur tend vers 0, le dénominateur vers ' + b : `Le numérateur tend vers ${a > 0 ? '+∞' : '−∞'}`, 'limit', 'limit')],
      blank: [0, [String(b)]],
      method: `∞/∞ : divise en haut et en bas par ${nPow(qd)}, la plus grande puissance du dénominateur.`,
      choice: [
        { id: 'factor', label: `Diviser en haut et en bas par ${nPow(qd)}`, valid: true },
        { id: 'conj', label: 'Multiplier par la quantité conjuguée', valid: false, why: 'Il n\'y a pas de racine : le conjugué ne sert à rien. Mets le terme dominant en facteur.' },
      ],
      wrong: [
        ...(wrongLow ? [{ text: wrongLow, rule: 'a1_dominant_term_wrong' }] : []),
        { text: N(q(b, a)) }, { text: '0' }, { text: '+∞' }, { text: '1' }, { text: '-∞' }, { text: N(r) },
      ],
    };
  }
  return null;
}

function slSqrt(rng) {
  for (let i = 0; i < 200; i++) {
    const p = rng.pick([-8, -6, -4, -2, 2, 4, 6, 8]);
    const r = rng.int(-9, 9);
    let ok = true;
    for (let n = 1; n <= 100; n++) if (n * n + p * n + r <= 0) ok = false;
    if (!ok) continue;
    const rad = `n^2${p > 0 ? '+' : ''}${p}n${r === 0 ? '' : r > 0 ? `+${r}` : r}`;
    const top = lin(p, r);
    const value = N(q(p, 2));
    const divTop = r === 0 ? String(p) : `${p}${r > 0 ? '+' : ''}${r}/n`;
    const divRad = `1${p > 0 ? '+' : ''}${p}/n${r === 0 ? '' : `${r > 0 ? '+' : ''}${r}/n^2`}`;
    return {
      kind: 'sqrt', start: `√(${rad})-n`, value,
      lines: [
        E(`(${rad}-n^2)/(√(${rad})+n)`, 'Multiplier et diviser par la quantité conjuguée √(…) + n', 'simplify', 'conj'),
        E(`${r === 0 ? top : `(${top})`}/(√(${rad})+n)`, 'Simplifier : (√A)² − n² = A − n²', 'simplify', 'simplify'),
        E(`${r === 0 ? divTop : `(${divTop})`}/(√(${divRad})+1)`, 'Diviser en haut et en bas par n', 'simplify', 'factor'),
        E(value, `√(…) → 1 : la limite vaut ${frT(p)}/2`, 'limit', 'limit'),
      ],
      blank: [1, [top]],
      method: '∞ − ∞ avec une racine : multiplie et divise par la quantité conjuguée √(…) + n.',
      choice: [
        { id: 'conj', label: 'Multiplier et diviser par la quantité conjuguée √(…) + n', valid: true },
        { id: 'factor', label: 'Mettre n en facteur : n·(√(1 + …) − 1)', valid: false, why: 'On obtient ∞ · 0 : c\'est encore indéterminé. Le conjugué fait disparaître la racine.' },
      ],
      wrong: [{ text: '0', rule: 'a1_indet_inf_minus_inf' }, { text: '+∞', rule: 'a1_sqrt_sum_split' }, { text: String(p) }, { text: '1' }, { text: N(q(p, 4)) }],
    };
  }
  return null;
}

function slSqrt2(rng) {
  const a = rng.int(1, 9);
  const b = rng.int(1, 9);
  const A = a === 1 ? '' : a;
  const value = N(q(a, 2));
  return {
    kind: 'sqrt2', start: `(√(n+${a})-√n)×√(n+${b})`, value,
    lines: [
      E(`${A}√(n+${b})/(√(n+${a})+√n)`, `Quantité conjuguée : (n + ${a}) − n = ${a}`, 'simplify', 'conj'),
      E(`${A}√(1+${b}/n)/(√(1+${a}/n)+1)`, 'Diviser en haut et en bas par √n', 'simplify', 'factor'),
      E(value, 'Les racines tendent vers 1', 'limit', 'limit'),
    ],
    blank: [0, [`√(n+${b})`]],
    method: '∞ − ∞ avec des racines : multiplie et divise √(n + a) − √n par √(n + a) + √n.',
    choice: [
      { id: 'conj', label: 'Multiplier et diviser par √(n + a) + √n', valid: true },
      { id: 'zero', label: '√(n + a) − √n → 0, donc le produit tend vers 0', valid: false, rule: 'a1_indet_inf_minus_inf', why: 'C\'est 0 · ∞ : encore indéterminé. Le conjugué donne la vitesse à laquelle l\'écart tend vers 0.' },
    ],
    wrong: [{ text: '0', rule: 'a1_indet_inf_minus_inf' }, { text: String(a) }, { text: '+∞' }, { text: N(q(a, 4)) }, { text: '1' }],
  };
}

function slCbrt(rng) {
  for (let i = 0; i < 200; i++) {
    const p = nz(rng, -9, 9);
    const r = rng.int(1, 9);
    let ok = true;
    for (let n = 1; n <= 60; n++) if (n ** 3 + p * n * n + r <= 0) ok = false;
    if (!ok) continue;
    const rad = `n^3${p > 0 ? '+' : ''}${p === 1 ? '' : p === -1 ? '-' : p}n^2+${r}`;
    const R = `root(3,${rad})`;
    const top = `${p === 1 ? '' : p === -1 ? '-' : p}n^2+${r}`;
    const radD = `1${p > 0 ? '+' : ''}${p}/n+${r}/n^3`;
    const RD = `root(3,${radD})`;
    const value = N(q(p, 3));
    return {
      kind: 'cbrt', start: `${R}-n`, value,
      lines: [
        E(`(${top})/(${R}^2+n×${R}+n^2)`, 'a − b = (a³ − b³)/(a² + ab + b²)', 'simplify', 'conj'),
        E(`(${p}+${r}/n^2)/(${RD}^2+${RD}+1)`, 'Diviser en haut et en bas par n²', 'simplify', 'factor'),
        E(value, 'Les racines tendent vers 1', 'limit', 'limit'),
      ],
      blank: [0, [top]],
      method: 'Avec une racine cubique : a − b = (a³ − b³)/(a² + ab + b²), avec a = ∛(…) et b = n.',
      choice: [
        { id: 'conj', label: 'Écrire a − b = (a³ − b³)/(a² + ab + b²)', valid: true },
        { id: 'zero', label: 'Les deux termes valent n à l\'infini : la limite est 0', valid: false, rule: 'a1_indet_inf_minus_inf', why: '∞ − ∞ est indéterminé : l\'écart peut tendre vers n\'importe quoi.' },
      ],
      wrong: [{ text: '0', rule: 'a1_indet_inf_minus_inf' }, { text: String(p) }, { text: N(q(p, 2)) }, { text: '+∞' }],
    };
  }
  return null;
}

function slRoot(rng) {
  const k = rng.int(2, 9);
  const which = rng.pick(['k', 'n', 'kn']);
  const start = which === 'k' ? `${k}^(1/n)` : which === 'n' ? 'n^(1/n)' : `(${k}n)^(1/n)`;
  const ex = which === 'k' ? `e^(ln(${k})/n)` : which === 'n' ? 'e^(ln(n)/n)' : `e^((ln(${k})+ln(n))/n)`;
  return {
    kind: 'root', start, value: '1',
    lines: [
      E(ex, 'uᵛ = e^(v·ln u)', 'log', 'exp'),
      E('1', which === 'k' ? `ln(${k})/n → 0, et e⁰ = 1` : 'Croissances comparées : ln(n)/n → 0, et e⁰ = 1', 'limit', which === 'k' ? 'limit' : 'growth'),
    ],
    blank: [0, [which === 'n' ? 'ln(n)' : `ln(${k})`]],
    method: 'Une puissance variable : écris uᵛ = e^(v·ln u), puis cherche la limite de l\'exposant.',
    choice: [
      { id: 'exp', label: 'Écrire uᵛ = e^(v·ln u)', valid: true },
      { id: 'one', label: `L'exposant 1/n tend vers 0, et ∞⁰ = 1`, valid: false, why: '∞⁰ est indéterminé : il faut la limite de v·ln u.' },
    ],
    wrong: [{ text: '+∞' }, { text: '0' }, { text: which === 'n' ? 'e' : String(k) }, { text: 'e' }],
  };
}

// Comparisons: ln n against nᵖ (lines: the numeric limit of a ratio of
// exponentials overflows, so aⁿ against nᵖ is only in multiple choices).
function slGrowth(rng, finite) {
  const a = rng.pick([2, 3, 5]);
  if (finite) {
    const p = rng.int(1, 3);
    const c = nz(rng, -9, 9);
    const g = nz(rng, -9, 9);
    const b = rng.int(1, 9);
    const d = rng.int(1, 9);
    const value = N(q(c, b));
    const P = mono(c, p);
    const B = mono(b, p);
    const L = `${g === 1 ? '' : g === -1 ? '-' : g}ln(n)`;
    const np = p === 1 ? 'n' : `n^${p}`;
    return {
      kind: 'growthln', start: `(${P}${g > 0 ? '+' : ''}${L})/(${B}+${d})`, value,
      lines: [
        E(`(${c}${g > 0 ? '+' : ''}${L}/${np})/(${b}+${d}/${np})`, `Diviser en haut et en bas par ${nPow(p)}`, 'simplify', 'factor'),
        E(value, `Croissances comparées : ln(n)/${nPow(p)} → 0`, 'log', 'growth'),
      ],
      blank: [0, [String(b)]],
      method: `ln n est négligeable devant ${nPow(p)} : divise en haut et en bas par ${nPow(p)}.`,
      choice: [
        { id: 'factor', label: `Diviser en haut et en bas par ${nPow(p)}`, valid: true },
        { id: 'ln', label: 'Diviser en haut et en bas par ln n', valid: false, rule: 'a1_dominant_term_wrong', why: `${nPow(p)} grandit plus vite que ln n : c'est lui le terme dominant.` },
      ],
      wrong: [{ text: N(q(g, d)), rule: 'a1_dominant_term_wrong' }, { text: '0' }, { text: '+∞' }, { text: N(q(b, c)) }, { text: '1' }],
    };
  }
  if (rng.chance(0.5)) {
    const c = nz(rng, -9, 9);
    const p = rng.int(2, 5);
    const k = rng.int(1, 4);
    const value = String(c);
    const dom = p > k ? '+∞' : p < k ? '0' : '1';
    const cA = `${c === 1 ? '' : c === -1 ? '-' : `${c}×`}${a}^n`;
    const nk = k === 1 ? 'n' : `n^${k}`;
    return {
      kind: 'growth', start: `(${cA}+n^${p})/(${a}^n+${nk})`, value,
      lines: [
        E(`(${c}+n^${p}/${a}^n)/(1+${nk}/${a}^n)`, `Diviser en haut et en bas par ${a}ⁿ`, 'simplify', 'factor'),
        E(value, 'Croissances comparées : nᵖ/aⁿ → 0', 'log', 'growth'),
      ],
      blank: [0, [String(c)]],
      method: `${a}ⁿ domine toute puissance de n : divise en haut et en bas par ${a}ⁿ.`,
      choice: [
        { id: 'factor', label: `Diviser en haut et en bas par ${a}ⁿ`, valid: true },
        { id: 'poly', label: `Diviser en haut et en bas par n^${Math.max(p, k)}`, valid: false, rule: 'a1_dominant_term_wrong', why: `${a}ⁿ grandit plus vite que toute puissance de n : c'est lui le terme dominant.` },
      ],
      wrong: [{ text: dom, rule: 'a1_dominant_term_wrong' }, { text: '0' }, { text: '+∞' }, { text: String(c + 1) }, { text: '1' }],
    };
  }
  const b = rng.pick([a + 1, a + 2, 7].filter((x) => x > a));
  const p = rng.int(2, 5);
  return {
    kind: 'growth2', start: `(n^${p}+${a}^n)/${b}^n`, value: '0',
    lines: [
      E(`n^${p}/${b}^n+(${a}/${b})^n`, 'Séparer la fraction', 'simplify', 'simplify'),
      E('0', `Croissances comparées, et 0 < ${a}/${b} < 1`, 'log', 'growth'),
    ],
    blank: [0, [`${a}/${b}`]],
    method: `Sépare en deux fractions : nᵖ/${b}ⁿ → 0 (croissances comparées) et (${a}/${b})ⁿ → 0.`,
    choice: [
      { id: 'split', label: 'Séparer en deux fractions', valid: true },
      { id: 'poly', label: `Diviser en haut et en bas par n^${p}`, valid: false, rule: 'a1_dominant_term_wrong', why: 'Les exponentielles dominent les puissances : n^p n\'est pas le terme dominant.' },
    ],
    wrong: [{ text: '+∞', rule: 'a1_dominant_term_wrong' }, { text: '1' }, { text: N(q(a, b)) }, { text: '-∞' }],
  };
}

// For lines items (finite), every line's limit must be decided by the
// judge (the numeric check loses √(n + 5) − √n to rounding for some
// numbers): a template whose lines are not is drawn again.
function decided(d) {
  const want = limitOf(LIM, parse(d.start, V)).value;
  if (want === null || want === 'none') return false;
  return d.lines.every((l) => { const r = limitOf(LIM, parse(l.math, V)); return r.value !== null && sameLimit(r, { value: want }); });
}
function slData(rng, kinds, { finite = false } = {}) {
  let d = null;
  for (let i = 0; i < 200 && !d; i++) {
    const kind = rng.pick(kinds);
    d = kind === 'poly' ? slPoly(rng, finite) : kind === 'sqrt' ? slSqrt(rng) : kind === 'sqrt2' ? slSqrt2(rng) : kind === 'cbrt' ? slCbrt(rng) : kind === 'root' ? slRoot(rng) : slGrowth(rng, finite);
    if (d && finite && !decided(d)) d = null;
  }
  return d || {
    kind: 'sqrt', start: '√(n^2+4n)-n', value: '2', fallback: true,
    lines: [E('(n^2+4n-n^2)/(√(n^2+4n)+n)', 'Quantité conjuguée', 'simplify', 'conj'), E('4n/(√(n^2+4n)+n)', 'Simplifier', 'simplify', 'simplify'),
      E('4/(√(1+4/n)+1)', 'Diviser par n', 'simplify', 'factor'), E('2', 'Passer à la limite', 'limit', 'limit')],
    blank: [1, ['4n']], method: '∞ − ∞ avec une racine : multiplie et divise par la quantité conjuguée.',
    choice: [{ id: 'conj', label: 'Quantité conjuguée', valid: true }, { id: 'factor', label: 'Mettre n en facteur', valid: false, why: '∞ · 0, encore indéterminé.' }],
    wrong: [{ text: '0', rule: 'a1_indet_inf_minus_inf' }, { text: '+∞', rule: 'a1_sqrt_sum_split' }, { text: '4' }],
  };
}
const SL_KINDS = ['poly', 'poly', 'sqrt', 'sqrt', 'sqrt2', 'cbrt', 'root', 'growth'];

function slLines(level, rng, opts = {}) {
  const d = slData(rng, level === 1 ? SL_KINDS.filter((k) => k !== 'cbrt') : SL_KINDS, { finite: true });
  const lines = [...d.lines];
  if (level === 1) lines[d.blank[0]] = blanked(lines[d.blank[0]], d.blank[1], V);
  const parts = [{ start: d.start, judge: LIM, lines, pre: level === 2 ? [{ kind: 'decision', prompt: 'Quelle transformation ?', options: d.choice }] : [] }];
  if (level === 1) parts[0].pre = [{ kind: 'note', html: d.method }];
  const { start, judge, script } = partsScript(parts, level, SL_CHOICES);
  return linesItem({
    skill: SL, level, mode: modeOf(level), start, judge, script,
    prompt: `Calcule la limite de la suite aₙ = ${MT(d.start, V)}.`,
    hints: H(d.method, `= ${MT(d.lines[0].math, V)}`, `${MT(d.lines.at(-2)?.math ?? d.lines[0].math, V)} → ${MT(d.value)}`),
    noHints: level === 5, subgoals: SL_SUB, keys: ['calc', 'calcfn', 'seq'], tapActions: level === 3 ? 'steps' : null,
    declares: { vars: ['n'] }, key: `${SL}:${level}:${d.start}`, exam: false, fallback: !!d.fallback,
  });
}

function slMcq(rng, level, opts = {}) {
  const d = slData(rng, SL_KINDS);
  const show = (t) => (t === '+∞' ? '+∞' : t === '-∞' ? '−∞' : MT(t));
  const options = [{ html: show(d.value), correct: true }];
  for (const w of d.wrong) {
    if (options.length >= 4) break;
    const html = show(w.text);
    if (options.some((o) => o.html === html)) continue;
    options.push({ html, correct: false, rule: w.rule || null });
  }
  return mcq({
    skill: SL, level, prompt: `lim<sub>n→+∞</sub> ${MT(d.start, V)} =`, options: uniq(options),
    key: `${SL}:mcq:${d.start}`, expectedSec: 240, exam: opts.exam ? { format: 'mcq', points: 1 } : false,
    solution: [{ html: `${d.method} ${MT(d.lines[0].math, V)} → ${MT(d.value)}.`, note: '' }], fallback: !!d.fallback,
  }, rng);
}
const SEQ_ASK = (v, label) => ({ v, label, keys: SEQ_KEYS });
function slTf(rng) {
  const kind = rng.pick(['quot', 'quot', 'unb', 'cos', 'prod', 'mul', 'zero']);
  const T = (o) => tfItem({ skill: SL, level: 4, exam: { format: 'tf', points: 1 }, ...o });
  if (kind === 'quot') {
    return T({
      statement: 'Si (aₙ) et (bₙ) convergent et bₙ ≠ 0 pour tout n, alors (aₙ/bₙ) converge.', truth: false, key: 'quot', ruleIfTrue: 'a1_lim_quotient_bn_nonzero',
      counter: { kind: 'sequence', v: 'n', from: 1, seqs: ['a', 'b'], hyp: [{ p: 'converges', of: 'a', say: '(aₙ) converge' }, { p: 'converges', of: 'b', say: '(bₙ) converge' }], concl: { p: 'converges', of: 'a/b', say: '(aₙ/bₙ) converge' }, ask: [SEQ_ASK('a', 'aₙ ='), SEQ_ASK('b', 'bₙ =')], answer: { a: '1', b: '(-1)^n/n' } },
      explanation: 'Faux : la règle du quotient demande lim bₙ ≠ 0. aₙ = 1 et bₙ = (−1)ⁿ/n → 0 donnent aₙ/bₙ = (−1)ⁿ·n, sans limite.',
    });
  }
  if (kind === 'unb') {
    return T({
      statement: 'Si (aₙ) est à termes strictement positifs et n\'est pas majorée, alors aₙ → +∞.', truth: false, key: 'unb',
      counter: { kind: 'sequence', v: 'n', from: 1, hyp: [{ p: 'positive', say: 'la suite est à termes strictement positifs' }, { p: 'unbounded', say: 'la suite n\'est pas majorée' }], concl: { p: 'toInf' }, ask: [SEQ_ASK('a', 'aₙ =')], answer: { a: 'n(1+(-1)^n)+1' } },
      explanation: 'Faux : aₙ = n(1 + (−1)ⁿ) + 1 vaut 1 pour n impair et 2n + 1 pour n pair : elle n\'est pas majorée, mais ne tend pas vers +∞.',
    });
  }
  if (kind === 'cos') {
    return T({
      statement: 'Si bₙ = cos(aₙ) converge, alors (aₙ) converge.', truth: false, key: 'cos',
      counter: { kind: 'sequence', v: 'n', from: 1, hyp: [{ p: 'converges', of: 'cos(a)', say: 'cos(aₙ) converge' }], concl: { p: 'converges' }, ask: [SEQ_ASK('a', 'aₙ =')], answer: { a: '2πn' } },
      explanation: 'Faux : aₙ = 2πn → +∞, mais cos(aₙ) = 1 pour tout n.',
    });
  }
  if (kind === 'prod') {
    return T({
      statement: 'Si (aₙ) converge et (bₙ) est bornée, alors (aₙbₙ) converge.', truth: false, key: 'prod',
      counter: { kind: 'sequence', v: 'n', from: 1, seqs: ['a', 'b'], hyp: [{ p: 'converges', of: 'a', say: '(aₙ) converge' }, { p: 'bounded', of: 'b', say: '(bₙ) est bornée' }], concl: { p: 'converges', of: 'a×b', say: '(aₙbₙ) converge' }, ask: [SEQ_ASK('a', 'aₙ ='), SEQ_ASK('b', 'bₙ =')], answer: { a: '1', b: '(-1)^n' } },
      explanation: 'Faux : aₙ = 1 et bₙ = (−1)ⁿ. C\'est vrai seulement si aₙ → 0.',
    });
  }
  if (kind === 'mul') {
    const a = rng.int(-4, 5);
    const b = rng.int(2, 6);
    return T({ statement: `Si aₙ → ${frT(a)} et bₙ → ${b}, alors aₙbₙ → ${frT(a * b)}.`, truth: true, key: `mul:${a}:${b}`, explanation: 'Vrai : la limite d\'un produit de suites convergentes est le produit des limites.' });
  }
  return T({ statement: 'Si aₙ → 0 et (bₙ) est bornée, alors aₙbₙ → 0.', truth: true, key: 'zero', explanation: 'Vrai : |aₙbₙ| ≤ M·|aₙ| → 0 (gendarmes).' });
}

function seqLimits(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return slMcq(rng, 4, opts);
  if (opts.exam === 'tf') return slTf(rng);
  if (level === 5 && rng.chance(0.5)) return asLevel5(slMcq(rng, 5, opts), opts);
  return slLines(level, rng, opts);
}

export const GEN = { [ED]: epsDef, [EN]: epsN, [SL]: seqLimits };
