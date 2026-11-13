// Generators of module A1, part a (step U2): C¹ and piecewise functions.
// Catalogue: docs/universite/A1-analyse-1.md, `a1-c1-def`,
// `a1-piecewise-ab`, `a1-c1-proof`, and the exam example E4.
//
// a1-c1-def: blocks (`mode:'define'`, the scale of §16.3: blocks already
// placed, fewer, decoys, all alone). a1-piecewise-ab: lines in parts —
// continuity (limit), b (value), left or right derivative (limit), a
// (value), then f at a point (value). a1-c1-proof: blocks with typed
// inputs (`mode:'frame'`: f′(x) off 0, f′(0) by the definition, lim f′);
// its `open` variant is a hint-free lines item in parts (equiv, then the
// two limits).

import { MT, linesItem, mcq, tfItem, blocksItem } from './kit.js';
import { modeOf, H, E, examOf, uniqOptions, blanked, withMenus, segment, frN, vfMcq } from './analyse1-a-kit.js';
import { toText } from '../../cas/print.js';
import { parse } from '../../cas/parse.js';
import { deriv } from '../../cas/ast.js';
import { t } from '../../i18n.js';

const RULE = 'a1_c1_def_missing_cont';

// ======================================================================
// a1-c1-def
// ======================================================================

const CDEF = 'a1-c1-def';
const INTERVALS = ['I', ']0 ; 1[', ']−1 ; 1[', ']−2 ; 3['];
// Definitions: C¹, C², Cᵏ, « continûment dérivable ».
function defOf(kind, I) {
  const on = I === 'I' ? 'I' : I;
  const frame = I === 'I' ? t('Soit I ⊂ ℝ un intervalle ouvert et f : I → ℝ.') : t('Soit f : {I} → ℝ.', { I });
  if (kind === 'C2') {
    return {
      name: `C²(${on})`, frame, d1: t('f est deux fois dérivable en tout point de {on}.', { on }), d2: t('La fonction f″ : {on} → ℝ est continue sur {on}.', { on }),
      last: t('On note C²({on}) l\'ensemble de ces fonctions.', { on }), holes: ['deux fois dérivable', 'f″ continue'],
    };
  }
  if (kind === 'Ck') {
    return {
      name: `Cᵏ(${on}) (k ≥ 1)`, frame, d1: t('f est k fois dérivable en tout point de {on}.', { on }), d2: t('La fonction f⁽ᵏ⁾ : {on} → ℝ est continue sur {on}.', { on }),
      last: t('On note Cᵏ({on}) l\'ensemble de ces fonctions.', { on }), holes: ['k fois dérivable', 'f⁽ᵏ⁾ continue'],
    };
  }
  return {
    name: kind === 'cd' ? t('« f est continûment dérivable sur {on} »', { on }) : `C¹(${on})`, frame,
    d1: t('f est dérivable en tout point de {on}.', { on }), d2: t('La fonction f′ : {on} → ℝ est continue sur {on}.', { on }),
    last: kind === 'cd' ? t('On dit alors que f est continûment dérivable sur {on} : f ∈ C¹({on}).', { on }) : t('On note C¹({on}) l\'ensemble de ces fonctions.', { on }),
    holes: ['dérivable', 'f′ continue'],
  };
}
function decoysOf(kind, on) {
  const p = kind === 'C2' ? 'f″' : kind === 'Ck' ? 'f⁽ᵏ⁾' : 'f′';
  return [
    { html: t('f est continue sur {on}.', { on }), why: t('Insuffisant : c\'est {p} qui doit être continue, et f doit d\'abord être dérivable.', { p }) },
    { html: t('{p} existe en un point de {on}.', { p, on }), why: t('Il faut que {p} existe en <b>tout</b> point de {on}, et soit continue.', { p, on }) },
    { html: t('{p} est bornée sur {on}.', { p, on }), why: t('Bornée ne suffit pas : {p} doit être continue sur {on}.', { p, on }) },
    { html: t('lim_{x→x₀} {p}(x) existe pour un x₀ de {on}.', { p, on }), why: t('Une limite en un point ne dit pas que {p} est continue sur {on}.', { p, on }) },
  ];
}

