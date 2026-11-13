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
import { t } from '../i18n.js';
import { MathInput } from './keypad.js';
import { TokenInput } from './tokens.js';
import { explainRule, solutionHtml } from './exercises.js';
import { LinesRun, templateOf, fillBlanks, blankRanges } from '../judges/lines.js';
import { keysForItem } from './keys-needed.js';
import { LoggedLinesRun, isLongLines, pendingOf, resumeRun } from '../judges/problem.js';
import { actionsFor } from '../judges/actions.js';
import { parseOpts } from '../judges/common.js';
import { readWith, showWith, textWith, signOf } from '../judges/index.js';
import { parse, tryParse } from '../cas/parse.js';
import { toMathML } from '../cas/mathml.js';
import { unparen } from '../cas/ast.js';
import { lexFor } from '../cas/logic.js';
// Step U3: the grid of the matrix judges.
import { MatrixInput, matrixShape } from './matrix-input.js';
import { judgeFor } from '../judges/index.js';
// Step U7: interpretation and simulation of module P.
import { interpretTask, simulateBox } from './interpret.js';
import { interpretOf, withInterpretation } from '../judges/interpret.js';

// Step U6: decision labels and prompts may hold markup (MathML, <b>, <sub>).
const rich = (s) => (/<(math|b|i|sub|sup|br|span)\b/.test(String(s)) ? html(s) : s);

const MM = (node, opts) => toMathML(unparen(node), opts);
// The MathML of a typed text, without the <math> wrapper (to put in a blank).
const innerMath = (text, opts) => {
  const n = tryParse(text, opts);
  return n ? MM(n).replace(/^<math[^>]*>/, '').replace(/<\/math>$/, '') : null;
};

