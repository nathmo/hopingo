// Parametric arcs (module G6, part c, step U2): g6-param-tangent (speed,
// tangents, stationary points) and g6-param-branches (infinite branches).
//
// Derivatives are judged by `equiv` in t, the zeros of ẋ and ẏ by
// `solset`, the slope at a stationary point (ẏ/ẋ) and the limits at the
// ends of the domain by `limit` (flags `slope` and `ratio` let the traps
// g6_param_slope_inverted and g6_param_ratio_inverted replay ẋ/ẏ and x/y);
// a tangent or an asymptote « y = … » by `equiv`. The nature of a point or
// of a branch is a decision. The sketch is left out (no `plot` before U5).

import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { MT, fr, linesItem, mcq, examTag } from './kit.js';
import {
  q, N, RT, nz, modeOf, H, E, D, NOTE, polyText, affText, minusText, pEval, pDeriv, pAdd, pScale, atText, blanked, part,
  partsScript, usedSubgoals, distinctOptions, KEYS,
} from './analyse0-c-util.js';

const T = 't';
const tq = (r) => (r === 0 ? 't' : `(${minusText(r, T)})`);
const withBaits = (item, extra) => ({ ...item, baits: [...new Set([...item.baits, ...extra])] });
const KEYS_T = [...KEYS, 'set', 'relation'];

// ======================================================================
// g6-param-tangent
// ======================================================================

const PT = 'g6-param-tangent';
const PT_SUB = [
  { id: 'speed', label: 'vecteur vitesse', skill: 'g6-deriv-rules' },
  { id: 'zeros', label: 'zéros de ẋ et ẏ', skill: PT },
  { id: 'slope', label: 'pente limite', skill: 'g6-limits' },
  { id: 'point', label: 'coordonnées du point', skill: PT },
  { id: 'tangent', label: 'tangente', skill: 'g6-tangent' },
];
const PT_CHOICES = [
  { id: 'speed', label: 'Dériver x(t) et y(t)' },
  { id: 'zeros', label: 'Chercher les zéros de ẋ et de ẏ' },
  { id: 'slope', label: 'Pente : la limite de ẏ/ẋ' },
  { id: 'point', label: 'Calculer les coordonnées du point' },
  { id: 'tangent', label: 'Écrire la tangente y = y₀ + p(x − x₀)' },
  { id: 'inv', label: 'Pente : la limite de ẋ/ẏ', rule: 'g6_param_slope_inverted', why: 'La pente est dy/dx = ẏ/ẋ : y en haut.' },
];

// x = t³ − 3S·t² + 3pq·t (ẋ = 3(t − p)(t − q)), y = t² − 2rt or a cubic with
// ẏ = 3(t − r)(t − w); r ∈ {p, q} is the stationary point.
function ptData(rng) {
  for (let i = 0; i < 300; i++) {
    const p = rng.int(-3, 2);
    const qq = rng.int(p + 1, 3);
    if ((p + qq) % 2 || Math.abs(p * qq) > 6) continue;
    const r = rng.pick([p, qq]);
    const u = r === p ? qq : p;
    const cubic = rng.chance(0.5);
    let w = null;
    if (cubic) {
      w = rng.int(-3, 3);
      if (w === p || w === qq || (r + w) % 2) continue;
    }
    const S = (p + qq) / 2;
    // Constants move the curve, not the speed.
    const xc = [rng.int(-2, 2), 3 * p * qq, -3 * S, 1];
    const yc = cubic ? [rng.int(-2, 2), 3 * r * w, -3 * (r + w) / 2, 1] : [rng.int(-2, 2), -2 * r, 1];
    if (cubic && Math.abs(r * w) > 6) continue;
    const dx = pDeriv(xc);
    const dy = pDeriv(yc);
    const slope = cubic ? q(r - w, r - u) : q(2, 3 * (r - u));
    const xr = pEval(xc, r);
    const yr = pEval(yc, r);
    // The tangent y = y₀ + p(x − x₀) is a line to expand: x₀ ≠ 0.
    if (xr.n === 0) continue;
    return { p, q: qq, r, u, w, cubic, xc, yc, dx, dy, slope, xr, yr };
  }
  // The catalogue's example: x = t³ − 3t, y = t² − 2t.
  const xc = [0, -3, 0, 1];
  const yc = [0, -2, 1];
  return { p: -1, q: 1, r: 1, u: -1, w: null, cubic: false, xc, yc, dx: pDeriv(xc), dy: pDeriv(yc), slope: q(1, 3), xr: q(-2), yr: q(-1), fallback: true };
}

