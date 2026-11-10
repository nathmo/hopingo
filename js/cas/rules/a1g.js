// Traps of module A1, part g (step U4): squeeze, 1^∞ forms, ratio test,
// monotone sequences, lim sup. Catalogue: docs/universite/A1-analyse-1.md,
// « Pièges du module ».
//
// Fields the generators put in the judge's configuration (ctx.cfg):
//   other    (equiv, bound lines with rel and squeeze) the other bound of
//            the squeeze: written where this one is asked, it is
//            a1_squeeze_wrong_direction
//   supTerms (value, lim sup) the sup of the terms, a1_limsup_as_sup
// The traps on verdicts (« elle est bornée, donc elle converge », bounds of
// different limits) are decision options, multiple-choice options and
// true/false statements (check: {bait}).

import { parse } from '../parse.js';
import { walk, replaceAt, stripParen, dependsOn } from '../ast.js';
import { substVar } from '../diff.js';
import { evalFloat } from '../numeric.js';
import { limit } from '../limit.js';
import { toText } from '../print.js';

const P = (t, v = 'n') => parse(t, { vars: [v] });
const par = (e) => ({ t: 'paren', e });
const isFact = (n) => n.t === 'fn' && n.name === 'fact' && n.args.length === 1;
const limAt = (node, cfg) => {
  try { return limit(node, cfg.v || 'n', '+inf', undefined, { discrete: !!cfg.discrete }).value; } catch { return null; }
};

