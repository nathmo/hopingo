// g6-study-full (module G6, part c, step U2): the full study of a
// function, as a lines item with one part per step (domain, asymptotes,
// f′ and its zeros, f″, the values of the table). The sketch is not drawn
// yet (no `plot` item before U5): the position of the curve and the
// nature of each point are decisions in words.
//
// Template 1 (levels 1–4): f(x) = mx + h + k/(x − a), k = m·s² > 0, written
// as one fraction: extrema at a ± s, no inflection. Template 2 (level 5,
// open variant): f(x) = |x − a| + k/x: an angular point, two different
// oblique asymptotes, a vertical one.

import { MT, fr, linesItem, examTag } from './kit.js';
import {
  q, N, RT, nz, modeOf, H, E, D, NOTE, polyText, affText, minusText, atText, blanked, part, partsScript, usedSubgoals,
  KEYS,
} from './analyse0-c-util.js';

const V = 'x';
const SF = 'g6-study-full';
const sgnTerm = (t) => (t.startsWith('-') ? t : `+${t}`);
const SF_SUB = [
  { id: 'domain', label: 'domaine et symétries', skill: 'g1-parity-period' },
  { id: 'asym', label: 'asymptotes', skill: 'g6-asymptotes' },
  { id: 'variation', label: 'variation et extrema', skill: 'g6-sign-variation' },
  { id: 'concavity', label: 'concavité', skill: 'g6-convexity' },
  { id: 'angular', label: 'point anguleux', skill: 'g6-angular-points' },
  { id: 'table', label: 'tableau récapitulatif', skill: SF },
];
const SF_CHOICES = [
  { id: 'domain', label: 'Domaine et symétries' },
  { id: 'asym', label: 'Asymptotes : diviser, puis y = mx + h' },
  { id: 'deriv', label: 'f′, ses zéros et la variation' },
  { id: 'second', label: 'f″ et la concavité' },
  { id: 'table', label: 'Valeurs des extrema pour le tableau' },
];
const KIND_WORD = { min: 'un minimum local', max: 'un maximum local', none: 'pas un extremum' };

// ---------- template 1: mx + h + k/(x − a) ----------

const PAIRS = [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2]]; // [m, s], k = m·s²
function data1(rng) {
  const [m, s] = rng.pick(PAIRS);
  const k = m * s * s;
  const a = rng.chance(0.2) ? 0 : nz(rng, -3, 3);
  const h = a === 0 && rng.chance(0.5) ? 0 : rng.int(-3, 3);
  const xa = minusText(a);
  // (x − a), or x alone when a = 0.
  const px = a === 0 ? 'x' : `(${xa})`;
  const num = polyText([k - h * a, h - m * a, m]);
  const aff = affText(m, h);
  const rest = `${k}/${px}`;
  const x1 = a - s;
  const x2 = a + s;
  return {
    m, s, k, a, h, xa, px, aff, rest, f: `(${num})/${px}`, div: `${aff}+${rest}`,
    d1: `${m}-${k}/${px}^2`, d2: `${2 * k}/${px}^3`, x1, x2,
    y1: m * a + h - 2 * m * s, y2: m * a + h + 2 * m * s,
    odd: a === 0 && h === 0,
  };
}

