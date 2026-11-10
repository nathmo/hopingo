// Two judges of module F, part a (step U10), added to JUDGES by
// js/judges/index.js:
//
// `fcomplex` — complex values, as the judge `complex` (js/judges/complex.js)
//   compares them, with two additions the Fourier items need:
//   cfg.expect (text): the line must have that value, whatever the line
//     before it (a part that asks « c₃ = ? », started from the label c_3);
//   cfg.form 'realfn': lines in real letters (cfg.vars, e.g. t) whose final
//     form is real: no i, no Re, Im, conj left (u(t) assembled from its
//     complex coefficients cₙe^(int)).
//   Other forms (algebraic, real…) are those of `complex`. cfg.traps
//   {trapId: [texts]} holds the wrong values of the part (rules/fa.js).
//
// `eigen` — eigenfunctions of a Sturm-Liouville problem −u″ = λₙu on
//   ]0 ; L[: cfg = {lambda: text in n, L: text, bc: ['D' | 'N', 'D' | 'N'],
//   nFrom: 0 | 1, v: 'x'}. A line « u_n = φ(x, n) » (or « u = … », or φ
//   alone) is right if, for n = nFrom … nFrom + 5, φ is not identically 0,
//   −φ″ = λₙφ on ]0 ; L[, and the boundary conditions hold (D: u = 0, N:
//   u′ = 0) at 0 and at L. Any nonzero multiple is right. A right line is
//   final.

import * as complex from './complex.js';
import { parse } from '../cas/parse.js';
import { toMathML } from '../cas/mathml.js';
import { toText } from '../cas/print.js';
import { contains, stripParen, symbolsIn, unparen, walk } from '../cas/ast.js';
import { complexValue } from '../cas/complex.js';
import { evalFloat } from '../cas/numeric.js';
import { diff } from '../cas/diff.js';
import { diagnoseLine } from './diagnose.js';
import { sameLine } from './common.js';

// ---------- fcomplex ----------

const hasImag = (n) => contains(n, (x) => (x.t === 'const' && x.name === 'i') || (x.t === 'fn' && ['Re', 'Im', 'conj', 'arg'].includes(x.name)));

const EXPECTS = new Map();
function expectNode(cfg) {
  const key = `${(cfg.vars || []).join(',')}|${cfg.expect}`;
  if (!EXPECTS.has(key)) EXPECTS.set(key, complex.parseLine(cfg, String(cfg.expect)));
  return EXPECTS.get(key);
}

const inner = (cfg) => ({ ...cfg, kind: 'complex', form: cfg.form === 'realfn' ? 'any' : cfg.form });

// Nodes of a tree (a writing's size).
function size(n) {
  let k = 0;
  walk(unparen(n), () => { k++; return true; });
  return k;
}
// a + bi in ℚ(i), written short: '1-2i', '-3i/2', '3/2'.
function shortText(re, im) {
  if (im.n === 0) return String(re);
  const a = Math.abs(im.n);
  const imT = `${a === 1 ? '' : a}i${im.d === 1 ? '' : `/${im.d}`}`;
  if (re.n === 0) return `${im.n < 0 ? '-' : ''}${imT}`;
  return `${re}${im.n < 0 ? '-' : '+'}${imT}`;
}

function finalOf(cfg, node) {
  if (cfg.form === 'realfn') return !hasImag(node);
  const fin = complex.isFinal(inner(cfg), node);
  if (fin !== true || (cfg.form || 'algebraic') !== 'algebraic') return fin;
  // An exact value in ℚ(i) must be written about as short as a + bi
  // (−2i/2 is not finished).
  const v = complexValue(node);
  if (!v?.exact) return true;
  const short = complex.parseLine(cfg, shortText(v.exact.re, v.exact.im));
  return size(node) <= size(short) + 1 ? true : 'Simplifie ce nombre.';
}

