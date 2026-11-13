// Physics traps of the unit « outils » (format: rules.js).

import { t } from '../../i18n.js';

const R = (id, family, tag, skill, repair, name, example, explain) => ({ id, family, tag, skill, repair, name, example, explain });

export default [
  R('ph_chain_half', 'ph_units', 'E', 'ph-conv-chain', 'ph-conv-chain',
    t('Une seule des deux unités convertie'), ['4 t/h = 4000 kg/h', '4 t/h = 4000 kg / 3600 s ≈ 1,1 kg/s'],
    () => t('Dans une unité composée, chaque unité se convertit : celle du haut et celle du bas. Écris une fraction qui vaut 1 pour chacune, et vérifie que tout se simplifie sauf l\'unité voulue.')),
  R('ph_unit_power_lost', 'ph_units', 'E', 'ph-base-units', 'ph-base-units',
    t('Exposant perdu dans les unités'), ['1 J = 1 N·m = 1 kg·m/s²', '1 J = 1 kg·m/s² · m = 1 kg·m²/s²'],
    () => t('Les unités se multiplient comme des lettres : m · m = m², s · s = s². Remplace chaque unité par sa définition, puis compte les exposants.')),
  R('ph_watt_is_joule', 'ph_units', 'E', 'ph-base-units', 'ph-base-units',
    t('Watt et joule confondus'), ['1 W = 1 kg·m²/s²', '1 W = 1 J/s = 1 kg·m²/s³'],
    () => t('Le joule est une énergie, le watt une énergie par seconde : 1 W = 1 J/s. Il y a une seconde de plus au dénominateur.')),
  R('ph_dim_not_checked', 'ph_formula', 'E', 'ph-dimcheck', 'ph-dimcheck',
    t('Formule choisie sans vérifier les unités'), ['t = E·P', 't = E/P : J/W = J/(J/s) = s'],
    () => t('Remplace chaque lettre par son unité et simplifie : si ce qui reste n\'est pas l\'unité de la grandeur cherchée, la formule est fausse, sans rien calculer.')),
  R('ph_per_inverted', 'ph_formula', 'E', 'ph-unit-formula', 'ph-unit-formula',
    t('« Par » mis à l\'envers'), [t('kilogrammes par litre → V/m'), t('kilogrammes par litre → m/V')],
    () => t('« Par » veut dire « divisé par » : ce qui vient avant « par » est en haut, ce qui vient après est en bas.')),
  R('ph_per_and_numerator', 'ph_formula', 'E', 'ph-unit-formula', 'ph-unit-formula',
    t('« Et par » mis au numérateur'), [t('kg par boulanger et par jour → m·N/t'), 'm/(N·t)'],
    () => t('Chaque « par » envoie la grandeur sous la barre : « par boulanger et par jour », c\'est diviser par le nombre de boulangers et par la durée.')),
  R('ph_half_inverted', 'ph_algebra', 'E', 'ph-isolate', 'iso-formula',
    t('½ défait du mauvais côté'), ['E_c = ½ m v² → m = E_c/(2 v²)', 'm = 2 E_c/v²'],
    () => t('Pour défaire « × ½ », on multiplie les deux côtés par 2 : le 2 arrive en haut, du côté de E_c. Vérifie avec des nombres simples.')),
];
