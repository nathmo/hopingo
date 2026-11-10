// Mount of `lines` items (spec §6, §9): a worked solution written line by
// line, each line judged against the student's previous one by js/judges.
// Modes:
//   guided  the reference lines with blanks; notes and decisions in turn
//   tap     choose the action (product rule, chain rule…), then write the line
//   free    write each line; hints on demand (« Aide »)
// After a wrong line the mistake is named. With followError the student may
// go on from their own line; the item then counts as failed, but the right
// lines that follow still give their sub-goal credit.

import { h, html, play } from './dom.js';
import { MathInput } from './keypad.js';
import { TokenInput } from './tokens.js';
import { explainRule, solutionHtml } from './exercises.js';
import { LinesRun, templateOf, fillBlanks } from '../judges/lines.js';
import { actionsFor } from '../judges/actions.js';
import { parseOpts } from '../judges/common.js';
import { readWith, showWith, textWith, signOf } from '../judges/index.js';
import { parse, tryParse } from '../cas/parse.js';
import { toMathML } from '../cas/mathml.js';
import { unparen } from '../cas/ast.js';
import { lexFor } from '../cas/logic.js';

const MM = (node, opts) => toMathML(unparen(node), opts);
// The MathML of a typed text, without the <math> wrapper (to put in a blank).
const innerMath = (text, opts) => {
  const n = tryParse(text, opts);
  return n ? MM(n).replace(/^<math[^>]*>/, '').replace(/<\/math>$/, '') : null;
};

