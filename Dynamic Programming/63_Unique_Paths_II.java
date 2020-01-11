class Solution {
    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
        if (obstacleGrid == null || obstacleGrid.length == 0) {
            return 0;
        }

        int rows = obstacleGrid.length, cols = obstacleGrid[0].length;
        int[][] dp = new int[rows][cols];

        for (int i = 0; i < rows; i++) {
            if (obstacleGrid[i][0] == 0) {
                dp[i][0] = 1;
            } else {
                while (i < rows) {
                    dp[i][0] = 0;
                    ++i;
                }
            }
        }

        for (int j = 0; j < cols; j++) {
            if (obstacleGrid[0][j] == 0) {
                dp[0][j] = 1;
            } else {
                while (j < cols) {
                    dp[0][j] = 0;
                    ++j;
                }
            }
        }

        for (int i = 1; i < rows; i++) {
            for (int j = 1; j < cols; j++) {
                if (obstacleGrid[i][j] == 1) {
                    dp[i][j] = 0;
                    continue;
                }
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }

        return dp[rows - 1][cols - 1];
    }
}
