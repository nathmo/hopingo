// Phase « physique » of tools/browser-smoke.js:
//   - every physics skill (units phys-outils, energie, recette,
//     incertitudes), levels 1 to 5, mounted by the lesson screen and scanned
//     like the other phases (no exception, no « undefined », an input);
//   - 6-step problems played through the screen, step by step, with the
//     reference work typed on the keypad; a screenshot after each step; the
//     item must end right;
//   - a wrong algebra line at level 1 is refused and its trap named.
//
//   node tools/browser-smoke.js --only physique [--skill ph6-meca] [--per 2]

// Runs in the page, after the smoke library (window.__smoke).
export function physiquePage() {
  const S = window.__smoke;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  let P = null;
  const load = async () => {
    if (P) return P;
    const [judge, problems, units, expr, fmt, recette] = await Promise.all([
      '/js/physics/recipe.js', '/js/content/physique/problems.js', '/js/physics/units.js', '/js/physics/expr.js',
      '/js/content/physique/format.js', '/js/content/physique/recette.js',
    ].map((u) => import(u)));
    P = { judge, problems, units, expr, fmt, recette };
    return P;
  };
  const q = (sel) => document.querySelector(sel);
  const qa = (sel) => [...document.querySelectorAll(sel)];
  const footBtn = () => q('.steps-footer > button.btn.primary');
  const mi = () => q('.recipe-panel .mi-display')?.__mi;
  const step = () => Number(q('.recipe-tab.current b')?.textContent);
  const feedback = () => q('.step-feedback')?.textContent.trim() ?? '';
  const ended = () => !!q('.feedback.show');

  // A unit as typed on the keypad: kg·m^2/(s^3·A).
  const unitTyped = (d) => {
    const B = ['kg', 'm', 's', 'K', 'A', 'mol', 'cd'];
    const up = [];
    const down = [];
    B.forEach((b, i) => { if (d[i] > 0) up.push(d[i] === 1 ? b : `${b}^${d[i]}`); if (d[i] < 0) down.push(d[i] === -1 ? b : `${b}^${-d[i]}`); });
    const top = up.join('·') || '1';
    return down.length ? `${top}/${down.length > 1 ? `(${down.join('·')})` : down[0]}` : top;
  };

  S.physMount = (skill, per, seed) => {
    const issues = [];
    let n = 0;
    for (let level = 1; level <= 5; level++) {
      for (let i = 0; i < per; i++) {
        const where = `${skill} L${level} #${i + 1}`;
        S.takeErrors();
        let item;
        try { item = S.gen(skill, level, null, seed + level * 10 + i); } catch (e) { issues.push({ where, what: `generate: ${e.message}` }); continue; }
        try {
          S.mount(item);
          n++;
          const what = [...S.scan(), ...S.checkKeypads()];
          if (!S.inputs(q('.screen-lesson')) && !qa('.recipe-panel button, .recipe-panel .mi-display').length) what.push('no input on screen');
          for (const e of S.takeErrors()) what.push(e);
          for (const w of what) issues.push({ where, what: w });
        } catch (e) { issues.push({ where, what: `mount: ${e.stack || e.message}` }); }
      }
    }
    return { n, issues };
  };

  // Mounts a recipe item of `skill` and keeps it for physStep.
  S.physStart = async (skill, level, seed) => {
    await load();
    const item = S.gen(skill, level, null, seed);
    S.physItem = item;
    S.mount(item);
    await wait(30);
    return { key: item.key, title: item.title, active: item.active, feedback: item.feedback, sheet: item.sheet, text: item.prompt };
  };

  // Does the current step with the reference work → what happened.
  S.physStep = async () => {
    const { judge, problems, units, expr, fmt, recette } = await load();
    const item = S.physItem;
    const pb = item.problem;
    const k = step();
    const out = { step: k, did: [], untypable: [] };
    const type = async (text) => { const m = mi(); if (!m) { out.did.push(`no input for ${text}`); return; } const r = await S.typeMath(m, text); if (r === false) out.untypable.push(text); };
    const enter = async () => { S.key('Enter'); await wait(20); };
    const next = async () => { footBtn()?.click(); await wait(30); };
    const ref = expr.parse(pb.ref, pb.symbols).sides[1];
    if (k === 1) {
      if (item.sheet === 'pick' && item.active.includes(1)) {
        for (const src of judge.step1Targets(pb)) {
          const b = qa('button.recipe-formula').find((x) => x.dataset.src === src && !x.classList.contains('kept'));
          if (b) { b.click(); await wait(10); out.did.push(`pick ${src}`); }
        }
      }
      for (let guard = 0; guard < 10 && q('.recipe-datum.todo') && item.active.includes(1); guard++) {
        const d = pb.data.find((x) => !x.isSI && q('.recipe-datum.todo')?.textContent.includes(String(x.shown).replace('.', ',')));
        const target = d ?? pb.data.find((x) => !x.isSI);
        await type(fmt.typed(target.si, 6));
        out.did.push(`SI ${target.sym} = ${fmt.typed(target.si, 6)}`);
        await next();
      }
      await next();
    } else if (k === 2) {
      for (const row of qa('div.recipe-formula.kept')) {
        if (!pb.formulas.includes(row.dataset.src)) { row.querySelector('.recipe-x')?.click(); await wait(10); out.did.push(`remove ${row.dataset.src}`); }
      }
      const roles = judge.expectedRoles(pb);
      for (const [sym, role] of Object.entries(roles)) {
        if (role === 'libre') continue;
        q(`button.recipe-color[data-color="${role}"]`)?.click();
        await wait(5);
        q(`button.hl[data-sym="${sym}"]`)?.click();
        await wait(5);
      }
      out.did.push('marks');
      await next();
    } else if (k === 3) {
      for (const l of pb.lines) { await type(l); await enter(); out.did.push(l); }
      const cancel = q('.recipe-cancel button[data-id="right"]');
      if (cancel) { cancel.click(); await wait(10); out.did.push('cancel: right'); }
      await next();
    } else if (k === 4) {
      const d = judge.dimOfExpr(pb, ref).d;
      await type(unitTyped(d));
      await enter();
      out.did.push(unitTyped(d));
      q('.recipe-cancel button[data-id="yes"]')?.click();
      await wait(10);
      await next();
    } else if (k === 5) {
      const est = Number(recette.estimateOf(pb, ref).toPrecision(1));
      await type(fmt.typed(est, 1));
      await enter();
      out.did.push(`≈ ${fmt.typed(est, 1)}`);
      await next();
    } else if (k === 6) {
      q('.recipe-cancel button[data-id="coherent"]')?.click();
      await wait(20);
      if (mi()) { await type(fmt.typed(pb.answerValue, 3)); out.did.push(`answer ${fmt.typed(pb.answerValue, 3)}`); }
      await next();
    } else if (k === 7) {
      const syms = [...new Set(qa('button[data-end]').map((b) => b.dataset.sym))];
      const want = judge.minEnds(pb, ref, syms);
      for (const s of syms) { q(`button[data-sym="${s}"][data-end="${want[s]}"]`)?.click(); await wait(5); }
      await next();
      q('.recipe-cancel button[data-ok="1"]')?.click();
      await wait(10);
      out.did.push('range');
      await next();
    }
    await wait(30);
    out.feedback = feedback();
    out.bad = !!q('.step-feedback.bad');
    out.now = ended() ? 'end' : step();
    out.good = !!q('.feedback.show.good');
    out.errors = S.takeErrors();
    out.scan = S.scan();
    return out;
  };

  // A wrong line at level 1 (feedback 'live'): refused, trap named.
  S.physWrongLine = async (line) => {
    const m = mi();
    await S.typeMath(m, line);
    S.key('Enter');
    await wait(30);
    return { feedback: feedback(), bad: !!q('.step-feedback.bad'), lines: qa('.recipe-panel .steps-history .step-line').length };
  };
}

