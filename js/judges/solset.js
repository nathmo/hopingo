// Judge `solset` (spec §5.2, step U1): a line is right if it has the same
// solution set as the previous one, on the item's domain: a condition on v
// (relations, chains −2 < x ≤ 4, ∧ ∨ ¬, x ∈ …) or a set (intervals, finite
// sets, ∪ ∩ ∖, ℝ ℕ ℤ ∅, set-builder notation). js/cas/sets.js compares the
// sets exactly at their bounds.
// cfg: {v, domain: 'R'|'N'|'Z'|set text, sets: {A: text}}
// Final form: a union of disjoint sorted intervals, a finite set written
// out, ∅, or « v = 3 » (a single solution).

import { solutionSet, setEqual, setWitness, finalForm } from '../cas/sets.js';
import { toText } from '../cas/print.js';
import { lit } from '../cas/ast.js';
import { toReadable } from '../cas/print.js';
import { diagnoseLine } from './diagnose.js';
import { readLine, sameLine, frNum } from './common.js';

// Letters a line may use: the variable and the item's named sets.
const lineCfg = (cfg) => ({ ...cfg, vars: [cfg.v || 'x'], params: Object.keys(cfg.sets || {}) });

export function isFinal(cfg, node) {
  try { return finalForm(node, cfg); } catch { return false; }
}

export const start = (cfg) => cfg.start;

function numText(w) {
  if (w.q) return toReadable(lit(w.q));
  return frNum(w.x, 3);
}

function witnessMessage(w, cfg) {
  if (!w) return 'Ta ligne ne décrit pas le même ensemble que la précédente.';
  const v = cfg.v || 'x';
  const x = numText(w);
  const discrete = cfg.domain === 'N' || cfg.domain === 'Z';
  if (discrete) {
    return w.inA
      ? `${x} est dans l'ensemble de la ligne précédente, mais pas dans le tien.`
      : `${x} est dans ton ensemble, mais pas dans celui de la ligne précédente.`;
  }
  return w.inA
    ? `${v} = ${x} est solution de la ligne précédente, mais pas de ta ligne.`
    : `${v} = ${x} est solution de ta ligne, mais pas de la ligne précédente.`;
}

export const setOf = (node, cfg) => solutionSet(node, cfg);

export function judgeLine(cfg, prev, input) {
  const read = readLine(lineCfg(cfg), input);
  if (read.error) return read.error;
  const { node } = read;
  if (sameLine(node, prev)) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  let A;
  let B;
  try { A = solutionSet(prev, cfg); } catch { return { kind: 'parse', node, message: 'Je n\'arrive pas à lire la ligne précédente.' }; }
  try { B = solutionSet(node, cfg); } catch {
    return { kind: 'parse', node, message: `Écris une condition sur ${cfg.v || 'x'} (par exemple ${cfg.v || 'x'} < 3) ou un ensemble (par exemple ]1 ; 4]).` };
  }
  if (!setEqual(A, B)) {
    const same = (cand, line) => setEqual(solutionSet(cand, cfg), solutionSet(line, cfg));
    const diag = diagnoseLine('solset', prev, node, cfg, same);
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, witness: setWitness(A, B), message: witnessMessage(setWitness(A, B), cfg) };
  }
  const fin = isFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: `C'est juste, mais ${fin.charAt(0).toLowerCase()}${fin.slice(1)}` };
  return { kind: 'ok', node };
}

export const text = (cfg, node) => toText(node);
