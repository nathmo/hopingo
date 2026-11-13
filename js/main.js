// App shell: a tiny router between screens.

import * as store from './store.js';
import { setSound } from './ui/dom.js';
import { t, LANG } from './i18n.js';
import { adoptNewSkills } from './engine/learner.js';
import { profilesScreen, createProfileScreen } from './ui/screens/profiles.js';
import { homeScreen } from './ui/screens/home.js';
import { lessonScreen } from './ui/screens/lesson.js';
import { skimIntroScreen, skimScreen } from './ui/screens/skim.js';
import { trapsScreen } from './ui/screens/traps.js';
import { progressScreen } from './ui/screens/progress.js';
import { settingsScreen } from './ui/screens/settings.js';
import { examScreen } from './ui/screens/exam.js';

const SCREENS = {
  profiles: profilesScreen,
  create: createProfileScreen,
  home: homeScreen,
  lesson: lessonScreen,
  skimIntro: skimIntroScreen,
  skim: skimScreen,
  traps: trapsScreen,
  progress: progressScreen,
  settings: settingsScreen,
  // Step U3: the mock exams.
  exam: examScreen,
};

// The page in the chosen language (js/i18n.js).
document.documentElement.lang = LANG;
document.title = t('Hopingo — le calcul en jouant');

const root = document.getElementById('app');
let cleanup = null;

export const app = {
  store,
  get profile() { return store.activeProfile(); },
  save: () => store.save(),
  go(name, args = {}) {
    cleanup?.();
    cleanup = null;
    if (!['profiles', 'create'].includes(name) && !store.activeProfile()) name = store.listProfiles().length ? 'profiles' : 'create';
    if (store.activeProfile()) {
      setSound(store.activeProfile().settings.sound !== false);
      if (adoptNewSkills(store.activeProfile())) store.save();
    }
    root.innerHTML = '';
    root.className = `screen-${name}`;
    const result = SCREENS[name](root, args, app);
    if (typeof result === 'function') cleanup = result;
    window.scrollTo(0, 0);
  },
};

const start = () => {
  const p = store.activeProfile();
  if (!p) app.go(store.listProfiles().length ? 'profiles' : 'create');
  else if (!p.placement.done) app.go('skimIntro');
  else app.go('home');
};

start();
