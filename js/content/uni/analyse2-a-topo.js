// Generators of module A2, part a (step U6): a2-rn-topology (open, closed,
// bounded, compact) and a2-rn-boundary (interior, closure, boundary).
// Catalogue: docs/universite/A2-analyse-2.md.
//
// A set is a union of conjunctions of atoms g ⋄ c (S = {dim, parts}, the
// format of js/judges/a2-examples-a.js, which decides membership and the
// kind of a point: interior, on the boundary inside or outside E,
// exterior). The generator starts from the atoms: open if every atom that
// is not always true is strict, closed if every one is large, neither
// otherwise; bounded if each coordinate is bounded on both sides. Then it
// checks on a grid (integers, then halves, in [−4 ; 4]ⁿ) that a point of the
// boundary is in E when E is said not open, and that one is missing when E
// is said not closed (else the draw is rejected), and far points (±50)
// for « bounded ».
//
// No `plot` region (not built): the sets are written with inequalities,
// the four answers are a single-answer multiple choice of the combined
// classification, or a table of V/F cells (judge iter, phi truth).

import { MT, mcq, tfItem, tableItem } from './kit.js';
import { problemItem } from './kit-problem.js';
import { inSet, pointKind } from '../../judges/a2-examples-a.js';
import { parse } from '../../cas/parse.js';
import { toReadable } from '../../cas/print.js';

const TOPO = 'a2-rn-topology';
const BD = 'a2-rn-boundary';
const XYZ = { vars: ['x', 'y', 'z'] };
const H = (a, b, c) => [{ level: 1, html: a }, { level: 2, html: b }, { level: 3, html: c }];
const STRICT = new Set(['<', '>', '≠']);
const isStrict = (a) => STRICT.has(a.op);
const R = (dim) => (dim === 3 ? 'ℝ³' : 'ℝ²');
const COORDS = (dim) => (dim === 3 ? '(x, y, z)' : '(x, y)');
const VARS = (dim) => (dim === 3 ? ['x', 'y', 'z'] : ['x', 'y']);
const readable = (t) => toReadable(parse(t, XYZ)).replace(/,/g, ' ; ');

// A number as text: 1/2, −3/2.
export function numT(x) {
  if (Number.isInteger(x)) return String(x).replace('-', '−');
  const n = Math.round(x * 2);
  return `${n < 0 ? '−' : ''}${Math.abs(n)}/2`;
}
export const ptT = (p) => `(${p.map(numT).join(' ; ')})`;
const ptAns = (p) => ptT(p).replace(/−/g, '-');

// ---------- atoms ----------

const BALLS = {
  b2: { g: 'x^2+y^2', vars: ['x', 'y'], cs: [1, 4, 9, 2, 5], dims: [2, 3] },
  bxz: { g: 'x^2+z^2', vars: ['x', 'z'], cs: [1, 4, 9], dims: [3] },
  b3: { g: 'x^2+y^2+z^2', vars: ['x', 'y', 'z'], cs: [1, 4, 9, 2, 3], dims: [3] },
  l1: { g: '|x|+|y|', vars: ['x', 'y'], cs: [1, 2, 3], dims: [2, 3] },
  linf: { g: 'max(|x| ; |y|)', vars: ['x', 'y'], cs: [1, 2, 3], dims: [2, 3] },
  ell: { g: 'x^2+4y^2', vars: ['x', 'y'], cs: [4, 16], dims: [2, 3] },
};
const FREE = {
  hyp: { g: 'x^2-y^2', vars: ['x', 'y'], cs: [1, 4, -1], dims: [2, 3] },
  xy: { g: 'xy', vars: ['x', 'y'], cs: [1, 2, -1], dims: [2, 3] },
  parab: { g: 'z-x^2-y^2', vars: ['x', 'y', 'z'], cs: [0, 1, -1], dims: [3] },
};
const atom = (g, op, c, o = {}) => ({ g, op, c: String(c), ...o });

function ballAtom(rng, dim, inner = true, keys = null) {
  const k = rng.pick((keys || Object.keys(BALLS)).filter((x) => BALLS[x].dims.includes(dim)));
  const B = BALLS[k];
  const op = inner ? rng.pick(['<', '≤']) : rng.pick(['>', '≥']);
  return atom(B.g, op, rng.pick(B.cs), { vars: B.vars, bounds: inner ? B.vars : [], kind: k });
}
function freeAtom(rng, dim) {
  const k = rng.pick([...Object.keys(FREE).filter((x) => FREE[x].dims.includes(dim)), 'lin']);
  const op = rng.pick(['<', '≤', '>', '≥']);
  if (k === 'lin') {
    const co = VARS(dim).map(() => rng.pick([1, 2, -1, 3, 0, 1]));
    if (co.every((c) => !c)) co[0] = 1;
    const g = co.map((c, i) => (c ? `${c < 0 ? '-' : '+'}${Math.abs(c) === 1 ? '' : Math.abs(c)}${VARS(dim)[i]}` : '')).join('').replace(/^\+/, '');
    return atom(g, op, rng.int(-2, 3), { vars: VARS(dim).filter((_, i) => co[i]), bounds: [], kind: 'lin' });
  }
  return atom(FREE[k].g, op, rng.pick(FREE[k].cs), { vars: FREE[k].vars, bounds: [], kind: k });
}
// One side of a single variable: z > 0, y ≤ 2.
const varAtom = (v, op, c) => atom(v, op, c, { vars: [v], side: op === '<' || op === '≤' ? 'hi' : 'lo', kind: 'var' });
// An inequality that is always true.
function trivialAtom(rng, dim, strict) {
  const a = rng.int(1, 5) * 5;
  const b = rng.int(1, 4) * 5;
  const kind = rng.int(0, 2);
  if (kind === 0) return atom(`-${a}x^2-${b}y^2`, strict ? '<' : '≤', 1, { trivial: true, show: `1 ${strict ? '>' : '≥'} -${a}x^2-${b}y^2`, vars: [] });
  const g = dim === 3 && rng.chance(0.5) ? 'x^2+y^2+z^2' : 'x^2+y^2';
  if (kind === 1) return atom(g, strict ? '>' : '≥', -rng.int(1, 3), { trivial: true, vars: [] });
  return atom(`${g}+1`, strict ? '>' : '≥', 0, { trivial: true, vars: [] });
}
const atomText = (a) => a.show || `${a.g} ${a.op} ${a.c}`;
// A short signature of a set (item keys).
const sig = (T) => `${T.dim}:${T.S.parts.map((p) => p.map((a) => `${a.g}${a.op}${a.c}`).join(',')).join('|')}`;

