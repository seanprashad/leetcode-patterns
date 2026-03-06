# Leetcode Patterns [![Deploy to GitHub Pages](https://github.com/seanprashad/leetcode-patterns/actions/workflows/deploy.yml/badge.svg)](https://github.com/seanprashad/leetcode-patterns/actions/workflows/deploy.yml) [![Update Questions](https://github.com/seanprashad/leetcode-patterns/actions/workflows/update-questions.yml/badge.svg)](https://github.com/seanprashad/leetcode-patterns/actions/workflows/update-questions.yml)

## Table of Contents

- [Background](#background)
- [Fundamentals](#fundamentals)
- [Notes](#notes)
- [Question List](#question-list)
- [Solutions](#solutions)
- [Contributing](#contributing)
- [Suggestions](#suggestions)
- [Acknowledgements](#acknowledgements)

## Background

This repo is intended for any individual wanting to improve their problem
solving skills for software engineering interviews.

Problems are grouped under their respective subtopic, in order to focus on
repeatedly applying common patterns rather than randomly tackling questions.

All questions are available on [leetcode.com] with some requiring [leetcode premium].

## Fundamentals

To find the greatest amount of success when practicing, it is highly recommended
to know the methods and runtimes of the following data structures and their
operations:

- Arrays
- Maps
- Linked Lists
- Queues
- Heaps
- Stacks
- Trees
- Graphs

In addition, you should have a good grasp on common algorithms such as:

- Breadth-first search
- Depth-first search
- Binary search
- Recursion

## Notes

[This pdf] contains information for the main data structures in Java.

Other useful methods to know include [`substring()`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#substring-int-int-), [`toCharArray()`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#toCharArray--), [`Math.max()`](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#max-int-int-),
[`Math.min()`](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#min-int-int-), and [`Arrays.fill()`](https://docs.oracle.com/javase/8/docs/api/java/util/Arrays.html#fill-int:A-int-).

## Question List

The entire question list can be found here:
https://seanprashad.com/leetcode-patterns/.

## Solutions

Solutions written in Java can be found in the [solutions] branch.

## Contributing

The app is built with [Next.js] (App Router), [React] 19, [TypeScript], [Tailwind CSS] v4, [TanStack Table] v8, [Lucide React] for icons, and Google Analytics via `@next/third-parties`. Tests use [Vitest] + [React Testing Library].

```bash
npm install
npm run dev         # http://localhost:3000
npm test            # single run
npm run test:watch  # watch mode
```

A [Husky] `pre-push` hook runs `npm test` automatically before every push. This is set up for every clone via the `prepare` script.

## Acknowledgements

This list is heavily inspired from [Grokking the Coding Interview] with
additional problems extracted from the [Blind 75 list] and this hackernoon article
on [14 patterns to ace any coding interview question].

[leetcode.com]: https://leetcode.com
[leetcode premium]: https://leetcode.com/subscribe/
[next.js]: https://nextjs.org
[react]: https://react.dev
[typescript]: https://www.typescriptlang.org
[tailwind css]: https://tailwindcss.com
[tanstack table]: https://tanstack.com/table
[lucide react]: https://lucide.dev
[vitest]: https://vitest.dev
[react testing library]: https://testing-library.com/docs/react-testing-library/intro
[husky]: https://typicode.github.io/husky
[this pdf]: https://drive.google.com/open?id=1ao4ZA28zzBttDkuS6MLQI52gDs_CJZEm
[solutions]: https://github.com/SeanPrashad/leetcode-patterns/tree/solutions
[grokking the coding interview]: https://www.educative.io/courses/grokking-the-coding-interview
[issue]: https://github.com/SeanPrashad/leetcode-patterns/issues/new
[blind 75 list]: https://www.teamblind.com/article/New-Year-Gift---Curated-List-of-Top-100-LeetCode-Questions-to-Save-Your-Time-OaM1orEU?utm_source=share&utm_medium=ios_app
[14 patterns to ace any coding interview question]: https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed
