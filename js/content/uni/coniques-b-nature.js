// g10-conic-nature (module G10, part b; step U5): the « Choisir la méthode »
// tree of the catalogue. The decisions are `decision` lines (spec §5.3),
// those of the item's true path only: a wrong choice is refused with its
// reason (and its trap), so the catalogue's `when` (show a decision only
// after some earlier choice) is not needed. Parts: Δ = det M (judge det, or
// typed after the first decision at level 4), δ (value), then the
// eigenvalues λ² − (a + c)λ + δ = 0 as a check (solset), and at level 5 the
// reduced equation (conic).

import { Q } from '../../math/rational.js';
import {
  q, qt, fq, nz, H, sumT, readable, eqT, partsItem, mcqD, examTag, MT, tfG, geoCounter,
} from './geo-kit.js';
import {
  reduceData, matA, matM, mtQ, deltaOf, DeltaOf, traceOf, eigRoots, detLines, natureOf, NATURE_NAME, productCoefs, lineT2,
} from './coniques-b-kit.js';
import { MLm } from './alglin-kit.js';
import { t } from '../../i18n.js';

const NAT = 'g10-conic-nature';
const pf = (x) => (q(x).n < 0 ? `(${fq(x)})` : fq(x));
const NAT_SUB = [
  { id: 'Delta', label: t('Δ = det M (déterminant 3 × 3)'), skill: 'g4-triple' },
  { id: 'delta', label: t('δ = det A et le genre'), skill: NAT },
  { id: 'eig', label: t('valeurs propres de A'), skill: 'l-eig-charpoly' },
  { id: 'red', label: t('équation réduite'), skill: 'g10-conic-reduce' },
];

// kind: 'ell' | 'hyp' | 'par' | 'empty' | 'lines'; noXY: no term in xy.
export function natureData(rng, kind, noXY = false) {
  for (let t = 0; t < 300; t++) {
    let co;
    if (kind === 'lines') {
      const L1 = [nz(rng, -3, 3), rng.int(-3, 3), rng.int(-5, 5)];
      const L2 = [rng.int(-3, 3), nz(rng, -3, 3), rng.int(-5, 5)];
      if (L1[0] * L2[1] - L1[1] * L2[0] === 0) continue;
      if (noXY && L1[0] * L2[1] + L2[0] * L1[1] !== 0) continue;
      co = productCoefs(L1, L2);
      const r = eigRoots(traceOf(co), deltaOf(co));
      if (!r || co.some((x) => Math.abs(x.valueOf()) > 30)) continue;
      return { kind, co, lines: [L1, L2] };
    }
    if (noXY) {
      const O = [rng.int(-4, 4), rng.int(-4, 4)];
      if (kind === 'par') {
        const a = nz(rng, -4, 4);
        const m = nz(rng, -6, 6);
        const k0 = rng.int(-4, 4);
        // a(x − h)² + m(y − k₀) = 0 (or with x and y swapped).
        const swap = rng.chance(0.5);
        const c = [a, 0, 0, -2 * a * O[0], m, a * O[0] * O[0] - m * k0];
        co = (swap ? [c[2], 0, c[0], c[4], c[3], c[5]] : c).map((x) => q(x));
        return { kind, co };
      }
      const a = nz(rng, -6, 6);
      let c = nz(rng, -6, 6);
      if (kind === 'hyp' && a * c > 0) c = -c;
      if (kind !== 'hyp' && a * c < 0) c = -c;
      if (a === c) continue;
      let k = nz(rng, 1, 24);
      if (kind === 'ell' || kind === 'empty') k *= Math.sign(a);
      else k *= rng.pick([1, -1]);
      if (kind === 'empty') k = -k;
      co = [a, 0, c, -2 * a * O[0], -2 * c * O[1], a * O[0] * O[0] + c * O[1] * O[1] - k].map((x) => q(x));
      if (co.some((x) => Math.abs(x.valueOf()) > 60)) continue;
      return { kind, co, O };
    }
    const base = kind === 'empty' ? 'ell' : kind;
    const d = reduceData(rng, base);
    if (d.fallback && t < 290) continue;
    co = [...d.coefs];
    // An empty ellipse: f(Ω) changes sign.
    if (kind === 'empty') co[5] = co[5].add(2 * d.k);
    return { kind, co, d };
  }
  return { kind: 'ell', co: [5, -6, 5, -4, -4, -4].map((x) => q(x)), fallback: true };
}

