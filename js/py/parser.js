// Parser of the Python subset (spec §12, step U9): tokens → a small AST.
// Every node has `line`. Statements:
//   {k:'expr', e}  {k:'assign', targets: [t…], value}  {k:'aug', target, op, value}
//   {k:'if', branches: [[cond, body]…], orelse}  {k:'while', cond, body}
//   {k:'for', target, iter, body}  {k:'def', name, params: [{name, dflt?}], body}
//   {k:'return', e?}  {k:'break'}  {k:'continue'}  {k:'pass'}
//   {k:'import', name}  {k:'from', module, names: ['*'] | [names]}
// Expressions:
//   {k:'num', v: {int} | {float}}  {k:'str', v}  {k:'const', v: true|false|null}
//   {k:'name', id}  {k:'list', items}  {k:'tuple', items}
//   {k:'bin', op, l, r}  {k:'unary', op: '-'|'+', e}  {k:'not', e}
//   {k:'bool', op: 'and'|'or', l, r}  {k:'cmp', ops: [op…], items: [e…]}
//   {k:'call', f, args}  {k:'index', e, i}  {k:'slice', e, lo, hi, step}
//   {k:'attr', e, name}  {k:'ifexp', cond, a, b}
// A target is a name, an index, an attribute, or a tuple of targets.

import { tokenize, PyError } from './lexer.js';
import { t as tr } from '../i18n.js';

const REFUSED = {
  lambda: tr('« lambda » n\'est pas accepté : écris une fonction avec def.'),
  class: tr('les classes ne sont pas acceptées ici.'),
  try: tr('« try » n\'est pas accepté ici.'),
  except: tr('« except » n\'est pas accepté ici.'),
  with: tr('« with » n\'est pas accepté ici.'),
  yield: tr('« yield » n\'est pas accepté ici.'),
  global: tr('« global » n\'est pas accepté : passe la valeur en argument et renvoie-la.'),
  nonlocal: tr('« nonlocal » n\'est pas accepté : passe la valeur en argument et renvoie-la.'),
  del: tr('« del » n\'est pas accepté ici.'),
  assert: tr('« assert » n\'est pas accepté ici.'),
};

