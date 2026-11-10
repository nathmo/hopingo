// Proofs and definitions in blocks (spec §6 `blocks`, step U1). The student
// taps the blocks in the order of the proof; js/judges/blocks.js accepts
// any order that respects each block's `needs`. A decoy names its trap. In
// the frame mode a block holds a calculation to type. A first decision
// (« par contraposée ? ») may come before the blocks; a valid but poor
// choice lets the student go on, and its reason comes with the next block.

import { h, html, play } from './dom.js';
import { MathInput } from './keypad.js';
import { explainRule, solutionHtml } from './exercises.js';
import { hintsBox } from './tokens.js';
import { placeBlock } from '../judges/blocks.js';

export function mountBlocks(item, ctx, body) {
  const placedBox = h('div.blk-placed');
  const pool = h('div.blk-pool');
  const stage = h('div.blk-stage');
  const feedback = h('div.step-feedback');
  const hintBox = h('div.lines-hints');
  const hints = hintsBox(item, hintBox);
  body.append(placedBox, stage, pool, h('div.step-tools', hints.button), hintBox, feedback);
  const footer = h('div');
  const placed = [...(item.placed || [])];
  const rules = [];
  let mistakes = 0;
  let poorNote = null;
  let input = null;
  const say = (msg, kind = 'info') => { feedback.className = `step-feedback ${kind}`; feedback.innerHTML = msg; };
  const clearSay = () => { feedback.className = 'step-feedback'; feedback.innerHTML = ''; };

  const finish = (correct) => {
    const common = { hintsUsed: hints.used() };
    if (correct) { ctx.complete({ correct: true, ...common }); return; }
    ctx.complete({
      correct: false, rules, ambiguous: 1, ...common,
      explainHtml: [rules.length ? explainRule(rules[rules.length - 1]) : '', solutionHtml(item.solution)].join(''),
    });
  };

  const paintPlaced = () => {
    placedBox.replaceChildren(...placed.map((id, i) => h('div.blk.placed', h('span.blk-n', `${i + 1}`), html(item.blocks.find((b) => b.id === id).html))));
  };

  function paintPool() {
    pool.replaceChildren(...item.blocks.filter((b) => !placed.includes(b.id)).map((b) => {
      const btn = h('button.blk', { type: 'button', html: b.html });
      btn.addEventListener('click', () => tap(b, btn));
      return btn;
    }));
  }

  function accepted(b) {
    play('good');
    placed.push(b.id);
    stage.replaceChildren();
    footer.replaceChildren();
    input = null;
    paintPlaced();
    paintPool();
    if (poorNote) { say(`<p>${poorNote}</p>`, 'info'); poorNote = null; } else clearSay();
  }

  function tap(b, btn, typed) {
    const v = placeBlock(item, placed, b.id, typed);
    if (v.kind === 'input') return askInput(b, btn);
    if (v.kind === 'ok') { accepted(b); return; }
    if (v.kind === 'done') { accepted(b); finish(mistakes === 0); return; }
    if (v.kind === 'stay') { input?.flash(); say(`<p>${v.message}</p>`, 'good'); return; }
    play('bad');
    mistakes++;
    if (v.rule) rules.push(v.rule);
    if (b.distractor) { btn.classList.add('wrong'); btn.disabled = true; }
    say(v.rule ? `${explainRule(v.rule)}${v.message ? `<p>${v.message}</p>` : ''}` : `<p>${v.message}</p>`, 'bad');
    if (mistakes >= 5) finish(false);
  }

  // A block of the frame: the calculation is typed, then the block is placed.
  function askInput(b, btn) {
    input = new MathInput({ keysets: b.input.keys || ['calc', 'relation'], placeholder: 'ton calcul', onEnter: () => send() });
    const send = () => { if (input.value) tap(b, btn, input.value); };
    stage.replaceChildren(h('div.step-label', b.input.ask), h('div.step-line.current', input.display));
    footer.replaceChildren(input.keypad(), h('button.btn.primary.wide', { type: 'button', onclick: send }, 'Valider le calcul'));
  }

  function decisionTask() {
    const d = item.decision;
    const list = h('div.choices.lines-choices');
    for (const o of d.options) {
      const b = h('button.choice', { type: 'button' }, o.label);
      b.addEventListener('click', () => {
        if (!o.valid) {
          play('bad');
          mistakes++;
          if (o.rule) rules.push(o.rule);
          b.classList.add('wrong');
          b.disabled = true;
          say(o.rule ? explainRule(o.rule) : `<p>${o.why || 'Ce n\'est pas le bon choix.'}</p>`, 'bad');
          return;
        }
        play('tap');
        if (o.quality === 'poor') poorNote = o.why || null;
        clearSay();
        stage.replaceChildren(h('div.lines-note.decided', `✔ ${o.label}`));
        paintPool();
      });
      list.appendChild(b);
    }
    stage.replaceChildren(h('div.step-label', d.prompt), list);
  }

  paintPlaced();
  if (item.decision) decisionTask(); else paintPool();
  return {
    ownFlow: true,
    footer,
    onKey: (e) => {
      if (!input) return;
      if (e.key === 'Enter') { e.preventDefault(); input.onEnter?.(); return; }
      input.handleKey(e);
    },
  };
}
