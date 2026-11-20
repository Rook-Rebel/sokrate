'use strict';
/*
 * Kapanadze AI Socrates — question bank and labels.
 *
 * Research content: do not edit questions, solutions, ids, stages, components or
 * expected values without agreeing a new item version. Exported CSV files and
 * archived sessions refer to questions by topic + id.
 *
 * Fields: id, stage (P | I | II | III | F), comp (pre | decl | proc | pers),
 * text, solution, kind (num | range | formula | expr | text | reflect),
 * expect (num), min/max (range), aliases (formula).
 */

const BANK = {
  "ap": [
    {"id":"P1","stage":"P","comp":"pre","text":"In the sequence 2, 5, 8, 11, … what is the relationship between consecutive terms?","solution":"Each term exceeds the previous term by 3.","kind":"num","expect":[3]},
    {"id":"P2","stage":"P","comp":"pre","text":"Which number comes next: 2, 5, 8, 11, … ?","solution":"14.","kind":"num","expect":[14]},
    {"id":"P3","stage":"P","comp":"pre","text":"If a = 4 and b = 3, calculate a + 5b.","solution":"19.","kind":"num","expect":[19]},
    {"id":"P4","stage":"P","comp":"pre","text":"Solve the equation 3x + 5 = 20.","solution":"x = 5.","kind":"num","expect":[5]},
    {"id":"P5","stage":"P","comp":"pre","text":"For y = 2x + 1, find y when x = 3.","solution":"y = 7.","kind":"num","expect":[7]},
    {"id":"I-D","stage":"I","comp":"decl","text":"Observe 4, 7, 10, 13, 16, … . Describe in your own words how one term changes into the next.","solution":"Each term is 3 larger; the common difference is constant.","kind":"text"},
    {"id":"I-P","stage":"I","comp":"proc","text":"For the sequence 3, 6, 9, 12, … find the common difference d and the sixth term a₆.","solution":"d = 3 and a₆ = 18.","kind":"num","expect":[3,18]},
    {"id":"I-R","stage":"I","comp":"pers","text":"A student says, “An arithmetic progression always increases.” Do you agree? Test 20, 17, 14, 11, … and explain your check.","solution":"No: the common difference can be negative, as in 20, 17, 14, 11 (d = −3).","kind":"text"},
    {"id":"II-D","stage":"II","comp":"decl","text":"What does d represent in an arithmetic progression? Can d be negative or zero? Give examples.","solution":"d = aₙ₊₁ − aₙ; it can be negative or zero (for example 5, 5, 5).","kind":"text"},
    {"id":"II-P1","stage":"II","comp":"proc","text":"For 4, 7, 10, … find a₁₀₀ without listing all preceding terms.","solution":"a₁₀₀ = 4 + 99·3 = 301.","kind":"num","expect":[301]},
    {"id":"II-P2","stage":"II","comp":"proc","text":"If the first term is a₁ and the common difference is d, express aₙ using only a₁, d and n.","solution":"aₙ = a₁ + (n − 1)d.","kind":"formula","aliases":["a1+(n-1)d","a_1+(n-1)d","a₁+(n-1)d","a₁+d(n-1)"]},
    {"id":"II-R","stage":"II","comp":"pers","text":"A student writes aₙ = a₁ + nd. Is this correct? How would you test it?","solution":"No: at n = 1 it incorrectly gives a₁ + d, rather than a₁ (unless d = 0).","kind":"text"},
    {"id":"III-D","stage":"III","comp":"decl","text":"Explain why the formula uses n − 1 rather than n.","solution":"There are n − 1 transitions from term 1 to term n.","kind":"text"},
    {"id":"III-D2","stage":"III","comp":"decl","text":"Consider the points (1, 4), (2, 7), (3, 10), (4, 13). On what kind of graph do they lie, and what does d represent?","solution":"The points lie on a straight line; d = 3 is its slope when n is the horizontal coordinate.","kind":"text"},
    {"id":"III-P","stage":"III","comp":"proc","text":"In an arithmetic progression, a₄ = 17 and a₁₀ = 35. Find d and a₁.","solution":"a₁₀ − a₄ = 6d = 18, so d = 3 and a₁ = 8.","kind":"num","expect":[3,8]},
    {"id":"III-P2","stage":"III","comp":"proc","text":"A stadium has 18 seats in the first row and three more seats in each subsequent row. How many seats are in row 20?","solution":"18 + 19·3 = 75 seats.","kind":"num","expect":[75]},
    {"id":"III-R","stage":"III","comp":"pers","text":"Reflect on this dialogue: which step was hardest, what helped (numbers, a table, a graph or a formula), and how did you check your answers?","solution":"Identify a difficult step, the strategy that helped, and a concrete check of your result.","kind":"reflect"}
  ],
  "derivative": [
    {"id":"P1","stage":"P","comp":"pre","text":"Recall the definition of a function: how many y-values correspond to each x in its domain?","solution":"Exactly one output y for each input x in the domain.","kind":"num","expect":[1]},
    {"id":"P2","stage":"P","comp":"pre","text":"For y = x², find y when x = −3.","solution":"(−3)² = 9.","kind":"num","expect":[9]},
    {"id":"P3","stage":"P","comp":"pre","text":"When does ax² + bx + c = 0 have one repeated real root? State the value of its discriminant D.","solution":"The discriminant is D = b² − 4ac = 0.","kind":"num","expect":[0]},
    {"id":"P4","stage":"P","comp":"pre","text":"How many distinct points does the parabola y = x² share with the x-axis?","solution":"One distinct point, (0,0).","kind":"num","expect":[1]},
    {"id":"P5","stage":"P","comp":"pre","text":"In the line y = kx + b, which coefficient determines the slope? Write the symbol.","solution":"The coefficient k.","kind":"text"},
    {"id":"P6","stage":"P","comp":"pre","text":"Factorise x² − 9.","solution":"(x − 3)(x + 3).","kind":"expr"},
    {"id":"P7","stage":"P","comp":"pre","text":"Given that x = 2 is a root of x³ − 8, which linear factor divides x³ − 8 by the factor theorem?","solution":"The factor is (x − 2).","kind":"text"},
    {"id":"I-D","stage":"I","comp":"decl","text":"For an arbitrary line y = kx + b, how would you find its intersections with the parabola y = x²? Explain your method.","solution":"Solve x² = kx + b and count its real roots.","kind":"text"},
    {"id":"I-P1","stage":"I","comp":"proc","text":"How many distinct intersections do y = x² and y = x + 2 have?","solution":"Two distinct intersections, since x² − x − 2 = (x − 2)(x + 1).","kind":"num","expect":[2]},
    {"id":"I-P2","stage":"I","comp":"proc","text":"How many distinct intersections do y = x² and y = 2x − 1 have?","solution":"One distinct intersection; x² − 2x + 1 = (x − 1)².","kind":"num","expect":[1]},
    {"id":"I-P3","stage":"I","comp":"proc","text":"How many distinct intersections do y = x² and y = x − 1 have?","solution":"No real intersection; x² − x + 1 has discriminant −3.","kind":"num","expect":[0]},
    {"id":"I-R","stage":"I","comp":"pers","text":"Compare cases with two, one and no intersections. How does this relate to roots of x² = kx + b? When is the line tangent?","solution":"A double intersection root corresponds to tangency for the parabola; D = 0.","kind":"text"},
    {"id":"II-D","stage":"II","comp":"decl","text":"At A(a, a²) on the parabola, consider y = a² + k(x − a). Why does this line pass through A for every k, and what does k determine?","solution":"Substitute x = a; k is the line's slope.","kind":"text"},
    {"id":"II-P1","stage":"II","comp":"proc","text":"Find k such that y = 9 + k(x − 3) is tangent to y = x² at A(3, 9), meaning x = 3 is a double root.","solution":"k = 6; x² − 9 − 6(x − 3) = (x − 3)².","kind":"num","expect":[6]},
    {"id":"II-P2","stage":"II","comp":"proc","text":"Factorise x² − a² − k(x − a).","solution":"(x − a)(x + a − k).","kind":"expr"},
    {"id":"II-P3","stage":"II","comp":"proc","text":"Given (x − a)(x + a − k) = 0, what value of k makes x = a a double root? Express k in terms of a.","solution":"k = 2a.","kind":"expr"},
    {"id":"II-R","stage":"II","comp":"pers","text":"Explain why k = 2a is unique. Why do we exclude the vertical line x = a from this definition of tangency?","solution":"The second factor vanishes at x = a only when k = 2a. Vertical lines intersect at a point but do not satisfy this nonvertical algebraic tangency definition.","kind":"text"},
    {"id":"III-P1","stage":"III","comp":"proc","text":"For P(x) = x³, find k so that P(x) − [8 + k(x − 2)] is divisible by (x − 2)².","solution":"k = 12; x³ − 8 − 12(x − 2) = (x − 2)²(x + 4).","kind":"num","expect":[12]},
    {"id":"III-P2","stage":"III","comp":"proc","text":"The line y = 12x − 16 is tangent to y = x³ at A(2, 8). How many distinct intersections does this line have with the cubic?","solution":"Two distinct intersections: x = 2 (double), x = −4 (simple).","kind":"num","expect":[2]},
    {"id":"III-R1","stage":"III","comp":"pers","text":"For a cubic, why is a double-root criterion for tangency more useful than merely counting intersection points?","solution":"A tangent may meet a cubic at another distinct point; the local double-root factor is the defining property here.","kind":"text"},
    {"id":"III-P3","stage":"III","comp":"proc","text":"Find the general slope k(a) for P(x) = x³ using x³ − a³ = (x − a)(x² + ax + a²).","solution":"k(a) = 3a².","kind":"expr"},
    {"id":"III-D1","stage":"III","comp":"decl","text":"By the factor theorem, P(x) − P(a) = (x − a)R(x). What must k equal so that (x − a)² divides (x − a)[R(x) − k]? Why is k unique?","solution":"k = R(a), uniquely.","kind":"text"},
    {"id":"III-D2","stage":"III","comp":"decl","text":"Each a determines a unique number k(a). Why is a ↦ k(a) a function? Give it a name and state it for x² and x³.","solution":"The unique assignment a ↦ k(a) is the derivative function; 2a for x² and 3a² for x³.","kind":"text"},
    {"id":"III-P4","stage":"III","comp":"proc","text":"From x² ↦ 2a and x³ ↦ 3a², conjecture and verify algebraically the slope function for P(x) = x⁴.","solution":"k(a) = 4a³.","kind":"expr"},
    {"id":"III-R2","stage":"III","comp":"pers","text":"Reflect: from repeated roots to tangents and the derivative function, which step was most challenging? What helped, and how did you verify k?","solution":"Explain a genuine difficulty, strategy, and verification (for instance by checking divisibility by (x − a)²).","kind":"reflect"},
    {"id":"F1","stage":"F","comp":"proc","text":"For f(x) = x² + 3x, determine the tangent slope k at a = 1.","solution":"k(1) = 5.","kind":"num","expect":[5]},
    {"id":"F2","stage":"F","comp":"proc","text":"Write the derivative (slope) function k(a) of f(x) = x² + 3x.","solution":"k(a) = 2a + 3.","kind":"expr"},
    {"id":"F3","stage":"F","comp":"decl","text":"Is y = 4x − 4 tangent to y = x²? If so, at which point? Justify your answer.","solution":"Yes. At a = 2, the tangent is y = 4x − 4, since x² − (4x − 4) = (x − 2)².","kind":"text"},
    {"id":"F4","stage":"F","comp":"pers","text":"Describe a second, independent method to verify your answer to the first final question.","solution":"Verify by algebraic factorisation, computing R(a), or substitution into the double-root criterion.","kind":"text"}
  ],
  "half": [
    {"id":"P1","stage":"P","comp":"pre","text":"Find the ordinary derivative (x³)′.","solution":"3x².","kind":"expr"},
    {"id":"P2","stage":"P","comp":"pre","text":"If D denotes differentiation, calculate D(Dx³).","solution":"D(Dx³) = 6x.","kind":"expr"},
    {"id":"P3","stage":"P","comp":"pre","text":"D² ∘ D³ means first differentiate three times and then twice. Write D² ∘ D³ = D^? .","solution":"D⁵.","kind":"text"},
    {"id":"P4","stage":"P","comp":"pre","text":"Simplify x^(5/2) / x^(1/2), assuming x > 0.","solution":"x².","kind":"expr"},
    {"id":"P5","stage":"P","comp":"pre","text":"Calculate 4^(3/2).","solution":"8.","kind":"num","expect":[8]},
    {"id":"P6","stage":"P","comp":"pre","text":"Double factorial n!! multiplies integers of the same parity: n(n−2)(n−4)… . Calculate 6!! and 5!!.","solution":"6!! = 6·4·2 = 48; 5!! = 5·3·1 = 15.","kind":"num","expect":[48,15]},
    {"id":"I-D","stage":"I","comp":"decl","text":"What property should an operator H = D^(1/2) satisfy to be called a half-derivative? Express it using operator composition.","solution":"H ∘ H = D, on an explicitly specified admissible function class.","kind":"text"},
    {"id":"I-P1","stage":"I","comp":"proc","text":"Differentiation lowers the exponent of x³ by 1. If applying H twice lowers it by 1, by how much should one application of H lower it in our model?","solution":"One half (1/2).","kind":"num","expect":[0.5]},
    {"id":"I-P2","stage":"I","comp":"proc","text":"Assume H(x³) = c(3)x^? . What exponent does the model predict?","solution":"5/2.","kind":"num","expect":[2.5]},
    {"id":"I-P3","stage":"I","comp":"proc","text":"Since 1 = x⁰, write the exponent in H(1) = c(0)x^? .","solution":"−1/2.","kind":"num","expect":[-0.5]},
    {"id":"I-R","stage":"I","comp":"pers","text":"Is the assumption that H lowers an exponent by 1/2 already a theorem, or a construction choice? How can we check consistency?","solution":"It is an ansatz; test composition and the domain conditions.","kind":"text"},
    {"id":"II-P1","stage":"II","comp":"proc","text":"Apply H twice to x³ using H(x^β) = c(β)x^(β−1/2). Express the result using c(3) and c(5/2).","solution":"H(Hx³) = c(3)c(5/2)x².","kind":"text"},
    {"id":"II-P2","stage":"II","comp":"proc","text":"H(H(x³)) must equal Dx³ = 3x², so c(3)c(5/2) = 3. In general, what does c(β)c(β−1/2) equal?","solution":"c(β)c(β−1/2) = β, where the operator composition is defined.","kind":"expr"},
    {"id":"II-D","stage":"II","comp":"decl","text":"The recurrence relates two coefficients. Does it determine c(0) by itself? What else is needed?","solution":"No. A normalisation c₀ must be chosen; the recurrence alone does not fix its numerical value.","kind":"text"},
    {"id":"II-P3","stage":"II","comp":"proc","text":"At β = 1/2, c(1/2)c(0) = 1/2. Express c(1/2) in terms of c₀ = c(0).","solution":"c(1/2) = 1/(2c₀).","kind":"expr"},
    {"id":"II-P4","stage":"II","comp":"proc","text":"At β = 1, c(1)c(1/2) = 1. Express c(1) in terms of c₀.","solution":"c(1) = 2c₀.","kind":"expr"},
    {"id":"II-P5","stage":"II","comp":"proc","text":"Use c(3/2)c(1) = 3/2 and c(2)c(3/2) = 2 to express c(2) in terms of c₀.","solution":"c(3/2) = 3/(4c₀); c(2) = 8c₀/3.","kind":"expr"},
    {"id":"II-R","stage":"II","comp":"pers","text":"Compare c(0) = c₀, c(1) = 2c₀, c(2) = 8c₀/3, and c(1/2) = 1/(2c₀), c(3/2) = 3/(4c₀). What pattern do you notice?","solution":"Integer coefficients are proportional to c₀, half-integer coefficients to 1/c₀, so factors cancel under composition.","kind":"text"},
    {"id":"III-P1","stage":"III","comp":"proc","text":"Use the recurrence twice to derive the ratio c(n) / c(n−1).","solution":"c(n)/c(n−1) = 2n/(2n−1).","kind":"expr"},
    {"id":"III-P2","stage":"III","comp":"proc","text":"Given c(n) = c(n−1)·2n/(2n−1) and c(2) = 8c₀/3, find c(3).","solution":"c(3) = (16/5)c₀.","kind":"expr"},
    {"id":"III-D1","stage":"III","comp":"decl","text":"Explain why c(n) = c₀(2n)!!/(2n−1)!! for positive integers n.","solution":"Iterate c(n) = [2n/(2n−1)] c(n−1) to obtain the double-factorial formula.","kind":"text"},
    {"id":"III-D2","stage":"III","comp":"decl","text":"The recurrence does not fix c₀. Why select c₀ = 1/√π to match the Riemann–Liouville half-derivative? Is this forced or a normalisation?","solution":"Choosing c₀ = 1/√π is a normalisation matching the Riemann–Liouville convention; it is not forced by the recurrence.","kind":"text"},
    {"id":"III-P3","stage":"III","comp":"proc","text":"With c₀ = 1/√π, calculate D^(1/2)x.","solution":"D^(1/2)x = 2√x/√π.","kind":"expr"},
    {"id":"III-P4","stage":"III","comp":"proc","text":"Verify the composition: D^(1/2)[2x^(1/2)/√π] = ? .","solution":"D^(1/2)[2√x/√π] = 1.","kind":"expr"},
    {"id":"III-P5","stage":"III","comp":"proc","text":"Since D(1) = 0 and H(1) = c₀x^(−1/2), what must c(−1/2) equal on the stated composition domain?","solution":"c(−1/2) = 0, in the domain where this composition is imposed.","kind":"num","expect":[0]},
    {"id":"III-P6","stage":"III","comp":"proc","text":"Using linearity and c₀ = 1/√π, find D^(1/2)(x² + x).","solution":"D^(1/2)(x² + x) = 8x^(3/2)/(3√π) + 2√x/√π.","kind":"expr"},
    {"id":"III-R","stage":"III","comp":"pers","text":"Reflect on the construction from the student's question to the recurrence, double factorials and normalisation. Where did you need most help?","solution":"Name the difficult step, a strategy that helped, and an independent consistency check.","kind":"reflect"},
    {"id":"F1","stage":"F","comp":"proc","text":"With c₀ = 1/√π, find D^(1/2)x³.","solution":"D^(1/2)x³ = 16x^(5/2)/(5√π).","kind":"expr"},
    {"id":"F2","stage":"F","comp":"proc","text":"Check D^(1/2)[D^(1/2)x³] = ? .","solution":"D^(1/2)[D^(1/2)x³] = 3x².","kind":"expr"},
    {"id":"F3","stage":"F","comp":"decl","text":"Find c(5/2) when c₀ = 1/√π.","solution":"c(5/2) = 15√π/16.","kind":"expr"},
    {"id":"F4","stage":"F","comp":"pers","text":"Describe a second independent way to verify your result for D^(1/2)x³.","solution":"Use the coefficient recurrence and the composition H∘H = D to verify the result.","kind":"text"}
  ],
  "pyramids": [
    {"id":"P1","stage":"P","comp":"pre","text":"On which continent is Egypt located?","solution":"Africa.","kind":"text"},
    {"id":"P2","stage":"P","comp":"pre","text":"Which river runs through Egypt, and why was it so important to its inhabitants?","solution":"The Nile; water, fertile floodplain and transport supported settlement and agriculture.","kind":"text"},
    {"id":"P3","stage":"P","comp":"pre","text":"Khufu's Great Pyramid dates to about 2560 BCE. Approximately how many years ago was that, counting from 2026 CE?","solution":"Approximately 4,585 years ago, allowing for the approximate dating and no year zero.","kind":"range","min":4400,"max":4700},
    {"id":"P4","stage":"P","comp":"pre","text":"Who was a pharaoh?","solution":"The ruler of ancient Egypt, with political and religious authority.","kind":"text"},
    {"id":"P5","stage":"P","comp":"pre","text":"What is a historical source? Give one example.","solution":"Primary evidence from the past, such as an inscription, papyrus, archaeological artefact or tomb.","kind":"text"},
    {"id":"I-D","stage":"I","comp":"decl","text":"What was the principal purpose of ancient Egyptian pyramids?","solution":"Primarily royal burial and funerary purposes in ancient Egypt, with associated religious meaning.","kind":"text"},
    {"id":"I-P","stage":"I","comp":"proc","text":"Where are the three famous large pyramids, and which pharaoh commissioned the largest?","solution":"The Giza plateau near Cairo; Khufu's (Cheops') Great Pyramid is the largest.","kind":"text"},
    {"id":"I-R","stage":"I","comp":"pers","text":"A student says, “Slaves built the pyramids; I saw it in a film.” Is a film sufficient evidence? Which historical sources could help us check?","solution":"A film is not sufficient evidence. Investigate archaeology, workers' settlements and tombs, inscriptions, and contemporary administrative documents.","kind":"text"},
    {"id":"II-D","stage":"II","comp":"decl","text":"Describe at least two developments from Djoser's Step Pyramid to the smooth-sided pyramids at Giza.","solution":"The Step Pyramid of Djoser, transitional/early true pyramids (e.g. Meidum and the Bent Pyramid), and smooth-sided pyramids at Giza.","kind":"text"},
    {"id":"II-P","stage":"II","comp":"proc","text":"The Great Pyramid dates to about 2560 BCE. Lincoln Cathedral in England reportedly exceeded its height around 1311 CE. Approximately how long was it the world's tallest known structure?","solution":"About 3,870 years, subject to uncertainty in the historical height comparison and dates.","kind":"range","min":3750,"max":3950},
    {"id":"II-P2","stage":"II","comp":"proc","text":"If a pyramid used about 2.3 million stone blocks and construction lasted approximately 20 years, estimate the average number of blocks placed per day (365 days/year).","solution":"About 315 blocks/day on average (2,300,000 / 7,300).","kind":"range","min":270,"max":360},
    {"id":"II-R","stage":"II","comp":"pers","text":"An average of roughly 300 blocks/day means around one block every two minutes over a ten-hour day. What does this suggest about organisation and workforce? What further evidence would you seek?","solution":"It suggests coordinated labour and logistics; an average rate alone cannot establish a precise workforce size or schedule.","kind":"text"},
    {"id":"III-D","stage":"III","comp":"decl","text":"Name at least two proposed means of transporting heavy stones and identify the supporting evidence for each.","solution":"Sledges (e.g. depictions and experiments); boats on the Nile/canals (documentary and archaeological evidence); ramps are proposed but details debated.","kind":"text"},
    {"id":"III-P","stage":"III","comp":"proc","text":"Archaeologists found workers' settlements, food remains and workers' tombs at Giza. What can we reasonably infer about the workforce from these findings?","solution":"The evidence supports an organised, provisioned labour force; it does not justify a simple universal claim about all workers' legal status.","kind":"text"},
    {"id":"III-D2","stage":"III","comp":"decl","text":"Pyramids also exist in Mesoamerica and Sudan. A student claims, “Every pyramid is a tomb.” Do you agree? Compare Egyptian and Mesoamerican examples.","solution":"No: Mesoamerican pyramids were often temple platforms; function varied across cultures and periods.","kind":"text"},
    {"id":"III-R","stage":"III","comp":"pers","text":"Reflect: which question required most thought? How did evidence, a map, calculation or comparison help? How do you separate reliable history from myth?","solution":"Explain your use of sources, checks and comparisons, and distinguish evidence from unsupported claims.","kind":"reflect"},
    {"id":"F1","stage":"F","comp":"decl","text":"In one or two sentences, explain why ancient Egyptians built pyramids.","solution":"Royal funerary purposes and religious beliefs about the afterlife.","kind":"text"},
    {"id":"F2","stage":"F","comp":"proc","text":"Djoser's pyramid dates to about 2670 BCE, Khufu's to about 2560 BCE. Approximately how many years older is Djoser's?","solution":"Approximately 110 years.","kind":"range","min":90,"max":130},
    {"id":"F3","stage":"F","comp":"pers","text":"How would you investigate the online claim “Aliens built the pyramids”? Give two concrete verification steps.","solution":"Check primary archaeological evidence and credible expert studies; evaluate whether the claim makes testable predictions and matches the evidence.","kind":"text"}
  ]
};

const META = {
  half: {title: 'Half-derivative', level: 'University · algebraic-operator construction', short: 'Half-derivative on monomials, recurrence and normalisation.'},
  derivative: {title: 'Derivative without limits', level: 'Upper secondary / University', short: 'Tangency, double roots, the factor theorem and the derivative function.'},
  ap: {title: 'Arithmetic progression: n-th term', level: 'School mathematics', short: 'Discovery, formula construction, generalisation and reflection.'},
  pyramids: {title: 'Ancient Egyptian pyramids', level: 'History · school level', short: 'Archaeological evidence, chronology and critical reasoning.'}
};

const STAGE = {
  P: 'Prerequisite knowledge',
  I: 'Level I · Foundations',
  II: 'Level II · Application',
  III: 'Level III · Reasoning',
  F: 'Final independent check'
};

const COMP = {
  pre: 'Prerequisites',
  decl: 'Declarative knowledge',
  proc: 'Procedural knowledge',
  pers: 'Metacognitive / reflective knowledge'
};
