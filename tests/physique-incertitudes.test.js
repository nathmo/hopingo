// Unit « Fourchettes et pire cas » (rg-in-problem is tested with the problems): every skill, levels 1 to 5, 60 items each.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { GEN } from '../js/content/physique/incertitudes.js';
import RULES from '../js/content/physique/rules-incertitudes.js';
import { PHYS_FAMILIES } from '../js/content/physique/rules.js';
import { PHYS_SKILLS } from '../js/content/physique/skills.js';
import { typed } from '../js/content/physique/format.js';
import { makeRng } from '../js/content/random.js';
import { RULE_BY_ID } from '../js/math/malrules.js';
import { CHECKERS } from '../js/math/checkers.js';
import { judgeAnswer } from '../js/math/judge.js';
import { parse, evaluate } from '../js/math/expr.js';
import { SKILL_BY_ID } from '../js/content/skills.js';
import { planKeys } from '../js/ui/keys-needed.js';
import { parseUnit } from '../js/physics/units.js';
import { baseText } from '../js/content/physique/outils.js';

const UNIT = 'incertitudes';
const SKILLS = PHYS_SKILLS.filter((s) => s.unit === UNIT && s.id !== 'rg-in-problem').map((s) => s.id);
const N = 60;

// The digit block of a 6-wide custom keypad.
const aligned = (keys) => {
  const pos = (k) => { const i = keys.indexOf(k); return i < 0 ? null : [Math.floor(i / 6), i % 6]; };
  const p = Object.fromEntries('123456789'.split('').map((d) => [d, pos(d)]));
  if (Object.values(p).some((x) => !x)) return true;
  const [r, c] = p['7'];
  return ['789', '456', '123'].every((row, k) => row.split('').every((d, i) => p[d][0] === r + k && p[d][1] === c + i));
};

function checkItem(it, skill, where) {
  assert.equal(it.skill, skill, where);
  assert.ok(it.prompt, where);
  assert.ok(!it.prompt.includes('{'), `${where}: unfilled ${it.prompt}`);
  assert.ok(it.key?.startsWith(`${skill}:`), where);
  for (const b of it.baits) assert.ok(RULE_BY_ID[b], `${where}: unknown bait ${b}`);
  for (const l of it.solution || []) assert.ok('html' in l && 'note' in l, `${where}: solution line`);
  if (it.type === 'mcq') {
    assert.equal(it.options.filter((o) => o.correct).length, 1, `${where}: one right option`);
    assert.equal(new Set(it.options.map((o) => o.html)).size, it.options.length, `${where}: duplicate option`);
    assert.ok(it.options.length >= 2, where);
    for (const o of it.options) if (o.rule) assert.ok(RULE_BY_ID[o.rule], `${where}: ${o.rule}`);
    return;
  }
  assert.equal(it.type, 'answer', where);
  if (Array.isArray(it.keys)) {
    assert.ok(aligned(it.keys), `${where}: digit block ${JSON.stringify(it.keys)}`);
    assert.deepEqual(planKeys(it.expected, it.keys).missing, [], `${where}: cannot type ${it.expected}`);
  }
  if (!it.checker) {
    const r = judgeAnswer(evaluate(parse(it.expected)), it.expected, { form: it.form });
    assert.equal(r.kind, 'done', `${where}: expected rejected`);
    return;
  }
  const check = CHECKERS[it.checker];
  assert.equal(check(it, it.expected).kind, 'done', `${where}: expected ${it.expected} rejected`);
  for (const tr of it.physTraps || []) {
    const r = check(it, typed(tr.value));
    assert.equal(r.kind, 'wrong', `${where}: trap ${tr.value} accepted`);
    assert.equal(r.rule, tr.rule, `${where}: trap ${tr.value}`);
  }
  for (const tr of it.physIsoTraps || []) {
    const r = check(it, `${it.variable} = ${tr.expr}`);
    assert.equal(r.kind, 'wrong', `${where}: trap ${tr.expr} accepted`);
    assert.equal(r.rule, tr.rule, `${where}: trap ${tr.expr}`);
  }
  for (const tr of it.unitTraps || []) {
    const r = check(it, baseText(parseUnit(tr.unit).d));
    assert.equal(r.kind, 'wrong', `${where}: trap ${tr.unit} accepted`);
    assert.equal(r.rule, tr.rule, `${where}: trap ${tr.unit}`);
  }
}