function ptParts(d, level) {
  const xt = polyText(d.xc, T);
  const yt = polyText(d.yc, T);
  const dxt = polyText(d.dx, T);
  const dyt = polyText(d.dy, T);
  const tj = { kind: 'equiv', vars: [T], dvar: T, domain: { t: [-2.5, 2.5] }, target: 'no-prime' };
  const speedX = part('Vecteur vitesse :', 'ẋ =', `d(${xt})`, tj, [E(dxt, 'Dériver x(t)', 'speed', 'speed')]);
  const speedY = part('', 'ẏ =', `d(${yt})`, tj, [E(dyt, 'Dériver y(t)', 'speed', 'speed')]);
  if (level === 2) {
    speedX.lines = [blanked(speedX.lines[0], [[String(Math.abs(d.dx[0].n || d.dx[1].n || 3)), -1]])];
  }
  const zx = `t=${d.p} ou t=${d.q}`;
  const zerosX = part('Zéros de ẋ :', 'ẋ = 0 ⇔', `${dxt}=0`, { kind: 'solset', v: T },
    [E(`3${tq(d.p)}${tq(d.q)}=0`, 'Factoriser', 'zeros', 'zeros'), E(zx, 'Produit nul', 'zeros', 'zeros')]);
  if (level === 1) zerosX.lines[0] = blanked(zerosX.lines[0], [tq(d.q).replace(/^\((.*)\)$/, '$1')]);
  const yzeros = d.cubic ? `t=${Math.min(d.r, d.w)} ou t=${Math.max(d.r, d.w)}` : `t=${d.r}`;
  const zerosY = part('Zéros de ẏ :', 'ẏ = 0 ⇔', `${dyt}=0`, { kind: 'solset', v: T },
    [E(d.cubic ? `3${tq(d.r)}${tq(d.w)}=0` : `2${tq(d.r)}=0`, 'Factoriser', 'zeros', 'zeros'), E(yzeros, 'Produit nul', 'zeros', 'zeros')]
      .filter((l) => toText(parse(l.math)) !== toText(parse(`${dyt}=0`))));
  const dyU = pEval(d.dy, d.u);
  const decisions = [
    D(`En t = ${fr(d.u)} : ẋ = 0 et ẏ = ${fr(N(dyU))} ≠ 0. La tangente en ce point est :`, [
      { id: 'vert', label: 'verticale', valid: true },
      { id: 'horiz', label: 'horizontale', valid: false, rule: 'g6_param_slope_inverted', why: 'La pente est ẏ/ẋ : ẋ = 0 au dénominateur, la pente est infinie. Tangente verticale.' },
      { id: 'stat', label: 'un point stationnaire', valid: false, why: 'Stationnaire : ẋ ET ẏ nuls. Ici ẏ ≠ 0.' },
    ]),
  ];
  if (d.cubic) {
    const dxW = pEval(d.dx, d.w);
    decisions.push(D(`En t = ${fr(d.w)} : ẏ = 0 et ẋ = ${fr(N(dxW))} ≠ 0. La tangente en ce point est :`, [
      { id: 'horiz', label: 'horizontale', valid: true },
      { id: 'vert', label: 'verticale', valid: false, rule: 'g6_param_slope_inverted', why: 'La pente est ẏ/ẋ = 0 : tangente horizontale.' },
      { id: 'stat', label: 'un point stationnaire', valid: false, why: 'Stationnaire : ẋ ET ẏ nuls. Ici ẋ ≠ 0.' },
    ]));
  }
  decisions.push(D(`En t = ${fr(d.r)} : ẋ = ẏ = 0. Ce point est :`, [
    { id: 'stat', label: 'un point stationnaire : la pente est la limite de ẏ/ẋ', valid: true },
    { id: 'vert', label: 'un point à tangente verticale', valid: false, why: 'ẋ = 0, mais ẏ aussi : 0/0, il faut une limite.' },
    { id: 'horiz', label: 'un point à tangente horizontale', valid: false, why: 'ẏ = 0, mais ẋ aussi : 0/0, il faut une limite.' },
  ]));
  const simp = d.cubic ? `${tq(d.w)}/${tq(d.u)}` : `2/(3${tq(d.u)})`;
  const slope = part(`Pente au point stationnaire t = ${fr(d.r)} : la limite de ẏ/ẋ.`, 'pente =', `(${dyt})/(${dxt})`,
    { kind: 'limit', v: T, to: String(d.r), slope: true },
    [E(simp, `Simplifier par ${RT(minusText(d.r, T))}`, 'slope', 'slope'), E(N(d.slope), `t → ${fr(d.r)}`, 'slope', 'slope')], decisions);
  const px = part(`Le point stationnaire M(${fr(d.r)}) :`, `x(${fr(d.r)}) =`, atText(xt, T, d.r), { kind: 'value' }, [E(N(d.xr), 'Calculer', 'point', 'point')]);
  const py = part('', `y(${fr(d.r)}) =`, atText(yt, T, d.r), { kind: 'value' }, [E(N(d.yr), 'Calculer', 'point', 'point')]);
  const tStart = `${d.yr.n ? `${N(d.yr)}+` : ''}(${N(d.slope)})(${minusText(d.xr)})`;
  const tangent = part(`Tangente en M(${fr(N(d.xr))} ; ${fr(N(d.yr))}), de pente ${fr(N(d.slope))} :`, 'y =', tStart, { kind: 'equiv', vars: ['x'], target: 'expanded' },
    [E(affText(d.slope, d.yr.sub(d.slope.mul(d.xr))), 'Développer', 'tangent', 'tangent')]);
  return { xt, yt, dxt, dyt, speedX, speedY, zerosX, zerosY, slope, px, py, tangent };
}

