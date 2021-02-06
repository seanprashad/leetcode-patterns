class Solution {
    public int[][] kClosest(int[][] points, int K) {
        if (points == null || points.length == 0) {
            return new int[][] {};
        }

        List<int[]> result = new ArrayList<>();
        PriorityQueue<int[]> pq = new PriorityQueue<>(
                (p1, p2) -> (p2[0] * p2[0] + p2[1] * p2[1]) - (p1[0] * p1[0] + p1[1] * p1[1]));

        for (int[] pair : points) {
            pq.offer(pair);

            if (pq.size() > K) {
                pq.poll();
            }
        }

        while (K-- > 0) {
            result.add(pq.poll());
        }

        return result.toArray(new int[0][]);
    }
}
