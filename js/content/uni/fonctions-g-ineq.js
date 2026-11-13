// Generators of module G1 (unit `fonctions-g`), second half: rational,
// parametric, absolute-value and irrational (in)equations, bounds. Spec
// §8.3. Catalogue: docs/universite/G-gymnase-1.md, G1.
//
// Levels: 1–2 guided (lines with boxes, decisions), 3 choose the action
// then write the line (a menu per reference line, `tapActions: 'steps'`),
// 4 free lines with hints, 5 alone. Equations and inequations are judged by
// `solset`: a case is a part (segment) whose `domain` is the case, with
// `inCase` (a set ends the part only inside the case), then a part that
// joins the cases (`sets: {S_1, S_2…}`, `raw` for g1_abs_case_bounds); a
// parameter m is a part per case with `params: {m: set}`. Bounds use
// `equiv` with `rel: '≤'`. The sets of every answer are computed by
// js/cas/sets.js from the question, which is built from nice numbers.
// opts.exam = 'mcq' | 'tf' | 'open' gives the exam variants.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText, toReadable } from '../../cas/print.js';
import { walk, lit, mapNode, neg, stripParen, contains, unparen } from '../../cas/ast.js';
import { solutionSet, setToNode, setEqual, minus, union, intersect, complement, domainOf, isFiniteSet, points } from '../../cas/sets.js';
import { polyOf, polyNode, qCoeffs } from '../../cas/polyx.js';
import { blankLine } from '../../judges/lines.js';
import { MT, fr, linesItem, mcq, tfItem } from './kit.js';
import { t } from '../../i18n.js';

