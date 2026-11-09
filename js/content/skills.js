// The skill graph. Each unit lists its skills in map order. The global path
// (what "Continuer" follows, and what the placement skim searches) sorts all
// skills by `year`, the HarmoS year where the skill is usually met (track A
// earlier, track C later), keeping unit order for ties.

export const UNITS = [
  { id: 'calcul', title: 'Calcul mental', color: '#f08c00', ready: true },
  { id: 'fractions', title: 'Fractions', color: '#7c5cff', ready: true },
  { id: 'relatifs', title: 'Nombres relatifs', color: '#e8590c', ready: true },
  { id: 'arithmetique', title: 'Diviseurs et nombres premiers', color: '#2f9e44', ready: true },
  { id: 'proportion', title: 'Proportionnalité et pourcentages', color: '#0b7285', ready: true },
  { id: 'puissances', title: 'Puissances', color: '#0ca678', ready: true },
  { id: 'racines', title: 'Racines carrées', color: '#1c7ed6', ready: true },
  { id: 'unites', title: 'Grandeurs et unités', color: '#e67700', ready: true },
  { id: 'melanges', title: 'Calculs mélangés', color: '#c2255c', ready: true },
];

// Times tables and mental arithmetic. Fact skills are played as fast
// series (see content/calcul.js); each fact has its own spaced memory.
const CALCUL = [
  {
    id: 'cm-add20', unit: 'calcul', year: 5, prereqs: [], icon: '+', facts: true,
    title: 'Additions jusqu\'à 20',
    desc: 'Faire 10, les doubles, les presque-doubles.',
    intro: {
      rule: 'Pour dépasser 10, on <b>fait 10</b> d\'abord :<br>8 + 5 = 8 + 2 + 3 = <b>13</b>.<br>Les doubles aident aussi : 6 + 7 = 6 + 6 + 1 = 13.',
      example: [{ math: '8+5', note: '= 8 + 2 + 3 = 13' }, { math: '6+7', note: '= 6 + 6 + 1 = 13' }],
    },
  },
  {
    id: 'cm-sub20', unit: 'calcul', year: 5, prereqs: ['cm-add20'], icon: '−', facts: true,
    title: 'Soustractions jusqu\'à 20',
    desc: 'Une soustraction est une addition à trou.',
    intro: {
      rule: '13 − 8, c\'est « 8 + combien = 13 ? ».<br>Ou on passe par 10 : 13 − 3 = 10, puis 10 − 5 = <b>5</b>.',
      example: [{ math: '13-8', note: '= 5, car 8 + 5 = 13' }],
    },
  },
  {
    id: 'cm-add1', unit: 'calcul', year: 5, prereqs: ['cm-sub20'], icon: '±',
    title: 'Ajouter ou retirer un petit nombre',
    desc: '47 + 8, 52 − 7 : on passe par la dizaine.',
    intro: {
      rule: 'On va d\'abord à la dizaine, puis on continue :<br>47 + 8 = 47 + 3 + 5 = <b>55</b><br>52 − 7 = 52 − 2 − 5 = <b>45</b>',
      example: [{ math: '47+8', note: '= 50 + 5 = 55' }, { math: '52-7', note: '= 50 − 5 = 45' }],
    },
  },
  {
    id: 'cm-add2', unit: 'calcul', year: 6, prereqs: ['cm-add1'], icon: '±±',
    title: 'Ajouter ou retirer un nombre à 2 chiffres',
    desc: 'Les dizaines puis les unités, ou arrondir et corriger.',
    intro: {
      rule: 'Les dizaines, puis les unités : 45 + 32 = 75 + 2 = <b>77</b>.<br>Avec un 7, un 8 ou un 9, on arrondit puis on corrige :<br>47 + 38 = 47 + 40 − 2 = <b>85</b>.',
      example: [{ math: '47+38', note: '= 87 − 2 = 85' }, { math: '83-47', note: '= 33 + 3 = 36' }],
    },
  },
  {
    id: 'tab-2510', unit: 'calcul', year: 5, prereqs: [], icon: '×2', facts: true,
    title: 'Livrets de 2, 5 et 10',
    desc: 'Les points d\'appui des autres livrets.',
    intro: {
      rule: '× 10 : on ajoute un zéro.<br>× 2 : le double.<br>× 5 : la moitié de × 10. 7 × 5 = 70 ÷ 2 = <b>35</b>.',
      example: [{ math: '7×10', note: '= 70' }, { math: '7×5', note: '= 70 ÷ 2 = 35' }],
    },
  },
  {
    id: 'tab-349', unit: 'calcul', year: 5, prereqs: ['tab-2510'], icon: '×9', facts: true,
    title: 'Livrets de 3, 4 et 9',
    desc: 'Le double du double, 10 fois moins une fois.',
    intro: {
      rule: '× 4 : le double du double. 4 × 7 = 14 × 2 = <b>28</b>.<br>× 9 : 10 fois moins une fois. 9 × 6 = 60 − 6 = <b>54</b>.<br>× 3 : le double plus une fois. 3 × 8 = 16 + 8 = <b>24</b>.',
      example: [{ math: '9×6', note: '= 60 − 6 = 54' }],
    },
  },
  {
    id: 'tab-678', unit: 'calcul', year: 6, prereqs: ['tab-349'], icon: '×7', facts: true,
    title: 'Livrets de 6, 7 et 8',
    desc: 'Les derniers, à partir de ceux que tu connais.',
    intro: {
      rule: 'On part de ce qu\'on sait :<br>6 × 7 = 5 × 7 + 7 = <b>42</b><br>8 × 7 = le double de 4 × 7 = <b>56</b><br>7 × 7 = 5 × 7 + 2 × 7 = <b>49</b><br>Et 7 × 8 = 8 × 7 : l\'ordre ne change rien.',
      example: [{ math: '8×7', note: '= 28 × 2 = 56' }],
    },
  },
  {
    id: 'tab-div', unit: 'calcul', year: 6, prereqs: ['tab-678'], icon: ':', facts: true,
    title: 'Divisions des livrets',
    desc: '56 : 8 = 7, car 8 × 7 = 56.',
    intro: {
      rule: 'Chaque division cache une multiplication :<br>56 : 8 = <b>7</b>, car 8 × 7 = 56.',
      example: [{ math: '56÷8', note: '= 7, car 8 × 7 = 56' }],
    },
  },
  {
    id: 'tab-1112', unit: 'calcul', year: 7, prereqs: ['tab-678'], icon: '×12', facts: true,
    title: 'Livrets de 11 et 12',
    desc: '10 fois plus une fois, 10 fois plus deux fois.',
    intro: {
      rule: '× 11 : 10 fois plus une fois. 11 × 7 = 70 + 7 = <b>77</b>.<br>× 12 : 10 fois plus deux fois. 12 × 7 = 70 + 14 = <b>84</b>.',
      example: [{ math: '12×7', note: '= 70 + 14 = 84' }],
    },
  },
  {
    id: 'sq-13', unit: 'calcul', year: 7, prereqs: ['tab-678'], icon: 'n²', facts: true,
    title: 'Carrés jusqu\'à 13²',
    desc: '1, 4, 9, 16, 25… 144, 169.',
    intro: {
      rule: 'Un carré, c\'est un nombre multiplié par lui-même : 13² = 13 × 13 = <b>169</b>.<br>Les connaître par cœur aide beaucoup pour les racines.',
      example: [{ math: '12^2', note: '= 144' }, { math: '13^2', note: '= 169' }],
    },
  },
  {
    id: 'sq-25', unit: 'calcul', year: 8, prereqs: ['sq-13', 'cm-add2'], icon: '25²', facts: true,
    title: 'Carrés jusqu\'à 25²',
    desc: '(20 + 3)² = 400 + 120 + 9.',
    intro: {
      rule: '(20 + 3)² = 400 + 2 × 20 × 3 + 9 = 400 + 120 + 9 = <b>529</b>.<br>Ceux qui finissent par 5 : pour 25², on fait 2 × 3 = 6, puis on écrit 25 : <b>625</b>.',
      example: [{ math: '23^2', note: '= 400 + 120 + 9 = 529' }, { math: '25^2', note: '= 625' }],
    },
  },
  {
    id: 'cm-round', unit: 'calcul', year: 7, prereqs: ['cm-add1'], icon: '≈',
    title: 'Arrondir',
    desc: 'À la dizaine, à l\'unité, au dixième.',
    intro: {
      rule: 'On regarde le chiffre juste après : de 0 à 4, on garde ; de 5 à 9, on monte.<br>3,47 au dixième : le 7 fait monter le 4 → <b>3,5</b>.',
      example: [{ math: '3,47', note: '≈ 3,5 au dixième' }, { math: '1249', note: '≈ 1 200 à la centaine' }],
    },
  },
  {
    id: 'cm-estimate', unit: 'calcul', year: 8, prereqs: ['cm-round', 'tab-678'], icon: '~',
    title: 'Estimer un résultat',
    desc: 'L\'ordre de grandeur, avant de calculer.',
    intro: {
      rule: 'On arrondit chaque nombre à un seul chiffre utile, puis on calcule :<br>49 × 21 ≈ 50 × 20 = <b>1 000</b>.<br>Ça permet de repérer une réponse absurde.',
      example: [{ math: '50×20', note: '≈ 49 × 21' }],
    },
  },
  {
    id: 'cm-mix', unit: 'calcul', year: 8, prereqs: ['tab-1112', 'cm-add2'], icon: '★',
    title: 'Calcul malin',
    desc: 'Doubles, moitiés, × 5, × 25, × 9, × 11.',
    intro: {
      rule: '× 5 = × 10 puis ÷ 2.<br>× 25 = × 100 puis ÷ 4. 36 × 25 = 3 600 ÷ 4 = <b>900</b>.<br>× 9 = 10 fois moins une fois. 23 × 9 = 230 − 23 = <b>207</b>.',
      example: [{ math: '36×25', note: '= 3 600 ÷ 4 = 900' }],
    },
  },
];

