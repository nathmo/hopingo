// Local calendar days as 'YYYY-MM-DD'. `now` is injectable for tests.

export const DAY = 24 * 3600 * 1000;

let clock = () => Date.now();
export const now = () => clock();
export const setClock = (fn) => { clock = fn; };

export function dayKey(t = now()) {
  const d = new Date(t);
  const pad = (x) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function daysBetween(a, b) {
  const pa = new Date(`${a}T12:00:00`);
  const pb = new Date(`${b}T12:00:00`);
  return Math.round((pb - pa) / DAY);
}