const V = 'x';
const q = (n, d = 1) => new Q(n, d);
const N = (x) => toText(lit(Q.of(x)));
const nz = (rng, lo, hi) => { for (;;) { const k = rng.int(lo, hi); if (k) return k; } };
const modeOf = (level) => (level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free');
const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
const E = (math, note, subgoal, act) => ({ kind: 'eq', math, note, subgoal, act });
const examOf = (opts, points = 1) => (opts?.exam ? { format: opts.exam, points } : false);
const uniq = (opts) => opts.filter((o, i, a) => a.findIndex((x) => x.html === o.html) === i);
const KEYS = ['calc', 'relation', 'set', 'ineq'];
const FLIP = { '<': '>', '>': '<', '≤': '≥', '≥': '≤', '=': '=' };
const REL_TEXT = { '<': '<', '≤': '≤', '>': '>', '≥': '≥', '=': '=' };

// A polynomial written in order (x by default, or m).
const pt = (text, v = V) => toText(polyNode(polyOf(parse(text)), v));
// x − r: x + 3, x − 2, x.
const lin = (r, v = V) => { const R = Q.of(r); return R.n === 0 ? v : R.n < 0 ? `${v}+${N(R.neg())}` : `${v}-${N(R)}`; };
const fac = (r, v = V) => (Q.of(r).n === 0 ? v : `(${lin(r, v)})`);
// Brackets around a sum, for a numerator or a denominator.
const br = (s) => (/[+-]/.test(s.slice(1)) ? `(${s})` : s);
// The solution set of a condition, written in final form.
const setOf = (text, cfg = {}) => solutionSet(typeof text === 'string' ? parse(text) : text, { v: V, ...cfg });
const ST = (S) => toText(setToNode(S));
const setText = (text, cfg) => ST(setOf(text, cfg));
// B² written without useless brackets: x², (x + 3)².
const squared = (b) => (/^[a-z]$/.test(b) ? `${b}^2` : `(${b})^2`);
const RD = (s) => { try { return toReadable(parse(String(s))); } catch { return fr(String(s).replace(/×/g, '·')); } };

// A line with the sub-expressions written in `texts` left blank.
function tpl(math, texts, opts = {}) {
  const node = parse(math, opts);
  const holes = [];
  for (const tx of texts) {
    const want = toText(parse(tx, opts));
    let found = null;
    walk(node, (n) => {
      if (found) return false;
      if (n.t !== 'paren' && !holes.includes(n) && toText(n) === want) { found = n; return false; }
      return !(n.t === 'neg' && !want.startsWith('-'));
    });
    if (found) holes.push(found);
  }
  return holes.length ? blankLine(node, holes, opts) : { math };
}
const blanked = (line, texts, opts) => ({ ...line, ...tpl(line.math, texts, opts) });

// Level 3: one menu per reference line; the action of the line is right.
function stepMenus(start, lines, choices) {
  const eqs = lines.filter((l) => l.kind === 'eq');
  return eqs.map((l, i) => ({
    at: i === 0 ? start : eqs[i - 1].math,
    options: choices.map((c) => ({
      id: c.id, label: c.label, valid: c.id === l.act,
      why: c.why || t('Ce n\'est pas l\'étape à faire maintenant.'),
      ...(c.rule && c.id !== l.act ? { rule: c.rule } : {}),
    })),
  }));
}
const withMenus = (judge, level, start, lines, choices) => (level === 3 ? { ...judge, menus: stepMenus(start, lines, choices) } : judge);

// Parts of a lines item: the first part is the item's start and judge, the
// others are segments. part = {start, judge, html?, lines}.
function partsScript(parts, before = []) {
  const [first, ...rest] = parts;
  const lt = (h) => h && h.replace(/<(?![a-z/])/g, '&lt;');
  const script = [...before, ...(first.html ? [{ kind: 'note', html: `<b>${lt(first.html)}</b>` }] : []), ...(first.pre || []), ...first.lines];
  for (const p of rest) script.push({ kind: 'segment', html: lt(p.html), ask: p.ask, start: { math: p.start }, judge: p.judge }, ...(p.pre || []), ...p.lines);
  return { start: first.start, judge: first.judge, script };
}

// ---------- cases ----------

// The zeros of the arguments of |…| (degree ≤ 2, rational roots).
function frontiers(node) {
  const xs = [];
  walk(node, (n) => {
    if (n.t !== 'abs') return true;
    const S = solutionSet({ t: 'rel', op: '=', l: n.e, r: lit(q(0)) }, { v: V });
    if (isFiniteSet(S)) for (const b of points(S)) if (b.q && !xs.some((y) => y.eq(b.q))) xs.push(b.q);
    return true;
  });
  return xs.sort((a, b) => a.cmp(b));
}

const inter = (lo, hi) => (lo === null ? `]-∞;${N(hi)}[` : hi === null ? `[${N(lo)};+∞[` : `[${N(lo)};${N(hi)}[`);
const caseHtml = (lo, hi) => (lo === null ? t('Cas x < {b}', { b: fr(N(hi)) }) : hi === null ? t('Cas x ≥ {b}', { b: fr(N(lo)) }) : t('Cas {a} ≤ x < {b}', { a: fr(N(lo)), b: fr(N(hi)) }));

// |A| replaced by A or −A, with the sign of A inside the case.
function dropAbs(node, at) {
  return mapNode(node, (n) => {
    if (n.t !== 'abs') return n;
    const sign = solutionSet({ t: 'rel', op: '≥', l: n.e, r: lit(q(0)) }, { v: V });
    const inside = sign.parts.some((p) => (p.lo.x < at || p.loC && p.lo.x === at) && (at < p.hi.x || p.hiC && p.hi.x === at));
    return inside ? (['sym', 'num'].includes(n.e.t) ? n.e : { t: 'paren', e: n.e }) : neg(n.e);
  });
}
// a − (−b) → a + b, a + (−b) → a − b.
const signs = (node) => mapNode(node, (n) => (n.t === 'bin' && (n.op === '+' || n.op === '-') && n.r.t === 'neg' ? { ...n, op: n.op === '+' ? '-' : '+', r: ['sym', 'num'].includes(n.r.e.t) ? n.r.e : { t: 'paren', e: n.r.e } } : n));
// Brackets that are not needed: (2x − 3) = x + 1, x² + (x − 5) ≤ 7.
const tidy = (text) => toText(parse(text.replace(/^\(([^()]*)\)(?=[=<>≤≥])/, '$1')));

// The cases of an (in)equation with absolute values: for each interval
// between the zeros of the |…| arguments, the line without |…|, the
// simplified line, the raw solution and the solution in the case.
function absCases(startText, { order = 'up' } = {}) {
  const node = parse(startText);
  const rel = stripParen(node);
  const fs = frontiers(node);
  const bounds = [null, ...fs, null];
  const cases = [];
  for (let i = 0; i + 1 < bounds.length; i++) {
    const lo = bounds[i];
    const hi = bounds[i + 1];
    const at = lo === null ? hi.valueOf() - 1 : hi === null ? lo.valueOf() + 1 : (lo.valueOf() + hi.valueOf()) / 2;
    const dom = inter(lo, hi);
    const raw = signs(dropAbs(node, at));
    const rawText = tidy(toText(raw));
    const r = stripParen(raw);
    const P = polyOf({ t: 'bin', op: '-', l: { t: 'paren', e: r.l }, r: { t: 'paren', e: r.r } });
    const cs = qCoeffs(P);
    const deg = cs ? cs.length - 1 : -1;
    const lines = [];
    const simp = cs ? `${toText(polyNode(P))}${REL_TEXT[rel.op]}0` : null;
    lines.push({ math: rawText, act: 'abs', note: t('Ôter la valeur absolue dans ce cas'), subgoal: 'case' });
    let rawSet = setOf(rawText);
    if (deg === 2) {
      if (simp && toText(unparen(parse(simp))) !== toText(unparen(parse(rawText)))) lines.push({ math: simp, act: 'reduce', note: t('Réduire'), subgoal: 'reduce' });
      lines.push({ math: ST(rawSet), act: 'solve', note: t('Résoudre'), subgoal: 'solve' });
    } else if (deg === 1) {
      const c1 = cs[1];
      const v = cs[0].neg().div(c1);
      const op = c1.n > 0 ? rel.op : FLIP[rel.op];
      lines.push({ math: `x${REL_TEXT[op]}${N(v)}`, act: 'solve', note: c1.n < 0 && rel.op !== '=' ? t('Isoler x (on divise par un négatif : on retourne)') : t('Isoler x'), subgoal: 'solve' });
    } else {
      // No x left: both sides are numbers (2 = 3, 0 ≤ 1).
      const side = (e) => toText(polyNode(polyOf(e)));
      const c = `${side(r.l)}${REL_TEXT[rel.op]}${side(r.r)}`;
      lines.push({ math: c, act: 'solve', note: t('Réduire : il ne reste pas de x'), subgoal: 'solve' });
      rawSet = setOf(c);
    }
    const inCase = intersect(rawSet, setOf(dom));
    const last = lines[lines.length - 1];
    const lastFinal = (deg === 2 || (deg === 1 && rel.op === '=')) && setEqual(rawSet, inCase);
    if (!lastFinal) lines.push({ math: ST(inCase), act: 'keep', note: t('Garder les solutions du cas'), subgoal: 'keep' });
    else if (deg === 1) last.note = t('Isoler x : la solution est dans le cas');
    const key = (s) => toText(unparen(parse(s)));
    const dedup = lines.filter((l, j) => j === 0 || key(l.math) !== key(lines[j - 1].math));
    cases.push({ lo, hi, dom, html: caseHtml(lo, hi), lines: dedup.map((l) => ({ kind: 'eq', ...l })), raw: rawSet, set: inCase, rawText, deg });
  }
  if (order === 'down') cases.reverse();
  return { fs, cases, answer: cases.reduce((S, c) => union(S, c.set), { parts: [] }) };
}

// The parts of a case discussion: (frontier), one part per case, the union.
const CASE_CHOICES = [
  { id: 'frontier', label: t('Trouver où ce qui est dans |…| change de signe') },
  { id: 'abs', label: t('Ôter la valeur absolue avec le signe du cas') },
  { id: 'reduce', label: t('Réduire') },
  { id: 'solve', label: t('Résoudre') },
  { id: 'keep', label: t('Garder seulement les solutions du cas') },
  { id: 'union', label: t('Réunir les cas') },
];
function caseParts(startText, d, level, { frontier = false } = {}) {
  const parts = [];
  if (frontier) {
    const args = [];
    walk(parse(startText), (n) => { if (n.t === 'abs') args.push(n.e); return true; });
    const startF = args.map((a) => `${toText(a)}=0`).join(' ou ');
    const line = `{${d.fs.map(N).join(';')}}`;
    const lines = [E(line, t('Là où |…| change d\'écriture'), 'frontier', 'frontier')];
    parts.push({ start: startF, judge: withMenus({ kind: 'solset', v: V }, level, startF, lines, CASE_CHOICES), html: t('Frontières des cas :'), lines });
  }
  d.cases.forEach((c, i) => {
    const judge = { kind: 'solset', v: V, domain: c.dom, inCase: true };
    parts.push({ start: startText, judge: withMenus(judge, level, startText, c.lines, CASE_CHOICES), html: t('{title} :', { title: c.html }), lines: c.lines, idx: i });
  });
  const names = d.cases.map((_, i) => `S_${i + 1}`);
  const sets = Object.fromEntries(d.cases.map((c, i) => [names[i], ST(c.set)]));
  const raw = Object.fromEntries(d.cases.map((c, i) => [names[i], ST(c.raw)]));
  const uStart = names.join('∪');
  const uLines = [E(ST(d.answer), t('Réunir les cas'), 'union', 'union')];
  parts.push({ start: uStart, judge: withMenus({ kind: 'solset', v: V, sets, raw }, level, uStart, uLines, CASE_CHOICES), html: t('Réunion :'), lines: uLines });
  return parts;
}

// Each case part's first line given as a note (level 1), the rest guided.
function guidedCases(parts) {
  return parts.map((p) => {
    if (p.idx === undefined || p.lines.length < 2) return p;
    const [first, ...rest] = p.lines;
    return { ...p, pre: [{ kind: 'note', html: `${MT(first.math)}` }], lines: rest.map((l) => ({ ...l })), start: p.start };
  });
}

export const HELP = { tpl, blanked, stepMenus, withMenus, partsScript, absCases, caseParts, setText, setOf, ST, pt, lin, fac, br, N, q, nz, modeOf, H, E, examOf, uniq, KEYS, FLIP, RD, guidedCases, V };

// ======================================================================
// g1-rational-ineq
// ======================================================================

const RI = 'g1-rational-ineq';
const RI_SUB = [
  { id: 'domain', label: t('domaine'), skill: RI },
  { id: 'move', label: t('tout d\'un côté'), skill: RI },
  { id: 'common', label: t('même dénominateur'), skill: 'rat-operations' },
  { id: 'signs', label: t('signes'), skill: 'g1-sign-table' },
];
const RI_CHOICES = [
  { id: 'domain', label: t('Écrire le domaine (valeurs interdites)') },
  { id: 'move', label: t('Tout passer du même côté') },
  { id: 'mult', label: t('Multiplier par le dénominateur'), rule: 'g1_mult_denominator', why: t('Le signe du dénominateur dépend de x : multiplier par lui retournerait l\'inégalité une partie du temps.') },
  { id: 'common', label: t('Réduire au même dénominateur') },
  { id: 'read', label: t('Lire l\'ensemble avec les signes') },
];
const OPS = ['<', '≤', '>', '≥'];
// k·(x − r) written after a sign: 2(x − 2), (x − 2), 2x.
const times = (k, den) => `${Math.abs(k) === 1 ? '' : Math.abs(k)}${den === 'x' ? 'x' : `(${den})`}`;
// c(x − p) with c = ±1: x − 5, 5 − x, −x.
const signedLin = (c, p) => (c > 0 ? lin(p) : p === 0 ? '-x' : `${N(p)}-x`);
const poleSet = (rs) => setOf(`{${rs.map(N).join(';')}}`);

function riData(rng, two) {
  for (let i = 0; i < 400; i++) {
    const op = rng.pick(OPS);
    let start;
    let lines;
    let poles;
    let cand;
    let p;
    let holes;
    if (!two) {
      const r = rng.int(-5, 6);
      p = rng.int(-5, 6);
      if (p === r) continue;
      const k = rng.pick([1, 2, 3, -1, -2, -3]);
      const c = rng.pick([1, -1]);
      const a = k + c;
      if (a === 0) continue;
      const b = -c * p - k * r;
      if (Math.abs(b) > 15) continue;
      const den = lin(r);
      const numA = pt(`${a}x+(${b})`);
      const frac = `${br(numA)}/${br(den)}`;
      start = `${frac}${op}${k}`;
      const red = signedLin(c, p);
      poles = [r];
      lines = [
        E(`D=ℝ∖{${r}}`, t('Valeur interdite : {r}', { r: fr(String(r)) }), 'domain', 'domain'),
        E(`${frac}${k > 0 ? '-' : '+'}${Math.abs(k)}${op}0`, t('Tout d\'un côté'), 'move', 'move'),
        E(`(${numA}${k > 0 ? '-' : '+'}${times(k, den)})/${br(den)}${op}0`, t('Même dénominateur'), 'common', 'common'),
        E(`${br(red)}/${br(den)}${op}0`, t('Réduire le numérateur'), 'common', 'common'),
      ];
      holes = [[times(k, den)], [red]];
      cand = `${br(numA)}${op}${k}${den === 'x' ? 'x' : `(${den})`}`;
    } else {
      const a = rng.int(-4, 4);
      const b = rng.int(-4, 4);
      const r = rng.int(-4, 5);
      const s = rng.int(-4, 5);
      if (r === s || a === b) continue;
      const c1 = a - b + r - s;
      const c0 = b * r - a * s;
      if (c1 === 0 || c0 % c1 !== 0) continue;
      p = -c0 / c1;
      if (p === r || p === s || Math.abs(p) > 8 || p === -a || p === -b) continue;
      const A = `${br(lin(-a))}/${br(lin(r))}`;
      const B = `${br(lin(-b))}/${br(lin(s))}`;
      start = `${A}${op}${B}`;
      poles = [r, s].sort((x, y) => x - y);
      const D2 = `${fac(r)}${fac(s)}`;
      const num = pt(`${c1}x+(${c0})`);
      lines = [
        E(`D=ℝ∖{${poles.join(';')}}`, t('Valeurs interdites'), 'domain', 'domain'),
        E(`${A}-${B}${op}0`, t('Tout d\'un côté'), 'move', 'move'),
        E(`(${fac(-a)}${fac(s)}-${fac(-b)}${fac(r)})/(${D2})${op}0`, t('Même dénominateur'), 'common', 'common'),
        E(`${br(num)}/(${D2})${op}0`, t('Développer le numérateur'), 'common', 'common'),
      ];
      holes = [[], [num]];
      cand = `${fac(-a)}${fac(s)}${op}${fac(-b)}${fac(r)}`;
    }
    const answer = setOf(start);
    if (!answer.parts.length) continue;
    const multSet = minus(setOf(cand), poleSet(poles));
    if (setEqual(multSet, answer)) continue;
    lines.push(E(ST(answer), poles.length > 1
      ? t('Signes : valeurs interdites {poles}, zéro {p}', { poles: poles.map((x) => fr(String(x))).join(t(' et ')), p: fr(String(p)) })
      : t('Signes : valeur interdite {poles}, zéro {p}', { poles: poles.map((x) => fr(String(x))).join(t(' et ')), p: fr(String(p)) }), 'signs', 'read'));
    return { op, start, lines, poles, p, answer, multSet, holes };
  }
  return null;
}

function riItem(level, rng, opts = {}) {
  const two = level === 5;
  const d = riData(rng, two) ?? riData(rng, false);
  const judge = { kind: 'solset', v: V, onDomain: true };
  let start = d.start;
  let script = d.lines;
  if (level === 1) {
    start = d.lines[3].math;
    script = [
      { kind: 'note', html: t('Bornes du tableau : {poles} (valeur interdite, ‖) et {p} (zéro).', { poles: d.poles.map((x) => fr(String(x))).join(', '), p: fr(String(d.p)) }) },
      blanked(d.lines[0], d.poles.map(String)),
      blanked(d.lines[4], [String(d.p)]),
    ];
  } else if (level === 2) {
    script = [d.lines[0], d.lines[1], blanked(d.lines[2], d.holes[0]), blanked(d.lines[3], d.holes[1]), d.lines[4]];
  } else if (level === 3) {
    script = [{ kind: 'decision', prompt: t('Comment commences-tu ?'), options: [
      { id: 'mult', label: t('Multiplier les deux membres par le dénominateur'), valid: false, rule: 'g1_mult_denominator', why: t('Le signe du dénominateur dépend de x : quand il est négatif, l\'inégalité se retourne.') },
      { id: 'move', label: t('Tout passer à gauche et réduire au même dénominateur'), valid: true },
    ] }, ...d.lines];
  }
  const sLines = script.filter((l) => l.kind === 'eq');
  return linesItem({
    skill: RI, level, prompt: t('Résous {e}.', { e: MT(start) }),
    start, judge: withMenus(judge, level, start, sLines, RI_CHOICES), mode: modeOf(level), script,
    hints: level === 1
      ? H(t('Le quotient change de signe en ses zéros et en ses valeurs interdites. Une valeur interdite est toujours exclue.'), t('Valeur interdite : {poles} ; zéro : {p}', { poles: d.poles.map((x) => fr(String(x))).join(', '), p: fr(String(d.p)) }), MT(d.lines[4].math))
      : H(t('Ne multiplie pas par le dénominateur : son signe change. Écris d\'abord le domaine, puis passe tout à gauche.'), MT(d.lines[2].math), MT(d.lines[3].math)),
    subgoals: RI_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${RI}:${level}:${start}`, exam: examOf(opts, 3),
  });
}

function riMcq(rng) {
  const d = riData(rng, false);
  const ends = d.poles.filter((r) => d.answer.parts.some((p) => p.lo.x === r || p.hi.x === r));
  const closed = ends.length ? union(d.answer, poleSet(ends)) : d.answer;
  const flip = minus(complement(d.answer), poleSet(d.poles));
  const options = uniq([
    { html: MT(ST(d.answer)), correct: true },
    { html: MT(ST(d.multSet)), correct: false, rule: 'g1_mult_denominator' },
    ...(setEqual(closed, d.answer) ? [] : [{ html: MT(ST(closed)), correct: false, rule: 'g1_pole_closed' }]),
    { html: MT(ST(flip)), correct: false },
    { html: MT(ST(union(d.answer, d.multSet))), correct: false },
  ]).slice(0, 4);
  return mcq({
    skill: RI, level: 4, prompt: t('Ensemble des solutions de {e} :', { e: MT(d.start) }), options, key: `mcq:${d.start}`, exam: { format: 'mcq', points: 1 },
    solution: d.lines.map((l) => ({ html: MT(l.math), note: l.note })),
  }, rng);
}

// ======================================================================
// g1-param
// ======================================================================

const PA = 'g1-param';
const PA_SUB = [
  { id: 'factor', label: t('factoriser'), skill: 'fac-complete' },
  { id: 'critical', label: t('valeur critique'), skill: PA },
  { id: 'divide', label: t('diviser selon le signe'), skill: PA },
  { id: 'sign', label: t('signe d\'un trinôme en m'), skill: 'g1-rational-ineq' },
  { id: 'lin', label: t('équation à paramètre'), skill: 'param-linear' },
];
const PA_CHOICES = [
  { id: 'critical', label: t('Chercher les m qui annulent le coefficient de x') },
  { id: 'factor', label: t('Factoriser le membre de droite') },
  { id: 'pos', label: t('Diviser par un nombre positif') },
  { id: 'neg', label: t('Diviser par un nombre négatif : retourner l\'inégalité') },
  { id: 'zero', label: t('Remplacer m : le coefficient est nul') },
  { id: 'write', label: t('Écrire l\'ensemble') },
];
const coefM = (a) => (a === 0 ? 'm' : `(${lin(a, 'm')})`);
const mPlus = (b) => pt(`m+(${b})`, 'm');

function paData(rng, eq) {
  for (let i = 0; i < 200; i++) {
    const a = rng.int(-3, 3);
    const b = eq ? a : rng.int(-3, 3);
    const op = eq ? '=' : rng.pick(OPS);
    const rhs = pt(`(m-(${a}))(m+(${b}))`, 'm');
    if (rhs === '0') continue;
    const cm = coefM(a);
    const start = `${cm}x${op}${rhs}`;
    const factored = `${cm}x${op}${cm}(${mPlus(b)})`;
    return { a, b, op, eq, start, factored, cm, mb: mPlus(b) };
  }
  return null;
}

// Case parts: m > a, m < a, m = a (equation: m ≠ a, m = a).
function paCases(d, level) {
  const { a, op, eq, factored, mb } = d;
  const A = N(a);
  const cases = [];
  const ivSet = (o) => (o === '<' ? `]-∞;${mb}[` : o === '≤' ? `]-∞;${mb}]` : o === '>' ? `]${mb};+∞[` : `[${mb};+∞[`);
  if (eq) {
    cases.push({ m: `ℝ∖{${A}}`, html: t('Cas m ≠ {a}', { a: fr(A) }), lines: [E(`x=${mb}`, t('Diviser par {c} ≠ 0', { c: RD(d.cm) }), 'divide', 'pos')] });
  } else {
    cases.push({ m: `]${A};+∞[`, html: t('Cas m > {a}', { a: fr(A) }), lines: [E(`x${op}${mb}`, t('{c} > 0 : on garde le sens', { c: RD(d.cm) }), 'divide', 'pos'), E(ivSet(op), t('Écrire l\'ensemble'), 'divide', 'write')] });
    cases.push({ m: `]-∞;${A}[`, html: t('Cas m < {a}', { a: fr(A) }), lines: [E(`x${FLIP[op]}${mb}`, t('{c} < 0 : on retourne', { c: RD(d.cm) }), 'divide', 'neg'), E(ivSet(FLIP[op]), t('Écrire l\'ensemble'), 'divide', 'write')] });
  }
  const S0 = ['≤', '≥', '='].includes(op) ? 'ℝ' : '∅';
  cases.push({ m: `{${A}}`, html: t('Cas m = {a}', { a: fr(A) }), lines: [E(`0${op}0`, `0·x ${op} 0`, 'critical', 'zero'), E(S0, S0 === 'ℝ' ? t('Toujours vrai') : t('Jamais vrai'), 'critical', 'write')] });
  return cases.map((c) => {
    const judge = { kind: 'solset', v: V, params: { m: c.m } };
    return { start: factored, judge: withMenus(judge, level, factored, c.lines, PA_CHOICES), html: t('{title} :', { title: c.html }), lines: c.lines };
  });
}

function paItem(level, rng, opts = {}) {
  if (level === 5 && !opts.exam) return paQuadratic(rng, opts);
  const eq = level <= 2 || level === 4 ? rng.chance(0.3) : false;
  const d = paData(rng, eq);
  const parts = [];
  const fLine = E(d.factored, t('Factoriser'), 'factor', 'factor');
  if (level >= 2) {
    const crit = [E(`{${N(d.a)}}`, t('Le coefficient de x s\'annule'), 'critical', 'critical')];
    const cStart = `${lin(d.a, 'm')}=0`;
    parts.push({ start: cStart, judge: withMenus({ kind: 'solset', v: 'm' }, level, cStart, crit, PA_CHOICES), html: t('Valeur critique de m :'), lines: crit });
  }
  const cases = paCases(d, level);
  if (level <= 2) for (const c of cases) c.lines = c.lines.map((l, i) => (i === 0 && l.math.startsWith('x') ? blanked(l, [d.mb]) : l));
  // The first case starts from the question: it factors first.
  const c0 = cases[0];
  c0.lines = [level === 1 ? blanked(fLine, [d.mb]) : fLine, ...c0.lines];
  c0.start = d.start;
  c0.judge = withMenus({ ...c0.judge, menus: undefined }, level, d.start, c0.lines, PA_CHOICES);
  parts.push(...cases);
  const { start, judge, script } = partsScript(parts);
  return linesItem({
    skill: PA, level, prompt: t('Résous {e} selon les valeurs du paramètre m.', { e: MT(d.start) }),
    start, judge, mode: modeOf(level), script,
    declares: { vars: [V, 'm'] },
    hints: H(t('Que se passe-t-il si {c} = 0 ? Et si {c} < 0 ?', { c: RD(lin(d.a, 'm')) }), t('Cas m < {a} : on divise par {c} < 0, donc x … {mb}', { a: fr(N(d.a)), c: RD(lin(d.a, 'm')), mb: RD(d.mb) }), d.eq ? MT(`x=${d.mb}`) : MT(`x${FLIP[d.op]}${d.mb}`)),
    subgoals: PA_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${PA}:${level}:${d.start}`, exam: examOf(opts, 4),
  });
}

// Level 5: x² − 2mx + pm + c = 0, the number of solutions with Δ(m).
function paQuadratic(rng, opts) {
  let r1;
  let r2;
  do { r1 = rng.int(-4, 4); r2 = rng.int(-3, 5); } while (r1 >= r2);
  const pp = r1 + r2;
  const cc = -r1 * r2;
  const lm = pt(`${pp}m+(${cc})`, 'm');
  const eqText = lm.startsWith('-') ? `x^2-2mx${lm}=0` : `x^2-2mx+${lm}=0`;
  const tri = pt(`m^2-(${pp})m-(${cc})`, 'm');
  const prod = `${fac(r1, 'm')}${fac(r2, 'm')}`;
  const mk = (html, rel, lines) => ({ html, start: `(-2m)^2-4(${lm})${rel}0`, judge: { kind: 'solset', v: 'm' }, lines });
  const parts = [
    mk(t('Deux solutions : Δ > 0.'), '>', [E(`${tri}>0`, t('Diviser par 4'), 'sign'), E(`${prod}>0`, t('Factoriser'), 'sign'), E(setText(`${prod}>0`, { v: 'm' }), t('Signe du trinôme en m'), 'sign')]),
    mk(t('Une seule solution : Δ = 0.'), '=', [E(`${prod}=0`, t('Diviser par 4, factoriser'), 'sign'), E(setText(`${prod}=0`, { v: 'm' }), t('Résoudre'), 'sign')]),
    mk(t('Aucune solution : Δ < 0.'), '<', [E(`${prod}<0`, t('Diviser par 4, factoriser'), 'sign'), E(setText(`${prod}<0`, { v: 'm' }), t('Signe du trinôme en m'), 'sign')]),
  ];
  const { start, judge, script } = partsScript(parts);
  return linesItem({
    skill: PA, level: 5, prompt: t('Selon m, combien de solutions a l\'équation {e} ? Écris pour quels m Δ > 0, Δ = 0, Δ < 0.', { e: MT(eqText) }),
    start, judge, mode: 'free', script, hints: [], declares: { vars: ['m'] },
    subgoals: PA_SUB, keys: KEYS, key: `${PA}:5:${eqText}`, exam: examOf(opts, 4),
  });
}

function paMcq(rng) {
  const d = paData(rng, false);
  const m0 = d.a - rng.int(1, 3);
  const sub = (s) => s.replace(/m/g, `(${m0})`);
  const at = setText(sub(d.start));
  const kept = setText(`x${d.op}${sub(d.mb)}`);
  const options = uniq([
    { html: MT(at), correct: true },
    { html: MT(kept), correct: false, rule: 'g1_param_case' },
    { html: MT('ℝ'), correct: false },
    { html: MT('∅'), correct: false },
  ]);
  return mcq({
    skill: PA, level: 4, prompt: t('On résout {e}. Pour m = {m}, l\'ensemble des solutions est :', { e: MT(d.start), m: fr(String(m0)) }), options, key: `mcq:${d.start}:${m0}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: t('{e} ; pour m = {m}, {c} < 0 : on retourne.', { e: MT(d.factored), m: fr(String(m0)), c: RD(lin(d.a, 'm')) }), note: '' }],
  }, rng);
}

// ======================================================================
// g1-viete
// ======================================================================

const VI = 'g1-viete';
const VI_SUB = [
  { id: 'fk', label: t('calculer f(k)'), skill: VI },
  { id: 'cond', label: t('choisir la condition'), skill: VI },
  { id: 'solve', label: t('résoudre en m'), skill: 'g1-trinome-sign' },
  { id: 'param', label: t('trinôme à paramètre'), skill: 'param-quadratic' },
];
const VI_CHOICES = [
  { id: 'compute', label: t('Calculer f(k) et réduire') },
  { id: 'cond', label: t('Écrire la condition sur a·f(k)') },
  { id: 'solve', label: t('Résoudre l\'inéquation en m') },
  { id: 'write', label: t('Écrire l\'ensemble des m') },
];
const kk = (k) => (k < 0 ? `(${k})` : String(k));

function viData(rng, two) {
  for (let i = 0; i < 400; i++) {
    const k = rng.pick([-2, -1, 1, 2, 3]);
    const p = rng.int(-3, 5);
    const qq = rng.int(p + 1, 6);
    if (qq <= p) continue;
    const b1 = rng.int(-2, 2);
    const b0 = rng.int(-3, 3);
    const g1 = 1 - k * k - k * b1;
    const g0 = -qq + p * k * k - k * b0;
    if (Math.abs(g1) > 9 || Math.abs(g0) > 12) continue;
    const aT = lin(p, 'm');
    const bT = pt(`${b1}m+(${b0})`, 'm');
    const cT = pt(`${g1}m+(${g0})`, 'm');
    if (cT === '0') continue;
    const bx = bT === '0' ? '' : /^-?\d*m$|^-?\d+$/.test(bT) ? `${bT.startsWith('-') ? '' : '+'}${bT}x` : `+(${bT})x`;
    const eqText = `${p === 0 ? 'm' : `(${aT})`}x^2${bx}${cT.startsWith('-') ? '' : '+'}${cT}=0`;
    const pr = (s) => (/[+-]/.test(s) ? `(${s})` : s);
    const fRaw = (kv) => `${pr(aT)}×${kk(kv)}^2${bT === '0' ? '' : `+${pr(bT)}×${kk(kv)}`}+${pr(cT)}`;
    const d = { k, p, q: qq, aT, bT, cT, eqText, fRaw, fk: lin(qq, 'm') };
    if (!two) return d;
    // A second number outside the roots: a·f(k2) > 0.
    const k2 = rng.pick([-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].filter((x) => x !== k));
    const e1 = k2 * k2 + k2 * b1 + g1;
    const e0 = -p * k2 * k2 + k2 * b0 + g0;
    if (e1 === 0) continue;
    const f2 = pt(`${e1}m+(${e0})`, 'm');
    const root = q(-e0, e1);
    if (root.d > 30) continue;
    const c1 = `${fac(p, 'm')}${fac(qq, 'm')}<0`;
    const c2 = `${fac(p, 'm')}(${f2})>0`;
    const both = setOf(`${c1} et ${c2}`, { v: 'm' });
    if (!both.parts.length || setEqual(both, setOf(c1, { v: 'm' })) || setEqual(both, setOf(c2, { v: 'm' }))) continue;
    return { ...d, k2, f2, c1, c2, both };
  }
  return null;
}

const posText = (d) => (d.k2 === undefined ? `x₁ < ${fr(String(d.k))} < x₂`
  : d.k2 < d.k ? `${fr(String(d.k2))} < x₁ < ${fr(String(d.k))} < x₂` : `x₁ < ${fr(String(d.k))} < x₂ < ${fr(String(d.k2))}`);

function viItem(level, rng, opts = {}) {
  const two = level === 3 || level === 5;
  const d = viData(rng, two) ?? viData(rng, false);
  const fJudge = { kind: 'equiv', vars: ['m'], domain: { m: [-3, 3] }, target: 'expanded' };
  const parts = [];
  const fLines = [E(d.fk, t('Développer et réduire'), 'fk', 'compute')];
  parts.push({ start: d.fRaw(d.k), judge: withMenus(fJudge, level, d.fRaw(d.k), fLines, VI_CHOICES), html: `f(${fr(String(d.k))}) =`, lines: level === 1 ? [blanked(fLines[0], [String(d.q)])] : fLines });
  let cStart = `${fac(d.p, 'm')}${fac(d.q, 'm')}<0`;
  let cLines = [E(`${d.p}<m<${d.q}`, t('Signe du trinôme en m : entre les racines'), 'solve', 'solve'), E(`]${d.p};${d.q}[`, t('Écrire l\'ensemble'), 'solve', 'write')];
  if (d.k2 !== undefined) {
    const f2Lines = [E(d.f2, t('Développer et réduire'), 'fk', 'compute')];
    parts.push({ start: d.fRaw(d.k2), judge: withMenus(fJudge, level, d.fRaw(d.k2), f2Lines, VI_CHOICES), html: `f(${fr(String(d.k2))}) =`, lines: f2Lines });
    cStart = `${d.c1} et ${d.c2}`;
    cLines = [E(`${d.p}<m<${d.q} et m∈${setText(d.c2, { v: 'm' })}`, t('Résoudre chaque condition'), 'solve', 'solve'), E(ST(d.both), t('Intersecter'), 'solve', 'write')];
  }
  const cPart = { start: cStart, judge: withMenus({ kind: 'solset', v: 'm' }, level, cStart, cLines, VI_CHOICES), html: d.k2 === undefined ? t('Condition a·f(k) < 0 :') : t('Conditions a·f(k₁) et a·f(k₂) :'), lines: cLines };
  if (level === 2) {
    cPart.pre = [{ kind: 'decision', prompt: t('Quelle condition dit que {k} est entre les racines ?', { k: fr(String(d.k)) }), options: [
      { id: 'af', label: 'a·f(k) < 0', valid: true },
      { id: 'f', label: 'f(k) < 0', valid: false, rule: 'g1_viete_a', why: t('Si a < 0, la parabole est tournée vers le bas : f(k) > 0 entre les racines. Il faut a·f(k) < 0.') },
      { id: 'delta', label: 'Δ > 0', valid: false, why: t('Δ > 0 dit qu\'il y a deux racines, pas où est k.') },
    ] }];
  }
  if (level === 1) cPart.lines = cLines.map((l, i) => (i === 1 ? blanked(l, [String(d.p), String(d.q)]) : l));
  parts.push(cPart);
  const { start, judge, script } = partsScript(parts, level === 1 ? [{ kind: 'note', html: t('Rappel : k est entre les racines si et seulement si a·f(k) &lt; 0 ; k est à l\'extérieur si a·f(k) &gt; 0.') }] : []);
  return linesItem({
    skill: VI, level, prompt: t('Pour quels m l\'équation {e} a-t-elle deux racines avec {pos} ?', { e: MT(d.eqText), pos: posText(d) }),
    start, judge, mode: modeOf(level), script, declares: { vars: ['m'] },
    hints: H(t('{k} est entre les racines si et seulement si a·f({k}) < 0, avec a = {a}.', { k: fr(String(d.k)), a: RD(d.aT) }), `f(${fr(String(d.k))}) = ${RD(d.fRaw(d.k))} = …`, MT(d.fk)),
    subgoals: VI_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${VI}:${level}:${d.eqText}:${d.k2 ?? ''}`, exam: examOf(opts, 6),
  });
}

function viMcq(rng) {
  const d = viData(rng, false);
  const options = uniq([
    { html: MT(`]${d.p};${d.q}[`), correct: true },
    { html: MT(`]-∞;${d.q}[`), correct: false, rule: 'g1_viete_a' },
    { html: MT(`]-∞;${d.p}[∪]${d.q};+∞[`), correct: false },
    { html: MT(`[${d.p};${d.q}]`), correct: false },
  ]);
  return mcq({
    skill: VI, level: 4, prompt: t('Pour quels m l\'équation {e} a-t-elle deux racines avec {pos} ?', { e: MT(d.eqText), pos: posText(d) }), options, key: `mcq:${d.eqText}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: `a·f(${fr(String(d.k))}) = (${RD(d.aT)})(${RD(d.fk)}) < 0`, note: '' }],
  }, rng);
}

// ======================================================================
// g1-abs-eq, g1-abs-ineq: cases
// ======================================================================

const AE = 'g1-abs-eq';
const AI = 'g1-abs-ineq';
const caseSub = (skill, solveSkill) => [
  { id: 'frontier', label: t('frontières des cas'), skill },
  { id: 'case', label: t('ôter la valeur absolue'), skill: AE },
  { id: 'reduce', label: t('réduire'), skill },
  { id: 'solve', label: t('résoudre'), skill: solveSkill },
  { id: 'keep', label: t('garder les solutions du cas'), skill },
  { id: 'union', label: t('réunir'), skill: 'g9-intervals' },
];
// Bounds of a set that are not exact fractions (surds, decimals).
const rational = (S) => S.parts.every((p) => [p.lo, p.hi].every((b) => !Number.isFinite(b.x) || !!b.q));
const absArg = (p, qq) => pt(`${p}x+(${qq})`);

// |px + q| = rx + s: one solution valid in its case once in three.
function aeData(rng) {
  const wantOne = rng.chance(1 / 3);
  for (let i = 0; i < 400; i++) {
    const p = rng.int(1, 3);
    const qq = rng.int(-6, 6);
    const r = nz(rng, -2, 2);
    const s = rng.int(-5, 5);
    if (Math.abs(r) === p) continue;
    const start = `|${absArg(p, qq)}|=${pt(`${r}x+(${s})`)}`;
    const d = absCases(start, { order: 'down' });
    const n = d.answer.parts.length;
    if (!n || (wantOne ? n !== 1 : n !== 2)) continue;
    if (!d.cases.every((c) => rational(c.raw) && c.raw.parts.every((x) => x.lo.q && x.lo.q.d <= 3 && Math.abs(x.lo.x) <= 10))) continue;
    if (d.cases.some((c) => d.fs.some((f) => c.raw.parts.some((x) => x.lo.q?.eq(f))))) continue;
    return { start, d, p, q: qq, r, s };
  }
  return null;
}

// Two or three absolute values of first degree.
function aeMulti(rng) {
  for (let i = 0; i < 400; i++) {
    const k = rng.int(2, 3);
    const terms = [];
    for (let j = 0; j < k; j++) {
      const p = j === 2 ? 2 : 1;
      terms.push({ p, q: rng.int(-6, 4), s: j === 0 ? 1 : rng.pick([1, -1]) });
    }
    const c = rng.int(0, 4);
    let lhs = '';
    for (const tm of terms) lhs += `${tm.s < 0 ? '-' : lhs ? '+' : ''}|${absArg(tm.p, tm.q)}|`;
    const start = `${lhs}=${c}`;
    let d;
    try { d = absCases(start); } catch { continue; }
    if (d.fs.length !== k) continue;
    if (!d.answer.parts.length || !isFiniteSet(d.answer) || d.answer.parts.length > 3) continue;
    if (!d.cases.every((c2) => rational(c2.raw))) continue;
    return { start, d };
  }
  return null;
}

// |x² + bx + c| − |x − a| − e = 0 (level 5).
const square = (D) => D < 0 || Number.isInteger(Math.sqrt(D));
function aeTrinome(rng) {
  for (let i = 0; i < 4000; i++) {
    const u = rng.int(-4, 3);
    const w = rng.int(u + 1, 4);
    const a = rng.pick([u, w, rng.int(-3, 3)]);
    const e = rng.int(1, 8);
    const b = -(u + w);
    const c = u * w;
    // s1·(x² + bx + c) + s2·(x − a) − e = 0: every sign pattern with rational roots.
    if (![[1, 1], [1, -1], [-1, 1], [-1, -1]].every(([s1, s2]) => square((s1 * b + s2) ** 2 - 4 * s1 * (s1 * c - s2 * a - e)))) continue;
    const tri = pt(`(x-(${u}))(x-(${w}))`);
    const start = `|${tri}|-|${lin(a)}|-${e}=0`;
    let d;
    try { d = absCases(start); } catch { continue; }
    if (!d.answer.parts.length || !d.cases.every((c) => rational(c.raw))) continue;
    return { start, d };
  }
  return null;
}

function caseItem(skill, level, rng, opts, data, { frontier = false, hints, sub, prompt, points = 2 } = {}) {
  const { start: s0, d } = data;
  let parts = caseParts(s0, d, level, { frontier });
  if (level === 1) parts = guidedCases(parts);
  const { start, judge, script } = partsScript(parts);
  return linesItem({
    skill, level, prompt: prompt || t('Résous {e}.', { e: MT(s0) }),
    start, judge, mode: modeOf(level), script,
    hints, subgoals: sub, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${skill}:${level}:${s0}`, exam: examOf(opts, points),
  });
}

function aeItem(level, rng, opts = {}) {
  const data = level === 5 ? aeTrinome(rng) : level === 4 ? (rng.chance(0.6) ? aeMulti(rng) : aeData(rng)) : aeData(rng);
  const first = data.d.cases[0];
  return caseItem(AE, level, rng, opts, data, {
    frontier: level === 2,
    hints: H(t('Coupe là où ce qui est dans |…| change de signe : x = {xs}.', { xs: data.d.fs.map((f) => fr(N(f))).join(', ') }), t('{c} : {e}', { c: first.html, e: MT(first.rawText) }), t('Dans chaque cas, garde seulement les solutions qui sont dans le cas.')),
    sub: caseSub(AE, AE),
  });
}

function aeExam(rng, exam) {
  if (exam === 'tf') {
    const c = rng.int(1, 5);
    // s: the French statement, kept for the key; st: the statement shown.
    const bank = [
      { s: `Pour tout x ∈ ℝ, |x − ${c}| = x − ${c}.`, st: t('Pour tout x ∈ ℝ, |x − {c}| = x − {c}.', { c }), truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: `|x-${c}|=x-${c}`, ask: [{ v: 'x', label: 'x =' }], answer: { x: '0' } }, why: t('Faux : pour x = 0, |−{c}| = {c}, mais 0 − {c} = −{c}.', { c }), rule: 'g1_abs_dropped' },
      { s: 'Pour tous x, y ∈ ℝ, si |x| = |y|, alors x = y.', truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }, { q: '∀', v: 'y', dom: 'R' }], pred: '|x|=|y|⇒x=y', hyp: '|x|=|y|', ask: [{ v: 'x', label: 'x =' }, { v: 'y', label: 'y =' }], answer: { x: '1', y: '-1' } }, why: t('Faux : |1| = |−1| mais 1 ≠ −1.') },
      { s: `Pour tout x ∈ ℝ, |${c} − x| = |x − ${c}|.`, st: t('Pour tout x ∈ ℝ, |{c} − x| = |x − {c}|.', { c }), truth: true, why: t('Vrai : {c} − x et x − {c} sont opposés, et |−A| = |A|.', { c }) },
      { s: `L'équation |x − ${c}| = −2 n'a aucune solution.`, st: t('L\'équation |x − {c}| = −2 n\'a aucune solution.', { c }), truth: true, why: t('Vrai : une valeur absolue est toujours ≥ 0.') },
    ];
    const b = rng.pick(bank);
    return tfItem({ skill: AE, level: 4, statement: b.st ?? t(b.s), truth: b.truth, counter: b.counter || null, ruleIfTrue: b.truth ? null : b.rule || null, key: b.s, explanation: b.why, exam: { format: 'tf', points: 1 } });
  }
  const { start, d, p, q: qq, r, s } = aeData(rng);
  const A = absArg(p, qq);
  const B = pt(`${r}x+(${s})`);
  const dropped = setOf(`${A}=${B}`);
  const both = setOf(`${A}=${B} ou ${A}=-(${B})`);
  const options = uniq([
    { html: MT(ST(d.answer)), correct: true },
    ...(setEqual(dropped, d.answer) ? [] : [{ html: MT(ST(dropped)), correct: false, rule: 'g1_abs_dropped' }]),
    ...(setEqual(both, d.answer) ? [] : [{ html: MT(ST(both)), correct: false, rule: 'g1_abs_one_case' }]),
    { html: MT(ST(setOf(`${A}=-(${B})`))), correct: false },
    { html: MT('∅'), correct: false },
  ]).slice(0, 4);
  return mcq({
    skill: AE, level: 4, prompt: t('Ensemble des solutions de {e} :', { e: MT(start) }), options, key: `mcq:${start}`, exam: { format: 'mcq', points: 1 },
    solution: d.cases.map((c) => ({ html: t('{c} : {e}, S = {s}', { c: c.html, e: MT(c.rawText), s: MT(ST(c.set)) }), note: '' })),
  }, rng);
}

// |x − a| < r: one chain (level 1).
function aiChain(level, rng, opts) {
  const a = nz(rng, -4, 4);
  const r = rng.int(1, 5);
  const op = rng.pick(['<', '≤']);
  const start = `|${lin(a)}|${op}${r}`;
  const lines = [
    E(`-${r}${op}${lin(a)}${op}${r}`, '|A| < r ⇔ −r < A < r', 'case', 'abs'),
    E(`${a - r}${op}x${op}${a + r}`, t('Ajouter {b}', { b: fr(String(a)) }), 'solve', 'solve'),
    E(setText(start), t('Écrire l\'intervalle'), 'union', 'union'),
  ];
  return linesItem({
    skill: AI, level, prompt: t('Résous {e}.', { e: MT(start) }), start, judge: { kind: 'solset', v: V }, mode: modeOf(level),
    script: level === 1 ? [lines[0], blanked(lines[1], [String(a - r), String(a + r)]), lines[2]] : lines,
    hints: H(t('|A| {op} {r} ⇔ −{r} {op} A {op} {r} : un encadrement.', { op, r }), MT(lines[0].math), MT(lines[1].math)),
    subgoals: caseSub(AI, AI), keys: KEYS, key: `${AI}:${level}:${start}`, exam: examOf(opts, 2),
  });
}

