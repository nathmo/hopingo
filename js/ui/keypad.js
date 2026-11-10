// Math input: a calculator-style line with a caret, drawn in 2D as you
// type (stacked fractions, raised exponents, radicals, |…|), plus an
// on-screen keypad and keyboard support. The model stays a list of
// characters with a caret; the drawing reads its structure the way the
// parsers do (js/math/algebra.js, js/cas/parse.js). A key may insert
// several characters at once (« sin( »); it is then one chunk for the caret
// and for ⌫. With `keysets`, tabs switch between several keypads (spec
// §11); with `item`, keysForItem adds a tab for what the question uses.

import { h, play } from './dom.js';
import { esc } from '../math/expr.js';
import { segmentsOf } from '../judges/lines.js';
import { judgeFor } from '../judges/index.js';

export const KEYSETS = {
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
  // Every keypad for letters has the fraction, the power, √ and both brackets.
  alg: ['7', '8', '9', 'x', '(', ')', '4', '5', '6', '+', '-', '^', '1', '2', '3', '×', 'frac', '√', 'left', '0', 'right', 'back', ',', 'a', 'b', 'y', '÷', 'π', '', ''],
  eqset: ['7', '8', '9', 'x', '=', '4', '5', '6', '+', '-', '1', '2', '3', '×', 'frac', '(', ')', '^', '√', ';', 'left', '0', 'right', 'back', ','],
  sys: ['7', '8', '9', 'x', 'y', '4', '5', '6', '+', '-', '1', '2', '3', '×', 'frac', '(', ')', '^', '√', '=', 'left', '0', 'right', 'back', ';'],
  algeq: ['7', '8', '9', 'x', '(', ')', '4', '5', '6', '+', '-', '^', '1', '2', '3', '×', 'frac', '=', 'left', '0', 'right', 'back', ',', '√'],
  // Free lines with powers and roots.
  opsx: ['7', '8', '9', 'frac', '+', '4', '5', '6', '(', '-', '1', '2', '3', ')', '×', '^', '0', '√', ',', '÷', '', 'left', 'right', 'back', ''],
  // University (spec §11). calc: numbers, operations, x y t, π, e; the
  // functions are in calcfn. calcx adds d(…) and ′ (∫ Σ lim ε come with U2).
  calc: ['7', '8', '9', 'x', '(', ')', 'back', '4', '5', '6', 'y', '+', '-', '×', '1', '2', '3', 't', 'frac', '^', '√', '0', ',', 'π', 'e', 'left', 'right', ''],
  calcx: ['7', '8', '9', 'x', '(', ')', 'back', '4', '5', '6', '+', '-', '×', 'frac', '1', '2', '3', '^', '√', 'd(', "'", '0', ',', 'π', 'e', 'left', 'right', ''],
  calcfn: ['sin(', 'cos(', 'tan(', 'exp(', 'ln(', 'Log(', 'sinh(', 'cosh(', 'tanh(', 'arctan(', 'arcsin(', 'arccos(', '√(', '|', 'left', 'back'],
  relation: ['=', '<', '≤', '>', '≥', '≠'],
  greek: ['ε', 'δ', 'λ', 'θ', 'φ', 'α', 'β', 'μ', 'σ', 'ω', 'ρ', 'back'],
  // Step U1: sets and intervals, connectives, complex numbers, the letters
  // of an identity or a division.
  set: [']', '[', ';', '{', '}', '∪', '∩', '∖', '∞', '∈', 'ℝ', 'ℕ', 'ℤ', '∅', '∧', '∨', '¬', 'back'],
  logic: ['∀', '∃', '¬', '⇒', '⇔', '∧', '∨', '∈', '(', ')', ',', 'back'],
  cplx: ['i', 'conj(', 'Re(', 'Im(', 'arg(', '|', '(', ')', 'left', 'right', 'back'],
  // Trigonometry (G3): the integer k of families, degrees, cot, the letters
  // of substitutions (X = cos x, t = tan(x/2)) and « ou ».
  trig: ['k', '°', 'π', 'cot(', 'X', 't', '∨', 'back'],
  letters: ['a', 'b', 'c', 'd', 'A', 'B', 'N', 'D', 'λ', '=', ';', 'back'],
  // Step U1b: sums and sequences. Σ writes sum(terme, k, début, fin).
  seq: ['n', 'k', 'j', 'sum(', ',', '(', ')', 'u', '_', 'q', 'r', '!', 'back'],
  // Step U1b (G2): exponentials, logarithms in a base, hyperbolic functions.
  // Step U1b (G1): absolute values, a parameter m, named sets S₁, the domain D.
  ineq: ['|', '√(', 'm', 'S', '_', 'D', '(', ')', 'left', 'right', 'back'],
  explog: ['e^(', 'ln(', 'log_', 'sinh(', 'cosh(', 'tanh(', 'argsh(', 'argch(', 'argth(', '√(', '(', ')', 'left', 'right', 'back'],
  // Step U2: integrals int(f, x) and int(f, x, a, b), brackets [F] from a to
  // b, limits, one-sided bounds 0⁺ 1⁻, the constant C, the remainder ε(x).
  anal: ['int(', 'bracket(', 'lim(', ',', 'C', 'ε(x)', 'o(', '⁺', '⁻', '∞', 't', '(', ')', 'left', 'right', 'back'],
  // Step U4 (A1, sequences): factorials n!, (n + 1)!, the index m of a subsequence.
  fact: ['!', 'n', 'm', 'k', '(', ')', '^', 'left', 'right', 'back'],
};
// Step U3: lines of matrices typed as text (« (1 ; 2) », det, Aᵀ, A⁻¹).
// Step U5: analytic geometry: coordinates, parameters, points and vectors
// (vec(A,B), ·, ∧, ‖ ‖), « ou », the reduced frame X, Y, names Ω F S.
KEYSETS.geo = ['x', 'y', 'z', '=', ';', 't', 's', 'vec(', ',', '·', '∧', '‖', 'X', 'Y', 'Ω', 'F', ':', ' ou ', 'λ', 'back'];
KEYSETS.pts = ['A', 'B', 'C', 'D', 'M', 'P', 'Q', 'H', 'I', 'T', 'u', 'v', 'w', 'n', "'", '_', 'back'];
KEYSETS.mat = ['7', '8', '9', '(', ')', ';', 'back', '4', '5', '6', '+', '-', '×', 'frac', '1', '2', '3', '^', '√', 'λ', '0', ',', '[', ']', '|', 'left', 'right'];
// Step U7: probabilities and statistics (C(n, k), A(n, k), n!, Φ, Φ⁻¹,
// intervals [a ; b], ≈, %).
KEYSETS.stat = ['C(', 'A(', '!', ';', 'Φ(', 'Φ⁻¹(', '≈', '%', '[', ']', '√(', 'e^(', 'ln(', '(', ')', 'left', 'right', 'back'];

