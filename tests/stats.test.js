// Step U7: the laws and tables of js/cas/stats.js against the course
// formularies, the judges `prob` and `stat` (a right line, a typical wrong
// line, the final form, errors carried forward), the simulations and the
// « Interpréter » question.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as S from '../js/cas/stats.js';
import { JUDGES, readWith } from '../js/judges/index.js';
import { judgeInterpret, withInterpretation } from '../js/judges/interpret.js';
import { simulate } from '../js/engine/simulate.js';
import { statItem, H } from '../js/content/uni/proba-kit.js';
import { checkScript, LinesRun } from '../js/judges/lines.js';

const near = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol, `${msg ?? ''} ${a} vs ${b}`);

// The tables of docs/universite/P-probabilites.md (« Tables »).
const md = readFileSync('docs/universite/P-probabilites.md', 'utf8').split('\n');
function table(title) {
  const at = md.findIndex((l) => l.startsWith(title));
  const rows = [];
  for (let i = at + 1; i < md.length; i++) {
    const l = md[i];
    if (!l.startsWith('|')) { if (rows.length) break; continue; }
    if (/^\|\s*-/.test(l) || /^\|\s*[a-zνr1]\s*\|/.test(l) && !/^\|\s*1\s*\|/.test(l)) continue;
    rows.push(l.split('|').slice(1, -1).map((x) => x.trim()));
  }
  return rows;
}

test('Φ, Φ⁻¹, Student, χ², F and the discrete laws', () => {
  near(S.Phi(1.96), 0.975, 1e-4, 'Φ(1,96)');
  near(S.Phi(0), 0.5, 1e-15);
  near(S.Phi(-1) + S.Phi(1), 1, 1e-15);
  near(S.Phi(-5), 2.866515718791939e-7, 1e-15);
  for (const p of [0.001, 0.025, 0.3, 0.5, 0.9, 0.975, 0.9999]) near(S.Phi(S.PhiInv(p)), p, 1e-13, `Φ⁻¹(${p})`);
  near(S.tCdf(2.306, 8), 0.975, 1e-4);
  near(S.tInv(0.975, 8), 2.306004, 1e-6);
  near(S.chi2Cdf(11.070, 5), 0.95, 1e-4);
  near(S.chi2Inv(0.95, 10), 18.307, 1e-3);
  near(S.fInv(0.95, 2, 16), 3.634, 1e-3);
  assert.equal(S.choose(32, 4), 35960);
  assert.equal(S.arrange(8, 3), 336);
  near(S.binom(5, 3, 0.6), 0.3456, 1e-12);
  near(S.poissonCdf(1, 2), 3 * Math.exp(-2), 1e-12);
});

test('the four MATH-234 tables are reproduced exactly', () => {
  let n = 0;
  for (const r of table('Table 1 (MATH-234)')) for (let c = 0; c < r.length; c += 2) { assert.equal(S.phiTable(Number(r[c])), Number(r[c + 1]), `Φ(${r[c]})`); n++; }
  for (const r of table('Table 2 (MATH-234)')) for (let c = 0; c < r.length; c += 2) { assert.equal(S.phiInvTable(r[c]), Number(r[c + 1]), `Φ⁻¹(${r[c]})`); n++; }
  for (const r of table('Table 3 (MATH-234)')) {
    for (let c = 0; c < r.length; c += 4) {
      const nu = r[c] === '∞' ? Infinity : Number(r[c]);
      [5, 1, 0.1].forEach((a, i) => { assert.equal(S.studentTable(nu, a), Number(r[c + 1 + i]), `s_${a}(${r[c]})`); n++; });
    }
  }
  for (const r of table('Table 4 (MATH-234)')) {
    for (let c = 0; c < r.length; c += 4) [5, 1, 0.1].forEach((a, i) => { near(S.chi2Table(Number(r[c]), a), Number(r[c + 1 + i]), 5e-4, `χ²_${a}(${r[c]})`); n++; });
  }
  assert.equal(n, 200 + 200 + 120 + 108);
  // The Student quantiles the course reads: ν ≥ 200 is the normal line.
  assert.equal(S.courseT(8), 2.306);
  assert.equal(S.courseT(250), 1.96);
  assert.equal(S.courseT(31), null, 'ν = 31 is not in the table');
  // Readings of Table 1 off the grid: both neighbours and the exact value.
  const acc = S.phiAccepted(2.82);
  assert.ok(acc.includes(0.997) && acc.includes(0.998));
  // EE-209: printed values (some are truncated).
  assert.equal(S.eeT(0.99, 1), 63.6);
  assert.deepEqual(S.EE_Z[0.95], [1.645, 1.96]);
});

