// Tools of module V, part b (step U10): texts of surfaces (graphs and
// surfaces of revolution in (r, φ), spheres in (θ, φ)), their partial
// derivatives, normals σ_u ∧ σ_v and oriented boundaries σ(∂A), in the line
// languages of the judges `param`, `vector`, `boundary`, `equiv` and
// `definite`; parts of `partsItem` (geo-kit.js) built from them.
//
// Texts for the judges use « - »; the screen shows them through the judges
// (LML) or MT.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { toText } from '../../cas/print.js';
import { evalFloat } from '../../cas/numeric.js';
import { tokenize } from '../../cas/parse.js';
import { MT, mcq, linesItem, examTag } from './kit.js';
import { LML, H, modeOf, blanks } from './geo-kit.js';
import { problemItem } from './kit-problem.js';
import { t } from '../../i18n.js';

export { MT, mcq, linesItem, examTag, LML, H, modeOf, problemItem };

export const KEYS = ['calcx', 'calcfn', 'vecto', 'a2'];
export const q = (n, d = 1) => {
  if (typeof n === 'string' && n.includes('/')) { const [a, b] = n.split('/'); return new Q(Number(a), Number(b)).div(Q.of(d)); }
  return (n instanceof Q ? n : Q.of(Number(n))).div(Q.of(d));
};
export const qs = (x) => String(q(x));
export const pick = (rng, list) => list[rng.int(0, list.length - 1)];
export const SG = (id, label, skill) => ({ id, label, skill });

// ---------- texts ----------

// c·body ('' for c = 0): body, -body, 3body, (1/2)body, -(3/2)body.
export function cm(c, body) {
  const C = q(c);
  if (C.n === 0) return '';
  if (!body) return qs(C);
  if (C.eq(1)) return body;
  if (C.eq(-1)) return `-${body}`;
  if (C.d === 1) return `${C.n}${body}`;
  return `${C.n < 0 ? '-' : ''}(${Math.abs(C.n)}/${C.d})${body}`;
}
// Terms joined into a sum (empty terms skipped).
export const sum = (terms) => terms.filter((tt) => tt && tt !== '0').reduce((s, tt) => (s ? (tt.startsWith('-') ? `${s}${tt}` : `${s}+${tt}`) : tt), '') || '0';
// Polynomial Σ cₖ vᵏ, highest power first: [c0, c1, c2] → -r^2+2r+3.
export function poly(cs, v) {
  const mono = (k) => (k === 0 ? '' : k === 1 ? v : `${v}^${k}`);
  return sum(cs.map((c, k) => [c, k]).reverse().map(([c, k]) => cm(c, mono(k))));
}
// c·π as text: π, -π, 3π, π/2, 3π/4.
export function piT(c) {
  const C = q(c);
  if (C.n === 0) return '0';
  const s = C.n < 0 ? '-' : '';
  const a = Math.abs(C.n);
  const top = a === 1 ? 'π' : `${a}π`;
  return C.d === 1 ? `${s}${top}` : `${s}${top}/${C.d}`;
}
// A text in parentheses unless it is a plain number or letter.
export const par = (tt) => (/^-?[0-9a-zπ]+(\/[0-9]+)?$/.test(tt) && !/^-/.test(tt) ? tt : `(${tt})`);
// Readable screen text: − and no ×.
export const fr = (tt) => String(tt).replace(/-/g, '−');
// Pretty form of a CAS text (for prompts).
export const tidy = (tt, vars = []) => { try { return toText(parse(tt, { vars })); } catch { return tt; } };

// The MathML of a line as a given judge shows it.
export const PML = (text, params) => LML({ kind: 'param', params, curve: { ref: '(t;t)', t: [0, 1] } }, text);
export const VML = (text, params = ['r', 'φ']) => LML({ kind: 'vector', params, symbols: {}, form: 'any' }, text);

// ---------- judges ----------

export const vecJudge = (expect, params, traps) => ({ kind: 'vector', params, symbols: {}, form: 'any', expect, ...(traps ? { traps } : {}) });
export const defJudge = (traps, known) => ({ kind: 'definite', ...(traps ? { traps } : {}), ...(known ? { known } : {}) });
export const eqJudge = (vars, extra = {}) => ({ kind: 'equiv', vars, ...extra });

// ---------- surfaces ----------

