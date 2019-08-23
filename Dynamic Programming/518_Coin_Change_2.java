class Solution {
    public int change(int amount, int[] coins) {
        int[][] dp = new int[coins.length + 1][amount + 1];
        dp[0][0] = 1;

        for (int i = 1; i <= coins.length; i++) {
            dp[i][0] = 1;

            for (int j = 1; j <= amount; j++) {
                int currCoinValue = coins[i - 1];

                int withoutThisCoin = dp[i - 1][j];
                int withThisCoin = j >= currCoinValue ? dp[i][j - currCoinValue] : 0;

                dp[i][j] = withThisCoin + withoutThisCoin;
            }
        }

        return dp[coins.length][amount];
    }
}
