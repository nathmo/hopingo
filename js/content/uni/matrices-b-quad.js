// Generators of m-quad-gradient (module M, part b, step U8). Catalogue:
// docs/universite/L-M-algebre-lineaire.md, M, `m-quad-gradient`.
//
// f = ½xᵀAx − bᵀx + c with A symmetric whole (A = [[2p, r], [r, 2s]] for
// f = px² + rxy + sy² − …), x* whole, b = Ax*. Parts: A and b (`mat`), ∇f
// as a vector of polynomials (`mat` with vars, cfg.qgrad for the traps),
// x* (`mat`), then the nature (decision) and f(x*) (`value`). Level 4: three
// variables, or f = xᵀMx − bᵀx with M not symmetric. Level 5: f = ‖Ax − b‖²
// (the normal equations).

import * as MX from '../../cas/matrix.js';
import { gradText } from '../../cas/rules/mb.js';
import { q, mt, vt, MLm, fq, qt, mcqDistinct, tfL, examTag, withCells, lsqReverse } from './alglin-kit.js';
import { MT } from './kit.js';
import { par, eq, menu, hints3, modeOf, menuOf, partsItem, vR, maxAbs } from './matrices-b-kit.js';

const QG = 'm-quad-gradient';
const QG_SUB = [
  { id: 'grad', label: 'gradient', skill: 'a2-partials' },
  { id: 'solve', label: 'résoudre Ax = b', skill: 'l-mat-inverse' },
  { id: 'nature', label: 'nature du point', skill: 'm-posdef' },
  { id: 'hess', label: 'hessienne', skill: 'a2-hessian-2x2' },
];
const QG_MENU = [
  { id: 'A', label: 'Lire A sur les termes de degré 2', why: 'A est déjà écrite.' },
  { id: 'b', label: 'Lire b sur les termes de degré 1', why: 'Ce n\'est pas l\'étape demandée ici.' },
  { id: 'grad', label: 'Écrire ∇f = Ax − b', why: 'Il faut d\'abord A et b.' },
  { id: 'solve', label: 'Résoudre Ax = b', why: 'Il faut d\'abord ∇f.' },
  { id: 'value', label: 'Évaluer f(x*) = c − ½bᵀx*', why: 'Il faut d\'abord le point x*.' },
];
const VARS = ['x', 'y', 'z'];

