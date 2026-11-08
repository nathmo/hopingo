// Exercise components. Each mount returns a controller:
//   el        the exercise body
//   footer    optional element for the bottom area (keypad...)
//   check()   for simple types: returns an outcome, or {stayOpen, message}
//   ownFlow   true if the exercise decides itself when it is finished,
//             by calling ctx.complete(outcome)
//   onKey(e)  keyboard handler
// Outcome: {correct, rules, ambiguous, ops, answerHtml, explainHtml}

import { h, html, play } from './dom.js';
import { MathInput } from './keypad.js';
import { figure, shadeFigure, numberLine } from './figures.js';
import { Q } from '../math/rational.js';
import {
  parse, evaluate, render, renderText, tidy, getAt, replaceAt, isLiteral, isIrreducible,
  parsePath, lit, print, walk, tryEvaluate, nextOperationPath, isComputable,
} from '../math/expr.js';
import { solve, nextStep } from '../math/solver.js';
import { diagnose } from '../math/diagnose.js';
import { judgeAnswer, judgeLine, performedOps } from '../math/judge.js';
import { RULE_BY_ID, FAMILIES } from '../math/malrules.js';

const M = (s) => `<span class="m">${renderText(s)}</span>`;

// Explanation of a recognised mistake, using the student's own numbers.
// Without a diagnosis (a trap recognised from the final answer only), the
// rule explains itself in general terms, or shows its typical example.
export function explainRule(ruleId, diag) {
  const r = RULE_BY_ID[ruleId];
  if (!r) return '';
  let body = '';
  try { body = r.op && diag?.A ? r.explain(diag.A, diag.B, diag.op) : r.explain(); } catch { body = ''; }
  if (!body) body = `Erreur typique : <b>${r.example[0]}</b> ✗ — juste : ${r.example[1]}. ${FAMILIES[r.family]?.hint ?? ''}`;
  return `<div class="trap-explain"><div class="trap-tag">🪤 Piège : ${r.name}</div><p>${body}</p></div>`;
}

export function solutionHtml(solution) {
  if (!solution?.length) return '';
  // Always open: the correction is the point of a mistake, not an option.
  return `<div class="solution"><div class="sol-title">La correction</div>${solution
    .map((l) => `<div class="sol-line">${M(l.math)}<span class="sol-note">${l.note || ''}</span></div>`).join('')}</div>`;
}

function rulesFromDiag(diag) {
  return diag ? { rules: diag.rules, ambiguous: diag.ambiguous || 1 } : { rules: [], ambiguous: 1 };
}

function wrongOutcome(item, { rules = [], ambiguous = 1, diag = null, answerHtml, extra = '' } = {}) {
  const parts = [];
  if (rules.length) parts.push(explainRule(rules[rules.length - 1], diag));
  if (extra) parts.push(extra);
  parts.push(solutionHtml(item.solution));
  return { correct: false, rules, ambiguous, answerHtml, explainHtml: parts.join('') };
}

export function mountExercise(item, ctx) {
  const body = h('div.exercise');
  body.appendChild(h('div.prompt', html(item.prompt)));
  if (item.figure && item.type !== 'shade') body.appendChild(figure(item.figure));
  const mount = MOUNTS[item.type];
  const ctrl = mount(item, ctx, body);
  return { el: body, ...ctrl };
}

const MOUNTS = {};

// ---------- multiple choice ----------

MOUNTS.mcq = (item, ctx, body) => {
  let chosen = null;
  const list = h(`div.choices${item.big ? '.big' : ''}`);
  item.options.forEach((o, i) => {
    // The wrapper keeps the spaces in mixed text and math ("seulement 8").
    const b = h('button.choice', { type: 'button', html: `<span class="choice-body">${o.html}</span>` }, h('span.choice-key', String(i + 1)));
    b.addEventListener('click', () => {
      list.querySelectorAll('.choice').forEach((x) => x.classList.remove('selected'));
      b.classList.add('selected');
      chosen = o;
      play('tap');
      ctx.ready(true);
    });
    list.appendChild(b);
  });
  body.appendChild(list);
  const right = item.options.find((o) => o.correct);
  return {
    check() {
      if (!chosen) return null;
      list.querySelectorAll('.choice').forEach((x, i) => {
        if (item.options[i].correct) x.classList.add('right');
        else if (item.options[i] === chosen) x.classList.add('wrong');
        x.disabled = true;
      });
      if (chosen.correct) return { correct: true };
      return wrongOutcome(item, { rules: chosen.rule ? [chosen.rule] : [], answerHtml: `<span class="choice-body">${right.html}</span>` });
    },
    onKey(e) {
      const n = Number(e.key);
      if (n >= 1 && n <= item.options.length) list.children[n - 1].click();
    },
  };
};

