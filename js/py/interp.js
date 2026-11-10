// A tree-walking interpreter of the Python subset (spec §12, step U9). No
// eval, no Function: the AST of js/py/parser.js is walked by hand.
//   new Interp({maxSteps, maxDepth}).run(src, {lineOffset}) executes a
//   module in the interpreter's globals; .evalSource(expr) evaluates one
//   expression there. Errors are PyError (message in French, line).
// Limits: maxSteps elementary operations (statements, operators, calls,
// subscripts; default 200 000), call depth 100, lists of 10 000 elements.
// Functions see the globals and their own locals (a name assigned in a
// function is local to it, as in Python); no closure modifies an outer
// variable.

import { PyError } from './lexer.js';
import { parseProgram, parseExpr } from './parser.js';
import {
  binop, unop, compare, truthy, getIndex, setIndex, getSlice, iterate, rangeLen, tuple, isTuple,
  makeBuiltins, mathModule, listMethod, typeName, repr, MAX_LIST,
} from './builtins.js';

export const LIMIT_MESSAGE = 'Le programme ne s\'arrête pas (boucle infinie ?)';

// Signals of control flow, returned by exec().
const BREAK = { sig: 'break' };
const CONTINUE = { sig: 'continue' };

// The names a function assigns (its locals).
function localNames(body, out = new Set()) {
  const target = (t) => {
    if (t.k === 'name') out.add(t.id);
    else if (t.k === 'tuple' || t.k === 'list') t.items.forEach(target);
  };
  for (const s of body) {
    switch (s.k) {
      case 'assign': s.targets.forEach(target); break;
      case 'aug': target(s.target); break;
      case 'for': target(s.target); localNames(s.body, out); break;
      case 'while': localNames(s.body, out); break;
      case 'if': s.branches.forEach(([, b]) => localNames(b, out)); if (s.orelse) localNames(s.orelse, out); break;
      case 'def': out.add(s.name); break;
      case 'import': out.add(s.alias || s.name); break;
      default: break;
    }
  }
  return out;
}

export class Interp {
  constructor({ maxSteps = 200000, maxDepth = 100 } = {}) {
    this.maxSteps = maxSteps;
    this.maxDepth = maxDepth;
    this.steps = 0;
    this.depth = 0;
    this.output = [];
    this.globals = new Map();
    this.builtins = makeBuiltins(this);
    this.modules = { math: mathModule() };
  }

  tick(n = 1) {
    this.steps += n;
    if (this.steps > this.maxSteps) throw new PyError(LIMIT_MESSAGE, this.line ?? null, 'limit');
  }

  // Runs a program (a module) in the globals.
  run(src, { lineOffset = 0 } = {}) {
    const body = parseProgram(src, { lineOffset });
    this.execBlock(body, null);
    return this;
  }

  evalSource(src) {
    const e = parseExpr(src);
    return this.eval(e, null);
  }

  get(name) { return this.globals.get(name); }
  set(name, v) { this.globals.set(name, v); }

  // ---------- statements ----------

  execBlock(body, scope) {
    for (const s of body) {
      const r = this.exec(s, scope);
      if (r) return r;
    }
    return null;
  }

  exec(s, scope) {
    this.line = s.line;
    this.tick();
    try {
      switch (s.k) {
        case 'expr': this.eval(s.e, scope); return null;
        case 'assign': {
          const v = this.eval(s.value, scope);
          for (const t of s.targets) this.assign(t, v, scope);
          return null;
        }
        case 'aug': {
          const cur = this.eval(s.target, scope);
          const v = this.eval(s.value, scope);
          this.line = s.line;
          let res;
          // a += [x] extends the list in place, as Python does.
          if (s.op === '+' && Array.isArray(cur) && !isTuple(cur) && Array.isArray(v)) {
            if (cur.length + v.length > MAX_LIST) throw new PyError('liste trop longue');
            cur.push(...v);
            res = cur;
          } else res = binop(s.op, cur, v);
          this.assign(s.target, res, scope);
          return null;
        }
        case 'if': {
          for (const [cond, body] of s.branches) {
            if (truthy(this.eval(cond, scope))) return this.execBlock(body, scope);
          }
          return s.orelse ? this.execBlock(s.orelse, scope) : null;
        }
        case 'while': {
          while (truthy(this.eval(s.cond, scope))) {
            this.line = s.line;
            this.tick();
            const r = this.execBlock(s.body, scope);
            if (r === BREAK) break;
            if (r && r !== CONTINUE) return r;
          }
          return null;
        }
        case 'for': {
          const it = this.eval(s.iter, scope);
          if (it && it.k === 'range') {
            const n = rangeLen(it);
            let x = it.start;
            for (let i = 0; i < n; i++, x += it.step) {
              this.line = s.line;
              this.tick();
              this.assign(s.target, x, scope);
              const r = this.execBlock(s.body, scope);
              if (r === BREAK) break;
              if (r && r !== CONTINUE) return r;
            }
            return null;
          }
          if (Array.isArray(it)) {
            // Python walks the live list.
            for (let i = 0; i < it.length; i++) {
              this.line = s.line;
              this.tick();
              this.assign(s.target, it[i], scope);
              const r = this.execBlock(s.body, scope);
              if (r === BREAK) break;
              if (r && r !== CONTINUE) return r;
            }
            return null;
          }
          for (const x of iterate(it)) {
            this.tick();
            this.assign(s.target, x, scope);
            const r = this.execBlock(s.body, scope);
            if (r === BREAK) break;
            if (r && r !== CONTINUE) return r;
          }
          return null;
        }
        case 'def': {
          const fn = { k: 'func', name: s.name, params: s.params.map((p) => ({ name: p.name, dflt: p.dflt ? this.eval(p.dflt, scope) : undefined })), body: s.body, locals: localNames(s.body, new Set(s.params.map((p) => p.name))), line: s.line };
          this.store(s.name, fn, scope);
          return null;
        }
        case 'return': return { sig: 'return', value: s.e ? this.eval(s.e, scope) : null };
        case 'break': return BREAK;
        case 'continue': return CONTINUE;
        case 'pass': return null;
        case 'import': {
          const m = this.modules[s.name];
          if (!m) throw new PyError(s.name === 'numpy' ? 'numpy n\'est pas disponible : les matrices sont des listes de listes, et les fonctions utiles (zeros, matvec…) sont données' : `seul le module math est disponible (pas « ${s.name} »)`);
          this.store(s.alias || s.name, m, scope);
          return null;
        }
        case 'from': {
          const m = this.modules[s.module];
          if (!m) throw new PyError(s.module === 'numpy' ? 'numpy n\'est pas disponible : les matrices sont des listes de listes' : `seul le module math est disponible (pas « ${s.module} »)`);
          const names = s.names[0] === '*' ? Object.keys(m.attrs) : s.names;
          for (const n of names) {
            if (!(n in m.attrs)) throw new PyError(`math n'a pas de fonction « ${n} »`);
            this.store(n, m.attrs[n], scope);
          }
          return null;
        }
        default: throw new PyError(`instruction inconnue ${s.k}`);
      }
    } catch (e) {
      throw this.located(e, s.line);
    }
  }

  located(e, line) {
    if (e instanceof PyError) {
      if (!e.line) e.line = line;
      return e;
    }
    if (e instanceof RangeError) return new PyError('trop d\'appels imbriqués (récursion sans fin ?)', line, 'limit');
    return e;
  }

  store(name, v, scope) {
    if (scope) scope.vars.set(name, v);
    else this.globals.set(name, v);
  }

  assign(t, v, scope) {
    switch (t.k) {
      case 'name': this.store(t.id, v, scope); return;
      case 'index': {
        const seq = this.eval(t.e, scope);
        const i = this.eval(t.i, scope);
        this.tick();
        setIndex(seq, i, v);
        return;
      }
      case 'tuple': case 'list': {
        const items = Array.isArray(v) ? v : (v && v.k === 'range') || typeof v === 'string' ? iterate(v) : null;
        if (!items) throw new PyError(`on ne peut pas répartir un ${typeName(v)} dans ${t.items.length} variables`);
        if (items.length !== t.items.length) throw new PyError(`${t.items.length} variables à gauche, mais ${items.length} valeurs à droite`);
        const vals = items.slice();
        t.items.forEach((x, k) => this.assign(x, vals[k], scope));
        return;
      }
      case 'attr': throw new PyError('on ne peut pas modifier un attribut ici');
      default: throw new PyError('affectation impossible');
    }
  }

  // ---------- expressions ----------

  lookup(name, scope) {
    if (scope) {
      if (scope.vars.has(name)) return scope.vars.get(name);
      if (scope.fn.locals.has(name)) throw new PyError(`la variable ${name} est utilisée avant d'avoir reçu une valeur`);
    }
    if (this.globals.has(name)) return this.globals.get(name);
    if (name in this.builtins) return this.builtins[name];
    if (name === 'math') throw new PyError('nom inconnu : math (as-tu écrit « import math » ?)');
    if (['sqrt', 'exp', 'log', 'sin', 'cos', 'tan', 'pi'].includes(name)) throw new PyError(`nom inconnu : ${name} (écris math.${name})`);
    if (name === 'true' || name === 'false') throw new PyError(`nom inconnu : ${name} (en Python : ${name === 'true' ? 'True' : 'False'})`);
    throw new PyError(`nom inconnu : ${name}`);
  }

