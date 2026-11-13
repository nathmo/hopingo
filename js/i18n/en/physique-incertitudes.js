// English texts: physique-incertitudes. See js/i18n.js.
// Generators of js/content/physique/incertitudes.js and traps of
// rules-incertitudes.js.
export default {
  // ---------- traps ----------
  'Valeurs du milieu au lieu des extrémités': 'Middle values instead of the ends',
  "Largeur entière prise pour l'incertitude": 'Whole width taken as the uncertainty',
  'entre 380 et 420 → ± 40': 'between 380 and 420 → ± 40',
  'entre 380 et 420 → 400 ± 20': 'between 380 and 420 → 400 ± 20',
  'Facteur 100 du pourcentage oublié': 'Factor 100 of the percentage forgotten',
  "Avec les valeurs du milieu, on obtient le résultat du milieu, pas une borne. Pour la plus petite valeur, chaque donnée prend l'extrémité qui rend le résultat le plus petit.": 'With the middle values you get the middle result, not a bound. For the smallest value, each datum takes the end that makes the result smallest.',
  "L'incertitude va du milieu jusqu'à une borne : c'est la moitié de la largeur de la fourchette.": 'The uncertainty goes from the middle to one bound: it is half the width of the range.',
  "Un pourcentage, c'est « sur 100 » : 0,0056 = 0,56 %. Pour passer d'une fraction à des %, on multiplie par 100 ; pour prendre 2 % d'une valeur, on multiplie par 0,02.": 'A percentage means “out of 100”: 0,0056 = 0,56 %. To turn a fraction into %, multiply by 100; to take 2 % of a value, multiply by 0,02.',

  // ---------- rg-read ----------
  '{data}. Quelle est la plus grande valeur possible ?': '{data}. What is the largest possible value?',
  '{data}. Quelle est la plus petite valeur possible ?': '{data}. What is the smallest possible value?',
  '« ± » veut dire : autant de moins, et autant de plus.': '“±” means: that much less, and that much more.',
  'entre {a} et {b}': 'between {a} and {b}',
  '{data}. Entre quelles valeurs se trouve la vraie valeur ?': '{data}. Between which values is the true value?',
  'On sait que {range}. Écris-le sous la forme « valeur ± incertitude » : quelle est la valeur du milieu ?': 'You know that {range}. Write it as “value ± uncertainty”: what is the middle value?',
  'La valeur du milieu est la moyenne des deux bornes.': 'The middle value is the mean of the two bounds.',
  "On sait que {range}. Écris-le sous la forme « valeur ± incertitude » : quelle est l'incertitude ?": 'You know that {range}. Write it as “value ± uncertainty”: what is the uncertainty?',
  "L'incertitude est la moitié de la largeur de la fourchette.": 'The uncertainty is half the width of the range.',
  'Une course dure {t} = {c} ± {u} min. Quelle est la plus petite durée possible, en secondes ?': 'A race lasts {t} = {c} ± {u} min. What is the shortest possible time, in seconds?',
  'Une course dure {t} = {c} ± {u} min. Quelle est la plus grande durée possible, en secondes ?': 'A race lasts {t} = {c} ± {u} min. What is the longest possible time, in seconds?',
  '{data} à {p} % près. Quelle est la plus petite valeur possible ?': '{data} to within {p} %. What is the smallest possible value?',
  '{data} à {p} % près. Quelle est la plus grande valeur possible ?': '{data} to within {p} %. What is the largest possible value?',
  "D'abord l'incertitude dans l'unité de la mesure, puis la borne.": 'First the uncertainty in the unit of the measurement, then the bound.',
  'Oui : les deux fourchettes se chevauchent.': 'Yes: the two ranges overlap.',
  'Non : les deux fourchettes ne se touchent pas.': 'No: the two ranges do not touch.',
  'Non, car les deux valeurs du milieu sont différentes.': 'No, because the two middle values are different.',
  'Deux élèves mesurent la même table : {a} et {b}. Leurs mesures sont-elles compatibles ?': 'Two students measure the same table: {a} and {b}. Are their measurements compatible?',
  'Deux groupes mesurent la masse du même caillou : {a} et {b}. Leurs mesures sont-elles compatibles ?': 'Two groups measure the mass of the same pebble: {a} and {b}. Are their measurements compatible?',
  'Deux chronomètres mesurent la même course : {a} et {b}. Leurs mesures sont-elles compatibles ?': 'Two stopwatches time the same race: {a} and {b}. Are their measurements compatible?',
  "Les fourchettes n'ont rien en commun : au moins une des mesures est fausse.": 'The ranges have nothing in common: at least one of the measurements is wrong.',
  'Les fourchettes ont une partie commune : les deux mesures peuvent être justes.': 'The ranges share a part: both measurements can be right.',

  // ---------- rg-ends ----------
  'Dans {f}, quelles valeurs prends-tu pour obtenir le plus petit {r} ?': 'In {f}, which values do you take to get the smallest {r}?',
  'Dans {f}, quelles valeurs prends-tu pour obtenir le plus grand {r} ?': 'In {f}, which values do you take to get the largest {r}?',
  "Ce qui est sous la barre de fraction agit à l'envers.": 'What is under the fraction bar acts the other way round.',
  '{f}, avec {a} et {b}. Pour obtenir le plus grand {r}, quelle valeur de {s} prends-tu ?': '{f}, with {a} and {b}. To get the largest {r}, which value of {s} do you take?',
  '{f}, avec {a} et {b}. Pour obtenir le plus petit {r}, quelle valeur de {s} prends-tu ?': '{f}, with {a} and {b}. To get the smallest {r}, which value of {s} do you take?',
  '{s} est sous la barre : sa plus grande valeur donne le plus petit résultat.': '{s} is under the bar: its largest value gives the smallest result.',

  // ---------- rg-compute ----------
  '{f}, avec {data}. Quelle est la plus petite valeur possible de {r} ?': '{f}, with {data}. What is the smallest possible value of {r}?',
  '{f}, avec {data}. Quelle est la plus grande valeur possible de {r} ?': '{f}, with {data}. What is the largest possible value of {r}?',
  "Pour chaque donnée, l'extrémité qui pousse le résultat dans le bon sens : sous la barre, à l'envers.": 'For each datum, the end that pushes the result the right way: under the bar, the other way round.',
  'Puis les données en SI, et un seul calcul.': 'Then the data in SI, and a single computation.',

  // ---------- rg-digits ----------
  "La fourchette de {s} va de {lo} à {hi}. La calculatrice affiche {calc}. Qu'écris-tu comme résultat ?": 'The range of {s} goes from {lo} to {hi}. The calculator shows {calc}. What do you write as the result?',
  "La demi-largeur de la fourchette dit quel chiffre est incertain : on s'arrête à ce chiffre-là.": 'The half-width of the range tells which digit is uncertain: stop at that digit.',
  'La fourchette de {s} va de {lo} à {hi}. Combien de chiffres significatifs peux-tu garder dans le résultat ?': 'The range of {s} goes from {lo} to {hi}. How many significant figures can you keep in the result?',
  'On garde {n} chiffres significatifs.': 'Keep {n} significant figures.',
  'On garde un seul chiffre significatif.': 'Keep a single significant figure.',
  "La calculatrice donne {data}. Comment l'écrire honnêtement ?": 'The calculator gives {data}. How do you write it honestly?',
  "L'incertitude avec un seul chiffre, et la valeur arrêtée au même rang.": 'The uncertainty with a single digit, and the value stopped at the same place.',
  'Un élève écrit {data}. Combien de chiffres significatifs a-t-il le droit de garder ?': 'A student writes {data}. How many significant figures may he keep?',

  // ---------- rg-conclude ----------
  'Oui : toute la fourchette est au-dessus de {lim}.': 'Yes: the whole range is above {lim}.',
  'Non : toute la fourchette est en dessous de {lim}.': 'No: the whole range is below {lim}.',
  'On ne peut pas conclure : {lim} est dans la fourchette.': 'You cannot conclude: {lim} is inside the range.',
  'Oui, car {c} est plus grand que {lim}.': 'Yes, because {c} is greater than {lim}.',
  'Non, car {c} est plus petit que {lim}.': 'No, because {c} is less than {lim}.',
  'On conclut seulement si toute la fourchette est du même côté de la limite.': 'You conclude only if the whole range is on the same side of the limit.',
  '{data}. Le cycliste a-t-il roulé plus vite que {lim} ?': '{data}. Did the cyclist ride faster than {lim}?',
  "{data}. L'objet coule-t-il dans l'eau ({lim}) ?": '{data}. Does the object sink in water ({lim})?',
  "{data}. Le sac a-t-il gagné plus de {lim} d'énergie ?": '{data}. Did the bag gain more than {lim} of energy?',
  '{data}. La voiture a-t-elle dépassé la limite de {lim} ?': '{data}. Did the car go over the {lim} limit?',
  '{data}. La bouilloire consomme-t-elle plus de {lim} ?': '{data}. Does the kettle use more than {lim}?',
  '{data}. La charge dépasse-t-elle le maximum autorisé de {lim} ?': '{data}. Is the load over the allowed maximum of {lim}?',
  'Oui : même la plus petite valeur de A dépasse la plus grande de B.': 'Yes: even the smallest value of A is above the largest of B.',
  'Non : même la plus grande valeur de A est plus petite que la plus petite de B.': 'No: even the largest value of A is below the smallest of B.',
  'On ne peut pas conclure : les deux fourchettes se chevauchent.': 'You cannot conclude: the two ranges overlap.',
  'Oui, car la valeur du milieu de A est plus grande.': 'Yes, because the middle value of A is greater.',
  'Non, car la valeur du milieu de A est plus petite.': 'No, because the middle value of A is smaller.',
  'On compare les fourchettes, pas les valeurs du milieu.': 'Compare the ranges, not the middle values.',
  'Vélo A : {a}. Vélo B : {b}. Le vélo A est-il plus rapide que le vélo B ?': 'Bike A: {a}. Bike B: {b}. Is bike A faster than bike B?',
  'Liquide A : {a}. Liquide B : {b}. Le liquide A est-il plus dense que le liquide B ?': 'Liquid A: {a}. Liquid B: {b}. Is liquid A denser than liquid B?',
  'Moteur A : {a}. Moteur B : {b}. Le moteur A est-il plus puissant que le moteur B ?': 'Motor A: {a}. Motor B: {b}. Is motor A more powerful than motor B?',

  // ---------- rg-percent ----------
  "{data}. Quelle est l'incertitude relative, en % ?": '{data}. What is the relative uncertainty, in %?',
  "L'incertitude relative est l'incertitude divisée par la valeur.": 'The relative uncertainty is the uncertainty divided by the value.',
  'Laquelle de ces mesures faut-il améliorer en priorité ?': 'Which of these measurements should be improved first?',
  "{data} à {p} % près. Quelle est l'incertitude, dans l'unité de la mesure ?": '{data} to within {p} %. What is the uncertainty, in the unit of the measurement?',
  'Un pourcentage se calcule sur la valeur mesurée.': 'A percentage is taken of the measured value.',
};
