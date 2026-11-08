// Writes docs/samples-<unit>.md: examples of every skill at every level,
// for content review. Run: npm run samples
import { writeFileSync, mkdirSync } from 'node:fs';
import { UNITS, unitSkills } from '../js/content/skills.js';
import { generate, describe } from '../js/content/generators.js';
import { makeRng } from '../js/content/random.js';
import { RULES } from '../js/math/malrules.js';

mkdirSync('docs', { recursive: true });

for (const unit of UNITS) {
  const rng = makeRng(42);
  const skills = unitSkills(unit.id);
  const ids = new Set(skills.map((s) => s.id));
  const out = [
    `# Exemples de questions — ${unit.title}`,
    '',
    'Généré par `npm run samples` (graine fixe). Trois exemples par niveau.',
    '`[guided]` = étapes à trous, `[tap]` = on touche l\'opération à faire, `[free]` = lignes libres.',
    'Les « pièges » sont les erreurs connues que la question peut détecter (voir docs/error-catalogue.md).',
    '',
  ];
  for (const skill of skills) {
    out.push(`## ${skill.title} (\`${skill.id}\`, ${skill.year}H)`, '', `_${skill.desc}_`, '');
    for (let level = 1; level <= 5; level++) {
      out.push(`### Niveau ${level}`, '', '```');
      for (let i = 0; i < 3; i++) out.push(describe(generate(skill.id, level, rng)), '');
      out.push('```', '');
    }
  }
  out.push('## Pièges de cette unité', '');
  for (const r of RULES.filter((x) => ids.has(x.skill))) out.push(`- **${r.name}** (\`${r.id}\`, ${r.tag}) : ${r.example[0]} au lieu de ${r.example[1]}`);
  const file = `docs/samples-${unit.id}.md`;
  writeFileSync(file, out.join('\n') + '\n');
  console.log(`${file} écrit.`);
}