export const fcomplex = {
  sign: '=',
  parseLine: (cfg, text) => complex.parseLine(cfg, text),
  start: (cfg) => cfg.start,
  isFinal: finalOf,
  judgeLine(cfg, prev, input, state = {}) {
    let node;
    if (input && typeof input === 'object') node = input;
    else {
      try { node = complex.parseLine(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
    }
    if (prev && sameLine(node, prev)) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
    const ref = cfg.expect !== undefined ? expectNode(cfg) : prev;
    let v;
    if (cfg.expect !== undefined && sameLine(node, ref)) v = { kind: 'ok', node };
    else v = complex.judgeLine(inner(cfg), ref, node, state);
    if (!['ok', 'done', 'stay'].includes(v.kind)) return v;
    if (v.kind === 'stay' && /défini/.test(v.message || '')) return v;
    const fin = finalOf(cfg, node);
    if (fin === true) return { kind: 'done', node };
    if (typeof fin === 'string') return { kind: 'stay', node, message: `C'est juste, mais ${fin.charAt(0).toLowerCase()}${fin.slice(1)}` };
    if (cfg.form === 'realfn') return { kind: 'ok', node, message: 'Juste. Écris-la maintenant sans i : e^(iθ) + e^(−iθ) = 2cos θ.' };
    return { kind: 'ok', node };
  },
};

// ---------- eigen ----------

const vOf = (cfg) => cfg.v || 'x';
const LABEL = /^\s*[uφ](?:_\(?n\)?|_n)?\s*(?:\(\s*[a-z]\s*\))?\s*=/;

function parseEigen(cfg, text) {
  const t = String(text).replace(/^\s*=/, '').replace(LABEL, '');
  return parse(t, { vars: [vOf(cfg), 'n'], dvar: vOf(cfg) });
}

const ev = (n, env) => evalFloat(n, env, { guard: true });
const near0 = (x, scale) => Math.abs(x) <= 1e-7 * (1 + scale);

// null if φ is an eigenfunction, else the reason (a message).
function eigenIssue(cfg, phi) {
  const v = vOf(cfg);
  const L = ev(parse(String(cfg.L ?? 'π')), {});
  const lam = parse(String(cfg.lambda), { vars: ['n'] });
  const d1 = diff(phi, v);
  const d2 = diff(d1, v);
  const from = cfg.nFrom ?? 1;
  for (let n = from; n <= from + 5; n++) {
    const l = ev(lam, { n });
    let big = 0;
    for (let k = 1; k <= 9; k++) {
      const x = (L * k) / 10;
      const env = { [v]: x, n };
      const u = ev(phi, env);
      const u2 = ev(d2, env);
      if (!Number.isFinite(u) || !Number.isFinite(u2)) return 'Ta fonction n\'est pas définie partout sur ]0 ; L[.';
      big = Math.max(big, Math.abs(u));
      if (!near0(-u2 - l * u, Math.abs(u2) + Math.abs(l * u))) return `Pour n = ${n}, ta fonction ne vérifie pas −u″ = λₙu.`;
    }
    if (big < 1e-9) return `Pour n = ${n}, ta fonction est nulle : u = 0 n'est pas une fonction propre, on veut u ≠ 0.`;
    const bc = cfg.bc || ['D', 'D'];
    for (const [side, at] of [[0, 0], [1, L]]) {
      const env = { [v]: at, n };
      const val = bc[side] === 'D' ? ev(phi, env) : ev(d1, env);
      if (!near0(val, big)) {
        const where = side === 0 ? '0' : (cfg.Ltext || 'L');
        return bc[side] === 'D' ? `Pour n = ${n}, u(${where}) ≠ 0 : la condition au bord n'est pas vérifiée.` : `Pour n = ${n}, u′(${where}) ≠ 0 : la condition au bord n'est pas vérifiée.`;
      }
    }
  }
  return null;
}

export const eigen = {
  sign: '',
  parseLine: parseEigen,
  start: (cfg) => cfg.start,
  isFinal: () => true,
  show: (cfg, node, opts = {}) => {
    const body = toMathML(unparen(node), { dvar: vOf(cfg), ...opts });
    if (!symbolsIn(node).has(vOf(cfg))) return body;
    return body.replace(/^(<math[^>]*>)([\s\S]*)(<\/math>)$/, '$1<mrow><msub><mi>u</mi><mi>n</mi></msub><mo>=</mo>$2</mrow>$3');
  },
  text: (cfg, node) => toText(node, { dvar: vOf(cfg) }),
  judgeLine(cfg, prev, input, state = {}) {
    let node;
    if (input && typeof input === 'object') node = input;
    else {
      try { node = parseEigen(cfg, input); } catch (e) { return { kind: 'parse', message: e.message }; }
    }
    const unknown = [...symbolsIn(node)].filter((s) => s !== vOf(cfg) && s !== 'n');
    if (unknown.length) return { kind: 'parse', node, message: `Je ne connais pas la lettre « ${unknown[0].replace(/_$/, '')} » ici : écris uₙ avec ${vOf(cfg)} et n.` };
    if (prev && sameLine(node, prev)) return { kind: 'same', node, message: 'Avance d\'au moins une étape.' };
    if (stripParen(node).t === 'rel') return { kind: 'parse', node, message: 'Écris seulement uₙ(x) = …' };
    let issue;
    try { issue = eigenIssue(cfg, node); } catch { issue = 'Je n\'arrive pas à calculer ta fonction.'; }
    if (issue) {
      const diag = diagnoseLine('eigen', prev, node, cfg, (cand, line) => { try { return toText(cand) === toText(line); } catch { return false; } });
      return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message: issue };
    }
    return { kind: 'done', node };
  },
};

export const FA_JUDGES = { fcomplex, eigen };
