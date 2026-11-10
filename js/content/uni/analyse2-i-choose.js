// Generators of module A2, part i (unit `analyse2`, step U6): choosing the
// method (a2-ode-choose, the flowchart) and the other substitutions
// (a2-ode-subst-other: Bernoulli, Euler). Catalogue:
// docs/universite/A2-analyse-2.md.
//
// a2-ode-choose: the box of the flowchart is drawn first (separable,
// linear, homogeneous, constant coefficients, or an equation in two boxes:
// y′ = a(y − y*) or y′ = a(x)y), then an equation of that box, solved by
// the `ode` judge (separated lines, relations, μ, y = …). The decision
// options are the methods; the wrong ones name the traps
// a2_ode_method_separable_sum and a2_ode_method_linear_nonlinear, written
// also in the judge's configuration (cfg._choose) for the lines they give.

import { linesItem, examTag, A2_KEYS } from './a2-kit.js';
import { N, H, E, fr } from './analyse1-e-kit.js';
import { assemble } from './analyse2-i-part.js';
import { q, cmul, sum, expText, blankMatches, blankTail, mcq4, M } from './analyse2-i-kit.js';
import { problemItem } from './kit-problem.js';

const SK = 'a2-ode-choose';
const SUB = [
  { id: 'method', label: 'choisir la méthode', skill: SK },
  { id: 'sep', label: 'séparer et intégrer', skill: 'a2-ode-separable' },
  { id: 'lin', label: 'linéaire du 1er ordre', skill: 'a2-ode-linear1' },
  { id: 'homog', label: 'y = xv', skill: 'a2-ode-homog-subst' },
  { id: 'const2', label: 'coefficients constants', skill: 'a2-ode-const2' },
];

export const FLOWCHART = '<ol class="flow"><li><b>Ordre ?</b> Ordre 2 linéaire à coefficients constants : équation caractéristique.</li>'
  + '<li><b>Séparable ?</b> y′ = g(x)·h(y) : noter les zéros de h, séparer, intégrer.</li>'
  + '<li><b>Linéaire ?</b> y′ = a(x)y + b(x) : si b = 0, y = Ce^{∫a} ; si a et b sont constants, décaler vers la solution constante ; sinon, facteur intégrant.</li>'
  + '<li><b>Homogène ?</b> y′ = F(y/x) : poser y = xv.</li></ol>';

const METHODS = {
  sep: 'Séparer les variables',
  expo: 'Linéaire sans second membre : y = Ce^{∫a}',
  shift: 'Linéaire à coefficients constants : décaler vers la solution constante',
  linear: 'Linéaire : facteur intégrant μ',
  homog: 'Homogène : poser y = xv',
  char: 'Coefficients constants : équation caractéristique',
  reduce: 'Réduction d\'ordre (une solution connue)',
};

const pm = (k) => (k === 1 ? '' : k === -1 ? '-' : String(k));

