class Solution {
    public int findMinArrowShots(int[][] points) {
        if (points == null || points.length == 0) {
            return 0;
        }

        Arrays.sort(points, (p1, p2) -> {
            return p2[0] - p1[0];
        });

        int arrowPos = points[0][0];
        int arrowCount = 1;

        for (int i = 1; i < points.length; i++) {
            if (points[i][1] >= arrowPos) {
                continue;
            } else {
                ++arrowCount;
                arrowPos = points[i][0];
            }
        }

        return arrowCount;
    }
}
