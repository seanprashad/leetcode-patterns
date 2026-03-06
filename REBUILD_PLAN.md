# Rebuild Plan: leetcode-patterns → Next.js + TypeScript

## Current State Summary

The app is a **Create React App (CRA)** project using React 18, class components mixed with hooks, Reactstrap/Bootstrap for UI, `react-table` v7 for the question list, SCSS for styles, localStorage for persistence, and `react-ga4` for analytics. It deploys to GitHub Pages via a GitHub Actions workflow. A Python cron job updates `questions.json` weekly via the LeetCode API.

---

## Execution Batches

Each batch ends with a working site you can preview via `npm run dev`.

| Batch | Phases | What You Can See Locally |
|-------|--------|--------------------------|
| **A** | 1 + 2 + 3 | Running Next.js app with navbar, dark mode toggle, and all hooks/types/data wired up |
| **B** | 4 + 5 | Functionally complete site — tabs, question table with filters/checkboxes/progress, tips, acknowledgements |
| **C** | 6 + 7 + 8 | Final polish — styling refinements, responsive tweaks, CI/CD pipeline, old CRA files removed |

---

## Batch A

### Phase 1 — Project Scaffolding

| Step | Status | Detail |
|------|--------|--------|
| 1.1 | ✅ | Initialize a new **Next.js 15** app with the App Router, TypeScript, Tailwind CSS, and ESLint |
| 1.2 | ✅ | Configure `next.config.ts` for **static export** (`output: 'export'`) + conditional `basePath` for GitHub Pages |
| 1.3 | ✅ | Set up **Vitest** + **React Testing Library** + **jsdom** for unit/component testing |
| 1.4 | ✅ | Add **Prettier** and **Husky** pre-commit hook (ESLint flat config included from scaffolding) |
| 1.5 | ✅ | Copy over `src/data/questions.json`, `public/static/` (icons, images), and `favicon.ico` |
| 1.6 | ✅ | Copy over `cron/` directory unchanged (Python, independent of the web framework) |

### Phase 2 — Shared Foundation

| Step | Status | Detail |
|------|--------|--------|
| 2.1 | ✅ | **Types** — `types/question.ts` with `Question`, `Company`, `QuestionsData` interfaces |
| 2.2 | ✅ | **Data layer** — `lib/questions.ts`: import JSON, sort by difficulty, compute `companyNames` |
| 2.3 | ✅ | **localStorage hooks** — `hooks/use-local-storage.ts` (generic typed hook, SSR-safe) |
| 2.4 | ✅ | **Analytics** — `lib/analytics.ts` wrapping `react-ga4` (`initGA`, `trackEvent`) |
| 2.5 | ✅ | **Dark mode** — `hooks/use-dark-mode.ts` using `localStorage` + Tailwind's built-in `dark:` variant (toggles `dark` class on `<html>`) |

**Tests:** ✅ 11 passing

- `use-local-storage.test.ts` — read/write/default values (4 tests)
- `questions.test.ts` — correct sort order, `companyNames` computed (4 tests)
- `use-dark-mode.test.ts` — toggle, persistence, html class (3 tests)

### Phase 3 — Layout & Navigation

| Step | Status | Detail |
|------|--------|--------|
| 3.1 | ✅ | `app/layout.tsx` — Root layout with Open Sans via `next/font/google`, Tailwind globals |
| 3.2 | ✅ | `app/page.tsx` — Client component with GA init, renders `<Navigation>` + placeholder for Tabs |
| 3.3 | ✅ | `components/Navigation.tsx` — Sticky navbar with title, GitHub link, dark mode toggle using `dark:` variants |

**Tests:** ✅ 3 passing

- `Navigation.test.tsx` — renders brand, GitHub link, dark mode toggle

## Batch B

### Phase 4 — Tabs System

| Step | Status | Detail |
|------|--------|--------|
| 4.1 | ✅ | `components/Tabs.tsx` — Tabbed interface with 3 tabs using `useState`, styled with Tailwind |
| 4.2 | ✅ | `components/Tips.tsx` — Static markdown tips rendered with `react-markdown` |
| 4.3 | ✅ | `components/Acknowledgements.tsx` — Card grid with images/links for Blind 75, DesignGurus, Hackernoon |

