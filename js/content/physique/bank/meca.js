// Mechanics problems (format: js/content/physique/problems.js).
// Situations from the class (luge, toboggan, charrue, vélo cargo, pompe,
// chiens de traîneau) and new ones on the same formulas.

const g = { value: 10, units: ['N/kg'] };
const MASS_CANCELS = 'Le résultat ne dépend pas de la masse : léger ou lourd, c\'est pareil.';

export default [
  {
    id: 'luge', domain: 'meca', title: 'La luge',
    formulas: ['E = m g h', 'E = 1/2 m v^2'],
    decoys: ['P = E/t', 'E = m c ΔT', 'P = U I'],
    bridges: ['E'],
    quantities: {
      m: { min: 25, max: 90, step: 1, units: ['kg'] },
      g,
      h: { min: 1.5, max: 12, step: 0.1, units: ['m', 'cm'] },
      v: { min: 3, max: 16, step: 0.1, units: ['m/s', 'km/h'] },
    },
    cancels: { m: MASS_CANCELS },
    cases: [
      {
        find: 'v', given: ['m', 'g', 'h'],
        text: '{nom} ({m}, avec sa luge) part sans vitesse du haut d\'une pente. Le bas de la piste est {h} plus bas que le départ. On néglige les frottements. À quelle vitesse la luge arrive-t-elle en bas ?',
        lines: ['m g h = 1/2 m v^2', 'g h = 1/2 v^2', 'v^2 = 2 g h', 'v = √(2 g h)'],
      },
      {
        find: 'v', given: ['m', 'g', 'h'], answerUnit: 'km/h', minLevel: 3,
        text: '{nom} ({m}, avec sa luge) part sans vitesse du haut d\'une pente. Le bas de la piste est {h} plus bas que le départ. On néglige les frottements. À quelle vitesse, en km/h, la luge arrive-t-elle en bas ?',
        lines: ['m g h = 1/2 m v^2', 'g h = 1/2 v^2', 'v^2 = 2 g h', 'v = √(2 g h)'],
      },
      {
        find: 'h', given: ['m', 'g', 'v'],
        text: 'On construit une piste de luge pour que {nom} ({m} avec sa luge), partie sans vitesse, arrive en bas à {v}. On néglige les frottements. Quelle doit être la différence de hauteur entre le départ et l\'arrivée ?',
        lines: ['m g h = 1/2 m v^2', 'g h = 1/2 v^2', 'h = v^2/(2 g)'],
      },
    ],
  },
  {
    id: 'toboggan', domain: 'meca', title: 'Le toboggan aquatique',
    formulas: ['E = m g h', 'E = 1/2 m v^2'],
    decoys: ['P = E/t', 'ρ = m/V', 'E = F d'],
    bridges: ['E'],
    quantities: {
      g,
      h: { min: 1, max: 10, step: 0.1, units: ['m'] },
      v: { min: 5, max: 12, step: 0.5, units: ['m/s', 'km/h'] },
    },
    cancels: { m: 'La masse n\'est pas donnée, et elle n\'est pas nécessaire : la hauteur permise est la même pour un enfant et pour un adulte.' },
    cases: [
      {
        find: 'h', given: ['g', 'v'],
        text: 'Une piscine construit un toboggan. On part sans vitesse en haut, et on néglige les frottements. Le règlement dit que la vitesse en bas ne doit pas dépasser {v}. Quelle est la hauteur maximale autorisée ?',
        lines: ['m g h = 1/2 m v^2', 'g h = 1/2 v^2', 'h = v^2/(2 g)'],
      },
      {
        find: 'v', given: ['g', 'h'],
        text: 'Un toboggan aquatique fait {h} de haut. On part sans vitesse en haut, et on néglige les frottements. À quelle vitesse arrive-t-on dans l\'eau ?',
        lines: ['m g h = 1/2 m v^2', 'g h = 1/2 v^2', 'v = √(2 g h)'],
      },
    ],
  },
  {
    id: 'ascenseur', domain: 'meca', title: 'L\'ascenseur',
    formulas: ['E = m g h', 'P = E/t'],
    decoys: ['E = 1/2 m v^2', 'E = m c ΔT', 'ρ = m/V'],
    bridges: ['E'],
    quantities: {
      m: { min: 200, max: 1500, step: 10, units: ['kg', 't'] },
      g,
      h: { min: 3, max: 30, step: 0.5, units: ['m'] },
      t: { min: 5, max: 90, step: 1, units: ['s', 'min'] },
      P: { min: 200, max: 1e5, step: 100, units: ['W', 'kW'] },
    },
    cases: [
      {
        find: 'P', given: ['m', 'g', 'h', 't'],
        text: 'Un ascenseur et ses passagers ({m}) montent de {h} en {t}. Quelle puissance moyenne le moteur doit-il fournir, au minimum ?',
        lines: ['P = E/t', 'P = (m g h)/t'],
      },
      {
        find: 't', given: ['m', 'g', 'h', 'P'],
        text: 'Un monte-charge de {P} doit monter {m} de marchandises de {h}. Combien de temps lui faut-il, au minimum ?',
        lines: ['P t = m g h', 't = (m g h)/P'],
      },
      {
        find: 'm', given: ['P', 'g', 'h', 't'], minLevel: 3,
        text: 'Un treuil de {P} monte des sacs de {h} en {t}. Quelle masse de sacs peut-il monter, au plus ?',
        lines: ['m g h = P t', 'm = (P t)/(g h)'],
      },
    ],
  },
  {
    id: 'freinage', domain: 'meca', title: 'Le freinage',
    formulas: ['E = 1/2 m v^2', 'E = F d'],
    decoys: ['E = m g h', 'P = E/t', 'E = m c ΔT'],
    bridges: ['E'],
    quantities: {
      m: { min: 800, max: 2000, step: 50, units: ['kg', 't'] },
      v: { min: 8, max: 35, step: 1, units: ['m/s', 'km/h'] },
      F: { min: 3000, max: 15000, step: 500, units: ['N', 'kN'] },
      d: { min: 3, max: 200, step: 1, units: ['m'] },
    },
    cases: [
      {
        find: 'd', given: ['m', 'v', 'F'],
        text: 'Une voiture de {m} roule à {v}. Elle freine avec une force constante de {F}. Sur quelle distance s\'arrête-t-elle ?',
        lines: ['F d = 1/2 m v^2', 'd = (m v^2)/(2 F)'],
      },
      {
        find: 'F', given: ['m', 'v', 'd'],
        text: 'Une voiture de {m} roule à {v}. Elle doit s\'arrêter sur {d}. Quelle force de freinage, constante, faut-il ?',
        lines: ['F d = 1/2 m v^2', 'F = (m v^2)/(2 d)'],
      },
      {
        find: 'v', given: ['m', 'F', 'd'], minLevel: 3,
        text: 'Après un freinage, une voiture de {m} a laissé des traces sur {d}. Les freins exercent une force de {F}. À quelle vitesse roulait-elle ?',
        lines: ['F d = 1/2 m v^2', 'v^2 = (2 F d)/m', 'v = √(2 F d/m)'],
      },
    ],
  },
  {
    id: 'charrue', domain: 'meca', title: 'La charrue',
    formulas: ['E = F d', 'P = E/t'],
    decoys: ['E = m g h', 'E = 1/2 m v^2', 'P = U I'],
    bridges: ['E'],
    quantities: {
      F: { min: 150, max: 600, step: 50, units: ['N'] },
      d: { min: 50, max: 500, step: 10, units: ['m', 'km'] },
      t: { min: 30, max: 1200, step: 10, units: ['s', 'min'] },
      P: { min: 200, max: 900, step: 50, units: ['W'] },
    },
    cases: [
      {
        find: 'P', given: ['F', 'd', 't'],
        text: 'Un cheval tire une charrue avec une force de {F} le long d\'un sillon de {d}. Il met {t}. Quelle puissance moyenne fournit-il ?',
        lines: ['P = E/t', 'P = (F d)/t'],
      },
      {
        find: 't', given: ['F', 'd', 'P'],
        text: 'Un cheval de trait fournit {P} en tirant une charrue avec une force de {F}. Combien de temps met-il pour labourer un sillon de {d} ?',
        lines: ['P t = F d', 't = (F d)/P'],
      },
      {
        find: 'd', given: ['F', 'P', 't'], minLevel: 3,
        text: 'Un bœuf fournit {P} en tirant une charrue avec une force de {F}. Quelle longueur de sillon laboure-t-il en {t} ?',
        lines: ['F d = P t', 'd = (P t)/F'],
      },
    ],
  },
  {
    id: 'velo-cargo', domain: 'meca', title: 'La descente en vélo cargo',
    formulas: ['E = m g h', 'P = E/t'],
    decoys: ['E = 1/2 m v^2', 'P = U I', 'E = m c ΔT'],
    bridges: ['E'],
    quantities: {
      m: { min: 80, max: 150, step: 5, units: ['kg'] },
      g,
      h: { min: 200, max: 1500, step: 50, units: ['m', 'km'] },
      t: { min: 600, max: 3600, step: 60, units: ['s', 'min'] },
      P: { min: 50, max: 5000, step: 10, units: ['W'] },
    },
    cases: [
      {
        find: 'P', given: ['m', 'g', 'h', 't'],
        text: 'Tu descends un col en vélo cargo, à vitesse constante : {m} en tout, {h} de dénivelé, en {t}. Un frein régénératif envoie toute l\'énergie dans la batterie. Quelle puissance moyenne la batterie doit-elle absorber ?',
        lines: ['P = E/t', 'P = (m g h)/t'],
      },
      {
        find: 'h', given: ['m', 'g', 'P', 't'], minLevel: 3,
        text: 'Un vélo cargo ({m} en tout) descend à vitesse constante pendant {t}. Son frein régénératif envoie {P} dans la batterie. Quel dénivelé a-t-il descendu ?',
        lines: ['m g h = P t', 'h = (P t)/(m g)'],
      },
    ],
  },
  {
    id: 'turbine', domain: 'meca', title: 'La chute d\'eau',
    formulas: ['m = ρ V', 'E = m g h', 'P = E/t'],
    decoys: ['E = 1/2 m v^2', 'P = U I', 'E = m c ΔT'],
    bridges: ['m', 'E'],
    quantities: {
      ρ: { value: 1000, units: ['kg/m^3'] },
      V: { min: 0.1, max: 5, step: 0.1, units: ['m^3', 'L'] },
      g,
      h: { min: 2, max: 50, step: 1, units: ['m'] },
      t: { value: 1, units: ['s'] },
      P: { min: 1000, max: 3e6, step: 1000, units: ['W', 'kW'] },
    },
    cases: [
      {
        find: 'P', given: ['ρ', 'V', 'g', 'h', 't'],
        text: 'Chaque seconde, {V} d\'eau tombent de {h} sur une turbine. Quelle puissance l\'eau apporte-t-elle à la turbine ?',
        lines: ['P = (m g h)/t', 'P = (ρ V g h)/t'],
      },
      {
        find: 'h', given: ['ρ', 'V', 'g', 'P', 't'], minLevel: 3,
        text: 'Une petite centrale doit recevoir {P} de l\'eau. Le débit est de {V} par seconde. De quelle hauteur l\'eau doit-elle tomber ?',
        lines: ['P t = ρ V g h', 'h = (P t)/(ρ V g)'],
      },
    ],
  },
  {
    id: 'pompe', domain: 'meca', title: 'La pompe',
    formulas: ['m = ρ V', 'E = 1/2 m v^2', 'P = E/t'],
    decoys: ['E = m g h', 'P = U I', 'E = F d'],
    bridges: ['m', 'E'],
    quantities: {
      ρ: { value: 1000, units: ['kg/m^3'] },
      V: { min: 0.01, max: 2, step: 0.01, units: ['m^3', 'L'] },
      v: { min: 2, max: 20, step: 0.5, units: ['m/s'] },
      t: { value: 1, units: ['s'] },
      P: { min: 10, max: 5e5, step: 10, units: ['W', 'kW'] },
    },
    cases: [
      {
        find: 'P', given: ['ρ', 'V', 'v', 't'],
        text: 'Une pompe propulse {V} d\'eau par seconde, qui sort du tuyau à {v}. Quelle est la puissance de la pompe ?',
        lines: ['P = 1/2 m v^2/t', 'P = (ρ V v^2)/(2 t)'],
      },
    ],
  },
  {
    id: 'traineau', domain: 'meca', title: 'Les chiens de traîneau',
    formulas: ['P = F v', 'd = v t'],
    decoys: ['E = 1/2 m v^2', 'E = m g h', 'P = U I'],
    bridges: ['v'],
    quantities: {
      P: { min: 300, max: 1000, step: 50, units: ['W'] },
      F: { min: 150, max: 400, step: 10, units: ['N'] },
      d: { min: 2000, max: 30000, step: 500, units: ['m', 'km'] },
      t: { min: 300, max: 40000, step: 1, units: ['s', 'min', 'h'] },
    },
    cases: [
      {
        find: 't', given: ['P', 'F', 'd'], answerUnit: 'min',
        text: 'Une équipe de chiens fournit {P} pour tirer un traîneau avec une force de {F}. La traversée du lac fait {d}. Combien de minutes dure-t-elle ?',
        lines: ['v = P/F', 't = d/v', 't = (d F)/P'],
      },
      {
        find: 'd', given: ['P', 'F', 't'], minLevel: 3,
        text: 'Des chiens de traîneau fournissent {P} et tirent avec une force de {F}. Quelle distance parcourent-ils en {t} ?',
        lines: ['v = P/F', 'd = v t', 'd = (P t)/F'],
      },
    ],
  },
];
