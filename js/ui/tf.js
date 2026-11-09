// True or false (spec §6 `tf`, step U1). When the student says « faux » to
// a false statement, a counter-example is asked and checked by
// js/judges/examples.js: values typed on the keypad, or V/F for the
// letters of a formula.

import { h, html, play } from './dom.js';
import { MathInput } from './keypad.js';
import { explainRule, solutionHtml } from './exercises.js';
import { hintsBox } from './tokens.js';
import { judgeTf, checkCounter } from '../judges/examples.js';

export function mountTf(item, ctx, body) {
  const stage = h('div.tf-stage');
  const feedback = h('div.step-feedback');
  const hintBox = h('div.lines-hints');
  const hints = hintsBox(item, hintBox);
  body.append(h('div.tf-statement', html(item.statement)), stage, h('div.step-tools', hints.button), hintBox, feedback);
  const footer = h('div');
  let mistakes = 0;
  let onEnter = () => {};
  let keyTarget = null;
  const say = (msg, kind = 'info') => { feedback.className = `step-feedback ${kind}`; feedback.innerHTML = msg; };

  const finish = (correct, rule = null) => {
    const common = { hintsUsed: hints.used() };
    if (correct) { ctx.complete({ correct: true, ...common }); return; }
    ctx.complete({
      correct: false, rules: rule ? [rule] : [], ambiguous: 1, ...common,
      answerHtml: item.truth ? 'Vrai' : 'Faux',
      explainHtml: [rule ? explainRule(rule) : '', solutionHtml(item.solution)].join(''),
    });
  };

  function chooseTask() {
    const list = h('div.choices.tf-choices');
    for (const [label, value] of [['Vrai', true], ['Faux', false]]) {
      list.appendChild(h('button.choice', { type: 'button', onclick: () => choose(value) }, label));
    }
    stage.replaceChildren(list);
    footer.replaceChildren();
  }

  function choose(value) {
    const v = judgeTf(item, value);
    if (v.correct === false) { play('bad'); finish(false, v.rule); return; }
    if (v.needCounter) { play('tap'); counterTask(); return; }
    play('good');
    finish(mistakes === 0);
  }

  // The counter-example: one input per asked variable, or V/F for letters.
  function counterTask() {
    const c = item.counter;
    const answers = {};
    const rows = [];
    if (c.kind === 'truth') {
      for (const l of c.letters) {
        const btns = ['V', 'F'].map((t) => h('button.choice.small', {
          type: 'button',
          onclick: (e) => {
            answers[l] = t === 'V';
            e.target.parentElement.querySelectorAll('button').forEach((b) => b.classList.toggle('selected', b === e.target));
          },
        }, t));
        rows.push(h('div.tf-counter-row', h('span.tf-label', `${l} :`), h('div.row', btns)));
      }
    } else {
      const asks = c.ask?.length ? c.ask : [{ v: 'x', label: 'x =' }];
      const inputs = asks.map((a) => {
        const input = new MathInput({ keysets: a.keys || ['calc', 'set'], placeholder: a.v, onEnter: () => onEnter() });
        input.display.addEventListener('focus', () => { keyTarget = input; });
        return { a, input };
      });
      keyTarget = inputs[0].input;
      for (const { a, input } of inputs) {
        rows.push(h('div.tf-counter-row', h('span.tf-label', a.label || `${a.v} =`), input.display));
        input.display.addEventListener('click', () => {
          keyTarget = input;
          footer.replaceChildren(input.keypad(), validate);
        });
      }
      onEnter = () => {
        for (const { a, input } of inputs) answers[a.v] = input.value;
        check();
      };
      footer.replaceChildren(inputs[0].input.keypad());
    }
    const validate = h('button.btn.primary.wide', { type: 'button', onclick: () => (c.kind === 'truth' ? check() : onEnter()) }, 'Valider le contre-exemple');
    footer.append(validate);
    stage.replaceChildren(h('div.step-label', item.decided ? 'Donne un contre-exemple.' : 'Faux, oui. Donne un contre-exemple :'), ...rows);
    function check() {
      const r = checkCounter(c, answers);
      if (r.ok) { play('good'); finish(mistakes === 0); return; }
      play('bad');
      mistakes++;
      say(r.rule ? explainRule(r.rule) : `<p>${r.message}</p>`, 'bad');
      if (mistakes >= 3) finish(false, r.rule ?? null);
    }
  }

  if (item.decided) counterTask(); else chooseTask();
  return {
    ownFlow: true,
    footer,
    onKey: (e) => {
      if (e.key === 'Enter') { e.preventDefault(); onEnter(); return; }
      keyTarget?.handleKey(e);
    },
  };
}
