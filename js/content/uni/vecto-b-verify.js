// v-verify-stokes (module V, part b, step U10): « vérifier le théorème de
// Stokes » computes both members. Problem V1 of the catalogue (14 points):
// Σ = {z = (r + p)(q − r), y ≥ 0, z ≥ 0}, F = (0, c x, 0) or (−c y, 0, 0);
// the 2022 variant (9 points): the upper hemisphere of radius R, F =
// c(−y, x, 0). Levels 1 to 3 are parts of the problem (rot and flux,
// boundary and circulation, σ and normal); level 4 the whole problem as
// lines with hints; level 5 and `open` a `problem` with the catalogue's
// points.

import {
  KEYS, q, cm, piT, pick, SG, H, MT, PML, VML,
  revSurf, sphSurf, vecJudge, defJudge, partsItem, examTag, choice, opt, decision, menu, problemItem,
  boundaryOf, poly,
} from './vecto-b-kit.js';
import { surfaceParts } from './vecto-b-surf.js';
import { boundaryPart } from './vecto-b-bound.js';
import { t } from '../../i18n.js';

const SK = 'v-verify-stokes';
const COS2 = t('On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t.');

function data(rng, kind) {
  const c = pick(rng, [1, 1, 2, 3]);
  if (kind === 'hemi') {
    const R = pick(rng, [1, 2, 3]);
    const sgn = pick(rng, [1, 1, -1]);
    const cc = c * sgn;
    const s = sphSurf({ R, top: 'π/2' });
    const R2 = R * R;
    const val = q(2 * cc * R2);
    const Ftext = sgn > 0 ? `${c === 1 ? '' : c}(−y, x, 0)` : `${c === 1 ? '' : c}(y, −x, 0)`;
    return {
      kind, s, R, c: cc, id: `hemi${R}${cc}`, html: `Σ = {x² + y² + z² = ${R2}, z ≥ 0}`, Fhtml: `F = ${Ftext}`,
      rot: `(0 ; 0 ; ${2 * cc})`, rotLine: `rot F = (0 ; 0 ; ${2 * cc})`,
      integrand: cm(2 * cc * R2, 'sin(θ)cos(θ)'), flux: `int(int(${cm(2 * cc * R2, 'sin(θ)cos(θ)')}, θ, 0, π/2), φ, 0, 2π)`, val,
      arcs: null,
      circ: `int(${cm(cc * R2, 'sin(t)^2')}+${cm(cc * R2, 'cos(t)^2')}, t, 0, 2π)`, circWhat: t('l\'équateur ({R} cos t, {R} sin t, 0)', { R }).replace('(1 cos t, 1 sin t', '(cos t, sin t'),
      total: 9,
    };
  }
  const p = pick(rng, [0, 1]);
  const qq = pick(rng, [2, 3]);
  const which = pick(rng, ['x', 'y']);
  const s = revSurf({ h: [p * qq, qq - p, -1], rho: String(qq), rho2: qq * qq, phi: ['0', 'π'] });
  const zDesc = p ? `(√(x² + y²) + ${p})(${qq} − √(x² + y²))` : `√(x² + y²)(${qq} − √(x² + y²))`;
  const val = q(c * qq * qq, 2);
  const Fv = which === 'x' ? `(0, ${c === 1 ? '' : c}x, 0)` : `(${c === 1 ? '−' : `−${c}`}y, 0, 0)`;
  // On the arcs (y = 0): F · γ′ = 0. On the half circle (q cos t, q sin t, 0):
  // F · γ′ = c q² cos²t (F = (0, cx, 0)) or c q² sin²t (F = (−cy, 0, 0)).
  const trig = which === 'x' ? 'cos(t)^2' : 'sin(t)^2';
  const dz = poly([s.h[1], s.h[2].mul(2)], 't'); // h′(t)
  const Fg = which === 'x' ? `(0 ; ${cm(c, 't')} ; 0)` : '(0 ; 0 ; 0)';
  return {
    kind, s, R: qq, c, id: `rev${p}${qq}${which}${c}`, html: `Σ = {z = ${zDesc}, y ≥ 0, z ≥ 0}`, Fhtml: `F = ${Fv}`,
    rot: `(0 ; 0 ; ${c})`, rotLine: `rot F = (0 ; 0 ; ${c})`,
    integrand: cm(c, 'r'), flux: `int(int(${cm(c, 'r')}, r, 0, ${qq}), φ, 0, π)`, val,
    arcs: `${Fg}·(1 ; 0 ; ${dz}) = 0`,
    circ: `int(${cm(c * qq * qq, trig)}, t, 0, π)`, circWhat: t('le demi-cercle ({qq} cos t, {qq} sin t, 0)', { qq }),
    total: 14,
  };
}
const SUB = [
  SG('hyp', t('hypothèses de Stokes'), 'v-stokes'),
  SG('rot', 'rot F', 'v-ops'),
  SG('param', t('paramétrer Σ'), 'v-surf-param'),
  SG('normal', t('normale σ_u ∧ σ_v'), 'v-surf-param'),
  SG('flux', '∬ rot F · ds', 'v-flux'),
  SG('boundary', t('les morceaux du bord'), 'v-boundary'),
  SG('orient', t('sens de σ(∂A)'), 'v-boundary'),
  SG('circulation', '∮ F · dl', 'v-line-vector'),
  SG('conclude', t('les deux membres'), 'v-stokes'),
];