const FRACTIONS = [
  {
    id: 'frac-read', unit: 'fractions', year: 6, prereqs: [], icon: '◔',
    title: 'Lire une fraction',
    desc: 'Parts égales d\'une unité : le dénominateur, le numérateur.',
    intro: {
      rule: 'On coupe l\'unité en parts <b>égales</b>.<br>Le <b>dénominateur</b> (en bas) dit en combien de parts.<br>Le <b>numérateur</b> (en haut) dit combien de parts on prend.',
      figure: { kind: 'shape', shape: 'circle', n: 4, k: 3 },
      example: [{ math: '3/4', note: '3 parts colorées sur 4 parts égales.' }],
    },
  },
  {
    id: 'frac-line', unit: 'fractions', year: 7, prereqs: ['frac-read'], icon: '↔',
    title: 'Fractions sur la droite',
    desc: 'Placer une fraction sur une droite graduée, même au-delà de 1.',
    intro: {
      rule: 'Entre 0 et 1, on coupe en parts égales. Pour placer <b>5/4</b>, on avance de 5 quarts : on dépasse 1, et c\'est normal !',
      figure: { kind: 'line', max: 2, den: 4, mark: [5, 4] },
      example: [{ math: '5/4', note: '5 graduations de 1/4 depuis 0.' }],
    },
  },
  {
    id: 'frac-decimal', unit: 'fractions', year: 7, prereqs: ['frac-read'], icon: '0,5',
    title: 'Fractions et décimaux',
    desc: 'Les fractions repères : 1/2 = 0,5 ; 1/4 = 0,25 ; 3/4 = 0,75…',
    intro: {
      rule: 'La barre de fraction veut dire « divisé par ».<br><b>1/4</b>, c\'est 1 ÷ 4 = <b>0,25</b>.',
      example: [{ math: '1/2', note: '= 0,5' }, { math: '1/4', note: '= 0,25' }, { math: '3/4', note: '= 0,75' }],
    },
  },
  {
    id: 'frac-of', unit: 'fractions', year: 7, prereqs: ['frac-read'], icon: '⅔',
    title: 'Fraction d\'une quantité',
    desc: 'Calculer 2/3 de 12 : partager, puis prendre plusieurs parts.',
    intro: {
      rule: 'Pour prendre <b>2/3 de 12</b> : on partage 12 en 3 parts égales (12 ÷ 3 = 4), puis on prend 2 parts (2 × 4 = 8).',
      example: [{ math: '2/3', note: 'de 12 = 8' }],
    },
  },
  {
    id: 'frac-equiv', unit: 'fractions', year: 8, prereqs: ['frac-read'], icon: '=',
    title: 'Fractions égales',
    desc: 'Multiplier le numérateur et le dénominateur par le même nombre.',
    intro: {
      rule: 'Si on multiplie le numérateur <b>et</b> le dénominateur par le même nombre, on obtient la même fraction.',
      example: [{ math: '2/3', note: '= 10/15 (× 5 en haut et en bas)' }],
    },
  },
  {
    id: 'frac-add-same', unit: 'fractions', year: 8, prereqs: ['frac-read'], icon: '+',
    title: 'Même dénominateur',
    desc: 'Additionner et soustraire des fractions de même dénominateur.',
    intro: {
      rule: 'Même dénominateur : les parts ont la même taille. On additionne les numérateurs et on <b>garde</b> le dénominateur.',
      solve: '2/7+3/7',
    },
  },
  {
    id: 'frac-unit', unit: 'fractions', year: 8, prereqs: ['frac-line', 'frac-add-same'], icon: '1+',
    title: 'Entiers et fractions',
    desc: 'Écrire 17/5 = 3 + 2/5, et 2 + 3/4 en une seule fraction.',
    intro: {
      rule: 'Une unité = autant de parts que le dénominateur. En cinquièmes, 1 = 5/5, 3 = 15/5.<br>Donc <b>17/5 = 15/5 + 2/5 = 3 + 2/5</b>.',
      example: [{ math: '17/5', note: '= 3 + 2/5' }],
    },
  },
  {
    id: 'frac-quotient', unit: 'fractions', year: 9, prereqs: ['frac-line'], icon: '÷',
    title: 'La fraction quotient',
    desc: 'a/b est le nombre qui multiplié par b donne a.',
    intro: {
      rule: '<b>3/4</b>, c\'est aussi le résultat de 3 ÷ 4 : le nombre qui, multiplié par 4, donne 3.<br>3 pizzas pour 4 enfants : chacun reçoit 3/4 de pizza.',
      example: [{ math: '4×3/4', note: '= 3' }],
    },
  },
  {
    id: 'frac-simplify', unit: 'fractions', year: 9, prereqs: ['frac-equiv'], icon: '↘',
    title: 'Simplifier',
    desc: 'Diviser le numérateur et le dénominateur par le même nombre.',
    intro: {
      rule: 'On divise le numérateur <b>et</b> le dénominateur par un même diviseur. <b>Irréductible</b> : on ne peut plus simplifier.',
      example: [{ math: '12/18', note: '= 6/9 (÷ 2) = 2/3 (÷ 3)' }],
    },
  },
  {
    id: 'frac-compare', unit: 'fractions', year: 9, prereqs: ['frac-equiv', 'frac-line'], icon: '<',
    title: 'Comparer des fractions',
    desc: 'Même dénominateur, même numérateur, ou on transforme.',
    intro: {
      rule: 'Même dénominateur : on compare les numérateurs.<br>Sinon, on écrit les fractions avec le <b>même dénominateur</b>.',
      example: [{ math: '2/3', note: '= 8/12 et 3/4 = 9/12, donc 2/3 < 3/4' }],
    },
  },
  {
    id: 'frac-add-multiple', unit: 'fractions', year: 9, prereqs: ['frac-add-same', 'frac-equiv'], icon: '+',
    title: 'Dénominateurs multiples',
    desc: '1/2 + 3/8 : on transforme une seule fraction.',
    intro: {
      rule: '8 est un multiple de 2 : on écrit 1/2 en huitièmes, puis on additionne.',
      solve: '1/2+3/8',
    },
  },
  {
    id: 'frac-add-any', unit: 'fractions', year: 9, prereqs: ['frac-add-multiple'], icon: '+',
    title: 'Dénominateurs quelconques',
    desc: '2/3 + 1/4 : trouver un dénominateur commun.',
    intro: {
      rule: 'On cherche un multiple commun des deux dénominateurs (le plus petit possible), on transforme les deux fractions, puis on additionne.',
      solve: '2/3+1/4',
    },
  },
  {
    id: 'frac-mul-int', unit: 'fractions', year: 9, prereqs: ['frac-of', 'frac-add-same'], icon: '×',
    title: 'Entier × fraction',
    desc: '3 × 2/5 : on multiplie seulement le numérateur.',
    intro: {
      rule: '3 × 2/5, c\'est 2/5 + 2/5 + 2/5 : 3 fois 2 cinquièmes = 6 cinquièmes. On multiplie <b>seulement le numérateur</b>.',
      solve: '3×2/5',
    },
  },
  {
    id: 'frac-mul', unit: 'fractions', year: 10, prereqs: ['frac-mul-int', 'frac-simplify'], icon: '×',
    title: 'Multiplier des fractions',
    desc: 'Numérateurs entre eux, dénominateurs entre eux.',
    intro: {
      rule: 'Pas besoin de dénominateur commun ! On multiplie les numérateurs entre eux et les dénominateurs entre eux, puis on simplifie.',
      solve: '2/3×9/10',
    },
  },
  {
    id: 'frac-div', unit: 'fractions', year: 10, prereqs: ['frac-mul'], icon: '÷',
    title: 'Diviser des fractions',
    desc: 'Diviser, c\'est multiplier par l\'inverse.',
    intro: {
      rule: 'L\'inverse de 4/5 est 5/4. Diviser par 4/5, c\'est <b>multiplier par 5/4</b>. On inverse seulement la fraction par laquelle on divise.',
      solve: '2/3÷4/5',
    },
  },
  {
    id: 'frac-multistep', unit: 'fractions', year: 10, prereqs: ['frac-add-any', 'frac-mul'], icon: '∑',
    title: 'Calculs en plusieurs étapes',
    desc: 'Priorités et parenthèses, étape par étape, sans brouillon.',
    intro: {
      rule: 'D\'abord les parenthèses, puis × et ÷, puis + et −. Une étape à la fois : chaque ligne doit rester égale à la précédente.',
      solve: '1/2+1/3×3/4',
    },
  },
  {
    id: 'nb-convert', unit: 'fractions', year: 9, prereqs: ['frac-decimal', 'frac-simplify'], icon: '%',
    title: 'Décimal, fraction, pourcentage',
    desc: '0,375 = 3/8 = 37,5 %.',
    intro: {
      rule: '0,375 = 375 millièmes = 375/1000 = <b>3/8</b>.<br>Pour cent veut dire « sur 100 » : 35 % = 0,35.<br>Certaines fractions ne s\'arrêtent jamais : 1/3 = 0,333…',
      example: [{ math: '375/1000', note: '= 3/8' }, { math: '35/100', note: '= 0,35 = 35 %' }],
    },
  },
];

