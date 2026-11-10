// Generators of module A2, part d (unit `analyse2`, step U6): implicit
// functions, y = g(x) from F(x, y) = 0 and z = g(x, y) (or y = g(x, z))
// from F(x, y, z) = 0. Catalogue: docs/universite/A2-analyse-2.md,
// a2-implicit-2var and a2-implicit-3var.
//
// F is a polynomial with whole coefficients, possibly with a factor
// e^(z − x) in 3 variables (the point then has z = x), kept as a list of
// terms so that every derivative and value is exact. An item is made of
// parts (segments):
//   hyp       F_w(p) ≠ 0, w the eliminated variable (`value` with expect)
//   partials  F_u(p), F_v(p) (3 variables, `value`)
//   first     g_u = −F_u/F_w (`value`; cfg.imp feeds the traps sign,
//             inverted and wrong_var)
//   second-id the derivative in u of F_u + F_w·p = 0 with w = g, written
//             with p = g_u and q = g_uu (`equiv` with cfg.implicit = {w: 'p',
//             p: 'q'}: d(…) is the total derivative)
//   solve     g_uu (`value`; cfg.imp.wrong2 feeds a2_implicit_second_const)

import { Q } from '../../math/rational.js';
import { MT, linesItem, mcq, tfItem, examTag } from './kit.js';
import { modeOf, H, E, blanked, partsScript, fr, A2_KEYS } from './a2-kit.js';

// ---------- terms c·xⁱyʲzᵏpˡqᵐ (·e^(z − x)) ----------

const VARS = ['x', 'y', 'z', 'p', 'q'];
const IX = { x: 0, y: 1, z: 2, p: 3, q: 4 };
const term = (c, e = [], ex = 0) => ({ c: Q.of(c), e: [0, 1, 2, 3, 4].map((i) => e[i] || 0), ex });
const keyOf = (t) => `${t.e.join(',')}|${t.ex}`;
function collect(ts) {
  const map = new Map();
  for (const t of ts) {
    const k = keyOf(t);
    map.set(k, map.has(k) ? term(map.get(k).c.add(t.c), t.e, t.ex) : t);
  }
  return [...map.values()].filter((t) => t.c.n !== 0);
}
export function pd(ts, v) {
  const i = IX[v];
  const out = [];
  for (const t of ts) {
    if (t.e[i] > 0) { const e = [...t.e]; e[i] -= 1; out.push(term(t.c.mul(t.e[i]), e, t.ex)); }
    if (t.ex && (v === 'x' || v === 'z')) out.push(term(v === 'x' ? t.c.neg() : t.c, t.e, 1));
  }
  return collect(out);
}
const times = (ts, v) => ts.map((t) => { const e = [...t.e]; e[IX[v]] += 1; return term(t.c, e, t.ex); });
const plus = (...ls) => collect(ls.flat());
// d/du of an expression of u, w = g(u, …), p = g_u, q = g_uu.
const totalD = (ts, u, w) => plus(pd(ts, u), times(pd(ts, w), 'p'), times(pd(ts, 'p'), 'q'));

export function valueAt(ts, env) {
  let s = Q.of(0);
  for (const t of ts) {
    let v = t.c;
    VARS.forEach((n, i) => { if (t.e[i]) v = v.mul(Q.of(env[n]).pow(t.e[i])); });
    if (t.ex && !Q.of(env.z).eq(Q.of(env.x))) throw new Error('e^(z − x) hors de z = x');
    s = s.add(v);
  }
  return s;
}