function c1DefBlocks(level, rng, opts = {}) {
  const kind = level >= 4 && !opts.exam ? rng.pick(['C1', 'C2', 'Ck', 'cd']) : rng.pick(['C1', 'C1', 'cd']);
  const I = rng.pick(INTERVALS);
  const D = defOf(kind, I);
  const on = I;
  const blocks = [
    { id: 'frame', html: D.frame, needs: [] },
    { id: 'd1', html: D.d1, needs: ['frame'] },
    { id: 'd2', html: D.d2, needs: ['d1'], earlyWhy: t('Pas encore : on parle de la dérivée seulement quand elle existe partout.') },
    { id: 'name', html: D.last, needs: ['d2'] },
  ];
  // The scale: L1 the last condition to choose, L2 two blocks among four,
  // L3 all, two decoys, L4–L5 all, four decoys.
  const nDecoys = level === 1 ? 2 : level === 2 ? 2 : level === 3 ? 2 : 4;
  const decoys = rng.shuffle(decoysOf(kind, on)).slice(0, nDecoys).map((d, i) => ({ id: `x${i}`, html: d.html, needs: [], distractor: RULE, why: d.why }));
  let used = blocks;
  let placed = [];
  let order = ['frame', 'd1', 'd2', 'name'];
  if (level === 1) { used = blocks.slice(0, 3); placed = ['frame', 'd1']; order = ['d2']; }
  if (level === 2) { used = blocks.slice(0, 3); placed = ['frame']; order = ['d1', 'd2']; }
  const goal = order[order.length - 1];
  return blocksItem({
    skill: CDEF, level: opts.exam ? 4 : level, mode: 'define',
    prompt: t('Construis la définition de {name}.{p1} Touche les blocs dans l\'ordre.', { name: D.name, p1: placed.length ? t(' Le début est placé.') : '' }),
    blocks: rng.shuffle([...used, ...decoys]), goal, order, placed,
    hints: H(t('Deux conditions : une sur f, une sur sa dérivée.'), t('f est □ en tout point de {on}, et □ sur {on}.', { on }), `${D.d1} ${D.d2}`),
    noHints: level === 5 || !!opts.exam,
    subgoals: [{ id: 'def', label: t('définition'), skill: CDEF }],
    solution: [...placed, ...order].map((id) => ({ html: blocks.find((b) => b.id === id).html, note: '' })),
    key: `${kind}:${I}:${level}`, exam: examOf(opts),
  });
}

const CLASS = (n) => (n === 0 ? 'C⁰' : n === 1 ? 'C¹' : n === 2 ? 'C²' : n === 3 ? 'C³' : 'C⁴');
function c1DefMcq(rng, opts) {
  if (rng.chance(0.5)) {
    // |x|·xⁿ is Cⁿ, not Cⁿ⁺¹ (MT 2014).
    const n = rng.pick([1, 2, 3]);
    const f = n === 1 ? 'x×|x|' : `|x|×x^${n}`;
    return mcq({
      skill: CDEF, level: 4, prompt: t('Soit f(x) = {f} sur ℝ. Quelle affirmation est juste ?', { f: MT(f) }),
      options: [
        { html: t('f est de classe {n} sur ℝ, mais pas {p1}', { n: CLASS(n), p1: CLASS(n + 1) }), correct: true },
        { html: t('f est de classe {p1} sur ℝ, mais pas {p2}', { p1: CLASS(n + 1), p2: CLASS(n + 2) }), correct: false, rule: 'a1_corner_missed' },
        { html: t('f est de classe {p1} sur ℝ, mais pas {n}', { p1: CLASS(n - 1), n: CLASS(n) }), correct: false },
        { html: t('f est de classe C^∞ sur ℝ'), correct: false, rule: 'a1_corner_missed' },
      ],
      key: `mcq:${f}`, exam: examOf(opts), expectedSec: 240,
      solution: [{ html: t('Les dérivées de {f} sont des multiples de {p1} : la dérivée d\'ordre {n} est un multiple de |x|, continue mais pas dérivable en 0.', { f: MT(f), p1: n === 1 ? '|x|' : `${MT(`x^${n - 1}×|x|`)}, …, |x|`, n }), note: '' }],
    }, rng);
  }
  const I = rng.pick(INTERVALS);
  return mcq({
    skill: CDEF, level: 4, prompt: t('Quelle est la définition de « f ∈ C¹({I}) » ?', { I }),
    options: [
      { html: t('f est dérivable en tout point de {I}, et f′ est continue sur {I}.', { I }), correct: true },
      { html: t('f est dérivable en tout point de {I}.', { I }), correct: false, rule: RULE },
      { html: t('f est continue sur {I}, et f′ est bornée sur {I}.', { I }), correct: false, rule: RULE },
      { html: t('f est continue sur {I}, et lim f′(x) existe en tout point de {I}.', { I }), correct: false, rule: 'a1_c1_from_lim_fprime_only' },
    ],
    key: `mcq:def:${I}`, exam: examOf(opts), expectedSec: 240,
    solution: [{ html: t('Deux conditions : f dérivable en tout point, et f′ continue. x²·sin(1/x) est dérivable sur ℝ, mais f′ n\'est pas continue en 0.'), note: '' }],
  }, rng);
}

