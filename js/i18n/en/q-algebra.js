'use strict';
/* English · quadratic equation, proportion, linear function (Georgian source: OFFLINE_BANKS.quadratic_eq, .proportion, .linear_fn) */
EN.q.quadratic_eq = {
  P1: { text: 'What is 5²?', skill: 'Square' },
  P2: { text: 'Which two numbers have a product of 12 and a sum of 7?', skill: 'Finding factors' },
  P3: { text: 'Solve x² = 9. Write both roots.', skill: 'Square roots' },
  P4: { text: 'Expand (x + 2)(x + 3) and state the coefficient of x.', skill: 'Multiplying brackets' },
  P5: { text: 'What is 2² − 5·2 + 6?', skill: 'Substituting into a polynomial' },
  'I-D': {
    text: 'What is called a quadratic equation? To what power is the unknown raised?',
    $kw: t => /(second|2)/.test(t) && /(degree|power|squar|quadratic)/.test(t),
    $kwPart: t => /(second|squar|quadratic)/.test(t)
  },
  'I-P': { text: 'Solve: x² − 5x + 6 = 0. Write both roots.' },
  'I-R': { text: 'Check x = 2 in the expression x² − 5x + 6. What do you get?' },
  'II-D': {
    text: 'What does a root of a quadratic equation tell us?',
    $kw: t => /(zero|0)/.test(t) && /(substitut|plug|value|equation)/.test(t),
    $kwPart: t => /(zero|root)/.test(t)
  },
  'II-P': { text: 'Solve: x² − 9 = 0. Write both roots.' },
  'II-R': {
    text: 'If someone writes only x = 3 as the solution of x² = 9, what is missing from their answer?',
    $kw: t => /(-\s?3|minus\s?3|negativ)/.test(t),
    $kwPart: t => /(minus|negativ)/.test(t)
  },
  'III-D': {
    text: 'Why can a quadratic equation have two, one or no real roots?',
    $kw: t => /(\btwo\b|\bone\b|\bno\b|none|discriminant|graph|parabola)/.test(t),
    $kwPart: t => /(discriminant|parabola|root)/.test(t)
  },
  'III-P': { text: 'Solve: x² − 6x + 8 = 0. Write both roots.' },
  'III-R': { text: 'Which method helped you more — factorising, the formula or checking by substitution? How did you check your answer?' }
};

EN.q.proportion = {
  P1: { text: 'What is the decimal value of 1/2?', skill: 'Fractions and decimals' },
  P2: { text: 'If 3 exercise books cost 12 lari, how much does one exercise book cost?', skill: 'Unit price' },
  P3: { text: 'Simplify the ratio 6:9. Write the first term of the simplified ratio.', skill: 'Simplifying a ratio' },
  P4: { text: 'What is 25% of 80?', skill: 'Percentage' },
  P5: { text: 'If 2/3 = x/12, roughly what must x be?', skill: 'Equal ratios' },
  'I-D': {
    text: 'Explain in your own words what a proportion is.',
    $kw: t => /(\btwo\b|ratio)/.test(t) && /(equal|same)/.test(t),
    $kwPart: t => /(ratio|equal)/.test(t)
  },
  'I-P': { text: 'Solve the proportion: 3/5 = x/20.' },
  'I-R': { text: 'Check x = 12 by cross-multiplication. What is 3·20?' },
  'II-D': {
    text: 'Why does cross-multiplication work in a proportion?',
    $kw: t => /(multipl|denominator|numerator|equal)/.test(t),
    $kwPart: t => /(multipl|equal)/.test(t)
  },
  'II-P': { text: '4 kg of apples cost 14 lari. At the same price, how much will 10 kg cost?' },
  'II-R': { text: 'If you got 35 as the answer, what is the price of 1 kg?' },
  'III-D': {
    text: 'How would you tell a directly proportional relationship from one that is not proportional?',
    $kw: t => /(ratio|coefficient|the same|constant)/.test(t),
    $kwPart: t => /(ratio|constant)/.test(t)
  },
  'III-P': { text: 'On a map, 3 cm corresponds to 12 km. How many kilometres does 7.5 cm correspond to?' },
  'III-R': { text: 'Which method did you use — finding one unit, a proportion or something else? How did you check your answer?' }
};

EN.q.linear_fn = {
  P1: { text: 'If y = 2x + 1 and x = 3, what is y?', skill: 'Substituting into a function' },
  P2: { text: 'In the point (2; 5), which is the x-coordinate?', skill: 'Coordinates' },
  P3: { text: 'By how much does each next term of the sequence 3, 6, 9, 12 increase?', skill: 'Constant change' },
  P4: { text: 'If y = x + 4 and y = 10, what is x?', skill: 'Simple equation' },
  P5: { skill: 'Difference' },
  'I-D': {
    text: 'What does the linear function y = kx + b describe? What does it mean that the change is constant?',
    $kw: t => /(constant|same|equal)/.test(t) && /(chang|increas|decreas|grow|rate)/.test(t),
    $kwPart: t => /(constant|chang)/.test(t)
  },
  'I-P': { text: 'In the function y = 3x + 2, find y when x = 4.' },
  'I-R': { text: 'Check: if x increases by one, by how much does y change in y = 3x + 2?' },
  'II-D': {
    text: 'What does k mean in the linear function y = kx + b?',
    $kw: t => /(slope|gradient|steep|increas|decreas|chang|coefficient|rate)/.test(t),
    $kwPart: t => /(slope|gradient|chang|coefficient)/.test(t)
  },
  'II-P': { text: 'The points (1; 4) and (3; 10) lie on one line. What is the slope k?' },
  'II-R': { text: 'If k = 3, by how much must y increase when x increases by 2 units?' },
  'III-D': {
    text: 'What does b mean graphically in the linear function y = kx + b?',
    $kw: t => /(\by\b|y-axis|axis)/.test(t) && /(intersect|cross|meet|\bcuts?\b|x\s?=\s?0|zero|intercept)/.test(t),
    $kwPart: t => /(intersect|cross|axis|zero|intercept)/.test(t)
  },
  'III-P': { text: 'Find b in y = 2x + b if the graph passes through the point (3; 11).' },
  'III-R': { text: 'What helped you more — the formula, a table or the graph? How did you check your answers?' }
};
