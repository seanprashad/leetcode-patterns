class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<Integer>[] adjList = new ArrayList[numCourses];
        int[] indegrees = new int[numCourses];
        Queue<Integer> q = new LinkedList<>();
        int courseCount = 0;

        for (int i = 0; i < numCourses; i++) {
            adjList[i] = new ArrayList<>();
        }
        for (int[] pair : prerequisites) {
            adjList[pair[1]].add(pair[0]);
            ++indegrees[pair[0]];
        }

        for (int i = 0; i < indegrees.length; i++) {
            if (indegrees[i] == 0) {
                q.offer(i);
            }
        }

        while (!q.isEmpty()) {
            int course = q.poll();
            ++courseCount;

            for (int prereqCourse : adjList[course]) {
                if (--indegrees[prereqCourse] == 0) {
                    q.offer(prereqCourse);
                }
            }
        }

        return courseCount == numCourses;
    }
}
