// Math input: a calculator-style line with a caret, shown with stacked
// fractions as you type, plus an on-screen keypad and keyboard support.

import { h, play } from './dom.js';
import { esc } from '../math/expr.js';

const KEYSETS = {
  int: ['7', '8', '9', '4', '5', '6', '1', '2', '3', 'back', '0', 'ok'],
  frac: ['7', '8', '9', '4', '5', '6', '1', '2', '3', 'frac', '0', 'back'],
  dec: ['7', '8', '9', '4', '5', '6', '1', '2', '3', ',', '0', 'back'],
  fracdec: ['7', '8', '9', 'frac', '4', '5', '6', ',', '1', '2', '3', 'back', 'left', '0', 'right', ''],
  ops: ['7', '8', '9', 'frac', '+', '4', '5', '6', '(', '-', '1', '2', '3', ')', '×', 'left', '0', 'right', 'back', '÷'],
  // Signed numbers: "-" is the sign key.
  rel: ['7', '8', '9', '4', '5', '6', '1', '2', '3', '-', '0', 'back'],
  relfrac: ['7', '8', '9', 'frac', '4', '5', '6', '-', '1', '2', '3', 'back', 'left', '0', 'right', ''],
  reldec: ['7', '8', '9', ',', '4', '5', '6', '-', '1', '2', '3', 'back', 'left', '0', 'right', ''],
  // A product of prime factors (2^3×3^2×5) and a simplified root (6√2).
  prod: ['7', '8', '9', '4', '5', '6', '1', '2', '3', '×', '0', '^', 'left', 'back', 'right'],
  surd: ['7', '8', '9', '4', '5', '6', '1', '2', '3', '√', '0', 'back'],
  // Algebra: letters, brackets, powers, = for equations.
  alg: ['7', '8', '9', 'x', '(', ')', '4', '5', '6', '+', '-', '^', '1', '2', '3', '×', 'frac', 'a', 'left', '0', 'right', 'back', ',', 'b'],
  eqset: ['7', '8', '9', 'x', '=', '4', '5', '6', '-', ';', '1', '2', '3', 'frac', ',', 'left', '0', 'right', 'back', ''],
  sys: ['7', '8', '9', 'x', 'y', '4', '5', '6', '=', ';', '1', '2', '3', '-', 'frac', 'left', '0', 'right', 'back', ''],
  algeq: ['7', '8', '9', 'x', '(', ')', '4', '5', '6', '+', '-', '^', '1', '2', '3', '×', 'frac', '=', 'left', '0', 'right', 'back', ',', '√'],
  // Free lines with powers and roots.
  opsx: ['7', '8', '9', 'frac', '+', '4', '5', '6', '(', '-', '1', '2', '3', ')', '×', '^', '0', '√', ',', '÷', '', 'left', 'right', 'back', ''],
};

const LABEL = {
  back: '⌫', left: '◀', right: '▶', ok: '✓', '-': '−', '√': '√',
  '^': '<span class="key-pow">▢<sup>n</sup></span>',
  frac: '<span class="key-frac"><span>▢</span><span>▢</span></span>',
};

export class MathInput {
  constructor({ keys = 'frac', placeholder = '', onChange, onEnter } = {}) {
    this.chars = [];
    this.caret = 0;
    this.keys = keys;
    this.onChange = onChange;
    this.onEnter = onEnter;
    this.display = h('div.mi-display', { tabindex: 0, role: 'textbox', 'aria-label': 'Ta réponse' });
    this.display.addEventListener('click', (e) => {
      const i = e.target.closest('[data-i]')?.dataset.i;
      if (i != null) { this.caret = Number(i) + 1; this.render(); }
    });
    this.placeholder = placeholder;
    this.render();
  }

  get value() { return this.chars.join(''); }

  // A named keyset, or a list of keys given by the question (letters of a formula).
  get keyList() { return Array.isArray(this.keys) ? this.keys : KEYSETS[this.keys]; }

  set(str) {
    this.chars = [...String(str).replace(/−/g, '-')];
    this.caret = this.chars.length;
    this.render();
  }

