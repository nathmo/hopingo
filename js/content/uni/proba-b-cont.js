// Generators of module P, part b (step U7): densities, quantiles, uniform
// and exponential laws, moments, families of laws. Catalogue:
// docs/universite/P-probabilites.md. Tools: proba-kit.js, proba-b-kit.js;
// traps: js/cas/rules/pb.js.
//
// Each item is a lines item of named values (judges prob and stat, errors
// carried forward with $names); expressions in x, θ or λ (F, f, E in θ) are
// parts of the prob judge with `vars`. Levels: 1–2 guided (blanks, the
// decision shown then chosen), 3 « choose the action », 4 free, 5 alone.

import { statItem, coefItem, openItem, choice, tf, numCounter, H, SM, examTag } from './proba-kit.js';
import { MT } from './kit.js';
import { q, qt, qs, ql, dx, dl, fr, par } from './proba-b-kit.js';
import { t } from '../../i18n.js';

const pq = (x) => (qt(x).includes('/') || qt(x).startsWith('-') ? `(${qt(x)})` : qt(x));
const X = (s) => MT(s, { vars: ['x'] });
const pickOf = (rng, xs) => xs[rng.int(0, xs.length - 1)];

// ======================================================================
// p-cont-density
// ======================================================================

const CD = 'p-cont-density';
const CD_SUB = [
  { id: 'int', label: t('primitiver'), skill: 'a1-int-direct' },
  { id: 'improper', label: t('borne infinie'), skill: 'a1-improper-calc' },
  { id: 'norm', label: t('normaliser, F, probabilité'), skill: CD },
];

