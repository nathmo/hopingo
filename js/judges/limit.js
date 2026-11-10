// Judge `limit` (spec §5.2, step U2, series part): each line is an
// expression whose limit is meant (« lim of … »): it is right if it has the
// same limit as the previous line when v → to. Replacing by an equivalent is
// fine as long as the limit is kept. cfg: {v, to: text ('0', '+∞', '2'),
// dir?: '+' | '-'}. Limits come from js/cas/limit.js: series first, then a
// numeric check. Step U4: cfg.discrete (sequences: v is a whole number,
// n → +∞), and a limit that does not exist is the value 'none' (a final
// line « ∄ », written `none`… is not read: such items end on a decision).
// Final form: a number in closed form, +∞ or −∞ (a line without v).
// Lines that still depend on v are shown inside « lim ».

import { parse } from '../cas/parse.js';
import { stripParen, dependsOn } from '../cas/ast.js';
import { toMathML } from '../cas/mathml.js';
import { unparen } from '../cas/ast.js';
import { limit, targetOf, sameLimit } from '../cas/limit.js';
import { closedNumber } from '../cas/closedform.js';
import { Q } from '../math/rational.js';
import { diagnoseLine } from './diagnose.js';
import { readLine, sameLine } from './common.js';

export const sign = '=';
const vOf = (cfg) => cfg.v || 'x';

const TARGETS = new Map();
function target(cfg) {
  const key = `${cfg.to}|${cfg.dir ?? ''}`;
  if (!TARGETS.has(key)) {
    const t = targetOf(parse(String(cfg.to ?? '0')));
    TARGETS.set(key, { to: t.to, dir: cfg.dir ?? t.dir });
  }
  return TARGETS.get(key);
}

const isInf = (n) => {
  n = stripParen(n);
  if (n.t === 'const' && n.name === 'inf') return '+inf';
  if (n.t === 'neg' && stripParen(n.e).t === 'const' && stripParen(n.e).name === 'inf') return '-inf';
  return null;
};

export function limitOf(cfg, node) {
  const inf = isInf(node);
  if (inf) return { value: inf, method: 'series' };
  const { to, dir } = target(cfg);
  try { return limit(node, vOf(cfg), to, dir, { discrete: !!cfg.discrete }); } catch { return { value: null, method: 'none' }; }
}

export const sameAsLimit = (cfg, a, b) => sameLimit(limitOf(cfg, a), limitOf(cfg, b));

const say = (r) => {
  if (r.value === '+inf') return '+∞';
  if (r.value === '-inf') return '−∞';
  if (r.value === 'none') return 'rien (pas de limite)';
  if (r.value instanceof Q) return r.value.toString().replace('-', '−');
  return String(Math.round(r.value * 1e4) / 1e4).replace('.', ',').replace('-', '−');
};

export function isFinal(cfg, node) {
  if (dependsOn(node, vOf(cfg))) return false;
  if (isInf(node)) return true;
  return closedNumber(node);
}

export const start = (cfg) => cfg.start;

// A line that still depends on v is shown as lim of it.
export function show(cfg, node, opts = {}) {
  const v = vOf(cfg);
  if (!dependsOn(node, v)) return toMathML(unparen(node), opts);
  const to = parse(String(cfg.to ?? '0'));
  const bound = cfg.dir ? { t: 'side', e: to, dir: cfg.dir } : to;
  return toMathML({ t: 'lim', e: unparen(node), v, to: bound }, opts);
}

export function judgeLine(cfg, prev, input, state = {}) {
  const read = readLine({ ...cfg, vars: cfg.vars || [vOf(cfg)] }, input);
  if (read.error) return read.error;
  const { node } = read;
  if (node.t === 'rel') return { kind: 'parse', node, message: 'Écris seulement l\'expression (ou la valeur de la limite), sans « = ».' };
  if (sameLine(node, prev)) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
  const a = limitOf(cfg, prev);
  const b = limitOf(cfg, node);
  if (b.value === null) return { kind: 'stay', node, message: 'Je n\'arrive pas à calculer la limite de cette ligne : écris-la autrement.' };
  if (a.value !== null && !sameLimit(a, b)) {
    const diag = diagnoseLine('limit', prev, node, cfg, (cand, line) => sameAsLimit(cfg, cand, line));
    return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message: `La limite de ta ligne est ${say(b)}, mais celle de la ligne précédente est ${say(a)}.` };
  }
  const fin = isFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: `C'est juste, mais ${fin.charAt(0).toLowerCase()}${fin.slice(1)}` };
  state.lines = (state.lines || 0) + 1;
  return { kind: 'ok', node };
}
