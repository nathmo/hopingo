// Exam blueprints of modules V, C and F (spec §10.1, step U10).
//
// ba3-analyse3 (Analyse III, BA3, MT): vector analysis and complex
// analysis; multiple choice with one answer (+2, 0 for a wrong or blank
// answer, no negative points), then open problems of 3 to 14 points marked
// step by step; no document, no calculator.
// ba4-analyse4 (Analyse IV, BA4, MT/SV): Fourier, Laplace, PDE and
// distributions, plus the complex analysis of the 2021 exam (Cauchy,
// Laurent, residues); multiple choice with several answers (+1/N per right
// box ticked, −1/M per wrong box, floor 0 per question), then 3 open
// problems; the tables of transforms are allowed.
// Counts and durations are estimates (« à vérifier » in `source`).

export const EXAM_ANALYSE3 = {
  id: 'ba3-analyse3',
  title: 'Analyse III (BA3)',
  year: 15,
  durationMin: 120,
  documents: 'none',
  sections: [
    { kind: 'mcq', count: 10, scoring: { right: 2, wrong: 0, blank: 0 }, pool: { units: ['vecto', 'cplx'], extraSkills: [] } },
    // Marked step by step: the points of the problem's steps (§10.2).
    { kind: 'open', count: 3, scoring: { byStep: true }, pool: { units: ['vecto', 'cplx'], extraSkills: [], points: [3, 14] } },
  ],
  passMark: 0.5,
  source: 'Analyse III MT/SV, examens du 18.01.2022 et de janvier 2021, examen blanc de décembre 2021 : 120 minutes, QCM à une réponse (+2 / 0, pas de point négatif), puis questions ouvertes de 3 à 14 points ; sans document ni calculatrice. Nombre de questions à vérifier.',
};

export const EXAM_ANALYSE4 = {
  id: 'ba4-analyse4',
  title: 'Analyse IV (BA4)',
  year: 16,
  durationMin: 135,
  documents: 'tables',
  sections: [
    { kind: 'mcq', count: 10, multi: true, scoring: { perRight: '1/N', perWrong: '-1/M', floor: 0 }, pool: { units: ['fourier', 'cplx'], extraSkills: [] } },
    { kind: 'open', count: 3, scoring: { byStep: true }, pool: { units: ['fourier'], extraSkills: [], points: [3, 12] } },
  ],
  passMark: 0.5,
  source: 'Analyse IV MT/SV, examens 2016, 2017, 2019 et 2021 : 135 minutes, QCM à plusieurs réponses (+1/N par bonne case cochée, −1/M par mauvaise case, plancher 0), puis 3 questions ouvertes ; tables de transformées de Fourier et de Laplace permises. Nombre de QCM et barème des questions ouvertes à vérifier.',
};
