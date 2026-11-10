// Registry of line judges (spec §5.1). Each judge exports
//   judgeLine(cfg, prev, input, state) → Verdict
//   isFinal(cfg, node) → true | false | string (right, but to tidy)
//   start(cfg) → the line 0, if the judge builds it
// and optionally, when its lines are not read by js/cas/parse.js (logic):
//   parseLine(cfg, text) → node      show(cfg, node, {display}) → MathML
//   text(cfg, node) → text that parseLine reads back
// Verdict: {kind: parse|same|ok|done|wrong|stay|form, node, message?, rule?,
//           diag?, witness?, note?}. Later phases add their judges here.

import * as value from './value.js';
import * as equiv from './equiv.js';
import * as solset from './solset.js';
import * as logic from './logic.js';
import * as poly from './poly.js';
// Step U3: linear algebra.
import * as rowops from './rowops.js';
import * as mat from './mat.js';
import * as det from './det.js';
import * as eigvec from './eigvec.js';
import * as span from './span.js';
import * as factor from './factor.js';
import { parse } from '../cas/parse.js';
import { toMathML } from '../cas/mathml.js';
import { toText } from '../cas/print.js';
import { unparen } from '../cas/ast.js';
import { parseOpts } from './common.js';

export const JUDGES = { value, equiv, solset, logic, poly };
Object.assign(JUDGES, { rowops, mat, det, eigvec, span, factor });

export function judgeFor(cfg) {
  const j = JUDGES[cfg.kind];
  if (!j) throw new Error(`Juge inconnu : ${cfg.kind}`);
  return j;
}

// Reading, showing and writing a line with the judge of cfg.
export const readWith = (cfg, text) => (judgeFor(cfg).parseLine ? judgeFor(cfg).parseLine(cfg, text) : parse(text, parseOpts(cfg)));
export const showWith = (cfg, node, opts = {}) => (judgeFor(cfg).show ? judgeFor(cfg).show(cfg, node, opts) : toMathML(unparen(node), { dvar: cfg.dvar, ...opts }));
export const textWith = (cfg, node) => (judgeFor(cfg).text ? judgeFor(cfg).text(cfg, node) : toText(node, { dvar: cfg.dvar }));