function pickKind(rng) {
  const x = rng.next();
  return x < 0.35 ? 'ell' : x < 0.7 ? 'hyp' : x < 0.85 ? 'par' : x < 0.9 ? 'empty' : 'lines';
}

// The decisions of the tree, on the true path of the item.
function treeDecisions(co, nat, { thenDelta = false } = {}) {
  const b = q(co[1]);
  const d = deltaOf(co);
  const D = DeltaOf(co);
  const deg = D.n === 0;
  const genre = d.n > 0 ? 'ell' : d.n < 0 ? 'hyp' : 'par';
  const start = {
    kind: 'decision', prompt: t('Par quoi commencer ?'), options: [
      { id: 'matrices', label: t('Écrire A et M, puis calculer Δ = det M'), valid: true, quality: 'good', ref: true, ...(thenDelta ? { then: { ask: 'Δ =', expect: qt(D), why: t('Ce n\'est pas det M : développe selon la première ligne.') } } : {}) },
      { id: 'eigen-first', label: t('Calculer tout de suite les valeurs propres de A'), valid: true, quality: 'poor', why: t('Juste, mais tu ne sais pas encore si la conique est dégénérée : il faudra calculer Δ de toute façon.') },
      { id: 'complete', label: t('Compléter les carrés'), valid: b.n === 0, quality: 'good', why: t('Le terme en xy empêche de compléter les carrés séparément : il faut d\'abord tourner le repère.') },
    ],
  };
  const degDec = {
    kind: 'decision', prompt: t('Δ = {v1} : la conique est…', { v1: fq(D) }), options: [
      { id: 'nondeg', label: t('non dégénérée (Δ ≠ 0)'), valid: !deg, rule: deg ? 'g10_degenerate_ignored' : undefined, why: deg ? t('Δ = 0 : la conique est dégénérée (un point, deux droites ou rien).') : undefined },
      { id: 'deg', label: t('dégénérée (Δ = 0)'), valid: deg, why: deg ? undefined : t('Δ = {v1} ≠ 0 : elle n\'est pas dégénérée.', { v1: fq(D) }) },
    ],
  };
  const gen = {
    kind: 'decision', prompt: t('δ = det A = {v1} : genre ?', { v1: fq(d) }), options: [
      { id: 'ell', label: t('δ > 0 (λ de même signe) : genre ellipse'), valid: genre === 'ell', rule: genre === 'hyp' ? 'g10_det_sign_nature' : undefined, why: t('δ = λ₁λ₂ : regarde son signe.') },
      { id: 'hyp', label: t('δ < 0 (λ de signes contraires) : genre hyperbole'), valid: genre === 'hyp', rule: genre === 'ell' ? 'g10_det_sign_nature' : undefined, why: t('δ = λ₁λ₂ : regarde son signe.') },
      { id: 'par', label: t('δ = 0 (une λ nulle) : genre parabole'), valid: genre === 'par', why: `δ = ${fq(d)} ≠ 0.` },
    ],
  };
  const out = [start, degDec, gen];
  if (!deg && genre === 'ell') {
    const s = traceOf(co).mul(D);
    out.push({
      kind: 'decision', prompt: t('Genre ellipse : (a + c)·Δ = {v1}. Réelle ou vide ?', { v1: fq(s) }), options: [
        { id: 'real', label: t('(a + c)·Δ < 0 : ellipse réelle'), valid: s.n < 0, why: t('(a + c)·Δ > 0 : aucun point réel ne vérifie l\'équation.') },
        { id: 'empty', label: t('(a + c)·Δ > 0 : ensemble vide'), valid: s.n > 0, why: t('(a + c)·Δ < 0 : l\'ellipse est réelle.') },
      ],
    });
  }
  if (deg) {
    out.push({
      kind: 'decision', prompt: t('Dégénérée : laquelle ?'), options: [
        { id: 'pt', label: t('δ > 0 : un point'), valid: nat === 'pt', why: `δ = ${fq(d)}.` },
        { id: 'two', label: t('δ < 0 : deux droites sécantes'), valid: nat === 'lines', why: `δ = ${fq(d)}.` },
        { id: 'par2', label: t('δ = 0 : deux droites parallèles, une droite double, ou vide'), valid: nat === 'par2', why: `δ = ${fq(d)}.` },
      ],
    });
  }
  return { start, rest: out.slice(1) };
}

