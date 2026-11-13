// Physics traps of the unit « energie » (format: rules.js).

import { t } from '../../i18n.js';

const R = (id, family, tag, skill, repair, name, example, explain) => ({ id, family, tag, skill, repair, name, example, explain });

export default [
  R('ph_ep_forget_g', 'ph_formula', 'E', 'ph-ep', 'ph-ep',
    t('g oublié dans m g h'), ['E_p = m h', 'E_p = m g h'],
    () => t('Le poids d\'un objet de m kilogrammes vaut m·g newtons : c\'est lui qu\'on soulève. Sans g, on calcule des kg·m, pas des joules, et sur Terre le résultat est 10 fois trop petit.')),
  R('ph_height_altitude', 'ph_formula', 'E', 'ph-ep', 'ph-ep',
    t('Altitude prise pour la hauteur'), ['h = 1607 m', 'h = 1607 m − 890 m = 717 m'],
    () => t('Dans m g h, h est la hauteur dont on monte : altitude d\'arrivée moins altitude de départ. L\'altitude du sommet seule compterait toute la montée depuis le niveau de la mer.')),
  R('ph_ec_diff_square', 'ph_formula', 'E', 'ph-ec', 'ph-ec',
    t('Carré de la différence des vitesses'), ['½ m (v₂ − v₁)²', '½ m v₂² − ½ m v₁²'],
    () => t('L\'énergie à fournir est la différence des deux énergies cinétiques : ½ m v₂² − ½ m v₁². Ce n\'est pas ½ m (v₂ − v₁)² : passer de 10 à 20 m/s coûte trois fois plus que passer de 0 à 10 m/s.')),
  R('ph_deltaT_order', 'ph_formula', 'E', 'ph-deltaT', 'ph-deltaT',
    t('Écart pris à l\'envers'), [t('de 85 °C à 20 °C : ΔT = 65 K'), 'ΔT = 20 − 85 = −65 K'],
    () => t('ΔT = arrivée − départ, dans cet ordre. Quand ça refroidit, ΔT est négatif : son signe dit si la température monte ou descend.')),
  R('ph_heat_final_temp', 'ph_formula', 'E', 'ph-heat', 'ph-deltaT',
    t('Température finale au lieu de l\'écart'), ['E = m c · 100', 'E = m c · (100 − 20)'],
    () => t('Dans m c ΔT, ΔT est l\'écart de température : arrivée moins départ. Avec la température finale seule, on fait comme si l\'objet partait de 0 °C.')),
  R('ph_phase_forgotten', 'ph_method', 'E', 'ph-latent', 'ph-latent',
    t('Une étape oubliée'), ['E = m L_f', 'E = m L_f + m c ΔT'],
    () => t('Quand il se passe deux choses, il faut l\'énergie des deux : la glace fond d\'abord (m·L_f, à 0 °C), puis l\'eau obtenue se réchauffe (m·c·ΔT). De même, une luge lancée garde son énergie de départ en plus de celle de la pente.')),
  R('ph_speeds_added', 'ph_formula', 'E', 'ph-conservation', 'ph-conservation',
    t('Vitesses additionnées au lieu des énergies'), ['v = v₀ + √(2 g h)', 'v = √(v₀² + 2 g h)'],
    () => t('Ce sont les énergies qui s\'additionnent, pas les vitesses : ½ m v² = ½ m v₀² + m g h. La vitesse compte au carré : on additionne les v², puis on prend la racine.')),
  R('ph_ah_as_energy', 'ph_units', 'E', 'ph-elec-energy', 'ph-elec-energy',
    t('Ampèreheures pris pour une énergie'), [t('50 Ah > 25 Ah, donc plus d\'énergie'), '12 V · 50 Ah = 600 Wh = 24 V · 25 Ah'],
    () => t('Les Ah mesurent une charge, pas une énergie. L\'énergie stockée est U·Q : il faut multiplier par la tension pour obtenir des Wh.')),
];
