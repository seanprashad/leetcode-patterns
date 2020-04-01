class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        if (prerequisites == null || prerequisites.length == 0) {
            return true;
        }

        Map<Integer, Set<Integer>> graph = new HashMap<>();
        int[] indegrees = new int[numCourses];

        for (int[] p : prerequisites) {
            graph.putIfAbsent(p[1], new HashSet<>());
            graph.get(p[1]).add(p[0]);

            indegrees[p[0]]++;
        }

        Queue<Integer> q = new LinkedList<>();

        for (int i = 0; i < indegrees.length; i++) {
            if (indegrees[i] == 0) {
                q.offer(i);
            }
        }

        int count = 0;
        while (!q.isEmpty()) {
            int curr = q.poll();

            if (indegrees[curr] == 0) {
                ++count;
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

        return count == numCourses;
    }
}
