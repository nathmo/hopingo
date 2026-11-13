// f-periodic-ode and f-sturm-liouville (module F, part a, step U10).
// Catalogue docs/universite/VCF-analyse-3-4.md.
//
// f-periodic-ode: the 2π-periodic solution u = Σ cₙe^(int) of L(u) = f,
// L ∈ {u′ + au, u″ + ku, u′ + b·u(t − π) (the delay multiplies cₙ by
// (−1)ⁿ)}, f = c₀ + A cos(mt) + B sin(mt) (+ a second frequency at level 5).
// Each coefficient is a part of the judge `fcomplex` with `expect`
// (cₘ(f), cₘ(u) = cₘ(f)/P(m), c₀(u)); the solution is assembled from
// c₀ + cₘe^(imt) + c₋ₘe^(−imt) and must end real (form 'realfn').
//
// f-sturm-liouville (GM): −u″ = λu on ]0 ; L[ with Dirichlet or Neumann
// conditions at each end. The cases λ < 0, λ = 0, λ > 0 and the condition
// at the ends are decisions (f_sl_eigen_zero on λ = 0); λₙ is a `prob` part
// with expect, in n; uₙ a part of the judge `eigen` (equation and boundary
// conditions checked for n = n₀ … n₀ + 5, any nonzero multiple). Level 5
// adds −u″ = f solved on the eigenfunctions (`ode` with u(0), u′(0)).

import { MT, H, q, fr, build, CKEYS, KEYS } from './fourier-a-kit.js';
import { examTag } from './kit.js';
import { cT } from './fourier-a-complex.js';
import { t } from '../../i18n.js';

// ---------- ℚ(i) ----------

const Z = (re, im = 0) => ({ re: q(re), im: q(im) });
const zmul = (a, b) => Z(a.re.mul(b.re).sub(a.im.mul(b.im)), a.re.mul(b.im).add(a.im.mul(b.re)));
const zdiv = (a, b) => { const d = b.re.mul(b.re).add(b.im.mul(b.im)); return Z(a.re.mul(b.re).add(a.im.mul(b.im)).div(d), a.im.mul(b.re).sub(a.re.mul(b.im)).div(d)); };
const zconj = (a) => Z(a.re, a.im.neg());
const zt = (a) => cT(a.re, a.im);
const zpar = (a) => { const tt = zt(a); return /^[0-9]+$/.test(tt) ? tt : `(${tt})`; };
const zero = (a) => a.re.n === 0 && a.im.n === 0;

// ---------- f-periodic-ode ----------

const SKO = 'f-periodic-ode';
const SUBO = [
  { id: 'relation', label: t('cₙ de l\'équation'), skill: SKO },
  { id: 'coefficients', label: 'cₙ(u) = cₙ(f)/P(n)', skill: SKO },
  { id: 'assemble', label: t('u réelle'), skill: SKO },
];
const CHO = [
  { id: 'read', label: t('Lire cₘ(f) = (A − iB)/2') },
  { id: 'divide', label: t('Diviser : cₙ(u) = cₙ(f)/P(n)') },
  { id: 'calc', label: t('Calculer (multiplier par le conjugué)') },
  { id: 'real', label: t('Regrouper e^(imt) et e^(−imt) en cos et sin') },
  { id: 'nophase', label: t('Le retard ne change pas cₙ'), rule: 'f_ode_shift_phase', why: t('u(t − π) a pour coefficients e^(−inπ)cₙ = (−1)ⁿcₙ.') },
];

