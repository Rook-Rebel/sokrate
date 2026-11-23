'use strict';
/* Kapanadze AI–Socrates · English learning-content layer.
 *
 * EN.q[bank][questionId] mirrors a Georgian question in js/data/banks.js. Each key is a path
 * in the Georgian question object ('text', 'intro', 'skill', 'answer', 'check.errors.0.follow',
 * …); an array value maps element-wise ('ladder' → ladder.0, ladder.1, ladder.2). A Georgian
 * string that occurs in several questions is translated once, at its first occurrence.
 *
 * Keys that start with $ are additional English answer checks, used only in English mode and
 * always together with the original Georgian checks (they never replace them):
 *   $kw, $kwPart  text answers (same meaning as check.kw / check.kwPart);
 *   $alt          numeric questions that also accept a verbal answer (check.alt);
 *   $re           { errorIndex: RegExp } for check.errors[i].re (typical-error patterns).
 * The mathematical criteria (expected numbers, formulas, expressions) are not duplicated:
 * they are language-independent and stay exactly as in the Georgian bank.
 */
const EN = { q: {}, err: {}, topics: {}, other: {}, theory: {}, cards: {}, compName: {} };

function contentBanks() { return Object.assign({ ap: DEFAULT_Q }, OFFLINE_BANKS); }
function pathGet(obj, path) { return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj); }

function registerContent() {
  for (const [bank, qs] of Object.entries(contentBanks())) {
    const tr = EN.q[bank] || {};
    for (const q of qs) {
      const e = tr[q.id];
      if (!e) continue;
      for (const [k, v] of Object.entries(e)) {
        if (k[0] === '$') continue;
        if (Array.isArray(v)) v.forEach((x, i) => I18N.addContent(pathGet(q, k + '.' + i), x, plain));
        else I18N.addContent(pathGet(q, k), v, plain);
      }
    }
  }
  for (const [k, v] of Object.entries(EN.err)) if (ERR[k]) I18N.addContent(ERR[k], v, plain);
  for (const [k, card] of Object.entries(EN.cards)) if (THEORY_CARDS[k]) {
    I18N.addContent(THEORY_CARDS[k].title, card.title);
    I18N.addContent(THEORY_CARDS[k].html, card.html);
  }
}

/** English answer checks for the current question (English mode only), or null. */
function enChecks(q) {
  if (!isEN() || !q) return null;
  const bank = EN.q[offlineTopicKey(S.topic) || ''];
  return bank && bank[q.id] ? bank[q.id] : null;
}
