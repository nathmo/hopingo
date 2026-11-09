// Logic formulas built from tokens (spec §4.3, §16.2, step U1): ∀ ∃ ¬ ⇒ ⇔
// ∧ ∨, brackets, and pieces given by the item (« x ∈ ℝ », « ε > 0 »,
// « |uₙ − L| < ε », « n est pair »). A piece is an atom of the formula, or,
// right after ∀ or ∃, the bound variable with its restriction.
//
//   lexicon(cfg)                cfg = {pieces: [{text, neg?}], letters: ['P', 'Q']}
//   parseFormula(text, lex)     → formula (throws LogicError with a French message)
//   formulaText(f, lex)         → text that parses back; formulaML(f, lex) → MathML
//   nnf(f)                      negations pushed down to the atoms
//   equivalentLogic(f, g)       same truth table, quantifier prefixes compared
//                               without expanding the restrictions (§16.2)
//   finalIssue(f, lex)          null, or what is left: a ¬ before a quantifier
//                               or a connective, or an atom to negate by the table
//
// Formula nodes:
//   {t:'atom', key, neg}        key: the positive form, without spaces; neg: negated
//   {t:'not', e}  {t:'and'|'or'|'imp'|'iff', l, r}  {t:'q', q:'∀'|'∃', bind:{key, text}, body}
// Negation table of the atoms (G-gymnase-1, conventions): < ↔ ≥, ≤ ↔ >,
// = ↔ ≠, ∈ ↔ ∉, ⊂ ↔ ⊄; any other pair is declared by the piece (neg).

import { tryParse } from './parse.js';
import { toMathML } from './mathml.js';

export class LogicError extends Error {}

const OPS = ['∀', '∃', '¬', '⇒', '⇔', '∧', '∨', '(', ')', ','];
const NEG_OP = { '<': '≥', '≥': '<', '≤': '>', '>': '≤', '=': '≠', '≠': '=', '∈': '∉', '∉': '∈', '⊂': '⊄', '⊄': '⊂' };
const POSITIVE = new Set(['<', '≤', '=', '∈', '⊂']);
// The wrong table of g9_neg_strict: < ↦ >, ≤ ↦ ≥.
const STRICT_OP = { '<': '>', '≤': '≥', '>': '<', '≥': '≤' };

export const norm = (s) => String(s).replace(/\s+/g, '').replace(/[−–]/g, '-');

// The relation symbol of a piece (outside brackets), with its position.
function relOf(text) {
  let depth = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '(') depth++;
    else if (c === ')') depth--;
    else if (depth === 0 && NEG_OP[c]) return { op: c, i };
  }
  return null;
}

const swapOp = (text, table = NEG_OP) => {
  const r = relOf(text);
  if (!r || !table[r.op]) return null;
  return text.slice(0, r.i) + table[r.op] + text.slice(r.i + 1);
};

// Lexicon: atoms by key, and the texts a student may tap.
export function lexicon(cfg = {}) {
  const atoms = new Map(); // key → {pos, neg (text) | null, table}
  const texts = new Map(); // norm(text) → {text, key, neg}
  const add = (pos, negText, table) => {
    const key = norm(pos);
    if (!atoms.has(key)) atoms.set(key, { pos, neg: negText, table });
    texts.set(norm(pos), { text: pos, key, neg: false });
    if (negText) texts.set(norm(negText), { text: negText, key, neg: true });
    return key;
  };
  for (const l of cfg.letters || []) add(l, null, false);
  for (const p of cfg.pieces || []) {
    const text = typeof p === 'string' ? p : p.text;
    if (p.neg) { add(text, p.neg, true); continue; }
    const r = relOf(text);
    if (r) {
      const other = swapOp(text);
      if (POSITIVE.has(r.op)) add(text, other, true); else add(other, text, true);
    } else add(text, null, false);
  }
  return { atoms, texts, cfg };
}

// Adds an atom found by a transformation (a wrong negation) to the lexicon.
export function atomFromText(text, lex) {
  const hit = lex.texts.get(norm(text));
  if (hit) return { t: 'atom', key: hit.key, neg: hit.neg };
  const r = relOf(text);
  if (!r) return null;
  const pos = POSITIVE.has(r.op) ? text : swapOp(text);
  const key = norm(pos);
  if (!lex.atoms.has(key)) {
    lex.atoms.set(key, { pos, neg: POSITIVE.has(r.op) ? swapOp(text) : text, table: true });
    lex.texts.set(norm(pos), { text: pos, key, neg: false });
    lex.texts.set(norm(lex.atoms.get(key).neg), { text: lex.atoms.get(key).neg, key, neg: true });
  }
  return { t: 'atom', key, neg: !POSITIVE.has(r.op) };
}

// ---------- reading ----------

