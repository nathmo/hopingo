// Generators of module A2, part b (step U6): limits in two variables.
// a2-lim-paths (a limit that does not exist: two paths), a2-lim-polar (a
// limit that exists: polar coordinates and the squeeze), a2-continuity
// (continuous extension at (0, 0)).
//
// A path is chosen by a decision (no `path` judge: the valid options are
// the paths that reveal the answer); f restricted to it is simplified by
// `equiv` in one variable (in x and the slope m for the lines y = mx), then
// its limit is taken by `limit` (cfg.value: the limit along the lines, the
// same for every m). The polar form is simplified by `equiv` in (r, φ), then
// bounded by `bound`. A conclusion « n'existe pas » is a decision, followed
// by the gap between the two values found (judge `value`).

import {
  q, QS, MT, M, sup, linesItem, mcq, tfItem, examTag, H, E, modeOf, blanked, assemble, problemItem,
  coefText, joinSum, polyXY, polyTrig, absSum, subst, toPolar, NOTE, DEC, fq, distinct, A2_KEYS, RD, PV,
} from './analyse2-b-kit.js';

const LP = 'a2-lim-paths';
const LPO = 'a2-lim-polar';
const CO = 'a2-continuity';
const KEYS = A2_KEYS;
const pw = (b, k) => (k === 0 ? '' : k === 1 ? b : `${b}^${k}`);
const LIMXY = '<span class="lim2">lim<sub>(x, y) → (0, 0)</sub></span>';
const X1 = { x: [-1.5, 1.5] };

// ======================================================================
// Data: f = K·x^i·y^j/(x^(2a) + c·y^(2b)), with i/(2a) + j/(2b) = 1
// ======================================================================

// (a, b, i, j): the denominator's weights and the critical numerator.
const UNEQUAL = [[2, 1, 2, 1], [1, 2, 1, 2], [3, 1, 3, 1], [1, 3, 1, 3], [4, 2, 4, 2], [2, 4, 2, 4]];
const EQUAL = [[1, 1, 1, 1], [2, 2, 1, 3], [2, 2, 3, 1], [2, 2, 2, 2]];

export function pathsData(rng, { same = null, extra = false } = {}) {
  const isSame = same ?? rng.chance(0.3);
  const [a, b, i, j] = rng.pick(isSame ? EQUAL : UNEQUAL);
  const K = rng.pick([1, 2, 3, 5]);
  const c = rng.pick([1, 2, 3]);
  const num = coefText(K, `${pw('x', i)}${pw('y', j)}`);
  const den = `${pw('x', 2 * a)}+${coefText(c, pw('y', 2 * b))}`;
  const top = extra ? `${num}+${pw('y', 2 * b + 2)}` : num;
  const f = `${extra ? `(${top})` : top}/(${den})`;
  const d = { a, b, i, j, K, c, f, same: isSame, extra, L2: q(K, 1 + c) };
  // Lines y = mx: K·m^j·x^(i+j−s)/(x^(2a−s) + c·m^(2b)·x^(2b−s)), s = min(2a, 2b).
  const s = Math.min(2 * a, 2 * b);
  const pNum = coefText(K, `${pw('m', j)}${pw('x', i + j - s)}`);
  const pDen = joinSum([pw('x', 2 * a - s) || '1', coefText(c, `${pw('m', 2 * b)}${pw('x', 2 * b - s)}`)]);
  d.p1 = { raw: subst(f, { y: 'm x' }), simp: `${pNum}/(${pDen})`, den: pDen, vars: ['x', 'm'] };
  if (!isSame) {
    const up = a > b; // y = x^p when b | a, else x = y^p
    const p = up ? a / b : b / a;
    const v = up ? 'x' : 'y';
    const map = up ? { y: `x^${p}` } : { x: `y^${p}` };
    const e = 2 * (up ? a : b);
    d.p2 = {
      v, p, up, label: up ? `y = ${v}${sup1(p)}` : `x = y${sup1(p)}`, at: up ? `f(x, x${sup1(p)})` : `f(y${sup1(p)}, y)`,
      raw: subst(f, map), mid: `${coefText(K, pw(v, e))}/(${coefText(1 + c, pw(v, e))})`, simp: d.L2.toString(),
    };
  } else {
    // The value along y = mx does not depend on x: m = 0 gives 0, m = 1 gives K/(1 + c).
    d.p1.simp = `${pNum}/(${pDen})`;
  }
  return d;
}
const SUPS = { 2: '²', 3: '³', 4: '⁴' };
const sup1 = (p) => SUPS[p] || `^${p}`;
// A sum in brackets (a single term stays bare).
const wrap = (t) => (/.[+-]/.test(t.replace(/\([^()]*\)/g, '')) ? `(${t})` : t);

// ======================================================================
// a2-lim-paths
// ======================================================================

const LP_SUB = [
  { id: 'path', label: 'chemin', skill: LP },
  { id: 'path-curve', label: 'chemin courbe', skill: LP },
  { id: 'conclude', label: 'conclure', skill: LP },
  { id: 'restrict', label: 'simplifier f restreinte', skill: 'rat-simplify' },
  { id: 'limit', label: 'limite à une variable', skill: 'a1-fn-limits' },
];
const LP_CHOICES = [
  { id: 'subst', label: 'Remplacer par le chemin et simplifier' },
  { id: 'limit', label: 'Faire tendre la variable vers 0' },
  { id: 'compare', label: 'Comparer les deux valeurs' },
  { id: 'polar', label: 'Passer en coordonnées polaires', why: 'Les polaires servent à montrer qu\'une limite existe ; ici, on cherche deux chemins.' },
];

const eqv = (vars, goal) => ({ kind: 'equiv', vars, domain: Object.fromEntries(vars.map((v) => [v, [-1.5, 1.5]])), target: 'short', goal, slack: 2 });
const limCfg = (v, value, vars) => ({ kind: 'limit', v, to: '0', ...(vars ? { vars } : {}), ...(value !== undefined ? { value } : {}) });
const gapCfg = (gap) => ({ kind: 'value', expect: gap, form: 'irreducible' });

