// The lesson player: one question at a time, check, feedback, continue.

import { h, html, add, play, mascot, confirmBox } from '../dom.js';
import { mountExercise, M } from '../exercises.js';
import { figure } from '../figures.js';
import { Lesson } from '../../engine/session.js';
import { finishLesson, xpToday } from '../../engine/rewards.js';
import { makeRng } from '../../content/random.js';
import { SKILL_BY_ID } from '../../content/skills.js';
import { RULE_BY_ID } from '../../math/malrules.js';
import { solve } from '../../math/solver.js';
import { parse, print } from '../../math/expr.js';
import { starRow } from './common.js';

const PRAISE = ['Bravo !', 'Excellent !', 'Parfait !', 'Bien joué !', 'Super !', 'Exact !'];
const pick = (a) => a[Math.floor(Math.random() * a.length)];

export function eventNotes(events) {
  const notes = [];
  for (const e of events) {
    const s = SKILL_BY_ID[e.skill]?.title;
    if (e.type === 'levelUp') notes.push(`⬆️ ${s} : niveau ${e.level}`);
    if (e.type === 'levelDown') notes.push(`⬇️ ${s} : on revient au niveau ${e.level}`);
    if (e.type === 'mastered') notes.push(`👑 ${s} maîtrisé !`);
    if (e.type === 'repair') notes.push(`🧱 On consolide d'abord : ${SKILL_BY_ID[e.target].title}`);
    if (e.type === 'repairDone') notes.push(`✅ ${SKILL_BY_ID[e.target].title} consolidé, on reprend !`);
    if (e.type === 'trapNew') notes.push(`🪤 Nouveau piège repéré : ${RULE_BY_ID[e.rule].name}`);
    if (e.type === 'trapCleared') notes.push(`🎉 Piège déjoué : ${RULE_BY_ID[e.rule].name}`);
    if (e.type === 'skipAhead') notes.push(`⏩ Tu maîtrises déjà : on passe à ${s}`);
  }
  return notes;
}

export function lessonScreen(root, args, app) {
  const p = app.profile;
  const lesson = new Lesson(p, args, makeRng());
  const bar = h('div.progress', h('div.progress-fill'));
  const combo = h('div.combo');
  const top = h('header.lesson-top',
    h('button.close', { onclick: quit, 'aria-label': 'Quitter' }, '✕'), bar, combo);
  const body = h('main.lesson-body');
  const foot = h('footer.lesson-foot');
  const panel = h('div.feedback');
  root.append(top, body, foot, panel);

  let item = null;
  let ctrl = null;
  let t0 = 0;
  let checkBtn = null;
  let phase = 'answer'; // answer | feedback
  let canContinue = true; // false while a mistake's correction must stay on screen

  async function quit() {
    if (lesson.done === 0 || await confirmBox('Quitter la leçon ? Tes réponses comptent, mais tu ne gagnes pas les XP de fin.', 'Quitter')) {
      app.save();
      app.go('home');
    }
  }

  function setProgress() {
    bar.firstChild.style.width = `${Math.round(lesson.progress * 100)}%`;
    combo.textContent = lesson.combo >= 3 ? `🔥 ${lesson.combo}` : '';
  }

  function next() {
    phase = 'answer';
    panel.className = 'feedback';
    panel.innerHTML = '';
    item = lesson.next();
    setProgress();
    if (!item) return done();
    body.innerHTML = '';
    foot.innerHTML = '';
    window.__hopingoItem = item; // debug hook for automated checks
    if (item.type === 'intro') return showIntro();
    if (item.retry) body.append(h('div.retry-tag', '↻ On réessaie'));
    if (item.trap) body.append(h('div.retry-tag.trap', `🪤 Attention au piège : ${RULE_BY_ID[item.trap].name}`));
    if (item.introTry) body.append(h('div.retry-tag.try', 'À toi !'));
    const ctx = {
      ready: (ok) => { if (checkBtn) checkBtn.disabled = !ok; },
      submit: () => check(),
      complete: (outcome) => outcomeShown(outcome),
    };
    ctrl = mountExercise(item, ctx);
    body.append(ctrl.el);
    if (ctrl.footer) foot.append(ctrl.footer);
    if (!ctrl.ownFlow) {
      checkBtn = h('button.btn.primary.wide', { disabled: true, onclick: check }, 'Vérifier');
      foot.append(checkBtn);
    } else checkBtn = null;
    t0 = performance.now();
  }

  function showIntro() {
    const def = item.def;
    const card = h('div.intro-card',
      h('div.intro-head', mascot('happy', 64), h('div', h('small', 'Nouvelle notion'), h('h2', def.title))),
      h('div.intro-rule', html(def.intro.rule)),
      def.intro.figure ? figure(def.intro.figure) : null);
    if (def.intro.example) {
      card.append(h('div.intro-example', def.intro.example.map((e) => h('div.sol-line', html(M(e.math)), h('span.sol-note', e.note)))));
    }
    if (def.intro.solve) {
      const lines = solve(parse(def.intro.solve), def.intro.solveOpts);
      card.append(h('div.intro-example',
        h('div.sol-line', html(M(def.intro.solve))),
        lines.map((l) => h('div.sol-line', h('span.eq', '='), html(M(print(l.node))), h('span.sol-note', l.label)))));
    }
    body.append(card);
    foot.append(h('button.btn.primary.wide', { onclick: () => { lesson.answer(item, {}); next(); } }, 'À toi !'));
    phase = 'intro';
  }

  function check() {
    if (phase !== 'answer' || !ctrl || ctrl.ownFlow) return;
    const outcome = ctrl.check();
    if (!outcome) return;
    if (outcome.stayOpen) {
      flashMessage(outcome.message);
      return;
    }
    outcomeShown(outcome);
  }

  function flashMessage(msg) {
    let m = body.querySelector('.inline-msg');
    if (!m) { m = h('div.inline-msg'); body.append(m); }
    m.textContent = msg;
    m.classList.remove('pop');
    void m.offsetWidth;
    m.classList.add('pop');
  }

  function outcomeShown(outcome) {
    if (phase !== 'answer') return;
    phase = 'feedback';
    const rtSec = (performance.now() - t0) / 1000;
    const res = lesson.answer(item, {
      correct: outcome.correct, rtSec, rules: outcome.rules || [], ambiguous: outcome.ambiguous || 1, ops: outcome.ops,
    });
    app.save();
    setProgress();
    play(outcome.correct ? 'good' : 'bad');
    if (res.events.some((e) => e.type === 'levelUp' || e.type === 'mastered')) setTimeout(() => play('level'), 300);
    const notes = eventNotes(res.events);
    const wrong = !outcome.correct;
    // Fast series: a right fact moves straight on, no panel to dismiss.
    // Events (level up…) are still shown in the end-of-lesson summary.
    if (!wrong && item.type === 'fact') {
      canContinue = false;
      body.classList.add('flash-good');
      setTimeout(() => { body.classList.remove('flash-good'); canContinue = true; next(); }, 350);
      return;
    }
    panel.className = `feedback show ${wrong ? 'bad big' : 'good'}`;
    panel.innerHTML = '';
    panel.scrollTop = 0;
    const cont = h(`button.btn.wide.${wrong ? 'danger' : 'success'}`, { onclick: () => { if (canContinue) next(); } }, 'Continuer');
    add(panel,
      h('div.fb-head',
        h('span.fb-icon', wrong ? '✖' : '✔'),
        h('h3', wrong ? (outcome.softWrong ? 'Avec un coup de pouce' : 'Pas tout à fait') : pick(PRAISE)),
        res.xp ? h('span.fb-xp', `+${res.xp} XP`) : null),
      wrong && outcome.answerHtml ? h('div.fb-answer', h('small', 'Bonne réponse'), html(outcome.answerHtml)) : null,
      wrong && outcome.explainHtml ? h('div.fb-explain', html(outcome.explainHtml)) : null,
      notes.length ? h('ul.fb-notes', notes.map((n) => h('li', n))) : null,
      cont);
    foot.querySelectorAll('button').forEach((b) => { if (b !== checkBtn) b.disabled = true; });
    if (checkBtn) checkBtn.style.visibility = 'hidden';
    if (wrong) holdCorrection(cont);
    else { canContinue = true; cont.focus({ preventScroll: true }); }
  }

  // After a mistake, the correction stays on screen long enough to be read:
  // the button fills up and only works once full.
  function holdCorrection(cont) {
    const words = panel.textContent.trim().split(/\s+/).length;
    const ms = Math.min(10000, Math.max(3500, 2000 + words * 200));
    canContinue = false;
    cont.disabled = true;
    cont.classList.add('waiting');
    cont.style.setProperty('--wait', `${ms}ms`);
    cont.textContent = 'Lis la correction…';
    setTimeout(() => {
      if (!cont.isConnected) return;
      canContinue = true;
      cont.disabled = false;
      cont.classList.remove('waiting');
      cont.textContent = 'Continuer';
      cont.focus({ preventScroll: true });
    }, ms);
  }

  function done() {
    const summary = lesson.finish();
    const before = xpToday(p);
    const res = finishLesson(p, summary);
    app.save();
    play('done');
    body.innerHTML = '';
    foot.innerHTML = '';
    top.style.visibility = 'hidden';
    const crowns = summary.events.filter((e) => e.type === 'mastered');
    const notes = eventNotes(summary.events.filter((e) => ['mastered', 'trapNew', 'trapCleared', 'repair', 'repairDone', 'skipAhead'].includes(e.type)));
    const mins = Math.floor(summary.seconds / 60);
    const secs = summary.seconds % 60;
    body.append(h('div.done',
      mascot(summary.accuracy >= 0.7 ? 'happy' : 'think', 120),
      h('h1', summary.perfect ? 'Leçon parfaite !' : 'Leçon terminée !'),
      h('div.done-stats',
        h('div.tile.xp', h('small', 'XP'), h('b', `+${summary.xp}`)),
        h('div.tile.acc', h('small', 'Réussite'), h('b', `${Math.round(summary.accuracy * 100)} %`)),
        h('div.tile.time', h('small', 'Temps'), h('b', `${mins}:${String(secs).padStart(2, '0')}`))),
      crowns.length ? h('div.crowns', crowns.map((c) => h('div.crown', '👑', h('span', SKILL_BY_ID[c.skill].title), starRow(3)))) : null,
      notes.length ? h('ul.fb-notes', notes.map((n) => h('li', n))) : null,
      res.goalReached ? h('p.goal-done', `🎯 Objectif du jour atteint : ${xpToday(p)} / ${p.dailyGoal} XP`) : h('p.muted', `Aujourd'hui : ${before + summary.xp} / ${p.dailyGoal} XP`),
      res.streakEvent?.type === 'streak' && res.streakEvent.count > 0 ? h('p.streak-up', `🔥 Série : ${res.streakEvent.count} jour${res.streakEvent.count > 1 ? 's' : ''}`) : null,
      res.streakEvent?.type === 'freezeEarned' ? h('p.streak-up', `❄️ Tu gagnes un gel de série (${p.streak.count} jours d'affilée !)`) : null,
      res.streakEvent?.type === 'freezeUsed' ? h('p.streak-up', '❄️ Un gel a protégé ta série.') : null,
      res.newBadges.length ? h('div.badges-new', res.newBadges.map((b) => h('div.badge-card', h('span.badge-icon', b.icon), h('b', b.name), h('small', b.desc)))) : null));
    foot.append(h('button.btn.primary.wide', { onclick: () => app.go('home') }, 'Continuer'));
  }

  const onKey = (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (phase === 'feedback' && e.key === 'Enter') { e.preventDefault(); if (canContinue) next(); return; }
    if (phase === 'intro' && e.key === 'Enter') { e.preventDefault(); lesson.answer(item, {}); next(); return; }
    if (phase !== 'answer' || !ctrl) return;
    if (e.key === 'Enter' && !ctrl.ownFlow) { e.preventDefault(); check(); return; }
    // Enter must not also activate the feedback button that takes focus.
    if (e.key === 'Enter') e.preventDefault();
    ctrl.onKey?.(e);
  };
  document.addEventListener('keydown', onKey);
  next();
  return () => document.removeEventListener('keydown', onKey);
}
