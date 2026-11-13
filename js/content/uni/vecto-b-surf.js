// v-surf-param, v-surf-area, v-flux (module V, part b, step U10): a
// surface parametrised by σ(r, φ) (graph or surface of revolution) or
// σ(θ, φ) (sphere), its partial derivatives and normal σ_u ∧ σ_v, then
// ∬ f ds (with |σ_u ∧ σ_v|) or ∬ F · ds (with σ_u ∧ σ_v, sign checked).
// Items are partsItem (geo-kit.js): a part `param`, parts `vector` for σ_u,
// σ_v, σ_u ∧ σ_v and F(σ) · N, a part `equiv` for |σ_u ∧ σ_v|, a part
// `definite` for the value.

import {
  KEYS, q, qs, cm, sum, poly, piT, fr, pick, SG, H, MT, PML, VML,
  revSurf, sphSurf, paramJudge, vecJudge, defJudge, eqJudge, partsItem, examTag,
  choice, opt, decision, menu, normalBlank,
} from './vecto-b-kit.js';
import { t } from '../../i18n.js';

// ---------- surfaces of the catalogue ----------

const sq = (n) => n * n;
// Σ described in words (HTML), its surface, and what is asked.
function surface(rng, o = {}) {
  const kinds = o.kinds || ['rev', 'parab', 'cap', 'cone', 'sph'];
  const kind = pick(rng, kinds);
  if (kind === 'rev') {
    const p = pick(rng, [0, 1]);
    const qq = pick(rng, [2, 3]);
    const cut = o.cut || pick(rng, ['y', 'y', 'none']);
    const phi = cut === 'y' ? ['0', 'π'] : ['0', '2π'];
    const s = revSurf({ h: [p * qq, qq - p, -1], rho: String(qq), rho2: sq(qq), phi, order: o.order });
    const R = 'r';
    const zDesc = p ? `(${R} + ${p})(${qq} − ${R})` : `${R}(${qq} − ${R})`;
    return {
      s, kind, id: `rev${p}${qq}${cut}`, orient: t('vers le haut'), solid: true,
      html: `Σ = {z = ${zDesc.replace(/r/g, '√(x² + y²)')}${cut === 'y' ? ', y ≥ 0' : ''}, z ≥ 0}`,
      hint: t('z = {zDesc} ≥ 0 pour 0 ≤ r ≤ {qq}{a}', { zDesc, qq, a: cut === 'y' ? t(', et y ≥ 0 donne sin φ ≥ 0') : '' }),
      wrongPhi: cut === 'y' ? ['0', '2π'] : null,
    };
  }
  if (kind === 'parab') {
    const a = pick(rng, [1, 2]);
    const rho = pick(rng, [1, 2]);
    const s = revSurf({ h: [0, 0, a], rho: String(rho), rho2: sq(rho), order: o.order });
    return { s, kind, id: `parab${a}${rho}`, orient: t('vers le haut'), html: `Σ = {z = ${a === 1 ? 'x² + y²' : `${a}(x² + y²)`}, z ≤ ${a * rho * rho}}`, hint: t('z ≤ {a} donne r ≤ {rho}', { a: a * rho * rho, rho }) };
  }
  if (kind === 'cap') {
    const rho = pick(rng, [1, 2, 3]);
    const s = revSurf({ h: [sq(rho), 0, -1], rho: String(rho), rho2: sq(rho), order: o.order });
    return { s, kind, id: `cap${rho}`, orient: t('vers le haut'), html: `Σ = {z = ${sq(rho)} − x² − y², z ≥ 0}`, hint: t('z ≥ 0 donne r ≤ {rho}', { rho }) };
  }
  if (kind === 'cone') {
    const k = pick(rng, [1, 2]);
    const rho = pick(rng, [1, 2, 3]);
    const s = revSurf({ h: [0, k, 0], rho: String(rho), rho2: sq(rho), order: o.order });
    return { s, kind, id: `cone${k}${rho}`, orient: t('vers le haut'), html: `Σ = {z = ${k === 1 ? '' : k}√(x² + y²), z ≤ ${k * rho}}`, hint: t('z ≤ {a} donne r ≤ {rho}', { a: k * rho, rho }) };
  }
  const R = pick(rng, [1, 2, 3]);
  const half = o.half ?? rng.chance(0.6);
  const s = sphSurf({ R, top: half ? 'π/2' : 'π', order: o.order });
  return { s, kind: 'sph', id: `sph${R}${half ? 'h' : 'f'}`, orient: t('extérieure'), html: half ? `Σ = {x² + y² + z² = ${R * R}, z ≥ 0}` : `Σ = {x² + y² + z² = ${R * R}}`, hint: half ? t('z ≥ 0 donne θ ∈ [0 ; π/2]') : t('toute la sphère : θ ∈ [0 ; π]') };
}

const TYPE_OPTIONS = (d) => {
  const sph = d.kind === 'sph';
  return [
    { id: 'rev', label: t('Coordonnées polaires : σ(r, φ) = (r cos φ, r sin φ, h(r))'), valid: !sph, ref: !sph, why: t('Une sphère n\'est pas le graphe d\'une seule fonction de r : on la paramètre par θ et φ.') },
    { id: 'graph', label: t('Graphe : σ(x, y) = (x, y, g(x, y))'), valid: !sph, quality: 'poor', why: sph ? t('Une sphère n\'est pas un graphe au-dessus d\'un domaine du plan.') : t('Juste, mais le domaine est un disque : en x, y, ses bornes et les racines rendent le calcul plus long.') },
    { id: 'sph', label: t('Coordonnées sphériques : σ(θ, φ), θ depuis l\'axe z'), valid: sph, ref: sph, why: t('Σ n\'est pas une sphère.') },
  ];
};

// The orientation decision: the sign of the third component.
function orientDecision(d) {
  const s = d.s;
  if (d.kind === 'sph') {
    return decision(t('La normale {du} est-elle extérieure ?', { du: s.du }), [
      { id: 'out', label: t('Oui : {du} = {a}{b}, avec sin θ ≥ 0', { du: s.du, a: s.R === 1 ? '' : s.R * s.R, b: s.R === 1 ? 'sin θ · σ' : ` sin θ · σ/${s.R}` }), valid: s.up, ref: s.up, why: t('Regarde l\'ordre des paramètres : σ_φ ∧ σ_θ = −σ_θ ∧ σ_φ.'), ...(s.up ? {} : { rule: 'v_cross_order' }) },
      { id: 'in', label: t('Non : elle pointe vers l\'intérieur'), valid: !s.up, ref: !s.up, why: t('σ_θ ∧ σ_φ = R² sin θ · (σ/R) : un multiple positif du rayon, donc extérieure.'), ...(s.up ? { rule: 'v_cross_order' } : {}) },
    ]);
  }
  return decision(t('Vers où pointe la normale {du} ?', { du: s.du }), [
    { id: 'up', label: t('Vers le haut'), valid: s.up, ref: s.up, why: t('Sa 3e composante vaut −r < 0 : elle pointe vers le bas.'), ...(s.up ? {} : { rule: 'v_cross_order' }) },
    { id: 'down', label: t('Vers le bas'), valid: !s.up, ref: !s.up, why: t('Sa 3e composante vaut r > 0 : elle pointe vers le haut.'), ...(s.up ? { rule: 'v_cross_order' } : {}) },
  ]);
}

// −N and N with its second component negated (v_cross_order).
const negT = (tt) => (tt.startsWith('-') ? tt.slice(1) : `-${tt}`);
function crossTraps(N) {
  const comps = N.slice(1, -1).split(' ; ');
  return [`(${comps.map(negT).join(' ; ')})`, `(${comps[0]} ; ${negT(comps[1])} ; ${comps[2]})`];
}

// Parts: σ and A, σ_u, σ_v, σ_u ∧ σ_v (orientation decision).
function surfaceParts(d, level, o = {}) {
  const s = d.s;
  const [u, v] = s.params;
  const H0 = s.kind === 'sph' ? s.sigma.split(' ; ')[2].replace(/\)$/, '') : s.H;
  const box = s.line.split('∈ ')[1];
  const ivs = box.split(' × ').map((iv) => iv.replace(/^\[0 ; /, '').replace(/\]$/, ''));
  const paramTraps = {};
  if (s.kind === 'sph') paramTraps.v_sphere_theta = [s.swappedLine];
  const parts = [{
    html: o.paramHtml || t('Paramétrisation de Σ et domaine A des paramètres :'),
    start: s.label, judge: paramJudge(s, paramTraps),
    decisions: level >= 3 && !o.noType ? [decision(t('Quelle paramétrisation ?'), TYPE_OPTIONS(d), [3, 4, 5])] : [],
    menu: menu(t('Écrire σ et le domaine A'), [{ label: t('Prendre φ ∈ [0 ; 2π] sans regarder les conditions'), why: d.wrongPhi ? t('y ≥ 0 veut dire sin φ ≥ 0 : φ ∈ [0 ; π].') : t('Regarde d\'abord les conditions sur Σ.'), rule: 'v_surf_domain' }]),
    lines: [{ math: s.bare, subgoal: 'param', note: d.hint, blank: H0.length > 1 ? [H0] : ivs, after: H0.length > 1 ? '=' : '∈', blank2: ivs, after2: '∈' }],
  }];
  if (!o.noPartials) {
    parts.push({
      html: t('Dérivées partielles σ_{u} :', { u }), ask: `σ_${u} =`, start: `σ_${u}`, judge: vecJudge(derivOf(s, u), s.params),
      menu: menu(t('Dériver chaque composante par rapport à {u}', { u }), [{ label: t('Dériver par rapport à {v}', { v }), why: t('σ_{u} est la dérivée par rapport à {u}.', { u }) }]),
      lines: [{ math: `σ_${u} = ${derivOf(s, u)}`, subgoal: 'partials', blank: [lastComp(derivOf(s, u))] }],
    });
    parts.push({
      html: t('Dérivées partielles σ_{v} :', { v }), ask: `σ_${v} =`, start: `σ_${v}`, judge: vecJudge(derivOf(s, v), s.params),
      menu: menu(t('Dériver chaque composante par rapport à {v}', { v }), [{ label: t('Dériver par rapport à {u}', { u }), why: t('σ_{v} est la dérivée par rapport à {v}.', { v }) }]),
      lines: [{ math: `σ_${v} = ${derivOf(s, v)}`, subgoal: 'partials', blank: [firstComp(derivOf(s, v))] }],
    });
  }
  parts.push({
    html: t('Normale {du} :', { du: s.du }), ask: `${s.du} =`, start: s.du, judge: vecJudge(s.N, s.params, { v_cross_order: crossTraps(s.N) }),
    decisions: o.noOrient ? [] : [orientDecision(d)],
    menu: menu(t('Produit vectoriel, dans l\'ordre des paramètres'), [{ label: t('Produit vectoriel dans l\'autre ordre'), rule: 'v_cross_order', why: t('L\'ordre des paramètres de σ({a}) fixe {du}.', { a: s.params.join(', '), du: s.du }) }]),
    lines: [{ math: `${s.du} = ${s.N}`, subgoal: 'cross', blank: [normalBlank(s)], note: d.kind === 'sph' ? `${s.R === 1 ? '' : `${s.R * s.R} `}sin θ · (sin θ cos φ, sin θ sin φ, cos θ)` : '' }],
  });
  return parts;
}
const comps = (tt) => tt.slice(1, -1).split(' ; ');
const lastComp = (tt) => comps(tt).at(-1);
const firstComp = (tt) => comps(tt)[0];
function derivOf(s, p) {
  if (s.kind === 'sph') return p === 'θ' ? s.st : s.sp;
  return p === 'r' ? s.sr : s.sp;
}