// The parts of the « two paths » lines (the lines y = mx, then a curve).
function pathParts(d, level, rng) {
  const g = level <= 2;
  const o1 = { vars: d.p1.vars };
  const lines1 = [E(d.p1.simp, 'Simplifier par la plus petite puissance de x', 'restrict', 'subst')];
  if (g) lines1[0] = blanked(lines1[0], [d.p1.den], o1);
  const parts = [{
    start: d.p1.raw, judge: eqv(d.p1.vars, d.p1.simp), lines: lines1, choices: LP_CHOICES,
    pre: [NOTE('Le long des droites y = mx (m fixé), on remplace y par mx :')],
  }];
  if (d.same) {
    const v1 = d.L2;
    const conclusion = level === 1
      ? [NOTE(`La valeur dépend de m : 0 pour m = 0, ${fq(v1)} pour m = 1. La limite n'existe pas.`)]
      : [DEC('La valeur le long de y = mx dépend de m. Conclusion ?', [
        { id: 'none', label: 'Deux droites donnent deux valeurs : la limite n\'existe pas', valid: true, ref: true },
        { id: 'axis', label: 'Sur l\'axe y = 0, f vaut 0 : la limite vaut 0', valid: false, rule: 'a2_lim_iterated', why: 'L\'axe n\'est qu\'un chemin parmi d\'autres : sur y = x, f vaut ' + fq(v1) + '.' },
        { id: 'diag', label: `Sur y = x, f vaut ${fq(v1)} : la limite vaut ${fq(v1)}`, valid: false, why: 'Sur l\'axe y = 0, f vaut 0 : deux chemins, deux valeurs.' },
      ], rng)];
    parts.push({
      html: 'Conclusion, et l\'écart entre les valeurs pour m = 1 et m = 0 :', ask: 'écart =', start: `${v1}-0`, judge: gapCfg(v1.toString()),
      lines: [E(v1.toString(), `m = 1 : ${fq(v1)} ; m = 0 : 0`, 'conclude', 'compare')], choices: LP_CHOICES, pre: conclusion,
    });
    return parts;
  }
  // Limit along the lines (the same for every m).
  parts.push({
    html: `Quand x → 0 : ${M(`lim(${d.p1.simp},x,0)`)}`, start: d.p1.simp, judge: limCfg('x', '0', d.p1.vars),
    lines: [g && level === 1 ? blanked(E('0', 'Le numérateur tend vers 0, pas le dénominateur', 'path', 'limit'), ['0'], o1) : E('0', 'Le numérateur tend vers 0, pas le dénominateur', 'path', 'limit')],
    choices: LP_CHOICES,
  });
  // The curve that balances x^(2a) and y^(2b).
  const P = d.p2;
  const o2 = { vars: [P.v] };
  const lines2 = [
    E(P.mid, `${P.label} : les deux termes du dénominateur ont la même puissance`, 'path-curve', 'subst'),
    E(P.simp, 'Simplifier', 'restrict', 'subst'),
  ];
  if (g) {
    const denT = coefText(1 + d.c, pw(P.v, 2 * (P.up ? d.a : d.b)));
    if (denT !== coefText(d.K, pw(P.v, 2 * (P.up ? d.a : d.b)))) lines2[0] = blanked(lines2[0], [denT], o2);
    lines2[1] = blanked(lines2[1], [P.simp], o2);
  }
  const pre2 = [];
  if (level >= 2) pre2.push(curveDecision(d, level, rng));
  pre2.push(NOTE(`Le long de ${P.label} : ${P.at} = ${M(P.raw)}`));
  parts.push({ html: level === 1 ? 'Deuxième chemin :' : 'Toutes les droites donnent 0. Un autre chemin :', start: P.raw, judge: eqv([P.v], P.simp), lines: lines2, choices: LP_CHOICES, pre: pre2 });
  // Conclusion.
  const L2 = d.L2;
  const concl = level === 1
    ? [NOTE(`Les droites donnent 0, la courbe ${P.label} donne ${fq(L2)} : la limite n'existe pas.`)]
    : [DEC('Conclusion ?', [
      { id: 'none', label: `0 ≠ ${fq(L2)} : la limite n'existe pas`, valid: true, ref: true },
      { id: 'lines', label: 'Toutes les droites donnent 0 : la limite vaut 0', valid: false, rule: 'a2_lim_lines_only', why: `Le long de ${P.label}, f vaut ${fq(L2)} : une limite doit être la même sur tous les chemins.` },
      { id: 'curve', label: `La courbe est plus précise : la limite vaut ${fq(L2)}`, valid: false, why: 'Aucun chemin n\'est « plus précis » : deux chemins, deux valeurs, donc pas de limite.' },
    ], rng)];
  parts.push({
    html: 'Conclusion, et l\'écart entre les deux valeurs :', ask: 'écart =', start: `${L2}-0`, judge: gapCfg(L2.toString()),
    lines: [E(L2.toString(), `${fq(L2)} − 0`, 'conclude', 'compare')], choices: LP_CHOICES, pre: concl,
  });
  return parts;
}

