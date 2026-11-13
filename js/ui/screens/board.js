// « Classement »: the class on this computer — group flame, common quest and
// the ranking of the week. Everything comes from the profiles of this device.

import { h, bubble } from '../dom.js';
import { currentStreak } from '../../engine/rewards.js';
import { members, weeklyRanking, groupFlame, weeklyQuest, MAX_SAVES, WEEKS_PER_SAVE } from '../../engine/social.js';
import { topBar, bottomNav } from './common.js';
import { t, tn } from '../../i18n.js';

const LAST = {
  grew: () => t('La semaine dernière, tout le monde a joué : la flamme grandit !'),
  saved: () => t('La semaine dernière, un sauve-flamme a protégé la flamme.'),
  lost: () => t('La flamme s\'est éteinte la semaine dernière. On la rallume ensemble ?'),
};

const faces = (list, cls) => h(`div.board-faces${cls}`, list.map((p) => h('span.avatar.small', { title: p.name }, p.avatar)));

function flameCard(flame) {
  const active = flame.done.length + flame.missing.length;
  return h(`section.board-card.flame${flame.weeks ? '.lit' : ''}`,
    h('div.flame-head',
      h('span.flame-icon', '🔥'),
      h('div',
        h('b.flame-count', tn(flame.weeks, '{n} semaine', '{n} semaines')),
        h('small.muted', t('Flamme de groupe'))),
      h('span.flame-saves', { title: t('Sauve-flammes : protègent la flamme une semaine où quelqu\'un n\'a pas joué') },
        Array.from({ length: MAX_SAVES }, (_, i) => h(`span.save${i < flame.saves ? '.on' : ''}`, '🛡️')))),
    flame.last ? h('p.flame-last', LAST[flame.last]()) : null,
    active ? h('div.flame-week',
      h('p', h('b', t('Cette semaine : {done}/{all} ont joué', { done: flame.done.length, all: active }))),
      faces(flame.done, '.played'),
      flame.missing.length ? h('small.muted', t('Pas encore joué :')) : null,
      flame.missing.length ? faces(flame.missing, '.not-yet') : null) : null,
    h('small.muted.flame-rule', t('La flamme grandit chaque semaine où tout le monde fait au moins une leçon. Toutes les {k} semaines, vous gagnez un sauve-flamme (au plus {max}).', { k: WEEKS_PER_SAVE, max: MAX_SAVES })));
}

function questCard(quest) {
  const f = Math.min(1, quest.done / quest.target);
  return h(`section.board-card.quest${f >= 1 ? '.won' : ''}`,
    h('p', h('b', t('Quête commune')), ' — ', t('ensemble {target} XP cette semaine', { target: quest.target })),
    h('div.quest-bar', h('div.quest-fill', { style: { width: `${Math.round(100 * f)}%` } })),
    h('small.muted', f >= 1 ? t('Quête réussie, bravo à toute la classe !') : t('{done} / {target} XP', quest)));
}

function rankingCard(app, rows) {
  return h('section.board-card',
    h('h2', t('Classement de la semaine')),
    h('small.muted', t('Les XP depuis lundi : tout le monde repart de zéro chaque semaine.')),
    h('ol.board-rank', rows.map((r) => h(`li${r.profile.id === app.profile.id ? '.me' : ''}`,
      h('span.rank', String(r.rank)),
      h('span.avatar.small', r.profile.avatar),
      h('span.board-name', h('b', r.profile.name), h('small.muted', t('{total} XP en tout', { total: r.total }))),
      h('span.streak', `🔥 ${currentStreak(r.profile).count}`),
      h('b.week-xp', `${r.xp} XP`)))));
}

export function boardScreen(root, _args, app) {
  const all = app.store.listProfiles();
  const main = h('main.page.board', h('h1', t('Classement')));
  if (members(all).length < 2) {
    main.append(bubble(t('Le classement apparaît dès que deux profils jouent sur cet ordinateur. Ajoute un camarade depuis « Qui joue ? ».'), 'think'));
  } else {
    main.append(flameCard(groupFlame(all)), questCard(weeklyQuest(all)), rankingCard(app, weeklyRanking(all)));
  }
  root.append(topBar(app), main, bottomNav(app, 'board'));
}
