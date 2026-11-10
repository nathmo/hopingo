// Generators of module A1, part f (step U4): Inf, Sup, Min, Max of a set
// defined by a function (a1-sup-inf), and the proof that s = Sup A
// (a1-sup-proof). Catalogue: docs/universite/A1-analyse-1.md.
//
// a1-sup-inf: lines in parts. The set is rewritten in x (judge `solset`,
// domain ℝ∖{0} or ]0 ; +∞[), then each finite bound is a part « Inf A = »
// judged by `value` (form exact); whether it is a Min (or a Max) and
// whether A is bounded are decisions before it (notes at level 1). Level 5
// and the `mcq` variant: one true claim among four; `tf`: Vrai / Faux
// (the counter-examples are sets, which no checker reads).
// a1-sup-proof: blocks (frame with typed inputs at levels 1, 2, 4 and 5,
// order at level 3); x(ε) (or the threshold n(ε) of an indexed set) is
// judged by `delta` in mode 'sup'. The `open` variant is a problem in three
// parts (majorant 0,5 ; x(ε) 1 ; conclusion 0,5).

import { parse } from '../../cas/parse.js';
import { evalFloat } from '../../cas/numeric.js';
import { MT, linesItem, mcq, tfItem, blocksItem } from './kit.js';
import { problemItem } from './kit-problem.js';
import { q, N, modeOf, H, E, blanked, partsScript, uniq, vfMcq, asLevel5, frT } from './analyse1-f-kit.js';

const SI = 'a1-sup-inf';
const SP = 'a1-sup-proof';

const num = (t) => (t === null ? NaN : evalFloat(parse(String(t)), {}));
const same = (a, b) => Math.abs(num(a) - num(b)) < 1e-9;

// ======================================================================
// a1-sup-inf
// ======================================================================

const SI_SUB = [
  { id: 'mono', label: 'appliquer une fonction monotone', skill: 'g3-arc-def' },
  { id: 'invert', label: 'inverser une inégalité', skill: 'g1-sign-table' },
  { id: 'interval', label: 'écrire en intervalles', skill: 'g9-intervals' },
  { id: 'read', label: 'lire les bornes', skill: SI },
];
const SI_CHOICES = [
  { id: 'tan', label: 'Appliquer tan (croissante sur ]−π/2 ; π/2[)' },
  { id: 'exp', label: 'Appliquer exp (croissante)' },
  { id: 'invert', label: 'Inverser, ou multiplier (attention au signe)' },
  { id: 'drop', label: 'Enlever une inégalité toujours vraie' },
  { id: 'interval', label: 'Écrire en intervalles' },
  { id: 'read', label: 'Lire Inf ou Sup' },
];

// tan of the angles used, and k/tan written simply.
const TAN = { '-π/3': '-√3', '-π/4': '-1', '-π/6': '-1/√3', 0: '0', 'π/6': '1/√3', 'π/4': '1', 'π/3': '√3' };
function kOver(k, t) {
  const s = t.startsWith('-') ? '-' : '';
  const a = t.replace('-', '');
  if (a === '1') return `${s}${k}`;
  if (a === '√3') return k === 3 ? `${s}√3` : `${s}${k === 1 ? '' : k}√3/3`;
  return `${s}${k === 1 ? '' : k}√3`; // 1/√3
}
const POS = [['0', 'π/6'], ['0', 'π/4'], ['0', 'π/3'], ['π/6', 'π/4'], ['π/6', 'π/3'], ['π/4', 'π/3']];
const NEG = [['-π/3', '-π/6'], ['-π/3', '-π/4'], ['-π/4', '-π/6'], ['-π/3', '0'], ['-π/4', '0'], ['-π/6', '0']];

// The interval text of the bounds.
function intervalText(lo, loC, hi, hiC) {
  const L = lo === null ? ']-∞' : `${loC ? '[' : ']'}${lo}`;
  const R = hi === null ? '+∞[' : `${hi}${hiC ? ']' : '['}`;
  return `${L} ; ${R}`;
}