// A surface of revolution z = h(r) above the disc (or a sector) r ≤ ρ:
// o = {h: [c0, c1, c2], rho: text, rho2: Q (ρ²), phi: [lo, hi] texts (default
// [0, 2π]), order: 'rφ' | 'φr'}. The normal σ_r ∧ σ_φ points up.
export function revSurf(o) {
  const [c0, c1, c2] = o.h.map((c) => q(c ?? 0));
  const phi = o.phi || ['0', '2π'];
  const order = o.order || 'rφ';
  const H = poly([c0, c1, c2], 'r');
  const dH = poly([c1, c2.mul(2)], 'r');
  // −h′(r) = a + b·r.
  const a = c1.neg();
  const b = c2.mul(-2);
  const lin = (body) => {
    if (b.n === 0) return cm(a, `r ${body}`);
    if (a.n === 0) return cm(b, `r^2 ${body}`);
    return `(${poly([a, b], 'r')})r ${body}`;
  };
  const N = [lin('cos(φ)'), lin('sin(φ)'), 'r'];
  const neg = (tt) => (tt.startsWith('-') ? tt.slice(1) : `-${tt}`);
  const sigma = `(r cos(φ) ; r sin(φ) ; ${H})`;
  const params = order === 'rφ' ? ['r', 'φ'] : ['φ', 'r'];
  const rIv = ['0', o.rho];
  const box = order === 'rφ' ? [rIv, phi] : [phi, rIv];
  const s = {
    kind: 'rev', h: [c0, c1, c2], H, dH, rho: o.rho, rho2: q(o.rho2), phi, order, params,
    sigma, sr: `(cos(φ) ; sin(φ) ; ${dH})`, sp: '(-r sin(φ) ; r cos(φ) ; 0)',
    N: order === 'rφ' ? `(${N.join(' ; ')})` : `(${N.map(neg).join(' ; ')})`,
    Nup: `(${N.join(' ; ')})`,
    // |σ_r ∧ σ_φ| = r√(1 + h′²)
    norm: b.n === 0 ? (a.n === 0 ? 'r' : `r sqrt(${qs(a.mul(a).add(1))})`) : `r sqrt(1+${par(poly([c1, c2.mul(2)], 'r'))}^2)`,
    normRaw: `sqrt(${N.map((tt) => `(${tt})^2`).join('+')})`,
    up: order === 'rφ',
    ref: { ref: sigma, u: box[0].map(num), v: box[1].map(num), params },
  };
  s.line = `σ(${params.join(', ')}) = ${sigma}, (${params.join(' ; ')}) ∈ [${box[0][0]} ; ${box[0][1]}] × [${box[1][0]} ; ${box[1][1]}]`;
  s.bare = s.line.replace(/^[^=]*= /, '');
  s.label = `σ(${params.join(', ')})`;
  s.du = order === 'rφ' ? 'σ_r ∧ σ_φ' : 'σ_φ ∧ σ_r';
  return s;
}

// A sphere (θ from the z axis) of radius R, θ ∈ [0 ; θmax]: o = {R, top:
// 'π/2' | 'π', order: 'θφ' | 'φθ'}. The normal σ_θ ∧ σ_φ is outward.
export function sphSurf(o) {
  const R = o.R;
  const R2 = R * R;
  const order = o.order || 'θφ';
  const params = order === 'θφ' ? ['θ', 'φ'] : ['φ', 'θ'];
  const sigma = `(${cm(R, 'sin(θ)cos(φ)')} ; ${cm(R, 'sin(θ)sin(φ)')} ; ${cm(R, 'cos(θ)')})`;
  const tIv = ['0', o.top];
  const pIv = ['0', '2π'];
  const box = order === 'θφ' ? [tIv, pIv] : [pIv, tIv];
  const Nout = [cm(R2, 'sin(θ)^2 cos(φ)'), cm(R2, 'sin(θ)^2 sin(φ)'), cm(R2, 'sin(θ)cos(θ)')];
  const neg = (tt) => `-${tt}`;
  const s = {
    kind: 'sph', R, R2, top: o.top, order, params, sigma,
    st: `(${cm(R, 'cos(θ)cos(φ)')} ; ${cm(R, 'cos(θ)sin(φ)')} ; ${cm(-R, 'sin(θ)')})`,
    sp: `(${cm(-R, 'sin(θ)sin(φ)')} ; ${cm(R, 'sin(θ)cos(φ)')} ; 0)`,
    N: order === 'θφ' ? `(${Nout.join(' ; ')})` : `(${Nout.map(neg).join(' ; ')})`,
    Nout: `(${Nout.join(' ; ')})`,
    norm: cm(R2, 'sin(θ)'),
    normRaw: `sqrt(${Nout.map((tt) => `(${tt})^2`).join('+')})`,
    up: order === 'θφ',
    ref: { ref: sigma, u: box[0].map(num), v: box[1].map(num), params },
    // The trap v_sphere_theta: sin θ and cos θ exchanged in σ.
    swapped: `(${cm(R, 'cos(θ)cos(φ)')} ; ${cm(R, 'cos(θ)sin(φ)')} ; ${cm(R, 'sin(θ)')})`,
  };
  s.line = `σ(${params.join(', ')}) = ${sigma}, (${params.join(' ; ')}) ∈ [${box[0][0]} ; ${box[0][1]}] × [${box[1][0]} ; ${box[1][1]}]`;
  s.swappedLine = `${s.swapped}, (${params.join(' ; ')}) ∈ [${box[0][0]} ; ${box[0][1]}] × [${box[1][0]} ; ${box[1][1]}]`;
  s.bare = s.line.replace(/^[^=]*= /, '');
  s.label = `σ(${params.join(', ')})`;
  s.du = order === 'θφ' ? 'σ_θ ∧ σ_φ' : 'σ_φ ∧ σ_θ';
  return s;
}

