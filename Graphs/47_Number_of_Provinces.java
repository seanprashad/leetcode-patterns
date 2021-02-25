class Solution {
    public int findCircleNum(int[][] isConnected) {
        if (isConnected == null || isConnected.length == 0) {
            return 0;
        }

        UnionFind uf = new UnionFind(isConnected.length);

        for (int i = 0; i < isConnected.length; i++) {
            for (int j = 0; j < isConnected[i].length; j++) {
                if (isConnected[i][j] == 1) {
                    uf.union(i, j);
                }
            }
        }

        return uf.count();
    }

    private class UnionFind {
        private int[] parents, size;
        private int count;

        public UnionFind(int n) {
            parents = new int[n];
            size = new int[n];
            count = n;

            for (int i = 0; i < parents.length; i++) {
                parents[i] = i;
                size[i] = 1;
            }
        }

        public int find(int node) {
            if (parents[node] == node) {
                return node;
            }

            parents[node] = find(parents[parents[node]]);
            return parents[node];
        }

        public void union(int x, int y) {
            int xParent = find(x);
            int yParent = find(y);

            if (xParent == yParent) {
                return;
            }

            if (size[xParent] > size[yParent]) {
                parents[yParent] = xParent;
                size[xParent] += size[yParent];
            } else {
                parents[xParent] = yParent;
                size[yParent] += size[xParent];
            }

            --count;
        }

        public int count() {
            return count;
        }
    }
}
