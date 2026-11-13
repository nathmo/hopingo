// Judge `value` with {arith: 'fp', digits} (spec §16.2, step U9, catalogue
// N, n-err-float): a line is right if, computed in p-digit arithmetic
// (js/cas/fp.js, rounding after every literal and every operation), it has
// the same value as the previous line (or as cfg.expect). So with p = 4,
// √1001 − √1000 → 31,64 − 31,62 → 0,02 are three right lines, and the
// exact 0,01581 is wrong there. Final form: a number written with at most
// p significant digits. Value traps of the modules (judges: ['value'])
// are tried on a wrong line (js/judges/diagnose.js).

import { readLine, sameLine } from './common.js';
import { fpEval, fl, fpText } from '../cas/fp.js';
import { parse } from '../cas/parse.js';
import { stripParen } from '../cas/ast.js';
import { diagnoseLine } from './diagnose.js';
import { t } from '../i18n.js';

const p = (cfg) => cfg.digits ?? 4;

const literalOf = (n) => {
  n = stripParen(n);
  const neg = n.t === 'neg';
  if (neg) n = stripParen(n.e);
  if (n.t === 'num') return n.s ?? String(n.v.n / n.v.d);
  if (n.t === 'float') return String(n.x);
  return null;
};

// Significant digits written: « 0,01581 » → 4, « 31,64 » → 4, « 0,02 » → 1.
export function sigWritten(text) {
  const tq = String(text).replace(',', '.').replace(/^[-−]/, '').replace(/e.*$/i, '');
  const d = tq.replace('.', '').replace(/^0+/, '');
  return d.length;
}

export function isFinal(cfg, node) {
  const lit = literalOf(node);
  if (lit === null) return false;
  if (sigWritten(lit) > p(cfg)) return t('Arrondis à {cfg} chiffres significatifs : {v1}.', { cfg: p(cfg), v1: fpText(fpEval(node, p(cfg)), p(cfg)) });
  return true;
}

const same = (a, b) => a === b || (Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= 1e-12 * Math.max(Math.abs(a), Math.abs(b)));

export function judgeLine(cfg, prev, input) {
  const read = readLine({ ...cfg, vars: [] }, input);
  if (read.error) return read.error;
  const { node } = read;
  if (prev && sameLine(node, prev)) return { kind: 'same', node, message: t('Avance d\'au moins une étape.') };
  const digits = p(cfg);
  const want = cfg.expect !== undefined ? fpEval(parse(String(cfg.expect)), digits) : fpEval(prev, digits);
  const got = fpEval(node, digits);
  if (!same(fl(got, digits), fl(want, digits))) {
    const diag = diagnoseLine('value', prev, node, cfg, (a, b) => same(fpEval(a, digits), fpEval(b, digits)));
    return {
      kind: 'wrong', node, rule: diag?.rules?.[0] ?? null, diag,
      message: t('Avec {digits} chiffres significatifs, on obtient {v1} : arrondis après chaque opération.', { digits, v1: fpText(want, digits) }),
    };
  }
  const fin = isFinal(cfg, node);
  if (fin === true) return { kind: 'done', node };
  if (typeof fin === 'string') return { kind: 'stay', node, message: fin };
  return { kind: 'ok', node };
}
