// Traps of module F, part c (step U10): what makes the catalogue's traps
// of this part work (the table itself is META in rules/vcf.js). DEFS: {id:
// {name, judges, transform, wrongValues, explain?, check}}; explain()
// falls back on the catalogue's text. Each trap carries a `check`
// replayed by tests/judges.test.js: {judge, prev, line} (a wrong line
// diagnosed as the trap), {counter, answers}, or {bait: {skill, level?, exam?}}.
//
// The wrong lines come from the generators (js/content/uni/fourier-c-*.js),
// which write them in the judge's cfg: cfg.traps = {id: [texts]} or
// {id: [{line, ctx}]}. The judge `transform` compares a candidate text
// with the student's line by its values (the last member), the judge
// `value` by its number, the judge `lapres` by its values in t.
// f_lap_abscissa is also named by the judge `transform` itself (a wrong
// half-plane « Re z > … », or `stay` when the half-plane is missing).
// The transform judge does not diagnose an equation line (the transformed
// ODE): f_lap_deriv_ic is caught on the line Y = … (or y = …) that follows
// from the wrong equation.

import { parse } from '../parse.js';

// The candidates written by the generator in cfg.traps[id].
function fromCfg(id) {
  return (prev, ctx) => {
    const cfg = ctx?.cfg || {};
    const out = [];
    for (const t of cfg.traps?.[id] || []) {
      const line = typeof t === 'string' ? t : t.line;
      const c = typeof t === 'string' ? {} : t.ctx || {};
      if (cfg.kind === 'transform' || cfg.kind === 'lapres') { out.push({ node: line, ctx: c }); continue; }
      try { out.push({ node: parse(line, { vars: cfg.vars }), ctx: c }); } catch { /* skip */ }
    }
    return out;
  };
}

const LAP = (o) => ({ kind: 'transform', transform: 'laplace', v: 't', s: 'z', dir: 'forward', ...o });

export const DEFS = {
  f_lap_abscissa: {
    name: 'Demi-plan de convergence oublié ou faux',
    judges: ['transform', 'value'],
    transform: fromCfg('f_lap_abscissa'),
    check: { judge: LAP({ f: 'e^(2t)', F: '1/(z-2)', gamma0: 2, halfPlane: true }), prev: 'ℒ(e^(2t))', line: 'F(z) = 1/(z-2), Re z > 0' },
  },
  f_lap_shift_sign: {
    name: 'Décalage dans le mauvais sens',
    judges: ['transform'],
    transform: fromCfg('f_lap_shift_sign'),
    check: {
      judge: LAP({ f: 'e^(-2t)cos(3t)', F: '(z+2)/((z+2)^2+9)', gamma0: -2, halfPlane: true, traps: { f_lap_shift_sign: ['(z-2)/((z-2)^2+9)'] } }),
      prev: 'F(z)', line: 'F(z) = (z-2)/((z-2)^2+9), Re z > -2',
    },
  },
  f_lap_tf_sign: {
    name: 'ℒ(t f) = F′ sans le signe moins',
    judges: ['transform'],
    explain: () => '« ℒ(t f) = −F′(z) : dériver e^(−tz) par rapport à z fait sortir −t. »',
    transform: fromCfg('f_lap_tf_sign'),
    check: {
      judge: LAP({ f: 't sin(3t)', F: '6z/(z^2+9)^2', gamma0: 0, halfPlane: true, traps: { f_lap_tf_sign: ['-6z/(z^2+9)^2'] } }),
      prev: 'F(z)', line: 'F(z) = -6z/(z^2+9)^2, Re z > 0',
    },
  },
  f_sin_omega_factor: {
    name: 'sin(ωt) sans diviser par ω',
    judges: ['transform'],
    transform: fromCfg('f_sin_omega_factor'),
    check: {
      judge: LAP({ dir: 'inverse', f: '(1/2)sin(2t)', F: '1/(z^2+4)', traps: { f_sin_omega_factor: ['sin(2t)'] } }),
      prev: 'F(z) = 1/(z^2+4)', line: 'f(t) = sin(2t)',
    },
  },
  f_lap_conj_pole: {
    name: 'Pôle conjugué oublié',
    judges: ['transform'],
    transform: fromCfg('f_lap_conj_pole'),
    check: {
      judge: LAP({ dir: 'inverse', f: '(t+1)/2-e^t cos(t)/2', F: '1/(z^4-2z^3+2z^2)', traps: { f_lap_conj_pole: [{ line: '(t+1)/2-(1/4)e^((1+i)t)', ctx: { zbar: '1 − i' } }] } }),
      prev: 'f(t)', line: 'f(t) = (t+1)/2 - e^((1+i)t)/4',
    },
  },
  f_lap_deriv_ic: {
    name: 'Conditions initiales mal placées dans ℒ(y″)',
    judges: ['transform'],
    transform: fromCfg('f_lap_deriv_ic'),
    check: {
      // y″ + 2y′ + y = 1, y(0) = 1, y′(0) = 2: with z²Y − y(0) − z y′(0)
      // the student finds Y = (2z² + 3z + 1)/(z(z + 1)²).
      judge: LAP({ dir: 'inverse', unknown: 'Y', f: '1+2t e^(-t)', F: '(z^2+4z+1)/(z(z+1)^2)', traps: { f_lap_deriv_ic: ['(2z^2+3z+1)/(z(z+1)^2)'] } }),
      prev: 'z^2Y - 1 - 2z + 2(zY - 1) + Y = 1/z', line: 'Y = (2z^2+3z+1)/(z(z+1)^2)',
    },
  },
  f_lap_integro_kernel: {
    name: 'Signe du noyau exponentiel',
    judges: ['transform'],
    transform: fromCfg('f_lap_integro_kernel'),
    check: {
      judge: LAP({ f: 'e^(2t)', F: '1/(z-2)', traps: { f_lap_integro_kernel: ['1/(z+2)'] } }),
      prev: 'ℒ(e^(2t))', line: '1/(z+2)',
    },
  },
};
