// Items `readtable` (spec §6, step U9): a printed table of errors or
// increments (exam format, %e numbers), then a question item (`mcq`, with
// one or several right answers, `answer`, `lines`…) asked below it.
// mountMulti: a multiple choice with several right answers, as in the N
// exams: the item is right when exactly the right boxes are ticked.

import { h, html, play } from './dom.js';
import { mountExercise, solutionHtml, explainRule } from './exercises.js';

export function tableEl(t) {
  return h('div.table-wrap', h('table.u-table.read-table',
    h('thead', h('tr', t.columns.map((c) => h('th', html(c))))),
    h('tbody', t.rows.map((r) => h('tr', r.map((c) => h('td', html(c ?? ''))))))));
}

export function mountMulti(item, ctx, body) {
  const chosen = new Set();
  const list = h('div.choices.multi');
  item.options.forEach((o, i) => {
    const b = h('button.choice', { type: 'button', html: `<span class="choice-box">☐</span><span class="choice-body">${o.html}</span>` });
    b.addEventListener('click', () => {
      if (chosen.has(i)) chosen.delete(i); else chosen.add(i);
      b.classList.toggle('selected', chosen.has(i));
      b.querySelector('.choice-box').textContent = chosen.has(i) ? '☑' : '☐';
      play('tap');
      ctx.ready(chosen.size > 0);
    });
    list.appendChild(b);
  });
  body.appendChild(list);
  return {
    check() {
      if (!chosen.size) return null;
      const right = item.options.every((o, i) => !!o.correct === chosen.has(i));
      list.querySelectorAll('.choice').forEach((x, i) => {
        if (item.options[i].correct) x.classList.add('right');
        else if (chosen.has(i)) x.classList.add('wrong');
        x.disabled = true;
      });
      if (right) return { correct: true };
      const rules = [...chosen].map((i) => item.options[i]).filter((o) => !o.correct && o.rule).map((o) => o.rule);
      return {
        correct: false, rules, ambiguous: 1,
        answerHtml: item.options.filter((o) => o.correct).map((o) => `<span class="choice-body">${o.html}</span>`).join(' ; '),
        explainHtml: [rules.length ? explainRule(rules[rules.length - 1]) : '', solutionHtml(item.solution)].join(''),
      };
    },
    onKey(e) {
      const n = Number(e.key);
      if (n >= 1 && n <= item.options.length) list.children[n - 1].click();
    },
  };
}

export function mountReadtable(item, ctx, body) {
  if (item.table) body.append(tableEl(item.table));
  const q = item.question;
  if (q.type === 'mcq' && q.multi) {
    if (q.prompt) body.append(h('div.prompt', html(q.prompt)));
    return mountMulti(q, ctx, body);
  }
  const ctrl = mountExercise(q, ctx);
  body.append(ctrl.el);
  const { el, ...rest } = ctrl;
  return rest;
}
