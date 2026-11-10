// Generators of module A1, part j (step U4): a1-fn-epsdelta-def (the ε-δ
// definition: a choice for one hole, blocks, then tokens judged by
// `logic`) and a1-fn-epsdelta (|f(x) − L| written with |x − x₀| by
// `equiv`, a bound under |x − x₀| ≤ 1 by `equiv` with rel '≤', then δ(ε)
// by the judge `delta`; level 5 and the exam: a problem, definition +
// proof + conclusion, 4 points). Catalogue: docs/universite/A1-analyse-1.md.

import { MT, FM, linesItem, mcq, tfItem, tokensItem, blocksItem } from './kit.js';
import { problemItem } from './kit-problem.js';
import {
  V, KEYS, fq, kx, xc, sc, poly2, rd, modeOf, H, E, examOf, uniqOptions, blanked, vfMcq, assemble,
} from './analyse1-j-kit.js';

const swapED = (t) => t.replace(/[εδ]/g, (c) => (c === 'ε' ? 'δ' : 'ε'));
const NEG = { '≤': '>', '<': '≥', '≥': '<', '>': '≤' };
// The negation of an atom by the table (only the last relation of a chain).
const negAtom = (t) => {
  const i = Math.max(...Object.keys(NEG).map((op) => t.lastIndexOf(op)));
  return i < 0 ? `¬(${t})` : t.slice(0, i) + NEG[t[i]] + t.slice(i + 1);
};

// ======================================================================
// a1-fn-epsdelta-def
// ======================================================================

const ED = 'a1-fn-epsdelta-def';

// Definitions: the three binds, the hypothesis on x and the conclusion.
function defs(x0 = 'x₀', L = 'L', fx = 'f(x)') {
  return {
    lim: { name: `lim<sub>x→${x0}</sub> f(x) = ${L}`, binds: ['ε > 0', 'δ > 0', 'x ∈ D'], p: `0 < |x − ${x0}| ≤ δ`, c: `|${fx} − ${L}| ≤ ε` },
    cont: { name: `f est continue en ${x0}`, binds: ['ε > 0', 'δ > 0', 'x ∈ D'], p: `|x − ${x0}| ≤ δ`, c: `|${fx} − f(${x0})| ≤ ε` },
    right: { name: `lim<sub>x→${x0}⁺</sub> f(x) = ${L}`, binds: ['ε > 0', 'δ > 0', 'x ∈ D'], p: `0 < x − ${x0} ≤ δ`, c: `|${fx} − ${L}| ≤ ε` },
    plusInf: { name: `lim<sub>x→${x0}</sub> f(x) = +∞`, binds: ['M > 0', 'δ > 0', 'x ∈ D'], p: `0 < |x − ${x0}| ≤ δ`, c: `${fx} ≥ M`, noSwap: true },
    atInf: { name: `lim<sub>x→+∞</sub> f(x) = ${L}`, binds: ['ε > 0', 'A > 0', 'x ∈ D'], p: 'x ≥ A', c: `|${fx} − ${L}| ≤ ε`, noSwap: true },
  };
}
const targetOf = (D) => `∀${D.binds[0]} ∃${D.binds[1]} ∀${D.binds[2]}, ${D.p} ⇒ ${D.c}`;
const negTargetOf = (D) => `∃${D.binds[0]} ∀${D.binds[1]} ∃${D.binds[2]}, ${D.p} ∧ ${negAtom(D.c)}`;

// Pieces: the binds and atoms, the swapped atoms (a1_epsdelta_swapped),
// and with neg the negated conclusion.
function piecesOf(D, { decoys = true, neg = false } = {}) {
  const texts = [...D.binds, D.p, D.c];
  if (neg) texts.push(negAtom(D.c));
  if (decoys && !D.noSwap) texts.push(swapED(D.p), swapED(D.c));
  if (decoys && D.noSwap) texts.push(D.p.includes('δ') ? D.p.replace('δ', 'M') : 'x ≥ ε');
  return [...new Set(texts)].map((text) => ({ text }));
}

const ED_HINTS = (D) => H(
  'Même structure que pour les suites : ε d\'abord, puis δ, puis tous les x assez proches de x₀.',
  `∀${D.binds[0]} ∃${D.binds[1]} ∀${D.binds[2]}, ${D.p.replace(/δ$/, '▢')} ⇒ ${D.c.replace(/ε$/, '▢')}`,
  FM(targetOf(D), { pieces: piecesOf(D) }),
);

