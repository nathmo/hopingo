// Checks of the step U10 item parts (judges param, boundary, transform),
// called by tests/uni-check.js: a line each judge must refuse, built from
// the final line of the first part.

export const VCF_JUDGES = ['param', 'boundary', 'transform'];

// The first component of a tuple moved by 7: off the curve or the surface
// (the tuple after « = » when the line has a label γ(t) = (…)).
function moveTuple(text) {
  const eq = text.search(/=\s*\(/);
  if (eq < 0) return text.replace(/\(\s*/, '(7+');
  return text.slice(0, eq) + text.slice(eq).replace(/\(\s*/, '(7+');
}

export function wrongVcf(cfg, final) {
  if (cfg.kind === 'param') {
    if (/\(.*;.*\)/.test(final) && !/^\s*\(?\s*[a-zθφρψ]\s*(;\s*[a-zθφρψ]\s*)?\)?\s*∈/.test(final)) return moveTuple(final);
    if (cfg.complex && !/∈/.test(final.split(',')[0])) return final.replace(/=\s*/, '= 7+');
    // Bounds alone: the upper bound halved (part of the object is missing).
    return final.replace(/;\s*([^;\]]+)\]/, (m, b) => `; (${b})/2]`);
  }
  if (cfg.kind === 'boundary') return '(t+7 ; 7 ; 7), t ∈ [0 ; 1]';
  return `${final}+1`;
}
