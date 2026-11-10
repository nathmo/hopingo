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
import { readWith } from '../js/judges/index.js';
import { checkCounter, judgeTf } from '../js/judges/examples.js';
import { judgeTokens } from '../js/judges/logic.js';
import { placeBlock, checkBlocks } from '../js/judges/blocks.js';
import { checkTable } from '../js/judges/iter.js';
import { generate } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';

const EQ = { kind: 'equiv', vars: ['x'], dvar: 'x', target: 'no-prime', domain: { x: [-2.5, 2.5] }, seed: 1 };
const P = (s, o) => parse(s, o);

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
    assert.ok(r.explain().length > 20, `${r.id}: general explanation`);
    if (r.check) { checkTrap(r); continue; }
    // Step U0 traps: example[0] is « start = wrong line » for the equiv judge.
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
  }
});

// Step U1 traps say how their example[0] is replayed (js/cas/rules/g9.js):
// a wrong line diagnosed as the trap, a counter-example it names, or a
// bait offered by the items of its skill (decoy blocks, options).
function checkTrap(r) {
  const c = r.check;
  if (c.judge) {
    const prev = readWith(c.judge, c.prev);
    const v = JUDGES[c.judge.kind].judgeLine(c.judge, prev, c.line);
    assert.equal(v.kind, 'wrong', `${r.id}: example is wrong`);
    assert.equal(v.rule, r.id, `${r.id}: diagnosed as ${v.diag?.all}`);
    assert.ok(r.explain(v.diag.ctx).length > 20, r.id);
    assert.ok(r.judges.includes(c.judge.kind), `${r.id}: judge ${c.judge.kind} listed`);
  } else if (c.counter) {
    const v = checkCounter(c.counter, c.answers);
    assert.equal(v.ok, false, r.id);
    assert.equal(v.rule, r.id, r.id);
  } else if (c.bait) {
    const rng = makeRng(3);
    let found = false;
    for (let i = 0; i < 40 && !found; i++) {
      const it = generate(c.bait.skill, c.bait.level ?? 4, rng, null, c.bait.exam ? { exam: c.bait.exam } : undefined);
      found = it.baits.includes(r.id);
    }
    assert.ok(found, `${r.id}: offered as a bait by ${c.bait.skill}`);
  } else assert.fail(`${r.id}: check`);
}

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

// ---------- step U1: solset, logic, poly, tables, blocks, tokens ----------

test('solset: same set, wrong set with a witness, final form', () => {
  const j = JUDGES.solset;
  const cfg = { kind: 'solset', v: 'x', domain: 'R' };
  const prev = P('|x-1|<3 ∧ x≥0');
  assert.equal(j.judgeLine(cfg, prev, '-3<x-1<3 ∧ x≥0').kind, 'ok');
  assert.equal(j.judgeLine(cfg, prev, ']-2;4[∩[0;+∞[').kind, 'ok');
  assert.equal(j.judgeLine(cfg, prev, '[0;4[').kind, 'done');
  const w = j.judgeLine(cfg, prev, ']0;4[');
  assert.equal(w.kind, 'wrong');
  assert.match(w.message, /x = 0/);
  assert.equal(w.rule, 'g9_bracket');
  assert.equal(j.judgeLine(cfg, P('x<-1 ∨ x>2'), ']2;+∞[∪]-∞;-1[').kind, 'stay', 'not sorted');
  assert.equal(j.judgeLine(cfg, P('x≥1'), '[1;+∞]').kind, 'stay', '∞ is never included');
  assert.equal(j.judgeLine(cfg, prev, 'y<2').kind, 'parse', 'unknown letter');
  // Integers, set-builder notation, named sets.
  const n = { kind: 'solset', v: 'n', domain: 'N', sets: { A: '{0;1;2;3;4;5}', B: '{2k|k∈ℕ}' } };
  assert.equal(j.judgeLine(n, P('{n∈ℕ|2n+1<12}'), '{0;1;2;3;4;5}').kind, 'done');
  assert.equal(j.judgeLine(n, P('A∖B'), '{1;3;5}').kind, 'done');
  assert.equal(j.judgeLine(n, P('A∖B'), '{1;3}').kind, 'wrong');
  // A parameter: λ = 2 is final.
  const l = { kind: 'solset', v: 'λ' };
  assert.equal(j.judgeLine(l, P('λ^2-3λ+2=0'), 'λ∈{1;2}').kind, 'done');
  assert.equal(j.judgeLine(l, P('{1;2}∩{2;3}'), 'λ=2').kind, 'done');
});

test('logic: equivalent formulas, a typical wrong line, the final form', () => {
  const j = JUDGES.logic;
  const pq = { kind: 'logic', letters: ['P', 'Q'], maxSize: 3 };
  const prev = j.parseLine(pq, '¬(P∧¬Q)');
  assert.equal(j.judgeLine(pq, prev, '¬P∨¬¬Q').kind, 'ok');
  assert.equal(j.judgeLine(pq, prev, '¬P∨Q').kind, 'ok', 'right, but longer than P ⇒ Q');
  assert.equal(j.judgeLine(pq, prev, 'P⇒Q').kind, 'done');
  const w = j.judgeLine(pq, prev, '¬P∧Q');
  assert.equal(w.kind, 'wrong');
  assert.equal(w.rule, 'g9_demorgan');
  assert.equal(j.judgeLine(pq, prev, 'P⇒').kind, 'parse');
  // Quantifiers with restrictions, atoms negated by the table.
  const cfg = { kind: 'logic', pieces: [{ text: 'ε > 0' }, { text: 'N ∈ ℕ' }, { text: 'n ≥ N' }, { text: '|u_n − L| < ε' }] };
  const neg = j.parseLine(cfg, '¬(∀ε > 0 ∃N ∈ ℕ ∀n ≥ N, |u_n − L| < ε)');
  assert.equal(j.judgeLine(cfg, neg, '∃ε > 0, ¬(∃N ∈ ℕ ∀n ≥ N, |u_n − L| < ε)').kind, 'ok');
  assert.equal(j.judgeLine(cfg, neg, '∃ε > 0 ∀N ∈ ℕ ∃n ≥ N, ¬(|u_n − L| < ε)').kind, 'stay', 'negate the atom by the table');
  assert.equal(j.judgeLine(cfg, neg, '∃ε > 0 ∀N ∈ ℕ ∃n ≥ N, |u_n − L| ≥ ε').kind, 'done');
  assert.equal(j.judgeLine(cfg, neg, '∃ε > 0 ∃N ∈ ℕ ∃n ≥ N, |u_n − L| ≥ ε').rule, 'g9_neg_one_quant');
});

