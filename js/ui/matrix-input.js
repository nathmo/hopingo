// Grid input for matrices and vectors (spec §11, step U3). It has the
// interface of MathInput (display, value, set, keypad(), handleKey,
// flash) so that the lines screen can use either.
//
// A line of the matrix judges is written with a text field and a grid:
//   - the text field holds an operation (« L2 ← L2 − 3L1 »), an expression
//     (« P·D·P^(-1) »), a factor before det (« −4·det »), or a whole line;
//   - the grid holds the matrix (with a bar before the right-hand side), a
//     list of vectors (one per column), or several named factors (L, U).
// The value joins them: « op : [[…]] », « −4·det[[…]] », or the grid alone.
// An operation bar writes Lᵢ ↔ Lⱼ, Lᵢ ← k·Lᵢ, Lᵢ ← Lᵢ + k·Lⱼ; with `apply`
// (choose-the-action mode) it also fills the grid with the result, which
// the student checks. Guided lines fix every cell but the blanks.

import { h, play } from './dom.js';
import { parseMatLine, evalAst, splitTop, normalizeMatText, applyRowOp, valueText, opText } from '../cas/matexpr.js';
import { buildLine } from '../judges/matcommon.js';
import { parse } from '../cas/parse.js';
import { lit } from '../cas/ast.js';
import { Q } from '../math/rational.js';

const SUB = '₀₁₂₃₄₅₆₇₈₉';
const sub = (n) => String(n).split('').map((d) => SUB[d] ?? d).join('');

// The last matrix literal of a text: {prefix, rows: [[cell text]], bar, suffix}.
export function splitLiteral(text) {
  const t = String(text);
  const start = t.lastIndexOf('[[');
  if (start < 0) return null;
  let depth = 0;
  let end = -1;
  for (let k = start; k < t.length; k++) {
    if (t[k] === '[') depth++;
    if (t[k] === ']') { depth--; if (depth === 0) { end = k; break; } }
  }
  if (end < 0) return null;
  const inner = t.slice(start + 1, end);
  let bar = null;
  const rows = splitTop(inner, ',').map((r) => {
    const body = r.trim().replace(/^\[|\]$/g, '');
    const halves = splitTop(body, '|');
    const left = splitTop(halves[0], ',').map((c) => c.trim());
    if (halves.length === 2) bar = left.length;
    return [...left, ...(halves[1] !== undefined ? splitTop(halves[1], ',').map((c) => c.trim()) : [])];
  });
  return { prefix: t.slice(0, start), rows, bar, suffix: t.slice(end + 1) };
}

// The shape of the next line: from the reference line when there is one
// (only its size is used), else from the previous line.
export function matrixShape(cfg, refText, prevNode) {
  const from = (node) => {
    if (!node) return null;
    if (node.assigns?.length > 1 || (node.assigns?.length === 1 && !node.body)) {
      return { factors: node.assigns.filter((a) => a.value?.k === 'm').map((a) => ({ name: a.name, rows: a.value.rows.length, cols: a.value.rows[0].length })) };
    }
    const v = node.value;
    if (!v) return null;
    if (v.k === 'list' && v.items.every((x) => x.k === 'm')) return { vectors: v.items[0].rows.length, count: v.items.length };
    if (v.k === 'm' && (v.vec || v.rows[0].length === 1) && v.rows.length > 1) return { vectors: v.rows.length, count: 1 };
    if (v.k === 'm') return { rows: v.rows.length, cols: v.rows[0].length, bar: v.aug ?? null };
    return null;
  };
  let node = null;
  try { if (refText) node = buildLine(cfg, normalizeMatText(refText)); } catch { node = null; }
  return from(node) ?? from(prevNode);
}

const cellText = (n) => valueText({ k: 's', n }).replace(/-/g, '−');

export class MatrixInput {
  // shape: {rows, cols, bar} | {vectors, count} | {factors: [{name, rows, cols}]} | null
  // prev: the previous line node (operations are applied to its matrix).
  constructor({ shape = null, prev = null, cfg = {}, onChange, onEnter, ops = false, apply = false, text = true, placeholder = '' } = {}) {
    this.shape = shape;
    this.prev = prev;
    this.cfg = cfg;
    this.onChange = onChange;
    this.onEnter = onEnter;
    this.withOps = ops;
    this.apply = apply;
    this.display = h('div.mx-input');
    this.textField = text ? h('input.mx-text', { type: 'text', autocomplete: 'off', spellcheck: 'false', placeholder: placeholder || (ops ? 'opération : L2 ← L2 − 3L1' : 'ou écris la ligne') }) : null;
    this.gridBox = h('div.mx-grids');
    this.fixedText = null;
    if (this.textField) {
      this.textField.addEventListener('input', () => this.changed());
      this.textField.addEventListener('keydown', (e) => this.key(e));
    }
    this.build();
  }

  key(e) {
    if (e.key === 'Enter') { e.preventDefault(); this.onEnter?.(); }
  }

  changed() { this.onChange?.(this.value); }

