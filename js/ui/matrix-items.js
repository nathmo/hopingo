// Mounts of the step U3 item types (spec §6): `matrix` (one answer in a
// grid, judged by the item's judge) and `example` (give an object with a
// property, checked by js/judges/examples.js). counterFields() also serves
// the counter-examples of linear algebra in true/false items (ui/tf.js).

import { h, html, play } from './dom.js';
import { t } from '../i18n.js';
import { explainRule, solutionHtml } from './exercises.js';
import { hintsBox } from './tokens.js';
import { MatrixInput } from './matrix-input.js';
import { judgeMatrixItem } from '../judges/matrix-item.js';
import { checkCounter } from '../judges/examples.js';
import { isLinalgCounter } from '../judges/linalg-examples.js';

const TEXT_ASKS = new Set(['alpha', 'c', 'm', 'n', 'r', 'P', 'p', 'k']);

// One field per asked object: a grid for a matrix or a vector, a text
// field for a number or a polynomial. → {rows: [elements], read(), first}
export function counterFields(counter, onEnter) {
  const asks = counter.ask?.length ? counter.ask : [{ v: 'A', label: 'A =' }];
  const n = counter.params?.n ?? 2;
  const fields = asks.map((a) => {
    let input;
    if (a.shape) input = new MatrixInput({ shape: a.shape[1] === 1 && a.shape[0] > 1 ? { vectors: a.shape[0], count: 1 } : { rows: a.shape[0], cols: a.shape[1], bar: null }, text: false, onEnter });
    else if (TEXT_ASKS.has(a.v) || a.text) input = null;
    else if (/^[A-Z]/.test(a.v)) input = new MatrixInput({ shape: { rows: n, cols: counter.params?.cols ?? n, bar: null }, text: false, onEnter });
    else if (a.v === 'F') input = new MatrixInput({ shape: { vectors: n, count: counter.params?.k ?? 2 }, text: false, onEnter });
    else input = new MatrixInput({ shape: { vectors: n, count: 1 }, text: false, onEnter });
    if (!input) {
      const f = h('input.mx-text', { type: 'text', autocomplete: 'off', placeholder: a.placeholder || '' });
      f.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); onEnter?.(); } });
      return { a, el: f, read: () => f.value.trim().replace(/−/g, '-') };
    }
    return { a, el: h('div', input.display, input.keypad()), read: () => input.value };
  });
  return {
    rows: fields.map((f) => h('div.tf-counter-row', h('span.tf-label', f.a.label || `${f.a.v} =`), f.el)),
    read: () => Object.fromEntries(fields.map((f) => [f.a.v, f.read()])),
  };
}

export const usesGrid = (counter) => isLinalgCounter(counter) || (counter?.ask || []).some((a) => a.shape);

export function mountMatrix(item, ctx, body) {
  const feedback = h('div.step-feedback');
  const hintBox = h('div.lines-hints');
  const hints = hintsBox(item, hintBox);
  let mistakes = 0;
  const say = (msg, kind = 'info') => { feedback.className = `step-feedback ${kind}`; feedback.innerHTML = msg; };
  const input = new MatrixInput({
    shape: item.rows && item.cols ? (item.cols === 1 && item.rows > 1 ? { vectors: item.rows, count: 1 } : { rows: item.rows, cols: item.cols, bar: null }) : null,
    onEnter: () => submit(),
  });
  body.append(input.display, h('div.step-tools', hints.button), hintBox, feedback);
  const finish = (correct, rule = null, diag = null) => {
    const common = { hintsUsed: hints.used() };
    if (correct) { ctx.complete({ correct: true, ...common }); return; }
    ctx.complete({
      correct: false, rules: rule ? [rule] : [], ambiguous: 1, ...common,
      answerHtml: item.answerHtml, explainHtml: [rule ? explainRule(rule, diag) : '', solutionHtml(item.solution)].join(''),
    });
  };
  function submit() {
    const r = judgeMatrixItem(item, input.value);
    const v = r.verdict;
    if (v.kind === 'parse' || v.kind === 'form') { input.flash(); say(`<p>${v.message}</p>`); return; }
    if (v.kind === 'stay' || v.kind === 'ok') { say(`<p>${v.message || t('C\'est juste, mais ce n\'est pas encore la réponse finale.')}</p>`, 'good'); return; }
    if (r.correct) { play('good'); finish(mistakes === 0); return; }
    play('bad');
    mistakes++;
    say(v.rule ? explainRule(v.rule, v.diag) : `<p>${v.message || t('Ce n\'est pas la bonne réponse.')}</p>`, 'bad');
    if (mistakes >= 2) finish(false, v.rule ?? null, v.diag);
  }
  const footer = h('div', input.keypad(), h('button.btn.primary.wide', { type: 'button', onclick: () => submit() }, t('Valider')));
  setTimeout(() => input.focus(), 0);
  return { ownFlow: true, footer, onKey: (e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } } };
}

export function mountExample(item, ctx, body) {
  const feedback = h('div.step-feedback');
  const hintBox = h('div.lines-hints');
  const hints = hintsBox(item, hintBox);
  let mistakes = 0;
  const say = (msg, kind = 'info') => { feedback.className = `step-feedback ${kind}`; feedback.innerHTML = msg; };
  const fields = counterFields(item.property, () => submit());
  body.append(h('div.tf-stage', ...fields.rows), h('div.step-tools', hints.button), hintBox, feedback);
  function submit() {
    const r = checkCounter(item.property, fields.read());
    if (r.ok) { play('good'); ctx.complete({ correct: mistakes === 0, hintsUsed: hints.used() }); return; }
    play('bad');
    mistakes++;
    say(r.rule ? explainRule(r.rule) : `<p>${r.message}</p>`, 'bad');
    if (mistakes >= 3) {
      ctx.complete({
        correct: false, rules: r.rule ? [r.rule] : [], ambiguous: 1, hintsUsed: hints.used(),
        explainHtml: solutionHtml(item.solution),
      });
    }
  }
  const footer = h('div', h('button.btn.primary.wide', { type: 'button', onclick: () => submit() }, t('Valider')));
  return { ownFlow: true, footer, onKey: (e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } } };
}

export { html };
