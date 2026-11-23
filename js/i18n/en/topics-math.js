'use strict';
/* English · theory pages of the other built-in topics (Georgian source: OTHER_TOPICS[*].math / .lecturer / .refs in js/data/topics.js) */
EN.other.ap = { math: `
<h3>1. Definition</h3>
<div class="def"><span class="lbl">Definition.</span> A sequence a${S_(1)}, a${S_(2)}, a${S_(3)}, … is called an <b>arithmetic progression</b> if every term from the second onward equals the previous term plus the same number d: <span class="m">a${S_('n+1')} = a${S_('n')} + d</span>. d is called the <b>common difference</b> of the progression: <span class="m">d = a${S_('n+1')} − a${S_('n')}</span>.</div>
<p>d can be positive (an increasing progression: 4, 7, 10, …), negative (decreasing: 20, 17, 14, …) or zero (constant: 5, 5, 5, …). Therefore the statement “an arithmetic progression always increases” is false.</p>
<h3>2. Formula for the n-th term</h3>
<div class="thm"><span class="lbl">Theorem.</span> <span class="m">a${S_('n')} = a${S_(1)} + (n − 1)d</span>.</div>
<div class="prf"><span class="lbl">Derivation.</span> From a${S_(1)} to a${S_('n')} there are n − 1 steps (the “fence-post” principle: between n posts there are n − 1 gaps), and d is added at every step. Rigorously — by induction: for n = 1, a${S_(1)} = a${S_(1)} + 0·d; if a${S_('k')} = a${S_(1)} + (k − 1)d, then a${S_('k+1')} = a${S_('k')} + d = a${S_(1)} + kd. ∎</div>
<p><b>Checking with n = 1</b> is the simplest test of a formula: substituting into a${S_('n')} = a${S_(1)} + nd gives a${S_(1)} = a${S_(1)} + d, which is impossible for d ≠ 0.</p>
<h3>3. A progression given by two terms</h3>
<p>If a${S_('k')} and a${S_('m')} are known, there are m − k steps between them: <span class="m">d = (a${S_('m')} − a${S_('k')})/(m − k)</span>, and then <span class="m">a${S_(1)} = a${S_('k')} − (k − 1)d</span>. E.g.: a${S_(4)} = 17, a${S_(10)} = 35 ⇒ d = 18/6 = 3, a${S_(1)} = 8.</p>
<h3>4. Connection with the linear function</h3>
<p><span class="m">a${S_('n')} = dn + (a${S_(1)} − d)</span> is a linear function of n. The points (n; a${S_('n')}) lie on one straight line, and d is the slope of this line (how much the line “rises” per step).</p>
<h3>5. Characteristic property</h3>
<p>Every middle term is the arithmetic mean of its neighbours: <span class="m">a${S_('n')} = (a${S_('n−1')} + a${S_('n+1')})/2</span>.</p>
<h3>6. Typical mistakes</h3>
<ul><li>The “fence-post” mistake: n instead of n − 1 (a${S_(100)} = 304 instead of 301);</li><li>omitting a${S_(1)} from the formula; “proportional” reasoning a${S_('n')} ∼ n;</li><li>looking for a ratio instead of a difference; confusing the number of terms with the number of steps;</li><li>“a progression always increases”.</li></ul>` };

EN.other.apsum = { math: `
<h3>1. The idea: symmetric pairs</h3>
<p>In the sum 2 + 5 + 8 + 11 + 14 the sums of the first and the last term, and of the second and the second-to-last, are equal: 2 + 14 = 5 + 11 = 16. The reason: every step from the left increases a term by d, while every step from the right decreases it by d, so <span class="m">a${S_('k')} + a${S_('n−k+1')} = a${S_(1)} + a${S_('n')}</span>.</p>
<h3>2. The sum formula</h3>
<div class="thm"><span class="lbl">Theorem.</span> <span class="m">S${S_('n')} = n(a${S_(1)} + a${S_('n')})/2</span>, and substituting a${S_('n')}: <span class="m">S${S_('n')} = n[2a${S_(1)} + (n − 1)d]/2</span>.</div>
<div class="prf"><span class="lbl">Derivation (Gauss’s method).</span> Write the sum twice — in the usual order and in reverse:<br>S${S_('n')} = a${S_(1)} + a${S_(2)} + … + a${S_('n')}<br>S${S_('n')} = a${S_('n')} + a${S_('n−1')} + … + a${S_(1)}.<br>Adding column by column gives n equal sums a${S_(1)} + a${S_('n')}: 2S${S_('n')} = n(a${S_(1)} + a${S_('n')}). ∎</div>
<p><b>Interpretation as a mean:</b> S${S_('n')} = n · (a${S_(1)} + a${S_('n')})/2 — the number of terms multiplied by the mean of the first and the last term, which equals the mean of all the terms of the progression.</p>
<h3>3. Which form when</h3>
<p>If a${S_('n')} is known — <span class="m">n(a${S_(1)} + a${S_('n')})/2</span>; if only a${S_(1)}, d and n are known — <span class="m">n[2a${S_(1)} + (n − 1)d]/2</span>. Both give the same result (a${S_(1)} = 5, d = 4, n = 20 ⇒ S${S_(20)} = 860). For small n the answer is checked by adding directly.</p>
<h3>4. Typical mistakes</h3>
<ul><li>Forgetting to divide by 2 (n(a${S_(1)} + a${S_('n')}) instead of n(a${S_(1)} + a${S_('n')})/2);</li><li>n instead of n − 1 when computing a${S_('n')};</li><li>miscounting the pairs when n is odd (the middle term).</li></ul>` };

