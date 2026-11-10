// Counter-examples of analytic geometry (step U5, modules G4 and G10),
// called by js/judges/examples.js (kind 'geo').
//
// counter = {kind: 'geo', want, params?, ask: [{v, label, text: true}], answer: {v: text}}
// Each answer is a point, a vector or a number written in the language of
// js/cas/vecexpr.js ((1 ; 0 ; 2), 3/2). WANT[want](values, params) → true
// or a message saying why the answer does not refute the statement. Each
// part of the modules adds its table in its own file.

import { parseVec, evalVec, floats } from '../cas/vecexpr.js';
import { WANT as G4A } from './geo-examples-g4a.js';
import { WANT as G4B } from './geo-examples-g4b.js';
import { WANT as G10A } from './geo-examples-g10a.js';
import { WANT as G10B } from './geo-examples-g10b.js';

export const GEO_WANT = { ...G4A, ...G4B, ...G10A, ...G10B };

// The value of an answer: {k: 's', x} or {k: 'v', xs} (floats), or null.
export function readGeo(text) {
  try {
    const v = evalVec(parseVec(String(text ?? ''), { params: [] }), {}, {});
    return v.k === 'v' ? { k: 'v', xs: floats(v) } : { k: 's', x: floats(v)[0] };
  } catch { return null; }
}

export function checkGeo(counter, answers = {}) {
  const want = GEO_WANT[counter.want];
  if (!want) return { ok: false, message: 'Contre-exemple non vérifiable.' };
  const vals = {};
  for (const a of counter.ask || []) {
    const t = answers[a.v];
    if (t === undefined || String(t).trim() === '') return { ok: false, message: `Donne ${a.label || a.v}.` };
    const v = readGeo(t);
    if (!v) return { ok: false, message: `Je n'arrive pas à lire ${a.label || a.v}.` };
    vals[a.v] = v;
  }
  let r;
  try { r = want(vals, counter.params || {}); } catch { r = 'Ces valeurs ne conviennent pas.'; }
  return r === true ? { ok: true } : { ok: false, message: typeof r === 'string' ? r : 'Ce n\'est pas un contre-exemple.' };
}

// Tools for the tables.
export const isVec = (v, n) => v?.k === 'v' && (!n || v.xs.length === n);
export const dotF = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
export const crossF = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const isZeroF = (a) => a.every((x) => Math.abs(x) < 1e-12);
export const subF = (a, b) => a.map((x, i) => x - b[i]);
export const det2F = (a, b) => a[0] * b[1] - a[1] * b[0];
