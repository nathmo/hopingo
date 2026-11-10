// Generators of module G6, part a (unit `analyse0`, step U2): the study of
// a function. g6-sign-variation (f′ factored, its sign, the extrema),
// g6-convexity (f″, its sign, the inflection points and their tangent),
// g6-optim (a quantity of one variable on its domain, its maximum).
// Catalogue: docs/universite/G-gymnase-2.md, G6. Levels as in
// analyse0-a.js. A part per question: f′ (equiv, factored), its sign
// (solset), then one part per critical point, opened by a decision
// (max, min, neither) and asking f(r) (value). The decisions carry the
// final-answer traps (g6_critical_is_extremum, g6_inflection_f2_zero,
// g6_optim_outside_domain).

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { solutionSet, setToNode } from '../../cas/sets.js';
import { templateOf } from '../../judges/lines.js';
import { MT, linesItem, mcq, tableItem } from './kit.js';
import {
  V, q, N, nz, modeOf, H, E, NOTE, examOf, fr, tpl, blanked, partsItem, polyText, fromRoots, dPoly, iPoly, evalPoly, at, valueAt,
  lin, factoredText, tangentText, tangentFinal, tangentCfg, tangentLines, pre,
} from './analyse0-a-kit.js';

const KEYS = ['calcx', 'relation', 'set'];
const setText = (rel) => toText(setToNode(solutionSet(parse(rel), { v: V })));
const isInt = (cs) => cs.every((c) => Q.of(c).d === 1);
const small = (cs, k) => cs.every((c) => Math.abs(Q.of(c).valueOf()) <= k);
const VAL = { kind: 'value', form: 'irreducible' };
const derivJudge = (dom, factored = true) => ({ kind: 'equiv', vars: [V], dvar: V, domain: { x: dom }, ...(factored ? { target: 'no-sum', factored: true } : { target: 'no-prime' }) });
const R = (x) => fr(N(x));

// The sign of a factored function on each side of r (h = 1/2).
const sideSigns = (fText, r) => [Math.sign(valueAt(fText, Q.of(r).sub(q(1, 2))).valueOf()), Math.sign(valueAt(fText, Q.of(r).add(q(1, 2))).valueOf())];

// ---------- sign tables (level 1) ----------

// Columns alternate an interval and a bound; a factor row gets the sign of
// its factor in each column.
function signTable(bounds, factors) {
  const B = bounds.map((b) => Q.of(b));
  const pts = [];
  for (let j = 0; j <= 2 * B.length; j++) {
    if (j % 2) pts.push(B[(j - 1) / 2]);
    else {
      const k = j / 2;
      pts.push(k === 0 ? B[0].sub(1) : k === B.length ? B[B.length - 1].add(1) : B[k - 1].add(B[k]).div(2));
    }
  }
  const sgn = (v) => (v.n === 0 ? '0' : v.n > 0 ? '+' : '−');
  for (const f of factors) f.signs = pts.map((x) => sgn(valueAt(f.f, x)));
  const prod = pts.map((_, j) => {
    if (factors.some((f) => f.den && f.signs[j] === '0')) return '‖';
    if (factors.some((f) => f.signs[j] === '0')) return '0';
    return factors.filter((f) => f.signs[j] === '−').length % 2 ? '−' : '+';
  });
  const cols = pts.map((_, j) => (j % 2 ? fr(N(B[(j - 1) / 2])) : ''));
  return { cols, prod };
}

// ======================================================================
// g6-sign-variation
// ======================================================================

const SV = 'g6-sign-variation';
const SV_SUB = [
  { id: 'derive', label: 'dériver', skill: 'g6-deriv-rules' },
  { id: 'factor', label: 'factoriser', skill: 'fac-complete' },
  { id: 'sign', label: 'signe de f′', skill: 'g1-sign-table' },
  { id: 'extrema', label: 'extrema', skill: SV },
];
const SV_CHOICES = [
  { id: 'derive', label: 'Dériver' },
  { id: 'factor', label: 'Factoriser f′' },
  { id: 'sign', label: 'Signe de chaque facteur, puis de f′' },
  { id: 'value', label: 'Valeur de f au point critique' },
  { id: 'expand', label: 'Développer f′', why: 'Pour le signe, il faut f′ factorisée, pas développée.' },
];
const NATURE = { max: 'maximum local', min: 'minimum local', none: 'ni maximum ni minimum' };