EN.other.gp = { math: `
<h3>1. Definition</h3>
<div class="def"><span class="lbl">Definition.</span> A sequence b${S_(1)}, b${S_(2)}, … (b${S_(1)} ≠ 0) is called a <b>geometric progression</b> if every term from the second onward equals the previous term multiplied by the same number q ≠ 0: <span class="m">b${S_('n+1')} = b${S_('n')}·q</span>. q is called the <b>common ratio</b>: <span class="m">q = b${S_('n+1')} : b${S_('n')}</span>.</div>
<p>q &gt; 1 and b${S_(1)} &gt; 0 — increasing (3, 6, 12, …); 0 &lt; q &lt; 1 — decreasing (80, 40, 20, …); q &lt; 0 — alternating in sign (1, −2, 4, −8, …). Therefore “a geometric progression always increases” is false.</p>
<h3>2. Formula for the n-th term</h3>
<div class="thm"><span class="lbl">Theorem.</span> <span class="m">b${S_('n')} = b${S_(1)}·q<sup>n−1</sup></span>.</div>
<div class="prf">From b${S_(1)} to b${S_('n')} there are n − 1 steps, and at every step we multiply by q, i.e. q occurs as a factor n − 1 times — this is a power, not (n − 1)·q. By induction: b${S_('k+1')} = b${S_('k')}q = b${S_(1)}q<sup>k</sup>. ∎</div>
<h3>3. A progression given by two terms</h3>
<p><span class="m">b${S_('m')} : b${S_('k')} = q<sup>m−k</sup></span>. E.g.: b${S_(2)} = 6, b${S_(5)} = 162 ⇒ q³ = 27, q = 3, b${S_(1)} = 2. For an <b>even</b> exponent there are two solutions: b${S_(1)} = 3, b${S_(3)} = 12 ⇒ q² = 4, q = ±2 — both progressions (3, 6, 12 and 3, −6, 12) satisfy the condition.</p>
<h3>4. The graph: a straight line or not?</h3>
<p>The points (n; b${S_('n')}) do <b>not</b> lie on a straight line: in an arithmetic progression the same number is added at every step (linear growth), in a geometric one the term is multiplied by the same number (exponential growth).</p>
<h3>5. Characteristic property</h3>
<p><span class="m">b${S_('n')}² = b${S_('n−1')}·b${S_('n+1')}</span> — for positive terms, the middle term is the geometric mean of its neighbours.</p>
<h3>6. Typical mistakes</h3>
<ul><li>Looking for a difference instead of a ratio (“arithmetic” thinking);</li><li>q·(n − 1) or b${S_(1)}q<sup>n</sup> instead of q<sup>n−1</sup>;</li><li>q = 9 from q³ = 27 (dividing instead of taking a root), or confusing q with q³;</li><li>losing a negative ratio, sign errors with powers ((−2)³ = −8);</li><li>treating the points of a geometric progression as a straight line.</li></ul>` };

EN.other.gpsum = { math: `
<h3>1. The idea: multiplying by q “shifts” the terms</h3>
<p>S = 1 + 2 + 4 + 8 ⇒ 2S = 2 + 4 + 8 + 16. The two sums share terms, so subtracting gives 2S − S = 16 − 1 = 15.</p>
<h3>2. The sum formula</h3>
<div class="thm"><span class="lbl">Theorem.</span> If q ≠ 1, <span class="m">S${S_('n')} = b${S_(1)}(q<sup>n</sup> − 1)/(q − 1) = b${S_(1)}(1 − q<sup>n</sup>)/(1 − q)</span>; if q = 1, <span class="m">S${S_('n')} = n·b${S_(1)}</span>.</div>
<div class="prf"><span class="lbl">Derivation.</span> S${S_('n')} = b${S_(1)} + b${S_(1)}q + … + b${S_(1)}q<sup>n−1</sup>; qS${S_('n')} = b${S_(1)}q + … + b${S_(1)}q<sup>n−1</sup> + b${S_(1)}q<sup>n</sup>. When we subtract, the middle terms vanish: (q − 1)S${S_('n')} = b${S_(1)}(q<sup>n</sup> − 1). For q ≠ 1 we divide both sides by q − 1. For q = 1 all n terms equal b${S_(1)}. ∎</div>
<h3>3. Which form when</h3>
<p>For q &gt; 1 the natural form is <span class="m">(q<sup>n</sup> − 1)/(q − 1)</span>; for 0 &lt; q &lt; 1 it is <span class="m">(1 − q<sup>n</sup>)/(1 − q)</span> (both numerator and denominator positive). Check for a small n: b${S_(1)} = 1, q = 2, n = 4 ⇒ (16 − 1)/(2 − 1) = 15 = 1 + 2 + 4 + 8.</p>
<h3>4. Next step</h3>
<p>For |q| &lt; 1, q<sup>n</sup> becomes smaller and the sum approaches b${S_(1)}/(1 − q) — this is the sum of an infinitely decreasing progression, which requires the concept of a limit.</p>
<h3>5. Typical mistakes</h3>
<ul><li>q<sup>n−1</sup> or (q − 1)<sup>n</sup> instead of q<sup>n</sup> − 1;</li><li>missing the case q = 1 (division by zero);</li><li>confusing powers with multiplication in the computation.</li></ul>` };

