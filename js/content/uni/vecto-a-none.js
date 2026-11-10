// v-pot-none and v-pot-domain (module V, part a, step U10): a closed curve
// with ∮ F · dl ≠ 0 proves that there is no potential; the same field may
// have a potential on a smaller domain (exam example V2, 8 points).
// Catalogue: docs/universite/VCF-analyse-3-4.md.
//
// F = (a(x, y) + b(−y, x))/(x² + y²) (a ∈ {0, 1, 2}, b ∈ {1, 2, 3}): rot F = 0
// on ℝ² \ {0}; on the circle of radius R, F(γ) · γ′ = b, so ∮ = 2πb; on
// {x > 0}, φ = (a/2) ln(x² + y²) + b Arctg(y/x). Second template of
// v-pot-domain (série de révision): F = ∇(p + (a/2) ln(x² + y²)) on
// {x² + y² > 1}: a hole, but a potential defined on the whole domain.

import {
  T, sum, d, text, randPoly, isZero, ML, tupML, fieldML, q, fq,
  vParts, mcqD, opt, decision, act, H, examTag, problemItem, blocksItem, asProblem,
} from './vecto-a-kit.js';

const PN = 'v-pot-none';
const PD = 'v-pot-domain';
const ONE = (k) => (k === 1 ? '' : String(k));
const R2 = 'x^2+y^2';

// ---------- the field ----------

function fieldA(rng, { centred = true } = {}) {
  const a = rng.pick([0, 1, 2, 1]);
  const b = rng.pick([1, 2, 3, 2]);
  const c = centred ? 0 : rng.pick([1, 2]);
  const X = c ? `(x-${c})` : 'x';
  const den = c ? `((x-${c})^2+y^2)` : `(${R2})`;
  const num = (t) => (/[+-]/.test(t.slice(1)) && !/^-?\d*\(x-\d\)$/.test(t) ? `(${t})` : t);
  const P = `${num(`${a ? `${ONE(a)}${X}-` : '-'}${ONE(b)}y`)}/${den}`;
  const Q = `${num(`${ONE(b)}${X}${a ? `+${ONE(a)}y` : ''}`)}/${den}`;
  return { a, b, c, P, Q, F: [P, Q], val: { r: q(0), p: q(2 * b) }, hole: c ? `(${c} ; 0)` : '(0 ; 0)', omega: c ? `ℝ² \\ {(${c}, 0)}` : 'ℝ² \\ {(0, 0)}' };
}
const piT = (k) => (k === 1 ? 'π' : `${k}π`);

const rotPart = (Fd, { first = true, html = null } = {}) => ({
  html: first ? null : html, ask: 'rot F =', start: `pd(${Fd.Q},x)-pd(${Fd.P},y)`,
  judge: { kind: 'equiv', vars: ['x', 'y'], domain: { x: [0.5 + Fd.c, 2 + Fd.c], y: [0.5, 2] }, target: 'goal', goal: '0', rot: true },
  lines: [{ math: '0', note: 'rot F = ∂F₂/∂x − ∂F₁/∂y : les deux dérivées sont égales', subgoal: 'rot', blank: ['0'] }],
  menu: [act('derive', 'Dériver les deux quotients et faire la différence'), act('swap', 'Calculer ∂F₁/∂y − ∂F₂/∂x', false, { rule: 'v_rot_sign', why: 'En 2D, rot F = ∂F₂/∂x − ∂F₁/∂y.' })],
});