const qText = (x) => { const v = Q.of(x); return v.d === 1 ? String(v.n) : `${v.n}/${v.d}`; };
const qPar = (x) => { const v = Q.of(x); return v.n >= 0 && v.d === 1 ? String(v.n) : `(${qText(v)})`; };
const deg = (t) => t.e[0] + t.e[1] + t.e[2] + t.ex;
// Terms without p and q first, by decreasing degree; then p, p², q.
function sorted(ts) {
  const rank = (t) => t.e[4] * 100 + t.e[3] * 10;
  return [...ts].sort((a, b) => rank(a) - rank(b) || deg(b) - deg(a) || b.e.join('').localeCompare(a.e.join('')));
}
function termText(t) {
  const fs = [];
  VARS.forEach((n, i) => { if (t.e[i]) fs.push(t.e[i] === 1 ? n : `${n}^${t.e[i]}`); });
  if (t.ex) fs.push('e^(z-x)');
  const a = t.c.n < 0 ? t.c.neg() : t.c;
  const coef = fs.length && a.eq(1) ? '' : qText(a);
  return { neg: t.c.n < 0, body: coef + fs.join(' ') };
}
export function polyText(ts, { order = true } = {}) {
  const list = order ? sorted(ts) : ts;
  if (!list.length) return '0';
  return list.map((t, k) => { const { neg, body } = termText(t); return k === 0 ? (neg ? `-${body}` : body) : `${neg ? '-' : '+'}${body}`; }).join('');
}
// The derived identity, grouped by powers of p and q: 2 + 2p + 6y p² + (x + 3y²)q.
function idText(ts) {
  const groups = new Map();
  for (const t of sorted(ts)) {
    const k = `${t.e[3]},${t.e[4]}`;
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(t);
  }
  const out = [];
  for (const [k, g] of groups) {
    const [ep, eq] = k.split(',').map(Number);
    const pq = [ep ? (ep === 1 ? 'p' : `p^${ep}`) : '', eq ? (eq === 1 ? 'q' : `q^${eq}`) : ''].filter(Boolean).join(' ');
    const coef = g.map((t) => { const e = [...t.e]; e[3] = 0; e[4] = 0; return term(t.c, e, t.ex); });
    let text;
    if (!pq || coef.length === 1) text = polyText(g);
    else text = `(${polyText(coef)})${pq}`;
    out.push(out.length && !text.startsWith('-') ? `+${text}` : text);
  }
  return out.join('') || '0';
}
// A factor: brackets around a sum or a negative term.
const wrap = (ts) => (ts.length === 1 && ts[0].c.n > 0 ? polyText(ts) : `(${polyText(ts)})`);
// The terms with the point's values put in: 3×1×(−2)^2.
function atText(ts, env) {
  if (!ts.length) return '0';
  return sorted(ts).map((t, k) => {
    const a = t.c.n < 0 ? t.c.neg() : t.c;
    const fs = [];
    VARS.forEach((n, i) => { if (t.e[i]) fs.push(t.e[i] === 1 ? qPar(env[n]) : `${qPar(env[n])}^${t.e[i]}`); });
    if (t.ex) fs.push(`e^(${qPar(env.z)}-${qPar(env.x)})`);
    if (!a.eq(1) || !fs.length) fs.unshift(qText(a));
    const body = fs.join('×');
    return k === 0 ? (t.c.n < 0 ? `-${body}` : body) : `${t.c.n < 0 ? '-' : '+'}${body}`;
  }).join('');
}
// F with a positive first term (−F defines the same g).
const positive = (ts) => (sorted(ts)[0].c.n < 0 ? ts.map((t) => term(t.c.neg(), t.e, t.ex)) : ts);
// The lines of −F_u/F_w: the quotient written, then its value (the
// quotient alone when it is already the value, brackets aside).
function quot(top, den, val, note) {
  const line = `-(${top})/(${qText(den)})`;
  const last = E(qText(val), 'Simplifier', 'first', 'first');
  return line.replace(/[()]/g, '') === qText(val) ? [{ ...last, note }] : [E(line, note, 'first', 'first'), last];
}
// True if the text is only a number (a value line that would end the part).
const literal = (s) => /^\(?-?\d+(\/\d+)?\)?$/.test(s);

// The analysis of F at the point, with w = g(u, …): values, the derived
// identity and the trap values.
function analyse(F, pt, u, w, v = null) {
  const env = { x: 0, y: 0, z: 0, ...pt };
  const Fu = pd(F, u);
  const Fw = pd(F, w);
  const Fv = v ? pd(F, v) : null;
  const FuV = valueAt(Fu, env);
  const FwV = valueAt(Fw, env);
  const FvV = Fv ? valueAt(Fv, env) : null;
  if (FwV.n === 0) return null;
  const g1 = FuV.div(FwV).neg();
  const gv = Fv ? FvV.div(FwV).neg() : null;
  const id = totalD(plus(Fu, times(Fw, 'p')), u, w);
  const withP = { ...env, p: g1, q: 0 };
  const rest = id.filter((t) => t.e[4] === 0);
  const A = valueAt(rest, withP);
  const g2 = A.div(FwV).neg();
  const Fuu = valueAt(pd(Fu, u), env);
  const Fwu = valueAt(pd(Fw, u), env);
  const g2c = Fuu.mul(FwV).sub(FuV.mul(Fwu)).div(FwV.mul(FwV)).neg();
  return { F, pt: env, u, w, v, Fu, Fw, Fv, FuV, FwV, FvV, g1, gv, id, rest, withP, g2, g2c };
}

// ======================================================================
// a2-implicit-2var
// ======================================================================

const I2 = 'a2-implicit-2var';
const I2_SUB = [
  { id: 'hyp', label: 'hypothèse F_y ≠ 0', skill: I2 },
  { id: 'first', label: 'g′ = −F_x/F_y', skill: I2 },
  { id: 'second-id', label: 'dériver l\'identité (règle de chaîne)', skill: 'a2-chain' },
  { id: 'substitute', label: 'remplacer les valeurs', skill: 'rat-simplify' },
  { id: 'solve', label: 'isoler g″', skill: 'rat-simplify' },
];

const POOL2 = [[2, 0], [1, 1], [0, 2], [0, 3], [1, 2], [2, 1], [3, 0], [1, 0], [0, 1]];
function i2Data(rng) {
  for (let it = 0; it < 200; it++) {
    const a = rng.int(-2, 2);
    const b = rng.pick([-2, -1, 1, 2]);
    const n = rng.pick([2, 3, 3]);
    const picks = rng.shuffle([...POOL2]).slice(0, n);
    const ts = picks.map(([i, j]) => term(rng.pick([-3, -2, -1, 1, 1, 2, 3]), [i, j]));
    if (!ts.some((t) => t.e[1] >= 1) || !ts.some((t) => t.e[0] >= 1) || !ts.some((t) => deg(t) >= 2)) continue;
    const c0 = valueAt(ts, { x: a, y: b }).neg();
    if (Math.abs(c0.valueOf()) > 20) continue;
    const F = positive(c0.n ? [...ts, term(c0)] : ts);
    const d = analyse(F, { x: a, y: b }, 'x', 'y');
    if (!d || d.FuV.n === 0 || d.g1.d > 6 || Math.abs(d.FuV.valueOf()) > 30 || Math.abs(d.FwV.valueOf()) > 30) continue;
    if (d.g2.d > 128 || Math.abs(d.g2.n) > 400) continue;
    const vals = [d.g1, d.g1.neg(), d.FwV.div(d.FuV).neg()];
    if (new Set(vals.map(String)).size < 3) continue;
    if (d.g2.eq(d.g2c)) continue;
    return d;
  }
  // The catalogue's fallback: x² + y² = 2 at (1, 1).
  return { ...analyse([term(1, [2, 0]), term(1, [0, 2]), term(-2)], { x: 1, y: 1 }, 'x', 'y'), fallback: true };
}

// The value judge of a part, with the data its traps read.
const valueJ = (expect, imp) => ({ kind: 'value', expect: qText(expect), ...(imp ? { imp } : {}) });
const firstImp = (d) => ({
  role: 'first', num: qText(d.FuV), den: qText(d.FwV), var: d.w, value: qText(d.g1),
  others: d.v && d.FvV.n !== 0 ? [{ v: d.v, value: qText(d.FvV) }] : [],
});
const secondImp = (d) => ({ role: 'second', wrong2: qText(d.g2c), value: qText(d.g2) });
const idJudge = (d) => {
  const vars = [d.u, ...['x', 'y', 'z'].filter((n) => n !== d.u && (n !== 'z' || d.v || d.w === 'z')), 'p', 'q'];
  return {
    kind: 'equiv', vars, implicit: { [d.w]: 'p', p: 'q' }, target: 'no-prime',
    domain: Object.fromEntries(vars.map((n) => [n, [-2, 2]])),
  };
};
const pointText = (d, names) => `(${names.map((n) => fr(qText(d.pt[n]))).join(' ; ')})`;
const FML = (d) => MT(`${polyText(d.F)}`, { vars: VARS });

// The parts of an implicit item. names: the variables of F in order.
function implicitParts(d, level, names, { g1Label, g2Label, g2Start, sub = [] }) {
  const { u, w } = d;
  const P = pointText(d, names);
  const FwAt = atText(d.Fw, d.pt);
  const FuAt = atText(d.Fu, d.pt);
  const hypLines = [...(literal(FwAt) ? [] : [E(FwAt, `F_${w} en ${P}`, 'hyp', 'partial')]), E(qText(d.FwV), '≠ 0 : le théorème s\'applique', 'hyp', 'partial')];
  const theorem = {
    kind: 'decision', prompt: `F_${w}${P} = ${fr(qText(d.FwV))}. Le théorème des fonctions implicites donne-t-il ${w} = g(…) près de ${P} ?`,
    options: [
      { id: 'yes', label: `Oui : F${P} = 0, F est C¹ et F_${w}${P} ≠ 0`, valid: true },
      { id: 'no', label: `Non : il faudrait aussi F_${u}${P} = 0`, valid: false, why: `Seule la dérivée de la variable qui devient la fonction, ici ${w}, doit être non nulle.` },
    ],
  };
  const firstLines = quot(FuAt, d.FwV, d.g1, `F_${u}${P} = ${fr(qText(d.FuV))}`);
  const idLine = idText(d.id);
  const idStart = `d(${polyText(d.Fu)}+${wrap(d.Fw)} p)`;
  const subst = `-(${atText(d.rest, d.withP)})/(${qText(d.FwV)})`;
  const parts = [];
  parts.push({ start: `F_${w}`, judge: valueJ(d.FwV), lines: hypLines });
  parts.push(...sub);
  parts.push({
    html: `${g1Label} = −F_${u}/F_${w} :`, ask: `${g1Label} =`, start: `-F_${u}/F_${w}`, judge: valueJ(d.g1, firstImp(d)),
    pre: level >= 2 && level <= 4 ? [theorem] : [{ kind: 'note', html: `F${P} = 0 et F_${w}${P} ≠ 0 : le théorème s'applique.` }],
    lines: firstLines,
  });
  if (level >= 2) {
    parts.push({
      html: `Dérive l'identité F_${u} + F_${w}·p = 0 par rapport à ${u}, avec ${w} = g(…), p = ${g1Label.replace(/\(.*$/, '')} et q = ${g2Label.replace(/\(.*$/, '')} (d(…) est la dérivée totale, y′ = p) :`,
      ask: '0 =', start: idStart, judge: idJudge(d), lines: [E(idLine, `F_${u}${u} + 2F_${u}${w}·p + F_${w}${w}·p² + F_${w}·q`, 'second-id', 'derive')],
    });
    parts.push({
      html: `Remplace ${names.map((n) => `${n} = ${fr(qText(d.pt[n]))}`).join(', ')} et p = ${fr(qText(d.g1))}, puis isole q :`,
      ask: `${g2Label} =`, start: g2Start || `g_(${u}${u})`, judge: valueJ(d.g2, secondImp(d)),
      lines: [E(subst, 'Remplacer', 'substitute', 'subst'), E(qText(d.g2), 'Isoler q', 'solve', 'solve')],
    });
  }
  return { parts, idText: idLine, subst, FuAt, FwAt, P };
}

// Blanks of the guided levels.
function guide(parts, level) {
  for (const p of parts) {
    p.lines = p.lines.map((l) => {
      if (level === 1 && p.judge.kind === 'value' && literal(l.math)) return blanked(l, [l.math]);
      if (level === 2 && p.judge.kind === 'equiv') return blankFirstNumbers(l, 2);
      if (level === 2 && p.judge.kind === 'value' && l.subgoal === 'solve') return blanked(l, [l.math]);
      return l;
    });
  }
  return parts;
}
// The first k whole numbers (coefficients) of a line left blank.
function blankFirstNumbers(l, k) {
  const nums = (l.math.match(/\d+/g) || []).filter((s, i, a) => a.indexOf(s) === i).slice(0, k);
  return nums.length ? blanked(l, nums, { vars: VARS }) : l;
}

const CHOICES = [
  { id: 'partial', label: 'Dérivée partielle de F au point' },
  { id: 'first', label: 'g′ = −F_u/F_w (dérivée de la variable éliminée au dénominateur)' },
  { id: 'derive', label: 'Dériver F_u + F_w·g′ = 0 (règle de chaîne)' },
  { id: 'subst', label: 'Remplacer les valeurs au point' },
  { id: 'solve', label: 'Isoler la dérivée seconde' },
  { id: 'flip', label: 'g′ = −F_w/F_u', rule: 'a2_implicit_inverted', why: 'La dérivée de la variable qui devient la fonction va au dénominateur.' },
  { id: 'const', label: 'Dériver F_u/F_w en gardant la fonction constante', rule: 'a2_implicit_second_const', why: 'La fonction implicite dépend de la variable : dérive aussi par rapport à elle, fois g′.' },
];

function i2Lines(level, rng, opts, d) {
  const a = fr(qText(d.pt.x));
  const { parts, idText, subst } = implicitParts(d, level, ['x', 'y'], { g1Label: `g′(${a})`, g2Label: `g″(${a})`, g2Start: "g''" });
  if (level === 1) parts.splice(2);
  if (level <= 2) guide(parts, level);
  if (level === 3) {
    const solvable = d.F.every((t) => t.e[1] <= 1);
    parts[0].pre = [{
      kind: 'decision', prompt: `Comment obtiens-tu g′(${a}) et g″(${a}) ?`, options: [
        { id: 'implicit', label: 'Dérivation implicite : F(x, g(x)) = 0', valid: true, ref: true },
        solvable
          ? { id: 'solve', label: 'Résoudre en y, puis dériver deux fois', valid: true, quality: 'poor', why: 'Juste, mais le quotient se dérive deux fois : la dérivation implicite est plus courte.' }
          : { id: 'solve', label: 'Résoudre en y, puis dériver deux fois', valid: false, why: 'On ne sait pas isoler y dans cette équation : c\'est tout l\'intérêt du théorème.' },
      ],
    }];
  }
  const { start, judge, script } = partsScript(parts, level, CHOICES);
  const F = polyText(d.F);
  return linesItem({
    skill: I2, level, mode: modeOf(level), start, judge, script,
    prompt: `L'équation ${MT(`${F}=0`, { vars: VARS })} définit y = g(x) près de ${pointText(d, ['x', 'y'])}. Vérifie F_y ≠ 0, puis calcule g′(${a})${level >= 2 ? ` et g″(${a})` : ''}.`,
    hints: H(`Vérifie F_y ≠ 0, puis g′ = −F_x/F_y.${level >= 2 ? ' Pour g″, dérive F_x + F_y·g′ = 0 avec y = g(x).' : ''}`,
      level >= 2 ? `F_xx + 2F_xy·p + F_yy·p² + F_y·q = 0 : ici ${MT(idText, { vars: VARS })} = 0, avec p = g′(${a}) = ${MT(qText(d.g1))}.` : `g′(${a}) = −(${fr(qText(d.FuV))})/(…)`,
      level >= 2 ? `g″(${a}) = ${MT(subst)}` : `g′(${a}) = ${MT(qText(d.g1))}`),
    subgoals: I2_SUB, keys: [...A2_KEYS, 'calc'], tapActions: level === 3 ? 'steps' : null,
    declares: { vars: VARS },
    key: `${I2}:${level}:${F}:${a}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// Four distinct values: the right one and the traps, then fillers.
function valueOptions(right, wrongs, fillers) {
  const out = [{ html: MT(qText(right)), correct: true }];
  for (const w of [...wrongs, ...fillers.map((f) => ({ value: f }))]) {
    if (out.length >= 4) break;
    const html = MT(qText(w.value));
    if (out.some((o) => o.html === html)) continue;
    out.push({ html, correct: false, rule: w.rule || null });
  }
  return out;
}

function i2Mcq(rng, level, opts) {
  const d = i2Data(rng);
  const a = fr(qText(d.pt.x));
  const F = polyText(d.F);
  const second = rng.chance(0.5);
  const right = second ? d.g2 : d.g1;
  const wrongs = second
    ? [{ value: d.g2c, rule: 'a2_implicit_second_const' }, { value: d.g2.neg() }, { value: d.g2.mul(2) }]
    : [{ value: d.g1.neg(), rule: 'a2_implicit_sign' }, ...(d.FuV.n ? [{ value: d.FwV.div(d.FuV).neg(), rule: 'a2_implicit_inverted' }] : []), { value: d.FwV.div(d.FuV) }];
  return mcq({
    skill: I2, level, prompt: `L'équation ${MT(`${F}=0`, { vars: VARS })} définit y = g(x) près de ${pointText(d, ['x', 'y'])}. ${second ? `g″(${a})` : `g′(${a})`} vaut :`,
    options: valueOptions(right, wrongs, [right.add(1), right.sub(1), right.mul(3)]),
    key: `${I2}:mcq:${second ? 2 : 1}:${F}:${a}`, expectedSec: 180, exam: opts.exam ? { format: 'mcq', points: 1 } : false,
    solution: [{ html: `F_x = ${MT(polyText(d.Fu), { vars: VARS })}, F_y = ${MT(polyText(d.Fw), { vars: VARS })} : g′(${a}) = −F_x/F_y = ${MT(qText(d.g1))}.${second ? ` Puis ${MT(idText(d.id), { vars: VARS })} = 0 avec p = g′, q = g″ : g″(${a}) = ${MT(qText(d.g2))}.` : ''}`, note: '' }],
    fallback: !!d.fallback,
  }, rng);
}

