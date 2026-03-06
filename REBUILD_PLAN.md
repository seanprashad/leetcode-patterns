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

| Step | Detail |
|------|--------|
| 1.1 | Initialize a new **Next.js 15** app with the App Router, TypeScript, Tailwind CSS, and ESLint (`npx create-next-app@latest`) |
| 1.2 | Configure `next.config.ts` for **static export** (`output: 'export'`) + `basePath: '/leetcode-patterns'` for GitHub Pages |
| 1.3 | Set up **Vitest** + **React Testing Library** + **jsdom** for unit/component testing |
| 1.4 | Add **Prettier**, **ESLint** (flat config), and **Husky** pre-commit hook |
| 1.5 | Copy over `src/data/questions.json`, `public/static/` (icons, images), and `favicon.ico` |
| 1.6 | Copy over `cron/` directory unchanged (Python, independent of the web framework) |

### Phase 2 — Shared Foundation

| Step | Detail |
|------|--------|
| 2.1 | **Types** — Create `types/question.ts` with `Question`, `Company`, `QuestionsData` interfaces derived from `questions.json` shape |
| 2.2 | **Data layer** — Create `lib/questions.ts`: import JSON, sort by difficulty, compute `companyNames`, export `questions` array and `updated` date |
| 2.3 | **localStorage hooks** — Create `hooks/use-local-storage.ts` (generic typed hook) to replace all raw `localStorage.getItem/setItem` calls |
| 2.4 | **Analytics** — Create `lib/analytics.ts` wrapping `react-ga4` (`initGA`, `trackEvent`) |
| 2.5 | **Dark mode** — Create `hooks/use-dark-mode.ts` + a `ThemeProvider` context using `localStorage` + `document.body.className` |

**Tests:**

- `use-local-storage.test.ts` — read/write/default values
- `questions.test.ts` — correct sort order, `companyNames` computed
- `use-dark-mode.test.ts` — toggle, persistence, body class

### Phase 3 — Layout & Navigation

| Step | Detail |
|------|--------|
| 3.1 | `app/layout.tsx` — Root layout with `<html>`, Google font (Open Sans), Tailwind globals, `ThemeProvider`, GA init |
| 3.2 | `app/page.tsx` — Main page (client component) rendering `<Navigation>` + `<Tabs>` |
| 3.3 | `components/Navigation.tsx` — Sticky navbar with title, GitHub link icon, dark mode toggle (replaces Reactstrap `Navbar`) |

**Tests:**

- `Navigation.test.tsx` — renders brand, GitHub link, dark mode toggle

## Batch B

### Phase 4 — Tabs System

| Step | Detail |
|------|--------|
| 4.1 | `components/Tabs.tsx` — Tabbed interface with 3 tabs: "Question List", "Tips", "Acknowledgements", using headless state (simple `useState`) styled with Tailwind |
| 4.2 | `components/Tips.tsx` — Render the static markdown tips content with `react-markdown` |
| 4.3 | `components/Acknowledgements.tsx` — Card grid with images/links for Blind 75, DesignGurus, Hackernoon |

**Tests:**

- `Tabs.test.tsx` — tab switching renders correct content
- `Tips.test.tsx` — renders markdown content
- `Acknowledgements.test.tsx` — renders all 3 cards with correct links

### Phase 5 — Question Table (Core Feature)

| Step | Detail |
|------|--------|
| 5.1 | Install **TanStack Table v8** (`@tanstack/react-table`) — the successor to `react-table` v7 |
| 5.2 | `hooks/use-question-progress.ts` — manages `checked[]`, `checkedAt[]`, `difficultyCount`, reset logic, auto-resize on new questions. All persisted via `use-local-storage` |
| 5.3 | `components/table/QuestionTable.tsx` — Main table component using TanStack Table with columns: Checkbox, Question title, Solutions link, Pattern badges, Difficulty badge, Companies (icons with tooltips), Last Solved On |
| 5.4 | `components/table/filters/` — `DifficultyFilter`, `PatternFilter`, `CompanyFilter`, `CheckedFilter` as dropdown `<select>` components with localStorage persistence |
| 5.5 | `components/table/ProgressPie.tsx` — Pie chart (using `react-minimal-pie-chart`) + reset button with confirmation modal |
| 5.6 | `components/table/ProgressBar.tsx` — Easy/Medium/Hard progress bars (Tailwind-styled, no Bootstrap dependency) |
| 5.7 | `components/table/RandomQuestion.tsx` — Button that opens a random question from filtered rows |
| 5.8 | `components/table/PatternToggle.tsx` — Show/hide pattern toggle |
| 5.9 | `components/PatternFrequencies.tsx` — Pattern frequency badges shown when difficulty/company filters are active |

**Tests:**

- `use-question-progress.test.ts` — check/uncheck, reset, resize on new questions, difficulty counts
- `QuestionTable.test.tsx` — renders rows, checkbox toggles, filter interactions
- `filters.test.tsx` — each filter correctly narrows results
- `ProgressPie.test.tsx` — displays correct count
- `RandomQuestion.test.tsx` — opens correct URL
- `PatternFrequencies.test.tsx` — computes and displays frequencies

## Batch C

### Phase 6 — Styling & Polish

| Step | Detail |
|------|--------|
| 6.1 | Replace all SCSS with **Tailwind CSS** utility classes + a small `globals.css` for dark mode body styles and the Open Sans font |
| 6.2 | Ensure dark mode works end-to-end (Tailwind `dark:` variant or body class approach) |
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
