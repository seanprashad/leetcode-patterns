class Solution {
    public int countComponents(int n, int[][] edges) {
        int[] parents = new int[n];

        for (int i = 0; i < n; i++) {
            parents[i] = i;
        }

        int result = 0;

        for (int[] edge : edges) {
            int p1 = find(parents, edge[0]);
            int p2 = find(parents, edge[1]);

            if (p1 != p2) {
                ++result;
                union(parents, p1, p2);
            }
        }

        return n - result;
    }

    private int find(int[] parents, int node) {
        if (parents[node] == node) {
            return parents[node];
        }
        parents[node] = find(parents, parents[node]);
        return parents[node];
    }

    private void union(int[] parents, int p1, int p2) {
        parents[p1] = p2;
    }
}
