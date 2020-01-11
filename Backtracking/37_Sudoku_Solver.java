class Solution {
    public void solveSudoku(char[][] board) {
        if (board == null || board.length == 0) {
            return;
        }

        solve(board);
    }

    private boolean isValid(char[][] board, int row, int col, char num) {
        int blockRow = (row / 3) * 3, blockCol = (col / 3) * 3;

        for (int i = 0; i < 9; i++) {
            if (board[i][col] == num || board[row][i] == num || board[blockRow + i / 3][blockCol + i % 3] == num) {
                return false;
            }
        }

        return true;
    }

    private boolean solve(char[][] board) {
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[i].length; j++) {
                if (board[i][j] == '.') {
                    for (char c = '1'; c <= '9'; c++) {
                        if (isValid(board, i, j, c)) {
                            board[i][j] = c;

                            if (solve(board)) {
                                return true;
                            } else {
                                board[i][j] = '.';
                            }
                        }
                    }

                    return false;
                }
            }
        }

        return true;
    }
}