function c1Def(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return c1DefMcq(rng, opts);
  return c1DefBlocks(level, rng, opts);
}

// ======================================================================
// a1-piecewise-ab
// ======================================================================

const PW = 'a1-piecewise-ab';
const PW_SUB = [
  { id: 'cont', label: t('continuité au raccord'), skill: 'a1-fn-extension' },
  { id: 'sides', label: t('dérivée latérale'), skill: 'a1-deriv-def' },
  { id: 'solve', label: t('résoudre en a et b'), skill: 'eq-systems' },
  { id: 'eval', label: t('évaluer f'), skill: PW },
];
const PW_CHOICES = [
  { id: 'cont', label: t('Continuité au raccord') },
  { id: 'side', label: t('Dérivée latérale par le taux d\'accroissement') },
  { id: 'solve', label: t('Résoudre en a et b') },
  { id: 'eval', label: t('Évaluer f au point demandé') },
  { id: 'slopes', label: t('Égaler les pentes des deux morceaux, sans la continuité'), rule: 'a1_piecewise_derivative_formula', why: t('Sans continuité au raccord, f n\'est pas dérivable : il faut les deux équations.') },
];
const sgn = (k, t) => (k === 0 ? '' : k > 0 ? `+${k}${t}` : `-${-k}${t}`);
const lin1 = (r) => (r === 0 ? 'x' : r > 0 ? `x+${r}` : `x-${-r}`);
const sh = (t, v) => t.replace(/x/g, v);

// The given piece g (through the joint 0): text, g(0), g′(0), and the
// difference quotient on its side with its simplification.
function givenPiece(rng) {
  const kind = rng.pick(['poly', 'poly', 'exp', 'sin']);
  if (kind === 'poly') {
    for (;;) {
      const r1 = rng.pick([-4, -3, -2, -1, 1, 2, 3, 4]);
      const r2 = rng.pick([-4, -3, -2, -1, 1, 2, 3, 4]);
      if (r1 === r2 || r1 + r2 === 0) continue;
      const g = `(${lin1(-r1)})(${lin1(-r2)})`;
      const g0 = r1 * r2;
      const gp = -(r1 + r2);
      return { g, g0, gp, quot: `(${sh(g, 'h')}${g0 < 0 ? `+${-g0}` : `-${g0}`})/h`, simp: `h${sgn(gp, '')}`, hole: String(Math.abs(gp)) };
    }
  }
  const k = rng.pick([2, 3, -2]);
  const c = rng.pick([-3, -2, -1, 1, 2, 3]);
  const kx = k === -1 ? '-x' : `${k}x`;
  const g = kind === 'exp' ? `e^(${kx})${sgn(c, '')}` : `sin(${kx})${sgn(c, '')}`;
  const g0 = kind === 'exp' ? 1 + c : c;
  if (g0 === 0) return givenPiece(rng);
  const inner = kind === 'exp' ? `e^(${sh(kx, 'h')})-1` : `sin(${sh(kx, 'h')})`;
  return { g, g0, gp: k, quot: `(${inner})/h`, simp: null, hole: null, kind };
}

function pwData(rng) {
  const left = rng.chance(0.5); // the given piece on x < 0, ax + b on x ≥ 0
  const P = givenPiece(rng);
  // f is asked at a point of the piece ax + b.
  const at = left ? rng.pick([1, 2, 3]) : rng.pick([-1, -2, -3]);
  const onLine = true;
  return { left, P, a: P.gp, b: P.g0, at, onLine };
}