// Level 1: one hole of the formula, four pieces to choose from.
function edHole(level, rng) {
  const all = defs();
  const key = rng.pick(['lim', 'lim', 'cont', 'right']);
  const D = all[key];
  const hole = rng.pick(['p', 'c', 'q']);
  let shown;
  let options;
  if (hole === 'p') {
    shown = `∀${D.binds[0]} ∃${D.binds[1]} ∀${D.binds[2]}, ▢ ⇒ ${D.c}`;
    options = [
      { html: D.p, correct: true },
      { html: swapED(D.p), correct: false, rule: 'a1_epsdelta_swapped' },
      { html: key === 'cont' ? '0 < |x − x₀| ≤ ε' : '|x − x₀| ≥ δ', correct: false },
      { html: swapED(D.c), correct: false, rule: 'a1_epsdelta_swapped' },
    ];
  } else if (hole === 'c') {
    shown = `∀${D.binds[0]} ∃${D.binds[1]} ∀${D.binds[2]}, ${D.p} ⇒ ▢`;
    options = [
      { html: D.c, correct: true },
      { html: swapED(D.c), correct: false, rule: 'a1_epsdelta_swapped' },
      { html: D.c.replace('≤', '≥'), correct: false },
      { html: swapED(D.p), correct: false, rule: 'a1_epsdelta_swapped' },
    ];
  } else {
    shown = `∀${D.binds[0]} ▢ ∀${D.binds[2]}, ${D.p} ⇒ ${D.c}`;
    options = [
      { html: `∃${D.binds[1]}`, correct: true },
      { html: `∀${D.binds[1]}`, correct: false, rule: 'g9_quant_order' },
      { html: '∃δ = ε', correct: false },
      { html: '∃x ∈ D', correct: false },
    ];
  }
  return mcq({
    skill: ED, level, prompt: `Complète la définition de « ${D.name} » :<br>${shown}`, options: uniqOptions(options),
    key: `hole:${key}:${hole}`, expectedSec: 60,
    solution: [{ html: targetOf(D), note: D.name }],
  }, rng);
}

// Levels 2 and 3: the definition in blocks (decoys at level 3).
function edBlocks(level, rng) {
  const all = defs();
  const key = rng.pick(['lim', 'cont', 'right']);
  const D = all[key];
  const blocks = [
    { id: 'q0', html: `∀${D.binds[0]}`, needs: [] },
    { id: 'q1', html: `∃${D.binds[1]}`, needs: ['q0'], orderRule: 'g9_quant_order', earlyWhy: 'Pas encore : δ se choisit après ε, il dépend de ε.' },
    { id: 'q2', html: `∀${D.binds[2]} :`, needs: ['q1'], earlyWhy: 'Pas encore : x vient après δ, qui ne dépend pas de x.' },
    { id: 'p', html: D.p, needs: ['q2'], earlyWhy: 'Place d\'abord les quantificateurs.' },
    { id: 'c', html: `⇒ ${D.c}`, needs: ['p'], earlyWhy: 'D\'abord la condition sur x.' },
  ];
  if (level >= 3) {
    blocks.push(
      { id: 'x1', html: swapED(D.p), needs: [], distractor: 'a1_epsdelta_swapped', why: 'δ mesure l\'écart des x : |x − x₀| ≤ δ, pas ε.' },
      { id: 'x2', html: `⇒ ${swapED(D.c)}`, needs: [], distractor: 'a1_epsdelta_swapped', why: 'ε mesure l\'écart des valeurs : |f(x) − …| ≤ ε.' },
    );
  }
  return blocksItem({
    skill: ED, level, mode: 'define',
    prompt: `Construis la définition de « ${D.name} ». Touche les blocs dans l'ordre.`,
    blocks: rng.shuffle(blocks), goal: 'c', order: ['q0', 'q1', 'q2', 'p', 'c'],
    hints: ED_HINTS(D),
    subgoals: [{ id: 'def', label: 'définition', skill: ED }, { id: 'q', label: 'quantificateurs', skill: 'g9-quant-write' }],
    key: `${key}:${level}`,
  });
}

