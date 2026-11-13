// The map. It is laid out as a tree by school year: one band per year
// (5H … 11H, gymnase, CMS, BA1 … BA4), and in each band one column per unit
// with that unit's skills of that year, as a short winding trail. Columns
// that do not need each other stand side by side; a column that needs
// another one of the same band goes on a line below it. A rail of years on
// the side scrolls the map fast (tap or drag), and follows the scrolling.
//
// « Continuer » follows nextFocus (several branches in turn). The head of a
// column opens the unit: pin the branch, « Je connais déjà ce module » (the
// unit's placement), its other years. A closed skill shows the prerequisite
// it waits for, and leads to it.

import { h, sheet, bubble } from '../dom.js';
import { UNITS, SKILLS, SKILL_BY_ID, YEARS, unitSkills } from '../../content/skills.js';
import {
  stars, isUnlocked, nextFocus, dueSkills, activeTraps, isDue, practiceSkill, missingPrereqs,
  activeBranches, pathState, pinBranch, isTester, isSolid,
} from '../../engine/learner.js';
import { DAY } from '../../engine/time.js';
import { currentStreak } from '../../engine/rewards.js';
import { topBar, bottomNav, starRow } from './common.js';
import { examsForUnit } from '../../engine/exam.js';
import { EXAM_BY_ID } from '../../content/uni/exams.js';
import { t, tn } from '../../i18n.js';

const LEVEL_NAMES = ['', 'Découverte', 'Facile', 'Moyen', 'Difficile', 'Expert'];

// The band of a skill: the last school year at or before its year.
const bandOf = (year) => YEARS.reduce((b, y) => (y.id <= year ? y.id : b), YEARS[0].id);

// Short label for the rail: 9H, Gym, CMS, BA1.
const shortLabel = (y) => (y.label.length > 4 ? y.label.slice(0, 3) : y.label);

// The bands, computed once (the catalogue does not change while the app
// runs): [{ year, lines: [[{ unit, skills, first, last }]] }].
let BANDS = null;
export function mapBands() {
  if (BANDS) return BANDS;
  const ready = UNITS.filter((u) => u.ready);
  const byBand = new Map(YEARS.map((y) => [y.id, []]));
  const segOf = {};
  for (const u of ready) {
    const segs = new Map();
    for (const s of unitSkills(u.id)) {
      const b = bandOf(s.year);
      if (!segs.has(b)) segs.set(b, { unit: u, band: b, skills: [] });
      segs.get(b).skills.push(s);
      segOf[s.id] = segs.get(b);
    }
    const list = [...segs.values()].sort((a, b) => a.band - b.band);
    list.forEach((seg, i) => { seg.first = i === 0; seg.last = i === list.length - 1; byBand.get(seg.band).push(seg); });
  }
  // Inside a band, a column goes one line below every column of the same
  // band it needs (longest chain). A cycle between two columns is cut where
  // it closes: both stay on the line reached first.
  const prereqsOf = Object.fromEntries(SKILLS.map((s) => [s.id, s.prereqs]));
  BANDS = [];
  for (const [year, segs] of byBand) {
    if (!segs.length) continue;
    const depth = new Map();
    const visiting = new Set();
    const depthOf = (seg) => {
      if (depth.has(seg)) return depth.get(seg);
      visiting.add(seg);
      let d = 0;
      for (const s of seg.skills) {
        for (const p of prereqsOf[s.id]) {
          const other = segOf[p];
          if (other && other !== seg && other.band === year && !visiting.has(other)) d = Math.max(d, depthOf(other) + 1);
        }
      }
      visiting.delete(seg);
      depth.set(seg, d);
      return d;
    };
    const lines = [];
    for (const seg of segs) {
      (lines[depthOf(seg)] ||= []).push(seg);
      seg.rows = skillRows(seg.skills, prereqsOf);
    }
    BANDS.push({ year: YEARS.find((y) => y.id === year), lines: lines.filter(Boolean) });
  }
  return BANDS;
}

// Inside a column, the skills in rows by depth: a skill goes one row below
// every skill of the column it needs, so skills that do not need each
// other stand side by side (map order inside a row).
function skillRows(skills, prereqsOf) {
  const inSeg = new Map(skills.map((s) => [s.id, s]));
  const depth = new Map();
  const depthOf = (s) => {
    if (depth.has(s.id)) return depth.get(s.id);
    depth.set(s.id, 0); // a cycle is cut where it closes
    let d = 0;
    for (const p of prereqsOf[s.id]) if (inSeg.has(p)) d = Math.max(d, depthOf(inSeg.get(p)) + 1);
    depth.set(s.id, d);
    return d;
  };
  const rows = [];
  for (const s of skills) (rows[depthOf(s)] ||= []).push(s);
  return rows.filter(Boolean);
}

