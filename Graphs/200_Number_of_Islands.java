class Solution {
    public int numIslands(char[][] grid) {
        int count = 0;

        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[i].length; j++) {
                if (grid[i][j] == '1') {
                    ++count;
                    clearIsland(grid, i, j);
                }
            }
        }

        return count;
    }

    private void clearIsland(char[][] grid, int x, int y) {
        if (x < 0 || y < 0 || x >= grid.length || y >= grid[x].length || grid[x][y] == '0') {
            return;
        }

        grid[x][y] = '0';

        clearIsland(grid, x + 1, y);
        clearIsland(grid, x - 1, y);
        clearIsland(grid, x, y - 1);
        clearIsland(grid, x, y + 1);
    }
}
