// Module P, probabilités et statistique (unit `proba`, step U7): both
// courses, MATH-234 (GM) and EE-209 (MT); the tags are informative.
// Catalogue: docs/universite/P-probabilites.md. Five parts, in the order of
// the catalogue: proba-a (descriptive statistics, events, discrete laws),
// proba-b (densities, normal law, transformations, joint laws), proba-c
// (covariance, limit theorems, estimators), proba-d (intervals, tests of
// a mean or a proportion), proba-e (χ² tests, interpretation, regression,
// Bayesian statistics). Each part has its .skills.js, .js and its traps
// (js/cas/rules/pa.js … pe.js).

import { SKILLS as A } from './proba-a.skills.js';
import { SKILLS as B } from './proba-b.skills.js';
import { SKILLS as C } from './proba-c.skills.js';
import { SKILLS as D } from './proba-d.skills.js';
import { SKILLS as E } from './proba-e.skills.js';

export const UNIT = { id: 'proba', title: 'Probabilités et statistique', color: '#c92a2a', ready: true };

export const SKILLS = [...A, ...B, ...C, ...D, ...E];
