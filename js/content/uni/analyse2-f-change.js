// a2-change-var (module A2, part f, step U6): a change of variables in a
// double integral, u and v given as functions of (x, y). The new domain D̃
// (judge `domain` with coords 'map': the line is in u, v, the region D in
// x, y), the jacobian det ∂(u, v)/∂(x, y) (`equiv`, u and v standing for
// their expressions), its inverse J = |det J_G| (`equiv`, J standing for
// its value in x, y), then the integral in (u, v) (`definite`, the start
// I_D being the value of the integral over D).

import { MT, linesItem, tfItem, examTag, H, E, SEG, modeOf, blanked, stepMenus, A2_KEYS } from './a2-kit.js';
import { q, val, vRat, vAdd, vScale, vText, vFloat, linT, mcqV, R, pickW } from './analyse2-f-kit.js';
import { blankLine } from '../../judges/lines.js';
import { parse } from '../../cas/parse.js';
import { stripParen } from '../../cas/ast.js';
import { compileFloat } from '../../cas/numeric.js';
import { makeRng } from '../random.js';

const SK = 'a2-change-var';
const UV = { vars: ['u', 'v'] };
const KEYS = [...A2_KEYS, 'pts'];
const nm = (x) => String(x).replace('-', '−');

// ∫ from a to b of t^p (p = −1: a logarithm), as an exact value.
function intPow(p, a, b) {
  if (p === -1) {
    const r = q(b).div(q(a));
    if (r.eq(1)) return vRat(0);
    if (r.d !== 1 || ![2, 3, 5].includes(r.n)) throw new Error(`ln(${r})`);
    return val([1, `ln(${r.n})`]);
  }
  return vRat(q(b).pow(p + 1).sub(q(a).pow(p + 1)).div(p + 1));
}
// ∬ over [u1 ; u2] × [v1 ; v2] of Σ c·u^p·v^s.
function intRect(terms, [u1, u2], [v1, v2]) {
  let out = vRat(0);
  for (const [c, p, s] of terms) {
    const U = intPow(p, u1, u2);
    const Vv = intPow(s, v1, v2);
    const ru = U.length === 1 && U[0][1] === '' ? U[0][0] : U.length === 0 ? q(0) : null;
    out = vAdd(out, ru ? vScale(Vv, ru.mul(q(c))) : vScale(U, q(c).mul(Vv[0]?.[0] ?? q(0))));
  }
  return out;
}
// c·u^p as text.
const powT = (v, p) => (p === 0 ? '' : p === 1 ? v : `${v}^${p}`);

// ---------- the changes ----------
// {kind, map: {u, v}, region, box, U: [u1, u2], V: [v1, v2], jacStart,
//  jacLines, jacUV (text in u, v, or x, y), Jxy, Juv, f (in x, y),
//  F: [[c, p, s]] (f·J in u, v), Fu, Fv (the two factors), label}
function hypData(rng) {
  const u1 = rng.int(1, 2);
  const u2 = u1 + rng.int(1, 3);
  const [v1, v2] = rng.pick([[1, 2], [1, 3]]);
  const fs = [
    { f: 'x y', F: [[q(1, 2), 1, -1]], Fu: 'u', Fv: '1/(2v)', Fuv: 'u/(2v)' },
    { f: '1', F: [[q(1, 2), 0, -1]], Fu: '1', Fv: '1/(2v)', Fuv: '1/(2v)' },
    { f: 'y/x', F: [[q(1, 2), 0, 0]], Fu: '1/2', Fv: '1', Fuv: '1/2' },
    { f: 'y^2', F: [[q(1, 2), 1, 0]], Fu: 'u/2', Fv: '1', Fuv: 'u/2' },
    { f: 'x^2 y^2', F: [[q(1, 2), 2, -1]], Fu: 'u^2', Fv: '1/(2v)', Fuv: 'u^2/(2v)' },
  ];
  const c = rng.pick(fs);
  const xr = [Math.sqrt(u1 / v2), Math.sqrt(u2 / v1)];
  const yr = [Math.sqrt(u1 * v1), Math.sqrt(u2 * v2)];
  // f·|jac| (the trap): f in u, v times 2v.
  const fUV = { 'x y': 'u', 1: '1', 'y/x': 'v', 'y^2': 'u v', 'x^2 y^2': 'u^2' }[c.f];
  return {
    kind: 'hyp', map: { u: 'x y', v: 'y/x' }, label: 'u = xy, v = y/x',
    region: [`${u1} ≤ x y ≤ ${u2}`, `${v1 === 1 ? 'x' : `${v1}x`} ≤ y ≤ ${v2}x`, 'x > 0'], xr, yr, U: [u1, u2], V: [v1, v2],
    jacStart: 'pd(x y,x)×pd(y/x,y)-pd(x y,y)×pd(y/x,x)', jacLines: ['y×1/x-x×(-y/x^2)', '2y/x', '2v'], jacUV: '2v', finalVars: ['u', 'v'],
    Jxy: 'x/(2y)', Juv: '1/(2v)', f: c.f, F: c.F, Fu: c.Fu, Fv: c.Fv, Fuv: c.Fuv,
    wrongF: [[2, ...{ 'x y': [1, 1], 1: [0, 1], 'y/x': [0, 2], 'y^2': [1, 2], 'x^2 y^2': [2, 1] }[c.f]]], wrongText: `${fUV === '1' ? '' : `${fUV}×`}2v`,
    why: `les inégalités de D parlent de xy et de y/x`,
  };
}