// V/F on the hypotheses of the theorem (2020 Q24). The false statements are
// 2-option multiple choices (no checker for a function F of two variables).
function vf(skill, statement, truth, rng, { key, why, ruleIfTrue = null, level = 4, exam = true }) {
  return mcq({
    skill, level, prompt: `Vrai ou faux ?<br>« ${statement} »`, keepOrder: true,
    options: [{ html: 'Vrai', correct: truth, rule: truth ? null : ruleIfTrue }, { html: 'Faux', correct: !truth }],
    key: `${skill}:tf:${key}`, solution: [{ html: why, note: '' }], expectedSec: 60, exam: exam ? { format: 'tf', points: 1 } : false,
  }, rng);
}
function i2Tf(rng, level, opts) {
  const exam = !!opts.exam;
  const kind = rng.pick(['swap', 'swap', 'wrongvar', 'value', 'value']);
  if (kind === 'swap') {
    const [a, b] = rng.pick([[1, 0], [0, 1], [2, -1], [-1, 2]]);
    return tfItem({
      skill: I2, level, statement: `Si F est de classe C¹ sur ℝ², F(${fr(a)}, ${fr(b)}) = 0 et ∂F/∂x(${fr(a)}, ${fr(b)}) ≠ 0, alors il existe une fonction f définie près de ${fr(b)}, avec f(${fr(b)}) = ${fr(a)} et F(f(y), y) = 0.`,
      truth: true, key: `swap:${a}:${b}`, exam: exam ? { format: 'tf', points: 1 } : false, noHints: level >= 5,
      explanation: 'Vrai : c\'est le théorème des fonctions implicites, les rôles de x et y échangés : x = f(y) existe dès que la dérivée par rapport à x (la variable éliminée) est non nulle.',
    });
  }
  if (kind === 'wrongvar') {
    return vf(I2, 'Si F est C¹, F(1, 0) = 0 et ∂F/∂x(1, 0) ≠ 0, alors il existe g avec g(1) = 0 et F(x, g(x)) = 0 près de 1.', false, rng, {
      key: 'wrongvar', level, exam, ruleIfTrue: 'a2_implicit_inverted',
      why: 'Faux : pour y = g(x), c\'est ∂F/∂y(1, 0) ≠ 0 qu\'il faut. Avec F = x − 1 − y², ∂F/∂x = 1, mais x − 1 = y² ne définit pas y comme fonction de x près de 1.',
    });
  }
  const d = i2Data(rng);
  const a = fr(qText(d.pt.x));
  const F = polyText(d.F);
  const truth = rng.chance(0.4);
  const shown = truth ? d.g1 : d.g1.neg();
  return vf(I2, `L'équation ${MT(`${F}=0`, { vars: VARS })} définit y = g(x) près de ${pointText(d, ['x', 'y'])}, et g′(${a}) = ${MT(qText(shown))}.`, truth, rng, {
    key: `value:${F}:${truth}`, level, exam, ruleIfTrue: truth ? null : 'a2_implicit_sign',
    why: `${truth ? 'Vrai' : 'Faux'} : F_y${pointText(d, ['x', 'y'])} = ${fr(qText(d.FwV))} ≠ 0 et g′(${a}) = −F_x/F_y = ${MT(qText(d.g1))}.`,
  });
}

function i2Item(level, rng, opts = {}) {
  if (opts.exam === 'mcq') return i2Mcq(rng, 4, opts);
  if (opts.exam === 'tf') return i2Tf(rng, 4, opts);
  if (level === 5) {
    const it = rng.chance(0.65) ? i2Mcq(rng, 5, {}) : i2Tf(rng, 5, {});
    return { ...it, level: 5, exam: false, noHints: true, hints: [] };
  }
  return i2Lines(level, rng, opts, i2Data(rng));
}

// ======================================================================
// a2-implicit-3var
// ======================================================================

const I3 = 'a2-implicit-3var';
const I3_SUB = [
  { id: 'hyp', label: 'hypothèse F_w ≠ 0', skill: I3 },
  { id: 'partials', label: 'dérivées partielles au point', skill: 'a2-partials' },
  { id: 'first', label: 'g_x = −F_x/F_w', skill: I3 },
  { id: 'second-id', label: 'dériver l\'identité', skill: I2 },
  { id: 'solve', label: 'isoler la dérivée seconde', skill: 'rat-simplify' },
];

