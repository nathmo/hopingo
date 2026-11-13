// Unit « energie » (js/content/physique/energie.js): every skill, every level.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { GEN } from '../js/content/physique/energie.js';
import ENERGIE_RULES from '../js/content/physique/rules-energie.js';
import { PHYS_FAMILIES } from '../js/content/physique/rules.js';
import { SKILL_BY_ID } from '../js/content/skills.js';
import { makeRng } from '../js/content/random.js';
import { RULE_BY_ID } from '../js/math/malrules.js';
import { CHECKERS } from '../js/math/checkers.js';
import { typed } from '../js/content/physique/format.js';
import EN from '../js/i18n/en/physique-energie.js';

const SKILLS = ['ph-ep', 'ph-ec', 'ph-work', 'ph-power', 'ph-elec-power', 'ph-elec-energy', 'ph-deltaT', 'ph-heat', 'ph-latent', 'ph-mix', 'ph-density', 'ph-efficiency', 'ph-conservation'];

test('every skill of the unit has a generator', () => {
  for (const s of SKILLS) {
    assert.ok(GEN[s], `${s} has no generator`);
    assert.equal(SKILL_BY_ID[s]?.unit, 'energie', s);
  }
});

test('items are valid, answers accepted, traps recognised', () => {
  const rng = makeRng(11);
  for (const s of SKILLS) {
    for (let level = 1; level <= 5; level++) {
      const keys = new Set();
      for (let i = 0; i < 60; i++) {
        const it = GEN[s](level, rng);
        const where = `${s} L${level}: ${it.key}`;
        keys.add(it.key);
        assert.equal(it.skill, s, where);
        assert.equal(it.level, level, where);
        assert.ok(it.prompt, where);
        assert.ok(!/[{}]/.test(it.prompt), `${where} unfilled placeholder: ${it.prompt}`);
        assert.ok(!/NaN|undefined|Infinity/.test(it.prompt), `${where} bad number: ${it.prompt}`);
        assert.ok(it.key.startsWith(`${s}:`), where);
        for (const b of it.baits) assert.ok(RULE_BY_ID[b], `${where} unknown bait ${b}`);
        for (const l of it.solution) assert.ok('html' in l && 'note' in l, `${where} solution line needs html and note`);
        if (it.type === 'answer') {
          assert.equal(it.checker, 'phys', where);
          assert.ok(Number.isFinite(it.value), where);
          assert.equal(CHECKERS.phys(it, it.expected).kind, 'done', `${where} expected ${it.expected} rejected`);
          for (const tr of it.physTraps) {
            const r = CHECKERS.phys(it, typed(tr.value));
            assert.equal(r.kind, 'wrong', `${where} trap ${tr.value} accepted`);
            assert.equal(r.rule, tr.rule, `${where} trap ${tr.value} gives ${r.rule}, not ${tr.rule}`);
          }
          // The answer can be typed with the keys given.
          const chars = it.expected.replace(/×10\^/, '×10^').split('');
          for (const c of chars) assert.ok(it.keys.includes(c), `${where} key « ${c} » missing for ${it.expected}`);
          assert.ok(it.solution.length >= 2, `${where} solution too short`);
        } else {
          assert.equal(it.type, 'mcq', where);
          assert.equal(it.options.filter((o) => o.correct).length, 1, `${where} needs exactly one right option`);
          const htmls = it.options.map((o) => o.html);
          assert.equal(new Set(htmls).size, htmls.length, `${where} duplicate options`);
          for (const o of it.options) assert.ok(!/[{}]/.test(o.html), `${where} unfilled option ${o.html}`);
        }
      }
      // Variety: a level is not one question.
      assert.ok(keys.size >= 8, `${s} L${level}: only ${keys.size} different items`);
    }
  }
});

test('new traps are well formed', () => {
  for (const r of ENERGIE_RULES) {
    assert.ok(PHYS_FAMILIES[r.family], `${r.id} family`);
    assert.ok(SKILL_BY_ID[r.skill], `${r.id} skill`);
    assert.ok(SKILL_BY_ID[r.repair], `${r.id} repair`);
    assert.equal(r.example.length, 2, r.id);
    assert.ok(r.explain().length > 20, r.id);
    assert.ok(RULE_BY_ID[r.id], `${r.id} not registered`);
  }
});

// Every French text given to t() in the unit's files has its English.
test('every text of the unit is translated', () => {
  const missing = [];
  for (const f of ['../js/content/physique/energie.js', '../js/content/physique/rules-energie.js']) {
    const src = readFileSync(new URL(f, import.meta.url), 'utf8');
    for (const m of src.matchAll(/\bt\('((?:[^'\\]|\\.)*)'/g)) {
      const fr = m[1].replace(/\\'/g, '\'');
      if (!(fr in EN)) missing.push(fr);
      else {
        const want = [...fr.matchAll(/\{(\w+)\}/g)].map((x) => x[1]).sort().join();
        const got = [...EN[fr].matchAll(/\{(\w+)\}/g)].map((x) => x[1]).sort().join();
        assert.equal([...new Set(got.split(','))].join(), [...new Set(want.split(','))].join(), `placeholders differ: ${fr}`);
      }
    }
  }
  assert.deepEqual(missing, []);
});
