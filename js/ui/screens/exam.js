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
import { startRun, answerRun, finishRun, timeLeft, maxScore } from '../../engine/exam.js';
import { makeRng } from '../../content/random.js';
import { explainRule, solutionHtml, mountExercise } from '../exercises.js';
import { topBar } from './common.js';

const fr = (x) => String(x).replace('.', ',').replace('-', '−');
const clock = (ms) => {
  const s = Math.ceil(ms / 1000);
  const hh = Math.floor(s / 3600);
  const mm = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  return `${hh ? `${hh}:` : ''}${String(mm).padStart(hh ? 2 : 1, '0')}:${String(ss).padStart(2, '0')}`;
};
const scoringText = (sc, kind) => {
  if (sc.byStep) return 'points du barème, notés par étape';
  if (kind === 'open') return `${fr(sc.right)} points, notés par étape`;
  return sc.perRight ? 'plusieurs réponses : +1/N par bonne case, −1/M par mauvaise, plancher 0' : `${fr(sc.right)} juste, ${fr(sc.blank ?? 0)} vide, ${fr(sc.wrong)} faux`;
};
const KIND = { mcq: 'QCM', tf: 'Vrai ou faux', coef: 'Réponse courte', open: 'Problème' };
const date = (t) => new Date(t).toLocaleDateString('fr-CH', { day: 'numeric', month: 'long', year: 'numeric' });

