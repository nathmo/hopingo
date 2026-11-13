// The exam screen (spec §10.2, step U3): a mock exam of a blueprint, with
// a visible timer (the only clock of the app), no hints and no correction
// until the end, questions to skip and to flag, then the report: estimated
// grade, verdict, prediction against the real score, skills to rework,
// traps, and the corrections. The run is saved in the profile after each
// answer, so a reload resumes it. An open question is a `problem` item
// (step U4), mounted as in a lesson: its response is the run's log.

import { h, html, play, sheet, add, clear } from '../dom.js';
import { EXAM_BY_ID } from '../../content/uni/exams.js';
import { SKILL_BY_ID } from '../../content/skills.js';
import { RULE_BY_ID } from '../../math/malrules.js';
import { startRun, answerRun, finishRun, timeLeft, maxScore, verdictOf } from '../../engine/exam.js';
import { makeRng } from '../../content/random.js';
import { explainRule, solutionHtml, mountExercise } from '../exercises.js';
import { topBar } from './common.js';
import { t, tn, LANG } from '../../i18n.js';

// A number as written in the interface: decimal comma in French.
const fr = (x) => (LANG === 'fr' ? String(x).replace('.', ',') : String(x)).replace('-', '−');
const clock = (ms) => {
  const s = Math.ceil(ms / 1000);
  const hh = Math.floor(s / 3600);
  const mm = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  return `${hh ? `${hh}:` : ''}${String(mm).padStart(hh ? 2 : 1, '0')}:${String(ss).padStart(2, '0')}`;
};
const scoringText = (sc, kind) => {
  if (sc.byStep) return t('points du barème, notés par étape');
  if (kind === 'open') return t('{n} points, notés par étape', { n: fr(sc.right) });
  return sc.perRight ? t('plusieurs réponses : +1/N par bonne case, −1/M par mauvaise, plancher 0') : t('{right} juste, {blank} vide, {wrong} faux', { right: fr(sc.right), blank: fr(sc.blank ?? 0), wrong: fr(sc.wrong) });
};
const KIND = { mcq: t('QCM'), tf: t('Vrai ou faux'), coef: t('Réponse courte'), open: t('Problème') };
const date = (ms) => new Date(ms).toLocaleDateString(LANG === 'fr' ? 'fr-CH' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
// The title of an exam in the current language (a saved run keeps the one it was started with).
const titleOf = (exam) => EXAM_BY_ID[exam.id]?.title ?? exam.title;

export function examScreen(root, args, app) {
  const p = app.profile;
  const bp = EXAM_BY_ID[args.id] ?? (p.examRun ? EXAM_BY_ID[p.examRun.exam.id] : null);
  let timer = null;
  let cleanupKey = null;
  const stop = () => { if (timer) clearInterval(timer); timer = null; };
  const main = h('main.exam');
  root.append(topBar(app), main);
  if (!bp) { main.append(h('p', t('Cet examen n\'existe pas.')), h('button.btn.primary', { onclick: () => app.go('home') }, t('Retour'))); return stop; }

  if (args.show === 'result' && p.lastExam?.exam.id === bp.id) showResult(p.lastExam);
  else if (p.examRun && p.examRun.exam.id === bp.id && timeLeft(p.examRun) > 0) showIntro(true);
  else if (p.examRun && p.examRun.exam.id === bp.id) { const r = finishRun(p); app.save(); showResult({ ...p.lastExam, result: r.result }); } else showIntro(false);

  // ---------- before ----------
  function showIntro(resume) {
    stop();
    const past = (p.exams || []).filter((e) => e.id === bp.id).slice(-5).reverse();
    add(clear(main),
      h('h1', t('📝 Examen blanc : {title}', { title: bp.title })),
      h('div.exam-info',
        h('p', `${t('Durée : {n} minutes.', { n: bp.durationMin })} ${bp.documents === 'none' ? t('Sans document, sans calculatrice.') : t('Formulaire autorisé.')}`),
        h('ul', bp.sections.map((s) => h('li', `${s.count} ${KIND[s.kind]} (${scoringText(s.scoring, s.kind)})`))),
        h('p.muted', t('Pas d\'aide ni de correction avant la fin. Tu peux sauter une question, la marquer, et revenir. Une réponse vide vaut 0 ; une réponse fausse peut coûter des points.')),
        h('p.muted', `${t('Note estimée à la fin : 1 + 5 × score / maximum.')} ${bp.source ?? ''}`)),
      resume
        ? h('button.btn.primary.wide', { onclick: () => run() }, t('Reprendre (il reste {time})', { time: clock(timeLeft(p.examRun)) }))
        : h('button.btn.primary.wide', { onclick: () => { startRun(p, bp, { rng: makeRng(Date.now() % 2147483647) }); app.save(); run(); } }, t('Commencer l\'examen')),
      past.length ? h('div.exam-history', h('h3', t('Tes examens blancs')), h('ul', past.map((e) => h('li', e.predicted !== undefined
        ? t('{date} : note {grade} ({score} / {max} points), prédite {predicted}', { date: date(e.at), grade: fr(e.grade), score: fr(e.score), max: e.max, predicted: fr(e.predicted) })
        : t('{date} : note {grade} ({score} / {max} points)', { date: date(e.at), grade: fr(e.grade), score: fr(e.score), max: e.max }))))) : null,
      h('button.btn.ghost', { onclick: () => app.go('home') }, t('Retour au chemin')));
  }

  // ---------- during ----------
  function run() {
    const st = p.examRun;
    const { exam } = st;
    let cur = Math.max(0, st.responses.findIndex((x) => x === null));
    let shownAt = Date.now();
    const timeEl = h('span.exam-timer');
    const nav = h('div.exam-nav');
    const card = h('div.exam-card');
    const foot = h('div.exam-foot');
    let qctrl = null; // the mount of an open problem, for its keys
    main.replaceChildren(h('div.exam-head', h('b', titleOf(exam)), timeEl), nav, card, foot);

    const tick = () => {
      const left = timeLeft(st);
      timeEl.textContent = `⏱ ${clock(left)}`;
      timeEl.classList.toggle('low', left < 10 * 60 * 1000);
      if (left <= 0) { finish(true); }
    };
    const keepTime = () => {
      st.times[cur] = (st.times[cur] || 0) + (Date.now() - shownAt);
      shownAt = Date.now();
    };
    const save = () => { keepTime(); app.save(); };

    function paintNav() {
      nav.replaceChildren(...exam.questions.map((q, i) => h(`button.exam-dot${st.responses[i] !== null ? '.answered' : ''}${st.flags[i] ? '.flagged' : ''}${i === cur ? '.current' : ''}`,
        { type: 'button', onclick: () => go(i), title: `Question ${i + 1}` }, String(i + 1))));
    }

    function go(i) { keepTime(); cur = Math.min(exam.questions.length - 1, Math.max(0, i)); paint(); }

    function choose(value) {
      const multi = exam.questions[cur].item.multi;
      if (multi) {
        // Several boxes may be ticked (§16.3): the answer is a list.
        const set = new Set(st.responses[cur] || []);
        if (set.has(value)) set.delete(value); else set.add(value);
        st.responses[cur] = set.size ? [...set].sort((a, b) => a - b) : null;
      } else st.responses[cur] = st.responses[cur] === value ? null : value;
      answerRun(p, cur, st.responses[cur]);
      play('tap');
      save();
      paint();
    }

    function paint() {
      const q = exam.questions[cur];
      const it = q.item;
      const section = exam.sections[q.section];
      const resp = st.responses[cur];
      const head = h('div.exam-qhead', h('b', `Question ${q.n} / ${exam.questions.length}`), h('small.muted', `${KIND[q.kind]} · ${scoringText(section.scoring, q.kind)}${section.scoring.byStep ? ` · ${fr(q.max)} points` : ''}`));
      // A problem draws its own prompt.
      const body = it.type === 'problem' ? [] : [h('div.prompt', html(it.prompt))];
      qctrl = null;
      if (it.type === 'problem') {
        // A problem, resumed from its log; every action saves the log.
        const n = cur;
        const done = h('p.note', t('Problème terminé : tu peux passer à la question suivante.'));
        let over = false; // a finished problem completes while it mounts
        qctrl = mountExercise({ ...it, resumeLog: st.responses[n] || [] }, {
          ready: () => {},
          submit: () => {},
          // Notes passed while the problem is shown are not an answer: a
          // problem only looked at stays blank (its dot, « sans réponse »).
          save: (pending) => { st.responses[n] = pending.log.some((e) => e.op !== 'pass') ? pending.log : null; answerRun(p, n, st.responses[n]); save(); paintNav(); },
          complete: () => { over = true; if (qctrl && !done.isConnected) qctrl.el.append(done); },
        });
        if (over) qctrl.el.append(done);
        body.push(qctrl.el);
        if (qctrl.footer) body.push(qctrl.footer);
      } else if (q.kind === 'mcq') {
        if (it.multi) body.push(h('small.muted', t('Plusieurs réponses possibles : coche toutes les bonnes.')));
        const picked = (k) => (Array.isArray(resp) ? resp.includes(k) : resp === k);
        body.push(h('div.choices', it.options.map((o, k) => h(`button.choice${picked(k) ? '.selected' : ''}`, { type: 'button', onclick: () => choose(k), html: `<span class="choice-body">${o.html}</span>` }, h('span.choice-key', String(k + 1))))));
      } else if (q.kind === 'tf') {
        body.push(h('div.tf-statement', html(it.statement)));
        body.push(h('div.choices.tf-choices', [[t('Vrai'), true], [t('Faux'), false]].map(([label, v]) => h(`button.choice${resp === v ? '.selected' : ''}`, { type: 'button', onclick: () => choose(v) }, label))));
      } else {
        const f = h('input.mx-text', { type: 'text', value: resp ?? '', placeholder: t('ta réponse') });
        f.addEventListener('change', () => { st.responses[cur] = f.value.trim() || null; save(); paintNav(); });
        body.push(f);
      }
      card.replaceChildren(head, ...body,
        h('div.row.exam-tools',
          h('button.btn.small.ghost', { type: 'button', onclick: () => { st.flags[cur] = !st.flags[cur]; save(); paint(); } }, st.flags[cur] ? t('🚩 Marquée') : t('🏳 Marquer')),
          resp !== null ? h('button.btn.small.ghost', { type: 'button', onclick: () => { st.responses[cur] = null; save(); paint(); } }, t('Effacer ma réponse')) : null));
      add(clear(foot),
        h('button.btn.secondary', { type: 'button', disabled: cur === 0, onclick: () => go(cur - 1) }, t('◀ Précédente')),
        cur < exam.questions.length - 1
          ? h('button.btn.primary', { type: 'button', onclick: () => go(cur + 1) }, t('Suivante ▶'))
          : null,
        h('button.btn.ghost.exam-hand', { type: 'button', onclick: () => confirmFinish() }, t('Rendre ma copie')));
      paintNav();
    }

    function confirmFinish() {
      const blanks = st.responses.filter((x) => x === null).length;
      const flagged = st.flags.filter(Boolean).length;
      let close;
      close = sheet(h('div.node-sheet',
        h('h3', t('Rendre ta copie ?')),
        h('p', blanks ? tn(blanks, '{n} question sans réponse (0 point chacune).', '{n} questions sans réponse (0 point chacune).') : t('Tu as répondu à toutes les questions.')),
        flagged ? h('p', tn(flagged, '{n} question marquée.', '{n} questions marquées.')) : null,
        h('button.btn.primary.wide', { onclick: () => { close(); finish(false); } }, t('Oui, rendre ma copie')),
        h('button.btn.ghost.wide', { onclick: () => close() }, t('Continuer l\'examen'))));
    }

    function finish(timeUp) {
      stop();
      keepTime();
      const out = finishRun(p);
      app.save();
      if (timeUp) play('bad');
      showResult({ ...p.lastExam, result: out.result }, timeUp);
    }

    const onKey = (e) => {
      if (e.target.tagName === 'INPUT') return;
      const q = exam.questions[cur];
      // A problem takes every key (its lines are typed on the keyboard).
      if (qctrl) { if (e.key === 'Enter') e.preventDefault(); qctrl.onKey?.(e); return; }
      const n = Number(e.key);
      if (q.kind === 'mcq' && n >= 1 && n <= q.item.options.length) choose(n - 1);
      // v / t: true (vrai), f: false (faux).
      if (q.kind === 'tf' && (e.key === 'v' || e.key === 't' || e.key === 'f')) choose(e.key !== 'f');
      if (e.key === 'ArrowRight') go(cur + 1);
      if (e.key === 'ArrowLeft') go(cur - 1);
    };
    document.addEventListener('keydown', onKey);
    timer = setInterval(tick, 1000);
    cleanupKey = () => document.removeEventListener('keydown', onKey);
    paint();
    tick();
  }

  // ---------- after ----------
  function showResult(last, timeUp = false) {
    stop();
    cleanupKey?.();
    const { exam, responses, result: r } = last;
    const answerText = (q, resp) => {
      if (resp === null || resp === undefined) return t('— (vide)');
      if (q.kind === 'tf') return resp ? t('Vrai') : t('Faux');
      if (q.kind === 'mcq' && Array.isArray(resp)) return resp.map((k) => q.item.options[k]?.html).join(' ; ');
      if (q.kind === 'mcq') return q.item.options[resp]?.html ?? '—';
      if (q.item.type === 'problem') return t('un problème rédigé, noté par étape ({points} / {max} points)', { points: fr(Math.round(r.questions[q.n - 1].points * 100) / 100), max: fr(q.max) });
      return String(resp);
    };
    const rightText = (q) => (q.kind === 'tf' ? (q.item.truth ? t('Vrai') : t('Faux')) : q.kind === 'mcq' ? q.item.options.filter((o) => o.correct).map((o) => o.html).join(' ; ') : q.item.answerHtml ?? '');
    const pts = (x) => `${x > 0 ? '+' : ''}${fr(Math.round(x * 100) / 100)}`;
    const skills = Object.entries(r.perSkill).sort((a, b) => (a[1].points / a[1].max) - (b[1].points / b[1].max));
    add(clear(main),
      h('h1', t('Résultat : {title}', { title: titleOf(exam) })),
      timeUp ? h('p.note', t('⏱ Le temps est écoulé : ta copie a été rendue.')) : null,
      h('div.exam-grade',
        h('div.exam-grade-num', fr(r.grade)), h('small', t('note estimée (estimation)')),
        // The label is computed again: a saved result keeps the language it was made in.
        h(`span.exam-verdict.${r.verdict.id}`, verdictOf(r.grade).label)),
      h('p', t('{score} / {max} points ({pct} %).', { score: fr(r.score), max: r.max, pct: r.pct })),
      h('p', t('Prédiction d\'après ta maîtrise : {score} points, note {grade}.', { score: fr(r.prediction.score), grade: fr(r.prediction.grade) }),
        r.overestimated ? h('b', ` ${t('Ta maîtrise est surestimée : ces compétences ont besoin de révisions.')}`) : r.prediction.grade + 1 <= r.grade ? ` ${t('Tu as fait mieux que prévu !')}` : ''),
      h('h3', t('Par compétence')),
      h('table.exam-table', h('thead', h('tr', h('th', t('Compétence')), h('th', '✔'), h('th', '✘'), h('th', '○'), h('th', t('Points')))),
        h('tbody', skills.map(([id, s]) => h('tr', h('td', SKILL_BY_ID[id]?.title ?? id), h('td', String(s.right)), h('td', String(s.wrong + s.partial)), h('td', String(s.blank)), h('td', `${pts(s.points)} / ${fr(s.max)}`))))),
      r.traps.length ? h('div', h('h3', t('Pièges')), h('ul', [...new Map(r.traps.map((tp) => [tp.rule, tp])).values()].map((tp) => h('li', t('Question {n} : {trap}', { n: tp.n, trap: RULE_BY_ID[tp.rule]?.name ?? tp.rule }))))) : null,
      r.toWork.length ? h('div', h('h3', t('À retravailler')),
        h('div.exam-work', r.toWork.map((id) => h('button.btn.small.secondary', { type: 'button', onclick: () => app.go('lesson', { kind: 'skill', skill: id }) }, `${SKILL_BY_ID[id]?.icon ?? ''} ${SKILL_BY_ID[id]?.title ?? id}`)))) : h('p', t('Rien à retravailler : bravo !')),
      h('h3', t('Corrections')),
      h('div.exam-corrections', exam.questions.map((q, i) => {
        const res = r.questions[i];
        return h(`details.exam-corr.${res.state}`,
          h('summary', `${q.n}. ${res.state === 'right' ? '✔' : res.state === 'blank' ? '○' : '✘'} ${pts(res.points)} — ${SKILL_BY_ID[q.skill]?.title ?? q.skill}`),
          h('div.prompt', html(q.item.prompt)),
          q.kind === 'tf' ? h('div.tf-statement', html(q.item.statement)) : null,
          h('p', html(t('Ta réponse : {answer}', { answer: answerText(q, responses[i]) }))),
          h('p', html(t('Réponse juste : {answer}', { answer: rightText(q) }))),
          res.rule ? html(explainRule(res.rule)) : null,
          html(solutionHtml(q.item.solution)));
      })),
      h('div.row',
        h('button.btn.primary', { onclick: () => app.go('exam', { id: exam.id }) }, t('Un autre examen blanc')),
        h('button.btn.ghost', { onclick: () => app.go('home') }, t('Retour au chemin'))));
    window.scrollTo?.(0, 0);
  }

  return () => { stop(); cleanupKey?.(); };
}

export { maxScore };
