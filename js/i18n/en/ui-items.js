// English texts. See js/i18n.js.
// Exercise components (js/ui/*.js), their judges and checkers.

export default {
  // ---------- js/ui/exercises.js ----------
  'Erreur typique : <b>{wrong}</b> ✗ — juste : {right}.': 'Typical mistake: <b>{wrong}</b> ✗ — correct: {right}.',
  'Piège : {name}': 'Trap: {name}',
  'La correction': 'The correction',
  'Ta réponse': 'Your answer',
  "C'est juste ! Mais tu peux encore simplifier.": "That's right! But you can still simplify.",
  "écris l'équation suivante": 'write the next equation',
  '⧉ Recopier la ligne': '⧉ Copy the line',
  '💡 Indice': '💡 Hint',
  'Indice :': 'Hint:',
  '<p>Voilà cette étape. À toi pour la suite !</p>': "<p>Here is that step. Now it's your turn!</p>",
  "<p>Cette équation n'a plus les mêmes solutions. Fais <b>la même opération des deux côtés</b>.</p>": '<p>This equation no longer has the same solutions. Do <b>the same operation on both sides</b>.</p>',
  'Valider la ligne': 'Submit the line',
  '💡 Astuce': '💡 Tip',
  'Touche les parts pour les colorier.': 'Tap the parts to shade them.',
  'Touche la droite pour placer le point.': 'Tap the line to place the point.',
  'Tu as placé {x}.': 'You placed {x}.',
  'Touche le point sur le quadrillage.': 'Tap the point on the grid.',
  "Complète l'étape.": 'Complete the step.',
  'On calcule.': 'We compute.',
  'Pas tout à fait.': 'Not quite.',
  "Regarde bien l'opération.": 'Look carefully at the operation.',
  "Valider l'étape": 'Submit the step',
  "Touche l'opération à calculer en premier.": 'Tap the operation to compute first.',
  'résultat': 'result',
  "<p>C'est mieux, mais on peut encore simplifier.</p>": "<p>That's better, but it can still be simplified.</p>",
  "Ce n'est pas égal. Divise le numérateur et le dénominateur par un même nombre.": "That's not equal. Divide the numerator and the denominator by the same number.",
  "Ce n'est pas le bon résultat. Regarde bien l'opération.": "That's not the right result. Look carefully at the operation.",
  'Simplifie :': 'Simplify:',
  'Valider': 'Submit',
  'écris la ligne suivante': 'write the next line',
  '<p>Cette ligne est la même que la précédente : fais au moins un calcul.</p>': '<p>This line is the same as the previous one: do at least one calculation.</p>',
  "Cette ligne n'est plus égale à la précédente. Vérifie ton calcul.": 'This line is no longer equal to the previous one. Check your calculation.',
  '<p class="muted">Tu peux demander un indice.</p>': '<p class="muted">You can ask for a hint.</p>',
  "<p>C'est juste ! Simplifie encore pour finir.</p>": "<p>That's right! Simplify once more to finish.</p>",
  'Calcule {x}.': 'Compute {x}.',
  "Calcule d'abord {x}.": 'First compute {x}.',
  '{n} part sur {total}': '{n} part out of {total}',
  '{n} parts sur {total}': '{n} parts out of {total}',
  'Tu as colorié {n} part sur {total}.': 'You shaded {n} part out of {total}.',
  'Tu as colorié {n} parts sur {total}.': 'You shaded {n} parts out of {total}.',
  "{n} erreur d'association.": '{n} matching mistake.',
  "{n} erreurs d'association.": '{n} matching mistakes.',

  // ---------- js/ui/lines.js ----------
  'ta ligne': 'your line',
  '💡 Aide ({k}/{n})': '💡 Help ({k}/{n})',
  '💡 Aide': '💡 Help',
  '<p>Voilà cette ligne. À toi pour la suite !</p>': "<p>Here is that line. Now it's your turn!</p>",
  'case active': 'active box',
  'Touche une case pour la remplir.': 'Tap a box to fill it in.',
  'Remplis la case.': 'Fill in the box.',
  "Ce n'est pas la bonne règle ici.": "That's not the right rule here.",
  'Que fais-tu maintenant ?': 'What do you do now?',
  'La règle utilisée : {rule}': 'The rule used: {rule}',
  "Cette ligne n'est pas égale à la précédente.": 'This line is not equal to the previous one.',
  '<p class="muted">Tu peux demander une aide.</p>': '<p class="muted">You can ask for help.</p>',
  'Corriger': 'Fix it',
  'Continuer avec ma ligne': 'Continue with my line',

  // ---------- js/ui/keypad.js ----------
  'Les autres touches de la question': 'The other keys of the question',

  // ---------- js/ui/draft.js ----------
  '✓ vérifiée': '✓ checked',
  'brouillon (non vérifiée)': 'draft (not checked)',
  "<p>Écris d'abord la ligne dans le champ, puis ajoute-la.</p>": '<p>First write the line in the field, then add it.</p>',
  'Cette étape est fausse.': 'This step is wrong.',
  'Corrige-la dans le champ.': 'Fix it in the field.',
  'ta ligne suivante, ou ta réponse': 'your next line, or your answer',
  '＋ Ajouter une étape': '＋ Add a step',
  'Écris tes étapes ici : chacune est vérifiée.': 'Write your steps here: each one is checked.',
  'Écris tes étapes ici, au brouillon.': 'Write your steps here, as a draft.',

  // ---------- js/ui/problem.js ----------
  'Étape {n}': 'Step {n}',
  'Barème': 'Marking scheme',
  'Vérifier': 'Check',
  'Je passe cette étape': 'Skip this step',
  'Bonne réponse': 'Correct answer',
  'Score : {got} / {max}': 'Score: {got} / {max}',
  '{x} pts': '{x} pts',
  '{x} pt': '{x} pt',

  // ---------- js/ui/tokens.js ----------
  'Ta formule': 'Your formula',
  'touche les morceaux': 'tap the pieces',

  // ---------- js/ui/tf.js, js/ui/table-input.js ----------
  'Vrai': 'True',
  'Faux': 'False',
  'V': 'T',
  'F': 'F',
  'Valider le contre-exemple': 'Submit the counterexample',
  'Donne un contre-exemple.': 'Give a counterexample.',
  'Faux, oui. Donne un contre-exemple :': 'False, yes. Give a counterexample:',

  // ---------- js/ui/blocks.js ----------
  'ton calcul': 'your calculation',
  'Valider le calcul': 'Submit the calculation',
  "Ce n'est pas le bon choix.": "That's not the right choice.",

  // ---------- js/ui/table-input.js, js/ui/code-input.js ----------
  'Et maintenant :': 'And now:',
  '<p>Le tableau est juste.</p>': '<p>The table is right.</p>',
  '<p>Remplis toutes les cases.</p>': '<p>Fill in all the boxes.</p>',
  "<p>Les cases en rouge ne vont pas : chaque case se calcule à partir des cases d'avant.</p>": "<p>The boxes in red aren't right: each box is computed from the boxes before it.</p>",
  'Valider le tableau': 'Submit the table',

  // ---------- js/ui/matrix-input.js ----------
  // L1, L2 stay: the row operations are typed with L (« ligne »).
  'opération : L2 ← L2 − 3L1': 'operation: L2 ← L2 − 3L1',
  'ou écris la ligne': 'or write the line',
  'ligne {i}, colonne {j}': 'row {i}, column {j}',
  'Un vecteur par colonne.': 'One vector per column.',
  'Les composantes du vecteur.': 'The components of the vector.',
  'Taille :': 'Size:',
  '− ligne': '− row',
  '+ ligne': '+ row',
  '− colonne': '− column',
  '+ colonne': '+ column',
  'Appliquer': 'Apply',
  "Écrire l'opération": 'Write the operation',

  // ---------- js/ui/matrix-items.js ----------
  "C'est juste, mais ce n'est pas encore la réponse finale.": "That's right, but it's not the final answer yet.",
  "Ce n'est pas la bonne réponse.": "That's not the right answer.",

  // ---------- js/ui/plot.js ----------
  'touche un 2e point de la droite': 'tap a 2nd point of the line',
  'touche deux points de la droite': 'tap two points of the line',
  'touche le point': 'tap the point',
  '{label} : {action} (encore {n}).': '{label}: {action} ({n} left).',
  "{label} : placé. Touche un élément pour l'enlever.": '{label}: placed. Tap an element to remove it.',
  '<p class="muted">En vert : les éléments attendus, et la courbe.</p>': '<p class="muted">In green: the expected elements, and the curve.</p>',

  // ---------- js/ui/code-input.js ----------
  'Fonctions disponibles': 'Available functions',
  'trou {n}': 'blank {n}',
  '<p>Remplis tous les trous.</p>': '<p>Fill in all the blanks.</p>',
  '<p>Le programme passe tous les tests.</p>': '<p>The program passes all the tests.</p>',
  'Vérifier le programme': 'Check the program',

  // ---------- js/ui/calculator.js ----------
  'Calculatrice : 3/2 − (9/4 − 2)/3': 'Calculator: 3/2 − (9/4 − 2)/3',

  // ---------- js/ui/interpret.js ----------
  "<p>Ce n'est pas la bonne lecture.</p>": "<p>That's not the right reading.</p>",
  'Continuer': 'Continue',
  'Interpréter : quelle phrase est juste ?': 'Interpret: which sentence is right?',
  'Histogramme de la simulation': 'Histogram of the simulation',
  '🎲 Vérifier en simulant ({n} fois)': '🎲 Check by simulating ({n} times)',
  'fréquence observée <b>{f}</b> ({hits} parmi {n} tirages retenus)': 'observed frequency <b>{f}</b> ({hits} out of {n} draws kept)',
  'fréquence observée <b>{f}</b> ({hits} sur {n})': 'observed frequency <b>{f}</b> ({hits} out of {n})',
  '{freq} ; la probabilité calculée : <b>{p}</b>': '{freq}; the computed probability: <b>{p}</b>',
  '{label} : {text}': '{label}: {text}',
  'Une fréquence n’est pas une probabilité : elle s’en approche quand le nombre de tirages grandit (loi des grands nombres).': 'A frequency is not a probability: it gets closer to it as the number of draws grows (law of large numbers).',

  // ---------- js/ui/domain.js ----------
  'Il manque quelque chose.': 'Something is missing.',

  // ---------- js/judges/steps.js ----------
  "Je n'arrive pas à lire cette ligne.": "I can't read this line.",
  'Écris des équations, avec « = » ; sépare-les par « ; ».': 'Write equations, with “=”; separate them with “;”.',
  "C'est la même ligne : fais une transformation.": "It's the same line: make a transformation.",
  "La solution du système ne vérifie plus {eq} : cette ligne n'est pas une conséquence des équations.": "The solution of the system no longer satisfies {eq}: this line doesn't follow from the equations.",
  'Écris une égalité, avec « = ».': 'Write an equality, with “=”.',
  'Garde la lettre {v} dans ta ligne.': 'Keep the letter {v} in your line.',
  "Cette égalité n'est plus vraie avec la bonne valeur de {v} : une opération n'a pas été faite des deux côtés.": "This equality is no longer true with the right value of {v}: an operation wasn't done on both sides.",
  "Cette ligne n'a plus la même valeur que la précédente.": 'This line no longer has the same value as the previous one.',
  "C'est la même ligne : fais au moins un calcul.": "It's the same line: do at least one calculation.",
  "Écris d'abord une ligne.": 'Write a line first.',
  'Je ne peux pas vérifier cette ligne : elle reste au brouillon.': "I can't check this line: it stays as a draft.",

  // ---------- js/judges/lines.js, js/judges/common.js ----------
  "C'est terminé.": "It's finished.",
  "Je n'arrive pas à lire ta saisie.": "I can't read what you typed.",
  "Ce n'est pas ce qu'il faut ici.": "That's not what's needed here.",
  'Je ne connais pas la lettre « {x} » ici : la variable est {vars}.': 'I don\'t know the letter “{x}” here: the variable is {vars}.',

  // ---------- js/math/checkers.js ----------
  'Écris un produit de facteurs, par exemple 2^3×3×5.': 'Write a product of factors, for example 2^3×3×5.',
  "C'est égal, mais 1 n'est pas un nombre premier : enlève-le.": "It's equal, but 1 is not a prime number: remove it.",
  "C'est égal, mais {n} n'est pas premier : décompose-le encore.": "It's equal, but {n} is not prime: break it down further.",
  'Écris ta réponse sous la forme a√b, par exemple 6√2.': 'Write your answer in the form a√b, for example 6√2.',
  "C'est égal, mais on peut encore sortir un carré de √{r}.": "It's equal, but a square can still be taken out of √{r}.",
  'Écris un nombre, avec une virgule si besoin.': 'Write a number, with a decimal point if needed.',
  "Je n'arrive pas à lire cette expression.": "I can't read this expression.",
  "Écris seulement l'expression, sans « = ».": 'Write only the expression, without “=”.',
  "Je n'arrive pas à calculer cette expression.": "I can't compute this expression.",
  "C'est égal, mais développe et réduis encore : un seul terme de chaque sorte, sans parenthèses.": "It's equal, but expand and simplify further: one term of each kind, no brackets.",
  "C'est égal, mais ce n'est pas fini : {problem}": "It's equal, but it's not finished: {problem}",
  'Écris les solutions ainsi : x = … ; x = …': 'Write the solutions like this: x = … ; x = …',
  'Écris chaque solution sous la forme x = …': 'Write each solution in the form x = …',
  'x est encore des deux côtés : la solution ne doit dépendre que des paramètres.': 'x is still on both sides: the solution must depend only on the parameters.',
  "C'est juste, mais il manque une solution.": "That's right, but a solution is missing.",
  "C'est juste, mais il manque des solutions.": "That's right, but some solutions are missing.",
  'Écris une équation de la forme … = 0.': 'Write an equation of the form … = 0.',
  "Ramène tout du même côté : l'autre côté doit être 0.": 'Bring everything to the same side: the other side must be 0.',
  'Écris les solutions ainsi : x = 2 ; x = −1/3': 'Write the solutions like this: x = 2 ; x = −1/3',
  'Écris la réponse ainsi : x = 2 ; y = −1': 'Write the answer like this: x = 2 ; y = −1',
  'Écris ta réponse ainsi : {v} = …': 'Write your answer like this: {v} = …',
  "Il faut {v} tout seul d'un côté du « = ».": '{v} must be on its own on one side of the “=”.',
  '{v} est encore des deux côtés : regroupe les termes en {v}, puis mets {v} en évidence.': '{v} is still on both sides: group the terms in {v}, then factor out {v}.',
  "Écris l'expression comme un produit de facteurs.": 'Write the expression as a product of factors.',

  // ---------- js/math/judge.js ----------
  "Je n'arrive pas à lire cette écriture.": "I can't read what's written.",
  'Ce calcul est impossible (division par zéro ?).': 'This calculation is impossible (division by zero?).',
  "Je n'arrive pas à lire cette réponse.": "I can't read this answer.",
  'Ce calcul est impossible.': 'This calculation is impossible.',
  "C'est juste, mais termine le calcul.": "That's right, but finish the calculation.",
  'Écris ce nombre sous forme décimale.': 'Write this number as a decimal.',
  'Écris ce nombre sous forme de fraction.': 'Write this number as a fraction.',

  // ---------- js/math/equations.js ----------
  'Multiplie les deux membres par le dénominateur commun, pour enlever les fractions.': 'Multiply both sides by the common denominator, to clear the fractions.',
  "Développe d'abord les parenthèses.": 'First expand the brackets.',
  'Soustrais {k}x des deux côtés, pour rassembler les {x} à gauche.': 'Subtract {k}x from both sides, to gather the {x} terms on the left.',
  'Ajoute {k}x des deux côtés, pour rassembler les {x} à gauche.': 'Add {k}x to both sides, to gather the {x} terms on the left.',
  'Soustrais {k} des deux côtés.': 'Subtract {k} from both sides.',
  'Ajoute {k} des deux côtés.': 'Add {k} to both sides.',
  'Divise les deux côtés par {k}.': 'Divide both sides by {k}.',
  'Écris une équation complète, avec « = ».': 'Write a complete equation, with “=”.',
  'Cette équation est trop compliquée ici.': 'This equation is too complicated here.',
};
