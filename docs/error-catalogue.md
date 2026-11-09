# Error catalogue and learning patterns

Research base for the content work: what students get wrong in fractions, negative numbers, powers and square roots, and how the path should be ordered. Compiled 2026-10-30.

Each rule is tagged:

- **[R]** named in the research sources below
- **[P]** from a French programme or academic resource
- **[E]** a well-known classroom error added from teaching experience, not traced to a source here. Needs checking by a teacher.

Worked examples are mine unless the source gives one. Rule slugs come from MalruleLib where one exists.

## Classes of error

Most specific errors fall into a few families. Feedback should name the family, because the same fix covers many rules.

| Family | What happens | Examples |
|---|---|---|
| **Whole-number bias** | a/b is read as two separate numbers, not one quantity | Adding across, comparing by denominator alone |
| **Rule moved to the wrong operation** | A correct rule is used where it doesn't apply | Sign rule of × used in +, keeping the denominator in × |
| **False distribution** | Any operation is assumed to spread over a sum | (a+b)² = a²+b², √(a+b) = √a+√b |
| **Symbol misread** | The notation itself is misunderstood | 3² = 6, −3² = 9, √16 = 8 |
| **Structure and order** | The expression is read left to right, brackets ignored | 1/2 + 1/3 × 3/4 computed left to right |
| **Missing meaning** | The symbol has no quantity behind it | Stuck on fractions above 1, can't place 3/4 on a line |
| **Slip** | A random error, not a misconception | No pattern. Must not trigger remediation |

Evidence that these matter:

- In a study of 4th-grade fraction ordering, 65% of errors (1,078 of 1,664) applied whole-number logic. Of those, 46% ordered by denominator alone, 33% by both parts, 21% by numerator alone. [Source 1]
- The same study left around 17-22% of errors with no identifiable pattern, so not every error is diagnosable. [Source 1]
- Brown and Burton showed that many errors are consistent, rule-governed procedures rather than noise, and also warned that reliable diagnosis from answers alone should not be expected. [Sources 2, 3]

## Fractions

| Rule | Wrong → correct | Tag | Skill |
|---|---|---|---|
| `add_numerators_add_denominators` | 1/2 + 1/3 → 2/5 (5/6) | R | Add |
| `subtract_across` | 3/4 − 1/2 → 2/2 (1/4) | R | Subtract |
| `common_denominator_numerator` | Knows a common denominator is needed, gets it by adding: 1/2 + 1/3 → ?/5 | R | Add |
| `ignore_denominators` | 1/2 + 3/4 → 4/4 (5/4) | R | Add |
| Adds denominators when they already match | 2/7 + 3/7 → 5/14 (5/7) | R | Add, same denominator |
| `multiply_rule_for_addition` | 1/2 + 1/3 → 1/6 (5/6). Example inferred, the paper gives no description | R | Add |
| `keep_common_denominator_for_multiplication` | 2/5 × 3/5 → 6/5 (6/25) | R | Multiply |
| `multiply_across_for_division` | 2/3 ÷ 4/5 → 8/15 (5/6) | R | Divide |
| Inverts the first fraction instead of the second | 2/3 ÷ 4/5 → 12/10 (5/6) | E | Divide |
| Multiplies both parts by the integer | 3 × 2/5 → 6/15 (6/5) | E | Multiply by integer |
| `natural_number_bias_numerator_only` | 3/5 > 2/3 (2/3 is larger) | R | Compare |
| `denominator_comparison_error` | 1/4 > 1/3 (1/3 is larger) | R | Compare |
| Smallest denominator is biggest, ignoring numerator | 2/5 > 7/8 (7/8 is larger) | R | Compare |
| `additive_instead_of_multiplicative` | 2/3 = ?/15 → 14/15 (10/15) | R | Equal fractions |
| Numerator and denominator confused | 2 of 5 parts → 5/2 (2/5) | P | Read a fraction |
| Part over remainder, not part over whole | 2 of 5 shaded → 2/3 (2/5) | E | Read a fraction |
| Stuck on or rejects fractions above 1 | "7/4 doesn't exist" | P | Number line |
| Larger divided by smaller, always | 4 cookies among 6 → 6 ÷ 4 (4 ÷ 6) | R | Fraction as quotient |
| Cancels terms across a sum | (2+3)/(2+5) → 3/5 (5/7) | E | Simplify, multi-step |
| Left to right, ignoring priority | 1/2 + 1/3 × 3/4 → 5/8 (3/4) | R | Multi-operation |

