// Generators of module A1, part k (step U4): power series — radius and
// domain (a1-pow-domain), sums by MacLaurin series (a1-pow-sums).
// Catalogue: docs/universite/A1-analyse-1.md, « Séries entières ».
//
// a1-pow-domain: lines in parts — |aₙ₊₁/aₙ| simplified (equiv, n whole),
// ρ (limit, discrete), R (value), the open interval |x − x₀| < R (solset),
// then the domain: the nature of the series at each bound is a decision
// (convention 5), and the domain is a solset part whose start is the named
// set D (cfg.sets), ending on an interval with the right brackets.
// a1-pow-sums: lines judged by `definite` (Σ to ∞ evaluated by partial
// sums), or `equiv` in x for a sum function (target no-sum), then its value.
// L5 and exam: multiple choice; tf with counter-examples (a sequence, or a
// point x refuting a claimed interval).

import { MT, linesItem, tfItem, examTag } from './kit.js';
import { q, N, modeOf, H, E, SEG, blanked, stepMenus, fr, uniqOptions, examMcq, tfTag } from './analyse1-k-kit.js';

// ======================================================================
// a1-pow-domain
// ======================================================================

const DOM = 'a1-pow-domain';
const DOM_SUB = [
  { id: 'rho', label: 'ρ par d\'Alembert', skill: 'a1-ser-ratio-root' },
  { id: 'radius', label: 'rayon', skill: DOM },
  { id: 'bounds', label: 'nature aux bornes', skill: 'a1-ser-leibniz-abs' },
  { id: 'compare', label: 'comparaison aux bornes', skill: 'a1-ser-compare' },
  { id: 'domain', label: 'domaine', skill: DOM },
];
const DOM_CHOICES = [
  { id: 'alembert', label: 'd\'Alembert sur |aₙ| : lim |aₙ₊₁/aₙ|' },
  { id: 'cauchy', label: 'Cauchy : lim ⁿ√|aₙ|', why: 'Possible, mais avec des puissances et des n, le quotient se simplifie mieux.' },
  { id: 'radius', label: 'R = 1/ρ' },
  { id: 'radius-bad', label: 'R = ρ', rule: 'a1_power_radius_inverse', why: 'La condition est ρ·|x − x₀| < 1 : R = 1/ρ.' },
  { id: 'open', label: 'Convergence absolue pour |x − x₀| < R' },
  { id: 'domain', label: 'Étudier x = x₀ ± R, puis écrire le domaine' },
];
const CRITERIA = [
  { id: 'riemann', label: 'Riemann : Σ 1/nᵅ converge ⇔ α > 1' },
  { id: 'leibniz', label: 'Leibniz : série alternée, |uₙ| décroît vers 0' },
  { id: 'necessary', label: 'Condition nécessaire : uₙ ne tend pas vers 0' },
  { id: 'ratio', label: 'd\'Alembert : |uₙ₊₁/uₙ| → ℓ < 1' },
];
const RATIOS = [[1, 2], [2, 3], [3, 2], [2, 1], [3, 1]];
const POW = { 0: '', '1/2': '√n', 1: 'n', 2: 'n^2' };