function pwLines(level, rng, opts = {}) {
  const d = pwData(rng);
  const { P, a, b, at, left } = d;
  const side = left ? '-' : '+';
  const sideTxt = left ? '0⁻' : '0⁺';
  const fShow = left
    ? t('{g} si x < 0, et {p1} si x ≥ 0', { g: MT(P.g), p1: MT('ax+b') })
    : t('{p1} si x < 0, et {g} si x ≥ 0', { p1: MT('ax+b'), g: MT(P.g) });
  const L0 = [E(String(b), left ? t('lim_{x→0⁻} f(x) = {b}, et f(0) = b', { b: frN(b) }) : t('f(0) = {b}, et lim_{x→0⁻} f(x) = b', { b: frN(b) }), 'cont', 'cont')];
  const Lb = [E(String(b), t('Continuité en 0'), 'solve', 'solve')];
  const Ld = P.simp ? [E(P.simp, t('Simplifier par h'), 'sides', 'side'), E(String(a), 'h → 0', 'sides', 'side')] : [E(String(a), P.kind === 'exp' ? 'eᵘ − 1 ~ u' : 'sin u ~ u', 'sides', 'side')];
  const La = [E(String(a), `f′(${left ? '0⁺' : '0⁻'}) = a`, 'solve', 'solve')];
  const fat = d.onLine ? `${a}×(${at})${b < 0 ? b : `+${b}`}` : null;
  const valAt = d.onLine ? a * at + b : null;
  const Lf = d.onLine ? [E(fat.replace(/\(([0-9]+)\)/, '$1'), t('Remplacer'), 'eval', 'eval'), E(String(valAt), t('Calculer'), 'eval', 'eval')] : null;
  const s0 = withMenus({ kind: 'limit', v: 'x', to: '0', dir: side }, level, P.g, L0, PW_CHOICES);
  const sb = withMenus({ kind: 'value', expect: String(b) }, level, 'b', Lb, PW_CHOICES);
  const sd = withMenus({ kind: 'limit', v: 'h', to: '0', dir: side }, level, P.quot, Ld, PW_CHOICES);
  const sa = withMenus({ kind: 'value', expect: String(a) }, level, 'a', La, PW_CHOICES);
  const choose = {
    kind: 'decision', prompt: t('Par quoi commencer ?'), options: [
      { id: 'cont', label: t('La continuité en 0 : une équation en a et b'), valid: true },
      { id: 'slopes', label: t('Égaler les dérivées des deux morceaux en 0'), valid: false, rule: 'a1_piecewise_derivative_formula', why: t('Si f n\'est pas continue en 0, elle n\'y est pas dérivable : la continuité d\'abord.') },
    ],
  };
  const script = [
    ...(level === 2 ? [choose] : []),
    ...(level === 1 ? [{ kind: 'note', html: t('Continuité en 0 : la limite {p1} de {g} vaut {b}.', { p1: left ? t('à gauche') : t('à droite'), g: MT(P.g), b: frN(b) }) }] : []),
    ...L0,
    segment(t('Écris l\'équation de continuité.'), 'b =', 'b', sb),
    ...Lb,
    segment(t('Dérivée {p1} en 0, par le taux d\'accroissement (f(0) = {b}).', { p1: left ? t('à gauche') : t('à droite'), b: frN(b) }), null, P.quot, sd),
    ...(level === 1 && P.simp ? [blanked(Ld[0], [P.hole]), Ld[1]] : Ld),
    segment(t('La dérivée {p1} vaut a : égale les deux.', { p1: left ? t('à droite') : t('à gauche') }), 'a =', 'a', sa),
    ...La,
  ];
  if (d.onLine) {
    script.push(segment(t('Calcule f({at}).', { at: frN(at) }), `f(${frN(at)}) =`, `f(${at})`, withMenus({ kind: 'value', expect: String(valAt) }, level, `f(${at})`, Lf, PW_CHOICES)), ...Lf);
  }
  const key = `${PW}:${P.g}:${left}:${at}:${level}`;
  return linesItem({
    skill: PW, level,
    prompt: t('Soit f(x) = {fShow}. Trouve a et b pour que f soit dérivable en 0{p1}.', { fShow, p1: d.onLine ? t(', puis calcule f({at})', { at: frN(at) }) : '' }),
    start: P.g, judge: s0, mode: modeOf(level), script, keys: ['calcx', 'calcfn', 'anal'], declares: { vars: ['x'] },
    subgoals: PW_SUB.filter((s) => s.id !== 'eval' || d.onLine), tapActions: level === 3 ? 'steps' : null,
    hints: H(
      t('D\'abord continue en 0, ensuite mêmes pentes des deux côtés.'),
      `b = □ ; a = f′(${left ? '0⁻' : '0⁺'}) = lim ${MT(P.quot)} = □`,
      `b = ${frN(b)}, a = ${frN(a)}`,
    ),
    key, exam: examOf(opts),
  });
}

