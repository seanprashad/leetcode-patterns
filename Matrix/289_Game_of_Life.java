class Solution {
    public void gameOfLife(int[][] board) {
        if (board == null || board.length == 0) {
            return;
        }

        int rowsLen = board.length;
        int colsLen = board[0].length;

        for (int i = 0; i < rowsLen; i++) {
            for (int j = 0; j < colsLen; j++) {
                int liveCellCount = 0;

                for (int r = -1; r <= 1; r++) {
                    for (int c = -1; c <= 1; c++) {
                        if (r == 0 && c == 0) {
                            continue;
                        }

                        int row = i + r;
                        int col = j + c;

                        if ((row >= 0 && row < rowsLen) && (col >= 0 && col < colsLen)
                                && Math.abs(board[row][col]) == 1) {
                            liveCellCount += 1;
                        }
                    }
                }

                if (board[i][j] == 1 && (liveCellCount < 2 || liveCellCount > 3)) {
                    board[i][j] = -1;
                }

                if (board[i][j] == 0 && liveCellCount == 3) {
                    board[i][j] = 2;
                }
            }
        }

        for (int i = 0; i < rowsLen; i++) {
            for (int j = 0; j < colsLen; j++) {
                if (board[i][j] > 0) {
                    board[i][j] = 1;
                } else {
                    board[i][j] = 0;
                }
            }
        }
    }
}
