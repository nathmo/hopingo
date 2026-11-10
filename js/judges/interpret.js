// « Interpréter » (spec §16.3 final.interpret, convention 6 of
// docs/universite/P-probabilites.md, step U7): a multiple choice asked
// after the last line of a test or an interval. Its options are one right
// sentence and wrong ones made by the traps (p_pvalue_h0, p_ci_prob…).
// A wrong choice fails the item (the calculation lines keep their credit);
// a right one credits p-interpret, as a separate answer.
//
// item.final.interpret = {prompt, options: [{html, correct, rule?}]}

export const interpretOf = (item) => item?.final?.interpret ?? null;

// The choice of option i → {correct, rule}.
export function judgeInterpret(item, i) {
  const it = interpretOf(item);
  const o = it?.options?.[i];
  if (!o) return { correct: false, rule: null };
  return { correct: !!o.correct, rule: o.correct ? null : o.rule ?? null };
}

// The outcome of a lines run with the interpretation folded in.
export function withInterpretation(outcome, result) {
  if (!result) return outcome;
  const out = { ...outcome, subgoals: [...(outcome.subgoals || [])] };
  if (result.correct) {
    if (!out.subgoals.includes('p-interpret')) out.subgoals.push('p-interpret');
    return out;
  }
  out.correct = false;
  out.solo = false;
  if (result.rule) out.rules = [...(out.rules || []), result.rule];
  return out;
}
