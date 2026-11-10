// Items of the university unit `proba`, part e (module P, step U7: χ²
// tests, interpretation, regression, Bayesian statistics; helpers and
// checks: tests/uni-check.js), its traps, and the corrigés of the
// catalogue (docs/universite/P-probabilites.md) replayed through the judges.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/proba-e.skills.js';
import { GEN } from '../js/content/uni/proba-e.js';
import { RULES } from '../js/cas/rules/pe.js';
import { checkTraps } from './uni-check-stat.js';
import { JUDGES } from '../js/judges/index.js';

// Heavy skills (rejection sampling of the χ² data, many parts): fewer items per level.
const COUNTS = { 'p-test-chi2-gof': 20, 'p-test-chi2-indep': 20, 'p-test-chi2-var': 20, 'p-reg-ls': 20, 'p-reg-test': 20, 'p-reg-multi': 20, 'p-bayes-beta': 20, 'p-bayes-gauss': 20, 'p-bayes-conjugate': 20 };

test('unit proba, part e: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id).filter((id) => GEN[id]), 17, COUNTS));

test('unit proba, part e: the traps name their examples or are offered as baits', () => checkTraps(RULES));

// One part: its expected value, then the lines of the corrigé, the last one final.
function replay(cfg, lines, state = {}) {
  const J = JUDGES[cfg.kind];
  let prev = J.parseLine(cfg, cfg.label || '?');
  lines.forEach((l, i) => {
    const v = J.judgeLine(cfg, prev, l, state);
    assert.equal(v.kind, i === lines.length - 1 ? 'done' : 'ok', `${cfg.expect} → ${l}: ${v.kind} ${v.message ?? ''}`);
    prev = v.node;
  });
}

test('the corrigés of the catalogue pass the judges prob and stat', () => {
  // p-test-chi2-gof: a die thrown 60 times.
  replay({ kind: 'stat', decimals: 2, expect: '67/5' }, ['(5-10)^2/10+(8-10)^2/10+(9-10)^2/10+(8-10)^2/10+(10-10)^2/10+(20-10)^2/10', '(25+4+1+4+0+100)/10', '13,4']);
  replay({ kind: 'stat', decimals: 3, expect: '#chi(5,5)' }, ['11,070']);
  replay({ kind: 'stat', decimals: 3, expect: '#chi(5,1)' }, ['15,086']);
  // p-test-chi2-indep and p-test-chi2-var.
  replay({ kind: 'stat', decimals: 2, expect: '4' }, ['4×5^2/25', '4']);
  replay({ kind: 'stat', decimals: 2, expect: '10×15/10' }, ['(11-1)×15/10', '15']);
  replay({ kind: 'stat', decimals: 2, expect: ['150/20.483', '150/3.247'] }, ['[7,32 ; 46,20]']);
  // p-reg-ls and p-reg-test (x = 1…5, y = 2, 4, 5, 4, 5), and exam example 3.
  replay({ kind: 'prob', expect: '6/10' }, ['6/10', '0,6']);
  replay({ kind: 'prob', expect: '36/60' }, ['6^2/(10×6)', '0,6']);
  replay({ kind: 'stat', decimals: 3, expect: '√(0.8/10)' }, ['√(0,8/10)', '0,283']);
  replay({ kind: 'stat', decimals: 2, expect: '0.6/0.283' }, ['2,12']);
  replay({ kind: 'stat', decimals: 3, expect: '#t(3,5)' }, ['3,182']);
  replay({ kind: 'stat', decimals: 2, expect: '2.4/(√((12-13/17.5×13)/4)×√(1/6+3.5^2/17.5))' }, ['3,37']);
  // p-reg-multi: nested F test.
  replay({ kind: 'stat', decimals: 2, expect: '(20/2)/(30/16)' }, ['((50-30)/2)/(30/(20-4))', '10/1,875', '5,33']);
  // p-bayes-beta, p-bayes-gauss, p-bayes-conjugate.
  replay({ kind: 'prob', expect: '9/14' }, ['9/(9+5)', '9/14']);
  replay({ kind: 'prob', expect: '3/196' }, ['(9/14)×(5/14)/15', '3/196']);
  replay({ kind: 'prob', expect: '23/10' }, ['(1×2,5+2×2,2)/3', '2,3']);
  replay({ kind: 'prob', expect: '3/16' }, ['4!/(2!×1!×1!)×(1/2)^2×(1/4)×(1/4)', '12/64', '3/16']);
});

test('the traps of part e on the catalogue\'s wrong lines', () => {
  const name = (cfg, line) => JUDGES[cfg.kind].judgeLine(cfg, JUDGES[cfg.kind].parseLine(cfg, '?'), line, {}).rule;
  assert.equal(name({ kind: 'prob', expect: '1/3', traps: { p_gauss_post_var_add: ['3/2'] } }, '1,5'), 'p_gauss_post_var_add');
  assert.equal(name({ kind: 'prob', expect: '4/13', traps: { p_dirichlet_alpha0: ['4/10'] } }, '2/5'), 'p_dirichlet_alpha0');
  assert.equal(name({ kind: 'stat', decimals: 2, expect: '67/5', traps: { p_chi2_divide_obs: ['100/9'] } }, '11,11'), 'p_chi2_divide_obs');
});
