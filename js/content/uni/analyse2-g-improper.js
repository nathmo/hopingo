// a2-improper-multi (module A2, part g, step U6): improper integrals on ℝ²
// and ℝ³, and the Gauss integral. Catalogue docs/universite/A2-analyse-2.md,
// entry `a2-improper-multi`.
//
// A radial f on {‖x‖ ≥ 1}, {‖x‖ ≤ 1} or the whole space: the integrand with
// its jacobian (`equiv` with cfg.jac), the integral on the ball B_R (or
// outside B_ε) as a function of R (`equiv` in R, target `no-int`),
// then the limit R → +∞ or ε → 0⁺ (`limit`: a number or +∞, « diverge »).
// The Gaussian adds ∫_ℝ e^(−x²) dx = √π (`definite`). Level 3 decides
// « converge ? » first (trap a2_improper_exponent); level 5 uses Gauss alone
// (∫ x² e^(−x²) by parts, ∫ over ℝ³ as a product, a change of scale).

import { Q } from '../../math/rational.js';
import { MT, linesItem, mcq, examTag, A2_KEYS, H, E, modeOf, partsScript, tpl } from './a2-kit.js';
import { q, cn, ctext, fr, jacJudge, DEF, defText, vfItem } from './analyse2-g-kit.js';

const SK = 'a2-improper-multi';
const ALPHAS = [q(1), q(3, 2), q(2), q(5, 2), q(3), q(4)];

