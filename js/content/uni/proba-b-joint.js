// Generators of module P, part b (step U7): joint laws (discrete tables,
// joint densities) and linear combinations of random variables. Catalogue:
// docs/universite/P-probabilites.md. Tools: proba-kit.js, proba-b-kit.js;
// traps: js/cas/rules/pb.js.

import { statItem, coefItem, choice, tf, numCounter, H, SM, examTag } from './proba-kit.js';
import { MT } from './kit.js';
import { q, qt, qs, ql, dl, fr, table } from './proba-b-kit.js';

const pickOf = (rng, xs) => xs[rng.int(0, xs.length - 1)];
const v6 = (x) => String(Number(Number(x).toFixed(6)));
const D = (x) => ql(x); // a decimal of the lines (0,35)

// ======================================================================
// p-joint-disc
// ======================================================================

const JD = 'p-joint-disc';
const JD_SUB = [{ id: 'marg', label: 'marginales, conditionnelle', skill: JD }, { id: 'cov', label: 'covariance', skill: 'p-cov-corr' }];

// A table p[x][y], x ∈ {0, 1}, y ∈ ys, in Q: {kind, ys, p}.
function jdTable(rng, kinds) {
  const kind = pickOf(rng, kinds);
  if (kind === 'uncorr') {
    for (;;) {
      const a = rng.int(1, 4);
      const b = rng.int(1, 6);
      const c = rng.int(1, 5);
      const d = 20 - 2 * a - b - 2 * c;
      if (d < 1 || a * (2 * c + d) === c * (2 * a + b)) continue;
      return { kind, ys: [0, 1, 2], p: [[a, b, a], [c, d, c]].map((r) => r.map((u) => q(u, 20))) };
    }
  }
  const ys = rng.chance(0.5) ? [0, 1] : [0, 1, 2];
  for (;;) {
    const px = q(rng.int(2, 8), 10);
    const pyU = ys.length === 2 ? [rng.int(2, 8)] : [rng.int(1, 5), rng.int(1, 5)];
    const last = 10 - pyU.reduce((s, x) => s + x, 0);
    if (last < 1) continue;
    const py = [...pyU, last].map((u) => q(u, 10));
    let p = [q(1).sub(px), px].map((r) => py.map((s) => r.mul(s)));
    if (kind === 'dep') {
      const delta = q(1, 20);
      p = p.map((r) => [...r]);
      p[0][0] = p[0][0].add(delta); p[1][0] = p[1][0].sub(delta);
      p[0][1] = p[0][1].sub(delta); p[1][1] = p[1][1].add(delta);
      if (p.flat().some((v) => v.n <= 0)) continue;
    }
    return { kind, ys, p };
  }
}

const sumQ = (xs) => xs.reduce((s, x) => s.add(x), q(0));
function jdStats(T) {
  const pX = T.p.map((r) => sumQ(r));
  const pY = T.ys.map((_, j) => T.p[0][j].add(T.p[1][j]));
  const EX = pX[1];
  const EY = sumQ(T.ys.map((y, j) => pY[j].mul(y)));
  const EXY = sumQ(T.ys.map((y, j) => T.p[1][j].mul(y)));
  return { pX, pY, EX, EY, EXY, cov: EXY.sub(EX.mul(EY)) };
}
const jdHtml = (T) => table(['X \\ Y', ...T.ys.map(String)], T.p.map((r, i) => [String(i), ...r.map((v) => qs(v))]));
// A case where p(x, y) differs from the product of the margins.
function badCase(T, st) {
  for (let i = 0; i < 2; i++) for (let j = 0; j < T.ys.length; j++) if (!T.p[i][j].eq(st.pX[i].mul(st.pY[j]))) return [i, j];
  return null;
}

function jdItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return jdMcq(rng, opts);
  if (opts.exam === 'tf') return jdTf(rng, opts);
  const T = jdTable(rng, level === 5 ? ['uncorr'] : level <= 2 ? ['dep', 'indep'] : ['dep', 'indep', 'uncorr', 'dep']);
  const st = jdStats(T);
  const y1 = 1;
  const bad = badCase(T, st);
  const cond = T.p[1][y1].div(st.pY[y1]);
  const wrongCond = T.p[1][y1].div(st.pX[1]);
  const colAt1 = st.pY[1];
  const rowAt0 = st.pX[0];
  const parts = [
    { label: 'p_X(1)', name: 'px1', kind: 'prob', expect: qt(st.pX[1]), action: 'Sommer la ligne X = 1',
      traps: colAt1.eq(st.pX[1]) ? undefined : { p_marginal_wrong_axis: { values: [qt(colAt1)], ctx: { x: 1 } } },
      wrongActions: [{ label: 'Sommer la colonne Y = 1', rule: 'p_marginal_wrong_axis', why: 'La loi de X s\'obtient en sommant sur toutes les valeurs de Y, donc le long de la ligne.' }],
      lines: [{ math: T.p[1].map(D).join('+'), subgoal: 'marg', blank: [D(T.p[1][T.ys.length - 1])] }, { math: D(st.pX[1]) }] },
    { label: 'p_Y(0)', name: 'py0', kind: 'prob', expect: qt(st.pY[0]), action: 'Sommer la colonne Y = 0',
      traps: rowAt0.eq(st.pY[0]) ? undefined : { p_marginal_wrong_axis: { values: [qt(rowAt0)], ctx: { x: 0 } } },
      lines: [{ math: `${D(T.p[0][0])}+${D(T.p[1][0])}`, subgoal: 'marg', blank: [D(T.p[1][0])] }, { math: D(st.pY[0]) }] },
  ];
  const indepDec = bad
    ? { prompt: 'X et Y sont-ils indépendants ?', options: [
      { id: 'no', label: `Non : p(${bad[0]}, ${T.ys[bad[1]]}) = ${qs(T.p[bad[0]][bad[1]])} ≠ p_X(${bad[0]})·p_Y(${T.ys[bad[1]]}) = ${qs(st.pX[bad[0]].mul(st.pY[bad[1]]))}`, valid: true },
      { id: 'yes', label: T.kind === 'uncorr' ? 'Oui, puisque cov(X, Y) = 0' : 'Oui', valid: false, rule: T.kind === 'uncorr' ? 'p_cov_zero_indep' : undefined, why: `Une seule case suffit : p(${bad[0]}, ${T.ys[bad[1]]}) ≠ p_X(${bad[0]})·p_Y(${T.ys[bad[1]]}).` }] }
    : { prompt: 'X et Y sont-ils indépendants ?', options: [
      { id: 'yes', label: 'Oui : chaque case est le produit des marginales', valid: true },
      { id: 'no', label: 'Non', valid: false, why: 'Vérifie chaque case : p(x, y) = p_X(x)·p_Y(y) partout.' }] };
  parts.push({ label: `Pr(X=1|Y=${y1})`, name: 'c', kind: 'prob', expect: `${D(T.p[1][y1])}/(${D(st.pY[y1])})`, action: 'Diviser par la marginale de Y',
    decisions: [indepDec],
    traps: wrongCond.eq(cond) ? undefined : { p_cond_denominator: { values: [qt(wrongCond)], ctx: { pb: qs(st.pY[y1]) } } },
    lines: [{ math: `${D(T.p[1][y1])}/${D(st.pY[y1])}`, subgoal: 'marg', blank: [D(st.pY[y1])] }, ...(qt(cond) === `${D(T.p[1][y1])}/${D(st.pY[y1])}` ? [] : [{ math: qt(cond) }])] });
  if (level >= 4 || T.kind === 'uncorr') {
    parts.push({ label: 'cov(X,Y)', name: 'cov', kind: 'prob', expect: qt(st.cov), action: 'E[XY] − E[X]E[Y]',
      lines: [{ math: `${D(st.EXY)}-${D(st.EX)}×${D(st.EY)}`, subgoal: 'cov' }, { math: D(st.cov) }] });
  }
  return statItem({ skill: JD, level, key: `${level}:${T.kind}:${T.p.flat().map(qt).join(',')}`, exam: examTag(opts),
    prompt: `Loi conjointe de X et Y :${jdHtml(T)}Calcule les marginales p_X(1) et p_Y(0), décide si X et Y sont indépendants, puis Pr(X = 1 | Y = ${y1})${parts.length > 3 ? ' et cov(X, Y)' : ''}.`,
    parts, subgoals: JD_SUB,
    hints: H('Marginales : sommes des lignes et des colonnes ; une seule case où p(x, y) ≠ p_X(x)·p_Y(y) suffit.', `Pr(X = 1 | Y = ${y1}) = ${qs(T.p[1][y1])}/□`, `Pr(X = 1 | Y = ${y1}) = ${qs(cond)}`) });
}

function jdMcq(rng, opts) {
  let T;
  let st;
  do { T = jdTable(rng, ['dep', 'uncorr']); st = jdStats(T); } while (st.pX[1].eq(st.pY[1]));
  const cond = T.p[1][1].div(st.pY[1]);
  const wrongs = [{ html: qs(T.p[1][1].div(st.pX[1])), rule: 'p_cond_denominator' }, { html: qs(T.p[1][1]), rule: null }];
  return choice({ skill: JD, level: 4, key: `mcq:${T.p.flat().map(qt).join(',')}`, exam: examTag(opts),
    prompt: `Loi conjointe de X et Y :${jdHtml(T)}Que vaut Pr(X = 1 | Y = 1) ?`,
    right: qs(cond), wrongs, fillers: [{ html: qs(st.pY[1]) }, { html: qs(st.pX[1]) }, { html: qs(T.p[0][1].div(st.pY[1])) }, { html: qs(q(1).sub(cond.div(2))) }, { html: qs(T.p[1][1].mul(2)) }] }, rng);
}

