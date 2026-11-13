// Physics traps (docs/error-catalogue.md, section « Physique »). Same shape
// as the answer rules of js/math/malrules.js, which adds them to RULES.
// Families follow the error codes of the class diagnostic: U unit,
// F formula, A algebra; plus estimation and ranges.
// Tags: E = classroom experience (to be checked by a teacher), R = research.

import { t } from '../../i18n.js';
import OUTILS from './rules-outils.js';
import ENERGIE from './rules-energie.js';
import INCERTITUDES from './rules-incertitudes.js';

export const PHYS_FAMILIES = {
  ph_units: { name: 'Unités (U)', hint: 'Avant de calculer, chaque donnée en SI : kg, m, s, K. La formule ne prévient pas.' },
  ph_formula: { name: 'Formule (F)', hint: 'Vérifie la formule par les unités : si elles sont fausses, la formule l\'est aussi.' },
  ph_algebra: { name: 'Isolation (A)', hint: 'Défais les opérations dans l\'ordre inverse, la même chose des deux côtés, que des lettres.' },
  ph_estimate: { name: 'Ordre de grandeur', hint: 'Arrondis brutalement et calcule de tête : une réponse fausse l\'est souvent d\'un facteur 10.' },
  ph_range: { name: 'Fourchettes', hint: 'Calcule deux fois : le plus petit résultat, puis le plus grand. Sous une barre de fraction, tout s\'inverse.' },
  ph_method: { name: 'La recette', hint: 'Une étape à la fois : trier, chemin, algèbre, unités, approximation, nombres.' },
};

const R = (id, family, tag, skill, repair, name, example, explain) => ({ id, family, tag, skill, repair, name, example, explain });

