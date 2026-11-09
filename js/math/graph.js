// Coordinate grids as SVG markup (a string, so questions stay plain data
// and multiple-choice options can be small graphs).

const W = 280;

export function graphSvg({ xmin = -5, xmax = 5, ymin = -5, ymax = 5, lines = [], curves = [], points = [], size = W, picks = false, small = false } = {}) {
  const pad = small ? 6 : 18;
  const sx = (size - 2 * pad) / (xmax - xmin);
  const sy = (size - 2 * pad) / (ymax - ymin);
  const X = (x) => pad + (x - xmin) * sx;
  const Y = (y) => size - pad - (y - ymin) * sy;
  const out = [];
  out.push(`<svg class="fig-graph${small ? ' small' : ''}" viewBox="0 0 ${size} ${size}" width="${small ? 120 : size}" height="${small ? 120 : size}" xmlns="http://www.w3.org/2000/svg">`);
  out.push(`<defs><clipPath id="gclip${size}"><rect x="${pad}" y="${pad}" width="${size - 2 * pad}" height="${size - 2 * pad}"/></clipPath></defs>`);
  for (let x = Math.ceil(xmin); x <= xmax; x++) out.push(`<line class="g-grid" x1="${X(x)}" y1="${Y(ymin)}" x2="${X(x)}" y2="${Y(ymax)}"/>`);
  for (let y = Math.ceil(ymin); y <= ymax; y++) out.push(`<line class="g-grid" x1="${X(xmin)}" y1="${Y(y)}" x2="${X(xmax)}" y2="${Y(y)}"/>`);
  out.push(`<line class="g-axis" x1="${X(xmin)}" y1="${Y(0)}" x2="${X(xmax)}" y2="${Y(0)}"/>`);
  out.push(`<line class="g-axis" x1="${X(0)}" y1="${Y(ymin)}" x2="${X(0)}" y2="${Y(ymax)}"/>`);
  if (!small) {
    const step = xmax - xmin > 12 ? 2 : 1;
    for (let x = Math.ceil(xmin); x <= xmax; x += step) if (x) out.push(`<text class="g-lab" x="${X(x)}" y="${Y(0) + 13}">${String(x).replace('-', '−')}</text>`);
    for (let y = Math.ceil(ymin); y <= ymax; y += step) if (y) out.push(`<text class="g-lab" x="${X(0) - 6}" y="${Y(y) + 4}" text-anchor="end">${String(y).replace('-', '−')}</text>`);
    out.push(`<text class="g-lab g-name" x="${X(xmax) - 4}" y="${Y(0) - 6}">x</text><text class="g-lab g-name" x="${X(0) + 6}" y="${Y(ymax) + 10}">y</text>`);
  }
  out.push(`<g clip-path="url(#gclip${size})">`);
  lines.forEach(({ a, b, cls = '' }, i) => {
    out.push(`<line class="g-line g-c${i} ${cls}" x1="${X(xmin)}" y1="${Y(a * xmin + b)}" x2="${X(xmax)}" y2="${Y(a * xmax + b)}"/>`);
  });
  curves.forEach(({ f }, i) => {
    const pts = [];
    for (let k = 0; k <= 80; k++) { const x = xmin + ((xmax - xmin) * k) / 80; pts.push(`${X(x).toFixed(1)},${Y(f(x)).toFixed(1)}`); }
    out.push(`<polyline class="g-line g-c${i + lines.length}" points="${pts.join(' ')}"/>`);
  });
  out.push('</g>');
  for (const [x, y, label] of points) {
    out.push(`<circle class="g-pt" cx="${X(x)}" cy="${Y(y)}" r="${small ? 3 : 5}"/>`);
    if (label) out.push(`<text class="g-lab g-ptlab" x="${X(x) + 7}" y="${Y(y) - 7}">${label}</text>`);
  }
  if (picks) {
    for (let x = Math.ceil(xmin); x <= xmax; x++) {
      for (let y = Math.ceil(ymin); y <= ymax; y++) out.push(`<circle class="g-pick" data-x="${x}" data-y="${y}" cx="${X(x)}" cy="${Y(y)}" r="9"/>`);
    }
  }
  out.push('</svg>');
  return out.join('');
}