  // One grid: rows × cols text cells; fixed: cells given (guided lines).
  grid(rows, cols, { bar = null, label = null, fixed = null, blanks = null } = {}) {
    const cells = [];
    const table = h('div.mx-grid', { style: { '--cols': String(cols + (bar !== null ? 1 : 0)) } });
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        if (bar !== null && j === bar) table.append(h('span.mx-bar', '|'));
        const isBlank = !fixed || blanks?.some(([r, c]) => r === i && c === j);
        const f = h('input.mx-cell', { type: 'text', autocomplete: 'off', inputmode: 'text', size: 3, 'aria-label': `ligne ${i + 1}, colonne ${j + 1}` });
        if (!isBlank) { f.value = fixed[i][j]; f.readOnly = true; f.classList.add('fixed'); }
        f.addEventListener('input', () => this.changed());
        f.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') { e.preventDefault(); this.onEnter?.(); return; }
          // ▶ moves to the next empty cell.
          if (e.key === 'Tab' && !e.shiftKey) return;
        });
        row.push(f);
        table.append(f);
      }
      cells.push(row);
    }
    const box = h('div.mx-grid-box', label ? h('span.mx-label', `${label} =`) : null, h('span.mx-bracket', '['), table, h('span.mx-bracket', ']'));
    return { box, cells, rows, cols, bar, label };
  }

  build({ fixed = null, blanks = null } = {}) {
    this.grids = [];
    const s = this.shape;
    this.vectors = !!s?.vectors;
    if (s?.factors) {
      for (const f of s.factors) this.grids.push(this.grid(f.rows, f.cols, { label: f.name.replace(/_(\d+)/, (_, d) => sub(d)) }));
    } else if (s?.vectors) {
      this.grids.push(this.grid(s.vectors, s.count, {}));
    } else if (s?.rows) {
      this.grids.push(this.grid(s.rows, s.cols, { bar: s.bar, fixed, blanks }));
    }
    this.gridBox.replaceChildren(...this.grids.map((g) => g.box));
    if (this.vectors && this.grids.length) this.gridBox.append(h('small.muted.mx-hint', this.shape.count > 1 ? 'Un vecteur par colonne.' : 'Les composantes du vecteur.'));
    this.display.replaceChildren(...[this.fixedText, this.textField, this.gridBox].filter(Boolean));
  }

  // Change the size of the (single) grid.
  resize(dr, dc) {
    const s = this.shape;
    if (!s) { this.shape = { rows: 2, cols: 2, bar: null }; this.build(); return; }
    if (s.vectors) { s.vectors = Math.max(1, s.vectors + dr); s.count = Math.max(1, s.count + dc); } else if (s.rows) {
      s.rows = Math.max(1, s.rows + dr);
      s.cols = Math.max(1, s.cols + dc);
      if (s.bar !== null && s.bar >= s.cols) s.bar = null;
    }
    const old = this.gridTexts();
    this.build();
    // Keep what was typed.
    this.grids.forEach((g, k) => g.cells.forEach((r, i) => r.forEach((c, j) => { c.value = old[k]?.[i]?.[j] ?? ''; })));
    this.changed();
  }

  gridTexts() { return this.grids.map((g) => g.cells.map((r) => r.map((c) => c.value.trim()))); }

  gridValue(k) {
    const g = this.grids[k];
    const t = g.cells.map((r) => r.map((c) => c.value.trim().replace(/−/g, '-')));
    if (t.every((r) => r.every((x) => x === ''))) return '';
    if (this.vectors) return t[0].map((_, j) => `(${t.map((r) => r[j] || '?').join(' ; ')})`).join(', ');
    return `[${t.map((r) => `[${r.map((x, j) => `${g.bar !== null && j === g.bar ? '|' : ''}${x || '?'}`).join(',').replace(/,\|/g, '|')}]`).join(',')}]`;
  }

  get value() {
    const text = (this.fixedText ? this.fixedValue : this.textField?.value ?? '').trim().replace(/−/g, '-');
    if (this.shape?.factors) {
      const parts = this.grids.map((g, k) => ({ name: g.label, v: this.gridValue(k) })).filter((p) => p.v);
      const named = parts.map((p) => `${this.shape.factors.find((f) => f.name.replace(/_(\d+)/, (_, d) => sub(d)) === p.name)?.name ?? p.name} = ${p.v}`).join(' ; ');
      return [text, named].filter(Boolean).join(' ; ');
    }
    const grid = this.grids.length ? this.gridValue(0) : '';
    if (this.template) return `${this.template.prefix}${grid}${this.template.suffix}`;
    if (!grid) return text;
    if (!text) return grid;
    if (/det\s*\(?\s*$/.test(text)) return `${text}${grid}${/\(\s*$/.test(text) ? ')' : ''}`;
    if (/^L_?\d+\s*[←↔]/.test(text) && !text.includes(':')) return `${text} : ${grid}`;
    if (/[:=]\s*$/.test(text)) return `${text} ${grid}`;
    return text;
  }

  // Fill from a line of text: its matrix goes into the grid, the rest into
  // the text field.
  set(str) {
    const t = String(str ?? '');
    const lit0 = splitLiteral(t);
    if (lit0 && this.grids.length === 1 && !this.vectors) {
      this.shape = { rows: lit0.rows.length, cols: lit0.rows[0].length, bar: lit0.bar };
      this.build();
      this.grids[0].cells.forEach((r, i) => r.forEach((c, j) => { c.value = (lit0.rows[i][j] ?? '').replace(/-/g, '−'); }));
      if (this.textField) this.textField.value = `${lit0.prefix}`.replace(/\s*:\s*$/, '').trim() + lit0.suffix;
    } else if (this.textField) this.textField.value = t;
    this.changed();
  }

  // Guided line: the reference line with its blank cells; everything else
  // is shown and fixed.
  guided(refText, blanks) {
    const t = splitLiteral(refText);
    if (!t) return false;
    this.template = { prefix: t.prefix, suffix: t.suffix };
    this.shape = { rows: t.rows.length, cols: t.rows[0].length, bar: t.bar };
    this.fixedValue = t.prefix.replace(/\s*:\s*$/, '');
    const shown = t.prefix.trim().replace(/:\s*$/, '').replace(/-/g, '−').replace(/L(\d)/g, (_, d) => `L${sub(d)}`);
    this.fixedText = shown ? h('div.mx-fixed', shown) : null;
    this.textField = null;
    this.build({ fixed: t.rows.map((r) => r.map((c) => c.replace(/-/g, '−'))), blanks });
    return true;
  }

  focus() {
    const first = this.grids.flatMap((g) => g.cells.flat()).find((c) => !c.readOnly && !c.value);
    (first ?? this.textField)?.focus?.();
  }

  flash() {
    this.display.classList.remove('shake');
    void this.display.offsetWidth;
    this.display.classList.add('shake');
  }

  handleKey() { /* the cells are real inputs: the browser types in them */ }

  // The operation bar and the size controls (the footer of the screen).
  keypad() {
    const out = h('div.mx-pad');
    if (this.withOps && this.prev?.value?.k === 'm') out.append(this.opBar());
    if (!this.template && this.grids.length === 1) {
      const btn = (label, f) => h('button.btn.small.ghost', { type: 'button', onclick: f }, label);
      out.append(h('div.row.mx-size',
        h('small.muted', 'Taille :'),
        btn('− ligne', () => this.resize(-1, 0)), btn('+ ligne', () => this.resize(1, 0)),
        btn('− colonne', () => this.resize(0, -1)), btn('+ colonne', () => this.resize(0, 1))));
    }
    return out;
  }

  opBar() {
    const m = this.prev.value.rows.length;
    const sel = (opts) => h('select', ...opts.map(([v, label]) => h('option', { value: v }, label)));
    const kind = sel([['add', 'Lᵢ ← Lᵢ + k·Lⱼ'], ['swap', 'Lᵢ ↔ Lⱼ'], ['scale', 'Lᵢ ← k·Lᵢ']]);
    const rowsOpts = Array.from({ length: m }, (_, i) => [String(i + 1), `L${sub(i + 1)}`]);
    const i = sel(rowsOpts);
    const j = sel(rowsOpts);
    const k = h('input.mx-k', { type: 'text', size: 4, placeholder: 'k', autocomplete: 'off' });
    j.value = '1';
    i.value = m > 1 ? '2' : '1';
    const write = () => {
      const kt = (k.value.trim() || '1').replace(/−/g, '-');
      const I = Number(i.value) - 1;
      const J = Number(j.value) - 1;
      let op;
      try {
        const kn = parse(kt);
        if (kind.value === 'swap') op = { kind: 'swap', i: I, j: J };
        else if (kind.value === 'scale') op = { kind: 'scale', i: I, k: kn };
        else op = { kind: 'add', i: I, j: J, k: kn };
      } catch { k.classList.add('shake'); return; }
      if (op.kind !== 'scale' && I === J) { play('bad'); return; }
      const text = opText(op);
      if (this.textField) this.textField.value = text;
      // The app computes the result; the student checks it (tap mode).
      if (this.apply && this.prev?.value?.k === 'm' && this.grids.length === 1) {
        try {
          const rows = applyRowOp(this.prev.value.rows, op);
          this.grids[0].cells.forEach((r, a) => r.forEach((c, b) => { c.value = cellText(rows[a][b]); }));
        } catch { /* leave the grid */ }
      }
      play('tap');
      this.changed();
    };
    const refresh = () => { j.disabled = kind.value === 'scale'; k.disabled = kind.value === 'swap'; };
    kind.addEventListener('change', refresh);
    refresh();
    return h('div.row.mx-opbar', kind, h('small', 'i'), i, h('small', 'j'), j, h('small', 'k'), k,
      h('button.btn.small.secondary', { type: 'button', onclick: write }, this.apply ? 'Appliquer' : 'Écrire l\'opération'));
  }
}

// A grid for one answer (counter-examples, `matrix` items): rows × cols,
// or a size chosen with ± when the item does not fix it.
export function gridInput({ rows = 2, cols = 2, onEnter, onChange, text = false } = {}) {
  return new MatrixInput({ shape: { rows, cols, bar: null }, onEnter, onChange, text });
}

export { sub as subDigits, Q, lit, evalAst, parseMatLine };
