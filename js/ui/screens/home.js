// The map: each unit is a branch, its skills a winding trail of stops.
// « Continuer » follows nextFocus (several branches in turn). A branch can
// be pinned, and « Je connais déjà ce module » runs that unit's placement.
// A closed skill shows the prerequisite it waits for, and leads to it.

import { h, sheet, bubble } from '../dom.js';
import { UNITS, SKILL_BY_ID, unitSkills } from '../../content/skills.js';
import {
  stars, isUnlocked, nextFocus, dueSkills, activeTraps, isDue, practiceSkill, missingPrereqs,
  activeBranches, pathState, pinBranch,
} from '../../engine/learner.js';
import { currentStreak } from '../../engine/rewards.js';
import { topBar, bottomNav, starRow } from './common.js';
import { examsForUnit } from '../../engine/exam.js';
import { EXAM_BY_ID } from '../../content/uni/exams.js';

const LEVEL_NAMES = ['', 'Découverte', 'Facile', 'Moyen', 'Difficile', 'Expert'];

export function homeScreen(root, _args, app) {
  const p = app.profile;
  const next = nextFocus(p);
  const active = new Set(activeBranches(p));
  const pinned = pathState(p).pinned;
  const due = dueSkills(p);
  const traps = activeTraps(p);
  const streak = currentStreak(p);

  const nextSkill = next && SKILL_BY_ID[practiceSkill(p, next)];
  const main = h('main.home');

  // Call to action.
  const cta = h('div.cta',
    h('button.btn.primary.big', { onclick: () => app.go('lesson', { kind: next ? 'smart' : 'review' }) },
      next ? 'Continuer' : 'Réviser',
      nextSkill ? h('small', practiceSkill(p, next) !== next ? `On consolide : ${nextSkill.title}` : nextSkill.title) : h('small', 'Tout est maîtrisé : on entretient !')),
    due.length || traps.length
      ? h('button.btn.secondary', { onclick: () => app.go('lesson', { kind: 'review' }) }, `⏰ Réviser${due.length ? ` (${due.length})` : ''}`)
      : null);

  // Step U4: a problem left halfway (profile.pending) can be resumed.
  if (p.pending?.item) {
    const s = SKILL_BY_ID[p.pending.item.skill];
    main.append(h('div.cta.resume',
      h('button.btn.secondary.big', { onclick: () => app.go('lesson', { kind: 'resume' }) },
        'Reprendre le problème', h('small', s ? s.title : ''))));
  }
  if (streak.atRisk && streak.count > 0) {
    main.append(bubble(`Ta série de <b>${streak.count} jour${streak.count > 1 ? 's' : ''}</b> t'attend : une leçon aujourd'hui pour la garder !`, 'wow'));
  } else if (streak.lost) {
    main.append(bubble(`Ta série de ${streak.lost} jours s'est arrêtée. On en recommence une ?`, 'sad'));
  }
  main.append(cta);
  // A mock exam under way (step U3): resume it.
  if (p.examRun && EXAM_BY_ID[p.examRun.exam.id]) {
    main.append(h('button.btn.secondary.wide.exam-resume', { onclick: () => app.go('exam', { id: p.examRun.exam.id }) }, `📝 Reprendre l'examen blanc : ${EXAM_BY_ID[p.examRun.exam.id].title}`));
  }

  for (const unit of UNITS) {
    const skills = unitSkills(unit.id);
    const done = skills.filter((s) => p.skills[s.id]?.mastered).length;
    const section = h(`section.unit#unit-${unit.id}`, { style: { '--unit': unit.color } },
      h('div.unit-head',
        h('div.unit-title', h('h2', unit.title),
          active.has(unit.id) ? h('small.unit-tag', 'en cours') : null,
          pinned === unit.id ? h('small.unit-tag', '📌 épinglée') : null),
        unit.ready ? h('span.unit-count', `${done}/${skills.length} 👑`) : h('span.soon', 'Bientôt')),
      unit.ready && done < skills.length ? h('div.unit-tools',
        h('button.btn.small.ghost', { type: 'button', onclick: () => { pinBranch(p, unit.id); app.save(); app.go('home'); } }, pinned === unit.id ? 'Désépingler' : '📌 Épingler cette branche'),
        h('button.btn.small.ghost', { type: 'button', onclick: () => app.go('skim', { unit: unit.id }) }, 'Je connais déjà ce module')) : null,
      // Step U3: the mock exams of this unit.
      unit.ready && examsForUnit(unit.id).length ? h('div.unit-tools', examsForUnit(unit.id).map((e) => h('button.btn.small.secondary', { type: 'button', onclick: () => app.go('exam', { id: e.id }) }, `📝 Examen blanc : ${e.title}`))) : null);
    if (!unit.ready) {
      section.classList.add('locked');
      section.append(h('div.path', [0, 1, 2].map((i) => h('div.node-wrap', { style: { '--x': `${[0, 1, -1][i] * 70}px` } }, h('div.node.locked', '🔒')))));
      main.append(section);
      continue;
    }
    const path = h('div.path');
    skills.forEach((s, i) => {
      const st = p.skills[s.id];
      const unlocked = isUnlocked(p, s.id);
      const n = stars(st);
      const classes = ['node'];
      if (!unlocked) classes.push('locked');
      else if (st?.mastered) classes.push('mastered');
      else if (n > 0) classes.push('started');
      if (s.id === next) classes.push('current');
      const repairing = Object.values(p.skills).some((x) => x.repair === s.id);
      if (repairing) classes.push('repair');
      const x = Math.round(Math.sin(i * 0.9) * 80);
      const node = h(`button.${classes.join('.')}`, { type: 'button', onclick: () => openNode(app, s.id), 'aria-label': s.title, 'data-skill': s.id },
        h('span.node-icon', unlocked ? s.icon : '🔒'),
        st && isDue(st) ? h('span.badge-due', '⏰') : null,
        repairing ? h('span.badge-repair', '🩹') : null,
        st?.repair ? h('span.badge-repair', '🧱') : null);
      path.append(h('div.node-wrap', { style: { '--x': `${x}px` } },
        s.id === next ? h('div.node-tip', practiceSkill(p, next) !== next ? 'À consolider' : 'Ici !') : null,
        node, starRow(n), h('div.node-label', s.title)));
    });
    section.append(path);
    main.append(section);
  }

  root.append(topBar(app), main, bottomNav(app, 'home'));
  root.querySelector('.node.current')?.scrollIntoView({ block: 'center' });
}

