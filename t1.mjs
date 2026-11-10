import { generate, describe } from './js/content/generators.js';
import { makeRng } from './js/content/random.js';
const r = makeRng(11); const id = process.argv[2];
for (const l of [1,2,3,4,5]) console.log(describe(generate(id, l, r)) + '\n');
for (const e of (process.argv[3]||'').split(',').filter(Boolean)) console.log(describe(generate(id, 4, r, null, { exam: e })) + '\n');
