class Solution {
    public int longestValidParentheses(String s) {
        if (s == null || s.length() == 0) {
            return 0;
        }

        int[] dp = new int[s.length()];
        dp[0] = 0;
        int leftBracketCount = 0, result = 0;

        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '(') {
                ++leftBracketCount;
            } else if (leftBracketCount > 0) {
                dp[i] = dp[i - 1] + 2;

                if (i - dp[i] > 0) {
                    dp[i] += dp[i - dp[i]];
                }

                --leftBracketCount;
                result = Math.max(result, dp[i]);
            }
        }

        return result;
    }
}
