class Solution {
    public int totalNQueens(int n) {
        if (n == 0) {
            return 0;
        }

        char[][] board = new char[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                board[i][j] = '.';
            }
        }

        int[] result = new int[1];
        dfs(board, 0, result);
        return result[0];
    }

    private boolean isValid(char[][] board, int row, int col) {
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[i].length; j++) {
                if (board[i][j] == 'Q' && (row == i || row + j == col + i || row + col == i + j)) {
                    return false;
                }
            }
        }

        return true;
    }

    private void dfs(char[][] board, int colIdx, int[] result) {
        if (colIdx == board.length) {
            ++result[0];
            return;
        }

        for (int i = 0; i < board.length; i++) {
            if (isValid(board, i, colIdx)) {
                board[i][colIdx] = 'Q';
                dfs(board, colIdx + 1, result);
                board[i][colIdx] = '.';
            }
        }
    }
}