const SUB_PARAM = [
  SG('param', t('paramétrer Σ et son domaine'), 'v-surf-param'),
  SG('partials', t('dérivées partielles de σ'), 'a2-partials'),
  SG('cross', t('produit vectoriel σ_u ∧ σ_v'), 'g4-cross'),
];

// ---------- v-surf-param ----------

function surfParamItem(level, rng, opts) {
  const d = surface(rng, level === 5 ? { kinds: ['rev'], cut: 'y' } : {});
  const s = d.s;
  const parts = surfaceParts(d, level);
  return partsItem({
    skill: 'v-surf-param', level, parts, keys: KEYS,
    prompt: t('Paramètre {html} : donne σ et le domaine A, puis σ_u, σ_v et la normale σ_u ∧ σ_v. Dis vers où elle pointe.', { html: d.html }),
    hints: H(d.kind === 'sph' ? t('Sphère : θ depuis l\'axe z, φ autour : σ(θ, φ) = (R sin θ cos φ, R sin θ sin φ, R cos θ).') : t('Surface de révolution : σ(r, φ) = (r cos φ, r sin φ, h(r)). Les conditions donnent les bornes de r et de φ.'),
      `σ = ${PML(s.sigma, s.params)} ; ${d.hint}.`,
      `${VML(`${s.du} = ${s.N}`, s.params)}`),
    subgoals: SUB_PARAM, key: `v-surf-param:${level}:${d.id}:${s.order}`, exam: examTag(opts),
  });
}

function surfParamMcq(level, rng, opts) {
  const d = surface(rng, { kinds: ['rev', 'parab', 'cap', 'cone', 'sph'] });
  const s = d.s;
  const [a, b] = crossTraps(s.N);
  const noR = s.kind === 'sph'
    ? `(${cm(s.R * s.R, 'cos(θ)^2 cos(φ)')} ; ${cm(s.R * s.R, 'cos(θ)^2 sin(φ)')} ; ${cm(s.R * s.R, 'sin(θ)cos(θ)')})`
    : `(${comps(s.N).slice(0, 2).map((c) => c.replace(/r\^2 /, 'r ').replace(/\)r /, ') ').replace(/^(-?\d*)r /, '$1')).join(' ; ')} ; 1)`;
  return choice({
    skill: 'v-surf-param', level, key: `v-surf-param:mcq:${d.id}`, exam: examTag(opts),
    prompt: t('{html} est paramétrée par {a}. Que vaut {du} ?', { html: d.html, a: PML(s.line, s.params), du: s.du }),
    right: VML(s.N, s.params),
    wrongs: [opt(VML(a, s.params), 'v_cross_order'), opt(VML(b, s.params), 'v_cross_order'), opt(VML(noR, s.params), s.kind === 'sph' ? 'v_sphere_theta' : null)],
    solution: [{ html: t('{a}, {b}, donc {c}.', { a: VML(`${derivOf(s, s.params[0]).replace(/^/, `σ_${s.params[0]} = `)}`, s.params), b: VML(`σ_${s.params[1]} = ${derivOf(s, s.params[1])}`, s.params), c: VML(`${s.du} = ${s.N}`, s.params) }), note: '' }],
    expectedSec: 150,
  }, rng);
}

// ---------- v-surf-area ----------

