// The physics chapter in English (js/i18n/en/physique.js and
// skills-physique.js): the 6-step problems come out without French, and the
// catalogue and the traps have their English entries.
import { test } from 'node:test';
import assert from 'node:assert/strict';

// The language is read once, when js/i18n.js is first imported.
process.env.HOPINGO_LANG = 'en';
const load = async () => {
  const { GEN } = await import('../js/content/physique/recette.js');
  const { makeRng } = await import('../js/content/random.js');
  const { PHYS_UNITS, PHYS_SKILLS } = await import('../js/content/physique/skills.js');
  const { PHYS_RULES, PHYS_FAMILIES } = await import('../js/content/physique/rules.js');
  const { default: OUTILS } = await import('../js/content/physique/rules-outils.js');
  const { default: ENERGIE } = await import('../js/content/physique/rules-energie.js');
  const { default: INCERTITUDES } = await import('../js/content/physique/rules-incertitudes.js');
  const { CATALOG, default: EN } = await import('../js/i18n/en/index.js');
  return { GEN, makeRng, PHYS_UNITS, PHYS_SKILLS, PHYS_RULES, PHYS_FAMILIES, OTHER: [...OUTILS, ...ENERGIE, ...INCERTITUDES], CATALOG, EN };
};

// Words that only appear in a French text.
const FRENCH = ['Quelle', 'Combien', 'Étape', 'données', 'À quelle', 'On néglige', 'sans pertes', 'inconnue', 'chemin', 'Trier', 'cohérent', ' de l\'', ' est '];
const strip = (s) => String(s ?? '').replace(/<[^>]*>/g, ' ');

test('6-step problems in English: no French left, no unfilled {x}', async () => {
  const { GEN, makeRng, PHYS_SKILLS } = await load();
  const skills = [...PHYS_SKILLS.filter((s) => s.unit === 'recette').map((s) => s.id), 'rg-in-problem'];
  const rng = makeRng(11);
  for (const id of skills) {
    assert.ok(GEN[id], `generator ${id}`);
    for (let level = 1; level <= 5; level++) {
      for (let k = 0; k < 10; k++) {
        const it = GEN[id](level, rng);
        const texts = [['prompt', it.prompt], ['title', it.title], ...it.solution.flatMap((s, i) => [[`solution ${i}`, s.html], [`note ${i}`, s.note]])];
        for (const [what, raw] of texts) {
          const s = strip(raw);
          for (const w of FRENCH) assert.ok(!s.includes(w), `${id} L${level} ${what} has « ${w} »: ${s}`);
          assert.ok(!/\{[^{}\s]+\}/.test(s), `${id} L${level} ${what} has an unfilled placeholder: ${s}`);
        }
      }
    }
  }
});

test('the physics catalogue has its English entries', async () => {
  const { PHYS_UNITS, PHYS_SKILLS, CATALOG } = await load();
  for (const u of PHYS_UNITS) assert.ok(u.title in CATALOG, `unit ${u.id}`);
  for (const s of PHYS_SKILLS) {
    for (const [f, v] of [['title', s.title], ['desc', s.desc], ['intro.rule', s.intro.rule]]) {
      assert.ok(v in CATALOG, `${s.id} ${f}: ${v.slice(0, 60)}`);
      assert.notEqual(CATALOG[v], v, `${s.id} ${f} is not translated`);
    }
  }
});

test('the traps and families of rules.js have their English entries', async () => {
  const { PHYS_RULES, PHYS_FAMILIES, OTHER, EN } = await load();
  // rules.js translates at import: under English, names and explanations
  // must be English texts of the dictionary (the other units' traps are
  // checked with their own dictionaries).
  const english = new Set(Object.values(EN));
  const others = new Set(OTHER.map((r) => r.id));
  const own = PHYS_RULES.filter((r) => !others.has(r.id));
  assert.ok(own.length >= 30);
  for (const r of own) {
    assert.ok(english.has(r.name), `${r.id} name: ${r.name}`);
    assert.ok(english.has(r.explain()), `${r.id} explain`);
  }
  for (const [id, f] of Object.entries(PHYS_FAMILIES)) {
    assert.ok(f.name in EN, `family ${id} name`);
    assert.ok(f.hint in EN, `family ${id} hint`);
  }
});
