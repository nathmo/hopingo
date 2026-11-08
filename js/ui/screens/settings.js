// Settings: daily goal, sound, save codes, profiles.

import { h, toast, confirmBox, setSound } from '../dom.js';
import { DAILY_GOALS } from '../../engine/rewards.js';
import { topBar, bottomNav } from './common.js';

export function settingsScreen(root, _args, app) {
  const p = app.profile;
  const main = h('main.page');
  const draw = () => {
    main.innerHTML = '';
    const code = app.store.exportCode(p);
    const codeBox = h('textarea.code', { readonly: true, rows: 3 }, code);
    const importBox = h('textarea.code', { rows: 3, placeholder: 'Colle ici un code HOPINGO1-…' });
    const fileInput = h('input', { type: 'file', accept: '.txt,text/plain', style: { display: 'none' } });
    fileInput.addEventListener('change', async () => {
      const f = fileInput.files[0];
      if (f) { importBox.value = await f.text(); doImport(); }
    });
    const doImport = () => {
      try {
        const prof = app.store.importCode(importBox.value);
        toast(`Profil de ${prof.name} chargé !`, 'good');
        app.go('home');
      } catch (e) { toast(e.message, 'bad'); }
    };
    main.append(
      h('h1', 'Réglages'),
      h('section', h('h2', 'Objectif du jour'),
        h('div.chip-row.wrap', DAILY_GOALS.map((g) => h(`button.chip${p.dailyGoal === g.xp ? '.selected' : ''}`, {
          onclick: () => { p.dailyGoal = g.xp; app.save(); draw(); },
        }, h('b', `${g.xp} XP`), h('small', g.label))))),
      h('section', h('h2', 'Son'),
        h('label.switch', h('input', {
          type: 'checkbox', checked: p.settings.sound !== false,
          onchange: (e) => { p.settings.sound = e.target.checked; setSound(e.target.checked); app.save(); },
        }), h('span', 'Effets sonores'))),
      h('section', h('h2', 'Sauvegarde'),
        h('p.muted', 'Ta progression est enregistrée dans ce navigateur. Pour la garder en sécurité ou continuer sur un autre appareil, copie ce code (ou télécharge-le) et colle-le là-bas.'),
        codeBox,
        h('div.row',
          h('button.btn.secondary', {
            onclick: async () => {
              try { await navigator.clipboard.writeText(code); toast('Code copié !', 'good'); } catch { codeBox.select(); toast('Sélectionne le code et copie-le.'); }
            },
          }, '📋 Copier'),
          h('button.btn.secondary', {
            onclick: () => {
              const a = h('a', { href: URL.createObjectURL(new Blob([code], { type: 'text/plain' })), download: `hopingo-${p.name}.txt` });
              a.click();
            },
          }, '⬇ Télécharger')),
        h('h3', 'Charger un code'),
        importBox,
        h('div.row',
          h('button.btn.secondary', { onclick: doImport }, 'Charger'),
          h('button.btn.ghost', { onclick: () => fileInput.click() }, 'Depuis un fichier'), fileInput)),
      h('section', h('h2', 'Profils'),
        h('div.row',
          h('button.btn.secondary', { onclick: () => app.go('profiles') }, 'Changer de profil'),
          h('button.btn.danger', {
            onclick: async () => {
              if (await confirmBox(`Supprimer le profil de ${p.name} ? Toute sa progression sera perdue (sauf si tu as gardé son code).`, 'Supprimer')) {
                app.store.deleteProfile(p.id);
                app.go('profiles');
              }
            },
          }, 'Supprimer ce profil'))),
      h('p.muted.small', 'Hopingo fonctionne sans serveur : aucune donnée ne quitte cet appareil.'));
  };
  draw();
  root.append(topBar(app), main, bottomNav(app, 'settings'));
}
