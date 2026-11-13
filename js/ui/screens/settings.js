// Settings: language, daily goal, sound, save file, profiles.

import { h, toast, confirmBox, setSound } from '../dom.js';
import { DAILY_GOALS } from '../../engine/rewards.js';
import { topBar, bottomNav } from './common.js';
import { t, LANG, LANGS, setLang } from '../../i18n.js';

// The language of the device (not of the profile): changing it reloads.
export function languagePicker() {
  return h('div.chip-row', LANGS.map((l) => h(`button.chip${l.id === LANG ? '.selected' : ''}`, {
    type: 'button', lang: l.id, onclick: () => { if (l.id !== LANG) setLang(l.id); },
  }, h('b', l.label))));
}

// Downloads the save file of a profile.
export function downloadSave(app, p) {
  const url = URL.createObjectURL(new Blob([app.store.exportFile(p)], { type: 'application/json' }));
  const a = h('a', { href: url, download: app.store.exportFileName(p), style: { display: 'none' } });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

// A hidden file input that loads a save file (or an old code in a .txt).
export function saveFileInput(app) {
  const input = h('input', { type: 'file', accept: '.json,.txt,application/json,text/plain', style: { display: 'none' } });
  input.addEventListener('change', async () => {
    const f = input.files[0];
    input.value = '';
    if (!f) return;
    try {
      const prof = app.store.importSave(await f.text());
      toast(t('Profil de {name} chargé !', { name: prof.name }), 'good');
      app.go('home');
    } catch (e) { toast(e.message, 'bad'); }
  });
  return input;
}

export function settingsScreen(root, _args, app) {
  const p = app.profile;
  const main = h('main.page');
  const draw = () => {
    main.innerHTML = '';
    const fileInput = saveFileInput(app);
    main.append(
      h('h1', t('Réglages')),
      h('section', h('h2', t('Langue')), languagePicker()),
      h('section', h('h2', t('Objectif du jour')),
        h('div.chip-row.wrap', DAILY_GOALS.map((g) => h(`button.chip${p.dailyGoal === g.xp ? '.selected' : ''}`, {
          onclick: () => { p.dailyGoal = g.xp; app.save(); draw(); },
        }, h('b', `${g.xp} XP`), h('small', g.label))))),
      h('section', h('h2', t('Son')),
        h('label.switch', h('input', {
          type: 'checkbox', checked: p.settings.sound !== false,
          onchange: (e) => { p.settings.sound = e.target.checked; setSound(e.target.checked); app.save(); },
        }), h('span', t('Effets sonores')))),
      h('section', h('h2', t('Sauvegarde')),
        h('p.muted', t('Ta progression est enregistrée dans ce navigateur. Pour la garder en sécurité ou continuer sur un autre appareil, télécharge le fichier de sauvegarde et charge-le là-bas.')),
        h('div.row',
          h('button.btn.secondary', { onclick: () => downloadSave(app, p) }, t('⬇ Télécharger la sauvegarde')),
          h('button.btn.ghost', { onclick: () => fileInput.click() }, t('⬆ Charger un fichier')), fileInput),
        h('p.muted.small', t('Les anciens codes HOPINGO1-… enregistrés dans un fichier .txt se chargent aussi.'))),
      h('section', h('h2', t('Profils')),
        h('div.row',
          h('button.btn.secondary', { onclick: () => app.go('profiles') }, t('Changer de profil')),
          h('button.btn.danger', {
            onclick: async () => {
              if (await confirmBox(t('Supprimer le profil de {name} ? Toute sa progression sera perdue (sauf si tu as gardé son fichier de sauvegarde).', { name: p.name }), t('Supprimer'))) {
                app.store.deleteProfile(p.id);
                app.go('profiles');
              }
            },
          }, t('Supprimer ce profil')))),
      h('p.muted.small', t('Hopingo fonctionne sans serveur : aucune donnée ne quitte cet appareil.')));
  };
  draw();
  root.append(topBar(app), main, bottomNav(app, 'settings'));
}
