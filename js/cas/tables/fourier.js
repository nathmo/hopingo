// The table of Fourier transforms given at the exams (catalogue F, « Tables
// à embarquer »; step U10). Convention f̂(α) = (1/√(2π)) ∫ f(y) e^(−iαy) dy.
// Each row has a stable id, the line numbers of the two formularies (the
// corrections cite them: « ligne 3 au lieu de ligne 7 »), the pair as
// screen text, and as CAS text in y and α with the parameters of the row
// (f, F: texts for js/cas/parse.js, H the Heaviside function), for the
// generators and the checks (tests/vcf-judges.test.js compares each row
// with the numeric transform of js/cas/transforms.js).

export const FOURIER_TABLE = [
  { id: 'F1', mt: 1, dt: 1, fHtml: '1 si |y| &lt; |b|, 0 sinon', FHtml: '√(2/π) · sin(|b|α)/α', params: { b: 2 }, f: 'H(b-abs(y))', F: 'sqrt(2/π)sin(b α)/α' },
  { id: 'F2', mt: 2, dt: 2, fHtml: '1 si b &lt; y &lt; c, 0 sinon', FHtml: '(1/√(2π)) · (e^(−iαb) − e^(−iαc))/(iα)', params: { b: -1, c: 2 }, f: 'H(y-b)H(c-y)', F: '(e^(-i α b)-e^(-i α c))/(i α sqrt(2π))' },
  { id: 'F3', mt: 3, dt: 4, fHtml: 'e^(−wy) si y &gt; 0, 0 sinon (w &gt; 0)', FHtml: '(1/√(2π)) · 1/(w + iα)', params: { w: 2 }, f: 'H(y)e^(-w y)', F: '1/(sqrt(2π)(w+i α))' },
  { id: 'F4', mt: 4, dt: 5, fHtml: 'e^(−wy) si b &lt; y &lt; c, 0 sinon', FHtml: '(1/√(2π)) · (e^(−(w+iα)b) − e^(−(w+iα)c))/(w + iα)', params: { w: 1, b: 0, c: 2 }, f: 'H(y-b)H(c-y)e^(-w y)', F: '(e^(-(w+i α)b)-e^(-(w+i α)c))/(sqrt(2π)(w+i α))' },
  { id: 'F5', mt: 5, dt: 7, fHtml: 'e^(−iwy) si b &lt; y &lt; c, 0 sinon', FHtml: '(1/(i√(2π))) · (e^(−i(w+α)b) − e^(−i(w+α)c))/(w + α)', params: { w: 1, b: 0, c: 2 }, f: 'H(y-b)H(c-y)e^(-i w y)', F: '(e^(-i(w+α)b)-e^(-i(w+α)c))/(i sqrt(2π)(w+α))', complex: true },
  { id: 'F6', mt: 6, dt: 3, fHtml: '1/(y² + w²) (w ≠ 0)', FHtml: '√(π/2) · e^(−|wα|)/|w|', params: { w: 2 }, f: '1/(y^2+w^2)', F: 'sqrt(π/2)e^(-abs(w α))/abs(w)' },
  { id: 'F7', mt: 7, dt: 10, fHtml: 'e^(−|wy|)/|w| (w ≠ 0)', FHtml: '√(2/π) · 1/(α² + w²)', params: { w: 2 }, f: 'e^(-abs(w y))/abs(w)', F: 'sqrt(2/π)/(α^2+w^2)' },
  { id: 'F8', mt: 8, dt: 8, fHtml: 'e^(−w²y²) (w ≠ 0)', FHtml: '(1/(√2 |w|)) · e^(−α²/(4w²))', params: { w: 1 }, f: 'e^(-w^2 y^2)', F: 'e^(-α^2/(4w^2))/(sqrt(2)abs(w))' },
  { id: 'F9', mt: 9, dt: 12, fHtml: 'y e^(−w²y²) (w ≠ 0)', FHtml: '(−iα/(2√2 |w|³)) · e^(−α²/(4w²))', params: { w: 1 }, f: 'y e^(-w^2 y^2)', F: '-i α e^(-α^2/(4w^2))/(2sqrt(2)abs(w)^3)' },
  { id: 'F10', mt: 10, dt: 11, fHtml: '4y²/(y² + w²)² (w ≠ 0)', FHtml: '√(2π) · (1/|w| − |α|) · e^(−|wα|)', params: { w: 1 }, f: '4y^2/(y^2+w^2)^2', F: 'sqrt(2π)(1/abs(w)-abs(α))e^(-abs(w α))' },
  { id: 'F11', mt: null, dt: 6, fHtml: 'e^(iay) si |y| &lt; b, 0 sinon', FHtml: '√(2/π) · sin(b(α − a))/(α − a)', params: { a: 1, b: 2 }, f: 'H(b-abs(y))e^(i a y)', F: 'sqrt(2/π)sin(b(α-a))/(α-a)', complex: true },
  { id: 'F12', mt: null, dt: 9, fHtml: 'sin(ay)/y (a &gt; 0)', FHtml: '√(π/2) si |α| &lt; a ; 0 si |α| &gt; a', params: { a: 2 }, f: 'sin(a y)/y', F: 'sqrt(π/2)H(a-abs(α))' },
  { id: 'D1', mt: null, dt: null, fHtml: 'δ_a', FHtml: 'e^(−iaα)/√(2π)', distribution: true },
  { id: 'D2', mt: null, dt: null, fHtml: '1', FHtml: '√(2π) δ', distribution: true },
  { id: 'D3', mt: null, dt: null, fHtml: 'cos(ay)', FHtml: '√(π/2) (δ_(−a) + δ_a)', distribution: true },
  { id: 'D4', mt: null, dt: null, fHtml: 'sin(ay)', FHtml: 'i √(π/2) (δ_(−a) − δ_a)', distribution: true },
];

export const FOURIER_PROPS = [
  { id: 'FP1', html: 'Linéarité' },
  { id: 'FP2', html: 'f paire : f̂(α) = √(2/π) ∫₀^∞ f(x) cos(αx) dx' },
  { id: 'FP3', html: 'f impaire : f̂(α) = −i √(2/π) ∫₀^∞ f(x) sin(αx) dx' },
  { id: 'FP4', html: '𝓕(f⁽ⁿ⁾)(α) = (iα)ⁿ f̂(α)' },
  { id: 'FP5', html: 'g(x) = e^(−ibx) f(x) : ĝ(α) = f̂(α + b)' },
  { id: 'FP6', html: '𝓕(f ∗ g) = √(2π) f̂ ĝ' },
  { id: 'FP7', html: 'Plancherel : ∫ f² = ∫ |f̂|²' },
  { id: 'FP8', html: '𝓕(f(x + a))(α) = e^(iaα) f̂(α)' },
  { id: 'FP9', html: '𝓕(f(ax))(α) = f̂(α/a)/|a|' },
  { id: 'FP10', html: '𝓕(x f(x)) = i (f̂)′' },
  { id: 'FP11', html: '𝓕(𝓕 f)(x) = f(−x)' },
];

export const fourierRow = (id) => FOURIER_TABLE.find((r) => r.id === id) || null;
