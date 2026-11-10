// f-ft-table (module F, part b, step U10): f̂ from the table and the
// properties. Forward templates: e^(−kx² + 2kax + c) (complete the square,
// translation, F8: the catalogue's example), e^(−w|x − a|) (F7), (x − a)
// e^(−k(x − a)²) (F9, 2016), the derivative −2kx e^(−kx²) = g′ (FP4),
// H(x − a)e^(−w(x − a)) (F3). Inverse templates (level 4): c/(α² + w²)
// (F7, on all of ℝ: |x|), e^(−w|α|) (F6), c/(w + iα) (F3: 0 for x < 0).
// One transform part per function; a line « ℱ(g) » names the table's
// function (no blanks there: the CAS does not read ℱ). The table is in
// every prompt.

import { examTag } from './kit.js';
import { partsItem } from './geo-kit.js';
import { problemItem } from './kit-problem.js';
import { H, ft, FML, mcqF, KEYS_FT, TABLE } from './fourier-b-kit.js';

const SK = 'f-ft-table';
const SUB = [
  { id: 'complete-square', label: 'compléter le carré', skill: 'quad-complete' },
  { id: 'rewrite', label: 'réécrire f avec une ligne de la table', skill: SK },
  { id: 'table', label: 'ligne de la table', skill: SK },
  { id: 'property', label: 'propriété (translation, dérivée…)', skill: SK },
];

// e^(c·iα) texts: the translation by a multiplies by e^(−iaα).
const shiftT = (a) => (a === 0 ? '' : a === 1 ? 'e^(-iα)' : a === -1 ? 'e^(iα)' : a > 0 ? `e^(-${a}iα)` : `e^(${-a}iα)`);
const xa = (a) => (a > 0 ? `(x-${a})` : `(x+${-a})`);
const sq = (k) => ({ 1: '√2', 2: '2', 3: '√6' }[k]);
const gaussF = (k) => `e^(-α^2/${4 * k})/${sq(k)}`;
// e^E as a factor.
const eE = (E) => (E === 0 ? '' : E === 1 ? 'e' : `e^${E < 0 ? `(${E})` : E}`);
const lineOpts = (rows) => rows;

// ---------- forward templates ----------

function square(rng) {
  const k = rng.pick([1, 2, 3]);
  const a = rng.pick([1, -1, 2, -2]);
  const c = rng.pick([1, 2, 3, 4, 5, 6, -1, -2]);
  const E = k * a * a + c;
  const expo = `-${k === 1 ? '' : k}x^2${2 * k * a > 0 ? '+' : ''}${2 * k * a}x${c > 0 ? '+' : ''}${c}`;
  const sqr = `-${k === 1 ? '' : k}${xa(a)}^2${E > 0 ? '+' : ''}${E === 0 ? '' : E}`;
  const g = `e^(-${k === 1 ? '' : k}x^2)`;
  const s = shiftT(a);
  return {
    id: `sq:${k}:${a}:${c}`, kind: 'square', table: 'F8',
    fHtml: FML(`f(x) = e^(${expo})`),
    f: `e^(${expo})`,
    F: `${eE(E)} ${s} ${gaussF(k)}`.trim(),
    pre: { start: expo, line: sqr, blank: [String(E)] },
    lines: [
      { math: `f(x) = ${eE(E)} e^(${sqr.replace(/[+-]\d+$/, '')})`.replace('=  e', '= e'), note: `f(x) = ${eE(E) || '1'}·g(x − ${a}), g(x) = e^(−${k === 1 ? '' : k}x²)`, subgoal: 'rewrite', blank: [xa(a)] },
      { math: `f̂(α) = ${eE(E)} ${s} ℱ(${g})`, note: `Translation de ${a} : facteur e^(−${a === 1 ? '' : a === -1 ? '(−1)' : a}iα)`.replace('e^(−(−1)iα)', 'e^(iα)'), subgoal: 'property' },
      { math: `f̂(α) = ${eE(E)} ${s} ${gaussF(k)}`, note: `Ligne F8 avec w² = ${k}`, subgoal: 'table', blank: [String(4 * k), sq(k)], blank2: [s || String(4 * k)] },
    ],
    traps: {
      f_ft_shift_sign: [`f̂(α) = ${eE(E)} ${shiftT(-a)} ${gaussF(k)}`, `f̂(α) = ${eE(E)} ${shiftT(-a)} ℱ(${g})`],
      f_ft_scale: [{ line: `f̂(α) = ${eE(E)} ${s} e^(-α^2/${4 * k * k})/(${k}√2)`, ctx: {} }],
    },
    hint1: 'Complète le carré dans l\'exposant, puis translation et ligne F8.',
    hint2: FML(`ℱ(${g})(α) = e^(-α^2/(4·${k}))/√(2·${k})`),
    wrong: `${eE(E)} ${shiftT(-a)} ${gaussF(k)}`, wrongRule: 'f_ft_shift_sign',
  };
}