// Levels 4 and 5 (and the exam): the formula in tokens; level 5 the
// negation or a definition with +∞.
function edTokens(level, rng, opts = {}) {
  const all = defs();
  const neg = level === 5 && rng.chance(0.5);
  const key = level === 5 ? (neg ? rng.pick(['cont', 'lim']) : rng.pick(['plusInf', 'atInf'])) : rng.pick(['lim', 'cont', 'right', opts.exam ? 'lim' : 'plusInf']);
  const D = all[key];
  const pieces = piecesOf(D, { neg });
  const cfg = { pieces };
  const target = neg ? negTargetOf(D) : targetOf(D);
  const shown = FM(target, cfg);
  return tokensItem({
    skill: ED, level,
    prompt: neg ? `Écris avec des quantificateurs : « ${D.name.startsWith('f est') ? D.name.replace('est', 'n\'est pas') : `f ne tend pas vers ${D.name.split(' = ')[1]} quand x → x₀`} ».`
      : `Écris la définition de « ${D.name} » avec des quantificateurs.`,
    pieces, target, start: neg ? `¬(${targetOf(D)})` : target,
    hints: ED_HINTS(D),
    noHints: level === 5 || !!opts.exam,
    baits: ['g9_quant_order', ...(D.noSwap ? [] : ['a1_epsdelta_swapped'])],
    solution: [{ html: shown, note: D.name }],
    key: `${key}:${neg ? 'neg' : 'def'}:${level}`,
    exam: opts.exam ? { format: opts.exam, points: 1 } : false,
    expectedSec: 120,
  });
}

function edTf(rng) {
  const kind = rng.pick(['swap', 'hole', 'dep']);
  const ex = { format: 'tf', points: 1 };
  if (kind === 'swap') {
    return vfMcq(ED, 'f est continue en x₀ ⇔ ∃δ > 0 ∀ε > 0 : |x − x₀| ≤ δ ⇒ |f(x) − f(x₀)| ≤ ε.', false, 'g9_quant_order',
      'Faux : avec ∃δ ∀ε, f doit valoir f(x₀) sur tout [x₀ − δ ; x₀ + δ] (ε aussi petit qu\'on veut) : seules les fonctions constantes près de x₀ le vérifient. f(x) = x est continue et ne le vérifie pas.', rng, 'swap');
  }
  if (kind === 'hole') {
    return tfItem({
      skill: ED, level: 4, truth: false, key: 'hole', exam: ex, expectedSec: 60,
      statement: 'Si lim<sub>x→0</sub> f(x) = L existe, alors f(0) = L.',
      counter: {
        kind: 'function', hyp: [{ p: 'limitAt', at: '0' }], concl: { p: 'continuousAt', at: '0', say: 'f est définie en 0 et f(0) vaut la limite' },
        ask: [{ v: 'f', label: 'f(x) =', keys: ['calcx', 'calcfn'] }], answer: { f: 'sin(x)/x' },
      },
      explanation: 'Faux : la définition de la limite ne regarde que 0 < |x − x₀| ≤ δ, pas x₀ lui-même. sin(x)/x → 1, mais f n\'est pas définie en 0.',
    });
  }
  return tfItem({
    skill: ED, level: 4, truth: true, key: 'dep', exam: ex, expectedSec: 60, ruleIfFalse: 'a1_delta_depends_on_x',
    statement: 'Dans la définition de lim<sub>x→x₀</sub> f(x) = L, δ peut dépendre de ε et de x₀, mais pas de x.',
    explanation: 'Vrai : δ est choisi (∃δ) avant que x soit pris (∀x) : il ne peut pas dépendre de x.',
  });
}

function edItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return edTf(rng);
  if (opts.exam === 'open') return edTokens(4, rng, opts);
  if (level === 1) return edHole(1, rng);
  if (level <= 3) return edBlocks(level, rng);
  return edTokens(level, rng);
}

// ======================================================================
// a1-fn-epsdelta
// ======================================================================

const EP = 'a1-fn-epsdelta';
const EP_SUB = [
  { id: 'gap', label: 'écrire l\'écart', skill: EP },
  { id: 'bound', label: 'majorer', skill: 'g1-bound' },
  { id: 'delta', label: 'δ(ε)', skill: EP },
];
const EP_CHOICES = [
  { id: 'gap', label: 'Écrire l\'écart |f(x) − L|' },
  { id: 'factor', label: 'Faire apparaître |x − x₀|' },
  { id: 'bound', label: 'Majorer l\'autre facteur pour |x − x₀| ≤ 1' },
  { id: 'choose', label: 'Choisir δ' },
  { id: 'inv', label: 'Prendre δ = (facteur)·ε', rule: 'a1_delta_inverted', why: 'Il faut facteur·δ ≤ ε : on divise ε par le facteur.' },
];

