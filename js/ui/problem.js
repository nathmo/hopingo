// Mount of `problem` items (spec §6, §9.6; step U4): a long problem in
// parts, without hints, scored step by step. Above the work, the barème:
// each step with its points, the current one marked. Each part is drawn by
// the mount of its own type (lines, mcq, tf…). After every action the run
// is saved through ctx.save(pending) (profile.pending), so that the problem
// can be resumed after the app is closed: item.resumeLog replays it.
// « Je passe cette étape » gives up the current step (no points) and goes on.

import { h, html, play } from './dom.js';
import { mountLines } from './lines.js';
import { ProblemRun, resumeRun, pendingOf } from '../judges/problem.js';
import { solutionHtml } from './exercises.js';

const fr = (x) => String(x).replace('.', ',');
const pts = (x) => `${fr(x)} pt${x > 1 ? 's' : ''}`;

export function mountProblem(item, ctx, body, mountPart) {
  const run = item.resumeLog ? resumeRun({ item, log: item.resumeLog }) : new ProblemRun(item);
  const board = h('div.problem-board');
  const partBox = h('div.problem-part');
  const tools = h('div.step-tools.problem-tools');
  const footer = h('div.steps-footer');
  body.append(board, partBox, tools);
  let ctrl = null;
  let shownPart = -1;
  let checkBtn = null;

  const save = () => ctx.save?.(pendingOf(run));

  function paintBoard() {
    const sc = run.score();
    const rows = [];
    item.parts.forEach((p, i) => {
      const steps = sc.parts[i].steps;
      steps.forEach((st, s) => {
        const lr = run.runs[i];
        const current = i === run.part && (!lr || lr.seg === s) && !run.done;
        const finished = i < run.part || run.done || (lr && (lr.done || s < lr.seg));
        const state = !finished ? (current ? '▶' : '·') : st.got === st.max ? '✔' : '✖';
        const title = item.titles?.[i]?.[s] ?? `Étape ${s + 1}`;
        rows.push(h(`div.problem-step${current ? '.current' : ''}${finished ? (st.got === st.max ? '.right' : '.missed') : ''}`,
          h('span.problem-mark', state), h('span.problem-title', html(title)),
          h('span.problem-points', finished ? `${fr(st.got)} / ${pts(st.max)}` : pts(st.max))));
      });
    });
    board.replaceChildren(h('div.problem-head', h('b', 'Barème'), h('span', `${fr(sc.got)} / ${pts(sc.max)}`)), ...rows);
  }

  function onChange() {
    paintBoard();
    save();
    if (run.part !== shownPart && !run.done) setTimeout(showPart, 600);
  }
  run.onChange = onChange;

  // The current part, drawn by its own mount.
  function showPart() {
    if (run.done) return finish();
    shownPart = run.part;
    const part = run.current;
    partBox.replaceChildren();
    footer.replaceChildren();
    checkBtn = null;
    const el = h('div.exercise.problem-sub');
    if (part.prompt) el.append(h('div.prompt', html(part.prompt)));
    const sub = {
      ready: (ok) => { if (checkBtn) checkBtn.disabled = !ok; },
      submit: () => check(),
      complete: () => { /* lines parts: the run moves on by itself */ },
    };
    if (part.type === 'lines') {
      ctrl = mountLines(part, sub, el, { run: run.linesRun });
    } else {
      ctrl = mountPart(part, {
        ...sub,
        complete: (outcome) => answered(outcome),
      }, el);
      if (!ctrl.ownFlow) {
        checkBtn = h('button.btn.primary.wide', { disabled: true, onclick: () => check() }, 'Vérifier');
      }
    }
    partBox.append(el);
    footer.replaceChildren(...[ctrl.footer, checkBtn].filter(Boolean));
    paintTools();
  }

  function paintTools() {
    tools.replaceChildren(h('button.btn.small.ghost', { type: 'button', onclick: () => skip() }, 'Je passe cette étape'));
  }

  function check() {
    if (!ctrl?.check) return;
    const outcome = ctrl.check();
    if (!outcome || outcome.stayOpen) return;
    answered(outcome);
  }

  function answered(outcome) {
    play(outcome.correct ? 'good' : 'bad');
    if (!outcome.correct && outcome.answerHtml) partBox.append(h('div.fb-answer', h('small', 'Bonne réponse'), html(outcome.answerHtml)));
    run.answer(outcome);
  }

  function skip() {
    if (run.done) return;
    play('tap');
    const before = run.part;
    run.skip();
    // A lines part draws its next step again from the run.
    if (run.part === before && !run.done) showPart();
  }

  function finish() {
    partBox.replaceChildren();
    footer.replaceChildren();
    tools.replaceChildren();
    const o = run.outcome();
    const sc = run.score();
    const explain = `<p><b>Score : ${fr(sc.got)} / ${pts(sc.max)}</b></p>${solutionHtml(item.solution)}`;
    ctx.complete({
      ...o,
      answerHtml: o.correct ? '' : `${fr(sc.got)} / ${pts(sc.max)}`,
      explainHtml: o.correct ? '' : explain,
      softWrong: sc.got > 0,
    });
  }

  paintBoard();
  showPart();
  return {
    ownFlow: true,
    footer,
    onKey: (e) => ctrl?.onKey?.(e),
  };
}