## Negative numbers

The minus sign has several meanings: subtraction, a negative number, and "the opposite of" (Vlassis). Students tend to read it only as take-away. [Source 4]

| Rule | Wrong → correct | Tag | Skill |
|---|---|---|---|
| `two_negatives_always_positive` | −3 + (−4) → 7 (−7) | R | Add |
| `multiplication_rule_for_addition` | −3 − 4 → 7 (−7) | R | Subtract |
| `negative_swaps_operation` | 5 − (−3) → 2 (8) | R | Subtract |
| `larger_absolute_value_always_wins` | −2 × 5 → 10 (−10) | R | Multiply |
| `negative_times_negative_negative` | −3 × (−4) → −12 (12) | R | Multiply |
| Adds the sizes and keeps the minus | −5 + 7 → −12 (2) | P | Add |
| Ignores the sign | −2 + 5 → 7 (3) | R | Add |
| Reverses to avoid a negative | 3 − 5 → 2 (−2) | R | Subtract |
| Orders by size of digits | −7 > −3 (−3 is larger) | R | Compare |
| Zero is the smallest number | 0 < −4 (−4 is smaller) | R | Compare |

## Powers

| Rule | Wrong → correct | Tag | Skill |
|---|---|---|---|
| `multiply_base_by_exponent` | 3² → 6 (9) | R | Definition |
| Sign and bracket confusion | −3² → 9 (−9) vs (−3)² = 9 | P | Sign and priority |
| `multiply_exponents_when_multiplying_powers` | 2³ × 2⁴ → 2¹² (2⁷) | R | Product rule |
| `add_exponents_for_power_of_power` | (2³)² → 2⁵ (2⁶) | R | Power of a power |
| `forget_exponent_on_coefficient` | (2 × 10³)² → 2 × 10⁶ (4 × 10⁶) | R | Scientific notation |
| `distribute_exponent_over_addition` | (1 + 2)² → 1 + 4 = 5 (9) | R | Priority |
| `negative_exponent_makes_negative` | 10⁻² → −100 (0,01) | R | Negative exponent |
| `zero_exponent_equals_zero` | 5⁰ → 0 (1) | R | Zero exponent |
| Applies the product rule to a sum | 2³ + 2⁴ → 2⁷ (24) | E | Product rule |

## Square roots

| Rule | Wrong → correct | Tag | Skill |
|---|---|---|---|
| `square_root_is_divide_by_two` | √16 → 8 (4). Example inferred | R | Definition |
| `distribute_square_root_over_addition` | √(9 + 16) → 7 (5) | R | Operations |
| `add_under_common_root` | √9 − √4 → √5 (1) | R | Operations |
| `square_root_equals_plus_minus` | √25 → ±5 (5) | R | Definition |
| `negative_outside_same_as_inside` | Treats −√9 as √(−9) (it is −3) | R | Definition |
| Keeps only the positive solution | x² = 25 → x = 5 (5 or −5) | E | Equation x² = a |

## How the French programme orders this

Read directly from the 2025 cycle 3 text and the cycle 4 annex on education.gouv.fr. The new cycle 4 programme was published in the BO of 5 March 2026 and rolls out in 5e (2026), 4e (2027), 3e (2028). The annex's year-by-year layout matches that description, but the extracted text carries no date, so confirm it is that version.

