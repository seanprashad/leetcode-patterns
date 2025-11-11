import React from 'react';
import ReactMarkdown from 'react-markdown';

import './styles.scss';

const Tips = () => {
  const input = `
  \`\`\`md
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

If must solve in-place then
- Swap corresponding values
- Store one or more different values in the same pointer

If asked for maximum/minimum subarray/subset/options then
- Dynamic programming
- Sliding window

If asked for top/least K items then
- Heap
- QuickSelect

If asked for common strings then
- Map
- Trie

Else
- Map/Set for O(1) time & O(n) space
- Sort input for O(nlogn) time and O(1) space
\`\`\``;

  return <ReactMarkdown className="tips">{input}</ReactMarkdown>;
};

export default Tips;