function pwMcq(rng, opts) {
  const d = pwData(rng);
  const { P, a, b, left } = d;
  const fShow = left ? t('{g} si x < 0, et {p1} si x ≥ 0', { g: MT(P.g), p1: MT('ax+b') }) : t('{p1} si x < 0, et {g} si x ≥ 0', { p1: MT('ax+b'), g: MT(P.g) });
  const pair = (x, y) => t('a = {x} et b = {y}', { x: frN(x), y: frN(y) });
  const options = uniqOptions([
    { html: pair(a, b), correct: true },
    { html: t('a = {a}, et b quelconque', { a: frN(a) }), correct: false, rule: 'a1_piecewise_derivative_formula' },
    { html: pair(b, a), correct: false },
    { html: pair(a, -b), correct: false },
    { html: t('Aucune valeur : f a un point anguleux en 0'), correct: false, rule: 'a1_corner_missed' },
  ].filter((o, i) => i === 0 || o.html !== pair(a, b))).slice(0, 4);
  return mcq({
    skill: PW, level: opts.exam ? 4 : 5, prompt: t('Soit f(x) = {fShow}. Pour quelles valeurs f est-elle dérivable en 0 ?', { fShow }),
    options, key: `mcq:${P.g}:${left}`, exam: examOf(opts), expectedSec: 240,
    solution: [{ html: t('Continuité : b = {b}. Pentes : la dérivée de {g} en 0 vaut {a}, donc a = {a2}.', { b: frN(b), g: MT(P.g), a: frN(a), a2: frN(a) }), note: '' }],
  }, rng);
}

const PW_TF = [
  { s: 'f(x) = x·|cos x| est dérivable en 0.', truth: true, why: 'Vrai : près de 0, cos x > 0, donc f(x) = x·cos x, dérivable, et f′(0) = 1.' },
  { s: 'f(x) = x·|x| est dérivable en 0.', truth: true, why: 'Vrai : (f(h) − f(0))/h = |h| → 0, donc f′(0) = 0.' },
  { s: 'Si f est définie par g sur ]−1 ; 0[ et par k sur [0 ; 1[, avec g′(0) = k′(0), alors f est dérivable en 0.', truth: false, rule: 'a1_piecewise_derivative_formula', why: 'Faux : il faut aussi la continuité en 0. g(x) = x et k(x) = x + 1 ont la même pente, mais f saute en 0.' },
];
function pwTf(rng) {
  const tf = rng.pick(PW_TF);
  if (!tf.truth) return vfMcq(PW, t(tf.s), false, tf.rule, t(tf.why), rng, tf.s);
  return tfItem({ skill: PW, level: 4, statement: t(tf.s), truth: true, key: tf.s, explanation: t(tf.why), exam: { format: 'tf', points: 1 } });
}

function piecewise(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq' || level === 5) return pwMcq(rng, opts);
  if (opts.exam === 'tf') return pwTf(rng);
  return pwLines(level, rng, opts);
}

// ======================================================================
// a1-c1-proof
// ======================================================================

const CPR = 'a1-c1-proof';
const CPR_SUB = [
  { id: 'off', label: t('f′ hors de 0'), skill: 'a1-deriv-rules' },
  { id: 'def', label: t('f′(0) par la définition'), skill: 'a1-deriv-def' },
  { id: 'bound', label: t('majorer'), skill: 'a1-seq-squeeze' },
  { id: 'concl', label: t('conclure'), skill: 'a1-c1-def' },
];
const DOM = { x: [0.2, 0.9] };
const SUP = { 0: '⁰', 1: '', 2: '²', 3: '³', 4: '⁴' };

// f(x) = a·x + xᵖ·T(1/x), f(0) = 0: f′ off 0, the quotient, the bound.
function cprData(rng, p) {
  const a = rng.int(1, 6);
  const T = rng.pick(['sin', 'cos']);
  const U = T === 'sin' ? 'cos' : 'sin';
  const sg = T === 'sin' ? '-' : '+';
  const ax = a === 1 ? 'x' : `${a}x`;
  const f = `${ax}+x^${p}×${T}(1/x)`;
  const lowP = p - 2 === 0 ? '' : p - 2 === 1 ? 'x×' : `x^${p - 2}×`;
  const fp = `${a}+${p}${p - 1 === 1 ? 'x' : `x^${p - 1}`}×${T}(1/x)${sg}${lowP}${U}(1/x)`;
  const hp = p - 1 === 1 ? 'h' : `h^${p - 1}`;
  return { a, T, U, p, f, fp, quot: `(${sh(f, 'h')})/h`, simp: `${a}+${hp}×${T}(1/h)`, hpShow: `|h|${SUP[p - 1]}`, low: `|x|${SUP[p - 2]}`, high: `${p}|x|${SUP[p - 1]}` };
}

