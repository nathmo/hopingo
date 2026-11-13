import { test } from 'node:test';
import assert from 'node:assert/strict';
import { weekStart, addDays, weeklyRanking, groupFlame, weeklyQuest, members } from '../js/engine/social.js';

// 2026-11-02 is a Monday.
const MON = '2026-11-02';
const week = (k) => addDays(MON, 7 * k);

let n = 0;
// A profile that played `xp` on each given day.
const kid = (name, days = {}, extra = {}) => ({ id: `p${n++}`, name, avatar: '🦊', xp: Object.values(days).reduce((s, x) => s + x, 0), xpByDay: { ...days }, ...extra });
// XP on the Wednesday of each week index.
const weeks = (...ks) => Object.fromEntries(ks.map((k) => [addDays(week(k), 2), 20]));

test('weekStart gives the Monday, also across a month', () => {
  assert.equal(weekStart('2026-11-02'), '2026-11-02');
  assert.equal(weekStart('2026-11-08'), '2026-11-02'); // Sunday
  assert.equal(weekStart('2026-11-09'), '2026-11-09');
  assert.equal(weekStart('2026-11-01'), '2026-10-26');
});

test('weekly ranking counts only this week and shares ranks on ties', () => {
  const a = kid('Alba', { [addDays(MON, -1)]: 500, [MON]: 10 }); // big Sunday last week
  const b = kid('Bea', { [addDays(MON, 1)]: 40 });
  const c = kid('Cyril', { [addDays(MON, 6)]: 40 });
  const rows = weeklyRanking([a, b, c], addDays(MON, 6));
  assert.deepEqual(rows.map((r) => [r.profile.name, r.xp, r.rank]), [['Bea', 40, 1], ['Cyril', 40, 1], ['Alba', 10, 3]]);
  // Next Monday everyone starts again at 0.
  assert.ok(weeklyRanking([a, b, c], week(1)).every((r) => r.xp === 0));
});

test('the tester profile is not on the board', () => {
  const tester = kid('nathmo', weeks(0), { avatar: '🐝' });
  assert.deepEqual(members([kid('Alba'), tester]).map((p) => p.name), ['Alba']);
});

test('the flame grows each week everyone played; the current week is never judged', () => {
  const a = kid('Alba', weeks(0, 1, 2));
  const b = kid('Bea', weeks(0, 1));
  const f = groupFlame([a, b], addDays(week(2), 3));
  assert.equal(f.weeks, 2);
  assert.equal(f.last, 'grew');
  assert.deepEqual(f.done.map((p) => p.name), ['Alba']);
  assert.deepEqual(f.missing.map((p) => p.name), ['Bea']);
});

test('a holiday week nobody played neither counts nor breaks', () => {
  const a = kid('Alba', weeks(0, 2));
  const b = kid('Bea', weeks(0, 2));
  const f = groupFlame([a, b], week(3));
  assert.equal(f.weeks, 2);
});

test('a week where one active member did not play puts the flame out', () => {
  const a = kid('Alba', weeks(0, 1, 2));
  const b = kid('Bea', weeks(0, 1));
  const f = groupFlame([a, b], week(3));
  assert.equal(f.weeks, 0);
  assert.equal(f.best, 2);
  assert.equal(f.last, 'lost');
});

test('a sauve-flamme is earned every 4 weeks (2 at most) and used by a failed week', () => {
  const all = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const a = kid('Alba', weeks(...all, 12, 13, 14));
  const b = kid('Bea', weeks(...all));
  let f = groupFlame([a, b], week(12));
  assert.equal(f.weeks, 12);
  assert.equal(f.saves, 2); // 3 earned, capped at 2
  f = groupFlame([a, b], week(13));
  assert.equal(f.weeks, 12);
  assert.equal(f.saves, 1);
  assert.equal(f.last, 'saved');
  f = groupFlame([a, b], week(14));
  assert.equal(f.saves, 0);
  assert.equal(f.weeks, 12);
  // Bea hasn't played for 3 weeks: she no longer counts, the flame grows again.
  f = groupFlame([a, b], week(15));
  assert.equal(f.weeks, 13);
  assert.equal(f.last, 'grew');
});

test('a newcomer counts from the week they first play', () => {
  const a = kid('Alba', weeks(0, 1, 2));
  const b = kid('Bea', weeks(2));
  assert.equal(groupFlame([a, b], week(3)).weeks, 3);
});

test('the common quest is 150 XP per active member', () => {
  const a = kid('Alba', { [MON]: 100 });
  const b = kid('Bea', { [addDays(MON, 2)]: 80 });
  const gone = kid('Old', { [addDays(MON, -60)]: 50 });
  assert.deepEqual(weeklyQuest([a, b, gone], addDays(MON, 3)), { target: 300, done: 180 });
});

test('no history at all: an empty flame', () => {
  const f = groupFlame([kid('Alba'), kid('Bea')], MON);
  assert.deepEqual([f.weeks, f.saves, f.done.length, f.missing.length], [0, 0, 0, 0]);
});
