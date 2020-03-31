class Solution {
    public int numSquares(int n) {
        Queue<Integer> q = new LinkedList<>();
        Set<Integer> visited = new HashSet<>();

        q.offer(0);
        visited.add(0);

        int level = 0;

        while (!q.isEmpty()) {
            int size = q.size();

            for (int i = 0; i < size; i++) {
                int currVal = q.poll();

                for (int j = 1; j * j <= n; j++) {
                    int sum = j * j + currVal;

                    if (sum == n) {
                        return level + 1;
                    }
                    if (sum > n) {
                        break;
                    }

                    if (!visited.contains(sum)) {
                        q.offer(sum);
                        visited.add(sum);
                    }
                }
            }

            ++level;
        }

        return n;
    }
}
