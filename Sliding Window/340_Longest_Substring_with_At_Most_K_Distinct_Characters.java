class Solution {
    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        Map<Character, Integer> m = new HashMap<>();
        int left = 0, right = 0, result = 0;

        while (right < s.length()) {
            m.put(s.charAt(right), m.getOrDefault(s.charAt(right), 0) + 1);
            ++right;

            while (m.size() > k) {
                m.put(s.charAt(left), m.get(s.charAt(left)) - 1);

                if (m.get(s.charAt(left)) == 0) {
                    m.remove(s.charAt(left));
                }

                ++left;
            }

            result = Math.max(result, right - left);
        }

        return result;
    }
}
