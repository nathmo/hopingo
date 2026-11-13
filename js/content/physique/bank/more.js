// More situations on the same formulas (format: js/content/physique/problems.js):
// a spring, the croissant climb (efficiency), a water heater, a phone battery.

const g = { value: 10, units: ['N/kg'] };

export default [
  {
    id: 'catapulte', domain: 'meca', title: 'La catapulte à ressort',
    formulas: ['E = 1/2 k x^2', 'E = 1/2 m v^2'],
    decoys: ['E = m g h', 'P = E/t', 'E = F d'],
    bridges: ['E'],
    quantities: {
      k: { min: 100, max: 2000, step: 50, units: ['N/m'] },
      x: { min: 0.02, max: 0.3, step: 0.01, units: ['m', 'cm'] },
      m: { min: 0.01, max: 0.5, step: 0.01, units: ['kg', 'g'] },
      v: { min: 1, max: 60, step: 0.5, units: ['m/s', 'km/h'] },
    },
    cases: [
      {
        find: 'v', given: ['k', 'x', 'm'],
        text: 'Une catapulte à ressort (raideur {k}) est comprimée de {x}. Elle lance une balle de {m}. Toute l\'énergie du ressort devient de l\'énergie cinétique. À quelle vitesse part la balle ?',
        lines: ['1/2 k x^2 = 1/2 m v^2', 'k x^2 = m v^2', 'v^2 = (k x^2)/m', 'v = √((k x^2)/m)'],
      },
      {
        find: 'x', given: ['k', 'm', 'v'], minLevel: 3,
        text: 'On veut lancer une balle de {m} à {v} avec un ressort de raideur {k}. De combien faut-il le comprimer, si toute son énergie devient de l\'énergie cinétique ?',
        lines: ['1/2 k x^2 = 1/2 m v^2', 'x^2 = (m v^2)/k', 'x = √((m v^2)/k)'],
      },
    ],
  },
  {
    id: 'croissants', domain: 'meca', title: 'Le col des croissants',
    formulas: ['E_u = m g h', 'E_u = η E_f'],
    decoys: ['E = 1/2 m v^2', 'P = E/t', 'E = m c ΔT'],
    bridges: ['E_u'],
    quantities: {
      m: { min: 50, max: 100, step: 1, units: ['kg'] },
      g,
      h: { min: 300, max: 1800, step: 50, units: ['m', 'km'] },
      η: { min: 0.2, max: 0.3, step: 0.01, units: ['1'] },
      E_f: { min: 1e5, max: 2e7, step: 1, units: ['J', 'kJ', 'kcal'] },
    },
    cases: [
      {
        find: 'E_f', given: ['m', 'g', 'h', 'η'], answerUnit: 'kcal',
        text: '{nom} monte un col à vélo : {m} avec le vélo, {h} de dénivelé. Ses muscles transforment l\'énergie de la nourriture en énergie mécanique avec un rendement de {η}. Combien de kilocalories de nourriture lui faut-il, au moins ? (Un croissant : environ 400 kcal.)',
        lines: ['m g h = η E_f', 'E_f = (m g h)/η'],
      },
      {
        find: 'h', given: ['m', 'g', 'η', 'E_f'], minLevel: 3,
        text: '{nom} ({m} avec son vélo) mange un croissant de {E_f}. Ses muscles en tirent de l\'énergie mécanique avec un rendement de {η}. De quel dénivelé ce croissant lui permet-il de monter ?',
        quantities: { E_f: { min: 1.3e6, max: 2.1e6, step: 4180, units: ['kcal'] }, h: { min: 50, max: 1500, step: 1, units: ['m'] } },
        lines: ['m g h = η E_f', 'h = (η E_f)/(m g)'],
      },
    ],
  },
  {
    id: 'chauffe-eau', domain: 'thermo', title: 'Le chauffe-eau',
    formulas: ['m = ρ V', 'E = m c ΔT', 'P = E/t'],
    decoys: ['E = m g h', 'P = U I', 'E = m L_f'],
    bridges: ['m', 'E'],
    quantities: {
      ρ: { value: 1000, units: ['kg/m^3'] },
      V: { min: 0.05, max: 0.3, step: 0.01, units: ['m^3', 'L'] },
      c: { value: 4200, units: ['J/(kg·K)'] },
      ΔT: { min: 20, max: 50, step: 1, units: ['K'] },
      P: { min: 1000, max: 6000, step: 100, units: ['W', 'kW'] },
      t: { min: 60, max: 1e5, step: 1, units: ['s', 'min', 'h'] },
    },
    cases: [
      {
        find: 't', given: ['ρ', 'V', 'c', 'ΔT', 'P'], answerUnit: 'min',
        text: 'Un chauffe-eau de {P} contient {V} d\'eau (c = {c}) à réchauffer de {ΔT}. Combien de minutes faut-il, sans pertes ?',
        lines: ['P t = ρ V c ΔT', 't = (ρ V c ΔT)/P'],
      },
      {
        find: 'V', given: ['ρ', 'c', 'ΔT', 'P', 't'], minLevel: 3,
        quantities: { t: { min: 600, max: 7200, step: 60, units: ['s', 'min', 'h'] }, V: { min: 0.01, max: 1, step: 0.001, units: ['m^3', 'L'] } },
        text: 'Un chauffe-eau de {P} fonctionne pendant {t}, sans pertes. Quel volume d\'eau (c = {c}) peut-il réchauffer de {ΔT} ?',
        lines: ['ρ V c ΔT = P t', 'V = (P t)/(ρ c ΔT)'],
      },
    ],
  },
  {
    id: 'telephone', domain: 'elec', title: 'La batterie du téléphone',
    formulas: ['E = U Q', 'P = E/t'],
    decoys: ['E = m g h', 'P = F v', 'E = m c ΔT'],
    bridges: ['E'],
    quantities: {
      U: { value: 3.7, units: ['V'] },
      Q: { min: 7200, max: 18000, step: 360, units: ['C', 'mAh', 'Ah'] },
      P: { min: 0.5, max: 4, step: 0.1, units: ['W'] },
      t: { min: 600, max: 2e5, step: 1, units: ['s', 'min', 'h'] },
    },
    cases: [
      {
        find: 't', given: ['U', 'Q', 'P'], answerUnit: 'h',
        text: 'La batterie d\'un téléphone ({U}) contient une charge de {Q}. Le téléphone consomme en moyenne {P}. Combien d\'heures tient-il ?',
        lines: ['P t = U Q', 't = (U Q)/P'],
      },
      {
        find: 'P', given: ['U', 'Q', 't'], minLevel: 3,
        quantities: { t: { min: 3600, max: 86400, step: 1800, units: ['s', 'min', 'h'] } },
        text: 'Une batterie de téléphone ({U}, {Q}) se vide en {t}. Quelle puissance moyenne le téléphone consomme-t-il ?',
        lines: ['P t = U Q', 'P = (U Q)/t'],
      },
    ],
  },
];