// Σ_{n≥1} aₙ(x − x₀)ⁿ with aₙ = (±c)ⁿ/(nᵖ·dⁿ⁺ᵏ).
function domData(rng, { ps = [0, '1/2', 1, 1, 2], center0 = true } = {}) {
  const [c, d] = rng.pick(RATIOS);
  const p = rng.pick(ps);
  const k = d > 1 ? rng.pick([0, 1]) : 0;
  const alt = rng.chance(0.3);
  let x0 = rng.int(-3, 3);
  if (!center0 && x0 === 0) x0 = rng.pick([-2, -1, 1, 2]);
  const rho = q(c, d);
  const R = q(d, c);
  // Texts of aₙ at the index m (a text: 'n', 'n+1').
  const num = (m) => (alt ? `(-${c})^${m.length > 1 ? `(${m})` : m}` : c === 1 ? '1' : `${c}^${m.length > 1 ? `(${m})` : m}`);
  const powOf = (m) => (p === 0 ? '' : p === '1/2' ? `√${m.length > 1 ? `(${m})` : m}` : p === 1 ? (m.length > 1 ? `(${m})` : m) : `${m.length > 1 ? `(${m})` : m}^2`);
  const dPow = (m) => (d === 1 ? '' : `${d}^${k ? `(${m}+1)` : m.length > 1 ? `(${m})` : m}`);
  const den = (m) => [powOf(m), dPow(m)].filter(Boolean).join('×');
  const A = (m) => (den(m) ? `${num(m)}/(${den(m)})` : num(m));
  const X = x0 === 0 ? 'x' : `(x${x0 > 0 ? '-' : '+'}${Math.abs(x0)})`;
  const term = den('n') ? `${num('n')}/(${den('n')})×${X}^n` : `${num('n')}×${X}^n`;
  const series = `sum(${term},n,1,∞)`;
  // |aₙ₊₁|·1/|aₙ|, without a fraction of fractions (tiny denominators are
  // dropped by the numeric comparison).
  const inv = (m) => (num(m) === '1' ? `(${den(m)})` : den(m) ? `(${den(m)})/${num(m)}` : `1/${num(m)}`);
  const ratio = `abs(${A('n+1')}×${inv('n')})`;
  const rhoT = N(rho);
  const frac = rho.d === 1 ? String(rho.n) : `(${rhoT})`;
  const simple = p === 0 ? rhoT
    : p === '1/2' ? `${frac}√(n/(n+1))`
      : p === 1 ? `${c === 1 ? '' : c}n/(${d === 1 ? '' : d}(n+1))`.replace('/((n+1))', '/(n+1)')
        : `${c === 1 ? '' : c}n^2/(${d === 1 ? '' : d}(n+1)^2)`.replace('/((n+1)^2)', '/(n+1)^2');
  const lo = q(x0).sub(R);
  const hi = q(x0).add(R);
  // The series at the bounds: Σ (±1)ⁿ/(dᵏ·nᵖ).
  const dk = d ** k;
  const bodyDen = [dk > 1 ? String(dk) : '', POW[p]].filter(Boolean).join('');
  const posT = bodyDen ? `1/${bodyDen.length > 1 ? `(${bodyDen})` : bodyDen}` : '1';
  const altT = bodyDen ? `(-1)^n/${bodyDen.length > 1 ? `(${bodyDen})` : bodyDen}` : '(-1)^n';
  const natPos = p === 2 ? 'abs' : 'div';
  const natAlt = p === 2 ? 'abs' : p === 0 ? 'div' : 'semi';
  const right = alt ? { t: altT, nat: natAlt } : { t: posT, nat: natPos };
  const left = alt ? { t: posT, nat: natPos } : { t: altT, nat: natAlt };
  const crit = (s, positive) => (s.nat === 'div' && p === 0 ? 'necessary' : s.nat === 'semi' ? 'leibniz' : positive || p === 2 ? 'riemann' : 'leibniz');
  right.crit = crit(right, !alt);
  left.crit = crit(left, alt);
  const domain = `${left.nat === 'div' ? ']' : '['}${N(lo)} ; ${N(hi)}${right.nat === 'div' ? '[' : ']'}`;
  return { c, d, p, k, alt, x0, X, rho, R, series, term, ratio, simple, lo, hi, left, right, domain, A };
}

const NATURE = { abs: 'converge absolument', semi: 'converge, pas absolument', div: 'diverge' };
const WHY_NAT = {
  abs: 'La série des valeurs absolues est une série de Riemann Σ 1/n² : elle converge.',
  semi: 'Série alternée : |uₙ| décroît vers 0 (Leibniz), mais Σ |uₙ| est une série de Riemann d\'exposant ≤ 1, divergente.',
  div: 'Regarde le terme général : série de Riemann d\'exposant ≤ 1, ou terme qui ne tend pas vers 0.',
};
const natureOf = (s) => (s.nat === 'abs' ? 'converge absolument' : s.nat === 'semi' ? 'converge (Leibniz), pas absolument' : 'diverge');

function boundDecision(x, s) {
  return {
    kind: 'decision', prompt: `En x = ${fr(N(x))}, la série devient Σ ${MT(s.t)}. Nature ?`,
    options: ['abs', 'semi', 'div'].map((id) => ({
      id, label: NATURE[id], valid: id === s.nat,
      ...(id !== s.nat && s.nat !== 'div' && id === 'div' ? { rule: 'a1_power_bounds_forgotten' } : {}),
      why: WHY_NAT[s.nat],
    })),
  };
}