| Level | Fractions | Negatives | Powers | Roots |
|---|---|---|---|---|
| **6e** | Quotient meaning, operator, equal fractions, compare and order, add and subtract, fraction × integer | | | |
| **5e** | Compare, add and subtract with any denominators, integer + fraction below 1 (17/5 = 3 + 2/5) | Define, number line, compare, add, subtract, chains, brackets | Squares and cubes, squares of 0 to 12 | |
| **4e** | Simplify, rationals as quotients of signed integers, product, fraction of a fraction, inverse, divide, multi-operation expressions | Multiply, divide, chains | Positive exponents, product rules | Definition, framing between integers |
| **3e** | Irreducible form, problems | | Negative exponents, divide powers, scientific notation | x² = a, problems |

### Swiss PER (HarmoS), used for the profile's school year

Students are Swiss, so the app asks for the HarmoS year and, from 9H, the track. Timing from the Bern progression of the PER (2016), which splits secondary I into levels A (high), B and C (base):

| Year | Fractions | Negatives | Powers and roots |
|---|---|---|---|
| **9H** | Writings, compare, simplify, amplify. + and − for level A only | Compare, number line. All four operations for A/B, none for C | Powers aᵇ as a writing |
| **10H** | + and − for B and C; all four operations for A | + and − for C; all four for A/B | Product rules for powers (A/B), square roots of perfect squares, scientific notation |
| **11H** | All four operations for B and C | All four operations for C | Square and cube roots, irrationals, √(a·b) rules (A) |