export function homeScreen(root, _args, app) {
  const p = app.profile;
  const next = nextFocus(p);
  const active = new Set(activeBranches(p));
  const pinned = pathState(p).pinned;
  const due = dueSkills(p);
  const traps = activeTraps(p);
  const streak = currentStreak(p);
  const tester = isTester(p);
  const repairing = new Set(Object.values(p.skills).map((x) => x.repair).filter(Boolean));

  const nextSkill = next && SKILL_BY_ID[practiceSkill(p, next)];
  const main = h('main.home');

  // Call to action.
  const cta = h('div.cta',
    h('button.btn.primary.big', { onclick: () => app.go('lesson', { kind: next ? 'smart' : 'review' }) },
      next ? t('Continuer') : t('Réviser'),
      nextSkill ? h('small', practiceSkill(p, next) !== next ? t('On consolide : {title}', { title: nextSkill.title }) : nextSkill.title) : h('small', t('Tout est maîtrisé : on entretient !'))),
    due.length || traps.length
      ? h('button.btn.secondary', { onclick: () => app.go('lesson', { kind: 'review' }) }, due.length ? t('⏰ Réviser ({n})', { n: due.length }) : t('⏰ Réviser'))
      : null);

  // Step U4: a problem left halfway (profile.pending) can be resumed.
  if (p.pending?.item) {
    const s = SKILL_BY_ID[p.pending.item.skill];
    main.append(h('div.cta.resume',
      h('button.btn.secondary.big', { onclick: () => app.go('lesson', { kind: 'resume' }) },
        t('Reprendre le problème'), h('small', s ? s.title : ''))));
  }
  if (streak.atRisk && streak.count > 0) {
    main.append(bubble(tn(streak.count, 'Ta série de <b>{n} jour</b> t\'attend : une leçon aujourd\'hui pour la garder !', 'Ta série de <b>{n} jours</b> t\'attend : une leçon aujourd\'hui pour la garder !'), 'wow'));
  } else if (streak.lost) {
    main.append(bubble(t('Ta série de {n} jours s\'est arrêtée. On en recommence une ?', { n: streak.lost }), 'sad'));
  }
  main.append(cta);
  // Test mode (isTester): every skill opens; the colours still show the path.
  if (tester) main.append(h('p.note.tester-note', t('🐝 Mode test : tout l\'arbre est ouvert. Les étapes grises (🔓) sont celles que le parcours n\'aurait pas encore débloquées.')));
  // A mock exam under way (step U3): resume it.
  if (p.examRun && EXAM_BY_ID[p.examRun.exam.id]) {
    main.append(h('button.btn.secondary.wide.exam-resume', { onclick: () => app.go('exam', { id: p.examRun.exam.id }) }, t('📝 Reprendre l\'examen blanc : {title}', { title: EXAM_BY_ID[p.examRun.exam.id].title })));
  }

  const node = (s, x) => {
    const st = p.skills[s.id];
    const unlocked = isUnlocked(p, s.id);
    const n = stars(st);
    const classes = ['node'];
    const spoiled = !!st?.spoiledBy && !st.mastered;
    if (!unlocked) classes.push('locked');
    else if (st?.mastered) classes.push(isSolid(st) ? 'mastered.solid' : 'mastered');
    else if (spoiled) classes.push('spoiled');
    else if (n > 0) classes.push('started');
    if (s.id === next) classes.push('current');
    if (repairing.has(s.id)) classes.push('repair');
    return h('div.node-wrap', { style: { '--x': `${x}px` } },
      s.id === next ? h('div.node-tip', practiceSkill(p, next) !== next ? t('À consolider') : t('Ici !')) : null,
      h(`button.${classes.join('.')}`, { type: 'button', onclick: () => openNode(app, s.id), 'aria-label': s.title, 'data-skill': s.id },
        h('span.node-icon', unlocked ? s.icon : tester ? '🔓' : '🔒'),
        st && isDue(st) ? h('span.badge-due', '⏰') : null,
        spoiled ? h('span.badge-due', { title: t('À revoir') }, '🔁') : null,
        isSolid(st) && !isDue(st) ? h('span.badge-solid', { title: t('Ancré à long terme') }, '💎') : null,
        repairing.has(s.id) ? h('span.badge-repair', '🩹') : null,
        st?.repair ? h('span.badge-repair', '🧱') : null),
      starRow(n), h('div.node-label', s.title));
  };

  const map = h('div.map');
  for (const band of mapBands()) {
    const section = h(`section.band#band-${String(band.year.id).replace('.', '-')}`, { 'data-year': band.year.id },
      h('div.band-head', h('h2', band.year.label), h('small', band.year.age),
        band.year.id === p.year ? h('span.band-you', t('ta classe')) : null));
    band.lines.forEach((line, li) => {
      if (li > 0) section.append(h('div.band-arrow', { 'aria-hidden': 'true' }, '↓'));
      section.append(h('div.band-line', line.map((seg) => {
        const u = seg.unit;
        const done = seg.skills.filter((s) => p.skills[s.id]?.mastered).length;
        const exams = seg.last ? examsForUnit(u.id) : [];
        const wide = Math.max(...seg.rows.map((r) => r.length));
        return h(`section.unit.seg${seg.first ? `#unit-${u.id}` : ''}`, { style: { '--unit': u.color, '--w': wide }, 'data-unit': u.id },
          h('button.seg-head', { type: 'button', onclick: () => openUnit(app, u.id) },
            h('span.seg-title', u.title),
            h('span.seg-meta',
              active.has(u.id) ? h('small.unit-tag', t('en cours')) : null,
              pinned === u.id ? h('small.unit-tag', '📌') : null,
              h('span.unit-count', `${done}/${seg.skills.length} 👑`))),
          // A row of one skill winds like a trail; wider rows stand straight.
          h('div.path', seg.rows.map((row, i) => h('div.path-row', row.map((s) => node(s, row.length === 1 ? Math.round(Math.sin(i * 0.9) * 26) : 0))))),
          // Step U3: the mock exams, at the end of the unit's trail.
          exams.length ? h('div.unit-tools', exams.map((e) => h('button.btn.small.secondary', { type: 'button', onclick: () => app.go('exam', { id: e.id }) }, t('📝 Examen blanc : {title}', { title: e.title })))) : null);
      })));
    });
    map.append(section);
  }
  main.append(map);

  // The rail of years: tap a year, or drag along the rail, to jump there.
  const rail = h('nav.year-rail', { 'aria-label': t('Aller à une année') });
  const marks = mapBands().map((band) => {
    const b = h(`button.rail-year${band.year.id === p.year ? '.mine' : ''}`, { type: 'button', 'data-year': band.year.id, title: band.year.label }, shortLabel(band.year));
    rail.append(b);
    return { year: band.year.id, b };
  });
  const sectionOf = (year) => map.querySelector(`[data-year="${year}"]`);
  // Instant: the map is long, a smooth scroll over it would be slow.
  const jump = (year) => {
    const sec = sectionOf(year);
    if (!sec) return;
    const top = sec.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: 'instant' });
    light(year);
  };
  const light = (year) => marks.forEach((m) => m.b.classList.toggle('active', m.year === year));
  const markAt = (clientY) => {
    let best = marks[0];
    for (const m of marks) if (m.b.getBoundingClientRect().top <= clientY) best = m;
    return best;
  };
  let dragging = false;
  rail.addEventListener('pointerdown', (e) => {
    dragging = true;
    rail.setPointerCapture(e.pointerId);
    rail.classList.add('dragging');
    jump(markAt(e.clientY).year);
    e.preventDefault();
  });
  rail.addEventListener('pointermove', (e) => { if (dragging) jump(markAt(e.clientY).year); });
  const stop = () => { dragging = false; rail.classList.remove('dragging'); };
  rail.addEventListener('pointerup', stop);
  rail.addEventListener('pointercancel', stop);
  // Keyboard: the buttons work as links.
  rail.addEventListener('click', (e) => { const b = e.target.closest('.rail-year'); if (b && e.detail === 0) jump(Number(b.dataset.year)); });
  // The rail follows the scrolling: the band at the top of the screen.
  let ticking = false;
  const onScroll = () => {
    if (ticking || dragging) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      let cur = marks[0]?.year;
      for (const m of marks) { const sec = sectionOf(m.year); if (sec && sec.getBoundingClientRect().top <= 140) cur = m.year; }
      light(cur);
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Where to continue, always in reach: the rail's 📍 goes back to the
  // current stop, and a floating « Continuer » shows once the big button
  // at the top has scrolled away.
  const toCurrent = () => root.querySelector('.node.current')?.scrollIntoView({ block: 'center' });
  if (next) rail.prepend(h('button.rail-here', { type: 'button', title: t('Où j\'en suis'), 'aria-label': t('Où j\'en suis'), onpointerdown: (e) => e.stopPropagation(), onclick: toCurrent }, '📍'));
  const float = h('div.cta-float', h('button.btn.primary', { type: 'button', onclick: () => app.go('lesson', { kind: next ? 'smart' : 'review' }) },
    `▶ ${next ? t('Continuer') : t('Réviser')}`, nextSkill ? h('small', nextSkill.title) : null));
  const seen = new IntersectionObserver(([e]) => float.classList.toggle('show', !e.isIntersecting));
  seen.observe(cta);

  root.append(topBar(app), main, rail, float, bottomNav(app, 'home'));
  // Back on the map: straight to where the student goes on.
  toCurrent();
  onScroll();
  return () => { window.removeEventListener('scroll', onScroll); seen.disconnect(); };
}

