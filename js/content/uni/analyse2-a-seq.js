// Generators of module A2, part a (step U6): a2-rn-sequences (sequences and
// subsequences of ℝⁿ). Catalogue: docs/universite/A2-analyse-2.md.
//
// aₙ has two or three components among cos(nπ/p), sin(nπ/p) (p = 2, 3, 4,
// 6), (−1)ⁿ, 1/n, n/(n + 1). A subsequence a_{Pk+q}, with P a multiple of
// every p, simplifies to constants, (−1)ᵏ·c, 1/(Pk + q) or (Pk + q)/(Pk + q + 1).
// Lines (levels 1 to 4): one part per component, judged by `equiv` in k
// over the integers 0 … 40 (cfg.subst n = Pk + q, so the first line is the
// substitution); then the decision « a_{Pk+q} converge-t-elle ? » and the
// limit of the subsequence that converges (a_{Pk+q} itself, or
// (−1)ᵏ·a_{Pk+q}), judged by `vector`. Level 5 and the exam mcq: which of
// four subsequences converges (format 2021). Exam tf: statements of the
// course, the false ones with a sequence of ℝⁿ as counter-example (prop
// vecSeq, js/judges/a2-examples-a.js).

import { MT, mcq, tfItem, linesItem } from './kit.js';
import { modeOf, H, E, tpl, withMenus, SEG } from './analyse1-e-kit.js';
import { blanks } from './geo-kit.js';
import { t } from '../../i18n.js';

const SK = 'a2-rn-sequences';
const SUB = [
  { id: 'subst', label: t('remplacer n par Pk + q'), skill: 'g3-identities' },
  { id: 'simplify', label: t('simplifier avec la période'), skill: 'g3-identities' },
  { id: 'decide', label: t('converge ou diverge'), skill: SK },
];
const KEYS = ['calcx', 'calcfn', 'seq'];
const K = { vars: ['k', 'n', 'a'] };
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));

// cos and sin of d degrees (multiples of 30 and 45), exact texts.
const TRIG = {
  0: ['1', '0'], 30: ['√3/2', '1/2'], 45: ['√2/2', '√2/2'], 60: ['1/2', '√3/2'], 90: ['0', '1'],
  120: ['-1/2', '√3/2'], 135: ['-√2/2', '√2/2'], 150: ['-√3/2', '1/2'], 180: ['-1', '0'],
  210: ['-√3/2', '-1/2'], 225: ['-√2/2', '-√2/2'], 240: ['-1/2', '-√3/2'], 270: ['0', '-1'],
  300: ['1/2', '-√3/2'], 315: ['√2/2', '-√2/2'], 330: ['√3/2', '-1/2'],
};
// m·π/p as text (π/2, 3π/4, 2π, 0).
function piT(m, p) {
  if (!m) return '0';
  const g = gcd(m, p);
  const a = m / g;
  const b = p / g;
  const top = a === 1 ? 'π' : a === -1 ? '-π' : `${a}π`;
  return b === 1 ? top : `${top}/${b}`;
}
const SUBS = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉', k: 'ₖ', '+': '₊' };
const idxT = (P, q) => (q ? `${P}k+${q}` : `${P}k`);
const neg = (t) => (t === '0' ? '0' : t.startsWith('-') ? t.slice(1) : `-${t}`);

// The components: {text (in n), kind, p?}.
const COMPS = [
  ...[2, 3, 4, 6].flatMap((p) => [{ kind: 'cos', p, text: `cos(nπ/${p})` }, { kind: 'sin', p, text: `sin(nπ/${p})` }]),
  { kind: 'alt', text: '(-1)^n' }, { kind: 'inv', text: '1/n' }, { kind: 'ratio', text: 'n/(n+1)' },
];

// The component at n = Pk + q: {lines: [texts], final, alt, c, conv, limit, target}.
function simplify(comp, P, q) {
  const N = idxT(P, q);
  if (comp.kind === 'cos' || comp.kind === 'sin') {
    const p = comp.p;
    const m = P / p;
    const deg = (((q * 180) / p) % 360 + 360) % 360;
    const c = TRIG[deg][comp.kind === 'cos' ? 0 : 1];
    const alt = m % 2 === 1 && c !== '0';
    const sub = `${comp.kind}((${N})π/${p})`;
    const split = `${comp.kind}(${m === 1 ? '' : m}kπ${q ? `+${piT(q, p)}` : ''})`;
    const final = alt ? (c === '1' ? '(-1)^k' : `(-1)^k×${c}`) : c;
    return { lines: [sub, split, final], final, alt, c, conv: !alt, limit: alt ? null : c, kind: comp.kind };
  }
  if (comp.kind === 'alt') {
    const c = q % 2 ? '-1' : '1';
    const alt = P % 2 === 1;
    const final = alt ? (c === '1' ? '(-1)^k' : '-(-1)^k') : c;
    return { lines: [`(-1)^(${N})`, final], final, alt, c, conv: !alt, limit: alt ? null : c, kind: 'alt' };
  }
  if (comp.kind === 'inv') {
    const final = `1/(${N})`;
    return { lines: [final], final, alt: false, c: '0', conv: true, limit: '0', kind: 'inv', zero: true };
  }
  const final = `(${N})/(${N}+1)`.replace(/\+(\d+)\+1\)$/, (m0, d) => `+${Number(d) + 1})`);
  return { lines: [final], final, alt: false, c: '1', conv: true, limit: '1', kind: 'ratio' };
}

// (−1)ᵏ times a simplified component.
function timesAlt(s) {
  if (s.alt) return { conv: true, limit: s.c, final: s.c };
  if (s.kind === 'inv') return { conv: true, limit: '0' };
  if (s.c === '0') return { conv: true, limit: '0' };
  return { conv: false };
}

const seqML = (comps) => `a<sub>n</sub> = (${comps.map((c) => MT(c.text, K)).join(' ; ')})`;
const subML = (P, q, mult) => MT(`${mult ? '(-1)^k×' : ''}a_(${idxT(P, q)})`, K);
const vecT = (xs) => `(${xs.join(' ; ')})`;
const vecR = (xs) => vecT(xs).replace(/-/g, '−');

// Draw the components and the subsequence. want: 'plain' (a_{Pk+q}
// converges) or 'mult' (it diverges, (−1)ᵏ·a_{Pk+q} converges).
function drawLines(rng, want, nComp) {
  for (let i = 0; i < 200; i++) {
    const comps = rng.shuffle(COMPS).slice(0, nComp);
    const kinds = comps.map((c) => c.kind);
    if (kinds.filter((k) => k === 'inv' || k === 'ratio').length > 1 || new Set(comps.map((c) => c.text)).size < nComp) continue;
    if (!comps.some((c) => c.p || c.kind === 'alt')) continue;
    const ps = comps.filter((c) => c.p).map((c) => c.p);
    const L = ps.reduce((a, b) => (a * b) / gcd(a, b), 1);
    const P = rng.pick([L, 2 * L].filter((x) => x <= 12 && x >= 2).concat(L === 1 ? [2, 3, 4] : []));
    const q = rng.int(0, P - 1);
    if (comps.some((c) => c.kind === 'inv' || c.kind === 'ratio') && q === 0 && P > 6) continue;
    const S = comps.map((c) => simplify(c, P, q));
    // (−1)ᵏ·(−1) is written −(−1)ᵏ, a form the judge does not take as final.
    if (S.some((s) => s.alt && s.c === '-1')) continue;
    const plain = S.every((s) => s.conv);
    const multAll = S.map(timesAlt);
    if (want === 'plain' && !plain) continue;
    if (want === 'mult' && (plain || !multAll.every((m) => m.conv))) continue;
    if (want === 'plain' && S.every((s) => s.kind === 'inv' || s.kind === 'ratio')) continue;
    return { comps, P, q, S, limit: want === 'plain' ? S.map((s) => s.limit) : multAll.map((m) => m.limit) };
  }
  return null;
}
const FALLBACK = (want) => {
  const comps = [{ kind: 'cos', p: 2, text: 'cos(nπ/2)' }, { kind: 'sin', p: 4, text: 'sin(nπ/4)' }];
  const S = comps.map((c) => simplify(c, 4, 1));
  return { comps, P: 4, q: 1, S, limit: S.map(timesAlt).map((m) => m.limit), fallback: true, want: 'mult', wanted: want };
};

const CHOICES = [
  { id: 'subst', label: t('Remplacer n par l\'indice de la sous-suite') },
  { id: 'split', label: t('Séparer les tours complets (multiples de 2π) ou les demi-tours (kπ)') },
  { id: 'const', label: t('Valeur exacte : la composante est constante') },
  { id: 'alt', label: t('La composante alterne : (−1)ᵏ fois une constante') },
  { id: 'osc', label: t('La composante oscille sans régularité'), why: t('Avec l\'indice Pk + q, la période revient à chaque pas : la composante est constante ou alterne.') },
];
const actOf = (s, i, n) => (i === 0 ? 'subst' : i < n - 1 ? 'split' : s.alt ? 'alt' : 'const');

function seqLines(level, rng, opts = {}) {
  const want = rng.chance(0.5) ? 'plain' : 'mult';
  const nComp = level >= 4 && rng.chance(0.3) ? 3 : 2;
  const d = drawLines(rng, want, nComp) ?? FALLBACK(want);
  const kind = d.want || want;
  const N = idxT(d.P, d.q);
  const sub = MT(`a_(${N})`, K);
  const parts = d.comps.map((c, i) => {
    const s = d.S[i];
    const goalT = s.final;
    const judge = {
      kind: 'equiv', vars: ['k', 'n'], domain: { k: { int: [0, 40] }, n: { int: [1, 40] } }, subst: { n: N },
      target: s.alt || s.kind === 'inv' || s.kind === 'ratio' ? 'goal' : 'exact', goal: goalT,
    };
    const lines = s.lines.map((m, j) => {
      const line = E(m, j === 0 ? `n = ${N.replace(/k/, 'k')}` : j < s.lines.length - 1 ? t('Séparer les tours (ou demi-tours) complets') : s.alt ? t('Un demi-tour change le signe : (−1)ᵏ') : t('Valeur exacte'), j === 0 ? 'subst' : 'simplify', actOf(s, j, s.lines.length));
      if (level <= 2) {
        const holes = j === 0 ? [N] : j === s.lines.length - 1 && s.lines.length > 1 ? [level === 1 ? (s.alt ? s.c : s.final) : s.final] : [];
        const b = holes.length && holes[0] !== '1' && holes[0] !== '(-1)^k' ? tpl(m, holes, { vars: ['k', 'n'] }) : { math: m };
        return { ...line, ...b };
      }
      return line;
    });
    const html = i ? t('{n}e composante de {sub} :', { n: i + 1, sub }) : t('1re composante de {sub} :', { sub });
    const ask = i ? t('{n}e composante =', { n: i + 1 }) : t('1re composante =');
    return { html, ask, start: c.text, judge, lines };
  });
  // The decision, then the limit of the subsequence that converges.
  const multML = MT(`(-1)^k×a_(${N})`, K);
  // Decisions are plain text: a₄ₖ₊₁, (−1)ᵏ·a₄ₖ₊₁.
  const subT = `a${[...N].map((c) => SUBS[c] ?? c).join('')}`;
  const decision = {
    kind: 'decision', prompt: t('Laquelle converge : {a} ou (−1)ᵏ·{a} ?', { a: subT }),
    options: [
      { id: 'conv', label: t('{a} : chaque composante converge', { a: subT }), valid: kind === 'plain', why: t('Une composante alterne : (−1)ᵏ·c avec c ≠ 0 n\'a pas de limite.') },
      { id: 'div', label: t('(−1)ᵏ·{a} : une composante de {a} alterne', { a: subT }), valid: kind === 'mult', why: t('Regarde tes composantes : aucune n\'alterne, chacune a une limite. Avec (−1)ᵏ, une composante non nulle se mettrait à alterner.') },
      { id: 'one', label: t('{a} : il suffit qu\'une composante converge', { a: subT }), valid: false, rule: 'a2_seq_one_component', why: t('Il faut que chaque composante converge.') },
    ],
  };
  const lim = vecT(d.limit);
  const limPart = {
    html: t('Limite ℓ de celle qui converge :'), ask: 'ℓ =', start: 'ℓ',
    judge: { kind: 'vector', expect: lim, ...(level === 3 ? { menu: [{ id: 'lim', label: t('Prendre la limite de chaque composante'), valid: true }, { id: 'one', label: t('Prendre la limite d\'une seule composante'), valid: false, rule: 'a2_seq_one_component', why: t('La limite d\'une suite de ℝⁿ se prend composante par composante, toutes.') }] } : {}) },
    lines: [{ ...E(lim, kind === 'plain' ? t('Chaque composante converge') : t('(−1)ᵏ·(−1)ᵏ = 1 : chaque composante devient constante'), 'decide'), ...(level <= 2 ? blanks(lim, [d.limit[d.limit.length - 1]]) : {}) }],
  };
  const script = [];
  parts.forEach((p, i) => {
    const judge = withMenus(p.judge, level, p.start, p.lines, CHOICES);
    if (i === 0) script.push(...p.lines);
    else script.push(SEG(p.html, p.ask, p.start, judge), ...p.lines);
  });
  script.push(SEG(limPart.html, limPart.ask, limPart.start, limPart.judge));
  if (level === 1) script.push({ kind: 'note', html: kind === 'plain' ? t('{sub} converge : chaque composante converge.', { sub }) : t('{sub} diverge (une composante alterne) ; {mult} converge.', { sub, mult: multML }) });
  else script.push(decision);
  script.push(...limPart.lines);
  const per = d.comps.filter((c) => c.p).map((c) => t('{f} est de période {p}', { f: MT(c.text, K), p: 2 * c.p })).join(', ');
  const tableNote = level === 1 && d.comps[0].p ? ` ${t('Valeurs de {f} pour n = 0, 1, …, {m} : {vals}.', { f: MT(d.comps[0].text, K), m: 2 * d.comps[0].p - 1, vals: Array.from({ length: 2 * d.comps[0].p }, (_, n) => TRIG[(n * 180) / d.comps[0].p][d.comps[0].kind === 'cos' ? 0 : 1].replace(/-/g, '−')).join(' ; ') })}` : '';
  const vS = vecR(d.S.map((s) => s.final)).replace(/×/g, '·');
  return linesItem({
    skill: SK, level, mode: modeOf(level), start: parts[0].start, judge: withMenus(parts[0].judge, level, parts[0].start, parts[0].lines, CHOICES), script,
    prompt: t('{a}. Simplifie chaque composante de la sous-suite {sub} (une expression en k, sans n), puis donne la limite de celle des deux suites {sub} ou {mult} qui converge.', { a: seqML(d.comps), sub, mult: MT(`(-1)^k×a_(${N})`, K) }) + tableNote,
    hints: H(t('Remplace n par {N}, puis simplifie avec la période : {per}.', { N: N.replace(/k/, 'k'), per: per || t('(−1)ⁿ change de signe à chaque pas') }),
      (() => { const s = d.S.find((x) => x.lines.length > 1) ?? d.S[0]; return `${MT(s.lines[0], { vars: ['k'] })} = ${MT(s.final, { vars: ['k'] })}`; })(),
      kind === 'plain' ? t('{sub} = {v} ; elle converge.', { sub, v: vS }) : t('{sub} = {v} ; elle diverge, et {mult} → {lim}.', { sub, v: vS, mult: MT(`(-1)^k×a_(${N})`, K), lim: vecR(d.limit) })),
    subgoals: SUB, keys: KEYS, tapActions: level === 3 ? 'steps' : null,
    baits: ['a2_seq_one_component'],
    key: `${SK}:${level}:${d.comps.map((c) => c.text).join(',')}:${N}:${kind}`, fallback: !!d.fallback,
  });
}

