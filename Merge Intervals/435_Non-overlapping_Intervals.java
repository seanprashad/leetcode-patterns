class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals == null || intervals.length == 0) {
            return 0;
        }

        Arrays.sort(intervals, (i1, i2) -> i1[0] - i2[0]);

        int result = 0;
        int[] prevInterval = intervals[0];

        for (int i = 1; i < intervals.length; i++) {
            if (prevInterval[1] <= intervals[i][0]) {
                prevInterval = intervals[i];
                continue;
            }

            ++result;
            if (intervals[i][1] < prevInterval[1]) {
                prevInterval = intervals[i];
            }
        }

        return result;
    }
}
