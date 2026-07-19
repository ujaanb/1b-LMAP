# Phase 1B LMAP Study Wiki

A personal study wiki for the Phase 1B Lifestyle Medicine and Prevention (LMAP) module at Imperial College London (Year 2). It integrates lectures, learning objectives, notes, and supporting sources into a cited, interconnected knowledge base for revision and assessment preparation.

Year 2 LMAP brings biomedicine and social science together and introduces therapeutic and population approaches — including self-care, social prescribing, wider societal interventions, health coaching, epidemiology, and global health.

## Study site

**Live site:** [https://ujaanb.github.io/1b-LMAP/](https://ujaanb.github.io/1b-LMAP/)

Locally, open [`site/index.html`](./site/index.html). The public site is built from the `site/` folder via GitHub Pages.

## How to use it

1. Add one source at a time to the appropriate folder under `raw/pdfs/<theme>/`.
2. Ask the agent to ingest that source (wiki) and/or build lecture notes for the study site.
3. Review the takeaways before the agent writes or updates wiki pages.
4. Ask questions against the wiki; useful answers can be saved under `wiki/analyses/`.
5. Once all theme PDFs are provided, ask the agent to build the practice questions page.
6. Request a wiki health check periodically to identify gaps, stale claims, and broken links.

## Structure

```text
.
├── AGENTS.md           # operating schema and maintenance rules
├── README.md           # project introduction
├── docs/
│   └── LLM-WIKI.md     # reference description of the wiki pattern
├── raw/                # immutable source documents
│   └── pdfs/           # PDFs organised by LMAP theme (see AGENTS.md)
├── site/               # HTML study hub (home + theme pages + practice)
└── wiki/               # LLM-maintained knowledge pages
    ├── index.md        # canonical page catalog
    └── log.md          # append-only operation history
```

The domain and maintenance contract are defined in [`AGENTS.md`](./AGENTS.md). Start navigation from [`wiki/index.md`](./wiki/index.md).
