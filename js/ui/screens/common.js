// Pieces shared by the main screens: top bar and bottom navigation.

import { h, html } from '../dom.js';
import { currentStreak, xpToday } from '../../engine/rewards.js';
import { activeTraps } from '../../engine/learner.js';
import { t } from '../../i18n.js';

function ring(value, max) {
  const r = 15;
  const c = 2 * Math.PI * r;
  const f = Math.min(1, value / max);
  return html(`<svg class="ring" viewBox="0 0 40 40" width="40" height="40">
    <circle cx="20" cy="20" r="${r}" class="ring-bg"/>
    <circle cx="20" cy="20" r="${r}" class="ring-fg${f >= 1 ? ' full' : ''}" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - f)}"/>
  </svg>`);
}

export function topBar(app) {
  const p = app.profile;
  const s = currentStreak(p);
  const xp = xpToday(p);
  const traps = activeTraps(p).length;
  return h('header.topbar',
    h('button.who', { onclick: () => app.go('profiles'), title: t('Changer de profil') }, h('span.avatar.small', p.avatar), h('span', p.name)),
    h('div.stats',
      h(`span.stat.streak${s.today ? '.lit' : ''}`, { title: s.today ? t('Série de jours') : t('Fais une leçon aujourd\'hui pour garder ta série') }, '🔥', h('b', String(s.count)), p.streak.freezes ? h('small', `❄${p.streak.freezes}`) : null),
      h('button.stat.goal', { onclick: () => app.go('progress'), title: t('Objectif du jour : {xp}/{goal} XP', { xp, goal: p.dailyGoal }) }, ring(xp, p.dailyGoal), h('b', `${xp}`)),
      h(`button.stat.traps${traps ? '.has' : ''}`, { onclick: () => app.go('traps'), title: t('Mes pièges') }, '🪤', h('b', String(traps)))));
}

export function bottomNav(app, current) {
  const item = (name, icon, label) => h(`button.nav-item${current === name ? '.active' : ''}`, { onclick: () => app.go(name) }, h('span.nav-icon', icon), h('span', label));
  return h('nav.bottomnav',
    item('home', '🧭', t('Chemin')),
    item('traps', '🪤', t('Pièges')),
    item('progress', '📈', t('Progrès')),
    item('settings', '⚙️', t('Réglages')));
}

export const starRow = (n) => h('span.stars', [0, 1, 2].map((i) => h(`span.star${i < n ? '.on' : ''}`, '★')));
