class Solution {
    public List<Integer> findMinHeightTrees(int n, int[][] edges) {
        if (n == 1) {
            return Arrays.asList(0);
        }

        Map<Integer, Set<Integer>> graph = new HashMap<>();

        for (int[] edge : edges) {
            graph.putIfAbsent(edge[0], new HashSet<>());
            graph.putIfAbsent(edge[1], new HashSet<>());

            graph.get(edge[0]).add(edge[1]);
            graph.get(edge[1]).add(edge[0]);
        }

        List<Integer> leaves = new ArrayList<>();

        for (int leaf : graph.keySet()) {
            if (graph.get(leaf).size() == 1) {
                leaves.add(leaf);
            }
        }

        int remainingNodes = n;

        while (remainingNodes > 2) {
            remainingNodes -= leaves.size();
            List<Integer> newLeaves = new ArrayList<>();

            for (int leaf : leaves) {
                int neighbour = graph.get(leaf).iterator().next();
                graph.get(neighbour).remove(leaf);

                if (graph.get(neighbour).size() == 1) {
                    newLeaves.add(neighbour);
                }
            }

            leaves = newLeaves;
        }

        return leaves;
    }
}