const MATS = [[1, 1, 1, -1], [1, -1, 1, 1], [1, 2, 1, -1], [2, 1, 1, -1], [1, 1, 1, 2], [2, 1, 1, 1], [1, -1, 1, 2], [1, 2, 2, 1], [3, 1, 1, 1], [1, 1, -1, 2], [2, -1, 1, 1], [1, 3, 1, 1]];
function linData(rng) {
  const [a, b, c, d] = rng.pick(MATS);
  const det = a * d - b * c;
  const k = Math.abs(det);
  const u1 = rng.int(-1, 1);
  const u2 = u1 + rng.int(1, 2);
  const v1 = rng.int(-1, 1);
  const v2 = v1 + rng.int(1, 2);
  const Ut = linT([[a, 'x'], [b, 'y']]);
  const Vt = linT([[c, 'x'], [d, 'y']]);
  const wrap = (t) => (/[+-]/.test(t.slice(1)) ? `(${t})` : t);
  const fs = [
    { f: `${wrap(Ut)}${wrap(Vt)}`, G: [1, 1], Fu: 'u', Fv: 'v' },
    { f: `${wrap(Ut)}^2`, G: [2, 0], Fu: 'u^2', Fv: '1' },
    { f: Vt, G: [0, 1], Fu: '1', Fv: 'v' },
    { f: '1', G: [0, 0], Fu: '1', Fv: '1' },
    { f: `${wrap(Vt)}^2`, G: [0, 2], Fu: '1', Fv: 'v^2' },
  ];
  const g = rng.pick(fs);
  const [p, s] = g.G;
  const mono = [powT('u', p), powT('v', s)].filter(Boolean).join(' ') || '1';
  // The inverse map, for the box: (x, y) = M⁻¹(u, v).
  const inv = (u, v) => [(d * u - b * v) / det, (-c * u + a * v) / det];
  const corners = [[u1, v1], [u1, v2], [u2, v1], [u2, v2]].map(([u, v]) => inv(u, v));
  return {
    kind: 'lin', map: { u: Ut, v: Vt }, label: `u = ${R(Ut)}, v = ${R(Vt)}`,
    region: [`${u1} ≤ ${Ut} ≤ ${u2}`, `${v1} ≤ ${Vt} ≤ ${v2}`],
    xr: [Math.min(...corners.map((P) => P[0])), Math.max(...corners.map((P) => P[0]))],
    yr: [Math.min(...corners.map((P) => P[1])), Math.max(...corners.map((P) => P[1]))], U: [u1, u2], V: [v1, v2],
    jacStart: `pd(${Ut},x)×pd(${Vt},y)-pd(${Ut},y)×pd(${Vt},x)`, jacLines: [String(det)], jacUV: String(det), finalVars: ['u', 'v'],
    Jxy: k === 1 ? '1' : `1/${k}`, Juv: k === 1 ? '1' : `1/${k}`, f: g.f, F: [[q(1, k), p, s]],
    Fu: k === 1 ? g.Fu : g.Fu === '1' ? `1/${k}` : `${g.Fu}/${k}`, Fv: g.Fv, Fuv: k === 1 ? mono : mono === '1' ? `1/${k}` : `${mono}/${k}`,
    wrongF: [[k, p, s]], wrongText: `${mono === '1' ? '' : `${mono}×`}${k}`, det, mat: [a, b, c, d],
    why: `les inégalités de D parlent de ${R(Ut)} et de ${R(Vt)}`,
  };
}

