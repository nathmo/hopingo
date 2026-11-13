// v-boundary and v-stokes (module V, part b, step U10): the oriented
// boundary ∂Σ = σ(∂A) of a parametrised surface, side by side (judge
// `boundary`), then Stokes' theorem ∬_Σ rot F · ds = ∮_∂Σ F · dl (parts
// `vector` for rot F, rot F(σ) and σ_u ∧ σ_v, `definite` for both members).

import {
  KEYS, q, cm, sum, piT, fr, pick, SG, H, MT, PML, VML,
  revSurf, sphSurf, paramJudge, vecJudge, defJudge, partsItem, examTag, choice, opt, decision, menu,
  boundaryOf, boundaryJudge, boundaryLines, kept, pieceLine, sidesHtml, normalBlank,
} from './vecto-b-kit.js';
import { t } from '../../i18n.js';

// ---------- surfaces with a boundary ----------

function bSurface(rng, kinds = ['hemi', 'rev', 'cap']) {
  const kind = pick(rng, kinds);
  if (kind === 'hemi') {
    const R = pick(rng, [1, 2, 3]);
    const order = pick(rng, ['θφ', 'φθ']);
    return { kind, s: sphSurf({ R, top: 'π/2', order }), R, id: `hemi${R}${order}`, html: t('l\'hémisphère Σ = {x² + y² + z² = {a}, z ≥ 0}', { a: R * R }) };
  }
  if (kind === 'cap') {
    const rho = pick(rng, [1, 2, 3]);
    const order = pick(rng, ['rφ', 'φr']);
    return { kind, s: revSurf({ h: [rho * rho, 0, -1], rho: String(rho), rho2: rho * rho, order }), R: rho, id: `cap${rho}${order}`, html: `Σ = {z = ${rho * rho} − x² − y², z ≥ 0}` };
  }
  const p = pick(rng, [0, 1]);
  const qq = pick(rng, [2, 3]);
  const order = pick(rng, ['rφ', 'φr']);
  const zDesc = p ? `(√(x² + y²) + ${p})(${qq} − √(x² + y²))` : `√(x² + y²)(${qq} − √(x² + y²))`;
  return { kind: 'rev', s: revSurf({ h: [p * qq, qq - p, -1], rho: String(qq), rho2: qq * qq, phi: ['0', 'π'], order }), R: qq, id: `rev${p}${qq}${order}`, html: `Σ = {z = ${zDesc}, y ≥ 0, z ≥ 0}` };
}

// One decision per side: what σ makes of it.
function sideDecisions(sides) {
  return sides.map((x) => {
    const isPoint = !!x.point;
    const cancels = x.cancelsWith !== null && x.cancelsWith !== undefined;
    const other = cancels ? sides[x.cancelsWith].name : null;
    const why = isPoint ? t('σ({name}) est {what} : un point, on le retire.', { name: x.name, what: x.what }) : cancels ? t('{name} et {other} ont la même image, parcourue dans les deux sens : ils s\'annulent.', { name: x.name, other }) : t('σ({name}) est {what} : il fait partie du bord.', { name: x.name, what: x.what });
    return decision(t('{name} ({desc}) : son image σ({name}) est', { name: x.name, desc: x.desc }), [
      { id: 'point', label: t('un point : on le retire'), valid: isPoint, ref: isPoint, why, ...(isPoint ? {} : { rule: 'v_boundary_pieces' }) },
      { id: 'cancel', label: t('un côté qui s\'annule avec un autre'), valid: cancels, ref: cancels, why, ...(cancels ? {} : { rule: 'v_boundary_pieces' }) },
      { id: 'keep', label: t('un morceau du bord ∂Σ'), valid: !isPoint && !cancels, ref: !isPoint && !cancels, why, ...(!isPoint && !cancels ? {} : { rule: 'v_boundary_pieces' }) },
    ], [1, 2, 3]);
  });
}

const SUB_BOUND = [
  SG('point', t('côtés réduits à un point'), 'v-boundary'),
  SG('cancel', t('côtés qui s\'annulent'), 'v-boundary'),
  SG('piece', t('paramétrer un morceau du bord'), 'v-curve-param'),
  SG('orient', t('sens de σ(∂A)'), 'v-boundary'),
  SG('circulation', t('travail le long du bord'), 'v-line-vector'),
];

const boundaryPrompt = (b, sides) => t('Soit {html}, paramétrée par {a}. Les côtés de ∂A, parcourus dans le sens positif (A à gauche, {params0} en abscisse) : {b}.', { html: b.html, a: PML(b.s.line, b.s.params), params0: b.s.params[0], b: sidesHtml(sides) });

function boundaryPart(b, sides, level) {
  const judge = boundaryJudge(sides);
  const lines = boundaryLines(sides).map((l) => {
    if (l.kind === 'piece') {
      const comps = l.side.ref.slice(1, -1).split(' ; ');
      return { math: level <= 2 ? pieceLine(l.side, false) : l.math, subgoal: l.side.closed || /sin/.test(l.side.ref) ? 'orient' : 'piece', blank: [comps[0], l.side.t[1]], blank2: [comps[0], comps[1]] };
    }
    return { math: l.math, subgoal: l.kind === 'point' ? 'point' : 'cancel' };
  });
  return {
    html: t('Le bord, un morceau par ligne (les côtés retirés d\'abord) :'), start: '∂Σ', judge,
    decisions: sideDecisions(sides),
    menu: menu(t('Appliquer σ à chaque côté, dans le sens de ∂A'), [
      { label: t('Garder tous les côtés'), rule: 'v_boundary_pieces', why: t('Un côté réduit à un point, ou deux côtés qui s\'annulent, ne font pas partie du bord.') },
      { label: t('Parcourir le cercle dans le sens trigonométrique, quoi qu\'il arrive'), rule: 'v_boundary_orient', why: t('Le sens vient de σ(∂A) : il dépend de l\'ordre des paramètres.') },
    ]),
    lines,
  };
}

function boundaryItem(level, rng, opts) {
  if (level === 5) return boundaryCirculation(level, rng, opts);
  const b = bSurface(rng, level === 4 ? ['rev', 'hemi', 'rev', 'cap'] : ['hemi', 'rev', 'cap']);
  const sides = boundaryOf(b.s);
  return partsItem({
    skill: 'v-boundary', level, parts: [boundaryPart(b, sides, level)], keys: KEYS,
    prompt: t('{a} Donne le bord orienté ∂Σ = σ(∂A) : « Γ1 : point », « Γ2 et Γ4 : s\'annulent », « Γ3 : (… ; … ; …), t ∈ [a ; b] ».', { a: boundaryPrompt(b, sides) }),
    hints: H(t('Fais le tour de A dans le sens positif ; regarde l\'image de chaque côté.'), `${sides.map((x) => `σ(${x.name}) : ${x.what}`).join(' ; ')}.`, `${kept(sides).map((x) => PML(pieceLine(x, false), ['t'])).join(' ; ')}.`),
    subgoals: SUB_BOUND, key: `v-boundary:${level}:${b.id}`, exam: examTag(opts, 4),
  });
}

