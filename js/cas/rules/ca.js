// Traps of module C, part a (step U10): what makes the catalogue's traps
// of this part work (the table itself is META in rules/vcf.js). DEFS: {id:
// {name, judges, transform, wrongValues, explain?, check}}; explain()
// falls back on the catalogue's text. Each trap carries a `check`
// replayed by tests/judges.test.js: {judge, prev, line} (a wrong line
// diagnosed as the trap), {counter, answers}, or {bait: {skill, level?, exam?}}.
//
// Two sources of candidates:
// - the previous line: Log w or arg w moved by 2π (c_log_branch), the
//   roots of a quadratic with √(−a) read as √a (c_sqrt_i), a family line
//   without its + 2kπi (c_exp_periodic);
// - the wrong lines the generators of cplx-a write in the judge's cfg,
//   cfg.traps = {id: [texts]} (γ′ forgotten, n! forgotten, a series of the
//   other annulus, a radius squared…), read by trapLines of
//   js/judges/cplx-ca.js (judges cvalue, cfamily) or here (antideriv).
// Traps that are choices (« z̄ est holomorphe », « la constante est
// complexe », « une singularité apparente est un pôle ») are options of
// decisions and multiple choice: check {bait}.

import { parse } from '../parse.js';
import { stripParen, mapNode, walk, canonFn, contains } from '../ast.js';
import { toText } from '../print.js';
import { evalComplex, carg, CQ } from '../complex.js';
import { polyOf, coeffs, I } from '../polyx.js';
import { Q } from '../../math/rational.js';
import { trapLines, familyRef } from '../../judges/cplx-ca.js';

const hasI = (n) => contains(n, (x) => x.t === 'const' && x.name === 'i');

// tπ as readable text: −3π/4, 5π/4, π.
function piR(t) {
  for (const d of [1, 2, 3, 4, 6, 12]) {
    const n = Math.round(t * d);
    if (Math.abs(t * d - n) < 1e-9) {
      if (n === 0) return '0';
      const a = Math.abs(n);
      return `${n < 0 ? '−' : ''}${a === 1 ? '' : a}π${d === 1 ? '' : `/${d}`}`;
    }
  }
  return String(Math.round(t * Math.PI * 1000) / 1000).replace('.', ',');
}

// Log w (or arg w) with an argument moved out of ]−π ; π].
function logBranch(prev, ctx) {
  const out = trapLines('c_log_branch', ctx);
  if (!prev || typeof prev !== 'object' || prev.t === 'raw') return out;
  let target = null;
  walk(prev, (x) => {
    if (target) return false;
    if (x.t === 'fn' && ['ln', 'arg'].includes(canonFn(x.name))) {
      const w = evalComplex(x.args[0], {});
      if (w && Number.isFinite(w.re) && (Math.abs(w.im) > 1e-12 || w.re < 0)) { target = { name: canonFn(x.name), w }; return false; }
    }
    return true;
  });
  if (!target) return out;
  const th = carg(target.w) / Math.PI;
  for (const s of [1, -1]) {
    const got = th + 2 * s;
    const add = target.name === 'ln' ? (s > 0 ? '2πi' : '-2πi') : (s > 0 ? '2π' : '-2π');
    out.push({ node: { t: 'bin', op: '+', l: { t: 'paren', e: prev }, r: parse(add, { complex: true }) }, ctx: { got: piR(got), want: piR(th) } });
  }
  return out;
}

// A family line without its + 2kπi: the solutions of one turn only.
function expPeriodic(prev, ctx) {
  const out = trapLines('c_exp_periodic', ctx);
  const cfg = ctx?.cfg || {};
  if (cfg.kind !== 'cfamily' || (cfg.final || 'family') !== 'family' || !cfg.sols?.length) return out;
  try {
    out.push({ node: parse(cfg.sols.map((s) => `z = ${s}`).join(' ou '), { vars: ['z', 'w', 'k'], complex: true }), ctx: { z0: cfg.sols[0].replace(/-/g, '−') } });
    void familyRef;
  } catch { /* skip */ }
  return out;
}