function cprBlocks(level, rng, opts = {}) {
  const counter = level === 4 && !opts.exam && rng.chance(0.3);
  const d = cprData(rng, counter ? 2 : rng.pick([3, 4]));
  const I = ']−1 ; 1[';
  const inputs = level === 1 ? ['b1', 'b2'] : level === 2 || level >= 4 ? ['b0', 'b1', 'b2'] : [];
  const fpShow = MT(d.fp);
  const blocks = counter ? [
    { id: 'b0', html: t('Pour x ≠ 0, f est dérivable (produit et composée de fonctions dérivables) et f′(x) = {p1}.', { p1: inputs.includes('b0') ? '…' : fpShow }), needs: [] },
    { id: 'b1', html: t('En 0, par la définition : (f(h) − f(0))/h = {simp} → {a}, car |h·{T}(1/h)| ≤ |h|. Donc f′(0) = {p1}.', { simp: MT(d.simp), a: d.a, T: d.T, p1: inputs.includes('b1') ? '…' : d.a }), needs: [] },
    { id: 'b2', html: t('Mais f′(x) − {a} = 2x·{T}(1/x) {p1} {U}(1/x) : le premier terme tend vers 0, le second n\'a pas de limite en 0. f′ n\'a pas de limite en 0.', { a: d.a, T: d.T, p1: d.T === 'sin' ? '−' : '+', U: d.U }), needs: ['b0'] },
    { id: 'b3', html: t('f est dérivable sur {I}, mais f′ n\'est pas continue en 0 : f ∉ C¹({I}).', { I }), needs: ['b1', 'b2'] },
  ] : [
    { id: 'b0', html: t('Pour x ≠ 0, f est C¹ sur ]−1 ; 0[ et ]0 ; 1[ (somme, produit et composée de fonctions C¹), et f′(x) = {p1}.', { p1: inputs.includes('b0') ? '…' : fpShow }), needs: [] },
    { id: 'b1', html: t('En 0, par la définition : (f(h) − f(0))/h = {simp}, et {p1} ≤ {p2} → 0. Donc f′(0) = {p3}.', { simp: MT(d.simp), p1: MT(`|${d.simp.split('+')[1]}|`), p2: d.hpShow.replace('|h|²', 'h²'), p3: inputs.includes('b1') ? '…' : d.a }), needs: [] },
    { id: 'b2', html: t('Pour x ≠ 0 : |f′(x) − {a}| ≤ {high} + {low} → 0, donc lim_{x→0} f′(x) = {p1} = f′(0).', { a: d.a, high: d.high, low: d.low, p1: inputs.includes('b2') ? '…' : d.a }), needs: ['b0', 'b1'] },
    { id: 'b3', html: t('f est dérivable en tout point de {I} et f′ y est continue : f ∈ C¹({I}).', { I }), needs: ['b0', 'b1', 'b2'] },
  ];
  if (inputs.includes('b0')) blocks[0].input = { kind: 'expr', vars: ['x'], expect: d.fp, domain: DOM, ask: 'f′(x) =', answer: d.fp };
  if (inputs.includes('b1')) blocks[1].input = { kind: 'expr', vars: [], expect: String(d.a), ask: 'f′(0) =', answer: String(d.a) };
  if (inputs.includes('b2') && !counter) blocks[2].input = { kind: 'expr', vars: [], expect: String(d.a), ask: 'lim_{x→0} f′(x) =', answer: String(d.a) };
  for (const b of blocks) b.html = b.html.replace('….', '…');
  if (level === 5) {
    blocks.unshift({ id: 'def', html: t('Définition : f ∈ C¹({I}) si f est dérivable en tout point de {I} et si f′ est continue sur {I}.', { I }), needs: [] });
    blocks[blocks.length - 1].needs = [...blocks[blocks.length - 1].needs, 'def'];
  }
  const DECOYS = counter ? [
    { html: t('f n\'est pas dérivable en 0, car f′(x) n\'a pas de limite en 0.'), distractor: 'a1_derivable_from_formula', why: t('f′(0) se calcule par le taux d\'accroissement : il vaut {a}.', { a: d.a }) },
    { html: t('f est dérivable sur {I}, donc f ∈ C¹({I}).', { I }), distractor: RULE, why: t('Dérivable ne suffit pas : il faut que f′ soit continue.') },
  ] : [
    { html: `f′(0) = lim_{x→0} f′(x) = ${d.a}.`, distractor: 'a1_c1_from_lim_fprime_only', why: t('Montre d\'abord que f′(0) existe, par le taux d\'accroissement ; ensuite seulement, f′(x) → f′(0).') },
    { html: t('f est dérivable sur {I}, donc f ∈ C¹({I}).', { I }), distractor: RULE, why: t('Dérivable ne suffit pas : il faut que f′ soit continue.') },
    { html: t('f′(0) se lit sur la formule : f′(0) = {a} + {p}·0·{T}(1/0) + … = {a}.', { a: d.a, p: d.p, T: d.T }), distractor: 'a1_derivable_from_formula', why: t('La formule de f′(x) ne vaut que pour x ≠ 0 (1/0 n\'existe pas) : en 0, le taux d\'accroissement.') },
  ];
  const nD = level <= 2 ? 0 : level === 3 ? 2 : DECOYS.length;
  DECOYS.slice(0, nD).forEach((x, i) => blocks.push({ id: `x${i}`, needs: [], ...x }));
  const order = [...(level === 5 ? ['def'] : []), 'b0', 'b1', 'b2', 'b3'];
  const fShow = t('{f} si x ≠ 0, et f(0) = 0', { f: MT(d.f) });
  return blocksItem({
    skill: CPR, level: opts.exam ? 4 : level, mode: inputs.length ? 'frame' : 'order',
    prompt: counter
      ? t('Soit f : {I} → ℝ, f(x) = {fShow}. Montre que f est dérivable sur {I} mais pas C¹. Touche les blocs dans l\'ordre{p1}.', { I, fShow, p1: inputs.length ? t(' et complète les calculs') : '' })
      : t('Soit f : {I} → ℝ, f(x) = {fShow}. Montre que f ∈ C¹({I}). Touche les blocs dans l\'ordre{p1}.', { I, fShow, p1: inputs.length ? t(' et complète les calculs') : '' }),
    blocks: rng.shuffle(blocks), goal: 'b3', order,
    hints: H(t('Quatre temps : hors de 0, en 0 par la définition, limite de f′ en 0, conclusion.'), counter ? `f′(x) − ${d.a} = 2x·${d.T}(1/x) ${d.T === 'sin' ? '−' : '+'} □` : `|x·${d.U}(1/x)| ≤ □`, counter ? blocks.find((b) => b.id === 'b2').html : `|f′(x) − ${d.a}| ≤ ${d.high} + ${d.low} → 0`),
    noHints: level === 5 || !!opts.exam,
    subgoals: CPR_SUB,
    solution: order.map((id) => { const b = blocks.find((x) => x.id === id); return { html: b.input ? b.html.replace('…', MT(b.input.answer)) : b.html, note: '' }; }),
    key: `${d.f}:${counter}:${level}`, exam: examOf(opts),
  });
}

