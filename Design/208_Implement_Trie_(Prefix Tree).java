class Trie {
    private TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode runner = root;

        for (char c : word.toCharArray()) {
            runner.children.putIfAbsent(c, new TrieNode());
            runner = runner.children.get(c);
        }

        runner.isWord = true;
    }

    public boolean search(String word) {
        TrieNode runner = root;

        for (char c : word.toCharArray()) {
            if (runner.children.get(c) == null) {
                return false;
            }

            runner = runner.children.get(c);
        }

        return runner.isWord;
    }

    public boolean startsWith(String prefix) {
        TrieNode runner = root;

        for (char c : prefix.toCharArray()) {
            if (runner.children.get(c) == null) {
                return false;
            }

            runner = runner.children.get(c);
        }

        return true;
    }

    private class TrieNode {
        private Map<Character, TrieNode> children;
        private boolean isWord;

        public TrieNode() {
            children = new HashMap<>();
            isWord = false;
        }
    }
}
