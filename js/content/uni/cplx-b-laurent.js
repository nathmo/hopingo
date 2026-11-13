// c-res-laurent (module C, part b, step U10): the residue at an essential
// singularity is a₋₁ of the Laurent series. Two templates: h = g(1/(a − bz))
// at z₀ = a/b (the change w = z − z₀ gives 1/(a − bz) = −1/(bw)), and
// z^k·g(1/z) at 0, with g ∈ {sin, cos, exp, sinh, cosh}. Parts: the change
// of variable (`cval` with vars ['w']), the expansion and the product
// (judge `laur`: series in 1/w or 1/z), the residue read (`cval`).

import { Q } from '../../math/rational.js';
import {
  q, cq, cT, cP, zMinus, rd, CM, inner, resLabel, mathLabel, CV, SG, L, choice, opt, partsItem, problemItem, H, examTag, KEYS, pick, checkRes,
} from './cplx-b-kit.js';
import { mcq } from './kit.js';
import { parse } from '../../cas/parse.js';
import { exactComplex } from '../../cas/complex.js';
import { t } from '../../i18n.js';

const SK = 'c-res-laurent';
// z₀ from its text (a + bi), and « w + z₀ » written with its sign.
const cqOf = (tt) => { const v = parse(tt, { complex: true }); return exactComplex(v); };
const wPlus = (tt) => (tt.startsWith('-') ? `w${tt}` : `w+${tt}`);
const COEF = {
  sin: [0, 1, 0, q(-1, 6), 0, q(1, 120)],
  cos: [1, 0, q(-1, 2), 0, q(1, 24), 0],
  exp: [1, 1, q(1, 2), q(1, 6), q(1, 24), q(1, 120)],
  sinh: [0, 1, 0, q(1, 6), 0, q(1, 120)],
  cosh: [1, 0, q(1, 2), 0, q(1, 24), 0],
};
const gT = (g) => (g === 'exp' ? 'e^' : g);

// Σ c·v^p as text, terms [c, p] (p ∈ ℤ), then « + o(1/v^n) ».
function serT(terms, v, n) {
  const out = [];
  for (const [c0, p] of terms) {
    const c = q(c0);
    if (c.n === 0) continue;
    const s = c.n < 0 ? '-' : '+';
    const a = c.n < 0 ? c.neg() : c;
    let tt;
    if (p === 0) tt = String(a);
    else if (p > 0) { const m = p === 1 ? v : `${v}^${p}`; tt = a.eq(1) ? m : a.d === 1 ? `${a.n}${m}` : `(${a})${m}`; }
    else { const m = -p === 1 ? v : `${v}^${-p}`; tt = a.d === 1 ? `${a.n}/${m}` : `${a.n}/(${a.d}${m})`; }
    out.push(`${s}${tt}`);
  }
  const body = out.join('').replace(/^\+/, '');
  const rem = n === 0 ? 'o(1)' : n === 1 ? `o(1/${v})` : `o(1/${v}^${n})`;
  return body ? `${body}+${rem}` : rem;
}

