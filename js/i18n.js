// Language of the interface. The app is written in French; every text shown
// goes through t(), which looks the French text up in the dictionary of the
// chosen language and falls back to the French when an entry is missing.
//
// The language is a setting of the device (localStorage, not the profile)
// and is read once when the page loads: changing it reloads the page, so a
// text built at import time (skill titles, unit names) is in the right
// language too. In Node (tests, tools) there is no localStorage: French,
// unless HOPINGO_LANG is set.
//
// Dictionaries live in js/i18n/<lang>/*.js, each a default export
// { 'texte français': 'English text' }; js/i18n/<lang>/index.js merges them.
// Texts with values use {name} placeholders: t('Profil de {name} chargé !', { name }).

const KEY = 'hopingo.lang';

export const LANGS = [
  { id: 'fr', label: 'Français' },
  { id: 'en', label: 'English' },
];

function readLang() {
  // Node (tests, tools): HOPINGO_LANG=en node ... shows the English texts.
  const env = globalThis.process?.env?.HOPINGO_LANG;
  if (LANGS.some((l) => l.id === env)) return env;
  try {
    const v = globalThis.localStorage?.getItem(KEY);
    if (LANGS.some((l) => l.id === v)) return v;
  } catch { /* storage blocked */ }
  return 'fr';
}

export const LANG = readLang();

// Loaded only when needed: French users never download the dictionaries.
const DICTS = LANG === 'fr' ? {} : await import(`./i18n/${LANG}/index.js`);
const DICT = DICTS.default || {};
// The skill catalogue reads its own dictionaries first (see en/index.js).
const CATALOG = DICTS.CATALOG || DICT;

const missing = new Set();

const fill = (text, vars) => (vars
  ? text.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m))
  : text);

// t('Réglages') → 'Settings' in English. Unknown texts stay in French.
export function t(fr, vars) {
  if (fr == null) return fr;
  const s = String(fr);
  if (LANG === 'fr') return fill(s, vars);
  const hit = DICT[s];
  if (hit == null) {
    if (s.trim() && !missing.has(s)) missing.add(s);
    return fill(s, vars);
  }
  return fill(hit, vars);
}

// Plural helper: tn(n, '{n} jour', '{n} jours').
export const tn = (n, one, many, vars = {}) => t(Math.abs(n) >= 2 ? many : one, { n, ...vars });

// Translates the text fields of a data object in place (skills, units):
// strings are looked up whole; arrays and nested objects are walked.
const tCatalog = (fr) => CATALOG[fr] ?? t(fr);

export function localize(obj, fields) {
  if (LANG === 'fr' || !obj) return obj;
  const walk = (v) => {
    if (typeof v === 'string') return tCatalog(v);
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === 'object') {
      const out = {};
      for (const [k, x] of Object.entries(v)) out[k] = MATH_KEYS.has(k) ? x : walk(x);
      return out;
    }
    return v;
  };
  for (const f of fields) if (obj[f] != null) obj[f] = walk(obj[f]);
  return obj;
}
// Inside nested data (intro cards), these keys hold math, not prose.
const MATH_KEYS = new Set(['math', 'cas', 'tex', 'expr', 'id', 'solve', 'solveOpts', 'figure', 'start', 'expected', 'answer']);

export function setLang(id) {
  try { localStorage.setItem(KEY, id); } catch { /* ignore */ }
  location.reload();
}

// Numbers in English. Questions, corrections and answers are built in the
// French notation, which the parsers and checkers read (decimal comma
// « 0,5 », « x = 2 ou x = 3 »). In English only what is shown changes: every
// text node of the page gets « 0.5 », « or », « and ». Code (Python) and
// the answer field (drawn by js/ui/keypad.js) are left alone.
const SKIP = 'code, pre, textarea, input, select, script, style, .mi-display, .code-wrap, .code-block, [data-raw]';
export function showNumbers(text) {
  return text
    .replace(/(\d),(?=\d)/g, '$1.')
    .replace(/(^|\s)ou(?=\s)/g, '$1or')
    .replace(/(^|\s)et(?=\s)/g, '$1and');
}
function fixNode(node) {
  if (node.nodeType === 3) {
    const v = node.nodeValue;
    if (!v || !/\d,\d|\sou\s|\set\s|^ou\s|^et\s/.test(v)) return;
    if (node.parentElement?.closest(SKIP)) return;
    const w = showNumbers(v);
    if (w !== v) node.nodeValue = w;
  } else if (node.nodeType === 1 && !node.matches(SKIP)) {
    const walk = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    for (let n = walk.nextNode(); n; n = walk.nextNode()) fixNode(n);
  }
}
if (LANG === 'en' && typeof document !== 'undefined' && typeof MutationObserver !== 'undefined') {
  const start = () => {
    fixNode(document.body);
    new MutationObserver((list) => {
      for (const m of list) {
        if (m.type === 'characterData') fixNode(m.target);
        else m.addedNodes.forEach(fixNode);
      }
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  };
  if (document.body) start();
  else document.addEventListener('DOMContentLoaded', start);
}

// Texts shown in this session that have no translation yet (for review:
// type hopingoMissing() in the browser console).
if (typeof window !== 'undefined') window.hopingoMissing = () => [...missing];
