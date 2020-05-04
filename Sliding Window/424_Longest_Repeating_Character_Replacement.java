class Solution {
    public int characterReplacement(String s, int k) {
        int[] map = new int[26];
        int start = 0, maxCharCount = 0, result = 0;

        for (int end = 0; end < s.length(); end++) {
            map[s.charAt(end) - 'A']++;
            maxCharCount = Math.max(maxCharCount, map[s.charAt(end) - 'A']);

            while (end - start + 1 - maxCharCount > k) {
                map[s.charAt(start) - 'A']--;
                ++start;
            }

            result = Math.max(result, end - start + 1);
        }

        return result;
    }
}
