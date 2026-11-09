// Proofs in blocks (spec §6 `blocks`, step U1): the student taps the blocks
// in an order that respects their `needs`. A decoy block (distractor: the
// id of a trap) is a mistake named by that trap. In the `frame` mode, some
// blocks hold a calculation to type, judged here.
//
// item = {type:'blocks', mode:'order'|'frame'|'define', blocks, goal, order}
// block = {id, html, needs:[ids], distractor?: ruleId, why?, orderRule?,
//          input?: {kind:'expr'|'rel', vars, expect, mod?, rem?, ask}}
//   expr: the typed expression must equal `expect`; with mod and rem, it
//         must also read mod·(…) + rem (n² = 2(2k² + 2k) + 1 is odd)
//   rel:  the typed relation must be the same equation as `expect`
//         (sides moved or multiplied by a number)
// placeBlock(item, placed, id, input?) → {kind:'ok'|'done'|'wrong'|'early'|'input'|'same', rule?, message?}

import { parse, tryParse } from '../cas/parse.js';
import { stripParen, sub } from '../cas/ast.js';
import { equivalent, seedOf } from '../cas/equiv.js';
import { polyOf, productFactors, sumTerms, leadCoeff } from '../cas/polyx.js';
import { exactValue } from '../cas/normal.js';

function checkInput(spec, text) {
  const node = tryParse(String(text ?? ''), { vars: spec.vars });
  if (!node) return { kind: 'input', message: 'Je n\'arrive pas à lire ta saisie.' };
  if (spec.kind === 'rel') {
    const n = stripParen(node);
    const want = stripParen(parse(spec.expect, { vars: spec.vars }));
    if (n.t !== 'rel' || n.op !== '=') return { kind: 'input', message: 'Écris une égalité.' };
    const a = polyOf(sub({ t: 'paren', e: n.l }, { t: 'paren', e: n.r }));
    const b = polyOf(sub({ t: 'paren', e: want.l }, { t: 'paren', e: want.r }));
    if (!a || !b || a.isZero) return { kind: 'wrong', message: 'Ce n\'est pas l\'égalité attendue.' };
    const v = [...b.vars()].sort()[0];
    const la = leadCoeff(a, v);
    const lb = leadCoeff(b, v);
    const prop = la?.isConst && lb?.isConst && a.scale(lb.constValue()).equals(b.scale(la.constValue()));
    return prop ? { kind: 'ok' } : { kind: 'wrong', message: 'Ce n\'est pas l\'égalité attendue : refais le calcul.' };
  }
  const want = parse(spec.expect, { vars: spec.vars });
  const domain = Object.fromEntries((spec.vars || []).map((v) => [v, { int: [-9, 9] }]));
  const r = equivalent(node, want, { vars: spec.vars, domain, seed: seedOf(spec.expect) });
  if (!r.equal) return { kind: 'wrong', message: 'Ton calcul n\'est pas égal à l\'expression de départ.' };
  if (spec.mod) {
    const terms = sumTerms(node);
    const consts = terms.filter((t) => exactValue(t) !== null);
    const others = terms.filter((t) => exactValue(t) === null);
    const rem = consts.reduce((s, t) => s + exactValue(t).valueOf(), 0);
    const okShape = others.length === 1 && productFactors(others[0]).coef.eq(spec.mod) && rem === spec.rem;
    if (!okShape) return { kind: 'stay', message: `C'est juste, mais écris-le sous la forme ${spec.mod}·(…) + ${spec.rem} pour voir le reste de la division par ${spec.mod}.` };
  }
  return { kind: 'ok' };
}

export function placeBlock(item, placed, id, input) {
  const b = item.blocks.find((x) => x.id === id);
  if (!b) return { kind: 'wrong', message: 'Bloc inconnu.' };
  if (placed.includes(id)) return { kind: 'same', message: 'Ce bloc est déjà placé.' };
  if (b.distractor) return { kind: 'wrong', rule: b.distractor, message: b.why || 'Ce bloc ne fait pas partie de la preuve.' };
  const missing = (b.needs || []).filter((n) => !placed.includes(n));
  if (missing.length) {
    return { kind: 'early', rule: b.orderRule ?? null, message: b.earlyWhy || 'Pas encore : ce bloc s\'appuie sur un bloc qui n\'est pas encore placé.' };
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