// One equation of each box: {box, eq, cfg, parts: [{html, ask, start, judge, lines}], valid: {method: quality}, why, sepTrap?, muTrap?}
function chooseData(rng, box) {
  const V = 'x';
  if (box === 'sep') {
    const [g, G] = rng.pick([['2x', 'x^2'], ['3x^2', 'x^3'], ['cos(x)', 'sin(x)'], ['e^x', 'e^x'], ['4x^3', 'x^4'], ['2x', 'x^2']]);
    const s = rng.pick([1, -1]);
    const sg = s > 0 ? g : `-${g}`;
    if (rng.chance(0.35)) {
      // y′ = g(x)(1 + y²): arctan y = G + C.
      const eq = `y'=${s > 0 ? '' : '-'}${g}(1+y^2)`;
      const ode = { kind: 'ode', eq, order: 1, _choose: { mu: [] } };
      return {
        box, eq, valid: { sep: 'good' }, first: E(`dy/(1+y^2) = ${sg} dx`, 'Séparer', 'sep', 'sep'),
        parts: [{ start: eq, judge: ode, lines: [E(`dy/(1+y^2) = ${sg} dx`, 'Séparer', 'sep', 'sep'), E(`arctan(y) = ${s > 0 ? G : `-${G}`} + C`, 'Intégrer', 'sep', 'int'), E(`y = tan(${s > 0 ? G : `-${G}`}+C)`, 'Isoler y', 'sep', 'final')] }],
        why: { linear: `${M('1+y^2')} n'est pas linéaire en y.` },
      };
    }
    const eq = `y'=${s > 0 ? '' : '-'}${g} y^2`;
    const ode = { kind: 'ode', eq, order: 1, _choose: { mu: [`μ = e^(${s > 0 ? '-' : ''}(${G}) y)`] } };
    return {
      box, eq, valid: { sep: 'good' },
      parts: [{ start: eq, judge: ode, lines: [E(`dy/y^2 = ${sg} dx`, 'Séparer (y = 0 est aussi solution)', 'sep', 'sep'), E(`-1/y = ${s > 0 ? G : `-${G}`} + C`, 'Intégrer', 'sep', 'int'), E(`y = ${s > 0 ? '-' : ''}1/(${G}+C)`, 'Isoler y', 'sep', 'final')] }],
      why: { linear: `${M('y^2')} n'est pas linéaire en y : c'est séparable, ${M('dy/y^2')} = …` },
    };
  }
  if (box === 'linear') {
    // y′ = ay + cx with c = a²t: y = Ce^(ax) − atx − t.
    const a = rng.pick([1, 2, -1, -2, 3]);
    const t = rng.pick([1, -1, 2]);
    const c = a * a * t;
    const eq = `y'=${sum([`${pm(a)}y`, cmul(c, 'x')])}`;
    const yp = sum([cmul(q(-a * t), 'x'), N(q(-t))]);
    const ode = { kind: 'ode', eq, order: 1, mu: String(-a), _choose: { sep: [{ P: `1/(${pm(a)}y)`, Q: cmul(c, 'x') }, { P: '1/(y)', Q: cmul(c, 'x') }] } };
    return {
      box, eq, valid: { linear: 'good' },
      parts: [{ start: eq, judge: ode, lines: [
        E(`y'${a > 0 ? '-' : '+'}${pm(Math.abs(a))}y=${cmul(c, 'x')}`, 'Forme y′ + a(x)y = b(x)', 'lin', 'normal'),
        E(`μ = ${expText(-a)}`, 'Facteur intégrant', 'lin', 'mu'),
        E(`y = C ${expText(a)}${yp.startsWith('-') ? '' : '+'}${yp}`, '(μy)′ = μb, intégrer par parties', 'lin', 'final'),
      ] }],
      why: { sep: `${M(sum([`${pm(a)}y`, cmul(c, 'x')]))} est une somme, pas un produit g(x)·h(y). C'est une équation linéaire.` },
    };
  }
  if (box === 'homog') {
    // y′ = y/x + k(y/x)²: x v′ = k v², y = −x/(k ln x + C).
    const k = rng.pick([1, 2, 3, -1]);
    const eq = rng.chance(0.5) ? `y'=y/x${k > 0 ? '+' : '-'}${pm(Math.abs(k))}(y/x)^2` : `y'=(x y${k > 0 ? '+' : '-'}${pm(Math.abs(k))}y^2)/x^2`;
    const veq = `x v'=${pm(k)}v^2`;
    const dom = { x: [0.2, 3] };
    const kl = `${pm(k)}ln(x)`;
    return {
      box, eq, valid: { homog: 'good' },
      parts: [
        { after: [`Avec y = xv, y′ = v + xv′ : l'équation devient ${M(veq)}.`], ask: 'v :', start: eq, judge: { kind: 'ode', eq: veq, unknown: 'v', order: 1, domain: dom, _choose: { mu: [] } }, lines: [
          E(`dv/v^2 = (${k}/x) dx`, 'Séparer', 'homog', 'sep'), E(`-1/v = ${kl} + C`, 'Intégrer', 'homog', 'int'), E(`v = -1/(${kl}+C)`, 'Isoler v', 'homog', 'vfinal')] },
        { html: 'Retour à y = xv :', ask: 'y =', start: eq, judge: { kind: 'ode', eq, order: 1, domain: dom }, lines: [E(`y = -x/(${kl}+C)`, 'y = xv', 'homog', 'final')] },
      ],
      why: { sep: 'y′ n\'est pas un produit g(x)·h(y).', linear: `${M('(y/x)^2')} n'est pas linéaire en y.` },
      linearRule: 'a2_ode_method_linear_nonlinear',
    };
  }
  if (box === 'char') {
    const r1 = rng.int(-3, 2);
    const r2 = rng.int(r1 + 1, 3);
    const p = -(r1 + r2);
    const qq = r1 * r2;
    const eq = `${sum(["y''", cmul(p, "y'"), cmul(qq, 'y')])}=0`;
    const ex = (r) => expText(r);
    return {
      box, eq, valid: { char: 'good' },
      parts: [{ start: eq, judge: { kind: 'ode', eq, order: 2 }, after: [`Équation caractéristique : ${M(`${sum(['r^2', cmul(p, 'r'), N(qq)])}=0`)}.`], lines: [E(`y = ${sum([`C_1${ex(r1) ? ` ${ex(r1)}` : ''}`, `C_2${ex(r2) ? ` ${ex(r2)}` : ''}`])}`, `Racines r = ${fr(r1)} et r = ${fr(r2)}`, 'const2', 'final')] }],
      why: {},
    };
  }
  if (box === 'shift') {
    // y′ = a(y − s): y = s + Ce^(ax).
    const a = rng.pick([1, 2, 3, -1, -2]);
    const s = rng.pick([1, 2, 3, -1, -2, 4]);
    const eq = `y'=${pm(a)}y${-a * s > 0 ? '+' : ''}${-a * s}`;
    const zeq = `z'=${pm(a)}z`;
    return {
      box, eq, valid: { shift: 'good', sep: 'poor', linear: 'poor' },
      parts: [
        { html: `La solution constante est y = ${fr(s)} ; on pose y = ${fr(s)} + z :`, ask: 'z :', start: zeq, judge: { kind: 'ode', eq: zeq, unknown: 'z', order: 1 }, lines: [E(`z = C ${expText(a)}`, 'z′ = az', 'lin', 'zfinal')] },
        { html: 'Retour à y :', ask: 'y =', start: eq, judge: { kind: 'ode', eq, order: 1 }, lines: [E(`y = ${s}+C ${expText(a)}`, `y = ${fr(s)} + z`, 'lin', 'final')] },
      ],
      why: { sep: `Juste aussi (y′ = ${fr(a)}(y − ${fr(s)}) est séparable), mais le décalage vers la solution constante est plus court.`, linear: 'Juste aussi, mais le décalage vers la solution constante est plus court.', expo: 'Il y a un second membre constant : y = Ce^{ax} ne suffit pas.' },
    };
  }
  // expo: y′ = g(x)y, y = Ce^G.
  const [g, G] = rng.pick([['2x', 'x^2'], ['3x^2', 'x^3'], ['cos(x)', 'sin(x)'], ['-2x', '-x^2'], ['1/x', 'ln(x)']]);
  const eq = g === '1/x' ? "y'=y/x" : `y'=${g} y`;
  const dom = g === '1/x' ? { x: [0.2, 3] } : undefined;
  return {
    box: 'expo', eq, valid: { expo: 'good', sep: 'poor', linear: 'poor' },
    parts: [{ start: eq, judge: { kind: 'ode', eq, order: 1, ...(dom ? { domain: dom } : {}) }, lines: [E(g === '1/x' ? 'y = C x' : `y = C e^(${G})`, 'y = Ce^{∫a}', 'lin', 'final')] }],
    why: { sep: 'Juste aussi (séparable), mais y = Ce^{∫a} est plus court.', linear: 'Juste aussi, mais sans second membre y = Ce^{∫a} suffit.' },
  };
}

// The actions of the « choose the action » menus.
const CHOOSE_ACTS = [
  { id: 'sep', label: 'Séparer les variables' }, { id: 'int', label: 'Intégrer les deux côtés' }, { id: 'final', label: 'Isoler y' },
  { id: 'normal', label: 'Écrire y′ + a(x)y = b(x)' }, { id: 'mu', label: 'Calculer le facteur intégrant μ' }, { id: 'vfinal', label: 'Isoler v' },
  { id: 'roots', label: 'Résoudre l\'équation caractéristique' }, { id: 'zfinal', label: 'Résoudre z′ = az' },
];

const BOX_CHOICES = ['sep', 'sep', 'linear', 'linear', 'homog', 'char', 'shift', 'expo'];

// The decision « Quelle méthode ? », with the traps on the wrong options.
function methodDecision(d) {
  const ids = ['sep', 'linear', 'homog', 'char', 'shift', 'expo', 'reduce'];
  const right = Object.keys(d.valid).find((k) => d.valid[k] === 'good');
  const others = ids.filter((id) => id !== right);
  // The right one, the trap options, then others up to 5.
  const pickIds = [right, ...(d.box === 'linear' ? ['sep'] : []), ...(d.box === 'sep' || d.box === 'homog' ? ['linear'] : []), ...others].filter((x, i, a) => a.indexOf(x) === i).slice(0, 5);
  const opt = (id) => {
    const quality = d.valid[id];
    const o = { id, label: METHODS[id], valid: !!quality };
    if (quality === 'poor') Object.assign(o, { quality: 'poor', why: d.why[id] || 'Juste, mais plus long.' });
    if (!quality) {
      o.why = d.why[id] || (id === 'char' ? 'L\'équation n\'est pas d\'ordre 2 à coefficients constants.' : id === 'reduce' ? 'Pas besoin : la réduction d\'ordre sert quand une solution d\'une équation d\'ordre 2 à coefficients variables est connue.' : id === 'homog' ? 'y′ n\'est pas une fonction de y/x seulement.' : id === 'shift' ? 'Ce n\'est pas une équation linéaire à coefficients constants d\'ordre 1.' : id === 'expo' ? 'Ce n\'est pas une équation linéaire sans second membre y′ = a(x)y.' : 'Cette méthode ne s\'applique pas ici.');
      if (id === 'sep' && d.box === 'linear') o.rule = 'a2_ode_method_separable_sum';
      if (id === 'linear' && (d.box === 'sep' || d.box === 'homog')) o.rule = 'a2_ode_method_linear_nonlinear';
    }
    if (id === right) o.ref = true;
    return o;
  };
  return { kind: 'decision', prompt: 'Quelle méthode ?', options: pickIds.map(opt) };
}

