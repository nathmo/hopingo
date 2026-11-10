// Items of the university unit `proba`, part a (module P, step U7; helpers
// and checks: tests/uni-check.js).
import { test } from 'node:test';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/proba-a.skills.js';
import { GEN } from '../js/content/uni/proba-a.js';
import { RULES } from '../js/cas/rules/pa.js';
import { checkTraps } from './uni-check-stat.js';

// Heavy skills: fewer items per level (never under 15).
const COUNTS = {};

test('unit proba, part a: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => GEN[id]), 17, COUNTS));

test('unit proba, part a: the traps name their examples or are offered as baits', () => checkTraps(RULES));

// The catalogue's corrigés, replayed through the judges prob and stat.
import assert from 'node:assert/strict';
import { JUDGES } from '../js/judges/index.js';
import { generate } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';
import { simulate, seedOfKey } from '../js/engine/simulate.js';

const play = (cfg, lines) => {
  const j = JUDGES[cfg.kind];
  let prev = j.parseLine(cfg, '?');
  lines.forEach((l, k) => {
    const v = j.judgeLine(cfg, prev, l, {});
    assert.equal(v.kind, k === lines.length - 1 ? 'done' : 'ok', `${l}: ${v.kind} ${v.message ?? ''}`);
    prev = v.node;
  });
};

test('part a: the corrigés of the catalogue pass their judges', () => {
  const sym = { 'Pr(A)': '0.5', 'Pr(B)': '0.7', 'Pr(A∩B)': '0.3' };
  play({ kind: 'prob', expect: '0.9', symbols: sym }, ['Pr(A)+Pr(B)-Pr(A∩B)', '0,5+0,7-0,3', '0,9']);
  play({ kind: 'prob', expect: '60' }, ['16+4+4+1+1+9+25', '60']);
  play({ kind: 'prob', expect: '10' }, ['60/6', '10']);
  play({ kind: 'stat', decimals: 2, expect: '√10' }, ['√10', '3,16']);
  play({ kind: 'prob', expect: '567/8990' }, ['C(4,2)×C(28,2)/C(32,4)', '2268/35960', '567/8990 ≈ 0,0631']);
  play({ kind: 'prob', expect: '0.27', symbols: { 'Pr(+|M)': '0.9', 'Pr(M)': '0.1', 'Pr(+|M^c)': '0.2', 'Pr(M^c)': '0.9' } }, ['Pr(+|M)×Pr(M)+Pr(+|M^c)×Pr(M^c)', '0,9×0,1+0,2×0,9', '0,09+0,18', '0,27']);
  play({ kind: 'prob', expect: '1/12' }, ['9/108', '1/12']);
  play({ kind: 'prob', expect: '9/20' }, ['0,9^2×0,01/(0,9^2×0,01+0,1^2×0,99)', '0,0081/0,018', '9/20']);
  play({ kind: 'prob', expect: '0.999' }, ['1-(1-0,9)^3', '0,999']);
  play({ kind: 'prob', expect: '0.3456' }, ['C(5,3)×0,6^3×0,4^2', '10×0,216×0,16', '0,3456']);
  play({ kind: 'stat', decimals: 3, expect: '3e^(-2)' }, ['e^(-2)+2e^(-2)', '3e^(-2)', '0,406']);
  play({ kind: 'prob', expect: '1/2' }, ['C(6,2)×C(4,1)/C(10,3)', '60/120', '1/2']);
});

test('part a: the simulations agree with the answers', () => {
  const rng = makeRng(5);
  for (const id of ['p-count', 'p-bayes-freq', 'p-binom', 'p-poisson', 'p-hypergeom']) {
    let n = 0;
    for (let i = 0; i < 20 && n < 3; i++) {
      const it = generate(id, 4, rng);
      if (!it.simulate) continue;
      n++;
      const r = simulate(it.simulate, seedOfKey(it.key));
      assert.ok(Math.abs(r.freq - it.simulate.answer) < 0.03, `${it.key}: ${r.freq} vs ${it.simulate.answer}`);
    }
    assert.ok(n > 0, id);
  }
});
