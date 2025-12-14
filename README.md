# Leetcode Patterns [![github-pages](https://github.com/seanprashad/leetcode-patterns/actions/workflows/github-pages.yml/badge.svg)](https://github.com/seanprashad/leetcode-patterns/actions/workflows/github-pages.yml) [![run-cron](https://github.com/seanprashad/leetcode-patterns/actions/workflows/run-cron.yml/badge.svg)](https://github.com/seanprashad/leetcode-patterns/actions/workflows/run-cron.yml)

## Table of Contents

- [Background](#background)
- [Fundamentals](#fundamentals)
- [Notes](#notes)
- [Question List](#question-list)
- [New Features](#new-features)
  - [Time & Space Complexity Analysis](#time--space-complexity-analysis)
  - [Pattern Deep-Dive Guides](#pattern-deep-dive-guides)
- [Solutions](#solutions)
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

## New Features

### Time & Space Complexity Analysis

Each problem now includes **optimal time and space complexity** information. This helps you:
- Understand the efficiency of solutions
- Prioritize problems based on complexity
- Prepare for interview discussions about optimization

The complexity values are displayed in the main question table and reflect the optimal pattern-based solution for each problem.

### Pattern Deep-Dive Guides

Comprehensive guides for each coding pattern are now available in the `/guides` directory. Each guide includes:

- **Core Concept**: Clear explanation of what the pattern is and why it exists
- **When to Use**: Key problem characteristics that signal this pattern is applicable
- **Template Code**: Generalized code templates in Python and JavaScript showing the structure
- **Related Problems**: Links back to relevant problems in the main list
- **Time & Space Complexity**: Complexity analysis for the pattern
- **Tips & Best Practices**: Practical advice for applying the pattern

Access the guides:
- Through the **Pattern Guides** tab in the web interface
- Directly in the repository: [`/guides`](./guides/)
- Pattern badges in the question table are clickable and link to their respective guides

Available patterns:
- Arrays, BFS, Backtracking, Binary Search, Bit Manipulation, Bucket Sort
- DFS, Design, Dynamic Programming, Fast & Slow Pointers
- Graph, Greedy, Heap, In-place reversal of a linked list
- Intervals, QuickSelect, Sliding Window, Sorting
- Topological Sort, Trie, Two Pointers, Union Find

## Solutions

Solutions written in Java can be found in the [solutions] branch.

## Suggestions

Think a question should/shouldn't be included? Wish there was another feature?
Feel free to open an [issue] with your suggestion!

## Acknowledgements

This list is heavily inspired from [Grokking the Coding Interview] with
additional problems extracted from the [Blind 75 list] and this hackernoon article
on [14 patterns to ace any coding interview question].

[leetcode.com]: https://leetcode.com
[leetcode premium]: https://leetcode.com/subscribe/
[this pdf]: https://drive.google.com/open?id=1ao4ZA28zzBttDkuS6MLQI52gDs_CJZEm
[solutions]: https://github.com/SeanPrashad/leetcode-patterns/tree/solutions
[grokking the coding interview]: https://www.educative.io/courses/grokking-the-coding-interview
[issue]: https://github.com/SeanPrashad/leetcode-patterns/issues/new
[blind 75 list]: https://www.teamblind.com/article/New-Year-Gift---Curated-List-of-Top-100-LeetCode-Questions-to-Save-Your-Time-OaM1orEU?utm_source=share&utm_medium=ios_app
[14 patterns to ace any coding interview question]: https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed
