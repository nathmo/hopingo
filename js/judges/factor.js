// Judge `factor` (spec §5.2, §16.2, step U3): factorisations of a matrix A.
// A line names some factors, « L = [[…]] ; U = [[…]] »; the factors given
// so far are kept in the state. Each factor must have its shape (and the
// value that the convention makes unique); the item ends when all the
// factors are there and their product gives A.
//
// cfg: {kind:'factor', A: '[[…]]', of: 'LU' | 'PLU' | 'QR' | 'cholesky' |
//       'PDP' | 'orthodiag' | 'SVD', names?: {…}}
// Factors: LU → L, U; PLU → P, L, U; QR → Q, R; cholesky → L (A = LLᵀ);
// PDP → P, D (AP = PD); orthodiag → Q (or P), D; SVD → U, Σ (or S), V.
// Entries may hold roots (1/√5): those checks run in floating point.
// Its traps (judges: ['factor']) get the factor named in ctx.cfg._name.

import * as MX from '../cas/matrix.js';
import { parseExpr, evalAst, envOf, toQ, mmul, sameValue, tr, isZeroScalar } from '../cas/matexpr.js';
import { evalFloat } from '../cas/numeric.js';
import { diagnoseLine } from './diagnose.js';
import {
  readMat, mopts, wrongV, parseLine, show, text, input, toF, fmul, ftr, fclose, fident,
} from './matcommon.js';
import { t } from '../i18n.js';

export { parseLine, show, text, input };

export const FACTORS = {
  LU: ['L', 'U'], PLU: ['P', 'L', 'U'], QR: ['Q', 'R'], cholesky: ['L'], PDP: ['P', 'D'], orthodiag: ['Q', 'D'], SVD: ['U', 'Σ', 'V'],
};
const ALIAS = { orthodiag: { P: 'Q' }, SVD: { S: 'Σ' } };
const NAMES_FR = { L: 'L', U: 'U', P: 'P', Q: 'Q', R: 'R', D: 'D', 'Σ': 'Σ', V: 'V' };

const CACHE = new WeakMap();
function ref(cfg) {
  if (CACHE.has(cfg)) return CACHE.get(cfg);
  const opts = mopts(cfg);
  const A = evalAst(parseExpr(cfg.A, opts), { ...envOf(cfg) }, opts);
  const Aq = toQ(A);
  const Af = toF(A);
  const out = { A, Aq, Af, m: A.rows.length, n: A.rows[0].length };
  if (cfg.of === 'LU' && Aq) out.lu = MX.lu(Aq);
  if (cfg.of === 'QR' && Aq) {
    const g = MX.qrGS(Aq);
    if (g) {
      const norms = g.norms2.map((x) => Math.sqrt(x.valueOf()));
      out.Q = MX.toNumbers(g.V).map((r) => r.map((x, j) => x / norms[j]));
      out.R = MX.toNumbers(g.C).map((r, i) => r.map((x) => x * norms[i]));
    }
  }
  if (cfg.of === 'SVD' || cfg.of === 'orthodiag' || cfg.of === 'PDP') {
    out.charpoly = Aq && Aq.length === Aq[0].length ? MX.charpoly(Aq) : null;
  }
  if (cfg.of === 'SVD') {
    out.AtA = fmul(ftr(Af), Af);
    out.AAt = fmul(Af, ftr(Af));
    out.sigmas = svals(Af);
  }
  CACHE.set(cfg, out);
  return out;
}

// Singular values from the eigenvalues of AᵀA (Jacobi on a small matrix).
function svals(Af) {
  const B = fmul(ftr(Af), Af);
  const ev = jacobiEig(B).values.map((x) => Math.sqrt(Math.max(0, x))).sort((a, b) => b - a);
  return ev;
}

export function jacobiEig(S0) {
  const n = S0.length;
  const A = S0.map((r) => [...r]);
  const V = fident(n);
  for (let sweep = 0; sweep < 60; sweep++) {
    let off = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += A[i][j] ** 2;
    if (off < 1e-24) break;
    for (let p = 0; p < n; p++) {
      for (let q = p + 1; q < n; q++) {
        if (Math.abs(A[p][q]) < 1e-30) continue;
        const theta = (A[q][q] - A[p][p]) / (2 * A[p][q]);
        const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
        const c = 1 / Math.sqrt(t * t + 1);
        const s = t * c;
        for (let k = 0; k < n; k++) {
          const akp = A[k][p]; const akq = A[k][q];
          A[k][p] = c * akp - s * akq; A[k][q] = s * akp + c * akq;
        }
        for (let k = 0; k < n; k++) {
          const apk = A[p][k]; const aqk = A[q][k];
          A[p][k] = c * apk - s * aqk; A[q][k] = s * apk + c * aqk;
        }
        for (let k = 0; k < n; k++) {
          const vkp = V[k][p]; const vkq = V[k][q];
          V[k][p] = c * vkp - s * vkq; V[k][q] = s * vkp + c * vkq;
        }
      }
    }
  }
  return { values: A.map((r, i) => r[i]), vectors: V };
}

const isUpperF = (X) => X.every((r, i) => r.every((x, j) => j >= i || Math.abs(x) < 1e-9));
const isLowerF = (X) => X.every((r, i) => r.every((x, j) => j <= i || Math.abs(x) < 1e-9));
const isDiagF = (X) => X.every((r, i) => r.every((x, j) => i === j || Math.abs(x) < 1e-9));
const orthCols = (X) => fclose(fmul(ftr(X), X), fident(X[0].length));
const sizeMsg = (name, m, n) => t('{name} doit être de taille {s}.', { name, s: `${m}×${n}` });

