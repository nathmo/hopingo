// Proofs in blocks (spec §6 `blocks`, step U1): the student taps the blocks
// in an order that respects their `needs`. A decoy block (distractor: the
// id of a trap) is a mistake named by that trap. In the `frame` mode, some
// blocks hold a calculation to type, judged here.
//
// item = {type:'blocks', mode:'order'|'frame'|'define', blocks, goal, order}
// block = {id, html, needs:[ids], distractor?: ruleId, why?, orderRule?,
//          input?: {kind:'expr'|'rel', vars, expect, mod?, rem?, ask}}
//   expr: the typed expression must equal `expect` (on spec.domain, by
//         default whole numbers in [−9 ; 9]); with mod and rem, it
//         must also read mod·(…) + rem (n² = 2(2k² + 2k) + 1 is odd)
//   rel:  the typed relation must be the same equation as `expect`
//         (sides moved or multiplied by a number)
//   delta (step U4): {kind:'delta', cfg, answer, ask, keys?, rule?}: x(ε) or
//         δ(ε), judged by judges/delta.js (deltaCheck) with cfg
// placeBlock(item, placed, id, input?) → {kind:'ok'|'done'|'wrong'|'early'|'input'|'same', rule?, message?}

import { parse, tryParse } from '../cas/parse.js';
import { stripParen, sub } from '../cas/ast.js';
import { equivalent, seedOf } from '../cas/equiv.js';
import { polyOf, productFactors, sumTerms } from '../cas/polyx.js';
import { exactValue } from '../cas/normal.js';
import { deltaCheck } from './delta.js';
import { t as tr } from '../i18n.js';

function checkInput(spec, text) {
  // Step U4: x(ε) or δ(ε) of a proof by the definition (judge delta).
  if (spec.kind === 'delta') {
    const r = deltaCheck(spec.cfg, String(text ?? ''));
    if (r.ok) return { kind: 'ok' };
    if (r.parse) return { kind: 'input', message: tr("Je n'arrive pas à lire ta saisie.") };
    return { kind: 'wrong', rule: r.rule ?? spec.rule ?? null, message: r.message };
  }
  const node = tryParse(String(text ?? ''), { vars: spec.vars });
  if (!node) return { kind: 'input', message: tr('Je n\'arrive pas à lire ta saisie.') };
  if (spec.kind === 'rel') {
    const n = stripParen(node);
    const want = stripParen(parse(spec.expect, { vars: spec.vars }));
    if (n.t !== 'rel' || n.op !== '=') return { kind: 'input', message: tr('Écris une égalité.') };
    const a = polyOf(sub({ t: 'paren', e: n.l }, { t: 'paren', e: n.r }));
    const b = polyOf(sub({ t: 'paren', e: want.l }, { t: 'paren', e: want.r }));
    if (!a || !b || a.isZero) return { kind: 'wrong', message: tr('Ce n\'est pas l\'égalité attendue.') };
    // Proportional: compare the coefficients of one monomial of b (works
    // with several letters, (a − b)(ab − 4) = 0, step U1b).
    const [key, tb] = [...b.terms.entries()][0];
    const ta = a.terms.get(key);
    const prop = !!ta && a.scale(tb.c).equals(b.scale(ta.c));
    return prop ? { kind: 'ok' } : { kind: 'wrong', message: tr('Ce n\'est pas l\'égalité attendue : refais le calcul.') };
  }
  const want = parse(spec.expect, { vars: spec.vars });
  // spec.domain: {n: {int: [1, 8]}, x: [0.5, 1.5]} (default: whole numbers in [−9 ; 9]).
  const domain = { ...Object.fromEntries((spec.vars || []).map((v) => [v, { int: [-9, 9] }])), ...(spec.domain || {}) };
  const r = equivalent(node, want, { vars: spec.vars, domain, seed: seedOf(spec.expect) });
  if (!r.equal) return { kind: 'wrong', message: tr('Ton calcul n\'est pas égal à l\'expression de départ.') };
  if (spec.mod) {
    const terms = sumTerms(node);
    const consts = terms.filter((t) => exactValue(t) !== null);
    const others = terms.filter((t) => exactValue(t) === null);
    const rem = consts.reduce((s, t) => s + exactValue(t).valueOf(), 0);
    const okShape = others.length === 1 && productFactors(others[0]).coef.eq(spec.mod) && rem === spec.rem;
    if (!okShape) return { kind: 'stay', message: tr('C\'est juste, mais écris-le sous la forme {mod}·(…) + {rem} pour voir le reste de la division par {mod}.', { mod: spec.mod, rem: spec.rem }) };
  }
  return { kind: 'ok' };
}

export function placeBlock(item, placed, id, input) {
  const b = item.blocks.find((x) => x.id === id);
  if (!b) return { kind: 'wrong', message: tr('Bloc inconnu.') };
  if (placed.includes(id)) return { kind: 'same', message: tr('Ce bloc est déjà placé.') };
  if (b.distractor) return { kind: 'wrong', rule: b.distractor, message: b.why || tr('Ce bloc ne fait pas partie de la preuve.') };
  const missing = (b.needs || []).filter((n) => !placed.includes(n));
  if (missing.length) {
    return { kind: 'early', rule: b.orderRule ?? null, message: b.earlyWhy || tr('Pas encore : ce bloc s\'appuie sur un bloc qui n\'est pas encore placé.') };
  }
  if (b.input) {
    if (input === undefined) return { kind: 'input', ask: b.input.ask };
    const r = checkInput(b.input, input);
    if (r.kind !== 'ok') return r;
  }
  return { kind: id === item.goal ? 'done' : 'ok' };
}

// Replays the reference order (tests): every block is accepted, the last is the goal.
export function checkBlocks(item) {
  const placed = [...(item.placed || [])];
  for (const id of item.order) {
    const b = item.blocks.find((x) => x.id === id);
    const v = placeBlock(item, placed, id, b?.input ? b.input.answer : undefined);
    if (v.kind !== 'ok' && v.kind !== 'done') return { ok: false, at: id, v };
    placed.push(id);
    if (v.kind === 'done') return { ok: placed.length === item.order.length + (item.placed?.length || 0), placed };
  }
  return { ok: false, at: 'end' };
}
