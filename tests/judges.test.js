// Line judges js/judges (spec §5, §7, §13): each judge accepts a right line,
// refuses a typical wrong one and recognises the final form; each trap of
// the university modules names its own example. The `lines` engine:
// decisions, sub-goals, followError, reveal.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JUDGES } from '../js/judges/index.js';
import { LinesRun, checkScript, blankLine, templateOf, fillBlanks, blankAnswers } from '../js/judges/lines.js';
import { actionsFor } from '../js/judges/actions.js';
import { CAS_RULES } from '../js/cas/rules/index.js';
import { RULE_BY_ID, FAMILIES } from '../js/math/malrules.js';
import { SKILL_BY_ID } from '../js/content/skills.js';
import { parse } from '../js/cas/parse.js';
import { toText } from '../js/cas/print.js';

const EQ = { kind: 'equiv', vars: ['x'], dvar: 'x', target: 'no-prime', domain: { x: [-2.5, 2.5] }, seed: 1 };
const P = (s) => parse(s);

test('equiv: right, wrong, unfinished, final, same, unreadable', () => {
  const j = JUDGES.equiv;
  const prev = P('d(x^2×sin(3x))');
  assert.equal(j.judgeLine(EQ, prev, 'd(x^2)×sin(3x)+x^2×d(sin(3x))').kind, 'ok');
  assert.equal(j.judgeLine(EQ, prev, '2x×sin(3x)+3x^2×cos(3x)').kind, 'done');
  assert.equal(j.judgeLine(EQ, prev, '= 2x sin(3x) + 3x^2 cos(3x)').kind, 'done', 'spaces and a leading = are fine');
  assert.equal(j.judgeLine(EQ, prev, "(x^2)'×sin(3x)+x^2×(sin(3x))'").kind, 'ok', 'primes work like d()');
  const stay = j.judgeLine(EQ, prev, '2x×sin(3x)+3x^2×cos(3x)×1');
  assert.equal(stay.kind, 'stay');
  assert.match(stay.message, /·1/);
  assert.equal(j.judgeLine(EQ, prev, '2×3x×sin(3x)/3+3x^2×cos(3x)').kind, 'stay', 'two numbers in a product');
  const wrong = j.judgeLine(EQ, prev, '2x×sin(3x)+x^2×cos(3x)');
  assert.equal(wrong.kind, 'wrong');
  assert.ok(wrong.witness, 'the point where it differs');
  assert.match(wrong.message, /En x = /);
  assert.equal(j.judgeLine(EQ, prev, '(x^2×sin(3x))\'').kind, 'same');
  assert.equal(j.judgeLine(EQ, prev, '2x×sin(3x)+').kind, 'parse');
  assert.equal(j.judgeLine(EQ, prev, '2t').kind, 'parse', 'unknown letter');
  assert.equal(j.isFinal(EQ, P('d(x)+1')), false);
  assert.equal(j.isFinal(EQ, P('2x')), true);
  assert.equal(j.isFinal({ target: 'any' }, P('d(x)')), true);
});

test('value: same exact value, school traps on numbers, final literal', () => {
  const j = JUDGES.value;
  const cfg = { kind: 'value', form: 'irreducible' };
  const prev = P('2×0×sin(3×0)+3×0^2×cos(3×0)+1/2');
  assert.equal(j.judgeLine(cfg, prev, '1/2').kind, 'done');
  assert.equal(j.judgeLine(cfg, prev, '2/4').kind, 'stay');
  assert.equal(j.judgeLine(cfg, prev, '0+1/2').kind, 'ok');
  assert.equal(j.judgeLine(cfg, prev, '1').kind, 'wrong');
  // Numbers only: the school judge names the trap.
  const r = j.judgeLine(cfg, P('2/3+1/4'), '3/7');
  assert.equal(r.kind, 'wrong');
  assert.equal(r.rule, 'add_across');
  assert.equal(j.judgeLine(cfg, P('2/3+1/4'), '11/12').kind, 'done');
  assert.equal(j.judgeLine(cfg, P('π/2'), '1,5708').kind, 'wrong', 'exact unless told otherwise');
});

test('every university trap names its own example, and explains itself', () => {
  for (const r of CAS_RULES) {
    assert.ok(RULE_BY_ID[r.id], `${r.id} is in RULE_BY_ID`);
    assert.ok(FAMILIES[r.family], `${r.id}: family ${r.family}`);
    assert.ok(SKILL_BY_ID[r.skill] && SKILL_BY_ID[r.repair], `${r.id}: skills exist`);
    assert.match(r.id, /^[a-z0-9]+_/);
    const rel = P(r.example[0]);
    assert.equal(rel.t, 'rel', `${r.id}: example[0] is « start = wrong line »`);
    for (const kind of r.judges) {
      const v = JUDGES[kind].judgeLine({ ...EQ, kind }, rel.l, rel.r);
      assert.equal(v.kind, 'wrong', `${r.id}: example is wrong`);
      assert.equal(v.rule, r.id, `${r.id}: diagnosed as ${v.diag?.all}`);
      assert.ok(r.explain(v.diag.ctx).length > 20);
    }
    const right = P(r.example[1]);
    assert.notEqual(JUDGES.equiv.judgeLine(EQ, right.l, right.r).kind, 'wrong', `${r.id}: example[1] is right`);
    assert.ok(r.explain().length > 20, `${r.id}: general explanation`);
  }
});

