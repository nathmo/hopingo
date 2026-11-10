// Traps of module C, part b (step U10): what makes the catalogue's traps
// of this part work (the table itself is META in rules/vcf.js). DEFS: {id:
// {name, judges, transform, wrongValues, explain?, check}}; explain()
// falls back on the catalogue's text. Each trap carries a `check`
// replayed by tests/judges.test.js: {judge, prev, line} (a wrong line
// diagnosed as the trap), {counter, answers}, or {bait: {skill, level?, exam?}}.
//
// Every trap of the part is a wrong value or a wrong bound: the generators
// (js/content/uni/cplx-b-*.js) write them in the configuration of the part
// where they can happen, cfg.traps = {id: [text | {line, ctx}]}, and the
// judges `cval` (labelled complex values) and `arcb` (bounds on an arc) of
// js/judges/cplx-cb.js compare them with the student's line by value. The
// same traps are the distractors of the multiple choices and the invalid
// options of the decisions and menus (rule on the option), and two are decoy
// blocks of the arc estimates (c_cos_bounded, c_arc_triangle).

import { parse } from '../parse.js';

// « Res = … »: the value after the last top-level « = » (as the judge cval reads it).
function lastMember(text) {
  const t = String(text).trim();
  let depth = 0;
  let at = -1;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if ('([{'.includes(c)) depth++;
    else if (')]}'.includes(c)) depth--;
    else if (c === '=' && depth === 0) at = i;
  }
  return at >= 0 ? t.slice(at + 1) : t;
}

function readFor(cfg, text) {
  if (cfg.kind === 'arcb') return parse(String(text), { vars: ['z', cfg.rv || 'R', 'θ', ...Object.keys(cfg.params || {})], complex: true });
  return parse(lastMember(text), { vars: [...(cfg.vars || [])], complex: true });
}

// The candidates written by the generator in cfg.traps[id].
function fromCfg(id) {
  return (prev, ctx) => {
    const cfg = ctx?.cfg || {};
    const out = [];
    for (const t of cfg.traps?.[id] || []) {
      try { out.push({ node: readFor(cfg, typeof t === 'string' ? t : t.line), ctx: { ...(typeof t === 'string' ? {} : t.ctx || {}) } }); } catch { /* skip */ }
    }
    return out;
  };
}

const T = (id, name, judges, check) => ({ name, judges, transform: fromCfg(id), check });
const RES = (z0, f = 'f') => ({ label: `Res(${f} ; ${z0})` });
const CV = (lab, expect, traps, extra = {}) => ({ kind: 'cval', complex: true, ...lab, expect, form: 'algebraic', traps, ...extra });

