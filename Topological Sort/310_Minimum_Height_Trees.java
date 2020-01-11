class Solution {
    public List<Integer> findMinHeightTrees(int n, int[][] edges) {
        if (n == 1) {
            return Arrays.asList(0);
        }

        List<Set<Integer>> adjList = new ArrayList<>();
        List<Integer> leaves = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            adjList.add(new HashSet<>());
        }

        for (int[] edge : edges) {
            adjList.get(edge[0]).add(edge[1]);
            adjList.get(edge[1]).add(edge[0]);
        }

        for (int i = 0; i < n; i++) {
            if (adjList.get(i).size() == 1) {
                leaves.add(i);
            }
        }

        while (n > 2) {
            n -= leaves.size();
            List<Integer> newLeaves = new ArrayList<>();

            for (int currLeaf : leaves) {
                int adjLeaf = adjList.get(currLeaf).iterator().next();
                adjList.get(adjLeaf).remove(currLeaf);
                if (adjList.get(adjLeaf).size() == 1) {
                    newLeaves.add(adjLeaf);
                }
            }

            leaves = newLeaves;
        }

        return leaves;
    }
}
