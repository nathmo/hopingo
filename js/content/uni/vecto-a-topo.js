// v-domain-topo and v-pot-test (module V, part a, step U10): convex,
// star-shaped, simply connected domains, and the test rot F = 0 with its
// domain. Catalogue: docs/universite/VCF-analyse-3-4.md.
//
// Domains come from a bank (each with its four properties, its
// inequalities, a segment that leaves it when it is not convex, a hole to
// wind around): multiple choices (one property with a drawing; the whole
// profile), `example` items (two points whose segment leaves Ω, a closed
// curve around the hole: js/judges/vcf-examples-va.js). The test rot F = 0
// is a lines item: the components of rot F (equiv), then a part
// « Conclusion » with the decisions (domain, conclusion) and rot F written
// as a vector (judge vector).

import { inDomain } from '../../judges/vcf-examples-va.js';
import {
  T, sum, sub, d, text, randPoly, isZero, ML, tupML, fieldML, q,
  vParts, mcqD, opt, decision, act, H, examTag, problemItem,
} from './vecto-a-kit.js';
import { t } from '../../i18n.js';

const DT = 'v-domain-topo';
const PT = 'v-pot-test';
const XYZ = ['x', 'y', 'z'];

// ---------- the bank of domains ----------

// {id, html, dim, p: [convex, star, simply, connected], dom, seg?: [P, Q], hole?, loop?}
function domainBank(rng) {
  const R = rng.pick([2, 3]);
  const r1 = 1;
  const r2 = rng.pick([2, 3]);
  const a = rng.int(1, 2);
  const [x1, x2] = rng.pick([[1, 3], [0, 2], [-1, 2], [1, 4]]);
  const [y1, y2] = rng.pick([[2, 10], [1, 3], [-2, 1], [0, 5]]);
  const m = (r1 + r2) / 2;
  return [
    { id: `rect${x1}${x2}${y1}${y2}`, html: `Ω = ]${fr(x1)} ; ${fr(x2)}[ × ]${fr(y1)} ; ${fr(y2)}[`, name: t('un rectangle'), dim: 2, p: [1, 1, 1, 1], dom: { dim: 2, parts: [[[`x-${pn(x1)}`, '>'], [`x-${pn(x2)}`, '<'], [`y-${pn(y1)}`, '>'], [`y-${pn(y2)}`, '<']]] } },
    { id: `disc${R}`, html: `Ω = {(x, y) : x² + y² &lt; ${R * R}}`, name: t('un disque'), dim: 2, p: [1, 1, 1, 1], dom: { dim: 2, parts: [[[`x^2+y^2-${R * R}`, '<']]] } },
    { id: `half${a}`, html: `Ω = {(x, y) : x > ${a}}`, name: t('un demi-plan'), dim: 2, p: [1, 1, 1, 1], dom: { dim: 2, parts: [[[`x-${a}`, '>']]] } },
    { id: 'parab', html: 'Ω = {(x, y) : y > x²}', name: t('l\'intérieur d\'une parabole'), dim: 2, p: [1, 1, 1, 1], dom: { dim: 2, parts: [[['y-x^2', '>']]] } },
    { id: `punct${R}`, html: `Ω = {(x, y) : 0 &lt; x² + y² &lt; ${R * R}}`, name: t('un disque privé de son centre'), dim: 2, p: [0, 0, 0, 1], dom: { dim: 2, parts: [[['x^2+y^2', '>'], [`x^2+y^2-${R * R}`, '<']]] }, seg: [[-1, 0], [1, 0]], hole: [0, 0], loop: `(cos(t) ; sin(t)), t ∈ [0 ; 2π]` },
    { id: `ann${r2}`, html: `Ω = {(x, y) : ${r1 * r1} &lt; x² + y² &lt; ${r2 * r2}}`, name: t('une couronne'), dim: 2, p: [0, 0, 0, 1], dom: { dim: 2, parts: [[[`x^2+y^2-${r1 * r1}`, '>'], [`x^2+y^2-${r2 * r2}`, '<']]] }, seg: [[-m, 0], [m, 0]], hole: [0, 0], loop: `(${m}cos(t) ; ${m}sin(t)), t ∈ [0 ; 2π]`.replace(/1\.5/g, '3/2').replace(/2\.5/g, '5/2') },
    { id: 'r2o', html: 'Ω = ℝ² \\ {(0, 0)}', name: t('le plan privé de l\'origine'), dim: 2, p: [0, 0, 0, 1], dom: { dim: 2, parts: [[['x^2+y^2', '>']]] }, seg: [[-1, 0], [1, 0]], hole: [0, 0], loop: '(cos(t) ; sin(t)), t ∈ [0 ; 2π]' },
    { id: `ext${r1}`, html: `Ω = {(x, y) : x² + y² > ${r1}}`, name: t('l\'extérieur d\'un disque'), dim: 2, p: [0, 0, 0, 1], dom: { dim: 2, parts: [[['x^2+y^2-1', '>']]] }, seg: [[-2, 0], [2, 0]], hole: [0, 0], loop: '(2cos(t) ; 2sin(t)), t ∈ [0 ; 2π]' },
    { id: 'slit', html: t('Ω = ℝ² \\ {(x, 0) : x ≤ 0} (le plan privé d\'une demi-droite)'), name: t('le plan privé d\'une demi-droite'), dim: 2, p: [0, 1, 1, 1], dom: { dim: 2, parts: [[['y', '>']], [['y', '<']], [['x', '>']]] }, seg: [[-1, 1], [-1, -1]] },
    { id: `pac${R}`, html: t('Ω = {(x, y) : x² + y² &lt; {a}} privé du quart {x ≥ 0, y ≤ 0}', { a: R * R }), name: t('un disque privé d\'un quart'), dim: 2, p: [0, 1, 1, 1], dom: { dim: 2, parts: [[[`x^2+y^2-${R * R}`, '<'], ['x', '<']], [[`x^2+y^2-${R * R}`, '<'], ['y', '>']]] }, seg: [[1, 1 / 2], [-1 / 2, -1]] },
    { id: 'L', html: t('Ω = (]0 ; 3[ × ]0 ; 1[) ∪ (]0 ; 1[ × ]0 ; 3[) (en forme de L)'), name: t('un domaine en L'), dim: 2, p: [0, 1, 1, 1], dom: { dim: 2, parts: [[['x', '>'], ['x-3', '<'], ['y', '>'], ['y-1', '<']], [['x', '>'], ['x-1', '<'], ['y', '>'], ['y-3', '<']]] }, seg: [[5 / 2, 1 / 2], [1 / 2, 5 / 2]] },
    { id: 'two', html: t('Ω = {(x + 3)² + y² &lt; 1} ∪ {(x − 3)² + y² &lt; 1} (deux disques)'), name: t('deux disques disjoints'), dim: 2, p: [0, 0, 0, 0], dom: { dim: 2, parts: [[['(x+3)^2+y^2-1', '<']], [['(x-3)^2+y^2-1', '<']]] }, seg: [[-3, 0], [3, 0]] },
    { id: 'r3o', html: 'Ω = ℝ³ \\ {(0, 0, 0)}', name: t('l\'espace privé de l\'origine'), dim: 3, p: [0, 0, 1, 1], dom: { dim: 3, parts: [[['x^2+y^2+z^2', '>']]] }, seg: [[-1, 0, 0], [1, 0, 0]] },
    { id: 'r3axis', html: t('Ω = ℝ³ \\ {(0, 0, z) : z ∈ ℝ} (l\'espace privé de l\'axe z)'), name: t('l\'espace privé d\'un axe'), dim: 3, p: [0, 0, 0, 1], dom: { dim: 3, parts: [[['x^2+y^2', '>']]] }, seg: [[-1, 0, 0], [1, 0, 0]], hole: 'z', loop: '(cos(t) ; sin(t) ; 0), t ∈ [0 ; 2π]' },
    { id: `ball${R}`, html: `Ω = {(x, y, z) : 0 &lt; x² + y² + z² &lt; ${R * R}}`, name: t('une boule privée de son centre'), dim: 3, p: [0, 0, 1, 1], dom: { dim: 3, parts: [[['x^2+y^2+z^2', '>'], [`x^2+y^2+z^2-${R * R}`, '<']]] }, seg: [[-1, 0, 0], [1, 0, 0]] },
  ];
}
const fr = (x) => String(x).replace('-', '−');
const pn = (x) => (x < 0 ? `(${x})` : String(x));

