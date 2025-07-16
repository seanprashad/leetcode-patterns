class Solution {
    private TrieNode root = new TrieNode();
    private String result = "";

    public String longestWord(String[] words) {
        for (String word : words) {
            root.insert(word);
        }

        dfs(root);
        return result;
    }

    private void dfs(TrieNode root) {
        if (root == null) { return; }

        if (root.word != null) {
            if (root.word.length() > result.length()) {
                result = root.word;
            }
        }

        for (TrieNode child : root.children) {
            if (child != null && child.word != null) {
                dfs(child);
            }
        }
    }

    private class TrieNode {
        private TrieNode[] children;
        private String word;

        public TrieNode() {
            children = new TrieNode[26];
            word = null;
        }

        public void insert(String word) {
            TrieNode runner = root;

            for (char c : word.toCharArray()) {
                if (runner.children[c - 'a'] == null) {
                    runner.children[c - 'a'] = new TrieNode();
                }

                runner = runner.children[c - 'a'];
            }

            runner.word = word;
        }
    }
}
