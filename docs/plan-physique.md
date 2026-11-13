# Plan : la physique — énergie, puissance et la recette en 6 étapes

## 1. Le but

Faire travailler la **méthode** des problèmes de physique, pas seulement les formules. La méthode est celle de la classe (devoirs 1 à 3, diagnostic, examen) :

| Étape | Points | Ce qui rapporte les points |
|---|---|---|
| 1 Trier | 1 | les formules utiles, les données en SI, l'inconnue |
| 2 Chemin | 2 | la chaîne de formules, la grandeur-pont nommée |
| 3 Algèbre | 3 | l'inconnue isolée, une seule expression en lettres |
| 4 Unités | 1 | l'analyse dimensionnelle menée et conclue |
| 5 Approximation rapide | 1 | ordre de grandeur, un ou deux chiffres significatifs |
| 6 Nombres + verdict | 2 | le nombre, l'arrondi, le verdict |

La règle d'or « la calculatrice reste face contre table jusqu'à l'étape 6 » devient : **l'application ne montre aucun nombre calculé avant l'étape 6**, et c'est elle qui fait le calcul, à partir de l'algèbre de l'élève.

## 2. Décisions

- La physique est dans **la même carte** que les maths : de nouvelles unités, avec de vrais prérequis de maths (isoler une variable, conversions, notation scientifique).
- Années : dès la **10H** pour les énergies simples, **11H** pour la recette complète et les fourchettes.
- Contenu : les notions N1 à N15 du diagnostic, plus un module **Fourchettes (pire cas)** qui s'applique ensuite à tous les problèmes.
- Beaucoup de problèmes nouveaux : chaque situation se décline avec une autre inconnue et d'autres nombres.
- **Étape 1** : l'élève touche, dans une liste de formules, celles qui ont une grandeur en commun avec le problème. Plus tard, la feuille de formules est donnée avec des leurres, et l'élève retire ce qui ne sert pas. Retirer une formule nécessaire est refusé, avec la raison.
- **Étape 2** : un surligneur à 3 couleurs sur les lettres des formules gardées : **connue** (donnée), **inconnue** (cherchée), **pont** (partagée entre deux formules). On peut revenir à l'étape 1 à tout moment.
- Les étapes 1 et 2 répondent tout de suite, gentiment. Les étapes 3 à 5 restent silencieuses : aux niveaux 1-2 une erreur d'algèbre est signalée, au niveau 3 en quittant l'étape, aux niveaux 4-5 seulement à la fin.
- **Étape 6** : pas de phrase à écrire. L'application évalue l'expression de l'élève avec les données en SI, l'affiche à côté de son approximation, et l'élève valide ou revient corriger (approximation, algèbre, données). Puis il écrit le résultat arrondi, dans l'unité demandée.

## 3. Les unités

### A. Outils du physicien (`phys-outils`, 10H)

| Compétence | Notion | Exemple |
|---|---|---|
| ph-si | N1 : données « symbole = valeur unité » en SI | 180 cm, 3 min → h = 1,8 m, t = 180 s |
| ph-conv-chain | Conversions en produit de fractions où les unités se simplifient | 2 kWh = … J ; 4 t/h = … kg/s |
| ph-base-units | Unités dérivées en unités de base | 1 W = 1 kg·m²/s³ |
| ph-dimcheck | N13 : vérifier une formule par les unités ; la formule cassée | t = E/P, t = E·P, t = P/E ? |
| ph-unit-formula | L'usine à formules : de l'unité à la formule | joules par seconde → P = E/t |
| ph-isolate | N15 : isoler dans une formule de physique | E_c = ½ m v² → v |
| ph-estimate | N14 : ordre de grandeur, plausibilité | 2000 W pendant 3 min ≈ … kJ |

### B. Énergie et puissance (`energie`, 10H–11H)

Une compétence par notion, d'abord directe, puis « à l'envers » (une autre inconnue), puis enchaînée : ph-ep (N3), ph-ec (N4), ph-work (E = F·d), ph-power (N6, P = E/t, P = F·v), ph-elec-power (N7), ph-elec-energy (N8, Wh, Ah), ph-deltaT (N9), ph-heat (N10), ph-latent (N11), ph-mix (N12), ph-density (ρ = m/V), ph-efficiency (rendement), ph-conservation (N5).

### C. La recette en 6 étapes (`recette`, 11H)

Chaque étape s'entraîne d'abord seule, puis dans le problème complet :
ph6-trier, ph6-chemin, ph6-algebre (avec « qu'est-ce qui s'est simplifié, et qu'est-ce que ça veut dire ? »), ph6-unites, ph6-approx, ph6-verdict ; puis ph6-meca, ph6-thermo, ph6-elec, ph6-ouvert (feuille de données avec leurres, situations nouvelles).

### D. Fourchettes et pire cas (`incertitudes`, 11H)

rg-read (valeur ± incertitude), rg-ends (quelle extrémité donne le plus petit résultat : sous la barre de fraction, la plus grande), rg-compute, rg-digits (combien de chiffres la fourchette autorise), rg-conclude (peut-on conclure ?), rg-percent (incertitude relative), rg-in-problem (la fourchette comme dernière couche d'un problème en 6 étapes).

## 4. Les problèmes

Un problème est une **donnée**, pas du code : la situation, ses formules, ses grandeurs, ses cas (quelle grandeur on cherche), ses leurres. Le générateur choisit le cas, les nombres, les unités d'affichage (non SI aux niveaux élevés) et les leurres. Les tests vérifient chaque problème : la réponse satisfait les formules, les leurres ne servent pas, ce qui doit se simplifier se simplifie.

Situations de la classe : pomme de terre (Lune, Mars, Chasseral), luge, toboggan, charrue, vélo cargo, bouilloire, batterie, ascenseur, chute d'eau, pompe, tracteur, bloc de beurre, éolienne, chiens de traîneau, croissants, toit sous la pluie ; et d'autres sur les mêmes formules.

## 5. Les pièges

Classés comme dans la grille du diagnostic : **U** unité (minutes, grammes, centimètres non convertis ; km/h ; Wh sans 3600 ; facteur des aires et volumes ; +273 sur un écart), **F** formule (½ ou carré oubliés dans E_c, P = E·t, un leurre utilisé), **A** algèbre (isolation ratée, racine oubliée, masse non simplifiée), estimation fausse d'une puissance de 10, fourchettes (mêmes extrémités sous une fraction, trop de chiffres, conclure sur la valeur centrale), étapes 1-2 (formule nécessaire retirée, pont non marqué).

## 6. Ordre de construction

P1 cœur (unités, expressions, situations) et clavier → P2 unité A → P3 unité B → P4 l'exercice « recette » et les compétences d'étapes, premiers problèmes de mécanique → P5 problèmes thermiques, électriques, ouverts → P6 fourchettes → P7 anglais, relecture des exemples, test du navigateur.

Tout le texte passe par `t()` ; l'anglais est dans `js/i18n/en/physique.js` et `js/i18n/en/skills-physique.js`.