  eval(e, scope) {
    switch (e.k) {
      case 'num': return 'int' in e.v ? e.v.int : e.v.float;
      case 'str': return e.v;
      case 'const': return e.v;
      case 'name': return this.lookup(e.id, scope);
      case 'list': {
        this.tick();
        return e.items.map((x) => this.eval(x, scope));
      }
      case 'tuple': return tuple(e.items.map((x) => this.eval(x, scope)));
      case 'bin': {
        const l = this.eval(e.l, scope);
        const r = this.eval(e.r, scope);
        this.tick();
        try { return binop(e.op, l, r); } catch (err) { throw this.located(err, e.line); }
      }
      case 'unary': {
        const v = this.eval(e.e, scope);
        this.tick();
        try { return unop(e.op, v); } catch (err) { throw this.located(err, e.line); }
      }
      case 'not': return !truthy(this.eval(e.e, scope));
      case 'bool': {
        const l = this.eval(e.l, scope);
        this.tick();
        if (e.op === 'and') return truthy(l) ? this.eval(e.r, scope) : l;
        return truthy(l) ? l : this.eval(e.r, scope);
      }
      case 'cmp': {
        let left = this.eval(e.items[0], scope);
        for (let i = 0; i < e.ops.length; i++) {
          const right = this.eval(e.items[i + 1], scope);
          this.tick();
          let ok;
          try { ok = compare(e.ops[i], left, right); } catch (err) { throw this.located(err, e.line); }
          if (!ok) return false;
          left = right;
        }
        return true;
      }
      case 'ifexp': return truthy(this.eval(e.cond, scope)) ? this.eval(e.a, scope) : this.eval(e.b, scope);
      case 'index': {
        const seq = this.eval(e.e, scope);
        const i = this.eval(e.i, scope);
        this.tick();
        try { return getIndex(seq, i); } catch (err) { throw this.located(err, e.line); }
      }
      case 'slice': {
        const seq = this.eval(e.e, scope);
        const lo = e.lo ? this.eval(e.lo, scope) : null;
        const hi = e.hi ? this.eval(e.hi, scope) : null;
        const st = e.step ? this.eval(e.step, scope) : null;
        this.tick();
        try { return getSlice(seq, lo, hi, st); } catch (err) { throw this.located(err, e.line); }
      }
      case 'attr': {
        const obj = this.eval(e.e, scope);
        if (obj && obj.k === 'module') {
          if (!(e.name in obj.attrs)) throw new PyError(`${obj.name} n'a pas de fonction « ${e.name} »`, e.line);
          return obj.attrs[e.name];
        }
        if (Array.isArray(obj)) {
          try { return { ...listMethod(obj, e.name), k: 'builtin' }; } catch (err) { throw this.located(err, e.line); }
        }
        if (obj === null) throw new PyError(`None n'a pas d'attribut « ${e.name} » : une fonction a-t-elle oublié son return ?`, e.line);
        throw new PyError(`un ${typeName(obj)} n'a pas d'attribut « ${e.name} »`, e.line);
      }
      case 'call': {
        const f = this.eval(e.f, scope);
        const args = e.args.map((a) => this.eval(a, scope));
        this.tick();
        return this.call(f, args, e.line, e.f);
      }
      default: throw new PyError(`expression inconnue ${e.k}`, e.line);
    }
  }

  call(f, args, line, fnode) {
    if (!f || (f.k !== 'func' && f.k !== 'builtin')) {
      const name = fnode?.k === 'name' ? fnode.id : null;
      throw new PyError(`${name ? `${name} est un ${typeName(f)}, pas une fonction` : `un ${typeName(f)} n'est pas une fonction`} : on ne peut pas l'appeler avec (…)${Array.isArray(f) ? ' (pour une case, écris [i])' : ''}`, line);
    }
    if (f.k === 'builtin') {
      const prev = this.line;
      try { return f.fn(args, this); } catch (err) { throw this.located(err, line); } finally { this.line = prev; }
    }
    // A user function.
    const ps = f.params;
    if (args.length > ps.length || args.length < ps.filter((p) => p.dflt === undefined).length) {
      const need = ps.filter((p) => p.dflt === undefined).length;
      const want = need === ps.length ? `${ps.length}` : `de ${need} à ${ps.length}`;
      throw new PyError(`${f.name}() demande ${want} argument${ps.length > 1 ? 's' : ''}, ${args.length} donné${args.length > 1 ? 's' : ''}`, line);
    }
    if (this.depth >= this.maxDepth) throw new PyError('trop d\'appels imbriqués (récursion sans fin ?)', line, 'limit');
    const scope = { fn: f, vars: new Map() };
    ps.forEach((p, i) => scope.vars.set(p.name, i < args.length ? args[i] : p.dflt));
    this.depth++;
    const prev = this.line;
    try {
      const r = this.execBlock(f.body, scope);
      return r && r.sig === 'return' ? r.value : null;
    } finally {
      this.depth--;
      this.line = prev;
    }
  }
}

// Runs a program; never throws. → {ok, interp, output, error: {message, line, kind, text}}
export function runProgram(src, { maxSteps, prelude } = {}) {
  const it = new Interp({ maxSteps });
  try {
    if (prelude) it.run(prelude);
    it.run(src);
    return { ok: true, interp: it, output: it.output, error: null };
  } catch (e) {
    return { ok: false, interp: it, output: it.output, error: errorOf(e) };
  }
}

export function errorOf(e) {
  if (e instanceof PyError) return { message: e.message, line: e.line, kind: e.kind, text: e.text };
  if (e instanceof RangeError) return { message: 'trop d\'appels imbriqués (récursion sans fin ?)', line: null, kind: 'limit', text: 'trop d\'appels imbriqués (récursion sans fin ?)' };
  return { message: String(e?.message || e), line: null, kind: 'error', text: String(e?.message || e) };
}

export { repr };
