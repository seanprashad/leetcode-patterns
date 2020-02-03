# Leetcode Patterns

## Table of Contents

- [Background](#background)
- [Preface](#preface)
- [Notes](#notes)
- [Question List](#question-list)
- [Solutions](#solutions)
- [Leetcode Discuss](#leetcode-discuss)
- [Tips to Consider](#tips-to-consider)
- [Suggestions](#suggestions)
- [Acknowledgements](#acknowledgements)

## Background

This repo is intended for any individual wanting to improve their problem
solving skills for software engineering interviews.

Problems are grouped under their respective subtopic, in order to focus on
repeatedly applying common patterns rather than randomly tackling questions.

All questions are available on [leetcode.com] with some requiring [leetcode premium].

## Preface

It is highly recommended to read chapters 1, 2, 3, 4, 8, and 10 of [Cracking The Coding Interview]
to familiarize yourself with the following data structures and their operations:

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

[This pdf] contains useful information for the built-in data structures in Java.

Other useful methods to know include [`substring()`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#substring-int-int-), [`toCharArray()`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#toCharArray--), [`Math.max()`](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#max-int-int-),
[`Math.min()`](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#min-int-int-), and [`Arrays.fill()`](https://docs.oracle.com/javase/8/docs/api/java/util/Arrays.html#fill-int:A-int-).

## Question List

The entire question list can be found here:
https://seanprashad.com/leetcode-patterns/.

In addition to viewing the question list, companies that have previously asked
the question in the past 6 months (_as of January 2020_) will be listed. You can
also use the checkboxes to mark which questions you've completed!

## Solutions

Solutions written in Java can be found in the [solutions] branch.

## Leetcode Discuss

[Leetcode discuss] is an amazing resource and features previous interview
questions, as well as compensation and general career advice.

## Tips to Consider

```
If input array is sorted then
    - Binary search
    - Two pointers

If asked for all permutations/subsets then
    - Backtracking

If given a tree then
    - DFS
    - BFS

If given a graph then
    - DFS
    - BFS

If given a linked list then
    - Two pointers

If recursion is banned then
    - Stack

If asked for maximum/minumum subarray/subset/options then
    - Dynamic programming

If asked for top/least K items then
    - Heap

If asked for common strings then
    - Map
    - Trie

Else
    - Map/Set for O(1) time & O(n) space
    - Sort input for O(nlogn) time and O(1) space
```

## Suggestions

Think a question should/shouldn't be included? Wish there was another feature?
Feel free to open an [issue] with your suggestion!

## Acknowledgements

This list is heavily inspired from [Grokking the Coding Interview] with
additional problems extracted from the [Blind 75 list] and this medium article
on [14 patterns to ace any coding interview question].

[leetcode.com]: https://leetcode.com
[leetcode premium]: https://leetcode.com/subscribe/
[this pdf]: https://drive.google.com/open?id=1ao4ZA28zzBttDkuS6MLQI52gDs_CJZEm
[cracking the coding interview]: http://www.crackingthecodinginterview.com/contents.html
[here]: https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed
[topcoder]: https://www.topcoder.com/community/competitive-programming/tutorials/dynamic-programming-from-novice-to-advanced/
[back to back swe youtube channel]: https://www.youtube.com/watch?v=jgiZlGzXMBw
[solutions]: https://github.com/SeanPrashad/leetcode-patterns/tree/solutions
[leetcode discuss]: https://leetcode.com/discuss/interview-question
[grokking the coding interview]: https://www.educative.io/courses/grokking-the-coding-interview
[issue]: https://github.com/SeanPrashad/leetcode-patterns/issues/new
[blind 75 list]: https://www.teamblind.com/article/New-Year-Gift---Curated-List-of-Top-100-LeetCode-Questions-to-Save-Your-Time-OaM1orEU?utm_source=share&utm_medium=ios_app
[14 patterns to ace any coding interview question]: https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed
