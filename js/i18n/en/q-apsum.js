'use strict';
/* English · sum of the first n terms of an arithmetic progression (Georgian source: OFFLINE_BANKS.apsum) */
EN.q.apsum = {
  P1: {
    text: 'In the sequence 3, 6, 9, 12, … what is the common difference `d`?',
    skill: 'Common difference of an arithmetic progression',
    ladder: ['What is 6 − 3?', 'What is 9 − 6?', 'If both are the same, what is d?']
  },
  P2: {
    text: 'In an arithmetic progression `a_1` = 4, `d` = 3. Find `a_5`.',
    'check.errors.0.follow': 'How many steps are there from `a_1` to `a_5`: 5 or 4?',
    ladder: ['Write out the terms: 4, 7, 10, …', 'How many times must 3 be added to the first term to reach the fifth term?', 'Use `a_n` = `a_1` + (`n` − 1)`d`.']
  },
  P3: {
    text: 'What is 1 + 2 + 3 + 4 + 5?',
    ladder: ['Group 1 + 5 and 2 + 4.', 'What do the two pairs and the middle term give?', 'What is 6 + 6 + 3?']
  },
  P4: {
    text: 'If the arithmetic mean of 5 numbers is 8, what is the sum of these 5 numbers?',
    skill: 'Arithmetic mean',
    ladder: ['Mean = sum ÷ number of values.', 'If we denote the sum by S, then `S/5` = 8.', 'What is 8 · 5?']
  },
  P5: {
    text: 'What is 7 + 19?',
    skill: 'Sum of the first and the last term',
    ladder: ['What is the first small step?', 'Try it on a small example.', 'How will you check your answer?']
  },
  'I-D': {
    text: 'Look at the sum 2 + 5 + 8 + 11 + 14. If we pair the first and the last term, and then the second and the second-to-last, what do you notice?',
    ladder: ['What is 2 + 14?', 'What is 5 + 11?', 'What do these two sums have in common?'],
    $kw: t => /16/.test(t) && /(equal|same|pair|identical|constant)/.test(t),
    $kwPart: t => /(16|pair|same)/.test(t)
  },
  'I-P': {
    text: 'Find the sum 2 + 5 + 8 + 11 + 14.',
    'ladder.1': 'Or use pairs: 2 + 14 and 5 + 11.',
    'ladder.2': 'There are two pairs of 16 and an 8 in the middle.'
  },
  'I-R': {
    text: 'Check the previous sum in two ways: by adding directly and by grouping into pairs. Do the answers agree?',
    'ladder.1': 'What did you get with the pairs?',
    $kw: t => /40/.test(t) && /(yes|match|same|equal|agree|coincid)/.test(t),
    $kwPart: t => /(40|match)/.test(t)
  },
  'II-D': {
    text: 'In the sum of the first `n` terms of an arithmetic progression, why is the sum of the first and the `n`-th term, `a_1` + `a_n`, important?',
    ladder: ['What is `a_1` + `a_n`?', 'What do you get for `a_2` + `a_{n-1}`?', 'Why are these sums of pairs the same?'],
    $kw: t => /(pair|symmetr|first.*last|last.*first)/.test(t) && /(equal|same|constant|identical)/.test(t),
    $kwPart: t => /(pair|first.*last|symmetr)/.test(t)
  },
  'II-P1': {
    text: 'In an arithmetic progression `a_1` = 3, `a_n` = 27 and `n` = 9. Find the sum of the first 9 terms.',
    'check.errors.0.follow': 'You multiplied 9·30. Why do we also need to divide by 2?',
    ladder: ['What is `a_1` + `a_n`?', 'What is the mean of these two numbers?', 'Multiply the mean by the number of terms, 9.']
  },
  'II-P2': {
    text: 'Complete the formula in words or symbols: the sum of the first `n` terms equals the number of terms multiplied by the arithmetic mean of the first and the last term.',
    ladder: ['The mean of the first and the last term is (`a_1` + `a_n`) / 2.', 'Now by how many terms must this mean be multiplied?', 'You get `S_n` = `n`(`a_1` + `a_n`) / 2.'],
    $kw: t => /(s|sum)/.test(t) && /n/.test(t) && /(a_?1|a₁|first)/.test(t) && /(a_?n|aₙ|last)/.test(t) && /(2|half|mean|average)/.test(t),
    $kwPart: t => /n/.test(t) && /(2|half|mean|average)/.test(t)
  },
  'II-R': {
    text: 'Test the formula `S_n` = `n`(`a_1` + `a_n`) / 2 on the small example 2, 5, 8, 11, 14. What do you get?',
    ladder: ['Here `n` = 5, `a_1` = 2, `a_n` = 14.', 'First find 2 + 14.', 'Compute 5·16/2.']
  },
  'III-D': {
    text: 'Explain why we obtain the formula `S_n` = `n`(`a_1` + `a_n`) / 2 if we write the sum once in the usual order and once in reverse order.',
    ladder: ['Write `S_n` = `a_1` + `a_2` + … + `a_n`.', 'Below it, write the same sum in reverse: `a_n` + `a_{n-1}` + … + `a_1`.', 'Adding column by column, how many equal sums do you get, and why do we finally divide by 2?'],
    $kw: t => /(revers|backward|opposite|first.*last|last.*first)/.test(t) && /n/.test(t) && /(2|divid|half)/.test(t),
    $kwPart: t => /(revers|first.*last|2)/.test(t)
  },
  'III-P1': {
    text: 'In an arithmetic progression `a_1` = 5, `d` = 4 and `n` = 20. Find `S_{20}` by computing `a_{20}` first.',
    'check.errors.0.follow': 'For `a_{20}`, how many times is 4 added to the first term — 20 times or 19 times?',
    ladder: ['First find `a_{20}` = 5 + 19·4.', 'Then use `S_{20}` = 20(5 + `a_{20}`)/2.', 'What is 20·86/2?']
  },
  'III-P2': {
    text: 'With the same data `a_1` = 5, `d` = 4, `n` = 20, use the formula `S_n` = `n`/2 · [2`a_1` + (`n` − 1)`d`]. What do you get?',
    ladder: ['What is 2·5?', 'What is 19·4?', 'Compute 20/2 · (10 + 76).']
  },
  'III-R': {
    text: 'Of the two formulas — `S_n` = `n`(`a_1` + `a_n`) / 2 and `S_n` = `n`/2·[2`a_1` + (`n` − 1)`d`] — when would you choose which, and how would you check your answer?',
    ladder: ['If `a_n` is already known, which formula is shorter?', 'If only `a_1`, `d` and `n` are known, which formula may be more convenient?', 'How would you check by adding directly for a small `n`?']
  }
};
