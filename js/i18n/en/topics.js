'use strict';
/* English · scenarios, built-in topics, typical-mistake labels, history cards and the theory-page frame
   (Georgian source: SCEN, OTHER_TOPICS, ERR, THEORY_CARDS.PY*, otherTheoryHTML) */

EN.topics.half = {
  topicName: 'Half-derivative',
  label: 'Half-derivative', tag: 'Algebraic–operator construction on monomials', grade: 'University, years 1–2',
  h1: 'Half-derivative — from a student’s question to the construction of an operator',
  lead: 'Starting from a student’s question — “does it make sense to differentiate half a time?” — the student builds the operator D^{1/2} themselves: the basic assumption, the recurrence c(β)·c(β − ½) = β, double factorials, the Wallis product and the normalisation of c₀ — without integrals or limits. The AI gives no ready answers; after each discovery a theoretical conclusion appears.',
  steps: [['Prerequisite knowledge', 'Power rule, composition of D, n!!'], ['Level I · Basic', 'H∘H = D and the basic assumption'], ['Level II · Intermediate', 'Recurrence; c(½), c(1), c(2)'], ['Level III · Advanced', 'n!!, Wallis, c₀ = 1/√π'], ['Final check', 'x³ and c(5/2) without help']],
  transfer: '<b>Independent transfer:</b> 2–3 new monomials (x⁴, x^{5/2}, 3x² + 1) with one scheme: ratios c(n)/c(n − 1) → c₀ = 1/√π → check by applying D^{1/2} twice.',
  ext: 'the general order D^{1/3} (H∘H∘H = D), the negative order D^{−1/2}, or investigating the role of c₀.'
};
EN.topics.derivative = {
  topicName: 'Derivative without limits',
  label: 'Derivative without limits', tag: 'Algebraic–geometric model', grade: '11',
  h1: 'Derivative without limits — discovery through Socratic dialogue',
  lead: 'The student builds the derivative themselves: from the double root of a quadratic equation to the tangent to a parabola, then to polynomials and the derivative function. The AI gives no ready answers: after a mistake it asks a control question or offers a simpler step. After each discovery a short theoretical conclusion appears and is kept in the student’s notes.',
  steps: [['Prerequisite knowledge', 'Function, double root, factorisation, Bézout'], ['Level I · Basic', 'Line and parabola: 2, 1 or 0 points'], ['Level II · Intermediate', 'Discovering the tangent: k = ?'], ['Level III · Advanced', 'Polynomials and the derivative function'], ['Final check', 'A new function, without help']],
  transfer: '<b>Independent transfer:</b> 2–3 new functions (e.g. x² − 5x, 2x³, x³ + x) with the same scheme: double root → k(a) → check at a specific a.',
  ext: 'the product rule, x⁵, or a line tangent at two points at once.'
};

const EN_OTHER_LABELS = {
  ap: ['Formula for the n-th term of an arithmetic progression', 'Arithmetic progression: n-th term', 'Progressions'],
  apsum: ['Formula for the sum of the first n terms of an arithmetic progression', 'Arithmetic progression: sum of the first n terms', 'Progressions'],
  gp: ['Formula for the n-th term of a geometric progression', 'Geometric progression: n-th term', 'Progressions'],
  gpsum: ['Formula for the sum of the first n terms of a geometric progression', 'Geometric progression: sum of the first n terms', 'Progressions'],
  grade5_eq: ['Equation in one unknown — grade 5', 'Equation in one unknown (grade 5)', 'Equations'],
  linear_eq: ['Linear equation', 'Linear equation', 'Equations'],
  quadratic_eq: ['Quadratic equation', 'Quadratic equation', 'Equations'],
  proportion: ['Proportion', 'Proportion', 'Ratio and function'],
  linear_fn: ['Linear function', 'Linear function', 'Ratio and function'],
  pyramids: ['The pyramids of Egypt (history)', 'The pyramids of Egypt', 'Non-mathematical topics']
};
for (const [k, [topicName, label, group]] of Object.entries(EN_OTHER_LABELS)) EN.other[k] = Object.assign(EN.other[k] || {}, { topicName, label, group });