// Sets of the catalogue's templates: {kind, cond, domain, domText, lines,
// final, lo, loC, hi, hiC, u: {name, lo, hi} (the values of the inner
// function), choice2: decision of level 2, trap?}.
function siData(rng, kinds) {
  const kind = rng.pick(kinds);
  if (kind === 'arctg') {
    const k = rng.int(1, 4);
    const [c1, c2] = rng.pick(rng.chance(0.6) ? POS : NEG);
    const t1 = TAN[c1];
    const t2 = TAN[c2];
    const large1 = c1 !== '0' && rng.chance(0.3);
    const large2 = c2 !== '0' && rng.chance(0.3);
    const o1 = large1 ? '≤' : '<';
    const o2 = large2 ? '≤' : '<';
    const lo = t2 === '0' ? null : kOver(k, t2);
    const hi = t1 === '0' ? null : kOver(k, t1);
    const u = `${k}/x`;
    let inv;
    if (t1 === '0') inv = `x>0∧x${large2 ? '≥' : '>'}${lo}`;
    else if (t2 === '0') inv = `x<0∧x${o1}${hi}`;
    else inv = `${lo}${o2}x${o1}${hi}`;
    const final = intervalText(lo, large2, hi, large1);
    return {
      kind, k, cond: `${c1}${o1}arctan(${u})${o2}${c2}`, domain: 'ℝ∖{0}', domText: 'ℝ*',
      lines: [
        E(`tan(${c1})${o1}${u}${o2}tan(${c2})`, 'Appliquer tan, strictement croissante sur ]−π/2 ; π/2[', 'mono', 'tan'),
        E(`${t1}${o1}${u}${o2}${t2}`, 'Valeurs de tan', 'mono', 'tan'),
        E(inv, t1 === '0' || t2 === '0' ? 'Le signe de x, puis inverser' : 'Inverser : 1/u est décroissante sur chaque demi-droite', 'invert', 'invert'),
        E(final, 'Écrire en intervalles', 'interval', 'interval'),
      ],
      blanks: [1, [t1 === '0' ? t2 : t1]],
      final, lo, loC: large2, hi, hiC: large1,
      u: { name: `${k}/x`, lo: t1, hi: t2 },
      method: 'Arctg est strictement croissante : applique tan aux trois membres, ils sont tous dans ]−π/2 ; π/2[.',
      choice2: [
        { id: 'tan', label: 'Appliquer tan aux trois membres : tan est croissante sur ]−π/2 ; π/2[', valid: true },
        { id: 'arctg', label: 'Appliquer Arctg aux trois membres', valid: false, why: 'Il faut faire disparaître Arctg : on applique sa réciproque, tan.' },
      ],
    };
  }
  if (kind === 'trap') {
    // c₂ > π/2: Arctg(…) < c₂ is always true (corrigé 2021).
    const k = rng.int(1, 4);
    const c1 = rng.pick(['π/6', 'π/4', 'π/3']);
    const c2 = rng.pick(['2π/3', '3π/4', '5π/6']);
    const t1 = TAN[c1];
    const large1 = rng.chance(0.3);
    const o1 = large1 ? '≤' : '<';
    const hi = kOver(k, t1);
    const final = intervalText('0', false, hi, large1);
    return {
      kind, k, c2, cond: `${c1}${o1}arctan(${k}/x)<${c2}`, domain: 'ℝ∖{0}', domText: 'ℝ*', trap: true,
      lines: [
        E(`${c1}${o1}arctan(${k}/x)`, `Arctg prend ses valeurs dans ]−π/2 ; π/2[, et π/2 < ${c2} : la seconde inégalité est toujours vraie`, 'mono', 'drop'),
        E(`${t1}${o1}${k}/x`, 'Appliquer tan, croissante sur ]−π/2 ; π/2[', 'mono', 'tan'),
        E(`0<x${o1}${hi}`, 'k/x > 0 donne x > 0, puis inverser', 'invert', 'invert'),
        E(final, 'Écrire en intervalles', 'interval', 'interval'),
      ],
      blanks: [1, [t1]],
      final, lo: '0', loC: false, hi, hiC: large1,
      u: { name: `${k}/x`, lo: t1, hi: null },
      method: `tan n'est croissante que sur ]−π/2 ; π/2[ : ${c2} n'y est pas. Arctg(…) < π/2 < ${c2} est toujours vrai.`,
      choice2: [
        { id: 'drop', label: `Arctg(…) < ${c2} est toujours vrai : il reste ${c1} ${o1} Arctg(${k}/x)`, valid: true },
        { id: 'tanall', label: 'Appliquer tan aux trois membres', valid: false, rule: 'a1_tan_monotone_range', why: `tan n'est croissante que sur ]−π/2 ; π/2[, et ${c2} n'y est pas.` },
      ],
    };
  }
  if (kind === 'loginv') {
    const m = rng.int(1, 4);
    const neg = rng.chance(0.6);
    const r = m === 1 ? '1' : `1/${m}`;
    const e = neg ? `e^(-${r})` : `e^(${r})`;
    const eShow = e.replace('e^(1)', 'e').replace('e^(-1)', 'e^(-1)');
    if (neg) {
      return {
        kind, m, cond: `1/ln(x)<-${m}`, domain: ']0 ; +∞[', domText: ']0 ; +∞[',
        lines: [
          E(`-${r}<ln(x)<0`, `1/ln x < 0 force ln x < 0 ; multiplier par ln x < 0 change le sens : 1 > −${m}·ln x`, 'invert', 'invert'),
          E(`${eShow}<x<1`, 'Appliquer exp, croissante', 'mono', 'exp'),
          E(`]${eShow} ; 1[`, 'Écrire en intervalles', 'interval', 'interval'),
        ],
        blanks: [0, [`-${r}`]],
        final: `]${eShow} ; 1[`, lo: eShow, loC: false, hi: '1', hiC: false,
        u: { name: 'ln x', lo: `-${r}`, hi: '0' },
        flipped: { lo: '0', hi: eShow },
        method: `1/ln x < 0 demande ln x < 0. En multipliant par ln x < 0, l'inégalité change de sens.`,
        choice2: [
          { id: 'flip', label: 'Multiplier par ln x, qui est négatif : l\'inégalité change de sens', valid: true },
          { id: 'keep', label: 'Multiplier par ln x sans changer le sens', valid: false, rule: 'g1_ineq_not_flipped', why: 'ln x < 0 ici : multiplier par un nombre négatif change le sens de l\'inégalité.' },
        ],
      };
    }
    return {
      kind, m, cond: `1/ln(x)>${m}`, domain: ']0 ; +∞[', domText: ']0 ; +∞[',
      lines: [
        E(`0<ln(x)<${r}`, `1/ln x > 0 force ln x > 0 ; multiplier par ln x > 0 garde le sens : 1 > ${m === 1 ? '' : m}ln x`, 'invert', 'invert'),
        E(`1<x<${eShow}`, 'Appliquer exp, croissante', 'mono', 'exp'),
        E(`]1 ; ${eShow}[`, 'Écrire en intervalles', 'interval', 'interval'),
      ],
      blanks: [0, [r]],
      final: `]1 ; ${eShow}[`, lo: '1', loC: false, hi: eShow, hiC: false,
      u: { name: 'ln x', lo: '0', hi: r },
      method: '1/ln x > 0 demande ln x > 0 : on peut multiplier par ln x sans changer le sens.',
      choice2: [
        { id: 'keep', label: 'Multiplier par ln x, qui est positif : le sens ne change pas', valid: true },
        { id: 'flip', label: 'Multiplier par ln x en changeant le sens', valid: false, why: 'ln x > 0 ici : multiplier par un nombre positif garde le sens.' },
      ],
    };
  }
  // ln: a < ln x ≤ b, exp is increasing.
  const a = rng.int(-2, 2);
  const b = rng.int(a + 1, 3);
  const large1 = rng.chance(0.4);
  const large2 = rng.chance(0.4);
  const o1 = large1 ? '≤' : '<';
  const o2 = large2 ? '≤' : '<';
  const ex = (c) => (c === 0 ? '1' : c === 1 ? 'e' : c < 0 ? `e^(${c})` : `e^${c}`);
  const final = intervalText(ex(a), large1, ex(b), large2);
  return {
    kind: 'ln', cond: `${a}${o1}ln(x)${o2}${b}`, domain: ']0 ; +∞[', domText: ']0 ; +∞[',
    lines: [
      E(`${ex(a)}${o1}x${o2}${ex(b)}`, 'Appliquer exp, strictement croissante', 'mono', 'exp'),
      E(final, 'Écrire en intervalles', 'interval', 'interval'),
    ],
    blanks: [0, [ex(b)]],
    final, lo: ex(a), loC: large1, hi: ex(b), hiC: large2,
    u: { name: 'ln x', lo: String(a), hi: String(b) },
    method: 'exp est strictement croissante : applique-la aux trois membres.',
    choice2: [
      { id: 'exp', label: 'Appliquer exp aux trois membres (croissante)', valid: true },
      { id: 'ln', label: 'Appliquer ln aux trois membres', valid: false, why: 'Il faut faire disparaître ln : on applique sa réciproque, exp.' },
    ],
  };
}