function hyp2Data(rng) {
  const u1 = rng.int(0, 1);
  const u2 = u1 + rng.int(1, 3);
  const v1 = 1;
  const v2 = rng.int(2, 3);
  const g = rng.pick([
    { f: 'x^2+y^2', G: [0, 0], Fuv: '1/2', Fu: '1/2', Fv: '1' },
    { f: '(x^2+y^2)x y', G: [0, 1], Fuv: 'v/2', Fu: '1/2', Fv: 'v' },
    { f: 'x^4-y^4', G: [1, 0], Fuv: 'u/2', Fu: 'u/2', Fv: '1' },
  ]);
  const X2 = (u, v) => (u + Math.hypot(u, 2 * v)) / 2;
  const Y2 = (u, v) => (-u + Math.hypot(u, 2 * v)) / 2;
  const [p, s] = g.G;
  const mono = [powT('u', p), powT('v', s)].filter(Boolean).join(' ');
  return {
    kind: 'hyp2', map: { u: 'x^2-y^2', v: 'x y' }, label: 'u = x² − y², v = xy',
    region: [`${u1} ≤ x^2-y^2 ≤ ${u2}`, `${v1} ≤ x y ≤ ${v2}`, 'x > 0', 'y > 0'],
    xr: [Math.sqrt(X2(u1, v1)), Math.sqrt(X2(u2, v2))], yr: [Math.sqrt(Y2(u2, v1)), Math.sqrt(Y2(u1, v2))], U: [u1, u2], V: [v1, v2],
    jacStart: 'pd(x^2-y^2,x)×pd(x y,y)-pd(x^2-y^2,y)×pd(x y,x)', jacLines: ['2x^2+2y^2'], jacUV: '2x^2+2y^2', finalVars: ['u', 'v', 'x', 'y'],
    Jxy: '1/(2x^2+2y^2)', Juv: '1/(2x^2+2y^2)', f: g.f, F: [[q(1, 2), p, s]], Fu: g.Fu, Fv: g.Fv, Fuv: g.Fuv,
    // f·|jac| = 2G·(x² + y²)² = 2G·(u² + 4v²).
    wrongF: [[2, p + 2, s], [8, p, s + 2]], wrongText: `2${mono ? `${mono}×` : ''}(u^2+4v^2)`,
    why: 'les inégalités de D parlent de x² − y² et de xy',
  };
}

function cvData(rng, kind) {
  const k = kind ?? pickW(rng, [[4, 'hyp'], [4, 'lin'], [2, 'hyp2']]);
  const d = k === 'hyp' ? hypData(rng) : k === 'lin' ? linData(rng) : hyp2Data(rng);
  d.box = [d.xr, d.yr].map(([lo, hi]) => { const m = 0.1 * (hi - lo) + 0.1; return [lo - m, hi + m]; });
  d.value = intRect(d.F, d.U, d.V);
  d.newLine = `${d.U[0]} ≤ u ≤ ${d.U[1]} ; ${d.V[0]} ≤ v ≤ ${d.V[1]}`;
  d.uvInt = `int(int(${d.Fuv},v,${d.V[0]},${d.V[1]}),u,${d.U[0]},${d.U[1]})`;
  d.sep = `int(${d.Fu},u,${d.U[0]},${d.U[1]})×int(${d.Fv},v,${d.V[0]},${d.V[1]})`;
  d.wrongInt = `int(int(${d.wrongText},v,${d.V[0]},${d.V[1]}),u,${d.U[0]},${d.U[1]})`;
  return d;
}