// Which of four subsequences converges (level 5, exam mcq).
function seqMcq(level, rng, exam) {
  for (let i = 0; i < 200; i++) {
    const comps = rng.shuffle(COMPS.filter((c) => c.kind !== 'ratio')).slice(0, 2);
    if (!comps.some((c) => c.p) || comps[0].text === comps[1].text) continue;
    const ps = comps.filter((c) => c.p).map((c) => c.p);
    const L = ps.reduce((a, b) => (a * b) / gcd(a, b), 1);
    const cands = [];
    for (const P of [L, 2 * L].filter((x) => x <= 12)) for (let q = 0; q < P; q++) for (const mult of [false, true]) {
      const S = comps.map((c) => simplify(c, P, q));
      const m = mult ? S.map(timesAlt) : S;
      const conv = m.every((x) => x.conv);
      const some = m.some((x) => x.conv);
      cands.push({ P, q, mult, conv, some, html: subML(P, q, mult), limit: conv ? m.map((x) => x.limit) : null });
    }
    const good = rng.shuffle(cands.filter((c) => c.conv));
    const bad = rng.shuffle(cands.filter((c) => !c.conv));
    if (!good.length || bad.length < 3) continue;
    const baited = bad.filter((c) => c.some);
    if (!baited.length) continue;
    const right = good[0];
    const wrongs = [baited[0], ...bad.filter((c) => c !== baited[0])].slice(0, 3);
    if (new Set([right, ...wrongs].map((c) => c.html)).size < 4) continue;
    const options = [{ html: right.html, correct: true }, ...wrongs.map((c) => ({ html: c.html, correct: false, rule: c.some ? 'a2_seq_one_component' : null }))];
    const S = comps.map((c) => simplify(c, right.P, right.q));
    return mcq({
      skill: SK, level, prompt: t('{a}. Laquelle de ces sous-suites converge ?', { a: seqML(comps) }), options,
      key: `mcq:${comps.map((c) => c.text).join(',')}:${right.mult ? '-' : ''}${idxT(right.P, right.q)}`, expectedSec: 150,
      solution: [{ html: (right.mult
        ? t('{sub} = {v} ; avec (−1)ᵏ, chaque composante devient constante : la limite est {lim}. Pour les autres, au moins une composante alterne (une seule composante qui converge ne suffit pas).', { sub: subML(right.P, right.q, false), v: vecR(S.map((s) => s.final)).replace(/×/g, '·'), lim: vecR(right.limit) })
        : t('{sub} = {v} : la limite est {lim}. Pour les autres, au moins une composante alterne (une seule composante qui converge ne suffit pas).', { sub: subML(right.P, right.q, false), v: vecR(S.map((s) => s.final)).replace(/×/g, '·'), lim: vecR(right.limit) })), note: '' }],
      exam: exam ? { format: 'mcq', points: 1 } : false,
    }, rng);
  }
  return mcq({
    skill: SK, level, prompt: t('{a}. Laquelle de ces sous-suites converge ?', { a: seqML([{ text: 'cos(nπ/2)' }, { text: 'sin(nπ/4)' }]) }),
    options: [{ html: subML(4, 1, true), correct: true }, { html: subML(4, 1, false), correct: false, rule: 'a2_seq_one_component' }, { html: subML(2, 1, false), correct: false }, { html: subML(4, 3, false), correct: false, rule: 'a2_seq_one_component' }],
    key: 'mcq:fallback', fallback: true, exam: exam ? { format: 'mcq', points: 1 } : false,
    solution: [{ html: t('a₄ₖ₊₁ = (0 ; (−1)ᵏ√2/2), donc (−1)ᵏ·a₄ₖ₊₁ = (0 ; √2/2) converge.'), note: '' }],
  }, rng);
}

