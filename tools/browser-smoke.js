#!/usr/bin/env node
// Smoke test of Hopingo in a real browser (a dev tool, not part of npm test).
//
// It serves the folder with `python -m http.server`, starts Microsoft Edge
// (or Chrome) headless, drives it through the Chrome DevTools Protocol with
// Node's global WebSocket (Node 22+, no package), and checks:
//   start    the app loads without errors; profiles 7H, Gymnase and BA1 are
//            created through the screens, and the map draws every unit;
//   map      the map in French and English, phone and wide screen: the rail of
//            years jumps to its band (screenshots map-<lang>-<width>-<year>).
//   mount    every university skill, levels 1 to 5 and each exam variant it
//            declares, N items each (--per), mounted by the lesson screen:
//            no exception or console error, no « undefined », « NaN »,
//            « [object Object] » or raw markup in the text or the
//            attributes (MathML, SVG), an input exists, every keypad tab
//            opens and has keys;
//   play     a sample of skills per unit (--play) played to the end through
//            the screens with the reference solution, typed key by key
//            (keyboard for ASCII, keypad buttons for the rest): the item
//            ends correct and « Continuer » appears;
//   wrong    a typical wrong line on lines items: the mistake is shown, and
//            the trap is named when the generator baits one;
//   exams    each mock exam of EXAMS: start, answer, reload, resume, hand
//            in, a grade between 1 and 6;
//   problem  a long problem played halfway, reloaded, resumed from the
//            home screen (« Reprendre le problème ») and finished;
//   school   a lesson of fractions and one of equations, played to the end;
//   steps    rat-equation (x + 12/x = 7) solved on screen in four lines
//            written above the answer, each checked; a wrong line flagged;
//            screenshots of the 2D input (fraction, power, root).
//
// The lesson screen plays given items through Lesson kind 'items'
// (js/engine/session.js), a debug entry point the app never uses.
//
// Usage:
//   npm run smoke                             all phases
//   node tools/browser-smoke.js --only mount --unit alglin --per 1
//   node tools/browser-smoke.js --only play --skill l-sys-rref
// Options:
//   --only a,b        phases to run (start, map, mount, play, wrong, exams, problem, school, steps)
//   --unit u1,u2      university units to check (default: all)
//   --skill s1,s2     skills to check (default: all of the units)
//   --per N           items per skill, level and exam variant (default 2)
//   --play N          skills played per unit (default 2, plus one per item type)
//   --seed N          seed of the generators (default 7)
//   --lang en         the page in English (phases map and mount)
//   --port N          HTTP port (default 8765); --cdp N the DevTools port (9333)
//   --out DIR         screenshots and report (default: <tmp>/hopingo-smoke)
//   --browser PATH    the browser (default: Edge, then Chrome)
//   --headed          show the window
// Exit code 1 when a check fails. The report is also written to DIR/report.json.

import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { physiquePage, phasePhysique } from './smoke-physique.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// ---------- options ----------
const argv = process.argv.slice(2);
const opt = (name, def) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : def;
};
const flag = (name) => argv.includes(`--${name}`);
const list = (s) => (s ? String(s).split(',').map((x) => x.trim()).filter(Boolean) : null);
const PHASES = ['start', 'map', 'mount', 'play', 'wrong', 'exams', 'problem', 'school', 'steps', 'physique'];
const ONLY = list(opt('only')) ?? PHASES;
const UNITS = list(opt('unit'));
const SKILLS = list(opt('skill'));
const PER = Number(opt('per', 2));
const PLAY = Number(opt('play', 2));
const SEED = Number(opt('seed', 7));
// --lang en: the page in English (js/i18n.js). Only the phases that do not
// click buttons by their French label check English: map and mount (every
// item drawn, scanned for errors and broken text). The others drive the
// French screens.
const LANG = opt('lang', null);
const PORT = Number(opt('port', 8765));
const CDP_PORT = Number(opt('cdp', 9333));
const OUT = resolve(opt('out', join(tmpdir(), 'hopingo-smoke')));
const BROWSERS = [
  opt('browser'),
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  '/usr/bin/microsoft-edge', '/usr/bin/google-chrome', '/usr/bin/chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
].filter(Boolean);
const BASE = `http://127.0.0.1:${PORT}/`;

mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.log(...a);

