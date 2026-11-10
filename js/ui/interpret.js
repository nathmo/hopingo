// Step U7 screens for the lines of module P: the « Interpréter » question
// asked after the last line (final.interpret, js/judges/interpret.js), and
// the « Vérifier en simulant » button shown once the item is done
// (item.simulate, js/engine/simulate.js). Styles are inline: no new sheet.

import { h, html, play } from './dom.js';
import { interpretOf, judgeInterpret } from '../judges/interpret.js';
import { simulate, seedOfKey } from '../engine/simulate.js';
import { explainRule } from './exercises.js';

// The question, in the stage; done({correct, rule}) once answered.
export function interpretTask(item, stage, setFooter, done) {
  const it = interpretOf(item);
  const list = h('div.choices.lines-choices');
  const say = h('div.step-feedback');
  it.options.forEach((o, i) => {
    const b = h('button.choice', { type: 'button', html: o.html });
    b.addEventListener('click', () => {
      const r = judgeInterpret(item, i);
      list.querySelectorAll('button').forEach((x) => { x.disabled = true; });
      b.classList.add(r.correct ? 'right' : 'wrong');
      play(r.correct ? 'good' : 'bad');
      if (!r.correct) {
        say.className = 'step-feedback bad';
        say.innerHTML = r.rule ? explainRule(r.rule, null) : '<p>Ce n\'est pas la bonne lecture.</p>';
        const right = it.options.findIndex((x) => x.correct);
        list.children[right]?.classList.add('right');
        stage.append(h('button.btn.primary.wide', { type: 'button', onclick: () => done(r) }, 'Continuer'));
      } else setTimeout(() => done(r), 500);
    });
    list.appendChild(b);
  });
  stage.replaceChildren(h('div.step-label', it.prompt || 'Interpréter : quelle phrase est juste ?'), list, say);
  setFooter();
}

// A bar chart of the simulated values (SVG, inline styles).
function histogram(hist, mark) {
  if (!hist?.length) return null;
  const W = 300;
  const H = 110;
  const max = Math.max(...hist.map((b) => b.count)) || 1;
  const bw = W / hist.length;
  const bars = hist.map((b, i) => {
    const hgt = (b.count / max) * (H - 20);
    const on = mark ? mark(b.x) : false;
    return `<rect x="${(i * bw + 1).toFixed(1)}" y="${(H - 16 - hgt).toFixed(1)}" width="${Math.max(bw - 2, 1).toFixed(1)}" height="${hgt.toFixed(1)}" fill="${on ? '#e8590c' : '#adb5bd'}"/>`;
  }).join('');
  const labels = hist.length <= 16 ? hist.map((b, i) => `<text x="${(i * bw + bw / 2).toFixed(1)}" y="${H - 3}" font-size="10" text-anchor="middle" fill="#495057">${Number.isInteger(b.x) ? b.x : ''}</text>`).join('') : '';
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:340px;display:block;margin:6px auto" role="img" aria-label="Histogramme de la simulation">${bars}${labels}</svg>`;
}

const pct = (x) => String((Math.round(x * 1000) / 1000).toFixed(3)).replace('.', ',');

// The button, then the frequency next to the answer.
export function simulateBox(item) {
  const spec = item.simulate;
  const box = h('div.lines-note', { style: { 'margin-top': '10px' } });
  const btn = h('button.btn.small.secondary', { type: 'button' }, `🎲 Vérifier en simulant (${(spec.n ?? 10000).toLocaleString('fr-CH')} fois)`);
  btn.addEventListener('click', () => {
    btn.disabled = true;
    const r = simulate(spec, seedOfKey(item.key));
    const ev = spec.event;
    const mark = ev && ev.op ? (x) => {
      switch (ev.op) {
        case 'eq': return x === ev.k;
        case 'le': return x <= ev.k;
        case 'lt': return x < ev.k;
        case 'ge': return x >= ev.k;
        case 'gt': return x > ev.k;
        case 'between': return x > ev.a && x <= ev.b;
        default: return false;
      }
    } : null;
    const of = spec.given ? ` parmi ${r.kept.toLocaleString('fr-CH')} tirages retenus` : ` sur ${r.n.toLocaleString('fr-CH')}`;
    box.append(
      h('p', html(`${spec.label ? `${spec.label} : ` : ''}fréquence observée <b>${pct(r.freq)}</b> (${r.hits.toLocaleString('fr-CH')}${of})${spec.answer !== undefined ? ` ; la probabilité calculée : <b>${pct(spec.answer)}</b>` : ''}.`)),
      h('div', html(histogram(r.hist, mark) || '')),
      h('p.muted', 'Une fréquence n’est pas une probabilité : elle s’en approche quand le nombre de tirages grandit (loi des grands nombres).'),
    );
  });
  box.append(btn);
  return box;
}