export function examScreen(root, args, app) {
  const p = app.profile;
  const bp = EXAM_BY_ID[args.id] ?? (p.examRun ? EXAM_BY_ID[p.examRun.exam.id] : null);
  let timer = null;
  let cleanupKey = null;
  const stop = () => { if (timer) clearInterval(timer); timer = null; };
  const main = h('main.exam');
  root.append(topBar(app), main);
  if (!bp) { main.append(h('p', 'Cet examen n\'existe pas.'), h('button.btn.primary', { onclick: () => app.go('home') }, 'Retour')); return stop; }

  if (args.show === 'result' && p.lastExam?.exam.id === bp.id) showResult(p.lastExam);
  else if (p.examRun && p.examRun.exam.id === bp.id && timeLeft(p.examRun) > 0) showIntro(true);
  else if (p.examRun && p.examRun.exam.id === bp.id) { const r = finishRun(p); app.save(); showResult({ ...p.lastExam, result: r.result }); } else showIntro(false);

  // ---------- before ----------
  function showIntro(resume) {
    stop();
    const past = (p.exams || []).filter((e) => e.id === bp.id).slice(-5).reverse();
    add(clear(main),
      h('h1', `📝 Examen blanc : ${bp.title}`),
      h('div.exam-info',
        h('p', `Durée : ${bp.durationMin} minutes. ${bp.documents === 'none' ? 'Sans document, sans calculatrice.' : 'Formulaire autorisé.'}`),
        h('ul', bp.sections.map((s) => h('li', `${s.count} ${KIND[s.kind]} (${scoringText(s.scoring, s.kind)})`))),
        h('p.muted', 'Pas d\'aide ni de correction avant la fin. Tu peux sauter une question, la marquer, et revenir. Une réponse vide vaut 0 ; une réponse fausse peut coûter des points.'),
        h('p.muted', `Note estimée à la fin : 1 + 5 × score / maximum. ${bp.source ?? ''}`)),
      resume
        ? h('button.btn.primary.wide', { onclick: () => run() }, `Reprendre (il reste ${clock(timeLeft(p.examRun))})`)
        : h('button.btn.primary.wide', { onclick: () => { startRun(p, bp, { rng: makeRng(Date.now() % 2147483647) }); app.save(); run(); } }, 'Commencer l\'examen'),
      past.length ? h('div.exam-history', h('h3', 'Tes examens blancs'), h('ul', past.map((e) => h('li', `${date(e.at)} : note ${fr(e.grade)} (${fr(e.score)} / ${e.max} points)${e.predicted !== undefined ? `, prédite ${fr(e.predicted)}` : ''}`)))) : null,
      h('button.btn.ghost', { onclick: () => app.go('home') }, 'Retour au chemin'));
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
    main.replaceChildren(h('div.exam-head', h('b', exam.title), timeEl), nav, card, foot);

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
        const done = h('p.note', 'Problème terminé : tu peux passer à la question suivante.');
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
        if (it.multi) body.push(h('small.muted', 'Plusieurs réponses possibles : coche toutes les bonnes.'));
        const picked = (k) => (Array.isArray(resp) ? resp.includes(k) : resp === k);
        body.push(h('div.choices', it.options.map((o, k) => h(`button.choice${picked(k) ? '.selected' : ''}`, { type: 'button', onclick: () => choose(k), html: `<span class="choice-body">${o.html}</span>` }, h('span.choice-key', String(k + 1))))));
      } else if (q.kind === 'tf') {
        body.push(h('div.tf-statement', html(it.statement)));
        body.push(h('div.choices.tf-choices', [['Vrai', true], ['Faux', false]].map(([label, v]) => h(`button.choice${resp === v ? '.selected' : ''}`, { type: 'button', onclick: () => choose(v) }, label))));
      } else {
        const f = h('input.mx-text', { type: 'text', value: resp ?? '', placeholder: 'ta réponse' });
        f.addEventListener('change', () => { st.responses[cur] = f.value.trim() || null; save(); paintNav(); });
        body.push(f);
      }
      card.replaceChildren(head, ...body,
        h('div.row.exam-tools',
          h('button.btn.small.ghost', { type: 'button', onclick: () => { st.flags[cur] = !st.flags[cur]; save(); paint(); } }, st.flags[cur] ? '🚩 Marquée' : '🏳 Marquer'),
          resp !== null ? h('button.btn.small.ghost', { type: 'button', onclick: () => { st.responses[cur] = null; save(); paint(); } }, 'Effacer ma réponse') : null));
      add(clear(foot),
        h('button.btn.secondary', { type: 'button', disabled: cur === 0, onclick: () => go(cur - 1) }, '◀ Précédente'),
        cur < exam.questions.length - 1
          ? h('button.btn.primary', { type: 'button', onclick: () => go(cur + 1) }, 'Suivante ▶')
          : null,
        h('button.btn.ghost.exam-hand', { type: 'button', onclick: () => confirmFinish() }, 'Rendre ma copie'));
      paintNav();
    }

    function confirmFinish() {
      const blanks = st.responses.filter((x) => x === null).length;
      const flagged = st.flags.filter(Boolean).length;
      let close;
      close = sheet(h('div.node-sheet',
        h('h3', 'Rendre ta copie ?'),
        h('p', blanks ? `${blanks} question${blanks > 1 ? 's' : ''} sans réponse (0 point chacune).` : 'Tu as répondu à toutes les questions.'),
        flagged ? h('p', `${flagged} question${flagged > 1 ? 's' : ''} marquée${flagged > 1 ? 's' : ''}.`) : null,
        h('button.btn.primary.wide', { onclick: () => { close(); finish(false); } }, 'Oui, rendre ma copie'),
        h('button.btn.ghost.wide', { onclick: () => close() }, 'Continuer l\'examen')));
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
      if (q.kind === 'tf' && (e.key === 'v' || e.key === 'f')) choose(e.key === 'v');
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
      if (resp === null || resp === undefined) return '— (vide)';
      if (q.kind === 'tf') return resp ? 'Vrai' : 'Faux';
      if (q.kind === 'mcq' && Array.isArray(resp)) return resp.map((k) => q.item.options[k]?.html).join(' ; ');
      if (q.kind === 'mcq') return q.item.options[resp]?.html ?? '—';
      if (q.item.type === 'problem') return `un problème rédigé, noté par étape (${fr(Math.round(r.questions[q.n - 1].points * 100) / 100)} / ${fr(q.max)} points)`;
      return String(resp);
    };
    const rightText = (q) => (q.kind === 'tf' ? (q.item.truth ? 'Vrai' : 'Faux') : q.kind === 'mcq' ? q.item.options.filter((o) => o.correct).map((o) => o.html).join(' ; ') : q.item.answerHtml ?? '');
    const pts = (x) => `${x > 0 ? '+' : ''}${fr(Math.round(x * 100) / 100)}`;
    const skills = Object.entries(r.perSkill).sort((a, b) => (a[1].points / a[1].max) - (b[1].points / b[1].max));
    add(clear(main),
      h('h1', `Résultat : ${exam.title}`),
      timeUp ? h('p.note', '⏱ Le temps est écoulé : ta copie a été rendue.') : null,
      h('div.exam-grade',
        h('div.exam-grade-num', fr(r.grade)), h('small', 'note estimée (estimation)'),
        h(`span.exam-verdict.${r.verdict.id}`, r.verdict.label)),
      h('p', `${fr(r.score)} / ${r.max} points (${r.pct} %).`),
      h('p', `Prédiction d'après ta maîtrise : ${fr(r.prediction.score)} points, note ${fr(r.prediction.grade)}.`,
        r.overestimated ? h('b', ' Ta maîtrise est surestimée : ces compétences ont besoin de révisions.') : r.prediction.grade + 1 <= r.grade ? ' Tu as fait mieux que prévu !' : ''),
      h('h3', 'Par compétence'),
      h('table.exam-table', h('thead', h('tr', h('th', 'Compétence'), h('th', '✔'), h('th', '✘'), h('th', '○'), h('th', 'Points'))),
        h('tbody', skills.map(([id, s]) => h('tr', h('td', SKILL_BY_ID[id]?.title ?? id), h('td', String(s.right)), h('td', String(s.wrong + s.partial)), h('td', String(s.blank)), h('td', `${pts(s.points)} / ${fr(s.max)}`))))),
      r.traps.length ? h('div', h('h3', 'Pièges'), h('ul', [...new Map(r.traps.map((t) => [t.rule, t])).values()].map((t) => h('li', `Question ${t.n} : ${RULE_BY_ID[t.rule]?.name ?? t.rule}`)))) : null,
      r.toWork.length ? h('div', h('h3', 'À retravailler'),
        h('div.exam-work', r.toWork.map((id) => h('button.btn.small.secondary', { type: 'button', onclick: () => app.go('lesson', { kind: 'skill', skill: id }) }, `${SKILL_BY_ID[id]?.icon ?? ''} ${SKILL_BY_ID[id]?.title ?? id}`)))) : h('p', 'Rien à retravailler : bravo !'),
      h('h3', 'Corrections'),
      h('div.exam-corrections', exam.questions.map((q, i) => {
        const res = r.questions[i];
        return h(`details.exam-corr.${res.state}`,
          h('summary', `${q.n}. ${res.state === 'right' ? '✔' : res.state === 'blank' ? '○' : '✘'} ${pts(res.points)} — ${SKILL_BY_ID[q.skill]?.title ?? q.skill}`),
          h('div.prompt', html(q.item.prompt)),
          q.kind === 'tf' ? h('div.tf-statement', html(q.item.statement)) : null,
          h('p', html(`Ta réponse : ${answerText(q, responses[i])}`)),
          h('p', html(`Réponse juste : ${rightText(q)}`)),
          res.rule ? html(explainRule(res.rule)) : null,
          html(solutionHtml(q.item.solution)));
      })),
      h('div.row',
        h('button.btn.primary', { onclick: () => app.go('exam', { id: exam.id }) }, 'Un autre examen blanc'),
        h('button.btn.ghost', { onclick: () => app.go('home') }, 'Retour au chemin')));
    window.scrollTo?.(0, 0);
  }

  return () => { stop(); cleanupKey?.(); };
}

export { maxScore };
