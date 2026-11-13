// Texts of the skill catalogue to translate (js/i18n.js).
//
//   node tools/i18n-strings.js <part> [unit ...]   writes docs/i18n/<part>.todo.json:
//       { "texte français": "" } for the catalogue texts of these units
//       (title, desc, intro, prereqWhy; unit titles too) not yet in the
//       English dictionary.
//   node tools/i18n-strings.js --check            counts what is missing per unit
//       (run it without HOPINGO_LANG: the keys are the French texts).
//
// Fill the values, then turn the file into js/i18n/en/<part>.js
// (export default { ... }).

import { writeFileSync, mkdirSync } from 'node:fs';
import { UNITS, SKILLS } from '../js/content/skills.js';
import EN from '../js/i18n/en/index.js';

const MATH_KEYS = new Set(['math', 'cas', 'tex', 'expr', 'id', 'solve', 'solveOpts', 'figure', 'start', 'expected', 'answer']);
function strings(v, out) {
  if (typeof v === 'string') { if (/[A-Za-zÀ-ÿ]{2}/.test(v)) out.add(v); return out; }
  if (Array.isArray(v)) v.forEach((x) => strings(x, out));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) if (!MATH_KEYS.has(k)) strings(x, out);
  return out;
}
const unitStrings = (unit) => {
  const out = new Set([UNITS.find((u) => u.id === unit)?.title].filter(Boolean));
  for (const s of SKILLS.filter((x) => x.unit === unit)) for (const f of ['title', 'desc', 'intro', 'prereqWhy']) strings(s[f], out);
  return out;
};

const [part, ...units] = process.argv.slice(2);
if (part === '--check') {
  for (const u of UNITS) {
    const all = [...unitStrings(u.id)];
    const miss = all.filter((s) => !(s in EN));
    console.log(`${u.id.padEnd(16)} ${String(all.length - miss.length).padStart(4)}/${all.length}`);
  }
} else {
  const todo = {};
  for (const u of units) for (const s of unitStrings(u)) if (!(s in EN)) todo[s] = '';
  mkdirSync('docs/i18n', { recursive: true });
  writeFileSync(`docs/i18n/${part}.todo.json`, `${JSON.stringify(todo, null, 1)}\n`);
  console.log(`${Object.keys(todo).length} texts → docs/i18n/${part}.todo.json`);
}
