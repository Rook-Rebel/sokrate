'use strict';
/* English · sum of the first n terms of a geometric progression (Georgian source: OFFLINE_BANKS.gpsum) */
EN.q.gpsum = {
  P1: {
    text: 'In the geometric progression 2, 6, 18, 54, … what is the common ratio `q`?',
    skill: 'Common ratio of a geometric progression',
    ladder: ['What is 6 ÷ 2?', 'What is 18 ÷ 6?', 'If the ratio is constant, what is q?']
  },
  P2: {
    text: 'If `b_1` = 2 and `q` = 3, find `b_4`.',
    'check.errors.0.follow': 'From `b_1` to `b_4`, how many times do we multiply by q — 4 times or 3 times?',
    skill: 'Formula for the n-th term',
    ladder: ['Write out the terms: 2, 6, 18, …', 'How many times must 2 be multiplied by 3 to reach the fourth term?', 'Use `b_n` = `b_1`·`q^{n-1}`.']
  },
  P3: {
    text: 'What is 1 + 2 + 4 + 8?',
    skill: 'Finite sum',
    ladder: ['First, what is 1 + 2?', 'Then add 4.', 'Finally add 8.']
  },
  P4: {
    text: 'What is `2^4`?',
    skill: 'Power',
    ladder: ['`2^4` means 2·2·2·2.', 'What is 2·2·2?', 'Now multiply by 2 once more.']
  },
  P5: {
    text: 'If `S` = 15, what is 2`S` − `S`?',
    skill: 'Algebraic transformation',
    ladder: ['What is 2·15?', 'Now 30 − 15.', 'What is left?']
  },
  'I-D': {
    text: 'Look at the sum 1 + 2 + 4 + 8. If we multiply this sum by 2, what do we get, and how do the terms change?',
    ladder: ['Write 2·(1 + 2 + 4 + 8).', 'Distribute the 2 over each term.', 'You get 2 + 4 + 8 + 16 — what do you notice about the two sums?'],
    $kw: t => /(2\s?\+\s?4|4\s?\+\s?8|16|shift|move|one place|next|doubl)/.test(t)
  },
  'I-P': {
    text: 'Find the sum 1 + 2 + 4 + 8.',
    ladder: ['You can add them directly.', 'Or write S = 1 + 2 + 4 + 8 and 2S = 2 + 4 + 8 + 16.', 'Subtract: 2S − S = 16 − 1.']
  },
  'I-R': {
    text: 'Check the previous sum in two ways: by adding directly and by the `2S − S` method. Do the answers agree?',
    ladder: ['What did you get by adding directly?', 'What did you get by the `2S − S` method?', 'Are the two results the same?'],
    $kw: t => /15/.test(t) && /(yes|match|same|equal|agree|coincid)/.test(t),
    $kwPart: t => /(15|match)/.test(t)
  },
  'II-D': {
    text: 'When deriving the sum of the first `n` terms of a geometric progression, why is it useful to multiply `S_n` by `q`?',
    ladder: ['Write `S_n` = `b_1` + `b_1q` + … + `b_1q^{n-1}`.', 'Now multiply both sides by q.', 'When you subtract, which middle terms cancel?'],
    $kw: t => /(term|shift|move|match|coincid|cancel|subtract)/.test(t) && /(\bq|ratio)/.test(t),
    $kwPart: t => /(subtract|match|coincid|shift|cancel)/.test(t)
  },
  'II-P1': {
    text: 'In a geometric progression `b_1` = 3, `q` = 2 and `n` = 5. Find the sum of the first 5 terms.',
    'check.errors.0.follow': 'The formula contains `q^n − 1`. What is 2^5 − 1?',
    ladder: ['What is `2^5`?', 'Use `S_n` = `b_1`(`q^n` − 1)/(`q` − 1).', 'Compute 3·(32 − 1)/(2 − 1).']
  },
  'II-P2': {
    text: 'Complete the formula: if `q` ≠ 1, the sum of the first `n` terms of a geometric progression is `S_n` = …',
    ladder: ['After subtracting we obtain (`q` − 1)`S_n` = `b_1`(`q^n` − 1).', 'Divide both sides by `q` − 1.', 'You get `S_n` = `b_1`(`q^n` − 1)/(`q` − 1), `q` ≠ 1.'],
    $kw: t => /(s|sum)/.test(t) && /(b_?1|b₁|first)/.test(t) && /q/.test(t) && /n/.test(t) && /(q\s*-\s*1|q−1|q − 1|1\s*-\s*q|1−q|1 − q)/.test(t)
  },
  'II-R': {
    text: 'Test the formula on the small example 1, 2, 4, 8 (`b_1` = 1, `q` = 2, `n` = 4). What do you get?',
    ladder: ['Substitute `b_1` = 1, `q` = 2, `n` = 4.', 'What is 2^4 − 1?', 'Divide by 2 − 1.']
  },
  'III-D': {
    text: 'Explain step by step how the formula `S_n` = `b_1`(`q^n` − 1)/(`q` − 1) is obtained from `S_n` = `b_1` + `b_1q` + … + `b_1q^{n-1}`.',
    ladder: ['First multiply both sides by q.', 'Then subtract the original Sₙ. Which terms cancel?', 'You get (`q` − 1)`S_n` = `b_1`(`q^n` − 1); then divide by `q` − 1.'],
    $kw: t => /(q.*s|qs|multipl)/.test(t) && /subtract/.test(t) && /(q\s*-\s*1|q−1|q − 1|divid)/.test(t),
    $kwPart: t => /(multipl|subtract|divid)/.test(t)
  },
  'III-P1': {
    text: 'In a geometric progression `b_1` = 5, `q` = 3 and `n` = 6. Find `S_6`.',
    ladder: ['What is `3^6`?', 'Compute 5·(729 − 1)/(3 − 1).', '728/2 = 364; now 364·5.']
  },
  'III-P2': {
    text: 'If `q` = 1, what is the sum of the first `n` terms of a geometric progression? Explain why.',
    ladder: ['If q = 1, what does each term equal?', 'How many equal terms are there?', 'Therefore `S_n` = `n`·`b_1`.'],
    $kw: t => /(n\s*[·*×]?\s*b|b_?1?\s*[·*×]?\s*n\b|n times b)/.test(t) && /(\ball\b|same|equal|identical|q.*1)/.test(t),
    $kwPart: t => /(n\s*[·*×]?\s*b|n times b|\ball\b|same|identical)/.test(t)
  },
  'III-R': {
    text: 'When would you use the form `S_n` = `b_1`(`q^n` − 1)/(`q` − 1), when its equivalent form `b_1`(1 − `q^n`)/(1 − `q`), and how would you check your answer?',
    ladder: ['Both forms give the same value for q ≠ 1.', 'If 0 < q < 1, which form might read more naturally?', 'For small n you can check by adding directly.']
  }
};