const PROPS = [t('convexe'), t('étoilé'), t('simplement connexe'), t('connexe')];

// A drawing of a domain of ℝ² (cells of a grid, merged row by row).
function drawing(D) {
  if (D.dim !== 2) return '';
  const N = 48;
  const box = 4;
  const s = 160 / N;
  const rects = [];
  for (let i = 0; i < N; i++) {
    const y = box - ((i + 0.5) * 2 * box) / N;
    let start = -1;
    for (let j = 0; j <= N; j++) {
      const x = -box + ((j + 0.5) * 2 * box) / N;
      const inside = j < N && inDomain(D.dom, [x, y]);
      if (inside && start < 0) start = j;
      if (!inside && start >= 0) { rects.push(`<rect x="${(start * s).toFixed(2)}" y="${(i * s).toFixed(2)}" width="${((j - start) * s).toFixed(2)}" height="${s.toFixed(2)}"/>`); start = -1; }
    }
  }
  return `<svg viewBox="0 0 160 160" width="160" height="160" role="img" aria-label="${t('Le domaine Ω')}" style="display:block;margin:0.4em auto"><g fill="#74c0fc" stroke="none">${rects.join('')}</g><g stroke="#495057" stroke-width="0.8"><line x1="0" y1="80" x2="160" y2="80"/><line x1="80" y1="0" x2="80" y2="160"/></g><text x="154" y="76" font-size="9" text-anchor="end">x</text><text x="84" y="9" font-size="9">y</text><text x="${80 + 20}" y="90" font-size="7">1</text><line x1="100" y1="78" x2="100" y2="82" stroke="#495057"/></svg>`;
}

