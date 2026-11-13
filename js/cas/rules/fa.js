// Traps of module F, part a (step U10): what makes the catalogue's traps
// of this part work (the table itself is META in rules/vcf.js). DEFS: {id:
// {name, judges, transform, wrongValues, explain?, check}}; explain()
// falls back on the catalogue's text. Each trap carries a `check`
// replayed by tests/judges.test.js: {judge, prev, line} (a wrong line
// diagnosed as the trap), {counter, answers}, or {bait: {skill, level?, exam?}}.
//
// The generators of fourier-a know the numbers of each item: they write the
// wrong lines of each trap in the configuration of the part's judge,
// cfg.traps = {trapId: [texts]} or {trapId: [{line, ctx}]} (ctx fills the
// {…} of the explanation), and `transform` reads them back (fromCfg). A
// text is read as the judge reads its lines: in n for the Fourier
// coefficients (equiv), numbers with ∫ (definite, value), complex numbers
// (complex, fcomplex: js/judges/fourier-a-judges.js), named values (prob).
// The traps that are a choice (« f paire ⟹ aₙ = 0 », « k ≥ 0 », « λ = 0 »,
// « dériver terme à terme ») are also options of the items' decisions and
// multiple choices, with their rule.

import { parse } from '../parse.js';
import { readStat } from '../../judges/statline.js';
import { t } from '../../i18n.js';

function readFor(cfg, text) {
  const k = cfg.kind;
  if (k === 'prob' || k === 'stat') return readStat(cfg, String(text));
  if (k === 'complex' || k === 'fcomplex') return parse(String(text), { vars: [...(cfg.vars || []), cfg.unknown || 'z'], complex: true });
  return parse(String(text), { vars: cfg.vars, dvar: cfg.dvar || cfg.vars?.[0] || 'x', funcs: cfg.funcs });
}

// The candidates written by the generator in cfg.traps[id].
const fromCfg = (id) => (prev, ctx) => {
  const cfg = ctx?.cfg || {};
  const out = [];
  for (const tt of cfg.traps?.[id] || []) {
    try { out.push({ node: readFor(cfg, typeof tt === 'string' ? tt : tt.line), ctx: typeof tt === 'string' ? {} : { ...(tt.ctx || {}) } }); } catch { /* skip */ }
  }
  return out;
};

const COEF = { kind: 'equiv', vars: ['n'], domain: { n: { int: [1, 40] } }, target: 'no-int' };

