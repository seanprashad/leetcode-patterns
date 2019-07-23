class Solution {
    public int characterReplacement(String s, int k) {
        if (s == null || s.length() == 0) {
            return 0;
        }

        int start = 0, end = 0, maxLen = Integer.MIN_VALUE, maxSize = Integer.MIN_VALUE;
        char[] lookup = new char[26];

        while (end < s.length()) {
            lookup[s.charAt(end) - 'A']++;
            maxLen = Math.max(maxLen, lookup[s.charAt(end) - 'A']);
            end++;

            if (end - start - maxLen > k) {
                lookup[s.charAt(start) - 'A']--;
                start++;
            }

            maxSize = Math.max(maxSize, end - start);
        }

        return maxSize;
    }
}
