export interface RoadmapQuestion {
  slug: string;
  note: string;
}

export interface RoadmapPhase {
  title: string;
  description: string;
  mediumDescription?: string;
  questions: RoadmapQuestion[];
}

export interface Roadmap {
  id: string;
  name: string;
  description: string;
  phases: RoadmapPhase[];
  nextSteps?: string[];
}

export const beginnerRoadmap: Roadmap = {
  id: "beginner",
  name: "Beginner Roadmap",
  description:
    "A structured path for those new to coding interviews.\n\n**Sean's Guidance:**\n" +
    "1. Choose a programming language that you **feel most comfortable with** - for me that is Java. If you're new to programming, I would recommend **Python**.\n" +
    "2. **Spend no more than 30 minutes** trying to think of *any* solution, even if it's brute force. You want to try applying what you know, and if stuck, then expand your skillset by **studying the solution until you're able to fully explain it to another individual**.\n" +
    "3. **Expect to struggle at first** (*for my first time, it took at least a month to begin improving*).\n" + 
    "4. **Do not memorize solutions** - this does not work in interviews when asked follow-up questions (*I speak from experience*).\n" +
    "5. Don't be afraid to **ask an AI agent to explain the solution** to you - *it's a great alternative to watching a video solution*.\n" +
    "6. Reference the **Helpful Tips** tab for which tools to consider pulling out of your toolkit when solving a problem - *don't use a screwdriver when you need a hammer!*",
  phases: [
    {
      title: "Phase 1: Arrays & Hash Tables",
      description:
        "Learn the two most fundamental data structures. Arrays teach you iteration and indexing; hash tables give you O(1) lookups.",
      mediumDescription:
        "Apply array and hash table skills to trickier problems that require multi-pass strategies or in-place techniques.",
      questions: [
        {
          slug: "contains-duplicate",
          note: "Add each number to a Set as you go. If it's already in the Set, you found a duplicate.",
        },
        {
          slug: "two-sum",
          note: "For each number, check if (target - number) is already in a hash map. If yes, you found the pair. If not, store the current number.",
        },
        {
          slug: "find-all-numbers-disappeared-in-an-array",
          note: "Since values are 1 to n, use each value as an index to mark which numbers are present. The unmarked positions are the missing numbers.",
        },
        {
          slug: "missing-number",
          note: "Calculate the expected sum of 0 to n, then subtract the actual array sum. The difference is the missing number. Or use a Set.",
        },
        {
          slug: "majority-element",
          note: "Track a candidate and a counter. Add 1 when you see the candidate, subtract 1 otherwise. When the counter hits 0, pick a new candidate. The majority element always wins.",
        },
        {
          slug: "product-of-array-except-self",
          note: "Two-pass approach: build left products, then multiply by right products in reverse. No division needed.",
        },
        {
          slug: "find-all-duplicates-in-an-array",
          note: "Similar to disappeared numbers - negate the value at index abs(num)-1. If already negative, it's a duplicate.",
        },
      ],
    },
    {
      title: "Phase 2: Two Pointers",
      description:
        "Two pointers let you solve problems in O(n) by scanning from both ends or using a slow/fast pointer.",
      mediumDescription:
        "Combine sorting with two-pointer scans to handle duplicates, multi-element sums, and greedy boundary decisions.",
      questions: [
        {
          slug: "move-zeroes",
          note: "Keep one pointer where the next non-zero should go. Walk through the array and swap each non-zero element to that position.",
        },
        {
          slug: "squares-of-a-sorted-array",
          note: "The largest squares are at either end of the array. Compare both ends, place the bigger square at the back of the result, and move that pointer inward.",
        },
        {
          slug: "backspace-string-compare",
          note: "Process each string using a stack: push letters, pop on '#'. Then compare the two final stacks. Or walk backwards through both strings, skipping characters after '#'.",
        },
        {
          slug: "3sum",
          note: "Sort first, then for each element use two pointers on the remainder. Skip duplicates to avoid repeats.",
        },
        {
          slug: "3sum-closest",
          note: "Same two-pointer approach as 3Sum but track the closest sum. Update when |sum - target| improves.",
        },
        {
          slug: "container-with-most-water",
          note: "Start pointers at both ends. The shorter line limits height, so move that pointer inward.",
        },
        {
          slug: "sort-colors",
          note: "Dutch national flag: three pointers (low, mid, high). Swap 0s left and 2s right.",
        },
      ],
    },
    {
      title: "Phase 3: Sliding Window",
      description:
        "Sliding window optimizes brute-force subarray/substring problems from O(n²) to O(n) by maintaining a moving window.",
      mediumDescription:
        "Handle variable-width windows with shrink conditions, frequency maps, and constraints like \"at most k\" distinct elements.",
      questions: [
        {
          slug: "maximum-average-subarray-i",
          note: "Slide a window of size k across the array. As you move right, add the new element and remove the leftmost one. Track the best sum.",
        },
        {
          slug: "is-subsequence",
          note: "Walk through the longer string with a pointer for each string. When characters match, advance both pointers. Otherwise only advance the longer string's pointer.",
        },
        {
          slug: "longest-substring-without-repeating-characters",
          note: "Expand right pointer, shrink left when duplicates found. Use a Set or map to track window contents.",
        },
        {
          slug: "minimum-size-subarray-sum",
          note: "Expand window until sum ≥ target, then shrink from the left while still valid. Track minimum length.",
        },
        {
          slug: "longest-repeating-character-replacement",
          note: "Window is valid when length - maxFreq ≤ k. Track character frequencies in the window.",
        },
        {
          slug: "permutation-in-string",
          note: "Fixed-size sliding window matching s1's length. Compare character frequency maps of window and s1.",
        },
        {
          slug: "fruit-into-baskets",
          note: "Sliding window with at most 2 distinct elements. Shrink window when you exceed 2 fruit types.",
        },
        {
          slug: "subarray-product-less-than-k",
          note: "Expand right, shrink left while product ≥ k. Each valid window of size w contributes w subarrays.",
        },
      ],
    },
    {
      title: "Phase 4: Linked Lists",
      description:
        "Master pointer manipulation with linked lists. These problems build intuition for in-place data structure operations.",
      mediumDescription:
        "Chain together multiple linked list techniques (find middle, reverse, merge) within a single problem.",
      questions: [
        {
          slug: "reverse-linked-list",
          note: "Walk through the list, and at each node point it backward instead of forward. Keep track of the previous node so you can redirect the link.",
        },
        {
          slug: "middle-of-the-linked-list",
          note: "Use two pointers: one moves 1 step at a time, the other moves 2 steps. When the fast one reaches the end, the slow one is at the middle.",
        },
        {
          slug: "linked-list-cycle",
          note: "Use two pointers moving at different speeds. If there's a loop, the fast one will eventually catch up to the slow one. If not, the fast one reaches the end.",
        },
        {
          slug: "merge-two-sorted-lists",
          note: "Create a placeholder node to start building the result. Compare the fronts of both lists, attach the smaller one, and keep going. Attach whatever's left at the end.",
        },
        {
          slug: "remove-linked-list-elements",
          note: "Add a placeholder node before the head (handles the case where the head itself needs removal). Walk through and skip any node whose value matches the target.",
        },
        {
          slug: "remove-duplicates-from-sorted-list",
          note: "Because the list is sorted, duplicates sit next to each other. Walk through and whenever the next node has the same value, skip over it.",
        },
        {
          slug: "palindrome-linked-list",
          note: "Find the middle of the list, reverse the second half, then compare the first half with the reversed second half node by node.",
        },
        {
          slug: "remove-nth-node-from-end-of-list",
          note: "Two pointers with n-gap: advance fast n steps first, then move both. When fast ends, slow is at target.",
        },
      ],
    },
    {
      title: "Phase 5: Binary Search",
      description:
        "Binary search halves the search space each iteration for O(log n) time. Master the template: left, right, mid boundaries.",
      mediumDescription:
        "Apply binary search to modified arrays - rotated, 2D, or peak-finding - where you must decide which half to discard.",
      questions: [
        {
          slug: "binary-search",
          note: "Start with the full range. Check the middle element: if it matches, you're done. If the target is smaller, search the left half. If larger, search the right half.",
        },
        {
          slug: "find-smallest-letter-greater-than-target",
          note: "Binary search for the first letter that comes after the target. Since the letters wrap around, if nothing is greater, return the very first letter.",
        },
        {
          slug: "peak-index-in-a-mountain-array",
          note: "Binary search on the slope: if arr[mid] < arr[mid+1], peak is to the right. Otherwise, to the left.",
        },
        {
          slug: "search-in-rotated-sorted-array",
          note: "Determine which half is sorted, then check if target lies in the sorted half. Adjust boundaries accordingly.",
        },
        {
          slug: "find-minimum-in-rotated-sorted-array",
          note: "Compare mid with right boundary. If arr[mid] > arr[right], minimum is in the right half.",
        },
        {
          slug: "search-a-2d-matrix",
          note: "Treat the 2D matrix as a flat sorted array. Convert 1D index to (row, col) with division and modulo.",
        },
        {
          slug: "find-peak-element",
          note: "Binary search: move toward the side where the neighbor is larger. A peak must exist on that side.",
        },
      ],
    },
    {
      title: "Phase 6: Trees - DFS & BFS",
      description:
        "Trees combine recursion with data structures. DFS (preorder, inorder, postorder) and BFS (level-order) are the core traversals.",
      mediumDescription:
        "Tackle tree problems that require maintaining global state, enforcing BST constraints, or processing nodes level by level.",
      questions: [
        {
          slug: "maximum-depth-of-binary-tree",
          note: "Recursively ask each subtree for its depth. The answer is 1 + the larger of the two. An empty tree has depth 0.",
        },
        {
          slug: "minimum-depth-of-binary-tree",
          note: "Similar to max depth, but find the shortest path to a leaf. Watch out: if a node only has one child, you must follow that child (a null child isn't a leaf).",
        },
        {
          slug: "same-tree",
          note: "Compare the two trees node by node. If both are empty, they match. If one is empty or values differ, they don't. Then check left and right children the same way.",
        },
        {
          slug: "invert-binary-tree",
          note: "At every node, swap its left and right children. Then do the same for each child. Think of it as mirroring the tree.",
        },
        {
          slug: "path-sum",
          note: "Subtract each node's value from the target as you walk down. When you reach a leaf, check if the remaining target is exactly the leaf's value.",
        },
        {
          slug: "subtree-of-another-tree",
          note: "Visit every node in the main tree. At each one, check if the tree starting there looks exactly like the target tree (reuse the same-tree logic).",
        },
        {
          slug: "binary-tree-paths",
          note: "Build a path string as you travel from root toward leaves. Each time you reach a leaf, save that path to your results.",
        },
        {
          slug: "merge-two-binary-trees",
          note: "Walk both trees together. When both nodes exist, add their values. When only one exists, use that node as-is.",
        },
        {
          slug: "average-of-levels-in-binary-tree",
          note: "Process the tree level by level using a queue. At each level, add up all the values and divide by how many nodes are on that level.",
        },
        {
          slug: "binary-tree-level-order-traversal",
          note: "BFS with a queue. Process all nodes at the current level (queue length) before moving to the next level.",
        },
        {
          slug: "validate-binary-search-tree",
          note: "DFS with min/max bounds. Each node must be within (min, max). Left child gets (min, node), right gets (node, max).",
        },
      ],
    },
    {
      title: "Phase 7: Sorting & Intervals",
      description:
        "Sorting unlocks many techniques. Interval problems almost always start with sorting by start time.",
      mediumDescription:
        "Merge, insert, and remove overlapping intervals. These problems layer greedy decisions on top of sorted input.",
      questions: [
        {
          slug: "meeting-rooms",
          note: "Sort the meetings by start time. Then check each pair of consecutive meetings - if one starts before the previous one ends, you have a conflict.",
        },
        {
          slug: "merge-intervals",
          note: "Sort by start time. Iterate and merge overlapping intervals by extending the end time.",
        },
        {
          slug: "insert-interval",
          note: "Add all intervals before the new one, merge overlapping ones, then add the remaining intervals.",
        },
        {
          slug: "non-overlapping-intervals",
          note: "Sort by end time (greedy). Count intervals that overlap with the last kept interval - those must be removed.",
        },
        {
          slug: "interval-list-intersections",
          note: "Two pointers on two sorted lists. The intersection is [max of starts, min of ends]. Advance the one that ends first.",
        },
      ],
    },
    {
      title: "Phase 9: Graphs - BFS & DFS",
      description:
        "Build on tree traversals. Graphs add cycles and multiple paths, requiring visited tracking.",
      questions: [
        {
          slug: "number-of-islands",
          note: "Iterate grid cells. When you find '1', BFS/DFS to mark the entire island as visited. Count the number of BFS/DFS calls.",
        },
        {
          slug: "pacific-atlantic-water-flow",
          note: "BFS/DFS from ocean borders inward (reverse flow). Cells reachable from both oceans are in the answer.",
        },
        {
          slug: "graph-valid-tree",
          note: "A valid tree has exactly n-1 edges and is fully connected. Use BFS/DFS or Union-Find to verify.",
        },
        {
          slug: "number-of-connected-components-in-an-undirected-graph",
          note: "Count connected components with BFS/DFS or Union-Find. Each unvisited node starts a new component.",
        },
        {
          slug: "course-schedule",
          note: "Detect cycles in a directed graph. Use DFS with 3 states (unvisited, in-progress, done) or BFS topological sort.",
        },
      ],
    },
    {
      title: "Phase 10: Heaps & Priority Queues",
      description:
        "Heaps efficiently maintain the min or max element. Essential for 'top K' and streaming problems.",
      questions: [
        {
          slug: "kth-largest-element-in-an-array",
          note: "Use a min-heap of size k. After processing all elements, the top of the heap is the kth largest.",
        },
        {
          slug: "top-k-frequent-elements",
          note: "Count frequencies with a map, then use a min-heap of size k to keep the top k frequent elements.",
        },
        {
          slug: "k-closest-points-to-origin",
          note: "Use a max-heap of size k. Compare squared distances (no need for sqrt). Replace when closer point found.",
        },
        {
          slug: "meeting-rooms-ii",
          note: "Sort by start time. Use a min-heap of end times. If earliest ending room is free, reuse it; otherwise add a new room.",
        },
        {
          slug: "kth-smallest-element-in-a-sorted-matrix",
          note: "Min-heap approach: start with first column, expand right. Or use binary search on the value range.",
        },
      ],
    },
    {
      title: "Phase 10: Matrix Traversal",
      description:
        "Apply array and graph techniques to 2D grids. Row/column math and directional traversal are key skills.",
      mediumDescription:
        "Navigate matrices with boundary tracking, in-place marking, and coordinate transformations like transpose and spiral order.",
      questions: [
        {
          slug: "convert-1d-array-into-2d-array",
          note: "First check if the total elements fit into m×n. Then fill the 2D array row by row, pulling elements from the 1D array in order.",
        },
        {
          slug: "set-matrix-zeroes",
          note: "Use first row/column as markers. Two passes: mark which rows/cols need zeroing, then apply.",
        },
        {
          slug: "spiral-matrix",
          note: "Track four boundaries (top, bottom, left, right). Traverse right→down→left→up, shrinking boundaries each loop.",
        },
        {
          slug: "rotate-image",
          note: "Transpose the matrix (swap [i][j] with [j][i]), then reverse each row. This gives a 90° clockwise rotation.",
        },
      ],
    },
    {
      title: "Phase 11: Prefix Sums",
      description:
        "Prefix sums let you compute range sums in O(1) after O(n) preprocessing. A powerful technique for subarray problems.",
      mediumDescription:
        "Extend the prefix idea to products. Build left and right prefix arrays to compute results without division.",
      questions: [
        {
          slug: "range-sum-query-immutable",
          note: "Pre-compute a running total array. To get the sum of any range, subtract the running total at the start from the running total at the end.",
        },
      ],
    },
  ],
  nextSteps: [
    "**Re-solve problems that gave you trouble** - if a question stumped you, redo it until the approach clicks. Repetition is how patterns become second nature.",
    "Remember to **study solutions using an AI agent/YouTube video if you get stuck** - I still have to do this occassionally for some questions!",
    "Move onto the **Experienced Roadmap** to solidify your understanding of each pattern across all difficulty levels.",
    "Complete additional questions from the **All Questions** tab - filter by pattern or difficulty to target your weak areas.",
  ],
};

