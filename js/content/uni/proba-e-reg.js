// Generators of module P, part e: regression. p-reg-ls (least-squares
// line, r and R²), p-reg-test (t tests and interval on a coefficient),
// p-reg-multi (design matrix, normal equations, nested F test). Data are
// built backwards (convention 10): equally spaced whole x, whole ȳ, whole
// deviations of zero sum; all sums are exact.

import { choice, tf, numCounter, H, examTag } from './proba-kit.js';
import { statItem, coefItem, openItem, q, qt, qs, ql, rl, r2, sum, interp, vf, zeroSum } from './proba-e-kit.js';
import { courseT, fInv, roundTo } from '../../cas/stats.js';

const sq = (x) => x.mul(x);
const wrap = (t) => (/^-|\//.test(t) ? `(${t})` : t);
const pq = (x) => (x.n < 0 ? `(${ql(x, 6)})` : ql(x, 6));

// n points, x = x0, x0 + h, …; y = ȳ + e. Exact sums and estimates.
function fromXY(x, y, test) {
  const n = x.length;
  const xbar = q(sum(x), n);
  const ybar = q(sum(y), n);
  const dx = x.map((v) => q(v).sub(xbar));
  const dy = y.map((v) => q(v).sub(ybar));
  const Sxx = dx.reduce((s, v) => s.add(sq(v)), q(0));
  const Sxy = dx.reduce((s, v, i) => s.add(v.mul(dy[i])), q(0));
  const Syy = dy.reduce((s, v) => s.add(sq(v)), q(0));
  const beta = Sxy.div(Sxx);
  const alpha = ybar.sub(beta.mul(xbar));
  const RSS = Syy.sub(beta.mul(Sxy));
  const d = { n, x, y, xbar, ybar, dx, dy, Sxx, Sxy, Syy, beta, alpha, RSS, R2: Sxy.n ? sq(Sxy).div(Sxx.mul(Syy)) : q(0) };
  d.r = Sxy.valueOf() / Math.sqrt(Sxx.valueOf() * Syy.valueOf());
  if (test) {
    d.s2 = RSS.div(n - 2);
    d.seB = Math.sqrt(d.s2.valueOf() / Sxx.valueOf());
    d.seA = Math.sqrt(d.s2.valueOf() * (1 / n + xbar.valueOf() ** 2 / Sxx.valueOf()));
    d.tB = beta.valueOf() / d.seB;
    d.tA = alpha.valueOf() / d.seA;
    d.tc = courseT(n - 2, 5);
  }
  return d;
}

// n points, x = x0, x0 + h, …; y = ȳ + e. Exact sums and estimates.
function regData(rng, { ns, h = 1, nice = false, test = null } = {}) {
  for (let t = 0; t < 400; t++) {
    const n = rng.pick(ns);
    const x0 = rng.int(0, 3);
    const x = Array.from({ length: n }, (_, i) => x0 + h * i);
    const ybar = rng.int(3, 15);
    const y = zeroSum(rng, n, 3).map((v) => ybar + v);
    if (y.some((v) => v < 0)) continue;
    const d = fromXY(x, y, test);
    if (d.Sxy.n === 0 || d.RSS.n <= 0) continue;
    // A line worth fitting: R² at least 0,15 (a pure cloud gives R² = 0,006).
    if (!test && d.Sxy.mul(d.Sxy).div(d.Sxx.mul(d.Syy)).valueOf() < 0.15) continue;
    if (nice && !q(d.beta.n * 100, d.beta.d).isInt()) continue;
    if (test) {
      const tt = test === 'alpha' ? d.tA : d.tB;
      if (Math.abs(Math.abs(tt) - d.tc) < 0.3) continue;
      if (test === 'alpha' && d.alpha.n === 0) continue;
    }
    return d;
  }
  // The catalogue's data (p-reg-ls, p-reg-test; example 3 for α).
  const d = test === 'alpha' ? fromXY([1, 2, 3, 4, 5, 6], [3, 4, 4, 6, 7, 6], test) : fromXY([1, 2, 3, 4, 5], [2, 4, 5, 4, 5], test);
  d.fallback = true;
  return d;
}
const SPRINGS = 'Un ressort s\'allonge sous des masses x (en kg) ; y est l\'allongement (en mm).';
const dataLine = (d) => `x : ${d.x.join(', ')} ; y : ${d.y.join(', ')}`;

// ======================================================================
// p-reg-ls
// ======================================================================

const LS = 'p-reg-ls';
const LS_SUB = [
  { id: 'mean', label: 'moyennes', skill: 'p-desc-summary' },
  { id: 'ls', label: 'moindres carrés', skill: 'l-orth-lsq' },
  { id: 'line', label: 'pente, ordonnée, R²', skill: LS },
];

function lsParts(d, level, raw) {
  const devX = d.dx.map(pq);
  const parts = [
    { label: 'x̄', name: 'xbar', kind: 'prob', expect: qt(d.xbar), action: 'Moyennes x̄ et ȳ',
      lines: raw
        ? [{ math: `${sum(d.x)}/${d.n}`, note: 'Σx/n', subgoal: 'mean' }, { math: ql(d.xbar, 4) }]
        : [{ math: `(${d.x.join('+')})/${d.n}`, note: 'Moyenne des x', subgoal: 'mean', blank: [String(d.n)] }, { math: ql(d.xbar, 4), blank: [ql(d.xbar, 4)] }] },
    { label: 'ȳ', name: 'ybar', kind: 'prob', expect: qt(d.ybar), action: 'Moyennes x̄ et ȳ',
      lines: raw
        ? [{ math: `${sum(d.y)}/${d.n}`, note: 'Σy/n', subgoal: 'mean' }, { math: qt(d.ybar) }]
        : [{ math: `(${d.y.join('+')})/${d.n}`, note: 'Moyenne des y', subgoal: 'mean', blank: [String(d.n)] }, { math: qt(d.ybar), blank: [qt(d.ybar)] }] },
  ];
  const sx2 = sum(d.x.map((v) => v * v));
  const sxy = sum(d.x.map((v, i) => v * d.y[i]));
  const sy2 = sum(d.y.map((v) => v * v));
  parts.push({ label: 'S_xx', name: 'Sxx', kind: 'prob', expect: qt(d.Sxx), action: 'Sommes centrées S_xx, S_xy',
    lines: raw
      ? [{ math: `${sx2}-${d.n}×${ql(d.xbar, 4)}^2`, note: 'Σx² − n·x̄²', subgoal: 'ls' }, { math: ql(d.Sxx, 4) }]
      : [{ math: devX.map((v) => `${v}^2`).join('+'), note: 'Σ(xᵢ − x̄)²', subgoal: 'ls', blank: [`${devX[0]}^2`] }, { math: ql(d.Sxx, 4), blank: [ql(d.Sxx, 4)] }] });
  parts.push({ label: 'S_xy', name: 'Sxy', kind: 'prob', expect: qt(d.Sxy), action: 'Sommes centrées S_xx, S_xy',
    lines: raw
      ? [{ math: `${sxy}-${d.n}×${ql(d.xbar, 4)}×${qt(d.ybar)}`, note: 'Σxy − n·x̄·ȳ', subgoal: 'ls' }, { math: ql(d.Sxy, 4) }]
      : [{ math: d.dx.map((v, i) => `${pq(v)}×${pq(d.dy[i])}`).join('+'), note: 'Σ(xᵢ − x̄)(yᵢ − ȳ)', subgoal: 'ls', blank: [`${pq(d.dx[0])}×${pq(d.dy[0])}`] }, { math: ql(d.Sxy, 4), blank: [ql(d.Sxy, 4)] }] });
  parts.push({ label: 'β̂', name: 'beta', kind: 'prob', expect: '$Sxy/$Sxx', action: 'Pente β̂ = S_xy/S_xx',
    traps: { p_reg_slope_swap: [qt(d.Sxy.div(d.Syy))], p_reg_sums_raw: [qt(q(sxy, sx2))] },
    wrongActions: [
      { label: 'Pente S_xy/S_yy', rule: 'p_reg_slope_swap', why: 'La pente de y sur x divise par la dispersion de x.' },
      { label: 'Pente Σxy/Σx², sans centrer', rule: 'p_reg_sums_raw', why: 'Il faut centrer : S_xy = Σxy − n·x̄ȳ et S_xx = Σx² − n·x̄².' },
    ],
    lines: [{ math: `${ql(d.Sxy, 4)}/${ql(d.Sxx, 4)}`, note: 'S_xy/S_xx', subgoal: 'line', blank: [ql(d.Sxx, 4)] }, { math: qs(d.beta).replace('−', '-'), blank: [qs(d.beta).replace('−', '-')] }], value: qt(d.beta) });
  parts.push({ label: 'α̂', name: 'alpha', kind: 'prob', expect: '$ybar-$beta×$xbar', action: 'Ordonnée α̂ = ȳ − β̂·x̄',
    lines: [{ math: `${qt(d.ybar)}-${pq(d.beta)}×${pq(d.xbar)}`, note: 'La droite passe par (x̄, ȳ)', subgoal: 'line', blank: [pq(d.beta)] }, { math: qs(d.alpha).replace('−', '-'), blank: [qs(d.alpha).replace('−', '-')] }] });
  if (!raw) {
    parts.push({ label: 'S_yy', name: 'Syy', kind: 'prob', expect: qt(d.Syy), action: 'S_yy, puis R²',
      lines: [{ math: d.dy.map((v) => `${pq(v)}^2`).join('+'), note: 'Σ(yᵢ − ȳ)²', subgoal: 'ls' }, { math: qt(d.Syy) }] });
    parts.push({ label: 'R²', name: 'Rsq', kind: 'prob', expect: '$Sxy^2/($Sxx×$Syy)', action: 'R² = S_xy²/(S_xx·S_yy)',
      traps: { p_r2_r: { values: [rl(d.r, 3), rl(d.r, 2)], ctx: { r: r2(d.r, 3), r2: qs(d.R2) } } },
      wrongActions: [{ label: 'R² = r = S_xy/√(S_xx·S_yy)', rule: 'p_r2_r', why: 'R² = r².' }],
      lines: [{ math: `${pq(d.Sxy)}^2/(${ql(d.Sxx, 4)}×${qt(d.Syy)})`, note: 'R² = r²', subgoal: 'line', blank: [qt(d.Syy)] }, { math: qs(d.R2) }], value: qt(d.R2) });
  }
  return parts;
}
// A value whose decimal or fraction is short enough to write as its own line.
const literalOk = (x) => x.toDecimal() !== null || x.d <= 200;

function lsL5(d, rng, opts) {
  // From r, s_x, s_y and the means (série 13, ex. 2), then x on y (EE-209 Q20).
  const r = rng.pick([q(1, 2), q(3, 5), q(4, 5), q(-1, 2), q(-3, 5)]);
  const sx = rng.pick([2, 4, 5]);
  const sy = rng.pick([3, 6, 10]);
  const mx = rng.int(2, 12);
  const my = rng.int(10, 40);
  const b = r.mul(sy).div(sx);
  const a = q(my).sub(b.mul(mx));
  const dd = r.mul(sx).div(sy);
  const c = q(mx).sub(dd.mul(my));
  return statItem({
    skill: LS, level: 5, key: `5:${qt(r)}:${sx}:${sy}:${mx}:${my}`,
    prompt: `On connaît x̄ = ${mx}, ȳ = ${my}, s_x = ${sx}, s_y = ${sy} et r = ${qs(r)}. Donne la droite de régression de y sur x (y = α̂ + β̂x), puis celle de x sur y (x = ĉ + d̂y).`,
    parts: [
      { label: 'β̂', name: 'beta', kind: 'prob', expect: qt(b), lines: [{ math: `${qs(r).replace('−', '-')}×${sy}/${sx}`, note: 'β̂ = r·s_y/s_x', subgoal: 'line' }, { math: qs(b).replace('−', '-') }] },
      { label: 'α̂', name: 'alpha', kind: 'prob', expect: '$ybar-$beta×$xbar', ref: { ybar: String(my), xbar: String(mx) }, lines: [{ math: `${my}-${pq(b)}×${mx}`, note: 'Par (x̄, ȳ)', subgoal: 'line' }, { math: qs(a).replace('−', '-') }] },
      { label: 'd̂', name: 'd', kind: 'prob', expect: qt(dd), title: 'Droite de x sur y : pente d̂',
        traps: { p_reg_x_on_y: { values: [qt(q(1).div(b))], ctx: {} } },
        lines: [{ math: `${qs(r).replace('−', '-')}×${sx}/${sy}`, note: 'd̂ = r·s_x/s_y, pas 1/β̂', subgoal: 'line' }, { math: qs(dd).replace('−', '-') }] },
      { label: 'ĉ', name: 'c', kind: 'prob', expect: qt(c), lines: [{ math: `${mx}-${pq(dd)}×${my}`, note: 'Par (x̄, ȳ) aussi', subgoal: 'line' }, { math: qs(c).replace('−', '-') }] },
    ],
    hints: [], subgoals: LS_SUB, exam: examTag(opts),
  });
}

function lsItem(level, rng, profile, opts = {}) {
  const d = regData(rng, { ns: level <= 3 ? [4, 5] : [4, 5, 6, 7], nice: level <= 3 });
  if (opts.exam === 'mcq') return lsMcq(d, rng, opts);
  if (opts.exam === 'tf') return lsTf(d, rng, opts);
  if (level === 5) return lsL5(d, rng, opts);
  const raw = level === 4 && rng.chance(0.5);
  const sx2 = sum(d.x.map((v) => v * v));
  const sxy = sum(d.x.map((v, i) => v * d.y[i]));
  const prompt = raw
    ? `${SPRINGS} Pour n = ${d.n} mesures : Σx = ${sum(d.x)}, Σy = ${sum(d.y)}, Σx² = ${sx2}, Σxy = ${sxy}. Donne la droite des moindres carrés y = α̂ + β̂x.`
    : `Données (${d.n} points) : ${dataLine(d)}. Calcule la droite des moindres carrés y = α̂ + β̂x et R².`;
  const o = {
    skill: LS, level, key: `${level}:${raw ? 'raw:' : ''}${d.x.join('-')}:${d.y.join('-')}`, prompt,
    parts: lsParts(d, level, raw),
    hints: H('Centre d\'abord : pente β̂ = S_xy/S_xx, puis la droite passe par (x̄, ȳ).', `β̂ = ${qs(d.Sxy)}/□`, `β̂ = ${qs(d.beta)}, α̂ = ${qs(d.alpha)}`),
    subgoals: LS_SUB, exam: examTag(opts),
  };
  if (opts.exam === 'coef') return coefItem({ ...o, part: o.parts.find((p) => p.name === 'beta'), prompt: `Données : ${dataLine(d)}. Calcule la pente β̂ de la droite des moindres carrés.` });
  return statItem(o);
}

function lsMcq(d, rng, opts) {
  if (rng.chance(0.5)) {
    const dd = d.Sxy.div(d.Syy);
    const c = d.xbar.sub(dd.mul(d.ybar));
    const line = (cc, ddd) => `x = ${qs(cc)} ${ddd.n < 0 ? '−' : '+'} ${qs(ddd.n < 0 ? ddd.mul(-1) : ddd)}·y`;
    const inv = q(1).div(d.beta);
    return choice({ skill: LS, level: 4, prompt: `Données : ${dataLine(d)}. La droite de y sur x est y = ${qs(d.alpha)} ${d.beta.n < 0 ? '−' : '+'} ${qs(d.beta.n < 0 ? d.beta.neg() : d.beta)}x. Quelle est la droite de régression de x sur y ?`,
      right: line(c, dd), wrongs: [{ html: line(q(0).sub(d.alpha.mul(inv)), inv), rule: 'p_reg_x_on_y' }, { html: line(d.xbar.sub(d.beta.mul(d.ybar)), d.beta), rule: null }],
      fillers: [{ html: line(c.add(1), dd) }, { html: line(q(0), dd) }], key: `mcq:xy:${d.y.join('-')}`, exam: examTag(opts) }, rng);
  }
  const sx2 = sum(d.x.map((v) => v * v));
  const sxy = sum(d.x.map((v, i) => v * d.y[i]));
  return choice({ skill: LS, level: 4, prompt: `Données : ${dataLine(d)}. Quelle est la pente β̂ de la droite des moindres carrés de y sur x ?`, right: qs(d.beta),
    wrongs: [{ html: qs(d.Sxy.div(d.Syy)), rule: 'p_reg_slope_swap' }, { html: qs(q(sxy, sx2)), rule: 'p_reg_sums_raw' }],
    fillers: [{ html: qs(d.beta.mul(2)) }, { html: qs(d.beta.add(1)) }], key: `mcq:b:${d.y.join('-')}`, exam: examTag(opts) }, rng);
}

function lsTf(d, rng, opts) {
  if (rng.chance(0.5)) return tf({ skill: LS, key: 'xy', exam: examTag(opts), truth: true, statement: 'La droite des moindres carrés de y sur x passe par le point (x̄, ȳ).', explanation: 'α̂ = ȳ − β̂x̄, donc ŷ(x̄) = ȳ.' });
  return tf({ skill: LS, key: 'r2', exam: examTag(opts), truth: false, ruleIfTrue: 'p_r2_r', statement: 'Pour une droite des moindres carrés, R² = r (le coefficient de corrélation).',
    explanation: 'R² = r² : par exemple r = 0,775 donne R² = 0,6.',
    counter: numCounter({ vars: [{ v: 'r', label: 'Une corrélation r =' }], hyp: '0<r<1', pred: 'r^2=r', answer: { r: '1/2' } }) });
}

// ======================================================================
// p-reg-test
// ======================================================================

const RT = 'p-reg-test';
const RT_SUB = [
  { id: 'line', label: 'droite', skill: LS },
  { id: 'test', label: 'test', skill: RT },
];

function rtParts(d, which, full) {
  const parts = [];
  // Full problem: β̂ to 3 decimals, α̂ from it to 2 decimals (as a student would).
  const aR = roundTo(d.ybar.valueOf() - roundTo(d.beta.valueOf(), 3) * d.xbar.valueOf(), 2);
  const sum5 = `n = ${d.n}, x̄ = ${qs(d.xbar)}, ȳ = ${qs(d.ybar)}, S_xx = ${qs(d.Sxx)}, S_xy = ${qs(d.Sxy)}, S_yy = ${qs(d.Syy)}`;
  if (full) {
    parts.push({ label: 'β̂', name: 'beta', kind: 'stat', decimals: 3, expect: '$Sxy/$Sxx', action: 'Pente β̂', lines: [{ math: `(${ql(d.Sxy, 4)})/(${ql(d.Sxx, 4)})`, note: 'S_xy/S_xx', subgoal: 'line' }, { math: rl(d.beta.valueOf(), 3) }] });
    parts.push({ label: 'α̂', name: 'alpha', kind: 'stat', decimals: 2, expect: `(${qt(d.ybar)})-$beta×(${qt(d.xbar)})`, action: 'Ordonnée α̂', lines: [{ math: `${qt(d.ybar)}-${wrap(rl(d.beta.valueOf(), 3))}×${ql(d.xbar, 4)}`, subgoal: 'line' }, { math: rl(aR, 2) }] });
  }
  const bTxt = wrap(full ? rl(d.beta.valueOf(), 3) : ql(d.beta, 4));
  const RSSv = d.Syy.valueOf() - (full ? roundTo(d.beta.valueOf(), 3) : d.beta.valueOf()) * d.Sxy.valueOf();
  parts.push({ label: 'RSS', name: 'RSS', kind: 'stat', decimals: 3, expect: full ? `(${qt(d.Syy)})-$beta×(${qt(d.Sxy)})` : qt(d.RSS), action: 'RSS = S_yy − β̂·S_xy',
    lines: [{ math: `${qt(d.Syy)}-${bTxt}×${wrap(ql(d.Sxy, 4))}`, note: 'Somme des carrés des résidus', subgoal: 'test', blank: [bTxt] }, { math: rl(RSSv, 3), blank: [rl(RSSv, 3)] }] });
  // The reference lines follow the rounded values, as a student would.
  const s2v = roundTo(roundTo(RSSv, 3) / (d.n - 2), 3);
  parts.push({ label: 'σ̂²', name: 'sig', kind: 'stat', decimals: 3, expect: `$RSS/${d.n - 2}`, action: 'σ̂² = RSS/(n − 2)',
    traps: { p_reg_sigma_n: { values: [qt(q(Math.round(RSSv * 1e6), 1e6 * d.n)), qt(q(Math.round(RSSv * 1e6), 1e6 * (d.n - 1)))], ctx: { v: d.n - 2 } } },
    wrongActions: [{ label: 'σ̂² = RSS/n', rule: 'p_reg_sigma_n', why: 'Deux paramètres estimés : on divise par n − 2.' }],
    lines: [{ math: `${rl(RSSv, 3)}/${d.n - 2}`, note: 'Deux paramètres estimés : n − 2', subgoal: 'test', blank: [String(d.n - 2)] }, { math: rl(s2v, 3) }] });
  let se;
  let t;
  if (which === 'alpha') {
    se = Math.sqrt(s2v * (1 / d.n + d.xbar.valueOf() ** 2 / d.Sxx.valueOf()));
    parts.push({ label: 'se(α̂)', name: 'se', kind: 'stat', decimals: 3, expect: `√($sig×(1/${d.n}+${ql(d.xbar, 4).replace(',', '.')}^2/(${qt(d.Sxx)})))`, action: 'se(α̂) = σ̂·√(1/n + x̄²/S_xx)',
      traps: { p_reg_se_alpha: { values: [qt(q(Math.round(Math.sqrt(s2v / d.n) * 1e6), 1e6))], ctx: { v: r2(d.xbar.valueOf() ** 2 / d.Sxx.valueOf(), 3) } } },
      wrongActions: [{ label: 'se(α̂) = σ̂/√n', rule: 'p_reg_se_alpha', why: 'L\'ordonnée à l\'origine est une extrapolation en x = 0 : le terme x̄²/S_xx compte.' }],
      lines: [{ math: `√(${rl(s2v, 3)}×(1/${d.n}+${ql(d.xbar, 4)}^2/${ql(d.Sxx, 4)}))`, note: 'Erreur standard de α̂', subgoal: 'test' }, { math: rl(se, 3) }] });
    t = (full ? aR : d.alpha.valueOf()) / roundTo(se, 3);
    parts.push({ label: 't_obs', name: 't', kind: 'stat', decimals: 2, expect: full ? '$alpha/$se' : `(${qt(d.alpha)})/$se`, action: 't_obs = α̂/se(α̂)',
      lines: [{ math: `${wrap(full ? rl(aR, 2) : ql(d.alpha, 4))}/${rl(se, 3)}`, note: 'Sous H₀ : α = 0', subgoal: 'test' }, { math: rl(t, 2) }] });
  } else {
    se = Math.sqrt(s2v / d.Sxx.valueOf());
    parts.push({ label: 'se(β̂)', name: 'se', kind: 'stat', decimals: 3, expect: `√($sig/(${qt(d.Sxx)}))`, action: 'se(β̂) = √(σ̂²/S_xx)',
      lines: [{ math: `√(${rl(s2v, 3)}/${ql(d.Sxx, 4)})`, note: 'Erreur standard de β̂', subgoal: 'test', blank: [ql(d.Sxx, 4)] }, { math: rl(se, 3), blank: [rl(se, 3)] }] });
    t = d.beta.valueOf() / roundTo(se, 3);
    parts.push({ label: 't_obs', name: 't', kind: 'stat', decimals: 2, expect: `(${qt(d.beta)})/$se`, action: 't_obs = β̂/se(β̂)',
      lines: [{ math: `${wrap(ql(d.beta, 4))}/${rl(se, 3)}`, note: 'Sous H₀ : β = 0', subgoal: 'test', blank: [rl(se, 3)] }, { math: rl(t, 2), blank: [rl(t, 2)] }] });
  }
  const nu = d.n - 2;
  const tc = courseT(nu, 5);
  parts.push({ label: 'ν', name: 'nu', kind: 'prob', expect: String(nu), action: 'Degrés de liberté ν = n − 2',
    traps: { p_df_wrong: { values: [String(d.n - 1), String(d.n)], ctx: { ν: nu } } },
    wrongActions: [{ label: `ν = n − 1 = ${d.n - 1}`, rule: 'p_df_wrong', why: 'On perd un degré de liberté par paramètre estimé (α et β) : ν = n − 2.' }],
    lines: [{ math: String(nu), note: 'ν = n − 2', subgoal: 'test', blank: [String(nu)] }] });
  parts.push({ label: 't_c', name: 'tc', kind: 'stat', decimals: 3, expect: '#t($nu,5)', action: 'Lire s₅(ν) dans la Table 3',
    traps: { p_df_wrong: { values: [qt(courseT(d.n - 1, 5))], ctx: { ν: nu } } },
    lines: [{ math: rl(tc, 3), note: `Table 3, ν = ${nu}, colonne s₅`, blank: [rl(tc, 3)] }] });
  const reject = Math.abs(t) > tc;
  const est = which === 'alpha' ? (full ? aR : d.alpha.valueOf()) : d.beta.valueOf();
  const sym = which === 'alpha' ? 'α' : 'β';
  parts.push({ label: `IC(${sym})`, name: 'ic', kind: 'stat', decimals: 2, expect: [`(${qt(est)})-$tc×$se`, `(${qt(est)})+$tc×$se`], title: `IC à 95 % pour ${sym}`, action: `IC : ${sym}̂ ± t_c·se`,
    decisions: [{ prompt: 'Décision au niveau 5 % ?', options: [
      { id: 'rej', label: `Rejeter H₀ : ${sym} = 0, car |t_obs| = ${r2(Math.abs(t))} > ${r2(tc, 3)}`, valid: reject, why: `|t_obs| = ${r2(Math.abs(t))} ≤ ${r2(tc, 3)} : on ne rejette pas.`, rule: reject ? undefined : 'p_pvalue_alpha_compare' },
      { id: 'keep', label: `Ne pas rejeter H₀, car |t_obs| = ${r2(Math.abs(t))} ≤ ${r2(tc, 3)}`, valid: !reject, why: `|t_obs| = ${r2(Math.abs(t))} > ${r2(tc, 3)} : on rejette.`, rule: reject ? 'p_pvalue_alpha_compare' : undefined },
    ] }],
    lines: [{ math: `[${rl(est - tc * roundTo(se, 3), 2)} ; ${rl(est + tc * roundTo(se, 3), 2)}]`, note: `${sym}̂ ± ${r2(tc, 3)}·${r2(se, 3)} ; ${reject ? '0 est hors de l\'IC' : '0 est dans l\'IC'}`, subgoal: 'test' }] });
  // The values of the reference lines (rounded as written), for a part
  // judged without the student's earlier lines (exam coef).
  const ref = { beta: full ? String(roundTo(d.beta.valueOf(), 3)) : qt(d.beta), alpha: full ? String(aR) : qt(d.alpha), Sxy: qt(d.Sxy), Sxx: qt(d.Sxx), RSS: String(roundTo(RSSv, 3)), sig: String(s2v), se: String(roundTo(se, 3)), nu: String(nu), tc: String(tc) };
  for (const p of parts) p.ref = ref;
  return { parts, t, tc, reject, sum5 };
}

function rtInterp(rng, reject, which, n) {
  const what = which === 'alpha' ? 'une ordonnée à l\'origine non nulle' : 'une pente non nulle';
  if (reject) {
    return interp(rng, `Au niveau 5 %, les données demandent ${what}.`, [
      [`La probabilité que ${which === 'alpha' ? 'α' : 'β'} = 0 est inférieure à 5 %.`, 'p_pvalue_h0'],
      ['Le lien est fort et important en pratique, puisque le test rejette.', 'p_significant_large'],
      [`${which === 'alpha' ? 'α' : 'β'} est dans l'IC avec probabilité 0,95.`, 'p_ci_prob'],
    ]);
  }
  return interp(rng, `Avec ${n} points, les données ne suffisent pas à montrer ${what}.`, [
    [which === 'alpha' ? 'L\'élongation est exactement proportionnelle à la masse : c\'est prouvé.' : 'Il n\'y a pas de lien entre x et y : c\'est prouvé.', 'p_accept_h0'],
    [`${which === 'alpha' ? 'α' : 'β'} vaut 0.`, 'p_accept_h0'],
    [`La probabilité que ${which === 'alpha' ? 'α' : 'β'} = 0 est supérieure à 95 %.`, 'p_pvalue_h0'],
  ]);
}

function rtItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return rtTf(rng, opts);
  const which = level >= 4 || opts.exam === 'open' ? 'alpha' : 'beta';
  const full = level === 5 || opts.exam === 'open';
  const d = regData(rng, { ns: which === 'alpha' ? [5, 6, 7] : [5, 6, 7, 8], test: which });
  const { parts, reject, sum5 } = rtParts(d, which, full);
  if (opts.exam === 'mcq') return rtMcq(d, rng, opts);
  const prompt = full
    ? `${SPRINGS} Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Données : ${dataLine(d)} ; résumés : ${sum5}. Calcule α̂ et β̂, puis teste H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 % (l'élongation est-elle proportionnelle à la masse ?).`
    : which === 'alpha'
      ? `Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : ${sum5}, β̂ = ${qs(d.beta)}, α̂ = ${qs(d.alpha)}. Teste H₀ : α = 0 contre H₁ : α ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour α.`
      : `Modèle Yᵢ = α + βxᵢ + εᵢ, εᵢ iid N(0, σ²). Résumés : ${sum5}, β̂ = ${qs(d.beta)}. Teste H₀ : β = 0 contre H₁ : β ≠ 0 au niveau 5 %, puis donne l'IC à 95 % pour β.`;
  const o = {
    skill: RT, level, key: `${level}:${which}:${d.x.join('-')}:${d.y.join('-')}`, prompt, parts,
    hints: H('σ̂² = RSS/(n − 2) : deux paramètres estimés. Puis t_obs = estimation/se, comparé à s₅(n − 2).', `σ̂² = RSS/${d.n - 2}, se = √(σ̂²/…)`, `t_obs = ${r2(which === 'alpha' ? d.tA : d.tB)}`),
    subgoals: RT_SUB, exam: examTag(opts), interpret: rtInterp(rng, reject, which, d.n),
  };
  if (opts.exam === 'coef') return coefItem({ ...o, part: parts.find((p) => p.name === 't'), prompt: `${prompt} Donne t_obs (à 0,01 près).` });
  if (opts.exam === 'open') return openItem(o, 10, rng);
  return statItem(o);
}

