class Solution {
    public List<List<Integer>> allPathsSourceTarget(int[][] graph) {
        List<List<Integer>> res = new ArrayList<>();
        List<Integer> currPath = new ArrayList<>();
        currPath.add(0);
        dfs(graph, res, currPath, 0);
        return res;
    }

    private void dfs(int[][] graph, List<List<Integer>> res, List<Integer> currPath, int node) {
        if (node == graph.length - 1) {
            res.add(new ArrayList<>(currPath));
            return;
        }

        for (int neighbour : graph[node]) {
            currPath.add(neighbour);
            dfs(graph, res, currPath, neighbour);
            currPath.remove(currPath.size() - 1);
        }
    }
}