test('rounding a confidence interval (EE-209, part 3b)', () => {
  const r = S.ciRound(1.069871, 0.002415);
  assert.deepEqual([r.u, r.theta, r.lo, r.hi], [0.0024, 1.0699, 1.0674, 1.0723]);
  assert.deepEqual(S.roundCI(17.6941, 22.3059, 2), [17.69, 22.31]);
  assert.deepEqual(S.sigRound(0.0995, 2), { value: 0.1, digits: 2 }, '0,0995 → 0,10');
});

test('judge prob: exact values, symbols, C(n, k), final form', () => {
  const j = JUDGES.prob;
  const cfg = { kind: 'prob', label: 'Pr(A∪B)', start: 'Pr(A∪B)', expect: '9/10', symbols: { 'Pr(A)': '1/2', 'Pr(B)': '7/10', 'Pr(A∩B)': '3/10' }, traps: { p_union_add: ['6/5'] } };
  const start = readWith(cfg, 'Pr(A∪B)');
  assert.equal(j.judgeLine(cfg, start, 'Pr(A)+Pr(B)-Pr(A∩B)').kind, 'ok');
  assert.equal(j.judgeLine(cfg, start, '0,5+0,7-0,3').kind, 'ok');
  assert.equal(j.judgeLine(cfg, start, 'Pr(A∪B) = 0,9').kind, 'done', 'a label first');
  const w = j.judgeLine(cfg, start, '1,2');
  assert.equal(w.kind, 'wrong');
  assert.equal(w.rule, 'p_union_add');
  const c2 = { kind: 'prob', expect: '15/28' };
  assert.equal(j.judgeLine(c2, readWith(c2, '?'), 'C(5,2)×C(3;1)/C(8,3)').kind, 'ok');
  assert.equal(j.judgeLine(c2, readWith(c2, '?'), '30/56').kind, 'ok', 'a reducible fraction is a step');
  assert.equal(j.judgeLine(c2, readWith(c2, '?'), '15/28 ≈ 0,536').kind, 'done');
  assert.equal(j.judgeLine(c2, readWith(c2, '?'), '0,536').kind, 'wrong', 'a rounding is not the exact value');
  assert.equal(j.judgeLine({ kind: 'prob', expect: '120' }, readWith({ kind: 'prob' }, '?'), '5!').kind, 'ok');
  assert.equal(j.judgeLine({ kind: 'prob', expect: '120' }, readWith({ kind: 'prob' }, '?'), 'A(5,3)×2').kind, 'ok');
  // Expression lines: a log-likelihood up to an additive constant.
  const ell = { kind: 'prob', vars: ['λ'], domain: { λ: [0.5, 4] }, upToConstant: true, expect: '16ln(λ)-8λ' };
  assert.equal(j.judgeLine(ell, readWith(ell, '?'), '16ln(λ)-8λ+5').kind, 'done');
  assert.equal(j.judgeLine(ell, readWith(ell, '?'), '16ln(λ)-8').kind, 'wrong');
});