function rtMcq(d, rng, opts) {
  return choice({ skill: RT, level: 4, prompt: `Régression simple sur n = ${d.n} points ; somme des carrés des résidus RSS = ${qs(d.RSS)}. Quelle est l'estimation σ̂² de la variance des erreurs ?`,
    right: qs(d.RSS.div(d.n - 2)), wrongs: [{ html: qs(d.RSS.div(d.n)), rule: 'p_reg_sigma_n' }, { html: qs(d.RSS.div(d.n - 1)), rule: 'p_reg_sigma_n' }],
    fillers: [{ html: qs(d.RSS) }, { html: qs(d.RSS.div(2)) }], key: `mcq:${d.n}:${qt(d.RSS)}`, exam: examTag(opts) }, rng);
}

function rtTf(rng, opts) {
  if (rng.chance(0.5)) return tf({ skill: RT, key: 'F', exam: examTag(opts), truth: true, statement: 'En régression simple, le test t de H₀ : β = 0 et le test F de la régression donnent la même décision.', explanation: 'F = T² et le quantile de F(1, n − 2) est le carré de celui de Student.' });
  const n = rng.pick([5, 6, 8, 10]);
  const RSS = rng.pick([q(12, 5), q(6), q(9, 2)]);
  return tf({ skill: RT, key: `s${n}:${qt(RSS)}`, exam: examTag(opts), truth: false, ruleIfTrue: 'p_reg_sigma_n',
    statement: `En régression simple sur n = ${n} points avec RSS = ${qs(RSS)}, on estime σ² par RSS/n = ${qs(RSS.div(n))}.`,
    explanation: `Deux paramètres sont estimés : σ̂² = RSS/(n − 2) = ${qs(RSS.div(n - 2))}.`,
    counter: numCounter({ vars: [{ v: 's', label: 'La bonne valeur de σ̂² =' }], hyp: `s=${qt(RSS.div(n - 2))}`, pred: `s=${qt(RSS.div(n))}`, answer: { s: qt(RSS.div(n - 2)) } }) });
}

