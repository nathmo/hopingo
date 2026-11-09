// Traps of module G9 (logique), spec §7. Catalogue:
// docs/universite/G-gymnase-1.md, G9, « Pièges du module ».
//
// Line traps replay the mistake on the previous line: transform(prev, ctx)
// → [{node, ctx}], compared with the student's line by the judge's own
// equivalence (same set for `solset`, same truth table for `logic`). The
// traps of proofs, true/false and counter-examples have no transform: they
// are named by a decoy block, a true/false option or the counter-example
// check (js/judges/examples.js).
// `check` says how tests/judges.test.js replays example[0]:
//   {judge, prev, line}      a wrong line, diagnosed as this trap
//   {bait: {skill, level?, exam?}}   items of the skill carry it as a bait
//   {counter, answers}       a counter-example named by this trap

import { stripParen, walk, getAt, replaceAt, sym } from '../ast.js';
import { solutionSet, setToNode } from '../sets.js';
import {
  lexFor, walkF, replaceF, strip, nnf, strictNeg, negBind, formulaML,
} from '../logic.js';
import { toMathML } from '../mathml.js';

const M = (n) => toMathML(stripParen(n));

// ---------- sets ----------

function nodePaths(prev, pred) {
  const out = [];
  walk(prev, (n, path) => { if (pred(n)) out.push(path); return true; });
  return out;
}

const boundVarOf = (cond) => {
  let v = null;
  walk(cond, (n) => {
    if (v) return false;
    if (n.t === 'in' && stripParen(n.l).t === 'sym') { v = stripParen(n.l).name; return false; }
    return true;
  });
  return v;
};

// ---------- logic ----------

// The ¬ nodes of a formula and what they stand before.
function negations(f, kinds) {
  const out = [];
  walkF(f, (n, path) => {
    if (n.t === 'not' && kinds.includes(strip(n.e).t)) out.push({ path, inner: strip(n.e) });
    return true;
  });
  return out;
}

// The quantifier prefix of a formula: [{q, bind}] and the body.
function prefix(f) {
  const qs = [];
  let m = strip(f);
  while (m.t === 'q') { qs.push({ q: m.q, bind: m.bind }); m = strip(m.body); }
  return { qs, body: m };
}
const build = (qs, body) => qs.reduceRight((b, { q, bind }) => ({ t: 'q', q, bind, body: b }), body);
const flip = (q) => (q === '∀' ? '∃' : '∀');
const not = (e) => ({ t: 'not', e });

const F = (ctx, f) => (ctx?.cfg ? formulaML(f, lexFor(ctx.cfg)) : '');