// Level 5 (and open): the boundary, then the work of F = c(−y, x, 0) along it.
function boundaryCirculation(level, rng, opts) {
  const b = bSurface(rng, ['hemi', 'cap']);
  const sides = boundaryOf(b.s);
  const c = pick(rng, [1, 2, 3]);
  const R = b.R;
  const pc = kept(sides)[0];
  const ccw = !/-\d*sin/.test(pc.ref);
  const val = q(2 * c * R * R).mul(ccw ? 1 : -1);
  const comps = pc.ref.slice(1, -1).split(' ; ');
  const x = comps[0];
  const y = comps[1];
  const dx = cm(-R, 'sin(t)');
  const dy = ccw ? cm(R, 'cos(t)') : cm(-R, 'cos(t)');
  // F(γ) · γ′ = c(−y·x′ + x·y′)
  const integrand = `${c === 1 ? '' : `${c}`}(-(${y})·(${dx}) + (${x})·(${dy}))`;
  const parts = [boundaryPart(b, sides, level), {
    html: t('Le travail de F = {a}(−y, x, 0) le long de ∂Σ : ∮ F · dl = ∫ F(γ(t)) · γ′(t) dt =', { a: c === 1 ? '' : c }), ask: '∮ F · dl =', start: `int(${integrand}, t, 0, 2π)`,
    judge: defJudge({ v_boundary_orient: [piT(val.neg())] }),
    lines: [{ math: piT(val), subgoal: 'circulation' }],
  }];
  return partsItem({
    skill: 'v-boundary', level, parts, keys: KEYS,
    prompt: t('{a} Donne le bord orienté ∂Σ = σ(∂A), puis calcule ∮_∂Σ F · dl pour F = {b}(−y, x, 0).', { a: boundaryPrompt(b, sides), b: c === 1 ? '' : c }),
    hints: [], subgoals: SUB_BOUND, key: `v-boundary:${level}:circ${b.id}${c}`, exam: examTag(opts, 4),
  });
}

function boundaryMcq(level, rng, opts) {
  const b = bSurface(rng, ['hemi', 'cap']);
  const sides = boundaryOf(b.s);
  const pc = kept(sides)[0];
  const rev = { ...pc, ref: pc.ref.replace(/ ; (-?)(\d*)sin\(t\)/, (m, s, k) => ` ; ${s ? '' : '-'}${k}sin(t)`) };
  const merid = sides.find((x) => x.cancelsWith !== null && x.cancelsWith !== undefined);
  const ln = (x) => PML(pieceLine(x, false), ['t']);
  return choice({
    skill: 'v-boundary', level, key: `v-boundary:mcq:${b.id}`, exam: examTag(opts),
    prompt: t('{a} Le bord orienté ∂Σ = σ(∂A) est :', { a: boundaryPrompt(b, sides) }),
    right: t('le cercle {a}', { a: ln(pc) }),
    wrongs: [opt(t('le cercle {a}', { a: ln(rev) }), 'v_boundary_orient'), opt(t('le cercle {a} et la courbe {b}', { a: ln(pc), b: ln(merid) }), 'v_boundary_pieces'), opt(t('le cercle {a} et la courbe {b}', { a: ln(rev), b: ln(merid) }), 'v_boundary_pieces')],
    solution: [{ html: t('{a}. Il reste {b}.', { a: sides.map((x) => `σ(${x.name}) : ${x.what}`).join(' ; '), b: ln(pc) }), note: '' }],
    expectedSec: 150,
  }, rng);
}

// ---------- v-stokes ----------

function stokesData(rng, kinds = ['hemi', 'cap']) {
  const kind = pick(rng, kinds);
  const a = pick(rng, [1, 2, 3]);
  const bb = pick(rng, [1, 2]);
  const g = pick(rng, ['0', 'z', 'z^2']);
  const c = a + bb;
  const F = `(${cm(-a, 'y')} ; ${cm(bb, 'x')} ; ${g})`;
  const R = pick(rng, [1, 2, 3]);
  const s = kind === 'hemi' ? sphSurf({ R, top: 'π/2' }) : revSurf({ h: [R * R, 0, -1], rho: String(R), rho2: R * R });
  const html = kind === 'hemi' ? t('l\'hémisphère Σ = {x² + y² + z² = {a}, z ≥ 0}, normale extérieure', { a: R * R }) : t('Σ = {z = {a} − x² − y², z ≥ 0}, normale vers le haut', { a: R * R });
  // rot F · N: hemisphere c R² sin θ cos θ ; cap c r.
  const flux = kind === 'hemi' ? `int(int(${cm(c * R * R, 'sin(θ)cos(θ)')}, θ, 0, π/2), φ, 0, 2π)` : `int(int(${cm(c, 'r')}, r, 0, ${R}), φ, 0, 2π)`;
  const integrand = kind === 'hemi' ? cm(c * R * R, 'sin(θ)cos(θ)') : cm(c, 'r');
  const val = q(c * R * R);
  const circ = `int(${cm(a * R * R, 'sin(t)^2')}+${cm(bb * R * R, 'cos(t)^2')}, t, 0, 2π)`;
  const sigma3 = kind === 'hemi' ? cm(R, 'cos(θ)') : `${R * R}-r^2`;
  return {
    kind, a, b: bb, g, c, F, R, s, html, flux, integrand, val, circ, sigma3, id: `${kind}${a}${bb}${g}${R}`,
    Fhtml: `F = (${MT(cm(-a, 'y'))}, ${MT(cm(bb, 'x'))}, ${MT(g)})`,
    rotLine: `rot F = (0-0 ; 0-0 ; ${bb}-(${-a})) = (0 ; 0 ; ${c})`,
    curl: [`(0 ; 0 ; ${c}·(${sigma3}))`, ...(kind === 'hemi' ? [`(0 ; 0 ; ${c}·${cm(R, 'sin(θ)cos(φ)')})`] : [`(0 ; 0 ; ${cm(c, 'r cos(φ)')})`])],
  };
}

const SUB_STOKES = [
  SG('rot', 'rot F', 'v-ops'),
  SG('normal', t('normale σ_u ∧ σ_v'), 'v-surf-param'),
  SG('flux', '∬ rot F · ds', 'v-flux'),
  SG('circulation', t('∮ F · dl sur le bord'), 'v-line-vector'),
  SG('theorem', t('choisir le membre de Stokes'), 'v-stokes'),
];

function stokesParts(d, level, o = {}) {
  const s = d.s;
  const params = s.params;
  const parts = [];
  if (!o.noRot) {
    parts.push({
      html: 'rot F :', start: 'rot F', judge: vecJudge(`(0 ; 0 ; ${d.c})`, ['x', 'y', 'z']),
      menu: menu('rot F = (∂F₃/∂y − ∂F₂/∂z, ∂F₁/∂z − ∂F₃/∂x, ∂F₂/∂x − ∂F₁/∂y)', [{ label: t('3e composante ∂F₁/∂y − ∂F₂/∂x'), rule: 'v_rot_sign', why: t('L\'ordre est ∂F₂/∂x − ∂F₁/∂y.') }]),
      lines: [{ math: d.rotLine, subgoal: 'rot', blank: [`(0 ; 0 ; ${d.c})`] }],
    });
  }
  parts.push({
    html: t('rot F au point σ({a}) :', { a: params.join(', ') }), ask: `rot F(σ(${params.join(', ')})) =`, start: `rot F(σ(${params.join(', ')}))`,
    judge: vecJudge(`(0 ; 0 ; ${d.c})`, params, { v_curl_eval: d.curl.map((tt) => ({ line: tt, ctx: { c: `(0, 0, ${d.c})` } })) }),
    menu: menu(t('rot F est constant : il ne change pas'), [{ label: t('Remplacer x, y, z par σ dans rot F'), rule: 'v_curl_eval', why: t('rot F = (0, 0, {c}) ne dépend pas du point.', { c: d.c }) }]),
    lines: [{ math: `(0 ; 0 ; ${d.c})`, subgoal: 'rot', blank: [String(d.c)] }],
  }, {
    html: t('Normale {du} :', { du: s.du }), ask: `${s.du} =`, start: s.du, judge: vecJudge(s.N, params),
    lines: [{ math: `${s.du} = ${s.N}`, subgoal: 'normal', blank: [normalBlank(s)] }],
  });
  if (!o.noFlux) {
    parts.push({
      html: `∬_Σ rot F · ds = ∬_A rot F(σ) · (${s.du}) :`, ask: '∬_Σ rot F · ds =', start: d.flux,
      judge: defJudge({ v_normal_flip: [piT(d.val.neg())] }),
      decisions: level === 3 ? [decision(t('Quel membre de Stokes calcules-tu ?'), [
        { id: 'disk', label: t('Une autre surface de même bord : le disque z = 0, normale (0, 0, 1)'), valid: true, ref: true },
        { id: 'flux', label: t('∬_Σ rot F · ds sur Σ'), valid: true },
        { id: 'circ', label: t('∮_∂Σ F · dl sur le cercle du bord'), valid: true },
        { id: 'flip', label: t('∬_Σ rot F · ds avec la normale intérieure'), valid: false, rule: 'v_normal_flip', why: t('La normale doit aller avec le sens du bord σ(∂A).') },
      ])] : [],
      menu: menu(t('Intégrer rot F(σ) · (σ_u ∧ σ_v) sur A'), [{ label: t('Multiplier rot F par σ'), rule: 'v_curl_eval', why: t('rot F est constant.') }]),
      lines: [{ math: piT(d.val), subgoal: 'flux', blank: [piT(d.val)] }],
    });
  }
  if (o.circ) {
    // The boundary σ(∂A) first (judge `boundary`), then the work along it.
    const sides = boundaryOf(s);
    const bp = boundaryPart({ s }, sides, level);
    bp.html = t('Le bord ∂Σ = σ(∂A) (côtés de ∂A : {a}) :', { a: sidesHtml(sides) });
    bp.ask = '∂Σ :';
    parts.push(bp, {
      html: t('∮_∂Σ F · dl sur le cercle ({R} cos t, {R} sin t, 0), t ∈ [0 ; 2π] :', { R: d.R }), ask: '∮ F · dl =', start: d.circ,
      judge: defJudge({ v_boundary_orient: [piT(d.val.neg())] }),
      lines: [{ math: piT(d.val), subgoal: 'circulation' }],
    });
  }
  return parts;
}