const profileText = (p) => {
  const yes = PROPS.filter((_, i) => p[i]);
  const no = PROPS.filter((_, i) => !p[i]);
  if (!yes.length) return t('Ni convexe, ni étoilé, ni simplement connexe, ni connexe');
  if (!no.length) return t('Convexe, étoilé, simplement connexe et connexe');
  return t('{a}, mais pas {b}', { a: yes.join(', ').replace(/^./, (c) => c.toUpperCase()), b: no.join(t(', ni ')) });
};
const PROFILES = [[1, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1], [0, 0, 0, 1], [0, 0, 0, 0]];
// The trap of a wrong profile: the simple connexity flipped (the
// neighbouring profile across it), or « star, hence convex ».
const ruleFor = (right, p) => {
  const i = PROFILES.findIndex((x) => x.join() === right.join());
  const j = PROFILES.findIndex((x) => x.join() === p.join());
  if (i === 1 && j === 0) return 'v_convex_star_confuse';
  if ((i >= 3 && j === 2) || (i <= 2 && j === 3)) return 'v_simply_connected_wrong';
  return null;
};
const holeName = (D) => (D.hole === 'z' ? 'l\'axe z' : D.hole ? t('l\'origine') : t('le morceau qui manque'));

const WHY = (D) => {
  const [cv, st, sc, cn] = D.p;
  const parts = [];
  if (cv) parts.push(t('le segment entre deux points de Ω reste dans Ω : convexe, donc étoilé, simplement connexe et connexe'));
  else {
    parts.push(D.seg ? t('le segment entre {a} et {b} sort de Ω : pas convexe', { a: pt(D.seg[0]), b: pt(D.seg[1]) }) : t('pas convexe'));
    if (st) parts.push(t('mais il existe un point de Ω d\'où l\'on voit tout Ω : étoilé, donc simplement connexe'));
    else if (sc) parts.push(t('pas étoilé, mais une courbe fermée de Ω peut toujours se réduire à un point (dans ℝ³, on contourne le trou) : simplement connexe'));
    else if (cn) parts.push(t('une courbe fermée autour de {a} ne se réduit pas à un point dans Ω : pas simplement connexe, mais connexe', { a: holeName(D) }));
    else parts.push(t('Ω est en deux morceaux : pas connexe (ni simplement connexe)'));
  }
  return t('{html} : {list}.', { html: D.html, list: parts.join(' ; ') });
};
const pt = (p) => `(${p.map((x) => fr(String(x).replace('.', ','))).join(' ; ')})`;

function pickDomain(rng, filter = () => true) {
  return rng.pick(domainBank(rng).filter(filter));
}

// Level 1: one property, with a drawing.
function oneProp(level, rng) {
  const D = pickDomain(rng, (x) => x.dim === 2);
  const k = rng.pick([0, 1, 2, 2, 3]);
  const truth = !!D.p[k];
  const yes = [t('Oui : le segment entre deux points quelconques de Ω reste dans Ω'), t('Oui : un point de Ω voit tout Ω (chaque segment vers lui reste dans Ω)'), t('Oui : Ω est connexe et sans trou, toute courbe fermée se réduit à un point'), t('Oui : Ω est d\'un seul tenant')][k];
  const no = [t('Non : un segment entre deux points de Ω sort de Ω'), t('Non : aucun point de Ω ne voit tout Ω'), t('Non : une courbe fermée de Ω ne se réduit pas à un point (trou), ou Ω n\'est pas connexe'), t('Non : Ω est en plusieurs morceaux')][k];
  const ruleNo = k === 2 ? 'v_simply_connected_wrong' : null;
  const ruleYes = k === 2 ? 'v_simply_connected_wrong' : k === 0 && D.p[1] ? 'v_convex_star_confuse' : null;
  return mcqD({
    skill: DT, level, key: `${DT}:one:${D.id}:${k}`,
    prompt: t('{html}.<br>{a}Ω est-il {b} ?', { html: D.html, a: drawing(D), b: PROPS[k] }),
    right: truth ? yes : no, wrongs: [opt(truth ? no : yes, truth ? ruleNo : ruleYes)],
    solution: [{ html: WHY(D), note: '' }],
    hints: [{ level: 1, html: t('Convexe : tout segment reste dans Ω. Étoilé : un point voit tout. Simplement connexe : pas de trou.') }, { level: 2, html: t('Y a-t-il un trou ? Un segment qui sort ?') }, { level: 3, html: WHY(D) }],
  }, rng);
}