function absShift(rng) {
  const w = rng.pick([1, 2, 3]);
  const a = rng.pick([1, -1, 2, -2]);
  const s = shiftT(a);
  const wa = `${w === 1 ? '' : w}abs${xa(a)}`;
  const g = `e^(-${w === 1 ? '' : w}abs(x))`;
  const val = `${w === 1 ? '' : w}√(2/π)/(α^2+${w * w})`;
  const sval = (sh) => `${w === 1 ? '' : w}${sh} √(2/π)/(α^2+${w * w})`;
  return {
    id: `abs:${w}:${a}`, kind: 'abs', table: 'F7',
    fHtml: FML(`f(x) = e^(-${wa})`),
    f: `e^(-${wa})`,
    F: sval(s),
    lines: [
      { math: `f̂(α) = ${s} ℱ(${g})`, note: `f(x) = g(x − ${a}) : translation`, subgoal: 'property' },
      { math: `f̂(α) = ${sval(s)}`, note: `Ligne F7 : e^(−${w === 1 ? '' : w}|y|) = ${w === 1 ? '' : w}·e^(−|${w === 1 ? '' : w}y|)/${w}`, subgoal: 'table', blank: [String(w * w)], blank2: [s] },
    ],
    traps: {
      f_ft_shift_sign: [`f̂(α) = ${sval(shiftT(-a))}`],
      f_table_line: [{ line: `f̂(α) = ${s} 1/(√(2π)(${w}+iα))`, ctx: { got: `1/(√(2π)(${w} + iα))`, want: 'F7' } }],
    },
    hint1: 'Translation, puis la ligne F7 (attention au facteur 1/|w|).',
    hint2: FML(`ℱ(${g})(α) = ${val}`),
    wrong: `${s} 1/(√(2π)(${w}+iα))`, wrongRule: 'f_table_line',
  };
}

function gaussX(rng) {
  const k = rng.pick([1, 2]);
  const a = rng.pick([1, -1, 2]);
  const s = shiftT(a);
  const val = k === 1 ? '-iα e^(-α^2/4)/(2√2)' : '-iα e^(-α^2/8)/8';
  return {
    id: `gx:${k}:${a}`, kind: 'gx', table: 'F9',
    fHtml: FML(`f(x) = ${xa(a)} e^(-${k === 1 ? '' : k}${xa(a)}^2)`),
    f: `${xa(a)}e^(-${k === 1 ? '' : k}${xa(a)}^2)`,
    F: `${s} (${val})`,
    lines: [
      { math: `f̂(α) = ${s} ℱ(x e^(-${k === 1 ? '' : k}x^2))`, note: 'Translation', subgoal: 'property' },
      { math: `f̂(α) = ${s} (${val})`, note: `Ligne F9 avec w² = ${k}`, subgoal: 'table', blank: [k === 1 ? '2√2' : '8'], blank2: [s] },
    ],
    traps: { f_ft_shift_sign: [`f̂(α) = ${shiftT(-a)} (${val})`] },
    hint1: 'Translation, puis la ligne F9 : y e^(−w²y²).',
    hint2: FML(`ℱ(x e^(-${k === 1 ? '' : k}x^2)) = ${val}`),
    wrong: `${shiftT(-a)} (${val})`, wrongRule: 'f_ft_shift_sign',
  };
}

