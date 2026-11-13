// Helpers of module F, part b (unit `fourier`, step U10): texts of
// coefficients, exact values over √(2π), configurations of the judges
// `transform` and `distrib`, the definition of f̂ in blocks, MathML of a
// line as its judge shows it, and multiple choice (one answer in the
// lessons, several in the exam: convention of catalogue F).

import { Q } from '../../math/rational.js';
import { readWith, showWith } from '../../judges/index.js';
import { RULE_BY_ID } from '../../math/malrules.js';
import { MT, mcq, blocksItem } from './kit.js';
import { fourierTableHtml } from './fourier-tables.js';
import { t } from '../../i18n.js';

export { MT };
export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
export const qt = (x) => String(q(x));
export const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
export const modeOf = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');
export const rd = (tt) => String(tt).replace(/-/g, '−');
export const TABLE = () => fourierTableHtml();
export const KEYS_FT = ['calcx', 'calcfn', 'transf', 'anal'];
export const KEYS_D = ['calcx', 'calcfn', 'distrib', 'anal'];

// c·body as text: 'x', '-x', '3x', '(3/2)x'; body '' gives the number.
export function term(c, body) {
  const C = q(c);
  if (C.n === 0) return '';
  if (!body) return qt(C);
  if (C.eq(1)) return body;
  if (C.eq(-1)) return `-${body}`;
  if (C.d === 1) return `${C.n}${body}`;
  return `${C.n < 0 ? '-' : ''}(${Math.abs(C.n)}/${C.d})${body}`;
}
export const sumT = (terms) => terms.filter((tt) => tt && tt !== '0').reduce((s, tt) => (s ? (tt.startsWith('-') ? `${s}${tt}` : `${s}+${tt}`) : tt), '') || '0';
// A factor before a letter or a bracket: '' for 1, '-' for −1, '3', '(3/2)'.
export const fac = (c) => { const C = q(c); if (C.eq(1)) return ''; if (C.eq(-1)) return '-'; return C.d === 1 ? String(C.n) : `(${qt(C)})`; };
// A number in a product: 3, (−1/2).
export const num = (c) => { const s = qt(c); return /^\d+$/.test(s) ? s : `(${s})`; };

const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
// q/√(2π) in the closed form the judge `definite` wants: p√2/(r√π).
export function overSqrt2pi(x) {
  const c = q(x).div(2); // q/√(2π) = (q/2)·√2/√π
  if (c.n === 0) return '0';
  const s = c.n < 0 ? '-' : '';
  const n = Math.abs(c.n);
  const top = n === 1 ? '√2' : `${n}√2`;
  return c.d === 1 ? `${s}${top}/√π` : `${s}${top}/(${c.d}√π)`;
}
// q·√(π/2) in closed form: p√π/(r√2) = p√(2π)/(2r)… written p√2·√π/(2r).
export function timesSqrtPiOver2(x) {
  const c = q(x).div(2); // q√(π/2) = (q/2)√2√π
  if (c.n === 0) return '0';
  const s = c.n < 0 ? '-' : '';
  const n = Math.abs(c.n);
  const top = n === 1 ? '√2√π' : `${n}√2√π`;
  return c.d === 1 ? `${s}${top}` : `${s}${top}/${c.d}`;
}
void gcd;

// ---------- judges ----------

// The judge `transform` for Fourier (convention 1/√(2π)).
export const ft = (o) => ({ kind: 'transform', transform: 'fourier', v: o.v || 'x', s: 'α', dir: 'forward', ...o });
export const dist = (o) => ({ kind: 'distrib', v: 'x', final: 'dist', ...o });

// A line as its judge shows it (MathML), or the text.
export function LML(cfg, text, display = false) {
  try { return showWith(cfg, readWith(cfg, text), display ? { display: true } : {}); } catch { return rd(text); }
}
// A formula of the transform language (with 𝓕, hats) for prompts and options.
export const FML = (text, v = 'x') => LML(ft({ v, f: '0', F: '0', unknown: undefined, symbols: { 'f̂': '0', 'ĝ': '0', 'û': '0', 'ŷ': '0' } }), text);
export const DML = (text, v = 'x', fns = {}) => LML(dist({ v, ref: '0', fns }), text);

// ---------- multiple choice ----------

