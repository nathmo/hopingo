// Free steps above a typed answer (spec §17, « Étapes libres et saisie 2D »).
// « + Ajouter une étape » moves the line being typed into the list above,
// drawn in 2D. With the item's start, each line is checked against the
// previous one (js/judges/steps.js) and a wrong line is named, then left in
// the field to correct; without it the lines are « brouillon ». The answer
// is the field, or the last line when the field is empty.

import { h, html, play } from './dom.js';
import { t } from '../i18n.js';
import { renderChars } from './keypad.js';
import { StepChain, stepSign } from '../judges/steps.js';
import { RULE_BY_ID } from '../math/malrules.js';

// A line drawn as the field draws it, without the caret.
export const lineHtml = (text) => `<span class="m">${renderChars([...String(text).replace(/−/g, '-')]).replace(/ data-i="\d+"/g, '')}</span>`;

// explain(ruleId) → html of a named trap (exercises.js passes explainRule).
export function mountSteps(item, input, { explain, onLines } = {}) {
  const chain = new StepChain(item);
  const sign = stepSign(chain.spec);
  const history = h('div.steps-history.draft-lines');
  const feedback = h('div.step-feedback');
  const say = (msg, kind = 'info') => { feedback.className = `step-feedback ${kind}`; feedback.innerHTML = msg; };
  const clear = () => { feedback.className = 'step-feedback'; feedback.innerHTML = ''; };

  const addLine = (text, how) => {
    if (!history.children.length && chain.start) history.appendChild(h('div.step-line.first', html(lineHtml(chain.start))));
    const ok = how === 'ok';
    history.appendChild(h(`div.step-line.${ok ? 'ok' : 'draft'}`, { 'data-text': text },
      h('span.eq', ok ? sign : '✎'), html(lineHtml(text)),
      h(`span.step-tag${ok ? '.checked' : ''}`, ok ? t('✓ vérifiée') : t('brouillon (non vérifiée)'))));
    history.scrollTop = history.scrollHeight;
  };

  function add() {
    const text = input.value;
    if (!text) { input.flash(); say(t('<p>Écris d\'abord la ligne dans le champ, puis ajoute-la.</p>')); return; }
    const v = chain.submit(text);
    if (v.kind === 'parse' || v.kind === 'same') { input.flash(); say(`<p>${v.message}</p>`); return; }
    if (v.kind === 'wrong') {
      play('bad');
      const named = v.rule && RULE_BY_ID[v.rule] ? explain?.(v.rule, v.diag) : '';
      say(`<p><b>${t('Cette étape est fausse.')}</b> ${v.message || ''}</p>${named || ''}<p class="muted">${t('Corrige-la dans le champ.')}</p>`, 'bad');
      return;
    }
    play(v.kind === 'ok' ? 'good' : 'tap');
    addLine(text, v.kind);
    input.set('');
    if (v.message || v.note) say(`<p>${v.message || v.note}</p>`, v.kind === 'ok' ? 'good' : 'info'); else clear();
    copyBtn.hidden = false;
    input.placeholder = t('ta ligne suivante, ou ta réponse');
    input.render();
    onLines?.(chain.lines.length);
  }

  const addBtn = h('button.btn.small.secondary.add-step', { type: 'button', onclick: () => add() }, t('＋ Ajouter une étape'));
  const copyBtn = h('button.btn.small.ghost', { type: 'button', onclick: () => { if (chain.prev) input.set(chain.prev); } }, t('⧉ Recopier la ligne'));
  copyBtn.hidden = !chain.prev;
  const tools = h('div.step-tools.draft-tools', addBtn, copyBtn,
    h('span.draft-hint', chain.checked ? t('Écris tes étapes ici : chacune est vérifiée.') : t('Écris tes étapes ici, au brouillon.')));
  return {
    chain, history, tools, feedback, add,
    // The answer when the field is empty: the last line.
    lastText: () => chain.lines[chain.lines.length - 1]?.text ?? '',
  };
}