// The polynomial f in x, y, z: ½xᵀAx − bᵀx + c, as text (CAS).
function polyText(A, b, c, { half = true } = {}) {
  const n = A.length;
  const terms = [];
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      const k = i === j ? (half ? A[i][i].div(2) : A[i][i]) : (half ? A[i][j] : A[i][j].add(A[j][i]));
      terms.push([k, i === j ? `${VARS[i]}^2` : `${VARS[i]} ${VARS[j]}`]);
    }
  }
  b.forEach((x, i) => terms.push([q(x).neg(), VARS[i]]));
  terms.push([q(c), '']);
  let s = '';
  for (const [k, m] of terms) {
    if (k.n === 0) continue;
    const abs = k.n < 0 ? k.neg() : k;
    const coef = m && abs.eq(1) ? '' : abs.d === 1 ? String(abs) : `(${abs})`;
    s += `${k.n < 0 ? '-' : s ? '+' : ''}${coef}${m}`;
  }
  return s || '0';
}
const fML = (A, b, c, opts) => MT(polyText(A, b, c, opts), { vars: VARS });
const gradR = (t) => t.replace(/-/g, ' − ').replace(/\+/g, ' + ').replace(/\s+/g, ' ').replace(/\( − /, '(−').replace(/; − /g, '; −');
const xsOf = (n) => `(${VARS.slice(0, n).join(' ; ')})`;

function natureOf(A) {
  const n = A.length;
  const m = Array.from({ length: n }, (_, k) => MX.det(A.slice(0, k + 1).map((r) => r.slice(0, k + 1))).valueOf());
  if (m.every((x) => x > 0)) return 'min';
  if (m.every((x, k) => (k % 2 === 0 ? x < 0 : x > 0))) return 'max';
  return 'saddle';
}

// A, x*, b = Ax*, c. kind: 'pd' (3 in 4), 'indef' (saddle) or 'nd'.
function quadData(rng, n = 2, { kind = null } = {}) {
  const want = kind ?? (rng.chance(0.75) ? 'pd' : rng.chance(0.7) ? 'indef' : 'nd');
  for (let t = 0; t < 400; t++) {
    const A = MX.zeros(n, n);
    for (let i = 0; i < n; i++) {
      A[i][i] = q(2 * rng.pick(want === 'pd' ? [1, 1, 2, 3] : want === 'nd' ? [-1, -2, -3] : [1, 2, -1, 3, -2]));
      for (let j = 0; j < i; j++) { const r = q(rng.int(-3, 3)); A[i][j] = r; A[j][i] = r; }
    }
    if (A.every((r, i) => r.every((x, j) => i === j || x.n === 0))) continue;
    const nat = natureOf(A);
    if ({ pd: 'min', nd: 'max', indef: 'saddle' }[want] !== nat) continue;
    if (MX.det(A).n === 0) continue;
    const x = Array.from({ length: n }, () => q(rng.int(-2, 2)));
    if (x.filter((v) => v.n !== 0).length < Math.min(2, n)) continue;
    const b = MX.matVec(A, x);
    if (maxAbs([b]) > 12 || b.some((v) => v.n === 0)) continue;
    const c = q(rng.int(-3, 3));
    const fx = c.sub(MX.dot(b, x).div(2));
    return { A, x, b, c, fx, n, nat };
  }
  const A = MX.mat([[2, 1], [1, 4]]);
  const x = [q(1), q(1)];
  const b = MX.matVec(A, x);
  return { A, x, b, c: q(0), fx: q(-4), n: 2, nat: 'min', fallback: true };
}

const NAT_R = { min: 'minimum global', max: 'maximum global', saddle: 'point selle' };

function natureDecision(d, rng, minors = false) {
  const diagPos = d.A.every((r, i) => r[i].n > 0);
  const why = {
    min: d.nat === 'saddle' ? 'A n\'est pas définie positive : ses mineurs ne sont pas tous > 0 (det A < 0 ici).' : 'A n\'est pas définie positive.',
    max: 'Pour un maximum, il faudrait A définie négative.',
    saddle: 'A est définie (positive ou négative) : x* est un extremum global.',
  };
  const label = {
    min: 'Minimum global : A est définie positive',
    max: 'Maximum global : A est définie négative',
    saddle: 'Point selle : A est indéfinie',
  };
  const opts = ['min', 'max', 'saddle'].map((k) => ({ id: k, label: label[k], valid: k === d.nat, why: k === d.nat ? undefined : why[k] }));
  if (d.nat === 'saddle' && diagPos) opts.push({ id: 'diag', label: 'Minimum global : la diagonale de A est positive', valid: false, rule: 'l_posdef_diag', why: 'Une diagonale positive ne suffit pas : det A < 0, A a une valeur propre négative.' });
  return { kind: 'decision', prompt: `Quelle est la nature de x* ?${minors ? ` (Mineurs principaux de A : ${minorsR(d.A)}.)` : ''}`, options: rng.shuffle(opts) };
}
const minorsR = (A) => Array.from({ length: A.length }, (_, k) => fq(MX.det(A.slice(0, k + 1).map((r) => r.slice(0, k + 1))))).join(', ');

function quadParts(d, rng, { guided = false, menuOn = false, gradDecision = false, nature = true } = {}) {
  const M = (id) => (menuOn ? { menu: menuOf(QG_MENU, id) } : {});
  const names = { A: mt(d.A) };
  const vars = VARS.slice(0, d.n);
  const gt = gradText(d.A, d.b.map(qt));
  const cellsM = (A) => rng.shuffle(A.flatMap((r, i) => r.map((_, j) => [i, j])).filter(([i, j]) => j >= i)).slice(0, 2).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const aLine = eq(mt(d.A), 'Diagonale : 2 × coefficient de x², y² ; hors diagonale : coefficient de xy', 'hess');
  const bLine = eq(vt(d.b), 'Les coefficients de degré 1, changés de signe', 'grad');
  const gLine = eq(gt, 'Ligne par ligne', 'grad');
  const xLine = eq(vt(d.x), 'Le système Ax = b', 'solve');
  const ps = [
    { judge: { kind: 'mat', expect: mt(d.A), ...M('A') }, start: 'A', html: 'La matrice A de ½xᵀAx (symétrique)', ask: 'A =', lines: [guided ? withCells(aLine, cellsM(d.A)) : aLine] },
    { judge: { kind: 'mat', expect: vt(d.b), ...M('b') }, start: 'b', html: 'Le vecteur b de −bᵀx', ask: 'b =', lines: [guided ? withCells(bLine, [[0, 0]]) : bLine] },
    { judge: { kind: 'mat', expect: gt, vars, names, qgrad: { A: mt(d.A), b: d.b.map(qt) }, ...M('grad') }, start: '∇f', html: 'Le gradient ∇f', ask: '∇f =',
      pre: gradDecision ? [{ kind: 'decision', prompt: 'Que vaut ∇f pour f = ½xᵀAx − bᵀx + c ?', options: rng.shuffle(menu('Ax − b', [
        ['2Ax − b', '∇(xᵀAx) = 2Ax, mais le ½ devant le compense : ∇(½xᵀAx) = Ax.', 'm_grad_factor'],
        ['½Ax − b', 'Le ½ se simplifie avec le 2 de ∇(xᵀAx) = 2Ax : il ne reste pas de ½.', 'm_grad_factor'],
      ])) }] : [],
      lines: [eq(`A·${xsOf(d.n)} - ${vt(d.b)}`, 'Ax − b', 'grad'), guided ? withCells(gLine, [[d.n - 1, 0]]) : gLine] },
    { judge: { kind: 'mat', expect: vt(d.x), names, ...M('solve') }, start: 'x*', html: 'Le point stationnaire : ∇f = 0', ask: 'x* =', lines: [eq(`A^(-1)·${vt(d.b)}`, 'Ax = b', 'solve'), guided ? withCells(xLine, [[0, 0]]) : xLine] },
  ];
  if (nature) {
    const bx = d.b.map((v, i) => `${par(v)}×${par(d.x[i])}`).join('+');
    ps.push({ judge: { kind: 'value', expect: qt(d.fx), ...M('value') }, start: 'f', html: 'La valeur f(x*) = c − ½bᵀx*', ask: 'f(x*) =', pre: [natureDecision(d, rng, guided)],
      lines: [eq(`${d.c.n ? `${qt(d.c)}` : ''}-1/2×(${bx})`, 'f(x*) = c − ½bᵀx*', 'nature'), eq(qt(d.fx), '', 'nature')] });
  }
  return ps;
}

const qgHints = (d) => hints3(
  'Écris f = ½xᵀAx − bᵀx + c : alors ∇f = Ax − b, et le point stationnaire résout Ax = b.',
  `A = ${d.n === 2 ? `[[${fq(d.A[0][0])}, □], [□, ${fq(d.A[1][1])}]]` : `[[${fq(d.A[0][0])}, □, □], …]`}`,
  `∇f = ${gradR(gradText(d.A, d.b.map(qt)))}`,
);

// Level 4 (template c): f = xᵀMx − bᵀx with M not symmetric.
function nonsymItem(rng, base) {
  for (let t = 0; t < 400; t++) {
    const m = [rng.int(1, 3), rng.int(-3, 3), rng.int(-3, 3), rng.int(1, 3)];
    if (m[1] === m[2] || m[1] + m[2] === 0) continue;
    const Mq = MX.mat([[m[0], m[1]], [m[2], m[3]]]);
    const G = MX.add(Mq, MX.transpose(Mq)); // ∇(xᵀMx) = Gx
    if (natureOf(G) !== 'min' || (m[1] + m[2]) % 2 !== 0) continue;
    const S = MX.scale(G, q(1, 2));
    const x = [q(rng.int(-2, 2)), q(rng.int(-2, 2))];
    if (x.some((v) => v.n === 0)) continue;
    const b = MX.matVec(G, x);
    if (maxAbs([b]) > 14) continue;
    const gt = gradText(G, b.map(qt));
    const fText = polyText(Mq, b, 0, { half: false });
    const ps = [
      { judge: { kind: 'mat', expect: mt(S), quadform: true }, start: 'S', html: 'La matrice symétrique S telle que xᵀMx = xᵀSx', ask: 'S =', lines: [eq(mt(S), 'S = (M + Mᵀ)/2', 'hess')] },
      { judge: { kind: 'mat', expect: gt, vars: ['x', 'y'], names: { M: mt(Mq) }, qgrad: { M: mt(Mq), b: b.map(qt) } }, start: '∇f', html: 'Le gradient ∇f', ask: '∇f =',
        lines: [eq(`(M + M^T)·(x ; y) - ${vt(b)}`, '∇(xᵀMx) = (M + Mᵀ)x', 'grad'), eq(gt, '', 'grad')] },
      { judge: { kind: 'mat', expect: vt(x), names: { G: mt(G) } }, start: 'x*', html: 'Le point stationnaire', ask: 'x* =', lines: [eq(vt(x), '(M + Mᵀ)x = b', 'solve')] },
    ];
    return partsItem({
      ...base, key: `${QG}:nonsym:${mt(Mq)}:${vt(b)}`,
      hints: hints3('xᵀMx = xᵀSx avec S = (M + Mᵀ)/2 symétrique ; ∇(xᵀMx) = (M + Mᵀ)x.', `S = [[${m[0]}, □], [□, ${m[3]}]]`, `∇f = ${gradR(gt)}`),
      baits: ['m_grad_nonsym', 'l_quadform_offdiag'],
      prompt: `f(x) = xᵀMx − bᵀx avec M = ${MLm(Mq)} (non symétrique) et b = ${vR(b)}, c'est-à-dire f = ${MT(fText, { vars: VARS })}. Trouve la matrice symétrique S de la forme, puis ∇f et le point stationnaire.`,
    }, ps);
  }
  return null;
}

// Level 5 (template d): f = ‖Ax − b‖², gradient 2AᵀAx − 2Aᵀb.
function lsqItem(rng, base) {
  for (let t = 0; t < 300; t++) {
    const m = rng.pick([3, 4]);
    const A = Array.from({ length: m }, () => [q(1), q(rng.int(-2, 3))]);
    if (MX.rank(A) < 2) continue;
    const xhat = [q(rng.int(-2, 2)), q(rng.int(-2, 2))];
    if (xhat.every((v) => v.n === 0)) continue;
    const r = lsqReverse(A, xhat, rng);
    if (r.fallback) continue;
    const At = MX.transpose(A);
    const H = MX.scale(MX.mul(At, A), 2);
    const g = MX.scale([MX.matVec(At, r.b)], 2)[0];
    if (maxAbs(H) > 60 || maxAbs([g]) > 60) continue;
    const gt = gradText(H, g.map(qt));
    const ps = [
      { judge: { kind: 'mat', expect: mt(H), names: { A: mt(A) } }, start: 'H', html: 'La hessienne H = 2AᵀA', ask: 'H =', lines: [eq('2A^T·A', 'f = xᵀAᵀAx − 2bᵀAx + bᵀb', 'hess'), eq(mt(H), '', 'hess')] },
      { judge: { kind: 'mat', expect: gt, vars: ['x', 'y'], names: { A: mt(A) } }, start: '∇f', html: 'Le gradient ∇f = 2AᵀAx − 2Aᵀb', ask: '∇f =', lines: [eq(gt, '', 'grad')] },
      { judge: { kind: 'mat', expect: vt(xhat), names: { A: mt(A) } }, start: 'x*', html: 'Le minimum : ∇f = 0, les équations normales AᵀAx = Aᵀb', ask: 'x* =', lines: [eq(vt(xhat), 'AᵀAx = Aᵀb', 'solve')] },
    ];
    return partsItem({ ...base, key: `${QG}:lsq:${mt(A)}:${vt(r.b)}`, hints: [], noHints: true, baits: ['m_grad_factor'],
      prompt: `A = ${MLm(A)}, b = ${vR(r.b)}. Minimise f(x) = ‖Ax − b‖² : écris sa hessienne, son gradient, puis trouve x* (tu retrouves les équations normales).` }, ps);
  }
  return null;
}

function quadItem(level, rng) {
  const base0 = { skill: QG, level, subgoals: QG_SUB, mode: modeOf(level) };
  if (level === 5) { const it = lsqItem(rng, base0); if (it) return it; }
  if (level === 4 && rng.chance(0.4)) { const it = nonsymItem(rng, base0); if (it) return it; }
  const n = level === 4 ? 3 : 2;
  const d = quadData(rng, n, level <= 2 ? { kind: rng.chance(0.8) ? 'pd' : 'indef' } : {});
  const key = `${QG}:${mt(d.A)}:${vt(d.b)}:${level}`;
  const base = { ...base0, key, fallback: d.fallback, hints: qgHints(d), baits: ['m_grad_factor', ...(d.nat === 'saddle' ? ['l_posdef_diag'] : [])] };
  const f = fML(d.A, d.b, d.c);
  const vars = `(${VARS.slice(0, n).join(', ')})`;
  if (level <= 2) return partsItem({ ...base, prompt: `f${vars} = ${f}. Écris f = ½xᵀAx − bᵀx + c, puis trouve ∇f, le point stationnaire x* et sa nature.` }, quadParts(d, rng, { guided: true, gradDecision: level === 2 }));
  if (level === 3) return partsItem({ ...base, tapActions: 'menu', prompt: `f${vars} = ${f}. Choisis chaque action : A et b, ∇f, x*, puis f(x*) et la nature de x*.` }, quadParts(d, rng, { menuOn: true }));
  const prompt = rng.chance(0.5)
    ? `f${vars} = ${f}. Trouve le point stationnaire de f, sa nature et la valeur de f en ce point, en passant par f = ½xᵀAx − bᵀx + c.`
    : `Écris f${vars} = ${f} sous la forme ½xᵀAx − bᵀx + c, puis donne ∇f, le point stationnaire et sa nature.`;
  return partsItem({ ...base, prompt }, quadParts(d, rng));
}

function quadExam(rng, exam) {
  const tag = examTag({ exam });
  if (exam === 'tf') {
    const which = rng.int(0, 2);
    if (which === 0) {
      const M = rng.pick(['[[1,2],[0,1]]', '[[0,1],[0,0]]', '[[2,3],[1,2]]', '[[1,0],[4,1]]']);
      return tfL({
        skill: QG, key: `nonsym:${M}`, truth: false, exam: tag, ruleIfTrue: 'm_grad_nonsym',
        statement: '∇(xᵀMx) = 2Mx pour toute matrice carrée M.',
        counter: { kind: 'mx', prop: 'gradNot2Mx', params: {}, ask: [{ v: 'M', label: 'M =', shape: [2, 2] }], answer: { M } },
        explanation: `Faux : ∇(xᵀMx) = (M + Mᵀ)x, qui vaut 2Mx seulement si M est symétrique. Avec M = ${MLm(MX.mat(JSON.parse(M)))}, M + Mᵀ ≠ 2M.`,
      });
    }
    const T = [
      null,
      ['Si A est symétrique définie positive, f(x) = ½xᵀAx − bᵀx a un unique minimum, en la solution de Ax = b.', 'Vrai : ∇f = Ax − b s\'annule en un seul point, et la hessienne A est définie positive : f est strictement convexe.'],
      ['Pour A symétrique, la hessienne de f(x) = ½xᵀAx − bᵀx + c est A, en tout point.', 'Vrai : ∇f = Ax − b est affine ; sa dérivée est A.'],
    ][which];
    return tfL({ skill: QG, key: `t${which}`, truth: true, exam: tag, statement: T[0], explanation: T[1], ruleIfFalse: which === 2 ? 'm_grad_factor' : null });
  }
  const which = rng.pick(['grad', 'grad', 'x', 'sym']);
  if (which === 'sym') {
    const [a, c2, k] = [rng.int(1, 3), rng.int(1, 3), rng.pick([2, 4, 6, -2, -4, 6, 8])];
    const S = MX.mat([[a, k / 2], [k / 2, c2]]);
    const text = `${a === 1 ? '' : a}x^2${k < 0 ? '-' : '+'}${Math.abs(k)}x y+${c2 === 1 ? '' : c2}y^2`;
    return mcqDistinct({
      skill: QG, level: 4, key: `mcq:sym:${text}`, exam: tag,
      prompt: `Quelle matrice symétrique S vérifie ${MT(text, { vars: VARS })} = xᵀSx ?`,
      right: MLm(S),
      wrongs: [{ html: MLm(MX.mat([[a, k], [k, c2]])), rule: 'l_quadform_offdiag' }, { html: MLm(MX.mat([[2 * a, k], [k, 2 * c2]])), rule: 'm_grad_factor' }],
      fillers: [{ html: MLm(MX.mat([[a, k], [0, c2]])) }, { html: MLm(MX.mat([[a, -k / 2], [-k / 2, c2]])) }],
      solution: [{ html: `S = ${MLm(S)}`, note: 'La moitié du coefficient de xy dans chaque case hors diagonale' }],
    }, rng);
  }
  const d = quadData(rng, 2, { kind: 'pd' });
  const f = fML(d.A, d.b, d.c);
  if (which === 'x') {
    return mcqDistinct({
      skill: QG, level: 4, key: `mcq:x:${mt(d.A)}:${vt(d.b)}`, exam: tag,
      prompt: `f(x, y) = ${f}. En quel point f atteint-elle son minimum ?`,
      right: vR(d.x),
      wrongs: [{ html: vR(d.x.map((v) => v.div(2))), rule: 'm_grad_factor' }, { html: vR(d.x.map((v) => v.mul(2))), rule: 'm_grad_factor' }],
      fillers: [{ html: vR(d.x.map((v) => v.neg())) }, { html: vR([d.x[1], d.x[0]]) }, { html: vR(d.x.map((v) => v.add(1))) }],
      solution: [{ html: `A = ${MLm(d.A)}, b = ${vR(d.b)} : Ax = b`, note: '' }, { html: `x* = ${vR(d.x)}`, note: '' }],
      fallback: d.fallback,
    }, rng);
  }
  const R = (k) => gradR(gradText(d.A, d.b.map(qt), k));
  return mcqDistinct({
    skill: QG, level: 4, key: `mcq:g:${mt(d.A)}:${vt(d.b)}`, exam: tag,
    prompt: `f(x, y) = ${f}. Que vaut ∇f(x, y) ?`,
    right: R(1),
    wrongs: [{ html: R(2), rule: 'm_grad_factor' }, { html: R('1/2'), rule: 'm_grad_factor' }],
    fillers: [{ html: gradR(gradText(d.A, d.b.map((v) => qt(v.neg())))) }, { html: gradR(gradText(MX.mat(d.A.map((r, i) => r.map((x, j) => (i === j ? x.valueOf() : 2 * x.valueOf())))), d.b.map(qt))) }],
    solution: [{ html: `A = ${MLm(d.A)}, b = ${vR(d.b)}`, note: 'f = ½xᵀAx − bᵀx + c' }, { html: `∇f = Ax − b = ${R(1)}`, note: '' }],
    fallback: d.fallback,
  }, rng);
}

export const GEN = {
  [QG]: (level, rng, profile, opts = {}) => (opts.exam ? quadExam(rng, opts.exam) : quadItem(level, rng)),
};
