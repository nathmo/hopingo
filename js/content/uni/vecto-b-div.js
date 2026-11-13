// v-div-thm and v-verify-div (module V, part b, step U10): the divergence
// theorem ∭_Ω div F = ∬_∂Ω F · ν ds on cylinders, cones and half-balls
// (parts `equiv` for div F, `domain` for the bounds, `definite` for the
// triple integral, after the odd terms vanish by symmetry), a surface
// closed by a disc, and the 9-point problem that checks both members face
// by face (catalogue: cone {4(x² + y²) < z², 0 < z < 2}, F = (x², y², z³)).

import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import {
  KEYS, q, qs, cm, sum, piT, pick, par, SG, H, MT, VML,
  vecJudge, defJudge, eqJudge, partsItem, examTag, choice, opt, decision, menu, problemItem,
} from './vecto-b-kit.js';
import { t } from '../../i18n.js';

const XYZ = ['x', 'y', 'z'];
const keyOf = (tt) => toText(parse(tt, {}));

// ---------- data ----------

// F = (a x², b y², k z^m) (+ d on the third component for a closed surface).
function fieldD(rng) {
  const a = pick(rng, [1, 2, -1]);
  const b = pick(rng, [1, 3, -2]);
  const k = pick(rng, [1, 2]);
  const m = pick(rng, [1, 2, 3]);
  const zm = m === 1 ? 'z' : `z^${m}`;
  const F3 = cm(k, zm);
  const odd = sum([cm(2 * a, 'x'), cm(2 * b, 'y')]);
  const even = m === 1 ? String(k) : cm(k * m, m === 2 ? 'z' : `z^${m - 1}`);
  return {
    a, b, k, m, zm, F: [cm(a, 'x^2'), cm(b, 'y^2'), F3], div: sum([odd, even]), odd, even,
    oddCyl: sum([cm(2 * a, 'r cos(φ)'), cm(2 * b, 'r sin(φ)')]), id: `${a}${b}${k}${m}`,
  };
}
const Fhtml = (F) => `F = (${F.F.map((tt) => MT(tt)).join(', ')})`;

// Ω: cylinder r ≤ R, 0 ≤ z ≤ h, or cone k²r² ≤ z², 0 ≤ z ≤ h.
function regionD(rng, kinds = ['cyl', 'cone']) {
  const kind = pick(rng, kinds);
  const h = pick(rng, [1, 2]);
  if (kind === 'cyl') {
    const R = pick(rng, [1, 2]);
    return { kind, h, R, rTop: String(R), id: `cyl${R}${h}`, html: t('le cylindre Ω = {x² + y² ≤ {a}, 0 ≤ z ≤ {h}}', { a: R * R, h }), rMax: String(R), region: [`x^2+y^2 ≤ ${R * R}`, `0 ≤ z ≤ ${h}`], box: [[-R, R], [-R, R], [0, h]], area: (z) => q(R * R) };
  }
  const c = pick(rng, [1, 2]);
  const rTop = q(h, c);
  return {
    kind, h, c, rTop: qs(rTop), id: `cone${c}${h}`, html: t('le cône Ω = {{a} ≤ z², 0 ≤ z ≤ {h}}', { a: c === 1 ? 'x² + y²' : `${c * c}(x² + y²)`, h }), rMax: c === 1 ? 'z' : `z/${c}`,
    region: [`${c * c}(x^2+y^2) ≤ z^2`, `0 ≤ z ≤ ${h}`], box: [[-Number(rTop), Number(rTop)], [-Number(rTop), Number(rTop)], [0, h]],
  };
}

// ∭ k m z^(m−1) over Ω (the odd terms vanish): value and the line in z.
function volumeD(F, O) {
  const { k, m } = F;
  const { h } = O;
  const even = F.even;
  if (O.kind === 'cyl') {
    // k π R² h^m
    const v = q(k * O.R * O.R * h ** m);
    return { zLine: `int(${O.R === 1 ? '' : O.R * O.R}π·${par(even)}, z, 0, ${h})`, value: piT(v), v };
  }
  // ∫₀ʰ k m z^(m−1) π z²/c² dz = k m π h^(m+2)/(c²(m+2))
  const v = q(k * m * h ** (m + 2), O.c * O.c * (m + 2));
  return { zLine: `int(π·${par(even)}·${O.c === 1 ? 'z^2' : `z^2/${O.c * O.c}`}, z, 0, ${h})`, value: piT(v), v };
}