const absT = (t) => `abs(${t})`;
// f(x) − L, the sign of L folded in: f(x) + 9.
const fmL = (L) => (L < 0 ? `f(x) + ${-L}` : `f(x) − ${L}`);

// {kind, f, fShow, x0, L, gap: [lines], bound?: {start, lines, dom}, delta,
//  k, dep, M?, sayGap}
function epData(rng, kinds) {
  for (let i = 0; i < 200; i++) {
    const kind = rng.pick(kinds);
    if (kind === 'affine') {
      const a = rng.pick([-9, -8, -7, -6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7, 8, 9]);
      const b = rng.int(-9, 9);
      const x0 = rng.int(-4, 4);
      const L = a * x0 + b;
      const A = Math.abs(a);
      const f = rng.chance(0.5) && b !== 0 ? `${b}${a > 0 ? '+' : '-'}${kx(A)}` : `${kx(a)}${sc(b)}`;
      return {
        kind, f, x0, L, k: String(A), delta: `ε/${A}`, dep: null,
        start: absT(`(${f})${sc(-L)}`),
        gap: [
          { ...E(absT(`${kx(a)}${sc(b - L)}`), 'Réduire l\'écart', 'gap', 'gap'), holes: [sc(b - L).slice(1) || '0'] },
          { ...E(`${A}${absT(xc(-x0))}`, `Faire apparaître |x − x₀| = |${rd(xc(-x0))}|`, 'gap', 'factor'), holes: [String(A)] },
        ],
        goal: `${A}${absT(xc(-x0))}`,
        dLines: [{ ...E(`ε/${A}`, `${A}|x − x₀| ≤ ε dès que |x − x₀| ≤ ε/${A}`, 'delta', 'choose'), holes: [String(A)] }],
        why: `${A}·|${rd(xc(-x0))}| ≤ ε dès que |${rd(xc(-x0))}| ≤ ε/${A}`,
      };
    }
    if (kind === 'quad') {
      const x0 = rng.int(1, 4);
      const c = rng.int(-6, 6);
      if (c === -2 * x0 || c === -x0) continue;
      const L = x0 * x0 + c * x0;
      const m = Math.abs(2 * x0 + c);
      const M = m + 1;
      const other = xc(x0 + c);
      return {
        kind, f: poly2(c, 0), x0, L, k: String(M), delta: `min(1 ; ε/${M})`, dep: `ε/${absT(other)}`, M, other,
        start: absT(`${c === 0 ? 'x^2' : `(${poly2(c, 0)})`}${sc(-L)}`),
        gap: [
          { ...E(absT(`(${xc(-x0)})(${other})`), 'Factoriser : x₀ est une racine de f(x) − L', 'gap', 'factor'), holes: [other] },
          E(`${absT(xc(-x0))}×${absT(other)}`, 'Séparer les deux valeurs absolues', 'gap', 'factor'),
        ],
        goal: `${absT(xc(-x0))}×${absT(other)}`,
        bound: {
          start: absT(other), dom: [x0 - 1, x0 + 1],
          lines: [
            { ...E(`${absT(xc(-x0))}+${m}`, `${rd(other)} = (x − ${x0}) + ${2 * x0 + c < 0 ? `(${2 * x0 + c})` : 2 * x0 + c} : inégalité triangulaire`, 'bound', 'bound'), holes: [String(m)] },
            E(String(M), `|x − ${x0}| ≤ 1`, 'bound', 'bound'),
          ],
        },
        dLines: [{ ...E(`min(1 ; ε/${M})`, `|x − ${x0}| ≤ 1 et ${M}|x − ${x0}| ≤ ε`, 'delta', 'choose'), holes: [String(M)] }],
        why: `si |x − ${x0}| ≤ 1, |${fmL(L)}| ≤ ${M}·|x − ${x0}| ≤ ε dès que |x − ${x0}| ≤ ε/${M}`,
      };
    }
    const k = rng.int(1, 3);
    const x0 = k * k;
    return {
      kind: 'root', f: '√x', x0, L: k, k: `1/${k}`, delta: k === 1 ? 'ε' : `${k}ε`, dep: `ε(√x+${k})`,
      start: absT(`√x-${k}`), dom: [0.05, 2 * x0 + 4],
      gap: [{ ...E(`${absT(xc(-x0))}/(√x+${k})`, `Multiplier par le conjugué √x + ${k}`, 'gap', 'factor'), holes: [`√x+${k}`] }],
      goal: `${absT(xc(-x0))}/(√x+${k})`,
      dLines: [{ ...E(k === 1 ? 'ε' : `${k}ε`, `√x + ${k} ≥ ${k}, donc |√x − ${k}| ≤ |x − ${x0}|/${k} ≤ ε dès que |x − ${x0}| ≤ ${k === 1 ? '' : k}ε`, 'delta', 'choose'), holes: k === 1 ? [] : [String(k)] }],
      why: `√x + ${k} ≥ ${k}, donc |√x − ${k}| ≤ |x − ${x0}|/${k}`,
    };
  }
  return { ...epData({ pick: () => 'affine', int: (lo) => (lo === -9 ? 3 : -1), chance: () => true }, ['affine']), fallback: true };
}

const fShowOf = (d) => (d.kind === 'root' ? '√x' : d.f);
const limText = (d) => `lim<sub>x→${fq(d.x0)}</sub> ${MT(fShowOf(d))} = ${fq(d.L)}`;
const deltaCfg = (d) => ({
  kind: 'delta', mode: 'delta', f: d.kind === 'root' ? 'sqrt(x)' : d.f, a: String(d.x0), L: String(d.L), k: d.k,
  ...(d.dep ? { dep: d.dep } : {}), rules: { dependsOnVar: 'a1_delta_depends_on_x' },
});

function epParts(d, level, rng) {
  const hole = (l) => (l.holes?.length ? blanked(l, l.holes) : l);
  const gapCfg = { kind: 'equiv', vars: [V], target: 'goal', goal: d.goal, ...(d.dom ? { domain: { x: d.dom } } : {}) };
  let gap = d.gap;
  let dLines = d.dLines;
  if (level === 1) { gap = gap.map(hole); dLines = dLines.map(hole); }
  if (level === 2) gap = gap.map(hole);
  const parts = [{ start: d.start, judge: gapCfg, lines: gap, choices: EP_CHOICES }];
  if (d.bound) {
    const bLines = level <= 2 ? d.bound.lines.map(hole) : d.bound.lines;
    parts.push({
      html: `Impose |x − ${d.x0}| ≤ 1 et majore l'autre facteur ${MT(absT(d.other))}.`, start: d.bound.start,
      judge: { kind: 'equiv', vars: [V], rel: '≤', domain: { x: d.bound.dom } }, lines: bLines, choices: EP_CHOICES,
      pre: level <= 2 ? [{ kind: 'note', html: `Si |x − ${d.x0}| ≤ 1, alors x ∈ [${d.x0 - 1} ; ${d.x0 + 1}].` }] : [],
    });
  }
  const pre = [];
  if (level === 2) {
    const A = d.kind === 'quad' ? d.M : d.kind === 'root' ? null : Number(d.k);
    const options = [{ id: 'ok', label: `δ = ${d.delta}`, valid: true, ref: true }];
    if (d.kind === 'quad') options.push({ id: 'dep', label: `δ = ε/|${rd(d.other)}|`, valid: false, rule: 'a1_delta_depends_on_x', why: 'δ se choisit avant x : il ne peut pas dépendre de x. On a borné ce facteur justement pour ça.' });
    if (A) options.push({ id: 'inv', label: `δ = ${A}ε`, valid: false, rule: 'a1_delta_inverted', why: `Avec δ = ${A}ε, l'écart peut valoir ${A}·${A}ε. Il faut ${A}δ ≤ ε.` });
    if (d.kind === 'root') options.push({ id: 'dep', label: `δ = ε(√x + ${d.L})`, valid: false, rule: 'a1_delta_depends_on_x', why: 'δ ne peut pas dépendre de x : minore √x + ' + d.L + ' par ' + d.L + '.' });
    pre.push({ kind: 'decision', prompt: 'Quel δ choisir ?', options: rng.shuffle(options) });
  }
  parts.push({ html: 'Choisis δ en fonction de ε seulement.', ask: 'δ =', start: 'δ', judge: deltaCfg(d), lines: dLines, choices: EP_CHOICES, pre });
  return parts;
}

