import { Question } from "@/types/question";
import type { Reminder } from "./reminders";

const STORAGE_KEY = "leetcode-patterns-completed";
const STARRED_KEY = "leetcode-patterns-starred";
const NOTES_KEY = "leetcode-patterns-notes";
const SHUFFLE_KEY = "leetcode-patterns-shuffle-order";
const SOLVED_DATES_KEY = "leetcode-patterns-solved-dates";
const REMINDERS_KEY = "leetcode-patterns-reminders";

// Slugs from the old CRA version, ordered by old 0-based id
const LEGACY_SLUGS = ["contains-duplicate","missing-number","find-all-numbers-disappeared-in-an-array","single-number","product-of-array-except-self","find-the-duplicate-number","find-all-duplicates-in-an-array","set-matrix-zeroes","spiral-matrix","rotate-image","word-search","first-missing-positive","longest-consecutive-sequence","letter-case-permutation","subsets","subsets-ii","permutations","permutations-ii","combinations","combination-sum","combination-sum-ii","combination-sum-iii","generate-parentheses","target-sum","palindrome-partitioning","letter-combinations-of-a-phone-number","generalized-abbreviation","sudoku-solver","n-queens","climbing-stairs","house-robber","best-time-to-buy-and-sell-stock","maximum-subarray","range-sum-query-immutable","house-robber-ii","coin-change","maximum-product-subarray","longest-increasing-subsequence","longest-palindromic-substring","word-break","combination-sum-iv","decode-ways","unique-paths","jump-game","palindromic-substrings","number-of-longest-increasing-subsequence","partition-equal-subset-sum","partition-to-k-equal-sum-subsets","best-time-to-buy-and-sell-stock-with-cooldown","counting-bits","linked-list-cycle","middle-of-the-linked-list","reverse-linked-list","palindrome-linked-list","remove-linked-list-elements","remove-duplicates-from-sorted-list","linked-list-cycle-ii","add-two-numbers","remove-nth-node-from-end-of-list","sort-list","reorder-list","pacific-atlantic-water-flow","number-of-islands","graph-valid-tree","number-of-connected-components-in-an-undirected-graph","reverse-linked-list-ii","rotate-list","swap-nodes-in-pairs","odd-even-linked-list","reverse-nodes-in-k-group","merge-two-sorted-lists","kth-smallest-element-in-a-sorted-matrix","find-k-pairs-with-smallest-sums","merge-k-sorted-lists","smallest-range-covering-elements-from-k-lists","meeting-rooms","merge-intervals","interval-list-intersections","non-overlapping-intervals","meeting-rooms-ii","task-scheduler","minimum-number-of-arrows-to-burst-balloons","insert-interval","employee-free-time","binary-search","find-smallest-letter-greater-than-target","peak-index-in-a-mountain-array","find-minimum-in-rotated-sorted-array","find-peak-element","search-in-rotated-sorted-array","search-in-rotated-sorted-array-ii","search-a-2d-matrix","search-a-2d-matrix-ii","find-k-closest-elements","count-of-range-sum","minimum-size-subarray-sum","fruit-into-baskets","permutation-in-string","longest-repeating-character-replacement","sliding-window-maximum","longest-substring-without-repeating-characters","minimum-number-of-k-consecutive-bit-flips","count-unique-characters-of-all-substrings-of-a-given-string","minimum-window-substring","substring-with-concatenation-of-all-words","kth-smallest-element-in-a-bst","k-closest-points-to-origin","top-k-frequent-elements","sort-characters-by-frequency","kth-largest-element-in-an-array","reorganize-string","rearrange-string-k-distance-apart","course-schedule-iii","maximum-frequency-stack","course-schedule","course-schedule-ii","minimum-height-trees","alien-dictionary","sequence-reconstruction","binary-tree-level-order-traversal-ii","average-of-levels-in-binary-tree","minimum-depth-of-binary-tree","binary-tree-level-order-traversal","binary-tree-zigzag-level-order-traversal","binary-tree-right-side-view","all-nodes-distance-k-in-binary-tree","same-tree","path-sum","maximum-depth-of-binary-tree","diameter-of-binary-tree","merge-two-binary-trees","lowest-common-ancestor-of-a-binary-search-tree","subtree-of-another-tree","invert-binary-tree","path-sum-ii","path-sum-iii","lowest-common-ancestor-of-a-binary-tree","maximum-binary-tree","maximum-width-of-binary-tree","construct-binary-tree-from-preorder-and-inorder-traversal","validate-binary-search-tree","implement-trie-prefix-tree","binary-tree-maximum-path-sum","serialize-and-deserialize-binary-tree","word-search-ii","find-median-from-data-stream","sliding-window-median","two-sum","squares-of-a-sorted-array","backspace-string-compare","3sum","3sum-closest","subarray-product-less-than-k","sort-colors","trapping-rain-water","container-with-most-water","longest-word-in-dictionary","index-pairs-of-a-string","maximum-xor-of-two-numbers-in-an-array","concatenated-words","prefix-and-suffix-search","palindrome-pairs","design-search-autocomplete-system","word-squares","sort-items-by-groups-respecting-dependencies","median-of-two-sorted-arrays","majority-element","convert-1d-array-into-2d-array","move-zeroes","is-subsequence","binary-tree-paths","factor-combinations","split-a-string-into-the-max-number-of-unique-substrings","maximum-average-subarray-i","gas-station"];

function loadJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {}
  return fallback;
}

function saveJson(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadCompleted(): Set<number> {
  return new Set(loadJson<number[]>(STORAGE_KEY, []));
}

export function saveCompleted(ids: Set<number>): void {
  saveJson(STORAGE_KEY, [...ids]);
}

export function loadStarred(): Set<number> {
  return new Set(loadJson<number[]>(STARRED_KEY, []));
}

export function saveStarred(ids: Set<number>): void {
  saveJson(STARRED_KEY, [...ids]);
}

export function loadNotes(): Record<number, string> {
  return loadJson<Record<number, string>>(NOTES_KEY, {});
}

export function saveNotes(notes: Record<number, string>): void {
  saveJson(NOTES_KEY, notes);
}

export function loadSolvedDates(): Record<number, string> {
  return loadJson<Record<number, string>>(SOLVED_DATES_KEY, {});
}

export function saveSolvedDates(dates: Record<number, string>): void {
  saveJson(SOLVED_DATES_KEY, dates);
}

export function loadReminders(): Record<number, Reminder> {
  return loadJson<Record<number, Reminder>>(REMINDERS_KEY, {});
}

export function saveReminders(reminders: Record<number, Reminder>): void {
  saveJson(REMINDERS_KEY, reminders);
}

export function loadShuffleOrder(): number[] | null {
  return loadJson<number[] | null>(SHUFFLE_KEY, null);
}

export function saveShuffleOrder(order: number[] | null): void {
  if (order) saveJson(SHUFFLE_KEY, order);
  else localStorage.removeItem(SHUFFLE_KEY);
}

export function migrateLegacyProgress(data: Question[]): Set<number> | null {
  if (typeof window === "undefined") return null;
  if (localStorage.getItem("leetcode-patterns-migrated")) return null;
  localStorage.setItem("leetcode-patterns-migrated", "1");
  try {
    const raw = localStorage.getItem("checked");
    if (!raw) return null;
    const boolArray: boolean[] = JSON.parse(raw);
    const slugToId = new Map(data.map((q) => [q.slug, q.id]));
    const ids: number[] = [];
    boolArray.forEach((done, index) => {
      if (!done || index >= LEGACY_SLUGS.length) return;
      const newId = slugToId.get(LEGACY_SLUGS[index]);
      if (newId !== undefined) ids.push(newId);
    });
    localStorage.removeItem("checked");
    localStorage.removeItem("showPatterns");
    localStorage.removeItem("hidePatterns");
    if (ids.length > 0) {
      const existing = loadCompleted();
      const merged = new Set([...existing, ...ids]);
      saveCompleted(merged);
      return merged;
    }
  } catch {}
  return null;
}
