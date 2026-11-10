// The 2D math input, the keypad of each item and the free steps before an
// answer (spec §17, « Étapes libres et saisie 2D »): the drawing of
// fractions, powers and roots, the caret, the keys an item needs (every
// skill and level, school and university), and the steps checked against
// the previous line.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderChars, layoutChars, MathModel, KEYSETS } from '../js/ui/keypad.js';
import { keysForItem, typedTexts, planKeys, keyNormal, promptKeys } from '../js/ui/keys-needed.js';
import { StepChain, stepSpecOf } from '../js/judges/steps.js';
import { LinesRun } from '../js/judges/lines.js';
import { SKILLS } from '../js/content/skills.js';
import { generate, hasGenerator } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';
import { RULE_BY_ID } from '../js/math/malrules.js';
import { algHtml } from '../js/math/algebra.js';

// ---------- a small reader of the generated markup ----------

// The inner markup of the first element whose class list has cls.
function inner(html, cls) {
  const re = new RegExp(`<(span|sup|i)[^>]*class="[^"]*\\b${cls}\\b[^"]*"[^>]*>`);
  const m = re.exec(html);
  if (!m) return null;
  let depth = 1;
  let i = m.index + m[0].length;
  const tag = /<(\/?)(span|sup|i)\b[^>]*>/g;
  tag.lastIndex = i;
  for (let t; (t = tag.exec(html));) {
    depth += t[1] ? -1 : 1;
    if (depth === 0) return html.slice(i, t.index);
  }
  return html.slice(i);
}
const text = (html) => String(html).replace(/<[^>]+>/g, '').replace(/−/g, '-');
const draw = (s, caret = -1) => renderChars([...s], caret);

test('12/x: 12 over x', () => {
  const h = draw('12/x');
  assert.equal(text(inner(h, 'm-n')), '12');
  assert.equal(text(inner(h, 'm-d')), 'x');
  assert.match(inner(h, 'm-d'), /class="m-var"/);
  // In a line: x + 12/x = 7 keeps x and = 7 outside the fraction.
  const e = draw('x+12/x=7');
  assert.equal(text(inner(e, 'm-frac')), '12x');
  assert.equal(text(e), 'x+12x=7');
});

test('1/(x+1): the brackets of the denominator are not drawn', () => {
  const h = draw('1/(x+1)');
  assert.equal(text(inner(h, 'm-n')), '1');
  assert.equal(text(inner(h, 'm-d')), 'x+1');
  assert.ok(!text(h).includes('('));
  // (x+1)/2 too, and a factor before the bar is not in the numerator.
  assert.equal(text(inner(draw('(x+1)/2'), 'm-n')), 'x+1');
  assert.equal(text(inner(draw('3x/(x-1)'), 'm-n')), 'x');
  // 1/2x is ½·x, as the parsers read it.
  assert.equal(text(inner(draw('1/2x'), 'm-d')), '2');
  // An unclosed bracket stays visible.
  assert.equal(text(inner(draw('1/(x+1'), 'm-d')), '(x+1');
});

test('x^(n+1), e^(2x), x^n: the exponent is raised, without its brackets', () => {
  const h = draw('x^(n+1)');
  assert.equal(text(inner(h, 'm-sup')), 'n+1');
  assert.equal(text(h), 'xn+1');
  assert.equal(text(inner(draw('e^(2x)'), 'm-sup')), '2x');
  assert.equal(text(inner(draw('e^(2x+1)'), 'm-sup')), '2x+1'); // the chunk e^( of the keypad
  assert.equal(text(inner(draw('x^n+1'), 'm-sup')), 'n');
  assert.equal(text(inner(draw('12/x^2'), 'm-d')), 'x2');
});

test('√(x+1), √x, √2: the radical and a bar over its argument', () => {
  const h = draw('√(x+1)');
  assert.match(h, /class="m-sqrt"/);
  assert.equal(text(inner(h, 'm-rad')), '√');
  assert.equal(text(inner(h, 'm-under')), 'x+1');
  assert.ok(!text(h).includes('('));
  assert.equal(text(inner(draw('√x+1'), 'm-under')), 'x');
  assert.equal(text(inner(draw('3√2'), 'm-under')), '2');
  assert.equal(text(inner(draw('√(x+1'), 'm-under')), '(x+1'); // still open
  assert.equal(text(inner(draw('|x-1|'), 'm-abs')), '|x-1|');
});