function symDecision(d) {
  const why = d.odd ? 'f(−x) = −f(x) : f est impaire, sa courbe est symétrique par rapport à l\'origine.'
    : d.a !== 0 ? `Le domaine n'est pas symétrique par rapport à 0 (${fr(d.a)} en est exclu, pas ${fr(-d.a)}) : f n'est ni paire ni impaire.`
      : `f(−x) = ${RT(affText(-d.m, d.h))} − ${d.k}/x : ni f(x), ni −f(x).`;
  return D('Symétries : f est', [
    { id: 'none', label: 'ni paire ni impaire', valid: !d.odd, why },
    { id: 'odd', label: 'impaire (symétrique par rapport à l\'origine)', valid: d.odd, why },
    { id: 'even', label: 'paire (symétrique par rapport à l\'axe Oy)', valid: false, why },
  ]);
}
function posDecision(d, side) {
  const above = side === '+';
  const why = `f(x) − (${RT(d.aff)}) = ${RT(d.rest)}, ${above ? 'positif' : 'négatif'} pour x ${side === '+' ? '>' : '&lt;'} ${fr(d.a)} : la courbe est ${above ? 'au-dessus' : 'en dessous'}.`;
  return D(`Pour x ${side === '+' ? '>' : '<'} ${fr(d.a)}, la courbe de f est :`, [
    { id: 'above', label: 'au-dessus de l\'asymptote oblique', valid: above, why, ...(above ? {} : { rule: 'g6_sketch_crosses_asymptote' }) },
    { id: 'below', label: 'en dessous de l\'asymptote oblique', valid: !above, why, ...(above ? { rule: 'g6_sketch_crosses_asymptote' } : {}) },
  ]);
}
function concDecisions(d) {
  const why = `f″(x) = ${RT(d.d2)} a le signe de x − ${fr(d.a)} : négatif à gauche de ${fr(d.a)}, positif à droite.`;
  return [
    D('Concavité : f est', [
      { id: 'cc', label: `concave sur ]−∞ ; ${fr(d.a)}[ et convexe sur ]${fr(d.a)} ; +∞[`, valid: true, why },
      { id: 'vc', label: `convexe sur ]−∞ ; ${fr(d.a)}[ et concave sur ]${fr(d.a)} ; +∞[`, valid: false, why },
      { id: 'all', label: 'convexe sur tout son domaine', valid: false, why },
    ]),
    D('Point d\'inflexion ?', [
      { id: 'none', label: `aucun : f″ change de signe en ${fr(d.a)}, mais ${fr(d.a)} n'est pas dans le domaine`, valid: true },
      { id: 'a', label: `oui, en x = ${fr(d.a)}`, valid: false, why: `${fr(d.a)} n'est pas dans le domaine : la courbe n'a pas de point d'abscisse ${fr(d.a)}.` },
    ]),
  ];
}
function extDecision(x0, kind, sL, sR) {
  const w = (s) => (s < 0 ? 'f′ &lt; 0' : 'f′ > 0');
  const why = `Juste à gauche de ${fr(x0)}, ${w(sL)} ; juste à droite, ${w(sR)} : ${KIND_WORD[kind]}.`;
  return D(`En x = ${fr(x0)}, f′ s'annule. Ce point est :`, [
    { id: 'max', label: 'un maximum local', valid: kind === 'max', why },
    { id: 'min', label: 'un minimum local', valid: kind === 'min', why },
    { id: 'none', label: 'pas un extremum', valid: kind === 'none', why },
  ]);
}

function parts1(d, level, side) {
  const domain = part('Domaine de f :', 'D =', d.f, { kind: 'solset', v: V, exprDomain: true },
    [E(`]-∞;${d.a}[∪]${d.a};+∞[`, `${fr(d.a)} annule le dénominateur`, 'domain', 'domain')]);
  const vert = part(`Limite en ${fr(d.a)}⁺ :`, 'lim f =', d.f, { kind: 'limit', v: V, to: String(d.a), dir: '+' },
    [E(d.rest, `Le numérateur tend vers ${d.k}`, 'asym', 'asym'), E('+∞', `Asymptote verticale x = ${fr(d.a)}`, 'asym', 'asym')], [symDecision(d)]);
  const divLine = E(d.div, 'Division euclidienne', 'asym', 'asym');
  const division = part('Division euclidienne :', 'f(x) =', d.f, { kind: 'equiv', vars: [V], domain: { x: [d.a + 0.3, d.a + 4] }, target: 'partial-fractions' },
    [level <= 2 ? blanked(divLine, [d.aff]) : divLine]);
  const asym = part('Asymptote oblique (en ±∞) :', 'y =', 'mx+h', { kind: 'equiv', vars: ['x', 'm', 'h'], subst: { m: N(d.m), h: N(d.h) }, target: 'only', finalVars: ['x'] },
    [E(d.aff, 'Le quotient de la division', 'asym', 'asym')], [posDecision(d, side)]);
  const d1Line = E(d.d1, 'La dérivée de k/(x − a) est −k/(x − a)²', 'variation', 'deriv');
  const deriv1 = part('Dérivée :', 'f′(x) =', `d(${d.div})`, { kind: 'equiv', vars: [V], domain: { x: [d.a + 0.3, d.a + 4] }, target: 'no-prime' },
    [level === 2 ? blanked(d1Line, [`${d.px}^2`]) : d1Line]);
  const sq = `${d.px}^2=${d.s * d.s}`;
  const zeros = part('Zéros de f′ :', 'f′(x) = 0 ⇔', `${d.d1}=0`, { kind: 'solset', v: V },
    [level === 2 ? blanked(E(sq, 'Isoler le carré', 'variation', 'deriv'), [String(d.s * d.s)]) : E(sq, 'Isoler le carré', 'variation', 'deriv'),
      E(`x=${d.x1} ou x=${d.x2}`, 'Racine carrée', 'variation', 'deriv')]);
  const deriv2 = part('Dérivée seconde :', 'f″(x) =', `d(${d.d1})`, { kind: 'equiv', vars: [V], domain: { x: [d.a + 0.3, d.a + 4] }, target: 'no-prime' },
    [E(d.d2, 'Dériver −k(x − a)⁻²', 'concavity', 'second')]);
  const val = (x0, y0, pre) => part(`Valeur au point x = ${fr(x0)} :`, `f(${fr(x0)}) =`, atText(d.div, V, x0), { kind: 'value' },
    [E(N(y0), 'Calculer', 'table', 'table')], pre);
  const ext1 = val(d.x1, d.y1, [...concDecisions(d), extDecision(d.x1, 'max', 1, -1)]);
  const ext2 = val(d.x2, d.y2, [extDecision(d.x2, 'min', -1, 1)]);
  return { domain, vert, division, asym, deriv1, zeros, deriv2, ext1, ext2 };
}