const RELATIFS = [
  {
    id: 'rel-read', unit: 'relatifs', year: 9, prereqs: [], icon: '±',
    title: 'Les nombres relatifs',
    desc: 'Sous zéro : températures, droite graduée, opposé.',
    intro: {
      rule: 'Les nombres <b>négatifs</b> sont sous zéro, à gauche de 0 sur la droite. On les écrit avec un signe −.<br>Deux nombres <b>opposés</b> sont à la même distance de 0, de chaque côté : 3 et −3.',
      figure: { kind: 'line', min: -5, max: 5, den: 1, mark: [-3, 1] },
      example: [{ math: '-3', note: '3 graduations à gauche de 0.' }],
    },
  },
  {
    id: 'rel-compare', unit: 'relatifs', year: 9, prereqs: ['rel-read'], icon: '<',
    title: 'Comparer des relatifs',
    desc: 'Le plus à gauche sur la droite est le plus petit.',
    intro: {
      rule: 'Sur la droite graduée, le plus petit est le plus à <b>gauche</b>.<br>Pour les négatifs, c\'est l\'inverse des positifs : −7 °C est plus froid que −3 °C, donc <b>−7 &lt; −3</b>.',
      figure: { kind: 'line', min: -8, max: 2, den: 1, mark: [-7, 1] },
      example: [{ math: '-7', note: '< −3 < 0 < 2' }],
    },
  },
  {
    id: 'rel-add', unit: 'relatifs', year: 9, prereqs: ['rel-read'], icon: '+',
    title: 'Additionner des relatifs',
    desc: 'Avancer, reculer : les signes contraires se compensent.',
    intro: {
      rule: 'Ajouter un positif, c\'est avancer ; ajouter un négatif, c\'est reculer.<br><b>Même signe</b> : on additionne les distances à zéro et on garde le signe.<br><b>Signes contraires</b> : on fait la différence des distances, avec le signe du plus éloigné de zéro.',
      solve: '-7+4',
    },
  },
  {
    id: 'rel-sub', unit: 'relatifs', year: 9, prereqs: ['rel-add'], icon: '−',
    title: 'Soustraire des relatifs',
    desc: 'Soustraire, c\'est ajouter l\'opposé.',
    intro: {
      rule: 'Soustraire un nombre, c\'est <b>ajouter son opposé</b> :<br>5 − (−3) = 5 + 3 et 2 − 6 = 2 + (−6).',
      solve: '5-(-3)',
    },
  },
  {
    id: 'rel-chain', unit: 'relatifs', year: 9, prereqs: ['rel-sub'], icon: '∑',
    title: 'Sommes de relatifs',
    desc: 'Plusieurs termes, et le − devant une parenthèse.',
    intro: {
      rule: 'On calcule de gauche à droite, une étape à la fois.<br>Un <b>−</b> devant une parenthèse s\'applique à tout ce qu\'elle contient : le plus sûr est de calculer la parenthèse d\'abord.',
      solve: '8-(3+7)',
    },
  },
  {
    id: 'rel-mul', unit: 'relatifs', year: 10, prereqs: ['rel-add'], icon: '×',
    title: 'Multiplier et diviser',
    desc: 'La règle des signes.',
    intro: {
      rule: 'On multiplie les distances à zéro, puis on choisit le signe :<br><b>mêmes signes → positif</b>, <b>signes contraires → négatif</b>.<br>Avec plusieurs facteurs, on compte les négatifs : un nombre pair donne un positif.',
      solve: '-6×(-4)',
    },
  },
  {
    id: 'rel-multistep', unit: 'relatifs', year: 10, prereqs: ['rel-chain', 'rel-mul'], icon: '∑',
    title: 'Priorités avec des relatifs',
    desc: 'Parenthèses, puis × et ÷, puis + et −, avec les signes.',
    intro: {
      rule: 'Les priorités ne changent pas : parenthèses, puis × et ÷, puis + et −. On écrit un nombre négatif entre parenthèses quand il suit un signe d\'opération.',
      solve: '-3+4×(-2)',
    },
  },
  {
    id: 'rel-frac', unit: 'relatifs', year: 10, prereqs: ['rel-multistep', 'frac-add-any', 'frac-mul'], icon: '±⅔',
    title: 'Fractions relatives',
    desc: 'Les règles des fractions et des signes ensemble.',
    intro: {
      rule: 'Une fraction peut être négative : −2/3. Les règles des fractions ne changent pas, et les signes suivent les règles des relatifs.',
      solve: '-2/3+1/2',
    },
  },
];