test('every caret position is drawn exactly once', () => {
  for (const s of ['12/x', '1/(x+1)', 'x^(n+1)', '√(x+1)', '(x+1)/(x-1)', 'x^-1', '|2/x|', 'a/b/c', '()/()', '1/', '^2', '√', 'sin(x^2)', 'x+12/x=7', 'e^(2x)/2', '√(x+1)/√2']) {
    for (let c = 0; c <= s.length; c++) {
      const k = (draw(s, c).match(/class="caret"/g) || []).length;
      assert.equal(k, 1, `${s} at ${c}`);
    }
  }
});

test('the caret is inside the structure where the next character goes', () => {
  // After 12/3, a digit extends the denominator: the caret is in it.
  assert.match(inner(draw('12/3', 4), 'm-d'), /caret/);
  // After 12/x, a letter is a new factor: the caret is after the fraction.
  assert.ok(!/caret/.test(inner(draw('12/x', 4), 'm-frac')));
  // Inside the brackets of 1/(x+1), before « ) »: in the denominator.
  assert.match(inner(draw('1/(x+1)', 6), 'm-d'), /caret/);
  assert.match(inner(draw('x^(n+1)', 6), 'm-sup'), /caret/);
  assert.match(inner(draw('√(x+1)', 5), 'm-under'), /caret/);
});

test('typing: the empty fraction, the denominator, stepping out', () => {
  const m = new MathModel();
  // Nothing before the caret: the fraction key gives an empty fraction.
  for (const k of ['frac', '1', 'frac', 'x', '+', '1']) assert.ok(m.pressKey(k), k);
  assert.equal(m.value, '(1)/(x+1)');
  assert.equal(text(inner(renderChars(m.chars, m.caret), 'm-d')), 'x+1');
  m.pressKey('right');
  m.pressKey('+');
  m.pressKey('2');
  assert.equal(m.value, '(1)/(x+1)+2');
  // x + 12, fraction, x = 7, as written.
  const e = new MathModel();
  for (const k of ['x', '+', '1', '2', 'frac', 'x', '=', '7']) e.pressKey(k);
  assert.equal(e.value, 'x+12/x=7');
  // ( after the bar goes into the denominator; ) steps over a closing bracket.
  const d = new MathModel();
  for (const k of ['1', 'frac', '(', 'x', '+', '1', ')', '×', 'x']) d.pressKey(k);
  assert.equal(d.value, '1/(x+1)×x');
  // ⌫ on an empty fraction removes it.
  const b = new MathModel();
  b.pressKey('frac');
  b.pressKey('back');
  assert.equal(b.value, '');
  // ^ needs something to raise; x^(n+1) by ( ).
  const p = new MathModel();
  assert.equal(p.pressKey('^'), false);
  for (const k of ['x', '^', '(', 'n', '+', '1', ')']) p.pressKey(k);
  assert.equal(p.value, 'x^(n+1)');
  // ◀ and ▶ skip the positions next to hidden brackets.
  const r = new MathModel();
  r.set('1/(x+1)');
  r.caret = 6; // before « ) »
  r.pressKey('right');
  assert.equal(r.caret, 7);
  r.pressKey('left');
  assert.equal(r.caret, 6);
  r.caret = 3; // start of the denominator
  r.pressKey('left');
  assert.equal(r.caret, 1, 'end of the numerator');
  assert.ok(layoutChars([...'1/(x+1)']).dead.has(2));
});

test('every keypad for letters has the fraction, the power, √ and both brackets', () => {
  for (const name of ['alg', 'algeq', 'eqset', 'sys', 'opsx', 'calc', 'calcx', 'mat']) {
    const keys = KEYSETS[name];
    for (const k of ['frac', '^', '√', '(', ')']) assert.ok(keys.includes(k), `${name}: ${k}`);
  }
});