  press(k) {
    const prev = this.chars[this.caret - 1];
    if (k === 'back') {
      if (this.caret > 0) { this.chars.splice(this.caret - 1, 1); this.caret--; }
    } else if (k === 'left') this.caret = Math.max(0, this.caret - 1);
    else if (k === 'right') this.caret = Math.min(this.chars.length, this.caret + 1);
    else if (k === 'ok' || k === 'enter') { this.onEnter?.(); return; }
    else if (k === 'frac') {
      // The fraction bar needs a numerator first, and a denominator can't
      // start another fraction.
      let j = this.caret - 1;
      while (j >= 0 && /[0-9,]/.test(this.chars[j])) j--;
      if (!/[0-9)a-zA-Zπ]/.test(prev ?? '') || this.chars[j] === '/') { this.flash(); return; }
      this.insert('/');
    } else if (k === '^') {
      // An exponent needs something to raise, and only one at a time.
      if (!/[0-9)a-zA-Zπ]/.test(prev ?? '') || this.chars.slice(0, this.caret).join('').match(/\^-?\d*$/)) { this.flash(); return; }
      this.insert('^');
    } else if (k) this.insert(k);
    play('tap');
    this.render();
    this.onChange?.(this.value);
  }

  insert(c) {
    this.chars.splice(this.caret, 0, c);
    this.caret++;
  }

  flash() {
    this.display.classList.remove('shake');
    void this.display.offsetWidth;
    this.display.classList.add('shake');
  }

  // Keyboard: digits, / + - * x : ( ) , . ^ r (root) ² Backspace, arrows, Enter.
  handleKey(e) {
    const allowed = new Set(this.keyList);
    const letters = [...allowed].some((k) => /^[a-zA-Zπ]$/.test(k));
    const map = { '*': '×', ':': '÷', '/': 'frac', '.': ',', Backspace: 'back', ArrowLeft: 'left', ArrowRight: 'right', Enter: 'enter' };
    // Without letters on the keypad, x means × and r or v mean √.
    if (!letters) Object.assign(map, { x: '×', r: '√', v: '√' });
    let k = map[e.key] ?? e.key;
    // With letters, any letter of the alphabet can be typed.
    if (letters && /^[a-zA-Z]$/.test(k)) { e.preventDefault(); this.press(k); return; }
    allowed.add('enter'); allowed.add('back'); allowed.add('left'); allowed.add('right');
    if (k === '÷' && !allowed.has('÷')) k = null;
    if (k === '²' && allowed.has('^')) {
      e.preventDefault();
      this.press('^');
      this.press('2');
      return;
    }
    if (k && (allowed.has(k) || /^[0-9]$/.test(k))) {
      e.preventDefault();
      this.press(k);
    }
  }

  render() {
    this.display.innerHTML = renderChars(this.chars, this.caret) || `<span class="mi-ph">${esc(this.placeholder)}</span><span class="caret"></span>`;
  }

  keypad() {
    const pad = h(`div.keypad.keys-${Array.isArray(this.keys) ? 'custom' : this.keys}`);
    for (const k of this.keyList) {
      if (!k) { pad.appendChild(h('span')); continue; }
      const letter = /^[a-zA-Zπ]$/.test(k);
      const cls = /^[0-9]$/.test(k) ? 'key' : letter ? 'key key-fn key-letter' : `key key-fn key-${k === '-' ? 'minus' : k.replace(/[^a-z]/g, '') || 'op'}`;
      pad.appendChild(h('button', { class: cls, type: 'button', onclick: () => this.press(k), html: LABEL[k] ?? esc(k) }));
    }
    return pad;
  }
}

const CARET = '<span class="caret"></span>';
const isNumChar = (c) => /[0-9,]/.test(c);

// Renders typed characters with live stacked fractions and the caret.
// Gap g is the position before chars[g]; each gap is drawn once. The gap
// right after a fraction's last digit belongs to its denominator, since
// typing a digit there extends the denominator.
export function renderChars(chars, caret) {
  if (!chars.length) return '';
  const drawn = new Set();
  const gap = (g) => {
    if (drawn.has(g)) return '';
    drawn.add(g);
    return caret === g ? CARET : '';
  };
  const span = (x) => `<span data-i="${x}">${esc(chars[x])}</span>`;
  const n = chars.length;
  let out = '';
  let i = 0;
  while (i < n) {
    if (isNumChar(chars[i])) {
      let j = i;
      while (j < n && isNumChar(chars[j])) j++;
      if (chars[j] === '/') {
        let k = j + 1;
        while (k < n && isNumChar(chars[k])) k++;
        let num = '';
        for (let x = i; x < j; x++) num += gap(x) + span(x);
        num += gap(j);
        let den = '';
        for (let x = j + 1; x < k; x++) den += gap(x) + span(x);
        den += gap(k);
        if (k === j + 1) den = `<span class="mi-empty">${den}</span>`;
        out += `<span class="m-frac"><span class="m-n">${num}</span><span class="m-d" data-i="${j}">${den}</span></span>`;
        i = k;
        continue;
      }
      for (let x = i; x < j; x++) out += gap(x) + span(x);
      i = j;
      continue;
    }
    const c = chars[i];
    if (c === '^') {
      // The exponent is drawn raised; the caret right after it stays inside.
      let k = i + 1;
      if (chars[k] === '-') k++;
      while (k < n && /[0-9]/.test(chars[k])) k++;
      let sup = '';
      for (let x = i + 1; x < k; x++) sup += gap(x) + `<span data-i="${x}">${chars[x] === '-' ? '−' : esc(chars[x])}</span>`;
      sup += gap(k);
      if (k === i + 1) sup = `<span class="mi-empty">${sup}</span>`;
      out += `${gap(i)}<sup class="m-sup" data-i="${i}">${sup}</sup>`;
      i = k;
      continue;
    }
    if (/[a-zA-Zπ]/.test(c)) {
      out += `${gap(i)}<i class="m-var" data-i="${i}">${c}</i>`;
      i++;
      continue;
    }
    const show = c === '-' ? '−' : c;
    // A minus at the start, after a bracket or an operator is a sign.
    const sign = c === '-' && (i === 0 || '(+-×÷^'.includes(chars[i - 1]));
    const cls = sign ? 'm-op m-neg' : '+-×÷'.includes(c) ? 'm-op' : 'm-par';
    out += `${gap(i)}<span class="${cls}" data-i="${i}">${esc(show)}</span>`;
    i++;
  }
  return out + gap(n);
}