export const experiencedRoadmap: Roadmap = {
  id: "experienced",
  name: "Experienced",
  description:
    "Originally shared on [Blind.com](https://www.teamblind.com/post/new-year-gift-curated-list-of-top-75-leetcode-questions-to-save-your-time-oam1oreu) by [Yangshun Tay](https://www.techinterviewhandbook.org/), the Blind 75 problemset represents the highest-value questions for coding interview preparation.\n\n**Sean's Guidance:**\n" +
    "1. If you're here, you are familiar with technical interviews and the patterns you need to know. **Pick a language** and begin working through all easy problems to build confidence.\n" +
    "2. If you get stuck on a problem for **more than 15 minutes**, consult the **Helpful Tips** tab and proceed to study the solution using an AI agent/YouTube video.\n" +
    "3. Once you have completed all 75 questions, I would recommend **reattempting ones that gave you trouble** before moving onto company-specific lists from [Leetcode Premium](https://leetcode.com/subscribe/) or [1point3acres](https://www.1point3acres.com/interview/).\n" +
    "4. Ensure to leverage free **mock interviews** on [Pramp](https://www.pramp.com/#/) to reacclimate to brain fog/interview anxiety - *you want to fail as many times practicing and not during an interview*.\n" +
    "5. Schedule interviews with companies that are **not your first choice** before interviewing with your goal companies - the practice will drastically help.\n",
  phases: [
    {
      title: "Arrays & Hashing",
      description:
        "Core building blocks. Every interview starts here.",
      mediumDescription:
        "Apply hash maps and frequency counting to solve grouping and sequence problems efficiently.",
      questions: [
        {
          slug: "two-sum",
          note: "Hash map: store num → index. For each element, check if complement exists. O(n) time.",
        },
        {
          slug: "contains-duplicate",
          note: "Set insertion check. If the element already exists in the Set, return true. O(n) time, O(n) space.",
        },
        {
          slug: "valid-anagram",
          note: "Count character frequencies with a hash map or array of 26. Compare counts. O(n) time.",
        },
        {
          slug: "group-anagrams",
          note: "Sort each word to get a key, or use character frequency tuple as key. Group by key in a hash map.",
        },
        {
          slug: "encode-and-decode-strings",
          note: "Prefix each string with its length and a delimiter (e.g., '5#hello'). Decode by reading length first.",
        },
        {
          slug: "product-of-array-except-self",
          note: "Left/right prefix products. O(n) time, O(1) extra space if using the output array.",
        },
        {
          slug: "longest-consecutive-sequence",
          note: "HashSet + only start counting from sequence starts (no num-1 in set). O(n).",
        },
      ],
    },
    {
      title: "Two Pointers",
      description:
        "Scan from opposite ends or use slow/fast for O(n) solutions.",
      mediumDescription:
        "Combine sorting with two-pointer scans to handle multi-element sums and greedy boundary decisions.",
      questions: [
        {
          slug: "valid-palindrome",
          note: "Two pointers from both ends. Skip non-alphanumeric characters. Compare lowercase values.",
        },
        {
          slug: "3sum",
          note: "Sort + fix one element + two-pointer scan on the rest. Skip duplicates carefully.",
        },
        {
          slug: "container-with-most-water",
          note: "Greedy two pointers from both ends. Move the shorter line inward.",
        },
      ],
    },
    {
      title: "Sliding Window",
      description:
        "Optimize subarray/substring problems from O(n²) to O(n).",
      mediumDescription:
        "Handle variable-width windows with shrink conditions, frequency maps, and complex matching criteria.",
      questions: [
        {
          slug: "best-time-to-buy-and-sell-stock",
          note: "Track minimum price seen so far. At each step, check if selling now gives max profit.",
        },
        {
          slug: "longest-substring-without-repeating-characters",
          note: "Expand right, shrink left on duplicate. Use a map storing last seen index for O(n).",
        },
        {
          slug: "longest-repeating-character-replacement",
          note: "Window valid when len - maxFreq ≤ k. No need to decrease maxFreq when shrinking.",
        },
        {
          slug: "minimum-window-substring",
          note: "Expand until all chars covered, then shrink to find minimum. Track 'formed' count vs required.",
        },
      ],
    },
    {
      title: "Stack",
      description:
        "LIFO processing for matching pairs and nested structures.",
      questions: [
        {
          slug: "valid-parentheses",
          note: "Push opening brackets. On closing bracket, check if top matches. Stack must be empty at the end.",
        },
      ],
    },
    {
      title: "Binary Search",
      description:
        "Halve the search space for O(log n). Know the sorted-rotated pattern.",
      questions: [
        {
          slug: "search-in-rotated-sorted-array",
          note: "Determine which half is sorted. Check if target is in the sorted half to decide direction.",
        },
        {
          slug: "find-minimum-in-rotated-sorted-array",
          note: "Compare mid with right. If mid > right, min is in right half. O(log n).",
        },
      ],
    },
    {
      title: "Linked Lists",
      description:
        "Pointer manipulation and in-place operations.",
      mediumDescription:
        "Chain together multiple linked list techniques (find middle, reverse, merge) within a single problem.",
      questions: [
        {
          slug: "reverse-linked-list",
          note: "Iterative: prev/curr/next. Three pointer dance at each step. O(n) time, O(1) space.",
        },
        {
          slug: "merge-two-sorted-lists",
          note: "Dummy head + compare-and-append. Handle remaining nodes at the end.",
        },
        {
          slug: "linked-list-cycle",
          note: "Floyd's: slow moves 1, fast moves 2. Meeting proves cycle exists.",
        },
        {
          slug: "reorder-list",
          note: "Find middle → reverse second half → interleave. Three classic techniques in one problem.",
        },
        {
          slug: "remove-nth-node-from-end-of-list",
          note: "Two pointers with n-node gap. When fast reaches end, slow is at the target.",
        },
        {
          slug: "merge-k-sorted-lists",
          note: "Min-heap with one node from each list. Pop smallest, push its next. O(N log k).",
        },
      ],
    },
    {
      title: "Trees",
      description:
        "Recursive thinking and traversal patterns.",
      mediumDescription:
        "Tackle tree problems that require maintaining global state, enforcing BST constraints, or processing nodes level by level.",
      questions: [
        {
          slug: "invert-binary-tree",
          note: "Swap children at each node, recurse. Top-down or bottom-up both work.",
        },
        {
          slug: "maximum-depth-of-binary-tree",
          note: "DFS: 1 + max(left, right). Base case: null → 0.",
        },
        {
          slug: "same-tree",
          note: "Recursive comparison. Both null=true, one null=false, values differ=false.",
        },
        {
          slug: "subtree-of-another-tree",
          note: "For each node in the main tree, check if the subtree rooted there matches. Reuse same-tree logic.",
        },
        {
          slug: "lowest-common-ancestor-of-a-binary-search-tree",
          note: "Exploit BST property: if both values < node, go left. Both > node, go right. Otherwise, this is the LCA.",
        },
        {
          slug: "binary-tree-level-order-traversal",
          note: "BFS queue. Process all nodes at current level (queue.length snapshot) before next level.",
        },
        {
          slug: "validate-binary-search-tree",
          note: "DFS with (min, max) bounds. Left child: (min, node.val), right: (node.val, max).",
        },
        {
          slug: "kth-smallest-element-in-a-bst",
          note: "In-order traversal gives sorted order. Stop at the kth element. O(H+k) time.",
        },
        {
          slug: "construct-binary-tree-from-preorder-and-inorder-traversal",
          note: "Preorder gives root. Find root in inorder to split left/right subtrees. Use a hashmap for O(1) lookup.",
        },
        {
          slug: "binary-tree-maximum-path-sum",
          note: "DFS returning max single-path sum. At each node, consider: node, node+left, node+right, node+left+right.",
        },
        {
          slug: "serialize-and-deserialize-binary-tree",
          note: "BFS or preorder DFS with null markers. Use delimiter between values for deserialization.",
        },
      ],
    },
    {
      title: "Tries",
      description:
        "Prefix trees for efficient string operations.",
      questions: [
        {
          slug: "implement-trie-prefix-tree",
          note: "TrieNode with children map + isEnd flag. Insert/search/startsWith all follow child pointers.",
        },
        {
          slug: "design-add-and-search-words-data-structure",
          note: "Trie with DFS for '.' wildcard. On '.', recurse into all children. Otherwise follow the exact child.",
        },
        {
          slug: "word-search-ii",
          note: "Build trie from words, then DFS on the board. Prune trie branches to optimize. Much faster than checking each word separately.",
        },
      ],
    },
    {
      title: "Heap / Priority Queue",
      description:
        "Efficiently track min/max in dynamic datasets.",
      questions: [
        {
          slug: "top-k-frequent-elements",
          note: "Bucket sort by frequency: O(n). Or min-heap of size k: O(n log k).",
        },
        {
          slug: "find-median-from-data-stream",
          note: "Two heaps: max-heap for lower half, min-heap for upper half. Balance sizes. Median from tops.",
        },
      ],
    },
    {
      title: "Graphs",
      description:
        "BFS, DFS, Union-Find, and topological sort.",
      questions: [
        {
          slug: "number-of-islands",
          note: "DFS/BFS from each '1', mark visited. Count the number of traversals started.",
        },
        {
          slug: "clone-graph",
          note: "BFS or DFS with a hash map from original node → cloned node. Clone neighbors recursively, reuse if already cloned.",
        },
        {
          slug: "pacific-atlantic-water-flow",
          note: "Reverse BFS/DFS from ocean borders. Cells reachable from both = intersection of two sets.",
        },
        {
          slug: "course-schedule",
          note: "Cycle detection in directed graph. BFS topological sort (Kahn's) or DFS with 3-color states.",
        },
        {
          slug: "graph-valid-tree",
          note: "n-1 edges + connected = tree. Use Union-Find or BFS/DFS.",
        },
        {
          slug: "number-of-connected-components-in-an-undirected-graph",
          note: "Union-Find or DFS. Count roots/traversals.",
        },
        {
          slug: "alien-dictionary",
          note: "Build directed graph from adjacent word comparisons. Topological sort gives the ordering.",
        },
      ],
    },
    {
      title: "Dynamic Programming",
      description:
        "Break problems into overlapping subproblems with optimal substructure.",
      mediumDescription:
        "Apply DP to strings, sequences, and grid problems. Identify the recurrence relation and optimize space.",
      questions: [
        {
          slug: "climbing-stairs",
          note: "dp[i] = dp[i-1] + dp[i-2]. Fibonacci pattern. O(n) time, O(1) space with two variables.",
        },
        {
          slug: "house-robber",
          note: "dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Rob or skip each house.",
        },
        {
          slug: "house-robber-ii",
          note: "Circular array: run House Robber twice - once excluding first house, once excluding last. Take the max.",
        },
        {
          slug: "longest-palindromic-substring",
          note: "Expand around center for each position. Check both odd and even length palindromes. O(n²) time.",
        },
        {
          slug: "palindromic-substrings",
          note: "Expand around each center (odd + even). Count all valid expansions. O(n²) time.",
        },
        {
          slug: "decode-ways",
          note: "dp[i] depends on single digit (1-9) and two digits (10-26). Similar to climbing stairs with constraints.",
        },
        {
          slug: "coin-change",
          note: "dp[amount] = min(dp[amount], dp[amount-coin] + 1) for each coin. Bottom-up, init dp[0]=0.",
        },
        {
          slug: "maximum-product-subarray",
          note: "Track both max and min product at each position (negatives can flip). Update with current element.",
        },
        {
          slug: "word-break",
          note: "dp[i] = true if dp[j] is true and s[j..i] is in the dictionary, for any j < i.",
        },
        {
          slug: "longest-increasing-subsequence",
          note: "O(n²): dp[i] = max(dp[j]+1) for all j<i where nums[j]<nums[i]. O(n log n): patience sorting with binary search.",
        },
        {
          slug: "longest-common-subsequence",
          note: "2D DP: if chars match, dp[i][j] = dp[i-1][j-1] + 1. Otherwise max(dp[i-1][j], dp[i][j-1]). O(m·n).",
        },
        {
          slug: "unique-paths",
          note: "dp[i][j] = dp[i-1][j] + dp[i][j-1]. Can optimize to 1D array.",
        },
        {
          slug: "combination-sum-iv",
          note: "dp[target] = sum of dp[target - num] for each num. Order matters - this is a permutation count.",
        },
      ],
    },
    {
      title: "Greedy",
      description:
        "Make locally optimal choices that lead to globally optimal solutions.",
      questions: [
        {
          slug: "maximum-subarray",
          note: "Kadane's algorithm: extend current subarray or start fresh. Track global max. O(n).",
        },
        {
          slug: "jump-game",
          note: "Track the farthest reachable index. If current index exceeds it, return false.",
        },
      ],
    },
    {
      title: "Intervals",
      description:
        "Sort by start or end time, then merge or sweep.",
      questions: [
        {
          slug: "insert-interval",
          note: "Add non-overlapping before, merge overlapping, add remaining after.",
        },
        {
          slug: "merge-intervals",
          note: "Sort by start. Merge if current.start ≤ prev.end. Extend prev.end = max(prev.end, current.end).",
        },
        {
          slug: "non-overlapping-intervals",
          note: "Greedy: sort by end time. Remove intervals that overlap with the last kept one.",
        },
        {
          slug: "meeting-rooms",
          note: "Sort by start time. If any meeting starts before the previous ends, return false.",
        },
        {
          slug: "meeting-rooms-ii",
          note: "Min-heap of end times. If earliest room is free (end ≤ start), reuse; else allocate new.",
        },
      ],
    },
    {
      title: "Matrix",
      description:
        "Matrix transformations and spatial reasoning.",
      questions: [
        {
          slug: "set-matrix-zeroes",
          note: "Use first row/column as markers. Two passes: mark which rows/cols need zeroing, then apply.",
        },
        {
          slug: "spiral-matrix",
          note: "Track four boundaries (top, bottom, left, right). Traverse right→down→left→up, shrinking each loop.",
        },
        {
          slug: "rotate-image",
          note: "Transpose the matrix (swap [i][j] with [j][i]), then reverse each row. 90° clockwise rotation.",
        },
        {
          slug: "word-search",
          note: "DFS from each cell. Mark visited, explore 4 directions, unmark on backtrack. O(m·n·4^L).",
        },
      ],
    },
    {
      title: "Bit Manipulation",
      description:
        "Use bitwise operations for O(1) space tricks and efficient counting.",
      questions: [
        {
          slug: "number-of-1-bits",
          note: "Repeatedly clear the lowest set bit with n & (n-1) and count. Or check each bit with n & 1 and right-shift.",
        },
        {
          slug: "counting-bits",
          note: "dp[i] = dp[i >> 1] + (i & 1). Each number's bit count relates to its right-shifted value.",
        },
        {
          slug: "reverse-bits",
          note: "Extract each bit from right, place it in the reversed position. Or swap halves progressively (divide and conquer).",
        },
        {
          slug: "missing-number",
          note: "XOR all indices and values. Paired numbers cancel out, leaving the missing one. Or use sum formula.",
        },
        {
          slug: "sum-of-two-integers",
          note: "Use XOR for addition without carry, AND + left shift for carry. Repeat until carry is 0.",
        },
      ],
    },
  ],
  nextSteps: [
    "**Re-solve problems that gave you trouble** - if you struggled with a question, redo it until the approach is second nature.",
    "Work through remaining questions in the **All Questions** tab or **company-specific lists** from [Leetcode Premium](https://leetcode.com/subscribe/), [InterviewDB](https://www.interviewdb.io/get-started), or [1point3acres](https://www.1point3acres.com/interview/thread/1167709) to target your upcoming interviews.",
    "I highly recommend **taking advantage of free mock interviews** on [Pramp](https://www.pramp.com/#/) - *you want to fail as many times practicing and not during an interview*.",
  ],
};

export const roadmaps = [beginnerRoadmap, experiencedRoadmap];