function odeData(rng, level) {
  for (let i = 0; i < 200; i++) {
    const kind = level === 4 || level === 5 ? rng.pick(['delay', 'delay', 'first', 'second']) : rng.pick(['first', 'second', 'delay']);
    const a = rng.pick([1, 2, 3]);
    const k = rng.pick([2, 3, 5, 6, 8]);
    const m = kind === 'delay' ? rng.pick([1, 3, 5]) : rng.pick([1, 2, 3, 6]);
    if (kind === 'second' && k === m * m) continue;
    const A = rng.pick([0, 1, 2, 4]);
    const B = rng.pick([0, 1, 2, 4]);
    if (A === 0 && B === 0) continue;
    const c0 = rng.pick([0, 1, 2]);
    const P = (n) => (kind === 'first' ? Z(a, n) : kind === 'second' ? Z(k - n * n) : Z(a * (n % 2 ? -1 : 1), n));
    const Pwrong = (n) => Z(a, n); // delay without (−1)ⁿ
    const lhs = kind === 'first' ? `u'+${a === 1 ? '' : a}u` : kind === 'second' ? `u''+${k}u` : `u'+${a === 1 ? '' : a}u(t-π)`;
    const lhsShow = kind === 'first' ? `u′ + ${a === 1 ? '' : a}u` : kind === 'second' ? `u″ + ${k}u` : `u′(t) + ${a === 1 ? '' : a}u(t − π)`;
    const Pshow = kind === 'first' ? `in + ${a}` : kind === 'second' ? `${k} − n²` : `in + ${a === 1 ? '' : a}(−1)ⁿ`;
    return { kind, a, k, m, A, B, c0, P, Pwrong, lhs, lhsShow, Pshow };
  }
  return { kind: 'first', a: 1, k: 2, m: 1, A: 0, B: 1, c0: 0, P: (n) => Z(1, n), Pwrong: (n) => Z(1, n), lhs: "u'+u", lhsShow: 'u′ + u', Pshow: 'in + 1', fallback: true };
}

const trigT = (A, B, m, v = 't') => {
  const mt = `${m === 1 ? '' : m}${v}`;
  const parts = [];
  if (A) parts.push(`${A === 1 ? '' : A}cos(${mt})`);
  if (B) parts.push(`${B === 1 ? '' : B}sin(${mt})`);
  return parts.join('+');
};