const NAT_MENU = {
  det: [
    { id: 'row', label: t('Développer det M selon une ligne'), valid: true },
    { id: 'bfull', label: t('Mettre b, d, e hors de la diagonale'), valid: false, rule: 'g10_bhalf_matrix', why: t('Hors de la diagonale, on met les moitiés b/2, d/2, e/2.') },
  ],
  delta: [
    { id: 'ac', label: 'δ = ac − (b/2)²', valid: true },
    { id: 'acb', label: 'δ = ac − b²', valid: false, rule: 'g10_bhalf_matrix', why: 'A = [[a, b/2], [b/2, c]] : δ = ac − (b/2)².' },
  ],
  eig: [
    { id: 'char', label: 'λ² − (a + c)λ + δ = 0', valid: true },
    { id: 'diag', label: t('Les valeurs propres sont a et c'), valid: false, why: t('Seulement sans terme en xy : sinon A n\'est pas diagonale.') },
  ],
};

function rootsLine(r) {
  const [a, b] = r;
  if (a.eq(b)) return `λ = ${qt(a)}`;
  return `λ = ${qt(a)} ou λ = ${qt(b)}`;
}

function natureItem(level, rng, opts = {}) {
  const noXY = rng.int(0, 4) === 0;
  const kind = pickKind(rng);
  const data = natureData(rng, kind, noXY && kind !== 'lines');
  const co = data.co;
  const nat = natureOf(co);
  const eq = eqT(co);
  const A = matA(co);
  const M = matM(co);
  const d = deltaOf(co);
  const D = DeltaOf(co);
  const tr = traceOf(co);
  const roots = eigRoots(tr, d);
  const free = level >= 4;
  const tree = treeDecisions(co, nat, { thenDelta: level === 4 && !opts.exam });
  const parts = [];
  const abc = co.slice(0, 3).map(qt);
  const dl = detLines(M);
  if (!(level === 4 && !opts.exam)) {
    parts.push({
      html: level <= 2 ? `A = ${MLm(A)} et M = ${MLm(M)}.` : t('Calcule Δ = det M.'), ask: 'Δ =', start: 'det(M)',
      judge: { kind: 'det', target: 'number', names: { M: mtQ(M) }, abc, co6: co.map(qt) }, menu: NAT_MENU.det,
      decisions: [tree.start],
      lines: [
        { math: dl.matrix, note: 'M = [[a, b/2, d/2], [b/2, c, e/2], [d/2, e/2, f]]', subgoal: 'Delta', cells: level === 2 ? [[0, 1], [1, 0], [0, 2], [2, 0]] : undefined, from: 2 },
        { math: dl.expansion, note: t('Développer selon la 1re ligne'), subgoal: 'Delta' },
        { math: dl.value, note: D.n === 0 ? t('Δ = 0 : dégénérée') : t('Δ ≠ 0 : non dégénérée'), subgoal: 'Delta', blank: [dl.value] },
      ],
    });
  }
  const b2 = q(co[1]).div(2);
  const dLine = `${qt(co[0]).replace(/^-.*/, (x) => `(${x})`)}·${qt(co[2]).replace(/^-.*/, (x) => `(${x})`)} - ${b2.n < 0 || b2.d !== 1 ? `(${qt(b2)})` : qt(b2)}^2`;
  parts.push({
    html: t('A = {v1}. Et δ = det A ?', { v1: MLm(A) }), ask: 'δ =', start: 'δ',
    judge: { kind: 'value', expect: qt(d), delta: true, abc }, menu: NAT_MENU.delta,
    decisions: level === 4 && !opts.exam ? [tree.start, tree.rest[0]] : [tree.rest[0]],
    lines: [
      { math: dLine, note: 'δ = ac − (b/2)²', subgoal: 'delta', blank: [b2.n < 0 || b2.d !== 1 ? `(${qt(b2)})` : qt(b2)] },
      { math: qt(d), note: '', subgoal: 'delta', blank: [qt(d)] },
    ],
  });
  if (roots) {
    const charT = `${sumT([[1, 'λ^2'], [tr.neg(), 'λ'], [d, '']])} = 0`;
    parts.push({
      html: t('Contrôle par les valeurs propres de A.'), ask: 'λ :', start: charT,
      judge: { kind: 'solset', v: 'λ', vars: ['λ'] }, menu: NAT_MENU.eig,
      decisions: tree.rest.slice(1),
      lines: [{ math: rootsLine(roots), note: d.n > 0 ? t('Même signe') : d.n < 0 ? t('Signes contraires') : t('Une valeur propre nulle'), subgoal: 'eig' }],
    });
  }
  // Level 5: the reduced equation of a centred real conic.
  if ((level === 5 || opts.exam === 'open') && (nat === 'ell' || nat === 'hyp') && roots) {
    const fO = D.div(d);
    parts.push({
      html: t('Écris l\'équation réduite dans un repère orthonormé de ses axes, centré en Ω : λ₁X² + λ₂Y² + f(Ω) = 0, avec f(Ω) = Δ/δ.'), ask: t('équation réduite :'), start: eq,
      judge: { kind: 'conic', equation: eq, target: 'reduced' },
      lines: [{ math: `${sumT([[roots[0], 'X^2'], [roots[1], 'Y^2'], [fO, '']])} = 0`, note: `f(Ω) = Δ/δ = ${fq(fO)}`, subgoal: 'red' }],
    });
  }
  const hints = H(
    t('Hors de la diagonale de A, on met <b>la moitié</b> du coefficient de xy. Calcule d\'abord Δ = det M, puis δ = det A.'),
    `δ = ${pf(co[0])}·${pf(co[2])} − (□)²`,
    `δ = ${fq(d)}, Δ = ${fq(D)} : ${NATURE_NAME[nat]}`,
  );
  return partsItem({
    skill: NAT, level, parts, hints, subgoals: NAT_SUB,
    prompt: t('Quelle est la nature de la conique {v1} ?{v2}', { v1: MT(eq, { vars: ['x', 'y'] }), v2: level === 5 || opts.exam === 'open' ? t(' Si elle a un centre, donne aussi son équation réduite.') : '' }),
    key: `${NAT}:${eq}`, fallback: data.fallback, exam: opts.exam ? examTag(opts, opts.exam === 'open' ? 4 : 1) : false,
    keys: ['calc', 'geo', 'mat'],
  });
}