function domLines(level, rng, opts = {}) {
  const solo = level === 5;
  const d = domData(rng, solo ? { ps: ['1/2', 1] } : {});
  const Rt = N(d.R);
  const rhoT = N(d.rho);
  const parts = [];
  if (level >= 2) {
    parts.push({ start: d.ratio, judge: { kind: 'equiv', vars: ['n'], domain: { n: { int: [1, 12] } } }, lines: [E(d.simple, 'Simplifier le quotient', 'rho', 'alembert')] });
    if (d.p !== 0) parts.push({ html: 'Limite du quotient :', ask: 'ρ =', start: d.simple, judge: { kind: 'limit', v: 'n', to: '+∞', discrete: true }, lines: [E(rhoT, 'ρ = lim |aₙ₊₁/aₙ|', 'rho', 'alembert')] });
  }
  parts.push({ html: 'Rayon de convergence :', ask: 'R =', start: 'R', judge: { kind: 'value', expect: Rt, form: 'any' }, lines: [E(Rt, 'R = 1/ρ', 'radius', 'radius')] });
  const xc = d.x0 === 0 ? 'x' : `x${d.x0 > 0 ? '-' : '+'}${Math.abs(d.x0)}`;
  const openLines = [E(`${N(d.lo)}<x<${N(d.hi)}`, `x₀ − R < x < x₀ + R`, 'radius', 'open'), E(`]${N(d.lo)} ; ${N(d.hi)}[`, 'Intervalle ouvert de convergence absolue', 'radius', 'open')];
  if (level === 1) openLines[0] = blanked(openLines[0], [N(d.lo), N(d.hi)]);
  parts.push({ html: 'Convergence absolue :', ask: 'x ∈', start: `abs(${xc})<${Rt}`, judge: { kind: 'solset', v: 'x' }, lines: openLines });
  const domainLine = E(d.domain, 'Domaine de convergence', 'domain', 'domain');
  const pre = level === 1
    ? [{ kind: 'note', html: `En x = ${fr(N(d.hi))} : Σ ${MT(d.right.t)} ${natureOf(d.right)}. En x = ${fr(N(d.lo))} : Σ ${MT(d.left.t)} ${natureOf(d.left)}.` }]
    : [boundDecision(d.hi, d.right), boundDecision(d.lo, d.left),
      ...(level >= 2 && level <= 4 ? [{ kind: 'rule', ask: `Quel critère pour la borne x = ${fr(N(d.lo))} ?`, options: CRITERIA, correct: d.left.crit }] : [])];
  parts.push({
    html: `Bornes x = ${fr(N(d.lo))} et x = ${fr(N(d.hi))}, puis le domaine D :`, ask: 'D =', start: 'D',
    judge: { kind: 'solset', v: 'x', sets: { D: d.domain } }, pre, lines: [level === 1 ? blanked(domainLine, [N(d.lo)]) : domainLine],
  });
  if (level === 1) parts[0].lines = [blanked(parts[0].lines[0], [Rt])];
  const menu = (p) => (level === 3 ? { ...p.judge, menus: stepMenus(p.start, p.lines, DOM_CHOICES) } : p.judge);
  const [first, ...rest] = parts;
  const script = [...(first.pre || []), ...first.lines];
  for (const p of rest) script.push(SEG(p.html, p.ask, p.start, menu(p)), ...(p.pre || []), ...p.lines);
  return linesItem({
    skill: DOM, level, mode: modeOf(level), start: first.start, judge: menu(first), script,
    prompt: `Domaine de convergence de ${MT(d.series, { vars: ['x', 'n'] })}.${level === 1 ? ` On donne ρ = lim |aₙ₊₁/aₙ| = ${fr(rhoT)}.` : ' Calcule ρ = lim |aₙ₊₁/aₙ| (d\'Alembert), R, puis étudie les deux bornes.'}`,
    declares: { vars: ['x', 'n'], domain: { n: 'ℕ' } },
    hints: H('R = 1/lim |aₙ₊₁/aₙ| ; puis remplace x par chaque borne x₀ ± R.',
      `R = ▢ ; bornes ${fr(String(d.x0))} ± R`,
      `ρ = ${fr(rhoT)}, R = ${fr(Rt)} ; domaine ${fr(d.domain)}.`),
    subgoals: DOM_SUB, keys: ['calc', 'seq', 'set'], tapActions: level === 3 ? 'steps' : null,
    key: `${DOM}:${level}:${d.series}`, exam: examTag(opts),
  });
}

function domMcq(rng, opts) {
  let d;
  for (let i = 0; i < 200; i++) {
    d = domData(rng, { ps: [0, 0, 1], center0: false });
    if (!d.rho.eq(d.R)) break;
  }
  const br = (lo, hi, l, r) => `${l ? '[' : ']'}${N(lo)} ; ${N(hi)}${r ? ']' : '['}`;
  const L = d.left.nat !== 'div';
  const Rr = d.right.nat !== 'div';
  const x0 = q(d.x0);
  const options = uniqOptions([
    { html: MT(d.domain), correct: true },
    { html: MT(L || Rr ? br(d.lo, d.hi, false, false) : br(d.lo, d.hi, true, true)), correct: false, rule: 'a1_power_bounds_forgotten' },
    { html: MT(br(x0.sub(d.rho), x0.add(d.rho), L, Rr)), correct: false, rule: 'a1_power_radius_inverse' },
    { html: MT(br(x0.neg().sub(d.R), x0.neg().add(d.R), L, Rr)), correct: false, rule: 'a1_power_center_sign' },
  ]);
  return examMcq({
    skill: DOM, prompt: `Le domaine de convergence de ${MT(d.series, { vars: ['x', 'n'] })} est :`, options,
    key: `${DOM}:mcq:${d.series}`,
    solution: [{ html: `|aₙ₊₁/aₙ| → ρ = ${fr(N(d.rho))}, donc R = 1/ρ = ${fr(N(d.R))}, centre ${fr(String(d.x0))}. En x = ${fr(N(d.hi))} : Σ ${MT(d.right.t)} ${natureOf(d.right)} ; en x = ${fr(N(d.lo))} : Σ ${MT(d.left.t)} ${natureOf(d.left)}. Domaine ${MT(d.domain)}.`, note: '' }],
  }, rng, opts);
}