test('judge stat: tolerance, table readings, intervals, outward rounding, significant digits', () => {
  const j = JUDGES.stat;
  const st = readWith({ kind: 'stat' }, '?');
  const cfg = { kind: 'stat', expect: '1-#phi(2)', decimals: 3, traps: { p_upper_tail: ['0,977'] } };
  assert.equal(j.judgeLine(cfg, st, '1-Φ(2)').kind, 'ok');
  assert.equal(j.judgeLine(cfg, st, '1-0,977').kind, 'ok');
  assert.equal(j.judgeLine(cfg, st, '0,023').kind, 'done');
  const w = j.judgeLine(cfg, st, '0,977');
  assert.equal(w.kind, 'wrong');
  assert.equal(w.rule, 'p_upper_tail');
  const tab = { kind: 'stat', expect: String(S.Phi(2.82)), decimals: 4, accept: S.phiAccepted(2.82) };
  assert.equal(j.judgeLine(tab, st, '0,997').kind, 'done');
  assert.equal(j.judgeLine(tab, st, '0,998').kind, 'done');
  assert.equal(j.judgeLine(tab, st, '0,995').kind, 'wrong');
  const ic = { kind: 'stat', expect: ['20-2,306', '20+2,306'], decimals: 3 };
  assert.equal(j.judgeLine(ic, st, '[17,694 ; 22,306]').kind, 'done');
  assert.equal(j.judgeLine(ic, st, '[17,694 ; 22,4]').kind, 'wrong');
  const out = { kind: 'stat', expect: ['1,069871-0,002415', '1,069871+0,002415'], ciRule: 'outward', digits: 4, traps: { p_ci_round_nearest: ['[1,0675 ; 1,0723]'] } };
  assert.equal(j.judgeLine(out, st, '[1,0674 ; 1,0723]').kind, 'done');
  assert.equal(j.judgeLine(out, st, '[1,0675 ; 1,0723]').rule, 'p_ci_round_nearest');
  const u = { kind: 'stat', expect: '0,0024', decimals: 4, sig: 2 };
  assert.equal(j.judgeLine(u, st, '0,002415').kind, 'stay', 'two significant digits');
  assert.equal(j.judgeLine(u, st, '0,0024').kind, 'done');
});

test('named values: an error is carried forward to the next parts', () => {
  const it = statItem({
    skill: 'p-test-t1', level: 4, key: 'carry', prompt: 'Données 86, 90, 84, 92, 88.',
    parts: [
      { label: 'x̄', name: 'xbar', kind: 'prob', expect: '88', lines: [{ math: '(86+90+84+92+88)/5' }, { math: '88' }] },
      { label: 's²', name: 's2', kind: 'prob', expect: '10', lines: [{ math: '40/4' }, { math: '10' }] },
      { label: 't_obs', name: 't', kind: 'stat', decimals: 2, expect: '($xbar-84)/√($s2/5)', lines: [{ math: '4/√2' }, { math: '2,83' }] },
    ],
    hints: H('a', 'b', 'c'),
    interpret: { options: [{ html: 'juste', correct: true }, { html: 'faux', correct: false, rule: 'p_pvalue_h0' }] },
  });
  assert.ok(checkScript(it).ok);
  const run = new LinesRun(it);
  assert.equal(run.submit('87').kind, 'wrong');
  run.follow();
  assert.equal(run.submit('10').kind, 'done');
  assert.equal(run.submit('2,83').kind, 'wrong', 'the reference value is not what the student\'s x̄ gives');
  assert.equal(run.submit('3/√2').kind, 'ok');
  // The interpretation: a wrong choice fails the item and names its trap.
  assert.deepEqual(judgeInterpret(it, 1), { correct: false, rule: 'p_pvalue_h0' });
  const o = withInterpretation({ correct: true, rules: [], subgoals: [] }, judgeInterpret(it, 1));
  assert.equal(o.correct, false);
  assert.deepEqual(o.rules, ['p_pvalue_h0']);
  assert.ok(withInterpretation({ correct: true, rules: [], subgoals: [] }, judgeInterpret(it, 0)).subgoals.includes('p-interpret'));
});

test('simulations: frequencies close to the probabilities, reproducible', () => {
  const urn = simulate({ model: 'urn', balls: { R: 5, B: 3 }, draw: 3, replace: false, count: 'R', event: { op: 'eq', k: 2 } }, 7);
  near(urn.freq, 15 / 28, 0.02, 'urn');
  assert.deepEqual(simulate({ model: 'dice', dice: 2, stat: 'sum', event: { op: 'eq', k: 7 } }, 3), simulate({ model: 'dice', dice: 2, stat: 'sum', event: { op: 'eq', k: 7 } }, 3));
  const bayes = simulate({ model: 'bayes', prev: 0.1, sens: 0.9, fpr: 0.2, event: { op: 'eq', k: 1 }, given: { positive: true } }, 5);
  near(bayes.freq, 0.09 / 0.27, 0.03, 'Bayes');
  const clt = simulate({ model: 'sum', n: 16, of: { model: 'normal', mu: 70, sigma: 20 }, event: { op: 'gt', k: 1280 } }, 9);
  near(clt.freq, 1 - S.Phi(2), 0.01, 'sum');
  assert.equal(urn.n, 10000);
});
