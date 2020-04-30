class Trie {
    class TrieNode {
        private TrieNode[] children;
        private boolean isWord;

        public TrieNode() {
            children = new TrieNode[26];
            isWord = false;
        }
    }

    private TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode runner = root;

        for (char c : word.toCharArray()) {
            if (runner.children[c - 'a'] == null) {
                runner.children[c - 'a'] = new TrieNode();
            }

            runner = runner.children[c - 'a'];
        }

        runner.isWord = true;
    }

    public boolean search(String word) {
        TrieNode runner = root;

        for (char c : word.toCharArray()) {
            if (runner.children[c - 'a'] == null) {
                return false;
            }
            runner = runner.children[c - 'a'];
        }

        return runner.isWord;
    }

    public boolean startsWith(String prefix) {
        TrieNode runner = root;

        for (char c : prefix.toCharArray()) {
            if (runner.children[c - 'a'] == null) {
                return false;
            }
            runner = runner.children[c - 'a'];
        }

        return true;
    }
}
