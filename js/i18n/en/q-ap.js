'use strict';
/* English · arithmetic progression, n-th term (Georgian source: DEFAULT_Q in js/data/banks.js) */
EN.q.ap = {
  P1: {
    skill: 'Differences and patterns',
    text: 'In the sequence 2, 5, 8, 11, … how are neighbouring terms related?',
    'check.errors.0.follow': '`2 · 2.5 = 5`. Check the same rule on the next pair: what is `5 · 2.5`? Is it 8?',
    ladder: ['What are 5 − 2, 8 − 5 and 11 − 8?', 'What is 5 − 2?', 'If you have 5 apples and eat 2, how many are left?']
  },
  P2: {
    skill: 'Continuing a sequence',
    text: 'Which number comes next: 2, 5, 8, 11, … ?',
    'check.errors.0.follow': 'Check your rule on the first pair: how did we get from 2 to 5?',
    ladder: ['By how much does each term increase compared with the previous one?', 'What must be added to 11 so that the same rule continues?', 'What is 11 + 3?']
  },
  P3: {
    skill: 'Substituting numbers for letters',
    text: 'If `a` = 4 and `b` = 3, what is `a` + 5`b`?',
    'check.errors.0.follow': 'What does 5`b` mean? What is its value if `b` = 3?',
    'check.errors.1.follow': 'Which operation is carried out first: addition or multiplication?',
    ladder: ['What does 5`b` mean if `b` = 3?', 'What is 5 · 3?', 'What is 4 + 15?']
  },
  P4: {
    skill: 'Linear equation',
    text: 'Solve the equation 3`x` + 5 = 20.',
    'check.errors.0.follow': 'Check: substitute your answer into the equation. Do you get 20?',
    'check.errors.1.follow': 'Substitute `x` = 25 into the equation. What does the left-hand side give?',
    ladder: ['What must 3`x` be so that 3`x` + 5 = 20?', '3`x` = 15. Which number multiplied by 3 gives 15?', 'What is 15 : 3?']
  },
  P5: {
    skill: 'Linear function',
    text: '`y` = 2`x` + 1. What is `y` when `x` = 3?',
    'check.errors.0.follow': 'What has to be multiplied first: 2 and 3, or 3 and 3?',
    ladder: ['What is 2 · 3?', 'Now add 1 to 6. What do you get?', 'If one ticket costs 2 lari and you buy 3 tickets, plus 1 lari for a bag, how much did you spend in total?']
  },
  'I-D': {
    text: 'Look at the sequence 4, 7, 10, 13, 16, … What happens when you move from one term to the next? Describe it in your own words.',
    ladder: ['What are 7 − 4, 10 − 7 and 13 − 10?', 'Does this difference change as we move along the sequence?', 'Each step of a staircase is 3 cm higher than the previous one. What happens to the height at every new step?'],
    $kw: t => /3/.test(t) && /(add|increas|grow|more|plus|\+|differ|bigger|larger|greater|rise|goes up|go up)/.test(t),
    $kwPart: t => /3/.test(t) || /(add|increas|differ)/.test(t)
  },
  'I-P': {
    intro: 'A sequence like the one you described, in which every next term equals the previous one <b>plus the same number</b>, is called an <b>arithmetic progression</b>. This constant number is denoted by <span class="m">d</span>, and the <span class="m">n</span>-th term by <span class="m">a<sub>n</sub></span>.',
    text: 'Sequence 3, 6, 9, 12, …: find `d` and the sixth term `a_6`.',
    'check.errors.0.follow': 'Check your rule on a small term: what does the same rule give for `a_2`? Is it 6?',
    'check.errors.1.follow': 'Write the terms in order: `a_1`, `a_2`, …, `a_6`. In which position is your number?',
    ladder: ['What are 6 − 3 and 9 − 6?', 'Continue the sequence by two terms: 3, 6, 9, 12, __, __', 'Complete the table: n = 1 → 3; n = 2 → 6; n = 3 → 9; n = 4 → 12; n = 5 → ?; n = 6 → ?']
  },
  'I-R': {
    text: 'A classmate says: “An arithmetic progression always increases.” Do you agree? Test the claim on the sequence 20, 17, 14, 11, … and explain how you checked it.',
    'check.errors.0.follow': 'What is 17 − 20? And 14 − 17? Does this number change?',
    ladder: ['What are 17 − 20, 14 − 17 and 11 − 14?', 'Do we add the same number at every step? Can that number be negative?', 'A thermometer drops by 3 degrees every hour: 20°, 17°, 14°… Does it change by the same amount every hour?'],
    $kw: t => /(\bno\b|\bnot\b|disagree|wrong|false|incorrect|don'?t agree)/.test(t) && /(-\s?3|decreas|declin|goes down|go down|smaller|subtract|minus|17\s?-\s?20|negativ|\bfalls?\b|\bdrops?\b)/.test(t),
    $kwPart: t => /(\bno\b|\bnot\b|disagree|-\s?3|decreas|declin)/.test(t),
    $re: { 0: /^(yes|yeah|i agree|agree|true|correct)/ }
  },
  'II-D': {
    text: 'What does `d` mean in an arithmetic progression? Can `d` be negative or zero? Give one example of each.',
    ladder: ['In the sequence 20, 17, 14, … what is `d`?', 'In the sequence 5, 5, 5, 5, … what is the difference between neighbouring terms?', 'What is 17 − 20? Is this number positive or negative?'],
    $kw: t => /(differ|add|step|increas|plus|next.*previous|subsequent.*previous|constant)/.test(t) && /(negativ|yes|\bcan\b|-\s?\d|zero|0)/.test(t),
    $kwPart: t => /(differ|add|negativ|zero)/.test(t)
  },
  'II-P1': {
    text: 'In the sequence 4, 7, 10, … find `a_{100}` without computing all the previous terms.',
    'check.errors.0.follow': 'Check your reasoning on a small term: what does the same reasoning give for `a_2`? Is it 7?',
    'check.errors.1.follow': 'Where is the first term 4 in your calculation?',
    'check.errors.2.follow': 'Check your rule on `a_2`: what does it give, and what is `a_2` actually?',
    ladder: ['How many steps are there from `a_1` to `a_2`? And from `a_1` to `a_{100}`?', 'Complete the table: n = 1 → d added 0 times; n = 2 → 1 time; n = 3 → ? times; n = 100 → ? times.', 'How many gaps are there between 10 fence posts? Now your case: how many “gaps” are there from `a_1` to `a_{100}`?']
  },
  'II-P2': {
    text: 'If the first term is `a_1` and the common difference is `d`, write a formula for `a_n` using only `a_1`, `d` and `n`.',
    'check.errors.0.follow': 'Let us test your formula for the first term: substitute `n` = 1. What do you get?',
    'check.errors.1.follow': 'Substitute `n` = 1. Do you get `a_1`?',
    'check.errors.2.follow': 'Substitute `n` = 1. What should `a_1` equal, and what does your formula give?',
    'check.errors.3.follow': 'Substitute `n` = 2. You should get `a_1` + `d`. Do you?',
    ladder: ['Write `a_2`, `a_3`, `a_4` using only `a_1` and `d`.', 'Complete the table: n = 1 → `a_1`, d added 0 times; n = 2 → `a_1` + `d`, 1 time; n = 3 → ?; n = 4 → ?. What is the pattern?', 'There are 9 gaps between 10 fence posts. How many steps are there from `a_1` to `a_n`?']
  },
  'II-R': {
    text: 'A student wrote: `a_n` = `a_1` + `nd`. Is this formula correct? How would you check it?',
    'check.errors.0.follow': 'Substitute `n` = 1 into this formula. What do you get for `a_1`?',
    ladder: ['Substitute `n` = 1 into this formula. What do you get?', '`a_1` = `a_1` + `d` — can this be true if `d` ≠ 0?', 'Test the formula on the sequence 4, 7, 10: what does it give for `a_1`?'],
    $kw: t => /(\bno\b|\bnot\b|incorrect|wrong|mistake|error|false)/.test(t) && /(n\s?=\s?1|first|substitut|plug|put in|insert|a1\s?=\s?a1\s?\+\s?d|n\s?-\s?1|concrete|specific|example)/.test(t),
    $kwPart: t => /(\bno\b|incorrect|wrong|mistake|error|n\s?-\s?1|n\s?=\s?1)/.test(t),
    $re: { 0: /^(yes|yeah|correct|it is correct|it'?s correct|right)/ }
  },
  'III-D': {
    intro: 'The formula for the <span class="m">n</span>-th term of an arithmetic progression is <span class="m">a<sub>n</sub> = a<sub>1</sub> + (n − 1)d</span>.',
    text: 'Explain in your own words: why does the formula contain `n` − 1 and not `n`?',
    ladder: ['How many times was `d` added to obtain `a_2`? And `a_5`?', 'For `n` = 1, how many times must `d` be added so that we get `a_1` again?', 'How many gaps are there between 10 fence posts? What do the “posts” and the “gaps” correspond to in a progression?'],
    $kw: t => /(step|zero times|0 times|0-times|one less|one fewer|from a1|first term|not added|nothing is added|gap|segment|interval|\bposts?\b|fence|n\s?=\s?1)/.test(t),
    $kwPart: t => t.length > 12
  },
  'III-D2': {
    text: 'Imagine the points (1; 4), (2; 7), (3; 10), (4; 13) on the coordinate plane. On what kind of figure do they lie, and what role does `d` play?',
    ladder: ['How much higher is each next point when we move one unit to the right?', 'Does it rise by the same amount at every step? What kind of line do we get then?', 'Rewrite `a_n` = 4 + 3(`n` − 1) so that `n` appears only once. What does it remind you of in `y` = `kx` + `b`?'],
    $kw: t => /(line|linear)/.test(t) && /(slope|gradient|angle|coefficient|rate|rise|\bk\b|increas|steep|incline)/.test(t),
    $kwPart: t => /(line|linear)/.test(t)
  },
  'III-P': {
    text: 'In an arithmetic progression `a_4` = 17 and `a_{10}` = 35. Find `d` and `a_1`.',
    'check.errors.0.follow': 'How many steps are there from `a_4` to `a_{10}`?',
    'check.errors.1.follow': 'Count them: `a_4` → `a_5` → … → `a_{10}`. How many steps did you get?',
    'check.errors.2.follow': 'Check: how many steps are there from `a_1` to `a_4`?',
    ladder: ['Write both terms using the general formula: `a_4` = ? and `a_{10}` = ?', 'How many steps are there from `a_4` to `a_{10}`, and by how much did the term grow over them?', 'If climbing 6 equal steps took us 18 metres higher, how high is one step?']
  },
  'III-P2': {
    text: 'The first row of a stadium has 18 seats, and each following row has 3 more seats. How many seats are there in row 20?',
    'check.errors.0.follow': 'Check your rule on the second row: how many times was 3 added? What do you get?',
    'check.errors.1.follow': 'Check your rule on the second row: is `a_2` = 2 · `a_1`?',
    'check.errors.2.follow': 'How many seats would the second row have according to your rule? Is it 21?',
    'check.errors.3.follow': 'Check your rule on the second row: do you get 21?',
    ladder: ['How many seats are there in the second row? In the third?', 'How many times was 3 added on the way from row 1 to row 20?', 'Complete the table: row 1 → 18; row 2 → 21; row 3 → 24; … row 20 → ?  (how many times was 3 added?)']
  },
  'III-R': {
    text: 'Look back at this dialogue: at which step did you have to think the most? What helped you — numbers, a table, a graph or a formula? And how did you make sure your answers were correct?',
    ladder: ['Which question did you find the hardest?', 'What did you do when it got difficult: draw up a table, try a small example, or something else?', 'How did you check the formula or the answer? For example, did you substitute `n` = 1 or a small term?']
  }
};
