class Solution {
    public boolean validTree(int n, int[][] edges) {
        List<List<Integer>> adjList = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            adjList.add(new ArrayList<>());
        }

        for (int[] edge : edges) {
            adjList.get(edge[0]).add(edge[1]);
            adjList.get(edge[1]).add(edge[0]);
        }

        Map<Integer, Integer> parents = new HashMap<>();
        Queue<Integer> q = new LinkedList<>();

        parents.put(0, -1);
        q.offer(0);

        while (!q.isEmpty()) {
            int node = q.poll();

            for (int neighbour : adjList.get(node)) {
                if (parents.get(node) == neighbour) {
                    continue;
                }
                if (parents.containsKey(neighbour)) {
                    return false;
                }

                parents.put(neighbour, node);
                q.offer(neighbour);
            }
        }

        return parents.size() == n;
    }
}
