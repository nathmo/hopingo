// c-arc-estimate (module C, part b, step U10): |∫_{C_R} f dz| ≤ longueur ×
// max |f| → 0. Levels 1–3: a proof in blocks (L1 without decoys, L2 with
// the decoys of c_cos_bounded, c_arc_triangle and c_jordan_alpha_sign, L3
// with the lower bound of the denominator to type); level 4: the bounds as
// lines of the judge `arcb` (each line bounds the previous one at every
// point of the arc, R ∈ [3 ; 50]) and the limit (judge `limit`, R → +∞);
// level 5: the left arc of the Laplace inverse (2021, |e^(zt)| ≤ 1 for
// Re z ≤ 0, t > 0). Open variant: the level-4 item as a problem (3 points).
// The bound is the ML bound: it needs deg q ≥ deg p + 2 (with
// deg q = deg p + 1 and α > 0, Jordan's lemma would be needed).

import { CM, rd, SG, L, partsItem, H, examTag, KEYS, pick, asProblem } from './cplx-b-kit.js';
import { blocksItem } from './kit.js';
import { t } from '../../i18n.js';

export const SK = 'c-arc-estimate';
export const SUB_ARC = [SG('numerator', t('majorer le numérateur'), SK), SG('denominator', t('minorer le dénominateur'), SK), SG('ml-bound', t('longueur × max'), SK), SG('limit', t('la borne tend vers 0'), SK)];

// The integrand and its bounds. side: 'up' (α ≥ 0), 'down' (α < 0), 'left' (Laplace).
export function arcData(rng, { laplace = false } = {}) {
  if (laplace) {
    const [a, b] = pick(rng, [[1, 2], [1, 3], [2, 1], [1, 1]]);
    const q = a === b ? `(z+${a})^3` : `(z+${a})^2(z+${b})`;
    const low = a === b ? `(r-${a})^3` : `(r-${a})^2(r-${b})`;
    return {
      id: `L:${a}:${b}`, laplace: true, rv: 'r', arc: [Math.PI / 2, (3 * Math.PI) / 2], side: 'left', f: `e^(zt)/(${q})`, num: 'e^(zt)', q, numBound: '1', low, lowStep: a === b ? `(|z|-${a})^3` : `(|z|-${a})^2(|z|-${b})`,
      len: 'πr', ml: `πr/(${low})`, numHtml: `|e^(zt)| = e^(t Re z) ≤ 1 (Re z ≤ 0, t > 0)`, R: [4, 50], triangle: a === b ? `(r+${a})^3` : `(r+${a})^2(r+${b})`,
    };
  }
  for (let tt = 0; tt < 50; tt++) {
    const kind = pick(rng, ['sq', 'sq', 'q4', 'q4z']);
    const al = pick(rng, [0, 1, 2, 3, -1, -2]);
    const side = al < 0 ? 'down' : 'up';
    const E = al === 0 ? '' : al === 1 ? 'e^(iz)' : al === -1 ? 'e^(-iz)' : `e^(${al}iz)`;
    if (kind === 'sq') {
      const a = pick(rng, [1, 2, 3]);
      const q = `z^2+${a * a}`;
      return {
        id: `sq:${a}:${al}`, rv: 'R', side, al, f: E ? `${E}/(${q})` : `1/(${q})`, num: E || '1', q, numBound: '1', low: `R^2-${a * a}`, lowStep: `|z|^2-${a * a}`,
        len: 'πR', ml: `πR/(R^2-${a * a})`, R: [a + 1, 50], arc: side === 'up' ? [0, Math.PI] : [Math.PI, 2 * Math.PI], triangle: `R^2+${a * a}`,
      };
    }
    const withZ = kind === 'q4z';
    const num = withZ ? (E ? `z${E}` : 'z') : E || '1';
    return {
      id: `${kind}:${al}`, rv: 'R', side, al, f: `${withZ ? (E ? `z${E}` : 'z') : E || '1'}/(z^4+4)`, num, q: 'z^4+4', numBound: withZ ? 'R' : '1', low: 'R^4-4', lowStep: '|z|^4-4',
      len: 'πR', ml: withZ ? 'πR^2/(R^4-4)' : 'πR/(R^4-4)', R: [3, 50], arc: side === 'up' ? [0, Math.PI] : [Math.PI, 2 * Math.PI], triangle: 'R^4+4',
    };
  }
  return null;
}

