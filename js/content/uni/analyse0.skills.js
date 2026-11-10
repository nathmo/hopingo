// Module G6, analyse de base (unit `analyse0`). Catalogue:
// docs/universite/G-gymnase-2.md, section G6. The pilot g6-deriv-rules was
// built at step U0; the other skills at step U2, in three parts whose
// definitions and generators are in analyse0-a, analyse0-b, analyse0-c
// (.skills.js and .js). Year 12 and 12.5: needsSolo true (catalogue
// convention: every G skill ends with a problem done alone).
//
// Prerequisites of the catalogue resolved to the school skills:
// @alg:G-simplifier = rat-simplify, @alg:H-discriminant = quad-formula,
// @alg:E-systemes-2x2 = eq-systems, @alg:D-factoriser-completement =
// fac-complete (credit only). g4-line2 (module G4, step U5) goes through
// UNBUILT (js/content/uni/index.js).

import { SKILLS as PART_A } from './analyse0-a.skills.js';
import { SKILLS as PART_B } from './analyse0-b.skills.js';
import { SKILLS as PART_C } from './analyse0-c.skills.js';

export const UNIT = { id: 'analyse0', title: 'Analyse de base', color: '#1098ad', ready: true };

const PILOT = {
  id: 'g6-deriv-rules', unit: 'analyse0', year: 12, prereqs: ['g6-deriv-usual', 'g1-compose'], icon: '(uv)′',
  title: 'Règles de dérivation : produit, quotient, chaîne',
  desc: '(uv)′, (u/v)′ et (f∘g)′, une règle à la fois.',
  tags: [], optional: false, examWeight: 2,
  // Level 5 is « sans aide » in the catalogue: mastery waits for it.
  needsSolo: true,
  exam: ['mcq', 'tf', 'coef', 'open'],
  prereqWhy: {
    'g6-deriv-usual': 'la table des dérivées usuelles donne u′, v′ et f′',
    'g1-compose': 'repérer les couches f∘g pour la règle de chaîne',
  },
  intro: {
    rule: '<b>Produit</b> : (uv)′ = u′v + uv′.<br><b>Quotient</b> : (u/v)′ = (u′v − uv′)/v².<br><b>Chaîne</b> : (f∘g)′ = f′(g)·g′.<br>On dérive de l\'extérieur vers l\'intérieur, et chaque couche multiplie par la dérivée de ce qu\'elle contient. Tu écris d(…) ou (…)′ pour une dérivée pas encore calculée.',
    lines: [
      { cas: 'd(x^2×sin(3x))', note: 'Départ' },
      { cas: 'd(x^2)×sin(3x)+x^2×d(sin(3x))', note: 'Règle du produit' },
      { cas: '2x×sin(3x)+x^2×cos(3x)×d(3x)', note: 'Table, puis règle de chaîne' },
      { cas: '2x×sin(3x)+3x^2×cos(3x)', note: 'Simplifier' },
    ],
  },
};

// Catalogue order: g6-deriv-usual (part a), the pilot, then the rest.
export const SKILLS = [PART_A[0], PILOT, ...PART_A.slice(1), ...PART_B, ...PART_C];
