// Progress: XP over time, stats, skills, badges.

import { h, html } from '../dom.js';
import { SKILLS, UNITS, unitSkills } from '../../content/skills.js';
import { skillFacts } from '../../content/calcul.js';
import { isAutomatic } from '../../engine/facts.js';
import { stars, isUnlocked } from '../../engine/learner.js';
import { BADGES, xpHistory, xpToday, currentStreak } from '../../engine/rewards.js';
import { topBar, bottomNav, starRow } from './common.js';

const DAYS = ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'];

function xpChart(p) {
  const data = xpHistory(p, 14);
  const max = Math.max(p.dailyGoal, ...data.map((d) => d.xp));
  const W = 320;
  const H = 120;
  const bw = W / data.length;
  const goalY = H - 20 - ((H - 30) * p.dailyGoal) / max;
  const bars = data.map((d, i) => {
    const bh = ((H - 30) * d.xp) / max;
    const day = DAYS[new Date(`${d.day}T12:00:00`).getDay()];
    return `<rect x="${i * bw + 3}" y="${H - 20 - bh}" width="${bw - 6}" height="${Math.max(bh, d.xp ? 2 : 0)}" rx="3" class="bar${d.xp >= p.dailyGoal ? ' met' : ''}"><title>${d.day} : ${d.xp} XP</title></rect>
      <text x="${i * bw + bw / 2}" y="${H - 6}" class="bar-label">${day}</text>`;
  }).join('');
  return html(`<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="XP des 14 derniers jours">
    <line x1="0" x2="${W}" y1="${goalY}" y2="${goalY}" class="goal-line"/>
    <text x="${W - 2}" y="${goalY - 4}" class="goal-label" text-anchor="end">objectif ${p.dailyGoal}</text>
    ${bars}</svg>`);
}

export function progressScreen(root, _args, app) {
  const p = app.profile;
  const acc = p.stats.answers ? Math.round((100 * p.stats.correct) / p.stats.answers) : 0;
  const hours = Math.floor(p.stats.seconds / 3600);
  const mins = Math.round((p.stats.seconds % 3600) / 60);
  const mastered = SKILLS.filter((s) => p.skills[s.id]?.mastered).length;
  const main = h('main.page',
    h('h1', 'Mes progrès'),
    h('div.tiles',
      h('div.tile', h('small', 'XP total'), h('b', String(p.xp))),
      h('div.tile', h('small', 'Aujourd\'hui'), h('b', `${xpToday(p)}/${p.dailyGoal}`)),
      h('div.tile', h('small', 'Série'), h('b', `🔥 ${currentStreak(p).count}`), h('small', `record ${p.streak.best}`)),
      h('div.tile', h('small', 'Compétences'), h('b', `👑 ${mastered}/${SKILLS.length}`)),
      h('div.tile', h('small', 'Réussite'), h('b', `${acc} %`), h('small', `${p.stats.answers} réponses`)),
      h('div.tile', h('small', 'Temps'), h('b', hours ? `${hours} h ${mins}` : `${mins} min`), h('small', `${p.stats.lessons} leçons`))),
    h('section', h('h2', 'XP des 14 derniers jours'), xpChart(p)),
    h('section', h('h2', 'Compétences'),
      UNITS.map((u) => h('div.skill-unit',
        h('h3.skill-unit-title', { style: { '--unit': u.color } }, u.title),
        h('div.skill-list', unitSkills(u.id).map((s) => {
          const st = p.skills[s.id];
          const unlocked = isUnlocked(p, s.id);
          return h(`div.skill-row${unlocked ? '' : '.locked'}`,
            h('span.skill-icon', unlocked ? s.icon : '🔒'),
            h('div.skill-main', h('b', s.title),
              s.facts ? factCount(p, s.id) : null,
              h('div.meter', h('div.meter-fill', { style: { width: `${Math.round((st?.p ?? 0) * 100)}%` } }))),
            h('div.skill-side', starRow(stars(st)), st ? h('small', st.testedOut && !st.attempts ? 'test' : `niv. ${st.level}`) : null));
        }))))),
    h('section', h('h2', 'Succès'),
      h('div.badges', BADGES.map((b) => h(`div.badge-card${p.badges[b.id] ? '.earned' : ''}`, h('span.badge-icon', p.badges[b.id] ? b.icon : '🔒'), h('b', b.name), h('small', b.desc))))));
  root.append(topBar(app), main, bottomNav(app, 'progress'));
}

// "32 / 55 faits automatiques" for times tables and other fact skills.
function factCount(p, skillId) {
  const keys = skillFacts(skillId);
  const n = keys.filter((k) => isAutomatic(p, k)).length;
  return h('div.skill-facts', `${n} / ${keys.length} faits automatiques`);
}