function circleParts(Fd, R = 1, { first = false } = {}) {
  const cx = Fd.c ? `${Fd.c}+` : '';
  const comps = [`${cx}${ONE(R)}cos(t)`, `${ONE(R)}sin(t)`];
  const line = `${first ? 'γ' : 'γ(t)'} = (${comps.join(' ; ')}), t ∈ [0 ; 2π]`;
  const judge = { kind: 'param', curve: { ref: `(${comps.join(' ; ')})`, t: [0, '2π'], closed: true } };
  // F(γ(t)) · γ′(t) as written, R simplified: (a cos t − b sin t)(−sin t) + (b cos t + a sin t) cos t.
  const A = Fd.a;
  const B = Fd.b;
  const f1 = `${A ? `${ONE(A)}cos(t)-` : '-'}${ONE(B)}sin(t)`;
  const f2 = `${ONE(B)}cos(t)${A ? `+${ONE(A)}sin(t)` : ''}`;
  const raw = `int((${f1})(-sin(t))+(${f2})cos(t), t, 0, 2π)`;
  const v = piT(2 * B);
  return [
    { html: first ? null : 'Une courbe fermée autour du trou :', ask: 'γ(t) =', start: 'Γ', judge, lines: [{ math: line, note: `Le cercle de centre ${Fd.hole.replace('(', '(').replace(/-/g, '−')} et de rayon ${R}, sens positif`, subgoal: 'param' }], baits: ['v_orientation_reversed', 'v_param_bounds'] },
    {
      html: 'La circulation sur ce cercle :', ask: '∮_Γ F · dl =', start: 'I', judge: { kind: 'definite', vars: ['I'], known: { I: v }, traps: { v_orientation_reversed: [`-${v}`] } },
      lines: [
        { math: raw, note: R === 1 ? 'F(γ(t)) · γ′(t)' : `F(γ(t)) · γ′(t) (le facteur ${R} se simplifie)`, subgoal: 'integrand', blank: [f1, f2] },
        { math: `int(${B}, t, 0, 2π)`, note: 'sin²t + cos²t = 1', subgoal: 'integrand', blank: [String(B)] },
        { math: v, note: '≠ 0', subgoal: 'value', blank: [v] },
      ],
      menu: [act('param', 'Remplacer x et y par γ(t), produit scalaire avec γ′(t), intégrer'), act('green', 'Appliquer Green : ∮ = ∬ rot F = 0', false, { rule: 'v_green_singular', why: 'F n\'est pas défini au centre du disque : Green ne s\'applique pas.' })],
    },
  ];
}

const DOMAIN_DEC = (Fd) => decision(`rot F = 0 sur Ω = ${Fd.omega}. Cela suffit-il à conclure ?`, [
  { id: 'no', label: 'Non : Ω n\'est pas simplement connexe, le critère ne conclut pas', valid: true, ref: true },
  { id: 'yes', label: 'Oui : rot F = 0, donc F dérive d\'un potentiel', valid: false, rule: 'v_pot_no_domain', why: 'Le théorème demande un domaine simplement connexe : Ω a un trou.' },
], { levels: [3, 4] });
const CURVE_DEC = (Fd) => decision('Quelle courbe fermée choisis-tu ?', [
  { id: 'around', label: `Un cercle centré en ${Fd.hole} : il entoure le trou`, valid: true, ref: true },
  { id: 'away', label: `Un cercle qui n'entoure pas ${Fd.hole}, par exemple de centre (${Fd.c + 4} ; 0) et de rayon 1`, valid: false, rule: 'v_rot_closed_zero', why: 'Ce cercle est dans un disque sans trou où F a un potentiel : ∮ = 0, et cela ne prouve rien.' },
], { levels: [2, 3] });
const CONCL_DEC = (Fd) => decision(`∮ = ${piT(2 * Fd.b)} ≠ 0 sur une courbe fermée de Ω. Conclusion ?`, [
  { id: 'none', label: 'F ne dérive pas d\'un potentiel sur Ω', valid: true, ref: true },
  { id: 'all', label: 'On ne peut rien conclure : il faudrait essayer toutes les courbes fermées', valid: false, why: 'Si F = ∇φ, toute circulation sur une courbe fermée est nulle : une seule courbe avec ∮ ≠ 0 suffit.' },
  { id: 'pot', label: 'F dérive d\'un potentiel, puisque rot F = 0', valid: false, rule: 'v_pot_no_domain', why: 'rot F = 0 ne suffit pas ici, et ∮ ≠ 0 prouve le contraire.' },
], { keep1: true });

