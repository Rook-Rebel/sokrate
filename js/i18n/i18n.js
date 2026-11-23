'use strict';
/* Kapanadze AI–Socrates · internationalisation core (ქართული | English).
 *
 * Georgian is the source language. Question banks, dialogue state, logs and the archive keep
 * their Georgian source strings, so switching the language never changes a session, a score or
 * stored research data. English is a translation layer applied when something is shown:
 *
 *   T(ka, params)  interface text. `ka` is the Georgian source string (the translation key);
 *                  `{name}` placeholders are filled from `params` in either language.
 *   TX(s)          learning content: question texts, Socratic prompts, follow-up questions,
 *                  explanations. Looked up in the content index built from js/i18n/en/*.js,
 *                  including composite strings (prefix + content). Unknown text, e.g. a
 *                  student's own answer, is returned unchanged.
 *   TXP(s)         the same for plain-text (CSV/log) versions of content strings.
 *
 * The chosen language is stored in localStorage and reflected in <html lang>.
 */
const I18N = (() => {
  const STORE = 'kapanadze-sokrate-lang';
  const ui = Object.create(null);          // ka → en (interface)
  const content = Object.create(null);     // ka → en (learning content, exact strings)
  const contentPlain = Object.create(null);// plain(ka) → plain(en), for exports
  const prefixes = [];                     // [kaPrefix, enPrefix] for composite content strings
  const patterns = [];                     // [RegExp, (match) => en]
  const missing = new Set();               // ka strings shown in English mode without a translation
  const listeners = [];

  let lang = 'ka';
  try { const v = localStorage.getItem(STORE); if (v === 'en' || v === 'ka') lang = v; } catch (e) { /* storage unavailable */ }

  const fill = (s, p) => p ? String(s).replace(/\{(\w+)\}/g, (m, k) => (k in p ? p[k] : m)) : String(s);

  function T(ka, params) {
    if (lang === 'ka') return fill(ka, params);
    const en = ui[ka];
    if (en === undefined) { missing.add(ka); return fill(ka, params); }
    return fill(en, params);
  }

  function TX(s) {
    if (lang === 'ka' || s == null) return s;
    const str = String(s);
    if (str in content) return content[str];
    for (const [ka, en] of prefixes) if (str.startsWith(ka)) return en + TX(str.slice(ka.length));
    for (const [re, fn] of patterns) { const m = str.match(re); if (m) return fn(m); }
    if (/[Ⴀ-ჿ]/.test(str)) missing.add(str);
    return str;
  }

  function TXP(s) {
    if (lang === 'ka' || s == null) return s;
    const str = String(s);
    if (str in contentPlain) return contentPlain[str];
    for (const [ka, en] of prefixes) if (str.startsWith(ka)) return en + TXP(str.slice(ka.length));
    for (const [re, fn] of patterns) { const m = str.match(re); if (m) return fn(m); }
    return str;
  }

  function apply() {
    document.documentElement.lang = lang === 'en' ? 'en' : 'ka';
  }

  function setLang(next) {
    if (next !== 'ka' && next !== 'en') return;
    if (next === lang) return;
    lang = next;
    try { localStorage.setItem(STORE, lang); } catch (e) { /* storage unavailable */ }
    apply();
    listeners.forEach(fn => fn(lang));
  }

  return {
    T, TX, TXP, setLang, apply,
    get lang() { return lang; },
    onChange(fn) { listeners.push(fn); },
    addUI(map) { Object.assign(ui, map); },
    addContent(ka, en, plainFn) {
      if (typeof ka !== 'string' || typeof en !== 'string') return;
      content[ka] = en;
      if (plainFn) contentPlain[plainFn(ka)] = plainFn(en);
    },
    addPrefix(ka, en) { prefixes.push([ka, en]); },
    addPattern(re, fn) { patterns.push([re, fn]); },
    hasUI: ka => ka in ui,
    hasContent: ka => ka in content,
    missing
  };
})();
const T = I18N.T, TX = I18N.TX, TXP = I18N.TXP;
const isEN = () => I18N.lang === 'en';