function jdTf(rng, opts) {
  const T = jdTable(rng, ['uncorr']);
  const st = jdStats(T);
  const [i, j] = badCase(T, st);
  const a = T.p[i][j];
  const b = st.pX[i].mul(st.pY[j]);
  return tf({ skill: JD, key: `uncorr:${T.p.flat().map(qt).join(',')}`, exam: examTag(opts), truth: false, ruleIfTrue: 'p_cov_zero_indep',
    statement: `Pour la loi conjointe ci-dessous, cov(X, Y) = 0, donc X et Y sont indépendants.${jdHtml(T)}`,
    explanation: `Faux : cov(X, Y) = 0, mais p(${i}, ${T.ys[j]}) = ${qs(a)} ≠ p_X(${i})·p_Y(${T.ys[j]}) = ${qs(b)}.`,
    counter: numCounter({ vars: [{ v: 'a', label: `p(${i}, ${T.ys[j]}) =` }, { v: 'b', label: `p_X(${i})·p_Y(${T.ys[j]}) =` }], hyp: `a=${qt(a)}∧b=${qt(b)}`, pred: 'a=b', answer: { a: qt(a), b: qt(b) } }) });
}

function jdCoef(rng) {
  const T = jdTable(rng, ['dep', 'indep']);
  const st = jdStats(T);
  return coefItem({ skill: JD, key: `coef:${T.p.flat().map(qt).join(',')}`, exam: { format: 'coef', points: 1 },
    prompt: `Loi conjointe de X et Y :${jdHtml(T)}Que vaut Pr(X = 1 | Y = 1) ?`,
    parts: [{ label: 'Pr(X=1|Y=1)', kind: 'prob', expect: qt(T.p[1][1].div(st.pY[1])), traps: { p_cond_denominator: { values: [qt(T.p[1][1].div(st.pX[1]))] } }, lines: [{ math: qt(T.p[1][1].div(st.pY[1])) }] }], subgoals: JD_SUB });
}

// ======================================================================
// p-joint-cont
// ======================================================================

const JC = 'p-joint-cont';
const JC_SUB = [{ id: 'fubini', label: 'intégrales itérées', skill: 'a2-fubini-rect' }, { id: 'domain', label: 'bornes du domaine', skill: 'a2-domain-describe' },
  { id: 'improper', label: 'support non borné', skill: 'a2-improper-multi' }, { id: 'joint', label: 'constante, marginales, décision', skill: JC }];
const W = (t) => MT(t, { vars: ['w', 'z'] });

// c·mono with a readable coefficient: w², 2w², (1/2)w.
const cm = (c, mono) => { const t = qt(q(c)); return t === '1' ? mono : t.includes('/') ? `(${t})${mono}` : `${t}${mono}`; };

// Kernels on [0 ; A] × [0 ; B]: {kind, kern, inner (∫ dz, text in w), I, factor, I01}.
function jcKernel(rng, kinds) {
  const kind = pickOf(rng, kinds);
  const A = rng.int(1, 3);
  const B = rng.int(1, 3);
  if (kind === 'wz') {
    const inner = `${cm(B, 'w^2')}+${cm(q(B * B, 2), 'w')}`;
    return { kind, A, B, kern: 'w(w+z)', inner, I: q(B * A ** 3, 3).add(q(B * B * A * A, 4)), I01: q(1, 3).add(q(1, 4)), noCross: q(B * A ** 3, 3), factor: false };
  }
  if (kind === 'sum') {
    const inner = `${cm(B, 'w')}+${qt(q(B * B, 2))}`;
    return { kind, A, B, kern: 'w+z', inner, I: q(B * A * A, 2).add(q(B * B * A, 2)), I01: q(1), factor: false };
  }
  const p = rng.int(1, 2);
  const r = rng.int(1, 2);
  const cz = q(B ** (r + 1), r + 1);
  const inner = `${qt(cz).includes('/') ? `(${qt(cz)})` : qt(cz)}w${p === 1 ? '' : `^${p}`}`;
  return { kind: 'prod', p, r, A, B, kern: `w${p === 1 ? '' : `^${p}`}z${r === 1 ? '' : `^${r}`}`, inner, I: q(A ** (p + 1), p + 1).mul(cz), I01: q(1, (p + 1) * (r + 1)), factor: true };
}

function jcItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return jcMcq(rng, opts);
  if (opts.exam === 'tf') return jcTf(rng, opts);
  if (level === 5) return jcTriangle(rng, opts);
  if (level === 4 && rng.chance(0.3)) return jcExp(rng, opts);
  const K = jcKernel(rng, level <= 2 ? ['wz', 'prod'] : ['wz', 'sum', 'prod']);
  const c = K.I.inv();
  const rect = `[0 ; ${K.A}] × [0 ; ${K.B}]`;
  const cTraps = {};
  if (!(K.A === 1 && K.B === 1)) cTraps.p_normalize_bounds = { values: [qt(K.I01.inv())] };
  const fW = `${qt(c).includes('/') ? `(${qt(c)})` : qt(c)}×(${K.inner})`;
  const parts = [
    { label: '∫f dz', name: 'in', kind: 'prob', vars: ['w'], domain: { w: [0.1, K.A] }, expect: K.inner, action: 'Intégrer en z (w fixé)', title: `Intégrale intérieure ∫₀^${K.B} (${K.kern}) dz`,
      traps: K.B === 1 ? undefined : { p_marginal_bounds: { values: [jcInner(K, 1)] } },
      lines: [{ math: K.inner, subgoal: 'fubini', blank: [K.inner] }] },
    { label: 'I', name: 'I', kind: 'prob', expect: qt(K.I), action: 'Intégrer en w',
      traps: K.kind === 'wz' ? { p_normalize_bounds: { values: [qt(K.I01)] } } : undefined,
      lines: [{ math: jcOuter(K), subgoal: 'fubini' }, { math: qt(K.I) }].filter((l, i, a) => i === 0 || a[0].math !== l.math) },
    { label: 'c', name: 'c', kind: 'prob', expect: '1/$I', action: 'Résoudre c·I = 1', traps: Object.keys(cTraps).length ? cTraps : undefined,
      lines: [{ math: `1/${qt(K.I).includes('/') ? `(${qt(K.I)})` : qt(K.I)}`, subgoal: 'joint' }, ...(qt(c) === `1/${qt(K.I)}` ? [] : [{ math: qt(c) }])] },
    { label: 'f_W(w)', name: 'fW', kind: 'prob', vars: ['w'], domain: { w: [0.1, K.A] }, expect: fW, action: 'Marginale : c fois l\'intégrale intérieure', title: `Marginale de W sur [0 ; ${K.A}]`,
      decisions: [{ prompt: 'W et Z sont-elles indépendantes ?', levels: [2, 3, 4, 5], options: K.factor
        ? [{ id: 'yes', label: 'Oui : f se factorise en (fonction de w)·(fonction de z) sur un rectangle', valid: true }, { id: 'no', label: 'Non', valid: false, why: 'f(w, z) = c·w^p·z^q sur un rectangle : elle se factorise.' }]
        : [{ id: 'no', label: `Non : ${K.kern} ne se factorise pas en (fonction de w)·(fonction de z)`, valid: true }, { id: 'yes', label: 'Oui, le support est un rectangle', valid: false, rule: 'p_joint_support_indep', why: 'Il faut aussi que f se factorise ; ici elle ne se factorise pas.' }] }],
      lines: [{ math: fW, subgoal: 'joint', blank: [K.inner] }] },
  ];
  return statItem({ skill: JC, level, key: `${level}:${K.kind}:${K.kern}:${K.A}:${K.B}`, exam: examTag(opts),
    prompt: `(W, Z) a pour densité f(w, z) = ${W(K.kind === 'sum' ? `c×(${K.kern})` : `c×${K.kern}`)} sur ${rect}, et 0 ailleurs. Calcule l'intégrale intérieure en z, l'intégrale double I du noyau, c, puis la marginale de W.`,
    parts, subgoals: JC_SUB.filter((s) => s.id === 'fubini' || s.id === 'joint'),
    hints: H('Intègre d\'abord en z (w fixé), puis en w ; ∬ f = 1 donne c.', `∫₀^${K.B} (${K.kern}) dz = □`, `I = ${qs(K.I)}, c = ${qs(c)}, f_W(w) = ${SM(fW, { vars: ['w'] })}`) });
}
// ∫₀^b of the kernel in z, with another upper bound b (text in w).
function jcInner(K, b) {
  if (K.kind === 'wz') return `${cm(b, 'w^2')}+${cm(q(b * b, 2), 'w')}`;
  if (K.kind === 'sum') return `${cm(b, 'w')}+${qt(q(b * b, 2))}`;
  const cz = q(b ** (K.r + 1), K.r + 1);
  return `(${qt(cz)})w${K.p === 1 ? '' : `^${K.p}`}`;
}
function jcOuter(K) {
  if (K.kind === 'wz') return `${K.B}×${K.A}^3/3+${qt(q(K.B * K.B, 2))}×${K.A}^2/2`;
  if (K.kind === 'sum') return `${K.B}×${K.A}^2/2+${qt(q(K.B * K.B, 2))}×${K.A}`;
  return qt(K.I);
}