// Tab names of the keypads.
const TAB_LABEL = { anal: '∫ lim', mat: '[ ]', calc: '123', calcx: '123', calcfn: 'f(x)', relation: '= <', greek: 'αβ', set: '{ ; }', logic: '∀∃', cplx: 'i', letters: 'abc', seq: 'Σ n', explog: 'eˣ ln', ineq: '|x| m', trig: 'kπ' };

// Step U5.
TAB_LABEL.geo = 'xyz ‖‖';
TAB_LABEL.pts = 'A B u';
TAB_LABEL.fact = 'n!'; // step U4
TAB_LABEL.stat = 'C Φ'; // step U7

const LABEL = {
  'int(': '∫( , x)', 'bracket(': '[F]ₐᵇ', 'lim(': 'lim( , x, a)', 'o(': 'o( )',
  back: '⌫', left: '◀', right: '▶', ok: '✓', '-': '−', '√': '√', "'": '′', 'd(': 'd/dx', '√(': '√( )', 'sum(': 'Σ( , k, , )',
  '^': '<span class="key-pow">▢<sup>n</sup></span>',
  frac: '<span class="key-frac"><span>▢</span><span>▢</span></span>',
};
// Step U5.
Object.assign(LABEL, { 'vec(': 'AB⃗', ' ou ': 'ou', ' et ': 'et' });
Object.assign(LABEL, { 'C(': 'C(n, k)', 'A(': 'A(n, k)', 'Φ(': 'Φ( )', 'Φ⁻¹(': 'Φ⁻¹( )' }); // step U7


// ---------- the typed line: a list of characters and a caret ----------
// MathModel holds the characters and the caret, without the DOM, so that
// tests can press keys. MathInput draws it and adds the keypad.

const NAV = new Set(['back', 'left', 'right', 'ok', 'enter', '']);
// Function names typed letter by letter (« sin » then « ( »): drawn upright.
const FN_NAMES = new Set(['sin', 'cos', 'tan', 'cot', 'exp', 'ln', 'log', 'Log', 'sinh', 'cosh', 'tanh', 'arcsin', 'arccos', 'arctan', 'argsh', 'argch', 'argth', 'sh', 'ch', 'th', 'Re', 'Im', 'arg', 'conj', 'det', 'tr', 'max', 'min', 'sgn', 'lim', 'int', 'sum', 'vec', 'pd', 'Pr', 'Var', 'Cov']);
const isNumChar = (c) => /^[0-9,.]$/.test(c);
const isLetter = (c) => c.length === 1 && (/\p{L}/u.test(c) || c === '∞');
const isOpenChunk = (c) => c.length > 1 && c.endsWith('(');

