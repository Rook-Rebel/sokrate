'use strict';
/* English · theory cards H1–H7 and the full theory page for “Half-derivative”
   (Georgian source: THEORY_CARDS and halfTheoryHTML in js/data/theory.ka.js) */
Object.assign(EN.cards, {
  H1: { title: 'The operator idea', html: `<h4>Theoretical conclusion 1 · The operator idea of the half-derivative</h4>
<p>The law of adding orders <span class="m">D<sup>m</sup>∘D<sup>n</sup> = D<sup>m+n</sup></span> suggests: ½ + ½ = 1, so we look for an operator <span class="m">H = D<sup>1/2</sup></span> with <span class="m">H∘H = D</span>.</p>
<p><b>Basic assumption (hypothesis).</b> H is linear and lowers the exponent of a monomial by ½: <span class="m">D<sup>1/2</sup>x<sup>β</sup> = c(β)·x<sup>β−1/2</sup></span>. Domain: the space of monomials <span class="m">1, x<sup>1/2</sup>, x, x<sup>3/2</sup>, …</span> (x &gt; 0), extended by <span class="m">x<sup>−1/2</sup></span>, because that is exactly what <span class="m">D<sup>1/2</sup>1</span> gives.</p>` },
  H2: { title: 'The basic recurrence', html: `<h4>Theoretical conclusion 2 · The basic recurrence</h4>
<p><span class="m">H(H x<sup>β</sup>) = c(β)c(β − ½)·x<sup>β−1</sup></span>, while <span class="m">D x<sup>β</sup> = β·x<sup>β−1</sup></span>. In the language of coefficients the condition <span class="m">H∘H = D</span> reads:</p>
<p class="eqc"><span class="m">c(β)·c(β − ½) = β</span>.</p>` },
  H3: { title: 'c₀ and the two sectors', html: `<h4>Theoretical conclusion 3 · The initial value and the two sectors</h4>
<p>The recurrence needs one initial value <span class="m">c(0) = c₀ ≠ 0</span>. From it: <span class="m">c(½) = 1/(2c₀)</span>, <span class="m">c(1) = 2c₀</span>, <span class="m">c(3/2) = 3/(4c₀)</span>, <span class="m">c(2) = 8c₀/3</span>, …</p>
<p>The coefficients for integer exponents are proportional to c₀, those for half-integer exponents to 1/c₀. In H∘H, c₀ <b>cancels</b>: D does not depend on it, whereas the intermediate function H f does.</p>` },
  H4: { title: 'Double factorials', html: `<h4>Theoretical conclusion 4 · Double factorials</h4>
<p><span class="m">c(n)/c(n − 1) = 2n/(2n − 1)</span>, so for integer n ≥ 0</p>
<p class="eqc"><span class="m">c(n) = c₀·(2n)!!/(2n − 1)!!</span>, &nbsp; <span class="m">c(n − ½) = (2n − 1)!!/(2c₀·(2n − 2)!!)</span> (n ≥ 1).</p>
<p>With ordinary factorials: <span class="m">c(n) = c₀·4<sup>n</sup>(n!)²/(2n)!</span>.</p>` },
  H5: { title: 'Wallis and normalisation', html: `<h4>Theoretical conclusion 5 · The Wallis product and normalisation</h4>
<p>The product of <span class="m">A<sub>n</sub> = (2n)!!/(2n − 1)!!</span> and <span class="m">B<sub>n</sub> = (2n)!!/(2n + 1)!!</span> is the Wallis product <span class="m">W<sub>n</sub> = ∏ 4k²/(4k² − 1) → π/2</span>. π thus appears structurally, but it does not fix c₀.</p>
<p><b>Convention:</b> <span class="m">c₀ = 1/√π</span> — we choose it so that the result agrees with the classical Riemann–Liouville formula (with lower limit 0). This is a choice made for compatibility, not a consequence of the recurrence. Then <span class="m">D<sup>1/2</sup>x<sup>n</sup> = (2n)!!/((2n − 1)!!·√π)·x<sup>n−1/2</sup></span>.</p>` },
  H6: { title: 'The boundary term', html: `<h4>Theoretical conclusion 6 · The boundary term</h4>
<p>For β = 0 the recurrence gives <span class="m">c(0)·c(−½) = 0</span>. Since c₀ ≠ 0, <span class="m">c(−½) = 0</span>, i.e. <span class="m">D<sup>1/2</sup>x<sup>−1/2</sup> = 0</span>. Hence <span class="m">D<sup>1/2</sup>(D<sup>1/2</sup>1) = 0 = D 1</span>. This is the only zero coefficient.</p>` },
  H7: { title: 'Polynomials and the classical theory', html: `<h4>Theoretical conclusion 7 · Polynomials and the connection with the classical theory</h4>
<p>By linearity <span class="m">D<sup>1/2</sup></span> acts on any polynomial, and <span class="m">D<sup>1/2</sup>(D<sup>1/2</sup>P) = P′</span>. For example <span class="m">D<sup>1/2</sup>(x² + x) = 8x<sup>3/2</sup>/(3√π) + 2x<sup>1/2</sup>/√π</span>.</p>
<p>With c₀ = 1/√π the coefficients agree with the Riemann–Liouville formula <span class="m">Γ(β + 1)/Γ(β + ½)</span>. We obtained the construction by algebra alone, without integrals or limits.</p>` }
});

