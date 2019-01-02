public class RotateMatrix {

	public static boolean rotate(int[][] matrix) {
		int len = matrix.length - 1;

		// Need less than or equals because we have to
		// subtract 1 since arrays start from 0
		for (int i = 0; i <= len / 2; i++) {
			for (int j = i; j < len - i; j++) {
				int temp = matrix[i][j];
				matrix[i][j] = matrix[len - j][i];
				matrix[len - j][i] = matrix[len - i][len - j];
				matrix[len - i][len - j] = matrix[j][len - i];
				matrix[j][len - i] = temp;
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