export function num(tt) {
  if (typeof tt === 'number') return tt;
  return evalFloat(parse(String(tt).replace(/√(\d+)/g, 'sqrt($1)'), {}), {});
}

// The parametrisation judge of a surface.
export const paramJudge = (s, traps) => ({ kind: 'param', surface: s.ref, ...(traps ? { traps } : {}) });

// ---------- oriented boundary σ(∂A) ----------

// The sides of ∂A run positively (A on the left, the first parameter on
// the horizontal axis): S1 bottom (v = v0, u: u0 → u1), S2 right (u = u1,
// v: v0 → v1), S3 top (v = v1, u: u1 → u0), S4 left (u = u0, v: v1 → v0).
// Each side: {name, desc (HTML), point | cancels | ref, t, closed, line (the
// reference line), kind: 'point' | 'cancel' | 'piece', what (HTML)}.
export function boundaryOf(s) {
  const sides = s.kind === 'sph' ? sphSides(s) : revSides(s);
  return sides.map((x, i) => ({ ...x, name: `Γ${i + 1}` }));
}
const PNAME = { r: 'r', φ: 'φ', θ: 'θ' };
const sideDesc = (fixed, at, run, from, to) => t('{a} = {b}, {c} de {d} à {e}', { a: PNAME[fixed], b: fr(at), c: PNAME[run], d: fr(from), e: fr(to) });

function revSides(s) {
  const q2 = s.rho;
  const full = s.phi[1] === '2π' && s.phi[0] === '0';
  // h(α + βt) as a polynomial in t.
  const Ht = (arg) => {
    const [al, be] = arg === 't' ? [q(0), q(1)] : [q(Number(q2)), q(-1)];
    const [c0, c1, c2] = s.h;
    return poly([c0.add(c1.mul(al)).add(c2.mul(al).mul(al)), c1.mul(be).add(c2.mul(al).mul(be).mul(2)), c2.mul(be).mul(be)], 't');
  };
  const meridian0 = { ref: `(t ; 0 ; ${Ht('t')})`, t: ['0', q2] }; // φ = 0, r: 0 → ρ
  const back0 = { ref: `(${q2}-t ; 0 ; ${Ht(`${q2}-t`)})`, t: ['0', q2] }; // φ = 0, r: ρ → 0
  const meridianPi = { ref: `(-t ; 0 ; ${Ht('t')})`, t: ['0', q2] }; // φ = π, r: 0 → ρ
  const backPi = { ref: `(t-${q2} ; 0 ; ${Ht(`${q2}-t`)})`, t: ['0', q2] }; // φ = π, r: ρ → 0
  const R = q(Number(q2));
  const zR = qs(s.h[0].add(s.h[1].mul(R)).add(s.h[2].mul(R).mul(R)));
  const circle = { ref: `(${cm(R, 'cos(t)')} ; ${cm(R, 'sin(t)')} ; ${zR})`, t: ['0', s.phi[1]], closed: full };
  const circleBack = full
    ? { ref: `(${cm(R, 'cos(t)')} ; ${cm(R.neg(), 'sin(t)')} ; ${zR})`, t: ['0', '2π'], closed: true }
    : { ref: `(${cm(R.neg(), 'cos(t)')} ; ${cm(R, 'sin(t)')} ; ${zR})`, t: ['0', 'π'] };
  const top = `(0 ; 0 ; ${qs(s.h[0])})`;
  if (s.order === 'rφ') {
    return [
      { desc: sideDesc('φ', '0', 'r', '0', q2), ...piece(meridian0), cancelsWith: full ? 2 : null, what: t('un arc dans le plan y = 0') },
      { desc: sideDesc('r', q2, 'φ', '0', s.phi[1]), ...piece(circle), what: full ? t('le cercle du bord') : t('un demi-cercle') },
      { desc: sideDesc('φ', s.phi[1], 'r', q2, '0'), ...piece(full ? back0 : backPi), cancelsWith: full ? 0 : null, what: t('un arc dans le plan y = 0') },
      { desc: sideDesc('r', '0', 'φ', s.phi[1], '0'), point: top, what: t('le point {a}', { a: fr(top) }) },
    ].map(finish);
  }
  return [
    { desc: sideDesc('r', '0', 'φ', '0', s.phi[1]), point: top, what: t('le point {a}', { a: fr(top) }) },
    { desc: sideDesc('φ', s.phi[1], 'r', '0', q2), ...piece(full ? meridian0 : meridianPi), cancelsWith: full ? 3 : null, what: t('un arc dans le plan y = 0') },
    { desc: sideDesc('r', q2, 'φ', s.phi[1], '0'), ...piece(circleBack), what: full ? t('le cercle du bord') : t('un demi-cercle') },
    { desc: sideDesc('φ', '0', 'r', q2, '0'), ...piece(back0), cancelsWith: full ? 1 : null, what: t('un arc dans le plan y = 0') },
  ].map(finish);
}

