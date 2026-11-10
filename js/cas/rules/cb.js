// Traps of module C, part b (step U10): what makes the catalogue's traps
// of this part work (the table itself is META in rules/vcf.js). DEFS: {id:
// {name, judges, transform, wrongValues, explain?, check}}; explain()
// falls back on the catalogue's text. Each trap carries a `check`
// replayed by tests/judges.test.js: {judge, prev, line} (a wrong line
// diagnosed as the trap), {counter, answers}, or {bait: {skill, level?, exam?}}.

export const DEFS = {};