// ---------- typed answer ----------

MOUNTS.answer = (item, ctx, body) => {
  const input = new MathInput({
    keys: item.keys,
    placeholder: 'Ta réponse',
    onChange: (v) => ctx.ready(v.length > 0),
    onEnter: () => ctx.submit(),
  });
  body.appendChild(h('div.answer-row', input.display, item.suffix ? h('span.suffix', item.suffix) : null));
  const expected = evaluate(parse(item.expected));
  return {
    footer: input.keypad(),
    onKey: (e) => input.handleKey(e),
    check() {
      if (!input.value) return null;
      if (item.exact) {
        const node = parse(input.value.includes('/') ? input.value : `${input.value}/1`);
        const ok = node.t === 'frac' && node.n.v.n === item.exact[0] && node.d.v.n === item.exact[1];
        if (ok || (item.exact[1] === 1 && input.value === String(item.exact[0]))) return { correct: true };
      }
      const tree = item.tree ? parse(item.tree) : null;
      const r = judgeAnswer(expected, input.value, { form: item.form, tree });
      if (r.kind === 'parse' || r.kind === 'unfinished' || r.kind === 'form') {
        input.flash();
        return { stayOpen: true, message: r.message };
      }
      if (r.kind === 'simplify') return { stayOpen: true, message: 'C\'est juste ! Mais tu peux encore simplifier.' };
      if (r.kind === 'done' && !item.exact) return { correct: true };
      // Wrong: a known trap for this question, or a diagnosed mistake.
      const v = r.value ?? tryEvaluate(parse(input.value));
      const trap = v && item.traps.find((t) => evaluate(parse(t.value)).eq(v));
      if (trap) return wrongOutcome(item, { rules: [trap.rule], answerHtml: M(item.expected) });
      if (r.diag) return wrongOutcome(item, { ...rulesFromDiag(r.diag), diag: r.diag, answerHtml: M(item.expected) });
      return wrongOutcome(item, { answerHtml: M(item.exact ? `${item.exact[0]}/${item.exact[1]}` : item.expected) });
    },
  };
};

// ---------- shading ----------

MOUNTS.shade = (item, ctx, body) => {
  const fig = shadeFigure(item.figure, (n) => ctx.ready(n > 0));
  body.appendChild(fig.el);
  body.appendChild(h('p.hint-small', 'Touche les parts pour les colorier.'));
  return {
    check() {
      const n = fig.count();
      fig.el.classList.add('locked');
      if (n === item.target.count) return { correct: true };
      return wrongOutcome(item, {
        answerHtml: `${item.target.count} parts sur ${item.figure.n}`,
        extra: `<p>Tu as colorié ${n} part${n > 1 ? 's' : ''} sur ${item.figure.n}.</p>`,
      });
    },
  };
};

// ---------- number line ----------

MOUNTS.numberline = (item, ctx, body) => {
  let picked = null;
  const line = numberLine(item.line, { onPick: (v) => { picked = v; play('tap'); ctx.ready(true); } });
  body.appendChild(line.el);
  body.appendChild(h('p.hint-small', 'Touche la droite pour placer le point.'));
  const target = evaluate(parse(item.target));
  return {
    check() {
      if (!picked) return null;
      line.el.classList.add('locked');
      if (picked.eq(target)) return { correct: true };
      const right = numberLine({ ...item.line, mark: [target.n, target.d] });
      // A point placed on the other side of zero: the sign was dropped.
      if (target.n < 0 && picked.eq(target.neg())) {
        return wrongOutcome(item, { rules: ['read_neg_as_pos'], answerHtml: M(item.target), extra: right.el.outerHTML });
      }
      right.el.classList.add('correction');
      return wrongOutcome(item, {
        answerHtml: M(item.target),
        extra: `<p>Tu as placé ${M(picked.toString())}.</p>${right.el.outerHTML}`,
      });
    },
  };
};

// ---------- matching pairs ----------