// Levels 2 (with a drawing) and 3: the whole profile.
function profileMcq(level, rng, opts = {}) {
  const D = pickDomain(rng, level === 2 ? (x) => x.dim === 2 : () => true);
  const others = PROFILES.filter((p) => p.join() !== D.p.join()).map((p) => ({ p, rule: ruleFor(D.p, p) }));
  others.sort((a, b) => (!!b.rule - !!a.rule));
  return mcqD({
    skill: DT, level, key: `${DT}:profile:${D.id}`, exam: examTag(opts),
    prompt: t('{html}.<br>{a}Quelles propriétés a Ω ?', { html: D.html, a: level === 2 ? drawing(D) : '' }),
    right: profileText(D.p), wrongs: others.slice(0, 3).map((o) => opt(profileText(o.p), o.rule)),
    solution: [{ html: WHY(D), note: '' }],
    hints: [{ level: 1, html: t('Convexe ⇒ étoilé ⇒ simplement connexe ⇒ connexe, et aucune réciproque.') }, { level: 2, html: D.seg ? t('Essaie le segment entre {a} et {b}.', { a: pt(D.seg[0]), b: pt(D.seg[1]) }) : t('Prends deux points de Ω : le segment reste-t-il dans Ω ?') }, { level: 3, html: WHY(D) }],
  }, rng);
}

// Level 4: an example (two points, or a closed curve around the hole).
function exampleItem(level, rng) {
  const loop = rng.chance(0.4);
  const D = pickDomain(rng, loop ? (x) => !!x.loop : (x) => !!x.seg);
  const base = { skill: DT, level, type: 'example', subgoals: [{ id: 'counterexample', label: 'contre-exemple', skill: DT }], baits: [], expectedSec: 90, exam: false, fallback: false, noHints: false };
  if (loop) {
    return {
      ...base, prompt: t('{html}.<br>Ω n\'est pas simplement connexe. Donne une courbe fermée de Ω qui entoure {a} : (… ; …{b}), t ∈ [a ; b].', { html: D.html, a: holeName(D), b: D.dim === 3 ? ' ; …' : '' }),
      property: { kind: 'vcf', prop: 'loopAroundHole', params: { dom: D.dom, hole: D.hole }, ask: [{ v: 'g', label: 'γ(t) =', keys: ['calcx', 'calcfn', 'vecto'], text: true }], answer: { g: D.loop } },
      answer: { g: D.loop },
      hints: [{ level: 1, html: t('Un cercle centré sur le trou, assez petit (ou assez grand) pour rester dans Ω.') }, { level: 2, html: t('Par exemple (r cos t ; r sin t), t ∈ [0 ; 2π], avec un bon rayon r.') }, { level: 3, html: `γ(t) = ${D.loop}` }],
      solution: [{ html: t('Par exemple {loop} : elle reste dans Ω et fait le tour du trou.', { loop: D.loop }), note: '' }],
      key: `${DT}:example:loop:${D.id}`,
    };
  }
  const [P, Q] = D.seg;
  const tt = (p) => `(${p.join(' ; ')})`;
  return {
    ...base, prompt: t('{html}.<br>{a}Ω n\'est pas convexe. Donne deux points P et Q de Ω tels que le segment [P ; Q] sorte de Ω.', { html: D.html, a: D.dim === 2 ? drawing(D) : '' }),
    property: { kind: 'vcf', prop: 'setNotConvex', params: { dom: D.dom }, ask: [{ v: 'P', label: 'P =', keys: ['calc', 'vecto'], text: true }, { v: 'Q', label: 'Q =', keys: ['calc', 'vecto'], text: true }], answer: { P: tt(P), Q: tt(Q) } },
    answer: { P: tt(P), Q: tt(Q) },
    hints: [{ level: 1, html: t('Prends deux points de part et d\'autre du trou, ou du morceau qui manque.') }, { level: 2, html: t('Essaie un point proche de {a}.', { a: pt(P) }) }, { level: 3, html: t('P = {a} et Q = {b}', { a: pt(P), b: pt(Q) }) }],
    solution: [{ html: t('P = {a} et Q = {b} sont dans Ω, mais le milieu du segment n\'y est pas.', { a: pt(P), b: pt(Q) }), note: '' }],
    key: `${DT}:example:seg:${D.id}`,
  };
}

