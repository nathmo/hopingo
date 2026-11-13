// Tools shared by the generators of module P, part e (step U7): χ² tests,
// interpretation, regression, Bayesian statistics. Built on proba-kit.js.

import { Q } from '../../math/rational.js';
import { mcq } from './kit.js';
import { examTag } from './proba-kit.js';
import { chi2Table, roundTo } from '../../cas/stats.js';

export const q = (n, d = 1) => (n instanceof Q ? n : new Q(n, d));
// Exact text for the judges: 13/5 ; −2 ; a float as a decimal.
export const qt = (x) => (x instanceof Q ? (x.d === 1 ? String(x.n) : `${x.n}/${x.d}`) : String(Number(Number(x).toFixed(10))));
// For the screen and the reference lines: 13,4 ; −0,25 ; 2/3 when not a finite decimal.
export const qs = (x, d = 4) => {
  if (x instanceof Q) return (x.toDecimal() ?? `${x.n}/${x.d}`).replace('-', '−');
  return String(Number(Number(x).toFixed(d))).replace('.', ',').replace('-', '−');
};
// Same, for a line typed for the judges (comma decimals, « - »).
export const ql = (x, d = 4) => qs(x, d).replace('−', '-');
// A rounded decimal, for the screen.
export const r2 = (x, d = 2) => String(roundTo(x, d)).replace('.', ',').replace('-', '−');
export const rl = (x, d = 2) => String(roundTo(x, d)).replace('.', ',');
const CHI = new Map();
export const chi = (r, a = 5) => { const k = `${r}:${a}`; if (!CHI.has(k)) CHI.set(k, chi2Table(r, a)); return CHI.get(k); };
export const sum = (xs) => xs.reduce((s, x) => s + x, 0);
export const qsum = (xs) => xs.reduce((s, x) => s.add(q(x)), q(0));

// « Interpréter » (convention 6): the right sentence and three traps, shuffled.
export function interp(rng, right, wrongs, prompt = t('Interpréter : quelle phrase est juste ?')) {
  const options = rng.shuffle([{ html: right, correct: true }, ...wrongs.slice(0, 3).map(([html, rule]) => ({ html, correct: false, rule: rule ?? null }))]);
  return { prompt, options };
}

// A true/false statement whose falsity has no numeric counter-example: a
// multiple choice « Vrai » / « Faux » (js/engine/exam.js makes it a tf item).
export function vf({ skill, level = 4, statement, truth, rule = null, explanation = '', key, opts = {} }, rng) {
  const it = mcq({
    skill, level, prompt: `${t('Vrai ou faux ?')}<br>${statement}`, keepOrder: true, key: `vf:${key}`,
    options: [{ html: t('Vrai'), correct: truth, rule: truth ? null : rule }, { html: t('Faux'), correct: !truth, rule: truth ? rule : null }],
    solution: explanation ? [{ html: explanation, note: '' }] : [], exam: examTag(opts),
  }, rng);
  return it;
}

// Integer deviations of zero sum, size k, each in [−m, m], not all zero.
export function zeroSum(rng, k, m) {
  for (;;) {
    const d = Array.from({ length: k - 1 }, () => rng.int(-m, m));
    const last = -sum(d);
    if (Math.abs(last) <= m && d.some((x) => x !== 0)) return [...d, last];
  }
}

// An SVG scatter (read-only plot): points [[x, y]], axes through 0 for y.
export function scatterSVG(points, { w = 260, h = 170, xlabel = '', ylabel = '', diag = false, zero = true } = {}) {
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const [x0, x1] = [Math.min(...xs), Math.max(...xs)];
  let [y0, y1] = [Math.min(...ys), Math.max(...ys)];
  if (zero) { const m = Math.max(Math.abs(y0), Math.abs(y1)) || 1; y0 = -m; y1 = m; }
  const pad = 22;
  const X = (x) => pad + ((x - x0) / (x1 - x0 || 1)) * (w - 2 * pad);
  const Y = (y) => h - pad - ((y - y0) / (y1 - y0 || 1)) * (h - 2 * pad);
  const dots = points.map(([x, y]) => `<circle cx="${X(x).toFixed(1)}" cy="${Y(y).toFixed(1)}" r="3" fill="#1c7ed6"/>`).join('');
  const axis = zero ? `<line x1="${pad}" y1="${Y(0).toFixed(1)}" x2="${w - pad}" y2="${Y(0).toFixed(1)}" stroke="#adb5bd" stroke-dasharray="4 3"/>` : '';
  const line = diag ? `<line x1="${X(x0).toFixed(1)}" y1="${Y(x0).toFixed(1)}" x2="${X(x1).toFixed(1)}" y2="${Y(x1).toFixed(1)}" stroke="#adb5bd" stroke-dasharray="4 3"/>` : '';
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:300px;display:block;margin:4px auto" role="img" aria-label="${t('{y} en fonction de {x}', { y: ylabel, x: xlabel })}">`
    + `<rect x="${pad}" y="${pad / 2}" width="${w - 2 * pad}" height="${h - 1.5 * pad}" fill="none" stroke="#dee2e6"/>${axis}${line}${dots}`
    + `<text x="${w / 2}" y="${h - 4}" font-size="11" text-anchor="middle" fill="#495057">${xlabel}</text>`
    + `<text x="10" y="${h / 2}" font-size="11" text-anchor="middle" fill="#495057" transform="rotate(-90 10 ${h / 2})">${ylabel}</text></svg>`;
}

// ---------- the parts' lines ----------
// A part's lines stop at the first final line (13,4 ; 6/17), and end on a
// final one: `value` (a literal) is added when none is final. The kit's
// constructors wrapped with it.
import { statItem as kitStat, coefItem as kitCoef, openItem as kitOpen } from './proba-kit.js';
import { JUDGES } from '../../judges/index.js';
import { t } from '../../i18n.js';

const isFinalLine = (p, math) => {
  const J = JUDGES[p.kind || 'prob'];
  const cfg = { kind: p.kind || 'prob', decimals: p.decimals };
  try { return J.isFinal(cfg, J.parseLine(cfg, math)) === true; } catch { return false; }
};
export function cutLines(p) {
  if (p.vars || !p.lines?.length) return p;
  const out = [];
  for (const l of p.lines) {
    if (out.length && out[out.length - 1].math === l.math) continue;
    out.push(l);
    if (isFinalLine(p, l.math)) return { ...p, lines: out };
  }
  if (p.value !== undefined && p.value !== out[out.length - 1].math) out.push({ math: p.value, note: '' });
  return { ...p, lines: out };
}
const prep = (o) => ({ ...o, parts: o.parts?.map(cutLines), part: o.part ? cutLines(o.part) : o.part });
export const statItem = (o) => kitStat(prep(o));
export const coefItem = (o) => kitCoef(prep(o));
export const openItem = (o, points, rng) => kitOpen(prep(o), points, rng);