EN.other.grade5_eq = { math: `
<h3>1. What an equation is</h3>
<div class="def"><span class="lbl">Definition.</span> An <b>equation</b> is an equality containing an unknown number (e.g. x + 4 = 11). <b>Solving</b> it means finding the number which, when substituted, makes the equality true. Here x stands for an <b>unknown number</b>, not “just some letter”.</div>
<h3>2. Finding an unknown component (the inverse operation)</h3>
<ul><li>Unknown addend = sum minus the known addend: x + 4 = 11 ⇒ x = 11 − 4 = 7;</li><li>unknown factor = product divided by the known factor: 3x = 18 ⇒ x = 18 ÷ 3 = 6;</li><li>unknown minuend = difference plus subtrahend; unknown dividend = quotient multiplied by the divisor.</li></ul>
<h3>3. Two steps</h3>
<p>2x + 3 = 15: first treat 2x as an unknown addend — 2x = 15 − 3 = 12, then x as an unknown factor — x = 12 ÷ 2 = 6. The operations are undone in the reverse order to the one in which they were “applied” to x.</p>
<h3>4. Checking</h3>
<p>An answer is always checked by substitution: x = 6 ⇒ 2·6 + 3 = 15 ✓. This habit is the basis of the student’s personal (metacognitive) knowledge.</p>
<h3>5. Typical mistakes</h3>
<ul><li>The wrong inverse operation: 3x = 18 ⇒ x = 18 − 3 = 15;</li><li>x + 4 = 11 ⇒ x = 11 + 4;</li><li>dividing first in a two-step equation: 2x + 3 = 15 ⇒ x + 3 = 7.5.</li></ul>` };

