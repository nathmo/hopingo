# Exemples de questions — Fourier, Laplace, EDP

Généré par `npm run samples` (graine fixe). Trois exemples par niveau.
`[guided]` = étapes à trous, `[tap]` = on touche l'opération à faire, `[free]` = lignes libres.
Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.
Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).

## Coefficients de Fourier, parité, a₀ et petits indices (`f-coef`, BA4)

_Parité d'abord, a₀ à part, puis aₙ ou bₙ par parties._

### Niveau 1

```
f est 2π-périodique et f(x) = 2x² sur ]−π ; π]. Calcule ses coefficients de Fourier (convention a₀/2).
  [guided]  (2/π)(∫_{0}^{π} 2x² dx)
    (Parité de f ? f est paire : bₙ = 0, on calcule a₀ et aₙ.)
    (a₀ se calcule à part :)
    = (2/π)([□]_{0}^{π})   (trous : (2/π)([2x³/3]_{0}^{π}))   ← Primitive
    = □   (trous : 4π²/3)   ← a₀
  — aₙ :  [juge equiv]  départ : (2/π)(∫_{0}^{π} 2x²cos(nx) dx)
    = (2/π)([□]_{0}^{π} − (1/n)(∫_{0}^{π} 4xsin(nx) dx))   (trous : (2/π)([2x²sin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} 4xsin(nx) dx)))   ← Par parties
    = (2/π)(−(1/n)(∫_{0}^{π} 4xsin(nx) dx))   ← Aux bornes
    = (2/π)(−(1/n)([□]_{0}^{π} + (1/n)(∫_{0}^{π} 4cos(nx) dx)))   (trous : (2/π)(−(1/n)([−4xcos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} 4cos(nx) dx))))   ← Par parties
    = □   (trous : 8(−1)^n/n²)   ← Simplifier
  aides : Parité d'abord : f est paire, donc bₙ = 0 ; a₀ se calcule à part. Puis aₙ = (2/π)∫₀^π … par parties, u = le polynôme. | aₙ = (2/π)(∫_{0}^{π} 2x²cos(nx) dx) | (2/π)([2x²sin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} 4xsin(nx) dx))
  pièges : f_interval_02pi

f est 2π-périodique et f(x) = 3|x| sur ]−π ; π]. Calcule ses coefficients de Fourier (convention a₀/2).
  [guided]  (2/π)(∫_{0}^{π} 3x dx)
    (Parité de f ? f est paire : bₙ = 0, on calcule a₀ et aₙ.)
    (a₀ se calcule à part :)
    = (2/π)([□]_{0}^{π})   (trous : (2/π)([3x²/2]_{0}^{π}))   ← Primitive
    = □   (trous : 3π)   ← a₀
  — aₙ :  [juge equiv]  départ : (2/π)(∫_{0}^{π} 3xcos(nx) dx)
    = (2/π)([□]_{0}^{π} − (1/n)(∫_{0}^{π} 3sin(nx) dx))   (trous : (2/π)([3xsin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} 3sin(nx) dx)))   ← Par parties
    = (2/π)(−(1/n)(∫_{0}^{π} 3sin(nx) dx))   ← Aux bornes
    = (2/π)(−(1/n)([□]_{0}^{π}))   (trous : (2/π)(−(1/n)([−3cos(nx)/n]_{0}^{π})))   ← Primitive
    = □   (trous : 6((−1)^n − 1)/(πn²))   ← Simplifier
  aides : Parité d'abord : f est paire, donc bₙ = 0 ; a₀ se calcule à part. Puis aₙ = (2/π)∫₀^π … par parties, u = le polynôme. | aₙ = (2/π)(∫_{0}^{π} 3xcos(nx) dx) | (2/π)([3xsin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} 3sin(nx) dx))
  pièges : f_interval_02pi

f est 2π-périodique et f(x) = |x| sur ]−π ; π]. Calcule ses coefficients de Fourier (convention a₀/2).
  [guided]  (2/π)(∫_{0}^{π} x dx)
    (Parité de f ? f est paire : bₙ = 0, on calcule a₀ et aₙ.)
    (a₀ se calcule à part :)
    = (2/π)([□]_{0}^{π})   (trous : (2/π)([x²/2]_{0}^{π}))   ← Primitive
    = □   (trous : π)   ← a₀
  — aₙ :  [juge equiv]  départ : (2/π)(∫_{0}^{π} xcos(nx) dx)
    = (2/π)([□]_{0}^{π} − (1/n)(∫_{0}^{π} sin(nx) dx))   (trous : (2/π)([xsin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} sin(nx) dx)))   ← Par parties
    = (2/π)(−(1/n)(∫_{0}^{π} sin(nx) dx))   ← Aux bornes
    = (2/π)(−(1/n)([□]_{0}^{π}))   (trous : (2/π)(−(1/n)([−cos(nx)/n]_{0}^{π})))   ← Primitive
    = □   (trous : 2((−1)^n − 1)/(πn²))   ← Simplifier
  aides : Parité d'abord : f est paire, donc bₙ = 0 ; a₀ se calcule à part. Puis aₙ = (2/π)∫₀^π … par parties, u = le polynôme. | aₙ = (2/π)(∫_{0}^{π} xcos(nx) dx) | (2/π)([xsin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} sin(nx) dx))
  pièges : f_interval_02pi

```

### Niveau 2

```
f est 2π-périodique et f(x) = |x| sur ]−π ; π]. Calcule ses coefficients de Fourier (convention a₀/2).
  [guided]  (2/π)(∫_{0}^{π} x dx)
    ? Parité de f ? ✔ f est paire : bₙ = 0, on calcule a₀ et aₙ / · f est impaire : a₀ = aₙ = 0, on calcule bₙ / · f est paire : aₙ = 0, on calcule bₙ / · Ni paire ni impaire : tout calculer
    ? Comment calculer a₀ ? ✔ À part, avec a₀ = (2/T)∫ f(x) dx / · Remplacer n par 0 dans la formule de aₙ
    (a₀ se calcule à part :)
    = (2/π)([□]_{0}^{π})   (trous : (2/π)([x²/2]_{0}^{π}))   ← Primitive
    = □   (trous : π)   ← a₀
  — aₙ :  [juge equiv]  départ : (2/π)(∫_{0}^{π} xcos(nx) dx)
    = (2/π)([□]_{0}^{π} − (1/n)(∫_{0}^{π} sin(nx) dx))   (trous : (2/π)([xsin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} sin(nx) dx)))   ← Par parties
    = (2/π)(−(1/n)(∫_{0}^{π} sin(nx) dx))   ← Aux bornes
    = (2/π)(−(1/n)([□]_{0}^{π}))   (trous : (2/π)(−(1/n)([−cos(nx)/n]_{0}^{π})))   ← Primitive
    = □   (trous : 2((−1)^n − 1)/(πn²))   ← Simplifier
  — n pair : aₙ = 0. Pour n impair, n = 2k + 1 :  [juge equiv]  départ : 2((−1)^(2k + 1) − 1)/(π(2k + 1)²)
    = □   (trous : −4/(π(2k + 1)²))   ← (−1)^(2k+1) = −1
  aides : Parité d'abord : f est paire, donc bₙ = 0 ; a₀ se calcule à part. Puis aₙ = (2/π)∫₀^π … par parties, u = le polynôme. | aₙ = (2/π)(∫_{0}^{π} xcos(nx) dx) | (2/π)([xsin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} sin(nx) dx))
  pièges : f_interval_02pi, f_even_an_zero, f_a0_separate

f est 2π-périodique et f(x) = 3x² sur ]−π ; π]. Calcule ses coefficients de Fourier (convention a₀/2).
  [guided]  (2/π)(∫_{0}^{π} 3x² dx)
    ? Parité de f ? ✔ f est paire : bₙ = 0, on calcule a₀ et aₙ / · f est impaire : a₀ = aₙ = 0, on calcule bₙ / · f est paire : aₙ = 0, on calcule bₙ / · Ni paire ni impaire : tout calculer
    ? Comment calculer a₀ ? ✔ À part, avec a₀ = (2/T)∫ f(x) dx / · Remplacer n par 0 dans la formule de aₙ
    (a₀ se calcule à part :)
    = (2/π)([□]_{0}^{π})   (trous : (2/π)([x³]_{0}^{π}))   ← Primitive
    = □   (trous : 2π²)   ← a₀
  — aₙ :  [juge equiv]  départ : (2/π)(∫_{0}^{π} 3x²cos(nx) dx)
    = (2/π)([□]_{0}^{π} − (1/n)(∫_{0}^{π} 6xsin(nx) dx))   (trous : (2/π)([3x²sin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} 6xsin(nx) dx)))   ← Par parties
    = (2/π)(−(1/n)(∫_{0}^{π} 6xsin(nx) dx))   ← Aux bornes
    = (2/π)(−(1/n)([□]_{0}^{π} + (1/n)(∫_{0}^{π} 6cos(nx) dx)))   (trous : (2/π)(−(1/n)([−6xcos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} 6cos(nx) dx))))   ← Par parties
    = □   (trous : 12(−1)^n/n²)   ← Simplifier
  aides : Parité d'abord : f est paire, donc bₙ = 0 ; a₀ se calcule à part. Puis aₙ = (2/π)∫₀^π … par parties, u = le polynôme. | aₙ = (2/π)(∫_{0}^{π} 3x²cos(nx) dx) | (2/π)([3x²sin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} 6xsin(nx) dx))
  pièges : f_interval_02pi, f_even_an_zero, f_a0_separate

f est 2π-périodique et f(x) = −1 si −π < x < 0 et f(x) = 1 si 0 < x < π. Calcule ses coefficients de Fourier (convention a₀/2, il reste les bₙ).
  [guided]  (2/π)(∫_{0}^{π} sin(nx) dx)
    ? Parité de f ? · f est paire : bₙ = 0, on calcule a₀ et aₙ / ✔ f est impaire : a₀ = aₙ = 0, on calcule bₙ / · f est impaire : bₙ = 0, on calcule aₙ / · Ni paire ni impaire : tout calculer
    (f impaire : a₀ = aₙ = 0.)
    (bₙ :)
    = (2/π)([□]_{0}^{π})   (trous : (2/π)([−cos(nx)/n]_{0}^{π}))   ← Primitive
    = □   (trous : 2(1 − (−1)^n)/(πn))   ← Simplifier
  — n pair : bₙ = 0. Pour n impair, n = 2k + 1 :  [juge equiv]  départ : 2(1 − (−1)^(2k + 1))/(π(2k + 1))
    = □   (trous : 4/(π(2k + 1)))   ← (−1)^(2k+1) = −1
  aides : Parité d'abord : f est impaire, donc a₀ = aₙ = 0. Puis bₙ = (2/π)∫₀^π … par parties, u = le polynôme. | bₙ = (2/π)(∫_{0}^{π} sin(nx) dx) | (2/π)([−cos(nx)/n]_{0}^{π})
  pièges : g3_reduce_swap, f_even_an_zero, f_ipp_sign

```

### Niveau 3

```
f est 2π-périodique et f(x) = 3x² sur ]−π ; π]. Calcule ses coefficients de Fourier (convention a₀/2).
  [tap, suivre l'erreur, menu steps]  (2/π)(∫_{0}^{π} 3x² dx)
    ? Parité de f ? ✔ f est paire : bₙ = 0, on calcule a₀ et aₙ / · f est impaire : a₀ = aₙ = 0, on calcule bₙ / · f est paire : aₙ = 0, on calcule bₙ / · Ni paire ni impaire : tout calculer
    ? Comment calculer a₀ ? ✔ À part, avec a₀ = (2/T)∫ f(x) dx / · Remplacer n par 0 dans la formule de aₙ
    (a₀ se calcule à part :)
    = (2/π)([x³]_{0}^{π})   ← Primitive
    = 2π²   ← a₀
  — aₙ :  [juge equiv]  départ : (2/π)(∫_{0}^{π} 3x²cos(nx) dx)
    = (2/π)([3x²sin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} 6xsin(nx) dx))   ← Par parties
    = (2/π)(−(1/n)(∫_{0}^{π} 6xsin(nx) dx))   ← Aux bornes
    = (2/π)(−(1/n)([−6xcos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} 6cos(nx) dx)))   ← Par parties
    = 12(−1)^n/n²   ← Simplifier
  aides : Parité d'abord : f est paire, donc bₙ = 0 ; a₀ se calcule à part. Puis aₙ = (2/π)∫₀^π … par parties, u = le polynôme. | aₙ = (2/π)(∫_{0}^{π} 3x²cos(nx) dx) | (2/π)([3x²sin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} 6xsin(nx) dx))
  pièges : f_interval_02pi, f_even_an_zero, f_a0_separate

f est 2π-périodique et f(x) = |x| sur ]−π ; π]. Calcule ses coefficients de Fourier (convention a₀/2).
  [tap, suivre l'erreur, menu steps]  (2/π)(∫_{0}^{π} x dx)
    ? Parité de f ? ✔ f est paire : bₙ = 0, on calcule a₀ et aₙ / · f est impaire : a₀ = aₙ = 0, on calcule bₙ / · f est paire : aₙ = 0, on calcule bₙ / · Ni paire ni impaire : tout calculer
    ? Comment calculer a₀ ? ✔ À part, avec a₀ = (2/T)∫ f(x) dx / · Remplacer n par 0 dans la formule de aₙ
    (a₀ se calcule à part :)
    = (2/π)([x²/2]_{0}^{π})   ← Primitive
    = π   ← a₀
  — aₙ :  [juge equiv]  départ : (2/π)(∫_{0}^{π} xcos(nx) dx)
    = (2/π)([xsin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} sin(nx) dx))   ← Par parties
    = (2/π)(−(1/n)(∫_{0}^{π} sin(nx) dx))   ← Aux bornes
    = (2/π)(−(1/n)([−cos(nx)/n]_{0}^{π}))   ← Primitive
    = 2((−1)^n − 1)/(πn²)   ← Simplifier
  — n pair : aₙ = 0. Pour n impair, n = 2k + 1 :  [juge equiv]  départ : 2((−1)^(2k + 1) − 1)/(π(2k + 1)²)
    = −4/(π(2k + 1)²)   ← (−1)^(2k+1) = −1
  aides : Parité d'abord : f est paire, donc bₙ = 0 ; a₀ se calcule à part. Puis aₙ = (2/π)∫₀^π … par parties, u = le polynôme. | aₙ = (2/π)(∫_{0}^{π} xcos(nx) dx) | (2/π)([xsin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} sin(nx) dx))
  pièges : f_interval_02pi, f_even_an_zero, f_a0_separate

f est 2π-périodique et f(x) = 3|x| sur ]−π ; π]. Calcule ses coefficients de Fourier (convention a₀/2).
  [tap, suivre l'erreur, menu steps]  (2/π)(∫_{0}^{π} 3x dx)
    ? Parité de f ? ✔ f est paire : bₙ = 0, on calcule a₀ et aₙ / · f est impaire : a₀ = aₙ = 0, on calcule bₙ / · f est paire : aₙ = 0, on calcule bₙ / · Ni paire ni impaire : tout calculer
    ? Comment calculer a₀ ? ✔ À part, avec a₀ = (2/T)∫ f(x) dx / · Remplacer n par 0 dans la formule de aₙ
    (a₀ se calcule à part :)
    = (2/π)([3x²/2]_{0}^{π})   ← Primitive
    = 3π   ← a₀
  — aₙ :  [juge equiv]  départ : (2/π)(∫_{0}^{π} 3xcos(nx) dx)
    = (2/π)([3xsin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} 3sin(nx) dx))   ← Par parties
    = (2/π)(−(1/n)(∫_{0}^{π} 3sin(nx) dx))   ← Aux bornes
    = (2/π)(−(1/n)([−3cos(nx)/n]_{0}^{π}))   ← Primitive
    = 6((−1)^n − 1)/(πn²)   ← Simplifier
  — n pair : aₙ = 0. Pour n impair, n = 2k + 1 :  [juge equiv]  départ : 6((−1)^(2k + 1) − 1)/(π(2k + 1)²)
    = −12/(π(2k + 1)²)   ← (−1)^(2k+1) = −1
  aides : Parité d'abord : f est paire, donc bₙ = 0 ; a₀ se calcule à part. Puis aₙ = (2/π)∫₀^π … par parties, u = le polynôme. | aₙ = (2/π)(∫_{0}^{π} 3xcos(nx) dx) | (2/π)([3xsin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} 3sin(nx) dx))
  pièges : f_interval_02pi, f_even_an_zero, f_a0_separate

```

### Niveau 4

```
f est 4-périodique et f(x) = x sur ]−2 ; 2]. Calcule ses coefficients de Fourier (convention a₀/2, il reste les bₙ).
  [free, suivre l'erreur]  ∫_{0}^{2} xsin(nπx/2) dx
    ? Parité de f ? · f est paire : bₙ = 0, on calcule a₀ et aₙ / ✔ f est impaire : a₀ = aₙ = 0, on calcule bₙ / · f est impaire : bₙ = 0, on calcule aₙ / · Ni paire ni impaire : tout calculer
    ? Période T = 4. Quelle pulsation ω = 2π/T ? ✔ ω = π/2 : les modes sont cos(nπ/2·x), sin(…) / · ω = 1 : les modes sont cos(nx), sin(nx) / · ω = 2π
    (f impaire : a₀ = aₙ = 0.)
    (bₙ :)
    = [−xcos(nπx/2)/(nπ/2)]_{0}^{2} + (1/(nπ/2))(∫_{0}^{2} cos(nπx/2) dx)   ← Par parties
    = 4(−1)^(n + 1)/(πn)   ← Simplifier
  aides : Parité d'abord : f est impaire, donc a₀ = aₙ = 0. Puis bₙ = ∫₀^2 … par parties, u = le polynôme. | bₙ = ∫_{0}^{2} xsin(nπx/2) dx | [−xcos(nπx/2)/(nπ/2)]_{0}^{2} + (1/(nπ/2))(∫_{0}^{2} cos(nπx/2) dx)
  pièges : g3_reduce_swap, f_even_an_zero, f_period_omega, f_ipp_sign

f est 2-périodique et f(x) = 2x sur ]−1 ; 1]. Calcule ses coefficients de Fourier (convention a₀/2, il reste les bₙ).
  [free, suivre l'erreur]  2(∫_{0}^{1} 2xsin(nπx) dx)
    ? Parité de f ? · f est paire : bₙ = 0, on calcule a₀ et aₙ / ✔ f est impaire : a₀ = aₙ = 0, on calcule bₙ / · f est impaire : bₙ = 0, on calcule aₙ / · Ni paire ni impaire : tout calculer
    ? Période T = 2. Quelle pulsation ω = 2π/T ? ✔ ω = π : les modes sont cos(nπx), sin(…) / · ω = 1 : les modes sont cos(nx), sin(nx) / · ω = 2π
    (f impaire : a₀ = aₙ = 0.)
    (bₙ :)
    = 2([−2xcos(nπx)/(nπ)]_{0}^{1} + (1/(nπ))(∫_{0}^{1} 2cos(nπx) dx))   ← Par parties
    = 4(−1)^(n + 1)/(πn)   ← Simplifier
  aides : Parité d'abord : f est impaire, donc a₀ = aₙ = 0. Puis bₙ = 2∫₀^1 … par parties, u = le polynôme. | bₙ = 2(∫_{0}^{1} 2xsin(nπx) dx) | 2([−2xcos(nπx)/(nπ)]_{0}^{1} + (1/(nπ))(∫_{0}^{1} 2cos(nπx) dx))
  pièges : g3_reduce_swap, f_even_an_zero, f_period_omega, f_ipp_sign

f est 2π-périodique et f(x) = |x| sur ]−π ; π]. Calcule ses coefficients de Fourier (convention a₀/2).
  [free, suivre l'erreur]  (2/π)(∫_{0}^{π} x dx)
    ? Parité de f ? ✔ f est paire : bₙ = 0, on calcule a₀ et aₙ / · f est impaire : a₀ = aₙ = 0, on calcule bₙ / · f est paire : aₙ = 0, on calcule bₙ / · Ni paire ni impaire : tout calculer
    (a₀ se calcule à part :)
    = (2/π)([x²/2]_{0}^{π})   ← Primitive
    = π   ← a₀
  — aₙ :  [juge equiv]  départ : (2/π)(∫_{0}^{π} xcos(nx) dx)
    = (2/π)([xsin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} sin(nx) dx))   ← Par parties
    = (2/π)(−(1/n)(∫_{0}^{π} sin(nx) dx))   ← Aux bornes
    = (2/π)(−(1/n)([−cos(nx)/n]_{0}^{π}))   ← Primitive
    = 2((−1)^n − 1)/(πn²)   ← Simplifier
  — n pair : aₙ = 0. Pour n impair, n = 2k + 1 :  [juge equiv]  départ : 2((−1)^(2k + 1) − 1)/(π(2k + 1)²)
    = −4/(π(2k + 1)²)   ← (−1)^(2k+1) = −1
  aides : Parité d'abord : f est paire, donc bₙ = 0 ; a₀ se calcule à part. Puis aₙ = (2/π)∫₀^π … par parties, u = le polynôme. | aₙ = (2/π)(∫_{0}^{π} xcos(nx) dx) | (2/π)([xsin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} sin(nx) dx))
  pièges : f_interval_02pi, f_even_an_zero

```

### Niveau 5

```
f est 2π-périodique et f(x) = 1 + cos(3x) + x² sur ]−π ; π]. Calcule a₀, les aₙ (indice 3 compris) et les bₙ.
  [free, sans aide]  (2/π)(∫_{0}^{π} (1 + cos(3x) + x²) dx)
    ? Parité de f ? ✔ f est paire : bₙ = 0, on calcule a₀ et aₙ / · f est impaire : a₀ = aₙ = 0, on calcule bₙ / · f est paire : aₙ = 0, on calcule bₙ / · Ni paire ni impaire : tout calculer
    (a₀ à part (f est paire : (2/π)∫₀^π) :)
    = (2/π)([x + sin(3x)/3 + x³/3]_{0}^{π})   ← Primitive
    = 2π²/3 + 2   ← a₀
  — La partie x² donne ãₙ (n ≥ 1) :  [juge equiv]  départ : (2/π)(∫_{0}^{π} x²cos(nx) dx)
    = (2/π)([x²sin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} 2xsin(nx) dx))   ← Par parties
    = (2/π)(−(1/n)(∫_{0}^{π} 2xsin(nx) dx))   ← Aux bornes
    = (2/π)(−(1/n)([−2xcos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} 2cos(nx) dx)))   ← Par parties
    = 4(−1)^n/n²   ← Simplifier
  — cos(3x) est son propre développement : il s'ajoute à a₃. Calcule a₃ :  [juge value]  départ : a_3
    = 5/9   ← 1 + ã₃
  pièges : f_interval_02pi, f_even_an_zero

f est 2π-périodique et f(x) = 1 + 2cos(x) + |x| sur ]−π ; π]. Calcule a₀, les aₙ (indice 1 compris) et les bₙ.
  [free, sans aide]  (2/π)(∫_{0}^{π} (1 + 2cos(x) + x) dx)
    ? Parité de f ? ✔ f est paire : bₙ = 0, on calcule a₀ et aₙ / · f est impaire : a₀ = aₙ = 0, on calcule bₙ / · f est paire : aₙ = 0, on calcule bₙ / · Ni paire ni impaire : tout calculer
    (a₀ à part (f est paire : (2/π)∫₀^π) :)
    = (2/π)([x + 2sin(x) + x²/2]_{0}^{π})   ← Primitive
    = π + 2   ← a₀
  — La partie |x| donne ãₙ (n ≥ 1) :  [juge equiv]  départ : (2/π)(∫_{0}^{π} xcos(nx) dx)
    = (2/π)([xsin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} sin(nx) dx))   ← Par parties
    = (2/π)(−(1/n)(∫_{0}^{π} sin(nx) dx))   ← Aux bornes
    = (2/π)(−(1/n)([−cos(nx)/n]_{0}^{π}))   ← Primitive
    = 2((−1)^n − 1)/(πn²)   ← Simplifier
  — Hors de n = 1, aₙ = ãₙ. n pair : ãₙ = 0. Pour n = 2k + 1 :  [juge equiv]  départ : 2((−1)^(2k + 1) − 1)/(π(2k + 1)²)
    = −4/(π(2k + 1)²)   ← (−1)^(2k+1) = −1
  — 2cos(x) est son propre développement : il s'ajoute à a₁. Calcule a₁ :  [juge value]  départ : a_1
    = 2 − 4/π   ← 2 + ã₁
  pièges : f_interval_02pi, f_even_an_zero

f est 2π-périodique et f(x) = 2 + cos(2x) + |x| sur ]−π ; π]. Calcule a₀, les aₙ (indice 2 compris) et les bₙ.
  [free, sans aide]  (2/π)(∫_{0}^{π} (2 + cos(2x) + x) dx)
    ? Parité de f ? ✔ f est paire : bₙ = 0, on calcule a₀ et aₙ / · f est impaire : a₀ = aₙ = 0, on calcule bₙ / · f est paire : aₙ = 0, on calcule bₙ / · Ni paire ni impaire : tout calculer
    (a₀ à part (f est paire : (2/π)∫₀^π) :)
    = (2/π)([2x + sin(2x)/2 + x²/2]_{0}^{π})   ← Primitive
    = π + 4   ← a₀
  — La partie |x| donne ãₙ (n ≥ 1) :  [juge equiv]  départ : (2/π)(∫_{0}^{π} xcos(nx) dx)
    = (2/π)([xsin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} sin(nx) dx))   ← Par parties
    = (2/π)(−(1/n)(∫_{0}^{π} sin(nx) dx))   ← Aux bornes
    = (2/π)(−(1/n)([−cos(nx)/n]_{0}^{π}))   ← Primitive
    = 2((−1)^n − 1)/(πn²)   ← Simplifier
  — Hors de n = 2, aₙ = ãₙ. n pair : ãₙ = 0. Pour n = 2k + 1 :  [juge equiv]  départ : 2((−1)^(2k + 1) − 1)/(π(2k + 1)²)
    = −4/(π(2k + 1)²)   ← (−1)^(2k+1) = −1
  — cos(2x) est son propre développement : il s'ajoute à a₂. Calcule a₂ :  [juge value]  départ : a_2
    = 1   ← 1 + ã₂
  pièges : f_interval_02pi, f_even_an_zero

```

### Variantes d'examen

```
f est 2π-périodique et f(x) = 2 + 3cos(3x) + |x| sur ]−π ; π]. Quelles affirmations sont vraies ? (plusieurs réponses possibles)
  ✔ bₙ = 0 pour tout n ≥ 1   · aₙ = 0 pour tout n ≥ 1 [f_even_an_zero]   ✔ a₂ = 0   ✔ a₃ = 3 − 4/(9π)   ✔ a₀ = π + 4
  [examen mcq]
  pièges : f_even_an_zero

f est 4-périodique et f(x) = 3x sur ]−2 ; 2]. Que vaut b₂ ?
  [free, sans aide, examen coef]  b_2
    = −6/π

f est 2π-périodique et f(x) = 1 + 2cos(2x) + 2|x| sur ]−π ; π]. Calcule a₀, les aₙ (indice 2 compris) et les bₙ.
  [problème, examen open, 5 points]
  partie 1 (Début du problème : 1 ; La partie 2|x| donne ãₙ (n ≥ 1) : 2 ; Hors de n = 2, aₙ = ãₙ. n pair : ãₙ = 0. Pour n = 2k + 1 : 1 ; 2cos(2x) est son propre développement : il s'ajoute à a₂. Calcule a₂ : 1)
    [free, sans aide, suivre l'erreur, examen open]  (2/π)(∫_{0}^{π} (1 + 2cos(2x) + 2x) dx)
      (a₀ à part (f est paire : (2/π)∫₀^π) :)
      = (2/π)([x + 2sin(2x)/2 + x²]_{0}^{π})   ← Primitive
      = 2π + 2   ← a₀
    — La partie 2|x| donne ãₙ (n ≥ 1) :  [juge equiv]  départ : (2/π)(∫_{0}^{π} 2xcos(nx) dx)
      = (2/π)([2xsin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} 2sin(nx) dx))   ← Par parties
      = (2/π)(−(1/n)(∫_{0}^{π} 2sin(nx) dx))   ← Aux bornes
      = (2/π)(−(1/n)([−2cos(nx)/n]_{0}^{π}))   ← Primitive
      = 4((−1)^n − 1)/(πn²)   ← Simplifier
    — Hors de n = 2, aₙ = ãₙ. n pair : ãₙ = 0. Pour n = 2k + 1 :  [juge equiv]  départ : 4((−1)^(2k + 1) − 1)/(π(2k + 1)²)
      = −8/(π(2k + 1)²)   ← (−1)^(2k+1) = −1
    — 2cos(2x) est son propre développement : il s'ajoute à a₂. Calcule a₂ :  [juge value]  départ : a_2
      = 2   ← 2 + ã₂
  pièges : f_interval_02pi

```

## Coefficients complexes cₙ d'une somme d'exponentielles (`f-coef-complex`, BA4)

_cₖ = (aₖ − ibₖ)/2 se lisent sans intégrer ; aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ)._

### Niveau 1

```
f(x) = −1 − e^(3ix) − e^(−3ix) + (−1/2)e^(7ix) + (−1/2)e^(−7ix). Lis ses coefficients cₖ et donne ses coefficients réels aₖ, bₖ (convention a₀/2).
  [guided]  a_3
    (Formules : aₖ = cₖ + c₋ₖ et bₖ = i(cₖ − c₋ₖ).)
    (a₃ = c₃ + c₋₃ :)
    = (−1) + (−1)   ← c₃ + c₋₃
    = −2
  — b₃ = i(c₃ − c₋₃) :  [juge fcomplex]  départ : b_3
    = i((−1) − (−1))   ← i(c₃ − c₋₃)
    = 0   ← i² = −1
  — Le terme constant : a₀/2 = c₀ :  [juge fcomplex]  départ : a_0
    = □   (trous : −2)   ← a₀ = 2c₀
  aides : cos(kx) = (e^(ikx) + e^(−ikx))/2 et sin(kx) = (e^(ikx) − e^(−ikx))/(2i) : on lit les cₖ. Puis aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ). | a₃ = (−1) + (−1) | a₃ = −2
  pièges : f_coef_complex_convert

f(x) = 1 − cos(4x) − 2sin(4x) − 2sin(6x). Donne ses coefficients complexes cₖ (sans intégrer).
  [guided]  c_4
    (Formules : cₖ = (aₖ − ibₖ)/2, c₋ₖ = (aₖ + ibₖ)/2.)
    (c₄ = (a₄ − ib₄)/2 :)
    = (−1 + □)/2   (trous : (−1 + 2i)/2)   ← (a₄ − ib₄)/2
    = −1/2 + i
  — c₋₄ = (a₄ + ib₄)/2 = conj(c₄) :  [juge fcomplex]  départ : c_(−4)
    = □   (trous : −1/2 − i)   ← Le conjugué : f est réelle
  aides : cos(kx) = (e^(ikx) + e^(−ikx))/2 et sin(kx) = (e^(ikx) − e^(−ikx))/(2i) : on lit les cₖ. Puis aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ). | c₄ = (−1 + 2i)/2 | c₄ = −1/2 + i
  pièges : f_coef_complex_convert

f(x) = 1 + (−1 − i/4)e^(2ix) + (−1 + i/4)e^(−2ix) + (−1/2 + i/2)e^(5ix) + (−1/2 − i/2)e^(−5ix). Lis ses coefficients cₖ et donne ses coefficients réels aₖ, bₖ (convention a₀/2).
  [guided]  a_2
    (Formules : aₖ = cₖ + c₋ₖ et bₖ = i(cₖ − c₋ₖ).)
    (a₂ = c₂ + c₋₂ :)
    = (−1 − i/4) + (−1 + i/4)   ← c₂ + c₋₂
    = −2
  — b₂ = i(c₂ − c₋₂) :  [juge fcomplex]  départ : b_2
    = i((−1 − i/4) − (−1 + i/4))   ← i(c₂ − c₋₂)
    = 1/2   ← i² = −1
  — Le terme constant : a₀/2 = c₀ :  [juge fcomplex]  départ : a_0
    = □   (trous : 2)   ← a₀ = 2c₀
  aides : cos(kx) = (e^(ikx) + e^(−ikx))/2 et sin(kx) = (e^(ikx) − e^(−ikx))/(2i) : on lit les cₖ. Puis aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ). | a₂ = (−1 − i/4) + (−1 + i/4) | a₂ = −2
  pièges : f_coef_complex_convert

```

### Niveau 2

```
f(x) = (1/2)cos(3x) + sin(3x) + (3/2)sin(5x). Donne ses coefficients complexes cₖ (sans intégrer).
  [guided]  c_3
    ? Dans quel sens convertir ? · Des cₖ vers les aₖ, bₖ : aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ) / ✔ Des aₖ, bₖ vers les cₖ : cₖ = (aₖ − ibₖ)/2 / · bₖ = cₖ − c₋ₖ
    (c₃ = (a₃ − ib₃)/2 :)
    = (1/2 − □)/2   (trous : (1/2 − i)/2)   ← (a₃ − ib₃)/2
    = □   (trous : 1/4 − i/2)
  — c₋₃ = (a₃ + ib₃)/2 = conj(c₃) :  [juge fcomplex]  départ : c_(−3)
    = □   (trous : 1/4 + i/2)   ← Le conjugué : f est réelle
  aides : cos(kx) = (e^(ikx) + e^(−ikx))/2 et sin(kx) = (e^(ikx) − e^(−ikx))/(2i) : on lit les cₖ. Puis aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ). | c₃ = (1/2 − i)/2 | c₃ = 1/4 − i/2
  pièges : f_coef_complex_convert

f(x) = 1 + (1 − 3i/2)e^(ix) + (1 + 3i/2)e^(−ix) − e^(6ix) − e^(−6ix). Lis ses coefficients cₖ et donne ses coefficients réels aₖ, bₖ (convention a₀/2).
  [guided]  a_1
    ? Dans quel sens convertir ? ✔ Des cₖ vers les aₖ, bₖ : aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ) / · Des aₖ, bₖ vers les cₖ : cₖ = (aₖ − ibₖ)/2 / · bₖ = cₖ − c₋ₖ
    (a₁ = c₁ + c₋₁ :)
    = (1 − 3i/2) + (1 + 3i/2)   ← c₁ + c₋₁
    = □   (trous : 2)
  — b₁ = i(c₁ − c₋₁) :  [juge fcomplex]  départ : b_1
    = i((1 − 3i/2) − (1 + 3i/2))   ← i(c₁ − c₋₁)
    = □   (trous : 3)   ← i² = −1
  — Le terme constant : a₀/2 = c₀ :  [juge fcomplex]  départ : a_0
    = □   (trous : 2)   ← a₀ = 2c₀
  aides : cos(kx) = (e^(ikx) + e^(−ikx))/2 et sin(kx) = (e^(ikx) − e^(−ikx))/(2i) : on lit les cₖ. Puis aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ). | a₁ = (1 − 3i/2) + (1 + 3i/2) | a₁ = 2
  pièges : f_coef_complex_convert

f(x) = −1 + (3/4)e^(3ix) + (3/4)e^(−3ix) + (−i/2)e^(7ix) + (i/2)e^(−7ix). Lis ses coefficients cₖ et donne ses coefficients réels aₖ, bₖ (convention a₀/2).
  [guided]  a_3
    ? Dans quel sens convertir ? ✔ Des cₖ vers les aₖ, bₖ : aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ) / · Des aₖ, bₖ vers les cₖ : cₖ = (aₖ − ibₖ)/2 / · bₖ = cₖ − c₋ₖ
    (a₃ = c₃ + c₋₃ :)
    = □ + 3/4   (trous : 3/4 + 3/4)   ← c₃ + c₋₃
    = □   (trous : 3/2)
  — b₃ = i(c₃ − c₋₃) :  [juge fcomplex]  départ : b_3
    = i(□ − 3/4)   (trous : i(3/4 − 3/4))   ← i(c₃ − c₋₃)
    = □   (trous : 0)   ← i² = −1
  — Le terme constant : a₀/2 = c₀ :  [juge fcomplex]  départ : a_0
    = □   (trous : −2)   ← a₀ = 2c₀
  aides : cos(kx) = (e^(ikx) + e^(−ikx))/2 et sin(kx) = (e^(ikx) − e^(−ikx))/(2i) : on lit les cₖ. Puis aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ). | a₃ = 3/4 + 3/4 | a₃ = 3/2
  pièges : f_coef_complex_convert

```

### Niveau 3

```
f(x) = 2 + (−i/4)e^(ix) + (i/4)e^(−ix) + (1 + i)e^(6ix) + (1 − i)e^(−6ix). Lis ses coefficients cₖ et donne ses coefficients réels aₖ, bₖ (convention a₀/2).
  [tap, suivre l'erreur, menu steps]  a_1
    ? Dans quel sens convertir ? ✔ Des cₖ vers les aₖ, bₖ : aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ) / · Des aₖ, bₖ vers les cₖ : cₖ = (aₖ − ibₖ)/2 / · bₖ = cₖ − c₋ₖ
    (a₁ = c₁ + c₋₁ :)
    = (−i/4) + (i/4)   ← c₁ + c₋₁
    = 0
  — b₁ = i(c₁ − c₋₁) :  [juge fcomplex]  départ : b_1
    = i((−i/4) − (i/4))   ← i(c₁ − c₋₁)
    = 1/2   ← i² = −1
  — a₆ = c₆ + c₋₆ :  [juge fcomplex]  départ : a_6
    = (1 + i) + (1 − i)   ← c₆ + c₋₆
    = 2
  — b₆ = i(c₆ − c₋₆) :  [juge fcomplex]  départ : b_6
    = i((1 + i) − (1 − i))   ← i(c₆ − c₋₆)
    = −2   ← i² = −1
  — Le terme constant : a₀/2 = c₀ :  [juge fcomplex]  départ : a_0
    = 4   ← a₀ = 2c₀
  aides : cos(kx) = (e^(ikx) + e^(−ikx))/2 et sin(kx) = (e^(ikx) − e^(−ikx))/(2i) : on lit les cₖ. Puis aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ). | a₁ = (−i/4) + (i/4) | a₁ = 0
  pièges : f_coef_complex_convert

f(x) = 1 + 3cos(x) + 2sin(x) + sin(6x). Donne ses coefficients complexes cₖ (sans intégrer).
  [tap, suivre l'erreur, menu steps]  c_1
    ? Dans quel sens convertir ? · Des cₖ vers les aₖ, bₖ : aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ) / ✔ Des aₖ, bₖ vers les cₖ : cₖ = (aₖ − ibₖ)/2 / · bₖ = cₖ − c₋ₖ
    (c₁ = (a₁ − ib₁)/2 :)
    = (3 − 2i)/2   ← (a₁ − ib₁)/2
    = 3/2 − i
  — c₋₁ = (a₁ + ib₁)/2 = conj(c₁) :  [juge fcomplex]  départ : c_(−1)
    = 3/2 + i   ← Le conjugué : f est réelle
  — c₆ = (a₆ − ib₆)/2 :  [juge fcomplex]  départ : c_6
    = −i/2
  — c₋₆ = (a₆ + ib₆)/2 = conj(c₆) :  [juge fcomplex]  départ : c_(−6)
    = i/2   ← Le conjugué : f est réelle
  aides : cos(kx) = (e^(ikx) + e^(−ikx))/2 et sin(kx) = (e^(ikx) − e^(−ikx))/(2i) : on lit les cₖ. Puis aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ). | c₁ = (3 − 2i)/2 | c₁ = 3/2 − i
  pièges : f_coef_complex_convert

f(x) = 1 + e^(3ix) + e^(−3ix) + (−3i/2)e^(7ix) + (3i/2)e^(−7ix). Lis ses coefficients cₖ et donne ses coefficients réels aₖ, bₖ (convention a₀/2).
  [tap, suivre l'erreur, menu steps]  a_3
    ? Dans quel sens convertir ? ✔ Des cₖ vers les aₖ, bₖ : aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ) / · Des aₖ, bₖ vers les cₖ : cₖ = (aₖ − ibₖ)/2 / · bₖ = cₖ − c₋ₖ
    (a₃ = c₃ + c₋₃ :)
    = 1 + 1   ← c₃ + c₋₃
    = 2
  — b₃ = i(c₃ − c₋₃) :  [juge fcomplex]  départ : b_3
    = i(1 − 1)   ← i(c₃ − c₋₃)
    = 0   ← i² = −1
  — a₇ = c₇ + c₋₇ :  [juge fcomplex]  départ : a_7
    = (−3i/2) + (3i/2)   ← c₇ + c₋₇
    = 0
  — b₇ = i(c₇ − c₋₇) :  [juge fcomplex]  départ : b_7
    = i((−3i/2) − (3i/2))   ← i(c₇ − c₋₇)
    = 3   ← i² = −1
  — Le terme constant : a₀/2 = c₀ :  [juge fcomplex]  départ : a_0
    = 2   ← a₀ = 2c₀
  aides : cos(kx) = (e^(ikx) + e^(−ikx))/2 et sin(kx) = (e^(ikx) − e^(−ikx))/(2i) : on lit les cₖ. Puis aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ). | a₃ = 1 + 1 | a₃ = 2
  pièges : f_coef_complex_convert

```

### Niveau 4

```
f(x) = 5 + (−3i/2)e^(2ix) + (3i/2)e^(−2ix) + (3/2 + i/2)e^(6ix) + (3/2 − i/2)e^(−6ix). Lis ses coefficients cₖ et donne ses coefficients réels aₖ, bₖ (convention a₀/2).
  [free, suivre l'erreur]  a_2
    ? Dans quel sens convertir ? ✔ Des cₖ vers les aₖ, bₖ : aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ) / · Des aₖ, bₖ vers les cₖ : cₖ = (aₖ − ibₖ)/2 / · bₖ = cₖ − c₋ₖ
    (a₂ = c₂ + c₋₂ :)
    = (−3i/2) + (3i/2)   ← c₂ + c₋₂
    = 0
  — b₂ = i(c₂ − c₋₂) :  [juge fcomplex]  départ : b_2
    = i((−3i/2) − (3i/2))   ← i(c₂ − c₋₂)
    = 3   ← i² = −1
  — a₆ = c₆ + c₋₆ :  [juge fcomplex]  départ : a_6
    = (3/2 + i/2) + (3/2 − i/2)   ← c₆ + c₋₆
    = 3
  — b₆ = i(c₆ − c₋₆) :  [juge fcomplex]  départ : b_6
    = i((3/2 + i/2) − (3/2 − i/2))   ← i(c₆ − c₋₆)
    = −1   ← i² = −1
  — Le terme constant : a₀/2 = c₀ :  [juge fcomplex]  départ : a_0
    = 10   ← a₀ = 2c₀
  aides : cos(kx) = (e^(ikx) + e^(−ikx))/2 et sin(kx) = (e^(ikx) − e^(−ikx))/(2i) : on lit les cₖ. Puis aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ). | a₂ = (−3i/2) + (3i/2) | a₂ = 0
  pièges : f_coef_complex_convert

f(x) = 5 + (3/2)e^(3ix) + (3/2)e^(−3ix) + (3/2)e^(6ix) + (3/2)e^(−6ix). Lis ses coefficients cₖ et donne ses coefficients réels aₖ, bₖ (convention a₀/2).
  [free, suivre l'erreur]  a_3
    ? Dans quel sens convertir ? ✔ Des cₖ vers les aₖ, bₖ : aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ) / · Des aₖ, bₖ vers les cₖ : cₖ = (aₖ − ibₖ)/2 / · bₖ = cₖ − c₋ₖ
    (a₃ = c₃ + c₋₃ :)
    = 3/2 + 3/2   ← c₃ + c₋₃
    = 3
  — b₃ = i(c₃ − c₋₃) :  [juge fcomplex]  départ : b_3
    = i(3/2 − 3/2)   ← i(c₃ − c₋₃)
    = 0   ← i² = −1
  — a₆ = c₆ + c₋₆ :  [juge fcomplex]  départ : a_6
    = 3/2 + 3/2   ← c₆ + c₋₆
    = 3
  — b₆ = i(c₆ − c₋₆) :  [juge fcomplex]  départ : b_6
    = i(3/2 − 3/2)   ← i(c₆ − c₋₆)
    = 0   ← i² = −1
  — Le terme constant : a₀/2 = c₀ :  [juge fcomplex]  départ : a_0
    = 10   ← a₀ = 2c₀
  aides : cos(kx) = (e^(ikx) + e^(−ikx))/2 et sin(kx) = (e^(ikx) − e^(−ikx))/(2i) : on lit les cₖ. Puis aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ). | a₃ = 3/2 + 3/2 | a₃ = 3
  pièges : f_coef_complex_convert

f(x) = 2 + (3/2 − i/2)e^(ix) + (3/2 + i/2)e^(−ix) + (1/2)e^(3ix) + (1/2)e^(−3ix). Lis ses coefficients cₖ et donne ses coefficients réels aₖ, bₖ (convention a₀/2).
  [free, suivre l'erreur]  a_1
    ? Dans quel sens convertir ? ✔ Des cₖ vers les aₖ, bₖ : aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ) / · Des aₖ, bₖ vers les cₖ : cₖ = (aₖ − ibₖ)/2 / · bₖ = cₖ − c₋ₖ
    (a₁ = c₁ + c₋₁ :)
    = (3/2 − i/2) + (3/2 + i/2)   ← c₁ + c₋₁
    = 3
  — b₁ = i(c₁ − c₋₁) :  [juge fcomplex]  départ : b_1
    = i((3/2 − i/2) − (3/2 + i/2))   ← i(c₁ − c₋₁)
    = 1   ← i² = −1
  — a₃ = c₃ + c₋₃ :  [juge fcomplex]  départ : a_3
    = 1/2 + 1/2   ← c₃ + c₋₃
    = 1
  — b₃ = i(c₃ − c₋₃) :  [juge fcomplex]  départ : b_3
    = i(1/2 − 1/2)   ← i(c₃ − c₋₃)
    = 0   ← i² = −1
  — Le terme constant : a₀/2 = c₀ :  [juge fcomplex]  départ : a_0
    = 4   ← a₀ = 2c₀
  aides : cos(kx) = (e^(ikx) + e^(−ikx))/2 et sin(kx) = (e^(ikx) − e^(−ikx))/(2i) : on lit les cₖ. Puis aₖ = cₖ + c₋ₖ, bₖ = i(cₖ − c₋ₖ). | a₁ = (3/2 − i/2) + (3/2 + i/2) | a₁ = 3
  pièges : f_coef_complex_convert

```

### Niveau 5

```
f(x) = −2sin(x) + (3/4 + i/2)e^(4ix) + (3/4 − i/2)e^(−4ix). Donne c₁, c₋₁, puis a₄, b₄.
  [free, sans aide]  c_1
    (c₁ = (a₁ − ib₁)/2 :)
    = i
  — c₋₁ = (a₁ + ib₁)/2 = conj(c₁) :  [juge fcomplex]  départ : c_(−1)
    = −i   ← Le conjugué : f est réelle
  — a₄ = c₄ + c₋₄ :  [juge fcomplex]  départ : a_4
    = (3/4 + i/2) + (3/4 − i/2)   ← c₄ + c₋₄
    = 3/2
  — b₄ = i(c₄ − c₋₄) :  [juge fcomplex]  départ : b_4
    = i((3/4 + i/2) − (3/4 − i/2))   ← i(c₄ − c₋₄)
    = −1   ← i² = −1
  pièges : f_coef_complex_convert

f(x) = −cos(3x) + 2sin(3x) + 1 + (−3i/4)e^(7ix) + (3i/4)e^(−7ix). Donne c₃, c₋₃, puis a₇, b₇ et a₀.
  [free, sans aide]  c_3
    (c₃ = (a₃ − ib₃)/2 :)
    = (−1 − 2i)/2   ← (a₃ − ib₃)/2
    = −1/2 − i
  — c₋₃ = (a₃ + ib₃)/2 = conj(c₃) :  [juge fcomplex]  départ : c_(−3)
    = −1/2 + i   ← Le conjugué : f est réelle
  — a₇ = c₇ + c₋₇ :  [juge fcomplex]  départ : a_7
    = (−3i/4) + (3i/4)   ← c₇ + c₋₇
    = 0
  — b₇ = i(c₇ − c₋₇) :  [juge fcomplex]  départ : b_7
    = i((−3i/4) − (3i/4))   ← i(c₇ − c₋₇)
    = 3/2   ← i² = −1
  — Le terme constant : a₀/2 = c₀ :  [juge fcomplex]  départ : a_0
    = 2   ← a₀ = 2c₀
  pièges : f_coef_complex_convert

f(x) = (1/2)sin(3x) + (3/4 − i/2)e^(7ix) + (3/4 + i/2)e^(−7ix). Donne c₃, c₋₃, puis a₇, b₇.
  [free, sans aide]  c_3
    (c₃ = (a₃ − ib₃)/2 :)
    = −i/4
  — c₋₃ = (a₃ + ib₃)/2 = conj(c₃) :  [juge fcomplex]  départ : c_(−3)
    = i/4   ← Le conjugué : f est réelle
  — a₇ = c₇ + c₋₇ :  [juge fcomplex]  départ : a_7
    = (3/4 − i/2) + (3/4 + i/2)   ← c₇ + c₋₇
    = 3/2
  — b₇ = i(c₇ − c₋₇) :  [juge fcomplex]  départ : b_7
    = i((3/4 − i/2) − (3/4 + i/2))   ← i(c₇ − c₋₇)
    = 1   ← i² = −1
  pièges : f_coef_complex_convert

```

### Variantes d'examen

```
f(x) = −1 + (1/4 − 3i/4)e^(3ix) + (1/4 + 3i/4)e^(−3ix) + (−3i/4)e^(6ix) + (3i/4)e^(−6ix), 2π-périodique. Quelles affirmations sur ses coefficients sont vraies ? (plusieurs réponses possibles)
  · c₋₃ = 1/4 − 3i/4 [f_coef_complex_convert]   ✔ c₃ = 1/4 − 3i/4   ✔ c₇ = 0   ✔ c₀ = −1   · a₀ = −1 [f_a0_separate]   · c₆ = 3i/4 [f_coef_complex_convert]
  [examen mcq]
  pièges : f_coef_complex_convert, f_a0_separate

```

## Séries en sinus et en cosinus sur [0 ; L] (`f-sine-cosine`, BA4)

_Série en sinus : prolongement impair, bₙ = (2/L)∫₀^L f sin(nπx/L)._

### Niveau 1

```
f(x) = 3 sur [0 ; π]. Calcule les coefficients de sa série en sinus (prolongement impair, période 2π).
  [guided]  (2/π)(∫_{0}^{π} 3sin(nx) dx)
    (Formule : Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx.)
    (bₙ :)
    = (2/π)([□]_{0}^{π})   (trous : (2/π)([−3cos(nx)/n]_{0}^{π}))   ← Primitive
    = □   (trous : 6(1 − (−1)^n)/(πn))   ← Simplifier
  aides : Prolongement impair : seulement des bₙ, intégrale sur [0 ; L] avec le facteur 2/L. | bₙ = (2/π)(∫_{0}^{π} 3sin(nx) dx) | (2/π)([−3cos(nx)/n]_{0}^{π})
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

f(x) = 3 sur [0 ; π]. Calcule les coefficients de sa série en sinus (prolongement impair, période 2π).
  [guided]  (2/π)(∫_{0}^{π} 3sin(nx) dx)
    (Formule : Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx.)
    (bₙ :)
    = (2/π)([□]_{0}^{π})   (trous : (2/π)([−3cos(nx)/n]_{0}^{π}))   ← Primitive
    = □   (trous : 6(1 − (−1)^n)/(πn))   ← Simplifier
  aides : Prolongement impair : seulement des bₙ, intégrale sur [0 ; L] avec le facteur 2/L. | bₙ = (2/π)(∫_{0}^{π} 3sin(nx) dx) | (2/π)([−3cos(nx)/n]_{0}^{π})
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

f(x) = x² sur [0 ; π]. Calcule les coefficients de sa série en sinus (prolongement impair, période 2π).
  [guided]  (2/π)(∫_{0}^{π} x²sin(nx) dx)
    (Formule : Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx.)
    (bₙ :)
    = (2/π)([□]_{0}^{π} + (1/n)(∫_{0}^{π} 2xcos(nx) dx))   (trous : (2/π)([−x²cos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} 2xcos(nx) dx)))   ← Par parties
    = (2/π)(□ + (1/n)(∫_{0}^{π} 2xcos(nx) dx))   (trous : (2/π)(π²(−1)^(n + 1)/n + (1/n)(∫_{0}^{π} 2xcos(nx) dx)))   ← Aux bornes
    = (2/π)(π²(−1)^(n + 1)/n + (1/n)([□]_{0}^{π} − (1/n)(∫_{0}^{π} 2sin(nx) dx)))   (trous : (2/π)(π²(−1)^(n + 1)/n + (1/n)([2xsin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} 2sin(nx) dx))))   ← Par parties
    = (2/π)(π²(−1)^(n + 1)/n + (1/n)(−(1/n)(∫_{0}^{π} 2sin(nx) dx)))   ← Aux bornes
    = (2/π)(π²(−1)^(n + 1)/n + (1/n)(−(1/n)([□]_{0}^{π})))   (trous : (2/π)(π²(−1)^(n + 1)/n + (1/n)(−(1/n)([−2cos(nx)/n]_{0}^{π}))))   ← Primitive
    = □   (trous : 2π(−1)^(n + 1)/n + 4((−1)^n − 1)/(πn³))   ← Simplifier
  aides : Prolongement impair : seulement des bₙ, intégrale sur [0 ; L] avec le facteur 2/L. | bₙ = (2/π)(∫_{0}^{π} x²sin(nx) dx) | (2/π)([−x²cos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} 2xcos(nx) dx))
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

```

### Niveau 2

```
f(x) = 3 sur [0 ; 1]. Calcule les coefficients de sa série en sinus (prolongement impair, période 2).
  [guided]  2(∫_{0}^{1} 3sin(nπx) dx)
    ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = 2∫₀^1 f(x) sin(nπx) dx / · bₙ = ∫₀^1 f(x) sin(nπx) dx / · aₙ = 2∫₀^1 f(x) cos(nπx) dx
    (bₙ :)
    = 2([□]_{0}^{1})   (trous : 2([−3cos(nπx)/(nπ)]_{0}^{1}))   ← Primitive
    = □   (trous : 6(1 − (−1)^n)/(πn))   ← Simplifier
  — n pair : bₙ = 0. Pour n impair, n = 2k + 1 :  [juge equiv]  départ : 6(1 − (−1)^(2k + 1))/(π(2k + 1))
    = □   (trous : 12/(π(2k + 1)))   ← (−1)^(2k+1) = −1
  aides : Prolongement impair : seulement des bₙ, intégrale sur [0 ; L] avec le facteur 2/L. | bₙ = 2(∫_{0}^{1} 3sin(nπx) dx) | 2([−3cos(nπx)/(nπ)]_{0}^{1})
  pièges : g3_reduce_swap, f_sine_wrong_factor, f_ipp_sign

f(x) = 3 sur [0 ; π]. Calcule les coefficients de sa série en sinus (prolongement impair, période 2π).
  [guided]  (2/π)(∫_{0}^{π} 3sin(nx) dx)
    ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx / · bₙ = (1/π)∫₀^π f(x) sin(nx) dx / · aₙ = (2/π)∫₀^π f(x) cos(nx) dx / · bₙ = (1/π)∫₀^2π f(x) sin(nx) dx
    (bₙ :)
    = (2/π)([□]_{0}^{π})   (trous : (2/π)([−3cos(nx)/n]_{0}^{π}))   ← Primitive
    = □   (trous : 6(1 − (−1)^n)/(πn))   ← Simplifier
  — n pair : bₙ = 0. Pour n impair, n = 2k + 1 :  [juge equiv]  départ : 6(1 − (−1)^(2k + 1))/(π(2k + 1))
    = □   (trous : 12/(π(2k + 1)))   ← (−1)^(2k+1) = −1
  aides : Prolongement impair : seulement des bₙ, intégrale sur [0 ; L] avec le facteur 2/L. | bₙ = (2/π)(∫_{0}^{π} 3sin(nx) dx) | (2/π)([−3cos(nx)/n]_{0}^{π})
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

f(x) = 1 sur [0 ; π]. Calcule les coefficients de sa série en sinus (prolongement impair, période 2π).
  [guided]  (2/π)(∫_{0}^{π} sin(nx) dx)
    ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx / · bₙ = (1/π)∫₀^π f(x) sin(nx) dx / · aₙ = (2/π)∫₀^π f(x) cos(nx) dx / · bₙ = (1/π)∫₀^2π f(x) sin(nx) dx
    (bₙ :)
    = (2/π)([□]_{0}^{π})   (trous : (2/π)([−cos(nx)/n]_{0}^{π}))   ← Primitive
    = □   (trous : 2(1 − (−1)^n)/(πn))   ← Simplifier
  — n pair : bₙ = 0. Pour n impair, n = 2k + 1 :  [juge equiv]  départ : 2(1 − (−1)^(2k + 1))/(π(2k + 1))
    = □   (trous : 4/(π(2k + 1)))   ← (−1)^(2k+1) = −1
  aides : Prolongement impair : seulement des bₙ, intégrale sur [0 ; L] avec le facteur 2/L. | bₙ = (2/π)(∫_{0}^{π} sin(nx) dx) | (2/π)([−cos(nx)/n]_{0}^{π})
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

```

### Niveau 3

```
f(x) = 2x² sur [0 ; π]. Calcule les coefficients de sa série en sinus (prolongement impair, période 2π).
  [tap, suivre l'erreur, menu steps]  (2/π)(∫_{0}^{π} 2x²sin(nx) dx)
    ? On demande la série en sinus de f : quel prolongement à [−π ; π] ? ✔ Impair / · Pair
    ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx / · bₙ = (1/π)∫₀^π f(x) sin(nx) dx / · aₙ = (2/π)∫₀^π f(x) cos(nx) dx / · bₙ = (1/π)∫₀^2π f(x) sin(nx) dx
    (bₙ :)
    = (2/π)([−2x²cos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} 4xcos(nx) dx))   ← Par parties
    = (2/π)(2π²(−1)^(n + 1)/n + (1/n)(∫_{0}^{π} 4xcos(nx) dx))   ← Aux bornes
    = (2/π)(2π²(−1)^(n + 1)/n + (1/n)([4xsin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} 4sin(nx) dx)))   ← Par parties
    = (2/π)(2π²(−1)^(n + 1)/n + (1/n)(−(1/n)(∫_{0}^{π} 4sin(nx) dx)))   ← Aux bornes
    = (2/π)(2π²(−1)^(n + 1)/n + (1/n)(−(1/n)([−4cos(nx)/n]_{0}^{π})))   ← Primitive
    = 4π(−1)^(n + 1)/n + 8((−1)^n − 1)/(πn³)   ← Simplifier
  aides : Prolongement impair : seulement des bₙ, intégrale sur [0 ; L] avec le facteur 2/L. | bₙ = (2/π)(∫_{0}^{π} 2x²sin(nx) dx) | (2/π)([−2x²cos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} 4xcos(nx) dx))
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

f(x) = 3x² sur [0 ; π]. Calcule les coefficients de sa série en sinus (prolongement impair, période 2π).
  [tap, suivre l'erreur, menu steps]  (2/π)(∫_{0}^{π} 3x²sin(nx) dx)
    ? On demande la série en sinus de f : quel prolongement à [−π ; π] ? ✔ Impair / · Pair
    ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx / · bₙ = (1/π)∫₀^π f(x) sin(nx) dx / · aₙ = (2/π)∫₀^π f(x) cos(nx) dx / · bₙ = (1/π)∫₀^2π f(x) sin(nx) dx
    (bₙ :)
    = (2/π)([−3x²cos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} 6xcos(nx) dx))   ← Par parties
    = (2/π)(3π²(−1)^(n + 1)/n + (1/n)(∫_{0}^{π} 6xcos(nx) dx))   ← Aux bornes
    = (2/π)(3π²(−1)^(n + 1)/n + (1/n)([6xsin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} 6sin(nx) dx)))   ← Par parties
    = (2/π)(3π²(−1)^(n + 1)/n + (1/n)(−(1/n)(∫_{0}^{π} 6sin(nx) dx)))   ← Aux bornes
    = (2/π)(3π²(−1)^(n + 1)/n + (1/n)(−(1/n)([−6cos(nx)/n]_{0}^{π})))   ← Primitive
    = 6π(−1)^(n + 1)/n + 12((−1)^n − 1)/(πn³)   ← Simplifier
  aides : Prolongement impair : seulement des bₙ, intégrale sur [0 ; L] avec le facteur 2/L. | bₙ = (2/π)(∫_{0}^{π} 3x²sin(nx) dx) | (2/π)([−3x²cos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} 6xcos(nx) dx))
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

f(x) = 2 sur [0 ; π]. Calcule les coefficients de sa série en sinus (prolongement impair, période 2π).
  [tap, suivre l'erreur, menu steps]  (2/π)(∫_{0}^{π} 2sin(nx) dx)
    ? On demande la série en sinus de f : quel prolongement à [−π ; π] ? ✔ Impair / · Pair
    ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx / · bₙ = (1/π)∫₀^π f(x) sin(nx) dx / · aₙ = (2/π)∫₀^π f(x) cos(nx) dx / · bₙ = (1/π)∫₀^2π f(x) sin(nx) dx
    (bₙ :)
    = (2/π)([−2cos(nx)/n]_{0}^{π})   ← Primitive
    = 4(1 − (−1)^n)/(πn)   ← Simplifier
  — n pair : bₙ = 0. Pour n impair, n = 2k + 1 :  [juge equiv]  départ : 4(1 − (−1)^(2k + 1))/(π(2k + 1))
    = 8/(π(2k + 1))   ← (−1)^(2k+1) = −1
  aides : Prolongement impair : seulement des bₙ, intégrale sur [0 ; L] avec le facteur 2/L. | bₙ = (2/π)(∫_{0}^{π} 2sin(nx) dx) | (2/π)([−2cos(nx)/n]_{0}^{π})
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

```

### Niveau 4

```
f(x) = 2 sur [0 ; π]. Calcule les coefficients de sa série en sinus (prolongement impair, période 2π).
  [free, suivre l'erreur]  (2/π)(∫_{0}^{π} 2sin(nx) dx)
    ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx / · bₙ = (1/π)∫₀^π f(x) sin(nx) dx / · aₙ = (2/π)∫₀^π f(x) cos(nx) dx / · bₙ = (1/π)∫₀^2π f(x) sin(nx) dx
    (bₙ :)
    = (2/π)([−2cos(nx)/n]_{0}^{π})   ← Primitive
    = 4(1 − (−1)^n)/(πn)   ← Simplifier
  — n pair : bₙ = 0. Pour n impair, n = 2k + 1 :  [juge equiv]  départ : 4(1 − (−1)^(2k + 1))/(π(2k + 1))
    = 8/(π(2k + 1))   ← (−1)^(2k+1) = −1
  aides : Prolongement impair : seulement des bₙ, intégrale sur [0 ; L] avec le facteur 2/L. | bₙ = (2/π)(∫_{0}^{π} 2sin(nx) dx) | (2/π)([−2cos(nx)/n]_{0}^{π})
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

f(x) = x sur [0 ; 1]. Calcule les coefficients de sa série en sinus (prolongement impair, période 2).
  [free, suivre l'erreur]  2(∫_{0}^{1} xsin(nπx) dx)
    ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = 2∫₀^1 f(x) sin(nπx) dx / · bₙ = ∫₀^1 f(x) sin(nπx) dx / · aₙ = 2∫₀^1 f(x) cos(nπx) dx
    (bₙ :)
    = 2([−xcos(nπx)/(nπ)]_{0}^{1} + (1/(nπ))(∫_{0}^{1} cos(nπx) dx))   ← Par parties
    = 2(−1)^(n + 1)/(πn)   ← Simplifier
  aides : Prolongement impair : seulement des bₙ, intégrale sur [0 ; L] avec le facteur 2/L. | bₙ = 2(∫_{0}^{1} xsin(nπx) dx) | 2([−xcos(nπx)/(nπ)]_{0}^{1} + (1/(nπ))(∫_{0}^{1} cos(nπx) dx))
  pièges : g3_reduce_swap, f_sine_wrong_factor, f_ipp_sign

f(x) = 2 sur [0 ; 1]. Calcule les coefficients de sa série en sinus (prolongement impair, période 2).
  [free, suivre l'erreur]  2(∫_{0}^{1} 2sin(nπx) dx)
    ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = 2∫₀^1 f(x) sin(nπx) dx / · bₙ = ∫₀^1 f(x) sin(nπx) dx / · aₙ = 2∫₀^1 f(x) cos(nπx) dx
    (bₙ :)
    = 2([−2cos(nπx)/(nπ)]_{0}^{1})   ← Primitive
    = 4(1 − (−1)^n)/(πn)   ← Simplifier
  — n pair : bₙ = 0. Pour n impair, n = 2k + 1 :  [juge equiv]  départ : 4(1 − (−1)^(2k + 1))/(π(2k + 1))
    = 8/(π(2k + 1))   ← (−1)^(2k+1) = −1
  aides : Prolongement impair : seulement des bₙ, intégrale sur [0 ; L] avec le facteur 2/L. | bₙ = 2(∫_{0}^{1} 2sin(nπx) dx) | 2([−2cos(nπx)/(nπ)]_{0}^{1})
  pièges : g3_reduce_swap, f_sine_wrong_factor, f_ipp_sign

```

### Niveau 5

```
f(x) = 2πx − x² sur [0 ; π]. Calcule les coefficients de sa série en sinus (prolongement impair, période 2π).
  [free, sans aide]  (2/π)(∫_{0}^{π} (−x² + 2πx)sin(nx) dx)
    ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx / · bₙ = (1/π)∫₀^π f(x) sin(nx) dx / · aₙ = (2/π)∫₀^π f(x) cos(nx) dx / · bₙ = (1/π)∫₀^2π f(x) sin(nx) dx
    (bₙ :)
    = (2/π)([(x² − 2πx)cos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} (−2x + 2π)cos(nx) dx))   ← Par parties
    = (2/π)(π²(−1)^(n + 1)/n + (1/n)(∫_{0}^{π} (−2x + 2π)cos(nx) dx))   ← Aux bornes
    = (2/π)(π²(−1)^(n + 1)/n + (1/n)([(−2x + 2π)sin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} −2sin(nx) dx)))   ← Par parties
    = (2/π)(π²(−1)^(n + 1)/n + (1/n)(−(1/n)(∫_{0}^{π} −2sin(nx) dx)))   ← Aux bornes
    = (2/π)(π²(−1)^(n + 1)/n + (1/n)(−(1/n)([2cos(nx)/n]_{0}^{π})))   ← Primitive
    = 2π(−1)^(n + 1)/n + 4(1 − (−1)^n)/(πn³)   ← Simplifier
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

f(x) = 2(2πx − x²) sur [0 ; π]. Calcule les coefficients de sa série en sinus (prolongement impair, période 2π).
  [free, sans aide]  (2/π)(∫_{0}^{π} (−2x² + 4πx)sin(nx) dx)
    ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx / · bₙ = (1/π)∫₀^π f(x) sin(nx) dx / · aₙ = (2/π)∫₀^π f(x) cos(nx) dx / · bₙ = (1/π)∫₀^2π f(x) sin(nx) dx
    (bₙ :)
    = (2/π)([(2x² − 4πx)cos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} (−4x + 4π)cos(nx) dx))   ← Par parties
    = (2/π)(2π²(−1)^(n + 1)/n + (1/n)(∫_{0}^{π} (−4x + 4π)cos(nx) dx))   ← Aux bornes
    = (2/π)(2π²(−1)^(n + 1)/n + (1/n)([(−4x + 4π)sin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} −4sin(nx) dx)))   ← Par parties
    = (2/π)(2π²(−1)^(n + 1)/n + (1/n)(−(1/n)(∫_{0}^{π} −4sin(nx) dx)))   ← Aux bornes
    = (2/π)(2π²(−1)^(n + 1)/n + (1/n)(−(1/n)([4cos(nx)/n]_{0}^{π})))   ← Primitive
    = 4π(−1)^(n + 1)/n + 8(1 − (−1)^n)/(πn³)   ← Simplifier
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

f(x) = 2(2πx − x²) sur [0 ; π]. Calcule les coefficients de sa série en sinus (prolongement impair, période 2π).
  [free, sans aide]  (2/π)(∫_{0}^{π} (−2x² + 4πx)sin(nx) dx)
    ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx / · bₙ = (1/π)∫₀^π f(x) sin(nx) dx / · aₙ = (2/π)∫₀^π f(x) cos(nx) dx / · bₙ = (1/π)∫₀^2π f(x) sin(nx) dx
    (bₙ :)
    = (2/π)([(2x² − 4πx)cos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} (−4x + 4π)cos(nx) dx))   ← Par parties
    = (2/π)(2π²(−1)^(n + 1)/n + (1/n)(∫_{0}^{π} (−4x + 4π)cos(nx) dx))   ← Aux bornes
    = (2/π)(2π²(−1)^(n + 1)/n + (1/n)([(−4x + 4π)sin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} −4sin(nx) dx)))   ← Par parties
    = (2/π)(2π²(−1)^(n + 1)/n + (1/n)(−(1/n)(∫_{0}^{π} −4sin(nx) dx)))   ← Aux bornes
    = (2/π)(2π²(−1)^(n + 1)/n + (1/n)(−(1/n)([4cos(nx)/n]_{0}^{π})))   ← Primitive
    = 4π(−1)^(n + 1)/n + 8(1 − (−1)^n)/(πn³)   ← Simplifier
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

```

### Variantes d'examen

```
f(x) = 2x sur [0 ; π]. Les coefficients de sa série en sinus vérifient : (plusieurs réponses possibles)
  · bₙ = 2(−1)^(n + 1)/n [f_sine_wrong_factor]   · bₙ = 4(−1)^n/n [f_ipp_sign]   ✔ bₙ = 4(−1)^(n + 1)/n   · bₙ = 0 pour n pair
  [examen mcq]
  pièges : f_sine_wrong_factor, f_ipp_sign

f(x) = 1 sur [0 ; 1]. Calcule les coefficients de sa série en sinus (prolongement impair, période 2).
  [problème, examen open, 5 points]
  partie 1 (Début du problème : 3 ; n pair : bₙ = 0. Pour n impair, n = 2k + 1 : 2)
    [free, sans aide, suivre l'erreur, examen open]  2(∫_{0}^{1} sin(nπx) dx)
      (bₙ :)
      = 2([−cos(nπx)/(nπ)]_{0}^{1})   ← Primitive
      = 2(1 − (−1)^n)/(πn)   ← Simplifier
    — n pair : bₙ = 0. Pour n impair, n = 2k + 1 :  [juge equiv]  départ : 2(1 − (−1)^(2k + 1))/(π(2k + 1))
      = 4/(π(2k + 1))   ← (−1)^(2k+1) = −1
  pièges : g3_reduce_swap, f_sine_wrong_factor, f_ipp_sign

```

## Dirichlet : valeur aux sauts, puis une somme numérique (`f-dirichlet`, BA4)

_En un saut, la série vaut la moyenne des limites ; puis une somme numérique._

### Niveau 1

```
f(x) = −1 sur ]−π ; 0[ et f(x) = 1 sur [0 ; π], prolongée par périodicité (période 2π). Ses coefficients de Fourier : a₀ = aₙ = 0, bₙ = 2(1 − (−1)ⁿ)/(πn). Note F(x) la somme de sa série. Calcule F(π/2), puis déduis-en S = Σk≥0 (−1)ᵏ/(2k + 1).
  [guided]  F(π/2)
    (F f(x₀) = (f(x₀ + 0) + f(x₀ − 0))/2 ; ici f(x₀ + 0) = 1 et f(x₀ − 0) = 1.)
    (Dirichlet :)
    = (□ + □)/2   (trous : (1 + 1)/2)   ← Moyenne des limites
    = 1
  — En x₀ = π/2, F(x₀) = Σ bₙ sin(nπ/2). Seuls les n impairs restent : écris le terme pour n = 2k + 1 :  [juge equiv]  départ : 2(1 − (−1)^(2k + 1))sin((2k + 1)π/2)/(π(2k + 1))
    (n = 2k + 1, k ≥ 0 (n = 1 pour k = 0).)
    = □   (trous : 4(−1)^k/(π(2k + 1)))   ← sin((2k + 1)π/2) = (−1)ᵏ
  — Dirichlet donne alors 1 = (4/π)S, avec S = Σk≥0 (−1)ᵏ/(2k + 1). Isole S :  [juge value]  départ : S
    = □   (trous : π/4)
  aides : Le prolongement est continu en π/2 : F(π/2) = f(π/2). Puis écris la série en π/2. | F(π/2) = (f(π/2 + 0) + f(π/2 − 0))/2 = (1 + 1)/2 | 2(1 − (−1)^(2k + 1))sin((2k + 1)π/2)/(π(2k + 1)) = 4(−1)^k/(π(2k + 1))

f(x) = 0 sur ]−π ; 0[ et f(x) = 3x sur [0 ; π], prolongée par périodicité (période 2π). Ses coefficients de Fourier : a₀ = 3π/2, aₙ = 3((−1)ⁿ − 1)/(πn²), bₙ = 3(−1)ⁿ⁺¹/n. Note F(x) la somme de sa série. Calcule F(π), puis déduis-en S = Σk≥0 1/(2k + 1)².
  [guided]  F(π)
    (F f(x₀) = (f(x₀ + 0) + f(x₀ − 0))/2 ; ici f(x₀ + 0) = 0 et f(x₀ − 0) = 3π.)
    (Dirichlet :)
    = (□ + □)/2   (trous : (0 + 3π)/2)   ← Moyenne des limites
  — En x₀ = π, F(x₀) = a₀/2 + Σ aₙ cos(nπ) (sin(nπ) = 0). Seuls les n impairs restent : écris le terme pour n = 2k + 1 :  [juge equiv]  départ : 3((−1)^(2k + 1) − 1)cos((2k + 1)π)/(π(2k + 1)²)
    (n = 2k + 1, k ≥ 0 (n = 1 pour k = 0).)
    = □   (trous : 6/(π(2k + 1)²))   ← (−1)^(2k+1) = −1
  — Dirichlet donne alors 3π/2 = 3π/4 + (6/π)S, avec S = Σk≥0 1/(2k + 1)². Isole S :  [juge value]  départ : S
    = □   (trous : π²/8)
  aides : f saute en π : Dirichlet donne la moyenne des limites, pas f(π). | F(π) = (f(π + 0) + f(π − 0))/2 = (0 + 3π)/2 | 3((−1)^(2k + 1) − 1)cos((2k + 1)π)/(π(2k + 1)²) = 6/(π(2k + 1)²)
  pièges : f_dirichlet_skip

f(x) = −3x sur [−π ; 0] et f(x) = 3π sur ]0 ; π[, prolongée par périodicité (période 2π). Ses coefficients de Fourier : a₀ = 9π/2, aₙ = 3((−1)ⁿ − 1)/(πn²), bₙ = 3/n. Note F(x) la somme de sa série. Calcule F(0), puis déduis-en S = Σk≥1 1/(2k − 1)².
  [guided]  F(0)
    (F f(x₀) = (f(x₀ + 0) + f(x₀ − 0))/2 ; ici f(x₀ + 0) = 3π et f(x₀ − 0) = 0.)
    (Dirichlet :)
    = (□ + □)/2   (trous : (3π + 0)/2)   ← Moyenne des limites
  — En x₀ = 0, F(x₀) = a₀/2 + Σ aₙ. Seuls les n impairs restent : écris le terme pour n = 2k − 1 :  [juge equiv]  départ : 3((−1)^(2k − 1) − 1)/(π(2k − 1)²)
    (n = 2k − 1, k ≥ 1 (n = 1 pour k = 1).)
    = □   (trous : −6/(π(2k − 1)²))   ← (−1)^(2k−1) = −1
  — Dirichlet donne alors 3π/2 = 9π/4 − (6/π)S, avec S = Σk≥1 1/(2k − 1)². Isole S :  [juge value]  départ : S
    = □   (trous : π²/8)
  aides : f saute en 0 : Dirichlet donne la moyenne des limites, pas f(0). | F(0) = (f(0 + 0) + f(0 − 0))/2 = (3π + 0)/2 | 3((−1)^(2k − 1) − 1)/(π(2k − 1)²) = −6/(π(2k − 1)²)
  pièges : f_dirichlet_skip

```

### Niveau 2

```
f(x) = 3x sur ]−π ; π], prolongée par périodicité (période 2π). Ses coefficients de Fourier : a₀ = aₙ = 0, bₙ = 6(−1)ⁿ⁺¹/n. Note F(x) la somme de sa série. Calcule F(π/2), puis déduis-en S = Σk≥0 (−1)ᵏ/(2k + 1).
  [guided]  F(π/2)
    ? Le prolongement périodique de f est-il continu en π/2 ? ✔ Oui : F f(x₀) = f(x₀) / · Non : il y a un saut
    (Dirichlet :)
    = □   (trous : 3π/2)
  — En x₀ = π/2, F(x₀) = Σ bₙ sin(nπ/2). Seuls les n impairs restent : écris le terme pour n = 2k + 1 :  [juge equiv]  départ : 6(−1)^(2k + 2)sin((2k + 1)π/2)/(2k + 1)
    (n = 2k + 1, k ≥ 0 (n = 1 pour k = 0).)
    = □   (trous : 6(−1)^k/(2k + 1))   ← sin((2k + 1)π/2) = (−1)ᵏ
  — Dirichlet donne alors 3π/2 = 6S, avec S = Σk≥0 (−1)ᵏ/(2k + 1). Isole S :  [juge value]  départ : S
    = □   (trous : π/4)
  aides : Le prolongement est continu en π/2 : F(π/2) = f(π/2). Puis écris la série en π/2. | F(π/2) = (f(π/2 + 0) + f(π/2 − 0))/2 = (3π/2 + 3π/2)/2 | 6(−1)^(2k + 2)sin((2k + 1)π/2)/(2k + 1) = 6(−1)^k/(2k + 1)

f(x) = x² sur ]−π ; π], prolongée par périodicité (période 2π). Ses coefficients de Fourier : a₀ = 2π²/3, aₙ = 4(−1)ⁿ/n², bₙ = 0. Note F(x) la somme de sa série. Calcule F(π), puis déduis-en S = Σn≥1 1/n².
  [guided]  F(π)
    ? Le prolongement périodique de f est-il continu en π (le prolongement : à droite de π, on retrouve f près de −π) ? ✔ Oui : F f(x₀) = f(x₀) / · Non : il y a un saut
    (Dirichlet :)
    = □   (trous : π²)
  — En x₀ = π, F(x₀) = a₀/2 + Σ aₙ cos(nπ). Simplifie le terme général :  [juge equiv]  départ : 4(−1)^ncos(nπ)/n²
    = □   (trous : 4/n²)   ← cos(nπ) = (−1)ⁿ
  — Dirichlet donne alors π² = π²/3 + 4S, avec S = Σn≥1 1/n². Isole S :  [juge value]  départ : S
    = □   (trous : π²/6)
  aides : Le prolongement est continu en π : F(π) = f(π). Puis écris la série en π. | F(π) = (f(π + 0) + f(π − 0))/2 = (π² + π²)/2 | 4(−1)^ncos(nπ)/n² = 4/n²

f(x) = x² sur ]−π ; π], prolongée par périodicité (période 2π). Ses coefficients de Fourier : a₀ = 2π²/3, aₙ = 4(−1)ⁿ/n², bₙ = 0. Note F(x) la somme de sa série. Calcule F(π), puis déduis-en S = Σn≥1 1/n².
  [guided]  F(π)
    ? Le prolongement périodique de f est-il continu en π (le prolongement : à droite de π, on retrouve f près de −π) ? ✔ Oui : F f(x₀) = f(x₀) / · Non : il y a un saut
    (Dirichlet :)
    = □   (trous : π²)
  — En x₀ = π, F(x₀) = a₀/2 + Σ aₙ cos(nπ). Simplifie le terme général :  [juge equiv]  départ : 4(−1)^ncos(nπ)/n²
    = □   (trous : 4/n²)   ← cos(nπ) = (−1)ⁿ
  — Dirichlet donne alors π² = π²/3 + 4S, avec S = Σn≥1 1/n². Isole S :  [juge value]  départ : S
    = □   (trous : π²/6)
  aides : Le prolongement est continu en π : F(π) = f(π). Puis écris la série en π. | F(π) = (f(π + 0) + f(π − 0))/2 = (π² + π²)/2 | 4(−1)^ncos(nπ)/n² = 4/n²

```

### Niveau 3

```
f(x) = −1 sur ]−π ; 0[ et f(x) = 1 sur [0 ; π], prolongée par périodicité (période 2π). Ses coefficients de Fourier : a₀ = aₙ = 0, bₙ = 2(1 − (−1)ⁿ)/(πn). Note F(x) la somme de sa série. Calcule F(π/2), puis déduis-en S = Σk≥0 (−1)ᵏ/(2k + 1).
  [tap, suivre l'erreur, menu steps]  F(π/2)
    ? Le prolongement périodique de f est-il continu en π/2 ? ✔ Oui : F f(x₀) = f(x₀) / · Non : il y a un saut
    (Dirichlet :)
    = (1 + 1)/2   ← Moyenne des limites
    = 1
  — En x₀ = π/2, F(x₀) = Σ bₙ sin(nπ/2). Seuls les n impairs restent : écris le terme pour n = 2k + 1 :  [juge equiv]  départ : 2(1 − (−1)^(2k + 1))sin((2k + 1)π/2)/(π(2k + 1))
    ? n = 2k + 1 : où commence k ? ✔ k ≥ 0 / · k ≥ 1
    = 4(−1)^k/(π(2k + 1))   ← sin((2k + 1)π/2) = (−1)ᵏ
  — Dirichlet donne alors 1 = (4/π)S, avec S = Σk≥0 (−1)ᵏ/(2k + 1). Isole S :  [juge value]  départ : S
    = π/4
  aides : Le prolongement est continu en π/2 : F(π/2) = f(π/2). Puis écris la série en π/2. | F(π/2) = (f(π/2 + 0) + f(π/2 − 0))/2 = (1 + 1)/2 | 2(1 − (−1)^(2k + 1))sin((2k + 1)π/2)/(π(2k + 1)) = 4(−1)^k/(π(2k + 1))
  pièges : f_sum_reindex

f(x) = 3x sur ]−π ; π], prolongée par périodicité (période 2π). Ses coefficients de Fourier : a₀ = aₙ = 0, bₙ = 6(−1)ⁿ⁺¹/n. Note F(x) la somme de sa série. Calcule F(π/2), puis déduis-en S = Σk≥0 (−1)ᵏ/(2k + 1).
  [tap, suivre l'erreur, menu steps]  F(π/2)
    ? Le prolongement périodique de f est-il continu en π/2 ? ✔ Oui : F f(x₀) = f(x₀) / · Non : il y a un saut
    (Dirichlet :)
    = 3π/2
  — En x₀ = π/2, F(x₀) = Σ bₙ sin(nπ/2). Seuls les n impairs restent : écris le terme pour n = 2k + 1 :  [juge equiv]  départ : 6(−1)^(2k + 2)sin((2k + 1)π/2)/(2k + 1)
    ? n = 2k + 1 : où commence k ? ✔ k ≥ 0 / · k ≥ 1
    = 6(−1)^k/(2k + 1)   ← sin((2k + 1)π/2) = (−1)ᵏ
  — Dirichlet donne alors 3π/2 = 6S, avec S = Σk≥0 (−1)ᵏ/(2k + 1). Isole S :  [juge value]  départ : S
    = π/4
  aides : Le prolongement est continu en π/2 : F(π/2) = f(π/2). Puis écris la série en π/2. | F(π/2) = (f(π/2 + 0) + f(π/2 − 0))/2 = (3π/2 + 3π/2)/2 | 6(−1)^(2k + 2)sin((2k + 1)π/2)/(2k + 1) = 6(−1)^k/(2k + 1)
  pièges : f_sum_reindex

f(x) = 3x² sur ]−π ; π], prolongée par périodicité (période 2π). Ses coefficients de Fourier : a₀ = 2π², aₙ = 12(−1)ⁿ/n², bₙ = 0. Note F(x) la somme de sa série. Calcule F(π), puis déduis-en S = Σn≥1 1/n².
  [tap, suivre l'erreur, menu steps]  F(π)
    ? Le prolongement périodique de f est-il continu en π (le prolongement : à droite de π, on retrouve f près de −π) ? ✔ Oui : F f(x₀) = f(x₀) / · Non : il y a un saut
    (Dirichlet :)
    = 3π²
  — En x₀ = π, F(x₀) = a₀/2 + Σ aₙ cos(nπ). Simplifie le terme général :  [juge equiv]  départ : 12(−1)^ncos(nπ)/n²
    = 12/n²   ← cos(nπ) = (−1)ⁿ
  — Dirichlet donne alors 3π² = π² + 12S, avec S = Σn≥1 1/n². Isole S :  [juge value]  départ : S
    = π²/6
  aides : Le prolongement est continu en π : F(π) = f(π). Puis écris la série en π. | F(π) = (f(π + 0) + f(π − 0))/2 = (3π² + 3π²)/2 | 12(−1)^ncos(nπ)/n² = 12/n²

```

### Niveau 4

```
f(x) = 2|x| sur ]−π ; π], prolongée par périodicité (période 2π). Ses coefficients de Fourier : a₀ = 2π, aₙ = 4((−1)ⁿ − 1)/(πn²), bₙ = 0. Note F(x) la somme de sa série. Calcule F(0), puis déduis-en S = Σk≥0 1/(2k + 1)².
  [free, suivre l'erreur]  F(0)
    ? Le prolongement périodique de f est-il continu en 0 ? ✔ Oui : F f(x₀) = f(x₀) / · Non : il y a un saut
    (Dirichlet :)
    = (0 + 0)/2   ← Moyenne des limites
    = 0
  — En x₀ = 0, F(x₀) = a₀/2 + Σ aₙ. Seuls les n impairs restent : écris le terme pour n = 2k + 1 :  [juge equiv]  départ : 4((−1)^(2k + 1) − 1)/(π(2k + 1)²)
    ? n = 2k + 1 : où commence k ? ✔ k ≥ 0 / · k ≥ 1
    = −8/(π(2k + 1)²)   ← (−1)^(2k+1) = −1
  — Dirichlet donne alors 0 = π − (8/π)S, avec S = Σk≥0 1/(2k + 1)². Isole S :  [juge value]  départ : S
    = π²/8
  aides : Le prolongement est continu en 0 : F(0) = f(0). Puis écris la série en 0. | F(0) = (f(0 + 0) + f(0 − 0))/2 = (0 + 0)/2 | 4((−1)^(2k + 1) − 1)/(π(2k + 1)²) = −8/(π(2k + 1)²)
  pièges : f_sum_reindex

f(x) = x sur ]−π ; π], prolongée par périodicité (période 2π). Ses coefficients de Fourier : a₀ = aₙ = 0, bₙ = 2(−1)ⁿ⁺¹/n. Note F(x) la somme de sa série. Calcule F(π/2), puis déduis-en S = Σk≥0 (−1)ᵏ/(2k + 1).
  [free, suivre l'erreur]  F(π/2)
    ? Le prolongement périodique de f est-il continu en π/2 ? ✔ Oui : F f(x₀) = f(x₀) / · Non : il y a un saut
    (Dirichlet :)
    = π/2
  — En x₀ = π/2, F(x₀) = Σ bₙ sin(nπ/2). Seuls les n impairs restent : écris le terme pour n = 2k + 1 :  [juge equiv]  départ : 2(−1)^(2k + 2)sin((2k + 1)π/2)/(2k + 1)
    ? n = 2k + 1 : où commence k ? ✔ k ≥ 0 / · k ≥ 1
    = 2(−1)^k/(2k + 1)   ← sin((2k + 1)π/2) = (−1)ᵏ
  — Dirichlet donne alors π/2 = 2S, avec S = Σk≥0 (−1)ᵏ/(2k + 1). Isole S :  [juge value]  départ : S
    = π/4
  aides : Le prolongement est continu en π/2 : F(π/2) = f(π/2). Puis écris la série en π/2. | F(π/2) = (f(π/2 + 0) + f(π/2 − 0))/2 = (π/2 + π/2)/2 | 2(−1)^(2k + 2)sin((2k + 1)π/2)/(2k + 1) = 2(−1)^k/(2k + 1)
  pièges : f_sum_reindex

f(x) = 2x² sur ]−π ; π], prolongée par périodicité (période 2π). Ses coefficients de Fourier : a₀ = 4π²/3, aₙ = 8(−1)ⁿ/n², bₙ = 0. Note F(x) la somme de sa série. Calcule F(0), puis déduis-en S = Σn≥1 (−1)ⁿ⁺¹/n².
  [free, suivre l'erreur]  F(0)
    ? Le prolongement périodique de f est-il continu en 0 ? ✔ Oui : F f(x₀) = f(x₀) / · Non : il y a un saut
    (Dirichlet :)
    = (0 + 0)/2   ← Moyenne des limites
    = 0
  — En x₀ = 0, F(x₀) = a₀/2 + Σ aₙ. Simplifie le terme général :  [juge equiv]  départ : 8(−1)^ncos(n·0)/n²
    = 8(−1)^n/n²   ← cos(nπ) = (−1)ⁿ
  — Dirichlet donne alors 0 = 2π²/3 − 8S, avec S = Σn≥1 (−1)ⁿ⁺¹/n². Isole S :  [juge value]  départ : S
    = π²/12
  aides : Le prolongement est continu en 0 : F(0) = f(0). Puis écris la série en 0. | F(0) = (f(0 + 0) + f(0 − 0))/2 = (0 + 0)/2 | 8(−1)^ncos(n·0)/n² = 8(−1)^n/n²

```

### Niveau 5

```
f(x) = 3 sur ]0 ; π] ; sa série en sinus F_s f a les coefficients bₙ = 6(1 − (−1)ⁿ)/(πn). Compare F_s f et f en π, puis déduis de la valeur en π/2 la somme S = Σk≥0 (−1)ᵏ/(2k + 1).
  [free, sans aide]  F(π)
    ? Le prolongement périodique de f est-il continu en π (le prolongement : à droite de π, on retrouve f près de −π) ? ✔ Non : F f(x₀) est la moyenne des limites à gauche et à droite / · Oui : F f(x₀) = f(x₀)
    (Dirichlet pour la série en sinus :)
    = (−3 + 3)/2   ← Moyenne des limites
    = 0
  — Sur ]0 ; π[, F_s f = f (f y est continue). En x₀ = π/2, F_s f(π/2) = 3 = Σ bₙ sin(nπ/2). Écris le terme pour n = 2k + 1 :  [juge equiv]  départ : 6(1 − (−1)^(2k + 1))sin((2k + 1)π/2)/(π(2k + 1))
    (n = 2k + 1, k ≥ 0 (n = 1 pour k = 0).)
    = 12(−1)^k/(π(2k + 1))   ← sin((2k + 1)π/2) = (−1)ᵏ
  — Dirichlet donne alors 3 = (12/π)S, avec S = Σk≥0 (−1)ᵏ/(2k + 1). Isole S :  [juge value]  départ : S
    = π/4
  pièges : f_sine_endpoint

f(x) = 0 sur ]−π ; 0[ et f(x) = x sur [0 ; π], prolongée par périodicité (période 2π). Ses coefficients de Fourier : a₀ = π/2, aₙ = ((−1)ⁿ − 1)/(πn²), bₙ = (−1)ⁿ⁺¹/n. Note F(x) la somme de sa série. Calcule F(π), puis déduis-en S = Σk≥0 1/(2k + 1)².
  [free, sans aide]  F(π)
    ? Le prolongement périodique de f est-il continu en π (le prolongement : à droite de π, on retrouve f près de −π) ? ✔ Non : F f(x₀) est la moyenne des limites à gauche et à droite / · Oui : F f(x₀) = f(x₀)
    (Dirichlet :)
    = (0 + π)/2   ← Moyenne des limites
  — En x₀ = π, F(x₀) = a₀/2 + Σ aₙ cos(nπ) (sin(nπ) = 0). Seuls les n impairs restent : écris le terme pour n = 2k + 1 :  [juge equiv]  départ : ((−1)^(2k + 1) − 1)cos((2k + 1)π)/(π(2k + 1)²)
    (n = 2k + 1, k ≥ 0 (n = 1 pour k = 0).)
    = 2/(π(2k + 1)²)   ← (−1)^(2k+1) = −1
  — Dirichlet donne alors π/2 = π/4 + (2/π)S, avec S = Σk≥0 1/(2k + 1)². Isole S :  [juge value]  départ : S
    = (π/2 − π/4)(π/2)   ← Isoler S
    = π²/8
  pièges : f_dirichlet_skip

f(x) = 3 sur ]0 ; π] ; sa série en sinus F_s f a les coefficients bₙ = 6(1 − (−1)ⁿ)/(πn). Compare F_s f et f en π, puis déduis de la valeur en π/2 la somme S = Σk≥0 (−1)ᵏ/(2k + 1).
  [free, sans aide]  F(π)
    ? Le prolongement périodique de f est-il continu en π (le prolongement : à droite de π, on retrouve f près de −π) ? ✔ Non : F f(x₀) est la moyenne des limites à gauche et à droite / · Oui : F f(x₀) = f(x₀)
    (Dirichlet pour la série en sinus :)
    = (−3 + 3)/2   ← Moyenne des limites
    = 0
  — Sur ]0 ; π[, F_s f = f (f y est continue). En x₀ = π/2, F_s f(π/2) = 3 = Σ bₙ sin(nπ/2). Écris le terme pour n = 2k + 1 :  [juge equiv]  départ : 6(1 − (−1)^(2k + 1))sin((2k + 1)π/2)/(π(2k + 1))
    (n = 2k + 1, k ≥ 0 (n = 1 pour k = 0).)
    = 12(−1)^k/(π(2k + 1))   ← sin((2k + 1)π/2) = (−1)ᵏ
  — Dirichlet donne alors 3 = (12/π)S, avec S = Σk≥0 (−1)ᵏ/(2k + 1). Isole S :  [juge value]  départ : S
    = π/4
  pièges : f_sine_endpoint

```

### Variantes d'examen

```
f(x) = 0 sur ]−π ; 0[ et f(x) = 3x sur [0 ; π], 2π-périodique. Note F f la somme de sa série de Fourier. Quelles égalités sont vraies ? (plusieurs réponses possibles)
  ✔ F f(π) = 3π/2   ✔ F f(0) = 0   ✔ F f(π/2) = 3π/2   · F f(π) = 3π [f_dirichlet_skip]   · F f(−π) = 3π [f_dirichlet_skip]
  [examen mcq]
  pièges : f_dirichlet_skip

f(x) = 0 sur ]−π ; 0[ et f(x) = 2x sur [0 ; π], prolongée par périodicité (période 2π). Ses coefficients de Fourier : a₀ = π, aₙ = 2((−1)ⁿ − 1)/(πn²), bₙ = 2(−1)ⁿ⁺¹/n. Note F(x) la somme de sa série. Calcule F(π), puis déduis-en S = Σk≥0 1/(2k + 1)².
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 1 ; En x₀ = π, F(x₀) = a₀/2 + Σ aₙ cos(nπ) (sin(nπ) = 0). Seuls les n impairs restent : écris le terme pour n = 2k + 1 : 1 ; Dirichlet donne alors π = π/2 + (4/π)S, avec S = Σk≥0 1/(2k + 1)². Isole S : 2)
    [free, sans aide, suivre l'erreur, examen open]  F(π)
      (Dirichlet :)
      = π
    — En x₀ = π, F(x₀) = a₀/2 + Σ aₙ cos(nπ) (sin(nπ) = 0). Seuls les n impairs restent : écris le terme pour n = 2k + 1 :  [juge equiv]  départ : 2((−1)^(2k + 1) − 1)cos((2k + 1)π)/(π(2k + 1)²)
      = 4/(π(2k + 1)²)   ← (−1)^(2k+1) = −1
    — Dirichlet donne alors π = π/2 + (4/π)S, avec S = Σk≥0 1/(2k + 1)². Isole S :  [juge value]  départ : S
      = (π − π/2)(π/4)   ← Isoler S
      = π²/8
  pièges : f_dirichlet_skip

```

## Parseval et sommes (`f-parseval`, BA4)

_(2/T)∫ f² = a₀²/2 + Σ (aₙ² + bₙ²) : une somme de carrés._

### Niveau 1

```
f(x) = 2|x| sur ]−π ; π[, 2π-périodique. Ses coefficients : a₀ = 2π, a₂ₖ = 0, a₂ₖ₊₁ = −8/(π(2k + 1)²), bₙ = 0. Avec l'égalité de Parseval, calcule S = Σk≥0 1/(2k + 1)⁴.
  [guided]  G
    (T = 2π : G = (1/π)∫ f(x)² dx sur ]−π ; π[ (f² est paire : (2/π)∫₀^π).)
    (Membre de gauche : G = (2/T)∫ f(x)² dx, sur la période où f est donnée.)
    = (2/π)(□)   (trous : (2/π)(∫_{0}^{π} (2x)² dx))   ← (2/T)∫ f²
    = □   (trous : 8π²/3)
  — Le terme constant : a₀²/2, avec a₀ = 2π.  [juge value]  départ : a_0²/2
    = □   (trous : 2π²)
  — Le carré du coefficient, a₂ₖ₊₁² :  [juge equiv]  départ : (−8/(π(2k + 1)²))²
    = □   (trous : 64/(π²(2k + 1)⁴))   ← Au carré
  — Parseval donne 8π²/3 = 2π² + (64/π²)S, avec S = Σk≥0 1/(2k + 1)⁴. Isole S :  [juge value]  départ : S
    = □   (trous : π⁴/96)
  aides : (2/T)∫ f² = a₀²/2 + Σ (aₙ² + bₙ²), sur la période où f est donnée. | G = (2/π)(∫_{0}^{π} (2x)² dx) | G = 8π²/3
  pièges : f_parseval_bounds, f_parseval_factor, f_parseval_square

f(x) = −3 sur ]−π ; 0[ et f(x) = 3 sur ]0 ; π[, 2π-périodique. Ses coefficients : a₀ = aₙ = 0, b₂ₖ = 0, b₂ₖ₊₁ = 12/(π(2k + 1)). Avec l'égalité de Parseval, calcule S = Σk≥0 1/(2k + 1)².
  [guided]  G
    (T = 2π : G = (1/π)∫ f(x)² dx sur ]−π ; π[.)
    (Membre de gauche : G = (2/T)∫ f(x)² dx, sur la période où f est donnée.)
    = (1/π)(□)   (trous : (1/π)(∫_{−π}^{π} 9 dx))   ← (2/T)∫ f²
    = □   (trous : 18)
  — Le carré du coefficient, b₂ₖ₊₁² :  [juge equiv]  départ : (12/(π(2k + 1)))²
    = □   (trous : 144/(π²(2k + 1)²))   ← Au carré
  — Parseval donne 18 = (144/π²)S, avec S = Σk≥0 1/(2k + 1)². Isole S :  [juge value]  départ : S
    = □   (trous : π²/8)
  aides : (2/T)∫ f² = a₀²/2 + Σ (aₙ² + bₙ²), sur la période où f est donnée. | G = (1/π)(∫_{−π}^{π} 9 dx) | G = 18
  pièges : f_parseval_factor, f_parseval_square

f(x) = 3x² sur ]−π ; π[, 2π-périodique. Ses coefficients : a₀ = 2π², aₙ = 12(−1)ⁿ/n², bₙ = 0. Avec l'égalité de Parseval, calcule S = Σn≥1 1/n⁴.
  [guided]  G
    (T = 2π : G = (1/π)∫ f(x)² dx sur ]−π ; π[.)
    (Membre de gauche : G = (2/T)∫ f(x)² dx, sur la période où f est donnée.)
    = (1/π)(□)   (trous : (1/π)(∫_{−π}^{π} (3x²)² dx))   ← (2/T)∫ f²
    = □   (trous : 18π⁴/5)
  — Le terme constant : a₀²/2, avec a₀ = 2π².  [juge value]  départ : a_0²/2
    = □   (trous : 2π⁴)
  — Le carré du coefficient, aₙ² :  [juge equiv]  départ : (12(−1)^n/n²)²
    = □   (trous : 144/n⁴)   ← Au carré
  — Parseval donne 18π⁴/5 = 2π⁴ + 144S, avec S = Σn≥1 1/n⁴. Isole S :  [juge value]  départ : S
    = □   (trous : π⁴/90)
  aides : (2/T)∫ f² = a₀²/2 + Σ (aₙ² + bₙ²), sur la période où f est donnée. | G = (1/π)(∫_{−π}^{π} (3x²)² dx) | G = 18π⁴/5
  pièges : f_parseval_bounds, f_parseval_factor, f_parseval_square

```

### Niveau 2

```
f(x) = 2|x| sur ]−π ; π[, 2π-périodique. Ses coefficients : a₀ = 2π, a₂ₖ = 0, a₂ₖ₊₁ = −8/(π(2k + 1)²), bₙ = 0. Avec l'égalité de Parseval, calcule S = Σk≥0 1/(2k + 1)⁴.
  [guided]  G
    ? Le membre de gauche de Parseval ? ✔ (1/π)∫ f(x)² dx sur ]−π ; π[ / · ∫ f(x)² dx sur ]−π ; π[ / · (1/π)∫ f(x)² dx sur [0 ; 2π] / · (1/π)∫ f(x) dx sur ]−π ; π[
    (Membre de gauche : G = (2/T)∫ f(x)² dx, sur la période où f est donnée.)
    = (2/π)(□)   (trous : (2/π)(∫_{0}^{π} (2x)² dx))   ← (2/T)∫ f²
    = □   (trous : 8π²/3)
  — Le terme constant : a₀²/2, avec a₀ = 2π.  [juge value]  départ : a_0²/2
    = (2π)²/2   ← a₀²/2
    = □   (trous : 2π²)
  — Le carré du coefficient, a₂ₖ₊₁² :  [juge equiv]  départ : (−8/(π(2k + 1)²))²
    = □   (trous : 64/(π²(2k + 1)⁴))   ← Au carré
  — Parseval donne 8π²/3 = 2π² + (64/π²)S, avec S = Σk≥0 1/(2k + 1)⁴. Isole S :  [juge value]  départ : S
    = (8π²/3 − 2π²)(π²/64)   ← Isoler S
    = □   (trous : π⁴/96)
  aides : (2/T)∫ f² = a₀²/2 + Σ (aₙ² + bₙ²), sur la période où f est donnée. | G = (2/π)(∫_{0}^{π} (2x)² dx) | G = 8π²/3
  pièges : f_parseval_bounds, f_parseval_factor, f_parseval_square

f(x) = 3x² sur ]−π ; π[, 2π-périodique. Ses coefficients : a₀ = 2π², aₙ = 12(−1)ⁿ/n², bₙ = 0. Avec l'égalité de Parseval, calcule S = Σn≥1 1/n⁴.
  [guided]  G
    ? Le membre de gauche de Parseval ? ✔ (1/π)∫ f(x)² dx sur ]−π ; π[ / · ∫ f(x)² dx sur ]−π ; π[ / · (1/π)∫ f(x)² dx sur [0 ; 2π] / · (1/π)∫ f(x) dx sur ]−π ; π[
    (Membre de gauche : G = (2/T)∫ f(x)² dx, sur la période où f est donnée.)
    = (1/π)(□)   (trous : (1/π)(∫_{−π}^{π} (3x²)² dx))   ← (2/T)∫ f²
    = □   (trous : 18π⁴/5)
  — Le terme constant : a₀²/2, avec a₀ = 2π².  [juge value]  départ : a_0²/2
    = (2π²)²/2   ← a₀²/2
    = □   (trous : 2π⁴)
  — Le carré du coefficient, aₙ² :  [juge equiv]  départ : (12(−1)^n/n²)²
    = □   (trous : 144/n⁴)   ← Au carré
  — Parseval donne 18π⁴/5 = 2π⁴ + 144S, avec S = Σn≥1 1/n⁴. Isole S :  [juge value]  départ : S
    = □   (trous : π⁴/90)
  aides : (2/T)∫ f² = a₀²/2 + Σ (aₙ² + bₙ²), sur la période où f est donnée. | G = (1/π)(∫_{−π}^{π} (3x²)² dx) | G = 18π⁴/5
  pièges : f_parseval_bounds, f_parseval_factor, f_parseval_square

f(x) = 3x² sur ]−π ; π[, 2π-périodique. Ses coefficients : a₀ = 2π², aₙ = 12(−1)ⁿ/n², bₙ = 0. Avec l'égalité de Parseval, calcule S = Σn≥1 1/n⁴.
  [guided]  G
    ? Le membre de gauche de Parseval ? ✔ (1/π)∫ f(x)² dx sur ]−π ; π[ / · ∫ f(x)² dx sur ]−π ; π[ / · (1/π)∫ f(x)² dx sur [0 ; 2π] / · (1/π)∫ f(x) dx sur ]−π ; π[
    (Membre de gauche : G = (2/T)∫ f(x)² dx, sur la période où f est donnée.)
    = (1/π)(□)   (trous : (1/π)(∫_{−π}^{π} (3x²)² dx))   ← (2/T)∫ f²
    = □   (trous : 18π⁴/5)
  — Le terme constant : a₀²/2, avec a₀ = 2π².  [juge value]  départ : a_0²/2
    = (2π²)²/2   ← a₀²/2
    = □   (trous : 2π⁴)
  — Le carré du coefficient, aₙ² :  [juge equiv]  départ : (12(−1)^n/n²)²
    = □   (trous : 144/n⁴)   ← Au carré
  — Parseval donne 18π⁴/5 = 2π⁴ + 144S, avec S = Σn≥1 1/n⁴. Isole S :  [juge value]  départ : S
    = □   (trous : π⁴/90)
  aides : (2/T)∫ f² = a₀²/2 + Σ (aₙ² + bₙ²), sur la période où f est donnée. | G = (1/π)(∫_{−π}^{π} (3x²)² dx) | G = 18π⁴/5
  pièges : f_parseval_bounds, f_parseval_factor, f_parseval_square

```

### Niveau 3

```
f(x) = 3x² sur ]−π ; π[, 2π-périodique. Ses coefficients : a₀ = 2π², aₙ = 12(−1)ⁿ/n², bₙ = 0. Avec l'égalité de Parseval, calcule S = Σn≥1 1/n⁴.
  [tap, suivre l'erreur, menu steps]  G
    ? Pour calculer S = Σ<sub>n≥1</sub> 1/n⁴, quel outil ? ✔ Parseval : les carrés des coefficients donnent S / · Dirichlet en un point
    ? Le membre de gauche de Parseval ? ✔ (1/π)∫ f(x)² dx sur ]−π ; π[ / · ∫ f(x)² dx sur ]−π ; π[ / · (1/π)∫ f(x)² dx sur [0 ; 2π] / · (1/π)∫ f(x) dx sur ]−π ; π[
    (Membre de gauche : G = (2/T)∫ f(x)² dx, sur la période où f est donnée.)
    = (1/π)(∫_{−π}^{π} (3x²)² dx)   ← (2/T)∫ f²
    = 18π⁴/5
  — Le terme constant : a₀²/2, avec a₀ = 2π².  [juge value]  départ : a_0²/2
    = (2π²)²/2   ← a₀²/2
    = 2π⁴
  — Le carré du coefficient, aₙ² :  [juge equiv]  départ : (12(−1)^n/n²)²
    = 144/n⁴   ← Au carré
  — Parseval donne 18π⁴/5 = 2π⁴ + 144S, avec S = Σn≥1 1/n⁴. Isole S :  [juge value]  départ : S
    = π⁴/90
  aides : (2/T)∫ f² = a₀²/2 + Σ (aₙ² + bₙ²), sur la période où f est donnée. | G = (1/π)(∫_{−π}^{π} (3x²)² dx) | G = 18π⁴/5
  pièges : f_parseval_bounds, f_parseval_factor, f_parseval_square

f(x) = 2|x| sur ]−π ; π[, 2π-périodique. Ses coefficients : a₀ = 2π, a₂ₖ = 0, a₂ₖ₊₁ = −8/(π(2k + 1)²), bₙ = 0. Avec l'égalité de Parseval, calcule S = Σk≥0 1/(2k + 1)⁴.
  [tap, suivre l'erreur, menu steps]  G
    ? Pour calculer S = Σ<sub>k≥0</sub> 1/(2k + 1)⁴, quel outil ? ✔ Parseval : les carrés des coefficients donnent S / · Dirichlet en un point
    ? Le membre de gauche de Parseval ? ✔ (1/π)∫ f(x)² dx sur ]−π ; π[ / · ∫ f(x)² dx sur ]−π ; π[ / · (1/π)∫ f(x)² dx sur [0 ; 2π] / · (1/π)∫ f(x) dx sur ]−π ; π[
    (Membre de gauche : G = (2/T)∫ f(x)² dx, sur la période où f est donnée.)
    = (2/π)(∫_{0}^{π} (2x)² dx)   ← (2/T)∫ f²
    = 8π²/3
  — Le terme constant : a₀²/2, avec a₀ = 2π.  [juge value]  départ : a_0²/2
    = (2π)²/2   ← a₀²/2
    = 2π²
  — Le carré du coefficient, a₂ₖ₊₁² :  [juge equiv]  départ : (−8/(π(2k + 1)²))²
    = 64/(π²(2k + 1)⁴)   ← Au carré
  — Parseval donne 8π²/3 = 2π² + (64/π²)S, avec S = Σk≥0 1/(2k + 1)⁴. Isole S :  [juge value]  départ : S
    = (8π²/3 − 2π²)(π²/64)   ← Isoler S
    = π⁴/96
  aides : (2/T)∫ f² = a₀²/2 + Σ (aₙ² + bₙ²), sur la période où f est donnée. | G = (2/π)(∫_{0}^{π} (2x)² dx) | G = 8π²/3
  pièges : f_parseval_bounds, f_parseval_factor, f_parseval_square

f(x) = 3|x| sur ]−π ; π[, 2π-périodique. Ses coefficients : a₀ = 3π, a₂ₖ = 0, a₂ₖ₊₁ = −12/(π(2k + 1)²), bₙ = 0. Avec l'égalité de Parseval, calcule S = Σk≥0 1/(2k + 1)⁴.
  [tap, suivre l'erreur, menu steps]  G
    ? Pour calculer S = Σ<sub>k≥0</sub> 1/(2k + 1)⁴, quel outil ? ✔ Parseval : les carrés des coefficients donnent S / · Dirichlet en un point
    ? Le membre de gauche de Parseval ? ✔ (1/π)∫ f(x)² dx sur ]−π ; π[ / · ∫ f(x)² dx sur ]−π ; π[ / · (1/π)∫ f(x)² dx sur [0 ; 2π] / · (1/π)∫ f(x) dx sur ]−π ; π[
    (Membre de gauche : G = (2/T)∫ f(x)² dx, sur la période où f est donnée.)
    = (2/π)(∫_{0}^{π} (3x)² dx)   ← (2/T)∫ f²
    = 6π²
  — Le terme constant : a₀²/2, avec a₀ = 3π.  [juge value]  départ : a_0²/2
    = (3π)²/2   ← a₀²/2
    = 9π²/2
  — Le carré du coefficient, a₂ₖ₊₁² :  [juge equiv]  départ : (−12/(π(2k + 1)²))²
    = 144/(π²(2k + 1)⁴)   ← Au carré
  — Parseval donne 6π² = 9π²/2 + (144/π²)S, avec S = Σk≥0 1/(2k + 1)⁴. Isole S :  [juge value]  départ : S
    = (6π² − 9π²/2)(π²/144)   ← Isoler S
    = π⁴/96
  aides : (2/T)∫ f² = a₀²/2 + Σ (aₙ² + bₙ²), sur la période où f est donnée. | G = (2/π)(∫_{0}^{π} (3x)² dx) | G = 6π²
  pièges : f_parseval_bounds, f_parseval_factor, f_parseval_square

```

### Niveau 4

```
f(x) = 3|x| sur ]−π ; π[, 2π-périodique. Ses coefficients : a₀ = 3π, a₂ₖ = 0, a₂ₖ₊₁ = −12/(π(2k + 1)²), bₙ = 0. Avec l'égalité de Parseval, calcule S = Σk≥0 1/(2k + 1)⁴.
  [free, suivre l'erreur]  G
    (Membre de gauche : G = (2/T)∫ f(x)² dx, sur la période où f est donnée.)
    = (2/π)(∫_{0}^{π} (3x)² dx)   ← (2/T)∫ f²
    = 6π²
  — Le terme constant : a₀²/2, avec a₀ = 3π.  [juge value]  départ : a_0²/2
    = (3π)²/2   ← a₀²/2
    = 9π²/2
  — Le carré du coefficient, a₂ₖ₊₁² :  [juge equiv]  départ : (−12/(π(2k + 1)²))²
    = 144/(π²(2k + 1)⁴)   ← Au carré
  — Parseval donne 6π² = 9π²/2 + (144/π²)S, avec S = Σk≥0 1/(2k + 1)⁴. Isole S :  [juge value]  départ : S
    = (6π² − 9π²/2)(π²/144)   ← Isoler S
    = π⁴/96
  aides : (2/T)∫ f² = a₀²/2 + Σ (aₙ² + bₙ²), sur la période où f est donnée. | G = (2/π)(∫_{0}^{π} (3x)² dx) | G = 6π²
  pièges : f_parseval_bounds, f_parseval_factor, f_parseval_square

f(x) = x² sur ]−π ; π[, 2π-périodique. Ses coefficients : a₀ = 2π²/3, aₙ = 4(−1)ⁿ/n², bₙ = 0. Avec l'égalité de Parseval, calcule S = Σn≥1 1/n⁴.
  [free, suivre l'erreur]  G
    (Membre de gauche : G = (2/T)∫ f(x)² dx, sur la période où f est donnée.)
    = (1/π)(∫_{−π}^{π} (x²)² dx)   ← (2/T)∫ f²
    = 2π⁴/5
  — Le terme constant : a₀²/2, avec a₀ = 2π²/3.  [juge value]  départ : a_0²/2
    = (2π²/3)²/2   ← a₀²/2
    = 2π⁴/9
  — Le carré du coefficient, aₙ² :  [juge equiv]  départ : (4(−1)^n/n²)²
    = 16/n⁴   ← Au carré
  — Parseval donne 2π⁴/5 = 2π⁴/9 + 16S, avec S = Σn≥1 1/n⁴. Isole S :  [juge value]  départ : S
    = π⁴/90
  aides : (2/T)∫ f² = a₀²/2 + Σ (aₙ² + bₙ²), sur la période où f est donnée. | G = (1/π)(∫_{−π}^{π} (x²)² dx) | G = 2π⁴/5
  pièges : f_parseval_bounds, f_parseval_factor, f_parseval_square

f(x) = 3x² sur ]−π ; π[, 2π-périodique. Ses coefficients : a₀ = 2π², aₙ = 12(−1)ⁿ/n², bₙ = 0. Avec l'égalité de Parseval, calcule S = Σn≥1 1/n⁴.
  [free, suivre l'erreur]  G
    (Membre de gauche : G = (2/T)∫ f(x)² dx, sur la période où f est donnée.)
    = (1/π)(∫_{−π}^{π} (3x²)² dx)   ← (2/T)∫ f²
    = 18π⁴/5
  — Le terme constant : a₀²/2, avec a₀ = 2π².  [juge value]  départ : a_0²/2
    = (2π²)²/2   ← a₀²/2
    = 2π⁴
  — Le carré du coefficient, aₙ² :  [juge equiv]  départ : (12(−1)^n/n²)²
    = 144/n⁴   ← Au carré
  — Parseval donne 18π⁴/5 = 2π⁴ + 144S, avec S = Σn≥1 1/n⁴. Isole S :  [juge value]  départ : S
    = π⁴/90
  aides : (2/T)∫ f² = a₀²/2 + Σ (aₙ² + bₙ²), sur la période où f est donnée. | G = (1/π)(∫_{−π}^{π} (3x²)² dx) | G = 18π⁴/5
  pièges : f_parseval_bounds, f_parseval_factor, f_parseval_square

```

### Niveau 5

```
f(x) = x³ sur ]−π ; π[, 2π-périodique : aₙ = 0 et bₙ = (−1)ⁿ⁺¹(2π²/n − 12/n³). On donne Σ 1/n² = π²/6 et Σ 1/n⁴ = π⁴/90. Avec Parseval, calcule S = Σn≥1 1/n⁶.
  [free, sans aide]  G
    (Membre de gauche : G = (2/T)∫ f(x)² dx, sur la période où f est donnée.)
    = (1/π)(∫_{−π}^{π} (x³)² dx)   ← (2/T)∫ f²
    = 2π⁶/7
  — Développe bₙ² :  [juge equiv]  départ : ((−1)^(n + 1)(2π²/n − 12/n³))²
    = 4π⁴/n² − 48π²/n⁴ + 144/n⁶   ← (a − b)² = a² − 2ab + b²
  — Avec Σ 1/n² = π²/6 et Σ 1/n⁴ = π⁴/90, et S = Σ 1/n⁶ : Σ bₙ² =  [juge equiv]  départ : 4π⁴(π²/6) − 48π²(π⁴/90) + 144S
    = 2π⁶/15 + 144S   ← 2π⁶/3 − 8π⁶/15
  — Parseval : 2π⁶/7 = 2π⁶/15 + 144S. Isole S :  [juge value]  départ : S
    = π⁶/945
  pièges : f_parseval_bounds, f_parseval_factor, f_parseval_square

f(x) = x³ sur ]−π ; π[, 2π-périodique : aₙ = 0 et bₙ = (−1)ⁿ⁺¹(2π²/n − 12/n³). On donne Σ 1/n² = π²/6 et Σ 1/n⁴ = π⁴/90. Avec Parseval, calcule S = Σn≥1 1/n⁶.
  [free, sans aide]  G
    (Membre de gauche : G = (2/T)∫ f(x)² dx, sur la période où f est donnée.)
    = (1/π)(∫_{−π}^{π} (x³)² dx)   ← (2/T)∫ f²
    = 2π⁶/7
  — Développe bₙ² :  [juge equiv]  départ : ((−1)^(n + 1)(2π²/n − 12/n³))²
    = 4π⁴/n² − 48π²/n⁴ + 144/n⁶   ← (a − b)² = a² − 2ab + b²
  — Avec Σ 1/n² = π²/6 et Σ 1/n⁴ = π⁴/90, et S = Σ 1/n⁶ : Σ bₙ² =  [juge equiv]  départ : 4π⁴(π²/6) − 48π²(π⁴/90) + 144S
    = 2π⁶/15 + 144S   ← 2π⁶/3 − 8π⁶/15
  — Parseval : 2π⁶/7 = 2π⁶/15 + 144S. Isole S :  [juge value]  départ : S
    = π⁶/945
  pièges : f_parseval_bounds, f_parseval_factor, f_parseval_square

f(x) = x³ sur ]−π ; π[, 2π-périodique : aₙ = 0 et bₙ = (−1)ⁿ⁺¹(2π²/n − 12/n³). On donne Σ 1/n² = π²/6 et Σ 1/n⁴ = π⁴/90. Avec Parseval, calcule S = Σn≥1 1/n⁶.
  [free, sans aide]  G
    (Membre de gauche : G = (2/T)∫ f(x)² dx, sur la période où f est donnée.)
    = (1/π)(∫_{−π}^{π} (x³)² dx)   ← (2/T)∫ f²
    = 2π⁶/7
  — Développe bₙ² :  [juge equiv]  départ : ((−1)^(n + 1)(2π²/n − 12/n³))²
    = 4π⁴/n² − 48π²/n⁴ + 144/n⁶   ← (a − b)² = a² − 2ab + b²
  — Avec Σ 1/n² = π²/6 et Σ 1/n⁴ = π⁴/90, et S = Σ 1/n⁶ : Σ bₙ² =  [juge equiv]  départ : 4π⁴(π²/6) − 48π²(π⁴/90) + 144S
    = 2π⁶/15 + 144S   ← 2π⁶/3 − 8π⁶/15
  — Parseval : 2π⁶/7 = 2π⁶/15 + 144S. Isole S :  [juge value]  départ : S
    = π⁶/945
  pièges : f_parseval_bounds, f_parseval_factor, f_parseval_square

```

### Variantes d'examen

```
f(x) = 2x² sur ]−π ; π[, 2π-périodique : a₀ = 4π²/3, aₙ = 8(−1)ⁿ/n², bₙ = 0. Quelles égalités sont vraies ? (plusieurs réponses possibles)
  · (1/π)(∫_{−π}^{π} (2x²)² dx) = a₀² + Σ aₙ² [f_parseval_a0]   ✔ (1/π)(∫_{−π}^{π} (2x²)² dx) = a₀²/2 + Σ aₙ²   · (1/π)(∫_{0}^{2π} (2x²)² dx) = a₀²/2 + Σ aₙ² [f_parseval_bounds]   ✔ Σn≥1 1/n⁴ = π⁴/90   ✔ (1/π)(∫_{−π}^{π} (2x²)² dx) = 8π⁴/5   · ∫_{−π}^{π} (2x²)² dx = a₀²/2 + Σ aₙ² [f_parseval_factor]
  [examen mcq]
  pièges : f_parseval_factor, f_parseval_a0, f_parseval_bounds

f(x) = x³ sur ]−π ; π[, 2π-périodique : aₙ = 0 et bₙ = (−1)ⁿ⁺¹(2π²/n − 12/n³). On donne Σ 1/n² = π²/6 et Σ 1/n⁴ = π⁴/90. Avec Parseval, calcule S = Σn≥1 1/n⁶.
  [problème, examen open, 5 points]
  partie 1 (Début du problème : 2 ; Développe bₙ² : 1 ; Avec Σ 1/n² = π²/6 et Σ 1/n⁴ = π⁴/90, et S = Σ 1/n⁶ : Σ bₙ² = : 1 ; Parseval : 2π⁶/7 = 2π⁶/15 + 144S. Isole S : 1)
    [free, sans aide, suivre l'erreur, examen open]  G
      (Membre de gauche : G = (2/T)∫ f(x)² dx, sur la période où f est donnée.)
      = (1/π)(∫_{−π}^{π} (x³)² dx)   ← (2/T)∫ f²
      = 2π⁶/7
    — Développe bₙ² :  [juge equiv]  départ : ((−1)^(n + 1)(2π²/n − 12/n³))²
      = 4π⁴/n² − 48π²/n⁴ + 144/n⁶   ← (a − b)² = a² − 2ab + b²
    — Avec Σ 1/n² = π²/6 et Σ 1/n⁴ = π⁴/90, et S = Σ 1/n⁶ : Σ bₙ² =  [juge equiv]  départ : 4π⁴(π²/6) − 48π²(π⁴/90) + 144S
      = 2π⁶/15 + 144S   ← 2π⁶/3 − 8π⁶/15
    — Parseval : 2π⁶/7 = 2π⁶/15 + 144S. Isole S :  [juge value]  départ : S
      = π⁶/945
  pièges : f_parseval_bounds, f_parseval_factor, f_parseval_square

```

## Relations entre coefficients ; dérivation terme à terme (`f-coef-relations`, BA4)

_aₙ(h) = −bₙ(h′)/(nω) pour h continue : les coefficients d'une primitive sans recalcul._

### Niveau 1

```
f(x) = x sur ]−π ; π[, 2π-périodique, a pour coefficients aₙ = 0, bₙ = 2(−1)ⁿ⁺¹/n. Sans recalculer d'intégrale par parties, donne les coefficients de g(x) = 4x² sur ]−π ; π[ (prolongée par périodicité).
  [guided]  a_n
    (Relation : si h est continue et 2π-périodique, C¹ par morceaux, alors aₙ(h) = −bₙ(h′)/n.)
    (Avec h = x²/2 (h′ = x, bₙ(h′) = 2(−1)ⁿ⁺¹/n) :)
    = 2(−1)^n/n²   ← −bₙ(h′)/n
  — g = 4x² = 8·h :  [juge prob]  départ : a_n
    = 16(−1)^n/n²   ← 8·aₙ(h)
  — a₀(g) se calcule à part :  [juge definite]  départ : (1/π)(∫_{−π}^{π} 4x² dx)
    = □   (trous : 8π²/3)   ← (2/T)∫ g
  aides : Par parties, aₙ(h) = −bₙ(h′)/n pour h continue et périodique ; puis la constante entre h et g ; a₀ à part. | aₙ(h) = −(2(−1)^(n + 1)/n)/n | aₙ(h) = 2(−1)^n/n²

f(x) = x³ sur ]−π ; π[, 2π-périodique, a pour coefficients aₙ = 0, bₙ = (−1)ⁿ⁺¹(2π²/n − 12/n³). Sans recalculer d'intégrale par parties, donne les coefficients de g(x) = x⁴ sur ]−π ; π[ (prolongée par périodicité).
  [guided]  a_n
    (Relation : si h est continue et 2π-périodique, C¹ par morceaux, alors aₙ(h) = −bₙ(h′)/n.)
    (Avec h = x⁴/4 (h′ = x³, bₙ(h′) = (−1)ⁿ⁺¹(2π²/n − 12/n³)) :)
    = (−1)^n(2π²/n² − 12/n⁴)   ← −bₙ(h′)/n
  — g = x⁴ = 4·h :  [juge prob]  départ : a_n
    = 8π²(−1)^n/n² + 48(−1)^(n + 1)/n⁴   ← 4·aₙ(h)
  — a₀(g) se calcule à part :  [juge definite]  départ : (1/π)(∫_{−π}^{π} x⁴ dx)
    = □   (trous : 2π⁴/5)   ← (2/T)∫ g
  aides : Par parties, aₙ(h) = −bₙ(h′)/n pour h continue et périodique ; puis la constante entre h et g ; a₀ à part. | aₙ(h) = −((−1)^(n + 1)(2π²/n − 12/n³))/n | aₙ(h) = (−1)^n(2π²/n² − 12/n⁴)

f(x) = x sur ]−π ; π[, 2π-périodique, a pour coefficients aₙ = 0, bₙ = 2(−1)ⁿ⁺¹/n. Sans recalculer d'intégrale par parties, donne les coefficients de g(x) = 2x² sur ]−π ; π[ (prolongée par périodicité).
  [guided]  a_n
    (Relation : si h est continue et 2π-périodique, C¹ par morceaux, alors aₙ(h) = −bₙ(h′)/n.)
    (Avec h = x²/2 (h′ = x, bₙ(h′) = 2(−1)ⁿ⁺¹/n) :)
    = 2(−1)^n/n²   ← −bₙ(h′)/n
  — g = 2x² = 4·h :  [juge prob]  départ : a_n
    = 8(−1)^n/n²   ← 4·aₙ(h)
  — a₀(g) se calcule à part :  [juge definite]  départ : (1/π)(∫_{−π}^{π} 2x² dx)
    = □   (trous : 4π²/3)   ← (2/T)∫ g
  aides : Par parties, aₙ(h) = −bₙ(h′)/n pour h continue et périodique ; puis la constante entre h et g ; a₀ à part. | aₙ(h) = −(2(−1)^(n + 1)/n)/n | aₙ(h) = 2(−1)^n/n²

```

### Niveau 2

```
f(x) = x³ sur ]−π ; π[, 2π-périodique, a pour coefficients aₙ = 0, bₙ = (−1)ⁿ⁺¹(2π²/n − 12/n³). Sans recalculer d'intégrale par parties, donne les coefficients de g(x) = x⁴ sur ]−π ; π[ (prolongée par périodicité).
  [guided]  a_n
    ? h = x⁴/4 sur ]−π ; π[, h′ = x³. Que vaut aₙ(h) ? ✔ aₙ(h) = −bₙ(h′)/n : h est continue (h(−π) = h(π)) et C¹ par morceaux / · aₙ(h) = bₙ(h′)/n / · aₙ(h) = −n·bₙ(h′) / ✔ Recalculer aₙ(h) par parties
    (Avec h = x⁴/4 (h′ = x³, bₙ(h′) = (−1)ⁿ⁺¹(2π²/n − 12/n³)) :)
    = (−1)^n(2π²/n² − 12/n⁴)   ← −bₙ(h′)/n
  — g = x⁴ = 4·h :  [juge prob]  départ : a_n
    = 8π²(−1)^n/n² + 48(−1)^(n + 1)/n⁴   ← 4·aₙ(h)
  — a₀(g) se calcule à part :  [juge definite]  départ : (1/π)(∫_{−π}^{π} x⁴ dx)
    = □   (trous : 2π⁴/5)   ← (2/T)∫ g
  aides : Par parties, aₙ(h) = −bₙ(h′)/n pour h continue et périodique ; puis la constante entre h et g ; a₀ à part. | aₙ(h) = −((−1)^(n + 1)(2π²/n − 12/n³))/n | aₙ(h) = (−1)^n(2π²/n² − 12/n⁴)

f(x) = x sur ]−π ; π[, 2π-périodique, a pour coefficients aₙ = 0, bₙ = 2(−1)ⁿ⁺¹/n. Sans recalculer d'intégrale par parties, donne les coefficients de g(x) = x²/4 sur ]−π ; π[ (prolongée par périodicité).
  [guided]  a_n
    ? h = x²/2 sur ]−π ; π[, h′ = x. Que vaut aₙ(h) ? ✔ aₙ(h) = −bₙ(h′)/n : h est continue (h(−π) = h(π)) et C¹ par morceaux / · aₙ(h) = bₙ(h′)/n / · aₙ(h) = −n·bₙ(h′) / ✔ Recalculer aₙ(h) par parties
    (Avec h = x²/2 (h′ = x, bₙ(h′) = 2(−1)ⁿ⁺¹/n) :)
    = 2(−1)^n/n²   ← −bₙ(h′)/n
  — g = x²/4 = (1/2)·h :  [juge prob]  départ : a_n
    = (−1)^n/n²   ← (1/2)·aₙ(h)
  — a₀(g) se calcule à part :  [juge definite]  départ : (1/π)(∫_{−π}^{π} x²/4 dx)
    = □   (trous : π²/6)   ← (2/T)∫ g
  aides : Par parties, aₙ(h) = −bₙ(h′)/n pour h continue et périodique ; puis la constante entre h et g ; a₀ à part. | aₙ(h) = −(2(−1)^(n + 1)/n)/n | aₙ(h) = 2(−1)^n/n²

f(x) = x sur ]−π ; π[, 2π-périodique, a pour coefficients aₙ = 0, bₙ = 2(−1)ⁿ⁺¹/n. Sans recalculer d'intégrale par parties, donne les coefficients de g(x) = x²/4 sur ]−π ; π[ (prolongée par périodicité).
  [guided]  a_n
    ? h = x²/2 sur ]−π ; π[, h′ = x. Que vaut aₙ(h) ? ✔ aₙ(h) = −bₙ(h′)/n : h est continue (h(−π) = h(π)) et C¹ par morceaux / · aₙ(h) = bₙ(h′)/n / · aₙ(h) = −n·bₙ(h′) / ✔ Recalculer aₙ(h) par parties
    (Avec h = x²/2 (h′ = x, bₙ(h′) = 2(−1)ⁿ⁺¹/n) :)
    = 2(−1)^n/n²   ← −bₙ(h′)/n
  — g = x²/4 = (1/2)·h :  [juge prob]  départ : a_n
    = (−1)^n/n²   ← (1/2)·aₙ(h)
  — a₀(g) se calcule à part :  [juge definite]  départ : (1/π)(∫_{−π}^{π} x²/4 dx)
    = □   (trous : π²/6)   ← (2/T)∫ g
  aides : Par parties, aₙ(h) = −bₙ(h′)/n pour h continue et périodique ; puis la constante entre h et g ; a₀ à part. | aₙ(h) = −(2(−1)^(n + 1)/n)/n | aₙ(h) = 2(−1)^n/n²

```

### Niveau 3

```
f(x) = x sur ]−π ; π[, 2π-périodique, a pour coefficients aₙ = 0, bₙ = 2(−1)ⁿ⁺¹/n. Sans recalculer d'intégrale par parties, donne les coefficients de g(x) = 4x² sur ]−π ; π[ (prolongée par périodicité).
  [tap, suivre l'erreur, menu steps]  a_n
    ? h = x²/2 sur ]−π ; π[, h′ = x. Que vaut aₙ(h) ? ✔ aₙ(h) = −bₙ(h′)/n : h est continue (h(−π) = h(π)) et C¹ par morceaux / · aₙ(h) = bₙ(h′)/n / · aₙ(h) = −n·bₙ(h′) / ✔ Recalculer aₙ(h) par parties
    ? Et dans l'autre sens : peut-on dériver terme à terme la série de f(x) = x (2π-périodique) pour obtenir celle de f′ ? ✔ Non : le prolongement périodique de x saute aux bords de ]−π ; π[ / · Oui : aₙ(f′) = nω·bₙ(f) vaut toujours
    (Avec h = x²/2 (h′ = x, bₙ(h′) = 2(−1)ⁿ⁺¹/n) :)
    = 2(−1)^n/n²   ← −bₙ(h′)/n
  — g = 4x² = 8·h :  [juge prob]  départ : a_n
    = 16(−1)^n/n²   ← 8·aₙ(h)
  — a₀(g) se calcule à part :  [juge definite]  départ : (1/π)(∫_{−π}^{π} 4x² dx)
    = 8π²/3   ← (2/T)∫ g
  aides : Par parties, aₙ(h) = −bₙ(h′)/n pour h continue et périodique ; puis la constante entre h et g ; a₀ à part. | aₙ(h) = −(2(−1)^(n + 1)/n)/n | aₙ(h) = 2(−1)^n/n²
  pièges : f_termwise_deriv

f(x) = 2x sur [−1 ; 1[, 2-périodique, a pour coefficients aₙ = 0, bₙ = 4(−1)ⁿ⁺¹/(nπ). Sans recalculer d'intégrale par parties, donne les coefficients de g(x) = 2x² sur [−1 ; 1[ (prolongée par périodicité).
  [tap, suivre l'erreur, menu steps]  a_n
    ? h = x² sur [−1 ; 1[, h′ = 2x. Que vaut aₙ(h) ? ✔ aₙ(h) = −bₙ(h′)/(nπ) : h est continue (h(−1) = h(1)) et C¹ par morceaux / · aₙ(h) = bₙ(h′)/(nπ) / · aₙ(h) = −nπ·bₙ(h′) / ✔ Recalculer aₙ(h) par parties
    ? Et dans l'autre sens : peut-on dériver terme à terme la série de f(x) = 2x (2-périodique) pour obtenir celle de f′ ? ✔ Non : le prolongement périodique de 2x saute aux bords de [−1 ; 1[ / · Oui : aₙ(f′) = nω·bₙ(f) vaut toujours
    (Avec h = x² (h′ = 2x, bₙ(h′) = 4(−1)ⁿ⁺¹/(nπ)) :)
    = 4(−1)^n/(n²π²)   ← −bₙ(h′)/(nπ)
  — g = 2x² = 2·h :  [juge prob]  départ : a_n
    = 8(−1)^n/(π²n²)   ← 2·aₙ(h)
  — a₀(g) se calcule à part :  [juge definite]  départ : ∫_{−1}^{1} 2x² dx
    = 4/3   ← (2/T)∫ g
  aides : Par parties, aₙ(h) = −bₙ(h′)/(nπ) pour h continue et périodique ; puis la constante entre h et g ; a₀ à part. | aₙ(h) = −(4(−1)^(n + 1)/(nπ))/(nπ) | aₙ(h) = 4(−1)^n/(n²π²)
  pièges : f_termwise_deriv

f(x) = x sur ]−π ; π[, 2π-périodique, a pour coefficients aₙ = 0, bₙ = 2(−1)ⁿ⁺¹/n. Sans recalculer d'intégrale par parties, donne les coefficients de g(x) = x²/4 sur ]−π ; π[ (prolongée par périodicité).
  [tap, suivre l'erreur, menu steps]  a_n
    ? h = x²/2 sur ]−π ; π[, h′ = x. Que vaut aₙ(h) ? ✔ aₙ(h) = −bₙ(h′)/n : h est continue (h(−π) = h(π)) et C¹ par morceaux / · aₙ(h) = bₙ(h′)/n / · aₙ(h) = −n·bₙ(h′) / ✔ Recalculer aₙ(h) par parties
    ? Et dans l'autre sens : peut-on dériver terme à terme la série de f(x) = x (2π-périodique) pour obtenir celle de f′ ? ✔ Non : le prolongement périodique de x saute aux bords de ]−π ; π[ / · Oui : aₙ(f′) = nω·bₙ(f) vaut toujours
    (Avec h = x²/2 (h′ = x, bₙ(h′) = 2(−1)ⁿ⁺¹/n) :)
    = 2(−1)^n/n²   ← −bₙ(h′)/n
  — g = x²/4 = (1/2)·h :  [juge prob]  départ : a_n
    = (−1)^n/n²   ← (1/2)·aₙ(h)
  — a₀(g) se calcule à part :  [juge definite]  départ : (1/π)(∫_{−π}^{π} x²/4 dx)
    = π²/6   ← (2/T)∫ g
  aides : Par parties, aₙ(h) = −bₙ(h′)/n pour h continue et périodique ; puis la constante entre h et g ; a₀ à part. | aₙ(h) = −(2(−1)^(n + 1)/n)/n | aₙ(h) = 2(−1)^n/n²
  pièges : f_termwise_deriv

```

### Niveau 4

```
f(x) = x sur ]−π ; π[, 2π-périodique, a pour coefficients aₙ = 0, bₙ = 2(−1)ⁿ⁺¹/n. Sans recalculer d'intégrale par parties, donne les coefficients de g(x) = 2x² sur ]−π ; π[ (prolongée par périodicité).
  [free, suivre l'erreur]  a_n
    ? h = x²/2 sur ]−π ; π[, h′ = x. Que vaut aₙ(h) ? ✔ aₙ(h) = −bₙ(h′)/n : h est continue (h(−π) = h(π)) et C¹ par morceaux / · aₙ(h) = bₙ(h′)/n / · aₙ(h) = −n·bₙ(h′) / ✔ Recalculer aₙ(h) par parties
    (Avec h = x²/2 (h′ = x, bₙ(h′) = 2(−1)ⁿ⁺¹/n) :)
    = 2(−1)^n/n²   ← −bₙ(h′)/n
  — g = 2x² = 4·h :  [juge prob]  départ : a_n
    = 8(−1)^n/n²   ← 4·aₙ(h)
  — a₀(g) se calcule à part :  [juge definite]  départ : (1/π)(∫_{−π}^{π} 2x² dx)
    = 4π²/3   ← (2/T)∫ g
  aides : Par parties, aₙ(h) = −bₙ(h′)/n pour h continue et périodique ; puis la constante entre h et g ; a₀ à part. | aₙ(h) = −(2(−1)^(n + 1)/n)/n | aₙ(h) = 2(−1)^n/n²

f(x) = x sur ]−π ; π[, 2π-périodique, a pour coefficients aₙ = 0, bₙ = 2(−1)ⁿ⁺¹/n. Sans recalculer d'intégrale par parties, donne les coefficients de g(x) = 4x² sur ]−π ; π[ (prolongée par périodicité).
  [free, suivre l'erreur]  a_n
    ? h = x²/2 sur ]−π ; π[, h′ = x. Que vaut aₙ(h) ? ✔ aₙ(h) = −bₙ(h′)/n : h est continue (h(−π) = h(π)) et C¹ par morceaux / · aₙ(h) = bₙ(h′)/n / · aₙ(h) = −n·bₙ(h′) / ✔ Recalculer aₙ(h) par parties
    (Avec h = x²/2 (h′ = x, bₙ(h′) = 2(−1)ⁿ⁺¹/n) :)
    = 2(−1)^n/n²   ← −bₙ(h′)/n
  — g = 4x² = 8·h :  [juge prob]  départ : a_n
    = 16(−1)^n/n²   ← 8·aₙ(h)
  — a₀(g) se calcule à part :  [juge definite]  départ : (1/π)(∫_{−π}^{π} 4x² dx)
    = 8π²/3   ← (2/T)∫ g
  aides : Par parties, aₙ(h) = −bₙ(h′)/n pour h continue et périodique ; puis la constante entre h et g ; a₀ à part. | aₙ(h) = −(2(−1)^(n + 1)/n)/n | aₙ(h) = 2(−1)^n/n²

f(x) = x³ sur ]−π ; π[, 2π-périodique, a pour coefficients aₙ = 0, bₙ = (−1)ⁿ⁺¹(2π²/n − 12/n³). Sans recalculer d'intégrale par parties, donne les coefficients de g(x) = 4x⁴ sur ]−π ; π[ (prolongée par périodicité).
  [free, suivre l'erreur]  a_n
    ? h = x⁴/4 sur ]−π ; π[, h′ = x³. Que vaut aₙ(h) ? ✔ aₙ(h) = −bₙ(h′)/n : h est continue (h(−π) = h(π)) et C¹ par morceaux / · aₙ(h) = bₙ(h′)/n / · aₙ(h) = −n·bₙ(h′) / ✔ Recalculer aₙ(h) par parties
    (Avec h = x⁴/4 (h′ = x³, bₙ(h′) = (−1)ⁿ⁺¹(2π²/n − 12/n³)) :)
    = (−1)^n(2π²/n² − 12/n⁴)   ← −bₙ(h′)/n
  — g = 4x⁴ = 16·h :  [juge prob]  départ : a_n
    = 32π²(−1)^n/n² + 192(−1)^(n + 1)/n⁴   ← 16·aₙ(h)
  — a₀(g) se calcule à part :  [juge definite]  départ : (1/π)(∫_{−π}^{π} 4x⁴ dx)
    = 8π⁴/5   ← (2/T)∫ g
  aides : Par parties, aₙ(h) = −bₙ(h′)/n pour h continue et périodique ; puis la constante entre h et g ; a₀ à part. | aₙ(h) = −((−1)^(n + 1)(2π²/n − 12/n³))/n | aₙ(h) = (−1)^n(2π²/n² − 12/n⁴)

```

### Niveau 5

```
f(x) = 2x sur [−1 ; 1[, 2-périodique, a pour coefficients aₙ = 0, bₙ = 4(−1)ⁿ⁺¹/(nπ). Sans recalculer d'intégrale par parties, donne les coefficients de g(x) = x²/2 sur [−1 ; 1[ (prolongée par périodicité).
  [free, sans aide]  a_n
    ? h = x² sur [−1 ; 1[, h′ = 2x. Que vaut aₙ(h) ? ✔ aₙ(h) = −bₙ(h′)/(nπ) : h est continue (h(−1) = h(1)) et C¹ par morceaux / · aₙ(h) = bₙ(h′)/(nπ) / · aₙ(h) = −nπ·bₙ(h′) / ✔ Recalculer aₙ(h) par parties
    ? Et dans l'autre sens : peut-on dériver terme à terme la série de f(x) = 2x (2-périodique) pour obtenir celle de f′ ? ✔ Non : le prolongement périodique de 2x saute aux bords de [−1 ; 1[ / · Oui : aₙ(f′) = nω·bₙ(f) vaut toujours
    (Avec h = x² (h′ = 2x, bₙ(h′) = 4(−1)ⁿ⁺¹/(nπ)) :)
    = 4(−1)^n/(n²π²)   ← −bₙ(h′)/(nπ)
  — g = x²/2 = (1/2)·h :  [juge prob]  départ : a_n
    = 2(−1)^n/(π²n²)   ← (1/2)·aₙ(h)
  — a₀(g) se calcule à part :  [juge definite]  départ : ∫_{−1}^{1} x²/2 dx
    = 1/3   ← (2/T)∫ g
  pièges : f_termwise_deriv

f(x) = x sur ]−π ; π[, 2π-périodique, a pour coefficients aₙ = 0, bₙ = 2(−1)ⁿ⁺¹/n. Sans recalculer d'intégrale par parties, donne les coefficients de g(x) = 2x² sur ]−π ; π[ (prolongée par périodicité).
  [free, sans aide]  a_n
    ? h = x²/2 sur ]−π ; π[, h′ = x. Que vaut aₙ(h) ? ✔ aₙ(h) = −bₙ(h′)/n : h est continue (h(−π) = h(π)) et C¹ par morceaux / · aₙ(h) = bₙ(h′)/n / · aₙ(h) = −n·bₙ(h′) / ✔ Recalculer aₙ(h) par parties
    ? Et dans l'autre sens : peut-on dériver terme à terme la série de f(x) = x (2π-périodique) pour obtenir celle de f′ ? ✔ Non : le prolongement périodique de x saute aux bords de ]−π ; π[ / · Oui : aₙ(f′) = nω·bₙ(f) vaut toujours
    (Avec h = x²/2 (h′ = x, bₙ(h′) = 2(−1)ⁿ⁺¹/n) :)
    = 2(−1)^n/n²   ← −bₙ(h′)/n
  — g = 2x² = 4·h :  [juge prob]  départ : a_n
    = 8(−1)^n/n²   ← 4·aₙ(h)
  — a₀(g) se calcule à part :  [juge definite]  départ : (1/π)(∫_{−π}^{π} 2x² dx)
    = 4π²/3   ← (2/T)∫ g
  pièges : f_termwise_deriv

f(x) = x sur ]−π ; π[, 2π-périodique, a pour coefficients aₙ = 0, bₙ = 2(−1)ⁿ⁺¹/n. Sans recalculer d'intégrale par parties, donne les coefficients de g(x) = x² sur ]−π ; π[ (prolongée par périodicité).
  [free, sans aide]  a_n
    ? h = x²/2 sur ]−π ; π[, h′ = x. Que vaut aₙ(h) ? ✔ aₙ(h) = −bₙ(h′)/n : h est continue (h(−π) = h(π)) et C¹ par morceaux / · aₙ(h) = bₙ(h′)/n / · aₙ(h) = −n·bₙ(h′) / ✔ Recalculer aₙ(h) par parties
    ? Et dans l'autre sens : peut-on dériver terme à terme la série de f(x) = x (2π-périodique) pour obtenir celle de f′ ? ✔ Non : le prolongement périodique de x saute aux bords de ]−π ; π[ / · Oui : aₙ(f′) = nω·bₙ(f) vaut toujours
    (Avec h = x²/2 (h′ = x, bₙ(h′) = 2(−1)ⁿ⁺¹/n) :)
    = 2(−1)^n/n²   ← −bₙ(h′)/n
  — g = x² = 2·h :  [juge prob]  départ : a_n
    = 4(−1)^n/n²   ← 2·aₙ(h)
  — a₀(g) se calcule à part :  [juge definite]  départ : (1/π)(∫_{−π}^{π} x² dx)
    = 2π²/3   ← (2/T)∫ g
  pièges : f_termwise_deriv

```

### Variantes d'examen

```
f(x) = x sur ]−π ; π[, 2π-périodique : aₙ = 0, bₙ = 2(−1)ⁿ⁺¹/n. Soit g(x) = x²/2 sur ]−π ; π[, prolongée par périodicité. Quelles affirmations sont vraies ? (plusieurs réponses possibles)
  ✔ aₙ(g) = 2(−1)^n/n²   ✔ a₀(g) = π²/3   ✔ bₙ(g) = 0   · On obtient a₀(g) en prenant n = 0 dans aₙ(g) [f_a0_separate]   · On peut dériver terme à terme la série de f(x) = x pour obtenir celle de f′ [f_termwise_deriv]
  [examen mcq]
  pièges : f_a0_separate, f_termwise_deriv

f(x) = x sur ]−π ; π[, 2π-périodique, a pour coefficients aₙ = 0, bₙ = 2(−1)ⁿ⁺¹/n. Sans recalculer d'intégrale par parties, donne les coefficients de g(x) = 2x² sur ]−π ; π[ (prolongée par périodicité).
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 1,5 ; g = 2x² = 4·h : 1,5 ; a₀(g) se calcule à part : 1)
    [free, sans aide, suivre l'erreur, examen open]  a_n
      (Avec h = x²/2 (h′ = x, bₙ(h′) = 2(−1)ⁿ⁺¹/n) :)
      = 2(−1)^n/n²   ← −bₙ(h′)/n
    — g = 2x² = 4·h :  [juge prob]  départ : a_n
      = 8(−1)^n/n²   ← 4·aₙ(h)
    — a₀(g) se calcule à part :  [juge definite]  départ : (1/π)(∫_{−π}^{π} 2x² dx)
      = 4π²/3   ← (2/T)∫ g

```

## Problème : série en sinus, Dirichlet, somme numérique (`f-series-problem`, BA4)

_Le problème d'examen MT : série en sinus, Dirichlet aux bords, une somme en π/2._

### Niveau 1

```
f(x) = 3(2πx − x²) sur [0 ; π]. (a) Calcule sa série en sinus F_s f.
  [guided]  (2/π)(∫_{0}^{π} (−3x² + 6πx)sin(nx) dx)
    (Formule : bₙ = (2/π)∫₀^π f(x) sin(nx) dx.)
    (bₙ :)
    = (2/π)([□]_{0}^{π} + (1/n)(∫_{0}^{π} (−6x + 6π)cos(nx) dx))   (trous : (2/π)([(3x² − 6πx)cos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} (−6x + 6π)cos(nx) dx)))   ← Par parties
    = (2/π)(□ + (1/n)(∫_{0}^{π} (−6x + 6π)cos(nx) dx))   (trous : (2/π)(3π²(−1)^(n + 1)/n + (1/n)(∫_{0}^{π} (−6x + 6π)cos(nx) dx)))   ← Aux bornes
    = (2/π)(3π²(−1)^(n + 1)/n + (1/n)([□]_{0}^{π} − (1/n)(∫_{0}^{π} −6sin(nx) dx)))   (trous : (2/π)(3π²(−1)^(n + 1)/n + (1/n)([(−6x + 6π)sin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} −6sin(nx) dx))))   ← Par parties
    = (2/π)(3π²(−1)^(n + 1)/n + (1/n)(−(1/n)(∫_{0}^{π} −6sin(nx) dx)))   ← Aux bornes
    = (2/π)(3π²(−1)^(n + 1)/n + (1/n)(−(1/n)([□]_{0}^{π})))   (trous : (2/π)(3π²(−1)^(n + 1)/n + (1/n)(−(1/n)([6cos(nx)/n]_{0}^{π}))))   ← Primitive
    = □   (trous : 6π(−1)^(n + 1)/n + 12(1 − (−1)^n)/(πn³))   ← Simplifier
  aides : (a) Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx, par parties. (b) Le prolongement impair vaut 0 en 0 et en π. (c) Écris Dirichlet en π/2. | bₙ = (2/π)(∫_{0}^{π} (−3x² + 6πx)sin(nx) dx) | bₙ = 6π(−1)^(n + 1)/n + 12(1 − (−1)^n)/(πn³)
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

f(x) = x(π − x) sur [0 ; π]. (a) Calcule sa série en sinus F_s f.
  [guided]  (2/π)(∫_{0}^{π} (−x² + πx)sin(nx) dx)
    (Formule : bₙ = (2/π)∫₀^π f(x) sin(nx) dx.)
    (bₙ :)
    = (2/π)([□]_{0}^{π} + (1/n)(∫_{0}^{π} (−2x + π)cos(nx) dx))   (trous : (2/π)([(x² − πx)cos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} (−2x + π)cos(nx) dx)))   ← Par parties
    = (2/π)((1/n)(∫_{0}^{π} (−2x + π)cos(nx) dx))   ← Aux bornes
    = (2/π)((1/n)([□]_{0}^{π} − (1/n)(∫_{0}^{π} −2sin(nx) dx)))   (trous : (2/π)((1/n)([(−2x + π)sin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} −2sin(nx) dx))))   ← Par parties
    = (2/π)((1/n)(−(1/n)(∫_{0}^{π} −2sin(nx) dx)))   ← Aux bornes
    = (2/π)((1/n)(−(1/n)([□]_{0}^{π})))   (trous : (2/π)((1/n)(−(1/n)([2cos(nx)/n]_{0}^{π}))))   ← Primitive
    = □   (trous : 4(1 − (−1)^n)/(πn³))   ← Simplifier
  — n pair : bₙ = 0. Pour n impair, n = 2k + 1 :  [juge equiv]  départ : 4(1 − (−1)^(2k + 1))/(π(2k + 1)³)
    = □   (trous : 8/(π(2k + 1)³))   ← (−1)^(2k+1) = −1
  aides : (a) Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx, par parties. (b) Le prolongement impair vaut 0 en 0 et en π. (c) Écris Dirichlet en π/2. | bₙ = (2/π)(∫_{0}^{π} (−x² + πx)sin(nx) dx) | bₙ = 4(1 − (−1)^n)/(πn³)
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

f(x) = x(π − x) sur [0 ; π]. On a trouvé b₂ₖ = 0 et b₂ₖ₊₁ = 8/(π(2k + 1)³) ; F_s f = f sur ]0 ; π[. (c) Déduis-en S = Σk≥0 (−1)ᵏ/(2k + 1)³.
  [guided]  (8/(π(2k + 1)³))sin((2k + 1)π/2)
    (En x = π/2, f est continue : F_s f(π/2) = f(π/2) = π²/4 = Σ bₙ sin(nπ/2). Pour n pair, sin(nπ/2) = 0 ; pour n = 2k + 1 (k ≥ 0), écris le terme b₂ₖ₊₁ sin((2k + 1)π/2) :)
    = □   (trous : 8(−1)^k/(π(2k + 1)³))   ← sin((2k + 1)π/2) = (−1)ᵏ
  — Donc π²/4 = (8/π)S, avec S = Σk≥0 (−1)ᵏ/(2k + 1)³. Isole S :  [juge value]  départ : S
    = □   (trous : π³/32)
  aides : (a) Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx, par parties. (b) Le prolongement impair vaut 0 en 0 et en π. (c) Écris Dirichlet en π/2. | bₙ = (2/π)(∫_{0}^{π} (−x² + πx)sin(nx) dx) | bₙ = 4(1 − (−1)^n)/(πn³)

```

### Niveau 2

```
f(x) = 3(2πx − x²) sur [0 ; π]. (a) Calcule sa série en sinus F_s f.
  [guided]  (2/π)(∫_{0}^{π} (−3x² + 6πx)sin(nx) dx)
    ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx / · bₙ = (1/π)∫₀^π f(x) sin(nx) dx / · aₙ = (2/π)∫₀^π f(x) cos(nx) dx / · bₙ = (1/π)∫₀^2π f(x) sin(nx) dx
    (bₙ :)
    = (2/π)([□]_{0}^{π} + (1/n)(∫_{0}^{π} (−6x + 6π)cos(nx) dx))   (trous : (2/π)([(3x² − 6πx)cos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} (−6x + 6π)cos(nx) dx)))   ← Par parties
    = (2/π)(□ + (1/n)(∫_{0}^{π} (−6x + 6π)cos(nx) dx))   (trous : (2/π)(3π²(−1)^(n + 1)/n + (1/n)(∫_{0}^{π} (−6x + 6π)cos(nx) dx)))   ← Aux bornes
    = (2/π)(3π²(−1)^(n + 1)/n + (1/n)([□]_{0}^{π} − (1/n)(∫_{0}^{π} −6sin(nx) dx)))   (trous : (2/π)(3π²(−1)^(n + 1)/n + (1/n)([(−6x + 6π)sin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} −6sin(nx) dx))))   ← Par parties
    = (2/π)(3π²(−1)^(n + 1)/n + (1/n)(−(1/n)(∫_{0}^{π} −6sin(nx) dx)))   ← Aux bornes
    = (2/π)(3π²(−1)^(n + 1)/n + (1/n)(−(1/n)([□]_{0}^{π})))   (trous : (2/π)(3π²(−1)^(n + 1)/n + (1/n)(−(1/n)([6cos(nx)/n]_{0}^{π}))))   ← Primitive
    = □   (trous : 6π(−1)^(n + 1)/n + 12(1 − (−1)^n)/(πn³))   ← Simplifier
  aides : (a) Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx, par parties. (b) Le prolongement impair vaut 0 en 0 et en π. (c) Écris Dirichlet en π/2. | bₙ = (2/π)(∫_{0}^{π} (−3x² + 6πx)sin(nx) dx) | bₙ = 6π(−1)^(n + 1)/n + 12(1 − (−1)^n)/(πn³)
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

f(x) = 2πx − x² sur [0 ; π]. On a trouvé bₙ = 2π(−1)^(n + 1)/n + 4(1 − (−1)^n)/(πn³). (b) Compare F_s f et f sur [0 ; π].
  [guided]  F(π)
    ? Le prolongement impair et 2π-périodique de f est-il continu ? ✔ Non : il saute en π (f(π) = π² ≠ 0). F_s f = f sur [0 ; π[ et F_s f(π) = 0 / · Oui : F_s f = f sur tout [0 ; π]
    (Compare F_s f et f : que vaut F_s f(π) ?)
    = □   (trous : 0)   ← Moyenne de f(π) et −f(π)
  aides : (a) Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx, par parties. (b) Le prolongement impair vaut 0 en 0 et en π. (c) Écris Dirichlet en π/2. | bₙ = (2/π)(∫_{0}^{π} (−x² + 2πx)sin(nx) dx) | bₙ = 2π(−1)^(n + 1)/n + 4(1 − (−1)^n)/(πn³)
  pièges : f_sine_endpoint

f(x) = 4x sur [0 ; π/2] et 4π − 4x sur [π/2 ; π]. (a) Calcule sa série en sinus F_s f.
  [guided]  (2/π)(∫_{0}^{π/2} 4xsin(nx) dx + ∫_{π/2}^{π} (4π − 4x)sin(nx) dx)
    ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx / · bₙ = (1/π)∫₀^π f(x) sin(nx) dx / · aₙ = (2/π)∫₀^π f(x) cos(nx) dx / · bₙ = (1/π)∫₀^2π f(x) sin(nx) dx
    (bₙ :)
    = (2/π)([□]_{0}^{π/2} + (4/n)(∫_{0}^{π/2} cos(nx) dx) + [(4x − 4π)cos(nx)/n]_{π/2}^{π} − (4/n)(∫_{π/2}^{π} cos(nx) dx))   (trous : (2/π)([−4xcos(nx)/n]_{0}^{π/2} + (4/n)(∫_{0}^{π/2} cos(nx) dx) + [(4x − 4π)cos(nx)/n]_{π/2}^{π} − (4/n)(∫_{π/2}^{π} cos(nx) dx)))   ← Par parties
    = (2/π)(−2πcos(nπ/2)/n + □ + 2πcos(nπ/2)/n + 4sin(nπ/2)/n²)   (trous : (2/π)(−2πcos(nπ/2)/n + 4sin(nπ/2)/n² + 2πcos(nπ/2)/n + 4sin(nπ/2)/n²))   ← Aux bornes
    = □   (trous : 16sin(nπ/2)/(πn²))   ← Simplifier
  — n pair : sin(nπ/2) = 0, donc bₙ = 0. Pour n = 2k + 1, sin((2k + 1)π/2) = (−1)ᵏ :  [juge equiv]  départ : 16sin((2k + 1)π/2)/(π(2k + 1)²)
    = □   (trous : 16(−1)^k/(π(2k + 1)²))   ← sin((2k + 1)π/2) = (−1)ᵏ
  aides : (a) Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx, par parties. (b) Le prolongement impair vaut 0 en 0 et en π. (c) Écris Dirichlet en π/2. | bₙ = (2/π)(∫_{0}^{π/2} 4xsin(nx) dx + ∫_{π/2}^{π} (4π − 4x)sin(nx) dx) | bₙ = 16sin(nπ/2)/(πn²)
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

```

### Niveau 3

```
f(x) = 4x sur [0 ; π/2] et 4π − 4x sur [π/2 ; π]. (a) Calcule sa série en sinus F_s f.
  [tap, suivre l'erreur, menu steps]  (2/π)(∫_{0}^{π/2} 4xsin(nx) dx + ∫_{π/2}^{π} (4π − 4x)sin(nx) dx)
    ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx / · bₙ = (1/π)∫₀^π f(x) sin(nx) dx / · aₙ = (2/π)∫₀^π f(x) cos(nx) dx / · bₙ = (1/π)∫₀^2π f(x) sin(nx) dx
    (bₙ :)
    = (2/π)([−4xcos(nx)/n]_{0}^{π/2} + (4/n)(∫_{0}^{π/2} cos(nx) dx) + [(4x − 4π)cos(nx)/n]_{π/2}^{π} − (4/n)(∫_{π/2}^{π} cos(nx) dx))   ← Par parties
    = (2/π)(−2πcos(nπ/2)/n + 4sin(nπ/2)/n² + 2πcos(nπ/2)/n + 4sin(nπ/2)/n²)   ← Aux bornes
    = 16sin(nπ/2)/(πn²)   ← Simplifier
  — n pair : sin(nπ/2) = 0, donc bₙ = 0. Pour n = 2k + 1, sin((2k + 1)π/2) = (−1)ᵏ :  [juge equiv]  départ : 16sin((2k + 1)π/2)/(π(2k + 1)²)
    = 16(−1)^k/(π(2k + 1)²)   ← sin((2k + 1)π/2) = (−1)ᵏ
  aides : (a) Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx, par parties. (b) Le prolongement impair vaut 0 en 0 et en π. (c) Écris Dirichlet en π/2. | bₙ = (2/π)(∫_{0}^{π/2} 4xsin(nx) dx + ∫_{π/2}^{π} (4π − 4x)sin(nx) dx) | bₙ = 16sin(nπ/2)/(πn²)
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

f(x) = 3x(π − x) sur [0 ; π]. (a) Calcule sa série en sinus F_s f.
  [tap, suivre l'erreur, menu steps]  (2/π)(∫_{0}^{π} (−3x² + 3πx)sin(nx) dx)
    ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx / · bₙ = (1/π)∫₀^π f(x) sin(nx) dx / · aₙ = (2/π)∫₀^π f(x) cos(nx) dx / · bₙ = (1/π)∫₀^2π f(x) sin(nx) dx
    (bₙ :)
    = (2/π)([(3x² − 3πx)cos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} (−6x + 3π)cos(nx) dx))   ← Par parties
    = (2/π)((1/n)(∫_{0}^{π} (−6x + 3π)cos(nx) dx))   ← Aux bornes
    = (2/π)((1/n)([(−6x + 3π)sin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} −6sin(nx) dx)))   ← Par parties
    = (2/π)((1/n)(−(1/n)(∫_{0}^{π} −6sin(nx) dx)))   ← Aux bornes
    = (2/π)((1/n)(−(1/n)([6cos(nx)/n]_{0}^{π})))   ← Primitive
    = 12(1 − (−1)^n)/(πn³)   ← Simplifier
  — n pair : bₙ = 0. Pour n impair, n = 2k + 1 :  [juge equiv]  départ : 12(1 − (−1)^(2k + 1))/(π(2k + 1)³)
    = 24/(π(2k + 1)³)   ← (−1)^(2k+1) = −1
  aides : (a) Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx, par parties. (b) Le prolongement impair vaut 0 en 0 et en π. (c) Écris Dirichlet en π/2. | bₙ = (2/π)(∫_{0}^{π} (−3x² + 3πx)sin(nx) dx) | bₙ = 12(1 − (−1)^n)/(πn³)
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

f(x) = 6x sur [0 ; π/2] et 6π − 6x sur [π/2 ; π]. (a) Calcule sa série en sinus F_s f.
  [tap, suivre l'erreur, menu steps]  (2/π)(∫_{0}^{π/2} 6xsin(nx) dx + ∫_{π/2}^{π} (6π − 6x)sin(nx) dx)
    ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx / · bₙ = (1/π)∫₀^π f(x) sin(nx) dx / · aₙ = (2/π)∫₀^π f(x) cos(nx) dx / · bₙ = (1/π)∫₀^2π f(x) sin(nx) dx
    (bₙ :)
    = (2/π)([−6xcos(nx)/n]_{0}^{π/2} + (6/n)(∫_{0}^{π/2} cos(nx) dx) + [(6x − 6π)cos(nx)/n]_{π/2}^{π} − (6/n)(∫_{π/2}^{π} cos(nx) dx))   ← Par parties
    = (2/π)(−3πcos(nπ/2)/n + 6sin(nπ/2)/n² + 3πcos(nπ/2)/n + 6sin(nπ/2)/n²)   ← Aux bornes
    = 24sin(nπ/2)/(πn²)   ← Simplifier
  — n pair : sin(nπ/2) = 0, donc bₙ = 0. Pour n = 2k + 1, sin((2k + 1)π/2) = (−1)ᵏ :  [juge equiv]  départ : 24sin((2k + 1)π/2)/(π(2k + 1)²)
    = 24(−1)^k/(π(2k + 1)²)   ← sin((2k + 1)π/2) = (−1)ᵏ
  aides : (a) Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx, par parties. (b) Le prolongement impair vaut 0 en 0 et en π. (c) Écris Dirichlet en π/2. | bₙ = (2/π)(∫_{0}^{π/2} 6xsin(nx) dx + ∫_{π/2}^{π} (6π − 6x)sin(nx) dx) | bₙ = 24sin(nπ/2)/(πn²)
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

```

### Niveau 4

```
f(x) = 2x sur [0 ; π/2] et 2π − 2x sur [π/2 ; π]. (a) Calcule sa série en sinus F_s f. (b) Compare F_s f et f sur [0 ; π]. (c) Déduis-en S = Σk≥0 1/(2k + 1)².
  [free, suivre l'erreur]  (2/π)(∫_{0}^{π/2} 2xsin(nx) dx + ∫_{π/2}^{π} (2π − 2x)sin(nx) dx)
    ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx / · bₙ = (1/π)∫₀^π f(x) sin(nx) dx / · aₙ = (2/π)∫₀^π f(x) cos(nx) dx / · bₙ = (1/π)∫₀^2π f(x) sin(nx) dx
    (bₙ :)
    = (2/π)([−2xcos(nx)/n]_{0}^{π/2} + (2/n)(∫_{0}^{π/2} cos(nx) dx) + [(2x − 2π)cos(nx)/n]_{π/2}^{π} − (2/n)(∫_{π/2}^{π} cos(nx) dx))   ← Par parties
    = (2/π)(−πcos(nπ/2)/n + 2sin(nπ/2)/n² + πcos(nπ/2)/n + 2sin(nπ/2)/n²)   ← Aux bornes
    = 8sin(nπ/2)/(πn²)   ← Simplifier
  — n pair : sin(nπ/2) = 0, donc bₙ = 0. Pour n = 2k + 1, sin((2k + 1)π/2) = (−1)ᵏ :  [juge equiv]  départ : 8sin((2k + 1)π/2)/(π(2k + 1)²)
    = 8(−1)^k/(π(2k + 1)²)   ← sin((2k + 1)π/2) = (−1)ᵏ
  — Compare F_s f et f : que vaut F_s f(π) ?  [juge value]  départ : F(π)
    ? Le prolongement impair et 2π-périodique de f est-il continu ? ✔ Oui : f(0) = f(π) = 0, donc F_s f = f sur tout [0 ; π] / · F_s f = f seulement sur ]0 ; π[ / · Non : il saute en π
    = 0   ← F_s f(π) = f(π) = 0
  — En x = π/2, f est continue : F_s f(π/2) = f(π/2) = π = Σ bₙ sin(nπ/2). Pour n pair, sin(nπ/2) = 0 ; pour n = 2k + 1 (k ≥ 0), écris le terme b₂ₖ₊₁ sin((2k + 1)π/2) :  [juge equiv]  départ : (8(−1)^k/(π(2k + 1)²))sin((2k + 1)π/2)
    = 8/(π(2k + 1)²)   ← sin((2k + 1)π/2) = (−1)ᵏ
  — Donc π = (8/π)S, avec S = Σk≥0 1/(2k + 1)². Isole S :  [juge value]  départ : S
    = π²/8
  aides : (a) Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx, par parties. (b) Le prolongement impair vaut 0 en 0 et en π. (c) Écris Dirichlet en π/2. | bₙ = (2/π)(∫_{0}^{π/2} 2xsin(nx) dx + ∫_{π/2}^{π} (2π − 2x)sin(nx) dx) | bₙ = 8sin(nπ/2)/(πn²)
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

f(x) = 2x(π − x) sur [0 ; π]. (a) Calcule sa série en sinus F_s f. (b) Compare F_s f et f sur [0 ; π]. (c) Déduis-en S = Σk≥0 (−1)ᵏ/(2k + 1)³.
  [free, suivre l'erreur]  (2/π)(∫_{0}^{π} (−2x² + 2πx)sin(nx) dx)
    ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx / · bₙ = (1/π)∫₀^π f(x) sin(nx) dx / · aₙ = (2/π)∫₀^π f(x) cos(nx) dx / · bₙ = (1/π)∫₀^2π f(x) sin(nx) dx
    (bₙ :)
    = (2/π)([(2x² − 2πx)cos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} (−4x + 2π)cos(nx) dx))   ← Par parties
    = (2/π)((1/n)(∫_{0}^{π} (−4x + 2π)cos(nx) dx))   ← Aux bornes
    = (2/π)((1/n)([(−4x + 2π)sin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} −4sin(nx) dx)))   ← Par parties
    = (2/π)((1/n)(−(1/n)(∫_{0}^{π} −4sin(nx) dx)))   ← Aux bornes
    = (2/π)((1/n)(−(1/n)([4cos(nx)/n]_{0}^{π})))   ← Primitive
    = 8(1 − (−1)^n)/(πn³)   ← Simplifier
  — n pair : bₙ = 0. Pour n impair, n = 2k + 1 :  [juge equiv]  départ : 8(1 − (−1)^(2k + 1))/(π(2k + 1)³)
    = 16/(π(2k + 1)³)   ← (−1)^(2k+1) = −1
  — Compare F_s f et f : que vaut F_s f(π) ?  [juge value]  départ : F(π)
    ? Le prolongement impair et 2π-périodique de f est-il continu ? ✔ Oui : f(0) = f(π) = 0, donc F_s f = f sur tout [0 ; π] / · F_s f = f seulement sur ]0 ; π[ / · Non : il saute en π
    = 0   ← F_s f(π) = f(π) = 0
  — En x = π/2, f est continue : F_s f(π/2) = f(π/2) = π²/2 = Σ bₙ sin(nπ/2). Pour n pair, sin(nπ/2) = 0 ; pour n = 2k + 1 (k ≥ 0), écris le terme b₂ₖ₊₁ sin((2k + 1)π/2) :  [juge equiv]  départ : (16/(π(2k + 1)³))sin((2k + 1)π/2)
    = 16(−1)^k/(π(2k + 1)³)   ← sin((2k + 1)π/2) = (−1)ᵏ
  — Donc π²/2 = (16/π)S, avec S = Σk≥0 (−1)ᵏ/(2k + 1)³. Isole S :  [juge value]  départ : S
    = π³/32
  aides : (a) Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx, par parties. (b) Le prolongement impair vaut 0 en 0 et en π. (c) Écris Dirichlet en π/2. | bₙ = (2/π)(∫_{0}^{π} (−2x² + 2πx)sin(nx) dx) | bₙ = 8(1 − (−1)^n)/(πn³)
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

f(x) = 2πx − x² sur [0 ; π]. (a) Calcule sa série en sinus F_s f. (b) Compare F_s f et f sur [0 ; π]. (c) Déduis-en S = Σk≥0 (−1)ᵏ/(2k + 1)³.
  [free, suivre l'erreur]  (2/π)(∫_{0}^{π} (−x² + 2πx)sin(nx) dx)
    ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx / · bₙ = (1/π)∫₀^π f(x) sin(nx) dx / · aₙ = (2/π)∫₀^π f(x) cos(nx) dx / · bₙ = (1/π)∫₀^2π f(x) sin(nx) dx
    (bₙ :)
    = (2/π)([(x² − 2πx)cos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} (−2x + 2π)cos(nx) dx))   ← Par parties
    = (2/π)(π²(−1)^(n + 1)/n + (1/n)(∫_{0}^{π} (−2x + 2π)cos(nx) dx))   ← Aux bornes
    = (2/π)(π²(−1)^(n + 1)/n + (1/n)([(−2x + 2π)sin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} −2sin(nx) dx)))   ← Par parties
    = (2/π)(π²(−1)^(n + 1)/n + (1/n)(−(1/n)(∫_{0}^{π} −2sin(nx) dx)))   ← Aux bornes
    = (2/π)(π²(−1)^(n + 1)/n + (1/n)(−(1/n)([2cos(nx)/n]_{0}^{π})))   ← Primitive
    = 2π(−1)^(n + 1)/n + 4(1 − (−1)^n)/(πn³)   ← Simplifier
  — Compare F_s f et f : que vaut F_s f(π) ?  [juge value]  départ : F(π)
    ? Le prolongement impair et 2π-périodique de f est-il continu ? ✔ Non : il saute en π (f(π) = π² ≠ 0). F_s f = f sur [0 ; π[ et F_s f(π) = 0 / · Oui : F_s f = f sur tout [0 ; π]
    = 0   ← Moyenne de f(π) et −f(π)
  — En x = π/2, f est continue : F_s f(π/2) = f(π/2) = 3π²/4 = Σ bₙ sin(nπ/2). Pour n pair, sin(nπ/2) = 0 ; pour n = 2k + 1 (k ≥ 0), écris le terme b₂ₖ₊₁ sin((2k + 1)π/2) :  [juge equiv]  départ : (2π/(2k + 1) + 8/(π(2k + 1)³))sin((2k + 1)π/2)
    = (−1)^k(2π/(2k + 1) + 8/(π(2k + 1)³))   ← sin((2k + 1)π/2) = (−1)ᵏ
  — Donc 3π²/4 = 2π·(π/4) + (8/π)S, avec S = Σk≥0 (−1)ᵏ/(2k + 1)³. On donne Σk≥0 (−1)ᵏ/(2k + 1) = π/4. Isole S :  [juge value]  départ : S
    = (3π²/4 − π²/2)(π/8)   ← Isoler S
    = π³/32
  aides : (a) Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx, par parties. (b) Le prolongement impair vaut 0 en 0 et en π. (c) Écris Dirichlet en π/2. | bₙ = (2/π)(∫_{0}^{π} (−x² + 2πx)sin(nx) dx) | bₙ = 2π(−1)^(n + 1)/n + 4(1 − (−1)^n)/(πn³)
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign, f_sine_endpoint

```

### Niveau 5

```
f(x) = 2x sur [0 ; π/2] et 2π − 2x sur [π/2 ; π]. (a) Calcule sa série en sinus F_s f. (b) Compare F_s f et f sur [0 ; π]. (c) Déduis-en S = Σk≥0 1/(2k + 1)².
  [problème, 9 points]
  partie 1 ((a) Série en sinus : 3 ; n pair : sin(nπ/2) = 0, donc bₙ = 0. Pour n = 2k + 1, sin((2k + 1)π/2) = (−1)ᵏ : 1)
  (a) La série en sinus F_s f.
    [free, sans aide, suivre l'erreur]  (2/π)(∫_{0}^{π/2} 2xsin(nx) dx + ∫_{π/2}^{π} (2π − 2x)sin(nx) dx)
      ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx / · bₙ = (1/π)∫₀^π f(x) sin(nx) dx / · aₙ = (2/π)∫₀^π f(x) cos(nx) dx / · bₙ = (1/π)∫₀^2π f(x) sin(nx) dx
      (bₙ :)
      = (2/π)([−2xcos(nx)/n]_{0}^{π/2} + (2/n)(∫_{0}^{π/2} cos(nx) dx) + [(2x − 2π)cos(nx)/n]_{π/2}^{π} − (2/n)(∫_{π/2}^{π} cos(nx) dx))   ← Par parties
      = (2/π)(−πcos(nπ/2)/n + 2sin(nπ/2)/n² + πcos(nπ/2)/n + 2sin(nπ/2)/n²)   ← Aux bornes
      = 8sin(nπ/2)/(πn²)   ← Simplifier
    — n pair : sin(nπ/2) = 0, donc bₙ = 0. Pour n = 2k + 1, sin((2k + 1)π/2) = (−1)ᵏ :  [juge equiv]  départ : 8sin((2k + 1)π/2)/(π(2k + 1)²)
      = 8(−1)^k/(π(2k + 1)²)   ← sin((2k + 1)π/2) = (−1)ᵏ
  partie 2 ((b) Comparer F_s f et f : 2)
  (b) Compare F_s f et f sur [0 ; π].
    [free, sans aide, suivre l'erreur]  F(π)
      ? Le prolongement impair et 2π-périodique de f est-il continu ? ✔ Oui : f(0) = f(π) = 0, donc F_s f = f sur tout [0 ; π] / · F_s f = f seulement sur ]0 ; π[ / · Non : il saute en π
      (Compare F_s f et f : que vaut F_s f(π) ?)
      = 0   ← F_s f(π) = f(π) = 0
  partie 3 ((c) La somme : 2 ; Donc π = (8/π)S, avec S = Σk≥0 1/(2k + 1)². Isole S : 1)
  (c) Déduis-en S = Σk≥0 1/(2k + 1)².
    [free, sans aide, suivre l'erreur]  (8(−1)^k/(π(2k + 1)²))sin((2k + 1)π/2)
      (En x = π/2, f est continue : F_s f(π/2) = f(π/2) = π = Σ bₙ sin(nπ/2). Pour n pair, sin(nπ/2) = 0 ; pour n = 2k + 1 (k ≥ 0), écris le terme b₂ₖ₊₁ sin((2k + 1)π/2) :)
      = 8/(π(2k + 1)²)   ← sin((2k + 1)π/2) = (−1)ᵏ
    — Donc π = (8/π)S, avec S = Σk≥0 1/(2k + 1)². Isole S :  [juge value]  départ : S
      = π²/8
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

f(x) = 2x(π − x) sur [0 ; π]. (a) Calcule sa série en sinus F_s f. (b) Compare F_s f et f sur [0 ; π]. (c) Déduis-en S = Σk≥0 (−1)ᵏ/(2k + 1)³.
  [problème, 9 points]
  partie 1 ((a) Série en sinus : 3 ; n pair : bₙ = 0. Pour n impair, n = 2k + 1 : 1)
  (a) La série en sinus F_s f.
    [free, sans aide, suivre l'erreur]  (2/π)(∫_{0}^{π} (−2x² + 2πx)sin(nx) dx)
      ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx / · bₙ = (1/π)∫₀^π f(x) sin(nx) dx / · aₙ = (2/π)∫₀^π f(x) cos(nx) dx / · bₙ = (1/π)∫₀^2π f(x) sin(nx) dx
      (bₙ :)
      = (2/π)([(2x² − 2πx)cos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} (−4x + 2π)cos(nx) dx))   ← Par parties
      = (2/π)((1/n)(∫_{0}^{π} (−4x + 2π)cos(nx) dx))   ← Aux bornes
      = (2/π)((1/n)([(−4x + 2π)sin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} −4sin(nx) dx)))   ← Par parties
      = (2/π)((1/n)(−(1/n)(∫_{0}^{π} −4sin(nx) dx)))   ← Aux bornes
      = (2/π)((1/n)(−(1/n)([4cos(nx)/n]_{0}^{π})))   ← Primitive
      = 8(1 − (−1)^n)/(πn³)   ← Simplifier
    — n pair : bₙ = 0. Pour n impair, n = 2k + 1 :  [juge equiv]  départ : 8(1 − (−1)^(2k + 1))/(π(2k + 1)³)
      = 16/(π(2k + 1)³)   ← (−1)^(2k+1) = −1
  partie 2 ((b) Comparer F_s f et f : 2)
  (b) Compare F_s f et f sur [0 ; π].
    [free, sans aide, suivre l'erreur]  F(π)
      ? Le prolongement impair et 2π-périodique de f est-il continu ? ✔ Oui : f(0) = f(π) = 0, donc F_s f = f sur tout [0 ; π] / · F_s f = f seulement sur ]0 ; π[ / · Non : il saute en π
      (Compare F_s f et f : que vaut F_s f(π) ?)
      = 0   ← F_s f(π) = f(π) = 0
  partie 3 ((c) La somme : 2 ; Donc π²/2 = (16/π)S, avec S = Σk≥0 (−1)ᵏ/(2k + 1)³. Isole S : 1)
  (c) Déduis-en S = Σk≥0 (−1)ᵏ/(2k + 1)³.
    [free, sans aide, suivre l'erreur]  (16/(π(2k + 1)³))sin((2k + 1)π/2)
      (En x = π/2, f est continue : F_s f(π/2) = f(π/2) = π²/2 = Σ bₙ sin(nπ/2). Pour n pair, sin(nπ/2) = 0 ; pour n = 2k + 1 (k ≥ 0), écris le terme b₂ₖ₊₁ sin((2k + 1)π/2) :)
      = 16(−1)^k/(π(2k + 1)³)   ← sin((2k + 1)π/2) = (−1)ᵏ
    — Donc π²/2 = (16/π)S, avec S = Σk≥0 (−1)ᵏ/(2k + 1)³. Isole S :  [juge value]  départ : S
      = π³/32
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

f(x) = 2(2πx − x²) sur [0 ; π]. (a) Calcule sa série en sinus F_s f. (b) Compare F_s f et f sur [0 ; π]. (c) Déduis-en S = Σk≥0 (−1)ᵏ/(2k + 1)³.
  [problème, 9 points]
  partie 1 ((a) Série en sinus : 4)
  (a) La série en sinus F_s f.
    [free, sans aide, suivre l'erreur]  (2/π)(∫_{0}^{π} (−2x² + 4πx)sin(nx) dx)
      ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx / · bₙ = (1/π)∫₀^π f(x) sin(nx) dx / · aₙ = (2/π)∫₀^π f(x) cos(nx) dx / · bₙ = (1/π)∫₀^2π f(x) sin(nx) dx
      (bₙ :)
      = (2/π)([(2x² − 4πx)cos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} (−4x + 4π)cos(nx) dx))   ← Par parties
      = (2/π)(2π²(−1)^(n + 1)/n + (1/n)(∫_{0}^{π} (−4x + 4π)cos(nx) dx))   ← Aux bornes
      = (2/π)(2π²(−1)^(n + 1)/n + (1/n)([(−4x + 4π)sin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} −4sin(nx) dx)))   ← Par parties
      = (2/π)(2π²(−1)^(n + 1)/n + (1/n)(−(1/n)(∫_{0}^{π} −4sin(nx) dx)))   ← Aux bornes
      = (2/π)(2π²(−1)^(n + 1)/n + (1/n)(−(1/n)([4cos(nx)/n]_{0}^{π})))   ← Primitive
      = 4π(−1)^(n + 1)/n + 8(1 − (−1)^n)/(πn³)   ← Simplifier
  partie 2 ((b) Comparer F_s f et f : 2)
  (b) Compare F_s f et f sur [0 ; π].
    [free, sans aide, suivre l'erreur]  F(π)
      ? Le prolongement impair et 2π-périodique de f est-il continu ? ✔ Non : il saute en π (f(π) = 2π² ≠ 0). F_s f = f sur [0 ; π[ et F_s f(π) = 0 / · Oui : F_s f = f sur tout [0 ; π]
      (Compare F_s f et f : que vaut F_s f(π) ?)
      = 0   ← Moyenne de f(π) et −f(π)
  partie 3 ((c) La somme : 2 ; Donc 3π²/2 = 4π·(π/4) + (16/π)S, avec S = Σk≥0 (−1)ᵏ/(2k + 1)³. On donne Σk≥0 (−1)ᵏ/(2k + 1) = π/4. Isole S : 1)
  (c) Déduis-en S = Σk≥0 (−1)ᵏ/(2k + 1)³.
    [free, sans aide, suivre l'erreur]  (4π/(2k + 1) + 16/(π(2k + 1)³))sin((2k + 1)π/2)
      (En x = π/2, f est continue : F_s f(π/2) = f(π/2) = 3π²/2 = Σ bₙ sin(nπ/2). Pour n pair, sin(nπ/2) = 0 ; pour n = 2k + 1 (k ≥ 0), écris le terme b₂ₖ₊₁ sin((2k + 1)π/2) :)
      = 2(−1)^k(2π/(2k + 1) + 8/(π(2k + 1)³))   ← sin((2k + 1)π/2) = (−1)ᵏ
    — Donc 3π²/2 = 4π·(π/4) + (16/π)S, avec S = Σk≥0 (−1)ᵏ/(2k + 1)³. On donne Σk≥0 (−1)ᵏ/(2k + 1) = π/4. Isole S :  [juge value]  départ : S
      = (3π²/2 − π²)(π/16)   ← Isoler S
      = π³/32
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign, f_sine_endpoint

```

### Variantes d'examen

```
f(x) = 3x(π − x) sur [0 ; π]. (a) Calcule sa série en sinus F_s f. (b) Compare F_s f et f sur [0 ; π]. (c) Déduis-en S = Σk≥0 (−1)ᵏ/(2k + 1)³.
  [problème, examen open, 9 points]
  partie 1 ((a) Série en sinus : 3 ; n pair : bₙ = 0. Pour n impair, n = 2k + 1 : 1)
  (a) La série en sinus F_s f.
    [free, sans aide, suivre l'erreur]  (2/π)(∫_{0}^{π} (−3x² + 3πx)sin(nx) dx)
      ? Série en sinus : quelle formule ? ✔ Prolongement impair : bₙ = (2/π)∫₀^π f(x) sin(nx) dx / · bₙ = (1/π)∫₀^π f(x) sin(nx) dx / · aₙ = (2/π)∫₀^π f(x) cos(nx) dx / · bₙ = (1/π)∫₀^2π f(x) sin(nx) dx
      (bₙ :)
      = (2/π)([(3x² − 3πx)cos(nx)/n]_{0}^{π} + (1/n)(∫_{0}^{π} (−6x + 3π)cos(nx) dx))   ← Par parties
      = (2/π)((1/n)(∫_{0}^{π} (−6x + 3π)cos(nx) dx))   ← Aux bornes
      = (2/π)((1/n)([(−6x + 3π)sin(nx)/n]_{0}^{π} − (1/n)(∫_{0}^{π} −6sin(nx) dx)))   ← Par parties
      = (2/π)((1/n)(−(1/n)(∫_{0}^{π} −6sin(nx) dx)))   ← Aux bornes
      = (2/π)((1/n)(−(1/n)([6cos(nx)/n]_{0}^{π})))   ← Primitive
      = 12(1 − (−1)^n)/(πn³)   ← Simplifier
    — n pair : bₙ = 0. Pour n impair, n = 2k + 1 :  [juge equiv]  départ : 12(1 − (−1)^(2k + 1))/(π(2k + 1)³)
      = 24/(π(2k + 1)³)   ← (−1)^(2k+1) = −1
  partie 2 ((b) Comparer F_s f et f : 2)
  (b) Compare F_s f et f sur [0 ; π].
    [free, sans aide, suivre l'erreur]  F(π)
      ? Le prolongement impair et 2π-périodique de f est-il continu ? ✔ Oui : f(0) = f(π) = 0, donc F_s f = f sur tout [0 ; π] / · F_s f = f seulement sur ]0 ; π[ / · Non : il saute en π
      (Compare F_s f et f : que vaut F_s f(π) ?)
      = 0   ← F_s f(π) = f(π) = 0
  partie 3 ((c) La somme : 2 ; Donc 3π²/4 = (24/π)S, avec S = Σk≥0 (−1)ᵏ/(2k + 1)³. Isole S : 1)
  (c) Déduis-en S = Σk≥0 (−1)ᵏ/(2k + 1)³.
    [free, sans aide, suivre l'erreur]  (24/(π(2k + 1)³))sin((2k + 1)π/2)
      (En x = π/2, f est continue : F_s f(π/2) = f(π/2) = 3π²/4 = Σ bₙ sin(nπ/2). Pour n pair, sin(nπ/2) = 0 ; pour n = 2k + 1 (k ≥ 0), écris le terme b₂ₖ₊₁ sin((2k + 1)π/2) :)
      = 24(−1)^k/(π(2k + 1)³)   ← sin((2k + 1)π/2) = (−1)ᵏ
    — Donc 3π²/4 = (24/π)S, avec S = Σk≥0 (−1)ᵏ/(2k + 1)³. Isole S :  [juge value]  départ : S
      = π³/32
  pièges : g3_reduce_swap, f_interval_02pi, f_sine_wrong_factor, f_ipp_sign

```

## Transformée de Fourier : définition et calcul direct (`f-ft-direct`, BA4)

_f̂(α) = (1/√(2π)) ∫ f(y) e^(−iαy) dy : définition avec ses hypothèses, parité, intégration par parties, f̂(0) à part._

### Niveau 1

```
Calcule la transformée de Fourier de f(x) = 3x si |x| ≤ 1, 0 sinon, puis f̂(0).
  [guided]  f(x) = H(1 − |x|)(3x)
    (Quelle forme de f̂ utiliser ? f est impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dx.)
    = f̂(α) = −i□(∫_{0}^{1} 3xsin(αx) dx)   (trous : f̂(α) = −i√(2/π)(∫_{0}^{1} 3xsin(αx) dx))   ← FP3 : f impaire
  — L'intégrale, par parties (α ≠ 0) :  [juge equiv]  départ : ∫_{0}^{1} 3xsin(αx) dx
    = −3□/α + ∫_{0}^{1} 3cos(αx)/α dx   (trous : −3cos(α)/α + ∫_{0}^{1} 3cos(αx)/α dx)   ← Intégration par parties
    = 3(sin(α) − αcos(α))/□   (trous : 3(sin(α) − αcos(α))/α²)   ← Encore par parties
  — Donc :  [juge transform]  départ : f̂(α) = −i√(2/π)(∫_{0}^{1} 3xsin(αx) dx)
    = f̂(α) = −3i√(2/π)(sin(α) − αcos(α))/α²   ← α ≠ 0
  — En α = 0, la formule a α² au dénominateur :  [juge definite]  départ : (1/√(2π))(∫_{−1}^{1} 3x dx)
    (Comment obtenir f̂(0) ? f̂(0) = (1/√(2π)) ∫ f(x) dx, calculée directement.)
    = 0   ← f impaire : ∫ f = 0
  aides : f est impaire : prends la forme en sin (FP3), puis intègre par parties. | f̂(α) = -i√(2/π) int(3x sin(α x), x, 0, 1) | -3cos(α)/α + int(3cos(α x)/α, x, 0, 1)
  pièges : f_ft_norm

Calcule la transformée de Fourier de f(x) = (1 − x²) si |x| ≤ 1, 0 sinon, puis f̂(0).
  [guided]  f(x) = H(1 − |x|)(1 − x²)
    (Quelle forme de f̂ utiliser ? f est paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dx.)
    = f̂(α) = □(∫_{0}^{1} (1 − x²)cos(αx) dx)   (trous : f̂(α) = √(2/π)(∫_{0}^{1} (1 − x²)cos(αx) dx))   ← FP2 : f paire
  — L'intégrale, par parties (α ≠ 0) :  [juge equiv]  départ : ∫_{0}^{1} (1 − x²)cos(αx) dx
    = ∫_{0}^{1} 2x□/α dx   (trous : ∫_{0}^{1} 2xsin(αx)/α dx)   ← Intégration par parties
    = 2(sin(α) − αcos(α))/□   (trous : 2(sin(α) − αcos(α))/α³)   ← Encore par parties
  — Donc :  [juge transform]  départ : f̂(α) = √(2/π)(∫_{0}^{1} (1 − x²)cos(αx) dx)
    = f̂(α) = 2√(2/π)(sin(α) − αcos(α))/α³   ← α ≠ 0
  — En α = 0, la formule a α³ au dénominateur :  [juge definite]  départ : (1/√(2π))(∫_{−1}^{1} (1 − x²) dx)
    (Comment obtenir f̂(0) ? f̂(0) = (1/√(2π)) ∫ f(x) dx, calculée directement.)
    = 2√2/(3√π)   ← f̂(0) = (1/√(2π))∫ f
  aides : f est paire : prends la forme en cos sur [0 ; ∞[ (FP2), puis intègre par parties. | f̂(α) = √(2/π) int((1-x^2)cos(α x), x, 0, 1) | int(2x sin(α x)/α, x, 0, 1)
  pièges : f_ft_norm

Calcule la transformée de Fourier de f(x) = 3x si |x| ≤ 1, 0 sinon, puis f̂(0).
  [guided]  f(x) = H(1 − |x|)(3x)
    (Quelle forme de f̂ utiliser ? f est impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dx.)
    = f̂(α) = −i□(∫_{0}^{1} 3xsin(αx) dx)   (trous : f̂(α) = −i√(2/π)(∫_{0}^{1} 3xsin(αx) dx))   ← FP3 : f impaire
  — L'intégrale, par parties (α ≠ 0) :  [juge equiv]  départ : ∫_{0}^{1} 3xsin(αx) dx
    = −3□/α + ∫_{0}^{1} 3cos(αx)/α dx   (trous : −3cos(α)/α + ∫_{0}^{1} 3cos(αx)/α dx)   ← Intégration par parties
    = 3(sin(α) − αcos(α))/□   (trous : 3(sin(α) − αcos(α))/α²)   ← Encore par parties
  — Donc :  [juge transform]  départ : f̂(α) = −i√(2/π)(∫_{0}^{1} 3xsin(αx) dx)
    = f̂(α) = −3i√(2/π)(sin(α) − αcos(α))/α²   ← α ≠ 0
  — En α = 0, la formule a α² au dénominateur :  [juge definite]  départ : (1/√(2π))(∫_{−1}^{1} 3x dx)
    (Comment obtenir f̂(0) ? f̂(0) = (1/√(2π)) ∫ f(x) dx, calculée directement.)
    = 0   ← f impaire : ∫ f = 0
  aides : f est impaire : prends la forme en sin (FP3), puis intègre par parties. | f̂(α) = -i√(2/π) int(3x sin(α x), x, 0, 1) | -3cos(α)/α + int(3cos(α x)/α, x, 0, 1)
  pièges : f_ft_norm

```

### Niveau 2

```
Calcule la transformée de Fourier de f(x) = 2(1 − x²) si |x| ≤ 1, 0 sinon, puis f̂(0).
  [guided]  f(x) = H(1 − |x|)(2(1 − x²))
    ? Quelle forme de f̂ utiliser ? ✔ f est paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dx / · f est impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dx / ✔ La définition (1/√(2π)) ∫ f(x) e^(−iαx) dx sur ℝ / · Lire une ligne de la table
    = f̂(α) = √(2/π)(∫_{0}^{1} 2(1 − x²)□ dx)   (trous : f̂(α) = √(2/π)(∫_{0}^{1} 2(1 − x²)cos(αx) dx))   ← FP2 : f paire
  — L'intégrale, par parties (α ≠ 0) :  [juge equiv]  départ : ∫_{0}^{1} 2(1 − x²)cos(αx) dx
    = ∫_{0}^{1} 4x□/α dx   (trous : ∫_{0}^{1} 4xsin(αx)/α dx)   ← Intégration par parties
    = 4(sin(α) − αcos(α))/□   (trous : 4(sin(α) − αcos(α))/α³)   ← Encore par parties
  — Donc :  [juge transform]  départ : f̂(α) = √(2/π)(∫_{0}^{1} 2(1 − x²)cos(αx) dx)
    = f̂(α) = 4√(2/π)(sin(α) − αcos(α))/α³   ← α ≠ 0
  — En α = 0, la formule a α³ au dénominateur :  [juge definite]  départ : (1/√(2π))(∫_{−1}^{1} 2(1 − x²) dx)
    ? Comment obtenir f̂(0) ? ✔ f̂(0) = (1/√(2π)) ∫ f(x) dx, calculée directement / · Remplacer α par 0 dans la formule
    = 4√2/(3√π)   ← f̂(0) = (1/√(2π))∫ f
  aides : f est paire : prends la forme en cos sur [0 ; ∞[ (FP2), puis intègre par parties. | f̂(α) = √(2/π) int(2(1-x^2)cos(α x), x, 0, 1) | int(4x sin(α x)/α, x, 0, 1)
  pièges : f_ft_norm, f_ft_alpha_zero

Écris la définition de la transformée de Fourier, avec ses hypothèses : le début est placé, touche les blocs qui manquent.
  [blocs define]
    1. telle que ∫ℝ |f(y)| dy < ∞ (f est absolument intégrable).
    2. Sa transformée de Fourier est f̂(α) = (1/√(2π)) ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ.
    ✗ Sa transformée de Fourier est f̂(α) = ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ. [f_ft_norm]
    ✗ Sa transformée de Fourier est f̂(α) = (1/(2π)) ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ. [f_ft_norm]
  pièges : f_ft_norm

Calcule la transformée de Fourier de f(x) = 3x si |x| ≤ 1, 0 sinon, puis f̂(0).
  [guided]  f(x) = H(1 − |x|)(3x)
    ? Quelle forme de f̂ utiliser ? ✔ f est impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dx / · f est paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dx / ✔ La définition (1/√(2π)) ∫ f(x) e^(−iαx) dx sur ℝ / · Lire une ligne de la table
    = f̂(α) = −i√(2/π)(∫_{0}^{1} 3x□ dx)   (trous : f̂(α) = −i√(2/π)(∫_{0}^{1} 3xsin(αx) dx))   ← FP3 : f impaire
  — L'intégrale, par parties (α ≠ 0) :  [juge equiv]  départ : ∫_{0}^{1} 3xsin(αx) dx
    = −3□/α + ∫_{0}^{1} 3cos(αx)/α dx   (trous : −3cos(α)/α + ∫_{0}^{1} 3cos(αx)/α dx)   ← Intégration par parties
    = 3(sin(α) − αcos(α))/□   (trous : 3(sin(α) − αcos(α))/α²)   ← Encore par parties
  — Donc :  [juge transform]  départ : f̂(α) = −i√(2/π)(∫_{0}^{1} 3xsin(αx) dx)
    = f̂(α) = −3i√(2/π)(sin(α) − αcos(α))/α²   ← α ≠ 0
  — En α = 0, la formule a α² au dénominateur :  [juge definite]  départ : (1/√(2π))(∫_{−1}^{1} 3x dx)
    ? Comment obtenir f̂(0) ? ✔ f̂(0) = (1/√(2π)) ∫ f(x) dx, calculée directement / · Remplacer α par 0 dans la formule
    = 0   ← f impaire : ∫ f = 0
  aides : f est impaire : prends la forme en sin (FP3), puis intègre par parties. | f̂(α) = -i√(2/π) int(3x sin(α x), x, 0, 1) | -3cos(α)/α + int(3cos(α x)/α, x, 0, 1)
  pièges : f_ft_norm, f_ft_alpha_zero

```

### Niveau 3

```
Calcule la transformée de Fourier de f(x) = (4 − x²) si |x| ≤ 2, 0 sinon, puis f̂(0).
  [tap, suivre l'erreur, menu menu]  f(x) = H(2 − |x|)(4 − x²)
    ? Quelle forme de f̂ utiliser ? ✔ f est paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dx / · f est impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dx / ✔ La définition (1/√(2π)) ∫ f(x) e^(−iαx) dx sur ℝ / · Lire une ligne de la table
    = f̂(α) = √(2/π)(∫_{0}^{2} (4 − x²)cos(αx) dx)   ← FP2 : f paire
  — L'intégrale, par parties (α ≠ 0) :  [juge equiv]  départ : ∫_{0}^{2} (4 − x²)cos(αx) dx
    = ∫_{0}^{2} 2xsin(αx)/α dx   ← Intégration par parties
    = 2(sin(2α) − 2αcos(2α))/α³   ← Encore par parties
  — Donc :  [juge transform]  départ : f̂(α) = √(2/π)(∫_{0}^{2} (4 − x²)cos(αx) dx)
    = f̂(α) = 2√(2/π)(sin(2α) − 2αcos(2α))/α³   ← α ≠ 0
  — En α = 0, la formule a α³ au dénominateur :  [juge definite]  départ : (1/√(2π))(∫_{−2}^{2} (4 − x²) dx)
    ? Comment obtenir f̂(0) ? ✔ f̂(0) = (1/√(2π)) ∫ f(x) dx, calculée directement / · Remplacer α par 0 dans la formule
    = 16√2/(3√π)   ← f̂(0) = (1/√(2π))∫ f
  aides : f est paire : prends la forme en cos sur [0 ; ∞[ (FP2), puis intègre par parties. | f̂(α) = √(2/π) int((4-x^2)cos(α x), x, 0, 2) | int(2x sin(α x)/α, x, 0, 2)
  pièges : f_ft_norm, f_ft_alpha_zero

Calcule la transformée de Fourier de f(x) = e^(−2|x|).
  [tap, suivre l'erreur, menu menu]  f(x) = e^(−2|x|)
    ? Quelle forme de f̂ utiliser ? ✔ f est paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dx / · f est impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dx / ✔ La définition (1/√(2π)) ∫ f(x) e^(−iαx) dx sur ℝ / ✔ Lire la ligne F7 de la table
    = f̂(α) = √(2/π)(∫_{0}^{∞} e^(−2x)cos(αx) dx)   ← FP2 : f paire
  — L'intégrale, par parties (α ≠ 0) :  [juge equiv]  départ : ∫_{0}^{∞} e^(−2x)cos(αx) dx
    = 1/2 − (α/2)(∫_{0}^{∞} e^(−2x)sin(αx) dx)   ← Intégration par parties
    = 2/(α² + 4)   ← Encore une fois par parties : I = 1/w − (α²/w²) I
  — Donc :  [juge transform]  départ : f̂(α) = √(2/π)(∫_{0}^{∞} e^(−2x)cos(αx) dx)
    = f̂(α) = 2√(2/π)/(α² + 4)   ← α ≠ 0
  aides : f est paire : prends la forme en cos sur [0 ; ∞[ (FP2), puis intègre par parties. | f̂(α) = √(2/π) int(e^(-2x)cos(α x), x, 0, ∞) | 1/2 - (α/2)int(e^(-2x)sin(α x), x, 0, ∞)
  pièges : f_ft_norm

Calcule la transformée de Fourier de f(x) = 3 − |x| si |x| ≤ 3, 0 sinon, puis f̂(0).
  [tap, suivre l'erreur, menu menu]  f(x) = H(3 − |x|)(3 − |x|)
    ? Quelle forme de f̂ utiliser ? ✔ f est paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dx / · f est impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dx / ✔ La définition (1/√(2π)) ∫ f(x) e^(−iαx) dx sur ℝ / · Lire une ligne de la table
    = f̂(α) = √(2/π)(∫_{0}^{3} (3 − x)cos(αx) dx)   ← FP2 : f paire
  — L'intégrale, par parties (α ≠ 0) :  [juge equiv]  départ : ∫_{0}^{3} (3 − x)cos(αx) dx
    = ∫_{0}^{3} sin(αx)/α dx   ← Intégration par parties
    = (1 − cos(3α))/α²   ← Encore par parties
  — Donc :  [juge transform]  départ : f̂(α) = √(2/π)(∫_{0}^{3} (3 − x)cos(αx) dx)
    = f̂(α) = √(2/π)(1 − cos(3α))/α²   ← α ≠ 0
  — En α = 0, la formule a α² au dénominateur :  [juge definite]  départ : (1/√(2π))(∫_{−3}^{3} (3 − |x|) dx)
    ? Comment obtenir f̂(0) ? ✔ f̂(0) = (1/√(2π)) ∫ f(x) dx, calculée directement / · Remplacer α par 0 dans la formule
    = 9√2/(2√π)   ← f̂(0) = (1/√(2π))∫ f
  aides : f est paire : prends la forme en cos sur [0 ; ∞[ (FP2), puis intègre par parties. | f̂(α) = √(2/π) int((3-x)cos(α x), x, 0, 3) | int(sin(α x)/α, x, 0, 3)
  pièges : f_ft_norm, f_ft_alpha_zero

```

### Niveau 4

```
Calcule la transformée de Fourier de f(x) = (1 − x²) si |x| ≤ 1, 0 sinon, puis f̂(0).
  [free, suivre l'erreur]  f(x) = H(1 − |x|)(1 − x²)
    ? Quelle forme de f̂ utiliser ? ✔ f est paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dx / · f est impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dx / ✔ La définition (1/√(2π)) ∫ f(x) e^(−iαx) dx sur ℝ / · Lire une ligne de la table
    = f̂(α) = √(2/π)(∫_{0}^{1} (1 − x²)cos(αx) dx)   ← FP2 : f paire
  — L'intégrale, par parties (α ≠ 0) :  [juge equiv]  départ : ∫_{0}^{1} (1 − x²)cos(αx) dx
    = ∫_{0}^{1} 2xsin(αx)/α dx   ← Intégration par parties
    = 2(sin(α) − αcos(α))/α³   ← Encore par parties
  — Donc :  [juge transform]  départ : f̂(α) = √(2/π)(∫_{0}^{1} (1 − x²)cos(αx) dx)
    = f̂(α) = 2√(2/π)(sin(α) − αcos(α))/α³   ← α ≠ 0
  — En α = 0, la formule a α³ au dénominateur :  [juge definite]  départ : (1/√(2π))(∫_{−1}^{1} (1 − x²) dx)
    ? Comment obtenir f̂(0) ? ✔ f̂(0) = (1/√(2π)) ∫ f(x) dx, calculée directement / · Remplacer α par 0 dans la formule
    = 2√2/(3√π)   ← f̂(0) = (1/√(2π))∫ f
  aides : f est paire : prends la forme en cos sur [0 ; ∞[ (FP2), puis intègre par parties. | f̂(α) = √(2/π) int((1-x^2)cos(α x), x, 0, 1) | int(2x sin(α x)/α, x, 0, 1)
  pièges : f_ft_norm, f_ft_alpha_zero

Calcule la transformée de Fourier de f(x) = (1 − x²) si |x| ≤ 1, 0 sinon, puis f̂(0).
  [free, suivre l'erreur]  f(x) = H(1 − |x|)(1 − x²)
    ? Quelle forme de f̂ utiliser ? ✔ f est paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dx / · f est impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dx / ✔ La définition (1/√(2π)) ∫ f(x) e^(−iαx) dx sur ℝ / · Lire une ligne de la table
    = f̂(α) = √(2/π)(∫_{0}^{1} (1 − x²)cos(αx) dx)   ← FP2 : f paire
  — L'intégrale, par parties (α ≠ 0) :  [juge equiv]  départ : ∫_{0}^{1} (1 − x²)cos(αx) dx
    = ∫_{0}^{1} 2xsin(αx)/α dx   ← Intégration par parties
    = 2(sin(α) − αcos(α))/α³   ← Encore par parties
  — Donc :  [juge transform]  départ : f̂(α) = √(2/π)(∫_{0}^{1} (1 − x²)cos(αx) dx)
    = f̂(α) = 2√(2/π)(sin(α) − αcos(α))/α³   ← α ≠ 0
  — En α = 0, la formule a α³ au dénominateur :  [juge definite]  départ : (1/√(2π))(∫_{−1}^{1} (1 − x²) dx)
    ? Comment obtenir f̂(0) ? ✔ f̂(0) = (1/√(2π)) ∫ f(x) dx, calculée directement / · Remplacer α par 0 dans la formule
    = 2√2/(3√π)   ← f̂(0) = (1/√(2π))∫ f
  aides : f est paire : prends la forme en cos sur [0 ; ∞[ (FP2), puis intègre par parties. | f̂(α) = √(2/π) int((1-x^2)cos(α x), x, 0, 1) | int(2x sin(α x)/α, x, 0, 1)
  pièges : f_ft_norm, f_ft_alpha_zero

Calcule la transformée de Fourier de f(x) = (1 − x²) si |x| ≤ 1, 0 sinon, puis f̂(0).
  [free, suivre l'erreur]  f(x) = H(1 − |x|)(1 − x²)
    ? Quelle forme de f̂ utiliser ? ✔ f est paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dx / · f est impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dx / ✔ La définition (1/√(2π)) ∫ f(x) e^(−iαx) dx sur ℝ / · Lire une ligne de la table
    = f̂(α) = √(2/π)(∫_{0}^{1} (1 − x²)cos(αx) dx)   ← FP2 : f paire
  — L'intégrale, par parties (α ≠ 0) :  [juge equiv]  départ : ∫_{0}^{1} (1 − x²)cos(αx) dx
    = ∫_{0}^{1} 2xsin(αx)/α dx   ← Intégration par parties
    = 2(sin(α) − αcos(α))/α³   ← Encore par parties
  — Donc :  [juge transform]  départ : f̂(α) = √(2/π)(∫_{0}^{1} (1 − x²)cos(αx) dx)
    = f̂(α) = 2√(2/π)(sin(α) − αcos(α))/α³   ← α ≠ 0
  — En α = 0, la formule a α³ au dénominateur :  [juge definite]  départ : (1/√(2π))(∫_{−1}^{1} (1 − x²) dx)
    ? Comment obtenir f̂(0) ? ✔ f̂(0) = (1/√(2π)) ∫ f(x) dx, calculée directement / · Remplacer α par 0 dans la formule
    = 2√2/(3√π)   ← f̂(0) = (1/√(2π))∫ f
  aides : f est paire : prends la forme en cos sur [0 ; ∞[ (FP2), puis intègre par parties. | f̂(α) = √(2/π) int((1-x^2)cos(α x), x, 0, 1) | int(2x sin(α x)/α, x, 0, 1)
  pièges : f_ft_norm, f_ft_alpha_zero

```

### Niveau 5

```
(i) Donne la définition de la transformée de Fourier, avec ses hypothèses. (ii) Calcule f̂ pour f(x) = e^(−3|x|).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [problème, 5 points]
  partie 1 (Définition de f̂ : 2)
  Écris la définition de la transformée de Fourier, avec ses hypothèses : touche les blocs dans l'ordre.
    [blocs define, sans aide]
      1. Soit f : ℝ → ℝ continue par morceaux
      2. telle que ∫ℝ |f(y)| dy < ∞ (f est absolument intégrable).
      3. Sa transformée de Fourier est f̂(α) = (1/√(2π)) ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ.
      ✗ Sa transformée de Fourier est f̂(α) = ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ. [f_ft_norm]
      ✗ telle que ∫ℝ f(y) dy converge. [a1_abs_conv_confused]
      ✗ Sa transformée de Fourier est f̂(α) = (1/(2π)) ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ. [f_ft_norm]
  partie 2 (Calcul de f̂ : 1 ; L'intégrale, par parties (α ≠ 0) : 1,5 ; Donc : 0,5)
  Calcule la transformée de Fourier de f(x) = e^(−3|x|).
    [free, sans aide, suivre l'erreur]  f(x) = e^(−3|x|)
      ? Quelle forme de f̂ utiliser ? ✔ f est paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dx / · f est impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dx / ✔ La définition (1/√(2π)) ∫ f(x) e^(−iαx) dx sur ℝ / ✔ Lire la ligne F7 de la table
      = f̂(α) = √(2/π)(∫_{0}^{∞} e^(−3x)cos(αx) dx)   ← FP2 : f paire
    — L'intégrale, par parties (α ≠ 0) :  [juge equiv]  départ : ∫_{0}^{∞} e^(−3x)cos(αx) dx
      = 1/3 − (α/3)(∫_{0}^{∞} e^(−3x)sin(αx) dx)   ← Intégration par parties
      = 3/(α² + 9)   ← Encore une fois par parties : I = 1/w − (α²/w²) I
    — Donc :  [juge transform]  départ : f̂(α) = √(2/π)(∫_{0}^{∞} e^(−3x)cos(αx) dx)
      = f̂(α) = 3√(2/π)/(α² + 9)   ← α ≠ 0
  pièges : f_ft_norm, a1_abs_conv_confused

(i) Donne la définition de la transformée de Fourier, avec ses hypothèses. (ii) Calcule f̂ pour f(x) = 2 − |x| si |x| ≤ 2, 0 sinon.Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [problème, 6 points]
  partie 1 (Définition de f̂ : 2)
  Écris la définition de la transformée de Fourier, avec ses hypothèses : touche les blocs dans l'ordre.
    [blocs define, sans aide]
      1. Soit f : ℝ → ℝ continue par morceaux
      2. telle que ∫ℝ |f(y)| dy < ∞ (f est absolument intégrable).
      3. Sa transformée de Fourier est f̂(α) = (1/√(2π)) ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ.
      ✗ telle que ∫ℝ f(y) dy converge. [a1_abs_conv_confused]
      ✗ Sa transformée de Fourier est f̂(α) = (1/(2π)) ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ. [f_ft_norm]
      ✗ Sa transformée de Fourier est f̂(α) = ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ. [f_ft_norm]
  partie 2 (Calcul de f̂ : 1 ; L'intégrale, par parties (α ≠ 0) : 1,5 ; Donc : 0,5 ; En α = 0, la formule a α² au dénominateur : 1)
  Calcule la transformée de Fourier de f(x) = 2 − |x| si |x| ≤ 2, 0 sinon, puis f̂(0).
    [free, sans aide, suivre l'erreur]  f(x) = H(2 − |x|)(2 − |x|)
      ? Quelle forme de f̂ utiliser ? ✔ f est paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dx / · f est impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dx / ✔ La définition (1/√(2π)) ∫ f(x) e^(−iαx) dx sur ℝ / · Lire une ligne de la table
      = f̂(α) = √(2/π)(∫_{0}^{2} (2 − x)cos(αx) dx)   ← FP2 : f paire
    — L'intégrale, par parties (α ≠ 0) :  [juge equiv]  départ : ∫_{0}^{2} (2 − x)cos(αx) dx
      = ∫_{0}^{2} sin(αx)/α dx   ← Intégration par parties
      = (1 − cos(2α))/α²   ← Encore par parties
    — Donc :  [juge transform]  départ : f̂(α) = √(2/π)(∫_{0}^{2} (2 − x)cos(αx) dx)
      = f̂(α) = √(2/π)(1 − cos(2α))/α²   ← α ≠ 0
    — En α = 0, la formule a α² au dénominateur :  [juge definite]  départ : (1/√(2π))(∫_{−2}^{2} (2 − |x|) dx)
      ? Comment obtenir f̂(0) ? ✔ f̂(0) = (1/√(2π)) ∫ f(x) dx, calculée directement / · Remplacer α par 0 dans la formule
      = 2√2/√π   ← f̂(0) = (1/√(2π))∫ f
  pièges : a1_abs_conv_confused, f_ft_norm, f_ft_alpha_zero

(i) Donne la définition de la transformée de Fourier, avec ses hypothèses. (ii) Calcule f̂ pour f(x) = 3(1 − x²) si |x| ≤ 1, 0 sinon.Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [problème, 6 points]
  partie 1 (Définition de f̂ : 2)
  Écris la définition de la transformée de Fourier, avec ses hypothèses : touche les blocs dans l'ordre.
    [blocs define, sans aide]
      1. Soit f : ℝ → ℝ continue par morceaux
      2. telle que ∫ℝ |f(y)| dy < ∞ (f est absolument intégrable).
      3. Sa transformée de Fourier est f̂(α) = (1/√(2π)) ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ.
      ✗ Sa transformée de Fourier est f̂(α) = ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ. [f_ft_norm]
      ✗ Sa transformée de Fourier est f̂(α) = (1/(2π)) ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ. [f_ft_norm]
      ✗ telle que ∫ℝ f(y) dy converge. [a1_abs_conv_confused]
  partie 2 (Calcul de f̂ : 1 ; L'intégrale, par parties (α ≠ 0) : 1,5 ; Donc : 0,5 ; En α = 0, la formule a α³ au dénominateur : 1)
  Calcule la transformée de Fourier de f(x) = 3(1 − x²) si |x| ≤ 1, 0 sinon, puis f̂(0).
    [free, sans aide, suivre l'erreur]  f(x) = H(1 − |x|)(3(1 − x²))
      ? Quelle forme de f̂ utiliser ? ✔ f est paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dx / · f est impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dx / ✔ La définition (1/√(2π)) ∫ f(x) e^(−iαx) dx sur ℝ / · Lire une ligne de la table
      = f̂(α) = √(2/π)(∫_{0}^{1} 3(1 − x²)cos(αx) dx)   ← FP2 : f paire
    — L'intégrale, par parties (α ≠ 0) :  [juge equiv]  départ : ∫_{0}^{1} 3(1 − x²)cos(αx) dx
      = ∫_{0}^{1} 6xsin(αx)/α dx   ← Intégration par parties
      = 6(sin(α) − αcos(α))/α³   ← Encore par parties
    — Donc :  [juge transform]  départ : f̂(α) = √(2/π)(∫_{0}^{1} 3(1 − x²)cos(αx) dx)
      = f̂(α) = 6√(2/π)(sin(α) − αcos(α))/α³   ← α ≠ 0
    — En α = 0, la formule a α³ au dénominateur :  [juge definite]  départ : (1/√(2π))(∫_{−1}^{1} 3(1 − x²) dx)
      ? Comment obtenir f̂(0) ? ✔ f̂(0) = (1/√(2π)) ∫ f(x) dx, calculée directement / · Remplacer α par 0 dans la formule
      = 2√2/√π   ← f̂(0) = (1/√(2π))∫ f
  pièges : f_ft_norm, a1_abs_conv_confused, f_ft_alpha_zero

```

### Variantes d'examen

```
Soit f(x) = (4 − x²) si |x| ≤ 2, 0 sinon. Cochez les égalités vraies. (plusieurs réponses possibles)
  · f̂(α) = (2sqrt(2/π)(sin(2α)-2α cos(2α))/α^3)/√(2π) [f_ft_norm]   ✔ f̂(0) = 16√2/(3√π)   · f̂(α) = 2√(2/π)(sin(2α)+2α cos(2α))/α^3 [f_ipp_sign]   · f̂(α) = √(2π)(2sqrt(2/π)(sin(2α)-2α cos(2α))/α^3) [f_ft_norm]   ✔ f̂(α) = 2√(2/π)(sin(2α)-2α cos(2α))/α^3
  [examen mcq]
  pièges : f_ft_norm, f_ipp_sign

(i) Donne la définition de la transformée de Fourier, avec ses hypothèses. (ii) Calcule f̂ pour f(x) = 2(3 − |x|) si |x| ≤ 3, 0 sinon.Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [problème, examen open, 6 points]
  partie 1 (Définition de f̂ : 2)
  Écris la définition de la transformée de Fourier, avec ses hypothèses : touche les blocs dans l'ordre.
    [blocs define, sans aide]
      1. Soit f : ℝ → ℝ continue par morceaux
      2. telle que ∫ℝ |f(y)| dy < ∞ (f est absolument intégrable).
      3. Sa transformée de Fourier est f̂(α) = (1/√(2π)) ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ.
      ✗ Sa transformée de Fourier est f̂(α) = (1/(2π)) ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ. [f_ft_norm]
      ✗ telle que ∫ℝ f(y) dy converge. [a1_abs_conv_confused]
      ✗ Sa transformée de Fourier est f̂(α) = ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ. [f_ft_norm]
  partie 2 (Calcul de f̂ : 1 ; L'intégrale, par parties (α ≠ 0) : 1,5 ; Donc : 0,5 ; En α = 0, la formule a α² au dénominateur : 1)
  Calcule la transformée de Fourier de f(x) = 2(3 − |x|) si |x| ≤ 3, 0 sinon, puis f̂(0).
    [free, sans aide, suivre l'erreur]  f(x) = H(3 − |x|)(2)(3 − |x|)
      ? Quelle forme de f̂ utiliser ? ✔ f est paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dx / · f est impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dx / ✔ La définition (1/√(2π)) ∫ f(x) e^(−iαx) dx sur ℝ / · Lire une ligne de la table
      = f̂(α) = √(2/π)(∫_{0}^{3} 2(3 − x)cos(αx) dx)   ← FP2 : f paire
    — L'intégrale, par parties (α ≠ 0) :  [juge equiv]  départ : ∫_{0}^{3} 2(3 − x)cos(αx) dx
      = ∫_{0}^{3} 2sin(αx)/α dx   ← Intégration par parties
      = 2(1 − cos(3α))/α²   ← Encore par parties
    — Donc :  [juge transform]  départ : f̂(α) = √(2/π)(∫_{0}^{3} 2(3 − x)cos(αx) dx)
      = f̂(α) = 2√(2/π)(1 − cos(3α))/α²   ← α ≠ 0
    — En α = 0, la formule a α² au dénominateur :  [juge definite]  départ : (1/√(2π))(∫_{−3}^{3} 2(3 − |x|) dx)
      ? Comment obtenir f̂(0) ? ✔ f̂(0) = (1/√(2π)) ∫ f(x) dx, calculée directement / · Remplacer α par 0 dans la formule
      = 9√2/√π   ← f̂(0) = (1/√(2π))∫ f
  pièges : f_ft_norm, a1_abs_conv_confused, f_ft_alpha_zero

```

## Transformée de Fourier par la table et les propriétés (`f-ft-table`, BA4)

_Ramener f à une ligne de la table avec les propriétés : translation, dérivée, carré complété ; et l'inverse, sur tout ℝ._

### Niveau 1

```
Calcule la transformée de Fourier de f(x) = e^(-3(x-1)) si x > 1, 0 sinon.Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  f(x) = H(x − 1)e^(−3(x − 1))
    (Ligne F3 de la table.)
    = f̂(α) = e^(-iα) ℱ(H(x)e^(-3x))   ← Translation
    = f̂(α) = e^(−iα)/(√(2π)(□))   (trous : f̂(α) = e^(−iα)/(√(2π)(3 + iα)))   ← Ligne F3 avec w = 3
  aides : Translation, puis la ligne F3 (fonction nulle pour y < 0). | ℱ(H(x)e^(-3x)) = 1/(√(2π)(3+iα)) | f̂(α) = e^(-iα)/(√(2π)(3+iα))
  pièges : f_ft_norm, f_table_line, f_ft_shift_sign

Calcule la transformée de Fourier de f(x) = e^(-3x^2+6x+4).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  −3x² + 6x + 4
    = −3(x − 1)² + □   (trous : −3(x − 1)² + 7)   ← Compléter le carré
  — Donc :  [juge transform]  départ : f(x) = e^(−3x² + 6x + 4)
    (Ligne F8 de la table.)
    = f(x) = e⁷e^(−3□²)   (trous : f(x) = e⁷e^(−3(x − 1)²))   ← f(x) = e^7·g(x − 1), g(x) = e^(−3x²)
    = f̂(α) = e^7 e^(-iα) ℱ(e^(-3x^2))   ← Translation de 1 : facteur e^(−iα)
    = f̂(α) = e⁷e^(−iα)e^(−α²/□)/□   (trous : f̂(α) = e⁷e^(−iα)e^(−α²/12)/√6)   ← Ligne F8 avec w² = 3
  aides : Complète le carré dans l'exposant, puis translation et ligne F8. | ℱ(e^(-3x^2))(α) = e^(-α^2/(4·3))/√(2·3) | f̂(α) = e^7 e^(-iα) e^(-α^2/12)/√6

Calcule la transformée de Fourier de f(x) = e^(-3(x+1)) si x > -1, 0 sinon.Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  f(x) = H(x + 1)e^(−3(x + 1))
    (Ligne F3 de la table.)
    = f̂(α) = e^(iα) ℱ(H(x)e^(-3x))   ← Translation
    = f̂(α) = e^(iα)/(√(2π)(□))   (trous : f̂(α) = e^(iα)/(√(2π)(3 + iα)))   ← Ligne F3 avec w = 3
  aides : Translation, puis la ligne F3 (fonction nulle pour y < 0). | ℱ(H(x)e^(-3x)) = 1/(√(2π)(3+iα)) | f̂(α) = e^(iα)/(√(2π)(3+iα))
  pièges : f_ft_norm, f_table_line, f_ft_shift_sign

```

### Niveau 2

```
Calcule la transformée de Fourier de f(x) = e^(-3x^2-6x-2).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  −3x² − 6x − 2
    = −3(x + □)² + 1   (trous : −3(x + 1)² + 1)   ← Compléter le carré
  — Donc :  [juge transform]  départ : f(x) = e^(−3x² − 6x − 2)
    ? Quelle ligne de la table ? ✔ Ligne F8 / · Ligne F9 / · Ligne F7
    = f(x) = ee^(−3□²)   (trous : f(x) = ee^(−3(x + 1)²))   ← f(x) = e·g(x − -1), g(x) = e^(−3x²)
    = f̂(α) = e e^(iα) ℱ(e^(-3x^2))   ← Translation de -1 : facteur e^(iα)
    = f̂(α) = e□e^(−α²/12)/√6   (trous : f̂(α) = ee^(iα)e^(−α²/12)/√6)   ← Ligne F8 avec w² = 3
  aides : Complète le carré dans l'exposant, puis translation et ligne F8. | ℱ(e^(-3x^2))(α) = e^(-α^2/(4·3))/√(2·3) | f̂(α) = e e^(iα) e^(-α^2/12)/√6
  pièges : f_table_line

Calcule la transformée de Fourier de f(x) = (x-1) e^(-(x-1)^2).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  f(x) = (x − 1)e^(−(x − 1)²)
    ? Quelle ligne de la table ? ✔ Ligne F9 / · Ligne F8 / · Ligne F10
    = f̂(α) = e^(-iα) ℱ(x e^(-x^2))   ← Translation
    = f̂(α) = □(−iαe^(−α²/4)/(2√2))   (trous : f̂(α) = e^(−iα)(−iαe^(−α²/4)/(2√2)))   ← Ligne F9 avec w² = 1
  aides : Translation, puis la ligne F9 : y e^(−w²y²). | ℱ(x e^(-x^2)) = -iα e^(-α^2/4)/(2√2) | f̂(α) = e^(-iα) (-iα e^(-α^2/4)/(2√2))
  pièges : f_ft_norm, f_ft_shift_sign, f_table_line

Calcule la transformée de Fourier de f(x) = e^(-3abs(x-1)).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  f(x) = e^(−3|x − 1|)
    ? Quelle ligne de la table ? ✔ Ligne F7 / · Ligne F3 / · Ligne F6
    = f̂(α) = e^(-iα) ℱ(e^(-3abs(x)))   ← f(x) = g(x − 1) : translation
    = f̂(α) = 3□√(2/π)/(α² + 9)   (trous : f̂(α) = 3e^(−iα)√(2/π)/(α² + 9))   ← Ligne F7 : e^(−3|y|) = 3·e^(−|3y|)/3
  aides : Translation, puis la ligne F7 (attention au facteur 1/|w|). | ℱ(e^(-3abs(x)))(α) = 3√(2/π)/(α^2+9) | f̂(α) = 3e^(-iα) √(2/π)/(α^2+9)
  pièges : f_ft_norm, f_table_line, f_ft_shift_sign

```

### Niveau 3

```
Calcule la transformée de Fourier de f(x) = e^(-x^2+4x+3).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [tap, suivre l'erreur, menu menu]  −x² + 4x + 3
    = −(x − 2)² + 7   ← Compléter le carré
  — Donc :  [juge transform]  départ : f(x) = e^(−x² + 4x + 3)
    ? Quelle ligne de la table ? ✔ Ligne F8 / · Ligne F9 / · Ligne F7
    = f(x) = e⁷e^(−(x − 2)²)   ← f(x) = e^7·g(x − 2), g(x) = e^(−x²)
    = f̂(α) = e^7 e^(-2iα) ℱ(e^(-x^2))   ← Translation de 2 : facteur e^(−2iα)
    = f̂(α) = e⁷e^(−2iα)e^(−α²/4)/√2   ← Ligne F8 avec w² = 1
  aides : Complète le carré dans l'exposant, puis translation et ligne F8. | ℱ(e^(-x^2))(α) = e^(-α^2/(4·1))/√(2·1) | f̂(α) = e^7 e^(-2iα) e^(-α^2/4)/√2
  pièges : f_table_line

Calcule la transformée de Fourier de f(x) = (x+1) e^(-2(x+1)^2).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [tap, suivre l'erreur, menu menu]  f(x) = (x + 1)e^(−2(x + 1)²)
    ? Quelle ligne de la table ? ✔ Ligne F9 / · Ligne F8 / · Ligne F10
    = f̂(α) = e^(iα) ℱ(x e^(-2x^2))   ← Translation
    = f̂(α) = e^(iα)(−iαe^(−α²/8)/8)   ← Ligne F9 avec w² = 2
  aides : Translation, puis la ligne F9 : y e^(−w²y²). | ℱ(x e^(-2x^2)) = -iα e^(-α^2/8)/8 | f̂(α) = e^(iα) (-iα e^(-α^2/8)/8)
  pièges : f_ft_norm, f_ft_shift_sign, f_table_line

Calcule la transformée de Fourier de f(x) = -6x e^(-3x^2) (remarque : f = g′ avec g(x) = e^(-3x^2)).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [tap, suivre l'erreur, menu menu]  f(x) = −6xe^(−3x²)
    ? Quelle ligne de la table ? ✔ Ligne F8 / · Ligne F9 / · Ligne F7
    = f̂(α) = iα ℱ(e^(-3x^2))   ← FP4 : ℱ(g′) = iα ĝ
    = f̂(α) = iαe^(−α²/12)/√6   ← Ligne F8 avec w² = 3
  aides : f = g′ : ℱ(g′) = iα ĝ (FP4), puis la ligne F8. | ℱ(e^(-3x^2)) = e^(-α^2/12)/√6 | f̂(α) = iα e^(-α^2/12)/√6
  pièges : f_ft_norm, f_ft_deriv_sign, f_table_line

```

### Niveau 4

```
Trouve f telle que f̂(α) = 1/(3+iα) (f définie sur tout ℝ).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [free, suivre l'erreur]  f̂(α) = 1/(3 + iα)
    ? Quelle ligne de la table ? ✔ Ligne F3 / · Ligne F7 / · Ligne F4
    = f̂(α) = √(2π)·1/(√(2π)(3 + iα))   ← Faire apparaître la ligne F3
    = f(x) = √(2π)H(x)e^(−3x)   ← F3 avec w = 3 : nulle pour x < 0
  aides : La ligne F3 : e^(−wy) si y > 0, 0 sinon. Écris les deux cas (H(x) = 1 si x > 0, 0 sinon). | 1/(3+iα) = √(2π)·1/(√(2π)(3+iα)) | f(x) = √(2π) H(x)e^(-3x)
  pièges : f_table_half_line, f_table_line

Calcule la transformée de Fourier de f(x) = e^(-2(x-2)) si x > 2, 0 sinon.Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [free, suivre l'erreur]  f(x) = H(x − 2)e^(−2(x − 2))
    ? Quelle ligne de la table ? ✔ Ligne F3 / · Ligne F7 / · Ligne F4
    = f̂(α) = e^(-2iα) ℱ(H(x)e^(-2x))   ← Translation
    = f̂(α) = e^(−2iα)/(√(2π)(2 + iα))   ← Ligne F3 avec w = 2
  aides : Translation, puis la ligne F3 (fonction nulle pour y < 0). | ℱ(H(x)e^(-2x)) = 1/(√(2π)(2+iα)) | f̂(α) = e^(-2iα)/(√(2π)(2+iα))
  pièges : f_ft_norm, f_table_line, f_ft_shift_sign

Calcule la transformée de Fourier de f(x) = (x+1) e^(-(x+1)^2).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [free, suivre l'erreur]  f(x) = (x + 1)e^(−(x + 1)²)
    ? Quelle ligne de la table ? ✔ Ligne F9 / · Ligne F8 / · Ligne F10
    = f̂(α) = e^(iα) ℱ(x e^(-x^2))   ← Translation
    = f̂(α) = e^(iα)(−iαe^(−α²/4)/(2√2))   ← Ligne F9 avec w² = 1
  aides : Translation, puis la ligne F9 : y e^(−w²y²). | ℱ(x e^(-x^2)) = -iα e^(-α^2/4)/(2√2) | f̂(α) = e^(iα) (-iα e^(-α^2/4)/(2√2))
  pièges : f_ft_norm, f_ft_shift_sign, f_table_line

```

### Niveau 5

```
Calcule la transformée de Fourier de chaque fonction, avec la table et les propriétés.Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [problème, 7 points]
  partie 1 (Fonction 1 : 1 ; Donc : 3)
  Calcule la transformée de Fourier de f(x) = e^(-2x^2-8x+2).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
    [free, sans aide, suivre l'erreur]  −2x² − 8x + 2
      = −2(x + 2)² + 10   ← Compléter le carré
    — Donc :  [juge transform]  départ : f(x) = e^(−2x² − 8x + 2)
      ? Quelle ligne de la table ? ✔ Ligne F8 / · Ligne F9 / · Ligne F7
      = f(x) = e¹⁰e^(−2(x + 2)²)   ← f(x) = e^10·g(x − -2), g(x) = e^(−2x²)
      = f̂(α) = e^10 e^(2iα) ℱ(e^(-2x^2))   ← Translation de -2 : facteur e^(−-2iα)
      = f̂(α) = e¹⁰e^(2iα)e^(−α²/8)/2   ← Ligne F8 avec w² = 2
  partie 2 (Fonction 2 : 3)
  Calcule la transformée de Fourier de f(x) = e^(-abs(x-2)).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
    [free, sans aide, suivre l'erreur]  f(x) = e^(−|x − 2|)
      ? Quelle ligne de la table ? ✔ Ligne F7 / · Ligne F3 / · Ligne F6
      = f̂(α) = e^(-2iα) ℱ(e^(-abs(x)))   ← f(x) = g(x − 2) : translation
      = f̂(α) = e^(−2iα)√(2/π)/(α² + 1)   ← Ligne F7 : e^(−|y|) = ·e^(−|y|)/1
  pièges : f_table_line, f_ft_norm, f_ft_shift_sign

Calcule la transformée de Fourier de chaque fonction, avec la table et les propriétés.Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [problème, 7 points]
  partie 1 (Fonction 1 : 1 ; Donc : 3)
  Calcule la transformée de Fourier de f(x) = e^(-3x^2-6x+5).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
    [free, sans aide, suivre l'erreur]  −3x² − 6x + 5
      = −3(x + 1)² + 8   ← Compléter le carré
    — Donc :  [juge transform]  départ : f(x) = e^(−3x² − 6x + 5)
      ? Quelle ligne de la table ? ✔ Ligne F8 / · Ligne F9 / · Ligne F7
      = f(x) = e⁸e^(−3(x + 1)²)   ← f(x) = e^8·g(x − -1), g(x) = e^(−3x²)
      = f̂(α) = e^8 e^(iα) ℱ(e^(-3x^2))   ← Translation de -1 : facteur e^(iα)
      = f̂(α) = e⁸e^(iα)e^(−α²/12)/√6   ← Ligne F8 avec w² = 3
  partie 2 (Fonction 2 : 3)
  Calcule la transformée de Fourier de f(x) = e^(-2(x-2)) si x > 2, 0 sinon.Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
    [free, sans aide, suivre l'erreur]  f(x) = H(x − 2)e^(−2(x − 2))
      ? Quelle ligne de la table ? ✔ Ligne F3 / · Ligne F7 / · Ligne F4
      = f̂(α) = e^(-2iα) ℱ(H(x)e^(-2x))   ← Translation
      = f̂(α) = e^(−2iα)/(√(2π)(2 + iα))   ← Ligne F3 avec w = 2
  pièges : f_table_line, f_ft_norm, f_ft_shift_sign

Calcule la transformée de Fourier de chaque fonction, avec la table et les propriétés.Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [problème, 7 points]
  partie 1 (Fonction 1 : 1 ; Donc : 3)
  Calcule la transformée de Fourier de f(x) = e^(-x^2-4x+2).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
    [free, sans aide, suivre l'erreur]  −x² − 4x + 2
      = −(x + 2)² + 6   ← Compléter le carré
    — Donc :  [juge transform]  départ : f(x) = e^(−x² − 4x + 2)
      ? Quelle ligne de la table ? ✔ Ligne F8 / · Ligne F9 / · Ligne F7
      = f(x) = e⁶e^(−(x + 2)²)   ← f(x) = e^6·g(x − -2), g(x) = e^(−x²)
      = f̂(α) = e^6 e^(2iα) ℱ(e^(-x^2))   ← Translation de -2 : facteur e^(−-2iα)
      = f̂(α) = e⁶e^(2iα)e^(−α²/4)/√2   ← Ligne F8 avec w² = 1
  partie 2 (Fonction 2 : 3)
  Calcule la transformée de Fourier de f(x) = e^(-3abs(x-2)).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
    [free, sans aide, suivre l'erreur]  f(x) = e^(−3|x − 2|)
      ? Quelle ligne de la table ? ✔ Ligne F7 / · Ligne F3 / · Ligne F6
      = f̂(α) = e^(-2iα) ℱ(e^(-3abs(x)))   ← f(x) = g(x − 2) : translation
      = f̂(α) = 3e^(−2iα)√(2/π)/(α² + 9)   ← Ligne F7 : e^(−3|y|) = 3·e^(−|3y|)/3
  pièges : f_table_line, f_ft_norm, f_ft_shift_sign

```

### Variantes d'examen

```
Soit g(x) = e^(-3abs(x)) et h(x) = e^(-2abs(x)). Cochez les égalités vraies.Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x) (plusieurs réponses possibles)
  · ĝ(α) = √(2/π)/(α^2+9) [f_table_line]   · ℱ(g∗h)(0) = 1/(6√(2π)) [f_table_line]   ✔ ℱ(g∗h)(0) = 4/(6√(2π))   · ĝ(α) = 3/(α^2+9) [f_ft_norm]   ✔ ℱ(g∗h)(0) = 2√2/(6√π)
  [examen mcq]
  pièges : f_table_line, f_ft_norm

Calcule la transformée de Fourier de chaque fonction, avec la table et les propriétés.Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [problème, examen open, 7 points]
  partie 1 (Fonction 1 : 1 ; Donc : 3)
  Calcule la transformée de Fourier de f(x) = e^(-3x^2+12x+1).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
    [free, sans aide, suivre l'erreur]  −3x² + 12x + 1
      = −3(x − 2)² + 13   ← Compléter le carré
    — Donc :  [juge transform]  départ : f(x) = e^(−3x² + 12x + 1)
      ? Quelle ligne de la table ? ✔ Ligne F8 / · Ligne F9 / · Ligne F7
      = f(x) = e¹³e^(−3(x − 2)²)   ← f(x) = e^13·g(x − 2), g(x) = e^(−3x²)
      = f̂(α) = e^13 e^(-2iα) ℱ(e^(-3x^2))   ← Translation de 2 : facteur e^(−2iα)
      = f̂(α) = e¹³e^(−2iα)e^(−α²/12)/√6   ← Ligne F8 avec w² = 3
  partie 2 (Fonction 2 : 3)
  Calcule la transformée de Fourier de f(x) = -6x e^(-3x^2) (remarque : f = g′ avec g(x) = e^(-3x^2)).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
    [free, sans aide, suivre l'erreur]  f(x) = −6xe^(−3x²)
      ? Quelle ligne de la table ? ✔ Ligne F8 / · Ligne F9 / · Ligne F7
      = f̂(α) = iα ℱ(e^(-3x^2))   ← FP4 : ℱ(g′) = iα ĝ
      = f̂(α) = iαe^(−α²/12)/√6   ← Ligne F8 avec w² = 3
  pièges : f_table_line, f_ft_norm, f_ft_deriv_sign

```

## Équations résolues par la transformée de Fourier (`f-ft-eq`, BA4)

_Transformer l'équation (𝓕(f ∗ u) = √(2π) f̂ û), isoler û, simplifier la fraction, revenir en x sur tout ℝ._

### Niveau 1

```
Trouve u : ℝ → ℝ telle que 4u + 6(f ∗ u) = f, avec f(x) = e^(-|x|) (on suppose u intégrable).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  f(x) = e^(−|x|)
    = f̂(α) = √(2/π)/(α² + □)   (trous : f̂(α) = √(2/π)/(α² + 1))   ← Ligne F7 : e^(−w|y|) = w·e^(−|wy|)/w, w = 1
  — L'équation transformée :  [juge transform]  départ : 4u + 6(f∗u) = f
    = 4û + 6□f̂û = f̂   (trous : 4û + 6√(2π)f̂û = f̂)   ← ℱ(f ∗ u) = √(2π) f̂ û
    = û = f̂/(4 + 6√(2π)f̂)   ← Mettre û en facteur
  — On remplace f̂ et on simplifie (√(2π)·√(2/π) = 2) :  [juge equiv]  départ : (√(2/π)/(α² + 1))/(4 + 6√(2π)(√(2/π)/(α² + 1)))
    = (√(2/π)/(α² + 1))/(4 + □/(α² + 1))   (trous : (√(2/π)/(α² + 1))/(4 + 12/(α² + 1)))   ← √(2π)·√(2/π) = 2
    = √(2/π)/(4(α² + 1) + □)   (trous : √(2/π)/(4(α² + 1) + 12))   ← Même dénominateur
  — Retour en x :  [juge transform]  départ : û = √(2/π)/(4(α² + 1) + 12)
    (Il reste à : reconnaître la ligne F7 (paire) avec w = 2 et revenir en x.)
    = û = (1/□)√(2/π)/(α² + 4)   (trous : û = (1/4)√(2/π)/(α² + 4))   ← Coefficient de α² en facteur : W² = 4
    = u(x) = e^(−2□)/8   (trous : u(x) = e^(−2|x|)/8)   ← F7 avec w = 2, sur tout ℝ
  aides : Transforme : la convolution devient √(2π) f̂ û. Puis isole û, simplifie et reconnais une ligne de la table. | û (4 + 6√(2π) · √(2/π)/(α^2+1)) = f̂ | √(2/π)/(4(α^2+1)+12)
  pièges : f_ft_norm, f_table_line

Trouve u : ℝ → ℝ telle que 2u + 6(f ∗ u) = f, avec f(x) = e^(-2|x|) (on suppose u intégrable).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  f(x) = e^(−2|x|)
    = f̂(α) = 2√(2/π)/(α² + □)   (trous : f̂(α) = 2√(2/π)/(α² + 4))   ← Ligne F7 : e^(−w|y|) = w·e^(−|wy|)/w, w = 2
  — L'équation transformée :  [juge transform]  départ : 2u + 6(f∗u) = f
    = 2û + 6□f̂û = f̂   (trous : 2û + 6√(2π)f̂û = f̂)   ← ℱ(f ∗ u) = √(2π) f̂ û
    = û = f̂/(2 + 6√(2π)f̂)   ← Mettre û en facteur
  — On remplace f̂ et on simplifie (√(2π)·√(2/π) = 2) :  [juge equiv]  départ : (2√(2/π)/(α² + 4))/(2 + 6√(2π)(2√(2/π)/(α² + 4)))
    = (2√(2/π)/(α² + 4))/(2 + □/(α² + 4))   (trous : (2√(2/π)/(α² + 4))/(2 + 24/(α² + 4)))   ← √(2π)·√(2/π) = 2
    = 2√(2/π)/(2(α² + 4) + □)   (trous : 2√(2/π)/(2(α² + 4) + 24))   ← Même dénominateur
  — Retour en x :  [juge transform]  départ : û = 2√(2/π)/(2(α² + 4) + 24)
    (Il reste à : reconnaître la ligne F7 (paire) avec w = 4 et revenir en x.)
    = û = √(2/π)/(α² + □)   (trous : û = √(2/π)/(α² + 16))   ← Coefficient de α² en facteur : W² = 16
    = u(x) = e^(−4□)/4   (trous : u(x) = e^(−4|x|)/4)   ← F7 avec w = 4, sur tout ℝ
  aides : Transforme : la convolution devient √(2π) f̂ û. Puis isole û, simplifie et reconnais une ligne de la table. | û (2 + 6√(2π) · 2√(2/π)/(α^2+4)) = f̂ | 2√(2/π)/(2(α^2+4)+24)
  pièges : f_ft_norm, f_table_line

Trouve u : ℝ → ℝ telle que u + 3(f ∗ u) = f, avec f(x) = e^(-2|x|) (on suppose u intégrable).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  f(x) = e^(−2|x|)
    = f̂(α) = 2√(2/π)/(α² + □)   (trous : f̂(α) = 2√(2/π)/(α² + 4))   ← Ligne F7 : e^(−w|y|) = w·e^(−|wy|)/w, w = 2
  — L'équation transformée :  [juge transform]  départ : u + 3(f∗u) = f
    = û + 3□f̂û = f̂   (trous : û + 3√(2π)f̂û = f̂)   ← ℱ(f ∗ u) = √(2π) f̂ û
    = û = f̂/(1 + 3√(2π)f̂)   ← Mettre û en facteur
  — On remplace f̂ et on simplifie (√(2π)·√(2/π) = 2) :  [juge equiv]  départ : (2√(2/π)/(α² + 4))/(1 + 3√(2π)(2√(2/π)/(α² + 4)))
    = (2√(2/π)/(α² + 4))/(1 + □/(α² + 4))   (trous : (2√(2/π)/(α² + 4))/(1 + 12/(α² + 4)))   ← √(2π)·√(2/π) = 2
    = 2√(2/π)/(α² + 4 + □)   (trous : 2√(2/π)/(α² + 4 + 12))   ← Même dénominateur
  — Retour en x :  [juge transform]  départ : û = 2√(2/π)/(α² + 4 + 12)
    (Il reste à : reconnaître la ligne F7 (paire) avec w = 4 et revenir en x.)
    = û = 2√(2/π)/(α² + □)   (trous : û = 2√(2/π)/(α² + 16))   ← Coefficient de α² en facteur : W² = 16
    = u(x) = e^(−4□)/2   (trous : u(x) = e^(−4|x|)/2)   ← F7 avec w = 4, sur tout ℝ
  aides : Transforme : la convolution devient √(2π) f̂ û. Puis isole û, simplifie et reconnais une ligne de la table. | û (1 + 3√(2π) · 2√(2/π)/(α^2+4)) = f̂ | 2√(2/π)/(α^2+4+12)
  pièges : f_ft_norm, f_table_line

```

### Niveau 2

```
Trouve u : ℝ → ℝ telle que 2u + 3(f ∗ u) = f, avec f(x) = e^(-|x|) (on suppose u intégrable).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  f(x) = e^(−|x|)
    = f̂(α) = √(2/π)/(α² + □)   (trous : f̂(α) = √(2/π)/(α² + 1))   ← Ligne F7 : e^(−w|y|) = w·e^(−|wy|)/w, w = 1
  — L'équation transformée :  [juge transform]  départ : 2u + 3(f∗u) = f
    = 2û + □√(2π)f̂û = f̂   (trous : 2û + 3√(2π)f̂û = f̂)   ← ℱ(f ∗ u) = √(2π) f̂ û
    = û = f̂/(2 + 3√(2π)f̂)   ← Mettre û en facteur
  — On remplace f̂ et on simplifie (√(2π)·√(2/π) = 2) :  [juge equiv]  départ : (√(2/π)/(α² + 1))/(2 + 3√(2π)(√(2/π)/(α² + 1)))
    = (√(2/π)/(α² + 1))/(2 + □/(α² + 1))   (trous : (√(2/π)/(α² + 1))/(2 + 6/(α² + 1)))   ← √(2π)·√(2/π) = 2
    = √(2/π)/(2(α² + 1) + □)   (trous : √(2/π)/(2(α² + 1) + 6))   ← Même dénominateur
  — Retour en x :  [juge transform]  départ : û = √(2/π)/(2(α² + 1) + 6)
    ? Il reste à : ✔ reconnaître la ligne F7 (paire) avec w = 2 et revenir en x / · rien : la réponse est û / · lire la ligne F3 : u(x) = c·e^(−2x)
    = û = (1/2)√(2/π)/(α² + □)   (trous : û = (1/2)√(2/π)/(α² + 4))   ← Coefficient de α² en facteur : W² = 4
    = u(x) = e^(−□|x|)/4   (trous : u(x) = e^(−2|x|)/4)   ← F7 avec w = 2, sur tout ℝ
  aides : Transforme : la convolution devient √(2π) f̂ û. Puis isole û, simplifie et reconnais une ligne de la table. | û (2 + 3√(2π) · √(2/π)/(α^2+1)) = f̂ | √(2/π)/(2(α^2+1)+6)
  pièges : f_ft_norm, f_table_line, f_no_inverse, f_table_half_line

Trouve u : ℝ → ℝ telle que u + 3(f ∗ u) = f, avec f(x) = e^(-2|x|) (on suppose u intégrable).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  f(x) = e^(−2|x|)
    = f̂(α) = 2√(2/π)/(α² + □)   (trous : f̂(α) = 2√(2/π)/(α² + 4))   ← Ligne F7 : e^(−w|y|) = w·e^(−|wy|)/w, w = 2
  — L'équation transformée :  [juge transform]  départ : u + 3(f∗u) = f
    = û + □√(2π)f̂û = f̂   (trous : û + 3√(2π)f̂û = f̂)   ← ℱ(f ∗ u) = √(2π) f̂ û
    = û = f̂/(1 + 3√(2π)f̂)   ← Mettre û en facteur
  — On remplace f̂ et on simplifie (√(2π)·√(2/π) = 2) :  [juge equiv]  départ : (2√(2/π)/(α² + 4))/(1 + 3√(2π)(2√(2/π)/(α² + 4)))
    = (2√(2/π)/(α² + 4))/(1 + □/(α² + 4))   (trous : (2√(2/π)/(α² + 4))/(1 + 12/(α² + 4)))   ← √(2π)·√(2/π) = 2
    = 2√(2/π)/(α² + 4 + □)   (trous : 2√(2/π)/(α² + 4 + 12))   ← Même dénominateur
  — Retour en x :  [juge transform]  départ : û = 2√(2/π)/(α² + 4 + 12)
    ? Il reste à : ✔ reconnaître la ligne F7 (paire) avec w = 4 et revenir en x / · rien : la réponse est û / · lire la ligne F3 : u(x) = c·e^(−4x)
    = û = 2√(2/π)/(α² + □)   (trous : û = 2√(2/π)/(α² + 16))   ← Coefficient de α² en facteur : W² = 16
    = u(x) = e^(−□|x|)/2   (trous : u(x) = e^(−4|x|)/2)   ← F7 avec w = 4, sur tout ℝ
  aides : Transforme : la convolution devient √(2π) f̂ û. Puis isole û, simplifie et reconnais une ligne de la table. | û (1 + 3√(2π) · 2√(2/π)/(α^2+4)) = f̂ | 2√(2/π)/(α^2+4+12)
  pièges : f_ft_norm, f_table_line, f_no_inverse, f_table_half_line

Trouve u : ℝ → ℝ telle que 4u + 5(f ∗ u) = f, avec f(x) = e^(-2|x|) (on suppose u intégrable).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  f(x) = e^(−2|x|)
    = f̂(α) = 2√(2/π)/(α² + □)   (trous : f̂(α) = 2√(2/π)/(α² + 4))   ← Ligne F7 : e^(−w|y|) = w·e^(−|wy|)/w, w = 2
  — L'équation transformée :  [juge transform]  départ : 4u + 5(f∗u) = f
    = 4û + □√(2π)f̂û = f̂   (trous : 4û + 5√(2π)f̂û = f̂)   ← ℱ(f ∗ u) = √(2π) f̂ û
    = û = f̂/(4 + 5√(2π)f̂)   ← Mettre û en facteur
  — On remplace f̂ et on simplifie (√(2π)·√(2/π) = 2) :  [juge equiv]  départ : (2√(2/π)/(α² + 4))/(4 + 5√(2π)(2√(2/π)/(α² + 4)))
    = (2√(2/π)/(α² + 4))/(4 + □/(α² + 4))   (trous : (2√(2/π)/(α² + 4))/(4 + 20/(α² + 4)))   ← √(2π)·√(2/π) = 2
    = 2√(2/π)/(4(α² + 4) + □)   (trous : 2√(2/π)/(4(α² + 4) + 20))   ← Même dénominateur
  — Retour en x :  [juge transform]  départ : û = 2√(2/π)/(4(α² + 4) + 20)
    ? Il reste à : ✔ reconnaître la ligne F7 (paire) avec w = 3 et revenir en x / · rien : la réponse est û / · lire la ligne F3 : u(x) = c·e^(−3x)
    = û = (1/2)√(2/π)/(α² + □)   (trous : û = (1/2)√(2/π)/(α² + 9))   ← Coefficient de α² en facteur : W² = 9
    = u(x) = e^(−□|x|)/6   (trous : u(x) = e^(−3|x|)/6)   ← F7 avec w = 3, sur tout ℝ
  aides : Transforme : la convolution devient √(2π) f̂ û. Puis isole û, simplifie et reconnais une ligne de la table. | û (4 + 5√(2π) · 2√(2/π)/(α^2+4)) = f̂ | 2√(2/π)/(4(α^2+4)+20)
  pièges : f_ft_norm, f_table_line, f_no_inverse, f_table_half_line

```

### Niveau 3

```
Trouve u : ℝ → ℝ telle que 3u + 8(f ∗ u) = f, avec f(x) = e^(-3|x|) (on suppose u intégrable).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [tap, suivre l'erreur, menu menu]  f(x) = e^(−3|x|)
    = f̂(α) = 3√(2/π)/(α² + 9)   ← Ligne F7 : e^(−w|y|) = w·e^(−|wy|)/w, w = 3
  — L'équation transformée :  [juge transform]  départ : 3u + 8(f∗u) = f
    = 3û + 8√(2π)f̂û = f̂   ← ℱ(f ∗ u) = √(2π) f̂ û
    = û = f̂/(3 + 8√(2π)f̂)   ← Mettre û en facteur
  — On remplace f̂ et on simplifie (√(2π)·√(2/π) = 2) :  [juge equiv]  départ : (3√(2/π)/(α² + 9))/(3 + 8√(2π)(3√(2/π)/(α² + 9)))
    = (3√(2/π)/(α² + 9))/(3 + 48/(α² + 9))   ← √(2π)·√(2/π) = 2
    = 3√(2/π)/(3(α² + 9) + 48)   ← Même dénominateur
  — Retour en x :  [juge transform]  départ : û = 3√(2/π)/(3(α² + 9) + 48)
    ? Il reste à : ✔ reconnaître la ligne F7 (paire) avec w = 5 et revenir en x / · rien : la réponse est û / · lire la ligne F3 : u(x) = c·e^(−5x)
    = û = √(2/π)/(α² + 25)   ← Coefficient de α² en facteur : W² = 25
    = u(x) = e^(−5|x|)/5   ← F7 avec w = 5, sur tout ℝ
  aides : Transforme : la convolution devient √(2π) f̂ û. Puis isole û, simplifie et reconnais une ligne de la table. | û (3 + 8√(2π) · 3√(2/π)/(α^2+9)) = f̂ | 3√(2/π)/(3(α^2+9)+48)
  pièges : f_ft_norm, f_table_line, f_no_inverse, f_table_half_line

Trouve u : ℝ → ℝ telle que 4u + 5(f ∗ u) = f, avec f(x) = e^(-2|x|) (on suppose u intégrable).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [tap, suivre l'erreur, menu menu]  f(x) = e^(−2|x|)
    = f̂(α) = 2√(2/π)/(α² + 4)   ← Ligne F7 : e^(−w|y|) = w·e^(−|wy|)/w, w = 2
  — L'équation transformée :  [juge transform]  départ : 4u + 5(f∗u) = f
    = 4û + 5√(2π)f̂û = f̂   ← ℱ(f ∗ u) = √(2π) f̂ û
    = û = f̂/(4 + 5√(2π)f̂)   ← Mettre û en facteur
  — On remplace f̂ et on simplifie (√(2π)·√(2/π) = 2) :  [juge equiv]  départ : (2√(2/π)/(α² + 4))/(4 + 5√(2π)(2√(2/π)/(α² + 4)))
    = (2√(2/π)/(α² + 4))/(4 + 20/(α² + 4))   ← √(2π)·√(2/π) = 2
    = 2√(2/π)/(4(α² + 4) + 20)   ← Même dénominateur
  — Retour en x :  [juge transform]  départ : û = 2√(2/π)/(4(α² + 4) + 20)
    ? Il reste à : ✔ reconnaître la ligne F7 (paire) avec w = 3 et revenir en x / · rien : la réponse est û / · lire la ligne F3 : u(x) = c·e^(−3x)
    = û = (1/2)√(2/π)/(α² + 9)   ← Coefficient de α² en facteur : W² = 9
    = u(x) = e^(−3|x|)/6   ← F7 avec w = 3, sur tout ℝ
  aides : Transforme : la convolution devient √(2π) f̂ û. Puis isole û, simplifie et reconnais une ligne de la table. | û (4 + 5√(2π) · 2√(2/π)/(α^2+4)) = f̂ | 2√(2/π)/(4(α^2+4)+20)
  pièges : f_ft_norm, f_table_line, f_no_inverse, f_table_half_line

Trouve u : ℝ → ℝ telle que u + (3/2)(f ∗ u) = f, avec f(x) = e^(-|x|) (on suppose u intégrable).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [tap, suivre l'erreur, menu menu]  f(x) = e^(−|x|)
    = f̂(α) = √(2/π)/(α² + 1)   ← Ligne F7 : e^(−w|y|) = w·e^(−|wy|)/w, w = 1
  — L'équation transformée :  [juge transform]  départ : u + (3/2)(f∗u) = f
    = û + (3/2)√(2π)f̂û = f̂   ← ℱ(f ∗ u) = √(2π) f̂ û
    = û = f̂/(1 + (3/2)√(2π)f̂)   ← Mettre û en facteur
  — On remplace f̂ et on simplifie (√(2π)·√(2/π) = 2) :  [juge equiv]  départ : (√(2/π)/(α² + 1))/(1 + (3/2)√(2π)(√(2/π)/(α² + 1)))
    = (√(2/π)/(α² + 1))/(1 + 3/(α² + 1))   ← √(2π)·√(2/π) = 2
    = √(2/π)/(α² + 1 + 3)   ← Même dénominateur
  — Retour en x :  [juge transform]  départ : û = √(2/π)/(α² + 1 + 3)
    ? Il reste à : ✔ reconnaître la ligne F7 (paire) avec w = 2 et revenir en x / · rien : la réponse est û / · lire la ligne F3 : u(x) = c·e^(−2x)
    = û = √(2/π)/(α² + 4)   ← Coefficient de α² en facteur : W² = 4
    = u(x) = e^(−2|x|)/2   ← F7 avec w = 2, sur tout ℝ
  aides : Transforme : la convolution devient √(2π) f̂ û. Puis isole û, simplifie et reconnais une ligne de la table. | û (1 + (3/2)√(2π) · √(2/π)/(α^2+1)) = f̂ | √(2/π)/(α^2+1+3)
  pièges : f_ft_norm, f_table_line, f_no_inverse, f_table_half_line

```

### Niveau 4

```
Trouve u : ℝ → ℝ telle que 4u + 5(f ∗ u) = f, avec f(x) = e^(-2|x|) (on suppose u intégrable).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [free, suivre l'erreur]  f(x) = e^(−2|x|)
    = f̂(α) = 2√(2/π)/(α² + 4)   ← Ligne F7 : e^(−w|y|) = w·e^(−|wy|)/w, w = 2
  — L'équation transformée :  [juge transform]  départ : 4u + 5(f∗u) = f
    = 4û + 5√(2π)f̂û = f̂   ← ℱ(f ∗ u) = √(2π) f̂ û
    = û = f̂/(4 + 5√(2π)f̂)   ← Mettre û en facteur
  — On remplace f̂ et on simplifie (√(2π)·√(2/π) = 2) :  [juge equiv]  départ : (2√(2/π)/(α² + 4))/(4 + 5√(2π)(2√(2/π)/(α² + 4)))
    = (2√(2/π)/(α² + 4))/(4 + 20/(α² + 4))   ← √(2π)·√(2/π) = 2
    = 2√(2/π)/(4(α² + 4) + 20)   ← Même dénominateur
  — Retour en x :  [juge transform]  départ : û = 2√(2/π)/(4(α² + 4) + 20)
    ? Il reste à : ✔ reconnaître la ligne F7 (paire) avec w = 3 et revenir en x / · rien : la réponse est û / · lire la ligne F3 : u(x) = c·e^(−3x)
    = û = (1/2)√(2/π)/(α² + 9)   ← Coefficient de α² en facteur : W² = 9
    = u(x) = e^(−3|x|)/6   ← F7 avec w = 3, sur tout ℝ
  aides : Transforme : la convolution devient √(2π) f̂ û. Puis isole û, simplifie et reconnais une ligne de la table. | û (4 + 5√(2π) · 2√(2/π)/(α^2+4)) = f̂ | 2√(2/π)/(4(α^2+4)+20)
  pièges : f_ft_norm, f_table_line, f_no_inverse, f_table_half_line

Trouve u : ℝ → ℝ telle que u + (3/2)(f ∗ u) = f, avec f(x) = e^(-|x|) (on suppose u intégrable).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [free, suivre l'erreur]  f(x) = e^(−|x|)
    = f̂(α) = √(2/π)/(α² + 1)   ← Ligne F7 : e^(−w|y|) = w·e^(−|wy|)/w, w = 1
  — L'équation transformée :  [juge transform]  départ : u + (3/2)(f∗u) = f
    = û + (3/2)√(2π)f̂û = f̂   ← ℱ(f ∗ u) = √(2π) f̂ û
    = û = f̂/(1 + (3/2)√(2π)f̂)   ← Mettre û en facteur
  — On remplace f̂ et on simplifie (√(2π)·√(2/π) = 2) :  [juge equiv]  départ : (√(2/π)/(α² + 1))/(1 + (3/2)√(2π)(√(2/π)/(α² + 1)))
    = (√(2/π)/(α² + 1))/(1 + 3/(α² + 1))   ← √(2π)·√(2/π) = 2
    = √(2/π)/(α² + 1 + 3)   ← Même dénominateur
  — Retour en x :  [juge transform]  départ : û = √(2/π)/(α² + 1 + 3)
    ? Il reste à : ✔ reconnaître la ligne F7 (paire) avec w = 2 et revenir en x / · rien : la réponse est û / · lire la ligne F3 : u(x) = c·e^(−2x)
    = û = √(2/π)/(α² + 4)   ← Coefficient de α² en facteur : W² = 4
    = u(x) = e^(−2|x|)/2   ← F7 avec w = 2, sur tout ℝ
  aides : Transforme : la convolution devient √(2π) f̂ û. Puis isole û, simplifie et reconnais une ligne de la table. | û (1 + (3/2)√(2π) · √(2/π)/(α^2+1)) = f̂ | √(2/π)/(α^2+1+3)
  pièges : f_ft_norm, f_table_line, f_no_inverse, f_table_half_line

Trouve u : ℝ → ℝ telle que 4u + 5(f ∗ u) = f, avec f(x) = e^(-2|x|) (on suppose u intégrable).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [free, suivre l'erreur]  f(x) = e^(−2|x|)
    = f̂(α) = 2√(2/π)/(α² + 4)   ← Ligne F7 : e^(−w|y|) = w·e^(−|wy|)/w, w = 2
  — L'équation transformée :  [juge transform]  départ : 4u + 5(f∗u) = f
    = 4û + 5√(2π)f̂û = f̂   ← ℱ(f ∗ u) = √(2π) f̂ û
    = û = f̂/(4 + 5√(2π)f̂)   ← Mettre û en facteur
  — On remplace f̂ et on simplifie (√(2π)·√(2/π) = 2) :  [juge equiv]  départ : (2√(2/π)/(α² + 4))/(4 + 5√(2π)(2√(2/π)/(α² + 4)))
    = (2√(2/π)/(α² + 4))/(4 + 20/(α² + 4))   ← √(2π)·√(2/π) = 2
    = 2√(2/π)/(4(α² + 4) + 20)   ← Même dénominateur
  — Retour en x :  [juge transform]  départ : û = 2√(2/π)/(4(α² + 4) + 20)
    ? Il reste à : ✔ reconnaître la ligne F7 (paire) avec w = 3 et revenir en x / · rien : la réponse est û / · lire la ligne F3 : u(x) = c·e^(−3x)
    = û = (1/2)√(2/π)/(α² + 9)   ← Coefficient de α² en facteur : W² = 9
    = u(x) = e^(−3|x|)/6   ← F7 avec w = 3, sur tout ℝ
  aides : Transforme : la convolution devient √(2π) f̂ û. Puis isole û, simplifie et reconnais une ligne de la table. | û (4 + 5√(2π) · 2√(2/π)/(α^2+4)) = f̂ | 2√(2/π)/(4(α^2+4)+20)
  pièges : f_ft_norm, f_table_line, f_no_inverse, f_table_half_line

```

### Niveau 5

```
(i) Donne la définition de la transformée de Fourier, avec ses hypothèses. (ii) Trouve u telle que 4u + 6(f ∗ u) = f, f(x) = e^(-|x|).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [problème, 8 points]
  partie 1 (Définition de f̂ : 2)
  Écris la définition de la transformée de Fourier, avec ses hypothèses : touche les blocs dans l'ordre.
    [blocs define, sans aide]
      1. Soit f : ℝ → ℝ continue par morceaux
      2. telle que ∫ℝ |f(y)| dy < ∞ (f est absolument intégrable).
      3. Sa transformée de Fourier est f̂(α) = (1/√(2π)) ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ.
      ✗ Sa transformée de Fourier est f̂(α) = ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ. [f_ft_norm]
      ✗ telle que ∫ℝ f(y) dy converge. [a1_abs_conv_confused]
      ✗ Sa transformée de Fourier est f̂(α) = (1/(2π)) ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ. [f_ft_norm]
  partie 2 (Résolution : 1 ; L'équation transformée : 2 ; On remplace f̂ et on simplifie (√(2π)·√(2/π) = 2) : 1,5 ; Retour en x : 1,5)
  Trouve u : ℝ → ℝ telle que 4u + 6(f ∗ u) = f, avec f(x) = e^(-|x|) (on suppose u intégrable).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
    [free, sans aide, suivre l'erreur]  f(x) = e^(−|x|)
      = f̂(α) = √(2/π)/(α² + 1)   ← Ligne F7 : e^(−w|y|) = w·e^(−|wy|)/w, w = 1
    — L'équation transformée :  [juge transform]  départ : 4u + 6(f∗u) = f
      = 4û + 6√(2π)f̂û = f̂   ← ℱ(f ∗ u) = √(2π) f̂ û
      = û = f̂/(4 + 6√(2π)f̂)   ← Mettre û en facteur
    — On remplace f̂ et on simplifie (√(2π)·√(2/π) = 2) :  [juge equiv]  départ : (√(2/π)/(α² + 1))/(4 + 6√(2π)(√(2/π)/(α² + 1)))
      = (√(2/π)/(α² + 1))/(4 + 12/(α² + 1))   ← √(2π)·√(2/π) = 2
      = √(2/π)/(4(α² + 1) + 12)   ← Même dénominateur
    — Retour en x :  [juge transform]  départ : û = √(2/π)/(4(α² + 1) + 12)
      ? Il reste à : ✔ reconnaître la ligne F7 (paire) avec w = 2 et revenir en x / · rien : la réponse est û / · lire la ligne F3 : u(x) = c·e^(−2x)
      = û = (1/4)√(2/π)/(α² + 4)   ← Coefficient de α² en facteur : W² = 4
      = u(x) = e^(−2|x|)/8   ← F7 avec w = 2, sur tout ℝ
  pièges : f_ft_norm, a1_abs_conv_confused, f_table_line, f_no_inverse, f_table_half_line

(i) Donne la définition de la transformée de Fourier, avec ses hypothèses. (ii) Trouve u telle que 4u + 5(f ∗ u) = f, f(x) = e^(-2|x|).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [problème, 8 points]
  partie 1 (Définition de f̂ : 2)
  Écris la définition de la transformée de Fourier, avec ses hypothèses : touche les blocs dans l'ordre.
    [blocs define, sans aide]
      1. Soit f : ℝ → ℝ continue par morceaux
      2. telle que ∫ℝ |f(y)| dy < ∞ (f est absolument intégrable).
      3. Sa transformée de Fourier est f̂(α) = (1/√(2π)) ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ.
      ✗ Sa transformée de Fourier est f̂(α) = ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ. [f_ft_norm]
      ✗ telle que ∫ℝ f(y) dy converge. [a1_abs_conv_confused]
      ✗ Sa transformée de Fourier est f̂(α) = (1/(2π)) ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ. [f_ft_norm]
  partie 2 (Résolution : 1 ; L'équation transformée : 2 ; On remplace f̂ et on simplifie (√(2π)·√(2/π) = 2) : 1,5 ; Retour en x : 1,5)
  Trouve u : ℝ → ℝ telle que 4u + 5(f ∗ u) = f, avec f(x) = e^(-2|x|) (on suppose u intégrable).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
    [free, sans aide, suivre l'erreur]  f(x) = e^(−2|x|)
      = f̂(α) = 2√(2/π)/(α² + 4)   ← Ligne F7 : e^(−w|y|) = w·e^(−|wy|)/w, w = 2
    — L'équation transformée :  [juge transform]  départ : 4u + 5(f∗u) = f
      = 4û + 5√(2π)f̂û = f̂   ← ℱ(f ∗ u) = √(2π) f̂ û
      = û = f̂/(4 + 5√(2π)f̂)   ← Mettre û en facteur
    — On remplace f̂ et on simplifie (√(2π)·√(2/π) = 2) :  [juge equiv]  départ : (2√(2/π)/(α² + 4))/(4 + 5√(2π)(2√(2/π)/(α² + 4)))
      = (2√(2/π)/(α² + 4))/(4 + 20/(α² + 4))   ← √(2π)·√(2/π) = 2
      = 2√(2/π)/(4(α² + 4) + 20)   ← Même dénominateur
    — Retour en x :  [juge transform]  départ : û = 2√(2/π)/(4(α² + 4) + 20)
      ? Il reste à : ✔ reconnaître la ligne F7 (paire) avec w = 3 et revenir en x / · rien : la réponse est û / · lire la ligne F3 : u(x) = c·e^(−3x)
      = û = (1/2)√(2/π)/(α² + 9)   ← Coefficient de α² en facteur : W² = 9
      = u(x) = e^(−3|x|)/6   ← F7 avec w = 3, sur tout ℝ
  pièges : f_ft_norm, a1_abs_conv_confused, f_table_line, f_no_inverse, f_table_half_line

(i) Donne la définition de la transformée de Fourier, avec ses hypothèses. (ii) Trouve u telle que 4u + 5(f ∗ u) = f, f(x) = e^(-2|x|).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [problème, 8 points]
  partie 1 (Définition de f̂ : 2)
  Écris la définition de la transformée de Fourier, avec ses hypothèses : touche les blocs dans l'ordre.
    [blocs define, sans aide]
      1. Soit f : ℝ → ℝ continue par morceaux
      2. telle que ∫ℝ |f(y)| dy < ∞ (f est absolument intégrable).
      3. Sa transformée de Fourier est f̂(α) = (1/√(2π)) ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ.
      ✗ telle que ∫ℝ f(y) dy converge. [a1_abs_conv_confused]
      ✗ Sa transformée de Fourier est f̂(α) = ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ. [f_ft_norm]
      ✗ Sa transformée de Fourier est f̂(α) = (1/(2π)) ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ. [f_ft_norm]
  partie 2 (Résolution : 1 ; L'équation transformée : 2 ; On remplace f̂ et on simplifie (√(2π)·√(2/π) = 2) : 1,5 ; Retour en x : 1,5)
  Trouve u : ℝ → ℝ telle que 4u + 5(f ∗ u) = f, avec f(x) = e^(-2|x|) (on suppose u intégrable).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
    [free, sans aide, suivre l'erreur]  f(x) = e^(−2|x|)
      = f̂(α) = 2√(2/π)/(α² + 4)   ← Ligne F7 : e^(−w|y|) = w·e^(−|wy|)/w, w = 2
    — L'équation transformée :  [juge transform]  départ : 4u + 5(f∗u) = f
      = 4û + 5√(2π)f̂û = f̂   ← ℱ(f ∗ u) = √(2π) f̂ û
      = û = f̂/(4 + 5√(2π)f̂)   ← Mettre û en facteur
    — On remplace f̂ et on simplifie (√(2π)·√(2/π) = 2) :  [juge equiv]  départ : (2√(2/π)/(α² + 4))/(4 + 5√(2π)(2√(2/π)/(α² + 4)))
      = (2√(2/π)/(α² + 4))/(4 + 20/(α² + 4))   ← √(2π)·√(2/π) = 2
      = 2√(2/π)/(4(α² + 4) + 20)   ← Même dénominateur
    — Retour en x :  [juge transform]  départ : û = 2√(2/π)/(4(α² + 4) + 20)
      ? Il reste à : ✔ reconnaître la ligne F7 (paire) avec w = 3 et revenir en x / · rien : la réponse est û / · lire la ligne F3 : u(x) = c·e^(−3x)
      = û = (1/2)√(2/π)/(α² + 9)   ← Coefficient de α² en facteur : W² = 9
      = u(x) = e^(−3|x|)/6   ← F7 avec w = 3, sur tout ℝ
  pièges : a1_abs_conv_confused, f_ft_norm, f_table_line, f_no_inverse, f_table_half_line

```

### Variantes d'examen

```
u est intégrable et vérifie 2u + 3(f ∗ u) = f avec f(x) = e^(-|x|). Cochez les affirmations vraies.Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x) (plusieurs réponses possibles)
  · û = (1/2)√(2/π)/(α^2+8) [f_rat_simplify]   ✔ û = (1/2)√(2/π)/(α^2+4)   · û = f̂/(2 + √(2π) f̂) [f_conv_coef_dropped]   ✔ u(x) = e^(-2|x|)/4   ✔ û(0) = (1/2)√(2/π)/4
  [examen mcq]
  pièges : f_rat_simplify, f_conv_coef_dropped

(i) Donne la définition de la transformée de Fourier, avec ses hypothèses. (ii) Trouve u telle que u + 4(f ∗ u) = f, f(x) = e^(-|x|).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [problème, examen open, 8 points]
  partie 1 (Définition de f̂ : 2)
  Écris la définition de la transformée de Fourier, avec ses hypothèses : touche les blocs dans l'ordre.
    [blocs define, sans aide]
      1. Soit f : ℝ → ℝ continue par morceaux
      2. telle que ∫ℝ |f(y)| dy < ∞ (f est absolument intégrable).
      3. Sa transformée de Fourier est f̂(α) = (1/√(2π)) ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ.
      ✗ Sa transformée de Fourier est f̂(α) = (1/(2π)) ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ. [f_ft_norm]
      ✗ Sa transformée de Fourier est f̂(α) = ∫ℝ f(y) e^(−iαy) dy, pour tout α ∈ ℝ. [f_ft_norm]
      ✗ telle que ∫ℝ f(y) dy converge. [a1_abs_conv_confused]
  partie 2 (Résolution : 1 ; L'équation transformée : 2 ; On remplace f̂ et on simplifie (√(2π)·√(2/π) = 2) : 1,5 ; Retour en x : 1,5)
  Trouve u : ℝ → ℝ telle que u + 4(f ∗ u) = f, avec f(x) = e^(-|x|) (on suppose u intégrable).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
    [free, sans aide, suivre l'erreur]  f(x) = e^(−|x|)
      = f̂(α) = √(2/π)/(α² + 1)   ← Ligne F7 : e^(−w|y|) = w·e^(−|wy|)/w, w = 1
    — L'équation transformée :  [juge transform]  départ : u + 4(f∗u) = f
      = û + 4√(2π)f̂û = f̂   ← ℱ(f ∗ u) = √(2π) f̂ û
      = û = f̂/(1 + 4√(2π)f̂)   ← Mettre û en facteur
    — On remplace f̂ et on simplifie (√(2π)·√(2/π) = 2) :  [juge equiv]  départ : (√(2/π)/(α² + 1))/(1 + 4√(2π)(√(2/π)/(α² + 1)))
      = (√(2/π)/(α² + 1))/(1 + 8/(α² + 1))   ← √(2π)·√(2/π) = 2
      = √(2/π)/(α² + 1 + 8)   ← Même dénominateur
    — Retour en x :  [juge transform]  départ : û = √(2/π)/(α² + 1 + 8)
      ? Il reste à : ✔ reconnaître la ligne F7 (paire) avec w = 3 et revenir en x / · rien : la réponse est û / · lire la ligne F3 : u(x) = c·e^(−3x)
      = û = √(2/π)/(α² + 9)   ← Coefficient de α² en facteur : W² = 9
      = u(x) = e^(−3|x|)/3   ← F7 avec w = 3, sur tout ℝ
  pièges : f_ft_norm, a1_abs_conv_confused, f_table_line, f_no_inverse, f_table_half_line

```

## Plancherel (`f-plancherel`, BA4)

_∫ |f|² = ∫ |f̂|² sans facteur : une intégrale en α difficile par une intégrale en x facile._

### Niveau 1

```
Calcule int(1/(α^2+9)^2, α, -∞, ∞) avec la formule de Plancherel, en partant de f(x) = e^(-3|x|).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  f(x) = e^(−3|x|)
    = f̂(α) = 3√(2/π)/(α² + □)   (trous : f̂(α) = 3√(2/π)/(α² + 9))   ← Ligne F7
  — ∫ f² = ∫ |f̂|² : à gauche, ∫ f(x)² dx :  [juge definite]  départ : ∫_{−∞}^{∞} e^(−6|x|) dx
    = □(∫_{0}^{∞} e^(−6x) dx)   (trous : 2(∫_{0}^{∞} e^(−6x) dx))   ← Parité
    = 1/3   ← Valeur
  — L'intégrale demandée :  [juge definite]  départ : ∫_{−∞}^{∞} 1/(α² + 9)² dα
    = (□)(∫_{0}^{∞} e^(−6x) dx)   (trous : (π/9)(∫_{0}^{∞} e^(−6x) dx))   ← Plancherel, puis isoler
    = π/54   ← Valeur
  aides : Quelle fonction a pour transformée 3√(2/π)/(α^2+9) ? C'est la ligne F7. | int(e^(-6|x|), x, -∞, ∞) = (18/π) int(1/(α^2+9)^2, α, -∞, ∞) | (π/9)int(e^(-6x), x, 0, ∞)
  pièges : f_ft_norm

Calcule int(1/(α^2+4)^2, α, -∞, ∞) avec la formule de Plancherel, en partant de f(x) = e^(-2|x|).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  f(x) = e^(−2|x|)
    = f̂(α) = 2√(2/π)/(α² + □)   (trous : f̂(α) = 2√(2/π)/(α² + 4))   ← Ligne F7
  — ∫ f² = ∫ |f̂|² : à gauche, ∫ f(x)² dx :  [juge definite]  départ : ∫_{−∞}^{∞} e^(−4|x|) dx
    = □(∫_{0}^{∞} e^(−4x) dx)   (trous : 2(∫_{0}^{∞} e^(−4x) dx))   ← Parité
    = 1/2   ← Valeur
  — L'intégrale demandée :  [juge definite]  départ : ∫_{−∞}^{∞} 1/(α² + 4)² dα
    = (□)(∫_{0}^{∞} e^(−4x) dx)   (trous : (π/4)(∫_{0}^{∞} e^(−4x) dx))   ← Plancherel, puis isoler
    = π/16   ← Valeur
  aides : Quelle fonction a pour transformée 2√(2/π)/(α^2+4) ? C'est la ligne F7. | int(e^(-4|x|), x, -∞, ∞) = (8/π) int(1/(α^2+4)^2, α, -∞, ∞) | (π/4)int(e^(-4x), x, 0, ∞)
  pièges : f_ft_norm

Calcule int(1/(x^2+4)^2, x, -∞, ∞) avec la formule de Plancherel, en partant de f(x) = 1/(x^2+4).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  f(x) = 1/(x² + 4)
    = f̂(α) = □e^(−2|α|)/2   (trous : f̂(α) = √(π/2)e^(−2|α|)/2)   ← Ligne F6
  — Cette fois, c'est ∫ |f̂(α)|² dα qui est facile :  [juge definite]  départ : ∫_{−∞}^{∞} (π/2)e^(−4|α|)/4 dα
    = (π/□)(∫_{0}^{∞} e^(−4α) dα)   (trous : (π/4)(∫_{0}^{∞} e^(−4α) dα))   ← Parité
    = π/16   ← Valeur
  — L'intégrale demandée :  [juge definite]  départ : ∫_{−∞}^{∞} 1/(x² + 4)² dx
    = (□)(∫_{0}^{∞} e^(−4α) dα)   (trous : (π/4)(∫_{0}^{∞} e^(−4α) dα))   ← Plancherel, puis isoler
    = π/16   ← Valeur
  aides : Quelle fonction a pour transformée √(π/2) e^(-2abs(α))/2 ? C'est la ligne F6. | int(1/(x^2+4)^2, x, -∞, ∞) = int((π/2)e^(-4abs(α))/4, α, -∞, ∞) | (π/4)int(e^(-4α), α, 0, ∞)
  pièges : f_ft_norm

```

### Niveau 2

```
Calcule int(1/(x^2+4)^2, x, -∞, ∞) avec la formule de Plancherel, en partant de f(x) = 1/(x^2+4).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  f(x) = 1/(x² + 4)
    = f̂(α) = □e^(−2|α|)/2   (trous : f̂(α) = √(π/2)e^(−2|α|)/2)   ← Ligne F6
  — Cette fois, c'est ∫ |f̂(α)|² dα qui est facile :  [juge definite]  départ : ∫_{−∞}^{∞} (π/2)e^(−4|α|)/4 dα
    = (π/□)(∫_{0}^{∞} e^(−4α) dα)   (trous : (π/4)(∫_{0}^{∞} e^(−4α) dα))   ← Parité
    = π/16   ← Valeur
  — L'intégrale demandée :  [juge definite]  départ : ∫_{−∞}^{∞} 1/(x² + 4)² dx
    ? Comment la calculer ? ✔ Plancherel : ∫ |f(x)|² dx = ∫ |f̂(α)|² dα / ✔ Les résidus / · Plancherel : ∫ |f|² = 2π ∫ |f̂|²
    = (□)(∫_{0}^{∞} e^(−4α) dα)   (trous : (π/4)(∫_{0}^{∞} e^(−4α) dα))   ← Plancherel, puis isoler
    = π/16   ← Valeur
  aides : Quelle fonction a pour transformée √(π/2) e^(-2abs(α))/2 ? C'est la ligne F6. | int(1/(x^2+4)^2, x, -∞, ∞) = int((π/2)e^(-4abs(α))/4, α, -∞, ∞) | (π/4)int(e^(-4α), α, 0, ∞)
  pièges : f_ft_norm, f_plancherel_factor

Calcule int(1/(α^2+4)^2, α, -∞, ∞) avec la formule de Plancherel, en partant de f(x) = e^(-2|x|).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  f(x) = e^(−2|x|)
    = f̂(α) = 2√(2/π)/(α² + □)   (trous : f̂(α) = 2√(2/π)/(α² + 4))   ← Ligne F7
  — ∫ f² = ∫ |f̂|² : à gauche, ∫ f(x)² dx :  [juge definite]  départ : ∫_{−∞}^{∞} e^(−4|x|) dx
    = □(∫_{0}^{∞} e^(−4x) dx)   (trous : 2(∫_{0}^{∞} e^(−4x) dx))   ← Parité
    = 1/2   ← Valeur
  — L'intégrale demandée :  [juge definite]  départ : ∫_{−∞}^{∞} 1/(α² + 4)² dα
    ? Comment la calculer ? ✔ Plancherel : ∫ |f(x)|² dx = ∫ |f̂(α)|² dα / ✔ Les résidus / · Plancherel : ∫ |f|² = 2π ∫ |f̂|²
    = (□)(∫_{0}^{∞} e^(−4x) dx)   (trous : (π/4)(∫_{0}^{∞} e^(−4x) dx))   ← Plancherel, puis isoler
    = π/16   ← Valeur
  aides : Quelle fonction a pour transformée 2√(2/π)/(α^2+4) ? C'est la ligne F7. | int(e^(-4|x|), x, -∞, ∞) = (8/π) int(1/(α^2+4)^2, α, -∞, ∞) | (π/4)int(e^(-4x), x, 0, ∞)
  pièges : f_ft_norm, f_plancherel_factor

Calcule int(1/(α^2+4)^2, α, -∞, ∞) avec la formule de Plancherel, en partant de f(x) = e^(-2|x|).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  f(x) = e^(−2|x|)
    = f̂(α) = 2√(2/π)/(α² + □)   (trous : f̂(α) = 2√(2/π)/(α² + 4))   ← Ligne F7
  — ∫ f² = ∫ |f̂|² : à gauche, ∫ f(x)² dx :  [juge definite]  départ : ∫_{−∞}^{∞} e^(−4|x|) dx
    = □(∫_{0}^{∞} e^(−4x) dx)   (trous : 2(∫_{0}^{∞} e^(−4x) dx))   ← Parité
    = 1/2   ← Valeur
  — L'intégrale demandée :  [juge definite]  départ : ∫_{−∞}^{∞} 1/(α² + 4)² dα
    ? Comment la calculer ? ✔ Plancherel : ∫ |f(x)|² dx = ∫ |f̂(α)|² dα / ✔ Les résidus / · Plancherel : ∫ |f|² = 2π ∫ |f̂|²
    = (□)(∫_{0}^{∞} e^(−4x) dx)   (trous : (π/4)(∫_{0}^{∞} e^(−4x) dx))   ← Plancherel, puis isoler
    = π/16   ← Valeur
  aides : Quelle fonction a pour transformée 2√(2/π)/(α^2+4) ? C'est la ligne F7. | int(e^(-4|x|), x, -∞, ∞) = (8/π) int(1/(α^2+4)^2, α, -∞, ∞) | (π/4)int(e^(-4x), x, 0, ∞)
  pièges : f_ft_norm, f_plancherel_factor

```

### Niveau 3

```
Calcule int(1/(α^2+4)^2, α, -∞, ∞) avec la formule de Plancherel, en partant de f(x) = e^(-2|x|).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [tap, suivre l'erreur, menu menu]  f(x) = e^(−2|x|)
    = f̂(α) = 2√(2/π)/(α² + 4)   ← Ligne F7
  — ∫ f² = ∫ |f̂|² : à gauche, ∫ f(x)² dx :  [juge definite]  départ : ∫_{−∞}^{∞} e^(−4|x|) dx
    = 2(∫_{0}^{∞} e^(−4x) dx)   ← Parité
    = 1/2   ← Valeur
  — L'intégrale demandée :  [juge definite]  départ : ∫_{−∞}^{∞} 1/(α² + 4)² dα
    ? Comment la calculer ? ✔ Plancherel : ∫ |f(x)|² dx = ∫ |f̂(α)|² dα / ✔ Les résidus / · Plancherel : ∫ |f|² = 2π ∫ |f̂|²
    = (π/4)(∫_{0}^{∞} e^(−4x) dx)   ← Plancherel, puis isoler
    = π/16   ← Valeur
  aides : Quelle fonction a pour transformée 2√(2/π)/(α^2+4) ? C'est la ligne F7. | int(e^(-4|x|), x, -∞, ∞) = (8/π) int(1/(α^2+4)^2, α, -∞, ∞) | (π/4)int(e^(-4x), x, 0, ∞)
  pièges : f_ft_norm, f_plancherel_factor

Calcule int(sin(α)^2/α^2, α, -∞, ∞) avec la formule de Plancherel, en partant de f(x) = 1 si |x| < 1, 0 sinon.Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [tap, suivre l'erreur, menu menu]  f(x) = H(1 − |x|)
    = f̂(α) = √(2/π)sin(α)/α   ← Ligne F1
  — ∫ f² = ∫ |f̂|² : à gauche, ∫ f(x)² dx :  [juge definite]  départ : ∫_{−1}^{1} 1 dx
    = 2   ← Valeur
  — L'intégrale demandée :  [juge definite]  départ : ∫_{−∞}^{∞} sin(α)²/α² dα
    ? Comment la calculer ? ✔ Plancherel : ∫ |f(x)|² dx = ∫ |f̂(α)|² dα / ✔ Les résidus / · Plancherel : ∫ |f|² = 2π ∫ |f̂|²
    = (π/2)(∫_{−1}^{1} 1 dx)   ← Plancherel, puis isoler
    = π   ← Valeur
  aides : Quelle fonction a pour transformée √(2/π) sin(α)/α ? C'est la ligne F1. | int(1, x, -1, 1) = int((2/π) sin(α)^2/α^2, α, -∞, ∞) | (π/2) int(1, x, -1, 1)
  pièges : f_ft_norm, f_plancherel_factor

Calcule int(α^2 e^(-α^2/2), α, -∞, ∞) avec la formule de Plancherel, en partant de f(x) = x e^(-x^2) (on donne ∫ℝ x² e^(−2x²) dx = √(2π)/8).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [tap, suivre l'erreur, menu menu]  f(x) = xe^(−x²)
    = f̂(α) = −iαe^(−α²/4)/(2√2)   ← Ligne F9
  — ∫ f² = ∫ |f̂|² : à gauche, ∫ f(x)² dx (valeur donnée) :  [juge definite]  départ : ∫_{−∞}^{∞} x²e^(−2x²) dx
    = √2√π/8   ← Valeur
  — L'intégrale demandée :  [juge definite]  départ : ∫_{−∞}^{∞} α²e^(−α²/2) dα
    ? Comment la calculer ? ✔ Plancherel : ∫ |f(x)|² dx = ∫ |f̂(α)|² dα / ✔ Les résidus / · Plancherel : ∫ |f|² = 2π ∫ |f̂|²
    = 8(∫_{−∞}^{∞} x²e^(−2x²) dx)   ← Plancherel, puis isoler
    = √2√π   ← Valeur
  aides : Quelle fonction a pour transformée -iα e^(-α^2/4)/(2√2) ? C'est la ligne F9. | int(x^2 e^(-2x^2), x, -∞, ∞) = (1/8)int(α^2 e^(-α^2/2), α, -∞, ∞) | 8 int(x^2 e^(-2x^2), x, -∞, ∞)
  pièges : f_ft_norm, f_plancherel_factor

```

### Niveau 4

```
Calcule int(sin(α)^2/α^2, α, -∞, ∞) avec la formule de Plancherel, en partant de f(x) = 1 si |x| < 1, 0 sinon.Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [free, suivre l'erreur]  f(x) = H(1 − |x|)
    = f̂(α) = √(2/π)sin(α)/α   ← Ligne F1
  — ∫ f² = ∫ |f̂|² : à gauche, ∫ f(x)² dx :  [juge definite]  départ : ∫_{−1}^{1} 1 dx
    = 2   ← Valeur
  — L'intégrale demandée :  [juge definite]  départ : ∫_{−∞}^{∞} sin(α)²/α² dα
    ? Comment la calculer ? ✔ Plancherel : ∫ |f(x)|² dx = ∫ |f̂(α)|² dα / ✔ Les résidus / · Plancherel : ∫ |f|² = 2π ∫ |f̂|²
    = (π/2)(∫_{−1}^{1} 1 dx)   ← Plancherel, puis isoler
    = π   ← Valeur
  aides : Quelle fonction a pour transformée √(2/π) sin(α)/α ? C'est la ligne F1. | int(1, x, -1, 1) = int((2/π) sin(α)^2/α^2, α, -∞, ∞) | (π/2) int(1, x, -1, 1)
  pièges : f_ft_norm, f_plancherel_factor

Prouve la formule de Plancherel ∫ f² = ∫ |f̂|² à partir de la convolution f ∗ f̃ en 0 (f réelle, assez régulière) : touche les blocs dans l'ordre.
  [blocs order]
    1. Soit f réelle et f̃(x) = f(−x). Alors ℱ(f̃)(α) = f̂(α).
    2. Par la convolution, ℱ(f ∗ f̃) = √(2π) f̂ · f̂ = √(2π) |f̂|².
    3. (f ∗ f̃)(0) = ∫ f(t) f̃(0 − t) dt = ∫ f(t)² dt.
    4. Par inversion en x = 0 : (f ∗ f̃)(0) = (1/√(2π)) ∫ ℱ(f ∗ f̃)(α) dα = ∫ |f̂(α)|² dα.
    5. Donc ∫ f(x)² dx = ∫ |f̂(α)|² dα.
    ✗ Donc ∫ f(x)² dx = 2π ∫ |f̂(α)|² dα. [f_plancherel_factor]
    ✗ Par la convolution, ℱ(f ∗ f̃) = f̂ · f̂ = |f̂|². [f_sqrt2pi_conv]
  pièges : f_plancherel_factor, f_sqrt2pi_conv

Calcule int(sin(α)^2/α^2, α, -∞, ∞) avec la formule de Plancherel, en partant de f(x) = 1 si |x| < 1, 0 sinon.Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [free, suivre l'erreur]  f(x) = H(1 − |x|)
    = f̂(α) = √(2/π)sin(α)/α   ← Ligne F1
  — ∫ f² = ∫ |f̂|² : à gauche, ∫ f(x)² dx :  [juge definite]  départ : ∫_{−1}^{1} 1 dx
    = 2   ← Valeur
  — L'intégrale demandée :  [juge definite]  départ : ∫_{−∞}^{∞} sin(α)²/α² dα
    ? Comment la calculer ? ✔ Plancherel : ∫ |f(x)|² dx = ∫ |f̂(α)|² dα / ✔ Les résidus / · Plancherel : ∫ |f|² = 2π ∫ |f̂|²
    = (π/2)(∫_{−1}^{1} 1 dx)   ← Plancherel, puis isoler
    = π   ← Valeur
  aides : Quelle fonction a pour transformée √(2/π) sin(α)/α ? C'est la ligne F1. | int(1, x, -1, 1) = int((2/π) sin(α)^2/α^2, α, -∞, ∞) | (π/2) int(1, x, -1, 1)
  pièges : f_ft_norm, f_plancherel_factor

```

### Niveau 5

```
Calcule int(1/(α^2+4)^2, α, -∞, ∞) avec la formule de Plancherel, en partant de f(x) = e^(-2|x|).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [free, sans aide]  f(x) = e^(−2|x|)
    = f̂(α) = 2√(2/π)/(α² + 4)   ← Ligne F7
  — ∫ f² = ∫ |f̂|² : à gauche, ∫ f(x)² dx :  [juge definite]  départ : ∫_{−∞}^{∞} e^(−4|x|) dx
    = 2(∫_{0}^{∞} e^(−4x) dx)   ← Parité
    = 1/2   ← Valeur
  — L'intégrale demandée :  [juge definite]  départ : ∫_{−∞}^{∞} 1/(α² + 4)² dα
    ? Comment la calculer ? ✔ Plancherel : ∫ |f(x)|² dx = ∫ |f̂(α)|² dα / ✔ Les résidus / · Plancherel : ∫ |f|² = 2π ∫ |f̂|²
    = (π/4)(∫_{0}^{∞} e^(−4x) dx)   ← Plancherel, puis isoler
    = π/16   ← Valeur
  pièges : f_ft_norm, f_plancherel_factor

Calcule int(1/(α^2+9)^2, α, -∞, ∞) avec la formule de Plancherel, en partant de f(x) = e^(-3|x|).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [free, sans aide]  f(x) = e^(−3|x|)
    = f̂(α) = 3√(2/π)/(α² + 9)   ← Ligne F7
  — ∫ f² = ∫ |f̂|² : à gauche, ∫ f(x)² dx :  [juge definite]  départ : ∫_{−∞}^{∞} e^(−6|x|) dx
    = 2(∫_{0}^{∞} e^(−6x) dx)   ← Parité
    = 1/3   ← Valeur
  — L'intégrale demandée :  [juge definite]  départ : ∫_{−∞}^{∞} 1/(α² + 9)² dα
    ? Comment la calculer ? ✔ Plancherel : ∫ |f(x)|² dx = ∫ |f̂(α)|² dα / ✔ Les résidus / · Plancherel : ∫ |f|² = 2π ∫ |f̂|²
    = (π/9)(∫_{0}^{∞} e^(−6x) dx)   ← Plancherel, puis isoler
    = π/54   ← Valeur
  pièges : f_ft_norm, f_plancherel_factor

Prouve la formule de Plancherel ∫ f² = ∫ |f̂|² à partir de la convolution f ∗ f̃ en 0 (f réelle, assez régulière) : touche les blocs dans l'ordre.
  [blocs order, sans aide]
    1. Soit f réelle et f̃(x) = f(−x). Alors ℱ(f̃)(α) = f̂(α).
    2. Par la convolution, ℱ(f ∗ f̃) = √(2π) f̂ · f̂ = √(2π) |f̂|².
    3. (f ∗ f̃)(0) = ∫ f(t) f̃(0 − t) dt = ∫ f(t)² dt.
    4. Par inversion en x = 0 : (f ∗ f̃)(0) = (1/√(2π)) ∫ ℱ(f ∗ f̃)(α) dα = ∫ |f̂(α)|² dα.
    5. Donc ∫ f(x)² dx = ∫ |f̂(α)|² dα.
    ✗ Donc ∫ f(x)² dx = 2π ∫ |f̂(α)|² dα. [f_plancherel_factor]
    ✗ Par la convolution, ℱ(f ∗ f̃) = f̂ · f̂ = |f̂|². [f_sqrt2pi_conv]
  pièges : f_plancherel_factor, f_sqrt2pi_conv

```

### Variantes d'examen

```
Avec f(x) = 1 si |x| < 2, 0 sinon et la formule de Plancherel, cochez les égalités vraies.Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x) (plusieurs réponses possibles)
  · int(sin(2α)^2/α^2, α, -∞, ∞) = 4π^2 [f_plancherel_factor]   · int(sin(2α)^2/α^2, α, -∞, ∞) = 4 [f_parseval_square]   · int(sin(2α)^2/α^2, α, -∞, ∞) = 1 [f_plancherel_factor]   ✔ int(sin(2α)^2/α^2, α, -∞, ∞) = 2π   ✔ f̂(α) = √(2/π) sin(2α)/α
  [examen mcq]
  pièges : f_plancherel_factor, f_parseval_square

Calcule int(sin(α)^2/α^2, α, -∞, ∞) avec la formule de Plancherel, en partant de f(x) = 1 si |x| < 1, 0 sinon.Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [problème, examen open, 3 points]
  partie 1 (Début du problème : 1 ; ∫ f² = ∫ |f̂|² : à gauche, ∫ f(x)² dx : 1 ; L'intégrale demandée : 1)
    [free, sans aide, suivre l'erreur]  f(x) = H(1 − |x|)
      = f̂(α) = √(2/π)sin(α)/α   ← Ligne F1
    — ∫ f² = ∫ |f̂|² : à gauche, ∫ f(x)² dx :  [juge definite]  départ : ∫_{−1}^{1} 1 dx
      = 2   ← Valeur
    — L'intégrale demandée :  [juge definite]  départ : ∫_{−∞}^{∞} sin(α)²/α² dα
      ? Comment la calculer ? ✔ Plancherel : ∫ |f(x)|² dx = ∫ |f̂(α)|² dα / ✔ Les résidus / · Plancherel : ∫ |f|² = 2π ∫ |f̂|²
      = (π/2)(∫_{−1}^{1} 1 dx)   ← Plancherel, puis isoler
      = π   ← Valeur
  pièges : f_ft_norm, f_plancherel_factor

```

## EDO périodique par séries de Fourier (`f-periodic-ode`, BA4)

_Une EDO périodique : un coefficient cₙ à la fois._

### Niveau 1

```
Trouve la solution 2π-périodique u de u′(t) + u(t − π) = 1 + 2cos(3t) + 4sin(3t), en cherchant u = Σ cₙe^(int).
  [guided]  c_3
    (Coefficients de l'équation : P(n)·cₙ(u) = cₙ(f), P(n) = in + (−1)ⁿ.)
    (Les coefficients de f : cₘ = (aₘ − ibₘ)/2.)
    = (2 − 4i)/2   ← (aₘ − ibₘ)/2
    = □   (trous : 1 − 2i)
  — Coefficient par coefficient : P(n)·cₙ(u) = cₙ(f), avec P(n) = in + (−1)ⁿ.  [juge fcomplex]  départ : c_3
    = (1 − 2i)/(−1 + 3i)   ← c₃(f)/P(3)
    = −7/10 − i/10   ← Multiplier par le conjugué
  — Et le terme constant : c₀(u) = c₀(f)/P(0).  [juge fcomplex]  départ : c_0
    = □   (trous : 1)   ← 1/P(0)
  — La solution 2π-périodique, u = Σ cₙ(u)e^(int), écrite avec des fonctions réelles :  [juge fcomplex]  départ : 1 + (−7/10 − i/10)e^(3it) + (−7/10 + i/10)e^(−3it)
    = □   (trous : 1 − (7/5)cos(3t) + (1/5)sin(3t))   ← cₘe^(imt) + c₋ₘe^(−imt) = 2Re(cₘ)cos(mt) − 2Im(cₘ)sin(mt)
  aides : Le retard de π multiplie cₙ par e^(−inπ) = (−1)ⁿ. | (-1+3i)c₃(u) = 1 − 2i | c₃(u) = −7/10 − i/10
  pièges : f_coef_complex_convert

Trouve la solution 2π-périodique u de u′(t) + 2u(t − π) = 1 + cos(3t) + sin(3t), en cherchant u = Σ cₙe^(int).
  [guided]  c_3
    (Coefficients de l'équation : P(n)·cₙ(u) = cₙ(f), P(n) = in + 2(−1)ⁿ.)
    (Les coefficients de f : cₘ = (aₘ − ibₘ)/2.)
    = (1 − i)/2   ← (aₘ − ibₘ)/2
    = □   (trous : 1/2 − i/2)
  — Coefficient par coefficient : P(n)·cₙ(u) = cₙ(f), avec P(n) = in + 2(−1)ⁿ.  [juge fcomplex]  départ : c_3
    = (1/2 − i/2)/(−2 + 3i)   ← c₃(f)/P(3)
    = −5/26 − i/26   ← Multiplier par le conjugué
  — Et le terme constant : c₀(u) = c₀(f)/P(0).  [juge fcomplex]  départ : c_0
    = □   (trous : 1/2)   ← 1/P(0)
  — La solution 2π-périodique, u = Σ cₙ(u)e^(int), écrite avec des fonctions réelles :  [juge fcomplex]  départ : 1/2 + (−5/26 − i/26)e^(3it) + (−5/26 + i/26)e^(−3it)
    = □   (trous : 1/2 − (5/13)cos(3t) + (1/13)sin(3t))   ← cₘe^(imt) + c₋ₘe^(−imt) = 2Re(cₘ)cos(mt) − 2Im(cₘ)sin(mt)
  aides : Le retard de π multiplie cₙ par e^(−inπ) = (−1)ⁿ. | (-2+3i)c₃(u) = 1/2 − i/2 | c₃(u) = −5/26 − i/26
  pièges : f_coef_complex_convert

Trouve la solution 2π-périodique u de u″ + 8u = 1 + 2sin(6t), en cherchant u = Σ cₙe^(int).
  [guided]  c_6
    (Coefficients de l'équation : P(n)·cₙ(u) = cₙ(f), P(n) = 8 − n².)
    (Les coefficients de f : cₘ = (aₘ − ibₘ)/2.)
    = □   (trous : −i)   ← 2 sin = 2(e^(i…) − e^(−i…))/(2i)
  — Coefficient par coefficient : P(n)·cₙ(u) = cₙ(f), avec P(n) = 8 − n².  [juge fcomplex]  départ : c_6
    = (−i)/(−28)   ← c₆(f)/P(6)
    = i/28   ← Multiplier par le conjugué
  — Et le terme constant : c₀(u) = c₀(f)/P(0).  [juge fcomplex]  départ : c_0
    = □   (trous : 1/8)   ← 1/P(0)
  — La solution 2π-périodique, u = Σ cₙ(u)e^(int), écrite avec des fonctions réelles :  [juge fcomplex]  départ : 1/8 + (i/28)e^(6it) + (−i/28)e^(−6it)
    = □   (trous : 1/8 − (1/14)sin(6t))   ← cₘe^(imt) + c₋ₘe^(−imt) = 2Re(cₘ)cos(mt) − 2Im(cₘ)sin(mt)
  aides : Dériver multiplie cₙ par in. | (-28)c₆(u) = −i | c₆(u) = i/28
  pièges : f_coef_complex_convert

```

### Niveau 2

```
Trouve la solution 2π-périodique u de u″ + 5u = 1 + 4cos(2t), en cherchant u = Σ cₙe^(int).
  [guided]  c_2
    ? Les coefficients de u″ ? ✔ −n²·cₙ / · n²·cₙ
    (Les coefficients de f : cₘ = (aₘ − ibₘ)/2.)
    = □   (trous : 2)   ← 4 cos = 4(e^(i…) + e^(−i…))/2
  — Coefficient par coefficient : P(n)·cₙ(u) = cₙ(f), avec P(n) = 5 − n².  [juge fcomplex]  départ : c_2
    = □   (trous : 2)   ← Multiplier par le conjugué
  — Et le terme constant : c₀(u) = c₀(f)/P(0).  [juge fcomplex]  départ : c_0
    = □   (trous : 1/5)   ← 1/P(0)
  — La solution 2π-périodique, u = Σ cₙ(u)e^(int), écrite avec des fonctions réelles :  [juge fcomplex]  départ : 1/5 + 2e^(2it) + 2e^(−2it)
    = □   (trous : 1/5 + 4cos(2t))   ← cₘe^(imt) + c₋ₘe^(−imt) = 2Re(cₘ)cos(mt) − 2Im(cₘ)sin(mt)
  aides : Dériver multiplie cₙ par in. | (1)c₂(u) = 2 | c₂(u) = 2

Trouve la solution 2π-périodique u de u′ + u = 1 + cos(t) + 4sin(t), en cherchant u = Σ cₙe^(int).
  [guided]  c_1
    ? Les coefficients de u′ ? ✔ in·cₙ / · n·cₙ
    (Les coefficients de f : cₘ = (aₘ − ibₘ)/2.)
    = (1 − 4i)/2   ← (aₘ − ibₘ)/2
    = □   (trous : 1/2 − 2i)
  — Coefficient par coefficient : P(n)·cₙ(u) = cₙ(f), avec P(n) = in + 1.  [juge fcomplex]  départ : c_1
    = (1/2 − 2i)/(1 + i)   ← c₁(f)/P(1)
    = □   (trous : −3/4 − 5i/4)   ← Multiplier par le conjugué
  — Et le terme constant : c₀(u) = c₀(f)/P(0).  [juge fcomplex]  départ : c_0
    = □   (trous : 1)   ← 1/P(0)
  — La solution 2π-périodique, u = Σ cₙ(u)e^(int), écrite avec des fonctions réelles :  [juge fcomplex]  départ : 1 + (−3/4 − 5i/4)e^(it) + (−3/4 + 5i/4)e^(−it)
    = □   (trous : 1 − (3/2)cos(t) + (5/2)sin(t))   ← cₘe^(imt) + c₋ₘe^(−imt) = 2Re(cₘ)cos(mt) − 2Im(cₘ)sin(mt)
  aides : Dériver multiplie cₙ par in. | (1+i)c₁(u) = 1/2 − 2i | c₁(u) = −3/4 − 5i/4
  pièges : f_coef_complex_convert

Trouve la solution 2π-périodique u de u″ + 8u = 2 + cos(3t) + sin(3t), en cherchant u = Σ cₙe^(int).
  [guided]  c_3
    ? Les coefficients de u″ ? ✔ −n²·cₙ / · n²·cₙ
    (Les coefficients de f : cₘ = (aₘ − ibₘ)/2.)
    = (1 − i)/2   ← (aₘ − ibₘ)/2
    = □   (trous : 1/2 − i/2)
  — Coefficient par coefficient : P(n)·cₙ(u) = cₙ(f), avec P(n) = 8 − n².  [juge fcomplex]  départ : c_3
    = (1/2 − i/2)/(−1)   ← c₃(f)/P(3)
    = □   (trous : −1/2 + i/2)   ← Multiplier par le conjugué
  — Et le terme constant : c₀(u) = c₀(f)/P(0).  [juge fcomplex]  départ : c_0
    = □   (trous : 1/4)   ← 2/P(0)
  — La solution 2π-périodique, u = Σ cₙ(u)e^(int), écrite avec des fonctions réelles :  [juge fcomplex]  départ : 1/4 + (−1/2 + i/2)e^(3it) + (−1/2 − i/2)e^(−3it)
    = □   (trous : 1/4 − cos(3t) − sin(3t))   ← cₘe^(imt) + c₋ₘe^(−imt) = 2Re(cₘ)cos(mt) − 2Im(cₘ)sin(mt)
  aides : Dériver multiplie cₙ par in. | (-1)c₃(u) = 1/2 − i/2 | c₃(u) = −1/2 + i/2
  pièges : f_coef_complex_convert

```

### Niveau 3

```
Trouve la solution 2π-périodique u de u′ + 2u = 4cos(t) + sin(t), en cherchant u = Σ cₙe^(int).
  [tap, suivre l'erreur, menu steps]  c_1
    ? Quelle forme pour u ? ✔ Complexe : u = Σ cₙe^(int), un coefficient à la fois / ✔ Réelle : u = a₀/2 + Σ (aₙcos(nt) + bₙsin(nt))
    ? Les coefficients de u′ ? ✔ in·cₙ / · n·cₙ
    (Les coefficients de f : cₘ = (aₘ − ibₘ)/2.)
    = (4 − i)/2   ← (aₘ − ibₘ)/2
    = 2 − i/2
  — Coefficient par coefficient : P(n)·cₙ(u) = cₙ(f), avec P(n) = in + 2.  [juge fcomplex]  départ : c_1
    = (2 − i/2)/(2 + i)   ← c₁(f)/P(1)
    = 7/10 − 3i/5   ← Multiplier par le conjugué
  — La solution 2π-périodique, u = Σ cₙ(u)e^(int), écrite avec des fonctions réelles :  [juge fcomplex]  départ : (7/10 − 3i/5)e^(it) + (7/10 + 3i/5)e^(−it)
    = (7/5)cos(t) + (6/5)sin(t)   ← cₘe^(imt) + c₋ₘe^(−imt) = 2Re(cₘ)cos(mt) − 2Im(cₘ)sin(mt)
  aides : Dériver multiplie cₙ par in. | (2+i)c₁(u) = 2 − i/2 | c₁(u) = 7/10 − 3i/5
  pièges : f_coef_complex_convert

Trouve la solution 2π-périodique u de u′(t) + u(t − π) = 2 + 2sin(3t), en cherchant u = Σ cₙe^(int).
  [tap, suivre l'erreur, menu steps]  c_3
    ? Quelle forme pour u ? ✔ Complexe : u = Σ cₙe^(int), un coefficient à la fois / ✔ Réelle : u = a₀/2 + Σ (aₙcos(nt) + bₙsin(nt))
    ? Les coefficients de u(t − π) ? ✔ e^(−inπ)cₙ = (−1)ⁿcₙ / · cₙ : décaler ne change pas les coefficients / · −cₙ
    (Les coefficients de f : cₘ = (aₘ − ibₘ)/2.)
    = −i   ← 2 sin = 2(e^(i…) − e^(−i…))/(2i)
  — Coefficient par coefficient : P(n)·cₙ(u) = cₙ(f), avec P(n) = in + (−1)ⁿ.  [juge fcomplex]  départ : c_3
    = (−i)/(−1 + 3i)   ← c₃(f)/P(3)
    = −3/10 + i/10   ← Multiplier par le conjugué
  — Et le terme constant : c₀(u) = c₀(f)/P(0).  [juge fcomplex]  départ : c_0
    = 2   ← 2/P(0)
  — La solution 2π-périodique, u = Σ cₙ(u)e^(int), écrite avec des fonctions réelles :  [juge fcomplex]  départ : 2 + (−3/10 + i/10)e^(3it) + (−3/10 − i/10)e^(−3it)
    = 2 − (3/5)cos(3t) − (1/5)sin(3t)   ← cₘe^(imt) + c₋ₘe^(−imt) = 2Re(cₘ)cos(mt) − 2Im(cₘ)sin(mt)
  aides : Le retard de π multiplie cₙ par e^(−inπ) = (−1)ⁿ. | (-1+3i)c₃(u) = −i | c₃(u) = −3/10 + i/10
  pièges : f_coef_complex_convert, f_ode_shift_phase

Trouve la solution 2π-périodique u de u′ + 3u = cos(6t) + sin(6t), en cherchant u = Σ cₙe^(int).
  [tap, suivre l'erreur, menu steps]  c_6
    ? Quelle forme pour u ? ✔ Complexe : u = Σ cₙe^(int), un coefficient à la fois / ✔ Réelle : u = a₀/2 + Σ (aₙcos(nt) + bₙsin(nt))
    ? Les coefficients de u′ ? ✔ in·cₙ / · n·cₙ
    (Les coefficients de f : cₘ = (aₘ − ibₘ)/2.)
    = (1 − i)/2   ← (aₘ − ibₘ)/2
    = 1/2 − i/2
  — Coefficient par coefficient : P(n)·cₙ(u) = cₙ(f), avec P(n) = in + 3.  [juge fcomplex]  départ : c_6
    = (1/2 − i/2)/(3 + 6i)   ← c₆(f)/P(6)
    = −1/30 − i/10   ← Multiplier par le conjugué
  — La solution 2π-périodique, u = Σ cₙ(u)e^(int), écrite avec des fonctions réelles :  [juge fcomplex]  départ : (−1/30 − i/10)e^(6it) + (−1/30 + i/10)e^(−6it)
    = −(1/15)cos(6t) + (1/5)sin(6t)   ← cₘe^(imt) + c₋ₘe^(−imt) = 2Re(cₘ)cos(mt) − 2Im(cₘ)sin(mt)
  aides : Dériver multiplie cₙ par in. | (3+6i)c₆(u) = 1/2 − i/2 | c₆(u) = −1/30 − i/10
  pièges : f_coef_complex_convert

```

### Niveau 4

```
Trouve la solution 2π-périodique u de u′(t) + u(t − π) = 2 + cos(3t), en cherchant u = Σ cₙe^(int).
  [free, suivre l'erreur]  c_3
    ? Les coefficients de u(t − π) ? ✔ e^(−inπ)cₙ = (−1)ⁿcₙ / · cₙ : décaler ne change pas les coefficients / · −cₙ
    (Les coefficients de f : cₘ = (aₘ − ibₘ)/2.)
    = 1/2   ← 1 cos = 1(e^(i…) + e^(−i…))/2
  — Coefficient par coefficient : P(n)·cₙ(u) = cₙ(f), avec P(n) = in + (−1)ⁿ.  [juge fcomplex]  départ : c_3
    = (1/2)/(−1 + 3i)   ← c₃(f)/P(3)
    = −1/20 − 3i/20   ← Multiplier par le conjugué
  — Et le terme constant : c₀(u) = c₀(f)/P(0).  [juge fcomplex]  départ : c_0
    = 2   ← 2/P(0)
  — La solution 2π-périodique, u = Σ cₙ(u)e^(int), écrite avec des fonctions réelles :  [juge fcomplex]  départ : 2 + (−1/20 − 3i/20)e^(3it) + (−1/20 + 3i/20)e^(−3it)
    = 2 − (1/10)cos(3t) + (3/10)sin(3t)   ← cₘe^(imt) + c₋ₘe^(−imt) = 2Re(cₘ)cos(mt) − 2Im(cₘ)sin(mt)
  aides : Le retard de π multiplie cₙ par e^(−inπ) = (−1)ⁿ. | (-1+3i)c₃(u) = 1/2 | c₃(u) = −1/20 − 3i/20
  pièges : f_ode_shift_phase

Trouve la solution 2π-périodique u de u″ + 2u = 2 + 2cos(t) + 4sin(t), en cherchant u = Σ cₙe^(int).
  [free, suivre l'erreur]  c_1
    ? Les coefficients de u″ ? ✔ −n²·cₙ / · n²·cₙ
    (Les coefficients de f : cₘ = (aₘ − ibₘ)/2.)
    = (2 − 4i)/2   ← (aₘ − ibₘ)/2
    = 1 − 2i
  — Coefficient par coefficient : P(n)·cₙ(u) = cₙ(f), avec P(n) = 2 − n².  [juge fcomplex]  départ : c_1
    = (1 − 2i)/1   ← c₁(f)/P(1)
    = 1 − 2i   ← Multiplier par le conjugué
  — Et le terme constant : c₀(u) = c₀(f)/P(0).  [juge fcomplex]  départ : c_0
    = 1   ← 2/P(0)
  — La solution 2π-périodique, u = Σ cₙ(u)e^(int), écrite avec des fonctions réelles :  [juge fcomplex]  départ : 1 + (1 − 2i)e^(it) + (1 + 2i)e^(−it)
    = 1 + 2cos(t) + 4sin(t)   ← cₘe^(imt) + c₋ₘe^(−imt) = 2Re(cₘ)cos(mt) − 2Im(cₘ)sin(mt)
  aides : Dériver multiplie cₙ par in. | (1)c₁(u) = 1 − 2i | c₁(u) = 1 − 2i
  pièges : f_coef_complex_convert

Trouve la solution 2π-périodique u de u″ + 3u = 2cos(3t) + 4sin(3t), en cherchant u = Σ cₙe^(int).
  [free, suivre l'erreur]  c_3
    ? Les coefficients de u″ ? ✔ −n²·cₙ / · n²·cₙ
    (Les coefficients de f : cₘ = (aₘ − ibₘ)/2.)
    = (2 − 4i)/2   ← (aₘ − ibₘ)/2
    = 1 − 2i
  — Coefficient par coefficient : P(n)·cₙ(u) = cₙ(f), avec P(n) = 3 − n².  [juge fcomplex]  départ : c_3
    = (1 − 2i)/(−6)   ← c₃(f)/P(3)
    = −1/6 + i/3   ← Multiplier par le conjugué
  — La solution 2π-périodique, u = Σ cₙ(u)e^(int), écrite avec des fonctions réelles :  [juge fcomplex]  départ : (−1/6 + i/3)e^(3it) + (−1/6 − i/3)e^(−3it)
    = −(1/3)cos(3t) − (2/3)sin(3t)   ← cₘe^(imt) + c₋ₘe^(−imt) = 2Re(cₘ)cos(mt) − 2Im(cₘ)sin(mt)
  aides : Dériver multiplie cₙ par in. | (-6)c₃(u) = 1 − 2i | c₃(u) = −1/6 + i/3
  pièges : f_coef_complex_convert

```

### Niveau 5

```
Trouve la solution 2π-périodique u de u′(t) + 3u(t − π) = 2 + 2sin(3t), en cherchant u = Σ cₙe^(int).
  [free, sans aide]  c_3
    ? Les coefficients de u(t − π) ? ✔ e^(−inπ)cₙ = (−1)ⁿcₙ / · cₙ : décaler ne change pas les coefficients / · −cₙ
    (Les coefficients de f : cₘ = (aₘ − ibₘ)/2.)
    = −i   ← 2 sin = 2(e^(i…) − e^(−i…))/(2i)
  — Coefficient par coefficient : P(n)·cₙ(u) = cₙ(f), avec P(n) = in + 3(−1)ⁿ.  [juge fcomplex]  départ : c_3
    = (−i)/(−3 + 3i)   ← c₃(f)/P(3)
    = −1/6 + i/6   ← Multiplier par le conjugué
  — Et le terme constant : c₀(u) = c₀(f)/P(0).  [juge fcomplex]  départ : c_0
    = 2/3   ← 2/P(0)
  — La solution 2π-périodique, u = Σ cₙ(u)e^(int), écrite avec des fonctions réelles :  [juge fcomplex]  départ : 2/3 + (−1/6 + i/6)e^(3it) + (−1/6 − i/6)e^(−3it)
    = 2/3 − (1/3)cos(3t) − (1/3)sin(3t)   ← cₘe^(imt) + c₋ₘe^(−imt) = 2Re(cₘ)cos(mt) − 2Im(cₘ)sin(mt)
  pièges : f_coef_complex_convert, f_ode_shift_phase

Trouve la solution 2π-périodique u de u″ + 8u = 2cos(t) + sin(t), en cherchant u = Σ cₙe^(int).
  [free, sans aide]  c_1
    ? Les coefficients de u″ ? ✔ −n²·cₙ / · n²·cₙ
    (Les coefficients de f : cₘ = (aₘ − ibₘ)/2.)
    = (2 − i)/2   ← (aₘ − ibₘ)/2
    = 1 − i/2
  — Coefficient par coefficient : P(n)·cₙ(u) = cₙ(f), avec P(n) = 8 − n².  [juge fcomplex]  départ : c_1
    = (1 − i/2)/7   ← c₁(f)/P(1)
    = 1/7 − i/14   ← Multiplier par le conjugué
  — La solution 2π-périodique, u = Σ cₙ(u)e^(int), écrite avec des fonctions réelles :  [juge fcomplex]  départ : (1/7 − i/14)e^(it) + (1/7 + i/14)e^(−it)
    = (2/7)cos(t) + (1/7)sin(t)   ← cₘe^(imt) + c₋ₘe^(−imt) = 2Re(cₘ)cos(mt) − 2Im(cₘ)sin(mt)
  pièges : f_coef_complex_convert

Trouve la solution 2π-périodique u de u″ + 8u = 2 + 4cos(2t) + 4sin(2t), en cherchant u = Σ cₙe^(int).
  [free, sans aide]  c_2
    ? Les coefficients de u″ ? ✔ −n²·cₙ / · n²·cₙ
    (Les coefficients de f : cₘ = (aₘ − ibₘ)/2.)
    = (4 − 4i)/2   ← (aₘ − ibₘ)/2
    = 2 − 2i
  — Coefficient par coefficient : P(n)·cₙ(u) = cₙ(f), avec P(n) = 8 − n².  [juge fcomplex]  départ : c_2
    = (2 − 2i)/4   ← c₂(f)/P(2)
    = 1/2 − i/2   ← Multiplier par le conjugué
  — Et le terme constant : c₀(u) = c₀(f)/P(0).  [juge fcomplex]  départ : c_0
    = 1/4   ← 2/P(0)
  — La solution 2π-périodique, u = Σ cₙ(u)e^(int), écrite avec des fonctions réelles :  [juge fcomplex]  départ : 1/4 + (1/2 − i/2)e^(2it) + (1/2 + i/2)e^(−2it)
    = 1/4 + cos(2t) + sin(2t)   ← cₘe^(imt) + c₋ₘe^(−imt) = 2Re(cₘ)cos(mt) − 2Im(cₘ)sin(mt)
  pièges : f_coef_complex_convert

```

### Variantes d'examen

```
Trouve la solution 2π-périodique u de u′(t) + 2u(t − π) = 1 + 2cos(t) + 2sin(t), en cherchant u = Σ cₙe^(int).
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 1 ; Coefficient par coefficient : P(n)·cₙ(u) = cₙ(f), avec P(n) = in + 2(−1)ⁿ. : 1 ; Et le terme constant : c₀(u) = c₀(f)/P(0). : 1 ; La solution 2π-périodique, u = Σ cₙ(u)e^(int), écrite avec des fonctions réelles : 1)
    [free, sans aide, suivre l'erreur, examen open]  c_1
      (Les coefficients de f : cₘ = (aₘ − ibₘ)/2.)
      = (2 − 2i)/2   ← (aₘ − ibₘ)/2
      = 1 − i
    — Coefficient par coefficient : P(n)·cₙ(u) = cₙ(f), avec P(n) = in + 2(−1)ⁿ.  [juge fcomplex]  départ : c_1
      = (1 − i)/(−2 + i)   ← c₁(f)/P(1)
      = −3/5 + i/5   ← Multiplier par le conjugué
    — Et le terme constant : c₀(u) = c₀(f)/P(0).  [juge fcomplex]  départ : c_0
      = 1/2   ← 1/P(0)
    — La solution 2π-périodique, u = Σ cₙ(u)e^(int), écrite avec des fonctions réelles :  [juge fcomplex]  départ : 1/2 + (−3/5 + i/5)e^(it) + (−3/5 − i/5)e^(−it)
      = 1/2 − (6/5)cos(t) − (2/5)sin(t)   ← cₘe^(imt) + c₋ₘe^(−imt) = 2Re(cₘ)cos(mt) − 2Im(cₘ)sin(mt)
  pièges : f_coef_complex_convert

```

## Problème de Sturm-Liouville (GM) (`f-sturm-liouville`, BA4)

_−u″ = λu avec des conditions aux bords : λ < 0, λ = 0, puis λ = k² > 0._

### Niveau 1

```
Problème de Sturm-Liouville : trouve les λ et les u ≠ 0 tels que −u″ = λu sur ]0 ; π[, u′(0) = 0, u(π) = 0.
  [guided]  λ_n
    (λ = −μ² < 0 : u = A ch(μx) + B sh(μx). Les conditions aux bords donnent ? u = 0 : pas de valeur propre négative.)
    (λ = 0 : u = A + Bx. Les conditions aux bords donnent ? A = B = 0 : λ = 0 n'est pas valeur propre.)
    (λ = k² > 0 : quelle solution générale de u″ + k²u = 0 ? u = A cos(kx) + B sin(kx).)
    (u′(0) = 0 donne B = 0. Puis u(π) = A cos(kπ) = 0 ; comme u ≠ 0 : cos(kπ) = 0 : k = (n + ½).)
    (Les valeurs propres :)
    = (n + 1/2)²   ← λₙ = kₙ²
  — Les fonctions propres :  [juge eigen]  départ : u_n
    = cos((n + 1/2)x)
  aides : Trois cas selon le signe de λ ; seul λ = k² > 0 donne des cos et des sin. | cos(kπ) = 0 ⟹ k = … | λₙ = (n + 1/2)², uₙ = cos((n + 1/2)x)

Problème de Sturm-Liouville : trouve les λ et les u ≠ 0 tels que −u″ = λu sur ]0 ; π[, u′(0) = 0, u(π) = 0.
  [guided]  λ_n
    (λ = −μ² < 0 : u = A ch(μx) + B sh(μx). Les conditions aux bords donnent ? u = 0 : pas de valeur propre négative.)
    (λ = 0 : u = A + Bx. Les conditions aux bords donnent ? A = B = 0 : λ = 0 n'est pas valeur propre.)
    (λ = k² > 0 : quelle solution générale de u″ + k²u = 0 ? u = A cos(kx) + B sin(kx).)
    (u′(0) = 0 donne B = 0. Puis u(π) = A cos(kπ) = 0 ; comme u ≠ 0 : cos(kπ) = 0 : k = (n + ½).)
    (Les valeurs propres :)
    = (n + 1/2)²   ← λₙ = kₙ²
  — Les fonctions propres :  [juge eigen]  départ : u_n
    = cos((n + 1/2)x)
  aides : Trois cas selon le signe de λ ; seul λ = k² > 0 donne des cos et des sin. | cos(kπ) = 0 ⟹ k = … | λₙ = (n + 1/2)², uₙ = cos((n + 1/2)x)

Problème de Sturm-Liouville : trouve les λ et les u ≠ 0 tels que −u″ = λu sur ]0 ; π[, u(0) = 0, u(π) = 0.
  [guided]  λ_n
    (λ = −μ² < 0 : u = A ch(μx) + B sh(μx). Les conditions aux bords donnent ? u = 0 : pas de valeur propre négative.)
    (λ = 0 : u = A + Bx. Les conditions aux bords donnent ? A = B = 0 : λ = 0 n'est pas valeur propre.)
    (λ = k² > 0 : quelle solution générale de u″ + k²u = 0 ? u = A cos(kx) + B sin(kx).)
    (u(0) = 0 donne A = 0. Puis u(π) = B sin(kπ) = 0 ; comme u ≠ 0 : sin(kπ) = 0 : k = n.)
    (Les valeurs propres :)
    = n²   ← λₙ = kₙ²
  — Les fonctions propres :  [juge eigen]  départ : u_n
    = sin(nx)
  aides : Trois cas selon le signe de λ ; seul λ = k² > 0 donne des cos et des sin. | sin(kπ) = 0 ⟹ k = … | λₙ = n², uₙ = sin(nx)

```

### Niveau 2

```
Problème de Sturm-Liouville : trouve les λ et les u ≠ 0 tels que −u″ = λu sur ]0 ; π[, u′(0) = 0, u′(π) = 0.
  [guided]  λ_n
    ? λ = −μ² < 0 : u = A ch(μx) + B sh(μx). Les conditions aux bords donnent ? ✔ u = 0 : pas de valeur propre négative / · Une solution u ≠ 0
    ? λ = 0 : u = A + Bx. Les conditions aux bords donnent ? ✔ u = A (constante) convient : λ₀ = 0 est valeur propre, u₀ = 1 / · A = B = 0 : λ = 0 n'est pas valeur propre
    ? λ = k² > 0 : quelle solution générale de u″ + k²u = 0 ? ✔ u = A cos(kx) + B sin(kx) / · u = A e^(kx) + B e^(−kx) / · u = (A + Bx)e^(kx)
    ? u′(0) = 0 donne B = 0. Puis u′(π) = −Ak sin(kπ) = 0 ; comme u ≠ 0 : ✔ sin(kπ) = 0 : k = n / · cos(kπ) = 0 / · Le coefficient restant est nul
    (Les valeurs propres :)
    = n²   ← λₙ = kₙ²
  — Les fonctions propres :  [juge eigen]  départ : u_n
    = cos(nx)
  aides : Trois cas selon le signe de λ ; seul λ = k² > 0 donne des cos et des sin. | sin(kπ) = 0 ⟹ k = … | λₙ = n², uₙ = cos(nx)
  pièges : f_sl_eigen_zero

Problème de Sturm-Liouville : trouve les λ et les u ≠ 0 tels que −u″ = λu sur ]0 ; π[, u′(0) = 0, u(π) = 0.
  [guided]  λ_n
    ? λ = −μ² < 0 : u = A ch(μx) + B sh(μx). Les conditions aux bords donnent ? ✔ u = 0 : pas de valeur propre négative / · Une solution u ≠ 0
    ? λ = 0 : u = A + Bx. Les conditions aux bords donnent ? ✔ A = B = 0 : λ = 0 n'est pas valeur propre / · λ = 0 est valeur propre
    ? λ = k² > 0 : quelle solution générale de u″ + k²u = 0 ? ✔ u = A cos(kx) + B sin(kx) / · u = A e^(kx) + B e^(−kx) / · u = (A + Bx)e^(kx)
    ? u′(0) = 0 donne B = 0. Puis u(π) = A cos(kπ) = 0 ; comme u ≠ 0 : ✔ cos(kπ) = 0 : k = (n + ½) / · sin(kπ) = 0 / · Le coefficient restant est nul
    (Les valeurs propres :)
    = (n + 1/2)²   ← λₙ = kₙ²
  — Les fonctions propres :  [juge eigen]  départ : u_n
    = cos((n + 1/2)x)
  aides : Trois cas selon le signe de λ ; seul λ = k² > 0 donne des cos et des sin. | cos(kπ) = 0 ⟹ k = … | λₙ = (n + 1/2)², uₙ = cos((n + 1/2)x)
  pièges : f_sl_eigen_zero

Problème de Sturm-Liouville : trouve les λ et les u ≠ 0 tels que −u″ = λu sur ]0 ; π[, u′(0) = 0, u(π) = 0.
  [guided]  λ_n
    ? λ = −μ² < 0 : u = A ch(μx) + B sh(μx). Les conditions aux bords donnent ? ✔ u = 0 : pas de valeur propre négative / · Une solution u ≠ 0
    ? λ = 0 : u = A + Bx. Les conditions aux bords donnent ? ✔ A = B = 0 : λ = 0 n'est pas valeur propre / · λ = 0 est valeur propre
    ? λ = k² > 0 : quelle solution générale de u″ + k²u = 0 ? ✔ u = A cos(kx) + B sin(kx) / · u = A e^(kx) + B e^(−kx) / · u = (A + Bx)e^(kx)
    ? u′(0) = 0 donne B = 0. Puis u(π) = A cos(kπ) = 0 ; comme u ≠ 0 : ✔ cos(kπ) = 0 : k = (n + ½) / · sin(kπ) = 0 / · Le coefficient restant est nul
    (Les valeurs propres :)
    = (n + 1/2)²   ← λₙ = kₙ²
  — Les fonctions propres :  [juge eigen]  départ : u_n
    = cos((n + 1/2)x)
  aides : Trois cas selon le signe de λ ; seul λ = k² > 0 donne des cos et des sin. | cos(kπ) = 0 ⟹ k = … | λₙ = (n + 1/2)², uₙ = cos((n + 1/2)x)
  pièges : f_sl_eigen_zero

```

### Niveau 3

```
Problème de Sturm-Liouville : trouve les λ et les u ≠ 0 tels que −u″ = λu sur ]0 ; π[, u(0) = 0, u′(π) = 0.
  [tap, suivre l'erreur, menu steps]  λ_n
    ? λ = −μ² < 0 : u = A ch(μx) + B sh(μx). Les conditions aux bords donnent ? ✔ u = 0 : pas de valeur propre négative / · Une solution u ≠ 0
    ? λ = 0 : u = A + Bx. Les conditions aux bords donnent ? ✔ A = B = 0 : λ = 0 n'est pas valeur propre / · λ = 0 est valeur propre
    ? λ = k² > 0 : quelle solution générale de u″ + k²u = 0 ? ✔ u = A cos(kx) + B sin(kx) / · u = A e^(kx) + B e^(−kx) / · u = (A + Bx)e^(kx)
    ? u(0) = 0 donne A = 0. Puis u′(π) = Bk cos(kπ) = 0 ; comme u ≠ 0 : ✔ cos(kπ) = 0 : k = (n + ½) / · sin(kπ) = 0 / · Le coefficient restant est nul
    ? n parcourt : ✔ n ≥ 0 / · n ≥ 1
    (Les valeurs propres :)
    = (n + 1/2)²   ← λₙ = kₙ²
  — Les fonctions propres :  [juge eigen]  départ : u_n
    = sin((n + 1/2)x)
  aides : Trois cas selon le signe de λ ; seul λ = k² > 0 donne des cos et des sin. | cos(kπ) = 0 ⟹ k = … | λₙ = (n + 1/2)², uₙ = sin((n + 1/2)x)
  pièges : f_sl_eigen_zero

Problème de Sturm-Liouville : trouve les λ et les u ≠ 0 tels que −u″ = λu sur ]0 ; π[, u′(0) = 0, u′(π) = 0.
  [tap, suivre l'erreur, menu steps]  λ_n
    ? λ = −μ² < 0 : u = A ch(μx) + B sh(μx). Les conditions aux bords donnent ? ✔ u = 0 : pas de valeur propre négative / · Une solution u ≠ 0
    ? λ = 0 : u = A + Bx. Les conditions aux bords donnent ? ✔ u = A (constante) convient : λ₀ = 0 est valeur propre, u₀ = 1 / · A = B = 0 : λ = 0 n'est pas valeur propre
    ? λ = k² > 0 : quelle solution générale de u″ + k²u = 0 ? ✔ u = A cos(kx) + B sin(kx) / · u = A e^(kx) + B e^(−kx) / · u = (A + Bx)e^(kx)
    ? u′(0) = 0 donne B = 0. Puis u′(π) = −Ak sin(kπ) = 0 ; comme u ≠ 0 : ✔ sin(kπ) = 0 : k = n / · cos(kπ) = 0 / · Le coefficient restant est nul
    ? n parcourt : ✔ n ≥ 0 / · n ≥ 1
    (Les valeurs propres :)
    = n²   ← λₙ = kₙ²
  — Les fonctions propres :  [juge eigen]  départ : u_n
    = cos(nx)
  aides : Trois cas selon le signe de λ ; seul λ = k² > 0 donne des cos et des sin. | sin(kπ) = 0 ⟹ k = … | λₙ = n², uₙ = cos(nx)
  pièges : f_sl_eigen_zero

Problème de Sturm-Liouville : trouve les λ et les u ≠ 0 tels que −u″ = λu sur ]0 ; π[, u(0) = 0, u(π) = 0.
  [tap, suivre l'erreur, menu steps]  λ_n
    ? λ = −μ² < 0 : u = A ch(μx) + B sh(μx). Les conditions aux bords donnent ? ✔ u = 0 : pas de valeur propre négative / · Une solution u ≠ 0
    ? λ = 0 : u = A + Bx. Les conditions aux bords donnent ? ✔ A = B = 0 : λ = 0 n'est pas valeur propre / · λ = 0 est valeur propre
    ? λ = k² > 0 : quelle solution générale de u″ + k²u = 0 ? ✔ u = A cos(kx) + B sin(kx) / · u = A e^(kx) + B e^(−kx) / · u = (A + Bx)e^(kx)
    ? u(0) = 0 donne A = 0. Puis u(π) = B sin(kπ) = 0 ; comme u ≠ 0 : ✔ sin(kπ) = 0 : k = n / · cos(kπ) = 0 / · Le coefficient restant est nul
    ? n parcourt : ✔ n ≥ 1 / · n ≥ 0
    (Les valeurs propres :)
    = n²   ← λₙ = kₙ²
  — Les fonctions propres :  [juge eigen]  départ : u_n
    = sin(nx)
  aides : Trois cas selon le signe de λ ; seul λ = k² > 0 donne des cos et des sin. | sin(kπ) = 0 ⟹ k = … | λₙ = n², uₙ = sin(nx)
  pièges : f_sl_eigen_zero

```

### Niveau 4

```
Problème de Sturm-Liouville : trouve les λ et les u ≠ 0 tels que −u″ = λu sur ]0 ; π[, u(0) = 0, u′(π) = 0.
  [free, suivre l'erreur]  λ_n
    ? λ = −μ² < 0 : u = A ch(μx) + B sh(μx). Les conditions aux bords donnent ? ✔ u = 0 : pas de valeur propre négative / · Une solution u ≠ 0
    ? λ = 0 : u = A + Bx. Les conditions aux bords donnent ? ✔ A = B = 0 : λ = 0 n'est pas valeur propre / · λ = 0 est valeur propre
    ? λ = k² > 0 : quelle solution générale de u″ + k²u = 0 ? ✔ u = A cos(kx) + B sin(kx) / · u = A e^(kx) + B e^(−kx) / · u = (A + Bx)e^(kx)
    ? u(0) = 0 donne A = 0. Puis u′(π) = Bk cos(kπ) = 0 ; comme u ≠ 0 : ✔ cos(kπ) = 0 : k = (n + ½) / · sin(kπ) = 0 / · Le coefficient restant est nul
    ? n parcourt : ✔ n ≥ 0 / · n ≥ 1
    (Les valeurs propres :)
    = (n + 1/2)²   ← λₙ = kₙ²
  — Les fonctions propres :  [juge eigen]  départ : u_n
    = sin((n + 1/2)x)
  aides : Trois cas selon le signe de λ ; seul λ = k² > 0 donne des cos et des sin. | cos(kπ) = 0 ⟹ k = … | λₙ = (n + 1/2)², uₙ = sin((n + 1/2)x)
  pièges : f_sl_eigen_zero

Problème de Sturm-Liouville : trouve les λ et les u ≠ 0 tels que −u″ = λu sur ]0 ; π[, u′(0) = 0, u′(π) = 0.
  [free, suivre l'erreur]  λ_n
    ? λ = −μ² < 0 : u = A ch(μx) + B sh(μx). Les conditions aux bords donnent ? ✔ u = 0 : pas de valeur propre négative / · Une solution u ≠ 0
    ? λ = 0 : u = A + Bx. Les conditions aux bords donnent ? ✔ u = A (constante) convient : λ₀ = 0 est valeur propre, u₀ = 1 / · A = B = 0 : λ = 0 n'est pas valeur propre
    ? λ = k² > 0 : quelle solution générale de u″ + k²u = 0 ? ✔ u = A cos(kx) + B sin(kx) / · u = A e^(kx) + B e^(−kx) / · u = (A + Bx)e^(kx)
    ? u′(0) = 0 donne B = 0. Puis u′(π) = −Ak sin(kπ) = 0 ; comme u ≠ 0 : ✔ sin(kπ) = 0 : k = n / · cos(kπ) = 0 / · Le coefficient restant est nul
    ? n parcourt : ✔ n ≥ 0 / · n ≥ 1
    (Les valeurs propres :)
    = n²   ← λₙ = kₙ²
  — Les fonctions propres :  [juge eigen]  départ : u_n
    = cos(nx)
  aides : Trois cas selon le signe de λ ; seul λ = k² > 0 donne des cos et des sin. | sin(kπ) = 0 ⟹ k = … | λₙ = n², uₙ = cos(nx)
  pièges : f_sl_eigen_zero

Problème de Sturm-Liouville : trouve les λ et les u ≠ 0 tels que −u″ = λu sur ]0 ; 1[, u(0) = 0, u(1) = 0.
  [free, suivre l'erreur]  λ_n
    ? λ = −μ² < 0 : u = A ch(μx) + B sh(μx). Les conditions aux bords donnent ? ✔ u = 0 : pas de valeur propre négative / · Une solution u ≠ 0
    ? λ = 0 : u = A + Bx. Les conditions aux bords donnent ? ✔ A = B = 0 : λ = 0 n'est pas valeur propre / · λ = 0 est valeur propre
    ? λ = k² > 0 : quelle solution générale de u″ + k²u = 0 ? ✔ u = A cos(kx) + B sin(kx) / · u = A e^(kx) + B e^(−kx) / · u = (A + Bx)e^(kx)
    ? u(0) = 0 donne A = 0. Puis u(1) = B sin(k1) = 0 ; comme u ≠ 0 : ✔ sin(k1) = 0 : k = nπ/1 / · cos(k1) = 0 / · Le coefficient restant est nul
    ? n parcourt : ✔ n ≥ 1 / · n ≥ 0
    (Les valeurs propres :)
    = (nπ)²   ← λₙ = kₙ²
  — Les fonctions propres :  [juge eigen]  départ : u_n
    = sin(nπx)
  aides : Trois cas selon le signe de λ ; seul λ = k² > 0 donne des cos et des sin. | sin(k1) = 0 ⟹ k = … | λₙ = (nπ)², uₙ = sin(nπx)
  pièges : f_sl_eigen_zero

```

### Niveau 5

```
Problème de Sturm-Liouville : trouve les λ et les u ≠ 0 tels que −u″ = λu sur ]0 ; π[, u′(0) = 0, u(π) = 0.
  [free, sans aide]  λ_n
    ? λ = −μ² < 0 : u = A ch(μx) + B sh(μx). Les conditions aux bords donnent ? ✔ u = 0 : pas de valeur propre négative / · Une solution u ≠ 0
    ? λ = 0 : u = A + Bx. Les conditions aux bords donnent ? ✔ A = B = 0 : λ = 0 n'est pas valeur propre / · λ = 0 est valeur propre
    ? λ = k² > 0 : quelle solution générale de u″ + k²u = 0 ? ✔ u = A cos(kx) + B sin(kx) / · u = A e^(kx) + B e^(−kx) / · u = (A + Bx)e^(kx)
    ? u′(0) = 0 donne B = 0. Puis u(π) = A cos(kπ) = 0 ; comme u ≠ 0 : ✔ cos(kπ) = 0 : k = (n + ½) / · sin(kπ) = 0 / · Le coefficient restant est nul
    ? n parcourt : ✔ n ≥ 0 / · n ≥ 1
    (Les valeurs propres :)
    = (n + 1/2)²   ← λₙ = kₙ²
  — Les fonctions propres :  [juge eigen]  départ : u_n
    = cos((n + 1/2)x)
  pièges : f_sl_eigen_zero

Problème de Sturm-Liouville : trouve les λ et les u ≠ 0 tels que −u″ = λu sur ]0 ; π[, u′(0) = 0, u(π) = 0.
  [free, sans aide]  λ_n
    ? λ = −μ² < 0 : u = A ch(μx) + B sh(μx). Les conditions aux bords donnent ? ✔ u = 0 : pas de valeur propre négative / · Une solution u ≠ 0
    ? λ = 0 : u = A + Bx. Les conditions aux bords donnent ? ✔ A = B = 0 : λ = 0 n'est pas valeur propre / · λ = 0 est valeur propre
    ? λ = k² > 0 : quelle solution générale de u″ + k²u = 0 ? ✔ u = A cos(kx) + B sin(kx) / · u = A e^(kx) + B e^(−kx) / · u = (A + Bx)e^(kx)
    ? u′(0) = 0 donne B = 0. Puis u(π) = A cos(kπ) = 0 ; comme u ≠ 0 : ✔ cos(kπ) = 0 : k = (n + ½) / · sin(kπ) = 0 / · Le coefficient restant est nul
    ? n parcourt : ✔ n ≥ 0 / · n ≥ 1
    (Les valeurs propres :)
    = (n + 1/2)²   ← λₙ = kₙ²
  — Les fonctions propres :  [juge eigen]  départ : u_n
    = cos((n + 1/2)x)
  pièges : f_sl_eigen_zero

Problème de Sturm-Liouville : trouve les λ et les u ≠ 0 tels que −u″ = λu sur ]0 ; π[, u(0) = 0, u′(π) = 0. Puis résous −u″ = 2sin(x/2)+2sin(3x/2) avec les mêmes conditions.
  [free, sans aide]  λ_n
    ? λ = −μ² < 0 : u = A ch(μx) + B sh(μx). Les conditions aux bords donnent ? ✔ u = 0 : pas de valeur propre négative / · Une solution u ≠ 0
    ? λ = 0 : u = A + Bx. Les conditions aux bords donnent ? ✔ A = B = 0 : λ = 0 n'est pas valeur propre / · λ = 0 est valeur propre
    ? λ = k² > 0 : quelle solution générale de u″ + k²u = 0 ? ✔ u = A cos(kx) + B sin(kx) / · u = A e^(kx) + B e^(−kx) / · u = (A + Bx)e^(kx)
    ? u(0) = 0 donne A = 0. Puis u′(π) = Bk cos(kπ) = 0 ; comme u ≠ 0 : ✔ cos(kπ) = 0 : k = (n + ½) / · sin(kπ) = 0 / · Le coefficient restant est nul
    ? n parcourt : ✔ n ≥ 0 / · n ≥ 1
    (Les valeurs propres :)
    = (n + 1/2)²   ← λₙ = kₙ²
  — Les fonctions propres :  [juge eigen]  départ : u_n
    = sin((n + 1/2)x)
  — Résous −u″ = 2sin(x/2)+2sin(3x/2) avec les mêmes conditions, en écrivant u sur les uₙ :  [juge ode]  départ : −d2/dn2 u = 2sin(x/2) + 2sin(3x/2)
    = u = 8sin(x/2) + (8/9)sin(3x/2)   ← Chaque coefficient divisé par λₙ
  pièges : f_sl_eigen_zero

```

### Variantes d'examen

```
Problème de Sturm-Liouville : trouve les λ et les u ≠ 0 tels que −u″ = λu sur ]0 ; π[, u′(0) = 0, u(π) = 0.
  [problème, examen open, 6 points]
  partie 1 (Début du problème : 3 ; Les fonctions propres : 3)
    [free, sans aide, suivre l'erreur, examen open]  λ_n
      (Les valeurs propres :)
      = (n + 1/2)²   ← λₙ = kₙ²
    — Les fonctions propres :  [juge eigen]  départ : u_n
      = cos((n + 1/2)x)

```

## Transformée de Laplace par la table et les propriétés (`f-lap-table`, BA4)

_Lignes L1 à L14, décalage F(z + b), −F′ pour t·f, retard e^(−az) ; et le demi-plan Re z > γ₀._

### Niveau 1

```
Calcule la transformée de Laplace F(z) de f(t) = e^t(3t² − 3cos(5t)) et donne le demi-plan où elle existe.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  ℒ(3t^2-3cos(5t))
    (Lignes L8 et L5 de la table.)
    = □/z^□ − 3z/(z² + 25)   (trous : 6/z³ − 3z/(z² + 25))   ← Table : L8, L5
  — Puis le décalage :  [juge transform]  départ : F(z)
    (décalage (LP4) : e^tg(t) ↦ G(z − 1))
    = Re(z) > 1   ← e^t déplace l'abscisse de 1
    = F(z) = 6/(□)³ − 3(□)/((z − 1)² + 25)   (trous : F(z) = 6/(z − 1)³ − 3(z − 1)/((z − 1)² + 25))   ← LP4
  aides : Transforme d'abord la parenthèse avec la table, puis remplace z par z − 1. | ℒ(3t² − 3cos(5t)) = 6/z³ − 3z/(z² + 25) | F(z) = 6/(z − 1)³ − 3(z − 1)/((z − 1)² + 25), Re z > 1

Calcule la transformée de Laplace F(z) de f(t) = e^(−t)(−2t + 3sin(5t)) et donne le demi-plan où elle existe.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  ℒ(-2t+3sin(5t))
    (Lignes L8 et L4 de la table.)
    = −2/z² + □/(z² + □)   (trous : −2/z² + 15/(z² + 25))   ← Table : L8, L4
  — Puis le décalage :  [juge transform]  départ : F(z)
    (décalage (LP4) : e^(−t)g(t) ↦ G(z + 1))
    = Re(z) > −1   ← e^(−t) déplace l'abscisse de −1
    = F(z) = −2/(□)² + 15/((□)² + 25)   (trous : F(z) = −2/(z + 1)² + 15/((z + 1)² + 25))   ← LP4
  aides : Transforme d'abord la parenthèse avec la table, puis remplace z par z + 1. | ℒ(−2t + 3sin(5t)) = −2/z² + 15/(z² + 25) | F(z) = −2/(z + 1)² + 15/((z + 1)² + 25), Re z > −1

Calcule la transformée de Laplace F(z) de f(t) = 2tsinh(t) et donne le demi-plan où elle existe.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  ℒ(2sinh(t))
    (Ligne L11 de la table.)
    = 2/(z² − 1)   ← Table : L11
  — Puis la propriété :  [juge transform]  départ : F(z)
    (multiplication par t (LP5) : tg(t) ↦ −G′(z))
    = Re(z) > 1   ← Même abscisse que g
    = F(z) = □   (trous : F(z) = 4z/(z² − 1)²)   ← LP5 : −G′(z)
  aides : Transforme d'abord g avec la table, puis ℒ(t g) = −G′(z). | ℒ(2sinh(t)) = 2/(z² − 1) | F(z) = 4z/(z² − 1)², Re z > 1

```

### Niveau 2

```
Calcule la transformée de Laplace F(z) de f(t) = 3tcos(2t) et donne le demi-plan où elle existe.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  ℒ(3cos(2t))
    ? Que fait-on d'abord ? ✔ Transformer 3cos(2t) avec la table / ✔ Calculer l'intégrale ∫₀^∞ f(t)e^(−tz) dt directement
    = □   (trous : 3z/(z² + 4))   ← Table : L5
  — Puis la propriété :  [juge transform]  départ : F(z)
    ? Quelle propriété ? ✔ ℒ(t g) = −G′(z) / · ℒ(t g) = G′(z) / · ℒ(t g) = G(z)/z²
    = Re(z) > 0   ← Même abscisse que g
    = F(z) = □   (trous : F(z) = 3(z² − 4)/(z² + 4)²)   ← LP5 : −G′(z)
  aides : Transforme d'abord g avec la table, puis ℒ(t g) = −G′(z). | ℒ(3cos(2t)) = 3z/(z² + 4) | F(z) = 3(z² − 4)/(z² + 4)², Re z > 0
  pièges : f_lap_tf_sign

Calcule la transformée de Laplace F(z) de f(t) = e^(2t)(4sin(t) + 3cos(5t)) et donne le demi-plan où elle existe.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  ℒ(4sin(t)+3cos(5t))
    ? Que fait-on d'abord ? ✔ Transformer 4sin(t) + 3cos(5t) avec la table / ✔ Calculer l'intégrale ∫₀^∞ f(t)e^(−tz) dt directement
    = □   (trous : 4/(z² + 1) + 3z/(z² + 25))   ← Table : L4, L5
  — Puis le décalage :  [juge transform]  départ : F(z)
    ? Quelle propriété ? ✔ Décalage : remplacer z par z − 2 dans G / · Décalage : remplacer z par z + 2 dans G / · Multiplier G par ℒ(e^(2t))
    = Re(z) > 2   ← e^(2t) déplace l'abscisse de 2
    = F(z) = □   (trous : F(z) = 4/((z − 2)² + 1) + 3(z − 2)/((z − 2)² + 25))   ← LP4
  aides : Transforme d'abord la parenthèse avec la table, puis remplace z par z − 2. | ℒ(4sin(t) + 3cos(5t)) = 4/(z² + 1) + 3z/(z² + 25) | F(z) = 4/((z − 2)² + 1) + 3(z − 2)/((z − 2)² + 25), Re z > 2
  pièges : f_lap_shift_sign

Calcule la transformée de Laplace F(z) de f(t) = e^(−2t)(4sin(2t) + sin(t)) et donne le demi-plan où elle existe.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  ℒ(4sin(2t)+sin(t))
    ? Que fait-on d'abord ? ✔ Transformer 4sin(2t) + sin(t) avec la table / ✔ Calculer l'intégrale ∫₀^∞ f(t)e^(−tz) dt directement
    = □   (trous : 8/(z² + 4) + 1/(z² + 1))   ← Table : L4
  — Puis le décalage :  [juge transform]  départ : F(z)
    ? Quelle propriété ? ✔ Décalage : remplacer z par z + 2 dans G / · Décalage : remplacer z par z − 2 dans G / · Multiplier G par ℒ(e^(−2t))
    = Re(z) > −2   ← e^(−2t) déplace l'abscisse de −2
    = F(z) = □   (trous : F(z) = 8/((z + 2)² + 4) + 1/((z + 2)² + 1))   ← LP4
  aides : Transforme d'abord la parenthèse avec la table, puis remplace z par z + 2. | ℒ(4sin(2t) + sin(t)) = 8/(z² + 4) + 1/(z² + 1) | F(z) = 8/((z + 2)² + 4) + 1/((z + 2)² + 1), Re z > −2
  pièges : f_lap_shift_sign

```

### Niveau 3

```
Calcule la transformée de Laplace F(z) de f(t) = e^(−3t)(3 + 3sin(3t)) et donne le demi-plan où elle existe.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [tap, suivre l'erreur, menu menu]  ℒ(3+3sin(3t))
    ? Que fait-on d'abord ? ✔ Transformer 3 + 3sin(3t) avec la table / ✔ Calculer l'intégrale ∫₀^∞ f(t)e^(−tz) dt directement
    = 3/z + 9/(z² + 9)   ← Table : L2, L4
  — Puis le décalage :  [juge transform]  départ : F(z)
    ? Quelle propriété ? ✔ Décalage : remplacer z par z + 3 dans G / · Décalage : remplacer z par z − 3 dans G / · Multiplier G par ℒ(e^(−3t))
    = Re(z) > −3   ← e^(−3t) déplace l'abscisse de −3
    = F(z) = 3/(z + 3) + 9/((z + 3)² + 9)   ← LP4
  aides : Transforme d'abord la parenthèse avec la table, puis remplace z par z + 3. | ℒ(3 + 3sin(3t)) = 3/z + 9/(z² + 9) | F(z) = 3/(z + 3) + 9/((z + 3)² + 9), Re z > −3
  pièges : f_lap_shift_sign

Calcule la transformée de Laplace F(z) de f(t) = 3te^(−2t) et donne le demi-plan où elle existe.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [tap, suivre l'erreur, menu menu]  ℒ(3e^(-2t))
    ? Que fait-on d'abord ? ✔ Transformer 3e^(−2t) avec la table / ✔ Calculer l'intégrale ∫₀^∞ f(t)e^(−tz) dt directement
    = 3/(z + 2)   ← Table : L3
  — Puis la propriété :  [juge transform]  départ : F(z)
    ? Quelle propriété ? ✔ ℒ(t g) = −G′(z) / · ℒ(t g) = G′(z) / · ℒ(t g) = G(z)/z²
    = Re(z) > −2   ← Même abscisse que g
    = F(z) = 3/(z + 2)²   ← LP5 : −G′(z)
  aides : Transforme d'abord g avec la table, puis ℒ(t g) = −G′(z). | ℒ(3e^(−2t)) = 3/(z + 2) | F(z) = 3/(z + 2)², Re z > −2
  pièges : f_lap_tf_sign

Calcule la transformée de Laplace F(z) de f(t) = 2te^t et donne le demi-plan où elle existe.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [tap, suivre l'erreur, menu menu]  ℒ(2e^t)
    ? Que fait-on d'abord ? ✔ Transformer 2e^t avec la table / ✔ Calculer l'intégrale ∫₀^∞ f(t)e^(−tz) dt directement
    = 2/(z − 1)   ← Table : L3
  — Puis la propriété :  [juge transform]  départ : F(z)
    ? Quelle propriété ? ✔ ℒ(t g) = −G′(z) / · ℒ(t g) = G′(z) / · ℒ(t g) = G(z)/z²
    = Re(z) > 1   ← Même abscisse que g
    = F(z) = 2/(z − 1)²   ← LP5 : −G′(z)
  aides : Transforme d'abord g avec la table, puis ℒ(t g) = −G′(z). | ℒ(2e^t) = 2/(z − 1) | F(z) = 2/(z − 1)², Re z > 1
  pièges : f_lap_tf_sign

```

### Niveau 4

```
Calcule la transformée de Laplace F(z) de f(t) = te^(2t) et donne le demi-plan où elle existe.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, suivre l'erreur]  ℒ(e^(2t))
    = 1/(z − 2)   ← Table : L3
  — Puis la propriété :  [juge transform]  départ : F(z)
    = Re(z) > 2   ← Même abscisse que g
    = F(z) = 1/(z − 2)²   ← LP5 : −G′(z)
  aides : Transforme d'abord g avec la table, puis ℒ(t g) = −G′(z). | ℒ(e^(2t)) = 1/(z − 2) | F(z) = 1/(z − 2)², Re z > 2

Calcule la transformée de Laplace F(z) de f(t) = 3tcos(2t) et donne le demi-plan où elle existe.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, suivre l'erreur]  ℒ(3cos(2t))
    = 3z/(z² + 4)   ← Table : L5
  — Puis la propriété :  [juge transform]  départ : F(z)
    = Re(z) > 0   ← Même abscisse que g
    = F(z) = 3(z² − 4)/(z² + 4)²   ← LP5 : −G′(z)
  aides : Transforme d'abord g avec la table, puis ℒ(t g) = −G′(z). | ℒ(3cos(2t)) = 3z/(z² + 4) | F(z) = 3(z² − 4)/(z² + 4)², Re z > 0

Calcule la transformée de Laplace F(z) de f(t) = 3tsin(3t) et donne le demi-plan où elle existe.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, suivre l'erreur]  ℒ(3sin(3t))
    = 9/(z² + 9)   ← Table : L4
  — Puis la propriété :  [juge transform]  départ : F(z)
    = Re(z) > 0   ← Même abscisse que g
    = F(z) = 18z/(z² + 9)²   ← LP5 : −G′(z)
  aides : Transforme d'abord g avec la table, puis ℒ(t g) = −G′(z). | ℒ(3sin(3t)) = 9/(z² + 9) | F(z) = 18z/(z² + 9)², Re z > 0

```

### Niveau 5

```
Calcule la transformée de Laplace F(z) de f(t) = (t² + e^(2t))² et donne le demi-plan où elle existe.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, sans aide]  ℒ((t^2+e^(2t))^2)
    = f(t) = t⁴ + 2t²e^(2t) + e^(4t)   ← Développer le carré
    = Re(z) > 4   ← Abscisse
    = F(z) = 24/z⁵ + 4/(z − 2)³ + 1/(z − 4)   ← Lignes L8 et L9 et L3

Calcule la transformée de Laplace F(z) de e^tsin(2t) retardée de 2, f(t) = H(t − 2)e^(t − 2)sin(2(t − 2)) (H : Heaviside), et donne le demi-plan où elle existe.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, sans aide]  ℒ(e^tsin(2t))
    = 2/((z − 1)² + 4)   ← Table : L6
  — Puis le retard :  [juge transform]  départ : F(z)
    = Re(z) > 1   ← Même abscisse que g
    = F(z) = 2e^(−2z)/((z − 1)² + 4)   ← LP7

Calcule la transformée de Laplace F(z) de e^(−2t)sin(3t) retardée de 1, f(t) = H(t − 1)e^(−2(t − 1))sin(3(t − 1)) (H : Heaviside), et donne le demi-plan où elle existe.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, sans aide]  ℒ(e^(-2t)sin(3t))
    = 3/((z + 2)² + 9)   ← Table : L6
  — Puis le retard :  [juge transform]  départ : F(z)
    = Re(z) > −2   ← Même abscisse que g
    = F(z) = 3e^(−z)/((z + 2)² + 9)   ← LP7

```

### Variantes d'examen

```
Soit f(t) = e^(−3t)(2t − 7sin(t)) et F = ℒ(f). Coche les affirmations justes.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0 (Plusieurs réponses possibles.)
  ✔ F(z) = 2/(z + 3)² − 7/((z + 3)² + 1)   · F(z) = 2/(z − 3)² − 7/((z − 3)² + 1) [f_lap_shift_sign]   ✔ F(z) existe pour Re z > −3   · F(z) existe seulement pour Re z > 0 [f_lap_abscissa]   · F(z) = 2/z² − 7/(z² + 1)
  [examen mcq]
  pièges : f_lap_shift_sign, f_lap_abscissa

Calcule la transformée de Laplace F(z) de f(t) = e^(2t)(4sin(t) − 7sin(4t)) et donne le demi-plan où elle existe.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 1,5 ; Puis le décalage : 2,5)
    [free, sans aide, suivre l'erreur, examen open]  ℒ(4sin(t)-7sin(4t))
      = 4/(z² + 1) − 28/(z² + 16)   ← Table : L4
    — Puis le décalage :  [juge transform]  départ : F(z)
      = Re(z) > 2   ← e^(2t) déplace l'abscisse de 2
      = F(z) = 4/((z − 2)² + 1) − 28/((z − 2)² + 16)   ← LP4

```

## Abscisse de convergence (`f-lap-abscissa`, BA4)

_γ₀ d'une somme : le maximum des abscisses ; pour F rationnelle : la plus grande partie réelle des pôles._

### Niveau 1

```
Donne l'abscisse de convergence γ₀ de f(t) = 2cos(3t) − te^(2t).Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  γ_0
    (Abscisses des termes : 2cos(3t) : 0 ; −te^(2t) : 2.)
    = max(□,2)   (trous : max(0,2))   ← Abscisse de chaque terme
    = 2   ← Le maximum
  aides : Quelle est l'abscisse de chaque terme ? e^(αt) donne α, tⁿ, sin et cos donnent 0, cosh(ωt) donne |ω|. | γ₀ = max(0 ; 2) | γ₀ = 2
  pièges : f_lap_abscissa

Donne l'abscisse de convergence γ₀ de f(t) = 5te^(−t) + 5sinh(t) + 2cosh(4t).Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  γ_0
    (Abscisses des termes : 5te^(−t) : −1 ; 5sinh(t) : 1 ; 2cosh(4t) : 4.)
    = max(□,1,4)   (trous : max(−1,1,4))   ← Abscisse de chaque terme
    = 4   ← Le maximum
  aides : Quelle est l'abscisse de chaque terme ? e^(αt) donne α, tⁿ, sin et cos donnent 0, cosh(ωt) donne |ω|. | γ₀ = max(−1 ; 1 ; 4) | γ₀ = 4
  pièges : f_lap_abscissa

Donne l'abscisse de convergence γ₀ de f(t) = 5sin(3t) + e^t − te^(3t).Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  γ_0
    (Abscisses des termes : 5sin(3t) : 0 ; e^t : 1 ; −te^(3t) : 3.)
    = max(□,1,3)   (trous : max(0,1,3))   ← Abscisse de chaque terme
    = 3   ← Le maximum
  aides : Quelle est l'abscisse de chaque terme ? e^(αt) donne α, tⁿ, sin et cos donnent 0, cosh(ωt) donne |ω|. | γ₀ = max(0 ; 1 ; 3) | γ₀ = 3
  pièges : f_lap_abscissa

```

### Niveau 2

```
Donne l'abscisse de convergence γ₀ de f(t) = 2 − e^(3t).Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  γ_0
    ? Comment trouver γ₀ ? ✔ Le maximum des abscisses des termes / · Le minimum des abscisses des termes / · Toujours 0
    = max(□,□)   (trous : max(0,3))   ← Abscisse de chaque terme
    = 3   ← Le maximum
  aides : Quelle est l'abscisse de chaque terme ? e^(αt) donne α, tⁿ, sin et cos donnent 0, cosh(ωt) donne |ω|. | γ₀ = max(0 ; 3) | γ₀ = 3
  pièges : f_lap_abscissa

Donne l'abscisse de convergence γ₀ de f(t) = 5t + 3te^t.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  γ_0
    ? Comment trouver γ₀ ? ✔ Le maximum des abscisses des termes / · Le minimum des abscisses des termes / · Toujours 0
    = max(□,□)   (trous : max(0,1))   ← Abscisse de chaque terme
    = 1   ← Le maximum
  aides : Quelle est l'abscisse de chaque terme ? e^(αt) donne α, tⁿ, sin et cos donnent 0, cosh(ωt) donne |ω|. | γ₀ = max(0 ; 1) | γ₀ = 1
  pièges : f_lap_abscissa

Donne l'abscisse de convergence γ₀ de f(t) = (t + e^(−2t))².Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  γ_0
    ? Comment trouver γ₀ ? ✔ Le maximum des abscisses des termes / · Le minimum des abscisses des termes / · Toujours 0
    = max(□,□,□)   (trous : max(0,−2,−4))   ← Abscisse de chaque terme
    = 0   ← Le maximum
  aides : Quelle est l'abscisse de chaque terme ? e^(αt) donne α, tⁿ, sin et cos donnent 0, cosh(ωt) donne |ω|. | γ₀ = max(0 ; −2 ; −4) | γ₀ = 0
  pièges : f_lap_abscissa

```

### Niveau 3

```
Donne l'abscisse de convergence γ₀ de f(t) = 3sin(2t) − 2cosh(t).Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [tap, suivre l'erreur, menu menu]  γ_0
    ? Comment trouver γ₀ ? ✔ Le maximum des abscisses des termes / · Le minimum des abscisses des termes / · Toujours 0
    = max(0,1)   ← Abscisse de chaque terme
    = 1   ← Le maximum
  aides : Quelle est l'abscisse de chaque terme ? e^(αt) donne α, tⁿ, sin et cos donnent 0, cosh(ωt) donne |ω|. | γ₀ = max(0 ; 1) | γ₀ = 1
  pièges : f_lap_abscissa

Donne l'abscisse de convergence γ₀ de f(t) = 5e^(−2t) − 2.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [tap, suivre l'erreur, menu menu]  γ_0
    ? Comment trouver γ₀ ? ✔ Le maximum des abscisses des termes / · Le minimum des abscisses des termes / · Toujours 0
    = max(−2,0)   ← Abscisse de chaque terme
    = 0   ← Le maximum
  aides : Quelle est l'abscisse de chaque terme ? e^(αt) donne α, tⁿ, sin et cos donnent 0, cosh(ωt) donne |ω|. | γ₀ = max(−2 ; 0) | γ₀ = 0
  pièges : f_lap_abscissa

Donne l'abscisse de convergence γ₀ de la fonction f dont la transformée est F(z) = 1/(z³ − z) (F est rationnelle).
  [tap, suivre l'erreur, menu menu]  γ_0
    ? Comment trouver γ₀ ? ✔ La plus grande partie réelle des pôles de F / · Toujours 0, comme pour les lignes de la table en sin et cos
    = max(0,−1,1)   ← Parties réelles des pôles
    = 1   ← Le maximum
  aides : Pour F rationnelle, γ₀ est la plus grande partie réelle des pôles. | γ₀ = max(0 ; −1 ; 1) | γ₀ = 1
  pièges : f_lap_abscissa

```

### Niveau 4

```
Donne l'abscisse de convergence γ₀ de la fonction f dont la transformée est F(z) = 1/(z⁴ − 4z³ + 3z²) (F est rationnelle).
  [free, suivre l'erreur]  z⁴ − 4z³ + 3z² = 0
    = z = 0 ou z = 1 ou z = 3   ← Pôles de F
  — Puis l'abscisse :  [juge value]  départ : γ_0
    = max(0,1,3)   ← Parties réelles des pôles
    = 3   ← Le maximum
  aides : Pour F rationnelle, γ₀ est la plus grande partie réelle des pôles. | γ₀ = max(0 ; 1 ; 3) | γ₀ = 3

Donne l'abscisse de convergence γ₀ de la fonction f dont la transformée est F(z) = 1/(z³ − 4z² + 8z) (F est rationnelle).
  [free, suivre l'erreur]  z³ − 4z² + 8z = 0
    = z = 0 ou z = 2 + 2i ou z = 2 − 2i   ← Pôles de F
  — Puis l'abscisse :  [juge value]  départ : γ_0
    = max(0,2)   ← Parties réelles des pôles
    = 2   ← Le maximum
  aides : Pour F rationnelle, γ₀ est la plus grande partie réelle des pôles. | γ₀ = max(0 ; 2) | γ₀ = 2

Donne l'abscisse de convergence γ₀ de la fonction f dont la transformée est F(z) = 1/(z³ − 4z² + 5z) (F est rationnelle).
  [free, suivre l'erreur]  z³ − 4z² + 5z = 0
    = z = 0 ou z = 2 + i ou z = 2 − i   ← Pôles de F
  — Puis l'abscisse :  [juge value]  départ : γ_0
    = max(0,2)   ← Parties réelles des pôles
    = 2   ← Le maximum
  aides : Pour F rationnelle, γ₀ est la plus grande partie réelle des pôles. | γ₀ = max(0 ; 2) | γ₀ = 2

```

### Niveau 5

```
Donne l'abscisse de convergence γ₀ de la fonction f dont la transformée est F(z) = 1/(z⁴ − 2z³ + 5z²) (F est rationnelle).
  [free, sans aide]  z⁴ − 2z³ + 5z² = 0
    = z = 0 ou z = 1 + 2i ou z = 1 − 2i   ← Pôles de F
  — Puis l'abscisse :  [juge value]  départ : γ_0
    = max(0,1)   ← Parties réelles des pôles
    = 1   ← Le maximum

Donne l'abscisse de convergence γ₀ de la fonction f dont la transformée est F(z) = 1/(z⁴ − 4z³ + 5z²) (F est rationnelle).
  [free, sans aide]  z⁴ − 4z³ + 5z² = 0
    = z = 0 ou z = 2 + i ou z = 2 − i   ← Pôles de F
  — Puis l'abscisse :  [juge value]  départ : γ_0
    = max(0,2)   ← Parties réelles des pôles
    = 2   ← Le maximum

Donne l'abscisse de convergence γ₀ de la fonction f dont la transformée est F(z) = 1/(z⁴ − z³ − 2z²) (F est rationnelle).
  [free, sans aide]  z⁴ − z³ − 2z² = 0
    = z = 0 ou z = −1 ou z = 2   ← Pôles de F
  — Puis l'abscisse :  [juge value]  départ : γ_0
    = max(0,−1,2)   ← Parties réelles des pôles
    = 2   ← Le maximum

```

### Variantes d'examen

```
Soit f(t) = 2sinh(t) + 5cos(3t) et F = ℒ(f). Coche les affirmations justes. (Plusieurs réponses possibles.)
  ✔ L'abscisse de convergence est γ₀ = 1.   ✔ F(z) est définie pour Re z > 2.   · F(z) est définie pour Re z > 0. [f_lap_abscissa]   · L'abscisse de convergence est 0, comme pour toute la table. [f_lap_abscissa]   · L'abscisse de convergence est γ₀ = 0. [f_lap_abscissa]
  [examen mcq]
  pièges : f_lap_abscissa

```

## Laplace inverse par éléments simples (`f-lap-inv-des`, BA4)

_Décomposer F en éléments simples réels, reconnaître chaque terme dans la table, additionner._

### Niveau 1

```
Trouve f(t) telle que ℒ(f)(z) = F(z) = (2z² + 4z + 10)/((z − 1)(z + 1)(z + 3)).Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  F(z) = (2z² + 4z + 10)/((z − 1)(z + 1)(z + 3))
    (Forme : A/(z − a) + B/(z − b) + ….)
    = F(z) = 2/(z − 1) − 2/(z + 1) + □   (trous : F(z) = 2/(z − 1) − 2/(z + 1) + 2/(z + 3))   ← Éléments simples
    = f(t) = 2e^t − 2e^(−t) + 2e^(−3t)   ← Table, terme à terme
  aides : Décompose F en éléments simples réels (A/(z − a) + B/(z − b) + …), puis lis chaque terme dans la table. | F(z) = 2/(z − 1) − 2/(z + 1) + 2/(z + 3) | f(t) = 2e^t − 2e^(−t) + 2e^(−3t)
  pièges : f_lap_shift_sign

Trouve f(t) telle que ℒ(f)(z) = F(z) = (6z − 2)/((z − 2)(z + 3)).Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  F(z) = (6z − 2)/((z − 2)(z + 3))
    (Forme : A/(z − a) + B/(z − b) + ….)
    = F(z) = 2/(z − 2) + □   (trous : F(z) = 2/(z − 2) + 4/(z + 3))   ← Éléments simples
    = f(t) = 2e^(2t) + 4e^(−3t)   ← Table, terme à terme
  aides : Décompose F en éléments simples réels (A/(z − a) + B/(z − b) + …), puis lis chaque terme dans la table. | F(z) = 2/(z − 2) + 4/(z + 3) | f(t) = 2e^(2t) + 4e^(−3t)
  pièges : f_lap_shift_sign

Trouve f(t) telle que ℒ(f)(z) = F(z) = (4z − 2)/((z + 1)(z − 2)).Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  F(z) = (4z − 2)/((z + 1)(z − 2))
    (Forme : A/(z − a) + B/(z − b) + ….)
    = F(z) = 2/(z + 1) + □   (trous : F(z) = 2/(z + 1) + 2/(z − 2))   ← Éléments simples
    = f(t) = 2e^(−t) + 2e^(2t)   ← Table, terme à terme
  aides : Décompose F en éléments simples réels (A/(z − a) + B/(z − b) + …), puis lis chaque terme dans la table. | F(z) = 2/(z + 1) + 2/(z − 2) | f(t) = 2e^(−t) + 2e^(2t)
  pièges : f_lap_shift_sign

```

### Niveau 2

```
Trouve f(t) telle que ℒ(f)(z) = F(z) = (z² + 4z − 15)/((z² − 4z + 13)(z − 1)).Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  F(z) = (z² + 4z − 15)/((z² − 4z + 13)(z − 1))
    ? Forme de la décomposition ? ✔ (A(z − a) + Bω)/((z − a)² + ω²) + C/(z − c) / · A/((z − a)² + ω²) + C/(z − c)
    = F(z) = □   (trous : F(z) = (2z + 2)/((z − 2)² + 9) − 1/(z − 1))   ← Éléments simples
    = F(z) = 2(z − 2)/((z − 2)² + 9) + 2·(3/((z − 2)² + 9)) − 1/(z − 1)   ← Forme de la table
    = f(t) = □   (trous : f(t) = 2e^(2t)cos(3t) + 2e^(2t)sin(3t) − e^t)   ← Table, terme à terme
  aides : Décompose F en éléments simples réels ((A(z − a) + Bω)/((z − a)² + ω²) + C/(z − c)), puis lis chaque terme dans la table. | F(z) = (2z + 2)/((z − 2)² + 9) − 1/(z − 1) | f(t) = 2e^(2t)cos(3t) + 2e^(2t)sin(3t) − e^t
  pièges : f_lap_shift_sign, f_sin_omega_factor, g0_pfd_form

Trouve f(t) telle que ℒ(f)(z) = F(z) = (4z² − 7z + 8)/((z² − 4z + 8)(z − 1)).Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  F(z) = (4z² − 7z + 8)/((z² − 4z + 8)(z − 1))
    ? Forme de la décomposition ? ✔ (A(z − a) + Bω)/((z − a)² + ω²) + C/(z − c) / · A/((z − a)² + ω²) + C/(z − c)
    = F(z) = □   (trous : F(z) = 3z/((z − 2)² + 4) + 1/(z − 1))   ← Éléments simples
    = F(z) = 3(z − 2)/((z − 2)² + 4) + 3·(2/((z − 2)² + 4)) + 1/(z − 1)   ← Forme de la table
    = f(t) = □   (trous : f(t) = 3e^(2t)cos(2t) + 3e^(2t)sin(2t) + e^t)   ← Table, terme à terme
  aides : Décompose F en éléments simples réels ((A(z − a) + Bω)/((z − a)² + ω²) + C/(z − c)), puis lis chaque terme dans la table. | F(z) = 3z/((z − 2)² + 4) + 1/(z − 1) | f(t) = 3e^(2t)cos(2t) + 3e^(2t)sin(2t) + e^t
  pièges : f_lap_shift_sign, f_sin_omega_factor, g0_pfd_form

Trouve f(t) telle que ℒ(f)(z) = F(z) = (4z³ − 4z² + 20z − 12)/((z² + 1)(z² + 9)).Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  F(z) = (4z³ − 4z² + 20z − 12)/((z² + 1)(z² + 9))
    ? Forme de la décomposition ? ✔ (Az + B)/(z² + ω₁²) + (Cz + D)/(z² + ω₂²) / · A/(z² + ω₁²) + B/(z² + ω₂²)
    = F(z) = □   (trous : F(z) = (2z − 1)/(z² + 1) + (2z − 3)/(z² + 9))   ← Éléments simples
    = F(z) = 2z/(z² + 1) − 1/(z² + 1) + 2z/(z² + 9) − 3/(z² + 9)   ← Forme de la table
    = f(t) = □   (trous : f(t) = 2cos(t) − sin(t) + 2cos(3t) − sin(3t))   ← Table, terme à terme
  aides : Décompose F en éléments simples réels ((Az + B)/(z² + ω₁²) + (Cz + D)/(z² + ω₂²)), puis lis chaque terme dans la table. | F(z) = (2z − 1)/(z² + 1) + (2z − 3)/(z² + 9) | f(t) = 2cos(t) − sin(t) + 2cos(3t) − sin(3t)
  pièges : f_sin_omega_factor, g0_pfd_form

```

### Niveau 3

```
Trouve f(t) telle que ℒ(f)(z) = F(z) = (−3z³ + z² − 9z − 5)/((z² + 1)(z² + 4)).Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [tap, suivre l'erreur, menu menu]  F(z) = (−3z³ + z² − 9z − 5)/((z² + 1)(z² + 4))
    ? Forme de la décomposition ? ✔ (Az + B)/(z² + ω₁²) + (Cz + D)/(z² + ω₂²) / · A/(z² + ω₁²) + B/(z² + ω₂²)
    ? Quelle fonction a pour transformée 1/(z² + ω²) ? ✔ (1/ω) sin(ωt) / · sin(ωt)
    = F(z) = (−2z − 2)/(z² + 1) + (−z + 3)/(z² + 4)   ← Éléments simples
    = F(z) = −2z/(z² + 1) − 2·(1/(z² + 1)) − z/(z² + 4) + (3/2)·(2/(z² + 4))   ← Forme de la table
    = f(t) = −2cos(t) − 2sin(t) − cos(2t) + (3/2)sin(2t)   ← Table, terme à terme
  aides : Décompose F en éléments simples réels ((Az + B)/(z² + ω₁²) + (Cz + D)/(z² + ω₂²)), puis lis chaque terme dans la table. | F(z) = (−2z − 2)/(z² + 1) + (−z + 3)/(z² + 4) | f(t) = −2cos(t) − 2sin(t) − cos(2t) + (3/2)sin(2t)
  pièges : f_sin_omega_factor, g0_pfd_form

Trouve f(t) telle que ℒ(f)(z) = F(z) = (−3z² − 17)/((z² + 4)(z² + 9)).Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [tap, suivre l'erreur, menu menu]  F(z) = (−3z² − 17)/((z² + 4)(z² + 9))
    ? Forme de la décomposition ? ✔ (Az + B)/(z² + ω₁²) + (Cz + D)/(z² + ω₂²) / · A/(z² + ω₁²) + B/(z² + ω₂²)
    ? Quelle fonction a pour transformée 1/(z² + ω²) ? ✔ (1/ω) sin(ωt) / · sin(ωt)
    = F(z) = −1/(z² + 4) − 2/(z² + 9)   ← Éléments simples
    = F(z) = (−1/2)·(2/(z² + 4)) + (−2/3)·(3/(z² + 9))   ← Forme de la table
    = f(t) = −(1/2)sin(2t) − (2/3)sin(3t)   ← Table, terme à terme
  aides : Décompose F en éléments simples réels ((Az + B)/(z² + ω₁²) + (Cz + D)/(z² + ω₂²)), puis lis chaque terme dans la table. | F(z) = −1/(z² + 4) − 2/(z² + 9) | f(t) = −(1/2)sin(2t) − (2/3)sin(3t)
  pièges : f_sin_omega_factor, g0_pfd_form

Trouve f(t) telle que ℒ(f)(z) = F(z) = (−z² − 6z + 9)/(z(z − 3)(z + 3)).Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [tap, suivre l'erreur, menu menu]  F(z) = (−z² − 6z + 9)/(z(z − 3)(z + 3))
    ? Forme de la décomposition ? ✔ A/(z − a) + B/(z − b) + … / · A/((z − a)(z − b)…)
    = F(z) = −1/z − 1/(z − 3) + 1/(z + 3)   ← Éléments simples
    = f(t) = −1 − e^(3t) + e^(−3t)   ← Table, terme à terme
  aides : Décompose F en éléments simples réels (A/(z − a) + B/(z − b) + …), puis lis chaque terme dans la table. | F(z) = −1/z − 1/(z − 3) + 1/(z + 3) | f(t) = −1 − e^(3t) + e^(−3t)
  pièges : f_lap_shift_sign, g0_pfd_form

```

### Niveau 4

```
Trouve f(t) telle que ℒ(f)(z) = F(z) = (z³ − 3z² + 17z − 11)/((z² + 1)(z² + 9)).Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, suivre l'erreur]  F(z) = (z³ − 3z² + 17z − 11)/((z² + 1)(z² + 9))
    = F(z) = (2z − 1)/(z² + 1) + (−z − 2)/(z² + 9)   ← Éléments simples
    = F(z) = 2z/(z² + 1) − 1/(z² + 1) − z/(z² + 9) + (−2/3)·(3/(z² + 9))   ← Forme de la table
    = f(t) = 2cos(t) − sin(t) − cos(3t) − (2/3)sin(3t)   ← Table, terme à terme
  aides : Décompose F en éléments simples réels ((Az + B)/(z² + ω₁²) + (Cz + D)/(z² + ω₂²)), puis lis chaque terme dans la table. | F(z) = (2z − 1)/(z² + 1) + (−z − 2)/(z² + 9) | f(t) = 2cos(t) − sin(t) − cos(3t) − (2/3)sin(3t)
  pièges : f_sin_omega_factor

Trouve f(t) telle que ℒ(f)(z) = F(z) = (z − 2)/((z + 1)z).Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, suivre l'erreur]  F(z) = (z − 2)/((z + 1)z)
    = F(z) = 3/(z + 1) − 2/z   ← Éléments simples
    = f(t) = 3e^(−t) − 2   ← Table, terme à terme
  aides : Décompose F en éléments simples réels (A/(z − a) + B/(z − b) + …), puis lis chaque terme dans la table. | F(z) = 3/(z + 1) − 2/z | f(t) = 3e^(−t) − 2
  pièges : f_lap_shift_sign

Trouve f(t) telle que ℒ(f)(z) = F(z) = (−z³ + z² − 4z − 5)/((z² + 1)(z² + 4)).Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, suivre l'erreur]  F(z) = (−z³ + z² − 4z − 5)/((z² + 1)(z² + 4))
    = F(z) = (−z − 2)/(z² + 1) + 3/(z² + 4)   ← Éléments simples
    = F(z) = −z/(z² + 1) − 2·(1/(z² + 1)) + (3/2)·(2/(z² + 4))   ← Forme de la table
    = f(t) = −cos(t) − 2sin(t) + (3/2)sin(2t)   ← Table, terme à terme
  aides : Décompose F en éléments simples réels ((Az + B)/(z² + ω₁²) + (Cz + D)/(z² + ω₂²)), puis lis chaque terme dans la table. | F(z) = (−z − 2)/(z² + 1) + 3/(z² + 4) | f(t) = −cos(t) − 2sin(t) + (3/2)sin(2t)
  pièges : f_sin_omega_factor

```

### Niveau 5

```
Trouve f(t) telle que ℒ(f)(z) = F(z) = (−z³ + 4z² − 7z − 1)/((z − 1)²(z² + 4)).Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, sans aide]  F(z) = (−z³ + 4z² − 7z − 1)/((z − 1)²(z² + 4))
    = F(z) = −1/(z − 1)² + (−z + 3)/(z² + 4)   ← Éléments simples
    = f(t) = −te^t − cos(2t) + (3/2)sin(2t)   ← Table, terme à terme
  pièges : f_lap_shift_sign, f_sin_omega_factor

Trouve f(t) telle que ℒ(f)(z) = F(z) = (−2z³ + z² − 4z + 8)/(z²(z² + 4)).Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, sans aide]  F(z) = (−2z³ + z² − 4z + 8)/(z²(z² + 4))
    = F(z) = −1/z + 2/z² + (−z − 1)/(z² + 4)   ← Éléments simples
    = f(t) = −1 + 2t − cos(2t) − (1/2)sin(2t)   ← Table, terme à terme
  pièges : f_sin_omega_factor

Trouve f(t) telle que ℒ(f)(z) = F(z) = (−z³ − z² − 3z + 1)/((z + 1)²(z² + 1)).Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, sans aide]  F(z) = (−z³ − z² − 3z + 1)/((z + 1)²(z² + 1))
    = F(z) = 2/(z + 1)² + (−z − 1)/(z² + 1)   ← Éléments simples
    = f(t) = 2te^(−t) − cos(t) − sin(t)   ← Table, terme à terme
  pièges : f_lap_shift_sign

```

### Variantes d'examen

```
Soit F(z) = (−4z − 2)/(z(z + 2)(z + 1)) et f = ℒ⁻¹(F). Coche les affirmations justes.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0 (Plusieurs réponses possibles.)
  · f(t) = −1 + 3e^(2t) − 2e^t [f_lap_shift_sign]   · f(t) = −(−1 + 3e^(−2t) − 2e^(−t))   ✔ f(t) = −1 + 3e^(−2t) − 2e^(−t)   ✔ F(z) = −1/z + 3/(z + 2) − 2/(z + 1)   · F(z) = 1/z + 3/(z + 2) − 2/(z + 1)
  [examen mcq]
  pièges : f_lap_shift_sign

Trouve f(t) telle que ℒ(f)(z) = F(z) = (7z² + 14z − 9)/((z − 3)(z + 1)(z + 3)).Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 4)
    [free, sans aide, suivre l'erreur, examen open]  F(z) = (7z² + 14z − 9)/((z − 3)(z + 1)(z + 3))
      = F(z) = 4/(z − 3) + 2/(z + 1) + 1/(z + 3)   ← Éléments simples
      = f(t) = 4e^(3t) + 2e^(−t) + e^(−3t)   ← Table, terme à terme
  pièges : f_lap_shift_sign

```

## Laplace inverse par les résidus (`f-lap-inv-res`, BA4)

_f(t) = somme des résidus de F(z)e^(zt) en tous les pôles, conjugués compris._

### Niveau 1

```
Trouve f(t) = ℒ⁻¹(F)(t) par les résidus, pour F(z) = 1/(z⁴ + z²).
  [guided]  z⁴ + z² = 0
    (Dénominateur factorisé : z²(z² + 1).)
    = z = 0 ou z = i ou z = −i   ← Pôles de F
  — Résidu de F(z)e^(zt) en z = 0 (pôle double) :  [juge lapres]  départ : Res(0)
    (Pôle double : d/dz[(z − z₀)²F(z)e^(zt)], pris en z₀.)
    = d/dz (e^(zt)/(z² + 1))   ← dériver, puis z = z₀
    = □   (trous : t)   ← Calculer
  — Résidu de F(z)e^(zt) en z = i (pôle simple) :  [juge lapres]  départ : Res(i)
    (Pôle simple : (z − z₀)F(z)e^(zt), pris en z₀.)
    = e^(zt)/(z²(z − (−i)))   ← en z = z₀
    = ((1/2)i)e^((i)t)   ← Calculer
  — Résidu de F(z)e^(zt) en z = −i (pôle simple) :  [juge lapres]  départ : Res(−i)
    (Pôle simple : (z − z₀)F(z)e^(zt), pris en z₀.)
    = e^(zt)/(z²(z − (i)))   ← en z = z₀
    = (−(1/2)i)e^((−i)t)   ← Calculer
  — f(t) est la somme des résidus :  [juge transform]  départ : f(t)
    = f(t) = t − sin(t)   ← Deux résidus conjugués : 2 Re
  aides : f(t) est la somme des résidus de F(z)e^(zt) en tous les pôles, y compris les conjugués. | Pôles : z = 0 ou z = i ou z = −i. Pôle double : d/dz[(z − z₀)²F(z)e^(zt)] en z₀. | f(t) = t − sin(t)

Trouve f(t) = ℒ⁻¹(F)(t) par les résidus, pour F(z) = 2/(z³ − z²).
  [guided]  z³ − z² = 0
    (Dénominateur factorisé : z²(z − 1).)
    = z = 0 ou z = 1   ← Pôles de F
  — Résidu de F(z)e^(zt) en z = 0 (pôle double) :  [juge lapres]  départ : Res(0)
    (Pôle double : d/dz[(z − z₀)²F(z)e^(zt)], pris en z₀.)
    = d/dz (2e^(zt)/(z − 1))   ← dériver, puis z = z₀
    = □   (trous : −2 − 2t)   ← Calculer
  — Résidu de F(z)e^(zt) en z = 1 (pôle simple) :  [juge lapres]  départ : Res(1)
    (Pôle simple : (z − z₀)F(z)e^(zt), pris en z₀.)
    = 2e^(zt)/z²   ← en z = z₀
    = □   (trous : 2e^t)   ← Calculer
  — f(t) est la somme des résidus :  [juge transform]  départ : f(t)
    = f(t) = −2 − 2t + 2e^t   ← La somme
  aides : f(t) est la somme des résidus de F(z)e^(zt) en tous les pôles, y compris les conjugués. | Pôles : z = 0 ou z = 1. Pôle double : d/dz[(z − z₀)²F(z)e^(zt)] en z₀. | f(t) = −2 − 2t + 2e^t

Trouve f(t) = ℒ⁻¹(F)(t) par les résidus, pour F(z) = 5/(z³ + 4z² + 5z).
  [guided]  z³ + 4z² + 5z = 0
    (Dénominateur factorisé : z(z² + 4z + 5).)
    = z = 0 ou z = −2 + i ou z = −2 − i   ← Pôles de F
  — Résidu de F(z)e^(zt) en z = 0 (pôle simple) :  [juge lapres]  départ : Res(0)
    (Pôle simple : (z − z₀)F(z)e^(zt), pris en z₀.)
    = 5e^(zt)/(z² + 4z + 5)   ← en z = z₀
    = □   (trous : 1)   ← Calculer
  — Résidu de F(z)e^(zt) en z = −2 + i (pôle simple) :  [juge lapres]  départ : Res(−2 + i)
    (Pôle simple : (z − z₀)F(z)e^(zt), pris en z₀.)
    = 5e^(zt)/(z(z − (−2 − i)))   ← en z = z₀
    = (−1/2 + i)e^((−2 + i)t)   ← Calculer
  — Résidu de F(z)e^(zt) en z = −2 − i (pôle simple) :  [juge lapres]  départ : Res(−2 − i)
    (Pôle simple : (z − z₀)F(z)e^(zt), pris en z₀.)
    = 5e^(zt)/(z(z − (−2 + i)))   ← en z = z₀
    = (−1/2 − i)e^((−2 − i)t)   ← Calculer
  — f(t) est la somme des résidus :  [juge transform]  départ : f(t)
    = f(t) = 1 − e^(−2t)cos(t) − 2e^(−2t)sin(t)   ← Deux résidus conjugués : 2 Re
  aides : f(t) est la somme des résidus de F(z)e^(zt) en tous les pôles, y compris les conjugués. | Pôles : z = 0 ou z = −2 + i ou z = −2 − i. Pôle double : d/dz[(z − z₀)²F(z)e^(zt)] en z₀. | f(t) = 1 − e^(−2t)cos(t) − 2e^(−2t)sin(t)

```

### Niveau 2

```
Trouve f(t) = ℒ⁻¹(F)(t) par les résidus, pour F(z) = 10/(z³ − 2z² + 5z).
  [guided]  z³ − 2z² + 5z = 0
    = z = 0 ou z = 1 + 2i ou z = 1 − 2i   ← Pôles de F
  — Résidu de F(z)e^(zt) en z = 0 (pôle simple) :  [juge lapres]  départ : Res(0)
    = 10e^(zt)/(z² − 2z + 5)   ← en z = z₀
    = □   (trous : 2)   ← Calculer
  — Résidu de F(z)e^(zt) en z = 1 + 2i (pôle simple) :  [juge lapres]  départ : Res(1 + 2i)
    = 10e^(zt)/(z(z − (1 − 2i)))   ← en z = z₀
    = □   (trous : (−1 − (1/2)i)e^((1 + 2i)t))   ← Calculer
  — Résidu de F(z)e^(zt) en z = 1 − 2i (pôle simple) :  [juge lapres]  départ : Res(1 − 2i)
    = 10e^(zt)/(z(z − (1 + 2i)))   ← en z = z₀
    = □   (trous : (−1 + (1/2)i)e^((1 − 2i)t))   ← Calculer
  — f(t) est la somme des résidus :  [juge transform]  départ : f(t)
    ? Quels résidus additionner ? ✔ Ceux de tous les pôles, conjugués compris / · Seulement ceux des pôles de partie imaginaire positive
    = f(t) = 2 − 2e^tcos(2t) + e^tsin(2t)   ← Deux résidus conjugués : 2 Re
  aides : f(t) est la somme des résidus de F(z)e^(zt) en tous les pôles, y compris les conjugués. | Pôles : z = 0 ou z = 1 + 2i ou z = 1 − 2i. Pôle double : d/dz[(z − z₀)²F(z)e^(zt)] en z₀. | f(t) = 2 − 2e^tcos(2t) + e^tsin(2t)
  pièges : f_lap_conj_pole

Trouve f(t) = ℒ⁻¹(F)(t) par les résidus, pour F(z) = 2/(z³ + 5z² + 7z + 3).
  [guided]  z³ + 5z² + 7z + 3 = 0
    = z = −1 ou z = −3   ← Pôles de F
  — Résidu de F(z)e^(zt) en z = −1 (pôle double) :  [juge lapres]  départ : Res(−1)
    ? Quelle formule ? ✔ d/dz[(z − z₀)²F(z)e^(zt)] en z₀ / · lim (z − z₀)F(z)e^(zt) quand z → z₀
    = d/dz (2e^(zt)/(z + 3))   ← dériver, puis z = z₀
    = □   (trous : −(1/2)e^(−t) + te^(−t))   ← Calculer
  — Résidu de F(z)e^(zt) en z = −3 (pôle simple) :  [juge lapres]  départ : Res(−3)
    = 2e^(zt)/(z + 1)²   ← en z = z₀
    = □   (trous : (1/2)e^(−3t))   ← Calculer
  — f(t) est la somme des résidus :  [juge transform]  départ : f(t)
    = f(t) = −(1/2)e^(−t) + te^(−t) + (1/2)e^(−3t)   ← La somme
  aides : f(t) est la somme des résidus de F(z)e^(zt) en tous les pôles, y compris les conjugués. | Pôles : z = −1 ou z = −3. Pôle double : d/dz[(z − z₀)²F(z)e^(zt)] en z₀. | f(t) = −(1/2)e^(−t) + te^(−t) + (1/2)e^(−3t)
  pièges : c_simple_formula_double

Trouve f(t) = ℒ⁻¹(F)(t) par les résidus, pour F(z) = 2/(z³ + 2z² − z − 2).
  [guided]  z³ + 2z² − z − 2 = 0
    = z = 1 ou z = −1 ou z = −2   ← Pôles de F
  — Résidu de F(z)e^(zt) en z = 1 (pôle simple) :  [juge lapres]  départ : Res(1)
    = 2e^(zt)/((z + 1)(z + 2))   ← en z = z₀
    = □   (trous : (1/3)e^t)   ← Calculer
  — Résidu de F(z)e^(zt) en z = −1 (pôle simple) :  [juge lapres]  départ : Res(−1)
    = 2e^(zt)/((z − 1)(z + 2))   ← en z = z₀
    = □   (trous : −e^(−t))   ← Calculer
  — Résidu de F(z)e^(zt) en z = −2 (pôle simple) :  [juge lapres]  départ : Res(−2)
    = 2e^(zt)/((z − 1)(z + 1))   ← en z = z₀
    = □   (trous : (2/3)e^(−2t))   ← Calculer
  — f(t) est la somme des résidus :  [juge transform]  départ : f(t)
    = f(t) = (1/3)e^t − e^(−t) + (2/3)e^(−2t)   ← La somme
  aides : f(t) est la somme des résidus de F(z)e^(zt) en tous les pôles, y compris les conjugués. | Pôles : z = 1 ou z = −1 ou z = −2. Pôle double : d/dz[(z − z₀)²F(z)e^(zt)] en z₀. | f(t) = (1/3)e^t − e^(−t) + (2/3)e^(−2t)

```

### Niveau 3

```
Trouve f(t) = ℒ⁻¹(F)(t) par les résidus, pour F(z) = 8/(z⁴ + 4z³ + 8z²).
  [tap, suivre l'erreur, menu menu]  z⁴ + 4z³ + 8z² = 0
    = z = 0 ou z = −2 + 2i ou z = −2 − 2i   ← Pôles de F
  — Résidu de F(z)e^(zt) en z = 0 (pôle double) :  [juge lapres]  départ : Res(0)
    ? Quelle formule ? ✔ d/dz[(z − z₀)²F(z)e^(zt)] en z₀ / · lim (z − z₀)F(z)e^(zt) quand z → z₀
    = d/dz (8e^(zt)/(z² + 4z + 8))   ← dériver, puis z = z₀
    = −1/2 + t   ← Calculer
  — Résidu de F(z)e^(zt) en z = −2 + 2i (pôle simple) :  [juge lapres]  départ : Res(−2 + 2i)
    = 8e^(zt)/(z²(z − (−2 − 2i)))   ← en z = z₀
    = (1/4)e^((−2 + 2i)t)   ← Calculer
  — Résidu de F(z)e^(zt) en z = −2 − 2i (pôle simple) :  [juge lapres]  départ : Res(−2 − 2i)
    = 8e^(zt)/(z²(z − (−2 + 2i)))   ← en z = z₀
    = (1/4)e^((−2 − 2i)t)   ← Calculer
  — f(t) est la somme des résidus :  [juge transform]  départ : f(t)
    ? Quels résidus additionner ? ✔ Ceux de tous les pôles, conjugués compris / · Seulement ceux des pôles de partie imaginaire positive
    = f(t) = −1/2 + t + (1/2)e^(−2t)cos(2t)   ← Deux résidus conjugués : 2 Re
  aides : f(t) est la somme des résidus de F(z)e^(zt) en tous les pôles, y compris les conjugués. | Pôles : z = 0 ou z = −2 + 2i ou z = −2 − 2i. Pôle double : d/dz[(z − z₀)²F(z)e^(zt)] en z₀. | f(t) = −1/2 + t + (1/2)e^(−2t)cos(2t)
  pièges : c_simple_formula_double, f_lap_conj_pole

Trouve f(t) = ℒ⁻¹(F)(t) par les résidus, pour F(z) = 2/(z³ − 2z² + 2z).
  [tap, suivre l'erreur, menu menu]  z³ − 2z² + 2z = 0
    = z = 0 ou z = 1 + i ou z = 1 − i   ← Pôles de F
  — Résidu de F(z)e^(zt) en z = 0 (pôle simple) :  [juge lapres]  départ : Res(0)
    = 2e^(zt)/(z² − 2z + 2)   ← en z = z₀
    = 1   ← Calculer
  — Résidu de F(z)e^(zt) en z = 1 + i (pôle simple) :  [juge lapres]  départ : Res(1 + i)
    = 2e^(zt)/(z(z − (1 − i)))   ← en z = z₀
    = (−1/2 − (1/2)i)e^((1 + i)t)   ← Calculer
  — Résidu de F(z)e^(zt) en z = 1 − i (pôle simple) :  [juge lapres]  départ : Res(1 − i)
    = 2e^(zt)/(z(z − (1 + i)))   ← en z = z₀
    = (−1/2 + (1/2)i)e^((1 − i)t)   ← Calculer
  — f(t) est la somme des résidus :  [juge transform]  départ : f(t)
    ? Quels résidus additionner ? ✔ Ceux de tous les pôles, conjugués compris / · Seulement ceux des pôles de partie imaginaire positive
    = f(t) = 1 − e^tcos(t) + e^tsin(t)   ← Deux résidus conjugués : 2 Re
  aides : f(t) est la somme des résidus de F(z)e^(zt) en tous les pôles, y compris les conjugués. | Pôles : z = 0 ou z = 1 + i ou z = 1 − i. Pôle double : d/dz[(z − z₀)²F(z)e^(zt)] en z₀. | f(t) = 1 − e^tcos(t) + e^tsin(t)
  pièges : f_lap_conj_pole

Trouve f(t) = ℒ⁻¹(F)(t) par les résidus, pour F(z) = 4/(z³ + 2z² + 2z).
  [tap, suivre l'erreur, menu menu]  z³ + 2z² + 2z = 0
    = z = 0 ou z = −1 + i ou z = −1 − i   ← Pôles de F
  — Résidu de F(z)e^(zt) en z = 0 (pôle simple) :  [juge lapres]  départ : Res(0)
    = 4e^(zt)/(z² + 2z + 2)   ← en z = z₀
    = 2   ← Calculer
  — Résidu de F(z)e^(zt) en z = −1 + i (pôle simple) :  [juge lapres]  départ : Res(−1 + i)
    = 4e^(zt)/(z(z − (−1 − i)))   ← en z = z₀
    = (−1 + i)e^((−1 + i)t)   ← Calculer
  — Résidu de F(z)e^(zt) en z = −1 − i (pôle simple) :  [juge lapres]  départ : Res(−1 − i)
    = 4e^(zt)/(z(z − (−1 + i)))   ← en z = z₀
    = (−1 − i)e^((−1 − i)t)   ← Calculer
  — f(t) est la somme des résidus :  [juge transform]  départ : f(t)
    ? Quels résidus additionner ? ✔ Ceux de tous les pôles, conjugués compris / · Seulement ceux des pôles de partie imaginaire positive
    = f(t) = 2 − 2e^(−t)cos(t) − 2e^(−t)sin(t)   ← Deux résidus conjugués : 2 Re
  aides : f(t) est la somme des résidus de F(z)e^(zt) en tous les pôles, y compris les conjugués. | Pôles : z = 0 ou z = −1 + i ou z = −1 − i. Pôle double : d/dz[(z − z₀)²F(z)e^(zt)] en z₀. | f(t) = 2 − 2e^(−t)cos(t) − 2e^(−t)sin(t)
  pièges : f_lap_conj_pole

```

### Niveau 4

```
Trouve f(t) = ℒ⁻¹(F)(t) par les résidus, pour F(z) = 1/(z⁴ − 2z³ + 2z²).
  [free, suivre l'erreur]  z⁴ − 2z³ + 2z² = 0
    = z = 0 ou z = 1 + i ou z = 1 − i   ← Pôles de F
  — Résidu de F(z)e^(zt) en z = 0 (pôle double) :  [juge lapres]  départ : Res(0)
    = d/dz (e^(zt)/(z² − 2z + 2))   ← dériver, puis z = z₀
    = 1/2 + (1/2)t   ← Calculer
  — Résidu de F(z)e^(zt) en z = 1 + i (pôle simple) :  [juge lapres]  départ : Res(1 + i)
    = e^(zt)/(z²(z − (1 − i)))   ← en z = z₀
    = −(1/4)e^((1 + i)t)   ← Calculer
  — Résidu de F(z)e^(zt) en z = 1 − i (pôle simple) :  [juge lapres]  départ : Res(1 − i)
    = e^(zt)/(z²(z − (1 + i)))   ← en z = z₀
    = −(1/4)e^((1 − i)t)   ← Calculer
  — f(t) est la somme des résidus :  [juge transform]  départ : f(t)
    = f(t) = 1/2 + (1/2)t − (1/2)e^tcos(t)   ← Deux résidus conjugués : 2 Re
  aides : f(t) est la somme des résidus de F(z)e^(zt) en tous les pôles, y compris les conjugués. | Pôles : z = 0 ou z = 1 + i ou z = 1 − i. Pôle double : d/dz[(z − z₀)²F(z)e^(zt)] en z₀. | f(t) = 1/2 + (1/2)t − (1/2)e^tcos(t)

Trouve f(t) = ℒ⁻¹(F)(t) par les résidus, pour F(z) = 8/(z⁴ + 4z³ + 8z²).
  [free, suivre l'erreur]  z⁴ + 4z³ + 8z² = 0
    = z = 0 ou z = −2 + 2i ou z = −2 − 2i   ← Pôles de F
  — Résidu de F(z)e^(zt) en z = 0 (pôle double) :  [juge lapres]  départ : Res(0)
    = d/dz (8e^(zt)/(z² + 4z + 8))   ← dériver, puis z = z₀
    = −1/2 + t   ← Calculer
  — Résidu de F(z)e^(zt) en z = −2 + 2i (pôle simple) :  [juge lapres]  départ : Res(−2 + 2i)
    = 8e^(zt)/(z²(z − (−2 − 2i)))   ← en z = z₀
    = (1/4)e^((−2 + 2i)t)   ← Calculer
  — Résidu de F(z)e^(zt) en z = −2 − 2i (pôle simple) :  [juge lapres]  départ : Res(−2 − 2i)
    = 8e^(zt)/(z²(z − (−2 + 2i)))   ← en z = z₀
    = (1/4)e^((−2 − 2i)t)   ← Calculer
  — f(t) est la somme des résidus :  [juge transform]  départ : f(t)
    = f(t) = −1/2 + t + (1/2)e^(−2t)cos(2t)   ← Deux résidus conjugués : 2 Re
  aides : f(t) est la somme des résidus de F(z)e^(zt) en tous les pôles, y compris les conjugués. | Pôles : z = 0 ou z = −2 + 2i ou z = −2 − 2i. Pôle double : d/dz[(z − z₀)²F(z)e^(zt)] en z₀. | f(t) = −1/2 + t + (1/2)e^(−2t)cos(2t)

Trouve f(t) = ℒ⁻¹(F)(t) par les résidus, pour F(z) = 2/(z³ − 2z² + z).
  [free, suivre l'erreur]  z³ − 2z² + z = 0
    = z = 1 ou z = 0   ← Pôles de F
  — Résidu de F(z)e^(zt) en z = 1 (pôle double) :  [juge lapres]  départ : Res(1)
    = d/dz (2e^(zt)/z)   ← dériver, puis z = z₀
    = −2e^t + 2te^t   ← Calculer
  — Résidu de F(z)e^(zt) en z = 0 (pôle simple) :  [juge lapres]  départ : Res(0)
    = 2e^(zt)/(z − 1)²   ← en z = z₀
    = 2   ← Calculer
  — f(t) est la somme des résidus :  [juge transform]  départ : f(t)
    = f(t) = −2e^t + 2te^t + 2   ← La somme
  aides : f(t) est la somme des résidus de F(z)e^(zt) en tous les pôles, y compris les conjugués. | Pôles : z = 1 ou z = 0. Pôle double : d/dz[(z − z₀)²F(z)e^(zt)] en z₀. | f(t) = −2e^t + 2te^t + 2

```

### Niveau 5

```
Trouve f(t) = ℒ⁻¹(F)(t) par les résidus, pour F(z) = 2/(z⁴ − 2z³ + 2z²).
  [free, sans aide]  z⁴ − 2z³ + 2z² = 0
    = z = 0 ou z = 1 + i ou z = 1 − i   ← Pôles de F
  — Résidu de F(z)e^(zt) en z = 0 (pôle double) :  [juge lapres]  départ : Res(0)
    = d/dz (2e^(zt)/(z² − 2z + 2))   ← dériver, puis z = z₀
    = 1 + t   ← Calculer
  — Résidu de F(z)e^(zt) en z = 1 + i (pôle simple) :  [juge lapres]  départ : Res(1 + i)
    = 2e^(zt)/(z²(z − (1 − i)))   ← en z = z₀
    = −(1/2)e^((1 + i)t)   ← Calculer
  — Résidu de F(z)e^(zt) en z = 1 − i (pôle simple) :  [juge lapres]  départ : Res(1 − i)
    = 2e^(zt)/(z²(z − (1 + i)))   ← en z = z₀
    = −(1/2)e^((1 − i)t)   ← Calculer
  — f(t) est la somme des résidus :  [juge transform]  départ : f(t)
    = f(t) = 1 + t − e^tcos(t)   ← Deux résidus conjugués : 2 Re

Trouve f(t) = ℒ⁻¹(F)(t) par les résidus, pour F(z) = 2/(z³ + 2z² − 4z − 8).
  [free, sans aide]  z³ + 2z² − 4z − 8 = 0
    = z = −2 ou z = 2   ← Pôles de F
  — Résidu de F(z)e^(zt) en z = −2 (pôle double) :  [juge lapres]  départ : Res(−2)
    = d/dz (2e^(zt)/(z − 2))   ← dériver, puis z = z₀
    = −(1/8)e^(−2t) − (1/2)te^(−2t)   ← Calculer
  — Résidu de F(z)e^(zt) en z = 2 (pôle simple) :  [juge lapres]  départ : Res(2)
    = 2e^(zt)/(z + 2)²   ← en z = z₀
    = (1/8)e^(2t)   ← Calculer
  — f(t) est la somme des résidus :  [juge transform]  départ : f(t)
    = f(t) = −(1/8)e^(−2t) − (1/2)te^(−2t) + (1/8)e^(2t)   ← La somme

Trouve f(t) = ℒ⁻¹(F)(t) par les résidus, pour F(z) = 1/(z³ + 2z²).
  [free, sans aide]  z³ + 2z² = 0
    = z = 0 ou z = −2   ← Pôles de F
  — Résidu de F(z)e^(zt) en z = 0 (pôle double) :  [juge lapres]  départ : Res(0)
    = d/dz (e^(zt)/(z + 2))   ← dériver, puis z = z₀
    = −1/4 + (1/2)t   ← Calculer
  — Résidu de F(z)e^(zt) en z = −2 (pôle simple) :  [juge lapres]  départ : Res(−2)
    = e^(zt)/z²   ← en z = z₀
    = (1/4)e^(−2t)   ← Calculer
  — f(t) est la somme des résidus :  [juge transform]  départ : f(t)
    = f(t) = −1/4 + (1/2)t + (1/4)e^(−2t)   ← La somme

```

### Variantes d'examen

```
Soit F(z) = 1/(z³ + z) et f = ℒ⁻¹(F). Coche les affirmations justes. (Plusieurs réponses possibles.)
  · f(t) = 1 − (1/2)e^((i)t) [f_lap_conj_pole]   ✔ L'abscisse de convergence de f est 0.   ✔ f(t) = 1 − cos(t)   · L'abscisse de convergence de f est 1. [f_lap_abscissa]   ✔ Le résidu de F(z)e^(zt) en z = 0 vaut 1.
  [examen mcq]
  pièges : f_lap_conj_pole, f_lap_abscissa

Trouve f(t) = ℒ⁻¹(F)(t) par les résidus, pour F(z) = 4/(z⁴ + 4z²).
  [problème, examen open, 5 points]
  partie 1 (Début du problème : 1 ; Résidu de F(z)e^(zt) en z = 0 (pôle double) : 1 ; Résidu de F(z)e^(zt) en z = 2i (pôle simple) : 1 ; Résidu de F(z)e^(zt) en z = −2i (pôle simple) : 1 ; f(t) est la somme des résidus : 1)
    [free, sans aide, suivre l'erreur, examen open]  z⁴ + 4z² = 0
      = z = 0 ou z = 2i ou z = −2i   ← Pôles de F
    — Résidu de F(z)e^(zt) en z = 0 (pôle double) :  [juge lapres]  départ : Res(0)
      = d/dz (4e^(zt)/(z² + 4))   ← dériver, puis z = z₀
      = t   ← Calculer
    — Résidu de F(z)e^(zt) en z = 2i (pôle simple) :  [juge lapres]  départ : Res(2i)
      = 4e^(zt)/(z²(z − (−2i)))   ← en z = z₀
      = ((1/4)i)e^((2i)t)   ← Calculer
    — Résidu de F(z)e^(zt) en z = −2i (pôle simple) :  [juge lapres]  départ : Res(−2i)
      = 4e^(zt)/(z²(z − (2i)))   ← en z = z₀
      = (−(1/4)i)e^((−2i)t)   ← Calculer
    — f(t) est la somme des résidus :  [juge transform]  départ : f(t)
      = f(t) = t − (1/2)sin(2t)   ← Deux résidus conjugués : 2 Re

```

## EDO avec conditions initiales par Laplace (`f-lap-ode`, BA4)

_Transformer avec ℒ(y″) = z²Y − z y(0) − y′(0), isoler Y, inverser._

### Niveau 1

```
Résous par la transformée de Laplace : y″ + 4y′ + 8y = 2e^(−2t), y(0) = 0, y′(0) = 1.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  Y = ℒ(y)
    (ℒ(y″) = z²Y − z y(0) − y′(0), ℒ(y′) = zY − y(0).)
    = □ − 1 + 4zY + 8Y = 2/(z + 2)   (trous : z²Y − 1 + 4zY + 8Y = 2/(z + 2))   ← Transformer (LP2)
    = Y = (z + 4)/((z² + 4z + 8)(z + 2))   ← Isoler Y
  — Puis on inverse :  [juge transform]  départ : Y = (z + 4)/((z² + 4z + 8)(z + 2))
    = Y = −(1/2)z/((z + 2)² + 4) + 1/(2(z + 2))   ← Éléments simples
    = y(t) = −(1/2)e^(−2t)cos(2t) + (1/2)e^(−2t)sin(2t) + (1/2)e^(−2t)   ← Table
  aides : ℒ(y″) = z²Y − z y(0) − y′(0) : transforme l'équation, isole Y, décompose et inverse. | z²Y − 1 + 4zY + 8Y = 2/(z + 2) | Y = −(1/2)z/((z + 2)² + 4) + 1/(2(z + 2))
  pièges : f_lap_shift_sign, f_lap_deriv_ic

Résous par la transformée de Laplace : y″ + y = 2e^(−2t), y(0) = 2, y′(0) = −2.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  Y = ℒ(y)
    (ℒ(y″) = z²Y − z y(0) − y′(0), ℒ(y′) = zY − y(0).)
    = □ − 2z + 2 + Y = 2/(z + 2)   (trous : z²Y − 2z + 2 + Y = 2/(z + 2))   ← Transformer (LP2)
    = Y = (2z² + 2z − 2)/((z² + 1)(z + 2))   ← Isoler Y
  — Puis on inverse :  [juge transform]  départ : Y = (2z² + 2z − 2)/((z² + 1)(z + 2))
    = Y = ((8/5)z − 6/5)/(z² + 1) + 2/(5(z + 2))   ← Éléments simples
    = y(t) = (8/5)cos(t) − (6/5)sin(t) + (2/5)e^(−2t)   ← Table
  aides : ℒ(y″) = z²Y − z y(0) − y′(0) : transforme l'équation, isole Y, décompose et inverse. | z²Y − 2z + 2 + Y = 2/(z + 2) | Y = ((8/5)z − 6/5)/(z² + 1) + 2/(5(z + 2))
  pièges : f_lap_shift_sign, f_lap_deriv_ic

Résous par la transformée de Laplace : y″ + 2y′ + y = 6, y(0) = 0, y′(0) = −2.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  Y = ℒ(y)
    (ℒ(y″) = z²Y − z y(0) − y′(0), ℒ(y′) = zY − y(0).)
    = □ + 2 + 2zY + Y = 6/z   (trous : z²Y + 2 + 2zY + Y = 6/z)   ← Transformer (LP2)
    = Y = (−2z + 6)/((z + 1)²z)   ← Isoler Y
  — Puis on inverse :  [juge transform]  départ : Y = (−2z + 6)/((z + 1)²z)
    = Y = −6/(z + 1) − 8/(z + 1)² + 6/z   ← Éléments simples
    = y(t) = −6e^(−t) − 8te^(−t) + 6   ← Table
  aides : ℒ(y″) = z²Y − z y(0) − y′(0) : transforme l'équation, isole Y, décompose et inverse. | z²Y + 2 + 2zY + Y = 6/z | Y = −6/(z + 1) − 8/(z + 1)² + 6/z
  pièges : f_lap_shift_sign, f_lap_deriv_ic

```

### Niveau 2

```
Résous par la transformée de Laplace : y″ + 2y′ + 2y = 1, y(0) = 2, y′(0) = 1.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  Y = ℒ(y)
    = □ = 1/z   (trous : z²Y − 2z − 1 + 2(zY − 2) + 2Y = 1/z)   ← Transformer (LP2)
    = Y = □   (trous : Y = (2z² + 5z + 1)/((z² + 2z + 2)z))   ← Isoler Y
  — Puis on inverse :  [juge transform]  départ : Y = (2z² + 5z + 1)/((z² + 2z + 2)z)
    = Y = □   (trous : Y = ((3/2)z + 4)/((z + 1)² + 1) + 1/(2z))   ← Éléments simples
    = y(t) = □   (trous : y(t) = (3/2)e^(−t)cos(t) + (5/2)e^(−t)sin(t) + 1/2)   ← Table
  aides : ℒ(y″) = z²Y − z y(0) − y′(0) : transforme l'équation, isole Y, décompose et inverse. | z²Y − 2z − 1 + 2(zY − 2) + 2Y = 1/z | Y = ((3/2)z + 4)/((z + 1)² + 1) + 1/(2z)
  pièges : f_lap_shift_sign, f_lap_deriv_ic

Résous par la transformée de Laplace : y″ + 6y′ + 9y = 6, y(0) = 0, y′(0) = −2.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  Y = ℒ(y)
    = □ = 6/z   (trous : z²Y + 2 + 6zY + 9Y = 6/z)   ← Transformer (LP2)
    = Y = □   (trous : Y = (−2z + 6)/((z + 3)²z))   ← Isoler Y
  — Puis on inverse :  [juge transform]  départ : Y = (−2z + 6)/((z + 3)²z)
    = Y = □   (trous : Y = −2/(3(z + 3)) − 4/(z + 3)² + 2/(3z))   ← Éléments simples
    = y(t) = □   (trous : y(t) = −(2/3)e^(−3t) − 4te^(−3t) + 2/3)   ← Table
  aides : ℒ(y″) = z²Y − z y(0) − y′(0) : transforme l'équation, isole Y, décompose et inverse. | z²Y + 2 + 6zY + 9Y = 6/z | Y = −2/(3(z + 3)) − 4/(z + 3)² + 2/(3z)
  pièges : f_lap_shift_sign, f_lap_deriv_ic

Résous par la transformée de Laplace : y″ + 4y′ + 5y = 6, y(0) = 0, y′(0) = −2.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  Y = ℒ(y)
    = □ = 6/z   (trous : z²Y + 2 + 4zY + 5Y = 6/z)   ← Transformer (LP2)
    = Y = □   (trous : Y = (−2z + 6)/((z² + 4z + 5)z))   ← Isoler Y
  — Puis on inverse :  [juge transform]  départ : Y = (−2z + 6)/((z² + 4z + 5)z)
    = Y = □   (trous : Y = (−(6/5)z − 34/5)/((z + 2)² + 1) + 6/(5z))   ← Éléments simples
    = y(t) = □   (trous : y(t) = −(6/5)e^(−2t)cos(t) − (22/5)e^(−2t)sin(t) + 6/5)   ← Table
  aides : ℒ(y″) = z²Y − z y(0) − y′(0) : transforme l'équation, isole Y, décompose et inverse. | z²Y + 2 + 4zY + 5Y = 6/z | Y = (−(6/5)z − 34/5)/((z + 2)² + 1) + 6/(5z)
  pièges : f_lap_shift_sign, f_lap_deriv_ic

```

### Niveau 3

```
Résous par la transformée de Laplace : y″ + 2y′ + y = 4, y(0) = −1, y′(0) = 1.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [tap, suivre l'erreur, menu menu]  Y = ℒ(y)
    ? ℒ(y″) = ? ✔ z²Y − z y(0) − y′(0) / · z²Y − y(0) − z y′(0)
    = z²Y + z − 1 + 2(zY + 1) + Y = 4/z   ← Transformer (LP2)
    = Y = (−z² − z + 4)/((z + 1)²z)   ← Isoler Y
  — Puis on inverse :  [juge transform]  départ : Y = (−z² − z + 4)/((z + 1)²z)
    ? Comment inverser ? ✔ Éléments simples, puis la table / ✔ Somme des résidus de Y(z)e^(zt) / · Inverser le numérateur et le dénominateur séparément
    = Y = −5/(z + 1) − 4/(z + 1)² + 4/z   ← Éléments simples
    = y(t) = −5e^(−t) − 4te^(−t) + 4   ← Table
  aides : ℒ(y″) = z²Y − z y(0) − y′(0) : transforme l'équation, isole Y, décompose et inverse. | z²Y + z − 1 + 2(zY + 1) + Y = 4/z | Y = −5/(z + 1) − 4/(z + 1)² + 4/z
  pièges : f_lap_shift_sign, f_lap_deriv_ic

Résous par la transformée de Laplace : y″ + 5y′ + 6y = 1, y(0) = 1, y′(0) = −2.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [tap, suivre l'erreur, menu menu]  Y = ℒ(y)
    ? ℒ(y″) = ? ✔ z²Y − z y(0) − y′(0) / · z²Y − y(0) − z y′(0)
    = z²Y − z + 2 + 5(zY − 1) + 6Y = 1/z   ← Transformer (LP2)
    = Y = (z² + 3z + 1)/((z + 3)(z + 2)z)   ← Isoler Y
  — Puis on inverse :  [juge transform]  départ : Y = (z² + 3z + 1)/((z + 3)(z + 2)z)
    ? Comment inverser ? ✔ Éléments simples, puis la table / ✔ Somme des résidus de Y(z)e^(zt) / · Inverser le numérateur et le dénominateur séparément
    = Y = 1/(3(z + 3)) + 1/(2(z + 2)) + 1/(6z)   ← Éléments simples
    = y(t) = (1/3)e^(−3t) + (1/2)e^(−2t) + 1/6   ← Table
  aides : ℒ(y″) = z²Y − z y(0) − y′(0) : transforme l'équation, isole Y, décompose et inverse. | z²Y − z + 2 + 5(zY − 1) + 6Y = 1/z | Y = 1/(3(z + 3)) + 1/(2(z + 2)) + 1/(6z)
  pièges : f_lap_shift_sign, f_lap_deriv_ic

Résous par la transformée de Laplace : y″ + 2y′ + y = 3cos(t), y(0) = 1, y′(0) = 0.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [tap, suivre l'erreur, menu menu]  Y = ℒ(y)
    ? ℒ(y″) = ? ✔ z²Y − z y(0) − y′(0) / · z²Y − y(0) − z y′(0)
    = z²Y − z + 2(zY − 1) + Y = 3z/(z² + 1)   ← Transformer (LP2)
    = Y = (z³ + 2z² + 4z + 2)/((z + 1)²(z² + 1))   ← Isoler Y
  — Puis on inverse :  [juge transform]  départ : Y = (z³ + 2z² + 4z + 2)/((z + 1)²(z² + 1))
    ? Comment inverser ? ✔ Éléments simples, puis la table / ✔ Somme des résidus de Y(z)e^(zt) / · Inverser le numérateur et le dénominateur séparément
    = Y = 1/(z + 1) − 1/(2(z + 1)²) + (3/2)/(z² + 1)   ← Éléments simples
    = y(t) = e^(−t) − (1/2)te^(−t) + (3/2)sin(t)   ← Table
  aides : ℒ(y″) = z²Y − z y(0) − y′(0) : transforme l'équation, isole Y, décompose et inverse. | z²Y − z + 2(zY − 1) + Y = 3z/(z² + 1) | Y = 1/(z + 1) − 1/(2(z + 1)²) + (3/2)/(z² + 1)
  pièges : f_lap_shift_sign, f_lap_deriv_ic

```

### Niveau 4

```
Résous par la transformée de Laplace : y″ + 6y′ + 9y = 3, y(0) = 2, y′(0) = 1.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, suivre l'erreur]  Y = ℒ(y)
    = z²Y − 2z − 1 + 6(zY − 2) + 9Y = 3/z   ← Transformer (LP2)
    = Y = (2z² + 13z + 3)/((z + 3)²z)   ← Isoler Y
  — Puis on inverse :  [juge transform]  départ : Y = (2z² + 13z + 3)/((z + 3)²z)
    = Y = 5/(3(z + 3)) + 6/(z + 3)² + 1/(3z)   ← Éléments simples
    = y(t) = (5/3)e^(−3t) + 6te^(−3t) + 1/3   ← Table
  aides : ℒ(y″) = z²Y − z y(0) − y′(0) : transforme l'équation, isole Y, décompose et inverse. | z²Y − 2z − 1 + 6(zY − 2) + 9Y = 3/z | Y = 5/(3(z + 3)) + 6/(z + 3)² + 1/(3z)
  pièges : f_lap_shift_sign, f_lap_deriv_ic

Résous par la transformée de Laplace : y″ + 2y′ − 3y = 1, y(0) = 1, y′(0) = 0.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, suivre l'erreur]  Y = ℒ(y)
    = z²Y − z + 2(zY − 1) − 3Y = 1/z   ← Transformer (LP2)
    = Y = (z² + 2z + 1)/((z + 3)(z − 1)z)   ← Isoler Y
  — Puis on inverse :  [juge transform]  départ : Y = (z² + 2z + 1)/((z + 3)(z − 1)z)
    = Y = 1/(3(z + 3)) + 1/(z − 1) − 1/(3z)   ← Éléments simples
    = y(t) = (1/3)e^(−3t) + e^t − 1/3   ← Table
  aides : ℒ(y″) = z²Y − z y(0) − y′(0) : transforme l'équation, isole Y, décompose et inverse. | z²Y − z + 2(zY − 1) − 3Y = 1/z | Y = 1/(3(z + 3)) + 1/(z − 1) − 1/(3z)
  pièges : f_lap_shift_sign, f_lap_deriv_ic

Résous par la transformée de Laplace : y″ + 3y′ = 2e^t, y(0) = −1, y′(0) = −2.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, suivre l'erreur]  Y = ℒ(y)
    = z²Y + z + 2 + 3(zY + 1) = 2/(z − 1)   ← Transformer (LP2)
    = Y = (−z² − 4z + 7)/(z(z + 3)(z − 1))   ← Isoler Y
  — Puis on inverse :  [juge transform]  départ : Y = (−z² − 4z + 7)/(z(z + 3)(z − 1))
    = Y = −7/(3z) + 5/(6(z + 3)) + 1/(2(z − 1))   ← Éléments simples
    = y(t) = −7/3 + (5/6)e^(−3t) + (1/2)e^t   ← Table
  aides : ℒ(y″) = z²Y − z y(0) − y′(0) : transforme l'équation, isole Y, décompose et inverse. | z²Y + z + 2 + 3(zY + 1) = 2/(z − 1) | Y = −7/(3z) + 5/(6(z + 3)) + 1/(2(z − 1))
  pièges : f_lap_shift_sign, f_lap_deriv_ic

```

### Niveau 5

```
Résous par la transformée de Laplace : y‴ + 3y″ + 3y′ + y = −6e^(−t), y(0) = 0, y′(0) = 1, y″(0) = 0.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, sans aide]  Y = ℒ(y)
    = z³Y − z + 3(z²Y − 1) + 3zY + Y = −6/(z + 1)   ← Transformer (LP2)
    = Y = (z² + 4z − 3)/((z + 1)⁴)   ← Isoler Y
  — Puis on inverse :  [juge transform]  départ : Y = (z² + 4z − 3)/((z + 1)⁴)
    = Y = 1/(z + 1)² + 2/(z + 1)³ − 6/(z + 1)⁴   ← Éléments simples
    = y(t) = te^(−t) + t²e^(−t) − t³e^(−t)   ← Table
  pièges : f_lap_shift_sign, f_lap_deriv_ic

Résous par la transformée de Laplace : y⁽⁴⁾ − 16y = 0, y(0) = 2, y′(0) = 2, y″(0) = −4, y‴(0) = 8.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, sans aide]  Y = ℒ(y)
    = z⁴Y − 2z³ − 2z² + 4z − 8 − 16Y = 0   ← Transformer (LP2)
    = Y = (2z³ + 2z² − 4z + 8)/((z − 2)(z + 2)(z² + 4))   ← Isoler Y
  — Puis on inverse :  [juge transform]  départ : Y = (2z³ + 2z² − 4z + 8)/((z − 2)(z + 2)(z² + 4))
    = Y = 3/(4(z − 2)) − 1/(4(z + 2)) + (3/2)z/(z² + 4)   ← Éléments simples
    = y(t) = (3/4)e^(2t) − (1/4)e^(−2t) + (3/2)cos(2t)   ← Table
  pièges : f_lap_shift_sign, f_lap_deriv_ic

Résous par la transformée de Laplace : y⁽⁴⁾ − y = 0, y(0) = 0, y′(0) = 2, y″(0) = 0, y‴(0) = 0.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, sans aide]  Y = ℒ(y)
    = z⁴Y − 2z² − Y = 0   ← Transformer (LP2)
    = Y = (2z²)/((z − 1)(z + 1)(z² + 1))   ← Isoler Y
  — Puis on inverse :  [juge transform]  départ : Y = (2z²)/((z − 1)(z + 1)(z² + 1))
    = Y = 1/(2(z − 1)) − 1/(2(z + 1)) + 1/(z² + 1)   ← Éléments simples
    = y(t) = (1/2)e^t − (1/2)e^(−t) + sin(t)   ← Table
  pièges : f_lap_shift_sign, f_lap_deriv_ic

```

### Variantes d'examen

```
On résout y″ + y′ − 2y = 3, y(0) = 2, y′(0) = 0 par Laplace (Y = ℒ(y)). Coche les affirmations justes.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0 (Plusieurs réponses possibles.)
  ✔ z²Y − 2z + zY − 2 − 2Y = 3/z   ✔ Y = (2z² + 2z + 3)/((z − 1)(z + 2)z)   · z²Y − 2 + zY − 2 − 2Y = 3/z [f_lap_deriv_ic]   · y(t) = (7/3)e^(−t) + (7/6)e^(2t) − 3/2 [f_lap_shift_sign]   ✔ y(t) = (7/3)e^t + (7/6)e^(−2t) − 3/2
  [examen mcq]
  pièges : f_lap_deriv_ic, f_lap_shift_sign

Résous par la transformée de Laplace : y″ + y = cos(2t), y(0) = 1, y′(0) = 0.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [problème, examen open, 6 points]
  partie 1 (Début du problème : 3 ; Puis on inverse : 3)
    [free, sans aide, suivre l'erreur, examen open]  Y = ℒ(y)
      = z²Y − z + Y = z/(z² + 4)   ← Transformer (LP2)
      = Y = (z³ + 5z)/((z² + 1)(z² + 4))   ← Isoler Y
    — Puis on inverse :  [juge transform]  départ : Y = (z³ + 5z)/((z² + 1)(z² + 4))
      = Y = (4/3)z/(z² + 1) − (1/3)z/(z² + 4)   ← Éléments simples
      = y(t) = (4/3)cos(t) − (1/3)cos(2t)   ← Table
  pièges : f_lap_deriv_ic

```

## Équations intégro-différentielles (GM) (`f-lap-integro`, BA4)

_∫₀ᵗ u(s)g(t − s) ds = (u ∗ g)(t) se transforme en U(z)G(z) : transformer, isoler U, inverser._

### Niveau 1

```
Résous par la transformée de Laplace : u′(t) + u(t) + 2 ∫₀ᵗ u(s) e^(t − s) ds = 4e^t, u(0) = 2.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  ℒ(e^t)
    (L'intégrale est la convolution (u ∗ g)(t) avec le noyau g(t) = e^t : ℒ(u ∗ g) = U(z)G(z).)
    = 1/(□)   (trous : 1/(z − 1))   ← Ligne L3
  — Transforme l'équation (LP2, LP6), puis isole U :  [juge transform]  départ : U = ℒ(u)
    = □ + U + 2U/(z − 1) = 4/(z − 1)   (trous : zU − 2 + U + 2U/(z − 1) = 4/(z − 1))   ← Transformer
    = U = (2z + 2)/(z² + 1)   ← Isoler U : (z − 1)(z + 1) + 2 = z² + 1
  — Puis on inverse :  [juge transform]  départ : U = (2z + 2)/(z² + 1)
    = u(t) = 2cos(t) + □   (trous : u(t) = 2cos(t) + 2sin(t))   ← Lignes L5 et L4
  aides : L'intégrale est une convolution : ℒ(u ∗ g) = U(z)G(z). | ℒ(e^t) = 1/(z − 1) | zU − 2 + U + 2U/(z − 1) = 4/(z − 1)
  pièges : f_lap_integro_kernel

Résous par la transformée de Laplace : u′(t) + 3u(t) + 25 ∫₀ᵗ u(s) e^(3(t − s)) ds = 18e^(3t), u(0) = 2.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  ℒ(e^(3t))
    (L'intégrale est la convolution (u ∗ g)(t) avec le noyau g(t) = e^(3t) : ℒ(u ∗ g) = U(z)G(z).)
    = 1/(□)   (trous : 1/(z − 3))   ← Ligne L3
  — Transforme l'équation (LP2, LP6), puis isole U :  [juge transform]  départ : U = ℒ(u)
    = □ + 3U + 25U/(z − 3) = 18/(z − 3)   (trous : zU − 2 + 3U + 25U/(z − 3) = 18/(z − 3))   ← Transformer
    = U = (2z + 12)/(z² + 16)   ← Isoler U : (z − 3)(z + 3) + 25 = z² + 16
  — Puis on inverse :  [juge transform]  départ : U = (2z + 12)/(z² + 16)
    = u(t) = 2cos(4t) + □   (trous : u(t) = 2cos(4t) + 3sin(4t))   ← Lignes L5 et L4
  aides : L'intégrale est une convolution : ℒ(u ∗ g) = U(z)G(z). | ℒ(e^(3t)) = 1/(z − 3) | zU − 2 + 3U + 25U/(z − 3) = 18/(z − 3)
  pièges : f_lap_integro_kernel

Résous par la transformée de Laplace : u′(t) − 2u(t) + 20 ∫₀ᵗ u(s) e^(−2(t − s)) ds = −6e^(−2t), u(0) = −1.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  ℒ(e^(-2t))
    (L'intégrale est la convolution (u ∗ g)(t) avec le noyau g(t) = e^(−2t) : ℒ(u ∗ g) = U(z)G(z).)
    = 1/(□)   (trous : 1/(z + 2))   ← Ligne L3
  — Transforme l'équation (LP2, LP6), puis isole U :  [juge transform]  départ : U = ℒ(u)
    = □ − 2U + 20U/(z + 2) = −6/(z + 2)   (trous : zU + 1 − 2U + 20U/(z + 2) = −6/(z + 2))   ← Transformer
    = U = (−z − 8)/(z² + 16)   ← Isoler U : (z + 2)(z − 2) + 20 = z² + 16
  — Puis on inverse :  [juge transform]  départ : U = (−z − 8)/(z² + 16)
    = u(t) = −cos(4t)□   (trous : u(t) = −cos(4t) − 2sin(4t))   ← Lignes L5 et L4
  aides : L'intégrale est une convolution : ℒ(u ∗ g) = U(z)G(z). | ℒ(e^(−2t)) = 1/(z + 2) | zU + 1 − 2U + 20U/(z + 2) = −6/(z + 2)
  pièges : f_lap_integro_kernel

```

### Niveau 2

```
Résous par la transformée de Laplace : u′(t) − 2u(t) + 20 ∫₀ᵗ u(s) e^(−2(t − s)) ds = 2e^(−2t), u(0) = 1.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  ℒ(e^(-2t))
    ? Quel est le noyau g de la convolution ? ✔ g(t) = e^(−2t) / · g(t) = e^(2t) / · g(t) = 20e^(−2t)u(t)
    = 1/(□)   (trous : 1/(z + 2))   ← Ligne L3
  — Transforme l'équation (LP2, LP6), puis isole U :  [juge transform]  départ : U = ℒ(u)
    = □ = 2/(z + 2)   (trous : zU − 1 − 2U + 20U/(z + 2) = 2/(z + 2))   ← Transformer
    = U = □   (trous : U = (z + 4)/(z² + 16))   ← Isoler U : (z + 2)(z − 2) + 20 = z² + 16
  — Puis on inverse :  [juge transform]  départ : U = (z + 4)/(z² + 16)
    = u(t) = □   (trous : u(t) = cos(4t) + sin(4t))   ← Lignes L5 et L4
  aides : L'intégrale est une convolution : ℒ(u ∗ g) = U(z)G(z). | ℒ(e^(−2t)) = 1/(z + 2) | zU − 1 − 2U + 20U/(z + 2) = 2/(z + 2)
  pièges : f_lap_integro_kernel

Résous par la transformée de Laplace : u′(t) − 2u(t) + 5 ∫₀ᵗ u(s) e^(−2(t − s)) ds = −3e^(−2t), u(0) = 3.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  ℒ(e^(-2t))
    ? Quel est le noyau g de la convolution ? ✔ g(t) = e^(−2t) / · g(t) = e^(2t) / · g(t) = 5e^(−2t)u(t)
    = 1/(□)   (trous : 1/(z + 2))   ← Ligne L3
  — Transforme l'équation (LP2, LP6), puis isole U :  [juge transform]  départ : U = ℒ(u)
    = □ = −3/(z + 2)   (trous : zU − 3 − 2U + 5U/(z + 2) = −3/(z + 2))   ← Transformer
    = U = □   (trous : U = (3z + 3)/(z² + 1))   ← Isoler U : (z + 2)(z − 2) + 5 = z² + 1
  — Puis on inverse :  [juge transform]  départ : U = (3z + 3)/(z² + 1)
    = u(t) = □   (trous : u(t) = 3cos(t) + 3sin(t))   ← Lignes L5 et L4
  aides : L'intégrale est une convolution : ℒ(u ∗ g) = U(z)G(z). | ℒ(e^(−2t)) = 1/(z + 2) | zU − 3 − 2U + 5U/(z + 2) = −3/(z + 2)
  pièges : f_lap_integro_kernel

Résous par la transformée de Laplace : u′(t) − u(t) + 2 ∫₀ᵗ u(s) e^(−(t − s)) ds = 2e^(−t), u(0) = 1.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  ℒ(e^(-t))
    ? Quel est le noyau g de la convolution ? ✔ g(t) = e^(−t) / · g(t) = e^t / · g(t) = 2e^(−t)u(t)
    = 1/(□)   (trous : 1/(z + 1))   ← Ligne L3
  — Transforme l'équation (LP2, LP6), puis isole U :  [juge transform]  départ : U = ℒ(u)
    = □ = 2/(z + 1)   (trous : zU − 1 − U + 2U/(z + 1) = 2/(z + 1))   ← Transformer
    = U = □   (trous : U = (z + 3)/(z² + 1))   ← Isoler U : (z + 1)(z − 1) + 2 = z² + 1
  — Puis on inverse :  [juge transform]  départ : U = (z + 3)/(z² + 1)
    = u(t) = □   (trous : u(t) = cos(t) + 3sin(t))   ← Lignes L5 et L4
  aides : L'intégrale est une convolution : ℒ(u ∗ g) = U(z)G(z). | ℒ(e^(−t)) = 1/(z + 1) | zU − 1 − U + 2U/(z + 1) = 2/(z + 1)
  pièges : f_lap_integro_kernel

```

### Niveau 3

```
Résous par la transformée de Laplace : u′(t) + 2u(t) + 20 ∫₀ᵗ u(s) e^(2(t − s)) ds = 14e^(2t), u(0) = 3.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [tap, suivre l'erreur, menu menu]  ℒ(e^(2t))
    ? Quel est le noyau g de la convolution ? ✔ g(t) = e^(2t) / · g(t) = e^(−2t) / · g(t) = 20e^(2t)u(t)
    = 1/(z − 2)   ← Ligne L3
  — Transforme l'équation (LP2, LP6), puis isole U :  [juge transform]  départ : U = ℒ(u)
    ? Que devient l'intégrale ? ✔ 20U(z)G(z) (LP6, convolution) / · 20U(z)/z (LP3, primitive)
    = zU − 3 + 2U + 20U/(z − 2) = 14/(z − 2)   ← Transformer
    = U = (3z + 8)/(z² + 16)   ← Isoler U : (z − 2)(z + 2) + 20 = z² + 16
  — Puis on inverse :  [juge transform]  départ : U = (3z + 8)/(z² + 16)
    = u(t) = 3cos(4t) + 2sin(4t)   ← Lignes L5 et L4
  aides : L'intégrale est une convolution : ℒ(u ∗ g) = U(z)G(z). | ℒ(e^(2t)) = 1/(z − 2) | zU − 3 + 2U + 20U/(z − 2) = 14/(z − 2)
  pièges : f_lap_integro_kernel

Résous par la transformée de Laplace : u′(t) + 3u(t) + 25 ∫₀ᵗ u(s) e^(3(t − s)) ds = e^(3t), u(0) = −1.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [tap, suivre l'erreur, menu menu]  ℒ(e^(3t))
    ? Quel est le noyau g de la convolution ? ✔ g(t) = e^(3t) / · g(t) = e^(−3t) / · g(t) = 25e^(3t)u(t)
    = 1/(z − 3)   ← Ligne L3
  — Transforme l'équation (LP2, LP6), puis isole U :  [juge transform]  départ : U = ℒ(u)
    ? Que devient l'intégrale ? ✔ 25U(z)G(z) (LP6, convolution) / · 25U(z)/z (LP3, primitive)
    = zU + 1 + 3U + 25U/(z − 3) = 1/(z − 3)   ← Transformer
    = U = (−z + 4)/(z² + 16)   ← Isoler U : (z − 3)(z + 3) + 25 = z² + 16
  — Puis on inverse :  [juge transform]  départ : U = (−z + 4)/(z² + 16)
    = u(t) = −cos(4t) + sin(4t)   ← Lignes L5 et L4
  aides : L'intégrale est une convolution : ℒ(u ∗ g) = U(z)G(z). | ℒ(e^(3t)) = 1/(z − 3) | zU + 1 + 3U + 25U/(z − 3) = 1/(z − 3)
  pièges : f_lap_integro_kernel

Résous par la transformée de Laplace : u′(t) + 2u(t) + 5 ∫₀ᵗ u(s) e^(2(t − s)) ds = −3e^(2t), u(0) = −1.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [tap, suivre l'erreur, menu menu]  ℒ(e^(2t))
    ? Quel est le noyau g de la convolution ? ✔ g(t) = e^(2t) / · g(t) = e^(−2t) / · g(t) = 5e^(2t)u(t)
    = 1/(z − 2)   ← Ligne L3
  — Transforme l'équation (LP2, LP6), puis isole U :  [juge transform]  départ : U = ℒ(u)
    ? Que devient l'intégrale ? ✔ 5U(z)G(z) (LP6, convolution) / · 5U(z)/z (LP3, primitive)
    = zU + 1 + 2U + 5U/(z − 2) = −3/(z − 2)   ← Transformer
    = U = (−z − 1)/(z² + 1)   ← Isoler U : (z − 2)(z + 2) + 5 = z² + 1
  — Puis on inverse :  [juge transform]  départ : U = (−z − 1)/(z² + 1)
    = u(t) = −cos(t) − sin(t)   ← Lignes L5 et L4
  aides : L'intégrale est une convolution : ℒ(u ∗ g) = U(z)G(z). | ℒ(e^(2t)) = 1/(z − 2) | zU + 1 + 2U + 5U/(z − 2) = −3/(z − 2)
  pièges : f_lap_integro_kernel

```

### Niveau 4

```
Résous par la transformée de Laplace : u′(t) − u(t) + 10 ∫₀ᵗ u(s) e^(−(t − s)) ds = −5e^(−t), u(0) = 2.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, suivre l'erreur]  ℒ(e^(-t))
    = 1/(z + 1)   ← Ligne L3
  — Transforme l'équation (LP2, LP6), puis isole U :  [juge transform]  départ : U = ℒ(u)
    = zU − 2 − U + 10U/(z + 1) = −5/(z + 1)   ← Transformer
    = U = (2z − 3)/(z² + 9)   ← Isoler U : (z + 1)(z − 1) + 10 = z² + 9
  — Puis on inverse :  [juge transform]  départ : U = (2z − 3)/(z² + 9)
    = u(t) = 2cos(3t) − sin(3t)   ← Lignes L5 et L4
  aides : L'intégrale est une convolution : ℒ(u ∗ g) = U(z)G(z). | ℒ(e^(−t)) = 1/(z + 1) | zU − 2 − U + 10U/(z + 1) = −5/(z + 1)
  pièges : f_lap_integro_kernel

Résous par la transformée de Laplace : u′(t) − 2u(t) + 13 ∫₀ᵗ u(s) e^(−2(t − s)) ds = −12e^(−2t), u(0) = 3.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, suivre l'erreur]  ℒ(e^(-2t))
    = 1/(z + 2)   ← Ligne L3
  — Transforme l'équation (LP2, LP6), puis isole U :  [juge transform]  départ : U = ℒ(u)
    = zU − 3 − 2U + 13U/(z + 2) = −12/(z + 2)   ← Transformer
    = U = (3z − 6)/(z² + 9)   ← Isoler U : (z + 2)(z − 2) + 13 = z² + 9
  — Puis on inverse :  [juge transform]  départ : U = (3z − 6)/(z² + 9)
    = u(t) = 3cos(3t) − 2sin(3t)   ← Lignes L5 et L4
  aides : L'intégrale est une convolution : ℒ(u ∗ g) = U(z)G(z). | ℒ(e^(−2t)) = 1/(z + 2) | zU − 3 − 2U + 13U/(z + 2) = −12/(z + 2)
  pièges : f_lap_integro_kernel

Résous par la transformée de Laplace : u′(t) + 2u(t) + 13 ∫₀ᵗ u(s) e^(2(t − s)) ds = −5e^(2t), u(0) = −1.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, suivre l'erreur]  ℒ(e^(2t))
    = 1/(z − 2)   ← Ligne L3
  — Transforme l'équation (LP2, LP6), puis isole U :  [juge transform]  départ : U = ℒ(u)
    = zU + 1 + 2U + 13U/(z − 2) = −5/(z − 2)   ← Transformer
    = U = (−z − 3)/(z² + 9)   ← Isoler U : (z − 2)(z + 2) + 13 = z² + 9
  — Puis on inverse :  [juge transform]  départ : U = (−z − 3)/(z² + 9)
    = u(t) = −cos(3t) − sin(3t)   ← Lignes L5 et L4
  aides : L'intégrale est une convolution : ℒ(u ∗ g) = U(z)G(z). | ℒ(e^(2t)) = 1/(z − 2) | zU + 1 + 2U + 13U/(z − 2) = −5/(z − 2)
  pièges : f_lap_integro_kernel

```

### Niveau 5

```
Résous par la transformée de Laplace : u′(t) + u(t) + 2 ∫₀ᵗ u(s) e^(t − s) ds = 2e^t, u(0) = 1.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [problème, 3 points]
  partie 1 (Début du problème : 1 ; Transforme l'équation (LP2, LP6), puis isole U : 1 ; Puis on inverse : 1)
    [free, sans aide, suivre l'erreur]  ℒ(e^t)
      = 1/(z − 1)   ← Ligne L3
    — Transforme l'équation (LP2, LP6), puis isole U :  [juge transform]  départ : U = ℒ(u)
      = zU − 1 + U + 2U/(z − 1) = 2/(z − 1)   ← Transformer
      = U = (z + 1)/(z² + 1)   ← Isoler U : (z − 1)(z + 1) + 2 = z² + 1
    — Puis on inverse :  [juge transform]  départ : U = (z + 1)/(z² + 1)
      = u(t) = cos(t) + sin(t)   ← Lignes L5 et L4
  pièges : f_lap_integro_kernel

Résous par la transformée de Laplace : u′(t) + 3u(t) + 13 ∫₀ᵗ u(s) e^(3(t − s)) ds = −7e^(3t), u(0) = −1.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [problème, 3 points]
  partie 1 (Début du problème : 1 ; Transforme l'équation (LP2, LP6), puis isole U : 1 ; Puis on inverse : 1)
    [free, sans aide, suivre l'erreur]  ℒ(e^(3t))
      = 1/(z − 3)   ← Ligne L3
    — Transforme l'équation (LP2, LP6), puis isole U :  [juge transform]  départ : U = ℒ(u)
      = zU + 1 + 3U + 13U/(z − 3) = −7/(z − 3)   ← Transformer
      = U = (−z − 4)/(z² + 4)   ← Isoler U : (z − 3)(z + 3) + 13 = z² + 4
    — Puis on inverse :  [juge transform]  départ : U = (−z − 4)/(z² + 4)
      = u(t) = −cos(2t) − 2sin(2t)   ← Lignes L5 et L4
  pièges : f_lap_integro_kernel

Résous par la transformée de Laplace : u′(t) + u(t) + 17 ∫₀ᵗ u(s) e^(t − s) ds = 7e^t, u(0) = 3.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [problème, 3 points]
  partie 1 (Début du problème : 1 ; Transforme l'équation (LP2, LP6), puis isole U : 1 ; Puis on inverse : 1)
    [free, sans aide, suivre l'erreur]  ℒ(e^t)
      = 1/(z − 1)   ← Ligne L3
    — Transforme l'équation (LP2, LP6), puis isole U :  [juge transform]  départ : U = ℒ(u)
      = zU − 3 + U + 17U/(z − 1) = 7/(z − 1)   ← Transformer
      = U = (3z + 4)/(z² + 16)   ← Isoler U : (z − 1)(z + 1) + 17 = z² + 16
    — Puis on inverse :  [juge transform]  départ : U = (3z + 4)/(z² + 16)
      = u(t) = 3cos(4t) + sin(4t)   ← Lignes L5 et L4
  pièges : f_lap_integro_kernel

```

### Variantes d'examen

```
Résous par la transformée de Laplace : u′(t) + 3u(t) + 25 ∫₀ᵗ u(s) e^(3(t − s)) ds = 13e^(3t), u(0) = 3.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [problème, examen open, 3 points]
  partie 1 (Début du problème : 1 ; Transforme l'équation (LP2, LP6), puis isole U : 1 ; Puis on inverse : 1)
    [free, sans aide, suivre l'erreur, examen open]  ℒ(e^(3t))
      = 1/(z − 3)   ← Ligne L3
    — Transforme l'équation (LP2, LP6), puis isole U :  [juge transform]  départ : U = ℒ(u)
      = zU − 3 + 3U + 25U/(z − 3) = 13/(z − 3)   ← Transformer
      = U = (3z + 4)/(z² + 16)   ← Isoler U : (z − 3)(z + 3) + 25 = z² + 16
    — Puis on inverse :  [juge transform]  départ : U = (3z + 4)/(z² + 16)
      = u(t) = 3cos(4t) + sin(4t)   ← Lignes L5 et L4
  pièges : f_lap_integro_kernel

```

## Problème : EDO par Laplace, puis inverse par les résidus (`f-lap-problem`, BA4)

_Le problème complet (10 points) : transformer, isoler Y, résidus, arc de Bromwich, vérifier._

### Niveau 1

```
Résous y″ + 3y′ + 2y = −e^(−t), y(0) = 3, y′(0) = −6 par la transformée de Laplace ; inverse Y par les résidus en justifiant le passage par le contour de Bromwich.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  Y = ℒ(y)
    (ℒ(y″) = z²Y − z y(0) − y′(0), ℒ(y′) = zY − y(0).)
    = □ − 3z + 6 + 3(zY − 3) + 2Y = −1/(z + 1)   (trous : z²Y − 3z + 6 + 3(zY − 3) + 2Y = −1/(z + 1))   ← Transformer
    = Y = (3z² + 6z + 2)/((z + 2)(z + 1)²)   ← Isoler Y
  — Résidu de Y(z)e^(zt) en z = −2 (pôle simple) :  [juge lapres]  départ : Res(−2)
    = (3z² + 6z + 2)e^(zt)/(z + 1)²   ← (z + 2)Y(z)e^(zt) en z = −2
    = □   (trous : 2e^(−2t))   ← Calculer
  — Résidu en z = −1 (pôle double) :  [juge lapres]  départ : Res(−1)
    = d/dz ((3z² + 6z + 2)e^(zt)/(z + 2))   ← Dériver, puis z = z₀
    = □   (trous : e^(−t) − te^(−t))   ← Calculer
  — Somme des résidus (contour de Bromwich) :  [juge transform]  départ : y(t)
    (Sur l'arc gauche, Jordan donne une borne en 1/R : l'intégrale tend vers 0, et y(t) est la somme des résidus.)
    = y(t) = 2e^(−2t) + e^(−t) − te^(−t)   ← Vérifier : y(0) = 3, y′(0) = −6
  aides : Transforme, isole Y, puis y(t) = somme des résidus de Y(z)e^(zt) : un pôle simple et un pôle double. | z²Y − 3z + 6 + 3(zY − 3) + 2Y = −1/(z + 1) | Y = (3z² + 6z + 2)/((z + 2)(z + 1)²)
  pièges : f_lap_shift_sign, f_lap_deriv_ic

Résous y″ + 4y′ + 3y = −2e^(−3t), y(0) = 2, y′(0) = −1 par la transformée de Laplace ; inverse Y par les résidus en justifiant le passage par le contour de Bromwich.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  Y = ℒ(y)
    (ℒ(y″) = z²Y − z y(0) − y′(0), ℒ(y′) = zY − y(0).)
    = □ − 2z + 1 + 4(zY − 2) + 3Y = −2/(z + 3)   (trous : z²Y − 2z + 1 + 4(zY − 2) + 3Y = −2/(z + 3))   ← Transformer
    = Y = (2z² + 13z + 19)/((z + 1)(z + 3)²)   ← Isoler Y
  — Résidu de Y(z)e^(zt) en z = −1 (pôle simple) :  [juge lapres]  départ : Res(−1)
    = (2z² + 13z + 19)e^(zt)/(z + 3)²   ← (z + 1)Y(z)e^(zt) en z = −1
    = □   (trous : 2e^(−t))   ← Calculer
  — Résidu en z = −3 (pôle double) :  [juge lapres]  départ : Res(−3)
    = d/dz ((2z² + 13z + 19)e^(zt)/(z + 1))   ← Dériver, puis z = z₀
    = □   (trous : te^(−3t))   ← Calculer
  — Somme des résidus (contour de Bromwich) :  [juge transform]  départ : y(t)
    (Sur l'arc gauche, Jordan donne une borne en 1/R : l'intégrale tend vers 0, et y(t) est la somme des résidus.)
    = y(t) = 2e^(−t) + te^(−3t)   ← Vérifier : y(0) = 2, y′(0) = −1
  aides : Transforme, isole Y, puis y(t) = somme des résidus de Y(z)e^(zt) : un pôle simple et un pôle double. | z²Y − 2z + 1 + 4(zY − 2) + 3Y = −2/(z + 3) | Y = (2z² + 13z + 19)/((z + 1)(z + 3)²)
  pièges : f_lap_shift_sign, f_lap_deriv_ic

Résous y″ + 3y′ + 2y = −3e^(−2t), y(0) = 2, y′(0) = 1 par la transformée de Laplace ; inverse Y par les résidus en justifiant le passage par le contour de Bromwich.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  Y = ℒ(y)
    (ℒ(y″) = z²Y − z y(0) − y′(0), ℒ(y′) = zY − y(0).)
    = □ − 2z − 1 + 3(zY − 2) + 2Y = −3/(z + 2)   (trous : z²Y − 2z − 1 + 3(zY − 2) + 2Y = −3/(z + 2))   ← Transformer
    = Y = (2z² + 11z + 11)/((z + 1)(z + 2)²)   ← Isoler Y
  — Résidu de Y(z)e^(zt) en z = −1 (pôle simple) :  [juge lapres]  départ : Res(−1)
    = (2z² + 11z + 11)e^(zt)/(z + 2)²   ← (z + 1)Y(z)e^(zt) en z = −1
    = □   (trous : 2e^(−t))   ← Calculer
  — Résidu en z = −2 (pôle double) :  [juge lapres]  départ : Res(−2)
    = d/dz ((2z² + 11z + 11)e^(zt)/(z + 1))   ← Dériver, puis z = z₀
    = □   (trous : 3te^(−2t))   ← Calculer
  — Somme des résidus (contour de Bromwich) :  [juge transform]  départ : y(t)
    (Sur l'arc gauche, Jordan donne une borne en 1/R : l'intégrale tend vers 0, et y(t) est la somme des résidus.)
    = y(t) = 2e^(−t) + 3te^(−2t)   ← Vérifier : y(0) = 2, y′(0) = 1
  aides : Transforme, isole Y, puis y(t) = somme des résidus de Y(z)e^(zt) : un pôle simple et un pôle double. | z²Y − 2z − 1 + 3(zY − 2) + 2Y = −3/(z + 2) | Y = (2z² + 11z + 11)/((z + 1)(z + 2)²)
  pièges : f_lap_shift_sign, f_lap_deriv_ic

```

### Niveau 2

```
Résous y″ + 3y′ + 2y = e^(−2t), y(0) = 2, y′(0) = −3 par la transformée de Laplace ; inverse Y par les résidus en justifiant le passage par le contour de Bromwich.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  Y = ℒ(y)
    = □ − 2z + 3 + 3(zY − 2) + 2Y = 1/(z + 2)   (trous : z²Y − 2z + 3 + 3(zY − 2) + 2Y = 1/(z + 2))   ← Transformer
    = Y = □   (trous : Y = (2z² + 7z + 7)/((z + 1)(z + 2)²))   ← Isoler Y
  — Résidu de Y(z)e^(zt) en z = −1 (pôle simple) :  [juge lapres]  départ : Res(−1)
    = (2z² + 7z + 7)e^(zt)/(z + 2)²   ← (z + 1)Y(z)e^(zt) en z = −1
    = □   (trous : 2e^(−t))   ← Calculer
  — Résidu en z = −2 (pôle double) :  [juge lapres]  départ : Res(−2)
    ? Quelle formule ? ✔ d/dz[(z − z₀)²Y(z)e^(zt)] en z₀ / · lim (z − z₀)Y(z)e^(zt) quand z → z₀
    = d/dz ((2z² + 7z + 7)e^(zt)/(z + 1))   ← Dériver, puis z = z₀
    = □   (trous : −te^(−2t))   ← Calculer
  — Somme des résidus (contour de Bromwich) :  [juge transform]  départ : y(t)
    ? Pourquoi l'intégrale sur l'arc gauche C_R de Bromwich tend-elle vers 0 (t > 0) ? ✔ |e^(zt)| = e^(γt)e^(tR cos θ), |Y| ≤ C/R et ∫ e^(tR cos θ) dθ ≤ π/(tR) (Jordan) : la borne est en 1/R / · |(z + 1)²(z + 2)| ≤ (R + 1)²(R + 2), donc |Y| ≤ C/(R + 1)³ … / · Longueur πR fois max |Y e^(zt)| ≤ C e^(γt)/R : la borne tend vers 0
    = y(t) = 2e^(−t) − te^(−2t)   ← Vérifier : y(0) = 2, y′(0) = −3
  aides : Transforme, isole Y, puis y(t) = somme des résidus de Y(z)e^(zt) : un pôle simple et un pôle double. | z²Y − 2z + 3 + 3(zY − 2) + 2Y = 1/(z + 2) | Y = (2z² + 7z + 7)/((z + 1)(z + 2)²)
  pièges : f_lap_shift_sign, f_lap_deriv_ic, c_simple_formula_double, c_arc_triangle

Résous y″ + 3y′ + 2y = e^(−2t), y(0) = 2, y′(0) = −4 par la transformée de Laplace ; inverse Y par les résidus en justifiant le passage par le contour de Bromwich.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  Y = ℒ(y)
    = □ − 2z + 4 + 3(zY − 2) + 2Y = 1/(z + 2)   (trous : z²Y − 2z + 4 + 3(zY − 2) + 2Y = 1/(z + 2))   ← Transformer
    = Y = □   (trous : Y = (2z² + 6z + 5)/((z + 1)(z + 2)²))   ← Isoler Y
  — Résidu de Y(z)e^(zt) en z = −1 (pôle simple) :  [juge lapres]  départ : Res(−1)
    = (2z² + 6z + 5)e^(zt)/(z + 2)²   ← (z + 1)Y(z)e^(zt) en z = −1
    = □   (trous : e^(−t))   ← Calculer
  — Résidu en z = −2 (pôle double) :  [juge lapres]  départ : Res(−2)
    ? Quelle formule ? ✔ d/dz[(z − z₀)²Y(z)e^(zt)] en z₀ / · lim (z − z₀)Y(z)e^(zt) quand z → z₀
    = d/dz ((2z² + 6z + 5)e^(zt)/(z + 1))   ← Dériver, puis z = z₀
    = □   (trous : e^(−2t) − te^(−2t))   ← Calculer
  — Somme des résidus (contour de Bromwich) :  [juge transform]  départ : y(t)
    ? Pourquoi l'intégrale sur l'arc gauche C_R de Bromwich tend-elle vers 0 (t > 0) ? ✔ |e^(zt)| = e^(γt)e^(tR cos θ), |Y| ≤ C/R et ∫ e^(tR cos θ) dθ ≤ π/(tR) (Jordan) : la borne est en 1/R / · |(z + 1)²(z + 2)| ≤ (R + 1)²(R + 2), donc |Y| ≤ C/(R + 1)³ … / · Longueur πR fois max |Y e^(zt)| ≤ C e^(γt)/R : la borne tend vers 0
    = y(t) = e^(−t) + e^(−2t) − te^(−2t)   ← Vérifier : y(0) = 2, y′(0) = −4
  aides : Transforme, isole Y, puis y(t) = somme des résidus de Y(z)e^(zt) : un pôle simple et un pôle double. | z²Y − 2z + 4 + 3(zY − 2) + 2Y = 1/(z + 2) | Y = (2z² + 6z + 5)/((z + 1)(z + 2)²)
  pièges : f_lap_shift_sign, f_lap_deriv_ic, c_simple_formula_double, c_arc_triangle

Résous y″ + 4y′ + 3y = 2e^(−t), y(0) = 2, y′(0) = −5 par la transformée de Laplace ; inverse Y par les résidus en justifiant le passage par le contour de Bromwich.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [guided]  Y = ℒ(y)
    = □ − 2z + 5 + 4(zY − 2) + 3Y = 2/(z + 1)   (trous : z²Y − 2z + 5 + 4(zY − 2) + 3Y = 2/(z + 1))   ← Transformer
    = Y = □   (trous : Y = (2z² + 5z + 5)/((z + 3)(z + 1)²))   ← Isoler Y
  — Résidu de Y(z)e^(zt) en z = −3 (pôle simple) :  [juge lapres]  départ : Res(−3)
    = (2z² + 5z + 5)e^(zt)/(z + 1)²   ← (z + 3)Y(z)e^(zt) en z = −3
    = □   (trous : 2e^(−3t))   ← Calculer
  — Résidu en z = −1 (pôle double) :  [juge lapres]  départ : Res(−1)
    ? Quelle formule ? ✔ d/dz[(z − z₀)²Y(z)e^(zt)] en z₀ / · lim (z − z₀)Y(z)e^(zt) quand z → z₀
    = d/dz ((2z² + 5z + 5)e^(zt)/(z + 3))   ← Dériver, puis z = z₀
    = □   (trous : te^(−t))   ← Calculer
  — Somme des résidus (contour de Bromwich) :  [juge transform]  départ : y(t)
    ? Pourquoi l'intégrale sur l'arc gauche C_R de Bromwich tend-elle vers 0 (t > 0) ? ✔ |e^(zt)| = e^(γt)e^(tR cos θ), |Y| ≤ C/R et ∫ e^(tR cos θ) dθ ≤ π/(tR) (Jordan) : la borne est en 1/R / · |(z + 1)²(z + 2)| ≤ (R + 1)²(R + 2), donc |Y| ≤ C/(R + 1)³ … / · Longueur πR fois max |Y e^(zt)| ≤ C e^(γt)/R : la borne tend vers 0
    = y(t) = 2e^(−3t) + te^(−t)   ← Vérifier : y(0) = 2, y′(0) = −5
  aides : Transforme, isole Y, puis y(t) = somme des résidus de Y(z)e^(zt) : un pôle simple et un pôle double. | z²Y − 2z + 5 + 4(zY − 2) + 3Y = 2/(z + 1) | Y = (2z² + 5z + 5)/((z + 3)(z + 1)²)
  pièges : f_lap_shift_sign, f_lap_deriv_ic, c_simple_formula_double, c_arc_triangle

```

### Niveau 3

```
Résous y″ + 4y′ + 3y = 4e^(−t), y(0) = 1, y′(0) = −1 par la transformée de Laplace ; inverse Y par les résidus en justifiant le passage par le contour de Bromwich.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [tap, suivre l'erreur, menu menu]  Y = ℒ(y)
    = z²Y − z + 1 + 4(zY − 1) + 3Y = 4/(z + 1)   ← Transformer
    = Y = (z² + 4z + 7)/((z + 3)(z + 1)²)   ← Isoler Y
  — Résidu de Y(z)e^(zt) en z = −3 (pôle simple) :  [juge lapres]  départ : Res(−3)
    = (z² + 4z + 7)e^(zt)/(z + 1)²   ← (z + 3)Y(z)e^(zt) en z = −3
    = e^(−3t)   ← Calculer
  — Résidu en z = −1 (pôle double) :  [juge lapres]  départ : Res(−1)
    ? Quelle formule ? ✔ d/dz[(z − z₀)²Y(z)e^(zt)] en z₀ / · lim (z − z₀)Y(z)e^(zt) quand z → z₀
    = d/dz ((z² + 4z + 7)e^(zt)/(z + 3))   ← Dériver, puis z = z₀
    = 2te^(−t)   ← Calculer
  — Somme des résidus (contour de Bromwich) :  [juge transform]  départ : y(t)
    ? Pourquoi l'intégrale sur l'arc gauche C_R de Bromwich tend-elle vers 0 (t > 0) ? ✔ |e^(zt)| = e^(γt)e^(tR cos θ), |Y| ≤ C/R et ∫ e^(tR cos θ) dθ ≤ π/(tR) (Jordan) : la borne est en 1/R / · |(z + 1)²(z + 2)| ≤ (R + 1)²(R + 2), donc |Y| ≤ C/(R + 1)³ … / · Longueur πR fois max |Y e^(zt)| ≤ C e^(γt)/R : la borne tend vers 0
    = y(t) = e^(−3t) + 2te^(−t)   ← Vérifier : y(0) = 1, y′(0) = −1
  aides : Transforme, isole Y, puis y(t) = somme des résidus de Y(z)e^(zt) : un pôle simple et un pôle double. | z²Y − z + 1 + 4(zY − 1) + 3Y = 4/(z + 1) | Y = (z² + 4z + 7)/((z + 3)(z + 1)²)
  pièges : f_lap_shift_sign, f_lap_deriv_ic, c_simple_formula_double, c_arc_triangle

Résous y″ + 4y′ + 3y = −2e^(−3t), y(0) = −1, y′(0) = 2 par la transformée de Laplace ; inverse Y par les résidus en justifiant le passage par le contour de Bromwich.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [tap, suivre l'erreur, menu menu]  Y = ℒ(y)
    = z²Y + z − 2 + 4(zY + 1) + 3Y = −2/(z + 3)   ← Transformer
    = Y = (−z² − 5z − 8)/((z + 1)(z + 3)²)   ← Isoler Y
  — Résidu de Y(z)e^(zt) en z = −1 (pôle simple) :  [juge lapres]  départ : Res(−1)
    = (−z² − 5z − 8)e^(zt)/(z + 3)²   ← (z + 1)Y(z)e^(zt) en z = −1
    = −e^(−t)   ← Calculer
  — Résidu en z = −3 (pôle double) :  [juge lapres]  départ : Res(−3)
    ? Quelle formule ? ✔ d/dz[(z − z₀)²Y(z)e^(zt)] en z₀ / · lim (z − z₀)Y(z)e^(zt) quand z → z₀
    = d/dz ((−z² − 5z − 8)e^(zt)/(z + 1))   ← Dériver, puis z = z₀
    = te^(−3t)   ← Calculer
  — Somme des résidus (contour de Bromwich) :  [juge transform]  départ : y(t)
    ? Pourquoi l'intégrale sur l'arc gauche C_R de Bromwich tend-elle vers 0 (t > 0) ? ✔ |e^(zt)| = e^(γt)e^(tR cos θ), |Y| ≤ C/R et ∫ e^(tR cos θ) dθ ≤ π/(tR) (Jordan) : la borne est en 1/R / · |(z + 1)²(z + 2)| ≤ (R + 1)²(R + 2), donc |Y| ≤ C/(R + 1)³ … / · Longueur πR fois max |Y e^(zt)| ≤ C e^(γt)/R : la borne tend vers 0
    = y(t) = −e^(−t) + te^(−3t)   ← Vérifier : y(0) = −1, y′(0) = 2
  aides : Transforme, isole Y, puis y(t) = somme des résidus de Y(z)e^(zt) : un pôle simple et un pôle double. | z²Y + z − 2 + 4(zY + 1) + 3Y = −2/(z + 3) | Y = (−z² − 5z − 8)/((z + 1)(z + 3)²)
  pièges : f_lap_shift_sign, f_lap_deriv_ic, c_simple_formula_double, c_arc_triangle

Résous y″ + 3y′ + 2y = e^(−t), y(0) = −1, y′(0) = 3 par la transformée de Laplace ; inverse Y par les résidus en justifiant le passage par le contour de Bromwich.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [tap, suivre l'erreur, menu menu]  Y = ℒ(y)
    = z²Y + z − 3 + 3(zY + 1) + 2Y = 1/(z + 1)   ← Transformer
    = Y = (−z² − z + 1)/((z + 2)(z + 1)²)   ← Isoler Y
  — Résidu de Y(z)e^(zt) en z = −2 (pôle simple) :  [juge lapres]  départ : Res(−2)
    = (−z² − z + 1)e^(zt)/(z + 1)²   ← (z + 2)Y(z)e^(zt) en z = −2
    = −e^(−2t)   ← Calculer
  — Résidu en z = −1 (pôle double) :  [juge lapres]  départ : Res(−1)
    ? Quelle formule ? ✔ d/dz[(z − z₀)²Y(z)e^(zt)] en z₀ / · lim (z − z₀)Y(z)e^(zt) quand z → z₀
    = d/dz ((−z² − z + 1)e^(zt)/(z + 2))   ← Dériver, puis z = z₀
    = te^(−t)   ← Calculer
  — Somme des résidus (contour de Bromwich) :  [juge transform]  départ : y(t)
    ? Pourquoi l'intégrale sur l'arc gauche C_R de Bromwich tend-elle vers 0 (t > 0) ? ✔ |e^(zt)| = e^(γt)e^(tR cos θ), |Y| ≤ C/R et ∫ e^(tR cos θ) dθ ≤ π/(tR) (Jordan) : la borne est en 1/R / · |(z + 1)²(z + 2)| ≤ (R + 1)²(R + 2), donc |Y| ≤ C/(R + 1)³ … / · Longueur πR fois max |Y e^(zt)| ≤ C e^(γt)/R : la borne tend vers 0
    = y(t) = −e^(−2t) + te^(−t)   ← Vérifier : y(0) = −1, y′(0) = 3
  aides : Transforme, isole Y, puis y(t) = somme des résidus de Y(z)e^(zt) : un pôle simple et un pôle double. | z²Y + z − 3 + 3(zY + 1) + 2Y = 1/(z + 1) | Y = (−z² − z + 1)/((z + 2)(z + 1)²)
  pièges : f_lap_shift_sign, f_lap_deriv_ic, c_simple_formula_double, c_arc_triangle

```

### Niveau 4

```
Résous y″ + 3y′ + 2y = −3e^(−2t), y(0) = −1, y′(0) = 4 par la transformée de Laplace ; inverse Y par les résidus en justifiant le passage par le contour de Bromwich.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, suivre l'erreur]  Y = ℒ(y)
    = z²Y + z − 4 + 3(zY + 1) + 2Y = −3/(z + 2)   ← Transformer
    = Y = (−z² − z − 1)/((z + 1)(z + 2)²)   ← Isoler Y
  — Résidu de Y(z)e^(zt) en z = −1 (pôle simple) :  [juge lapres]  départ : Res(−1)
    = (−z² − z − 1)e^(zt)/(z + 2)²   ← (z + 1)Y(z)e^(zt) en z = −1
    = −e^(−t)   ← Calculer
  — Résidu en z = −2 (pôle double) :  [juge lapres]  départ : Res(−2)
    ? Quelle formule ? ✔ d/dz[(z − z₀)²Y(z)e^(zt)] en z₀ / · lim (z − z₀)Y(z)e^(zt) quand z → z₀
    = d/dz ((−z² − z − 1)e^(zt)/(z + 1))   ← Dériver, puis z = z₀
    = 3te^(−2t)   ← Calculer
  — Somme des résidus (contour de Bromwich) :  [juge transform]  départ : y(t)
    ? Pourquoi l'intégrale sur l'arc gauche C_R de Bromwich tend-elle vers 0 (t > 0) ? ✔ |e^(zt)| = e^(γt)e^(tR cos θ), |Y| ≤ C/R et ∫ e^(tR cos θ) dθ ≤ π/(tR) (Jordan) : la borne est en 1/R / · |(z + 1)²(z + 2)| ≤ (R + 1)²(R + 2), donc |Y| ≤ C/(R + 1)³ … / · Longueur πR fois max |Y e^(zt)| ≤ C e^(γt)/R : la borne tend vers 0
    = y(t) = −e^(−t) + 3te^(−2t)   ← Vérifier : y(0) = −1, y′(0) = 4
  aides : Transforme, isole Y, puis y(t) = somme des résidus de Y(z)e^(zt) : un pôle simple et un pôle double. | z²Y + z − 4 + 3(zY + 1) + 2Y = −3/(z + 2) | Y = (−z² − z − 1)/((z + 1)(z + 2)²)
  pièges : f_lap_shift_sign, f_lap_deriv_ic, c_simple_formula_double, c_arc_triangle

Résous y″ + 3y′ + 2y = e^(−2t), y(0) = 0, y′(0) = −2 par la transformée de Laplace ; inverse Y par les résidus en justifiant le passage par le contour de Bromwich.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, suivre l'erreur]  Y = ℒ(y)
    = z²Y + 2 + 3zY + 2Y = 1/(z + 2)   ← Transformer
    = Y = (−2z − 3)/((z + 1)(z + 2)²)   ← Isoler Y
  — Résidu de Y(z)e^(zt) en z = −1 (pôle simple) :  [juge lapres]  départ : Res(−1)
    = (−2z − 3)e^(zt)/(z + 2)²   ← (z + 1)Y(z)e^(zt) en z = −1
    = −e^(−t)   ← Calculer
  — Résidu en z = −2 (pôle double) :  [juge lapres]  départ : Res(−2)
    ? Quelle formule ? ✔ d/dz[(z − z₀)²Y(z)e^(zt)] en z₀ / · lim (z − z₀)Y(z)e^(zt) quand z → z₀
    = d/dz ((−2z − 3)e^(zt)/(z + 1))   ← Dériver, puis z = z₀
    = e^(−2t) − te^(−2t)   ← Calculer
  — Somme des résidus (contour de Bromwich) :  [juge transform]  départ : y(t)
    ? Pourquoi l'intégrale sur l'arc gauche C_R de Bromwich tend-elle vers 0 (t > 0) ? ✔ |e^(zt)| = e^(γt)e^(tR cos θ), |Y| ≤ C/R et ∫ e^(tR cos θ) dθ ≤ π/(tR) (Jordan) : la borne est en 1/R / · |(z + 1)²(z + 2)| ≤ (R + 1)²(R + 2), donc |Y| ≤ C/(R + 1)³ … / · Longueur πR fois max |Y e^(zt)| ≤ C e^(γt)/R : la borne tend vers 0
    = y(t) = −e^(−t) + e^(−2t) − te^(−2t)   ← Vérifier : y(0) = 0, y′(0) = −2
  aides : Transforme, isole Y, puis y(t) = somme des résidus de Y(z)e^(zt) : un pôle simple et un pôle double. | z²Y + 2 + 3zY + 2Y = 1/(z + 2) | Y = (−2z − 3)/((z + 1)(z + 2)²)
  pièges : f_lap_shift_sign, f_lap_deriv_ic, c_simple_formula_double, c_arc_triangle

Résous y″ + 5y′ + 6y = e^(−3t), y(0) = 2, y′(0) = −6 par la transformée de Laplace ; inverse Y par les résidus en justifiant le passage par le contour de Bromwich.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [free, suivre l'erreur]  Y = ℒ(y)
    = z²Y − 2z + 6 + 5(zY − 2) + 6Y = 1/(z + 3)   ← Transformer
    = Y = (2z² + 10z + 13)/((z + 2)(z + 3)²)   ← Isoler Y
  — Résidu de Y(z)e^(zt) en z = −2 (pôle simple) :  [juge lapres]  départ : Res(−2)
    = (2z² + 10z + 13)e^(zt)/(z + 3)²   ← (z + 2)Y(z)e^(zt) en z = −2
    = e^(−2t)   ← Calculer
  — Résidu en z = −3 (pôle double) :  [juge lapres]  départ : Res(−3)
    ? Quelle formule ? ✔ d/dz[(z − z₀)²Y(z)e^(zt)] en z₀ / · lim (z − z₀)Y(z)e^(zt) quand z → z₀
    = d/dz ((2z² + 10z + 13)e^(zt)/(z + 2))   ← Dériver, puis z = z₀
    = e^(−3t) − te^(−3t)   ← Calculer
  — Somme des résidus (contour de Bromwich) :  [juge transform]  départ : y(t)
    ? Pourquoi l'intégrale sur l'arc gauche C_R de Bromwich tend-elle vers 0 (t > 0) ? ✔ |e^(zt)| = e^(γt)e^(tR cos θ), |Y| ≤ C/R et ∫ e^(tR cos θ) dθ ≤ π/(tR) (Jordan) : la borne est en 1/R / · |(z + 1)²(z + 2)| ≤ (R + 1)²(R + 2), donc |Y| ≤ C/(R + 1)³ … / · Longueur πR fois max |Y e^(zt)| ≤ C e^(γt)/R : la borne tend vers 0
    = y(t) = e^(−2t) + e^(−3t) − te^(−3t)   ← Vérifier : y(0) = 2, y′(0) = −6
  aides : Transforme, isole Y, puis y(t) = somme des résidus de Y(z)e^(zt) : un pôle simple et un pôle double. | z²Y − 2z + 6 + 5(zY − 2) + 6Y = 1/(z + 3) | Y = (2z² + 10z + 13)/((z + 2)(z + 3)²)
  pièges : f_lap_shift_sign, f_lap_deriv_ic, c_simple_formula_double, c_arc_triangle

```

### Niveau 5

```
Résous y″ + 5y′ + 6y = e^(−2t), y(0) = −2, y′(0) = 6 par la transformée de Laplace ; inverse Y par les résidus en justifiant le passage par le contour de Bromwich.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [problème, 10 points]
  partie 1 (Transformée, Y et résidus : 4 ; Résidu de Y(z)e^(zt) en z = −3 (pôle simple) : 1 ; Résidu en z = −2 (pôle double) : 2)
    [free, sans aide, suivre l'erreur]  Y = ℒ(y)
      = z²Y + 2z − 6 + 5(zY + 2) + 6Y = 1/(z + 2)   ← Transformer
      = Y = (−2z² − 8z − 7)/((z + 3)(z + 2)²)   ← Isoler Y
    — Résidu de Y(z)e^(zt) en z = −3 (pôle simple) :  [juge lapres]  départ : Res(−3)
      = (−2z² − 8z − 7)e^(zt)/(z + 2)²   ← (z + 3)Y(z)e^(zt) en z = −3
      = −e^(−3t)   ← Calculer
    — Résidu en z = −2 (pôle double) :  [juge lapres]  départ : Res(−2)
      = d/dz ((−2z² − 8z − 7)e^(zt)/(z + 3))   ← Dériver, puis z = z₀
      = −e^(−2t) + te^(−2t)   ← Calculer
  partie 2 (Arc de Bromwich : 2)
  Montre que l'intégrale de Y(z)e^(zt) sur l'arc gauche C_R du contour de Bromwich tend vers 0 quand R → ∞ (t > 0). Touche les blocs dans l'ordre.
    [blocs order, sans aide]
      1. Sur l'arc gauche CR : z = γ + Re^(iθ), θ ∈ [π/2 ; 3π/2], avec γ > γ₀.
      2. |e^(zt)| = e^(γt)e^(tR cos θ), et cos θ ≤ 0 sur l'arc.
      3. Chaque facteur de (z + 3)(z + 2)² vérifie |z + a| ≥ |z| − |a| (inégalité triangulaire inverse) ; le dénominateur a un degré de plus que le numérateur : |Y(z)| ≤ C/R pour R grand.
      4. |∫CR Y(z)e^(zt) dz| ≤ (C/R) · e^(γt) · R ∫π/2^(3π/2) e^(tR cos θ) dθ.
      5. Jordan : ∫π/2^(3π/2) e^(tR cos θ) dθ ≤ π/(tR), donc la borne vaut πCe^(γt)/(tR) → 0 quand R → ∞ (t > 0).
      ✗ Sur l’arc, |z + a| ≤ |z| + |a|, donc 1/|z + a| ≤ 1/(|z| + |a|) et |Y(z)| ≤ C/R. [c_arc_triangle]
  partie 3 (Solution et vérification : 1)
  Donne y(t) (la somme des résidus) ; elle doit vérifier l'équation et les conditions initiales.
    [free, sans aide, suivre l'erreur]  y
      = y = −e^(−3t) − e^(−2t) + te^(−2t)   ← y(0) = −2, y′(0) = 6
  pièges : f_lap_shift_sign, f_lap_deriv_ic, c_arc_triangle

Résous y″ + 4y′ + 3y = 4e^(−t), y(0) = 2, y′(0) = −2 par la transformée de Laplace ; inverse Y par les résidus en justifiant le passage par le contour de Bromwich.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [problème, 10 points]
  partie 1 (Transformée, Y et résidus : 4 ; Résidu de Y(z)e^(zt) en z = −3 (pôle simple) : 1 ; Résidu en z = −1 (pôle double) : 2)
    [free, sans aide, suivre l'erreur]  Y = ℒ(y)
      = z²Y − 2z + 2 + 4(zY − 2) + 3Y = 4/(z + 1)   ← Transformer
      = Y = (2z² + 8z + 10)/((z + 3)(z + 1)²)   ← Isoler Y
    — Résidu de Y(z)e^(zt) en z = −3 (pôle simple) :  [juge lapres]  départ : Res(−3)
      = (2z² + 8z + 10)e^(zt)/(z + 1)²   ← (z + 3)Y(z)e^(zt) en z = −3
      = e^(−3t)   ← Calculer
    — Résidu en z = −1 (pôle double) :  [juge lapres]  départ : Res(−1)
      = d/dz ((2z² + 8z + 10)e^(zt)/(z + 3))   ← Dériver, puis z = z₀
      = e^(−t) + 2te^(−t)   ← Calculer
  partie 2 (Arc de Bromwich : 2)
  Montre que l'intégrale de Y(z)e^(zt) sur l'arc gauche C_R du contour de Bromwich tend vers 0 quand R → ∞ (t > 0). Touche les blocs dans l'ordre.
    [blocs order, sans aide]
      1. Sur l'arc gauche CR : z = γ + Re^(iθ), θ ∈ [π/2 ; 3π/2], avec γ > γ₀.
      2. |e^(zt)| = e^(γt)e^(tR cos θ), et cos θ ≤ 0 sur l'arc.
      3. Chaque facteur de (z + 3)(z + 1)² vérifie |z + a| ≥ |z| − |a| (inégalité triangulaire inverse) ; le dénominateur a un degré de plus que le numérateur : |Y(z)| ≤ C/R pour R grand.
      4. |∫CR Y(z)e^(zt) dz| ≤ (C/R) · e^(γt) · R ∫π/2^(3π/2) e^(tR cos θ) dθ.
      5. Jordan : ∫π/2^(3π/2) e^(tR cos θ) dθ ≤ π/(tR), donc la borne vaut πCe^(γt)/(tR) → 0 quand R → ∞ (t > 0).
      ✗ Sur l’arc, |z + a| ≤ |z| + |a|, donc 1/|z + a| ≤ 1/(|z| + |a|) et |Y(z)| ≤ C/R. [c_arc_triangle]
  partie 3 (Solution et vérification : 1)
  Donne y(t) (la somme des résidus) ; elle doit vérifier l'équation et les conditions initiales.
    [free, sans aide, suivre l'erreur]  y
      = y = e^(−3t) + e^(−t) + 2te^(−t)   ← y(0) = 2, y′(0) = −2
  pièges : f_lap_shift_sign, f_lap_deriv_ic, c_arc_triangle

Résous y″ + 4y′ + 3y = 2e^(−t), y(0) = 2, y′(0) = −5 par la transformée de Laplace ; inverse Y par les résidus en justifiant le passage par le contour de Bromwich.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [problème, 10 points]
  partie 1 (Transformée, Y et résidus : 4 ; Résidu de Y(z)e^(zt) en z = −3 (pôle simple) : 1 ; Résidu en z = −1 (pôle double) : 2)
    [free, sans aide, suivre l'erreur]  Y = ℒ(y)
      = z²Y − 2z + 5 + 4(zY − 2) + 3Y = 2/(z + 1)   ← Transformer
      = Y = (2z² + 5z + 5)/((z + 3)(z + 1)²)   ← Isoler Y
    — Résidu de Y(z)e^(zt) en z = −3 (pôle simple) :  [juge lapres]  départ : Res(−3)
      = (2z² + 5z + 5)e^(zt)/(z + 1)²   ← (z + 3)Y(z)e^(zt) en z = −3
      = 2e^(−3t)   ← Calculer
    — Résidu en z = −1 (pôle double) :  [juge lapres]  départ : Res(−1)
      = d/dz ((2z² + 5z + 5)e^(zt)/(z + 3))   ← Dériver, puis z = z₀
      = te^(−t)   ← Calculer
  partie 2 (Arc de Bromwich : 2)
  Montre que l'intégrale de Y(z)e^(zt) sur l'arc gauche C_R du contour de Bromwich tend vers 0 quand R → ∞ (t > 0). Touche les blocs dans l'ordre.
    [blocs order, sans aide]
      1. Sur l'arc gauche CR : z = γ + Re^(iθ), θ ∈ [π/2 ; 3π/2], avec γ > γ₀.
      2. |e^(zt)| = e^(γt)e^(tR cos θ), et cos θ ≤ 0 sur l'arc.
      3. Chaque facteur de (z + 3)(z + 1)² vérifie |z + a| ≥ |z| − |a| (inégalité triangulaire inverse) ; le dénominateur a un degré de plus que le numérateur : |Y(z)| ≤ C/R pour R grand.
      4. |∫CR Y(z)e^(zt) dz| ≤ (C/R) · e^(γt) · R ∫π/2^(3π/2) e^(tR cos θ) dθ.
      5. Jordan : ∫π/2^(3π/2) e^(tR cos θ) dθ ≤ π/(tR), donc la borne vaut πCe^(γt)/(tR) → 0 quand R → ∞ (t > 0).
      ✗ Sur l’arc, |z + a| ≤ |z| + |a|, donc 1/|z + a| ≤ 1/(|z| + |a|) et |Y(z)| ≤ C/R. [c_arc_triangle]
  partie 3 (Solution et vérification : 1)
  Donne y(t) (la somme des résidus) ; elle doit vérifier l'équation et les conditions initiales.
    [free, sans aide, suivre l'erreur]  y
      = y = 2e^(−3t) + te^(−t)   ← y(0) = 2, y′(0) = −5
  pièges : f_lap_shift_sign, f_lap_deriv_ic, c_arc_triangle

```

### Variantes d'examen

```
Résous y″ + 4y′ + 3y = −6e^(−3t), y(0) = 1, y′(0) = 2 par la transformée de Laplace ; inverse Y par les résidus en justifiant le passage par le contour de Bromwich.Table de Laplacelignef(t)F(z)Re z >L11/α si t ∈ [0 ; α], 0 sinon (α > 0)(1 − e^(−αz))/(αz)tout zL2ε(t) = 1 si t ≥ 0 (Heaviside)1/z0L3e^(−αt)1/(z + α)−αL4sin(ωt)ω/(z² + ω²)0L5cos(ωt)z/(z² + ω²)0L6e^(αt) sin(ωt)ω/((z − α)² + ω²)αL7e^(αt) cos(ωt)(z − α)/((z − α)² + ω²)αL8tⁿ/n!1/z^(n+1)0L9t e^(−αt)1/(z + α)²−αL10cosh(ωt)z/(z² − ω²)|ω|L11sinh(ωt)ω/(z² − ω²)|ω|L12e^(αt) cosh(ωt)(z − α)/((z − α)² − ω²)α + |ω|L13e^(αt) sinh(ωt)ω/((z − α)² − ω²)α + |ω|L14t cos(ωt)(z² − ω²)/(z² + ω²)²0LP1 : LinéaritéLP2 : 𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)LP3 : 𝓛(∫₀ᵗ f(s) ds) = F(z)/zLP4 : g = e^(−bt) f : 𝓛(g)(z) = F(z + b)LP5 : 𝓛(t f(t)) = −F′(z)LP6 : 𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) dsLP7 : Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a > 0
  [problème, examen open, 10 points]
  partie 1 (Transformée, Y et résidus : 4 ; Résidu de Y(z)e^(zt) en z = −1 (pôle simple) : 1 ; Résidu en z = −3 (pôle double) : 2)
    [free, sans aide, suivre l'erreur, examen open]  Y = ℒ(y)
      = z²Y − z − 2 + 4(zY − 1) + 3Y = −6/(z + 3)   ← Transformer
      = Y = (z² + 9z + 12)/((z + 1)(z + 3)²)   ← Isoler Y
    — Résidu de Y(z)e^(zt) en z = −1 (pôle simple) :  [juge lapres]  départ : Res(−1)
      = (z² + 9z + 12)e^(zt)/(z + 3)²   ← (z + 1)Y(z)e^(zt) en z = −1
      = e^(−t)   ← Calculer
    — Résidu en z = −3 (pôle double) :  [juge lapres]  départ : Res(−3)
      = d/dz ((z² + 9z + 12)e^(zt)/(z + 1))   ← Dériver, puis z = z₀
      = 3te^(−3t)   ← Calculer
  partie 2 (Arc de Bromwich : 2)
  Montre que l'intégrale de Y(z)e^(zt) sur l'arc gauche C_R du contour de Bromwich tend vers 0 quand R → ∞ (t > 0). Touche les blocs dans l'ordre.
    [blocs order, sans aide]
      1. Sur l'arc gauche CR : z = γ + Re^(iθ), θ ∈ [π/2 ; 3π/2], avec γ > γ₀.
      2. |e^(zt)| = e^(γt)e^(tR cos θ), et cos θ ≤ 0 sur l'arc.
      3. Chaque facteur de (z + 1)(z + 3)² vérifie |z + a| ≥ |z| − |a| (inégalité triangulaire inverse) ; le dénominateur a un degré de plus que le numérateur : |Y(z)| ≤ C/R pour R grand.
      4. |∫CR Y(z)e^(zt) dz| ≤ (C/R) · e^(γt) · R ∫π/2^(3π/2) e^(tR cos θ) dθ.
      5. Jordan : ∫π/2^(3π/2) e^(tR cos θ) dθ ≤ π/(tR), donc la borne vaut πCe^(γt)/(tR) → 0 quand R → ∞ (t > 0).
      ✗ Sur l’arc, |z + a| ≤ |z| + |a|, donc 1/|z + a| ≤ 1/(|z| + |a|) et |Y(z)| ≤ C/R. [c_arc_triangle]
    [examen open]
  partie 3 (Solution et vérification : 1)
  Donne y(t) (la somme des résidus) ; elle doit vérifier l'équation et les conditions initiales.
    [free, sans aide, suivre l'erreur, examen open]  y
      = y = e^(−t) + 3te^(−3t)   ← y(0) = 1, y′(0) = 2
  pièges : f_lap_shift_sign, f_lap_deriv_ic, c_arc_triangle

```

## Équation de la chaleur par séparation des variables (`f-heat-sep`, BA4)

_Les conditions aux bords choisissent les modes ; chaque mode décroît comme e^(−(nπ/L)²t)._

### Niveau 1

```
Résous ut = uxx sur ]0 ; 1[, avec u(0, t) = u(1, t) = 0 et u(x, 0) = 2sin(3πx) − 3sin(5πx).
  [guided]  Xₙ(x)
    (Les modes)
    (Quels modes ? Des sinus sin(nπx), n ≥ 1 : ils s'annulent en 0 et en 1.)
    = sin(□)   (trous : sin(nπx))
  — Chaque coefficient vérifie bₙ′ = −λₙ bₙ, donc bₙ(t) = bₙ(0) e^(−λₙt)  [juge prob]  départ : λₙ
    = □   (trous : n²π²)
  — La solution  [juge prob]  départ : u(x, t)
    = 2e^(−9π²t)sin(3πx) − 3e^(−□t)sin(5πx)   (trous : 2e^(−9π²t)sin(3πx) − 3e^(−25π²t)sin(5πx))
  aides : Dirichlet : des sinus sin(nπx/L), n ≥ 1. Chaque coefficient vérifie une EDO linéaire en t ; la condition initiale donne bₙ(0). | bₙ(t) = bₙ(0) e^(−λₙt) avec λₙ = n²π². | u(x, t) = 2e^(−9π²t)sin(3πx) − 3e^(−25π²t)sin(5πx)
  pièges : f_heat_rate

Résous ut = uxx sur ]0 ; 1[, avec u(0, t) = u(1, t) = 0 et u(x, 0) = −sin(πx) + 4sin(2πx).
  [guided]  Xₙ(x)
    (Les modes)
    (Quels modes ? Des sinus sin(nπx), n ≥ 1 : ils s'annulent en 0 et en 1.)
    = sin(□)   (trous : sin(nπx))
  — Chaque coefficient vérifie bₙ′ = −λₙ bₙ, donc bₙ(t) = bₙ(0) e^(−λₙt)  [juge prob]  départ : λₙ
    = □   (trous : n²π²)
  — La solution  [juge prob]  départ : u(x, t)
    = −e^(−π²t)sin(πx) + 4e^(−□t)sin(2πx)   (trous : −e^(−π²t)sin(πx) + 4e^(−4π²t)sin(2πx))
  aides : Dirichlet : des sinus sin(nπx/L), n ≥ 1. Chaque coefficient vérifie une EDO linéaire en t ; la condition initiale donne bₙ(0). | bₙ(t) = bₙ(0) e^(−λₙt) avec λₙ = n²π². | u(x, t) = −e^(−π²t)sin(πx) + 4e^(−4π²t)sin(2πx)
  pièges : f_heat_rate

Résous ut = uxx sur ]0 ; π[, avec ux(0, t) = ux(π, t) = 0 et u(x, 0) = cos(x) − 2cos(4x).
  [guided]  Xₙ(x)
    (Les modes)
    (Quels modes ? Des cosinus cos(nx), n ≥ 0 : leur dérivée s'annule en 0 et en π.)
    = cos(□)   (trous : cos(nx))
  — Chaque coefficient vérifie aₙ′ = −λₙ aₙ, donc aₙ(t) = aₙ(0) e^(−λₙt)  [juge prob]  départ : λₙ
    = □   (trous : n²)
  — La solution  [juge prob]  départ : u(x, t)
    = e^(−t)cos(x) − 2e^(−□t)cos(4x)   (trous : e^(−t)cos(x) − 2e^(−16t)cos(4x))
  aides : Neumann : des cosinus cos(nπx/L), n = 0 compris (le terme constant a₀/2). Chaque coefficient vérifie une EDO linéaire en t ; la condition initiale donne aₙ(0). | aₙ(t) = aₙ(0) e^(−λₙt) avec λₙ = n². | u(x, t) = e^(−t)cos(x) − 2e^(−16t)cos(4x)
  pièges : f_neumann_sine, f_heat_rate

```

### Niveau 2

```
Résous ut = uxx sur ]0 ; π[, avec ux(0, t) = ux(π, t) = 0 et u(x, 0) = −3 − 3cos(4x) + 2cos(5x).
  [guided]  Xₙ(x)
    (Les modes)
    ? Quels modes ? ✔ Des cosinus <math alttext="cos(nx)"><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mi>n</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 0 : leur dérivée s'annule en 0 et en π / · Des sinus <math alttext="sin(nx)"><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mi>n</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 1
    = □   (trous : cos(nx))
  — Chaque coefficient vérifie aₙ′ = −λₙ aₙ, donc aₙ(t) = aₙ(0) e^(−λₙt)  [juge prob]  départ : λₙ
    = □   (trous : n²)
  — La solution  [juge prob]  départ : u(x, t)
    ? La condition initiale est-elle déjà une somme de modes ? ✔ Oui : on lit ses coefficients sur les modes / ✔ Non : on calcule ses coefficients par des intégrales (2/L)∫₀ᴸ…
    = −3 − 3e^(−□t)cos(4x) + 2e^(−□t)cos(5x)   (trous : −3 − 3e^(−16t)cos(4x) + 2e^(−25t)cos(5x))
  aides : Neumann : des cosinus cos(nπx/L), n = 0 compris (le terme constant a₀/2). Chaque coefficient vérifie une EDO linéaire en t ; la condition initiale donne aₙ(0). | aₙ(t) = aₙ(0) e^(−λₙt) avec λₙ = n². | u(x, t) = −3 − 3e^(−16t)cos(4x) + 2e^(−25t)cos(5x)
  pièges : f_neumann_sine, f_heat_rate

Résous ut = 2uxx sur ]0 ; π[, avec ux(0, t) = ux(π, t) = 0 et u(x, 0) = −3 + 3cos(2x) − 2cos(3x).
  [guided]  Xₙ(x)
    (Les modes)
    ? Quels modes ? ✔ Des cosinus <math alttext="cos(nx)"><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mi>n</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 0 : leur dérivée s'annule en 0 et en π / · Des sinus <math alttext="sin(nx)"><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mi>n</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 1
    = □   (trous : cos(nx))
  — Chaque coefficient vérifie aₙ′ = −λₙ aₙ, donc aₙ(t) = aₙ(0) e^(−λₙt)  [juge prob]  départ : λₙ
    = □   (trous : 2n²)
  — La solution  [juge prob]  départ : u(x, t)
    ? La condition initiale est-elle déjà une somme de modes ? ✔ Oui : on lit ses coefficients sur les modes / ✔ Non : on calcule ses coefficients par des intégrales (2/L)∫₀ᴸ…
    = −3 + 3e^(−□t)cos(2x) − 2e^(−□t)cos(3x)   (trous : −3 + 3e^(−8t)cos(2x) − 2e^(−18t)cos(3x))
  aides : Neumann : des cosinus cos(nπx/L), n = 0 compris (le terme constant a₀/2). Chaque coefficient vérifie une EDO linéaire en t ; la condition initiale donne aₙ(0). | aₙ(t) = aₙ(0) e^(−λₙt) avec λₙ = 2n². | u(x, t) = −3 + 3e^(−8t)cos(2x) − 2e^(−18t)cos(3x)
  pièges : f_neumann_sine, f_heat_rate

Résous ut = uxx sur ]0 ; π[, avec ux(0, t) = ux(π, t) = 0 et u(x, 0) = 1 + cos(x) + cos(4x).
  [guided]  Xₙ(x)
    (Les modes)
    ? Quels modes ? ✔ Des cosinus <math alttext="cos(nx)"><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mi>n</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 0 : leur dérivée s'annule en 0 et en π / · Des sinus <math alttext="sin(nx)"><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mi>n</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 1
    = □   (trous : cos(nx))
  — Chaque coefficient vérifie aₙ′ = −λₙ aₙ, donc aₙ(t) = aₙ(0) e^(−λₙt)  [juge prob]  départ : λₙ
    = □   (trous : n²)
  — La solution  [juge prob]  départ : u(x, t)
    ? La condition initiale est-elle déjà une somme de modes ? ✔ Oui : on lit ses coefficients sur les modes / ✔ Non : on calcule ses coefficients par des intégrales (2/L)∫₀ᴸ…
    = □ + e^(−t)cos(x) + e^(−□t)cos(4x)   (trous : 1 + e^(−t)cos(x) + e^(−16t)cos(4x))
  aides : Neumann : des cosinus cos(nπx/L), n = 0 compris (le terme constant a₀/2). Chaque coefficient vérifie une EDO linéaire en t ; la condition initiale donne aₙ(0). | aₙ(t) = aₙ(0) e^(−λₙt) avec λₙ = n². | u(x, t) = 1 + e^(−t)cos(x) + e^(−16t)cos(4x)
  pièges : f_neumann_sine, f_heat_rate

```

### Niveau 3

```
Résous ut = uxx sur ]0 ; 2[, avec u(0, t) = u(2, t) = 0 et u(x, 0) = sin(πx) − sin(2πx).
  [tap, suivre l'erreur, menu menu]  Xₙ(x)
    (Les modes)
    ? Quels modes ? ✔ Des sinus <math alttext="sin(nπx/2)"><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mi>n</mi><mo>&#x2062;</mo><mi>π</mi></mrow><mo>&#x2062;</mo><mfrac><mi>x</mi><mn>2</mn></mfrac></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 1 : ils s'annulent en 0 et en 2 / · Des cosinus <math alttext="cos(nπx/2)"><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mi>n</mi><mo>&#x2062;</mo><mi>π</mi></mrow><mo>&#x2062;</mo><mfrac><mi>x</mi><mn>2</mn></mfrac></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 0
    = sin(nπx/2)
  — Chaque coefficient vérifie bₙ′ = −λₙ bₙ, donc bₙ(t) = bₙ(0) e^(−λₙt)  [juge prob]  départ : λₙ
    = n²π²/4
  — La solution  [juge prob]  départ : u(x, t)
    ? La condition initiale est-elle déjà une somme de modes ? ✔ Oui : on lit ses coefficients sur les modes / ✔ Non : on calcule ses coefficients par des intégrales (2/L)∫₀ᴸ…
    = e^(−π²t)sin(πx) − e^(−4π²t)sin(2πx)
  aides : Dirichlet : des sinus sin(nπx/L), n ≥ 1. Chaque coefficient vérifie une EDO linéaire en t ; la condition initiale donne bₙ(0). | bₙ(t) = bₙ(0) e^(−λₙt) avec λₙ = n²π²/4. | u(x, t) = e^(−π²t)sin(πx) − e^(−4π²t)sin(2πx)
  pièges : f_heat_rate

Résous ut = uxx − 2u sur ]0 ; π[, avec ux(0, t) = ux(π, t) = 0 et u(x, 0) = −2 + (1/2)cos(x) − 2cos(2x).
  [tap, suivre l'erreur, menu menu]  Xₙ(x)
    (Les modes)
    ? Quels modes ? ✔ Des cosinus <math alttext="cos(nx)"><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mi>n</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 0 : leur dérivée s'annule en 0 et en π / · Des sinus <math alttext="sin(nx)"><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mi>n</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 1
    ? Le mode n = 0 ? ✔ Il compte : X₀ = 1 vérifie u_x = 0, son coefficient est a₀/2 / · Il n'existe pas : on commence à n = 1
    = cos(nx)
  — Chaque coefficient vérifie aₙ′ = −λₙ aₙ, donc aₙ(t) = aₙ(0) e^(−λₙt)  [juge prob]  départ : λₙ
    = n² + 2
  — La solution  [juge prob]  départ : u(x, t)
    ? La condition initiale est-elle déjà une somme de modes ? ✔ Oui : on lit ses coefficients sur les modes / ✔ Non : on calcule ses coefficients par des intégrales (2/L)∫₀ᴸ…
    = −2e^(−2t) + (1/2)e^(−3t)cos(x) − 2e^(−6t)cos(2x)
  aides : Neumann : des cosinus cos(nπx/L), n = 0 compris (le terme constant a₀/2). Chaque coefficient vérifie une EDO linéaire en t ; la condition initiale donne aₙ(0). | aₙ(t) = aₙ(0) e^(−λₙt) avec λₙ = n² + 2. | u(x, t) = −2e^(−2t) + (1/2)e^(−3t)cos(x) − 2e^(−6t)cos(2x)
  pièges : f_neumann_sine, f_heat_rate

Résous ut = uxx sur ]0 ; 2[, avec u(0, t) = u(2, t) = 0 et u(x, 0) = −(1/2)sin(πx/2) + 3sin(2πx).
  [tap, suivre l'erreur, menu menu]  Xₙ(x)
    (Les modes)
    ? Quels modes ? ✔ Des sinus <math alttext="sin(nπx/2)"><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mi>n</mi><mo>&#x2062;</mo><mi>π</mi></mrow><mo>&#x2062;</mo><mfrac><mi>x</mi><mn>2</mn></mfrac></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 1 : ils s'annulent en 0 et en 2 / · Des cosinus <math alttext="cos(nπx/2)"><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mi>n</mi><mo>&#x2062;</mo><mi>π</mi></mrow><mo>&#x2062;</mo><mfrac><mi>x</mi><mn>2</mn></mfrac></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 0
    = sin(nπx/2)
  — Chaque coefficient vérifie bₙ′ = −λₙ bₙ, donc bₙ(t) = bₙ(0) e^(−λₙt)  [juge prob]  départ : λₙ
    = n²π²/4
  — La solution  [juge prob]  départ : u(x, t)
    ? La condition initiale est-elle déjà une somme de modes ? ✔ Oui : on lit ses coefficients sur les modes / ✔ Non : on calcule ses coefficients par des intégrales (2/L)∫₀ᴸ…
    = −(1/2)e^(−(π²/4)t)sin(πx/2) + 3e^(−4π²t)sin(2πx)
  aides : Dirichlet : des sinus sin(nπx/L), n ≥ 1. Chaque coefficient vérifie une EDO linéaire en t ; la condition initiale donne bₙ(0). | bₙ(t) = bₙ(0) e^(−λₙt) avec λₙ = n²π²/4. | u(x, t) = −(1/2)e^(−(π²/4)t)sin(πx/2) + 3e^(−4π²t)sin(2πx)
  pièges : f_heat_rate

```

### Niveau 4

```
Résous ut = uxx − 2u sur ]0 ; 2[, avec ux(0, t) = ux(2, t) = 0 et u(x, 0) = −2 + (1/2)cos(3πx/2) − 2cos(5πx/2).
  [free, suivre l'erreur]  Xₙ(x)
    (Les modes)
    ? Quels modes ? ✔ Des cosinus <math alttext="cos(nπx/2)"><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mi>n</mi><mo>&#x2062;</mo><mi>π</mi></mrow><mo>&#x2062;</mo><mfrac><mi>x</mi><mn>2</mn></mfrac></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 0 : leur dérivée s'annule en 0 et en 2 / · Des sinus <math alttext="sin(nπx/2)"><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mi>n</mi><mo>&#x2062;</mo><mi>π</mi></mrow><mo>&#x2062;</mo><mfrac><mi>x</mi><mn>2</mn></mfrac></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 1
    = cos(nπx/2)
  — Chaque coefficient vérifie aₙ′ = −λₙ aₙ, donc aₙ(t) = aₙ(0) e^(−λₙt)  [juge prob]  départ : λₙ
    = n²π²/4 + 2
  — La solution  [juge prob]  départ : u(x, t)
    = −2e^(−2t) + (1/2)e^(−(9π²/4 + 2)t)cos(3πx/2) − 2e^(−(25π²/4 + 2)t)cos(5πx/2)
  aides : Neumann : des cosinus cos(nπx/L), n = 0 compris (le terme constant a₀/2). Chaque coefficient vérifie une EDO linéaire en t ; la condition initiale donne aₙ(0). | aₙ(t) = aₙ(0) e^(−λₙt) avec λₙ = n²π²/4 + 2. | u(x, t) = −2e^(−2t) + (1/2)e^(−(9π²/4 + 2)t)cos(3πx/2) − 2e^(−(25π²/4 + 2)t)cos(5πx/2)
  pièges : f_neumann_sine, f_heat_rate

Résous ut = (2 + sin t + 3t²)uxx sur ]0 ; π[, avec u(0, t) = u(π, t) = 0 et u(x, 0) = 4sin(x) − (1/2)sin(2x).
  [free, suivre l'erreur]  Xₙ(x)
    (Les modes)
    ? Quels modes ? ✔ Des sinus <math alttext="sin(nx)"><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mi>n</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 1 : ils s'annulent en 0 et en π / · Des cosinus <math alttext="cos(nx)"><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mi>n</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 0
    = sin(nx)
  — Chaque coefficient vérifie bₙ′ = −n²a(t) bₙ, donc bₙ(t) = bₙ(0) e^(−n²A(t)) avec A(t) = ∫₀ᵗ a(s) ds  [juge prob]  départ : A(t)
    = 2t + 1 − cos(t) + t³
  — La solution  [juge prob]  départ : u(x, t)
    = 4e^(−(2t + 1 − cos(t) + t³))sin(x) − (1/2)e^(−4(2t + 1 − cos(t) + t³))sin(2x)
  aides : Dirichlet : des sinus sin(nπx/L), n ≥ 1. Chaque coefficient vérifie une EDO linéaire en t ; la condition initiale donne bₙ(0). | bₙ(t) = bₙ(0) e^(−n²A(t)), avec A(t) = ∫₀ᵗ (2 + sin t + 3t²) ds. | u(x, t) = 4e^(−(2t + 1 − cos(t) + t³))sin(x) − (1/2)e^(−4(2t + 1 − cos(t) + t³))sin(2x)
  pièges : f_heat_rate

Résous ut = 2uxx − u sur ]0 ; π[, avec ux(0, t) = ux(π, t) = 0 et u(x, 0) = 3cos(x) + 2cos(2x) − 3cos(5x).
  [free, suivre l'erreur]  Xₙ(x)
    (Les modes)
    ? Quels modes ? ✔ Des cosinus <math alttext="cos(nx)"><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mi>n</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 0 : leur dérivée s'annule en 0 et en π / · Des sinus <math alttext="sin(nx)"><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mi>n</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 1
    = cos(nx)
  — Chaque coefficient vérifie aₙ′ = −λₙ aₙ, donc aₙ(t) = aₙ(0) e^(−λₙt)  [juge prob]  départ : λₙ
    = 2n² + 1
  — La solution  [juge prob]  départ : u(x, t)
    = 3e^(−3t)cos(x) + 2e^(−9t)cos(2x) − 3e^(−51t)cos(5x)
  aides : Neumann : des cosinus cos(nπx/L), n = 0 compris (le terme constant a₀/2). Chaque coefficient vérifie une EDO linéaire en t ; la condition initiale donne aₙ(0). | aₙ(t) = aₙ(0) e^(−λₙt) avec λₙ = 2n² + 1. | u(x, t) = 3e^(−3t)cos(x) + 2e^(−9t)cos(2x) − 3e^(−51t)cos(5x)
  pièges : f_neumann_sine, f_heat_rate

```

### Niveau 5

```
Résous ut = uxx sur ]0 ; 1[, avec u(0, t) = u(1, t) = 0 et u(x, 0) = 1. Écris u comme une série (sum(…, n, 1, ∞)).
  [free, sans aide]  Xₙ(x)
    (Les modes)
    ? Quels modes ? ✔ Des sinus <math alttext="sin(nπx)"><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mi>n</mi><mo>&#x2062;</mo><mi>π</mi></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 1 : ils s'annulent en 0 et en 1 / · Des cosinus <math alttext="cos(nπx)"><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mrow><mi>n</mi><mo>&#x2062;</mo><mi>π</mi></mrow><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 0
    = sin(nπx)
  — La série en sinus de u(x, 0) : d'abord Iₙ = ∫₀¹ u(x, 0) sin(nπx) dx  [juge equiv]  départ : ∫_{0}^{1} sin(nπx) dx
    = (1 − (−1)^n)/(nπ)
  — Le coefficient bₙ(0) de la série en sinus  [juge prob]  départ : bₙ(0)
    = 2(1 − (−1)^n)/(nπ)
  — Chaque coefficient vérifie bₙ′ = −λₙ bₙ  [juge prob]  départ : λₙ
    = n²π²
  — La solution (une série)  [juge prob]  départ : u(x, t)
    = Σ_{n=1}^{∞} (2(1 − (−1)^n)/(nπ))e^(−n²π²t)sin(nπx)
  pièges : f_heat_bc_coef, f_heat_rate

Résous ut = uxx sur ]0 ; π[, avec u(0, t) = u(π, t) = 0 et u(x, 0) = x. Écris u comme une série (sum(…, n, 1, ∞)).
  [free, sans aide]  Xₙ(x)
    (Les modes)
    ? Quels modes ? ✔ Des sinus <math alttext="sin(nx)"><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mi>n</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 1 : ils s'annulent en 0 et en π / · Des cosinus <math alttext="cos(nx)"><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mi>n</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 0
    = sin(nx)
  — La série en sinus de u(x, 0) : d'abord Iₙ = ∫₀^π u(x, 0) sin(nx) dx  [juge equiv]  départ : ∫_{0}^{π} xsin(nx) dx
    = π(−1)^(n + 1)/n
  — Le coefficient bₙ(0) de la série en sinus  [juge prob]  départ : bₙ(0)
    = 2(−1)^(n + 1)/n
  — Chaque coefficient vérifie bₙ′ = −λₙ bₙ  [juge prob]  départ : λₙ
    = n²
  — La solution (une série)  [juge prob]  départ : u(x, t)
    = Σ_{n=1}^{∞} (2(−1)^(n + 1)/n)e^(−n²t)sin(nx)
  pièges : f_heat_bc_coef, f_heat_rate

Résous ut = uxx sur ]0 ; π[, avec u(0, t) = u(π, t) = 0 et u(x, 0) = x. Écris u comme une série (sum(…, n, 1, ∞)).
  [free, sans aide]  Xₙ(x)
    (Les modes)
    ? Quels modes ? ✔ Des sinus <math alttext="sin(nx)"><mrow><mi>sin</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mi>n</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 1 : ils s'annulent en 0 et en π / · Des cosinus <math alttext="cos(nx)"><mrow><mi>cos</mi><mo>&#x2061;</mo><mrow><mo stretchy="false">(</mo><mrow><mi>n</mi><mo>&#x2062;</mo><mi>x</mi></mrow><mo stretchy="false">)</mo></mrow></mrow></math>, n ≥ 0
    = sin(nx)
  — La série en sinus de u(x, 0) : d'abord Iₙ = ∫₀^π u(x, 0) sin(nx) dx  [juge equiv]  départ : ∫_{0}^{π} xsin(nx) dx
    = π(−1)^(n + 1)/n
  — Le coefficient bₙ(0) de la série en sinus  [juge prob]  départ : bₙ(0)
    = 2(−1)^(n + 1)/n
  — Chaque coefficient vérifie bₙ′ = −λₙ bₙ  [juge prob]  départ : λₙ
    = n²
  — La solution (une série)  [juge prob]  départ : u(x, t)
    = Σ_{n=1}^{∞} (2(−1)^(n + 1)/n)e^(−n²t)sin(nx)
  pièges : f_heat_bc_coef, f_heat_rate

```

### Variantes d'examen

```
On résout ut = uxx sur ]0 ; 1[, avec u(0, t) = u(1, t) = 0 et u(x, 0) = −3sin(4πx) − 2sin(5πx). Cochez les affirmations vraies. (plusieurs réponses possibles)
  ✔ u(x, t) = −3e^(−16π²t)sin(4πx) − 2e^(−25π²t)sin(5πx)   · Le coefficient du mode n vérifie bₙ′ = −nπ·bₙ. [f_heat_rate]   ✔ Pour tout x, u(x, t) → 0 quand t → ∞.   · Pour tout x, u(x, t) → −3 quand t → ∞.   · u(x, t) = −3e^(−16t)sin(4πx) − 2e^(−25t)sin(5πx) [f_heat_rate]
  [examen mcq]
  pièges : f_heat_rate

Résous ut = uxx − u sur ]0 ; 2[, avec ux(0, t) = ux(2, t) = 0 et u(x, 0) = −3 + 4cos(3πx/2) − 2cos(2πx).
  [problème, examen open, 6 points]
  partie 1 (Début du problème : 1,5 ; Chaque coefficient vérifie aₙ′ = −λₙ aₙ, donc aₙ(t) = aₙ(0) e^(−λₙt) : 2 ; La solution : 2,5)
    [free, sans aide, suivre l'erreur, examen open]  Xₙ(x)
      (Les modes)
      = cos(nπx/2)
    — Chaque coefficient vérifie aₙ′ = −λₙ aₙ, donc aₙ(t) = aₙ(0) e^(−λₙt)  [juge prob]  départ : λₙ
      = n²π²/4 + 1
    — La solution  [juge prob]  départ : u(x, t)
      = −3e^(−t) + 4e^(−(9π²/4 + 1)t)cos(3πx/2) − 2e^(−(4π² + 1)t)cos(2πx)
  pièges : f_neumann_sine, f_heat_rate

```

## Problème : chaleur avec terme source (`f-heat-source`, BA4)

_La source se développe aussi sur les modes : bₙ′ + λₙbₙ = βₙ, solution stationnaire corrigée._

### Niveau 1

```
On résout ut − uxx = sin(x) sur ]0 ; π[, avec u(0, t) = u(π, t) = 0 et u(x, 0) = 1, en développant u(x, t) = Σ bₙ(t) sin(nx). Fais seulement les étapes demandées. On a b₁(0) = 4/π.
  [guided]  β_1
    (La source sur les modes : sin(x) = Σ βₙ sin(nx))
    (Seul le mode n = 1 reçoit la source : les autres βₙ sont nuls.)
    = □   (trous : 1)
  — Chaque mode vérifie bₙ′ + λₙ bₙ = βₙ  [juge prob]  départ : λₙ
    = □   (trous : n²)
  — Le mode n = 1, avec b₁(0) = 4/π  [juge prob]  départ : b_1(t)
    = (4/π)e^(−t) + (□)(1 − e^(−t))   (trous : (4/π)e^(−t) + (1)(1 − e^(−t)))
  aides : Développe aussi la source sur les modes sin(nπx/L) : chaque coefficient vérifie bₙ′ + λₙbₙ = βₙ, une EDO linéaire d'ordre 1. | Le mode 1 : b(t) = b(0)e^(−λt) + (β/λ)(1 − e^(−λt)), avec β = 1. | b₁(t) = (4/π)e^(−t) + (1)(1 − e^(−t))
  pièges : f_heat_rate, f_heat_source_steady

On résout ut − uxx = 2sin(πx) sur ]0 ; 1[, avec u(0, t) = u(1, t) = 0 et u(x, 0) = x(1 − x), en développant u(x, t) = Σ bₙ(t) sin(nπx). Fais seulement les étapes demandées. On a b₁(0) = 8/π³.
  [guided]  β_1
    (La source sur les modes : 2sin(πx) = Σ βₙ sin(nπx))
    (Seul le mode n = 1 reçoit la source : les autres βₙ sont nuls.)
    = □   (trous : 2)
  — Chaque mode vérifie bₙ′ + λₙ bₙ = βₙ  [juge prob]  départ : λₙ
    = □   (trous : n²π²)
  — Le mode n = 1, avec b₁(0) = 8/π³  [juge prob]  départ : b_1(t)
    = (8/π³)e^(−π²t) + (□)(1 − e^(−π²t))   (trous : (8/π³)e^(−π²t) + (2/π²)(1 − e^(−π²t)))
  aides : Développe aussi la source sur les modes sin(nπx/L) : chaque coefficient vérifie bₙ′ + λₙbₙ = βₙ, une EDO linéaire d'ordre 1. | Le mode 1 : b(t) = b(0)e^(−λt) + (β/λ)(1 − e^(−λt)), avec β = 2. | b₁(t) = (8/π³)e^(−π²t) + (2/π²)(1 − e^(−π²t))
  pièges : f_heat_rate, f_heat_source_steady

On résout ut − uxx = sin(3x) sur ]0 ; π[, avec u(0, t) = u(π, t) = 0 et u(x, 0) = 1, en développant u(x, t) = Σ bₙ(t) sin(nx). Fais seulement les étapes demandées. On a b₃(0) = 4/(3π).
  [guided]  β_3
    (La source sur les modes : sin(3x) = Σ βₙ sin(nx))
    (Seul le mode n = 3 reçoit la source : les autres βₙ sont nuls.)
    = □   (trous : 1)
  — Chaque mode vérifie bₙ′ + λₙ bₙ = βₙ  [juge prob]  départ : λₙ
    = □   (trous : n²)
  — Le mode n = 3, avec b₃(0) = 4/(3π)  [juge prob]  départ : b_3(t)
    = (4/(3π))e^(−9t) + (□)(1 − e^(−9t))   (trous : (4/(3π))e^(−9t) + (1/9)(1 − e^(−9t)))
  aides : Développe aussi la source sur les modes sin(nπx/L) : chaque coefficient vérifie bₙ′ + λₙbₙ = βₙ, une EDO linéaire d'ordre 1. | Le mode 3 : b(t) = b(0)e^(−λt) + (β/λ)(1 − e^(−λt)), avec β = 1. | b₃(t) = (4/(3π))e^(−9t) + (1/9)(1 − e^(−9t))
  pièges : f_heat_rate, f_heat_source_steady

```

### Niveau 2

```
On résout ut − uxx = 2sin(x) sur ]0 ; π[, avec u(0, t) = u(π, t) = 0 et u(x, 0) = 1, en développant u(x, t) = Σ bₙ(t) sin(nx). Fais seulement les étapes demandées.
  [guided]  λₙ
    (Chaque mode vérifie bₙ′ + λₙ bₙ = βₙ)
    = □   (trous : n²)
  — La série en sinus de u(x, 0) : d'abord Iₙ = ∫₀^π u(x, 0) sin(nx) dx  [juge equiv]  départ : ∫_{0}^{π} sin(nx) dx
    = □/n   (trous : (1 − (−1)^n)/n)
  — Le coefficient bₙ(0) de la série en sinus  [juge prob]  départ : bₙ(0)
    = □/(nπ)   (trous : 2(1 − (−1)^n)/(nπ))
  — Les modes sans source (n ≠ 1)  [juge prob]  départ : bₙ(t), n ≠ 1
    = (2(1 − (−1)^n)/(nπ))□   (trous : (2(1 − (−1)^n)/(nπ))e^(−n²t))
  aides : Développe aussi la source sur les modes sin(nπx/L) : chaque coefficient vérifie bₙ′ + λₙbₙ = βₙ, une EDO linéaire d'ordre 1. | Le mode 1 : b(t) = b(0)e^(−λt) + (β/λ)(1 − e^(−λt)), avec β = 2. | b₁(t) = (4/π)e^(−t) + (2)(1 − e^(−t))
  pièges : f_heat_rate, f_heat_bc_coef

On résout ut − uxx = 2sin(3x) sur ]0 ; π[, avec u(0, t) = u(π, t) = 0 et u(x, 0) = 1, en développant u(x, t) = Σ bₙ(t) sin(nx). Fais seulement les étapes demandées.
  [guided]  λₙ
    (Chaque mode vérifie bₙ′ + λₙ bₙ = βₙ)
    = □   (trous : n²)
  — La série en sinus de u(x, 0) : d'abord Iₙ = ∫₀^π u(x, 0) sin(nx) dx  [juge equiv]  départ : ∫_{0}^{π} sin(nx) dx
    = □/n   (trous : (1 − (−1)^n)/n)
  — Le coefficient bₙ(0) de la série en sinus  [juge prob]  départ : bₙ(0)
    = □/(nπ)   (trous : 2(1 − (−1)^n)/(nπ))
  — Les modes sans source (n ≠ 3)  [juge prob]  départ : bₙ(t), n ≠ 3
    = (2(1 − (−1)^n)/(nπ))□   (trous : (2(1 − (−1)^n)/(nπ))e^(−n²t))
  aides : Développe aussi la source sur les modes sin(nπx/L) : chaque coefficient vérifie bₙ′ + λₙbₙ = βₙ, une EDO linéaire d'ordre 1. | Le mode 3 : b(t) = b(0)e^(−λt) + (β/λ)(1 − e^(−λt)), avec β = 2. | b₃(t) = (4/(3π))e^(−9t) + (2/9)(1 − e^(−9t))
  pièges : f_heat_rate, f_heat_bc_coef

On résout ut − uxx = sin(x) sur ]0 ; π[, avec u(0, t) = u(π, t) = 0 et u(x, 0) = x(π − x), en développant u(x, t) = Σ bₙ(t) sin(nx). Fais seulement les étapes demandées.
  [guided]  λₙ
    (Chaque mode vérifie bₙ′ + λₙ bₙ = βₙ)
    = □   (trous : n²)
  — La série en sinus de u(x, 0) : d'abord Iₙ = ∫₀^π u(x, 0) sin(nx) dx  [juge equiv]  départ : ∫_{0}^{π} x(π − x)sin(nx) dx
    = □(1 − (−1)^n)/n³   (trous : 2(1 − (−1)^n)/n³)
  — Le coefficient bₙ(0) de la série en sinus  [juge prob]  départ : bₙ(0)
    = □/(πn³)   (trous : 4(1 − (−1)^n)/(πn³))
  — Les modes sans source (n ≠ 1)  [juge prob]  départ : bₙ(t), n ≠ 1
    = (4(1 − (−1)^n)/(πn³))□   (trous : (4(1 − (−1)^n)/(πn³))e^(−n²t))
  aides : Développe aussi la source sur les modes sin(nπx/L) : chaque coefficient vérifie bₙ′ + λₙbₙ = βₙ, une EDO linéaire d'ordre 1. | Le mode 1 : b(t) = b(0)e^(−λt) + (β/λ)(1 − e^(−λt)), avec β = 1. | b₁(t) = (8/π)e^(−t) + (1)(1 − e^(−t))
  pièges : f_heat_rate, f_heat_bc_coef

```

### Niveau 3

```
On résout ut − uxx = sin(x) sur ]0 ; π[, avec u(0, t) = u(π, t) = 0 et u(x, 0) = 1, en développant u(x, t) = Σ bₙ(t) sin(nx). Fais seulement les étapes demandées.
  [tap, suivre l'erreur, menu menu]  β_1
    (La source sur les modes : sin(x) = Σ βₙ sin(nx))
    (Seul le mode n = 1 reçoit la source : les autres βₙ sont nuls.)
    = 1
  — Chaque mode vérifie bₙ′ + λₙ bₙ = βₙ  [juge prob]  départ : λₙ
    = n²
  — La série en sinus de u(x, 0) : d'abord Iₙ = ∫₀^π u(x, 0) sin(nx) dx  [juge equiv]  départ : ∫_{0}^{π} sin(nx) dx
    = (1 − (−1)^n)/n
  — Le coefficient bₙ(0) de la série en sinus  [juge prob]  départ : bₙ(0)
    = 2(1 − (−1)^n)/(nπ)
  — Le mode n = 1, avec b₁(0) = 4/π  [juge prob]  départ : b_1(t)
    = (4/π)e^(−t) + (1)(1 − e^(−t))
  aides : Développe aussi la source sur les modes sin(nπx/L) : chaque coefficient vérifie bₙ′ + λₙbₙ = βₙ, une EDO linéaire d'ordre 1. | Le mode 1 : b(t) = b(0)e^(−λt) + (β/λ)(1 − e^(−λt)), avec β = 1. | b₁(t) = (4/π)e^(−t) + (1)(1 − e^(−t))
  pièges : f_heat_rate, f_heat_bc_coef, f_heat_source_steady

On résout ut − uxx = 2sin(x) sur ]0 ; π[, avec u(0, t) = u(π, t) = 0 et u(x, 0) = 1, en développant u(x, t) = Σ bₙ(t) sin(nx). Fais seulement les étapes demandées.
  [tap, suivre l'erreur, menu menu]  β_1
    (La source sur les modes : 2sin(x) = Σ βₙ sin(nx))
    (Seul le mode n = 1 reçoit la source : les autres βₙ sont nuls.)
    = 2
  — Chaque mode vérifie bₙ′ + λₙ bₙ = βₙ  [juge prob]  départ : λₙ
    = n²
  — La série en sinus de u(x, 0) : d'abord Iₙ = ∫₀^π u(x, 0) sin(nx) dx  [juge equiv]  départ : ∫_{0}^{π} sin(nx) dx
    = (1 − (−1)^n)/n
  — Le coefficient bₙ(0) de la série en sinus  [juge prob]  départ : bₙ(0)
    = 2(1 − (−1)^n)/(nπ)
  — Le mode n = 1, avec b₁(0) = 4/π  [juge prob]  départ : b_1(t)
    = (4/π)e^(−t) + (2)(1 − e^(−t))
  aides : Développe aussi la source sur les modes sin(nπx/L) : chaque coefficient vérifie bₙ′ + λₙbₙ = βₙ, une EDO linéaire d'ordre 1. | Le mode 1 : b(t) = b(0)e^(−λt) + (β/λ)(1 − e^(−λt)), avec β = 2. | b₁(t) = (4/π)e^(−t) + (2)(1 − e^(−t))
  pièges : f_heat_rate, f_heat_bc_coef, f_heat_source_steady

On résout ut − uxx = 3sin(πx) sur ]0 ; 1[, avec u(0, t) = u(1, t) = 0 et u(x, 0) = 1, en développant u(x, t) = Σ bₙ(t) sin(nπx). Fais seulement les étapes demandées.
  [tap, suivre l'erreur, menu menu]  β_1
    (La source sur les modes : 3sin(πx) = Σ βₙ sin(nπx))
    (Seul le mode n = 1 reçoit la source : les autres βₙ sont nuls.)
    = 3
  — Chaque mode vérifie bₙ′ + λₙ bₙ = βₙ  [juge prob]  départ : λₙ
    = n²π²
  — La série en sinus de u(x, 0) : d'abord Iₙ = ∫₀¹ u(x, 0) sin(nπx) dx  [juge equiv]  départ : ∫_{0}^{1} sin(nπx) dx
    = (1 − (−1)^n)/(nπ)
  — Le coefficient bₙ(0) de la série en sinus  [juge prob]  départ : bₙ(0)
    = 2(1 − (−1)^n)/(nπ)
  — Le mode n = 1, avec b₁(0) = 4/π  [juge prob]  départ : b_1(t)
    = (4/π)e^(−π²t) + (3/π²)(1 − e^(−π²t))
  aides : Développe aussi la source sur les modes sin(nπx/L) : chaque coefficient vérifie bₙ′ + λₙbₙ = βₙ, une EDO linéaire d'ordre 1. | Le mode 1 : b(t) = b(0)e^(−λt) + (β/λ)(1 − e^(−λt)), avec β = 3. | b₁(t) = (4/π)e^(−π²t) + (3/π²)(1 − e^(−π²t))
  pièges : f_heat_rate, f_heat_bc_coef, f_heat_source_steady

```

### Niveau 4

```
Résous ut − uxx = sin(2x) sur ]0 ; π[, avec u(0, t) = u(π, t) = 0 et u(x, 0) = x(π − x), en développant u(x, t) = Σ bₙ(t) sin(nx). Écris u avec une série (sum(…, n, 1, ∞)).
  [free, suivre l'erreur]  ∫_{0}^{π} x(π − x)sin(nx) dx
    (La série en sinus de u(x, 0) : d'abord Iₙ = ∫₀^π u(x, 0) sin(nx) dx)
    = 2(1 − (−1)^n)/n³
  — Le coefficient bₙ(0) de la série en sinus  [juge prob]  départ : bₙ(0)
    = 4(1 − (−1)^n)/(πn³)
  — La source sur les modes : sin(2x) = Σ βₙ sin(nx)  [juge prob]  départ : β_2
    (Seul le mode n = 2 reçoit la source : les autres βₙ sont nuls.)
    = 1
  — Chaque mode vérifie bₙ′ + λₙ bₙ = βₙ  [juge prob]  départ : λₙ
    = n²
  — Les modes sans source (n ≠ 2)  [juge prob]  départ : bₙ(t), n ≠ 2
    = (4(1 − (−1)^n)/(πn³))e^(−n²t)
  — Le mode n = 2, avec b₂(0) = 0  [juge prob]  départ : b_2(t)
    = (1/4)(1 − e^(−4t))
  — La solution  [juge prob]  départ : u(x, t)
    = Σ_{n=1}^{∞} (4(1 − (−1)^n)/(πn³))e^(−n²t)sin(nx) + (1/4)(1 − e^(−4t))sin(2x)
  aides : Développe aussi la source sur les modes sin(nπx/L) : chaque coefficient vérifie bₙ′ + λₙbₙ = βₙ, une EDO linéaire d'ordre 1. | Le mode 2 : b(t) = b(0)e^(−λt) + (β/λ)(1 − e^(−λt)), avec β = 1. | b₂(t) = (1/4)(1 − e^(−4t))
  pièges : f_heat_bc_coef, f_heat_rate, f_heat_source_steady

Résous ut − uxx = 3sin(3x) sur ]0 ; π[, avec u(0, t) = u(π, t) = 0 et u(x, 0) = 1, en développant u(x, t) = Σ bₙ(t) sin(nx). Écris u avec une série (sum(…, n, 1, ∞)).
  [free, suivre l'erreur]  ∫_{0}^{π} sin(nx) dx
    (La série en sinus de u(x, 0) : d'abord Iₙ = ∫₀^π u(x, 0) sin(nx) dx)
    = (1 − (−1)^n)/n
  — Le coefficient bₙ(0) de la série en sinus  [juge prob]  départ : bₙ(0)
    = 2(1 − (−1)^n)/(nπ)
  — La source sur les modes : 3sin(3x) = Σ βₙ sin(nx)  [juge prob]  départ : β_3
    (Seul le mode n = 3 reçoit la source : les autres βₙ sont nuls.)
    = 3
  — Chaque mode vérifie bₙ′ + λₙ bₙ = βₙ  [juge prob]  départ : λₙ
    = n²
  — Les modes sans source (n ≠ 3)  [juge prob]  départ : bₙ(t), n ≠ 3
    = (2(1 − (−1)^n)/(nπ))e^(−n²t)
  — Le mode n = 3, avec b₃(0) = 4/(3π)  [juge prob]  départ : b_3(t)
    = (4/(3π))e^(−9t) + (1/3)(1 − e^(−9t))
  — La solution  [juge prob]  départ : u(x, t)
    = Σ_{n=1}^{∞} (2(1 − (−1)^n)/(nπ))e^(−n²t)sin(nx) + (1/3)(1 − e^(−9t))sin(3x)
  aides : Développe aussi la source sur les modes sin(nπx/L) : chaque coefficient vérifie bₙ′ + λₙbₙ = βₙ, une EDO linéaire d'ordre 1. | Le mode 3 : b(t) = b(0)e^(−λt) + (β/λ)(1 − e^(−λt)), avec β = 3. | b₃(t) = (4/(3π))e^(−9t) + (1/3)(1 − e^(−9t))
  pièges : f_heat_bc_coef, f_heat_rate, f_heat_source_steady

Résous ut − uxx = sin(2x) sur ]0 ; π[, avec u(0, t) = u(π, t) = 0 et u(x, 0) = x(π − x), en développant u(x, t) = Σ bₙ(t) sin(nx). Écris u avec une série (sum(…, n, 1, ∞)).
  [free, suivre l'erreur]  ∫_{0}^{π} x(π − x)sin(nx) dx
    (La série en sinus de u(x, 0) : d'abord Iₙ = ∫₀^π u(x, 0) sin(nx) dx)
    = 2(1 − (−1)^n)/n³
  — Le coefficient bₙ(0) de la série en sinus  [juge prob]  départ : bₙ(0)
    = 4(1 − (−1)^n)/(πn³)
  — La source sur les modes : sin(2x) = Σ βₙ sin(nx)  [juge prob]  départ : β_2
    (Seul le mode n = 2 reçoit la source : les autres βₙ sont nuls.)
    = 1
  — Chaque mode vérifie bₙ′ + λₙ bₙ = βₙ  [juge prob]  départ : λₙ
    = n²
  — Les modes sans source (n ≠ 2)  [juge prob]  départ : bₙ(t), n ≠ 2
    = (4(1 − (−1)^n)/(πn³))e^(−n²t)
  — Le mode n = 2, avec b₂(0) = 0  [juge prob]  départ : b_2(t)
    = (1/4)(1 − e^(−4t))
  — La solution  [juge prob]  départ : u(x, t)
    = Σ_{n=1}^{∞} (4(1 − (−1)^n)/(πn³))e^(−n²t)sin(nx) + (1/4)(1 − e^(−4t))sin(2x)
  aides : Développe aussi la source sur les modes sin(nπx/L) : chaque coefficient vérifie bₙ′ + λₙbₙ = βₙ, une EDO linéaire d'ordre 1. | Le mode 2 : b(t) = b(0)e^(−λt) + (β/λ)(1 − e^(−λt)), avec β = 1. | b₂(t) = (1/4)(1 − e^(−4t))
  pièges : f_heat_bc_coef, f_heat_rate, f_heat_source_steady

```

### Niveau 5

```
Résous ut − uxx = 2sin(2x) sur ]0 ; π[, avec u(0, t) = u(π, t) = 0 et u(x, 0) = x(π − x), en développant u(x, t) = Σ bₙ(t) sin(nx). Écris u avec une série (sum(…, n, 1, ∞)).
  [problème, 8 points]
  partie 1 (Début du problème : 1 ; Le coefficient bₙ(0) de la série en sinus : 1 ; La source sur les modes : 2sin(2x) = Σ βₙ sin(nx) : 1 ; Chaque mode vérifie bₙ′ + λₙ bₙ = βₙ : 1 ; Les modes sans source (n ≠ 2) : 1,5 ; Le mode n = 2, avec b₂(0) = 0 : 1,5 ; La solution : 1)
    [free, sans aide, suivre l'erreur]  ∫_{0}^{π} x(π − x)sin(nx) dx
      (La série en sinus de u(x, 0) : d'abord Iₙ = ∫₀^π u(x, 0) sin(nx) dx)
      = 2(1 − (−1)^n)/n³
    — Le coefficient bₙ(0) de la série en sinus  [juge prob]  départ : bₙ(0)
      = 4(1 − (−1)^n)/(πn³)
    — La source sur les modes : 2sin(2x) = Σ βₙ sin(nx)  [juge prob]  départ : β_2
      (Seul le mode n = 2 reçoit la source : les autres βₙ sont nuls.)
      = 2
    — Chaque mode vérifie bₙ′ + λₙ bₙ = βₙ  [juge prob]  départ : λₙ
      = n²
    — Les modes sans source (n ≠ 2)  [juge prob]  départ : bₙ(t), n ≠ 2
      = (4(1 − (−1)^n)/(πn³))e^(−n²t)
    — Le mode n = 2, avec b₂(0) = 0  [juge prob]  départ : b_2(t)
      = (1/2)(1 − e^(−4t))
    — La solution  [juge prob]  départ : u(x, t)
      = Σ_{n=1}^{∞} (4(1 − (−1)^n)/(πn³))e^(−n²t)sin(nx) + (1/2)(1 − e^(−4t))sin(2x)
  pièges : f_heat_bc_coef, f_heat_rate, f_heat_source_steady

Résous ut − uxx = sin(2πx) sur ]0 ; 1[, avec u(0, t) = u(1, t) = 0 et u(x, 0) = x(1 − x), en développant u(x, t) = Σ bₙ(t) sin(nπx). Écris u avec une série (sum(…, n, 1, ∞)).
  [problème, 8 points]
  partie 1 (Début du problème : 1 ; Le coefficient bₙ(0) de la série en sinus : 1 ; La source sur les modes : sin(2πx) = Σ βₙ sin(nπx) : 1 ; Chaque mode vérifie bₙ′ + λₙ bₙ = βₙ : 1 ; Les modes sans source (n ≠ 2) : 1,5 ; Le mode n = 2, avec b₂(0) = 0 : 1,5 ; La solution : 1)
    [free, sans aide, suivre l'erreur]  ∫_{0}^{1} x(1 − x)sin(nπx) dx
      (La série en sinus de u(x, 0) : d'abord Iₙ = ∫₀¹ u(x, 0) sin(nπx) dx)
      = 2(1 − (−1)^n)/(π³n³)
    — Le coefficient bₙ(0) de la série en sinus  [juge prob]  départ : bₙ(0)
      = 4(1 − (−1)^n)/(π³n³)
    — La source sur les modes : sin(2πx) = Σ βₙ sin(nπx)  [juge prob]  départ : β_2
      (Seul le mode n = 2 reçoit la source : les autres βₙ sont nuls.)
      = 1
    — Chaque mode vérifie bₙ′ + λₙ bₙ = βₙ  [juge prob]  départ : λₙ
      = n²π²
    — Les modes sans source (n ≠ 2)  [juge prob]  départ : bₙ(t), n ≠ 2
      = (4(1 − (−1)^n)/(π³n³))e^(−n²π²t)
    — Le mode n = 2, avec b₂(0) = 0  [juge prob]  départ : b_2(t)
      = (1/(4π²))(1 − e^(−4π²t))
    — La solution  [juge prob]  départ : u(x, t)
      = Σ_{n=1}^{∞} (4(1 − (−1)^n)/(π³n³))e^(−n²π²t)sin(nπx) + (1/(4π²))(1 − e^(−4π²t))sin(2πx)
  pièges : f_heat_bc_coef, f_heat_rate, f_heat_source_steady

Résous ut − uxx = sin(3x) sur ]0 ; π[, avec u(0, t) = u(π, t) = 0 et u(x, 0) = x(π − x), en développant u(x, t) = Σ bₙ(t) sin(nx). Écris u avec une série (sum(…, n, 1, ∞)).
  [problème, 8 points]
  partie 1 (Début du problème : 1 ; Le coefficient bₙ(0) de la série en sinus : 1 ; La source sur les modes : sin(3x) = Σ βₙ sin(nx) : 1 ; Chaque mode vérifie bₙ′ + λₙ bₙ = βₙ : 1 ; Les modes sans source (n ≠ 3) : 1,5 ; Le mode n = 3, avec b₃(0) = 8/(27π) : 1,5 ; La solution : 1)
    [free, sans aide, suivre l'erreur]  ∫_{0}^{π} x(π − x)sin(nx) dx
      (La série en sinus de u(x, 0) : d'abord Iₙ = ∫₀^π u(x, 0) sin(nx) dx)
      = 2(1 − (−1)^n)/n³
    — Le coefficient bₙ(0) de la série en sinus  [juge prob]  départ : bₙ(0)
      = 4(1 − (−1)^n)/(πn³)
    — La source sur les modes : sin(3x) = Σ βₙ sin(nx)  [juge prob]  départ : β_3
      (Seul le mode n = 3 reçoit la source : les autres βₙ sont nuls.)
      = 1
    — Chaque mode vérifie bₙ′ + λₙ bₙ = βₙ  [juge prob]  départ : λₙ
      = n²
    — Les modes sans source (n ≠ 3)  [juge prob]  départ : bₙ(t), n ≠ 3
      = (4(1 − (−1)^n)/(πn³))e^(−n²t)
    — Le mode n = 3, avec b₃(0) = 8/(27π)  [juge prob]  départ : b_3(t)
      = (8/(27π))e^(−9t) + (1/9)(1 − e^(−9t))
    — La solution  [juge prob]  départ : u(x, t)
      = Σ_{n=1}^{∞} (4(1 − (−1)^n)/(πn³))e^(−n²t)sin(nx) + (1/9)(1 − e^(−9t))sin(3x)
  pièges : f_heat_bc_coef, f_heat_rate, f_heat_source_steady

```

### Variantes d'examen

```
Résous ut − uxx = 3sin(2πx) sur ]0 ; 1[, avec u(0, t) = u(1, t) = 0 et u(x, 0) = x(1 − x), en développant u(x, t) = Σ bₙ(t) sin(nπx). Écris u avec une série (sum(…, n, 1, ∞)).
  [problème, examen open, 8 points]
  partie 1 (Début du problème : 1 ; Le coefficient bₙ(0) de la série en sinus : 1 ; La source sur les modes : 3sin(2πx) = Σ βₙ sin(nπx) : 1 ; Chaque mode vérifie bₙ′ + λₙ bₙ = βₙ : 1 ; Les modes sans source (n ≠ 2) : 1,5 ; Le mode n = 2, avec b₂(0) = 0 : 1,5 ; La solution : 1)
    [free, sans aide, suivre l'erreur, examen open]  ∫_{0}^{1} x(1 − x)sin(nπx) dx
      (La série en sinus de u(x, 0) : d'abord Iₙ = ∫₀¹ u(x, 0) sin(nπx) dx)
      = 2(1 − (−1)^n)/(π³n³)
    — Le coefficient bₙ(0) de la série en sinus  [juge prob]  départ : bₙ(0)
      = 4(1 − (−1)^n)/(π³n³)
    — La source sur les modes : 3sin(2πx) = Σ βₙ sin(nπx)  [juge prob]  départ : β_2
      (Seul le mode n = 2 reçoit la source : les autres βₙ sont nuls.)
      = 3
    — Chaque mode vérifie bₙ′ + λₙ bₙ = βₙ  [juge prob]  départ : λₙ
      = n²π²
    — Les modes sans source (n ≠ 2)  [juge prob]  départ : bₙ(t), n ≠ 2
      = (4(1 − (−1)^n)/(π³n³))e^(−n²π²t)
    — Le mode n = 2, avec b₂(0) = 0  [juge prob]  départ : b_2(t)
      = (3/(4π²))(1 − e^(−4π²t))
    — La solution  [juge prob]  départ : u(x, t)
      = Σ_{n=1}^{∞} (4(1 − (−1)^n)/(π³n³))e^(−n²π²t)sin(nπx) + (3/(4π²))(1 − e^(−4π²t))sin(2πx)
  pièges : f_heat_bc_coef, f_heat_rate, f_heat_source_steady

```

## Équation des ondes ; d'Alembert par Fourier en x (`f-wave`, BA4)

_u_tt = c²u_xx : sur ℝ, û = û₀ cos(cαt) puis d'Alembert ; sur ]0 ; π[, un oscillateur par mode._

### Niveau 1

```
Résous utt − ¼ uxx = 0 sur ]0 ; π[, avec u(0, t) = u(π, t) = 0, u(x, 0) = sin(3x) et ut(x, 0) = 0.
  [guided]  ωₙ
    (Les modes sin(nx) : bₙ″ + ωₙ² bₙ = 0)
    = □   (trous : (1/2)n)
  — Le mode n = 3 : b₃(0) = 1, b₃′(0) = 0  [juge prob]  départ : b_3(t)
    = cos(□)   (trous : cos(3t/2))
  — La solution  [juge prob]  départ : u(x, t)
    = cos(3t/2)sin(□)   (trous : cos(3t/2)sin(3x))
  aides : Chaque mode sin(nx) est un oscillateur : bₙ″ + (cn)²bₙ = 0, avec bₙ(0) et bₙ′(0) lus sur les conditions initiales. | ωₙ = (1/2)n ; b(t) = b(0) cos(ωt) + (b′(0)/ω) sin(ωt). | u(x, t) = cos(3t/2)sin(3x)
  pièges : f_wave_factor

Résous utt = uxx sur ]0 ; π[, avec u(0, t) = u(π, t) = 0, u(x, 0) = −sin(2x) et ut(x, 0) = 0.
  [guided]  ωₙ
    (Les modes sin(nx) : bₙ″ + ωₙ² bₙ = 0)
    = □   (trous : n)
  — Le mode n = 2 : b₂(0) = −1, b₂′(0) = 0  [juge prob]  départ : b_2(t)
    = −cos(□)   (trous : −cos(2t))
  — La solution  [juge prob]  départ : u(x, t)
    = −cos(2t)sin(□)   (trous : −cos(2t)sin(2x))
  aides : Chaque mode sin(nx) est un oscillateur : bₙ″ + (cn)²bₙ = 0, avec bₙ(0) et bₙ′(0) lus sur les conditions initiales. | ωₙ = n ; b(t) = b(0) cos(ωt) + (b′(0)/ω) sin(ωt). | u(x, t) = −cos(2t)sin(2x)

Résous utt = uxx sur ]0 ; π[, avec u(0, t) = u(π, t) = 0, u(x, 0) = −2sin(x) et ut(x, 0) = 0.
  [guided]  ωₙ
    (Les modes sin(nx) : bₙ″ + ωₙ² bₙ = 0)
    = □   (trous : n)
  — Le mode n = 1 : b₁(0) = −2, b₁′(0) = 0  [juge prob]  départ : b_1(t)
    = −2cos(□)   (trous : −2cos(t))
  — La solution  [juge prob]  départ : u(x, t)
    = −2cos(t)sin(□)   (trous : −2cos(t)sin(x))
  aides : Chaque mode sin(nx) est un oscillateur : bₙ″ + (cn)²bₙ = 0, avec bₙ(0) et bₙ′(0) lus sur les conditions initiales. | ωₙ = n ; b(t) = b(0) cos(ωt) + (b′(0)/ω) sin(ωt). | u(x, t) = −2cos(t)sin(x)

```

### Niveau 2

```
Résous utt = uxx sur ℝ, avec u(x, 0) = e^(−|x|) et ut(x, 0) = 0, par la transformée de Fourier en x. Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  c
    (La vitesse c (u_tt = c²u_xx))
    = □   (trous : 1)
  — La transformée de Fourier en x de l'EDP (FP4)  [juge prob]  départ : ûₜₜ
    ? ℱ(u_xx)(α, t) = ? ✔ (iα)²û = −α²û / · α²û / · iαû
    = □û   (trous : −α²û)
  — û(α, t) : û(α, 0) = û₀(α) par la table, û_t(α, 0) = 0  [juge prob]  départ : û(α, t)
    (u₀ = e^(−|x|) : ligne F7 de la table, avec w = 1.)
    = √(2/π)cos(αt)/(1 + α²)
  — Retour en x : cos(cαt) = (e^(icαt) + e^(−icαt))/2 et FP8  [juge prob]  départ : u(x, t)
    = (e^(−|x + □|) + e^(−|x − t|))/2   (trous : (e^(−|x + t|) + e^(−|x − t|))/2)
  aides : Transforme en x : ℱ(u_xx) = (iα)²û. On obtient un oscillateur en t pour chaque α. | û_tt = −c²α²û avec c = 1, donc û = û₀(α) cos(αt). | u(x, t) = (e^(−|x + t|) + e^(−|x − t|))/2
  pièges : f_wave_factor, f_ft_deriv_sign

Résous utt = 9uxx sur ℝ, avec u(x, 0) = e^(−|x|) et ut(x, 0) = 0, par la transformée de Fourier en x. Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  c
    (La vitesse c (u_tt = c²u_xx))
    = □   (trous : 3)
  — La transformée de Fourier en x de l'EDP (FP4)  [juge prob]  départ : ûₜₜ
    ? ℱ(u_xx)(α, t) = ? ✔ (iα)²û = −α²û / · α²û / · iαû
    = □û   (trous : −9α²û)
  — û(α, t) : û(α, 0) = û₀(α) par la table, û_t(α, 0) = 0  [juge prob]  départ : û(α, t)
    (u₀ = e^(−|x|) : ligne F7 de la table, avec w = 1.)
    = √(2/π)cos(3αt)/(1 + α²)
  — Retour en x : cos(cαt) = (e^(icαt) + e^(−icαt))/2 et FP8  [juge prob]  départ : u(x, t)
    = (e^(−|x + □|) + e^(−|x − 3t|))/2   (trous : (e^(−|x + 3t|) + e^(−|x − 3t|))/2)
  aides : Transforme en x : ℱ(u_xx) = (iα)²û. On obtient un oscillateur en t pour chaque α. | û_tt = −c²α²û avec c = 3, donc û = û₀(α) cos(3αt). | u(x, t) = (e^(−|x + 3t|) + e^(−|x − 3t|))/2
  pièges : f_wave_factor, f_ft_deriv_sign

Résous utt = uxx sur ℝ, avec u(x, 0) = 1/(1 + x²) et ut(x, 0) = 0, par la transformée de Fourier en x. Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  c
    (La vitesse c (u_tt = c²u_xx))
    = □   (trous : 1)
  — La transformée de Fourier en x de l'EDP (FP4)  [juge prob]  départ : ûₜₜ
    ? ℱ(u_xx)(α, t) = ? ✔ (iα)²û = −α²û / · α²û / · iαû
    = □û   (trous : −α²û)
  — û(α, t) : û(α, 0) = û₀(α) par la table, û_t(α, 0) = 0  [juge prob]  départ : û(α, t)
    (u₀ = 1/(1 + x²) : ligne F6 de la table, avec w = 1.)
    = □cos(αt)   (trous : √(π/2)e^(−|α|)cos(αt))
  — Retour en x : cos(cαt) = (e^(icαt) + e^(−icαt))/2 et FP8  [juge prob]  départ : u(x, t)
    = (1/(1 + (x + □)²) + 1/(1 + (x − t)²))/2   (trous : (1/(1 + (x + t)²) + 1/(1 + (x − t)²))/2)
  aides : Transforme en x : ℱ(u_xx) = (iα)²û. On obtient un oscillateur en t pour chaque α. | û_tt = −c²α²û avec c = 1, donc û = û₀(α) cos(αt). | u(x, t) = (1/(1 + (x + t)²) + 1/(1 + (x − t)²))/2
  pièges : f_wave_factor, f_ft_deriv_sign

```

### Niveau 3

```
Résous utt = 4uxx sur ℝ, avec u(x, 0) = e^(−x²) et ut(x, 0) = 0, par la transformée de Fourier en x. Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [tap, suivre l'erreur, menu menu]  c
    (La vitesse c (u_tt = c²u_xx))
    = 2
  — La transformée de Fourier en x de l'EDP (FP4)  [juge prob]  départ : ûₜₜ
    ? ℱ(u_xx)(α, t) = ? ✔ (iα)²û = −α²û / · α²û / · iαû
    = −4α²û
  — û(α, t) : û(α, 0) = û₀(α) par la table, û_t(α, 0) = 0  [juge prob]  départ : û(α, t)
    (u₀ = e^(−x²) : ligne F8 de la table, avec w = 1.)
    = (1/√2)e^(−α²/4)cos(2αt)
  — Retour en x : cos(cαt) = (e^(icαt) + e^(−icαt))/2 et FP8  [juge prob]  départ : u(x, t)
    = (e^(−(x + 2t)²) + e^(−(x − 2t)²))/2
  aides : Transforme en x : ℱ(u_xx) = (iα)²û. On obtient un oscillateur en t pour chaque α. | û_tt = −c²α²û avec c = 2, donc û = û₀(α) cos(2αt). | u(x, t) = (e^(−(x + 2t)²) + e^(−(x − 2t)²))/2
  pièges : f_wave_factor, f_ft_deriv_sign

Résous utt = 9uxx sur ℝ, avec u(x, 0) = 1/(1 + x²) et ut(x, 0) = 0, par la transformée de Fourier en x. Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [tap, suivre l'erreur, menu menu]  c
    (La vitesse c (u_tt = c²u_xx))
    = 3
  — La transformée de Fourier en x de l'EDP (FP4)  [juge prob]  départ : ûₜₜ
    ? ℱ(u_xx)(α, t) = ? ✔ (iα)²û = −α²û / · α²û / · iαû
    = −9α²û
  — û(α, t) : û(α, 0) = û₀(α) par la table, û_t(α, 0) = 0  [juge prob]  départ : û(α, t)
    (u₀ = 1/(1 + x²) : ligne F6 de la table, avec w = 1.)
    = √(π/2)e^(−|α|)cos(3αt)
  — Retour en x : cos(cαt) = (e^(icαt) + e^(−icαt))/2 et FP8  [juge prob]  départ : u(x, t)
    = (1/(1 + (x + 3t)²) + 1/(1 + (x − 3t)²))/2
  aides : Transforme en x : ℱ(u_xx) = (iα)²û. On obtient un oscillateur en t pour chaque α. | û_tt = −c²α²û avec c = 3, donc û = û₀(α) cos(3αt). | u(x, t) = (1/(1 + (x + 3t)²) + 1/(1 + (x − 3t)²))/2
  pièges : f_wave_factor, f_ft_deriv_sign

Résous utt − ¼ uxx = 0 sur ]0 ; π[, avec u(0, t) = u(π, t) = 0, u(x, 0) = −2sin(3x) et ut(x, 0) = −2sin(x).
  [tap, suivre l'erreur, menu menu]  ωₙ
    (Les modes sin(nx) : bₙ″ + ωₙ² bₙ = 0)
    ? Quelle méthode ? ✔ Séparation des variables : l'intervalle ]0 ; π[ est borné / · Transformée de Fourier en x
    = (1/2)n
  — Le mode n = 3 : b₃(0) = −2, b₃′(0) = 0  [juge prob]  départ : b_3(t)
    = −2cos(3t/2)
  — Le mode n = 1 : b₁(0) = 0, b₁′(0) = −2  [juge prob]  départ : b_1(t)
    = −4sin(t/2)
  — La solution  [juge prob]  départ : u(x, t)
    = −2cos(3t/2)sin(3x) − 4sin(t/2)sin(x)
  aides : Chaque mode sin(nx) est un oscillateur : bₙ″ + (cn)²bₙ = 0, avec bₙ(0) et bₙ′(0) lus sur les conditions initiales. | ωₙ = (1/2)n ; b(t) = b(0) cos(ωt) + (b′(0)/ω) sin(ωt). | u(x, t) = −2cos(3t/2)sin(3x) − 4sin(t/2)sin(x)
  pièges : f_wave_factor

```

### Niveau 4

```
Résous utt = 4uxx sur ]0 ; π[, avec u(0, t) = u(π, t) = 0, u(x, 0) = sin(3x) et ut(x, 0) = −2sin(3x).
  [free, suivre l'erreur]  ωₙ
    (Les modes sin(nx) : bₙ″ + ωₙ² bₙ = 0)
    = 2n
  — Le mode n = 3 : b₃(0) = 1, b₃′(0) = −2  [juge prob]  départ : b_3(t)
    = cos(6t) − (1/3)sin(6t)
  — La solution  [juge prob]  départ : u(x, t)
    = (cos(6t) − (1/3)sin(6t))sin(3x)
  aides : Chaque mode sin(nx) est un oscillateur : bₙ″ + (cn)²bₙ = 0, avec bₙ(0) et bₙ′(0) lus sur les conditions initiales. | ωₙ = 2n ; b(t) = b(0) cos(ωt) + (b′(0)/ω) sin(ωt). | u(x, t) = (cos(6t) − (1/3)sin(6t))sin(3x)
  pièges : f_wave_factor

Résous utt = 9uxx sur ℝ, avec u(x, 0) = e^(−|x|) et ut(x, 0) = 0, par la transformée de Fourier en x. Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [free, suivre l'erreur]  c
    (La vitesse c (u_tt = c²u_xx))
    = 3
  — La transformée de Fourier en x de l'EDP (FP4)  [juge prob]  départ : ûₜₜ
    = −9α²û
  — û(α, t) : û(α, 0) = û₀(α) par la table, û_t(α, 0) = 0  [juge prob]  départ : û(α, t)
    (u₀ = e^(−|x|) : ligne F7 de la table, avec w = 1.)
    = √(2/π)cos(3αt)/(1 + α²)
  — Retour en x : cos(cαt) = (e^(icαt) + e^(−icαt))/2 et FP8  [juge prob]  départ : u(x, t)
    = (e^(−|x + 3t|) + e^(−|x − 3t|))/2
  aides : Transforme en x : ℱ(u_xx) = (iα)²û. On obtient un oscillateur en t pour chaque α. | û_tt = −c²α²û avec c = 3, donc û = û₀(α) cos(3αt). | u(x, t) = (e^(−|x + 3t|) + e^(−|x − 3t|))/2
  pièges : f_wave_factor, f_ft_deriv_sign

Résous utt = uxx sur ]0 ; π[, avec u(0, t) = u(π, t) = 0, u(x, 0) = −2sin(2x) et ut(x, 0) = −sin(x).
  [free, suivre l'erreur]  ωₙ
    (Les modes sin(nx) : bₙ″ + ωₙ² bₙ = 0)
    = n
  — Le mode n = 2 : b₂(0) = −2, b₂′(0) = 0  [juge prob]  départ : b_2(t)
    = −2cos(2t)
  — Le mode n = 1 : b₁(0) = 0, b₁′(0) = −1  [juge prob]  départ : b_1(t)
    = −sin(t)
  — La solution  [juge prob]  départ : u(x, t)
    = −2cos(2t)sin(2x) − sin(t)sin(x)
  aides : Chaque mode sin(nx) est un oscillateur : bₙ″ + (cn)²bₙ = 0, avec bₙ(0) et bₙ′(0) lus sur les conditions initiales. | ωₙ = n ; b(t) = b(0) cos(ωt) + (b′(0)/ω) sin(ωt). | u(x, t) = −2cos(2t)sin(2x) − sin(t)sin(x)

```

### Niveau 5

```
D'abord une question sur ℝ, puis : résous utt = 4uxx sur ]0 ; π[, avec u(0, t) = u(π, t) = 0, u(x, 0) = −sin(4x) et ut(x, 0) = 2sin(2x).
  [problème, 5 points]
  partie 1 (Sur ℝ : la transformée : 1)
  Sur ℝ, utt = 9uxx, u(x, 0) = u₀(x), ut(x, 0) = 0. Que vaut û(α, t) ?
    ✔ û(α, t) = û₀(α) cos(3αt)   · û(α, t) = û₀(α) cos(9αt) [f_wave_factor]   · û(α, t) = û₀(α) cosh(3αt) [f_ft_deriv_sign]   · û(α, t) = û₀(α) e^(−3|α|t)
  partie 2 (Sur ]0 ; π[ : 1 ; Le mode n = 4 : b₄(0) = −1, b₄′(0) = 0 : 1 ; Le mode n = 2 : b₂(0) = 0, b₂′(0) = 2 : 1 ; La solution : 1)
  Résous utt = 4uxx sur ]0 ; π[, avec u(0, t) = u(π, t) = 0, u(x, 0) = −sin(4x) et ut(x, 0) = 2sin(2x).
    [free, sans aide, suivre l'erreur]  ωₙ
      (Les modes sin(nx) : bₙ″ + ωₙ² bₙ = 0)
      = 2n
    — Le mode n = 4 : b₄(0) = −1, b₄′(0) = 0  [juge prob]  départ : b_4(t)
      = −cos(8t)
    — Le mode n = 2 : b₂(0) = 0, b₂′(0) = 2  [juge prob]  départ : b_2(t)
      = (1/2)sin(4t)
    — La solution  [juge prob]  départ : u(x, t)
      = −cos(8t)sin(4x) + (1/2)sin(4t)sin(2x)
  pièges : f_wave_factor, f_ft_deriv_sign

D'abord une question sur ℝ, puis : résous utt = 9uxx sur ]0 ; π[, avec u(0, t) = u(π, t) = 0, u(x, 0) = −sin(3x) et ut(x, 0) = −sin(x).
  [problème, 5 points]
  partie 1 (Sur ℝ : la transformée : 1)
  Sur ℝ, utt = 9uxx, u(x, 0) = u₀(x), ut(x, 0) = 0. Que vaut û(α, t) ?
    · û(α, t) = û₀(α) cosh(3αt) [f_ft_deriv_sign]   · û(α, t) = û₀(α) cos(9αt) [f_wave_factor]   · û(α, t) = û₀(α) e^(−3|α|t)   ✔ û(α, t) = û₀(α) cos(3αt)
  partie 2 (Sur ]0 ; π[ : 1 ; Le mode n = 3 : b₃(0) = −1, b₃′(0) = 0 : 1 ; Le mode n = 1 : b₁(0) = 0, b₁′(0) = −1 : 1 ; La solution : 1)
  Résous utt = 9uxx sur ]0 ; π[, avec u(0, t) = u(π, t) = 0, u(x, 0) = −sin(3x) et ut(x, 0) = −sin(x).
    [free, sans aide, suivre l'erreur]  ωₙ
      (Les modes sin(nx) : bₙ″ + ωₙ² bₙ = 0)
      = 3n
    — Le mode n = 3 : b₃(0) = −1, b₃′(0) = 0  [juge prob]  départ : b_3(t)
      = −cos(9t)
    — Le mode n = 1 : b₁(0) = 0, b₁′(0) = −1  [juge prob]  départ : b_1(t)
      = −(1/3)sin(3t)
    — La solution  [juge prob]  départ : u(x, t)
      = −cos(9t)sin(3x) − (1/3)sin(3t)sin(x)
  pièges : f_wave_factor, f_ft_deriv_sign

D'abord une question sur ℝ, puis : résous utt = 9uxx sur ]0 ; π[, avec u(0, t) = u(π, t) = 0, u(x, 0) = −sin(2x) et ut(x, 0) = sin(3x).
  [problème, 5 points]
  partie 1 (Sur ℝ : la transformée : 1)
  Sur ℝ, utt = 4uxx, u(x, 0) = u₀(x), ut(x, 0) = 0. Que vaut û(α, t) ?
    · û(α, t) = û₀(α) cos(4αt) [f_wave_factor]   · û(α, t) = û₀(α) cosh(2αt) [f_ft_deriv_sign]   ✔ û(α, t) = û₀(α) cos(2αt)   · û(α, t) = û₀(α) e^(−2|α|t)
  partie 2 (Sur ]0 ; π[ : 1 ; Le mode n = 2 : b₂(0) = −1, b₂′(0) = 0 : 1 ; Le mode n = 3 : b₃(0) = 0, b₃′(0) = 1 : 1 ; La solution : 1)
  Résous utt = 9uxx sur ]0 ; π[, avec u(0, t) = u(π, t) = 0, u(x, 0) = −sin(2x) et ut(x, 0) = sin(3x).
    [free, sans aide, suivre l'erreur]  ωₙ
      (Les modes sin(nx) : bₙ″ + ωₙ² bₙ = 0)
      = 3n
    — Le mode n = 2 : b₂(0) = −1, b₂′(0) = 0  [juge prob]  départ : b_2(t)
      = −cos(6t)
    — Le mode n = 3 : b₃(0) = 0, b₃′(0) = 1  [juge prob]  départ : b_3(t)
      = (1/9)sin(9t)
    — La solution  [juge prob]  départ : u(x, t)
      = −cos(6t)sin(2x) + (1/9)sin(9t)sin(3x)
  pièges : f_wave_factor, f_ft_deriv_sign

```

### Variantes d'examen

```
On résout utt − ¼ uxx = 0 sur ℝ, avec u(x, 0) = u₀(x) et ut(x, 0) = 0, par la transformée de Fourier en x (û₀ = ℱ(u₀)). Cochez les affirmations vraies. (plusieurs réponses possibles)
  ✔ ûtt + (α²/4)û = 0   ✔ û(α, t) = û₀(α) cos(αt/2)   · ûtt + (α²/2)û = 0 [f_wave_factor]   · u(x, t) = (u₀(x + t/2) + u₀(x − t/2))/4 [f_wave_factor]   · û(α, t) = û₀(α) cos(αt/4) [f_wave_factor]
  [examen mcq]
  pièges : f_wave_factor

Résous utt = uxx sur ]0 ; π[, avec u(0, t) = u(π, t) = 0, u(x, 0) = 3sin(3x) et ut(x, 0) = sin(4x).
  [problème, examen open, 6 points]
  partie 1 (Début du problème : 1,5 ; Le mode n = 3 : b₃(0) = 3, b₃′(0) = 0 : 1,5 ; Le mode n = 4 : b₄(0) = 0, b₄′(0) = 1 : 1,5 ; La solution : 1,5)
    [free, sans aide, suivre l'erreur, examen open]  ωₙ
      (Les modes sin(nx) : bₙ″ + ωₙ² bₙ = 0)
      = n
    — Le mode n = 3 : b₃(0) = 3, b₃′(0) = 0  [juge prob]  départ : b_3(t)
      = 3cos(3t)
    — Le mode n = 4 : b₄(0) = 0, b₄′(0) = 1  [juge prob]  départ : b_4(t)
      = (1/4)sin(4t)
    — La solution  [juge prob]  départ : u(x, t)
      = 3cos(3t)sin(3x) + (1/4)sin(4t)sin(4x)

```

## Équation de Laplace dans un disque, dans un demi-plan (`f-laplace-eq`, BA4)

_Disque : u = a₀/2 + Σ rⁿ(aₙ cos nθ + bₙ sin nθ) ; demi-plan : û = ĝ(α)e^(−|α|x)._

### Niveau 1

```
Trouve la solution bornée de Δu = 0 dans le demi-plan x > 0, avec u(0, y) = 2/(y² + 4), par la transformée de Fourier en y. Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  ûₓₓ
    (La transformée de Fourier en y de Δu = 0)
    = □û   (trous : α²û)
  — Le bord : ĝ(α) = ℱ(u(0, ·))(α), par la ligne F6 (w = 2)  [juge transform]  départ : 2/(y² + 4)
    = √(π/2)e^(−2|α|)
  — û(x, α) = A(α)e^(|α|x) + B(α)e^(−|α|x), bornée quand x → ∞  [juge prob]  départ : û(x, α)
    (Quelle solution garder ? B(α)e^(−|α|x) seule : elle reste bornée quand x → ∞.)
    = √(π/2)e^(−(□)|α|)   (trous : √(π/2)e^(−(x + 2)|α|))
  — Retour en y : la ligne F6 avec w = x + 2  [juge prob]  départ : u(x, y)
    = (□)/(y² + (x + 2)²)   (trous : (x + 2)/(y² + (x + 2)²))
  aides : Transforme en y : û_xx − α²û = 0. Garde la solution bornée e^(−|α|x), et lis ĝ dans la table (F6). | ĝ(α) = √(π/2)e^(−2|α|), donc û(x, α) = ĝ(α)e^(−|α|x). | û(x, α) = √(π/2)e^(−(x + 2)|α|) : c'est F6 avec w = x + 2.
  pièges : f_half_plane_abs, f_ft_deriv_sign

Résous Δu = 0 dans le disque unité, avec u(1, θ) = 3 − 2cos(θ) + 3sin(θ) (coordonnées polaires).
  [guided]  Rₙ(r)
    (Les modes Rₙ(r)cos(nθ), Rₙ(r)sin(nθ) : la partie radiale)
    = r^□   (trous : r^n)
  — u(r, θ) : les coefficients se lisent sur u(1, θ)  [juge prob]  départ : u(r, θ)
    = 3 − 2□cos(θ) + 3rsin(θ)   (trous : 3 − 2rcos(θ) + 3rsin(θ))
  aides : u = a₀/2 + Σ rⁿ(aₙ cos nθ + bₙ sin nθ) : le bord u(1, θ) se lit comme une série de Fourier en θ. | Sur le bord : a₀/2 = 3, a₁ = −2, b₁ = 3 ; le mode n porte le facteur rⁿ. | u(r, θ) = 3 − 2rcos(θ) + 3rsin(θ)

Résous Δu = 0 dans le disque unité, avec u(1, θ) = −1 − 2cos(3θ) + 2sin(2θ) (coordonnées polaires).
  [guided]  Rₙ(r)
    (Les modes Rₙ(r)cos(nθ), Rₙ(r)sin(nθ) : la partie radiale)
    = r^□   (trous : r^n)
  — u(r, θ) : les coefficients se lisent sur u(1, θ)  [juge prob]  départ : u(r, θ)
    = −1 − 2r³cos(3θ) + 2□sin(2θ)   (trous : −1 − 2r³cos(3θ) + 2r²sin(2θ))
  aides : u = a₀/2 + Σ rⁿ(aₙ cos nθ + bₙ sin nθ) : le bord u(1, θ) se lit comme une série de Fourier en θ. | Sur le bord : a₀/2 = −1, a₃ = −2, b₂ = 2 ; le mode n porte le facteur rⁿ. | u(r, θ) = −1 − 2r³cos(3θ) + 2r²sin(2θ)

```

### Niveau 2

```
Résous Δu = 0 dans le disque unité, avec u(1, θ) = cos(3θ) (coordonnées polaires).
  [guided]  Rₙ(r)
    (Les modes Rₙ(r)cos(nθ), Rₙ(r)sin(nθ) : la partie radiale)
    ? Quelle partie radiale pour le mode n ? ✔ rⁿ : bornée au centre du disque / · r⁻ⁿ / · eⁿʳ
    = r^□   (trous : r^n)
  — u(r, θ) : les coefficients se lisent sur u(1, θ)  [juge prob]  départ : u(r, θ)
    = □cos(3θ)   (trous : r³cos(3θ))
  aides : u = a₀/2 + Σ rⁿ(aₙ cos nθ + bₙ sin nθ) : le bord u(1, θ) se lit comme une série de Fourier en θ. | Sur le bord : a₃ = 1 ; le mode n porte le facteur rⁿ. | u(r, θ) = r³cos(3θ)

Résous Δu = 0 dans le disque unité, avec u(1, θ) = 3cos(2θ) + sin(θ) (coordonnées polaires).
  [guided]  Rₙ(r)
    (Les modes Rₙ(r)cos(nθ), Rₙ(r)sin(nθ) : la partie radiale)
    ? Quelle partie radiale pour le mode n ? ✔ rⁿ : bornée au centre du disque / · r⁻ⁿ / · eⁿʳ
    = r^□   (trous : r^n)
  — u(r, θ) : les coefficients se lisent sur u(1, θ)  [juge prob]  départ : u(r, θ)
    = 3□cos(2θ) + □sin(θ)   (trous : 3r²cos(2θ) + rsin(θ))
  aides : u = a₀/2 + Σ rⁿ(aₙ cos nθ + bₙ sin nθ) : le bord u(1, θ) se lit comme une série de Fourier en θ. | Sur le bord : a₂ = 3, b₁ = 1 ; le mode n porte le facteur rⁿ. | u(r, θ) = 3r²cos(2θ) + rsin(θ)

Résous Δu = 0 dans le disque unité, avec u(1, θ) = 3 + (1/2)cos(θ) + sin(3θ) (coordonnées polaires).
  [guided]  Rₙ(r)
    (Les modes Rₙ(r)cos(nθ), Rₙ(r)sin(nθ) : la partie radiale)
    ? Quelle partie radiale pour le mode n ? ✔ rⁿ : bornée au centre du disque / · r⁻ⁿ / · eⁿʳ
    = r^□   (trous : r^n)
  — u(r, θ) : les coefficients se lisent sur u(1, θ)  [juge prob]  départ : u(r, θ)
    = 3 + (1/2)□cos(θ) + □sin(3θ)   (trous : 3 + (1/2)rcos(θ) + r³sin(3θ))
  aides : u = a₀/2 + Σ rⁿ(aₙ cos nθ + bₙ sin nθ) : le bord u(1, θ) se lit comme une série de Fourier en θ. | Sur le bord : a₀/2 = 3, a₁ = 1/2, b₃ = 1 ; le mode n porte le facteur rⁿ. | u(r, θ) = 3 + (1/2)rcos(θ) + r³sin(3θ)

```

### Niveau 3

```
Résous Δu = 0 dans le disque unité, avec u(1, θ) = 1 − 2cos(3θ) − 2sin(3θ) (coordonnées polaires).
  [tap, suivre l'erreur, menu menu]  Rₙ(r)
    (Les modes Rₙ(r)cos(nθ), Rₙ(r)sin(nθ) : la partie radiale)
    ? Quelle partie radiale pour le mode n ? ✔ rⁿ : bornée au centre du disque / · r⁻ⁿ / · eⁿʳ
    = r^n
  — u(r, θ) : les coefficients se lisent sur u(1, θ)  [juge prob]  départ : u(r, θ)
    = 1 − 2r³cos(3θ) − 2r³sin(3θ)
  — u en x et y (x = r cos θ, y = r sin θ)  [juge prob]  départ : u(x, y)
    = −2x³ − 6x²y + 6xy² + 2y³ + 1
  aides : u = a₀/2 + Σ rⁿ(aₙ cos nθ + bₙ sin nθ) : le bord u(1, θ) se lit comme une série de Fourier en θ. | Sur le bord : a₀/2 = 1, a₃ = −2, b₃ = −2 ; le mode n porte le facteur rⁿ. | u(r, θ) = 1 − 2r³cos(3θ) − 2r³sin(3θ)

Trouve la solution bornée de Δu = 0 dans le demi-plan x > 0, avec u(0, y) = 1/(y² + 4), par la transformée de Fourier en y. Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [tap, suivre l'erreur, menu menu]  ûₓₓ
    (La transformée de Fourier en y de Δu = 0)
    ? ℱ_y(u_yy) = ? ✔ (iα)²û = −α²û / · α²û
    = α²û
  — Le bord : ĝ(α) = ℱ(u(0, ·))(α), par la ligne F6 (w = 2)  [juge transform]  départ : 1/(y² + 4)
    = √(π/2)e^(−2|α|)/2
  — û(x, α) = A(α)e^(|α|x) + B(α)e^(−|α|x), bornée quand x → ∞  [juge prob]  départ : û(x, α)
    ? Quelle solution garder ? ✔ B(α)e^(−|α|x) seule : elle reste bornée quand x → ∞ / · Les deux termes, A(α)e^(|α|x) + B(α)e^(−|α|x) / · B(α)e^(−αx)
    = √(π/2)e^(−(x + 2)|α|)/2
  — Retour en y : la ligne F6 avec w = x + 2  [juge prob]  départ : u(x, y)
    = (x + 2)/(2(y² + (x + 2)²))
  aides : Transforme en y : û_xx − α²û = 0. Garde la solution bornée e^(−|α|x), et lis ĝ dans la table (F6). | ĝ(α) = √(π/2)e^(−2|α|)/2, donc û(x, α) = ĝ(α)e^(−|α|x). | û(x, α) = √(π/2)e^(−(x + 2)|α|)/2 : c'est F6 avec w = x + 2.
  pièges : f_half_plane_abs, f_ft_deriv_sign

Trouve la solution bornée de Δu = 0 dans le demi-plan x > 0, avec u(0, y) = 4/(y² + 4), par la transformée de Fourier en y. Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [tap, suivre l'erreur, menu menu]  ûₓₓ
    (La transformée de Fourier en y de Δu = 0)
    ? ℱ_y(u_yy) = ? ✔ (iα)²û = −α²û / · α²û
    = α²û
  — Le bord : ĝ(α) = ℱ(u(0, ·))(α), par la ligne F6 (w = 2)  [juge transform]  départ : 4/(y² + 4)
    = 2√(π/2)e^(−2|α|)
  — û(x, α) = A(α)e^(|α|x) + B(α)e^(−|α|x), bornée quand x → ∞  [juge prob]  départ : û(x, α)
    ? Quelle solution garder ? ✔ B(α)e^(−|α|x) seule : elle reste bornée quand x → ∞ / · Les deux termes, A(α)e^(|α|x) + B(α)e^(−|α|x) / · B(α)e^(−αx)
    = 2√(π/2)e^(−(x + 2)|α|)
  — Retour en y : la ligne F6 avec w = x + 2  [juge prob]  départ : u(x, y)
    = 2(x + 2)/(y² + (x + 2)²)
  aides : Transforme en y : û_xx − α²û = 0. Garde la solution bornée e^(−|α|x), et lis ĝ dans la table (F6). | ĝ(α) = 2√(π/2)e^(−2|α|), donc û(x, α) = ĝ(α)e^(−|α|x). | û(x, α) = 2√(π/2)e^(−(x + 2)|α|) : c'est F6 avec w = x + 2.
  pièges : f_half_plane_abs, f_ft_deriv_sign

```

### Niveau 4

```
Trouve la solution bornée de Δu = 0 dans le demi-plan x > 0, avec u(0, y) = 1/(y² + 4), par la transformée de Fourier en y. Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [free, suivre l'erreur]  ûₓₓ
    (La transformée de Fourier en y de Δu = 0)
    = α²û
  — Le bord : ĝ(α) = ℱ(u(0, ·))(α), par la ligne F6 (w = 2)  [juge transform]  départ : 1/(y² + 4)
    = √(π/2)e^(−2|α|)/2
  — û(x, α) = A(α)e^(|α|x) + B(α)e^(−|α|x), bornée quand x → ∞  [juge prob]  départ : û(x, α)
    ? Quelle solution garder ? ✔ B(α)e^(−|α|x) seule : elle reste bornée quand x → ∞ / · Les deux termes, A(α)e^(|α|x) + B(α)e^(−|α|x) / · B(α)e^(−αx)
    = √(π/2)e^(−(x + 2)|α|)/2
  — Retour en y : la ligne F6 avec w = x + 2  [juge prob]  départ : u(x, y)
    = (x + 2)/(2(y² + (x + 2)²))
  aides : Transforme en y : û_xx − α²û = 0. Garde la solution bornée e^(−|α|x), et lis ĝ dans la table (F6). | ĝ(α) = √(π/2)e^(−2|α|)/2, donc û(x, α) = ĝ(α)e^(−|α|x). | û(x, α) = √(π/2)e^(−(x + 2)|α|)/2 : c'est F6 avec w = x + 2.
  pièges : f_half_plane_abs, f_ft_deriv_sign

Résous Δu = 0 dans le disque unité, avec u(1, θ) = 3 − 2cos(3θ) + (1/2)sin(θ) (coordonnées polaires).
  [free, suivre l'erreur]  Rₙ(r)
    (Les modes Rₙ(r)cos(nθ), Rₙ(r)sin(nθ) : la partie radiale)
    = r^n
  — u(r, θ) : les coefficients se lisent sur u(1, θ)  [juge prob]  départ : u(r, θ)
    = 3 − 2r³cos(3θ) + (1/2)rsin(θ)
  — u en x et y (x = r cos θ, y = r sin θ)  [juge prob]  départ : u(x, y)
    = −2x³ + 6xy² + (1/2)y + 3
  aides : u = a₀/2 + Σ rⁿ(aₙ cos nθ + bₙ sin nθ) : le bord u(1, θ) se lit comme une série de Fourier en θ. | Sur le bord : a₀/2 = 3, a₃ = −2, b₁ = 1/2 ; le mode n porte le facteur rⁿ. | u(r, θ) = 3 − 2r³cos(3θ) + (1/2)rsin(θ)

Trouve la solution bornée de Δu = 0 dans le demi-plan x > 0, avec u(0, y) = 2/(y² + 4), par la transformée de Fourier en y. Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [free, suivre l'erreur]  ûₓₓ
    (La transformée de Fourier en y de Δu = 0)
    = α²û
  — Le bord : ĝ(α) = ℱ(u(0, ·))(α), par la ligne F6 (w = 2)  [juge transform]  départ : 2/(y² + 4)
    = √(π/2)e^(−2|α|)
  — û(x, α) = A(α)e^(|α|x) + B(α)e^(−|α|x), bornée quand x → ∞  [juge prob]  départ : û(x, α)
    ? Quelle solution garder ? ✔ B(α)e^(−|α|x) seule : elle reste bornée quand x → ∞ / · Les deux termes, A(α)e^(|α|x) + B(α)e^(−|α|x) / · B(α)e^(−αx)
    = √(π/2)e^(−(x + 2)|α|)
  — Retour en y : la ligne F6 avec w = x + 2  [juge prob]  départ : u(x, y)
    = (x + 2)/(y² + (x + 2)²)
  aides : Transforme en y : û_xx − α²û = 0. Garde la solution bornée e^(−|α|x), et lis ĝ dans la table (F6). | ĝ(α) = √(π/2)e^(−2|α|), donc û(x, α) = ĝ(α)e^(−|α|x). | û(x, α) = √(π/2)e^(−(x + 2)|α|) : c'est F6 avec w = x + 2.
  pièges : f_half_plane_abs, f_ft_deriv_sign

```

### Niveau 5

```
Résous Δu = 0 dans le disque unité, avec u(1, θ) = 2 + cos(θ)³ (coordonnées polaires).
  [free, sans aide]  Rₙ(r)
    (Les modes Rₙ(r)cos(nθ), Rₙ(r)sin(nθ) : la partie radiale)
    = r^n
  — Linéariser : cos³θ = a₁ cos θ + a₃ cos 3θ  [juge prob]  départ : a_1
    (cos 3θ = 4 cos³θ − 3 cos θ.)
    = 3/4
  — Le coefficient a₃  [juge prob]  départ : a_3
    = 1/4
  — u(r, θ) : les coefficients se lisent sur u(1, θ)  [juge prob]  départ : u(r, θ)
    = 2 + (3/4)rcos(θ) + (1/4)r³cos(3θ)
  — u en x et y (x = r cos θ, y = r sin θ)  [juge prob]  départ : u(x, y)
    = (1/4)x³ − (3/4)xy² + (3/4)x + 2

Résous Δu = 0 dans le disque unité, avec u(1, θ) = 2 + sin(θ)³ (coordonnées polaires).
  [free, sans aide]  Rₙ(r)
    (Les modes Rₙ(r)cos(nθ), Rₙ(r)sin(nθ) : la partie radiale)
    = r^n
  — Linéariser : sin³θ = b₁ sin θ + b₃ sin 3θ  [juge prob]  départ : b_1
    (sin 3θ = 3 sin θ − 4 sin³θ.)
    = 3/4
  — Le coefficient b₃  [juge prob]  départ : b_3
    = −1/4
  — u(r, θ) : les coefficients se lisent sur u(1, θ)  [juge prob]  départ : u(r, θ)
    = 2 + (3/4)rsin(θ) − (1/4)r³sin(3θ)
  — u en x et y (x = r cos θ, y = r sin θ)  [juge prob]  départ : u(x, y)
    = −(3/4)x²y + (1/4)y³ + (3/4)y + 2

Résous Δu = 0 dans le disque unité, avec u(1, θ) = sin(θ)³ (coordonnées polaires).
  [free, sans aide]  Rₙ(r)
    (Les modes Rₙ(r)cos(nθ), Rₙ(r)sin(nθ) : la partie radiale)
    = r^n
  — Linéariser : sin³θ = b₁ sin θ + b₃ sin 3θ  [juge prob]  départ : b_1
    (sin 3θ = 3 sin θ − 4 sin³θ.)
    = 3/4
  — Le coefficient b₃  [juge prob]  départ : b_3
    = −1/4
  — u(r, θ) : les coefficients se lisent sur u(1, θ)  [juge prob]  départ : u(r, θ)
    = (3/4)rsin(θ) − (1/4)r³sin(3θ)
  — u en x et y (x = r cos θ, y = r sin θ)  [juge prob]  départ : u(x, y)
    = −(3/4)x²y + (1/4)y³ + (3/4)y

```

### Variantes d'examen

```
Trouve la solution bornée de Δu = 0 dans le demi-plan x > 0, avec u(0, y) = 4/(y² + 4), par la transformée de Fourier en y. Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [problème, examen open, 4 points]
  partie 1 (Début du problème : 1 ; Le bord : ĝ(α) = ℱ(u(0, ·))(α), par la ligne F6 (w = 2) : 1 ; û(x, α) = A(α)e^(|α|x) + B(α)e^(−|α|x), bornée quand x → ∞ : 1 ; Retour en y : la ligne F6 avec w = x + 2 : 1)
    [free, sans aide, suivre l'erreur, examen open]  ûₓₓ
      (La transformée de Fourier en y de Δu = 0)
      = α²û
    — Le bord : ĝ(α) = ℱ(u(0, ·))(α), par la ligne F6 (w = 2)  [juge transform]  départ : 4/(y² + 4)
      = 2√(π/2)e^(−2|α|)
    — û(x, α) = A(α)e^(|α|x) + B(α)e^(−|α|x), bornée quand x → ∞  [juge prob]  départ : û(x, α)
      = 2√(π/2)e^(−(x + 2)|α|)
    — Retour en y : la ligne F6 avec w = x + 2  [juge prob]  départ : u(x, y)
      = 2(x + 2)/(y² + (x + 2)²)
  pièges : f_half_plane_abs

```

## Distributions : ⟨T_f, φ⟩, δ_a et f·δ_a (MT/SV) (`f-distrib-def`, BA4)

_⟨T_f, φ⟩ = ∫ fφ, ⟨δ_a, φ⟩ = φ(a), et g δ_a = g(a) δ_a._

### Niveau 1

```
Montre que (2x+3)δ_(-1) = δ_(-1) : calcule ⟨(2x+3)δ_(-1), φ⟩ pour une fonction test φ, puis conclus.
  [guided]  ⟨(2x+3)δ_(-1), φ⟩
    = ⟨δ_(-1), (2x+3)φ⟩   ← ⟨gT, φ⟩ = ⟨T, gφ⟩
    = (2(□) + 3)φ(−1)   (trous : (2(−1) + 3)φ(−1))   ← ⟨δ_a, ψ⟩ = ψ(−1)
    = (2x + 3)δ_(−1) = δ_(−1)   ← Pour toute φ : égalité des distributions
  aides : Le produit passe sur la fonction test, puis ⟨δ_a, ψ⟩ = ψ(a). | ⟨δ_(-1), (2x+3)φ⟩ = (2(-1)+3)φ(-1) | (2x+3)δ_(-1) = δ_(-1)
  pièges : f_fdelta

Soit f(x) = 2 si −1 ≤ x ≤ 0, e^(-x) si x > 0, 0 si x < −1. Calcule ⟨T_f + (x^2+1)δ_2, φ⟩ pour une fonction test φ (écris le résultat avec des intégrales de φ et des valeurs de φ).
  [guided]  ⟨T_f + (x^2+1)δ_2, φ⟩
    = ⟨T_f, φ⟩ + ⟨(x^2+1)δ_2, φ⟩   ← Linéarité
    = ∫_{□}^{□} 2φ(x) dx + ∫_{0}^{∞} e^(−x)φ(x) dx + 5φ(2)   (trous : ∫_{−1}^{0} 2φ(x) dx + ∫_{0}^{∞} e^(−x)φ(x) dx + 5φ(2))   ← ∫ fφ par morceaux ; ⟨g δ_a, φ⟩ = g(2)φ(2)
  aides : ⟨T_f, φ⟩ = ∫ f φ, coupée selon les morceaux de f ; ⟨g δ_a, φ⟩ = ⟨δ_a, gφ⟩ = g(a)φ(a). | g(2) = 5 | int(2φ(x), x, -1, 0) + int(e^(-x) φ(x), x, 0, ∞) + 5φ(2)
  pièges : f_fdelta

Soit f(x) = 0 si x < 0, x si 0 ≤ x ≤ 1, 3/x si x > 1. Calcule ⟨T_f + (x^2-x)δ_(-1), φ⟩ pour une fonction test φ (écris le résultat avec des intégrales de φ et des valeurs de φ).
  [guided]  ⟨T_f + (x^2-x)δ_(-1), φ⟩
    = ⟨T_f, φ⟩ + ⟨(x^2-x)δ_(-1), φ⟩   ← Linéarité
    = ∫_{□}^{□} xφ(x) dx + ∫_{1}^{∞} 3φ(x)/x dx + 2φ(−1)   (trous : ∫_{0}^{1} xφ(x) dx + ∫_{1}^{∞} 3φ(x)/x dx + 2φ(−1))   ← ∫ fφ par morceaux ; ⟨g δ_a, φ⟩ = g(−1)φ(−1)
  aides : ⟨T_f, φ⟩ = ∫ f φ, coupée selon les morceaux de f ; ⟨g δ_a, φ⟩ = ⟨δ_a, gφ⟩ = g(a)φ(a). | g(−1) = 2 | int(x φ(x), x, 0, 1) + int(3φ(x)/x, x, 1, ∞) + 2φ(-1)
  pièges : f_fdelta

```

### Niveau 2

```
Soit f(x) = 0 si x < 0, 3x si 0 ≤ x ≤ 1, 2/x si x > 1. Calcule ⟨T_f + (x+1)δ_1, φ⟩ pour une fonction test φ (écris le résultat avec des intégrales de φ et des valeurs de φ).
  [guided]  ⟨T_f + (x+1)δ_1, φ⟩
    ? Quelles règles ? ✔ Linéarité, ⟨T_f, φ⟩ = ∫ fφ et ⟨g δ_a, φ⟩ = g(a)φ(a) / · ⟨g δ_a, φ⟩ = g(0)φ(a) / · ⟨DT, φ⟩ = −⟨T, φ′⟩
    = ⟨T_f, φ⟩ + ⟨(x+1)δ_1, φ⟩   ← Linéarité
    = ∫_{0}^{1} 3xφ(x) dx + ∫_{1}^{∞} 2φ(x)/x dx + □   (trous : ∫_{0}^{1} 3xφ(x) dx + ∫_{1}^{∞} 2φ(x)/x dx + 2φ(1))   ← ∫ fφ par morceaux ; ⟨g δ_a, φ⟩ = g(1)φ(1)
  aides : ⟨T_f, φ⟩ = ∫ f φ, coupée selon les morceaux de f ; ⟨g δ_a, φ⟩ = ⟨δ_a, gφ⟩ = g(a)φ(a). | g(1) = 2 | int(3x φ(x), x, 0, 1) + int(2φ(x)/x, x, 1, ∞) + 2φ(1)
  pièges : f_fdelta

Soit f(x) = 3 si −1 ≤ x ≤ 0, e^(-x) si x > 0, 0 si x < −1. Calcule ⟨T_f + (x^2+1)δ_1, φ⟩ pour une fonction test φ (écris le résultat avec des intégrales de φ et des valeurs de φ).
  [guided]  ⟨T_f + (x^2+1)δ_1, φ⟩
    ? Quelles règles ? ✔ Linéarité, ⟨T_f, φ⟩ = ∫ fφ et ⟨g δ_a, φ⟩ = g(a)φ(a) / · ⟨g δ_a, φ⟩ = g(0)φ(a) / · ⟨DT, φ⟩ = −⟨T, φ′⟩
    = ⟨T_f, φ⟩ + ⟨(x^2+1)δ_1, φ⟩   ← Linéarité
    = ∫_{−1}^{0} 3φ(x) dx + ∫_{0}^{∞} e^(−x)φ(x) dx + □   (trous : ∫_{−1}^{0} 3φ(x) dx + ∫_{0}^{∞} e^(−x)φ(x) dx + 2φ(1))   ← ∫ fφ par morceaux ; ⟨g δ_a, φ⟩ = g(1)φ(1)
  aides : ⟨T_f, φ⟩ = ∫ f φ, coupée selon les morceaux de f ; ⟨g δ_a, φ⟩ = ⟨δ_a, gφ⟩ = g(a)φ(a). | g(1) = 2 | int(3φ(x), x, -1, 0) + int(e^(-x) φ(x), x, 0, ∞) + 2φ(1)
  pièges : f_fdelta

Soit f(x) = 2 si −1 ≤ x ≤ 0, e^(-2x) si x > 0, 0 si x < −1. Calcule ⟨T_f + (x+1)δ_1, φ⟩ pour une fonction test φ (écris le résultat avec des intégrales de φ et des valeurs de φ).
  [guided]  ⟨T_f + (x+1)δ_1, φ⟩
    ? Quelles règles ? ✔ Linéarité, ⟨T_f, φ⟩ = ∫ fφ et ⟨g δ_a, φ⟩ = g(a)φ(a) / · ⟨g δ_a, φ⟩ = g(0)φ(a) / · ⟨DT, φ⟩ = −⟨T, φ′⟩
    = ⟨T_f, φ⟩ + ⟨(x+1)δ_1, φ⟩   ← Linéarité
    = ∫_{−1}^{0} 2φ(x) dx + ∫_{0}^{∞} e^(−2x)φ(x) dx + □   (trous : ∫_{−1}^{0} 2φ(x) dx + ∫_{0}^{∞} e^(−2x)φ(x) dx + 2φ(1))   ← ∫ fφ par morceaux ; ⟨g δ_a, φ⟩ = g(1)φ(1)
  aides : ⟨T_f, φ⟩ = ∫ f φ, coupée selon les morceaux de f ; ⟨g δ_a, φ⟩ = ⟨δ_a, gφ⟩ = g(a)φ(a). | g(1) = 2 | int(2φ(x), x, -1, 0) + int(e^(-2x) φ(x), x, 0, ∞) + 2φ(1)
  pièges : f_fdelta

```

### Niveau 3

```
Soit f(x) = 0 si x < 0, x si 0 ≤ x ≤ 1, 2/x si x > 1. Calcule ⟨T_f + (2x+3)δ_1, φ⟩ pour une fonction test φ (écris le résultat avec des intégrales de φ et des valeurs de φ).
  [tap, suivre l'erreur, menu menu]  ⟨T_f + (2x+3)δ_1, φ⟩
    ? Quelles règles ? ✔ Linéarité, ⟨T_f, φ⟩ = ∫ fφ et ⟨g δ_a, φ⟩ = g(a)φ(a) / · ⟨g δ_a, φ⟩ = g(0)φ(a) / · ⟨DT, φ⟩ = −⟨T, φ′⟩
    = ⟨T_f, φ⟩ + ⟨(2x+3)δ_1, φ⟩   ← Linéarité
    = ∫_{0}^{1} xφ(x) dx + ∫_{1}^{∞} 2φ(x)/x dx + 5φ(1)   ← ∫ fφ par morceaux ; ⟨g δ_a, φ⟩ = g(1)φ(1)
  aides : ⟨T_f, φ⟩ = ∫ f φ, coupée selon les morceaux de f ; ⟨g δ_a, φ⟩ = ⟨δ_a, gφ⟩ = g(a)φ(a). | g(1) = 5 | int(x φ(x), x, 0, 1) + int(2φ(x)/x, x, 1, ∞) + 5φ(1)
  pièges : f_fdelta

Soit f(x) = 0 si x < 0, x si 0 ≤ x ≤ 1, 3/x si x > 1. Calcule ⟨T_f + (x+1)δ_2, φ⟩ pour une fonction test φ (écris le résultat avec des intégrales de φ et des valeurs de φ).
  [tap, suivre l'erreur, menu menu]  ⟨T_f + (x+1)δ_2, φ⟩
    ? Quelles règles ? ✔ Linéarité, ⟨T_f, φ⟩ = ∫ fφ et ⟨g δ_a, φ⟩ = g(a)φ(a) / · ⟨g δ_a, φ⟩ = g(0)φ(a) / · ⟨DT, φ⟩ = −⟨T, φ′⟩
    = ⟨T_f, φ⟩ + ⟨(x+1)δ_2, φ⟩   ← Linéarité
    = ∫_{0}^{1} xφ(x) dx + ∫_{1}^{∞} 3φ(x)/x dx + 3φ(2)   ← ∫ fφ par morceaux ; ⟨g δ_a, φ⟩ = g(2)φ(2)
  aides : ⟨T_f, φ⟩ = ∫ f φ, coupée selon les morceaux de f ; ⟨g δ_a, φ⟩ = ⟨δ_a, gφ⟩ = g(a)φ(a). | g(2) = 3 | int(x φ(x), x, 0, 1) + int(3φ(x)/x, x, 1, ∞) + 3φ(2)
  pièges : f_fdelta

Soit f(x) = 0 si x < 0, 2x si 0 ≤ x ≤ 1, 1/x si x > 1. Calcule ⟨T_f + (2x+3)δ_2, φ⟩ pour une fonction test φ (écris le résultat avec des intégrales de φ et des valeurs de φ).
  [tap, suivre l'erreur, menu menu]  ⟨T_f + (2x+3)δ_2, φ⟩
    ? Quelles règles ? ✔ Linéarité, ⟨T_f, φ⟩ = ∫ fφ et ⟨g δ_a, φ⟩ = g(a)φ(a) / · ⟨g δ_a, φ⟩ = g(0)φ(a) / · ⟨DT, φ⟩ = −⟨T, φ′⟩
    = ⟨T_f, φ⟩ + ⟨(2x+3)δ_2, φ⟩   ← Linéarité
    = ∫_{0}^{1} 2xφ(x) dx + ∫_{1}^{∞} φ(x)/x dx + 7φ(2)   ← ∫ fφ par morceaux ; ⟨g δ_a, φ⟩ = g(2)φ(2)
  aides : ⟨T_f, φ⟩ = ∫ f φ, coupée selon les morceaux de f ; ⟨g δ_a, φ⟩ = ⟨δ_a, gφ⟩ = g(a)φ(a). | g(2) = 7 | int(2x φ(x), x, 0, 1) + int(φ(x)/x, x, 1, ∞) + 7φ(2)
  pièges : f_fdelta

```

### Niveau 4

```
Soit f(x) = 0 si x < 0, 3x si 0 ≤ x ≤ 1, 2/x si x > 1. Calcule ⟨T_f + (x^2-x)δ_(-1), φ⟩ pour une fonction test φ (écris le résultat avec des intégrales de φ et des valeurs de φ).
  [free, suivre l'erreur]  ⟨T_f + (x^2-x)δ_(-1), φ⟩
    ? Quelles règles ? ✔ Linéarité, ⟨T_f, φ⟩ = ∫ fφ et ⟨g δ_a, φ⟩ = g(a)φ(a) / · ⟨g δ_a, φ⟩ = g(0)φ(a) / · ⟨DT, φ⟩ = −⟨T, φ′⟩
    = ⟨T_f, φ⟩ + ⟨(x^2-x)δ_(-1), φ⟩   ← Linéarité
    = ∫_{0}^{1} 3xφ(x) dx + ∫_{1}^{∞} 2φ(x)/x dx + 2φ(−1)   ← ∫ fφ par morceaux ; ⟨g δ_a, φ⟩ = g(−1)φ(−1)
  aides : ⟨T_f, φ⟩ = ∫ f φ, coupée selon les morceaux de f ; ⟨g δ_a, φ⟩ = ⟨δ_a, gφ⟩ = g(a)φ(a). | g(−1) = 2 | int(3x φ(x), x, 0, 1) + int(2φ(x)/x, x, 1, ∞) + 2φ(-1)
  pièges : f_fdelta

Montre que (2x+3)δ_1 = 5δ_1 : calcule ⟨(2x+3)δ_1, φ⟩ pour une fonction test φ, puis conclus.
  [free, suivre l'erreur]  ⟨(2x+3)δ_1, φ⟩
    ? Quelle règle d'abord ? ✔ Le produit passe sur la fonction test : ⟨gT, φ⟩ = ⟨T, gφ⟩ / · ⟨g δ_a, φ⟩ = g(0)φ(a)
    = ⟨δ_1, (2x+3)φ⟩   ← ⟨gT, φ⟩ = ⟨T, gφ⟩
    = (2(1) + 3)φ(1)   ← ⟨δ_a, ψ⟩ = ψ(1)
    = (2x + 3)δ_1 = 5δ_1   ← Pour toute φ : égalité des distributions
  aides : Le produit passe sur la fonction test, puis ⟨δ_a, ψ⟩ = ψ(a). | ⟨δ_1, (2x+3)φ⟩ = (2(1)+3)φ(1) | (2x+3)δ_1 = 5δ_1
  pièges : f_fdelta

Montre que (x^2-x)δ_2 = 2δ_2 : calcule ⟨(x^2-x)δ_2, φ⟩ pour une fonction test φ, puis conclus.
  [free, suivre l'erreur]  ⟨(x^2-x)δ_2, φ⟩
    ? Quelle règle d'abord ? ✔ Le produit passe sur la fonction test : ⟨gT, φ⟩ = ⟨T, gφ⟩ / · ⟨g δ_a, φ⟩ = g(0)φ(a)
    = ⟨δ_2, (x^2-x)φ⟩   ← ⟨gT, φ⟩ = ⟨T, gφ⟩
    = ((2)² − (2))φ(2)   ← ⟨δ_a, ψ⟩ = ψ(2)
    = (x² − x)δ_2 = 2δ_2   ← Pour toute φ : égalité des distributions
  aides : Le produit passe sur la fonction test, puis ⟨δ_a, ψ⟩ = ψ(a). | ⟨δ_2, (x^2-x)φ⟩ = ((2)^2-(2))φ(2) | (x^2-x)δ_2 = 2δ_2
  pièges : f_fdelta

```

### Niveau 5

```
Soit f(x) = 0 si x < 0, x si 0 ≤ x ≤ 1, 3/x si x > 1.
  [problème, 4 points]
  partie 1 (⟨T_f + g δ_a, φ⟩ : 2)
  Soit f(x) = 0 si x < 0, x si 0 ≤ x ≤ 1, 3/x si x > 1. Calcule ⟨T_f + (2x+3)δ_1, φ⟩ pour une fonction test φ (écris le résultat avec des intégrales de φ et des valeurs de φ).
    [free, sans aide, suivre l'erreur]  ⟨T_f + (2x+3)δ_1, φ⟩
      ? Quelles règles ? ✔ Linéarité, ⟨T_f, φ⟩ = ∫ fφ et ⟨g δ_a, φ⟩ = g(a)φ(a) / · ⟨g δ_a, φ⟩ = g(0)φ(a) / · ⟨DT, φ⟩ = −⟨T, φ′⟩
      = ⟨T_f, φ⟩ + ⟨(2x+3)δ_1, φ⟩   ← Linéarité
      = ∫_{0}^{1} xφ(x) dx + ∫_{1}^{∞} 3φ(x)/x dx + 5φ(1)   ← ∫ fφ par morceaux ; ⟨g δ_a, φ⟩ = g(1)φ(1)
  partie 2 (Dérivée DT_f : 2)
  Soit f(x) = 0 si x < 0, x si 0 ≤ x ≤ 1, 3/x si x > 1. Calcule la dérivée de T_f au sens des distributions : ⟨DT_f, φ⟩, puis DT_f, écrite avec T_(f′) et des δ.
    [free, sans aide, suivre l'erreur]  ⟨DT_f, φ⟩
      = −∫_{0}^{1} xφ′(x) dx − ∫_{1}^{∞} 3φ′(x)/x dx   ← ⟨DT, φ⟩ = −⟨T, φ′⟩ = −∫ f φ′
      = −φ(1) + ∫_{0}^{1} φ(x) dx + 3φ(1) − ∫_{1}^{∞} 3φ(x)/x² dx   ← Par parties sur chaque morceau
      = DT_f = T_(f′) + 2δ_1   ← Sauts : 2 en 1
  pièges : f_fdelta, f_distrib_jump, f_distrib_sign

Soit f(x) = 3 si −1 ≤ x ≤ 0, e^(-x) si x > 0, 0 si x < −1.
  [problème, 4 points]
  partie 1 (⟨T_f + g δ_a, φ⟩ : 2)
  Soit f(x) = 3 si −1 ≤ x ≤ 0, e^(-x) si x > 0, 0 si x < −1. Calcule ⟨T_f + (x^2+1)δ_2, φ⟩ pour une fonction test φ (écris le résultat avec des intégrales de φ et des valeurs de φ).
    [free, sans aide, suivre l'erreur]  ⟨T_f + (x^2+1)δ_2, φ⟩
      ? Quelles règles ? ✔ Linéarité, ⟨T_f, φ⟩ = ∫ fφ et ⟨g δ_a, φ⟩ = g(a)φ(a) / · ⟨g δ_a, φ⟩ = g(0)φ(a) / · ⟨DT, φ⟩ = −⟨T, φ′⟩
      = ⟨T_f, φ⟩ + ⟨(x^2+1)δ_2, φ⟩   ← Linéarité
      = ∫_{−1}^{0} 3φ(x) dx + ∫_{0}^{∞} e^(−x)φ(x) dx + 5φ(2)   ← ∫ fφ par morceaux ; ⟨g δ_a, φ⟩ = g(2)φ(2)
  partie 2 (Dérivée DT_f : 2)
  Soit f(x) = 3 si −1 ≤ x ≤ 0, e^(-x) si x > 0, 0 si x < −1. Calcule la dérivée de T_f au sens des distributions : ⟨DT_f, φ⟩, puis DT_f, écrite avec T_(f′) et des δ.
    [free, sans aide, suivre l'erreur]  ⟨DT_f, φ⟩
      = −∫_{−1}^{0} 3φ′(x) dx − ∫_{0}^{∞} e^(−x)φ′(x) dx   ← ⟨DT, φ⟩ = −⟨T, φ′⟩ = −∫ f φ′
      = −3φ(0) + 3φ(−1) + φ(0) − ∫_{0}^{∞} e^(−x)φ(x) dx   ← Par parties sur chaque morceau
      = DT_f = T_(f′) + 3δ_(−1) − 2δ   ← Sauts : 3 en −1, −2 en 0
  pièges : f_fdelta, f_distrib_jump, f_distrib_sign

Soit f(x) = 3 si −1 ≤ x ≤ 0, e^(-2x) si x > 0, 0 si x < −1.
  [problème, 4 points]
  partie 1 (⟨T_f + g δ_a, φ⟩ : 2)
  Soit f(x) = 3 si −1 ≤ x ≤ 0, e^(-2x) si x > 0, 0 si x < −1. Calcule ⟨T_f + (2x+3)δ_1, φ⟩ pour une fonction test φ (écris le résultat avec des intégrales de φ et des valeurs de φ).
    [free, sans aide, suivre l'erreur]  ⟨T_f + (2x+3)δ_1, φ⟩
      ? Quelles règles ? ✔ Linéarité, ⟨T_f, φ⟩ = ∫ fφ et ⟨g δ_a, φ⟩ = g(a)φ(a) / · ⟨g δ_a, φ⟩ = g(0)φ(a) / · ⟨DT, φ⟩ = −⟨T, φ′⟩
      = ⟨T_f, φ⟩ + ⟨(2x+3)δ_1, φ⟩   ← Linéarité
      = ∫_{−1}^{0} 3φ(x) dx + ∫_{0}^{∞} e^(−2x)φ(x) dx + 5φ(1)   ← ∫ fφ par morceaux ; ⟨g δ_a, φ⟩ = g(1)φ(1)
  partie 2 (Dérivée DT_f : 2)
  Soit f(x) = 3 si −1 ≤ x ≤ 0, e^(-2x) si x > 0, 0 si x < −1. Calcule la dérivée de T_f au sens des distributions : ⟨DT_f, φ⟩, puis DT_f, écrite avec T_(f′) et des δ.
    [free, sans aide, suivre l'erreur]  ⟨DT_f, φ⟩
      = −∫_{−1}^{0} 3φ′(x) dx − ∫_{0}^{∞} e^(−2x)φ′(x) dx   ← ⟨DT, φ⟩ = −⟨T, φ′⟩ = −∫ f φ′
      = −3φ(0) + 3φ(−1) + φ(0) − 2(∫_{0}^{∞} e^(−2x)φ(x) dx)   ← Par parties sur chaque morceau
      = DT_f = T_(f′) + 3δ_(−1) − 2δ   ← Sauts : 3 en −1, −2 en 0
  pièges : f_fdelta, f_distrib_jump, f_distrib_sign

```

### Variantes d'examen

```
Cochez les égalités vraies (au sens des distributions). (plusieurs réponses possibles)
  · (2x+3)δ_(-1) = δ [f_fdelta]   · x δ = δ [f_fdelta]   · ⟨(2x+3)δ_(-1), φ⟩ = 3φ(-1) [f_fdelta]   · (2x+3)δ_(-1) = 3δ_(-1) [f_fdelta]   ✔ ⟨(2x+3)δ_(-1), φ⟩ = φ(-1)
  [examen mcq]
  pièges : f_fdelta

Soit f(x) = 0 si x < 0, 3x si 0 ≤ x ≤ 1, 1/x si x > 1.
  [problème, examen open, 3 points]
  partie 1 (⟨T_f + g δ_a, φ⟩ : 2)
  Soit f(x) = 0 si x < 0, 3x si 0 ≤ x ≤ 1, 1/x si x > 1. Calcule ⟨T_f + (x^2-x)δ_2, φ⟩ pour une fonction test φ (écris le résultat avec des intégrales de φ et des valeurs de φ).
    [free, sans aide, suivre l'erreur]  ⟨T_f + (x^2-x)δ_2, φ⟩
      ? Quelles règles ? ✔ Linéarité, ⟨T_f, φ⟩ = ∫ fφ et ⟨g δ_a, φ⟩ = g(a)φ(a) / · ⟨g δ_a, φ⟩ = g(0)φ(a) / · ⟨DT, φ⟩ = −⟨T, φ′⟩
      = ⟨T_f, φ⟩ + ⟨(x^2-x)δ_2, φ⟩   ← Linéarité
      = ∫_{0}^{1} 3xφ(x) dx + ∫_{1}^{∞} φ(x)/x dx + 2φ(2)   ← ∫ fφ par morceaux ; ⟨g δ_a, φ⟩ = g(2)φ(2)
  partie 2 (g δ_a = g(a) δ_a : 1)
  Montre que (2x+3)δ_2 = 7δ_2 : calcule ⟨(2x+3)δ_2, φ⟩ pour une fonction test φ, puis conclus.
    [free, sans aide, suivre l'erreur]  ⟨(2x+3)δ_2, φ⟩
      ? Quelle règle d'abord ? ✔ Le produit passe sur la fonction test : ⟨gT, φ⟩ = ⟨T, gφ⟩ / · ⟨g δ_a, φ⟩ = g(0)φ(a)
      = ⟨δ_2, (2x+3)φ⟩   ← ⟨gT, φ⟩ = ⟨T, gφ⟩
      = (2(2) + 3)φ(2)   ← ⟨δ_a, ψ⟩ = ψ(2)
      = (2x + 3)δ_2 = 7δ_2   ← Pour toute φ : égalité des distributions
  pièges : f_fdelta

```

## Dérivée au sens des distributions (MT/SV) (`f-distrib-deriv`, BA4)

_⟨DT, φ⟩ = −⟨T, φ′⟩ : la dérivée d'une fonction qui saute contient un δ par saut._

### Niveau 1

```
Soit f(t) = e^(-3t) pour t > 0, 0 sinon. Calcule la dérivée de f au sens des distributions : ⟨Df, φ⟩, puis Df, écrite avec f et δ.
  [guided]  ⟨Df, φ⟩
    = −∫_{0}^{∞} e^(−3t)φ′(t) dt   ← ⟨DT, φ⟩ = −⟨T, φ′⟩ = −∫ f φ′
    = □ − 3(∫_{0}^{∞} e^(−3t)φ(t) dt)   (trous : φ(0) − 3(∫_{0}^{∞} e^(−3t)φ(t) dt))   ← Par parties sur chaque morceau
    = Df = −3f + δ   ← Sauts : 1 en 0
  aides : ⟨DT, φ⟩ = −⟨T, φ′⟩, puis par parties sur chaque morceau. Sauts de f : 1 en 0. | ⟨Df, φ⟩ = -int(e^(-3t) φ'(t), t, 0, ∞) | φ(0) - 3int(e^(-3t) φ(t), t, 0, ∞)
  pièges : f_distrib_jump, f_distrib_sign

Soit f(x) = 0 si x < 0, 2x si 0 ≤ x ≤ 1, 3/x si x > 1. Calcule la dérivée de T_f au sens des distributions : ⟨DT_f, φ⟩, puis DT_f, écrite avec T_(f′) et des δ.
  [guided]  ⟨DT_f, φ⟩
    = −∫_{0}^{1} 2xφ′(x) dx − ∫_{1}^{∞} 3φ′(x)/x dx   ← ⟨DT, φ⟩ = −⟨T, φ′⟩ = −∫ f φ′
    = −2φ(1) + ∫_{0}^{1} 2φ(x) dx + 3φ(1) − ∫_{1}^{∞} 3φ(x)/□ dx   (trous : −2φ(1) + ∫_{0}^{1} 2φ(x) dx + 3φ(1) − ∫_{1}^{∞} 3φ(x)/x² dx)   ← Par parties sur chaque morceau
    = DT_f = T_(f′) + δ_1   ← Sauts : 1 en 1
  aides : ⟨DT, φ⟩ = −⟨T, φ′⟩, puis par parties sur chaque morceau. Sauts de f : 1 en 1. | ⟨DT_f, φ⟩ = -int(2x φ'(x), x, 0, 1) - int(3φ'(x)/x, x, 1, ∞) | -2φ(1) + int(2φ(x), x, 0, 1) + 3φ(1) - int(3φ(x)/x^2, x, 1, ∞)
  pièges : f_distrib_jump, f_distrib_sign

Soit f(t) = e^(-2t) pour t > 0, 0 sinon. Calcule la dérivée de f au sens des distributions : ⟨Df, φ⟩, puis Df, écrite avec f et δ.
  [guided]  ⟨Df, φ⟩
    = −∫_{0}^{∞} e^(−2t)φ′(t) dt   ← ⟨DT, φ⟩ = −⟨T, φ′⟩ = −∫ f φ′
    = □ − 2(∫_{0}^{∞} e^(−2t)φ(t) dt)   (trous : φ(0) − 2(∫_{0}^{∞} e^(−2t)φ(t) dt))   ← Par parties sur chaque morceau
    = Df = −2f + δ   ← Sauts : 1 en 0
  aides : ⟨DT, φ⟩ = −⟨T, φ′⟩, puis par parties sur chaque morceau. Sauts de f : 1 en 0. | ⟨Df, φ⟩ = -int(e^(-2t) φ'(t), t, 0, ∞) | φ(0) - 2int(e^(-2t) φ(t), t, 0, ∞)
  pièges : f_distrib_jump, f_distrib_sign

```

### Niveau 2

```
Soit f(x) = 2 si −1 ≤ x ≤ 0, e^(-2x) si x > 0, 0 si x < −1. Calcule la dérivée de T_f au sens des distributions : ⟨DT_f, φ⟩, puis DT_f, écrite avec T_(f′) et des δ.
  [guided]  ⟨DT_f, φ⟩
    = −∫_{−1}^{0} 2φ′(x) dx − ∫_{0}^{∞} e^(−2x)φ′(x) dx   ← ⟨DT, φ⟩ = −⟨T, φ′⟩ = −∫ f φ′
    = −2φ(0) + □ + φ(0) − 2(∫_{0}^{∞} e^(−2x)φ(x) dx)   (trous : −2φ(0) + 2φ(−1) + φ(0) − 2(∫_{0}^{∞} e^(−2x)φ(x) dx))   ← Par parties sur chaque morceau
    = DT_f = T_(f′) + 2δ_(−1) − δ   ← Sauts : 2 en −1, −1 en 0
  aides : ⟨DT, φ⟩ = −⟨T, φ′⟩, puis par parties sur chaque morceau. Sauts de f : 2 en −1, −1 en 0. | ⟨DT_f, φ⟩ = -int(2φ'(x), x, -1, 0) - int(e^(-2x) φ'(x), x, 0, ∞) | -2φ(0) + 2φ(-1) + φ(0) - 2int(e^(-2x) φ(x), x, 0, ∞)
  pièges : f_distrib_jump, f_distrib_sign

Soit f(x) = 2 si −1 ≤ x ≤ 0, e^(-x) si x > 0, 0 si x < −1. Calcule la dérivée de T_f au sens des distributions : ⟨DT_f, φ⟩, puis DT_f, écrite avec T_(f′) et des δ.
  [guided]  ⟨DT_f, φ⟩
    = −∫_{−1}^{0} 2φ′(x) dx − ∫_{0}^{∞} e^(−x)φ′(x) dx   ← ⟨DT, φ⟩ = −⟨T, φ′⟩ = −∫ f φ′
    = −2φ(0) + □ + φ(0) − ∫_{0}^{∞} e^(−x)φ(x) dx   (trous : −2φ(0) + 2φ(−1) + φ(0) − ∫_{0}^{∞} e^(−x)φ(x) dx)   ← Par parties sur chaque morceau
    = DT_f = T_(f′) + 2δ_(−1) − δ   ← Sauts : 2 en −1, −1 en 0
  aides : ⟨DT, φ⟩ = −⟨T, φ′⟩, puis par parties sur chaque morceau. Sauts de f : 2 en −1, −1 en 0. | ⟨DT_f, φ⟩ = -int(2φ'(x), x, -1, 0) - int(e^(-x) φ'(x), x, 0, ∞) | -2φ(0) + 2φ(-1) + φ(0) - int(e^(-x) φ(x), x, 0, ∞)
  pièges : f_distrib_jump, f_distrib_sign

Soit f(x) = 1 si −1 ≤ x ≤ 1, 0 sinon. Calcule la dérivée de T_f au sens des distributions : ⟨DT_f, φ⟩, puis DT_f, écrite avec T_(f′) et des δ.
  [guided]  ⟨DT_f, φ⟩
    = −∫_{−1}^{1} φ′(x) dx   ← ⟨DT, φ⟩ = −⟨T, φ′⟩ = −∫ f φ′
    = −(φ(1) − □)   (trous : −(φ(1) − φ(−1)))   ← Par parties sur chaque morceau
    = DT_f = δ_(−1) − δ_1   ← Sauts : 1 en −1, −1 en 1
  aides : ⟨DT, φ⟩ = −⟨T, φ′⟩, puis par parties sur chaque morceau. Sauts de f : 1 en −1, −1 en 1. | ⟨DT_f, φ⟩ = -int(φ'(x), x, -1, 1) | -(φ(1) - φ(-1))
  pièges : f_distrib_jump, f_distrib_sign

```

### Niveau 3

```
Soit f(t) = e^(-3t) pour t > 0, 0 sinon. Calcule la dérivée de f au sens des distributions : ⟨Df, φ⟩, puis Df, écrite avec f et δ.
  [tap, suivre l'erreur, menu menu]  ⟨Df, φ⟩
    ? Comment faire ? ✔ Par la définition ⟨DT, φ⟩ = −⟨T, φ′⟩, puis par parties / ✔ Par la formule des sauts : DT_f = T_(f′) + Σ (sauts) δ_a / · ⟨DT, φ⟩ = ⟨T, φ′⟩
    = −∫_{0}^{∞} e^(−3t)φ′(t) dt   ← ⟨DT, φ⟩ = −⟨T, φ′⟩ = −∫ f φ′
    = φ(0) − 3(∫_{0}^{∞} e^(−3t)φ(t) dt)   ← Par parties sur chaque morceau
    = Df = −3f + δ   ← Sauts : 1 en 0
  aides : ⟨DT, φ⟩ = −⟨T, φ′⟩, puis par parties sur chaque morceau. Sauts de f : 1 en 0. | ⟨Df, φ⟩ = -int(e^(-3t) φ'(t), t, 0, ∞) | φ(0) - 3int(e^(-3t) φ(t), t, 0, ∞)
  pièges : f_distrib_jump, f_distrib_sign

Soit f(t) = e^(-3t) pour t > 0, 0 sinon. Calcule la dérivée de f au sens des distributions : ⟨Df, φ⟩, puis Df, écrite avec f et δ.
  [tap, suivre l'erreur, menu menu]  ⟨Df, φ⟩
    ? Comment faire ? ✔ Par la définition ⟨DT, φ⟩ = −⟨T, φ′⟩, puis par parties / ✔ Par la formule des sauts : DT_f = T_(f′) + Σ (sauts) δ_a / · ⟨DT, φ⟩ = ⟨T, φ′⟩
    = −∫_{0}^{∞} e^(−3t)φ′(t) dt   ← ⟨DT, φ⟩ = −⟨T, φ′⟩ = −∫ f φ′
    = φ(0) − 3(∫_{0}^{∞} e^(−3t)φ(t) dt)   ← Par parties sur chaque morceau
    = Df = −3f + δ   ← Sauts : 1 en 0
  aides : ⟨DT, φ⟩ = −⟨T, φ′⟩, puis par parties sur chaque morceau. Sauts de f : 1 en 0. | ⟨Df, φ⟩ = -int(e^(-3t) φ'(t), t, 0, ∞) | φ(0) - 3int(e^(-3t) φ(t), t, 0, ∞)
  pièges : f_distrib_jump, f_distrib_sign

Soit f(x) = 0 si x < 0, 2x si 0 ≤ x ≤ 1, 1/x si x > 1. Calcule la dérivée de T_f au sens des distributions : ⟨DT_f, φ⟩, puis DT_f, écrite avec T_(f′) et des δ.
  [tap, suivre l'erreur, menu menu]  ⟨DT_f, φ⟩
    ? Comment faire ? ✔ Par la définition ⟨DT, φ⟩ = −⟨T, φ′⟩, puis par parties / ✔ Par la formule des sauts : DT_f = T_(f′) + Σ (sauts) δ_a / · ⟨DT, φ⟩ = ⟨T, φ′⟩
    = −∫_{0}^{1} 2xφ′(x) dx − ∫_{1}^{∞} φ′(x)/x dx   ← ⟨DT, φ⟩ = −⟨T, φ′⟩ = −∫ f φ′
    = −2φ(1) + ∫_{0}^{1} 2φ(x) dx + φ(1) − ∫_{1}^{∞} φ(x)/x² dx   ← Par parties sur chaque morceau
    = DT_f = T_(f′) − δ_1   ← Sauts : −1 en 1
  aides : ⟨DT, φ⟩ = −⟨T, φ′⟩, puis par parties sur chaque morceau. Sauts de f : −1 en 1. | ⟨DT_f, φ⟩ = -int(2x φ'(x), x, 0, 1) - int(φ'(x)/x, x, 1, ∞) | -2φ(1) + int(2φ(x), x, 0, 1) + φ(1) - int(φ(x)/x^2, x, 1, ∞)
  pièges : f_distrib_jump, f_distrib_sign

```

### Niveau 4

```
Soit f(x) = 3 si 0 ≤ x ≤ 2, 0 sinon. Calcule la dérivée de T_f au sens des distributions : ⟨DT_f, φ⟩, puis DT_f, écrite avec T_(f′) et des δ.
  [free, suivre l'erreur]  ⟨DT_f, φ⟩
    = −∫_{0}^{2} 3φ′(x) dx   ← ⟨DT, φ⟩ = −⟨T, φ′⟩ = −∫ f φ′
    = −3(φ(2) − φ(0))   ← Par parties sur chaque morceau
    = DT_f = 3δ − 3δ_2   ← Sauts : 3 en 0, −3 en 2
  aides : ⟨DT, φ⟩ = −⟨T, φ′⟩, puis par parties sur chaque morceau. Sauts de f : 3 en 0, −3 en 2. | ⟨DT_f, φ⟩ = -int(3φ'(x), x, 0, 2) | -3(φ(2) - φ(0))
  pièges : f_distrib_jump, f_distrib_sign

Soit f(x) = 1 si −1 ≤ x ≤ 2, 0 sinon. Calcule la dérivée de T_f au sens des distributions : ⟨DT_f, φ⟩, puis DT_f, écrite avec T_(f′) et des δ.
  [free, suivre l'erreur]  ⟨DT_f, φ⟩
    = −∫_{−1}^{2} φ′(x) dx   ← ⟨DT, φ⟩ = −⟨T, φ′⟩ = −∫ f φ′
    = −(φ(2) − φ(−1))   ← Par parties sur chaque morceau
    = DT_f = δ_(−1) − δ_2   ← Sauts : 1 en −1, −1 en 2
  aides : ⟨DT, φ⟩ = −⟨T, φ′⟩, puis par parties sur chaque morceau. Sauts de f : 1 en −1, −1 en 2. | ⟨DT_f, φ⟩ = -int(φ'(x), x, -1, 2) | -(φ(2) - φ(-1))
  pièges : f_distrib_jump, f_distrib_sign

Soit f(x) = 2 si −1 ≤ x ≤ 0, e^(-x) si x > 0, 0 si x < −1. Calcule la dérivée de T_f au sens des distributions : ⟨DT_f, φ⟩, puis DT_f, écrite avec T_(f′) et des δ.
  [free, suivre l'erreur]  ⟨DT_f, φ⟩
    = −∫_{−1}^{0} 2φ′(x) dx − ∫_{0}^{∞} e^(−x)φ′(x) dx   ← ⟨DT, φ⟩ = −⟨T, φ′⟩ = −∫ f φ′
    = −2φ(0) + 2φ(−1) + φ(0) − ∫_{0}^{∞} e^(−x)φ(x) dx   ← Par parties sur chaque morceau
    = DT_f = T_(f′) + 2δ_(−1) − δ   ← Sauts : 2 en −1, −1 en 0
  aides : ⟨DT, φ⟩ = −⟨T, φ′⟩, puis par parties sur chaque morceau. Sauts de f : 2 en −1, −1 en 0. | ⟨DT_f, φ⟩ = -int(2φ'(x), x, -1, 0) - int(e^(-x) φ'(x), x, 0, ∞) | -2φ(0) + 2φ(-1) + φ(0) - int(e^(-x) φ(x), x, 0, ∞)
  pièges : f_distrib_jump, f_distrib_sign

```

### Niveau 5

```
Soit f(x) = 0 si x < 0, 2x si 0 ≤ x ≤ 1, 3/x si x > 1. Calcule la dérivée de T_f au sens des distributions : ⟨DT_f, φ⟩, puis DT_f, écrite avec T_(f′) et des δ.
  [problème, 3 points]
  partie 1 (Début du problème : 3)
    [free, sans aide, suivre l'erreur]  ⟨DT_f, φ⟩
      = −∫_{0}^{1} 2xφ′(x) dx − ∫_{1}^{∞} 3φ′(x)/x dx   ← ⟨DT, φ⟩ = −⟨T, φ′⟩ = −∫ f φ′
      = −2φ(1) + ∫_{0}^{1} 2φ(x) dx + 3φ(1) − ∫_{1}^{∞} 3φ(x)/x² dx   ← Par parties sur chaque morceau
      = DT_f = T_(f′) + δ_1   ← Sauts : 1 en 1
  pièges : f_distrib_jump, f_distrib_sign

Soit f(x) = 0 si x < 0, 2x si 0 ≤ x ≤ 1, 3/x si x > 1. Calcule la dérivée de T_f au sens des distributions : ⟨DT_f, φ⟩, puis DT_f, écrite avec T_(f′) et des δ.
  [problème, 3 points]
  partie 1 (Début du problème : 3)
    [free, sans aide, suivre l'erreur]  ⟨DT_f, φ⟩
      = −∫_{0}^{1} 2xφ′(x) dx − ∫_{1}^{∞} 3φ′(x)/x dx   ← ⟨DT, φ⟩ = −⟨T, φ′⟩ = −∫ f φ′
      = −2φ(1) + ∫_{0}^{1} 2φ(x) dx + 3φ(1) − ∫_{1}^{∞} 3φ(x)/x² dx   ← Par parties sur chaque morceau
      = DT_f = T_(f′) + δ_1   ← Sauts : 1 en 1
  pièges : f_distrib_jump, f_distrib_sign

Soit f(x) = 0 si x < 0, x si 0 ≤ x ≤ 1, 3/x si x > 1. Calcule la dérivée de T_f au sens des distributions : ⟨DT_f, φ⟩, puis DT_f, écrite avec T_(f′) et des δ.
  [problème, 3 points]
  partie 1 (Début du problème : 3)
    [free, sans aide, suivre l'erreur]  ⟨DT_f, φ⟩
      = −∫_{0}^{1} xφ′(x) dx − ∫_{1}^{∞} 3φ′(x)/x dx   ← ⟨DT, φ⟩ = −⟨T, φ′⟩ = −∫ f φ′
      = −φ(1) + ∫_{0}^{1} φ(x) dx + 3φ(1) − ∫_{1}^{∞} 3φ(x)/x² dx   ← Par parties sur chaque morceau
      = DT_f = T_(f′) + 2δ_1   ← Sauts : 2 en 1
  pièges : f_distrib_jump, f_distrib_sign

```

### Variantes d'examen

```
Soit f(t) = e^(-2t) pour t > 0, 0 sinon. Cochez les égalités vraies (au sens des distributions). (plusieurs réponses possibles)
  · Df = f + δ   · Df = 2f - δ [f_distrib_sign]   · ⟨Df, φ⟩ = int(e^(-2t) φ'(t), t, 0, ∞) [f_distrib_sign]   ✔ ⟨Df, φ⟩ = φ(0) - 2int(e^(-2t) φ(t), t, 0, ∞)   · Df = -2f [f_distrib_jump]
  [examen mcq]
  pièges : f_distrib_sign, f_distrib_jump

Soit f(x) = 0 si x < 0, x si 0 ≤ x ≤ 1, 3/x si x > 1. Calcule la dérivée de T_f au sens des distributions : ⟨DT_f, φ⟩, puis DT_f, écrite avec T_(f′) et des δ.
  [problème, examen open, 3 points]
  partie 1 (Début du problème : 3)
    [free, sans aide, suivre l'erreur]  ⟨DT_f, φ⟩
      = −∫_{0}^{1} xφ′(x) dx − ∫_{1}^{∞} 3φ′(x)/x dx   ← ⟨DT, φ⟩ = −⟨T, φ′⟩ = −∫ f φ′
      = −φ(1) + ∫_{0}^{1} φ(x) dx + 3φ(1) − ∫_{1}^{∞} 3φ(x)/x² dx   ← Par parties sur chaque morceau
      = DT_f = T_(f′) + 2δ_1   ← Sauts : 2 en 1
  pièges : f_distrib_jump, f_distrib_sign

```

## Équations avec δ ; transformée de Fourier de cos (MT/SV) (`f-distrib-eq`, BA4)

_y′ + ay = δ par la solution fondamentale H(t)e^(−at) ; y″ − ω²y = δ par Fourier, avec 𝓕(δ) = 1/√(2π)._

### Niveau 1

```
Trouve la solution tempérée de y'' - y = δ par la transformée de Fourier (ℱ(δ) = 1/√(2π)).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  y′′ − y = δ
    = −α²ŷ − ŷ = □   (trous : −α²ŷ − ŷ = 1/√(2π))   ← ℱ(y″) = −α² ŷ, ℱ(δ) = 1/√(2π)
    = ŷ = −□/(√(2π)(α² + 1))   (trous : ŷ = −1/(√(2π)(α² + 1)))   ← Isoler ŷ
    = y(x) = −e^(−|x|)/□   (trous : y(x) = −e^(−|x|)/2)   ← Ligne F7 avec w = 1
  aides : Transforme : ℱ(y″) = −α²ŷ et ℱ(δ) = 1/√(2π), isole ŷ, puis ligne F7. | -α^2 ŷ - ŷ = 1/√(2π) | ŷ = -1/(√(2π)(α^2+1))
  pièges : f_abs_dropped, f_ft_deriv_sign, f_ft_delta_const

Résous y' + 3y = δ au sens des distributions : une solution, la vérification, puis toutes les solutions.
  [guided]  y′ + 3y = δ
    = y = □e^(−3t)   (trous : y = H(t)e^(−3t))   ← Essai
  — Vérification : la dérivée au sens des distributions.  [juge distrib]  départ : D(H(t)e^(−3t))
    = H(t)(−3e^(−3t)) + e^(−3t)δ   ← D(H g) = H g′ + g δ
    = −3H(t)e^(−3t) + □   (trous : −3H(t)e^(−3t) + δ)   ← g·δ_a = g(a)·δ_a
  — Toutes les solutions :  [juge distrib]  départ : y = H(t)e^(−3t)
    = y = H(t)□ + Ce^(−3t)   (trous : y = H(t)e^(−3t) + Ce^(−3t))   ← Particulière + homogène
  aides : Essaie H(t)e^(-3t) : H coupe la solution homogène en 0. | D(H(t)e^(-3t)) = H(t)(-3e^(-3t)) + e^(-3t)δ | -3H(t)e^(-3t) + δ

Trouve la solution tempérée de y'' - y = δ par la transformée de Fourier (ℱ(δ) = 1/√(2π)).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  y′′ − y = δ
    = −α²ŷ − ŷ = □   (trous : −α²ŷ − ŷ = 1/√(2π))   ← ℱ(y″) = −α² ŷ, ℱ(δ) = 1/√(2π)
    = ŷ = −□/(√(2π)(α² + 1))   (trous : ŷ = −1/(√(2π)(α² + 1)))   ← Isoler ŷ
    = y(x) = −e^(−|x|)/□   (trous : y(x) = −e^(−|x|)/2)   ← Ligne F7 avec w = 1
  aides : Transforme : ℱ(y″) = −α²ŷ et ℱ(δ) = 1/√(2π), isole ŷ, puis ligne F7. | -α^2 ŷ - ŷ = 1/√(2π) | ŷ = -1/(√(2π)(α^2+1))
  pièges : f_abs_dropped, f_ft_deriv_sign, f_ft_delta_const

```

### Niveau 2

```
Résous y' + y = δ_1 au sens des distributions : une solution, la vérification, puis toutes les solutions.
  [guided]  y′ + y = δ_1
    = y = □e^(−(t − 1))   (trous : y = H(t − 1)e^(−(t − 1)))   ← Essai
  — Vérification : la dérivée au sens des distributions.  [juge distrib]  départ : D(H(t − 1)e^(−(t − 1)))
    = H(t − 1)(−e^(−(t − 1))) + e^(−(t − 1))δ_1   ← D(H g) = H g′ + g δ
    = −H(t − 1)e^(−(t − 1)) + □   (trous : −H(t − 1)e^(−(t − 1)) + δ_1)   ← g·δ_a = g(a)·δ_a
  — Toutes les solutions :  [juge distrib]  départ : y = H(t − 1)e^(−(t − 1))
    = y = H(t − 1)e^(−(t − 1)) + C□   (trous : y = H(t − 1)e^(−(t − 1)) + Ce^(−t))   ← Particulière + homogène
  aides : Essaie H(t-1)e^(-(t-1)) : H coupe la solution homogène en 0. | D(H(t-1)e^(-(t-1))) = H(t-1)(-e^(-(t-1))) + e^(-(t-1))δ_1 | -H(t-1)e^(-(t-1)) + δ_1

Trouve la solution tempérée de y'' - 4y = δ par la transformée de Fourier (ℱ(δ) = 1/√(2π)).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  y′′ − 4y = δ
    = −α²ŷ − 4ŷ = □   (trous : −α²ŷ − 4ŷ = 1/√(2π))   ← ℱ(y″) = −α² ŷ, ℱ(δ) = 1/√(2π)
    = ŷ = −1/(√(2π)(α² + □))   (trous : ŷ = −1/(√(2π)(α² + 4)))   ← Isoler ŷ
    = y(x) = −e^(−2□)/4   (trous : y(x) = −e^(−2|x|)/4)   ← Ligne F7 avec w = 2
  aides : Transforme : ℱ(y″) = −α²ŷ et ℱ(δ) = 1/√(2π), isole ŷ, puis ligne F7. | -α^2 ŷ - 4ŷ = 1/√(2π) | ŷ = -1/(√(2π)(α^2+4))
  pièges : f_abs_dropped, f_ft_deriv_sign, f_ft_delta_const

Trouve la solution tempérée de y'' - y = δ par la transformée de Fourier (ℱ(δ) = 1/√(2π)).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [guided]  y′′ − y = δ
    = −α²ŷ − ŷ = □   (trous : −α²ŷ − ŷ = 1/√(2π))   ← ℱ(y″) = −α² ŷ, ℱ(δ) = 1/√(2π)
    = ŷ = −□/(√(2π)(α² + 1))   (trous : ŷ = −1/(√(2π)(α² + 1)))   ← Isoler ŷ
    = y(x) = −e^(−□)/2   (trous : y(x) = −e^(−|x|)/2)   ← Ligne F7 avec w = 1
  aides : Transforme : ℱ(y″) = −α²ŷ et ℱ(δ) = 1/√(2π), isole ŷ, puis ligne F7. | -α^2 ŷ - ŷ = 1/√(2π) | ŷ = -1/(√(2π)(α^2+1))
  pièges : f_abs_dropped, f_ft_deriv_sign, f_ft_delta_const

```

### Niveau 3

```
Résous y'' + 9y = δ au sens des distributions : une solution, la vérification, puis toutes les solutions.
  [tap, suivre l'erreur, menu menu]  y′′ + 9y = δ
    ? Méthode ? ✔ Essayer la solution fondamentale H(x)sin(3x)/3 / ✔ Transformée de Fourier / · Chercher une solution classique (C¹) de y′ + ay = δ
    = y = H(x)sin(3x)/3   ← Essai
  — Vérification : la dérivée au sens des distributions.  [juge distrib]  départ : D(D(H(x)sin(3x)/3))
    = D(H(x)cos(3x))   ← D(H g) = H g′ + g δ
    = −3H(x)sin(3x) + δ   ← g·δ_a = g(a)·δ_a
  — Toutes les solutions :  [juge distrib]  départ : y = H(x)sin(3x)/3
    = y = H(x)sin(3x)/3 + C_1cos(3x) + C_2sin(3x)   ← Particulière + homogène
  aides : Essaie H(x)sin(3x)/3 : H coupe la solution homogène en 0. | D(D(H(x)sin(3x)/3)) = D(H(x)cos(3x)) | -3H(x)sin(3x) + δ

Résous y'' + y = δ au sens des distributions : une solution, la vérification, puis toutes les solutions.
  [tap, suivre l'erreur, menu menu]  y′′ + y = δ
    ? Méthode ? ✔ Essayer la solution fondamentale H(x)sin(x) / ✔ Transformée de Fourier / · Chercher une solution classique (C¹) de y′ + ay = δ
    = y = H(x)sin(x)   ← Essai
  — Vérification : la dérivée au sens des distributions.  [juge distrib]  départ : D(D(H(x)sin(x)))
    = D(H(x)cos(x))   ← D(H g) = H g′ + g δ
    = −H(x)sin(x) + δ   ← g·δ_a = g(a)·δ_a
  — Toutes les solutions :  [juge distrib]  départ : y = H(x)sin(x)
    = y = H(x)sin(x) + C_1cos(x) + C_2sin(x)   ← Particulière + homogène
  aides : Essaie H(x)sin(x) : H coupe la solution homogène en 0. | D(D(H(x)sin(x))) = D(H(x)cos(x)) | -H(x)sin(x) + δ

Trouve la solution tempérée de y'' - 4y = δ par la transformée de Fourier (ℱ(δ) = 1/√(2π)).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [tap, suivre l'erreur, menu menu]  y′′ − 4y = δ
    = −α²ŷ − 4ŷ = 1/√(2π)   ← ℱ(y″) = −α² ŷ, ℱ(δ) = 1/√(2π)
    = ŷ = −1/(√(2π)(α² + 4))   ← Isoler ŷ
    = y(x) = −e^(−2|x|)/4   ← Ligne F7 avec w = 2
  aides : Transforme : ℱ(y″) = −α²ŷ et ℱ(δ) = 1/√(2π), isole ŷ, puis ligne F7. | -α^2 ŷ - 4ŷ = 1/√(2π) | ŷ = -1/(√(2π)(α^2+4))
  pièges : f_abs_dropped, f_ft_deriv_sign, f_ft_delta_const

```

### Niveau 4

```
Trouve la solution tempérée de y'' - 9y = δ par la transformée de Fourier (ℱ(δ) = 1/√(2π)).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [free, suivre l'erreur]  y′′ − 9y = δ
    = −α²ŷ − 9ŷ = 1/√(2π)   ← ℱ(y″) = −α² ŷ, ℱ(δ) = 1/√(2π)
    = ŷ = −1/(√(2π)(α² + 9))   ← Isoler ŷ
    = y(x) = −e^(−3|x|)/6   ← Ligne F7 avec w = 3
  aides : Transforme : ℱ(y″) = −α²ŷ et ℱ(δ) = 1/√(2π), isole ŷ, puis ligne F7. | -α^2 ŷ - 9ŷ = 1/√(2π) | ŷ = -1/(√(2π)(α^2+9))
  pièges : f_abs_dropped, f_ft_deriv_sign, f_ft_delta_const

Trouve la solution tempérée de y'' - y = δ par la transformée de Fourier (ℱ(δ) = 1/√(2π)).Table de Fourierlignef(y)f̂(α)11 si |y| < |b|, 0 sinon√(2/π) · sin(|b|α)/α21 si b < y < c, 0 sinon(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)3e^(−wy) si y > 0, 0 sinon (w > 0)(1/√(2π)) · 1/(w + iα)4e^(−wy) si b < y < c, 0 sinon(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)5e^(−iwy) si b < y < c, 0 sinon(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)61/(y² + w²) (w ≠ 0)√(π/2) · e^(−|wα|)/|w|7e^(−|wy|)/|w| (w ≠ 0)√(2/π) · 1/(α² + w²)8e^(−w²y²) (w ≠ 0)(1/(√2 |w|)) · e^(−α²/(4w²))9y e^(−w²y²) (w ≠ 0)(−iα/(2√2 |w|³)) · e^(−α²/(4w²))104y²/(y² + w²)² (w ≠ 0)√(2π) · (1/|w| − |α|) · e^(−|wα|)D1δ_ae^(−iaα)/√(2π)D21√(2π) δD3cos(ay)√(π/2) (δ_(−a) + δ_a)D4sin(ay)i √(π/2) (δ_(−a) − δ_a)FP1 : LinéaritéFP2 : f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dxFP3 : f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dxFP4 : 𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)FP5 : g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)FP6 : 𝓕(f ∗ g) = √(2π) f̂ ĝFP7 : Plancherel : ∫ f² = ∫ |f̂|²FP8 : 𝓕(f(x + a))(α) = e^(iaα) f̂(α)FP9 : 𝓕(f(ax))(α) = f̂(α/a)/|a|FP10 : 𝓕(x f(x)) = i (f̂)′FP11 : 𝓕(𝓕 f)(x) = f(−x)
  [free, suivre l'erreur]  y′′ − y = δ
    = −α²ŷ − ŷ = 1/√(2π)   ← ℱ(y″) = −α² ŷ, ℱ(δ) = 1/√(2π)
    = ŷ = −1/(√(2π)(α² + 1))   ← Isoler ŷ
    = y(x) = −e^(−|x|)/2   ← Ligne F7 avec w = 1
  aides : Transforme : ℱ(y″) = −α²ŷ et ℱ(δ) = 1/√(2π), isole ŷ, puis ligne F7. | -α^2 ŷ - ŷ = 1/√(2π) | ŷ = -1/(√(2π)(α^2+1))
  pièges : f_abs_dropped, f_ft_deriv_sign, f_ft_delta_const

Résous y' + 3y = δ au sens des distributions : une solution, la vérification, puis toutes les solutions.
  [free, suivre l'erreur]  y′ + 3y = δ
    = y = H(t)e^(−3t)   ← Essai
  — Vérification : la dérivée au sens des distributions.  [juge distrib]  départ : D(H(t)e^(−3t))
    = H(t)(−3e^(−3t)) + e^(−3t)δ   ← D(H g) = H g′ + g δ
    = −3H(t)e^(−3t) + δ   ← g·δ_a = g(a)·δ_a
  — Toutes les solutions :  [juge distrib]  départ : y = H(t)e^(−3t)
    = y = H(t)e^(−3t) + Ce^(−3t)   ← Particulière + homogène
  aides : Essaie H(t)e^(-3t) : H coupe la solution homogène en 0. | D(H(t)e^(-3t)) = H(t)(-3e^(-3t)) + e^(-3t)δ | -3H(t)e^(-3t) + δ

```

### Niveau 5

```
Résous y' + 3y = δ au sens des distributions : une solution, la vérification, puis toutes les solutions.
  [problème, 3 points]
  partie 1 (Début du problème : 1 ; Vérification : la dérivée au sens des distributions. : 1 ; Toutes les solutions : 1)
    [free, sans aide, suivre l'erreur]  y′ + 3y = δ
      = y = H(t)e^(−3t)   ← Essai
    — Vérification : la dérivée au sens des distributions.  [juge distrib]  départ : D(H(t)e^(−3t))
      = H(t)(−3e^(−3t)) + e^(−3t)δ   ← D(H g) = H g′ + g δ
      = −3H(t)e^(−3t) + δ   ← g·δ_a = g(a)·δ_a
    — Toutes les solutions :  [juge distrib]  départ : y = H(t)e^(−3t)
      = y = H(t)e^(−3t) + Ce^(−3t)   ← Particulière + homogène

Résous y' + 2y = δ au sens des distributions : une solution, la vérification, puis toutes les solutions.
  [problème, 3 points]
  partie 1 (Début du problème : 1 ; Vérification : la dérivée au sens des distributions. : 1 ; Toutes les solutions : 1)
    [free, sans aide, suivre l'erreur]  y′ + 2y = δ
      = y = H(t)e^(−2t)   ← Essai
    — Vérification : la dérivée au sens des distributions.  [juge distrib]  départ : D(H(t)e^(−2t))
      = H(t)(−2e^(−2t)) + e^(−2t)δ   ← D(H g) = H g′ + g δ
      = −2H(t)e^(−2t) + δ   ← g·δ_a = g(a)·δ_a
    — Toutes les solutions :  [juge distrib]  départ : y = H(t)e^(−2t)
      = y = H(t)e^(−2t) + Ce^(−2t)   ← Particulière + homogène

Résous y'' + y = δ au sens des distributions : une solution, la vérification, puis toutes les solutions.
  [problème, 3 points]
  partie 1 (Début du problème : 1 ; Vérification : la dérivée au sens des distributions. : 1 ; Toutes les solutions : 1)
    [free, sans aide, suivre l'erreur]  y′′ + y = δ
      = y = H(x)sin(x)   ← Essai
    — Vérification : la dérivée au sens des distributions.  [juge distrib]  départ : D(D(H(x)sin(x)))
      = D(H(x)cos(x))   ← D(H g) = H g′ + g δ
      = −H(x)sin(x) + δ   ← g·δ_a = g(a)·δ_a
    — Toutes les solutions :  [juge distrib]  départ : y = H(x)sin(x)
      = y = H(x)sin(x) + C_1cos(x) + C_2sin(x)   ← Particulière + homogène

```

### Variantes d'examen

```
Résous y'' + 9y = δ au sens des distributions : une solution, la vérification, puis toutes les solutions.
  [problème, examen open, 3 points]
  partie 1 (Début du problème : 1 ; Vérification : la dérivée au sens des distributions. : 1 ; Toutes les solutions : 1)
    [free, sans aide, suivre l'erreur]  y′′ + 9y = δ
      = y = H(x)sin(3x)/3   ← Essai
    — Vérification : la dérivée au sens des distributions.  [juge distrib]  départ : D(D(H(x)sin(3x)/3))
      = D(H(x)cos(3x))   ← D(H g) = H g′ + g δ
      = −3H(x)sin(3x) + δ   ← g·δ_a = g(a)·δ_a
    — Toutes les solutions :  [juge distrib]  départ : y = H(x)sin(3x)/3
      = y = H(x)sin(3x)/3 + C_1cos(3x) + C_2sin(3x)   ← Particulière + homogène

```

## Pièges de cette unité

- **Fonction paire : aₙ = 0 au lieu de bₙ = 0** (`f_even_an_zero`, C) : f paire ⟹ aₙ = 0 au lieu de bₙ = 0
- **a₀ ou l'indice spécial pris dans la formule générale** (`f_a0_separate`, C) : a₀ = formule aₙ en n = 0 ; a₂ de cos 2x oublié au lieu de a₀ et a₂ à part
- **Intégrale sur [0 ; 2π] avec la formule de ]−π ; π[** (`f_interval_02pi`, C) : |x| sur [0 ; 2π] au lieu de |x| sur [−π ; π]
- **cos(nx) gardé quand T ≠ 2π** (`f_period_omega`, E) : période 2 : cos(nx) au lieu de cos(nπx)
- **bₙ = cₙ − c₋ₙ sans le facteur i** (`f_coef_complex_convert`, E) : bₙ = cₙ − c₋ₙ au lieu de bₙ = i(cₙ − c₋ₙ)
- **Série en sinus avec 1/L au lieu de 2/L** (`f_sine_wrong_factor`, E) : bₙ = (1/π)∫₀^π au lieu de (2/π)∫₀^π
- **Signe du terme tout intégré** (`f_ipp_sign`, E) : ∫ x sin nx = x cos nx/n + … au lieu de −x cos nx/n + …
- **F f(x₀) = f(x₀) en un point de saut** (`f_dirichlet_skip`, C) : F f(0) = f(0) = 0 au lieu de (f(0⁺) + f(0⁻))/2 = π/2
- **F_s f(L) = f(L) au bord** (`f_sine_endpoint`, C) : F_s f(π) = f(π) = π² au lieu de 0
- **Bornes décalées en réindexant** (`f_sum_reindex`, E) : n = 2k − 1 avec k ≥ 0 au lieu de k ≥ 1
- **Parseval intégré sur [0 ; 2π]** (`f_parseval_bounds`, C) : ∫₀^{2π} x⁶ au lieu de ∫_{−π}^{π} x⁶
- **Parseval sans le facteur 2/T** (`f_parseval_factor`, C) : ∫ f² = Σ au lieu de (2/T)∫ f² = Σ
- **Parseval sans les carrés** (`f_parseval_square`, C) : ∫ f au lieu de ∫ f² ; Σ bₙ → Σ bₙ²
- **(a − b)² développé en a² − b²** (`f_parseval_expand`, C) : (2π²/n − 12/n³)² = 4π⁴/n² − 144/n⁶ au lieu de + double produit
- **a₀² au lieu de a₀²/2** (`f_parseval_a0`, E) : a₀² au lieu de a₀²/2
- **Coefficient de h au lieu de celui de c·h** (`f_coef_relation_factor`, C) : aₙ(x⁴) = −bₙ(x³)/n au lieu de −4bₙ(x³)/n
- **Dériver terme à terme une série discontinue** (`f_termwise_deriv`, E) : dériver terme à terme la série de x (discontinue) au lieu de 
- **Transformée sans 1/√(2π)** (`f_ft_norm`, E) : f̂ = ∫ f e^(−iαx) au lieu de (1/√(2π))∫
- **f̂(0) lu dans la formule générale** (`f_ft_alpha_zero`, E) : f̂(0) = formule en α = 0 (division par 0) au lieu de calcul direct
- **ℱ(f ∗ u) = f̂ û sans √(2π)** (`f_sqrt2pi_conv`, C) : F(f ∗ u) = f̂ û au lieu de √(2π) f̂ û
- **Coefficient de la convolution perdu** (`f_conv_coef_dropped`, C) : 2û + √(2π) f̂ û au lieu de 2û + 3√(2π) f̂ û
- **Valeur absolue oubliée (e^(−w|x|))** (`f_abs_dropped`, C) : u = e^(−2x)/4 au lieu de e^(−2|x|)/4
- **Ligne voisine de la table** (`f_table_line`, C) : ligne 3 (e^(−wy), y > 0) au lieu de ligne 7 (e^(−|wy|)) au lieu de 
- **« 0 sinon » oublié (ligne F3)** (`f_table_half_line`, C) : u = e^(−wx) partout au lieu de e^(−wx) si x > 0, 0 sinon
- **Réponse û au lieu de u** (`f_no_inverse`, C) : réponse û(α) = … au lieu de u(x) = …
- **Fraction rationnelle mal réduite** (`f_rat_simplify`, C) : 2 + 6/(1 + α²) = (2α² + 7)/(1 + α²) au lieu de (2α² + 8)/(1 + α²) ; 1/(2α² + 8) = ½/(α² + 8) → ½/(α² + 4)
- **Signe de la translation** (`f_ft_shift_sign`, E) : F(g(x − 1)) = e^(iα) ĝ au lieu de e^(−iα) ĝ
- **ℱ(f′) = −iα f̂ ou ℱ(f″) = α² f̂** (`f_ft_deriv_sign`, E) : F(u″) = α² û au lieu de −α² û
- **w lu au lieu de w² (ligne F8)** (`f_ft_scale`, E) : e^(−3x²) : w = 3 au lieu de w = √3
- **Plancherel avec un facteur 2π** (`f_plancherel_factor`, E) : ∫ f² = 2π ∫ |f̂|² au lieu de ∫ f² = ∫ |f̂|²
- **Retard sans le facteur e^(−inτ)** (`f_ode_shift_phase`, E) : u(t − π) ↦ cₙ au lieu de (−1)ⁿ cₙ
- **Cas λ = 0 oublié ou gardé à tort** (`f_sl_eigen_zero`, E) : λ = 0 oublié (Neumann) ou retenu à tort (Dirichlet) au lieu de 
- **Demi-plan de convergence oublié ou faux** (`f_lap_abscissa`, C) : L(e^(2t)) = 1/(z − 2) sans domaine au lieu de Re z > 2
- **Décalage dans le mauvais sens** (`f_lap_shift_sign`, E) : e^(−2t) f ↦ F(z − 2) au lieu de F(z + 2)
- **ℒ(t f) = F′ sans le signe moins** (`f_lap_tf_sign`, E) : L(t f) = F′ au lieu de −F′
- **sin(ωt) sans diviser par ω** (`f_sin_omega_factor`, E) : 1/(z² + 4) ↦ sin 2t au lieu de ½ sin 2t
- **Pôle conjugué oublié** (`f_lap_conj_pole`, E) : Res en 1 + i seulement au lieu de les deux pôles conjugués
- **Conditions initiales mal placées dans ℒ(y″)** (`f_lap_deriv_ic`, E) : L(y″) = z²Y − y(0) − zy′(0) au lieu de z²Y − zy(0) − y′(0)
- **Signe du noyau exponentiel** (`f_lap_integro_kernel`, E) : L(e^(2t)) = 1/(z + 2) au lieu de 1/(z − 2)
- **Taux de décroissance du mode n** (`f_heat_rate`, E) : e^(−nt) au lieu de e^(−(nπ/L)²t)
- **Facteur 1/L dans la série de la condition initiale** (`f_heat_bc_coef`, E) : bₙ(0) = (1/L)∫ au lieu de (2/L)∫
- **Des sinus pour des conditions de Neumann** (`f_neumann_sine`, E) : Neumann avec sin(nπx/L) au lieu de cos(nπx/L)
- **La partie stationnaire seule** (`f_heat_source_steady`, E) : b₂ = 1/4 au lieu de (1 − e^(−4t))/4
- **Facteur c de l'équation des ondes** (`f_wave_factor`, C) : û_tt + α² û = 0 au lieu de + (α²/4) û ; u = (…)/4 → (…)/2
- **Solution non bornée gardée** (`f_half_plane_abs`, E) : û = A e^(|α|x) + B e^(−|α|x) gardé au lieu de B e^(−|α|x)
- **δ du saut oublié** (`f_distrib_jump`, C) : Df = −f au lieu de −f + δ
- **⟨DT, φ⟩ = ⟨T, φ′⟩ sans le signe** (`f_distrib_sign`, E) : ⟨DT, φ⟩ = ⟨T, φ′⟩ au lieu de −⟨T, φ′⟩
- **g δ_a = g(0) δ_a** (`f_fdelta`, E) : f δ_a = f(0) δ_a ou f(x) δ_a au lieu de f(a) δ_a
- **ℱ(δ) = 1** (`f_ft_delta_const`, E) : F(δ) = 1 au lieu de 1/√(2π)