function laurentData(rng) {
  for (let tries = 0; tries < 200; tries++) {
    if (rng.chance(0.55)) {
      const g = pick(rng, ['sin', 'sin', 'exp', 'sinh', 'cos']);
      const a = pick(rng, [cq(1), cq(0, 2), cq(3), cq(0, 1), cq(-1), cq(2)]);
      const b = pick(rng, [1, 2, 3]);
      if (g === 'cos' && rng.chance(0.6)) continue;
      const z0 = a.div(b);
      const B = q(b);
      const c = COEF[g];
      // g(u), u = −1/(bw): Σ c_n (−1/b)^n w^(−n)
      const N = g === 'exp' ? 2 : 3;
      const terms = [];
      for (let n = 0; n <= N; n++) terms.push([q(c[n]).mul(B.neg().pow(-n)), -n]);
      const res = q(c[1]).mul(B.neg().pow(-1));
      const arg = b === 1 ? `${cT(a)}-z` : `${cT(a)}-${b}z`;
      const h = g === 'exp' ? `e^(1/(${arg}))` : `${g}(1/(${arg}))`;
      const u = b === 1 ? '-1/w' : `-1/(${b}w)`;
      const uDL = { sin: 'u − u³/6', sinh: 'u + u³/6', exp: '1 + u + u²/2', cos: '1 − u²/2' }[g];
      return {
        kind: 'ab', id: `ab:${g}:${cT(a)}:${b}`, g, h, z0T: cT(z0), arg, b, u, res: String(res), resQ: res,
        start2: g === 'exp' ? `e^(${u})` : `${g}(${u})`, exp2: serT(terms, 'w', N), order2: N, uDL,
        wrongFactor: res.n !== 0 ? String(q(c[1])) : null,
      };
    }
    const g = pick(rng, ['sin', 'cos', 'exp', 'sinh', 'cosh']);
    const k = pick(rng, [0, 1, 2, 2]);
    const c = COEF[g];
    const res = q(c[k + 1]);
    if (res.n === 0 && rng.chance(0.8)) continue;
    const h = `${k === 0 ? '' : k === 1 ? 'z' : `z^${k}`}${g === 'exp' ? 'e^(1/z)' : `${g}(1/z)`}`;
    const n1 = k + 1;
    const exp1 = serT(c.slice(0, n1 + 1).map((x, n) => [x, -n]), 'z', n1);
    const exp2 = serT(c.slice(0, n1 + 1).map((x, n) => [x, k - n]), 'z', 1);
    return {
      kind: 'zk', id: `zk:${g}:${k}`, g, k, h, z0T: '0', res: String(res), resQ: res,
      start1: g === 'exp' ? 'e^(1/z)' : `${g}(1/z)`, exp1, order1: n1,
      start2: k === 0 ? null : `${k === 1 ? 'z' : `z^${k}`}(${exp1})`, exp2,
    };
  }
  return null;
}

const SUB = [SG('expand', t('développer g(w)'), 'c-laurent'), SG('multiply', t('série de Laurent de h'), 'c-laurent'), SG('read', t('lire a₋₁'), SK)];