// f with f′ = k·Π(x − r)^m: {f, fcs, d1 (f′ expanded), fac (f′ factored),
// crit: [{r, kind}], dom, factors (sign table), lines1 (the f′ lines)}.
function svData(rng, gab) {
  for (let i = 0; i < 200; i++) {
    let k;
    let roots;
    if (gab === 'cubic') {
      const r1 = rng.int(-4, 3);
      const r2 = rng.int(r1 + 1, 4);
      const a = rng.pick([1, 1, -1, 2]);
      k = 3 * a;
      roots = [[r1, 1], [r2, 1]];
    } else if (gab === 'quartic') {
      const r = rng.int(-3, 3);
      const s = rng.int(-3, 3);
      if (r === s) continue;
      k = rng.pick([4, 4, -4]);
      roots = [[r, 2], [s, 1]];
    } else {
      const m = rng.pick([1, 2, 3, 4]);
      const c = m * m;
      const f = `(x^2+${c})/x`;
      const fac = `(${lin(m)})(${lin(-m)})/x^2`;
      return {
        gab, f, dom: [0.3, 3], fac,
        lines1: [E(`(2x×x-(x^2+${c}))/x^2`, 'Règle du quotient', 'derive', 'derive'), E(`(x^2-${c})/x^2`, 'Réduire', 'derive', 'derive'), E(fac, 'Factoriser', 'factor', 'factor')],
        crit: [{ r: -m, kind: 'max', fr: q(-2 * m) }, { r: m, kind: 'min', fr: q(2 * m) }],
        bounds: [-m, 0, m], factors: [{ id: 'f0', f: lin(m), label: lin(m) }, { id: 'f1', f: lin(-m), label: lin(-m) }, { id: 'f2', f: 'x^2', label: 'x²', den: true, even: true }],
      };
    }
    const d1 = fromRoots(k, roots);
    const fcs = iPoly(d1, rng.int(-5, 5));
    if (!isInt(fcs) || !small(fcs, 30)) continue;
    const f = polyText(fcs);
    const fac = factoredText(k, roots);
    const crit = roots.map(([r]) => r).sort((u, w) => u - w).map((r) => {
      const [l, rr] = sideSigns(fac, r);
      return { r, kind: l > 0 && rr < 0 ? 'max' : l < 0 && rr > 0 ? 'min' : 'none', fr: evalPoly(fcs, r) };
    });
    if (crit.some((c) => Math.abs(c.fr.valueOf()) > 80)) continue;
    // Sign-table factors with a positive constant: k < 0 turns x − r into r − x.
    const sorted = [...roots].sort((u, w) => u[0] - w[0]);
    const flip = k < 0 ? sorted.findIndex(([, m]) => m === 1) : -1;
    const factors = sorted.map(([r, m], j) => {
      const base = j === flip ? (r === 0 ? '-x' : `${N(r)}-x`) : lin(r);
      const t = m === 2 ? (base === 'x' ? 'x^2' : `(${base})^2`) : base;
      return { id: `f${j}`, f: t, label: t.replace('^2', '²'), even: m === 2 };
    });
    return {
      gab, f, fcs, dom: [-3, 3], fac,
      lines1: [E(polyText(d1), 'Dériver', 'derive', 'derive'), E(fac, 'Factoriser', 'factor', 'factor')],
      crit, bounds: sorted.map(([r]) => r), factors,
    };
  }
  return null;
}
const SV_FALLBACK = () => {
  const fcs = [q(1), q(-3), q(-9), q(2)];
  return {
    gab: 'cubic', f: 'x^3-3x^2-9x+2', fcs, dom: [-3, 3], fac: '3(x+1)(x-3)',
    lines1: [E('3x^2-6x-9', 'Dériver', 'derive', 'derive'), E('3(x+1)(x-3)', 'Factoriser', 'factor', 'factor')],
    crit: [{ r: -1, kind: 'max', fr: q(7) }, { r: 3, kind: 'min', fr: q(-25) }], bounds: [-1, 3],
    factors: [{ id: 'f0', f: 'x+1', label: 'x+1' }, { id: 'f1', f: 'x-3', label: 'x-3' }], fallback: true,
  };
};

// The decision at a critical point; a wrong extremum where there is none
// is the trap g6_critical_is_extremum.
function natureDecision(c, word = 'f′') {
  const why = { max: `${word} passe de + à − : maximum local.`, min: `${word} passe de − à + : minimum local.`, none: `${word} garde le même signe des deux côtés : ni maximum ni minimum.` }[c.kind];
  return {
    kind: 'decision', prompt: `En x = ${R(c.r)}, f a…`,
    options: ['max', 'min', 'none'].map((id) => ({
      id, label: `un ${NATURE[id]}`.replace('un ni', 'ni'), valid: id === c.kind, why,
      ...(c.kind === 'none' && id !== 'none' ? { rule: 'g6_critical_is_extremum' } : {}),
    })),
  };
}

function svParts(d, level) {
  const parts = [];
  if (level >= 2) {
    parts.push({ html: 'Dérive et factorise f′.', ask: 'f′(x) =', start: `d(${d.f})`, judge: derivJudge(d.dom), lines: level === 2 ? [d.lines1[0], ...d.lines1.slice(1, -1), blanked(d.lines1.at(-1), [lin(d.crit.at(-1).r)])] : d.lines1 });
  }
  const set = setText(`${d.fac}>0`);
  parts.push({ html: 'Où f′ est-elle positive ?', start: `${d.fac}>0`, judge: { kind: 'solset', v: V }, lines: [level <= 2 ? blanked(E(set, 'Tableau de signes de f′', 'sign', 'sign'), [N(d.crit[0].r)]) : E(set, 'Tableau de signes de f′', 'sign', 'sign')] });
  for (const c of d.crit) {
    parts.push({
      html: `Point critique x = ${R(c.r)} :`, ask: `f(${R(c.r)}) =`, start: at(d.f, c.r), judge: VAL,
      pre: level === 1 ? [NOTE(`f′ change ${c.kind === 'none' ? 'pas ' : ''}de signe : ${NATURE[c.kind]}.`)] : [natureDecision(c)],
      lines: [E(N(c.fr), NATURE[c.kind], 'extrema', 'value')],
    });
  }
  return parts;
}

const svPrompt = (rng, d) => rng.pick([
  `Étudie la variation de f(x) = ${MT(d.f)} : signe de f′, puis nature et valeur de chaque point critique.`,
  `Soit f(x) = ${MT(d.f)}. Où f croît-elle ? Donne ses extrema locaux.`,
]);