// One factor: null if it is fine, else a message.
function checkFactor(cfg, name, v, R, all) {
  if (v.k !== 'm') return t('{name} doit être une matrice.', { name });
  const F = toF(v);
  if (F.flat().some((x) => !Number.isFinite(x))) return t('Je n\'arrive pas à calculer les cases de {name}.', { name });
  const [m, n] = [F.length, F[0].length];
  const { m: am, n: an } = R;
  const sq = (k) => (m !== k || n !== k ? sizeMsg(name, k, k) : null);
  switch (`${cfg.of}:${name}`) {
    case 'LU:L': case 'PLU:L': {
      if (sq(am)) return sq(am);
      if (!isLowerF(F) || F.some((r, i) => Math.abs(r[i] - 1) > 1e-9)) return t('L doit être triangulaire inférieure, avec des 1 sur la diagonale.');
      if (cfg.of === 'LU' && R.lu && !fclose(F, MX.toNumbers(R.lu.L))) return t('Ce n\'est pas la matrice L de l\'élimination : chaque ℓᵢⱼ est le multiplicateur de Lᵢ ← Lᵢ − ℓᵢⱼLⱼ.');
      return null;
    }
    case 'LU:U': case 'PLU:U': {
      if (m !== am || n !== an) return sizeMsg('U', am, an);
      if (!isUpperF(F)) return t('U doit être triangulaire supérieure (échelonnée).');
      if (cfg.of === 'LU' && R.lu && !fclose(F, MX.toNumbers(R.lu.U))) return t('Ce n\'est pas la forme échelonnée obtenue sans échange.');
      return null;
    }
    case 'PLU:P': {
      if (sq(am)) return sq(am);
      const perm = F.every((r) => r.filter((x) => Math.abs(x - 1) < 1e-9).length === 1 && r.every((x) => Math.abs(x) < 1e-9 || Math.abs(x - 1) < 1e-9)) && orthCols(F);
      return perm ? null : t('P doit être une matrice de permutation.');
    }
    case 'QR:Q': {
      if (m !== am || n !== an) return sizeMsg('Q', am, an);
      if (!orthCols(F)) return t('Les colonnes de Q doivent être orthonormées : orthogonales et de norme 1.');
      if (R.Q && !fclose(F, R.Q)) return t('Ce n\'est pas le Q de Gram-Schmidt sur les colonnes de A, dans l\'ordre.');
      return null;
    }
    case 'QR:R': {
      if (sq(an)) return sq(an);
      if (!isUpperF(F)) return t('R doit être triangulaire supérieure.');
      if (F.some((r, i) => r[i] <= 1e-12)) return t('La diagonale de R doit être strictement positive.');
      if (R.R && !fclose(F, R.R)) return t('Ce n\'est pas R = QᵀA.');
      return null;
    }
    case 'cholesky:L': {
      if (sq(am)) return sq(am);
      if (!isLowerF(F) || F.some((r, i) => r[i] <= 1e-12)) return t('L doit être triangulaire inférieure, à diagonale strictement positive.');
      return fclose(fmul(F, ftr(F)), R.Af) ? null : t('LLᵀ ne redonne pas A.');
    }
    case 'PDP:D': case 'orthodiag:D': {
      if (sq(am)) return sq(am);
      if (!isDiagF(F)) return t('D doit être diagonale.');
      if (R.charpoly) {
        // The diagonal is the list of eigenvalues, with multiplicities.
        const d = F.map((r, i) => r[i]);
        const val = (l) => R.charpoly.reduceRight((s, c) => s * l + c.valueOf(), 0);
        if (d.some((l) => Math.abs(val(l)) > 1e-6)) return t('La diagonale de D doit contenir les valeurs propres de A.');
        const prod = (l) => d.reduce((s, x) => s * (x - l), 1);
        for (const l of [0.31, 1.7, -2.3, 3.9]) if (Math.abs(prod(l) - val(l)) > 1e-6 * (1 + Math.abs(val(l)))) return t('Chaque valeur propre doit apparaître dans D autant de fois que sa multiplicité.');
      }
      return null;
    }
    case 'PDP:P': case 'orthodiag:Q': {
      if (sq(am)) return sq(am);
      if (Math.abs(fdet(F)) < 1e-9) return t('{name} doit être inversible : ses colonnes doivent être libres.', { name });
      if (cfg.of === 'orthodiag' && !orthCols(F)) return t('Q doit être orthogonale : colonnes orthonormées.');
      // Each column is an eigenvector.
      const AP = fmul(R.Af, F);
      for (let j = 0; j < n; j++) {
        const c = F.map((r) => r[j]);
        const ac = AP.map((r) => r[j]);
        const i = c.findIndex((x) => Math.abs(x) > 1e-9);
        const lam = ac[i] / c[i];
        if (c.some((x, k) => Math.abs(ac[k] - lam * x) > 1e-8 * (1 + Math.abs(ac[k])))) return t('La colonne {j} de {name} n\'est pas un vecteur propre de A.', { j: j + 1, name });
      }
      const D = all.D;
      if (D) {
        const Df = toF(D);
        if (!fclose(AP, fmul(F, Df))) return t('La colonne k de {name} doit être un vecteur propre de la valeur propre en position k de D : vérifie l\'ordre.', { name });
      }
      return null;
    }
    case 'SVD:Σ': {
      if (m !== am || n !== an) return sizeMsg('Σ', am, an);
      if (!isDiagF(F)) return t('Σ n\'a de cases non nulles que sur sa diagonale.');
      const d = Array.from({ length: Math.min(m, n) }, (_, i) => F[i][i]);
      if (d.some((x) => x < -1e-12)) return t('Les valeurs singulières sont positives.');
      if (d.some((x, i) => i && x > d[i - 1] + 1e-12)) return t('Range les valeurs singulières dans l\'ordre décroissant.');
      if (d.some((x, i) => Math.abs(x - R.sigmas[i]) > 1e-8 * (1 + x))) return t('Les valeurs singulières sont les racines des valeurs propres de AᵀA.');
      return null;
    }
    case 'SVD:V': case 'SVD:U': {
      const k = name === 'V' ? an : am;
      if (sq(k)) return sq(k);
      if (!orthCols(F)) return t('{name} doit être orthogonale : colonnes orthonormées.', { name });
      const B = name === 'V' ? R.AtA : R.AAt;
      const BF = fmul(B, F);
      for (let j = 0; j < k; j++) {
        const s2 = (R.sigmas[j] ?? 0) ** 2;
        if (F.some((r, i) => Math.abs(BF[i][j] - s2 * r[j]) > 1e-7 * (1 + Math.abs(BF[i][j])))) {
          return t('La colonne {j} de {name} doit être un vecteur propre de {M} pour {s}.', { j: j + 1, name, M: name === 'V' ? 'AᵀA' : 'AAᵀ', s: `σ${'₀₁₂₃₄₅₆₇₈₉'[j + 1] ?? ''}²` });
        }
      }
      // With V, uᵢ = Avᵢ/σᵢ for σᵢ ≠ 0.
      if (name === 'U' && all.V) {
        const AV = fmul(R.Af, toF(all.V));
        for (let j = 0; j < Math.min(am, an); j++) {
          const s = R.sigmas[j];
          if (s < 1e-9) continue;
          if (F.some((r, i) => Math.abs(r[j] - AV[i][j] / s) > 1e-8)) return t('{u} doit valoir {v}.', { u: `u${'₀₁₂₃₄₅₆₇₈₉'[j + 1]}`, v: `Av${'₀₁₂₃₄₅₆₇₈₉'[j + 1]}/σ${'₀₁₂₃₄₅₆₇₈₉'[j + 1]}` });
        }
      }
      return null;
    }
    default: return null;
  }
}