function lex1(text, lexicon) {
  const s = norm(text);
  const pieces = [...lexicon.texts.keys()].sort((a, b) => b.length - a.length);
  const out = [];
  let i = 0;
  while (i < s.length) {
    const piece = pieces.find((p) => s.startsWith(p, i));
    if (piece) { out.push({ k: 'piece', s: piece, ...lexicon.texts.get(piece) }); i += piece.length; continue; }
    const c = s[i];
    if (OPS.includes(c)) { out.push({ k: 'op', s: c }); i++; continue; }
    if (c === '=' && s[i + 1] === '>') { out.push({ k: 'op', s: '⇒' }); i += 2; continue; }
    throw new LogicError(`Je ne reconnais pas « ${s.slice(i, i + 6)} » : utilise les morceaux proposés.`);
  }
  return out;
}

export function parseFormula(text, lex) {
  const toks = lex1(text, lex);
  let p = 0;
  const peek = () => toks[p];
  const isOp = (s) => peek()?.k === 'op' && peek().s === s;
  const fail = (m) => { throw new LogicError(m); };
  if (!toks.length) fail('Rien à lire.');

  function formula() {
    const l = imp();
    if (isOp('⇔')) { p++; return { t: 'iff', l, r: imp() }; }
    return l;
  }
  function imp() {
    const l = or();
    if (isOp('⇒')) { p++; return { t: 'imp', l, r: imp() }; }
    return l;
  }
  function or() {
    let n = and();
    while (isOp('∨')) { p++; n = { t: 'or', l: n, r: and() }; }
    return n;
  }
  function and() {
    let n = unary();
    while (isOp('∧')) { p++; n = { t: 'and', l: n, r: unary() }; }
    return n;
  }
  function unary() {
    const t = peek();
    if (!t) fail('La formule est incomplète.');
    if (isOp('¬')) { p++; return { t: 'not', e: unary() }; }
    if (isOp('∀') || isOp('∃')) {
      p++;
      const b = peek();
      if (!b || b.k !== 'piece') fail(`Après ${t.s}, il faut la variable, par exemple « x ∈ ℝ ».`);
      p++;
      const bind = { key: norm(b.text), text: b.text };
      if (isOp(',')) { p++; return { t: 'q', q: t.s, bind, body: formula() }; }
      if (isOp('∀') || isOp('∃')) return { t: 'q', q: t.s, bind, body: unary() };
      if (!peek()) fail('Il manque ce que dit l\'énoncé après les quantificateurs.');
      return { t: 'q', q: t.s, bind, body: formula() };
    }
    if (isOp('(')) {
      p++;
      const e = formula();
      if (!isOp(')')) fail('Une parenthèse n\'est pas fermée.');
      p++;
      return { t: 'paren', e };
    }
    if (t.k === 'piece') { p++; return { t: 'atom', key: t.key, neg: t.neg }; }
    if (isOp(')')) fail('Il y a une parenthèse fermante de trop.');
    return fail(`Il manque quelque chose avant « ${t.s} ».`);
  }
  const f = formula();
  if (p < toks.length) fail(`Je ne m'attendais pas à « ${toks[p].s} ».`);
  return f;
}

export function tryFormula(text, lex) {
  try { return parseFormula(text, lex); } catch { return null; }
}

// ---------- writing ----------

const PREC = { iff: 1, imp: 2, or: 3, and: 4, not: 5, q: 0, atom: 6, paren: 6 };
const SYM = { and: '∧', or: '∨', imp: '⇒', iff: '⇔' };
export const strip = (f) => (f.t === 'paren' ? strip(f.e) : f);

export function atomText(f, lex) {
  const a = lex.atoms.get(f.key) ?? { pos: f.key, neg: null };
  if (!f.neg) return a.pos;
  return a.neg ?? `¬${a.pos}`;
}

// Generic printer: piece(text) and op(symbol) give the output pieces.
function printer(f, lex, { piece, op, join, group }) {
  const P = (n, ctx = 0) => {
    if (n.t === 'paren') return P(n.e, ctx);
    switch (n.t) {
      case 'atom': return piece(atomText(n, lex));
      case 'not': {
        const e = strip(n.e);
        const bare = (e.t === 'atom' && !/[\s<>=≤≥≠∈∉⊂⊄]/.test(atomText(e, lex))) || e.t === 'not';
        return join([op('¬'), bare ? P(e) : group(P(e))]);
      }
      case 'q': {
        const parts = [];
        let m = n;
        while (m.t === 'q') { parts.push(op(m.q), piece(m.bind.text)); m = strip(m.body); }
        const out = join([...parts, op(','), P(m)], ' ');
        return ctx > 0 ? group(out) : out;
      }
      default: {
        const me = PREC[n.t];
        const right = n.t === 'imp' || n.t === 'iff';
        const l = strip(n.l);
        const r = strip(n.r);
        const lp = PREC[l.t];
        const rp = PREC[r.t];
        // ∧ inside ∨ (or the reverse) keeps its brackets, as in the course.
        const mixed = (x) => (n.t === 'and' || n.t === 'or') && (x.t === 'and' || x.t === 'or') && x.t !== n.t;
        const L = lp < me || (right && lp === me) || l.t === 'q' || mixed(l) ? group(P(l)) : P(l, 1);
        const R = (rp < me && r.t !== 'q') || mixed(r) || (!right && rp === me) ? group(P(r)) : P(r);
        return join([L, op(SYM[n.t]), R], ' ');
      }
    }
  };
  return P(f);
}

