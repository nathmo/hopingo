// The skill graph. Each unit lists its skills in map order. The global path
// (what "Continuer" follows, and what the placement skim searches) sorts all
// skills by `year`, the HarmoS year where the skill is usually met (track A
// earlier, track C later), keeping unit order for ties.

export const UNITS = [
  { id: 'calcul', title: 'Calcul mental', color: '#f08c00', ready: true },
  { id: 'fractions', title: 'Fractions', color: '#7c5cff', ready: true },
  { id: 'relatifs', title: 'Nombres relatifs', color: '#e8590c', ready: true },
  { id: 'puissances', title: 'Puissances', color: '#0ca678', ready: true },
  { id: 'racines', title: 'Racines carrées', color: '#1c7ed6', ready: true },
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
const ALL = [...CALCUL, ...FRACTIONS, ...RELATIFS, ...PUISSANCES, ...RACINES, ...MELANGES];

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
