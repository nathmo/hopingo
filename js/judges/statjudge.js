// The common engine of the judges `prob` and `stat` (spec §5.2, §16.2,
// step U7). A part asks one named value (x̄, s², Pr(M | +), t_obs, IC…):
// each line is a chain of members (js/judges/statline.js), and every
// member must have the value the part asks.
//
// cfg (both judges):
//   expect   the value asked, as text: '15/28', '0,977', '($xbar - 84)/($s/√5)'
//            ($name: the value the student gave to the earlier part `name`,
//            kept by LinesRun in state.vals, else cfg.ref[name]: errors are
//            carried forward); an interval: ['lo', 'hi']. Without expect,
//            the line keeps the value of the previous one.
//   name     the name under which this part's last line is kept (state.vals)
//   label, labels   the label a line may start with (« x̄ = 6 »); rel: the
//            text shown before each line (« x̄ = », js/judges/index.js signOf)
//   symbols  {'Pr(A)': '1/2', …}: symbols the lines may use
//   traps    {trapId: [values as text]} or {trapId: {values, ctx}}: the
//            wrong values of the traps of the module (js/cas/rules/stattrap.js)
//   vars, domain, upToConstant: expression lines in these variables, compared
//            by the core (equivalent), up to an additive constant if asked
// prob: exact values (fractions, C(n, k), decimals); final form: a whole
//   number, a finite decimal or an irreducible fraction (a member after
//   « ≈ » is checked as a rounding of the value, and is not enough alone).
// stat {decimals = 3, tol?, accept?: [texts], sig?, sigAlt?, ciRule?, digits?,
//   digitsFrom?}: the value within ½·10^(−decimals) (or tol), or one of the
//   values of accept (the two neighbours of a table reading, convention 3);
//   final form: a number written out, or an interval of two numbers. sig:
//   the final number has sig (or sigAlt) significant digits. ciRule
//   'outward': an interval's bounds rounded outward at `digits` decimals
//   (or at as many decimals as the student's line of part digitsFrom).

import { readStat, readStart, statValue, expected, statML, statTemplateML, decimalsOf, literalKind, isIrreducible, ReadError } from './statline.js';
import { diagnoseLine } from './diagnose.js';
import { equivalent } from '../cas/equiv.js';
import { diff } from '../cas/diff.js';
import { stripParen } from '../cas/ast.js';
import { floorTo, ceilTo } from '../cas/stats.js';
import { t } from '../i18n.js';

const squash = (s) => String(s ?? '').replace(/\s+/g, '');
const close = (a, b) => Math.abs(a - b) <= 1e-9 * (1 + Math.abs(a) + Math.abs(b));

// Significant digits written in a literal (0,0024 → 2 ; 3,10 → 3).
function sigDigits(ast) {
  let n = stripParen(ast);
  if (n.t === 'neg') n = stripParen(n.e);
  if (n.t !== 'num') return null;
  const digits = String(n.s).replace(/[.,]/, '').replace(/^0+/, '');
  return digits.length || 1;
}

// ---------- expression lines (vars) ----------

// (Expression lines use no bound symbols: the core reads them as they are.)
const exprOf = (cfg, ast) => ast;
function sameExpr(cfg, a, b) {
  const v = cfg.vars[0];
  const opts = { vars: cfg.vars, domain: cfg.domain || {}, seed: 7 };
  try {
    if (cfg.upToConstant) return equivalent(diff(a, v), diff(b, v), opts).equal;
    return equivalent(a, b, opts).equal;
  } catch { return false; }
}
let exprCache = new Map();
function expectedExpr(cfg) {
  const key = `${cfg.vars.join(',')}|${cfg.expect}`;
  if (!exprCache.has(key)) {
    if (exprCache.size > 500) exprCache = new Map();
    exprCache.set(key, readStat({ vars: cfg.vars }, String(cfg.expect)).members[0].ast);
  }
  return exprCache.get(key);
}

// ---------- the judge ----------