MOUNTS.match = (item, ctx, body) => {
  const n = item.pairs.length;
  const leftOrder = [...Array(n).keys()];
  const rightOrder = [...Array(n).keys()].sort(() => Math.random() - 0.5);
  let sel = null;
  let mistakes = 0;
  let matched = 0;
  const grid = h('div.match');
  const colL = h('div.match-col');
  const colR = h('div.match-col');
  const mk = (side, idx) => {
    const b = h('button.match-item', { type: 'button', html: item.pairs[idx][side] });
    b.dataset.idx = idx;
    b.dataset.side = side;
    b.addEventListener('click', () => {
      if (b.classList.contains('done')) return;
      if (!sel || sel.dataset.side === String(side)) {
        sel?.classList.remove('selected');
        sel = b;
        b.classList.add('selected');
        play('tap');
        return;
      }
      if (sel.dataset.idx === b.dataset.idx) {
        [sel, b].forEach((x) => { x.classList.remove('selected'); x.classList.add('done'); });
        play('good');
        matched++;
        sel = null;
        if (matched === n) {
          setTimeout(() => ctx.complete(mistakes === 0 ? { correct: true } : wrongOutcome(item, {
            extra: `<p>${mistakes} erreur${mistakes > 1 ? 's' : ''} d'association.</p>`,
          })), 350);
        }
      } else {
        mistakes++;
        play('bad');
        [sel, b].forEach((x) => { x.classList.add('miss'); setTimeout(() => x.classList.remove('miss', 'selected'), 450); });
        sel = null;
      }
    });
    return b;
  };
  leftOrder.forEach((i) => colL.appendChild(mk(0, i)));
  rightOrder.forEach((i) => colR.appendChild(mk(1, i)));
  grid.append(colL, colR);
  body.appendChild(grid);
  return { ownFlow: true };
};

// ---------- multi-step solving ----------