const setHtml = (d) => `A = {x ∈ ${d.domText} : ${MT(d.cond)}}`;

// The decisions on a bound: in A (Min, Max) or not; unbounded side.
function boundDecision(side, v, closed) {
  const word = side === 'lo' ? 'minimum' : 'maximum';
  const W = side === 'lo' ? 'Min A = Inf A' : 'Max A = Sup A';
  const name = side === 'lo' ? 'Inf A' : 'Sup A';
  return {
    kind: 'decision', prompt: `${name} = ${frT(v)} : est-il dans A ?`, options: closed ? [
      { id: 'in', label: `Oui : le crochet est fermé, ${W}`, valid: true },
      { id: 'out', label: `Non : A n'a pas de ${word}`, valid: false, why: `Le crochet est fermé : ${frT(v)} ∈ A, c'est le ${side === 'lo' ? 'plus petit' : 'plus grand'} élément.` },
    ] : [
      { id: 'out', label: `Non : ${frT(v)} ∉ A, A n'a pas de ${word}`, valid: true },
      { id: 'in', label: `Oui : ${W}`, valid: false, rule: 'a1_sup_in_set', why: `Le crochet est ouvert : ${frT(v)} ∉ A. ${name} n'est pas forcément dans A.` },
    ],
  };
}
function unboundedDecision(side) {
  const up = side === 'hi';
  return {
    kind: 'decision', prompt: `A est-il ${up ? 'majoré' : 'minoré'} ?`, options: [
      { id: 'no', label: `Non : ${up ? 'Sup A = +∞' : 'Inf A = −∞'}, et A n'a pas de ${up ? 'maximum' : 'minimum'}`, valid: true },
      { id: 'yes', label: `Oui, par ${up ? 'la borne de droite des valeurs' : 'la borne de gauche des valeurs'}`, valid: false, rule: 'a1_supinf_on_values', why: `A contient des x aussi ${up ? 'grands' : 'petits'} qu'on veut : l'intervalle va jusqu'à ${up ? '+∞' : '−∞'}.` },
    ],
  };
}