// ---------- v-pot-none ----------

const PN_SUB = [
  { id: 'rot', label: 'rot F = 0', skill: 'v-ops' },
  { id: 'param', label: 'le cercle', skill: 'v-line-vector' },
  { id: 'integrand', label: 'F(γ) · γ′', skill: 'v-line-vector' },
  { id: 'value', label: 'la circulation', skill: 'v-line-vector' },
  { id: 'conclude', label: 'conclure', skill: PN },
  { id: 'domain', label: 'le domaine', skill: 'v-domain-topo' },
];

function pnItem(level, rng, opts) {
  const Fd = fieldA(rng, { centred: level < 4 || rng.chance(0.6) });
  const R = level >= 4 ? rng.pick([1, 2]) : 1;
  const parts = [];
  if (level >= 2) parts.push(rotPart(Fd));
  const [cp, ip] = circleParts(Fd, R, { first: level < 2 });
  if (level >= 2) { cp.decisions = [DOMAIN_DEC(Fd), CURVE_DEC(Fd)]; parts.push(cp); }
  if (level === 1) ip.notes = [`rot F = 0 sur Ω = ${Fd.omega}, mais Ω a un trou. On calcule ∮ F · dl sur le cercle γ(t) = (${Fd.c ? `${Fd.c} + ` : ''}cos t ; sin t), t ∈ [0 ; 2π].`];
  parts.push(level === 1 ? { ...ip, html: null } : ip);
  parts.push({
    html: 'Conclusion :', ask: '∮_Γ F · dl =', start: 'I', judge: { kind: 'definite', vars: ['I'], known: { I: piT(2 * Fd.b) } },
    decisions: [CONCL_DEC(Fd)],
    lines: [{ math: piT(2 * Fd.b), note: 'Une courbe fermée de Ω avec ∮ ≠ 0 : pas de potentiel sur Ω', subgoal: 'conclude' }],
  });
  return vParts({
    skill: PN, level, parts, subgoals: PN_SUB, exam: opts.exam ? examTag(opts, 6) : false,
    prompt: `Soit Ω = ${Fd.omega} et ${fieldML(Fd.F)}. Montre que F ne dérive pas d'un potentiel sur Ω${level >= 2 ? ' : calcule rot F, puis la circulation de F sur une courbe fermée qui entoure le trou' : ''}.`,
    key: `${PN}:${level}:${Fd.F.join('|')}:${R}`,
    hints: H('Cherche une courbe fermée qui entoure le trou : si ∮ F · dl ≠ 0, il n\'y a pas de potentiel.', `γ(t) = (${Fd.c ? `${Fd.c} + ` : ''}${ONE(R)}cos t ; ${ONE(R)}sin t) ; F(γ(t)) · γ′(t) = …`, `F(γ(t)) · γ′(t) = ${Fd.b} : ∮ = ${piT(2 * Fd.b)}`),
  });
}

