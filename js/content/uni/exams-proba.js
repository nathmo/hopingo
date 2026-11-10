// Exam blueprints of module P (spec §10.1, step U7): both courses are in
// the path. Each section draws its skills from the units `proba` and
// `combi`, among the skills that offer the section's variant (`exam` of
// the skill) and carry the course's tag (informative elsewhere, it chooses
// the pool here); weights are the skills' examWeight.
//
// ba3-proba (MATH-234, GM, BA3): short calculations marked on the final
// value (variant coef, « notebook » questions), multiple choice, then two
// problems of 8 to 15 points marked step by step; formulary and tables
// (Φ, Φ⁻¹, Student, χ²) allowed.
// ba4-stat (EE-209, MT, BA4): multiple choice +3/0/−1 and true/false
// +1/0/−1, without a calculator; the statements give the quantiles.
// Counts and durations are estimates (« à vérifier » in `source`).

import { SKILLS as PROBA } from './proba.skills.js';
import { SKILLS as COMBI } from './combi.skills.js';

const ALL = [...PROBA, ...COMBI];
// G7 (combinatorics) feeds the MATH-234 exam only.
const offering = (variant, tag) => ALL
  .filter((s) => (s.exam || []).includes(variant) && (s.examWeight ?? 1) > 0)
  .filter((s) => (tag === 'MATH-234' && s.unit === 'combi') || (s.tags || []).includes(tag))
  .map((s) => s.id);

export const EXAM_PROBA = {
  id: 'ba3-proba',
  title: 'Probabilités et statistique (BA3, MATH-234)',
  year: 15,
  durationMin: 180,
  documents: 'tables',
  sections: [
    { kind: 'coef', count: 6, scoring: { right: 5, wrong: 0, blank: 0 }, pool: { units: ['proba', 'combi'], extraSkills: [], skills: offering('coef', 'MATH-234') } },
    { kind: 'mcq', count: 4, scoring: { right: 5, wrong: 0, blank: 0 }, pool: { units: ['proba', 'combi'], extraSkills: [], skills: offering('mcq', 'MATH-234') } },
    // Marked step by step: the points of the problem's steps (§10.2).
    { kind: 'open', count: 2, scoring: { byStep: true }, pool: { units: ['proba'], extraSkills: [], points: [8, 15], skills: offering('open', 'MATH-234') } },
  ],
  passMark: 0.5,
  source: 'MATH-234 (M. Wilhelm), exercices d\'examen 2020–2022 et corrigé 2018 : questions courtes de calcul notées sur la valeur finale et QCM à 5 points, puis questions à développer de 10 à 15 points ; formulaire et tables permis. Nombre de questions et durée à vérifier.',
};

export const EXAM_STAT = {
  id: 'ba4-stat',
  title: 'Statistiques pour les data sciences (BA4, EE-209)',
  year: 16,
  durationMin: 180,
  documents: 'formulaire',
  sections: [
    { kind: 'mcq', count: 20, scoring: { right: 3, wrong: -1, blank: 0 }, pool: { units: ['proba'], extraSkills: [], skills: offering('mcq', 'EE-209') } },
    { kind: 'tf', count: 10, scoring: { right: 1, wrong: -1, blank: 0 }, pool: { units: ['proba'], extraSkills: [], skills: offering('tf', 'EE-209') } },
  ],
  passMark: 0.5,
  source: 'EE-209 (G. Obozinski), examen final 2023 : QCM +3/0/−1 et vrai/faux +1/0/−1, sans calculatrice, quantiles fournis par l\'énoncé. Nombre de questions et durée à vérifier.',
};