// Proportionality and percentages (content/proportion.js).
const PROPORTION = [
  {
    id: 'prop-detect', unit: 'proportion', year: 9, prereqs: ['tab-678'], icon: '∝',
    title: 'Proportionnel ou pas ?',
    desc: 'Multiplier par le même nombre, pas ajouter.',
    intro: {
      rule: 'Une situation est <b>proportionnelle</b> si on passe d\'une grandeur à l\'autre en multipliant toujours par le même nombre.<br>Attention : l\'aire d\'un carré n\'est pas proportionnelle à son côté (côté × 2 → aire × 4).',
      example: [{ math: '3×2', note: 'prix de 2 kg à 3 CHF le kg = 6 CHF' }],
    },
  },
  {
    id: 'prop-rule3', unit: 'proportion', year: 9, prereqs: ['prop-detect'], icon: '3→1→5',
    title: 'Règle de trois',
    desc: 'Passer par l\'unité.',
    intro: {
      rule: '3 kg coûtent 7,50 CHF. Pour 1 kg : 7,50 ÷ 3 = 2,50 CHF. Pour 5 kg : 2,50 × 5 = <b>12,50 CHF</b>.<br>Si c\'est inversement proportionnel (plus d\'ouvriers, moins de jours), on fait l\'inverse.',
      example: [{ math: '7,5÷3', note: '= 2,50 CHF pour 1 kg' }, { math: '2,5×5', note: '= 12,50 CHF pour 5 kg' }],
    },
  },
  {
    id: 'prop-scale', unit: 'proportion', year: 9, prereqs: ['prop-rule3', 'u-length'], icon: '1:n',
    title: 'Échelles',
    desc: 'Plans et cartes, dans les deux sens.',
    intro: {
      rule: 'Au 1 : 25 000, 1 cm sur la carte = 25 000 cm en vrai = 250 m.<br>4 cm → 4 × 25 000 = 100 000 cm = <b>1 km</b>. Les aires, elles, sont multipliées par 25 000².',
      example: [{ math: '4×25000', note: '= 100 000 cm = 1 km' }],
    },
  },
  {
    id: 'pct-of', unit: 'proportion', year: 9, prereqs: ['prop-rule3', 'nb-convert'], icon: '%',
    title: 'Pourcentage d\'une quantité',
    desc: '15 % de 80.',
    intro: {
      rule: '15 % = 15/100 = 0,15. Donc 15 % de 80 = 0,15 × 80 = <b>12</b>.<br>En tête : 10 % de 80 = 8, 5 % = 4, donc 15 % = 12.',
      example: [{ math: '0,15×80', note: '= 12' }],
    },
  },
  {
    id: 'pct-which', unit: 'proportion', year: 9, prereqs: ['pct-of'], icon: '?%',
    title: 'Quel pourcentage ?',
    desc: 'Une part du total, en %.',
    intro: {
      rule: 'On divise la part par le total, puis × 100 : 12 sur 48 → 12 ÷ 48 = 0,25 = <b>25 %</b>.',
      example: [{ math: '12÷48', note: '= 0,25 = 25 %' }],
    },
  },
  {
    id: 'pct-change', unit: 'proportion', year: 10, prereqs: ['pct-of'], icon: '↗%',
    title: 'Hausse et baisse en %',
    desc: 'Multiplier par 1,2 ou par 0,85.',
    intro: {
      rule: 'Augmenter de 20 %, c\'est multiplier par <b>1,2</b> (100 % + 20 %).<br>Baisser de 15 %, c\'est multiplier par <b>0,85</b> (100 % − 15 %).',
      example: [{ math: '80×0,85', note: '= 68 : 80 CHF après −15 %' }],
    },
  },
  {
    id: 'pct-reverse', unit: 'proportion', year: 10, prereqs: ['pct-change'], icon: '↶%',
    title: 'Retrouver la valeur de départ',
    desc: 'Diviser par le coefficient.',
    intro: {
      rule: 'Après +20 %, un prix vaut 96 CHF. Le départ a été multiplié par 1,2 : on divise, 96 ÷ 1,2 = <b>80 CHF</b>.<br>Retirer 20 % de 96 ne marche pas : les 20 % portaient sur 80.',
      example: [{ math: '96÷1,2', note: '= 80' }],
    },
  },
  {
    id: 'pct-successive', unit: 'proportion', year: 11, prereqs: ['pct-reverse'], icon: '%%',
    title: 'Pourcentages successifs',
    desc: '+10 % puis −10 % ne font pas 0 %.',
    intro: {
      rule: 'On multiplie les coefficients : +10 % puis −10 % → × 1,1 × 0,9 = × <b>0,99</b>, soit −1 %.',
      example: [{ math: '1,1×0,9', note: '= 0,99' }],
    },
  },
  {
    id: 'speed', unit: 'proportion', year: 10, prereqs: ['prop-rule3', 'u-time'], icon: 'km/h',
    title: 'Vitesse moyenne',
    desc: 'd = v × t, avec les bonnes unités.',
    intro: {
      rule: 'Vitesse = distance ÷ temps. 150 km en 1 h 30 min : 1 h 30 = <b>1,5 h</b> (pas 1,3 h !), donc 150 ÷ 1,5 = 100 km/h.',
      example: [{ math: '150÷1,5', note: '= 100 km/h' }],
    },
  },
  {
    id: 'slope', unit: 'proportion', year: 10, prereqs: ['pct-which'], icon: '⟋',
    title: 'Pente',
    desc: 'Dénivelé ÷ distance horizontale.',
    intro: {
      rule: 'Une route de pente <b>6 %</b> monte de 6 m pour 100 m à l\'horizontale.<br>Pente = dénivelé ÷ distance horizontale × 100.',
      example: [{ math: '12÷200×100', note: '= 6 %' }],
    },
  },
];

