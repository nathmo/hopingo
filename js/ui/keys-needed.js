// The keypads of an input (spec §11): the ones the item names, plus the
// keypads holding the symbols its answers need and the named ones lack.
// A generator that forgets « set » for an interval, « relation » for
// « z = … » or « greek » for θ would otherwise leave the student unable to
// type the answer on a phone. Found by tools/browser-smoke.js.

import { MathInput } from './keypad.js';

// Searched in this order: the small keypads first.
const EXTRA = ['relation', 'set', 'greek', 'calcfn', 'fact', 'letters', 'cplx', 'trig', 'seq', 'ineq', 'stat',
  'geo', 'pts', 'a2', 'vecto', 'transf', 'cres', 'distrib', 'anal', 'explog', 'logic', 'mat', 'calcx', 'calc'];
const NOT_TEXT = new Set(['back', 'left', 'right', 'ok', 'enter', '']);
const cache = new Map();
const keysOf = (name) => {
  if (!cache.has(name)) cache.set(name, (new MathInput({ keys: name }).keyList || []).filter((k) => !NOT_TEXT.has(k)));
  return cache.get(name);
};

// The symbols of `text` that the keys cannot type (a keyboard gives digits,
// and letters and spaces when the keypad has letters; × stands for ·, the
// fraction bar for ÷).
export function missingKeys(text, names) {
  const keys = names.flatMap(keysOf);
  const set = new Set(keys);
  const letters = keys.some((k) => /^[a-zA-Zπ]$/.test(k));
  const multi = keys.filter((k) => k.length > 1 && k !== 'frac').sort((a, b) => b.length - a.length);
  const t = String(text).replace(/−/g, '-');
  const out = new Set();
  for (let i = 0; i < t.length;) {
    const m = multi.find((k) => t.startsWith(k, i));
    if (m) { i += m.length; continue; }
    const c = t[i];
    const ok = set.has(c) || /[0-9 ]/.test(c) || (letters && /[a-zA-Z]/.test(c)) || ((c === '/' || c === '÷') && set.has('frac')) || ((c === '*' || c === '·') && set.has('×'))
      || (c === '×' && set.has('·')) || (c === '.' && set.has(','));
    if (!ok) out.add(c);
    i++;
  }
  return [...out];
}

// names: the item's keypads; texts: what the student will type.
export function keysFor(names, texts) {
  const out = [...names];
  for (const t of texts) {
    for (const c of missingKeys(t, out)) {
      const extra = EXTRA.find((n) => !out.includes(n) && keysOf(n).some((k) => k === c || k.startsWith(c)));
      if (extra) out.push(extra);
    }
  }
  return out;
}