**Tests:** ✅ 7 passing

- `Tabs.test.tsx` — tab switching renders correct content (4 tests)
- `Tips.test.tsx` — renders markdown content (1 test)
- `Acknowledgements.test.tsx` — renders all 3 cards with correct links (2 tests)

### Phase 5 — Question Table (Core Feature)

| Step | Status | Detail |
|------|--------|--------|
| 5.1 | ✅ | Installed `@tanstack/react-table` v8, `react-minimal-pie-chart`, `react-tooltip`, `react-markdown` |
| 5.2 | ✅ | `hooks/use-question-progress.ts` — manages checked/checkedAt arrays, difficulty counts, reset, auto-resize |
| 5.3 | ✅ | `components/table/QuestionTable.tsx` — Full table with all columns, inline FilterDropdown, pattern frequencies |
| 5.4 | ✅ | Filter dropdowns (Status, Difficulty, Pattern, Company) integrated inline with localStorage persistence |
| 5.5 | ✅ | Pie chart in checkbox column header + `ResetModal.tsx` with confirmation dialog |
| 5.6 | ✅ | `components/table/ProgressBar.tsx` — Easy/Medium/Hard progress bars in Tailwind |
| 5.7 | ✅ | Random question button integrated in Questions column header |
| 5.8 | ✅ | Show/hide pattern toggle integrated in Pattern column header |
| 5.9 | ✅ | Pattern frequency badges shown when difficulty/company filters are active |

**Tests:** ✅ 11 passing

- `use-question-progress.test.ts` — check/uncheck, reset, resize, difficulty counts (5 tests)
- `QuestionTable.test.tsx` — renders table, filters, checkbox toggle, progress bars, pie chart, reset (6 tests)

## Batch C

### Phase 6 — Styling & Polish

| Step | Detail |
|------|--------|
| 6.1 | Replace all SCSS with **Tailwind CSS** utility classes + a minimal `globals.css` |
| 6.2 | Ensure dark mode works end-to-end using Tailwind's built-in `dark:` variant (class on `<html>`) |
| 6.3 | Responsive design — ensure table is usable on mobile (horizontal scroll wrapper) |
| 6.4 | Replace `react-tooltip` with a lightweight Tailwind-based tooltip or keep it if preferred |

### Phase 7 — CI/CD & Deployment

| Step | Detail |
|------|--------|
| 7.1 | Update `.github/workflows/github-pages.yml` — use `npm run build` (Next.js static export) + deploy `out/` directory instead of `build/` |
| 7.2 | Add a **test step** to the CI pipeline: `npm test -- --run` before build |
| 7.3 | Keep `.github/workflows/update-question-metadata.yml` unchanged (Python cron is framework-independent) |

### Phase 8 — Cleanup & Verification

| Step | Detail |
|------|--------|
| 8.1 | Remove all old CRA files (`react-scripts`, old `src/`, old `public/index.html`) |
| 8.2 | Run full test suite, fix any failures |
| 8.3 | Build and preview locally (`next build && npx serve out`) to verify parity with the live site |
| 8.4 | Verify localStorage migration — existing users' `checked`/`checkedAt`/`darkMode` data should be preserved seamlessly (same keys) |

---

## Dependency Migration

| Old | New |
|-----|-----|
| `react-scripts` (CRA) | `next` (Next.js 15) |
| `reactstrap` + `bootstrap` | **Tailwind CSS** |
| `react-table` v7 | `@tanstack/react-table` v8 |
| `classnames` | `clsx` or Tailwind `cn()` helper |
| `sass` / `.scss` files | Tailwind utilities + `globals.css` |
| `prop-types` | TypeScript interfaces |
| `react-toggle` | Custom Tailwind toggle or `@headlessui/react` Switch |
| `react-scroll` | Remove (unused in current code) |
| **Keep as-is** | `react-ga4`, `react-markdown`, `react-minimal-pie-chart`, `react-icons`, `react-tooltip` |
