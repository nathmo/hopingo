// Tables (spec §6 `table`, §11, step U1): Horner's scheme, truth tables,
// tableaux de signes (sign cells cycle through + − 0 ‖, step U1b),
// grids of a predicate. Number cells are small text fields, true/false
// cells toggle V/F. js/judges/iter.js judges each cell from the student's
// own cells. After the table, `then` (an item) is asked in the same place.

import { h, html, play } from './dom.js';
import { explainRule, solutionHtml, mountExercise } from './exercises.js';
import { hintsBox } from './tokens.js';
import { checkTable } from '../judges/iter.js';

export function mountTable(item, ctx, body) {
  const feedback = h('div.step-feedback');
  const hintBox = h('div.lines-hints');
  const hints = hintsBox(item, hintBox);
  const values = {};
  const fields = {};
  const tbl = h('table.u-table');
  const footer = h('div');
  const after = h('div.table-then');
  let mistakes = 0;
  const rules = [];
  const say = (msg, kind = 'info') => { feedback.className = `step-feedback ${kind}`; feedback.innerHTML = msg; };

  const cellInput = (rowId, j, cell) => {
    if (cell.kind === 'tf') {
      const b = h('button.tf-cell', { type: 'button' }, '?');
      b.addEventListener('click', () => {
        const next = values[rowId][j] === 'V' ? 'F' : 'V';
        values[rowId][j] = next;
        b.textContent = next;
        b.classList.remove('right', 'wrong');
        play('tap');
      });
      return b;
    }
    if (cell.kind === 'sign') {
      // A sign of a tableau de signes: each tap gives the next of + − 0 ‖.
      const CYCLE = ['+', '−', '0', '‖'];
      const b = h('button.tf-cell', { type: 'button' }, '?');
      b.addEventListener('click', () => {
        const next = CYCLE[(CYCLE.indexOf(values[rowId][j]) + 1) % CYCLE.length];
        values[rowId][j] = next;
        b.textContent = next;
        b.classList.remove('right', 'wrong');
        play('tap');
      });
      return b;
    }
    const f = h('input.num-cell', { type: 'text', inputmode: 'text', autocomplete: 'off', size: 4 });
    f.addEventListener('input', () => { values[rowId][j] = f.value; f.classList.remove('right', 'wrong'); });
    f.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
    return f;
  };

  // The table: a header row, then one row per item row.
  const head = h('tr', h('th'), item.table.cols.map((c) => h('th', html(c))));
  tbl.appendChild(h('thead', head));
  const tb = h('tbody');
  if (item.table.root) {
    const root = item.table.root;
    let rootEl;
    if (root.input) {
      rootEl = h('input.num-cell', { type: 'text', size: 3, autocomplete: 'off' });
      rootEl.addEventListener('input', () => { values.root = rootEl.value; rootEl.classList.remove('right', 'wrong'); });
      fields.root = rootEl;
    } else rootEl = h('b', root.given);
    body.append(h('div.table-root', 'a = ', rootEl));
  }
  for (const r of item.table.rows) {
    values[r.id] = r.cells.map(() => null);
    fields[r.id] = [];
    const tr = h('tr', h('th.row-label', r.label || ''));
    r.cells.forEach((c, j) => {
      if (!c) { tr.appendChild(h('td.empty')); return; }
      if (c.given !== undefined) { tr.appendChild(h('td.given', c.given)); return; }
      const el = cellInput(r.id, j, c);
      fields[r.id][j] = el;
      tr.appendChild(h('td', el));
    });
    tb.appendChild(tr);
  }
  tbl.appendChild(tb);
  body.append(h('div.table-wrap', tbl), h('div.step-tools', hints.button), hintBox, feedback, after);

  const outcome = (correct, extra = {}) => {
    const common = { hintsUsed: hints.used() };
    if (correct) return { correct: true, ...common };
    return {
      correct: false, rules, ambiguous: 1, ...common, ...extra,
      explainHtml: [rules.length ? explainRule(rules[rules.length - 1]) : '', solutionHtml(item.solution)].join(''),
    };
  };

  // The follow-up item, mounted below the table.
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
    // A simple item (multiple choice): its own check button.
    footer.replaceChildren(ctrl.footer || '', h('button.btn.primary.wide', {
      type: 'button',
      onclick: () => { const o = ctrl.check(); if (o && !o.stayOpen) sub.complete(o); },
    }, 'Valider'));
    keyHandler = ctrl.onKey || null;
  }

  function submit() {
    const r = checkTable(item, values);
    for (const [rowId, cells] of Object.entries(r.cells)) {
      if (rowId === 'root') { fields.root?.classList.toggle('wrong', cells === false); fields.root?.classList.toggle('right', cells === true); continue; }
      cells.forEach((ok, j) => {
        const el = fields[rowId]?.[j];
        if (!el || ok === null) return;
        el.classList.toggle('right', ok === true);
        el.classList.toggle('wrong', ok === false);
      });
    }
    if (r.ok) {
      play('good');
      Object.values(fields).flat().forEach((el) => { if (el) el.disabled = true; });
      if (item.then) { say('<p>Le tableau est juste.</p>', 'good'); thenTask(); return; }
      ctx.complete(outcome(mistakes === 0));
      return;
    }
    const empty = Object.entries(fields).some(([rowId, els]) => (Array.isArray(els) ? els.some((el, j) => el && !values[rowId][j]) : !values.root));
    if (empty && !Object.values(r.cells).flat().some((x) => x === false)) { say('<p>Remplis toutes les cases.</p>'); return; }
    play('bad');
    mistakes++;
    if (r.rule) rules.push(r.rule);
    say(r.rule ? explainRule(r.rule) : '<p>Les cases en rouge ne vont pas : chaque case se calcule à partir des cases d\'avant.</p>', 'bad');
    if (mistakes >= 3) ctx.complete(outcome(false));
  }

  let keyHandler = null;
  footer.append(h('button.btn.primary.wide', { type: 'button', onclick: () => submit() }, 'Valider le tableau'));
  return { ownFlow: true, footer, onKey: (e) => keyHandler?.(e) };
}
