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

import { t } from '../../i18n.js';
import { parse } from '../../cas/parse.js';
import { toReadable } from '../../cas/print.js';
import { evalFloat } from '../../cas/numeric.js';
import { MT, linesItem, mcq, tfItem, blocksItem } from './kit.js';
import { problemItem } from './kit-problem.js';
import { q, N, modeOf, H, E, blanked, partsScript, uniq, vfMcq, asLevel5, frT } from './analyse1-f-kit.js';

const SI = 'a1-sup-inf';
const SP = 'a1-sup-proof';

// A value as readable text (decisions and notes are text): e², e^(−1/2), 2√3.
const RD = (t) => toReadable(parse(String(t)));
const num = (t) => (t === null ? NaN : evalFloat(parse(String(t)), {}));
const same = (a, b) => Math.abs(num(a) - num(b)) < 1e-9;

// ======================================================================
// a1-sup-inf
// ======================================================================

const SI_SUB = [
  { id: 'mono', label: t('appliquer une fonction monotone'), skill: 'g3-arc-def' },
  { id: 'invert', label: t('inverser une inégalité'), skill: 'g1-sign-table' },
  { id: 'interval', label: t('écrire en intervalles'), skill: 'g9-intervals' },
  { id: 'read', label: t('lire les bornes'), skill: SI },
];
const SI_CHOICES = [
  { id: 'tan', label: t('Appliquer tan (croissante sur ]−π/2 ; π/2[)') },
  { id: 'exp', label: t('Appliquer exp (croissante)') },
  { id: 'invert', label: t('Inverser, ou multiplier (attention au signe)') },
  { id: 'drop', label: t('Enlever une inégalité toujours vraie') },
  { id: 'interval', label: t('Écrire en intervalles') },
  { id: 'read', label: t('Lire Inf ou Sup') },
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
      kind, k, cond: `${c1}${o1}arctan(${u})${o2}${c2}`, domain: 'ℝ∖{0}', domText: 'x ∈ ℝ*',
      lines: [
        E(`tan(${c1})${o1}${u}${o2}tan(${c2})`, t('Appliquer tan, strictement croissante sur ]−π/2 ; π/2['), 'mono', 'tan'),
        E(`${t1}${o1}${u}${o2}${t2}`, t('Valeurs de tan'), 'mono', 'tan'),
        E(inv, t1 === '0' || t2 === '0' ? t('Le signe de x, puis inverser') : t('Inverser : 1/u est décroissante sur chaque demi-droite'), 'invert', 'invert'),
        E(final, t('Écrire en intervalles'), 'interval', 'interval'),
      ],
      blanks: [1, [t1 === '0' ? t2 : t1, ...((t1 === '0' ? t2 : t1) === String(k) ? [String(k)] : [])]],
      final, lo, loC: large2, hi, hiC: large1,
      u: { name: `${k}/x`, lo: t1, hi: t2 },
      method: t('Arctg est strictement croissante : applique tan aux trois membres, ils sont tous dans ]−π/2 ; π/2[.'),
      choice2: [
        { id: 'tan', label: t('Appliquer tan aux trois membres : tan est croissante sur ]−π/2 ; π/2['), valid: true },
        { id: 'arctg', label: t('Appliquer Arctg aux trois membres'), valid: false, why: t('Il faut faire disparaître Arctg : on applique sa réciproque, tan.') },
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
      kind, k, c2, cond: `${c1}${o1}arctan(${k}/x)<${c2}`, domain: 'ℝ∖{0}', domText: 'x ∈ ℝ*', trap: true,
      lines: [
        E(`${c1}${o1}arctan(${k}/x)`, t('Arctg prend ses valeurs dans ]−π/2 ; π/2[, et π/2 < {c2} : la seconde inégalité est toujours vraie', { c2 }), 'mono', 'drop'),
        E(`${t1}${o1}${k}/x`, t('Appliquer tan, croissante sur ]−π/2 ; π/2['), 'mono', 'tan'),
        E(`0<x${o1}${hi}`, t('k/x > 0 donne x > 0, puis inverser'), 'invert', 'invert'),
        E(final, t('Écrire en intervalles'), 'interval', 'interval'),
      ],
      blanks: [1, [t1]],
      final, lo: '0', loC: false, hi, hiC: large1,
      u: { name: `${k}/x`, lo: t1, hi: null },
      method: t('tan n\'est croissante que sur ]−π/2 ; π/2[ : {c2} n\'y est pas. Arctg(…) < π/2 < {c2} est toujours vrai.', { c2 }),
      choice2: [
        { id: 'drop', label: t('Arctg(…) < {c2} est toujours vrai : il reste {c1} {o1} Arctg({k}/x)', { c2, c1, o1, k }), valid: true },
        { id: 'tanall', label: t('Appliquer tan aux trois membres'), valid: false, rule: 'a1_tan_monotone_range', why: t('tan n\'est croissante que sur ]−π/2 ; π/2[, et {c2} n\'y est pas.', { c2 }) },
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
        kind, m, cond: `1/ln(x)<-${m}`, domain: ']0 ; +∞[', domText: 'x > 0',
        lines: [
          E(`-${r}<ln(x)<0`, t('1/ln x < 0 force ln x < 0 ; multiplier par ln x < 0 change le sens : 1 > −{m}·ln x', { m }), 'invert', 'invert'),
          E(`${eShow}<x<1`, t('Appliquer exp, croissante'), 'mono', 'exp'),
          E(`]${eShow} ; 1[`, t('Écrire en intervalles'), 'interval', 'interval'),
        ],
        blanks: [0, [`-${r}`]],
        final: `]${eShow} ; 1[`, lo: eShow, loC: false, hi: '1', hiC: false,
        u: { name: 'ln x', lo: `-${r}`, hi: '0' },
        flipped: { lo: '0', hi: eShow },
        method: t('1/ln x < 0 demande ln x < 0. En multipliant par ln x < 0, l\'inégalité change de sens.'),
        choice2: [
          { id: 'flip', label: t('Multiplier par ln x, qui est négatif : l\'inégalité change de sens'), valid: true },
          { id: 'keep', label: t('Multiplier par ln x sans changer le sens'), valid: false, rule: 'g1_ineq_not_flipped', why: t('ln x < 0 ici : multiplier par un nombre négatif change le sens de l\'inégalité.') },
        ],
      };
    }
    return {
      kind, m, cond: `1/ln(x)>${m}`, domain: ']0 ; +∞[', domText: 'x > 0',
      lines: [
        E(`0<ln(x)<${r}`, t('1/ln x > 0 force ln x > 0 ; multiplier par ln x > 0 garde le sens : 1 > {m}ln x', { m: m === 1 ? '' : m }), 'invert', 'invert'),
        E(`1<x<${eShow}`, t('Appliquer exp, croissante'), 'mono', 'exp'),
        E(`]1 ; ${eShow}[`, t('Écrire en intervalles'), 'interval', 'interval'),
      ],
      blanks: [0, [r]],
      final: `]1 ; ${eShow}[`, lo: '1', loC: false, hi: eShow, hiC: false,
      u: { name: 'ln x', lo: '0', hi: r },
      method: t('1/ln x > 0 demande ln x > 0 : on peut multiplier par ln x sans changer le sens.'),
      choice2: [
        { id: 'keep', label: t('Multiplier par ln x, qui est positif : le sens ne change pas'), valid: true },
        { id: 'flip', label: t('Multiplier par ln x en changeant le sens'), valid: false, why: t('ln x > 0 ici : multiplier par un nombre positif garde le sens.') },
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
    kind: 'ln', cond: `${a}${o1}ln(x)${o2}${b}`, domain: ']0 ; +∞[', domText: 'x > 0',
    lines: [
      E(`${ex(a)}${o1}x${o2}${ex(b)}`, t('Appliquer exp, strictement croissante'), 'mono', 'exp'),
      E(final, t('Écrire en intervalles'), 'interval', 'interval'),
    ],
    blanks: [0, [ex(b)]],
    final, lo: ex(a), loC: large1, hi: ex(b), hiC: large2,
    u: { name: 'ln x', lo: String(a), hi: String(b) },
    method: t('exp est strictement croissante : applique-la aux trois membres.'),
    choice2: [
      { id: 'exp', label: t('Appliquer exp aux trois membres (croissante)'), valid: true },
      { id: 'ln', label: t('Appliquer ln aux trois membres'), valid: false, why: t('Il faut faire disparaître ln : on applique sa réciproque, exp.') },
    ],
  };
}

const setHtml = (d) => `A = {${d.domText} : ${MT(d.cond)}}`;

// The decisions on a bound: in A (Min, Max) or not; unbounded side.
function boundDecision(side, v, closed) {
  const lo = side === 'lo';
  const W = lo ? 'Min A = Inf A' : 'Max A = Sup A';
  const name = lo ? 'Inf A' : 'Sup A';
  return {
    kind: 'decision', prompt: t('{name} = {v} : est-il dans A ?', { name, v: RD(v) }), options: closed ? [
      { id: 'in', label: t('Oui : le crochet est fermé, {W}', { W }), valid: true },
      { id: 'out', label: lo ? t('Non : A n\'a pas de minimum') : t('Non : A n\'a pas de maximum'), valid: false, why: lo ? t('Le crochet est fermé : {v} ∈ A, c\'est le plus petit élément.', { v: RD(v) }) : t('Le crochet est fermé : {v} ∈ A, c\'est le plus grand élément.', { v: RD(v) }) },
    ] : [
      { id: 'out', label: lo ? t('Non : {v} ∉ A, A n\'a pas de minimum', { v: RD(v) }) : t('Non : {v} ∉ A, A n\'a pas de maximum', { v: RD(v) }), valid: true },
      { id: 'in', label: t('Oui : {W}', { W }), valid: false, rule: 'a1_sup_in_set', why: t('Le crochet est ouvert : {v} ∉ A. {name} n\'est pas forcément dans A.', { v: RD(v), name }) },
    ],
  };
}
function unboundedDecision(side) {
  const up = side === 'hi';
  return {
    kind: 'decision', prompt: up ? t('A est-il majoré ?') : t('A est-il minoré ?'), options: [
      { id: 'no', label: up ? t('Non : Sup A = +∞, et A n\'a pas de maximum') : t('Non : Inf A = −∞, et A n\'a pas de minimum'), valid: true },
      { id: 'yes', label: up ? t('Oui, par la borne de droite des valeurs') : t('Oui, par la borne de gauche des valeurs'), valid: false, rule: 'a1_supinf_on_values', why: up ? t('A contient des x aussi grands qu\'on veut : l\'intervalle va jusqu\'à +∞.') : t('A contient des x aussi petits qu\'on veut : l\'intervalle va jusqu\'à −∞.') },
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
  if (level === 2) first.pre = [{ kind: 'decision', prompt: t('Comment commencer ?'), options: d.choice2 }];
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
      if (i === 0 && infinite) note(infinite === 'hi' ? t('A n\'est pas majoré : Sup A = +∞, pas de Max.') : t('A n\'est pas minoré : Inf A = −∞, pas de Min.'));
      note(closed ? `${RD(v)} ∈ A : ${side === 'lo' ? 'Min A = Inf A' : 'Max A = Sup A'}.` : side === 'lo' ? t('{v} ∉ A : pas de Min.', { v: RD(v) }) : t('{v} ∉ A : pas de Max.', { v: RD(v) }));
    }
    parts.push({
      html: i === 0 ? t('A = {A}. Lis ses bornes. {name} :', { A: MT(d.final), name }) : `${name} :`, ask: `${name} =`,
      start: side === 'lo' ? 'I' : 'S', judge: { kind: 'value', form: 'closed', expect: v }, pre,
      lines: [E(v, closed ? `${RD(v)} ∈ A` : `${RD(v)} ∉ A`, 'read', 'read')],
    });
  });
  const choices = d.trap ? SI_CHOICES.map((c) => (c.id === 'tan' ? { ...c, rule: 'a1_tan_monotone_range', why: t('{c2} n\'est pas dans ]−π/2 ; π/2[ : tan n\'y est pas croissante.', { c2: d.c2 }) } : c)) : SI_CHOICES;
  const { start, judge: j0, script } = partsScript(parts, level, choices);
  const boundsText = [d.lo === null ? 'Inf A = −∞' : `Inf A = ${frT(d.lo)}`, d.hi === null ? 'Sup A = +∞' : `Sup A = ${frT(d.hi)}`].join(' ; ');
  return linesItem({
    skill: SI, level, mode: modeOf(level), start, judge: j0, script,
    prompt: `${t('{set}. Écris A en intervalles, puis donne Inf A et Sup A, et dis s\'ils sont un Min ou un Max.', { set: setHtml(d) })}${level === 1 ? ` ${d.method}` : ''}`,
    hints: H(d.method, t('Première ligne : {m}', { m: MT(d.lines[0].math) }), `A = ${MT(d.final)} : ${boundsText}`),
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
  infNoMin: (v) => t('Inf A = {v}, et A n\'a pas de minimum', { v: MT(v) }),
  supNoMax: (v) => t('Sup A = {v}, et A n\'a pas de maximum', { v: MT(v) }),
  min: (v) => `Min A = ${MT(v)}`,
  max: (v) => `Max A = ${MT(v)}`,
  inf: (v) => `Inf A = ${MT(v)}`,
  sup: (v) => `Sup A = ${MT(v)}`,
  noUpper: () => t('A n\'est pas majoré'),
  noLower: () => t('A n\'est pas minoré'),
  bounded: () => t('A est borné'),
  empty: () => t('A est vide'),
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
      prompt: t('Soit {set}. Quelle affirmation est vraie ?', { set: setHtml(d) }),
      why: `${d.method} A = ${MT(d.final)}.`,
    });
  }
  if (kind === 'cos') {
    // {x > 0 : cos(1/x) > 0}: an infinite union; Inf A = 0, A not bounded above.
    const A = { lo: '0', loC: false, hi: null, hiC: false };
    return claimsMcq(rng, {
      A, level, opts, key: `${SI}:mcq:cos`,
      wrong: [claim('sup', 'π/2', 'a1_supinf_on_values'), claim('inf', '2/π'), claim('min', '0', 'a1_sup_in_set')],
      prompt: t('Soit A = {x > 0 : {c}}. Quelle affirmation est vraie ?', { c: MT('cos(1/x)>0') }),
      why: t('Avec u = 1/x : cos u > 0 pour u ∈ ]0 ; π/2[ (x > 2/π, donc A n\'est pas majoré) et pour u ∈ ]2kπ − π/2 ; 2kπ + π/2[ (des x aussi proches de 0 qu\'on veut). Inf A = 0, et 0 ∉ A. Les bornes portent sur x, pas sur u.'),
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
      prompt: t('Soit A = {{f} : {dom}}, l\'ensemble des valeurs. Quelle affirmation est vraie ?', { f: MT(f), dom }),
      why: which ? t('x ↦ {f} est décroissante de 1 (en 0, exclu) vers 0 (en +∞, jamais atteint) : A = ]0 ; 1[. Ici, A est un ensemble de valeurs : ses bornes sont des valeurs de f.', { f: MT(f) })
        : t('x ↦ {f} vaut 1 en 0 et décroît vers 0 sans l\'atteindre : A = ]0 ; 1], Max A = 1. Ici, A est un ensemble de valeurs.', { f: MT(f) }),
    });
  }
  // {b − c/n : n ≥ 1}: Min b − c, Sup b.
  const b = rng.int(-2, 4);
  const c = rng.int(1, 3);
  const A = { lo: String(b - c), loC: true, hi: String(b), hiC: false };
  return claimsMcq(rng, {
    A, level, opts, key: `${SI}:mcq:index:${b}:${c}`,
    wrong: [claim('max', String(b), 'a1_sup_in_set'), claim('noLower')],
    prompt: t('Soit A = {{u} : n ∈ ℕ*}. Quelle affirmation est vraie ?', { u: MT(`${b}-${c}/n`) }),
    why: t('Les termes croissent avec n : le plus petit est {lo} (n = 1), et ils s\'approchent de {b} sans l\'atteindre. Min A = {lo}, Sup A = {b}, pas de Max.', { lo: frT(b - c), b: frT(b) }),
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
  const tf = rng.pick(SI_TF);
  if (!tf.truth) return vfMcq(SI, t(tf.s), false, rng, { key: tf.s, why: t(tf.why), ruleIfTrue: tf.rule || null });
  return tfItem({ skill: SI, level: 4, statement: t(tf.s), truth: true, key: tf.s, explanation: t(tf.why), exam: { format: 'tf', points: 1 } });
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
  { id: 'x', label: t('construire x(ε)'), skill: SP },
  { id: 'quant', label: t('ordre des quantificateurs'), skill: 'g9-quant-write' },
];
const KEYS_EPS = ['calc', 'greek', 'letters'];
// « < » in HTML that also holds MathML.
const LT = '&lt;';

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
      answer: `${c}/ε+1`, xShow: `${c}/ε + 1`, wrongs: [`${c}/ε`, `${c}ε`],
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
    xShow: sup ? `max(${frT(b)} − ε/2 ; ${frT(m)})` : `min(${frT(a)} + ε/2 ; ${frT(m)})`,
    // x = s ∓ ε (not > s − ε), x = s ∓ ε/2 (out of A for big ε).
    wrongs: sup ? [`${b}-ε`, `${b}-ε/2`] : [`${a}+ε`, `${a}+ε/2`],
  };
}

// « S est un majorant de A » / « … plus petit que S … » in both directions.
const isBound = (upper, S) => (upper ? t('{S} est un majorant de A.', { S }) : t('{S} est un minorant de A.', { S }));
const noneBetter = (upper, S) => (upper
  ? t('Aucun nombre plus petit que {S} n\'est un majorant : {S} = Sup A.', { S })
  : t('Aucun nombre plus grand que {S} n\'est un minorant : {S} = Inf A.', { S }));

function spBlocks(d, { inputs = [], decoys = 0, rng, xShown = null }) {
  const S = frT(d.s);
  const upper = d.sup;
  const xText = xShown ?? d.xShow;
  const shown = inputs.includes('maj') ? '…' : S;
  const blocks = d.indexed ? [
    { id: 'maj', html: t('Pour tout n ≥ 1, {c}/n > 0, donc {u} {rel} {S} : {bound}', { c: d.c, u: MT(d.term), rel: upper ? LT : '>', S: shown, bound: isBound(upper, shown) }), needs: [] },
    { id: 'eps', html: t('Soit ε > 0.'), needs: [] },
    { id: 'x', html: t('Prenons un entier n ≥ {n}.', { n: inputs.includes('x') ? '…' : d.xShow }), needs: ['eps'] },
    { id: 'chk', html: t('Alors {c}/n {lt} ε, donc x = {u} ∈ A et x {rel} {S} {op} ε.', { c: d.c, lt: LT, u: MT(d.term), rel: upper ? '>' : LT, S, op: upper ? '−' : '+' }), needs: ['x'] },
    { id: 'concl', html: noneBetter(upper, S), needs: ['maj', 'chk'] },
  ] : [
    { id: 'maj', html: t('Pour tout x ∈ A, x {rel} {S} : {bound}', { rel: (upper ? d.set.endsWith(']') : d.set.startsWith('[')) ? (upper ? '≤' : '≥') : (upper ? LT : '>'), S: shown, bound: isBound(upper, shown) }), needs: [] },
    { id: 'eps', html: t('Soit ε > 0.'), needs: [] },
    { id: 'x', html: t('Posons x = {x}.', { x: inputs.includes('x') ? '…' : xText }), needs: ['eps'] },
    { id: 'chk', html: t('Alors x ∈ A et x {rel} {S} {op} ε.', { rel: upper ? '>' : LT, S, op: upper ? '−' : '+' }), needs: ['x'] },
    { id: 'concl', html: noneBetter(upper, S), needs: ['maj', 'chk'] },
  ];
  for (const b of blocks) b.html = b.html.replace('….', '…');
  if (inputs.includes('maj')) blocks[0].input = { kind: 'expr', vars: [], expect: d.s, ask: upper ? t('Majorant :') : t('Minorant :'), answer: d.s };
  if (inputs.includes('x')) blocks[2].input = { kind: 'delta', cfg: d.cfg, answer: d.answer, show: d.xShow, ask: d.indexed ? t('Seuil : n ≥') : 'x =', keys: KEYS_EPS };
  blocks[2].earlyWhy = t('Pas encore : x se construit à partir de ε, qu\'il faut d\'abord fixer.');
  blocks[4].earlyWhy = upper ? t('Pas encore : il faut les deux points, majorant et approximation.') : t('Pas encore : il faut les deux points, minorant et approximation.');
  const outside = d.indexed || !(upper ? d.set.endsWith(']') : d.set.startsWith('['));
  const DECOYS = [
    { html: upper ? t('{S} ∈ A, donc {S} = Sup A.', { S }) : t('{S} ∈ A, donc {S} = Inf A.', { S }), distractor: 'a1_sup_in_set', why: upper
      ? (outside ? t('Le Sup n\'est pas forcément dans A (ici {S} ∉ A), et être dans A ne suffit pas : il faut que ce soit un majorant, le plus petit.', { S }) : t('Le Sup n\'est pas forcément dans A, et être dans A ne suffit pas : il faut que ce soit un majorant, le plus petit.'))
      : (outside ? t('Le Inf n\'est pas forcément dans A (ici {S} ∉ A), et être dans A ne suffit pas : il faut que ce soit un minorant, le plus grand.', { S }) : t('Le Inf n\'est pas forcément dans A, et être dans A ne suffit pas : il faut que ce soit un minorant, le plus grand.')) },
    { html: t('Prenons ε = 0,1 : x = {S} {op} 0,05 convient.', { S, op: upper ? '−' : '+' }), distractor: 'g9_proof_by_example', why: t('Un exemple de ε ne prouve rien : il faut un x pour chaque ε > 0.') },
    { html: t('Il existe x ∈ A tel que, pour tout ε > 0, x {rel} {S} {op} ε.', { rel: upper ? '>' : LT, S, op: upper ? '−' : '+' }), distractor: 'g9_quant_order', why: t('Un tel x serait {rel} {S} : l\'ordre est « pour tout ε > 0, il existe x », et x dépend de ε.', { rel: upper ? '≥' : '≤', S }) },
  ];
  rng.shuffle(DECOYS).slice(0, decoys).forEach((x, i) => blocks.push({ id: `d${i}`, needs: [], ...x }));
  return blocks;
}