function siLines(level, rng, opts = {}) {
  const kinds = level >= 3 ? ['arctg', 'arctg', 'trap', 'loginv', 'ln'] : ['arctg', 'arctg', 'loginv', 'ln'];
  const d = siData(rng, kinds);
  const judge = { kind: 'solset', v: 'x', domain: d.domain };
  const first = { start: d.cond, judge, lines: [...d.lines] };
  if (level === 1) {
    const [i, texts] = d.blanks;
    first.lines[i] = blanked(first.lines[i], texts);
  }
  if (level === 2) first.pre = [{ kind: 'decision', prompt: 'Comment commencer ?', options: d.choice2 }];
  const parts = [first];
  const ends = [['lo', d.lo, d.loC], ['hi', d.hi, d.hiC]].filter(([, v]) => v !== null);
  const infinite = d.lo === null ? 'lo' : d.hi === null ? 'hi' : null;
  ends.forEach(([side, v, closed], i) => {
    const name = side === 'lo' ? 'Inf A' : 'Sup A';
    const pre = [];
    if (level >= 2) {
      if (i === 0 && infinite) pre.push(unboundedDecision(infinite));
      pre.push(boundDecision(side, v, closed));
    } else {
      const note = (html) => pre.push({ kind: 'note', html });
      if (i === 0 && infinite) note(infinite === 'hi' ? 'A n\'est pas majoré : Sup A = +∞, pas de Max.' : 'A n\'est pas minoré : Inf A = −∞, pas de Min.');
      note(closed ? `${frT(v)} ∈ A : ${side === 'lo' ? 'Min A = Inf A' : 'Max A = Sup A'}.` : `${frT(v)} ∉ A : pas de ${side === 'lo' ? 'Min' : 'Max'}.`);
    }
    parts.push({
      html: i === 0 ? `A = ${MT(d.final)}. Lis ses bornes. ${name} :` : `${name} :`, ask: `${name} =`,
      start: side === 'lo' ? 'I' : 'S', judge: { kind: 'value', form: 'closed', expect: v }, pre,
      lines: [E(v, closed ? `${frT(v)} ∈ A` : `${frT(v)} ∉ A`, 'read', 'read')],
    });
  });
  const choices = d.trap ? SI_CHOICES.map((c) => (c.id === 'tan' ? { ...c, rule: 'a1_tan_monotone_range', why: `${d.c2} n'est pas dans ]−π/2 ; π/2[ : tan n'y est pas croissante.` } : c)) : SI_CHOICES;
  const { start, judge: j0, script } = partsScript(parts, level, choices);
  const boundsText = [d.lo === null ? 'Inf A = −∞' : `Inf A = ${frT(d.lo)}`, d.hi === null ? 'Sup A = +∞' : `Sup A = ${frT(d.hi)}`].join(' ; ');
  return linesItem({
    skill: SI, level, mode: modeOf(level), start, judge: j0, script,
    prompt: `${setHtml(d)}. Écris A en intervalles, puis donne Inf A et Sup A, et dis s'ils sont un Min ou un Max.${level === 1 ? ` ${d.method}` : ''}`,
    hints: H(d.method, `Première ligne : ${MT(d.lines[0].math)}`, `A = ${MT(d.final)} : ${boundsText}`),
    subgoals: SI_SUB, keys: ['calc', 'calcfn', 'set', 'relation'], tapActions: level === 3 ? 'steps' : null,
    noHints: level === 5, key: `${SI}:${level}:${d.cond}`, exam: false,
  });
}

// ---------- multiple choice: one true claim ----------

// A claim about A = (lo, hi) with closed ends loC, hiC: {html, true?}.
function claimTruth(c, A) {
  const lo = A.lo === null ? -Infinity : num(A.lo);
  const hi = A.hi === null ? Infinity : num(A.hi);
  const eq = (x, t) => Number.isFinite(x) && t !== null && Math.abs(x - num(t)) < 1e-9;
  switch (c.t) {
    case 'infNoMin': return eq(lo, c.v) && !A.loC;
    case 'supNoMax': return eq(hi, c.v) && !A.hiC;
    case 'min': return eq(lo, c.v) && A.loC;
    case 'max': return eq(hi, c.v) && A.hiC;
    case 'inf': return eq(lo, c.v);
    case 'sup': return eq(hi, c.v);
    case 'noUpper': return hi === Infinity;
    case 'noLower': return lo === -Infinity;
    case 'bounded': return Number.isFinite(lo) && Number.isFinite(hi);
    case 'empty': return false;
    default: return false;
  }
}
const CLAIM = {
  infNoMin: (v) => `Inf A = ${MT(v)}, et A n'a pas de minimum`,
  supNoMax: (v) => `Sup A = ${MT(v)}, et A n'a pas de maximum`,
  min: (v) => `Min A = ${MT(v)}`,
  max: (v) => `Max A = ${MT(v)}`,
  inf: (v) => `Inf A = ${MT(v)}`,
  sup: (v) => `Sup A = ${MT(v)}`,
  noUpper: () => 'A n\'est pas majoré',
  noLower: () => 'A n\'est pas minoré',
  bounded: () => 'A est borné',
  empty: () => 'A est vide',
};
const claim = (t, v, rule = null) => ({ t, v, rule });

function claimsMcq(rng, { A, prompt, wrong, key, why, level, opts }) {
  const trues = [];
  if (A.lo !== null) trues.push(A.loC ? claim('min', A.lo) : claim('infNoMin', A.lo));
  if (A.hi !== null) trues.push(A.hiC ? claim('max', A.hi) : claim('supNoMax', A.hi));
  if (A.hi === null) trues.push(claim('noUpper'));
  if (A.lo === null) trues.push(claim('noLower'));
  const right = rng.pick(trues);
  const pool = [...wrong];
  // Generic wrong claims, after the traps.
  if (A.lo !== null && !A.loC) pool.push(claim('min', A.lo, 'a1_sup_in_set'));
  if (A.hi !== null && !A.hiC) pool.push(claim('max', A.hi, 'a1_sup_in_set'));
  if (A.lo !== null && A.loC) pool.push(claim('infNoMin', A.lo));
  if (A.hi !== null && A.hiC) pool.push(claim('supNoMax', A.hi));
  pool.push(claim(A.hi === null || A.lo === null ? 'bounded' : 'noUpper'));
  const options = [{ html: CLAIM[right.t](right.v), correct: true }];
  for (const c of pool) {
    if (options.length >= 4) break;
    if (c.v !== undefined && c.v !== null && !Number.isFinite(num(c.v))) continue;
    if (claimTruth(c, A)) continue;
    const html = CLAIM[c.t](c.v);
    if (options.some((o) => o.html === html)) continue;
    options.push({ html, correct: false, rule: c.rule });
  }
  return mcq({
    skill: SI, level, prompt, options: uniq(options), key, expectedSec: 240, exam: opts.exam ? { format: 'mcq', points: 1 } : false,
    solution: [{ html: why, note: '' }],
  }, rng);
}

