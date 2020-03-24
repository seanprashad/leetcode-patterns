class TicTacToe {
    private int[] rows, cols;
    private int diagonal, antiDiagonal;

    public TicTacToe(int n) {
        rows = new int[n];
        cols = new int[n];
        diagonal = antiDiagonal = 0;
    }

    public int move(int row, int col, int player) {
        int n = rows.length;
        int mark = player == 1 ? 1 : -1;

        rows[row] += mark;
        cols[col] += mark;

        if (row == col) {
            diagonal += mark;
        }
        if (row + col == n - 1) {
            antiDiagonal += mark;
        }

        if (Math.abs(rows[row]) == n || Math.abs(cols[col]) == n || Math.abs(diagonal) == n
                || Math.abs(antiDiagonal) == n) {
            return player;
        }

        return 0;
    }
}
