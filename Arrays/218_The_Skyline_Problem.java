class Solution {
    public List<List<Integer>> getSkyline(int[][] buildings) {
        List<List<Integer>> result = new ArrayList<>();

        List<int[]> points = new ArrayList<>();

        for (int[] b : buildings) {
            points.add(new int[] { b[0], -b[2] });
            points.add(new int[] { b[1], b[2] });
        }

        Collections.sort(points, (p1, p2) -> p1[0] == p2[0] ? p1[1] - p2[1] : p1[0] - p2[0]);

        int maxHeight = 0;
        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
        pq.offer(maxHeight);

        for (int[] p : points) {
            int xCoord = p[0], height = p[1];

            if (height < 0) {
                pq.offer(Math.abs(height));
            } else {
                pq.remove(height);
            }

            if (maxHeight != pq.peek()) {
                maxHeight = pq.peek();
                result.add(Arrays.asList(xCoord, maxHeight));
            }
        }

        return result;
    }
}