// Level 5 (série 7): c·xy on the triangle x + y ≤ 1.
function jcTriangle(rng, opts) {
  return statItem({ skill: JC, level: 5, key: '5:tri', exam: examTag(opts), hints: [],
    prompt: `(X, Y) a pour densité f(x, y) = ${MT('c×x×y', { vars: ['x', 'y'] })} sur le triangle x ≥ 0, y ≥ 0, x + y ≤ 1. Calcule l'intégrale intérieure en y, I, c, la marginale de X, puis décide de l'indépendance.`,
    parts: [
      { label: '∫f dy', name: 'in', kind: 'prob', vars: ['x'], domain: { x: [0.05, 0.95] }, expect: 'x(1-x)^2/2', title: 'Intégrale intérieure ∫₀^(1−x) xy dy',
        traps: { p_marginal_bounds: { values: ['x/2'] } }, lines: [{ math: 'x(1-x)^2/2', subgoal: 'domain' }] },
      { label: 'I', name: 'I', kind: 'prob', expect: '1/24', lines: [{ math: '1/24', subgoal: 'fubini' }] },
      { label: 'c', name: 'c', kind: 'prob', expect: '1/$I', traps: { p_marginal_bounds: { values: ['4'] } }, lines: [{ math: '24', subgoal: 'joint' }] },
      { label: 'f_X(x)', name: 'fX', kind: 'prob', vars: ['x'], domain: { x: [0.05, 0.95] }, expect: '12x(1-x)^2', title: 'Marginale de X sur [0 ; 1]',
        decisions: [{ prompt: 'X et Y sont-elles indépendantes ?', options: [
          { id: 'no', label: 'Non : le support n\'est pas un rectangle (si x = 0,9, y ≤ 0,1)', valid: true },
          { id: 'yes', label: 'Oui : f se factorise en x·y', valid: false, rule: 'p_joint_support_indep', why: 'Le support n\'est pas un rectangle : si x = 0,9, y ne peut pas dépasser 0,1.' }] }],
        lines: [{ math: '12x(1-x)^2', subgoal: 'joint' }] },
    ], subgoals: JC_SUB.filter((s) => s.id !== 'improper') });
}

// Exponential kernel (corrigé 2018): c·y·e^(−3x − 2y) on ]0 ; ∞[².
function jcExp(rng, opts) {
  const a = pickOf(rng, [2, 3]);
  const b = pickOf(rng, [1, 2]);
  const c = a * b * b;
  return statItem({ skill: JC, level: 4, key: `4:exp:${a}:${b}`, exam: examTag(opts),
    prompt: `(X, Y) a pour densité f(x, y) = ${MT(`c×y×e^(-${a}x-${b}y)`, { vars: ['x', 'y'] })} pour x > 0, y > 0. Calcule les deux intégrales simples, c, puis la marginale de Y.`,
    parts: [
      { label: '∫e^(−ax)dx', name: 'A', kind: 'prob', expect: `1/${a}`, title: `∫₀^∞ e^(−${a}x) dx`, lines: [{ math: `1/${a}`, subgoal: 'improper' }] },
      { label: '∫ye^(−by)dy', name: 'B', kind: 'prob', expect: `1/${b * b}`, title: `∫₀^∞ y·e^(−${b}y) dy`, lines: b === 1 ? [{ math: '1', subgoal: 'improper' }] : [{ math: `1/${b}^2`, subgoal: 'improper' }, { math: `1/${b * b}` }] },
      { label: 'c', name: 'c', kind: 'prob', expect: '1/($A*$B)', lines: [{ math: String(c), subgoal: 'joint' }] },
      { label: 'f_Y(y)', name: 'fY', kind: 'prob', vars: ['y'], domain: { y: [0.1, 3] }, expect: `${b * b}y×e^(-${b}y)`, title: 'Marginale de Y', lines: [{ math: `${b * b}y×e^(-${b}y)`, subgoal: 'joint' }] },
    ],
    subgoals: JC_SUB.filter((s) => s.id === 'improper' || s.id === 'joint'),
    hints: H('Le noyau se sépare : c·(∫ e^(−ax) dx)·(∫ y e^(−by) dy) = 1.', `c·(1/${a})·(□) = 1`, `c = ${c}, f_Y(y) = ${b * b}y·e^(−${b}y)`) });
}