// The choice of the second path: the curve that balances the denominator.
function curveDecision(d, level, rng) {
  const P = d.p2;
  const other = P.up ? 'x = y²' : 'y = x²';
  const otherWhy = `Le long de ${other}, f tend aussi vers 0 : ce chemin ne distingue rien. Équilibre ${pw('x', 2 * d.a).replace(/\^(\d)/, (m, k) => SUPS[k] || `^${k}`)} et ${pw('y', 2 * d.b).replace(/\^(\d)/, (m, k) => SUPS[k] || `^${k}`)}.`;
  if (level === 3) {
    return DEC('Toutes les droites donnent 0. Que faire ?', [
      { id: 'curve', label: `Essayer une courbe : ${P.label}`, valid: true, ref: true },
      { id: 'line', label: 'Essayer une autre droite, y = 2x', valid: false, rule: 'a2_lim_lines_only', why: 'Les droites donnent toutes 0 : une de plus n\'apprend rien.' },
      { id: 'polar', label: 'Passer en polaires', valid: true, quality: 'poor', why: 'Juste, mais la forme polaire ne se majore pas par une borne en r seul : il reste une dépendance en φ. Un chemin courbe conclut plus vite.' },
    ], rng);
  }
  if (level >= 4) {
    return DEC('Quel deuxième chemin ?', [
      { id: P.up ? 'yx' : 'xy', label: P.up ? 'Une courbe y = xᵖ' : 'Une courbe x = yᵖ', valid: true, ref: true, then: { ask: 'p =', expect: String(P.p), why: 'Choisis p pour que les deux termes du dénominateur aient la même puissance.' } },
      { id: P.up ? 'xy' : 'yx', label: P.up ? 'Une courbe x = yᵖ' : 'Une courbe y = xᵖ', valid: false, why: `Avec un p entier, ce chemin donne encore 0 : ${otherWhy}` },
      { id: 'line', label: 'Une autre droite, y = 2x', valid: false, rule: 'a2_lim_lines_only', why: 'Les droites donnent toutes 0 : une de plus n\'apprend rien.' },
    ], rng);
  }
  const wrongP = P.p + 1;
  return DEC('Quel deuxième chemin ?', [
    { id: 'good', label: P.label, valid: true, ref: true },
    { id: 'line', label: 'y = 2x', valid: false, rule: 'a2_lim_lines_only', why: 'C\'est encore une droite : elle donne 0 comme les autres.' },
    { id: 'bad', label: P.up ? `y = x${sup1(wrongP)}` : `x = y${sup1(wrongP)}`, valid: false, why: `Le long de ${P.up ? `y = x${sup1(wrongP)}` : `x = y${sup1(wrongP)}`}, f tend aussi vers 0. ${otherWhy.split('. ')[1]}` },
  ], rng);
}

function pathsHints(d) {
  if (d.same) return H('Le long de y = mx, x se simplifie : la valeur dépend-elle de m ?', `f(x, mx) = ${M(d.p1.simp)}`, `m = 0 donne 0, m = 1 donne ${fq(d.L2)} : pas de limite.`);
  const P = d.p2;
  return H(`Les droites donnent toutes la même valeur ? Essaie un chemin qui équilibre ${sup(`x^${2 * d.a}`)} et ${sup(`y^${2 * d.b}`)}.`,
    `Prends ${P.up ? 'y = x^…' : 'x = y^…'} : alors les deux termes du dénominateur ont la même puissance.`,
    `${P.at} = ${M(P.mid)} = ${fq(d.L2)} ≠ 0 : la limite n'existe pas.`);
}

function pathsLines(level, rng, opts) {
  const same = level <= 2 ? false : level === 3 ? rng.chance(0.25) : rng.chance(0.3);
  const d = pathsData(rng, { same });
  const parts = pathParts(d, level, rng);
  const as = assemble(parts, level);
  const prompt = `Soit f(x, y) = ${M(d.f)} pour (x, y) ≠ (0, 0). Montre que ${LIMXY} f(x, y) n'existe pas${level === 1 ? (d.same ? ', avec les droites y = mx.' : `, avec les droites y = mx puis la courbe ${d.p2.label}.`) : '.'}`;
  return linesItem({
    skill: LP, level, prompt, ...as, mode: modeOf(level), hints: pathsHints(d), subgoals: LP_SUB, keys: KEYS,
    tapActions: level === 3 ? 'steps' : null, declares: { vars: ['x', 'y', 'm'] },
    key: `${LP}:${level}:${d.f}`, exam: false, expectedSec: [0, 120, 180, 200, 240][level],
  });
}

// ---------- multiple choice: a limit that exists or not ----------

// A limit to compute, from the families of both skills: paths (no limit,
// lines give 0), same (a = b), zero (polar bound), sinc (u = x² + y²),
// none (homogeneous of degree 0). → {f, right, wrongs: [{html, rule}], why}
export function limChoice(rng, kind) {
  const NONE = 'n\'existe pas';
  const num = (x) => M(String(x));
  if (kind === 'paths') {
    const d = pathsData(rng, { same: false, extra: rng.chance(0.5) });
    return {
      f: d.f, right: NONE, key: `paths:${d.f}`,
      wrongs: [
        { html: num(0), rule: 'a2_lim_lines_only' },
        ...(d.extra ? [{ html: M(`y^2/${d.c}`.replace('/1', '')), rule: 'a2_lim_function_answer' }] : []),
        { html: num(d.L2), rule: null },
        { html: '+∞', rule: null },
      ],
      why: `Les droites y = mx donnent 0, mais ${d.p2.at} → ${fq(d.L2)} : deux chemins, deux valeurs.`,
    };
  }
  if (kind === 'same') {
    const d = pathsData(rng, { same: true });
    return {
      f: d.f, right: NONE, key: `same:${d.f}`,
      wrongs: [{ html: num(0), rule: 'a2_lim_iterated' }, { html: num(d.L2), rule: null }, { html: num('1/2'), rule: null }, { html: num(1), rule: null }, { html: '+∞', rule: null }],
      why: `f(x, mx) = ${M(d.p1.simp)} dépend de m : 0 pour m = 0, ${fq(d.L2)} pour m = 1.`,
    };
  }
  if (kind === 'zero') {
    const d = polarData(rng, 'zero');
    return {
      f: d.f, right: num(0), key: `zero:${d.f}`,
      wrongs: [{ html: NONE, rule: 'a2_lim_polar_r_forgot' }, { html: num(1), rule: null }, { html: num(d.M1), rule: null }, { html: '+∞', rule: null }],
      why: `En polaires, f = ${M(d.simp)}, et |f| ≤ ${M(d.bound)} → 0.`,
    };
  }
  if (kind === 'sinc') {
    const d = polarData(rng, 'sinc');
    return {
      f: d.f, right: num(d.L), key: `sinc:${d.f}`,
      wrongs: [{ html: num(0), rule: null }, ...(d.L.eq(1) ? [] : [{ html: num(1), rule: 'a1_remarkable_limit_scale' }]), { html: NONE, rule: null }, { html: '+∞', rule: null }],
      why: `Avec u = x² + y² → 0 : ${d.why}.`,
    };
  }
  const d = polarData(rng, 'none');
  return {
    f: d.f, right: NONE, key: `none:${d.f}`,
    wrongs: [{ html: num(0), rule: 'a2_lim_polar_theta' }, { html: num(d.g0), rule: null }, { html: num(d.g4), rule: null }, { html: '+∞', rule: null }],
    why: `En polaires, f = ${M(d.simp)} ne dépend que de φ : ${fq(d.g0)} pour φ = 0, ${fq(d.g4)} pour φ = π/4.`,
  };
}