function svItem(level, rng, opts = {}) {
  if (opts.exam === 'mcq') return svMcq(rng);
  if (opts.exam === 'tf') return svTf(rng);
  const gab = level === 5 ? 'quartic' : opts.exam === 'open' ? rng.pick(['cubic', 'quartic']) : rng.pick(level === 1 ? ['cubic', 'quartic'] : ['cubic', 'cubic', 'quartic', 'rational']);
  const d = svData(rng, gab) ?? SV_FALLBACK();
  if (level === 1) return svTable(rng, d);
  const parts = svParts(d, level);
  return partsItem({
    skill: SV, level, parts, choices: SV_CHOICES, prompt: svPrompt(rng, d),
    hints: H('Factorise f′, puis fais le tableau de signes : f croît où f′ > 0. Un extremum demande que f′ <b>change de signe</b>.', `f′(x) = ${MT(templateOf(tpl(d.fac, [lin(d.crit.at(-1).r)])))}`, d.crit.map((c) => `en ${R(c.r)} : ${NATURE[c.kind]}, f(${R(c.r)}) = ${R(c.fr)}`).join(' ; ')),
    subgoals: SV_SUB, keys: KEYS, key: `${SV}:${level}:${d.f}`, exam: examOf(opts, 3), fallback: d.fallback, expectedSec: 60 + 40 * parts.length,
  });
}

// Level 1: the sign table of f′ (factors given), then the extrema.
function svTable(rng, d) {
  const { cols, prod } = signTable(d.bounds, d.factors);
  const rows = d.factors.map((f) => ({ id: f.id, label: `${f.label}${f.den ? ' (dén.)' : ''}`, cells: f.signs.map((s) => ({ input: true, kind: 'sign' })) }));
  rows.push({ id: 'f', label: 'f′(x)', cells: prod.map(() => ({ input: true, kind: 'sign' })) });
  const answers = Object.fromEntries(d.factors.map((f) => [f.id, f.signs]));
  answers.f = prod;
  const then = linesItem({
    skill: SV, level: 1, prompt: 'Lis le tableau : nature et valeur de chaque point critique.',
    ...thenParts(d), mode: 'guided', noHints: true, hints: [], subgoals: SV_SUB, keys: KEYS, key: `${SV}:then:${d.f}`,
  });
  const line = (s) => s.join(' ');
  return tableItem({
    skill: SV, level: 1, prompt: `f(x) = ${MT(d.f)}, et f′(x) = ${MT(d.fac)}. Fais le tableau de signes de f′ (touche une case pour choisir + , − , 0 ou ‖).`,
    table: { cols, rows }, phi: { kind: 'signs', v: V, bounds: d.bounds.map(String), factors: d.factors.map((f) => ({ id: f.id, f: f.f, den: !!f.den, even: !!f.even })) },
    answers, then,
    hints: H('Une ligne par facteur : il change de signe en sa racine, sauf s\'il est au carré. La dernière ligne : la règle des signes.', `${d.factors[0].label} : ${line(d.factors[0].signs)}`, `f′(x) : ${line(prod)}`),
    baits: d.crit.some((c) => c.kind === 'none') ? ['g6_critical_is_extremum'] : [],
    subgoals: SV_SUB, key: `${SV}:1:${d.f}`, fallback: d.fallback,
    solution: [...d.factors.map((f) => ({ html: `${f.label} : ${line(f.signs)}`, note: '' })), { html: `f′(x) : ${line(prod)}`, note: 'Règle des signes' }],
  });
}

// The parts after the table: one per critical point (decision given).
function thenParts(d) {
  const [first, ...rest] = d.crit.map((c) => ({
    html: `x = ${R(c.r)} : ${NATURE[c.kind]}`, ask: `f(${R(c.r)}) =`, start: at(d.f, c.r), judge: VAL,
    lines: [E(N(c.fr), `${NATURE[c.kind]} : f(${R(c.r)})`, 'extrema')],
  }));
  const script = [NOTE(`<b>${first.html}</b>`), ...first.lines];
  for (const p of rest) script.push({ kind: 'segment', html: p.html, ask: p.ask, start: { math: p.start }, judge: p.judge }, ...p.lines);
  return { start: first.start, judge: first.judge, script };
}

function svMcq(rng) {
  const d = svData(rng, 'quartic') ?? SV_FALLBACK();
  const say = (cs) => (cs.length ? cs.map((c) => `un ${NATURE[c.kind]} en x = ${R(c.r)}`).join(' et ') : 'aucun extremum local');
  const ext = d.crit.filter((c) => c.kind !== 'none');
  const none = d.crit.filter((c) => c.kind === 'none');
  const all = d.crit.map((c) => ({ ...c, kind: c.kind === 'none' ? (ext[0]?.kind === 'max' ? 'min' : 'max') : c.kind }));
  const swapped = ext.map((c) => ({ ...c, kind: c.kind === 'max' ? 'min' : 'max' }));
  const cand = [
    { html: say(ext), correct: true },
    { html: say(all), correct: false, rule: none.length ? 'g6_critical_is_extremum' : undefined },
    { html: say(swapped), correct: false },
    { html: say([]), correct: false },
  ];
  const options = cand.filter((o, i) => cand.findIndex((x) => x.html === o.html) === i);
  return mcq({
    skill: SV, level: 4, prompt: `f(x) = ${MT(d.f)}, avec f′(x) = ${MT(d.fac)}. Quels sont les extrema locaux de f ?`, options,
    key: `${SV}:mcq:${d.f}`, solution: [{ html: `Signe de f′ : f′ > 0 sur ${MT(setText(`${d.fac}>0`))}.`, note: '' }, ...d.crit.map((c) => ({ html: `x = ${R(c.r)} : ${NATURE[c.kind]}`, note: '' }))],
    exam: { format: 'mcq', points: 1 }, fallback: d.fallback,
  }, rng);
}