function siMcq(rng, level, opts = {}) {
  const kind = rng.pick(['data', 'data', 'data', 'cos', 'image', 'index']);
  if (kind === 'data') {
    const d = siData(rng, ['arctg', 'trap', 'loginv', 'ln']);
    const wrong = [];
    if (d.trap) wrong.push(claim('empty', null, 'a1_tan_monotone_range'));
    if (d.flipped) wrong.push(claim('sup', d.flipped.hi, 'g1_ineq_not_flipped'));
    if (d.u.hi !== null && d.u.hi !== '0') wrong.push(claim('sup', d.u.hi, 'a1_supinf_on_values'));
    if (d.u.lo !== null && d.u.lo !== '0') wrong.push(claim('inf', d.u.lo, 'a1_supinf_on_values'));
    return claimsMcq(rng, {
      A: d, wrong, level, opts, key: `${SI}:mcq:${d.cond}`,
      prompt: `Soit ${setHtml(d)}. Quelle affirmation est vraie ?`,
      why: `${d.method} A = ${MT(d.final)}.`,
    });
  }
  if (kind === 'cos') {
    // {x > 0 : cos(1/x) > 0}: an infinite union; Inf A = 0, A not bounded above.
    const A = { lo: '0', loC: false, hi: null, hiC: false };
    return claimsMcq(rng, {
      A, level, opts, key: `${SI}:mcq:cos`,
      wrong: [claim('sup', 'π/2', 'a1_supinf_on_values'), claim('inf', '2/π'), claim('min', '0', 'a1_sup_in_set')],
      prompt: `Soit A = {x > 0 : ${MT('cos(1/x)>0')}}. Quelle affirmation est vraie ?`,
      why: 'Avec u = 1/x : cos u > 0 pour u ∈ ]0 ; π/2[ (x > 2/π, donc A n\'est pas majoré) et pour u ∈ ]2kπ − π/2 ; 2kπ + π/2[ (des x aussi proches de 0 qu\'on veut). Inf A = 0, et 0 ∉ A. Les bornes portent sur x, pas sur u.',
    });
  }
  if (kind === 'image') {
    const k = rng.int(1, 3);
    const which = rng.chance(0.5);
    const A = which ? { lo: '0', loC: false, hi: '1', hiC: false } : { lo: '0', loC: false, hi: '1', hiC: true };
    const f = which ? `e^(-${k === 1 ? '' : k}x)` : `1/(1+${k === 1 ? '' : k}x^2)`;
    const dom = which ? 'x > 0' : 'x ≥ 0';
    return claimsMcq(rng, {
      A, level, opts, key: `${SI}:mcq:image:${f}`,
      wrong: [claim('noUpper', null, 'a1_supinf_on_values'), claim('min', '0', 'a1_sup_in_set')],
      prompt: `Soit A = {${MT(f)} : ${dom}}, l'ensemble des valeurs. Quelle affirmation est vraie ?`,
      why: which ? `x ↦ ${MT(f)} est décroissante de 1 (en 0, exclu) vers 0 (en +∞, jamais atteint) : A = ]0 ; 1[. Ici, A est un ensemble de valeurs : ses bornes sont des valeurs de f.`
        : `x ↦ ${MT(f)} vaut 1 en 0 et décroît vers 0 sans l'atteindre : A = ]0 ; 1], Max A = 1. Ici, A est un ensemble de valeurs.`,
    });
  }
  // {b − c/n : n ≥ 1}: Min b − c, Sup b.
  const b = rng.int(-2, 4);
  const c = rng.int(1, 3);
  const A = { lo: String(b - c), loC: true, hi: String(b), hiC: false };
  return claimsMcq(rng, {
    A, level, opts, key: `${SI}:mcq:index:${b}:${c}`,
    wrong: [claim('max', String(b), 'a1_sup_in_set'), claim('noLower')],
    prompt: `Soit A = {${MT(`${b}-${c}/n`)} : n ∈ ℕ*}. Quelle affirmation est vraie ?`,
    why: `Les termes croissent avec n : le plus petit est ${frT(b - c)} (n = 1), et ils s'approchent de ${frT(b)} sans l'atteindre. Min A = ${frT(b - c)}, Sup A = ${frT(b)}, pas de Max.`,
  });
}

const SI_TF = [
  { s: 'Si Inf A ∈ A et Sup A ∈ A, alors A est un intervalle fermé.', truth: false, why: 'Faux : A = {0 ; 1} a Inf A = 0 ∈ A et Sup A = 1 ∈ A, mais ce n\'est pas un intervalle.' },
  { s: 'Si A ⊂ ℝ est majoré, alors B = {x : −x ∈ A} est majoré.', truth: false, rule: 'a1_supinf_on_values', why: 'Faux : A = ]−∞ ; 0] est majoré par 0, mais B = [0 ; +∞[ ne l\'est pas. Le symétrique d\'un majorant est un minorant.' },
  { s: 'Si A et B sont bornés et A ∩ B ≠ ∅, alors Inf A ≤ Inf(A ∩ B).', truth: true, why: 'Vrai : A ∩ B ⊂ A, et Inf A minore A, donc minore A ∩ B : il est plus petit que le plus grand minorant Inf(A ∩ B).' },
  { s: 'Si A est borné et non vide et B est l\'ensemble de ses majorants, alors Inf B ∈ B.', truth: true, why: 'Vrai : Inf B = Sup A, qui est un majorant de A.' },
  { s: 'Si Sup A existe, alors Sup A ∈ A.', truth: false, rule: 'a1_sup_in_set', why: 'Faux : Sup [0 ; 3[ = 3 ∉ [0 ; 3[. Le Sup est le plus petit majorant, pas forcément un élément.' },
  { s: 'Pour A = {x > 0 : Log(x) < 2}, Sup A = 2.', truth: false, rule: 'a1_supinf_on_values', why: 'Faux : A = ]0 ; e²[, donc Sup A = e². 2 est la borne des valeurs de Log(x), pas des x.' },
];
function siTf(rng) {
  const t = rng.pick(SI_TF);
  if (!t.truth) return vfMcq(SI, t.s, false, rng, { key: t.s, why: t.why, ruleIfTrue: t.rule || null });
  return tfItem({ skill: SI, level: 4, statement: t.s, truth: true, key: t.s, explanation: t.why, exam: { format: 'tf', points: 1 } });
}

