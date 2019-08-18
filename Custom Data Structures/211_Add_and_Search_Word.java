class WordDictionary {
    private Map<Integer, List<String>> map;

    /** Initialize your data structure here. */
    public WordDictionary() {
        map = new HashMap<>();
    }

    /** Adds a word into the data structure. */
    public void addWord(String word) {
        if (word == null) {
            return;
        }

        int idx = word.length();
        if (!map.containsKey(idx)) {
            map.put(idx, new ArrayList<>());
        }

        map.get(idx).add(word);
    }

    /**
     * Returns if the word is in the data structure. A word could contain the dot
     * character '.' to represent any one letter.
     */
    public boolean search(String word) {
        if (word == null) {
            return false;
        }

        int idx = word.length();
        if (!map.containsKey(idx)) {
            return false;
        }

        List<String> words = map.get(idx);
        if (words.contains(word)) {
            return true;
        }

        for (String s : words) {
            if (isSame(s, word)) {
                return true;
            }
        }

        return false;
    }

    private boolean isSame(String search, String target) {
        if (search.length() != target.length()) {
            return false;
        }

        for (int i = 0; i < target.length(); i++) {
            if (target.charAt(i) != '.' && target.charAt(i) != search.charAt(i)) {
                return false;
            }
        }

        return true;
    }
}