const POOL3 = [[1, 0, 1], [0, 1, 1], [1, 1, 0], [2, 0, 0], [0, 2, 0], [0, 0, 2], [1, 0, 2], [0, 1, 2], [2, 0, 1], [0, 2, 1], [1, 1, 1], [0, 0, 3], [1, 0, 0], [0, 1, 0], [0, 0, 1]];
function i3Data(rng) {
  for (let it = 0; it < 200; it++) {
    const withExp = rng.chance(0.35);
    const x0 = rng.pick([-1, 1, 2]);
    const y0 = rng.pick([-2, -1, 1, 2]);
    const z0 = withExp ? x0 : rng.pick([-1, 1, 2]);
    const n = withExp ? 2 : rng.pick([3, 3, 4]);
    const ts = rng.shuffle([...POOL3]).slice(0, n).map((e) => term(rng.pick([-3, -2, -1, 1, 1, 2, 3]), e));
    if (withExp) ts.push(term(rng.pick([-2, -1, 1, 2, 3, 4]), rng.pick([[0, 0, 0], [0, 1, 0]]), 1));
    const w = rng.chance(0.75) ? 'z' : 'y';
    const [u, v] = w === 'z' ? ['x', 'y'] : ['x', 'z'];
    if (!['x', 'y', 'z'].every((name) => ts.some((t) => t.e[IX[name]] > 0 || (t.ex && name !== 'y')))) continue;
    const pt = { x: x0, y: y0, z: z0 };
    const c0 = valueAt(ts, pt).neg();
    if (Math.abs(c0.valueOf()) > 20) continue;
    const F = positive(c0.n ? [...ts, term(c0)] : ts);
    const d = analyse(F, pt, u, w, v);
    if (!d || d.FuV.n === 0 || d.FvV.n === 0 || d.g1.d > 10 || d.gv.d > 10) continue;
    if ([d.FuV, d.FvV, d.FwV].some((x) => Math.abs(x.valueOf()) > 30)) continue;
    if (d.g2.d > 200 || Math.abs(d.g2.n) > 600 || d.g2.eq(d.g2c)) continue;
    const firsts = [d.g1, d.g1.neg(), d.FwV.div(d.FuV).neg(), d.FuV.div(d.FvV).neg()];
    if (new Set(firsts.map(String)).size < 4) continue;
    return { ...d, c0: F.find((t) => !t.e.some((k) => k) && !t.ex)?.c ?? Q.of(0), withExp };
  }
  // The catalogue's fallback (2021 Q12): z·y⁵ + 4e^(z − x) − 2 = 0 at (2, −1, 2).
  const F = [term(1, [0, 5, 1]), term(4, [], 1), term(-2)];
  return { ...analyse(F, { x: 2, y: -1, z: 2 }, 'y', 'z', 'x'), c0: Q.of(-2), withExp: true, fallback: true };
}

// The equation as the prompt writes it: P = c (c ≠ 0 half the time) or F = 0.
function eq3(d, rng) {
  const c = d.c0.neg();
  const withoutConst = d.F.filter((t) => t.e.some((k) => k) || t.ex);
  return c.n && rng.chance(0.5) ? `${polyText(withoutConst)}=${qText(c)}` : `${polyText(d.F)}=0`;
}