function supInf(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return siMcq(rng, 4, opts);
  if (opts.exam === 'tf') return siTf(rng);
  if (level === 5 && rng.chance(0.5)) return asLevel5(siMcq(rng, 5, opts), opts);
  return siLines(level, rng, opts);
}

// ======================================================================
// a1-sup-proof
// ======================================================================

const SP_SUB = [
  { id: 'x', label: 'construire x(ε)', skill: SP },
  { id: 'quant', label: 'ordre des quantificateurs', skill: 'g9-quant-write' },
];
const KEYS_EPS = ['calc', 'greek', 'letters'];

// A = [a ; b[ (Sup b) or ]a ; b] (Inf a); indexed: {b − c/n} or {a + c/n}.
function spData(rng, { indexed = false } = {}) {
  const sup = rng.chance(0.6);
  if (indexed) {
    const c = rng.int(1, 3);
    const s = rng.int(-3, 5);
    const term = sup ? `${s}-${c}/n` : `${s}+${c}/n`;
    return {
      sup, indexed: true, s: String(s), c, term,
      setHtml: `A = {${MT(term)} : n ∈ ℕ*}`,
      cfg: { mode: 'sup', index: { term, v: 'n', from: 1 }, s: String(s), ...(sup ? {} : { inf: true }) },
      answer: `${c}/ε+1`, wrongs: [`${c}/ε`, `${c}ε`],
    };
  }
  const a = rng.int(-5, 3);
  const b = rng.int(a + 2, 5);
  const open = rng.chance(0.5);
  const set = sup ? `${open ? ']' : '['}${a} ; ${b}[` : `]${a} ; ${b}${open ? '[' : ']'}`;
  const m = N(q(a + b, 2));
  const s = sup ? String(b) : String(a);
  const x = sup ? `max(${b}-ε/2 ; ${m})` : `min(${a}+ε/2 ; ${m})`;
  return {
    sup, indexed: false, a, b, s, m, set,
    setHtml: `A = ${frT(set)}`,
    cfg: { mode: 'sup', set, s, ...(sup ? {} : { inf: true }) },
    answer: x,
    // x = s ∓ ε (not > s − ε), x = s ∓ ε/2 (out of A for big ε).
    wrongs: sup ? [`${b}-ε`, `${b}-ε/2`] : [`${a}+ε`, `${a}+ε/2`],
  };
}

function spBlocks(d, { inputs = [], decoys = 0, rng, xShown = null }) {
  const S = frT(d.s);
  const upper = d.sup;
  const W = upper ? 'majorant' : 'minorant';
  const xText = MT(xShown ?? d.answer, { vars: ['ε'] });
  const blocks = d.indexed ? [
    { id: 'maj', html: `Pour tout n ≥ 1, ${d.c}/n > 0, donc ${MT(d.term)} ${upper ? '<' : '>'} ${inputs.includes('maj') ? '…' : S} : ${inputs.includes('maj') ? '…' : S} est un ${W} de A.`, needs: [] },
    { id: 'eps', html: 'Soit ε > 0.', needs: [] },
    { id: 'x', html: `Prenons un entier n ≥ ${inputs.includes('x') ? '…' : MT(d.answer, { vars: ['ε'] })}.`, needs: ['eps'] },
    { id: 'chk', html: `Alors ${d.c}/n < ε, donc x = ${MT(d.term)} ∈ A et x ${upper ? '>' : '<'} ${S} ${upper ? '−' : '+'} ε.`, needs: ['x'] },
    { id: 'concl', html: `Aucun nombre ${upper ? 'plus petit' : 'plus grand'} que ${S} n'est un ${W} : ${S} = ${upper ? 'Sup' : 'Inf'} A.`, needs: ['maj', 'chk'] },
  ] : [
    { id: 'maj', html: `Pour tout x ∈ A, x ${upper ? '<' : '>'}${(upper ? d.set.endsWith(']') : d.set.startsWith('[')) ? ' ou =' : ''} ${inputs.includes('maj') ? '…' : S} : ${inputs.includes('maj') ? '…' : S} est un ${W} de A.`, needs: [] },
    { id: 'eps', html: 'Soit ε > 0.', needs: [] },
    { id: 'x', html: `Posons x = ${inputs.includes('x') ? '…' : xText}.`, needs: ['eps'] },
    { id: 'chk', html: `Alors x ∈ A et x ${upper ? '>' : '<'} ${S} ${upper ? '−' : '+'} ε.`, needs: ['x'] },
    { id: 'concl', html: `Aucun nombre ${upper ? 'plus petit' : 'plus grand'} que ${S} n'est un ${W} : ${S} = ${upper ? 'Sup' : 'Inf'} A.`, needs: ['maj', 'chk'] },
  ];
  for (const b of blocks) b.html = b.html.replace('….', '…');
  if (inputs.includes('maj')) blocks[0].input = { kind: 'expr', vars: [], expect: d.s, ask: `${upper ? 'Majorant' : 'Minorant'} :`, answer: d.s };
  if (inputs.includes('x')) blocks[2].input = { kind: 'delta', cfg: d.cfg, answer: d.answer, ask: d.indexed ? 'Seuil : n ≥' : 'x =', keys: KEYS_EPS };
  blocks[2].earlyWhy = 'Pas encore : x se construit à partir de ε, qu\'il faut d\'abord fixer.';
  blocks[4].earlyWhy = `Pas encore : il faut les deux points, ${W} et approximation.`;
  const DECOYS = [
    { html: `${S} ∈ A, donc ${S} = ${upper ? 'Sup' : 'Inf'} A.`, distractor: 'a1_sup_in_set', why: `Le ${upper ? 'Sup' : 'Inf'} n'est pas forcément dans A${d.indexed || !(upper ? d.set.endsWith(']') : d.set.startsWith('[')) ? ` (ici ${S} ∉ A)` : ''}, et être dans A ne suffit pas : il faut que ce soit un ${W}, le ${upper ? 'plus petit' : 'plus grand'}.` },
    { html: `Prenons ε = 0,1 : x = ${S} ${upper ? '−' : '+'} 0,05 convient.`, distractor: 'g9_proof_by_example', why: 'Un exemple de ε ne prouve rien : il faut un x pour chaque ε > 0.' },
    { html: `Il existe x ∈ A tel que, pour tout ε > 0, x ${upper ? '>' : '<'} ${S} ${upper ? '−' : '+'} ε.`, distractor: 'g9_quant_order', why: `Un tel x serait ${upper ? '≥' : '≤'} ${S} : l'ordre est « pour tout ε > 0, il existe x », et x dépend de ε.` },
  ];
  rng.shuffle(DECOYS).slice(0, decoys).forEach((x, i) => blocks.push({ id: `d${i}`, needs: [], ...x }));
  return blocks;
}

