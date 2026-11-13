// The keypads of an input (spec §11): the ones the item names, plus the
// keypads holding the symbols its answers need and the named ones lack.
// A generator that forgets « set » for an interval, « relation » for
// « z = … » or « greek » for θ would otherwise leave the student unable to
// type the answer on a phone. Found by tools/browser-smoke.js.
// keysForItem (spec §17, « Étapes libres et saisie 2D ») then adds a tab
// « + … » with the keys still missing: what the question shows (fraction,
// power, √, π, e, functions, |·|, letters, relations, « ; ») and every key
// of the answer, the start line and the reference lines.

import { KEYSETS, NAV, FN_NAMES, isLetter, tabsOf } from './keypad.js';
import { segmentsOf } from '../judges/lines.js';
import { judgeFor } from '../judges/index.js';

// Searched in this order: the small keypads first.
const EXTRA = ['relation', 'set', 'greek', 'calcfn', 'fact', 'letters', 'cplx', 'trig', 'seq', 'ineq', 'stat',
  'geo', 'pts', 'a2', 'vecto', 'transf', 'cres', 'distrib', 'anal', 'explog', 'logic', 'mat', 'calcx', 'calc'];
const NOT_TEXT = new Set(['back', 'left', 'right', 'ok', 'enter', '']);
const cache = new Map();
const keysOf = (name) => {
  if (!cache.has(name)) cache.set(name, (KEYSETS[name] || []).filter((k) => !NOT_TEXT.has(k)));
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

// ---------- the keys of an item (spec §17) ----------

// What a key writes.
const keyText = (k) => (k === 'frac' ? '/' : k);
// A typed text as the keypad writes it: no spaces, except in the words of
// the keypad (« ou », « et »); − as -.
export const keyNormal = (text) => String(text).replace(/−/g, '-').replace(/\s+(ou|et)\s+/g, '\u0001$1\u0001').replace(/\s+/g, '').replace(/\u0001/g, ' ');

// The key that writes what starts at i, when the keypad has none.
function naturalKey(text, i) {
  for (const w of [' ou ', ' et ']) if (text.startsWith(w, i)) return w;
  const c = String.fromCodePoint(text.codePointAt(i));
  if (c === '/') return 'frac';
  // A function name: « cos( » in « Bcos( » is B then cos(.
  const m = /^([a-zA-Z]{2,})\(/.exec(text.slice(i));
  if (m && !FN_NAMES.has(m[1]) && [...FN_NAMES].some((f) => m[1].endsWith(f))) return c;
  if (m) return m[0];
  return c;
}

// The keys to press to write text, longest key first. → {keys, missing}:
// missing are the keys the keypad would need (natural keys).
export function planKeys(text, keys) {
  const t = keyNormal(text);
  const outs = [...new Set(keys)].filter((k) => !NAV.has(k)).map((k) => [k, keyText(k)]).sort((a, b) => b[1].length - a[1].length);
  const plan = [];
  const missing = [];
  for (let i = 0; i < t.length;) {
    const hit = outs.find(([, o]) => t.startsWith(o, i));
    if (hit) { plan.push(hit[0]); i += hit[1].length; continue; }
    const k = naturalKey(t, i);
    missing.push(k);
    plan.push(k);
    i += keyText(k).length;
  }
  return { keys: plan, missing };
}

// The texts a student types for an item: the answer, the start line to
// copy and change, the reference lines (school steps, university lines and
// their typed decisions).
export function typedTexts(item) {
  const out = [];
  const push = (t) => { if (t != null && String(t).trim()) out.push(String(t)); };
  if (item.type === 'answer') {
    // « aucune » is also written ∅ (the checker reads both).
    push(item.expected === 'aucune' ? '∅' : item.expected);
    push(item.start?.math);
    // Reference lines written as text (a line drawn from `html` is not typed).
    for (const l of item.solution || []) if (!l.html) push(l.math);
  } else if (item.type === 'eqlines') {
    push(item.equation);
    push(item.answer);
  } else if (item.type === 'steps') {
    push(item.expr);
    for (const l of item.solution || []) push(l.math);
  } else if (item.type === 'lines') {
    for (const seg of segmentsOf(item)) {
      if (!typedJudge(seg.judge)) continue;
      for (const l of seg.lines) {
        if (l.kind === 'eq') push(l.math);
        if (l.kind === 'decision') for (const o of l.options) if (o.valid && o.then) push(o.then.expect);
      }
    }
  }
  return out;
}

// Lines of a judge typed on the keypad (not a matrix grid, not tokens).
function typedJudge(cfg) {
  if (!cfg || cfg.kind === 'logic') return false;
  try { return judgeFor(cfg).input !== 'matrix'; } catch { return true; }
}

// What the question shows, from its markup (school spans and MathML):
// fraction, power, root, π, letters, function names, |·|, relations.
export function promptKeys(html) {
  const s = String(html || '').replace(/<details[\s\S]*?<\/details>/g, '');
  const out = new Set();
  const maths = [...s.matchAll(/<math[\s\S]*?<\/math>/g)].map((m) => m[0]).join(' ');
  if (/class="m-frac"|<mfrac/.test(s)) out.add('frac');
  if (/class="m-sup"|<msup/.test(s)) out.add('^');
  if (/class="m-rad"|<msqrt|<mroot/.test(s)) out.add('√');
  for (const [, v] of s.matchAll(/<i class="m-var">([^<]+)<\/i>/g)) for (const c of v) if (isLetter(c)) out.add(c);
  for (const [, v] of maths.matchAll(/<mi[^>]*>([^<]+)<\/mi>/g)) {
    const t = v.trim();
    if ([...t].length === 1 && isLetter(t)) out.add(t);
    else if (FN_NAMES.has(t)) out.add(`${t}(`);
  }
  for (const [, v] of maths.matchAll(/<mo[^>]*>([^<]+)<\/mo>/g)) {
    const t = v.trim();
    if (['=', '<', '>', '≤', '≥', '≠', ';', '|'].includes(t)) out.add(t);
  }
  if (/π/.test(maths) || /<span class="m"[^]*?π/.test(s)) out.add('π');
  return [...out];
}

const ALG_CHECKERS = new Set(['alg', 'solset', 'system', 'isolate', 'paramset', 'eqzero']);
// An item whose answers are expressions or equations with letters.
const isAlgebraic = (item) => ALG_CHECKERS.has(item.checker) || item.type === 'eqlines' || (item.type === 'lines' && typedJudge(item.judge));

// The keypad of an item when it does not name one.
export function baseKeysOf(item) {
  if (item.type === 'eqlines') return 'algeq';
  if (item.type === 'steps') return item.keys || 'ops';
  if (item.type === 'lines') return item.keys?.length ? item.keys : ['calcx', 'calcfn'];
  return item.keys || 'frac';
}

// The tabs of an item's keypad: its own key sets, then a tab « + … » with
// what the question uses (fraction, power, √, π, e, functions, |·|, its
// letters, relations, « ; ») and the keypad lacks, so that the answer,
// the start line and every reference line can be typed on the keypad.
export function keysForItem(item, base = baseKeysOf(item)) {
  // Named keypads first take the small keypads the texts need (keysFor).
  const names = Array.isArray(base) && base.length && base.every((x) => typeof x === 'string' && x.length > 1 && KEYSETS[x]);
  const tabs = tabsOf(names ? keysFor(base, typedTexts(item)) : base);
  const have = new Set(tabs.flatMap((t) => t.keys));
  const missing = [];
  const add = (k) => { if (k && !have.has(k) && !missing.includes(k)) missing.push(k); };
  // Physics items build their own keypad: a symbol like E_c is one key, not E and c.
  const physics = String(item.checker || '').startsWith('phys');
  if (!physics) for (const k of promptKeys(item.prompt)) if (!(k === '√' && have.has('√('))) add(k);
  if (isAlgebraic(item)) for (const k of ['frac', '^', '(', ')']) add(k);
  if (isAlgebraic(item) && !have.has('√(')) add('√');
  for (const t of typedTexts(item)) for (const k of planKeys(t, [...have, ...missing]).missing) add(k);
  if (missing.length) tabs.push({ id: 'auto', keys: [...missing, 'left', 'right', 'back'] });
  return tabs;
}
