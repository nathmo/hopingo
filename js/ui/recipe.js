// The 6-step physics problem (« la recette », docs/plan-physique.md).
// Judge: js/physics/recipe.js. Item: js/content/physique/recette.js.
//
// One screen: a strip of the steps, the step being done, a footer with its
// keypad and its button. Steps already done stay open: the student can go
// back (step 1 to remove a formula, step 3 to fix the algebra) and the later
// steps are refreshed. Steps 1 and 2 answer at once; steps 3 to 5 follow
// item.feedback ('live', 'leave', 'end'); everything is graded at the end.

import { h, html, play } from './dom.js';
import { t } from '../i18n.js';
import { MathInput, registerChunks, renderChars } from './keypad.js';
import { parse, toHtml, symbolsIn, evaluate } from '../physics/expr.js';
import { QUANTITIES, symHtml, quantityOf, dimsOf } from '../physics/quantities.js';
import { formatDim, parseUnit, dimEq } from '../physics/units.js';
import { checkPhys } from '../physics/checker.js';
import {
  step1Targets, judgePick, judgeStep1, judgeSI, judgeRemove, expectedRoles, judgeStep2,
  judgeAlgebraLine, dimOfExpr, judgeUnitLine, judgeUnitVerdict, judgeEstimateLine, judgeEstimate,
  valueOf, coherent, judgeVerdict, minEnds,
} from '../physics/recipe.js';
import { situationsOf } from '../content/physique/problems.js';
import { cancelledOf, estimateOf } from '../content/physique/recette.js';
import { nice, num, qty, unitText, sci } from '../content/physique/format.js';
import { holds, equalsSymbol } from '../physics/relations.js';

// Physics symbols are one key each, drawn with their subscript.
const chunked = new Set();
function registerSymbols(symbols) {
  const map = {};
  for (const s of symbols) if (s.length > 1 && !chunked.has(s)) { map[s] = symHtml(s); chunked.add(s); }
  registerChunks(map);
}
registerSymbols(Object.keys(QUANTITIES));

const STEP_NAMES = ['Trier', 'Chemin', 'Algèbre', 'Unités', 'Approximation', 'Nombres et verdict', 'Fourchette'];
const ROLE_NAMES = { connue: 'connue', inconnue: 'inconnue', pont: 'pont' };
const DIGITS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
const POINTS = { 1: 1, 2: 2, 3: 3, 4: 1, 5: 1, 6: 2 };

const M = (inner) => `<span class="m">${inner}</span>`;