// Quantities and units (content/proportion.js).
const UNITES = [
  {
    id: 'u-length', unit: 'unites', year: 6, prereqs: ['tab-2510'], icon: 'm',
    title: 'Longueurs',
    desc: 'km, m, dm, cm, mm.',
    intro: {
      rule: 'Chaque unité vaut 10 fois la suivante : 1 m = 10 dm = 100 cm = 1 000 mm, et 1 km = 1 000 m.<br>Vers une unité plus petite, le nombre grandit.',
      example: [{ math: '3,4×1000', note: '3,4 km = 3 400 m' }],
    },
  },
  {
    id: 'u-mass', unit: 'unites', year: 6, prereqs: ['u-length'], icon: 'kg',
    title: 'Masses et capacités',
    desc: 't, kg, g, mg ; L, dL, cL, mL.',
    intro: {
      rule: '1 t = 1 000 kg, 1 kg = 1 000 g, 1 g = 1 000 mg.<br>1 L = 10 dL = 100 cL = 1 000 mL.',
      example: [{ math: '250÷1000', note: '250 mL = 0,25 L' }],
    },
  },
  {
    id: 'u-time', unit: 'unites', year: 7, prereqs: ['tab-678'], icon: '⏱',
    title: 'Durées',
    desc: 'Une heure a 60 minutes, pas 100.',
    intro: {
      rule: '1 h = 60 min, 1 min = 60 s.<br>1,5 h = 1 h + la moitié de 60 min = <b>1 h 30 min</b>. Et 45 min = 0,75 h.',
      example: [{ math: '1,5×60', note: '= 90 min' }],
    },
  },
  {
    id: 'u-area', unit: 'unites', year: 8, prereqs: ['u-length', 'sq-13'], icon: 'm²',
    title: 'Aires',
    desc: 'Facteur 100 entre unités voisines.',
    intro: {
      rule: 'Un carré de 1 m de côté = 100 cm × 100 cm = <b>10 000 cm²</b>.<br>Entre deux unités d\'aire voisines, le facteur est 100. 1 a = 100 m², 1 ha = 10 000 m².',
      example: [{ math: '100×100', note: '= 10 000 : 1 m² = 10 000 cm²' }],
    },
  },
  {
    id: 'u-volume', unit: 'unites', year: 9, prereqs: ['u-area'], icon: 'm³',
    title: 'Volumes',
    desc: 'Facteur 1 000 ; 1 dm³ = 1 L.',
    intro: {
      rule: 'Un cube de 1 m d\'arête = 10 dm × 10 dm × 10 dm = <b>1 000 dm³</b>.<br>Et 1 dm³ = 1 L : un cube de 10 cm de côté contient un litre.',
      example: [{ math: '10×10×10', note: '= 1 000 : 1 m³ = 1 000 L' }],
    },
  },
  {
    id: 'u-speed', unit: 'unites', year: 10, prereqs: ['u-time', 'prop-rule3'], icon: 'm/s',
    title: 'Vitesses',
    desc: 'km/h ↔ m/s : ÷ 3,6 ou × 3,6.',
    intro: {
      rule: '90 km/h = 90 000 m en 3 600 s = <b>25 m/s</b>. De km/h vers m/s, on divise par 3,6 ; dans l\'autre sens, on multiplie.',
      example: [{ math: '90÷3,6', note: '= 25 m/s' }],
    },
  },
  {
    id: 'u-imperial', unit: 'unites', year: 10, prereqs: ['u-area', 'u-volume'], icon: 'ft',
    title: 'Pieds et pouces',
    desc: 'Le facteur se met au carré ou au cube.',
    intro: {
      rule: '1 pouce = 2,54 cm, 1 pied = 30,48 cm.<br>Pour une aire, le facteur se met au <b>carré</b> : 1 pied² = 30,48² cm² ≈ 929 cm². Pour un volume, au <b>cube</b> : 1 pied³ ≈ 28,3 L.<br>Ici, pas de virgule à décaler : il faut calculer.',
      example: [{ math: '30,48^2', note: '≈ 929 cm² dans 1 pied²' }],
    },
  },
  {
    id: 'u-sci', unit: 'unites', year: 11, prereqs: ['pow-sci', 'u-length'], icon: '10ⁿ',
    title: 'Notation scientifique et unités',
    desc: 'Changer d\'unité en jouant sur l\'exposant.',
    intro: {
      rule: '1,5 × 10⁸ km = 1,5 × 10⁸ × 10³ m = <b>1,5 × 10¹¹ m</b>.<br>Vers une unité plus petite, l\'exposant augmente.',
      example: [{ math: '10^8×10^3', note: '= 10¹¹' }],
    },
  },
];

