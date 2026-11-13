// Physics traps of the unit « incertitudes » (format: rules.js).

import { t } from '../../i18n.js';

const R = (id, family, tag, skill, repair, name, example, explain) => ({ id, family, tag, skill, repair, name, example, explain });

export default [
  R('rg_central_value', 'ph_range', 'E', 'rg-compute', 'rg-ends',
    t('Valeurs du milieu au lieu des extrémités'), ['v_min = 400/80', 'v_min = 380/84'],
    () => t('Avec les valeurs du milieu, on obtient le résultat du milieu, pas une borne. Pour la plus petite valeur, chaque donnée prend l\'extrémité qui rend le résultat le plus petit.')),
  R('rg_full_width', 'ph_range', 'E', 'rg-read', 'rg-read',
    t('Largeur entière prise pour l\'incertitude'), [t('entre 380 et 420 → ± 40'), t('entre 380 et 420 → 400 ± 20')],
    () => t('L\'incertitude va du milieu jusqu\'à une borne : c\'est la moitié de la largeur de la fourchette.')),
  R('rg_percent_fraction', 'ph_range', 'E', 'rg-percent', 'rg-percent',
    t('Facteur 100 du pourcentage oublié'), ['1/180 = 0,0056 %', '1/180 = 0,0056 = 0,56 %'],
    () => t('Un pourcentage, c\'est « sur 100 » : 0,0056 = 0,56 %. Pour passer d\'une fraction à des %, on multiplie par 100 ; pour prendre 2 % d\'une valeur, on multiplie par 0,02.')),
];
