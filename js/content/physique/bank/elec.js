// Electricity problems (format: js/content/physique/problems.js).

const g = { value: 10, units: ['N/kg'] };

export default [
  {
    id: 'batterie', domain: 'elec', title: 'La batterie du vélo',
    formulas: ['P = U I', 'E = P t'],
    decoys: ['E = m g h', 'P = F v', 'E = m c ΔT'],
    bridges: ['P'],
    quantities: {
      U: { min: 12, max: 48, step: 12, units: ['V'] },
      I: { min: 1, max: 10, step: 0.5, units: ['A'] },
      E: { min: 2e5, max: 3e6, step: 1e5, units: ['J', 'Wh', 'kWh'] },
      t: { min: 600, max: 36000, step: 1, units: ['s', 'min', 'h'] },
    },
    cases: [
      {
        find: 't', given: ['U', 'I', 'E'], answerUnit: 'h',
        text: 'Une batterie de vélo électrique de {U} stocke {E}. Le moteur consomme un courant de {I}. Pendant combien d\'heures peut-on rouler ?',
        lines: ['E = U I t', 't = E/(U I)'],
      },
      {
        find: 'E', given: ['U', 'I', 't'],
        text: 'Un ventilateur de chambre froide ({U}, {I}) tourne pendant {t}. Quelle énergie consomme-t-il ?',
        lines: ['E = U I t'],
      },
    ],
  },
  {
    id: 'bouilloire-elec', domain: 'elec', title: 'La bouilloire branchée',
    formulas: ['P = U I', 'E = P t', 'E = m c ΔT'],
    decoys: ['E = m g h', 'P = F v'],
    bridges: ['P', 'E'],
    quantities: {
      U: { value: 230, units: ['V'] },
      I: { min: 4, max: 13, step: 0.5, units: ['A'] },
      m: { min: 0.5, max: 2, step: 0.1, units: ['kg'] },
      c: { value: 4200, units: ['J/(kg·K)'] },
      ΔT: { min: 20, max: 85, step: 5, units: ['K'] },
      t: { min: 20, max: 3600, step: 1, units: ['s', 'min'] },
    },
    cases: [
      {
        find: 't', given: ['U', 'I', 'm', 'c', 'ΔT'],
        text: 'Une bouilloire branchée sur {U} est traversée par un courant de {I}. Elle contient {m} d\'eau (c = {c}) à réchauffer de {ΔT}. Combien de temps faut-il, sans pertes ?',
        lines: ['U I t = m c ΔT', 't = (m c ΔT)/(U I)'],
      },
    ],
  },
  {
    id: 'monte-charge', domain: 'elec', title: 'Le monte-charge électrique',
    formulas: ['E = m g h', 'E = U I t'],
    decoys: ['E = 1/2 m v^2', 'P = F v', 'E = m c ΔT'],
    bridges: ['E'],
    quantities: {
      m: { min: 50, max: 800, step: 10, units: ['kg', 't'] },
      g,
      h: { min: 2, max: 20, step: 0.5, units: ['m'] },
      U: { min: 24, max: 400, step: 1, units: ['V'] },
      I: { min: 2, max: 30, step: 0.5, units: ['A'] },
      t: { min: 2, max: 600, step: 1, units: ['s', 'min'] },
    },
    cases: [
      {
        find: 't', given: ['m', 'g', 'h', 'U', 'I'], quantities: { U: { value: 230, units: ['V'] } },
        text: 'Un monte-charge électrique, branché sur {U}, consomme {I}. Il monte {m} de {h}. Combien de temps lui faut-il, sans pertes ?',
        lines: ['U I t = m g h', 't = (m g h)/(U I)'],
      },
      {
        find: 'I', given: ['m', 'g', 'h', 'U', 't'], minLevel: 3, quantities: { U: { value: 230, units: ['V'] } },
        text: 'Un treuil électrique branché sur {U} doit monter {m} de {h} en {t}. Quel courant consomme-t-il, sans pertes ?',
        lines: ['U I t = m g h', 'I = (m g h)/(U t)'],
      },
    ],
  },
];