// Level 5: the proof in blocks, with two decoys.
function pnBlocks(level, rng) {
  const Fd = fieldA(rng);
  const blocks = [
    { id: 'rot', html: `rot F = ∂F₂/∂x − ∂F₁/∂y = 0 sur Ω = ${Fd.omega}.`, needs: [] },
    { id: 'dom', html: 'Ω n\'est pas simplement connexe : le critère « rot F = 0 » ne permet pas de conclure.', needs: ['rot'] },
    { id: 'param', html: 'Sur le cercle unité γ(θ) = (cos θ ; sin θ), θ ∈ [0 ; 2π] : F(γ(θ)) · γ′(θ) = ' + Fd.b + '.', needs: [] },
    { id: 'value', html: `∮ F · dl = ∫₀^{2π} ${Fd.b} dθ = ${piT(2 * Fd.b)} ≠ 0.`, needs: ['param'] },
    { id: 'concl', html: 'Si F dérivait d\'un potentiel sur Ω, toute circulation sur une courbe fermée de Ω serait nulle : F ne dérive pas d\'un potentiel sur Ω.', needs: ['value', 'dom'] },
    { id: 'd1', html: 'Sur le cercle de centre (4 ; 0) et de rayon 1, ∮ F · dl = 0 : donc F dérive d\'un potentiel.', needs: [], distractor: 'v_rot_closed_zero', why: 'Une seule courbe avec ∮ = 0 ne prouve rien.' },
    { id: 'd2', html: 'rot F = 0, donc F dérive d\'un potentiel sur Ω.', needs: [], distractor: 'v_pot_no_domain', why: 'Il faut un domaine simplement connexe.' },
  ];
  return blocksItem({
    skill: PN, level, prompt: `Soit ${fieldML(Fd.F)} sur Ω = ${Fd.omega}. Range les blocs de la preuve que F ne dérive pas d'un potentiel sur Ω. Deux blocs sont faux.`,
    blocks: rng.shuffle(blocks), goal: 'concl', order: ['rot', 'dom', 'param', 'value', 'concl'], key: `${PN}:blocks:${Fd.a}:${Fd.b}`,
    noHints: true, subgoals: [{ id: 'conclude', label: 'la preuve', skill: PN }],
  });
}

function pnMcq(level, rng, opts) {
  const b = rng.pick([1, 2, 3]);
  const half = rng.pick([['{y > 0}', 'le demi-plan'], ['{x &lt; 0}', 'le demi-plan'], ['{x > 1}', 'le demi-plan']]);
  const r2 = rng.pick([4, 9]);
  return mcqD({
    skill: PN, level, exam: examTag(opts), key: `${PN}:mcq:${b}:${half[0]}:${r2}`,
    prompt: `Soit F(x, y) = ${tupML([`-${ONE(b)}y/(${R2})`, `${ONE(b)}x/(${R2})`])}. F dérive d'un potentiel sur :`,
    right: `${half[1]} ${half[0]}`,
    wrongs: [opt('ℝ² \\ {(0, 0)}, puisque rot F = 0', 'v_pot_no_domain'), opt(`la couronne {1 &lt; x² + y² &lt; ${r2}}`, 'v_simply_connected_wrong'), opt(`{x² + y² > 1}, car ∮ F · dl = 0 sur le cercle de centre (3 ; 0) et de rayon 1`, 'v_rot_closed_zero')],
    solution: [{ html: `Sur le cercle unité, ∮ F · dl = ${piT(2 * b)} ≠ 0 : pas de potentiel sur un domaine qui contient ce cercle (ℝ² \\ {0}, la couronne, {x² + y² > 1}). ${half[1].replace(/^l/, 'L')} ${half[0]} est convexe et rot F = 0 : F y dérive d'un potentiel.`, note: '' }],
  }, rng);
}

// ---------- v-pot-domain ----------

const PD_SUB = [
  { id: 'rot', label: 'rot F = 0', skill: 'v-ops' },
  { id: 'domain', label: 'le domaine', skill: 'v-domain-topo' },
  { id: 'param', label: 'le cercle', skill: 'v-line-vector' },
  { id: 'integrand', label: 'F(γ) · γ′', skill: PN },
  { id: 'value', label: 'la circulation', skill: PN },
  { id: 'conclude', label: 'conclure', skill: PN },
  { id: 'potential', label: 'le potentiel', skill: 'v-pot-find' },
  { id: 'check', label: '∇φ = F', skill: 'v-pot-find' },
];

