# Hopingo — le calcul en jouant

A Duolingo-style practice app for mental arithmetic and times tables, fractions, signed numbers, powers and square roots (HarmoS 5H–11H and gymnase, French). It is fully static, with no server: everything runs in the browser and progress is saved in `localStorage`.

## Run it

ES modules don't load from `file://`, so serve the folder:

```sh
npm run serve        # python -m http.server 8080, then open http://localhost:8080
npm test             # math core, content generators, learner engine
npm run samples      # writes docs/samples-<unit>.md for content review
```

There are no dependencies and no build step.

## Deploy on GitHub Pages

Push the folder to a repository, then go to **Settings → Pages → Deploy from a branch** and pick `main` / root. `.nojekyll` makes Pages serve the files as they are.

## How it works

| Piece | File | What it does |
|---|---|---|
| Exact math | `js/math/rational.js`, `expr.js` | Exact rationals. Parses keypad text, where `/` is the fraction bar, `^` an exponent and `√` a root. √2 × √8 and (√7)² are evaluated exactly. |
| Solver | `js/math/solver.js` | Canonical step-by-step solutions (signs, powers, roots included), used for guided blanks, hints and worked examples. |
| Mistakes | `js/math/malrules.js`, `diagnose.js` | Known errors (« pièges ») as rules. A wrong line is replayed under each rule, and under misreadings of its structure (priorities, brackets, −3² vs (−3)², √(a+b) = √a + √b…), to name the mistake. |
| Judge | `js/math/judge.js` | A line is valid if it keeps the exact value of the previous one, so any method is accepted. |
| Skills | `js/content/skills.js` | The skill graph: 136 skills in 18 units, prerequisites, intro cards, HarmoS year. The path follows the school year across units. |
| Questions | `js/content/items.js` and one file per unit: `calcul.js`, `fractions.js`, `relatifs.js`, `puissances.js`, `racines.js`, `arithmetique.js`, `proportion.js`, `algebre.js`, `equations.js`, `fonctions.js`, `seconddegre.js`, `melanges.js` (merged in `generators.js`) | One generator per skill, 5 levels each. Records which traps each question can catch. |
| Algebra | `js/math/algebra.js`, `checkers.js` | Expressions with letters: parser (3x, 2(x+1), x^2), exact polynomials and rational fractions, equivalence (numeric probing when a root appears), and form checks: « développé réduit », « factorisé (complètement) ». The checker says what is left to do and names the trap. |
| Equations | `js/math/equations.js` | Solution sets (degree ≤ 2, forbidden values removed), judging an equation line by line (same solutions = valid line), the next move for hints, and the classic wrong moves to name the mistake. |
| Learner | `js/engine/learner.js` | Mastery estimate per skill (Bayesian knowledge tracing), difficulty ladder, repair of prerequisites, spaced review, traps. |
| Facts | `js/engine/facts.js` | Memory of single number facts (7 × 8, 13²): a Leitner box per fact. A fact is automatic once answered right and fast twice. |
| Lessons | `js/engine/session.js` | Picks each question as you go: path, reviews, traps, mistakes again at the end. |
| Placement | `js/engine/placement.js` | Quick binary-search skim from the student's year and track. |
| Rewards | `js/engine/rewards.js` | XP, daily goal, streak with freezes, badges. |

**Adapting to the student:**
- **Difficulty:** each skill has a level from 1 to 5. Two fast correct answers move it up a level. Two mistakes, or three slow answers, move it down. "Slow" is measured against the student's own pace on that skill.
- **Regression:** failing again at level 1 sends practice to the weakest prerequisite, marked 🧱/🩹 on the map, until that skill is solid.
- **Spaced review:** mastered skills come back for review, and the interval ×2.5 after each success. Skills skipped by the placement skim are due right away, so the reviews confirm them.
- **Traps:** a mistake becomes a trap after it happens twice. It is beaten by answering the questions that bait it correctly on 3 different days.

**Fast series** (times tables, sums to 20, squares, mental ± ):
- 15 short questions, no "Vérifier": the answer is judged as soon as it has enough digits, and a right answer moves straight on.
- The response time is measured but never shown. A fact counts as automatic when it is right in about 3 seconds.
- Each fact has its own spaced memory. A series mixes about 70 % known facts with a few new or fragile ones, and a missed fact comes back two questions later.
- A mistake shows the full fact, the trap with the question's own numbers, and a strategy (9 × 6 = 60 − 6).

**Step-by-step modes** (multi-step skills and the operation skills of every unit):
- **Guided:** fill in the new numbers of each canonical step. A new negative number is one blank, sign included.
- **Tap then solve:** tap the operation to do next (an operator, an exponent or a root sign). Tapping the wrong one is caught as a priority mistake.
- **Free lines:** rewrite the expression line by line, with "Recopier la ligne" and hints.

## Content

