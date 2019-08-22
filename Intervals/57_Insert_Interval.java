class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int idx = 0;

        while (idx < intervals.length && intervals[idx][1] < newInterval[0]) {
            result.add(intervals[idx++]);
        }

        while (idx < intervals.length && intervals[idx][0] <= newInterval[1]) {
            newInterval[0] = Math.min(intervals[idx][0], newInterval[0]);
            newInterval[1] = Math.max(intervals[idx][1], newInterval[1]);

            ++idx;
        }

        result.add(newInterval);

        while (idx < intervals.length) {
            result.add(intervals[idx++]);
        }

        return result.toArray(new int[result.size()][]);
    }
}