// True or false: a Vrai/Faux choice (no checker takes a function as a
// counter-example yet).
function svTf(rng) {
  const d = svData(rng, rng.pick(['cubic', 'quartic'])) ?? SV_FALLBACK();
  const bank = [
    { s: 'Si f est dérivable et f′(a) = 0, alors f a un extremum local en a.', truth: false, rule: 'g6_critical_is_extremum', why: 'Faux : f(x) = x³ a f′(0) = 0, mais f croît des deux côtés de 0 : pas d\'extremum.' },
    { s: 'f(x) = x³ a un extremum local en 0, car f′(0) = 0.', truth: false, rule: 'g6_critical_is_extremum', why: 'Faux : f′(x) = 3x² ≥ 0 ne change pas de signe en 0.' },
    { s: 'Si f est dérivable et que f′ passe de + à − en a, alors f a un maximum local en a.', truth: true, why: 'Vrai : f croît avant a et décroît après.' },
  ];
  const c = rng.pick(d.crit);
  const claim = rng.pick(['max', 'min', 'none'].filter((k) => k !== c.kind || rng.chance(0.5)));
  bank.push({
    s: `f(x) = ${MT(d.f)} ${claim === 'none' ? 'n’a ni maximum ni minimum local' : `a un ${NATURE[claim]}`} en x = ${R(c.r)}.`, truth: claim === c.kind,
    rule: c.kind === 'none' && claim !== 'none' ? 'g6_critical_is_extremum' : null,
    why: `${claim === c.kind ? 'Vrai' : 'Faux'} : f′(x) = ${MT(d.fac)} ; en ${R(c.r)}, ${NATURE[c.kind]}.`,
  });
  const b = rng.pick(bank);
  return mcq({
    skill: SV, level: 4, prompt: `Vrai ou faux ?<br>« ${b.s} »`,
    options: [{ html: 'Vrai', correct: b.truth, rule: b.truth ? null : b.rule }, { html: 'Faux', correct: !b.truth }],
    keepOrder: true, key: `${SV}:tf:${b.s}`, solution: [{ html: b.why, note: '' }], exam: { format: 'tf', points: 1 }, expectedSec: 40,
  }, rng);
}

// ======================================================================
// g6-convexity
// ======================================================================

const CX = 'g6-convexity';
const CX_SUB = [
  { id: 'derive', label: 'dériver deux fois', skill: 'g6-deriv-rules' },
  { id: 'sign', label: 'signe de f″', skill: SV },
  { id: 'inflection', label: 'point d\'inflexion', skill: CX },
  { id: 'tangent', label: 'tangente d\'inflexion', skill: 'g6-tangent' },
];
const CX_CHOICES = [
  { id: 'derive1', label: 'Dériver une première fois' },
  { id: 'derive2', label: 'Dériver une deuxième fois' },
  { id: 'factor', label: 'Factoriser f″' },
  { id: 'sign', label: 'Signe de f″' },
  { id: 'value', label: 'Valeur de f au point' },
  { id: 'slope', label: 'Pente f′ au point d\'inflexion' },
  { id: 'line', label: 'Écrire y = f(a) + f′(a)(x − a)' },
  { id: 'expand', label: 'Développer : y = mx + p' },
];

// f with f″ = k·Π(x − p)^m: cubic (one inflection), quartic with two, or
// quartic with a double zero of f″ (no inflection, 1 time in 4).
function cxData(rng, gab) {
  for (let i = 0; i < 200; i++) {
    let k;
    let roots;
    if (gab === 'cubic') { k = 6 * rng.pick([1, 1, -1]); roots = [[rng.int(-2, 2), 1]]; } else if (gab === 'two') {
      const p = rng.int(-2, 1);
      roots = [[p, 1], [rng.int(p + 1, 2), 1]];
      k = 12;
    } else { k = 12; roots = [[rng.int(-2, 2), 2]]; }
    const d2 = fromRoots(k, roots);
    const d1 = iPoly(d2, rng.int(-5, 5));
    const fcs = iPoly(d1, rng.int(-4, 4));
    if (!isInt(fcs) || !small(fcs, 40)) continue;
    const f = polyText(fcs);
    const fac = factoredText(k, roots);
    const crit = roots.map(([p]) => p).sort((u, w) => u - w).map((p) => {
      const [l, r] = sideSigns(fac, p);
      return { r: p, kind: l !== r ? 'yes' : 'no', fr: evalPoly(fcs, p), dfr: evalPoly(d1, p) };
    });
    if (crit.some((c) => Math.abs(c.fr.valueOf()) > 60 || Math.abs(c.dfr.valueOf()) > 40)) continue;
    const d2t = polyText(d2);
    return {
      gab, f, fcs, d1: polyText(d1), d2: d2t, fac, crit, dom: [-3, 3],
      lines1: [E(`d(${polyText(d1)})`, 'Dériver une fois', 'derive', 'derive1'), E(d2t, 'Dériver une deuxième fois', 'derive', 'derive2'), ...(d2t === fac ? [] : [E(fac, 'Factoriser', 'derive', 'factor')])],
    };
  }
  return null;
}
const CX_FALLBACK = () => ({
  gab: 'cubic', f: 'x^3-3x^2-9x+2', fcs: [q(1), q(-3), q(-9), q(2)], d1: '3x^2-6x-9', d2: '6x-6', fac: '6(x-1)', dom: [-3, 3],
  crit: [{ r: 1, kind: 'yes', fr: q(-9), dfr: q(-12) }],
  lines1: [E('d(3x^2-6x-9)', 'Dériver une fois', 'derive', 'derive1'), E('6x-6', 'Dériver une deuxième fois', 'derive', 'derive2'), E('6(x-1)', 'Factoriser', 'derive', 'factor')], fallback: true,
});