function domTf(rng) {
  const kind = rng.pick(['inside', 'inside', 'radius', 'radius', 'bound', 'ratio0', 'fact']);
  if (kind === 'inside') {
    const c = rng.int(-2, 3);
    const u = rng.pick([2, 3, 5]) * rng.pick([1, -1]);
    const w = rng.int(1, Math.abs(u) - 1) * rng.pick([1, -1]);
    const dec = (x) => fr(String(x.n / x.d).replace('.', ','));
    const X = c === 0 ? 'xⁿ' : `(x ${c > 0 ? '−' : '+'} ${Math.abs(c)})ⁿ`;
    return tfItem({
      skill: DOM, level: 4, statement: `Si Σ aₙ${X} converge en x = ${dec(q(c).add(q(u, 10)))}, alors elle converge en x = ${dec(q(c).add(q(w, 10)))}.`, truth: true,
      key: `inside:${c}:${u}:${w}`, exam: tfTag,
      explanation: `Vrai : la convergence en un point à distance ${dec(q(Math.abs(u), 10))} du centre ${fr(String(c))} donne R ≥ ${dec(q(Math.abs(u), 10))} ; le second point est à distance ${dec(q(Math.abs(w), 10))} < R : la série y converge absolument.`,
    });
  }
  if (kind === 'radius') {
    const c = rng.pick([2, 3, 4, 5]);
    return tfItem({
      skill: DOM, level: 4, statement: `Le rayon de convergence de Σ_{n≥0} (${c}x)ⁿ vaut ${c} : la série converge pour tout x tel que |x| < ${c}.`, truth: false,
      counter: { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: `abs(x)<${c}⇒abs(${c}x)<1`, hyp: `abs(x)<${c}`, ask: [{ v: 'x', label: 'x =' }], answer: { x: '1' } },
      ruleIfTrue: 'a1_power_radius_inverse', key: `radius:${c}`, exam: tfTag,
      explanation: `Faux : Σ (${c}x)ⁿ est géométrique de raison ${c}x ; elle converge ⇔ |${c}x| < 1 ⇔ |x| < 1/${c}. Le rayon est 1/${c}. Par exemple x = 1 : la raison ${c} > 1, la série diverge.`,
    });
  }
  if (kind === 'bound') {
    return tfItem({
      skill: DOM, level: 4, statement: 'Si Σ aₙxⁿ converge en x = 1, alors elle converge en x = −1.', truth: false,
      counter: {
        kind: 'sequence', v: 'n', from: 1, seqs: ['a'],
        hyp: [{ p: 'seriesConverges', say: 'Σ aₙ converge (x = 1)' }], concl: { p: 'seriesConverges', of: 'a×(-1)^n', say: 'Σ aₙ(−1)ⁿ converge (x = −1)' },
        ask: [{ v: 'a', label: 'aₙ =', keys: ['calc', 'seq'] }], answer: { a: '(-1)^n/n' },
      },
      ruleIfTrue: 'a1_power_bounds_forgotten', key: 'bound', exam: tfTag,
      explanation: 'Faux : x = 1 et x = −1 sont deux bornes, étudiées chacune à part. Avec aₙ = (−1)ⁿ/n, la série converge en 1 (Leibniz) et devient Σ 1/n en −1, qui diverge.',
    });
  }
  if (kind === 'ratio0') {
    return tfItem({ skill: DOM, level: 4, statement: 'Si aₙ ≠ 0 et |aₙ₊₁/aₙ| → 0, alors Σ aₙxⁿ converge pour tout x ∈ ℝ.', truth: true, key: 'ratio0', exam: tfTag,
      explanation: 'Vrai : ρ = 0, donc R = +∞ : d\'Alembert donne |aₙ₊₁xⁿ⁺¹|/|aₙxⁿ| → 0 < 1 pour tout x.' });
  }
  const m = rng.pick([10, 100, 50]);
  return tfItem({ skill: DOM, level: 4, statement: `Σ_{n≥${m}} xⁿ/n! converge pour tout x ∈ ℝ.`, truth: true, key: `fact:${m}`, exam: tfTag,
    explanation: `Vrai : |aₙ₊₁/aₙ| = 1/(n + 1) → 0, donc R = +∞. Commencer à n = ${m} ne change pas la nature.` });
}

function domItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return domMcq(rng, opts);
  if (opts.exam === 'tf') return domTf(rng);
  if (level === 5 && rng.chance(0.4)) return domMcq(rng, opts);
  return domLines(level, rng, opts);
}

