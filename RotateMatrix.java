public class RotateMatrix {

	public static boolean rotate(int[][] matrix) {
		int length = matrix.length - 1;

		// Need <= for the inner rotations
		for (int i = 0; i <= length / 2; i++) {
			for (int j = i; j < length - i; j++) {
				// Top left - coord 1
				int p1 = matrix[i][j];

				// Top right - coord 2
				int p2 = matrix[j][length - i];

				// Bottom right - coord 3
				int p3 = matrix[length - i][length - j];

				// Bottom left - coord 4
				int p4 = matrix[length - j][i];

				// Coord 2 gets coord 1
				matrix[j][length - i] = p1;

				// Coord 3 gets coord 2
				matrix[length - i][length - j] = p2;

				// Coord 4 gets coord 3
				matrix[length - j][i] = p3;

				// Coord 1 gets coord 4
				matrix[i][j] = p4;
			}
		}
		return true;
	}

	public static void main(String[] args) {
		int[][] matrix = AssortedMethods.randomMatrix(4, 4, 0, 9);
		AssortedMethods.printMatrix(matrix);
		rotate(matrix);
		System.out.println();
		AssortedMethods.printMatrix(matrix);
	}

}