// Graphs whose |σ_r ∧ σ_φ| = r√(1 + 4a²r²) integrates to a rational·π:
// 1 + 4a²ρ² is a perfect square s².
const AREA_PARAB = [
  { a: 1, rho: 'sqrt(2)', rho2: 2, s: 3 }, { a: 1, rho: 'sqrt(6)', rho2: 6, s: 5 }, { a: 2, rho: 'sqrt(3/2)', rho2: '3/2', s: 5 },
  { a: q(1, 2), rho: 'sqrt(3)', rho2: 3, s: 2 }, { a: q(1, 2), rho: 'sqrt(8)', rho2: 8, s: 3 }, { a: 1, rho: 'sqrt(12)', rho2: 12, s: 7 },
];

function areaData(rng, o = {}) {
  const kind = o.kind || pick(rng, ['parab', 'parab', 'sph', 'zhemi', 'cone']);
  if (kind === 'parab') {
    const c = pick(rng, AREA_PARAB);
    const a = q(c.a);
    const s = revSurf({ h: [0, 0, a], rho: c.rho, rho2: c.rho2 });
    // aire = π(s³ − 1)/(6a²)
    const val = q(c.s ** 3 - 1).div(a.mul(a).mul(6));
    const zMax = a.mul(q(c.rho2));
    const fourA2 = a.mul(a).mul(4);
    return {
      kind, s, id: `parab${qs(a)}:${c.rho2}`, f: '1', fText: 'aire(Σ)',
      html: `Σ = {z = ${a.eq(1) ? 'x² + y²' : a.d === 1 ? `${a.n}(x² + y²)` : `(x² + y²)/${a.d}`}, z ≤ ${fr(qs(zMax))}}`,
      norm: `r sqrt(1+${qs(fourA2)}r^2)`.replace('+1r', '+r'),
      inner: `r sqrt(1+${qs(fourA2)}r^2)`.replace('+1r', '+r'),
      value: piT(val), valQ: val, scaled: (k) => piT(val.mul(k)),
      areaA: `2π${c.rho.replace(/^sqrt\((.*)\)$/, '√($1)')}`, // ∬_A dr dφ (v_jacobian_surface)
      third: `π·${qs(c.rho2)}`, // ∬ (σ_r ∧ σ_φ)₃ = πρ² (v_normal_not_norm)
      rIv: [0, c.rho], hint: t('z ≤ {a} donne r ≤ {b}', { a: fr(qs(zMax)), b: c.rho.replace(/^sqrt\((\d+)\)$/, '√$1').replace(/^sqrt/, '√') }),
    };
  }
  if (kind === 'cone') {
    const k = pick(rng, [1, 2]);
    const rho = pick(rng, [1, 2, 3]);
    const s = revSurf({ h: [0, k, 0], rho: String(rho), rho2: rho * rho });
    // |N| = r√(1 + k²), aire = πρ²√(1 + k²)
    const root = 1 + k * k;
    return {
      kind, s, id: `cone${k}${rho}`, f: '1', fText: 'aire(Σ)', html: `Σ = {z = ${k === 1 ? '' : k}√(x² + y²), z ≤ ${k * rho}}`,
      norm: `r sqrt(${root})`, inner: `r sqrt(${root})`, value: `${rho * rho === 1 ? '' : rho * rho}π√${root}`, scaled: (k) => `${cm(q(rho * rho).mul(k), 'π')}√${root}`,
      areaA: `${piT(2 * rho)}`, third: piT(rho * rho), rIv: [0, String(rho)], hint: t('z ≤ {a} donne r ≤ {rho}', { a: k * rho, rho }),
    };
  }
  const R = pick(rng, [1, 2, 3]);
  const R2 = R * R;
  if (kind === 'zhemi') {
    const s = sphSurf({ R, top: 'π/2' });
    return {
      kind, s, id: `zhemi${R}`, f: cm(R, 'cos(θ)'), fText: '∬_Σ z ds', html: `Σ = {x² + y² + z² = ${R2}, z ≥ 0}`,
      norm: s.norm, inner: `${cm(R, 'cos(θ)')}·${s.norm}`, value: piT(R * R2), scaled: (k) => piT(q(R * R2).mul(k)), areaA: piT(2 * R), // ∬_A z dθ dφ = 2πR
      third: piT(q(2 * R * R2, 3)), rIv: null, hint: t('z ≥ 0 donne θ ∈ [0 ; π/2]'),
    };
  }
  const half = rng.chance(0.5);
  const s = sphSurf({ R, top: half ? 'π/2' : 'π' });
  return {
    kind, s, id: `sph${R}${half}`, f: '1', fText: 'aire(Σ)', html: half ? `Σ = {x² + y² + z² = ${R2}, z ≥ 0}` : `Σ = {x² + y² + z² = ${R2}}`,
    norm: s.norm, inner: s.norm, value: piT(half ? 2 * R2 : 4 * R2), scaled: (k) => piT(q(half ? 2 * R2 : 4 * R2).mul(k)), areaA: half ? `π^2` : `2π^2`, third: half ? piT(R2) : '0',
    hint: half ? t('z ≥ 0 donne θ ∈ [0 ; π/2]') : 'θ ∈ [0 ; π]',
  };
}