const hypDecision = decision(t('Les hypothèses du théorème de Stokes sont-elles vérifiées ?'), [
  { id: 'ok', label: t('Oui : Σ est orientable et régulière par morceaux, F ∈ C¹(ℝ³)'), valid: true, ref: true },
  { id: 'closed', label: t('Non : Σ devrait être fermée'), valid: false, why: t('Stokes demande une surface avec un bord ; c\'est le théorème de la divergence qui parle de surfaces fermées.') },
]);

function parts(d, level) {
  const s = d.s;
  const P = {};
  P.rot = {
    html: 'rot F :', start: 'rot F', judge: vecJudge(d.rot, ['x', 'y', 'z']),
    decisions: level >= 4 ? [hypDecision] : [],
    menu: menu('rot F = (∂F₃/∂y − ∂F₂/∂z, ∂F₁/∂z − ∂F₃/∂x, ∂F₂/∂x − ∂F₁/∂y)', [{ label: t('3e composante ∂F₁/∂y − ∂F₂/∂x'), rule: 'v_rot_sign', why: t('L\'ordre est ∂F₂/∂x − ∂F₁/∂y.') }]),
    lines: [{ math: d.rotLine, subgoal: 'rot', blank: [d.rot] }],
  };
  const sp = surfaceParts({ s, kind: d.kind === 'hemi' ? 'sph' : 'rev', orient: d.kind === 'hemi' ? t('extérieure') : t('vers le haut'), hint: d.kind === 'hemi' ? t('z ≥ 0 donne θ ∈ [0 ; π/2]') : t('z ≥ 0 pour 0 ≤ r ≤ {R}, y ≥ 0 pour φ ∈ [0 ; π]', { R: d.R }), wrongPhi: d.kind !== 'hemi' }, level, { noPartials: true, noType: true });
  sp[0].lines[0].subgoal = 'param';
  sp[1].lines[0].subgoal = 'normal';
  P.param = sp[0];
  P.normal = sp[1];
  P.integrand = {
    html: `rot F(σ) · (${s.du}) :`, ask: `rot F · (${s.du}) =`, start: `rot F · (${s.du})`,
    judge: vecJudge(d.integrand, s.params, { v_normal_flip: [`-(${d.integrand})`], v_curl_eval: d.kind === 'hemi' ? [`${cm(2 * d.c * d.R ** 3, 'sin(θ)cos(θ)^2')}`] : [] }),
    menu: menu(t('Produit scalaire de rot F (constant) avec la normale'), [{ label: t('Remplacer x, y, z par σ dans rot F'), rule: 'v_curl_eval', why: t('rot F est constant.') }]),
    lines: [{ math: `rot F · (${s.du}) = ${d.rot}·${s.N} = ${d.integrand}`, subgoal: 'flux', blank: [d.integrand] }],
  };
  P.flux = {
    html: '∬_Σ rot F · ds :', ask: '∬_Σ rot F · ds =', start: d.flux,
    judge: defJudge({ v_normal_flip: [piT(d.val.neg())] }),
    lines: [{ math: piT(d.val), subgoal: 'flux', blank: [piT(d.val)] }],
  };
  const sides = boundaryOf(s);
  P.sides = sides;
  P.boundary = boundaryPart({ s }, sides, level);
  if (level >= 4) P.boundary.decisions = [decision(t('Dans quel sens parcourir le bord ?'), [
    { id: 'sigma', label: t('Celui de σ(∂A), ∂A parcouru dans le sens positif'), valid: true, ref: true },
    { id: 'trig', label: t('Le sens trigonométrique vu d\'en haut, quel que soit σ'), valid: false, rule: 'v_boundary_orient', why: t('Le sens du bord vient de σ(∂A) : il va avec σ_u ∧ σ_v.') },
    { id: 'out', label: t('Celui qui rend la normale extérieure'), valid: false, rule: 'v_normal_flip', why: t('Le cours n\'exige pas de normale extérieure : seulement le sens de σ(∂A).') },
  ])];
  for (const l of P.boundary.lines) if (l.subgoal === 'point' || l.subgoal === 'cancel' || l.subgoal === 'piece') l.subgoal = 'boundary';
  P.arcs = d.arcs ? {
    html: t('Sur les arcs Γ1 et Γ3 (dans le plan y = 0) :'), ask: 'F · γ′ =', start: 'F(γ₁(t)) · γ₁′(t)',
    judge: vecJudge('0', ['t']),
    lines: [{ math: d.arcs, subgoal: 'circulation' }],
  } : null;
  P.circ = {
    html: t('Sur {circWhat}, ∫ F(γ(t)) · γ′(t) dt :', { circWhat: d.circWhat }), ask: '∫ F · dl =', start: d.circ,
    judge: defJudge({ v_boundary_orient: [piT(d.val.neg())] }),
    lines: [{ math: piT(d.val), subgoal: 'circulation', blank: [piT(d.val)] }],
  };
  return P;
}