EN.other.linear_eq = { math: `
<h3>1. Equation, solution, solving</h3>
<div class="def"><span class="lbl">Definition 1.</span> An <b>equation</b> in one unknown is an equality <span class="m">A(x) = B(x)</span>, where A and B are expressions and x is an unknown number. A number x${S_(0)} is called a <b>solution</b> (root) if substituting it makes the equality true: <span class="m">A(x${S_(0)}) = B(x${S_(0)})</span>. <b>Solving</b> an equation means finding all its solutions (or establishing that there are none).</div>
<p>An important distinction: an <b>identity</b> is true for every x (2(x + 3) = 2x + 6), whereas an <b>equation</b> is true only for some values (2x + 6 = 14 ⇔ x = 4). In an equation, x denotes a specific number that is not yet known, not “any number” or “a letter”.</p>
<div class="def"><span class="lbl">Definition 2.</span> A <b>linear equation</b> is an equation that can be brought by equivalent transformations to the form <span class="m">ax = b</span>, where a and b are numbers (the unknown appears to the first power and is not multiplied by itself).</div>

<h3>2. Equivalent equations</h3>
<div class="def"><span class="lbl">Definition 3.</span> Two equations are called <b>equivalent</b> if their solution sets coincide. The whole art of solving lies in replacing the equation step by step with a simpler but <b>equivalent</b> one, until we arrive at x = c.</div>

<h3>3. Theorem on equivalent transformations</h3>
<div class="thm"><span class="lbl">Theorem 1.</span> (a) The equation <span class="m">A = B</span> is equivalent to <span class="m">A + c = B + c</span> for any number c. (b) <span class="m">A = B</span> is equivalent to <span class="m">c·A = c·B</span> if <b>c ≠ 0</b>.</div>
<div class="prf"><span class="lbl">Proof.</span> (a) If A = B at x${S_(0)}, then adding c to both sides gives A + c = B + c. Conversely, if A + c = B + c, subtracting c from both sides gives A = B. Hence the solutions are the same. (b) Likewise: multiplication by c is reversed by division by c — but only when c ≠ 0. ∎</div>
<div class="ex"><span class="lbl">Why c ≠ 0.</span> The equation x = 1 has one solution. Multiplying both sides by 0 gives 0·x = 0, which is satisfied by <b>every</b> x — solutions have been “added”, and equivalence is broken.</div>
<p><b>“Moving a term to the other side and changing its sign”</b> is only a shorthand for part (a): in 3x + 5 = 20, adding −5 to both sides gives 3x = 20 − 5. At the beginning of teaching it is better for the student to write the operation on both sides explicitly, and to use “moving a term” only later, as an abbreviation.</p>

<h3>4. The equation ax = b: three cases</h3>
<div class="thm"><span class="lbl">Theorem 2.</span> (1) a ≠ 0 — a unique solution <span class="m">x = b/a</span>; (2) a = 0, b ≠ 0 — no solution; (3) a = 0, b = 0 — every x is a solution.</div>
<div class="prf">(1) For a ≠ 0 we divide both sides by a (Theorem 1(b), c = 1/a). (2) 0·x = 0 ≠ b for every x. (3) 0·x = 0 for every x. ∎</div>
<p>Examples: 2x + 3 = 2x + 5 ⇒ 0·x = 2 — no solution; 2(x + 1) = 2x + 2 ⇒ 0·x = 0 — an identity.</p>

<h3>5. Solution algorithm</h3>
<ol><li>Expand the brackets (distributivity: <span class="m">2(x − 3) = 2x − 6</span>);</li><li>collect like terms on each side;</li><li>terms with the unknown on one side, numbers on the other (Theorem 1(a));</li><li>divide both sides by the coefficient of x (Theorem 1(b), a ≠ 0);</li><li><b>check</b> — substitute the solution into the <b>original</b> equation.</li></ol>
<p>Example: 2(x − 3) + 5 = 17 → 2x − 6 + 5 = 17 → 2x − 1 = 17 → 2x = 18 → x = 9. Check: 2(9 − 3) + 5 = 12 + 5 = 17 ✓. An alternative path, “working backwards”: 2(x − 3) = 12 → x − 3 = 6 → x = 9.</p>

<h3>6. Three models for understanding</h3>
<ul>
<li><b>The balance (equilibrium).</b> An equality is a balance in equilibrium; the same change on both pans keeps it balanced. This model is a visual form of Theorem 1 and explains questions II-D and III-D well. (The model weakens for negative numbers — the lecturer should pay attention to this.)</li>
<li><b>Working backwards (inverse operations).</b> 3x + 5: “x was multiplied by 3, then 5 was added”. Solving means going back along the same chain with inverse operations: first −5, then ÷3. This explains why we should not divide by 3 first.</li>
<li><b>The graph.</b> The solution of ax + b = c is the x-coordinate of the intersection of the line y = ax + b with the horizontal line y = c. This links the topic to the linear function and explains the three cases (one intersection, parallel lines, coinciding lines).</li></ul>

<h3>7. Two meanings of the “=” sign</h3>
<p>Research (C. Kieran) shows that many students read “=” as a command, “write the answer” (an <b>operational</b> view: 3 + 4 = 7), rather than as a <b>relation</b> of equality between two expressions. For such a student, 7 = x + 2 or 3x + 5 = 2x + 9 looks “strange”. Questions I-D and II-D are designed precisely to check the relational view; checking by substitution (I-R, II-R) strengthens it: the student compares the two sides.</p>

<h3>8. A historical note</h3>
<p>The term “algebra” comes from the treatise of the ninth-century mathematician al-Khwarizmi, which describes two basic operations: <b>al-jabr</b> (“restoration” — moving a subtracted term to the other side) and <b>al-muqabala</b> (“balancing” — cancelling like terms on both sides). Both are applications of Theorem 1.</p>

<h3>9. Typical mistakes and their Socratic correction</h3>
<table><tr><th>Mistake</th><th>Example</th><th>Control question (without a ready answer)</th></tr>
<tr><td>Wrong inverse operation</td><td>x + 5 = 12 ⇒ x = 17</td><td>“Substitute 17: 17 + 5 = ? Is it 12?”</td></tr>
<tr><td>Operating on one side only</td><td>x + 5 − 5 = 12 ⇒ x = 12</td><td>“Substitute x = 12 into the original equation. Does it hold?”</td></tr>
<tr><td>Wrong order when working backwards</td><td>3x + 5 = 20 ⇒ x + 5 = 20/3</td><td>“Which operation was applied to x first — · 3 or + 5? So which must be removed first?”</td></tr>
<tr><td>Stopping half-way</td><td>3x = 15 ⇒ “the answer is 15”</td><td>“Are we looking for x or for 3x?”</td></tr>
<tr><td>Incomplete expansion of brackets</td><td>2(x − 3) = 2x − 3 ⇒ x = 7.5</td><td>“Substitute x = 1 into both expressions: 2(1 − 3) and 2·1 − 3. Are they equal?”</td></tr>
<tr><td>3x read as “writing the digits side by side”</td><td>x = 5 ⇒ 3x = 35</td><td>“3x means 3 · x. What is 3 · 5?”</td></tr>
<tr><td>Division by 0 / ignoring the case a = 0</td><td>0·x = 2 ⇒ x = 2/0</td><td>“Is there a number which gives 2 when multiplied by 0?”</td></tr></table>`,
lecturer: `
<p class="hint">The table shows the lecturer what each question checks, what answer is expected and which typical mistake the program recognises. The control questions are exactly those that the program asks the student after a mistake.</p>
<div class="matrix"><table><tr><th>ID</th><th>What it checks</th><th>Expected answer</th><th>Typical mistake → program’s response</th></tr>
<tr><td>P1–P4</td><td>Arithmetic operations and their inverses (− ↔ +, ÷ ↔ ·) — the basis of “working backwards”</td><td>7; 12; 6</td><td>Confusing operations (12 − 5 = 17, 18 ÷ 3 = 15) → “What does the sign ask you to do?”</td></tr>
<tr><td>P3</td><td>Substitution; 3x = 3 · x; order of operations</td><td>7</td><td>33 (“writing digits side by side”), 9 (adding first) → “3x means 3 · x”</td></tr>
<tr><td>P5</td><td>The meaning of brackets (distributivity)</td><td>14</td><td>11 (2 · 4 + 3) → “the whole sum is multiplied by 2”</td></tr>
<tr><td>I-D</td><td>The concept of an equation: an equality + an unknown; what we are looking for</td><td>“An equality with an unknown; we look for the x that makes it true”</td><td>Only “finding x” → partial; hint: “try x = 3 and x = 7”</td></tr>
<tr><td>I-P</td><td>One-step equation</td><td>x = 7</td><td>17 → “substitute: 17 + 5 = ?”</td></tr>
<tr><td>I-R</td><td>Checking by substitution; “=” as a relation</td><td>12 (= the right-hand side)</td><td>—</td></tr>
<tr><td>II-D</td><td>Justifying an equivalent transformation (the balance, Theorem 1)</td><td>“Equal quantities stay equal after the same change”</td><td>“That’s the rule” → partial; hint with the balance</td></tr>
<tr><td>II-P</td><td>Two-step equation; order of operations</td><td>x = 5</td><td>15 (stopping at 3x = 15), 8.33 (dividing first), 25 → the corresponding control question</td></tr>
<tr><td>II-R</td><td>Checking a two-step equation</td><td>20</td><td>40 (3x = 35) → “3x means 3 · x”</td></tr>
<tr><td>III-D</td><td>Why a change on one side only is not allowed — with a counterexample</td><td>“The equality breaks; e.g. x + 5 = 12 → x = 12, which does not hold”</td><td>A general phrase without an example → partial</td></tr>
<tr><td>III-P</td><td>Equation with brackets; two paths (expanding or working backwards)</td><td>x = 9</td><td>7.5 (2(x − 3) = 2x − 3), 11.5 (+5 lost), 3, 12 → the corresponding question</td></tr>
<tr><td>III-R</td><td>Reflection: a difficult step, what helped, how it was checked</td><td>All three components</td><td>A general answer → partial</td></tr></table></div>
<p><b>Recommendation to the lecturer.</b> If the student gets stuck at Level II on the order of “working backwards”, a table “what was done to x → how we undo it” is useful. If III-D is partial, ask the student to invent a counterexample themselves. Next steps after Level III: the unknown on both sides (3x + 5 = x + 13), equations without solutions and identities (Theorem 2), word problems.</p>` };

