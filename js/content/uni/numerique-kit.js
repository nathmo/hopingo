// Shared tools of module N (unit `numerique`, step U9). Catalogue:
// docs/universite/N-analyse-numerique.md, « Conventions communes du module ».
//
// Items `code` (spec §6, §12; judged by js/judges/code.js):
//   const R = refCode(`def f(x):\n    return «x + 1»\n`)   reference with «…» holes
//   codeItem({skill, level, prompt, ref: R, blanks: [k…] (holes shown as ???,
//     the others filled), choice?: k (one hole as a multiple choice, level 1),
//     traps: {k: [{text, rule}]}, fillers?: {k: [text]} (wrong options without
//     a trap), wrong?: {k: text}, preludes: ['vec', 'mat'] + extra (prelude
//     text), signatures?, tests, maxSteps?, then?, hints, solution?, subgoals,
//     key, expectedSec?, exam?})
//   holesFor(level, R, {focus, linked, loop}) the catalogue's progression:
//     L1 one hole (choice), L2 one typed hole, L3 2–3 linked holes, L4 the
//     holes of the loop, L5 every hole.
//   codeMcq({...}) the exam format: the program with one ??? in the prompt,
//     four options (the traps), as a plain `mcq`.
// Items `readtable` (spec §6): readtableItem({skill, level, prompt, table:
//   {columns: [html], rows: [[cell text]]}, question: item, hints, …});
//   tableHtml(table) draws it (for an exam mcq too).
// Iteration tables (`table` with judge iter, js/judges/iter-num.js):
//   iterTable({skill, level, prompt, phi, cols: [{id, label, auto?}], n,
//     given: (k, id) => bool, …}) builds rows, answers and solution from
//     referenceRows(phi, n).
// Numbers: fmt (fractions kept), expText (2.032035e-02), fr (−, comma).

import { tableItem, mcq, fr } from './kit.js';
import { t } from '../../i18n.js';
import { referenceRows, fmt, expText, fv } from '../../judges/iter-num.js';

export { fmt, expText, fv, referenceRows };

export const PRELUDE_VEC = `import math

def zeros(n):
    v = []
    for i in range(n):
        v.append(0.0)
    return v

def dot(u, v):
    s = 0.0
    for i in range(len(u)):
        s = s + u[i] * v[i]
    return s

def norm(v):
    return math.sqrt(dot(v, v))
`;

export const PRELUDE_MAT = `def zeros2(n, m):
    A = []
    for i in range(n):
        A.append(zeros(m))
    return A

def eye(n):
    A = zeros2(n, n)
    for i in range(n):
        A[i][i] = 1.0
    return A

def copy2(A):
    B = []
    for i in range(len(A)):
        row = []
        for j in range(len(A[i])):
            row.append(A[i][j])
        B.append(row)
    return B

def matvec(A, x):
    y = zeros(len(A))
    for i in range(len(A)):
        for j in range(len(x)):
            y[i] = y[i] + A[i][j] * x[j]
    return y

def transpose(A):
    T = zeros2(len(A[0]), len(A))
    for i in range(len(A)):
        for j in range(len(A[0])):
            T[j][i] = A[i][j]
    return T

def matmul(A, B):
    C = zeros2(len(A), len(B[0]))
    for i in range(len(A)):
        for j in range(len(B[0])):
            for k in range(len(B)):
                C[i][j] = C[i][j] + A[i][k] * B[k][j]
    return C

def solve(A, b):
    # Gauss avec pivot partiel, sur des copies ; joue le rôle de A\\b
    n = len(A)
    M = copy2(A)
    x = []
    for i in range(n):
        x.append(b[i])
    for k in range(n - 1):
        p = k
        for i in range(k + 1, n):
            if abs(M[i][k]) > abs(M[p][k]):
                p = i
        tmp = M[k]
        M[k] = M[p]
        M[p] = tmp
        tmp = x[k]
        x[k] = x[p]
        x[p] = tmp
        for i in range(k + 1, n):
            l = M[i][k] / M[k][k]
            for j in range(k, n):
                M[i][j] = M[i][j] - l * M[k][j]
            x[i] = x[i] - l * x[k]
    for i in range(n - 1, -1, -1):
        s = x[i]
        for j in range(i + 1, n):
            s = s - M[i][j] * x[j]
        x[i] = s / M[i][i]
    return x
`;

