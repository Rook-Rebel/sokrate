# კაპანაძე AI–სოკრატე · Kapanadze AI–Socrates

**ქართული | English** · Live: <https://sokrate-gray.vercel.app>

## მოკლედ (ქართულად)

დიაგნოსტიკური სოკრატული დიალოგი მათემატიკასა და ისტორიაში — დავით კაპანაძის მეთოდოლოგია.
მოსწავლე გადის წინარე ცოდნას, I–III დონეებს (დეკლარაციული, პროცედურული და პირისეული /
მეტაკოგნიტური ცოდნა) და საბოლოო დამოუკიდებელ შემოწმებას. შეცდომისას იღებს საკონტროლო კითხვას,
„გავიჭედე“-ზე — სამსაფეხურიან დახმარებას; ბოლოს ლექტორი იღებს დიაგნოსტიკურ დასკვნას.

ვერსია **KA-5.1** ეფუძნება ავტორის გაერთიანებულ HTML პროგრამას (KA-5.0). მეთოდიკა, კითხვები,
შეფასების წესები და დასკვნის სტრუქტურა უცვლელია; დაემატა სრული ინგლისური ვერსია (ენის გადამრთველი
ზედა მარჯვენა კუთხეში), ახალი ვიზუალური დახვეწა, ნათელი/მუქი თემა და უსაფრთხო მათემატიკური პარსერი.

## What it is

A static web application for diagnostic Socratic dialogue, built on Davit Kapanadze’s
methodology. Each topic runs through prerequisite knowledge, Levels I–III (declarative,
procedural and personal/metacognitive knowledge) and a final independent check. Mistakes lead
to a control question, “I’m stuck” to a three-step ladder of help (directed question → partial
structure → analogous step → correct answer with self-explanation). After discoveries,
theoretical-conclusion cards are collected in “My notes”. The final report shows placement,
the zone of proximal development, help dose, confidence calibration and typical mistakes.

| Topic | Questions |
| --- | --- |
| Half-derivative (university) | 31 |
| Derivative without limits (grade 11 / university) | 29 |
| Arithmetic progression: n-th term | 17 |
| Arithmetic progression: sum of the first n terms | 16 |
| Geometric progression: n-th term | 19 |
| Geometric progression: sum of the first n terms | 16 |
| Equation in one unknown (grade 5) | 9 |
| Linear equation | 14 |
| Quadratic equation | 14 |
| Proportion | 14 |
| Linear function | 14 |
| The pyramids of Egypt (history) | 19 |

Each topic has a full theory page for the lecturer, and interactive plots where relevant
(line and parabola, tangent to x² and x³, half-derivative and the role of c₀).

## Bilingual system (ქართული | English)

- Georgian is the default; the choice is saved in `localStorage` (`kapanadze-sokrate-lang`)
  and set on `<html lang>`. Switching language re-renders the current screen only — the session,
  answers typed so far, scores and logs are untouched.
- **Centralised i18n** in `js/i18n/i18n.js`:
  - `T(ka, params)` — interface text; the Georgian source string is the key, `{name}` placeholders.
  - `TX(s)` / `TXP(s)` — learning content (questions, Socratic prompts, follow-ups, explanations),
    including composite strings; unknown text (e.g. a student’s answer) is returned unchanged.
- **Structured translations** in `js/i18n/en/`: `q-*.js` mirror every question of
  `js/data/banks.js` by id and field path (`text`, `ladder`, `check.errors.0.follow`, `reveal`, …);
  `theory-*.js`, `topics*.js` hold the theory pages, scenarios and typical-mistake labels;
  `ui.js` holds the interface dictionary.
- **English answers** are evaluated in English mode with the same mathematical criteria:
  English keyword checks (`$kw`, `$kwPart`, `$alt`, `$re`) are added to the original Georgian
  ones, English number words are recognised, and English prose is separated from formulas the
  same way the original separates Georgian prose. Georgian-mode evaluation is unchanged.
- The app keeps Georgian source values in its state and archive; CSV exports are translated
  when downloaded in English mode, and a `ui_lang` column records the session language.

## Structure

```
index.html                 page shell, header (language switch, theme), script order
css/styles.css             notebook design, light/dark theme, responsive layout, print
favicon.svg
js/core/preload.js         applies saved language/theme before first paint
js/core/safe-math.js       restricted expression compiler (replaces new Function)
js/core/mathtext.js        math-text helpers and answer parsing
js/data/banks.js           question banks (Georgian source of truth)
js/data/theory.ka.js       theory cards and theory pages (Georgian)
js/data/topics.js          scenarios and built-in topics
js/i18n/i18n.js            T / TX / TXP, language state
js/i18n/content.js         registers the English content layer, English answer checks
js/i18n/en/*.js            English translations (questions, theory, topics, interface)
js/components/plots.js     interactive SVG plots
js/components/start.js     lecturer panel, session setup, theory page
js/components/report.js    final report, research panel, CSV exports
js/app.js                  state, AI layer, evaluation, dialogue flow, question view, boot
vercel.json                security headers
```

No framework, no build step, no runtime dependencies (fonts from Google Fonts).

## AI layer

Inside the claude.ai artifact runtime (`window.claude`) the program can judge free-form answers,
write simpler questions and a report for the lecturer; prompts request replies in the current
interface language. On a normal website such as Vercel there is no AI connection and no API key:
the program runs in scripted mode (built-in questions, rule-based evaluation and report).
No secrets are stored in this repository.

## Security

- Students’ formulas are evaluated by `SafeExpr` (`js/core/safe-math.js`), a small parser for the
  exact arithmetic subset the original accepted; nothing is executed with `eval` or `new Function`.
  It was checked against the original behaviour on 120,000+ generated and real inputs.
- `vercel.json` sets `X-Content-Type-Options`, `Referrer-Policy` and a Content-Security-Policy that
  allows only the site’s own scripts and Google Fonts. The page has no inline scripts or styles.
  `frame-ancestors 'none'` blocks embedding; change it if you need to embed the site in an LMS.

## Run locally

```powershell
python -m http.server 8000
```

Open <http://localhost:8000>. Opening `index.html` directly also works.

## Deploy

The repository is connected to Vercel; every push to `main` deploys
<https://sokrate-gray.vercel.app>. Settings: Framework Preset **Other**, no build command,
output directory = repository root.

## Data and research use

- Everything is stored in the browser (`localStorage`): `kapanadze-ai-socrates-topic-v3` (current
  session), `kapanadze-ai-socrates-archive-v5` (completed sessions). No server.
- Exports: results by question, dialogue log, research data and session summary (CSV, UTF-8 with
  BOM). `*.csv` is in `.gitignore` so participant data is not committed by accident.
- The research comparison is descriptive; validate items and agree a protocol before field studies.

## Testing

Before release, the following was checked: every topic completed in both languages through the
real interface (correct answers, “I’m stuck”, control and simpler questions, revealed answers with
self-explanation, theory cards, plots, independent mode); no Georgian text in English mode on any
screen; switching language mid-session; persistence after reload; reports and CSV exports;
theory pages; light/dark themes; 375 px and 768 px layouts; keyboard and screen-reader basics;
no console errors under the production CSP. Georgian-mode evaluation was compared with the
original KA-5.0 program on 6,700+ answers with identical results.

## Previous version

The earlier English four-topic demonstrator is preserved as tag `v4.3-en-demo` and branch
`backup/en-demo-4.3`.

## Licence

© Davit Kapanadze. All rights reserved unless a licence is added.