// The sheet of a unit: progress over all its years, pin, placement, its years.
function openUnit(app, unitId) {
  const p = app.profile;
  const u = UNITS.find((x) => x.id === unitId);
  const skills = unitSkills(unitId);
  const done = skills.filter((s) => p.skills[s.id]?.mastered).length;
  const pinned = pathState(p).pinned === unitId;
  const years = [...new Set(skills.map((s) => bandOf(s.year)))].sort((a, b) => a - b);
  let close;
  const goYear = (y) => {
    close();
    const seg = document.querySelector(`[data-year="${y}"] [data-unit="${unitId}"]`);
    seg?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };
  close = sheet(h('div.node-sheet', { style: { '--unit': u.color } },
    h('div.node-sheet-head', h('span.big-icon.unit-dot'), h('div', h('h3', u.title), h('p.muted', t('{done}/{total} étapes maîtrisées 👑', { done, total: skills.length })))),
    h('div.unit-years', years.map((y) => h('button.chip', { type: 'button', onclick: () => goYear(y) }, h('b', YEARS.find((x) => x.id === y).label)))),
    done < skills.length ? h('div.unit-tools',
      h('button.btn.small.secondary', { type: 'button', onclick: () => { close(); pinBranch(p, unitId); app.save(); app.go('home'); } }, pinned ? t('Désépingler') : t('📌 Épingler cette branche')),
      h('button.btn.small.ghost', { type: 'button', onclick: () => { close(); app.go('skim', { unit: unitId }); } }, t('Je connais déjà ce module'))) : null,
    examsForUnit(unitId).length ? h('div.unit-tools', examsForUnit(unitId).map((e) => h('button.btn.small.secondary', { type: 'button', onclick: () => { close(); app.go('exam', { id: e.id }); } }, t('📝 Examen blanc : {title}', { title: e.title })))) : null));
}