// φ on {x > 0} for the first template.
function halfPot(Fd) {
  const L = Fd.a ? `${Fd.a === 2 ? '' : '(1/2)'}ln(${R2})` : '';
  const A = `${ONE(Fd.b)}arctan(y/x)`;
  const phi = L ? `${L}+${A}` : A;
  return {
    phi,
    judge: { kind: 'antideriv', grad: [`(${Fd.F[0]})`, `(${Fd.F[1]})`], vars: ['x', 'y'], funcs: ['α'], domain: { x: [0.3, 2], y: [-2, 2] } },
    lines: [
      { math: `φ = ${phi} + α(y)`, note: `∫ F₁ dx${Fd.a ? ` : (${Fd.a === 2 ? '' : '1/2 '}ln(x² + y²))′ = ${Fd.a === 2 ? '2x' : 'x'}/(x² + y²)` : ''} et (Arctg(y/x))′ = −y/(x² + y²)`, subgoal: 'potential' },
      { math: `φ = ${phi} + C`, note: '∂φ/∂y vaut déjà F₂ : α est une constante', subgoal: 'potential' },
    ],
  };
}
const RESTRICT_DEC = decision('Ce φ est-il un potentiel sur tout Ω = ℝ² \\ {(0, 0)} ?', [
  { id: 'no', label: 'Non : Arctg(y/x) n\'est pas défini sur l\'axe x = 0, qui fait partie de Ω', valid: true, ref: true },
  { id: 'yes', label: 'Oui : φ est défini sur Ω et ∇φ = F', valid: false, rule: 'v_pot_on_restricted', why: 'Arctg(y/x) n\'a pas de sens pour x = 0 : φ n\'est un potentiel que sur {x > 0}. Et ∮ ≠ 0 interdit un potentiel sur Ω.' },
], { keep1: true });

function checkPart(phi, F2, domain, decisions = []) {
  return {
    html: 'Vérifie que ∂φ/∂y = F₂ :', ask: '∂φ/∂y =', start: `pd(${phi},y)`,
    judge: { kind: 'equiv', vars: ['x', 'y'], domain, target: 'no-int', goal: F2 },
    decisions, lines: [{ math: F2, note: '= F₂ : φ est bien un potentiel là où il est défini', subgoal: 'check' }],
  };
}

// The second template: F = ∇(p + (a/2) ln(x² + y²)) on {x² + y² > 1}.
function fieldB(rng) {
  for (let t = 0; t < 200; t++) {
    const p = randPoly(rng, 2, rng.int(2, 3), { maxDeg: 3, minDeg: 1 });
    if (!p.some((x) => x.e[0] > 0) || !p.some((x) => x.e[1] > 0)) continue;
    if (!p.some((x) => x.e[0] === 0)) continue;
    const a = rng.pick([1, 2]);
    const L = `${a === 2 ? '' : '(1/2)'}ln(${R2})`;
    const px = text(d(p, 0));
    const py = text(d(p, 1));
    const F = [`${px === '0' ? '' : `${px}+`}${ONE(a)}x/(${R2})`, `${py === '0' ? '' : `${py}+`}${ONE(a)}y/(${R2})`];
    const G1 = text(p.filter((x) => x.e[0] > 0));
    return { p, a, L, F, G1, phi: `${text(p)}+${L}`, phi1: `${G1}+${L}` };
  }
  const p = sum([T(1, [2, 1, 0]), T(1, [0, 1, 0])]);
  return { p, a: 1, L: `(1/2)ln(${R2})`, F: [`2xy+x/(${R2})`, `x^2+1+y/(${R2})`], G1: 'x^2y', phi: `x^2y+y+(1/2)ln(${R2})`, phi1: `x^2y+(1/2)ln(${R2})`, fallback: true };
}