// The atoms of a conjunction as MathML, two sides of the same variable as
// one chain (−1 < z ≤ 2).
function atomsML(atoms) {
  const out = [];
  const used = new Set();
  atoms.forEach((a, i) => {
    if (used.has(i)) return;
    if (a.kind === 'var') {
      const j = atoms.findIndex((b, k) => k !== i && !used.has(k) && b.kind === 'var' && b.g === a.g && b.side !== a.side);
      if (j >= 0) {
        const lo = a.side === 'lo' ? a : atoms[j];
        const hi = a.side === 'lo' ? atoms[j] : a;
        used.add(i).add(j);
        out.push(MT(`${lo.c} ${lo.op === '>' ? '<' : '≤'} ${a.g} ${hi.op} ${hi.c}`, XYZ));
        return;
      }
    }
    used.add(i);
    out.push(MT(atomText(a), XYZ));
  });
  return out.join(', ');
}
const setML = (dim, atoms) => `{${COORDS(dim)} ∈ ${R(dim)} : ${atomsML(atoms)}}`;

// ---------- classification ----------

function boundedBy(atoms, dim, onlyPresent = false) {
  const vars = VARS(dim);
  const lo = new Set();
  const hi = new Set();
  const present = new Set();
  for (const a of atoms) {
    if (a.trivial) continue;
    for (const v of a.vars || []) present.add(v);
    for (const v of a.bounds || []) { lo.add(v); hi.add(v); }
    if (a.side === 'lo') lo.add(a.g);
    if (a.side === 'hi') hi.add(a.g);
  }
  return vars.filter((v) => !onlyPresent || present.has(v)).every((v) => lo.has(v) && hi.has(v));
}
function conjClass(atoms, dim, { countTrivial = false } = {}) {
  const use = atoms.filter((a) => countTrivial || !a.trivial);
  return { open: use.every(isStrict), closed: use.every((a) => !isStrict(a)), bounded: boundedBy(atoms, dim) };
}

const GRID1 = [0, 1, -1, 2, -2, 3, -3, 4, -4];
const GRID2 = [0, 0.5, -0.5, 1, -1, 1.5, -1.5, 2, -2, 2.5, -2.5, 3, -3, 3.5, -3.5, 4, -4];
function* gridPoints(dim, vals) {
  for (const x of vals) for (const y of vals) {
    if (dim === 2) yield [x, y];
    else for (const z of vals) yield [x, y, z];
  }
}
const simplicity = (p) => p.reduce((s, x) => s + Math.abs(x) + (Number.isInteger(x) ? 0 : 3), 0);
// The simplest grid point of each kind (integers, then halves when a kind
// the set should have is missing).
function witnesses(S, want = ['bdIn', 'bdOut']) {
  const best = {};
  for (const vals of [GRID1, GRID2]) {
    for (const p of gridPoints(S.dim, vals)) {
      const k = pointKind(S, p, [1e-4]);
      if (!best[k] || simplicity(p) < simplicity(best[k])) best[k] = p;
    }
    if (want.every((k) => best[k]) && (best.interior || best.bdIn) && (best.exterior || best.bdOut)) break;
  }
  return best;
}
function hasFarPoint(S) {
  const vals = [-50, 50, -2, -1, 0, 1, 2];
  for (const p of gridPoints(S.dim, vals)) if (p.some((x) => Math.abs(x) === 50) && inSet(S, p)) return true;
  return false;
}

// A drawn set with its classification, its witnesses and the answers of
// the traps; null when the checks fail.
function finish(S, partsAtoms, { union = false } = {}) {
  const dim = S.dim;
  const cls = union
    ? (() => {
      const cs = partsAtoms.map((a) => conjClass(a, dim));
      return { open: cs.every((c) => c.open), closed: cs.every((c) => c.closed), bounded: cs.every((c) => c.bounded) };
    })()
    : conjClass(partsAtoms[0], dim);
  const want = union && !cls.open && !cls.closed ? ['bdIn', 'bdOut'] : [...(cls.open ? [] : ['bdIn']), ...(cls.closed ? [] : ['bdOut'])];
  const w = witnesses(S, want);
  if (!w.interior && !w.bdIn) return null; // empty (or no grid point)
  if (!w.exterior && !w.bdOut) return null; // the whole space
  if (union && !cls.open && !cls.closed) {
    cls.open = !w.bdIn;
    cls.closed = !w.bdOut;
    if (cls.open || cls.closed) return null; // no witness: cannot tell
  }
  if (cls.open === !!w.bdIn) return null;
  if (cls.closed === !!w.bdOut) return null;
  if (cls.bounded === hasFarPoint(S)) return null;
  const all = partsAtoms.flat();
  const traps = {};
  // « not open, so closed »: closed read as the negation of open.
  if (!cls.open && !cls.closed) traps.a2_topo_not_open_closed = { ...cls, closed: true };
  // The always-true inequality counted (a mixture of large and strict).
  if (!union && all.some((a) => a.trivial)) {
    const t = conjClass(all, dim, { countTrivial: true });
    traps.a2_topo_trivial_atom = { ...cls, open: t.open, closed: t.closed };
  }
  // Bounded read on the variables that appear (a cylinder in ℝ³).
  if (!cls.bounded && dim === 3) {
    const t = union ? partsAtoms.every((a) => boundedBy(a, dim, true)) : boundedBy(all, dim, true);
    if (t) traps.a2_topo_cylinder = { ...cls, bounded: true };
  }
  return { S, dim, cls, w, traps, partsAtoms, union };
}

// A conjunction of one to three atoms (and a trivial one with probability pTriv).
function drawConj(rng, dim, pTriv = 0) {
  const atoms = [];
  const shape = rng.int(0, 5);
  if (shape <= 1) atoms.push(ballAtom(rng, dim, rng.chance(0.85)));
  else if (shape === 2) atoms.push(freeAtom(rng, dim));
  else if (shape === 3) {
    // An annulus: 1 < x² + y² ≤ 4.
    const k = rng.pick(['b2', 'b3', 'ell', 'b2'].filter((x) => BALLS[x].dims.includes(dim)));
    const B = BALLS[k];
    const cs = rng.shuffle(B.cs).slice(0, 2).sort((u, v) => u - v);
    atoms.push(atom(B.g, rng.pick(['>', '≥']), cs[0], { vars: B.vars, bounds: [], kind: k }), atom(B.g, rng.pick(['<', '≤']), cs[1], { vars: B.vars, bounds: B.vars, kind: k }));
  } else if (shape === 4) {
    atoms.push(ballAtom(rng, dim, true), dim === 2 && rng.chance(0.5) ? atom(rng.pick(['x', 'y']), '≠', 0, { vars: [], kind: 'neq' }) : freeAtom(rng, dim));
  } else atoms.push(ballAtom(rng, dim, true, ['b2', 'l1', 'linf', 'ell']));
  // In ℝ³, a variable that no atom uses: nothing (a cylinder), one side, or both.
  if (dim === 3) {
    const used = new Set(atoms.flatMap((a) => a.vars || []));
    const free = ['x', 'y', 'z'].filter((v) => !used.has(v));
    if (free.length === 1) {
      const v = free[0];
      const r = rng.int(0, 2);
      if (r === 1) atoms.push(varAtom(v, rng.pick(['>', '≥', '<', '≤']), rng.int(-1, 1)));
      if (r === 2) { const lo = rng.int(-2, 0); atoms.push(varAtom(v, rng.pick(['>', '≥']), lo), varAtom(v, rng.pick(['<', '≤']), lo + rng.int(1, 3))); }
    }
  }
  if (rng.chance(pTriv)) {
    const strictAll = atoms.every(isStrict);
    const largeAll = atoms.every((a) => !isStrict(a));
    const strict = strictAll ? false : largeAll ? true : rng.chance(0.5);
    atoms.splice(rng.int(0, atoms.length), 0, trivialAtom(rng, dim, strict));
  }
  return atoms;
}