function jcMcq(rng, opts) {
  const K = jcKernel(rng, ['wz']);
  const c = K.I.inv();
  const wrongs = [{ html: qs(K.I01.inv()), rule: 'p_normalize_bounds' }, { html: qs(K.noCross.inv()), rule: null }];
  return choice({ skill: JC, level: 4, key: `mcq:${K.A}:${K.B}`, exam: examTag(opts),
    prompt: `(W, Z) a pour densité f(w, z) = c·w(w + z) sur [0 ; ${K.A}] × [0 ; ${K.B}], et 0 ailleurs. Que vaut c ?`,
    right: qs(c), wrongs, fillers: [{ html: qs(K.I) }, { html: qs(c.mul(2)) }, { html: qs(c.div(2)) }] }, rng);
}

function jcTf(rng, opts) {
  if (rng.chance(0.3)) {
    return tf({ skill: JC, key: 'rect', exam: examTag(opts), truth: true, statement: 'Si f(x, y) = 4xy sur [0 ; 1]², alors X et Y sont indépendantes.', explanation: 'Vrai : f = (2x)·(2y) sur un rectangle : c\'est le produit des marginales.' });
  }
  return tf({ skill: JC, key: 'tri', exam: examTag(opts), truth: false, ruleIfTrue: 'p_joint_support_indep',
    statement: 'Si f(x, y) = 24xy sur le triangle x ≥ 0, y ≥ 0, x + y ≤ 1, X et Y sont indépendantes, parce que f se factorise.',
    explanation: 'Faux : f_X(x) = 12x(1 − x)², donc f_X(0,9)·f_Y(0,9) > 0 alors que f(0,9 ; 0,9) = 0 (le point est hors du triangle).',
    counter: numCounter({ vars: [{ v: 'u', label: 'f_X(0,9)·f_Y(0,9) =' }, { v: 'v', label: 'f(0,9 ; 0,9) =' }], hyp: 'u>0∧v=0', pred: 'u=v', answer: { u: '0,011664', v: '0' } }) });
}

function jcCoef(rng) {
  const K = jcKernel(rng, ['wz', 'sum', 'prod']);
  return coefItem({ skill: JC, key: `coef:${K.kind}:${K.kern}:${K.A}:${K.B}`, exam: { format: 'coef', points: 1 },
    prompt: `(W, Z) a pour densité f(w, z) = ${W(K.kind === 'sum' ? `c×(${K.kern})` : `c×${K.kern}`)} sur [0 ; ${K.A}] × [0 ; ${K.B}], et 0 ailleurs. Que vaut c ?`,
    parts: [{ label: 'c', kind: 'prob', expect: qt(K.I.inv()), traps: K.A === 1 && K.B === 1 ? undefined : { p_normalize_bounds: { values: [qt(K.I01.inv())] } }, lines: [{ math: qt(K.I.inv()) }] }], subgoals: JC_SUB.filter((s) => s.id === 'joint') });
}

// ======================================================================
// p-lin-combo
// ======================================================================

const LC = 'p-lin-combo';
const LC_SUB = [{ id: 'lin', label: 'linéarité, variance', skill: LC }, { id: 'cov', label: 'covariance', skill: 'p-cov-corr' }];
const coefT = (a) => (a === 1 ? '' : a === -1 ? '−' : String(a).replace('-', '−'));
const term = (a, v, first) => `${a < 0 ? ' − ' : first ? '' : ' + '}${coefT(Math.abs(a))}${v}`;
const sq = (a) => `${a < 0 ? `(${a})` : a}^2`;

function lcPortfolio(rng) {
  for (;;) {
    const a = pickOf(rng, [-2, -1, 2, 3]);
    const b = pickOf(rng, [-1, 1, 2]);
    const E = [rng.int(-3, 5), rng.int(-3, 5), rng.int(-3, 5)];
    const V = [rng.int(1, 9), rng.int(1, 9), rng.int(1, 9)];
    const g = rng.int(-2, 2);
    const cBC = rng.int(-2, 2);
    if (g * g > V[0] * V[1] || cBC * cBC > V[1] * V[2] || g === 0) continue;
    const EAB = g + E[0] * E[1];
    const mu = E[0] + a * E[1] + b * E[2];
    const cross = 2 * (a * g + a * b * cBC);
    const v = V[0] + a * a * V[1] + b * b * V[2] + cross;
    if (v <= 0) continue;
    return { a, b, E, V, g, cBC, EAB, mu, v, cross,
      noCov: V[0] + a * a * V[1] + b * b * V[2], scale: V[0] + a * V[1] + b * V[2] + cross, diff: V[0] + Math.sign(a) * a * a * V[1] + Math.sign(b) * b * b * V[2] + cross };
  }
}

function lcItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return lcMcq(rng, opts);
  if (opts.exam === 'tf') return lcTf(rng, opts);
  if (level >= 3 && rng.chance(0.3)) return lcXY(level, rng, opts);
  const P = lcPortfolio(rng);
  const { a, b, E, V, g, cBC } = P;
  const Xt = `X_A${term(a, 'X_B', false)}${term(b, 'X_C', false)}`;
  const varTraps = {};
  if (P.noCov !== P.v) varTraps.p_var_sum_cov = { values: [String(P.noCov)], ctx: { c: g, a: 1, b: a } };
  if (P.scale !== P.v) varTraps.p_var_scale = { values: [String(P.scale)], ctx: { a, a2: a * a } };
  if (P.diff !== P.v && P.diff !== P.scale) varTraps.p_var_diff = { values: [String(P.diff)] };
  const varLine = `${V[0]}+${sq(a)}×${V[1]}+${sq(b)}×${V[2]}+2×(${a}×(${g})+${a}×${b}×(${cBC}))`.replace(/\+-/g, '-');
  return statItem({ skill: LC, level, key: `${level}:port:${a}:${b}:${E}:${V}:${g}:${cBC}`, exam: examTag(opts),
    prompt: `X = ${Xt}, avec E[X_A] = ${fr(E[0])}, E[X_B] = ${fr(E[1])}, E[X_C] = ${fr(E[2])} ; var(X_A) = ${V[0]}, var(X_B) = ${V[1]}, var(X_C) = ${V[2]} ; cov(X_B, X_C) = ${fr(cBC)}, E[X_A X_B] = ${fr(P.EAB)}, et X_A, X_C indépendants. Calcule E[X], cov(X_A, X_B), var(X) et l'écart-type de X.`,
    parts: [
      { label: 'E[X]', name: 'mu', kind: 'prob', expect: String(P.mu), action: 'Linéarité de l\'espérance',
        lines: [{ math: `${E[0]}+${a}×(${E[1]})+${b}×(${E[2]})`.replace(/\+-/g, '-'), subgoal: 'lin', blank: [`(${E[2]})`] }, { math: String(P.mu) }] },
      { label: 'cov(X_A,X_B)', name: 'g', kind: 'prob', expect: `${P.EAB}-(${E[0]})×(${E[1]})`, action: 'cov = E[XY] − E[X]E[Y]',
        lines: [{ math: `${P.EAB}-(${E[0]})×(${E[1]})`, subgoal: 'cov', blank: [String(P.EAB)] }, { math: String(g) }] },
      { label: 'var(X)', name: 'v', kind: 'prob', expect: `${V[0]}+${a * a}*${V[1]}+${b * b}*${V[2]}+2*(${a}*$g+${a * b}*(${cBC}))`, action: 'Coefficients au carré, puis 2ab·cov pour chaque paire',
        traps: varTraps,
        wrongActions: [{ label: 'Additionner les variances', rule: 'p_var_sum_cov', why: 'X_A et X_B ne sont pas indépendants : ajoute 2·a·b·cov pour chaque paire.' }, { label: 'Multiplier les variances par les coefficients', rule: 'p_var_scale', why: 'Les coefficients sortent au carré.' }],
        lines: [{ math: varLine, subgoal: 'lin', blank: [sq(a)] }, { math: String(P.v) }] },
      { label: 'σ', name: 's', kind: 'stat', decimals: 2, expect: '√($v)', action: 'Racine', lines: [{ math: `√${P.v}`, subgoal: 'lin' }, ...(Number.isInteger(Math.sqrt(P.v)) ? [{ math: String(Math.sqrt(P.v)) }] : [{ math: dl(Math.sqrt(P.v), 2) }])] },
    ], subgoals: LC_SUB,
    hints: H('Les coefficients sortent au carré ; chaque paire de variables donne un terme 2·a·b·cov.', `var(X) = ${V[0]} + ${a * a}·${V[1]} + ${b * b}·${V[2]} + 2(□)`, `var(X) = ${P.v}`) });
}

