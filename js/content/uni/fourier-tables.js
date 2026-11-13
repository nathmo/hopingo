// The tables of transforms shown during the items of module F (catalogue F,
// « Tables à embarquer »; step U10): a folded <details> block that a
// generator appends to its prompt (the exams allow the tables). Data:
// js/cas/tables/fourier.js and laplace.js.

import { FOURIER_TABLE, FOURIER_PROPS } from '../../cas/tables/fourier.js';
import { LAPLACE_TABLE, LAPLACE_PROPS } from '../../cas/tables/laplace.js';
import { t } from '../../i18n.js';

export { FOURIER_TABLE, FOURIER_PROPS, LAPLACE_TABLE, LAPLACE_PROPS };

// table: 'mt2122' (default, formulaire MT 2021-22) or 'dt' (Dacorogna-Tanteri).
export function fourierTableHtml({ table = 'mt2122', props = true } = {}) {
  const col = table === 'dt' ? 'dt' : 'mt';
  const rows = FOURIER_TABLE.filter((r) => r[col] || r.distribution)
    .map((r) => `<tr><td>${r[col] ?? r.id}</td><td>${t(r.fHtml)}</td><td>${t(r.FHtml)}</td></tr>`).join('');
  const p = props ? `<ul class="tf-props">${FOURIER_PROPS.map((x) => `<li>${x.id} : ${t(x.html)}</li>`).join('')}</ul>` : '';
  return `<details class="transform-table"><summary>${t('Table de Fourier')}</summary><table><tr><th>${t('ligne')}</th><th>f(y)</th><th>f̂(α)</th></tr>${rows}</table>${p}</details>`;
}

export function laplaceTableHtml({ props = true } = {}) {
  const rows = LAPLACE_TABLE.map((r) => `<tr><td>${r.id}</td><td>${t(r.fHtml)}</td><td>${t(r.FHtml)}</td><td>${t(r.gHtml)}</td></tr>`).join('');
  const p = props ? `<ul class="tf-props">${LAPLACE_PROPS.map((x) => `<li>${x.id} : ${t(x.html)}</li>`).join('')}</ul>` : '';
  return `<details class="transform-table"><summary>${t('Table de Laplace')}</summary><table><tr><th>${t('ligne')}</th><th>f(t)</th><th>F(z)</th><th>Re z &gt;</th></tr>${rows}</table>${p}</details>`;
}
