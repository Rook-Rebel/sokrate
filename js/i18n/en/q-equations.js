'use strict';
/* English · equations for grade 5 and linear equations (Georgian source: OFFLINE_BANKS.grade5_eq, .linear_eq) */
EN.q.grade5_eq = {
  P1: {
    text: 'What is 15 − 7?',
    skill: 'The link between addition and subtraction',
    ladder: ['What number must you add to 7 to get 15?', 'Use 7 + □ = 15.', 'Count seven steps back from 15.']
  },
  'I-D': {
    text: 'What does x stand for in the equality x + 4 = 11?',
    skill: 'Understanding the unknown',
    ladder: ['Which part of the equality do we not know?', 'Is x a number or an operation sign?', 'What must we find so that the equality is true?'],
    $kw: t => /(unknown|number|value)/.test(t),
    $kwPart: t => /(\bx\b|looking for|find|search)/.test(t)
  },
  'I-P': {
    text: 'Solve: x + 4 = 11. Write the value of x.',
    'check.errors.0.follow': 'If x = 15, what is 15 + 4? Is it 11?',
    skill: 'Solving a simple equation',
    ladder: ['What must be added to 4 to get 11?', 'Fill in: □ + 4 = 11.', 'What is 11 − 4?']
  },
  'I-R': {
    text: 'Check: if x = 7, what is x + 4?',
    skill: 'Checking an answer',
    ladder: ['Substitute 7 for the letter x.', 'Which operation is there between 7 and 4?', 'What is 7 + 4?']
  },
  'II-D': {
    text: 'How do we find the unknown addend in the equality x + 9 = 17? Describe the operation.',
    skill: 'Rule for finding an unknown addend',
    ladder: ['Which operation is the inverse of addition?', 'Which known number must we subtract from the sum?', 'Which operation gives us x?'],
    $kw: t => /(subtract|take away|minus|17\s?[-−]\s?9|known.*(addend|term)|sum.*(addend|term))/.test(t),
    $kwPart: t => /(subtract|take away|minus|17|9)/.test(t)
  },
  'II-P': {
    text: 'Solve: 3x = 18.',
    skill: 'Finding an unknown factor',
    ladder: ['What does 3x mean?', '18 is three times which number?', 'What is 18 ÷ 3?']
  },
  'II-R': {
    text: 'A classmate wrote: 3x = 18, so x = 15. Is that correct? What do you get if you multiply 15 by three?',
    skill: 'Finding a mistake by substitution',
    ladder: ['Substitute x = 15 into the left-hand side of the equality.', 'Compute 3 · 15.', 'Is this result equal to 18?']
  },
  'III-P': {
    text: 'Solve: 2x + 3 = 15.',
    'check.errors.0.follow': 'Check: is 2 · 9 + 3 equal to 15?',
    skill: 'Solving an equation in two operations',
    ladder: ['What must 2x be so that 2x + 3 = 15?', '2x = 12. 12 is twice which number?', 'What is 12 ÷ 2?']
  },
  'III-R': {
    text: 'Which question was difficult for you? How did you check your answer?',
    skill: 'Metacognitive reflection',
    ladder: ['Name one difficult question.', 'What helped you: subtraction, division or an example?', 'How did you check the value of x in the original equality?']
  }
};

