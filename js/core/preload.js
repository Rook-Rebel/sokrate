/* Kapanadze AI–Socrates · applies the saved language and colour theme before the first paint. */
(function () {
  try {
    var root = document.documentElement;
    var lang = localStorage.getItem('kapanadze-sokrate-lang');
    if (lang === 'en') root.lang = 'en';
    var theme = localStorage.getItem('kapanadze-sokrate-theme');
    if (theme === 'light' || theme === 'dark') root.setAttribute('data-theme', theme);
  } catch (e) { /* storage unavailable: defaults apply */ }
})();