function inflectionDecision(c) {
  return {
    kind: 'decision', prompt: `f″(${R(c.r)}) = 0. Le graphe a-t-il un point d'inflexion en x = ${R(c.r)} ?`,
    options: [
      { id: 'yes', label: 'Oui', valid: c.kind === 'yes', why: c.kind === 'yes' ? '' : 'f″ garde le même signe des deux côtés : la concavité ne change pas.', ...(c.kind === 'no' ? { rule: 'g6_inflection_f2_zero' } : {}) },
      { id: 'no', label: 'Non', valid: c.kind === 'no', why: 'f″ change de signe : la concavité change, c\'est un point d\'inflexion.' },
    ],
  };
}

function cxParts(d, level) {
  const parts = [];
  if (level >= 2) {
    const l1 = level === 2 ? d.lines1.map((l, k) => (k === d.lines1.length - 1 ? blanked(l, [String(Math.abs(d.crit[0].r)) === '0' ? 'x' : lin(d.crit[0].r)]) : l)) : d.lines1;
    parts.push({ html: 'Dérive deux fois.', ask: 'f″(x) =', start: `d(d(${d.f}))`, judge: derivJudge(d.dom), lines: l1 });
  }
  const set = setText(`${d.fac}>0`);
  parts.push({ html: 'Où f″ est-elle positive (f convexe) ?', start: `${d.fac}>0`, judge: { kind: 'solset', v: V }, lines: [level === 1 ? blanked(E(set, 'Signe de f″', 'sign', 'sign'), [N(d.crit[0].r)]) : E(set, 'Signe de f″', 'sign', 'sign')] });
  for (const c of d.crit) {
    parts.push({
      html: `x = ${R(c.r)} :`, ask: `f(${R(c.r)}) =`, start: at(d.f, c.r), judge: VAL,
      pre: level === 1 ? [NOTE(c.kind === 'yes' ? 'f″ change de signe : point d\'inflexion.' : 'f″ ne change pas de signe : pas d\'inflexion.')] : [inflectionDecision(c)],
      lines: [E(N(c.fr), c.kind === 'yes' ? 'Point d\'inflexion' : 'Pas d\'inflexion', 'inflection', 'value')],
    });
  }
  // The tangent at the first inflection point.
  const c = d.crit.find((x) => x.kind === 'yes');
  if (c && level >= 2) {
    const t = { fa: c.fr, dfa: c.dfr, a: c.r, df: d.d1, dom: d.dom };
    parts.push({ html: 'Tangente d\'inflexion : pente', ask: `f′(${R(c.r)}) =`, start: at(d.d1, c.r), judge: VAL, lines: [E(N(c.dfr), 'Pente au point d\'inflexion', 'tangent', 'slope')] });
    const lines = tangentLines(c.fr, c.dfr, c.r, 'tangent');
    parts.push({ html: 'Tangente d\'inflexion :', ask: 'y =', start: 'y', judge: tangentCfg(t), lines: level === 2 ? lines.map((l, k) => (k === lines.length - 1 ? l : blanked(l, [N(c.dfr)], { vars: [V, 'y'] }))) : lines });
  }
  return parts;
}

function cxItem(level, rng, opts = {}) {
  if (opts.exam === 'mcq') return cxMcq(rng);
  if (opts.exam === 'tf') return cxTf(rng);
  if (level === 5) return cxParams(rng);
  const gab = rng.chance(0.25) ? 'double' : rng.pick(['cubic', 'cubic', 'two']);
  const d = cxData(rng, gab) ?? CX_FALLBACK();
  const parts = cxParts(d, level);
  const c = d.crit.find((x) => x.kind === 'yes');
  return partsItem({
    skill: CX, level, parts, choices: CX_CHOICES,
    before: level === 1 ? [NOTE(`On donne f″(x) = ${MT(d.fac)}.`)] : [],
    prompt: rng.pick([
      `Soit f(x) = ${MT(d.f)}. Où f est-elle convexe ? Donne ses points d'inflexion${level >= 2 && c ? ' et la tangente au premier' : ''}.`,
      `Étudie la concavité de f(x) = ${MT(d.f)} : signe de f″, points d'inflexion${level >= 2 && c ? ', tangente d\'inflexion' : ''}.`,
    ]),
    hints: H('Calcule f″ et cherche où elle <b>change de signe</b> : f″(a) = 0 ne suffit pas.', `f″(x) = ${MT(d.fac)}`, d.crit.map((x) => (x.kind === 'yes' ? `inflexion en (${R(x.r)} ; ${R(x.fr)})` : `pas d'inflexion en ${R(x.r)}`)).join(' ; ')),
    subgoals: CX_SUB, keys: KEYS, key: `${CX}:${level}:${d.f}`, exam: examOf(opts, 3), fallback: d.fallback, expectedSec: 60 + 40 * parts.length,
  });
}