// The structure of the typed characters, read the way the parsers read
// it: a fraction bar takes the factor just before it and the factor just
// after it (3/4x is ¾·x, 12/x^2 has x² below), ^ takes one atom (a group
// for x^(n+1)), √ one atom (√2, √x, √(x+1)). Brackets around a numerator, a
// denominator, an exponent or a radicand are « hidden »: not drawn, as in
// the question. → {items, hidden, dead, groups}
//   hidden  indices of brackets that are not drawn
//   dead    caret positions that look like a neighbour (just outside a
//           hidden bracket, inside a structure): the caret skips them
//   groups  hidden groups by the index of their « ( »: {open, close, role}
export function layoutChars(chars) {
  const n = chars.length;
  const hidden = new Set();
  const groups = new Map();
  let p = 0;

  const hide = (node, role) => {
    if (!node || node.k !== 'grp' || node.fn != null || chars[node.open] !== '(' || node.close == null) return;
    node.hide = true;
    node.role = role;
    hidden.add(node.open);
    hidden.add(node.close);
    groups.set(node.open, node);
  };

  function seq(stop) {
    const items = [];
    while (p < n) {
      const c = chars[p];
      if (c === ')' && stop.paren) break;
      if (c === '|' && stop.abs && items.length) break;
      const f = fracChain(stop);
      if (f) { items.push(f); continue; }
      items.push({ k: 'ch', i: p, start: p, end: p + 1 });
      p++;
    }
    return items;
  }
  function fracChain(stop) {
    let num = power(stop);
    if (!num && chars[p] !== '/') return null;
    while (chars[p] === '/') {
      const bar = p++;
      hide(num, 'num');
      const den = power(stop);
      hide(den, 'den');
      num = { k: 'frac', num, bar, den, start: num ? num.start : bar, end: p };
    }
    return num;
  }
  function power(stop) {
    let b = atom(stop);
    if (!b) return null;
    while (chars[p] === '^') {
      const at = p++;
      let e;
      if (chars[p] === '-') {
        const i = p++;
        const a = atom(stop);
        e = { k: 'neg', i, a, start: i, end: p };
      } else e = atom(stop);
      hide(e, 'exp');
      b = { k: 'pow', b, at, e, start: b.start, end: p };
    }
    return b;
  }
  function atom(stop) {
    const c = chars[p];
    if (c == null) return null;
    const s = p;
    if (isNumChar(c)) {
      while (p < n && isNumChar(chars[p])) p++;
      return { k: 'num', s, start: s, end: p };
    }
    if (c === '(' || isOpenChunk(c)) return group(null);
    if (c === '√') {
      p++;
      const a = atom(stop);
      hide(a, 'rad');
      return { k: 'sqrt', at: s, a, start: s, end: p };
    }
    if (c === '|' && !stop.abs) {
      p++;
      const body = seq({ abs: true });
      if (chars[p] === '|') { const close = p++; return { k: 'abs', open: s, close, body, start: s, end: p }; }
      // No closing bar: the bar stays a plain character.
      p = s + 1;
      return { k: 'ch', i: s, start: s, end: p };
    }
    if (isLetter(c)) {
      // sin(…) typed letter by letter.
      let e = s;
      while (e < n && /^[a-zA-Z]$/.test(chars[e])) e++;
      if (e - s >= 2 && chars[e] === '(' && FN_NAMES.has(chars.slice(s, e).join(''))) {
        p = e;
        return group(s);
      }
      p++;
      // A hat or another combining mark stays on its letter (f̂).
      while (p < n && /^\p{M}$/u.test(chars[p])) p++;
      return { k: 'ch', i: s, start: s, end: p, letter: true };
    }
    if (c.length > 1) { p++; return { k: 'ch', i: s, start: s, end: p }; }
    return null;
  }
  function group(fn) {
    const open = p++;
    const body = seq({ paren: true });
    let close = null;
    if (chars[p] === ')') close = p++;
    const g = { k: 'grp', open, close, body, fn, start: fn ?? open, end: p };
    // √( and e^( draw their own structure: the closing bracket is not shown.
    if (close != null && (chars[open] === '√(' || chars[open] === 'e^(')) hidden.add(close);
    return g;
  }

  const items = seq({});
  const dead = new Set();
  for (const g of groups.values()) dead.add(g.role === 'num' ? g.close + 1 : g.open);
  return { items, hidden, dead, groups };
}

