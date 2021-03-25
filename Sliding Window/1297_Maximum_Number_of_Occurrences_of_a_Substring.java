class Solution {
    public int maxFreq(String s, int maxLetters, int minSize, int maxSize) {
        Map<Character, Integer> m = new HashMap<>();
        Map<String, Integer> substrings = new HashMap<>();
        int result = 0, left = 0, right = 0;

        while (right < s.length()) {
            char r = s.charAt(right);
            m.put(r, m.getOrDefault(r, 0) + 1);
            ++right;

            if (right - left > minSize) {
                char l = s.charAt(left);
                m.put(l, m.get(l) - 1);
                if (m.get(l) == 0) {
                    m.remove(l);
                }
                ++left;
            }

            if (m.size() <= maxLetters && right - left >= minSize) {
                String substr = s.substring(left, right);
                substrings.put(substr, substrings.getOrDefault(substr, 0) + 1);
                result = Math.max(result, substrings.get(substr));
            }
        }

        return result;
    }
}