const tripleOf = (F, O, body = null) => `int(int(int((${body ?? sum([F.oddCyl, F.even])}) r, r, 0, ${O.rMax}), φ, 0, 2π), z, 0, ${O.h})`;

const SUB_DIV = [
  SG('div', 'div F', 'v-ops'),
  SG('bounds', t('bornes en cylindriques'), 'a2-cyl-sph'),
  SG('symmetry', t('termes impairs nuls par symétrie'), 'v-div-thm'),
  SG('value', t('intégrale triple'), 'a2-cyl-sph'),
];

function divPart(F) {
  return {
    html: t('Ω est borné régulier et F ∈ C¹ : ∬_∂Ω F · ν ds = ∭_Ω div F. D\'abord div F :'), ask: 'div F =',
    start: `pd(${F.F[0]}, x) + pd(${F.F[1]}, y) + pd(${F.F[2]}, z)`, judge: eqJudge(XYZ),
    menu: menu('div F = ∂F₁/∂x + ∂F₂/∂y + ∂F₃/∂z', [{ label: 'rot F', rule: 'v_div_rot_confuse', why: t('Le flux sortant, c\'est la divergence.') }]),
    lines: [{ math: F.div, subgoal: 'div', blank: [F.even] }],
  };
}

function divParts(F, O, level, o = {}) {
  const V = volumeD(F, O);
  const I = tripleOf(F, O);
  const parts = [divPart(F)];
  parts[0].decisions = [decision(t('Comment calculer le flux sortant ?'), [
    { id: 'div', label: t('Théorème de la divergence : ∭_Ω div F'), valid: true, ref: true },
    { id: 'faces', label: t('Face par face ({a}), avec la normale extérieure de chacune', { a: O.kind === 'cyl' ? t('deux disques et le côté') : t('le disque et le cône') }), valid: true, quality: 'poor', why: t('Juste, mais il faut paramétrer chaque face et sa normale ; div F est simple, le volume est plus court.') },
  ], [3])];
  if (level >= 2) {
    parts.push({
      html: t('Ω en coordonnées cylindriques (z, puis φ, puis r) :'), ask: 'Ω :', start: 'Ω',
      judge: { kind: 'domain', coords: 'cyl', region: O.region, box: O.box, order: ['z', 'φ', 'r'], shape: 'cyl' },
      lines: [{ math: `0 ≤ z ≤ ${O.h} ; 0 ≤ φ ≤ 2π ; 0 ≤ r ≤ ${O.rMax}`, subgoal: 'bounds' }],
    });
  }
  const jacFree = tripleOf(F, O).replace(/\) r, r, 0/, '), r, 0');
  parts.push({
    html: t('∭_Ω div F, en cylindriques (dx dy dz = r dr dφ dz){a} :', { a: level <= 2 ? t(' ; ∭ ({odd}) = 0 par symétrie', { odd: MT(F.odd) }) : '' }), ask: '∭_Ω div F =', start: I,
    judge: defJudge({ v_jacobian_volume: [{ line: jacFree, ctx: { jac: 'r' } }] }, { [keyOf(I)]: V.value }),
    decisions: [decision(t('Que vaut ∭_Ω ({odd}) dx dy dz ?', { odd: MT(F.odd) }), [
      { id: 'zero', label: t('0 : Ω est symétrique par x ↦ −x et y ↦ −y, et x, y sont impairs'), valid: true, ref: true },
      { id: 'calc', label: t('On ne peut pas savoir sans le calculer'), valid: true, quality: 'poor', why: t('On peut le calculer, mais Ω est symétrique : ∫ cos φ dφ = ∫ sin φ dφ = 0 sur [0 ; 2π].') },
    ], [2, 3, 4])],
    menu: menu(t('Les termes en x et y s\'annulent ; intégrer le reste en r, φ, z avec le jacobien r'), [{ label: t('Intégrer sans le jacobien r'), rule: 'v_jacobian_volume', why: 'dx dy dz = r dr dφ dz.' }]),
    lines: [{ math: V.zLine, subgoal: 'symmetry' }, { math: V.value, subgoal: 'value', blank: [V.value] }],
  });
  return { parts, V };
}