// opts.run: a run already made (a part of a problem, or a resumed item: its
// lines so far are drawn again). A long item (§9.6) saves itself after each
// action through ctx.save(pending) when the screen gives ctx.save.
export function mountLines(item, ctx, body, opts = {}) {
  let run = opts.run || null;
  if (!run && item.resumeLog) run = resumeRun({ item, log: item.resumeLog });
  if (!run && isLongLines(item) && ctx.save) run = new LoggedLinesRun(item);
  if (!run) run = new LinesRun(item);
  if (!opts.run && run instanceof LoggedLinesRun && ctx.save) run.onChange = () => ctx.save(pendingOf(run));
  const popts = () => parseOpts(run.cfg);
  // The item's keypads, the small keypads its lines need, and a « + » tab
  // with what is still missing (js/ui/keys-needed.js).
  const keysets = keysForItem(item);
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
  const addLine = (node, cls, note = '', eq = true, cfg = run.cfg) => {
    history.appendChild(h(`div.step-line.${cls}`, eq ? h('span.eq', signOf(cfg)) : null,
      html(showWith(cfg, node)), note ? h('span.step-note', rich(note)) : null));
    history.scrollTop = history.scrollHeight;
  };
  // The judge of the last line the run kept: once a part is finished, run.cfg
  // is already the judge of the next part, which cannot show that line.
  const keptCfg = () => {
    const e = run.history.findLast((x) => x.how !== 'start');
    return e ? run.segments[e.seg].judge : run.cfg;
  };
  const addNote = (text, cls = '') => history.appendChild(h(`div.lines-note${cls ? `.${cls}` : ''}`, html(text)));
  // The lines so far (a resumed run), else the first line.
  if (run.history.length > 1 || run.seg > 0) {
    run.history.forEach((e, i) => {
      if (e.how === 'start') {
        if (i > 0) addNote(run.segments[e.seg].html || '', 'segment');
        else addLine(e.node, 'first', '', false, run.segments[0].judge);
      } else addLine(e.node, e.how === 'ok' ? 'ok' : e.how, e.how === 'followed' ? t('ta ligne') : '', true, run.segments[e.seg].judge);
    });
  } else addLine(run.prev, 'first', '', false);

  // ---------- tools ----------
  const hintBtn = canHint ? h('button.btn.small.ghost', { type: 'button', onclick: () => hint() }) : null;
  const copyBtn = h('button.btn.small.ghost', { type: 'button', onclick: () => input?.set(textWith(run.cfg, run.prev)) }, t('⧉ Recopier la ligne'));
  const paintTools = () => {
    tools.replaceChildren(...[item.mode !== 'guided' && run.seg === 0 ? copyBtn : null, hintBtn].filter(Boolean));
    if (hintBtn) {
      hintBtn.textContent = hintShown < item.hints.length ? t('💡 Aide ({k}/{n})', { k: hintShown + 1, n: item.hints.length }) : t('💡 Aide');
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
      if (next && next.line.cells?.length && isGrid()) return gridBlanksTask(next);
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
    if (isGrid()) {
      // Matrix judges (step U3): a text field and a grid.
      const ref = run.nextScript()?.line.math;
      input = new MatrixInput({
        shape: matrixShape(run.cfg, ref, run.prev), prev: run.prev, cfg: run.cfg,
        ops: run.cfg.kind === 'rowops', apply: item.mode === 'tap',
        onEnter: () => submit(), onChange: (v) => preview(v),
      });
      preview = (v) => {
        let m = null;
        if (v) { try { m = showWith(run.cfg, readWith(run.cfg, v)); } catch { m = null; } }
        prev.innerHTML = m ?? '';
      };
    } else if (run.cfg.kind === 'logic') {
      // Formulas are built from the item's pieces and the logic symbols.
      const lex = lexFor(run.cfg);
      const pieces = [...new Set([...lex.texts.values()].map((t) => t.text))];
      input = new TokenInput({ pieces, onEnter: () => submit(), onChange: (v) => preview(v) });
      preview = () => {};
    } else {
      input = new MathInput({ keysets, placeholder: t('écris la ligne suivante'), onEnter: () => submit(), onChange: (v) => preview(v) });
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
    setFooter(input.keypad(), h('button.btn.primary.wide', { onclick: () => submit() }, t('Valider la ligne')));
  }

  // Step U3: a judge whose lines are matrices is written in a grid.
  function isGrid() { return judgeFor(run.cfg).input === 'matrix'; }

  // A guided matrix line: the reference line, its blank cells to fill.
  function gridBlanksTask({ line }) {
    tries = 0;
    input = new MatrixInput({ cfg: run.cfg, prev: run.prev, onEnter: () => submit() });
    if (!input.guided(line.math, line.cells)) return freeTask();
    if (line.note) stage.append(h('div.step-label', rich(line.note)));
    stage.append(h('div.step-line.current', h('span.eq', eqSign()), input.display));
    const grid = input;
    setTimeout(() => grid.focus?.(), 0);
    submit = () => {
      if (locked()) return;
      const v = run.submit(input.value, { guided: true });
      if (v.kind === 'wrong') {
        tries += 1;
        wrong(v, { follow: false });
        if (tries >= 2) {
          const r = run.reveal();
          if (r) { addLine(r.node, 'shown', line.note, true, keptCfg()); say(t('<p>Voilà cette ligne. À toi pour la suite !</p>')); afterAccept(r); }
        }
        return;
      }
      handle(v, line.note);
    };
    setFooter(h('button.btn.primary.wide', { onclick: () => submit() }, t('Valider l\'étape')));
  }

  // A reference line with blanks: the keypad fills the active blank.
  function blanksTask({ line }) {
    const opts = popts();
    // A judge with its own line language draws its template (step U5).
    const own = judgeFor(run.cfg).templateML;
    const template = own ? null : parse(templateOf(line, opts), opts);
    const n = blankRanges(line).length;
    const values = Array(n).fill('');
    let active = 0;
    tries = 0;
    const box = h('div.step-line.current.lines-template');
    const paint = () => {
      const blanks = {};
      for (let i = 0; i < n; i++) blanks[i] = { html: values[i] ? innerMath(values[i], opts) ?? undefined : undefined, text: values[i], active: i === active };
      box.innerHTML = `<span class="eq">${own ? eqSign() : '='}</span>${own ? own(run.cfg, templateOf(line, opts), blanks) : toMathML(template, { blanks })}`;
      box.querySelectorAll('[data-blank]').forEach((el) => el.addEventListener('click', () => select(Number(el.dataset.blank))));
    };
    const select = (i) => { active = i; input.set(values[i]); paint(); };
    input = new MathInput({ keysets, placeholder: t('case active'), onEnter: () => submit(), onChange: (v) => { values[active] = v; paint(); } });
    stage.append(box, h('div.lines-blank-input', h('small.muted', n > 1 ? t('Touche une case pour la remplir.') : t('Remplis la case.')), input.display));
    if (line.note) stage.prepend(h('div.step-label', rich(line.note)));
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
            addLine(r.node, 'shown', line.note, true, keptCfg());
            say(t('<p>Voilà cette ligne. À toi pour la suite !</p>'));
            afterAccept(r);
          }
        }
        return;
      }
      handle(v, line.note);
    };
    setFooter(input.keypad(), h('button.btn.primary.wide', { onclick: () => submit() }, t('Valider l\'étape')));
  }

  function decisionTask(line, index) {
    const list = h('div.choices.lines-choices');
    for (const o of line.options) {
      const b = h('button.choice', { type: 'button' }, rich(o.label));
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
          say(`<p>${o.why || t('Ce n\'est pas la bonne règle ici.')}</p>`, 'bad');
          pauseForReading();
        }
      });
      list.appendChild(b);
    }
    stage.append(h('div.step-label', rich(line.prompt)), list);
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
    setFooter(input.keypad(), h('button.btn.primary.wide', { onclick: () => submit() }, t('Valider')));
  }

  // Tap mode: the action first, then the line.
  function actionTask() {
    const options = actionsFor(item.tapActions, run.prev, run.cfg);
    const list = h('div.choices.lines-choices');
    for (const o of options) {
      const b = h('button.choice', { type: 'button' }, rich(o.label));
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
    stage.append(h('div.step-label', t('Que fais-tu maintenant ?')), list);
    setFooter();
  }

  // Self-explanation (§9.5): once, after the first line. No penalty.
  function ruleTask(line) {
    const list = h('div.choices.lines-choices');
    for (const o of line.options) {
      const b = h('button.choice', { type: 'button' }, rich(o.label));
      b.addEventListener('click', () => {
        const right = line.options.find((x) => x.id === line.correct);
        if (o.id === line.correct) { play('good'); addNote(`✔ ${o.label}`, 'decided'); } else addNote(t('La règle utilisée : {rule}', { rule: right.label }), 'decided');
        nextTask();
      });
      list.appendChild(b);
    }
    stage.replaceChildren(h('div.step-label', rich(line.ask)), list);
    setFooter();
  }

  // ---------- verdicts ----------
  function handle(v, note = '') {
    if (v.kind === 'parse') { input?.flash(); say(`<p>${v.message}</p>`); return; }
    if (v.kind === 'same' || v.kind === 'stay' || v.kind === 'form') { say(`<p>${v.message}</p>`, v.kind === 'stay' ? 'good' : 'info'); return; }
    if (v.kind === 'wrong') { wrong(v, { follow: item.followError }); return; }
    play('good');
    clearSay();
    addLine(v.node, 'ok', note || v.note || '', true, keptCfg());
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
    const why = v.rule ? explainRule(v.rule, v.diag) : `<p>${v.message || t('Cette ligne n\'est pas égale à la précédente.')}</p>`;
    say(why, 'bad');
    if (run.wrongHere >= 2 && canHint && hintShown < item.hints.length) feedback.insertAdjacentHTML('beforeend', t('<p class="muted">Tu peux demander une aide.</p>'));
    if (follow) {
      feedback.append(h('div.row.lines-follow',
        h('button.btn.small.ghost', { type: 'button', onclick: () => { clearSay(); lockedUntil = 0; } }, t('Corriger')),
        h('button.btn.small.secondary', { type: 'button', onclick: () => followLine() }, t('Continuer avec ma ligne'))));
    }
    pauseForReading();
  }

  function followLine() {
    const node = run.lastWrong;
    const r = run.follow();
    if (!r) return;
    lockedUntil = 0;
    clearSay();
    addLine(node, 'followed', t('ta ligne'), true, keptCfg());
    tapChoice = null;
    afterAccept(r);
  }

  // Step U7: « Interpréter » after the last line, then the simulation
  // button (js/ui/interpret.js). Not in a problem: its parts ask their own.
  let interpreted = null;
  function finish() {
    if (interpretOf(item) && !opts.run && !interpreted) return interpretTask(item, stage, setFooter, (r) => { interpreted = r; finish(); });
    stage.replaceChildren();
    setFooter();
    if (item.simulate && !opts.run) stage.append(simulateBox(item));
    const o = withInterpretation(run.outcome(), interpreted);
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

  if (run.done) finish(); else nextTask();
  return {
    ownFlow: true,
    run,
    footer,
    onKey: (e) => {
      if (locked()) { e.preventDefault(); return; }
      if (e.key === 'Enter') { e.preventDefault(); submit(); return; }
      if (e.key === 'Tab' && nextBlank) { e.preventDefault(); nextBlank(); return; }
      input?.handleKey(e);
    },
  };
}
