// Traps of module F, part b (step U10): what makes the catalogue's traps
// of this part work (the table itself is META in rules/vcf.js). DEFS: {id:
// {name, judges, transform, wrongValues, explain?, check}}; explain()
// falls back on the catalogue's text. Each trap carries a `check`
// replayed by tests/judges.test.js: {judge, prev, line} (a wrong line
// diagnosed as the trap), {counter, answers}, or {bait: {skill, level?, exam?}}.
//
// Most candidates are written by the generators of fourier-b in the
// judge's configuration, cfg.traps = {id: [text | {line, ctx}]}: texts of
// the line a student following the trap would write (judges `transform`
// and `distrib` read their own lines; `definite` gets CAS nodes). One
// trap also works without them: f_ft_norm, on every forward Fourier
// transform (√(2π)·f̂ and f̂/√(2π) from cfg.F).
// The transform judge does not diagnose a wrong equation in the unknown
// (2û + f̂û = f̂ is refused without a name): the traps of the transformed
// equation are named on the next line, û = …, which they change too.
// Decisions and options: f_ft_alpha_zero (f̂(0) from the formula),
// f_no_inverse (stopping at û).

import { parse } from '../parse.js';
import { t } from '../../i18n.js';

// The candidates of trap `id` in the judge's configuration.
function fromCfg(id, ctx, read = (tt) => tt) {
  const list = ctx?.cfg?.traps?.[id] || [];
  const out = [];
  for (const tt of list) {
    try { out.push({ node: read(typeof tt === 'string' ? tt : tt.line), ctx: { ...(typeof tt === 'string' ? {} : tt.ctx || {}) } }); } catch { /* skip */ }
  }
  return out;
}

const F7 = { kind: 'transform', transform: 'fourier', v: 'x', s: 'α', f: 'e^(-abs(x))', F: 'sqrt(2/π)/(1+α^2)', dir: 'forward' };
const EQ = {
  kind: 'transform', transform: 'fourier', v: 'x', s: 'α', unknown: 'û', symbols: { 'f̂': 'sqrt(2/π)/(1+α^2)' },
  f: 'e^(-2abs(x))/4', F: '(1/2)sqrt(2/π)/(α^2+4)', dir: 'inverse',
};
const EQ_START = '2û + 3√(2π) f̂ û = f̂';