function pdLinesA(level, rng, opts) {
  const Fd = fieldA(rng);
  const H1 = halfPot(Fd);
  const parts = [rotPart(Fd)];
  const [cp, ip] = circleParts(Fd, 1);
  cp.decisions = [{ ...DOMAIN_DEC(Fd), levels: undefined, keep1: true }];
  parts.push(cp, ip);
  parts.push({ html: 'Sur le demi-plan {x > 0} (convexe), un potentiel :', ask: 'φ =', start: 'φ', judge: H1.judge, lines: H1.lines, decisions: [CONCL_DEC(Fd)] });
  parts.push(checkPart(H1.phi, `(${ONE(Fd.b)}x${Fd.a ? `+${ONE(Fd.a)}y` : ''})/(${R2})`, { x: [0.4, 2], y: [-2, 2] }, [RESTRICT_DEC]));
  return vParts({
    skill: PD, level, parts, subgoals: PD_SUB, exam: examTag(opts),
    prompt: `Soit Ω = ℝ² \\ {(0, 0)} et ${fieldML(Fd.F)}. (i) Calcule rot F. (ii) F dérive-t-il d'un potentiel sur Ω ? (iii) Trouve un potentiel sur {x > 0}, et dis pourquoi ce n'en est pas un sur Ω.`,
    key: `${PD}:A:${level}:${Fd.a}:${Fd.b}`,
    hints: H('rot F ; propriété du domaine ; si Ω a un trou, ∮ sur un cercle autour du trou ; sur un demi-plan, cherche φ et vérifie où il est défini.', `Sur le cercle unité, F(γ(t)) · γ′(t) = ${Fd.b}. Sur {x > 0} : (Arctg(y/x))′ en x vaut −y/(x² + y²).`, `φ = ${ML(H1.phi)} + C, défini seulement pour x ≠ 0.`),
  });
}

function pdLinesB(level, rng, opts) {
  const B = fieldB(rng);
  const parts = [{
    ask: 'rot F =', start: `pd(${B.F[1]},x)-pd(${B.F[0]},y)`,
    judge: { kind: 'equiv', vars: ['x', 'y'], domain: { x: [1.1, 2.5], y: [1.1, 2.5] }, target: 'goal', goal: '0', rot: true },
    lines: [{ math: '0', note: 'rot F = ∂F₂/∂x − ∂F₁/∂y', subgoal: 'rot', blank: ['0'] }],
    menu: [act('derive', 'Dériver et faire la différence')],
  }];
  const judge = { kind: 'antideriv', grad: B.F.map((f) => `(${f})`), vars: ['x', 'y'], funcs: ['α'], domain: { x: [1.1, 2.5], y: [1.1, 2.5] } };
  parts.push({
    html: 'Un potentiel :', ask: 'φ =', start: 'φ', judge,
    decisions: [decision('Ω = {x² + y² > 1} a un trou. Que fais-tu ?', [
      { id: 'try', label: 'Le critère ne conclut pas : je cherche quand même un potentiel défini sur tout Ω', valid: true, ref: true },
      { id: 'no', label: 'Ω a un trou, donc F ne dérive pas d\'un potentiel', valid: false, rule: 'v_simply_connected_wrong', why: 'Un trou empêche seulement le critère de conclure ; il ne prouve rien.' },
    ], { keep1: true })],
    lines: [{ math: `φ = ${B.phi1} + α(y)`, note: '∫ F₁ dx', subgoal: 'potential' }, { math: `φ = ${B.phi} + C`, note: 'On compare ∂φ/∂y à F₂', subgoal: 'potential' }],
  });
  parts.push(checkPart(B.phi, B.F[1], { x: [1.1, 2.5], y: [1.1, 2.5] }, [decision('φ est défini et C¹ sur tout Ω. Conclusion ?', [
    { id: 'yes', label: 'F dérive d\'un potentiel sur Ω, malgré le trou', valid: true, ref: true },
    { id: 'zero', label: 'Il fallait d\'abord vérifier ∮ F · dl = 0 sur un cercle autour du trou : cela suffit', valid: false, rule: 'v_rot_closed_zero', why: 'Une seule courbe avec ∮ = 0 ne prouve rien ; c\'est φ, défini sur tout Ω, qui prouve.' },
  ], { keep1: true })]));
  return vParts({
    skill: PD, level, parts, subgoals: PD_SUB, exam: examTag(opts),
    prompt: `Soit Ω = {(x, y) : x² + y² > 1} et ${fieldML(B.F)}. F dérive-t-il d'un potentiel sur Ω ?`,
    key: `${PD}:B:${level}:${B.F.join('|')}`, fallback: B.fallback,
    hints: H('Le domaine a un trou : rot F = 0 ne conclut pas. Essaie quand même de trouver φ, et regarde où il est défini.', `∫ F₁ dx = ${ML(B.phi1)} + α(y)`, `φ = ${ML(B.phi)} + C, défini sur tout Ω.`),
  });
}

