// Items `code` (spec §6, §11, step U9): the Python program is shown in a
// monospace font, each ??? becomes a field (or a menu for a choice hole).
// A small key row adds ( ) [ ] : = + - * / ** < > , and the names of the
// program, for phones. « Vérifier » runs the tests (js/judges/code.js);
// the first failed test is shown with the value obtained and the value
// expected. After the program, `then` (an item, often a readtable) is
// asked in the same place.

import { h, html, play } from './dom.js';
import { explainRule, solutionHtml, mountExercise } from './exercises.js';
import { hintsBox } from './tokens.js';
import { judgeCode } from '../judges/code.js';

const KEYS = ['(', ')', '[', ']', ':', '=', '+', '-', '*', '/', '**', '<', '>', ',', '.'];

// Names worth a key: the program's variables and functions (no keywords).
const KW = new Set(['def', 'return', 'for', 'in', 'range', 'if', 'else', 'elif', 'while', 'and', 'or', 'not', 'True', 'False', 'None', 'import', 'from', 'math']);
function namesOf(src) {
  const out = new Set();
  for (const m of String(src).matchAll(/[A-Za-z_][A-Za-z0-9_]*/g)) if (!KW.has(m[0]) && m[0].length <= 8) out.add(m[0]);
  return [...out].slice(0, 16);
}

export function mountCode(item, ctx, body) {
  const feedback = h('div.step-feedback');
  const hintBox = h('div.lines-hints');
  const hints = hintsBox(item, hintBox);
  const after = h('div.table-then');
  const footer = h('div');
  const fields = [];
  const answers = item.holes.map(() => null);
  let active = null;
  let mistakes = 0;
  const rules = [];
  const say = (msg, kind = 'info') => { feedback.className = `step-feedback ${kind}`; feedback.innerHTML = msg; };

  if (item.signatures?.length) {
    body.append(h('details.code-sigs', h('summary', 'Fonctions disponibles'), h('ul', item.signatures.map((s) => h('li', h('code', s))))));
  }
  // The program, ??? replaced by fields.
  const pre = h('pre.code-block.code-edit');
  const pieces = item.source.split('???');
  pieces.forEach((text, k) => {
    pre.append(document.createTextNode(text));
    if (k >= pieces.length - 1) return;
    const hole = item.holes[k];
    let el;
    if (hole.options) {
      el = h('select.code-hole', { 'aria-label': `trou ${k + 1}` }, h('option', { value: '' }, '???'), hole.options.map((o, i) => h('option', { value: String(i) }, o.text)));
      el.addEventListener('change', () => { answers[k] = el.value === '' ? null : Number(el.value); el.classList.remove('right', 'wrong'); });
    } else {
      const width = Math.max(4, Math.min(40, (hole.answer || '').length + 2));
      el = h('input.code-hole', { type: 'text', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', size: width, 'aria-label': `trou ${k + 1}`, placeholder: '???' });
      el.addEventListener('input', () => { answers[k] = el.value; el.classList.remove('right', 'wrong'); });
      el.addEventListener('focus', () => { active = el; });
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
    }
    fields.push(el);
    pre.append(el);
  });
  body.append(h('div.code-wrap', pre));
  // Keys for phones.
  if (item.holes.some((x) => !x.options)) {
    const insert = (t) => {
      const el = active || fields.find((f) => f.tagName === 'INPUT');
      if (!el) return;
      const a = el.selectionStart ?? el.value.length;
      const b = el.selectionEnd ?? el.value.length;
      el.value = el.value.slice(0, a) + t + el.value.slice(b);
      el.selectionStart = el.selectionEnd = a + t.length;
      el.dispatchEvent(new Event('input'));
      el.focus();
    };
    body.append(h('div.code-keys', [...KEYS, ...namesOf(item.source)].map((t) => h('button.key.small', { type: 'button', onmousedown: (e) => e.preventDefault(), onclick: () => insert(t) }, t))));
  }
  body.append(h('div.step-tools', hints.button), hintBox, feedback, after);

  const outcome = (correct) => {
    const common = { hintsUsed: hints.used() };
    if (correct) return { correct: true, ...common };
    return {
      correct: false, rules, ambiguous: 1, ...common,
      explainHtml: [rules.length ? explainRule(rules[rules.length - 1]) : '', solutionHtml(item.solution)].join(''),
    };
  };

  let keyHandler = null;
  function thenTask() {
    const sub = {
      ready: () => {},
      submit: () => {},
      complete: (o) => ctx.complete({ ...o, correct: o.correct && mistakes === 0, hintsUsed: (o.hintsUsed || 0) + hints.used(), rules: [...rules, ...(o.rules || [])] }),
    };
    const ctrl = mountExercise(item.then, sub);
    after.replaceChildren(h('div.lines-note.segment', 'Et maintenant :'), ctrl.el);
    if (ctrl.ownFlow) {
      footer.replaceChildren(ctrl.footer || '');
      keyHandler = ctrl.onKey || null;
      return;
    }
    footer.replaceChildren(ctrl.footer || '', h('button.btn.primary.wide', {
      type: 'button',
      onclick: () => { const o = ctrl.check(); if (o && !o.stayOpen) sub.complete(o); },
    }, 'Valider'));
    keyHandler = ctrl.onKey || null;
  }

  function submit() {
    const r = judgeCode(item, answers);
    if (r.empty) { say('<p>Remplis tous les trous.</p>'); return; }
    r.holes.forEach((ok, k) => {
      fields[k].classList.toggle('right', ok === true);
      fields[k].classList.toggle('wrong', ok === false);
    });
    if (r.ok) {
      play('good');
      fields.forEach((f) => { f.disabled = true; });
      if (item.then) { say('<p>Le programme passe tous les tests.</p>', 'good'); thenTask(); return; }
      ctx.complete(outcome(mistakes === 0));
      return;
    }
    play('bad');
    mistakes++;
    if (r.rule) rules.push(r.rule);
    const test = r.failed?.text ? `<p class="code-fail">${r.failed.text.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</p>` : '';
    say(`${test}${r.rule ? explainRule(r.rule) : ''}`, 'bad');
    if (mistakes >= 3) ctx.complete(outcome(false));
  }

  footer.append(h('button.btn.primary.wide', { type: 'button', onclick: () => submit() }, 'Vérifier le programme'));
  return { ownFlow: true, footer, onKey: (e) => keyHandler?.(e) };
}

export { html };
