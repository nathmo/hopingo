// XP, daily goal, streak (with freezes) and badges.

import { unitSkills } from '../content/skills.js';
import { dayKey, daysBetween } from './time.js';
import { t } from '../i18n.js';

export const DAILY_GOALS = [
  { xp: 20, label: t('Tranquille') },
  { xp: 30, label: t('Régulier') },
  { xp: 50, label: t('Sérieux') },
  { xp: 80, label: t('Intense') },
];

export const BADGES = [
  { id: 'first', icon: '🌱', name: t('Premier pas'), desc: t('Termine ta première leçon.'), check: (p) => p.stats.lessons >= 1 },
  { id: 'perfect', icon: '💯', name: t('Sans faute'), desc: t('Termine une leçon sans erreur.'), check: (p) => p.stats.perfect >= 1 },
  { id: 'streak3', icon: '🔥', name: t('Trois jours'), desc: t('Une série de 3 jours.'), check: (p) => p.streak.best >= 3 },
  { id: 'streak7', icon: '🔥', name: t('Une semaine'), desc: t('Une série de 7 jours.'), check: (p) => p.streak.best >= 7 },
  { id: 'streak30', icon: '🏔️', name: t('Un mois'), desc: t('Une série de 30 jours.'), check: (p) => p.streak.best >= 30 },
  { id: 'crown', icon: '👑', name: t('Première couronne'), desc: t('Maîtrise une compétence.'), check: (p) => Object.values(p.skills).some((s) => s.mastered && !s.testedOut) },
  { id: 'trap', icon: '🪤', name: t('Piège déjoué'), desc: t('Déjoue un piège.'), check: (p) => Object.values(p.traps).some((x) => x.cleared) },
  { id: 'steps10', icon: '🧠', name: t('Sans brouillon'), desc: t('Réussis 10 calculs en plusieurs étapes.'), check: (p) => p.stats.steps >= 10 },
  { id: 'xp500', icon: '⭐', name: t('500 XP'), desc: t('Gagne 500 XP.'), check: (p) => p.xp >= 500 },
  { id: 'calcul', icon: '⚡', name: t('Calcul éclair'), desc: t('Maîtrise toutes les compétences de calcul mental.'), check: (p) => unitMastered(p, 'calcul') },
  { id: 'fractions', icon: '🏆', name: t('Maître des fractions'), desc: t('Maîtrise toutes les compétences sur les fractions.'), check: (p) => unitMastered(p, 'fractions') },
  { id: 'relatifs', icon: '🌡️', name: t('Sous zéro'), desc: t('Maîtrise toutes les compétences sur les nombres relatifs.'), check: (p) => unitMastered(p, 'relatifs') },
  { id: 'puissances', icon: '🚀', name: t('Puissance 10'), desc: t('Maîtrise toutes les compétences sur les puissances.'), check: (p) => unitMastered(p, 'puissances') },
  { id: 'arithmetique', icon: '🔢', name: t('Chasseur de premiers'), desc: t('Maîtrise les diviseurs et les nombres premiers.'), check: (p) => unitMastered(p, 'arithmetique') },
  { id: 'proportion', icon: '⚖️', name: t('Juste proportion'), desc: t('Maîtrise la proportionnalité et les pourcentages.'), check: (p) => unitMastered(p, 'proportion') },
  { id: 'unites', icon: '📏', name: t('Grand convertisseur'), desc: t('Maîtrise les grandeurs et les unités.'), check: (p) => unitMastered(p, 'unites') },
  { id: 'algebre', icon: '🔤', name: t('Lettres en folie'), desc: t('Maîtrise le calcul littéral.'), check: (p) => unitMastered(p, 'algebre') },
  { id: 'factorisation', icon: '🧲', name: t('Mise en évidence'), desc: t('Maîtrise la factorisation.'), check: (p) => unitMastered(p, 'factorisation') },
  { id: 'equations', icon: '⚖', name: t('Équilibriste'), desc: t('Maîtrise les équations.'), check: (p) => unitMastered(p, 'equations') },
  { id: 'formules', icon: '🔧', name: t('Démonteur de formules'), desc: t('Maîtrise l\'isolation de variables.'), check: (p) => unitMastered(p, 'formules') },
  { id: 'geometrie', icon: '📐', name: t('Géomètre'), desc: t('Maîtrise la géométrie calculée.'), check: (p) => unitMastered(p, 'geometrie') },
  { id: 'fonctions', icon: '📈', name: t('Lecteur de courbes'), desc: t('Maîtrise les fonctions.'), check: (p) => unitMastered(p, 'fonctions') },
  { id: 'second', icon: '🎯', name: t('Discriminant'), desc: t('Maîtrise les équations du 2e degré.'), check: (p) => unitMastered(p, 'second') },
  { id: 'rationnelles', icon: '➗', name: t('Sans division par zéro'), desc: t('Maîtrise les fractions rationnelles.'), check: (p) => unitMastered(p, 'rationnelles') },
  { id: 'synthese', icon: '🏔️', name: t('Le sommet'), desc: t('Résous le problème final avec paramètres.'), check: (p) => unitMastered(p, 'synthese') },
  { id: 'melanges', icon: '🧩', name: t('Touche-à-tout'), desc: t('Maîtrise les calculs mélangés.'), check: (p) => unitMastered(p, 'melanges') },
  { id: 'racines', icon: '🌳', name: t('Aux racines'), desc: t('Maîtrise toutes les compétences sur les racines carrées.'), check: (p) => unitMastered(p, 'racines') },
];

