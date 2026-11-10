// Traps of module A2, part f (step U6): double and triple integrals by
// Fubini, describing a domain, changing the order, changing variables.
// The table itself is META in rules/a2.js; explain() falls back on the
// catalogue's text, its {…} filled from ctx.
//
// Fields the generators put in the judge's configuration:
//   domain lines: cfg.answers = [texts of the right descriptions] (the
//     bounds named by a2_domain_curve_order and a2_fubini_swap_same);
//   change of variables: cfg.cv = {jac: '2v' (det ∂(u, v)/∂(x, y), in u,
//     v), wrong: 'int(int(u×2v, v, 1, 3), u, 1, 4)' (the integral with
//     that factor instead of its inverse)}.
// a2_fubini_outer_var is named by the `domain` judge itself (an inner
// letter in an outer bound); the verdict traps (a symmetry used on a
// domain that is not symmetric, D̃ = G(D)) are multiple-choice options.

import { parse } from '../parse.js';
import { toText, toReadable } from '../print.js';
import { stripParen, mapNode } from '../ast.js';
import { evalFloat } from '../numeric.js';

const fr = (x) => String(Number(x.toFixed(2))).replace('.', ',').replace('-', '−');

// A domain line → [{v, lo, hi, op}] (chains « lo ≤ v ≤ hi », in order), or null.
function chains(node) {
  const n = stripParen(node);
  const items = n.t === 'list' ? n.items : [n];
  const out = [];
  for (let it of items) {
    it = stripParen(it);
    if (it.t !== 'chain' || it.items.length !== 3) return null;
    const mid = stripParen(it.items[1]);
    if (mid.t !== 'sym') return null;
    const up = it.ops.every((o) => o === '≤' || o === '<');
    const down = it.ops.every((o) => o === '≥' || o === '>');
    if (!up && !down) return null;
    const [lo, hi] = up ? [it.items[0], it.items[2]] : [it.items[2], it.items[0]];
    out.push({ v: mid.name, lo, hi });
  }
  return out;
}
const lineOf = (cs) => ({ t: 'list', items: cs.map((c) => ({ t: 'chain', items: [c.lo, { t: 'sym', name: c.v }, c.hi], ops: ['≤', '≤'] })) });
const readAll = (texts = []) => texts.map((t) => { try { return chains(parse(t)); } catch { return null; } }).filter((c) => c && c.length >= 2);

// The letters a and b swapped everywhere in a node.
const rename = (node, a, b) => mapNode(node, (n) => (n.t === 'sym' && !n.sub && (n.name === a || n.name === b) ? { ...n, name: n.name === a ? b : a } : n));

