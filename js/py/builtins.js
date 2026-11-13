// Values, arithmetic and built-in functions of the Python subset (spec §12,
// step U9). Representation:
//   int → BigInt, float → number, bool → boolean, None → null, str → string,
//   list → Array, tuple → Array marked with TUPLE, range → {k:'range'},
//   functions → {k:'func'} (user) | {k:'builtin', name, fn(args, ctx)},
//   module → {k:'module', name, attrs}, bound method → {k:'method', self, name}.
// Every error is a PyError with a French message; the interpreter adds the line.

import { PyError } from './lexer.js';
import { t as tr } from '../i18n.js';

export const TUPLE = Symbol('tuple');
export const tuple = (arr) => { arr[TUPLE] = true; return arr; };
export const isTuple = (v) => Array.isArray(v) && v[TUPLE] === true;
export const isList = (v) => Array.isArray(v) && !v[TUPLE];
export const isInt = (v) => typeof v === 'bigint' || typeof v === 'boolean';
export const isFloat = (v) => typeof v === 'number';
export const isNum = (v) => isInt(v) || isFloat(v);
export const big = (v) => (typeof v === 'boolean' ? (v ? 1n : 0n) : v);
export const toF = (v) => (typeof v === 'number' ? v : typeof v === 'bigint' ? Number(v) : typeof v === 'boolean' ? (v ? 1 : 0) : NaN);

export const MAX_LIST = 10000;

export function typeName(v) {
  if (v === null || v === undefined) return 'None';
  if (typeof v === 'boolean') return tr('booléen');
  if (typeof v === 'bigint') return tr('entier');
  if (typeof v === 'number') return tr('nombre à virgule');
  if (typeof v === 'string') return tr('texte');
  if (isTuple(v)) return 'tuple';
  if (Array.isArray(v)) return tr('liste');
  if (v.k === 'range') return 'range';
  if (v.k === 'func' || v.k === 'builtin' || v.k === 'method') return tr('fonction');
  if (v.k === 'module') return 'module';
  return tr('objet');
}
// The type with its English article (« an int », « a list »), for the
// English messages; the French ones write « un {type} ».
export const anType = (v) => { const n = typeName(v); return `${/^[aeiou]/i.test(n) ? 'an' : 'a'} ${n}`; };

// Python's repr of a float: 2.0, 0.1, 1e-08, 1.4142135623730951, inf.
export function floatRepr(x) {
  if (Number.isNaN(x)) return 'nan';
  if (x === Infinity) return 'inf';
  if (x === -Infinity) return '-inf';
  if (Object.is(x, -0)) return '-0.0';
  const ax = Math.abs(x);
  if (ax !== 0 && (ax >= 1e16 || ax < 1e-4)) {
    const s = x.toExponential(); // shortest digits, « 1e-8 », « 1.5e+20 »
    const [m, e] = s.split('e');
    const n = Number(e);
    return `${m}e${n < 0 ? '-' : '+'}${String(Math.abs(n)).padStart(2, '0')}`;
  }
  const s = String(x);
  if (/e/.test(s)) {
    // JS writes some numbers < 1e-6 in exponent form only below 1e-6.
    return s;
  }
  return s.includes('.') ? s : `${s}.0`;
}