// The problem (V2: 8 points; 6 points without the half plane, 2021).
function pdProblem(level, rng, opts, { short = false } = {}) {
  if (!short && rng.chance(0.3)) return pdProblemB(level, rng, opts);
  const Fd = fieldA(rng);
  const rot = vParts({ skill: PD, level: 5, parts: [rotPart(Fd)], subgoals: PD_SUB, prompt: '(i) Calcule rot F sur Ω.', key: `${PD}:p:rot:${Fd.a}${Fd.b}`, noHints: true });
  const dom = mcqD({
    skill: PD, level: 5, noHints: true, key: `${PD}:p:dom:${Fd.a}${Fd.b}`, prompt: '(ii) Que permet de conclure le critère « rot F = 0 » sur Ω ?',
    right: 'Rien : Ω n\'est pas simplement connexe', wrongs: [opt('F dérive d\'un potentiel sur Ω', 'v_pot_no_domain'), opt('Ω est simplement connexe, donc F dérive d\'un potentiel', 'v_simply_connected_wrong'), opt('F ne dérive pas d\'un potentiel, car Ω a un trou', 'v_simply_connected_wrong')],
  }, rng);
  const circ = vParts({ skill: PD, level: 5, parts: circleParts(Fd, 1, { first: true }), subgoals: PD_SUB, prompt: '(ii) Calcule la circulation de F sur le cercle unité parcouru dans le sens positif.', key: `${PD}:p:circ:${Fd.a}${Fd.b}`, noHints: true });
  const concl = mcqD({
    skill: PD, level: 5, noHints: true, key: `${PD}:p:concl:${Fd.a}${Fd.b}`, prompt: `(ii) On a trouvé ∮ F · dl = ${piT(2 * Fd.b)}. Conclusion ?`,
    right: 'F ne dérive pas d\'un potentiel sur Ω', wrongs: [opt('On ne peut rien conclure d\'une seule courbe'), opt('F dérive d\'un potentiel sur Ω, puisque rot F = 0', 'v_pot_no_domain')],
  }, rng);
  const parts = [{ item: rot, points: 2, title: '(i) rot F' }, { item: dom, points: 1, title: '(ii) le domaine' }, { item: circ, points: [1, 1], title: '(ii) la circulation' }, { item: concl, points: 1, title: '(ii) conclusion' }];
  let prompt = `Soit Ω = ℝ² \\ {(0, 0)} et ${fieldML(Fd.F)}. (i) Montre que rot F = 0 sur Ω. (ii) F dérive-t-il d'un potentiel sur Ω ?`;
  if (!short) {
    const H1 = halfPot(Fd);
    const pot = vParts({ skill: PD, level: 5, parts: [{ start: 'φ', judge: H1.judge, lines: H1.lines }], subgoals: PD_SUB, prompt: '(iii) Trouve un potentiel de F sur le demi-plan {x > 0}.', key: `${PD}:p:pot:${Fd.a}${Fd.b}`, noHints: true });
    const why = mcqD({
      skill: PD, level: 5, noHints: true, key: `${PD}:p:why:${Fd.a}${Fd.b}`, prompt: '(iii) Pourquoi ce φ n\'est-il pas un potentiel sur Ω ?',
      right: 'Arctg(y/x) n\'est pas défini sur l\'axe x = 0, qui fait partie de Ω', wrongs: [opt('C\'en est un : φ est défini sur Ω', 'v_pot_on_restricted'), opt('Parce que rot F ≠ 0 sur l\'axe x = 0'), opt('Parce que ln(x² + y²) n\'est pas défini pour x < 0')],
    }, rng);
    parts.push({ item: pot, points: 1.5, title: '(iii) le potentiel' }, { item: why, points: 0.5, title: '(iii) pas sur Ω' });
    prompt += ' (iii) Trouve un potentiel sur {x > 0}, et dis pourquoi ce n\'en est pas un sur Ω.';
  }
  return problemItem({ skill: PD, level, prompt, parts, key: `A:${short ? 6 : 8}:${Fd.a}:${Fd.b}`, exam: opts.exam ? examTag(opts, short ? 6 : 8) : false });
}

