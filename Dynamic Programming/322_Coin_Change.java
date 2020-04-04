class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);

        dp[0] = 0;

        for (int sum = 1; sum <= amount; sum++) {
            for (int choice = 0; choice < coins.length; choice++) {
                if (sum >= coins[choice]) {
                    dp[sum] = Math.min(dp[sum], dp[sum - coins[choice]] + 1);
                }
            }
        }

        if (dp[amount] > amount) {
            return -1;
        }

        return dp[amount];
    }
}