// Level 1: the flowchart, question by question.
function yesNo(d) {
  const ask = (prompt, yes, whyNo, whyYes) => ({ kind: 'decision', prompt, options: [
    { id: 'yes', label: 'Oui', valid: yes, why: whyYes }, { id: 'no', label: 'Non', valid: !yes, why: whyNo }] });
  const out = [ask('Est-ce une équation d\'ordre 2 à coefficients constants ?', d.box === 'char', 'Il y a y″ et des coefficients constants.', 'Il n\'y a que y′ : ordre 1.')];
  if (d.box === 'char') return out;
  const sep = ['sep', 'shift', 'expo'].includes(d.box);
  out.push({ ...ask('Est-elle séparable : y′ = g(x)·h(y) ?', sep, 'Écris-la sous la forme g(x)·h(y).', 'Le membre de droite est une somme qui ne se factorise pas en g(x)·h(y).'), ...(d.box === 'linear' ? {} : {}) });
  if (d.box === 'linear') out[1].options[0].rule = 'a2_ode_method_separable_sum';
  if (d.box === 'sep') return out;
  const lin = ['linear', 'shift', 'expo'].includes(d.box);
  out.push(ask('Est-elle linéaire : y′ = a(x)y + b(x) ?', lin, 'y n\'apparaît qu\'au degré 1.', `Il y a ${d.box === 'homog' ? '(y/x)²' : 'y²'} : ce n'est pas linéaire.`));
  if (d.box === 'homog') out[2].options[0].rule = 'a2_ode_method_linear_nonlinear';
  if (lin) return out;
  out.push(ask('Est-elle homogène : y′ = F(y/x) ?', true, 'Chaque terme est une fonction de y/x.', ''));
  return out;
}