function sphSides(s) {
  const R = s.R;
  const merid = { ref: `(${cm(R, 'sin(t)')} ; 0 ; ${cm(R, 'cos(t)')})`, t: ['0', s.top] };
  const eq = { ref: `(${cm(R, 'cos(t)')} ; ${cm(R, 'sin(t)')} ; 0)`, t: ['0', '2π'], closed: true };
  const eqBack = { ref: `(${cm(R, 'cos(t)')} ; ${cm(-R, 'sin(t)')} ; 0)`, t: ['0', '2π'], closed: true };
  const north = `(0 ; 0 ; ${R})`;
  if (s.order === 'θφ') {
    return [
      { desc: sideDesc('φ', '0', 'θ', '0', s.top), ...piece(merid), cancelsWith: 2, what: t('un méridien') },
      { desc: sideDesc('θ', s.top, 'φ', '0', '2π'), ...piece(eq), what: t('l\'équateur') },
      { desc: sideDesc('φ', '2π', 'θ', s.top, '0'), ...piece(merid), cancelsWith: 0, what: t('le même méridien') },
      { desc: sideDesc('θ', '0', 'φ', '2π', '0'), point: north, what: t('le pôle nord') },
    ].map(finish);
  }
  return [
    { desc: sideDesc('θ', '0', 'φ', '0', '2π'), point: north, what: t('le pôle nord') },
    { desc: sideDesc('φ', '2π', 'θ', '0', s.top), ...piece(merid), cancelsWith: 3, what: t('un méridien') },
    { desc: sideDesc('θ', s.top, 'φ', '2π', '0'), ...piece(eqBack), what: t('l\'équateur') },
    { desc: sideDesc('φ', '0', 'θ', s.top, '0'), ...piece(merid), cancelsWith: 1, what: t('le même méridien') },
  ].map(finish);
}
const piece = (c) => ({ ref: c.ref, t: c.t, closed: !!c.closed });
const finish = (x, i) => ({ ...x, idx: i });

// The judge `boundary` of a list of sides, and the reference lines: the
// points, the cancelling pairs, then the kept pieces.
export function boundaryJudge(sides) {
  return {
    kind: 'boundary',
    sides: sides.map((x) => {
      if (x.point) return { name: x.name, point: true };
      if (x.cancelsWith !== null && x.cancelsWith !== undefined) return { name: x.name, cancels: sides[x.cancelsWith].name, ref: x.ref, t: x.t };
      return { name: x.name, ref: x.ref, t: x.t, ...(x.closed ? { closed: true } : {}) };
    }),
  };
}
export const pieceLine = (x, named = true) => `${named ? `${x.name} : ` : ''}${x.ref}, t ∈ [${x.t[0]} ; ${x.t[1]}]`;
export const kept = (sides) => sides.filter((x) => !x.point && (x.cancelsWith === null || x.cancelsWith === undefined));
export function boundaryLines(sides) {
  const out = [];
  for (const x of sides.filter((y) => y.point)) out.push({ kind: 'point', side: x, math: `${x.name} : point` });
  const seen = new Set();
  for (const x of sides) {
    if (x.cancelsWith === null || x.cancelsWith === undefined || seen.has(x.idx)) continue;
    const y = sides[x.cancelsWith];
    seen.add(x.idx); seen.add(y.idx);
    out.push({ kind: 'cancel', side: x, other: y, math: `${x.name} et ${y.name} : s'annulent` });
  }
  for (const x of kept(sides)) out.push({ kind: 'piece', side: x, math: pieceLine(x) });
  return out;
}
// The sides of ∂A, as an HTML list for the prompt.
export const sidesHtml = (sides) => sides.map((x) => `${x.name} : ${x.desc}`).join(' ; ');