const SUB = [
  { id: 'new-domain', label: 'le nouveau domaine D̃', skill: SK },
  { id: 'jacobian', label: 'le jacobien ∂(u, v)/∂(x, y)', skill: 'a2-partials' },
  { id: 'invert', label: '|det J_G| = 1/|det ∂(u, v)/∂(x, y)|', skill: SK },
  { id: 'rewrite', label: 'l\'intégrale en (u, v)', skill: SK },
  { id: 'compute', label: 'le calcul', skill: 'a2-fubini-rect' },
];
const CHOICES = [
  { id: 'dom', label: 'Écrire les inégalités de D avec u et v' },
  { id: 'jac', label: 'Calculer det ∂(u, v)/∂(x, y)' },
  { id: 'inv', label: 'Inverser : |det J_G| = 1/|det ∂(u, v)/∂(x, y)|' },
  { id: 'noinv', label: 'Prendre |det ∂(u, v)/∂(x, y)| comme facteur', rule: 'a2_jacobian_inverse', why: '∂(u, v)/∂(x, y) est le jacobien de G⁻¹ : la formule demande celui de G, son inverse.' },
  { id: 'rewrite', label: 'Écrire l\'intégrale sur D̃, facteur J compris' },
  { id: 'sep', label: 'Séparer en produit de deux intégrales' },
  { id: 'calc', label: 'Calculer' },
];

function blankUV(line, holes) {
  const node = parse(line.math, UV);
  const items = stripParen(node).items;
  return { ...line, ...blankLine(node, holes.map(([i, side]) => stripParen(items[i]).items[side === 'lo' ? 0 : 2]), UV) };
}