function chooseItem(level, rng, opts, d) {
  const parts = d.parts.map((p, i) => ({ ...p, pre: i === 0 ? (level === 1 ? yesNo(d) : level <= 4 ? [methodDecision(d)] : []) : [] }));
  if (level <= 2) {
    for (const p of parts) for (const l of p.lines) Object.assign(l, blankMatches(l.math, /(?<=[=+\s]|[^(^]-)\d+(?=[a-zA-Z(])/g, level === 1 ? 1 : 2));
  }
  const { start, judge, script } = assemble(parts, level, CHOOSE_ACTS);
  const flow = level <= 2 ? `<br>L'organigramme :${FLOWCHART}` : '';
  return linesItem({
    skill: SK, level, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', start, judge, script,
    prompt: `${level === 5 ? 'Résous' : 'Choisis la méthode, puis résous'} ${M(d.eq)} (solution générale).${flow}`,
    hints: H('Suis l\'organigramme : ordre, puis séparable ?, puis linéaire ?, puis homogène ?',
      `Ici : ${METHODS[Object.keys(d.valid).find((k) => d.valid[k] === 'good')]}.`, `${M(d.parts[0].lines[0].math)}`),
    subgoals: SUB, keys: A2_KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SK}:${level}:${d.eq}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

// « Quelle méthode ? » as a multiple choice.
function chooseMcq(rng, opts, d) {
  const dec = methodDecision(d);
  const right = dec.options.find((o) => o.ref);
  const wrongs = dec.options.filter((o) => !o.valid).map((o) => ({ html: o.label, rule: o.rule || null }));
  return mcq4({
    skill: SK, level: 4, prompt: `Quelle est la méthode la plus directe pour résoudre ${M(d.eq)} ?`, right: right.label, wrongs,
    key: `${SK}:mcq:${d.eq}`, solution: [{ html: right.label, note: '' }, { html: M(d.parts.at(-1).lines.at(-1).math), note: 'Solution générale' }],
    exam: examTag(opts), expectedSec: 45,
  }, rng);
}

export function genChoose(level, rng, profile, opts = {}) {
  const box = rng.pick(BOX_CHOICES);
  const d = chooseData(rng, box);
  if (opts.exam === 'mcq') return chooseMcq(rng, opts, d);
  return chooseItem(level, rng, opts, d);
}

// ======================================================================
// a2-ode-subst-other: Bernoulli (z = y^(1−α)) and Euler (x = eᵗ)
// ======================================================================

const SO = 'a2-ode-subst-other';
const SO_SUB = [
  { id: 'substitute', label: 'la substitution', skill: SO },
  { id: 'transform', label: 'l\'équation transformée', skill: SO },
  { id: 'linear', label: 'résoudre l\'équation linéaire', skill: 'a2-ode-linear1' },
  { id: 'const2', label: 'coefficients constants', skill: 'a2-ode-const2' },
  { id: 'back', label: 'revenir à y', skill: SO },
];

// Bernoulli y′ + ay = b(x)y^α, α ∈ {2, 1/2}: built from z.
function bernoulliData(rng) {
  const alpha = rng.pick([2, 2, 2, '1/2']);
  if (alpha === 2) {
    // z = 1/y: z′ − az = −b.
    const a = rng.pick([1, 2, -1, 3]);
    const bk = rng.pick(['1', 'e^x', 'x']);
    let zp;
    if (bk === '1') zp = N(q(1, a)); // z′ − az = −1: z = 1/a
    else if (bk === 'x') zp = sum([cmul(q(1, a), 'x'), N(q(1, a * a))]); // z′ − az = −x
    else zp = a === 1 ? '-x e^x' : cmul(q(-1, 1 - a), 'e^x'); // z′ − az = −eˣ (a = 1: resonance)
    const res = a === 1 && bk === 'e^x';
    const z = res ? '(C-x)e^x' : sum([`C ${expText(a)}`, zp]);
    const zWrong = res ? '(C+x)e^x' : sum([`C ${expText(-a)}`, zp]);
    const eq = `y'${a > 0 ? '+' : '-'}${pm(Math.abs(a))}y=${bk === '1' ? '' : bk === 'x' ? 'x ' : 'e^x '}y^2`;
    const zeq = `z'${a > 0 ? '-' : '+'}${pm(Math.abs(a))}z=-${bk}`;
    return {
      kind: 'bernoulli', alpha: '2', eq, zeq, zsub: 'z = 1/y', z, y: `y = 1/(${z})`, zdash: `z' = ${pm(a)}z-${bk}`, zTail: `-${bk}`, zBlank: res ? '-x' : zp,
      wrongs: [`y = 1/(${zWrong})`, `y = ${z}`, `y = 1/(C ${expText(a)})`], hom: `y = 1/(C ${expText(a)})`,
      domain: { x: [-1.5, 1.5] },
    };
  }
  // α = 1/2: z = √y, z′ + (a/2)z = b/2: y′ + 2y = b√y, z = Ce^(−x) + b/2 > 0
  // for x ≥ 0,5 and |C| ≤ 2 (the judge draws C in [−2 ; 2]).
  const b = rng.pick([4, 6]);
  const z = `C e^(-x)+${b / 2}`;
  return {
    kind: 'bernoulli', alpha: '1/2', eq: `y'+2y=${b}√y`, zeq: `z'+z=${b / 2}`, zsub: 'z = √y', z, y: `y = (${z})^2`, zdash: `z' = ${b / 2}-z`, zTail: '-z', zBlank: String(b / 2),
    wrongs: [`y = (C e^x+${b / 2})^2`, `y = ${z}`, `y = √(${z})`], hom: `y = (C e^(-x))^2`,
    domain: { x: [0.5, 2] },
  };
}

// Euler x²y″ + bxy′ + cy = A·P(k)·xᵏ, roots m₁ ≠ m₂ of m(m − 1) + bm + c.
function eulerData(rng) {
  for (let i = 0; i < 200; i++) {
    const m1 = rng.int(-2, 2);
    const m2 = rng.int(m1 + 1, 3);
    const b = 1 - (m1 + m2);
    const c = m1 * m2;
    const k = rng.pick([1, 2, 3]);
    const Pk = k * (k - 1) + b * k + c;
    if (Pk === 0 || k === m1 || k === m2) continue;
    const A = rng.pick([1, 2, -1, 3]);
    const rhs = cmul(A * Pk, k === 1 ? 'x' : `x^${k}`);
    const lhs = sum(["x^2 y''", cmul(b, "x y'"), cmul(c, 'y')]);
    const eq = `${lhs}=${rhs}`;
    const xm = (m) => (m === 0 ? '' : m === 1 ? 'x' : m < 0 ? `/x${m === -1 ? '' : `^${-m}`}` : `x^${m}`);
    const term = (C, m) => (m === 0 ? C : m < 0 ? `${C}${xm(m)}` : `${C} ${xm(m)}`);
    const yh = sum([term('C_1', m1), term('C_2', m2)]);
    const yp = cmul(A, k === 1 ? 'x' : `x^${k}`);
    // In t (x = eᵗ): y″ + (b − 1)y′ + cy = A·P(k)·e^(kt).
    const teq = `${sum(["y''", cmul(b - 1, "y'"), cmul(c, 'y')])}=${cmul(A * Pk, expText(k, 't'))}`;
    const ty = `y = ${sum([`C_1${expText(m1, 't') ? ` ${expText(m1, 't')}` : ''}`, `C_2${expText(m2, 't') ? ` ${expText(m2, 't')}` : ''}`, cmul(A, expText(k, 't'))])}`;
    return { kind: 'euler', eq, teq, ty, m1, m2, b, c, k, A, char: `${sum(['m^2', cmul(b - 1, 'm'), N(c)])}=0`, roots: `m = ${m1} ou m = ${m2}`, yh, yp, y: `y = ${sum([yh, yp])}` };
  }
  return { kind: 'euler', eq: "x^2 y''+x y'-y=3x^2", teq: "y''-y=3e^(2t)", ty: 'y = C_1 e^t+C_2 e^(-t)+e^(2t)', m1: -1, m2: 1, b: 1, c: -1, k: 2, A: 1, char: 'm^2-1=0', roots: 'm = -1 ou m = 1', yh: 'C_1/x+C_2 x', yp: 'x^2', y: 'y = C_1/x+C_2 x+x^2', fallback: true };
}

const SO_CHOICES = [
  { id: 'subst', label: 'Poser la substitution' }, { id: 'transform', label: 'Écrire l\'équation en z (ou en t)' },
  { id: 'solve', label: 'Résoudre l\'équation transformée' }, { id: 'back', label: 'Revenir à y (et à x)' },
  { id: 'roots', label: 'Équation caractéristique' },
  { id: 'inv', label: 'Écrire z′ = 1/y′', rule: 'a2_ode_homog_derivative', why: 'z est une fonction composée de y : z′ = (dérivée de z par rapport à y)·y′.' },
];

function bernoulliParts(d, level) {
  const zcfg = { kind: 'ode', eq: d.zeq, unknown: 'z', order: 1, domain: d.domain };
  const ycfg = { kind: 'ode', eq: d.eq, order: 1, domain: d.domain };
  const dec = {
    kind: 'decision', prompt: 'Quelle substitution ?', options: [
      { id: 'b', label: `Bernoulli, α = ${d.alpha} : ${d.zsub}`, valid: true },
      { id: 'xv', label: 'Homogène : y = xv', valid: false, why: 'y′ n\'est pas une fonction de y/x.' },
      { id: 'eu', label: 'Euler : x = eᵗ', valid: false, why: 'Euler concerne x²y″ + bxy′ + cy.' },
      { id: 'none', label: 'Aucune : elle est linéaire', valid: false, why: `Le terme en ${d.alpha === '2' ? 'y²' : '√y'} n'est pas linéaire.` },
    ] };
  const lines1 = [E(d.zdash, `${d.zsub}, z′ en fonction de y et y′, puis remplacer`, 'transform', 'transform'), E(`z = ${d.z}`, 'Équation linéaire en z', 'linear', 'solve')];
  if (level <= 2) {
    Object.assign(lines1[0], blankTail(lines1[0].math, level === 1 ? d.zTail : d.zdash.replace(/^z' = /, '')));
    Object.assign(lines1[1], blankTail(lines1[1].math, d.zBlank));
  }
  const yl = E(d.y, `Revenir à y`, 'back', 'back');
  return [
    { start: d.eq, judge: zcfg, notes: level === 1 ? [`Bernoulli avec α = ${d.alpha} : on pose ${d.zsub}.`] : [], pre: level >= 2 && level <= 4 ? [dec] : [], lines: lines1 },
    { html: `Reviens à y (${d.zsub}) :`, ask: 'y =', start: d.eq, judge: ycfg, lines: [yl] },
  ];
}

function eulerParts(d, level) {
  const tcfg = { kind: 'ode', eq: d.teq, v: 't', order: 2 };
  const xcfg = { kind: 'ode', eq: d.eq, order: 2, domain: { x: [0.3, 3] } };
  const dec = {
    kind: 'decision', prompt: 'Quelle substitution ?', options: [
      { id: 'eu', label: 'Euler : x = eᵗ', valid: true },
      { id: 'b', label: 'Bernoulli : z = y^(1−α)', valid: false, why: 'Il n\'y a pas de puissance y^α : l\'équation est linéaire.' },
      { id: 'xv', label: 'Homogène : y = xv', valid: false, why: 'C\'est une équation d\'ordre 2 : y = xv sert pour y′ = F(y/x).' },
    ] };
  const tl = [E(d.teq, 'x = eᵗ : xy′ = dy/dt, x²y″ = d²y/dt² − dy/dt', 'transform', 'transform'), E(d.ty, 'Coefficients constants', 'const2', 'solve')];
  if (level <= 2) Object.assign(tl[0], blankMatches(tl[0].math, /-?\d+(?=y)/g, level === 1 ? 1 : 2));
  return [
    { start: d.eq, judge: tcfg, notes: level === 1 ? ['Euler : on pose x = eᵗ, et y devient une fonction de t.'] : [], pre: level >= 2 && level <= 4 ? [dec] : [], lines: tl },
    { html: 'Reviens à x (eᵗ = x) :', ask: 'y =', start: d.eq, judge: xcfg, lines: [E(d.y, 'e^{mt} = x^m', 'back', 'back')] },
  ];
}

function substItem(level, rng, opts, d, { noHints = false } = {}) {
  const parts = d.kind === 'euler' ? eulerParts(d, level) : bernoulliParts(d, level);
  const { start, judge, script } = assemble(parts, level, SO_CHOICES);
  const isB = d.kind === 'bernoulli';
  return linesItem({
    skill: SO, level, mode: level <= 2 ? 'guided' : level === 3 ? 'tap' : 'free', start, judge, script, noHints,
    prompt: isB ? `Résous ${M(d.eq)} (Bernoulli) : écris l'équation vérifiée par z, résous-la, puis reviens à y.`
      : `Résous ${M(d.eq)} pour x > 0 (Euler) : écris l'équation en t (x = eᵗ), résous-la, puis reviens à x.`,
    hints: isB ? H(`Bernoulli avec α = ${d.alpha} : pose ${d.zsub}.`, `${d.alpha === '2' ? 'z′ = −y′/y²' : 'z′ = y′/(2√y)'}, puis remplace y′ par son expression : une équation linéaire en z.`, M(d.zdash))
      : H('Pose x = eᵗ : x·y′ devient dy/dt et x²·y″ devient d²y/dt² − dy/dt.', `${M(d.teq.replace(/=.*/, ''))} = …`, M(d.teq)),
    subgoals: SO_SUB, keys: A2_KEYS, tapActions: level === 3 ? 'steps' : null,
    key: `${SO}:${level}:${d.eq}`, exam: examTag(opts), fallback: !!d.fallback,
  });
}

function substMcq(rng, opts, d) {
  const isB = d.kind === 'bernoulli';
  const right = M(d.y);
  const tx = (m) => (m === 0 ? '' : ` ${expText(m)}`);
  const wrongs = isB
    ? [{ html: M(d.wrongs[0]), rule: 'a2_ode_homog_derivative' }, { html: M(d.wrongs[1]) }, { html: M(d.wrongs[2]) }]
    : [{ html: M(`y = ${d.yh}`) }, { html: M(`y = ${sum([d.yh, cmul(-d.A, d.k === 1 ? 'x' : `x^${d.k}`)])}`) },
      { html: M(`y = ${sum([`C_1${tx(d.m1)}`, `C_2${tx(d.m2)}`, cmul(d.A, expText(d.k))])}`) }];
  return mcq4({
    skill: SO, level: 4, prompt: `La solution générale de ${M(d.eq)}${isB ? '' : ' (x > 0)'} est :`, right, wrongs,
    fillers: [{ html: M(isB ? d.hom : `y = ${d.yp}`) }, { html: M(isB ? 'y = C e^x' : 'y = C_1 x+C_2') }],
    key: `${SO}:mcq:${d.eq}`, solution: [{ html: isB ? `${d.zsub} : ${M(d.zdash)}` : M(d.teq), note: '' }, { html: right, note: '' }],
    exam: examTag(opts), expectedSec: 180,
  }, rng);
}

export function genSubstOther(level, rng, profile, opts = {}) {
  const pick = () => (rng.chance(0.5) ? bernoulliData(rng) : eulerData(rng));
  if (opts.exam === 'mcq') return substMcq(rng, opts, pick());
  if (level === 5) {
    // One exercise of each kind (catalogue L5).
    const b = substItem(5, rng, {}, bernoulliData(rng), { noHints: true });
    const e = substItem(5, rng, {}, eulerData(rng), { noHints: true });
    return problemItem({ skill: SO, level: 5, prompt: 'Deux équations à ramener à une équation linéaire : Bernoulli, puis Euler.', parts: [{ item: b, points: [2, 1], title: 'Bernoulli' }, { item: e, points: [2, 1], title: 'Euler' }], key: `${b.key}|${e.key}` });
  }
  return substItem(level, rng, opts, pick());
}