// The roots of a quadratic a·u² + b·u + c = 0 with Δ < 0 real, √Δ read as
// √|Δ| (√(−16) = 4 instead of 4i): « u = (−b + √|Δ|)/(2a) ou … ».
function sqrtI(prev, ctx) {
  const cfg = ctx?.cfg || {};
  const out = trapLines('c_sqrt_i', ctx);
  const u = cfg.kind === 'cfamily' ? 'w' : cfg.unknown || 'z';
  const n = prev && typeof prev === 'object' ? stripParen(prev) : null;
  if (!n || n.t !== 'rel' || n.op !== '=') return out;
  const p = polyOf({ t: 'bin', op: '-', l: n.l, r: { t: 'paren', e: n.r } }, { complex: true });
  if (!p || [...p.vars()].some((x) => x !== u && x !== I)) return out;
  const cs = coeffs(p, u);
  if (cs.length !== 3) return out;
  const cq = cs.map((c) => {
    const parts = c.coeffsIn(I);
    if (!parts.every((x) => x.isConst)) return null;
    return new CQ(parts[0]?.constValue() ?? new Q(0), parts[1]?.constValue() ?? new Q(0));
  });
  if (cq.some((x) => !x)) return out;
  const [c0, c1, c2] = cq;
  const D = c1.mul(c1).sub(c2.mul(c0).mul(new CQ(4)));
  if (D.im.n !== 0 || D.re.n >= 0) return out;
  const t = (z) => `(${toText(z.toNode())})`;
  const absD = toText(new CQ(D.re.neg()).toNode());
  const text = `${u} = (-${t(c1)}+√(${absD}))/(2${t(c2)}) ou ${u} = (-${t(c1)}-√(${absD}))/(2${t(c2)})`;
  try { out.push({ node: parse(text, { vars: [u, 'z', 'w', 'k'], complex: true }), ctx: { Delta: toText(D.toNode()).replace(/-/g, '−') } }); } catch { /* skip */ }
  return out;
}

// The wrong lines of a gradient part (antideriv with cfg.grad).
function gradTraps(id) {
  return (prev, ctx) => {
    const cfg = ctx?.cfg || {};
    if (!cfg.grad) return [];
    const out = [];
    for (const t of cfg.traps?.[id] || []) {
      const text = typeof t === 'string' ? t : t.line;
      try { out.push({ node: parse(text, { vars: [...cfg.vars, 'C', cfg.name || 'φ', ...(cfg.params || [])], funcs: cfg.funcs || ['α', 'β', 'γ', 'g', 'h', 'k'] }), ctx: typeof t === 'string' ? {} : t.ctx || {} }); } catch { /* skip */ }
    }
    return out;
  };
}

const fromCfg = (id) => (prev, ctx) => trapLines(id, ctx);

const CV = (extra = {}) => ({ kind: 'cvalue', complex: true, ...extra });