EN.other.quadratic_eq = { math: `
<h3>1. Definition</h3>
<div class="def"><span class="lbl">Definition.</span> A <b>quadratic equation</b> is <span class="m">ax² + bx + c = 0</span>, a ≠ 0 — the unknown appears to the second power. A <b>root</b> is a number which, when substituted, makes the expression zero; graphically, it is an intersection of the parabola y = ax² + bx + c with the x-axis.</div>
<h3>2. Incomplete equations</h3>
<p>x² = 9 ⇒ x = 3 or x = −3 (both, since (−3)² = 9). x² − 9 = 0 ⇒ (x − 3)(x + 3) = 0. ax² + bx = 0 ⇒ x(ax + b) = 0.</p>
<h3>3. Factorisation and Vieta’s theorem</h3>
<p>If x² + px + q = (x − x${S_(1)})(x − x${S_(2)}), then <span class="m">x${S_(1)} + x${S_(2)} = −p</span>, <span class="m">x${S_(1)}x${S_(2)} = q</span>. x² − 5x + 6 = 0: we look for two numbers with product 6 and sum 5 ⇒ 2 and 3, i.e. (x − 2)(x − 3) = 0. A product is zero if and only if one of the factors is zero.</p>
<h3>4. The root formula and the discriminant</h3>
<div class="thm"><span class="lbl">Theorem.</span> <span class="m">x${S_('1,2')} = (−b ± √D)/(2a)</span>, <span class="m">D = b² − 4ac</span>.</div>
<div class="prf">By completing the square: ax² + bx + c = a[(x + b/(2a))² − D/(4a²)]. Hence D &gt; 0 — two roots; D = 0 — one (double) root; D &lt; 0 — no real root (a square cannot be negative). ∎</div>
<p>A double root (D = 0) corresponds to the parabola <b>touching</b> the axis — this idea is the basis of the topic “Derivative without limits”.</p>
<h3>5. Typical mistakes</h3>
<ul><li>Only x = 3 from x² = 9;</li><li>sign errors with Vieta (roots −2, −3 instead of 2, 3);</li><li>sign errors in b² when computing D;</li><li>losing the middle term when expanding (x + 2)(x + 3).</li></ul>` };