const FALLBACK_SET = () => finish({ dim: 3, parts: [[atom('x^2+y^2', '≤', 1)]] }, [[atom('x^2+y^2', '≤', 1, { vars: ['x', 'y'], bounds: ['x', 'y'], kind: 'b2' })]]);

export function topoSet(rng, { dim = null, pTriv = 0, combine = null } = {}) {
  for (let i = 0; i < 200; i++) {
    const d = dim ?? rng.pick([2, 3, 3]);
    if (combine) {
      const A = drawConj(rng, d, 0);
      const B = drawConj(rng, d, 0);
      if (A.length + B.length > 4) continue;
      const S = combine === 'union' ? { dim: d, parts: [A, B] } : { dim: d, parts: [[...A, ...B]] };
      const r = finish(S, combine === 'union' ? [A, B] : [[...A, ...B]], { union: combine === 'union' });
      if (r) return { ...r, combine, A, B };
      continue;
    }
    const atoms = drawConj(rng, d, pTriv);
    const r = finish({ dim: d, parts: [atoms] }, [atoms]);
    if (r) return r;
  }
  return { ...FALLBACK_SET(), fallback: true };
}

// The set as HTML: E = {…}, or A, B and E = A ∩ B (A ∪ B).
export function topoHtml(T) {
  if (T.combine) {
    return `A = ${setML(T.dim, T.A)} et B = ${setML(T.dim, T.B)}, E = A ${T.combine === 'union' ? '∪' : '∩'} B`;
  }
  return `E = ${setML(T.dim, T.partsAtoms[0])}`;
}
const ocT = (c) => (c.open ? 'ouvert' : c.closed ? 'fermé' : 'ni ouvert ni fermé');
export const classT = (c) => (c.closed && c.bounded ? 'fermé, borné : compact' : `${ocT(c)}, ${c.bounded ? 'borné' : 'non borné'}`);
const ALL_CLASSES = [false, true].flatMap((b) => [{ open: true, closed: false }, { open: false, closed: true }, { open: false, closed: false }].map((c) => ({ ...c, bounded: b })));

// « E est … » as a sentence.
export function classSentence(c) {
  const oc = c.open ? 'E est ouvert' : c.closed ? 'E est fermé' : "E n'est ni ouvert ni fermé";
  if (c.closed && c.bounded) return 'E est fermé et borné : compact';
  return `${oc}, ${c.bounded ? 'borné' : 'non borné'} ; il n'est pas compact`;
}

// Why: the atoms, then the witnesses.
function topoWhy(T) {
  const c = T.cls;
  const out = [];
  const all = T.partsAtoms.flat();
  const triv = all.filter((a) => a.trivial);
  if (triv.length) out.push(`${MT(atomText(triv[0]), XYZ)} est toujours vraie : elle ne compte pas.`);
  const others = triv.length ? ' autres' : '';
  if (!T.union) {
    if (c.open) out.push(`Les${others} inégalités sont toutes strictes : E est ouvert.`);
    else if (c.closed) out.push(`Les${others} inégalités sont toutes larges : E est fermé.`);
    else out.push(`Il y a des inégalités larges et des inégalités strictes.`);
  } else out.push(c.open ? 'Réunion de deux ouverts : ouvert.' : c.closed ? 'Réunion de deux fermés : fermé.' : 'On cherche des points du bord.');
  if (T.w.bdIn && !c.open) out.push(`${ptT(T.w.bdIn)} est dans E et sur son bord : E n'est pas ouvert.`);
  if (T.w.bdOut && !c.closed) out.push(`${ptT(T.w.bdOut)} est sur le bord de E, mais pas dans E : E n'est pas fermé.`);
  out.push(c.bounded ? 'Chaque coordonnée est bornée : E est borné.' : `E n'est pas borné${T.dim === 3 && T.traps.a2_topo_cylinder ? " : une coordonnée n'apparaît dans aucune inégalité, elle est libre" : ''}.`);
  out.push(`Donc ${classSentence(c)}.`);
  return out.join(' ');
}

// Four options: the classification, the traps' answers, then others.
function classOptions(T, rng) {
  const right = classT(T.cls);
  const options = [{ html: right, correct: true }];
  for (const [rule, c] of Object.entries(T.traps)) {
    const html = classT(c);
    if (!options.some((o) => o.html === html)) options.push({ html, correct: false, rule });
  }
  for (const c of rng.shuffle(ALL_CLASSES)) {
    if (options.length >= 4) break;
    const html = classT(c);
    if (!options.some((o) => o.html === html)) options.push({ html, correct: false });
  }
  return options.slice(0, 4);
}

function topoMcq(level, rng, { exam = false, pTriv = 0.3, dim = null, explain = false } = {}) {
  const T = topoSet(rng, { pTriv, dim });
  let help = '';
  if (explain) {
    const lines = T.partsAtoms[0].map((a) => {
      if (a.trivial) return `${MT(atomText(a), XYZ)} : toujours vraie`;
      const b = (a.bounds || []).length ? ` ; elle borne ${a.bounds.join(' et ')}` : a.side ? ` ; elle borne ${a.g} ${a.side === 'lo' ? 'par en bas' : 'par en haut'}` : ' ; elle ne borne rien';
      return `${MT(atomText(a), XYZ)} : ${isStrict(a) ? 'stricte' : 'large'}${b}`;
    });
    help = `<br>${lines.join('<br>')}`;
  }
  return mcq({
    skill: TOPO, level, prompt: `${topoHtml(T)}.${help}<br>L'ensemble E est :`, options: classOptions(T, rng),
    key: `mcq:${sig(T)}`, solution: [{ html: topoWhy(T), note: '' }], expectedSec: 60,
    exam: exam ? { format: 'mcq', points: 1 } : false, fallback: !!T.fallback,
  }, rng);
}