export const PHYS_RULES = [
  // ---------- U : unités ----------
  R('ph_not_si', 'ph_units', 'E', 'ph-si', 'ph-si',
    t('Donnée pas convertie en SI'), [t('t = 3 min → P = E/3'), t('t = 180 s → P = E/180')],
    () => t('Une formule de physique attend des unités SI : des kilogrammes, des mètres, des secondes. Avec des minutes, des grammes ou des centimètres, elle donne un nombre faux qui a l\'air raisonnable. Convertis à l\'étape 1, avant tout calcul.')),
  R('ph_gram_as_kg', 'ph_units', 'E', 'ph-si', 'u-mass',
    t('Grammes utilisés comme des kilogrammes'), ['450 g → m = 450', 'm = 0,45 kg'],
    () => t('450 g, c\'est 0,45 kg : on divise par 1000. Garder 450 donne un résultat mille fois trop grand.')),
  R('ph_kmh_not_converted', 'ph_units', 'E', 'ph-conv-chain', 'u-speed',
    t('km/h pas converti en m/s'), ['v = 72 km/h → E_c = ½·m·72²', 'v = 20 m/s'],
    () => t('Les formules veulent des m/s. 72 km/h = 72 000 m en 3600 s = 20 m/s : on divise par 3,6.')),
  R('ph_wh_forget_3600', 'ph_units', 'E', 'ph-elec-energy', 'ph-conv-chain',
    t('Wh pris pour des joules'), ['500 Wh = 500 J', '500 Wh = 1 800 000 J'],
    () => t('1 Wh, c\'est 1 W pendant une heure : 1 J/s × 3600 s = 3600 J. Les Wh se multiplient par 3600 pour passer en joules.')),
  R('ph_deltaT_add_273', 'ph_units', 'R', 'ph-deltaT', 'ph-deltaT',
    t('273 ajouté à un écart de température'), ['ΔT = 80 °C = 353 K', 'ΔT = 80 °C = 80 K'],
    () => t('On ajoute 273 pour passer d\'une température en °C à une température en K. Mais un écart de 1 °C est un écart de 1 K : un ΔT ne change pas.')),
  R('ph_minutes_decimal', 'ph_units', 'E', 'ph-si', 'u-time',
    t('Minutes lues comme une partie décimale'), ['1 h 30 = 1,30 h', '1 h 30 = 1,5 h = 5400 s'],
    () => t('Une heure a 60 minutes, pas 100 : 30 min = 0,5 h. Le plus sûr est de tout mettre en secondes.')),

  // ---------- F : formules ----------
  R('ph_ec_forget_half', 'ph_formula', 'E', 'ph-ec', 'ph-ec',
    t('½ oublié dans l\'énergie cinétique'), ['E_c = m v²', 'E_c = ½ m v²'],
    () => t('L\'énergie cinétique est ½·m·v² : sans le ½, le résultat est deux fois trop grand.')),
  R('ph_ec_forget_square', 'ph_formula', 'E', 'ph-ec', 'ph-ec',
    t('Vitesse pas mise au carré'), ['E_c = ½ m v', 'E_c = ½ m v²'],
    () => t('La vitesse compte au carré : ½·m·v². Une vitesse doublée donne une énergie quatre fois plus grande. Les unités le disent aussi : kg·m/s n\'est pas un joule.')),
  R('ph_power_times', 'ph_formula', 'E', 'ph-power', 'ph-power',
    t('P = E × t au lieu de E / t'), ['P = E·t', 'P = E/t'],
    () => t('La puissance est l\'énergie par seconde : on divise par le temps. Les unités le disent : J/s = W, alors que J·s n\'est pas un watt.')),
  R('ph_elec_divide', 'ph_formula', 'E', 'ph-elec-power', 'ph-elec-power',
    t('P = U / I au lieu de U × I'), ['P = U/I', 'P = U·I'],
    () => t('La puissance électrique est le produit de la tension et du courant : P = U·I. U/I est une résistance, en ohms.')),
  R('ph_heat_forget_mass', 'ph_formula', 'E', 'ph-heat', 'ph-heat',
    t('Masse oubliée dans m c ΔT'), ['E = c ΔT', 'E = m c ΔT'],
    () => t('c est l\'énergie pour 1 kg et 1 K : pour m kilogrammes, il en faut m fois plus. E = m·c·ΔT.')),
  R('ph_density_inverted', 'ph_formula', 'E', 'ph-density', 'ph-density',
    t('Masse volumique à l\'envers'), ['ρ = V/m', 'ρ = m/V'],
    () => t('La masse volumique est la masse d\'un mètre cube (ou d\'un litre) : kg par m³, donc m/V.')),
  R('ph_efficiency_inverted', 'ph_formula', 'E', 'ph-efficiency', 'ph-efficiency',
    t('Rendement appliqué à l\'envers'), ['E_f = η E_u', 'E_f = E_u/η'],
    () => t('Le rendement est plus petit que 1 : il faut fournir plus d\'énergie qu\'on n\'en récupère. E_u = η·E_f, donc E_f = E_u/η.')),
  R('ph_mix_average', 'ph_formula', 'R', 'ph-mix', 'ph-mix',
    t('Moyenne des températures sans les masses'), ['1 kg à 90 °C + 4 kg à 20 °C → 55 °C', '34 °C'],
    () => t('La température finale est plus proche de celle de la plus grande masse : l\'énergie perdue par le chaud est gagnée par le froid, masse comprise.')),
  R('ph_latent_temperature', 'ph_formula', 'R', 'ph-latent', 'ph-latent',
    t('La température monte pendant la fusion'), [t('le glaçon fond, donc il chauffe'), t('pendant la fusion, il reste à 0 °C')],
    () => t('Pendant qu\'il fond, un glaçon reste à 0 °C : toute l\'énergie sert à casser la glace, pas à monter la température.')),
  R('ph_heavier_faster', 'ph_formula', 'R', 'ph-conservation', 'ph-conservation',
    t('Plus lourd, plus rapide'), [t('le sac de 50 kg arrive plus vite'), t('même vitesse : m se simplifie')],
    () => t('Dans m·g·h = ½·m·v², la masse est des deux côtés : elle se simplifie. Sans frottement, léger ou lourd, on arrive à la même vitesse.')),
  R('ph_decoy_formula', 'ph_method', 'E', 'ph6-trier', 'ph6-trier',
    t('Formule qui ne relie rien'), [t('E = m c ΔT gardée pour une luge'), t('aucune température dans l\'énoncé')],
    () => t('Une formule ne sert que si elle relie ce que tu connais à ce que tu cherches. Si une de ses lettres n\'est ni donnée, ni cherchée, ni dans une autre formule, elle ajoute une inconnue sans rien donner.')),
  R('ph_needed_removed', 'ph_method', 'E', 'ph6-chemin', 'ph6-trier',
    t('Formule nécessaire retirée'), [t('E = m g h retirée'), t('c\'est elle qui donne le pont E')],
    () => t('Le chemin va de ce que tu connais à ce que tu cherches. Si tu retires une formule du chemin, il est coupé.')),
  R('ph_bridge_missed', 'ph_method', 'E', 'ph6-chemin', 'ph6-chemin',
    t('Grandeur-pont pas reconnue'), [t('E notée comme donnée'), t('E est le pont : personne ne la donne')],
    () => t('Le pont est la grandeur que personne ne demande et que personne ne donne, mais qui apparaît dans deux formules : c\'est par elle qu\'on passe.')),

  // ---------- A : algèbre ----------
  R('ph_iso_flip', 'ph_algebra', 'E', 'ph-isolate', 'iso-formula',
    t('Fraction retournée en isolant'), ['h = g/(c ΔT)', 'h = c ΔT/g'],
    () => t('Pour défaire « × g », on divise par g : g passe au dénominateur, pas le reste. Vérifie par les unités : ton expression doit donner des mètres.')),
  R('ph_forget_sqrt', 'ph_algebra', 'E', 'ph-isolate', 'root-eq',
    t('Racine oubliée'), ['v = 2 g h', 'v = √(2 g h)'],
    () => t('Si v² = 2gh, alors v = √(2gh) : il faut défaire le carré. Les unités le montrent : 2gh est en m²/s², pas en m/s.')),
  R('ph_numbers_in_algebra', 'ph_algebra', 'E', 'ph6-algebre', 'ph6-algebre',
    t('Nombres dans l\'étape d\'algèbre'), ['h = 3500 · 80 / 1,6', 'h = c ΔT/g'],
    () => t('L\'étape 3 ne contient que des lettres : c\'est ce qui montre ce qui se simplifie, et une erreur de calcul au début n\'empoisonne pas tout le reste. Les nombres viennent à l\'étape 6.')),
  R('ph_not_simplified', 'ph_algebra', 'E', 'ph6-algebre', 'ph6-algebre',
    t('Lettre qui devait se simplifier'), ['h = m c ΔT/(m g)', 'h = c ΔT/g'],
    () => t('Une lettre présente en haut et en bas se simplifie. Et quand elle disparaît, c\'est une information : le résultat n\'en dépend pas.')),
  R('ph_units_lie', 'ph_algebra', 'E', 'ph6-unites', 'ph-dimcheck',
    t('Unités « vérifiées » sans les calculer'), [t('[v] = m/s ✓ pour v = 2 g h'), t('[2 g h] = m²/s² ✗')],
    () => t('L\'étape 4 sert à attraper les erreurs d\'algèbre. Remplace vraiment chaque lettre par son unité et simplifie : si on écrit l\'unité attendue sans la calculer, elle ne peut plus rien attraper.')),

  // ---------- ordre de grandeur ----------
  R('ph_estimate_power10', 'ph_estimate', 'E', 'ph-estimate', 'ph-estimate',
    t('Approximation fausse d\'une puissance de 10'), ['3500 × 80 ≈ 30 000', '3500 × 80 ≈ 300 000'],
    () => t('Compte les zéros à part : 3500 × 80 ≈ 4·10³ × 8·10¹ = 32·10⁴ ≈ 3·10⁵.')),
  R('ph_verdict_ignored', 'ph_estimate', 'E', 'ph6-verdict', 'ph6-approx',
    t('Écart avec l\'approximation ignoré'), [t('approximation 2·10⁵, calcul 2·10³ : « cohérent »'), t('facteur 100 : une des deux est fausse')],
    () => t('Si le calcul et l\'approximation diffèrent de plus d\'un facteur 2 ou 3, l\'une des deux est fausse. C\'est tout l\'intérêt de l\'étape 5 : trouve laquelle avant de répondre.')),
  R('ph_too_many_digits', 'ph_estimate', 'E', 'rg-digits', 'rg-digits',
    t('Trop de chiffres'), ['h = 175 239,826 m', 'h ≈ 1,8·10⁵ m'],
    () => t('Les données ont 2 ou 3 chiffres : le résultat n\'en a pas plus. Écrire tous les chiffres de la calculatrice n\'est pas plus précis, c\'est moins honnête.')),

  // ---------- fourchettes ----------
  R('rg_same_ends', 'ph_range', 'E', 'rg-ends', 'rg-ends',
    t('Mêmes extrémités sous une fraction'), ['v_min = d_min/t_min', 'v_min = d_min/t_max'],
    () => t('Une grandeur sous la barre de fraction agit à l\'envers : c\'est sa plus grande valeur qui donne le plus petit résultat.')),
  R('rg_conclude_middle', 'ph_range', 'E', 'rg-conclude', 'rg-conclude',
    t('Conclure sur la valeur du milieu'), [t('1,02 > 1,00, donc ça coule'), t('0,94 à 1,10 : on ne peut pas conclure')],
    () => t('On conclut seulement si toute la fourchette est du même côté. Si la valeur limite est dans la fourchette, on ne peut pas trancher.')),
  R('rg_percent_absolute', 'ph_range', 'E', 'rg-percent', 'rg-percent',
    t('Incertitudes comparées sans pourcentage'), [t('± 1 g < ± 5 mL, donc la masse est meilleure'), t('comparer 1/180 et 5/176')],
    () => t('On ne compare pas des grammes et des millilitres : on compare des pourcentages. L\'incertitude relative est l\'incertitude divisée par la valeur.')),
  R('rg_half_width', 'ph_range', 'E', 'rg-read', 'rg-read',
    t('Incertitude comptée une seule fois'), ['400 ± 20 → de 400 à 420', 'de 380 à 420'],
    () => t('« ± 20 » veut dire 20 de moins et 20 de plus : la fourchette va de 380 à 420.')),
  // Traps written with the generators of each unit.
  ...OUTILS, ...ENERGIE, ...INCERTITUDES,
];
