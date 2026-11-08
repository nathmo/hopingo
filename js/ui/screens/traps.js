// My traps: recurring mistakes to beat, and the ones already beaten.

import { h, html, bubble } from '../dom.js';
import { RULE_BY_ID, FAMILIES } from '../../math/malrules.js';
import { renderText } from '../../math/expr.js';
import { SKILL_BY_ID } from '../../content/skills.js';
import { isUnlocked } from '../../engine/learner.js';
import { topBar, bottomNav } from './common.js';

const mathify = (s) => s.replace(/(\d+\/\d+|\d+)/g, (m) => `<span class="m">${renderText(m)}</span>`);

function trapCard(app, id, tr) {
  const r = RULE_BY_ID[id];
  const fam = FAMILIES[r.family];
  const days = tr.clearDays?.length || 0;
  const canTrain = isUnlocked(app.profile, r.skill);
  let explain = '';
  try { explain = r.op ? '' : r.explain(); } catch { explain = ''; }
  return h(`div.trap-card${tr.active ? '.active' : '.cleared'}`,
    h('div.trap-top', h('span.trap-icon', tr.active ? '🪤' : '🏅'), h('div', h('h3', r.name), h('small.muted', fam.name))),
    h('div.trap-example',
      h('div.wrongex', html(`✖ ${mathify(r.example[0])}`)),
      h('div.rightex', html(`✔ ${mathify(r.example[1])}`))),
    h('p', explain || fam.hint),
    tr.active ? h('div.trap-progress',
      h('span', 'Déjoué :'),
      [0, 1, 2].map((i) => h(`span.dot${i < days ? '.on' : ''}`)),
      h('small.muted', '3 jours différents sans tomber dedans')) : h('small.muted', 'Déjoué ! Il pourrait revenir si tu retombes dedans.'),
    tr.active && canTrain ? h('button.btn.secondary', { onclick: () => app.go('lesson', { kind: 'trap', rule: id }) }, 'S\'entraîner sur ce piège') : null,
    tr.active && !canTrain ? h('small.muted', `On le travaillera avec : ${SKILL_BY_ID[r.skill].title}`) : null);
}

export function trapsScreen(root, _args, app) {
  const p = app.profile;
  const entries = Object.entries(p.traps).filter(([id]) => RULE_BY_ID[id]);
  const active = entries.filter(([, t]) => t.active);
  const cleared = entries.filter(([, t]) => !t.active && t.cleared);
  const main = h('main.page',
    h('h1', 'Mes pièges'),
    active.length
      ? bubble('Un piège, c\'est une erreur qui revient. Pour le déjouer, réussis les questions qui le tendent sur <b>3 jours différents</b>.', 'think')
      : bubble(entries.length ? 'Aucun piège actif : bravo !' : 'Pas encore de piège repéré. Quand une même erreur revient deux fois, je la note ici pour qu\'on la travaille.', 'happy'),
    active.length ? h('section', h('h2', `À déjouer (${active.length})`), active.map(([id, t]) => trapCard(app, id, t))) : null,
    cleared.length ? h('section', h('h2', `Déjoués (${cleared.length})`), cleared.map(([id, t]) => trapCard(app, id, t))) : null);
  root.append(topBar(app), main, bottomNav(app, 'traps'));
}
