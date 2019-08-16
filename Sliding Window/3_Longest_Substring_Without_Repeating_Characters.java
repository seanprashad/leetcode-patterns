class Solution {
    public int lengthOfLongestSubstring(String s) {
        if (s == null || s.length() == 0) {
            return 0;
        }

        int start = 0, end = 0, maxLen = Integer.MIN_VALUE;
        Set<Character> set = new HashSet<>();

        while (end < s.length()) {
            if (!set.contains(s.charAt(end))) {
                set.add(s.charAt(end++));
                maxLen = Math.max(maxLen, end - start);
            } else {
                set.remove(s.charAt(start++));
            }
        }

        return maxLen;
    }
}