function odeItem(level, rng, opts) {
  const d = odeData(rng, level);
  const fT = [d.c0 ? String(d.c0) : '', trigT(d.A, d.B, d.m)].filter(Boolean).join('+');
  const cf = Z(q(d.A, 2), q(-d.B, 2)); // cₘ(f) = (A − iB)/2
  const Pm = d.P(d.m);
  const cu = zdiv(cf, Pm);
  const c0u = d.c0 ? zdiv(Z(d.c0), d.P(0)) : null;
  const s = ['₀', '₁', '₂', '₃', '₄', '₅', '₆'][d.m];
  const parts = [];
  // cₘ(f).
  const both = d.A && d.B;
  parts.push({
    html: t('Les coefficients de f : cₘ = (aₘ − ibₘ)/2.'), ask: `c${s}(f) =`, start: `c_${d.m}`,
    judge: { kind: 'fcomplex', expect: zt(cf), form: 'algebraic', complex: true, traps: { f_coef_complex_convert: [zt(zconj(cf))] } },
    pre: [],
    lines: [
      ...(both ? [{ math: `(${d.A}-${d.B === 1 ? '' : d.B}i)/2`, note: '(aₘ − ibₘ)/2', subgoal: 'relation', act: 'read' }] : []),
      { math: zt(cf), note: both ? '' : d.B ? `${d.B} sin = ${d.B}(e^(i…) − e^(−i…))/(2i)` : `${d.A} cos = ${d.A}(e^(i…) + e^(−i…))/2`, subgoal: 'relation', act: 'read', blank: [zt(cf)] },
    ],
  });
  // cₘ(u) = cₘ(f)/P(m).
  const PmT = zt(Pm);
  const traps = d.kind === 'delay' ? { f_ode_shift_phase: [zt(zdiv(cf, d.Pwrong(d.m)))] } : {};
  parts.push({
    html: t('Coefficient par coefficient : P(n)·cₙ(u) = cₙ(f), avec P(n) = {Pshow}.', { Pshow: d.Pshow }), ask: `c${s}(u) =`, start: `c_${d.m}`,
    judge: { kind: 'fcomplex', expect: zt(cu), form: 'algebraic', complex: true, traps },
    lines: [
      { math: `${zpar(cf)}/${zpar(Pm)}`, note: `c${s}(f)/P(${d.m})`, subgoal: 'coefficients', act: 'divide', blank: [zpar(Pm)] },
      { math: zt(cu), note: t('Multiplier par le conjugué'), subgoal: 'coefficients', act: 'calc', blank2: [zt(cu)] },
    ],
  });
  if (c0u) {
    parts.push({
      html: t('Et le terme constant : c₀(u) = c₀(f)/P(0).'), ask: 'c₀(u) =', start: 'c_0',
      judge: { kind: 'fcomplex', expect: zt(c0u), form: 'algebraic', complex: true },
      lines: [{ math: zt(c0u), note: `${d.c0}/P(0)`, subgoal: 'coefficients', act: 'divide', blank: [zt(c0u)] }],
    });
  }
  // u real.
  const alpha = cu.re.mul(2);
  const beta = cu.im.mul(-2);
  const mt = `${d.m === 1 ? '' : d.m}t`;
  const coefT = (c, body) => (c.n === 0 ? '' : c.eq(1) ? body : c.eq(-1) ? `-${body}` : c.d === 1 ? `${c}${body}` : `${c.n < 0 ? '-' : ''}(${Math.abs(c.n)}/${c.d})${body}`);
  const uReal = [c0u ? zt(c0u) : '', coefT(alpha, `cos(${mt})`), coefT(beta, `sin(${mt})`)].filter(Boolean).join('+').replace(/\+-/g, '-') || '0';
  const uStart = `${c0u ? `${zt(c0u)}+` : ''}${zpar(cu)}e^(${d.m === 1 ? '' : d.m}i t)+${zpar(zconj(cu))}e^(-${d.m === 1 ? '' : d.m}i t)`.replace(/\+\(-/g, '+(-');
  parts.push({
    html: t('La solution 2π-périodique, u = Σ cₙ(u)e^(int), écrite avec des fonctions réelles :'), ask: 'u(t) =', start: uStart,
    judge: { kind: 'fcomplex', vars: ['t'], form: 'realfn', complex: true },
    lines: [{ math: uReal, note: 'cₘe^(imt) + c₋ₘe^(−imt) = 2Re(cₘ)cos(mt) − 2Im(cₘ)sin(mt)', subgoal: 'assemble', act: 'real', blank: [uReal] }],
  });
  // Decisions: the delay, and the form.
  const dec = d.kind === 'delay'
    ? { kind: 'decision', prompt: t('Les coefficients de u(t − π) ?'), options: [
      { id: 'ok', label: 'e^(−inπ)cₙ = (−1)ⁿcₙ', valid: true },
      { id: 'same', label: t('cₙ : décaler ne change pas les coefficients'), valid: false, rule: 'f_ode_shift_phase', why: t('u(t − π) = Σ cₙe^(in(t − π)) = Σ (e^(−inπ)cₙ)e^(int) : le coefficient est multiplié par (−1)ⁿ.') },
      { id: 'neg', label: '−cₙ', valid: false, why: t('e^(−inπ) = (−1)ⁿ dépend de la parité de n.') },
    ] }
    : { kind: 'decision', prompt: t('Les coefficients de {a} ?', { a: d.kind === 'first' ? 'u′' : 'u″' }), options: [
      { id: 'ok', label: d.kind === 'first' ? 'in·cₙ' : '−n²·cₙ', valid: true },
      { id: 'n', label: d.kind === 'first' ? 'n·cₙ' : 'n²·cₙ', valid: false, why: d.kind === 'first' ? t('(e^(int))′ = in·e^(int) : le facteur est in.') : '(e^(int))″ = (in)²e^(int) = −n²e^(int).' },
    ] };
  const form = { kind: 'decision', prompt: t('Quelle forme pour u ?'), levels: [3], options: [
    { id: 'c', label: t('Complexe : u = Σ cₙe^(int), un coefficient à la fois'), valid: true },
    { id: 'r', label: t('Réelle : u = a₀/2 + Σ (aₙcos(nt) + bₙsin(nt))'), valid: true, quality: 'poor', why: t('Juste aussi, mais u′ mélange aₙ et bₙ : on résout un système 2 × 2 par fréquence. En complexe, chaque cₙ est seul.') },
  ] };
  parts[0].pre = level === 1 ? [{ kind: 'note', html: t('Coefficients de l\'équation : P(n)·cₙ(u) = cₙ(f), P(n) = {Pshow}.', { Pshow: d.Pshow }) }] : [form, dec];
  return build({
    skill: SKO, level, parts, subgoals: SUBO, keys: CKEYS, choices: CHO,
    prompt: t('Trouve la solution 2π-périodique u de {lhsShow} = {fT}, en cherchant u = Σ cₙe^(int).', { lhsShow: d.lhsShow, fT: MT(fT) }),
    hints: H(d.kind === 'delay' ? t('Le retard de π multiplie cₙ par e^(−inπ) = (−1)ⁿ.') : t('Dériver multiplie cₙ par in.'), `(${PmT})c${s}(u) = ${MT(zt(cf), { complex: true })}`, `c${s}(u) = ${MT(zt(cu), { complex: true })}`),
    key: `${SKO}:${level}:${d.kind}:${d.a}:${d.k}:${d.m}:${d.A}:${d.B}:${d.c0}`, exam: examTag(opts, 4), fallback: d.fallback,
  });
}

// ---------- f-sturm-liouville ----------

const SKS = 'f-sturm-liouville';
const SUBS = [
  { id: 'cases', label: t('λ < 0 et λ = 0'), skill: SKS },
  { id: 'general', label: 'λ = k² > 0', skill: SKS },
  { id: 'condition', label: t('les conditions aux bords'), skill: SKS },
  { id: 'eigen', label: t('λₙ et uₙ'), skill: SKS },
];
const CHS = [
  { id: 'lambda', label: t('Écrire λₙ = kₙ²') },
  { id: 'eigen', label: t('Écrire uₙ') },
  { id: 'solve', label: t('Diviser chaque coefficient par λₙ') },
];

// bc: 'DD' | 'DN' | 'ND' | 'NN' ; L: 'π' | 1 | 2.
function slData(bc, L) {
  const half = bc === 'DN' || bc === 'ND';
  const Lt = L === 'π' ? 'π' : String(L);
  const w = L === 'π' ? '' : L === 1 ? 'π' : 'π/2';
  const kT = half ? '(n+1/2)' : 'n';
  const kShow = half ? '(n + ½)' : 'n';
  const lam = w ? `(${kT}${w === 'π' ? 'π' : 'π/2'})^2` : `${kT}^2`;
  const arg = w ? `${kT}${w === 'π' ? 'π' : 'π'}x${w === 'π/2' ? '/2' : ''}` : `${kT}x`;
  const fn = bc[0] === 'D' ? 'sin' : 'cos';
  const nFrom = bc === 'DD' ? 1 : 0;
  const cond = {
    DD: { at0: t('u(0) = 0 donne A = 0'), atL: `u(${Lt}) = B sin(k${Lt}) = 0`, eq: `sin(k${Lt}) = 0`, wrong: `cos(k${Lt}) = 0` },
    DN: { at0: t('u(0) = 0 donne A = 0'), atL: `u′(${Lt}) = Bk cos(k${Lt}) = 0`, eq: `cos(k${Lt}) = 0`, wrong: `sin(k${Lt}) = 0` },
    ND: { at0: t('u′(0) = 0 donne B = 0'), atL: `u(${Lt}) = A cos(k${Lt}) = 0`, eq: `cos(k${Lt}) = 0`, wrong: `sin(k${Lt}) = 0` },
    NN: { at0: t('u′(0) = 0 donne B = 0'), atL: `u′(${Lt}) = −Ak sin(k${Lt}) = 0`, eq: `sin(k${Lt}) = 0`, wrong: `cos(k${Lt}) = 0` },
  }[bc];
  const name = { D: 'u', N: 'u′' };
  return {
    bc, L, Lt, lam, u: `${fn}(${arg})`, nFrom, cond, half, kShow,
    bcShow: `${name[bc[0]]}(0) = 0, ${name[bc[1]]}(${Lt}) = 0`,
    zeroEigen: bc === 'NN',
  };
}

function slDecisions(d) {
  const zero = d.zeroEigen
    ? [
      { id: 'yes', label: t('u = A (constante) convient : λ₀ = 0 est valeur propre, u₀ = 1'), valid: true },
      { id: 'no', label: t('A = B = 0 : λ = 0 n\'est pas valeur propre'), valid: false, rule: 'f_sl_eigen_zero', why: t('u = A + Bx, u′ = B : les deux conditions de Neumann donnent seulement B = 0. La constante u = 1 est une fonction propre, pour λ₀ = 0.') },
    ]
    : [
      { id: 'no', label: t('A = B = 0 : λ = 0 n\'est pas valeur propre'), valid: true },
      { id: 'yes', label: t('λ = 0 est valeur propre'), valid: false, rule: 'f_sl_eigen_zero', why: d.bc[0] === 'D' ? t('u = A + Bx : u(0) = 0 donne A = 0, puis la condition en {Lt} donne B = 0 : u = 0.', { Lt: d.Lt }) : t('u = A + Bx : u′(0) = 0 donne B = 0, puis la condition en {Lt} donne A = 0 : u = 0.', { Lt: d.Lt }) },
    ];
  return [
    { kind: 'decision', prompt: t('λ = −μ² < 0 : u = A ch(μx) + B sh(μx). Les conditions aux bords donnent ?'), options: [
      { id: 'zero', label: t('u = 0 : pas de valeur propre négative'), valid: true },
      { id: 'some', label: t('Une solution u ≠ 0'), valid: false, why: t('ch et sh ne s\'annulent qu\'une fois au plus (sh en 0 seulement, ch jamais) : les deux conditions forcent A = B = 0.') },
    ] },
    { kind: 'decision', prompt: t('λ = 0 : u = A + Bx. Les conditions aux bords donnent ?'), options: zero },
    { kind: 'decision', prompt: t('λ = k² > 0 : quelle solution générale de u″ + k²u = 0 ?'), options: [
      { id: 'trig', label: 'u = A cos(kx) + B sin(kx)', valid: true },
      { id: 'exp', label: 'u = A e^(kx) + B e^(−kx)', valid: false, why: t('L\'équation caractéristique r² + k² = 0 a les racines ±ik : cos et sin.') },
      { id: 'double', label: 'u = (A + Bx)e^(kx)', valid: false, why: t('Ce serait une racine double réelle ; ici r = ±ik.') },
    ] },
    { kind: 'decision', prompt: t('{at0}. Puis {atL} ; comme u ≠ 0 :', { at0: d.cond.at0, atL: d.cond.atL }), options: [
      { id: 'ok', label: `${d.cond.eq} : k = ${d.half ? '(n + ½)' : 'n'}${d.L === 'π' ? '' : `π/${d.Lt}`}`, valid: true },
      { id: 'wrong', label: `${d.cond.wrong}`, valid: false, why: t('La condition en {Lt} porte sur {a}.', { Lt: d.Lt, a: d.cond.eq.split('(')[0] }) },
      { id: 'coef', label: t('Le coefficient restant est nul'), valid: false, why: t('Alors u = 0, qui n\'est pas une fonction propre.') },
    ] },
  ];
}

function slItem(level, rng, opts) {
  const bc = rng.pick(['DD', 'DN', 'ND', 'NN']);
  const L = level === 4 ? rng.pick(['π', 1, 2]) : 'π';
  const d = slData(bc, L);
  const decs = slDecisions(d);
  const range = {
    kind: 'decision', prompt: t('n parcourt :'), levels: [3, 4, 5], options: [
      { id: 'ok', label: `n ≥ ${d.nFrom}`, valid: true },
      { id: 'other', label: `n ≥ ${1 - d.nFrom}`, valid: false, ...(d.bc === 'DD' || d.bc === 'NN' ? { rule: 'f_sl_eigen_zero' } : {}), why: d.bc === 'DD' ? t('n = 0 donne u₀ = sin 0 = 0 : ce n\'est pas une fonction propre (λ = 0 est exclu).') : d.bc === 'NN' ? t('n = 0 donne λ₀ = 0 et u₀ = 1 : il ne faut pas l\'oublier.') : t('n = 0 donne k = ½ : λ₀ = 1/4 est la plus petite valeur propre.') },
    ],
  };
  const parts = [
    {
      html: t('Les valeurs propres :'), ask: 'λₙ =', start: 'λ_n',
      judge: { kind: 'prob', vars: ['n'], domain: { n: { int: [d.nFrom, 40] } }, expect: d.lam, label: 'λ_n' },
      pre: [...decs, range],
      lines: [{ math: d.lam, note: 'λₙ = kₙ²', subgoal: 'eigen', act: 'lambda' }],
    },
    {
      html: t('Les fonctions propres :'), ask: 'uₙ(x) =', start: 'u_n',
      judge: { kind: 'eigen', lambda: d.lam, L: L === 'π' ? 'π' : String(L), Ltext: d.Lt, bc: [d.bc[0], d.bc[1]], nFrom: d.nFrom, v: 'x' },
      lines: [{ math: d.u, note: '', subgoal: 'eigen', act: 'eigen' }],
    },
  ];
  let prompt = t('Problème de Sturm-Liouville : trouve les λ et les u ≠ 0 tels que −u″ = λu sur ]0 ; {Lt}[, {bcShow}.', { Lt: d.Lt, bcShow: d.bcShow });
  if (level === 5 && L === 'π' && bc[0] === 'D') {
    // −u″ = f with f on the eigenfunctions: u = Σ fₙ/λₙ uₙ.
    const [p1, p2] = d.half ? [0, 1] : [1, rng.pick([2, 3])];
    const al = rng.pick([1, 2, 3]);
    const be = rng.pick([1, 2, -1]);
    const kv = (n) => (d.half ? q(2 * n + 1, 2) : q(n));
    const argT = (n) => (d.half ? (n === 0 ? 'x/2' : `${2 * n + 1}x/2`) : n === 1 ? 'x' : `${n}x`);
    const term = (c, n) => { const k = kv(n); const cc = q(c).div(k.mul(k)); return `${cc.d === 1 ? (cc.eq(1) ? '' : cc.eq(-1) ? '-' : cc) : `(${cc})`}sin(${argT(n)})`; };
    const fT = `${al === 1 ? '' : al}sin(${argT(p1)})${be < 0 ? '-' : '+'}${Math.abs(be) === 1 ? '' : Math.abs(be)}sin(${argT(p2)})`;
    const uT = `${term(al, p1)}+${term(be, p2)}`.replace('+-', '-');
    const dy = q(al).div(kv(p1)).add(q(be).div(kv(p2)));
    parts.push({
      html: t('Résous −u″ = {a} avec les mêmes conditions, en écrivant u sur les uₙ :', { a: fr(fT) }), ask: 'u(x) =', start: `-u''=${fT}`,
      judge: { kind: 'ode', eq: `-u''=${fT}`, unknown: 'u', v: 'x', order: 2, ic: { x: 0, y: 0, dy: String(dy) } },
      lines: [{ math: `u = ${uT}`, note: t('Chaque coefficient divisé par λₙ'), subgoal: 'eigen', act: 'solve' }],
    });
    prompt += t(' Puis résous −u″ = {a} avec les mêmes conditions.', { a: fr(fT) });
  }
  return build({
    skill: SKS, level, parts, subgoals: SUBS, keys: [...KEYS, 'greek'], choices: CHS,
    prompt,
    hints: H(t('Trois cas selon le signe de λ ; seul λ = k² > 0 donne des cos et des sin.'), `${d.cond.eq} ⟹ k = …`, `λₙ = ${MT(d.lam)}, uₙ = ${MT(d.u)}`),
    key: `${SKS}:${level}:${bc}:${L}`, exam: examTag(opts, level === 5 ? 6 : 5),
  });
}

export const GEN_ODE = {
  [SKO]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'open') return odeItem(4, rng, opts);
    return odeItem(level, rng, opts);
  },
  [SKS]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'open') return slItem(rng.chance(0.5) ? 5 : 4, rng, opts);
    return slItem(level, rng, opts);
  },
};