const prompt = (d) => t('Soit {html} et {Fhtml}. Vérifie le théorème de Stokes sur Σ : calcule ∬_Σ rot F · ds et ∮_∂Σ F · dl. {COS2}', { html: d.html, Fhtml: d.Fhtml, COS2 });

function linesVariant(level, rng, opts) {
  const d = data(rng, pick(rng, ['rev', 'rev', 'hemi']));
  const P = parts(d, level);
  let list;
  let given = '';
  if (level === 1) { list = [P.rot, P.integrand, P.flux]; given = t(' Σ est paramétrée par {a} et {b}.', { a: PML(d.s.line, d.s.params), b: VML(`${d.s.du} = ${d.s.N}`, d.s.params) }); }
  else if (level === 2) { list = [P.boundary, ...(P.arcs ? [P.arcs] : []), P.circ]; given = t(' Σ est paramétrée par {a} ; les côtés de ∂A : {b}.', { a: PML(d.s.line, d.s.params), b: P.sides.map((x) => `${x.name} : ${x.desc}`).join(' ; ') }); }
  else if (level === 3) { list = [P.param, P.normal, P.integrand, P.flux]; }
  else {
    list = [P.rot, P.param, P.normal, P.integrand, P.flux, P.boundary, ...(P.arcs ? [P.arcs] : []), P.circ];
    given = t(' Côtés de ∂A, dans le sens positif : {a}.', { a: P.sides.map((x) => `${x.name} : ${x.desc}`).join(' ; ') });
  }
  if (level === 4) list.at(-1).lines[0].note = t('= ∬_Σ rot F · ds : les deux membres valent {a}', { a: piT(d.val).replace(/-/g, '−') });
  return partsItem({
    skill: SK, level, parts: list, keys: KEYS,
    prompt: `${prompt(d)}${given}`,
    hints: H(t('Calcule les deux membres séparément : rot F, σ et sa normale, le flux ; puis le bord σ(∂A) morceau par morceau.'), `rot F = ${VML(d.rot, ['x', 'y', 'z'])} ; ${VML(`${d.s.du} = ${d.s.N}`, d.s.params)}.`, `∬_Σ rot F · ds = ${MT(d.flux, { vars: d.s.params })} = ${MT(piT(d.val))}.`),
    subgoals: SUB, key: `${SK}:${level}:${d.id}`, exam: examTag(opts, d.total),
  });
}