// Divisibility, primes, GCD and LCM (content/arithmetique.js).
const ARITHMETIQUE = [
  {
    id: 'ar-div', unit: 'arithmetique', year: 9, prereqs: ['tab-div'], icon: '÷?',
    title: 'Critères de divisibilité',
    desc: 'Par 2, 3, 4, 5, 9 et 10, sans poser la division.',
    intro: {
      rule: 'Par 2, 5, 10 : on regarde le dernier chiffre.<br>Par 4 : les deux derniers chiffres.<br>Par 3 et 9 : on additionne les chiffres. 4 152 → 4 + 1 + 5 + 2 = 12, multiple de 3, donc <b>4 152 est divisible par 3</b>.',
      example: [{ math: '4+1+5+2', note: '= 12 : divisible par 3, pas par 9' }],
    },
  },
  {
    id: 'ar-divisors', unit: 'arithmetique', year: 9, prereqs: ['ar-div'], icon: 'a|b',
    title: 'Multiples et diviseurs',
    desc: 'Lister les diviseurs, reconnaître un multiple.',
    intro: {
      rule: '3 est un <b>diviseur</b> de 12 car 12 : 3 = 4 sans reste. 12 est un <b>multiple</b> de 3.<br>On trouve les diviseurs par paires : 12 = 1 × 12 = 2 × 6 = 3 × 4.',
      example: [{ math: '12', note: 'diviseurs : 1, 2, 3, 4, 6, 12' }],
    },
  },
  {
    id: 'ar-prime', unit: 'arithmetique', year: 9, prereqs: ['ar-divisors'], icon: 'p',
    title: 'Nombres premiers',
    desc: 'Exactement deux diviseurs : 1 et lui-même.',
    intro: {
      rule: 'Un nombre <b>premier</b> a exactement deux diviseurs : 1 et lui-même. 2, 3, 5, 7, 11, 13…<br>1 n\'est pas premier. Et impair ne suffit pas : 51 = 3 × 17.',
      example: [{ math: '51', note: '= 3 × 17 : pas premier' }],
    },
  },
  {
    id: 'ar-factor', unit: 'arithmetique', year: 9, prereqs: ['ar-prime'], icon: '2³·3',
    title: 'Décomposer en facteurs premiers',
    desc: '360 = 2³ × 3² × 5.',
    intro: {
      rule: 'On divise par le plus petit nombre premier possible, encore et encore :<br>360 = 2 × 180 = 2 × 2 × 90 = … = <b>2³ × 3² × 5</b>.<br>Tape le produit avec × et ^ : 2^3×3^2×5.',
      example: [{ math: '2×180', note: '360 = 2 × 180' }, { math: '2^3×3^2×5', note: 'tous les facteurs sont premiers' }],
    },
  },
  {
    id: 'ar-gcd', unit: 'arithmetique', year: 9, prereqs: ['ar-factor'], icon: 'PGDC',
    title: 'PGDC et PPMC',
    desc: 'Le plus grand diviseur commun, le plus petit multiple commun.',
    intro: {
      rule: '12 = 2² × 3 et 18 = 2 × 3².<br><b>PGDC</b> : les facteurs communs, avec le plus petit exposant : 2 × 3 = <b>6</b>.<br><b>PPMC</b> : tous les facteurs, avec le plus grand exposant : 2² × 3² = <b>36</b>.',
      example: [{ math: '2×3', note: 'PGDC(12 ; 18) = 6' }, { math: '2^2×3^2', note: 'PPMC(12 ; 18) = 36' }],
    },
  },
  {
    id: 'ar-fractions', unit: 'arithmetique', year: 9, prereqs: ['ar-gcd', 'frac-add-any', 'frac-simplify'], icon: 'a/b',
    title: 'Fractions avec PGDC et PPMC',
    desc: 'Simplifier d\'un coup, trouver le plus petit dénominateur commun.',
    intro: {
      rule: 'Diviser par le PGDC simplifie en une seule étape : PGDC(84 ; 126) = 42, donc 84/126 = <b>2/3</b>.<br>Le plus petit dénominateur commun est le PPMC des dénominateurs.',
      solve: '84/126',
    },
  },
];

