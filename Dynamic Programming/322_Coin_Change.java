class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);

        dp[0] = 0;

        for (int sum = 1; sum <= amount; sum++) {
            for (int coin : coins) {
                if (coin <= sum && dp[sum - coin] < dp[sum]) {
                    dp[sum] = dp[sum - coin] + 1;
                }
            }
        }

        return dp[amount] == Integer.MAX_VALUE ? -1 : dp[amount];
    }
}
