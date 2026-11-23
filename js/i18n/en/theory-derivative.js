'use strict';
/* English · theory cards T1–T8 and the full theory page for “Derivative without limits”
   (Georgian source: THEORY_CARDS and derivTheoryHTML in js/data/theory.ka.js) */
Object.assign(EN.cards, {
  T1: { title: 'Line and parabola', html: `<h4>Theoretical conclusion 1 · Line and parabola</h4>
<p>The x-coordinates of the common points of the line <span class="m">y = kx + b</span> and the parabola <span class="m">y = x²</span> are the real roots of the equation <span class="m">x² − kx − b = 0</span>, <span class="m">D = k² + 4b</span>.</p>
<p><b>D &gt; 0</b> — two common points (the line crosses the parabola); <b>D &lt; 0</b> — no common point; <b>D = 0</b> — one <b>double</b> root: <span class="m">x² − kx − b = (x − x₀)²</span>. In this case we say that the line <b>touches</b> the parabola.</p>` },
  T2: { title: 'Tangent to a parabola', html: `<h4>Theoretical conclusion 2 · Tangent to a parabola</h4>
<p><b>Definition.</b> A non-vertical line <span class="m">y = a² + k(x − a)</span> through the point A(a, a²) is called the tangent to the parabola <span class="m">y = x²</span> at A if <span class="m">x = a</span> is a double root of the equation <span class="m">x² = a² + k(x − a)</span>.</p>
<p>Since <span class="m">x² − a² − k(x − a) = (x − a)(x + a − k)</span>, the condition holds if and only if <span class="m">k = 2a</span>. The equation of the tangent is <span class="m">y = 2ax − a²</span>.</p>` },
  T3: { title: 'Uniqueness of the tangent', html: `<h4>Theoretical conclusion 3 · Uniqueness</h4>
<p>Every a corresponds to exactly one <span class="m">k = 2a</span>: for any other k the second root <span class="m">x = k − a</span> differs from a, and the line crosses the parabola at two points.</p>
<p>The vertical line <span class="m">x = a</span> has one common point with the parabola, but it crosses the parabola. So “one common point” does not yet mean tangency — we look for the tangent among non-vertical lines.</p>` },
  T4: { title: 'General definition of a tangent', html: `<h4>Theoretical conclusion 4 · General definition of a tangent</h4>
<p><b>Definition (double-root criterion).</b> The line <span class="m">y = P(a) + k(x − a)</span> through the point A(a, P(a)) of the graph of a polynomial P is called the tangent at A if <span class="m">x = a</span> is at least a double root of <span class="m">P(x) − [P(a) + k(x − a)]</span>:</p>
<p class="eqc"><span class="m">P(x) − P(a) − k(x − a) = (x − a)²·Q(x)</span>.</p>
<p>The number of common points is not a sign of tangency: the tangent to x³ at a = 2 also crosses the graph at x = −4.</p>` },
  T5: { title: 'Existence and uniqueness theorem', html: `<h4>Theoretical conclusion 5 · Existence and uniqueness theorem</h4>
<p><b>Theorem.</b> For every polynomial P and every real a there exists one and only one k for which <span class="m">(x − a)²</span> divides <span class="m">P(x) − P(a) − k(x − a)</span>. This number is <span class="m">k = R<sub>a</sub>(a)</span>, where <span class="m">P(x) − P(a) = (x − a)·R<sub>a</sub>(x)</span>.</p>
<p>Examples: <span class="m">x²</span> → <span class="m">R<sub>a</sub>(x) = x + a</span>, k = 2a; <span class="m">x³</span> → <span class="m">R<sub>a</sub>(x) = x² + ax + a²</span>, k = 3a².</p>` },
  T6: { title: 'The derivative function', html: `<h4>Theoretical conclusion 6 · The derivative function</h4>
<p><b>Definition.</b> The function <span class="m">P′: a ↦ k(a) = R<sub>a</sub>(a)</span>, which assigns to every a the slope of the tangent, is called the <b>derivative function</b> of the polynomial P.</p>
<p><span class="m">(x²)′ = 2x</span>, <span class="m">(x³)′ = 3x²</span>. The concept is built with algebra and geometry — without using limits.</p>` },
  T7: { title: 'Power rule and linearity', html: `<h4>Theoretical conclusion 7 · Power rule and linearity</h4>
<p><span class="m">xⁿ − aⁿ = (x − a)(xⁿ⁻¹ + axⁿ⁻² + … + aⁿ⁻¹)</span>. The bracket has n terms, and at x = a each of them equals aⁿ⁻¹, so <span class="m">(xⁿ)′ = n·xⁿ⁻¹</span>.</p>
<p>If <span class="m">P = αF + βG</span>, then the <span class="m">R<sub>a</sub></span> add in the same way, so <span class="m">P′ = αF′ + βG′</span>. The derivative of a constant is 0; that of the linear function <span class="m">mx + c</span> is m.</p>` },
  T8: { title: 'Connection with the limit', html: `<h4>Theoretical conclusion 8 · Next step: connection with the limit</h4>
<p>For x ≠ a, <span class="m">R<sub>a</sub>(x) = (P(x) − P(a))/(x − a)</span> — this is the slope of the secant (the line through A and another point of the graph). We obtained the derivative as the value of this polynomial at x = a.</p>
<p>When you later meet the concept of a limit, you will see that the classical definition <span class="m">P′(a) = lim<sub>x→a</sub> (P(x) − P(a))/(x − a)</span> gives exactly the same number for polynomials.</p>` }
});