// Level 5 and exam (examen blanc 2021): on which domain is F = (−y, x)/(x² + y²) the gradient of a potential?
function potDomainMcq(skill, level, rng, opts = {}) {
  const [x1, x2] = rng.pick([[1, 3], [2, 5], [-3, -1], [1, 4]]);
  const [y1, y2] = rng.pick([[2, 10], [1, 3], [-2, 2]]);
  const r2 = rng.pick([2, 3]);
  const R = rng.pick([2, 3, 4]);
  const sgn = rng.pick([1, -1]);
  const field = sgn > 0 ? '(−y ; x)/(x² + y²)' : '(y ; −x)/(x² + y²)';
  return mcqD({
    skill, level, exam: examTag(opts), noHints: level === 5, key: `${skill}:mcq:dom:${x1}${x2}${y1}${y2}${r2}${R}${sgn}`,
    prompt: t('Soit F(x, y) = {field}. On a rot F = 0 là où F est défini. F dérive d\'un potentiel sur :', { field }),
    right: t('le rectangle ]{a} ; {b}[ × ]{c} ; {d}[', { a: fr(x1), b: fr(x2), c: fr(y1), d: fr(y2) }),
    wrongs: [opt(t('la couronne {1 &lt; x² + y² &lt; {a}}', { a: r2 * r2 }), 'v_simply_connected_wrong'), opt(t('ℝ² \\ {(0, 0)}, puisque rot F = 0'), 'v_pot_no_domain'), opt(t('le disque {x² + y² &lt; {a}}', { a: R * R }))],
    solution: [{ html: t('Le rectangle ne contient pas l\'origine et il est convexe : rot F = 0 suffit. La couronne et ℝ² \\ {0} ont un trou : sur le cercle unité, ∮ F · dl = {a} ≠ 0, donc pas de potentiel. Le disque contient l\'origine, où F n\'est pas défini.', { a: sgn > 0 ? '2π' : '−2π' }), note: '' }],
    hints: [{ level: 1, html: t('F n\'est pas défini en (0, 0). Sur quel domaine le critère rot F = 0 suffit-il ?') }, { level: 2, html: t('Il faut un domaine simplement connexe (par exemple convexe) qui ne contient pas l\'origine.') }, { level: 3, html: t('Le rectangle est convexe et ne contient pas l\'origine.') }],
  }, rng);
}

// ---------- v-pot-test ----------

const PT_SUB = [
  { id: 'partials', label: t('dérivées partielles'), skill: 'v-ops' },
  { id: 'rot-zero', label: 'rot F', skill: 'v-ops' },
  { id: 'domain', label: t('le domaine'), skill: DT },
  { id: 'conclude', label: 'conclure', skill: PT },
];
const ROT_IDX = [[2, 1, 1, 2], [0, 2, 2, 0], [1, 0, 0, 1]];
const SUBS = ['₁', '₂', '₃'];
const rotOf = ([P, Q, R]) => [sub(d(R, 1), d(Q, 2)), sub(d(P, 2), d(R, 0)), sub(d(Q, 0), d(P, 1))];
const DOM3 = { x: [-3, 3], y: [-3, 3], z: [-3, 3] };
const par = (tt) => (/^[^+-]*$/.test(tt) ? tt : `(${tt})`);

function rotPart3(F, i, { first }) {
  const [b, a, e, c] = ROT_IDX[i];
  const dA = text(d(F[b], a));
  const dB = text(d(F[e], c));
  const goal = text(rotOf(F)[i]);
  const judge = { kind: 'equiv', vars: XYZ, domain: DOM3, target: 'no-int', goal, rot: true, traps: { v_rot_sign: [{ line: text(sub([], rotOf(F)[i])), ctx: { i: i + 1, want: goal } }] } };
  return {
    html: first ? null : t('Composante {a} de rot F :', { a: i + 1 }), ask: `(rot F)${SUBS[i]} =`, start: `pd(${text(F[b])},${XYZ[a]})-pd(${text(F[e])},${XYZ[c]})`, judge,
    lines: [{ math: `${dA}-${par(dB)}`, note: `∂F${SUBS[b]}/∂${XYZ[a]} − ∂F${SUBS[e]}/∂${XYZ[c]}`, subgoal: 'partials', blank: [dA, dB] }, { math: goal, note: t('On simplifie'), subgoal: 'rot-zero' }],
    menu: [act('derive', t('Dériver, puis faire la différence')), act('swap', t('Échanger l\'ordre des deux dérivées'), false, { rule: 'v_rot_sign', why: t('L\'ordre est fixé : on obtiendrait l\'opposé.') })],
  };
}