function ptItem(level, rng, opts = {}) {
  if (opts.exam === 'mcq') return ptMcq(rng);
  if (opts.exam === 'open' || level === 5) {
    if (!opts.exam && rng.chance(0.5)) return ptParams(rng, opts);
  }
  const lv = opts.exam ? 5 : level;
  const d = ptData(rng);
  const p = ptParts(d, lv);
  const before = [];
  let parts;
  if (lv === 1) {
    before.push(NOTE(`Vecteur vitesse : ẋ = ${MT(p.dxt, { vars: [T] })} et ẏ = ${MT(p.dyt, { vars: [T] })}.`));
    parts = [p.zerosX, p.zerosY, p.slope];
  } else if (lv === 2) parts = [p.speedX, p.speedY, p.zerosX, p.zerosY, p.slope];
  else parts = [p.speedX, p.speedY, p.zerosX, p.zerosY, p.slope, p.px, p.py, p.tangent];
  const { start, judge, script } = partsScript(parts, lv, PT_CHOICES, before);
  const item = linesItem({
    skill: PT, level: lv,
    prompt: `Arc paramétré : x(t) = ${MT(p.xt, { vars: [T] })}, y(t) = ${MT(p.yt, { vars: [T] })}. Trouve les points à tangente horizontale ou verticale et le point stationnaire${lv >= 3 ? ', puis la tangente en ce point' : ', avec sa pente'}.`,
    start, judge, mode: modeOf(lv), script,
    hints: H('Cherche où ẋ et ẏ s\'annulent, puis classe chaque valeur de t. Au point stationnaire, la pente est la limite de ẏ/ẋ.',
      `ẏ/ẋ = ${MT(d.cubic ? `□/${tq(d.u)}` : `2/(3(t-□))`, { vars: [T] })}`,
      `Pente ${fr(N(d.slope))} au point M(${fr(N(d.xr))} ; ${fr(N(d.yr))}).`),
    subgoals: usedSubgoals(PT_SUB, script), keys: KEYS_T, tapActions: lv === 3 ? 'steps' : null,
    declares: { vars: [T, 'x'] }, key: `${PT}:${lv}:${p.xt}:${p.yt}`, exam: examTag(opts, 4), fallback: d.fallback,
  });
  return withBaits(item, ['g6_param_slope_inverted']);
}

// Level 5, second template (MAN 2018 Q9, modified): x = t³ + at² + bt,
// y = t² + ct; a, b, c for a stationary point with a vertical tangent at t₀.
function ptParams(rng, opts) {
  const t0 = rng.pick([-2, -1, 1, 2]);
  const a = -3 * t0;
  const b = 3 * t0 * t0;
  const c = -2 * t0;
  const vars = [T, 'a', 'b', 'c'];
  const xt = 't^3+a×t^2+b×t';
  const yt = 't^2+c×t';
  const tj = { kind: 'equiv', vars, dvar: T, domain: { t: [-2.5, 2.5] }, target: 'no-prime' };
  const cond = D(`Au point M(${fr(t0)}), on veut un point stationnaire à tangente verticale. Il faut :`, [
    { id: 'ok', label: `ẏ(${fr(t0)}) = 0, et ${fr(t0)} zéro double de ẋ : ẋ(${fr(t0)}) = 0 et ẍ(${fr(t0)}) = 0`, valid: true },
    { id: 'inv', label: `ẋ(${fr(t0)}) = 0, et ${fr(t0)} zéro double de ẏ : ẏ(${fr(t0)}) = 0 et ÿ(${fr(t0)}) = 0`, valid: false, rule: 'g6_param_slope_inverted', why: 'La pente est ẏ/ẋ : pour qu\'elle tende vers l\'infini, c\'est ẋ qui doit s\'annuler « plus vite » (zéro double).' },
    { id: 'simple', label: `ẋ(${fr(t0)}) = 0 et ẏ(${fr(t0)}) = 0 suffisent`, valid: false, why: 'Avec deux zéros simples, ẏ/ẋ tend vers un nombre fini : la tangente n\'est pas verticale.' },
  ]);
  const dxt = `3t^2+2a×t+b`;
  const dxNum = polyText([b, 2 * a, 3], T);
  const dyNum = polyText([c, 2], T);
  const parts = [
    part('Vecteur vitesse :', 'ẋ =', `d(${xt})`, tj, [E(dxt, 'Dériver x(t)', 'speed')]),
    part('', 'ẏ =', `d(${yt})`, tj, [E('2t+c', 'Dériver y(t)', 'speed')]),
    part(`ẏ(${fr(t0)}) = 0 :`, 'c :', `${atText('2t+c', T, t0, { vars })}=0`, { kind: 'solset', v: 'c' }, [E(`c=${c}`, 'Isoler c', 'zeros')], [cond]),
    part(`ẍ = 6t + 2a et ẍ(${fr(t0)}) = 0 :`, 'a :', `${atText('6t+2a', T, t0, { vars })}=0`, { kind: 'solset', v: 'a' }, [E(`a=${a}`, 'Isoler a', 'zeros')]),
    part(`ẋ(${fr(t0)}) = 0, avec a = ${fr(a)} :`, 'b :', `${atText(`3t^2${a < 0 ? '' : '+'}${2 * a}t+b`, T, t0, { vars })}=0`, { kind: 'solset', v: 'b' }, [E(`b=${b}`, 'Isoler b', 'zeros')]),
    part(`Vérifie : ẏ/ẋ quand t → ${fr(t0)}⁺.`, 'pente →', `(${dyNum})/(${dxNum})`, { kind: 'limit', v: T, to: String(t0), dir: '+', slope: true },
      [E(`2/(3${tq(t0)})`, `ẋ = 3${RT(tq(t0))}², ẏ = 2${RT(tq(t0))}`, 'slope'), E('+∞', 'Tangente verticale', 'slope')]),
  ];
  const { start, judge, script } = partsScript(parts, 5, null);
  const item = linesItem({
    skill: PT, level: 5,
    prompt: `Arc paramétré : x(t) = ${MT(xt, { vars })}, y(t) = ${MT(yt, { vars })}. Trouve a, b et c pour que M(${fr(t0)}) soit un point stationnaire à tangente verticale.`,
    start, judge, mode: 'free', script, hints: [], noHints: true, declares: { vars },
    subgoals: usedSubgoals(PT_SUB, script), keys: [...KEYS_T, 'letters'],
    key: `${PT}:params:${t0}`, exam: examTag(opts, 4),
  });
  return withBaits(item, ['g6_param_slope_inverted']);
}

