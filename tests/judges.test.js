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
