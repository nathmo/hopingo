// Traps of module M (analyse matricielle, step U8), spec §7. Catalogue:
// docs/universite/L-M-algebre-lineaire.md, M, « Pièges du module ».
//
// META is the catalogue's table, as written: id, family, tag, skill,
// repair, example [wrong, right], and the texts of its « transformation »
// and « explication » columns. Each part of the module adds what makes a
// trap work in its own file (rules/m<part>.js, DEFS: {id: {name, judges,
// transform, wrongValues, explain, check}}). explain() falls back on the
// catalogue's text, its {…} filled from ctx when the trap gives them. A
// trap no part has defined yet is marked `stub` (tests skip it).

import { DEFS as A } from './ma.js';
import { DEFS as B } from './mb.js';
import { DEFS as C } from './mc.js';
import { DEFS as D } from './md.js';

export const META = [
  { id: "m_schur_order", family: "rule", tag: "E", skill: "m-blocks-schur", repair: "l-mat-blocks", example: ["S = A₂₂ − A₁₂A₁₁⁻¹A₂₁", ""], transformText: "Ligne S avec les facteurs dans l'ordre inverse (si les tailles le permettent)", explainText: "On élimine A₂₁ avec A₁₁ : S = A₂₂ − A₂₁·A₁₁⁻¹·A₁₂, dans cet ordre (la ligne du bas, puis le pivot, puis la colonne de droite)." },
  { id: "m_schur_sign", family: "sign", tag: "E", skill: "m-blocks-schur", repair: "l-sys-echelon", example: ["S = A₂₂ + A₂₁A₁₁⁻¹A₁₂", ""], transformText: "Signe + dans la ligne S", explainText: "Comme en Gauss, on **retranche** : S = A₂₂ − … = {…}." },
  { id: "m_householder_factor", family: "rule", tag: "E", skill: "m-rank1-proj", repair: "m-rank1-proj", example: ["H = I − P", "I − 2P"], transformText: "Ligne `I − P` pour la symétrie", explainText: "I − P projette sur u⊥ ; pour la symétrie, il faut enlever **deux fois** la composante selon u : H = I − 2P." },
  { id: "m_spectral_entrywise", family: "rule", tag: "E", skill: "m-spectral", repair: "m-spectral", example: ["√A case par case", ""], transformText: "Appliquer f à chaque coefficient de A", explainText: "f(A) se calcule sur les valeurs propres : f(A) = Σ f(λᵢ)uᵢuᵢᵀ. Contrôle : ({ta matrice})² ≠ A." },
  { id: "m_sylvester_semidef", family: "logic", tag: "E", skill: "m-posdef", repair: "m-posdef", example: ["mineurs dominants ≥ 0 ⇒ semi-définie positive", ""], transformText: "`wrongValues` : « semi-définie positive »", explainText: "Pour « semi-définie », il faut tous les mineurs principaux (pas seulement dominants) ≥ 0. `[[0, 0], [0, −1]]` a Δ₁ = Δ₂ = 0 mais Q(0, 1) = −1." },
  { id: "m_sylvester_negdef", family: "sign", tag: "E", skill: "m-posdef", repair: "m-posdef", example: ["définie négative ⇔ tous les mineurs < 0", ""], transformText: "`wrongValues` : appliquer « tous < 0 »", explainText: "A est définie négative si −A est définie positive : les mineurs alternent, Δ₁ < 0, Δ₂ > 0, Δ₃ < 0." },
  { id: "m_chol_no_sqrt", family: "rule", tag: "E", skill: "m-cholesky", repair: "m-cholesky", example: ["ℓ₂₂ = 10 − 1", "√(10 − 1)"], transformText: "Diagonale de L sans racine", explainText: "Sur la diagonale, ℓₖₖ² = aₖₖ − Σ ℓₖⱼ² : il faut prendre la racine, ℓ = √{…}. Contrôle : (LLᵀ)ₖₖ ≠ aₖₖ." },
  { id: "m_chol_sum_sign", family: "sign", tag: "E", skill: "m-cholesky", repair: "m-cholesky", example: ["ℓ₃₂ = (5 + (−1)·1)/3", ""], transformText: "Ajouter Σ ℓᵢⱼℓₖⱼ au lieu de le retrancher", explainText: "ℓᵢₖ = (aᵢₖ − Σ ℓᵢⱼℓₖⱼ)/ℓₖₖ : ici (5 − (−1)(1))/3 = 2." },
  { id: "m_grad_factor", family: "rule", tag: "E", skill: "m-quad-gradient", repair: "a2-partials", example: ["∇(½xᵀAx) = 2Ax ou ½Ax", "Ax"], transformText: "Gradient = 2Ax − b ou ½Ax − b", explainText: "∇(xᵀAx) = 2Ax pour A symétrique ; le ½ devant le compense : ∇(½xᵀAx) = Ax. Vérifie sur la 1re composante : ∂f/∂x = {…}." },
  { id: "m_grad_nonsym", family: "rule", tag: "E", skill: "m-quad-gradient", repair: "m-quad-gradient", example: ["∇(xᵀMx) = 2Mx (M non symétrique)", ""], transformText: "Gradient 2Mx", explainText: "Pour M non symétrique, ∇(xᵀMx) = (M + Mᵀ)x : ici M + Mᵀ = {…}." },
  { id: "m_var_no_inverse", family: "rule", tag: "E", skill: "m-normal-eq", repair: "m-normal-eq", example: ["Var(β̂) = σ²XᵀX", ""], transformText: "`wrongValues` : σ²·(XᵀX)ⱼⱼ", explainText: "Plus il y a de données, plus XᵀX est grand et plus β̂ est précis : la variance est σ²(XᵀX)⁻¹." },
  { id: "m_rayleigh_no_denominator", family: "rule", tag: "E", skill: "m-rayleigh", repair: "m-rayleigh", example: ["R(x) = xᵀAx", ""], transformText: "`wrongValues` : xᵀAx, ou xᵀAx/‖x‖", explainText: "R(x) = xᵀAx/xᵀx : sans le dénominateur, la valeur dépend de la longueur de x. Ici xᵀx = {…}." },
  { id: "m_power_ratio", family: "rule", tag: "E", skill: "m-power-method", repair: "m-power-method", example: ["vitesse |λ₁/λ₂|", "|λ₂/λ₁|"], transformText: "`wrongValues` : |λ₁/λ₂| ; « plus petite valeur propre »", explainText: "Après k pas, la part du mode 2 est multipliée par (λ₂/λ₁)ᵏ, qui tend vers 0 : la vitesse est |λ₂/λ₁| = {…}." },
  { id: "m_inverse_power_value", family: "rule", tag: "E", skill: "m-power-method", repair: "m-power-method", example: ["λ ≈ μ", "λ = σ + 1/μ"], transformText: "`wrongValues` : μ, 1/μ, σ + μ", explainText: "La puissance inverse travaille sur (A − σI)⁻¹, de valeurs 1/(λ − σ). Il faut revenir : λ = σ + 1/μ = {…}." },
  { id: "m_rankk_wrong_sigma", family: "rule", tag: "E", skill: "m-svd-lowrank", repair: "m-svd-lowrank", example: ["‖A − A_k‖₂ = σ_k", "σ_{k+1}"], transformText: "`wrongValues` : σ_k, σ_{k+1}²", explainText: "L'erreur est le plus grand terme qu'on a jeté : σ_{k+1} = {…}." },
  { id: "m_norm_1_inf_swap", family: "notation", tag: "E", skill: "m-norms", repair: "m-norms", example: ["‖A‖₁ = max par ligne", ""], transformText: "`wrongValues` : échanger ‖·‖₁ et ‖·‖∞", explainText: "‖·‖₁ somme les **colonnes**, ‖·‖∞ les **lignes** : ici {…} et {…}." },
  { id: "m_norm2_eig", family: "rule", tag: "E", skill: "m-norms", repair: "l-svd-compute", example: ["‖A‖₂ = max |λᵢ(A)| (A non symétrique)", ""], transformText: "`wrongValues` : max |λᵢ(A)| ; √λ_max(A)", explainText: "‖A‖₂ = σ₁ = √λ_max(AᵀA). Les valeurs propres de A ne suffisent que si A est symétrique." },
  { id: "m_cond_eig_nonsym", family: "rule", tag: "E", skill: "m-cond", repair: "m-norms", example: ["κ₂ = |λ_max/λ_min| (A non symétrique)", ""], transformText: "`wrongValues` : rapport des valeurs propres de A", explainText: "Pour A non symétrique, κ₂ = σ₁/σₙ (valeurs singulières), pas le rapport des valeurs propres." },
  { id: "m_cond_det", family: "logic", tag: "E", skill: "m-cond", repair: "m-cond", example: ["« det petit ⇒ mal conditionnée »", ""], transformText: "`wrongValues` : « vrai »", explainText: "det(10⁻³I) = 10⁻⁹ (en 3D), mais κ = 1 : multiplier par un scalaire ne change pas κ." },
  { id: "m_gersh_radius_diag", family: "rule", tag: "E", skill: "m-gershgorin", repair: "m-gershgorin", example: ["rayon = Σ |aᵢⱼ| y compris aᵢᵢ", ""], transformText: "Rayons calculés avec la diagonale", explainText: "Le rayon ne compte que les cases hors diagonale : R = {…}. La diagonale est le centre." },
  { id: "m_companion_sign", family: "sign", tag: "E", skill: "m-ode-modes", repair: "a2-ode-const2", example: ["ÿ + 5ẏ + 6y = 0", "`[[0, 1], [6, 5]]`"], transformText: "Dernière ligne de la matrice compagne sans changement de signe", explainText: "ÿ = −6y − 5ẏ : la ligne du bas est (−6, −5). Contrôle : le polynôme de ta matrice est {…}, pas λ² + 5λ + 6." },
  { id: "m_modes_c_equals_x0", family: "linear", tag: "E", skill: "m-ode-modes", repair: "l-vs-coords", example: ["c = x(0)", "Pc = x(0)"], transformText: "Coefficients modaux pris égaux aux composantes de x(0)", explainText: "Les cᵢ sont les coordonnées de x(0) dans la base des vecteurs propres : il faut résoudre Pc = x(0)." },
  { id: "m_stab_discrete_in_cont", family: "logic", tag: "E", skill: "m-ode-modes", repair: "m-ode-modes", example: ["ẋ = Ax stable car |λ| < 1", ""], transformText: "`wrongValues` : décision avec le critère |λ| < 1", explainText: "En continu, le mode e^{λt} tend vers 0 si Re λ < 0. Avec λ = {λ} > 0, il explose même si |λ| < 1." },
  { id: "m_stab_cont_in_discrete", family: "logic", tag: "E", skill: "m-discrete", repair: "m-discrete", example: ["x⁺ = Ax stable car Re λ < 0", ""], transformText: "`wrongValues` : décision avec le critère Re λ < 0", explainText: "En discret, le mode est λᵏ : il tend vers 0 si |λ| < 1. Avec λ = {λ}, |λ|ᵏ grandit." },
  { id: "m_stab_imag_part", family: "logic", tag: "E", skill: "m-ode-modes", repair: "m-ode-modes", example: ["stabilité lue sur Im λ", ""], transformText: "`wrongValues` : décision selon le signe de Im λ", explainText: "La partie imaginaire donne la fréquence des oscillations ; c'est la partie réelle qui dit si elles s'amortissent." },
  { id: "m_discrete_exp", family: "rule", tag: "E", skill: "m-discrete", repair: "m-discrete", example: ["x_k = e^{λk}v", "λᵏv"], transformText: "Modes écrits e^{λᵢk} au lieu de λᵢᵏ", explainText: "En discret, chaque pas multiplie par λ : après k pas, λᵏ. L'exponentielle est le cas continu." },
  { id: "m_expm_entrywise", family: "rule", tag: "E", skill: "m-expm", repair: "m-expm", example: ["e^{At} = (e^{aᵢⱼt})", ""], transformText: "Exponentielle de chaque case", explainText: "e^{At} = Σ (At)ᵏ/k!, pas la matrice des e^{aᵢⱼt}. Contrôle : en t = 0, ta matrice donne des 1 partout, pas I." },
  { id: "m_expm_sum", family: "rule", tag: "E", skill: "m-expm", repair: "l-mat-product", example: ["e^{A+B} = e^A e^B (AB ≠ BA)", ""], transformText: "`wrongValues` : « vrai »", explainText: "Cette règle demande AB = BA. Ici AB − BA = {…} ≠ 0." },
  { id: "m_expm_double_no_t", family: "linear", tag: "E", skill: "m-expm", repair: "l-eig-diag-param", example: ["e^{At} = e^{λt}I pour une valeur double", ""], transformText: "Oublier le terme tN", explainText: "A n'est pas diagonalisable (N = A − λI ≠ 0) : e^{At} = e^{λt}(I + tN). Contrôle : la dérivée de e^{λt}I vaut λe^{λt}I ≠ Ae^{At}." },
];

const DEFS = { ...A, ...B, ...C, ...D };

// « {k} » in the catalogue's explanation, from ctx (or « … »).
export function fill(text, ctx = {}) {
  return text.replace(/\{([^{}]*)\}/g, (_, k) => (ctx[k] !== undefined && ctx[k] !== null ? String(ctx[k]) : '…'));
}

export const RULES = META.map((m) => {
  const d = DEFS[m.id];
  const base = { id: m.id, family: m.family, tag: m.tag, skill: m.skill, repair: m.repair, example: m.example };
  if (!d) return { ...base, name: `Piège ${m.id}`, stub: true, judges: [], explain: (ctx) => fill(m.explainText, ctx) };
  return { ...base, explain: (ctx) => fill(m.explainText, ctx), ...d };
});
