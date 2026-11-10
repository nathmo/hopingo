// Exam blueprint of module N (step U9, spec §10.1): Analyse numérique,
// BA4, the MT format of 2019–2022. On paper, no document, no calculator:
// multiple choice with one or several right answers (+1/N per right box
// ticked, −1/M per wrong box, at least 0 per question), true/false
// (+1/0/−1), with programs and printed tables, then 2 open proofs of 3.5
// to 10 points. The pool also draws the skills of module M that the N
// exams ask (Cholesky, the power method, Rayleigh, norms, condition
// number, SVD): extraSkills.

export const EXAM_NUMERIQUE = {
  id: 'ba4-numerique', title: 'Analyse numérique (BA4)', year: 16, durationMin: 180,
  documents: 'none',
  sections: [
    {
      kind: 'mcq', count: 18, multi: true,
      scoring: { perRight: '1/N', perWrong: '-1/M', floor: 0, blank: 0 },
      pool: { units: ['numerique'], extraSkills: ['m-cholesky', 'm-power-method', 'm-rayleigh', 'm-norms', 'm-cond', 'm-svd-lowrank'] },
    },
    {
      kind: 'tf', count: 8, scoring: { right: 1, wrong: -1, blank: 0 },
      pool: { units: ['numerique'], extraSkills: ['m-cholesky', 'm-power-method', 'm-rayleigh', 'm-norms', 'm-cond', 'm-svd-lowrank'] },
    },
    { kind: 'open', count: 2, scoring: { byStep: true }, pool: { units: ['numerique'], points: [3.5, 10] } },
  ],
  passMark: 0.5,
  source: 'Examens MT du 26 juin 2019, du 11 août 2020, du 3 juillet 2021 et du 25 juin 2022 : de 14 à 33 QCM à une ou plusieurs réponses (+1/N, −1/M) et vrai/faux (+1/0/−1), puis 2 questions de preuve de 3,5 à 10 points. Durée et nombres de questions à vérifier : ici 18 QCM, 8 vrai/faux et 2 problèmes, 180 minutes.',
};