// The double integral of the area or of f ds, in the parameters.
function areaIntegral(d) {
  const s = d.s;
  if (s.kind === 'sph') return `int(int(${d.inner}, θ, 0, ${s.top}), φ, 0, 2π)`;
  return `int(int(${d.inner}, r, 0, ${s.rho}), φ, 0, 2π)`;
}

const SUB_AREA = [
  SG('param', t('paramétrer Σ'), 'v-surf-param'),
  SG('norm', t('norme |σ_u ∧ σ_v|'), 'v-surf-area'),
  SG('integrand', t('intégrale double sur A'), 'v-surf-area'),
  SG('value', t('calculer l\'intégrale double'), 'a2-fubini-rect'),
];

function surfAreaItem(level, rng, opts) {
  const d = areaData(rng, level === 5 ? { kind: 'zhemi' } : {});
  const s = d.s;
  const vars = s.params;
  const dom = s.kind === 'sph' ? { θ: [0.1, 3] } : { r: [0.1, 3] };
  const I = areaIntegral(d);
  const thirdComp = lastComp(s.kind === 'sph' ? s.Nout : s.Nup);
  const parts = [];
  if (level >= 4) parts.push(...surfaceParts({ ...d, orient: '' }, level, { noPartials: true, noOrient: true, noType: level === 5 }));
  else if (level === 3) parts.push(...surfaceParts({ ...d }, level, { noPartials: true, noOrient: true }));
  const normPart = {
    html: t('Norme de la normale : |{du}| =', { du: s.du }), ask: `|${s.du}| =`, start: s.normRaw,
    judge: eqJudge(vars, { domain: dom, traps: { v_normal_not_norm: [thirdComp] } }),
    decisions: level >= 2 ? [decision(t('Qu\'est-ce qui multiplie du dv dans ds ?'), [
      { id: 'norm', label: t('La norme |{du}|', { du: s.du }), valid: true, ref: true },
      { id: 'vec', label: t('Le vecteur {du}', { du: s.du }), valid: false, rule: 'v_normal_not_norm', why: t('ds = |σ_u ∧ σ_v| du dv : un nombre, la norme.') },
      { id: 'third', label: t('Sa 3e composante {a}', { a: fr(thirdComp) }), valid: false, rule: 'v_normal_not_norm', why: t('La 3e composante ne suffit pas : c\'est la norme du vecteur entier.') },
    ], [2, 3])] : [],
    menu: menu(t('Simplifier la racine (sin² + cos² = 1)'), [{ label: t('Garder seulement la 3e composante'), rule: 'v_normal_not_norm', why: t('C\'est la norme du vecteur entier qu\'il faut.') }]),
    lines: [{ math: d.norm, subgoal: 'norm', blank: [d.norm.replace(/^r |^\d*sin\(θ\)$/, '').replace(/^(\d+)sin\(θ\)$/, '$1') || d.norm] }],
  };
  // At level 1, the norm is the first part.
  if (level <= 2) {
    if (level === 2) parts.push(surfaceParts(d, 2, { noPartials: true, noOrient: true }).at(-1));
  }
  parts.push(normPart);
  const traps = { v_jacobian_surface: d.noA ? [] : [d.areaA], v_normal_not_norm: [d.third] };
  if (s.kind === 'sph') traps.v_sphere_theta = [I.replace(/sin\(θ\)/g, 'COS').replace(/cos\(θ\)/g, 'sin(θ)').replace(/COS/g, 'cos(θ)')];
  parts.push({
    html: t('{a} : intégrale double sur A, puis sa valeur :', { a: d.fText === 'aire(Σ)' ? t('Aire') : '∬ z ds' }), ask: `${d.fText} =`, start: I,
    judge: defJudge(traps),
    menu: menu(t('Intégrer f(σ) · |σ_u ∧ σ_v| sur A'), [{ label: t('Intégrer 1 sur A (aire de A)'), rule: 'v_jacobian_surface', why: t('L\'aire de A n\'est pas celle de Σ : il faut le facteur |σ_u ∧ σ_v|.') }]),
    lines: [{ math: d.value, subgoal: 'value', blank: [d.value] }],
  });
  return partsItem({
    skill: 'v-surf-area', level, parts, keys: KEYS,
    prompt: `${d.fText === 'aire(Σ)' ? t('Calcule l\'aire de {html}.', { html: d.html }) : t('Calcule ∬_Σ z ds pour {html}.', { html: d.html })}${level <= 2 ? t(' On donne {a}{b}.', { a: PML(s.line, s.params), b: level === 1 ? t(' et {a}', { a: VML(`${s.du} = ${s.kind === 'sph' ? s.Nout : s.Nup}`, s.params) }) : '' }) : ''}`,
    hints: H(t('ds = |σ_u ∧ σ_v| du dv : calcule la norme de la normale, puis intègre sur A.'),
      `|${s.du}| = ${MT(d.norm, { vars })}.`,
      `${d.fText} = ${MT(I, { vars })}.`),
    subgoals: SUB_AREA, key: `v-surf-area:${level}:${d.id}`, exam: examTag(opts),
  });
}

