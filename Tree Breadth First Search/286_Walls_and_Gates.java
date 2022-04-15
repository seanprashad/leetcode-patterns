class Solution {
    public void wallsAndGates(int[][] rooms) {
        Set<int[]> gates = new HashSet<>();

        for (int row = 0; row < rooms.length; row++) {
            for (int col = 0; col < rooms[row].length; col++) {
                if (rooms[row][col] == 0) {
                    gates.add(new int[] { row, col });
                }
            }
        }

        Queue<int[]> q = new LinkedList<>();

        for (int[] gate : gates) {
            q.offer(gate);
        }

        int distance = 0;
        boolean[][] visited = new boolean[rooms.length][rooms[0].length];

        while (!q.isEmpty()) {
            int size = q.size();

            for (int i = 0; i < size; i++) {
                int[] coord = q.poll();
                int x = coord[0], y = coord[1];

                if (x < 0 || y < 0 || x >= rooms.length || y >= rooms[0].length ||
                        rooms[x][y] == -1 || visited[x][y]) {
                    continue;
                }

                rooms[x][y] = Math.min(rooms[x][y], distance);
                visited[x][y] = true;

                q.offer(new int[] { x + 1, y });
                q.offer(new int[] { x - 1, y });
                q.offer(new int[] { x, y + 1 });
                q.offer(new int[] { x, y - 1 });
            }

            ++distance;
        }
    }
}