function openNode(app, id) {
  const p = app.profile;
  const s = SKILL_BY_ID[id];
  const st = p.skills[id];
  const unlocked = isUnlocked(p, id);
  const missing = missingPrereqs(p, id);
  // A missing prerequisite leads to its own stop on the map.
  const goTo = (q) => {
    close();
    document.querySelector(`[data-skill="${q}"]`)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    setTimeout(() => openNode(app, q), 250);
  };
  let close;
  const go = (args) => { close(); app.go('lesson', args); };
  close = sheet(h('div.node-sheet',
    h('div.node-sheet-head', h('span.big-icon', s.icon), h('div', h('h3', s.title), h('p.muted', s.desc))),
    st ? h('div.node-stats', starRow(stars(st)), h('span', `Niveau ${st.level}/5 · ${LEVEL_NAMES[st.level]}`), h('span', `${Math.round(st.p * 100)} % maîtrisé`)) : null,
    st?.repair ? h('p.note', `🧱 On consolide d'abord : ${SKILL_BY_ID[st.repair].title}.`) : null,
    st?.testedOut && !st.attempts ? h('p.note', '✔ Validé par le test rapide. Une révision le confirmera.') : null,
    unlocked
      ? h('button.btn.primary.wide', { onclick: () => go({ kind: 'skill', skill: id }) }, st?.mastered ? 'S\'entraîner encore' : 'S\'entraîner')
      : h('div.note', h('p', '🔒 Il faut d\'abord :'), h('div.missing-list', missing.map((q) => h('button.btn.small.secondary', { type: 'button', onclick: () => goTo(q) }, `${SKILL_BY_ID[q].icon} ${SKILL_BY_ID[q].title}`))))));
}