const arcName = (d) => (d.laplace ? t('le demi-cercle gauche C_r (|z| = r, Re z ≤ 0)') : d.side === 'up' ? t('le demi-cercle supérieur C_R (|z| = R, Im z ≥ 0)') : t('le demi-cercle inférieur C_R (|z| = R, Im z ≤ 0)'));
const numHtml = (d) => d.numHtml || (d.al === 0 || d.al === undefined
  ? (d.numBound === 'R' ? '|z| = R' : t('le numérateur vaut 1'))
  : `|${rd(d.num.replace(/^z/, ''))}| = e^(${d.al > 0 ? '−' : ''}${Math.abs(d.al) === 1 ? '' : Math.abs(d.al)}Im z) ≤ 1 (Im z ${d.al > 0 ? '≥' : '≤'} 0)${d.numBound === 'R' ? ', |z| = R' : ''}`);

// The four parts of the lines version (levels 4, 5 and open).
export function arcParts(d) {
  const base = { kind: 'arcb', arc: d.arc, R: d.R, rv: d.rv, ...(d.laplace ? { params: { t: [0.5, 3] } } : {}) };
  const den = { ...base, rel: '≥', traps: { c_arc_triangle: [d.triangle] } };
  const fb = { ...base, rel: '≤', traps: { c_arc_triangle: [`${d.numBound}/(${d.triangle})`], ...(d.laplace ? {} : {}) } };
  const ml = { ...base, rel: '≤' };
  const lim = { kind: 'limit', v: d.rv, to: '+∞', vars: [d.rv] };
  const N = d.numBound;
  const absQ = `|${d.q}|`;
  return [
    { html: t('Minore le dénominateur sur l\'arc (inégalité triangulaire inverse) :'), ask: `${absQ} ≥`, start: absQ, judge: den, lines: [L(d.lowStep, '|a + b| ≥ |a| − |b|', 'denominator'), L(d.low, `|z| = ${d.rv}`, 'denominator')] },
    { html: t('Majore |f| sur l\'arc :'), ask: '|f(z)| ≤', start: `|${d.f}|`, judge: fb, lines: [d.num === '1' ? null : L(`|${d.num}|/${absQ}`, '|a/b| = |a|/|b|', 'numerator'), L(`${N}/${absQ}`, numHtml(d), 'numerator'), L(`${N}/(${d.low})`, t('Le dénominateur minoré'), 'denominator')].filter(Boolean) },
    { html: t('Longueur de l\'arc : {a}. Majore l\'intégrale :', { a: d.len === 'πr' ? 'πr' : 'πR' }), ask: `|∫| ≤`, start: `${d.len}|${d.f}|`, judge: ml, lines: [L(d.ml, t('Longueur × max'), 'ml-bound')] },
    { html: t('La borne tend-elle vers 0 ?'), ask: `lim (${d.rv} → +∞) =`, start: d.ml, judge: lim, lines: [L('0', t('Degré du dénominateur plus grand'), 'limit')] },
  ];
}

function arcLines(level, rng, opts = {}) {
  const d = arcData(rng, { laplace: level === 5 });
  const parts = arcParts(d);
  return partsItem({
    skill: SK, level,
    prompt: d.laplace ? t('Montre que l\'intégrale de f(z) = {a} sur {b}, tend vers 0 quand {rv} → +∞. (Laplace inverse, t > 0.)', { a: CM(d.f), b: arcName(d), rv: d.rv }) : t('Montre que l\'intégrale de f(z) = {a} sur {b}, tend vers 0 quand {rv} → +∞.', { a: CM(d.f), b: arcName(d), rv: d.rv }),
    parts, keys: [...KEYS, 'anal'], subgoals: SUB_ARC,
    hints: H(t('|∫_{C_R} f dz| ≤ longueur × max |f| : majore le numérateur, minore le dénominateur.'), `|${CM(d.q)}| ≥ ${CM(d.lowStep)} = ${CM(d.low)}`, t('|f(z)| ≤ {a}, donc |∫| ≤ {b}', { a: CM(`${d.numBound}/(${d.low})`), b: CM(d.ml) })),
    key: `${SK}:${level}:${d.id}`, exam: examTag(opts, 3),
    baits: ['c_arc_triangle'],
  });
}