// A density c·kernel on its support: {kind, kernel, support, I (∫ kernel), c,
// Ilines, wrongI (other bounds), F(x) text, f text, prob part}.
function cdData(rng, kinds) {
  const kind = pickOf(rng, kinds);
  if (kind === 'pow') {
    const k = rng.int(1, 4);
    const a = rng.int(1, 3);
    const I = q(a ** (k + 1), k + 1);
    const tt = pickOf(rng, a === 1 ? [q(1, 2)] : [q(1), q(a, 2)].filter((x) => x.cmp(a) < 0));
    const P = tt.div(a).pow(k + 1);
    return {
      kind, k, a, I, c: I.inv(), improper: false,
      kernel: k === 1 ? 'x' : `x^${k}`, support: `[0 ; ${a}]`, supportT: `0 ≤ x ≤ ${a}`,
      Ilines: [{ math: `${a}^${k + 1}/${k + 1}`, blank: [`${k + 1}`], note: `∫₀^${a} x^${k} dx = [x^${k + 1}/${k + 1}]₀^${a}`, subgoal: 'int' }, { math: qt(I), blank: [qt(I)] }],
      wrongI: a === 1 ? null : q(1, k + 1),
      F: a === 1 ? `x^${k + 1}` : `(x/${a})^${k + 1}`, Fdom: [0.1 * a, 0.9 * a], Fout: t('F(x) = 0 si x < 0 et F(x) = 1 si x > {a}', { a }),
      prob: { label: `Pr(X≤${qt(tt)})`, expect: `$c*(${qt(tt)})^${k + 1}/${k + 1}`, value: P, lines: [{ math: `${pq(tt.div(a))}^${k + 1}`, blank: [`${k + 1}`] }, { math: qt(P), blank: [qt(P)] }], f: qt(I.inv().mul(tt.pow(k))), ft: I.inv().mul(tt.pow(k)), F: P },
    };
  }
  if (kind === 'parab') {
    const a = rng.int(2, 3);
    const I = q(a ** 3, 6);
    const P = q(3 * a - 2, a ** 3);
    return {
      kind, a, I, c: I.inv(), improper: false,
      kernel: `x(${a}-x)`, support: `[0 ; ${a}]`, supportT: `0 ≤ x ≤ ${a}`,
      Ilines: [{ math: `${a ** 3}/2-${a ** 3}/3`, blank: [`${a ** 3}/3`], note: `∫₀^${a} (${a}x − x²) dx = [${a}x²/2 − x³/3]₀^${a}`, subgoal: 'int' }, { math: qt(I), blank: [qt(I)] }],
      wrongI: q(3 * a - 2, 6),
      prob: { label: 'Pr(X≤1)', expect: `$c*(${a}/2-1/3)`, value: P, lines: [{ math: `${qt(I.inv())}×(${a}/2-1/3)`, blank: [`${a}/2-1/3`] }, { math: qt(P), blank: [qt(P)] }], f: qt(I.inv().mul(a - 1)), ft: I.inv().mul(a - 1), F: P },
    };
  }
  if (kind === 'pareto') {
    const al = rng.int(2, 5);
    const tt = rng.int(2, 3);
    const P = q(1, tt ** al);
    return {
      kind, al, I: q(1, al), c: q(al), improper: true,
      kernel: `x^(-${al + 1})`, support: '[1 ; ∞[', supportT: 'x ≥ 1',
      Ilines: [{ math: `0-(-1/${al})`, blank: [`1/${al}`], note: `∫₁^∞ x^(−${al + 1}) dx = [−x^(−${al})/${al}]₁^∞`, subgoal: 'improper' }, { math: `1/${al}`, blank: [`1/${al}`] }],
      wrongI: null,
      F: `1-x^(-${al})`, Fdom: [1.1, 5], Fout: t('F(x) = 0 si x < 1'),
      prob: { label: `Pr(X>${tt})`, expect: `$c*${tt}^(-${al})/${al}`, value: P, lines: [{ math: `${tt}^(-${al})`, blank: [`-${al}`] }, { math: qt(P), blank: [qt(P)] }], f: qt(q(al, tt ** (al + 1))), ft: q(al, tt ** (al + 1)), F: q(1).sub(P) },
      cond: { t1: 2, t2: 3, value: q(1, 2 ** al).sub(q(1, 3 ** al)).div(q(1).sub(q(1, 3 ** al))), wrong: q(1, 2 ** al).sub(q(1, 3 ** al)).div(q(1, 2 ** al)) },
    };
  }
  // exp: c·e^(−λx) on [0 ; ∞[.
  const lam = pickOf(rng, [q(1, 2), q(1), q(2), q(3)]);
  const tt = lam.eq(q(1, 2)) ? 2 : 1;
  const lt = lam.mul(tt);
  const P = 1 - Math.exp(-lt.valueOf());
  return {
    kind: 'exp', lam, I: lam.inv(), c: lam, improper: true,
    kernel: lam.eq(1) ? 'e^(-x)' : `e^(-${pq(lam)}x)`, support: '[0 ; ∞[', supportT: 'x ≥ 0',
    Ilines: lam.eq(1) ? [{ math: '0-(-1)', blank: ['-1'], note: '∫₀^∞ e^(−x) dx = [−e^(−x)]₀^∞', subgoal: 'improper' }, { math: '1', blank: ['1'] }]
      : [{ math: `0-(-1/${pq(lam)})`, blank: [`1/${pq(lam)}`], note: `∫₀^∞ e^(−${qs(lam)}x) dx = [−e^(−${qs(lam)}x)/${qs(lam)}]₀^∞`, subgoal: 'improper' }, { math: qt(lam.inv()), blank: [qt(lam.inv())] }],
    wrongI: null,
    prob: { label: `Pr(X≤${tt})`, kind: 'stat', expect: `$c*(1-e^(-${qt(lt)}))/${pq(lam)}`, value: P, lines: [{ math: `1-e^(-${qt(lt)})`, blank: [`-${qt(lt)}`] }, { math: dl(P, 3), blank: [dl(P, 3)] }], f: null },
  };
}

const cdDensityT = (d) => t('f(x) = c·{k} pour {s}, et 0 ailleurs', { k: d.kernel.replace(/\^\(-(\d+)\)/, '^(−$1)'), s: d.supportT });

function cdItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return cdMcq(rng, opts);
  if (opts.exam === 'tf') return cdTf(rng, opts);
  const kinds = level <= 2 ? ['pow', 'pareto', 'exp'] : level === 5 ? ['pareto'] : ['pow', 'parab', 'pareto', 'exp'];
  const d = cdData(rng, kinds);
  // Gabarit b (F given, find f) at level 4, one item in three.
  if (level === 4 && !opts.exam && (d.kind === 'pow' || d.kind === 'pareto') && rng.chance(0.34)) return cdFromF(d, opts);
  const parts = [];
  const ctxB = { a: d.kind === 'pareto' ? 1 : 0, b: d.kind === 'pow' || d.kind === 'parab' ? d.a : '∞' };
  parts.push({
    label: 'I', name: 'I', kind: 'prob', expect: qt(d.I), action: t('Intégrer le noyau sur le support'),
    notes: [t('I = ∫ {k} dx sur le support {s}.', { k: d.kernel.replace(/\^\(-(\d+)\)/, '^(−$1)'), s: d.support })],
    traps: d.wrongI ? { p_normalize_bounds: { values: [qt(d.wrongI)], ctx: ctxB } } : undefined,
    decisions: [{ prompt: t('Sur quel intervalle intègre-t-on ?'), levels: [1, 2], options: [
      { id: 'supp', label: t('Sur le support {s}', { s: d.support }), valid: true },
      { id: 'other', label: d.kind === 'pareto' ? t('Sur [0 ; ∞[') : t('Sur [0 ; 1]'), valid: false, rule: 'p_normalize_bounds', why: t('La densité est nulle hors de {s} : on intègre seulement sur le support.', { s: d.support }) },
    ] }],
    wrongActions: [{ label: t('Intégrer sur [0 ; 1]'), rule: 'p_normalize_bounds', why: t('La densité est nulle hors de {s} : on intègre seulement sur le support.', { s: d.support }) }],
    lines: d.Ilines,
  });
  parts.push({
    label: 'c', name: 'c', kind: 'prob', expect: '1/$I', action: t('Résoudre c·I = 1'),
    traps: d.wrongI ? { p_normalize_bounds: { values: [qt(d.wrongI.inv())], ctx: ctxB } } : undefined,
    lines: d.I.eq(1) ? [{ math: '1', blank: ['1'], note: 'c·1 = 1', subgoal: 'norm' }]
      : [{ math: `1/${pq(d.I)}`, blank: [qt(d.I)], note: 'c·I = 1', subgoal: 'norm' }, ...(`1/${pq(d.I)}` === qt(d.c) ? [] : [{ math: qt(d.c), blank: [qt(d.c)] }])],
  });
  if (d.F && level >= 4) {
    parts.push({
      label: 'F(x)', name: 'F', kind: 'prob', vars: ['x'], domain: { x: d.Fdom }, expect: d.F, action: t('Intégrer f jusqu\'à x'),
      title: t('F(x) sur le support ({s})', { s: d.supportT }),
      decisions: [{ prompt: t('Et hors du support ?'), options: [
        { id: 'pieces', label: d.Fout, valid: true },
        { id: 'same', label: t('La même formule pour tout x'), valid: false, rule: 'p_cdf_piecewise', why: t('F doit être définie sur tout ℝ : {f}.', { f: d.Fout }) },
      ] }],
      lines: [{ math: d.F, subgoal: 'norm' }],
    });
  }
  const P = d.prob;
  parts.push({
    label: P.label, name: 'P', kind: P.kind || 'prob', decimals: 3, expect: P.expect, action: t('Calculer la probabilité avec F'),
    traps: P.f && !(P.F.eq(P.ft)) ? { p_density_is_prob: { values: [P.f], ctx: { v: qs(P.ft) } } } : undefined,
    lines: P.lines.map((l, i) => ({ ...l, subgoal: i === 0 ? 'norm' : undefined })),
  });
  if (level === 5 && d.cond) {
    parts.push({
      label: 'Pr(X>2|X<3)', name: 'Pc', kind: 'prob', expect: qt(d.cond.value), action: t('Conditionner'),
      traps: { p_cond_denominator: { values: [qt(d.cond.wrong)], ctx: { pb: qs(q(1).sub(q(1, 3 ** d.al))) } } },
      lines: [{ math: `(2^(-${d.al})-3^(-${d.al}))/(1-3^(-${d.al}))`, subgoal: 'norm', note: '(F(3) − F(2))/F(3)' }, { math: qt(d.cond.value) }],
    });
  }
  const sub = CD_SUB.filter((s) => s.id !== (d.improper ? 'int' : 'improper'));
  return statItem({
    skill: CD, level, key: `${level}:${d.kind}:${d.kernel}:${P.label}`,
    prompt: t(`X a pour densité {f} pour {s}, et 0 ailleurs. Trouve c${level >= 4 && d.F ? ', puis F(x) sur le support' : ''}, puis {p}${level === 5 && d.cond ? ' et Pr(X > 2 | X < 3)' : ''}.`, { f: X(`c×${d.kernel}`), s: d.supportT, p: SM(P.label) }),
    parts, subgoals: sub, exam: examTag(opts),
    hints: H(t('L\'intégrale de f sur le support vaut 1 : intègre le noyau sur le support, puis c = 1/I.'), `${SM(`1/${pq(d.I)}`)} = □`, t('c = {c}, puis {p} = {v}', { c: qs(d.c), p: SM(P.label), v: P.kind === 'stat' ? dx(P.value) : qs(P.value) })),
  });
}