// Options: {right: [html], wrongs: [{html, rule}], fillers}. In the exam
// (opts.exam), several right options (multi); in a lesson, one.
export function mcqF(o, rng) {
  const multi = !!o.exam;
  const rights = multi ? o.right : o.right.slice(0, 1);
  const options = rights.map((html) => ({ html, correct: true }));
  const count = o.count || (multi ? 5 : 4);
  for (const w of [...(o.wrongs || []), ...(o.fillers || [])]) {
    if (options.length >= count) break;
    if (!w || w.html === undefined || options.some((x) => x.html === w.html)) continue;
    options.push({ html: w.html, correct: false, rule: w.rule && RULE_BY_ID[w.rule] ? w.rule : null });
  }
  const it = mcq({ ...o, options, multi }, rng);
  if (multi) it.prompt = t('{prompt} <i>(plusieurs réponses possibles)</i>', { prompt: it.prompt });
  return it;
}

// ---------- the definition of f̂ (blocks) ----------

const DEF_BLOCKS = [
  t('Soit f : ℝ → ℝ continue par morceaux'),
  t('telle que ∫<sub>ℝ</sub> |f(y)| dy &lt; ∞ (f est absolument intégrable).'),
  t('Sa transformée de Fourier est f̂(α) = (1/√(2π)) ∫<sub>ℝ</sub> f(y) e<sup>−iαy</sup> dy, pour tout α ∈ ℝ.'),
];
const DEF_DECOYS = [
  { html: t('Sa transformée de Fourier est f̂(α) = ∫<sub>ℝ</sub> f(y) e<sup>−iαy</sup> dy, pour tout α ∈ ℝ.'), rule: 'f_ft_norm', why: t('Dans ce cours, il y a le facteur 1/√(2π) devant l\'intégrale.') },
  { html: t('Sa transformée de Fourier est f̂(α) = (1/(2π)) ∫<sub>ℝ</sub> f(y) e<sup>−iαy</sup> dy, pour tout α ∈ ℝ.'), rule: 'f_ft_norm', why: t('Le facteur est 1/√(2π), pas 1/(2π) : c\'est lui qui rend Plancherel sans constante.') },
  { html: t('telle que ∫<sub>ℝ</sub> f(y) dy converge.'), rule: 'a1_abs_conv_confused', why: t('Il faut ∫ |f| &lt; ∞ : sin(y)/y a une intégrale convergente sans être absolument intégrable.') },
];

// The definition in blocks. Scale (§16.3): L1 the last block, L2 the last
// two, L3 all and two decoys, L4 and more all and every decoy.
export function defBlocks(skill, level, rng, { exam = false, noHints = false, subgoals = [] } = {}) {
  const ids = DEF_BLOCKS.map((_, i) => `d${i}`);
  const blocks = DEF_BLOCKS.map((html, i) => ({ id: ids[i], html, needs: i ? [ids[i - 1]] : [], earlyWhy: i ? t('Pas encore : les hypothèses d\'abord, dans l\'ordre.') : undefined }));
  const placed = level === 1 ? ids.slice(0, 2) : level === 2 ? ids.slice(0, 1) : [];
  const order = ids.filter((id) => !placed.includes(id));
  const nDecoys = level >= 4 ? 3 : 2;
  const used = rng.shuffle(DEF_DECOYS).slice(0, nDecoys).map((d, i) => ({ id: `x${i}`, html: d.html, needs: [], distractor: d.rule, why: d.why }));
  return blocksItem({
    skill, level, mode: 'define',
    prompt: placed.length
      ? (order.length === 1 ? t('Écris la définition de la transformée de Fourier, avec ses hypothèses : le début est placé, touche le bloc qui manque.') : t('Écris la définition de la transformée de Fourier, avec ses hypothèses : le début est placé, touche les blocs qui manquent.'))
      : t('Écris la définition de la transformée de Fourier, avec ses hypothèses : touche les blocs dans l\'ordre.'),
    blocks: rng.shuffle([...blocks, ...used]), goal: order[order.length - 1], order, placed,
    hints: H(t('Deux hypothèses sur f (morceaux, intégrabilité), puis la formule avec la convention du cours.'), 'f̂(α) = (1/√(2π)) ∫ f(y) e<sup>−iαy</sup> dy', DEF_BLOCKS.join(' ')),
    noHints: noHints || level >= 5 || !!exam, exam,
    subgoals: subgoals.length ? subgoals : [{ id: 'definition', label: t('définition de f̂'), skill: 'f-ft-direct' }],
    solution: DEF_BLOCKS.map((html) => ({ html, note: '' })),
    key: `def:${level}:${nDecoys}`, expectedSec: 40 + 20 * order.length,
  });
}
