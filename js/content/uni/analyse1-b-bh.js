// a1-bh (module A1, part b, step U2): the rule of Bernoulli-l'Hôpital
// with its conditions. Judge `limit`: every line has the same limit as the
// previous one (each BH line f′/g′ keeps the limit of f/g). The form is
// checked before each application: a decision « Quelle forme ? » at
// level 2, a note at level 1, a self-explanation line at levels 3–4.
// Templates start from the limit L and the number k of applications.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { limitOf } from '../../judges/limit.js';
import { trapAnswers } from '../../judges/diagnose.js';
import { templateOf } from '../../judges/lines.js';
import { N, q, nz, H, E, examOf, kx, joinSum, blanked, tpl, partsItem, mcqOf, vfItem, ML, RD } from './analyse1-b-common.js';

const SK = 'a1-bh';
const KEYS = ['calcx', 'calcfn', 'anal'];
const SUB = [
  { id: 'bh', label: 'appliquer BH', skill: SK },
  { id: 'simp', label: 'dériver et simplifier', skill: 'a1-deriv-rules' },
  { id: 'subst', label: 'forme qui n\'est plus indéterminée', skill: 'a1-fn-limits' },
  { id: 'rewrite', label: 'écrire en quotient', skill: 'a1-fn-limits' },
];
const CHOICES = [
  { id: 'bh', label: 'Appliquer BH : dériver le haut et le bas' },
  { id: 'simp', label: 'Simplifier' },
  { id: 'subst', label: 'Substituer : la forme n\'est plus indéterminée' },
  { id: 'rewrite', label: 'Réécrire le produit comme un quotient' },
  { id: 'quot', label: 'Dériver le quotient f/g', rule: 'a1_bh_quotient_rule', why: 'BH dérive le haut et le bas séparément, pas le quotient.' },
];
const FORMS = { '0/0': '0/0', inf: '∞/∞', none: 'pas indéterminé', '0inf': '0·∞' };
const E_ = (a) => `e^(${kx(a)})`;