export function limMcq(skill, level, rng, kind, opts = {}) {
  const c = limChoice(rng, kind);
  const options = distinct([{ html: c.right, correct: true }, ...c.wrongs.map((w) => ({ ...w, correct: false }))]);
  return mcq({
    skill, level, prompt: `${LIMXY} ${M(c.f)} =`, options, key: `mcq:${c.key}`,
    exam: examTag(opts), expectedSec: opts.exam ? 180 : 120, solution: [{ html: c.why, note: '' }],
  }, rng);
}

// ---------- true or false ----------

function pathsTf(rng, opts) {
  const kind = rng.pick(['lines', 'iterated', 'two', 'curve', 'restrict']);
  const ex = examTag(opts) || { format: 'tf', points: 1 };
  const ask = [{ v: 'f', label: 'f(x, y) =', keys: ['calcx', 'calcfn', 'a2'] }];
  if (kind === 'lines') {
    const L = rng.pick([1, 2, 3, -1]);
    return tfItem({
      skill: LP, level: 4, truth: false, key: `lines:${L}`, exam: ex, ruleIfTrue: 'a2_lim_lines_only',
      statement: `Si la limite de f le long de toute droite passant par l'origine vaut ${fq(L)}, alors ${LIMXY} f(x, y) = ${fq(L)}.`,
      counter: { kind: 'a2', prop: 'knownShift', params: { want: ['K2'], shift: L }, ask, answer: { f: `${L}+x^2y/(x^4+y^2)` } },
      explanation: `Faux : f = ${fq(L)} + x²y/(x⁴ + y²) tend vers ${fq(L)} le long de chaque droite, mais vaut ${fq(q(L).add(q(1, 2)))} sur la parabole y = x².`,
    });
  }
  if (kind === 'iterated') {
    return tfItem({
      skill: LP, level: 4, truth: false, key: 'iterated', exam: ex, ruleIfTrue: 'a2_lim_iterated',
      statement: `Si lim<sub>x→0</sub> lim<sub>y→0</sub> f(x, y) = lim<sub>y→0</sub> lim<sub>x→0</sub> f(x, y), alors ${LIMXY} f(x, y) existe.`,
      counter: { kind: 'a2', prop: 'knownFn', params: { want: ['K1', 'K2'] }, ask, answer: { f: 'x y/(x^2+y^2)' } },
      explanation: 'Faux : pour xy/(x² + y²), les deux limites itérées valent 0, mais f vaut 1/2 sur y = x.',
    });
  }
  if (kind === 'two') {
    return tfItem({
      skill: LP, level: 4, truth: true, key: 'two', exam: ex,
      statement: `Si deux chemins qui tendent vers (0, 0) donnent deux limites différentes, alors ${LIMXY} f(x, y) n'existe pas.`,
      explanation: 'Vrai : si la limite existait, elle serait la même le long de tous les chemins.',
    });
  }
  if (kind === 'curve') {
    const L = rng.pick([0, 1, 2]);
    return tfItem({
      skill: LP, level: 4, truth: true, key: `curve:${L}`, exam: ex,
      statement: `Si ${LIMXY} f(x, y) = ${L}, alors f(x, x²) → ${L} quand x → 0.`,
      explanation: 'Vrai : une limite en (0, 0) vaut le long de tout chemin qui tend vers (0, 0).',
    });
  }
  const p = rng.pick([2, 3]);
  return tfItem({
    skill: LP, level: 4, truth: true, key: `restrict:${p}`, exam: ex,
    statement: `Si f(x, mx) → 0 pour tout m et f(x, x${sup1(p)}) → 1 quand x → 0, alors ${LIMXY} f(x, y) n'existe pas.`,
    explanation: 'Vrai : deux chemins vers (0, 0) donnent deux valeurs différentes, 0 et 1.',
  });
}

function pathsItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return pathsTf(rng, opts);
  if (opts.exam === 'mcq' || level === 5) {
    const kind = rng.pick(['paths', 'paths', 'paths', 'same', 'zero', 'sinc', 'none']);
    return limMcq(LP, opts.exam ? 4 : 5, rng, kind, opts);
  }
  return pathsLines(level, rng, opts);
}

// ======================================================================
// Data of a2-lim-polar: f whose polar form is bounded in r
// ======================================================================

// A homogeneous polynomial of degree n in x, y with 1 to 3 terms.
function homog(rng, n, count) {
  const js = rng.shuffle([...Array(n + 1).keys()]).slice(0, count).sort((u, v) => u - v);
  return js.map((j) => [rng.pick([-3, -2, -1, 1, 2, 3]), n - j, j]);
}
// c·r^k·(trig) as text: r(2cos(φ)^3-…), -r^2sin(φ)^4.
function rTimes(rk, terms) {
  if (terms.length === 1) { const [c, i, j] = terms[0]; return coefText(c, `${rk}${pw('cos(φ)', i)}${pw('sin(φ)', j)}`); }
  return `${rk}(${polyTrig(terms)})`;
}
const SINC = [
  { fn: (u) => `sin(${u})/(x^2+y^2)`, pol: (c) => `sin(${c === 1 ? '' : c}r^2)/r^2`, L: (c) => q(c), why: (c) => `sin(${c === 1 ? '' : c}u)/u → ${c}` },
  { fn: (u) => `(e^(${u})-1)/(x^2+y^2)`, pol: (c) => `(e^(${c === 1 ? '' : c}r^2)-1)/r^2`, L: (c) => q(c), why: (c) => `(e^(${c === 1 ? '' : c}u) − 1)/u → ${c}` },
  { fn: (u) => `(1-cos(${u}))/(x^2+y^2)^2`, pol: (c) => `(1-cos(${c === 1 ? '' : c}r^2))/r^4`, L: (c) => q(c * c, 2), why: (c) => `(1 − cos(${c === 1 ? '' : c}u))/u² → ${fq(q(c * c, 2))}` },
];

