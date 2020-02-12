import java.util.HashMap;

public class A1 {
    /*
     * The values of the matrix will represent numbers of apples available to the
     * gopha in each square of the garden. If the garden does not have an exact
     * center, the gopha should start in the square closest to the center with the
     * highest apple count.
     * 
     * On a given turn, the gopha will eat the apples available on the square that
     * it is on, and then move up, down, left, or right, choosing the square that
     * has the most apples. If there are no apples left on any of the adjacent
     * squares, the gopha will go to sleep. You may assume that the gopha will never
     * have to choose between two squares with the same number of apples.
     */
    public static int maxApplesToPick(int[][] garden) {
        int numApples = 0;
        // Find center
        Square current = findCenter(garden);
        // Add number of apples to sum, then set to 0 for that square
        // Compare surrounding 4 squares to see which has max
        // Go to that square and repeat
        // Stop when all surrounding squares are 0 or less, and return sum

        boolean isMoreApples = true;
        HashMap<Integer, Square> hm = new HashMap<>();

        while (isMoreApples) {
            numApples += current.value;
            // current.value = 0;
            garden[current.row][current.col] = 0;

            int currRow = current.row;
            int currCol = current.col;

            int leftApples = numApples(garden, currRow, currCol - 1);
            int rightApples = numApples(garden, currRow, currCol + 1);
            int upApples = numApples(garden, currRow - 1, currCol);
            int downApples = numApples(garden, currRow + 1, currCol);

            // public Square(int value, int row, int col)
            hm.put(leftApples, new Square(leftApples, currRow, currCol - 1));
            hm.put(rightApples, new Square(rightApples, currRow, currCol + 1));
            hm.put(upApples, new Square(upApples, currRow - 1, currCol));
            hm.put(downApples, new Square(downApples, currRow + 1, currCol));

            int horizontalMax = Math.max(hm.get(leftApples).value, hm.get(rightApples).value);
            int verticalMax = Math.max(hm.get(upApples).value, hm.get(downApples).value);
            int max = Math.max(horizontalMax, verticalMax);

            if (max <= 0) {
                isMoreApples = false;
            }

            current = hm.get(max);
            hm.clear();
        }

        return numApples;
    }

    private static int numApples(int[][] garden, int row, int col) {
        if (row >= garden.length || row < 0 || col >= garden[0].length || col < 0) {
            return -1;
        }
        return garden[row][col];
    }

    public static class Square {
        private int value;
        private int row;
        private int col;

        public Square(int value, int row, int col) {
            this.value = value;
            this.row = row;
            this.col = col;
        }
    }

    public static Square findCenter(int[][] garden) {
        // Assume num of columns is always odd
        int midCol = garden[0].length / 2;
        int midRow = garden.length / 2;
        if (midRow % 2 == 0) {
            if (garden[midRow - 1][midCol] > garden[midRow][midCol]) {
                midRow--;
            }
        }
        return new Square(garden[midRow][midCol], midRow, midCol);
    }

    public static void main(String[] args) {
        int[][] garden = new int[][] { { 5, 7, 8, 6, 3 }, { 0, 0, 7, 0, 4 }, { 4, 6, 3, 4, 9 }, { 3, 1, 0, 5, 8 } };

        int result = maxApplesToPick(garden);
        System.out.println(result);

        return;
    }
}