export const RULES = [
  {
    id: 'a1_squeeze_wrong_direction', family: 'sign', tag: 'C', skill: 'a1-seq-squeeze', repair: 'g1-bound', judges: ['equiv'],
    name: 'Minorant et majorant échangés',
    example: ['Sₙ ≤ n²/(n² + n)', 'Sₙ ≥ n²/(n² + n)'],
    check: {
      judge: { kind: 'equiv', vars: ['n'], from: 1, rel: '≤', squeeze: { L: '1' }, other: 'n^2/(n^2+n)' },
      prev: 'sum(n/(n^2+k),k,1,n)', line: 'n^2/(n^2+n)',
    },
    transform: (prev, ctx) => {
      const c = ctx?.cfg;
      if (!c?.squeeze || !c.other || !c.rel) return [];
      return [{ node: P(c.other), ctx: { other: c.other, rel: c.rel } }];
    },
    explain: (ctx = {}) => (ctx.rel
      ? `Tu as écrit l'autre borne : elle est ${ctx.rel === '≤' ? 'plus petite que la suite, c\'est un minorant' : 'plus grande que la suite, c\'est un majorant'}. Pour majorer, prends le terme le plus grand ; pour minorer, le plus petit.`
      : 'Minorant et majorant sont échangés : pour majorer une fraction positive, on prend le plus petit dénominateur ; pour minorer, le plus grand.'),
  },
  {
    id: 'a1_squeeze_different_limits', family: 'method', tag: 'C', skill: 'a1-seq-squeeze', repair: 'a1-seq-squeeze', judges: [],
    name: 'Gendarmes avec deux bornes de limites différentes',
    example: ['0 ≤ bₙ ≤ 2 ⇒ « bₙ converge »', 'des bornes qui ont la même limite'],
    check: { bait: { skill: 'a1-seq-squeeze', level: 2 } },
    explain: (ctx = {}) => (ctx.L1 !== undefined
      ? `Tes bornes tendent vers ${ctx.L1} et ${ctx.L2} : elles ne coincent pas la suite. Cherche des bornes plus serrées.`
      : 'Deux bornes de limites différentes ne coincent pas la suite : 1 + (−1)ⁿ est entre 0 et 2 sans converger. Il faut deux bornes de même limite.'),
  },
  {
    id: 'a1_sum_n_terms_as_one', family: 'meaning', tag: 'E', skill: 'a1-seq-squeeze', repair: 'g5-sigma', judges: ['equiv'],
    name: 'Une somme de n termes majorée par un seul terme',
    example: ['Σ_{k=1}^{n} n/(n² + k) ≤ n/(n² + 1)', 'Σ_{k=1}^{n} n/(n² + k) ≤ n·n/(n² + 1)'],
    check: { judge: { kind: 'equiv', vars: ['n'], from: 1, rel: '≤' }, prev: 'sum(n/(n^2+k),k,1,n)', line: 'n/(n^2+1)' },
    // A Σ up to n replaced by its first or its last term alone.
    transform: (prev, ctx) => {
      if (!ctx?.cfg?.rel) return [];
      const v = ctx.v || 'n';
      const out = [];
      walk(prev, (n, path) => {
        if (n.t === 'sum' && dependsOn(n.hi, v)) {
          for (const at of [n.lo, n.hi]) {
            const term = substVar(n.e, n.k, par(at));
            out.push({ node: replaceAt(prev, path, par(term)), ctx: { term: toText(term) } });
          }
          return false;
        }
        return true;
      });
      return out;
    },
    explain: (ctx = {}) => `Il y a n termes${ctx.term ? `, chacun au plus ${ctx.term}` : ''} : la somme est au plus n fois le plus grand terme, pas le terme seul.`,
  },
  {
    id: 'a1_indet_one_inf', family: 'rule', tag: 'E', skill: 'a1-seq-1inf', repair: 'a1-seq-1inf', judges: ['limit'],
    name: '1^∞ pris pour 1',
    example: ['(1 + 2/n)ⁿ → 1', '(1 + 2/n)ⁿ = e^(n·Log(1 + 2/n)) → e²'],
    check: { judge: { kind: 'limit', v: 'n', to: '+∞', discrete: true }, prev: '(1+2/n)^n', line: '1' },
    // u^v with u → 1 and v → ∞: the base replaced by its limit 1.
    transform: (prev, ctx) => {
      const cfg = ctx?.cfg || {};
      const v = cfg.v || ctx?.v || 'n';
      const s = stripParen(prev);
      if (s.t !== 'pow' || !dependsOn(s.e, v) || !dependsOn(s.b, v)) return [];
      const b = limAt(s.b, cfg);
      const e = limAt(s.e, cfg);
      if (b === null || typeof b === 'string' || Math.abs(Number(b.valueOf ? b.valueOf() : b) - 1) > 1e-9) return [];
      if (e !== '+inf' && e !== '-inf') return [];
      return [{ node: P('1'), ctx: { u: toText(s.b), w: toText(s.e) } }];
    },
    explain: (ctx = {}) => `1^∞ est indéterminé : la base tend vers 1, mais l'exposant explose${ctx.u ? ` (${ctx.w})` : ''}. Écris e^(exposant·Log(base)), avec Log(1 + h) ≈ h.`,
  },
  {
    id: 'a1_factorial_ratio', family: 'facts', tag: 'E', skill: 'a1-seq-ratio', repair: 'a1-seq-ratio', judges: ['equiv'],
    name: '(m + k)!/m! simplifié en un seul facteur',
    example: ['(2n + 2)!/(2n)! = 2n + 2', '(2n + 2)!/(2n)! = (2n + 2)(2n + 1)'],
    check: {
      judge: { kind: 'equiv', vars: ['n'], domain: { n: { int: [1, 12] } } },
      prev: '3^(n+1)((n+1)!)^2(2n)!/((2n+2)!×3^n×(n!)^2)', line: '3^(n+1)(n+1)^2(2n)!/((2n+2)(2n)!×3^n)',
    },
    // A! next to B! with A − B = k ≥ 2: A! read as A·B!.
    transform: (prev, ctx) => {
      const v = ctx?.v || 'n';
      const facts = [];
      walk(prev, (n, path) => { if (isFact(n)) facts.push({ n, path }); return true; });
      if (facts.length < 2) return [];
      const out = [];
      for (const a of facts) {
        for (const b of facts) {
          if (a === b) continue;
          const k = [1, 2, 5].map((x) => evalFloat(a.n.args[0], { [v]: x }) - evalFloat(b.n.args[0], { [v]: x }));
          if (!k.every((x) => x === k[0]) || !Number.isInteger(k[0]) || k[0] < 2) continue;
          const wrong = { t: 'bin', op: '×', l: par(a.n.args[0]), r: b.n };
          out.push({ node: replaceAt(prev, a.path, par(wrong)), ctx: { A: toText(a.n.args[0]), B: toText(b.n.args[0]), k: k[0] } });
        }
      }
      return out;
    },
    explain: (ctx = {}) => (ctx.A
      ? `Entre (${ctx.B})! et (${ctx.A})!, il y a ${ctx.k} facteurs, pas un seul : (${ctx.A})! = (${ctx.A})·…·(${ctx.B} + 1)·(${ctx.B})!.`
      : 'Entre (2n)! et (2n + 2)!, il y a deux facteurs : (2n + 2)!/(2n)! = (2n + 2)(2n + 1).'),
  },
  {
    id: 'a1_bounded_implies_convergent', family: 'meaning', tag: 'C', skill: 'a1-seq-monotone', repair: 'a1-seq-monotone', judges: [],
    name: 'Bornée, donc convergente',
    example: ['« (aₙ) est bornée, donc elle converge »', '(aₙ) monotone et bornée, donc elle converge'],
    check: { bait: { skill: 'a1-seq-monotone', level: 2 } },
    explain: () => '(−1)ⁿ est bornée et ne converge pas. Il faut aussi la monotonie (ou deux bornes de même limite).',
  },
  {
    id: 'a1_limsup_as_sup', family: 'meaning', tag: 'E', skill: 'a1-seq-limsup', repair: 'a1-seq-limsup', judges: ['value'],
    name: 'lim sup confondue avec le sup des termes',
    example: ['lim sup aₙ = sup des termes = 5/2', 'lim sup aₙ = limite de la plus haute sous-suite = 1'],
    check: { judge: { kind: 'value', expect: '1', supTerms: '5/2' }, prev: 'L', line: '5/2' },
    transform: (prev, ctx) => {
      const s = ctx?.cfg?.supTerms;
      return s ? [{ node: parse(String(s)), ctx: { s } }] : [];
    },
    explain: (ctx = {}) => `Le sup${ctx.s ? ` (${ctx.s.replace('-', '−')})` : ''} peut être atteint au début ; la lim sup ne regarde que les n grands : c'est la plus grande limite d'une sous-suite.`,
  },
];