export function mountRecipe(item, ctx, body, { explainRule, solutionHtml }) {
  const pb = item.problem;
  registerSymbols(pb.symbols);
  const S = pb.symbols;
  const F = (src) => M(toHtml(parse(src, S)));
  const sits = situationsOf(pb);
  const active = item.active;
  const steps = active.includes(7) && active.length === 1 ? [1, 2, 3, 4, 5, 6, 7] : [1, 2, 3, 4, 5, 6, ...(active.includes(7) ? [7] : [])];
  const isActive = (k) => active.includes(k);
  const live = item.feedback === 'live';

  // ---------- state ----------
  const st = {
    step: active[0],
    reached: active[0],
    kept: item.sheet === 'remove' ? pb.sheet.map((f) => f.src) : [],
    si: {}, // sym → true when written in SI
    marks: {},
    color: 'connue',
    alg: [], // {raw, html, res}
    final: null, // expression node
    cancel: null, // answer to « what does it mean »
    units: [],
    unitVerdict: null,
    est: [],
    estimate: null,
    verdict: null,
    answer: null,
    ends: {},
    digits: null,
    rules: [],
    nudges: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
    done: false,
  };
  const note = (k, rule) => { st.nudges[k] += 1; if (rule && !st.rules.includes(rule)) st.rules.push(rule); };

  // Steps before the first active one are shown done.
  const first = active[0];
  if (first > 1) {
    st.kept = first > 2 ? [...pb.formulas] : step1Targets(pb);
    for (const d of pb.data) st.si[d.sym] = true;
  }
  if (first > 2) st.marks = Object.fromEntries(Object.entries(expectedRoles(pb)).filter(([, r]) => r !== 'libre'));
  if (first > 3) {
    const expr = item.shown ? parse(item.shown.exprText, S) : parse(pb.ref, S).sides[1];
    st.final = expr;
    st.alg = [{ raw: '', html: M(`${symHtml(pb.find)}<span class="m-op">=</span>${toHtml(expr)}`), res: { kind: 'final' } }];
  }
  if (first > 4) { st.unitVerdict = true; }
  if (first > 5) st.estimate = item.shown?.estimate ?? Number(estimateOf(pb, st.final).toPrecision(1));
  if (first > 6) { st.verdict = true; }

  // ---------- layout ----------
  const strip = h('div.recipe-strip');
  const panel = h('div.recipe-panel');
  const say = h('div.step-feedback');
  body.append(strip, panel, say);
  const keypadSlot = h('div.recipe-keys');
  const button = h('button.btn.primary.wide', { type: 'button' });
  const footer = h('div.steps-footer', keypadSlot, button);
  let input = null;

  const message = (msg, kind = 'info') => { say.className = `step-feedback ${kind}`; say.innerHTML = msg ? `<p>${msg}</p>` : ''; };
  const nudge = (k, res) => { note(k, res.rule); play('bad'); message(res.message, 'bad'); };

  function drawStrip() {
    strip.innerHTML = '';
    for (const k of steps) {
      const can = k <= st.reached;
      const cls = `recipe-tab${k === st.step ? ' current' : ''}${k < st.reached ? ' done' : ''}${isActive(k) ? '' : ' shown'}`;
      strip.append(h(`button.${cls.split(' ').join('.')}`, {
        type: 'button', disabled: !can || st.done,
        onclick: () => { if (can) go(k); },
      }, h('b', String(k)), h('span', t(STEP_NAMES[k - 1]))));
    }
  }

  function go(k) {
    st.step = k;
    st.reached = Math.max(st.reached, k);
    message('');
    draw();
  }

  // The next step the student does, or the end.
  function advance() {
    const nextActive = active.find((k) => k > st.step);
    if (nextActive == null) return finish();
    // Shown steps between are filled from the student's own work.
    go(nextActive);
  }

  function setKeys(keys, placeholder, onEnter) {
    input = new MathInput({ keysets: [{ id: 'phys', keys }], placeholder, onEnter });
    keypadSlot.innerHTML = '';
    keypadSlot.append(input.keypad());
    return input;
  }
  const noKeys = () => { input = null; keypadSlot.innerHTML = ''; };

  function draw() {
    drawStrip();
    panel.innerHTML = '';
    noKeys();
    button.disabled = false;
    ({ 1: draw1, 2: draw2, 3: draw3, 4: draw4, 5: draw5, 6: draw6, 7: draw7 })[st.step]();
  }

  // ---------- step 1: sort ----------
  function dataRow(d) {
    const shown = `${M(symHtml(d.sym))} = ${num(d.shown)} ${unitText(d.unit)}`;
    const siU = unitText(quantityOf(d.sym)?.unit ?? '');
    const right = d.isSI ? '' : st.si[d.sym] ? ` = <b>${nice(d.si, 4)} ${siU}</b>` : ` = … ${siU}`;
    return h(`div.recipe-datum${!d.isSI && !st.si[d.sym] ? '.todo' : ''}`, html(`${shown}${right}`));
  }
  function nextToConvert() { return pb.data.find((d) => !d.isSI && !st.si[d.sym]); }

  function sheetList(mode) {
    const list = h('div.recipe-sheet');
    for (const f of pb.sheet) {
      const kept = st.kept.includes(f.src);
      if (mode === 'kept' && !kept) continue;
      const b = h(`button.recipe-formula${kept ? '.kept' : ''}`, { type: 'button', html: F(f.src) });
      if (mode === 'pick') {
        b.addEventListener('click', () => {
          if (kept) { st.kept = st.kept.filter((x) => x !== f.src); draw(); return; }
          const r = judgePick(pb, f.src);
          if (!r.ok) { nudge(1, r); return; }
          st.kept.push(f.src);
          play('tap');
          draw();
        });
      } else if (mode === 'kept' || mode === 'remove') {
        b.append(h('span.recipe-x', '✕'));
        b.addEventListener('click', () => removeFormula(f.src));
      }
      list.append(b);
    }
    return list;
  }

  function removeFormula(src) {
    const r = judgeRemove(pb, src);
    if (!r.ok) { nudge(st.step, r); return; }
    st.kept = st.kept.filter((x) => x !== src);
    for (const s of Object.keys(st.marks)) if (!st.kept.some((f) => symbolsIn(parse(f, S)).has(s))) delete st.marks[s];
    play('tap');
    message('');
    draw();
  }

  function draw1() {
    const pick = item.sheet === 'pick' && isActive(1);
    panel.append(
      h('p.recipe-ask', html(pick
        ? t('Touche les formules qui ont au moins une lettre en commun avec l\'énoncé (une donnée ou ce qu\'on cherche).')
        : t('La feuille de formules est donnée. Tu retireras à l\'étape 2 celles qui ne servent pas.'))),
      sheetList(pick ? 'pick' : 'show'),
      h('p.recipe-ask', html(t('Les données, en unités SI :'))),
      h('div.recipe-data', pb.data.map(dataRow)),
      h('p.recipe-find', html(t('On cherche : {s}', { s: M(symHtml(pb.find)) }))));
    const d = nextToConvert();
    if (d && isActive(1)) {
      const siU = unitText(quantityOf(d.sym)?.unit ?? '');
      setKeys([...DIGITS.slice(0, 9), ',', DIGITS[9], '×', '^', '-', 'back', 'left', 'right'], t('{s} en {u}', { s: d.sym, u: siU }), () => convert(d));
      button.textContent = t('Valider la conversion');
      button.onclick = () => convert(d);
      return;
    }
    button.textContent = t('Étape suivante');
    button.onclick = () => {
      if (!isActive(1)) { advance(); return; }
      if (pick) {
        const r = judgeStep1(pb, st.kept);
        if (!r.ok) { nudge(1, r); return; }
      }
      advance();
    };
  }

  function convert(d) {
    if (!input?.value) return;
    const r = judgeSI(d, input.value);
    if (r.parse) { input.flash(); message(r.message, 'bad'); return; }
    if (!r.ok) { nudge(1, r); return; }
    st.si[d.sym] = true;
    play('good');
    message('');
    draw();
  }

  // ---------- step 2: the path ----------
  function draw2() {
    const colors = h('div.recipe-colors', ['connue', 'inconnue', 'pont', null].map((c) => h(`button.recipe-color.${c || 'none'}${st.color === c ? '.on' : ''}`, {
      type: 'button', onclick: () => { st.color = c; draw(); },
    }, c ? t(ROLE_NAMES[c]) : t('effacer'))));
    const list = h('div.recipe-sheet');
    for (const src of st.kept) {
      const node = parse(src, S);
      const htmlF = toHtml(node, { sym: (s, inner) => `<button type="button" class="hl ${st.marks[s] || ''}" data-sym="${s}">${inner}</button>` });
      const row = h('div.recipe-formula.kept', html(M(htmlF)), isActive(2) ? h('button.recipe-x', { type: 'button', onclick: () => removeFormula(src), title: t('Retirer') }, '✕') : null);
      row.querySelectorAll('.hl').forEach((b) => b.addEventListener('click', () => {
        if (!isActive(2) || st.step !== 2) return;
        const s = b.dataset.sym;
        if (st.color) st.marks[s] = st.color; else delete st.marks[s];
        play('tap');
        draw();
      }));
      list.append(row);
    }
    panel.append(
      h('p.recipe-ask', html(t('Surligne chaque lettre : <b>connue</b> (donnée), <b>inconnue</b> (cherchée), <b>pont</b> (ni donnée, ni cherchée, mais dans deux formules). Retire avec ✕ les formules qui ne servent pas.'))),
      colors, list,
      h('p.recipe-find', html(t('On cherche : {s}', { s: M(symHtml(pb.find)) }))));
    button.textContent = t('Étape suivante');
    button.onclick = () => {
      if (!isActive(2)) { advance(); return; }
      const r = judgeStep2(pb, st.kept, st.marks);
      if (!r.ok) { nudge(2, r); return; }
      play('good');
      advance();
    };
  }

  // ---------- step 3: algebra ----------
  const algKeys = () => {
    const letters = [...new Set(pb.formulas.flatMap((f) => [...symbolsIn(parse(f, S))]))];
    return [...letters, '=', 'frac', '^', '√', '(', ')', '×', '+', '-', ...DIGITS.slice(0, 9), DIGITS[9], 'back', 'left', 'right'];
  };
  const lineRow = (l, sign = '') => h(`div.step-line${l.flag ? `.${l.flag}` : ''}`, sign ? h('span.eq', sign) : null, html(l.html), l.note ? h('span.step-note', l.note) : null);

  function draw3() {
    panel.append(h('div.recipe-formulas', html(pb.formulas.map(F).join(' &nbsp; '))));
    panel.append(h('p.recipe-ask', html(t('Combine les formules et isole {s}. <b>Que des lettres</b> : termine par une ligne {s} = …', { s: M(symHtml(pb.find)) }))));
    const hist = h('div.steps-history', st.alg.map((l) => lineRow(l)));
    panel.append(hist);
    if (st.final && cancelledOf(pb) && isActive(3)) panel.append(cancelQuestion());
    if (!isActive(3)) { button.textContent = t('Étape suivante'); button.onclick = advance; return; }
    setKeys(algKeys(), t('une ligne d\'algèbre'), addAlg);
    panel.append(h('div.step-tools',
      h('button.btn.small.ghost', { type: 'button', onclick: () => { const last = st.alg[st.alg.length - 1]; if (last?.raw) input.set(last.raw); } }, t('⧉ Recopier la ligne')),
      h('button.btn.small.ghost', { type: 'button', onclick: () => { st.alg.pop(); st.final = null; st.cancel = null; refreshFinal(); draw(); } }, t('Effacer la dernière ligne'))));
    button.textContent = t('Étape suivante');
    button.onclick = leave3;
  }

  function addAlg() {
    if (!input?.value) return;
    const raw = input.value;
    const res = judgeAlgebraLine(pb, sits, input.chars);
    if (res.kind === 'parse' || res.kind === 'numbers') { input.flash(); if (res.rule) note(3, res.rule); message(res.message, 'bad'); return; }
    if (res.kind === 'wrong' && live) { nudge(3, res); return; }
    const l = { raw, chars: [...input.chars], html: M(toHtml(parse(input.chars, S))), res };
    if (res.kind === 'wrong') note(3, res.rule);
    if (res.notice) { l.note = res.notice; note(3, res.rule); }
    st.alg.push(l);
    play('tap');
    refreshFinal();
    message(res.notice && live ? res.notice : '');
    input.set('');
    draw();
  }

  // The last line « inconnue = lettres connues » is the expression of the
  // problem; changing it refreshes the later steps.
  function refreshFinal() {
    const last = st.alg[st.alg.length - 1];
    const before = st.final;
    st.final = last ? (last.res.expr || finalOf(last)) : null;
    if (before === st.final) return;
    // Later steps were about the old expression.
    if (isActive(4)) { st.units = []; st.unitVerdict = null; }
    if (isActive(5)) { st.est = []; st.estimate = null; }
    st.verdict = null;
    st.answer = null;
  }
  // In quiet modes a wrong last line is still the student's expression.
  function finalOf(l) {
    let node;
    try { node = parse(l.chars ?? l.raw, S); } catch { return null; }
    if (node.t !== 'eq' || node.sides.length !== 2) return null;
    const [a, b] = node.sides;
    if (a.t === 'sym' && a.s === pb.find && [...symbolsIn(b)].every((x) => pb.given.includes(x))) return b;
    return null;
  }

  function cancelQuestion() {
    const sym = cancelledOf(pb);
    const options = [
      { id: 'right', text: pb.cancels[sym] },
      { id: 'prop', text: t('Le résultat est proportionnel à {s}.', { s: symHtml(sym) }) },
      { id: 'none', text: t('Rien : une lettre qui disparaît ne veut rien dire.') },
    ];
    const box = h('div.recipe-cancel', h('p', html(t('{s} s\'est simplifiée. Qu\'est-ce que ça veut dire ?', { s: M(symHtml(sym)) }))));
    for (const o of options) {
      box.append(h(`button.choice${st.cancel === o.id ? '.selected' : ''}`, {
        type: 'button', html: `<span class="choice-body">${o.text}</span>`,
        onclick: () => {
          st.cancel = o.id;
          if (o.id !== 'right' && item.feedback !== 'end') { nudge(3, { rule: 'ph_heavier_faster', message: t('Non : {s} est des deux côtés de l\'égalité, elle se simplifie. Le résultat ne dépend donc pas d\'elle.', { s: symHtml(sym) }) }); st.cancel = null; return; }
          play('tap');
          draw();
        },
      }));
    }
    return box;
  }

  function leave3() {
    if (!st.final) { message(t('Termine par une ligne {s} = … avec seulement des lettres connues.', { s: M(symHtml(pb.find)) }), 'bad'); return; }
    if (cancelledOf(pb) && !st.cancel) { message(t('Réponds d\'abord à la question sur ce qui s\'est simplifié.'), 'bad'); return; }
    if (item.feedback === 'leave' && !st.left3) {
      const bad = st.alg.findIndex((l) => l.res.kind === 'wrong') ;
      const finalOk = equalsSymbol(st.final, pb.find, sits);
      if (bad >= 0 || !finalOk) {
        st.left3 = true;
        if (bad >= 0) st.alg[bad].flag = 'bad';
        note(3, null);
        message(t('Il y a une erreur dans ton algèbre. Relis tes lignes : chacune doit suivre des formules.'), 'bad');
        draw();
        return;
      }
    }
    advance();
  }

  // ---------- step 4: units ----------
  const exprOfStudent = () => st.final;
  function substitutedHtml(expr) {
    return toHtml(expr, { sym: (s) => `<span class="recipe-unit">${unitText(quantityOf(s)?.unit ?? '?')}</span>` });
  }
  function draw4() {
    const expr = exprOfStudent();
    const dim = dimOfExpr(pb, expr);
    panel.append(h('div.recipe-formulas', html(M(`${symHtml(pb.find)}<span class="m-op">=</span>${toHtml(expr)}`))));
    panel.append(h('p.recipe-ask', html(t('Remplace chaque lettre par son unité et simplifie. Les unités de base : kg, m, s, K, A.'))));
    const hist = h('div.steps-history');
    if (live || !isActive(4)) hist.append(h('div.step-line.shown', html(`[${M(symHtml(pb.find))}] = ${M(substitutedHtml(expr))}`)));
    for (const l of st.units) hist.append(lineRow(l, '='));
    panel.append(hist);
    if (!isActive(4)) { button.textContent = t('Étape suivante'); button.onclick = advance; return; }
    setKeys(['kg', 'm', 's', 'K', 'A', 'N', 'J', 'W', 'V', '·', 'frac', '^', '(', ')', ...DIGITS.slice(0, 9), DIGITS[9], 'back', 'left', 'right'], t('des unités'), () => addUnit(dim));
    const findU = unitText(quantityOf(pb.find)?.unit ?? '');
    const choice = (says, label) => h(`button.choice${st.unitVerdict === says ? '.selected' : ''}`, {
      type: 'button', html: `<span class="choice-body">${label}</span>`,
      onclick: () => {
        if (!st.units.length) { message(t('Écris d\'abord au moins une ligne d\'unités.'), 'bad'); return; }
        const r = judgeUnitVerdict(pb, dim.d, says);
        st.unitVerdict = says;
        st.unitJudge = r;
        if (!r.ok) note(4, r.rule);
        if (live && !r.ok) { play('bad'); message(r.message, 'bad'); }
        if (!says && r.right === false) message(t('Bien vu : l\'unité est fausse, donc l\'algèbre aussi. Reviens à l\'étape 3.'), 'good');
        draw();
      },
    });
    panel.append(h('div.recipe-cancel',
      choice(true, t('C\'est bien l\'unité de {s} ({u}).', { s: M(symHtml(pb.find)), u: findU })),
      choice(false, t('Ce n\'est pas l\'unité de {s} : mon algèbre est fausse.', { s: M(symHtml(pb.find)) }))));
    button.textContent = t('Étape suivante');
    button.onclick = () => {
      if (st.unitVerdict == null) { message(t('Conclus : est-ce l\'unité de {s} ?', { s: M(symHtml(pb.find)) }), 'bad'); return; }
      if (st.unitVerdict === false && st.unitJudge?.right === false && isActive(3)) { go(3); return; }
      advance();
    };
  }

  function addUnit(dim) {
    if (!input?.value) return;
    const r = judgeUnitLine(dim.d, input.chars);
    if (r.kind === 'parse') { input.flash(); message(r.message, 'bad'); return; }
    if (r.kind === 'wrong' && live) { nudge(4, r); return; }
    if (r.kind === 'wrong') note(4, null);
    st.units.push({ raw: input.value, html: M(renderChars([...input.chars])), res: r });
    input.set('');
    play('tap');
    message('');
    draw();
  }

  // ---------- step 5: estimate ----------
  function draw5() {
    const expr = exprOfStudent();
    panel.append(h('div.recipe-formulas', html(M(`${symHtml(pb.find)}<span class="m-op">=</span>${toHtml(expr)}`))));
    panel.append(h('div.recipe-data', pb.data.map((d) => h('div.recipe-datum', html(`${M(symHtml(d.sym))} = ${nice(d.si, 4)} ${unitText(quantityOf(d.sym)?.unit ?? '')}`)))));
    if (!isActive(5)) {
      panel.append(h('p.recipe-ask', html(t('Approximation : {v}', { v: `<b>${sci(st.estimate, 1)}</b>` }))));
      button.textContent = t('Étape suivante');
      button.onclick = advance;
      return;
    }
    panel.append(h('p.recipe-ask', html(t('Sans calculatrice : arrondis chaque nombre à un ou deux chiffres, et calcule de tête. La dernière ligne est ton approximation.'))));
    panel.append(h('div.steps-history', st.est.map((l) => lineRow(l))));
    setKeys([...DIGITS.slice(0, 9), ',', DIGITS[9], '×', 'frac', '^', '=', '≈', '(', ')', 'back', 'left', 'right'], t('un calcul arrondi'), addEst);
    button.textContent = t('Étape suivante');
    button.onclick = leave5;
  }

  function addEst() {
    if (!input?.value) return;
    const r = judgeEstimateLine(input.chars.map((c) => (c === '≈' ? '=' : c)));
    if (r.kind !== 'ok') { input.flash(); message(r.message, 'bad'); return; }
    st.est.push({ raw: input.value, html: M(toHtml(parse(input.chars.map((c) => (c === '≈' ? '=' : c)), []))), value: r.value });
    st.estimate = r.value;
    st.verdict = null;
    st.answer = null;
    input.set('');
    play('tap');
    message('');
    draw();
  }

  function leave5() {
    if (!(st.estimate > 0)) { message(t('Écris au moins une ligne : ton approximation.'), 'bad'); return; }
    const v = valueOf(pb, exprOfStudent());
    const r = judgeEstimate(st.estimate, v);
    st.estJudge = r;
    if (!r.ok) {
      note(5, r.rule);
      if (item.feedback !== 'end' && !st.left5) { st.left5 = true; message(t('Ton approximation est loin du compte : vérifie tes puissances de 10.'), 'bad'); return; }
    }
    advance();
  }

  // ---------- step 6: numbers and verdict ----------
  function draw6() {
    const expr = exprOfStudent();
    const v = valueOf(pb, expr);
    const siU = unitText(quantityOf(pb.find)?.unit ?? '');
    panel.append(h('div.recipe-result',
      h('div', html(t('Le calcul de ton expression : {v}', { v: `${M(symHtml(pb.find))} = <b>${nice(v, 3)} ${siU}</b>` }))),
      h('div', html(t('Ton approximation (étape 5) : {v}', { v: `<b>${sci(st.estimate, 1)}</b>` })))));
    if (!isActive(6)) { button.textContent = t('Étape suivante'); button.onclick = advance; return; }
    const choice = (says, label) => h(`button.choice${st.verdict === says ? '.selected' : ''}`, {
      type: 'button', html: `<span class="choice-body">${label}</span>`,
      onclick: () => {
        const r = judgeVerdict(v, st.estimate, says);
        if (!r.ok) note(6, r.rule);
        // Saying « pas cohérent » when it is: a nudge, choose again.
        if (!r.ok && !says) { play('bad'); message(r.message, 'bad'); return; }
        st.verdict = says;
        if (!r.ok && item.feedback !== 'end') { play('bad'); message(r.message, 'bad'); } else message('');
        draw();
      },
    });
    panel.append(h('div.recipe-cancel',
      choice(true, t('Cohérent : les deux ont le même ordre de grandeur.')),
      choice(false, t('Pas cohérent : l'un des deux est faux.'))));
    // Not coherent: back to the step that is wrong.
    if (st.verdict === false) {
      const back = [];
      if (isActive(5)) back.push(h('button.btn.small', { type: 'button', onclick: () => go(5) }, t('Revoir l'approximation')));
      if (isActive(3)) back.push(h('button.btn.small', { type: 'button', onclick: () => go(3) }, t('Revoir l'algèbre')));
      if (isActive(1)) back.push(h('button.btn.small', { type: 'button', onclick: () => go(1) }, t('Revoir les données')));
      if (back.length) { panel.append(h('div.step-tools', back)); button.disabled = true; button.textContent = t('Valider'); return; }
      button.textContent = t('Terminer');
      button.onclick = finish;
      return;
    }
    if (st.verdict == null) { button.disabled = true; button.textContent = t('Valider'); return; }
    const ansU = unitText(pb.answerUnit);
    panel.append(h('p.recipe-ask', html(t('Écris le résultat arrondi (2 ou 3 chiffres significatifs), en {u} :', { u: ansU }))));
    setKeys([...DIGITS.slice(0, 9), ',', DIGITS[9], '×', '^', '-', 'back', 'left', 'right'], `${pb.find} = … ${ansU}`, answer);
    button.textContent = t('Valider');
    button.onclick = answer;
  }

  function answer() {
    if (!input?.value) return;
    const r = checkPhys({ value: pb.answerValue, minSig: 2 }, input.value);
    if (r.kind === 'stay') { input.flash(); message(r.message, 'bad'); return; }
    st.answer = { raw: input.value, ok: r.kind === 'done' };
    if (!st.answer.ok) note(6, null);
    if (active.includes(7)) { advance(); return; }
    finish();
  }

  // ---------- step 7: the range ----------
  function draw7() {
    const expr = exprOfStudent();
    const pm = item.range.pm;
    const syms = [...symbolsIn(expr)].filter((s) => pm[s] != null);
    panel.append(h('div.recipe-formulas', html(M(`${symHtml(pb.find)}<span class="m-op">=</span>${toHtml(expr)}`))));
    panel.append(h('p.recipe-ask', html(t('Les mesures ne sont pas parfaites. Pour le <b>plus petit</b> résultat possible, quelle valeur prends-tu pour chaque donnée ?'))));
    const rows = h('div.recipe-data');
    for (const s of syms) {
      const d = pb.data.find((x) => x.sym === s);
      const opt = (end, label) => h(`button.btn.small${st.ends[s] === end ? '.primary' : '.ghost'}`, { type: 'button', onclick: () => { st.ends[s] = end; draw(); } }, label);
      rows.append(h('div.recipe-datum', html(`${M(symHtml(s))} = ${num(d.shown)} ± ${num(pm[s])} ${unitText(d.unit)} `), opt(-1, t('la plus petite')), opt(1, t('la plus grande'))));
    }
    panel.append(rows);
    if (st.rangeShown) {
      const { lo, hi } = st.rangeShown;
      const siU = unitText(quantityOf(pb.find)?.unit ?? '');
      panel.append(h('div.recipe-result', html(t('{s} est compris entre {lo} et {hi}.', { s: M(symHtml(pb.find)), lo: `<b>${nice(lo, 3)} ${siU}</b>`, hi: `<b>${nice(hi, 3)} ${siU}</b>` }))));
      const opts = digitOptions(lo, hi);
      panel.append(h('p.recipe-ask', html(t('Comment écris-tu le résultat ?'))));
      panel.append(h('div.recipe-cancel', opts.map((o) => h(`button.choice${st.digits === o ? '.selected' : ''}`, { type: 'button', html: `<span class="choice-body">${o.text} ${siU}</span>`, onclick: () => { st.digits = o; draw(); } }))));
      button.textContent = t('Valider');
      button.onclick = () => { if (st.digits) finish(); };
      return;
    }
    button.textContent = t('Calculer la fourchette');
    button.onclick = () => {
      if (syms.some((s) => st.ends[s] == null)) { message(t('Choisis une valeur pour chaque donnée.'), 'bad'); return; }
      const want = minEnds(pb, expr, syms);
      const wrong = syms.filter((s) => want[s] !== st.ends[s]);
      if (wrong.length) { note(7, 'rg_same_ends'); if (item.feedback !== 'end') { play('bad'); message(t('Pas pour {s} : regarde si cette lettre est en haut ou en bas de la fraction.', { s: wrong.map((s) => symHtml(s)).join(', ') }), 'bad'); return; } }
      const env = (sign) => Object.fromEntries(pb.data.map((d) => [d.sym, d.si + (pm[d.sym] != null ? sign * want[d.sym] * pm[d.sym] * (d.si / d.shown) : 0)]));
      const a = evaluate(expr, env(1));
      const b = evaluate(expr, env(-1));
      st.rangeShown = { lo: Math.min(a, b), hi: Math.max(a, b) };
      message('');
      draw();
    };
  }

  // Three ways to write the result; the right one keeps the digits the range allows.
  function digitOptions(lo, hi) {
    const mid = (lo + hi) / 2;
    const half = (hi - lo) / 2;
    const place = Math.floor(Math.log10(half));
    const right = Math.round(mid / 10 ** place) * 10 ** place;
    const sigRight = Math.max(1, Math.floor(Math.log10(Math.abs(right))) - place + 1);
    const at = (sig) => Number(mid.toPrecision(Math.max(1, sig)));
    const seen = new Set();
    const out = [];
    for (const [sig, ok] of [[sigRight, true], [sigRight + 2, false], [Math.max(1, sigRight - 1), false]]) {
      const v = ok ? right : at(sig);
      const text = nice(v, Math.max(1, sig));
      if (seen.has(text)) continue;
      seen.add(text);
      out.push({ text, ok });
    }
    return out;
  }

  // ---------- the end ----------
  function finish() {
    if (st.done) return;
    st.done = true;
    const ok = {};
    ok[1] = st.nudges[1] === 0;
    ok[2] = st.nudges[2] === 0;
    const finalRight = st.final && equalsSymbol(st.final, pb.find, sits);
    ok[3] = !!finalRight && (!cancelledOf(pb) || st.cancel === 'right') && st.alg.every((l) => l.res.kind !== 'wrong');
    const dim = st.final ? dimOfExpr(pb, st.final) : {};
    ok[4] = st.units.every((l) => l.res.kind === 'ok') && st.unitVerdict === (!!dim.d && dimEq(dim.d, dimsOf([pb.find])[pb.find]));
    const v = st.final ? valueOf(pb, st.final) : NaN;
    ok[5] = !!judgeEstimate(st.estimate, v).ok;
    ok[6] = st.verdict === coherent(v, st.estimate) && (st.answer ? st.answer.ok : !coherent(v, st.estimate));
    ok[7] = st.nudges[7] === 0 && (!st.digits || st.digits.ok);
    if (!ok[3]) { const r = judgeAlgebraLine(pb, sits, st.alg[st.alg.length - 1]?.chars ?? ''); if (r.rule && !st.rules.includes(r.rule)) st.rules.push(r.rule); }
    if (isActive(5) && !ok[5]) { const r = judgeEstimate(st.estimate, v); if (r.rule && !st.rules.includes(r.rule)) st.rules.push(r.rule); }
    if (st.digits && !st.digits.ok && !st.rules.includes('ph_too_many_digits')) st.rules.push('ph_too_many_digits');
    // Steps 1 and 2 nudge along the way: a fixed slip leaves a « coup de pouce ».
    const graded = active.filter((k) => k >= 3);
    const correct = graded.every((k) => ok[k]) && active.filter((k) => k <= 2).every((k) => ok[k]);
    const soft = graded.every((k) => ok[k]) && !correct;
    const score = active.filter((k) => POINTS[k]).reduce((s, k) => s + (ok[k] ? POINTS[k] : 0), 0);
    const max = active.filter((k) => POINTS[k]).reduce((s, k) => s + POINTS[k], 0);
    const summary = `<div class="recipe-score">${active.map((k) => `<span class="${ok[k] ? 'ok' : 'ko'}">${ok[k] ? '✔' : '✖'} ${k} ${t(STEP_NAMES[k - 1])}</span>`).join('')}${max > 1 ? `<b>${t('Barème : {s} / {m}', { s: score, m: max })}</b>` : ''}</div>`;
    noKeys();
    button.disabled = true;
    drawStrip();
    const parts = [summary];
    if (st.rules.length && !correct) parts.push(explainRule(st.rules[st.rules.length - 1], null));
    parts.push(solutionHtml(item.solution));
    const answerHtml = `${M(symHtml(pb.find))} = ${qty(pb.answerValue, pb.answerUnit, 3)}`;
    ctx.complete(correct ? { correct: true, explainHtml: summary } : { correct: false, softWrong: soft, rules: st.rules, answerHtml, explainHtml: parts.join('') });
  }

  draw();
  return {
    ownFlow: true,
    footer,
    onKey: (e) => { if (input && !st.done) input.handleKey(e); },
  };
}
