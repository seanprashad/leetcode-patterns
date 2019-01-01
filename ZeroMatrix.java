public class ZeroMatrix {
	private static void nullifyRows(int[][] matrix, int row) {
		for (int j = 0; j < matrix.length; j++) {
			matrix[row][j] = 0;
		}
	}

	private static void nullifyCols(int[][] matrix, int col) {
		for (int i = 0; i < matrix.length; i++) {
			matrix[i][col] = 0;
		}
	}

	public static void setZeros(int[][] matrix) {
		boolean[] rowsToNullify = new boolean[matrix.length];
		boolean[] colsToNullify = new boolean[matrix[0].length];

		for (int i = 0; i < matrix.length; i++) {
			for (int j = 0; j < matrix[0].length; j++) {
				if (matrix[i][j] == 0) {
					rowsToNullify[i] = true;
					colsToNullify[j] = true;
				}
			}
		}

		for (int i = 0; i < rowsToNullify.length; i++) {
			if (rowsToNullify[i]) {
				nullifyRows(matrix, i);
			}
		}

		for (int j = 0; j < colsToNullify.length; j++) {
			if (colsToNullify[j]) {
				nullifyCols(matrix, j);
			}
		}
	}

	public static void main(String[] args) {
		int nrows = 10;
		int ncols = 15;
		int[][] matrix = AssortedMethods.randomMatrix(nrows, ncols, -10, 10);

		AssortedMethods.printMatrix(matrix);
		setZeros(matrix);

		System.out.println();
		AssortedMethods.printMatrix(matrix);
	}
}
