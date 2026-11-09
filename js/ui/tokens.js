// Formulas built from tokens (spec §6 `tokens`, step U1): a palette of
// symbols (∀ ∃ ¬ ⇒ ⇔ ∧ ∨, brackets) and of pieces given by the item
// (« x ∈ ℝ », « ε > 0 »). TokenInput is also the input of the `lines`
// items judged by `logic` (js/ui/lines.js).

import { h, html, play } from './dom.js';
import { explainRule, solutionHtml } from './exercises.js';
import { pieceML, norm } from '../cas/logic.js';
import { judgeTokens } from '../judges/logic.js';

const OPS = new Set(['∀', '∃', '¬', '⇒', '⇔', '∧', '∨', '(', ')', ',']);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const tokenHtml = (t) => (OPS.has(t) ? `<span class="tok-op">${esc(t)}</span>` : `<span class="tok-piece"><math>${pieceML(t)}</math></span>`);

export class TokenInput {
  // pieces: texts of the item's pieces; ops: the symbols on the palette.
  constructor({ pieces = [], ops = [...OPS], onChange, onEnter } = {}) {
    this.pieces = pieces;
    this.ops = ops;
    this.tokens = [];
    this.caret = 0;
    this.onChange = onChange;
    this.onEnter = onEnter;
    this.display = h('div.tok-display', { tabindex: 0, role: 'textbox', 'aria-label': 'Ta formule' });
    this.display.addEventListener('click', (e) => {
      const i = e.target.closest('[data-i]')?.dataset.i;
      if (i != null) { this.caret = Number(i) + 1; this.render(); }
    });
    this.render();
  }

  get value() { return this.tokens.join(' '); }

  // Reads a text back into tokens: the longest piece or symbol each time.
  set(text) {
    const known = [...this.pieces, ...this.ops].map((t) => ({ t, n: norm(t) })).sort((a, b) => b.n.length - a.n.length);
    const s = norm(text);
    const out = [];
    let i = 0;
    while (i < s.length) {
      const k = known.find((x) => x.n && s.startsWith(x.n, i));
      if (!k) { i++; continue; }
      out.push(k.t);
      i += k.n.length;
    }
    this.tokens = out;
    this.caret = out.length;
    this.render();
  }

  press(t) {
    if (t === 'back') { if (this.caret > 0) { this.tokens.splice(this.caret - 1, 1); this.caret--; } } else if (t === 'left') this.caret = Math.max(0, this.caret - 1);
    else if (t === 'right') this.caret = Math.min(this.tokens.length, this.caret + 1);
    else { this.tokens.splice(this.caret, 0, t); this.caret++; }
    play('tap');
    this.render();
    this.onChange?.(this.value);
  }

  flash() {
    this.display.classList.remove('shake');
    void this.display.offsetWidth;
    this.display.classList.add('shake');
  }

  render() {
    const caret = '<span class="caret"></span>';
    if (!this.tokens.length) { this.display.innerHTML = `<span class="mi-ph">touche les morceaux</span>${caret}`; return; }
    this.display.innerHTML = this.tokens.map((t, i) => `${i === this.caret ? caret : ''}<span class="tok" data-i="${i}">${tokenHtml(t)}</span>`).join('') + (this.caret === this.tokens.length ? caret : '');
  }

  keypad() {
    const box = h('div.tok-palette');
    const row = (items, cls) => h(`div.tok-row${cls ? `.${cls}` : ''}`, items.map((t) => h('button.key.key-fn.tok-key', { type: 'button', onclick: () => this.press(t), html: tokenHtml(t) })));
    box.append(row(this.ops, 'ops'), row(this.pieces, 'pieces'),
      h('div.tok-row.edit', ['left', 'right', 'back'].map((k) => h('button.key.key-fn', { type: 'button', onclick: () => this.press(k) }, { left: '◀', right: '▶', back: '⌫' }[k]))));
    return box;
  }

  handleKey(e) {
    if (e.key === 'Backspace') { e.preventDefault(); this.press('back'); } else if (e.key === 'ArrowLeft') this.press('left');
    else if (e.key === 'ArrowRight') this.press('right');
    else if (e.key === 'Enter') { e.preventDefault(); this.onEnter?.(); }
  }
}

// Hints on demand, shared by the step U1 mounts. Returns {button, used()}.
export function hintsBox(item, box) {
  let shown = 0;
  const can = !item.noHints && item.hints?.length;
  const button = can ? h('button.btn.small.ghost', { type: 'button' }) : null;
  const paint = () => {
    if (!button) return;
    button.textContent = shown < item.hints.length ? `💡 Aide (${shown + 1}/${item.hints.length})` : '💡 Aide';
    button.disabled = shown >= item.hints.length;
  };
  button?.addEventListener('click', () => {
    if (shown >= item.hints.length) return;
    shown++;
    box.replaceChildren(...item.hints.slice(0, shown).map((x) => h('div.lines-hint', html(x.html))));
    paint();
  });
  paint();
  return { button, used: () => shown };
}

export function mountTokens(item, ctx, body) {
  const feedback = h('div.step-feedback');
  const hintBox = h('div.lines-hints');
  const hints = hintsBox(item, hintBox);
  let mistakes = 0;
  const rules = [];
  let diag = null;
  const input = new TokenInput({ pieces: item.palette, ops: item.ops, onEnter: () => submit() });
  body.append(h('div.step-line.current.tok-line', input.display), h('div.step-tools', hints.button), hintBox, feedback);
  const say = (msg, kind = 'info') => { feedback.className = `step-feedback ${kind}`; feedback.innerHTML = msg; };
  const finish = (correct) => {
    const common = { hintsUsed: hints.used() };
    if (correct) { ctx.complete({ correct: true, ...common }); return; }
    ctx.complete({
      correct: false, rules, ambiguous: 1, ...common, answerHtml: item.answerHtml,
      explainHtml: [rules.length ? explainRule(rules[rules.length - 1], diag) : '', solutionHtml(item.solution)].join(''),
    });
  };
  function submit() {
    if (!input.tokens.length) { input.flash(); return; }
    const v = judgeTokens(item, input.value);
    if (v.kind === 'parse' || v.kind === 'stay') { input.flash(); say(`<p>${v.message}</p>`, v.kind === 'stay' ? 'good' : 'info'); return; }
    if (v.kind === 'done') { play('good'); finish(mistakes === 0); return; }
    play('bad');
    mistakes++;
    if (v.rule) { rules.push(v.rule); diag = v.diag; }
    say(v.rule ? explainRule(v.rule, v.diag) : `<p>${v.message}</p>`, 'bad');
    if (mistakes >= 3) finish(false);
  }
  const footer = h('div', input.keypad(), h('button.btn.primary.wide', { type: 'button', onclick: () => submit() }, 'Valider'));
  return { ownFlow: true, footer, onKey: (e) => input.handleKey(e) };
}
