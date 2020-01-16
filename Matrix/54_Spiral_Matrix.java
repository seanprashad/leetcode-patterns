class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        if (matrix == null || matrix.length == 0) {
            return Collections.emptyList();
        }

        List<Integer> res = new ArrayList<>();
        int rowMin = 0, rowMax = matrix.length - 1, colMin = 0, colMax = matrix[0].length - 1;

        while (rowMin <= rowMax && colMin <= colMax) {
            for (int i = colMin; i <= colMax; i++) {
                res.add(matrix[rowMin][i]);
            }
            ++rowMin;

            for (int i = rowMin; i <= rowMax; i++) {
                res.add(matrix[i][colMax]);
            }
            --colMax;

            if (rowMin > rowMax || colMin > colMax) {
                break;
            }

            for (int i = colMax; i >= colMin; i--) {
                res.add(matrix[rowMax][i]);
            }
            --rowMax;

            for (int i = rowMax; i >= rowMin; i--) {
                res.add(matrix[i][colMin]);
            }
            ++colMin;
        }

        return res;
    }
}
