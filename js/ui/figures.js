// SVG figures: partitioned shapes (to read or to shade) and number lines.

import { Q } from '../math/rational.js';

const NS = 'http://www.w3.org/2000/svg';
const svg = (tag, attrs = {}) => {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
};

function sectorPath(cx, cy, r, a0, a1) {
  const x0 = cx + r * Math.sin(a0);
  const y0 = cy - r * Math.cos(a0);
  const x1 = cx + r * Math.sin(a1);
  const y1 = cy - r * Math.cos(a1);
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} Z`;
}

// One whole split into n parts; returns the svg and its part elements.
function oneShape(spec) {
  const { shape, n } = spec;
  const parts = [];
  let root;
  if (shape === 'circle') {
    root = svg('svg', { viewBox: '0 0 120 120', class: 'fig fig-circle' });
    if (n === 1) {
      const c = svg('circle', { cx: 60, cy: 60, r: 54, class: 'part' });
      root.appendChild(c);
      parts.push(c);
    } else {
      for (let i = 0; i < n; i++) {
        const p = svg('path', { d: sectorPath(60, 60, 54, (2 * Math.PI * i) / n, (2 * Math.PI * (i + 1)) / n), class: 'part' });
        root.appendChild(p);
        parts.push(p);
      }
    }
  } else if (shape === 'bar') {
    root = svg('svg', { viewBox: '0 0 240 60', class: 'fig fig-bar' });
    const w = 232 / n;
    for (let i = 0; i < n; i++) {
      const p = svg('rect', { x: 4 + i * w, y: 4, width: w, height: 52, class: 'part' });
      root.appendChild(p);
      parts.push(p);
    }
  } else {
    const rows = spec.rows || 1;
    const cols = spec.cols || n;
    const cw = 40;
    root = svg('svg', { viewBox: `0 0 ${cols * cw + 8} ${rows * cw + 8}`, class: 'fig fig-grid' });
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const p = svg('rect', { x: 4 + c * cw, y: 4 + r * cw, width: cw, height: cw, class: 'part' });
        root.appendChild(p);
        parts.push(p);
      }
    }
  }
  return { root, parts };
}

// Static figure, k parts shaded across `wholes` copies.
export function shapeFigure(spec) {
  const wrap = document.createElement('div');
  wrap.className = 'figure';
  let left = spec.k;
  for (let w = 0; w < (spec.wholes || 1); w++) {
    const { root, parts } = oneShape(spec);
    parts.forEach((p) => { if (left > 0) { p.classList.add('on'); left--; } });
    wrap.appendChild(root);
  }
  return wrap;
}

// Interactive shading. onChange(count) after each tap.
export function shadeFigure(spec, onChange) {
  const wrap = document.createElement('div');
  wrap.className = 'figure interactive';
  const { root, parts } = oneShape(spec);
  parts.forEach((p) => {
    p.addEventListener('click', () => {
      p.classList.toggle('on');
      onChange(parts.filter((x) => x.classList.contains('on')).length);
    });
  });
  wrap.appendChild(root);
  return { el: wrap, count: () => parts.filter((x) => x.classList.contains('on')).length, parts };
}

// Number line from min (default 0) to max with ticks every 1/den.
// spec.mark is shown; with onPick the student taps a tick to place a point.
export function numberLine({ min = 0, max, den, mark }, { onPick } = {}) {
  const W = 320;
  const pad = 20;
  const ticks = (max - min) * den;
  const step = (W - 2 * pad) / ticks;
  const root = svg('svg', { viewBox: `0 0 ${W} 80`, class: `fig fig-line${onPick ? ' interactive' : ''}` });
  root.appendChild(svg('line', { x1: pad - 8, y1: 40, x2: W - pad + 8, y2: 40, class: 'axis' }));
  let marker = null;
  const placeMarker = (i) => {
    marker?.remove();
    marker = svg('g', { class: 'marker' });
    marker.appendChild(svg('circle', { cx: pad + i * step, cy: 40, r: 8 }));
    root.appendChild(marker);
  };
  for (let i = 0; i <= ticks; i++) {
    const x = pad + i * step;
    const whole = i % den === 0;
    const zero = i + min * den === 0;
    root.appendChild(svg('line', { x1: x, y1: whole ? 26 : 32, x2: x, y2: whole ? 54 : 48, class: `${whole ? 'tick big' : 'tick'}${zero && min < 0 ? ' zero' : ''}` }));
    if (whole) {
      const t = svg('text', { x, y: 72, class: 'tick-label' });
      t.textContent = String(i / den + min).replace('-', '−');
      root.appendChild(t);
    }
    if (onPick) {
      const hit = svg('rect', { x: x - step / 2, y: 10, width: step, height: 50, class: 'hit' });
      hit.addEventListener('click', () => { placeMarker(i); onPick(new Q(i + min * den, den), i); });
      root.appendChild(hit);
    }
  }
  if (mark) placeMarker((mark[0] * den) / mark[1] - min * den);
  const wrap = document.createElement('div');
  wrap.className = 'figure';
  wrap.appendChild(root);
  return { el: wrap, placeMarker };
}

export function figure(spec) {
  if (!spec) return null;
  if (spec.kind === 'shape') return shapeFigure(spec);
  if (spec.kind === 'line') return numberLine(spec).el;
  return null;
}