test('the keypad of rat-equation draws and writes what the question shows', () => {
  const it = generate('rat-equation', 3, makeRng(2));
  const keys = keysForItem(it).flatMap((t) => t.keys);
  for (const k of ['frac', '^', '√', '(', ')', 'x', '=', ';']) assert.ok(keys.includes(k), k);
  assert.ok(promptKeys(it.prompt).includes('frac'));
  // A university prompt in MathML: fraction, power, root, function, |·|.
  const ml = '<math><mfrac><mn>1</mn><msqrt><mi>x</mi></msqrt></mfrac><msup><mi>e</mi><mn>2</mn></msup><mi>sin</mi><mo>|</mo><mo>≤</mo></math>';
  assert.deepEqual(new Set(promptKeys(ml)), new Set(['frac', '√', '^', 'x', 'e', 'sin(', '|', '≤']));
});

// Every token of the answer, the start line and the reference lines can be
// typed on the item's keypad (its tabs and the « + » tab): the keys are
// pressed on the model, which must write the same text.
test('every item can be typed on its own keypad (school and university)', () => {
  const rng = makeRng(31);
  const fails = [];
  let n = 0;
  const check = (it, id, level) => {
    if (it.type === 'problem') { it.parts.forEach((p) => check(p, id, level)); return; }
    if (!['answer', 'steps', 'eqlines', 'lines'].includes(it.type)) return;
    n += 1;
    const keys = keysForItem(it).flatMap((t) => t.keys);
    for (const t of typedTexts(it)) {
      const plan = planKeys(t, keys);
      const m = new MathModel();
      for (const k of plan.keys) m.pressKey(k);
      if (plan.missing.length || m.value !== keyNormal(t)) fails.push(`${id} L${level}: « ${t} » → ${plan.missing.length ? `manque ${plan.missing.join(' ')}` : m.value}`);
    }
    // The question's own symbols are on the keypad.
    for (const k of promptKeys(it.prompt)) if (!keys.includes(k) && !(k === '√' && keys.includes('√('))) fails.push(`${id} L${level}: ${k} de l'énoncé`);
  };
  for (const s of SKILLS) {
    if (!hasGenerator(s.id)) continue;
    for (let level = 1; level <= 5; level++) {
      for (let i = 0; i < 2; i++) {
        let it;
        try { it = generate(s.id, level, rng); } catch { continue; }
        check(it, s.id, level);
      }
    }
  }
  assert.ok(n > 3000, `${n} items`);
  assert.deepEqual(fails.slice(0, 20), []);
});

// ---------- steps before the answer ----------

const find = (skill, level, pred, seed = 1) => {
  const rng = makeRng(seed);
  for (let i = 0; i < 400; i++) { const it = generate(skill, level, rng); if (pred(it)) return it; }
  throw new Error(`pas d'item ${skill}`);
};

test('rat-equation: x + 12/x = 7 in four checked lines', () => {
  const it = find('rat-equation', 3, (x) => x.start?.math === 'x+12/x=7');
  assert.equal(stepSpecOf(it).kind, 'eq');
  const c = new StepChain(it);
  for (const l of ['x^2+12=7x', 'x^2-7x+12=0', '(x-3)(x-4)=0', 'x=3;x=4']) assert.equal(c.submit(l).kind, 'ok', l);
  assert.equal(c.lines.length, 4);
  assert.ok(c.lines.every((l) => l.how === 'ok'));
});

test('rat-equation: a wrong line is flagged and its trap named', () => {
  const it = find('rat-equation', 3, (x) => x.start?.math === 'x+12/x=7');
  // 7 not multiplied by x.
  let c = new StepChain(it);
  let v = c.submit('x^2+12=7');
  assert.equal(v.kind, 'wrong');
  assert.equal(v.rule, 'eq_mult_one_term');
  assert.ok(RULE_BY_ID.eq_mult_one_term);
  assert.equal(c.lines.length, 0, 'a wrong line is not kept');
  // 12/x · x written 12x.
  c = new StepChain(it);
  v = c.submit('x^2+12x=7x');
  assert.equal(v.kind, 'wrong');
  assert.match(v.message, /solution/);
  // Right, then a wrong factorisation.
  c = new StepChain(it);
  c.submit('x^2-7x+12=0');
  assert.equal(c.submit('(x+3)(x+4)=0').kind, 'wrong');
  // x = 3 ou x = −3 from (x² − 9)/(x − 3) = 0: right on the domain, the
  // final answer then drops the forbidden value.
  const l5 = find('rat-equation', 5, () => true);
  const a = Number(/x-(\d)\)=0/.exec(l5.start.math)[1]);
  c = new StepChain(l5);
  assert.equal(c.submit(`x^2-${a * a}=0`).kind, 'ok');
  assert.equal(c.submit(`x=${a};x=-${a}`).kind, 'ok');
});

