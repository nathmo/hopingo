// Simulations (spec §16.3, convention 9 of docs/universite/P-probabilites.md,
// step U7): « Vérifier en simulant ». The experiment of an item is drawn
// n times (10 000 by default) with makeRng and the item's seed, and the
// frequency of the event is shown next to the answer. Pure, no DOM; the
// button and the histogram are in js/ui/interpret.js.
//
// item.simulate = {model, …params, event, given?, draws?, label?} (draws: number of
// experiments, 10 000 by default; n is a parameter of binom and sum)
//   model 'urn'     {balls: {R: 5, B: 3}, draw: 3, replace: false}   X = number of balls of colour `count`
//   model 'dice'    {dice: 2, faces: 6, stat: 'sum' | 'max' | 'min' | 'six'}   X = that statistic
//   model 'binom'   {n, p}            model 'poisson' {lambda}       model 'geom' {p, from: 0 | 1}
//   model 'normal'  {mu, sigma}       model 'exp'     {lambda}       model 'unif' {a, b}
//   model 'sum'     {of: model, n}    X = sum of n independent draws of `of` (central limit)
//   model 'bayes'   {prev, sens, fpr, tests: 1 | 2}   X = 1 when ill; the event asks
//                   « ill » and `given` « every test positive »
//   model 'system'  {p: [..], kind: 'series' | 'parallel'}   X = 1 when the system works
//   event: {op: 'eq' | 'ne' | 'le' | 'lt' | 'ge' | 'gt' | 'between', k?, a?, b?, count?}
//   given: an event the draw must meet (conditional frequency)
// simulate(spec, seed) → {hits, kept, n, freq, hist: [{x, count}] | null, values?}

import { makeRng } from '../content/random.js';

const gauss = (rng) => {
  let u = 0;
  while (u === 0) u = rng.next();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rng.next());
};

// One draw of X (and, for 'bayes', the tests).
function drawOnce(spec, rng) {
  switch (spec.model) {
    case 'urn': {
      const pool = Object.entries(spec.balls).flatMap(([c, k]) => Array(k).fill(c));
      let count = 0;
      for (let i = 0; i < spec.draw; i++) {
        const j = Math.floor(rng.next() * pool.length);
        if (pool[j] === (spec.count ?? Object.keys(spec.balls)[0])) count++;
        if (!spec.replace) pool.splice(j, 1);
      }
      return { x: count };
    }
    case 'dice': {
      const faces = spec.faces ?? 6;
      const v = Array.from({ length: spec.dice ?? 2 }, () => 1 + Math.floor(rng.next() * faces));
      const stat = spec.stat ?? 'sum';
      const x = stat === 'max' ? Math.max(...v) : stat === 'min' ? Math.min(...v) : stat === 'six' ? v.filter((d) => d === faces).length : v.reduce((s, d) => s + d, 0);
      return { x };
    }
    case 'binom': {
      let k = 0;
      for (let i = 0; i < spec.n; i++) if (rng.next() < spec.p) k++;
      return { x: k };
    }
    case 'poisson': {
      const L = Math.exp(-spec.lambda);
      let k = 0;
      let p = 1;
      do { k++; p *= rng.next(); } while (p > L);
      return { x: k - 1 };
    }
    case 'geom': {
      let k = 0;
      while (rng.next() >= spec.p) k++;
      return { x: k + (spec.from ?? 0) };
    }
    case 'normal': return { x: spec.mu + spec.sigma * gauss(rng) };
    case 'exp': return { x: -Math.log(1 - rng.next()) / spec.lambda };
    case 'unif': return { x: spec.a + (spec.b - spec.a) * rng.next() };
    case 'sum': {
      let s = 0;
      for (let i = 0; i < spec.n; i++) s += drawOnce(spec.of, rng).x;
      return { x: s };
    }
    case 'bayes': {
      const ill = rng.next() < spec.prev;
      const tests = Array.from({ length: spec.tests ?? 1 }, () => rng.next() < (ill ? spec.sens : spec.fpr));
      return { x: ill ? 1 : 0, positive: tests.every(Boolean) };
    }
    case 'system': {
      const ok = spec.p.map((p) => rng.next() < p);
      return { x: (spec.kind === 'series' ? ok.every(Boolean) : ok.some(Boolean)) ? 1 : 0 };
    }
    default: throw new Error(`Modèle inconnu : ${spec.model}`);
  }
}

export function holds(ev, d) {
  if (!ev) return true;
  if (ev.positive !== undefined) return d.positive === ev.positive;
  const x = d.x;
  switch (ev.op) {
    case 'eq': return Math.abs(x - ev.k) < 1e-9;
    case 'ne': return Math.abs(x - ev.k) >= 1e-9;
    case 'le': return x <= ev.k + 1e-9;
    case 'lt': return x < ev.k - 1e-9;
    case 'ge': return x >= ev.k - 1e-9;
    case 'gt': return x > ev.k + 1e-9;
    case 'between': return x > ev.a && x <= ev.b;
    default: return false;
  }
}

const DISCRETE = new Set(['urn', 'dice', 'binom', 'poisson', 'geom', 'bayes', 'system']);

export function simulate(spec, seed = 1, n = spec.draws ?? 10000) {
  const rng = makeRng(seed);
  let hits = 0;
  let kept = 0;
  const counts = new Map();
  const values = [];
  for (let i = 0; i < n; i++) {
    const d = drawOnce(spec, rng);
    if (!holds(spec.given, d)) continue;
    kept++;
    if (holds(spec.event, d)) hits++;
    if (DISCRETE.has(spec.model) || (spec.model === 'sum' && DISCRETE.has(spec.of.model))) counts.set(d.x, (counts.get(d.x) || 0) + 1);
    else values.push(d.x);
  }
  let hist = null;
  if (counts.size && counts.size <= 60) hist = [...counts.entries()].sort((a, b) => a[0] - b[0]).map(([x, count]) => ({ x, count }));
  else if (values.length || counts.size) {
    // Continuous (or too many values): 24 classes between the 1st and 99th centiles.
    const xs = values.length ? values.sort((a, b) => a - b) : [...counts.entries()].flatMap(([x, c]) => Array(c).fill(x)).sort((a, b) => a - b);
    const lo = xs[Math.floor(0.005 * xs.length)];
    const hi = xs[Math.floor(0.995 * xs.length) - 1] ?? xs[xs.length - 1];
    const w = (hi - lo) / 24 || 1;
    hist = Array.from({ length: 24 }, (_, k) => ({ x: lo + (k + 0.5) * w, count: 0 }));
    for (const x of xs) { const k = Math.floor((x - lo) / w); if (k >= 0 && k < 24) hist[k].count++; }
  }
  return { hits, kept, n, freq: kept ? hits / kept : NaN, hist };
}

// The seed of an item (its key), for a reproducible simulation.
export function seedOfKey(key) {
  let h = 2166136261;
  for (const c of String(key)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