// ---------- processes ----------
const children = [];
function startServer() {
  const p = spawn('python', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'], { cwd: ROOT, stdio: 'ignore' });
  children.push(p);
  return p;
}
function startBrowser() {
  const exe = BROWSERS.find((b) => existsSync(b));
  if (!exe) throw new Error('Edge or Chrome not found: give --browser PATH');
  const profile = join(OUT, 'browser-profile');
  rmSync(profile, { recursive: true, force: true });
  const args = [
    `--remote-debugging-port=${CDP_PORT}`, `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check',
    '--disable-extensions', '--disable-background-timer-throttling', '--disable-renderer-backgrounding',
    '--window-size=420,900', 'about:blank',
  ];
  if (!flag('headed')) args.unshift('--headless=new');
  const p = spawn(exe, args, { stdio: 'ignore' });
  children.push(p);
  return p;
}
function stopAll() {
  for (const c of children) { try { c.kill(); } catch { /* gone */ } }
}
process.on('exit', stopAll);
process.on('SIGINT', () => { stopAll(); process.exit(130); });

async function waitFor(url, ms = 15000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    try { const r = await fetch(url); if (r.ok) return r; } catch { /* not yet */ }
    await sleep(150);
  }
  throw new Error(`timeout waiting for ${url}`);
}

// ---------- DevTools protocol ----------
class Cdp {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.handlers = [];
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve: ok, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(`${msg.error.message} ${msg.error.data ?? ''}`));
        else ok(msg.result);
      } else if (msg.method) for (const h of this.handlers) h(msg);
    });
  }

  static async connect() {
    await waitFor(`http://127.0.0.1:${CDP_PORT}/json/version`);
    const targets = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json`)).json();
    const page = targets.find((t) => t.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((ok, ko) => { ws.addEventListener('open', ok); ws.addEventListener('error', ko); });
    return new Cdp(ws);
  }

  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((ok, ko) => this.pending.set(id, { resolve: ok, reject: ko }));
  }

  on(fn) { this.handlers.push(fn); }

  // Evaluates an expression in the page (awaiting a promise); returns its
  // value (JSON) or throws the page's exception.
  async eval(expr, timeoutMs = 600000) {
    const r = await Promise.race([
      this.send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true, timeout: timeoutMs }),
      sleep(timeoutMs + 5000).then(() => { throw new Error(`eval timeout: ${expr.slice(0, 80)}`); }),
    ]);
    if (r.exceptionDetails) {
      const d = r.exceptionDetails;
      throw new Error(`page: ${d.exception?.description ?? d.text}`);
    }
    return r.result.value;
  }

  // Calls a page function of window.__smoke with JSON arguments.
  call(name, ...args) {
    return this.eval(`window.__smoke.${name}(...${JSON.stringify(args)})`);
  }
}

// ---------- the report ----------
const report = { phases: {}, failures: [], counts: { mounted: 0, played: 0, playedRight: 0, exams: 0, untypable: 0 }, screenshots: [], console: [] };
function fail(phase, where, what) {
  report.failures.push({ phase, where, what });
  log(`  ✗ [${phase}] ${where}: ${what}`);
}

let cdp;
async function shot(name) {
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  const file = join(OUT, `${name}.png`);
  writeFileSync(file, Buffer.from(data, 'base64'));
  report.screenshots.push(file);
  return file;
}

async function load(path = '', lang = LANG) {
  await cdp.send('Page.navigate', { url: BASE + path });
  if (lang) {
    // The language is read when the page loads: set it, then load again.
    await sleep(300);
    await cdp.send('Runtime.evaluate', { expression: `localStorage.setItem('hopingo.lang', ${JSON.stringify(lang)})` });
    await cdp.send('Page.navigate', { url: BASE + path });
  }
  for (let i = 0; i < 100; i++) {
    await sleep(100);
    try { if (await cdp.eval('!!(window.__smoke && document.readyState === "complete" && document.querySelector("#app").children.length)', 5000)) break; } catch { /* navigating */ }
  }
  await cdp.eval('window.__smoke.ready()');
}

// ---------- the page side ----------
// Defined in the page before its scripts run (Page.addScriptToEvaluateOnNewDocument).
// It imports the app's own modules: same URLs, so the same instances.
function pageLib() {
  const S = {};
  window.__smoke = S;
  S.errors = [];
  const origError = console.error.bind(console);
  console.error = (...a) => { S.errors.push(`console.error: ${a.map((x) => (x && x.stack) || String(x)).join(' ')}`); origError(...a); };
  window.addEventListener('error', (e) => S.errors.push(`uncaught: ${e.message} at ${e.filename}:${e.lineno}`));
  window.addEventListener('unhandledrejection', (e) => S.errors.push(`unhandled rejection: ${e.reason && (e.reason.stack || e.reason)}`));
  S.takeErrors = () => S.errors.splice(0);
  const M = {};
  S.M = M;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  S.wait = wait;

  S.ready = async () => {
    if (M.app) return true;
    const [main, gen, rnd, skills, uni, keypad, tokens, mxin, lines, problem, actions, common, idx, interp, exams, exam, mxitems, kn, expr, solver] = await Promise.all([
      '/js/main.js', '/js/content/generators.js', '/js/content/random.js', '/js/content/skills.js', '/js/content/uni/index.js',
      '/js/ui/keypad.js', '/js/ui/tokens.js', '/js/ui/matrix-input.js', '/js/judges/lines.js', '/js/judges/problem.js',
      '/js/judges/actions.js', '/js/judges/common.js', '/js/judges/index.js', '/js/judges/interpret.js',
      '/js/content/uni/exams.js', '/js/engine/exam.js', '/js/ui/matrix-items.js', '/js/ui/keys-needed.js', '/js/math/expr.js', '/js/math/solver.js',
    ].map((u) => import(u)));
    Object.assign(M, { main, gen, rnd, skills, uni, keypad, tokens, mxin, lines, problem, actions, common, idx, interp, exams, exam, mxitems, kn, expr, solver });
    M.app = main.app;
    // Inputs and runs are found from the page: each input keeps itself on
    // its element, each run is listed (prototype hooks, nothing in the app).
    const keep = (cls, method, prop) => {
      const f = cls.prototype[method];
      cls.prototype[method] = function (...a) { const r = f.apply(this, a); if (this.display) this.display[prop] = this; return r; };
    };
    keep(keypad.MathInput, 'render', '__mi');
    keep(tokens.TokenInput, 'render', '__ti');
    keep(mxin.MatrixInput, 'build', '__mx');
    S.runs = [];
    const segGet = Object.getOwnPropertyDescriptor(lines.LinesRun.prototype, 'segment').get;
    Object.defineProperty(lines.LinesRun.prototype, 'segment', { get() { if (!S.runs.includes(this)) S.runs.push(this); return segGet.call(this); }, configurable: true });
    S.problems = [];
    const curGet = Object.getOwnPropertyDescriptor(problem.ProblemRun.prototype, 'current').get;
    Object.defineProperty(problem.ProblemRun.prototype, 'current', { get() { if (!S.problems.includes(this)) S.problems.push(this); return curGet.call(this); }, configurable: true });
    return true;
  };

  // ---------- generic checks of what is on screen ----------
  const BAD_TEXT = [/\bundefined\b/, /\bNaN\b/, /\[object Object\]/, /<\/?(math|mrow|mi|mn|mo|mfrac|msup|span|div|b|sub|sup)\b[^>]*>/, /&(lt|gt|amp|quot|nbsp|#\d+);/, /\bnull\b/, /\bInfinity\b/, /function\s*\([^)]*\)\s*\{|=>/];
  const BAD_ATTR = [/\bundefined\b/, /\bNaN\b/, /\[object Object\]/, /\bInfinity\b/];
  S.scan = (root = document.getElementById('app')) => {
    const out = [];
    const text = root.textContent;
    for (const re of BAD_TEXT) {
      const m = re.exec(text);
      if (m) out.push(`text « ${text.slice(Math.max(0, m.index - 40), m.index + 40).replace(/\s+/g, ' ')} »`);
    }
    for (const el of root.querySelectorAll('*')) {
      for (const a of el.attributes) {
        if (a.name === 'class' || a.name === 'style' && !/NaN|undefined/.test(a.value)) continue;
        for (const re of BAD_ATTR) if (re.test(a.value)) out.push(`<${el.tagName.toLowerCase()} ${a.name}="${a.value.slice(0, 80)}">`);
      }
      if (el.tagName.toLowerCase() === 'merror') out.push(`<merror> ${el.textContent.slice(0, 60)}`);
    }
    return [...new Set(out)].slice(0, 6);
  };

  const visible = (el) => !!el && el.isConnected && !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  S.visible = visible;
  // A visible button by its text (exact, or a start).
  S.button = (text, root = document) => [...root.querySelectorAll('button')].find((b) => visible(b) && !b.disabled && (b.textContent.trim() === text || (text.endsWith('…') && b.textContent.trim().startsWith(text.slice(0, -1)))));
  S.click = (text, root) => { const b = S.button(text, root); if (!b) return false; b.click(); return true; };

  // Every keypad tab opens a panel with keys.
  S.checkKeypads = (root = document) => {
    const out = [];
    for (const box of root.querySelectorAll('.keypad-tabs')) {
      if (!visible(box)) continue;
      const tabs = [...box.querySelectorAll('.keytab')];
      for (const t of tabs) {
        t.click();
        const keys = box.querySelectorAll('.keytab-panel button');
        if (!t.classList.contains('active')) out.push(`tab ${t.textContent} not active after a click`);
        if (!keys.length) out.push(`tab ${t.textContent}: no keys`);
        for (const k of keys) if (!k.innerHTML.trim() && !k.textContent.trim()) out.push(`tab ${t.textContent}: an empty key`);
      }
      tabs[0]?.click();
    }
    return out;
  };

  // The ways to answer on screen.
  S.inputs = (root = document) => [...root.querySelectorAll('.mi-display, .tok-display, .mx-input, input, select, button.choice, button.blk, .plot-svg, button.tf-cell')].filter(visible).length;

  // ---------- mounting items through the lesson screen ----------
  S.gen = (skill, level, exam, seed) => M.gen.generate(skill, level, M.rnd.makeRng(seed), M.app.profile, exam ? { exam } : undefined);
  S.mount = (item) => {
    S.runs.length = 0;
    S.problems.length = 0;
    M.app.go('lesson', { kind: 'items', items: [item] });
    return document.querySelector('.lesson-body .exercise');
  };

  // Mounts the items of one skill (levels 1 to 5 and its exam variants),
  // `per` each, and checks the screen. Returns {n, issues: [{where, what}]}.
  S.mountSkill = (skill, per, seed) => {
    const def = M.skills.SKILL_BY_ID[skill];
    const runs = [...[1, 2, 3, 4, 5].map((l) => ({ level: l })), ...(def.exam || []).map((e) => ({ level: 4, exam: e }))];
    const issues = [];
    let n = 0;
    let s = seed;
    for (const { level, exam } of runs) {
      for (let i = 0; i < per; i++) {
        s += 1;
        const where = `${skill} L${level}${exam ? ` ${exam}` : ''} #${i + 1}`;
        let item;
        S.takeErrors();
        try { item = S.gen(skill, level, exam, s); } catch (e) { issues.push({ where, what: `generate: ${e.message}` }); continue; }
        try {
          const el = S.mount(item);
          n++;
          if (!el) { issues.push({ where, what: 'nothing mounted' }); continue; }
          const what = [...S.scan(), ...S.checkKeypads()];
          if (!S.inputs(document.querySelector('.screen-lesson'))) what.push('no input on screen');
          if (document.querySelector('.feedback.show')) what.push('the item ended while mounting');
          for (const c of S.coverage(item)) what.push(`keypad: cannot type « ${c.missing} » in « ${c.text} »${c.where} (keys ${JSON.stringify(c.keys)})`);
          for (const w of what) issues.push({ where: `${where} (${item.type}${item.mode ? ` ${item.mode}` : ''}) ${item.key}`, what: w });
        } catch (e) { issues.push({ where, what: `mount: ${e.stack || e.message}` }); }
        for (const e of S.takeErrors()) issues.push({ where: `${where} ${item?.key}`, what: e });
      }
    }
    return { n, issues };
  };

  // ---------- playing an item through the screens ----------
  // Everything is done as a student would: keys typed on the keyboard
  // (ASCII only), keypad buttons for the other symbols, taps on choices,
  // blocks, cells and the plane. S.trace collects what went wrong.
  const sleepUntil = async (cond, ms = 3000) => {
    const t0 = Date.now();
    while (Date.now() - t0 < ms) { const v = cond(); if (v) return v; await wait(25); }
    return cond();
  };
  S.sleepUntil = sleepUntil;
  const textOf = (markup) => { const d = document.createElement('div'); d.innerHTML = String(markup ?? ''); return d.textContent.replace(/\s+/g, ' ').trim(); };
  const norm = (s) => String(s).replace(/\s+/g, ' ').trim();
  const issue = (what) => { S.trace.issues.push(what); };
  S.trace = { issues: [], untypable: [], steps: 0 };

  const key = (k, target = document) => target.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));
  S.key = key;
  // Clicks a visible, enabled button whose text is one of `texts`.
  const press = (texts, root = document) => {
    for (const t of [].concat(texts)) { const b = S.button(t, root); if (b) { b.click(); S.trace.steps++; return true; } }
    return false;
  };
  S.press = press;

  // Keypad keys learnt by pressing them: « tab|label » → the text inserted.
  const KEYS = new Map();
  const SKIP_KEY = new Set(['⌫', '◀', '▶', '✓', '']);
  const keypadsOf = () => [...document.querySelectorAll('.keypad-tabs, .keypad')].filter((p) => visible(p) && !p.closest('.keytab-panel'));
  const tabsOf = (pad) => { const t = pad.classList.contains('keypad-tabs') ? [...pad.querySelectorAll('.keytab')] : []; return t.length ? t : [null]; };
  const keysOf = (pad) => [...pad.querySelectorAll(pad.classList.contains('keypad-tabs') ? '.keytab-panel button' : 'button')];
  const tabName = (tab) => (tab ? tab.textContent : '');
  const keyId = (tab, b) => `${tabName(tab)}|${b.innerHTML}`;
  const backKey = (pad) => keysOf(pad).find((b) => b.textContent === '⌫');
  // Learns what the keys of a keypad insert into `mi`, then leaves it as it was.
  function learn(pad, mi) {
    for (const tab of tabsOf(pad)) {
      tab?.click();
      for (const b of keysOf(pad)) {
        const id = keyId(tab, b);
        if (KEYS.has(id)) continue;
        if (SKIP_KEY.has(b.textContent.trim()) || b.querySelector('.key-frac, .key-pow')) { KEYS.set(id, null); continue; }
        const before = mi.value;
        const caret = mi.caret;
        b.click();
        const after = mi.value;
        KEYS.set(id, after.length > before.length && after.startsWith(before.slice(0, caret)) ? after.slice(caret, caret + after.length - before.length) : null);
        if (after !== before) (backKey(pad) ?? { click: () => mi.press('back') }).click();
        if (mi.value !== before) { mi.set(before); mi.onChange?.(mi.value); }
      }
    }
    tabsOf(pad)[0]?.click();
  }
  // Presses the key of a keypad on screen that inserts `chunk`.
  function pressKey(chunk) {
    for (const pad of keypadsOf()) {
      for (const tab of tabsOf(pad)) {
        tab?.click();
        const b = keysOf(pad).find((x) => KEYS.get(keyId(tab, x)) === chunk);
        if (b) { b.click(); return true; }
      }
    }
    return false;
  }
  const chunksOnScreen = () => {
    const names = new Set(keypadsOf().flatMap((pad) => tabsOf(pad).map(tabName)));
    const out = new Set();
    for (const [id, v] of KEYS) if (v && v.length > 1 && names.has(id.slice(0, id.indexOf('|')))) out.add(v);
    return [...out].sort((a, b) => b.length - a.length);
  };

  const ALT = { '·': ['×', '*'], '×': ['*', '·'], '÷': ['/'] };
  // Types `text` into a MathInput, key by key. Returns true when the input
  // holds the text (spaces aside); else the text is set directly and the
  // characters no key could type are recorded.
  S.typeMath = async (mi, text) => {
    const want = String(text).replace(/−/g, '-');
    mi.display.click();
    await wait(0);
    for (let n = 0; mi.value.length && n < 200; n++) { const v = mi.value; key('Backspace'); if (mi.value === v) mi.press('back'); }
    for (const pad of keypadsOf()) learn(pad, mi);
    const chunks = chunksOnScreen();
    const missed = [];
    let i = 0;
    while (i < want.length) {
      const c = want[i];
      const chunk = chunks.find((ch) => want.startsWith(ch, i));
      if (chunk && pressKey(chunk)) { i += chunk.length; continue; }
      // The key itself, else what a student would type instead (× for ·).
      let typed = false;
      for (const k of [c, ...(ALT[c] || [])]) {
        const before = mi.value;
        if (/^[\x20-\x7e]$/.test(k)) {
          key(k);
          if (mi.value === before + (k === '*' ? '×' : k) || (k === '.' && mi.value === `${before},`)) { typed = true; break; }
          if (mi.value !== before) key('Backspace');
          if (mi.value !== before) { mi.set(before); mi.onChange?.(mi.value); }
        }
        if (k !== ' ' && pressKey(k)) { typed = true; break; }
      }
      if (!typed && c !== ' ') missed.push(c);
      i++;
    }
    const strip = (s) => s.replace(/\s+/g, '').replace(/\./g, ',').replace(/[·*÷]/g, (x) => ({ '·': '×', '*': '×', '÷': '/' })[x]);
    if (strip(mi.value) === strip(want)) return mi.value.replace(/\s+/g, '') === want.replace(/\s+/g, '').replace(/·/g, '×') ? true : 'alt';
    S.trace.untypable.push({ text: want, typed: mi.value, missed: [...new Set(missed)].join('') });
    mi.set(want);
    mi.onChange?.(mi.value);
    return false;
  };

  // Builds a formula from the palette of a TokenInput.
  S.typeTokens = async (ti, text) => {
    const tmp = new M.tokens.TokenInput({ pieces: ti.pieces, ops: ti.ops });
    tmp.set(text);
    const pal = [...document.querySelectorAll('.tok-palette')].find(visible);
    if (!pal) { issue('no token palette'); ti.set(text); return; }
    for (let n = 0; ti.tokens.length && n < 200; n++) [...pal.querySelectorAll('.tok-row.edit button')].find((x) => x.textContent === '⌫').click();
    const opsRow = pal.querySelector('.tok-row.ops');
    const pcsRow = pal.querySelector('.tok-row.pieces');
    for (const t of tmp.tokens) {
      const k = ti.ops.indexOf(t);
      const b = k >= 0 ? opsRow.children[k] : pcsRow.children[ti.pieces.indexOf(t)];
      if (!b) { issue(`token « ${t} » not on the palette`); ti.press(t); continue; }
      b.click();
    }
    if (ti.value !== tmp.value) issue(`tokens typed « ${ti.value} » ≠ « ${tmp.value} »`);
  };

  // Fills a grid input (its cells, or its text field) with a line.
  const fire = (el, ev = 'input') => el.dispatchEvent(new Event(ev, { bubbles: true }));
  S.fillMatrix = (mx, text, { guided = false } = {}) => {
    const t = String(text);
    if (mx.textField && !guided) { mx.textField.value = t; fire(mx.textField); return; }
    const lit = M.mxin.splitLiteral(t) ?? M.mxin.splitVectors(t);
    if (!lit) { issue(`grid: cannot split « ${t} »`); mx.set(t); return; }
    const cells = mx.grids[0]?.cells;
    if (!cells) { issue('grid: no cells'); return; }
    if (cells.length !== lit.rows.length || cells[0].length !== lit.rows[0].length) {
      // Resized as a student would, with the size buttons.
      const dr = lit.rows.length - cells.length;
      const dc = lit.rows[0].length - cells[0].length;
      for (let k = 0; k < Math.abs(dr); k++) press(dr > 0 ? '+ ligne' : '− ligne');
      for (let k = 0; k < Math.abs(dc); k++) press(dc > 0 ? '+ colonne' : '− colonne');
    }
    const now = mx.grids[0].cells;
    if (now.length !== lit.rows.length || now[0].length !== lit.rows[0].length) { issue(`grid ${now.length}×${now[0].length}, answer ${lit.rows.length}×${lit.rows[0].length}`); mx.set(t); return; }
    now.forEach((r, i) => r.forEach((c, j) => { if (!c.readOnly) { c.value = lit.rows[i][j]; fire(c); } }));
  };
  // Several named grids (L = …, U = …): the text field takes the whole line.
  const fillGridOrText = (mx, text) => {
    if (mx.textField) { mx.textField.value = text; fire(mx.textField); return; }
    S.fillMatrix(mx, text);
  };

  // The run of a lines item (the latest one made for it).
  const runOf = (item) => [...S.runs].reverse().find((r) => r.item === item);
  const refOption = (options) => options.find((o) => o.ref) ?? options.find((o) => o.valid && o.quality !== 'poor') ?? options.find((o) => o.valid);
  const choiceByLabel = (box, label) => [...box.querySelectorAll('button.choice')].find((b) => norm(b.textContent) === textOf(label) && !b.disabled);

  // Plays a lines item mounted in `el` until its run is done (or after
  // `stopAfter` lines).
  S.playLines = async (item, el, { stopAfter = Infinity } = {}) => {
    let lastSig = '';
    let same = 0;
    let lines = 0;
    let skip = 0; // reference lines skipped (typed with a substitute, then finished by the next one)
    let skipSeg = -1;
    for (let guard = 0; guard < 400; guard++) {
      await wait(10);
      const run = runOf(item);
      if (!run) { issue('no run for the lines item'); return false; }
      const stage = el.querySelector('.lines-stage');
      const fb = el.querySelector('.step-feedback');
      if (fb?.classList.contains('bad')) { issue(`refused: ${norm(fb.textContent).slice(0, 220)}`); return false; }
      const choices = stage?.querySelector('.lines-choices');
      if (run.done) {
        const it = M.interp.interpretOf(item);
        if (it && choices && visible(choices) && !choices.querySelector('button:disabled')) {
          const k = it.options.findIndex((o) => o.correct);
          choices.children[k].click();
          await wait(600);
          continue;
        }
        return true;
      }
      if (lines >= stopAfter) return 'stopped';
      const sig = `${run.seg}:${run.cursor}:${run.history.length}:${stage?.innerHTML.length}`;
      if (sig === lastSig) { if (++same > 30) { issue(`stuck: ${norm(stage?.textContent ?? '').slice(0, 160)} | ${norm(fb?.textContent ?? '').slice(0, 160)}`); return false; } } else same = 0;
      lastSig = sig;
      const seg = run.segment;
      const label = norm(stage?.querySelector('.step-label')?.textContent ?? '');
      if (choices && visible(choices)) {
        // A decision, an action (tap mode) or the rule used (self-explanation).
        let k = run.cursor;
        while (k < seg.lines.length && seg.lines[k].kind === 'note') k++;
        const line = seg.lines[k];
        let target = null;
        let opt = null;
        if (line?.kind === 'decision' && label === textOf(line.prompt)) { opt = refOption(line.options); target = opt?.label; } else if (label === 'Que fais-tu maintenant ?') target = M.actions.actionsFor(item.tapActions, run.prev, run.cfg).find((o) => o.valid)?.label;
        else {
          const rule = seg.lines.find((l) => l.kind === 'rule');
          if (rule && label === textOf(rule.ask)) target = rule.options.find((o) => o.id === rule.correct)?.label;
        }
        const b = target != null ? choiceByLabel(choices, target) : null;
        if (!b) { issue(`no choice to make for « ${label} »: ${[...choices.children].map((c) => norm(c.textContent)).join(' | ')}`); return false; }
        b.click();
        S.trace.steps++;
        if (opt?.then) {
          // A decision followed by a typed value.
          await wait(0);
          const mi = stage.querySelector('.mi-display')?.__mi;
          if (!mi) { issue('no input after the decision'); return false; }
          await S.typeMath(mi, opt.then.expect);
          press('Valider');
        }
        continue;
      }
      const opts = M.common.parseOpts(run.cfg);
      const done = run.history.filter((e) => e.seg === run.seg && e.how !== 'start').length;
      const eqs = seg.lines.filter((l) => l.kind === 'eq');
      if (skipSeg !== run.seg) { skip = 0; skipSeg = run.seg; }
      const next = item.mode === 'guided' ? run.nextScript()?.line : eqs[done + skip];
      if (!next) { issue(`no reference line left in part ${run.seg + 1}`); return false; }
      let pressed = false;
      let alt = false;
      const h0 = run.history.length;
      const s0 = run.seg;
      const tpl = stage?.querySelector('.lines-template');
      const mx = stage?.querySelector('.mx-input')?.__mx;
      const ti = stage?.querySelector('.tok-display')?.__ti;
      const mi = stage?.querySelector('.mi-display')?.__mi;
      if (tpl && mi) {
        const answers = M.lines.blankAnswers(next, opts);
        for (let b = 0; b < answers.length; b++) {
          stage.querySelector(`.lines-template [data-blank="${b}"]`)?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          await S.typeMath(stage.querySelector('.mi-display').__mi, answers[b]);
        }
        pressed = press(["Valider l'étape", 'Valider l’étape']);
      } else if (mx) {
        if (mx.template) S.fillMatrix(mx, next.math, { guided: true });
        else fillGridOrText(mx, next.math);
        pressed = press(["Valider l'étape", 'Valider l’étape', 'Valider la ligne']);
      } else if (ti) {
        await S.typeTokens(ti, next.math);
        pressed = press('Valider la ligne');
      } else if (mi) {
        alt = (await S.typeMath(mi, next.math)) === 'alt';
        pressed = press(['Valider la ligne', "Valider l'étape"]);
      } else { issue(`nothing to do on « ${norm(stage?.textContent ?? '').slice(0, 120)} »`); return false; }
      lines++;
      S.trace.steps++;
      await wait(20);
      const after = runOf(item);
      if (!after.done && after.history.length === h0 && after.seg === s0 && !el.querySelector('.step-feedback.bad')) {
        // Not accepted (a message, a form to finish).
        const msg = norm(el.querySelector('.step-feedback')?.textContent ?? '');
        const typed = (mx ?? ti ?? stage?.querySelector('.mi-display')?.__mi)?.value;
        // 6/3 for 6÷3 is « simplify »: a student writes the next line.
        if (alt && item.mode !== 'guided' && eqs[done + skip + 1]) { skip++; continue; }
        issue(`line « ${next.math} » not accepted (typed « ${typed} »${pressed ? '' : ', no button to press'}): ${msg.slice(0, 200)}`);
        return false;
      }
    }
    issue('too many steps');
    return false;
  };

  // The fields of a counter-example or an example (ui/matrix-items.js
  // counterFields, ui/tf.js): grids, keypad inputs or text fields.
  async function fillCounter(el, c, answer) {
    const rows = [...el.querySelectorAll('.tf-counter-row')];
    const asks = c.ask?.length ? c.ask : [{ v: rows[0]?.querySelector('.mx-input') ? 'A' : 'x' }];
    for (let k = 0; k < asks.length; k++) {
      const row = rows[k];
      const v = answer?.[asks[k].v];
      if (v === undefined) { issue(`no reference value for ${asks[k].v}`); continue; }
      const mx = row?.querySelector('.mx-input')?.__mx;
      const mi = row?.querySelector('.mi-display')?.__mi;
      const tf = row?.querySelector('input.mx-text');
      if (mx) S.fillMatrix(mx, String(v));
      else if (mi) await S.typeMath(mi, String(v));
      else if (tf) { tf.value = String(v); fire(tf); } else issue(`no field for ${asks[k].v}`);
    }
  }

  async function playTf(item, el) {
    if (!item.decided) {
      const b = [...el.querySelectorAll('.tf-choices button')].find((x) => x.textContent === (item.truth ? 'Vrai' : 'Faux'));
      if (!b) { issue('no Vrai/Faux buttons'); return false; }
      b.click();
      await wait(0);
    }
    if (item.truth) return true;
    const c = item.counter;
    if (c.kind === 'truth') {
      for (const row of el.querySelectorAll('.tf-counter-row')) {
        const l = row.querySelector('.tf-label').textContent.replace(/\s*:\s*$/, '');
        const want = c.answer[l] ? 'V' : 'F';
        [...row.querySelectorAll('button')].find((b) => b.textContent === want)?.click();
      }
    } else await fillCounter(el, c, c.answer);
    press('Valider le contre-exemple');
    await wait(0);
    const fb = el.querySelector('.step-feedback.bad');
    if (fb) { issue(`counter-example refused: ${norm(fb.textContent).slice(0, 200)}`); return false; }
    return true;
  }

  async function playBlocks(item, el) {
    if (item.decision) {
      const o = refOption(item.decision.options);
      const b = choiceByLabel(el, o.label);
      if (!b) { issue('no block decision button'); return false; }
      b.click();
      await wait(0);
    }
    for (const id of item.order) {
      const blk = item.blocks.find((x) => x.id === id);
      const want = textOf(blk.html);
      const b = [...el.querySelectorAll('.blk-pool button.blk')].find((x) => norm(x.textContent) === want);
      if (!b) { issue(`block « ${want.slice(0, 60)} » not in the pool`); return false; }
      b.click();
      S.trace.steps++;
      await wait(0);
      if (blk.input) {
        const mi = el.querySelector('.blk-stage .mi-display')?.__mi;
        if (!mi) { issue('no input for a frame block'); return false; }
        await S.typeMath(mi, blk.input.answer);
        press('Valider le calcul');
        await wait(0);
      }
      const fb = el.querySelector('.step-feedback.bad');
      if (fb) { issue(`block refused: ${norm(fb.textContent).slice(0, 160)}`); return false; }
    }
    return true;
  }

  async function playTable(item, el) {
    const trs = [...el.querySelectorAll('table.u-table tbody tr')];
    if (item.answers.root !== undefined) { const f = el.querySelector('.table-root input'); if (f) { f.value = item.answers.root; fire(f); } }
    item.table.rows.forEach((r, i) => {
      const tds = [...trs[i].children].slice(1);
      r.cells.forEach((c, j) => {
        if (!c || c.auto || c.given !== undefined) return;
        const raw = item.answers[r.id][j];
        const want = String(raw).replace(/-/g, '−');
        const inp = tds[j].querySelector('input');
        const btn = tds[j].querySelector('button.tf-cell');
        if (inp) { inp.value = String(raw); fire(inp); } else if (btn) {
          for (let n = 0; n < 5 && btn.textContent !== want; n++) btn.click();
          if (btn.textContent !== want) issue(`cell ${r.id}[${j}]: cannot show « ${want} »`);
        }
      });
    });
    press('Valider le tableau');
    await wait(0);
    if (item.then) {
      const sub = await sleepUntil(() => el.querySelector('.table-then .exercise'), 1000);
      if (!sub) { issue(`table refused: ${norm(el.querySelector('.step-feedback')?.textContent ?? '')}`); return false; }
      const ok = await S.play(item.then, sub);
      if (ok && needsCheck(item.then)) press('Valider');
      return ok;
    }
    return true;
  }

  async function playPlot(item, el) {
    const svg = el.querySelector('svg.plot-svg');
    const [xmin, xmax] = item.view.x;
    const [ymin, ymax] = item.view.y;
    const SIZE = 280;
    const PAD = 18;
    const tap = ([x, y]) => {
      const r = svg.getBoundingClientRect();
      const px = PAD + ((x - xmin) * (SIZE - 2 * PAD)) / (xmax - xmin);
      const py = SIZE - PAD - ((y - ymin) * (SIZE - 2 * PAD)) / (ymax - ymin);
      svg.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: r.left + (px * r.width) / SIZE, clientY: r.top + (py * r.height) / SIZE }));
    };
    for (const p of item.place) {
      el.querySelector(`.plot-tool[data-id="${p.id}"]`)?.click();
      for (const g of item.answer[p.id] || []) {
        if (p.kind === 'point') tap(g);
        else { tap(g[0]); tap(g[1]); }
      }
    }
    return true;
  }

  async function playCode(item, el) {
    const holes = [...el.querySelectorAll('.code-hole')];
    item.holes.forEach((hole, k) => {
      const f = holes[k];
      if (hole.options) { f.value = String(hole.options.findIndex((o) => o.correct)); fire(f, 'change'); } else { f.focus(); f.value = hole.answer; fire(f); }
    });
    press('Vérifier le programme');
    await wait(0);
    if (item.then) {
      const sub = await sleepUntil(() => el.querySelector('.table-then .exercise'), 1000);
      if (!sub) { issue(`program refused: ${norm(el.querySelector('.step-feedback')?.textContent ?? '')}`); return false; }
      const ok = await S.play(item.then, sub);
      if (ok && needsCheck(item.then)) press('Valider');
      return ok;
    }
    return true;
  }

  async function playDomain(item, el) {
    const rows = [...el.querySelectorAll('.tf-counter-row')];
    for (let k = 0; k < item.fields.length; k++) {
      const [lo, hi] = item.answer[item.fields[k].v];
      const ds = rows[k].querySelectorAll('.mi-display');
      await S.typeMath(ds[0].__mi, lo);
      await S.typeMath(ds[1].__mi, hi);
    }
    press('Valider');
    return true;
  }

  const pickOptions = (item, el) => {
    const bs = [...el.querySelectorAll('.choices button.choice')];
    if (bs.length !== item.options.length) issue(`${bs.length} choices shown for ${item.options.length} options`);
    item.options.forEach((o, i) => { if (o.correct) bs[i]?.click(); });
    return true;
  };

  // Plays a problem from wherever its run is, part by part.
  S.playProblem = async (item, el, { stopAfterParts = Infinity } = {}) => {
    const runOfP = () => [...S.problems].reverse().find((r) => r.item === item || r.item.key === item.key);
    let played = 0;
    for (let guard = 0; guard < 40; guard++) {
      const run = await sleepUntil(() => runOfP());
      if (!run) { issue('no problem run'); return false; }
      if (run.done) return true;
      if (played >= stopAfterParts) return 'stopped';
      const i = run.part;
      const part = item.parts[i];
      const sub = await sleepUntil(() => { const s = el.querySelector('.problem-part .exercise.problem-sub'); return s && runOfP().part === i ? s : null; });
      if (!sub) { issue(`part ${i + 1} not shown`); return false; }
      const ok = await S.play(part, sub);
      if (!ok) return false;
      if (needsCheck(part)) press('Vérifier');
      const moved = await sleepUntil(() => runOfP().done || runOfP().part !== i, 4000);
      if (!moved) { issue(`part ${i + 1} (${part.type}) did not end: ${norm(sub.textContent).slice(-160)}`); return false; }
      played++;
      await wait(700);
    }
    return false;
  };

  // Plays any item mounted in `el` (an .exercise element), up to its last
  // action. The caller presses the screen's own « Vérifier » when needed.
  S.play = async (item, el) => {
    switch (item.type) {
      case 'lines': return S.playLines(item, el);
      case 'mcq': return pickOptions(item, el);
      case 'tf': return playTf(item, el);
      case 'tokens': await S.typeTokens(el.querySelector('.tok-display').__ti, item.answer); press('Valider'); return true;
      case 'blocks': return playBlocks(item, el);
      case 'table': return playTable(item, el);
      case 'matrix': fillGridOrText(el.querySelector('.mx-input').__mx, item.answer); press('Valider'); return true;
      case 'example': await fillCounter(el, item.property, item.answer); press('Valider'); return true;
      case 'plot': return playPlot(item, el);
      case 'domain': return playDomain(item, el);
      case 'code': return playCode(item, el);
      case 'readtable': {
        const q = item.question;
        if (q.type === 'mcq' && q.multi) return pickOptions(q, el);
        return S.play(q, el.querySelector('.exercise'));
      }
      case 'answer': await S.typeMath(el.querySelector('.mi-display').__mi, item.expected); return true;
      case 'problem': return S.playProblem(item, el);
      default: issue(`no player for type ${item.type}`); return false;
    }
  };
  const needsCheck = (item) => ['mcq', 'plot', 'answer'].includes(item.type) || (item.type === 'readtable' && needsCheck(item.question));

  // Mounts an item in the lesson screen, plays its reference answer and
  // reads the feedback panel.
  S.playItem = async (item) => {
    S.trace = { issues: [], untypable: [], steps: 0 };
    S.takeErrors();
    const el = S.mount(item);
    // The lesson plays a copy of the item.
    const it = window.__hopingoItem;
    const scan = [];
    let ok = false;
    try { ok = await S.play(it, el); } catch (e) { issue(`player: ${e.stack || e.message}`); }
    scan.push(...S.scan());
    if (ok && needsCheck(it)) press('Vérifier');
    const panel = await sleepUntil(() => document.querySelector('.feedback.show'), ok ? 4000 : 300);
    if (!panel && ok) issue(`still on: ${norm(document.querySelector('.lesson-body')?.textContent ?? '').slice(-300)}`);
    scan.push(...S.scan());
    return {
      played: ok === true, ended: !!panel, correct: !!panel && panel.classList.contains('good'),
      cont: !!panel && [...panel.querySelectorAll('button')].some((b) => b.textContent.trim() === 'Continuer'),
      panel: panel ? norm(panel.textContent).slice(0, 300) : '', steps: S.trace.steps,
      issues: S.trace.issues, untypable: S.trace.untypable, scan: [...new Set(scan)], errors: S.takeErrors(),
    };
  };

  // The item types a skill gives, by level and variant (to pick the sample).
  S.typesOf = (skill, seed) => {
    const def = M.skills.SKILL_BY_ID[skill];
    const out = {};
    const runs = [...[1, 2, 3, 4, 5].map((l) => ({ level: l })), ...(def.exam || []).map((e) => ({ level: 4, exam: e }))];
    const add = (t, r) => { (out[t] ||= []).push(r); };
    for (const r of runs) {
      try {
        const it = S.gen(skill, r.level, r.exam, seed);
        add(it.type === 'lines' ? `lines-${it.mode}` : it.type, r);
        if (it.type === 'problem') for (const p of it.parts) add(`problem/${p.type === 'lines' ? `lines-${p.mode}` : p.type}`, r);
        if (it.then) add(`then/${it.then.type}`, r);
        if (it.type === 'readtable') add(`readtable/${it.question.type}`, r);
      } catch { /* reported by the mount phase */ }
    }
    return out;
  };

  // ---------- mock exams ----------
  S.examStart = async (id) => {
    S.takeErrors();
    M.app.go('exam', { id });
    await wait(20);
    if (!press("Commencer l'examen")) return { err: `no start button: ${norm(document.querySelector('main').textContent).slice(0, 200)}` };
    await wait(20);
    const run = M.app.profile.examRun;
    return { n: run.exam.questions.length, kinds: run.exam.questions.map((q) => q.kind + (q.item.multi ? '+' : '')).join(' ') };
  };

  // The reference answer of question i, through the exam screen.
  S.examAnswer = async (from, to, { openParts = Infinity } = {}) => {
    S.trace = { issues: [], untypable: [], steps: 0 };
    const run = M.app.profile.examRun;
    for (let i = from; i < Math.min(to, run.exam.questions.length); i++) {
      const dot = document.querySelectorAll('.exam-dot')[i];
      if (!dot) { issue(`no dot ${i + 1}`); continue; }
      dot.click();
      await wait(10);
      const q = run.exam.questions[i];
      const it = q.item;
      const card = document.querySelector('.exam-card');
      if (q.kind === 'mcq') {
        const bs = [...card.querySelectorAll('.choices button.choice')];
        it.options.forEach((o, k) => { if (o.correct) { bs[k].click(); } });
        // Each click repaints the card: the buttons are found again.
        if (it.multi) {
          const want = it.options.map((o, k) => (o.correct ? k : -1)).filter((k) => k >= 0).join();
          if (String(run.responses[i]) !== want) {
            for (const k of it.options.map((o, j) => (o.correct ? j : -1)).filter((j) => j >= 0)) {
              if (!(run.responses[i] || []).includes(k)) document.querySelectorAll('.exam-card .choices button.choice')[k].click();
            }
          }
        }
      } else if (q.kind === 'tf') {
        [...card.querySelectorAll('.tf-choices button')].find((b) => b.textContent === (it.truth ? 'Vrai' : 'Faux'))?.click();
      } else if (q.kind === 'coef') {
        const f = card.querySelector('input.mx-text');
        const ref = it.type === 'lines' ? it.script.filter((l) => l.kind === 'eq').at(-1).math : it.expected;
        f.value = ref;
        f.dispatchEvent(new Event('change', { bubbles: true }));
      } else if (q.kind === 'open') {
        const el = card.querySelector('.exercise');
        const r = await S.playProblem(it, el, { stopAfterParts: openParts });
        if (r === false) issue(`question ${i + 1} (problem ${it.skill}) not played to the end`);
      }
      await wait(10);
    }
    return { issues: S.trace.issues, untypable: S.trace.untypable, answered: run.responses.filter((x) => x !== null).length, errors: S.takeErrors(), scan: S.scan() };
  };

  S.examResume = async () => {
    // From the home screen, as after closing the app.
    M.app.go('home');
    await wait(20);
    const b = document.querySelector('.exam-resume');
    if (!b) return { err: 'no « Reprendre l\'examen blanc » on the home screen' };
    b.click();
    await wait(20);
    if (!press('Reprendre (il reste…')) return { err: `no resume button: ${norm(document.querySelector('main')?.textContent ?? '').slice(0, 200)}` };
    await wait(20);
    const run = M.app.profile.examRun;
    return { answered: run.responses.filter((x) => x !== null).length, dots: document.querySelectorAll('.exam-dot.answered').length };
  };

  S.examFinish = async () => {
    if (!press('Rendre ma copie')) return { err: 'no hand-in button' };
    await wait(20);
    if (!press('Oui, rendre ma copie')) return { err: 'no confirm button' };
    await wait(50);
    const g = document.querySelector('.exam-grade-num');
    if (!g) return { err: `no result: ${norm(document.querySelector('main')?.textContent ?? '').slice(0, 200)}` };
    const corr = [...document.querySelectorAll('details.exam-corr')];
    return {
      grade: Number(g.textContent.replace(',', '.').replace('−', '-')),
      verdict: norm(document.querySelector('.exam-verdict')?.textContent ?? ''),
      notRight: corr.map((d, i) => (d.classList.contains('right') ? null : `${i + 1}: ${norm(d.querySelector('summary').textContent)}`)).filter(Boolean),
      scan: S.scan(), errors: S.takeErrors(), last: M.app.profile.lastExam?.result?.score, max: M.app.profile.lastExam?.result?.max,
    };
  };
  S.examIds = () => M.exams.EXAMS.map((e) => e.id);

  // ---------- can the reference be typed with the item's keypads? ----------
  // Every text typed in a keypad input (lines, blanks, a decision's value,
  // counter-examples, blocks, bounds, short answers) is checked against the
  // keys of its keypads plus what a keyboard gives (ASCII the input takes).
  const keyList = (spec) => {
    const names = Array.isArray(spec) && spec.length && spec.every((k) => k.length > 1) ? spec : null;
    const mk = (keys) => { const mi = new M.keypad.MathInput({ keys }); return mi.keyList; };
    if (names) return names.flatMap((n) => mk(n) ?? [`?${n}`]);
    if (Array.isArray(spec)) return spec;
    return mk(spec) ?? [`?${spec}`];
  };
  const NOT_TEXT = new Set(['back', 'left', 'right', 'ok', 'enter', '']);
  S.untypable = (text, spec) => {
    const keys = keyList(spec).filter((k) => !NOT_TEXT.has(k));
    const unknown = keys.filter((k) => k.startsWith('?'));
    if (unknown.length) return `unknown keypad ${unknown.join(' ')}`;
    const set = new Set(keys);
    const letters = keys.some((k) => /^[a-zA-Zπ]$/.test(k));
    const multi = keys.filter((k) => k.length > 1 && k !== 'frac').sort((a, b) => b.length - a.length);
    const t = String(text).replace(/−/g, '-');
    const out = new Set();
    for (let i = 0; i < t.length;) {
      const m = multi.find((k) => t.startsWith(k, i));
      if (m) { i += m.length; continue; }
      const c = t[i];
      const ok = set.has(c) || /[0-9]/.test(c) || c === ' ' || (letters && /[a-zA-Z]/.test(c))
        || ((c === '/' || c === '÷') && set.has('frac')) || ((c === '*' || c === '·') && set.has('×')) || (c === '.' && set.has(','))
        || (c === '×' && set.has('·'));
      if (!ok) out.add(c);
      i++;
    }
    return out.size ? [...out].join('') : null;
  };
  // The texts of an item that are typed in keypad inputs: [{text, keys, where}].
  S.typedTexts = (item, out = [], where = '') => {
    const add = (text, keys, w) => { if (text !== undefined && text !== null && String(text) !== '') out.push({ text: String(text), keys, where: where + w }); };
    switch (item.type) {
      case 'lines': {
        const keys = { item };
        M.lines.segmentsOf(item).forEach((seg, s) => {
          const cfg = seg.judge;
          const grid = M.idx.judgeFor(cfg).input === 'matrix';
          for (const l of seg.lines) {
            if (l.kind === 'decision') for (const o of l.options) if (o.then && (o.ref || o.valid)) add(o.then.expect, keys, ` part ${s + 1} then`);
            if (l.kind !== 'eq' || grid || cfg.kind === 'logic') continue;
            if (item.mode === 'guided' && l.blanks?.length) M.lines.blankAnswers(l, M.common.parseOpts(cfg)).forEach((b) => add(b, keys, ` part ${s + 1} blank`));
            else add(l.math, keys, ` part ${s + 1}`);
          }
        });
        break;
      }
      case 'tf': {
        const c = item.counter;
        if (!item.truth && c && c.kind !== 'truth' && !(M.mxitems?.usesGrid?.(c))) {
          for (const a of c.ask?.length ? c.ask : [{ v: 'x' }]) add(c.answer?.[a.v], a.keys || ['calc', 'set'], ` counter ${a.v}`);
        }
        break;
      }
      case 'blocks': for (const b of item.blocks) if (b.input) add(b.input.answer, b.input.keys || ['calc', 'relation'], ' block'); break;
      case 'domain': for (const f of item.fields) for (const x of item.answer[f.v]) add(x, item.keys || ['calc', 'calcfn'], ` bound ${f.v}`); break;
      case 'answer': add(item.expected === 'aucune' ? '∅' : item.expected, { item }, ' answer'); break;
      case 'problem': item.parts.forEach((p, i) => S.typedTexts(p, out, `${where} part ${i + 1}`)); break;
      case 'table': case 'code': if (item.then) S.typedTexts(item.then, out, `${where} then`); break;
      case 'readtable': S.typedTexts(item.question, out, `${where} question`); break;
      default: break;
    }
    return out;
  };
  // With the keypads the screens add for the symbols (js/ui/keys-needed.js).
  const isNames = (k) => Array.isArray(k) && k.length && k.every((x) => x.length > 1);
  S.coverage = (item) => S.typedTexts(item).map((x) => {
    const keys = x.keys?.item ? M.kn.keysForItem(x.keys.item).flatMap((t) => t.keys) : isNames(x.keys) ? M.kn.keysFor(x.keys, [x.text]) : x.keys;
    return { ...x, keys, missing: S.untypable(x.text, keys) };
  }).filter((x) => x.missing);

  // ---------- wrong answers ----------
  // A lines item: the first trap answer of its judge typed as the first line;
  // the mistake must be shown, and named when the judge names it.
  S.wrongLine = async (skill, level, seed) => {
    const [diag, print, normal, diff, mal] = await Promise.all(['/js/judges/diagnose.js', '/js/cas/print.js', '/js/cas/normal.js', '/js/cas/diff.js', '/js/math/malrules.js'].map((u) => import(u)));
    const item = S.gen(skill, level, null, seed);
    if (item.type !== 'lines' || item.mode === 'guided') return null;
    const cfg = item.judge;
    if (M.idx.judgeFor(cfg).input === 'matrix' || cfg.kind === 'logic') return null;
    const start = M.idx.readWith(cfg, item.start.math);
    const finish = cfg.kind === 'equiv' ? (n) => normal.pretty(diff.expandDerivs(n)) : (n) => n;
    let traps = [];
    try { traps = diag.trapAnswers(cfg.kind, start, cfg, finish).slice(0, 4); } catch { return null; }
    // The first trap the judge itself names.
    const t = traps.find((x) => { const v = new M.lines.LinesRun(item).submit(x.node); return v.kind === 'wrong' && v.rule; });
    if (!t) return null;
    S.trace = { issues: [], untypable: [], steps: 0 };
    S.takeErrors();
    const el = S.mount(item);
    let text = '';
    try { text = t.node.text ?? M.idx.textWith(cfg, t.node); } catch { text = ''; }
    if (!text) return null;
    const stage = el.querySelector('.lines-stage');
    if (stage.querySelector('.lines-choices')) {
      // Tap mode: the right action first.
      const run = runOf(window.__hopingoItem);
      const o = M.actions.actionsFor(item.tapActions, run.prev, run.cfg).find((x) => x.valid);
      if (!o) return null;
      choiceByLabel(stage, o.label)?.click();
      await wait(0);
    }
    const mi = stage.querySelector('.mi-display')?.__mi;
    if (!mi) return { skill, err: 'no input' };
    await S.typeMath(mi, text);
    press('Valider la ligne');
    await wait(20);
    const fb = el.querySelector('.step-feedback');
    const tag = fb?.querySelector('.trap-tag')?.textContent ?? '';
    const name = mal.RULE_BY_ID[t.rule]?.name ?? t.rule;
    return {
      skill, key: item.key, line: text, rule: t.rule, name, bad: !!fb?.classList.contains('bad'), tag: norm(tag),
      named: tag.includes(name), scan: S.scan(), errors: S.takeErrors(), untypable: S.trace.untypable,
    };
  };

  // A multiple choice: a wrong option that carries a trap; the lesson panel
  // must say it is wrong and name the trap.
  S.wrongChoice = async (skill, seed) => {
    const def = M.skills.SKILL_BY_ID[skill];
    if (!(def.exam || []).includes('mcq')) return null;
    const item = S.gen(skill, 4, 'mcq', seed);
    if (item.type !== 'mcq' || item.multi) return null;
    const k = item.options.findIndex((o) => !o.correct && o.rule);
    if (k < 0) return null;
    S.takeErrors();
    const el = S.mount(item);
    el.querySelectorAll('.choices button.choice')[k].click();
    press('Vérifier');
    const panel = await sleepUntil(() => document.querySelector('.feedback.show'), 1000);
    const mal = await import('/js/math/malrules.js');
    const name = mal.RULE_BY_ID[item.options[k].rule]?.name ?? item.options[k].rule;
    return {
      skill, key: item.key, rule: item.options[k].rule, bad: !!panel?.classList.contains('bad'),
      named: norm(panel?.querySelector('.trap-tag')?.textContent ?? '').includes(name), name,
      cont: !!panel && [...panel.querySelectorAll('button')].some((b) => /Continuer|Lis la correction/.test(b.textContent)),
      scan: S.scan(), errors: S.takeErrors(),
    };
  };

  // ---------- a long problem, saved halfway ----------
  S.problemHalf = async (skill, level, exam, seed) => {
    S.trace = { issues: [], untypable: [], steps: 0 };
    S.takeErrors();
    const item = S.gen(skill, level, exam, seed);
    if (item.type !== 'problem' || item.parts.length < 2) return { err: `not a problem of 2 parts or more: ${item.type}` };
    const el = S.mount(item);
    const it = window.__hopingoItem;
    const half = Math.floor(it.parts.length / 2);
    const r = await S.playProblem(it, el, { stopAfterParts: half });
    await wait(300);
    const p = M.app.profile;
    return { key: it.key, parts: it.parts.length, half, r, pending: !!p.pending, log: p.pending?.log?.length ?? 0, issues: S.trace.issues, errors: S.takeErrors(), scan: S.scan() };
  };
  S.problemResume = async () => {
    S.trace = { issues: [], untypable: [], steps: 0 };
    S.takeErrors();
    M.app.go('home');
    await wait(20);
    if (!press('Reprendre le problème…')) return { err: `no « Reprendre le problème » on the home screen` };
    await wait(50);
    const it = window.__hopingoItem;
    const el = document.querySelector('.lesson-body .exercise');
    const board = norm(el?.querySelector('.problem-board')?.textContent ?? '');
    const ok = await S.playProblem(it, el);
    const panel = await sleepUntil(() => document.querySelector('.feedback.show'), 4000);
    return {
      board, played: ok === true, correct: !!panel?.classList.contains('good'), panel: norm(panel?.textContent ?? '').slice(0, 200),
      cont: !!panel && [...panel.querySelectorAll('button')].some((b) => b.textContent.trim() === 'Continuer'),
      pendingAfter: !!M.app.profile.pending, issues: S.trace.issues, errors: S.takeErrors(), scan: S.scan(),
    };
  };

  // ---------- a school lesson, played to its end ----------
  S.schoolLesson = async (skill) => {
    S.trace = { issues: [], untypable: [], steps: 0 };
    S.takeErrors();
    const p = M.app.profile;
    M.app.go('lesson', { kind: 'skill', skill });
    const seen = [];
    for (let n = 0; n < 30; n++) {
      await wait(30);
      if (document.querySelector('.done')) break;
      const it = window.__hopingoItem;
      if (it.type === 'intro') { press('À toi !'); seen.push('intro'); continue; }
      const el = document.querySelector('.lesson-body .exercise');
      const mi = el?.querySelector('.mi-display')?.__mi;
      seen.push(`${it.type}${it.mode ? `:${it.mode}` : ''}`);
      if (it.type === 'steps' && it.mode === 'guided') {
        // The blanks of each canonical step, from the solver (as the screen does).
        for (let guard = 0; guard < 12 && !document.querySelector('.feedback.show'); guard++) {
          const blanks = [...el.querySelectorAll('.step-line.current .m-blank')];
          if (!blanks.length) break;
          const want = S.schoolBlanks(it, el);
          blanks.forEach((b, i) => { b.click(); for (const ch of want[i] ?? '') key(ch); });
          press("Valider l'étape");
          await wait(80);
        }
      } else if (['steps', 'eqlines', 'answer', 'fact'].includes(it.type) && mi) {
        await S.typeMath(mi, it.answer ?? it.expected);
        if (!press(['Valider la ligne', 'Valider', 'Vérifier'])) key('Enter');
      } else if (it.type === 'mcq') { pickOptions(it, el); press('Vérifier'); } else { issue(`school item type ${it.type} not played`); }
      const panel = await sleepUntil(() => document.querySelector('.feedback.show') || document.querySelector('.done') || (window.__hopingoItem !== it && window.__hopingoItem), 3000);
      if (panel?.classList?.contains('feedback')) {
        if (!panel.classList.contains('good')) issue(`${it.key}: ended wrong: ${norm(panel.textContent).slice(0, 160)}`);
        for (let w = 0; w < 120 && !S.click('Continuer'); w++) await wait(100);
      } else if (!panel) issue(`${it.key}: did not end: ${norm(el?.textContent ?? '').slice(-160)}`);
    }
    const done = document.querySelector('.done');
    const out = { seen, done: !!done, title: norm(done?.querySelector('h1')?.textContent ?? ''), issues: S.trace.issues, untypable: S.trace.untypable, errors: S.takeErrors(), scan: S.scan() };
    if (done) S.click('Continuer');
    return out;
  };
  // The numbers of the current guided step: the solver's line, its fresh numbers in order.
  S.schoolBlanks = (it, el) => {
    const ex = M.expr;
    const lines = M.solver.solve(ex.tidy(ex.parse(it.expr)), it.solveOpts || undefined);
    const done = el.querySelectorAll('.steps-history .step-line:not(.first)').length;
    const line = lines[done];
    const out = [];
    const signedIn = [];
    ex.walk(line.node, (n, path) => {
      if (out.length >= 4 || signedIn.some((q) => path.length > q.length && q.every((k, i) => path[i] === k))) return;
      if (it.signed && n.t === 'neg' && n.e.t === 'num' && n.e.fresh) { out.push(`-${n.e.s}`); signedIn.push(path); } else if (n.t === 'num' && n.fresh) out.push(n.s);
    });
    return out;
  };

  // ---------- free steps above an answer (spec §17) ----------
  // A lesson of `skill` whose item starts with a line matching `re`.
  S.stepsFind = async (skill, re, level = 3) => {
    S.trace = { issues: [], untypable: [], steps: 0 };
    S.takeErrors();
    const { skillState } = await import('/js/engine/learner.js');
    Object.assign(skillState(M.app.profile, skill), { level, introduced: true });
    for (let n = 0; n < 60; n++) {
      M.app.go('lesson', { kind: 'skill', skill });
      await wait(20);
      if (window.__hopingoItem?.type === 'intro') { press('À toi !'); await wait(20); }
      const it = window.__hopingoItem;
      if (it?.skill === skill && it.start && new RegExp(re).test(it.start.math)) return { start: it.start.math, key: it.key };
    }
    return null;
  };
  // Types a line on the keypad (S.typeMath), returns the field's markup.
  S.stepsType = async (text) => {
    const mi = document.querySelector('.answer-row .mi-display').__mi;
    await S.typeMath(mi, text);
    return { value: mi.value, html: mi.display.innerHTML, untypable: S.trace.untypable.splice(0) };
  };
  S.stepsCopy = () => { press('⧉ Recopier la ligne'); return document.querySelector('.answer-row .mi-display').innerHTML; };
  S.stepsAdd = async () => {
    press('＋ Ajouter une étape');
    await wait(30);
    return S.stepsState();
  };
  S.stepsState = () => ({
    lines: [...document.querySelectorAll('.draft-lines .step-line')].map((l) => ({ cls: l.className, text: norm(l.textContent), html: l.innerHTML })),
    feedback: norm(document.querySelector('.exercise .step-feedback')?.textContent ?? ''),
    feedbackBad: !!document.querySelector('.exercise .step-feedback.bad'),
    value: document.querySelector('.answer-row .mi-display')?.__mi?.value ?? null,
  });
  S.stepsCheck = async () => {
    press('Vérifier');
    const panel = await sleepUntil(() => document.querySelector('.feedback.show'), 3000);
    return { good: !!panel?.classList.contains('good'), text: norm(panel?.textContent ?? '').slice(0, 200), errors: S.takeErrors(), scan: S.scan() };
  };

  S.uniSkills = () => M.uni.UNI_SKILLS.map((s) => ({ id: s.id, unit: s.unit, exam: s.exam || [] }));
  return S;
}