// ======================================================================
// p-reg-multi
// ======================================================================

const RM = 'p-reg-multi';
const RM_SUB = [
  { id: 'ne', label: 'équations normales', skill: 'l-orth-lsq' },
  { id: 'F', label: 'test F', skill: RM },
];
const DESIGNS = [
  { story: 'Le poids y d\'un chien dépend de sa taille x, avec une ordonnée propre à chacune de deux races T et H, et la <b>même pente</b> pour les deux races.',
    right: '[1_T, 1_H, x]', collinear: '[1, 1_T, 1_H, x]', separate: '[1_T, 1_H, x·1_T, x·1_H]', other: '[1, x]' },
  { story: 'Le rendement y d\'une culture dépend de la dose d\'engrais x, avec un effet propre à chacun de deux sols A et B, et la <b>même pente</b> pour les deux sols.',
    right: '[1, 1_B, x]', collinear: '[1, 1_A, 1_B, x]', separate: '[1, 1_B, x, x·1_B]', other: '[1_A, 1_B]' },
  { story: 'Le prix y d\'un appartement dépend de sa surface x, avec une ordonnée propre à chacun de deux quartiers N et S, et une <b>pente commune</b>.',
    right: '[1, 1_S, x]', collinear: '[1, 1_N, 1_S, x]', separate: '[1_N, 1_S, x·1_N, x·1_S]', other: '[1, x]' },
];
const colsHtml = (c) => `colonnes ${c.replace(/_([A-Z])/g, '<sub>$1</sub>')}`;

function designMcq(level, rng, opts) {
  const D = rng.pick(DESIGNS);
  return choice({ skill: RM, level, prompt: `${D.story} Quelle matrice de design X (ses colonnes ; 1 = colonne de uns, 1_A = indicatrice du groupe A…) convient au modèle y = Xβ + ε ?`,
    right: colsHtml(D.right), wrongs: [{ html: colsHtml(D.collinear), rule: 'p_design_collinear' }, { html: colsHtml(D.separate), rule: 'p_design_separate_slopes' }, { html: colsHtml(D.other) }],
    key: `design:${D.right}`, exam: examTag(opts), solution: [{ html: 'Deux indicatrices et une colonne de uns seraient liées (1_T + 1_H = 1) ; une seule colonne x donne une pente commune.', note: '' }] }, rng);
}

// The normal equations for y = a + bx (2 × 2).
function neItem(level, rng, opts) {
  const d = regData(rng, { ns: [4, 5] });
  const n = d.n;
  const sx = sum(d.x);
  const sy = sum(d.y);
  const sx2 = sum(d.x.map((v) => v * v));
  const sxy = sum(d.x.map((v, i) => v * d.y[i]));
  const det = n * sx2 - sx * sx;
  const b = q(n * sxy - sx * sy, det);
  const a = q(sx2 * sy - sx * sxy, det);
  return statItem({
    skill: RM, level, key: `${level}:ne:${d.x.join('-')}:${d.y.join('-')}`,
    prompt: `Modèle y = a + bx, données ${dataLine(d)}. Avec X = [1, x] : XᵀX = [[${n}, ${sx}], [${sx}, ${sx2}]] et Xᵀy = (${sy} ; ${sxy}). Résous les équations normales XᵀXβ̂ = Xᵀy.`,
    parts: [
      { label: 'det(XᵀX)', name: 'det', kind: 'prob', expect: String(det), action: 'Déterminant de XᵀX', lines: [{ math: `${n}×${sx2}-${sx}^2`, note: 'n·Σx² − (Σx)²', subgoal: 'ne', blank: [`${sx}^2`] }, { math: String(det), blank: [String(det)] }] },
      { label: 'b̂', name: 'b', kind: 'prob', expect: `(${n}×${sxy}-${sx}×${sy})/$det`, action: 'b̂ par l\'inverse de XᵀX', lines: [{ math: `(${n}×${sxy}-${sx}×${sy})/${det}`, note: 'Deuxième ligne de (XᵀX)⁻¹Xᵀy', subgoal: 'ne', blank: [String(det)] }, { math: qs(b).replace('−', '-') }] },
      { label: 'â', name: 'a', kind: 'prob', expect: `(${sx2}×${sy}-${sx}×${sxy})/$det`, action: 'â par l\'inverse de XᵀX', lines: [{ math: `(${sx2}×${sy}-${sx}×${sxy})/${det}`, note: 'Première ligne', subgoal: 'ne', blank: [String(det)] }, { math: qs(a).replace('−', '-') }] },
    ],
    hints: H('(XᵀX)⁻¹ = (1/det)·[[Σx², −Σx], [−Σx, n]] ; β̂ = (XᵀX)⁻¹Xᵀy.', `det = ${n}·${sx2} − ${sx}² = □`, `b̂ = ${qs(b)}, â = ${qs(a)}`),
    subgoals: RM_SUB, exam: examTag(opts),
  });
}

