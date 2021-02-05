class Solution {
    public int characterReplacement(String s, int k) {
        int[] hm = new int[26];
        int maxCharCount = 0, result = 0;

        for (int start = 0, end = 0; end < s.length(); end++) {
            hm[s.charAt(end) - 'A']++;
            maxCharCount = Math.max(maxCharCount, hm[s.charAt(end) - 'A']);

            if (end - start + 1 - maxCharCount > k) {
                hm[s.charAt(start) - 'A']--;
                ++start;
            }

            result = Math.max(result, end - start + 1);
        }

        return result;
    }
}