// Runs in Node, inside tools/browser-smoke.js.
export async function phasePhysique({ cdp, load, shot, fail, log, SKILLS, PER, SEED }) {
  log('\n== physique: every physics skill mounted, 6-step problems played');
  await load();
  await cdp.eval(`(async () => { const a = window.__smoke.M.app; a.store.createProfile({name: 'nathmo', avatar: '🦉', year: 11, track: 'unknown'}); const { applyPlacement } = await import('/js/engine/learner.js'); applyPlacement(a.profile, 0); a.save(); })()`);
  const all = await cdp.eval(`window.__smoke.M.skills.SKILLS.filter((s) => ['phys-outils', 'energie', 'recette', 'incertitudes'].includes(s.unit)).map((s) => s.id)`);
  const skills = SKILLS ? all.filter((s) => SKILLS.includes(s)) : all;
  let mounted = 0;
  for (const skill of skills) {
    const r = await cdp.call('physMount', skill, PER, SEED);
    mounted += r.n;
    for (const x of r.issues) fail('physique', x.where, x.what);
  }
  log(`  ${mounted} items mounted (${skills.length} skills)`);
  // Full problems played through the screen.
  const plays = [['ph6-meca', 1], ['ph6-meca', 4], ['ph6-thermo', 3], ['ph6-elec', 5], ['ph6-ouvert', 5], ['ph6-trier', 2], ['ph6-chemin', 2], ['ph6-algebre', 4], ['ph6-unites', 2], ['ph6-approx', 3], ['ph6-verdict', 2], ['rg-in-problem', 3]]
    .filter(([s]) => skills.includes(s));
  for (const [skill, level] of plays) {
    const info = await cdp.call('physStart', skill, level, SEED + level);
    log(`  ${skill} L${level} (${info.feedback}, ${info.sheet}): ${info.title}`);
    await shot(`phys-${skill}-L${level}-0`);
    let last = null;
    for (let i = 0; i < 12; i++) {
      last = await cdp.call('physStep');
      for (const u of last.untypable) fail('physique', `${skill} step ${last.step}`, `cannot type « ${u} »`);
      for (const e of [...last.errors, ...last.scan]) fail('physique', `${skill} step ${last.step}`, e);
      log(`    step ${last.step}: ${last.did.join(' · ').slice(0, 160)}${last.bad ? `  ✗ ${last.feedback.slice(0, 120)}` : ''}`);
      await shot(`phys-${skill}-L${level}-${i + 1}-step${last.step}`);
      if (last.now === 'end') break;
      if (last.now === last.step && last.bad) { fail('physique', `${skill} step ${last.step}`, `stuck: ${last.feedback}`); break; }
    }
    if (last?.now !== 'end') fail('physique', skill, 'the problem did not end');
    else if (!last.good) fail('physique', skill, 'the reference work was graded wrong');
  }
  // A wrong line is refused at level 1.
  if (skills.includes('ph6-algebre')) {
    for (let seed = SEED; seed < SEED + 40; seed++) {
      const info = await cdp.call('physStart', 'ph6-algebre', 1, seed);
      if (!/:(luge|toboggan):v:/.test(info.key)) continue;
      const r = await cdp.call('physWrongLine', 'v = 2 g h');
      if (!r.bad || r.lines !== 0) fail('physique', 'wrong line', `v = 2 g h not refused: ${r.feedback}`);
      else if (!/Racine oubliée/.test(r.feedback)) fail('physique', 'wrong line', `the trap is not named: ${r.feedback}`);
      else log(`  wrong line refused: ${r.feedback.slice(0, 120)}`);
      await shot('phys-wrong-line');
      break;
    }
  }
}
