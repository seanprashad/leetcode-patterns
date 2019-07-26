class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals == null || intervals.length <= 1) {
            return 0;
        }

        Arrays.sort(intervals, (i1, i2) -> Integer.compare(i1[0], i2[0]));

        int[] prev = intervals[0];
        int count = 0;

        for (int i = 1; i < intervals.length; i++) {
            int[] curr = intervals[i];

            if (prev[1] <= curr[0]) {
                prev = curr;
                continue;
            }

            ++count;
            if (prev[1] > curr[1]) {
                prev = curr;
            }
        }

        return count;
    }
}