// |px + q| > r: « ou » (level 2).
function aiOr(level, rng, opts) {
  const p = rng.int(1, 3);
  const qq = nz(rng, -6, 6);
  const r = rng.int(1, 6);
  const op = rng.pick(['>', '≥']);
  const A = absArg(p, qq);
  const start = `|${A}|${op}${r}`;
  const lo = q(-r - qq, p);
  const hi = q(r - qq, p);
  const back = op === '>' ? '<' : '≤';
  const lines = [
    E(`${A}${back}-${r} ou ${A}${op}${r}`, t('|A| > r ⇔ A < −r ou A > r'), 'case', 'abs'),
    E(`x${back}${N(lo)} ou x${op}${N(hi)}`, t('Isoler x'), 'solve', 'solve'),
    E(setText(start), t('Écrire la réunion'), 'union', 'union'),
  ];
  return linesItem({
    skill: AI, level, prompt: t('Résous {e}.', { e: MT(start) }), start, judge: { kind: 'solset', v: V }, mode: modeOf(level),
    script: level <= 2 ? [blanked(lines[0], [`-${r}`]), lines[1], lines[2]] : lines,
    hints: H(t('|A| > r : A est loin de 0, d\'un côté « ou » de l\'autre.'), MT(lines[0].math), MT(lines[1].math)),
    subgoals: caseSub(AI, AI), keys: KEYS, key: `${AI}:${level}:${start}`, exam: examOf(opts, 2),
  });
}