EN.theory.half = function () {
  const bank = OFFLINE_BANKS.half || [];
  const cnt = st => bank.filter(q => q.stage === st).length;
  return `
<h2>Theoretical foundations (for the lecturer) · Half-derivative</h2>
<p class="hint">The algebraic–operator construction of the half-derivative on monomials and its Socratic teaching in “Kapanadze AI–Socrates”. Methodological model: Davit Kapanadze.</p>
<p class="hint"><b>Note:</b> this page contains all the answers of the scenario. For students it is intended after the dialogue has been completed.</p>
<ol class="toc">
<li><a href="#hh1">The initial question</a></li><li><a href="#hh2">Operator and orders</a></li><li><a href="#hh3">Monomial space and assumption</a></li><li><a href="#hh4">The basic recurrence</a></li><li><a href="#hh5">First values</a></li><li><a href="#hh6">Double factorials</a></li><li><a href="#hh7">Cancellation of c₀</a></li><li><a href="#hh8">The Wallis product</a></li><li><a href="#hh9">Normalisation</a></li><li><a href="#hh10">The boundary term</a></li><li><a href="#hh11">Examples and polynomials</a></li><li><a href="#hh12">Classical theory</a></li><li><a href="#hh13">Didactic foundations</a></li><li><a href="#hh14">Scenario map</a></li><li><a href="#hhrefs">References</a></li>
</ol>

<h3 class="part">I. Mathematical foundations</h3>

<h3 id="hh1">1. The initial question</h3>
<p>A second-year engineering student asked: if D² means differentiating twice, does it make sense to differentiate “half a time”? Mathematically the question can be stated as follows: is there an operator <span class="m">D<sup>1/2</sup></span> whose composition with itself gives the ordinary derivative, <span class="m">D<sup>1/2</sup>∘D<sup>1/2</sup> = D</span>? Below, such an operator is constructed algebraically on the space of monomials — without integrals or limits.</p>

<h3 id="hh2">2. Differentiation as an operator; adding orders</h3>
<p>D assigns to a function its derivative: <span class="m">D f = f′</span>. Repeated differentiation is a composition of operators: <span class="m">D<sup>m</sup>∘D<sup>n</sup> = D<sup>m+n</sup></span>. If we keep this law for fractional orders too, ½ + ½ = 1 requires <span class="m">D<sup>1/2</sup>∘D<sup>1/2</sup> = D</span>.</p>

<h3 id="hh3">3. The monomial space and the basic assumption</h3>
<div class="def"><span class="lbl">Space.</span> We consider x &gt; 0 and the space <span class="m">V<sub>+</sub></span> of finite linear combinations of the monomials <span class="m">1, x<sup>1/2</sup>, x, x<sup>3/2</sup>, …</span>. Since <span class="m">D<sup>1/2</sup>1</span> gives <span class="m">x<sup>−1/2</sup></span>, we extend the space: <span class="m">Ṽ = V<sub>+</sub> ⊕ span{x<sup>−1/2</sup>}</span>.</div>
<div class="def"><span class="lbl">Basic assumption.</span> <span class="m">D<sup>1/2</sup></span> is linear and lowers the exponent of a monomial by exactly ½:
<span class="m eq">D<sup>1/2</sup>x<sup>β</sup> = c(β)·x<sup>β−1/2</sup>.</span>
This is a hypothesis; it is justified by the fact that a consistent construction can be built on it.</div>

<h3 id="hh4">4. The basic recurrence</h3>
<div class="thm"><span class="lbl">Theorem 1.</span> <span class="m">(D<sup>1/2</sup>)² = D</span> holds on monomials if and only if <span class="m eq">c(β)·c(β − ½) = β.</span></div>
<div class="prf"><span class="lbl">Proof.</span> <span class="m">D<sup>1/2</sup>(D<sup>1/2</sup>x<sup>β</sup>) = c(β)·D<sup>1/2</sup>x<sup>β−1/2</sup> = c(β)c(β − ½)·x<sup>β−1</sup></span>, while <span class="m">D x<sup>β</sup> = β·x<sup>β−1</sup></span>. Equality for every β means equality of the coefficients. ∎</div>

<h3 id="hh5">5. First values</h3>
<p>The recurrence links neighbouring coefficients, so an initial value <span class="m">c(0) = c₀ ≠ 0</span> is needed, which for now is free.</p>
<table><tr><th>β</th><th>c(β)</th><th>β</th><th>c(β)</th></tr>
<tr><td>0</td><td>c₀</td><td>½</td><td>1/(2c₀)</td></tr>
<tr><td>1</td><td>2c₀</td><td>3/2</td><td>3/(4c₀)</td></tr>
<tr><td>2</td><td>8c₀/3</td><td>5/2</td><td>15/(16c₀)</td></tr>
<tr><td>3</td><td>16c₀/5</td><td>7/2</td><td>35/(32c₀)</td></tr></table>

<h3 id="hh6">6. Double factorials</h3>
<div class="thm"><span class="lbl">Theorem 2.</span> For integer n ≥ 0, <span class="m">c(n) = c₀·(2n)!!/(2n − 1)!!</span>, and for n ≥ 1, <span class="m">c(n − ½) = (2n − 1)!!/(2c₀·(2n − 2)!!)</span>. With ordinary factorials: <span class="m">c(n) = c₀·4<sup>n</sup>(n!)²/(2n)!</span>.</div>
<div class="prf"><span class="lbl">Proof.</span> Applying the recurrence twice, <span class="m">c(n) = n/c(n − ½) = n·c(n − 1)/(n − ½)</span>, i.e. <span class="m">c(n)/c(n − 1) = 2n/(2n − 1)</span>. The product of these ratios over k = 1, …, n gives the product of the even numbers <span class="m">(2n)!!</span> in the numerator and that of the odd numbers <span class="m">(2n − 1)!!</span> in the denominator. The formula for half-integer exponents follows from <span class="m">c(n − ½) = n/c(n)</span>. ∎</div>

<h3 id="hh7">7. Cancellation of c₀</h3>
<p>The coefficients for integer exponents (the “integer sector”) are proportional to c₀, those for half-integer exponents to 1/c₀. In H∘H one factor from each sector always meets the other, so c₀ cancels and <span class="m">D = (D<sup>1/2</sup>)²</span> does not depend on it. The intermediate function <span class="m">D<sup>1/2</sup>f</span>, however, does depend on c₀ — the program’s graph shows this vividly. Algebraically, changing c₀ is a similarity transformation (freedom of normalisation).</p>

<h3 id="hh8">8. A Wallis-type product</h3>
<p>The product of the two natural ratios <span class="m">A<sub>n</sub> = (2n)!!/(2n − 1)!!</span> and <span class="m">B<sub>n</sub> = (2n)!!/(2n + 1)!!</span> is
<span class="m eq">W<sub>n</sub> = A<sub>n</sub>B<sub>n</sub> = ∏<sub>k=1</sub><sup>n</sup> 4k²/(4k² − 1) → π/2.</span>
In this way π appears structurally in the construction, but the Wallis product by itself does <b>not</b> fix c₀.</p>

<h3 id="hh9">9. Normalisation: c₀ = 1/√π as a convention</h3>
<div class="def"><span class="lbl">Convention.</span> <span class="m">c₀ = 1/√π</span>. This value is chosen to agree with the left Riemann–Liouville formula for monomials (with lower limit 0). It is a choice made for compatibility, not a consequence of the recurrence.</div>
<p>Then <span class="m">D<sup>1/2</sup>x<sup>n</sup> = (2n)!!/((2n − 1)!!·√π)·x<sup>n−1/2</sup></span> and <span class="m">c(n − ½) = Γ(n + ½)/Γ(n)</span>. Here the gamma function is only a notation. In the scenario c₀ remains a convention; further explanation of the connection with Riemann–Liouville is offered only to interested students.</p>

<h3 id="hh10">10. The boundary term</h3>
<p>For β = 0, <span class="m">c(0)·c(−½) = 0</span>. Since c₀ ≠ 0, <span class="m">c(−½) = 0</span>, i.e. <span class="m">D<sup>1/2</sup>x<sup>−1/2</sup> = 0</span>, and <span class="m">D<sup>1/2</sup>(D<sup>1/2</sup>1) = 0 = D 1</span>. This is the only zero coefficient.</p>

<h3 id="hh11">11. Examples and polynomials</h3>
<table><tr><th>f</th><th>D<sup>1/2</sup>f</th><th>D<sup>1/2</sup>(D<sup>1/2</sup>f)</th></tr>
<tr><td>1</td><td>x<sup>−1/2</sup>/√π</td><td>0</td></tr>
<tr><td>x</td><td>2x<sup>1/2</sup>/√π</td><td>1</td></tr>
<tr><td>x²</td><td>8x<sup>3/2</sup>/(3√π)</td><td>2x</td></tr>
<tr><td>x<sup>1/2</sup></td><td>√π/2</td><td>x<sup>−1/2</sup>/2</td></tr>
<tr><td>x³</td><td>16x<sup>5/2</sup>/(5√π)</td><td>3x²</td></tr></table>
<p>By linearity <span class="m">D<sup>1/2</sup></span> acts on any polynomial, and the composition property <span class="m">D<sup>1/2</sup>(D<sup>1/2</sup>P) = P′</span> is preserved.</p>

<h3 id="hh12">12. Connection with the classical theory</h3>
<p>With c₀ = 1/√π, the Riemann–Liouville formula for monomials <span class="m">D<sup>1/2</sup>x<sup>β</sup> = Γ(β + 1)/Γ(β + ½)·x<sup>β−1/2</sup></span> agrees with the coefficients obtained above. The Caputo derivative of a constant is zero, whereas the Riemann–Liouville one is not; in this respect our construction follows Riemann–Liouville (<span class="m">D<sup>1/2</sup>1 = x<sup>−1/2</sup>/√π</span>). The advantage of the construction for teaching is that the new concept is built with tools the student already knows — the power rule, composition of operators, recurrences and factorials. The extension to a general order <span class="m">D<sup>α</sup></span> is discussed in arXiv:2608.19268.</p>

<h3 class="part" id="hh13">II. Didactic foundations</h3>
<p>The scenario follows the same Socratic–constructivist model as “Derivative without limits”. The methodology is unchanged; only the topic changes. The lecturer provides only the general idea of the topic (the introduction to I-D); after that the student builds the knowledge themselves, while their knowledge and skills are assessed at the same time.</p>
<ul>
<li><b>Action:</b> concrete computations — H x³, c(½), c(1), c(2);</li>
<li><b>Formulation:</b> the condition H∘H = D and the general recurrence (I-D, II-P2);</li>
<li><b>Validation:</b> checking by applying H twice, the boundary term, the cancellation of c₀ (II-R, III-P4, III-P5);</li>
<li><b>Institutionalisation:</b> the theoretical-conclusion cards H1–H7, which are collected in the student’s “notes”.</li></ul>
<p>The <b>ladder of help</b> (control question → level 1 → level 2 → level 3 → correct answer and self-explanation), the <b>three components of knowledge</b>, <b>confidence calibration</b> and the <b>final independent check</b> (x³ and c(5/2)) work in the same way as in the derivative scenario. For details see the theory page of “Derivative without limits”, parts 10–14.</p>
<p><b>Typical mistakes</b> recognised by the program: “the half-derivative of a constant is zero”, lowering the exponent by 1 instead of ½, multiplying the orders of operators instead of adding them, the ambiguous notation 1/2c₀, confusing the coefficients of the integer and half-integer sectors, omitting c₀ in the normalisation, violating linearity.</p>
<p class="hint">The method has not been widely tested; it has been tried informally on a small scale with students.</p>

<h3 id="hh14">Scenario map</h3>
<p class="hint">${bank.length} questions in total: prerequisite knowledge — ${cnt('P')}, Level I — ${cnt('I')}, Level II — ${cnt('II')}, Level III — ${cnt('III')}, final check — ${cnt('F')}.</p>
<div class="matrix"><table><tr><th>Stage</th><th>ID</th><th>Component</th><th>Skill / question</th><th>Theoretical conclusion</th></tr>${enScenarioMap(bank, true)}</table></div>

<h3 id="hhrefs">References</h3>
<ol class="refs">
<li>D. Kapanadze. An Algebraic-Operator Construction of the Half-Derivative on a Graded Monomial Space. Part I: Recurrence, Double Factorials, the Wallis Product, and Normalization. arXiv:2607.19482.</li>
<li>D. Kapanadze. From the Half-Order Recurrence to General Fractional-Order Differentiation on Monomials: Functional Continuation and Operator Composition. arXiv:2608.19268.</li>
<li>K. B. Oldham, J. Spanier. The Fractional Calculus. Academic Press, 1974.</li>
<li>S. G. Samko, A. A. Kilbas, O. I. Marichev. Fractional Integrals and Derivatives: Theory and Applications. Gordon and Breach, 1993.</li>
<li>I. Podlubny. Fractional Differential Equations. Academic Press, 1999.</li>
<li>G. Brousseau. Theory of Didactical Situations in Mathematics. Kluwer, 1997.</li>
<li>L. S. Vygotsky. Mind in Society. Harvard University Press, 1978.</li>
<li>D. Wood, J. S. Bruner, G. Ross. The role of tutoring in problem solving. Journal of Child Psychology and Psychiatry, 17 (1976), 89–100.</li>
<li>J. H. Flavell. Metacognition and cognitive monitoring. American Psychologist, 34 (1979), 906–911.</li>
</ol>`;
};
