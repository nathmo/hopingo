// Generators of module A1, part k (step U4): the intermediate value
// theorem (a1-fn-ivt) and the image of an interval (a1-fn-image).
// Catalogue: docs/universite/A1-analyse-1.md.
//
// a1-fn-ivt: blocks (`frame` when f(a), f(b) or f′ are typed, else
// `order`), the catalogue's scale: L1 frame given, f(a) and f(b) to type;
// L2 the auxiliary function and the interval chosen first (a decision);
// L3 blocks to order with 2 decoys; L4 3 decoys and the values typed, plus
// uniqueness by f′; L5 the same alone. Exam: tf (function counter-examples).
// a1-fn-image: lines in parts — f′ (equiv), zeros of f′ in the interval
// (solset on the interval), then the image: a solset part in y that starts
// at « min(f(a) ; f(c) ; f(b)) ≤ y ≤ max(…) » (f expanded by cfg.defs) and
// ends on the segment [m ; M]. L5 and exam: multiple choice; tf.

import { t } from '../../i18n.js';
import { MT, linesItem, mcq, tfItem, blocksItem, examTag } from './kit.js';
import { evalFloat } from '../../cas/numeric.js';
import { parse } from '../../cas/parse.js';
import { modeOf, H, E, SEG, blanked, stepMenus, RD, fr, uniqOptions, examMcq, tfTag } from './analyse1-k-kit.js';

const KEYS = ['calcx', 'calcfn', 'set'];
const val = (s) => evalFloat(parse(s), {});
const sup = (s) => RD(s);

// ======================================================================
// a1-fn-ivt
// ======================================================================

const IVT = 'a1-fn-ivt';
const IVT_SUB = [
  { id: 'hyp', label: t('hypothèses du TVI'), skill: IVT },
  { id: 'uniq', label: t('unicité par f′'), skill: 'a1-deriv-rules' },
];

