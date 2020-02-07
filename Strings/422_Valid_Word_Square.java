class Solution {
    public boolean validWordSquare(List<String> words) {
        if (words == null || words.size() == 0) {
            return true;
        }

        for (int i = 0; i < words.size(); i++) {
            String s = words.get(i);
            String v = getVerticalString(words, i);

            if (!s.equals(v)) {
                return false;
            }
        }

        return true;
    }

    String getVerticalString(List<String> words, int col) {
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < words.size(); i++) {
            String word = words.get(i);

            if (col < word.length()) {
                sb.append(word.charAt(col));
            }
        }

        return sb.toString();
    }
}