// The open exam question (E4): hint-free lines in parts.
function cprOpen(rng, opts) {
  const E4 = rng.chance(0.4);
  if (E4) {
    const script = [
      segment(t('En 0, à droite : (f(h) − f(0))/h, avec f(0) = π/2.'), null, '(arctan(1/h)+h^2-π/2)/h', { kind: 'limit', v: 'h', to: '0', dir: '+' }),
      E('-1', t('Arctg(1/h) = π/2 − Arctg h pour h > 0, et Arctg h ~ h'), 'def'),
      segment(t('En 0, à gauche.'), null, '(π/2-h-π/2)/h', { kind: 'limit', v: 'h', to: '0', dir: '-' }),
      E('-1', 'f′(0) = −1', 'def'),
      segment(t('Continuité de f′ en 0 : la limite à droite de f′ (à gauche, f′ = −1).'), null, '-1/(1+x^2)+2x', { kind: 'limit', v: 'x', to: '0', dir: '+' }),
      E('-1', 'lim f′ = −1 = f′(0)', 'bound'),
      { kind: 'note', html: t('f est dérivable sur ]−1 ; 1[ et f′ y est continue : f ∈ C¹(]−1 ; 1[).') },
    ];
    return linesItem({
      skill: CPR, level: 4, prompt: t('Soit f : ]−1 ; 1[ → ℝ, f(x) = {p1} si 0 < x < 1, f(x) = {p2} si −1 < x ≤ 0. Montre que f ∈ C¹(]−1 ; 1[) : dérive f pour x > 0, puis calcule f′(0) par la définition (à droite et à gauche), puis la limite de f′.', { p1: MT('arctan(1/x)+x^2'), p2: MT('π/2-x') }),
      start: 'd(arctan(1/x)+x^2)', judge: { kind: 'equiv', vars: ['x'], dvar: 'x', domain: DOM, target: 'no-prime' },
      mode: 'free', script: [E('-1/(1+x^2)+2x', t('Pour x > 0'), 'off'), ...script], keys: ['calcx', 'calcfn', 'anal'], declares: { vars: ['x'], dvar: 'x' },
      subgoals: CPR_SUB, hints: [], noHints: true, key: `${CPR}:open:E4`, exam: examOf(opts, 6),
    });
  }
  const d = cprData(rng, rng.pick([3, 4]));
  const script = [
    E(d.fp, t('Pour x ≠ 0 : produit et composée'), 'off'),
    segment(t('En 0, par la définition : (f(h) − f(0))/h.'), null, d.quot, { kind: 'limit', v: 'h', to: '0' }),
    E(d.simp, t('Simplifier par h'), 'def'),
    E(String(d.a), t('Gendarmes : |{p1}| ≤ {hpShow} → 0', { p1: d.simp.split('+')[1].replace(/×/g, '·').replace('^2', '²').replace('^3', '³'), hpShow: d.hpShow }), 'def'),
    segment(t('Continuité de f′ en 0 : la limite de f′(x).'), null, d.fp, { kind: 'limit', v: 'x', to: '0' }),
    E(String(d.a), `|f′(x) − ${d.a}| ≤ ${d.high} + ${d.low} → 0`, 'bound'),
    { kind: 'note', html: t('f est dérivable sur ]−1 ; 1[ et f′ y est continue : f ∈ C¹(]−1 ; 1[).') },
  ];
  return linesItem({
    skill: CPR, level: 4, prompt: t('Soit f : ]−1 ; 1[ → ℝ, f(x) = {f} si x ≠ 0, et f(0) = 0. Montre que f ∈ C¹(]−1 ; 1[) : dérive f hors de 0, calcule f′(0) par la définition, puis la limite de f′ en 0.', { f: MT(d.f) }),
    start: toText(deriv(parse(d.f), 'x')), judge: { kind: 'equiv', vars: ['x'], dvar: 'x', domain: DOM, target: 'no-prime' },
    mode: 'free', script, keys: ['calcx', 'calcfn', 'anal'], declares: { vars: ['x'], dvar: 'x' },
    subgoals: CPR_SUB, hints: [], noHints: true, key: `${CPR}:open:${d.f}`, exam: examOf(opts, 6),
  });
}

