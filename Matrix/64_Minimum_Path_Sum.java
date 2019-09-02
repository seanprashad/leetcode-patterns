class Solution {
    public int minPathSum(int[][] grid) {
        int height = grid.length, width = grid[0].length;
        int[][] memo = new int[height][width];

        for (int[] row : memo) {
            Arrays.fill(row, -1);
        }

        return helper(grid, 0, 0, memo);
    }

    private int helper(int[][] grid, int row, int col, int[][] memo) {
        if (row == grid.length - 1 && col == grid[0].length - 1) {
            return grid[row][col];
        }

        if (memo[row][col] != -1) {
            return memo[row][col];
        }

        if (row == grid.length - 1) {
            return grid[row][col] + helper(grid, row, col + 1, memo);
        }
        if (col == grid[0].length - 1) {
            return grid[row][col] + helper(grid, row + 1, col, memo);
        }

        int result = grid[row][col] + Math.min(helper(grid, row + 1, col, memo), helper(grid, row, col + 1, memo));
        memo[row][col] = result;
        return result;
    }
}