function laurentParts(d, level, { only = false } = {}) {
  const traps = {};
  if (d.res !== '0') traps.c_essential_lim = ['0'];
  if (d.wrongFactor && d.wrongFactor !== d.res) traps.c_essential_factor = [d.wrongFactor];
  const resJ = CV(resLabel(d.z0T, 'h'), d.res, { traps, form: 'algebraic' });
  const MENU = [
    { id: 'w', label: t('Poser w = z − z₀'), valid: true },
    { id: 'dl', label: t('Développer g avec son DL usuel'), valid: true },
    { id: 'mul', label: t('Multiplier terme à terme'), valid: true },
    { id: 'read', label: t('Lire le coefficient de 1/(z − z₀)'), valid: true },
    { id: 'pole', label: 'Res = lim (z − z₀)h(z)', valid: false, rule: 'c_essential_lim', why: t('z₀ est une singularité essentielle : aucune formule de pôle ne marche, seul a₋₁ compte.') },
  ];
  const read = { html: only ? '' : t('Le résidu est le coefficient a₋₁ :'), ask: 'Res =', start: resJ.label, judge: resJ, menu: MENU, lines: [L(d.res, 'a₋₁', 'read', { blank: [d.res] })] };
  if (only) return [read];
  const parts = [];
  if (d.kind === 'ab') {
    if (level >= 2) {
      const J = CV(mathLabel(`1/(${d.arg})`), d.u, { vars: ['w'], domain: { w: [0.5, 3] }, form: 'ratz' });
      parts.push({ start: J.label, judge: J, menu: MENU, notes: [t('On pose w = {a}, donc z = {b}.', { a: CM(zMinus(cqOf(d.z0T))), b: CM(wPlus(d.z0T)) })], lines: [L(d.u, `z = ${rd(wPlus(d.z0T))}`, 'expand', { blank: [d.u] })] });
    }
    const J2 = { kind: 'laur', v: 'w', vars: ['w'], dvar: 'w', order: d.order2 };
    parts.push({
      html: level >= 2 ? t('1/({a}) = {b}. Développe en puissances de 1/w :', { a: CM(d.arg), b: CM(d.u) }) : '', ask: 'h =', start: d.start2, judge: J2, menu: MENU,
      lines: [L(d.exp2, `${d.g === 'exp' ? 'eᵘ' : `${d.g} u`} = ${d.uDL} + …, u = ${rd(d.u)}`, 'multiply', { blank: [d.exp2.replace(/\+o\(.*$/, '')] })],
    });
  } else {
    const J1 = { kind: 'laur', v: 'z', vars: ['z'], dvar: 'z', order: d.order1 };
    parts.push({ start: d.start1, judge: J1, menu: MENU, lines: [L(d.exp1, t('DL usuel en u = 1/z'), 'expand', { blank: [d.exp1.replace(/\+o\(.*$/, '')] })] });
    if (d.start2) {
      const J2 = { kind: 'laur', v: 'z', vars: ['z'], dvar: 'z', order: 1 };
      parts.push({ html: t('On multiplie par {a} :', { a: CM(d.k === 1 ? 'z' : `z^${d.k}`) }), ask: 'h =', start: d.start2, judge: J2, menu: MENU, lines: [L(d.exp2, t('Multiplier terme à terme'), 'multiply', { blank: [d.exp2.replace(/\+o\(.*$/, '')] })] });
    }
  }
  parts.push(read);
  if (level === 3) {
    parts[0].decisions = [{
      kind: 'decision', prompt: t('En z₀ = {z0T}, h a une singularité essentielle. Comment trouver le résidu ?', { z0T: rd(d.z0T) }),
      options: [
        { id: 'laurent', label: t('Avec la série de Laurent : Res = a₋₁'), valid: true, ref: true },
        { id: 'pole', label: t('Avec une formule de pôle : lim (z − z₀)h(z)'), valid: false, rule: 'c_essential_lim', why: t('Ce n\'est pas un pôle : (z − z₀)h(z) n\'a pas de limite finie utile. Seul a₋₁ donne le résidu.') },
      ],
    }];
  }
  return parts;
}

const hint1 = (d) => (d.kind === 'ab' ? t('Pose w = z − {z0T} : 1/({arg}) = {u}, puis développe {a} avec u = {u}.', { z0T: rd(d.z0T), arg: rd(d.arg), u: rd(d.u), a: d.g === 'exp' ? 'eᵘ' : `${d.g} u` }) : (d.k ? t('Développe {a} avec u = 1/z, puis multiplie par {b}.', { a: d.g === 'exp' ? 'eᵘ' : `${d.g} u`, b: d.k === 1 ? 'z' : `z^${d.k}` }) : t('Développe {a} avec u = 1/z.', { a: d.g === 'exp' ? 'eᵘ' : `${d.g} u` })));

function laurentLines(level, rng, opts = {}) {
  const coef = opts.exam === 'coef';
  const d = laurentData(rng) || FALLBACK;
  checkRes(d.h, d.z0T, d.res);
  const parts = laurentParts(d, level, { only: coef });
  if (level === 1 && d.kind === 'ab') parts[0].notes = [t('On pose w = {a} : 1/({b}) = {c}.', { a: CM(zMinus(cqOf(d.z0T))), b: CM(d.arg), c: CM(d.u) })];
  const last = d.kind === 'ab' ? d.exp2 : d.exp2 || d.exp1;
  return partsItem({
    skill: SK, level,
    prompt: coef ? t('h(z) = {a} a une singularité essentielle en z₀ = {b}. Que vaut Res(h ; {b}) ?', { a: CM(d.h), b: CM(d.z0T) }) : t('h(z) = {a} a une singularité essentielle en z₀ = {b}. Trouve sa série de Laurent, puis Res(h ; {b}).', { a: CM(d.h), b: CM(d.z0T) }),
    parts, keys: [...KEYS, 'anal'], subgoals: SUB,
    hints: H(hint1(d), d.kind === 'ab' ? `h = ${CM(d.exp2)}` : `${CM(d.start1)} = ${CM(d.exp1)}`, `${CM(last)} : a₋₁ = ${CM(d.res)}`),
    key: `${SK}:${level}:${d.id}`, exam: examTag(opts, coef ? 2 : 1), fallback: !!d.fallback,
    baits: ['c_essential_lim', ...(d.wrongFactor ? ['c_essential_factor'] : [])],
  });
}
const FALLBACK = { kind: 'zk', id: 'fb', g: 'sin', k: 2, h: 'z^2sin(1/z)', z0T: '0', res: '-1/6', resQ: q(-1, 6), start1: 'sin(1/z)', exp1: '1/z-1/(6z^3)+o(1/z^3)', order1: 3, start2: 'z^2(1/z-1/(6z^3)+o(1/z^3))', exp2: 'z-1/(6z)+o(1/z)', fallback: true };

// L5 and open (2022, 4 points): nature, residue and Laurent series.
function laurentProblem(level, rng, opts = {}) {
  const d = laurentData(rng) || FALLBACK;
  checkRes(d.h, d.z0T, d.res);
  const nature = mcq({
    skill: SK, level, key: `${SK}:nature:${d.id}`,
    prompt: t('Quelle est la nature de la singularité de h(z) = {a} en z₀ = {b} ?', { a: CM(d.h), b: CM(d.z0T) }),
    options: [
      { html: t('Une singularité essentielle'), correct: true },
      { html: t('Un pôle simple'), correct: false, rule: 'c_essential_lim' },
      { html: t('Un pôle d\'ordre 3'), correct: false, rule: 'c_essential_lim' },
      { html: t('Une singularité apparente'), correct: false, rule: 'c_removable_as_pole' },
    ],
    solution: [{ html: t('La série de Laurent a une infinité de puissances négatives : singularité essentielle.'), note: '' }],
  }, rng);
  const parts = laurentParts(d, 4).filter((p) => !p.decisions);
  const item = partsItem({ skill: SK, level, prompt: t('Écris la série de Laurent de h autour de z₀ (jusqu\'au terme en 1/(z − z₀) au moins), puis le résidu.'), parts, keys: [...KEYS, 'anal'], subgoals: SUB, hints: [], key: `${SK}:p:${d.id}` });
  const n = parts.length;
  // Steps: the series (1 point, split on its parts), the residue (2 points).
  const pts = n === 1 ? [3] : n === 2 ? [1, 2] : [0.5, 0.5, 2];
  return problemItem({
    skill: SK, level, key: `${d.id}:${level}`, exam: opts.exam ? examTag(opts, 4) : false,
    prompt: t('h(z) = {a}, z₀ = {b} (format 2022, 4 points).', { a: CM(d.h), b: CM(d.z0T) }),
    parts: [{ item: nature, points: 1, title: t('Nature de la singularité') }, { item, points: pts, title: t('Série de Laurent et résidu') }],
    fallback: !!d.fallback,
  });
}

function laurentMcq(rng, opts) {
  const d = laurentData(rng) || FALLBACK;
  checkRes(d.h, d.z0T, d.res);
  const multi = !!opts.multi;
  const r = d.resQ;
  return choice({
    skill: SK, level: 4, key: `${SK}:mcq:${d.id}:${multi}`, exam: examTag(opts, 2), multi,
    prompt: multi ? t('Pour h(z) = {a} en z₀ = {b}, quelles affirmations sont vraies ?', { a: CM(d.h), b: CM(d.z0T) }) : t('Soit h(z) = {a}. Res(h ; {b}) =', { a: CM(d.h), b: CM(d.z0T) }),
    right: multi ? `Res(h ; z₀) = ${CM(d.res)}` : CM(d.res), rightText: multi ? null : d.res,
    rights: multi ? [t('z₀ est une singularité essentielle')] : [],
    wrongs: multi
      ? [{ html: t('z₀ est un pôle simple'), rule: 'c_essential_lim' }, { html: `Res(h ; z₀) = ${CM(r.n ? '0' : '1')}`, rule: r.n ? 'c_essential_lim' : null }, { html: `Res(h ; z₀) = ${CM(String(r.neg().n ? r.neg() : q(1, 2)))}` }]
      : [r.n ? opt('0', 'c_essential_lim') : null, d.wrongFactor && d.wrongFactor !== d.res ? opt(d.wrongFactor, 'c_essential_factor') : null, r.n ? opt(String(r.neg())) : opt('1'), opt(String(r.add(1)))],
    fillers: [opt(String(r.mul(2).add(r.n ? 0 : 1))), opt('1/2'), opt('-1')],
    solution: [{ html: d.kind === 'ab' ? t('Avec w = z − z₀ : h = {a}, donc Res = a₋₁ = {b}.', { a: CM(d.exp2), b: CM(d.res) }) : t('h = {a}, donc Res = a₋₁ = {b}.', { a: CM(d.exp2 || d.exp1), b: CM(d.res) }), note: '' }],
    expectedSec: 150,
  }, rng);
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return laurentMcq(rng, opts);
    if (opts.exam === 'coef') return laurentLines(4, rng, opts);
    if (opts.exam === 'open' || level === 5) return laurentProblem(5, rng, opts);
    return laurentLines(level, rng, opts);
  },
};

void Q; void cP; void inner;