function changeItem(level, rng, opts) {
  const d = cvData(rng);
  const dom = { kind: 'domain', coords: 'map', vars: ['u', 'v'], map: d.map, region: d.region, box: d.box, answers: [d.newLine] };
  const eqDomain = { x: d.kind === 'lin' ? d.xr : [0.5, 2], y: d.kind === 'lin' ? d.yr : [0.5, 2] };
  const jac = { kind: 'equiv', vars: ['x', 'y', 'u', 'v'], subst: d.map, domain: eqDomain, target: 'only', finalVars: d.finalVars };
  const Jcfg = { kind: 'equiv', vars: ['x', 'y', 'u', 'v', 'J'], subst: { ...d.map, J: d.Jxy }, domain: eqDomain, target: 'any', cv: { jac: d.jacUV } };
  const def = { kind: 'definite', seq: { I: vText(d.value) }, nRange: [1, 1], cv: { jac: d.jacUV, wrong: d.wrongInt } };
  let domL = E(d.newLine, 'D̃ : les inégalités de D, avec u et v', 'new-domain', 'dom');
  let jacLs = d.jacLines.map((m, i) => E(m, i === 0 ? 'Dérivées partielles' : 'Simplifier', 'jacobian', 'jac'));
  let JL = E(d.Juv, '|det J_G| = 1/|det ∂(u, v)/∂(x, y)|', 'invert', 'inv');
  let rwL = E(d.uvInt, 'L\'intégrale sur D̃', 'rewrite', 'rewrite');
  const sepL = E(d.sep, 'Séparer', 'compute', 'sep');
  const valL = E(vText(d.value), 'Calculer', 'compute', 'calc');
  if (level === 1) {
    domL = blankUV(domL, [[0, 'hi'], [1, 'hi']]);
    if (d.kind === 'hyp') jacLs[0] = blanked(jacLs[0], ['-y/x^2'], { vars: ['x', 'y'] });
    if (d.Juv !== '1') JL = blanked(JL, [d.Juv.replace(/^1\//, '').replace(/^\((.*)\)$/, '$1')], { vars: ['x', 'y', 'u', 'v'] });
    rwL = blanked(rwL, [d.Fuv], UV);
  }
  if (level === 2) { domL = blankUV(domL, [[1, 'lo']]); rwL = blanked(rwL, [d.Fuv], UV); }
  const dec = {
    kind: 'decision', prompt: 'Quel changement de variables ?', options: [
      ...['hyp', 'lin', 'hyp2'].map((k) => {
        const lab = k === d.kind ? d.label : k === 'hyp' ? 'u = xy, v = y/x' : k === 'hyp2' ? 'u = x² − y², v = xy' : 'u = x + y, v = x − y';
        return { id: k, label: lab, valid: k === d.kind, ...(k === d.kind ? {} : { why: `Regarde D : ${d.why}.` }) };
      }),
      { id: 'polar', label: 'Coordonnées polaires', valid: false, why: `D n'est ni un disque ni un secteur : ${d.why}.` },
    ],
  };
  const parts = [
    { start: d.region.join(' ; '), judge: dom, lines: [domL], pre: level === 3 ? [dec] : [] },
    { html: 'Le jacobien du changement (u, v) en fonction de (x, y) :', ask: 'det ∂(u, v)/∂(x, y) =', start: d.jacStart, judge: jac, lines: jacLs },
    { html: 'Le facteur J = |det J_G| de la formule, où G(u, v) = (x, y) est la réciproque :', ask: 'J =', start: 'J', judge: Jcfg, lines: [JL] },
    { html: 'L\'intégrale sur D̃, puis sa valeur :', ask: 'I =', start: 'I_D', judge: def, lines: [rwL, sepL, valL] },
  ];
  const [first, ...rest] = parts;
  const menuOf = (p) => (level === 3 ? { ...p.judge, menus: stepMenus(p.start, p.lines, CHOICES) } : p.judge);
  const script = [...(first.pre || []), ...first.lines];
  for (const p of rest) script.push(SEG(p.html, p.ask, p.start, menuOf(p)), ...(p.pre || []), ...p.lines);
  const D = `D = {(x, y) : ${d.region.map(R).join(', ')}}`;
  const pose = level === 3 ? 'Choisis un changement de variables (u, v) qui rend D rectangulaire' : `Pose ${d.label}`;
  return linesItem({
    skill: SK, level, mode: modeOf(level), start: first.start, judge: menuOf(first), script,
    prompt: `Calcule I<sub>D</sub> = ∬<sub>D</sub> ${d.f === '1' ? '' : MT(d.f)} dx dy, où ${D}. ${pose} : écris D̃ (les inégalités de D avec u et v), puis le jacobien, et calcule.`,
    hints: H(`${d.why.charAt(0).toUpperCase()}${d.why.slice(1)} : avec ${d.label}, D̃ est un rectangle. |det J_G| = 1/|det ∂(u, v)/∂(x, y)|.`,
      `det ∂(u, v)/∂(x, y) = ${MT(d.jacUV, { vars: ['x', 'y', 'u', 'v'] })}, donc dx dy = du dv/|${R(d.jacUV)}|`,
      `${MT(d.newLine, UV)} ; I = ${MT(d.uvInt)}`),
    subgoals: SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SK}:${level}:${d.kind}:${d.region.join(';')}:${d.f}`, exam: examTag(opts),
    baits: ['a2_jacobian_inverse'],
  });
}

// ---------- 2020 Q16: which set is D̃? ----------
// A set of the (u, v) plane, as a number: membership at fixed points.
const PTS = (() => { const r = makeRng(23); return Array.from({ length: 400 }, () => [r.next() * 12 - 6, r.next() * 12 - 6]); })();
function fingerprint(rows) {
  const fs = rows.map(([lo, e, hi]) => [lo, compileFloat(parse(e, UV)), hi]);
  let s = 0;
  PTS.forEach(([u, v], i) => { if (fs.every(([lo, f, hi]) => { const y = f({ u, v }); return y >= lo - 1e-12 && y <= hi + 1e-12; })) s += (i + 1) * 0.618; });
  return s;
}
const setHtml = (rows) => `D̃ = {(u, v) : ${rows.map(([lo, e, hi]) => MT(`${lo} ≤ ${e} ≤ ${hi}`, UV)).join(', ')}}`;

function domainMcq(rng, opts, level) {
  for (let t = 0; t < 200; t++) {
    const [a, b, c, d] = rng.pick(MATS);
    const det = a * d - b * c;
    if (Math.abs(det) < 2) continue;
    const p = [rng.int(-1, 0), rng.int(1, 2)];
    const r = [rng.int(-1, 0), rng.int(1, 2)];
    const Gx = linT([[a, 'u'], [b, 'v']]);
    const Gy = linT([[c, 'u'], [d, 'v']]);
    const right = [[p[0], Gx, p[1]], [r[0], Gy, r[1]]];
    // G(D): the preimage by G⁻¹, (u, v) ↦ M⁻¹(u, v).
    const iu = linT([[q(d, det), 'u'], [q(-b, det), 'v']]);
    const iv = linT([[q(-c, det), 'u'], [q(a, det), 'v']]);
    const direct = [[p[0], iu, p[1]], [r[0], iv, r[1]]];
    const same = [[p[0], 'u', p[1]], [r[0], 'v', r[1]]];
    const crossed = [[p[0], Gy, p[1]], [r[0], Gx, r[1]]];
    const it = mcqV({
      skill: SK, level,
      prompt: `Soit G(u, v) = (${R(Gx)} ; ${R(Gy)}) et D = [${nm(p[0])} ; ${p[1]}] × [${nm(r[0])} ; ${r[1]}] dans le plan (x, y). Pour écrire ∬<sub>D</sub> f(x, y) dx dy = ∬<sub>D̃</sub> f(G(u, v))·|det J_G| du dv, quel est D̃ ?`,
      right: { html: setHtml(right), x: fingerprint(right) },
      wrongs: [
        { html: setHtml(direct), x: fingerprint(direct), rule: 'a2_changevar_domain_direction' },
        ...rng.shuffle([{ html: setHtml(same), x: fingerprint(same) }, { html: setHtml(crossed), x: fingerprint(crossed) }]),
      ],
      key: `${SK}:mcq:dom:${Gx}:${Gy}:${p}:${r}`, expectedSec: 150, exam: examTag(opts) || false,
      solution: [{ html: `D̃ est l'ensemble des (u, v) que G envoie dans D : on écrit x = ${R(Gx)} ∈ [${nm(p[0])} ; ${p[1]}] et y = ${R(Gy)} ∈ [${nm(r[0])} ; ${r[1]}]. C'est G⁻¹(D), pas G(D).`, note: '' }],
    }, rng);
    if (it) return it;
  }
  return null;
}

// ---------- the value, with the inverse jacobian as a distractor ----------
function valueMcq(rng, opts, level) {
  for (let t = 0; t < 200; t++) {
    const d = cvData(rng);
    const wrong = intRect(d.wrongF, d.U, d.V);
    const forgot = vScale(d.value, d.kind === 'lin' ? Math.abs(d.det) : 2);
    const half = vScale(d.value, q(1, 2));
    const it = mcqV({
      skill: SK, level, prompt: `Avec ${d.label}, que vaut ∬<sub>D</sub> ${MT(d.f)} dx dy, où D = {(x, y) : ${d.region.map(R).join(', ')}} ?`,
      right: { html: MT(vText(d.value)), x: vFloat(d.value) },
      wrongs: [
        { html: MT(vText(wrong)), x: vFloat(wrong), rule: 'a2_jacobian_inverse' },
        ...rng.shuffle([{ html: MT(vText(forgot)), x: vFloat(forgot), rule: d.kind === 'lin' ? 'a2_jacobian_forgot' : null }, { html: MT(vText(half)), x: vFloat(half) }]),
      ],
      key: `${SK}:mcq:val:${d.kind}:${d.region.join(';')}:${d.f}`, expectedSec: 240, exam: examTag(opts) || false,
      solution: [{ html: `D̃ : ${MT(d.newLine, UV)} ; det ∂(u, v)/∂(x, y) = ${MT(d.jacUV, { vars: ['x', 'y', 'u', 'v'] })}, donc dx dy = du dv/|${R(d.jacUV)}| ; I = ${MT(d.uvInt)} = ${MT(vText(d.value))}.`, note: '' }],
    }, rng);
    if (it) return it;
  }
  return null;
}

// ---------- V/F on the formula ----------
// A false statement is a « for all »: its counter-example is a value of
// the parameters (kind refute).
const refute = (vars, pred, answer) => ({
  kind: 'refute', quants: vars.map(([v, dom]) => ({ q: '∀', v, dom })), pred,
  ask: vars.map(([v]) => ({ v, label: `${v} =` })), answer,
});
function vfItem(rng, level, exam) {
  const kind = rng.pick(['abs', 'hyp', 'lin', 'area', 'dir']);
  const truth = rng.chance(0.5);
  let statement;
  let why;
  let counter = null;
  let ruleIfTrue = null;
  if (kind === 'abs') {
    statement = `Pour tous réels a, b non nuls, avec G(u, v) = (au ; bv), D̃ = [0 ; 1] × [0 ; 1] et D = G(D̃) : ∬<sub>D</sub> dx dy = ∬<sub>D̃</sub> ${truth ? '|det J_G|' : 'det J_G'} du dv.`;
    why = 'C\'est la formule du changement de variables : avec la valeur absolue du jacobien. Ici det J_G = ab, et l\'aire de D vaut |ab|.';
    if (!truth) counter = refute([['a', 'R'], ['b', 'R']], 'abs(a b) = a b', { a: '-1', b: '1' });
  } else if (kind === 'hyp') {
    statement = `Avec u = xy et v = y/x (x, y > 0), |det J_G| = ${truth ? '1/(2v)' : '2v'} en tout point, donc dx dy = ${truth ? 'du dv/(2v)' : '2v du dv'}.`;
    why = 'det ∂(u, v)/∂(x, y) = y/x + y/x = 2v. C\'est le jacobien de G⁻¹ : |det J_G| = 1/(2v) = x/(2y), et dx dy = du dv/(2v).';
    if (!truth) { counter = refute([['x', 'R+'], ['y', 'R+']], 'x/(2y) = 2y/x', { x: '1', y: '1' }); ruleIfTrue = 'a2_jacobian_inverse'; }
  } else if (kind === 'lin') {
    statement = `Pour tout k > 0, avec u = kx et v = ky, on a dx dy = ${truth ? 'du dv/k²' : 'k² du dv'}.`;
    why = 'det ∂(u, v)/∂(x, y) = k² : c\'est le jacobien de G⁻¹. Donc dx dy = du dv/k².';
    if (!truth) { counter = refute([['k', 'R+']], '1/k^2 = k^2', { k: '2' }); ruleIfTrue = 'a2_jacobian_inverse'; }
  } else if (kind === 'area') {
    statement = `Pour tous m, n > 0, si G(u, v) = (mu ; nv), l'aire de G(D̃) vaut ${truth ? 'mn fois' : '1/(mn) fois'} l'aire de D̃.`;
    why = 'det J_G = mn : aire(G(D̃)) = ∬<sub>D̃</sub> |det J_G| du dv = mn·aire(D̃).';
    if (!truth) { counter = refute([['m', 'R+'], ['n', 'R+']], '1/(m n) = m n', { m: '2', n: '1' }); ruleIfTrue = 'a2_jacobian_inverse'; }
  } else {
    statement = `Pour tout k > 0, avec G(u, v) = (ku ; kv) et D = [0 ; 1] × [0 ; 1], le domaine D̃ de la formule ∬<sub>D</sub> f dx dy = ∬<sub>D̃</sub> f∘G·|det J_G| du dv est ${truth ? '[0 ; 1/k] × [0 ; 1/k]' : '[0 ; k] × [0 ; k]'}.`;
    why = 'G va de D̃ vers D : D̃ est l\'ensemble des (u, v) envoyés dans D, c\'est-à-dire G⁻¹(D) = [0 ; 1/k] × [0 ; 1/k], et pas G(D).';
    if (!truth) { counter = refute([['k', 'R+']], 'k = 1/k', { k: '2' }); ruleIfTrue = 'a2_changevar_domain_direction'; }
  }
  return tfItem({
    skill: SK, level, statement, truth, counter, ruleIfTrue, explanation: why, key: `${kind}:${truth}`, exam, noHints: level >= 5,
    hints: H('|det J_G| = 1/|det ∂(u, v)/∂(x, y)| : le jacobien de G, pas celui de G⁻¹.', 'D̃ = G⁻¹(D) : les (u, v) que G envoie dans D.', why),
  });
}

export function changeVar(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return vfItem(rng, 4, { format: 'tf', points: 1 });
  if (opts.exam === 'mcq') return rng.chance(0.5) ? domainMcq(rng, opts, 4) : valueMcq(rng, opts, 4);
  if (level === 5) return rng.chance(0.6) ? domainMcq(rng, opts, 5) : vfItem(rng, 5, false);
  return changeItem(level, rng, opts);
}
