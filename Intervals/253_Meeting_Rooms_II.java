class Solution {
    public int minMeetingRooms(int[][] intervals) {
        if (intervals == null || intervals.length == 0) {
            return 0;
        }

        Arrays.sort(intervals, (i1, i2) -> i1[0] - i2[0]);

        PriorityQueue<int[]> pq = new PriorityQueue<>((i1, i2) -> i1[1] - i2[1]);

        for (int[] interval : intervals) {
            if (!pq.isEmpty()) {
                int[] endsNext = pq.poll();

                if (interval[0] < endsNext[1]) {
                    pq.offer(endsNext);
                }
            }

            pq.offer(interval);
        }

        return pq.size();
    }
}