function fdet(F) {
  const n = F.length;
  const A = F.map((r) => [...r]);
  let d = 1;
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let i = c + 1; i < n; i++) if (Math.abs(A[i][c]) > Math.abs(A[p][c])) p = i;
    if (Math.abs(A[p][c]) < 1e-12) return 0;
    if (p !== c) { [A[c], A[p]] = [A[p], A[c]]; d = -d; }
    d *= A[c][c];
    for (let i = c + 1; i < n; i++) { const f = A[i][c] / A[c][c]; for (let j = c; j < n; j++) A[i][j] -= f * A[c][j]; }
  }
  return d;
}

// The product of all the factors, compared with A.
function productOk(cfg, f, R) {
  const F = (k) => toF(f[k]);
  switch (cfg.of) {
    case 'LU': return fclose(fmul(F('L'), F('U')), R.Af);
    case 'PLU': return fclose(fmul(F('P'), R.Af), fmul(F('L'), F('U')));
    case 'QR': return fclose(fmul(F('Q'), F('R')), R.Af);
    case 'cholesky': return fclose(fmul(F('L'), ftr(F('L'))), R.Af);
    case 'PDP': return fclose(fmul(R.Af, F('P')), fmul(F('P'), F('D')));
    case 'orthodiag': return fclose(fmul(fmul(F('Q'), F('D')), ftr(F('Q'))), R.Af);
    case 'SVD': return fclose(fmul(fmul(F('U'), F('Σ')), ftr(F('V'))), R.Af);
    default: return false;
  }
}

const namesOf = (cfg) => FACTORS[cfg.of] || [];

export function isFinal(cfg, node) { return false; }
export const start = (cfg) => cfg.start;

export function judgeLine(cfg, prev, input, state = {}) {
  const read = readMat(cfg, input);
  if (read.error) return read.error;
  const node = read.node;
  const R = ref(cfg);
  const want = namesOf(cfg);
  const given = node.assigns.length ? node.assigns : [];
  if (!given.length) return { kind: 'form', node, message: t('Nomme les facteurs : {f}.', { f: want.map((x) => `${x} = [[…]]`).join(' ; ') }) };
  const f = { ...(state.factors || {}) };
  for (const a of given) {
    const name = ALIAS[cfg.of]?.[a.name] ?? a.name;
    if (!want.includes(name)) return { kind: 'form', node, message: t('Les facteurs sont {f}.', { f: want.join(', ') }) };
    f[name] = a.value;
  }
  for (const a of given) {
    const name = ALIAS[cfg.of]?.[a.name] ?? a.name;
    const why = checkFactor(cfg, name, f[name], R, f);
    if (why) {
      const diag = diagnoseLine('factor', prev, node, { ...cfg, _name: name }, (c, n) => {
        const cv = c.assigns?.find((x) => (ALIAS[cfg.of]?.[x.name] ?? x.name) === name)?.value ?? c.value;
        const nv = n.assigns.find((x) => (ALIAS[cfg.of]?.[x.name] ?? x.name) === name)?.value;
        return !!cv && !!nv && cv.k === 'm' && nv.k === 'm' && sameValue(cv, nv, mopts(cfg)) || (cv?.k === 'm' && nv?.k === 'm' && fclose(toF(cv), toF(nv)));
      });
      return wrongV(node, why, diag);
    }
  }
  state.factors = f;
  if (want.every((k) => f[k])) {
    if (!productOk(cfg, f, R)) return wrongV(node, t('Le produit des facteurs ne redonne pas A.'));
    return { kind: 'done', node };
  }
  return { kind: 'ok', node };
}

export { ref as factorRef };
