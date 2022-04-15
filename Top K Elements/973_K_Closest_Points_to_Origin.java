class Solution {
    public int[][] kClosest(int[][] points, int k) {
        if (points.length == k) {
            return points;
        }

        List<int[]> result = new ArrayList<>();
        int idx = quickSelect(points, 0, points.length - 1, k);

        for (int i = 0; i < k; i++) {
            result.add(points[i]);
        }

        return result.toArray(new int[0][]);
    }

    private int quickSelect(int[][] points, int low, int high, int k) {
        int idx = low, pivot = high;
        int pivotDistance = points[pivot][0] * points[pivot][0] + points[pivot][1] * points[pivot][1];

        for (int i = low; i < high; i++) {
            int distance = points[i][0] * points[i][0] + points[i][1] * points[i][1];

            if (distance <= pivotDistance) {
                swap(points, i, idx);
                ++idx;
            }
        }

        swap(points, idx, pivot);

        if (idx == k) {
            return idx;
        } else if (idx < k) {
            return quickSelect(points, idx + 1, high, k);
        } else {
            return quickSelect(points, low, idx - 1, k);
        }
    }

    private void swap(int[][] points, int i, int j) {
        int[] temp = points[i];
        points[i] = points[j];
        points[j] = temp;
    }
}