function divItem(level, rng, opts) {
  if (level === 5) return divClosed(level, rng, opts);
  const F = fieldD(rng);
  const O = regionD(rng);
  const { parts, V } = divParts(F, O, level);
  return partsItem({
    skill: 'v-div-thm', level, parts, keys: KEYS,
    prompt: t('Soit {a} et {html}. Calcule le flux sortant ∬_∂Ω F · ν ds.', { a: Fhtml(F), html: O.html }),
    hints: H(t('Calcule div F, puis intègre sur le volume, en cylindriques.'), t('Les termes en x et y s\'annulent par symétrie ; {a}.', { a: MT(V.zLine, { vars: ['z'] }) }), `${MT(V.zLine, { vars: ['z'] })} = ${MT(V.value)}.`),
    subgoals: SUB_DIV, key: `v-div-thm:${level}:${F.id}:${O.id}`, exam: examTag(opts),
  });
}

// Level 5: the flux through Σ = {z = ρ² − x² − y², z ≥ 0} (upward), closed by
// the disc z = 0 (outward normal (0, 0, −1)).
function divClosed(level, rng, opts) {
  const F = fieldD(rng);
  const d = pick(rng, [1, 2, -1]);
  const rho = pick(rng, [1, 2]);
  const r2 = rho * rho;
  const F3 = sum([F.F[2], String(d)]);
  const FF = { ...F, F: [F.F[0], F.F[1], F3] };
  // ∭ k m z^(m−1) over 0 ≤ z ≤ ρ² − r²: π k ρ^(2m+2)/(m + 1).
  const vol = q(F.k * rho ** (2 * F.m + 2), F.m + 1);
  const I = `int(int(int((${sum([F.oddCyl, F.even])}) r, z, 0, ${r2}-r^2), r, 0, ${rho}), φ, 0, 2π)`;
  const disc = q(-d * r2);
  const total = vol.sub(disc);
  const parts = [divPart(FF), {
    html: t('Ω = {0 ≤ z ≤ {r2} − r²} est fermé par Σ et le disque D = {z = 0, r ≤ {rho}}. ∭_Ω div F :', { r2, rho }), ask: '∭_Ω div F =', start: I,
    judge: defJudge({ v_jacobian_volume: [I.replace(/\) r, z, 0/, '), z, 0')] }, { [keyOf(I)]: piT(vol) }),
    lines: [{ math: piT(vol), subgoal: 'value' }],
  }, {
    html: t('La normale extérieure à Ω sur le disque D (z = 0) :'), ask: 'ν =', start: 'ν',
    judge: vecJudge('(0 ; 0 ; -1)', [], { v_flux_normal_outward: [{ line: '(0 ; 0 ; 1)', ctx: { face: 'D (z = 0)', dir: t('le bas : ν = (0, 0, −1)') } }] }),
    lines: [{ math: '(0 ; 0 ; -1)', subgoal: 'symmetry' }],
  }, {
    html: t('Le flux sortant par D : F · ν = −F₃(x, y, 0) = {a}{b} :', { a: -d < 0 ? '−' : '', b: Math.abs(d) }), ask: '∬_D F · ν ds =', start: `int(int(${cm(-d, 'r')}, r, 0, ${rho}), φ, 0, 2π)`,
    judge: defJudge({ v_flux_normal_outward: [piT(disc.neg())] }),
    lines: [{ math: piT(disc), subgoal: 'value' }],
  }, {
    html: '∬_Σ F · ds = ∭_Ω div F − ∬_D F · ν ds :', ask: '∬_Σ F · ds =', start: `${piT(vol)}-(${piT(disc)})`,
    judge: defJudge({ v_flux_normal_outward: [piT(vol.add(disc))] }),
    lines: [{ math: piT(total), subgoal: 'value' }],
  }];
  return partsItem({
    skill: 'v-div-thm', level, parts, keys: KEYS,
    prompt: t('Soit {a} et Σ = {z = {r2} − x² − y², z ≥ 0}, orientée vers le haut. Σ n\'est pas fermée : ferme-la par le disque D du plan z = 0 et calcule ∬_Σ F · ds par le théorème de la divergence.', { a: Fhtml(FF), r2 }),
    hints: [], subgoals: SUB_DIV, key: `v-div-thm:5:${F.id}:${d}:${rho}`, exam: examTag(opts),
  });
}