function cprMcq(rng, opts) {
  const k = rng.pick([1, 2, 3]);
  const fp = `x×sin(${k === 1 ? '' : k}x)/(√(x^2+1)-1)`;
  return mcq({
    skill: CPR, level: 4, prompt: t('f est de classe C¹ sur ℝ, et f′(x) = {fp} pour x ≠ 0. Que vaut f′(0) ?', { fp: MT(fp) }),
    options: [
      { html: String(2 * k), correct: true },
      { html: String(k), correct: false },
      { html: '0', correct: false, rule: 'a1_derivable_from_formula' },
      { html: t('f′(0) n\'existe pas : la formule n\'est pas définie en 0'), correct: false, rule: 'a1_derivable_from_formula' },
    ],
    key: `mcq:${fp}`, exam: examOf(opts), expectedSec: 240,
    solution: [{ html: t('f est C¹, donc f′ est continue en 0 : f′(0) = lim f′(x). Avec √(x² + 1) − 1 ~ x²/2 et sin({p1}x) ~ {p1}x, f′(x) → {p2}.', { p1: k === 1 ? '' : k, p2: 2 * k }), note: '' }],
  }, rng);
}

const CPR_TF = [
  { s: 'f(x) = x³·sin(1/x), f(0) = 0, est deux fois dérivable sur ℝ.', truth: false, rule: 'a1_derivable_from_formula', why: 'Faux : f′(x) = 3x²·sin(1/x) − x·cos(1/x) et f′(0) = 0, mais (f′(h) − f′(0))/h = 3h·sin(1/h) − cos(1/h) n\'a pas de limite en 0.' },
  { s: 'f(x) = x³·sin(1/x), f(0) = 0, est de classe C¹ sur ℝ.', truth: true, why: 'Vrai : f′(0) = lim h²·sin(1/h) = 0, et f′(x) = 3x²·sin(1/x) − x·cos(1/x) → 0.' },
  { s: 'Si f est dérivable sur ℝ ∖ {0} et lim_{x→0} f′(x) = 0, alors f est dérivable en 0.', truth: false, rule: 'a1_c1_from_lim_fprime_only', why: 'Faux : f(x) = 0 pour x ≤ 0 et f(x) = 1 pour x > 0 a f′(x) = 0 pour x ≠ 0, mais f n\'est même pas continue en 0.' },
];
function cprTf(rng) {
  const tf = rng.pick(CPR_TF);
  if (!tf.truth) return vfMcq(CPR, t(tf.s), false, tf.rule, t(tf.why), rng, tf.s);
  return tfItem({ skill: CPR, level: 4, statement: t(tf.s), truth: true, key: tf.s, explanation: t(tf.why), exam: { format: 'tf', points: 1 } });
}

function c1Proof(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return cprMcq(rng, opts);
  if (opts.exam === 'tf') return cprTf(rng);
  if (opts.exam === 'open') return cprOpen(rng, opts);
  return cprBlocks(level, rng, opts);
}

export const GEN = { [CDEF]: c1Def, [PW]: piecewise, [CPR]: c1Proof };