export const DEFS = {
  c_pole_outside_counted: T('c_pole_outside_counted', 'Pôle extérieur compté', ['cval'], {
    judge: CV({ label: '∮ f(z) dz' }, '-4πi/3', { c_pole_outside_counted: [{ line: '2πi(1/3-1+2/3)', ctx: { z: '3', d: '3', R: '2' } }] }),
    prev: '∮ f(z) dz', line: '2πi(1/3-1+2/3)',
  }),
  c_residue_2pii: T('c_residue_2pii', 'Facteur 2πi oublié', ['cval'], {
    judge: CV({ label: '∮ f(z) dz' }, '-4πi/3', { c_residue_2pii: ['1/3-1', 'πi(1/3-1)'] }),
    prev: '∮ f(z) dz', line: '1/3-1',
  }),
  c_simple_formula_double: T('c_simple_formula_double', 'Formule du pôle simple en un pôle multiple', ['cval'], {
    judge: CV(RES('1'), '-1/4', { c_simple_formula_double: [{ line: '1/((1)+1)', ctx: {} }] }),
    prev: 'Res(f ; 1)', line: '1/2',
  }),
  c_multiple_factorial: T('c_multiple_factorial', '1/(m − 1)! oublié', ['cval'], {
    judge: CV(RES('0'), '1/2', { c_multiple_factorial: [{ line: '1', ctx: { m: 3, f: 2 } }] }),
    prev: 'Res(f ; 0)', line: '1',
  }),
  c_essential_lim: T('c_essential_lim', 'Formule de pôle en une singularité essentielle', ['cval'], {
    judge: CV(RES('0', 'sin(1/z)'), '1', { c_essential_lim: ['0'] }),
    prev: 'Res(sin(1/z) ; 0)', line: '0',
  }),
  c_essential_factor: T('c_essential_factor', 'Facteur de 1/(a − bz) oublié', ['cval'], {
    judge: CV(RES('2i/3', 'h'), '-1/3', { c_essential_factor: ['1'] }),
    prev: 'Res(h ; 2i/3)', line: '1',
  }),
  c_upper_half_lower_pole: T('c_upper_half_lower_pole', 'Pôles du mauvais demi-plan', ['cval'], {
    judge: CV({ label: '∫ f(x) dx' }, 'π/6', { c_upper_half_lower_pole: ['2πi(-1/(6i)+1/(12i))'] }, { form: 'real' }),
    prev: '∫ f(x) dx', line: '-π/6',
  }),
  c_jordan_alpha_sign: T('c_jordan_alpha_sign', 'Fermé du mauvais côté pour α', ['cval'], {
    judge: CV({ label: '∫ f(x) dx' }, 'πe^(-2)', { c_jordan_alpha_sign: [{ line: 'πe^2', ctx: { alpha: '−2', sign: '≤' } }] }, { form: 'real' }),
    prev: '∫ f(x) dx', line: 'πe^2',
  }),
  c_eiax_cos: T('c_eiax_cos', 'cos(αz) mis dans le contour', ['cval'], {
    judge: CV({ label: '∫ f(x) dx' }, 'πe^(-2)', { c_eiax_cos: ['πcosh(2)'] }, { form: 'real' }),
    prev: '∫ f(x) dx', line: 'π cosh(2)',
  }),
  c_cos_bounded: T('c_cos_bounded', '|cos z| ≤ 1 sur ℂ', ['arcb'], {
    judge: { kind: 'arcb', rel: '≤', arc: [0, Math.PI], traps: { c_cos_bounded: ['1/|z^2+1|'] } },
    prev: '|cos(2z)/(z^2+1)|', line: '1/|z^2+1|',
  }),
  c_arc_triangle: T('c_arc_triangle', 'Majoration de 1/|q| par 1/(R² + 1)', ['arcb'], {
    judge: { kind: 'arcb', rel: '≤', arc: [0, Math.PI], traps: { c_arc_triangle: ['1/(R^2+1)'] } },
    prev: '1/|z^2+1|', line: '1/(R^2+1)',
  }),
  c_trig_sub: T('c_trig_sub', 'Substitution z = e^(iθ) mal faite', ['cval'], {
    judge: CV({ label: 'g(z)' }, '2/(-z^2+2i√(5)z+1)', { c_trig_sub: [{ line: '2/(-z^2+i√(5)z+1)', ctx: { missing: 'le facteur 2 devant i√5 z' } }] }, { vars: ['z'], form: 'ratz' }),
    prev: 'g(z)', line: '2/(-z^2+i√(5)z+1)',
  }),
  c_branch_factor: T('c_branch_factor', 'Facteur du bord de la coupure', ['cval'], {
    judge: CV({ label: 'facteur' }, '2', { c_branch_factor: ['1+e^(-iπ)', '1-e^(-iπ/2)'] }),
    prev: 'facteur', line: '1+e^(-iπ)',
  }),
  c_fourier_res_sign: T('c_fourier_res_sign', 'Sens négatif oublié (contour du bas)', ['cval'], {
    judge: CV({ label: 'f̂(α)' }, '√(π/2)e^(-α)', { c_fourier_res_sign: ['-√(π/2)e^(-α)'] }, { vars: ['α'], domain: { α: [0.3, 3] }, form: 'value' }),
    prev: 'f̂(α)', line: '-√(π/2)e^(-α)',
  }),
  c_mobius_point: T('c_mobius_point', 'Division complexe terme à terme', ['cval'], {
    judge: CV({ label: 'w(1)' }, '-i', { c_mobius_point: ['1'] }),
    prev: 'w(1)', line: '1',
  }),
};
