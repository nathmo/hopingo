# Plan : BA5 et plus (à détailler)

Note du 9 novembre 2026. Ce plan recueille ce qui dépasse la 2e année. Rien n'est construit, et rien ne le sera avant la fin de [plan-universite.md](plan-universite.md). Il reprend le même moteur et le même format de catalogue ([universite/README.md](universite/README.md), §15).

## Pourquoi un plan séparé

Le module M (analyse matricielle) de [plan-universite.md](plan-universite.md) s'arrête à ce que les cours de BA4 utilisent. Les cours de BA5 et du master qui utilisent les matrices s'appuient sur les mêmes outils (valeurs propres, exponentielle de matrice, matrices définies positives). Ils les combinent pour l'automatique, l'estimation et l'apprentissage. Ils viennent aussi avec de la physique : mécanique, circuits, signaux. Ce plan est donc à relier au futur module de physique de l'app.

## Compétences repérées dans les notes

Elles viennent des cours de Microtechnique de BA5 à MA3 : automatique (ME-326), signaux et systèmes I et II, commande prédictive (MPC), robotique mobile, manipulation, apprentissage automatique.

| Compétence | Exemple | Utilisé dans |
|---|---|---|
| Mettre une EDO sous forme d'état ẋ = Ax + Bu, y = Cx + Du | ÿ + cẏ + 4y = u → A = [[0, 1], [−4, −c]], B = [0 ; 1] | Automatique |
| Formes canoniques (commandable, observable, diagonale) | | Automatique, systèmes dynamiques |
| Linéariser autour d'un équilibre (jacobienne) | Pendule en θ = 0 | Systèmes dynamiques, robotique |
| Fonction de transfert G(s) = C(sI − A)⁻¹B + D ; pôles = valeurs propres de A | C = [1 0] → 1/(s² + cs + 4) | Automatique |
| Réponse d'un système avec une entrée : x(t) = e^(At)x₀ + ∫ e^(A(t−τ))Bu(τ) dτ | Réponse indicielle | Systèmes dynamiques |
| Commandabilité : rang de [B AB … Aⁿ⁻¹B] | [B AB] = [[1, −2], [0, 1]], det ≠ 0 | Automatique |
| Observabilité ; dualité par Aᵀ | | Automatique |
| Polynôme de matrice p(A), Cayley-Hamilton | | Automatique |
| Placement de pôles : det(sI − (A − BK)) = polynôme cible ; formule d'Ackermann | Polynôme cible s² + 7,9s + 98 → K | Automatique |
| Observateur : det(sI − A + LC) | | Automatique |
| LQR : Q et R diagonales, équation de Riccati | | Automatique, MPC |
| Systèmes discrets x⁺ = Ax + Bu ; ensembles invariants | x⁺ = −0,5x | MPC |
| Équation de Lyapunov discrète AᵀPA − P = −Q | a = −0,5 → p = 4q/3 | MPC |
| Programme quadratique : hessienne, conditions KKT | | MPC, optimisation |
| Covariance, ACP (valeurs propres triées) | Σ = [[2, 1], [1, 2]] → 75 % de la variance sur (1, 1)/√2 | Apprentissage automatique, statistique |
| Filtre de Kalman : moyenne, covariance, gain ; jacobiennes de l'EKF | | Robotique mobile |
| Matrices de rotation, quaternions ; singularités de la jacobienne (det J = 0) | | Manipulation |
| Opérateur y = Hx, H = UΛUᵀ ; les exponentielles complexes vecteurs propres des systèmes LTI | | Signaux et systèmes II |
| Non-normalité : ‖e^(At)‖ croît au début même si tous les Re λ < 0 ; résolvante | | Master (instabilités) |

## À faire avant de construire

1. Relire les notes de BA5 à MA3 comme on l'a fait pour BA1–BA4 : programmes réels, formats d'examen, erreurs fréquentes.
2. Décider du lien avec le module de physique : faut-il un module « systèmes » commun, ou des compétences de maths utilisées par des exercices de physique ?
3. Écrire les catalogues au format de [universite/README.md](universite/README.md), §15.