// Level 2: two sets in a table (ouvert, fermé, borné, compact), then why
// one of them is not closed (or not open).
const V = (b) => (b ? 'V' : 'F');
// A MathML alttext taken out of its attribute is plain text again: the row
// labels of a table are shown as text, so « &lt; » would show as such.
const unescapeAlt = (t) => t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
function topoTable(level, rng) {
  const Ts = [topoSet(rng, { pTriv: 0 }), topoSet(rng, { pTriv: 0 })];
  if (JSON.stringify(Ts[0].S) === JSON.stringify(Ts[1].S)) Ts[1] = topoSet(rng, { pTriv: 0, dim: Ts[0].dim === 2 ? 3 : 2 });
  const rows = Ts.map((T, i) => ({ id: `e${i + 1}`, label: `E${i + 1 === 1 ? '₁' : '₂'}`, env: { O: T.cls.open, F: T.cls.closed, B: T.cls.bounded }, cells: [0, 1, 2, 3].map(() => ({ input: true, kind: 'tf' })) }));
  const answers = Object.fromEntries(rows.map((r) => [r.id, [r.env.O, r.env.F, r.env.B, r.env.F && r.env.B].map(V)]));
  // The « why » question on a set that is not closed, else not open.
  const k = Ts.findIndex((T) => !T.cls.closed);
  const j = k >= 0 ? k : Ts.findIndex((T) => !T.cls.open);
  const T = Ts[j];
  const name = j === 0 ? 'E₁' : 'E₂';
  const notClosed = !T.cls.closed;
  const then = mcq({
    skill: TOPO, level, prompt: `Pourquoi ${name} n'est-il pas ${notClosed ? 'fermé' : 'ouvert'} ?`,
    options: notClosed
      ? [{ html: `Le point ${ptT(T.w.bdOut)} est sur le bord de ${name}, mais pas dans ${name}.`, correct: true },
        { html: `Il ${T.cls.open ? 'est ouvert' : 'n\'est pas ouvert'}.`, correct: false, rule: 'a2_topo_not_open_closed' },
        { html: T.cls.bounded ? 'Il est borné.' : 'Il n\'est pas borné.', correct: false },
        { html: T.w.bdIn ? `Le point ${ptT(T.w.bdIn)} est sur le bord et dans ${name}.` : `Le point ${ptT(T.w.interior || T.w.exterior)} n'est pas sur le bord.`, correct: false }]
      : [{ html: `Le point ${ptT(T.w.bdIn)} est dans ${name} et sur son bord : aucune boule autour de lui ne reste dans ${name}.`, correct: true },
        { html: 'Il est fermé.', correct: false, rule: 'a2_topo_not_open_closed' },
        { html: T.cls.bounded ? 'Il est borné.' : 'Il n\'est pas borné.', correct: false },
        { html: `Le point ${ptT(T.w.interior || T.w.exterior)} n'est pas sur le bord.`, correct: false }],
    key: `why:${sig(T)}`, solution: [{ html: topoWhy(T), note: '' }],
  }, rng);
  return tableItem({
    skill: TOPO, level,
    prompt: `${Ts.map((t, i) => topoHtml(t).replace(/^E/, i ? 'E₂' : 'E₁').replace(/E = A/, `E${i ? '₂' : '₁'} = A`)).join('.<br>')}.<br>Remplis le tableau : V (vrai) ou F (faux).`,
    table: { cols: ['ouvert', 'fermé', 'borné', 'compact'], rows }, phi: { kind: 'truth', letters: ['O', 'F', 'B'], columns: ['O', 'F', 'B', 'F ∧ B'] },
    answers, then,
    hints: H('Inégalités toutes larges : fermé. Toutes strictes : ouvert. Un mélange : ni l\'un ni l\'autre. Compact = fermé et borné.',
      `${name} : ${notClosed ? `le point ${ptT(T.w.bdOut)} du bord manque` : `le point ${ptT(T.w.bdIn)} du bord est dans ${name}`}.`,
      Ts.map((t, i) => `E${i ? '₂' : '₁'} : ${classT(t.cls)}`).join(' ; ')),
    solution: Ts.map((t, i) => ({ html: `E${i ? '₂' : '₁'} : ${topoWhy(t)}`, note: '' })),
    baits: ['a2_topo_not_open_closed'],
    key: Ts.map(sig).join('|'), expectedSec: 120, fallback: Ts.some((t) => t.fallback),
  });
}

// Level 3: each inequality classified (large, strict, always true), then E.
function topoAtoms(level, rng) {
  const T = topoSet(rng, { pTriv: 0.6 });
  const atoms = T.partsAtoms[0];
  const rows = atoms.map((a, i) => ({ id: `a${i}`, label: readable(atomText(a)), env: { L: !isStrict(a), S: isStrict(a), T: !!a.trivial }, cells: [0, 1, 2].map(() => ({ input: true, kind: 'tf' })) }));
  const answers = Object.fromEntries(rows.map((r) => [r.id, [r.env.L, r.env.S, r.env.T].map(V)]));
  const then = mcq({
    skill: TOPO, level, prompt: `${topoHtml(T)}. L'ensemble E est :`, options: classOptions(T, rng),
    key: `then:${sig(T)}`, solution: [{ html: topoWhy(T), note: '' }],
  }, rng);
  return tableItem({
    skill: TOPO, level, prompt: `${topoHtml(T)}.<br>Pour chaque inégalité : est-elle large, stricte, toujours vraie ? (V ou F)`,
    table: { cols: ['large', 'stricte', 'toujours vraie'], rows }, phi: { kind: 'truth', letters: ['L', 'S', 'T'], columns: ['L', 'S', 'T'] },
    answers, then,
    hints: H('≤ et ≥ sont larges ; <, > et ≠ sont strictes. Une inégalité vraie pour tous les points n\'enlève rien.',
      atoms.some((a) => a.trivial) ? `Regarde ${MT(atomText(atoms.find((a) => a.trivial)), XYZ)} : un carré est ≥ 0.` : 'Aucune inégalité n\'est toujours vraie ici.',
      rows.map((r) => `${r.label} : ${answers[r.id].join(' ')}`).join(' ; ')),
    solution: [{ html: topoWhy(T), note: '' }],
    baits: Object.keys(T.traps),
    key: `atoms:${sig(T)}`, expectedSec: 100, fallback: !!T.fallback,
  });
}

