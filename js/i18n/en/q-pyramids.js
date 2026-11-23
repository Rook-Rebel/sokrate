'use strict';
/* English · ancient Egyptian pyramids — history (Georgian source: OFFLINE_BANKS.pyramids) */
EN.q.pyramids = {
  P1: {
    skill: 'Geography: Egypt',
    intro: 'First, let us recall the knowledge we will need to understand the pyramids.',
    text: 'On which continent is Egypt located?',
    'check.errors.0.follow': 'Look at a map: on which shore of the Mediterranean Sea is most of Egypt — the southern or the northern? (The Sinai Peninsula is in Asia, but what about the rest of the country?)',
    reveal: 'Egypt is in north-eastern Africa; only the Sinai Peninsula belongs to Asia.',
    ladder: ['On which shore of the Mediterranean Sea is Egypt?', 'To its west is Libya, to its south Sudan. On which continent are these countries?', 'On which continent is the Sahara Desert?'],
    $kw: t => /africa/.test(t),
    $re: { 0: /^\s*(asia|europe)/ }
  },
  P2: {
    skill: 'The Nile and civilisation',
    text: 'Which river flows through Egypt, and why was it so important for the people who lived there?',
    reveal: 'The Nile. In a desert country it was the source of water and food: the annual flood left fertile silt, and the river was the main road — boats carried even stone blocks.',
    ladder: ['On a map of Egypt, which river runs the length of the country?', 'Egypt is mostly desert. Where was it possible to farm the land?', 'What did the river leave on the fields after the annual flood?'],
    $kw: t => /nile/.test(t) && /(water|fertil|silt|mud|flood|harvest|crop|farm|agricult|transport|boat|ship|irrigat|drink|food)/.test(t),
    $kwPart: t => /(nile|water|fertil)/.test(t)
  },
  P3: {
    skill: 'Chronology: BC',
    text: 'Khufu’s Great Pyramid was built around 2560 BC. Roughly how many years ago was that (counting from 2026)?',
    'check.errors.0.follow': '2560 BC is before the start of our era. First, how many years passed from 2560 BC to the start of the era, and then from the start of the era to today?',
    reveal: 'From a BC date to today: 2560 + 2026 ≈ 4586 years, i.e. about 4.6 thousand years. (There is no year zero, but for an estimate this changes nothing.)',
    ladder: ['“BC” means: before the start of our era. How many years are there from 2560 BC to the start of the era?', 'How many years are there from the start of the era to today?', 'Add them up: 2560 + 2026 ≈ ?']
  },
  P4: {
    skill: 'The pharaoh',
    text: 'Who was the pharaoh?',
    reveal: 'The pharaoh was the king of ancient Egypt; the Egyptians regarded him as a divine ruler.',
    ladder: ['The pharaoh was the … of ancient Egypt. Who ruled the country?', 'Compare: in Georgia there was a king, in Egypt — ?', 'How did the Egyptians treat the pharaoh — as an ordinary person?'],
    $kw: t => /(king|ruler|\brule|monarch|sovereign|emperor|head of state|leader)/.test(t),
    $kwPart: t => /(egypt|\bgod|divine)/.test(t)
  },
  P5: {
    skill: 'Historical source',
    text: 'What is a historical source? Give one example.',
    reveal: 'A historical source is anything that has survived from the past and gives us information about it: a building, an object, an inscription, a papyrus, a painting, a chronicler’s writing. Historians draw their conclusions from sources.',
    ladder: ['How do we know how people lived 4000 years ago?', 'What does an archaeologist find in the ground?', 'Name one object or document that tells us about the past.'],
    $kw: t => /(object|item|artefact|artifact|remains|document|letter|inscription|chronicle|annals|building|structure|papyr|painting|drawing|picture|photo|memoir|manuscript|monument|coin|tool|pottery|tomb|diary)/.test(t),
    $kwPart: t => /(source|past|information|evidence)/.test(t)
  },
  'I-D': {
    text: 'What was the main purpose of the Egyptian pyramids?',
    'check.errors.0.follow': 'What stood inside the pyramid, in the royal chamber: an altar or a stone sarcophagus (a coffin)?',
    reveal: 'The pyramids were the tombs (funerary monuments) of the pharaohs. The Egyptians believed in life after death, so they mummified the pharaoh’s body and laid it to rest in an eternal, indestructible “house”.',
    ladder: ['Inside Khufu’s pyramid, in the “King’s Chamber”, there is a stone sarcophagus. What is a sarcophagus used for?', 'For whom was each pyramid built?', 'What did the Egyptians believe happens after death?'],
    $kw: t => /(tomb|grave|burial|buried|bury|sepulch)/.test(t) && /(pharaoh|king|ruler)/.test(t),
    $kwPart: t => /(tomb|grave|burial|buried|pharaoh)/.test(t),
    $re: { 0: /^(?!.*(tomb|grave|burial|buried)).*(temple|worship|pray|church|shrine)/ }
  },
  'I-P': {
    text: 'Where are the three most famous great pyramids, and to which pharaoh does the largest of them belong?',
    'check.errors.0.follow': 'Tutankhamun lived much later (14th century BC), and his tomb is in the Valley of the Kings, not in a pyramid. Which pharaohs were buried at Giza?',
    reveal: 'At Giza, near Cairo: the pyramids of Khufu (Cheops), Khafre and Menkaure. The largest is Khufu’s “Great Pyramid” — originally about 146 m high.',
    ladder: ['The three great pyramids stand on one plateau near Cairo, the capital of Egypt. What is it called?', 'The pyramids of Giza belong to three pharaohs: Khufu, Khafre and Menkaure. The Greeks called Khufu “Cheops”.', 'Which of them is the tallest — the “Great Pyramid”?'],
    $kw: t => /giza/.test(t) && /(khufu|cheops|chufu)/.test(t),
    $kwPart: t => /(giza|khufu|cheops|cairo)/.test(t),
    $re: { 0: /(tutankhamun|tutankhamen|tutankamun)/ }
  },
  'I-R': {
    text: 'A pupil says: “The pyramids were built by slaves — I saw it in films.” Is a film enough to support such a conclusion? Which sources would we use to check this claim?',
    'check.errors.0.follow': 'Was the film-maker present when the pyramids were built? Where could they have learned this from?',
    reveal: 'A film is not a source — it is the author’s imagination. A claim is checked against evidence: archaeological excavations (the workers’ settlement and tombs at Giza), inscriptions and papyri, and scholarly research.',
    ladder: ['Did the film-maker see the construction themselves? Where do they get their information?', 'What might archaeologists find where the builders lived?', 'Name two sources that are more reliable than a film.'],
    $kw: t => /(\bno\b|\bnot\b|isn'?t|cannot|can'?t|insufficient|not enough)/.test(t) && /(archaeolog|archeolog|excavat|\bdig|inscription|remains|village|settlement|tomb|grave|source|papyr|scien|research|stud)/.test(t),
    $kwPart: t => /(source|archaeolog|archeolog|check|verif|film|movie)/.test(t),
    $re: { 0: /^\s*(yes|yeah|it is enough|enough|sufficient)/ }
  },
  'II-D': {
    text: 'How did the shape of the pyramid change, from Djoser’s step pyramid to the smooth-sided pyramids of Giza? Name at least two stages.',
    reveal: 'Mastaba (a flat-roofed tomb) → Djoser’s step pyramid at Saqqara (architect Imhotep; in effect mastabas stacked on top of each other, c. 2670 BC) → Sneferu’s experiments at Dahshur (the “Bent” and the “Red” pyramids) → the smooth pyramids of Giza (c. 2560 BC).',
    ladder: ['Djoser’s pyramid looks like several “steps” stacked on top of each other. Where did this shape come from?', 'Between Djoser and Khufu, the pharaoh Sneferu tried several pyramids. What is the “Bent” pyramid, and why is it called that?', 'Put in order: Djoser’s step pyramid → Sneferu’s experiments → … ?'],
    $kw: t => /(step|djoser|zoser|mastaba|imhotep)/.test(t) && /(smooth|sneferu|snefru|bent|slop|\bred\b|giza|khufu|true pyramid)/.test(t),
    $kwPart: t => /(step|djoser|zoser|mastaba|smooth|sneferu|snefru)/.test(t)
  },
  'II-P': {
    text: 'The Great Pyramid was built around 2560 BC. Lincoln Cathedral in England exceeded it in height around 1311 AD. For roughly how many years was the Great Pyramid the tallest structure in the world?',
    'check.errors.0.follow': 'One date is BC, the other AD. In such a case, are the years subtracted or added? Recall P3.',
    reveal: '2560 (BC) + 1311 (AD) ≈ 3870 years — almost four millennia.',
    ladder: ['How many years are there from 2560 BC to the start of our era?', 'How many years are there from the start of the era to 1311?', 'Add these two numbers.']
  },
  'II-P2': {
    text: 'The Great Pyramid contains about 2.3 million stone blocks. If construction took about 20 years, roughly how many blocks had to be laid on average per day? (365 days a year)',
    'check.errors.0.follow': 'That is the number of blocks per year. We want one day — by what else must you divide?',
    'check.errors.1.follow': '7300 is the number of days in 20 years. Now divide the blocks by this number.',
    reveal: '20 years have about 20 · 365 = 7300 days; 2 300 000 ÷ 7300 ≈ 315 blocks per day. This is a rough estimate — it helps us imagine the scale of the work.',
    ladder: ['First find how many days there are in 20 years.', '20 · 365 = 7300. Now what must be divided by what?', '2 300 000 ÷ 7300 ≈ ? (you may round: 2 300 000 ÷ 7000)']
  },
  'II-R': {
    text: '~300 blocks a day means that, in a 10-hour working day, one block had to be laid roughly every 2 minutes. What does this tell us about the number of builders and how the work was organised? What further information would you need to check your conclusion?',
    reveal: 'Such a pace means that thousands of workers worked simultaneously in many teams, and precise planning was needed: quarrying, transport, food, housing. It is checked against sources: the size of the workers’ settlement, the tombs, administrative papyri.',
    ladder: ['Could a single team lay one block every 2 minutes? What must have happened?', 'If many teams worked at the same time, what would they need: food, housing, leadership…', 'Which archaeological find would tell us how many people lived near the construction site?'],
    $kw: t => /(many|thousand|organi[sz]|group|gang|crew|team|simultaneous|at the same time|parallel|plan)/.test(t) && /(source|archaeolog|archeolog|information|data|evidence|check|verif|additional|how many workers|tomb|settlement|village|papyr|record)/.test(t),
    $kwPart: t => /(many|organi[sz]|group|team|simultaneous|source)/.test(t)
  },
  'III-D': {
    text: 'How were the heavy stones transported? Name at least two methods and, for each, the evidence that exists for it.',
    reveal: 'Sledges (wooden runners) on wetted sand — a painting in the tomb of Djehutihotep shows water being poured in front of a sledge; experiments have confirmed that wet sand greatly reduces friction. Boats on the Nile and canals — the “Diary of Merer” found at Wadi al-Jarf (the oldest known papyri) describes shipping Tura limestone to Giza. Ramps (inclines) — their remains survive, although their exact form is still debated.',
    ladder: ['Wheeled carts were not used for heavy stones. On what could a block have been placed to drag it over sand?', 'An Egyptian tomb painting shows a man pouring water in front of a sledge. Why?', 'Along which “road” were stones brought from far away? (Recall P2.)'],
    $kw: t => /(sledge|sled|wedge|sand|water|ramp|incline|boat|barge|ship|nile|canal|lever|roller)/.test(t) && /(painting|picture|depict|image|relief|papyr|merer|excavat|remains|archaeolog|archeolog|tomb|research|stud|experiment)/.test(t),
    $kwPart: t => /(sledge|sled|ramp|boat|barge|nile|water)/.test(t)
  },
  'III-P': {
    text: 'Near Giza archaeologists discovered a workers’ settlement (bakeries, food remains including many cattle bones) and workers’ tombs next to the pyramids. What can we conclude from these sources about the builders?',
    reveal: 'These sources suggest that the builders were probably organised, well-fed and respected workers (permanent craftsmen and seasonal labourers), not the “slaves” of the films: they were fed meat, had bakeries, and were buried with honour next to the pharaoh’s pyramid.',
    ladder: ['Would a slave have been buried with honour next to the pharaoh’s pyramid?', 'What do many cattle bones tell us about the workers’ diet?', 'What follows: who were the builders?'],
    $kw: t => /slave/.test(t) && /(\bnot\b|\bno\b|less|unlikely|weren'?t|were not)/.test(t) || /(wage|\bpaid|\bpay|hired|respect|honou?r|well[ -]fed|meat|beef|organi[sz]|craftsm|artisan|skilled|specialist|season)/.test(t),
    $kwPart: t => /(worker|labou?r|food|tomb|lived|living)/.test(t)
  },
  'III-D2': {
    text: 'There are also pyramids in Mexico and Central America (e.g. Teotihuacan, Chichén Itzá) and in Sudan. A pupil says: “Every pyramid is a tomb.” Do you agree? How do Mesoamerican pyramids differ from Egyptian ones?',
    'check.errors.0.follow': 'What stood on top of the Mesoamerican pyramids? Is there a flat platform with a temple there, or a pointed apex?',
    reveal: 'I do not agree: Mesoamerican pyramids are mostly stepped platforms with a staircase and a temple on a flat top — for rituals (although in some, e.g. at Palenque, a ruler’s tomb was also found). Egyptian pyramids are smooth-sided, pointed tombs. The pyramids of Sudan (Nubia) are also tombs. Conclusion: the shape is similar, the purpose differs.',
    ladder: ['In a picture of the pyramid at Chichén Itzá, what can you see on its side and on its top?', 'What was the temple on the top used for?', 'Complete: Egypt — …, Mesoamerica — mostly … .'],
    $kw: t => /(\bno\b|\bnot\b|disagree|don'?t agree)/.test(t) && /(temple|ritual|sacrific|altar|step|stair|summit|\btop\b|flat|platform)/.test(t),
    $kwPart: t => /(temple|ritual|step|stair|\bno\b)/.test(t),
    $re: { 0: /^\s*(yes|yeah|i agree|agree)/ }
  },
  'III-R': {
    text: 'Look back at this dialogue: which question made you think the most? What helped you — a source, a map, a calculation or a comparison? And how do you now tell reliable information from a myth?',
    ladder: ['Which question surprised you or was difficult?', 'What helped you: thinking of a source, a calculation, a comparison?', 'Next time, how will you check an “interesting fact” you find on the internet?']
  },
  F1: {
    intro: '<b>Final independent check.</b> There are no hints here any more — one attempt per question.',
    text: 'In one or two sentences, explain why the Egyptians built pyramids.',
    reveal: 'As tombs for the pharaohs — because of their belief in an eternal life after death.',
    $kw: t => /(tomb|grave|burial|buried|bury)/.test(t) && /(after ?life|after death|eternal|pharaoh|king|next world|hereafter)/.test(t),
    $kwPart: t => /(tomb|grave|burial|pharaoh)/.test(t)
  },
  F2: {
    text: 'Djoser’s pyramid was built around 2670 BC, Khufu’s around 2560 BC. Roughly how many years older is Djoser’s pyramid?',
    reveal: 'Both dates are BC, so: 2670 − 2560 ≈ 110 years.'
  },
  F3: {
    text: 'How would you check the claim you saw on the internet that “the pyramids were built by aliens”? Name two concrete steps.',
    reveal: 'For example: (1) find out who the author is and what evidence they offer; (2) compare it with the archaeological data — the workers’ settlement, the tombs, the quarries, the tools, the Merer papyri, and unfinished pyramids that show the building process.',
    $kw: t => /(source|scien|archaeolog|archeolog|evidence|proof|author|compar|reliab|credib|trust|expert|research|stud|excavat|papyr|tomb)/.test(t) && t.length >= 40
  }
};