export function polarData(rng, kind) {
  if (kind === 'sinc') {
    const T = rng.pick(SINC);
    const c = rng.pick([1, 2, 3]);
    const u = c === 1 ? 'x^2+y^2' : `${c}(x^2+y^2)`;
    const f = T.fn(u);
    return { kind, f, raw: toPolar(f), simp: T.pol(c), L: T.L(c), why: T.why(c), c };
  }
  if (kind === 'none') {
    // g(φ) = Σ c·cos^i φ·sin^j φ (i + j = 2): g(0) = the c of x², g(π/4) = Σc/2.
    for (let n = 0; n < 50; n++) {
      const P = homog(rng, 2, rng.pick([1, 2]));
      const g0 = P.reduce((s, [c, , j]) => s.add(j === 0 ? q(c) : q(0)), q(0));
      const g4 = P.reduce((s, [c]) => s.add(q(c, 2)), q(0));
      if (g0.eq(g4)) continue;
      const t = polyTrig(P);
      return { kind, f: `${wrap(polyXY(P))}/(x^2+y^2)`, simp: t, g0, g4, term: t };
    }
    return { kind, f: 'x^2/(x^2+y^2)', simp: 'cos(φ)^2', g0: q(1), g4: q(1, 2), term: 'cos(φ)^2', fallback: true };
  }
  // zero: (P_{d+1} + P_{d+2}) / D, D = x² + y² or (x² + y²)².
  const deg = rng.chance(0.7) ? 2 : 4;
  const D = deg === 2 ? 'x^2+y^2' : '(x^2+y^2)^2';
  const P1 = homog(rng, deg + 1, rng.pick([1, 2, 2, 3]));
  const P2 = deg === 2 && rng.chance(0.4) ? homog(rng, deg + 2, 1) : [];
  const f = `${wrap(joinSum([polyXY(P1), polyXY(P2)]))}/(${D})`;
  const simp = joinSum([rTimes('r', P1), P2.length ? rTimes('r^2', P2) : '']);
  const mid = `(${joinSum([rTimes(`r^${deg + 1}`, P1), P2.length ? rTimes(`r^${deg + 2}`, P2) : ''])})/r^${deg}`;
  const M1 = absSum(P1);
  const M2 = absSum(P2);
  const bound = joinSum([coefText(M1, 'r'), M2.n ? coefText(M2, 'r^2') : '']);
  const phiBound = joinSum([`r×|${polyTrig(P1)}|`, P2.length ? `r^2×|${polyTrig(P2)}|` : '']);
  return { kind, f, raw: toPolar(f), mid, simp, bound, M1, M2, phiBound, deg, P1, P2, k: 1 };
}

// ======================================================================
// a2-lim-polar
// ======================================================================

const PO_SUB = [
  { id: 'polar', label: 'écrire f en polaires', skill: 'rat-simplify' },
  { id: 'simplify', label: 'simplifier', skill: 'rat-simplify' },
  { id: 'bound', label: 'majorer', skill: 'g1-bound' },
  { id: 'squeeze', label: 'gendarmes', skill: LPO },
];
const PO_CHOICES = [
  { id: 'polar', label: 'Écrire x = r cos φ, y = r sin φ' },
  { id: 'simplify', label: 'Simplifier par une puissance de r' },
  { id: 'bound', label: 'Majorer |cos φ| et |sin φ| par 1' },
  { id: 'limit', label: 'Faire tendre r vers 0' },
  { id: 'paths', label: 'Essayer deux chemins', why: 'Deux chemins montrent qu\'une limite n\'existe pas, jamais qu\'elle existe.' },
];
const polarCfg = (goal) => ({ kind: 'equiv', vars: PV, domain: { r: [0.01, 1], φ: [0, 6.28] }, target: 'short', goal, slack: 2 });
const BOUND = { kind: 'bound', vars: PV };
const LIMR = { kind: 'limit', v: 'r', to: '0', dir: '+' };

// The polar part: f(r cos φ, r sin φ) simplified.
function polarPart(d, level, more = {}) {
  const g = level <= 2;
  const o = { vars: PV };
  const lines = d.kind === 'zero'
    ? [E(d.mid, 'x = r cos φ, y = r sin φ, et cos²φ + sin²φ = 1', 'polar', 'polar'), E(d.simp, `Simplifier par r${sup1(d.deg)}`, 'simplify', 'simplify')]
    : [E(d.simp, 'x² + y² = r²', 'polar', 'polar')];
  if (g && d.kind === 'zero') lines[0] = blanked(lines[0], [`r^${d.deg}`], o);
  return { start: d.raw, judge: polarCfg(d.simp), lines, choices: PO_CHOICES, ...more };
}
// The bound of the zero family (with the choice of the bound at level 2).
function boundPart(d, level, rng, more = {}) {
  const o = { vars: PV };
  const pre = [];
  if (level === 2) {
    pre.push(DEC('Quelle majoration de |f| conclut ?', [
      { id: 'good', label: `|f| ≤ ${RD(d.bound)}`, valid: true, ref: true },
      { id: 'phi', label: `|f| ≤ ${RD(d.phiBound)}`, valid: false, why: 'Juste, mais ta borne dépend encore de φ : majore |cos φ| et |sin φ| par 1.' },
      { id: 'const', label: `|f| ≤ ${RD(joinSum([d.M1.toString(), d.M2.n ? coefText(d.M2, 'r^2') : '']))}`, valid: false, why: 'Cette borne ne tend pas vers 0 quand r → 0 : elle ne prouve rien.' },
    ], rng));
  }
  let line = E(d.bound, '|cos φ| ≤ 1 et |sin φ| ≤ 1', 'bound', 'bound');
  if (level === 1) line = blanked(line, [d.M1.toString()], o);
  return { html: `Majoration de |f − 0| = |${RD(d.simp)}|, sans φ :`, ask: '≤', start: d.simp, judge: BOUND, lines: [line], choices: PO_CHOICES, pre, ...more };
}