// Level 4 and exam tf: « E est fermé / ouvert / compact », with a point of
// the boundary as counter-example.
function topoTf(level, rng, { exam = false } = {}) {
  const combine = level >= 4 && !exam ? rng.pick(['inter', 'union', null]) : rng.pick([null, null, 'inter']);
  const T = topoSet(rng, { pTriv: 0.3, combine });
  const c = T.cls;
  let what = rng.pick(['fermé', 'ouvert', 'compact']);
  if (what === 'compact' && c.closed && !c.bounded) what = 'fermé';
  const truth = what === 'fermé' ? c.closed : what === 'ouvert' ? c.open : c.closed && c.bounded;
  const want = what === 'ouvert' ? 'in' : 'out';
  const w = want === 'in' ? T.w.bdIn : T.w.bdOut;
  const counter = truth ? null : {
    kind: 'a2', prop: 'topoPoint', params: { set: T.S, want },
    ask: [{ v: 'p', label: want === 'in' ? 'Un point de E sur le bord de E :' : 'Un point du bord de E qui n\'est pas dans E :', keys: ['calc', 'geo'] }],
    answer: { p: ptAns(w) },
  };
  return tfItem({
    skill: TOPO, level, statement: `${topoHtml(T)}. L'ensemble E est ${what}.`, truth, counter,
    ruleIfTrue: !truth && what === 'fermé' && !c.open ? 'a2_topo_not_open_closed' : null,
    hints: H(want === 'in' ? 'E n\'est pas ouvert s\'il contient un point de son bord.' : 'E n\'est pas fermé s\'il lui manque un point de son bord.',
      w ? `Regarde le point ${ptT(w)}.` : `Classe chaque inégalité : large ou stricte.`,
      `E est ${classT(c)}.`),
    explanation: `${truth ? 'Vrai' : 'Faux'}. ${topoWhy(T)}`,
    exam: exam ? { format: 'tf', points: 1 } : false, key: `${what}:${sig(T)}`, fallback: !!T.fallback,
  });
}

// Statements of the course (exam tf).
function topoTheory(rng) {
  const exam = { format: 'tf', points: 1 };
  const kind = rng.pick(['inter', 'union', 'notOpen', 'trivial', 'hb', 'rn', 'norms']);
  if (kind === 'notOpen') {
    return tfItem({
      skill: TOPO, level: 4, statement: 'Une partie de ℝⁿ qui n\'est pas ouverte est fermée.', truth: false, exam, key: kind,
      counter: { kind: 'a2', prop: 'bdReal', params: { test: 'neither' }, ask: [{ v: 'E', label: 'Dans ℝ : E =', keys: ['calc', 'set'] }], answer: { E: '[0 ; 1[' } },
      ruleIfTrue: 'a2_topo_not_open_closed',
      explanation: 'Faux : [0 ; 1[ n\'est ni ouvert (0 est dans E et sur son bord) ni fermé (1 est sur le bord et manque).',
    });
  }
  if (kind === 'trivial') {
    const a = rng.int(2, 6) * 5;
    const b = rng.int(2, 5) * 5;
    const k = rng.int(2, 20);
    return tfItem({
      skill: TOPO, level: 4, exam, key: `${kind}:${a}:${b}:${k}`, truth: true,
      statement: `Pour a < −${k}, l'ensemble ${MT(`{1 ≥ -${a}x^2-${b}y^2 > a}`, { vars: ['x', 'y', 'a'] })} ⊂ ℝ² est ouvert.`,
      ruleIfFalse: 'a2_topo_trivial_atom',
      explanation: `Vrai : 1 ≥ −${a}x² − ${b}y² est toujours vraie, elle n'enlève aucun point. Il reste ${a}x² + ${b}y² < −a, une inégalité stricte : l'intérieur d'une ellipse, ouvert.`,
    });
  }
  const T = {
    inter: ['L\'intersection de deux fermés de ℝⁿ est fermée.', 'Vrai : le complémentaire est la réunion de deux ouverts, qui est ouverte.'],
    union: ['La réunion de deux ouverts de ℝⁿ est ouverte.', 'Vrai : un point de la réunion est dans l\'un des deux, avec une boule autour de lui.'],
    hb: ['Une partie fermée et bornée de ℝⁿ est compacte.', 'Vrai : c\'est la définition du cours (ou le théorème de Heine-Borel).'],
    rn: ['ℝⁿ est à la fois ouvert et fermé.', 'Vrai : ℝⁿ et ∅ sont les seules parties à la fois ouvertes et fermées.'],
    norms: ['Une partie de ℝ² ouverte pour la norme ‖·‖₁ est ouverte pour la norme ‖·‖₂.', 'Vrai : en dimension finie, toutes les normes donnent les mêmes ouverts (‖v‖₂ ≤ ‖v‖₁ ≤ √2·‖v‖₂).'],
  }[kind];
  return tfItem({ skill: TOPO, level: 4, statement: T[0], truth: true, exam, key: kind, explanation: T[1] });
}

function topoProblem(level, rng, exam) {
  const parts = [0, 1, 2, 3].map((i) => {
    const it = topoMcq(level, rng, { pTriv: i === 3 ? 0.8 : 0.3, dim: i % 2 ? 3 : 2 });
    return { item: { ...it, prompt: it.prompt }, points: 1, title: `Ensemble ${i + 1}` };
  });
  return problemItem({
    skill: TOPO, level, prompt: 'Pour chacun des quatre ensembles, choisis ce qu\'il est.', parts,
    key: parts.map((p) => p.item.key).join('|'), exam: exam ? { format: 'open', points: 4 } : false, expectedSec: 360,
  });
}

export function topologyItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return topoMcq(4, rng, { exam: true, pTriv: 0.35 });
  if (opts.exam === 'tf') return rng.chance(0.6) ? topoTf(4, rng, { exam: true }) : topoTheory(rng);
  if (level === 1) return topoMcq(1, rng, { pTriv: 0, explain: true });
  if (level === 2) return topoTable(2, rng);
  if (level === 3) return topoAtoms(3, rng);
  if (level === 4) return topoTf(4, rng);
  return topoProblem(5, rng, false);
}

// ======================================================================
// a2-rn-boundary
// ======================================================================

const G = 'x^2+y^2';
const SQ = (r) => r * r;
const XY = { vars: ['x', 'y'] };
const ann = (lo, loOp, hi, hiOp) => [...(lo ? [atom(G, loOp, SQ(lo))] : []), atom(G, hiOp, SQ(hi))];
const circle = (r) => [atom(G, '=', SQ(r))];
const pointP = (p) => [atom('x', '=', p[0]), atom('y', '=', p[1])];