// Level 5 (CMS série 14 modifiée): g(x) = x³ + px² + qx with an inflection
// at a and a tangent of slope m there.
function cxParams(rng) {
  const a = nz(rng, -2, 2);
  const m = nz(rng, -6, 6);
  const p = -3 * a;
  const qq = m + 3 * a * a;
  const g = `x^3+p×x^2+q×x`;
  const gg = polyText([1, p, qq, 0]);
  const ga = evalPoly([1, p, qq, 0], a);
  const t = { fa: ga, dfa: q(m), a, df: polyText([3, 2 * p, qq]), dom: [-3, 3] };
  const A = R(a);
  const parts = [
    { html: 'Dérive deux fois g.', ask: 'g″(x) =', start: `d(d(${g}))`, judge: { kind: 'equiv', vars: [V, 'p', 'q'], dvar: V, domain: { x: [-2, 2], p: [-3, 3], q: [-3, 3] }, target: 'no-prime' }, lines: [E(`d(3x^2+2p×x+q)`, 'Dériver une fois', 'derive'), E('6x+2p', 'Dériver une deuxième fois', 'derive')] },
    { html: `Inflexion en ${A} : g″(${A}) = 0.`, start: `${at('6x+2p', a)}=0`, judge: { kind: 'solset', v: 'p' }, lines: [E(`p=${p}`, 'Résoudre', 'inflection')] },
    { html: `Pente ${fr(m)} en ${A} : g′(${A}) = ${fr(m)}.`, start: `${at(`3x^2${p < 0 ? '' : '+'}${2 * p}x+q`, a)}=${m}`, judge: { kind: 'solset', v: 'q' }, lines: [E(`q=${qq}`, 'Résoudre', 'inflection')] },
    { html: `Point d'inflexion : g(x) = ${MT(gg)}.`, ask: `g(${A}) =`, start: at(gg, a), judge: VAL, lines: [E(N(ga), 'Valeur en a', 'inflection')] },
    { html: 'Tangente d\'inflexion :', ask: 'y =', start: 'y', judge: tangentCfg(t), lines: tangentLines(ga, m, a, 'tangent', 'g') },
  ];
  return partsItem({
    skill: CX, level: 5, parts, declares: { vars: [V, 'p', 'q'] },
    prompt: `g(x) = x³ + px² + qx. Trouve p et q pour que le graphe de g ait un point d'inflexion en x = ${A}, avec une tangente de pente ${fr(m)} ; donne cette tangente.`,
    hints: [], subgoals: CX_SUB, keys: [...KEYS, 'letters'], key: `${CX}:5:${a}:${m}`, exam: false, expectedSec: 240,
  });
}

function cxMcq(rng) {
  const s = rng.pick([1, -1]);
  let cs;
  let right;
  let trap;
  let others;
  if (rng.chance(0.5)) {
    // f″ = 20x²(x − 3s): an inflection at 3s only.
    cs = [1, -5 * s, 0, 0, rng.int(-4, 4), rng.int(-3, 3)].map((c) => q(c));
    right = `en x = ${R(3 * s)} seulement`;
    trap = `en x = 0 et en x = ${R(3 * s)}`;
    others = ['en x = 0 seulement', 'aucun point d’inflexion'];
  } else {
    // f″ = 12(x − p)²: no inflection.
    const p = s * rng.int(1, 2);
    cs = iPoly(iPoly(fromRoots(12, [[p, 2]]), rng.int(-4, 4)), rng.int(-3, 3));
    right = 'aucun point d’inflexion';
    trap = `en x = ${R(p)}`;
    others = [`en x = 0 et en x = ${R(p)}`, `en x = ${R(-p)}`];
  }
  const f = polyText(cs);
  const d2 = polyText(dPoly(dPoly(cs)));
  return mcq({
    skill: CX, level: 4, prompt: `Soit f(x) = ${MT(f)}, avec f″(x) = ${MT(d2)}. Où le graphe de f a-t-il un point d'inflexion ?`,
    options: [{ html: right, correct: true }, { html: trap, correct: false, rule: 'g6_inflection_f2_zero' }, ...others.map((h) => ({ html: h, correct: false }))],
    key: `${CX}:mcq:${f}`, solution: [{ html: `f″(x) = ${MT(d2)} : une inflexion là où f″ <b>change de signe</b> (un zéro double ne compte pas).`, note: '' }],
    exam: { format: 'mcq', points: 1 },
  }, rng);
}

function cxTf(rng) {
  const bank = [
    { s: 'Si f est deux fois dérivable et f″(a) = 0, alors le graphe de f a un point d\'inflexion en a.', truth: false, rule: 'g6_inflection_f2_zero', why: 'Faux : f(x) = x⁴ a f″(0) = 0, mais f″(x) = 12x² ≥ 0 ne change pas de signe : f est convexe partout.' },
    { s: 'Le graphe de f(x) = x⁴ a un point d\'inflexion en 0.', truth: false, rule: 'g6_inflection_f2_zero', why: 'Faux : f″(x) = 12x² garde le même signe des deux côtés de 0.' },
    { s: 'Si f″ change de signe en a, le graphe de f a un point d\'inflexion en a.', truth: true, why: 'Vrai : c\'est la définition, la concavité change en a.' },
  ];
  const d = cxData(rng, rng.pick(['cubic', 'two'])) ?? CX_FALLBACK();
  const set = setText(`${d.fac}>0`);
  const claimConvex = rng.chance(0.5);
  bank.push({
    s: `f(x) = ${MT(d.f)} est ${claimConvex ? 'convexe' : 'concave'} sur ${MT(set)}.`, truth: claimConvex,
    why: `${claimConvex ? 'Vrai' : 'Faux'} : f″(x) = ${MT(d.fac)} > 0 sur ${MT(set)}, donc f y est convexe.`,
  });
  const b = rng.pick(bank);
  return mcq({
    skill: CX, level: 4, prompt: `Vrai ou faux ?<br>« ${b.s} »`,
    options: [{ html: 'Vrai', correct: b.truth, rule: b.truth ? null : b.rule }, { html: 'Faux', correct: !b.truth }],
    keepOrder: true, key: `${CX}:tf:${b.s}`, solution: [{ html: b.why, note: '' }], exam: { format: 'tf', points: 1 }, expectedSec: 40,
  }, rng);
}

