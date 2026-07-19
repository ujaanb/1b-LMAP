# Wiki Log

Append-only timeline of wiki operations. Newest entries at the bottom.

Entry header format (mandatory, parseable by `grep "^## \[" wiki/log.md`):
`## [YYYY-MM-DD] <operation> | <short title>`

Allowed operations:
- `ingest` — a raw source was processed into wiki content.
- `query` — an answer was generated from wiki pages.
- `lint` — a health-check pass over wiki structure/content.
- `meta` — schema/index/log/structure maintenance.

---

## [2026-07-19] meta | Instantiate template for Phase 1B LMAP
- Bound the wiki domain to the Phase 1B Lifestyle Medicine and Prevention (LMAP) module at Imperial College London (Year 2).
- Defined the study goal, scope boundary, primary tag `lmap`, and LMAP-specific entity and concept categories.
- Rewrote the project README and synchronized the domain shown in the wiki index.
- Created `raw/` and `wiki/` subfolders for sources and page types.
- Files touched: `AGENTS.md`, `README.md`, `.gitignore`, `wiki/index.md`, `wiki/log.md`, `raw/{pdfs,web-clips,notes,assets}/`, `wiki/{sources,entities,concepts,analyses}/`.

## [2026-07-19] meta | Add topic folders under raw/pdfs
- Created four theme subfolders under `raw/pdfs/` matching the Phase 1B LMAP theme list.
- Updated `AGENTS.md` repository layout to document the theme folder structure.
- Files touched: `raw/pdfs/{epidemiology-research-skills-and-evidence-based-practice,coaching-communication-and-brief-advice-in-practice,health-across-the-life-course,global-health-and-governance}/`, `AGENTS.md`, `wiki/log.md`.

## [2026-07-19] meta | Build HTML study site scaffold
- Created `site/` study hub: home page linking all four LMAP themes; placeholder topic pages awaiting PDFs.
- Added `site/practice.html` as an explicit placeholder — question bank to be built once all theme PDFs are provided.
- Updated `AGENTS.md` layout and `README.md` to document the study site.
- Files touched: `site/index.html`, `site/practice.html`, `site/css/styles.css`, `site/topics/*/index.html` (4), `AGENTS.md`, `README.md`, `wiki/log.md`.

## [2026-07-19] meta | Epidemiology theme lecture notes (8 lectures)
- Built full Q&A lecture notes for all PDFs under `raw/pdfs/epidemiology-research-skills-and-evidence-based-practice/` (1.1, 1.2, 1.4–1.9; no 1.3 PDF present).
- Updated theme hub and home badge to “8 lectures ready”; extended site CSS for notes layout.
- Flagged image-only / empty Notion toggles (population pyramids, study-design ladder, Berkson’s bias answer, truncated crude-model sentence) in the relevant pages.
- Saved text extracts under `site/_extracted/epidemiology/`.
- Files touched: `site/topics/epidemiology-research-skills-and-evidence-based-practice/*`, `site/index.html`, `site/css/styles.css`, `site/_extracted/epidemiology/*`, `wiki/log.md`.

## [2026-07-19] meta | Coaching theme lecture notes (5 lectures)
- Built full Q&A lecture notes for all PDFs under `raw/pdfs/coaching-communication-and-brief-advice-in-practice/` (2.1–2.3, 2.5–2.6; no 2.4 PDF present).
- Updated theme hub and home badge to “5 lectures ready”.
- Flagged empty/truncated Notion toggles (2.2 ANSWER, 2.1 tone clause, 2.3 goal table row) on the relevant pages.
- Saved text extracts under `site/_extracted/coaching/`.
- Files touched: `site/topics/coaching-communication-and-brief-advice-in-practice/*`, `site/index.html`, `site/_extracted/coaching/*`, `wiki/log.md`.

## [2026-07-19] meta | Life-course theme lecture notes (8 lectures)
- Built full Q&A lecture notes for all PDFs under `raw/pdfs/health-across-the-life-course/` (3.1–3.8).
- Updated theme hub and home badge to “8 lectures ready”.
- Flagged empty/image-only toggles (3.2 initiatives, 3.4 cycle diagram, 3.7 MDT malnutrition & social prescribing suitability, 3.8 YLD/cost diagrams).
- Saved text extracts under `site/_extracted/health-across-the-life-course/`.
- Files touched: `site/topics/health-across-the-life-course/*`, `site/index.html`, `site/_extracted/health-across-the-life-course/*`, `wiki/log.md`.

## [2026-07-19] meta | Global health theme lecture notes (4 lectures)
- Built full Q&A lecture notes for all PDFs under `raw/pdfs/global-health-and-governance/` (4.1–4.3, 4.5; no 4.4 PDF present).
- Updated theme hub and home badge to “4 lectures ready”.
- Flagged empty/truncated items (internally displaced person, ICP definition, impartiality vs neutrality mid-sentence, Nuffield ladder diagram).
- Saved text extracts under `site/_extracted/global-health-and-governance/`.
- Files touched: `site/topics/global-health-and-governance/*`, `site/index.html`, `site/_extracted/global-health-and-governance/*`, `wiki/log.md`.

## [2026-07-19] meta | Practice questions tab (500 MCQs)
- Built practice UI: chapter select (1–4), question count, optional formula-only filter for Chapter 1, MCQ session flow with score and feedback.
- Question bank: 500 MCQs evenly split (125 per theme); Chapter 1 includes 64 formula/application questions (odds, prevalence, RR, IR, CI, SMR, etc.).
- Files touched: `site/practice.html`, `site/js/practice.js`, `site/js/practice-question-bank.js`, `site/css/styles.css`, `site/index.html`, `wiki/log.md`.

## [2026-07-19] meta | Publish study hub on GitHub Pages
- Linked local repo to `https://github.com/ujaanb/1b-LMAP.git` and deployed `site/` via GitHub Actions Pages workflow.
- Live URL: https://ujaanb.github.io/1b-LMAP/
- Files touched: `.github/workflows/deploy-pages.yml`, `site/.nojekyll`, `README.md`, `wiki/log.md`.

## [2026-07-19] meta | Home page exam notes download
- Added renamed PDF `site/downloads/LMAP exam notes.pdf` and a download card on the home page.
- Files touched: `site/downloads/LMAP exam notes.pdf`, `site/index.html`, `site/css/styles.css`, `wiki/log.md`.