test('a wrong line inside a longer derivation is still diagnosed', () => {
  const j = JUDGES.equiv;
  const prev = P('d(x^2)×sin(3x)+x^2×d(sin(3x))');
  assert.equal(j.judgeLine(EQ, prev, '2x×sin(3x)+x^2×cos(3x)').rule, 'g6_chain_forgot');
  const start = P('d(x×e^(x^2))');
  assert.equal(j.judgeLine(EQ, start, 'e^(x^2)+x×e^(x^2)').rule, 'g6_chain_forgot', 'chain forgotten inside the product rule');
  assert.equal(j.judgeLine(EQ, start, '1×2x×e^(x^2)').rule, 'g6_product_naive');
});

test('decision menus of the tap mode follow the student\'s line', () => {
  const ids = (line) => actionsFor('deriv', P(line), EQ).filter((o) => o.valid).map((o) => o.id).sort();
  assert.deepEqual(ids('d(x^2×sin(3x))'), ['product']);
  assert.deepEqual(ids('d((2x+1)/(x^2+1))'), ['quotient']);
  assert.deepEqual(ids('d(x^2)×sin(3x)+x^2×d(sin(3x))'), ['chain', 'table']);
  assert.deepEqual(ids('2x×sin(3x)+x^2×cos(3x)×3'), ['simplify']);
});

const ITEM = {
  skill: 'g6-deriv-rules', level: 4, type: 'lines', mode: 'free',
  start: { math: 'd(x^2×sin(3x))' }, judge: EQ, followError: true,
  subgoals: [{ id: 'product', skill: 'g6-deriv-rules' }, { id: 'simplify', skill: 'lit-monomial' }],
  script: [
    { kind: 'eq', math: 'd(x^2)×sin(3x)+x^2×d(sin(3x))', subgoal: 'product' },
    { kind: 'eq', math: '2x×sin(3x)+x^2×cos(3x)×d(3x)', subgoal: 'chain' },
    { kind: 'eq', math: '2x×sin(3x)+3x^2×cos(3x)', subgoal: 'simplify' },
    { kind: 'segment', html: 'f′(0)', start: { math: '2×0×sin(3×0)+3×0^2×cos(3×0)+1/2' }, judge: { kind: 'value', form: 'irreducible' } },
    { kind: 'eq', math: '1/2' },
  ],
};

test('lines: the reference solution passes its own judges', () => {
  const r = checkScript(ITEM);
  assert.ok(r.ok, JSON.stringify(r.log));
  assert.deepEqual(r.log.map((l) => l.kind), ['ok', 'ok', 'done', 'done']);
});

test('lines: free run, sub-goals, outcome', () => {
  const run = new LinesRun(ITEM);
  assert.equal(run.submit('2x×sin(3x)+3x^2×cos(3x)').kind, 'done');
  assert.equal(run.seg, 1, 'on to the second segment');
  const v = run.submit('1/2');
  assert.ok(v.finished);
  const o = run.outcome();
  assert.equal(o.correct, true);
  assert.ok(o.subgoals.includes('lit-monomial'), 'the sub-goals of a finished segment are credited');
});

test('lines: continue with my line (followError)', () => {
  const run = new LinesRun(ITEM);
  const w = run.submit('2x×sin(3x)+x^2×cos(3x)');
  assert.equal(w.kind, 'wrong');
  assert.equal(w.rule, 'g6_chain_forgot');
  const f = run.follow();
  assert.ok(f.segmentDone, 'the wrong line was final: the segment ends');
  assert.equal(toText(run.history.find((x) => x.how === 'followed').node), '2x×sin(3x)+x^2×cos(3x)');
  const o = run.outcome();
  assert.equal(o.correct, false);
  assert.deepEqual(o.rules, ['g6_chain_forgot']);
});

test('lines: guided blanks, reveal, decisions', () => {
  const node = P('d(x^2)×sin(3x)');
  const holes = [node.l];
  const line = blankLine(node, holes);
  assert.equal(line.math, 'd(x^2)×sin(3x)');
  assert.equal(templateOf(line), '□×sin(3x)');
  assert.deepEqual(blankAnswers(line), ['d(x^2)']);
  assert.equal(fillBlanks(line, ['2x']), '(2x)×sin(3x)');
  const item = {
    ...ITEM, mode: 'guided', level: 1,
    script: [
      { kind: 'decision', prompt: 'Quelle règle ?', options: [{ id: 'product', label: 'Produit', valid: true }, { id: 'chain', label: 'Chaîne', valid: false, why: 'non' }] },
      { kind: 'eq', math: '2x×sin(3x)+x^2×3cos(3x)', blanks: [[0, 2], [11, 16]], subgoal: 'product' },
    ],
  };
  const run = new LinesRun(item);
  run.decide(item.script[0], 'chain');
  assert.equal(run.mistakes, 1, 'a wrong decision is a mistake');
  run.passScript(0);
  assert.equal(run.submit('2x×sin(3x)+x^2×cos(3x)', { guided: true }).kind, 'wrong');
  const r = run.reveal();
  assert.ok(r.finished);
  assert.equal(run.outcome().correct, false);
});
