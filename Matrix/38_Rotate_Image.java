public class Rotate_Image_38 {
    public static void rotateClockwise(int[][] matrix) {
        int start = 0, end = matrix.length - 1;
        int[] temp;

        while (start < end) {
            temp = matrix[start];
            matrix[start] = matrix[end];
            matrix[end] = temp;
            start++;
            end--;
        }

        transpose(matrix);
    }

    public static void rotateCounterClockwise(int[][] matrix) {
        int temp;

        for (int[] row : matrix) {
            int start = 0, end = row.length - 1;

            while (start < end) {
                temp = row[start];
                row[start] = row[end];
                row[end] = temp;
                start++;
                end--;
            }
        }

        transpose(matrix);
    }

    private static void transpose(int[][] matrix) {
        int temp;

        for (int i = 0; i < matrix.length; i++) {
            for (int j = i + 1; j < matrix[i].length; j++) {
                temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
    }
}