// The equation and its proof: {kind, eq (html), f (name), def, a, b, A, B,
// cont, fa, fb (texts of the values), sa, sb ('<'|'>'), df?, why, wrong:
// [decision options], typed: values can be typed}.
function ivtData(rng, kinds) {
  const kind = rng.pick(kinds);
  if (kind === 'poly') {
    for (let i = 0; i < 200; i++) {
      const p = rng.pick([3, 5, 7]);
      const c = rng.int(1, 9);
      const d = rng.int(1, 9);
      if (1 + c - d <= 0) continue;
      const f = `x^${p}+${c === 1 ? '' : c}x-${d}`;
      const two = 2 ** p + 2 * c - d;
      return {
        kind, f, eq: `${MT(f)} = 0`, name: 'f', def: `f(x) = ${MT(f)}`, a: '0', b: '1', A: '0', B: '1',
        cont: t('f est continue sur [0 ; 1] (polynôme).'), fa: String(-d), fb: String(1 + c - d), sa: '<', sb: '>',
        df: `${p}x^${p - 1}+${c}`, dfWhy: t('f est strictement croissante'),
        wrong: [
          { id: 'w1', label: t('{n}(x) = {f} sur {I}', { n: 'f', f: RD(f), I: '[1 ; 2]' }), valid: false, why: t('f(1) = {a} et f(2) = {b} sont tous deux positifs : le TVI ne dit rien sur [1 ; 2].', { a: 1 + c - d, b: two }) },
          { id: 'w2', label: t('{n}(x) = {f} sur {I}', { n: 'g', f: RD(`x^${p}+${c === 1 ? '' : c}x`), I: '[0 ; 1]' }), valid: false, why: t('Les solutions de l\'équation sont les zéros de {f}, pas ceux de g : g(c) = 0 ne répond pas à la question.', { f: RD(f) }) },
        ],
        typed: true,
      };
    }
  }
  if (kind === 'cos') {
    const c = rng.pick([1, 2, 3]);
    const cx = c === 1 ? 'x' : `${c}x`;
    const h = `cos(x)-${cx}`;
    const B = c === 1 ? 'π/2' : c === 2 ? 'π' : `${c}π/2`;
    return {
      kind, f: h, eq: `${MT('cos(x)')} = ${MT(cx)}`, name: 'h', def: `h(x) = ${MT(h)} : cos c = ${fr(cx.replace('x', 'c'))} ⇔ h(c) = 0`, a: '0', b: 'π/2', A: '0', B: 'π/2',
      cont: t('h est continue sur [0 ; π/2] (somme de fonctions continues).'), fa: '1', fb: `-${B}`, sa: '>', sb: '<',
      df: `-sin(x)-${c}`, dfWhy: t('h est strictement décroissante'),
      wrong: [
        { id: 'w1', label: t('{n}(x) = {f} sur {I}', { n: 'h', f: RD(h), I: '[π/2 ; π]' }), valid: false, why: t('h(π/2) et h(π) sont tous deux négatifs : le TVI ne dit rien sur [π/2 ; π].') },
        { id: 'w2', label: t('{n}(x) = {f} sur {I}', { n: 'h', f: RD(`cos(x)+${cx}`), I: '[0 ; π/2]' }), valid: false, why: t('cos c = {c} ⇔ cos c − {c} = 0 : la fonction auxiliaire est la différence des deux membres.', { c: fr(cx.replace('x', 'c')) }) },
      ],
      typed: true,
    };
  }
  if (kind === 'exp') {
    const c = rng.pick([1, 2, 3]);
    const cx = c === 1 ? 'x' : `${c}x`;
    const h = `e^(-x)-${cx}`;
    return {
      kind, f: h, eq: `${MT('e^(-x)')} = ${MT(cx)}`, name: 'h', def: `h(x) = ${MT(h)}`, a: '0', b: '1', A: '0', B: '1',
      cont: t('h est continue sur [0 ; 1] (somme de fonctions continues).'), fa: '1', fb: `e^(-1)-${c}`, sa: '>', sb: '<',
      df: `-e^(-x)-${c}`, dfWhy: t('h est strictement décroissante'),
      wrong: [
        { id: 'w1', label: t('{n}(x) = {f} sur {I}', { n: 'h', f: RD(h), I: '[1 ; 2]' }), valid: false, why: t('h(1) et h(2) sont tous deux négatifs : le TVI ne dit rien sur [1 ; 2].') },
        { id: 'w2', label: t('{n}(x) = {f} sur {I}', { n: 'h', f: RD(`e^(-x)+${cx}`), I: '[0 ; 1]' }), valid: false, why: t('La fonction auxiliaire est la différence des deux membres : elle s\'annule exactement aux solutions.') },
      ],
      typed: true,
    };
  }
  if (kind === 'ln') {
    const c = rng.pick([2, 3, 4]);
    const h = `ln(x)+x-${c}`;
    return {
      kind, f: h, eq: `${MT('ln(x)')} = ${MT(`${c}-x`)}`, name: 'h', def: `h(x) = ${MT(h)}`, a: '1', b: String(c), A: '1', B: String(c),
      cont: t('h est continue sur [1 ; {c}] (ln est continue sur ]0 ; +∞[).', { c }), fa: String(1 - c), fb: `ln(${c})`, sa: '<', sb: '>',
      df: '1/x+1', dfWhy: t('h est strictement croissante'),
      wrong: [
        { id: 'w1', label: t('{n}(x) = {f} sur {I}', { n: 'h', f: RD(h), I: `[${c} ; ${c + 1}]` }), valid: false, why: t('h({a}) et h({b}) sont tous deux positifs : le TVI ne dit rien sur [{a} ; {b}].', { a: c, b: c + 1 }) },
        { id: 'w2', label: t('{n}(x) = {f} sur {I}', { n: 'h', f: RD(h), I: `[0 ; ${c}]` }), valid: false, why: t('h n\'est pas définie en 0 (ln 0 n\'existe pas) : il faut un segment où h est continue.') },
      ],
      typed: true,
    };
  }
  if (kind === 'fixed') {
    const [al, be] = rng.pick([[-2, 20], [-1, 3], [-5, 2], [0, 4], [-3, 1]]);
    return {
      kind, f: 'f(x)-x', eq: '', name: 'g', a: '0', b: '1', A: '0', B: '1',
      stmt: t('Soit f : [{a} ; {b}] → [0 ; 1] continue. Montre qu\'il existe x ∈ [0 ; 1] tel que f(x) = x.', { a: fr(al), b: be }),
      def: t('g(x) = f(x) − x, définie sur [{a} ; {b}], qui contient [0 ; 1] : f(x) = x ⇔ g(x) = 0', { a: fr(al), b: be }),
      cont: t('g est continue sur [0 ; 1] (différence de deux fonctions continues).'),
      faHtml: t('g(0) = f(0) ≥ 0, car f(0) ∈ [0 ; 1]'), fbHtml: t('g(1) = f(1) − 1 ≤ 0, car f(1) ≤ 1'),
      conclHtml: t('Par le TVI (si g(0) = 0 ou g(1) = 0, c\'est déjà fini), g s\'annule sur [0 ; 1] : il existe x ∈ [0 ; 1] tel que f(x) = x.'),
      typed: false,
    };
  }
  // An odd-degree polynomial: limits at ±∞.
  const b = rng.int(-4, 4);
  const c = rng.int(-6, 6);
  const d = rng.int(-9, 9);
  const P = `x^3${b ? `${b > 0 ? '+' : ''}${b === 1 ? '' : b === -1 ? '-' : b}x^2` : ''}${c ? `${c > 0 ? '+' : ''}${c === 1 ? '' : c === -1 ? '-' : c}x` : ''}${d ? `${d > 0 ? '+' : ''}${d}` : ''}`;
  return {
    kind: 'odd', f: P, eq: '', name: 'P', a: 'a', b: 'b', A: 'a', B: 'b',
    stmt: t('Montre que l\'équation {P} = 0 a au moins une solution réelle.', { P: MT(P) }),
    def: t('P(x) = {P}, polynôme de degré 3 (impair)', { P: MT(P) }),
    cont: t('P est continue sur ℝ (polynôme).'),
    faHtml: t('lim_{x→−∞} P(x) = −∞ : il existe a avec P(a) < 0'), fbHtml: t('lim_{x→+∞} P(x) = +∞ : il existe b > a avec P(b) > 0'),
    conclHtml: t('Par le TVI sur [a ; b], P s\'annule : l\'équation a une solution réelle.'),
    typed: false,
  };
}

const DECOYS = (d) => [
  { id: 'x0', html: t('{n}({a}) et {n}({b}) sont de signes contraires, donc {n} s\'annule : pas besoin de continuité.', { n: d.name, a: fr(d.A), b: fr(d.B) }), distractor: 'a1_ivt_no_continuity', why: t('Sans continuité, {n} peut sauter par-dessus 0 : 1/(x − 1/2) change de signe sur [0 ; 1] sans s\'annuler.', { n: d.name }) },
  { id: 'x1', html: t('On calcule {n} en quelques points : la valeur au milieu est proche de 0, donc c\'est la solution.', { n: d.name }), distractor: 'g9_proof_by_example', why: t('Quelques valeurs ne prouvent rien : il faut un théorème (le TVI) pour garantir l\'existence.') },
  { id: 'x2', html: t('Par le théorème de Rolle, il existe c avec {n}′(c) = 0.', { n: d.name }), distractor: 'a1_rolle_without_hyp', why: t('Rolle parle de {n}′ et demande {n}(a) = {n}(b) : ici on cherche un zéro de {n}, c\'est le TVI.', { n: d.name }) },
];

function ivtBlocks(level, rng, opts = {}) {
  const kinds = level <= 2 ? ['poly', 'poly', 'cos', 'exp', 'ln'] : ['poly', 'poly', 'cos', 'exp', 'ln', 'fixed', 'odd'];
  const d = ivtData(rng, kinds);
  const n = d.name;
  const ab = d.kind === 'odd' ? '[a ; b]' : `[${fr(d.A)} ; ${fr(d.B)}]`;
  const open = d.kind === 'odd' ? ']a ; b[' : `]${fr(d.A)} ; ${fr(d.B)}[`;
  // Values typed: L1, L2, L4, L5 (not L3: blocks to order only).
  const typed = d.typed && level !== 3;
  const uniq = d.typed && level >= 4;
  const word = (s) => (s === '<' ? '< 0' : '> 0');
  const blocks = [
    { id: 'aux', html: t('Soit {d}.', { d: d.def }), needs: [] },
    { id: 'cont', html: d.cont, needs: ['aux'] },
    d.typed
      ? { id: 'fa', html: `${n}(${fr(d.A)}) = ${typed ? '…' : RD(d.fa)} ${word(d.sa)}`, needs: ['aux'] }
      : { id: 'fa', html: d.faHtml, needs: ['aux'] },
    d.typed
      ? { id: 'fb', html: `${n}(${fr(d.B)}) = ${typed ? '…' : RD(d.fb)} ${word(d.sb)}`, needs: ['aux'] }
      : { id: 'fb', html: d.fbHtml, needs: ['aux'] },
    { id: 'concl', html: d.conclHtml || t('{n} est continue sur {ab} et change de signe : par le TVI, il existe c ∈ {open} tel que {n}(c) = 0. L\'équation a une solution dans {open}.', { n, ab, open }), needs: ['cont', 'fa', 'fb'] },
  ];
  if (typed) {
    blocks[2].input = { kind: 'expr', vars: [], expect: d.fa, ask: `${n}(${fr(d.A)}) =`, answer: d.fa };
    blocks[3].input = { kind: 'expr', vars: [], expect: d.fb, ask: `${n}(${fr(d.B)}) =`, answer: d.fb };
  }
  if (uniq) {
    blocks.push({
      id: 'uniq', html: t('{n}′(x) = {df}, de signe constant sur {ab} : {why}, la solution est unique.', { n, df: level === 4 ? '…' : RD(d.df), ab, why: d.dfWhy }), needs: ['concl'],
      ...(level === 4 ? { input: { kind: 'expr', vars: ['x'], expect: d.df, domain: { x: d.kind === 'ln' ? [1.1, 1.9] : [0.1, 0.9] }, ask: `${n}′(x) =`, answer: d.df } } : {}),
    });
  }
  const nDecoys = level <= 2 ? 0 : level === 3 ? 2 : 3;
  const decoys = rng.shuffle(DECOYS(d)).slice(0, nDecoys);
  const order = ['aux', 'cont', 'fa', 'fb', 'concl', ...(uniq ? ['uniq'] : [])];
  let placed = [];
  let used = [...blocks, ...decoys];
  if (level === 1) placed = ['aux', 'cont'];
  const prompt = d.stmt || (uniq ? t('Montre que l\'équation {eq} a une solution dans {open}, et qu\'elle est unique.', { eq: d.eq, open }) : t('Montre que l\'équation {eq} a une solution dans {open}.', { eq: d.eq, open }));
  let decision = null;
  if (level === 2 && d.wrong) {
    decision = {
      prompt: t('Sur quel segment, et avec quelle fonction, appliques-tu le TVI ?'),
      options: rng.shuffle([{ id: 'ok', label: t('{n}(x) = {f} sur {I}', { n, f: RD(d.f), I: ab }), valid: true }, ...d.wrong]),
    };
  }
  const solution = order.map((id) => {
    const b = blocks.find((x) => x.id === id);
    return { html: b.input ? b.html.replace('…', MT(b.input.answer)) : b.html, note: '' };
  });
  return blocksItem({
    skill: IVT, level, mode: blocks.some((b) => b.input) ? 'frame' : 'order',
    prompt: `${prompt} ${typed ? t('Touche les blocs dans l\'ordre de la preuve et complète les calculs.') : t('Touche les blocs dans l\'ordre de la preuve.')}`,
    blocks: rng.shuffle(used.filter((b) => !placed.includes(b.id))).concat(blocks.filter((b) => placed.includes(b.id))),
    placed, goal: order.at(-1), order: order.filter((id) => !placed.includes(id)), decision,
    hints: H(t('Il faut une fonction continue qui change de signe sur {ab}.', { ab }),
      d.typed ? t('{n}({a}) = ▢ et {n}({b}) = ▢ : leurs signes sont contraires.', { n, a: fr(d.A), b: fr(d.B) }) : `${d.faHtml} ; ${d.fbHtml}.`,
      d.typed ? t('{n} continue, {n}({a}) {sa} 0 et {n}({b}) {sb} 0 : TVI.', { n, a: fr(d.A), b: fr(d.B), sa: d.sa === '<' ? '&lt;' : '&gt;', sb: d.sb === '<' ? '&lt;' : '&gt;' }) : t('{n} continue et de signes contraires en {a} et {b} : TVI.', { n, a: fr(d.A), b: fr(d.B) })),
    noHints: level === 5 || !!opts.exam,
    subgoals: IVT_SUB, solution,
    key: `${level}:${d.kind}:${d.f}:${d.A ?? ''}`, exam: examTag(opts),
  });
}

