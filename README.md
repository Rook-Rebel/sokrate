# Kapanadze AI Socrates — English research demonstrator

A browser-based research prototype for **guided Socratic learning, diagnosis and
teaching-method research**. Students work through staged question banks
(prerequisites → Level I–III → final check), ask for up to three Socratic prompts
per question, rate their confidence before feedback, and get a session report.
Lecturers can read the theory notes, rubric and prompts; researchers can export
all locally archived sessions as CSV.

Four topics are included:

| Topic | Level | Questions |
| --- | --- | --- |
| Half-derivative | University · algebraic-operator construction | 31 |
| Derivative without limits | Upper secondary / University | 29 |
| Arithmetic progression: n-th term | School mathematics | 17 |
| Ancient Egyptian pyramids | History · school level | 19 |

> **Research prototype.** No generative AI service is connected; hints are
> pre-written. Open-ended answers are flagged for lecturer review rather than
> marked automatically. Research validity has not yet been established.

## How it works

- Plain HTML, CSS and JavaScript. No framework, no build step, no runtime
  dependencies, no network requests.
- All data stays in the browser's `localStorage`. Nothing is sent to a server.
  Each browser/device has its own data, so **export the CSV after every pilot
  session**.
- The Lecturer and Researcher tabs are open demonstration panels, not access
  controls.

```
index.html          page shell, meta tags, tabs, dialog
css/styles.css      styles (light/dark theme, mobile layout, print)
js/questions.js     question bank (BANK) and labels (META, STAGE, COMP)
js/app.js           views, hints, grading, storage and CSV export
favicon.svg         icon
vercel.json         security headers for Vercel
```

## Run locally

The app is static, so any local web server works. From this folder:

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000>. Alternatives: `npx serve .`, or simply
double-click `index.html` (it also works from `file://`, but data saved that way
is kept separately from data saved on `localhost`).

## Deploy to Vercel

**From GitHub (recommended)**

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the defaults: Framework Preset **Other**, no build command, output
   directory = repository root.
4. Deploy. Every push to the default branch redeploys automatically.

**From the command line**

```powershell
npx vercel        # preview deployment
npx vercel --prod # production deployment
```

`vercel.json` adds these headers to every response:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: no-referrer`
- `Content-Security-Policy` that only allows the site's own scripts, styles and
  images. The app has no inline scripts or styles, so it works under this policy.
  If you later add external resources (fonts, analytics), extend the policy.
  The Vercel preview toolbar is blocked by this policy; production is unaffected.

Any other static host (GitHub Pages, Netlify, a university web server) also
works; only the headers in `vercel.json` are Vercel-specific.

After the first deployment you can add `og:url` and an `og:image` (a PNG,
1200×630) to `index.html` for nicer link previews.

## Data and compatibility

Version **EN-DEMO-4.3**. Recorded in every session and in the `version` column.

To keep existing pilot data usable, these are unchanged from EN-DEMO-4.2:

- `localStorage` keys `kapanadze-en-demo-session-v42` (current session) and
  `kapanadze-en-demo-archive-v42` (completed sessions);
- the question bank, grading rules and scoring (2 = first try without help,
  1.5 = at most one prompt, 1 = more help, 0 = not solved, `NEEDS_REVIEW` =
  open-ended);
- the short-demonstration question selection;
- the CSV columns:

```
version, topic, student_code, group, teaching_method, timepoint, mode,
session_start, question_id, stage, component, question, first_attempt,
first_verdict, final_answer, verdict, confidence_1_to_5, hints, attempt_count,
score_0_to_2, teacher_expected
```

CSV files start with a UTF-8 byte-order mark so Excel opens the Unicode
characters correctly. `*.csv` is in `.gitignore` so exported participant data is
not committed by accident.

Do not enter names or other personal information; use anonymous student codes.

## Accessibility

Keyboard-operable tabs (arrow keys, Home/End), focus moved to each new question,
live-region feedback, a native radio-button confidence scale, visible focus
styles, reduced-motion support, and a dark theme that follows the system
setting. Ctrl + Enter (⌘ + Enter on Mac) submits an answer.

## Licence

© Davit Kapanadze. No licence file is included, so all rights are reserved by
default. Add a licence if you want others to reuse the code or the questions.