export function parseProgram(src, { lineOffset = 0 } = {}) {
  const toks = tokenize(src);
  if (lineOffset) for (const t of toks) t.line += lineOffset;
  let p = 0;
  const peek = (k = 0) => toks[p + k];
  const at = (t, v) => peek().t === t && (v === undefined || peek().v === v);
  const isOp = (v) => at('op', v);
  const isKw = (v) => at('kw', v);
  const err = (msg, tok = peek()) => new PyError(tr('erreur de syntaxe : {msg}', { msg }), tok.line, 'syntax');
  const show = (tok) => (tok.t === 'newline' ? tr('fin de ligne') : tok.t === 'eof' ? tr('fin du programme') : tok.t === 'indent' ? tr('indentation') : tok.t === 'dedent' ? tr('fin de bloc') : tok.t === 'num' ? tr('nombre') : `« ${tok.v} »`);
  const expectOp = (v) => {
    if (!isOp(v)) throw err(tr('« {v} » attendu, trouvé {found}', { v, found: show(peek()) }));
    return toks[p++];
  };
  const next = () => toks[p++];

  function program() {
    const body = [];
    while (!at('eof')) {
      if (at('newline')) { p++; continue; }
      if (at('indent')) throw new PyError(tr('indentation inattendue'), peek().line, 'syntax');
      body.push(...statement());
    }
    return body;
  }

  function block() {
    // After « : » : either a simple statement on the same line, or an
    // indented block.
    if (!at('newline')) return simpleLine();
    p++;
    if (!at('indent')) throw new PyError(tr('indentation : un bloc indenté est attendu après « : »'), peek().line, 'syntax');
    p++;
    const body = [];
    while (!at('dedent') && !at('eof')) {
      if (at('newline')) { p++; continue; }
      body.push(...statement());
    }
    if (at('dedent')) p++;
    return body;
  }

  function statement() {
    const tok = peek();
    if (tok.t === 'kw') {
      if (REFUSED[tok.v]) throw new PyError(REFUSED[tok.v], tok.line, 'syntax');
      if (tok.v === 'def') return [defStmt()];
      if (tok.v === 'if') return [ifStmt()];
      if (tok.v === 'while') {
        p++;
        const cond = expr();
        expectOp(':');
        return [{ k: 'while', cond, body: block(), line: tok.line }];
      }
      if (tok.v === 'for') {
        p++;
        const target = targetList();
        if (!isKw('in')) throw err(tr('« in » attendu dans « for … in … »'));
        p++;
        const iter = exprList();
        expectOp(':');
        return [{ k: 'for', target, iter, body: block(), line: tok.line }];
      }
      if (tok.v === 'elif' || tok.v === 'else') throw err(tr('« {v} » sans « if » au-dessus (vérifie l\'indentation)', { v: tok.v }));
    }
    return simpleLine();
  }

  // Simple statements, separated by « ; », up to the end of the line.
  function simpleLine() {
    const out = [simple()];
    while (isOp(';')) { p++; if (at('newline')) break; out.push(simple()); }
    if (!at('newline') && !at('eof')) throw err(tr('fin de ligne attendue, trouvé {found}', { found: show(peek()) }));
    if (at('newline')) p++;
    return out;
  }

  function simple() {
    const tok = peek();
    if (tok.t === 'kw') {
      if (REFUSED[tok.v]) throw new PyError(REFUSED[tok.v], tok.line, 'syntax');
      switch (tok.v) {
        case 'return': {
          p++;
          if (at('newline') || isOp(';') || at('eof')) return { k: 'return', e: null, line: tok.line };
          return { k: 'return', e: exprList(), line: tok.line };
        }
        case 'break': p++; return { k: 'break', line: tok.line };
        case 'continue': p++; return { k: 'continue', line: tok.line };
        case 'pass': p++; return { k: 'pass', line: tok.line };
        case 'import': {
          p++;
          const name = next();
          if (name.t !== 'name') throw err(tr('nom de module attendu'));
          let mod = name.v;
          while (isOp('.')) { p++; mod += `.${next().v}`; }
          let alias = null;
          if (isKw('as')) { p++; alias = next().v; }
          return { k: 'import', name: mod, alias, line: tok.line };
        }
        case 'from': {
          p++;
          const name = next();
          if (name.t !== 'name') throw err(tr('nom de module attendu'));
          if (!isKw('import')) throw err(tr('« import » attendu'));
          p++;
          if (isOp('*')) { p++; return { k: 'from', module: name.v, names: ['*'], line: tok.line }; }
          const names = [next().v];
          while (isOp(',')) { p++; names.push(next().v); }
          return { k: 'from', module: name.v, names, line: tok.line };
        }
        default: break;
      }
    }
    // Expression, assignment, augmented assignment.
    const first = exprList();
    if (isOp('=')) {
      const targets = [first];
      let value = null;
      while (isOp('=')) {
        p++;
        value = exprList();
        if (isOp('=')) targets.push(value);
      }
      for (const t of targets) checkTarget(t);
      return { k: 'assign', targets, value, line: tok.line };
    }
    const aug = ['+=', '-=', '*=', '/=', '//=', '%=', '**='].find((o) => isOp(o));
    if (aug) {
      p++;
      checkTarget(first);
      if (first.k === 'tuple') throw err(tr('une affectation « {aug} » ne prend qu\'une seule variable', { aug }), tok);
      return { k: 'aug', target: first, op: aug.slice(0, -1), value: exprList(), line: tok.line };
    }
    if (isOp('==') === false && at('op') && peek().v === ':') throw err(tr('« : » inattendu'));
    return { k: 'expr', e: first, line: tok.line };
  }

  function checkTarget(t) {
    if (t.k === 'name' || t.k === 'index' || t.k === 'attr') return;
    if ((t.k === 'tuple' || t.k === 'list') && t.items.length) { t.items.forEach(checkTarget); return; }
    if (t.k === 'call') throw new PyError(tr('on ne peut pas affecter une valeur à un appel de fonction (« = » au lieu de « == » ?)'), t.line, 'syntax');
    throw new PyError(tr('erreur de syntaxe : on ne peut affecter une valeur qu\'à une variable, une case de liste ou plusieurs variables'), t.line, 'syntax');
  }

  function defStmt() {
    const tok = next();
    const name = next();
    if (name.t !== 'name') throw err(tr('nom de fonction attendu après « def »'), name);
    expectOp('(');
    const params = [];
    while (!isOp(')')) {
      const pn = next();
      if (pn.t !== 'name') throw err(tr('nom de paramètre attendu'), pn);
      let dflt = null;
      if (isOp('=')) { p++; dflt = expr(); }
      params.push({ name: pn.v, dflt });
      if (isOp(',')) p++;
      else if (!isOp(')')) throw err(tr('« , » ou « ) » attendu'));
    }
    p++;
    if (isOp('->')) { p++; expr(); }
    expectOp(':');
    return { k: 'def', name: name.v, params, body: block(), line: tok.line };
  }

  function ifStmt() {
    const tok = next();
    const branches = [];
    let cond = expr();
    expectOp(':');
    branches.push([cond, block()]);
    let orelse = null;
    while (isKw('elif')) {
      p++;
      cond = expr();
      expectOp(':');
      branches.push([cond, block()]);
    }
    if (isKw('else')) {
      p++;
      expectOp(':');
      orelse = block();
    }
    return { k: 'if', branches, orelse, line: tok.line };
  }

  // A target list of a for loop: « i », « i, j ».
  function targetList() {
    const line = peek().line;
    const items = [postfix()];
    while (isOp(',')) { p++; items.push(postfix()); }
    const t = items.length === 1 ? items[0] : { k: 'tuple', items, line };
    checkTarget(t);
    return t;
  }

  // a, b → a tuple.
  function exprList() {
    const line = peek().line;
    const first = expr();
    if (!isOp(',')) return first;
    const items = [first];
    while (isOp(',')) {
      p++;
      if (at('newline') || isOp('=') || isOp(')') || isOp(':') || at('eof')) break;
      items.push(expr());
    }
    return { k: 'tuple', items, line };
  }

  function expr() {
    if (isKw('lambda')) throw new PyError(REFUSED.lambda, peek().line, 'syntax');
    const line = peek().line;
    const a = orExpr();
    if (isKw('if')) {
      p++;
      const cond = orExpr();
      if (!isKw('else')) throw err(tr('« else » attendu dans « a if condition else b »'));
      p++;
      const b = expr();
      return { k: 'ifexp', cond, a, b, line };
    }
    return a;
  }

  function orExpr() {
    let l = andExpr();
    while (isKw('or')) { const line = next().line; l = { k: 'bool', op: 'or', l, r: andExpr(), line }; }
    return l;
  }
  function andExpr() {
    let l = notExpr();
    while (isKw('and')) { const line = next().line; l = { k: 'bool', op: 'and', l, r: notExpr(), line }; }
    return l;
  }
  function notExpr() {
    if (isKw('not')) { const line = next().line; return { k: 'not', e: notExpr(), line }; }
    return comparison();
  }
  const CMP = ['<', '>', '==', '>=', '<=', '!='];
  function comparison() {
    const line = peek().line;
    const first = arith();
    const ops = [];
    const items = [first];
    for (;;) {
      if (at('op') && CMP.includes(peek().v)) { ops.push(next().v); items.push(arith()); continue; }
      if (isKw('in')) { p++; ops.push('in'); items.push(arith()); continue; }
      if (isKw('not') && peek(1).t === 'kw' && peek(1).v === 'in') { p += 2; ops.push('not in'); items.push(arith()); continue; }
      if (isKw('is')) {
        p++;
        if (isKw('not')) { p++; ops.push('is not'); } else ops.push('is');
        items.push(arith());
        continue;
      }
      break;
    }
    return ops.length ? { k: 'cmp', ops, items, line } : first;
  }
  function arith() {
    let l = term();
    while (isOp('+') || isOp('-')) { const t = next(); l = { k: 'bin', op: t.v, l, r: term(), line: t.line }; }
    return l;
  }
  function term() {
    let l = unary();
    while (isOp('*') || isOp('/') || isOp('//') || isOp('%') || isOp('@')) {
      const t = next();
      if (t.v === '@') throw new PyError(tr('« @ » n\'est pas accepté : utilise matmul(A, B) ou matvec(A, x)'), t.line, 'syntax');
      l = { k: 'bin', op: t.v, l, r: unary(), line: t.line };
    }
    return l;
  }
  function unary() {
    if (isOp('-') || isOp('+')) { const t = next(); return { k: 'unary', op: t.v, e: unary(), line: t.line }; }
    if (isOp('~')) throw err(tr('« ~ » n\'est pas accepté ici'));
    return power();
  }
  function power() {
    const base = postfix();
    if (isOp('**')) { const t = next(); return { k: 'bin', op: '**', l: base, r: unary(), line: t.line }; }
    return base;
  }
  function postfix() {
    let e = atom();
    for (;;) {
      if (isOp('(')) {
        const t = next();
        const args = [];
        while (!isOp(')')) {
          if (at('name') && peek(1).t === 'op' && peek(1).v === '=') throw err(tr('les arguments nommés (« nom = valeur ») ne sont pas acceptés : donne les valeurs dans l\'ordre'));
          args.push(expr());
          if (isKw('for')) throw new PyError(tr('les compréhensions ne sont pas acceptées : écris une boucle for'), peek().line, 'syntax');
          if (isOp(',')) p++;
          else if (!isOp(')')) throw err(tr('« , » ou « ) » attendu, trouvé {found}', { found: show(peek()) }));
        }
        p++;
        e = { k: 'call', f: e, args, line: t.line };
        continue;
      }
      if (isOp('[')) {
        const t = next();
        let lo = null;
        let hi = null;
        let step = null;
        let isSlice = false;
        if (!isOp(':')) lo = expr();
        if (isOp(':')) {
          isSlice = true;
          p++;
          if (!isOp(']') && !isOp(':')) hi = expr();
          if (isOp(':')) { p++; if (!isOp(']')) step = expr(); }
        }
        if (isOp(',')) throw err(tr('écris a[i][j], pas a[i, j]'));
        expectOp(']');
        e = isSlice ? { k: 'slice', e, lo, hi, step, line: t.line } : { k: 'index', e, i: lo, line: t.line };
        continue;
      }
      if (isOp('.')) {
        const t = next();
        const name = next();
        if (name.t !== 'name') throw err(tr('nom attendu après « . »'), name);
        e = { k: 'attr', e, name: name.v, line: t.line };
        continue;
      }
      return e;
    }
  }
  function atom() {
    const t = peek();
    if (t.t === 'num') { p++; return { k: 'num', v: t.v, line: t.line }; }
    if (t.t === 'str') {
      p++;
      let v = t.v;
      while (at('str')) v += next().v;
      return { k: 'str', v, line: t.line };
    }
    if (t.t === 'name') { p++; return { k: 'name', id: t.v, line: t.line }; }
    if (t.t === 'kw') {
      if (t.v === 'True' || t.v === 'False' || t.v === 'None') { p++; return { k: 'const', v: t.v === 'True' ? true : t.v === 'False' ? false : null, line: t.line }; }
      if (REFUSED[t.v]) throw new PyError(REFUSED[t.v], t.line, 'syntax');
      throw err(tr('« {v} » inattendu ici', { v: t.v }));
    }
    if (t.t === 'op' && t.v === '(') {
      p++;
      if (isOp(')')) { p++; return { k: 'tuple', items: [], line: t.line }; }
      const first = expr();
      if (isKw('for')) throw new PyError(tr('les compréhensions ne sont pas acceptées : écris une boucle for'), peek().line, 'syntax');
      if (isOp(',')) {
        const items = [first];
        while (isOp(',')) { p++; if (isOp(')')) break; items.push(expr()); }
        expectOp(')');
        return { k: 'tuple', items, line: t.line };
      }
      expectOp(')');
      return first;
    }
    if (t.t === 'op' && t.v === '[') {
      p++;
      const items = [];
      while (!isOp(']')) {
        items.push(expr());
        if (isKw('for')) throw new PyError(tr('les compréhensions de liste ne sont pas acceptées : écris une boucle for avec append'), peek().line, 'syntax');
        if (isOp(',')) p++;
        else if (!isOp(']')) throw err(tr('« , » ou « ] » attendu, trouvé {found}', { found: show(peek()) }));
      }
      p++;
      return { k: 'list', items, line: t.line };
    }
    if (t.t === 'op' && t.v === '{') throw err(tr('les dictionnaires et les ensembles ne sont pas acceptés ici'));
    if (t.t === 'newline' || t.t === 'eof') throw err(tr('l\'expression est incomplète'), t);
    if (t.t === 'indent') throw new PyError(tr('indentation inattendue'), t.line, 'syntax');
    throw err(tr('{what} inattendu', { what: show(t) }));
  }

  const body = program();
  return body;
}

// One expression (a test's expr or expect).
export function parseExpr(src, { line = 1 } = {}) {
  const prog = parseProgram(String(src).trim());
  if (prog.length !== 1 || prog[0].k !== 'expr') throw new PyError(tr('erreur de syntaxe : une seule expression est attendue'), line, 'syntax');
  return prog[0].e;
}