// True or false (exam): continuity, fixed points, bijections.
function ivtTf(rng) {
  const kind = rng.pick(['fixed', 'segment', 'bij', 'nocont', 'nocont', 'conv']);
  if (kind === 'fixed') {
    const [al, be] = rng.pick([[-2, 20], [-1, 3], [-5, 2]]);
    return tfItem({ skill: IVT, level: 4, statement: t('Si f : [{a} ; {b}] → [0 ; 1] est continue, alors il existe x ∈ [0 ; 1] tel que f(x) = x.', { a: fr(al), b: be }), truth: true, key: `fixed:${al}:${be}`, exam: tfTag,
      explanation: t('Vrai : g(x) = f(x) − x est continue sur [0 ; 1], g(0) = f(0) ≥ 0 et g(1) = f(1) − 1 ≤ 0 ; le TVI donne un zéro de g.') });
  }
  if (kind === 'segment') {
    const [a, b] = rng.pick([[1, 2], [0, 1], [-1, 3]]);
    return tfItem({ skill: IVT, level: 4, statement: t('Si f([{a} ; {b}]) = ]{a} ; {b}[, alors f n\'est pas continue sur [{a} ; {b}].', { a: fr(a), b }), truth: true, key: `seg:${a}`, exam: tfTag,
      explanation: t('Vrai : l\'image d\'un segment par une fonction continue est un segment (min et max atteints), jamais un intervalle ouvert.') });
  }
  if (kind === 'bij') {
    return tfItem({ skill: IVT, level: 4, statement: t('Il existe une fonction f continue et bijective de ]−1 ; 1[ sur ℝ.'), truth: true, key: 'bij', exam: tfTag,
      explanation: t('Vrai : f(x) = tan(πx/2) est continue, strictement croissante, et tend vers ∓∞ en ∓1.') });
  }
  if (kind === 'nocont') {
    const [a, b] = rng.pick([[0, 1], [0, 2], [-1, 1], [1, 3]]);
    const m = (a + b) / 2;
    return tfItem({
      skill: IVT, level: 4, statement: t('Si f({a}) < 0 < f({b}), alors f s\'annule entre {a} et {b}.', { a: fr(a), b }), truth: false,
      counter: {
        kind: 'function', v: 'x',
        hyp: [{ p: 'positive', of: '-f', on: [String(a), String(a)], say: `f(${fr(a)}) < 0` }, { p: 'positive', on: [String(b), String(b)], say: `f(${b}) > 0` }],
        concl: { p: 'zeroIn', on: [String(a), String(b)], say: t('f s\'annule entre {a} et {b}', { a: fr(a), b }) },
        ask: [{ v: 'f', label: 'f(x) =', keys: ['calc', 'calcfn'] }], answer: { f: `1/(x-${m === 0.5 ? '1/2' : m})`.replace('x-0', 'x').replace('--', '+') },
      },
      ruleIfTrue: 'a1_ivt_no_continuity', key: `nocont:${a}:${b}`, exam: tfTag,
      explanation: t('Faux sans continuité : f(x) = 1/(x − {m}) est négative en {a}, positive en {b}, et ne s\'annule jamais.', { m: fr(m === 0.5 ? '1/2' : m), a: fr(a), b }),
    });
  }
  return tfItem({
    skill: IVT, level: 4, statement: t('Si f est continue sur [0 ; 1], f(0) > 0 et f(1) > 0, alors f ne s\'annule pas sur [0 ; 1].'), truth: false,
    counter: {
      kind: 'function', v: 'x',
      hyp: [{ p: 'continuousOn', on: ['0', '1'], say: t('f est continue sur [0 ; 1]') }, { p: 'positive', on: ['0', '0'], say: 'f(0) > 0' }, { p: 'positive', on: ['1', '1'], say: 'f(1) > 0' }],
      concl: { p: 'noZeroIn', on: ['0', '1'], say: t('f ne s\'annule pas sur [0 ; 1]') },
      ask: [{ v: 'f', label: 'f(x) =', keys: ['calc', 'calcfn'] }], answer: { f: '(2x-1)^2' },
    },
    key: 'conv', exam: tfTag,
    explanation: t('Faux : le TVI ne marche que dans un sens. f(x) = (2x − 1)² est continue, f(0) = f(1) = 1 > 0, et f(1/2) = 0.'),
  });
}

function ivtItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return ivtTf(rng);
  return ivtBlocks(level, rng, opts);
}

// ======================================================================
// a1-fn-image
// ======================================================================

const IMG = 'a1-fn-image';
const IMG_SUB = [
  { id: 'deriv', label: t('dériver'), skill: 'g6-deriv-rules' },
  { id: 'crit', label: t('points critiques'), skill: IMG },
  { id: 'image', label: t('image'), skill: IMG },
];
const IMG_CHOICES = [
  { id: 'deriv', label: t('Dériver f') },
  { id: 'zeros', label: t('Zéros de f′ dans l\'intervalle') },
  { id: 'values', label: t('Valeurs aux bornes et aux points critiques') },
  { id: 'limits', label: t('Limites aux bornes ouvertes'), why: t('L\'intervalle est un segment : f y est définie aux bornes, on calcule les valeurs.') },
  { id: 'image', label: t('Écrire l\'image [min ; max]') },
  { id: 'ends', label: t('Image = [f(a) ; f(b)]'), rule: 'a1_image_endpoints_only', why: t('f n\'est pas forcément monotone : il faut aussi les points critiques.') },
];

// k·π/4 as text: π/4, π/2, 3π/4, π.
const PI4 = { 1: 'π/4', 2: 'π/2', 3: '3π/4', 4: 'π' };
// e^(s·kπ/4) as text.
const ex = (s, k) => (k === 0 ? '' : k === 4 ? (s < 0 ? 'e^(-π)' : 'e^π') : `e^(${s < 0 ? '-' : ''}${PI4[k]})`);
// c·E as text, c in {0, ±1, ±√2/2}.
function times(c, E) {
  if (c === '0') return '0';
  if (!E) return c === '1' ? '1' : c === '-1' ? '-1' : c === 'r' ? '√2/2' : '-√2/2';
  if (c === '1') return E;
  if (c === '-1') return `-${E}`;
  return c === 'r' ? `(√2/2)${E}` : `-(√2/2)${E}`;
}
const SIN = { 0: '0', 1: 'r', 2: '1', 3: 'r', 4: '0' };
const COS = { 0: '1', 1: 'r', 2: '0', 3: '-r', 4: '-1' };

// f = e^(s·x)·T(x) on [0 ; π/2] or [0 ; π] with a critical point inside.
function trigData(rng) {
  const combos = [];
  for (const s of [1, -1]) for (const T of ['sin', 'cos']) for (const B of [2, 4]) {
    const c = (T === 'sin') === (s === 1) ? 3 : 1; // f′ = 0 at 3π/4 or π/4
    if (c < B) combos.push({ s, T, B, c });
  }
  const { s, T, B, c } = rng.pick(combos);
  const E = s > 0 ? 'e^x' : 'e^(-x)';
  const f = `${E}×${T}(x)`;
  const yf = `${s > 0 ? 'e^y' : 'e^(-y)'}×${T}(y)`;
  const df = T === 'sin'
    ? (s > 0 ? 'e^x(sin(x)+cos(x))' : 'e^(-x)(cos(x)-sin(x))')
    : (s > 0 ? 'e^x(cos(x)-sin(x))' : '-e^(-x)(sin(x)+cos(x))');
  const inner = T === 'sin' ? (s > 0 ? 'sin(x)+cos(x)' : 'cos(x)-sin(x)') : (s > 0 ? 'cos(x)-sin(x)' : 'sin(x)+cos(x)');
  const at = (k) => times((T === 'sin' ? SIN : COS)[k], ex(s, k));
  const pts = [{ x: '0', v: at(0) }, { x: PI4[c], v: at(c) }, { x: PI4[B], v: at(B) }];
  return { kind: 'trig', f, yf, df, inner, a: '0', b: PI4[B], domain: `[0 ; ${PI4[B]}]`, crit: [PI4[c]], critLine: `x=${PI4[c]}`, pts };
}

