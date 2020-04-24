class Solution {
    public String longestPalindrome(String s) {
        if (s == null || s.length() == 0) {
            return "";
        }
        int start = 0, end = 0;

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            int left = i, right = i;

            while (left >= 0 && s.charAt(left) == c) {
                --left;
            }
            while (right < s.length() && s.charAt(right) == c) {
                ++right;
            }

            while (left >= 0 && right < s.length()) {
                if (s.charAt(left) != s.charAt(right)) {
                    break;
                }
                --left;
                ++right;
            }

            if (right - left > end - start) {
                start = left;
                end = right;
            }
        }

        return s.substring(start + 1, end);
    }
}
