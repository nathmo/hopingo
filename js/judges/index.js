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
export const showWith = (cfg, node, opts = {}) => (node?.t === 'mline' ? mat.show(cfg, node, opts) : judgeFor(cfg).show ? judgeFor(cfg).show(cfg, node, opts) : toMathML(unparen(node), { dvar: cfg.dvar, ...opts }));
export const textWith = (cfg, node) => (node?.t === 'mline' ? mat.text(cfg, node) : judgeFor(cfg).text ? judgeFor(cfg).text(cfg, node) : toText(node, { dvar: cfg.dvar }));
// (A line of a matrix judge is shown by its own printer, whatever the
// judge of the part where it is shown: step U3.)

// Step U2: the calculus judges (developments, primitives, definite
// integrals, limits). Each exports `sign`, the sign shown before a line.
import * as series from './series.js';
import * as antideriv from './antideriv.js';
import * as definite from './definite.js';
import * as limit from './limit.js';

Object.assign(JUDGES, { series, antideriv, definite, limit });
export const signOf = (cfg) => (cfg.rel || judgeFor(cfg).sign) ?? (cfg.kind === 'equiv' || cfg.kind === 'value' ? '=' : '→');

// Step U5: points and vectors, lines and planes, conics (G4, G10).
import * as vector from './vector.js';
import * as geom from './geom.js';
import * as conic from './conic.js';

Object.assign(JUDGES, { vector, geom, conic });
// Step U4: complex numbers (ℚ(i) exact, else floats) and the δ(ε), N(ε)
// and x(ε) of the definitions.
import * as complex from './complex.js';
import * as delta from './delta.js';

Object.assign(JUDGES, { complex, delta });

// Step U6: differential equations, non-linear systems, polar bounds of a
// limit in two variables, bounds of a multiple integral (A2).
import * as ode from './ode.js';
import * as system from './system.js';
import * as bound from './bound.js';
import * as domain from './domain.js';

Object.assign(JUDGES, { ode, system, bound, domain });

// Step U7: probabilities (exact) and statistics (approximate), lines of
// named values (x̄ = …, t_obs = …), errors carried forward.
import * as prob from './prob.js';
import * as stat from './stat.js';

Object.assign(JUDGES, { prob, stat });

// Step U10: parametrised curves and surfaces, oriented boundaries,
// Fourier and Laplace transforms (modules V, C and F).
import * as transform from './transform.js';

Object.assign(JUDGES, { transform });
import * as param from './param.js';
import * as boundary from './boundary.js';

Object.assign(JUDGES, { param, boundary });
import * as distrib from './distrib.js'; // step U10, part fb: distributions (module F, MT/SV)
Object.assign(JUDGES, { distrib });