function epLines(level, rng, opts = {}) {
  const kinds = level <= 1 ? ['affine'] : level === 2 ? ['affine', 'quad'] : ['affine', 'quad', 'quad', ...(level >= 4 ? ['root'] : [])];
  const d = epData(rng, kinds);
  const as = assemble(epParts(d, level, rng), level);
  return linesItem({
    skill: EP, level,
    prompt: `Montre avec la définition que ${limText(d)}. Écris d'abord l'écart ${MT(d.start)} en fonction de |x − x₀|.`,
    ...as, mode: modeOf(level),
    hints: H(
      `Écris |${fmL(d.L)}| et fais apparaître |x − x₀| = ${MT(absT(xc(-d.x0)))}.${d.kind === 'quad' ? ' Pour l\'autre facteur, impose |x − x₀| ≤ 1.' : ''}`,
      `${MT(d.start)} = ${d.kind === 'root' ? `${MT(absT(xc(-d.x0)))}/□` : `□·${MT(absT(xc(-d.x0)))}`}`,
      `δ = ${d.delta} : ${d.why}.`,
    ),
    subgoals: EP_SUB, keys: [...KEYS, 'greek'], tapActions: level === 3 ? 'steps' : null,
    key: `${EP}:${d.kind}:${d.f}:${d.x0}:${level}`, exam: examOf(opts), fallback: !!d.fallback,
  });
}

// The definition of this limit in tokens (part 1 of the problem).
function epDefTokens(d) {
  const xm = rd(xc(-d.x0));
  const D = {
    binds: ['ε > 0', 'δ > 0', 'x ∈ ℝ'], p: `0 < |${xm}| ≤ δ`, c: `|${fmL(d.L)}| ≤ ε`,
  };
  const pieces = [...new Set([...D.binds, D.p, D.c, swapED(D.p), swapED(D.c)])].map((text) => ({ text }));
  const target = targetOf(D);
  return tokensItem({
    skill: EP, level: 5, prompt: `Écris avec des quantificateurs ce que veut dire ${limText(d)}.`,
    pieces, target, start: target, noHints: true, baits: ['g9_quant_order', 'a1_epsdelta_swapped'],
    solution: [{ html: FM(target, { pieces }), note: 'Définition' }], key: `${EP}:def:${d.f}:${d.x0}`, expectedSec: 90,
  });
}

function epConclusion(d, rng) {
  const xm = rd(xc(-d.x0));
  const dl = d.delta;
  const gap = fmL(d.L);
  return mcq({
    skill: EP, level: 5, prompt: 'Quelle conclusion ?', options: [
      { html: `Pour tout ε > 0, avec δ = ${dl} : si 0 < |${xm}| ≤ δ, alors |${gap}| ≤ ε. Donc la limite vaut ${fq(d.L)}.`, correct: true },
      { html: `Il existe δ > 0 tel que pour tout ε > 0 : si 0 < |${xm}| ≤ δ, alors |${gap}| ≤ ε.`, correct: false, rule: 'g9_quant_order' },
      { html: `Pour ε = 0,01, δ = ${dl.replace(/ε/g, '0,01')} convient : donc la limite vaut ${fq(d.L)}.`, correct: false, rule: 'g9_proof_by_example' },
      { html: `Pour tout x, il existe ε > 0 tel que |${gap}| ≤ ε.`, correct: false },
    ], key: `${EP}:concl:${d.f}:${d.x0}`, expectedSec: 60,
    solution: [{ html: `Pour tout ε > 0, δ = ${dl} convient.`, note: '' }],
  }, rng);
}