export function mountLines(item, ctx, body) {
  const run = new LinesRun(item);
  const popts = () => parseOpts(run.cfg);
  const keysets = item.keys?.length ? item.keys : ['calcx', 'calcfn'];
  const canHint = !item.noHints && item.hints?.length > 0;

  const history = h('div.steps-history.lines-history');
  const stage = h('div.lines-stage');
  const hintBox = h('div.lines-hints');
  const tools = h('div.step-tools');
  const feedback = h('div.step-feedback');
  const footer = h('div.steps-footer');
  body.append(history, stage, tools, hintBox, feedback);

  let lockedUntil = 0;
  let input = null;
  let submit = () => {};
  let nextBlank = null;
  let hintShown = 0;
  let ruleAsked = false;
  let tapChoice = null;
  let tries = 0;

  const locked = () => Date.now() < lockedUntil;
  const say = (msg, kind = 'info') => { feedback.className = `step-feedback ${kind}`; feedback.innerHTML = msg; };
  const clearSay = () => { feedback.className = 'step-feedback'; feedback.innerHTML = ''; };
  const pauseForReading = () => {
    const words = feedback.textContent.trim().split(/\s+/).length;
    const ms = Math.min(4000, Math.max(1500, words * 120));
    lockedUntil = Date.now() + ms;
    feedback.classList.remove('pop');
    void feedback.offsetWidth;
    feedback.classList.add('pop');
    feedback.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
  };

  // Each judge shows its own lines (the logic judge writes formulas).
  const eqSign = () => signOf(run.cfg);
  const addLine = (node, cls, note = '', eq = true) => {
    history.appendChild(h(`div.step-line.${cls}`, eq ? h('span.eq', eqSign()) : null,
      html(showWith(run.cfg, node)), note ? h('span.step-note', note) : null));
    history.scrollTop = history.scrollHeight;
  };
  const addNote = (text, cls = '') => history.appendChild(h(`div.lines-note${cls ? `.${cls}` : ''}`, html(text)));
  addLine(run.prev, 'first', '', false);

  // ---------- tools ----------
  const hintBtn = canHint ? h('button.btn.small.ghost', { type: 'button', onclick: () => hint() }) : null;
  const copyBtn = h('button.btn.small.ghost', { type: 'button', onclick: () => input?.set(textWith(run.cfg, run.prev)) }, '⧉ Recopier la ligne');
  const paintTools = () => {
    tools.replaceChildren(...[item.mode !== 'guided' && run.seg === 0 ? copyBtn : null, hintBtn].filter(Boolean));
    if (hintBtn) {
      hintBtn.textContent = hintShown < item.hints.length ? `💡 Aide (${hintShown + 1}/${item.hints.length})` : '💡 Aide';
      hintBtn.disabled = hintShown >= item.hints.length;
    }
  };
  function hint() {
    if (hintShown >= item.hints.length) return;
    hintShown += 1;
    run.hintsUsed = hintShown;
    hintBox.replaceChildren(...item.hints.slice(0, hintShown).map((x) => h('div.lines-hint', html(x.html))));
    paintTools();
  }

  // ---------- tasks ----------
  function nextTask() {
    if (run.done) return finish();
    stage.replaceChildren();
    input = null;
    nextBlank = null;
    paintTools();
    const seg = run.segment;
    // Notes and decisions written before the next line are shown in every
    // mode (in free modes, those at the start of a part: the cursor only
    // moves on with them).
    let k = run.cursor;
    while (k < seg.lines.length && seg.lines[k].kind === 'note') { addNote(seg.lines[k].html); run.passScript(k); k++; }
    if (k < seg.lines.length && seg.lines[k].kind === 'decision') return decisionTask(seg.lines[k], k);
    if (item.mode === 'guided') {
      const next = run.nextScript();
      if (next && next.line.blanks?.length) return blanksTask(next);
    }
    if (item.mode === 'tap' && item.tapActions && !tapChoice && actionsFor(item.tapActions, run.prev, run.cfg).length) return actionTask();
    return freeTask();
  }

  function setFooter(...kids) {
    footer.replaceChildren(...kids.filter(Boolean));
  }

  // One free line: "= [input]", with a preview of how the line is read.
  function freeTask() {
    const ask = run.segment.ask;
    const prev = h('div.lines-preview');
    let preview;
    if (run.cfg.kind === 'logic') {
      // Formulas are built from the item's pieces and the logic symbols.
      const lex = lexFor(run.cfg);
      const pieces = [...new Set([...lex.texts.values()].map((t) => t.text))];
      input = new TokenInput({ pieces, onEnter: () => submit(), onChange: (v) => preview(v) });
      preview = () => {};
    } else {
      input = new MathInput({ keysets, placeholder: 'écris la ligne suivante', onEnter: () => submit(), onChange: (v) => preview(v) });
      preview = (v) => {
        let m = null;
        if (v) { try { m = showWith(run.cfg, readWith(run.cfg, v)); } catch { m = innerMath(v, popts()); m = m ? `<math>${m}</math>` : null; } }
        prev.innerHTML = m ?? '';
      };
    }
    stage.append(h('div.step-line.current', h('span.eq', ask || eqSign()), input.display), prev);
    submit = () => {
      if (!input.value || locked()) return;
      handle(run.submit(input.value, { guided: item.mode === 'guided' }));
    };
    setFooter(input.keypad(), h('button.btn.primary.wide', { onclick: () => submit() }, 'Valider la ligne'));
  }

  // A reference line with blanks: the keypad fills the active blank.
  function blanksTask({ line }) {
    const opts = popts();
    const template = parse(templateOf(line, opts), opts);
    const n = line.blanks.length;
    const values = Array(n).fill('');
    let active = 0;
    tries = 0;
    const box = h('div.step-line.current.lines-template');
    const paint = () => {
      const blanks = {};
      for (let i = 0; i < n; i++) blanks[i] = { html: values[i] ? innerMath(values[i], opts) ?? undefined : undefined, text: values[i], active: i === active };
      box.innerHTML = `<span class="eq">=</span>${toMathML(template, { blanks })}`;
      box.querySelectorAll('[data-blank]').forEach((el) => el.addEventListener('click', () => select(Number(el.dataset.blank))));
    };
    const select = (i) => { active = i; input.set(values[i]); paint(); };
    input = new MathInput({ keysets, placeholder: 'case active', onEnter: () => submit(), onChange: (v) => { values[active] = v; paint(); } });
    stage.append(box, h('div.lines-blank-input', h('small.muted', n > 1 ? 'Touche une case pour la remplir.' : 'Remplis la case.'), input.display));
    if (line.note) stage.prepend(h('div.step-label', line.note));
    paint();
    nextBlank = () => select((active + 1) % n);
    submit = () => {
      if (locked()) return;
      // Enter on a filled blank moves on to the next empty one.
      const empty = values.findIndex((v) => !v.trim());
      if (empty >= 0) {
        if (!values[active].trim()) input.flash();
        select(empty);
        return;
      }
      const v = run.submit(fillBlanks(line, values, opts), { guided: true });
      if (v.kind === 'wrong') {
        tries += 1;
        wrong(v, { follow: false });
        if (tries >= 2) {
          const r = run.reveal();
          if (r) {
            addLine(r.node, 'shown', line.note);
            say('<p>Voilà cette ligne. À toi pour la suite !</p>');
            afterAccept(r);
          }
        }
        return;
      }
      handle(v, line.note);
    };
    setFooter(input.keypad(), h('button.btn.primary.wide', { onclick: () => submit() }, 'Valider l\'étape'));
  }

  function decisionTask(line, index) {
    const list = h('div.choices.lines-choices');
    for (const o of line.options) {
      const b = h('button.choice', { type: 'button' }, o.label);
      b.addEventListener('click', () => {
        if (locked()) return;
        run.decide(line, o.id);
        if (o.valid && o.then) {
          play('tap');
          clearSay();
          addNote(`✔ ${o.label}`, 'decided');
          return thenTask(o, index);
        }
        if (o.valid) {
          play('good');
          clearSay();
          addNote(`✔ ${o.label}`, 'decided');
          run.passScript(index);
          nextTask();
        } else {
          play('bad');
          b.classList.add('wrong');
          b.disabled = true;
          say(`<p>${o.why || 'Ce n\'est pas la bonne règle ici.'}</p>`, 'bad');
          pauseForReading();
        }
      });
      list.appendChild(b);
    }
    stage.append(h('div.step-label', line.prompt), list);
    setFooter();
  }

  // The typed follow-up of a decision (§5.3 `then`): « t = … ».
  function thenTask(opt, index) {
    stage.replaceChildren();
    input = new MathInput({ keysets, placeholder: opt.then.ask, onEnter: () => submit() });
    stage.append(h('div.step-line.current', h('span.eq', opt.then.ask), input.display));
    submit = () => {
      if (!input.value || locked()) return;
      const r = run.answerThen(opt, input.value);
      if (r.kind === 'parse') { input.flash(); say(`<p>${r.message}</p>`); return; }
      if (r.kind === 'wrong') { play('bad'); say(`<p>${r.message}</p>`, 'bad'); return; }
      play('good');
      clearSay();
      addNote(`${opt.then.ask} ${input.value}`, 'decided');
      run.passScript(index);
      nextTask();
    };
    setFooter(input.keypad(), h('button.btn.primary.wide', { onclick: () => submit() }, 'Valider'));
  }

  // Tap mode: the action first, then the line.
  function actionTask() {
    const options = actionsFor(item.tapActions, run.prev, run.cfg);
    const list = h('div.choices.lines-choices');
    for (const o of options) {
      const b = h('button.choice', { type: 'button' }, o.label);
      b.addEventListener('click', () => {
        if (locked()) return;
        if (o.valid) {
          play('tap');
          clearSay();
          tapChoice = o;
          addNote(`→ ${o.label}`, 'decided');
          nextTask();
        } else {
          run.decide({ options }, o.id);
          play('bad');
          b.classList.add('wrong');
          b.disabled = true;
          say(`<p>${o.why}</p>`, 'bad');
          pauseForReading();
        }
      });
      list.appendChild(b);
    }
    stage.append(h('div.step-label', 'Que fais-tu maintenant ?'), list);
    setFooter();
  }

  // Self-explanation (§9.5): once, after the first line. No penalty.
  function ruleTask(line) {
    const list = h('div.choices.lines-choices');
    for (const o of line.options) {
      const b = h('button.choice', { type: 'button' }, o.label);
      b.addEventListener('click', () => {
        const right = line.options.find((x) => x.id === line.correct);
        if (o.id === line.correct) { play('good'); addNote(`✔ ${o.label}`, 'decided'); } else addNote(`La règle utilisée : ${right.label}`, 'decided');
        nextTask();
      });
      list.appendChild(b);
    }
    stage.replaceChildren(h('div.step-label', line.ask), list);
    setFooter();
  }

  // ---------- verdicts ----------
  function handle(v, note = '') {
    if (v.kind === 'parse') { input?.flash(); say(`<p>${v.message}</p>`); return; }
    if (v.kind === 'same' || v.kind === 'stay' || v.kind === 'form') { say(`<p>${v.message}</p>`, v.kind === 'stay' ? 'good' : 'info'); return; }
    if (v.kind === 'wrong') { wrong(v, { follow: item.followError }); return; }
    play('good');
    clearSay();
    addLine(v.node, 'ok', note || v.note || '');
    // A valid but poor decision (§5.3): its reason comes after the next line.
    if (v.later) say(`<p>${v.later}</p>`, 'info');
    tapChoice = null;
    tries = 0;
    afterAccept(v);
  }

  function afterAccept(v) {
    if (v.finished || run.done) return finish();
    if (v.segmentDone) addNote(run.segment.html || '', 'segment');
    const ruleLine = run.segment.lines.find((l) => l.kind === 'rule');
    if (ruleLine && !ruleAsked && item.mode !== 'guided') { ruleAsked = true; return ruleTask(ruleLine); }
    nextTask();
  }

  function wrong(v, { follow }) {
    play('bad');
    const why = v.rule ? explainRule(v.rule, v.diag) : `<p>${v.message || 'Cette ligne n\'est pas égale à la précédente.'}</p>`;
    say(why, 'bad');
    if (run.wrongHere >= 2 && canHint && hintShown < item.hints.length) feedback.insertAdjacentHTML('beforeend', '<p class="muted">Tu peux demander une aide.</p>');
    if (follow) {
      feedback.append(h('div.row.lines-follow',
        h('button.btn.small.ghost', { type: 'button', onclick: () => { clearSay(); lockedUntil = 0; } }, 'Corriger'),
        h('button.btn.small.secondary', { type: 'button', onclick: () => followLine() }, 'Continuer avec ma ligne')));
    }
    pauseForReading();
  }

  function followLine() {
    const node = run.lastWrong;
    const r = run.follow();
    if (!r) return;
    lockedUntil = 0;
    clearSay();
    addLine(node, 'followed', 'ta ligne');
    tapChoice = null;
    afterAccept(r);
  }

  function finish() {
    stage.replaceChildren();
    setFooter();
    const o = run.outcome();
    const common = { hintsUsed: o.hintsUsed, subgoals: o.subgoals, solo: o.solo };
    if (o.correct) { ctx.complete({ correct: true, ...common }); return; }
    const parts = [];
    if (o.rules.length) parts.push(explainRule(o.rules[o.rules.length - 1], o.diag));
    parts.push(solutionHtml(item.solution));
    ctx.complete({
      correct: false, rules: o.rules, ambiguous: o.ambiguous, ...common,
      answerHtml: item.answerHtml, explainHtml: parts.join(''),
      softWrong: run.mistakes === 0,
    });
  }

  nextTask();
  return {
    ownFlow: true,
    footer,
    onKey: (e) => {
      if (locked()) { e.preventDefault(); return; }
      if (e.key === 'Enter') { e.preventDefault(); submit(); return; }
      if (e.key === 'Tab' && nextBlank) { e.preventDefault(); nextBlank(); return; }
      input?.handleKey(e);
    },
  };
}