function unitMastered(p, unitId) {
  return unitSkills(unitId).every((s) => p.skills[s.id]?.mastered);
}

export function newProfileData() {
  return {
    xp: 0, xpByDay: {}, dailyGoal: 30,
    streak: { count: 0, best: 0, lastDay: null, freezes: 0, frozenDays: [] },
    skills: {}, traps: {}, badges: {}, facts: {},
    stats: { lessons: 0, perfect: 0, answers: 0, correct: 0, steps: 0, seconds: 0 },
    placement: { done: false },
    settings: { sound: true },
  };
}

export const xpToday = (p) => p.xpByDay[dayKey()] || 0;

// The streak as it stands today: kept if the last lesson was today or
// yesterday, or if freezes cover the missed days.
export function currentStreak(p) {
  const s = p.streak;
  if (!s.lastDay) return { count: 0, today: false, atRisk: false };
  const gap = daysBetween(s.lastDay, dayKey());
  if (gap === 0) return { count: s.count, today: true, atRisk: false };
  if (gap === 1) return { count: s.count, today: false, atRisk: true };
  if (gap - 1 <= s.freezes) return { count: s.count, today: false, atRisk: true, frozen: gap - 1 };
  return { count: 0, today: false, atRisk: false, lost: s.count };
}

function updateStreak(p) {
  const s = p.streak;
  const today = dayKey();
  if (s.lastDay === today) return null;
  let event = null;
  const gap = s.lastDay ? daysBetween(s.lastDay, today) : null;
  if (gap === 1 || gap === null) {
    s.count += 1;
  } else if (gap > 1 && gap - 1 <= s.freezes) {
    s.freezes -= gap - 1;
    s.count += 1;
    event = { type: 'freezeUsed', days: gap - 1 };
  } else {
    s.count = 1;
  }
  s.lastDay = today;
  s.best = Math.max(s.best, s.count);
  if (s.count % 7 === 0 && s.freezes < 2) {
    s.freezes += 1;
    event = { type: 'freezeEarned' };
  }
  return event || { type: 'streak', count: s.count };
}

export function addXp(p, xp) {
  const today = dayKey();
  p.xp += xp;
  p.xpByDay[today] = (p.xpByDay[today] || 0) + xp;
}

// Applies a finished lesson summary. Returns {streakEvent, newBadges, goalReached}.
export function finishLesson(p, summary) {
  const before = xpToday(p);
  addXp(p, summary.xp);
  p.stats.lessons += 1;
  if (summary.perfect) p.stats.perfect += 1;
  p.stats.answers += summary.total;
  p.stats.correct += summary.correct;
  p.stats.steps += summary.steps || 0;
  p.stats.seconds += summary.seconds || 0;
  const streakEvent = updateStreak(p);
  const goalReached = before < p.dailyGoal && xpToday(p) >= p.dailyGoal;
  return { streakEvent, newBadges: checkBadges(p), goalReached };
}

export function checkBadges(p) {
  const earned = [];
  for (const b of BADGES) {
    if (!p.badges[b.id] && b.check(p)) {
      p.badges[b.id] = dayKey();
      earned.push(b);
    }
  }
  return earned;
}

// XP per day for the last n days, oldest first.
export function xpHistory(p, n = 14) {
  const out = [];
  const now = Date.now();
  for (let i = n - 1; i >= 0; i--) {
    const k = dayKey(now - i * 24 * 3600 * 1000);
    out.push({ day: k, xp: p.xpByDay[k] || 0 });
  }
  return out;
}
