// Items `code` (spec §6, §12, step U9): a Python program with holes.
//
// item = {type: 'code', lang: 'python', prompt, source (the shown program,
//   each hole written ???), holes: [{answer, options?: [{text, correct,
//   rule?}], traps?: [{text, rule}], wrong?}], prelude (hidden), signatures
//   (« Fonctions disponibles »), tests: [{setup?, expr, expect, tol?, atol?}],
//   maxSteps?, then? (an item asked after the program, often a readtable)}
// A hole with options is a multiple choice (the exam format, level 1).
//
// judgeCode(item, answers) → {ok, holes: [true | false | null], rule?, message,
//   failed?: {text}} — answers: the text of each hole (an option's text for
//   a choice). The holes are put in place of ???, then every test runs
//   (js/py/index.js). A wrong program is diagnosed hole by hole: a hole
//   whose text is a known trap (after removing spaces and outer
//   parentheses) names it; otherwise each hole that differs from the
//   reference is tried alone (the others right) to see which one breaks.
// fill(source, texts), holeTexts(item, answers), normalize(text).

import { runTests } from '../py/index.js';
import { t } from '../i18n.js';

export const fill = (source, texts) => {
  let k = 0;
  return source.replace(/\?\?\?/g, () => {
    const tq = texts[k++];
    return tq === undefined || tq === null ? '???' : String(tq);
  });
};

// Spaces and outer parentheses do not count: « (x - xs[j]) » = « x-xs[j] ».
export function normalize(text) {
  let s = String(text ?? '').replace(/\s+/g, '').replace(/[−–]/g, '-').replace(/×/g, '*');
  for (;;) {
    if (!(s.startsWith('(') && s.endsWith(')'))) break;
    // The outer pair must match each other.
    let depth = 0;
    let wraps = true;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '(') depth++;
      if (s[i] === ')') depth--;
      if (depth === 0 && i < s.length - 1) { wraps = false; break; }
    }
    if (!wraps) break;
    s = s.slice(1, -1);
  }
  return s.replace(/"/g, "'");
}

// The texts of the holes, choices read as their option.
export function holeTexts(item, answers) {
  return item.holes.map((h, k) => {
    const a = answers?.[k];
    if (h.options && typeof a === 'number') return h.options[a]?.text ?? '';
    return a ?? '';
  });
}

const reference = (item) => item.holes.map((h) => h.answer);

export function run(item, texts) {
  return runTests({ prelude: item.prelude || '', source: fill(item.source, texts), tests: item.tests, maxSteps: item.maxSteps || 200000 });
}

export function judgeCode(item, answers) {
  const texts = holeTexts(item, answers);
  if (texts.some((tq) => String(tq).trim() === '')) return { ok: false, empty: true, holes: texts.map((tq) => (String(tq).trim() === '' ? null : null)), message: t('Remplis tous les trous.') };
  if (texts.some((tq) => /\n/.test(tq))) return { ok: false, holes: texts.map(() => null), message: t('Un trou tient sur une seule ligne.') };
  const r = run(item, texts);
  if (r.ok) return { ok: true, holes: texts.map(() => true), message: '' };
  // Known traps, hole by hole.
  const ref = reference(item);
  const holes = texts.map((tq, k) => (normalize(tq) === normalize(ref[k]) ? true : null));
  let rule = null;
  item.holes.forEach((h, k) => {
    const n = normalize(texts[k]);
    const traps = [...(h.traps || []), ...(h.options || []).filter((o) => !o.correct && o.rule).map((o) => ({ text: o.text, rule: o.rule }))];
    const tq = traps.find((x) => normalize(x.text) === n);
    if (tq) { holes[k] = false; rule ||= tq.rule; }
  });
  // Which holes break the program on their own.
  if (texts.length > 1) {
    texts.forEach((tq, k) => {
      if (holes[k] !== null) return;
      const alone = ref.slice();
      alone[k] = tq;
      holes[k] = run(item, alone).ok;
    });
  } else if (holes[0] === null) holes[0] = false;
  return { ok: false, holes, rule, failed: r.failed, message: r.failed?.text || t('Le programme ne passe pas les tests.') };
}

// The reference program passes; every trap text and the `wrong` of each
// hole fail (used by the content tests and the samples).
export function checkCodeItem(item) {
  const ref = reference(item);
  const r = run(item, ref);
  if (!r.ok) return { ok: false, why: `reference: ${r.failed?.text}` };
  for (let k = 0; k < item.holes.length; k++) {
    const h = item.holes[k];
    const bad = [...(h.traps || []).map((x) => x.text), ...(h.options || []).filter((o) => !o.correct).map((o) => o.text), ...(h.wrong ? [h.wrong] : [])];
    for (const b of bad) {
      const texts = ref.slice();
      texts[k] = b;
      if (run(item, texts).ok) return { ok: false, why: `hole ${k + 1}: wrong text « ${b} » passes the tests` };
    }
  }
  return { ok: true };
}