const PUISSANCES = [
  {
    id: 'pow-def', unit: 'puissances', year: 9, prereqs: [], icon: 'x²',
    title: 'Les puissances',
    desc: 'Carrés, cubes : un produit de facteurs égaux.',
    intro: {
      rule: '<b>2⁵</b> se lit « 2 exposant 5 » : c\'est 2 × 2 × 2 × 2 × 2. L\'exposant compte les <b>facteurs</b>.<br>Un carré : 7² = 7 × 7. Un cube : 4³ = 4 × 4 × 4.',
      solve: '3^4',
      solveOpts: { expandPowers: true },
    },
  },
  {
    id: 'pow-priority', unit: 'puissances', year: 10, prereqs: ['pow-def'], icon: '∑',
    title: 'Calculs avec des puissances',
    desc: 'Les puissances passent avant × et ÷.',
    intro: {
      rule: 'Ordre : parenthèses, puis <b>puissances</b>, puis × et ÷, puis + et −.<br>L\'exposant ne porte que sur le nombre juste à côté : 2 × 3² = 2 × 9.',
      solve: '2×3^2+1',
    },
  },
  {
    id: 'pow-sign', unit: 'puissances', year: 10, prereqs: ['pow-def', 'rel-mul'], icon: '(−)ⁿ',
    title: 'Puissances et signes',
    desc: '(−3)² ou −3² : les parenthèses changent tout.',
    intro: {
      rule: '(−3)² = (−3) × (−3) = <b>9</b>, mais −3² = −(3 × 3) = <b>−9</b> : sans parenthèses, l\'exposant ne porte que sur 3.<br>Un nombre pair de facteurs négatifs donne un résultat positif.',
      solve: '(-2)^3',
      solveOpts: { expandPowers: true },
    },
  },
  {
    id: 'pow-ten', unit: 'puissances', year: 10, prereqs: ['pow-def', 'frac-decimal'], icon: '10ⁿ',
    title: 'Puissances de 10',
    desc: '10⁴ = 10 000, 10⁰ = 1, 10⁻² = 0,01.',
    intro: {
      rule: '10ⁿ, c\'est 1 suivi de n zéros.<br><b>10⁰ = 1</b>, et un exposant négatif donne l\'inverse : <b>10⁻² = 1/10² = 0,01</b>.',
      example: [{ math: '10^3', note: '= 1000' }, { math: '10^0', note: '= 1' }, { math: '10^-2', note: '= 1/100 = 0,01' }],
    },
  },
  {
    id: 'pow-rules', unit: 'puissances', year: 10, prereqs: ['pow-def'], icon: 'aⁿ·aᵐ',
    title: 'Règles de calcul',
    desc: 'Produit, quotient et puissance de puissances du même nombre.',
    intro: {
      rule: '2³ × 2⁴ = 2<sup>3+4</sup> = 2⁷ : on <b>additionne</b> les exposants.<br>2⁶ ÷ 2² = 2<sup>6−2</sup> = 2⁴ : on <b>soustrait</b>.<br>(2³)² = 2<sup>3×2</sup> = 2⁶ : on <b>multiplie</b>.',
      example: [{ math: '2^3×2^4', note: '= 2⁷ : 3 + 4 = 7 facteurs' }],
    },
  },
  {
    id: 'pow-sci', unit: 'puissances', year: 11, prereqs: ['pow-ten'], icon: '×10ⁿ',
    title: 'Notation scientifique',
    desc: 'a × 10ⁿ avec un seul chiffre non nul avant la virgule.',
    intro: {
      rule: 'Notation scientifique : <b>a × 10ⁿ</b>, avec a entre 1 et 10 (un seul chiffre non nul avant la virgule).<br>34 000 = 3,4 × 10⁴ : la virgule avance de 4 rangs.',
      example: [{ math: '3,4×10^4', note: '= 34 000' }, { math: '5,2×10^-3', note: '= 0,0052' }],
    },
  },
  {
    id: 'pow-frac', unit: 'puissances', year: 10, prereqs: ['pow-sign', 'pow-ten', 'frac-mul'], icon: '(⅔)²',
    title: 'Puissances de fractions',
    desc: '(2/3)², (−1/2)³ et les exposants négatifs : (2/3)⁻² = 9/4.',
    intro: {
      rule: 'Toute la fraction est élevée : (2/3)² = 2/3 × 2/3 = <b>4/9</b>.<br>Le signe suit la règle des facteurs : (−1/2)³ = <b>−1/8</b>.<br>Un exposant négatif donne l\'inverse, et l\'exposant reste : (2/3)⁻² = (3/2)² = <b>9/4</b>.',
      solve: '(2/3)^-2',
    },
  },
];

const RACINES = [
  {
    id: 'root-squares', unit: 'racines', year: 10, prereqs: ['pow-def', 'sq-13'], icon: '√',
    title: 'Racines carrées',
    desc: 'Le nombre positif dont le carré est donné.',
    intro: {
      rule: '<b>√49</b> est le nombre <b>positif</b> qui, multiplié par lui-même, donne 49 : √49 = 7 car 7² = 49.<br>Connaître les carrés de 1 à 12 aide beaucoup !',
      solve: '√49',
    },
  },
  {
    id: 'root-estimate', unit: 'racines', year: 11, prereqs: ['root-squares'], icon: '≈',
    title: 'Encadrer une racine',
    desc: '√50 est entre 7 et 8, car 49 < 50 < 64.',
    intro: {
      rule: 'Si un nombre n\'est pas un carré parfait, sa racine n\'est pas entière. On l\'encadre avec les carrés voisins :<br>49 &lt; 50 &lt; 64, donc <b>7 &lt; √50 &lt; 8</b>.',
      example: [{ math: '√50', note: 'entre 7 et 8 (plus près de 7)' }],
    },
  },
  {
    id: 'root-calc', unit: 'racines', year: 11, prereqs: ['root-squares', 'pow-priority'], icon: '√+',
    title: 'Calculer avec des racines',
    desc: '√(9 + 16) n\'est pas √9 + √16.',
    intro: {
      rule: 'La racine agit sur <b>tout</b> ce qui est dessous : on calcule d\'abord sous la racine.<br>√(9 + 16) = √25 = 5, alors que √9 + √16 = 3 + 4 = 7.<br>Et (√7)² = 7 : le carré défait la racine.',
      solve: '√(9+16)',
    },
  },
  {
    id: 'root-eq', unit: 'racines', year: 11, prereqs: ['root-squares', 'rel-mul'], icon: 'x²=',
    title: 'Équations x² = a',
    desc: 'Deux solutions, une, ou aucune.',
    intro: {
      rule: 'x² = 25 a <b>deux</b> solutions : 5 et −5, car (−5)² = 25 aussi.<br>x² = 0 a une seule solution : 0. x² = −9 n\'en a <b>aucune</b> : un carré n\'est jamais négatif.',
      example: [{ math: '5^2', note: '= 25 et (−5)² = 25' }],
    },
  },
  {
    id: 'root-rules', unit: 'racines', year: 11, prereqs: ['root-calc'], icon: '√·√',
    title: 'Produits de racines',
    desc: '√a × √b = √(a × b).',
    intro: {
      rule: 'Pour multiplier ou diviser des racines, on peut tout mettre sous une seule racine :<br><b>√2 × √8 = √(2 × 8) = √16 = 4</b>. Attention : ça ne marche pas pour + et −.',
      solve: '√2×√8',
    },
  },
  {
    id: 'nb-sets', unit: 'racines', year: 10, prereqs: ['rel-frac'], icon: 'ℚ',
    title: 'Ensembles de nombres',
    desc: 'ℕ, ℤ, ℚ, ℝ : où vit chaque nombre ?',
    intro: {
      rule: '<b>ℕ</b> : 0, 1, 2… &nbsp; <b>ℤ</b> : aussi les entiers négatifs.<br><b>ℚ</b> : les quotients d\'entiers (3/7, 0,25). &nbsp; <b>ℝ</b> : aussi les irrationnels (√2, π).<br>On juge la valeur, pas l\'écriture : −12/4 = −3 est dans ℤ.',
      example: [{ math: '-12/4', note: '= −3 : dans ℤ' }],
    },
  },
  {
    id: 'ar-surd', unit: 'racines', year: 11, prereqs: ['ar-factor', 'root-squares'], icon: '6√2',
    title: 'Sortir un carré de la racine',
    desc: '√72 = √(36 × 2) = 6√2.',
    intro: {
      rule: 'On cherche le plus grand carré qui divise le nombre :<br>√72 = √(36 × 2) = √36 × √2 = <b>6√2</b>.<br>Tape-le avec la touche √ : 6√2.',
      example: [{ math: '√(36×2)', note: '= 6√2' }],
    },
  },
  {
    id: 'nb-irrational', unit: 'racines', year: 11, prereqs: ['nb-sets', 'root-estimate'], icon: 'π',
    title: 'Rationnel ou irrationnel ?',
    desc: '√49 = 7 est rationnel, √50 ne l\'est pas.',
    intro: {
      rule: 'Un nombre <b>irrationnel</b> ne s\'écrit pas comme un quotient d\'entiers : √2, √50, π.<br>Mais √49 = 7 et √(9/16) = 3/4 sont rationnels.',
      example: [{ math: '√49', note: '= 7 : rationnel' }],
    },
  },
  {
    id: 'nb-cube', unit: 'racines', year: 11, prereqs: ['root-squares', 'pow-sign'], icon: '∛',
    title: 'Racines cubiques',
    desc: '∛64 = 4, ∛(−8) = −2.',
    intro: {
      rule: '<b>∛64</b> est le nombre qui, au cube, donne 64 : 4³ = 64, donc ∛64 = 4.<br>Un cube garde le signe : (−2)³ = −8, donc ∛(−8) = <b>−2</b>.',
      example: [{ math: '4^3', note: '= 64' }],
    },
  },
  {
    id: 'root-frac', unit: 'racines', year: 11, prereqs: ['root-calc', 'frac-mul'], icon: '√⅔',
    title: 'Racines et fractions',
    desc: '√(9/16) = 3/4, puis dans des calculs.',
    intro: {
      rule: 'La racine porte sur toute la fraction : √(9/16) = √9 / √16 = <b>3/4</b>.<br>Dans un calcul, on la traite comme une puissance : avant × et ÷.',
      solve: '√(9/16)×(-2)^2',
    },
  },
];