export const DEFS = {
  a2_symmetry_wrong: {
    name: 'Symétrie sur un domaine qui n\'est pas symétrique',
    judges: [],
    wrongValues: () => [{ value: '0' }],
    explain: (ctx = {}) => (ctx.f
      ? `${ctx.f} est impaire en ${ctx.v}, mais D va de ${ctx.a} à ${ctx.b} en ${ctx.v} : ce n'est pas symétrique.`
      : 'Une fonction impaire en y ne donne 0 que si le domaine est symétrique par rapport à y = 0 : les deux conditions sont nécessaires.'),
    check: { bait: { skill: 'a2-fubini-rect', exam: 'tf' } },
  },

  a2_fubini_outer_var: {
    name: 'Borne extérieure qui dépend de la variable intérieure',
    judges: ['domain'],
    explain: (ctx = {}) => `L'intégrale extérieure doit donner un nombre : ses bornes ne peuvent pas dépendre de ${ctx.v || 'la variable intérieure'}.`,
    check: {
      judge: { kind: 'domain', coords: 'cart', vars: ['x', 'y'], region: ['y ≥ x^2', 'y ≤ 2x'], box: [[-0.5, 2.5], [-0.5, 4.5]], order: ['y', 'x'], shape: 'typeII' },
      prev: '0 ≤ x ≤ 2 ; x^2 ≤ y ≤ 2x',
      line: 'x^2 ≤ y ≤ 2x ; 0 ≤ x ≤ 2',
    },
  },

  // The order changed by renaming: x ↔ y in every bound.
  a2_fubini_swap_same: {
    name: 'Ordre changé en renommant les variables',
    judges: ['domain'],
    transform: (prev, ctx = {}) => {
      const cs = chains(prev);
      if (!cs || cs.length !== 2) return [];
      const [a, b] = [cs[0].v, cs[1].v];
      const right = readAll(ctx.cfg?.answers).find((r) => r[0].v === b);
      const c = right ? { a: toReadable(right[1].lo), b: toReadable(right[1].hi), v: b } : { v: b };
      return [{ node: rename(lineOf(cs), a, b), ctx: c }];
    },
    explain: (ctx = {}) => (ctx.a
      ? `Renommer ne suffit pas : dessine D. Pour ${ctx.v === 'x' ? 'x' : 'y'} fixé, ${ctx.v === 'x' ? 'y' : 'x'} va de ${ctx.a} à ${ctx.b}.`
      : 'Renommer les variables ne suffit pas : dessine D, puis lis ses bornes dans l\'autre ordre.'),
    check: {
      judge: { kind: 'domain', coords: 'cart', vars: ['x', 'y'], region: ['y ≥ x^2', 'y ≤ 1', 'x ≥ 0'], box: [[-0.3, 1.3], [-0.3, 1.3]], order: ['y', 'x'], shape: 'typeII', answers: ['0 ≤ y ≤ 1 ; 0 ≤ x ≤ √y'] },
      prev: '0 ≤ x ≤ 1 ; x^2 ≤ y ≤ 1',
      line: '0 ≤ y ≤ 1 ; y^2 ≤ x ≤ 1',
    },
  },

  // The lower and upper curves swapped (the right descriptions first, so
  // that the explanation names their curves, then the previous line).
  a2_domain_curve_order: {
    name: 'Courbes du haut et du bas inversées',
    judges: ['domain'],
    transform: (prev, ctx = {}) => {
      const out = [];
      const from = [...readAll(ctx.cfg?.answers), ...(chains(prev)?.length >= 2 ? [chains(prev)] : [])];
      for (const cs of from) {
        const [o, ...inner] = cs;
        const mid = evalFloat(parse(`(${toText(o.lo)}+${toText(o.hi)})/2`), {});
        const first = inner[0];
        const c = {
          'x₁': toReadable(o.lo), 'x₂': toReadable(o.hi), haut: `${first.v} = ${toReadable(first.hi)}`, bas: `${first.v} = ${toReadable(first.lo)}`,
          ...(Number.isFinite(mid) ? { xt: `${o.v} = ${fr(mid)}` } : {}),
        };
        out.push({ node: lineOf([o, ...inner.map((x) => ({ ...x, lo: x.hi, hi: x.lo }))]), ctx: c });
      }
      return out;
    },
    explain: (ctx = {}) => (ctx.haut
      ? `Entre ${ctx['x₁']} et ${ctx['x₂']}, ${ctx.haut} est au-dessus de ${ctx.bas} : la borne du bas est ${ctx.bas}.${ctx.xt ? ` Teste ${ctx.xt}.` : ''}`
      : 'Les bornes intérieures sont inversées : en bas la courbe du dessous, en haut celle du dessus. Teste une valeur de la variable extérieure.'),
    check: {
      judge: { kind: 'domain', coords: 'cart', vars: ['x', 'y'], region: ['y ≥ x^2', 'y ≤ 2x'], box: [[-0.5, 2.5], [-0.5, 4.5]], order: ['x', 'y'], shape: 'typeI', answers: ['0 ≤ x ≤ 2 ; x^2 ≤ y ≤ 2x'] },
      prev: 'y ≥ x^2 ; y ≤ 2x',
      line: '0 ≤ x ≤ 2 ; 2x ≤ y ≤ x^2',
    },
  },

  // |det J_G| = 1/|det ∂(u, v)/∂(x, y)|: the factor written without its
  // inverse (the J line of an equiv part, or the rewritten integral).
  a2_jacobian_inverse: {
    name: 'Jacobien de la réciproque pas inversé',
    judges: ['equiv', 'definite'],
    transform: (prev, ctx = {}) => {
      const cv = ctx.cfg?.cv;
      if (!cv) return [];
      const c = { J: toReadable(parse(cv.jac)) };
      if (ctx.cfg.kind === 'definite') return cv.wrong ? [{ node: parse(cv.wrong), ctx: c }] : [];
      return [{ node: { t: 'frac', n: parse('1'), d: { t: 'paren', e: prev } }, ctx: c }, { node: parse(cv.jac), ctx: c }];
    },
    explain: (ctx = {}) => (ctx.J
      ? `Tu as calculé ∂(u, v)/∂(x, y) = ${ctx.J}. La formule demande l'inverse : dx dy = du dv/|${ctx.J}|.`
      : 'Le jacobien ∂(u, v)/∂(x, y) est celui de G⁻¹. La formule demande celui de G, son inverse : dx dy = du dv/|∂(u, v)/∂(x, y)|.'),
    check: {
      judge: { kind: 'equiv', vars: ['x', 'y', 'u', 'v', 'J'], subst: { u: 'x y', v: 'y/x', J: 'x/(2y)' }, domain: { x: [0.5, 2], y: [0.5, 2] }, cv: { jac: '2v' } },
      prev: 'J',
      line: '2v',
    },
  },

  a2_changevar_domain_direction: {
    name: 'D̃ = G(D) au lieu de G⁻¹(D)',
    judges: [],
    wrongValues: () => [{ value: 'G(D)' }],
    check: { bait: { skill: 'a2-change-var', exam: 'mcq' } },
  },
};
