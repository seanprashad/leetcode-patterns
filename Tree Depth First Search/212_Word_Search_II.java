class Solution {
    public List<String> findWords(char[][] board, String[] words) {
        List<String> result = new ArrayList<>();
        TrieNode root = buildTrie(words);

        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[i].length; j++) {
                dfs(board, i, j, root, result);
            }
        }

        return result;
    }

    private void dfs(char[][] board, int x, int y, TrieNode root, List<String> result) {
        if (root.word != null) {
            result.add(root.word);
            root.word = null;
            return;
        }

        if (x < 0 || y < 0 || x >= board.length || y >= board[x].length || board[x][y] == '@'
                || root.children.get(board[x][y]) == null) {
            return;
        }

        char c = board[x][y];
        board[x][y] = '@';

        root = root.children.get(c);

        dfs(board, x + 1, y, root, result);
        dfs(board, x - 1, y, root, result);
        dfs(board, x, y + 1, root, result);
        dfs(board, x, y - 1, root, result);

        board[x][y] = c;
    }

    private TrieNode buildTrie(String[] words) {
        TrieNode root = new TrieNode();

        for (String w : words) {
            TrieNode runner = root;

            for (char c : w.toCharArray()) {
                runner.children.putIfAbsent(c, new TrieNode());
                runner = runner.children.get(c);
            }

            runner.word = w;
        }

        return root;
    }

    private class TrieNode {
        private Map<Character, TrieNode> children;
        private String word;

        public TrieNode() {
            children = new HashMap<>();
            word = null;
        }
    }
}
