# Concept Visuals

Next.js (App Router) + MUI app that teaches programming concepts through interactive,
visual pages. Each "topic" has a landing-page tile and a page with a sidebar of concepts.

## Theming — read before styling anything

The app has four user-selectable themes (Light, Dark, Academic, Terminal) that must all look
correct on every page.

> **Never hardcode a color. Always use a theme token** (e.g. `var(--ink)`, `var(--paper-raised)`,
> `var(--info)`), or lean on themed MUI defaults (`color="text.secondary"`, `color="primary"`).

A hex literal like `#1e293b` is frozen to the Light theme and breaks in Dark/Terminal. Tokens are
redefined per theme in `src/app/globals.css`, with matching MUI palettes in
`components/common/Providers.tsx` — both driven by one preference.

Full token reference, a hex→token cheat sheet, and a new-page checklist live in
**[docs/THEMING.md](docs/THEMING.md)**. The `components/pageComponents/ProjectManagement/` topic
is the token-compliant reference implementation. A guard test
(`tests/unit/theming.test.ts`) fails if listed components contain raw hex.

## Adding a new topic

1. **Landing tile** — in `src/app/page.tsx`: add to the `languages` array, add an icon case in
   `getLanguageIcon`, and a route case in `handleClick`.
2. **Route** — `src/app/skills/<slug>/page.tsx` (a topic) or `src/app/languages/<slug>/page.tsx`
   (a language), wrapping the page component in `<Suspense fallback={<Loader/>}>`.
3. **Page component** — `components/pageComponents/<Name>/<Name>Page.tsx`: define `navItems`,
   read `?concept=` from the URL, render via a `switch`, and wrap in `PageWrapper`. Copy an
   existing topic (e.g. `WebsiteManagement`) for the shape.
4. **Concepts** — one component per concept, built from theme tokens (see THEMING.md).

## Conventions

- Reusable building blocks live in `components/common/` (`ConceptWrapper`, `Section`, `Timeline`,
  `ScrumBoard`, `GenericIntroduction`, `PageWrapper`, …) — prefer these over bespoke layout.
- Tests are Jest + Testing Library under `tests/`; run `npx jest <file>`.
- This repo lives under a OneDrive path; if the dev server starts 500ing with `ENOENT`
  build-manifest errors, the `.next` cache corrupted — stop the server, delete `.next`, restart.
