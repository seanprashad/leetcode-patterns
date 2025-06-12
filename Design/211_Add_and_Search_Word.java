class WordDictionary {
    private class TrieNode {
        private TrieNode[] letters;
        private boolean isWord;

        public TrieNode() {
            letters = new TrieNode[26];
            isWord = false;
        }
    }

    private TrieNode root;

    public WordDictionary() {
        root = new TrieNode();
    }

    public void addWord(String word) {
        TrieNode runner = root;

        for (char c : word.toCharArray()) {
            int pos = (int)(c - 'a');
            if (runner.letters[pos] == null) {
                runner.letters[pos] = new TrieNode();
            }
            runner = runner.letters[pos];
        }

        runner.isWord = true;
    }

    public boolean search(String word) {
        return searchHelper(word.toCharArray(), 0, root);
    }

    private boolean searchHelper(char[] word, int idx, TrieNode root) {
        for (int i = idx; i < word.length; i++) {
            if (word[i] == '.') {
                for (TrieNode child : root.letters) {
                    if (child != null && searchHelper(word, i + 1, child)) {
                        return true;
                    }
                }

                return false;
            }

            int pos = word[i] - 'a';
            if (root.letters[pos] == null) { return false; }
            root = root.letters[pos];
        }

        return root.isWord;
    }
}
