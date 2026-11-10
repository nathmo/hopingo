// Exam blueprint of Analyse I (BA1), spec §10.1, step U4. The exam engine
// comes with step U3 (js/engine/exam.js); js/content/uni/exams.js lists
// this plan in EXAMS.
//
// Format (spec §10.1 table, plan « Examens »): GM exams of January 2018 to
// 2022 and MT 2014 — multiple choice (+3 / 0 / −1), true/false (+1 / 0 / −1),
// then 2 or 3 open problems of 2 to 7 points, marked step by step with the
// `points` of each `problem` item. Counts and duration are estimates.
//
// Each section draws its skills from `pool`: the skills of the units that
// offer the section's variant (`exam` of the skill, js/content/uni/
// analyse1*.skills.js), weighted by `examWeight`. `pool.skills` lists them,
// computed here from the skills so that it follows the catalogue. For the
// open section, `pool.points` bounds the points of a problem: the long
// problems of 9 to 13 points (E1 recursive sequence, E2 rational improper
// integral, E3 polar curve, E6 series with a parameter) belong to the MT
// exam and to training, not to this GM format.

import { SKILLS } from './analyse1.skills.js';

const offering = (variant) => SKILLS.filter((s) => (s.exam || []).includes(variant) && (s.examWeight ?? 1) > 0).map((s) => s.id);

// Problems of more than 7 points (catalogue « Exemples de type examen »).
const LONG = ['a1-seq-rec-study', 'a1-improper-rational', 'a1-polar-curve', 'a1-ser-param'];

export const EXAM_ANALYSE1 = {
  id: 'ba1-analyse1',
  title: 'Analyse I (BA1)',
  year: 13,
  durationMin: 180,
  documents: 'none',
  sections: [
    {
      kind: 'mcq', count: 12,
      scoring: { right: 3, wrong: -1, blank: 0 },
      pool: { units: ['analyse1'], extraSkills: [], skills: offering('mcq') },
    },
    {
      kind: 'tf', count: 12,
      scoring: { right: 1, wrong: -1, blank: 0 },
      pool: { units: ['analyse1'], extraSkills: [], skills: offering('tf') },
    },
    {
      kind: 'open', count: 3,
      // Marked step by step: the points of the problem's steps (§10.2).
      scoring: { byStep: true },
      pool: { units: ['analyse1'], extraSkills: [], points: [2, 7], skills: offering('open').filter((id) => !LONG.includes(id)) },
    },
  ],
  passMark: 0.5,
  source: 'Format des examens GM de janvier 2018 à 2022 (S. Friedli) et MT 2014 (Ph. Chabloz) : QCM +3/0/−1, V/F +1/0/−1, 2 ou 3 questions ouvertes de 2 à 7 points. Nombre de questions et durée à vérifier.',
};

// The MT format of 2014: four long problems (E1, E2, E3, E6), for a
// separate blueprint if wanted (`ba1-analyse1-mt`, not in the spec's table).
export const LONG_PROBLEMS_ANALYSE1 = LONG;