export const DEFS = {
  f_ft_norm: {
    name: t('Transformée sans 1/√(2π)'),
    judges: ['transform'],
    transform: (prev, ctx) => {
      const cfg = ctx?.cfg || {};
      const out = fromCfg('f_ft_norm', ctx);
      if (cfg.transform !== 'fourier' || !cfg.F || cfg.unknown || (cfg.dir ?? 'forward') !== 'forward') return out;
      return [...out, { node: `sqrt(2π)(${cfg.F})`, ctx: {} }, { node: `(${cfg.F})/sqrt(2π)`, ctx: {} }];
    },
    check: { judge: F7, prev: 'e^(-abs(x))', line: 'f̂(α) = 2/(1+α^2)' },
  },
  f_ft_alpha_zero: {
    name: t('f̂(0) lu dans la formule générale'),
    judges: [],
    explain: (ctx = {}) => t('La formule a {a} au dénominateur : elle ne dit rien en α = 0. On calcule f̂(0) = (1/√(2π))∫ f(y) dy{b}.', { a: ctx.den || 'α', b: ctx.want ? ` = ${ctx.want}` : '' }),
    check: { bait: { skill: 'f-ft-direct', level: 4 } },
  },
  f_sqrt2pi_conv: {
    name: t('ℱ(f ∗ u) = f̂ û sans √(2π)'),
    judges: ['transform'],
    transform: (prev, ctx) => fromCfg('f_sqrt2pi_conv', ctx),
    check: { judge: { ...EQ, traps: { f_sqrt2pi_conv: ['û = f̂/(2+3f̂)'] } }, prev: EQ_START, line: 'û = f̂/(2 + 3f̂)' },
  },
  f_conv_coef_dropped: {
    name: t('Coefficient de la convolution perdu'),
    judges: ['transform'],
    transform: (prev, ctx) => fromCfg('f_conv_coef_dropped', ctx),
    check: { judge: { ...EQ, traps: { f_conv_coef_dropped: ['û = f̂/(2+√(2π)f̂)'] } }, prev: EQ_START, line: 'û = f̂/(2 + √(2π) f̂)' },
  },
  f_abs_dropped: {
    name: t('Valeur absolue oubliée (e^(−w|x|))'),
    judges: ['transform'],
    transform: (prev, ctx) => fromCfg('f_abs_dropped', ctx),
    check: { judge: { ...EQ, traps: { f_abs_dropped: ['u(x) = e^(-2x)/4'] } }, prev: 'û = (1/2)√(2/π)/(α^2+4)', line: 'u(x) = e^(-2x)/4' },
  },
  f_table_line: {
    name: t('Ligne voisine de la table'),
    judges: ['transform'],
    transform: (prev, ctx) => fromCfg('f_table_line', ctx),
    check: { judge: { ...F7, traps: { f_table_line: [{ line: 'f̂(α) = 1/(√(2π)(1+iα))', ctx: { got: '1/(√(2π)(1 + iα))', want: 'F7' } }] } }, prev: 'e^(-abs(x))', line: 'f̂(α) = 1/(√(2π)(1+iα))' },
  },
  f_table_half_line: {
    name: t('« 0 sinon » oublié (ligne F3)'),
    judges: ['transform'],
    transform: (prev, ctx) => fromCfg('f_table_half_line', ctx),
    check: {
      judge: { kind: 'transform', transform: 'fourier', v: 'x', s: 'α', f: 'H(x)e^(-2x)', F: '1/(sqrt(2π)(2+iα))', dir: 'inverse', traps: { f_table_half_line: ['f(x) = e^(-2x)'] } },
      prev: 'f̂(α) = 1/(√(2π)(2+iα))', line: 'f(x) = e^(-2x)',
    },
  },
  f_no_inverse: {
    name: t('Réponse û au lieu de u'),
    judges: [],
    check: { bait: { skill: 'f-ft-eq', level: 3 } },
  },
  f_rat_simplify: {
    name: t('Fraction rationnelle mal réduite'),
    judges: ['transform', 'equiv'],
    transform: (prev, ctx) => fromCfg('f_rat_simplify', ctx, ctx?.cfg?.kind === 'equiv' ? (tt) => parse(tt, { vars: ctx.cfg.vars }) : (tt) => tt),
    check: { judge: { ...EQ, traps: { f_rat_simplify: ['û = √(2/π)/(2α^2+7)'] } }, prev: 'û = √(2/π)/(1+α^2)/(2+6/(1+α^2))', line: 'û = √(2/π)/(2α^2+7)' },
  },
  f_ft_shift_sign: {
    name: t('Signe de la translation'),
    judges: ['transform'],
    transform: (prev, ctx) => fromCfg('f_ft_shift_sign', ctx),
    check: {
      judge: { kind: 'transform', transform: 'fourier', v: 'x', s: 'α', f: 'e^(-(x-1)^2)', F: 'e^(-iα)e^(-α^2/4)/sqrt(2)', dir: 'forward', symbols: { 'ĝ': 'e^(-α^2/4)/sqrt(2)' }, traps: { f_ft_shift_sign: ['f̂(α) = e^(iα)ĝ'] } },
      prev: 'f(x) = g(x-1)', line: 'f̂(α) = e^(iα) ĝ',
    },
  },
  f_ft_deriv_sign: {
    name: 'ℱ(f′) = −iα f̂ ou ℱ(f″) = α² f̂',
    judges: ['transform'],
    transform: (prev, ctx) => fromCfg('f_ft_deriv_sign', ctx),
    check: {
      judge: { kind: 'transform', transform: 'fourier', v: 'x', s: 'α', f: '-2x e^(-x^2)', F: 'iα e^(-α^2/4)/sqrt(2)', dir: 'forward', symbols: { 'ĝ': 'e^(-α^2/4)/sqrt(2)' }, traps: { f_ft_deriv_sign: ['f̂(α) = -iα ĝ'] } },
      prev: 'f(x) = g\'(x)', line: 'f̂(α) = -iα ĝ',
    },
  },
  f_ft_scale: {
    name: t('w lu au lieu de w² (ligne F8)'),
    judges: ['transform'],
    transform: (prev, ctx) => fromCfg('f_ft_scale', ctx),
    check: {
      judge: { kind: 'transform', transform: 'fourier', v: 'x', s: 'α', f: 'e^(-3x^2)', F: 'e^(-α^2/12)/sqrt(6)', dir: 'forward', traps: { f_ft_scale: ['ĝ(α) = e^(-α^2/36)/(3√2)'] } },
      prev: 'g(x) = e^(-3x^2)', line: 'ĝ(α) = e^(-α^2/36)/(3√2)',
    },
  },
  f_plancherel_factor: {
    name: t('Plancherel avec un facteur 2π'),
    judges: ['definite'],
    transform: (prev, ctx) => fromCfg('f_plancherel_factor', ctx, (tt) => parse(tt)),
    explain: () => t('Avec la convention 1/√(2π), Plancherel n\'a pas de facteur : ∫ |f(x)|² dx = ∫ |f̂(α)|² dα.'),
    check: { judge: { kind: 'definite', known: { 'int(sin(α)^2/α^2,α,-∞,∞)': 'π' }, traps: { f_plancherel_factor: ['2π^2', '1/2'] } }, prev: 'int(sin(α)^2/α^2, α, -∞, ∞)', line: '2π^2' },
  },
  f_distrib_jump: {
    name: t('δ du saut oublié'),
    judges: ['distrib'],
    transform: (prev, ctx) => fromCfg('f_distrib_jump', ctx),
    check: { judge: { kind: 'distrib', v: 't', ref: 'D(H(t)e^(-t))', final: 'dist', traps: { f_distrib_jump: [{ line: '-H(t)e^(-t)', ctx: { h: '1', a: '0' } }] } }, prev: 'D(H(t)e^(-t))', line: '-H(t)e^(-t)' },
  },
  f_distrib_sign: {
    name: t('⟨DT, φ⟩ = ⟨T, φ′⟩ sans le signe'),
    judges: ['distrib'],
    transform: (prev, ctx) => fromCfg('f_distrib_sign', ctx),
    check: { judge: { kind: 'distrib', v: 't', ref: 'D(H(t)e^(-t))', final: 'dist', traps: { f_distrib_sign: ["int(e^(-t)φ'(t), t, 0, ∞)"] } }, prev: '⟨D(H(t)e^(-t)), φ⟩', line: "int(e^(-t) φ'(t), t, 0, ∞)" },
  },
  f_fdelta: {
    name: 'g δ_a = g(0) δ_a',
    judges: ['distrib'],
    transform: (prev, ctx) => fromCfg('f_fdelta', ctx),
    check: { judge: { kind: 'distrib', v: 'x', ref: '(x^2+1)δ_1', final: 'dist', traps: { f_fdelta: ['δ_1'] } }, prev: '(x^2+1)δ_1', line: 'δ_1' },
  },
  f_ft_delta_const: {
    name: 'ℱ(δ) = 1',
    judges: ['transform'],
    transform: (prev, ctx) => fromCfg('f_ft_delta_const', ctx),
    check: {
      judge: { kind: 'transform', transform: 'fourier', v: 'x', s: 'α', unknown: 'ŷ', f: '-e^(-2abs(x))/4', F: '-1/(sqrt(2π)(α^2+4))', dir: 'inverse', traps: { f_ft_delta_const: ['ŷ = -1/(α^2+4)'] } },
      prev: '-α^2 ŷ - 4ŷ = 1/√(2π)', line: 'ŷ = -1/(α^2+4)',
    },
  },
};