function deriv(rng) {
  const k = rng.pick([1, 2, 3]);
  const g = `e^(-${k === 1 ? '' : k}x^2)`;
  return {
    id: `der:${k}`, kind: 'deriv', table: 'F8',
    fHtml: `${FML(`f(x) = -${2 * k}x e^(-${k === 1 ? '' : k}x^2)`)} (remarque : f = g′ avec g(x) = ${FML(g)})`,
    f: `-${2 * k}x e^(-${k === 1 ? '' : k}x^2)`,
    F: `iα ${gaussF(k)}`,
    lines: [
      { math: `f̂(α) = iα ℱ(${g})`, note: 'FP4 : ℱ(g′) = iα ĝ', subgoal: 'property' },
      { math: `f̂(α) = iα ${gaussF(k)}`, note: `Ligne F8 avec w² = ${k}`, subgoal: 'table', blank: [String(4 * k), sq(k)], blank2: ['iα'] },
    ],
    traps: { f_ft_deriv_sign: [`f̂(α) = -iα ${gaussF(k)}`, `f̂(α) = -iα ℱ(${g})`] },
    hint1: 'f = g′ : ℱ(g′) = iα ĝ (FP4), puis la ligne F8.',
    hint2: FML(`ℱ(${g}) = ${gaussF(k)}`),
    wrong: `-iα ${gaussF(k)}`, wrongRule: 'f_ft_deriv_sign',
  };
}

function halfShift(rng) {
  const w = rng.pick([1, 2, 3]);
  const a = rng.pick([1, 2, -1]);
  const s = shiftT(a);
  return {
    id: `half:${w}:${a}`, kind: 'half', table: 'F3',
    fHtml: `f(x) = ${FML(`e^(-${w === 1 ? '' : w}${xa(a)})`)} si x &gt; ${a}, 0 sinon`,
    f: `H${xa(a)}e^(-${w === 1 ? '' : w}${xa(a)})`,
    F: `${s}/(√(2π)(${w}+iα))`,
    lines: [
      { math: `f̂(α) = ${s} ℱ(H(x)e^(-${w === 1 ? '' : w}x))`, note: 'Translation', subgoal: 'property' },
      { math: `f̂(α) = ${s}/(√(2π)(${w}+iα))`, note: `Ligne F3 avec w = ${w}`, subgoal: 'table', blank: [String(w)], blank2: [String(w)] },
    ],
    traps: {
      f_ft_shift_sign: [`f̂(α) = ${shiftT(-a)}/(√(2π)(${w}+iα))`],
      f_table_line: [{ line: `f̂(α) = ${s} √(2/π)/(α^2+${w * w})`, ctx: { want: 'F3' } }],
    },
    hint1: 'Translation, puis la ligne F3 (fonction nulle pour y &lt; 0).',
    hint2: FML(`ℱ(H(x)e^(-${w === 1 ? '' : w}x)) = 1/(√(2π)(${w}+iα))`),
    wrong: `${shiftT(-a)}/(√(2π)(${w}+iα))`, wrongRule: 'f_ft_shift_sign',
  };
}

// ---------- inverse templates ----------

