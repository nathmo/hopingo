// First use: a quick skim to find where to start on the path.

import { h, html, play, bubble } from '../dom.js';
import { mountExercise } from '../exercises.js';
import { Skim } from '../../engine/placement.js';
import { applyPlacement, isSlow, newSkillState } from '../../engine/learner.js';
import { makeRng } from '../../content/random.js';
import { SKILL_BY_ID, SKILLS, UNITS } from '../../content/skills.js';
import { t, tn } from '../../i18n.js';

export function skimIntroScreen(root, _args, app) {
  const p = app.profile;
  root.append(h('div.page.center',
    bubble(t('Enchanté, <b>{name}</b> ! Pour ne pas te faire refaire ce que tu sais déjà, je te pose quelques questions rapides. Pas de stress : ça sert juste à choisir où commencer.', { name: p.name })),
    h('button.btn.primary.wide', { onclick: () => app.go('skim') }, t('Test rapide (2 minutes)')),
    h('button.btn.ghost.wide', {
      onclick: () => { applyPlacement(p, 0); app.save(); app.go('home'); },
    }, t('Commencer depuis le début'))));
}

// args.unit: the placement of one unit only (« Je connais déjà ce module »).
export function skimScreen(root, args, app) {
  const p = app.profile;
  const unit = args?.unit ? UNITS.find((u) => u.id === args.unit) : null;
  const skim = new Skim(p, makeRng(), { unit: unit?.id ?? null });
  const bar = h('div.progress', h('div.progress-fill'));
  const body = h('main.lesson-body');
  const foot = h('footer.lesson-foot');
  const panel = h('div.feedback');
  root.append(h('header.lesson-top', h('span.skim-title', unit ? t('Test : {unit}', { unit: unit.title }) : t('Test rapide')), bar), body, foot, panel);
  let item;
  let ctrl;
  let t0;
  let checkBtn;
  let answered = false;

  const next = () => {
    panel.className = 'feedback';
    panel.innerHTML = '';
    answered = false;
    bar.firstChild.style.width = `${Math.round(skim.progress * 100)}%`;
    item = skim.next();
    body.innerHTML = '';
    foot.innerHTML = '';
    if (!item) return finish();
    window.__hopingoItem = item; // debug hook for automated checks
    ctrl = mountExercise(item, {
      ready: (ok) => { if (checkBtn) checkBtn.disabled = !ok; },
      submit: () => check(),
      complete: (o) => shown(o),
    });
    body.append(ctrl.el);
    if (ctrl.footer) foot.append(ctrl.footer);
    checkBtn = ctrl.ownFlow ? null : h('button.btn.primary.wide', { disabled: true, onclick: () => check() }, t('Vérifier'));
    if (checkBtn) foot.append(checkBtn);
    foot.append(h('button.btn.ghost.small', { onclick: () => shown({ correct: false, rules: [] }) }, t('Je ne sais pas encore')));
    t0 = performance.now();
  };

  const check = () => {
    const o = ctrl.check();
    if (!o) return;
    if (o.stayOpen) { shown({ correct: true, rules: [] }); return; }
    shown(o);
  };

  const shown = (o) => {
    if (answered) return;
    answered = true;
    const rt = (performance.now() - t0) / 1000;
    const slow = o.correct && isSlow(newSkillState(), rt, item.expectedSec * 1.5);
    skim.answer(item, { correct: o.correct, slow, rules: o.rules, ambiguous: o.ambiguous });
    app.save();
    play(o.correct ? 'good' : 'tap');
    panel.className = `feedback show ${o.correct ? 'good' : 'neutral'}`;
    panel.innerHTML = '';
    panel.append(h('div.fb-head', h('h3', o.correct ? t('Bien !') : t('D\'accord, on verra ça ensemble.'))),
      h('button.btn.wide.primary', { onclick: next }, t('Suivant')));
  };

  const finish = () => {
    const { skill } = skim.finish();
    app.save();
    play('done');
    const known = SKILLS.filter((s) => p.skills[s.id]?.testedOut && (!unit || s.unit === unit.id)).length;
    body.append(h('div.done',
      bubble(skill
        ? (known
          ? tn(known, 'Merci ! Tu connais déjà <b>{n} étape</b> du chemin : je les mets de côté (on les révisera vite fait). On commence par : <b>{skill}</b>.',
            'Merci ! Tu connais déjà <b>{n} étapes</b> du chemin : je les mets de côté (on les révisera vite fait). On commence par : <b>{skill}</b>.', { skill: SKILL_BY_ID[skill].title })
          : t('Merci ! On commence par : <b>{skill}</b>.', { skill: SKILL_BY_ID[skill].title }))
        : t('Impressionnant, tu sais déjà tout ! On va réviser pour garder tout ça.'))));
    foot.append(h('button.btn.primary.wide', { onclick: () => app.go('home') }, t('Voir mon chemin')));
  };

  const onKey = (e) => {
    if (e.target.tagName === 'INPUT') return;
    if (answered && e.key === 'Enter') { e.preventDefault(); next(); return; }
    if (!answered && e.key === 'Enter' && ctrl && !ctrl.ownFlow) { e.preventDefault(); check(); return; }
    if (e.key === 'Enter') e.preventDefault();
    if (!answered) ctrl?.onKey?.(e);
  };
  document.addEventListener('keydown', onKey);
  next();
  return () => document.removeEventListener('keydown', onKey);
}

export { html };
