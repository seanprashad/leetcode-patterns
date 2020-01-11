class Solution {
    public int[][] kClosest(int[][] points, int K) {
        if (points == null || points.length == 0) {
            return points;
        }

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);

        for (int i = 0; i < points.length; i++) {
            int distance = (Math.abs(points[i][0]) * Math.abs(points[i][0]))
                    + (Math.abs(points[i][1]) * Math.abs(points[i][1]));
            pq.offer(new int[] { i, distance });
        }

        ArrayList<int[]> result = new ArrayList<>();
        while (K > 0) {
            result.add(points[pq.poll()[0]]);
            --K;
        }

        return result.toArray(new int[result.size()][]);
    }
}
