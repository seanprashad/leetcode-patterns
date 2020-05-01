class Solution {
    public int minMeetingRooms(int[][] intervals) {
        if (intervals == null || intervals.length == 0) {
            return 0;
        }

        Arrays.sort(intervals, (i1, i2) -> i1[0] - i2[0]);

        PriorityQueue<Integer> rooms = new PriorityQueue<>();

        for (int[] interval : intervals) {
            int startTime = interval[0];
            int endTime = interval[1];

            if (!rooms.isEmpty() && rooms.peek() <= startTime) {
                rooms.poll();
            }

            rooms.offer(endTime);
        }

        return rooms.size();
    }
}