// ======================================================================
// g6-optim
// ======================================================================

const OP = 'g6-optim';
const OP_SUB = [
  { id: 'domain', label: 'variable et domaine', skill: 'g1-domain' },
  { id: 'model', label: 'grandeur à optimiser', skill: OP },
  { id: 'derive', label: 'dériver, factoriser', skill: 'g6-deriv-rules' },
  { id: 'roots', label: 'racines dans le domaine', skill: 'quad-formula' },
  { id: 'max', label: 'justifier le maximum', skill: SV },
];
const OP_CHOICES = [
  { id: 'domain', label: 'Variable et domaine' },
  { id: 'model', label: 'Écrire la grandeur avec la seule variable x' },
  { id: 'expand', label: 'Développer' },
  { id: 'derive', label: 'Dériver' },
  { id: 'factor', label: 'Factoriser la dérivée' },
  { id: 'roots', label: 'Garder les racines du domaine' },
  { id: 'value', label: 'Calculer la valeur maximale' },
];

// Boxes cut from an L × l sheet whose V′ has rational roots, the right one
// a whole number or a simple fraction (L² − Ll + l² a square).
const BOXES = [];
for (let l = 4; l <= 30; l++) {
  for (let L = l + 1; L <= 30; L++) {
    const s = Math.sqrt(L * L - L * l + l * l);
    if (!Number.isInteger(s)) continue;
    const x1 = q(L + l - s, 6);
    const x2 = q(L + l + s, 6);
    if (12 % (x1.d * x2.d) !== 0 || x1.d > 2) continue;
    BOXES.push({ L, l, x1, x2 });
  }
}

// A problem: {kind, words, varText, dom (constraint), domSet, model, expanded,
// d1, fac, roots: [{x, keep}], xs, vmax, name (V or A), hi}
function opData(rng, kind) {
  if (kind === 'box') {
    const b = rng.pick(BOXES.filter((x) => x.L <= 24));
    const { L, l, x1, x2 } = b;
    const model = `x(${L}-2x)(${l}-2x)`;
    const cs = [q(4), q(-2 * (L + l)), q(L * l), q(0)];
    const d1 = dPoly(cs);
    const k = q(12).div(x1.d * x2.d);
    const fac = `${pre(k)}(${x1.d === 1 ? lin(x1) : `${x1.d}x-${x1.n}`})(${x2.d === 1 ? lin(x2) : `${x2.d}x-${x2.n}`})`;
    return {
      kind, name: 'V', L, l, words: `Dans une feuille de ${L} cm × ${l} cm, on découpe un carré de côté x aux quatre coins, puis on plie pour faire une boîte sans couvercle. Pour quel x le volume est-il maximal, et que vaut-il ?`,
      constraint: `x>0 et ${L}-2x>0 et ${l}-2x>0`, hi: q(l, 2), model, expanded: polyText(cs), d1: polyText(d1), fac,
      roots: [{ x: x1, keep: true }, { x: x2, keep: false }], vmax: evalPoly(cs, x1), unit: 'cm³',
    };
  }
  if (kind === 'parabola') {
    const k = rng.pick([1, 2, 3]);
    const c = 3 * k * k;
    const cs = [q(-2), q(0), q(2 * c), q(0)];
    return {
      kind, name: 'A', words: `Un rectangle a deux sommets sur l'axe des x et deux sur la parabole y = ${c} − x², symétriques par rapport à l'axe des y (sommets (±x ; 0) et (±x ; ${c} − x²)). Pour quel x son aire est-elle maximale, et que vaut-elle ?`,
      constraint: `x>0 et ${c}-x^2>0`, hi: null, model: `2x(${c}-x^2)`, expanded: polyText(cs), d1: polyText(dPoly(cs)), fac: `-6(${lin(k)})(${lin(-k)})`,
      roots: [{ x: q(k), keep: true }, { x: q(-k), keep: false }], vmax: evalPoly(cs, k), unit: '',
    };
  }
  const P = rng.pick([20, 24, 40, 60, 80, 100, 120]);
  const cs = [q(-2), q(P), q(0)];
  return {
    kind, name: 'A', words: `Avec ${P} m de clôture, on entoure un enclos rectangulaire le long d'un mur (le mur ferme le quatrième côté). x est la longueur des deux côtés perpendiculaires au mur. Pour quel x l'aire est-elle maximale, et que vaut-elle ?`,
    constraint: `x>0 et ${P}-2x>0`, hi: q(P, 2), model: `x(${P}-2x)`, expanded: polyText(cs), d1: polyText(dPoly(cs)), fac: `4(${P / 4}-x)`,
    roots: [{ x: q(P / 4), keep: true }], vmax: evalPoly(cs, P / 4), unit: 'm²',
  };
}

const keepDecision = (r, dom) => ({
  kind: 'decision', prompt: `La racine x = ${R(r.x)} de la dérivée : on la…`,
  options: [
    { id: 'keep', label: 'garde', valid: r.keep, why: r.keep ? '' : `x = ${R(r.x)} n'est pas dans le domaine ${dom} : l'objet n'existe pas.`, ...(r.keep ? {} : { rule: 'g6_optim_outside_domain' }) },
    { id: 'drop', label: 'rejette (hors du domaine)', valid: !r.keep, why: `x = ${R(r.x)} est dans le domaine ${dom}.` },
  ],
});

