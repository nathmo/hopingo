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
import { asProblem } from './kit-problem.js';
import {
  q, N, RT, nz, modeOf, H, E, D, NOTE, polyText, affText, minusText, atText, blanked, part, partsScript, usedSubgoals,
  KEYS,
} from './analyse0-c-util.js';
import { t } from '../../i18n.js';

const V = 'x';
const SF = 'g6-study-full';
const sgnTerm = (s) => (s.startsWith('-') ? s : `+${s}`);
const SF_SUB = [
  { id: 'domain', label: t('domaine et symétries'), skill: 'g1-parity-period' },
  { id: 'asym', label: t('asymptotes'), skill: 'g6-asymptotes' },
  { id: 'variation', label: t('variation et extrema'), skill: 'g6-sign-variation' },
  { id: 'concavity', label: t('concavité'), skill: 'g6-convexity' },
  { id: 'angular', label: t('point anguleux'), skill: 'g6-angular-points' },
  { id: 'table', label: t('tableau récapitulatif'), skill: SF },
];
const SF_CHOICES = [
  { id: 'domain', label: t('Domaine et symétries') },
  { id: 'asym', label: t('Asymptotes : diviser, puis y = mx + h') },
  { id: 'deriv', label: t('f′, ses zéros et la variation') },
  { id: 'second', label: t('f″ et la concavité') },
  { id: 'table', label: t('Valeurs des extrema pour le tableau') },
];
const KIND_WORD = { min: t('un minimum local'), max: t('un maximum local'), none: t('pas un extremum') };

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
  const why = d.odd ? t('f(−x) = −f(x) : f est impaire, sa courbe est symétrique par rapport à l\'origine.')
    : d.a !== 0 ? t('Le domaine n\'est pas symétrique par rapport à 0 ({a} en est exclu, pas {b}) : f n\'est ni paire ni impaire.', { a: fr(d.a), b: fr(-d.a) })
      : t('f(−x) = {e} − {k}/x : ni f(x), ni −f(x).', { e: RT(affText(-d.m, d.h)), k: d.k });
  return D(t('Symétries : f est'), [
    { id: 'none', label: t('ni paire ni impaire'), valid: !d.odd, why },
    { id: 'odd', label: t('impaire (symétrique par rapport à l\'origine)'), valid: d.odd, why },
    { id: 'even', label: t('paire (symétrique par rapport à l\'axe Oy)'), valid: false, why },
  ]);
}
function posDecision(d, side) {
  const above = side === '+';
  const wv = { l: RT(d.aff), r: RT(d.rest), a: fr(d.a) };
  const why = above ? t('f(x) − ({l}) = {r}, positif pour x > {a} : la courbe est au-dessus.', wv) : t('f(x) − ({l}) = {r}, négatif pour x &lt; {a} : la courbe est en dessous.', wv);
  return D(t('Pour x {rel} {a}, la courbe de f est :', { rel: side === '+' ? '>' : '<', a: fr(d.a) }), [
    { id: 'above', label: t('au-dessus de l\'asymptote oblique'), valid: above, why, ...(above ? {} : { rule: 'g6_sketch_crosses_asymptote' }) },
    { id: 'below', label: t('en dessous de l\'asymptote oblique'), valid: !above, why, ...(above ? { rule: 'g6_sketch_crosses_asymptote' } : {}) },
  ]);
}
function concDecisions(d) {
  const a = fr(d.a);
  const why = t('f″(x) = {e} a le signe de x − {a} : négatif à gauche de {a}, positif à droite.', { e: RT(d.d2), a });
  return [
    D(t('Concavité : f est'), [
      { id: 'cc', label: t('concave sur ]−∞ ; {a}[ et convexe sur ]{a} ; +∞[', { a }), valid: true, why },
      { id: 'vc', label: t('convexe sur ]−∞ ; {a}[ et concave sur ]{a} ; +∞[', { a }), valid: false, why },
      { id: 'all', label: t('convexe sur tout son domaine'), valid: false, why },
    ]),
    D(t('Point d\'inflexion ?'), [
      { id: 'none', label: t('aucun : f″ change de signe en {a}, mais {a} n\'est pas dans le domaine', { a }), valid: true },
      { id: 'a', label: t('oui, en x = {a}', { a }), valid: false, why: t('{a} n\'est pas dans le domaine : la courbe n\'a pas de point d\'abscisse {a}.', { a }) },
    ]),
  ];
}
function extDecision(x0, kind, sL, sR) {
  const w = (s) => (s < 0 ? 'f′ &lt; 0' : 'f′ > 0');
  const why = t('Juste à gauche de {x}, {sl} ; juste à droite, {sr} : {k}.', { x: fr(x0), sl: w(sL), sr: w(sR), k: KIND_WORD[kind] });
  return D(t('En x = {x}, f′ s\'annule. Ce point est :', { x: fr(x0) }), [
    // A zero of f′ without a change of sign taken for an extremum.
    { id: 'max', label: t('un maximum local'), valid: kind === 'max', why, ...(kind === 'none' ? { rule: 'g6_critical_is_extremum' } : {}) },
    { id: 'min', label: t('un minimum local'), valid: kind === 'min', why, ...(kind === 'none' ? { rule: 'g6_critical_is_extremum' } : {}) },
    { id: 'none', label: t('pas un extremum'), valid: kind === 'none', why },
  ]);
}

