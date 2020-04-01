class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        Map<Integer, Set<Integer>> graph = new HashMap<>();
        int[] indegrees = new int[numCourses];

        for (int[] p : prerequisites) {
            graph.putIfAbsent(p[1], new HashSet<>());
            graph.get(p[1]).add(p[0]);

            indegrees[p[0]]++;
        }

        int[] result = new int[numCourses];
        Queue<Integer> q = new LinkedList<>();

        for (int i = 0; i < indegrees.length; i++) {
            if (indegrees[i] == 0) {
                q.offer(i);
            }
        }

        int idx = 0;
        while (!q.isEmpty()) {
            int curr = q.poll();

            if (indegrees[curr] == 0) {
                result[idx++] = curr;
            }

            if (!graph.containsKey(curr)) {
                continue;
            }

            for (int neighbour : graph.get(curr)) {
                indegrees[neighbour]--;

                if (indegrees[neighbour] == 0) {
                    q.offer(neighbour);
                }
            }
        }

        return idx == numCourses ? result : new int[0];
    }
}