// x² ± |px + q| ⋚ rx + s, both trinomials with rational roots.
function aiData(rng, sign) {
  const differ = rng.chance(0.5);
  for (let i = 0; i < 600; i++) {
    const p = rng.int(1, 3);
    const qq = rng.int(-6, 6);
    const r = rng.int(-3, 3);
    const s = rng.int(-8, 8);
    const sg = sign ?? rng.pick(['+', '-']);
    const op = rng.pick(OPS);
    const rhs = pt(`${r}x+(${s})`);
    const start = `x^2${sg}|${absArg(p, qq)}|${op}${rhs}`;
    const d = absCases(start, { order: 'down' });
    if (!d.cases.every((c) => rational(c.raw))) continue;
    // Two distinct roots in each case: no trinomial of constant sign.
    const ends = (S) => new Set(S.parts.flatMap((p) => [p.lo.x, p.hi.x]).filter(Number.isFinite)).size;
    if (!d.cases.every((c) => ends(c.raw) === 2)) continue;
    if (!d.answer.parts.length || setEqual(d.answer, setOf('ℝ'))) continue;
    if (!d.cases.every((c) => c.raw.parts.every((x) => [x.lo, x.hi].every((b) => !Number.isFinite(b.x) || (b.q.d <= 2 && Math.abs(b.x) <= 12))))) continue;
    const rawU = d.cases.reduce((S, c) => union(S, c.raw), { parts: [] });
    if (differ && setEqual(rawU, d.answer)) continue;
    return { start, d, rawU };
  }
  return null;
}

function aiItem(level, rng, opts = {}) {
  if (level === 1) return aiChain(level, rng, opts);
  if (level === 2) return aiOr(level, rng, opts);
  const data = aiData(rng, level === 5 ? '-' : null) ?? aiData(rng, null);
  const c0 = data.d.cases[0];
  return caseItem(AI, level, rng, opts, data, {
    hints: H(t('Un cas par signe de ce qui est dans |…|. Dans chaque cas, garde seulement les x du cas.'), t('{c} : {e}', { c: c0.html, e: MT(c0.rawText) }), t('{c} : solutions brutes {raw}, dans le cas : {s}', { c: c0.html, raw: MT(ST(c0.raw)), s: MT(ST(c0.set)) })),
    sub: caseSub(AI, 'g1-trinome-sign'), points: 5,
  });
}

function aiMcq(rng) {
  const { start, d, rawU } = aiData(rng, null);
  const options = uniq([
    { html: MT(ST(d.answer)), correct: true },
    ...(setEqual(rawU, d.answer) ? [] : [{ html: MT(ST(rawU)), correct: false, rule: 'g1_abs_case_bounds' }]),
    { html: MT(ST(complement(d.answer))), correct: false },
    { html: MT(ST(d.cases[0].raw)), correct: false },
    { html: MT(ST(d.cases[1].raw)), correct: false },
  ]).slice(0, 4);
  return mcq({
    skill: AI, level: 4, prompt: t('Ensemble des solutions de {e} :', { e: MT(start) }), options, key: `mcq:${start}`, exam: { format: 'mcq', points: 1 },
    solution: d.cases.map((c) => ({ html: t('{c} : {e}, S = {s}', { c: c.html, e: MT(c.rawText), s: MT(ST(c.set)) }), note: '' })),
  }, rng);
}

// ======================================================================
// g1-irr-eq
// ======================================================================

const IE = 'g1-irr-eq';
const IE_SUB = [
  { id: 'cond', label: t('condition B ≥ 0 et carré'), skill: IE },
  { id: 'expand', label: t('développer'), skill: IE },
  { id: 'solve', label: t('résoudre'), skill: 'fac-trinomial' },
  { id: 'sort', label: t('trier'), skill: IE },
  { id: 'domain', label: t('domaine'), skill: 'g1-domain' },
];
const IE_CHOICES = [
  { id: 'cond', label: t('Écrire B ≥ 0 et élever au carré') },
  { id: 'iso', label: t('Isoler une racine') },
  { id: 'expand', label: t('Développer et réduire') },
  { id: 'solve', label: t('Résoudre') },
  { id: 'sort', label: t('Garder les solutions qui vérifient la condition') },
];