// f = ±(2x³ − 3(r₁ + r₂)x² + 6r₁r₂x) + c on [a ; b], f′ = ±6(x − r₁)(x − r₂).
function cubicData(rng) {
  for (let i = 0; i < 200; i++) {
    const r1 = rng.int(-3, 3);
    const r2 = r1 + rng.int(1, 3);
    const a = r1 - rng.int(0, 2);
    const b = r2 + rng.int(0, 2);
    if (b - a > 5 || (a === r1 && b === r2)) continue;
    const sg = rng.pick([1, -1]);
    const k = rng.int(-9, 9);
    const F = (x) => sg * (2 * x ** 3 - 3 * (r1 + r2) * x ** 2 + 6 * r1 * r2 * x) + k;
    const coefs = [2 * sg, -3 * (r1 + r2) * sg, 6 * r1 * r2 * sg, k];
    const crit = [r1, r2].filter((r) => r > a && r < b);
    if (!crit.length) continue;
    const xs = [a, ...crit, b];
    const vs = xs.map(F);
    if (vs.some((v) => Math.abs(v) > 60)) continue;
    const m = Math.min(...vs);
    const M = Math.max(...vs);
    if (Math.min(vs[0], vs.at(-1)) === m && Math.max(vs[0], vs.at(-1)) === M) continue;
    const poly = (v) => coefs.map((c, j) => ({ c, p: 3 - j })).filter((t) => t.c).map((t, j) => {
      const sign = t.c < 0 ? '-' : j ? '+' : '';
      const abs = Math.abs(t.c);
      const body = t.p === 0 ? String(abs) : `${abs === 1 ? '' : abs}${v}${t.p > 1 ? `^${t.p}` : ''}`;
      return sign + body;
    }).join('');
    const dco = [6 * sg, -6 * (r1 + r2) * sg, 6 * r1 * r2 * sg];
    const df = dco.map((c, j) => ({ c, p: 2 - j })).filter((t) => t.c).map((t, j) => `${t.c < 0 ? '-' : j ? '+' : ''}${t.p === 0 ? Math.abs(t.c) : `${Math.abs(t.c) === 1 ? '' : Math.abs(t.c)}x${t.p > 1 ? '^2' : ''}`}`).join('');
    const quad = [1, -(r1 + r2), r1 * r2].map((c, j) => ({ c, p: 2 - j })).filter((t) => t.c).map((t, j) => `${t.c < 0 ? '-' : j ? '+' : ''}${t.p === 0 ? Math.abs(t.c) : `${Math.abs(t.c) === 1 ? '' : Math.abs(t.c)}x${t.p > 1 ? '^2' : ''}`}`).join('');
    return {
      kind: 'cubic', f: poly('x'), yf: poly('y'), df, inner: quad, a: String(a), b: String(b), domain: `[${a} ; ${b}]`,
      crit: crit.map(String), critLine: [r1, r2].filter((r) => r >= a && r <= b).map((r) => `x=${r}`).join('∨'), pts: xs.map((x, j) => ({ x: String(x), v: String(vs[j]) })), r: [r1, r2],
    };
  }
  return null;
}

const FALLBACK = () => ({ kind: 'trig', f: 'e^(-x)×sin(x)', yf: 'e^(-y)×sin(y)', df: 'e^(-x)(cos(x)-sin(x))', inner: 'cos(x)-sin(x)', a: '0', b: 'π', domain: '[0 ; π]', crit: ['π/4'], critLine: 'x=π/4', pts: [{ x: '0', v: '0' }, { x: 'π/4', v: '(√2/2)e^(-π/4)' }, { x: 'π', v: '0' }], fallback: true });

function imgData(rng) {
  if (rng.chance(0.5)) return trigData(rng);
  return cubicData(rng) || FALLBACK();
}

// The min and the max of the values (texts), and the image.
function extremes(pts) {
  const vs = pts.map((p) => ({ ...p, y: val(p.v) }));
  const lo = vs.reduce((m, p) => (p.y < m.y ? p : m));
  const hi = vs.reduce((m, p) => (p.y > m.y ? p : m));
  return { lo, hi, image: `[${lo.v} ; ${hi.v}]` };
}

