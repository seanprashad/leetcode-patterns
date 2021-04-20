class Solution {
    public List<String> findWords(char[][] board, String[] words) {
        List<String> result = new ArrayList<>();
        TrieNode root = buildTrie(words);

        for (int row = 0; row < board.length; row++) {
            for (int col = 0; col < board[row].length; col++) {
                dfs(board, row, col, root, result);
            }
        }

        return result;
    }

    private void dfs(char[][] board, int row, int col, TrieNode root, List<String> result) {
        if (root.word != null) {
            result.add(root.word);
            root.word = null;
        }

        if (row < 0 || col < 0 || row >= board.length || col >= board[row].length || board[row][col] == '.'
                || root.letters[board[row][col] - 'a'] == null) {
            return;
        }

        char c = board[row][col];
        board[row][col] = '.';

        dfs(board, row + 1, col, root.letters[c - 'a'], result);
        dfs(board, row - 1, col, root.letters[c - 'a'], result);
        dfs(board, row, col + 1, root.letters[c - 'a'], result);
        dfs(board, row, col - 1, root.letters[c - 'a'], result);

        board[row][col] = c;
    }

    private TrieNode buildTrie(String[] words) {
        TrieNode root = new TrieNode();

        for (String w : words) {
            TrieNode runner = root;

            for (char c : w.toCharArray()) {
                if (runner.letters[c - 'a'] == null) {
                    runner.letters[c - 'a'] = new TrieNode();
                }

                runner = runner.letters[c - 'a'];
            }

            runner.word = w;
        }

        return root;
    }

    private class TrieNode {
        private TrieNode[] letters;
        private String word;

        public TrieNode() {
            letters = new TrieNode[26];
            word = null;
        }
    }
}