MOUNTS.steps = (item, ctx, body) => {
  const start = tidy(parse(item.expr));
  const state = { mistakes: 0, rules: [], ambiguous: 1, revealed: false, ops: [], diag: null };
  const history = h('div.steps-history');
  history.appendChild(h('div.step-line.first', html(`<span class="m">${render(start)}</span>`)));
  body.appendChild(history);
  const feedback = h('div.step-feedback');
  const finish = () => {
    const correct = state.mistakes === 0 && !state.revealed;
    const outcome = correct
      ? { correct: true, ops: state.ops }
      : {
        ...wrongOutcome(item, { rules: state.rules, ambiguous: state.ambiguous, diag: state.diag, answerHtml: M(item.answer) }),
        ops: state.ops,
        softWrong: state.mistakes === 0, // only needed help
      };
    ctx.complete(outcome);
  };
  const noteMistake = (diag, fallback) => {
    state.mistakes += 1;
    if (diag) {
      state.rules.push(...diag.rules);
      state.ambiguous = Math.max(state.ambiguous, diag.ambiguous || 1);
      state.diag = diag;
    }
    play('bad');
    feedback.className = 'step-feedback bad';
    feedback.innerHTML = diag ? explainRule(diag.rules[diag.rules.length - 1], diag) : `<p>${fallback}</p>`;
    pauseForReading();
  };
  // A wrong step blocks the keypad for a moment so the explanation gets read.
  const pauseForReading = () => {
    const words = feedback.textContent.trim().split(/\s+/).length;
    const ms = Math.min(4500, Math.max(1800, words * 150));
    state.lockedUntil = Date.now() + ms;
    feedback.classList.remove('pop');
    void feedback.offsetWidth;
    feedback.classList.add('pop');
    feedback.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
    state.footer?.classList.add('locked');
    state.footer?.style.setProperty('--wait', `${ms}ms`);
    setTimeout(() => { if (Date.now() >= state.lockedUntil) state.footer?.classList.remove('locked'); }, ms);
  };
  const locked = () => Date.now() < (state.lockedUntil || 0);
  const withFooter = (ctrl) => { state.footer = ctrl.footer; const k = ctrl.onKey; ctrl.onKey = (e) => { if (locked()) { e.preventDefault(); return; } k(e); }; return ctrl; };
  const say = (msg, kind = 'info') => {
    feedback.className = `step-feedback ${kind}`;
    feedback.innerHTML = msg;
  };
  const addLine = (node, cls = '', note = '') => {
    history.appendChild(h(`div.step-line${cls ? `.${cls}` : ''}`,
      h('span.eq', '='), html(`<span class="m">${render(node, { fresh: true })}</span>`), note ? h('span.step-note', note) : null));
    history.scrollTop = history.scrollHeight;
  };

  if (item.mode === 'guided') return guided();
  if (item.mode === 'tap') return tapMode();
  return free();

  // Guided: the canonical steps, with the new numbers left blank.
  function guided() {
    const lines = solve(start, item.solveOpts || undefined);
    let L = 0;
    let tries = 0;
    let active = 0;
    let blanks = [];
    let values = [];
    const cur = h('div.step-line.current');
    const label = h('div.step-label');
    body.append(cur, label, feedback);
    const pad = new MathInput({ keys: item.signed ? 'rel' : 'int' });
    pad.press = (k) => {
      if (k === 'ok' || k === 'enter') { validate(); return; }
      if (k === 'back') values[active] = values[active].slice(0, -1);
      else if (k === '-') values[active] = values[active].startsWith('-') ? values[active].slice(1) : `-${values[active]}`;
      else if (/^[0-9]$/.test(k) && values[active].replace('-', '').length < 4) values[active] += k;
      play('tap');
      paint();
    };
    const filled = (v) => /\d/.test(v);
    const setup = () => {
      if (L >= lines.length) { cur.remove(); label.remove(); finish(); return; }
      const line = lines[L];
      blanks = [];
      let node = line.node;
      // A new negative number is one blank, sign included: the sign is part of the answer.
      const inSigned = (path) => blanks.some((b) => b.signed && path.length > b.path.length && b.path.every((k, i) => path[i] === k));
      walk(line.node, (n, path) => {
        if (blanks.length >= 4 || inSigned(path)) return;
        if (item.signed && n.t === 'neg' && n.e.t === 'num' && n.e.fresh) blanks.push({ path, expect: `-${n.e.s}`, signed: true });
        else if (n.t === 'num' && n.fresh) blanks.push({ path, expect: n.s });
      });
      if (!blanks.length) { addLine(line.node, '', line.label); L++; setup(); return; }
      blanks.forEach((b, i) => { node = replaceAt(node, b.path, { t: 'blank', id: i }); });
      values = blanks.map(() => '');
      active = 0;
      tries = 0;
      cur.innerHTML = `<span class="eq">=</span><span class="m">${render(node)}</span>`;
      cur.querySelectorAll('.m-blank').forEach((el) => el.addEventListener('click', () => { active = Number(el.dataset.blank); paint(); }));
      label.textContent = L === 0 ? 'Complète l\'étape.' : '';
      paint();
    };
    const paint = () => {
      cur.querySelectorAll('.m-blank').forEach((el) => {
        const i = Number(el.dataset.blank);
        el.textContent = values[i].replace('-', '−');
        el.classList.toggle('active', i === active);
        el.classList.remove('bad');
      });
      ctx.ready(values.every(filled));
    };
    const validate = () => {
      const empty = values.findIndex((v) => !filled(v));
      if (empty >= 0) { active = empty; paint(); return; }
      const line = lines[L];
      const prev = L === 0 ? start : lines[L - 1].node;
      const okAll = blanks.every((b, i) => Number(values[i]) === Number(b.expect));
      let node = line.node;
      blanks.forEach((b, i) => { node = replaceAt(node, b.path, lit(new Q(Number(values[i])))); });
      const v = tryEvaluate(node);
      const pv = evaluate(prev);
      if (okAll || (v && v.eq(pv) && L === lines.length - 1 && !item.requireIrreducible)) {
        play('good');
        state.ops.push(...performedOps(prev, line.node));
        feedback.className = 'step-feedback';
        feedback.innerHTML = '';
        addLine(line.node, 'ok', line.label);
        L++;
        setup();
        return;
      }
      tries++;
      const diag = v && !v.eq(pv) ? diagnose(prev, v) : null;
      // Without a recognised trap, say which operation this step does.
      const opPath = nextOperationPath(prev);
      const sub = opPath ? getAt(prev, opPath) : null;
      const what = sub ? `Calcule ${sub === prev ? '' : 'd\'abord '}<span class="m">${render(sub)}</span>.` : '';
      const note = line.label && line.label !== 'On calcule.' ? ` <b>Indice :</b> ${line.label}` : '';
      noteMistake(diag, `Pas tout à fait. ${what}${note || (what ? '' : ' Regarde bien l\'opération.')}`);
      cur.querySelectorAll('.m-blank').forEach((el) => {
        const i = Number(el.dataset.blank);
        if (Number(values[i]) !== Number(blanks[i].expect)) el.classList.add('bad');
      });
      if (tries >= 2) {
        state.revealed = true;
        addLine(line.node, 'shown', line.label);
        L++;
        setTimeout(setup, 50);
      }
    };
    setup();
    return withFooter({
      ownFlow: true,
      footer: h('div.steps-footer', pad.keypad(), h('button.btn.primary.wide', { onclick: validate }, 'Valider l\'étape')),
      onKey: (e) => {
        if (/^[0-9]$/.test(e.key) || (e.key === '-' && item.signed)) pad.press(e.key);
        else if (e.key === 'Backspace') pad.press('back');
        else if (e.key === 'Enter') { e.preventDefault(); validate(); }
        else if (e.key === 'Tab' || e.key === 'ArrowRight') { e.preventDefault(); active = (active + 1) % blanks.length; paint(); }
        else if (e.key === 'ArrowLeft') { active = (active + blanks.length - 1) % blanks.length; paint(); }
      },
    });
  }

  // Tap-then-solve: tap the operation to do, type its result.
  function tapMode() {
    let cur = start;
    let pending = null; // path being computed, or 'simplify'
    let tries = 0;
    const exprBox = h('div.tap-expr');
    const ask = h('div.tap-ask');
    // Earlier states go in the history; the tappable line is the current one.
    history.firstChild.remove();
    body.append(h('p.hint-small', 'Touche l\'opération à calculer en premier.'), exprBox, ask, feedback);
    const input = new MathInput({ keys: item.tapKeys || 'frac', placeholder: 'résultat', onEnter: () => submit() });
    const paint = () => {
      exprBox.innerHTML = `<span class="m">${render(cur, { tap: !pending })}</span>`;
      exprBox.dataset.expr = print(cur);
      exprBox.querySelectorAll('.m-tap').forEach((b) => b.addEventListener('click', () => choose(parsePath(b.dataset.path))));
    };
    const choose = (path) => {
      if (locked()) return;
      const node = getAt(cur, path);
      if (isComputable(node)) {
        pending = path;
        tries = 0;
        input.set('');
        ask.innerHTML = '';
        ask.append(h('div.tap-sub', { 'data-expr': print(node) }, html(`<span class="m">${render(node)}</span>`), h('span.eq', '='), input.display));
        feedback.innerHTML = '';
        play('tap');
        paint();
        return;
      }
      let rule = 'priority_left_to_right';
      if (node.t !== 'bin') rule = 'ignore_parentheses';
      else if (node.l.t === 'pow' || node.r.t === 'pow') rule = 'pow_before_product';
      else if (node.l.t === 'paren' || node.r.t === 'paren') rule = 'ignore_parentheses';
      noteMistake({ rules: [rule], ambiguous: 1 }, '');
      const next = nextOperationPath(cur);
      if (next) exprBox.querySelector(`[data-path="${next.join('.')}"]`)?.classList.add('pulse');
    };
    const submit = () => {
      if (!pending || !input.value) return;
      if (pending === 'simplify') {
        const r = judgeAnswer(evaluate(cur), input.value, { form: 'irreducible' });
        if (r.kind === 'done') { play('good'); pushPast(); cur = r.node; ask.innerHTML = ''; paint(); finish(); return; }
        if (r.kind === 'simplify') { say('<p>C\'est mieux, mais on peut encore simplifier.</p>'); pushPast(); cur = r.node; paint(); input.set(''); return; }
        tries++;
        noteMistake(r.diag, 'Ce n\'est pas égal. Divise le numérateur et le dénominateur par un même nombre.');
        if (tries >= 2) { state.revealed = true; pushPast(); cur = lit(evaluate(cur)); ask.innerHTML = ''; paint(); finish(); }
        return;
      }
      const node = getAt(cur, pending);
      const r = judgeAnswer(evaluate(node), input.value, { tree: node });
      if (r.kind === 'parse' || r.kind === 'unfinished') { input.flash(); say(`<p>${r.message}</p>`); return; }
      if (r.kind === 'wrong') {
        tries++;
        noteMistake(r.diag, 'Ce n\'est pas le bon résultat. Regarde bien l\'opération.');
        if (tries < 2) return;
        state.revealed = true;
        apply(lit(evaluate(node)), 'shown');
        return;
      }
      play('good');
      feedback.innerHTML = '';
      apply(r.node, 'ok');
    };
    const pushPast = () => {
      const first = !history.children.length;
      history.appendChild(h(`div.step-line.past${first ? '.first' : ''}`,
        first ? null : h('span.eq', '='), html(`<span class="m">${render(cur)}</span>`)));
    };
    const apply = (result) => {
      const done = getAt(cur, pending);
      state.ops.push(done.t === 'bin' ? done.op : done.t === 'pow' ? '^' : done.t === 'sqrt' ? '√' : 'opp');
      pushPast();
      cur = tidy(replaceAt(cur, pending, result));
      pending = null;
      ask.innerHTML = '';
      if (isLiteral(cur)) {
        if (item.requireIrreducible && !isIrreducible(cur)) {
          pending = 'simplify';
          tries = 0;
          input.set('');
          ask.append(h('div.tap-sub', h('span', 'Simplifie :'), html(`<span class="m">${render(cur)}</span>`), h('span.eq', '='), input.display));
          return paint();
        }
        paint();
        finish();
        return;
      }
      paint();
    };
    paint();
    return withFooter({
      ownFlow: true,
      footer: h('div.steps-footer', input.keypad(), h('button.btn.primary.wide', { onclick: submit }, 'Valider')),
      onKey: (e) => input.handleKey(e),
    });
  }

  // Free lines: the student rewrites the expression one step at a time.
  function free() {
    let last = start;
    let wrongHere = 0;
    let hintLevel = 0;
    const input = new MathInput({ keys: item.keys || 'ops', placeholder: 'écris la ligne suivante', onEnter: () => submit() });
    const row = h('div.step-line.current', h('span.eq', '='), input.display);
    const tools = h('div.step-tools',
      h('button.btn.small.ghost', { type: 'button', onclick: () => { input.set(print(last)); } }, '⧉ Recopier la ligne'),
      h('button.btn.small.ghost', { type: 'button', onclick: () => hint() }, '💡 Indice'));
    body.append(row, tools, feedback);
    const hint = () => {
      const step = nextStep(last);
      if (!step) return;
      if (hintLevel === 0) {
        hintLevel = 1;
        say(`<p><b>Indice :</b> ${step.label}</p>`);
      } else {
        state.revealed = true;
        hintLevel = 0;
        last = step.node;
        addLine(step.node, 'shown', step.label);
        say('<p>Voilà cette étape. À toi pour la suite !</p>');
        input.set('');
        if (isLiteral(last) && (!item.requireIrreducible || isIrreducible(last))) finish();
      }
    };
    const submit = () => {
      if (!input.value) return;
      const r = judgeLine(last, input.value, { requireIrreducible: item.requireIrreducible });
      if (r.kind === 'parse') { input.flash(); say(`<p>${r.message}</p>`); return; }
      if (r.kind === 'same') { say('<p>Cette ligne est la même que la précédente : fais au moins un calcul.</p>'); return; }
      if (r.kind === 'wrong') {
        wrongHere++;
        noteMistake(r.diag, 'Cette ligne n\'est plus égale à la précédente. Vérifie ton calcul.');
        if (wrongHere >= 2) feedback.insertAdjacentHTML('beforeend', '<p class="muted">Tu peux demander un indice.</p>');
        return;
      }
      play('good');
      state.ops.push(...(r.ops || []));
      last = r.node;
      wrongHere = 0;
      hintLevel = 0;
      addLine(r.node, 'ok');
      input.set('');
      if (r.kind === 'simplify') { say('<p>C\'est juste ! Simplifie encore pour finir.</p>', 'good'); return; }
      feedback.innerHTML = '';
      feedback.className = 'step-feedback';
      if (r.kind === 'done') finish();
    };
    return withFooter({
      ownFlow: true,
      footer: h('div.steps-footer', input.keypad(), h('button.btn.primary.wide', { onclick: submit }, 'Valider la ligne')),
      onKey: (e) => input.handleKey(e),
    });
  }
};

export { M };
