class Solution {
    public int kthSmallest(int[][] matrix, int k) {
        int low = matrix[0][0], high = matrix[matrix.length - 1][matrix[0].length - 1];

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (countLessThan(matrix, mid) < k) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return low;
    }

    private int countLessThan(int[][] matrix, int k) {
        int count = 0;

        for (int[] row : matrix) {
            int left = 0, right = row.length;

            while (left < right) {
                int mid = left + (right - left) / 2;

                if (row[mid] <= k) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }

            count += left;
        }

        return count;
    }
}