// Moves a caret off the positions the drawing does not show apart.
export function settle(L, caret, dir = 1, n = Infinity) {
  let c = caret;
  while (L.dead.has(c) && c > 0 && c < n) c += dir;
  return Math.max(0, Math.min(n, c));
}

// Can the character before the caret end an atom (a number, a letter, a
// closing bracket…)? Then ^ and the fraction bar can follow it.
function endsAtom(chars, c) {
  const prev = chars[c - 1];
  if (prev == null) return false;
  if (prev === '|') return chars.slice(0, c).filter((x) => x === '|').length % 2 === 0;
  if (prev.length > 1) return !prev.endsWith('(') && !prev.endsWith(' ');
  if (/^\p{M}$/u.test(prev)) return endsAtom(chars, c - 1);
  return /[0-9)\]!'′∞π]/.test(prev) || isLetter(prev);
}

export class MathModel {
  constructor() {
    this.chars = [];
    this.caret = 0;
  }

  get value() { return this.chars.join(''); }

  set(str) {
    this.chars = [...String(str).replace(/−/g, '-')];
    this.caret = this.chars.length;
  }

  layout() { return layoutChars(this.chars); }

  insert(c) {
    this.chars.splice(this.caret, 0, c);
    this.caret++;
  }

  // Applies a key. → false when the key is refused here (the field shakes).
  pressKey(k) {
    const ch = this.chars;
    const c = this.caret;
    const L = this.layout();
    const n = ch.length;
    if (k === 'back') return this.backspace(L);
    if (k === 'left') { this.caret = settle(L, Math.max(0, c - 1), -1, n); return true; }
    if (k === 'right') { this.caret = settle(L, Math.min(n, c + 1), 1, n); return true; }
    if (k === 'frac') {
      // At the end of a numerator, the fraction key goes to the denominator.
      if (ch[c] === '/') { this.caret = settle(L, c + 1, 1, n); return true; }
      if (ch[c] === ')' && L.hidden.has(c) && ch[c + 1] === '/') { this.caret = settle(L, c + 2, 1, n); return true; }
      if (endsAtom(ch, c)) {
        this.insert('/');
        return true;
      }
      // Nothing to put on top: an empty fraction, the caret in the numerator.
      ch.splice(c, 0, '(', ')', '/', '(', ')');
      this.caret = c + 1;
      return true;
    }
    if (k === '^') {
      // An exponent needs something to raise, and only one at a time.
      if (!endsAtom(ch, c) || ch.slice(0, c).join('').match(/\^-?\d*$/)) return false;
      this.insert('^');
      return true;
    }
    // A closing bracket typed before one that is already there steps over it.
    if (k === ')' && ch[c] === ')') { this.caret = settle(L, c + 1, 1, n); return true; }
    if (k) this.insert(k);
    return true;
  }

  backspace(L) {
    const ch = this.chars;
    const c = this.caret;
    if (c === 0) return true;
    const b = c - 1;
    if (ch[b] === '(' && L.hidden.has(b)) {
      const g = L.groups.get(b);
      if (g.close === c) {
        // An empty slot: the empty fraction goes away whole.
        if (ch.slice(b, b + 5).join('') === '()/()') { ch.splice(b, 5); this.caret = b; return true; }
        if (g.role === 'den' && ch[b - 1] === '/') {
          ch.splice(b - 1, 3);
          this.caret = b - 1;
          if (ch[b - 3] === '(' && ch[b - 2] === ')') { ch.splice(b - 3, 2); this.caret = b - 3; }
          return true;
        }
        ch.splice(b, 2);
        this.caret = b;
        return true;
      }
      // At the start of a denominator, an exponent or a radicand: the
      // fraction bar, ^ or √ goes. At the start of a numerator: step out.
      if (g.role !== 'num' && b > 0) { ch.splice(b - 1, 1); this.caret = b; return true; }
      this.caret = b;
      return true;
    }
    // Just after a hidden closing bracket: step into the group.
    if (ch[b] === ')' && L.hidden.has(b)) { this.caret = b; return true; }
    ch.splice(b, 1);
    this.caret = settle(layoutChars(ch), b, -1, ch.length);
    return true;
  }
}

export class MathInput extends MathModel {
  constructor({ keys = 'frac', keysets = null, item = null, placeholder = '', onChange, onEnter } = {}) {
    super();
    // An item may give a list of keypad names: they become tabs. With the
    // item, a tab is added for what the question uses and the keypad lacks.
    let tabs = tabsOf(keysets || keys);
    if (item) tabs = keysForItem(item, tabs);
    this.tabs = tabs;
    this.tab = 0;
    this.onChange = onChange;
    this.onEnter = onEnter;
    this.display = h('div.mi-display', { tabindex: 0, role: 'textbox', 'aria-label': 'Ta réponse' });
    this.display.addEventListener('click', (e) => {
      const i = e.target.closest('[data-i]')?.dataset.i;
      if (i != null) { this.caret = settle(this.layout(), Number(i) + 1, 1, this.chars.length); this.render(); }
    });
    this.placeholder = placeholder;
    this.render();
  }