function divMcq(level, rng, opts) {
  const al = pick(rng, [0, 1, 2]);
  const be = pick(rng, [0, 1, -1]);
  const ga = pick(rng, [0, 1, -2]);
  const R = pick(rng, [1, 2]);
  const h = pick(rng, [1, 2, 3]);
  const c = al + be + ga;
  const F = [sum([cm(al, 'x'), 'y', 'cos(z)']), sum([cm(be, 'y'), 'x e^z']), sum([cm(ga, 'z'), 'x y'])];
  const v = q(c * R * R * h);
  const show = (tt) => MT(tt, {});
  return choice({
    skill: 'v-div-thm', level, key: `v-div-thm:mcq:${al}${be}${ga}${R}${h}`, exam: examTag(opts),
    prompt: t('Soit F = ({a}) et Ω le cylindre {x² + y² ≤ {b}, 0 ≤ z ≤ {h}}, ν la normale extérieure. ∬_∂Ω F · ν ds =', { a: F.map((tt) => MT(tt)).join(', '), b: R * R, h }),
    right: show(piT(v)),
    wrongs: [opt(show(piT(q(2 * c * R * h))), 'v_jacobian_volume'), c ? opt(show(piT(v.neg())), 'v_flux_normal_outward') : null, c ? opt(show('0'), 'v_div_rot_confuse') : opt(show(piT(q(R * R * h))), 'v_div_rot_confuse'), opt(show(piT(q((c || 1) * R * R * h * 2))))],
    solution: [{ html: t('div F = {al} + {be} + {ga} = {c}, donc ∬_∂Ω F · ν ds = ∭_Ω {c} = {c} · π · {a} · {h}.', { al, be, ga, c, a: R * R, h }), note: '' }],
    expectedSec: 120,
  }, rng);
}

// ---------- v-verify-div ----------

// The cone of the catalogue: Ω = {c²(x² + y²) ≤ z², 0 ≤ z ≤ h}, F = (a x², b y², z^m).
function verifyData(rng) {
  const F0 = fieldD(rng);
  const F = { ...F0, k: 1, F: [F0.F[0], F0.F[1], F0.zm], even: F0.m === 1 ? '1' : cm(F0.m, F0.m === 2 ? 'z' : `z^${F0.m - 1}`) };
  F.div = sum([F.odd, F.even]);
  const O = regionD(rng, ['cone']);
  const { c, h } = O;
  const m = F.m;
  const rT = q(h, c);
  const vol = q(m * h ** (m + 2), c * c * (m + 2));
  const top = q(h ** m).mul(rT).mul(rT);
  const cone = q(-2 * h ** (m + 2), c * c * (m + 2));
  // σ(r, φ) = (r cos φ, r sin φ, c r); N_out = (c r cos φ, c r sin φ, −r).
  const zc = cm(c, 'r');
  const Nout = `(${cm(c, 'r cos(φ)')} ; ${cm(c, 'r sin(φ)')} ; -r)`;
  const Nin = `(${cm(-c, 'r cos(φ)')} ; ${cm(-c, 'r sin(φ)')} ; r)`;
  const integrand = sum([cm(F.a * c, 'r^3 cos(φ)^3'), cm(F.b * c, 'r^3 sin(φ)^3'), cm(-(c ** m), `r^${m + 1}`)]);
  const Fs = `(${cm(F.a, 'r^2 cos(φ)^2')} ; ${cm(F.b, 'r^2 sin(φ)^2')} ; ${m === 1 ? zc : `(${zc})^${m}`})`;
  return { F, O, vol, top, cone, rT, Nout, Nin, integrand, Fs, zc, id: `${F.id}:${O.id}` };
}