function opParts(d, level) {
  const domSet = setText(d.constraint);
  const x = d.roots[0].x;
  const parts = [];
  if (level >= 2) {
    parts.push({ html: 'Domaine de x :', start: d.constraint, judge: { kind: 'solset', v: V }, lines: [level === 2 ? blanked(E(domSet, 'Contraintes : longueurs positives', 'domain', 'domain'), ['0']) : E(domSet, 'Contraintes : longueurs positives', 'domain', 'domain')] });
    const m = [E(d.model, 'La grandeur avec la seule variable x', 'model', 'model'), E(d.expanded, 'Développer', 'model', 'expand')];
    parts.push({ html: `${d.name}(x) en fonction de x :`, ask: `${d.name}(x) =`, start: d.name, judge: { kind: 'equiv', vars: [V, d.name], subst: { [d.name]: d.model }, domain: { x: [0.1, 1.5] }, target: 'expanded' }, lines: level === 2 ? [blanked(m[0], [m[0].math.match(/\((\d+)-2x\)/)?.[1] ?? 'x']), m[1]] : m });
  }
  parts.push({
    html: `Dérive ${d.name} et factorise.`, ask: `${d.name}′(x) =`, start: `d(${d.expanded})`, judge: derivJudge([0.1, 2]),
    lines: [E(d.d1, 'Dériver', 'derive', 'derive'), level === 1 ? blanked(E(d.fac, 'Factoriser', 'derive', 'factor'), [N(x.d === 1 ? x : x.n)]) : E(d.fac, 'Factoriser', 'derive', 'factor')],
  });
  const out = d.roots.filter((r) => !r.keep);
  parts.push({
    html: `Zéros de ${d.name}′ dans le domaine ${MT(domSet)} :`, start: `${d.fac}=0`, judge: { kind: 'solset', v: V, domain: domSet, inCase: true },
    pre: level === 1 ? (out.length ? [NOTE(`x = ${R(out[0].x)} est hors du domaine : on le rejette.`)] : []) : out.map((r) => keepDecision(r, domSet)),
    lines: [E(`x=${N(x)}`, 'La racine du domaine', 'roots', 'roots')],
  });
  const before = `${d.name}′ > 0 sur ]0 ; ${R(x)}[ et ${d.name}′ < 0 après`;
  parts.push({
    html: 'Maximum :', ask: `${d.name}(${R(x)}) =`, start: at(d.model, x), judge: VAL,
    pre: level === 1 ? [NOTE(`${before} : maximum en x = ${R(x)}.`)] : [{
      kind: 'decision', prompt: `${before}. En x = ${R(x)}, ${d.name} a…`,
      options: [{ id: 'max', label: 'un maximum', valid: true }, { id: 'min', label: 'un minimum', valid: false, why: `${d.name} croît puis décroît : c'est un maximum.` }, { id: 'none', label: 'on ne peut rien dire', valid: false, why: 'Le signe de la dérivée change de + à − : c\'est un maximum.' }],
    }],
    lines: [E(N(d.vmax), 'Valeur maximale', 'max', 'value')],
  });
  return parts;
}

function opItem(level, rng, opts = {}) {
  if (opts.exam === 'mcq') return opMcq(rng);
  const kind = level === 5 || opts.exam === 'open' ? rng.pick(['box', 'parabola']) : rng.pick(['box', 'box', 'parabola', 'wall']);
  const d = opData(rng, kind);
  const parts = opParts(d, level);
  const x = d.roots[0].x;
  return partsItem({
    skill: OP, level, parts, choices: OP_CHOICES, prompt: d.words,
    before: level === 1 ? [NOTE(`Le domaine est ${MT(setText(d.constraint))} et ${d.name}(x) = ${MT(d.model)} = ${MT(d.expanded)}.`)] : [],
    hints: H('Écris la grandeur avec la seule variable x, note pour quels x l\'objet existe, puis cherche les zéros de la dérivée <b>dans ce domaine</b>.', `${d.name}(x) = ${MT(d.model)}`, `x = ${R(x)}, et ${d.name}(${R(x)}) = ${R(d.vmax)}`),
    subgoals: OP_SUB, keys: KEYS, key: `${OP}:${level}:${d.kind}:${d.model}`, exam: examOf(opts, 4), expectedSec: 60 + 45 * parts.length,
  });
}

function opMcq(rng) {
  const d = opData(rng, rng.pick(['box', 'parabola']));
  const x = d.roots[0].x;
  const outR = d.roots.find((r) => !r.keep).x;
  const cand = [
    { html: `x = ${R(x)}`, correct: true },
    { html: `x = ${R(outR)}`, correct: false, rule: 'g6_optim_outside_domain' },
    { html: d.hi ? `x = ${R(d.hi)}` : `x = ${R(x)}√3`, correct: false },
    { html: `x = ${R(x.mul(2))}`, correct: false },
    { html: `x = ${R(x.add(1))}`, correct: false },
  ];
  const options = cand.filter((o, i) => cand.findIndex((y) => y.html === o.html) === i).slice(0, 4);
  return mcq({
    skill: OP, level: 4, prompt: `${d.words.replace(/, et que vaut-(il|elle) \?$/, ' ?')} (${d.name}(x) = ${MT(d.model)}, ${d.name}′(x) = ${MT(d.fac)}.)`, options,
    key: `${OP}:mcq:${d.model}`, solution: [{ html: `Domaine ${MT(setText(d.constraint))} : x = ${R(outR)} en sort. ${d.name}′ change de signe de + à − en ${R(x)} : maximum.`, note: '' }],
    exam: { format: 'mcq', points: 1 },
  }, rng);
}

export const GEN = {
  [SV]: (level, rng, profile, opts = {}) => svItem(level, rng, opts),
  [CX]: (level, rng, profile, opts = {}) => cxItem(level, rng, opts),
  [OP]: (level, rng, profile, opts = {}) => opItem(level, rng, opts),
};
