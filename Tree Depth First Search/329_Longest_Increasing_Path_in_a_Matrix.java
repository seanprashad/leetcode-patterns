class Solution {
    private static final int[][] dirs = { { 0, -1 }, { 0, 1 }, { -1, 0 }, { 1, 0 } };

    public int longestIncreasingPath(int[][] matrix) {
        if (matrix == null || matrix.length == 0) {
            return 0;
        }

        int result = 0;

        int[][] cache = new int[matrix.length][matrix[0].length];

        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                result = Math.max(result, dfs(matrix, i, j, cache));
            }
        }

        return result;
    }

    private int dfs(int[][] matrix, int x, int y, int[][] cache) {
        if (cache[x][y] != 0) {
            return cache[x][y];
        }

        int max = 1;

        for (int[] dir : dirs) {
            int nextX = dir[0] + x;
            int nextY = dir[1] + y;

            if (nextX < 0 || nextX >= matrix.length || nextY < 0 || nextY >= matrix[0].length
                    || matrix[nextX][nextY] <= matrix[x][y]) {
                continue;
            }

            int len = 1 + dfs(matrix, nextX, nextY, cache);
            max = Math.max(max, len);
        }

        cache[x][y] = max;
        return max;
    }
}