export function formulaText(f, lex) {
  return printer(f, lex, {
    piece: (t) => t,
    op: (s) => s,
    group: (s) => `(${s})`,
    join: (xs, sep = '') => xs.join(sep).replace(/ ,/g, ',').replace(/([∀∃¬]) /g, '$1'),
  });
}

// The MathML of a piece: as mathematics if the core can read it, else text.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export function pieceML(text) {
  const n = /[a-zA-Z]{3,}/.test(text.replace(/sin|cos|tan|exp|ln|Log/g, '')) ? null : tryParse(text);
  if (n) return toMathML(n).replace(/^<math[^>]*>/, '').replace(/<\/math>$/, '');
  return `<mtext>${esc(text)}</mtext>`;
}

export function formulaML(f, lex, { display = false } = {}) {
  const body = printer(f, lex, {
    piece: (t) => pieceML(t),
    op: (s) => (s === ',' ? '<mo separator="true">,</mo><mspace width="0.3em"/>' : `<mo>${s}</mo>`),
    group: (s) => `<mrow><mo stretchy="false">(</mo>${s}<mo stretchy="false">)</mo></mrow>`,
    join: (xs) => `<mrow>${xs.join('')}</mrow>`,
  });
  const alt = esc(formulaText(f, lex)).replace(/"/g, '&quot;');
  return `<math alttext="${alt}"${display ? ' display="block"' : ''}>${body}</math>`;
}

// ---------- normal forms ----------

// Negations pushed to the atoms. full: also ⇒ and ⇔ rewritten with ∧ ∨ ¬.
export function nnf(f, negate = false, { full = false, atomNeg = null } = {}) {
  const N = (g, ng) => nnf(g, ng, { full, atomNeg });
  switch (f.t) {
    case 'paren': return N(f.e, negate);
    case 'atom': return negate ? (atomNeg ? atomNeg(f) : { ...f, neg: !f.neg }) : f;
    case 'not': return N(f.e, !negate);
    case 'and': case 'or': {
      const op = negate ? (f.t === 'and' ? 'or' : 'and') : f.t;
      return { t: op, l: N(f.l, negate), r: N(f.r, negate) };
    }
    case 'imp':
      if (negate) return { t: 'and', l: N(f.l, false), r: N(f.r, true) };
      return full ? { t: 'or', l: N(f.l, true), r: N(f.r, false) } : { t: 'imp', l: N(f.l, false), r: N(f.r, false) };
    case 'iff':
      if (negate) return { t: 'or', l: { t: 'and', l: N(f.l, false), r: N(f.r, true) }, r: { t: 'and', l: N(f.l, true), r: N(f.r, false) } };
      return full ? { t: 'and', l: { t: 'or', l: N(f.l, true), r: N(f.r, false) }, r: { t: 'or', l: N(f.l, false), r: N(f.r, true) } } : { t: 'iff', l: N(f.l), r: N(f.r) };
    case 'q': return { t: 'q', q: negate ? (f.q === '∀' ? '∃' : '∀') : f.q, bind: f.bind, body: N(f.body, negate) };
    default: throw new LogicError(`formule inconnue ${f.t}`);
  }
}

// Atoms of a quantifier-free formula; quantified parts are opaque atoms.
function atomsOf(f, out = new Map()) {
  switch (f.t) {
    case 'atom': out.set(f.key, f.key); break;
    case 'q': { const k = qKey(f); out.set(k, k); break; }
    case 'paren': atomsOf(f.e, out); break;
    case 'not': atomsOf(f.e, out); break;
    default: atomsOf(f.l, out); atomsOf(f.r, out);
  }
  return out;
}

function evalF(f, env) {
  switch (f.t) {
    case 'atom': return env[f.key] !== f.neg;
    case 'q': return env[qKey(f)];
    case 'paren': return evalF(f.e, env);
    case 'not': return !evalF(f.e, env);
    case 'and': return evalF(f.l, env) && evalF(f.r, env);
    case 'or': return evalF(f.l, env) || evalF(f.r, env);
    case 'imp': return !evalF(f.l, env) || evalF(f.r, env);
    case 'iff': return evalF(f.l, env) === evalF(f.r, env);
    default: return false;
  }
}

// The truth table of a formula as a string, over the given atoms.
function table(f, keys) {
  let s = '';
  const n = keys.length;
  for (let m = 0; m < 1 << n; m++) {
    const env = {};
    keys.forEach((k, i) => { env[k] = !!(m & (1 << i)); });
    s += evalF(f, env) ? '1' : '0';
  }
  return s;
}

// Canonical key of a quantified formula: the block of same quantifiers
// (binds sorted), then the body's truth table over its own atoms.
function qKey(f) {
  const binds = [];
  let m = f;
  while (m.t === 'q' && m.q === f.q) { binds.push(m.bind.key); m = m.body.t === 'paren' ? strip(m.body) : m.body; }
  const body = m;
  const keys = [...atomsOf(body).keys()].sort();
  return `${f.q}[${binds.sort().join('|')}]{${keys.join('|')}:${table(body, keys)}}`;
}

// Same meaning: negations pushed in, quantifier blocks compared as sets of
// binds, the quantifier-free parts by truth table.
export function equivalentLogic(f, g) {
  const F = nnf(f, false, { full: true });
  const G = nnf(g, false, { full: true });
  const keys = [...new Set([...atomsOf(F).keys(), ...atomsOf(G).keys()])].sort();
  if (keys.length > 14) return false;
  return table(F, keys) === table(G, keys);
}

// Is the formula a tautology (true for every value of its atoms)?
export function isTautology(f) {
  const F = nnf(f, false, { full: true });
  const keys = [...atomsOf(F).keys()].sort();
  return !table(F, keys).includes('0');
}
export function isContradiction(f) {
  const F = nnf(f, false, { full: true });
  const keys = [...atomsOf(F).keys()].sort();
  return !table(F, keys).includes('1');
}

// Truth value of a formula for given atom values {key: bool}.
export const truthOf = (f, env) => evalF(f, env);

// What is left before the final form (§5.2 `logic`): null if none.
// {kind:'go'} : a ¬ still before a quantifier or a connective (go on);
// {kind:'atom', message} : ¬ before an atom that the table negates.
export function finalIssue(f, lex) {
  let issue = null;
  const visit = (n) => {
    if (issue) return;
    switch (n.t) {
      case 'paren': visit(n.e); break;
      case 'not': {
        const e = strip(n.e);
        if (e.t === 'atom') {
          const a = lex.atoms.get(e.key);
          if (a?.table) issue = { kind: 'atom', message: `Écris « ${atomText({ ...e, neg: !e.neg }, lex)} » plutôt que la négation de « ${atomText(e, lex)} ».` };
        } else issue = { kind: 'go' };
        break;
      }
      case 'q': visit(n.body); break;
      case 'atom': break;
      default: visit(n.l); visit(n.r);
    }
  };
  visit(f);
  return issue;
}

// Size: atoms, connectives and negations (for « the shortest form »).
export function size(f) {
  switch (f.t) {
    case 'paren': return size(f.e);
    case 'atom': return 1;
    case 'not': return 1 + size(f.e);
    case 'q': return 1 + size(f.body);
    default: return 1 + size(f.l) + size(f.r);
  }
}

export const sameFormula = (f, g, lex) => norm(formulaText(f, lex)) === norm(formulaText(g, lex));

// ---------- paths, for the traps and the action menus ----------

export function walkF(f, fn, path = []) {
  if (fn(f, path) === false) return;
  const kids = f.t === 'atom' ? [] : f.t === 'not' || f.t === 'paren' ? [['e', f.e]] : f.t === 'q' ? [['body', f.body]] : [['l', f.l], ['r', f.r]];
  for (const [k, c] of kids) walkF(c, fn, [...path, k]);
}
export const getF = (f, path) => path.reduce((n, k) => n[k], f);
export function replaceF(f, path, repl) {
  if (!path.length) return repl;
  const [k, ...rest] = path;
  return { ...f, [k]: replaceF(f[k], rest, repl) };
}

// The atom negated with the wrong table (g9_neg_strict), or null.
export function strictNeg(a, lex) {
  const text = atomText(a, lex);
  const wrong = swapOp(text, STRICT_OP);
  return wrong ? atomFromText(wrong, lex) : null;
}

// The bind with its restriction negated (g9_neg_restriction): ε > 0 → ε ≤ 0.
export function negBind(bind) {
  if (!/[<>≤≥]/.test(bind.text)) return null;
  const t = swapOp(bind.text);
  return t ? { key: norm(t), text: t } : null;
}

// The lexicon of a judge configuration {pieces, letters}, made once.
const LEX_CACHE = new WeakMap();
export function lexFor(cfg) {
  if (!LEX_CACHE.has(cfg)) LEX_CACHE.set(cfg, lexicon(cfg));
  return LEX_CACHE.get(cfg);
}
