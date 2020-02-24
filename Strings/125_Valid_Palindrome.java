class Solution {
    public boolean isPalindrome(String s) {
        if (s == null || s.length() == 0) {
            return true;
        }

        int left = 0, right = s.length() - 1;

        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
                ++left;
            }
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
                --right;
            }

            char lCh = Character.toLowerCase(s.charAt(left));
            char rCh = Character.toLowerCase(s.charAt(right));

            if (lCh != rCh) {
                return false;
            }

            ++left;
            --right;
        }

        return true;
    }
}