// var(XY) for independent X, Y (EE-209 2023, Q4).
function lcXY(level, rng, opts) {
  const [ex, ey] = [rng.int(1, 3), rng.int(1, 3)];
  const [vx, vy] = [rng.int(1, 4), rng.int(1, 4)];
  const A = vx + ex * ex;
  const B = vy + ey * ey;
  const v = A * B - (ex * ey) ** 2;
  return statItem({ skill: LC, level, key: `${level}:xy:${ex}:${ey}:${vx}:${vy}`, exam: examTag(opts),
    prompt: `X et Y sont indépendantes, E[X] = ${ex}, var(X) = ${vx}, E[Y] = ${ey}, var(Y) = ${vy}. Calcule var(XY).`,
    parts: [
      { label: 'E[X²]', name: 'A', kind: 'prob', expect: String(A), lines: [{ math: `${vx}+${ex}^2`, subgoal: 'lin' }, { math: String(A) }] },
      { label: 'E[Y²]', name: 'B', kind: 'prob', expect: String(B), lines: [{ math: `${vy}+${ey}^2`, subgoal: 'lin' }, { math: String(B) }] },
      { label: 'var(XY)', name: 'v', kind: 'prob', expect: `$A*$B-${(ex * ey) ** 2}`, traps: { p_var_xy: { values: [String(vx * vy)], ctx: { v } } },
        lines: [{ math: `${A}×${B}-(${ex}×${ey})^2`, subgoal: 'lin' }, { math: String(v) }] },
    ], subgoals: LC_SUB.slice(0, 1),
    hints: H('Pour X, Y indépendantes, var(XY) = E[X²]E[Y²] − (E[X]E[Y])².', `var(XY) = ${A}·${B} − □`, `var(XY) = ${v}`) });
}

function lcMcq(rng, opts) {
  const [ex, ey] = [rng.int(1, 3), rng.int(1, 3)];
  const [vx, vy] = [rng.int(1, 3), rng.int(1, 3)];
  const v = (vx + ex * ex) * (vy + ey * ey) - (ex * ey) ** 2;
  return choice({ skill: LC, level: 4, key: `mcq:${ex}:${ey}:${vx}:${vy}`, exam: examTag(opts),
    prompt: `X et Y sont indépendantes, E[X] = ${ex}, var(X) = ${vx}, E[Y] = ${ey}, var(Y) = ${vy}. Que vaut var(XY) ?`,
    right: String(v), wrongs: [{ html: String(vx * vy), rule: 'p_var_xy' }, { html: String((vx + ex * ex) * (vy + ey * ey)), rule: null }],
    fillers: [{ html: String(vx + vy) }, { html: String(v + 1) }, { html: String(ex * ey) }] }, rng);
}

function lcTf(rng, opts) {
  if (rng.chance(0.4)) return tf({ skill: LC, key: 'lin', exam: examTag(opts), truth: true, statement: 'Pour toutes variables X, Y (d\'espérance finie), E[2X − 3Y + 1] = 2E[X] − 3E[Y] + 1.', explanation: 'Vrai : l\'espérance est linéaire, sans condition d\'indépendance.' });
  return tf({ skill: LC, key: 'diff', exam: examTag(opts), truth: false, ruleIfTrue: 'p_var_diff',
    statement: 'Pour X, Y indépendantes, var(X − Y) = var(X) − var(Y).',
    explanation: 'Faux : var(X − Y) = var(X) + (−1)²·var(Y) = var(X) + var(Y). Avec var(X) = var(Y) = 1 : 2, pas 0.',
    counter: numCounter({ vars: [{ v: 'u', label: 'var(X) =' }, { v: 'v', label: 'var(Y) =' }], hyp: 'u≥0∧v>0', pred: 'u+v=u-v', answer: { u: '1', v: '1' } }) });
}

function lcCoef(rng) {
  const P = lcPortfolio(rng);
  const { a, b, E, V, g, cBC } = P;
  return coefItem({ skill: LC, key: `coef:${a}:${b}:${V}:${g}:${cBC}`, exam: { format: 'coef', points: 1 },
    prompt: `X = X_A${term(a, 'X_B', false)}${term(b, 'X_C', false)}, avec var(X_A) = ${V[0]}, var(X_B) = ${V[1]}, var(X_C) = ${V[2]}, cov(X_A, X_B) = ${fr(g)}, cov(X_B, X_C) = ${fr(cBC)}, X_A et X_C indépendants. Que vaut var(X) ?`,
    parts: [{ label: 'var(X)', kind: 'prob', expect: String(P.v), traps: { p_var_sum_cov: { values: [String(P.noCov)] }, p_var_scale: { values: [String(P.scale)] } }, lines: [{ math: String(P.v) }] }], subgoals: LC_SUB });
}

export const GEN = {
  [JD]: (level, rng, profile, opts = {}) => (opts.exam === 'coef' ? jdCoef(rng) : jdItem(level, rng, profile, opts)),
  [JC]: (level, rng, profile, opts = {}) => (opts.exam === 'coef' ? jcCoef(rng) : jcItem(level, rng, profile, opts)),
  [LC]: (level, rng, profile, opts = {}) => (opts.exam === 'coef' ? lcCoef(rng) : lcItem(level, rng, profile, opts)),
};
void ql;