test(`${UNIT}: every skill has a generator`, () => {
  assert.equal(SKILLS.length, 6);
  for (const s of SKILLS) assert.equal(typeof GEN[s], 'function', s);
});

test(`${UNIT}: valid, checkable items at every level`, () => {
  const rng = makeRng(17);
  for (const s of SKILLS) {
    for (let level = 1; level <= 5; level++) {
      const keys = new Set();
      for (let i = 0; i < N; i++) {
        const it = GEN[s](level, rng);
        checkItem(it, s, `${s} L${level} ${it.key}`);
        keys.add(it.key);
      }
      assert.ok(keys.size >= 3, `${s} L${level}: only ${keys.size} different items`);
    }
  }
});

test(`${UNIT}: a range is computed with the right ends, and its middle is a trap`, () => {
  const rng = makeRng(3);
  for (let i = 0; i < 60; i++) {
    const it = GEN['rg-compute'](2, rng);
    const mid = it.physTraps.find((x) => x.rule === 'rg_central_value');
    assert.ok(mid, it.key);
    // Under the fraction bar, the other end: the smallest result is below the middle one.
    assert.ok(/plus petite/.test(it.prompt) ? it.value < mid.value : it.value > mid.value, it.key);
  }
  // The answer is right whatever the case of « conclure »: one right option.
  for (let level = 1; level <= 5; level++) {
    for (let i = 0; i < 60; i++) {
      const it = GEN['rg-conclude'](level, rng);
      const middle = it.options.find((o) => o.rule === 'rg_conclude_middle');
      if (middle) assert.ok(it.options.find((o) => o.correct).html.includes('conclure'), it.key);
    }
  }
});

test(`${UNIT}: new traps are well formed`, () => {
  for (const r of RULES) {
    assert.ok(PHYS_FAMILIES[r.family], `${r.id}: family`);
    assert.ok(SKILL_BY_ID[r.skill] && SKILL_BY_ID[r.repair], `${r.id}: skills`);
    assert.ok(r.name && r.example.length === 2 && r.explain(), r.id);
    assert.equal(RULE_BY_ID[r.id], r, `${r.id}: registered`);
  }
});

// Items built in another process, in English and in French.
const script = (skills, file) => `
  globalThis.window = {};
  const { GEN } = await import('./js/content/physique/${file}.js');
  const { makeRng } = await import('./js/content/random.js');
  const rng = makeRng(5);
  const out = [];
  for (const s of ${JSON.stringify(skills)}) for (let l = 1; l <= 5; l++) for (let i = 0; i < 25; i++) out.push(GEN[s](l, rng));
  const miss = window.hopingoMissing ? window.hopingoMissing() : [];
  console.log(JSON.stringify({ out, miss }));`;
const run = (lang) => {
  const env = { ...process.env };
  delete env.HOPINGO_LANG;
  if (lang) env.HOPINGO_LANG = lang;
  return JSON.parse(execFileSync(process.execPath, ['--input-type=module', '-e', script(SKILLS, 'incertitudes')], { env, maxBuffer: 1 << 28 }).toString());
};

test(`${UNIT}: English texts are complete, French texts unchanged`, () => {
  const en = run('en');
  for (const it of en.out) {
    const all = [it.prompt, it.suffix, ...(it.options || []).map((o) => o.html), ...(it.solution || []).map((l) => l.note)].join(' ');
    assert.ok(!/\{\w+\}/.test(all), `${it.key}: unfilled in English`);
  }
  assert.deepEqual(en.miss.filter((s) => /\p{L}{3}/u.test(s)), [], 'French texts without English');
  assert.equal(JSON.stringify(run('fr').out), JSON.stringify(run(null).out));
});
