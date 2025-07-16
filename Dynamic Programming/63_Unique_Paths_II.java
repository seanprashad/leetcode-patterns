class Solution {
    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
        int n = obstacleGrid.length, m = obstacleGrid[0].length;
        int[][] dp = new int[n][m];

        for (int col = 0; col < m; col++) {
            if (obstacleGrid[0][col] == 1) {
                dp[0][col] = 0;
                break;
            } else {
                dp[0][col] = 1;
            }
        }

        for (int row = 0; row < n; row++) {
            if (obstacleGrid[row][0] == 1) {
                dp[row][0] = 0;
                break;
            } else {
                dp[row][0] = 1;
            }
        }

        for (int row = 1; row < n; row++) {
            for (int col = 1; col < m; col++) {
                if (obstacleGrid[row][col] == 1) {
                    dp[row][col] = 0;
                } else {
                    dp[row][col] = dp[row - 1][col] + dp[row][col - 1];
                }
            }
        }

        return dp[n - 1][m - 1];
    }
}
