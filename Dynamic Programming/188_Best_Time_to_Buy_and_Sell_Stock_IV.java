class Solution {
    public int maxProfit(int k, int[] prices) {
        int[][][] dp = new int[prices.length + 1][k + 1][2];

        for (int day = prices.length - 1; day >= 0; day--) {
            for (int transactionsRemaining = 1; transactionsRemaining <= k; transactionsRemaining++) {
                for (int holding = 0; holding < 2; holding++) {
                    int noAction = dp[day+1][transactionsRemaining][holding];
                    int action;
                    
                    // holding == 1 is sell, otherwise buy
                    if (holding == 1) {
                        action = prices[day] + dp[day+1][transactionsRemaining-1][0];
                    } else {
                        action = -prices[day] + dp[day+1][transactionsRemaining][1];
                    }
                    
                    dp[day][transactionsRemaining][holding] = Math.max(action, noAction);
                }
            }
        }

        return dp[0][k][0];
    }
}