test('school steps: equations, expressions, numbers, systems, formulas', () => {
  // A product equal to 0.
  const p = find('eq-product', 3, () => true);
  let c = new StepChain(p);
  assert.equal(c.submit(p.expected).kind, 'ok');
  assert.equal(new StepChain(p).submit('x=100').kind, 'wrong');
  // An identity: the trap of the final answer is named on a line.
  const id = find('lit-identities', 2, (x) => x.algTraps?.length > 0);
  c = new StepChain(id);
  assert.equal(c.submit(id.target).kind, 'ok');
  const w = new StepChain(id).submit(id.algTraps[0].expr);
  assert.equal(w.kind, 'wrong');
  assert.equal(w.rule, id.algTraps[0].rule);
  // A calculation with fractions: same value, and the diagnosis of a trap.
  const f = find('lit-value', 2, (x) => !!x.start);
  c = new StepChain(f);
  assert.equal(stepSpecOf(f).kind, 'value');
  assert.equal(c.submit(f.expected).kind, 'ok');
  assert.equal(new StepChain(f).submit(`${f.expected}+1`).kind, 'wrong');
  // A system: each line holds at the solution.
  const s = find('eq-systems', 4, () => true);
  c = new StepChain(s);
  assert.equal(c.submit(s.start.math.split(';')[0]).kind, 'ok');
  assert.equal(c.submit(s.expected).kind, 'ok');
  assert.equal(new StepChain(s).submit('x=1000').kind, 'wrong');
  // Isolating a letter.
  const iso = find('iso-formula', 4, (x) => x.start.math === 'A=πr^2');
  c = new StepChain(iso);
  assert.equal(c.submit('r^2=A/π').kind, 'ok');
  assert.equal(c.submit('r=√(A/π)').kind, 'ok');
  const bad = new StepChain(iso).submit('r=A/π');
  assert.equal(bad.kind, 'wrong');
  assert.equal(bad.rule, 'iso_forget_root');
  // Parameters: x² − 2ax + a² = 1.
  const pq = find('param-quadratic', 2, () => true);
  c = new StepChain(pq);
  assert.equal(c.submit('(x-a)^2=1').kind, 'ok');
  assert.equal(c.submit('x-a=1;x-a=-1').kind, 'ok');
  assert.equal(c.submit('x=a+2').kind, 'wrong');
  // A root to simplify.
  const sq = find('ar-surd', 3, () => true);
  c = new StepChain(sq);
  for (const l of sq.solution.map((x) => x.math)) assert.equal(c.submit(l).kind, 'ok', l);
  assert.equal(new StepChain(sq).submit('√2').kind, 'wrong');
});

test('without a start, the steps are brouillon', () => {
  const g = find('fn-from-graph', 2, () => true);
  assert.equal(stepSpecOf(g), null);
  const c = new StepChain(g);
  assert.equal(c.submit('y=2x+1').kind, 'draft');
  assert.equal(c.submit('n\'importe quoi').kind, 'draft');
  assert.equal(c.lines.length, 2);
  assert.ok(c.lines.every((l) => l.how === 'draft'));
  // The university short answers (exam variant coef) too.
  const u = generate('g6-tangent', 5, makeRng(3), null, { exam: 'coef' });
  assert.equal(u.type, 'answer');
  assert.equal(new StepChain(u).submit('2+3').kind, 'draft');
});