function invF7(rng) {
  const w = rng.pick([1, 2, 3]);
  const c = rng.pick([1, 2, 3]);
  const k = `${c === 1 ? '' : c}√(π/2)`;
  const ans = `${k} e^(-${w === 1 ? '' : w}abs(x))/${w}`.replace('/1', '');
  return {
    id: `iF7:${w}:${c}`, kind: 'inv', table: 'F7', dir: 'inverse',
    fHtml: `f̂(α) = ${FML(`${c}/(α^2+${w * w})`)}`,
    f: ans, F: `${c}/(α^2+${w * w})`,
    lines: [
      { math: `f̂(α) = ${k} · √(2/π)/(α^2+${w * w})`, note: 'Faire apparaître la ligne F7', subgoal: 'rewrite', blank: ['√(π/2)'] },
      { math: `f(x) = ${ans}`, note: `F7 avec w = ${w}, sur tout ℝ`, subgoal: 'table', blank: [String(w)], blank2: ['abs(x)'] },
    ],
    traps: { f_abs_dropped: [`f(x) = ${ans.replace('abs(x)', 'x')}`] },
    hint1: 'Écris f̂ comme une constante fois √(2/π)/(α² + w²) : c\'est la ligne F7.',
    hint2: FML(`${c}/(α^2+${w * w}) = ${k}·√(2/π)/(α^2+${w * w})`),
    wrong: `f(x) = ${ans.replace('abs(x)', 'x')}`, wrongRule: 'f_abs_dropped',
  };
}

function invF6(rng) {
  const w = rng.pick([1, 2, 3]);
  const ans = `${w === 1 ? '' : w}√(2/π)/(x^2+${w * w})`;
  return {
    id: `iF6:${w}`, kind: 'inv', table: 'F6', dir: 'inverse',
    fHtml: `f̂(α) = ${FML(`e^(-${w === 1 ? '' : w}abs(α))`)}`,
    f: ans, F: `e^(-${w === 1 ? '' : w}abs(α))`,
    lines: [
      { math: `f̂(α) = ${w === 1 ? '' : w}√(2/π) · √(π/2) e^(-${w === 1 ? '' : w}abs(α))/${w}`.replace('/1', ''), note: 'Faire apparaître la ligne F6', subgoal: 'rewrite', blank: ['√(2/π)'] },
      { math: `f(x) = ${ans}`, note: `F6 avec w = ${w}`, subgoal: 'table', blank: [String(w * w)], blank2: [String(w * w)] },
    ],
    traps: { f_table_line: [{ line: `f(x) = e^(-${w === 1 ? '' : w}abs(x))`, ctx: { want: 'F6' } }] },
    hint1: 'La ligne F6 a une exponentielle de |α| à droite : 1/(y² + w²) ↦ √(π/2) e^(−|wα|)/|w|.',
    hint2: FML(`e^(-${w === 1 ? '' : w}abs(α)) = ${w === 1 ? '' : w}√(2/π)·√(π/2)e^(-${w === 1 ? '' : w}abs(α))/${w}`.replace('/1)', ')')),
    wrong: `f(x) = √(2/π)/(x^2+${w * w})`, wrongRule: 'f_table_line',
  };
}

function invF3(rng) {
  const w = rng.pick([1, 2, 3]);
  const c = rng.pick([1, 2]);
  const ans = `${c === 1 ? '' : c}√(2π) H(x)e^(-${w === 1 ? '' : w}x)`;
  return {
    id: `iF3:${w}:${c}`, kind: 'inv', table: 'F3', dir: 'inverse',
    fHtml: `f̂(α) = ${FML(`${c}/(${w}+iα)`)}`,
    f: ans, F: `${c}/(${w}+iα)`,
    lines: [
      { math: `f̂(α) = ${c === 1 ? '' : c}√(2π) · 1/(√(2π)(${w}+iα))`, note: 'Faire apparaître la ligne F3', subgoal: 'rewrite', blank: ['√(2π)'] },
      { math: `f(x) = ${ans}`, note: `F3 avec w = ${w} : nulle pour x < 0`, subgoal: 'table', blank: ['H(x)'], blank2: ['H(x)'] },
    ],
    traps: { f_table_half_line: [`f(x) = ${ans.replace('H(x)', '')}`] },
    hint1: 'La ligne F3 : e^(−wy) si y > 0, 0 sinon. Écris les deux cas (H(x) = 1 si x > 0, 0 sinon).',
    hint2: FML(`${c}/(${w}+iα) = ${c === 1 ? '' : c}√(2π)·1/(√(2π)(${w}+iα))`),
    wrong: `f(x) = ${ans.replace('H(x)', '')}`, wrongRule: 'f_table_half_line',
  };
}