// ---------- phases ----------
async function phaseStart() {
  log('\n== start: profiles and map');
  await cdp.send('Runtime.evaluate', { expression: 'localStorage.clear()' });
  await load();
  const errs = await cdp.call('takeErrors');
  for (const e of errs) fail('start', 'load', e);
  for (const [label, track] of [['7H', null], ['Gymnase', null], ['BA1', null]]) {
    const r = await cdp.eval(`(async () => {
      const S = window.__smoke;
      if (!document.querySelector('.screen-create')) { S.M.app.go('create'); await S.wait(50); }
      const name = document.querySelector('.screen-create input.text');
      if (!name) return {err: 'no name field on the create screen: ' + document.querySelector('#app').className};
      name.value = 'Test ${label}'; name.dispatchEvent(new Event('input'));
      const chip = [...document.querySelectorAll('.chip')].find((c) => c.querySelector('b')?.textContent === '${label}');
      if (!chip) return {err: 'no chip ${label}'};
      chip.click();
      await S.wait(20);
      ${track ? '' : ''}
      if (!S.click("C'est parti !")) return {err: 'no go button'};
      await S.wait(50);
      if (!S.click('Commencer depuis le début')) return {err: 'no skip button on ' + document.querySelector('#app').className};
      await S.wait(100);
      // The map draws a unit as one column per school year (home.js): count units, not columns.
      const units = [...new Map([...document.querySelectorAll('section.unit')].map((u) => [u.dataset.unit, u])).values()];
      const nodes = document.querySelectorAll('.node').length;
      return {screen: document.querySelector('#app').className, units: units.length, ready: units.filter((u) => !u.classList.contains('locked')).length, nodes,
        all: S.M.skills.UNITS.length, skills: S.M.skills.SKILLS.length, scan: S.scan(), exams: document.querySelectorAll('.unit-tools .btn.secondary').length};
    })()`);
    if (r.err) { fail('start', label, r.err); continue; }
    log(`  ${label}: ${r.screen}, ${r.units}/${r.all} units drawn, ${r.nodes} stops for ${r.skills} skills, ${r.exams} exam buttons`);
    if (r.screen !== 'screen-home') fail('start', label, `ends on ${r.screen}`);
    if (r.units !== r.all) fail('start', label, `${r.units} units drawn of ${r.all}`);
    for (const s of r.scan) fail('start', `${label} map`, s);
    await shot(`map-${label}`);
    for (const e of await cdp.call('takeErrors')) fail('start', label, e);
  }
  // A lesson starts from « Continuer » on the BA1 map.
  const r = await cdp.eval(`(async () => { const S = window.__smoke; S.click('Continuer…') || document.querySelector('.cta .btn.primary').click(); await S.wait(100); return {screen: document.querySelector('#app').className, scan: S.scan(), errors: S.takeErrors()}; })()`);
  if (r.screen !== 'screen-lesson') fail('start', 'Continuer', `ends on ${r.screen}`);
  for (const s of [...r.scan, ...r.errors]) fail('start', 'first lesson', s);
  await shot('first-lesson-BA1');
}