function fData(rng) {
  for (let t = 0; t < 200; t++) {
    const p = rng.int(3, 5);
    const qq = rng.int(1, p - 1);
    const n = rng.pick([16, 20, 24, 30]);
    const s = rng.pick([q(1), q(3, 2), q(2), q(5, 2)]);
    const SCp = s.mul(n - p);
    const quant = roundTo(fInv(0.95, p - qq, n - p), 2);
    const F = rng.chance(0.5) ? q(Math.round((quant + 1.5 + rng.int(0, 4)) * 4), 4) : q(Math.round((quant * rng.pick([0.3, 0.5])) * 4) || 1, 4);
    const gain = F.mul(s);
    const SCq = SCp.add(gain.mul(p - qq));
    if (!SCq.isInt() || !SCp.isInt() || Math.abs(F.valueOf() - quant) < 0.4) continue;
    return { p, qq, n, SCp, SCq, F, quant };
  }
  return { p: 4, qq: 2, n: 20, SCp: q(30), SCq: q(50), F: q(16, 3), quant: 3.63, fallback: true };
}

function fItem(level, rng, opts) {
  const d = fData(rng);
  const { p, qq, n } = d;
  const reject = d.F.valueOf() > d.quant;
  const prompt = `n = ${n} observations. Modèle complet à p = ${p} colonnes : SC_p = ${qs(d.SCp)} ; modèle réduit à q = ${qq} colonne${qq > 1 ? 's' : ''} : SC_q = ${qs(d.SCq)}. Test F emboîté au niveau 5 % (H₀ : ${p - qq === 1 ? 'le coefficient ajouté est nul' : `les ${p - qq} coefficients ajoutés sont nuls`}). Quantile donné : F_{${p - qq}, ${n - p} ; 0,95} = ${r2(d.quant)}.`;
  const Fv = d.F.valueOf();
  const o = {
    skill: RM, level, key: `${level}:F:${n}:${p}:${qq}:${qt(d.SCp)}:${qt(d.SCq)}`, prompt,
    parts: [
      { label: 'ν₁', name: 'a', kind: 'prob', expect: String(p - qq), action: 'Degrés de liberté du numérateur : p − q',
        traps: { p_f_df_swap: { values: [String(n - p)], ctx: { a: p - qq, b: n - p } } },
        wrongActions: [{ label: `ν₁ = n − p = ${n - p}`, rule: 'p_f_df_swap', why: 'Numérateur : les p − q paramètres ajoutés ; dénominateur : n − p.' }],
        lines: [{ math: `${p}-${qq}`, note: 'Paramètres ajoutés', subgoal: 'F', blank: [String(qq)] }, { math: String(p - qq) }] },
      { label: 'ν₂', name: 'b', kind: 'prob', expect: String(n - p), action: 'Degrés de liberté du dénominateur : n − p',
        traps: { p_f_df_swap: { values: [String(p - qq)], ctx: { a: p - qq, b: n - p } } },
        lines: [{ math: `${n}-${p}`, note: 'Résidus du modèle complet', subgoal: 'F', blank: [String(p)] }, { math: String(n - p) }] },
      { label: 'F', name: 'F', kind: 'stat', decimals: 2, expect: qt(d.F), action: 'F = (gain par paramètre)/(SC_p par degré de liberté)',
        traps: { p_f_ratio_inverted: { values: [qt(q(1).div(d.F))], ctx: {} } },
        wrongActions: [{ label: 'F = (SC_p/(n − p))/((SC_q − SC_p)/(p − q))', rule: 'p_f_ratio_inverted', why: 'Le gain par paramètre ajouté est au numérateur.' }],
        lines: [
          { math: `((${qs(d.SCq)}-${qs(d.SCp)})/${p - qq})/(${qs(d.SCp)}/${n - p})`, note: 'Gain par paramètre ajouté, sur la variance résiduelle', subgoal: 'F', blank: [String(p - qq)] },
          { math: `${ql(d.SCq.sub(d.SCp).div(p - qq), 4)}÷${ql(d.SCp.div(n - p), 4)}`, note: 'Numérateur et dénominateur', blank: [ql(d.SCp.div(n - p), 4)] },
          { math: rl(Fv, 2), note: `Comparer à ${r2(d.quant)}`, blank: [rl(Fv, 2)] },
        ] },
    ],
    hints: H('Numérateur : gain de SC par paramètre ajouté ; dénominateur : SC du modèle complet par degré de liberté.', `F = (${qs(d.SCq.sub(d.SCp))}/${p - qq})/(${qs(d.SCp)}/□)`, `F = ${r2(Fv)}`),
    subgoals: RM_SUB, exam: examTag(opts), fallback: d.fallback,
    interpret: interp(rng, reject ? `F = ${r2(Fv)} > ${r2(d.quant)} : on rejette H₀ ; les variables ajoutées améliorent l'ajustement au-delà du hasard.` : `F = ${r2(Fv)} ≤ ${r2(d.quant)} : on ne rejette pas H₀ ; le modèle réduit suffit pour ces données.`, [
      [reject ? 'Chacune des variables ajoutées est significative.' : 'Les variables ajoutées n\'ont aucun effet : c\'est prouvé.', reject ? null : 'p_accept_h0'],
      [reject ? 'Le modèle complet est le vrai modèle.' : `On rejette H₀, car F = ${r2(Fv)} est positif.`, null],
      ['La probabilité que H₀ soit vraie est inférieure à 5 %.', 'p_pvalue_h0'],
    ], 'Décision et interprétation :'),
  };
  if (opts.exam === 'coef') return coefItem({ ...o, part: o.parts[2], prompt: `${prompt} Calcule F (à 0,01 près).` });
  return statItem(o);
}

function rmItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return designMcq(4, rng, opts);
  if (opts.exam === 'tf') {
    if (rng.chance(0.4)) return tf({ skill: RM, key: 'df', exam: examTag(opts), truth: true, statement: 'Dans le test F de modèles emboîtés, le numérateur a p − q degrés de liberté et le dénominateur n − p.', explanation: 'Numérateur : paramètres ajoutés ; dénominateur : résidus du modèle complet.' });
    return tf({ skill: RM, key: 'inv', exam: examTag(opts), truth: false, statement: 'Pour le modèle y = a + bx, la matrice XᵀX (X = [1, x]) est toujours inversible.',
      explanation: 'Si tous les xᵢ sont égaux, les colonnes 1 et x sont liées : det(XᵀX) = nΣx² − (Σx)² = 0.',
      counter: numCounter({ vars: [{ v: 'a', label: 'x₁ =' }, { v: 'b', label: 'x₂ =' }], pred: '2(a^2+b^2)-(a+b)^2≠0', answer: { a: '1', b: '1' } }) });
  }
  if (level <= 2 || (level === 5 && rng.chance(0.3))) return designMcq(level, rng, opts);
  if (level === 3) return neItem(level, rng, opts);
  return fItem(level, rng, opts);
}

export const GEN = { [LS]: lsItem, [RT]: rtItem, [RM]: rmItem };
void vf; void sq;