function stokesItem(level, rng, opts) {
  if (level === 5) return stokesCurve(level, rng, opts);
  const d = stokesData(rng);
  const parts = stokesParts(d, level, { noRot: level === 1, circ: level === 4 });
  return partsItem({
    skill: 'v-stokes', level, parts, keys: KEYS,
    prompt: t('Soit {Fhtml} et {html}, paramétrée par {a}. Calcule ∬_Σ rot F · ds{b}.{c}{d}', { Fhtml: d.Fhtml, html: d.html, a: PML(d.s.line, d.s.params), b: level === 4 ? t(', puis vérifie avec ∮_∂Σ F · dl') : '', c: level === 1 ? t(' On donne rot F = (0, 0, {c}).', { c: d.c }) : '', d: level === 4 ? t(' On donne cos²t = ½ + ½ cos 2t et sin²t = ½ − ½ cos 2t.') : '' }),
    hints: H(t('Calcule rot F, puis choisis le membre le plus simple.'), `∬ (0, 0, ${d.c}) · (${d.s.du}) d${d.s.params[0]} d${d.s.params[1]}.`, `${MT(d.flux, { vars: d.s.params })}.`),
    subgoals: SUB_STOKES, key: `v-stokes:${level}:${d.id}`, exam: examTag(opts),
  });
}