// The map as a tree by year (home.js) and the language setting: in French
// and in English, on a phone and on a wide screen, the rail of years jumps
// to its band. Screenshots map-<lang>-<width>-<year>.
async function phaseMap() {
  log('\n== map: bands, rail of years, language');
  for (const lang of ['fr', 'en']) {
    await cdp.send('Runtime.evaluate', { expression: `localStorage.setItem('hopingo.lang', '${lang}')` });
    await load('', null); // this phase sets the language itself
    for (const width of [420, 1200]) {
      await cdp.send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
      const r = await cdp.eval(`(async () => {
        const S = window.__smoke;
        const app = S.M.app;
        if (!app.profile) {
          const p = app.store.createProfile({ name: 'Map', avatar: '🦊', year: 9, track: 'mid' });
          p.placement.done = true;
          app.save();
        }
        app.go('home');
        await S.wait(100);
        const out = { lang: document.documentElement.lang, bands: document.querySelectorAll('.band').length, rail: document.querySelectorAll('.rail-year').length, cta: document.querySelector('.cta .btn.primary')?.firstChild?.textContent, jumps: [] };
        for (const y of ['9', '13']) {
          document.querySelector('.rail-year[data-year="' + y + '"]').click();
          await S.wait(900);
          const top = document.querySelector('.band[data-year="' + y + '"]').getBoundingClientRect().top;
          out.jumps.push({ y, top: Math.round(top), active: document.querySelector('.rail-year.active')?.dataset.year });
        }
        return { ...out, errors: S.takeErrors() };
      })()`);
      for (const e of r.errors) fail('map', `${lang} ${width}`, e);
      if (r.lang !== lang) fail('map', `${lang} ${width}`, `page language ${r.lang}`);
      if (lang === 'en' && r.cta !== 'Continue' && r.cta !== 'Review') fail('map', `${lang} ${width}`, `call to action in ${r.cta}`);
      if (r.rail !== r.bands) fail('map', `${lang} ${width}`, `${r.rail} years on the rail for ${r.bands} bands`);
      for (const j of r.jumps) {
        if (j.top < 0 || j.top > 220) fail('map', `${lang} ${width} rail ${j.y}`, `band at ${j.top}px from the top`);
        if (j.active !== j.y) fail('map', `${lang} ${width} rail ${j.y}`, `rail lights ${j.active}`);
      }
      log(`  ${lang} ${width}px: ${r.bands} bands, rail jumps ${r.jumps.map((j) => `${j.y}→${j.top}px`).join(', ')}`);
      // Screenshots of a band of the school years and of BA1.
      for (const y of ['9', '13']) {
        await cdp.eval(`(async () => { document.querySelector('.rail-year[data-year="${y}"]').click(); await window.__smoke.wait(900); return 1; })()`);
        await shot(`map-${lang}-${width}-${y === '9' ? '9H' : 'BA1'}`);
      }
    }
  }
  await cdp.send('Runtime.evaluate', { expression: 'localStorage.removeItem(\'hopingo.lang\')' });
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 420, height: 900, deviceScaleFactor: 1, mobile: false });
}

