class Solution {
    public int[][] kClosest(int[][] points, int K) {
        if (points == null || points.length == 0) {
            return new int[0][0];
        }

        int low = 0, high = points.length - 1;

        while (low < high) {
            int idx = quickSelect(points, low, high);

            if (idx == K) {
                break;
            } else if (idx < K) {
                low = idx + 1;
            } else {
                high = idx - 1;
            }
        }

        return Arrays.copyOf(points, K);
    }

    private int quickSelect(int[][] points, int low, int high) {
        int idx = low, pivot = high;
        int pivotDistance = distance(points[pivot]);

        for (int i = low; i < high; i++) {
            if (distance(points[i]) < pivotDistance) {
                swap(points, i, idx);
                ++idx;
            }
        }

        swap(points, idx, pivot);
        return idx;
    }

    private void swap(int[][] points, int low, int high) {
        int[] temp = points[low];
        points[low] = points[high];
        points[high] = temp;
        return;
    }

    private int distance(int[] pair) {
        return pair[0] * pair[0] + pair[1] * pair[1];
    }
}
