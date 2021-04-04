class Solution {
    public int minKnightMoves(int x, int y) {
        Set<String> seen = new HashSet<>();
        Queue<int[]> q = new LinkedList<>();
        final int[][] directions = new int[][] { { 2, 1 }, { 1, 2 }, { -1, 2 }, { -2, 1 }, { -2, -1 }, { -1, -2 },
                { 1, -2 }, { 2, -1 } };

        q.offer(new int[] { 0, 0 });

        int steps = 0;

        x = Math.abs(x);
        y = Math.abs(y);

        while (!q.isEmpty()) {
            int level = q.size();

            for (int i = 0; i < level; i++) {
                int[] coord = q.poll();
                int row = coord[0], col = coord[1];

                if (row == x && col == y) {
                    return steps;
                }

                for (int[] dir : directions) {
                    int newRow = dir[0] + row, newCol = dir[1] + col;
                    if (!seen.contains(newRow + "," + newCol) && newRow >= -1 && newCol >= -1) {
                        q.offer(new int[] { newRow, newCol });
                        seen.add(newRow + "," + newCol);
                    }
                }
            }

            ++steps;
        }

        return -1;
    }
}