// Each template: {to, dir?, start, form, steps: [{math, act, holes?, form?}], L}.
// form of a BH step: the form of the line before it.
const T = {
  expPoly(rng) {
    const a = rng.pick([1, -1, 2, -2, 3]);
    const L = q(a * a, 2);
    return {
      to: '0', start: `(${E_(a)}-1-${kx(a)})/x^2`.replace('--', '+'), form: '0/0', k: 2, L,
      steps: [
        { math: `(${joinSum([kx(a, E_(a)), N(-a)])})/(2x)`, act: 'bh', holes: [kx(a, E_(a)), '2x'], form: '0/0' },
        { math: `${kx(a * a, E_(a))}/2`, act: 'bh', holes: [kx(a * a, E_(a))], form: '0/0' },
        { math: N(L), act: 'subst' },
      ],
    };
  },
  sinCube(rng) {
    const a = rng.pick([1, 2, 3]);
    const s = (f) => `${f}(${kx(a)})`;
    const L = q(a ** 3, 6);
    return {
      to: '0', start: `(${kx(a)}-${s('sin')})/x^3`, form: '0/0', k: 3, L,
      steps: [
        { math: `(${a}-${kx(a, s('cos'))})/(3x^2)`, act: 'bh', holes: [kx(a, s('cos')), '3x^2'], form: '0/0' },
        { math: `${kx(a * a, s('sin'))}/(6x)`, act: 'bh', holes: [kx(a * a, s('sin')), '6x'], form: '0/0' },
        { math: `${kx(a ** 3, s('cos'))}/6`, act: 'bh', holes: [kx(a ** 3, s('cos'))], form: '0/0' },
        { math: N(L), act: 'subst' },
      ],
    };
  },
  lnLin(rng) {
    const a = nz(rng, -5, 5);
    const b = rng.pick([1, 1, 2, 3, 4]);
    if (b > 1 && Q.of(a).div(b).d === 1) return null;
    const inner = `1+${kx(a)}`.replace('+-', '-');
    const L = q(a, b);
    return {
      to: '0', start: `ln(${inner})/${b === 1 ? 'x' : `(${b}x)`}`, form: '0/0', k: 1, L,
      steps: [
        { math: `${a}/(${b === 1 ? '' : `${b}(`}${inner}${b === 1 ? '' : ')'})`, act: 'bh', holes: [inner], form: '0/0' },
        { math: N(L), act: 'subst' },
      ],
    };
  },
  cosQuad(rng) {
    const a = rng.pick([1, 2, 3, 4]);
    const L = q(a * a, 2);
    return {
      to: '0', start: `(1-cos(${kx(a)}))/x^2`, form: '0/0', k: 2, L,
      steps: [
        { math: `${kx(a, `sin(${kx(a)})`)}/(2x)`, act: 'bh', holes: [kx(a, `sin(${kx(a)})`), '2x'], form: '0/0' },
        { math: `${kx(a * a, `cos(${kx(a)})`)}/2`, act: 'bh', holes: [kx(a * a, `cos(${kx(a)})`)], form: '0/0' },
        { math: N(L), act: 'subst' },
      ],
    };
  },
  expDiff(rng) {
    const a = nz(rng, -4, 4);
    const b = nz(rng, -4, 4);
    if (a === b) return null;
    const L = q(a - b);
    return {
      to: '0', start: `(${E_(a)}-${E_(b)})/x`, form: '0/0', k: 1, L,
      steps: [
        { math: joinSum([kx(a, E_(a)), kx(-b, E_(b))]), act: 'bh', holes: [kx(a, E_(a))], form: '0/0' },
        { math: N(L), act: 'subst' },
      ],
    };
  },
  lnPow(rng) {
    const n = rng.pick([1, 2, 3]);
    const c = rng.pick([1, 2, 3]);
    const xn = n === 1 ? 'x' : `x^${n}`;
    return {
      to: '+∞', start: `${c === 1 ? '' : c}ln(x)/${xn}`, form: 'inf', k: 1, L: q(0),
      steps: [
        { math: `(${c}/x)/${n === 1 ? '1' : `(${n}${n === 2 ? 'x' : `x^${n - 1}`})`}`, act: 'bh', holes: [`${c}/x`], form: 'inf' },
        { math: `${c}/(${n}${xn})`.replace('/(1x)', '/x'), act: 'simp' },
        { math: '0', act: 'subst' },
      ],
    };
  },
  powExp(rng) {
    const a = rng.pick([1, 2, 3]);
    const ea = E_(a);
    return {
      to: '+∞', start: `x^2/${ea}`, form: 'inf', k: 2, L: q(0),
      steps: [
        { math: `2x/(${kx(a, ea)})`, act: 'bh', holes: ['2x'], form: 'inf' },
        { math: `2/(${kx(a * a, ea)})`, act: 'bh', holes: ['2'], form: 'inf' },
        { math: '0', act: 'subst' },
      ],
    };
  },
  xlnx(rng) {
    const n = rng.pick([1, 2, 3]);
    const xn = n === 1 ? 'x' : `x^${n}`;
    return {
      to: '0', dir: '+', start: `${xn}×ln(x)`, form: '0inf', k: 1, L: q(0),
      steps: [
        { math: `ln(x)/(1/${xn})`, act: 'rewrite', holes: [`1/${xn}`] },
        { math: `(1/x)/(${-n}/x^${n + 1})`, act: 'bh', holes: [`${-n}/x^${n + 1}`], form: 'inf' },
        { math: n === 1 ? '-x' : `-${xn}/${n}`, act: 'simp' },
        { math: '0', act: 'subst' },
      ],
    };
  },
  notIndet(rng) {
    const p = nz(rng, -6, 6);
    const r = nz(rng, -6, 6);
    const qq = nz(rng, -5, 5);
    if (p === r) return null;
    const L = q(p, r);
    const bh = q(1, qq);
    if (L.eq(bh)) return null;
    return {
      to: '0', start: `(${lin(p)})/(${joinSum(['x^2', kx(qq), N(r)])})`, form: 'none', k: 0, L, bh, num0: p, den0: r,
      steps: [{ math: N(L), act: 'subst', holes: [N(L)] }],
    };
  },
};
// x + p as text.
function lin(p) { return joinSum(['x', N(p)]); }

const BY_LEVEL = {
  1: ['expPoly', 'lnLin', 'cosQuad', 'expDiff'],
  2: ['expPoly', 'lnLin', 'cosQuad', 'expDiff', 'notIndet', 'lnPow'],
  3: ['expPoly', 'sinCube', 'cosQuad', 'lnPow', 'powExp', 'notIndet', 'xlnx'],
  4: ['expPoly', 'sinCube', 'cosQuad', 'lnPow', 'powExp', 'notIndet', 'xlnx', 'expDiff'],
  5: ['sinCube', 'xlnx', 'powExp', 'lnPow'],
};

function draw(level, rng) {
  for (let i = 0; i < 200; i++) {
    const d = T[rng.pick(BY_LEVEL[level])](rng);
    if (d) return d;
  }
  return { ...T.expPoly({ pick: () => 2 }), fallback: true };
}

const judgeOf = (d) => ({ kind: 'limit', v: 'x', vars: ['x'], to: d.to, ...(d.dir ? { dir: d.dir } : {}) });
const toLim = (d) => (d.dir ? `${d.to}${d.dir === '+' ? '⁺' : '⁻'}` : d.to);
const limHtml = (d, e = d.start) => ML(`lim(${e},x,${toLim(d)})`);

function formDecision(form, start) {
  const opts = [
    { id: '0/0', label: '0/0 : on peut appliquer BH' },
    { id: 'inf', label: '∞/∞ : on peut appliquer BH' },
    { id: 'none', label: 'Pas indéterminé : on substitue' },
    { id: '1inf', label: '1^∞ : on passe par e^(…·ln …)' },
  ];
  return {
    kind: 'decision', prompt: 'Quelle forme ?',
    options: opts.map((o) => ({
      ...o, valid: o.id === form,
      why: o.id === form ? '' : `Regarde les limites du haut et du bas : ici c'est ${FORMS[form]}.`,
      ...(form === 'none' && o.id === '0/0' ? { rule: 'a1_bh_not_indeterminate' } : {}),
    })),
  };
}
const formRule = (form) => ({
  kind: 'rule', ask: 'Quelle forme ?', correct: form,
  options: [{ id: '0/0', label: '0/0' }, { id: 'inf', label: '∞/∞' }, { id: 'none', label: 'pas indéterminé' }, { id: '0inf', label: '0·∞ (à réécrire)' }],
});

// A line with its holes as boxes, in words (for the second hint).
const blankText = (s) => templateOf(tpl(s.math, s.holes || [])).replace(/×/g, '·').replace(/-/g, '−');

const NOTES = { bh: 'BH : dériver le haut et le bas', simp: 'Simplifier', subst: 'Substituer', rewrite: 'Écrire en quotient' };

function bhLines(level, rng, opts) {
  const d = draw(level, rng);
  const lines = [];
  if (level === 1 && d.form !== 'none') lines.push({ kind: 'note', html: `Forme ${FORMS[d.form]} : on peut appliquer BH.` });
  if (level === 1 && d.form === 'none') lines.push({ kind: 'note', html: 'Le dénominateur ne tend pas vers 0 : ce n\'est pas indéterminé, on substitue.' });
  if (level === 2 && (d.steps[0].act === 'bh' || d.form === 'none')) lines.push(formDecision(d.form, d.start));
  if (level === 3 || level === 4) lines.push(formRule(d.form));
  d.steps.forEach((s, i) => {
    if (i > 0 && s.act === 'bh' && level === 2) lines.push(formDecision(s.form, d.steps[i - 1].math));
    if (i > 0 && s.act === 'bh' && level === 1) lines.push({ kind: 'note', html: `Encore ${FORMS[s.form]} : BH une ${i === 1 ? 'deuxième' : 'nouvelle'} fois.` });
    const sub = s.act === 'bh' ? 'bh' : s.act === 'subst' ? 'subst' : s.act === 'rewrite' ? 'rewrite' : 'simp';
    const line = E(s.math, NOTES[s.act], sub, s.act);
    lines.push(level === 1 && s.holes && s.act !== 'subst' ? blanked(line, s.holes) : line);
  });
  const first = d.steps.find((s) => s.act === 'bh');
  const prompt = rng.chance(0.5)
    ? `Calcule ${limHtml(d)}.`
    : `Trouve ${limHtml(d)}, avec la règle de Bernoulli-l'Hôpital si elle s'applique.`;
  const h1 = d.form === '0inf'
    ? 'Une forme 0·∞ : écris le produit comme un quotient (ln x en haut), puis vérifie 0/0 ou ∞/∞.'
    : 'Vérifie la forme ; si c\'est 0/0 ou ∞/∞, dérive le haut et le bas séparément.';
  const h2 = first ? `Après BH : ${blankText(first)}` : `En 0, le haut vaut ${RD(d.num0)} et le bas vaut ${RD(d.den0)} : substitue x = 0.`;
  const h3 = `${d.k ? `${d.k === 1 ? 'Une fois' : `${d.k} fois`} BH, puis ` : ''}la limite vaut ${RD(N(d.L))}.`;
  return partsItem({
    skill: SK, level, prompt,
    parts: [{ start: d.start, judge: judgeOf(d), lines }],
    choices: CHOICES,
    hints: H(h1, h2, h3), subgoals: SUB, keys: KEYS,
    key: `${SK}:${d.start}:${level}`, exam: examOf(opts), fallback: d.fallback,
  });
}

// ---------- exam variants ----------

const say = (r) => {
  if (r.value === '+inf') return '+∞';
  if (r.value === '-inf') return '−∞';
  if (r.value instanceof Q) return N(r.value);
  return null;
};

function mcqVariant(rng, opts) {
  const d = draw(rng.pick([2, 3, 4]), rng);
  const cfg = judgeOf(d);
  const startNode = parse(d.start);
  const html = (t) => (t === '+∞' || t === '−∞' ? t : ML(t));
  const options = [{ html: html(N(d.L)), correct: true }];
  for (const t of trapAnswers('limit', startNode, cfg)) {
    const v = say(limitOf(cfg, t.node));
    if (v) options.push({ html: html(v), correct: false, rule: t.rule });
  }
  for (const v of [N(d.L.mul(2)), N(d.L.neg()), '+∞', '1', '0', N(d.L.add(1))]) options.push({ html: html(v), correct: false });
  return mcqOf({
    skill: SK, level: 4, prompt: `${limHtml(d)} = ?`, options, key: `mcq:${d.start}`, expectedSec: 240, exam: examOf(opts),
    solution: [{ html: `${d.form === 'none' ? 'Pas indéterminé : on substitue.' : `Forme ${FORMS[d.form]}, BH ${d.k} fois.`} Limite : ${RD(N(d.L))}.`, note: '' }],
    fallback: d.fallback,
  }, rng);
}

function tfVariant(rng, opts) {
  const kind = rng.pick(['converse', 'quotient', 'true', 'gen', 'gen']);
  if (kind === 'converse') {
    return vfItem({
      skill: SK, key: 'converse', exam: examOf(opts), rule: 'a1_bh_converse', truth: false,
      statement: 'Soit g, h dérivables avec g(0) = h(0) = 0 et h′ ≠ 0 près de 0. Si lim<sub>x→0</sub> g′/h′ n\'existe pas, alors lim<sub>x→0</sub> g/h n\'existe pas.',
      why: 'Faux : g(x) = x²·sin(1/x), h(x) = x. g/h = x·sin(1/x) → 0, mais g′/h′ = 2x·sin(1/x) − cos(1/x) n\'a pas de limite. BH ne va que dans un sens.',
    }, rng);
  }
  if (kind === 'quotient') {
    return vfItem({
      skill: SK, key: 'quotient', exam: examOf(opts), rule: 'a1_bh_quotient_rule', truth: false,
      statement: 'Si f/g est de la forme 0/0 en a, alors lim<sub>x→a</sub> f/g = lim<sub>x→a</sub> (f/g)′.',
      why: 'Faux : BH dérive le haut et le bas séparément, lim f′/g′. Avec f = sin x, g = x en 0 : f′/g′ = cos x → 1, mais (sin x/x)′ → 0.',
    }, rng);
  }
  if (kind === 'true') {
    return vfItem({
      skill: SK, key: 'true', exam: examOf(opts), truth: true,
      statement: 'Si f(0) = g(0) = 0, f et g sont dérivables en 0 et g′(0) ≠ 0, alors lim<sub>x→0</sub> f/g = f′(0)/g′(0).',
      why: 'Vrai : f(x)/g(x) = ((f(x) − f(0))/x)/((g(x) − g(0))/x) → f′(0)/g′(0).',
    }, rng);
  }
  const d = draw(rng.pick([2, 4]), rng);
  let claim = d.L;
  let rule = null;
  if (d.form === 'none') { claim = d.bh; rule = 'a1_bh_not_indeterminate'; } else if (rng.chance(0.4)) {
    const t = trapAnswers('limit', parse(d.start), judgeOf(d)).map((x) => ({ v: limitOf(judgeOf(d), x.node).value, rule: x.rule })).find((x) => x.v instanceof Q && !x.v.eq(d.L));
    if (t) { claim = t.v; rule = t.rule; }
  }
  const truth = claim.eq(d.L);
  return vfItem({
    skill: SK, key: `gen:${d.start}:${N(claim)}`, exam: examOf(opts), truth, rule,
    statement: `${limHtml(d)} = ${RD(N(claim))}`,
    why: `${truth ? 'Vrai' : 'Faux'} : ${d.form === 'none' ? 'ce n\'est pas indéterminé, on substitue' : `forme ${FORMS[d.form]}, BH ${d.k} fois`} ; la limite vaut ${RD(N(d.L))}.`,
    fallback: d.fallback,
  }, rng);
}

export function bhItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return mcqVariant(rng, opts);
  if (opts.exam === 'tf') return tfVariant(rng, opts);
  return bhLines(level, rng, opts);
}
