// Heat problems (format: js/content/physique/problems.js).
// « Cuire en tombant » (devoir 1), the kettle, melting ice.

const c = { value: 3500, units: ['J/(kg·K)'] };
const cWater = { value: 4200, units: ['J/(kg·K)'] };
const POTATO = 'Le résultat ne dépend pas de la taille de la pomme de terre : c\'est pour ça que sa masse n\'est pas donnée.';

export default [
  {
    id: 'patate', domain: 'thermo', title: 'Cuire en tombant',
    formulas: ['E = m g h', 'E = m c ΔT'],
    decoys: ['E = 1/2 m v^2', 'P = E/t', 'P = U I'],
    bridges: ['E'],
    quantities: {
      g: { value: 10, units: ['N/kg'] },
      c,
      ΔT: { min: 10, max: 90, step: 5, units: ['K'] },
      h: { min: 100, max: 1e7, step: 1, units: ['m', 'km'] },
    },
    cancels: { m: POTATO },
    cases: [
      {
        find: 'h', given: ['g', 'c', 'ΔT'], quantities: { g: { value: 1.6, units: ['N/kg'] } },
        text: 'Sur la Lune (g = {g}), on lâche sans vitesse une pomme de terre (c = {c}). Toute son énergie à l\'impact devient de la chaleur en elle. De quelle hauteur faut-il la lâcher pour qu\'elle se réchauffe de {ΔT} ?',
        lines: ['m g h = m c ΔT', 'g h = c ΔT', 'h = (c ΔT)/g'],
      },
      {
        find: 'h', given: ['g', 'c', 'ΔT'], quantities: { g: { value: 3.7, units: ['N/kg'] } },
        text: 'Sur Mars (g = {g}), on lâche sans vitesse une pomme de terre (c = {c}). Toute son énergie à l\'impact devient de la chaleur en elle. De quelle hauteur faut-il la lâcher pour qu\'elle se réchauffe de {ΔT} ?',
        lines: ['m g h = m c ΔT', 'g h = c ΔT', 'h = (c ΔT)/g'],
      },
      {
        find: 'ΔT', given: ['g', 'h', 'c'],
        quantities: { h: { min: 400, max: 2000, step: 100, units: ['m', 'km'] }, ΔT: { min: 0.05, max: 20, step: 0.01, units: ['K'] } },
        text: 'Tu lâches une pomme de terre (c = {c}) du haut d\'une falaise : elle tombe de {h}. Toute son énergie à l\'impact devient de la chaleur en elle, et on néglige l\'air. De combien se réchauffe-t-elle ?',
        lines: ['m g h = m c ΔT', 'g h = c ΔT', 'ΔT = (g h)/c'],
      },
    ],
  },
  {
    id: 'bouilloire', domain: 'thermo', title: 'La bouilloire',
    formulas: ['E = m c ΔT', 'P = E/t'],
    decoys: ['E = m g h', 'P = F v', 'E = m L_f'],
    bridges: ['E'],
    quantities: {
      m: { min: 0.3, max: 2, step: 0.1, units: ['kg', 'g'] },
      c: cWater,
      ΔT: { min: 20, max: 85, step: 5, units: ['K'] },
      P: { min: 800, max: 3000, step: 100, units: ['W', 'kW'] },
      t: { min: 20, max: 1800, step: 1, units: ['s', 'min'] },
    },
    cases: [
      {
        find: 't', given: ['m', 'c', 'ΔT', 'P'],
        text: 'Une bouilloire de {P} contient {m} d\'eau (c = {c}) à réchauffer de {ΔT}. Combien de temps faut-il, sans pertes ?',
        lines: ['P t = m c ΔT', 't = (m c ΔT)/P'],
      },
      {
        find: 'P', given: ['m', 'c', 'ΔT', 't'],
        text: 'Une bouilloire réchauffe {m} d\'eau (c = {c}) de {ΔT} en {t}, sans pertes. Quelle est sa puissance ?',
        lines: ['P = E/t', 'P = (m c ΔT)/t'],
      },
      {
        find: 'ΔT', given: ['m', 'c', 'P', 't'], minLevel: 3,
        text: 'Un chauffe-eau de {P} chauffe {m} d\'eau (c = {c}) pendant {t}, sans pertes. De combien la température de l\'eau monte-t-elle ?',
        lines: ['m c ΔT = P t', 'ΔT = (P t)/(m c)'],
      },
    ],
  },
  {
    id: 'glacons', domain: 'thermo', title: 'Faire fondre la glace',
    formulas: ['E = m L_f', 'P = E/t'],
    decoys: ['E = m c ΔT', 'E = m g h', 'P = U I'],
    bridges: ['E'],
    quantities: {
      m: { min: 0.05, max: 2, step: 0.05, units: ['kg', 'g'] },
      L_f: { value: 330000, units: ['J/kg', 'kJ/kg'] },
      P: { min: 200, max: 2000, step: 50, units: ['W'] },
      t: { min: 10, max: 7200, step: 1, units: ['s', 'min'] },
    },
    cases: [
      {
        find: 't', given: ['m', 'L_f', 'P'],
        text: 'Un réchaud de {P} fait fondre {m} de glace à 0 °C (L<sub>f</sub> = {L_f}). Combien de temps faut-il, sans pertes ?',
        lines: ['P t = m L_f', 't = (m L_f)/P'],
      },
      {
        find: 'm', given: ['L_f', 'P', 't'], minLevel: 3,
        text: 'Un réchaud de {P} chauffe de la glace à 0 °C (L<sub>f</sub> = {L_f}) pendant {t}, sans pertes. Quelle masse de glace fond ?',
        lines: ['m L_f = P t', 'm = (P t)/L_f'],
      },
    ],
  },
  {
    id: 'freins', domain: 'thermo', title: 'Des freins qui chauffent',
    formulas: ['E = m g h', 'E = m_f c ΔT'],
    decoys: ['P = E/t', 'E = 1/2 m v^2', 'ρ = m/V'],
    bridges: ['E'],
    extraSymbols: ['m_f'],
    quantities: {
      m: { min: 70, max: 120, step: 5, units: ['kg'] },
      g: { value: 10, units: ['N/kg'] },
      h: { min: 100, max: 1200, step: 50, units: ['m'] },
      m_f: { min: 0.2, max: 1, step: 0.1, units: ['kg', 'g'] },
      c: { value: 450, units: ['J/(kg·K)'] },
      ΔT: { min: 5, max: 3000, step: 1, units: ['K'] },
    },
    cases: [
      {
        find: 'ΔT', given: ['m', 'g', 'h', 'm_f', 'c'],
        text: 'Un cycliste ({m} avec son vélo) descend un col de {h} de dénivelé à vitesse constante. Toute l\'énergie part en chaleur dans ses freins en acier : {m_f} en tout (c = {c}). De combien les freins se réchaufferaient-ils, sans refroidir ?',
        lines: ['m g h = m_f c ΔT', 'ΔT = (m g h)/(m_f c)'],
      },
    ],
  },
];