// ======================================================================
// a1-pow-sums
// ======================================================================

const SUM = 'a1-pow-sums';
const SUM_SUB = [
  { id: 'reindex', label: 'changement d\'indice', skill: 'g5-reindex' },
  { id: 'ref', label: 'série de référence', skill: 'a1-dl-usual' },
  { id: 'sum', label: 'somme', skill: SUM },
];
const SUM_CHOICES = [
  { id: 'split', label: 'Séparer la somme en deux séries' },
  { id: 'reindex', label: 'Changer d\'indice' },
  { id: 'ref', label: 'Reconnaître eˣ ou 1/(1 − x), sans les premiers termes' },
  { id: 'derive', label: 'Dériver terme à terme' },
  { id: 'eval', label: 'Évaluer' },
  { id: 'whole', label: 'Remplacer par la série complète', rule: 'a1_pow_sum_index_shift', why: 'La série de référence commence à 0 : retire les termes qui manquent.' },
];
// c·body, c ≠ 0, as a term after others: +body, −2body, +3body.
const coef = (c, body) => `${c < 0 ? '-' : '+'}${Math.abs(c) === 1 ? '' : Math.abs(c)}${body}`;
const eTerm = (c) => coef(c, 'e');
// A rational constant after other terms (omitted if 0).
const cTerm = (x) => (x.n === 0 ? '' : `${x.n < 0 ? '-' : '+'}${N(x.n < 0 ? x.neg() : x)}`);
const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
// Σ_{i<m} a^i/i! (exact).
const partial = (a, m) => { let s = q(0); for (let i = 0; i < m; i++) s = s.add(q(a ** i, fact(i))); return s; };

// (a) Σ_{k≥k₀} (aᵏ + p·k)/k! = e^a − P + p·(e − [k₀ = 2]).
function sumsA(level) {
  return (rng) => {
    const a = rng.pick([2, 3]);
    const p = rng.pick([1, 1, 2, 3, -1, -2]);
    const k0 = rng.pick([1, 2]);
    const P = partial(a, k0);
    const ea = `e^${a}`;
    const start = `sum((${a}^k${p < 0 ? '-' : '+'}${Math.abs(p) === 1 ? '' : Math.abs(p)}k)/k!,k,${k0},∞)`;
    const S2 = (body, from, idx = 'k') => coef(p, `sum(${body},${idx},${from},∞)`);
    const first = `${ea}${cTerm(P.neg())}`;
    const fin = `${ea}${eTerm(p)}${cTerm(P.neg().sub(q(k0 === 2 ? p : 0)))}`;
    const lines = [
      E(`sum(${a}^k/k!,k,${k0},∞)${S2('k/k!', k0)}`, 'Séparer : deux séries convergentes', 'sum', 'split'),
      E(`${first}${S2('k/k!', k0)}`, `Σ ${a}ᵏ/k! = e${'⁰¹²³'[a]} sans ${k0 === 1 ? 'le terme k = 0' : 'les termes k = 0 et k = 1'}`, 'ref', 'ref'),
      E(`${first}${S2('1/(k-1)!', k0)}`, 'k/k! = 1/(k − 1)!', 'reindex', 'reindex'),
      E(`${first}${S2('1/j!', k0 - 1, 'j')}`, 'Changer d\'indice : j = k − 1', 'reindex', 'reindex'),
      E(fin, k0 === 1 ? 'Σ_{j≥0} 1/j! = e' : 'Σ_{j≥1} 1/j! = e − 1', 'sum', 'ref'),
    ];
    if (level === 1) { lines[1] = blanked(lines[1], [N(P)]); lines[3] = blanked(lines[3], ['j!']); }
    if (level === 2) lines[3] = blanked(lines[3], ['j!']);
    return {
      kind: 'a', start, judge: { kind: 'definite' }, lines,
      prompt: `Calcule ${MT(start)}.`, ref: 'Σ_{k≥0} xᵏ/k! = eˣ',
      hint2: `k/k! = 1/(k − 1)! ; puis Σ ${a}ᵏ/k! = e${'⁰¹²³'[a]} − ▢`, fin,
    };
  };
}

