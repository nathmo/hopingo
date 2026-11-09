// All question generators, by skill id.

import { parse, text } from '../math/expr.js';
import { GEN as CALCUL } from './calcul.js';
import { GEN as FRACTIONS } from './fractions.js';
import { GEN as RELATIFS } from './relatifs.js';
import { GEN as PUISSANCES } from './puissances.js';
import { GEN as RACINES } from './racines.js';
import { GEN as MELANGES } from './melanges.js';
import { GEN as ARITHMETIQUE } from './arithmetique.js';
import { GEN as PROPORTION } from './proportion.js';

const GEN = { ...CALCUL, ...FRACTIONS, ...RELATIFS, ...PUISSANCES, ...RACINES, ...MELANGES, ...ARITHMETIQUE, ...PROPORTION };

// The profile is optional: fact skills use it to pick from the student's
// fact memory.
export function generate(skillId, level, rng, profile = null) {
  const g = GEN[skillId];
  if (!g) throw new Error(`Pas de générateur pour ${skillId}`);
  return g(Math.max(1, Math.min(5, level)), rng, profile);
}

export const hasGenerator = (skillId) => !!GEN[skillId];

// Plain-text description of an item, for review files.
export function describe(item) {
  const strip = (h) => String(h)
    .replace(/<span class="m-frac"><span class="m-n">(.*?)<\/span><span class="m-d">(.*?)<\/span><\/span>/g, '$1/$2')
    .replace(/<span class="m-under">/g, '(').replace(/<!--\/u-->/g, ')')
    .replace(/<sup[^>]*>(.*?)<\/sup>/g, '^($1)')
    .replace(/<span class="m-q">\?<\/span>/g, '?')
    .replace(/<[^>]+>/g, '')
    .replace(/\^\((\d+|−\d+|\?)\)/g, '^$1')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/√\((\d+(?:,\d+)?)\)/g, '√$1')
    .replace(/ /g, ' ');
  const lines = [strip(item.prompt)];
  if (item.type === 'steps') lines.push(`  ${text(parse(item.expr))}   [${item.mode}${item.requireIrreducible ? ', irréductible' : ''}] → ${item.answer}`);
  if (item.type === 'fact') lines.push(`  ${strip(item.left)} [${item.expected}] ${strip(item.right)}`.replace(/\s+\[/, ' [') + (item.traps.length ? `   pièges attendus : ${item.traps.map((t) => `${t.value} [${t.rule}]`).join(', ')}` : ''));
  if (item.type === 'answer') lines.push(`  → ${item.expected}${item.form !== 'any' ? ` (${item.form})` : ''}${item.traps.length ? `   pièges attendus : ${item.traps.map((t) => `${t.value} [${t.rule}]`).join(', ')}` : ''}`);
  if (item.type === 'mcq') lines.push(`  ${item.options.map((o) => `${o.correct ? '✔' : '·'} ${strip(o.html)}${o.rule ? ` [${o.rule}]` : ''}`).join('   ')}`);
  if (item.type === 'shade') lines.push(`  (figure ${item.figure.shape} en ${item.figure.n} parts, colorier ${item.target.count})`);
  if (item.type === 'numberline') lines.push(`  (droite ${item.line.min ?? 0} → ${item.line.max}, graduée en ${item.line.den}es) → ${item.target}`);
  if (item.type === 'match') lines.push(`  ${item.pairs.map(([a, b]) => `${strip(a)} ↔ ${strip(b)}`).join('   ')}`);
  if (item.figure?.kind === 'shape' && item.type !== 'shade') lines.push(`  (figure : ${item.figure.wholes || 1} × ${item.figure.shape} en ${item.figure.n} parts, ${item.figure.k} coloriées)`);
  if (item.figure?.kind === 'line') lines.push(`  (point à ${item.figure.mark[0]}/${item.figure.mark[1]} sur ${item.figure.min ?? 0} → ${item.figure.max})`);
  if (item.baits?.length) lines.push(`  pièges : ${item.baits.join(', ')}`);
  return lines.join('\n');
}