export const RULES = [
  {
    id: 'g9_set_builder', family: 'notation', tag: 'E', skill: 'g9-sets', repair: 'g9-sets', judges: ['solset'],
    name: 'Ensemble image lu comme l\'ensemble des indices',
    example: ['{3n + 1 | n ≤ 3} = {0 ; 1 ; 2 ; 3}', '{3n + 1 | n ≤ 3} = {1 ; 4 ; 7 ; 10}'],
    check: { judge: { kind: 'solset', v: 'n', domain: 'N' }, prev: '{3n+1|n∈ℕ∧n≤3}', line: '{0;1;2;3}' },
    transform: (prev) => nodePaths(prev, (n) => n.t === 'set' && n.kind === 'builder' && stripParen(n.head).t !== 'in').map((path) => {
      const b = getAt(prev, path);
      const v = boundVarOf(b.cond) ?? [...JSON.stringify(b.head).matchAll(/"name":"([a-z])"/g)].map((m) => m[1])[0] ?? 'n';
      const indices = { t: 'set', kind: 'builder', head: { t: 'in', op: '∈', l: sym(v), r: { t: 'set', kind: 'named', name: 'ℤ' } }, cond: b.cond };
      return { node: replaceAt(prev, path, indices), ctx: { head: b.head, v } };
    }),
    explain: (ctx = {}) => (ctx.head
      ? `Les éléments sont les valeurs de ${M(ctx.head)}, pas les ${ctx.v} : chaque ${ctx.v} donne un élément ${M(ctx.head)}.`
      : 'Dans {3n + 1 | n ≤ 3}, les éléments sont les valeurs 3n + 1, pas les n : pour n = 2, on obtient 7.'),
  },
  {
    id: 'g9_union_inter', family: 'logic', tag: 'E', skill: 'g9-intervals', repair: 'g9-intervals', judges: ['solset'],
    name: '« et » et « ou » confondus (∩ et ∪)',
    example: ['x < −1 ou x > 2 : ]−∞ ; −1[ ∩ ]2 ; +∞[', 'x < −1 ou x > 2 : ]−∞ ; −1[ ∪ ]2 ; +∞['],
    check: { judge: { kind: 'solset', v: 'x', domain: 'R' }, prev: 'x<-1 ∨ x>2', line: ']-∞;-1[∩]2;+∞[' },
    // « x = a ou x = b » is not turned into « et » (an empty set nobody
    // writes, which would hide the traps that keep one solution).
    transform: (prev) => nodePaths(prev, (n) => (n.t === 'setop' && n.op !== '∖') || (n.t === 'logic' && (n.op === 'and' || (n.op === 'or' && !(stripParen(n.l).t === 'rel' && stripParen(n.l).op === '=' && stripParen(n.r).t === 'rel' && stripParen(n.r).op === '='))))).map((path) => {
      const n = getAt(prev, path);
      const swapped = n.t === 'setop' ? { ...n, op: n.op === '∪' ? '∩' : '∪' } : { ...n, op: n.op === 'and' ? 'or' : 'and' };
      return { node: replaceAt(prev, path, swapped), ctx: { from: n.t === 'setop' ? n.op : n.op === 'and' ? '∩' : '∪' } };
    }),
    explain: (ctx = {}) => `« Ou » se traduit par ∪ (l'un ou l'autre), « et » par ∩ (les deux à la fois).${ctx.from ? ` Ici, il fallait ${ctx.from === '∪' ? '∪' : '∩'}.` : ''} Teste un nombre : est-il dans ton ensemble ? vérifie-t-il la condition ?`,
  },
  {
    id: 'g9_bracket', family: 'notation', tag: 'E', skill: 'g9-intervals', repair: 'g9-intervals', judges: ['solset'],
    name: 'Crochet tourné du mauvais côté',
    example: ['−1 < x ≤ 3 : [−1 ; 3]', '−1 < x ≤ 3 : ]−1 ; 3]'],
    check: { judge: { kind: 'solset', v: 'x', domain: 'R' }, prev: '-1<x≤3', line: '[-1;3]' },
    transform: (prev, ctx) => {
      let S;
      try { S = solutionSet(prev, ctx?.cfg ?? {}); } catch { return []; }
      const out = [];
      S.parts.forEach((p, i) => {
        for (const side of ['lo', 'hi']) {
          if (!Number.isFinite(p[side].x) || p.lo.x === p.hi.x) continue;
          const parts = S.parts.map((q, j) => (j === i ? { ...q, [`${side}C`]: !q[`${side}C`] } : q));
          out.push({ node: setToNode({ parts }), ctx: { bound: p[side], closed: p[`${side}C`] } });
        }
      });
      return out;
    },
    explain: (ctx = {}) => (ctx.bound
      ? `Vérifie la borne ${String(ctx.bound.q ?? ctx.bound.x).replace('-', '−')} : est-elle solution ? ${ctx.closed ? 'Oui, donc le crochet est tourné vers elle : [ ou ].' : 'Non, donc le crochet est tourné vers l\'extérieur : ] à gauche, [ à droite.'}`
      : 'Un crochet tourné vers le nombre l\'inclut : [2 ; 5[ contient 2, pas 5. Teste chaque borne dans la condition.'),
  },
  {
    id: 'g9_demorgan', family: 'logic', tag: 'E', skill: 'g9-connectives', repair: 'g9-connectives', judges: ['logic'],
    name: 'De Morgan sans changer ∧ en ∨',
    example: ['¬(P ∧ Q) ≡ ¬P ∧ ¬Q', '¬(P ∧ Q) ≡ ¬P ∨ ¬Q'],
    check: { judge: { kind: 'logic', letters: ['P', 'Q'] }, prev: '¬(P∧Q)', line: '¬P∧¬Q' },
    transform: (prev) => negations(prev, ['and', 'or']).map(({ path, inner }) => ({
      node: replaceF(prev, path, { t: inner.t, l: not(inner.l), r: not(inner.r) }),
      ctx: { op: inner.t },
    })),
    explain: (ctx = {}) => (ctx.op === 'or'
      ? 'Avec P faux et Q vrai, ¬(P ∨ Q) est faux mais ¬P ∨ ¬Q est vrai. En entrant dans la parenthèse, ∨ devient ∧ : ¬(P ∨ Q) ≡ ¬P ∧ ¬Q.'
      : 'Avec P vrai et Q faux, ¬(P ∧ Q) est vrai mais ¬P ∧ ¬Q est faux. En entrant dans la parenthèse, ∧ devient ∨ : ¬(P ∧ Q) ≡ ¬P ∨ ¬Q.'),
  },
  {
    id: 'g9_neg_implication', family: 'logic', tag: 'E', skill: 'g9-implication', repair: 'g9-connectives', judges: ['logic'],
    name: 'Négation d\'une implication écrite comme une implication',
    example: ['¬(P ⇒ Q) ≡ ¬P ⇒ ¬Q', '¬(P ⇒ Q) ≡ P ∧ ¬Q'],
    check: { judge: { kind: 'logic', letters: ['P', 'Q'] }, prev: '¬(P⇒Q)', line: '¬P⇒¬Q' },
    transform: (prev) => negations(prev, ['imp']).flatMap(({ path, inner }) => [
      { node: replaceF(prev, path, { t: 'imp', l: not(inner.l), r: not(inner.r) }), ctx: { form: 'inverse' } },
      { node: replaceF(prev, path, { t: 'imp', l: inner.l, r: not(inner.r) }), ctx: { form: 'imp' } },
    ]),
    explain: () => 'Une implication A ⇒ B n\'est fausse que si A est vrai et B faux. Sa négation est donc « A et non B » : ¬(A ⇒ B) ≡ A ∧ ¬B, pas une implication.',
  },
  {
    id: 'g9_converse_contra', family: 'logic', tag: 'E', skill: 'g9-implication', repair: 'g9-implication', judges: ['logic'],
    name: 'Réciproque prise pour la contraposée',
    example: ['contraposée de P ⇒ Q : Q ⇒ P', 'contraposée de P ⇒ Q : ¬Q ⇒ ¬P'],
    check: { judge: { kind: 'logic', letters: ['P', 'Q'] }, prev: 'P⇒Q', line: 'Q⇒P' },
    transform: (prev) => {
      const out = [];
      walkF(prev, (n, path) => {
        if (n.t === 'not') return false;
        if (n.t === 'imp') {
          out.push({ node: replaceF(prev, path, { t: 'imp', l: n.r, r: n.l }), ctx: { form: 'converse' } });
          out.push({ node: replaceF(prev, path, { t: 'imp', l: not(n.l), r: not(n.r) }), ctx: { form: 'inverse' } });
          return false;
        }
        return true;
      });
      return out;
    },
    explain: (ctx = {}) => `${ctx.form === 'inverse' ? 'Tu as nié les deux côtés sans les échanger : ¬A ⇒ ¬B est l\'inverse, équivalent à la réciproque.' : 'Tu as écrit la réciproque B ⇒ A.'} Elle n'est pas équivalente à A ⇒ B : x > 3 ⇒ x² > 9 est vraie, mais x² > 9 ⇒ x > 3 est fausse (x = −4). La contraposée nie et échange : ¬B ⇒ ¬A.`,
  },
  {
    id: 'g9_quant_order', family: 'logic', tag: 'R', skill: 'g9-quant-read', repair: 'g9-quant-read', judges: ['logic'],
    name: 'Ordre des quantificateurs ∀∃ et ∃∀ confondu',
    example: ['∃y ∀x, x + y = 0 lu comme ∀x ∃y, x + y = 0', '∃y ∀x : un même y pour tous les x'],
    check: { judge: { kind: 'logic', pieces: [{ text: 'x ∈ ℝ' }, { text: 'y ∈ ℝ' }, { text: 'x + y = 0' }] }, prev: '∀x ∈ ℝ ∃y ∈ ℝ, x + y = 0', line: '∃y ∈ ℝ ∀x ∈ ℝ, x + y = 0' },
    transform: (prev) => {
      const out = [];
      walkF(prev, (n, path) => {
        const b = n.t === 'q' ? strip(n.body) : null;
        if (b?.t === 'q' && b.q !== n.q) {
          out.push({ node: replaceF(prev, path, { t: 'q', q: b.q, bind: b.bind, body: { t: 'q', q: n.q, bind: n.bind, body: b.body } }), ctx: { outer: n.bind.text, inner: b.bind.text } });
        }
        return true;
      });
      return out;
    },
    explain: (ctx = {}) => `L'ordre compte : dans ∀x ∃y, y peut dépendre de x ; dans ∃y ∀x, un même y doit marcher pour tous les x à la fois.${ctx.inner ? ` Ici tu as échangé « ${ctx.outer} » et « ${ctx.inner} ».` : ' Exemple : ∀x ∃y, x + y = 0 est vrai (y = −x), mais ∃y ∀x, x + y = 0 est faux.'}`,
  },
  {
    id: 'g9_neg_one_quant', family: 'logic', tag: 'R', skill: 'g9-negate', repair: 'g9-negate', judges: ['logic'],
    name: 'Un seul quantificateur changé dans la négation',
    example: ['¬(∀x ∃y, P) ≡ ∃x ∃y, ¬P', '¬(∀x ∃y, P) ≡ ∃x ∀y, ¬P'],
    check: { judge: { kind: 'logic', pieces: [{ text: 'x ∈ ℝ' }, { text: 'y ∈ ℝ' }, { text: 'x + y = 0' }] }, prev: '¬(∀x ∈ ℝ ∃y ∈ ℝ, x + y = 0)', line: '∃x ∈ ℝ ∃y ∈ ℝ, x + y ≠ 0' },
    // Only one quantifier changed, or only one kept (the others changed).
    transform: (prev) => negations(prev, ['q']).flatMap(({ path, inner }) => {
      const { qs, body } = prefix(inner);
      if (qs.length < 2) return [];
      const only = qs.map((_, i) => ({
        node: replaceF(prev, path, build(qs.map((x, j) => (j === i ? { ...x, q: flip(x.q) } : x)), not(body))),
        ctx: { kept: qs.filter((x, j) => j !== i).map((x) => `${x.q}${x.bind.text}`).join(', ') },
      }));
      const kept = qs.length < 3 ? [] : qs.map((x, i) => ({
        node: replaceF(prev, path, build(qs.map((y, j) => (j === i ? y : { ...y, q: flip(y.q) })), not(body))),
        ctx: { kept: `${x.q}${x.bind.text}` },
      }));
      return [...only, ...kept];
    }),
    explain: (ctx = {}) => `Chaque quantificateur que la négation franchit change : ∀ devient ∃ et ∃ devient ∀.${ctx.kept ? ` Tu as gardé ${ctx.kept} tel quel.` : ''}`,
  },
  {
    id: 'g9_neg_pred_kept', family: 'logic', tag: 'E', skill: 'g9-negate', repair: 'g9-negate', judges: ['logic'],
    name: 'Quantificateurs changés, propriété pas niée',
    example: ['¬(∀x, x² ≥ 0) ≡ ∃x, x² ≥ 0', '¬(∀x, x² ≥ 0) ≡ ∃x, x² < 0'],
    check: { judge: { kind: 'logic', pieces: [{ text: 'x ∈ ℝ' }, { text: 'x^2 ≥ 0' }] }, prev: '¬(∀x ∈ ℝ, x^2 ≥ 0)', line: '∃x ∈ ℝ, x^2 ≥ 0' },
    transform: (prev, ctx) => negations(prev, ['q']).map(({ path, inner }) => {
      const { qs, body } = prefix(inner);
      return { node: replaceF(prev, path, build(qs.map((x) => ({ ...x, q: flip(x.q) })), body)), ctx: { body, cfg: ctx?.cfg } };
    }),
    explain: (ctx = {}) => `Les quantificateurs sont bien changés, mais la propriété à la fin doit être niée aussi${ctx.body && ctx.cfg ? ` : ${F(ctx, nnf(ctx.body, true))}` : ' : ¬(x² ≥ 0) donne x² < 0'}.`,
  },
  {
    id: 'g9_neg_restriction', family: 'logic', tag: 'E', skill: 'g9-negate', repair: 'g9-negate', judges: ['logic'],
    name: 'Restriction d\'un quantificateur niée (ε > 0 devenu ε ≤ 0)',
    example: ['¬(∀ε > 0, P) ≡ ∃ε ≤ 0, ¬P', '¬(∀ε > 0, P) ≡ ∃ε > 0, ¬P'],
    check: { judge: { kind: 'logic', pieces: [{ text: 'ε > 0' }, { text: 'ε ≤ 0' }, { text: '|u_n − L| < ε' }] }, prev: '¬(∀ε > 0, |u_n − L| < ε)', line: '∃ε ≤ 0, |u_n − L| ≥ ε' },
    transform: (prev) => negations(prev, ['q']).flatMap(({ path, inner }) => {
      const { qs, body } = prefix(inner);
      const negated = qs.map((x) => ({ q: flip(x.q), bind: negBind(x.bind) ?? x.bind }));
      if (negated.every((x, i) => x.bind === qs[i].bind)) return [];
      return [{ node: replaceF(prev, path, build(negated, not(body))), ctx: { bind: qs.find((x) => negBind(x.bind))?.bind.text } }];
    }),
    explain: (ctx = {}) => `${ctx.bind ? `« ${ctx.bind} »` : 'ε > 0'} dit où l'on cherche : ce n'est pas la propriété. La négation cherche encore au même endroit : ∃ε > 0, ¬P.`,
  },
  {
    id: 'g9_neg_strict', family: 'logic', tag: 'E', skill: 'g9-negate', repair: 'g9-connectives', judges: ['logic'],
    name: 'Négation d\'une inégalité stricte : > au lieu de ≥',
    example: ['¬(x < 3) ≡ x > 3', '¬(x < 3) ≡ x ≥ 3'],
    check: { judge: { kind: 'logic', pieces: [{ text: 'x < 3' }, { text: 'x > 3' }] }, prev: '¬(x < 3)', line: 'x > 3' },
    transform: (prev, ctx) => {
      if (!ctx?.cfg) return [];
      const lex = lexFor(ctx.cfg);
      const wrongNeg = (a) => (lex.atoms.get(a.key)?.table ? strictNeg(a, lex) ?? { ...a, neg: !a.neg } : { ...a, neg: !a.neg });
      const out = [];
      for (const { path, inner } of negations(prev, ['atom'])) {
        const w = strictNeg(inner, lex);
        if (w) out.push({ node: replaceF(prev, path, w), ctx: {} });
      }
      out.push({ node: nnf(prev, false, { atomNeg: wrongNeg }), ctx: {} });
      return out;
    },
    explain: () => 'Le contraire de « x < 3 » est « x ≥ 3 » : x = 3 ne vérifie pas x < 3, donc il vérifie la négation. De même, ¬(a ≤ b) donne a > b.',
  },
  {
    id: 'g9_proof_by_example', family: 'method', tag: 'R', skill: 'g9-counterexample', repair: 'g9-counterexample', judges: [],
    name: 'Preuve par des exemples',
    example: ['« vrai pour n = 1, 2, 3, donc pour tout n »', 'des exemples ne prouvent pas un « pour tout »'],
    check: { bait: { skill: 'g9-proof-contra', level: 2 } },
    explain: () => 'Des exemples ne prouvent pas un « pour tout ». n² + n + 41 est premier pour n = 0, 1, …, 39, mais pas pour n = 40 (40² + 40 + 41 = 41²).',
  },
  {
    id: 'g9_counter_not_hyp', family: 'logic', tag: 'E', skill: 'g9-counterexample', repair: 'g9-implication', judges: [],
    name: 'Contre-exemple qui ne vérifie pas l\'hypothèse',
    example: ['« x² > 4 ⇒ x > 2 » réfuté par x = 1', '« x² > 4 ⇒ x > 2 » réfuté par x = −3'],
    check: { counter: { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: 'x^2>4⇒x>2', hyp: 'x^2>4' }, answers: { x: '1' } },
    explain: () => 'Avec x = 1, l\'hypothèse x² > 4 est fausse : l\'implication est alors vraie. Un contre-exemple de « H ⇒ C » vérifie H et pas C : ici x² > 4 et x ≤ 2, par exemple x = −3.',
  },
  {
    id: 'g9_absurd_wrong_assumption', family: 'method', tag: 'E', skill: 'g9-proof-absurd', repair: 'g9-negate', judges: [],
    name: 'Par l\'absurde : on suppose l\'énoncé au lieu de sa négation',
    example: ['« Supposons √5 irrationnel »', '« Supposons √5 rationnel »'],
    check: { bait: { skill: 'g9-proof-absurd', level: 3 } },
    explain: () => 'Par l\'absurde, on suppose le contraire de ce qu\'on veut montrer, puis on arrive à une contradiction. Pour « √5 est irrationnel », on suppose √5 = p/q.',
  },
];
