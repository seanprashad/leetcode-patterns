class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals == null || intervals.length <= 1) {
            return intervals;
        }

        Arrays.sort(intervals, (i1, i2) -> Integer.compare(i1[0], i2[0]));

        List<int[]> result = new ArrayList<>();
        int[] interval = intervals[0];

        for (int i = 1; i < intervals.length; i++) {
            if (interval[1] >= intervals[i][0]) {
                interval[1] = Math.max(interval[1], intervals[i][1]);
            } else {
                result.add(interval);
                interval = intervals[i];
            }
        }

        result.add(interval);

        return result.toArray(new int[result.size()][]);
    }
}