const FORWARD = [square, square, absShift, gaussX, deriv, halfShift];
const INVERSE = [invF7, invF6, invF3];
const lineChoice = (d) => {
  const rows = ['F3', 'F6', 'F7', 'F8', 'F9'].filter((r) => r !== d.table);
  const near = { F8: ['F9', 'F7'], F7: ['F3', 'F6'], F9: ['F8', 'F10'], F3: ['F7', 'F4'], F6: ['F7', 'F10'] }[d.table] || rows.slice(0, 2);
  return lineOpts({
    kind: 'decision', prompt: 'Quelle ligne de la table ?', options: [
      { id: d.table, label: `Ligne ${d.table}`, valid: true, ref: true },
      ...near.map((r) => ({ id: r, label: `Ligne ${r}`, valid: false, rule: 'f_table_line', why: `La ligne ${r} ne décrit pas cette fonction : regarde la forme exacte (|y|, y > 0, y², w²).` })),
    ],
  });
};

function tableParts(d, level) {
  const judge = ft({ f: d.f, F: d.F, dir: d.dir || 'forward', traps: d.traps });
  const parts = [];
  if (d.pre) {
    parts.push({
      html: '', start: d.pre.start, judge: { kind: 'equiv', vars: ['x'], domain: { x: [-2, 2] }, target: 'any' },
      menu: [{ id: 'square', label: 'Compléter le carré', valid: true }, { id: 'table', label: 'Lire la table', valid: false, why: 'Aucune ligne n\'a cette forme : complète d\'abord le carré.' }, { id: 'deriv', label: 'Dériver', valid: false, why: 'Rien à dériver ici.' }],
      lines: [{ math: d.pre.line, note: 'Compléter le carré', subgoal: 'complete-square', blank: d.pre.blank }],
    });
  }
  parts.push({
    html: d.pre ? 'Donc :' : '', ask: d.pre ? 'Transforme f.' : undefined, start: `${d.dir === 'inverse' ? 'f̂(α)' : 'f(x)'} = ${d.dir === 'inverse' ? d.F : d.f}`, judge,
    decisions: level >= 2 ? [{ ...lineChoice(d), levels: [2, 3, 4, 5] }] : [],
    notes: level === 1 ? [`Ligne ${d.table} de la table.`] : [],
    menu: [
      { id: 'table', label: `Utiliser la table et ${d.dir === 'inverse' ? 'reconnaître une ligne' : 'une propriété'}`, valid: true },
      { id: 'direct', label: 'Calculer l\'intégrale de la définition', valid: false, why: 'Inutile : la table et les propriétés donnent la transformée sans intégrer.' },
      { id: 'parity', label: 'Utiliser la parité', valid: false, why: d.kind === 'abs' || d.kind === 'square' ? 'f n\'est pas paire : son centre est déplacé.' : 'Ce n\'est pas le chemin le plus court ici.' },
    ],
    lines: d.lines,
  });
  return parts;
}