export const SIG_VEC = [t('zeros(n) : liste de n zéros'), t('dot(u, v) : produit scalaire'), t('norm(v) : norme euclidienne'), 'math.sqrt, math.exp, math.log, math.sin, math.cos, math.pi'];
export const SIG_MAT = [t('zeros2(n, m) : matrice n × m de zéros'), t('eye(n) : identité'), t('copy2(A) : copie'), 'matvec(A, x) : A·x', 'transpose(A)', 'matmul(A, B) : A·B', t('solve(A, b) : solution de Ax = b (comme A\\b)')];

// The reference program: «…» marks the holes. → {parts, answers}
// parts: the text around the holes (parts.length = answers.length + 1).
export function refCode(text) {
  const parts = [];
  const answers = [];
  let rest = String(text);
  for (;;) {
    const a = rest.indexOf('«');
    if (a < 0) { parts.push(rest); break; }
    const b = rest.indexOf('»', a);
    parts.push(rest.slice(0, a));
    answers.push(rest.slice(a + 1, b));
    rest = rest.slice(b + 1);
  }
  return { parts, answers, text: parts.map((p, i) => p + (answers[i] ?? '')).join('') };
}

// The source shown: the holes of `blanks` as ???, the others filled.
export function sourceOf(R, blanks) {
  const set = new Set(blanks);
  return R.parts.map((p, i) => p + (i < R.answers.length ? (set.has(i) ? '???' : R.answers[i]) : '')).join('');
}

// The line of a hole, its text with ??? (for an exam question).
export function lineOf(R, k) {
  const src = sourceOf(R, [k]);
  const lines = src.split('\n');
  return lines.find((l) => l.includes('???'))?.trim() ?? '';
}

