class Solution {
    public int mincostTickets(int[] days, int[] costs) {
        int n = days[days.length - 1];

        boolean[] travelDay = new boolean[n + 1];
        for (int day : days) {
            travelDay[day] = true;
        }

        int[] dp = new int[n + 1];
        dp[0] = 0;

        for (int i = 1; i <= n; i++) {
            if (!travelDay[i]) {
                dp[i] = dp[i - 1];
                continue;
            }

            int minCost = dp[i - 1] + costs[0];
            minCost = Math.min(minCost, dp[Math.max(0, i - 7)] + costs[1]);
            minCost = Math.min(minCost, dp[Math.max(0, i - 30)] + costs[2]);
            dp[i] = minCost;
        }

        return dp[n];
    }
}