// The case: 'yes' (rot F = 0, Ω simply connected), 'no' (rot F ≠ 0), 'open' (rot F = 0, Ω with a hole).
function ptData(rng, { kind = null } = {}) {
  const k = kind || rng.pick(['yes', 'yes', 'no', 'open', 'open2']);
  if (k === 'yes' || k === 'no') {
    for (let tt = 0; tt < 200; tt++) {
      const phi = randPoly(rng, 3, 3, { maxDeg: 3, minDeg: 2 });
      if (phi.filter((x) => x.e.filter(Boolean).length >= 2).length < 2) continue;
      let F = [0, 1, 2].map((i) => d(phi, i));
      if (F.some(isZero) || F.some((c) => c.length > 3)) continue;
      if (k === 'no') {
        const j = rng.int(0, 2);
        const v = rng.pick([0, 1, 2].filter((x) => x !== j));
        F = F.map((c, i) => (i === j ? sum(c, [T(rng.pick([1, 2, -1, 3]), [0, 1, 2].map((x) => (x === v ? 1 : 0)))]) : c));
      }
      const rot = rotOf(F);
      if ((k === 'no') === rot.every(isZero)) continue;
      const D = rng.pick([{ html: 'ℝ³', convex: true }, { html: 'ℝ³', convex: true }, { html: t('le demi-espace {z > 0}'), k: 'le demi-espace {z > 0}', convex: true }, ((a) => ({ html: t('la boule {x² + y² + z² &lt; {a}}', { a }), k: `la boule {x² + y² + z² &lt; ${a}}`, convex: true }))(rng.pick([4, 9]))]);
      return { kind: k, dim: 3, F: F.map((c) => text(c)), Fs: F, rot: rot.map((r) => text(r)), D, phi };
    }
    const F = [[T(2, [1, 1, 0]), T(1, [0, 0, 1])], [T(1, [2, 0, 0])], [T(1, [1, 0, 0]), T(2, [0, 0, 1])]];
    return { kind: 'yes', dim: 3, F: F.map((c) => text(c)), Fs: F, rot: ['0', '0', '0'], D: { html: 'ℝ³', convex: true }, fallback: true };
  }
  // A field singular at the origin: a(x, y)/r² + b(−y, x)/r².
  const a = rng.pick([0, 1, 2]);
  const b = rng.pick([1, 2, 3]);
  const num = (tt) => (/[+-]/.test(tt.slice(1)) ? `(${tt})` : tt);
  const P = `${num(`${a ? `${a === 1 ? '' : a}x-` : '-'}${b === 1 ? '' : b}y`)}/(x^2+y^2)`;
  const Q = `${num(`${b === 1 ? '' : b}x${a ? `+${a === 1 ? '' : a}y` : ''}`)}/(x^2+y^2)`;
  const open = k === 'open';
  const D = open
    ? rng.pick([{ html: 'Ω = ℝ² \\ {(0, 0)}', convex: false, hole: true }, { html: t('la couronne Ω = {1 &lt; x² + y² &lt; 4}'), k: 'la couronne Ω = {1 &lt; x² + y² &lt; 4}', convex: false, hole: true }, { html: 'Ω = {x² + y² > 1}', convex: false, hole: true }])
    : rng.pick([{ html: t('le demi-plan Ω = {x > 0}'), k: 'le demi-plan Ω = {x > 0}', convex: true }, { html: t('le demi-plan Ω = {y &lt; 0}'), k: 'le demi-plan Ω = {y &lt; 0}', convex: true }, { html: t('le rectangle Ω = ]1 ; 3[ × ]−2 ; 2['), k: 'le rectangle Ω = ]1 ; 3[ × ]−2 ; 2[', convex: true }]);
  // k: the French text, for the item key.
  return { kind: open ? 'open' : 'yes', dim: 2, F: [P, Q], rot: ['0'], D, a, b };
}