test('poly: same polynomial, Euclidean division, identification, final forms', () => {
  const j = JUDGES.poly;
  const f = { kind: 'poly', v: 'x', target: 'factored-R' };
  const prev = P('x^3-2x^2-5x+6');
  assert.equal(j.judgeLine(f, prev, '(x-1)(x^2-x-6)').kind, 'ok');
  assert.equal(j.judgeLine(f, prev, '(x-1)(x-3)(x+2)').kind, 'done');
  assert.equal(j.judgeLine(f, prev, '(x-1)(x-3)(x-2)').kind, 'wrong');
  assert.equal(j.judgeLine(f, P('x^4-x^3-x+1'), '(x-1)(x-1)(x^2+x+1)').kind, 'stay', 'equal factors grouped');
  assert.equal(j.judgeLine(f, P('x^2+4'), '(x-2)(x+2)').rule, 'g0_irred_split');
  // Division A = BQ + R.
  const d = {
    kind: 'poly', mode: 'div', v: 'x', dividend: '2x^4+x^3-3x+1', divisor: 'x^2+x-1',
    names: { A: '2x^4+x^3-3x+1', B: 'x^2+x-1' }, divisorName: 'B',
  };
  const a = P('A=2x^4+x^3-3x+1');
  assert.equal(j.judgeLine(d, a, 'A=B×2x^2+(-x^3+2x^2-3x+1)').kind, 'ok', 'deg R ≥ deg B: go on');
  assert.equal(j.judgeLine(d, a, 'A=B×(2x^2-x+3)+(-7x+4)').kind, 'done');
  assert.equal(j.judgeLine(d, a, 'A=(x^2+x-1)(2x^2-x+3)-7x+4').kind, 'done', 'B written out');
  assert.equal(j.judgeLine(d, a, 'A=B×2x^2+(-x^3-2x^2-3x+1)').rule, 'g0_div_subtract');
  // Identification of coefficients.
  const id = { kind: 'poly', mode: 'identity', v: 'x', params: ['a', 'b', 'c'], solution: { a: '2', b: '1', c: '-1' } };
  const s = P('(x-2)(ax^2+bx+c)=2x^3-3x^2-3x+2', { vars: ['x', 'a', 'b', 'c'] });
  assert.equal(j.judgeLine(id, s, 'ax^3+(b-2a)x^2+(c-2b)x-2c=2x^3-3x^2-3x+2').kind, 'ok');
  assert.equal(j.judgeLine(id, s, 'a=2;b-2a=-3;c-2b=-3;-2c=2').kind, 'ok');
  assert.equal(j.judgeLine(id, s, 'a=2;b=1;c=-1').kind, 'done');
  assert.equal(j.judgeLine(id, s, 'a=2;b=1').kind, 'stay', 'c is not fixed');
  assert.equal(j.judgeLine(id, s, 'a=2;b=-1;c=1').kind, 'wrong');
  // Complex coefficients; the gcd made monic.
  const c = { kind: 'poly', v: 'x', complex: true, target: 'factored-C' };
  assert.equal(j.judgeLine(c, P('x^2+4'), '(x-2i)(x+2i)').kind, 'done');
  const m = { kind: 'poly', mode: 'monic', v: 'x', target: 'monic' };
  assert.equal(j.judgeLine(m, P('-x^2+3x-2'), 'x^2-3x+2').kind, 'done');
  assert.equal(j.judgeLine(m, P('-x^2+3x-2'), 'x^2-3x+1').kind, 'wrong');
});

test('value: an asked number (expect) and the module traps', () => {
  const j = JUDGES.value;
  const cfg = { kind: 'value', expect: '3', coverup: { num: 'x+7', den: 'x+1', at: 2 } };
  assert.equal(j.judgeLine(cfg, P('A'), '(2+7)/(2+1)').kind, 'ok');
  assert.equal(j.judgeLine(cfg, P('A'), '3').kind, 'done');
  assert.equal(j.judgeLine(cfg, P('A'), '-5').rule, 'g0_coverup_sign');
});

test("tables: Horner and truth tables judged from the student's own cells", () => {
  const item = {
    table: {
      cols: ['x³', 'x²', 'x', '1'], root: { input: true },
      rows: [
        { id: 'coef', cells: [{ given: '1' }, { given: '0' }, { given: '-3' }, { given: '2' }] },
        { id: 'prod', cells: [null, { input: true }, { input: true }, { input: true }] },
        { id: 'b', cells: [{ input: true }, { input: true }, { input: true }, { input: true }] },
      ],
    },
    judge: { kind: 'iter', phi: { kind: 'horner', root: '1', coeffs: ['1', '0', '-3', '2'] } },
  };
  const right = { root: '1', prod: [null, '1', '1', '-2'], b: ['1', '1', '-2', '0'] };
  assert.ok(checkTable(item, right).ok);
  const wrong = checkTable(item, { ...right, b: ['1', '1', '-1', '0'] });
  assert.equal(wrong.ok, false);
  assert.deepEqual(wrong.cells.b, [true, true, false, true], "the next cell is judged from the student's cell");
  assert.equal(wrong.cells.prod[3], false, "a·b₂ uses the student's b₂");
  assert.equal(checkTable(item, { ...right, root: '-1' }).rule, 'g0_horner_sign');
  const truth = {
    table: { cols: ['P', 'Q', 'P ⇒ Q'], rows: [{ id: 'r', env: { P: true, Q: false }, cells: [{ given: 'V' }, { given: 'F' }, { input: true, kind: 'tf' }] }] },
    judge: { kind: 'iter', phi: { kind: 'truth', letters: ['P', 'Q'], columns: [null, null, 'P⇒Q'] } },
  };
  assert.ok(checkTable(truth, { r: [null, null, 'F'] }).ok);
  assert.equal(checkTable(truth, { r: [null, null, 'V'] }).ok, false);
});