// Gabarit b: F given, f by derivation, then a probability.
function cdFromF(d, opts) {
  const f = d.kind === 'pow' ? `${qt(q(d.k + 1, d.a ** (d.k + 1)))}x^${d.k}` : `${d.al}x^(-${d.al + 1})`;
  const P = d.prob;
  return statItem({
    skill: CD, level: 4, key: `4:F:${d.kind}:${d.F}`,
    prompt: t('X a pour fonction de répartition {F} pour {s} ({out}). Trouve sa densité sur le support, puis {p}.', { F: X(`F(x)=${d.F}`), s: d.supportT, out: d.Fout.replace(/</g, '&lt;').replace(/>/g, '&gt;'), p: SM(P.label) }),
    parts: [
      { label: 'f(x)', name: 'f', kind: 'prob', vars: ['x'], domain: { x: d.Fdom }, expect: f, action: t('Dériver F'), title: t('f(x) sur le support'),
        lines: [{ math: f, subgoal: 'norm' }] },
      { label: P.label, name: 'P', kind: 'prob', expect: qt(P.value), action: t('Lire la probabilité sur F'),
        traps: { p_density_is_prob: { values: [P.f], ctx: { v: qs(P.ft) } } },
        lines: [{ math: d.kind === 'pow' ? P.lines[0].math : `1-(1-${P.lines[0].math})`, subgoal: 'norm' }, { math: qt(P.value) }] },
    ],
    subgoals: CD_SUB.filter((s) => s.id === 'norm'), exam: examTag(opts),
    hints: H(t('f = F′ sur le support ; une probabilité se lit sur F.'), `f(x) = F′(x) = □`, `f(x) = ${f}`),
  });
}

