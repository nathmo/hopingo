// Math input: a calculator-style line with a caret, shown with stacked
// fractions as you type, plus an on-screen keypad and keyboard support.
// A key may insert several characters at once (« sin( »); it is then one
// chunk for the caret and for ⌫. With `keysets`, tabs switch between
// several keypads (spec §11).

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
Object.assign(LABEL, { 'vec(': 'AB⃗', ' ou ': 'ou' });
Object.assign(LABEL, { 'C(': 'C(n, k)', 'A(': 'A(n, k)', 'Φ(': 'Φ( )', 'Φ⁻¹(': 'Φ⁻¹( )' }); // step U7

export class MathInput {
  constructor({ keys = 'frac', keysets = null, placeholder = '', onChange, onEnter } = {}) {
    this.chars = [];
    this.caret = 0;
    // An item may give a list of keypad names: they become tabs.
    if (!keysets && Array.isArray(keys) && keys.length && keys.every((k) => k.length > 1 && KEYSETS[k])) keysets = keys;
    this.keysets = keysets;
    this.keys = keysets ? keysets[0] : keys;
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
    const prev = (this.chars[this.caret - 1] ?? '').slice(-1) || undefined;
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
    const allowed = new Set(this.keysets ? this.keysets.flatMap((n) => KEYSETS[n]) : this.keyList);
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
    if (this.keysets) return this.tabbedKeypad();
    const pad = h(`div.keypad.keys-${Array.isArray(this.keys) ? 'custom' : this.keys}`);
    for (const k of this.keyList) {
      if (!k) { pad.appendChild(h('span')); continue; }
      const letter = /^[a-zA-Zπα-ωΑ-Ω]$/.test(k);
      const word = k.length > 1 && /[a-z]/i.test(k) && !LABEL[k];
      const cls = /^[0-9]$/.test(k) ? 'key' : letter ? 'key key-fn key-letter' : word ? 'key key-fn key-word' : `key key-fn key-${k === '-' ? 'minus' : k.replace(/[^a-z]/g, '') || 'op'}`;
      pad.appendChild(h('button', { class: cls, type: 'button', onclick: () => this.press(k), html: LABEL[k] ?? esc(word ? k.replace(/\($/, '') : k) }));
    }
    return pad;
  }

  // Tabs over several keypads; the panel is redrawn on each switch.
  tabbedKeypad() {
    const box = h('div.keypad-tabs');
    const tabs = h('div.keytab-row');
    const panel = h('div.keytab-panel');
    const show = (name) => {
      this.keys = name;
      panel.replaceChildren(this.keypadOnly());
      tabs.querySelectorAll('button').forEach((b) => b.classList.toggle('active', b.dataset.set === name));
    };
    if (this.keysets.length > 1) {
      for (const name of this.keysets) tabs.appendChild(h('button.keytab', { type: 'button', 'data-set': name, onclick: () => show(name) }, TAB_LABEL[name] || name));
      box.appendChild(tabs);
    }
    box.appendChild(panel);
    show(this.keysets[0]);
    return box;
  }

  keypadOnly() {
    const sets = this.keysets;
    this.keysets = null;
    try { return this.keypad(); } finally { this.keysets = sets; }
  }
}

const CARET = '<span class="caret"></span>';
// How some chunks are drawn while typing (step U2).
const CHUNK_SHOW = { 'int(': '∫(', 'bracket(': '[F](', 'lim(': 'lim(' };
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
    if (c.length > 1) {
      // A chunk typed with one key: sin(, d(…
      out += `${gap(i)}<span class="m-fn" data-i="${i}">${esc(CHUNK_SHOW[c] ?? c)}</span>`;
      i++;
      continue;
    }
    if (c === "'") {
      out += `${gap(i)}<span class="m-op" data-i="${i}">′</span>`;
      i++;
      continue;
    }
    if (/[a-zA-Zπα-ωΑ-Ω]/.test(c)) {
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
KEYSETS.cres = ['z', 'R', 'w', 'θ', 'α', 'i', '|', 'e^(', 'o(', 'Im(', '(', ')', 'left', 'right', 'back']; TAB_LABEL.cres = 'z R'; // step U10, part cb
KEYSETS.distrib = ['⟨', ',', '⟩', 'φ', "'", 'δ', '_', 'T_', 'D', 'H(', 'int(', '∞', 'C', 'back']; // step U10, part fb: distributions
