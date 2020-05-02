class Solution {
    public int countComponents(int n, int[][] edges) {
        if (n <= 1) {
            return n;
        }

        Map<Integer, Set<Integer>> graph = new HashMap<>();

        for (int i = 0; i < n; i++) {
            graph.put(i, new HashSet<>());
        }

        for (int[] edge : edges) {
            graph.get(edge[0]).add(edge[1]);
            graph.get(edge[1]).add(edge[0]);
        }

        Set<Integer> visited = new HashSet<>();
        int result = 0;

        for (int idx : graph.keySet()) {
            if (visited.contains(idx)) {
                continue;
            }

            ++result;
            helper(graph, idx, visited);
        }

        return result;
    }

    private void helper(Map<Integer, Set<Integer>> graph, int idx, Set<Integer> visited) {
        if (!graph.containsKey(idx) || visited.contains(idx)) {
            return;
        }

        visited.add(idx);

        for (int neighbour : graph.get(idx)) {
            helper(graph, neighbour, visited);
        }
    }
}