EN.q.linear_eq = {
  P1: {
    skill: 'Subtraction',
    text: 'What is 12 − 5?',
    'check.errors.0.follow': 'You added. What does the sign “−” ask you to do?',
    reveal: '12 − 5 = 7. Check: 7 + 5 = 12.',
    ladder: ['If we take 5 away from 12, how many are left?', '10 − 5 = 5. Now add 2 more.', 'You had 12 apples and ate 5. How many are left?']
  },
  P2: {
    skill: 'Multiplication',
    text: 'What is 3 · 4?',
    'check.errors.0.follow': 'You added. “·” means multiplication: 4 + 4 + 4 = ?',
    'ladder.0': '3 · 4 means 4 taken three times.',
    'ladder.2': 'There are 4 apples in each of 3 boxes. How many are there in total?'
  },
  P3: {
    skill: 'Substituting into an expression',
    text: 'If x = 2, what is 3x + 1?',
    'check.errors.0.follow': '3x means 3 · x, not writing the digits next to each other. What is 3 · 2?',
    'check.errors.1.follow': '3 · 2 = 6. Now what is left: + 1?',
    'check.errors.2.follow': 'Which operation is carried out first: 3 · 2 or 2 + 1?',
    reveal: '3 · 2 + 1 = 6 + 1 = 7. 3x means 3 · x; multiplication is carried out before addition.',
    'ladder.0': '3x means 3 · x. Substitute x = 2.'
  },
  P4: {
    skill: 'Division',
    'check.errors.0.follow': 'You subtracted. What does “÷” mean? Which number must be multiplied by 3 to get 18?',
    reveal: '18 ÷ 3 = 6, because 6 · 3 = 18.',
    'ladder.0': 'Which number must be multiplied by 3 to get 18?',
    'ladder.2': 'Share 18 sweets equally among 3 children.'
  },
  P5: {
    skill: 'Understanding brackets',
    text: 'If x = 4, what is 2(x + 3)?',
    'check.errors.0.follow': 'The brackets mean that the whole sum x + 3 is multiplied by 2. First, what is 4 + 3?',
    'check.errors.1.follow': '2(x + 3) means 2 · (x + 3). What is 4 + 3, and then 2 · 7?',
    reveal: '2(4 + 3) = 2 · 7 = 14. The sum in brackets is multiplied by 2 as a whole: 2(x + 3) = 2x + 6.',
    ladder: ['First compute the brackets: 4 + 3.', 'Now 2 · 7 = ?', '2(x + 3) = 2x + 6. Substitute x = 4: 8 + 6 = ?']
  },
  'I-D': {
    text: 'Explain in your own words: what is an equation, and what are we looking for in it?',
    reveal: 'An equation is an equality that contains an unknown number (x). We look for the value of x that makes the equality true when it is substituted.',
    ladder: ['Which sign appears in every equation, and what does it mean?', 'In x + 5 = 12, which number is unknown?', 'Try x = 3 and x = 7. Which one makes the equality true?'],
    $kw: t => /(equal|equality|same|balance)/.test(t) && /(unknown|\bx\b|value|number)/.test(t),
    $kwPart: t => /(equal|unknown|\bx\b)/.test(t)
  },
  'I-P': {
    text: 'Solve: x + 5 = 12.',
    'check.errors.0.follow': 'Substitute your answer: 17 + 5 = ? Is it 12?',
    reveal: 'Subtract 5 from both sides: x + 5 − 5 = 12 − 5, x = 7. Check: 7 + 5 = 12.',
    'ladder.0': 'To which number must 5 be added to get 12?',
    'ladder.1': 'Subtract 5 from both sides. What remains on the left?'
  },
  'I-R': {
    text: 'If you got x = 7, substitute it into x + 5. What do you get?',
    reveal: '7 + 5 = 12 — the left-hand side equals the right-hand side, so x = 7 is correct. Every solution is checked like this.',
    'ladder.0': 'Write 7 instead of x: 7 + 5.',
    'ladder.2': 'Is the number you obtained equal to the right-hand side of the equation?'
  },
  'II-D': {
    text: 'Why is the equality preserved when we perform the same operation on both sides of an equation?',
    reveal: 'If two numbers are equal, they remain equal after the same change (a balance stays balanced). That is why the new equation has the same solution.',
    ladder: ['Each pan of a balance holds 5 kg. What happens if we add 2 kg to both?', 'And if we add it to only one of them?', 'If a = b, are a + 3 and b + 3 equal?'],
    $kw: t => /both/.test(t) && /(equal|same|balance|scale)/.test(t),
    $kwPart: t => /(both|equal|balance|scale)/.test(t)
  },
  'II-P': {
    text: 'Solve: 3x + 5 = 20.',
    'check.errors.0.follow': '3x = 15 is a correct step. But we are looking for x, not 3x. What should we do now?',
    'check.errors.1.follow': 'Substitute your answer: is 3 · x + 5 = 20? What should we “remove” from x first — the + 5 or the · 3?',
    'check.errors.2.follow': 'Substitute x = 25: 3 · 25 + 5 = ? Is it 20?',
    reveal: '3x + 5 = 20 → (subtract 5 from both sides) 3x = 15 → (divide both sides by 3) x = 5. Check: 3 · 5 + 5 = 20.',
    ladder: ['What should we “move away” from 3x first: the + 5?', 'Subtract 5 from both sides: 3x = ?', '3x = 15. Which number must be multiplied by 3 to get 15?']
  },
  'II-R': {
    text: 'Check x = 5 in the equation 3x + 5 = 20. What is the left-hand side?',
    'check.errors.0.follow': '3x = 3 · 5, not 35. What is 3 · 5 + 5?',
    reveal: '3 · 5 + 5 = 15 + 5 = 20 = the right-hand side. The solution is correct.',
    'ladder.0': 'Substitute 5 for x: 3 · 5 + 5.',
    'ladder.2': '15 + 5 = ? Compare it with the right-hand side.'
  },
  'III-D': {
    text: 'Explain why we cannot add a number to, or subtract it from, only one side of an equation and leave the other side unchanged.',
    reveal: 'Changing only one side breaks the equality, and the new equation will have a different solution. For example, in x + 5 = 12, subtracting 5 only on the left gives x = 12, but 12 + 5 ≠ 12.',
    ladder: ['In x + 5 = 12, subtract 5 only on the left. What do you get for x?', 'Substitute this x into the original equation. Does it hold?', 'What happens if we take a weight off only one pan of a balance?'],
    $kw: t => /(equal|same|balance|scale)/.test(t) && /(both|break|broken|chang|no longer|unbalanc|destroy|violat)/.test(t),
    $kwPart: t => /(equal|both|balance|scale)/.test(t)
  },
  'III-P': {
    text: 'Solve: 2(x − 3) + 5 = 17.',
    'check.errors.0.follow': 'Check how you expanded the brackets: is 2(x − 3) = 2x − 3 or 2x − 6?',
    'check.errors.1.follow': 'Where did the + 5 go? Substitute your answer into the original equation.',
    'check.errors.2.follow': 'From x − 3 = 6, x = ? Substitute your answer: 2(3 − 3) + 5 = ?',
    'check.errors.3.follow': '2(x − 3) = 12 is a correct step. But we are looking for x. Carry on.',
    reveal: '2(x − 3) + 5 = 17 → 2(x − 3) = 12 → x − 3 = 6 → x = 9. Or: 2x − 6 + 5 = 17 → 2x − 1 = 17 → 2x = 18 → x = 9. Check: 2(9 − 3) + 5 = 17.',
    ladder: ['What should we move away first: the + 5? Subtract 5 from both sides.', '2(x − 3) = 12. Divide both sides by 2.', 'x − 3 = 6. From which number must 3 be subtracted to get 6?']
  },
  'III-R': {
    text: 'Which step was the most difficult? How did you check that the x you found is correct?',
    ladder: ['On which equation did you spend the longest?', 'What helped you: the balance model, working backwards, writing down the steps?', 'How did you check? Did you substitute x into the original equation?']
  }
};