function polarLines(level, rng, opts) {
  const kind = level <= 2 ? 'zero' : rng.chance(0.6) ? 'zero' : 'sinc';
  const d = polarData(rng, kind);
  const parts = [];
  const pre0 = [];
  if (level === 3) {
    pre0.push(DEC('Quelle méthode ?', [
      { id: 'polar', label: 'Passer en polaires : x = r cos φ, y = r sin φ', valid: true, ref: true },
      { id: 'paths', label: 'Calculer la limite le long de deux chemins', valid: false, why: 'Des chemins peuvent montrer qu\'une limite n\'existe pas, jamais qu\'elle existe.' },
      { id: 'zero', label: 'Remplacer x et y par 0', valid: false, why: 'On obtient 0/0 : une forme indéterminée.' },
    ], rng));
  }
  if (level === 1) {
    // The polar form is given.
    parts.push({ ...boundPart(d, level, rng), pre: [NOTE(`En polaires, f = ${M(d.simp)}.`)] });
  } else {
    parts.push(polarPart(d, level, { pre: pre0 }));
    if (d.kind === 'zero') parts.push(boundPart(d, level, rng));
  }
  if (d.kind === 'zero') {
    parts.push({
      html: `Gendarmes : 0 ≤ |f| ≤ ${M(d.bound)}. Quand r → 0⁺, la borne tend vers`, ask: '→', start: d.bound, judge: LIMR,
      lines: [E('0', 'Donc lim f = 0', 'squeeze', 'limit')], choices: PO_CHOICES,
    });
  } else {
    parts.push({
      html: `Quand r → 0⁺ (u = r² → 0) : ${M(`lim(${d.simp},r,0)`)}`, start: d.simp, judge: LIMR,
      lines: [E(d.L.toString(), d.why, 'squeeze', 'limit')], choices: PO_CHOICES,
    });
  }
  const as = assemble(parts, level);
  const hints = d.kind === 'zero'
    ? H('Passe en polaires, puis majore tout ce qui dépend de φ par une constante.', `|f| ≤ (…)·r${d.M2.n ? ' + (…)·r²' : ''}`, `|f| ≤ ${M(d.bound)} → 0, donc lim f = 0.`)
    : H('Pose u = x² + y² = r² : c\'est une limite à une variable.', `f = ${M(d.simp)}`, `${d.why} : la limite vaut ${fq(d.L)}.`);
  return linesItem({
    skill: LPO, level, prompt: `Calcule ${LIMXY} ${M(d.f)}.`, ...as, mode: modeOf(level), hints, subgoals: PO_SUB, keys: KEYS,
    tapActions: level === 3 ? 'steps' : null, declares: { vars: ['x', 'y', 'r', 'φ'] },
    key: `${LPO}:${level}:${d.f}`, exam: false, expectedSec: [0, 120, 180, 200, 240][level],
  });
}

// Level 5: four limits in a row, as in the exams (one or two that do not exist).
function polarProblem(level, rng) {
  const kinds = rng.shuffle(['zero', 'sinc', rng.pick(['none', 'zero']), rng.pick(['paths', 'same', 'none'])]);
  const parts = kinds.map((k, i) => ({ item: limMcq(LPO, level, rng, k), points: 1, title: `Limite ${i + 1}` }));
  return problemItem({
    skill: LPO, level, prompt: 'Calcule ces quatre limites en (0, 0), sans aide (format QCM de l\'examen).',
    parts, key: `${level}:${parts.map((p) => p.item.key).join('|')}`, expectedSec: 480,
  });
}

function polarTf(rng, opts) {
  const kind = rng.pick(['phi', 'square', 'abs', 'rg', 'gphi']);
  const ex = examTag(opts) || { format: 'tf', points: 1 };
  if (kind === 'phi') {
    const L = rng.pick([1, 2, -1, 3]);
    return tfItem({
      skill: LPO, level: 4, truth: false, key: `phi:${L}`, exam: ex, ruleIfTrue: 'a2_lim_lines_only',
      statement: `Si pour tout φ, lim<sub>r→0</sub> f(r cos φ, r sin φ) = ${fq(L)} et f(0, 0) = ${fq(L)}, alors f est continue en (0, 0).`,
      counter: { kind: 'a2', prop: 'knownShift', params: { want: ['K2'], shift: L }, ask: [{ v: 'f', label: 'f(x, y) =', keys: ['calcx', 'calcfn', 'a2'] }], answer: { f: `${L}+x^2y/(x^4+y^2)` } },
      explanation: `Faux : f = ${fq(L)} + x²y/(x⁴ + y²) tend vers ${fq(L)} dans chaque direction fixée, mais vaut ${fq(L)} + 1/2 sur la parabole y = x².`,
    });
  }
  if (kind === 'square') {
    return tfItem({
      skill: LPO, level: 4, truth: true, key: 'square', exam: ex,
      statement: `Si |f(x, y)| ≤ x² + y² pour tout (x, y), alors ${LIMXY} f(x, y) = 0.`,
      explanation: 'Vrai : 0 ≤ |f| ≤ r² → 0, par les gendarmes.',
    });
  }
  if (kind === 'abs') {
    const L = rng.pick([1, 2, -3]);
    return tfItem({
      skill: LPO, level: 4, truth: true, key: `abs:${L}`, exam: ex,
      statement: `Si |f(x, y) − ${fq(L)}| ≤ |x| + |y| pour tout (x, y), alors ${LIMXY} f(x, y) = ${fq(L)}.`,
      explanation: 'Vrai : |x| + |y| ≤ 2r → 0, donc |f − L| → 0.',
    });
  }
  if (kind === 'rg') {
    return tfItem({
      skill: LPO, level: 4, truth: true, key: 'rg', exam: ex, ruleIfFalse: 'a2_lim_polar_r_forgot',
      statement: `Si f(r cos φ, r sin φ) = r·g(φ) avec g bornée, alors ${LIMXY} f(x, y) = 0.`,
      explanation: 'Vrai : |f| ≤ M·r → 0, même si g dépend de φ.',
    });
  }
  return tfItem({
    skill: LPO, level: 4, truth: true, key: 'gphi', exam: ex, ruleIfFalse: 'a2_lim_polar_theta',
    statement: `Si f(r cos φ, r sin φ) = g(φ) pour r > 0, avec g non constante, alors ${LIMXY} f(x, y) n'existe pas.`,
    explanation: 'Vrai : le long de la demi-droite d\'angle φ, f vaut g(φ) ; deux angles donnent deux valeurs.',
  });
}

function polarItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return polarTf(rng, opts);
  if (opts.exam === 'mcq') return limMcq(LPO, 4, rng, rng.pick(['zero', 'zero', 'sinc', 'none', 'none', 'paths']), opts);
  if (level === 5) return polarProblem(level, rng);
  return polarLines(level, rng, opts);
}

// ======================================================================
// a2-continuity
// ======================================================================

const CO_SUB = [
  { id: 'where', label: 'où étudier', skill: CO },
  { id: 'limit', label: 'limite en (0, 0)', skill: LPO },
  { id: 'extend', label: 'prolonger', skill: 'a1-fn-extension' },
];
const CO_CHOICES = [
  { id: 'polar', label: 'Écrire f en polaires' },
  { id: 'simplify', label: 'Simplifier par une puissance de r' },
  { id: 'bound', label: 'Majorer |cos φ| et |sin φ| par 1' },
  { id: 'limit', label: 'Faire tendre r vers 0' },
  { id: 'extend', label: 'Poser f(0, 0) = la limite' },
];
const whereDecision = (rng) => DEC('Où faut-il étudier la continuité de f ?', [
  { id: 'origin', label: 'Seulement en (0, 0), où la formule change', valid: true, ref: true },
  { id: 'axes', label: 'Sur les axes x = 0 et y = 0', valid: false, why: 'Hors de (0, 0), le dénominateur ne s\'annule pas : f est continue comme quotient de fonctions continues.' },
  { id: 'none', label: 'Nulle part : f est un quotient de fonctions continues', valid: false, why: 'En (0, 0), la formule n\'est pas définie : c\'est le seul point à étudier.' },
], rng);

function contLines(level, rng, opts) {
  const kind = rng.chance(0.55) ? 'zero' : 'sinc';
  const d = polarData(rng, kind);
  const L = kind === 'zero' ? q(0) : d.L;
  const parts = [];
  const where = level === 3 ? [whereDecision(rng)] : [NOTE('Hors de (0, 0), f est continue (opérations sur des fonctions continues, dénominateur non nul). Reste (0, 0).')];
  if (level === 1) {
    if (kind === 'zero') parts.push({ ...boundPart(d, 1, rng), choices: CO_CHOICES, pre: [...where, NOTE(`En polaires, f = ${M(d.simp)}.`)] });
    else parts.push({ start: d.simp, judge: LIMR, lines: [blanked(E(L.toString(), d.why, 'limit', 'limit'), [L.toString()])], choices: CO_CHOICES, pre: [...where, NOTE(`En polaires, f = ${M(d.simp)}. Limite quand r → 0⁺ :`)] });
  } else {
    parts.push(polarPart(d, level, { pre: where, choices: CO_CHOICES }));
    if (kind === 'zero') parts.push({ ...boundPart(d, level === 2 ? 3 : level, rng), choices: CO_CHOICES });
    else parts.push({ html: `Quand r → 0⁺ : ${M(`lim(${d.simp},r,0)`)}`, start: d.simp, judge: LIMR, lines: [E(L.toString(), d.why, 'limit', 'limit')], choices: CO_CHOICES });
  }
  const pre = level === 2 ? [DEC('Quelle valeur faut-il donner à a ?', [
    { id: 'lim', label: `a = ${fq(L)}, la limite en (0, 0)`, valid: true, ref: true },
    { id: 'other', label: `a = ${L.eq(1) ? '0' : '1'}`, valid: false, why: `f est continue en (0, 0) si f(0, 0) = lim f = ${fq(L)}.` },
    { id: 'none', label: 'Aucune : f n\'est pas définie en (0, 0)', valid: false, why: 'On choisit justement f(0, 0) = a : il faut a = lim f.' },
  ], rng)] : [];
  parts.push({
    html: `${kind === 'zero' ? `La limite vaut 0 (|f| ≤ ${M(d.bound)} → 0). ` : ''}f est continue en (0, 0) si f(0, 0) = lim f :`,
    ask: 'a =', start: 'a', judge: { kind: 'value', expect: L.toString(), form: 'irreducible' },
    lines: [E(L.toString(), 'a = la limite', 'extend', 'extend')], choices: CO_CHOICES, pre,
  });
  const as = assemble(parts, level);
  return linesItem({
    skill: CO, level,
    prompt: `Soit f(x, y) = ${M(d.f)} si (x, y) ≠ (0, 0), et f(0, 0) = a. Pour quelle valeur de a f est-elle continue sur ℝ² ?`,
    ...as, mode: modeOf(level),
    hints: H('Calcule la limite en (0, 0) ; a doit lui être égal.', kind === 'zero' ? `En polaires : f = ${M(d.simp)}, |f| ≤ ${M(d.bound)}` : 'Pose u = x² + y² = r².', `a = ${fq(L)}`),
    subgoals: CO_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null, declares: { vars: ['x', 'y', 'r', 'φ'] },
    key: `${CO}:${level}:${d.f}`, exam: false, expectedSec: [0, 120, 180, 200, 240][level],
  });
}