export function makeJudge(kind) {
  const tolOf = (cfg) => (kind === 'prob' ? 0 : cfg.tol ?? 0.5 * 10 ** -(cfg.decimals ?? 3));

  // Does a value match the one asked? (member: for « ≈ » and literal checks)
  function matches(cfg, v, want, member, state) {
    if (want.interval || v.interval) {
      if (!(want.interval && v.interval)) return false;
      if (cfg.ciRule === 'outward') {
        const d = digitsOf(cfg, state);
        return close(v.lo, floorTo(want.lo, d)) && close(v.hi, ceilTo(want.hi, d));
      }
      const tol = tolOf(cfg) + 1e-12;
      return Math.abs(v.lo - want.lo) <= tol && Math.abs(v.hi - want.hi) <= tol;
    }
    if (kind === 'prob' && v.q && want.q && member.op !== '≈') return v.q.eq(want.q);
    if (close(v.x, want.x)) return true;
    // A rounding written after « ≈ »: right to the digits written.
    if (member.op === '≈') {
      const d = decimalsOf(member.ast);
      if (d !== null && Math.abs(v.x - want.x) <= 0.5 * 10 ** -d + 1e-12) return true;
    }
    if (kind === 'prob') return false;
    const tol = tolOf(cfg) + 1e-12;
    if (Math.abs(v.x - want.x) <= tol) return true;
    // Table readings (convention 3): the neighbours on the grid.
    for (const a of cfg.accept || []) {
      const w = typeof a === 'number' ? a : Number(String(a).replace(',', '.'));
      if (Number.isFinite(w) && Math.abs(v.x - w) <= 1e-9 + (cfg.acceptTol ?? 0)) return true;
    }
    return false;
  }

  function digitsOf(cfg, state) {
    if (cfg.digitsFrom) {
      const node = state?.vals?.[cfg.digitsFrom];
      const last = node?.members?.[node.members.length - 1];
      const d = last ? decimalsOf(last.ast) : null;
      if (d !== null && d !== undefined) return d;
    }
    return cfg.digits ?? cfg.decimals ?? 3;
  }

  // Final form of a line whose value is right.
  function finalOf(cfg, node, state) {
    if (cfg.vars?.length) return cfg.final === false ? false : true;
    const ms = node.members;
    const last = ms[ms.length - 1];
    const lastAst = stripParen(last.ast);
    if (lastAst.t === 'set' && lastAst.kind === 'interval') {
      return literalKind(lastAst.lo) && literalKind(lastAst.hi) ? true : false;
    }
    if (kind === 'prob') {
      const exact = ms.filter((m) => m.op !== '≈');
      const lastExact = exact[exact.length - 1];
      const k = lastExact ? literalKind(lastExact.ast) : null;
      if (!k) {
        if (ms.some((m) => m.op === '≈') && exact.length) return t('Donne aussi la valeur exacte (une fraction irréductible).');
        return false;
      }
      // 60/6: right, and a step (the next line simplifies it).
      if (k === 'fraction' && !isIrreducible(lastExact.ast)) return false;
      return true;
    }
    const k = literalKind(last.ast);
    if (!k) return false;
    if (cfg.sig) {
      const s = sigDigits(last.ast);
      const ok = s === cfg.sig || (cfg.sigAlt && s === cfg.sigAlt);
      if (!ok) return t('C\'est la bonne valeur, mais écris-la avec {n} chiffres significatifs.', { n: cfg.sig });
    }
    return true;
  }

  function judgeLine(cfg, prev, input, state = {}) {
    let node;
    try {
      node = readStat(cfg, input);
    } catch (e) {
      return { kind: 'parse', message: e instanceof ReadError || e.message ? e.message : t('Je n\'arrive pas à lire cette ligne.') };
    }
    if (!node.members.length) return { kind: 'parse', node, message: t('Écris une valeur.') };
    if (prev?.t === 'sline' && prev.members?.length && squash(node.text) && squash(node.text) === squash(prev.text)) {
      return { kind: 'same', node, message: t('Avance d\'au moins une étape.') };
    }
    if (cfg.vars?.length) return judgeExpr(cfg, prev, node);
    let want = expected(cfg, state);
    if (!want && prev?.t === 'sline' && prev.members.length) want = statValue(cfg, prev.members[prev.members.length - 1].ast, {});
    if (!want) return { kind: 'wrong', node, message: t('Je ne sais pas quelle valeur attendre ici.') };
    for (const m of node.members) {
      const v = statValue(cfg, m.ast, {});
      if (!v) return { kind: 'wrong', node, message: t('Je n\'arrive pas à calculer cette ligne : vérifie les lettres et les parenthèses.') };
      if (!matches(cfg, v, want, m, state)) {
        const diag = diagnose(cfg, prev, node, v);
        return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message: wrongMessage(cfg, v, want) };
      }
    }
    const fin = finalOf(cfg, node, state);
    if (fin === true) return { kind: 'done', node };
    if (typeof fin === 'string') return { kind: 'stay', node, message: fin };
    return { kind: 'ok', node };
  }

  function wrongMessage(cfg, v, want) {
    if (v.interval || want.interval) return cfg.ciRule === 'outward' ? t('Ce ne sont pas les bonnes bornes : arrondis vers l\'extérieur, à la précision de u.') : t('Ce ne sont pas les bonnes bornes.');
    if (kind === 'stat') return t('Ce n\'est pas la bonne valeur (à {tol} près).', { tol: String(tolOf(cfg)).replace('.', ',') });
    return t('Ce n\'est pas la bonne valeur.');
  }

  // The traps of the module whose wrong values match the student's.
  function diagnose(cfg, prev, node, v) {
    const tol = Math.max(tolOf(cfg), 0) + 1e-12;
    const same = (cand) => {
      const c = cand?.members?.[cand.members.length - 1];
      if (!c) return false;
      const w = statValue(cfg, c.ast, {});
      if (!w) return false;
      if (w.interval || v.interval) return !!(w.interval && v.interval) && Math.abs(w.lo - v.lo) <= tol && Math.abs(w.hi - v.hi) <= tol;
      if (w.q && v.q && kind === 'prob') return w.q.eq(v.q);
      return close(w.x, v.x) || Math.abs(w.x - v.x) <= tol;
    };
    return diagnoseLine(kind, prev, node, cfg, (cand) => same(cand));
  }

  function judgeExpr(cfg, prev, node) {
    let want = null;
    try { want = cfg.expect !== undefined ? expectedExpr(cfg) : prev?.members?.length ? prev.members[prev.members.length - 1].ast : null; } catch { want = null; }
    if (!want) return { kind: 'wrong', node, message: t('Je ne sais pas quelle expression attendre ici.') };
    for (const m of node.members) {
      if (!sameExpr(cfg, exprOf(cfg, m.ast), exprOf(cfg, want))) {
        const diag = diagnoseLine(kind, prev, node, cfg, (cand) => {
          const c = cand?.members?.[cand.members.length - 1];
          return !!c && sameExpr(cfg, exprOf(cfg, c.ast), exprOf(cfg, m.ast));
        });
        return { kind: 'wrong', node, rule: diag?.rules[0] ?? null, diag, message: cfg.upToConstant ? t('Ce n\'est pas la bonne expression (même à une constante près).') : t('Ce n\'est pas la bonne expression.') };
      }
    }
    const fin = finalOf(cfg, node);
    return { kind: fin === true ? 'done' : 'ok', node };
  }

  return {
    judgeLine,
    isFinal: (cfg, node) => {
      if (!node?.members?.length) return false;
      if (cfg.vars?.length) return true;
      return finalOf(cfg, node, {});
    },
    start: (cfg) => cfg.start,
    parseLine: (cfg, text) => (text && typeof text === 'object' ? text : readStart(cfg, text)),
    show: (cfg, node, opts) => statML(cfg, node, opts),
    text: (cfg, node) => node?.text ?? '',
    templateML: (cfg, tpl, blanks) => statTemplateML(cfg, tpl, blanks),
    sign: '=',
  };
}
