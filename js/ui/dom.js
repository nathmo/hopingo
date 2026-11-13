// Small DOM helpers, sounds and the mascot.

import { t } from '../i18n.js';

// h('div.card#id', {onclick}, child, ...) — children may be strings (text),
// nodes, arrays, or {html: '...'} for trusted markup.
export function h(sel, attrs = {}, ...kids) {
  // The second argument is attributes only if it is a plain object that is
  // not itself a child ({html} alone is trusted markup).
  const isMarkup = attrs && typeof attrs === 'object' && Object.keys(attrs).length === 1 && 'html' in attrs;
  if (attrs == null || attrs instanceof Node || Array.isArray(attrs) || typeof attrs !== 'object' || isMarkup) {
    kids.unshift(attrs);
    attrs = {};
  }
  const [, tag = 'div', rest = ''] = /^([a-z0-9]*)(.*)$/i.exec(sel);
  const el = document.createElement(tag || 'div');
  for (const m of rest.matchAll(/([.#])([\w-]+)/g)) {
    if (m[1] === '.') el.classList.add(m[2]);
    else el.id = m[2];
  }
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'class') el.className += ` ${v}`;
    else if (k === 'style' && typeof v === 'object') for (const [p, x] of Object.entries(v)) el.style.setProperty(p, x);
    else if (k === 'html') el.innerHTML = v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  const add = (k) => {
    if (k == null || k === false) return;
    if (Array.isArray(k)) k.forEach(add);
    else if (k instanceof Node) el.appendChild(k);
    else if (typeof k === 'object' && 'html' in k) el.insertAdjacentHTML('beforeend', k.html);
    else el.appendChild(document.createTextNode(String(k)));
  };
  kids.forEach(add);
  return el;
}

export const html = (s) => ({ html: s });

// Appends children like h() does: skips null/false, accepts arrays and {html}.
export function add(parent, ...kids) {
  const tmp = h('div', {}, ...kids);
  while (tmp.firstChild) parent.appendChild(tmp.firstChild);
  return parent;
}

export function clear(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
  return el;
}

export function toast(msg, kind = '') {
  const el = h(`div.toast${kind ? `.${kind}` : ''}`, msg);
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 300); }, 2600);
}

// Bottom sheet; returns a close function.
export function sheet(content, { onClose } = {}) {
  const back = h('div.sheet-back');
  const box = h('div.sheet', content);
  const close = () => {
    back.classList.remove('show');
    setTimeout(() => back.remove(), 250);
    onClose?.();
  };
  back.addEventListener('click', (e) => { if (e.target === back) close(); });
  back.appendChild(box);
  document.body.appendChild(back);
  requestAnimationFrame(() => back.classList.add('show'));
  return close;
}

export function confirmBox(message, okLabel = t('Oui')) {
  return new Promise((resolve) => {
    let done = false;
    const finish = (v) => { if (!done) { done = true; resolve(v); close(); } };
    const close = sheet(h('div.confirm',
      h('p', message),
      h('div.row',
        h('button.btn.ghost', { onclick: () => finish(false) }, t('Annuler')),
        h('button.btn.danger', { onclick: () => finish(true) }, okLabel))), { onClose: () => finish(false) });
  });
}

// ---------- sounds (synthesised, no files) ----------

let audio = null;
let soundOn = true;
export const setSound = (on) => { soundOn = on; };

function tone(freq, start, dur, type = 'sine', gain = 0.12) {
  audio ||= new (window.AudioContext || window.webkitAudioContext)();
  const t0 = audio.currentTime + start;
  const o = audio.createOscillator();
  const g = audio.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(audio.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.05);
}

export function play(name) {
  if (!soundOn) return;
  try {
    if (name === 'good') { tone(660, 0, 0.12); tone(990, 0.09, 0.2); }
    if (name === 'bad') { tone(220, 0, 0.18, 'triangle'); tone(180, 0.12, 0.25, 'triangle'); }
    if (name === 'tap') tone(520, 0, 0.05, 'sine', 0.05);
    if (name === 'level') { [523, 659, 784].forEach((f, i) => tone(f, i * 0.08, 0.18)); }
    if (name === 'done') { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.1, 0.25)); }
  } catch { /* audio unavailable */ }
}

// ---------- mascot: Hopingo the cat ----------

export function mascot(mood = 'happy', size = 96) {
  const mouth = {
    happy: 'M40 66 Q50 74 60 66',
    sad: 'M40 70 Q50 63 60 70',
    wow: 'M46 66 Q50 74 54 66 Q50 62 46 66',
    think: 'M42 68 L58 66',
  }[mood] || 'M40 66 Q50 74 60 66';
  const eyes = mood === 'happy'
    ? '<path d="M33 50 Q38 44 43 50" stroke="#3b2a1a" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M57 50 Q62 44 67 50" stroke="#3b2a1a" stroke-width="3.5" fill="none" stroke-linecap="round"/>'
    : '<circle cx="38" cy="50" r="5" fill="#3b2a1a"/><circle cx="62" cy="50" r="5" fill="#3b2a1a"/><circle cx="39.5" cy="48.5" r="1.6" fill="#fff"/><circle cx="63.5" cy="48.5" r="1.6" fill="#fff"/>';
  return html(`<svg class="mascot mascot-${mood}" width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true">
    <path d="M18 40 L22 10 L42 28 Z" fill="#f08c3a"/><path d="M82 40 L78 10 L58 28 Z" fill="#f08c3a"/>
    <path d="M24 34 L25 18 L36 29 Z" fill="#ffd2b3"/><path d="M76 34 L75 18 L64 29 Z" fill="#ffd2b3"/>
    <ellipse cx="50" cy="56" rx="36" ry="32" fill="#f59f4c"/>
    <path d="M50 26 L46 36 M50 26 L54 36 M50 26 L50 38" stroke="#d9772b" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="50" cy="68" rx="20" ry="14" fill="#ffe3cc"/>
    ${eyes}
    <path d="M47 59 L53 59 L50 62 Z" fill="#e8590c"/>
    <path d="${mouth}" stroke="#3b2a1a" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M20 60 L8 57 M20 65 L8 66 M80 60 L92 57 M80 65 L92 66" stroke="#3b2a1a" stroke-width="1.6" stroke-linecap="round"/>
    ${mood === 'happy' ? '<circle cx="30" cy="62" r="4" fill="#ff8787" opacity=".5"/><circle cx="70" cy="62" r="4" fill="#ff8787" opacity=".5"/>' : ''}
  </svg>`);
}

export function bubble(text, mood = 'happy') {
  return h('div.bubble-row', mascot(mood, 72), h('div.bubble', typeof text === 'string' ? html(text) : text));
}
