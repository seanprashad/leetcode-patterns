class Solution {
    public int minPathSum(int[][] grid) {
        int[][] dp = new int[grid.length][grid[0].length];

        for (int row = 0; row < grid.length; row++) {
            for (int col = 0; col < grid[row].length; col++) {

                if (row == 0 && col == 0) {
                    dp[row][col] = grid[row][col];
                } else if (row == 0) {
                    dp[row][col] = grid[row][col] + dp[row][col - 1];
                } else if (col == 0) {
                    dp[row][col] = grid[row][col] + dp[row - 1][col];
                } else {
                    dp[row][col] = grid[row][col] + Math.min(dp[row - 1][col], dp[row][col - 1]);
                }
            }
        }

        return dp[grid.length - 1][grid[0].length - 1];
    }
}
