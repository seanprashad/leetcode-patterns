class Solution {
    public int[][] generateMatrix(int n) {
        int[][] res = new int[n][n];

        int minCol = 0, maxCol = n - 1, minRow = 0, maxRow = n - 1;
        int no = 1;

        while (minCol <= maxCol && minRow <= maxRow) {
            for (int i = minCol; i <= maxCol; i++) {
                res[minRow][i] = no++;
            }
            ++minRow;

            for (int i = minRow; i <= maxRow; i++) {
                res[i][maxCol] = no++;
            }
            --maxCol;

            if (minCol > maxCol || minRow > maxRow) {
                break;
            }

            for (int i = maxCol; i >= minCol; i--) {
                res[maxRow][i] = no++;
            }
            --maxRow;

            for (int i = maxRow; i >= minRow; i--) {
                res[i][minCol] = no++;
            }
            ++minCol;
        }

        return res;
    }
}
