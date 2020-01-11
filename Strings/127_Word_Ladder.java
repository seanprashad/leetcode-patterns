class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> dict = new HashSet<>(wordList);
        Queue<String> q = new LinkedList<>();
        int level = 1;

        q.offer(beginWord);

        while (!q.isEmpty()) {
            int size = q.size();

            for (int i = 0; i < size; i++) {
                char[] letters = q.poll().toCharArray();

                for (int j = 0; j < letters.length; j++) {
                    char tmp = letters[j];

                    for (char c = 'a'; c <= 'z'; c++) {
                        letters[j] = c;

                        String modifiedWord = new String(letters);

                        if (dict.remove(modifiedWord)) {
                            if (modifiedWord.equals(endWord)) {
                                return ++level;
                            }
                            q.offer(modifiedWord);
                            dict.remove(modifiedWord);
                        }
                    }

                    letters[j] = tmp;
                }
            }

            ++level;
        }

        return 0;
    }
}