// The proof in blocks (levels 1 to 3).
function arcBlocks(level, rng) {
  const d = arcData(rng);
  const lowML = CM(d.low);
  const blocks = [
    { id: 'n', html: t('Sur C_R : {a}.', { a: numHtml(d) }), needs: [] },
    { id: 'd', html: t('Sur C_R : |{a}| ≥ {b} = {lowML} (inégalité triangulaire inverse).', { a: CM(d.q), b: CM(d.lowStep), lowML }), needs: [] },
    { id: 'm', html: t('Donc |f(z)| ≤ {a} sur C_R.', { a: CM(`${d.numBound}/(${d.low})`) }), needs: ['n', 'd'] },
    { id: 'l', html: t('La longueur de C_R est πR.'), needs: [] },
    { id: 'b', html: `|∫_{C_R} f(z) dz| ≤ πR · max |f| ≤ ${CM(d.ml)}.`, needs: ['m', 'l'] },
    { id: 'z', html: t('{a} → 0 quand R → +∞, donc ∫_{C_R} f(z) dz → 0.', { a: CM(d.ml) }), needs: ['b'] },
  ];
  if (level === 3) {
    // The lower bound of the denominator to type.
    blocks[1] = { id: 'd', html: t('Sur C_R : |{a}| ≥ {b} = … (à compléter, en fonction de R).', { a: CM(d.q), b: CM(d.lowStep) }), needs: [], input: { kind: 'expr', vars: ['R'], expect: d.low, answer: d.low, ask: `|${d.q}| ≥`, domain: { R: { int: [4, 12] } } } };
  }
  if (level >= 2) {
    blocks.push({ id: 'cos', html: t('Sur C_R, |cos z| ≤ 1 et |sin z| ≤ 1, comme sur ℝ.'), distractor: 'c_cos_bounded', why: t('cos z n\'est pas borné sur ℂ : cos(iy) = cosh y → ∞.') });
    blocks.push({ id: 'tri', html: t('|{a}| ≤ {b}, donc 1/|{a}| ≤ 1/({b}).', { a: CM(d.q), b: CM(d.triangle) }), distractor: 'c_arc_triangle', why: t('Pour majorer 1/|q|, il faut minorer |q|, pas le majorer.') });
    if (d.al) blocks.push({ id: 'side', html: d.side === 'up' ? t('|{a}| ≤ 1 sur le demi-cercle inférieur.', { a: CM(d.num.replace(/^z/, '')) }) : t('|{a}| ≤ 1 sur le demi-cercle supérieur.', { a: CM(d.num.replace(/^z/, '')) }), distractor: 'c_jordan_alpha_sign', why: t('|e^(iαz)| = e^(−α Im z) : avec α = {al}, il est borné quand Im z {a} 0, pas de l\'autre côté.', { al: d.al, a: d.al > 0 ? '≥' : '≤' }) });
  }
  const order = ['n', 'd', 'm', 'l', 'b', 'z'];
  return blocksItem({
    skill: SK, level, mode: 'order',
    prompt: level >= 2 ? t('Montre que ∫_{C_R} f(z) dz → 0 quand R → +∞, pour f(z) = {a} et {b}. Touche les blocs dans l\'ordre de la preuve (certains blocs sont faux).', { a: CM(d.f), b: arcName(d) }) : t('Montre que ∫_{C_R} f(z) dz → 0 quand R → +∞, pour f(z) = {a} et {b}. Touche les blocs dans l\'ordre de la preuve.', { a: CM(d.f), b: arcName(d) }),
    blocks: rng.shuffle(blocks), goal: 'z', order,
    hints: H(t('Majore |f| sur l\'arc, puis multiplie par la longueur πR.'), `|${CM(d.q)}| ≥ ${CM(d.low)}`, `|∫| ≤ ${CM(d.ml)}`),
    subgoals: SUB_ARC,
    key: `${level}:${d.id}`,
  });
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'open') return asProblem(arcLines(4, rng, opts), 3);
    if (level <= 3) return arcBlocks(level, rng);
    return arcLines(level, rng, opts);
  },
};