EN.other.proportion = { math: `
<h3>1. Ratio and proportion</h3>
<div class="def"><span class="lbl">Definition.</span> A <b>ratio</b> a : b shows how many times larger a is than b (or what part of b it is). A <b>proportion</b> is an equality of two ratios: <span class="m">a/b = c/d</span> (b, d ≠ 0). A ratio does not change if both terms are multiplied or divided by the same number (6 : 9 = 2 : 3).</div>
<h3>2. The basic property of a proportion</h3>
<div class="thm"><span class="lbl">Theorem.</span> <span class="m">a/b = c/d ⇔ ad = bc</span> (cross products).</div>
<div class="prf">Multiply both sides of the equality by bd ≠ 0: (a/b)·bd = (c/d)·bd ⇒ ad = cb. Conversely, divide both sides of ad = bc by bd. ∎</div>
<p>3/5 = x/20 ⇒ 5x = 60 ⇒ x = 12. Check: 3·20 = 5·12 = 60.</p>
<h3>3. Direct proportionality</h3>
<p>Two quantities are directly proportional if their ratio is constant: <span class="m">y = kx</span>. Two methods: <b>reducing to one unit</b> (4 kg — 14 lari ⇒ 1 kg — 3.5 lari ⇒ 10 kg — 35 lari) and <b>a proportion</b> (4/14 = 10/x). Scale: 3 cm — 12 km ⇒ 1 cm — 4 km ⇒ 7.5 cm — 30 km.</p>
<h3>4. Telling proportional from non-proportional</h3>
<p>Under proportionality the ratio y/x is the same for all pairs, and the graph is a straight line through the origin. “Taxi: 2 lari to get in + 1 lari per km” is linear but not proportional (y = x + 2).</p>
<h3>5. Typical mistakes</h3>
<ul><li>Mixing up the cross products (3·x = 5·20);</li><li>treating every linear relationship as proportional;</li><li>multiplying by 25 when computing 25%.</li></ul>` };

EN.other.linear_fn = { math: `
<h3>1. Definition</h3>
<div class="def"><span class="lbl">Definition.</span> A <b>linear function</b> is <span class="m">y = kx + b</span>. Its main property: equal changes in x correspond to equal changes in y — the rate of change is constant.</div>
<h3>2. k — the slope</h3>
<div class="thm"><span class="lbl">Property.</span> For any two points <span class="m">k = Δy/Δx = (y${S_(2)} − y${S_(1)})/(x${S_(2)} − x${S_(1)})</span>.</div>
<div class="prf">y${S_(2)} − y${S_(1)} = (kx${S_(2)} + b) − (kx${S_(1)} + b) = k(x${S_(2)} − x${S_(1)}). ∎</div>
<p>(1; 4) and (3; 10) ⇒ k = 6/2 = 3. If k = 3, increasing x by 2 units increases y by 6. k &gt; 0 — increasing, k &lt; 0 — decreasing, k = 0 — constant.</p>
<h3>3. b — the initial value</h3>
<p>At x = 0, y = b: the graph crosses the y-axis at the point (0; b). Finding b from a point: y = 2x + b passes through (3; 11) ⇒ 11 = 6 + b ⇒ b = 5.</p>
<h3>4. Three representations</h3>
<p>The formula, a table (equal increments of y) and the graph (a straight line) describe the same function. An arithmetic progression is a linear function on the natural numbers n: a${S_('n')} = dn + (a${S_(1)} − d).</p>
<h3>5. Typical mistakes</h3>
<ul><li>Computing k as Δx/Δy, or mixing up the order of subtraction;</li><li>confusing the roles of b and k;</li><li>“y doubles if x doubles” — true only for b = 0.</li></ul>` };

