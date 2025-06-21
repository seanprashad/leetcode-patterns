class Solution {
    private int[][] dirs = new int[][]{{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    public int shortestPath(int[][] grid, int k) {
        int targetRow = grid.length - 1, targetCol = grid[0].length - 1;
        
        Queue<int[]> q = new LinkedList<>();
        boolean[][][] visited = new boolean[grid.length][grid[0].length][k + 1];

        q.offer(new int[]{0, 0, 0});
        visited[0][0][0] = true;

        int result = 0;
        while (!q.isEmpty()) {
            int size = q.size();

            for (int i = 0; i < size; i++) {
                int[] currStep = q.poll();
                
                int currRow = currStep[0];
                int currCol = currStep[1];
                int currK = currStep[2];

                if (currRow == targetRow && currCol == targetCol) {
                    return result;
                }

                for (int[] dir : dirs) {
                    int nextRow = currRow + dir[0];
                    int nextCol = currCol + dir[1];
                    int nextK = currK;

                    if (!isValidStep(grid, nextRow, nextCol)) {
                        continue;
                    }

                    if (grid[nextRow][nextCol] == 1) {
                        ++nextK;
                    }

                    if (nextK <= k && !visited[nextRow][nextCol][nextK]) {
                        q.offer(new int[]{nextRow, nextCol, nextK});
                        visited[nextRow][nextCol][nextK] = true;
                    }
                }
            }

            ++result;
        }
        
        return -1;
    }

    private boolean isValidStep(int[][] grid, int row, int col) {
        if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length) {
            return false;
        }

        return true;
    }
}