// E = a main piece (annulus or disk) and one or two extras (a point, a
// circle) that do not touch it. Each piece: {kind, atoms, r…, html}.
function drawBd(rng, { isolated = 0.6 } = {}) {
  const lo = rng.pick([0, 1, 1, 2]);
  const hi = lo + rng.int(1, 4 - lo);
  const loOp = rng.pick(['>', '≥']);
  const hiOp = rng.pick(['<', '≤']);
  const main = { kind: lo ? 'annulus' : 'disk', lo, hi, loOp, hiOp, atoms: ann(lo, loOp, hi, hiOp) };
  const extras = [];
  if (rng.chance(isolated)) {
    if (lo && rng.chance(0.3)) extras.push({ kind: 'point', p: [0, 0], atoms: pointP([0, 0]) });
    else {
      const a = hi + rng.int(1, 2);
      const p = rng.pick([[a, 0], [-a, 0], [0, a], [0, -a]]);
      extras.push({ kind: 'point', p, atoms: pointP(p) });
    }
  }
  if (!extras.length || rng.chance(0.3)) {
    if (lo >= 2 && rng.chance(0.5)) extras.push({ kind: 'circle', r: 1, atoms: circle(1) });
    else if (hi <= 3 && !extras.some((e) => e.kind === 'point' && Math.hypot(...e.p) === hi + 2)) {
      const r = hi + 2;
      if (!extras.some((e) => e.kind === 'point' && Math.hypot(...e.p) === r)) extras.push({ kind: 'circle', r, atoms: circle(r) });
    }
  }
  const pieces = [main, ...extras];
  const S = { dim: 2, parts: pieces.map((p) => p.atoms) };
  return { S, main, extras, pieces };
}
const pieceML = (p) => {
  if (p.kind === 'point') return `{${ptT(p.p)}}`;
  if (p.kind === 'circle') return `{${MT(`x^2+y^2 = ${SQ(p.r)}`, XY)}}`;
  if (p.kind === 'disk') return `{${MT(`x^2+y^2 ${p.hiOp} ${SQ(p.hi)}`, XY)}}`;
  return `{${MT(`${SQ(p.lo)} ${p.loOp === '>' ? '<' : '≤'} x^2+y^2 ${p.hiOp} ${SQ(p.hi)}`, XY)}}`;
};
const bsig = (B) => B.S.parts.map((p) => p.map((a) => `${a.g}${a.op}${a.c}`).join(',')).join('|');
const bdHtml = (B) => `E = ${B.pieces.map(pieceML).join(' ∪ ')} ⊂ ℝ²`;