EN.other.pyramids = { partTitle: 'I. Content foundations (history)', math: `
<h3>1. Historical context</h3>
<p>The civilisation of ancient Egypt took shape in the Nile valley. In a desert country the river was the source of life: the annual flood left fertile silt, and travel by boat was the main means of transport. The country was ruled by the <b>pharaoh</b> — a king regarded as a divine ruler. The great pyramids belong mainly to the era of the <b>Old Kingdom</b> (the middle of the third millennium BC).</p>
<h3>2. Purpose: belief and the tomb</h3>
<div class="def"><span class="lbl">Main idea.</span> The Egyptian pyramids were the <b>funerary monuments</b> of the pharaohs. The Egyptians believed in an eternal life after death; the body was mummified and laid to rest in an indestructible “house of eternity”. A pyramid was part of a complex of temples, a causeway and other buildings.</div>
<h3>3. Development of the form</h3>
<table><tr><th>Stage</th><th>Example</th><th>Approx. date</th></tr>
<tr><td>Mastaba — a flat-roofed tomb</td><td>Tombs of the early dynasties</td><td>Beginning of the 3rd millennium BC</td></tr>
<tr><td>Step pyramid</td><td>Pyramid of Djoser, Saqqara (architect Imhotep)</td><td>c. 2670 BC</td></tr>
<tr><td>Transitional experiments</td><td>Sneferu’s “Bent” and “Red” pyramids, Dahshur</td><td>c. 2600 BC</td></tr>
<tr><td>Smooth-sided pyramids</td><td>Giza: Khufu (Cheops), Khafre, Menkaure; the Great Sphinx</td><td>c. 2560 BC and later</td></tr></table>
<p>The dates are approximate and differ by several decades between sources — which in itself is a good teaching moment.</p>
<h3>4. The Great Pyramid in numbers</h3>
<ul><li>Originally about 146 m high (today about 138 m — the casing and the apex have been lost); each side of the base about 230 m; the sides are oriented to the cardinal points with astonishing precision.</li>
<li>About 2.3 million blocks; mainly local limestone, white Tura limestone for the casing, Aswan granite for the King’s Chamber.</li>
<li>It was the tallest structure in the world for about 3800 years (until Lincoln Cathedral, early 14th century).</li>
<li>It is the only one of the Seven Wonders of the Ancient World that survives today.</li></ul>
<h3>5. How it was built: technology and evidence</h3>
<table><tr><th>Method</th><th>Evidence</th></tr>
<tr><td>Sledges on wetted sand</td><td>A painting in the tomb of Djehutihotep (water is poured in front of the sledge); modern experiments: wet sand greatly reduces friction</td></tr>
<tr><td>Boats on the Nile and canals</td><td>The papyri of Wadi al-Jarf — the “Diary of Merer” (discovered in 2013; the oldest known inscribed papyri): shipping Tura limestone to Giza</td></tr>
<tr><td>Ramps (inclines)</td><td>Remains at quarries and pyramids; the exact form (straight, spiral, internal) is still debated</td></tr></table>
<h3>6. Who built them?</h3>
<p>The popular idea of “slaves” is not supported by modern evidence. At Giza a workers’ settlement has been excavated (bakeries, workshops, food remains — many cattle bones), together with workers’ tombs next to the pyramids. It is likely that permanent craftsmen and seasonal labourers worked there (especially during the flood, when the fields were under water) — thousands of people organised in work gangs. Herodotus (5th century BC) wrote of 100,000 workers, but he lived about 2000 years after the construction, and his figure is considered exaggerated.</p>
<h3>7. Pyramids around the world: a comparison</h3>
<ul><li><b>Nubia (Sudan)</b> — hundreds of pyramids, smaller and steeper; also tombs.</li>
<li><b>Mesoamerica</b> (Teotihuacan, Chichén Itzá) — stepped platforms with a staircase and a temple on a flat top, for rituals; in some (e.g. Palenque) a ruler’s tomb was also found.</li></ul>
<p>Conclusion: a similar form does not yet mean a similar purpose or a cultural connection — the form partly follows from the logic of materials and stability.</p>
<h3>8. Myths and critical thinking</h3>
<table><tr><th>Myth</th><th>What the evidence says</th><th>Socratic question</th></tr>
<tr><td>“Slaves built them”</td><td>The workers’ settlement, food, honourable tombs</td><td>“Would a slave have been buried next to the pharaoh’s pyramid?”</td></tr>
<tr><td>“Aliens built them”</td><td>Quarries, tools, unfinished pyramids, papyri, the gradual development of the form</td><td>“If the technology came from the sky, why do we see experiments and mistakes (the Bent Pyramid)?”</td></tr>
<tr><td>“Every pyramid is a tomb”</td><td>Mesoamerican pyramids are mostly temples</td><td>“What stood on the top?”</td></tr>
<tr><td>“Tutankhamun is in a pyramid”</td><td>He lived about 1200 years later; his tomb is in the Valley of the Kings</td><td>“When did he live compared with Khufu?”</td></tr></table>`,
lecturer: `
<p class="hint">This topic shows that the methodology also works beyond mathematics: the content changes, while the three components and the ladder of help stay the same. In history the components read as follows:</p>
<table><tr><th>Component</th><th>In history</th><th>Questions</th></tr>
<tr><td>Declarative</td><td>Concepts and facts: purpose, era, development of the form, technology</td><td>I-D, II-D, III-D, III-D2, F1</td></tr>
<tr><td>Procedural</td><td>The historian’s “methods”: computing chronology (BC/AD), localisation, rough estimation, drawing a conclusion from a source</td><td>P3, I-P, II-P, II-P2, III-P, F2</td></tr>
<tr><td>Personal / metacognitive</td><td>Checking a claim against a source, seeing the limits of one’s own conclusion, telling myth from fact, reflection</td><td>I-R, II-R, III-R, F3</td></tr></table>
<div class="matrix"><table><tr><th>ID</th><th>What it checks</th><th>Expected answer</th><th>Typical mistake → program’s response</th></tr>
<tr><td>P1–P2</td><td>Geographical context; the role of the Nile</td><td>Africa; the Nile — water, silt, transport</td><td>“Asia” → check with a map</td></tr>
<tr><td>P3</td><td>Converting a BC date into “how many years ago”</td><td>≈ 4590</td><td>534 (2560 − 2026) → “are the years subtracted or added?”</td></tr>
<tr><td>P4–P5</td><td>The pharaoh; the concept of a historical source</td><td>King; source + example</td><td>No example → partial</td></tr>
<tr><td>I-D</td><td>Purpose</td><td>Tombs of the pharaohs, belief in life after death</td><td>“A temple” → “What stood in the King’s Chamber?”</td></tr>
<tr><td>I-P</td><td>Localisation, the pharaoh</td><td>Giza; Khufu (Cheops)</td><td>“Tutankhamun” → a chronological question</td></tr>
<tr><td>I-R</td><td>Reliability of a source</td><td>A film is not a source; checking with excavations and inscriptions</td><td>“Yes, it is enough” → “Was the author present at the construction?”</td></tr>
<tr><td>II-D</td><td>Development over time</td><td>Mastaba → Djoser → Sneferu → Giza</td><td>One stage → partial</td></tr>
<tr><td>II-P</td><td>Interval BC ↔ AD</td><td>≈ 3870 years</td><td>≈ 1250 (subtraction) → “subtracted or added?”</td></tr>
<tr><td>II-P2</td><td>Rough estimate</td><td>≈ 300 blocks per day</td><td>115,000 (per year), 7300 (days) → the corresponding question</td></tr>
<tr><td>II-R</td><td>A conclusion from a number + checking it</td><td>Thousands of workers, organisation; checking with sources</td><td>Only one part → partial</td></tr>
<tr><td>III-D</td><td>Technology + evidence</td><td>Sledges/wet sand, boats, ramps — each with evidence</td><td>Methods without evidence → partial</td></tr>
<tr><td>III-P</td><td>A conclusion from an archaeological source</td><td>Organised, well-fed, respected workers</td><td>Description only → partial</td></tr>
<tr><td>III-D2</td><td>Comparison, evaluating an overgeneralisation</td><td>No; Mesoamerica — temple platforms</td><td>“Yes” → “What stood on the top?”</td></tr>
<tr><td>F1–F3</td><td>Independent check</td><td>Purpose; ≈ 110 years; two steps for checking a myth</td><td>5230 (adding the dates) → in the report</td></tr></table></div>
<p><b>Recommendation to the lecturer.</b> The topic is intended for roughly grades 6–9 (change “Grade / level” as needed). In AI mode the hints adapt to the student’s specific answer, and AI judges open answers (“explain”, “compare”) more accurately — without AI the program relies on keywords. Ideas for continuation: mummification and the “Book of the Dead”; hieroglyphs and the Rosetta Stone; comparing Egypt with Mesopotamia.</p>`,
refs: `<li>M. Lehner. The Complete Pyramids. Thames &amp; Hudson, 1997.</li>
<li>M. Lehner, Z. Hawass. Giza and the Pyramids. Thames &amp; Hudson, 2017.</li>
<li>P. Tallet, M. Lehner. The Red Sea Scrolls: How Ancient Papyri Reveal the Secrets of the Pyramids. Thames &amp; Hudson, 2021.</li>
<li>Herodotus. Histories, Book II.</li>
<li>S. Wineburg. Historical Thinking and Other Unnatural Acts. Temple University Press, 2001.</li>
<li>P. Seixas, T. Morton. The Big Six Historical Thinking Concepts. Nelson Education, 2013.</li>` };
EN.other.linear_eq.refs = `<li>C. Kieran. Concepts associated with the equality symbol. Educational Studies in Mathematics, 12 (1981), 317–326.</li>`;