Object.assign(EN.err, {
  ratio: 'Looking for a ratio instead of a difference',
  n_not_n1: '“Fence-post” mistake: n instead of n − 1',
  increasing: '“A progression always increases”',
  steps: 'Confusing the number of terms with the number of steps',
  proportional: '“Proportional” reasoning (aₙ ∝ n)',
  a1_missing: 'a₁ missing from the formula',
  arith: 'Computational mistake',
  diff: 'Looking for a difference instead of a ratio (“arithmetic” thinking)',
  mult_not_pow: 'Multiplication instead of raising to a power',
  root_missing: 'q³ and q confused (root not taken)',
  root_div: 'Dividing instead of taking a root',
  sign_lost: 'Negative ratio lost',
  linear_graph: 'Points of a geometric progression taken to lie on a straight line',
  pow_mult: 'Power confused with multiplication',
  pow_order: 'Order-of-operations mistake with a power',
  sign: 'Sign mistake',
  fn_def: 'Uniqueness in the definition of a function not understood',
  disc: 'Sign of the discriminant confused with the number of roots',
  root_count: 'A double root counted as two different points',
  root_vs_count: 'Value of a root confused with the number of roots (points)',
  k_b: 'Slope confused with the free term (b)',
  factor: 'Factorisation mistake',
  bezout_sign: 'Sign mistake in the binomial in Bézout’s theorem',
  value_slope: 'y-coordinate of the point (function value) confused with the slope',
  k_eq_a: 'Slope set equal to the x-coordinate of the point of contact (k = a)',
  overgen_2a: '“k = 2a” mechanically carried over to another function',
  one_point_tangent: '“A tangent has only one common point”',
  pattern: 'Wrong generalisation of a pattern (the power rule)',
  factor_value: 'Terms omitted when computing R(a)',
  linear_ignored: 'Contribution of the linear term omitted (linearity)',
  tangent_check: 'Tangent check by double root not carried out',
  pow_rule: 'Mistake in the power rule of differentiation',
  composition: 'Repeated application of an operator replaced by a single one',
  order_mult: 'Orders of operators multiplied instead of added',
  pow_div: 'Mistake in dividing powers with fractional exponents',
  pow_frac: 'Mistake in evaluating a fractional power',
  factorial: 'Double factorial confused with the ordinary factorial',
  order: 'Half-derivative lowers the exponent by 1 instead of ½',
  const_zero: '“The half-derivative of a constant is zero”',
  skip_step: 'Result written without the steps',
  exp_vs_coef: 'Exponent confused with the coefficient',
  notation: 'Ambiguous notation (1/2c₀)',
  recip: 'Reciprocal confused (c ↔ 1/c)',
  sector: 'Coefficients of the integer and half-integer sectors confused',
  form: 'Right idea, incomplete notation',
  norm_missing: 'Normalisation constant c₀ = 1/√π omitted or substituted incorrectly',
  c0_zero: 'Assuming c₀ = 0 (contradictory)',
  linear: 'Linearity violated (a term omitted)',
  inverse_op: 'Wrong inverse operation',
  bracket: 'Incomplete expansion of brackets (distributivity)',
  order_ops: 'Order of operations violated',
  coef_concat: '3x read as writing digits side by side (35), not as 3 · x',
  stopped_early: 'Solution stopped half-way or part of it lost',
  geo: 'Geographical localisation mistake',
  bc_calc: 'Mistake in computing an interval between BC / AD dates',
  per_year: 'Estimate stopped half-way (units confused)',
  function_temple: 'Purpose of the Egyptian pyramid confused (temple instead of tomb)',
  famous_wrong: 'Chronological confusion (Tutankhamun and the pyramids of Giza)',
  myth: 'A myth or film taken as a reliable source',
  overgeneral: 'Overgeneralisation without comparison'
});

Object.assign(EN.cards, {
  PY1: { title: 'How do we know?', html: `<h4>Conclusion 1 · How do we know about the past?</h4>
<p>The pyramids were the <b>tombs</b> of the pharaohs — because of the belief in life after death. We learn this from <b>sources</b>: the buildings themselves, sarcophagi, inscriptions, papyri, archaeological excavations.</p>
<p>A film, a novel or an internet post is not a source — it is someone’s imagination. The historian’s question is: <b>“How do we know?”</b></p>` },
  PY2: { title: 'The scale of construction', html: `<h4>Conclusion 2 · The development of the form and the scale of construction</h4>
<p>Mastaba → Djoser’s step pyramid (c. 2670 BC, architect Imhotep) → Sneferu’s experiments at Dahshur → the smooth pyramids of Giza (c. 2560 BC). The Great Pyramid was the tallest structure in the world for about 3800 years.</p>
<p>~2.3 million blocks in ~20 years ≈ 300 blocks a day. Such a pace required thousands of workers and precise organisation. <b>Rough estimation</b> is also a historian’s tool: it helps us check how plausible a claim is.</p>` },
  PY3: { title: 'One form — different purposes', html: `<h4>Conclusion 3 · Builders, technology and comparison</h4>
<p>Stones were moved on sledges over wetted sand, by boat on the Nile and canals, and up ramps — this is confirmed by paintings, papyri (the Diary of Merer) and remains. The workers’ settlement and tombs indicate that the builders were organised, well-fed and respected workers.</p>
<p>Mesoamerican pyramids are mostly temple platforms; Egyptian and Nubian ones are tombs. A similar form does not yet mean a similar purpose — we need <b>comparison before generalising</b>.</p>` }
});

