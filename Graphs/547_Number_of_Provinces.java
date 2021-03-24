class Solution {
    public int findCircleNum(int[][] isConnected) {
        UnionFind uf = new UnionFind(isConnected.length);

        for (int row = 0; row < isConnected.length; row++) {
            for (int col = 0; col < isConnected[row].length; col++) {
                if (isConnected[row][col] == 1) {
                    uf.union(row, col);
                }
            }
        }

        return uf.noOfComponents;
    }

    private class UnionFind {
        private int[] parents, counts;
        private int noOfComponents;

        public UnionFind(int n) {
            noOfComponents = n;
            parents = new int[n];
            counts = new int[n];

            for (int i = 0; i < parents.length; i++) {
                parents[i] = i;
                counts[i] = 1;
            }
        }

        public int find(int node) {
            if (parents[node] == node) {
                return node;
            }

            parents[node] = find(parents[parents[node]]);
            return parents[node];
        }

        public void union(int i, int j) {
            int p1 = find(i), p2 = find(j);

            if (p1 == p2) {
                return;
            }

            if (counts[p1] > counts[p2]) {
                parents[p2] = p1;
                counts[p1] += counts[p2];
            } else {
                parents[p1] = p2;
                counts[p2] += counts[p1];
            }

            --noOfComponents;
        }
    }
}