// (c) Σ_{k≥k₀} (−1)ᵏxᵏ/k! = e^(−x) − Σ_{k<k₀} (−x)ᵏ/k!.
function sumsC(level) {
  return (rng) => {
    const x = rng.pick([1, 1, 2]);
    const k0 = rng.pick([2, 3]);
    const P = partial(-x, k0);
    const body = x === 1 ? '(-1)^k/k!' : `(-1)^k×${x}^k/k!`;
    const start = `sum(${body},k,${k0},∞)`;
    const terms = Array.from({ length: k0 }, (_, i) => q((-x) ** i, fact(i))).map((t, i) => (i === 0 ? N(t) : `${t.n < 0 ? '-' : '+'}${N(t.n < 0 ? t.neg() : t)}`)).join('');
    const E1 = `e^(-${x})`;
    const lines = [
      E(`${E1}-sum(${body},k,0,${k0 - 1})`, `Σ_{k≥0} (−${x})ᵏ/k! = e^(−${x}), moins les premiers termes`, 'ref', 'ref'),
      E(`${E1}${cTerm(P.neg())}`, `Les termes retirés : ${terms.replace(/-/g, ' − ').replace(/\+/g, ' + ')}`, 'sum', 'eval'),
    ];
    if (level === 1) lines[0] = blanked(lines[0], [String(k0 - 1)]);
    const shown = x === 1 && k0 === 2 ? `1/2! − 1/3! + 1/4! − … = ${MT(start)}` : MT(start);
    return {
      kind: 'c', start, judge: { kind: 'definite' }, lines,
      prompt: `Calcule ${shown}.`, ref: 'Σ_{k≥0} xᵏ/k! = eˣ, en x = −' + x,
      hint2: `${MT(start)} = e^(−${x}) − Σ_{k=0}^{${k0 - 1}} ▢`, fin: lines[1].math,
    };
  };
}

// (b) f(x) = Σ_{n≥m} xⁿ = xᵐ/(1 − x), then f′(t).
function sumsB(level) {
  return (rng) => {
    const m = rng.pick([1, 2, 2, 3]);
    const t = rng.pick([q(1, 2), q(1, 3), q(-1, 2), q(1, 4)]);
    const xm = m === 1 ? 'x' : `x^${m}`;
    const f = `${xm}/(1-x)`;
    const df = m === 1 ? '1/(1-x)^2' : `(${m}x^${m - 1 === 1 ? '' : m - 1}×(1-x)+${xm})/(1-x)^2`.replace('x^×', 'x×');
    const T = `(${N(t)})`;
    const valueAt = (m === 1 ? q(1) : t.pow(m - 1).mul(q(m).sub(t.mul(q(m - 1))))).div(q(1).sub(t).pow(2));
    const atT = `${m === 1 ? '1' : `(${m}×${T}^${m - 1}×(1-${T})+${T}^${m})`}/(1-${T})^2`;
    const lines = [
      E(`${xm}×sum(x^n,n,0,∞)`, `Mettre ${m === 1 ? 'x' : `x${'⁰¹²³'[m]}`} en facteur`, 'reindex', 'reindex'),
      E(f, 'Série géométrique, |x| < 1', 'ref', 'ref'),
    ];
    if (level === 1) lines[0] = blanked(lines[0], ['0']);
    return {
      kind: 'b', start: 'f(x)', judge: { kind: 'equiv', vars: ['x'], domain: { x: [-0.6, 0.6] }, target: 'no-sum', defs: { f: `sum(x^n,n,${m},∞)` }, funcs: ['f'] }, lines,
      more: [
        SEG('Dériver f :', 'f′(x) =', `d(${f})`, { kind: 'equiv', vars: ['x'], domain: { x: [-0.6, 0.6] }, target: 'no-prime' }), E(df, 'Dériver un quotient', 'sum', 'derive'),
        SEG(`Évaluer en x = ${fr(N(t))} :`, `f′(${fr(N(t))}) =`, atT, { kind: 'definite' }), E(N(valueAt), 'Calculer', 'sum', 'eval'),
      ],
      prompt: `Soit f(x) = ${MT(`sum(x^n,n,${m},∞)`, { vars: ['x', 'n'] })} pour |x| < 1. Écris f(x) sans Σ, puis calcule f′(${fr(N(t))}).`, ref: 'Σ_{n≥0} xⁿ = 1/(1 − x) pour |x| < 1',
      hint2: `${MT(`sum(x^n,n,${m},∞)`, { vars: ['x', 'n'] })} = ${m === 1 ? 'x' : `x${'⁰¹²³'[m]}`}·Σ_{n≥0} xⁿ = ▢`, fin: N(valueAt),
    };
  };
}

