// Traps of module N, part b (see js/cas/rules/n.js).
// DEFS: {id: {name, judges, transform?, wrongValues?, explain?, check, code?}}.
// Traps of this part: n_order_simple_ratio, n_order_roundoff_rows, n_newton_inverted, n_newton_sign, n_newton_always2, n_mult_ratio, n_newton_sys_sign, n_secant_update.
//
// A code trap lists in `code` the wrong text of a hole of a program
// ({ref, hole, text}): tests/n-engine.test.js checks that js/judges/code.js
// names it. Its `check` is a bait (the items of its skill offer it).

export const DEFS = {
  n_newton_inverted: {
    name: 'Newton : f′/f au lieu de f/f′',
    judges: ['code', 'value'],
    code: { skill: 'n-newton', text: 'df(x) / f(x)' },
    check: { bait: { skill: 'n-newton', level: 3 } },
  },
  n_newton_sign: {
    name: 'Newton : x + f/f′ au lieu de x − f/f′',
    judges: ['code', 'value'],
    code: { skill: 'n-newton', text: '-f(x) / df(x)' },
    check: { bait: { skill: 'n-newton', level: 3 } },
  },
};
