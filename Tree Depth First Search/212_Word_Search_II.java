class Solution {
    class TrieNode {
        private TrieNode[] children;
        private String word;

        public TrieNode() {
            children = new TrieNode[26];
            word = null;
        }
    }

    private TrieNode buildTrie(String[] words) {
        TrieNode root = new TrieNode();

        for (String word : words) {
            TrieNode runner = root;

            for (char c : word.toCharArray()) {
                if (runner.children[c - 'a'] == null) {
                    runner.children[c - 'a'] = new TrieNode();
                }

                runner = runner.children[c - 'a'];
            }

            runner.word = word;
        }

        return root;
    }

    public List<String> findWords(char[][] board, String[] words) {
        TrieNode root = buildTrie(words);
        List<String> result = new ArrayList<>();

        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[i].length; j++) {
                helper(board, i, j, root, result);
            }
        }

        return result;
    }

    private void helper(char[][] board, int row, int col, TrieNode root, List<String> result) {
        if (root.word != null) {
            result.add(root.word);
            root.word = null;
            return;
        }

        if (row < 0 || col < 0 || row >= board.length || col >= board[row].length || board[row][col] == '.'
                || root.children[board[row][col] - 'a'] == null) {
            return;
        }

        char c = board[row][col];
        board[row][col] = '.';

        helper(board, row + 1, col, root.children[c - 'a'], result);
        helper(board, row - 1, col, root.children[c - 'a'], result);
        helper(board, row, col + 1, root.children[c - 'a'], result);
        helper(board, row, col - 1, root.children[c - 'a'], result);

        board[row][col] = c;
    }
}
