class Solution {
    public List<List<String>> solveNQueens(int n) {
        if (n == 0) {
            return Collections.emptyList();
        }

        char[][] board = new char[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                board[i][j] = '.';
            }
        }

        List<List<String>> result = new ArrayList<>();
        dfs(board, 0, result);
        return result;
    }

    private List<String> constructBoard(char[][] board) {
        List<String> result = new ArrayList<>();

        for (int i = 0; i < board.length; i++) {
            String row = new String(board[i]);
            result.add(row);
        }

        return result;
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

    private void dfs(char[][] board, int colIdx, List<List<String>> result) {
        if (colIdx == board.length) {
            result.add(constructBoard(board));
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