function i3Lines(level, rng, opts, d) {
  const names = ['x', 'y', 'z'];
  const P = pointText(d, names);
  const { u, v, w } = d;
  const others = names.filter((n) => n !== w).map((n) => fr(qText(d.pt[n]))).join(' ; ');
  const g1Label = `g_${u}(${others})`;
  const gvLabel = `g_${v}(${others})`;
  const gvAt = atText(d.Fv, d.pt);
  // F_u(p) and F_v(p) (partials), then g_v after g_u.
  const partial = (n, ts, val) => ({
    html: `F_${n}${P} :`, ask: `F_${n}${P} =`, start: `F_${n}`, judge: valueJ(val),
    lines: [...(literal(atText(ts, d.pt)) ? [] : [E(atText(ts, d.pt), `F_${n} = ${polyText(ts)}`, 'partials', 'partial')]), E(qText(val), 'Calculer', 'partials', 'partial')],
  });
  const sub = level >= 2 ? [partial(u, d.Fu, d.FuV), partial(v, d.Fv, d.FvV)] : [];
  const { parts, idText, subst } = implicitParts(d, level, names, { g1Label, g2Label: `g_${u}${u}(${others})`, sub });
  const iFirst = parts.findIndex((p) => p.start === `-F_${u}/F_${w}`);
  // At level 1 and from level 2, F_u is known: the line of g_u is a quotient of values.
  parts[iFirst].lines = quot(qText(d.FuV), d.FwV, d.g1, `F_${u}${P} = ${fr(qText(d.FuV))}`);
  if (level === 1) {
    parts[iFirst].lines = quot(atText(d.Fu, d.pt), d.FwV, d.g1, `F_${u}${P}`);
  }
  parts.splice(iFirst + 1, 0, {
    html: `${gvLabel} = −F_${v}/F_${w} :`, ask: `${gvLabel} =`, start: `-F_${v}/F_${w}`,
    judge: valueJ(d.gv, { role: 'first', num: qText(d.FvV), den: qText(d.FwV), var: w, value: qText(d.gv), others: d.FuV.n ? [{ v: u, value: qText(d.FuV) }] : [] }),
    lines: quot(level === 1 ? gvAt : qText(d.FvV), d.FwV, d.gv, `F_${v}${P} = ${fr(qText(d.FvV))}`),
  });
  if (level === 1) parts.splice(iFirst + 2);
  if (level <= 2) guide(parts, level);
  if (level === 3) {
    parts[0].pre = [{
      kind: 'decision', prompt: `L'énoncé dit ${w} = g(${names.filter((n) => n !== w).join(', ')}). Quelle dérivée de F va au dénominateur ?`, options: [
        ...names.map((n) => ({
          id: n, label: `F_${n}`, valid: n === w, ...(n === w ? { ref: true } : { rule: 'a2_implicit_wrong_var', why: `La fonction est ${w} = g(…) : c'est F_${w} qui va au dénominateur.` }),
        })),
      ],
    }];
  }
  const { start, judge, script } = partsScript(parts, level, CHOICES);
  const eqText = eq3(d, rng);
  return linesItem({
    skill: I3, level, mode: modeOf(level), start, judge, script,
    prompt: `L'équation ${MT(eqText, { vars: VARS })} définit ${w} = g(${names.filter((n) => n !== w).join(', ')}) près de ${P}. Vérifie F_${w} ≠ 0, puis calcule ${g1Label.replace(/\(.*/, '')}, ${gvLabel.replace(/\(.*/, '')}${level >= 2 ? ` et g_${u}${u}` : ''} en (${others}).`,
    hints: H(`La dérivée de la variable éliminée, ${w}, va au dénominateur, avec un signe moins : g_${u} = −F_${u}/F_${w}.`,
      `${g1Label} = −(${fr(qText(d.FuV))})/(${fr(qText(d.FwV))})`,
      level >= 2 ? `${MT(idText, { vars: VARS })} = 0, puis ${MT(subst)}` : MT(qText(d.g1))),
    subgoals: I3_SUB, keys: [...A2_KEYS, 'calc'], tapActions: level === 3 ? 'steps' : null,
    declares: { vars: VARS },
    key: `${I3}:${level}:${eqText}:${P}:${w}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

function i3Mcq(rng, level, opts) {
  const d = i3Data(rng);
  const names = ['x', 'y', 'z'];
  const P = pointText(d, names);
  const { u, v, w } = d;
  const others = names.filter((n) => n !== w).map((n) => fr(qText(d.pt[n]))).join(' ; ');
  const eqText = eq3(d, rng);
  const pair = (a, b) => `g_${u}(${others}) = ${MT(qText(a))} et g_${v}(${others}) = ${MT(qText(b))}`;
  const second = rng.chance(0.3);
  let options;
  if (second) {
    options = valueOptions(d.g2, [{ value: d.g2c, rule: 'a2_implicit_second_const' }, { value: d.g2.neg() }], [d.g2.add(1), d.g2.mul(2), d.g2.sub(2)]);
  } else {
    const cands = [
      { html: pair(d.g1, d.gv), correct: true },
      { html: pair(d.g1.neg(), d.gv.neg()), correct: false, rule: 'a2_implicit_sign' },
      { html: pair(d.FwV.div(d.FuV).neg(), d.FwV.div(d.FvV).neg()), correct: false, rule: 'a2_implicit_inverted' },
      { html: pair(d.FuV.div(d.FvV).neg(), d.FvV.div(d.FuV).neg()), correct: false, rule: 'a2_implicit_wrong_var' },
      { html: pair(d.gv, d.g1), correct: false },
    ];
    options = cands.filter((o, i) => cands.findIndex((x) => x.html === o.html) === i).slice(0, 4);
  }
  return mcq({
    skill: I3, level, prompt: `L'équation ${MT(eqText, { vars: VARS })} définit ${w} = g(${names.filter((n) => n !== w).join(', ')}) près de ${P}. ${second ? `g_${u}${u}(${others}) vaut :` : 'Alors :'}`,
    options, key: `${I3}:mcq:${second ? 2 : 1}:${eqText}:${P}:${w}`, expectedSec: 240, exam: opts.exam ? { format: 'mcq', points: 1 } : false,
    solution: [{ html: `F_${u}${P} = ${fr(qText(d.FuV))}, F_${v}${P} = ${fr(qText(d.FvV))}, F_${w}${P} = ${fr(qText(d.FwV))} : g_${u} = −F_${u}/F_${w} = ${MT(qText(d.g1))}, g_${v} = −F_${v}/F_${w} = ${MT(qText(d.gv))}.${second ? ` Puis ${MT(idText(d.id), { vars: VARS })} = 0 (p = g_${u}, q = g_${u}${u}) donne ${MT(qText(d.g2))}.` : ''}`, note: '' }],
    fallback: !!d.fallback,
  }, rng);
}

function i3Item(level, rng, opts = {}) {
  if (opts.exam === 'mcq') return i3Mcq(rng, 4, opts);
  if (level === 5) return { ...i3Mcq(rng, 5, {}), level: 5, exam: false, noHints: true, hints: [] };
  return i3Lines(level, rng, opts, i3Data(rng));
}

export const GEN = {
  [I2]: (level, rng, profile, opts = {}) => i2Item(level, rng, opts),
  [I3]: (level, rng, profile, opts = {}) => i3Item(level, rng, opts),
};

// For the tests and the traps.
export { analyse, term, VARS };