/** English frame of the theory page for the other built-in topics (mirrors otherTheoryHTML). */
EN.theory.other = function (key) {
  const t = OTHER_TOPICS[key], e = EN.other[key] || {};
  const bank = offlineQuestions(t.topic) || [];
  const cnt = st => bank.filter(q => q.stage === st).length;
  const stageName = id => T((STAGES.find(s => s.id === id) || {}).short || id);
  const compName = c => T({ pre: 'წინარე ცოდნა', decl: 'დეკლარაციული', proc: 'პროცედურული', pers: 'პირისეული / მეტაკოგნიტური' }[c] || c);
  const map = bank.map(q => {
    const label = q.skill && q.stage === 'P' ? TX(q.skill) : plain(TX(q.text)).slice(0, 120) + (plain(TX(q.text)).length > 120 ? '…' : '');
    return `<tr><td>${stageName(q.stage)}</td><td>${q.id}</td><td>${compName(q.comp)}</td><td>${supfmt(esc(label))}</td></tr>`;
  }).join('');
  return `
<h2>Theoretical foundations (for the lecturer) · ${e.label || t.label}</h2>
<p class="hint">Topic group: ${e.group || t.group}. Methodological model: Davit Kapanadze. The methodology is unchanged — only the topic changes.</p>
<p class="hint"><b>Note:</b> this page contains the answers of the scenario; for students it is intended after the dialogue.</p>
<h3 class="part">${e.partTitle || 'I. Mathematical foundations'}</h3>
${e.math || t.math}
${e.lecturer ? `<h3 class="part">II. Lecturer’s commentary by question</h3>${e.lecturer}` : ''}
<h3 class="part">${e.lecturer ? 'III' : 'II'}. Didactic foundations</h3>
<p>The scenario follows the Socratic–constructivist model: first <b>prerequisite knowledge</b> is checked, then three components at Levels I (basic), II (intermediate) and III (advanced):</p>
<ul><li><b>Declarative</b> (“What do I know?”) — explaining a concept in one’s own words, an example and a counterexample;</li><li><b>Procedural</b> (“How do I do it?”) — applying a rule and carrying out the steps;</li><li><b>Personal / metacognitive</b> (“How do I think and check?”) — evaluating someone else’s solution, checking by substitution or a small case, reflection, the confidence scale.</li></ul>
<p><b>The ladder of help</b> (Wood, Bruner, Ross): control question → directed question → partial structure (a table) → an analogous step with an everyday example; finally — the correct answer with a short explanation and the student’s self-explanation. The AI gives no ready answers; after a mistake it asks the student to check their own answer. <b>Scoring:</b> 2 — independently; 1.5 — after the first hint; 1 — with level-2/3 help or partially; 0 — not achieved. A level is mastered at ≥ 67%; the first level not mastered defines the zone of proximal development (Vygotsky).</p>
<p>For the didactic foundations in detail, see the theory page of “Derivative without limits” (parts 10–14).</p>
<h3>Scenario map</h3>
<p class="hint">${bank.length} questions in total: prerequisite knowledge — ${cnt('P')}, Level I — ${cnt('I')}, Level II — ${cnt('II')}, Level III — ${cnt('III')}${cnt('F') ? ', final check — ' + cnt('F') : ''}.</p>
<div class="matrix"><table><tr><th>Stage</th><th>ID</th><th>Component</th><th>Skill / question</th></tr>${map}</table></div>
<h3>References</h3>
<ol class="refs">
<li>G. Brousseau. Theory of Didactical Situations in Mathematics. Kluwer, 1997.</li>
<li>L. S. Vygotsky. Mind in Society. Harvard University Press, 1978.</li>
<li>D. Wood, J. S. Bruner, G. Ross. The role of tutoring in problem solving. Journal of Child Psychology and Psychiatry, 17 (1976), 89–100.</li>
<li>J. R. Anderson. Acquisition of cognitive skill. Psychological Review, 89 (1982), 369–406.</li>
<li>J. H. Flavell. Metacognition and cognitive monitoring. American Psychologist, 34 (1979), 906–911.</li>
<li>M. T. H. Chi, N. de Leeuw, M.-H. Chiu, C. LaVancher. Eliciting self-explanations improves understanding. Cognitive Science, 18 (1994), 439–477.</li>
${e.refs || ''}</ol>`;
};

/* ---------- display helpers (used by the app; Georgian values stay the source of truth) ---------- */
function scenField(k, f) { const e = isEN() && EN.topics[k]; return e && e[f] != null ? e[f] : SCEN[k][f]; }
function otherField(k, f) { const e = isEN() && EN.other[k]; return e && e[f] != null ? e[f] : OTHER_TOPICS[k][f]; }
/** Display name of a (Georgian) topic string; free AI topics are shown as typed. */
function topicLabel(topic) {
  if (!isEN()) return topic;
  const k = offlineTopicKey(topic || '');
  if (k && EN.topics[k]) return EN.topics[k].topicName;
  if (k && EN.other[k]) return EN.other[k].topicName;
  return topic;
}
