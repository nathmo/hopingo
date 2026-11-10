import { generate, describe } from './js/content/generators.js';
import { makeRng } from './js/content/random.js';
const id = process.argv[2]; const rng = makeRng(Number(process.argv[3] || 5));
const lv = (process.argv[4] || '1,3,5').split(',').map(Number);
for (const l of lv) console.log(describe(generate(id, l, rng)), '\n');
for (const e of (process.argv[5] || 'mcq,tf,coef').split(',')) { try { console.log(describe(generate(id, 4, rng, null, { exam: e }))); } catch (er) { console.log(e, er.message); } }