// Level 5: the work along the curve where the cylinder x² + y² = R² cuts the
// plane z = m x + k, by Stokes on the piece of plane inside the cylinder.
function stokesCurve(level, rng, opts) {
  const a = pick(rng, [1, 2, 3]);
  const bb = pick(rng, [1, 2]);
  const c = a + bb;
  const R = pick(rng, [1, 2, 3]);
  const m = pick(rng, [1, 2, -1]);
  const k = pick(rng, [0, 1, 2]);
  const plane = sum([cm(m, 'x'), k ? String(k) : '']);
  const s = { ref: `(r cos(φ) ; r sin(φ) ; ${sum([cm(m, 'r cos(φ)'), k ? String(k) : ''])})`, u: [0, R], v: [0, 2 * Math.PI], params: ['r', 'φ'] };
  const N = `(${cm(-m, 'r')} ; 0 ; r)`;
  const val = q(c * R * R);
  const parts = [{
    html: 'rot F :', start: 'rot F', judge: vecJudge(`(0 ; 0 ; ${c})`, ['x', 'y', 'z']),
    lines: [{ math: `rot F = (0 ; 0 ; ${c})`, subgoal: 'rot' }],
  }, {
    html: t('Une surface de bord Γ : le morceau du plan à l\'intérieur du cylindre, σ(r, φ) et A :'), ask: 'σ(r, φ) =', start: 'σ(r, φ)',
    judge: { kind: 'param', surface: s },
    lines: [{ math: `${s.ref}, (r ; φ) ∈ [0 ; ${R}] × [0 ; 2π]`, subgoal: 'normal' }],
  }, {
    html: t('Normale σ_r ∧ σ_φ (vers le haut, comme le sens de Γ) :'), ask: 'σ_r ∧ σ_φ =', start: 'σ_r ∧ σ_φ', judge: vecJudge(N, ['r', 'φ'], { v_cross_order: [`(${cm(m, 'r')} ; 0 ; -r)`] }),
    lines: [{ math: `σ_r ∧ σ_φ = ${N}`, subgoal: 'normal' }],
  }, {
    html: '∮_Γ F · dl = ∬_Σ rot F · ds :', ask: '∮_Γ F · dl =', start: `int(int(${cm(c, 'r')}, r, 0, ${R}), φ, 0, 2π)`,
    judge: defJudge({ v_normal_flip: [piT(val.neg())] }),
    lines: [{ math: piT(val), subgoal: 'flux' }],
  }];
  return partsItem({
    skill: 'v-stokes', level, parts, keys: KEYS,
    prompt: t('Soit F = ({a}, {b}, {c}) et Γ la courbe où le cylindre x² + y² = {d} coupe le plan z = {plane}, parcourue dans le sens trigonométrique vue d\'en haut. Calcule ∮_Γ F · dl par le théorème de Stokes.', { a: MT(cm(-a, 'y')), b: MT(cm(bb, 'x')), c: MT('z^2'), d: R * R, plane: MT(plane) }),
    hints: [], subgoals: SUB_STOKES, key: `v-stokes:5:${a}${bb}${R}${m}${k}`, exam: examTag(opts),
  });
}

function stokesMcq(level, rng, opts) {
  const d = stokesData(rng, ['hemi']);
  const show = (tt) => MT(tt, {});
  const R3 = d.R ** 3;
  return choice({
    skill: 'v-stokes', level, key: `v-stokes:mcq:${d.id}`, exam: examTag(opts),
    prompt: t('Soit {Fhtml} et {html}. Γ = ∂Σ est orienté comme σ(∂A). ∮_Γ F · dl =', { Fhtml: d.Fhtml, html: d.html }),
    right: show(piT(d.val)),
    wrongs: [opt(show(piT(q(2 * d.c * R3, 3))), 'v_curl_eval'), opt(show(piT(d.val.neg())), 'v_boundary_orient'), opt(show(piT(d.val.mul(2)))), opt(show(piT(q(d.c * d.R))))],
    solution: [{ html: `rot F = (0, 0, ${d.c}) ; ∬_Σ rot F · ds = ${MT(d.flux, { vars: ['θ', 'φ'] })} = ${show(piT(d.val))}.`, note: '' }],
    expectedSec: 180,
  }, rng);
}

export const GEN = {
  'v-boundary': (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return boundaryMcq(4, rng, opts);
    if (opts.exam === 'open') return boundaryCirculation(4, rng, opts);
    return boundaryItem(level, rng, opts);
  },
  'v-stokes': (level, rng, profile, opts = {}) => (opts.exam === 'mcq' ? stokesMcq(4, rng, opts) : stokesItem(level, rng, opts)),
};

export { bSurface, boundaryPart, stokesData, stokesParts };
