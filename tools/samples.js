// Writes docs/samples-<unit>.md: examples of every skill at every level,
// plus one item per exam variant for the university skills, for content
// review. Run: npm run samples
import { writeFileSync, mkdirSync } from 'node:fs';
import { UNITS, unitSkills, YEARS } from '../js/content/skills.js';
import { generate, describe } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';
import { RULES } from '../js/math/malrules.js';

mkdirSync('docs', { recursive: true });

// School years keep their « 9H » label; later ones use theirs (Gymnase, BA1…).
const yearLabel = (y, uni) => (uni ? YEARS.find((x) => x.id === y)?.label ?? `${y}` : `${y}H`);

for (const unit of UNITS) {
  const rng = makeRng(42);
  const skills = unitSkills(unit.id);
  const ids = new Set(skills.map((s) => s.id));
  const uni = skills.some((s) => s.exam || s.intro?.lines);
  const out = [
    `# Exemples de questions — ${unit.title}`,
    '',
    'Généré par `npm run samples` (graine fixe). Trois exemples par niveau.',
    '`[guided]` = étapes à trous, `[tap]` = on touche l\'opération à faire, `[free]` = lignes libres.',
    'Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).',
    '',
  ];
  if (uni) {
    out.splice(4, 0, 'Lignes : « = … » est une ligne du corrigé, avec sa règle après ←. Les cases □ sont à remplir (la réponse est entre parenthèses). « ? » est une décision à choisir, « — » ouvre une nouvelle partie jugée par un autre juge.');
  }
  for (const skill of skills) {
    out.push(`## ${skill.title} (\`${skill.id}\`, ${yearLabel(skill.year, uni)})`, '', `_${skill.desc}_`, '');
    for (let level = 1; level <= 5; level++) {
      out.push(`### Niveau ${level}`, '', '```');
      for (let i = 0; i < 3; i++) out.push(describe(generate(skill.id, level, rng)), '');
      out.push('```', '');
    }
    if (skill.exam?.length) {
      out.push('### Variantes d\'examen', '', '```');
      for (const exam of skill.exam) out.push(describe(generate(skill.id, 4, rng, null, { exam })), '');
      out.push('```', '');
    }
  }
  out.push('## Pièges de cette unité', '');
  for (const r of RULES.filter((x) => ids.has(x.skill))) out.push(`- **${r.name}** (\`${r.id}\`, ${r.tag}) : ${r.example[0]} au lieu de ${r.example[1]}`);
  const file = `docs/samples-${unit.id}.md`;
  writeFileSync(file, out.join('\n') + '\n');
  console.log(`${file} écrit.`);
}