// The skills to check: --skill, else the skills of --unit, else all.
async function skillList() {
  const all = await cdp.call('uniSkills');
  return all.filter((s) => (SKILLS ? SKILLS.includes(s.id) : UNITS ? UNITS.includes(s.unit) : true));
}

async function ensureProfile() {
  await cdp.eval(`(async () => { const a = window.__smoke.M.app; if (!a.profile) { a.store.createProfile({name: 'Smoke', avatar: '🦊', year: 13, track: 'unknown'}); } })()`);
}

async function phaseMount() {
  log('\n== mount: every university skill, levels 1-5 and exam variants');
  await load();
  await ensureProfile();
  const skills = await skillList();
  let k = 0;
  const t0 = Date.now();
  for (const s of skills) {
    k++;
    const r = await cdp.call('mountSkill', s.id, PER, SEED * 1000 + k * 37);
    report.counts.mounted += r.n;
    for (const i of r.issues) fail('mount', i.where, i.what);
    if (k % 25 === 0) log(`  ${k}/${skills.length} skills, ${report.counts.mounted} items, ${Math.round((Date.now() - t0) / 1000)} s`);
  }
  log(`  ${report.counts.mounted} items mounted for ${skills.length} skills`);
}

// Plays one item (skill, level, exam variant) to its end; records failures.
const untypable = new Map(); // missing characters → examples
async function playOne(phase, skill, level, exam, seed) {
  const where = `${skill} L${level}${exam ? ` ${exam}` : ''}`;
  let r;
  try {
    r = await cdp.eval(`(async () => { const S = window.__smoke; const it = S.gen(${JSON.stringify(skill)}, ${level}, ${JSON.stringify(exam ?? null)}, ${seed}); const r = await S.playItem(it); r.key = it.key; r.type = it.type + (it.mode ? ' ' + it.mode : ''); return r; })()`, 120000);
  } catch (e) { fail(phase, where, e.message); return null; }
  report.counts.played++;
  const at = `${where} (${r.type}) ${r.key}`;
  if (r.correct && r.cont) report.counts.playedRight++;
  else fail(phase, at, `${r.ended ? (r.correct ? 'no « Continuer »' : `ended wrong: ${r.panel.slice(0, 160)}`) : 'did not end'}${r.issues.length ? ` — ${r.issues.join(' ; ')}` : ''}`);
  for (const x of [...r.scan, ...r.errors]) fail(phase, at, x);
  for (const u of r.untypable) {
    report.counts.untypable++;
    const k = u.missed || '(spaces)';
    if (!untypable.has(k)) untypable.set(k, []);
    untypable.get(k).push(`${where}: « ${u.text} » typed « ${u.typed} »`);
  }
  return r;
}

