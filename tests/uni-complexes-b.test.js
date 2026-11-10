// Items of the university unit `complexes`, part b (step U4; helpers and
// checks: tests/uni-check.js), and the mode 'locus' of the poly judge
// (js/judges/locus.js) that judges the loci until the geom judge of U5.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSkills } from './uni-check.js';
import { SKILLS } from '../js/content/uni/complexes-b.skills.js';
import { JUDGES } from '../js/judges/index.js';

test('unit complexes, part b: every skill, 5 levels and exam variants', () => checkSkills(SKILLS.map((s) => s.id)));

const poly = JUDGES.poly;
function play(cfg, start, lines) {
  let prev = poly.parseLine(cfg, start);
  return lines.map((l) => {
    const v = poly.judgeLine(cfg, prev, l);
    if (v.kind === 'ok' || v.kind === 'done' || v.kind === 'stay') prev = v.node;
    return v;
  });
}
const LOCUS = (locus, target, extra = {}) => ({ kind: 'poly', mode: 'locus', cv: 'z', xy: ['x', 'y'], locus, target, ...extra });

test('locus mode: a bisector from |z − a| = |z − b| to its equation', () => {
  const cfg = LOCUS({ kind: 'line', a: 2, b: 1, c: 3 }, 'line');
  const v = play(cfg, '|z-2i|=|z+4|', ['x^2+(y-2)^2=(x+4)^2+y^2', '-4y+4=8x+16', '2x+y+3=0']);
  assert.deepEqual(v.map((x) => x.kind), ['ok', 'ok', 'done']);
  assert.equal(play(cfg, '|z-2i|=|z+4|', ['-4y=8x+12'])[0].kind, 'stay', 'a common factor is left');
  const bad = play(cfg, '|z-2i|=|z+4|', ['x^2+(y-2)^2=(x-4)^2+y^2'])[0];
  assert.equal(bad.kind, 'wrong');
  assert.equal(bad.rule, 'g8_locus_sign');
});

test('locus mode: a region keeps its side and its strictness', () => {
  const cfg = LOCUS({ kind: 'circle', c: [6, 0], r2: 41 }, 'circle');
  const start = 'z(conj(z)-3)<6Re(z)+3conj(z)+5';
  assert.deepEqual(play(cfg, start, ['x^2+y^2-12x-5<0', '(x-6)^2+y^2<41']).map((x) => x.kind), ['ok', 'done']);
  for (const wrong of ['(x-6)^2+y^2≤41', '(x-6)^2+y^2>41', '(x-6)^2+y^2<40', '(x-6)^2+y^2=41']) {
    assert.equal(play(cfg, start, [wrong])[0].kind, 'wrong', wrong);
  }
});

test('locus mode: the image by w = 1/z̄ leaves 0 out, and z = 1/w is named', () => {
  const cfg = LOCUS({ kind: 'circle', c: [0, 0.5], r2: 0.25 }, 'circle', { cv: 'w', inversion: true, exclude: [[0, 0]] });
  const v = play(cfg, 'Im(1/conj(w))=1', ['y/(x^2+y^2)=1', 'y=x^2+y^2', 'x^2+(y-1/2)^2=1/4']);
  assert.deepEqual(v.map((x) => x.kind), ['ok', 'ok', 'done']);
  const bad = play(cfg, 'Im(1/conj(w))=1', ['x^2+(y+1/2)^2=1/4'])[0];
  assert.equal(bad.rule, 'g8_inversion_conj');
  // A circle through 0 becomes a line: |1/w̄ − (2 + i)| = √5 ⇔ 4x + 2y = 1.
  const line = LOCUS({ kind: 'line', a: 4, b: 2, c: -1 }, 'line', { cv: 'w', exclude: [[0, 0]] });
  assert.deepEqual(play(line, '|1/conj(w)-(2+i)|=√5', ['|1-(2+i)conj(w)|=√5×|w|', '4x+2y=1']).map((x) => x.kind), ['ok', 'done']);
});