// How the memory of a mastered skill stands: due, next review, solid.
function memoryNote(st) {
  if (isDue(st)) return t('⏰ À réviser maintenant.');
  const days = Math.max(1, Math.round((st.due - Date.now()) / DAY));
  return isSolid(st)
    ? t('💎 Ancré à long terme : prochaine vérification dans {n} jours.', { n: days })
    : t('Prochaine révision dans {n} jours. Après quelques révisions réussies, il sera ancré à long terme 💎.', { n: days });
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
    st ? h('div.node-stats', starRow(stars(st)), h('span', t('Niveau {level}/5 · {name}', { level: st.level, name: t(LEVEL_NAMES[st.level]) })), h('span', t('{n} % maîtrisé', { n: Math.round(st.p * 100) }))) : null,
    st?.repair ? h('p.note', t('🧱 On consolide d\'abord : {title}.', { title: SKILL_BY_ID[st.repair].title })) : null,
    st?.testedOut && !st.attempts ? h('p.note', t('✔ Validé par le test rapide. Une révision le confirmera.')) : null,
    st?.spoiledBy && !st.mastered && SKILL_BY_ID[st.spoiledBy] ? h('p.note', t('🔁 À revoir : une erreur dans « {from} » vient de ce chapitre.', { from: SKILL_BY_ID[st.spoiledBy].title })) : null,
    st?.mastered ? h('p.note', memoryNote(st)) : null,
    unlocked || isTester(p)
      ? h('button.btn.primary.wide', { onclick: () => go({ kind: 'skill', skill: id }) }, st?.mastered ? t('S\'entraîner encore') : t('S\'entraîner'))
      : null,
    unlocked ? null
      : h('div.note', h('p', isTester(p) ? t('🔓 Mode test. Le parcours demanderait d\'abord :') : t('🔒 Il faut d\'abord :')), h('div.missing-list', missing.map((q) => h('button.btn.small.secondary', { type: 'button', onclick: () => goTo(q) }, `${SKILL_BY_ID[q].icon} ${SKILL_BY_ID[q].title}`))))));
}
