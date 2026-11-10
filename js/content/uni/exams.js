// Exam blueprints (spec §10.1). Each blueprint draws its questions from the
// exam variants of the skills of its pool (skill.exam lists the variants a
// generator can make; skill.examWeight weighs the draw, 0 = never drawn).
//
// {id, title, year, durationMin, documents: 'none' | 'formulaire' | 'tables',
//  sections: [{kind: 'mcq' | 'tf' | 'coef' | 'open', count, multi?,
//              scoring: {right, wrong, blank} | {perRight: '1/N', perWrong: '-1/M', floor}
//                       | {byStep: true} (open: the problem's own points),
//              pool: {units: [unitId], extraSkills: [skillId], skills?: [skillId],
//                     points?: [min, max]}}],
//  passMark (share of the points for the grade 4, estimate), source}
// Later steps (U6–U10) add their blueprints to this list.

import { EXAM_ANALYSE1 } from './exams-analyse1.js';

export const EXAMS = [
  {
    id: 'ba1-alglin', title: 'Algèbre linéaire (BA1)', year: 13, durationMin: 144,
    documents: 'none',
    sections: [
      { kind: 'mcq', count: 16, scoring: { right: 3, wrong: -1, blank: 0 }, pool: { units: ['alglin'], extraSkills: [] } },
      { kind: 'tf', count: 16, scoring: { right: 1, wrong: -1, blank: 0 }, pool: { units: ['alglin'] } },
    ],
    passMark: 0.5,
    source: 'Format des examens 2018–2021 (partie commune GM et MT) : 144 minutes, 16 QCM (+3 / 0 / −1) et 16 vrai/faux (+1 / 0 / −1), sans document.',
  },
  // Step U5: the CMS test, long problems drawn from several G units (§16.3).
  {
    id: 'cms-controle', title: 'Contrôle du CMS', year: 12.5, durationMin: 105,
    documents: 'none',
    sections: [
      { kind: 'open', count: 4, scoring: { right: 5, wrong: 0, blank: 0 }, pool: { units: ['geoan', 'coniques', 'analyse0', 'fonctions-g', 'explog', 'trigo', 'polynomes', 'recurrence', 'complexes'] } },
    ],
    passMark: 0.6,
    source: 'CMS, contrôles 2018 : 105 minutes, 3 ou 4 problèmes pour 20 points (à vérifier : ici 4 problèmes de 5 points, notés par étape).',
  },
  // Step U4: Analyse I, multiple choice, true/false and open problems
  // marked with their own points.
  EXAM_ANALYSE1,
];

// Step U6: Analyse II (BA2), only multiple choice and true/false since 2019.
EXAMS.push({
  id: 'ba2-analyse2', title: 'Analyse II (BA2)', year: 14, durationMin: 144,
  documents: 'none',
  sections: [
    { kind: 'mcq', count: 18, scoring: { right: 3, wrong: -1, blank: 0 }, pool: { units: ['analyse2'], extraSkills: [] } },
    { kind: 'tf', count: 10, scoring: { right: 1, wrong: -1, blank: 0 }, pool: { units: ['analyse2'] } },
  ],
  passMark: 0.5,
  source: 'Format des examens 2019–2021 (MATH-106) : 144 minutes, 18 QCM (+3 / 0 / −1) et 10 vrai/faux (+1 / 0 / −1), sans partie ouverte ni document.',
});

export const EXAM_BY_ID = Object.fromEntries(EXAMS.map((e) => [e.id, e]));

// Step U7: probability and statistics, both courses (MATH-234 and EE-209).
import { EXAM_PROBA, EXAM_STAT } from './exams-proba.js';

EXAMS.push(EXAM_PROBA, EXAM_STAT);
Object.assign(EXAM_BY_ID, { [EXAM_PROBA.id]: EXAM_PROBA, [EXAM_STAT.id]: EXAM_STAT });

// Step U9: analyse numérique (BA4), with skills of module M (extraSkills).
import { EXAM_NUMERIQUE } from './exams-numerique.js';

EXAMS.push(EXAM_NUMERIQUE);
EXAM_BY_ID[EXAM_NUMERIQUE.id] = EXAM_NUMERIQUE;

// Step U10: Analyse III (V and C) and Analyse IV (F, and C in the multiple choice).
import { EXAM_ANALYSE3, EXAM_ANALYSE4 } from './exams-vcf.js';

EXAMS.push(EXAM_ANALYSE3, EXAM_ANALYSE4);
Object.assign(EXAM_BY_ID, { [EXAM_ANALYSE3.id]: EXAM_ANALYSE3, [EXAM_ANALYSE4.id]: EXAM_ANALYSE4 });