// Statements of the course (exam tf).
const ASK = (dim) => Array.from({ length: dim }, (_, i) => ({ v: `a${i + 1}`, label: i ? t('{n}e composante aₙ =', { n: i + 1 }) : t('1re composante aₙ ='), keys: ['calc', 'seq'] }));
const SEQ_TF = [
  { id: 'bounded', s: t('Toute suite bornée de ℝ³ converge.'), truth: false, dim: 3, test: 'boundedNotConv', answer: { a1: '(-1)^n', a2: '0', a3: '0' }, why: t('Faux : ((−1)ⁿ, 0, 0) est bornée, mais sa 1re composante alterne.') },
  { id: 'bw', s: t('Toute suite bornée de ℝ³ a une sous-suite convergente.'), truth: true, why: t('Vrai : c\'est le théorème de Bolzano-Weierstrass (on extrait une sous-suite qui converge sur chaque composante, l\'une après l\'autre).') },
  { id: 'iff', s: t('Une suite de ℝ² converge si et seulement si chacune de ses composantes converge.'), truth: true, why: t('Vrai : |xᵢ − ℓᵢ| ≤ ‖x − ℓ‖ ≤ |x₁ − ℓ₁| + |x₂ − ℓ₂|.') },
  { id: 'one', s: t('Si une des composantes d\'une suite de ℝ² converge, alors la suite converge.'), truth: false, dim: 2, test: 'oneConv', answer: { a1: '1/n', a2: '(-1)^n' }, rule: 'a2_seq_one_component', why: t('Faux : (1/n, (−1)ⁿ) a une composante qui converge, mais l\'autre alterne.') },
  { id: 'norm', s: t('Si la suite des normes (‖aₙ‖) converge, alors la suite (aₙ) de ℝ² converge.'), truth: false, dim: 2, test: 'normConv', answer: { a1: '(-1)^n', a2: '0' }, why: t('Faux : aₙ = ((−1)ⁿ, 0) a ‖aₙ‖ = 1, mais elle ne converge pas.') },
  { id: 'limnorm', s: t('Si aₙ → ℓ dans ℝⁿ, alors ‖aₙ‖ → ‖ℓ‖.'), truth: true, why: t('Vrai : |‖aₙ‖ − ‖ℓ‖| ≤ ‖aₙ − ℓ‖ → 0.') },
  { id: 'subs', s: t('Si (aₙ) converge vers ℓ dans ℝⁿ, toutes ses sous-suites convergent vers ℓ.'), truth: true, why: t('Vrai : comme à une variable, sur chaque composante.') },
];
function seqTf(rng) {
  const T = rng.pick(SEQ_TF);
  const counter = T.truth ? null : { kind: 'a2', prop: 'vecSeq', params: { dim: T.dim, test: T.test }, ask: ASK(T.dim), answer: T.answer };
  return tfItem({
    skill: SK, level: 4, statement: T.s, truth: T.truth, counter, ruleIfTrue: T.rule || null,
    prompt: T.truth ? undefined : t('Vrai ou faux ? Si c\'est faux, donne une suite qui le montre, composante par composante (en n).'),
    explanation: T.why, exam: { format: 'tf', points: 1 }, key: T.id,
  });
}

export function sequencesItem(level, rng, profile, opts = {}) {
  if (opts.exam === 'tf') return seqTf(rng);
  if (opts.exam === 'mcq') return seqMcq(4, rng, true);
  if (level === 5) return { ...seqMcq(5, rng, false), noHints: true, hints: [] };
  return seqLines(level, rng, opts);
}
