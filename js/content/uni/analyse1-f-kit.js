// Helpers shared by the generators of module A1, part f (unit `analyse1`,
// step U4): the line helpers of part e (blanks, menus, parts), true/false
// statements as a multiple choice, options without duplicates.

import { mcq } from './kit.js';

export {
  q, N, nz, modeOf, H, E, tpl, blanked, partsScript, SEG, stepMenus, withMenus, fr,
} from './analyse1-e-kit.js';
import { t } from '../../i18n.js';

export const uniq = (opts) => opts.filter((o, i, a) => a.findIndex((x) => x.html === o.html) === i);

// A true/false statement as a multiple choice « Vrai / Faux » (statements
// refuted by a set, or by a property no checker reads).
export function vfMcq(skill, statement, truth, rng, { key, why, ruleIfTrue = null, ruleIfFalse = null }) {
  return mcq({
    skill, level: 4, prompt: t('Vrai ou faux ?<br>« {statement} »', { statement }), keepOrder: true,
    options: [{ html: t('Vrai'), correct: truth, rule: truth ? null : ruleIfTrue }, { html: t('Faux'), correct: !truth, rule: truth ? ruleIfFalse : null }],
    key: `${skill}:tf:${key}`, solution: [{ html: why, note: '' }], expectedSec: 60, exam: { format: 'tf', points: 1 },
  }, rng);
}

// A multiple choice at level 5 (no hints) or as the `mcq` exam variant.
export const asLevel5 = (it, opts) => (opts.exam ? it : { ...it, exam: false, level: 5, noHints: true, hints: [] });

// The decimal comma and the minus sign in text: −3, 2,5.
export const frT = (s) => String(s).replace(/-/g, '−').replace(/(\d)\.(\d)/g, '$1,$2');