function surfAreaMcq(level, rng, opts) {
  const d = areaData(rng, { kind: pick(rng, ['parab', 'cone', 'sph']) });
  const s = d.s;
  const show = (tt) => MT(tt, {});
  return choice({
    skill: 'v-surf-area', level, key: `v-surf-area:mcq:${d.id}`, exam: examTag(opts),
    prompt: t('Aire de {html} :', { html: d.html }),
    right: show(d.value),
    wrongs: [opt(show(d.areaA), 'v_jacobian_surface'), opt(show(d.third), 'v_normal_not_norm'), opt(show(d.scaled(2))), opt(show(d.scaled(q(1, 2))))],
    solution: [{ html: t('{a} ; |{du}| = {b} ; aire = {c} = {d}.', { a: PML(s.line, s.params), du: s.du, b: MT(d.norm, { vars: s.params }), c: MT(areaIntegral(d), { vars: s.params }), d: show(d.value) }), note: '' }],
    expectedSec: 180,
  }, rng);
}

// ---------- v-flux ----------

// (F, Σ) whose flux is rational·π: F(σ) · N is a polynomial in r (or
// sin θ, cos θ) once the φ-integrals of cos, sin vanish.
function fluxData(rng, o = {}) {
  const kind = o.kind || pick(rng, ['parab', 'cap', 'cone', 'sph']);
  const down = !o.up && kind !== 'sph' && rng.chance(0.3);
  if (kind === 'sph') {
    const R = pick(rng, [1, 2, 3]);
    const half = rng.chance(0.5);
    const s = sphSurf({ R, top: half ? 'π/2' : 'π' });
    const R3 = R ** 3;
    const F = pick(rng, ['xyz', 'z']);
    // F·N: (x, y, z) → R³ sin θ ; (0, 0, z) → R³ sin θ cos²θ
    const integrand = F === 'xyz' ? cm(R3, 'sin(θ)') : cm(R3, 'sin(θ)cos(θ)^2');
    const Fs = F === 'xyz' ? `(${cm(R, 'sin(θ)cos(φ)')} ; ${cm(R, 'sin(θ)sin(φ)')} ; ${cm(R, 'cos(θ)')})` : `(0 ; 0 ; ${cm(R, 'cos(θ)')})`;
    // (x, y, z): 2πR³ (half), 4πR³ ; (0, 0, z): ∫ sin θ cos²θ = 1/3 (half), 2/3: 2πR³/3, 4πR³/3.
    const v = F === 'xyz' ? q(half ? 2 : 4).mul(R3) : q(half ? 2 : 4, 3).mul(R3);
    return {
      kind, s, id: `sph${R}${half}${F}`, F: F === 'xyz' ? '(x, y, z)' : '(0, 0, z)', Fs, integrand,
      html: half ? t('l\'hémisphère Σ = {x² + y² + z² = {a}, z ≥ 0}', { a: R * R }) : t('la sphère Σ = {x² + y² + z² = {a}}', { a: R * R }),
      orient: t('normale extérieure'), value: piT(v), valQ: v, unitTwice: `int(int(${integrand}/(${s.norm}), θ, 0, ${s.top}), φ, 0, 2π)`,
      I: `int(int(${integrand}, θ, 0, ${s.top}), φ, 0, 2π)`,
    };
  }
  let s0;
  let html;
  let id;
  if (kind === 'parab') {
    const a = pick(rng, [1, 2]);
    const rho = pick(rng, [1, 2]);
    s0 = { h: [0, 0, a], rho, html: `Σ = {z = ${a === 1 ? 'x² + y²' : `${a}(x² + y²)`}, z ≤ ${a * rho * rho}}` };
  } else if (kind === 'cap') {
    const rho = pick(rng, [1, 2]);
    s0 = { h: [rho * rho, 0, -1], rho, html: `Σ = {z = ${rho * rho} − x² − y², z ≥ 0}` };
  } else {
    const k = pick(rng, [1, 2]);
    const rho = pick(rng, [1, 2]);
    s0 = { h: [0, k, 0], rho, html: `Σ = {z = ${k === 1 ? '' : k}√(x² + y²), z ≤ ${k * rho}}` };
  }
  html = s0.html;
  const s = revSurf({ h: s0.h, rho: String(s0.rho), rho2: s0.rho ** 2, order: down ? 'φr' : 'rφ' });
  id = `${kind}${s0.h.join('')}${s0.rho}${down ? 'd' : 'u'}`;
  const F = pick(rng, ['z', 'xy0', 'xyz', '001']);
  const [c0, c1, c2] = s.h; // h = c0 + c1 r + c2 r²
  // N up = (−h′ r cos φ, −h′ r sin φ, r), h′ = c1 + 2c2 r.
  // F·N_up: z → h·r ; (x, y, 0) → −h′ r² ; (x, y, z) → (h − h′ r) r ; (0, 0, 1) → r.
  const hr = [c0, c1, c2];
  const dh = [c1, c2.mul(2)];
  const times = (cs, k) => [...Array(k).fill(q(0)), ...cs]; // multiply by r^k
  const negs = (cs) => cs.map((c) => c.neg());
  const add = (a, b) => Array.from({ length: Math.max(a.length, b.length) }, (_, i) => (a[i] ?? q(0)).add(b[i] ?? q(0)));
  let P = F === 'z' ? times(hr, 1) : F === 'xy0' ? negs(times(dh, 2)) : F === 'xyz' ? add(times(hr, 1), negs(times(dh, 2))) : [q(0), q(1)];
  if (down) P = negs(P);
  const Fs = F === 'z' ? `(0 ; 0 ; ${s.H})` : F === 'xy0' ? '(r cos(φ) ; r sin(φ) ; 0)' : F === '001' ? '(0 ; 0 ; 1)' : `(r cos(φ) ; r sin(φ) ; ${s.H})`;
  // ∫₀^ρ Σ pₖ rᵏ dr · 2π
  const val = P.reduce((acc, c, k) => acc.add(c.mul(q(s0.rho ** (k + 1))).div(k + 1)), q(0)).mul(2);
  const integrand = poly(P, 'r');
  return {
    kind, s, id: `${id}${F}`, F: { z: '(0, 0, z)', xy0: '(x, y, 0)', xyz: '(x, y, z)', '001': '(0, 0, 1)' }[F], Fs, integrand, html,
    orient: down ? t('normale vers le bas') : t('normale vers le haut'), value: piT(val), valQ: val,
    I: `int(int(${integrand}, r, 0, ${s0.rho}), φ, 0, 2π)`,
    unitTwice: `int(int((${integrand})/(${s.norm}), r, 0, ${s0.rho}), φ, 0, 2π)`,
  };
}