// The catalogue's progression of holes. focus: the hole of levels 1–2;
// linked: 2 or 3 holes of level 3; loop: the holes of level 4 (default
// all).
export function holesFor(level, R, { focus = 0, linked = null, loop = null } = {}) {
  const all = R.answers.map((_, k) => k);
  if (level <= 2) return [focus];
  if (level === 3) return linked || all.slice(0, Math.min(3, all.length));
  if (level === 4) return loop || all;
  return all;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const codeHtml = (src) => `<pre class="code-block">${esc(src)}</pre>`;
export const codeInline = (s) => `<code>${esc(s)}</code>`;

export function codeItem(o) {
  const R = o.ref;
  const blanks = [...o.blanks].sort((a, b) => a - b);
  const preludes = o.preludes || ['vec'];
  const prelude = preludes.map((p) => (p === 'vec' ? PRELUDE_VEC : p === 'mat' ? PRELUDE_MAT : p)).join('\n');
  const signatures = o.signatures || [...(preludes.includes('vec') ? SIG_VEC : []), ...(preludes.includes('mat') ? SIG_MAT : [])];
  const holes = blanks.map((k) => {
    const h = { answer: R.answers[k], traps: (o.traps?.[k] || []).slice() };
    if (o.wrong?.[k]) h.wrong = o.wrong[k];
    if (o.choice === k) {
      const seen = new Set([R.answers[k]]);
      const options = [{ text: R.answers[k], correct: true }];
      for (const tr of [...(o.traps?.[k] || []), ...(o.fillers?.[k] || []).map((text) => ({ text }))]) {
        if (options.length >= 4 || seen.has(tr.text)) continue;
        seen.add(tr.text);
        options.push({ text: tr.text, correct: false, ...(tr.rule ? { rule: tr.rule } : {}) });
      }
      h.options = o.rng ? o.rng.shuffle(options) : options;
    }
    return h;
  });
  const exam = o.exam || false;
  const noHints = o.noHints ?? (o.level >= 5 || !!exam);
  const baits = [...new Set(holes.flatMap((h) => [...h.traps.map((x) => x.rule), ...(h.options || []).map((x) => x.rule)]).filter(Boolean))];
  return {
    skill: o.skill, level: o.level, type: 'code', lang: 'python',
    prompt: o.prompt,
    source: sourceOf(R, blanks),
    holes, prelude, signatures,
    tests: o.tests,
    maxSteps: o.maxSteps || 200000,
    then: o.then || null,
    hints: noHints ? [] : o.hints,
    noHints,
    solution: o.solution || [{ html: codeHtml(R.text), note: t('Le programme complet') }],
    subgoals: o.subgoals || [],
    baits: o.baits || baits,
    key: `${o.skill}:code:${o.key}`,
    expectedSec: o.expectedSec || 60 + 40 * blanks.length,
    exam,
    fallback: !!o.fallback,
  };
}

// The exam format: one line with ???, four options from the traps.
export function codeMcq(o, rng) {
  const R = o.ref;
  const k = o.hole;
  const options = [{ html: codeInline(R.answers[k]), correct: true }];
  const seen = new Set([R.answers[k]]);
  for (const tr of [...(o.traps?.[k] || []), ...(o.fillers?.[k] || []).map((text) => ({ text }))]) {
    if (options.length >= 4 || seen.has(tr.text)) continue;
    seen.add(tr.text);
    options.push({ html: codeInline(tr.text), correct: false, ...(tr.rule ? { rule: tr.rule } : {}) });
  }
  return mcq({
    skill: o.skill, level: o.level ?? 4, key: `${o.skill}:codemcq:${o.key}`,
    prompt: `${o.prompt}${codeHtml(o.excerpt ? o.excerpt(R, k) : sourceOf(R, [k]))}${t('Que faut-il écrire à la place de {q} ?', { q: codeInline('???') })}`,
    options, exam: o.exam || false, solution: o.solution || [{ html: codeHtml(R.text), note: '' }],
    multi: !!o.multi, expectedSec: o.expectedSec || 60,
  }, rng);
}

// ---------- tables to read ----------

export function tableHtml(tb) {
  const head = `<tr>${tb.columns.map((c) => `<th>${c}</th>`).join('')}</tr>`;
  const body = tb.rows.map((r) => `<tr>${r.map((c) => `<td>${c ?? ''}</td>`).join('')}</tr>`).join('');
  return `<div class="table-wrap"><table class="u-table read-table">${head}${body}</table></div>`;
}

export function readtableItem(o) {
  const exam = o.exam || false;
  const noHints = o.noHints ?? (o.level >= 5 || !!exam);
  const q = { ...o.question, level: o.level, exam, hints: [], noHints: true };
  return {
    skill: o.skill, level: o.level, type: 'readtable', prompt: o.prompt,
    table: o.table, question: q,
    hints: noHints ? [] : o.hints,
    noHints,
    solution: o.solution || q.solution || [],
    subgoals: o.subgoals || [],
    baits: [...new Set([...(o.baits || []), ...(q.baits || [])])],
    key: `${o.skill}:read:${o.key}`,
    expectedSec: o.expectedSec || 90,
    exam,
    fallback: !!o.fallback,
  };
}

// A multiple choice with one or several right options (exam scale +1/N,
// −1/M). options: [{html, correct, rule?}].
export function multiMcq(o, rng) {
  const it = mcq({ ...o, multi: true, prompt: `${o.prompt}<br><i>${t('Une ou plusieurs réponses justes.')}</i>` }, rng);
  return it;
}

// « Vrai ou faux ? » as a two-option multiple choice (the exam turns it
// into a tf question, js/engine/exam.js vfAsTf).
export function vfMcq(o, rng) {
  return mcq({
    skill: o.skill, level: o.level ?? 4, key: o.key, keepOrder: true,
    prompt: `${t('Vrai ou faux ?')}<br>${o.statement}`,
    options: [{ html: t('Vrai'), correct: !!o.truth, ...(o.truth ? {} : o.ruleIfTrue ? { rule: o.ruleIfTrue } : {}) },
      { html: t('Faux'), correct: !o.truth, ...(o.truth && o.ruleIfFalse ? { rule: o.ruleIfFalse } : {}) }],
    exam: o.exam || false,
    solution: o.solution || (o.explanation ? [{ html: o.explanation, note: '' }] : []),
  }, rng);
}

// ---------- iteration tables ----------

// cols: [{id, label, auto?}] (ids of js/judges/iter-num.js); given(k, id):
// the cell of row k is shown; rowLabel(k).
export function iterTable(o) {
  const phi = { ...o.phi, cols: o.cols.map((c) => c.id) };
  const ref = o.ref || referenceRows(phi, o.n);
  const show = o.show || ((v) => fmt(v, 12));
  const rows = [];
  const answers = {};
  for (let k = 0; k < o.n; k++) {
    const id = `r${k}`;
    const cells = o.cols.map((c) => {
      const v = ref[k][c.id];
      if (v === undefined || v === null || (o.blank && o.blank(k, c.id))) return null;
      if (c.auto) return { auto: true };
      if (o.given(k, c.id)) return { given: show(v, c.id) };
      return { input: true, ...(c.id === 'sign' ? { kind: 'sign' } : {}) };
    });
    rows.push({ id, label: o.rowLabel ? o.rowLabel(k) : `k = ${k}`, cells });
    answers[id] = o.cols.map((c) => {
      const v = ref[k][c.id];
      if (v === undefined || v === null) return null;
      if (c.id === 'sign') return fv(v) > 0 ? '+' : fv(v) < 0 ? '−' : '0';
      return show(v, c.id);
    });
  }
  const item = tableItem({
    skill: o.skill, level: o.level, key: o.key, prompt: o.prompt,
    table: { cols: o.cols.map((c) => c.label), rows }, answers, phi,
    then: o.then, hints: o.hints, noHints: o.noHints, baits: o.baits, subgoals: o.subgoals,
    solution: o.solution || ref.map((r, k) => ({ html: `${o.rowLabel ? o.rowLabel(k) : `k = ${k}`} : ${o.cols.filter((c) => r[c.id] !== undefined && r[c.id] !== null).map((c) => `${c.label} = ${show(r[c.id], c.id)}`).join(', ')}`, note: '' })),
    expectedSec: o.expectedSec, exam: o.exam, fallback: o.fallback,
  });
  item.calculator = o.calculator ?? (o.level <= 4 && !o.exam);
  return item;
}

export { fr };

// ---------- guided lines ----------

import { parse as parseCas } from '../../cas/parse.js';
import { toText as textCas } from '../../cas/print.js';
import { blankLine } from '../../judges/lines.js';

// A guided line whose sub-expressions written in `targets` (texts, in
// reading order) are blanks: {math, blanks}.
export function blankBy(math, targets, opts = {}) {
  const node = parseCas(math, opts);
  const want = targets.map((x) => textCas(parseCas(String(x), opts)));
  const holes = [];
  const walk = (n) => {
    if (!n || typeof n !== 'object' || !want.length) return;
    if (n.t && textCas(n) === want[0]) { holes.push(n); want.shift(); return; }
    for (const k of ['l', 'b', 'n', 'e', 'r', 'd']) if (n[k] && typeof n[k] === 'object') walk(n[k]);
    for (const k of ['args', 'terms', 'items']) if (Array.isArray(n[k])) n[k].forEach(walk);
  };
  walk(node);
  if (want.length) throw new Error(`blankBy: « ${want[0]} » absent de ${math}`);
  return blankLine(node, holes, opts);
}

export const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
// The decimal writing of the screen: 0,5 ; −3.
export const dec = (x, digits = 6) => String(Number(Number(x).toPrecision(digits))).replace('.', ',').replace('-', '−');
