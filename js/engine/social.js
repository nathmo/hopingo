// The class on one computer: weekly ranking, group flame and common quest
// between the profiles of this device. Pure functions over the profiles'
// `xpByDay`; nothing is stored and nothing leaves the device.
//
// Group flame, counted in weeks (Monday to Sunday, nobody is there on weekends):
// - a week succeeds when every active member finished at least one lesson in it;
// - a week nobody played is neutral (holidays);
// - active for a week = played in it or in one of the 2 weeks before;
// - one « sauve-flamme » per 4 successful weeks in a row (2 at most): a failed
//   week uses one and the flame stays; with none left the flame goes out.
// The current week is never judged: it shows who has played and who hasn't yet.

import { dayKey, now, DAY } from './time.js';
import { isTester } from './learner.js';

export const ACTIVE_WEEKS = 3; // this week and the 2 before
export const WEEKS_PER_SAVE = 4;
export const MAX_SAVES = 2;
export const QUEST_XP = 150; // per active member and week

const noon = (day) => new Date(`${day}T12:00:00`).getTime();
export const addDays = (day, n) => dayKey(noon(day) + n * DAY);

// The Monday of the week of `day` ('YYYY-MM-DD').
export function weekStart(day) {
  const back = (new Date(noon(day)).getDay() + 6) % 7;
  return addDays(day, -back);
}

// Everyone on this device, except the tester profile.
export const members = (profiles) => profiles.filter((p) => !isTester(p));

export function weekXp(p, monday) {
  let xp = 0;
  for (let i = 0; i < 7; i++) xp += p.xpByDay?.[addDays(monday, i)] || 0;
  return xp;
}

const played = (p, monday) => weekXp(p, monday) > 0;
const isActive = (p, monday) => {
  for (let k = 0; k < ACTIVE_WEEKS; k++) if (played(p, addDays(monday, -7 * k))) return true;
  return false;
};

// Members by XP this week (then total XP). Equal weekly XP share a rank.
export function weeklyRanking(profiles, today = dayKey(now())) {
  const monday = weekStart(today);
  const rows = members(profiles)
    .map((p) => ({ profile: p, xp: weekXp(p, monday), total: p.xp || 0 }))
    .sort((a, b) => b.xp - a.xp || b.total - a.total || a.profile.name.localeCompare(b.profile.name));
  rows.forEach((r, i) => { r.rank = i && r.xp === rows[i - 1].xp ? rows[i - 1].rank : i + 1; });
  return rows;
}

// {weeks, best, saves, last, done, missing}: `last` is what happened to the
// flame last week ('grew', 'saved', 'lost' or null when it wasn't judged).
export function groupFlame(profiles, today = dayKey(now())) {
  const ms = members(profiles);
  const current = weekStart(today);
  const first = ms.flatMap((p) => Object.keys(p.xpByDay || {}).filter((d) => p.xpByDay[d] > 0)).sort()[0];
  let weeks = 0;
  let best = 0;
  let saves = 0;
  let run = 0;
  let last = null;
  for (let w = first ? weekStart(first) : current; w < current; w = addDays(w, 7)) {
    const active = ms.filter((p) => isActive(p, w));
    const players = active.filter((p) => played(p, w));
    let event = null;
    if (!players.length) { /* nobody played: neutral */ } else if (players.length === active.length) {
      weeks += 1;
      run += 1;
      if (run % WEEKS_PER_SAVE === 0 && saves < MAX_SAVES) saves += 1;
      event = 'grew';
    } else if (saves > 0) {
      saves -= 1;
      run = 0;
      event = 'saved';
    } else {
      event = weeks ? 'lost' : null;
      weeks = 0;
      run = 0;
    }
    best = Math.max(best, weeks);
    last = addDays(w, 7) === current ? event : null;
  }
  const active = ms.filter((p) => isActive(p, current));
  return {
    weeks, best, saves, last,
    done: active.filter((p) => played(p, current)),
    missing: active.filter((p) => !played(p, current)),
  };
}

// The class's common goal for the week: 150 XP per active member, together.
export function weeklyQuest(profiles, today = dayKey(now())) {
  const monday = weekStart(today);
  const ms = members(profiles);
  const n = ms.filter((p) => isActive(p, monday)).length || ms.length;
  return { target: QUEST_XP * Math.max(1, n), done: ms.reduce((s, p) => s + weekXp(p, monday), 0) };
}