const DOMAIN_OPTS = (D) => [
  { id: 'convex', label: t('{a} est convexe, donc simplement connexe', { a: D.html.replace(/^Ω = /, '') }), valid: !!D.convex, ...(D.convex ? { ref: true } : { rule: 'v_simply_connected_wrong', why: t('Ce domaine a un trou : il n\'est ni convexe ni simplement connexe.') }) },
  { id: 'hole', label: t('{a} n\'est pas simplement connexe : il y a un trou', { a: D.html.replace(/^Ω = /, '') }), valid: !D.convex, ...(!D.convex ? { ref: true } : { rule: 'v_simply_connected_wrong', why: t('Ce domaine est convexe : il n\'a pas de trou.') }) },
];
function conclusionOpts(kind) {
  return [
    { id: 'yes', label: t('F dérive d\'un potentiel sur Ω'), valid: kind === 'yes', ...(kind === 'yes' ? { ref: true } : kind === 'open' ? { rule: 'v_pot_no_domain', why: t('rot F = 0 ne suffit pas : Ω n\'est pas simplement connexe.') } : { why: t('rot F ≠ 0 : la condition nécessaire n\'est pas remplie.') }) },
    { id: 'no', label: t('F ne dérive pas d\'un potentiel sur Ω'), valid: kind === 'no', ...(kind === 'no' ? { ref: true } : kind === 'open' ? { why: t('Le critère ne dit rien sur un domaine troué : il faut une autre preuve (une courbe fermée).') } : { why: t('rot F = 0 et Ω est simplement connexe : le théorème donne un potentiel.') }) },
    { id: 'open', label: t('Le critère ne conclut pas : il faut une autre méthode (une courbe fermée autour du trou)'), valid: kind === 'open', ...(kind === 'open' ? { ref: true } : { why: kind === 'yes' ? t('Ici le critère conclut : Ω est simplement connexe.') : t('rot F ≠ 0 suffit à conclure.') }) },
  ];
}

function ptItem(level, rng, opts) {
  const D = ptData(rng, { kind: level === 1 ? rng.pick(['yes', 'no']) : null });
  const parts = [];
  if (D.dim === 3) [0, 1, 2].forEach((i) => parts.push(rotPart3(D.Fs, i, { first: i === 0 })));
  else {
    parts.push({
      start: `pd(${D.F[1]},x)-pd(${D.F[0]},y)`, judge: { kind: 'equiv', vars: ['x', 'y'], domain: { x: [0.5, 2], y: [0.5, 2] }, target: 'goal', goal: '0', rot: true },
      lines: [{ math: '0', note: t('rot F = ∂F₂/∂x − ∂F₁/∂y : tout se simplifie'), subgoal: 'rot-zero', blank: ['0'] }],
      menu: [act('derive', t('Dériver les deux quotients, puis faire la différence')), act('swap', t('Calculer ∂F₁/∂y − ∂F₂/∂x'), false, { rule: 'v_rot_sign', why: t('En 2D, rot F = ∂F₂/∂x − ∂F₁/∂y.') })],
    });
  }
  const rotLine = D.dim === 3 ? `rot F = (${D.rot.join(' ; ')})` : 'rot F = 0';
  parts.push({
    html: t('Conclusion :'), ask: 'rot F =', start: 'rot F',
    judge: { kind: 'vector', params: D.dim === 3 ? XYZ : ['x', 'y'], expect: D.dim === 3 ? `(${D.rot.join(' ; ')})` : '0', form: 'any' },
    decisions: [
      decision(t('Le domaine : {html}.', { html: D.D.html }), DOMAIN_OPTS(D.D), { keep1: true }),
      decision(t('Que dit le critère « rot F = 0 sur un domaine simplement connexe » ?'), conclusionOpts(D.kind), { keep1: true }),
    ],
    lines: [{ math: rotLine, note: D.kind === 'yes' ? t('rot F = 0 et Ω est simplement connexe : F dérive d\'un potentiel') : D.kind === 'no' ? t('rot F ≠ 0 : pas de potentiel, sur aucun domaine') : t('rot F = 0, mais Ω a un trou : le critère ne conclut pas'), subgoal: 'conclude' }],
  });
  if (level <= 2 && D.dim === 3) parts[0].notes = [t('rot F = (∂F₃/∂y − ∂F₂/∂z ; ∂F₁/∂z − ∂F₃/∂x ; ∂F₂/∂x − ∂F₁/∂y). Deux choses à vérifier : rot F = 0, et la forme du domaine.')];
  return vParts({
    skill: PT, level, parts, subgoals: PT_SUB, exam: examTag(opts), fallback: D.fallback,
    prompt: t('Soit {a} sur {html}. Calcule rot F, puis dis ce que le critère permet de conclure.', { a: fieldML(D.F), html: D.D.html }),
    key: `${PT}:${level}:${D.F.join('|')}:${D.D.k ?? D.D.html}`,
    hints: H(t('Deux choses à vérifier : rot F = 0, et la forme du domaine (simplement connexe ? convexe ?).'), t('{a} ; Ω est-il convexe ?', { a: D.dim === 3 ? `rot F = ${tupML(D.rot)}` : 'rot F = ∂F₂/∂x − ∂F₁/∂y = 0' }), `${D.D.convex ? t('{html} est convexe', { html: D.D.html }) : t('{html} a un trou', { html: D.D.html })} : ${conclusionOpts(D.kind).find((o) => o.valid).label}.`),
  });
}