  // The keys of the tab shown, and of all tabs.
  get keyList() { return this.tabs[this.tab].keys; }
  get allKeys() { return this.tabs.flatMap((t) => t.keys); }

  set(str) {
    super.set(str);
    this.render();
  }

  press(k) {
    if (k === 'ok' || k === 'enter') { this.onEnter?.(); return; }
    if (!this.pressKey(k)) { this.flash(); return; }
    play('tap');
    this.render();
    this.onChange?.(this.value);
  }

  flash() {
    this.display.classList.remove('shake');
    void this.display.offsetWidth;
    this.display.classList.add('shake');
  }

  // Keyboard: digits, / + - * x : ( ) , . ^ r (root) ² Backspace, arrows, Enter.
  handleKey(e) {
    const allowed = new Set(this.allKeys);
    const letters = [...allowed].some((k) => /^[a-zA-Zπ]$/.test(k));
    const map = { '*': '×', ':': '÷', '/': 'frac', '.': ',', Backspace: 'back', ArrowLeft: 'left', ArrowRight: 'right', Enter: 'enter' };
    // Without letters on the keypad, x means × and r or v mean √.
    if (!letters) Object.assign(map, { x: '×', r: '√', v: '√' });
    let k = map[e.key] ?? e.key;
    // With letters, any letter of the alphabet can be typed.
    if (letters && /^[a-zA-Z]$/.test(k)) { e.preventDefault(); this.press(k); return; }
    allowed.add('enter'); allowed.add('back'); allowed.add('left'); allowed.add('right');
    if (k === '√' && !allowed.has('√') && allowed.has('√(')) k = '√(';
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

  // The keypad: tabs when there are several key sets.
  keypad() {
    if (this.tabs.length === 1) return this.pad(this.tabs[0]);
    const box = h('div.keypad-tabs');
    const row = h('div.keytab-row');
    const panel = h('div.keytab-panel');
    const show = (i) => {
      this.tab = i;
      panel.replaceChildren(this.pad(this.tabs[i]));
      row.querySelectorAll('button').forEach((b, j) => b.classList.toggle('active', j === i));
    };
    this.tabs.forEach((t, i) => row.appendChild(h('button.keytab', { type: 'button', 'data-set': t.id, title: t.id === 'auto' ? 'Les autres touches de la question' : null, onclick: () => show(i) }, tabLabel(t, i))));
    box.append(row, panel);
    show(0);
    return box;
  }

  pad(tab) {
    const pad = h(`div.keypad.keys-${KEYSETS[tab.id] === tab.keys ? tab.id : 'custom'}`);
    for (const k of tab.keys) {
      if (!k) { pad.appendChild(h('span')); continue; }
      const letter = /^[a-zA-Zπα-ωΑ-Ω]$/.test(k);
      const word = k.length > 1 && /[a-z]/i.test(k) && !LABEL[k];
      const cls = /^[0-9]$/.test(k) ? 'key' : letter ? 'key key-fn key-letter' : word ? 'key key-fn key-word' : `key key-fn key-${k === '-' ? 'minus' : k.replace(/[^a-z]/g, '') || 'op'}`;
      pad.appendChild(h('button', { class: cls, type: 'button', onclick: () => this.press(k), html: LABEL[k] ?? esc(word ? k.replace(/\($/, '').trim() : k) }));
    }
    return pad;
  }
}

// ---------- key sets of an item ----------

// Tabs from a keypad name, a list of names or a list of keys.
export function tabsOf(keys) {
  if (Array.isArray(keys) && keys.length && keys.every((t) => t && typeof t === 'object' && t.keys)) return keys.map((t) => ({ ...t }));
  if (Array.isArray(keys) && keys.length && keys.every((k) => k.length > 1 && KEYSETS[k])) return keys.map((id) => ({ id, keys: KEYSETS[id] }));
  if (Array.isArray(keys)) return [{ id: 'custom', keys }];
  return [{ id: keys, keys: KEYSETS[keys] || KEYSETS.frac }];
}

function tabLabel(t, i) {
  if (t.id === 'auto') return `+ ${t.keys.filter((k) => !NAV.has(k)).slice(0, 3).map((k) => (k === 'frac' ? '½' : k === '^' ? 'xⁿ' : k.replace(/\($/, '').trim())).join(' ')}`;
  return TAB_LABEL[t.id] || (i === 0 ? '123' : t.id);
}

// What a key writes.
const keyText = (k) => (k === 'frac' ? '/' : k);
// A typed text as the keypad writes it: no spaces, except in the words of
// the keypad (« ou », « et »); − as -.
export const keyNormal = (text) => String(text).replace(/−/g, '-').replace(/\s+(ou|et)\s+/g, '\u0001$1\u0001').replace(/\s+/g, '').replace(/\u0001/g, ' ');

// The key that writes what starts at i, when the keypad has none.
function naturalKey(text, i) {
  for (const w of [' ou ', ' et ']) if (text.startsWith(w, i)) return w;
  const c = String.fromCodePoint(text.codePointAt(i));
  if (c === '/') return 'frac';
  // A function name: « cos( » in « Bcos( » is B then cos(.
  const m = /^([a-zA-Z]{2,})\(/.exec(text.slice(i));
  if (m && !FN_NAMES.has(m[1]) && [...FN_NAMES].some((f) => m[1].endsWith(f))) return c;
  if (m) return m[0];
  return c;
}

// The keys to press to write text, longest key first. → {keys, missing}:
// missing are the keys the keypad would need (natural keys).
export function planKeys(text, keys) {
  const t = keyNormal(text);
  const outs = [...new Set(keys)].filter((k) => !NAV.has(k)).map((k) => [k, keyText(k)]).sort((a, b) => b[1].length - a[1].length);
  const plan = [];
  const missing = [];
  for (let i = 0; i < t.length;) {
    const hit = outs.find(([, o]) => t.startsWith(o, i));
    if (hit) { plan.push(hit[0]); i += hit[1].length; continue; }
    const k = naturalKey(t, i);
    missing.push(k);
    plan.push(k);
    i += keyText(k).length;
  }
  return { keys: plan, missing };
}

// The texts a student types for an item: the answer, the start line to
// copy and change, the reference lines (school steps, university lines and
// their typed decisions).
export function typedTexts(item) {
  const out = [];
  const push = (t) => { if (t != null && String(t).trim()) out.push(String(t)); };
  if (item.type === 'answer') {
    // « aucune » is also written ∅ (the checker reads both).
    push(item.expected === 'aucune' ? '∅' : item.expected);
    push(item.start?.math);
    // Reference lines written as text (a line drawn from `html` is not typed).
    for (const l of item.solution || []) if (!l.html) push(l.math);
  } else if (item.type === 'eqlines') {
    push(item.equation);
    push(item.answer);
  } else if (item.type === 'steps') {
    push(item.expr);
    for (const l of item.solution || []) push(l.math);
  } else if (item.type === 'lines') {
    for (const seg of segmentsOf(item)) {
      if (!typedJudge(seg.judge)) continue;
      for (const l of seg.lines) {
        if (l.kind === 'eq') push(l.math);
        if (l.kind === 'decision') for (const o of l.options) if (o.valid && o.then) push(o.then.expect);
      }
    }
  }
  return out;
}

// Lines of a judge typed on the keypad (not a matrix grid, not tokens).
function typedJudge(cfg) {
  if (!cfg || cfg.kind === 'logic') return false;
  try { return judgeFor(cfg).input !== 'matrix'; } catch { return true; }
}

// What the question shows, from its markup (school spans and MathML):
// fraction, power, root, π, letters, function names, |·|, relations.
export function promptKeys(html) {
  const s = String(html || '').replace(/<details[\s\S]*?<\/details>/g, '');
  const out = new Set();
  const maths = [...s.matchAll(/<math[\s\S]*?<\/math>/g)].map((m) => m[0]).join(' ');
  if (/class="m-frac"|<mfrac/.test(s)) out.add('frac');
  if (/class="m-sup"|<msup/.test(s)) out.add('^');
  if (/class="m-rad"|<msqrt|<mroot/.test(s)) out.add('√');
  for (const [, v] of s.matchAll(/<i class="m-var">([^<]+)<\/i>/g)) for (const c of v) if (isLetter(c)) out.add(c);
  for (const [, v] of maths.matchAll(/<mi[^>]*>([^<]+)<\/mi>/g)) {
    const t = v.trim();
    if ([...t].length === 1 && isLetter(t)) out.add(t);
    else if (FN_NAMES.has(t)) out.add(`${t}(`);
  }
  for (const [, v] of maths.matchAll(/<mo[^>]*>([^<]+)<\/mo>/g)) {
    const t = v.trim();
    if (['=', '<', '>', '≤', '≥', '≠', ';', '|'].includes(t)) out.add(t);
  }
  if (/π/.test(maths) || /<span class="m"[^]*?π/.test(s)) out.add('π');
  return [...out];
}

const ALG_CHECKERS = new Set(['alg', 'solset', 'system', 'isolate', 'paramset', 'eqzero']);
// An item whose answers are expressions or equations with letters.
const isAlgebraic = (item) => ALG_CHECKERS.has(item.checker) || item.type === 'eqlines' || (item.type === 'lines' && typedJudge(item.judge));

// The keypad of an item when it does not name one.
export function baseKeysOf(item) {
  if (item.type === 'eqlines') return 'algeq';
  if (item.type === 'steps') return item.keys || 'ops';
  if (item.type === 'lines') return item.keys?.length ? item.keys : ['calcx', 'calcfn'];
  return item.keys || 'frac';
}

// The tabs of an item's keypad: its own key sets, then a tab « + … » with
// what the question uses (fraction, power, √, π, e, functions, |·|, its
// letters, relations, « ; ») and the keypad lacks, so that the answer,
// the start line and every reference line can be typed on the keypad.
export function keysForItem(item, base = baseKeysOf(item)) {
  const tabs = tabsOf(base);
  const have = new Set(tabs.flatMap((t) => t.keys));
  const missing = [];
  const add = (k) => { if (k && !have.has(k) && !missing.includes(k)) missing.push(k); };
  for (const k of promptKeys(item.prompt)) if (!(k === '√' && have.has('√('))) add(k);
  if (isAlgebraic(item)) for (const k of ['frac', '^', '(', ')']) add(k);
  if (isAlgebraic(item) && !have.has('√(')) add('√');
  for (const t of typedTexts(item)) for (const k of planKeys(t, [...have, ...missing]).missing) add(k);
  if (missing.length) tabs.push({ id: 'auto', keys: [...missing, 'left', 'right', 'back'] });
  return tabs;
}

// ---------- drawing ----------

const CARET = '<span class="caret"></span>';
// How some chunks are drawn while typing (step U2).
const CHUNK_SHOW = { 'int(': '∫(', 'bracket(': '[F](', 'lim(': 'lim(' };

function charHtml(chars, i, end = i + 1) {
  const c = chars[i];
  if (c.length > 1) return `<span class="m-fn" data-i="${i}">${esc(CHUNK_SHOW[c] ?? c)}</span>`;
  if (c === "'") return `<span class="m-op" data-i="${i}">′</span>`;
  if (isLetter(c)) return `<i class="m-var" data-i="${end - 1}">${esc(chars.slice(i, end).join(''))}</i>`;
  const show = c === '-' ? '−' : c;
  // A minus at the start, after a bracket or an operator is a sign.
  const prev = chars[i - 1];
  const sign = c === '-' && (i === 0 || '(+-×÷^=;'.includes(prev) || isOpenChunk(prev ?? ''));
  const cls = sign ? 'm-op m-neg' : '+-×÷=<>≤≥≠'.includes(c) ? 'm-op' : 'm-par';
  return `<span class="${cls}" data-i="${i}">${esc(show)}</span>`;
}

// Renders typed characters in 2D, with the caret. Gap g is the position
// before chars[g]; each gap is drawn once, inside the structure where the
// next character goes (after the digits of a denominator or an exponent:
// a digit typed there extends it).
export function renderChars(chars, caret = -1) {
  if (!chars.length) return '';
  const L = layoutChars(chars);
  const drawn = new Set();
  const gap = (g) => {
    if (drawn.has(g)) return '';
    drawn.add(g);
    return caret === g ? CARET : '';
  };
  const empty = (inner) => `<span class="mi-empty">${inner}</span>`;
  const seq = (items) => items.map(R).join('');
  const tail = (node) => node && (node.k === 'num' || (node.k === 'neg' && tail(node.a)));
  // The content of a box (numerator, denominator, exponent, radicand).
  const box = (node, from) => (node ? gap(from) + R(node) + (tail(node) ? gap(node.end) : '') : empty(gap(from)));

  function R(node) {
    switch (node.k) {
      case 'ch': return gap(node.i) + charHtml(chars, node.i, node.end);
      case 'num': {
        let s = '';
        for (let x = node.s; x < node.end; x++) s += `${gap(x)}<span data-i="${x}">${esc(chars[x])}</span>`;
        return s;
      }
      case 'neg': return `${gap(node.i)}<span class="m-op m-neg" data-i="${node.i}">−</span>${node.a ? R(node.a) : ''}`;
      case 'grp': return group(node);
      case 'frac': {
        const f = node;
        // Before a numerator in hidden brackets: the caret is left of the fraction.
        const before = f.num?.hide ? gap(f.num.open) : '';
        const numEnd = f.num?.hide ? f.num.close : f.bar;
        const num = f.num ? box(f.num, f.num.start) + gap(f.bar) : empty(gap(f.bar));
        return `${before}<span class="m-frac"><span class="m-n" data-i="${numEnd - 1}">${num}</span><span class="m-d" data-i="${f.bar}">${box(f.den, f.bar + 1)}</span></span>`;
      }
      case 'pow': return `${R(node.b)}${gap(node.at)}<sup class="m-sup" data-i="${node.at}">${box(node.e, node.at + 1)}</sup>`;
      case 'sqrt': return `${gap(node.at)}<span class="m-sqrt"><span class="m-rad" data-i="${node.at}">√</span><span class="m-under">${box(node.a, node.at + 1)}</span></span>`;
      case 'abs': return `${gap(node.open)}<span class="m-abs"><span class="m-bar" data-i="${node.open}">|</span>${gap(node.open + 1)}${seq(node.body)}${gap(node.close)}<span class="m-bar" data-i="${node.close}">|</span></span>`;
      default: return '';
    }
  }

  function group(g) {
    const end = g.close ?? g.end;
    const inner = () => {
      const s = gap(g.open + 1) + seq(g.body) + gap(end);
      return g.body.length ? s : empty(s);
    };
    if (g.hide) return inner();
    const c = chars[g.open];
    if (c === '√(') return `${gap(g.open)}<span class="m-sqrt"><span class="m-rad" data-i="${g.open}">√</span><span class="m-under">${inner()}</span></span>`;
    if (c === 'e^(') return `${gap(g.open)}<i class="m-var" data-i="${g.open}">e</i><sup class="m-sup" data-i="${g.open}">${inner()}</sup>`;
    let head = '';
    if (g.fn != null) for (let x = g.fn; x < g.open; x++) head += `${gap(x)}<span class="m-fn" data-i="${x}">${esc(chars[x])}</span>`;
    const open = c.length > 1 ? `<span class="m-fn" data-i="${g.open}">${esc(CHUNK_SHOW[c] ?? c)}</span>` : `<span class="m-par" data-i="${g.open}">(</span>`;
    const body = gap(g.open + 1) + seq(g.body) + gap(end);
    return `${head}${gap(g.open)}${open}${body}${g.close != null ? `<span class="m-par" data-i="${g.close}">)</span>` : ''}`;
  }

  let out = seq(L.items) + gap(chars.length);
  if (caret >= 0 && caret <= chars.length && !drawn.has(caret)) out += CARET;
  return out;
}

// Step U6 (A2): several variables (∂ writes pd(f, x)), polar and spherical
// letters, the constants of differential equations, systems with « ou ».
KEYSETS.a2 = ['x', 'y', 'z', 'pd(', ',', 'r', 'φ', 'θ', 'λ', 'C', '_', ';', '≤', '|', ' ou ', 'back'];
TAB_LABEL.a2 = 'xy ∂';
Object.assign(LABEL, { 'pd(': '∂( , x)' });

// Step U10 (V, C, F): parametrisations and boundaries (σ(r, φ), t ∈ [a ; b],
// Γ₁ : point), and transforms (ℱ, ℒ, the transform û of the unknown,
// Heaviside H, δ, the half-plane Re z > …).
KEYSETS.vecto = ['(', ';', ')', 't', 'r', 'φ', 'θ', 'σ', 'γ', '∈', '[', ']', '×', '∧', 'Γ', '_', ':', 'point', ' et ', "s'annulent", 'back'];
TAB_LABEL.vecto = 'σ ∈ Γ';
KEYSETS.transf = ['ℱ(', 'ℒ(', 'α', 'z', 'û', 'Y', 'U', 'H(', 'δ', '|', 'e^(', '√(2π)', ', Re z > ', 'back'];
TAB_LABEL.transf = 'ℱ ℒ';
Object.assign(LABEL, { ', Re z > ': 'Re z >', 'H(': 'H( )', 'ℱ(': 'ℱ( )', 'ℒ(': 'ℒ( )' });
// Residues and arcs (C, part b), distributions (F, part b).
KEYSETS.cres = ['z', 'R', 'w', 'θ', 'α', 'i', '|', 'e^(', 'o(', 'Im(', '(', ')', 'left', 'right', 'back'];
TAB_LABEL.cres = 'z R';
KEYSETS.distrib = ['⟨', ',', '⟩', 'φ', "'", 'δ', '_', 'T_', 'D', 'H(', 'int(', '∞', 'C', 'back'];
TAB_LABEL.distrib = '⟨T, φ⟩';