// « f continue en (0, 0) ? » (2018 Q6): along a line, or at a point.
function contMcq(level, rng, opts = {}) {
  const kind = rng.pick(['line', 'paths', 'zero', 'sinc', 'sincWrong', 'none']);
  const A = 'f est continue sur ℝ²';
  const B = 'f est continue sauf en (0, 0) : la limite y existe, mais diffère de f(0, 0)';
  const C = 'f est continue sauf en (0, 0) : la limite n\'y existe pas';
  const D = 'f n\'est continue en aucun point de l\'axe x = 0';
  let f;
  let at;
  let right;
  let rules = {};
  let why;
  let key;
  if (kind === 'line') {
    const k = rng.pick([1, 2, 3]);
    const c = rng.pick([2, 3]);
    const g = `${pw('y', k)}/(${c}+sin(1/x))`;
    const options = [
      { html: 'f est continue en (0, 0), mais pas aux points (0, y) avec y ≠ 0', correct: true },
      { html: A, correct: false, rule: 'a2_cont_partial_functions' },
      { html: D, correct: false },
      { html: 'f est continue sur ℝ² sauf en (0, 0)', correct: false },
    ];
    return mcq({
      skill: CO, level, prompt: `Soit f(x, y) = ${M(g)} si x ≠ 0, et f(0, y) = 0. Alors :`, options, key: `mcq:line:${g}`,
      exam: examTag(opts), expectedSec: 180,
      solution: [{ html: `En (0, 0) : |f| ≤ ${M(`abs(${pw('y', k)})/${c - 1}`)} → 0. En (0, y₀) avec y₀ ≠ 0 : quand x → 0, sin(1/x) oscille, et f(x, y₀) oscille entre y₀${k === 1 ? '' : SUPS[k]}/${c + 1} et y₀${k === 1 ? '' : SUPS[k]}/${c - 1} au lieu de tendre vers 0.`, note: '' }],
    }, rng);
  }
  if (kind === 'paths' || kind === 'none') {
    const c = kind === 'paths' ? pathsData(rng, { same: false }) : polarData(rng, 'none');
    f = c.f; at = 0; right = C; key = c.f;
    rules = { A: kind === 'paths' ? 'a2_lim_lines_only' : 'a2_lim_polar_theta' };
    why = kind === 'paths' ? `Les droites donnent 0, mais ${c.p2.at} → ${fq(c.L2)} : pas de limite en (0, 0).` : `En polaires, f = ${M(c.simp)} dépend de φ : pas de limite en (0, 0).`;
  } else if (kind === 'zero') {
    const c = polarData(rng, 'zero');
    f = c.f; at = 0; right = A; key = c.f; rules = { C: 'a2_lim_polar_r_forgot' };
    why = `|f| ≤ ${M(c.bound)} → 0 = f(0, 0).`;
  } else {
    const c = polarData(rng, 'sinc');
    f = c.f; key = c.f;
    if (kind === 'sinc') { at = c.L; right = A; why = `${c.why} = f(0, 0).`; } else { at = c.L.eq(1) ? q(0) : q(1); right = B; why = `${c.why}, mais f(0, 0) = ${fq(at)}.`; }
  }
  const options = [A, B, C, D].map((html, i) => ({ html, correct: html === right, rule: html === right ? null : rules['ABCD'[i]] ?? null }));
  return mcq({
    skill: CO, level, prompt: `Soit f(x, y) = ${M(f)} si (x, y) ≠ (0, 0), et f(0, 0) = ${fq(at)}. Alors :`, options, keepOrder: true,
    key: `mcq:${kind}:${key}:${at}`, exam: examTag(opts), expectedSec: 180, solution: [{ html: why, note: '' }],
  }, rng);
}

function contTf(rng, opts) {
  const kind = rng.pick(['dirs', 'partials', 'partials', 'restrict', 'extend']);
  const ex = examTag(opts) || { format: 'tf', points: 1 };
  const ask = [{ v: 'f', label: 'f(x, y) =', keys: ['calcx', 'calcfn', 'a2'] }];
  if (kind === 'dirs') {
    const L = rng.pick([2, 1, -1, 3]);
    return tfItem({
      skill: CO, level: 4, truth: false, key: `dirs:${L}`, exam: ex, ruleIfTrue: 'a2_lim_lines_only',
      statement: `Si lim<sub>t→0</sub> f(t cos θ, t sin θ) = ${fq(L)} pour tout θ, alors f se prolonge par continuité en (0, 0).`,
      counter: { kind: 'a2', prop: 'knownShift', params: { want: ['K2'], shift: L }, ask, answer: { f: `${L}+x^2y/(x^4+y^2)` } },
      explanation: `Faux : ${fq(L)} + x²y/(x⁴ + y²) tend vers ${fq(L)} dans chaque direction, mais vaut ${fq(L)} + 1/2 sur y = x² : pas de limite.`,
    });
  }
  if (kind === 'partials') {
    return tfItem({
      skill: CO, level: 4, truth: false, key: 'partials', exam: ex, ruleIfTrue: 'a2_cont_partial_functions',
      statement: 'Si les fonctions partielles x ↦ f(x, 0) et y ↦ f(0, y) sont continues en 0, alors f est continue en (0, 0).',
      counter: { kind: 'a2', prop: 'knownFn', params: { want: ['K1', 'K2'] }, ask, answer: { f: 'x y/(x^2+y^2)' } },
      explanation: 'Faux : xy/(x² + y²) (et 0 en (0, 0)) vaut 0 sur les deux axes, mais 1/2 sur y = x.',
    });
  }
  if (kind === 'restrict') {
    return tfItem({
      skill: CO, level: 4, truth: true, key: 'restrict', exam: ex, ruleIfFalse: 'a2_cont_partial_functions',
      statement: 'Si f est continue en (0, 0), alors x ↦ f(x, 0) est continue en 0.',
      explanation: 'Vrai : la composée de x ↦ (x, 0), continue, et de f, continue en (0, 0), est continue.',
    });
  }
  return tfItem({
    skill: CO, level: 4, truth: true, key: 'extend', exam: ex,
    statement: `Si ${LIMXY} f(x, y) = L existe, alors f, définie hors de (0, 0), se prolonge par continuité en posant f(0, 0) = L.`,
    explanation: 'Vrai : c\'est la définition du prolongement par continuité.',
  });
}

function contItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return contTf(rng, opts);
  if (opts.exam === 'mcq' || level === 5) return contMcq(opts.exam ? 4 : 5, rng, opts);
  return contLines(level, rng, opts);
}

export const GEN_LIM = { [LP]: pathsItem, [LPO]: polarItem, [CO]: contItem };