// Pieces as words (the boundary is a list of them).
const circT = (r) => `le cercle ${MT(`x^2+y^2 = ${SQ(r)}`, XY)}`;
const pointT = (p) => `le point ${ptT(p)}`;
function bdPieces(B) {
  const out = [];
  if (B.main.lo) out.push({ id: `c${B.main.lo}`, html: circT(B.main.lo), kind: 'circle' });
  out.push({ id: `c${B.main.hi}`, html: circT(B.main.hi), kind: 'circle' });
  for (const e of B.extras) out.push(e.kind === 'point' ? { id: `p${ptT(e.p)}`, html: pointT(e.p), kind: 'point', p: e.p } : { id: `c${e.r}`, html: circT(e.r), kind: 'circle' });
  return out;
}
const interiorT = (B) => (B.main.lo ? `l'anneau ouvert ${MT(`${SQ(B.main.lo)} < x^2+y^2 < ${SQ(B.main.hi)}`, XY)}` : `le disque ouvert ${MT(`x^2+y^2 < ${SQ(B.main.hi)}`, XY)}`);
const joinT = (xs) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} et ${xs.at(-1)}`);
function bdWhy(B) {
  const pcs = bdPieces(B);
  const iso = B.extras.filter((e) => e.kind === 'point');
  return `∂E est formé ${joinT(pcs.map((p) => p.html.replace(/^le /, 'du ')))}.${iso.length ? ` ${pointT(iso[0].p).replace(/^le/, 'Le')} est isolé : toute boule autour de lui contient ce point (dans E) et des points hors de E, il est dans le bord.` : ''} int E est ${interiorT(B)} ; adh E = E ∪ ∂E.`;
}

// Level 1: which pieces are in ∂E (a column of V/F).
function bdPiecesTable(level, rng) {
  const B = drawBd(rng);
  const pcs = bdPieces(B).map((p) => ({ ...p, in: true }));
  const decoys = [];
  const mid = B.main.lo ? SQ(B.main.lo) + 1 : 0;
  if (B.main.lo && mid < SQ(B.main.hi)) decoys.push({ html: `le cercle ${MT(`x^2+y^2 = ${mid}`, XY)}`, in: false });
  decoys.push({ html: interiorT(B), in: false });
  if (!B.main.lo) decoys.push({ html: 'l\'origine (0 ; 0)', in: false });
  else if (!B.extras.some((e) => e.kind === 'point' && e.p[0] === 0 && e.p[1] === 0) && !B.extras.some((e) => e.kind === 'circle' && e.r === 1)) decoys.push({ html: 'l\'origine (0 ; 0)', in: false });
  const all = rng.shuffle([...pcs, ...decoys.slice(0, 2)]);
  const strip = (h) => unescapeAlt(h.replace(/<math[^>]*alttext="([^"]*)"[\s\S]*?<\/math>/g, '$1'));
  const rows = all.map((p, i) => ({ id: `r${i}`, label: strip(p.html), env: { B: p.in }, cells: [{ input: true, kind: 'tf' }] }));
  const answers = Object.fromEntries(rows.map((r) => [r.id, [V(r.env.B)]]));
  return tableItem({
    skill: BD, level, prompt: `${bdHtml(B)}.<br>Chaque morceau est-il dans le bord ∂E ? (V ou F)`,
    table: { cols: ['dans ∂E'], rows }, phi: { kind: 'truth', letters: ['B'], columns: ['B'] }, answers,
    hints: H('Un point est dans ∂E si chaque boule autour de lui touche E et le complémentaire de E.',
      'Les cercles qui limitent l\'anneau (ou le disque) sont dans le bord, qu\'ils soient dans E ou non. Un point isolé aussi.',
      `∂E : ${joinT(pcs.map((p) => strip(p.html)))}.`),
    solution: [{ html: bdWhy(B), note: '' }],
    baits: B.extras.some((e) => e.kind === 'point') ? ['a2_bd_isolated'] : [],
    key: `pieces:${bsig(B)}`, expectedSec: 90,
  });
}

// Level 2: ∂E among four unions of pieces.
function bdMcq(level, rng) {
  const B = drawBd(rng, { isolated: 0.8 });
  const pcs = bdPieces(B);
  const U = (ps) => ps.map((p) => p.html).join(' ∪ ');
  const options = [{ html: U(pcs), correct: true }];
  const add = (html, rule = null) => { if (html && !options.some((o) => o.html === html)) options.push({ html, correct: false, rule }); };
  if (pcs.some((p) => p.kind === 'point')) add(U(pcs.filter((p) => p.kind !== 'point')), 'a2_bd_isolated');
  // Only the circles that are in E.
  const inE = pcs.filter((p) => p.kind === 'point' || (p.id === `c${B.main.lo}` ? B.main.loOp === '≥' : p.id === `c${B.main.hi}` ? B.main.hiOp === '≤' : true));
  if (inE.length) add(U(inE));
  add(U([...pcs, { html: interiorT(B) }]));
  add(U(pcs.filter((p) => p.id !== `c${B.main.hi}`)));
  add(U(pcs.filter((p) => p.id !== `c${B.main.lo}` && p.kind !== 'point')));
  add(U([{ html: interiorT(B) }]));
  return mcq({
    skill: BD, level, prompt: `${bdHtml(B)}. Que vaut le bord ∂E ?`, options: options.slice(0, 4),
    key: `bd:${bsig(B)}`, solution: [{ html: bdWhy(B), note: '' }], expectedSec: 60,
  }, rng);
}

// Points to classify, with their kind (pointKind).
const CAND = [[0, 0], [1, 0], [0, 1], [-1, 0], [1, 1], [0, 2], [2, 0], [-2, 0], [2, 1], [0, -3], [3, 0], [2, 2], [0, 4], [-4, 0], [1, 2], [0, 1.5], [1.5, 0], [0, 5], [5, 0], [0, 6], [0.5, 0], [-3, 0], [0, -2]];
function bdPoints(B, rng, n = 4) {
  const kinds = {};
  for (const p of rng.shuffle(CAND)) (kinds[pointKind(B.S, p)] ||= []).push(p);
  for (const e of B.extras) if (e.kind === 'point') kinds.bdIn = [e.p, ...(kinds.bdIn || []).filter((q) => q[0] !== e.p[0] || q[1] !== e.p[1])];
  const out = [];
  for (const k of rng.shuffle(['interior', 'bdIn', 'bdOut', 'exterior'])) if (kinds[k]?.length && out.length < n) out.push({ p: kinds[k][0], k });
  for (const k of ['bdIn', 'bdOut', 'interior', 'exterior']) for (const p of kinds[k] || []) if (out.length < n && !out.some((o) => o.p === p)) out.push({ p, k });
  return rng.shuffle(out);
}
const KIND_T = { interior: 'intérieur', bdIn: 'sur le bord, dans E', bdOut: 'sur le bord, hors de E', exterior: 'extérieur' };

// Level 3: four points, each interior, on ∂E in E, on ∂E out of E, exterior.
function bdPointTable(level, rng) {
  const B = drawBd(rng);
  const pts = bdPoints(B, rng);
  const ks = ['interior', 'bdIn', 'bdOut', 'exterior'];
  const rows = pts.map((o, i) => ({ id: `p${i}`, label: ptT(o.p), env: Object.fromEntries(['I', 'P', 'Q', 'X'].map((L, j) => [L, o.k === ks[j]])), cells: ks.map(() => ({ input: true, kind: 'tf' })) }));
  const answers = Object.fromEntries(rows.map((r) => [r.id, ['I', 'P', 'Q', 'X'].map((L) => V(r.env[L]))]));
  return tableItem({
    skill: BD, level, prompt: `${bdHtml(B)}.<br>Pour chaque point, une seule case est V : intérieur, sur le bord et dans E, sur le bord et hors de E, ou extérieur.`,
    table: { cols: ['intérieur', 'bord, dans E', 'bord, hors de E', 'extérieur'], rows }, phi: { kind: 'truth', letters: ['I', 'P', 'Q', 'X'], columns: ['I', 'P', 'Q', 'X'] }, answers,
    hints: H('Calcule x² + y² pour chaque point et compare aux inégalités. Sur un cercle qui limite E, le point est au bord.',
      'Un point isolé de E est sur le bord, et dans E.',
      pts.map((o) => `${ptT(o.p)} : ${KIND_T[o.k]}`).join(' ; ')),
    solution: [{ html: pts.map((o) => `${ptT(o.p)} : ${KIND_T[o.k]}`).join(' ; '), note: '' }, { html: bdWhy(B), note: '' }],
    baits: B.extras.some((e) => e.kind === 'point') ? ['a2_bd_isolated'] : [],
    key: `points:${bsig(B)}:${pts.map((o) => ptT(o.p)).join()}`, expectedSec: 100,
  });
}

// Level 4: for each piece, is it in ∂E, in int E, in adh E?
function bdThreeTable(level, rng) {
  const B = drawBd(rng, { isolated: 0.7 });
  const strip = (h) => unescapeAlt(h.replace(/<math[^>]*alttext="([^"]*)"[\s\S]*?<\/math>/g, '$1'));
  const items = bdPieces(B).map((p) => ({ label: strip(p.html), d: true, i: false, a: true }));
  items.push({ label: strip(interiorT(B)), d: false, i: true, a: true });
  const mid = B.main.lo ? SQ(B.main.lo) + 1 : Math.max(1, SQ(B.main.hi) - 1);
  if (mid < SQ(B.main.hi)) items.push({ label: `le cercle x² + y² = ${mid}`, d: false, i: true, a: true });
  const far = SQ(Math.max(B.main.hi, ...B.extras.map((e) => (e.kind === 'circle' ? e.r : Math.hypot(...e.p)))) + 1);
  items.push({ label: `le cercle x² + y² = ${far}`, d: false, i: false, a: false });
  const chosen = rng.shuffle(items).slice(0, 5);
  const rows = chosen.map((o, i) => ({ id: `m${i}`, label: o.label, env: { D: o.d, I: o.i, A: o.a }, cells: [0, 1, 2].map(() => ({ input: true, kind: 'tf' })) }));
  const answers = Object.fromEntries(rows.map((r) => [r.id, [r.env.D, r.env.I, r.env.A].map(V)]));
  return tableItem({
    skill: BD, level, prompt: `${bdHtml(B)}.<br>Chaque morceau est-il contenu dans ∂E, dans int E, dans adh E ? (V ou F)`,
    table: { cols: ['dans ∂E', 'dans int E', 'dans adh E'], rows }, phi: { kind: 'truth', letters: ['D', 'I', 'A'], columns: ['D', 'I', 'A'] }, answers,
    hints: H('int E = E sans son bord ; adh E = E avec son bord.',
      `∂E : ${joinT(bdPieces(B).map((p) => strip(p.html)))}.`,
      rows.map((r) => `${r.label} : ${answers[r.id].join(' ')}`).join(' ; ')),
    solution: [{ html: bdWhy(B), note: '' }],
    baits: B.extras.some((e) => e.kind === 'point') ? ['a2_bd_isolated'] : [],
    key: `three:${bsig(B)}`, expectedSec: 120,
  });
}

// True or false on the operations (counter-examples in ℝ, js/judges/a2-examples-a.js bdReal).
const SET_KEYS = ['calc', 'set'];
const askOf = (names) => names.map((v) => ({ v, label: v === 'p' ? 'p =' : `${v} =`, keys: v === 'p' ? ['calc'] : SET_KEYS }));
const BD_TF = [
  { id: 'incl', s: 'Si E ⊂ F, alors ∂E ⊂ ∂F.', truth: false, test: 'incl', answer: { E: ']0 ; 1[', F: ']-1 ; 2[', p: '0' }, why: 'Faux : E = ]0 ; 1[ ⊂ F = ]−1 ; 2[, 0 ∈ ∂E mais 0 ∉ ∂F (0 est intérieur à F).' },
  { id: 'union', s: 'on a ∂(A ∪ B) = ∂A ∪ ∂B.', truth: false, test: 'union', answer: { A: '[0 ; 1]', B: '[1 ; 2]', p: '1' }, rule: 'a2_bd_union', why: 'Faux : A = [0 ; 1], B = [1 ; 2] ; 1 ∈ ∂A, mais 1 est intérieur à A ∪ B = [0 ; 2]. Seule l\'inclusion ∂(A ∪ B) ⊂ ∂A ∪ ∂B est vraie.' },
  { id: 'inter', s: 'on a ∂(A ∩ B) = ∂A ∩ ∂B.', truth: false, test: 'inter', answer: { A: '[0 ; 2]', B: '[1 ; 3]', p: '1' }, why: 'Faux : A ∩ B = [1 ; 2], donc 1 ∈ ∂(A ∩ B), mais 1 ∉ ∂A.' },
  { id: 'inside', s: 'on a ∂E ⊂ E.', truth: false, test: 'inside', answer: { E: ']0 ; 1[', p: '0' }, why: 'Faux : 0 est dans le bord de ]0 ; 1[, pas dans ]0 ; 1[. C\'est vrai seulement si E est fermé.' },
  { id: 'intUnion', s: 'on a int(A ∪ B) = int A ∪ int B.', truth: false, test: 'intUnion', answer: { A: '[0 ; 1]', B: '[1 ; 2]', p: '1' }, why: 'Faux : 1 est intérieur à A ∪ B = [0 ; 2], mais ni à A = [0 ; 1] ni à B = [1 ; 2].' },
  { id: 'closed', s: 'le bord ∂E est fermé.', truth: true, why: 'Vrai : ∂E = adh E ∖ int E, l\'intersection du fermé adh E et du fermé complémentaire de int E.' },
  { id: 'compl', s: 'E et son complémentaire ℝⁿ ∖ E ont le même bord.', truth: true, why: 'Vrai : la définition (chaque boule touche E et son complémentaire) est symétrique.' },
  { id: 'adh', s: 'on a adh E = E ∪ ∂E et int E = E ∖ ∂E.', truth: true, why: 'Vrai : ce sont les définitions du cours.' },
  { id: 'fermé', s: 'Si E est fermé, alors ∂E ⊂ E.', truth: true, why: 'Vrai : E fermé ⇔ E = adh E = E ∪ ∂E.' },
  { id: 'ouvert', s: 'Si E est ouvert, alors E ∩ ∂E = ∅.', truth: true, why: 'Vrai : chaque point de E a une boule dans E, il n\'est pas au bord.' },
  { id: 'sub', s: 'on a ∂(A ∪ B) ⊂ ∂A ∪ ∂B.', truth: true, why: 'Vrai : un point qui n\'est au bord ni de A ni de B est intérieur ou extérieur à chacun, donc intérieur ou extérieur à A ∪ B.' },
];
// « Pour toutes parties A, B de ℝⁿ », with the letters of the statement.
function forAll(text) {
  const ls = [...new Set(text.match(/(?<![A-Za-zÀ-ÿ])[ABEF](?![A-Za-zÀ-ÿ])/g) || ['E'])].sort();
  return ls.length === 1 ? `Pour toute partie ${ls[0]} de ℝⁿ` : `Pour toutes parties ${ls.join(', ')} de ℝⁿ`;
}
function bdTf(level, rng, { exam = false, pick = null, noHints = false } = {}) {
  const T = pick || rng.pick(BD_TF);
  const counter = T.truth ? null : { kind: 'a2', prop: 'bdReal', params: { test: T.test }, ask: askOf(Object.keys(T.answer)), answer: T.answer };
  return tfItem({
    skill: BD, level, statement: `${forAll(T.s)} : ${/^[A-Z][a-zé]/.test(T.s) ? T.s.charAt(0).toLowerCase() : T.s.charAt(0)}${T.s.slice(1)}`, truth: T.truth, counter,
    prompt: T.truth ? undefined : 'Vrai ou faux ? Si c\'est faux, donne un contre-exemple dans ℝ (n = 1) : des intervalles, et le point p qui pose problème.',
    ruleIfTrue: T.rule || null,
    hints: H('Essaie avec des intervalles de ℝ qui se touchent, ou un intervalle ouvert.', T.truth ? 'Pense à la définition : chaque boule touche E et son complémentaire.' : `Essaie ${Object.entries(T.answer).filter(([k]) => k !== 'p').map(([k, v]) => `${k} = ${v.replace(/-/g, '−')}`).join(', ')}.`, T.why),
    noHints: noHints || level === 5,
    explanation: T.why, exam: exam ? { format: 'tf', points: 1 } : false, key: T.id,
  });
}

// Exam mcq: which point is in ∂E?
function bdPointMcq(level, rng, exam) {
  for (let i = 0; i < 50; i++) {
    const B = drawBd(rng);
    const kinds = {};
    for (const p of rng.shuffle(CAND)) (kinds[pointKind(B.S, p)] ||= []).push(p);
    const bd = [...(kinds.bdIn || []), ...(kinds.bdOut || [])];
    const other = [...(kinds.interior || []), ...(kinds.exterior || [])];
    if (!bd.length || other.length < 3) continue;
    const right = rng.pick(bd);
    const options = [{ html: ptT(right), correct: true }, ...other.slice(0, 3).map((p) => ({ html: ptT(p), correct: false }))];
    return mcq({
      skill: BD, level, prompt: `${bdHtml(B)}. Lequel de ces points est dans le bord ∂E ?`, options,
      key: `pt:${bsig(B)}:${ptT(right)}`, solution: [{ html: `${ptT(right)} : ${KIND_T[pointKind(B.S, right)]}. ${bdWhy(B)}`, note: '' }],
      exam: exam ? { format: 'mcq', points: 1 } : false, expectedSec: 60,
    }, rng);
  }
  return bdMcq(level, rng);
}

function bdProblem(level, rng) {
  const falses = rng.shuffle(BD_TF.filter((t) => !t.truth));
  const trues = rng.shuffle(BD_TF.filter((t) => t.truth));
  const picks = rng.shuffle([falses[0], falses[1], trues[0]]);
  const parts = picks.map((T, i) => ({ item: bdTf(5, rng, { pick: T, noHints: true }), points: 1, title: `Énoncé ${i + 1}` }));
  return problemItem({ skill: BD, level, prompt: 'Trois énoncés sur le bord : vrai ou faux ? Donne un contre-exemple dans ℝ quand c\'est faux.', parts, key: picks.map((t) => t.id).join('+'), expectedSec: 300 });
}

export function boundaryItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return bdTf(4, rng, { exam: true });
  if (opts.exam === 'mcq') return bdPointMcq(4, rng, true);
  if (level === 1) return bdPiecesTable(1, rng);
  if (level === 2) return bdMcq(2, rng);
  if (level === 3) return bdPointTable(3, rng);
  if (level === 4) return rng.chance(0.75) ? bdThreeTable(4, rng) : bdTf(4, rng);
  return bdProblem(5, rng);
}