const spSolution = (blocks, order) => order.map((id) => {
  const b = blocks.find((x) => x.id === id);
  return { html: b.input ? b.html.replace(/…/g, b.input.kind === 'delta' ? MT(b.input.answer, { vars: ['ε'] }) : frT(b.input.answer)) : b.html, note: '' };
});

function spItem(level, rng, opts = {}) {
  const d = spData(rng, { indexed: level === 5 });
  const W = d.sup ? 'Sup' : 'Inf';
  const order = ['maj', 'eps', 'x', 'chk', 'concl'];
  let blocks;
  let placed = [];
  let todo = order;
  let decision = null;
  if (level === 1) {
    blocks = spBlocks(d, { rng });
    placed = ['maj', 'eps'];
    todo = ['x', 'chk', 'concl'];
    const [w1, w2] = d.wrongs;
    decision = {
      prompt: `Soit ε > 0. Quel x convient (x ∈ A et x ${d.sup ? '>' : '<'} ${frT(d.s)} ${d.sup ? '−' : '+'} ε) ?`,
      options: rng.shuffle([
        { id: 'ok', label: `x = ${frT(d.answer)}`, valid: true },
        { id: 'w1', label: `x = ${frT(w1)}`, valid: false, why: `Alors x = ${frT(d.s)} ${d.sup ? '−' : '+'} ε exactement : l'inégalité stricte n'est pas vérifiée.` },
        { id: 'w2', label: `x = ${frT(w2)}`, valid: false, why: `Pour ε grand (ε = 20), ce x sort de A. Le ${d.sup ? 'max' : 'min'} avec le milieu le garde dans A.` },
      ]),
    };
  } else if (level === 2) {
    blocks = spBlocks(d, { rng, inputs: ['maj', 'x'] });
  } else if (level === 3) {
    blocks = spBlocks(d, { rng, decoys: 2 });
  } else {
    blocks = spBlocks(d, { rng, inputs: ['x'], decoys: 3 });
  }
  const hasInput = blocks.some((b) => b.input);
  return blocksItem({
    skill: SP, level, mode: hasInput || level <= 2 ? 'frame' : 'order',
    prompt: `${d.setHtml}. Montre que ${W} A = ${frT(d.s)}. Touche les blocs dans l'ordre${hasInput ? ' et complète les calculs' : ''}.${placed.length ? ' Le début est placé.' : ''}`,
    blocks: rng.shuffle(blocks), goal: 'concl', order: todo, placed, decision,
    hints: H(`Deux choses à montrer : ${frT(d.s)} ${d.sup ? 'majore' : 'minore'} A, et on peut s'approcher de ${frT(d.s)} autant qu'on veut.`,
      d.indexed ? `Soit ε > 0. Pour n ≥ ▢, ${d.c}/n < ε.` : `Soit ε > 0. Posons x = ▢ ; alors x ∈ A et x ${d.sup ? '>' : '<'} ${frT(d.s)} ${d.sup ? '−' : '+'} ε.`,
      d.indexed ? `n ≥ ${MT(d.answer, { vars: ['ε'] })}` : `x = ${MT(d.answer, { vars: ['ε'] })}`),
    noHints: level === 5 || !!opts.exam,
    subgoals: SP_SUB,
    solution: spSolution(blocks, [...placed, ...todo]),
    key: `${d.indexed ? d.term : d.set}:${d.sup}:${level}`, exam: false,
  });
}

