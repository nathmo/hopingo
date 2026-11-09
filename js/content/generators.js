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
import { GEN as ALGEBRE } from './algebre.js';
import { GEN as EQUATIONS } from './equations.js';
import { GEN as FONCTIONS } from './fonctions.js';
import { GEN as SECONDDEGRE } from './seconddegre.js';
import { UNI_GEN } from './uni/generators.js';
import { segmentsOf, templateOf } from '../judges/lines.js';
import { parse as parseCas } from '../cas/parse.js';
import { toReadable } from '../cas/print.js';

const GEN = { ...CALCUL, ...FRACTIONS, ...RELATIFS, ...PUISSANCES, ...RACINES, ...MELANGES, ...ARITHMETIQUE, ...PROPORTION, ...ALGEBRE, ...EQUATIONS, ...FONCTIONS, ...SECONDDEGRE, ...UNI_GEN };

// The profile is optional: fact skills use it to pick from the student's
// fact memory. opts.exam asks for an exam variant (spec §6).
export function generate(skillId, level, rng, profile = null, opts = undefined) {
  const g = GEN[skillId];
  if (!g) throw new Error(`Pas de générateur pour ${skillId}`);
  return opts ? g(Math.max(1, Math.min(5, level)), rng, profile, opts) : g(Math.max(1, Math.min(5, level)), rng, profile);
}

export const hasGenerator = (skillId) => !!GEN[skillId];

// MathML (university content) as text: its alttext.
const mathText = (h) => String(h).replace(/<math[^>]*?alttext="([^"]*)"[^>]*>[\s\S]*?<\/math>/g, (m, alt) => alt
  .replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'));

// The script of a `lines` item, one line per step.
function describeLines(item) {
  const out = [];
  const opts = { vars: item.judge?.vars, dvar: item.judge?.dvar };
  const show = (t) => { try { return toReadable(parseCas(t, opts), opts); } catch { return t; } };
  out.push(`  [${item.mode}${item.noHints ? ', sans aide' : ''}${item.followError ? ', suivre l\'erreur' : ''}${item.exam ? `, examen ${item.exam.format}` : ''}]  ${show(item.start.math)}`);
  segmentsOf(item).forEach((seg, k) => {
    if (k > 0) out.push(`  — ${strip(mathText(seg.html))}  [juge ${seg.judge.kind}]`);
    for (const l of seg.lines) {
      if (l.kind === 'eq') {
        const shown = l.blanks?.length ? `${show(templateOf(l, opts))}   (trous : ${show(l.math)})` : show(l.math);
        out.push(`    = ${shown}${l.note ? `   ← ${l.note}` : ''}`);
      }
      if (l.kind === 'decision') out.push(`    ? ${l.prompt} ${l.options.map((o) => `${o.valid ? '✔' : '·'} ${o.label}`).join(' / ')}`);
      if (l.kind === 'note') out.push(`    (${strip(mathText(l.html))})`);
      if (l.kind === 'rule') out.push(`    ? ${l.ask} → ${l.options.find((o) => o.id === l.correct)?.label}`);
    }
  });
  if (item.hints?.length) out.push(`  aides : ${item.hints.map((h) => strip(mathText(h.html))).join(' | ')}`);
  return out;
}

// HTML of the school renderer as plain text.
const strip = (h) => String(h)
  .replace(/<span class="m-frac"><span class="m-n">(.*?)<\/span><span class="m-d">(.*?)<\/span><\/span>/g, '$1/$2')
  .replace(/<span class="m-under">/g, '(').replace(/<!--\/u-->/g, ')')
  .replace(/<sup[^>]*>(.*?)<\/sup>/g, '^($1)')
  .replace(/<span class="m-q">\?<\/span>/g, '?')
  .replace(/<br\s*\/?>/g, ' ')
  .replace(/<[^>]+>/g, '')
  .replace(/\^\((\d+|−\d+|\?)\)/g, '^$1')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
  .replace(/√\((\d+(?:,\d+)?)\)/g, '√$1')
  .replace(/ /g, ' ');

// Plain-text description of an item, for review files.
export function describe(item) {
  const lines = [strip(mathText(item.prompt))];
  if (item.type === 'steps') lines.push(`  ${text(parse(item.expr))}   [${item.mode}${item.requireIrreducible ? ', irréductible' : ''}] → ${item.answer}`);
  if (item.type === 'graphpoint') lines.push(`  (point à placer : ${item.target.join(' ; ')})`);
  if (item.type === 'eqlines') lines.push(`  ${item.equation}   [${item.showMoves ? 'coups montrés' : 'lignes libres'}] → ${item.answer}`);
  if (item.type === 'fact') lines.push(`  ${strip(item.left)} [${item.expected}] ${strip(item.right)}`.replace(/\s+\[/, ' [') + (item.traps.length ? `   pièges attendus : ${item.traps.map((t) => `${t.value} [${t.rule}]`).join(', ')}` : ''));
  if (item.type === 'answer') lines.push(`  → ${item.expected}${item.form !== 'any' ? ` (${item.form})` : ''}${item.traps.length ? `   pièges attendus : ${item.traps.map((t) => `${t.value} [${t.rule}]`).join(', ')}` : ''}`);
  if (item.type === 'mcq') lines.push(`  ${item.options.map((o) => `${o.correct ? '✔' : '·'} ${strip(mathText(o.html))}${o.rule ? ` [${o.rule}]` : ''}`).join('   ')}`);
  if (item.type === 'lines') lines.push(...describeLines(item));
  if (item.type === 'shade') lines.push(`  (figure ${item.figure.shape} en ${item.figure.n} parts, colorier ${item.target.count})`);
  if (item.type === 'numberline') lines.push(`  (droite ${item.line.min ?? 0} → ${item.line.max}, graduée en ${item.line.den}es) → ${item.target}`);
  if (item.type === 'match') lines.push(`  ${item.pairs.map(([a, b]) => `${strip(a)} ↔ ${strip(b)}`).join('   ')}`);
  if (item.figure?.kind === 'shape' && item.type !== 'shade') lines.push(`  (figure : ${item.figure.wholes || 1} × ${item.figure.shape} en ${item.figure.n} parts, ${item.figure.k} coloriées)`);
  if (item.figure?.kind === 'line') lines.push(`  (point à ${item.figure.mark[0]}/${item.figure.mark[1]} sur ${item.figure.min ?? 0} → ${item.figure.max})`);
  if (item.baits?.length) lines.push(`  pièges : ${item.baits.join(', ')}`);
  return lines.join('\n');
}
