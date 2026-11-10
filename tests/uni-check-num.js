// Checks of the item types of module N (step U9), called by
// tests/uni-check.js: `code` (the reference passes its tests; every trap,
// every wrong option and each hole's `wrong` fail; a typical wrong hole is
// refused, and a known trap typed in a hole is named) and `readtable` (a
// table of equal rows, then its question checked as an item).
import assert from 'node:assert/strict';
import { checkCodeItem, judgeCode } from '../js/judges/code.js';

export function checkCode(it, where, checkItem) {
  assert.equal(it.lang, 'python', where);
  assert.equal((it.source.match(/\?\?\?/g) || []).length, it.holes.length, `${where}: one ??? per hole`);
  assert.ok(it.tests.length >= 1, `${where}: tests`);
  const r = checkCodeItem(it);
  assert.ok(r.ok, `${where}: ${r.why}`);
  // The reference, as the student would give it (an option's index for a choice).
  const ref = it.holes.map((h) => (h.options ? h.options.findIndex((o) => o.correct) : h.answer));
  for (const h of it.holes.filter((x) => x.options)) {
    assert.equal(h.options.filter((o) => o.correct).length, 1, `${where}: one right option`);
    assert.equal(new Set(h.options.map((o) => o.text)).size, h.options.length, `${where}: duplicate options`);
    assert.ok(h.options.length >= 3, `${where}: a choice hole has at least 3 options`);
  }
  assert.ok(judgeCode(it, ref).ok, `${where}: reference refused`);
  // A typical wrong hole: the first trap (or wrong option), else the hole
  // plus 1.
  const k = 0;
  const h = it.holes[k];
  const trap = (h.options || []).find((o) => !o.correct && o.rule) || (h.traps || [])[0];
  const wrongText = trap?.text ?? (h.options ? h.options.find((o) => !o.correct).text : h.wrong ?? `(${h.answer}) + 1`);
  const bad = ref.slice();
  bad[k] = h.options ? h.options.findIndex((o) => o.text === wrongText) : wrongText;
  const v = judgeCode(it, bad);
  assert.equal(v.ok, false, `${where}: wrong hole « ${wrongText} » accepted`);
  if (trap?.rule) assert.equal(v.rule, trap.rule, `${where}: trap ${trap.rule} not named`);
  if (it.then) checkItem(it.then, `${where} (puis)`);
}

export function checkReadtable(it, where, checkItem) {
  if (it.table) {
    assert.ok(it.table.columns.length >= 1 && it.table.rows.length >= 1, `${where}: table`);
    for (const r of it.table.rows) assert.equal(r.length, it.table.columns.length, `${where}: row length`);
  }
  const q = it.question;
  assert.ok(q && q.type, `${where}: question`);
  if (q.type === 'mcq' && q.multi) {
    assert.ok(q.options.some((o) => o.correct), `${where}: a right option`);
    assert.ok(q.options.some((o) => !o.correct), `${where}: a wrong option`);
  }
  checkItem(q, `${where} (question)`);
}