// √A = B, B = ±x + s, A affine: A = B² has the roots x0 (B ≥ 0) and x1 (B < 0).
function ieData(rng) {
  for (let i = 0; i < 400; i++) {
    const x0 = rng.int(-5, 5);
    const x1 = rng.int(-5, 5);
    const s = rng.int(-3, 3);
    const minus = rng.chance(0.4);
    if (x0 === x1) continue;
    if (!minus && !(x0 + s >= 0 && x1 + s < 0)) continue;
    if (minus && !(-x0 + s >= 0 && -x1 + s < 0)) continue;
    const c1 = minus ? x0 + x1 - 2 * s : 2 * s + x0 + x1;
    const c0 = s * s - x0 * x1;
    if (c1 === 0 || Math.abs(c1) > 20 || Math.abs(c0) > 20) continue;
    const A = pt(`${c1}x+(${c0})`);
    const B = minus ? pt(`-x+(${s})`) : pt(`x+(${s})`);
    const cond = minus ? `x≤${s}` : `x≥${-s}`;
    const tri = pt(`(x-(${x0}))(x-(${x1}))`);
    const start = `sqrt(${A})=${B}`;
    const lines = [
      E(`${B}≥0 et ${A}=${squared(B)}`, t('Condition B ≥ 0 et carré'), 'cond', 'cond'),
      E(`${cond} et ${tri}=0`, t('Développer, tout d\'un côté'), 'expand', 'expand'),
      E(`${cond} et (x=${x0} ou x=${x1})`, t('Résoudre'), 'solve', 'solve'),
      E(`{${x0}}`, t('Trier : {x} ne vérifie pas {c}', { x: fr(String(x1)), c: RD(cond) }), 'sort', 'sort'),
    ];
    return { start, lines, A, B, x0, x1, cond, tri };
  }
  return null;
}

// √(x + a) + √x = b: isolate a root, square twice.
function ieTwo(rng) {
  for (let i = 0; i < 200; i++) {
    const b = rng.int(2, 6);
    const tv = rng.pick([q(1), q(2), q(3), q(1, 2), q(3, 2)]);
    const a = q(b * b).sub(tv.mul(2 * b));
    if (a.n <= 0 || tv.valueOf() >= b || a.d !== 1) continue;
    const A = N(a);
    const start = `sqrt(x+${A})+√x=${b}`;
    const lines = [
      E(`sqrt(x+${A})=${b}-√x`, t('Isoler une racine'), 'cond', 'iso'),
      E(`${b}-√x≥0 et x+${A}=${b * b}-${2 * b}√x+x`, t('Condition et carré'), 'cond', 'cond'),
      E(`√x≤${b} et ${2 * b}√x=${N(q(b * b).sub(a))}`, t('Réduire'), 'expand', 'expand'),
      E(`√x=${N(tv)}`, t('Diviser'), 'solve', 'solve'),
      E(`x=${N(tv.mul(tv))}`, t('Élever au carré'), 'sort', 'solve'),
    ];
    return { start, lines };
  }
  return null;
}

