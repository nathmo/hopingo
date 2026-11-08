// Who is playing? Several profiles per device.

import { h, add, mascot, bubble } from '../dom.js';
import { AVATARS } from '../../store.js';
import { YEARS, TRACKS } from '../../content/skills.js';
import { currentStreak } from '../../engine/rewards.js';

export function profilesScreen(root, _args, app) {
  const list = app.store.listProfiles();
  root.append(
    h('div.page.center',
      h('div.brand', mascot('happy', 110), h('h1', 'Hopingo'), h('p.muted', 'Fractions, relatifs, puissances, racines : une étape à la fois.')),
      h('h2', 'Qui joue ?'),
      h('div.profile-list', list.map((p) => h('button.profile-card', {
        type: 'button',
        onclick: () => { app.store.setActive(p.id); app.go(p.placement.done ? 'home' : 'skimIntro'); },
      },
      h('span.avatar', p.avatar),
      h('span.profile-name', p.name),
      h('span.profile-meta', `${YEARS.find((y) => y.id === p.year)?.label ?? ''} · 🔥 ${currentStreak(p).count}`)))),
      h('button.btn.ghost.wide', { onclick: () => app.go('create') }, '+ Ajouter un profil')));
}

export function createProfileScreen(root, _args, app) {
  const form = { name: '', avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)], year: null, track: 'unknown' };
  const page = h('div.page');
  const draw = () => {
    page.innerHTML = '';
    const nameInput = h('input.text', { type: 'text', maxlength: 20, placeholder: 'Ton prénom', value: form.name, autocomplete: 'off' });
    nameInput.addEventListener('input', () => { form.name = nameInput.value; go.disabled = !ready(); });
    const ready = () => form.name.trim() && form.year;
    const go = h('button.btn.primary.wide', {
      disabled: !ready(),
      onclick: () => {
        app.store.createProfile({ name: form.name.trim(), avatar: form.avatar, year: form.year, track: form.year >= 9 ? form.track : 'unknown' });
        app.go('skimIntro');
      },
    }, 'C\'est parti !');
    add(page,
      app.store.listProfiles().length ? h('button.back', { onclick: () => app.go('profiles') }, '←') : null,
      bubble('Salut ! Moi c\'est <b>Hopingo</b>. Je vais t\'aider à devenir fort·e en calcul. Comment tu t\'appelles ?'),
      h('label.field', 'Prénom', nameInput),
      h('div.field', h('span', 'Ton avatar'), h('div.avatar-grid', AVATARS.map((a) => h(`button.avatar-pick${a === form.avatar ? '.selected' : ''}`, {
        type: 'button', onclick: () => { form.avatar = a; draw(); },
      }, a)))),
      h('div.field', h('span', 'Ta classe'), h('div.chip-row', YEARS.map((y) => h(`button.chip${y.id === form.year ? '.selected' : ''}`, {
        type: 'button', onclick: () => { form.year = y.id; draw(); },
      }, h('b', y.label), h('small', y.age))))),
      form.year >= 9 ? h('div.field', h('span', 'Ton niveau en maths'), h('div.chip-row.wrap', TRACKS.map((t) => h(`button.chip${t.id === form.track ? '.selected' : ''}`, {
        type: 'button', onclick: () => { form.track = t.id; draw(); },
      }, t.label))), h('small.muted', 'Selon ton canton : A/B/C, VP/VG, LS/LC… Ce n\'est qu\'un point de départ.')) : null,
      go);
    if (!form.name) setTimeout(() => nameInput.focus(), 50);
  };
  draw();
  root.append(page);
}