function imgLines(level, rng, opts = {}) {
  const d = imgData(rng);
  const { lo, hi, image } = extremes(d.pts);
  const xs = d.pts.map((p) => p.x);
  const list = (f) => d.pts.map(f).join(';');
  const startImg = `min(${list((p) => `f(${p.x})`)})≤y≤max(${list((p) => `f(${p.x})`)})`;
  const valuesLine = `min(${list((p) => p.v)})≤y≤max(${list((p) => p.v)})`;
  const chain = `${lo.v}≤y≤${hi.v}`;
  const vars = { x: [Number(d.a) + 0.1, val(d.b) - 0.1] };
  const parts = [];
  const derJ = { kind: 'equiv', vars: ['x'], domain: vars, target: 'no-prime' };
  const solJ = { kind: 'solset', v: 'x', domain: d.domain };
  const imgJ = { kind: 'solset', v: 'y', defs: { f: d.yf }, funcs: ['f'] };
  if (level >= 2) parts.push({ start: `d(${d.f})`, judge: derJ, lines: [E(d.df, t('Dériver'), 'deriv', 'deriv')] });
  if (level !== 2) {
    const zl = [E(`${d.inner}=0`, d.kind === 'trig' ? t('{e} > 0 : on simplifie', { e: d.f.startsWith('e^x') ? 'eˣ' : 'e^(−x)' }) : t('Diviser par 6'), 'crit', 'zeros'),
      E(d.critLine, t('Zéros dans {I}', { I: fr(d.domain) }), 'crit', 'zeros')];
    if (level === 1) zl[1] = blanked(zl[1], d.crit);
    parts.push({ html: t('Points critiques : f′(x) = 0 sur {I}.', { I: fr(d.domain) }), ask: 'f′(x) = 0 ⇔', start: `${d.df}=0`, judge: solJ, lines: zl });
  }
  const il = [E(valuesLine, t('Valeurs aux candidats'), 'image', 'values'), E(chain, t('Min et max'), 'image', 'image'), E(image, t('L\'image est un segment'), 'image', 'image')];
  if (level === 1) il[0] = blanked(il[0], [d.pts[1].v]);
  if (level <= 2) il[2] = blanked(il[2], [lo.v, hi.v].filter((x, i, a) => a.indexOf(x) === i).slice(0, 1));
  parts.push({ html: t('Image : f est continue sur {I}, son image est [min ; max] des valeurs aux bornes et aux points critiques ({xs}).', { I: fr(d.domain), xs: xs.map(fr).join(', ') }), ask: 'f(I) :', start: startImg, judge: imgJ, lines: il });
  // Script: the first part is the item's start.
  const menu = (p) => (level === 3 ? { ...p.judge, menus: stepMenus(p.start, p.lines, IMG_CHOICES) } : p.judge);
  const [first, ...rest] = parts;
  const script = [...first.lines];
  for (const p of rest) script.push(SEG(p.html, p.ask, p.start, menu(p)), ...p.lines);
  const given = level === 1 ? ` ${t('On donne f′(x) = {df}.', { df: MT(d.df) })}` : level === 2 ? ` ${t('Les candidats sont {xs}.', { xs: xs.map(fr).join(', ') })}` : '';
  return linesItem({
    skill: IMG, level, mode: modeOf(level), start: first.start, judge: menu(first), script,
    prompt: `${t('Soit f(x) = {f} sur {I}. Détermine l\'image f({I}).', { f: MT(d.f), I: fr(d.domain) })}${given}`,
    declares: { vars: ['x', 'y'], funcs: ['f'] },
    hints: H(t('Continue sur un segment : l\'image est [min ; max]. Cherche-les aux bornes et là où f′ = 0.'),
      t('f′(x) = {df} = 0 ⇔ {c} ; puis f({xs}).', { df: MT(d.df), c: MT(d.critLine.replace(/∨/g, ' ∨ ')), xs: xs.map(fr).join('), f(') }),
      t('max = {M} (en {xM}), min = {m} (en {xm}).', { M: MT(hi.v), xM: fr(hi.x), m: MT(lo.v), xm: fr(lo.x) })),
    subgoals: IMG_SUB, keys: [...KEYS, 'ineq'], tapActions: level === 3 ? 'steps' : null,
    key: `${IMG}:${level}:${d.f}:${d.domain}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// Exam multiple choice: the image of a segment (or of [1 ; +∞[).
function imgMcq(rng, opts) {
  if (rng.chance(0.2)) {
    const k = rng.pick([1, 3]);
    const lo = k === 1 ? '√2/2' : '√3/2';
    return examMcq({
      skill: IMG, prompt: t('Soit f(x) = sin(Arctg(√x)) sur [{k} ; +∞[. L\'image f([{k} ; +∞[) est :', { k }),
      options: [
        { html: MT(`[${lo} ; 1[`, { vars: [] }), correct: true },
        { html: MT(`[${lo} ; 1]`), correct: false },
        { html: MT(`]${lo} ; 1[`), correct: false },
        { html: MT('[0 ; 1]'), correct: false },
      ],
      key: `${IMG}:mcq:arctg:${k}`,
      solution: [{ html: t('f est strictement croissante (composée de fonctions croissantes sur [{k} ; +∞[ ; Arctg √x ∈ [0 ; π/2[). f({k}) = sin({a}) = {lo}, et f(x) → sin(π/2) = 1 sans l\'atteindre.', { k, a: k === 1 ? 'π/4' : 'π/3', lo }), note: '' }],
    }, rng, opts);
  }
  const d = (rng.chance(0.7) ? cubicData(rng) : trigData(rng)) || FALLBACK();
  const { lo, hi, image } = extremes(d.pts);
  const e0 = d.pts[0];
  const e1 = d.pts.at(-1);
  const [s0, s1] = val(e0.v) <= val(e1.v) ? [e0, e1] : [e1, e0];
  const opts4 = [
    { html: MT(image), correct: true },
    { html: MT(`[${s0.v} ; ${s1.v}]`), correct: false, rule: 'a1_image_endpoints_only' },
  ];
  const crit = d.pts.slice(1, -1);
  if (crit.length >= 2) {
    const cv = crit.map((p) => p.v).sort((u, v) => val(u) - val(v));
    opts4.push({ html: MT(`[${cv[0]} ; ${cv.at(-1)}]`), correct: false, rule: 'a1_extrema_bounds_forgotten' });
  }
  opts4.push({ html: MT(`]${lo.v} ; ${hi.v}[`), correct: false }, { html: MT(`[${lo.v} ; ${hi.v}[`), correct: false });
  return examMcq({
    skill: IMG, prompt: t('Soit f(x) = {f}. L\'image f({I}) est :', { f: MT(d.f), I: fr(d.domain) }),
    options: uniqOptions(opts4),
    key: `${IMG}:mcq:${d.f}:${d.domain}`, fallback: !!d.fallback,
    solution: [{ html: t('f′(x) = {df} s\'annule en {c}. Valeurs : {v}. Image : {im}.', { df: MT(d.df), c: d.crit.map(fr).join(t(' et ')), v: d.pts.map((p) => `f(${fr(p.x)}) = ${MT(p.v)}`).join(', '), im: MT(image) }), note: '' }],
  }, rng, opts);
}

// True or false: an image claimed (refuted by a point x whose value falls
// outside), continuity on a half-open interval, segments.
function imgTf(rng) {
  const kind = rng.pick(['cubic', 'cubic', 'cubic', 'unbounded', 'segment']);
  if (kind === 'unbounded') {
    return tfItem({
      skill: IMG, level: 4, statement: t('Toute fonction continue sur ]0 ; 1] est bornée sur ]0 ; 1].'), truth: false,
      counter: {
        kind: 'function', v: 'x',
        hyp: [{ p: 'continuousOn', on: ['1/100', '1'], say: t('f est continue sur ]0 ; 1]') }],
        concl: { p: 'boundedOn', on: ['0', '1'], say: t('f est bornée sur ]0 ; 1]') },
        ask: [{ v: 'f', label: 'f(x) =', keys: ['calc', 'calcfn'] }], answer: { f: '1/x' },
      },
      key: 'unbounded', exam: tfTag,
      explanation: t('Faux : ]0 ; 1] n\'est pas un segment. f(x) = 1/x est continue sur ]0 ; 1] et tend vers +∞ en 0⁺.'),
    });
  }
  if (kind === 'segment') {
    return tfItem({ skill: IMG, level: 4, statement: t('L\'image d\'un segment [a ; b] par une fonction continue est un segment [m ; M].'), truth: true, key: 'segment', exam: tfTag,
      explanation: t('Vrai : f atteint son minimum m et son maximum M sur [a ; b], et par le TVI elle prend toutes les valeurs entre les deux.') });
  }
  const d = cubicData(rng) || { f: '2x^3-9x^2+12x+1', a: '0', b: '3', domain: '[0 ; 3]', pts: [{ x: '0', v: '1' }, { x: '1', v: '6' }, { x: '2', v: '5' }, { x: '3', v: '10' }], fallback: true };
  const { lo, hi, image } = extremes(d.pts);
  const e0 = d.pts[0];
  const e1 = d.pts.at(-1);
  const [s0, s1] = val(e0.v) <= val(e1.v) ? [e0, e1] : [e1, e0];
  const truth = rng.chance(0.4);
  const claim = truth ? image : `[${s0.v} ; ${s1.v}]`;
  const [m, M] = truth ? [lo.v, hi.v] : [s0.v, s1.v];
  const out = val(lo.v) < val(m) ? lo : hi;
  return tfItem({
    skill: IMG, level: 4, statement: t('Soit f(x) = {f}. Alors f({I}) = {c}.', { f: MT(d.f), I: fr(d.domain), c: MT(claim) }), truth,
    ...(truth ? {} : {
      counter: {
        kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }],
        pred: `(${d.a}≤x ∧ x≤${d.b}) ⇒ (${m}≤${d.f.replace(/x/g, '(x)')} ∧ ${d.f.replace(/x/g, '(x)')}≤${M})`,
        ask: [{ v: 'x', label: 'x =' }], answer: { x: out.x },
      },
      ruleIfTrue: 'a1_image_endpoints_only',
    }),
    key: `${d.f}:${truth}`, exam: tfTag, fallback: !!d.fallback,
    explanation: truth
      ? t('Vrai : f′ s\'annule en {c} ; le min est {m}, le max {M}.', { c: d.pts.slice(1, -1).map((p) => fr(p.x)).join(t(' et ')), m: fr(lo.v), M: fr(hi.v) })
      : t('Faux : f({x}) = {v} n\'est pas dans {c}. L\'image est {im} : f n\'est pas monotone.', { x: fr(out.x), v: fr(out.v), c: fr(claim), im: fr(image) }),
  });
}

function imgItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq' || level === 5) return imgMcq(rng, opts);
  if (opts.exam === 'tf') return imgTf(rng);
  return imgLines(level, rng, opts);
}

export const GEN = { [IVT]: ivtItem, [IMG]: imgItem };
