'use strict';
/* English · geometric progression, n-th term (Georgian source: OFFLINE_BANKS.gp) */
EN.q.gp = {
  P1: {
    skill: 'Ratio and pattern',
    text: 'In the sequence 3, 6, 12, 24, … how are neighbouring terms related?',
    'check.errors.0.follow': '3 + 3 = 6. Check the same rule on the next pair: what is 6 + 3? Is it 12?',
    ladder: ['What are 6 ÷ 3, 12 ÷ 6 and 24 ÷ 12?', 'What is 3 · 2? And 6 · 2?', 'If your money doubles every day: 3 lari, 6 lari, 12 lari… what happens every day?'],
    $alt: t => /(twice|doubl|times 2|by 2|multipl\w* by 2)/.test(t)
  },
  P2: {
    text: 'Which number comes next: 3, 6, 12, 24, … ?',
    'check.errors.0.follow': 'Check your rule on the earlier pairs: how did we get from 6 to 12? Does that rule also work from 3 to 6?',
    'check.errors.1.follow': '24 + 6 = 30. Check this rule on the previous pair: is 12 + 6 = 24?',
    ladder: ['How many times larger is each term than the previous one?', 'By what must 24 be multiplied so that the same rule continues?', 'What is 24 · 2?']
  },
  P3: {
    skill: 'The concept of a power',
    'check.errors.0.follow': 'What does `2^5` mean: 2 · 5 or 2 · 2 · 2 · 2 · 2?',
    'check.errors.1.follow': 'In `2^5`, which number is multiplied by itself, and how many times?',
    ladder: ['`2^5` = 2 · 2 · 2 · 2 · 2. What is 2 · 2 · 2?', '`2^4` = 16. What is 16 · 2?', 'A cell divides into two, and each new cell again into two. How many cells are there after 5 divisions?']
  },
  P4: {
    skill: 'Order of operations with powers',
    text: 'What is 3 · `2^3`?',
    'check.errors.0.follow': 'Which operation is carried out first: 3 · 2 or `2^3`?',
    'check.errors.1.follow': 'What is `2^3`: 2 · 3 or 2 · 2 · 2?',
    ladder: ['What is `2^3`?', '`2^3` = 8. Now what is 3 · 8?', 'There are 3 boxes with 8 apples in each. How many apples are there in total?']
  },
  P5: {
    skill: 'Root (inverting a power)',
    text: 'Find the positive `x` if `x^3` = 64.',
    'check.errors.0.follow': 'Check: what is 21.33 · 21.33 · 21.33? Is it 64?',
    'check.errors.1.follow': 'Check: what is 8 · 8 · 8? Is it 64?',
    ladder: ['Which number multiplied by itself three times gives 64? Try 2, 3, 4…', '`2^3` = 8, `3^3` = 27. What is `4^3`?', 'A cube has a volume of 64 cm³. How long is its edge?']
  },
  P6: {
    skill: 'Powers of a negative number',
    text: 'What are `(−2)^4` and `(−2)^3`?',
    'check.errors.0.follow': '`(−2)^4` = (−2) · (−2) · (−2) · (−2). What is the sign of the product of four negative numbers?',
    ladder: ['What is (−2) · (−2)?', '(−2) · (−2) = 4. Now 4 · (−2) = ? And then · (−2) once more?', 'Sign rule: what is the sign of the product of two negative numbers? And of three?']
  },
  'I-D': {
    text: 'Look at the sequence 3, 6, 12, 24, 48, … What happens when you move from one term to the next? Describe it in your own words.',
    'check.errors.0.follow': 'What is 6 − 3? And 12 − 6? Is this number constant? If not, what other relation could there be between neighbouring terms?',
    'ladder.1': 'Does this ratio change as we move along the sequence?',
    'ladder.2': 'The number of bacteria doubles every hour: 3, 6, 12… What happens to the number every hour?',
    $kw: t => /(2 times|two times|times 2|by 2|twice|doubl|\*\s?2|ratio.*2|multipl.*2|2.*multipl)/.test(t),
    $kwPart: t => /(2|increas|grow|multipl)/.test(t),
    $re: { 0: /^(?!.*(2 times|times 2|by 2|twice|doubl|multipl|ratio)).*(add|plus|differ|\+)/ }
  },
  'I-P': {
    intro: 'A sequence like the one you described, in which every next term equals the previous one <b>multiplied by the same non-zero number</b>, is called a <b>geometric progression</b>. This number is called the <b>common ratio</b> of the progression and is denoted by <span class="m">q</span>, and the <span class="m">n</span>-th term by <span class="m">b<sub>n</sub></span>.',
    text: 'Sequence 2, 6, 18, 54, …: find `q` and the sixth term `b_6`.',
    'check.errors.0.follow': 'Check your rule on a small term: what does the same rule give for `b_2`? Is it 6?',
    'check.errors.1.follow': 'Write the terms in order: `b_1`, `b_2`, …, `b_6`. In which position is 162?',
    'check.errors.2.follow': 'Check your rule on `b_3`: what does it give, and what is `b_3` actually?',
    'check.errors.3.follow': 'Check your rule on `b_3`: is it 18?',
    ladder: ['What are 6 ÷ 2 and 18 ÷ 6?', 'Continue the sequence by two terms: 2, 6, 18, 54, __, __', 'Complete the table: n = 1 → 2; n = 2 → 6; n = 3 → 18; n = 4 → 54; n = 5 → ?; n = 6 → ?']
  },
  'I-R': {
    text: 'A classmate says: “A geometric progression always increases.” Do you agree? Test the claim on the sequences 80, 40, 20, 10, … and 1, −2, 4, −8, … and explain how you checked it.',
    'check.errors.0.follow': 'What is 40 ÷ 80? And 20 ÷ 40? Does this sequence increase or decrease?',
    ladder: ['What are 40 ÷ 80, 20 ÷ 40 and 10 ÷ 20?', 'What are (−2) ÷ 1 and 4 ÷ (−2)? Does the sequence 1, −2, 4, −8 increase, decrease or “jump”?', 'A ball bounces to half of its previous height each time: 80 cm, 40 cm, 20 cm… Do we multiply by the same number each time? Does the height increase?'],
    $kw: t => /(\bno\b|\bnot\b|disagree|wrong|false|incorrect|don'?t agree)/.test(t) && /(decreas|declin|smaller|half|halv|0[.,]5|1\/2|-\s?2|sign|alternat|negativ|jump|oscillat)/.test(t),
    $kwPart: t => /(\bno\b|disagree|decreas|declin|half|negativ|sign)/.test(t),
    $re: { 0: /^(yes|yeah|i agree|agree|true|correct)/ }
  },
  'II-D': {
    text: 'What does `q` mean in a geometric progression? Can `q` be negative, a fraction or zero? Give examples.',
    ladder: ['In the sequence 80, 40, 20, … what is `q`?', 'In the sequence 1, −2, 4, −8, … what is `q`? And what happens if `q` = 0: 5, ?, ?, …', 'What is 40 ÷ 80? Is this number greater or less than 1?'],
    $kw: t => /(ratio|quotient|multipl|times|divid|factor|:|\/)/.test(t) && /(negativ|fraction|-\s?\d|0[.,]\d|1\/2|half)/.test(t) && /(zero|0)/.test(t),
    $kwPart: t => /(ratio|multipl|negativ|fraction|zero)/.test(t)
  },
  'II-P1': {
    text: 'In the sequence 3, 6, 12, … find `b_{10}` without computing all the previous terms.',
    'check.errors.0.follow': 'Check your reasoning on a small term: what does the same reasoning give for `b_2`? Is it 6?',
    'check.errors.1.follow': 'Where is the first term 3 in your calculation?',
    'check.errors.2.follow': 'Where is the first term 3 in your calculation? Check the rule on `b_2` as well.',
    'check.errors.4.follow': 'Check your rule on `b_2`: is it 6?',
    'check.errors.5.follow': 'Check your rule on `b_3`: is it 12?',
    ladder: ['How many times did we multiply by 2 from `b_1` to `b_2`? And from `b_1` to `b_{10}`?', 'Complete the table: n = 1 → 3, multiplied by 2 zero times; n = 2 → 3 · 2, once; n = 3 → 3 · 2 · 2, twice; n = 10 → ? times.', 'How many gaps are there between 10 fence posts? How many “gaps” are there from `b_1` to `b_{10}`, i.e. how many times do we multiply by 2?']
  },
  'II-P2': {
    text: 'If the first term is `b_1` and the common ratio is `q`, write a formula for `b_n` using only `b_1`, `q` and `n`. For powers use the sign ^, for example q^3.',
    'check.errors.1.follow': 'Substitute `n` = 1. Do you get `b_1`?',
    'check.errors.2.follow': 'Substitute `n` = 1. What should `b_1` equal, and what does your formula give?',
    'check.errors.3.follow': 'Substitute `n` = 3. You should get `b_1 · q · q`. Do you?',
    'check.errors.5.follow': 'Substitute `n` = 2. You should get `b_1 · q`. What does your formula give?',
    'check.errors.6.follow': 'Substitute `n` = 1. What does your formula give, and what should `b_1` equal?',
    ladder: ['Write `b_2`, `b_3`, `b_4` using only `b_1` and `q`.', 'Complete the table: n = 1 → `b_1`, multiplied by q zero times; n = 2 → `b_1 · q`, once; n = 3 → ?; n = 4 → ?. How is `q · q · q` written in short?', 'There are 9 gaps between 10 fence posts. How many times do we multiply by `q` from `b_1` to `b_n`?']
  },
  'II-R': {
    text: 'A student wrote: `b_n = b_1 q^n`. Is this formula correct? How would you check it?',
    'check.errors.0.follow': 'Substitute `n` = 1 into this formula. What do you get for `b_1`?',
    'ladder.1': '`b_1 = b_1 q` — can this be true if `q` ≠ 1?',
    'ladder.2': 'Test the formula on the sequence 3, 6, 12: what does it give for `b_1`?',
    $kw: t => /(\bno\b|\bnot\b|incorrect|wrong|mistake|error|false)/.test(t) && /(n\s?=\s?1|first|substitut|plug|put in|insert|n\s?-\s?1|concrete|specific|example|b1\s?\*?\s?q)/.test(t),
    $kwPart: t => /(\bno\b|incorrect|wrong|mistake|error|n\s?-\s?1|n\s?=\s?1)/.test(t),
    $re: { 0: /^(yes|yeah|correct|it is correct|it'?s correct|right)/ }
  },
  'III-D': {
    intro: 'The formula for the <span class="m">n</span>-th term of a geometric progression is <span class="m">b<sub>n</sub> = b<sub>1</sub>q<sup>n − 1</sup></span>.',
    text: 'Explain in your own words: why is the exponent `n` − 1 and not `n`? And why a power, rather than multiplying `q` by (`n` − 1)?',
    'ladder.0': 'How many times did we multiply by `q` to get `b_2`? And `b_5`?',
    'ladder.1': '`b_5 = b_1 · q · q · q · q`. How is `q · q · q · q` written in short? Is it the same as `q` · 4?',
    $kw: t => /(step|zero times|0 times|one less|one fewer|gap|segment|\bposts?\b|fence|n\s?=\s?1|first)/.test(t) && /(power|exponent|multipl|times|by itself|repeat)/.test(t)
  },
  'III-D2': {
    text: 'Imagine the points (1; 3), (2; 6), (3; 12), (4; 24) on the coordinate plane. Do they lie on one straight line? How does this picture differ from an arithmetic progression, and what role does `q` play?',
    'check.errors.0.follow': 'How much does the point rise when we move from 1 to 2? And from 3 to 4? Does it rise by the same amount?',
    'ladder.1': 'Are the jumps 3, 6, 12 equal, or do they grow? What kind of curve do we get when the jump doubles at every step?',
    'ladder.2': 'Write `b_n = 3 · 2^{n-1}`. Which function does it remind you of: `y = kx + b` or `y = a · 2^x`?',
    $kw: t => /(\bno\b|\bnot\b|don'?t|do not|aren'?t|isn'?t)/.test(t) && /(curve|exponent|steep|more and more|faster|doubl|times|\bq\b)/.test(t),
    $kwPart: t => /(curve|\bno\b|\bnot\b|exponent)/.test(t),
    $re: { 0: /^(?!.*(\bno\b|\bnot\b|don'?t|aren'?t|curve)).*\bline/ }
  },
  'III-P': {
    text: 'In a geometric progression `b_2` = 6 and `b_5` = 162. Find `q` and `b_1`.',
    'check.errors.0.follow': 'Is 27 equal to `q` or to `q^3`? Check: is 6 · 27 equal to `b_3` or to `b_5`?',
    'check.errors.1.follow': 'Check: 6 · 9 · 9 · 9 = 162?',
    'check.errors.2.follow': 'How are `b_5` and `b_2` related in a geometric progression: by addition or by multiplication?',
    'check.errors.3.follow': 'How many steps are there from `b_2` to `b_5`? Count them with arrows: `b_2` → `b_3` → …',
    ladder: ['Write both terms using the general formula: `b_2` = ? and `b_5` = ?', 'How many steps are there from `b_2` to `b_5`, and how many times larger did the term become over them (162 ÷ 6)?', 'If an amount grew 27-fold in 3 years, being multiplied by the same number every year, by what factor did it grow each year?']
  },
  'III-P2': {
    text: 'According to legend, 3 grains of wheat were placed on the first square of a chessboard, and on each next square twice as many as on the previous one. How many grains are there on the 11th square?',
    'check.errors.0.follow': 'Check your rule on the second square: how many times was the amount doubled? What do you get?',
    'check.errors.1.follow': 'Where are the 3 grains of the first square in your calculation?',
    'check.errors.2.follow': 'Where are the 3 grains of the first square in your calculation? Check the rule on the second square as well.',
    'check.errors.3.follow': 'Check your rule on the third square: do you get 12?',
    'check.errors.4.follow': 'Check your rule on the second square: do you get 6?',
    ladder: ['How many grains are there on the second square? On the third?', 'How many times did the amount double on the way from the first square to the 11th?', 'Complete the table: square 1 → 3; square 2 → 6; square 3 → 12; … square 11 → ?  (how many times did we multiply by 2?)']
  },
  'III-R2': {
    text: 'In a progression `b_1` = 3 and `b_3` = 12. A student found `q` = 2 and said that this is the only answer. Do you agree? How would you check?',
    'check.errors.0.follow': '`b_3 = b_1 q^2`, so `q^2` = 4. Which numbers give 4 when squared?',
    ladder: ['What does `q^2` equal if `b_3 = b_1 q^2`?', '`q^2` = 4. What is `2^2`? And `(−2)^2`?', 'The side of a square is 2 because its area is 4. But how many solutions does the equation `x^2` = 4 have?'],
    $kw: t => /(\bno\b|\bnot\b|disagree|\btwo\b|second)/.test(t) && /(-\s?2|negativ|3\s?,\s?-\s?6|two answers|two solutions|two values|±)/.test(t),
    $kwPart: t => /(-\s?2|negativ|\bno\b|±|\btwo\b)/.test(t),
    $re: { 0: /^(yes|yeah|i agree|agree|correct|right)/ }
  },
  'III-R': {
    'ladder.2': 'How did you check the formula or the answer? For example, did you substitute `n` = 1 or check `b_2`?'
  }
};
