// Tokens of the Python subset (spec §12, step U9). Indentation becomes
// INDENT and DEDENT tokens, as in CPython; inside brackets, newlines and
// indentation are ignored. A token: {t, v?, line, col}.
//   t: 'num' (v: {int: bigint} | {float: number}), 'str', 'name', 'kw',
//      'op', 'newline', 'indent', 'dedent', 'eof'.
// Errors are PyError with a French message and the line.

export class PyError extends Error {
  constructor(message, line = null, kind = 'error') {
    super(message);
    this.line = line;
    this.kind = kind; // 'syntax' | 'error' | 'limit'
  }
  // « ligne 3 : nom inconnu : x »
  get text() { return this.line ? `ligne ${this.line} : ${this.message}` : this.message; }
}

export const KEYWORDS = new Set([
  'def', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'not', 'and', 'or',
  'break', 'continue', 'pass', 'import', 'from', 'as', 'True', 'False', 'None',
  'lambda', 'class', 'global', 'nonlocal', 'try', 'except', 'with', 'yield', 'is', 'del', 'assert',
]);

// Longest first.
const OPS = ['**=', '//=', '>>=', '<<=', '**', '//', '==', '!=', '<=', '>=', '+=', '-=', '*=', '/=', '%=', '->',
  '+', '-', '*', '/', '%', '<', '>', '=', '(', ')', '[', ']', '{', '}', ',', ':', '.', ';', '@', '&', '|', '^', '~'];

export function tokenize(src) {
  // Typographic characters a phone keyboard may insert.
  src = String(src).replace(/\r\n?/g, '\n').replace(/[−–]/g, '-').replace(/[×]/g, '*').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\t/g, '    ');
  const out = [];
  const indents = [0];
  let depth = 0; // bracket depth
  const lines = src.split('\n');
  let continued = false; // inside brackets across lines
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    const lineNo = li + 1;
    let i = 0;
    // Indentation of a logical line.
    if (!continued) {
      while (i < line.length && line[i] === ' ') i++;
      const rest = line.slice(i);
      if (rest.trim() === '' || rest.trimStart().startsWith('#')) continue; // blank or comment line
      const width = i;
      if (width > indents[indents.length - 1]) {
        indents.push(width);
        out.push({ t: 'indent', line: lineNo, col: 0 });
      } else {
        while (width < indents[indents.length - 1]) {
          indents.pop();
          out.push({ t: 'dedent', line: lineNo, col: 0 });
        }
        if (width !== indents[indents.length - 1]) throw new PyError('indentation : ce bloc ne s\'aligne sur aucun bloc au-dessus', lineNo, 'syntax');
      }
    }
    while (i < line.length) {
      const c = line[i];
      if (c === ' ') { i++; continue; }
      if (c === '#') break;
      if (c === '\\' && i === line.length - 1) { i++; continued = true; break; }
      const col = i + 1;
      // Numbers: 12, 1.5, .5, 1e-6, 2.
      if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(line[i + 1] || ''))) {
        const m = /^(\d[\d_]*)?(\.\d*)?([eE][+-]?\d+)?/.exec(line.slice(i));
        let text = m[0];
        if (!text) text = c;
        i += text.length;
        const clean = text.replace(/_/g, '');
        if (/^\d+$/.test(clean)) out.push({ t: 'num', v: { int: BigInt(clean) }, line: lineNo, col });
        else out.push({ t: 'num', v: { float: Number(clean) }, line: lineNo, col });
        if (/[A-Za-z_]/.test(line[i] || '')) throw new PyError(`erreur de syntaxe : « ${text}${line[i]} » n'est pas un nombre`, lineNo, 'syntax');
        continue;
      }
      if (/[A-Za-z_À-ɏ]/.test(c)) {
        const m = /^[A-Za-z_À-ɏ][A-Za-z0-9_À-ɏ]*/.exec(line.slice(i));
        i += m[0].length;
        out.push({ t: KEYWORDS.has(m[0]) ? 'kw' : 'name', v: m[0], line: lineNo, col });
        continue;
      }
      if (c === '"' || c === "'") {
        let j = i + 1;
        let s = '';
        while (j < line.length && line[j] !== c) {
          if (line[j] === '\\' && j + 1 < line.length) { const e = line[j + 1]; s += e === 'n' ? '\n' : e === 't' ? '\t' : e; j += 2; continue; }
          s += line[j++];
        }
        if (j >= line.length) throw new PyError('erreur de syntaxe : chaîne de caractères non fermée', lineNo, 'syntax');
        i = j + 1;
        out.push({ t: 'str', v: s, line: lineNo, col });
        continue;
      }
      const op = OPS.find((o) => line.startsWith(o, i));
      if (!op) throw new PyError(`erreur de syntaxe : caractère inattendu « ${c} »`, lineNo, 'syntax');
      i += op.length;
      if ('([{'.includes(op)) depth++;
      if (')]}'.includes(op)) depth = Math.max(0, depth - 1);
      out.push({ t: 'op', v: op, line: lineNo, col });
    }
    if (depth > 0) { continued = true; continue; }
    if (continued && line.endsWith('\\')) continue;
    continued = false;
    const last = out[out.length - 1];
    if (last && last.t !== 'newline' && last.t !== 'indent' && last.t !== 'dedent') out.push({ t: 'newline', line: lineNo, col: line.length + 1 });
  }
  if (depth > 0) throw new PyError('erreur de syntaxe : une parenthèse ou un crochet n\'est pas fermé', lines.length, 'syntax');
  const end = lines.length;
  if (out.length && out[out.length - 1].t !== 'newline' && out[out.length - 1].t !== 'dedent') out.push({ t: 'newline', line: end, col: 0 });
  while (indents.length > 1) { indents.pop(); out.push({ t: 'dedent', line: end, col: 0 }); }
  out.push({ t: 'eof', line: end, col: 0 });
  return out;
}