async function phasePlay() {
  log('\n== play: reference answers typed through the screens');
  await load();
  await ensureProfile();
  const skills = await skillList();
  // The sample: PLAY skills per unit, spread over the unit, every level and
  // variant; then one skill for each item type not met yet.
  const byUnit = {};
  for (const s of skills) (byUnit[s.unit] ||= []).push(s);
  const chosen = [];
  for (const list of SKILLS ? [] : Object.values(byUnit)) {
    const n = Math.min(PLAY, list.length);
    for (let k = 0; k < n; k++) chosen.push(list[Math.floor(((k + 0.5) * list.length) / n)].id);
  }
  if (SKILLS) chosen.push(...skills.map((s) => s.id));
  const types = {};
  for (const s of SKILLS ? [] : skills) {
    const t = await cdp.call('typesOf', s.id, SEED);
    for (const [ty, runs] of Object.entries(t)) (types[ty] ||= []).push({ skill: s.id, ...runs[0] });
  }
  const covered = new Set();
  for (const id of chosen) { const t = await cdp.call('typesOf', id, SEED); Object.keys(t).forEach((x) => covered.add(x)); }
  const extra = [];
  for (const [ty, list] of Object.entries(types)) if (!covered.has(ty)) { extra.push({ ty, ...list[0] }); covered.add(ty); }
  log(`  ${chosen.length} skills at every level and variant, ${extra.length} more for the item types; types: ${Object.keys(types).sort().join(', ')}`);
  let k = 0;
  for (const id of chosen) {
    const def = skills.find((s) => s.id === id);
    for (const run of [...[1, 2, 3, 4, 5].map((l) => ({ level: l })), ...def.exam.map((e) => ({ level: 4, exam: e }))]) {
      await playOne('play', id, run.level, run.exam, SEED * 7919 + (++k));
    }
  }
  for (const x of extra) await playOne('play', x.skill, x.level, x.exam, SEED);
  for (const [chars, ex] of untypable) fail('play', `cannot type « ${chars} »`, `${ex.length} line(s), e.g. ${ex.slice(0, 3).join(' | ')}`);
  log(`  ${report.counts.playedRight}/${report.counts.played} items played right to the end`);
}