// Level 5 and the exam: definition (1), gap (1), δ (1), conclusion (1).
function epProblem(level, rng, opts = {}) {
  const d = epData(rng, ['affine', 'quad', 'root']);
  const as = assemble(epParts(d, 4, rng), 4);
  const lines = linesItem({
    skill: EP, level: 5, prompt: `Écris l'écart ${MT(d.start)} en fonction de |x − x₀|, puis choisis δ.`,
    ...as, mode: 'free', noHints: true, hints: [], subgoals: EP_SUB, keys: [...KEYS, 'greek'],
    key: `${EP}:proof:${d.kind}:${d.f}:${d.x0}`, fallback: !!d.fallback,
  });
  const nSeg = d.bound ? 3 : 2;
  return problemItem({
    skill: EP, level, prompt: `Montre avec la définition que ${limText(d)}.`,
    parts: [
      { item: epDefTokens(d), points: 1, title: 'Définition' },
      { item: lines, points: nSeg === 3 ? [0.5, 0.5, 1] : [1, 1], title: 'Écart et δ' },
      { item: epConclusion(d, rng), points: 1, title: 'Conclusion' },
    ],
    key: `${d.kind}:${d.f}:${d.x0}`, exam: opts.exam ? { format: 'open', points: 4 } : false, expectedSec: 600,
  });
}

function epTf(rng) {
  const kind = rng.pick(['dep', 'nomin', 'inv', 'ok']);
  const ex = { format: 'tf', points: 1 };
  if (kind === 'dep') {
    return vfMcq(EP, 'Pour prouver lim<sub>x→3</sub> x² = 9, δ = ε/|x + 3| convient.', false, 'a1_delta_depends_on_x',
      'Faux : δ est choisi avant x, il ne peut pas en dépendre. Avec |x − 3| ≤ 1, |x + 3| ≤ 7 : δ = min(1 ; ε/7).', rng, 'dep');
  }
  if (kind === 'nomin') {
    const x0 = rng.pick([2, 3]);
    const M = 2 * x0 + 1;
    return tfItem({
      skill: EP, level: 4, truth: false, key: `nomin:${x0}`, exam: ex, expectedSec: 90, ruleIfTrue: 'a1_delta_depends_on_x',
      statement: `Pour lim<sub>x→${x0}</sub> x² = ${x0 * x0}, δ = ε/${M} convient pour tout ε > 0.`,
      counter: {
        kind: 'refute', quants: [{ q: '∀', v: 'ε', dom: 'R+' }], pred: `(ε/${M})×(ε/${M}+${2 * x0})≤ε`,
        ask: [{ v: 'ε', label: 'ε =' }], answer: { 'ε': '20' },
      },
      explanation: `Faux : la borne |x + ${x0}| ≤ ${M} suppose |x − ${x0}| ≤ 1. Pour ε = 20, δ = 20/${M} > 1 et x = ${x0} + δ donne |x² − ${x0 * x0}| = δ(δ + ${2 * x0}) > 20. Il faut δ = min(1 ; ε/${M}).`,
    });
  }
  if (kind === 'inv') {
    const a = rng.pick([2, 3, 4, 5]);
    const b = rng.pick([-3, -1, 1, 2]);
    return tfItem({
      skill: EP, level: 4, truth: false, key: `inv:${a}:${b}`, exam: ex, expectedSec: 90, ruleIfTrue: 'a1_delta_inverted',
      statement: `Pour lim<sub>x→1</sub> (${a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)}) = ${fq(a + b)}, δ = ${a}ε convient pour tout ε > 0.`,
      counter: {
        kind: 'refute', quants: [{ q: '∀', v: 'ε', dom: 'R+' }], pred: `${a}×(${a}ε)≤ε`,
        ask: [{ v: 'ε', label: 'ε =' }], answer: { 'ε': '1' },
      },
      explanation: `Faux : |${fmL(a + b)}| = ${a}|x − 1| peut valoir ${a}·${a}ε > ε. Il faut δ = ε/${a}.`,
    });
  }
  const a = rng.pick([2, 3, 5]);
  return tfItem({
    skill: EP, level: 4, truth: true, key: `ok:${a}`, exam: ex, expectedSec: 60, ruleIfFalse: 'a1_delta_inverted',
    statement: `Pour lim<sub>x→2</sub> (${a}x − 1) = ${2 * a - 1}, δ = ε/${a} convient pour tout ε > 0.`,
    explanation: `Vrai : |f(x) − ${2 * a - 1}| = ${a}|x − 2| ≤ ${a}·ε/${a} = ε.`,
  });
}

function epItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return epTf(rng);
  if (opts.exam === 'open' || level === 5) return epProblem(level === 5 ? 5 : 4, rng, opts);
  return epLines(level, rng, opts);
}

export const GEN = { [ED]: edItem, [EP]: epItem };
