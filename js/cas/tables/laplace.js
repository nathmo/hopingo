// The table of Laplace transforms given at the exams (catalogue F, « Tables
// à embarquer »; step U10). F(z) = ∫₀^∞ f(t) e^(−tz) dt for Re z > γ₀.
// Rows: stable id, the pair as screen text, as CAS text in t and z with the
// parameters of the row (α, ω, n), and the abscissa γ₀ (text).

export const LAPLACE_TABLE = [
  { id: 'L1', fHtml: '1/α si t ∈ [0 ; α], 0 sinon (α &gt; 0)', FHtml: '(1 − e^(−αz))/(αz)', gHtml: 'tout z', params: { α: 2 }, f: 'H(α-t)/α', F: '(1-e^(-α z))/(α z)', g0: '-inf' },
  { id: 'L2', fHtml: 'ε(t) = 1 si t ≥ 0 (Heaviside)', FHtml: '1/z', gHtml: '0', params: {}, f: '1', F: '1/z', g0: '0' },
  { id: 'L3', fHtml: 'e^(−αt)', FHtml: '1/(z + α)', gHtml: '−α', params: { α: 2 }, f: 'e^(-α t)', F: '1/(z+α)', g0: '-α' },
  { id: 'L4', fHtml: 'sin(ωt)', FHtml: 'ω/(z² + ω²)', gHtml: '0', params: { ω: 3 }, f: 'sin(ω t)', F: 'ω/(z^2+ω^2)', g0: '0' },
  { id: 'L5', fHtml: 'cos(ωt)', FHtml: 'z/(z² + ω²)', gHtml: '0', params: { ω: 3 }, f: 'cos(ω t)', F: 'z/(z^2+ω^2)', g0: '0' },
  { id: 'L6', fHtml: 'e^(αt) sin(ωt)', FHtml: 'ω/((z − α)² + ω²)', gHtml: 'α', params: { α: 1, ω: 2 }, f: 'e^(α t)sin(ω t)', F: 'ω/((z-α)^2+ω^2)', g0: 'α' },
  { id: 'L7', fHtml: 'e^(αt) cos(ωt)', FHtml: '(z − α)/((z − α)² + ω²)', gHtml: 'α', params: { α: 1, ω: 2 }, f: 'e^(α t)cos(ω t)', F: '(z-α)/((z-α)^2+ω^2)', g0: 'α' },
  { id: 'L8', fHtml: 'tⁿ/n!', FHtml: '1/z^(n+1)', gHtml: '0', params: { n: 3 }, f: 't^n/(n!)', F: '1/z^(n+1)', g0: '0' },
  { id: 'L9', fHtml: 't e^(−αt)', FHtml: '1/(z + α)²', gHtml: '−α', params: { α: 2 }, f: 't e^(-α t)', F: '1/(z+α)^2', g0: '-α' },
  { id: 'L10', fHtml: 'cosh(ωt)', FHtml: 'z/(z² − ω²)', gHtml: '|ω|', params: { ω: 2 }, f: 'cosh(ω t)', F: 'z/(z^2-ω^2)', g0: 'abs(ω)' },
  { id: 'L11', fHtml: 'sinh(ωt)', FHtml: 'ω/(z² − ω²)', gHtml: '|ω|', params: { ω: 2 }, f: 'sinh(ω t)', F: 'ω/(z^2-ω^2)', g0: 'abs(ω)' },
  { id: 'L12', fHtml: 'e^(αt) cosh(ωt)', FHtml: '(z − α)/((z − α)² − ω²)', gHtml: 'α + |ω|', params: { α: 1, ω: 2 }, f: 'e^(α t)cosh(ω t)', F: '(z-α)/((z-α)^2-ω^2)', g0: 'α+abs(ω)' },
  { id: 'L13', fHtml: 'e^(αt) sinh(ωt)', FHtml: 'ω/((z − α)² − ω²)', gHtml: 'α + |ω|', params: { α: 1, ω: 2 }, f: 'e^(α t)sinh(ω t)', F: 'ω/((z-α)^2-ω^2)', g0: 'α+abs(ω)' },
  { id: 'L14', fHtml: 't cos(ωt)', FHtml: '(z² − ω²)/(z² + ω²)²', gHtml: '0', params: { ω: 3 }, f: 't cos(ω t)', F: '(z^2-ω^2)/(z^2+ω^2)^2', g0: '0' },
];

export const LAPLACE_PROPS = [
  { id: 'LP1', html: 'Linéarité' },
  { id: 'LP2', html: '𝓛(f′) = zF − f(0) ; 𝓛(f″) = z²F − zf(0) − f′(0)' },
  { id: 'LP3', html: '𝓛(∫₀ᵗ f(s) ds) = F(z)/z' },
  { id: 'LP4', html: 'g = e^(−bt) f : 𝓛(g)(z) = F(z + b)' },
  { id: 'LP5', html: '𝓛(t f(t)) = −F′(z)' },
  { id: 'LP6', html: '𝓛(f ∗ g) = F·G, (f ∗ g)(t) = ∫₀ᵗ f(s) g(t − s) ds' },
  { id: 'LP7', html: 'Retard : 𝓛(f(t − a) ε(t − a)) = e^(−az) F(z), a &gt; 0' },
];

export const laplaceRow = (id) => LAPLACE_TABLE.find((r) => r.id === id) || null;
