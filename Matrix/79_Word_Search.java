class Solution {
    public boolean exist(char[][] board, String word) {
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[i].length; j++) {
                if (helper(board, word, i, j, 0)) {
                    return true;
                }
            }
        }

        return false;
    }

    private boolean helper(char[][] board, String word, int row, int col, int idx) {
        if (idx == word.length()) {
            return true;
        }

        if (row < 0 || col < 0 || row >= board.length || col >= board[row].length || board[row][col] == '#'
                || idx >= word.length() || board[row][col] != word.charAt(idx)) {
            return false;
        }

        char c = board[row][col];
        board[row][col] = '#';

        if (helper(board, word, row + 1, col, idx + 1) || helper(board, word, row - 1, col, idx + 1)
                || helper(board, word, row, col + 1, idx + 1) || helper(board, word, row, col - 1, idx + 1)) {
            return true;
        }

        board[row][col] = c;
        return false;
    }
}
