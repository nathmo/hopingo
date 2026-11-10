// Counter-examples of module N, part c (see js/judges/n-examples.js).
// PROPS: {name: (params, answers) => {ok, message?, rule?}}.
//   interpDegreeLow  {pts}: 4 points of distinct abscissas whose interpolant
//                    has degree < 3 (the last divided difference is 0)
//   p1Ratio          {f}: on [0 ; 1], halving h does not halve the error of
//                    the piecewise linear interpolant (n = 4, then 8)
//   lsNoPoint        {pts}: the least squares line of the points (at least
//                    3, not all aligned) passes through none of them

import { fnOf, numberOf } from './n-examples-util.js';

// « (0 ; 0), (1 ; 1) » → [[0, 0], [1, 1]] or null.
export function pointsOf(text) {
  const out = [];
  const s = String(text ?? '').replace(/−/g, '-');
  for (const m of s.matchAll(/\(([^;()]+);([^;()]+)\)/g)) {
    const x = numberOf(m[1].trim());
    const y = numberOf(m[2].trim());
    if (x === null || y === null) return null;
    out.push([x, y]);
  }
  return out.length ? out : null;
}

const distinctX = (pts) => new Set(pts.map((p) => p[0])).size === pts.length;

function divided(pts) {
  const xs = pts.map((p) => p[0]);
  const c = pts.map((p) => p[1]);
  for (let k = 1; k < xs.length; k++) for (let i = xs.length - 1; i >= k; i--) c[i] = (c[i] - c[i - 1]) / (xs[i] - xs[i - k]);
  return c;
}

function p1Err(f, n) {
  const xs = Array.from({ length: n + 1 }, (_, i) => i / n);
  let e = 0;
  for (let k = 0; k <= 4000; k++) {
    const x = k / 4000;
    const i = Math.min(n - 1, Math.floor(x * n));
    const v = f(xs[i]) + ((f(xs[i + 1]) - f(xs[i])) * (x - xs[i])) / (xs[i + 1] - xs[i]);
    e = Math.max(e, Math.abs(f(x) - v));
  }
  return e;
}

export const PROPS = {
  interpDegreeLow(params, a) {
    const pts = pointsOf(a.pts);
    if (!pts || pts.length !== 4) return { ok: false, message: 'Donne 4 points (x ; y), séparés par des virgules.' };
    if (!distinctX(pts)) return { ok: false, message: 'Les abscisses doivent être distinctes.' };
    const c = divided(pts);
    const scale = Math.max(1, ...pts.map((p) => Math.abs(p[1])));
    if (Math.abs(c[3]) > 1e-9 * scale) return { ok: false, message: 'Par ces 4 points passe un polynôme de degré exactement 3 : l\'énoncé est vrai pour eux.' };
    return { ok: true };
  },
  p1Ratio(params, a) {
    const f = fnOf(a.f);
    if (!f) return { ok: false, message: 'Donne une fonction f de x.' };
    const e4 = p1Err(f, 4);
    const e8 = p1Err(f, 8);
    if (!Number.isFinite(e4) || !Number.isFinite(e8)) return { ok: false, message: 'f doit être définie sur [0 ; 1].' };
    if (e4 < 1e-12) return { ok: false, message: 'Pour cette f, l\'interpolation est exacte : prends une fonction qui n\'est pas affine.' };
    const r = e4 / e8;
    if (r > 1.8 && r < 2.2) return { ok: false, message: 'Pour cette f, l\'erreur est bien divisée par 2 environ.' };
    return { ok: true };
  },
  lsNoPoint(params, a) {
    const pts = pointsOf(a.pts);
    if (!pts || pts.length < 3) return { ok: false, message: 'Donne au moins 3 points (x ; y), séparés par des virgules.' };
    if (new Set(pts.map((p) => p[0])).size < 2) return { ok: false, message: 'Il faut au moins deux abscisses différentes.' };
    const m = pts.length;
    const sx = pts.reduce((s, p) => s + p[0], 0);
    const sy = pts.reduce((s, p) => s + p[1], 0);
    const sxx = pts.reduce((s, p) => s + p[0] * p[0], 0);
    const sxy = pts.reduce((s, p) => s + p[0] * p[1], 0);
    const d = m * sxx - sx * sx;
    const a1 = (m * sxy - sx * sy) / d;
    const a0 = (sy - a1 * sx) / m;
    if (pts.some((p) => Math.abs(a0 + a1 * p[0] - p[1]) < 1e-9)) return { ok: false, message: 'La droite des moindres carrés de ces points passe par l\'un d\'eux.' };
    return { ok: true };
  },
};
