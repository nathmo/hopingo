import { GEN } from './js/content/uni/cplx-b.js';
import { makeRng } from './js/content/random.js';
import { checkScript } from './js/judges/lines.js';
import { checkProblem } from './js/judges/problem.js';
import { VERIFY } from './js/content/uni/cplx-b-kit.js';
VERIFY.on = true;
const rng = makeRng(5);
const ids = process.argv.slice(2);
for (const id of ids) for (const lv of [1,2,3,4,5,'mcq','coef','open']) for (let i = 0; i < 30; i++) {
  let it;
  try { it = typeof lv === 'number' ? GEN[id](lv, rng, null, {}) : GEN[id](4, rng, null, { exam: lv }); } catch (e) { console.log(id, lv, 'THROW', e.stack.split('\n').slice(0,3).join(' ')); break; }
  if (it.type === 'lines') { const r = checkScript(it); if (!r.ok) { console.log(id, lv, it.key, JSON.stringify(r.log)); } }
  if (it.type === 'problem') { const r = checkProblem(it); if (!r.ok) console.log(id, lv, it.key, JSON.stringify(r.why ?? r.score)); }
}
console.log('verified', VERIFY.count);