const SUB_VDIV = [
  SG('volume', '∭ div F', 'v-div-thm'),
  SG('face-top', t('flux du disque'), 'v-flux'),
  SG('face-normal', t('normale extérieure du cône'), 'v-flux'),
  SG('face-cone', t('flux du cône'), 'v-flux'),
  SG('conclude', t('les deux membres'), 'v-verify-div'),
];

function verifyParts(D, level) {
  const { F, O, rT } = D;
  const I = tripleOf(F, O);
  const V = volumeD({ ...F, k: 1 }, O);
  const volume = [divPart(F), {
    html: t('∭_Ω div F, en cylindriques (les termes en x et y s\'annulent par symétrie) :'), ask: '∭_Ω div F =', start: I,
    judge: defJudge({}, { [keyOf(I)]: piT(D.vol) }),
    lines: [{ math: V.zLine, subgoal: 'volume' }, { math: piT(D.vol), subgoal: 'volume' }],
  }];
  const topPart = {
    html: t('Le disque du haut z = {h}, r ≤ {a}, ν = (0, 0, 1) : F · ν = {b} = {c}. Son flux :', { h: O.h, a: qs(rT), b: F.m === 1 ? 'z' : `z${F.m === 2 ? '²' : '³'}`, c: O.h ** F.m }), ask: '∬ F · ν ds =', start: `int(int(${cm(O.h ** F.m, 'r')}, r, 0, ${qs(rT)}), φ, 0, 2π)`,
    judge: defJudge({ v_flux_normal_outward: [piT(D.top.neg())] }),
    lines: [{ math: piT(D.top), subgoal: 'face-top', blank: [piT(D.top)] }],
  };
  const normalPart = {
    html: t('Le cône σ(r, φ) = (r cos φ, r sin φ, {a}), r ∈ [0 ; {b}], φ ∈ [0 ; 2π]. σ_r ∧ σ_φ = {c} pointe vers l\'intérieur (vers le haut). La normale extérieure :', { a: D.zc.replace(/^1r$/, 'r'), b: qs(rT), c: VML(D.Nin) }), ask: 'N =', start: 'N',
    judge: vecJudge(D.Nout, ['r', 'φ'], { v_flux_normal_outward: [{ line: D.Nin, ctx: { face: t('du cône'), dir: t('le bas et l\'extérieur : l\'opposé de σ_r ∧ σ_φ') } }] }),
    decisions: [decision(t('Quelle normale prendre sur le cône ?'), [
      { id: 'out', label: t('L\'opposé de σ_r ∧ σ_φ : elle sort de Ω'), valid: true, ref: true },
      { id: 'in', label: t('σ_r ∧ σ_φ telle quelle'), valid: false, rule: 'v_flux_normal_outward', why: t('Sa 3e composante r > 0 : elle rentre dans Ω (le cône est sous le volume).') },
    ], [2, 3, 4])],
    lines: [{ math: D.Nout, subgoal: 'face-normal', blank: ['-r'] }],
  };
  const conePart = {
    html: t('Le flux sortant par le cône : F(σ) · N, puis l\'intégrale (∫ cos³φ dφ = ∫ sin³φ dφ = 0 sur [0 ; 2π]) :'), ask: '∬ F · ds =', start: `int(int(${D.integrand}, r, 0, ${qs(rT)}), φ, 0, 2π)`,
    judge: defJudge({ v_flux_normal_outward: [piT(D.cone.neg())] }),
    lines: [{ math: `int(int(${cm(-(O.c ** F.m), `r^${F.m + 1}`)}, r, 0, ${qs(rT)}), φ, 0, 2π)`, subgoal: 'face-cone' }, { math: piT(D.cone), subgoal: 'face-cone', blank: [piT(D.cone)] }],
  };
  const conclude = {
    html: t('La somme des flux des faces :'), ask: '∬_∂Ω F · ν ds =', start: `${piT(D.top)}+(${piT(D.cone)})`,
    judge: defJudge({ v_flux_normal_outward: [piT(D.top.sub(D.cone))] }),
    lines: [{ math: piT(D.vol), subgoal: 'conclude', note: t('= ∭_Ω div F : les deux membres sont égaux') }],
  };
  return { volume, topPart, normalPart, conePart, conclude };
}