// The open question (2 points): majorant 0,5 ; x(ε) 1 ; conclusion 0,5.
function spOpen(rng, opts) {
  const d = spData(rng, { indexed: rng.chance(0.3) });
  const W = d.sup ? 'Sup' : 'Inf';
  const w = d.sup ? 'majorant' : 'minorant';
  const S = frT(d.s);
  const p1 = mcq({
    skill: SP, level: 4, prompt: `Première étape : pourquoi ${S} est-il un ${w} de A ?`,
    options: [
      { html: d.indexed ? `Pour tout n ≥ 1, ${d.c}/n > 0, donc ${MT(d.term)} ${d.sup ? '<' : '>'} ${S}` : `Pour tout x ∈ A, x ${d.sup ? '≤' : '≥'} ${S}`, correct: true },
      { html: `Parce que ${S} ∈ A`, correct: false, rule: 'a1_sup_in_set' },
      { html: d.indexed ? `Pour n = 1, le terme vaut ${frT(d.sup ? Number(d.s) - d.c : Number(d.s) + d.c)}, ${d.sup ? 'plus petit' : 'plus grand'} que ${S}` : `Il existe x ∈ A avec x ${d.sup ? '<' : '>'} ${S}`, correct: false, rule: 'g9_proof_by_example' },
      { html: `Parce que ${S} est ${d.sup ? 'le plus grand' : 'le plus petit'} élément de A`, correct: false, rule: 'a1_sup_in_set' },
    ],
    key: `${SP}:open1:${d.s}`, solution: [{ html: `Un ${w} est plus ${d.sup ? 'grand' : 'petit'} que <b>tous</b> les éléments de A.`, note: '' }],
  }, rng);
  const all = spBlocks(d, { rng, inputs: ['x'], decoys: 0 });
  const blocks = [...all.filter((b) => ['eps', 'x', 'chk'].includes(b.id)), { id: 'd0', needs: [], html: `Prenons ε = 0,1 : x = ${S} ${d.sup ? '−' : '+'} 0,05 convient.`, distractor: 'g9_proof_by_example', why: 'Un exemple de ε ne prouve rien : il faut un x pour chaque ε > 0.' }];
  const p2 = blocksItem({
    skill: SP, level: 4, mode: 'frame', prompt: `Deuxième étape : pour tout ε > 0, trouve un élément de A ${d.sup ? 'plus grand' : 'plus petit'} que ${S} ${d.sup ? '−' : '+'} ε. Touche les blocs dans l'ordre et complète.`,
    blocks: rng.shuffle(blocks), goal: 'chk', order: ['eps', 'x', 'chk'], noHints: true, subgoals: SP_SUB,
    solution: spSolution(all, ['eps', 'x', 'chk']), key: `${SP}:open2:${d.indexed ? d.term : d.set}`,
  });
  const p3 = mcq({
    skill: SP, level: 4, prompt: 'Conclusion :',
    options: [
      { html: `${S} = ${W} A, et A n'a pas de ${d.sup ? 'maximum' : 'minimum'}`, correct: true },
      { html: `${S} = ${d.sup ? 'Max' : 'Min'} A`, correct: false, rule: 'a1_sup_in_set' },
      { html: `${W} A = ${S} ${d.sup ? '−' : '+'} ε`, correct: false },
      { html: 'On ne peut rien conclure sans fixer ε', correct: false, rule: 'g9_quant_order' },
    ],
    key: `${SP}:open3:${d.s}`, solution: [{ html: `${S} est un ${w}, et aucun nombre ${d.sup ? 'plus petit' : 'plus grand'} n'en est un : c'est le ${W}. ${S} ∉ A : pas de ${d.sup ? 'Max' : 'Min'}.`, note: '' }],
  }, rng);
  return problemItem({
    skill: SP, level: 4, prompt: `${d.setHtml}. Montre que ${W} A = ${S}.`,
    parts: [{ item: p1, points: 0.5, title: `${S} est un ${w}` }, { item: p2, points: 1, title: 'Construire x(ε)' }, { item: p3, points: 0.5, title: 'Conclure' }],
    key: `open:${d.indexed ? d.term : d.set}:${d.sup}`, exam: { format: 'open', points: 2 }, expectedSec: 420,
  });
}

function spTf(rng) {
  const kind = rng.pick(['cat', 'cat', 'in', 'one', 'eps2']);
  if (kind === 'cat') {
    return tfItem({ skill: SP, level: 4, statement: 'Soit A ⊂ ℝ non vide et majoré, et c = Sup A. Pour tout ε > 0, il existe x ∈ A tel que x + ε ≥ c.', truth: true, key: 'cat', exam: { format: 'tf', points: 1 },
      explanation: 'Vrai : c − ε n\'est pas un majorant, donc un x ∈ A dépasse c − ε, et x + ε > c.' });
  }
  if (kind === 'eps2') {
    return tfItem({ skill: SP, level: 4, statement: 'Pour montrer que s = Sup A, on peut prendre x = s − ε/2 quand A = ]−∞ ; s[.', truth: true, key: 'eps2', exam: { format: 'tf', points: 1 },
      explanation: 'Vrai : s − ε/2 < s, donc il est dans A pour tout ε > 0, et s − ε/2 > s − ε. Le max(… ; …) ne sert que quand A est borné à gauche.' });
  }
  if (kind === 'in') {
    return vfMcq(SP, 'Si s = Sup A, alors s ∈ A.', false, rng, { key: 'in', ruleIfTrue: 'a1_sup_in_set', why: 'Faux : Sup [0 ; 3[ = 3 ∉ [0 ; 3[.' });
  }
  return vfMcq(SP, 'Si s majore A et qu\'il existe un ε > 0 et un x ∈ A avec x > s − ε, alors s = Sup A.', false, rng, {
    key: 'one', ruleIfTrue: 'g9_proof_by_example', why: 'Faux : il faut un tel x pour <b>tout</b> ε > 0. A = [0 ; 1] et s = 2 : avec ε = 5, x = 0 convient, mais Sup A = 1.',
  });
}

function supProof(level, rng, profile, opts = {}) {
  if (opts.exam === 'open') return spOpen(rng, opts);
  if (opts.exam === 'tf') return spTf(rng);
  return spItem(level, rng, opts);
}

export const GEN = { [SI]: supInf, [SP]: supProof };
