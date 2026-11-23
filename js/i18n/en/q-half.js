'use strict';
/* English · half-derivative (Georgian source: OFFLINE_BANKS.half) */
EN.q.half = {
  P1: {
    skill: 'Differentiating a power',
    intro: 'First, let us recall the knowledge on which the construction of the half-derivative will rest.',
    text: 'Find the derivative: (x³)′ = ?',
    'check.errors.0.follow': 'Power rule: (xⁿ)′ = n·xⁿ⁻¹. Which coefficient must stand in front of x²?',
    'check.errors.1.follow': 'Does the exponent change when we differentiate? (xⁿ)′ = n·x^? ',
    reveal: '(x³)′ = 3x²: the exponent moves to the front and decreases by 1. In general (x^β)′ = β·x^{β−1}.',
    ladder: ['Recall the rule (xⁿ)′ = n·xⁿ⁻¹.', 'Here n = 3. What moves to the front?']
  },
  P2: {
    skill: 'Repeated differentiation',
    text: 'D denotes the differentiation operator: D f = f′. Find D(D x³).',
    'check.errors.0.follow': 'D(D x³) means: first differentiate x³, then differentiate the result once more. What is (3x²)′?',
    reveal: 'D x³ = 3x², D(3x²) = 6x. Hence D(D x³) = D²x³ = 6x.',
    ladder: ['First find D x³.', 'Now differentiate the result, 3x².']
  },
  P3: {
    skill: 'Adding the orders of operators',
    text: 'D²∘D³ means: first differentiate three times, then twice more. D²∘D³ = D^? — write the exponent.',
    'check.errors.0.follow': 'D²∘D³: three times, then twice. How many times do we differentiate in total? Do the exponents multiply or add?',
    reveal: 'D²∘D³ = D⁵: the orders add, Dᵐ∘Dⁿ = D^{m+n}. This “law of adding orders” is the key idea: if ½ + ½ = 1, then D^{1/2}∘D^{1/2} should be D.',
    ladder: ['How many times do we differentiate in total?', '3 + 2 or 3 · 2?', 'The exponent of D⁵ is …']
  },
  P4: {
    skill: 'Powers with fractional exponents',
    text: 'Simplify: `x^{5/2}` ÷ `x^{1/2}` (x > 0).',
    'check.errors.0.follow': 'When dividing powers, are the exponents subtracted or divided? 5/2 − 1/2 = ?',
    'check.errors.1.follow': 'When dividing powers, the exponents are subtracted. 5/2 − 1/2 = ?',
    reveal: 'x^{5/2} ÷ x^{1/2} = x^{5/2 − 1/2} = x². Half-integer exponents are subtracted and added as usual.',
    ladder: ['Recall: xᵃ ÷ xᵇ = x^{a−b}.']
  },
  P5: {
    skill: 'Evaluating a fractional power',
    text: 'Compute `4^{3/2}`.',
    'check.errors.0.follow': '4^{3/2} = (√4)³. What is √4, and then its cube?',
    'check.errors.1.follow': '4^{3/2} = (√4)³. √4 = 2 — now cube it.',
    ladder: ['x^{3/2} = (√x)³. What is √4?', 'Now 2³ = ?', 'Check: 8 = 4·√4?']
  },
  P6: {
    skill: 'Double factorial',
    text: 'The double factorial n!! is the product of the numbers of the same parity: n(n − 2)(n − 4)…. Compute 6!! and 5!!.',
    'check.errors.0.follow': '720 = 6! (the product of all the numbers). Only even numbers occur in 6!!: 6·4·2 = ?',
    reveal: '6!! = 6·4·2 = 48, 5!! = 5·3·1 = 15. Note: 6!! · 5!! = 6! = 720.',
    ladder: ['Which numbers occur in 6!!: 6, 4, 2 or 6, 5, 4, …?', '6·4·2 = ? And 5·3·1 = ?', 'Check: 48 · 15 = 6! ?']
  },
  'I-D': {
    intro: '<b>Lecturer’s introduction.</b> D² means differentiating twice, Dᵐ∘Dⁿ = D^{m+n}. A student asked: does it make sense to differentiate “half a time”? Let us try to construct such an operator ourselves — without integrals or limits. We denote it H = D^{1/2}.',
    text: 'What property must the operator H = `D^{1/2}` have for us to call it a “half-derivative”? Write it in the language of operators.',
    reveal: 'Applied twice, H must give the ordinary derivative: H∘H = D, i.e. H(H f) = f′. This follows directly from the law of adding orders: ½ + ½ = 1.',
    ladder: ['For D², D is applied twice and D² results. What should result from applying H twice?', 'By the law of adding orders, D^{1/2}∘D^{1/2} = D^{1/2 + 1/2} = ?', 'Write: H(H f) = …'],
    $kw: t => /(twice|two times|in succession|h\s*\(\s*h|h\s*[∘o*·]\s*h|h\^\(?2|1\/2.*1\/2|½.*½)/.test(t) && /(=\s*d|derivativ|differentiat|d\s*f|f'|f′)/.test(t),
    $kwPart: t => /(twice|\bh\b|derivativ|1\/2|½)/.test(t)
  },
  'I-P1': {
    text: 'D x³ = 3x²: differentiation lowers the exponent by 1. If applying H twice lowers the exponent by 1, by how much must one application of H lower it?',
    'check.errors.0.follow': 'If one application of H lowers it by 1, by how much will H∘H lower it? Does that match D?',
    reveal: 'By ½: two equal steps together must give 1. So we assume H x^β = c(β)·x^{β−1/2}.',
    'ladder.0': 'Two equal steps together give 1. What is one step?',
    'ladder.2': 'Check: 3 − ½ − ½ = 2?',
    $alt: t => /(half|½|1\s*\/\s*2|0[.,]5)/.test(t)
  },
  'I-P2': {
    intro: '<b>Basic assumption.</b> H x^β = c(β)·x^{β−1/2}, where c(β) is a coefficient still unknown; H is linear (it acts term by term on a sum).',
    text: 'Under this assumption H `x^3` = c(3)·x^?. Write the exponent.',
    'check.errors.0.follow': 'H lowers the exponent by ½, not by 1. 3 − ½ = ?',
    'ladder.0': 'The exponent decreases by ½.'
  },
  'I-P3': {
    text: 'What happens to a constant? 1 = x⁰, so H 1 = c(0)·x^?. Write the exponent.',
    'check.errors.0.follow': 'Ordinarily D 1 = 0. But by our assumption H lowers the exponent by ½: 0 − ½ = ?',
    reveal: 'H 1 = c(0)·x^{−1/2}. The half-derivative of a constant is not zero! So we extend the space by x^{−1/2}.',
    'ladder.0': '1 = x⁰. The exponent is 0.',
    'ladder.2': 'You can write it as −1/2.',
    $alt: t => /(-\s*1\s*\/\s*2|-\s*0[.,]5|-\s*½|minus\s*(?:a\s*|one\s*)?half|negative\s*(?:one\s*)?half)/.test(t)
  },
  'I-R': {
    text: 'Is the assumption “H lowers the exponent by ½” a proven fact or our own choice (a hypothesis)? How can we check that it does not lead to a contradiction?',
    reveal: 'It is an assumption (a hypothesis), not a proven fact. We check it like this: we require H(H x^β) = D x^β for every monomial and see whether suitable coefficients c(β) exist. If they do, the construction is not contradictory.',
    ladder: ['In mathematics, what do we call a supposition that we have not yet proved?', 'Which condition must H satisfy? (I-D)', 'If we compute H(H x^β) and compare it with D x^β, what will we find out?'],
    $kw: t => /(assum|hypothes|convention|choice|chose|choose|requir|ansatz|postulat|suppos)/.test(t) && /(check|verif|test|h\s*\(\s*h|twice|=\s*d|derivativ|match|coincid|agree)/.test(t),
    $kwPart: t => /(assum|hypothes|suppos|choice|chose|check|verif|twice)/.test(t)
  },
  'II-P1': {
    text: 'Using the assumption, compute H(H `x^3`). Write the answer in terms of the coefficients c.',
    'check.errors.0.follow': '3x² is what we should obtain. Now compute H(H x³) step by step: first H x³ = c(3)·x^{5/2}, then apply H to this result.',
    reveal: 'H x³ = c(3)·x^{5/2}; H(c(3)·x^{5/2}) = c(3)·c(5/2)·x². Hence H(H x³) = c(3)c(5/2)·x².',
    ladder: ['First: H x³ = c(3)·x^{5/2}.', 'Now H acts on x^{5/2}: H x^{5/2} = c(5/2)·x^?', 'Multiply: c(3)·c(5/2)·x^2.']
  },
  'II-P2': {
    text: 'H(H `x^3`) must equal D x³ = 3x², so c(3)·c(5/2) = 3. In general: c(β)·c(β − ½) = ?',
    'check.errors.0.follow': 'β − 1 is the exponent in x^{β−1}. D x^β = β·x^{β−1}: which coefficient stands in front of x?',
    'check.errors.1.follow': 'Check for β = 3: c(3)·c(5/2) must be 3. What does your answer give?',
    reveal: 'H(H x^β) = c(β)c(β − ½)·x^{β−1}, and D x^β = β·x^{β−1}. Equating the coefficients: c(β)·c(β − ½) = β — this is the basic recurrence.',
    ladder: ['For β = 3 you obtained c(3)c(5/2) = 3. How is 3 related to the exponent?', 'D x^β = β·x^{β−1}. What is the coefficient?', 'H(H x^β) = c(β)c(β − ½)·x^{β−1} = β·x^{β−1}. Hence c(β)c(β − ½) = …']
  },
  'II-D': {
    text: 'The recurrence c(β)·c(β − ½) = β expresses one coefficient in terms of another. Can it determine c(0) by itself? What do we need in order to find all c(β)?',
    reveal: 'No: the recurrence only links neighbouring coefficients. We need one initial value c(0) = c₀ ≠ 0, which for now is free. All c(n) and c(n − ½) are determined from it.',
    ladder: ['For β = ½: c(½)·c(0) = ½. Can you find both from this?', 'How many unknowns are there, and how many equations?', 'If we give c(0) some value, is the rest determined?'],
    $kw: t => /(initial|starting|first|c\s*\(\s*0\s*\)|c0|one value|given|choose|chosen|free|convention)/.test(t) && /(\bno\b|\bnot\b|cannot|can'?t|need|must|requir|have to)/.test(t),
    $kwPart: t => /(initial|starting|c\s*\(\s*0|c0|free)/.test(t)
  },
  'II-P3': {
    intro: 'Let c(0) = c₀ (c₀ ≠ 0). For now it is a free parameter.',
    text: 'For β = ½ the recurrence gives c(½)·c(0) = ½. Express c(½) in terms of c₀.',
    'check.errors.0.follow': 'Your expression reads as ½·c₀. Substitute: does (½·c₀)·c₀ = ½ hold? If you meant 1/(2c₀), write it with brackets.',
    'check.errors.1.follow': 'Substitute your answer into c(½)·c₀ = ½. Does it hold?',
    ladder: ['c(½)·c₀ = ½. Which operation gives c(½)?', 'Divide both sides by c₀.']
  },
  'II-P4': {
    text: 'For β = 1: c(1)·c(½) = 1. Find c(1) in terms of c₀.',
    'check.errors.0.follow': 'That is c(½). c(1) = 1 ÷ c(½) = 1 ÷ (1/(2c₀)) = ?',
    'check.errors.1.follow': 'Substitute your answer into c(1)·c(½) = 1, where c(½) = 1/(2c₀). Does it hold?',
    'ladder.1': 'c(½) = 1/(2c₀). Dividing by a fraction = multiplying by its reciprocal.'
  },
  'II-P5': {
    text: 'Continue: c(3/2)·c(1) = 3/2 and c(2)·c(3/2) = 2. Find c(2) in terms of c₀.',
    'check.follow': 'Check step by step: first c(3/2) = (3/2) ÷ c(1) = (3/2) ÷ (2c₀). Then c(2) = 2 ÷ c(3/2).',
    'check.errors.0.follow': '“Doubling at every step” is only a guess. Compute step by step: c(3/2) = (3/2) ÷ (2c₀) = ?, then c(2) = 2 ÷ c(3/2).',
    'check.errors.1.follow': 'That is c(3/2). Now c(2) = 2 ÷ c(3/2) = ?',
    ladder: ['First find c(3/2) = (3/2) ÷ c(1).', 'c(3/2) = 3/(4c₀). Now c(2) = 2 ÷ c(3/2).']
  },
  'II-R': {
    text: 'Compare: c(0) = c₀, c(1) = 2c₀, c(2) = 8c₀/3, while c(½) = 1/(2c₀), c(3/2) = 3/(4c₀). What do you notice: how does c₀ enter the coefficients for integer and for half-integer exponents? And what happens to c₀ when we apply H twice?',
    reveal: 'For integer exponents c(n) ∼ c₀, for half-integer ones c(n − ½) ∼ 1/c₀. In H∘H one factor of each kind always meets the other, so c₀ cancels: D = H∘H does not depend on c₀, although the intermediate function H f does.',
    ladder: ['Where does c₀ stand in c(1): in the numerator or the denominator? And in c(3/2)?', 'Multiply c(2)·c(3/2). What is left of c₀?', 'If c₀ cancels in every product, does H∘H = D depend on c₀?'],
    $kw: t => /(multipl|divid|denominator|numerator|1\/c|reciprocal|invers|below|above|bottom|\btop\b)/.test(t) && /(cancel|disappear|vanish|drops? out|independent|does ?n[o']?t depend|not depend)/.test(t),
    $kwPart: t => /(multipl|denominator|cancel|disappear|vanish)/.test(t)
  },
  'III-P1': {
    text: 'Using the recurrence twice, find the ratio c(n) : c(n − 1). (Hint: c(n) = n ÷ c(n − ½), c(n − ½) = (n − ½) ÷ c(n − 1).)',
    'check.follow': 'Check for n = 1: c(1) : c(0) = 2c₀ : c₀ = 2. What does your expression give for n = 1?',
    'check.errors.0.follow': 'Check for n = 1: c(1) : c(0) = 2. What does your expression give?',
    'check.errors.1.follow': 'Check for n = 1: c(1) : c(0) must be 2. What about your expression?',
    'check.errors.2.follow': 'That is the right idea! Multiply both the numerator and the denominator by 2 — how is it written with whole numbers?',
    reveal: 'c(n) = n ÷ c(n − ½) = n · c(n − 1) ÷ (n − ½), so c(n) : c(n − 1) = n/(n − ½) = 2n/(2n − 1).',
    ladder: ['Substitute the second equality into the first: c(n) = n ÷ [(n − ½) ÷ c(n − 1)].', 'c(n) = n·c(n − 1)/(n − ½). What is the ratio?', 'n/(n − ½): multiply the numerator and the denominator by 2.']
  },
  'III-P2': {
    text: 'Use c(n) = c(n − 1)·2n/(2n − 1) and c(2) = 8c₀/3. Find c(3).',
    'check.errors.0.follow': 'The ratio for n = 3: 2·3/(2·3 − 1) = 6/5. Multiply c(2) = 8c₀/3 by this ratio.',
    'check.errors.1.follow': 'The ratio also has a denominator: 2n/(2n − 1) = 6/5.',
    'ladder.0': 'For n = 3 the ratio = 6/5.',
    'ladder.2': 'Simplify 48/15.'
  },
  'III-D1': {
    text: 'c(1) = c₀·2/1, c(2) = c₀·(2·4)/(1·3), c(3) = c₀·(2·4·6)/(1·3·5). Explain why in general c(n) = c₀·(2n)!!/(2n − 1)!!.',
    reveal: 'c(n) = c₀ · (2/1)·(4/3)·…·(2n/(2n − 1)). The numerators give the product of the even numbers — (2n)!!, the denominators that of the odd numbers — (2n − 1)!!. Hence c(n) = c₀·(2n)!!/(2n − 1)!!.',
    'ladder.1': 'Every ratio is 2k/(2k − 1). Which numbers accumulate in the numerator?',
    'ladder.2': '2·4·…·2n = (2n)!!, and 1·3·…·(2n − 1) = ?',
    $kw: t => /(ratio|2n\s*\/\s*\(?2n\s*-\s*1|product|chain|successiv|multipl)/.test(t) && /(!!|even|odd|double)/.test(t),
    $kwPart: t => /(!!|even|odd|ratio|product)/.test(t)
  },
  'III-D2': {
    intro: 'The product of two ratios — A<sub>n</sub> = (2n)!!/(2n − 1)!! and B<sub>n</sub> = (2n)!!/(2n + 1)!! — is the Wallis product W<sub>n</sub> = ∏ 4k²/(4k² − 1), and W<sub>n</sub> → π/2. π appears structurally, but it does not fix c₀.',
    text: 'c₀ is determined neither by the recurrence nor by the Wallis product. On what basis do we choose c₀ = 1/√π? Is it a necessity or a convention? (Use the graph: change c₀ and watch H f and D f.)',
    reveal: 'It is a convention, not a necessity: the construction allows any c₀ ≠ 0, and D = H∘H does not depend on it. We choose c₀ = 1/√π so that the result agrees with the classical Riemann–Liouville formula (with lower limit 0).',
    ladder: ['Change c₀ on the graph. Does D f change? And H f?', 'If D f does not change, does the construction force any particular value of c₀?', 'So what should guide our choice of c₀: agreement with a known classical formula?'],
    $kw: t => /(convention|agree|choice|chose|choose|conditional|normali[sz])/.test(t) && /(riemann|liouville|classic|coincid|match|agree|compatib|consistent|known|standard)/.test(t),
    $kwPart: t => /(convention|agree|choice|chose|riemann|classic)/.test(t)
  },
  'III-P3': {
    text: 'With the convention c₀ = 1/√π, find `D^{1/2}` x.',
    'check.follow': 'D^{1/2} x = c(1)·x^{1/2}, c(1) = 2c₀. Substitute c₀ = 1/√π.',
    'check.errors.0.follow': 'c(1) = 2c₀, not c₀. What coefficient do you get?',
    'check.errors.1.follow': 'c(1) = 2c₀. What is c₀ by our convention?',
    'check.errors.2.follow': 'c₀ = 1/√π, i.e. √π is in the denominator. Check.'
  },
  'III-P4': {
    text: 'Check the construction: `D^{1/2}`(2`x^{1/2}`/√π) = ? (c(½) = 1/(2c₀) = √π/2.)',
    'check.errors.0.follow': '(2/√π)·(√π/2) = ? Simplify.',
    reveal: 'D^{1/2}(2x^{1/2}/√π) = (2/√π)·c(½)·x⁰ = (2/√π)·(√π/2) = 1 = D x. The construction is consistent.',
    'ladder.2': 'Compare with D x.'
  },
  'III-P5': {
    text: 'D 1 = 0, while `D^{1/2}` 1 = c₀·`x^{−1/2}`. Then `D^{1/2}`(`D^{1/2}` 1) must be 0. The recurrence for β = 0: c(0)·c(−½) = 0. What is c(−½)?',
    'check.errors.0.follow': 'c₀ ≠ 0 — otherwise D^{1/2} 1 = 0 and c(½) = 1/(2c₀) could not be defined. Which factor remains?',
    reveal: 'Since c₀ ≠ 0, c(−½) = 0. So D^{1/2} x^{−1/2} = 0 and D^{1/2}(D^{1/2} 1) = 0 = D 1. This is the only zero coefficient.',
    'ladder.0': 'A product is zero when one of its factors is zero.',
    'ladder.2': 'So c(−½) = ?'
  },
  'III-P6': {
    text: 'H is linear. With c₀ = 1/√π, find `D^{1/2}`(x² + x). (`D^{1/2}` x² = 8`x^{3/2}`/(3√π).)',
    'check.errors.0.follow': 'Linearity: D^{1/2}(x² + x) = D^{1/2}x² + D^{1/2}x. Where is the second term?',
    'ladder.0': 'By linearity: D^{1/2}x² + D^{1/2}x.',
    'ladder.2': 'Add the two together.'
  },
  'III-R': {
    text: 'Look back over the whole path: from the student’s question to the recurrence, the double factorials and c₀. At which step did you have to think the most? What helped you — a concrete example, a ratio, the graph? And how did you check that your coefficients were correct?',
    'ladder.1': 'What did you do: try a concrete n, compute a ratio, use the graph?',
    'ladder.2': 'How did you check? For example, did you apply H twice and compare with D?'
  },
  F1: {
    intro: '<b>Final independent check.</b> There are no hints here any more — one attempt per question. The result will appear in the report.',
    text: 'With c₀ = 1/√π, find `D^{1/2}` x³.',
    reveal: 'c(3) = c₀·(2·4·6)/(1·3·5) = 16c₀/5, so D^{1/2}x³ = 16x^{5/2}/(5√π).'
  },
  F2: {
    text: 'Check: `D^{1/2}`(`D^{1/2}` x³) = ?',
    reveal: 'c(3)·c(5/2) = 3, so D^{1/2}(D^{1/2}x³) = 3x² = D x³.'
  },
  F3: {
    text: 'Find the half-integer coefficient c(5/2) if c₀ = 1/√π.',
    reveal: 'c(5/2) = 3 ÷ c(3) = 3 ÷ (16/(5√π)) = 15√π/16. Or by the formula c(n − ½) = (2n − 1)!!/(2c₀(2n − 2)!!) with n = 3.'
  },
  F4: {
    reveal: 'For example: apply D^{1/2} once more and check that the result is 3x² = D x³; or recompute c(3) by the chain of ratios.',
    $kw: t => /(twice|once more|again|second time|h\s*\(\s*h|d\^?\(?1\/2|recurrence|3x|c\s*\(\s*3\s*\).*c\s*\(\s*5|product|ratio|!!)/.test(t) && t.length >= 30
  }
};