export const DEFS = {
  c_log_branch: {
    name: 'Argument hors de ]−π ; π]',
    judges: ['cvalue'],
    transform: logBranch,
    check: { judge: CV(), prev: 'Log(-1-i)', line: 'ln(√2)+5πi/4' },
  },
  c_exp_periodic: {
    name: 'Famille + 2kπi oubliée',
    judges: ['cfamily'],
    transform: expPeriodic,
    check: {
      judge: { kind: 'cfamily', complex: true, vars: ['z', 'w', 'k'], sols: ['iπ/2', '-ln(3)-iπ/2'], roots: ['i', '-i/3'], period: '2πi', final: 'family' },
      prev: 'w = i ou w = -i/3', line: 'z = iπ/2 ou z = -ln(3)-iπ/2',
    },
  },
  c_sqrt_i: {
    name: '√(−a) lu comme √a',
    judges: ['complex', 'cfamily'],
    transform: sqrtI,
    check: { judge: { kind: 'complex', complex: true, form: 'set', unknown: 'w' }, prev: 'w^2+16 = 0', line: 'w = 4 ou w = -4' },
  },
  c_cr_sign: {
    name: 'Signe de Cauchy-Riemann',
    judges: ['antideriv'],
    transform: gradTraps('c_cr_sign'),
    check: {
      judge: { kind: 'antideriv', grad: ['2x+3', '-2y'], vars: ['x', 'y'], name: 'u', traps: { c_cr_sign: ['u = x^2+3x+y^2+C'] } },
      prev: 'u = x^2+3x+α(y)', line: 'u = x^2+3x+y^2+C',
    },
  },
  c_conj_not_holo: {
    name: 'z̄ pris pour holomorphe',
    judges: [],
    check: { bait: { skill: 'c-cauchy-riemann', exam: 'mcq' } },
  },
  c_harmonic_const_imag: {
    name: 'Constante complexe',
    judges: [],
    check: { bait: { skill: 'c-harmonic-conj' } },
  },
  c_contour_dz_forgot: {
    name: 'γ′(t) oublié',
    judges: ['cvalue'],
    transform: fromCfg('c_contour_dz_forgot'),
    check: { judge: CV({ vars: ['t'], real: ['t'], domain: { t: [0, 1] }, expect: 't(1+i)', traps: { c_contour_dz_forgot: [{ line: 't', ctx: { gp: '1 + i' } }] } }), prev: 'Re((1+i)t)', line: 't' },
  },
  c_pole_on_contour: {
    name: 'Singularité sur le contour',
    judges: [],
    check: { bait: { skill: 'c-cauchy-thm', exam: 'mcq' } },
  },
  c_cauchy_n_factor: {
    name: 'Puissance n + 1 ou n! dans la formule de Cauchy',
    judges: ['cvalue'],
    transform: fromCfg('c_cauchy_n_factor'),
    check: { judge: CV({ raw: { text: 'I' }, expect: '4πi', traps: { c_cauchy_n_factor: [{ line: '8πi', ctx: { n: 2 } }] } }), prev: 'I', line: '8πi' },
  },
  c_laurent_sign: {
    name: '(−1)ⁿ oublié',
    judges: ['cvalue'],
    transform: fromCfg('c_laurent_sign'),
    check: { judge: CV({ vars: ['z', 'n'], real: ['z'], domain: { z: [-0.6, 0.6] }, final: 'series', traps: { c_laurent_sign: ['sum(z^n, n, 0, ∞)'] } }), prev: '1/(1+z)', line: 'sum(z^n, n, 0, ∞)' },
  },
  c_laurent_wrong_annulus: {
    name: 'Développement de la mauvaise couronne',
    judges: ['cvalue'],
    transform: fromCfg('c_laurent_wrong_annulus'),
    check: {
      judge: CV({ vars: ['z', 'n'], real: ['z'], domain: { z: [1.2, 1.8] }, alt: { z: [0.3, 0.6] }, final: 'series', traps: { c_laurent_wrong_annulus: [{ line: '-sum(z^n, n, 0, ∞)', ctx: { annulus: '|z| > 1', a: '1' } }] } }),
      prev: '1/(z-1)', line: '-sum(z^n, n, 0, ∞)',
    },
  },
  c_taylor_radius: {
    name: 'Rayon : distance au carré',
    judges: ['cvalue'],
    transform: fromCfg('c_taylor_radius'),
    check: { judge: CV({ raw: { text: 'R' }, expect: '√3', final: 'number', traps: { c_taylor_radius: [{ line: '3', ctx: { z0: '0', pole: 'i√3', R: '√3' } }] } }), prev: 'R', line: '3' },
  },
  c_removable_as_pole: {
    name: 'Singularité apparente prise pour un pôle',
    judges: [],
    check: { bait: { skill: 'c-singularities', exam: 'mcq' } },
  },
  c_order_pole_numerator: {
    name: 'Ordre du pôle sans le numérateur',
    judges: ['cvalue'],
    transform: fromCfg('c_order_pole_numerator'),
    check: { judge: CV({ raw: { text: 'm' }, expect: '1', final: 'number', traps: { c_order_pole_numerator: ['2'] } }), prev: 'm', line: '2' },
  },
};

void mapNode; void hasI;