// Each mock exam: start, answer half, reload, resume from the home screen,
// answer the rest, hand in. Every answer is the reference: grade 6 expected.
async function phaseExams() {
  log('\n== exams: every mock exam from start to result');
  await load();
  await ensureProfile();
  const ids = (await cdp.call('examIds')).filter((id) => !list(opt('exam')) || list(opt('exam')).includes(id));
  for (const id of ids) {
    const t0 = Date.now();
    const st = await cdp.call('examStart', id);
    if (st.err) { fail('exams', id, st.err); continue; }
    const half = Math.ceil(st.n / 2);
    const a = await cdp.call('examAnswer', 0, half);
    await load();
    const back = await cdp.call('examResume');
    if (back.err) { fail('exams', id, back.err); continue; }
    if (back.answered !== a.answered || back.dots !== a.answered) fail('exams', id, `after the reload: ${back.answered} answers kept, ${back.dots} dots, ${a.answered} before`);
    const b = await cdp.call('examAnswer', half, st.n);
    await shot(`exam-${id}-question`);
    const r = await cdp.call('examFinish');
    report.counts.exams++;
    for (const x of [...a.issues, ...b.issues, ...a.errors, ...b.errors, ...a.scan, ...b.scan]) fail('exams', id, x);
    for (const u of [...a.untypable, ...b.untypable]) fail('exams', id, `cannot type « ${u.missed} » in « ${u.text} »`);
    if (r.err) { fail('exams', id, r.err); continue; }
    await shot(`exam-${id}-result`);
    log(`  ${id}: ${st.n} questions (${st.kinds}), grade ${r.grade} « ${r.verdict} », ${r.last}/${r.max} points, ${Math.round((Date.now() - t0) / 1000)} s`);
    if (!(r.grade >= 1 && r.grade <= 6)) fail('exams', id, `grade ${r.grade}`);
    if (r.notRight.length) fail('exams', id, `reference answers not marked right: ${r.notRight.join(' | ')}`);
    for (const x of [...r.scan, ...r.errors]) fail('exams', `${id} result`, x);
  }
}

// Wrong answers: per unit, a typical wrong line (a trap of the judge) and a
// multiple choice answered with an option that carries a trap.
async function phaseWrong() {
  log('\n== wrong: typical mistakes are shown and named');
  await load();
  await ensureProfile();
  const skills = await skillList();
  const units = [...new Set(skills.map((s) => s.unit))];
  let lines = 0;
  let choices = 0;
  for (const u of units) {
    const list = skills.filter((s) => s.unit === u);
    let doneLine = false;
    let doneChoice = false;
    for (const s of list) {
      if (!doneLine) {
        for (const level of [4, 5]) {
          const r = await cdp.call('wrongLine', s.id, level, SEED + level);
          if (!r) continue;
          doneLine = true;
          lines++;
          const at = `${s.id} L${level} ${r.key}: « ${r.line} » (${r.rule})`;
          if (r.err) fail('wrong', at, r.err);
          else if (!r.bad) fail('wrong', at, 'the wrong line is not shown as wrong');
          else if (!r.named) fail('wrong', at, `the trap « ${r.name} » is not named (shown: « ${r.tag} »)`);
          for (const x of [...(r.scan || []), ...(r.errors || [])]) fail('wrong', at, x);
          break;
        }
      }
      if (!doneChoice) {
        const r = await cdp.call('wrongChoice', s.id, SEED);
        if (r) {
          doneChoice = true;
          choices++;
          const at = `${s.id} mcq ${r.key} (${r.rule})`;
          if (!r.bad) fail('wrong', at, 'the wrong option is not marked wrong');
          else if (!r.named) fail('wrong', at, `the trap « ${r.name} » is not named in the panel`);
          if (!r.cont) fail('wrong', at, 'no « Continuer » in the panel');
          for (const x of [...r.scan, ...r.errors]) fail('wrong', at, x);
        }
      }
      if (doneLine && doneChoice) break;
    }
  }
  log(`  ${lines} wrong lines, ${choices} wrong choices in ${units.length} units`);
  await shot('wrong-choice');
}