export function repr(v, seen = new Set()) {
  if (v === null || v === undefined) return 'None';
  if (v === true) return 'True';
  if (v === false) return 'False';
  if (typeof v === 'bigint') return String(v);
  if (typeof v === 'number') return floatRepr(v);
  if (typeof v === 'string') return `'${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
  if (Array.isArray(v)) {
    if (seen.has(v)) return '[...]';
    seen.add(v);
    const inner = v.map((x) => repr(x, seen)).join(', ');
    seen.delete(v);
    if (isTuple(v)) return v.length === 1 ? `(${inner},)` : `(${inner})`;
    return `[${inner}]`;
  }
  if (v.k === 'range') return v.step === 1n ? `range(${v.start}, ${v.stop})` : `range(${v.start}, ${v.stop}, ${v.step})`;
  if (v.k === 'func') return tr('<fonction {name}>', { name: v.name });
  if (v.k === 'builtin') return tr('<fonction {name}>', { name: v.name });
  if (v.k === 'method') return tr('<méthode {name}>', { name: v.name });
  if (v.k === 'module') return `<module ${v.name}>`;
  return String(v);
}
export const str = (v) => (typeof v === 'string' ? v : repr(v));

export function truthy(v) {
  if (v === null || v === undefined || v === false) return false;
  if (v === true) return true;
  if (typeof v === 'bigint') return v !== 0n;
  if (typeof v === 'number') return v !== 0;
  if (typeof v === 'string' || Array.isArray(v)) return v.length > 0;
  if (v.k === 'range') return rangeLen(v) > 0;
  return true;
}

const err = (msg) => new PyError(msg);
const opName = { '+': '+', '-': '−', '*': '*', '/': '/', '//': '//', '%': '%', '**': '**' };
function typeErr(op, a, b) {
  return err(tr('opération impossible : {a} {op} {b}', { a: typeName(a), op: opName[op] ?? op, b: typeName(b) }));
}

function checkFloat(x) {
  if (x === Infinity || x === -Infinity) return x;
  return x;
}

function repeat(seq, n) {
  const k = Number(big(n));
  if (k <= 0) return Array.isArray(seq) ? (isTuple(seq) ? tuple([]) : []) : '';
  if (typeof seq === 'string') return seq.repeat(k);
  if (seq.length * k > MAX_LIST) throw err(tr('liste trop longue (plus de {max} éléments)', { max: MAX_LIST.toLocaleString('fr-CH') }));
  const out = [];
  for (let i = 0; i < k; i++) out.push(...seq);
  return isTuple(seq) ? tuple(out) : out;
}

export function binop(op, a, b) {
  const ia = isInt(a);
  const ib = isInt(b);
  const na = ia || isFloat(a);
  const nb = ib || isFloat(b);
  if (na && nb) {
    if (ia && ib) {
      const x = big(a);
      const y = big(b);
      switch (op) {
        case '+': return x + y;
        case '-': return x - y;
        case '*': return x * y;
        case '/': if (y === 0n) throw err(tr('division par zéro')); return Number(x) / Number(y);
        case '//': {
          if (y === 0n) throw err(tr('division par zéro'));
          const q = x / y;
          return (x % y !== 0n && (x < 0n) !== (y < 0n)) ? q - 1n : q;
        }
        case '%': {
          if (y === 0n) throw err(tr('division par zéro (modulo)'));
          const r = x % y;
          return r !== 0n && (r < 0n) !== (y < 0n) ? r + y : r;
        }
        case '**': {
          if (y < 0n) {
            if (x === 0n) throw err(tr('division par zéro (0 à une puissance négative)'));
            return Math.pow(Number(x), Number(y));
          }
          if (y > 2000n && (x > 1n || x < -1n)) return Math.pow(Number(x), Number(y));
          return x ** y;
        }
        default: break;
      }
    }
    const x = toF(a);
    const y = toF(b);
    switch (op) {
      case '+': return checkFloat(x + y);
      case '-': return checkFloat(x - y);
      case '*': return checkFloat(x * y);
      case '/': if (y === 0) throw err(tr('division par zéro')); return checkFloat(x / y);
      case '//': if (y === 0) throw err(tr('division par zéro')); return Math.floor(x / y);
      case '%': {
        if (y === 0) throw err(tr('division par zéro (modulo)'));
        const r = x % y;
        return r !== 0 && (r < 0) !== (y < 0) ? r + y : r;
      }
      case '**': {
        if (x === 0 && y < 0) throw err(tr('division par zéro (0 à une puissance négative)'));
        if (x < 0 && !Number.isInteger(y)) throw err(tr('puissance non entière d\'un nombre négatif'));
        const r = Math.pow(x, y);
        if (!Number.isFinite(r) && Number.isFinite(x) && Number.isFinite(y)) throw err(tr('résultat trop grand (dépassement de capacité)'));
        return r;
      }
      default: break;
    }
  }
  if (op === '+') {
    if (typeof a === 'string' && typeof b === 'string') return a + b;
    if (isList(a) && isList(b)) {
      if (a.length + b.length > MAX_LIST) throw err(tr('liste trop longue (plus de {max} éléments)', { max: MAX_LIST.toLocaleString('fr-CH') }));
      return [...a, ...b];
    }
    if (isTuple(a) && isTuple(b)) return tuple([...a, ...b]);
    if (Array.isArray(a) && nb) throw err(tr('opération impossible : liste + nombre (pour ajouter un élément, utilise append ; pour additionner terme à terme, écris une boucle)'));
    if (na && Array.isArray(b)) throw err(tr('opération impossible : nombre + liste (écris une boucle pour additionner terme à terme)'));
  }
  if (op === '*') {
    if ((Array.isArray(a) || typeof a === 'string') && ib) return repeat(a, b);
    if (ia && (Array.isArray(b) || typeof b === 'string')) return repeat(b, a);
    if (Array.isArray(a) && isFloat(b)) throw err(tr('on ne multiplie pas une liste par un nombre à virgule : écris une boucle'));
    if (isFloat(a) && Array.isArray(b)) throw err(tr('on ne multiplie pas une liste par un nombre à virgule : écris une boucle'));
    if (Array.isArray(a) && Array.isArray(b)) throw err(tr('opération impossible : liste * liste (pour un produit matriciel, utilise matmul ou matvec)'));
  }
  if ((a === null || b === null)) throw err(tr('opération impossible avec None : une fonction a-t-elle oublié son return ?'));
  throw typeErr(op, a, b);
}

export function unop(op, a) {
  if (op === '-') {
    if (isInt(a)) return -big(a);
    if (isFloat(a)) return -a;
  }
  if (op === '+') {
    if (isInt(a)) return big(a);
    if (isFloat(a)) return a;
  }
  if (a === null) throw err(tr('opération impossible avec None : une fonction a-t-elle oublié son return ?'));
  throw err(tr('opération impossible : {op}{a}', { op, a: typeName(a) }));
}

export function equal(a, b) {
  if (isNum(a) && isNum(b)) {
    if (isInt(a) && isInt(b)) return big(a) === big(b);
    return toF(a) === toF(b);
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (isTuple(a) !== isTuple(b) || a.length !== b.length) return false;
    return a.every((x, i) => equal(x, b[i]));
  }
  return a === b;
}

export function compare(op, a, b) {
  if (op === '==') return equal(a, b);
  if (op === '!=') return !equal(a, b);
  if (op === 'is') return a === b || (a === null && b === null);
  if (op === 'is not') return !(a === b || (a === null && b === null));
  if (op === 'in' || op === 'not in') {
    let found;
    if (typeof b === 'string' && typeof a === 'string') found = b.includes(a);
    else if (Array.isArray(b)) found = b.some((x) => equal(x, a));
    else if (b?.k === 'range') found = isInt(a) && iterate(b).some((x) => x === big(a));
    else throw err(tr('« in » demande une liste, pas un {type}', { type: typeName(b), an: anType(b) }));
    return op === 'in' ? found : !found;
  }
  let c;
  if (isNum(a) && isNum(b)) {
    const x = isInt(a) && isInt(b) ? big(a) : toF(a);
    const y = isInt(a) && isInt(b) ? big(b) : toF(b);
    c = x < y ? -1 : x > y ? 1 : x === y || x == y ? 0 : NaN; // eslint-disable-line eqeqeq
  } else if (typeof a === 'string' && typeof b === 'string') c = a < b ? -1 : a > b ? 1 : 0;
  else if (Array.isArray(a) && Array.isArray(b)) {
    c = 0;
    for (let i = 0; i < Math.min(a.length, b.length) && c === 0; i++) {
      if (!equal(a[i], b[i])) c = compare('<', a[i], b[i]) ? -1 : 1;
    }
    if (c === 0) c = a.length - b.length;
  } else {
    if (a === null || b === null) throw err(tr('comparaison impossible avec None : une fonction a-t-elle oublié son return ?'));
    throw err(tr('comparaison impossible : {a} {op} {b}', { a: typeName(a), op, b: typeName(b) }));
  }
  if (Number.isNaN(c)) return false;
  switch (op) {
    case '<': return c < 0;
    case '>': return c > 0;
    case '<=': return c <= 0;
    case '>=': return c >= 0;
    default: throw err(`comparaison ${op} inconnue`);
  }
}

// ---------- iteration ----------

export function rangeLen(r) {
  const { start, stop, step } = r;
  if (step > 0n) return stop > start ? Number((stop - start + step - 1n) / step) : 0;
  return start > stop ? Number((start - stop - step - 1n) / -step) : 0;
}

// The elements of an iterable, as an array (ranges are expanded lazily by
// the interpreter's for loop; this is for list(), sum(), min()…).
export function iterate(v) {
  if (Array.isArray(v)) return v.slice();
  if (typeof v === 'string') return [...v];
  if (v && v.k === 'range') {
    const n = rangeLen(v);
    if (n > MAX_LIST * 10) throw err(tr('range trop grand'));
    const out = [];
    for (let i = 0n; i < BigInt(n); i++) out.push(v.start + i * v.step);
    return out;
  }
  throw err(isNum(v) ? tr('on ne peut pas parcourir un {type} (pour une boucle, écris range(n))', { type: typeName(v), an: anType(v) }) : tr('on ne peut pas parcourir un {type}', { type: typeName(v), an: anType(v) }));
}

export function toIndex(v, what = 'indice') {
  if (isInt(v)) return Number(big(v));
  // what: « indice », « pas de tranche »… (French; the article comes with it in the key).
  if (isFloat(v)) throw err(tr('{what} doit être un entier, pas un nombre à virgule ({v}) : utilise int(…) ou //', { what: tr(`un ${what}`), v: floatRepr(v) }));
  throw err(tr('{what} doit être un entier, pas un {type}', { what: tr(`un ${what}`), type: typeName(v), an: anType(v) }));
}

export function getIndex(seq, i) {
  if (!Array.isArray(seq) && typeof seq !== 'string') {
    if (seq === null) throw err(tr('None n\'a pas de cases : une fonction a-t-elle oublié son return ?'));
    throw err(tr('un {type} n\'a pas de cases : on ne peut pas écrire […] après', { type: typeName(seq), an: anType(seq) }));
  }
  let k = toIndex(i);
  const n = seq.length;
  if (k < 0) k += n;
  if (k < 0 || k >= n) throw err(tr('indice hors de la liste (indice {i}, longueur {n})', { i: toIndex(i), n }));
  return seq[k];
}

export function setIndex(seq, i, value) {
  if (isTuple(seq)) throw err(tr('on ne peut pas modifier une case d\'un tuple'));
  if (!Array.isArray(seq)) throw err(tr('on ne peut pas modifier une case d\'un {type}', { type: typeName(seq), an: anType(seq) }));
  let k = toIndex(i);
  const n = seq.length;
  if (k < 0) k += n;
  if (k < 0 || k >= n) throw err(tr('indice hors de la liste (indice {i}, longueur {n}) : pour ajouter un élément, utilise append', { i: toIndex(i), n }));
  seq[k] = value;
}

export function getSlice(seq, lo, hi, step) {
  if (!Array.isArray(seq) && typeof seq !== 'string') throw err(tr('un {type} n\'a pas de tranches', { type: typeName(seq), an: anType(seq) }));
  const n = seq.length;
  const st = step === null || step === undefined ? 1 : toIndex(step, 'pas de tranche');
  if (st === 0) throw err(tr('le pas d\'une tranche ne peut pas être 0'));
  const norm = (v, dflt) => {
    if (v === null || v === undefined) return dflt;
    let k = toIndex(v, 'indice de tranche');
    if (k < 0) k += n;
    return st > 0 ? Math.min(Math.max(k, 0), n) : Math.min(Math.max(k, -1), n - 1);
  };
  const a = norm(lo, st > 0 ? 0 : n - 1);
  const b = norm(hi, st > 0 ? n : -1);
  const out = [];
  if (st > 0) for (let k = a; k < b; k += st) out.push(seq[k]);
  else for (let k = a; k > b; k += st) out.push(seq[k]);
  if (typeof seq === 'string') return out.join('');
  return isTuple(seq) ? tuple(out) : out;
}

// ---------- built-in functions ----------

const B = (name, fn) => ({ k: 'builtin', name, fn });
// « f() demande 2 arguments, 1 donné » (plural: of the arguments wanted, of those given).
export function argsMessage(name, want, many, given) {
  const vars = { name, want, n: given };
  if (many) return given > 1 ? tr('{name}() demande {want} arguments, {n} donnés', vars) : tr('{name}() demande {want} arguments, {n} donné', vars);
  return given > 1 ? tr('{name}() demande {want} argument, {n} donnés', vars) : tr('{name}() demande {want} argument, {n} donné', vars);
}
const nargs = (name, args, lo, hi = lo) => {
  if (args.length < lo || args.length > hi) {
    const want = lo === hi ? `${lo}` : hi === Infinity ? tr('au moins {lo}', { lo }) : tr('{lo} ou {hi}', { lo, hi });
    throw err(argsMessage(name, want, (hi === Infinity ? lo : hi) > 1, args.length));
  }
};
const num = (name, v) => {
  if (isNum(v)) return v;
  if (v === null) throw err(tr('{name}() a reçu None : une fonction a-t-elle oublié son return ?', { name }));
  throw err(tr('{name}() demande un nombre, pas un {type}', { name, type: typeName(v), an: anType(v) }));
};

function minmax(name, args, sign) {
  let items = args;
  if (args.length === 1) items = iterate(args[0]);
  if (!items.length) throw err(tr('{name}() d\'une liste vide', { name }));
  let best = items[0];
  for (const x of items.slice(1)) if (compare(sign < 0 ? '<' : '>', x, best)) best = x;
  return best;
}

export function makeBuiltins(ctx) {
  return {
    range: B('range', (args) => {
      nargs('range', args, 1, 3);
      for (const a of args) if (!isInt(a)) throw err(isFloat(a) ? tr('range demande des entiers, pas un {type} : utilise int(…)', { type: typeName(a), an: anType(a) }) : tr('range demande des entiers, pas un {type}', { type: typeName(a), an: anType(a) }));
      const [start, stop, step] = args.length === 1 ? [0n, big(args[0]), 1n] : [big(args[0]), big(args[1]), args.length === 3 ? big(args[2]) : 1n];
      if (step === 0n) throw err(tr('le pas de range ne peut pas être 0'));
      return { k: 'range', start, stop, step };
    }),
    len: B('len', (args) => {
      nargs('len', args, 1);
      const v = args[0];
      if (Array.isArray(v) || typeof v === 'string') return BigInt(v.length);
      if (v?.k === 'range') return BigInt(rangeLen(v));
      if (v === null) throw err(tr('len(None) : une fonction a-t-elle oublié son return ?'));
      throw err(tr('len() d\'un {type} : len demande une liste', { type: typeName(v), an: anType(v) }));
    }),
    abs: B('abs', (args) => {
      nargs('abs', args, 1);
      const v = num('abs', args[0]);
      return isInt(v) ? (big(v) < 0n ? -big(v) : big(v)) : Math.abs(v);
    }),
    min: B('min', (args) => { nargs('min', args, 1, Infinity); return minmax('min', args, -1); }),
    max: B('max', (args) => { nargs('max', args, 1, Infinity); return minmax('max', args, 1); }),
    sum: B('sum', (args) => {
      nargs('sum', args, 1, 2);
      let s = args.length > 1 ? args[1] : 0n;
      for (const x of iterate(args[0])) { ctx.tick(); s = binop('+', s, x); }
      return s;
    }),
    float: B('float', (args) => {
      nargs('float', args, 0, 1);
      if (!args.length) return 0;
      const v = args[0];
      if (isNum(v)) return toF(v);
      if (typeof v === 'string') {
        const t = v.trim().toLowerCase();
        if (t === 'inf' || t === '+inf') return Infinity;
        if (t === '-inf') return -Infinity;
        if (t === 'nan') return NaN;
        const x = Number(t);
        if (t === '' || Number.isNaN(x)) throw err(tr('float() ne sait pas lire « {v} »', { v }));
        return x;
      }
      throw err(tr('float() d\'un {type}', { type: typeName(v), an: anType(v) }));
    }),
    int: B('int', (args) => {
      nargs('int', args, 0, 1);
      if (!args.length) return 0n;
      const v = args[0];
      if (isInt(v)) return big(v);
      if (isFloat(v)) {
        if (!Number.isFinite(v)) throw err(tr('int() d\'un nombre infini ou NaN'));
        return BigInt(Math.trunc(v));
      }
      if (typeof v === 'string' && /^\s*[+-]?\d+\s*$/.test(v)) return BigInt(v.trim());
      throw err(tr('int() ne sait pas convertir un {type}', { type: typeName(v), an: anType(v) }));
    }),
    round: B('round', (args) => {
      nargs('round', args, 1, 2);
      const v = num('round', args[0]);
      if (args.length === 1 || args[1] === null) {
        if (isInt(v)) return big(v);
        // Banker's rounding, as Python.
        const f = Math.floor(v);
        const d = v - f;
        const r = d > 0.5 ? f + 1 : d < 0.5 ? f : (f % 2 === 0 ? f : f + 1);
        return BigInt(r);
      }
      const nd = toIndex(args[1], 'nombre de chiffres');
      if (isInt(v) && nd >= 0) return big(v);
      const x = toF(v);
      const m = 10 ** nd;
      const r = Math.round(x * m) / m;
      return Number(r.toFixed(Math.max(0, Math.min(nd, 20))));
    }),
    print: B('print', (args) => {
      ctx.output.push(args.map(str).join(' '));
      return null;
    }),
    list: B('list', (args) => {
      nargs('list', args, 0, 1);
      return args.length ? iterate(args[0]) : [];
    }),
    str: B('str', (args) => { nargs('str', args, 0, 1); return args.length ? str(args[0]) : ''; }),
    bool: B('bool', (args) => { nargs('bool', args, 0, 1); return args.length ? truthy(args[0]) : false; }),
    pow: B('pow', (args) => { nargs('pow', args, 2); return binop('**', args[0], args[1]); }),
    enumerate: B('enumerate', (args) => {
      nargs('enumerate', args, 1);
      return iterate(args[0]).map((x, i) => tuple([BigInt(i), x]));
    }),
    zip: B('zip', (args) => {
      const lists = args.map(iterate);
      const n = Math.min(...lists.map((l) => l.length));
      return Array.from({ length: n }, (_, i) => tuple(lists.map((l) => l[i])));
    }),
    sorted: B('sorted', (args) => {
      nargs('sorted', args, 1);
      return iterate(args[0]).sort((a, b) => (compare('<', a, b) ? -1 : compare('>', a, b) ? 1 : 0));
    }),
    isinstance: B('isinstance', () => { throw err(tr('isinstance n\'est pas accepté ici')); }),
  };
}

// ---------- the math module ----------

const realFn = (name, f, domain) => B(name, (args) => {
  nargs(`math.${name}`, args, 1);
  const x = toF(num(`math.${name}`, args[0]));
  if (domain && !domain(x)) throw err(tr('math.{name}({x}) : hors du domaine de la fonction', { name, x: floatRepr(x) }));
  const r = f(x);
  if (!Number.isFinite(r) && Number.isFinite(x)) throw err(tr('math.{name}({x}) : résultat trop grand', { name, x: floatRepr(x) }));
  return r;
});

export function mathModule() {
  const attrs = {
    pi: Math.PI,
    e: Math.E,
    inf: Infinity,
    tau: 2 * Math.PI,
    sqrt: realFn('sqrt', Math.sqrt, (x) => x >= 0),
    exp: realFn('exp', Math.exp),
    sin: realFn('sin', Math.sin),
    cos: realFn('cos', Math.cos),
    tan: realFn('tan', Math.tan),
    asin: realFn('asin', Math.asin, (x) => x >= -1 && x <= 1),
    acos: realFn('acos', Math.acos, (x) => x >= -1 && x <= 1),
    atan: realFn('atan', Math.atan),
    sinh: realFn('sinh', Math.sinh),
    cosh: realFn('cosh', Math.cosh),
    tanh: realFn('tanh', Math.tanh),
    fabs: realFn('fabs', Math.abs),
    log10: realFn('log10', Math.log10, (x) => x > 0),
    log2: realFn('log2', Math.log2, (x) => x > 0),
    log: B('log', (args) => {
      nargs('math.log', args, 1, 2);
      const x = toF(num('math.log', args[0]));
      if (x <= 0) throw err(tr('math.log({x}) : le logarithme demande un nombre > 0', { x: floatRepr(x) }));
      if (args.length === 1) return Math.log(x);
      const b = toF(num('math.log', args[1]));
      if (b <= 0 || b === 1) throw err(tr('math.log : base invalide'));
      return Math.log(x) / Math.log(b);
    }),
    atan2: B('atan2', (args) => { nargs('math.atan2', args, 2); return Math.atan2(toF(num('atan2', args[0])), toF(num('atan2', args[1]))); }),
    floor: B('floor', (args) => { nargs('math.floor', args, 1); const v = num('floor', args[0]); return isInt(v) ? big(v) : BigInt(Math.floor(v)); }),
    ceil: B('ceil', (args) => { nargs('math.ceil', args, 1); const v = num('ceil', args[0]); return isInt(v) ? big(v) : BigInt(Math.ceil(v)); }),
    isclose: B('isclose', (args) => {
      nargs('math.isclose', args, 2, 3);
      const a = toF(args[0]);
      const b = toF(args[1]);
      const tol = args.length > 2 ? toF(args[2]) : 1e-9;
      return Math.abs(a - b) <= tol * Math.max(Math.abs(a), Math.abs(b));
    }),
    factorial: B('factorial', (args) => {
      nargs('math.factorial', args, 1);
      const n = toIndex(args[0], 'argument de factorial');
      if (n < 0) throw err(tr('math.factorial d\'un nombre négatif'));
      let r = 1n;
      for (let i = 2n; i <= BigInt(n); i++) r *= i;
      return r;
    }),
  };
  return { k: 'module', name: 'math', attrs };
}

// Methods of lists.
export function listMethod(self, name) {
  const M = {
    append: (args) => {
      nargs('append', args, 1);
      if (self.length >= MAX_LIST) throw err(tr('liste trop longue (plus de {max} éléments)', { max: MAX_LIST.toLocaleString('fr-CH') }));
      self.push(args[0]);
      return null;
    },
    extend: (args) => {
      nargs('extend', args, 1);
      const items = iterate(args[0]);
      if (self.length + items.length > MAX_LIST) throw err(tr('liste trop longue (plus de {max} éléments)', { max: MAX_LIST.toLocaleString('fr-CH') }));
      self.push(...items);
      return null;
    },
    pop: (args) => {
      nargs('pop', args, 0, 1);
      if (!self.length) throw err(tr('pop() sur une liste vide'));
      if (!args.length) return self.pop();
      let k = toIndex(args[0]);
      if (k < 0) k += self.length;
      if (k < 0 || k >= self.length) throw err(tr('indice hors de la liste (pop)'));
      return self.splice(k, 1)[0];
    },
    insert: (args) => {
      nargs('insert', args, 2);
      let k = toIndex(args[0]);
      if (k < 0) k = Math.max(0, k + self.length);
      self.splice(Math.min(k, self.length), 0, args[1]);
      return null;
    },
    copy: (args) => { nargs('copy', args, 0); return self.slice(); },
    index: (args) => {
      nargs('index', args, 1);
      const k = self.findIndex((x) => equal(x, args[0]));
      if (k < 0) throw err(tr('{v} n\'est pas dans la liste', { v: repr(args[0]) }));
      return BigInt(k);
    },
    count: (args) => { nargs('count', args, 1); return BigInt(self.filter((x) => equal(x, args[0])).length); },
    reverse: (args) => { nargs('reverse', args, 0); self.reverse(); return null; },
  };
  if (isTuple(self) && name !== 'index' && name !== 'count') throw err(tr('un tuple n\'a pas de méthode {name}', { name }));
  if (!M[name]) throw err(tr('une liste n\'a pas de méthode « {name} »', { name }));
  return B(name, M[name]);
}