// (d) Σ_{n≥1} n·xⁿ = x/(1 − x)², then its value at t.
function sumsD(level) {
  return (rng) => {
    const t = rng.pick([q(1, 2), q(1, 3), q(-1, 2), q(1, 4), q(2, 3)]);
    const T = `(${N(t)})`;
    const v = t.div(q(1).sub(t).pow(2));
    const lines = [
      E('x×sum(n×x^(n-1),n,1,∞)', 'Mettre x en facteur', 'reindex', 'reindex'),
      E('x×d(1/(1-x))', 'Σ n·xⁿ⁻¹ est la dérivée terme à terme de Σ xⁿ', 'ref', 'derive'),
      E('x/(1-x)^2', 'Dériver', 'sum', 'derive'),
    ];
    if (level === 1) lines[0] = blanked(lines[0], ['n-1']);
    return {
      kind: 'd', start: 'f(x)', judge: { kind: 'equiv', vars: ['x'], domain: { x: [-0.5, 0.5] }, target: 'no-sum', defs: { f: 'sum(n×x^n,n,1,∞)' }, funcs: ['f'] }, lines,
      more: [SEG(`Évaluer en x = ${fr(N(t))} :`, 'Σ =', `${T}/(1-${T})^2`, { kind: 'definite' }), E(N(v), 'Calculer', 'sum', 'eval')],
      prompt: `Pour |x| < 1, écris f(x) = ${MT('sum(n×x^n,n,1,∞)', { vars: ['x', 'n'] })} sans Σ (dérive terme à terme Σ xⁿ), puis calcule Σ_{n≥1} n·(${fr(N(t))})ⁿ.`, ref: 'Σ_{n≥0} xⁿ = 1/(1 − x), dérivable terme à terme pour |x| < 1',
      hint2: 'Σ n·xⁿ = x·Σ n·xⁿ⁻¹ = x·(1/(1 − x))′ = ▢', fin: N(v),
    };
  };
}

function sumsLines(level, rng, opts = {}) {
  const make = rng.pick([sumsA, sumsA, sumsA, sumsC, sumsB, sumsD])(level);
  const s = make(rng);
  const menu = (judge, start, lines) => (level === 3 ? { ...judge, menus: stepMenus(start, lines, SUM_CHOICES) } : judge);
  const script = [...s.lines];
  for (let i = 0; i < (s.more || []).length; i += 2) {
    const seg = s.more[i];
    const line = s.more[i + 1];
    script.push({ ...seg, judge: menu(seg.judge, seg.start.math, [line]) }, line);
  }
  const vars = s.judge.kind === 'equiv' ? ['x', 'n', 'k'] : ['k', 'j', 'n'];
  return linesItem({
    skill: SUM, level, mode: modeOf(level), start: s.start, judge: menu(s.judge, s.start, s.lines), script,
    prompt: `${s.prompt}${level <= 2 ? ` Référence : ${s.ref}.` : ''}`,
    declares: { vars, ...(s.judge.funcs ? { funcs: s.judge.funcs } : {}) },
    hints: H(s.kind === 'a' ? 'Sépare en deux sommes et compare chacune à Σ xᵏ/k! = eˣ.' : `Reconnais la série de référence : ${s.ref}.`, s.hint2, MT(s.fin)),
    subgoals: SUM_SUB, keys: ['calc', 'seq', 'anal'], tapActions: level === 3 ? 'steps' : null,
    key: `${SUM}:${level}:${s.kind}:${s.start}:${s.more?.at(-2)?.start.math ?? ''}`, exam: examTag(opts),
  });
}

// Exam multiple choice: Σ_{k≥k₀} (aᵏ + p·k)/(k − 1)! (MT 2014), or
// f(t) = Σ_{n≥2} tⁿ and f′(t₀) (2022).
function sumsMcq(rng, opts) {
  if (rng.chance(0.65)) {
    const a = rng.pick([2, 3]);
    const p = rng.pick([-2, -1, 1, 2, -3]);
    const k0 = rng.pick([1, 2]);
    // Σ aᵏ/(k − 1)! = a·Σ_{i≥k₀−1} aⁱ/i! ; Σ k/(k − 1)! = Σ_{i≥k₀−1} (i + 1)/i!.
    const P = partial(a, k0 - 1);
    // cA·e^a + eC·e + c, as text.
    const text = (cA, eC, cc) => `${cA === 1 ? '' : cA}e^${a}${eC ? eTerm(eC) : ''}${cTerm(cc)}`;
    const eC = 2 * p;
    const c = P.mul(q(-a)).sub(q(k0 === 2 ? p : 0));
    const right = text(a, eC, c);
    const shift = text(a, eC, q(k0 === 2 ? -p : 0)); // the first terms of Σ aⁱ/i! not removed
    const shift2 = text(a, eC, P.mul(q(-a))); // Σ_{i≥1} 1/i! read as e
    const noA = text(1, eC, P.neg().sub(q(k0 === 2 ? p : 0))); // the factor a forgotten
    const half = text(a, p, c); // Σ (i + 1)/i! read as e only
    const start = `sum((${a}^k${p < 0 ? '-' : '+'}${Math.abs(p) === 1 ? '' : Math.abs(p)}k)/(k-1)!,k,${k0},∞)`;
    const options = uniqOptions([
      { html: MT(right), correct: true },
      { html: MT(shift), correct: false, rule: 'a1_pow_sum_index_shift' },
      { html: MT(shift2), correct: false, rule: 'a1_pow_sum_index_shift' },
      { html: MT(noA), correct: false },
      { html: MT(half), correct: false },
      { html: MT(text(a, p, c.sub(q(p)))), correct: false },
    ]);
    return examMcq({
      skill: SUM, prompt: `${MT(start)} =`, options, key: `${SUM}:mcq:a:${start}`,
      solution: [{ html: `Σ ${a}ᵏ/(k − 1)! = ${a}·Σ_{i≥${k0 - 1}} ${a}ⁱ/i! = ${a}(e${'⁰¹²³'[a]}${k0 === 2 ? ' − 1' : ''}) ; Σ k/(k − 1)! = Σ_{i≥${k0 - 1}} (i + 1)/i! = ${k0 === 2 ? 'e + (e − 1)' : 'e + e'}. Total : ${MT(right)}.`, note: '' }],
    }, rng, opts);
  }
  const m = rng.pick([2, 3]);
  const t = rng.pick([q(1, 2), q(1, 3), q(-1, 2)]);
  const right = t.pow(m - 1).mul(q(m).sub(t.mul(q(m - 1)))).div(q(1).sub(t).pow(2));
  const geo = q(1).div(q(1).sub(t).pow(2)); // derivative of 1/(1 − t): the start forgotten
  const noDen = q(m).mul(t.pow(m - 1));
  const val = t.pow(m).div(q(1).sub(t)); // f(t) instead of f′(t)
  const options = uniqOptions([
    { html: MT(N(right)), correct: true },
    { html: MT(N(geo)), correct: false },
    { html: MT(N(val)), correct: false },
    { html: MT(N(noDen)), correct: false },
    { html: MT(N(right.add(q(1)))), correct: false },
  ]);
  return examMcq({
    skill: SUM, prompt: `Soit f(t) = ${MT(`sum(t^n,n,${m},∞)`, { vars: ['t', 'n'] })} pour |t| < 1. Alors f′(${fr(N(t))}) =`, options,
    key: `${SUM}:mcq:b:${m}:${N(t)}`,
    solution: [{ html: `f(t) = t${'⁰¹²³'[m]}/(1 − t), donc f′(t) = (${m}t${m - 1 === 1 ? '' : '²'}(1 − t) + t${'⁰¹²³'[m]})/(1 − t)², et f′(${fr(N(t))}) = ${fr(N(right))}.`, note: '' }],
  }, rng, opts);
}