// ---------- items ----------

// Single-answer multiple choice (four distinct options, the right one first).
export function choice(o, rng) {
  const options = [{ html: o.right, correct: true }];
  for (const w of o.wrongs) {
    if (!w || options.length >= (o.count || 4)) continue;
    if (options.some((x) => x.html === w.html)) continue;
    options.push({ html: w.html, correct: false, rule: w.rule ?? null });
  }
  return mcq({ ...o, options }, rng);
}
export const opt = (html, rule = null) => ({ html, rule });

// A decision line (§5.3): options [{id, label, valid, rule?, why?, quality?, ref?}].
export const decision = (prompt, options, levels) => ({ kind: 'decision', prompt, options, ...(levels ? { levels } : {}) });

// A menu of the « choose the action » mode: the right action first, then wrong ones.
export const menu = (right, wrongs = []) => [{ id: 'ok', label: right, valid: true }, ...wrongs.map((w, i) => ({ id: `w${i}`, label: w.label, valid: false, why: w.why, ...(w.rule ? { rule: w.rule } : {}) }))];

// Blanks searched after the first « = » of the line (a label σ(r, φ), σ_r
// or σ_r ∧ σ_φ is never blanked), else in the whole line.
export function blanksEq(math, parts, after = '=') {
  const i = math.indexOf(after);
  if (i < 0) return blanks(math, parts);
  const nHead = tokenize(math.slice(0, i + 1), {}).length;
  const r = blanks(math.slice(i + 1), parts);
  return r.blanks ? { math, blanks: r.blanks.map(([a, b]) => [a + nHead, b + nHead]) } : { math };
}

// partsItem of geo-kit.js, with the blanks of blanksEq: parts: [{html, ask,
// start, judge, notes?, decisions?, menu?, lines: [{math, note, subgoal,
// blank?, blank2?, after?, after2? (the blanks are searched after this
// text, default « = »), from?}]}].
export function partsItem(o) {
  const { level, parts } = o;
  const guided = level <= 2;
  const judgeAt = (p) => (level === 3 && p.menu ? { ...p.judge, menu: p.menu } : p.judge);
  const script = [];
  parts.forEach((p, k) => {
    if (k > 0) script.push({ kind: 'segment', html: p.html, ask: p.ask, start: { math: p.start }, judge: judgeAt(p) });
    else if (p.html) script.push({ kind: 'note', html: p.html });
    for (const n of p.notes || []) script.push({ kind: 'note', html: n });
    for (const dec of p.decisions || []) {
      if (o.exam || (dec.levels && !dec.levels.includes(level))) continue;
      if (level === 1) {
        const ok = dec.options.find((x) => x.ref) ?? dec.options.find((x) => x.valid && x.quality !== 'poor');
        script.push({ kind: 'note', html: `${dec.prompt} ${ok.label}.` });
      } else {
        const { levels, ...line } = dec;
        script.push(line);
      }
    }
    for (const l of p.lines) {
      if (l.from && level < l.from) continue;
      const line = { kind: 'eq', math: l.math, note: l.note || '', subgoal: l.subgoal };
      const b = level === 1 ? l.blank : (l.blank2 ?? l.blank);
      if (guided && b?.length) Object.assign(line, blanksEq(l.math, b, (level === 1 ? l.after : (l.after2 ?? l.after)) || '='));
      script.push(line);
    }
  });
  return linesItem({
    skill: o.skill, level, prompt: o.prompt, start: parts[0].start, judge: judgeAt(parts[0]),
    mode: modeOf(level), script, hints: o.hints, subgoals: o.subgoals, keys: o.keys || KEYS,
    key: o.key, tapActions: level === 3 ? 'menu' : null, fallback: o.fallback, exam: o.exam || false, noHints: o.noHints,
    baits: o.baits,
  });
}

// The component of σ_u ∧ σ_v left blank in a guided line (never a lone
// letter, which would match the label).
export const normalBlank = (s) => {
  const cs = s.N.slice(1, -1).split(' ; ');
  return s.kind === 'sph' ? cs[2] : cs[0];
};
