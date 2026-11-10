// Mount of the `plot` items (step U5): a plane where the student places the
// elements of a figure (points by a tap, lines by two taps), then « Vérifier »;
// js/judges/plot.js checks each element, and the app draws the curve and the
// expected elements. The grid is js/math/graph.js (the plane of the school
// unit « fonctions »), with a layer for what is placed.

import { h, play } from './dom.js';
import { graphSvg } from '../math/graph.js';
import { checkPlot, snap, implicitSegments } from '../judges/plot.js';
import { explainRule, solutionHtml } from './exercises.js';
import { hintsBox } from './tokens.js';
import { coefsOfText } from '../cas/conic.js';

const SIZE = 280;
const PAD = 18;
const NS = 'http://www.w3.org/2000/svg';
const fmt = (x) => String(Math.round(x * 100) / 100).replace('.', ',').replace('-', '−');

export function mountPlot(item, ctx, body) {
  const [xmin, xmax] = item.view.x;
  const [ymin, ymax] = item.view.y;
  const sx = (SIZE - 2 * PAD) / (xmax - xmin);
  const sy = (SIZE - 2 * PAD) / (ymax - ymin);
  const X = (x) => PAD + (x - xmin) * sx;
  const Y = (y) => SIZE - PAD - (y - ymin) * sy;
  const box = h('div.graph-box.plot-box', { html: graphSvg({ xmin, xmax, ymin, ymax, size: SIZE }) });
  const svg = box.querySelector('svg');
  svg.classList.add('plot-svg');
  const layer = document.createElementNS(NS, 'g');
  svg.appendChild(layer);
  const placed = Object.fromEntries(item.place.map((p) => [p.id, []]));
  let pending = null; // first point of a line
  let tool = item.place[0].id;
  let locked = false;
  const hintBox = h('div.lines-hints');
  const hints = hintsBox(item, hintBox);
  const status = h('small.muted.plot-status');

  const el = (name, attrs) => {
    const e = document.createElementNS(NS, name);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    return e;
  };
  // A line through two points, drawn across the view.
  const fullLine = ([P, Q], cls) => {
    const d = [Q[0] - P[0], Q[1] - P[1]];
    const k = 4 * Math.max(xmax - xmin, ymax - ymin) / Math.hypot(...d);
    return el('line', { x1: X(P[0] - k * d[0]), y1: Y(P[1] - k * d[1]), x2: X(P[0] + k * d[0]), y2: Y(P[1] + k * d[1]), class: cls });
  };
  const lineFromABC = ([A, B, C], cls) => {
    const n = Math.hypot(A, B);
    const cx = (xmin + xmax) / 2;
    const cy = (ymin + ymax) / 2;
    const t = (A * cx + B * cy + C) / (n * n);
    const F = [cx - A * t, cy - B * t];
    return fullLine([F, [F[0] - B, F[1] + A]], cls);
  };

  function paint() {
    layer.replaceChildren();
    item.place.forEach((p, k) => {
      for (const g of placed[p.id]) {
        if (p.kind === 'point') {
          layer.appendChild(el('circle', { cx: X(g[0]), cy: Y(g[1]), r: 6, class: `plot-pt plot-c${k}` }));
          const t = el('text', { x: X(g[0]) + 8, y: Y(g[1]) - 8, class: `plot-lab plot-c${k}` });
          t.textContent = p.short || p.label;
          layer.appendChild(t);
        } else {
          layer.appendChild(fullLine(g, `plot-line plot-c${k}`));
          for (const P of g) layer.appendChild(el('circle', { cx: X(P[0]), cy: Y(P[1]), r: 4, class: `plot-pt plot-c${k}` }));
        }
      }
    });
    if (pending) layer.appendChild(el('circle', { cx: X(pending[0]), cy: Y(pending[1]), r: 5, class: 'plot-pending' }));
    const p = item.place.find((x) => x.id === tool);
    const left = p.count - placed[p.id].length;
    status.textContent = left > 0 ? `${p.label} : ${p.kind === 'line' ? (pending ? 'touche un 2e point de la droite' : 'touche deux points de la droite') : 'touche le point'} (encore ${left}).` : `${p.label} : placé. Touche un élément pour l'enlever.`;
    ctx.ready(item.place.every((x) => placed[x.id].length === x.count));
  }

  svg.addEventListener('click', (e) => {
    if (locked) return;
    const r = svg.getBoundingClientRect();
    const px = ((e.clientX - r.left) * SIZE) / r.width;
    const py = ((e.clientY - r.top) * SIZE) / r.height;
    const P = [snap(xmin + (px - PAD) / sx), snap(ymin + (SIZE - PAD - py) / sy)];
    const p = item.place.find((x) => x.id === tool);
    const list = placed[p.id];
    // A tap on something already placed takes it away.
    const near = (Q) => Math.hypot(X(Q[0]) - px, Y(Q[1]) - py) < 10;
    const i = p.kind === 'point' ? list.findIndex(near) : list.findIndex((g) => g.some(near));
    if (i >= 0 && !pending) { list.splice(i, 1); play('tap'); paint(); return; }
    if (list.length >= p.count) return;
    if (p.kind === 'point') list.push(P);
    else if (!pending) pending = P;
    else if (Math.hypot(P[0] - pending[0], P[1] - pending[1]) >= 0.5) { list.push([pending, P]); pending = null; }
    play('tap');
    paint();
  });

  const tools = h('div.plot-tools', item.place.map((p, k) => h(`button.btn.small.plot-tool.plot-c${k}`, {
    type: 'button',
    onclick: () => { tool = p.id; pending = null; tools.querySelectorAll('.plot-tool').forEach((b) => b.classList.toggle('on', b.dataset.id === p.id)); paint(); },
    'data-id': p.id,
  }, `${p.label}${p.count > 1 ? ` (${p.count})` : ''}`)));
  tools.querySelector('.plot-tool')?.classList.add('on');
  body.append(tools, box, status, h('div.step-tools', hints.button), hintBox);
  paint();

  // After checking: the curve and the expected elements.
  function reveal() {
    if (item.equation) {
      const c = coefsOfText(item.equation);
      if (c) {
        const P = (x, y) => c[0] * x * x + c[1] * x * y + c[2] * y * y + c[3] * x + c[4] * y + c[5];
        const path = implicitSegments(P, item.view).map(([a, b, cc, d]) => `M${X(a).toFixed(1)},${Y(b).toFixed(1)}L${X(cc).toFixed(1)},${Y(d).toFixed(1)}`).join('');
        layer.insertBefore(el('path', { d: path, class: 'plot-curve' }), layer.firstChild);
      }
    }
    for (const p of item.place) {
      for (const g of item.expect[p.id] || []) {
        if (p.kind === 'point') layer.appendChild(el('circle', { cx: X(g[0]), cy: Y(g[1]), r: 9, class: 'plot-want' }));
        else layer.appendChild(lineFromABC(g, 'plot-want-line'));
      }
    }
  }

  return {
    check() {
      locked = true;
      box.classList.add('locked');
      const r = checkPlot(item, placed);
      reveal();
      const common = { hintsUsed: hints.used() };
      if (r.ok) return { correct: true, ...common };
      const wrong = r.parts.filter((p) => !p.ok);
      const rule = item.rules?.[wrong[0].id] ?? null;
      return {
        correct: false, rules: rule ? [rule] : [], ambiguous: 1, ...common,
        answerHtml: item.answerHtml || '',
        explainHtml: [rule ? explainRule(rule, null) : '', `<p>${wrong.map((p) => p.message).join('<br>')}</p>`, `<p class="muted">En vert : les éléments attendus, et la courbe.</p>`, solutionHtml(item.solution)].join(''),
      };
    },
  };
}

export { fmt };