// True or false: the Taylor series of c/(a + bx) at x₀ converges on an
// interval (catalogue, 2019); a false interval is refuted by a point.
function sumsTf(rng) {
  for (let i = 0; i < 200; i++) {
    const a = rng.int(1, 5);
    const b = rng.pick([1, 2, 3]);
    const c = rng.int(1, 6);
    const x0 = rng.int(-2, 3);
    const pole = q(-a, b);
    const R = q(x0).sub(pole);
    if (R.n <= 0) continue;
    const truth = rng.chance(0.5);
    const R2 = truth ? R : rng.chance(0.5) ? R.add(q(1)) : R.mul(q(2));
    const lo = q(x0).sub(R2);
    const hi = q(x0).add(R2);
    const fx = `${c}/(${a}+${b === 1 ? '' : b}x)`;
    return tfItem({
      skill: SUM, level: 4, statement: `La série de Taylor de f(x) = ${MT(fx)} en x₀ = ${fr(String(x0))} converge sur ${MT(`]${N(lo)} ; ${N(hi)}[`)}.`, truth,
      ...(truth ? {} : {
        counter: { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: `(${N(lo)}<x ∧ x<${N(hi)})⇒abs(x-(${x0}))<${N(R)}`, hyp: `${N(lo)}<x ∧ x<${N(hi)}`, ask: [{ v: 'x', label: 'x =' }], answer: { x: N(pole) } },
        ruleIfTrue: 'a1_power_bounds_forgotten',
      }),
      key: `${fx}:${x0}:${N(R2)}`, exam: tfTag,
      explanation: `${truth ? 'Vrai' : 'Faux'} : f(x) = ${fr(c)}/(${a} + ${b === 1 ? '' : b}x) se développe comme une série géométrique autour de ${fr(String(x0))} ; elle converge tant que |x − ${fr(String(x0))}| < ${fr(N(R))}, la distance de ${fr(String(x0))} au pôle ${fr(N(pole))}. Le domaine est ]${fr(N(q(x0).sub(R)))} ; ${fr(N(q(x0).add(R)))}[${truth ? '' : ` : en x = ${fr(N(pole))}, f n'est même pas définie`}.`,
    });
  }
  return tfItem({ skill: SUM, level: 4, statement: `La série de Taylor de f(x) = ${MT('4/(2+3x)')} en x₀ = 2 converge sur ${MT(']-2/3 ; 14/3[')}.`, truth: true, key: 'fallback', exam: tfTag, fallback: true,
    explanation: 'Vrai : le pôle est −2/3, à distance 8/3 de 2.' });
}

function sumsItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq' || level === 5) return sumsMcq(rng, opts);
  if (opts.exam === 'tf') return sumsTf(rng);
  return sumsLines(level, rng, opts);
}

export const GEN = { [DOM]: domItem, [SUM]: sumsItem };