function problemVariant(level, rng, opts) {
  const d = data(rng, rng.chance(0.65) ? 'rev' : 'hemi');
  const P = parts(d, 4);
  for (const k of ['rot', 'boundary']) P[k].decisions = [];
  const one = (list, title) => partsItem({ skill: SK, level: 4, parts: list, keys: KEYS, prompt: t(title), hints: [], noHints: true, subgoals: SUB, key: `${SK}:p:${d.id}:${title}` });
  const show = (tt) => MT(tt);
  const hyp = choice({
    skill: SK, level: 4, key: `${SK}:hyp:${d.id}`, prompt: t('Les hypothèses du théorème de Stokes :'),
    right: t('Σ est orientable et régulière par morceaux, et F est de classe C¹ sur ℝ³ : le théorème s\'applique.'),
    wrongs: [opt(t('Σ n\'est pas fermée : le théorème ne s\'applique pas.')), opt(t('rot F n\'est pas nul : le théorème ne s\'applique pas.')), opt(t('Il faut que la normale de Σ soit extérieure : on doit d\'abord la retourner.'), 'v_normal_flip')],
  }, rng);
  const orient = choice({
    skill: SK, level: 4, key: `${SK}:orient:${d.id}`, prompt: t('Le sens de parcours de ∂Σ :'),
    right: t('celui de σ(∂A), ∂A étant parcouru dans le sens positif : c\'est celui des morceaux ci-dessus.'),
    wrongs: [opt(t('le sens trigonométrique vu d\'en haut, quelle que soit la paramétrisation'), 'v_boundary_orient'), opt(t('celui qui rend la normale extérieure'), 'v_normal_flip'), opt(t('n\'importe lequel : la valeur ne change pas'), 'v_boundary_orient')],
  }, rng);
  const concl = choice({
    skill: SK, level: 4, key: `${SK}:concl:${d.id}`, prompt: t('Conclusion :'),
    right: t('Les deux membres valent {a} : le théorème de Stokes est vérifié.', { a: show(piT(d.val)) }),
    wrongs: [opt(t('Le flux vaut {a} et la circulation {b} : il faut changer la normale.', { a: show(piT(d.val)), b: show(piT(d.val.neg())) }), 'v_normal_flip'), opt(t('Les deux membres diffèrent : Σ n\'est pas fermée.')), opt(t('Les deux membres valent {a}.', { a: show(piT(d.val.mul(2))) }))],
  }, rng);
  const list = d.kind === 'hemi'
    ? [
      { item: one([P.rot], 'rot F'), points: 1, title: 'rot F (1 pt)' },
      { item: one([P.param], 'Paramétrisation de Σ'), points: 1, title: t('σ et A (1 pt)') },
      { item: one([P.normal], 'Normale'), points: 1.5, title: t('Normale (1,5 pt)') },
      { item: one([P.integrand, P.flux], 'Le flux de rot F'), points: [0.5, 1], title: t('Flux (1,5 pt)') },
      { item: one([P.boundary], 'Le bord orienté'), points: 2, title: t('Bord (2 pts)') },
      { item: one([P.circ], 'La circulation'), points: 1.5, title: t('Circulation (1,5 pt)') },
      { item: concl, points: 0.5, title: t('Conclusion (0,5 pt)') },
    ]
    : [
      { item: hyp, points: 1, title: t('Hypothèses (1 pt)') },
      { item: one([P.rot], 'rot F'), points: 1, title: 'rot F (1 pt)' },
      { item: one([P.param], 'Paramétrisation de Σ'), points: 2, title: t('σ et A (2 pts)') },
      { item: one([P.normal], 'Normale'), points: 2, title: t('Normale (2 pts)') },
      { item: one([P.integrand, P.flux], 'Le flux de rot F'), points: [1, 1], title: t('Flux (2 pts)') },
      { item: one([P.boundary], 'Le bord orienté'), points: 2, title: t('Bord (2 pts)') },
      { item: orient, points: 1, title: t('Sens (1 pt)') },
      { item: one([P.arcs, P.circ], 'La circulation'), points: [1, 1], title: t('Circulation (2 pts)') },
      { item: concl, points: 1, title: t('Conclusion (1 pt)') },
    ];
  return problemItem({
    skill: SK, level, key: d.id, exam: examTag(opts, d.total),
    prompt: t('{a} Côtés de ∂A, dans le sens positif : {b}. ({total} points)', { a: prompt(d), b: P.sides.map((x) => `${x.name} : ${x.desc}`).join(' ; '), total: d.total }),
    parts: list,
  });
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => (opts.exam === 'open' || level === 5 ? problemVariant(opts.exam ? 4 : level, rng, opts) : linesVariant(level, rng, opts)),
};