function item1(level, rng, opts) {
  const d = data1(rng);
  const p = parts1(d, level, level <= 2 ? '+' : rng.pick(['+', '-']));
  const before = [];
  let parts;
  if (level === 1) {
    before.push(NOTE(`Les calculs sont faits : f(x) = ${MT(d.div)} ; f′(x) = ${MT(d.d1)}, nulle en x = ${fr(d.x1)} et x = ${fr(d.x2)} ; f″(x) = ${MT(d.d2)}. Remplis le tableau.`));
    const asym = { ...p.asym, lines: [blanked(p.asym.lines[0], [[String(Math.abs(d.h || d.m)), -1]])] };
    parts = [asym, p.ext1, p.ext2];
  } else if (level === 2) {
    before.push(NOTE(`La division donne f(x) = ${MT(d.div)}, et f″(x) = ${MT(d.d2)}.`));
    parts = [p.deriv1, p.zeros, p.asym, p.ext1, p.ext2];
  } else if (level === 3) parts = [p.division, p.asym, p.deriv1, p.zeros, p.deriv2, p.ext1, p.ext2];
  else parts = [p.domain, p.vert, p.division, p.asym, p.deriv1, p.zeros, p.deriv2, p.ext1, p.ext2];
  const { start, judge, script } = partsScript(parts, level, SF_CHOICES, before);
  const lv = opts.exam ? 4 : level;
  return linesItem({
    skill: SF, level: lv,
    prompt: `Étudie la fonction f(x) = ${MT(d.f)} : ${level >= 4 ? 'domaine, symétries, asymptotes, variation, concavité, ' : ''}valeurs du tableau${level <= 2 ? '' : ' et position de la courbe'}.`,
    start, judge, mode: modeOf(level), script,
    hints: H(
      `Fais la division : f(x) = ${MT(d.div)}. Tout se lit mieux : asymptote y = ${MT(d.aff)}, et f′ se calcule terme par terme.`,
      `f′(x) = ${MT(`${d.m}-${d.k}/□`)}`,
      `f′(x) = ${MT(d.d1)}, nulle en x = ${fr(d.x1)} (max) et x = ${fr(d.x2)} (min).`,
    ),
    subgoals: usedSubgoals(SF_SUB, script), keys: [...KEYS, 'set', 'relation'], tapActions: level === 3 ? 'steps' : null,
    key: `${SF}:${level}:${d.f}`, exam: examTag(opts, 6),
  });
}

// ---------- template 2: |x − a| + k/x ----------

function data2(rng) {
  for (let i = 0; i < 200; i++) {
    const a = nz(rng, -3, 3);
    const s = rng.pick([1, 2, 3]);
    const k = rng.pick([1, -1]) * s * s;
    const d = build2(a, k);
    if (!d.zeros.length) continue;
    return d;
  }
  return { ...build2(-1, 4), fallback: true };
}
function build2(a, k) {
  const kx = (p) => sgnTerm(`${k}/x${p ? `^${p}` : ''}`);
  const R = `${minusText(a)}${kx(0)}`;
  const L = `${polyText([a, -1])}${kx(0)}`;
  const dR = `1${sgnTerm(`${-k}/x^2`)}`;
  const dL = `-1${sgnTerm(`${-k}/x^2`)}`;
  const f = `|${minusText(a)}|${kx(0)}`;
  const fd = (x, side) => (side === '+' ? 1 : -1) - k / (x * x);
  const val = (x) => q(Math.abs(x - a)).add(q(k, x));
  const eps = 1e-3;
  const kindAt = (x0, sL, sR) => (sL < 0 && sR > 0 ? 'min' : sL > 0 && sR < 0 ? 'max' : 'none');
  // The angular point a.
  const lv = q(-1).sub(q(k, a * a));
  const rv = q(1).sub(q(k, a * a));
  const angular = { lv, rv, fv: q(k, a), kind: kindAt(a, Math.sign(fd(a - eps, '-')), Math.sign(fd(a + eps, '+'))) };
  angular.sL = Math.sign(fd(a - eps, '-'));
  angular.sR = Math.sign(fd(a + eps, '+'));
  // Zeros of f′: x² = k on the right piece, x² = −k on the left one.
  const s = Math.sqrt(Math.abs(k));
  const side = k > 0 ? '+' : '-';
  const zeros = [-s, s].filter((x) => (side === '+' ? x > a : x < a) && x !== 0).map((x) => {
    const sL = Math.sign(fd(x - eps, side));
    const sR = Math.sign(fd(x + eps, side));
    return { x, y: val(x), kind: kindAt(x, sL, sR), sL, sR };
  });
  return { a, k, s, f, R, L, dR, dL, angular, zeros, side };
}