// A long problem: half of it, a reload, « Reprendre le problème » on the
// home screen, the rest.
async function phaseProblem() {
  log('\n== problem: saved halfway, resumed after a reload');
  await load();
  await ensureProfile();
  const cases = [['m-cholesky', 4, 'open'], ['a1-ser-param', 4, 'open'], ['n-ode-euler-global', 5, null]];
  for (const [skill, level, exam] of cases) {
    const a = await cdp.call('problemHalf', skill, level, exam, SEED);
    if (a.err) { fail('problem', skill, a.err); continue; }
    if (a.r !== 'stopped') fail('problem', `${skill} ${a.key}`, `first half: ${a.r} ${a.issues.join(' ; ')}`);
    if (!a.pending) fail('problem', `${skill} ${a.key}`, 'nothing saved in profile.pending');
    for (const x of [...a.errors, ...a.scan]) fail('problem', skill, x);
    await shot(`problem-${skill}-half`);
    await load();
    const b = await cdp.call('problemResume');
    if (b.err) { fail('problem', skill, b.err); continue; }
    report.counts.played++;
    if (b.correct && b.cont && !b.pendingAfter) report.counts.playedRight++;
    else fail('problem', `${skill} ${a.key}`, `resumed: correct ${b.correct}, Continuer ${b.cont}, still pending ${b.pendingAfter}: ${b.panel} ${b.issues.join(' ; ')}`);
    for (const x of [...b.errors, ...b.scan]) fail('problem', skill, x);
    log(`  ${skill}: ${a.parts} parts, ${a.half} played, ${a.log} actions saved; resumed with « ${b.board.slice(0, 80)} »; ${b.correct ? 'right' : 'not right'}`);
    await shot(`problem-${skill}-end`);
  }
}

// School units: a lesson of fractions and one of equations, to the end.
async function phaseSchool() {
  log('\n== school: a lesson of fractions and one of equations');
  await load();
  await cdp.eval(`(async () => { const a = window.__smoke.M.app; a.store.createProfile({name: 'École', avatar: '🐼', year: 9, track: 'unknown'}); const { applyPlacement } = await import('/js/engine/learner.js'); applyPlacement(a.profile, 0); a.save(); })()`);
  for (const skill of ['frac-add-any', 'eq-both-sides']) {
    const r = await cdp.call('schoolLesson', skill);
    log(`  ${skill}: ${r.seen.join(', ')} → ${r.done ? r.title : 'not finished'}`);
    if (!r.done) fail('school', skill, 'the lesson did not end');
    for (const x of [...r.issues, ...r.errors, ...r.scan]) fail('school', skill, x);
    for (const u of r.untypable) fail('school', skill, `cannot type « ${u.missed} » in « ${u.text} »`);
    await shot(`school-${skill}`);
  }
}

// Free steps (spec §17): rat-equation x + c/x = s solved on screen in four
// lines, each typed on the keypad, drawn in 2D and checked; a wrong line
// (s not multiplied by x) is flagged and its trap named. Screenshots of the
// field show a fraction, a power and a root.
async function shotOf(name, selector) {
  const box = await cdp.eval(`(() => { const el = document.querySelector(${JSON.stringify(selector)}); el.scrollIntoView({ block: 'center' }); const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; })()`);
  const clip = { x: Math.max(0, box.x - 10), y: Math.max(0, box.y - 10), width: box.w + 20, height: box.h + 20, scale: 2 };
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', clip });
  const file = join(OUT, `${name}.png`);
  writeFileSync(file, Buffer.from(data, 'base64'));
  report.screenshots.push(file);
  return file;
}

async function phaseSteps() {
  log('\n== steps: rat-equation solved in four checked lines');
  await load();
  await cdp.eval(`(async () => { const a = window.__smoke.M.app; a.store.createProfile({name: 'Étapes', avatar: '🦉', year: 12, track: 'unknown'}); const { applyPlacement } = await import('/js/engine/learner.js'); applyPlacement(a.profile, 0); a.save(); })()`);
  const found = await cdp.call('stepsFind', 'rat-equation', '^x\\+12/x=7$') ?? await cdp.call('stepsFind', 'rat-equation', '^x\\+\\d+/x=\\d+$');
  if (!found) { fail('steps', 'rat-equation', 'no item x + c/x = s'); return; }
  const [, c, s] = /^x\+(\d+)\/x=(\d+)$/.exec(found.start).map(Number);
  const roots = [];
  for (let r = 1; r < s; r++) if (r * (s - r) === c && !roots.includes(s - r)) roots.push(r);
  const [r1, r2] = roots.length === 1 ? [roots[0], s - roots[0]] : roots;
  log(`  item ${found.start}, solutions ${r1} and ${r2}`);
  await shot('steps-question');
  const ok = (cond, what) => { if (!cond) fail('steps', found.start, what); };
  // The start line copied into the field: a fraction in 2D.
  const copied = await cdp.call('stepsCopy');
  ok(/m-frac/.test(copied), 'the copied line has no 2D fraction');
  log(`  ${await shotOf('steps-input-fraction', '.answer-row')}`);
  // A wrong first line: s not multiplied by x.
  let t = await cdp.call('stepsType', `x^2+${c}=${s}`);
  ok(/m-sup/.test(t.html), 'no raised exponent in the field');
  let st = await cdp.call('stepsAdd');
  ok(st.feedbackBad && st.lines.length === 0, `the wrong line is not flagged: ${st.feedback}`);
  ok(/Multiplier seulement certains termes/.test(st.feedback), `the trap is not named: ${st.feedback}`);
  log(`  wrong line: ${st.feedback.slice(0, 140)}`);
  await shot('steps-wrong-line');
  // The four lines.
  const chain = [`x^2+${c}=${s}x`, `x^2-${s}x+${c}=0`, `(x-${r1})(x-${r2})=0`];
  for (const [i, line] of chain.entries()) {
    t = await cdp.call('stepsType', line);
    ok(t.value === line, `typed « ${t.value} » for « ${line} »`);
    for (const u of t.untypable) fail('steps', line, `cannot type « ${u.missed} »`);
    if (i === 0) log(`  ${await shotOf('steps-input-power', '.answer-row')}`);
    st = await cdp.call('stepsAdd');
    ok(!st.feedbackBad, `« ${line} » refused: ${st.feedback}`);
  }
  ok(st.lines.length === 4, `${st.lines.length} lines on screen (start + 3 steps expected)`);
  ok(st.lines.slice(1).every((l) => /\bok\b/.test(l.cls) && /vérifiée/.test(l.text)), 'a line is not marked as checked');
  ok(/m-sup/.test(st.lines[1]?.html ?? ''), 'the kept line is not drawn in 2D');
  // A root in the field (the formula), then cleared.
  t = await cdp.call('stepsType', `x=(${s}+√(${s * s}-${4 * c}))/2`);
  ok(/m-sqrt/.test(t.html) && /m-frac/.test(t.html), 'no radical or fraction in the field');
  log(`  ${await shotOf('steps-input-root', '.answer-row')}`);
  // The answer.
  t = await cdp.call('stepsType', `x=${r1};x=${r2}`);
  log(`  ${await shot('steps-before-check')}`);
  const v = await cdp.call('stepsCheck');
  ok(v.good, `the answer is not accepted: ${v.text}`);
  for (const x of [...v.errors, ...v.scan]) fail('steps', found.start, x);
  log(`  verdict: ${v.good ? 'juste' : v.text}`);
  log(`  ${await shot('steps-checked')}`);
}

// A debug aid: mounts one item (--skill, --level, --exam, --seed) and prints
// the elements whose text looks wrong, with a screenshot.
async function phaseDump() {
  await load();
  await ensureProfile();
  const r = await cdp.eval(`(async () => {
    const S = window.__smoke;
    const it = S.gen(${JSON.stringify(SKILLS?.[0])}, ${Number(opt('level', 1))}, ${JSON.stringify(opt('exam', null))}, ${SEED});
    S.mount(it);
    const bad = [...document.querySelectorAll('#app *')].filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && /<math|&lt;|&gt;|undefined|NaN/.test(n.textContent)));
    return {key: it.key, type: it.type, bad: bad.map((e) => e.outerHTML.slice(0, 600)), errors: S.takeErrors(), scan: S.scan()};
  })()`);
  log(JSON.stringify(r, null, 2));
  log(await shot('dump'));
}

// ---------- main ----------
async function main() {
  // Another server on the port would serve another folder.
  if (await fetch(BASE).then(() => true, () => false)) throw new Error(`port ${PORT} is already in use: give --port N`);
  startServer();
  await waitFor(BASE);
  startBrowser();
  cdp = await Cdp.connect();
  await cdp.send('Runtime.enable');
  await cdp.send('Log.enable');
  await cdp.send('Page.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 420, height: 900, deviceScaleFactor: 1, mobile: false });
  cdp.on((m) => {
    if (m.method === 'Runtime.exceptionThrown') report.console.push(`exception: ${m.params.exceptionDetails.exception?.description ?? m.params.exceptionDetails.text}`);
    if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') report.console.push(`log: ${m.params.entry.text} ${m.params.entry.url ?? ''}`);
  });
  await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: `(${pageLib.toString()})();` });
  await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: `(${physiquePage.toString()})();` });
  const PH = { start: phaseStart, map: phaseMap, mount: phaseMount, play: phasePlay, wrong: phaseWrong, exams: phaseExams, problem: phaseProblem, school: phaseSchool, steps: phaseSteps, dump: phaseDump,
    physique: () => phasePhysique({ cdp, load, shot, fail, log, SKILLS, PER, SEED }) };
  for (const name of [...PHASES, 'dump'].filter((p) => ONLY.includes(p))) {
    if (!PH[name]) continue;
    const n0 = report.failures.length;
    const t0 = Date.now();
    try { await PH[name](); } catch (e) { fail(name, 'phase', e.stack || e.message); }
    report.phases[name] = { failures: report.failures.length - n0, seconds: Math.round((Date.now() - t0) / 1000) };
  }
  const uniq = [...new Set(report.console)];
  if (uniq.length) { log('\nBrowser console errors:'); for (const c of uniq.slice(0, 30)) log(`  ${c}`); }
  writeFileSync(join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  log(`\nSummary: ${JSON.stringify(report.counts)}`);
  for (const [n, p] of Object.entries(report.phases)) log(`  ${n}: ${p.failures} failure(s), ${p.seconds} s`);
  log(`Report: ${join(OUT, 'report.json')}`);
  stopAll();
  process.exit(report.failures.length ? 1 : 0);
}

main().catch((e) => { console.error(e); stopAll(); process.exit(2); });