const SUB_FLUX = [
  SG('param', t('paramétrer Σ'), 'v-surf-param'),
  SG('normal', t('normale σ_u ∧ σ_v et son sens'), 'v-surf-param'),
  SG('integrand', 'F(σ) · (σ_u ∧ σ_v)', 'v-flux'),
  SG('value', t('intégrer sur A'), 'v-flux'),
];

function fluxParts(d, level, o = {}) {
  const s = d.s;
  const parts = [];
  if (!o.noParam) {
    const sp = surfaceParts({ ...d, orient: d.orient }, level, { noPartials: true, noType: true });
    sp[0].decisions = level >= 3 && s.kind !== 'sph' ? [decision(t('On demande la {orient}. Avec σ(r, φ), σ_r ∧ σ_φ a pour 3e composante r > 0. Que fais-tu ?', { orient: d.orient }), [
      { id: 'keep', label: t('Garder l\'ordre (r, φ)'), valid: s.up, ref: s.up, why: t('σ_r ∧ σ_φ pointe vers le haut : il faut l\'autre sens. Échange l\'ordre des paramètres.'), ...(s.up ? {} : { rule: 'v_normal_flip' }) },
      { id: 'swap', label: t('Échanger l\'ordre : σ(φ, r)'), valid: !s.up, ref: !s.up, why: t('σ_r ∧ σ_φ pointe déjà vers le haut : on garde l\'ordre.'), ...(s.up ? { rule: 'v_normal_flip' } : {}) },
    ], [3, 4, 5])] : [];
    sp[1].lines[0].subgoal = 'normal';
    parts.push(...sp);
  }
  const neg = (tt) => `-(${tt})`;
  parts.push({
    html: `F(σ) · (${s.du}) :`, ask: `F(σ) · (${s.du}) =`, start: `F(σ) · (${s.du})`,
    judge: vecJudge(d.integrand, s.params, { v_normal_flip: [neg(d.integrand)] }),
    menu: menu(t('Produit scalaire de F(σ) avec la normale, sans norme'), [{ label: t('Diviser par la norme de la normale'), rule: 'v_normal_unit_twice', why: t('ν ds = (σ_u ∧ σ_v) du dv : la norme se simplifie, on ne divise pas.') }]),
    lines: [{ math: `F(σ) · (${s.du}) = ${d.Fs}·${s.N} = ${d.integrand}`, subgoal: 'integrand', blank: [d.integrand] }],
  });
  parts.push({
    html: t('Flux : intégrale double sur A, puis sa valeur :'), ask: '∬_Σ F · ds =', start: d.I,
    judge: defJudge({ v_normal_unit_twice: [d.unitTwice] }),
    menu: menu(t('Intégrer sur A et calculer'), [{ label: t('Prendre l\'opposé pour avoir une normale extérieure'), rule: 'v_normal_flip', why: t('Le sens de la normale est déjà réglé par la paramétrisation.') }]),
    lines: [{ math: d.value, subgoal: 'value', blank: [d.value] }],
  });
  return parts;
}