The track shifts where the placement skim starts. Swiss cantons name tracks differently (A/B/C, VP/VG, LS/LC/CT), so the app asks with neutral labels and allows "je ne sais pas". Source: [Bern, Maths cycle 3 progression](https://www.faechernet.bkd.be.ch/content/dam/faechernet_bkd/dokumente-bilder/fr/comeo/mathematiques/Maths-cycle3-Progression-2016.pdf).

Four meanings of a fraction appear across cycle 3, and each suits a different exercise type:

| Meaning | Exercise type |
|---|---|
| Part of a whole | Shade a circle, square or bar |
| Measure | Number line, including above 1 |
| Quotient | Missing-factor equalities: 3 × … = 7 |
| Operator | 2/3 of 12 eggs |

The programme warns that part-of-a-whole struggles with fractions above 1, so shapes alone are not enough. It also lists exact automatismes (for example 1/4 = 0,25, 3/2 = 1,5, squares up to 12), which give a ready list of the facts where speed should count.

## Consequences for the build

1. **Step checking is mostly solved by exact arithmetic.** Each line the student writes must have the same exact value as the line before. If the value holds, the step is valid, whatever the method. If it doesn't, run the error rules on the sub-expressions of the previous line to name the mistake.
2. **Steps reveal more than answers.** `add_numerators_add_denominators` and `common_denominator_numerator` can give the same final 2/5. Only the intermediate line separates them.
3. **Flag a misconception only after repeat evidence.** One matching error may be a slip. Require matches across different questions before changing the student's path.
4. **Credit several skills per question.** A multi-step problem exercises several skills at once, like the attribute matrix in Tatsuoka's fraction data. Each step should update its own skill, not the whole problem. [Sources 2, 5]
5. **Use Bayesian knowledge tracing for mastery.** It is the established per-skill method in Cognitive Tutor and can run in the browser with fixed parameters. [Source 5]
6. **Wrong choices in multiple choice should be real errors.** Eedi's diagnostic questions work this way. Generators can produce them by running the error rules. [Source 6]
7. **The topics are not independent.** Fraction work in 4e assumes signed numbers. The fractions unit stays positive-only; signed fractions are a skill of the negatives unit (`rel-frac`), unlocked once both are known.

## What the app implements

All five units are built (mental arithmetic was added on 2026-11-09). Each rule above is a « piège » in `js/math/malrules.js`, under its own id; `npm run samples` lists the traps of each unit with their tag at the end of each `docs/samples-*.md` file.

Some traps were added while writing the units and are not in the tables above. They are tagged **[E]** and need a teacher's check most:

| Unit | Added traps [E] |
|---|---|
| Negatives | `sign_of_first` (−3 + 8 = −5), `product_sign_count`, `read_neg_as_pos`, `neg_line_direction`, `opposite_inverse` (opposite of 5 = 1/5) |
| Powers | `pow_zero_is_base` (5⁰ = 5), `pow_fraction_numerator_only` ((2/3)² = 4/3), `pow_decimal_places` (0,3² = 0,9), `pow_before_product` (2 × 3² = 36), `pow_product_multiply_bases` (2³ × 2⁴ = 4⁷), `pow_quotient_divide_exp`, `pow_ten_count_digits` (1 000 = 10⁴), `exp_sign_small_number` (0,001 = 10³), `sci_count_zeros` |
| Equations, formulas, geometry | From research: `equals_as_result` (Kieran 1981; Knuth et al. 2006), `eq_inverse_op` (3x = 15 → x = 15 − 3; Kieran 1981), `eq_divide_one_term`, `eq_one_side_only`, `zero_product_misuse` (Vaiyavutjamai & Clements 2006), `iso_sum_invert` (1/f = 1/a + 1/b → f = a + b). [E]: `eq_move_no_sign`, `eq_change_side_sign_mult`, `zero_product_sign`, `zero_product_forget_zero`, `system_one_equation`, `iso_wrong_inverse`, `iso_forget_root`, `iso_var_both_sides`, `triangle_forget_half`, `circle_formula_swap`, `radius_diameter`, `pyramid_forget_third`, `pythagore_hypotenuse`, `thales_ratio_mismatch` |
| Algebra | From research: `subst_juxtapose` (3x for x = 4 → 34; Küchemann 1981, Booth 1984), `conjoin_terms` (2x + 3 = 5x; Booth 1984), `distribute_partial` (3(x + 2) = 3x + 2; Matz 1982), `double_distribution_partial`, and `pow_distribute_sum` reused for (a + b)² = a² + b² (Matz 1982; Kirshner & Awtry 2004). [E]: `translate_order`, `alg_x_plus_x`, `alg_x_times_x`, `alg_coeff_power` ((2x)² = 2x²), `alg_coeff_add`, `identity_middle_term`, `identity_sign_square`, `fac_forget_one` (x² + x = x(x)), `fac_forget_divide`, `fac_diff_squares_as_square`, `fac_trinomial_signs` |
| Proportionality, percentages, units | `additive_reasoning` (3 → 5 so 6 → 8; Hart 1984) and `linearity_illusion` (side × 2 so area × 2; De Bock et al. 2002) come from research. [E]: `rule3_inverted`, `scale_forget_convert`, `convert_wrong_direction`, `percent_as_amount`, `percent_inverted`, `percent_reverse_subtract`, `percent_add_successive`, `time_decimal_minutes` (1,5 h = 1 h 50), `slope_inverted`, `area_factor_10` (1 m² = 100 cm²), `volume_factor_10`, `speed_factor_wrong_way`, `imperial_linear_factor` (1 pied² = 30,48 cm²) |
| Arithmetic and writings of a number | `div_last_digit`, `divisors_forget_ends`, `one_is_prime`, `odd_is_prime` (51 is prime), `gcd_lcm_swap`, `lcm_product`, `surd_forget_root` (√72 = 36√2), `frac_decimal_digits` (1/4 = 0,4), `percent_shift` (35 % = 3,5), `repeating_as_finite`, `set_by_writing`, `root_always_irrational`, `cube_root_third` (∛27 = 9), `cube_root_negative` |
| Mixed calculations | `pow_neg_exp_forget_power` ((2/3)⁻² = 3/2), `sqrt_numerator_only` (√(9/16) = 3/16) |
| Mental arithmetic | `fact_add_for_sub` (13 − 8 = 21), `fact_mul_for_add` (3 + 4 = 12), `count_off_by_one` (8 + 3 = 12), `forget_carry` (47 + 8 = 45), `compensation_wrong_way` (47 + 38 = 47 + 40 + 2), `square_digits` (23² = 49), `missing_factor_subtract` (7 × … = 56 → 49), `round_truncate` (3,47 → 3,4) |
| Roots | `sqrt_is_square` (√9 = 81), `sqrt_of_square_sign`, `sqrt_squared_squares` ((√7)² = 49), `sqrt_product_add` (√2 × √8 = √10), `sqrt_forget_root`, `square_negative_solutions` |

Three mental-arithmetic traps come from research: `fact_neighbor` (7 × 8 = 54, a neighbouring fact; Campbell & Graham 1985), `fact_add_for_mul` (3 × 4 = 7) and `sub_smaller_from_larger` (52 − 7 = 55, the « smaller from larger » bug of Brown & Burton 1978). Fact traps are matched on the answer only and explained with the question's own numbers.

Three research rules are recognised by structure rather than by an operation: `neg_power_brackets` (−3² read as (−3)², and the reverse), `pow_distribute_sum` and `sqrt_distribute_sum`, plus their mirror `sqrt_combine_sum`. The minus before brackets (10 − (3 + 2) = 10 − 3 + 2) is its own trap, `minus_before_parens` [P].

`square_root_equals_plus_minus` (√25 = ±5) and `negative_outside_same_as_inside` (−√9 vs √(−9)) can only be offered as multiple-choice options, since the keypad has no ± and "n'existe pas" is not a number.

## Licensing

- MalruleLib's code is under a non-commercial license. Use it as a reference for ideas and reimplement rules in our own code.
- Eedi's NeurIPS dataset is CC BY-NC-ND. Don't copy its questions.
- The Kaggle misconception list's license was not confirmed.

## Gaps

- I read MalruleLib's catalogue from the paper, not its code. Two rules have no description there.
- The exponent and square-root studies were seen only as abstracts or summaries.
- I found no French-language catalogue with frequencies. The Lille academy workshop on numbers was unreachable and Eduscol's resources on fractions and negatives were not read in full. A French teacher's review would help most on the [E] rules.

## Sources

1. [Fraction ordering errors in 4th grade](https://pmc.ncbi.nlm.nih.gov/articles/PMC5018237)
2. [MalruleLib paper](https://arxiv.org/html/2601.03217) and [code](https://github.com/sonkar-lab/malrulelib)
3. [Bayes nets reanalysis of Tatsuoka's fraction data](https://arxiv.org/pdf/1301.6722) and [Tatsuoka Q-matrix](https://www.quantargo.com/help/r/latest/packages/CDM/NEWS/fraction.subtraction.qmatrix)
4. [Bofferding 2014, negative integer understanding](https://nctm.org/Publications/journal-for-research-in-mathematics-education/2014/Vol45/Issue2/Negative-Integer-Understanding_-Characterizing-First-Graders_-Mental-Models)
5. [Knowledge tracing in Cognitive Tutors](https://typeset.io/pdf/reducing-the-knowledge-tracing-space-517pv5wrxd.pdf)
6. [Eedi NeurIPS 2020 challenge](https://arxiv.org/pdf/2007.12061) and [project page](https://eedi.com/projects/neurips-education-challenge)
7. [Programme cycle 3, 2025](https://cafepedagogique.net/wp-content/uploads/2025/04/Programme-de-mathematiques-pour-le-cycle-3-2025.pdf)
8. [Programme cycle 4 annex](https://www.education.gouv.fr/sites/default/files/document/Annexe%202%20%E2%80%93%20Programme%20de%20math%C3%A9matiques%20pour%20le%20cycle%204-480716.pdf) and [rollout note](https://ent2d.ac-bordeaux.fr/disciplines/mathematiques/publication-du-nouveau-programme-cycle-4/)
9. [Whole-number bias and fraction error classes, seventh grade](https://journal-fkip.unsika.ac.id/index.php/radian/article/download/13406/5363/40272)
10. [Frequent fraction errors, CRPE](https://www.pass-education.fr/quelles-sont-les-erreurs-frequentes-en-lien-avec-les-fractions-ou-les-nombres-decimaux-crpe/)
