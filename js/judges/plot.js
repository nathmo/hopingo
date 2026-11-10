// Items `plot` (spec §6, §16.3; step U5): the student places the elements of
// a figure on the plane — points (centre, vertices, foci) and lines (axes,
// asymptotes, directrices, each given by two points) — and the app checks
// each element within a tolerance, then draws the curve. Pure: no DOM
// (js/ui/plot.js draws it).
//
// item = {type: 'plot', task: 'conic' | 'points', view: {x: [min, max], y: [min, max]},
//         place: [{id, label, kind: 'point' | 'line', count}],
//         expect: {id: [[x, y]] for points | [[A, B, C]] for lines (Ax + By + C = 0)},
//         tol: {pos: 0.15, line: 0.25}, equation?: text (the curve, drawn after),
//         answer: {id: [[x, y]] | [[[x1, y1], [x2, y2]]]} (a reference placement)}
// checkPlot(item, answer) → {ok, parts: [{id, label, ok, message}], score}
// (score: the share of the elements right).

const dist = (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]);
const lineDist = ([A, B, C], P) => Math.abs(A * P[0] + B * P[1] + C) / Math.hypot(A, B);

export const SNAP = 0.25;
export const snap = (x) => Math.round(x / SNAP) * SNAP;

// Each expected point matched by one placed point (any order).
function matchPoints(want, got, tol) {
  if (got.length !== want.length) return false;
  const used = new Set();
  for (const P of want) {
    const i = got.findIndex((Q, k) => !used.has(k) && dist(P, Q) <= tol);
    if (i < 0) return false;
    used.add(i);
  }
  return true;
}

// A placed line [P, Q] is the line L: both points close to L, far apart.
const onLine = (L, [P, Q], tol) => dist(P, Q) >= 0.5 && lineDist(L, P) <= tol && lineDist(L, Q) <= tol;
function matchLines(want, got, tol) {
  if (got.length !== want.length) return false;
  const used = new Set();
  for (const L of want) {
    const i = got.findIndex((g, k) => !used.has(k) && onLine(L, g, tol));
    if (i < 0) return false;
    used.add(i);
  }
  return true;
}

export function checkPlot(item, answer = {}) {
  const tol = { pos: 0.15, line: 0.25, ...(item.tol || {}) };
  const parts = item.place.map((p) => {
    const got = answer[p.id] || [];
    const want = item.expect[p.id] || [];
    const ok = p.kind === 'line' ? matchLines(want, got, tol.line) : matchPoints(want, got, tol.pos);
    let message = '';
    if (!ok) {
      if (got.length !== want.length) message = `${p.label} : il en faut ${want.length}, tu en as placé ${got.length}.`;
      else message = `${p.label} : pas au bon endroit.`;
    }
    return { id: p.id, label: p.label, ok, message };
  });
  const right = parts.filter((p) => p.ok).length;
  return { ok: right === parts.length, parts, score: parts.length ? right / parts.length : 0 };
}

// A reference placement from item.expect (points as they are; each line by
// two of its points around the centre of the view).
export function referenceAnswer(item) {
  const out = {};
  const cx = (item.view.x[0] + item.view.x[1]) / 2;
  const cy = (item.view.y[0] + item.view.y[1]) / 2;
  for (const p of item.place) {
    const want = item.expect[p.id] || [];
    if (p.kind === 'point') out[p.id] = want.map((P) => [...P]);
    else {
      out[p.id] = want.map(([A, B, C]) => {
        const n = Math.hypot(A, B);
        // The foot of the centre of the view, then 2 along the line.
        const t = (A * cx + B * cy + C) / (n * n);
        const F = [cx - A * t, cy - B * t];
        const d = [-B / n, A / n];
        return [[F[0] - d[0], F[1] - d[1]], [F[0] + d[0], F[1] + d[1]]];
      });
    }
  }
  return out;
}

// Segments of the curve P(x, y) = 0 in the view (marching squares), for
// drawing: [[x1, y1, x2, y2]].
export function implicitSegments(P, view, n = 120) {
  const [x0, x1] = view.x;
  const [y0, y1] = view.y;
  const hx = (x1 - x0) / n;
  const hy = (y1 - y0) / n;
  const V = [];
  for (let i = 0; i <= n; i++) { V.push([]); for (let j = 0; j <= n; j++) V[i].push(P(x0 + i * hx, y0 + j * hy)); }
  const segs = [];
  const lerp = (a, b, va, vb) => a + ((b - a) * va) / (va - vb);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const xs = x0 + i * hx;
      const ys = y0 + j * hy;
      const c = [V[i][j], V[i + 1][j], V[i + 1][j + 1], V[i][j + 1]];
      const pts = [];
      const corners = [[xs, ys], [xs + hx, ys], [xs + hx, ys + hy], [xs, ys + hy]];
      for (let k = 0; k < 4; k++) {
        const a = c[k];
        const b = c[(k + 1) % 4];
        if ((a < 0) !== (b < 0)) {
          const [pa, pb] = [corners[k], corners[(k + 1) % 4]];
          pts.push([lerp(pa[0], pb[0], a, b), lerp(pa[1], pb[1], a, b)]);
        }
      }
      if (pts.length === 2) segs.push([...pts[0], ...pts[1]]);
      if (pts.length === 4) { segs.push([...pts[0], ...pts[1]]); segs.push([...pts[2], ...pts[3]]); }
    }
  }
  return segs;
}