function item2(level, rng, opts) {
  const d = data2(rng);
  const { a, k } = d;
  const lo = Math.max(a, 0);
  const hi = Math.min(a, 0);
  const pieceJ = (dom, goal) => ({ kind: 'equiv', vars: [V], domain: { x: dom }, target: 'short', goal, slack: 0 });
  const derJ = (dom) => ({ kind: 'equiv', vars: [V], domain: { x: dom }, target: 'no-prime' });
  const right = [lo + 0.3, lo + 3];
  const left = [hi - 3, hi - 0.3];
  const ang = d.angular;
  const w = (s) => (s < 0 ? 'f′ &lt; 0' : 'f′ > 0');
  const angWhy = `Juste à gauche de ${fr(a)}, ${w(ang.sL)} ; juste à droite, ${w(ang.sR)} : ${KIND_WORD[ang.kind]}.`;
  const above = k > 0;
  const posWhy = `f(x) − (${RT(minusText(a))}) = ${RT(`${k}/x`)} est ${above ? 'positif' : 'négatif'} pour x > 0.`;
  const zText = d.zeros.map((z) => `x=${z.x}`).join(' ou ');
  const parts = [
    part('Domaine de f :', 'D =', d.f, { kind: 'solset', v: V, exprDomain: true }, [E(']-∞;0[∪]0;+∞[', '0 annule le dénominateur', 'domain')]),
    part(`Pour x > ${fr(a)} :`, 'f(x) =', d.f, pieceJ(right, d.R), [E(d.R, `|${RT(minusText(a))}| = ${RT(minusText(a))}`, 'angular')]),
    part(`Pour x &lt; ${fr(a)} :`, 'f(x) =', d.f, pieceJ(left, d.L), [E(d.L, `|${RT(minusText(a))}| = ${RT(polyText([a, -1]))}`, 'angular')]),
    part('Limite en 0⁺ :', 'lim f =', d.f, { kind: 'limit', v: V, to: '0', dir: '+' },
      [E(`${k}/x`, `|${RT(minusText(a))}| tend vers ${Math.abs(a)}`, 'asym'), E(k > 0 ? '+∞' : '-∞', 'Asymptote verticale x = 0', 'asym')]),
    part('Asymptote en +∞ :', 'y =', 'mx+h', { kind: 'equiv', vars: ['x', 'm', 'h'], subst: { m: '1', h: N(-a) }, target: 'only', finalVars: ['x'] },
      [E(minusText(a), `f(x) = ${RT(d.R)} et ${RT(`${k}/x`)} → 0`, 'asym')]),
    part('Asymptote en −∞ :', 'y =', 'mx+h', { kind: 'equiv', vars: ['x', 'm', 'h'], subst: { m: '-1', h: N(a) }, target: 'only', finalVars: ['x'] },
      [E(polyText([a, -1]), `f(x) = ${RT(d.L)}`, 'asym')],
      [D('En +∞, la courbe est :', [
        { id: 'above', label: 'au-dessus de son asymptote', valid: above, why: posWhy, ...(above ? {} : { rule: 'g6_sketch_crosses_asymptote' }) },
        { id: 'below', label: 'en dessous de son asymptote', valid: !above, why: posWhy, ...(above ? { rule: 'g6_sketch_crosses_asymptote' } : {}) },
      ])]),
    part(`Pour x > ${fr(a)} :`, 'f′(x) =', `d(${d.f})`, derJ(right), [E(d.dR, 'Dériver le morceau de droite', 'variation')]),
    part(`Pour x &lt; ${fr(a)} :`, 'f′(x) =', `d(${d.f})`, derJ(left), [E(d.dL, 'Dériver le morceau de gauche', 'variation')]),
    part(`Dérivée à gauche en ${fr(a)} :`, `f′(${fr(a)}⁻) =`, d.dL, { kind: 'limit', v: V, to: String(a), dir: '-', other: d.dR },
      [E(atText(d.dL, V, a), 'x = a dans la dérivée de gauche', 'angular'), E(N(ang.lv), 'Calculer', 'angular')]),
    part(`Dérivée à droite en ${fr(a)} :`, `f′(${fr(a)}⁺) =`, d.dR, { kind: 'limit', v: V, to: String(a), dir: '+', other: d.dL },
      [E(atText(d.dR, V, a), 'x = a dans la dérivée de droite', 'angular'), E(N(ang.rv), 'Calculer', 'angular')]),
    part(`Le point anguleux A(${fr(a)} ; f(${fr(a)})) :`, `f(${fr(a)}) =`, atText(d.f, V, a), { kind: 'value' }, [E(N(ang.fv), 'Calculer', 'table')], [
      D(`f′(${fr(a)}⁻) = ${fr(N(ang.lv))} et f′(${fr(a)}⁺) = ${fr(N(ang.rv))}. En x = ${fr(a)}, f a :`, [
        { id: 'angular', label: 'un point anguleux', valid: true },
        { id: 'smooth', label: 'une tangente : f y est dérivable', valid: false, rule: 'g6_angular_not_seen', why: 'Les dérivées latérales diffèrent : f n\'est pas dérivable en ce point.' },
      ]),
      D('Ce point anguleux est-il un extremum local ?', [
        { id: 'min', label: 'oui, un minimum local', valid: ang.kind === 'min', why: angWhy },
        { id: 'max', label: 'oui, un maximum local', valid: ang.kind === 'max', why: angWhy },
        { id: 'none', label: 'non', valid: ang.kind === 'none', why: angWhy },
      ]),
    ]),
    part(`Zéros de f′ pour x ${d.side === '+' ? '>' : '&lt;'} ${fr(a)} :`, 'f′(x) = 0 ⇔', `${d.side === '+' ? d.dR : d.dL}=0`,
      { kind: 'solset', v: V, domain: d.side === '+' ? `]${a};+∞[` : `]-∞;${a}[` },
      [E(`x^2=${d.s * d.s}`, 'Isoler x²', 'variation'), E(zText, `Garder les solutions ${d.side === '+' ? 'plus grandes' : 'plus petites'} que ${fr(a)}`, 'variation')]),
    ...d.zeros.map((z) => part(`Valeur en x = ${fr(z.x)} :`, `f(${fr(z.x)}) =`, atText(d.f, V, z.x), { kind: 'value' }, [E(N(z.y), 'Calculer', 'table')],
      [D(`En x = ${fr(z.x)}, f′ s'annule. Ce point est :`, [
        { id: 'max', label: 'un maximum local', valid: z.kind === 'max', why: `Juste à gauche, ${w(z.sL)} ; juste à droite, ${w(z.sR)}.` },
        { id: 'min', label: 'un minimum local', valid: z.kind === 'min', why: `Juste à gauche, ${w(z.sL)} ; juste à droite, ${w(z.sR)}.` },
        { id: 'none', label: 'pas un extremum', valid: z.kind === 'none', why: `Juste à gauche, ${w(z.sL)} ; juste à droite, ${w(z.sR)}.` },
      ])])),
  ];
  const { start, judge, script } = partsScript(parts, 5, null);
  return linesItem({
    skill: SF, level: opts.exam ? 4 : 5,
    prompt: `Étudie f(x) = ${MT(d.f)} : domaine, asymptotes (de chaque côté), point anguleux, extrema, position de la courbe.`,
    start, judge, mode: 'free', script, hints: [], noHints: true,
    subgoals: usedSubgoals(SF_SUB, script), keys: [...KEYS, 'set', 'relation'],
    key: `${SF}:abs:${d.f}`, exam: examTag(opts, 6), fallback: d.fallback,
  });
}

function sfItem(level, rng, opts = {}) {
  let it;
  if (opts.exam === 'open') it = rng.chance(0.5) ? item2(5, rng, opts) : item1(4, rng, opts);
  else it = level === 5 ? item2(level, rng, opts) : item1(level, rng, opts);
  return { ...it, baits: [...new Set([...it.baits, 'g6_sketch_crosses_asymptote'])] };
}

export const GEN = {
  [SF]: (level, rng, profile, opts = {}) => sfItem(level, rng, opts),
};
