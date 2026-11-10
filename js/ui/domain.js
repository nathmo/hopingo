// Mount of the `domain` item (step U6): the bounds of an integral, written
// « [lo] ≤ v ≤ [hi] », one row per variable, outer first
// (js/judges/domain-item.js judges them).

import { h, html, play } from './dom.js';
import { MathInput } from './keypad.js';
import { keysFor } from './keys-needed.js';
import { explainRule, solutionHtml } from './exercises.js';
import { hintsBox } from './tokens.js';
import { judgeDomainItem } from '../judges/domain-item.js';

export function mountDomain(item, ctx, body) {
  const feedback = h('div.step-feedback');
  const hintBox = h('div.lines-hints');
  const hints = hintsBox(item, hintBox);
  let mistakes = 0;
  let active = null;
  const keyArea = h('div');
  const say = (msg, kind = 'info') => { feedback.className = `step-feedback ${kind}`; feedback.innerHTML = msg; };
  const inputs = {};
  const focus = (input) => { active = input; keyArea.replaceChildren(input.keypad()); };
  const keysets = keysFor(item.keys || ['calc', 'calcfn'], Object.values(item.answer || {}).flat());
  const rows = item.fields.map(({ v, label }) => {
    const lo = new MathInput({ keysets, placeholder: '…', onEnter: () => submit() });
    const hi = new MathInput({ keysets, placeholder: '…', onEnter: () => submit() });
    inputs[v] = [lo, hi];
    for (const inp of [lo, hi]) inp.display.addEventListener('click', () => focus(inp));
    return h('div.tf-counter-row', lo.display, h('span.tf-label', ` ≤ ${label || v} ≤ `), hi.display);
  });
  body.append(h('div.tf-stage', ...rows), h('div.step-tools', hints.button), hintBox, feedback, keyArea);
  focus(inputs[item.fields[0].v][0]);
  function submit() {
    const values = Object.fromEntries(Object.entries(inputs).map(([v, [lo, hi]]) => [v, [lo.value, hi.value]]));
    const r = judgeDomainItem(item, values);
    if (r.correct) { play('good'); ctx.complete({ correct: mistakes === 0, hintsUsed: hints.used() }); return; }
    if (r.verdict.kind === 'parse' || r.verdict.kind === 'stay' || r.verdict.kind === 'ok') { say(`<p>${r.verdict.message || 'Il manque quelque chose.'}</p>`); return; }
    play('bad');
    mistakes++;
    say(r.verdict.rule ? explainRule(r.verdict.rule, r.verdict.diag) + `<p>${r.verdict.message}</p>` : `<p>${r.verdict.message}</p>`, 'bad');
    if (mistakes >= 3) {
      ctx.complete({
        correct: false, rules: r.verdict.rule ? [r.verdict.rule] : [], ambiguous: 1, hintsUsed: hints.used(),
        explainHtml: solutionHtml(item.solution),
      });
    }
  }
  void html;
  const footer = h('div', h('button.btn.primary.wide', { type: 'button', onclick: () => submit() }, 'Valider'));
  // The keyboard types in the bound last touched.
  return { ownFlow: true, footer, onKey: (e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } else active?.handleKey(e); } };
}
