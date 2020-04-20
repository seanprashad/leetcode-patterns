class Solution {
    public int longestValidParentheses(String s) {
        if (s == null || s.length() < 2) {
            return 0;
        }

        int result = 0, leftCount = 0;
        int[] dp = new int[s.length()];

        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '(') {
                ++leftCount;
            } else if (leftCount > 0) {
                dp[i] = dp[i - 1] + 2;

                if (i - dp[i] >= 0) {
                    dp[i] += dp[i - dp[i]];
                }

                --leftCount;
                result = Math.max(result, dp[i]);
            }
        }

        return result;
    }
}