export const DEFS = {
  f_even_an_zero: {
    name: t('Fonction paire : aₙ = 0 au lieu de bₙ = 0'),
    judges: ['equiv', 'prob'],
    transform: fromCfg('f_even_an_zero'),
    explain: () => t('f paire : f(x) sin(nx) est impaire, son intégrale sur une période symétrique est nulle : ce sont les bₙ qui valent 0. Les aₙ se calculent, avec (4/T)∫₀^(T/2) f(x) cos(nωx) dx.'),
    check: { judge: { ...COEF, traps: { f_even_an_zero: ['0'] } }, prev: '(2/π) int(x^2 cos(n x), x, 0, π)', line: '0' },
  },
  f_a0_separate: {
    name: t('a₀ ou l\'indice spécial pris dans la formule générale'),
    judges: ['value', 'definite', 'prob'],
    transform: fromCfg('f_a0_separate'),
    explain: (ctx = {}) => (ctx.kind === 'c0'
      ? t('Avec la convention a₀/2, le terme constant de la série est a₀/2 = c₀ : a₀ = 2c₀.')
      : t('La formule de aₙ a été obtenue pour n ≥ 1 (on a divisé par n) : a₀ se calcule à part. Et une partie trigonométrique de f (comme cos 2x) est son propre développement : elle ajoute {a} au coefficient de même indice.', { a: ctx.c ?? t('son coefficient') })),
    check: { judge: { kind: 'value', expect: '1', form: 'closed', traps: { f_a0_separate: [{ line: '0', ctx: { c: '1' } }] } }, prev: 'a_2', line: '0' },
  },
  f_interval_02pi: {
    name: t('Intégrale sur [0 ; 2π] avec la formule de ]−π ; π['),
    judges: ['definite', 'equiv'],
    transform: fromCfg('f_interval_02pi'),
    explain: (ctx = {}) => t('f est donnée sur ]−π ; π[ puis prolongée par périodicité : sur ]π ; 2π[, ce n\'est plus la même formule{a}. Intègre sur la période où f est donnée, ou change de formule sur ]π ; 2π[.', { a: ctx.f ? ` (f(x) ≠ ${ctx.f})` : '' }),
    check: { judge: { kind: 'definite', traps: { f_interval_02pi: [{ line: '(1/π) int(x, x, 0, 2π)', ctx: { f: 'x' } }] } }, prev: '(1/π)(int(-x, x, -π, 0) + int(x, x, 0, π))', line: '2π' },
  },
  f_period_omega: {
    name: t('cos(nx) gardé quand T ≠ 2π'),
    judges: ['equiv'],
    transform: fromCfg('f_period_omega'),
    check: { judge: { ...COEF, traps: { f_period_omega: [{ line: '2 int(2x sin(n x), x, 0, 1)', ctx: { T: '2', omega: 'π' } }] } }, prev: '2 int(2x sin(n π x), x, 0, 1)', line: '2 int(2x sin(n x), x, 0, 1)' },
  },
  f_coef_complex_convert: {
    name: t('bₙ = cₙ − c₋ₙ sans le facteur i'),
    judges: ['complex', 'fcomplex'],
    transform: fromCfg('f_coef_complex_convert'),
    check: { judge: { kind: 'fcomplex', expect: '4', form: 'algebraic', complex: true, traps: { f_coef_complex_convert: ['-4i'] } }, prev: 'b_3', line: '(1-2i)-(1+2i)' },
  },
  f_sine_wrong_factor: {
    name: t('Série en sinus avec 1/L au lieu de 2/L'),
    judges: ['equiv'],
    transform: fromCfg('f_sine_wrong_factor'),
    check: { judge: { ...COEF, traps: { f_sine_wrong_factor: ['(1/π) int(x sin(n x), x, 0, π)'] } }, prev: '(2/π) int(x sin(n x), x, 0, π)', line: '(1/π) int(x sin(n x), x, 0, π)' },
  },
  f_ipp_sign: {
    name: t('Signe du terme tout intégré'),
    judges: ['equiv'],
    transform: fromCfg('f_ipp_sign'),
    check: { judge: { ...COEF, traps: { f_ipp_sign: ['(2/π)(π(-1)^n/n)'] } }, prev: '(2/π) int(x sin(n x), x, 0, π)', line: '2(-1)^n/n' },
  },
  f_dirichlet_skip: {
    name: t('F f(x₀) = f(x₀) en un point de saut'),
    judges: ['value'],
    transform: fromCfg('f_dirichlet_skip'),
    check: { judge: { kind: 'value', expect: 'π/2', form: 'closed', funcs: ['F'], traps: { f_dirichlet_skip: [{ line: '0', ctx: { x0: '0', mean: 'π/2' } }] } }, prev: 'F(0)', line: '0' },
  },
  f_sine_endpoint: {
    name: t('F_s f(L) = f(L) au bord'),
    judges: ['value'],
    transform: fromCfg('f_sine_endpoint'),
    check: { judge: { kind: 'value', expect: '0', form: 'closed', funcs: ['F'], traps: { f_sine_endpoint: ['π^2'] } }, prev: 'F(π)', line: 'π^2' },
  },
  f_sum_reindex: {
    name: t('Bornes décalées en réindexant'),
    judges: [],
    wrongValues: () => [],
    check: { bait: { skill: 'f-dirichlet', level: 3 } },
  },
  f_parseval_bounds: {
    name: t('Parseval intégré sur [0 ; 2π]'),
    judges: ['definite'],
    transform: fromCfg('f_parseval_bounds'),
    check: { judge: { kind: 'definite', known: { G: '2π^6/7' }, traps: { f_parseval_bounds: ['(1/π) int(x^6, x, 0, 2π)'] } }, prev: 'G', line: '(1/π) int(x^6, x, 0, 2π)' },
  },
  f_parseval_factor: {
    name: t('Parseval sans le facteur 2/T'),
    judges: ['definite'],
    transform: fromCfg('f_parseval_factor'),
    check: { judge: { kind: 'definite', known: { G: '2π^6/7' }, traps: { f_parseval_factor: [{ line: 'int(x^6, x, -π, π)', ctx: { T: '2π', want: '(1/π)∫ x⁶ dx = 2π⁶/7' } }] } }, prev: 'G', line: 'int(x^6, x, -π, π)' },
  },
  f_parseval_square: {
    name: t('Parseval sans les carrés'),
    judges: ['definite', 'equiv'],
    transform: fromCfg('f_parseval_square'),
    check: { judge: { kind: 'definite', known: { G: '2π^2/3' }, traps: { f_parseval_square: ['(1/π) int(x, x, -π, π)'] } }, prev: 'G', line: '(1/π) int(x, x, -π, π)' },
  },
  f_parseval_expand: {
    name: t('(a − b)² développé en a² − b²'),
    judges: ['equiv'],
    transform: fromCfg('f_parseval_expand'),
    check: { judge: { ...COEF, target: 'any', traps: { f_parseval_expand: ['4π^4/n^2-144/n^6'] } }, prev: '((-1)^(n+1)(2π^2/n-12/n^3))^2', line: '4π^4/n^2-144/n^6' },
  },
  f_parseval_a0: {
    name: t('a₀² au lieu de a₀²/2'),
    judges: ['value'],
    transform: fromCfg('f_parseval_a0'),
    check: { judge: { kind: 'value', expect: '2π^4/9', form: 'closed', traps: { f_parseval_a0: ['4π^4/9'] } }, prev: 'T', line: '4π^4/9' },
  },
  f_coef_relation_factor: {
    name: t('Coefficient de h au lieu de celui de c·h'),
    judges: ['prob'],
    transform: fromCfg('f_coef_relation_factor'),
    check: { judge: { kind: 'prob', vars: ['n'], domain: { n: { int: [1, 40] } }, expect: '4(-1)^n(2π^2/n^2-12/n^4)', traps: { f_coef_relation_factor: ['(-1)^n(2π^2/n^2-12/n^4)'] } }, prev: 'a_n', line: '(-1)^n(2π^2/n^2-12/n^4)' },
  },
  f_termwise_deriv: {
    name: t('Dériver terme à terme une série discontinue'),
    judges: [],
    wrongValues: () => [],
    explain: (ctx = {}) => t('Le prolongement périodique de {a} saute en ±π : on ne peut pas dériver sa série terme à terme (la série dérivée ne converge même pas). On dérive seulement la série d\'une fonction continue et périodique, C¹ par morceaux.', { a: ctx.f || 'f' }),
    check: { bait: { skill: 'f-coef-relations', level: 3 } },
  },
  f_ode_shift_phase: {
    name: t('Retard sans le facteur e^(−inτ)'),
    judges: ['complex', 'fcomplex'],
    transform: fromCfg('f_ode_shift_phase'),
    check: { judge: { kind: 'fcomplex', expect: '-1/(3i-2)', form: 'algebraic', complex: true, traps: { f_ode_shift_phase: ['-1/(3i+2)'] } }, prev: 'c_3', line: '-1/(3i+2)' },
  },
  f_sl_eigen_zero: {
    name: t('Cas λ = 0 oublié ou gardé à tort'),
    judges: [],
    wrongValues: () => [],
    check: { bait: { skill: 'f-sturm-liouville', level: 3 } },
  },
};
