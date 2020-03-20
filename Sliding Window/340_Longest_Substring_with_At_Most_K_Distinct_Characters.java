class Solution {
    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        if (s == null || s.length() == 0) {
            return 0;
        }

        int result = 0, distinctNums = 0;
        int[] map = new int[256];

        for (int i = 0, j = 0; j < s.length(); j++) {
            if (map[s.charAt(j)]++ == 0) {
                distinctNums++;
            }

            while (distinctNums > k) {
                if (--map[s.charAt(i)] == 0) {
                    distinctNums--;
                }
                ++i;
            }

            result = Math.max(result, j - i + 1);
        }

        return result;
    }
}
