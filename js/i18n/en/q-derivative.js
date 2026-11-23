'use strict';
/* English · derivative without limits (Georgian source: OFFLINE_BANKS.derivative) */
EN.q.derivative = {
  P1: {
    skill: 'The concept of a function',
    intro: 'First, let us recall the knowledge on which the construction of the derivative will rest.',
    text: 'Recall the definition of a function: how many values of y correspond to each x in the domain?',
    'check.errors.0.follow': 'Suppose x = 1 corresponds to both y = 2 and y = 5. Can we say unambiguously what f(1) equals?',
    reveal: 'In a function, every x in the domain corresponds to one and only one y. We will need this uniqueness at the end: when we assign a single k(a) to every a, we obtain exactly a function.',
    ladder: ['If f(x) = x², how many values does f(2) have?', 'Can the same x have two different values of y and still be a function?', 'Every pupil has exactly one date of birth. It is the same in a function: how many values of y correspond to each x?'],
    answer: 'Each admissible x corresponds to exactly one y.'
  },
  P2: {
    skill: 'Value of a quadratic function',
    text: 'For the function y = x², what is y when x = −3?',
    'check.errors.0.follow': '(−3)² = (−3)·(−3). What is the sign of the product of two negative numbers?',
    'check.errors.1.follow': 'What does squaring mean: multiplying a number by 2, or multiplying it by itself?',
    reveal: 'y = (−3)² = (−3)·(−3) = 9. The square of a negative number is positive.',
    ladder: ['Substitute x = −3 into the formula y = x².', '(−3)² means (−3)·(−3). What sign will the product have?', 'What is 3·3? Now take the sign into account.']
  },
  P3: {
    skill: 'Double root and discriminant',
    text: 'When does the quadratic equation ax² + bx + c = 0 have one double real root? Write down what the discriminant D equals in that case.',
    'check.errors.0.follow': 'If D > 0, how many distinct roots does the equation have? We need one double root.',
    reveal: 'There is a double root if and only if D = b² − 4ac = 0. Then ax² + bx + c = a(x − x₀)², i.e. the factor (x − x₀) occurs twice.',
    ladder: ['Recall D = b² − 4ac. How many roots does the equation have when D > 0? And when D < 0?', 'For a double root the two roots coincide. Which part of the root formula has to vanish?', 'x₁,₂ = (−b ± √D)/2a. What must D be for x₁ = x₂?'],
    $re: { 0: /(d\s*[<>]|[<>]\s*0|positiv|negativ|greater than|less than)/ }
  },
  P4: {
    skill: 'Common points of a parabola and an axis',
    text: 'How many common points does the parabola y = x² have with the x-axis (OX)?',
    'check.errors.0.follow': 'The solution of x² = 0 is x = 0. Is there any other x with x² = 0? How many distinct points does that give?',
    'check.errors.1.follow': 'You found the root x = 0. But the question is how many common points there are. How many such x exist?',
    reveal: 'x² = 0 ⇔ x = 0. There is one common point, (0, 0). At this point x = 0 is a double root (x² = (x − 0)²): the parabola touches the axis.',
    ladder: ['At points of the x-axis, y = 0. What equation do we get?', 'How many distinct values of x satisfy the equation x² = 0?', 'Picture y = x² in your mind: at how many points does it “touch” the axis?'],
    answer: 'One common point: (0, 0).'
  },
  P5: {
    skill: 'Slope of a line',
    text: 'In the equation of a line y = kx + b, which coefficient determines how steep the line is? Write the symbol.',
    'check.errors.0.follow': 'Compare y = 2x + 1 and y = 2x + 5: is the steepness different? Now compare y = 2x + 1 and y = 5x + 1.',
    reveal: 'The steepness is determined by k (the slope): when x increases by 1, y changes by k. b is only the point where the line crosses the y-axis.',
    ladder: ['Which coefficient changes when the line becomes steeper?', 'Compare y = 2x + 1 and y = 5x + 1. Which is steeper, and what differs in their equations?', 'Which number stands in front of x: k or b?'],
    answer: 'k — the slope of the line.',
    $kw: t => /(slope|gradient|angular coefficient)/.test(t),
    $kwPart: t => /(steep|inclin|coefficient)/.test(t)
  },
  P6: {
    skill: 'Factorising a difference of squares',
    text: 'Factorise: x² − 9.',
    'check.factoredFollow': 'Your expression equals x² − 9, but it is not factorised. Write it as a product of two brackets: (x − ?)(x + ?).',
    'check.errors.0.follow': 'Multiply out your brackets: (x − 9)(x + 9) = ? Do you get x² − 9?',
    'check.errors.1.follow': 'Expand your brackets. Do you get x² − 9?',
    reveal: 'x² − 9 = (x − 3)(x + 3) — a difference of squares: u² − v² = (u − v)(u + v). In general x² − a² = (x − a)(x + a); we will need this formula when finding tangents.',
    ladder: ['9 is the square of which number?', 'Recall the formula u² − v² = (u − v)(u + v).', 'x² − 3² = (x − 3)(x + …). Fill in the gap.']
  },
  P7: {
    skill: 'Bézout’s theorem',
    text: 'x = 2 is a root of the polynomial x³ − 8 (2³ − 8 = 0). By Bézout’s theorem (the factor theorem), by which first-degree binomial is x³ − 8 divisible without remainder?',
    'check.errors.0.follow': 'Substitute x = 2 into the binomial x + 2. Does it give zero? By Bézout’s theorem, if P(c) = 0, then P(x) is divisible by (x − c).',
    reveal: 'Bézout’s theorem: if P(c) = 0, then P(x) = (x − c)·R(x). Here x³ − 8 = (x − 2)(x² + 2x + 4). In general, P(x) − P(a) is always divisible by (x − a).',
    ladder: ['If P(c) = 0, by which binomial is P(x) divisible according to Bézout’s theorem?', 'Here c = 2. Write down the binomial x − c.', 'Check: (x − 2)(x² + 2x + 4) = ? Expand the brackets.'],
    $kwPart: t => /(bezout|bézout|factor theorem|x)/.test(t)
  },
  'I-D': {
    intro: 'We know that a parabola and the x-axis can have 2, 1 or 0 common points. Now, instead of the axis, we consider an arbitrary line.',
    text: 'Take an arbitrary line y = kx + b. How can we find the common points of this line and the parabola y = x²? Describe your approach.',
    reveal: 'The coordinates of a common point satisfy both equations, so the y-values are equal: x² = kx + b, i.e. x² − kx − b = 0. Every real root of this equation is the x-coordinate of a common point.',
    ladder: ['What property does a common point have: which equations does it satisfy?', 'At a common point both y-values are equal for the same x. Write down this equality.', 'Form x² = kx + b. What do the roots of this equation mean?'],
    answer: 'Set x² = kx + b and find the solutions of the equation.',
    $kw: t => /(equat|set .*equal|equal|x\^\(2\)\s*=\s*k|system|simultaneous)/.test(t) && /(equation|solv|root|solution|x)/.test(t),
    $kwPart: t => /(equal|equat|system)/.test(t)
  },
  'I-P1': {
    text: 'How many common points do the parabola y = x² and the line y = x + 2 have?',
    'check.errors.0.follow': 'You found one of the roots. Now count: how many distinct common points are there?',
    reveal: 'x² = x + 2 ⇔ x² − x − 2 = 0 ⇔ (x − 2)(x + 1) = 0. Two distinct roots, x = 2 and x = −1, so there are two common points — the line crosses the parabola.',
    ladder: ['Form x² = x + 2 and move everything to one side.', 'x² − x − 2 = 0. Compute D or factorise.', '(x − 2)(x + 1) = 0. How many distinct roots are there?']
  },
  'I-P2': {
    text: 'How many common points do the graphs of y = x² and y = 2x − 1 have?',
    'check.errors.0.follow': 'x² − 2x + 1 = (x − 1)². How many distinct values of x satisfy (x − 1)² = 0?',
    reveal: 'x² = 2x − 1 ⇔ x² − 2x + 1 = 0 ⇔ (x − 1)² = 0. One double root x = 1, so there is one common point (1, 1). D = 0 — the line touches the parabola.',
    ladder: ['Form x² = 2x − 1.', 'Move everything to one side: x² − 2x + 1 = 0. Recall the perfect-square formula.', 'How does x² − 2x + 1 factorise? How many distinct roots are there?']
  },
  'I-P3': {
    text: 'How many common points do the graphs of y = x² and y = x − 1 have?',
    'check.errors.0.follow': 'Form x² = x − 1, i.e. x² − x + 1 = 0. Compute D = 1 − 4. How many real roots are there for such a D?',
    'check.errors.1.follow': 'Form x² − x + 1 = 0 and compute D. What is its sign?',
    reveal: 'x² = x − 1 ⇔ x² − x + 1 = 0; D = 1 − 4 = −3 < 0. There is no real root — the line and the parabola have no common point.',
    ladder: ['Form x² = x − 1 and move everything to one side.', 'Compute D for the equation x² − x + 1 = 0.', 'D = −3. How many real roots does an equation have when D < 0?']
  },
  'I-R': {
    text: 'Compare the three cases (2, 1 and 0 common points). How is the number of common points related to the roots of the equation x² = kx + b? In which case does the line “touch” the parabola, and how can you see this in the equation?',
    reveal: 'The number of common points is the number of distinct real roots of x² − kx − b = 0: D > 0 — two, D = 0 — one, D < 0 — none. Touching corresponds to D = 0, i.e. a double root: x² − kx − b = (x − x₀)².',
    ladder: ['What was the sign of D in each of the three cases?', 'In which case did you get a perfect square (x − x₀)²?', 'Complete: D > 0 → … points; D = 0 → … point, the root has multiplicity …; D < 0 → … points.'],
    answer: 'In general, a single common point does not mean tangency; for example, y = x³ crosses y = 0 at zero. For a parabola and a non-vertical line, a double root defines tangency.',
    $kw: t => /(root|solution)/.test(t) && /(double|repeated|d\s*=\s*0|discriminant\s*(is\s*)?(=\s*0|zero)|\)\^\(2\)|perfect square|complete square)/.test(t),
    $kwPart: t => /(root|solution|double|repeated|d\s*=\s*0|discriminant)/.test(t)
  },
  'II-D': {
    intro: 'Now let us ask the opposite question: can we choose a line so that it touches the parabola at a point chosen in advance?',
    text: 'Choose a point A(a, a²) on the parabola and consider the line y = a² + k(x − a). Why does this line pass through A whatever k we take? And what does k determine?',
    reveal: 'For x = a we have x − a = 0, so y = a² + k·0 = a² for any k — the line passes through A. k is the slope of this line: as k changes, the line “rotates” about the point A.',
    ladder: ['Substitute x = a into the equation of the line.', 'What is x − a when x = a? What remains of k(x − a)?', 'Move the k slider: what changes in the line and what stays the same?'],
    answer: 'For x = a, x − a = 0, so y = a².',
    $kw: t => /(x\s*=\s*a|x\s*-\s*a\s*=\s*0|x\s*-\s*a[^=]*zero|substitut|plug|put x)/.test(t) && /(a\^\(2\)|y\s*=\s*a|zero|=\s*0|slope|gradient|steep|angle)/.test(t),
    $kwPart: t => /(x\s*=\s*a|substitut|plug|slope|gradient|steep)/.test(t)
  },
  'II-P1': {
    text: 'Find k so that the line y = 9 + k(x − 3) touches the parabola y = x² at the point A(3, 9), i.e. so that x = 3 is a double root of the equation x² = 9 + k(x − 3).',
    'check.errors.0.follow': '9 is the y-coordinate of the point A. We are looking for how steep the line is. Form x² = 9 + k(x − 3) and factorise x² − 9.',
    'check.errors.1.follow': 'Substitute k = 3 and factorise x² − 9 − 3(x − 3). How many times does (x − 3) occur in it?',
    reveal: 'x² − 9 − k(x − 3) = (x − 3)(x + 3 − k). The second root is x = k − 3. x = 3 is a double root if and only if k − 3 = 3, i.e. k = 6. Tangent: y = 9 + 6(x − 3) = 6x − 9.',
    ladder: ['Form x² = 9 + k(x − 3) and move everything to one side. You can first experiment with the sliders: a = 3.', 'x² − 9 = (x − 3)(x + 3). Then x² − 9 − k(x − 3) = (x − 3)(…). What goes in the brackets?', '(x − 3)(x + 3 − k) = 0. For which k is x = 3 also the root of the second factor?']
  },
  'II-P2': {
    text: 'Now in general. From x² = a² + k(x − a) we get x² − a² − k(x − a) = 0. Factorise the left-hand side.',
    'check.factoredFollow': 'The expression is correct but not yet factorised. Which factor is common to both parts: (x − a)(x + a) and k(x − a)?',
    'check.errors.0.follow': 'Expand your brackets: do you get −k(x − a)? Check the sign in front of k.',
    'check.errors.1.follow': 'You factorised x² − a². Where is the term −k(x − a)?',
    reveal: 'x² − a² − k(x − a) = (x − a)(x + a) − k(x − a) = (x − a)(x + a − k). We took the common factor (x − a) outside the brackets.',
    ladder: ['How does x² − a² factorise?', 'Now we have (x − a)(x + a) − k(x − a). Which factor occurs in both terms?', 'Take (x − a) outside the brackets: (x − a)(… − …).']
  },
  'II-P3': {
    text: 'We obtained (x − a)(x + a − k) = 0. For which k is x = a a double root? Write k in terms of a.',
    'check.follow': 'Check your expression for a = 3: in the previous problem we found k = 6. Does it match?',
    'check.errors.0.follow': 'a² is the y-coordinate of the point A, not the slope. Check for a = 3: do you get k = 6, as in the previous problem?',
    'check.errors.1.follow': 'Substitute k = a into the second factor x + a − k. What root do you get? Is it a?',
    'check.errors.2.follow': 'Check for a = 3: in the previous problem we found k = 6. What does your expression give?',
    reveal: 'The first factor gives the root x = a, the second gives x = k − a. x = a is a double root ⇔ k − a = a ⇔ k = 2a. Check: for a = 3, k = 6, as in the previous problem.',
    ladder: ['The first factor (x − a) gives the root x = a. What is the root of the second factor?', 'The root of the second factor is x = k − a. When does it coincide with a?', 'Solve the equation k − a = a for k.']
  },
  'II-R': {
    text: 'Justify: why is k = 2a the only value for which the line touches the parabola at A? And why did we exclude the vertical line x = a — how many common points does it have with the parabola, and does it touch it?',
    reveal: 'For any k ≠ 2a the second root x = k − a differs from a, and the line crosses the parabola at two points — so k = 2a is unique. The vertical line x = a has one common point with the parabola, but it crosses the parabola and its equation cannot be written in the form y = a² + k(x − a); that is why we look for the tangent among non-vertical lines.',
    ladder: ['Take k = 2a + 1. What is the second root x = k − a? Does it coincide with a?', 'How many common points do the vertical line x = 1 and y = x² have? Does the line stay on one side of the parabola or cross it?', 'Complete: k = 2a — one double root; k ≠ 2a — … roots. Vertical line — … point, but …'],
    answer: 'At x = a the second factor must vanish as well: a + a − k = 0, hence k = 2a.',
    $kw: t => /(second|factor|k\s*-\s*a|a\s*\+\s*a|2a|bracket|root)/.test(t) && /(unique|only|other|\btwo\b|vertical|intersect|cross|\bcuts?\b)/.test(t) && t.length >= 40,
    $kwPart: t => /(second|factor|k\s*-\s*a|unique|only one|vertical|intersect|cross)/.test(t)
  },
  'III-P1': {
    intro: 'We have obtained an algebraic description of the tangent to a parabola. Does the same idea work for a more complicated function?',
    text: 'P(x) = x³. Find k so that P(x) − [8 + k(x − 2)] is divisible by (x − 2)², i.e. so that the line y = 8 + k(x − 2) touches the graph of x³ at the point A(2, 8).',
    'check.errors.0.follow': 'We obtained k = 2a = 4 for y = x². Here the function is x³. Check: x³ − 8 − 4(x − 2) = (x − 2)(x² + 2x + 4 − 4). Is the second bracket divisible by (x − 2)?',
    'check.errors.1.follow': '8 is the y-coordinate of the point A, not the slope. Form x³ − 8 − k(x − 2) and factorise it.',
    'check.errors.2.follow': 'Substitute k = 6: x³ − 8 − 6(x − 2) = (x − 2)(x² + 2x + 4 − 6). Substitute x = 2 into the second bracket. Does it give zero?',
    reveal: 'x³ − 8 − k(x − 2) = (x − 2)(x² + 2x + 4 − k). For (x − 2)² to be a divisor, x = 2 must also be a root of the second bracket: 4 + 4 + 4 − k = 0, k = 12. Tangent: y = 12x − 16.',
    ladder: ['x³ − 8 = (x − 2)(x² + 2x + 4). Then x³ − 8 − k(x − 2) = (x − 2)(…). Fill in the bracket.', 'For divisibility by (x − 2)², the second bracket must also be divisible by (x − 2). By Bézout’s theorem, what must happen at x = 2?', 'Substitute x = 2 into the expression x² + 2x + 4 − k and set it equal to zero.']
  },
  'III-P2': {
    text: 'The line y = 12x − 16 touches the graph of x³ at the point A(2, 8). How many common points does this tangent have with the graph of x³?',
    'check.errors.0.follow': 'Solve x³ = 12x − 16. We know that x³ − 12x + 16 is divisible by (x − 2)². What remains after the division, and what is its root?',
    'check.errors.1.follow': 'x = 2 is a double root — is that one point or two? Count the distinct points.',
    reveal: 'x³ − 12x + 16 = (x − 2)²(x + 4). The roots are x = 2 (double — tangency) and x = −4 (crossing). The tangent has two common points with the graph: (2, 8) and (−4, −64).',
    ladder: ['Form x³ = 12x − 16 and move everything to one side.', 'x³ − 12x + 16 = (x − 2)²(x + 4). Check by expanding the brackets.', 'Which roots do (x − 2)² and (x + 4) give? How many distinct points are there?']
  },
  'III-R1': {
    text: 'For the parabola, “one common point” and “a double root” meant the same thing. After the example of x³, which of the two can serve as a general definition of a tangent, and why?',
    'check.errors.0.follow': 'How many common points did the tangent y = 12x − 16 to x³ have with the graph? Does this agree with your criterion?',
    reveal: 'The double-root criterion works as a general definition: (x − a)² divides P(x) − [P(a) + k(x − a)]. “One common point” does not work — the tangent to x³ at a = 2 also crosses the graph at x = −4.',
    ladder: ['How many common points did the tangent to x³ at a = 2 have?', 'What was the multiplicity of the root x = 2 of x³ − 12x + 16? And of x = −4?', 'Which property was preserved in both examples — for the parabola and for x³?'],
    $kw: t => /(double|repeated|multiplicit|\(x\s*-\s*a\)\^\(2\)|\(x\s*-\s*2\)\^\(2\))/.test(t) && /(\bnot\b|\bno\b|second|intersect|cross|-\s*4|\btwo\b|other|enough|sufficient|only (for )?(the )?parabola)/.test(t),
    $kwPart: t => /(double|repeated|multiplicit)/.test(t),
    $re: { 0: /^\s*["“'‘]?(one common|one point|a single (common )?point|one intersection)/ }
  },
  'III-P3': {
    text: 'Find k(a) for the function P(x) = x³ at an arbitrary point a. Use x³ − a³ = (x − a)(x² + ax + a²).',
    'check.follow': 'Check your expression for a = 2: in the previous problem we found k = 12. Does it match?',
    'check.errors.0.follow': '2a is the rule for x². Check for a = 2: for x³ we found k = 12. What does 2a give?',
    'check.errors.1.follow': 'Check for a = 2: in the previous problem we found k = 12. What does your expression give? Substitute x = a into every term of x² + ax + a².',
    'check.errors.2.follow': 'Check for a = 2: k should be 12. What does 3a give?',
    reveal: 'x³ − a³ − k(x − a) = (x − a)(x² + ax + a² − k). x = a must also be a root of the second bracket: a² + a² + a² − k = 0, so k(a) = 3a². Check: a = 2 → 12.',
    ladder: ['x³ − a³ − k(x − a) = (x − a)(x² + ax + a² − k). Which bracket must be divisible by (x − a) once more?', 'By Bézout’s theorem, x² + ax + a² − k is divisible by (x − a) if x = a is its root. Substitute x = a.', 'a² + a·a + a² − k = 0. Solve for k.']
  },
  'III-D1': {
    text: 'In general: by Bézout’s theorem P(x) − P(a) = (x − a)·R(x), where R is a polynomial. Then P(x) − P(a) − k(x − a) = (x − a)(R(x) − k). What must k be for (x − a)² to divide this expression? Write it in terms of R and explain why such a k is unique.',
    reveal: 'k = R(a). (x − a)² divides (x − a)(R(x) − k) if and only if (x − a) divides R(x) − k, i.e. (by Bézout’s theorem) R(a) − k = 0. This equality determines k uniquely. For x², R(x) = x + a and k = 2a; for x³, R(x) = x² + ax + a² and k = 3a².',
    ladder: ['For (x − a)² to divide (x − a)(R(x) − k), by what must R(x) − k be divisible?', 'By Bézout’s theorem, R(x) − k is divisible by (x − a) when x = a is its root. Substitute x = a.', 'R(a) − k = 0. How many values of k satisfy this equality?'],
    $kw: t => /r[a_]?\s*\(\s*a\s*\)/.test(t) && /(unique|only|\bone\b|single|bezout|bézout|root|zero|=\s*0)/.test(t)
  },
  'III-D2': {
    text: 'To every a we assigned a unique number k(a). Why is the correspondence a ↦ k(a) a function? What would you call it? Write down this function for y = x² and for y = x³.',
    reveal: 'Every a corresponds to one and only one k(a) (the tangent is unique), so a ↦ k(a) is a function. We call it the derivative function of the original function: (x²)′ = 2x, (x³)′ = 3x².',
    ladder: ['Recall the definition of a function (the very first question).', 'How many values k(a) correspond to each a? Why?', 'For x², k(a) = 2a; for x³, k(a) = 3a². What should we call the new function that is “derived” from the old one?'],
    $kw: t => /function/.test(t) && /(unique|every|each|exactly one|\bone\b|single)/.test(t) && /(2a|3a)/.test(t),
    $kwPart: t => /(function|derivative)/.test(t)
  },
  'III-P4': {
    text: 'x² → 2a, x³ → 3a². Make a conjecture and check it algebraically: what is k(a) for the function P(x) = x⁴? (x⁴ − a⁴ = (x − a)(x³ + ax² + a²x + a³))',
    'check.follow': 'Check for a = 1: R(x) = x³ + x² + x + 1, R(1) = ? Does it match your answer?',
    'check.errors.0.follow': 'Check for a = 1: R(x) = x³ + x² + x + 1, R(1) = ? Does it match your answer for a = 1? Now for a = 2.',
    'check.errors.1.follow': 'How many terms are there in the bracket x³ + ax² + a²x + a³? What does each of them equal at x = a?',
    'check.errors.2.follow': 'Substitute x = a into every term of x³ + ax² + a²x + a³. How many a³ did you get?',
    reveal: 'R(x) = x³ + ax² + a²x + a³; at x = a all four terms equal a³, so k(a) = R(a) = 4a³. The pattern: (xⁿ)′ = n·xⁿ⁻¹.',
    ladder: ['k(a) = R(a), where R(x) = x³ + ax² + a²x + a³. Substitute x = a.', 'How many terms are there in the bracket, and what does each equal at x = a?']
  },
  'III-R2': {
    text: 'Look back over the whole path: from the double root to the tangent and to the derivative function. At which step did you have to think the most? What helped you — the slider/graph, factorising, Bézout’s theorem or a concrete example? And how did you check that your k was correct?',
    'ladder.1': 'What did you do when it got difficult: use the slider, factorise, try a small example?',
    'ladder.2': 'How did you check k? For example, did you substitute a = 3 into the general formula and compare with k = 6?'
  },
  F1: {
    intro: '<b>Final independent check.</b> There are no hints here any more — one attempt per question. The result will appear in the report and show how far the knowledge you built is your own.',
    text: 'f(x) = x² + 3x. Find the slope k of the tangent at the point a = 1.',
    reveal: 'x² + 3x − 4 − k(x − 1) = (x − 1)(x + 4 − k); x = 1 is a double root ⇔ k = 5. Or by the rules: f′(a) = 2a + 3, f′(1) = 5.'
  },
  F2: {
    text: 'Write down the derivative function k(a) of f(x) = x² + 3x.',
    reveal: 'f(x) − f(a) = (x − a)(x + a + 3), so k(a) = R(a) = 2a + 3.'
  },
  F3: {
    text: 'Is the line y = 4x − 4 a tangent to the parabola y = x²? If so, at which point? Justify your answer.',
    reveal: 'Yes: x² − (4x − 4) = x² − 4x + 4 = (x − 2)². x = 2 is a double root, so the line touches the parabola at the point (2, 4).',
    $kw: t => /(yes|tangent|touch|it is)/.test(t) && /(\(x\s*-\s*2\)\^\(2\)|x\s*=\s*2|\(\s*2\s*[;,]|a\s*=\s*2|double|repeated|2a\s*=\s*4)/.test(t),
    $kwPart: t => /(x\s*-\s*2|double|repeated|x\s*=\s*2|\(\s*2\s*[;,])/.test(t),
    $re: { 0: /^\s*(no\b|not\b|it is not|it isn'?t)/ }
  },
  F4: {
    text: 'How would you check your answer to F1 in a second, independent way? Describe it concretely.',
    reveal: 'For example: the tangent is y = 4 + 5(x − 1) = 5x − 1; x² + 3x − (5x − 1) = x² − 2x + 1 = (x − 1)² — a double root, so k = 5 is correct.',
    $kw: t => /(factor|double|repeated|substitut|plug|rule|2a\s*\+\s*3|bezout|bézout|x\s*-\s*1|graph|slider|\)\^\(2\))/.test(t) && t.length >= 30
  }
};