test('blocks, tokens and true/false with a counter-example', () => {
  const rng = makeRng(2);
  const b = generate('g9-proof-contra', 4, rng);
  assert.ok(checkBlocks(b).ok);
  const [first, second] = b.order;
  assert.equal(placeBlock(b, [], second).kind, 'early', 'a block before the one it needs');
  assert.equal(placeBlock(b, [], first).kind, 'ok');
  const decoy = b.blocks.find((x) => x.distractor);
  assert.equal(placeBlock(b, [first], decoy.id).rule, decoy.distractor);
  const withInput = b.blocks.find((x) => x.input);
  if (withInput) {
    const placed = b.order.slice(0, b.order.indexOf(withInput.id));
    assert.equal(placeBlock(b, placed, withInput.id).kind, 'input');
    assert.equal(placeBlock(b, placed, withInput.id, withInput.input.answer).kind, 'ok');
    assert.equal(placeBlock(b, placed, withInput.id, '1').kind, 'wrong');
  }
  for (let i = 0; i < 10; i++) {
    const t = generate('g9-implication', 3, rng);
    assert.equal(judgeTokens(t, t.answer).kind, 'done');
    if (t.task === 'contra') assert.equal(judgeTokens(t, t.start).kind, 'stay', 'equivalent, but not the contrapositive');
  }
  const tf = { truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: 'x^2≥x' }, ruleIfTrue: 'g9_proof_by_example' };
  assert.equal(judgeTf(tf, true).rule, 'g9_proof_by_example');
  assert.equal(judgeTf(tf, false, { x: '1/2' }).correct, true);
  assert.equal(judgeTf(tf, false, { x: '2' }).correct, false);
});

test('the parser reads sets, chains of inequalities and connectives', () => {
  for (const s of [']-2;4[∩[0;+∞[', '{n∈ℕ|2n+1<12}', '{3n+1|n∈ℕ∧n≤3}', '-3<x-1<3∧x≥0', '¬(-1≤x<3)', 'a=2;b-2a=-3', 'ℝ∖]0;1]', 'λ∈{1;2}']) {
    const n = P(s);
    assert.equal(toText(P(toText(n))), toText(n), s);
  }
  assert.equal(P('x<1 et x>0').t, 'logic', '« et » is ∧');
  assert.throws(() => P(']1;2'), /Ferme/);
});

// ---------- step U1, part b ----------

const J = (cfg, prev, line, state = {}) => JUDGES.solset.judgeLine({ kind: 'solset', ...cfg }, P(prev, { vars: [cfg.v || 'x', ...Object.keys(cfg.subst || {}), ...Object.keys(cfg.params || {})] }), line, state);