const vdPrompt = (D) => t('Soit {a} et {html}. Vérifie le théorème de la divergence : calcule ∭_Ω div F, puis le flux sortant par chaque face du bord (le disque du haut et le cône).', { a: Fhtml(D.F), html: D.O.html });

function verifyDivItem(level, rng, opts) {
  const D = verifyData(rng);
  const P = verifyParts(D, level);
  if (level === 5 || opts.exam === 'open') return verifyDivProblem(D, P, level, rng, opts);
  let parts;
  if (level === 1) parts = [P.topPart, P.conclude];
  else if (level === 2) parts = [P.normalPart, P.conePart];
  else if (level === 3) parts = [P.topPart, P.normalPart, P.conePart, P.conclude];
  else parts = [...P.volume, P.topPart, P.normalPart, P.conePart, P.conclude];
  const given = level <= 3 ? t(' On donne ∭_Ω div F = {a}.{b}', { a: MT(piT(D.vol)), b: level === 1 ? t(' Le flux du cône vaut {a}.', { a: MT(piT(D.cone)) }) : '' }) : '';
  return partsItem({
    skill: 'v-verify-div', level, parts, keys: KEYS,
    prompt: `${vdPrompt(D)}${given}`,
    hints: H(t('Sur chaque face, prends la normale qui sort de Ω : (0, 0, 1) en haut, l\'opposé de σ_r ∧ σ_φ sur le cône.'), t('Disque : ∬ {a} ds = {b} ; cône : N = {c}.', { a: O_h(D), b: MT(piT(D.top)), c: VML(D.Nout) }), t('Flux du cône : {a}, et {b} + ({a}) = {c}.', { a: MT(piT(D.cone)), b: MT(piT(D.top)), c: MT(piT(D.vol)) })),
    subgoals: SUB_VDIV, key: `v-verify-div:${level}:${D.id}`, exam: examTag(opts, 9),
  });
}
const O_h = (D) => `${D.O.h ** D.F.m}`;

function verifyDivProblem(D, P, level, rng, opts) {
  const one = (parts, title) => partsItem({ skill: 'v-verify-div', level: 4, parts, keys: KEYS, prompt: t(title), hints: [], noHints: true, subgoals: SUB_VDIV, key: `v-verify-div:p:${D.id}:${title.length}` });
  const concl = choice({
    skill: 'v-verify-div', level: 4, key: `v-verify-div:concl:${D.id}`,
    prompt: t('∭_Ω div F = {a} et le flux sortant total vaut {b} + ({c}). Conclusion :', { a: MT(piT(D.vol)), b: MT(piT(D.top)), c: MT(piT(D.cone)) }),
    right: t('Les deux membres valent {a} : le théorème est vérifié.', { a: MT(piT(D.vol)) }),
    wrongs: [opt(t('Les deux membres diffèrent de {a} : il faut changer la normale du cône.', { a: MT(piT(D.cone.mul(-2))) }), 'v_flux_normal_outward'), opt(t('Les deux membres diffèrent : F n\'est pas C¹.')), opt(t('Le flux vaut {a}.', { a: MT(piT(D.top.sub(D.cone))) }), 'v_flux_normal_outward')],
  }, rng);
  return problemItem({
    skill: 'v-verify-div', level, key: `${D.id}`, exam: examTag(opts, 9),
    prompt: t('{a} (9 points)', { a: vdPrompt(D) }),
    parts: [
      { item: one(P.volume, '∭_Ω div F'), points: [1, 2], title: '∭_Ω div F (3 pts)' },
      { item: one([P.topPart], 'Le disque du haut'), points: 2, title: t('Le disque (2 pts)') },
      { item: one([P.normalPart], 'La normale extérieure du cône'), points: 1.5, title: t('Normale du cône (1,5 pt)') },
      { item: one([P.conePart], 'Le flux du cône'), points: 1.5, title: t('Flux du cône (1,5 pt)') },
      { item: concl, points: 1, title: t('Conclusion (1 pt)') },
    ],
  });
}

export const GEN = {
  'v-div-thm': (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? divMcq(4, rng, opts) : divItem(level, rng, opts)),
  'v-verify-div': (level, rng, profile, opts = {}) => verifyDivItem(opts.exam ? 4 : level, rng, opts),
};