function parts1(d, level, side) {
  const domain = part(t('Domaine de f :'), 'D =', d.f, { kind: 'solset', v: V, exprDomain: true },
    [E(`]-∞;${d.a}[∪]${d.a};+∞[`, t('{a} annule le dénominateur', { a: fr(d.a) }), 'domain', 'domain')]);
  const vert = part(t('Limite en {x} :', { x: `${fr(d.a)}⁺` }), 'lim f =', d.f, { kind: 'limit', v: V, to: String(d.a), dir: '+' },
    [E(d.rest, t('Le numérateur tend vers {k}', { k: d.k }), 'asym', 'asym'), E('+∞', t('Asymptote verticale x = {a}', { a: fr(d.a) }), 'asym', 'asym')], [symDecision(d)]);
  const divLine = E(d.div, t('Division euclidienne'), 'asym', 'asym');
  const division = part(t('Division euclidienne :'), 'f(x) =', d.f, { kind: 'equiv', vars: [V], domain: { x: [d.a + 0.3, d.a + 4] }, target: 'partial-fractions' },
    [level <= 2 ? blanked(divLine, [d.aff]) : divLine]);
  const asym = part(t('Asymptote oblique (en ±∞) :'), 'y =', 'mx+h', { kind: 'equiv', vars: ['x', 'm', 'h'], subst: { m: N(d.m), h: N(d.h) }, target: 'only', finalVars: ['x'] },
    [E(d.aff, t('Le quotient de la division'), 'asym', 'asym')], [posDecision(d, side)]);
  const d1Line = E(d.d1, t('La dérivée de k/(x − a) est −k/(x − a)²'), 'variation', 'deriv');
  const deriv1 = part(t('Dérivée :'), 'f′(x) =', `d(${d.div})`, { kind: 'equiv', vars: [V], domain: { x: [d.a + 0.3, d.a + 4] }, target: 'no-prime' },
    [level === 2 ? blanked(d1Line, [`${d.px}^2`]) : d1Line]);
  const sq = `${d.px}^2=${d.s * d.s}`;
  const zeros = part(t('Zéros de f′ :'), 'f′(x) = 0 ⇔', `${d.d1}=0`, { kind: 'solset', v: V },
    [level === 2 ? blanked(E(sq, t('Isoler le carré'), 'variation', 'deriv'), [[String(d.s * d.s), -1]]) : E(sq, t('Isoler le carré'), 'variation', 'deriv'),
      E(`x=${d.x1} ou x=${d.x2}`, t('Racine carrée'), 'variation', 'deriv')]);
  const deriv2 = part(t('Dérivée seconde :'), 'f″(x) =', `d(${d.d1})`, { kind: 'equiv', vars: [V], domain: { x: [d.a + 0.3, d.a + 4] }, target: 'no-prime' },
    [E(d.d2, t('Dériver −k(x − a)⁻²'), 'concavity', 'second')]);
  const val = (x0, y0, pre) => part(t('Valeur au point x = {x} :', { x: fr(x0) }), `f(${fr(x0)}) =`, atText(d.div, V, x0), { kind: 'value' },
    [E(N(y0), t('Calculer'), 'table', 'table')], pre);
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
    before.push(NOTE(t('Les calculs sont faits : f(x) = {f} ; f′(x) = {d1}, nulle en x = {x1} et x = {x2} ; f″(x) = {d2}. Remplis le tableau.', { f: MT(d.div), d1: MT(d.d1), x1: fr(d.x1), x2: fr(d.x2), d2: MT(d.d2) })));
    const asym = { ...p.asym, lines: [blanked(p.asym.lines[0], [[String(Math.abs(d.h || d.m)), -1]])] };
    parts = [asym, p.ext1, p.ext2];
  } else if (level === 2) {
    before.push(NOTE(t('La division donne f(x) = {f}, et f″(x) = {d2}.', { f: MT(d.div), d2: MT(d.d2) })));
    parts = [p.deriv1, p.zeros, p.asym, p.ext1, p.ext2];
  } else if (level === 3) parts = [p.division, p.asym, p.deriv1, p.zeros, p.deriv2, p.ext1, p.ext2];
  else parts = [p.domain, p.vert, p.division, p.asym, p.deriv1, p.zeros, p.deriv2, p.ext1, p.ext2];
  const { start, judge, script } = partsScript(parts, level, SF_CHOICES, before);
  const lv = opts.exam ? 4 : level;
  return linesItem({
    skill: SF, level: lv,
    prompt: level >= 4 ? t('Étudie la fonction f(x) = {f} : domaine, symétries, asymptotes, variation, concavité, valeurs du tableau et position de la courbe.', { f: MT(d.f) })
      : level <= 2 ? t('Étudie la fonction f(x) = {f} : valeurs du tableau.', { f: MT(d.f) })
        : t('Étudie la fonction f(x) = {f} : valeurs du tableau et position de la courbe.', { f: MT(d.f) }),
    start, judge, mode: modeOf(level), script,
    hints: H(
      t('Fais la division : f(x) = {f}. Tout se lit mieux : asymptote y = {a}, et f′ se calcule terme par terme.', { f: MT(d.div), a: MT(d.aff) }),
      `f′(x) = ${MT(`${d.m}-${d.k}/□`)}`,
      t('f′(x) = {d1}, nulle en x = {x1} (max) et x = {x2} (min).', { d1: MT(d.d1), x1: fr(d.x1), x2: fr(d.x2) }),
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
  const angWhy = t('Juste à gauche de {x}, {sl} ; juste à droite, {sr} : {k}.', { x: fr(a), sl: w(ang.sL), sr: w(ang.sR), k: KIND_WORD[ang.kind] });
  const above = k > 0;
  const pw = { l: RT(minusText(a)), r: RT(`${k}/x`) };
  const posWhy = above ? t('f(x) − ({l}) = {r} est positif pour x > 0.', pw) : t('f(x) − ({l}) = {r} est négatif pour x > 0.', pw);
  const zText = d.zeros.map((z) => `x=${z.x}`).join(' ou ');
  const zWhy = (z) => t('Juste à gauche, {sl} ; juste à droite, {sr}.', { sl: w(z.sL), sr: w(z.sR) });
  const parts = [
    part(t('Domaine de f :'), 'D =', d.f, { kind: 'solset', v: V, exprDomain: true }, [E(']-∞;0[∪]0;+∞[', t('{a} annule le dénominateur', { a: '0' }), 'domain')]),
    part(t('Pour x > {a} :', { a: fr(a) }), 'f(x) =', d.f, pieceJ(right, d.R), [E(d.R, `|${RT(minusText(a))}| = ${RT(minusText(a))}`, 'angular')]),
    part(t('Pour x &lt; {a} :', { a: fr(a) }), 'f(x) =', d.f, pieceJ(left, d.L), [E(d.L, `|${RT(minusText(a))}| = ${RT(polyText([a, -1]))}`, 'angular')]),
    part(t('Limite en {x} :', { x: '0⁺' }), 'lim f =', d.f, { kind: 'limit', v: V, to: '0', dir: '+' },
      [E(`${k}/x`, t('{u} tend vers {n}', { u: `|${RT(minusText(a))}|`, n: Math.abs(a) }), 'asym'), E(k > 0 ? '+∞' : '-∞', t('Asymptote verticale x = {a}', { a: '0' }), 'asym')]),
    part(t('Asymptote en +∞ :'), 'y =', 'mx+h', { kind: 'equiv', vars: ['x', 'm', 'h'], subst: { m: '1', h: N(-a) }, target: 'only', finalVars: ['x'] },
      [E(minusText(a), t('f(x) = {f} et {r} → 0', { f: RT(d.R), r: RT(`${k}/x`) }), 'asym')]),
    part(t('Asymptote en −∞ :'), 'y =', 'mx+h', { kind: 'equiv', vars: ['x', 'm', 'h'], subst: { m: '-1', h: N(a) }, target: 'only', finalVars: ['x'] },
      [E(polyText([a, -1]), `f(x) = ${RT(d.L)}`, 'asym')],
      [D(t('En +∞, la courbe est :'), [
        { id: 'above', label: t('au-dessus de son asymptote'), valid: above, why: posWhy, ...(above ? {} : { rule: 'g6_sketch_crosses_asymptote' }) },
        { id: 'below', label: t('en dessous de son asymptote'), valid: !above, why: posWhy, ...(above ? { rule: 'g6_sketch_crosses_asymptote' } : {}) },
      ])]),
    part(t('Pour x > {a} :', { a: fr(a) }), 'f′(x) =', `d(${d.f})`, derJ(right), [E(d.dR, t('Dériver le morceau de droite'), 'variation')]),
    part(t('Pour x &lt; {a} :', { a: fr(a) }), 'f′(x) =', `d(${d.f})`, derJ(left), [E(d.dL, t('Dériver le morceau de gauche'), 'variation')]),
    part(t('Dérivée à gauche en {a} :', { a: fr(a) }), `f′(${fr(a)}⁻) =`, d.dL, { kind: 'limit', v: V, to: String(a), dir: '-', other: d.dR },
      [E(atText(d.dL, V, a), t('x = a dans la dérivée de gauche'), 'angular'), E(N(ang.lv), t('Calculer'), 'angular')]),
    part(t('Dérivée à droite en {a} :', { a: fr(a) }), `f′(${fr(a)}⁺) =`, d.dR, { kind: 'limit', v: V, to: String(a), dir: '+', other: d.dL },
      [E(atText(d.dR, V, a), t('x = a dans la dérivée de droite'), 'angular'), E(N(ang.rv), t('Calculer'), 'angular')]),
    part(t('Le point anguleux A({a} ; f({a})) :', { a: fr(a) }), `f(${fr(a)}) =`, atText(d.f, V, a), { kind: 'value' }, [E(N(ang.fv), t('Calculer'), 'table')], [
      D(t('f′({a}⁻) = {L} et f′({a}⁺) = {R}. En x = {a}, f a :', { a: fr(a), L: fr(N(ang.lv)), R: fr(N(ang.rv)) }), [
        { id: 'angular', label: t('un point anguleux'), valid: true },
        { id: 'smooth', label: t('une tangente : f y est dérivable'), valid: false, rule: 'g6_angular_not_seen', why: t('Les dérivées latérales diffèrent : f n\'est pas dérivable en ce point.') },
      ]),
      D(t('Ce point anguleux est-il un extremum local ?'), [
        { id: 'min', label: t('oui, un minimum local'), valid: ang.kind === 'min', why: angWhy },
        { id: 'max', label: t('oui, un maximum local'), valid: ang.kind === 'max', why: angWhy },
        { id: 'none', label: t('non'), valid: ang.kind === 'none', why: angWhy },
      ]),
    ]),
    part(t('Zéros de f′ pour x {rel} {a} :', { rel: d.side === '+' ? '>' : '&lt;', a: fr(a) }), 'f′(x) = 0 ⇔', `${d.side === '+' ? d.dR : d.dL}=0`,
      { kind: 'solset', v: V, domain: d.side === '+' ? `]${a};+∞[` : `]-∞;${a}[` },
      [E(`x^2=${d.s * d.s}`, t('Isoler x²'), 'variation'), E(zText, d.side === '+' ? t('Garder les solutions plus grandes que {a}', { a: fr(a) }) : t('Garder les solutions plus petites que {a}', { a: fr(a) }), 'variation')]),
    ...d.zeros.map((z) => part(t('Valeur en x = {x} :', { x: fr(z.x) }), `f(${fr(z.x)}) =`, atText(d.f, V, z.x), { kind: 'value' }, [E(N(z.y), t('Calculer'), 'table')],
      [D(t('En x = {x}, f′ s\'annule. Ce point est :', { x: fr(z.x) }), [
        { id: 'max', label: t('un maximum local'), valid: z.kind === 'max', why: zWhy(z), ...(z.kind === 'none' ? { rule: 'g6_critical_is_extremum' } : {}) },
        { id: 'min', label: t('un minimum local'), valid: z.kind === 'min', why: zWhy(z), ...(z.kind === 'none' ? { rule: 'g6_critical_is_extremum' } : {}) },
        { id: 'none', label: t('pas un extremum'), valid: z.kind === 'none', why: zWhy(z) },
      ])])),
  ];
  const { start, judge, script } = partsScript(parts, 5, null);
  return linesItem({
    skill: SF, level: opts.exam ? 4 : 5,
    prompt: t('Étudie f(x) = {f} : domaine, asymptotes (de chaque côté), point anguleux, extrema, position de la courbe.', { f: MT(d.f) }),
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

// Step U4: level 5 and the open variant are `problem` items (one part,
// its segments the steps; 6 points as in the catalogue's barème).
export const GEN = {
  [SF]: (level, rng, profile, opts = {}) => {
    const it = sfItem(level, rng, opts);
    return level === 5 || opts.exam === 'open' ? asProblem(it, 6) : it;
  },
};