test('school items with an algebraic checker know their start, and accept their own answer as a step', () => {
  const rng = makeRng(9);
  const ALG = new Set(['alg', 'solset', 'system', 'isolate', 'paramset', 'eqzero']);
  const missing = new Set();
  const bad = [];
  for (const s of SKILLS) {
    if (!hasGenerator(s.id) || s.year >= 13) continue;
    for (let level = 1; level <= 5; level++) {
      const it = generate(s.id, level, rng);
      if (it.type !== 'answer') continue;
      if (ALG.has(it.checker) && !it.start && s.id !== 'fn-from-graph') missing.add(s.id);
      if (!it.start) continue;
      const c = new StepChain(it);
      const lines = (it.solution || []).filter((l) => !l.html && l.math).map((l) => l.math);
      for (const l of [...lines, it.expected === 'aucune' ? null : it.expected].filter(Boolean)) {
        const v = c.submit(l);
        if (v.kind !== 'ok' && v.kind !== 'same') { bad.push(`${s.id} L${level}: ${it.start.math} → ${l}: ${v.kind} ${v.message ?? ''}`); break; }
      }
    }
  }
  assert.deepEqual([...missing], []);
  assert.deepEqual(bad, []);
});

test('university lines in free mode accept several lines', () => {
  // A coefficient (exam variant coef): one reference line, yet steps are fine.
  const it = generate('l-mat-product', 4, makeRng(3), null, { exam: 'coef' });
  assert.equal(it.type, 'lines');
  assert.equal(it.mode, 'free');
  const run = new LinesRun(it);
  const v = it.script[0].math;
  assert.equal(run.submit(`(${v})×3/3`).kind, 'ok');
  assert.equal(run.submit(`2×(${v})-(${v})`).kind, 'ok');
  assert.equal(run.submit(v).kind, 'done');
  // A derivative written line by line (equiv), level 4 (free).
  const d = generate('g6-deriv-rules', 4, makeRng(5));
  assert.notEqual(d.mode, 'guided');
  const r = new LinesRun(d);
  const eqs = d.script.filter((l) => l.kind === 'eq');
  let last;
  for (const l of eqs) last = r.submit(l.math);
  assert.ok(last.finished || r.seg > 0 || last.kind === 'done', last.kind);
});

test('a line is drawn in 2D like the question', () => {
  // The same structure as the question's markup.
  const q = algHtml('x+12/x=7');
  assert.equal(text(inner(q, 'm-d')), text(inner(draw('x+12/x=7'), 'm-d')));
  assert.equal(text(inner(q, 'm-n')), text(inner(draw('x+12/x=7'), 'm-n')));
});

// The digits of a keypad keep the phone layout: 7 8 9 on one row, 4 5 6 right
// under them, 1 2 3 under those. Columns: as in css/style.css (.keypad
// .keys-<name>), a custom list of keys is 6 wide.
test('keypads keep the digit block 7 8 9 / 4 5 6 / 1 2 3', () => {
  const COLS = { fracdec: 4, ops: 5, opsx: 5, alg: 6, algeq: 6, eqset: 5, sys: 5 };
  const aligned = (keys, cols) => {
    const pos = (k) => { const i = keys.indexOf(k); return i < 0 ? null : [Math.floor(i / cols), i % cols]; };
    const p = Object.fromEntries('123456789'.split('').map((d) => [d, pos(d)]));
    if (Object.values(p).some((x) => !x)) return true;
    const [r, c] = p['7'];
    return ['789', '456', '123'].every((row, k) => row.split('').every((d, i) => p[d][0] === r + k && p[d][1] === c + i));
  };
  const bad = [];
  for (const [name, cols] of Object.entries(COLS)) if (!aligned(KEYSETS[name], cols)) bad.push(name);
  const rng = makeRng(3);
  for (const s of SKILLS) {
    if (!hasGenerator(s.id)) continue;
    for (const level of [1, 2, 3, 4, 5]) {
      let it;
      try { it = generate(s.id, level, rng); } catch { continue; }
      if (Array.isArray(it?.keys) && !it.keys.every((k) => k.length > 1) && !aligned(it.keys, 6)) bad.push(`${s.id} L${level}`);
    }
  }
  assert.deepEqual([...new Set(bad)], []);
});