/** Scenario map rows shared by the English theory pages. */
function enScenarioMap(bank, withCards) {
  const stageName = id => T((STAGES.find(s => s.id === id) || {}).short || id);
  const compName = c => T({ pre: 'წინარე ცოდნა', decl: 'დეკლარაციული', proc: 'პროცედურული', pers: 'პირისეული / მეტაკოგნიტური' }[c] || c);
  return bank.map(q => {
    const label = q.skill ? TX(q.skill) : plain(TX(q.text)).slice(0, 120) + (plain(TX(q.text)).length > 120 ? '…' : '');
    return `<tr><td>${stageName(q.stage)}</td><td>${q.id}</td><td>${compName(q.comp)}</td><td>${supfmt(esc(label))}</td>${withCards ? `<td>${q.after ? q.after + ' · ' + esc(TX(THEORY_CARDS[q.after].title)) : ''}</td>` : ''}</tr>`;
  }).join('');
}

EN.theory.derivative = function () {
  const bank = OFFLINE_BANKS.derivative || [];
  const cnt = st => bank.filter(q => q.stage === st).length;
  return `
<h2>Theoretical foundations (for the lecturer) · Derivative without limits</h2>
<p class="hint">The algebraic–geometric model and its Socratic teaching in “Kapanadze AI–Socrates”. Methodological model: Davit Kapanadze.</p>
<p class="hint"><b>Note:</b> this page contains all the answers of the scenario. For students it is intended after the dialogue has been completed.</p>
<ol class="toc">
<li><a href="#th1">The initial problem</a></li><li><a href="#th2">Prerequisite facts</a></li><li><a href="#th3">Line and parabola</a></li><li><a href="#th4">Tangent to a parabola</a></li><li><a href="#th5">Tangent to a polynomial</a></li><li><a href="#th6">Existence and uniqueness</a></li><li><a href="#th7">The derivative function</a></li><li><a href="#th8">Rules of computation</a></li><li><a href="#th9">Connection with the limit</a></li><li><a href="#th10">Socratic dialogue</a></li><li><a href="#th11">The ladder of help</a></li><li><a href="#th12">Three components of knowledge</a></li><li><a href="#th13">Assessment model</a></li><li><a href="#th14">The role of AI</a></li><li><a href="#th15">Scenario map</a></li><li><a href="#threfs">References</a></li>
</ol>

<h3 class="part">I. Mathematical foundations</h3>

<h3 id="th1">1. The initial problem</h3>
<p>At school a tangent is often described as a line that has “one common point” with a curve. This is correct for a circle and a parabola, but not in general: the tangent to the graph of <span class="m">y = x³</span> at the point (2, 8) crosses the graph once more, at the point (−4, −64). Classical analysis resolves this difficulty with the concept of a limit: the tangent is the limiting position of secants. The model described here uses a different, algebraic criterion for polynomials — the <b>double root</b>. This criterion grows out of knowledge the student already has: the quadratic equation, the discriminant, factorisation and Bézout’s theorem.</p>

<h3 id="th2">2. Prerequisite facts</h3>
<div class="def"><span class="lbl">Bézout’s theorem.</span> If P is a polynomial and P(c) = 0, then <span class="m">P(x) = (x − c)·R(x)</span>, where R is a polynomial. Hence, for every a, <span class="m">P(x) − P(a)</span> is divisible by <span class="m">(x − a)</span> without remainder.</div>
<div class="def"><span class="lbl">Multiplicity of a root.</span> c is a root of P of multiplicity m if <span class="m">(x − c)<sup>m</sup></span> divides P(x) but <span class="m">(x − c)<sup>m+1</sup></span> does not. “At least double” means that <span class="m">(x − c)²</span> divides P(x).</div>
<div class="def"><span class="lbl">Quadratic trinomial.</span> <span class="m">ax² + bx + c</span> (a ≠ 0) has a double root if and only if <span class="m">D = b² − 4ac = 0</span>; then <span class="m">ax² + bx + c = a(x − x₀)²</span>.</div>

<h3 id="th3">3. Line and parabola</h3>
<p>The x-coordinates of the common points of the line <span class="m">y = kx + b</span> and the parabola <span class="m">y = x²</span> are the real roots of the equation <span class="m">x² − kx − b = 0</span>, <span class="m">D = k² + 4b</span>. D &gt; 0 — two common points; D = 0 — one (a double root, tangency); D &lt; 0 — no common point. A vertical line <span class="m">x = c</span> always crosses the parabola at one point, but it is not a tangent.</p>

<h3 id="th4">4. Tangent to a parabola</h3>
<div class="def"><span class="lbl">Definition 1.</span> A non-vertical line <span class="m">y = a² + k(x − a)</span> through the point A(a, a²) is called the tangent to the parabola <span class="m">y = x²</span> at A if <span class="m">x = a</span> is a double root of the equation <span class="m">x² = a² + k(x − a)</span>.</div>
<div class="prf"><span class="m">x² − a² − k(x − a) = (x − a)(x + a − k)</span>. The roots are <span class="m">x = a</span> and <span class="m">x = k − a</span>. x = a is a double root ⇔ k − a = a ⇔ <span class="m">k = 2a</span>. Thus at every point of the parabola there is a unique tangent <span class="m">y = 2ax − a²</span>; for any other k the line crosses the parabola at two points.</div>

<h3 id="th5">5. Tangent to the graph of a polynomial</h3>
<div class="def"><span class="lbl">Definition 2 (double-root criterion).</span> Let P be a polynomial and a a real number. The line <span class="m">y = P(a) + k(x − a)</span> is the tangent to the graph of P at the point A(a, P(a)) if, for some polynomial <span class="m">Q<sub>a</sub></span>,
<span class="m eq">P(x) − [P(a) + k(x − a)] = (x − a)²·Q<sub>a</sub>(x).</span></div>
<p>For the parabola, Definition 2 coincides with Definition 1. In general, however, a tangent may cross the graph at another point as well: <span class="m">x³ − 12x + 16 = (x − 2)²(x + 4)</span>, so <span class="m">y = 12x − 16</span> is the tangent to x³ at a = 2 and at the same time passes through (−4, −64). That is why the criterion “one common point” has to be replaced by the criterion “double root”.</p>

<h3 id="th6">6. Existence and uniqueness theorem</h3>
<div class="thm"><span class="lbl">Theorem 1.</span> For every polynomial P and every real a there exists one and only one k for which the line <span class="m">y = P(a) + k(x − a)</span> is the tangent to the graph of P at A. Namely, <span class="m">k = R<sub>a</sub>(a)</span>, where <span class="m">P(x) − P(a) = (x − a)·R<sub>a</sub>(x)</span>.</div>
<div class="prf"><span class="lbl">Proof.</span> By Bézout’s theorem <span class="m">P(x) − P(a) = (x − a)R<sub>a</sub>(x)</span>. Then <span class="m">P(x) − P(a) − k(x − a) = (x − a)(R<sub>a</sub>(x) − k)</span>. <span class="m">(x − a)²</span> divides this expression if and only if <span class="m">(x − a)</span> divides <span class="m">R<sub>a</sub>(x) − k</span>, i.e. (again by Bézout’s theorem) if and only if <span class="m">R<sub>a</sub>(a) − k = 0</span>. This equality determines k uniquely: <span class="m">k = R<sub>a</sub>(a)</span>. ∎</div>

<h3 id="th7">7. The derivative function</h3>
<div class="def"><span class="lbl">Definition 3.</span> By Theorem 1, every a corresponds to a unique number k(a). The function <span class="m">P′: a ↦ k(a) = R<sub>a</sub>(a)</span> is called the <b>derivative function</b> of the polynomial P.</div>
<p>Didactically this step is decisive: the student sees that a family of numbers — the slopes — itself forms a new function. The requirement in the definition of a function (uniqueness) is guaranteed by the uniqueness in Theorem 1.</p>
<table><tr><th>P(x)</th><th>R<sub>a</sub>(x)</th><th>P′(a) = R<sub>a</sub>(a)</th></tr>
<tr><td>c (constant)</td><td>0</td><td>0</td></tr>
<tr><td>mx + c</td><td>m</td><td>m</td></tr>
<tr><td>x²</td><td>x + a</td><td>2a</td></tr>
<tr><td>x³</td><td>x² + ax + a²</td><td>3a²</td></tr>
<tr><td>x⁴</td><td>x³ + ax² + a²x + a³</td><td>4a³</td></tr>
<tr><td>xⁿ</td><td>xⁿ⁻¹ + axⁿ⁻² + … + aⁿ⁻¹</td><td>n·aⁿ⁻¹</td></tr></table>

<h3 id="th8">8. Rules of computation without limits</h3>
<div class="thm"><span class="lbl">Theorem 2 (linearity).</span> <span class="m">(αF + βG)′ = αF′ + βG′</span>.</div>
<div class="prf">If <span class="m">F(x) − F(a) = (x − a)R<sup>F</sup><sub>a</sub>(x)</span> and <span class="m">G(x) − G(a) = (x − a)R<sup>G</sup><sub>a</sub>(x)</span>, then <span class="m">(αF + βG)(x) − (αF + βG)(a) = (x − a)(αR<sup>F</sup><sub>a</sub> + βR<sup>G</sup><sub>a</sub>)(x)</span>. At x = a we obtain <span class="m">αF′(a) + βG′(a)</span>. ∎</div>
<div class="thm"><span class="lbl">Theorem 3 (product).</span> <span class="m">(FG)′ = F′G + FG′</span>.</div>
<div class="prf"><span class="m">F(x)G(x) − F(a)G(a) = [F(x) − F(a)]G(x) + F(a)[G(x) − G(a)] = (x − a)[R<sup>F</sup><sub>a</sub>(x)G(x) + F(a)R<sup>G</sup><sub>a</sub>(x)]</span>. At x = a: <span class="m">F′(a)G(a) + F(a)G′(a)</span>. ∎</div>
<div class="thm"><span class="lbl">Theorem 4 (power).</span> <span class="m">(xⁿ)′ = n·xⁿ⁻¹</span>, n ≥ 1.</div>
<div class="prf"><span class="m">xⁿ − aⁿ = (x − a)(xⁿ⁻¹ + axⁿ⁻² + … + aⁿ⁻¹)</span>. The bracket has n terms, and at x = a each of them equals aⁿ⁻¹, so <span class="m">R<sub>a</sub>(a) = n·aⁿ⁻¹</span>. ∎</div>
<div class="ex"><span class="lbl">Example.</span> <span class="m">f(x) = x² + 3x</span>: <span class="m">f′(a) = 2a + 3</span>; at a = 1, k = 5, and the tangent is <span class="m">y = 4 + 5(x − 1) = 5x − 1</span>. Check: <span class="m">x² + 3x − (5x − 1) = (x − 1)²</span> — a double root.</div>

<h3 id="th9">9. Geometric meaning and connection with the limit</h3>
<p>For x ≠ a, <span class="m">R<sub>a</sub>(x) = (P(x) − P(a))/(x − a)</span> is the slope of the secant — the line through the points A(a, P(a)) and B(x, P(x)). Thus, for a polynomial, the slope of the secant is itself a polynomial in x, and the slope of the tangent is its value at x = a: <span class="m">P′(a) = R<sub>a</sub>(a)</span>. Since a polynomial is continuous, the classical definition <span class="m">P′(a) = lim<sub>x→a</sub> (P(x) − P(a))/(x − a)</span> gives the same number.</p>
<p>The approach does not reject the limit. It is an alternative starting path for building the concept, which the concept of a limit naturally continues — when the function is no longer a polynomial and “the value at x = a” has to be replaced by a limit. The extension to elementary functions is discussed in arXiv:2605.20228; interactive demonstration: <a href="https://kapanadze-theory.streamlit.app/" target="_blank" rel="noopener">kapanadze-theory.streamlit.app</a>.</p>

<h3 class="part">II. Didactic foundations</h3>

<h3 id="th10">10. Socratic dialogue and the construction of knowledge</h3>
<p>The program is based on the constructivist principle: a new concept must be built from the student’s existing knowledge rather than handed over ready-made. The AI plays the role of Socrates: it asks one short question about the nearest step, never says “wrong” and never supplies a ready result. When the student makes a mistake, it asks them to check their own reasoning — by substitution, a concrete case, a counterexample or a graph.</p>
<p>The scenario follows the phases of G. Brousseau’s theory of didactical situations:</p>
<ul>
<li><b>Action</b> — experimenting with the sliders, concrete computation (I-P1–I-P3, II-P1);</li>
<li><b>Formulation</b> — stating the pattern in one’s own words (I-R, III-D2);</li>
<li><b>Validation</b> — algebraic justification and the counterexample of x³ (II-R, III-P2, III-R1, III-D1);</li>
<li><b>Institutionalisation</b> — the “theoretical conclusion” cards T1–T8. They appear after a discovery and are collected in “My notes”: in this way the student’s discovery becomes shared, formal knowledge.</li></ul>

<h3 id="th11">11. The ladder of help and the zone of proximal development</h3>
<p>L. Vygotsky’s zone of proximal development is the distance between what a student can do independently and what they can do with help. The program measures this zone with a ladder of help (scaffolding — Wood, Bruner, Ross):</p>
<ol>
<li><b>Control question</b> — the student checks their own answer. For a typical mistake, the lecturer has prepared a special question in advance (e.g. “We obtained k = 2a = 4 for x². Here the function is x³…”).</li>
<li><b>Level 1</b> — a directed question that focuses attention on the property needed.</li>
<li><b>Level 2</b> — a partial structure (an expression to complete, a table) without the result.</li>
<li><b>Level 3</b> — an analogous step or a smaller case.</li></ol>
<p>If even the third level is not enough, the student sees the correct answer with a short explanation and <b>must explain in their own words</b> which step they missed (the self-explanation effect — Chi et al.). In this way even showing the answer becomes part of building knowledge.</p>

<h3 id="th12">12. Three components of knowledge</h3>
<table><tr><th>Component</th><th>Question</th><th>How it shows in the program</th></tr>
<tr><td>Declarative</td><td>“What do I know?”</td><td>Explaining concepts (common point, double root, tangent, derivative function) in one’s own words; understanding the meaning of the definitions.</td></tr>
<tr><td>Procedural</td><td>“How do I do it?”</td><td>Setting up an equation, factorising, finding k, computing k(a) for a new function.</td></tr>
<tr><td>Personal / metacognitive</td><td>“How do I think and check?”</td><td>Justification, understanding a counterexample, choosing a criterion, reflecting on one’s own path; the <b>confidence scale</b> on every question and its comparison with the result (calibration); self-explanation.</td></tr></table>
<p>The distinction between declarative and procedural knowledge rests on J. Anderson’s theory of cognitive skill, the concept of personal knowledge on M. Polanyi, and metacognitive monitoring on the work of J. Flavell. Personal knowledge means the student’s own, internally accepted conviction and the ability to judge for themselves how well they know something. That is why the program measures not only correctness but also whether the student’s confidence matches their actual result.</p>

<h3 id="th13">13. Assessment model</h3>
<ul>
<li><b>Points:</b> 2 — correct independently; 1.5 — after a level-1 hint; 1 — with level-2/3 help, or a partially correct answer twice; 0 — not achieved.</li>
<li><b>Placement at a level:</b> a level counts as mastered if its score is ≥ 67%. The first level not mastered defines the zone of proximal development.</li>
<li><b>Calibration:</b> “I am sure” + a correct first answer, or “I am not sure” + a wrong one — a match; “sure” + wrong — overconfidence; “not sure” + correct — underconfidence.</li>
<li><b>Final independent check:</b> a new function (x² + 3x), without hints, in one attempt. It distinguishes knowledge built with help from knowledge transferred independently.</li>
<li><b>Typical mistakes</b> are recorded separately and shown in the report: “k = 2a for every function”, confusing the y-coordinate with the slope, “a tangent has only one common point”, confusing a root with the number of roots, and others.</li></ul>

<h3 id="th14">14. The role and limits of AI</h3>
<p>AI is not used to give ready answers. Its functions are: (a) judging the meaning of a free-form answer against a criterion formulated in advance by the lecturer; (b) composing a simpler question tailored to the student’s specific reasoning; (c) writing a report for the lecturer. Every AI question is automatically checked for revealing the result being sought (e.g. “k = 2a”, “3a²”); if it does, the lecturer’s prepared question is used instead. Without AI the program works in scripted mode: built-in questions, recognition of typical mistakes and a rule-based report.</p>

<h3 id="th15">15. Scenario map</h3>
<p class="hint">${bank.length} questions in total: prerequisite knowledge — ${cnt('P')}, Level I — ${cnt('I')}, Level II — ${cnt('II')}, Level III — ${cnt('III')}, final check — ${cnt('F')}.</p>
<div class="matrix"><table><tr><th>Stage</th><th>ID</th><th>Component</th><th>Skill / question</th><th>Theoretical conclusion</th></tr>${enScenarioMap(bank, true)}</table></div>

<h3 id="threfs">References</h3>
<ol class="refs">
<li>D. Kapanadze. A Limit-Free Algebraic-Geometric Construction of the Derivative with a Foundational Model in the Class of Polynomial Functions. arXiv:2604.20888.</li>
<li>D. Kapanadze. A Limit-Free Algebraic-Geometric Construction of Derivatives for Elementary Functions. arXiv:2605.20228.</li>
<li>G. Brousseau. Theory of Didactical Situations in Mathematics. Dordrecht: Kluwer, 1997.</li>
<li>L. S. Vygotsky. Mind in Society: The Development of Higher Psychological Processes. Harvard University Press, 1978.</li>
<li>D. Wood, J. S. Bruner, G. Ross. The role of tutoring in problem solving. Journal of Child Psychology and Psychiatry, 17 (1976), 89–100.</li>
<li>J. R. Anderson. Acquisition of cognitive skill. Psychological Review, 89 (1982), 369–406.</li>
<li>M. Polanyi. Personal Knowledge: Towards a Post-Critical Philosophy. University of Chicago Press, 1958.</li>
<li>J. H. Flavell. Metacognition and cognitive monitoring. American Psychologist, 34 (1979), 906–911.</li>
<li>M. T. H. Chi, N. de Leeuw, M.-H. Chiu, C. LaVancher. Eliciting self-explanations improves understanding. Cognitive Science, 18 (1994), 439–477.</li>
</ol>`;
};