// r^p as text: 1, r, r^2, r^(-1), r^(1/2).
const rp = (p, v = 'r') => (p.n === 0 ? '1' : p.eq(1) ? v : p.d === 1 && p.n > 0 ? `${v}^${p.n}` : `${v}^(${p})`);
// The norm to the power −α in x, y(, z).
function normPow(n, alpha) {
  const N = n === 2 ? 'x^2+y^2' : 'x^2+y^2+z^2';
  const h = alpha.mul(q(1, 2));
  if (h.eq(1)) return `1/(${N})`;
  if (h.eq(2)) return `1/(${N})^2`;
  if (h.eq(q(1, 2))) return `1/√(${N})`;
  return `(${N})^(-${h})`;
}
const nText = (n) => (n === 2 ? 'x^2+y^2' : 'x^2+y^2+z^2');
const omega = (n) => (n === 2 ? q(2) : q(4)); // the angles: 2π or 4π
const piQ = (c) => ctext(cn(c, 'π'));
// c·π as a factor of a product: 2π, (π/2).
const piFac = (c) => { const t = piQ(c); return /\//.test(t) ? `(${t})` : t; };

// ---------- data ----------
// {kind: 'out' | 'in', n, alpha} or a whole-space kind: rat (k), gauss, rexp.
function draw(rng, { power = false } = {}) {
  const n = rng.pick([2, 3]);
  if (power || rng.next() < 0.6) {
    const kind = rng.pick(['out', 'in']);
    const alpha = rng.pick(ALPHAS);
    return { kind, n, alpha, conv: kind === 'out' ? alpha.cmp(n) > 0 : alpha.cmp(n) < 0 };
  }
  const opts = n === 2 ? [{ kind: 'rat', k: 2 }, { kind: 'rat', k: 3 }, { kind: 'gauss' }] : [{ kind: 'rat', k: 2 }, { kind: 'rexp' }];
  return { ...rng.pick(opts), n, conv: true };
}

// The parts of the computation, from the integrand on.
function plan(d) {
  const { n } = d;
  const w = omega(n);
  const sph = n === 3;
  const coords = sph ? 'sph' : 'polar';
  const ang = sph ? '×sin(θ)' : '';
  if (d.kind === 'out' || d.kind === 'in') {
    const p = q(n - 1).sub(d.alpha); // r^p after the jacobian
    const s = p.add(1);
    const out = d.kind === 'out';
    const v = out ? 'R' : 'ε';
    const [lo, hi] = out ? ['1', 'R'] : ['ε', '1'];
    const cart = normPow(n, d.alpha);
    const F = `${rp(p)}${ang}`.replace(/^1×/, '');
    const G = rp(p);
    let prim; let goal; let value;
    if (s.n === 0) {
      prim = 'ln(r)';
      goal = out ? `${piQ(w)}×ln(R)` : `-${piQ(w)}×ln(ε)`;
      value = '+∞';
    } else {
      const c1 = q(1).div(s);
      const ct = c1.eq(1) ? '' : c1.eq(-1) ? '-' : c1.d === 1 ? String(c1.n) : `${c1.n < 0 ? '-' : ''}(${c1.n < 0 ? c1.neg() : c1})`;
      prim = `${ct}${rp(s)}`;
      const c = w.div(s.n < 0 ? s.neg() : s); // > 0
      const pw = rp(s, v);
      // out: (R^s − 1)/s ; in: (1 − ε^s)/s
      goal = out ? (s.n < 0 ? `${piFac(c)}×(1-${pw})` : `${piFac(c)}×(${pw}-1)`) : (s.n > 0 ? `${piFac(c)}×(1-${pw})` : `${piFac(c)}×(${pw}-1)`);
      value = d.conv ? piQ(c) : '+∞';
    }
    return { coords, cart, F, G, prim, goal, value, v, lo, hi, w, region: out ? `${nText(n)} ≥ 1` : `0 < ${nText(n)} ≤ 1`, dom: out ? [1.5, 6] : [0.05, 0.9] };
  }
  const base = { coords, v: 'R', lo: '0', hi: 'R', w, region: n === 2 ? 'ℝ²' : 'ℝ³', dom: [0.5, 3], whole: true };
  if (d.kind === 'rat' && n === 2) {
    const k = d.k;
    return { ...base, cart: `1/(1+${nText(n)})^${k}`, F: `r/(1+r^2)^${k}`, G: `r/(1+r^2)^${k}`, prim: `-1/(${2 * (k - 1)}(1+r^2)^${k - 1})`.replace('^1)', ')'),
      goal: k === 2 ? 'π×(1-1/(1+R^2))' : '(π/2)×(1-1/(1+R^2)^2)', value: k === 2 ? 'π' : 'π/2' };
  }
  if (d.kind === 'rat') {
    return { ...base, cart: `1/(1+${nText(n)})^2`, F: 'r^2×sin(θ)/(1+r^2)^2', G: 'r^2/(1+r^2)^2', prim: '(arctan(r)-r/(1+r^2))/2', goal: '2π×(arctan(R)-R/(1+R^2))', value: 'π^2' };
  }
  if (d.kind === 'gauss') {
    return { ...base, cart: `e^(-(${nText(n)}))`, F: 'r×e^(-r^2)', G: 'r×e^(-r^2)', prim: '-e^(-r^2)/2', goal: 'π×(1-e^(-R^2))', value: 'π', gauss: true };
  }
  return { ...base, cart: `√(${nText(n)})×e^(-(${nText(n)}))`, F: 'r^3×sin(θ)×e^(-r^2)', G: 'r^3×e^(-r^2)', prim: '-(r^2+1)×e^(-r^2)/2', goal: '2π×(1-(1+R^2)×e^(-R^2))', value: '2π' };
}

const SUB = [
  { id: 'polar', label: 'polaires, jacobien r', skill: 'a2-polar-int' },
  { id: 'sph', label: 'sphériques, jacobien r² sin θ', skill: 'a2-cyl-sph' },
  { id: 'compute', label: 'intégrale sur la boule B_R', skill: 'a1-improper-calc' },
  { id: 'limit', label: 'limite R → ∞ (ou ε → 0)', skill: 'a1-improper-calc' },
  { id: 'verdict', label: 'converge ou diverge selon α et n', skill: SK },
  { id: 'gauss', label: 'intégrale de Gauss', skill: SK },
];
const CHOICES = [
  { id: 'jac', label: 'Passer en polaires ou en sphériques, avec le jacobien' },
  { id: 'sep', label: 'Les angles donnent un facteur constant' },
  { id: 'prim', label: 'Primitive en r' },
  { id: 'eval', label: 'Évaluer entre les bornes' },
  { id: 'lim', label: 'Faire tendre R → ∞ (ou ε → 0)' },
  { id: 'gauss', label: 'Prendre la racine : (∫ e^(−x²) dx)² = π' },
  { id: 'dim1', label: 'Conclure avec la règle de dimension 1 (α > 1)', rule: 'a2_improper_exponent', why: 'En dimension n, le jacobien ajoute rⁿ⁻¹ : le seuil est n, pas 1.' },
];

function verdictDecision(d) {
  const dim1 = d.kind === 'out' ? d.alpha.cmp(1) > 0 : d.alpha.cmp(1) < 0;
  const misled = dim1 !== d.conv;
  const why = `En dimension ${d.n}, le jacobien ajoute r^${d.n - 1} : on intègre r^(${d.n - 1} − α) = ${fr(rp(q(d.n - 1).sub(d.alpha)))}. ${d.kind === 'out' ? `Loin de 0, il faut α > ${d.n}` : `Près de 0, il faut α < ${d.n}`} ; ici α = ${d.alpha}.`;
  return {
    kind: 'decision', prompt: `Avant de calculer : l'intégrale converge-t-elle ? (α = ${d.alpha}, n = ${d.n})`, options: [
      { id: 'conv', label: 'Elle converge', valid: d.conv, why, ...(!d.conv && misled ? { rule: 'a2_improper_exponent' } : {}) },
      { id: 'div', label: 'Elle diverge', valid: !d.conv, why, ...(d.conv && misled ? { rule: 'a2_improper_exponent' } : {}) },
    ],
  };
}

function parts(d, level) {
  const P = plan(d);
  const { n } = d;
  const jac = jacJudge(P.coords, P.cart, { rMax: 3 });
  let jl = E(P.F, n === 2 ? 'dx dy = r dr dφ' : 'dV = r² sin θ dr dθ dφ', n === 2 ? 'polar' : 'sph', 'jac');
  const integrand = { html: `Écris l'intégrande en ${n === 2 ? 'polaires' : 'sphériques'}, jacobien compris :`, ask: n === 2 ? 'f·r =' : 'f·r² sin θ =', start: P.cart, judge: jac, lines: [jl] };
  const V = P.v;
  const eqR = { kind: 'equiv', vars: [V], domain: { [V]: P.dom }, target: 'no-int' };
  const angNote = n === 2 ? 'Rien ne dépend de φ : ∫₀^{2π} dφ = 2π.' : 'Les angles donnent ∫₀^{2π} dφ · ∫₀^π sin θ dθ = 2π · 2 = 4π.';
  const wT = piQ(P.w);
  const start = n === 2 ? `int(int(${P.G},r,${P.lo},${P.hi}),φ,0,2π)` : `4π×int(${P.G},r,${P.lo},${P.hi})`;
  const clines = [];
  if (n === 2) clines.push(E(`2π×int(${P.G},r,${P.lo},${P.hi})`, angNote, 'compute', 'sep'));
  clines.push(E(`${wT}×bracket(${P.prim},r,${P.lo},${P.hi})`, 'Primitive en r', 'compute', 'prim'));
  clines.push(E(P.goal, 'Évaluer entre les bornes', 'compute', 'eval'));
  if (level === 1) clines[clines.length - 2] = { ...clines[clines.length - 2], ...tpl(clines[clines.length - 2].math, [P.prim], { vars: [V] }) };
  const where = d.kind === 'in' ? `On intègre sur ε ≤ ‖x‖ ≤ 1${n === 3 ? ' (en sphériques)' : ''} :` : `On intègre sur la boule B_R${d.kind === 'out' ? ' privée de B_1' : ''} :`;
  const compute = { html: where, ask: 'I(' + V + ') =', start, judge: eqR, lines: clines, pre: n === 3 ? [{ kind: 'note', html: angNote }] : [] };
  const to = V === 'R' ? '+∞' : '0';
  const lim = { kind: 'limit', v: V, to, ...(V === 'ε' ? { dir: '+' } : {}) };
  const llines = [E(P.value, P.value === '+∞' ? 'La limite est infinie : l\'intégrale diverge.' : `${V} → ${to === '0' ? '0⁺' : '+∞'}`, 'limit', 'lim')];
  if (level === 1) llines[0] = { ...llines[0], ...tpl(P.value, [P.value], {}) };
  const limit = { html: `Fais tendre ${V} → ${V === 'R' ? '+∞' : '0⁺'} :`, ask: 'I =', start: P.goal, judge: lim, lines: llines };
  const out = level === 1 ? [compute, limit] : [integrand, compute, limit];
  if (P.gauss && level >= 2) {
    out.push({ html: 'Or ∬ e^(−(x² + y²)) dx dy = (∫ e^(−x²) dx)·(∫ e^(−y²) dy). Déduis-en ∫_ℝ e^(−x²) dx :', ask: '∫ e^(−x²) dx =', start: 'int(e^(-x^2),x,-∞,∞)', judge: DEF(),
      lines: [E('√π', 'Son carré vaut π, et elle est positive', 'gauss', 'gauss')] });
  }
  return { P, parts: out };
}

const nameOf = (d, P) => {
  if (d.kind === 'out') return `∫<sub>‖x‖ ≥ 1</sub> ${MT(P.cart, { vars: ['x', 'y', 'z'] })} d${d.n === 2 ? 'x dy' : 'V'} (dans ℝ${d.n === 2 ? '²' : '³'})`;
  if (d.kind === 'in') return `∫<sub>0 &lt; ‖x‖ ≤ 1</sub> ${MT(P.cart, { vars: ['x', 'y', 'z'] })} d${d.n === 2 ? 'x dy' : 'V'} (dans ℝ${d.n === 2 ? '²' : '³'})`;
  return `∫<sub>ℝ${d.n === 2 ? '²' : '³'}</sub> ${MT(P.cart, { vars: ['x', 'y', 'z'] })} d${d.n === 2 ? 'x dy' : 'V'}`;
};

export function improperMulti(level, rng, opts = {}) {
  if (opts.exam === 'tf') return impTf(rng);
  if (opts.exam === 'mcq') return impMcq(rng, opts);
  if (level === 5) return gaussAlone(rng, opts);
  const d = draw(rng, { power: level === 3 });
  const { P, parts: ps } = parts(d, level);
  if (level === 3 || (level === 2 && (d.kind === 'out' || d.kind === 'in'))) ps[0].pre = [verdictDecision(d), ...(ps[0].pre || [])];
  const { start, judge, script } = partsScript(ps, level, CHOICES);
  const given = level === 1 ? ` En ${d.n === 2 ? 'polaires, f·r' : 'sphériques, f·r² sin θ'} = ${MT(P.F, { vars: ['r', 'θ', 'φ'] })}.` : '';
  return linesItem({
    skill: SK, level, mode: modeOf(level), start, judge, script,
    prompt: `Étudie ${nameOf(d, P)} : intègre sur ${d.kind === 'in' ? 'ε ≤ ‖x‖ ≤ 1, puis fais ε → 0⁺' : 'la boule B_R, puis fais R → +∞'}.${given}`,
    hints: H(`Intègre sur ${d.kind === 'in' ? 'ε ≤ r ≤ 1' : 'la boule de rayon R'} en ${d.n === 2 ? 'polaires' : 'sphériques'}, puis prends la limite.`,
      `I = ${MT(P.goal, { vars: [P.v] })} ; reste la limite.`,
      `${MT(P.F, { vars: ['r', 'θ', 'φ'] })} ; les angles donnent ${piQ(P.w)}.`),
    subgoals: SUB, keys: A2_KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SK}:${level}:${d.kind}:${d.n}:${d.alpha ?? d.k ?? ''}`, exam: examTag(opts),
  });
}

// ---------- level 5: Gauss alone ----------
const ALONE = [
  { id: 'x2', prompt: 'Sachant que ∫_ℝ e^(−x²) dx = √π, calcule ∫_ℝ x² e^(−x²) dx (par parties).', start: 'int(x^2×e^(-x^2),x,-∞,∞)',
    lines: [['bracket(-x×e^(-x^2)/2,x,-∞,∞)+int(e^(-x^2),x,-∞,∞)/2', 'u = x, v′ = x e^(−x²), v = −e^(−x²)/2'], ['√π/2', 'Le crochet est nul ; Gauss']] },
  { id: 'x2half', prompt: 'Sachant que ∫_ℝ e^(−x²) dx = √π, calcule ∫₀^∞ x² e^(−x²) dx.', start: 'int(x^2×e^(-x^2),x,0,∞)',
    lines: [['bracket(-x×e^(-x^2)/2,x,0,∞)+int(e^(-x^2),x,0,∞)/2', 'Par parties'], ['√π/4', '∫₀^∞ e^(−x²) dx = √π/2 (fonction paire)']] },
  { id: 'R3', prompt: 'Calcule ∭_{ℝ³} e^(−(x² + y² + z²)) dx dy dz à l\'aide de l\'intégrale de Gauss.', start: 'int(int(int(e^(-(x^2+y^2+z^2)),x,-∞,∞),y,-∞,∞),z,-∞,∞)', known: 'π√π',
    lines: [['int(e^(-x^2),x,-∞,∞)×int(e^(-y^2),y,-∞,∞)×int(e^(-z^2),z,-∞,∞)', 'e^(−x²−y²−z²) = e^(−x²)e^(−y²)e^(−z²) : produit'], ['π√π', '(√π)³']] },
  { id: 'scale', prompt: 'Sachant que ∫_ℝ e^(−x²) dx = √π, calcule ∫_ℝ e^(−4x²) dx.', start: 'int(e^(-4x^2),x,-∞,∞)',
    lines: [['int(e^(-u^2),u,-∞,∞)/2', 'u = 2x, dx = du/2'], ['√π/2', 'Gauss']] },
  { id: 'shift', prompt: 'Sachant que ∫_ℝ e^(−x²) dx = √π, calcule ∫_ℝ e^(−x² + 2x) dx.', start: 'int(e^(-x^2+2x),x,-∞,∞)',
    lines: [['e×int(e^(-(x-1)^2),x,-∞,∞)', '−x² + 2x = 1 − (x − 1)²'], ['e×int(e^(-u^2),u,-∞,∞)', 'u = x − 1'], ['e√π', 'Gauss']] },
  { id: 'R2', prompt: 'Calcule ∬_{ℝ²} (x² + y²) e^(−(x² + y²)) dx dy.', start: 'int(int((x^2+y^2)×e^(-(x^2+y^2)),x,-∞,∞),y,-∞,∞)', known: 'π',
    lines: [['int(int(r^3×e^(-r^2),r,0,∞),φ,0,2π)', 'En polaires, avec le jacobien r'], ['2π×int(r^3×e^(-r^2),r,0,∞)', 'Les angles donnent 2π'], ['2π×bracket(-(r^2+1)×e^(-r^2)/2,r,0,∞)', 'Par parties (ou t = r²)'], ['π', 'Évaluer']] },
];
function gaussAlone(rng, opts) {
  const t = rng.pick(ALONE);
  const judge = t.known ? defText(t.start, t.known) : DEF();
  return linesItem({
    skill: SK, level: 5, mode: 'free', start: t.start, judge,
    script: t.lines.map(([m, note], i) => E(m, note, i === t.lines.length - 1 ? 'gauss' : 'compute', 'x')),
    prompt: t.prompt, hints: [], noHints: true, subgoals: SUB, keys: A2_KEYS,
    key: `${SK}:5:${t.id}`, exam: examTag(opts),
  });
}

// ---------- exam variants ----------
const DIM1 = (d) => (d.kind === 'out' ? d.alpha.cmp(1) > 0 : d.alpha.cmp(1) < 0);
function impMcq(rng, opts) {
  if (rng.next() < 0.35) {
    const two = rng.next() < 0.5;
    const options = two
      ? [{ html: MT('π'), correct: true }, { html: MT('√π'), correct: false, rule: 'a2_gauss_sqrt' }, { html: MT('π√π'), correct: false, rule: 'a2_jacobian_forgot' }, { html: MT('π/2'), correct: false, rule: 'a2_gauss_sqrt' }]
      : [{ html: MT('√π'), correct: true }, { html: MT('π'), correct: false, rule: 'a2_gauss_sqrt' }, { html: MT('√π/2'), correct: false, rule: 'a2_gauss_sqrt' }, { html: MT('2√π'), correct: false, rule: 'a2_gauss_sqrt' }];
    return mcq({
      skill: SK, level: 4, prompt: two ? '∬<sub>ℝ²</sub> e^(−(x² + y²)) dx dy vaut :' : '∫<sub>ℝ</sub> e^(−x²) dx vaut :', options,
      solution: [{ html: 'En polaires : 2π·∫₀^∞ r e^(−r²) dr = 2π·(1/2) = π ; c\'est le carré de ∫_ℝ e^(−x²) dx, qui vaut donc √π.', note: '' }],
      key: `mcq:gauss:${two}`, exam: examTag(opts, 3),
    }, rng);
  }
  const d = draw(rng, { power: true });
  const P = plan(d);
  const w = omega(d.n);
  const val = (c) => MT(piQ(c));
  const right = d.conv ? val(w.div(d.kind === 'out' ? d.alpha.sub(d.n) : q(d.n).sub(d.alpha))) : 'diverge';
  const options = [{ html: right, correct: true }];
  const add = (html, rule) => { if (html && !options.some((o) => o.html === html) && options.length < 4) options.push({ html, correct: false, rule }); };
  // Without the jacobian: the rule of dimension 1, ∫ r^(−α) dr.
  const one = d.kind === 'out' ? d.alpha.sub(1) : q(1).sub(d.alpha);
  add(one.n > 0 ? val(w.div(one)) : 'diverge', 'a2_jacobian_forgot');
  add(d.conv ? 'diverge' : (DIM1(d) ? val(w.div(one.n > 0 ? one : q(1))) : null), 'a2_improper_exponent');
  // The formula used without checking: ω/(α − n) or ω/(n − α), sign included.
  const blind = d.kind === 'out' ? d.alpha.sub(d.n) : q(d.n).sub(d.alpha);
  if (blind.n !== 0) add(val(w.div(blind)), 'a2_improper_exponent');
  add(d.conv ? val(w.div(d.kind === 'out' ? d.alpha.sub(d.n) : q(d.n).sub(d.alpha)).mul(2)) : val(w), 'a2_jacobian_forgot');
  add(val(w.mul(3)), 'a2_jacobian_forgot');
  return mcq({
    skill: SK, level: 4, prompt: `${nameOf(d, P)} :`, options,
    solution: [{ html: `Le jacobien donne r^${d.n - 1} : on intègre ${MT(rp(q(d.n - 1).sub(d.alpha)))} ; ${d.kind === 'out' ? `converge ssi α > ${d.n}` : `converge ssi α < ${d.n}`} (α = ${d.alpha}).`, note: '' }],
    key: `mcq:${d.kind}:${d.n}:${d.alpha}`, exam: examTag(opts, 3),
  }, rng);
}

function impTf(rng) {
  const d = draw(rng, { power: true });
  const P = plan(d);
  const misled = DIM1(d) !== d.conv;
  const ball = d.kind === 'out' ? '‖x‖ ≥ 1' : '0 &lt; ‖x‖ ≤ 1';
  return vfItem(mcq, {
    skill: SK, statement: `Dans ℝ${d.n === 2 ? '²' : '³'}, ∫<sub>${ball}</sub> ${MT(P.cart, { vars: ['x', 'y', 'z'] })} converge.`,
    truth: d.conv, rule: misled ? 'a2_improper_exponent' : null,
    why: `Le jacobien ajoute r^${d.n - 1} : on intègre r^(${d.n - 1} − α) avec α = ${d.alpha}. ${d.kind === 'out' ? `Loin de 0, il faut α > ${d.n}` : `Près de 0, il faut α < ${d.n}`} : l'intégrale ${d.conv ? 'converge' : 'diverge'}.`,
    key: `${d.kind}:${d.n}:${d.alpha}`,
  }, rng);
}
