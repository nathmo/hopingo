// My traps: recurring mistakes to beat, and the ones already beaten.

import { h, html, bubble } from '../dom.js';
import { RULE_BY_ID, FAMILIES } from '../../math/malrules.js';
import { renderText } from '../../math/expr.js';
import { SKILL_BY_ID } from '../../content/skills.js';
import { canOpen } from '../../engine/learner.js';
import { topBar, bottomNav } from './common.js';
import { t } from '../../i18n.js';

const mathify = (s) => s.replace(/(\d+\/\d+|\d+)/g, (m) => `<span class="m">${renderText(m)}</span>`);

function trapCard(app, id, tr) {
  const r = RULE_BY_ID[id];
  const fam = FAMILIES[r.family];
  const days = tr.clearDays?.length || 0;
  const canTrain = canOpen(app.profile, r.skill);
  let explain = '';
  try { explain = r.op ? '' : r.explain(); } catch { explain = ''; }
  return h(`div.trap-card${tr.active ? '.active' : '.cleared'}`,
    h('div.trap-top', h('span.trap-icon', tr.active ? '🪤' : '🏅'), h('div', h('h3', r.name), h('small.muted', fam.name))),
    h('div.trap-example',
      h('div.wrongex', html(`✖ ${mathify(r.example[0])}`)),
      h('div.rightex', html(`✔ ${mathify(r.example[1])}`))),
    h('p', explain || fam.hint),
    tr.active ? h('div.trap-progress',
      h('span', t('Déjoué :')),
      [0, 1, 2].map((i) => h(`span.dot${i < days ? '.on' : ''}`)),
      h('small.muted', t('3 jours différents sans tomber dedans'))) : h('small.muted', t('Déjoué ! Il pourrait revenir si tu retombes dedans.')),
    tr.active && canTrain ? h('button.btn.secondary', { onclick: () => app.go('lesson', { kind: 'trap', rule: id }) }, t('S\'entraîner sur ce piège')) : null,
    tr.active && !canTrain ? h('small.muted', t('On le travaillera avec : {skill}', { skill: SKILL_BY_ID[r.skill].title })) : null);
}

export function trapsScreen(root, _args, app) {
  const p = app.profile;
  const entries = Object.entries(p.traps).filter(([id]) => RULE_BY_ID[id]);
  const active = entries.filter(([, tr]) => tr.active);
  const cleared = entries.filter(([, tr]) => !tr.active && tr.cleared);
  const main = h('main.page',
    h('h1', t('Mes pièges')),
    active.length
      ? bubble(t('Un piège, c\'est une erreur qui revient. Pour le déjouer, réussis les questions qui le tendent sur <b>3 jours différents</b>.'), 'think')
      : bubble(entries.length ? t('Aucun piège actif : bravo !') : t('Pas encore de piège repéré. Quand une même erreur revient deux fois, je la note ici pour qu\'on la travaille.'), 'happy'),
    active.length ? h('section', h('h2', t('À déjouer ({n})', { n: active.length })), active.map(([id, tr]) => trapCard(app, id, tr))) : null,
    cleared.length ? h('section', h('h2', t('Déjoués ({n})', { n: cleared.length })), cleared.map(([id, tr]) => trapCard(app, id, tr))) : null);
  root.append(topBar(app), main, bottomNav(app, 'traps'));
}