function cdMcq(rng, opts) {
  const d = cdData(rng, ['pow']);
  if (rng.chance(0.5) && d.a > 1) {
    return choice({
      skill: CD, level: 4, key: `mcq:c:${d.kernel}:${d.a}`, exam: examTag(opts),
      prompt: t('X a pour densité {f} pour 0 ≤ x ≤ {a}, et 0 ailleurs. Que vaut c ?', { f: X(`c×${d.kernel}`), a: d.a }),
      right: qs(d.c), wrongs: [{ html: qs(d.wrongI.inv()), rule: 'p_normalize_bounds' }, { html: qs(d.I), rule: null }],
      fillers: [{ html: qs(d.c.mul(2)) }, { html: qs(q(d.k + 1, d.a)) }, { html: '1' }],
    }, rng);
  }
  const pr = d.prob;
  const tv = pr.label.replace('Pr(X≤', '').replace(')', '');
  return choice({
    skill: CD, level: 4, key: `mcq:point:${d.kernel}:${d.a}:${tv}`, exam: examTag(opts),
    prompt: t('X a pour densité {f} pour 0 ≤ x ≤ {a}, et 0 ailleurs. Que vaut Pr(X = {v}) ?', { f: X(`${qt(d.c)}×${d.kernel}`), a: d.a, v: fr(tv) }),
    right: '0', wrongs: [{ html: qs(pr.ft), rule: 'p_density_is_prob' }, { html: qs(pr.F), rule: null }],
    fillers: [{ html: qs(q(1).sub(pr.F)) }, { html: '1' }, { html: '1/2' }],
  }, rng);
}

function cdTf(rng, opts) {
  const kind = pickOf(rng, ['exceed', 'continuous', 'point']);
  const m = rng.int(2, 5);
  if (kind === 'continuous') {
    return tf({ skill: CD, key: `cont:${m}`, exam: examTag(opts), truth: true,
      statement: t('Pour une variable continue X et tout nombre a, Pr(X ≤ a) = Pr(X < a).'),
      explanation: t('Pr(X = a) = 0 pour une variable continue : les deux probabilités sont égales.') });
  }
  if (kind === 'exceed') {
    return tf({ skill: CD, key: `exceed:${m}`, exam: examTag(opts), truth: false, ruleIfTrue: 'p_density_is_prob',
      statement: t('Une densité de probabilité ne dépasse jamais 1.'),
      explanation: t('Faux : la densité constante c sur [0 ; 1/{m}] vérifie c·(1/{m}) = 1, donc c = {m} > 1. C\'est l\'aire sous f qui vaut 1, pas sa hauteur.', { m }),
      counter: numCounter({ vars: [{ v: 'c', label: t('Densité constante c sur [0 ; 1/{m}] : c =', { m }) }], hyp: `c/${m}=1`, pred: 'c≤1', answer: { c: String(m) } }) });
  }
  return tf({ skill: CD, key: `point:${m}`, exam: examTag(opts), truth: false, ruleIfTrue: 'p_density_is_prob',
    statement: t('Si X a pour densité f, alors Pr(X = a) = f(a) pour tout a.'),
    explanation: t('Faux : pour X ~ U(0 ; 1/{m}), Pr(X = 1/{m2}) = 0 mais f(1/{m2}) = {m}. Une densité n\'est pas une probabilité.', { m, m2: 2 * m }),
    counter: numCounter({ vars: [{ v: 'p', label: `X ~ U(0 ; 1/${m}) : Pr(X = 1/${2 * m}) =` }, { v: 'f', label: `f(1/${2 * m}) =` }], hyp: `p=0∧f=${m}`, pred: 'p=f', answer: { p: '0', f: String(m) } }) });
}

function cdCoef(rng, opts) {
  const d = cdData(rng, ['pow', 'parab', 'pareto']);
  return coefItem({
    skill: CD, key: `coef:${d.kernel}:${d.support}`, exam: { format: 'coef', points: 1 },
    prompt: t('X a pour densité {f} pour {s}, et 0 ailleurs. Que vaut c ?', { f: X(`c×${d.kernel}`), s: d.supportT }),
    parts: [{ label: 'c', name: 'c', kind: 'prob', expect: qt(d.c), lines: [{ math: qt(d.c) }],
      traps: d.wrongI ? { p_normalize_bounds: { values: [qt(d.wrongI.inv())] } } : undefined }],
    subgoals: CD_SUB.filter((s) => s.id === 'norm'),
  });
}

function cdGen(level, rng, profile, opts = {}) {
  if (opts.exam === 'coef') return cdCoef(rng, opts);
  const it = cdItem(level, rng, profile, opts);
  return it;
}

export const GEN = { [CD]: cdGen };
void openItem; void cdDensityT; void ql; void dx;