function fluxItem(level, rng, opts) {
  if (level === 5) return fluxClosed(level, rng, opts);
  const d = fluxData(rng);
  const s = d.s;
  const parts = fluxParts(d, level, { noParam: level === 1 });
  return partsItem({
    skill: 'v-flux', level, parts, keys: KEYS,
    prompt: t('Calcule le flux ∬_Σ F · ds de F = {F} à travers {html}, {orient}.{a}', { F: d.F, html: d.html, orient: d.orient, a: level === 1 ? t(' On donne {a} et {b}.', { a: PML(s.line, s.params), b: VML(`${s.du} = ${s.N}`, s.params) }) : '' }),
    hints: H(t('∬_Σ F · ds = ∬_A F(σ) · (σ_u ∧ σ_v) du dv, sans norme. Vérifie le sens de la normale.'),
      `F(σ) = ${VML(d.Fs, s.params)}.`,
      `F(σ) · (${s.du}) = ${MT(d.integrand, { vars: s.params })}.`),
    subgoals: SUB_FLUX, key: `v-flux:${level}:${d.id}`, exam: examTag(opts),
  });
}

// Level 5: the flux through a closed surface made of a cone (or a
// paraboloid) and the disc on top, outward.
function fluxClosed(level, rng, opts) {
  const k = pick(rng, [1, 2]);
  const rho = pick(rng, [1, 2]);
  const hTop = k * rho;
  const s = revSurf({ h: [0, k, 0], rho: String(rho), rho2: rho * rho, order: 'φr' });
  // F = (0, 0, z) outward: cone N_out = (k r cos φ, k r sin φ, −r): F·N = −k r²; disc z = kρ: ν = (0, 0, 1), F·ν = kρ.
  const integrand = cm(-k, 'r^2');
  const coneVal = q(-2 * k * rho ** 3, 3);
  const discVal = q(hTop * rho * rho);
  const total = coneVal.add(discVal);
  const d = { kind: 'cone', s, F: '(0, 0, z)', Fs: `(0 ; 0 ; ${cm(k, 'r')})`, integrand, value: piT(coneVal), orient: t('normale extérieure'), I: `int(int(${integrand}, r, 0, ${rho}), φ, 0, 2π)`, unitTwice: `int(int(${integrand}/(r sqrt(${1 + k * k})), r, 0, ${rho}), φ, 0, 2π)`, hint: t('z ≤ {hTop} donne r ≤ {rho}', { hTop, rho }) };
  const parts = fluxParts(d, level);
  parts[0].html = t('Le cône, avec sa normale extérieure (vers le bas) : σ et A :');
  parts.push({
    html: t('Le disque du haut (z = {hTop}, r ≤ {rho}), ν = (0, 0, 1) : son flux', { hTop, rho }), ask: t('∬_disque F · ν ds ='), start: `int(int(${cm(hTop, 'r')}, r, 0, ${rho}), φ, 0, 2π)`,
    judge: defJudge({ v_flux_normal_outward: [piT(discVal.neg())] }),
    lines: [{ math: piT(discVal), subgoal: 'value' }],
  });
  parts.push({
    html: t('Le flux sortant total :'), ask: 'Φ =', start: `${piT(coneVal)}+${piT(discVal)}`.replace('+-', '-'),
    judge: defJudge({ v_flux_normal_outward: [piT(coneVal.sub(discVal))] }),
    lines: [{ math: piT(total), subgoal: 'value' }],
  });
  return partsItem({
    skill: 'v-flux', level, parts, keys: KEYS,
    prompt: t('Soit Ω = {{a}√(x² + y²) ≤ z ≤ {hTop}} et F = (0, 0, z). Calcule le flux de F sortant de Ω à travers son bord : le cône z = {a}√(x² + y²) puis le disque z = {hTop}.', { a: k === 1 ? '' : k, hTop }),
    hints: [], subgoals: SUB_FLUX, key: `v-flux:5:cone${k}${rho}`, exam: examTag(opts),
  });
}

function fluxMcq(level, rng, opts) {
  const d = fluxData(rng, { kind: pick(rng, ['sph', 'parab', 'cap']), up: true });
  const v = d.valQ;
  const show = (tt) => MT(tt, {});
  return choice({
    skill: 'v-flux', level, key: `v-flux:mcq:${d.id}`, exam: examTag(opts),
    prompt: t('Flux de F = {F} à travers {html}, {orient} :', { F: d.F, html: d.html, orient: d.orient }),
    right: show(d.value),
    wrongs: [opt(show(piT(v.neg())), 'v_normal_flip'), d.kind === 'sph' && d.F === '(x, y, z)' ? opt(show(piT(v.div(d.s.R))), 'v_normal_unit_twice') : null, opt(show(piT(v.div(3)))), opt(show(piT(v.mul(2)))), opt(show(piT(v.div(2))))],
    solution: [{ html: t('F(σ) · ({du}) = {a}, donc Φ = {b} = {c}.', { du: d.s.du, a: MT(d.integrand, { vars: d.s.params }), b: MT(d.I, { vars: d.s.params }), c: show(d.value) }), note: '' }],
    expectedSec: 180,
  }, rng);
}

export const GEN = {
  'v-surf-param': (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? surfParamMcq(4, rng, opts) : surfParamItem(level, rng, opts)),
  'v-surf-area': (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? surfAreaMcq(4, rng, opts) : surfAreaItem(level, rng, opts)),
  'v-flux': (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? fluxMcq(4, rng, opts) : fluxItem(level, rng, opts)),
};

export { surface, surfaceParts, fluxData, fluxParts, areaData, crossTraps, comps };