function pdProblemB(level, rng, opts) {
  const B = fieldB(rng);
  const rot = vParts({ skill: PD, level: 5, parts: [{ ask: 'rot F =', start: `pd(${B.F[1]},x)-pd(${B.F[0]},y)`, judge: { kind: 'equiv', vars: ['x', 'y'], domain: { x: [1.1, 2.5], y: [1.1, 2.5] }, target: 'goal', goal: '0', rot: true }, lines: [{ math: '0', note: 'rot F', subgoal: 'rot' }] }], subgoals: PD_SUB, prompt: 'Calcule rot F sur Ω.', key: `${PD}:pb:rot:${B.F.join('|')}`, noHints: true });
  const dom = mcqD({
    skill: PD, level: 5, noHints: true, key: `${PD}:pb:dom:${B.F.join('|')}`, prompt: 'Que permet de conclure le critère « rot F = 0 » sur Ω = {x² + y² > 1} ?',
    right: 'Rien : Ω n\'est pas simplement connexe', wrongs: [opt('F ne dérive pas d\'un potentiel, car Ω a un trou', 'v_simply_connected_wrong'), opt('F dérive d\'un potentiel sur Ω', 'v_pot_no_domain')],
  }, rng);
  const judge = { kind: 'antideriv', grad: B.F.map((f) => `(${f})`), vars: ['x', 'y'], funcs: ['α'], domain: { x: [1.1, 2.5], y: [1.1, 2.5] } };
  const pot = vParts({ skill: PD, level: 5, parts: [{ start: 'φ', judge, lines: [{ math: `φ = ${B.phi1} + α(y)`, note: '∫ F₁ dx', subgoal: 'potential' }, { math: `φ = ${B.phi} + C`, note: 'On compare à F₂', subgoal: 'potential' }] }], subgoals: PD_SUB, prompt: 'Cherche un potentiel φ de F.', key: `${PD}:pb:pot:${B.F.join('|')}`, noHints: true });
  const concl = mcqD({
    skill: PD, level: 5, noHints: true, key: `${PD}:pb:concl:${B.F.join('|')}`, prompt: 'Conclusion ?',
    right: 'φ est défini et C¹ sur tout Ω, et ∇φ = F : F dérive d\'un potentiel sur Ω', wrongs: [opt('∮ F · dl = 0 sur le cercle x² + y² = 4, donc F dérive d\'un potentiel', 'v_rot_closed_zero'), opt('Ω a un trou : F ne dérive pas d\'un potentiel', 'v_simply_connected_wrong')],
  }, rng);
  return problemItem({
    skill: PD, level, prompt: `Soit Ω = {(x, y) : x² + y² > 1} et ${fieldML(B.F)}. F dérive-t-il d'un potentiel sur Ω ?`,
    parts: [{ item: rot, points: 2, title: 'rot F' }, { item: dom, points: 1, title: 'le domaine' }, { item: pot, points: 3, title: 'le potentiel' }, { item: concl, points: 2, title: 'conclusion' }],
    key: `B:${B.F.join('|')}`, exam: opts.exam ? examTag(opts, 8) : false, fallback: B.fallback,
  });
}

export const GEN = {
  [PN]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return pnMcq(4, rng, opts);
    if (opts.exam === 'open') return asProblem(pnItem(4, rng, opts), 6);
    if (level === 5) return pnBlocks(level, rng);
    return pnItem(level, rng, opts);
  },
  [PD]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'open') return pdProblem(4, rng, opts, { short: rng.chance(0.3) });
    if (level === 5) return pdProblem(5, rng, opts);
    return rng.chance(0.7) ? pdLinesA(level, rng, opts) : pdLinesB(level, rng, opts);
  },
};
export { fq, isZero };