// 2−ε/2 → 2 − ε/2.
const spaced = (t) => frT(t).replace(/(\S)([−+])/g, '$1 $2 ');

const spSolution = (blocks, order) => order.map((id) => {
  const b = blocks.find((x) => x.id === id);
  return { html: b.input ? b.html.replace(/…/g, b.input.kind === 'delta' ? b.input.show : frT(b.input.answer)) : b.html, note: '' };
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
      prompt: t('Soit ε > 0. Quel x convient (x ∈ A et x {rel} {s} {op} ε) ?', { rel: d.sup ? '>' : '<', s: frT(d.s), op: d.sup ? '−' : '+' }),
      options: rng.shuffle([
        { id: 'ok', label: `x = ${d.xShow}`, valid: true },
        { id: 'w1', label: `x = ${spaced(w1)}`, valid: false, why: t('Alors x = {s} {op} ε exactement : l\'inégalité stricte n\'est pas vérifiée.', { s: frT(d.s), op: d.sup ? '−' : '+' }) },
        { id: 'w2', label: `x = ${spaced(w2)}`, valid: false, why: d.sup ? t('Pour ε grand (ε = 20), ce x sort de A. Le max avec le milieu le garde dans A.') : t('Pour ε grand (ε = 20), ce x sort de A. Le min avec le milieu le garde dans A.') },
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
    prompt: `${t('{set}. Montre que {W} A = {s}.', { set: d.setHtml, W, s: frT(d.s) })} ${hasInput ? t('Touche les blocs dans l\'ordre et complète les calculs.') : t('Touche les blocs dans l\'ordre.')}${placed.length ? ` ${t('Le début est placé.')}` : ''}`,
    blocks: rng.shuffle(blocks), goal: 'concl', order: todo, placed, decision,
    hints: H(d.sup ? t('Deux choses à montrer : {s} majore A, et on peut s\'approcher de {s} autant qu\'on veut.', { s: frT(d.s) }) : t('Deux choses à montrer : {s} minore A, et on peut s\'approcher de {s} autant qu\'on veut.', { s: frT(d.s) }),
      d.indexed ? t('Soit ε > 0. Pour n ≥ ▢, {c}/n < ε.', { c: d.c }) : t('Soit ε > 0. Posons x = ▢ ; alors x ∈ A et x {rel} {s} {op} ε.', { rel: d.sup ? '>' : '<', s: frT(d.s), op: d.sup ? '−' : '+' }),
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
  const S = frT(d.s);
  const up = d.sup;
  const p1 = mcq({
    skill: SP, level: 4, prompt: up ? t('Première étape : pourquoi {S} est-il un majorant de A ?', { S }) : t('Première étape : pourquoi {S} est-il un minorant de A ?', { S }),
    options: [
      { html: d.indexed ? t('Pour tout n ≥ 1, {c}/n > 0, donc {u} {rel} {S}', { c: d.c, u: MT(d.term), rel: up ? LT : '>', S }) : t('Pour tout x ∈ A, x {rel} {S}', { rel: up ? '≤' : '≥', S }), correct: true },
      { html: t('Parce que {S} ∈ A', { S }), correct: false, rule: 'a1_sup_in_set' },
      { html: d.indexed ? (up ? t('Pour n = 1, le terme vaut {v}, plus petit que {S}', { v: frT(Number(d.s) - d.c), S }) : t('Pour n = 1, le terme vaut {v}, plus grand que {S}', { v: frT(Number(d.s) + d.c), S })) : t('Il existe x ∈ A avec x {rel} {S}', { rel: up ? LT : '>', S }), correct: false, rule: 'g9_proof_by_example' },
      { html: up ? t('Parce que {S} est le plus grand élément de A', { S }) : t('Parce que {S} est le plus petit élément de A', { S }), correct: false, rule: 'a1_sup_in_set' },
    ],
    key: `${SP}:open1:${d.s}`, solution: [{ html: up ? t('Un majorant est plus grand que <b>tous</b> les éléments de A.') : t('Un minorant est plus petit que <b>tous</b> les éléments de A.'), note: '' }],
  }, rng);
  const all = spBlocks(d, { rng, inputs: ['x'], decoys: 0 });
  const blocks = [...all.filter((b) => ['eps', 'x', 'chk'].includes(b.id)), { id: 'd0', needs: [], html: t('Prenons ε = 0,1 : x = {S} {op} 0,05 convient.', { S, op: up ? '−' : '+' }), distractor: 'g9_proof_by_example', why: t('Un exemple de ε ne prouve rien : il faut un x pour chaque ε > 0.') }];
  const p2 = blocksItem({
    skill: SP, level: 4, mode: 'frame', prompt: up ? t('Deuxième étape : pour tout ε > 0, trouve un élément de A plus grand que {S} − ε. Touche les blocs dans l\'ordre et complète.', { S }) : t('Deuxième étape : pour tout ε > 0, trouve un élément de A plus petit que {S} + ε. Touche les blocs dans l\'ordre et complète.', { S }),
    blocks: rng.shuffle(blocks), goal: 'chk', order: ['eps', 'x', 'chk'], noHints: true, subgoals: SP_SUB,
    solution: spSolution(all, ['eps', 'x', 'chk']), key: `${SP}:open2:${d.indexed ? d.term : d.set}`,
  });
  const p3 = mcq({
    skill: SP, level: 4, prompt: t('Conclusion :'),
    options: [
      { html: up ? t('{S} = Sup A, et A n\'a pas de maximum', { S }) : t('{S} = Inf A, et A n\'a pas de minimum', { S }), correct: true },
      { html: `${S} = ${up ? 'Max' : 'Min'} A`, correct: false, rule: 'a1_sup_in_set' },
      { html: `${W} A = ${S} ${up ? '−' : '+'} ε`, correct: false },
      { html: t('On ne peut rien conclure sans fixer ε'), correct: false, rule: 'g9_quant_order' },
    ],
    key: `${SP}:open3:${d.s}`, solution: [{ html: up ? t('{S} est un majorant, et aucun nombre plus petit n\'en est un : c\'est le Sup. {S} ∉ A : pas de Max.', { S }) : t('{S} est un minorant, et aucun nombre plus grand n\'en est un : c\'est le Inf. {S} ∉ A : pas de Min.', { S }), note: '' }],
  }, rng);
  return problemItem({
    skill: SP, level: 4, prompt: t('{set}. Montre que {W} A = {s}.', { set: d.setHtml, W, s: S }),
    parts: [{ item: p1, points: 0.5, title: up ? t('{S} est un majorant', { S }) : t('{S} est un minorant', { S }) }, { item: p2, points: 1, title: t('Construire x(ε)') }, { item: p3, points: 0.5, title: t('Conclure') }],
    key: `open:${d.indexed ? d.term : d.set}:${d.sup}`, exam: { format: 'open', points: 2 }, expectedSec: 420,
  });
}

function spTf(rng) {
  const kind = rng.pick(['cat', 'cat', 'in', 'one', 'eps2']);
  if (kind === 'cat') {
    return tfItem({ skill: SP, level: 4, statement: t('Soit A ⊂ ℝ non vide et majoré, et c = Sup A. Pour tout ε > 0, il existe x ∈ A tel que x + ε ≥ c.'), truth: true, key: 'cat', exam: { format: 'tf', points: 1 },
      explanation: t('Vrai : c − ε n\'est pas un majorant, donc un x ∈ A dépasse c − ε, et x + ε > c.') });
  }
  if (kind === 'eps2') {
    return tfItem({ skill: SP, level: 4, statement: t('Pour montrer que s = Sup A, on peut prendre x = s − ε/2 quand A = ]−∞ ; s[.'), truth: true, key: 'eps2', exam: { format: 'tf', points: 1 },
      explanation: t('Vrai : s − ε/2 < s, donc il est dans A pour tout ε > 0, et s − ε/2 > s − ε. Le max(… ; …) ne sert que quand A est borné à gauche.') });
  }
  if (kind === 'in') {
    return vfMcq(SP, t('Si s = Sup A, alors s ∈ A.'), false, rng, { key: 'in', ruleIfTrue: 'a1_sup_in_set', why: t('Faux : Sup [0 ; 3[ = 3 ∉ [0 ; 3[.') });
  }
  return vfMcq(SP, t('Si s majore A et qu\'il existe un ε > 0 et un x ∈ A avec x > s − ε, alors s = Sup A.'), false, rng, {
    key: 'one', ruleIfTrue: 'g9_proof_by_example', why: t('Faux : il faut un tel x pour <b>tout</b> ε > 0. A = [0 ; 1] et s = 2 : avec ε = 5, x = 0 convient, mais Sup A = 1.'),
  });
}

function supProof(level, rng, profile, opts = {}) {
  if (opts.exam === 'open') return spOpen(rng, opts);
  if (opts.exam === 'tf') return spTf(rng);
  return spItem(level, rng, opts);
}

export const GEN = { [SI]: supInf, [SP]: supProof };