// Level 5: three fields, three domains: what does the test say for each?
function ptProblem(level, rng) {
  const kinds = rng.shuffle(['yes', 'no', 'open']);
  const parts = kinds.map((k, i) => {
    const D = ptData(rng, { kind: k === 'open' ? 'open' : k === 'yes' ? rng.pick(['yes', 'open2']) : 'no' });
    const right = conclusionOpts(D.kind).find((o) => o.valid);
    const wrongs = conclusionOpts(D.kind).filter((o) => !o.valid).map((o) => opt(o.label, o.rule || null));
    return {
      item: mcqD({
        skill: PT, level, noHints: true, key: `${PT}:p5:${i}:${D.F.join('|')}`,
        prompt: t('F = {a} sur {html}{b}.', { a: tupML(D.F), html: D.D.html, b: D.dim === 3 ? '' : t(' (rot F = 0 là où F est défini)') }),
        right: right.label, wrongs: [...wrongs, opt(t('Il faut d\'abord trouver φ pour conclure'))],
        solution: [{ html: `${D.dim === 3 ? `rot F = ${tupML(D.rot)}` : 'rot F = 0'} ; ${D.D.convex ? t('le domaine est convexe') : t('le domaine a un trou')} : ${right.label}.`, note: '' }],
      }, rng),
      points: 1, title: t('Champ {a}', { a: i + 1 }),
    };
  });
  return problemItem({ skill: PT, level, prompt: t('Pour chaque champ et son domaine, que permet de conclure le critère « rot F = 0 sur un domaine simplement connexe » ?'), parts, key: parts.map((p) => p.item.key).join('|') });
}

// Exam (format 2022): F = (ax, b/y) on {y > 0}, or a field with rot F ≠ 0.
function ptMcq(level, rng, opts) {
  const a = rng.pick([1, 2, 3]);
  const b = rng.pick([1, 2, 4, 5]);
  const yes = rng.chance(0.6);
  const F = yes ? [`${a === 1 ? '' : a}x`, `${b}/y`] : [`${a === 1 ? '' : a}y`, `${b}/y`];
  const right = yes ? t('Oui : rot F = 0 et Ω est convexe') : `Non : rot F = ${-a} ≠ 0`.replace('-', '−');
  return mcqD({
    skill: PT, level, exam: examTag(opts), key: `${PT}:mcq:${F.join('|')}`,
    prompt: t('Le champ F(x, y) = {a} sur Ω = {(x, y) : y > 0} dérive-t-il d\'un potentiel ?', { a: tupML(F) }),
    right,
    wrongs: [
      opt(yes ? t('Oui, car rot F = 0, quel que soit le domaine') : t('Oui, car chaque composante a une primitive'), yes ? 'v_pot_no_domain' : null),
      opt(t('On ne peut pas savoir : F n\'est pas défini sur tout ℝ²')),
      opt(yes ? t('Non : F n\'est pas défini en y = 0') : t('Oui : rot F = 0 et Ω est convexe')),
    ],
    solution: [{ html: yes ? t('rot F = ∂({b}/y)/∂x − ∂({a}x)/∂y = 0 et Ω est convexe : F dérive d\'un potentiel, par exemple φ = {a}x²/2 + {b} ln y.', { b, a }) : t('rot F = ∂({b}/y)/∂x − ∂({a}y)/∂y = −{a} ≠ 0 : pas de potentiel.', { b, a }), note: '' }],
  }, rng);
}

export const GEN = {
  [DT]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return potDomainMcq(DT, 4, rng, opts);
    if (level === 1) return oneProp(level, rng);
    if (level === 2 || level === 3) return profileMcq(level, rng);
    if (level === 4) return exampleItem(level, rng);
    return potDomainMcq(DT, 5, rng);
  },
  [PT]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return ptMcq(4, rng, opts);
    if (level === 5) return ptProblem(level, rng);
    return ptItem(level, rng, opts);
  },
};
export { q };