const NAME_SHORT = { ell: t('Une ellipse réelle'), empty: t('L\'ensemble vide'), hyp: t('Une hyperbole'), par: t('Une parabole'), pt: t('Un point'), lines: t('Deux droites sécantes'), par2: t('Deux droites parallèles') };

// The nature found with b instead of b/2 (g10_bhalf_matrix).
const bFull = (co) => natureOf([co[0], q(co[1]).mul(2), ...co.slice(2)]);

function natureExam(rng, exam) {
  if (exam === 'open') return natureItem(5, rng, { exam });
  if (exam === 'tf') {
    if (rng.chance(0.5)) {
      const k = rng.int(1, 4);
      return tfG({
        skill: NAT, key: `tf-empty:${k}`, truth: false, exam: examTag({ exam }), ruleIfTrue: 'g10_degenerate_ignored',
        statement: t('Si δ = det A > 0, la conique ax² + bxy + cy² + dx + ey + f = 0 est une ellipse.'),
        counter: geoCounter('deltaPosNotEllipse', [['A', '(a ; b ; c) ='], ['L', '(d ; e ; f) =']], { A: '(1 ; 0 ; 1)', L: `(0 ; 0 ; ${k})` }),
        explanation: t('Faux : x² + y² + {k} = 0 a δ = 1 > 0, mais aucun point réel (ensemble vide). Il faut aussi Δ ≠ 0 et (a + c)·Δ < 0.', { k }),
      });
    }
    return tfG({
      skill: NAT, key: 'tf-hyp', truth: true, exam: examTag({ exam }),
      statement: t('Si δ = det A < 0 et Δ = det M ≠ 0, la conique est une hyperbole.'),
      explanation: t('Vrai : δ = λ₁λ₂ < 0 donne le genre hyperbole, et Δ ≠ 0 dit qu\'elle n\'est pas dégénérée.'),
    });
  }
  // mcq: the nature of a conic, or which one is a parabola.
  if (rng.chance(0.5)) {
    const kind = pickKind(rng);
    const data = natureData(rng, kind, false);
    const co = data.co;
    const nat = natureOf(co);
    const d = deltaOf(co);
    const swapped = { ell: 'hyp', hyp: 'ell', empty: 'hyp', par: 'ell', pt: 'lines', lines: 'pt', par2: 'ell' }[nat];
    const wrongs = [{ html: NAME_SHORT[swapped], rule: 'g10_det_sign_nature' }];
    if (nat === 'lines' || nat === 'pt') wrongs.push({ html: NAME_SHORT[d.n > 0 ? 'ell' : 'hyp'], rule: 'g10_degenerate_ignored' });
    const bf = bFull(co);
    if (bf !== nat) wrongs.push({ html: NAME_SHORT[bf], rule: 'g10_bhalf_matrix' });
    return mcqD({
      skill: NAT, level: 4, key: `mcq:${eqT(co)}`, exam: examTag({ exam }),
      prompt: t('Quelle est la nature de la conique {v1} ?', { v1: MT(eqT(co), { vars: ['x', 'y'] }) }),
      right: NAME_SHORT[nat], wrongs,
      fillers: ['ell', 'hyp', 'par', 'empty', 'lines'].filter((k) => k !== nat).map((k) => ({ html: NAME_SHORT[k] })),
      solution: [{ html: `δ = ${fq(d)}, Δ = ${fq(DeltaOf(co))}, a + c = ${fq(traceOf(co))} : ${NATURE_NAME[nat]}.`, note: '' }],
      fallback: data.fallback,
    }, rng);
  }
  // « Laquelle de ces coniques est une parabole ? »
  const par = natureData(rng, 'par', rng.chance(0.3)).co;
  const others = [natureData(rng, 'ell').co, natureData(rng, 'hyp').co];
  // b² = ac: a parabola with b instead of b/2 (g10_bhalf_matrix).
  const a = nz(rng, 1, 4);
  const c = rng.pick([1, 4, 9].map((x) => x * a).filter((x) => x <= 16));
  const bb = Math.round(Math.sqrt(a * c)) * rng.pick([1, -1]);
  const trap = [a, bb, c, nz(rng, -6, 6), rng.int(-6, 6), rng.int(-9, 9)].map((x) => q(x));
  return mcqD({
    skill: NAT, level: 4, key: `mcq-par:${eqT(par)}`, exam: examTag({ exam }),
    prompt: t('Laquelle de ces coniques est une parabole ?'),
    right: MT(eqT(par), { vars: ['x', 'y'] }),
    wrongs: [{ html: MT(eqT(trap), { vars: ['x', 'y'] }), rule: 'g10_bhalf_matrix' }, ...others.map((co) => ({ html: MT(eqT(co), { vars: ['x', 'y'] }), rule: 'g10_det_sign_nature' }))],
    solution: [{ html: t('La parabole a δ = ac − (b/2)² = 0 : {v1}. Pour {v2}, b² = ac mais δ = ac − (b/2)² = {v3} ≠ 0.', { v1: MT(eqT(par), { vars: ['x', 'y'] }), v2: MT(eqT(trap), { vars: ['x', 'y'] }), v3: fq(deltaOf(trap)) }), note: '' }],
  }, rng);
}

export const GEN = {
  [NAT]: (level, rng, profile, opts = {}) => (opts.exam ? natureExam(rng, opts.exam) : natureItem(level, rng)),
};