function ptMcq(rng) {
  const d = ptData(rng);
  const xt = polyText(d.xc, T);
  const yt = polyText(d.yc, T);
  // A regular point: ẋ, ẏ ≠ 0, a slope different from its inverse.
  let t0;
  let s;
  for (const c of rng.shuffle([-2, -1, 0, 1, 2, 3])) {
    const vx = pEval(d.dx, c);
    const vy = pEval(d.dy, c);
    if (vx.n === 0 || vy.n === 0) continue;
    s = vy.div(vx);
    if (s.eq(s.inv()) || s.eq(s.inv().neg())) continue;
    t0 = c;
    break;
  }
  if (t0 === undefined) { t0 = 3; s = pEval(d.dy, 3).div(pEval(d.dx, 3)); }
  const vx = pEval(d.dx, t0);
  const vy = pEval(d.dy, t0);
  const options = distinctOptions([
    { html: fr(N(s)), correct: true },
    { html: fr(N(s.inv())), correct: false, rule: 'g6_param_slope_inverted' },
    { html: fr(N(s.neg())), correct: false },
    { html: fr(N(s.inv().neg())), correct: false },
    { html: fr(N(vy)), correct: false },
  ]);
  return mcq({
    skill: PT, level: 4, prompt: `Arc paramétré : x(t) = ${MT(xt, { vars: [T] })}, y(t) = ${MT(yt, { vars: [T] })}. Quelle est la pente de la tangente au point M(${fr(t0)}) ?`,
    options, key: `${PT}:mcq:${xt}:${yt}:${t0}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `ẋ(${fr(t0)}) = ${fr(N(vx))}, ẏ(${fr(t0)}) = ${fr(N(vy))} : pente ẏ/ẋ = ${fr(N(s))}.`, note: '' }],
  }, rng);
}

// ======================================================================
// g6-param-branches
// ======================================================================

const PB = 'g6-param-branches';
const PB_SUB = [
  { id: 'domain', label: 'bornes à étudier', skill: PB },
  { id: 'limits', label: 'limites de x et y', skill: 'g6-limits' },
  { id: 'slope', label: 'pente m = lim y/x', skill: 'g6-limits' },
  { id: 'intercept', label: 'h = lim (y − mx)', skill: 'g6-limits' },
  { id: 'asym', label: 'asymptote', skill: 'g6-asymptotes' },
];
const PB_CHOICES = [
  { id: 'domain', label: 'Domaine en t : les bornes à étudier' },
  { id: 'limits', label: 'Limites de x(t) et y(t) à la borne' },
  { id: 'slope', label: 'm = lim y/x' },
  { id: 'intercept', label: 'h = lim (y − mx)' },
  { id: 'asym', label: 'Conclure : y = mx + h' },
  { id: 'inv', label: 'm = lim x/y', rule: 'g6_param_ratio_inverted', why: 'La pente est lim y/x : y en haut.' },
  { id: 'hforgot', label: 'Conclure : y = mx', rule: 'g6_oblique_h_forgot', why: 'Il faut encore h = lim (y − mx).' },
];
const asymJudge = (m, h) => ({ kind: 'equiv', vars: ['x', 'm', 'h'], subst: { m: N(m), h: N(h) }, target: 'only', finalVars: ['x'] });
const lim = (to, dir, extra = {}) => ({ kind: 'limit', v: T, to: String(to), ...(dir ? { dir } : {}), ...extra });
const inf = (s) => (s > 0 ? '+∞' : '-∞');
const ratioDecision = (bound) => D(`Quand t → ${bound}, x et y tendent vers l'infini. On calcule :`, [
  { id: 'yx', label: 'm = lim y/x, puis h = lim (y − mx)', valid: true },
  { id: 'xy', label: 'm = lim x/y, puis h = lim (y − mx)', valid: false, rule: 'g6_param_ratio_inverted', why: 'La pente d\'une droite est y/x, pas x/y.' },
  { id: 'vert', label: 'rien : c\'est une asymptote verticale', valid: false, why: 'Une asymptote verticale demande x → un nombre fini.' },
]);
const obliqueDecision = (m, h) => D(`m = ${fr(N(m))} et h = ${fr(N(h))} sont finis. La branche est :`, [
  { id: 'obl', label: 'une asymptote oblique y = mx + h', valid: true },
  { id: 'parab', label: 'une branche parabolique', valid: false, why: 'Une branche parabolique, c\'est quand m ou h est infini.' },
  { id: 'hforgot', label: 'l\'asymptote y = mx', valid: false, rule: 'g6_oblique_h_forgot', why: 'h ≠ 0 décale l\'asymptote : y = mx + h.' },
]);

// x = P(t)/(t − t₀), y = Q(t)/(t − t₀): horizontal asymptote at ±∞,
// oblique one when t → t₀.
function pbData(rng) {
  for (let i = 0; i < 300; i++) {
    const t0 = nz(rng, -3, 3);
    const P = [rng.int(-3, 3), rng.int(-3, 3), 1];
    const be = rng.pick([1, 2, -1]);
    const Qc = [rng.int(-3, 3), be];
    const Pt0 = pEval(P, t0);
    const Qt0 = pEval(Qc, t0);
    if (Pt0.n === 0 || Qt0.n === 0) continue;
    const m = Qt0.div(Pt0);
    const dP = pEval(pDeriv(P), t0);
    const h = q(be).sub(m.mul(dP));
    if (m.d > 6 || h.d > 6 || Math.abs(m.n) > 12 || Math.abs(h.n) > 20) continue;
    const diff = pAdd(Qc, pScale(P, m.neg()));
    const L = [diff[1].add(diff[2].mul(t0)), diff[2]];
    return { t0, P, Qc, be, Pt0, Qt0, m, h, diff, L };
  }
  return { ...pbFixed(), fallback: true };
}
function pbFixed() {
  const P = [0, 0, 1];
  const Qc = [1, 1];
  const m = q(3, 4);
  const h = q(-2);
  const diff = pAdd(Qc, pScale(P, m.neg()));
  return { t0: 2, P, Qc, be: 1, Pt0: q(4), Qt0: q(3), m, h, diff, L: [diff[1].add(diff[2].mul(2)), diff[2]] };
}

function pbParts(d, level) {
  const tt = minusText(d.t0, T);
  const xt = `(${polyText(d.P, T)})/(${tt})`;
  const yt = `(${polyText(d.Qc, T)})/(${tt})`;
  const domain = part('Domaine en t :', 'D =', xt, { kind: 'solset', v: T, exprDomain: true },
    [E(`]-∞;${d.t0}[∪]${d.t0};+∞[`, `Bornes à étudier : ±∞ et ${fr(d.t0)}`, 'domain', 'domain')]);
  const xInf = part('Quand t → +∞ :', 'lim x =', xt, lim('+∞'), [E('+∞', 'Degré 2 sur degré 1', 'limits', 'limits')]);
  const yInf = part('', 'lim y =', yt, lim('+∞'), [E(N(d.be), 'Coefficients dominants', 'limits', 'limits')]);
  const horiz = D(`Quand t → ±∞ : x → ±∞ et y → ${fr(N(d.be))}. La branche est :`, [
    { id: 'h', label: `une asymptote horizontale y = ${fr(N(d.be))}`, valid: true },
    { id: 'v', label: `une asymptote verticale x = ${fr(N(d.be))}`, valid: false, why: 'C\'est y qui tend vers un nombre, et x vers l\'infini : la droite est horizontale.' },
    { id: 'o', label: 'une asymptote oblique', valid: false, why: 'y a une limite finie : pas besoin de m et h.' },
  ]);
  const sx = Math.sign(d.Pt0.valueOf());
  const sy = Math.sign(d.Qt0.valueOf());
  const xT0 = part(`Quand t → ${fr(d.t0)}⁺ :`, 'lim x =', xt, lim(d.t0, '+'),
    [E(`${N(d.Pt0)}/(${tt})`, `Le numérateur tend vers ${fr(N(d.Pt0))}`, 'limits', 'limits'), E(inf(sx), 'Dénominateur → 0⁺', 'limits', 'limits')], [horiz]);
  const yT0 = part('', 'lim y =', yt, lim(d.t0, '+'),
    [E(`${N(d.Qt0)}/(${tt})`, `Le numérateur tend vers ${fr(N(d.Qt0))}`, 'limits', 'limits'), E(inf(sy), 'Dénominateur → 0⁺', 'limits', 'limits')]);
  const QP = `(${polyText(d.Qc, T)})/(${polyText(d.P, T)})`;
  const mLine = E(QP, 'Les dénominateurs t − t₀ se simplifient', 'slope', 'slope');
  const slope = part(`Quand t → ${fr(d.t0)} : m = lim y/x.`, 'm =', `(${yt})/(${xt})`, lim(d.t0, null, { ratio: true }),
    [level === 1 ? blanked(mLine, [polyText(d.P, T)]) : mLine, E(N(d.m), `t = ${fr(d.t0)}`, 'slope', 'slope')], [ratioDecision(fr(d.t0))]);
  const dText = polyText(d.diff, T);
  const lText = polyText(d.L, T);
  const hLines = [
    E(`(${dText})/(${tt})`, 'Même dénominateur', 'intercept', 'intercept'),
    E(lText, `Le numérateur s'annule en ${fr(d.t0)} : on simplifie par ${RT(tt)}`, 'intercept', 'intercept'),
    E(N(d.h), `t = ${fr(d.t0)}`, 'intercept', 'intercept'),
  ];
  if (level <= 2) hLines[1] = blanked(hLines[1], [[String(Math.abs(d.L[0].n)), -1]].filter(() => d.L[0].n !== 0));
  const mx = `${d.m.d === 1 && d.m.n > 0 ? d.m.n : `(${N(d.m)})`}×${xt}`;
  const inter = part(`Quand t → ${fr(d.t0)} : h = lim (y − mx).`, 'h =', `${yt}-${mx}`, lim(d.t0), hLines);
  const asym = part(`Asymptote quand t → ${fr(d.t0)} :`, 'y =', 'mx+h', asymJudge(d.m, d.h), [E(affText(d.m, d.h), 'y = mx + h', 'asym', 'asym')], [obliqueDecision(d.m, d.h)]);
  return { xt, yt, domain, xInf, yInf, xT0, yT0, slope, inter, asym };
}

// MAN 2017 Q7: x = ln(t² + c), y = ln(t²(t² + c)ᵏ).
const lnText = (c) => (c === 1 ? '0' : `ln(${c})`);
function pbLogParts(rng) {
  const c = rng.int(1, 5);
  const k = rng.pick([1, 1, 2]);
  const xt = `ln(t^2+${c})`;
  const yt = k === 1 ? `ln(t^4+${c === 1 ? '' : c}t^2)` : `ln(t^2(t^2+${c})^2)`;
  const parts = [
    part('Domaine en t :', 'D =', yt, { kind: 'solset', v: T, exprDomain: true }, [E(']-∞;0[∪]0;+∞[', 'Bornes à étudier : 0 et ±∞', 'domain', 'domain')]),
    part('Quand t → 0 :', 'lim x =', xt, lim(0), [E(lnText(c), 'x est continue en 0', 'limits', 'limits')]),
    part('', 'lim y =', yt, lim(0), [E('-∞', 'ln de quelque chose qui tend vers 0⁺', 'limits', 'limits')]),
    part('Quand t → ±∞ (x et y sont paires en t) :', 'lim x =', xt, lim('+∞'), [E('+∞', 'ln(+∞)', 'limits', 'limits')], [
      D(`Quand t → 0 : x → ${RT(lnText(c))} et y → −∞. La branche est :`, [
        { id: 'v', label: `une asymptote verticale x = ${RT(lnText(c))}`, valid: true },
        { id: 'h', label: 'une asymptote horizontale', valid: false, why: 'x tend vers un nombre et y vers l\'infini : la droite est verticale.' },
        { id: 'none', label: 'pas de branche infinie', valid: false, why: 'y → −∞ : le point part à l\'infini.' },
      ])]),
    part('', 'lim y =', yt, lim('+∞'), [E('+∞', 'ln(+∞)', 'limits', 'limits')]),
    part('Quand t → ±∞ : m = lim y/x.', 'm =', `(${yt})/(${xt})`, lim('+∞', null, { ratio: true }),
      [E(`ln(t^2)/ln(t^2+${c})+${k}`, `ln(t²(t² + ${c})${k === 1 ? '' : '²'}) = ln(t²) + ${k === 1 ? '' : '2'}ln(t² + ${c})`, 'slope', 'slope'), E(String(k + 1), 'ln(t²)/ln(t² + c) → 1', 'slope', 'slope')],
      [ratioDecision('±∞')]),
    part('h = lim (y − mx).', 'h =', `${yt}-${k + 1}${xt}`, lim('+∞'),
      [E(`ln(t^2)-ln(t^2+${c})`, 'Regrouper', 'intercept', 'intercept'), E(`ln(t^2/(t^2+${c}))`, 'Un seul logarithme', 'intercept', 'intercept'), E('0', 'ln(1) = 0', 'intercept', 'intercept')]),
    part('Asymptote quand t → ±∞ :', 'y =', 'mx+h', asymJudge(k + 1, 0), [E(`${k + 1}x`, 'y = mx + h', 'asym', 'asym')], [obliqueDecision(q(k + 1), q(0))]),
  ];
  return { xt, yt, parts, key: `${xt}:${yt}` };
}

// Exam E5: x = (at² − t)/(t + 1), y = kt/(t + 1), the cases of a.
function pbParam(rng, opts) {
  const k = rng.pick([1, 2, 3]);
  const vars = [T, 'a'];
  const yt = `${k === 1 ? '' : k}t/(t+1)`;
  const xt = '(a×t^2-t)/(t+1)';
  const dom = { t: [0.2, 3], a: [0.2, 2.5] };
  const goalR = `${k}/(a×t-1)`;
  const goalD = `${k}a×t/(a+1)`;
  const parts = [
    part('Quand t → ±∞ :', 'lim y =', yt, lim('+∞'), [E(String(k), 'Coefficients dominants', 'limits')]),
    part('Cas a = 0 : x(t) = −t/(t + 1). Quand t → ±∞ :', 'lim x =', '-t/(t+1)', lim('+∞'), [E('-1', 'Coefficients dominants', 'limits')]),
    part('Quand t → −1, y → ∞. Cas a = −1 :', 'x(t) =', '(-t^2-t)/(t+1)', { kind: 'equiv', vars: [T], domain: { t: [0.2, 3] }, target: 'short', goal: '-t', slack: 0 },
      [E('-t', 'Factoriser −t(t + 1)', 'limits')], [
        D(`Quand t → ±∞ : y → ${k} ; x → ∞ si a ≠ 0, et x → −1 si a = 0. Donc :`, [
          { id: 'ok', label: `a ≠ 0 : asymptote horizontale y = ${k} ; a = 0 : pas de branche infinie, M(t) tend vers (−1 ; ${k})`, valid: true },
          { id: 'all', label: `asymptote horizontale y = ${k} pour tout a`, valid: false, why: 'Pour a = 0, x → −1 : le point tend vers (−1 ; …), il ne part pas à l\'infini.' },
          { id: 'v', label: 'a = 0 : asymptote verticale x = −1', valid: false, why: 'Pour a = 0, x → −1 mais y → un nombre aussi : pas de branche infinie.' },
        ])]),
    part('Cas a ≠ −1 : quand t → −1, x et y → ∞.', 'y/x =', `(${yt})/(${xt})`, { kind: 'equiv', vars, domain: dom, target: 'short', goal: goalR, slack: 0 },
      [E(goalR, 'Simplifier par t(t + 1)/(t + 1)', 'slope')], [
        D('Cas a = −1 : x(t) = −t → 1 et y → ∞ quand t → −1. La branche est :', [
          { id: 'v', label: 'une asymptote verticale x = 1', valid: true },
          { id: 'h', label: 'une asymptote horizontale y = 1', valid: false, why: 'C\'est x qui tend vers 1 : droite verticale.' },
          { id: 'o', label: 'une asymptote oblique', valid: false, why: 'x a une limite finie : pas besoin de m et h.' },
        ]),
        ratioDecision('−1')]),
    part('m = lim y/x quand t → −1 :', 'm =', goalR, { kind: 'equiv', vars, subst: { t: '-1' }, target: 'only', finalVars: ['a'] },
      [E(`-${k}/(a+1)`, 't = −1', 'slope')]),
    part('y − mx =', 'y − mx =', `${yt}+(${k}/(a+1))×${xt}`, { kind: 'equiv', vars, domain: dom, target: 'short', goal: goalD, slack: 0 },
      [E(goalD, 'Même dénominateur, puis simplifier par t + 1', 'intercept')]),
    part('h = lim (y − mx) quand t → −1 :', 'h =', goalD, { kind: 'equiv', vars, subst: { t: '-1' }, target: 'only', finalVars: ['a'] },
      [E(`-${k}a/(a+1)`, 't = −1', 'intercept')]),
    part('Asymptote oblique (a ≠ −1) :', 'y =', 'mx+h', { kind: 'equiv', vars: ['x', 'a', 'm', 'h'], subst: { m: `-${k}/(a+1)`, h: `-${k}a/(a+1)` }, target: 'only', finalVars: ['x', 'a'] },
      [E(`-${k}(x+a)/(a+1)`, 'y = mx + h', 'asym')]),
  ];
  const { start, judge, script } = partsScript(parts, 5, null);
  const item = linesItem({
    skill: PB, level: opts.exam ? 4 : 5,
    prompt: `Γ : x(t) = ${MT(xt, { vars })}, y(t) = ${MT(yt, { vars })}, avec a ∈ ℝ. Détermine, selon a, les branches infinies de Γ (en ±∞ et quand t → −1).`,
    start, judge, mode: 'free', script, hints: [], noHints: true, declares: { vars },
    subgoals: usedSubgoals(PB_SUB, script), keys: [...KEYS_T, 'letters'],
    key: `${PB}:E5:${k}`, exam: examTag(opts, 6),
  });
  return withBaits(item, ['g6_param_ratio_inverted', 'g6_oblique_h_forgot']);
}

function pbItem(level, rng, opts = {}) {
  if (opts.exam === 'mcq') return pbMcq(rng);
  if (opts.exam === 'open' || (level === 5 && rng.chance(0.5))) return pbParam(rng, opts);
  let parts;
  let key;
  let prompt;
  let hints;
  let fallback = false;
  const before = [];
  if ((level === 4 && rng.chance(0.3)) || level === 5) {
    const g = pbLogParts(rng);
    parts = g.parts;
    key = g.key;
    prompt = `Γ : x(t) = ${MT(g.xt, { vars: [T] })}, y(t) = ${MT(g.yt, { vars: [T] })}. Détermine les branches infinies de Γ.`;
    hints = H('À chaque borne (0 et ±∞), calcule les limites de x et de y, puis choisis le cas.', 'm = lim y/x : écris ln(t²(…)) = ln(t²) + ln(…).', 'Asymptote verticale en t → 0, asymptote oblique en ±∞.');
  } else {
    const d = pbData(rng);
    fallback = d.fallback;
    const p = pbParts(d, level);
    if (level === 1) {
      before.push(NOTE(`Les limites : quand t → ±∞, x → ±∞ et y → ${fr(N(d.be))} ; quand t → ${fr(d.t0)}, x → ∞ et y → ∞.`));
      parts = [p.slope, p.inter, p.asym];
    } else if (level === 2) parts = [{ ...p.yInf, html: 'Quand t → ±∞ :' }, { ...p.xInf, html: '' }, p.xT0, p.yT0, p.slope, p.inter, p.asym];
    else parts = [p.domain, p.xInf, p.yInf, p.xT0, p.yT0, p.slope, p.inter, p.asym];
    key = `${p.xt}:${p.yt}`;
    prompt = `Γ : x(t) = ${MT(p.xt, { vars: [T] })}, y(t) = ${MT(p.yt, { vars: [T] })}. Détermine les branches infinies de Γ.`;
    hints = H('Pour chaque borne (±∞ et la valeur interdite), calcule les limites de x et de y, puis choisis le cas.',
      `h = lim ${MT(`(${polyText(d.diff, T)})/(t-□)`, { vars: [T] })}`, `y = ${MT(affText(d.m, d.h))}`);
  }
  const { start, judge, script } = partsScript(parts, level, PB_CHOICES, before);
  const item = linesItem({
    skill: PB, level, prompt, start, judge, mode: modeOf(level), script, hints,
    subgoals: usedSubgoals(PB_SUB, script), keys: KEYS_T, tapActions: level === 3 ? 'steps' : null,
    declares: { vars: [T, 'x'] }, key: `${PB}:${level}:${key}`, exam: examTag(opts, 6), fallback,
  });
  return withBaits(item, ['g6_param_ratio_inverted', 'g6_oblique_h_forgot']);
}

function pbMcq(rng) {
  const d = pbData(rng);
  const tt = minusText(d.t0, T);
  const xt = `(${polyText(d.P, T)})/(${tt})`;
  const yt = `(${polyText(d.Qc, T)})/(${tt})`;
  const aff = (m, h) => `l'asymptote oblique y = ${MT(affText(m, h))}`;
  const options = distinctOptions([
    { html: aff(d.m, d.h), correct: true },
    { html: aff(d.m, q(0)), correct: false, rule: 'g6_oblique_h_forgot' },
    { html: aff(d.m.inv(), d.h), correct: false, rule: 'g6_param_ratio_inverted' },
    { html: `l'asymptote verticale x = ${fr(N(d.Pt0))}`, correct: false },
    { html: 'une branche parabolique', correct: false },
  ]);
  return mcq({
    skill: PB, level: 4, prompt: `Γ : x(t) = ${MT(xt, { vars: [T] })}, y(t) = ${MT(yt, { vars: [T] })}. Quand t → ${fr(d.t0)}, Γ a :`,
    options, key: `${PB}:mcq:${xt}:${yt}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `x et y → ∞. m = lim y/x = ${fr(N(d.m))}, h = lim (y − mx) = ${fr(N(d.h))} : asymptote y = ${MT(affText(d.m, d.h))}.`, note: '' }],
  }, rng);
}

export const GEN = {
  [PT]: (level, rng, profile, opts = {}) => ptItem(level, rng, opts),
  [PB]: (level, rng, profile, opts = {}) => pbItem(level, rng, opts),
};