test('solset (U1b): substitution t = eˣ, undefined numbers', () => {
  const cfg = { v: 'x', subst: { t: 'e^x' } };
  assert.equal(J(cfg, 'e^(2x)-e^x-6=0', 't^2-t-6=0').kind, 'ok');
  assert.equal(J(cfg, 't^2-t-6=0', 't=3 ou t=-2').kind, 'ok', 't = −2 gives no x');
  assert.equal(J(cfg, 't=3', 'e^x=3').kind, 'ok');
  assert.equal(J(cfg, 'e^x=3', 'x=ln(3)').kind, 'done');
  assert.equal(J(cfg, 'e^x=3', 'x=ln(2)').kind, 'wrong');
  const bad = J(cfg, 'e^x=3', 'x=ln(3) ou x=ln(-2)');
  assert.equal(bad.kind, 'wrong');
  assert.match(bad.message, /n'existe pas/);
  assert.equal(J(cfg, 't^2-t-6=0', 't=3').kind, 'ok', 'a line in t is not final');
});

test('solset (U1b): domain line, comparison on the domain, final line checked', () => {
  const cfg = { v: 'x', onDomain: true };
  const st = {};
  assert.equal(J(cfg, 'log_2(x-1)+log_2(x+1)=3', 'D=]1;+∞[', st).kind, 'ok');
  assert.equal(J(cfg, 'D=]1;+∞[', 'log_2((x-1)(x+1))=3', st).kind, 'ok', 'merged: the domain widens');
  assert.equal(J(cfg, 'log_2((x-1)(x+1))=3', 'x^2-1=8', st).kind, 'ok');
  assert.equal(J(cfg, 'x^2-1=8', 'x=3 ou x=-3', st).kind, 'ok', 'still to sort');
  assert.equal(J(cfg, 'x=3 ou x=-3', '{3}', st).kind, 'done');
  assert.equal(J(cfg, 'x=3 ou x=-3', '{-3;3}', st).kind, 'wrong', 'outside the domain');
  const d = J(cfg, 'log_2(x-1)+log_2(x+1)=3', 'D=]-1;+∞[', {});
  assert.equal(d.kind, 'wrong');
  assert.match(d.message, /domaine/);
});

test('solset (U1b): squaring without condition, parameters, domains, cases', () => {
  const st = { superset: true };
  assert.equal(J({ v: 'x' }, 'sqrt(x+7)=x+1', 'x+7=(x+1)^2', st).kind, 'ok');
  const v = J({ v: 'x' }, 'x+7=(x+1)^2', 'x=2 ou x=-3', st);
  assert.equal(v.kind, 'ok');
  assert.match(v.note, /Vérifie/);
  assert.equal(J({ v: 'x' }, 'x=2 ou x=-3', 'x=2', st).kind, 'done');
  assert.equal(J({ v: 'x' }, 'x=2 ou x=-3', 'x=-3', st).kind, 'wrong', 'a solution lost');
  // A parameter m in a case of the discussion.
  assert.equal(J({ v: 'x', params: { m: ']1;+∞[' } }, '(m-1)x≤m^2-1', 'x≤m+1').kind, 'ok');
  assert.equal(J({ v: 'x', params: { m: ']1;+∞[' } }, 'x≤m+1', ']-∞;m+1]').kind, 'done');
  const w = J({ v: 'x', params: { m: ']1;+∞[' } }, '(m-1)x≤m^2-1', 'x≥m+1');
  assert.equal(w.kind, 'wrong');
  assert.match(w.message, /Pour m = /);
  assert.equal(J({ v: 'x', params: { m: ']-∞;1[' } }, '(m-1)x≤m^2-1', 'x≥m+1').kind, 'ok');
  assert.equal(J({ v: 'x', params: { m: '{1}' } }, '(m-1)x≤m^2-1', 'ℝ').kind, 'done');
  // An expression stands for its domain (g1-domain).
  const ex = { v: 'x', exprDomain: true };
  assert.equal(J(ex, 'sqrt(x+3)/(x^2-4)', 'x+3≥0 et x^2-4≠0').kind, 'ok');
  assert.equal(J(ex, 'x+3≥0 et x^2-4≠0', '[-3;-2[∪]-2;2[∪]2;+∞[').kind, 'done');
  assert.equal(J(ex, 'sqrt(x+3)/(x^2-4)', 'x^2-4≠0').kind, 'wrong');
  // A case is a part on a smaller domain; S₁ ∪ S₂ joins the cases.
  assert.equal(J({ v: 'x', domain: '[3/2;+∞[' }, '|2x-3|=x+1', '2x-3=x+1').kind, 'ok');
  assert.equal(J({ v: 'x', sets: { S_1: '{4}', S_2: '{2/3}' } }, 'S₁∪S₂', '{2/3;4}').kind, 'done');
  // Roots where the function touches 0, and multiples of π.
  assert.equal(J({ v: 'x', domain: '[-7;7]' }, 'sin(x)=1', 'x=π/2 ou x=-3π/2').kind, 'done');
});

test('the parser reads log_a; exact values of logarithms', () => {
  assert.equal(toText(P('log_2(x-1)+log_(1/3)(x)')), 'log_2(x-1)+log_(1/3)(x)');
  const r = JUDGES.value.judgeLine({ kind: 'value', form: 'irreducible' }, P('log_2(1/16)'), '-4');
  assert.equal(r.kind, 'done');
  assert.equal(JUDGES.value.judgeLine({ kind: 'value', form: 'irreducible' }, P('log_4(8)'), '3/2').kind, 'done');
});

test('lines: a decision sets the judge state and asks its follow-up (then)', () => {
  const item = {
    type: 'lines', mode: 'guided', start: { math: 'sqrt(x+7)=x+1' }, judge: { kind: 'solset', v: 'x' },
    script: [
      { kind: 'decision', prompt: 'Comment ?', options: [
        { id: 'sq', label: 'Élever au carré', valid: true, quality: 'poor', ref: true, state: { superset: true }, then: { ask: 'On élève au carré :', expect: '(x+1)^2', vars: ['x'] } },
        { id: 'cond', label: 'Condition puis carré', valid: true }] },
      { kind: 'eq', math: 'x+7=(x+1)^2' },
      { kind: 'eq', math: 'x=2 ou x=-3' },
      { kind: 'eq', math: 'x=2' },
    ],
    subgoals: [],
  };
  assert.ok(checkScript(item).ok, JSON.stringify(checkScript(item).log));
  const run = new LinesRun(item);
  const opt = run.decide(item.script[0], 'sq');
  assert.equal(run.answerThen(opt, 'x+2').kind, 'wrong');
  assert.equal(run.answerThen(opt, 'x^2+2x+1').kind, 'ok');
  assert.equal(run.state.superset, true);
});

// ---------- step U1, part b: sums (G5) ----------

test('Σ: parse, print, exact value, numeric value at whole n', async () => {
  const { exactValue } = await import('../js/cas/normal.js');
  const { evalFloat } = await import('../js/cas/numeric.js');
  const { symbolsIn } = await import('../js/cas/ast.js');
  for (const t of ['sum(3k+2,k,1,20)', '3sum(k,k,1,n)+sum(2,k,1,n)', 'sum((k-1)^2,k,2,n+1)', '(sum(k,k,1,n))^2']) {
    assert.equal(toText(P(toText(P(t)))), toText(P(t)), t);
  }
  assert.equal(toText(P('Σ(k,k,1,20)')), 'sum(k,k,1,20)', 'the Σ key');
  assert.equal(exactValue(P('sum(3k+2,k,1,20)')).n, 670);
  assert.equal(evalFloat(P('sum(k^2,k,1,n)'), { n: 4 }), 30);
  assert.equal(evalFloat(P('sum(k,k,3,2)'), {}), 0, 'empty sum');
  assert.deepEqual([...symbolsIn(P('sum(k^2,k,1,n)'))], ['n'], 'the index is bound');
});

test('equiv on whole n: sums, closed forms, final form « no-sum »', () => {
  const cfg = { kind: 'equiv', vars: ['n'], domain: { n: { int: [1, 12] } }, target: 'no-sum', factored: true };
  const j = JUDGES.equiv;
  const prev = P('sum(1/(k(k+1)),k,1,n)', { vars: ['n'] });
  assert.equal(j.judgeLine(cfg, prev, 'sum(1/k-1/(k+1),k,1,n)').kind, 'ok');
  assert.equal(j.judgeLine(cfg, prev, '1-1/(n+1)').kind, 'ok', 'not reduced yet');
  assert.equal(j.judgeLine(cfg, prev, 'n/(n+1)').kind, 'done');
  const w = j.judgeLine(cfg, P('sum(1/k-1/(k+1),k,1,n)', { vars: ['n'] }), '1-1/n');
  assert.equal(w.kind, 'wrong');
  assert.equal(w.rule, 'g5_telescope_ends');
  const sq = P('sum(k^2,k,1,n)', { vars: ['n'] });
  const ex = { ...cfg, factored: false, expanded: true };
  assert.equal(j.judgeLine(ex, sq, 'n(n+1)(2n+1)/6').kind, 'ok', 'expand it');
  assert.equal(j.judgeLine(ex, sq, '1/3n^3+1/2n^2+1/6n').kind, 'done');
  assert.equal(j.isFinal(cfg, P('(n+1)(n/2+1)', { vars: ['n'] })), false);
  assert.equal(j.isFinal(cfg, P('(n+1)(n+2)/2', { vars: ['n'] })), true);
});

test('value: writing a sum with Σ (terms), arithmetic and geometric traps', () => {
  const j = JUDGES.value;
  const cfg = { kind: 'value', terms: ['2', '5', '8', '11'] };
  assert.equal(j.judgeLine(cfg, P('S'), 'sum(3k-1,k,1,4)').kind, 'done');
  assert.equal(j.judgeLine(cfg, P('S'), 'sum(3k+2,k,0,3)').kind, 'done', 'other bounds, same terms');
  const short = j.judgeLine(cfg, P('S'), 'sum(3k-1,k,1,3)');
  assert.equal(short.kind, 'wrong');
  assert.equal(short.rule, 'g5_count_terms');
  assert.equal(j.judgeLine(cfg, P('S'), '26').kind, 'form', 'the value alone is not a Σ');
  const ar = { kind: 'value', expect: '79', arith: { u1: 3, r: 4, n: 20 } };
  assert.equal(j.judgeLine(ar, P('u_20'), '3+19×4').kind, 'ok');
  assert.equal(j.judgeLine(ar, P('u_20'), '83').rule, 'g5_arith_half');
});

test('blocks: a typed calculation on its own domain; heredity counter-examples', () => {
  const item = {
    type: 'blocks', mode: 'frame', goal: 'b1', order: ['b0', 'b1'],
    blocks: [{ id: 'b0', html: 'f₁', needs: [] }, { id: 'b1', html: 'fₙ₊₁', needs: ['b0'], input: { kind: 'expr', vars: ['x', 'n'], expect: '(x^(2^n))^2', domain: { n: { int: [1, 3] }, x: [0.9, 1.1] } } }],
  };
  assert.equal(placeBlock(item, ['b0'], 'b1', 'x^(2^(n+1))').kind, 'done');
  assert.equal(placeBlock(item, ['b0'], 'b1', 'x^(2^n+2)').kind, 'wrong');
  const c = { kind: 'heredity', v: 'n', from: 0 };
  assert.equal(checkCounter(c, { P: 'n>n+1' }).ok, true);
  assert.equal(checkCounter(c, { P: 'n≤5' }).ok, false, 'heredity fails at 5');
  assert.equal(checkCounter(c, { P: 'n≥0' }).ok, false, 'true for every n');
});

test('tap menus for sums follow the student\'s line', () => {
  const valid = (kind, t) => actionsFor(kind, P(t, { vars: ['n'] }), {}).filter((o) => o.valid).map((o) => o.id);
  assert.deepEqual(valid('sigma', 'sum(3k+2,k,1,20)'), ['linear']);
  assert.deepEqual(valid('sigma', '3sum(k,k,1,20)+sum(2,k,1,20)'), ['formula']);
  assert.deepEqual(valid('sigma', '3×20×21/2+40'), ['compute']);
  assert.deepEqual(valid('telescope', 'sum(1/(k(k+1)),k,1,n)'), ['decompose']);
  assert.deepEqual(valid('telescope', 'sum(1/k-1/(k+1),k,1,n)'), ['telescope']);
  assert.deepEqual(valid('induction', 'sum(k,k,1,n+1)'), ['split']);
  assert.deepEqual(valid('induction', 'sum(k,k,1,n)+n+1'), ['hyp']);
  assert.deepEqual(valid('induction', 'n(n+1)/2+n+1'), ['factor']);
});

// ---------- step U1, part b: module G2 ----------

test('equiv (G2): powers, logarithms, an identity to reach, letters standing for tanh x', () => {
  const j = JUDGES.equiv;
  const E2 = (cfg, prev, line) => j.judgeLine({ kind: 'equiv', ...cfg }, P(prev, { vars: cfg.vars }), line);
  const pw = { vars: ['a', 'b'], domain: { a: [0.2, 4], b: [0.2, 4] }, target: 'powers' };
  assert.equal(E2(pw, '(a^(1/2)b^(-1/3))^6/(a^2b^(-3))', 'a^3b^(-2)/(a^2b^(-3))').kind, 'ok');
  assert.equal(E2(pw, 'a^(3-2)b^(-2+3)', 'ab').kind, 'done');
  assert.equal(E2(pw, 'a^(3-2)b^(-2+3)', 'a^(13/2)b').kind, 'wrong');
  const ln = { vars: ['x'], domain: { x: [0.2, 5] }, target: 'log-expanded' };
  assert.equal(E2(ln, 'ln(e^2×sqrt(x)/x^3)', 'ln(e^2)+ln(sqrt(x))-ln(x^3)').kind, 'ok');
  const st = E2(ln, 'ln(e^2)+ln(sqrt(x))-ln(x^3)', '2+(1/2)ln(x)-3ln(x)');
  assert.equal(st.kind, 'stay');
  assert.match(st.message, /même logarithme/);
  assert.equal(E2(ln, 'ln(e^2)+ln(sqrt(x))-ln(x^3)', '2-(5/2)ln(x)').kind, 'done');
  const w = E2(ln, 'ln(x^3)', 'ln(x)^3');
  assert.equal(w.kind, 'wrong');
  assert.equal(w.rule, 'g2_log_power');
  assert.equal(E2({ ...ln, target: 'log-single' }, '2ln(x)-ln(x+1)+3', 'ln(e^3x^2/(x+1))').kind, 'done');
  const goal = { vars: ['x'], domain: { x: [-2, 2] }, target: 'goal', goal: 'sinh(2x)' };
  assert.equal(E2(goal, '2sinh(x)cosh(x)', '(e^(2x)-e^(-2x))/2').kind, 'ok');
  assert.equal(E2(goal, '(e^(2x)-e^(-2x))/2', 'sinh(2x)').kind, 'done');
  const t = { vars: ['x', 't'], domain: { x: [-2, 2] }, target: 'only', finalVars: ['t'], subst: { t: 'tanh(x)' } };
  assert.equal(E2(t, 'cosh(2x)', 'cosh(x)^2+sinh(x)^2').kind, 'ok');
  assert.equal(E2(t, '(1+tanh(x)^2)/(1-tanh(x)^2)', '(1+t^2)/(1-t^2)').kind, 'done');
  const s = E2(t, 'cosh(2x)', 'cosh(x)^2-sinh(x)^2');
  assert.equal(s.kind, 'wrong');
  assert.equal(s.rule, 'g2_hyp_trig_sign');
});

test('value (G2): real powers through the CAS, a logarithm as final form', () => {
  const j = JUDGES.value;
  assert.equal(j.judgeLine({ kind: 'value' }, P('8^(2/3)'), '(8^(1/3))^2').kind, 'ok');
  assert.equal(j.judgeLine({ kind: 'value' }, P('(8^(1/3))^2'), '4').kind, 'done');
  assert.equal(j.judgeLine({ kind: 'value' }, P('8^(2/3)'), '(8^(1/2))^3').kind, 'wrong');
  const lg = { kind: 'value', form: 'log' };
  assert.equal(j.judgeLine(lg, P('argsh(3/4)'), 'ln(3/4+5/4)').kind, 'ok');
  assert.equal(j.judgeLine(lg, P('ln(3/4+5/4)'), 'ln(2)').kind, 'done');
  assert.equal(j.judgeLine(lg, P('argsh(3/4)'), 'ln(3)').kind, 'wrong');
});

test('per-line menus (steps) and the compiled numeric scan', async () => {
  const cfg = { kind: 'solset', v: 'x', menus: [{ at: 'e^(2x)-e^x-6=0', options: [{ id: 'a', valid: true }, { id: 'b', valid: false }] }] };
  assert.equal(actionsFor('steps', P('e^(2x)-e^x-6=0'), cfg).find((o) => o.valid).id, 'a');
  assert.deepEqual(actionsFor('steps', P('t^2-t-6=0', { vars: ['t'] }), cfg), []);
  const { compileFloat, evalFloat } = await import('../js/cas/numeric.js');
  for (const t of ['log_(1/3)(2x-1)+x^(1/3)', 'cosh(x)^2-sqrt(x+1)/x', '(x^2)^x-x^(x^2)', '|x-2|×e^(-x)']) {
    const f = compileFloat(P(t));
    for (const x of [-1.5, -0.3, 0.7, 2, 3.1]) {
      const a = f({ x });
      const b = evalFloat(P(t), { x });
      assert.ok((Number.isNaN(a) && Number.isNaN(b)) || Math.abs(a - b) < 1e-12, `${t} at ${x}`);
    }
  }
});

// ---------- step U1, part b: trigonometry (G3) ----------

const PER = (extra = {}) => ({ kind: 'solset', v: 'x', periodic: true, ...extra });
const JP = (cfg, prev, line, state = {}) => JUDGES.solset.judgeLine(cfg, P(prev, { vars: ['x', 'k', 'X', 't'] }), line, state);

test('solset (G3): families with k, compared on a window, final forms', () => {
  assert.equal(JP(PER(), 'cos(2x-π/3)=1/2', '2x-π/3=π/3+2kπ ∨ 2x-π/3=-π/3+2kπ').kind, 'ok');
  assert.equal(JP(PER(), '2x=(2π)/3+2kπ ∨ 2x=2kπ', 'x=π/3+kπ ∨ x=kπ').kind, 'done');
  const w = JP(PER(), '2x=(2π)/3+2kπ ∨ 2x=2kπ', 'x=π/3+2kπ ∨ x=2kπ');
  assert.equal(w.kind, 'wrong');
  assert.equal(w.rule, 'g3_period_divide');
  assert.equal(JP(PER(), 'sin(x)=1/2', '{π/6+2kπ;(5π)/6+2kπ}').kind, 'done', 'a set of families');
  assert.equal(JP(PER(), 'sin(x)=1', 'x=π/2+2kπ').kind, 'done', 'a root where sin touches 1');
  assert.equal(JP(PER(), '2x=(2π)/3+2kπ', 'x=π/3+kπ ; k∈ℤ').kind, 'done', '« k ∈ ℤ » may follow');
  // On an interval: families are not final, the list is; nothing outside.
  const I = PER({ domain: '[0;2π]' });
  assert.equal(JP(I, 'cos(x+π/3)≥1/2', '-(2π)/3+2kπ≤x≤2kπ').kind, 'ok');
  assert.equal(JP(I, '-(2π)/3+2kπ≤x≤2kπ', '{0}∪[(4π)/3;2π]').kind, 'done');
  assert.equal(JP(I, '-(2π)/3+2kπ≤x≤2kπ', '[-(2π)/3;0]∪[(4π)/3;2π]').kind, 'stay', 'written outside the interval');
  assert.equal(JP(I, '-(2π)/3+2kπ≤x≤2kπ', '[-(2π)/3;0]').rule, 'g3_ineq_window');
  // Substitutions X = cos x and t = tan(x/2).
  assert.equal(JP(PER({ subst: { X: 'cos(x)' } }), '2cos(x)^2-3cos(x)+1=0', '(2X-1)(X-1)=0').kind, 'ok');
  const bio = PER({ subst: { t: 'tan(x/2)' }, onDomain: true, onDomainOf: 'tan(x/2)' });
  const st = {};
  assert.equal(JP(bio, '2sin(x)-cos(x)=1', '4t/(1+t^2)-(1-t^2)/(1+t^2)=1', st).kind, 'ok', 'x = π + 2kπ set aside');
  const lost = JP(bio, 't=1/2', 'x=2arctan(1/2)+2kπ', st);
  assert.equal(lost.kind, 'wrong');
  assert.equal(lost.rule, 'g3_bioche_pi');
  assert.equal(JP(bio, 't=1/2', 'x=2arctan(1/2)+2kπ ∨ x=π+2kπ', st).kind, 'done');
});

test('value and equiv (G3): exact forms, degrees with a tolerance, goals', () => {
  const ex = { kind: 'value', form: 'exact' };
  assert.equal(JUDGES.value.judgeLine(ex, P('12×30°'), '12×π/6').kind, 'ok');
  assert.equal(JUDGES.value.judgeLine(ex, P('12×30°'), '2π').kind, 'done');
  assert.equal(JUDGES.value.judgeLine(ex, P('√8/2+0'), '√8/2').kind, 'stay', 'a root to simplify');
  const deg = { kind: 'value', form: 'deg', tolDeg: 0.01 };
  assert.equal(JUDGES.value.judgeLine(deg, P('arccos(11/14)'), '38,21°').kind, 'done');
  assert.equal(JUDGES.value.judgeLine(deg, P('arccos(11/14)'), '38,3°').kind, 'wrong');
  assert.equal(JUDGES.value.judgeLine(deg, P('arccos(11/14)'), '0,6669').kind, 'stay', 'the unit is asked');
  const EX = { kind: 'equiv', vars: [], target: 'exact' };
  assert.equal(JUDGES.equiv.judgeLine(EX, P('cos((11π)/12)'), '(-1/2)(√2/2)-(√3/2)(√2/2)').kind, 'ok');
  assert.equal(JUDGES.equiv.judgeLine(EX, P('cos((11π)/12)'), '-(√2+√6)/4').kind, 'done');
  assert.equal(JUDGES.equiv.judgeLine(EX, P('cos((11π)/12)'), '(√6-√2)/4').kind, 'wrong');
  const one = { kind: 'equiv', vars: ['x'], target: 'one-trig' };
  assert.equal(JUDGES.equiv.judgeLine(one, P('cos(7π-x)'), 'cos(π-x)').kind, 'ok');
  assert.equal(JUDGES.equiv.judgeLine(one, P('cos(π-x)'), '-cos(x)').kind, 'done');
  const goal = { kind: 'equiv', vars: ['x'], target: 'goal', goal: '2sin(2x)cos(x)', domain: { x: [-1.4, 1.4] } };
  assert.equal(JUDGES.equiv.judgeLine(goal, P('sin(3x)+sin(x)'), '2sin((3x+x)/2)cos((3x-x)/2)').kind, 'ok', 'not yet written as the goal');
  assert.equal(JUDGES.equiv.judgeLine(goal, P('2sin((3x+x)/2)cos((3x-x)/2)'), '2cos(x)sin(2x)').kind, 'done', 'factors in any order');
});

test('action menus (G3): reduce an angle, exact values', () => {
  const valid = (kind, t) => actionsFor(kind, P(t), {}).filter((o) => o.valid).map((o) => o.id);
  assert.deepEqual(valid('trig', 'cos((53π)/6)'), ['tours']);
  assert.deepEqual(valid('trig', 'cos((5π)/6)'), ['assoc']);
  assert.deepEqual(valid('trig', '-cos(π/6)'), ['value']);
  assert.deepEqual(valid('trig', 'arccos(cos(-(3π)/4))'), ['assoc']);
  assert.deepEqual(valid('trig', 'cos(7π-x)'), ['tours']);
  assert.deepEqual(valid('exact', 'cos((11π)/12)'), ['decompose']);
  assert.deepEqual(valid('exact', 'cos((2π)/3+π/4)'), ['add']);
  assert.deepEqual(valid('exact', 'cos((2π)/3)cos(π/4)-sin((2π)/3)sin(π/4)'), ['values']);
});

// ---------- step U1, part b: module G1 (first half) ----------

test('equiv and solset (G1): the item\'s functions f, g, the target short, the domain of g ∘ f', () => {
  const defs = { f: 'sqrt(x)', g: '1-x^2' };
  const cfg = { kind: 'equiv', vars: ['x'], funcs: ['f', 'g'], defs, domain: { x: [0.1, 0.9] }, target: 'short', goal: '1-x' };
  const PF = (t) => P(t, { vars: ['x'], funcs: ['f', 'g'] });
  assert.equal(JUDGES.equiv.judgeLine(cfg, PF('g(f(x))'), 'g(√x)').kind, 'ok');
  assert.equal(JUDGES.equiv.judgeLine(cfg, PF('g(√x)'), '1-(√x)^2').kind, 'ok', 'not short yet');
  assert.equal(JUDGES.equiv.judgeLine(cfg, PF('1-(√x)^2'), '1-x').kind, 'done');
  const w = JUDGES.equiv.judgeLine(cfg, PF('g(f(x))'), 'sqrt(1-x^2)');
  assert.equal(w.kind, 'wrong');
  assert.equal(w.rule, 'g1_compose_order');
  const dom = { kind: 'solset', v: 'x', funcs: ['f', 'g'], defs, exprDomain: true, simplified: '1-x' };
  assert.equal(JUDGES.solset.judgeLine(dom, PF('g(f(x))'), '[0;+∞[').kind, 'done');
  assert.equal(JUDGES.solset.judgeLine(dom, PF('g(f(x))'), 'ℝ').rule, 'g1_compose_domain');
});

test('tables (G1): a sign table judged from the student\'s own factor rows', () => {
  const item = {
    table: { cols: ['', '−2', '', '1', '', '3', ''], rows: [
      { id: 'f0', cells: Array(7).fill({ input: true, kind: 'sign' }) },
      { id: 'f1', cells: Array(7).fill({ input: true, kind: 'sign' }) },
      { id: 'f2', cells: Array(7).fill({ input: true, kind: 'sign' }) },
      { id: 'f', cells: Array(7).fill({ input: true, kind: 'sign' }) },
    ] },
    judge: { kind: 'iter', phi: { kind: 'signs', v: 'x', bounds: ['-2', '1', '3'], factors: [{ id: 'f0', f: 'x-1' }, { id: 'f1', f: '(x+2)^2', even: true }, { id: 'f2', f: '3-x', den: true }] } },
  };
  const right = {
    f0: ['−', '−', '−', '0', '+', '+', '+'], f1: ['+', '0', '+', '+', '+', '+', '+'], f2: ['+', '+', '+', '+', '+', '0', '−'],
    f: ['−', '0', '−', '0', '+', '‖', '−'],
  };
  assert.equal(checkTable(item, right).ok, true);
  const badF = { ...right, f: ['−', '0', '−', '0', '+', '0', '−'] };
  assert.equal(checkTable(item, badF).ok, false, 'a pole marked 0');
  assert.equal(checkTable(item, badF).cells.f[5], false);
  const square = { ...right, f1: ['−', '0', '+', '+', '+', '+', '+'] };
  const r = checkTable(item, square);
  assert.equal(r.ok, false);
  assert.equal(r.rule, 'g1_sign_even_root');
  // The last row follows the student's rows (error carried forward).
  assert.equal(r.cells.f[0], false, 'f is − with the student\'s rows only if their product says so');
  assert.equal(checkTable(item, { ...square, f: ['+', '0', '−', '0', '+', '‖', '−'] }).cells.f[0], true);
});

test('solset (G1): inverse with a parameter y, the branch kept', () => {
  const cfg = { kind: 'solset', v: 'x', domain: '[1;+∞[', params: { y: '[-1;+∞[' } };
  const PY = (t) => P(t, { vars: ['x', 'y'] });
  assert.equal(JUDGES.solset.judgeLine(cfg, PY('x^2-2x=y'), '(x-1)^2=y+1').kind, 'ok');
  assert.equal(JUDGES.solset.judgeLine(cfg, PY('(x-1)^2=y+1'), 'x=1+sqrt(y+1)∨x=1-sqrt(y+1)').kind, 'ok');
  assert.equal(JUDGES.solset.judgeLine(cfg, PY('x=1+sqrt(y+1)∨x=1-sqrt(y+1)'), 'x=1+sqrt(y+1)').kind, 'done');
  assert.equal(JUDGES.solset.judgeLine(cfg, PY('x=1+sqrt(y+1)∨x=1-sqrt(y+1)'), 'x=1-sqrt(y+1)').rule, 'g1_inverse_branch');
});

// ---------- step U1, part b: module G1 (second half) ----------

test('equiv with rel ≤ (G1): chains of bounds, a constant in the end', () => {
  const j = JUDGES.equiv;
  const cfg = { kind: 'equiv', vars: ['x'], domain: { x: [0, 2] }, rel: '≤', target: 'constant', bound: '3' };
  const prev = P('|x^2-1|');
  assert.equal(j.judgeLine(cfg, prev, '|x-1|×|x+1|').kind, 'ok', 'equal is fine');
  assert.equal(j.judgeLine(cfg, P('|x-1|×|x+1|'), '1×|x+1|').kind, 'ok');
  assert.equal(j.judgeLine(cfg, P('1×|x+1|'), '3').kind, 'done');
  const w = j.judgeLine(cfg, P('1×|x+1|'), '2');
  assert.equal(w.kind, 'wrong');
  assert.match(w.message, /majoration/);
  assert.equal(j.judgeLine(cfg, P('1×|x+1|'), '4').kind, 'stay', 'above the asked bound');
  assert.equal(j.judgeLine({ ...cfg, rel: '≥', bound: undefined }, P('x+1'), '1').kind, 'done', 'a lower bound');
  assert.equal(j.isFinal(cfg, P('3')), true);
});

test('solset (G1): a case ends inside the case; f(k) expanded in m', () => {
  const J1 = (cfg, prev, line) => JUDGES.solset.judgeLine({ kind: 'solset', v: 'x', ...cfg }, P(prev), line, {});
  const c = { domain: '[5;+∞[', inCase: true };
  assert.equal(J1(c, 'x^2+|x-5|≤7', 'x^2+x-12≤0').kind, 'ok');
  const raw = J1(c, 'x^2+x-12≤0', '[-4;3]');
  assert.equal(raw.kind, 'ok', 'right in the case, but not the set of the case');
  assert.match(raw.note, /cas/);
  assert.equal(J1(c, '[-4;3]', '∅').kind, 'done');
  assert.equal(J1(c, 'x^2+x-12≤0', '[5;6]').kind, 'wrong');
  const e = { kind: 'equiv', vars: ['m'], domain: { m: [-3, 3] }, target: 'expanded' };
  assert.equal(JUDGES.equiv.judgeLine(e, P('(m-2)×2^2-2m×2+m+3', { vars: ['m'] }), 'm-5').kind, 'done');
  assert.equal(JUDGES.equiv.judgeLine(e, P('(m-2)×2^2-2m×2+m+3', { vars: ['m'] }), 'm-3').kind, 'wrong');
});
