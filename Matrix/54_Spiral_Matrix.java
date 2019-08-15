class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        if (matrix == null || matrix.length == 0) {
            return Collections.emptyList();
        }

        List<Integer> result = new ArrayList<>();

        int left = 0;
        int right = matrix[0].length - 1;
        int up = 0;
        int down = matrix.length - 1;

        int totalElements = matrix.length * matrix[0].length;

        while (result.size() < totalElements) {
            for (int j = left; j <= right && result.size() < totalElements; j++) {
                result.add(matrix[up][j]);
            }

            for (int i = up + 1; i <= down - 1 && result.size() < totalElements; i++) {
                result.add(matrix[i][right]);
            }

            for (int j = right; j >= left && result.size() < totalElements; j--) {
                result.add(matrix[down][j]);
            }

            for (int i = down - 1; i >= up + 1 && result.size() < totalElements; i--) {
                result.add(matrix[i][left]);
            }

            ++left;
            --right;
            ++up;
            --down;
        }

        return result;
    }
}