The research behind the mistakes and the skill order is in `docs/error-catalogue.md`. Example questions for review are in `docs/samples-calcul.md`, `samples-fractions.md`, `samples-relatifs.md`, `samples-puissances.md`, `samples-racines.md`, `samples-arithmetique.md`, `samples-proportion.md`, `samples-unites.md`, `samples-algebre.md`, `samples-factorisation.md`, `samples-equations.md`, `samples-formules.md`, `samples-fonctions.md`, `samples-second.md`, `samples-rationnelles.md`, `samples-synthese.md`, `samples-geometrie.md` and `samples-melanges.md`.

| Unit | Skills | Years |
|---|---|---|
| Calcul mental | 14: sums and differences to 20, ± 1 and 2 digits, times tables 2–12 and divisions, squares to 25², rounding, estimating, clever calculation | 5H–8H |
| Fractions | 16, from reading a fraction to multi-step calculations | 6H–10H |
| Nombres relatifs | 8: number line, compare, +, −, sums, × and ÷, priorities, signed fractions | 9H–10H |
| Puissances | 6: definition, priorities, signs, powers of 10, exponent rules, scientific notation | 9H–11H |
| Racines carrées | 5: perfect squares, estimating, calculating, x² = a, products of roots | 10H–11H |
| Diviseurs et nombres premiers | 6: divisibility rules, multiples and divisors, primes, prime factorisation (typed as 2^3×3^2×5), GCD and LCM, fractions with them. Also new: decimal ↔ fraction ↔ percent (fractions unit), number sets, rational or irrational, cube roots and √72 = 6√2 (roots unit) | 9H–11H |
| Proportionnalité et pourcentages | 10: proportional or not (including the illusion of linearity), rule of three, scales, percent of, which percent, increase and decrease, back to the start value, successive percentages, average speed, slope | 9H–11H |
| Grandeurs et unités | 8: lengths, masses and capacities, durations, areas, volumes, speeds, feet and inches (the factor must be squared or cubed, answers rounded and checked within the precision asked), scientific notation with units | 6H–11H |
| Calcul littéral | 9: value of an expression, writing an expression from words, « Égal ou pas ? » (fast), reduce, multiply monomials, distributivity, double distributivity, identities, expand-reduce-order | 9H–11H |
| Factorisation | 6: common factor, common bracket, identities backwards, x² + bx + c, ax² + bx + c (gymnase), factorise completely | 11H–Gym |
| Équations | 10: meaning of « = », one-step, two-step, unknown on both sides, brackets, cross product, fractions, word problems, zero product, 2×2 systems. Equations are solved line by line: each line must keep the same solutions; at low levels the move is shown (« Soustrais 5 des deux côtés »). | 10H–11H |
| Isoler une variable | 1 skill, 5 levels: d = vt → t, P = 2(L + l) → l, A = (B + b)h/2 → h, A = πr² → r, E = ½mv² → v, ax + b = cx → x, physics formulas. The keypad shows the letters of the formula. | 11H |
| Fonctions | 7: read a graph, tables of values, place a point (tap on a grid), linear functions, affine functions (which graph? four small graphs as options), from the graph to y = ax + b, intersection of two lines. Graphs are SVG markup built by `js/math/graph.js`. | 9H–11H |
| Équations du 2e degré | 7: x² = k (including no solution), (x − p)² = k, solving by factorising, discriminant and formula (irrational solutions typed with √), choosing the method, completing the square, biquadratic equations | 11H–Gym |
| Fractions rationnelles | 4: forbidden values, simplifying (factor first, never cancel terms), operations, rational equations (remove forbidden solutions) | Gym |
| Synthèse : paramètres | 3: linear equations with parameters, quadratics with parameters, and the final problem ax² + bx/(3cx) = (6x + 2)² in five steps (domain, simplify, identity, … = 0, formula with Δ). Solutions with letters are checked at random values of the parameters. | Gym |
| Géométrie calculée | 6: areas, volumes, Pythagoras, enlarging (k, k², k³), Thalès and similar figures, missing length | 9H–11H |
| Calculs mélangés | 3 (9H, 10H, 11H): one expression mixing signed numbers, fractions, powers and roots. Also new: powers of fractions with negative exponents ((2/3)⁻² = 9/4) and roots of fractions (√(9/16) × (−2)²) | 9H–11H |

Square roots stay exact: questions only use roots that come out whole or rational (√49, √(9/16), √2 × √8). Simplifying √50 = 5√2 is not covered.

To add a skill:
1. Add it to its unit's list in `js/content/skills.js`, with its year, prerequisites and intro.
2. Add a generator to `GEN` in the unit's file in `js/content/`.
3. Add any new mistakes to `RULES` in `js/math/malrules.js`, with a general explanation for when no numbers are available.
4. Run `npm test`. It generates 200 items per skill and checks they are consistent, and checks every trap points to a real skill.