export function tableLines(level, rng, opts = {}, d = null) {
  const data = d || (level >= 4 && !opts.exam && rng.chance(0.4) ? rng.pick(INVERSE)(rng) : rng.pick(FORWARD)(rng));
  const ask = data.dir === 'inverse' ? `Trouve f telle que ${data.fHtml} (f définie sur tout ℝ).` : `Calcule la transformée de Fourier de ${data.fHtml}.`;
  return partsItem({
    skill: SK, level, parts: tableParts(data, level),
    prompt: `${ask}${TABLE()}`,
    hints: H(data.hint1, data.hint2, FML(data.lines[data.lines.length - 1].math)),
    subgoals: SUB, keys: KEYS_FT, key: `${SK}:${level}:${data.id}`, exam: examTag(opts), noHints: level >= 5 || !!opts.exam,
  });
}

// ---------- problems: two functions (2016, 2017, 2019) ----------

function tableProblem(level, rng, opts = {}) {
  const a = square(rng);
  const b = rng.pick([gaussX, deriv, absShift, halfShift])(rng);
  const two = level === 5 || rng.chance(0.5);
  const items = (two ? [a, b] : [rng.pick([a, b])]).map((d) => tableLines(5, rng, {}, d));
  const pts = (it) => (it.key.includes(':sq:') ? 4 : 3);
  return problemItem({
    skill: SK, level,
    prompt: `Calcule la transformée de Fourier de chaque fonction, avec la table et les propriétés.${TABLE()}`,
    parts: items.map((it, i) => ({ item: it, points: pts(it), title: `Fonction ${i + 1}` })),
    key: `${items.map((it) => it.key).join('+')}`, exam: opts.exam ? { format: 'open', points: items.reduce((s, it) => s + pts(it), 0) } : false,
  });
}

// ---------- multiple choice: ℱ(g ∗ h)(0) (série de révision) ----------

function mcqVariant(level, rng, opts) {
  const a = rng.pick([1, 2, 3]);
  const b = rng.pick([1, 2, 3, 4].filter((x) => x !== a));
  const ab = a * b;
  const right = [FML(`ℱ(g∗h)(0) = 2√2/(${ab}√π)`), FML(`ℱ(g∗h)(0) = 4/(${ab}√(2π))`), FML(`ĝ(α) = ${b === 1 ? '' : b}√(2/π)/(α^2+${b * b})`)];
  const wrongs = [
    { html: FML(`ℱ(g∗h)(0) = 2/(${ab}π)`), rule: 'f_sqrt2pi_conv' },
    { html: FML(`ℱ(g∗h)(0) = 1/(${ab}√(2π))`), rule: 'f_table_line' },
    { html: FML(`ĝ(α) = √(2/π)/(α^2+${b * b})`), rule: 'f_table_line' },
    { html: FML(`ĝ(α) = ${b === 1 ? '' : b}/(α^2+${b * b})`), rule: 'f_ft_norm' },
  ];
  return mcqF({
    skill: SK, level, exam: examTag(opts), key: `${SK}:mcq:${a}:${b}`,
    prompt: `Soit g(x) = ${FML(`e^(-${b === 1 ? '' : b}abs(x))`)} et h(x) = ${FML(`e^(-${a === 1 ? '' : a}abs(x))`)}. ${opts.exam ? 'Cochez les égalités vraies.' : 'Quelle égalité est vraie ?'}${TABLE()}`,
    right: opts.exam ? rng.shuffle(right).slice(0, rng.pick([2, 3])) : [right[rng.pick([0, 2])]], wrongs: rng.shuffle(wrongs),
    solution: [{ html: `F7 : ĝ(α) = ${FML(`${b === 1 ? '' : b}√(2/π)/(α^2+${b * b})`)} ; ℱ(g ∗ h) = √(2π) ĝ ĥ, en 0 : √(2π)·(√(2/π)/${b})·(√(2/π)/${a}) = ${FML(`2√2/(${ab}√π)`)}.`, note: '' }],
    expectedSec: 150,
  }, rng);
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return mcqVariant(4, rng, opts);
    if (opts.exam === 'open') return tableProblem(4, rng, opts);
    if (level === 5) return tableProblem(5, rng, opts);
    return tableLines(level, rng, opts);
  },
};
