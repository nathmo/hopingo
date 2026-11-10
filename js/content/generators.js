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
import { readWith, textWith } from '../judges/index.js';
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
// Entities stay encoded here: strip() removes the tags, then decodes them.
const mathText = (h) => String(h).replace(/<math[^>]*?alttext="([^"]*)"[^>]*>[\s\S]*?<\/math>/g, (m, alt) => alt.replace(/&quot;/g, '"'));

// The script of a `lines` item, one line per step.
function describeLines(item) {
  const out = [];
  const opts = { vars: item.judge?.vars, dvar: item.judge?.dvar };
  let cfg = item.judge;
  // Lines the core reads are shown readable; the logic judge writes its own.
  const show = (t) => {
    if (cfg.kind === 'logic') { try { return textWith(cfg, readWith(cfg, t)); } catch { return t; } }
    try { return toReadable(parseCas(t, { ...opts, complex: cfg.complex }), opts); } catch { return t; }
  };
  out.push(`  [${item.mode}${item.noHints ? ', sans aide' : ''}${item.followError ? ', suivre l\'erreur' : ''}${item.exam ? `, examen ${item.exam.format}` : ''}${item.mode === 'tap' && item.tapActions ? `, menu ${item.tapActions}` : ''}]  ${show(item.start.math)}`);
  segmentsOf(item).forEach((seg, k) => {
    cfg = seg.judge;
    if (k > 0) out.push(`  — ${strip(mathText(seg.html))}  [juge ${seg.judge.kind}]  départ : ${show(seg.start.math)}`);
    for (const l of seg.lines) {
      if (l.kind === 'eq') {
        let shown = l.blanks?.length ? `${show(templateOf(l, opts))}   (trous : ${show(l.math)})` : show(l.math);
        // Step U3: blank cells of a grid line, (row, column) from 1.
        if (l.cells?.length) shown += `   (cases à remplir : ${l.cells.map(([i, j]) => `(${i + 1},${j + 1})`).join(' ')})`;
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

// Step U1 types: true/false, tokens, blocks, tables.
const T = (h) => strip(mathText(h));
const NL = String.fromCharCode(10);
function describeTf(item) {
  const out = [`  « ${T(item.statement)} »${item.decided ? ' (faux, contre-exemple demandé)' : ''} → ${item.truth ? 'VRAI' : 'FAUX'}`];
  if (item.counter) {
    const ans = item.counter.answer;
    const txt = typeof ans === 'object' ? Object.entries(ans).map(([k, v]) => `${k} = ${typeof v === 'boolean' ? (v ? 'V' : 'F') : v}`).join(', ') : ans;
    out.push(`    contre-exemple (${item.counter.kind}) : ${txt}`);
  }
  if (item.hints?.length) out.push(`  aides : ${item.hints.map((h) => T(h.html)).join(' | ')}`);
  return out;
}
function describeTokens(item) {
  return [
    `  [jetons${item.noHints ? ', sans aide' : ''}] palette : ${item.palette.join(' · ')}`,
    `    → ${textWith(item.judge, readWith(item.judge, item.answer))}`,
    ...(item.hints?.length ? [`  aides : ${item.hints.map((h) => T(h.html)).join(' | ')}`] : []),
  ];
}
function describeBlocks(item) {
  const out = [`  [blocs ${item.mode}${item.noHints ? ', sans aide' : ''}]`];
  if (item.decision) out.push(`    ? ${item.decision.prompt} ${item.decision.options.map((o) => `${o.valid ? (o.quality === 'poor' ? '~' : '✔') : '·'} ${o.label}`).join(' / ')}`);
  item.order.forEach((id, i) => {
    const b = item.blocks.find((x) => x.id === id);
    out.push(`    ${i + 1}. ${T(b.html)}${b.input ? `   [à écrire : ${b.input.ask} ${b.input.answer}]` : ''}`);
  });
  for (const b of item.blocks.filter((x) => x.distractor)) out.push(`    ✗ ${T(b.html)} [${b.distractor}]`);
  return out;
}
function describeTable(item) {
  const out = [`  [tableau ${item.judge.phi.kind}]  colonnes : ${item.table.cols.map(T).join(' | ')}`];
  if (item.table.root) out.push(`    a = ${item.table.root.given ?? `(${item.answers.root})`}`);
  for (const r of item.table.rows) {
    out.push(`    ${T(r.label || '').padEnd(8)} ${r.cells.map((c, j) => (!c ? '·' : c.given !== undefined ? c.given : `(${item.answers[r.id][j]})`)).join('  ')}`);
  }
  if (item.then) out.push(`  puis : ${describe(item.then).split(NL).join(`${NL}    `)}`);
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
  if (item.type === 'tf') lines.push(...describeTf(item));
  if (item.type === 'tokens') lines.push(...describeTokens(item));
  if (item.type === 'blocks') lines.push(...describeBlocks(item));
  if (item.type === 'table') lines.push(...describeTable(item));
  // Step U3: one answer in a grid, an example to give.
  if (item.type === 'matrix') lines.push(`  [grille ${item.rows}×${item.cols}, juge ${item.judge.kind}${item.noHints ? ', sans aide' : ''}] → ${item.answer}`);
  if (item.type === 'example') lines.push(`  [exemple ${item.property.kind}${item.property.params?.want || item.property.params?.test ? ` ${item.property.params.want ?? item.property.params.test}` : ''}] → ${Object.entries(item.answer || {}).map(([k, v]) => `${k} = ${v}`).join(', ')}`);
  if (item.exam && item.type !== 'lines') lines.push(`  [examen ${item.exam.format}]`);
  if (item.type === 'shade') lines.push(`  (figure ${item.figure.shape} en ${item.figure.n} parts, colorier ${item.target.count})`);
  if (item.type === 'numberline') lines.push(`  (droite ${item.line.min ?? 0} → ${item.line.max}, graduée en ${item.line.den}es) → ${item.target}`);
  if (item.type === 'match') lines.push(`  ${item.pairs.map(([a, b]) => `${strip(a)} ↔ ${strip(b)}`).join('   ')}`);
  if (item.figure?.kind === 'shape' && item.type !== 'shade') lines.push(`  (figure : ${item.figure.wholes || 1} × ${item.figure.shape} en ${item.figure.n} parts, ${item.figure.k} coloriées)`);
  if (item.figure?.kind === 'line') lines.push(`  (point à ${item.figure.mark[0]}/${item.figure.mark[1]} sur ${item.figure.min ?? 0} → ${item.figure.max})`);
  if (item.baits?.length) lines.push(`  pièges : ${item.baits.join(', ')}`);
  return lines.join('\n');
}
