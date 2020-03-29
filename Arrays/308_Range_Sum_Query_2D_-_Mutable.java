class NumMatrix {
    private int[][] tree;
    private int[][] nums;
    private int m, n;

    public NumMatrix(int[][] matrix) {
        if (matrix == null || matrix.length == 0) {
            return;
        }

        m = matrix.length;
        n = matrix[0].length;

        tree = new int[m + 1][n + 1];
        nums = new int[m][n];

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                update(i, j, matrix[i][j]);
            }
        }
    }

    public void update(int row, int col, int val) {
        if (m == 0 || n == 0) {
            return;
        }

        int delta = val - nums[row][col];
        nums[row][col] = val;

        for (int i = row + 1; i <= m; i += i & (-i)) {
            for (int j = col + 1; j <= n; j += j & (-j)) {
                tree[i][j] += delta;
            }
        }
    }

    public int sumRegion(int row1, int col1, int row2, int col2) {
        if (m == 0 || n == 0) {
            return 0;
        }

        return calcSum(row2 + 1, col2 + 1) + calcSum(row1, col1) - calcSum(row1, col2 + 1) - calcSum(row2 + 1, col1);
    }

    private int calcSum(int row, int col) {
        int sum = 0;

        for (int i = row; i > 0; i -= i & (-i)) {
            for (int j = col; j > 0; j -= j & (-j)) {
                sum += tree[i][j];
            }
        }

        return sum;
    }
}