function ieItem(level, rng, opts = {}) {
  if (level === 5) return ieQuadratic(rng, opts);
  if (level === 4 && rng.chance(1 / 3)) {
    const d = ieTwo(rng);
    return linesItem({
      skill: IE, level, prompt: t('Résous {e}.', { e: MT(d.start) }), start: d.start, judge: { kind: 'solset', v: V }, mode: 'free', script: d.lines,
      hints: H(t('Isole d\'abord une racine, puis élève au carré avec la condition.'), MT(d.lines[0].math), MT(d.lines[2].math)),
      subgoals: IE_SUB, keys: KEYS, key: `${IE}:${level}:${d.start}`, exam: examOf(opts, 2),
    });
  }
  const d = ieData(rng);
  let start = d.start;
  let script = d.lines;
  if (level === 1) {
    start = d.lines[0].math;
    script = [blanked(d.lines[1], [d.tri.split(/(?=[+-])/).pop().replace(/^\+/, '')]), blanked(d.lines[2], [String(d.x0), String(d.x1)]), d.lines[3]];
  } else if (level === 2) {
    script = [blanked(d.lines[0], [`${d.B}≥0`]), ...d.lines.slice(1)];
  } else if (level === 3) {
    script = [{ kind: 'decision', prompt: t('Comment te débarrasses-tu de la racine ?'), options: [
      { id: 'cond', label: t('Écrire {b} ≥ 0, puis élever au carré', { b: RD(d.B) }), valid: true },
      { id: 'square', label: t('Élever au carré directement'), valid: true, quality: 'poor', state: { superset: true }, why: t('Juste si tu vérifies chaque solution dans l\'équation de départ à la fin : élever au carré peut en ajouter.') },
    ] }, ...d.lines];
  }
  const sLines = script.filter((l) => l.kind === 'eq');
  return linesItem({
    skill: IE, level, prompt: t('Résous {e}.', { e: MT(d.start) }),
    start, judge: withMenus({ kind: 'solset', v: V }, level, start, sLines, IE_CHOICES), mode: modeOf(level), script,
    hints: H(t('Une racine carrée est ≥ 0 : il faut {b} ≥ 0.', { b: RD(d.B) }), t('{a} = ({b})², donc {tri} = 0', { a: RD(d.A), b: RD(d.B), tri: RD(d.tri) }), MT(d.lines[2].math)),
    subgoals: IE_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${IE}:${level}:${d.start}`, exam: examOf(opts, 2),
  });
}

// Level 5: the domain of √(x² + px + q), then √(x² + px + q) = x + s.
function ieQuadratic(rng, opts) {
  for (let i = 0; i < 400; i++) {
    const u = rng.int(-4, 3);
    const w = rng.int(u + 1, 5);
    const s = rng.int(-3, 3);
    const pp = -(u + w);
    const qq = u * w;
    if (Math.abs(pp - 2 * s) < 2) continue;
    const v = q(s * s - qq, pp - 2 * s);
    if (v.valueOf() < -s || v.d > 3 || Math.abs(v.valueOf()) > 12) continue;
    const A = pt(`x^2+(${pp})x+(${qq})`);
    const B = pt(`x+(${s})`);
    const start = `sqrt(${A})=${B}`;
    const dom = setText(`(x-(${u}))(x-(${w}))≥0`);
    const parts = [
      { start: `sqrt(${A})`, judge: { kind: 'solset', v: V, exprDomain: true }, html: t('Domaine de la racine :'), lines: [E(`${A}≥0`, t('Radicande ≥ 0'), 'domain'), E(`${fac(u)}${fac(w)}≥0`, t('Factoriser'), 'domain'), E(dom, t('Signe du trinôme'), 'domain')] },
      { start, judge: { kind: 'solset', v: V }, html: t('Équation :'), lines: [
        E(`${B}≥0 et ${A}=${squared(B)}`, t('Condition et carré'), 'cond'),
        E(`x≥${-s} et ${pt(`${pp - 2 * s}x`)}=${s * s - qq}`, t('Les x² s\'en vont'), 'expand'),
        E(`x≥${-s} et x=${N(v)}`, t('Résoudre'), 'solve'),
        E(`{${N(v)}}`, t('La condition est vérifiée'), 'sort'),
      ] },
    ];
    const ps = partsScript(parts);
    return linesItem({
      skill: IE, level: 5, prompt: t('Donne le domaine de {r}, puis résous {e}.', { r: MT(`sqrt(${A})`), e: MT(start) }),
      start: ps.start, judge: ps.judge, mode: 'free', script: ps.script, hints: [],
      subgoals: IE_SUB, keys: KEYS, key: `${IE}:5:${start}`, exam: examOf(opts, 4),
    });
  }
  return ieItem(4, rng, opts);
}

function ieExam(rng, exam) {
  if (exam === 'tf') {
    const c = rng.int(2, 6);
    const bank = [
      { s: 'Pour tous a, b ∈ ℝ, si a² = b², alors a = b.', truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R' }, { q: '∀', v: 'b', dom: 'R' }], pred: 'a^2=b^2⇒a=b', hyp: 'a^2=b^2', ask: [{ v: 'a', label: 'a =' }, { v: 'b', label: 'b =' }], answer: { a: '-2', b: '2' } }, why: t('Faux : (−2)² = 2² mais −2 ≠ 2. C\'est pour cela qu\'élever au carré ajoute des solutions.'), rule: 'g1_irr_extraneous' },
      { s: 'Pour tout x ∈ ℝ, √(x²) = x.', truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: 'sqrt(x^2)=x', ask: [{ v: 'x', label: 'x =' }], answer: { x: '-1' } }, why: t('Faux : √((−1)²) = 1. En fait √(x²) = |x|.') },
      { s: `Pour tout x ≥ 0, (√x)² = x.`, truth: true, why: t('Vrai : c\'est la définition de la racine carrée.') },
      // s: the French statement, kept for the key; st: the statement shown.
      { s: `L'équation √x = −${c} n'a pas de solution.`, st: t('L\'équation √x = −{c} n\'a pas de solution.', { c }), truth: true, why: t('Vrai : une racine carrée n\'est jamais négative.') },
    ];
    const b = rng.pick(bank);
    return tfItem({ skill: IE, level: 4, statement: b.st ?? t(b.s), truth: b.truth, counter: b.counter || null, ruleIfTrue: b.truth ? null : b.rule || null, key: b.s, explanation: b.why, exam: { format: 'tf', points: 1 } });
  }
  const d = ieData(rng);
  const options = uniq([
    { html: MT(`{${d.x0}}`), correct: true },
    { html: MT(ST(setOf(`x=${d.x0} ou x=${d.x1}`))), correct: false, rule: 'g1_irr_extraneous' },
    { html: MT(`{${d.x1}}`), correct: false },
    { html: MT('∅'), correct: false },
  ]);
  return mcq({
    skill: IE, level: 4, prompt: t('Ensemble des solutions de {e} :', { e: MT(d.start) }), options, key: `mcq:${d.start}`, exam: { format: 'mcq', points: 1 },
    solution: d.lines.map((l) => ({ html: MT(l.math), note: l.note })),
  }, rng);
}

// ======================================================================
// g1-irr-ineq
// ======================================================================

const II = 'g1-irr-ineq';
const II_SUB = [
  { id: 'cond', label: t('conditions de signe'), skill: II },
  { id: 'case', label: t('cas selon le signe'), skill: 'g1-abs-ineq' },
  { id: 'tri', label: t('signe du trinôme'), skill: 'g1-trinome-sign' },
  { id: 'square', label: t('élever au carré avec la condition'), skill: 'g1-irr-eq' },
  { id: 'keep', label: t('intersecter, réunir'), skill: II },
];
const II_CHOICES = [
  { id: 'cond', label: t('Écrire les conditions de signe, puis élever au carré') },
  { id: 'abs', label: t('Faire deux cas selon le signe du membre sans racine') },
  { id: 'square', label: t('Élever au carré directement'), rule: 'g1_square_no_cond', why: t('Les deux membres n\'ont pas toujours le même signe : on ne peut pas élever au carré sans condition.') },
  { id: 'reduce', label: t('Réduire') },
  { id: 'solve', label: t('Résoudre l\'inéquation') },
  { id: 'keep', label: t('Garder les solutions du cas') },
  { id: 'union', label: t('Réunir les cas') },
];
const STRICT_OF = { '<': '>', '≤': '≥' };

// √(x + q) ⋚ x + s: the trinomial x² + (2s − 1)x + s² − q = (x − r1)(x − r2).
function iiSimple(rng, ops) {
  for (let i = 0; i < 400; i++) {
    const op = rng.pick(ops);
    const s = rng.int(-3, 3);
    const r1 = rng.int(-6, 4);
    const r2 = 1 - 2 * s - r1;
    if (r1 >= r2) continue;
    const qq = s * s - r1 * r2;
    if (Math.abs(qq) > 15 || qq === 0) continue;
    const A = pt(`x+(${qq})`);
    const B = pt(`x+(${s})`);
    const start = `sqrt(${A})${op}${B}`;
    const answer = setOf(start);
    const noCond = setOf(`${A}≥0 et ${A}${op}${squared(B)}`);
    if (!answer.parts.length || setEqual(answer, noCond)) continue;
    return { op, s, r1, r2, q: qq, A, B, start, answer, noCond, tri: pt(`x^2+(${2 * s - 1})x+(${s * s - qq})`) };
  }
  return null;
}

// √A ≤ B (or <): conditions, then the square.
function iiLeLines(d) {
  const strict = d.op === '<';
  const bC = strict ? `${d.B}>0` : `${d.B}≥0`;
  const xC = strict ? `x>${-d.s}` : `x≥${-d.s}`;
  const tri = strict ? `${d.tri}>0` : `${d.tri}≥0`;
  const out = strict ? `(x<${d.r1} ou x>${d.r2})` : `(x≤${d.r1} ou x≥${d.r2})`;
  return [
    E(`${d.A}≥0 et ${bC} et ${d.A}${d.op}${squared(d.B)}`, t('A ≥ 0, B ≥ 0 et A ≤ B²'), 'cond', 'cond'),
    E(`x≥${-d.q} et ${xC} et ${tri}`, t('Simplifier'), 'cond', 'reduce'),
    E(`x≥${-d.q} et ${xC} et ${out}`, t('Signe du trinôme'), 'tri', 'solve'),
    E(ST(d.answer), t('Intersecter'), 'keep', 'keep'),
  ];
}

// √A ≥ B (or >): the case B < 0, the case B ≥ 0, the union.
function iiGeParts(d, level) {
  const s = d.s;
  const caseNeg = intersect(setOf(`${d.A}≥0`), setOf(`x<${-s}`));
  const sq = d.op === '>' ? '<' : '≤';
  const casePosRaw = setOf(`${d.tri}${sq}0`);
  const casePos = intersect(casePosRaw, setOf(`x≥${-s}`));
  const neg = [E(`${d.A}≥0`, t('B < 0 : vrai dès que la racine existe'), 'case', 'abs'), E(ST(caseNeg), t('Garder les x du cas'), 'keep', 'keep')];
  const pos = [E(`${d.A}${d.op}${squared(d.B)}`, t('B ≥ 0 : élever au carré'), 'square', 'square'), E(`${d.tri}${sq}0`, t('Réduire'), 'tri', 'reduce'), E(ST(casePosRaw), t('Signe du trinôme'), 'tri', 'solve')];
  if (!setEqual(casePosRaw, casePos)) pos.push(E(ST(casePos), t('Garder les x du cas'), 'keep', 'keep'));
  const parts = [
    { start: d.start, judge: withMenus({ kind: 'solset', v: V, domain: `]-∞;${-s}[`, inCase: true }, level, d.start, neg, II_CHOICES), html: t('Cas {b} < 0 :', { b: RD(d.B) }), lines: neg },
    { start: d.start, judge: withMenus({ kind: 'solset', v: V, domain: `[${-s};+∞[`, inCase: true }, level, d.start, pos, II_CHOICES), html: t('Cas {b} ≥ 0 :', { b: RD(d.B) }), lines: pos },
  ];
  const sets = { S_1: ST(caseNeg), S_2: ST(casePos) };
  const raw = { S_1: ST(setOf(`${d.A}≥0`)), S_2: ST(casePosRaw) };
  const u = [E(ST(d.answer), t('Réunir'), 'keep', 'union')];
  parts.push({ start: 'S_1∪S_2', judge: withMenus({ kind: 'solset', v: V, sets, raw }, level, 'S_1∪S_2', u, II_CHOICES), html: t('Réunion :'), lines: u });
  return parts;
}

// √(x² + px + q) ⋚ x + s, the radicand with integer roots (level 4, 5).
function iiQuad(rng, ops) {
  for (let i = 0; i < 400; i++) {
    const op = rng.pick(ops);
    const u = rng.int(-5, 3);
    const w = rng.int(u + 1, 5);
    const s = rng.int(-3, 3);
    const pp = -(u + w);
    const qq = u * w;
    if (pp === 2 * s) continue;
    const A = pt(`x^2+(${pp})x+(${qq})`);
    const B = pt(`x+(${s})`);
    const start = `sqrt(${A})${op}${B}`;
    const answer = setOf(start);
    const noCond = setOf(`${A}≥0 et ${A}${op}${squared(B)}`);
    if (!answer.parts.length || setEqual(answer, noCond) || setEqual(answer, setOf('ℝ')) || !rational(answer)) continue;
    if (answer.parts.some((p) => [p.lo, p.hi].some((b) => Number.isFinite(b.x) && b.q.d > 4))) continue;
    return { op, u, w, s, pp, q: qq, A, B, start, answer, noCond, lin: pt(`${pp - 2 * s}x`), c: s * s - qq };
  }
  return null;
}

function iiQuadParts(d, level) {
  const out = `(x≤${d.u} ou x≥${d.w})`;
  if (d.op === '<' || d.op === '≤') {
    const bC = d.op === '<' ? `${d.B}>0` : `${d.B}≥0`;
    const xC = d.op === '<' ? `x>${-d.s}` : `x≥${-d.s}`;
    const lines = [
      E(`${d.A}≥0 et ${bC} et ${d.A}${d.op}${squared(d.B)}`, t('A ≥ 0, B ≥ 0 et A ≤ B²'), 'cond', 'cond'),
      E(`${out} et ${xC} et ${d.lin}${d.op}${d.c}`, t('Signe du trinôme ; les x² s\'en vont'), 'tri', 'reduce'),
      E(ST(d.answer), t('Intersecter'), 'keep', 'keep'),
    ];
    return [{ start: d.start, judge: withMenus({ kind: 'solset', v: V }, level, d.start, lines, II_CHOICES), lines }];
  }
  const caseNeg = intersect(setOf(`${d.A}≥0`), setOf(`x<${-d.s}`));
  const posRaw = setOf(`${d.lin}${d.op}${d.c}`);
  const casePos = intersect(intersect(posRaw, setOf(`x≥${-d.s}`)), setOf(`${d.A}≥0`));
  const neg = [E(`${d.A}≥0`, t('B < 0 : vrai dès que la racine existe'), 'case', 'abs'), E(ST(setOf(`${d.A}≥0`)), t('Signe du trinôme'), 'tri', 'solve')];
  if (!setEqual(setOf(`${d.A}≥0`), caseNeg)) neg.push(E(ST(caseNeg), t('Garder les x du cas'), 'keep', 'keep'));
  const pos = [E(`${d.A}${d.op}${squared(d.B)}`, t('B ≥ 0 : élever au carré'), 'square', 'square'), E(`${d.lin}${d.op}${d.c}`, t('Les x² s\'en vont'), 'tri', 'reduce'), E(ST(posRaw), t('Isoler x'), 'tri', 'solve')];
  if (!setEqual(posRaw, casePos)) pos.push(E(ST(casePos), t('Garder les x du cas'), 'keep', 'keep'));
  const sets = { S_1: ST(caseNeg), S_2: ST(casePos) };
  const raw = { S_1: ST(setOf(`${d.A}≥0`)), S_2: ST(posRaw) };
  const u = [E(ST(d.answer), t('Réunir'), 'keep', 'union')];
  return [
    { start: d.start, judge: withMenus({ kind: 'solset', v: V, domain: `]-∞;${-d.s}[`, inCase: true }, level, d.start, neg, II_CHOICES), html: t('Cas {b} < 0 :', { b: RD(d.B) }), lines: neg },
    { start: d.start, judge: withMenus({ kind: 'solset', v: V, domain: `[${-d.s};+∞[`, inCase: true }, level, d.start, pos, II_CHOICES), html: t('Cas {b} ≥ 0 :', { b: RD(d.B) }), lines: pos },
    { start: 'S_1∪S_2', judge: withMenus({ kind: 'solset', v: V, sets, raw }, level, 'S_1∪S_2', u, II_CHOICES), html: t('Réunion :'), lines: u },
  ];
}

function iiItem(level, rng, opts = {}) {
  let d;
  let parts;
  if (level === 1) {
    d = iiSimple(rng, ['≤', '<']);
    const lines = iiLeLines(d);
    parts = [{ start: d.start, judge: { kind: 'solset', v: V }, lines: [lines[0], blanked(lines[1], [d.tri]), lines[2], lines[3]] }];
  } else if (level === 2) {
    d = iiSimple(rng, ['≥', '>']);
    parts = iiGeParts(d, level);
  } else if (level === 3) {
    d = iiSimple(rng, OPS);
    parts = d.op === '≤' || d.op === '<' ? [{ start: d.start, judge: withMenus({ kind: 'solset', v: V }, level, d.start, iiLeLines(d), II_CHOICES), lines: iiLeLines(d) }] : iiGeParts(d, level);
    parts[0].pre = [{ kind: 'decision', prompt: t('Comment commences-tu ?'), options: [
      { id: 'square', label: t('Élever au carré directement'), valid: false, rule: 'g1_square_no_cond', why: t('Les deux membres n\'ont pas toujours le même signe : élever au carré peut changer les solutions.') },
      { id: 'signs', label: d.op === '≤' || d.op === '<' ? t('Écrire les conditions de signe, puis élever au carré') : t('Deux cas, selon le signe du membre sans racine'), valid: true },
    ] }];
  } else {
    d = iiQuad(rng, level === 5 ? ['≥', '>'] : OPS) ?? iiQuad(rng, OPS);
    parts = iiQuadParts(d, level);
  }
  const { start, judge, script } = partsScript(parts);
  return linesItem({
    skill: II, level, prompt: t('Résous {e}.', { e: MT(d.start) }),
    start, judge, mode: modeOf(level), script,
    hints: H(t('Une racine est ≥ 0. On n\'élève au carré que si les deux membres sont ≥ 0 : sinon, deux cas.'), d.op === '≤' || d.op === '<' ? t('{a} ≥ 0 et {b} ≥ 0 et {a} ≤ ({b})²', { a: RD(d.A), b: RD(d.B) }) : t('Cas {b} < 0 : vrai dès que {a} ≥ 0.', { a: RD(d.A), b: RD(d.B) }), MT(script.find((l) => l.kind === 'eq').math)),
    subgoals: II_SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${II}:${level}:${d.start}`, exam: examOf(opts, 6),
  });
}

function iiMcq(rng) {
  const d = iiSimple(rng, OPS);
  const options = uniq([
    { html: MT(ST(d.answer)), correct: true },
    { html: MT(ST(d.noCond)), correct: false, rule: 'g1_square_no_cond' },
    { html: MT(ST(minus(setOf(`${d.A}≥0`), d.answer))), correct: false },
    { html: MT(ST(setOf(`${d.tri}${d.op === '≤' || d.op === '<' ? '≥' : '≤'}0`))), correct: false },
  ]);
  return mcq({
    skill: II, level: 4, prompt: t('Ensemble des solutions de {e} :', { e: MT(d.start) }), options, key: `mcq:${d.start}`, exam: { format: 'mcq', points: 1 },
    solution: [{ html: d.op === '≤' || d.op === '<' ? t('{a} ≥ 0, {b} ≥ 0 et {a} ≤ ({b})²', { a: RD(d.A), b: RD(d.B) }) : t('Deux cas selon le signe de B.'), note: '' }],
  }, rng);
}

// ======================================================================
// g1-bound
// ======================================================================

const BO = 'g1-bound';
const BO_SUB = [
  { id: 'factor', label: t('factoriser'), skill: 'fac-complete' },
  { id: 'interval', label: t('|x − a| ≤ r : encadrer x'), skill: 'g1-abs-ineq' },
  { id: 'bound', label: t('majorer chaque facteur'), skill: BO },
];
const BO_CHOICES = [
  { id: 'factor', label: t('Factoriser pour faire apparaître |x − a|') },
  { id: 'triangle', label: t('Inégalité triangulaire') },
  { id: 'each', label: t('Majorer un facteur') },
  { id: 'den', label: t('Minorer le dénominateur') },
  { id: 'num', label: t('Majorer le numérateur') },
];
const rT = (r) => (r.eq(1) ? '1' : r.d === 1 ? String(r.n) : `(${N(r)})`);

// |(x − a)(x − b)| on |x − a| ≤ r: ≤ r(|a − b| + r).
function boPoly(rng) {
  for (let i = 0; i < 200; i++) {
    const a = rng.int(-2, 3);
    const b = rng.int(-3, 4);
    const r = rng.pick([q(1, 2), q(1), q(2)]);
    if (a === b) continue;
    const C = r.mul(q(Math.abs(a - b)).add(r));
    const E2 = pt(`(x-(${a}))(x-(${b}))`);
    const lo = q(a).sub(r);
    const hi = q(a).add(r);
    // No factor x − b vanishing on the interval: the naive bound is honest.
    if (lo.valueOf() <= b && b <= hi.valueOf()) continue;
    const start = `|${E2}|`;
    const lines = [
      E(`|${lin(a)}|×|${lin(b)}|`, t('Factoriser'), 'factor', 'factor'),
      E(`${rT(r)}×|${lin(b)}|`, `|${RD(lin(a))}| ≤ ${fr(N(r))}`, 'interval', 'each'),
      E(N(C), t('x ∈ [{lo} ; {hi}], donc |{e}| ≤ {m}', { lo: fr(N(lo)), hi: fr(N(hi)), e: RD(lin(b)), m: fr(N(q(Math.abs(a - b)).add(r))) }), 'bound', 'each'),
    ];
    const hyp = `|${RD(lin(a))}| ≤ ${fr(N(r))}`;
    return { kind: 'poly', start, lines, lo, hi, C, bound: q(Math.ceil(C.valueOf())), hyp, a, b, r };
  }
  return null;
}

// |(x² − k)/(x + c)| on [lo ; hi], lo ≥ 0: ≤ max|x² − k| / (lo + c).
function boQuot(rng) {
  for (let i = 0; i < 200; i++) {
    const a = rng.int(1, 3);
    const r = rng.pick([q(1, 2), q(1)]);
    const k = rng.int(1, 9);
    const c = rng.int(0, 3);
    const lo = q(a).sub(r);
    const hi = q(a).add(r);
    if (lo.n < 0 || lo.add(q(c)).n <= 0 || k === c * c) continue;
    const M = [lo.mul(lo).sub(q(k)), hi.mul(hi).sub(q(k))].map((x) => (x.n < 0 ? x.neg() : x)).reduce((x, y) => (x.cmp(y) >= 0 ? x : y));
    if (M.n === 0) continue;
    const C = M.div(lo.add(q(c)));
    const den = lin(-c);
    const start = `|(x^2-${k})/${br(den)}|`;
    const lines = [
      E(`|x^2-${k}|/${br(den)}`, t('{d} > 0 sur l\'intervalle', { d: RD(den) }), 'interval', 'den'),
      E(`${M.d === 1 ? N(M) : `(${N(M)})`}/${br(den)}`, t('x² ∈ [{lo} ; {hi}], donc |x² − {k}| ≤ {m}', { lo: fr(N(lo.mul(lo))), hi: fr(N(hi.mul(hi))), k, m: fr(N(M)) }), 'bound', 'num'),
      E(N(C), `${RD(den)} ≥ ${fr(N(lo.add(q(c))))}`, 'bound', 'den'),
    ];
    const hyp = `x ∈ [${fr(N(lo))} ; ${fr(N(hi))}]`;
    return { kind: 'quot', start, lines, lo, hi, C, bound: C, hyp, c, k, M };
  }
  return null;
}

function boItem(level, rng, opts = {}) {
  const d = (level === 2 || rng.chance(0.5)) ? boPoly(rng) : boQuot(rng);
  const free = level === 5 && !opts.exam;
  const judge = { kind: 'equiv', vars: [V], domain: { x: [d.lo.valueOf(), d.hi.valueOf()] }, rel: '≤', target: 'constant', ...(free ? {} : { bound: N(d.bound) }) };
  let script = d.lines;
  if (level === 1) script = [d.lines[0], d.lines[1], blanked(d.lines[2], [d.lines[2].math])];
  if (level === 2 && d.kind === 'poly') {
    script = [d.lines[0],
      { kind: 'decision', prompt: t('Comment majorer |{e}| ?', { e: RD(lin(d.a)) }), options: [
        { id: 'r', label: t('Par {r}, l\'hypothèse', { r: fr(N(d.r)) }), valid: true },
        { id: 'a', label: t('Par {v}', { v: fr(N(d.a === 0 ? d.r.add(q(1)) : q(Math.abs(d.a)).add(d.r))) }), valid: false, why: t('L\'hypothèse dit directement |{e}| ≤ {r}.', { e: RD(lin(d.a)), r: fr(N(d.r)) }) },
      ] },
      d.lines[1],
      { kind: 'decision', prompt: t('Comment majorer |{e}| sur [{lo} ; {hi}] ?', { e: RD(lin(d.b)), lo: fr(N(d.lo)), hi: fr(N(d.hi)) }), options: [
        { id: 'max', label: t('Par sa plus grande valeur sur l\'intervalle, {v}', { v: fr(N(q(Math.abs(d.a - d.b)).add(d.r))) }), valid: true },
        { id: 'min', label: t('Par sa plus petite valeur sur l\'intervalle'), valid: false, why: t('Pour majorer, il faut la plus grande valeur.') },
      ] },
      d.lines[2]];
  }
  const ask = free ? t('Trouve une constante C telle que {e} ≤ C pour {h}.', { e: MT(d.start), h: d.hyp }) : t('Montre que si {h}, alors {e} ≤ {b}. Écris une chaîne de majorations.', { h: d.hyp, e: MT(d.start), b: fr(N(d.bound)) });
  return linesItem({
    skill: BO, level, prompt: ask,
    start: d.start, judge: withMenus(judge, level, d.start, d.lines, BO_CHOICES), mode: modeOf(level), script,
    hints: H(d.kind === 'poly' ? t('Fais apparaître |{e}|, que tu sais majorer.', { e: RD(lin(d.a)) }) : t('Majore le numérateur et minore le dénominateur.'), MT(d.lines[0].math), MT(d.lines[1].math)),
    subgoals: BO_SUB, keys: ['calc', 'ineq'], tapActions: level === 3 ? 'steps' : null,
    key: `${BO}:${level}:${d.start}:${d.hyp}`, exam: examOf(opts, 4),
  });
}

function boTf(rng) {
  const lo = rng.int(1, 2);
  const hi = lo + rng.int(1, 2);
  const c = rng.int(1, 3);
  const wrong = q(1, hi * hi + c);
  const right = q(1, lo * lo + c);
  // s: the French statement, kept for the key; st: the statement shown.
  const bank = [
    { s: `Si x ∈ [${lo} ; ${hi}], alors 1/(x² + ${c}) ≤ ${fr(N(wrong))}.`, st: t('Si x ∈ [{lo} ; {hi}], alors 1/(x² + {c}) ≤ {v}.', { lo, hi, c, v: fr(N(wrong)) }), truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'x', dom: 'R' }], pred: `${lo}≤x≤${hi}⇒1/(x^2+${c})≤${N(wrong)}`, hyp: `${lo}≤x≤${hi}`, ask: [{ v: 'x', label: 'x =' }], answer: { x: String(lo) } }, why: t('Faux : pour x = {lo}, 1/({d}) = {r} > {w}. Pour majorer 1/D, on minore D.', { lo, d: lo * lo + c, r: fr(N(right)), w: fr(N(wrong)) }), rule: 'g1_bound_denominator' },
      { s: `Si x ∈ [${lo} ; ${hi}], alors 1/(x² + ${c}) ≤ ${fr(N(right))}.`, st: t('Si x ∈ [{lo} ; {hi}], alors 1/(x² + {c}) ≤ {v}.', { lo, hi, c, v: fr(N(right)) }), truth: true, why: t('Vrai : x² + {c} ≥ {d} sur l\'intervalle.', { c, d: lo * lo + c }) },
      { s: 'Pour tous a, b ∈ ℝ, |a − b| ≤ |a| − |b|.', truth: false, counter: { kind: 'refute', quants: [{ q: '∀', v: 'a', dom: 'R' }, { q: '∀', v: 'b', dom: 'R' }], pred: '|a-b|≤|a|-|b|', ask: [{ v: 'a', label: 'a =' }, { v: 'b', label: 'b =' }], answer: { a: '1', b: '-1' } }, why: t('Faux : a = 1, b = −1 donne 2 ≤ 0. L\'inégalité triangulaire est |a − b| ≤ |a| + |b|.'), rule: 'g1_triangle_reverse' },
      { s: 'Pour tous a, b ∈ ℝ, |a + b| ≤ |a| + |b|.', truth: true, why: t('Vrai : c\'est l\'inégalité triangulaire.') },
  ];
  const b = rng.pick(bank);
  return tfItem({ skill: BO, level: 4, statement: b.st ?? t(b.s), truth: b.truth, counter: b.counter || null, ruleIfTrue: b.truth ? null : b.rule || null, key: b.s, explanation: b.why, exam: { format: 'tf', points: 1 } });
}

// ======================================================================

export const GEN = {
  [RI]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? riMcq(rng) : riItem(opts.exam ? 5 : level, rng, opts)),
  [PA]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? paMcq(rng) : paItem(opts.exam ? 4 : level, rng, opts)),
  [VI]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? viMcq(rng) : viItem(opts.exam ? 5 : level, rng, opts)),
  [AE]: (level, rng, profile, opts = {}) => (opts.exam ? aeExam(rng, opts.exam) : aeItem(level, rng, opts)),
  [AI]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? aiMcq(rng) : aiItem(opts.exam ? 5 : level, rng, opts)),
  [IE]: (level, rng, profile, opts = {}) => (opts.exam ? ieExam(rng, opts.exam) : ieItem(level, rng, opts)),
  [II]: (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? iiMcq(rng) : iiItem(opts.exam ? 5 : level, rng, opts)),
  [BO]: (level, rng, profile, opts = {}) => (opts.exam === 'tf' ? boTf(rng) : boItem(opts.exam ? 5 : level, rng, opts)),
};