// Calculations that mix the chapters above (content/melanges.js).
const MELANGES = [
  {
    id: 'mix-9', unit: 'melanges', year: 9, prereqs: ['rel-chain', 'frac-add-any', 'frac-mul-int', 'pow-def'], icon: '🧩',
    title: 'Calculs mélangés 9H',
    desc: 'Nombres relatifs, fractions et carrés dans un même calcul.',
    intro: {
      rule: 'Plusieurs chapitres dans un seul calcul : on garde les priorités.<br>D\'abord les parenthèses, puis les puissances, puis × et ÷, puis + et −.',
      solve: '4^2-(-3)',
    },
  },
  {
    id: 'mix-10', unit: 'melanges', year: 10, prereqs: ['mix-9', 'rel-frac', 'pow-sign'], icon: '🧩',
    title: 'Calculs mélangés 10H',
    desc: 'Fractions relatives et puissances de négatifs.',
    intro: {
      rule: 'Les règles des signes et des fractions se combinent. Avance une opération à la fois, dans l\'ordre des priorités.',
      solve: '(-1/2)^2+3/4×(-2)',
    },
  },
  {
    id: 'mix-11', unit: 'melanges', year: 11, prereqs: ['mix-10', 'root-frac', 'pow-frac'], icon: '🧩',
    title: 'Calculs mélangés 11H',
    desc: 'Tout ensemble : racines, exposants négatifs, fractions relatives.',
    intro: {
      rule: 'Racines et puissances passent avant × et ÷. Un exposant négatif donne l\'inverse.',
      solve: '(-1/2)^2-3/4×√(16/9)',
    },
  },
];

const UNIT_ORDER = UNITS.map((u) => u.id);
const ALL = [...CALCUL, ...FRACTIONS, ...RELATIFS, ...ARITHMETIQUE, ...PROPORTION, ...UNITES, ...PUISSANCES, ...RACINES, ...MELANGES];

// The global path: by school year, then unit, then map order.
export const SKILLS = ALL
  .map((s, i) => ({ s, i }))
  .sort((a, b) => a.s.year - b.s.year || UNIT_ORDER.indexOf(a.s.unit) - UNIT_ORDER.indexOf(b.s.unit) || a.i - b.i)
  .map(({ s }) => s);

// Skills of one unit, in map order.
export const unitSkills = (unitId) => ALL.filter((s) => s.unit === unitId);

export const SKILL_BY_ID = Object.fromEntries(SKILLS.map((s, i) => [s.id, { ...s, index: i }]));
export const skillIndex = (id) => SKILL_BY_ID[id].index;

// Swiss school years offered at profile creation.
export const YEARS = [
  { id: 5, label: '5H', age: '8-9 ans' },
  { id: 6, label: '6H', age: '9-10 ans' },
  { id: 7, label: '7H', age: '10-11 ans' },
  { id: 8, label: '8H', age: '11-12 ans' },
  { id: 9, label: '9H', age: '12-13 ans' },
  { id: 10, label: '10H', age: '13-14 ans' },
  { id: 11, label: '11H', age: '14-15 ans' },
  { id: 12, label: 'Gymnase', age: '15 ans et +' },
];

// The track question only makes sense in secondary I (9H-11H).
export const hasTrack = (year) => year >= 9 && year <= 11;

// Secondary I tracks (names vary by canton: A/B/C, VP/VG, LS/LC/CT...).
export const TRACKS = [
  { id: 'high', label: 'Exigences élevées', shift: 1 },
  { id: 'mid', label: 'Exigences moyennes', shift: 0 },
  { id: 'base', label: 'Exigences de base', shift: -1 },
  { id: 'unknown', label: 'Je ne sais pas', shift: 0 },
];

// Where the placement skim starts searching: the last skill usually met
// before the student's year.
export function skimStartIndex(year, trackId) {
  const shift = TRACKS.find((t) => t.id === trackId)?.shift ?? 0;
  const effective = year + (hasTrack(year) ? shift : 0);
  let idx = 0;
  SKILLS.forEach((s, i) => { if (s.year < effective) idx = i; });
  return idx;
}
