// Helpers of module A1, part i (unit `analyse1`, step U4): series. The
// judges of a series item, the verdict of convention 5 (catalogue A1:
// « Nature ? », then « Quel critère ? », both decisions here, at the head
// of the conclusion part), a true/false as a multiple choice, and the
// helpers of part e (lines with blanks, menus, parts) re-exported.

import { mcq } from './kit.js';
import { parse } from '../../cas/parse.js';
import { limitOf, sameAsLimit } from '../../judges/limit.js';

export {
  q, N, nz, modeOf, H, E, tpl, blanked, partsScript, withMenus, stepMenus, fr, sup, SEG,
} from './analyse1-e-kit.js';

// Sequences: n whole, n → +∞ (convention 1).
export const LIM = { kind: 'limit', v: 'n', to: '+∞', discrete: true };
export const KEYS_S = ['calcx', 'calcfn', 'anal', 'seq'];

// The judge finds this limit for the line (n → +∞): differences of roots
// can lose too many digits for its numeric check.
export function limitIs(text, value) {
  const cfg = { ...LIM, vars: ['n'] };
  const a = parse(text, { vars: ['n'] });
  return limitOf(cfg, a).value !== null && sameAsLimit(cfg, a, parse(value));
}

// Riemann exponents as text and as numbers.
export const P_NUM = { '1/2': 0.5, 1: 1, '3/2': 1.5, 2: 2, 3: 3 };
// n^p written: n, n^2, √n, n^(3/2).
export const nPow = (p) => ({ 1: 'n', 2: 'n^2', 3: 'n^3', '1/2': '√n', '3/2': 'n^(3/2)' }[p]);
// 1/nᵖ in plain text for the prompts: 1/n², 1/√n, 1/n^(3/2).
export const bHtml = (p) => ({ 1: '1/n', 2: '1/n²', 3: '1/n³', '1/2': '1/√n', '3/2': '1/n^(3/2)' }[p]);

const NATURE_LABEL = { abs: 'converge absolument', semi: 'converge, pas absolument', div: 'diverge' };

// right: 'abs' | 'semi' | 'div'; rules and whys of the wrong options.
export function natureDecision(right, { rules = {}, whys = {}, prompt = 'Nature de la série ?' } = {}) {
  const opt = (id) => ({
    id, label: NATURE_LABEL[id], valid: id === right,
    ...(id !== right && rules[id] ? { rule: rules[id] } : {}),
    why: whys[id] || (id === 'semi' ? 'Termes positifs (ou ρ < 1) : la convergence est absolue.' : 'Relis la limite et le critère.'),
  });
  return { kind: 'decision', prompt, options: ['abs', 'semi', 'div'].map(opt) };
}

export const CRITERIA = {
  term: 'Condition nécessaire : le terme général ne tend pas vers 0',
  cmp: 'Comparaison : aₙ/bₙ → L ∈ ]0 ; +∞[ avec bₙ = 1/nᵖ',
  ratio: 'Critère de d\'Alembert : |aₙ₊₁/aₙ| → ρ',
  root: 'Critère de Cauchy : ⁿ√|aₙ| → ρ',
  leibniz: 'Comparaison pour Σ |aₙ|, puis le critère de Leibniz',
  geo: 'Série géométrique : converge si et seulement si |q| < 1',
};
const CRIT_WHY = {
  term: 'Le terme général tend vers 0 ici : la condition nécessaire ne conclut pas.',
  cmp: 'Ce n\'est pas une comparaison qui a conclu ici.',
  ratio: 'On n\'a pas calculé de rapport aₙ₊₁/aₙ.',
  root: 'On n\'a pas pris de racine n-ième.',
  leibniz: 'La série n\'est pas étudiée par Leibniz ici.',
  geo: 'Ce n\'est pas une série géométrique.',
};
// « Quel critère ? »: the right one and three others, in a fixed order.
export function criterionDecision(correct, others) {
  const ids = [correct, ...others.filter((x) => x !== correct)].slice(0, 4);
  const order = Object.keys(CRITERIA).filter((k) => ids.includes(k));
  return {
    kind: 'decision', prompt: 'Quel critère conclut ?',
    options: order.map((id) => ({ id, label: CRITERIA[id], valid: id === correct, why: CRIT_WHY[id] })),
  };
}

// A true/false statement whose counter-example no checker takes, as a
// multiple choice (spec §6).
export function vfMcq(skill, statement, truth, rng, { key, why, level = 4, exam = true, ruleIfTrue = null }) {
  return mcq({
    skill, level, prompt: `Vrai ou faux ?<br>« ${statement} »`, keepOrder: true,
    options: [{ html: 'Vrai', correct: truth, rule: truth ? null : ruleIfTrue }, { html: 'Faux', correct: !truth }],
    key: `${skill}:tf:${key}`, solution: [{ html: why, note: '' }], expectedSec: 60, exam: exam ? { format: 'tf', points: 1 } : false,
  }, rng);
}

// Options with the same text are kept once (the first).
export const uniq = (opts) => opts.filter((o, i, a) => a.findIndex((x) => x.html === o.html) === i);

// A sequence counter-example (js/judges/counters.js).
export function seqCounter(hyp, concl, answer, more = {}) {
  const seqs = more.seqs || ['a'];
  const LABEL = { a: 'aₙ =', b: 'bₙ =' };
  return { kind: 'sequence', v: 'n', from: 1, seqs, hyp, concl, ask: seqs.map((v) => ({ v, label: LABEL[v] || `${v}ₙ =`, keys: ['calc', 'seq'] })), answer, ...more };
}
