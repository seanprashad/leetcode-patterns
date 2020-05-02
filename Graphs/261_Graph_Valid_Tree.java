class Solution {
    public boolean validTree(int n, int[][] edges) {
        int[] parents = new int[n];

        for (int i = 0; i < parents.length; i++) {
            parents[i] = i;
        }

        for (int i = 0; i < edges.length; i++) {
            if (!union(parents, edges[i][0], edges[i][1])) {
                return false;
            }
            --n;
        }

        return n == 1;
    }

    private int find(int[] parents, int root) {
        if (parents[root] == root) {
            return root;
        }
        return find(parents, parents[root]);
    }

    private boolean union(int[] parents, int firstRoot, int secondRoot) {
        int parentOne = find(parents, firstRoot);
        int parentTwo = find(parents, secondRoot);

        if (parentOne == parentTwo) {
            return false;
        }

        parents[parentTwo] = parents[parentOne];
        return true;
    }
}
