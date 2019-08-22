class Solution {
    public int maxProfit(int[] prices) {
        if (prices == null || prices.length == 0) {
            return 0;
        }

        int idx = 0, buy = prices[idx], sell = prices[idx], profit = 0;
        int N = prices.length - 1;

        while (idx < N) {
            while (idx < N && prices[idx + 1] <= prices[idx]) {
                idx++;
            }

            buy = prices[idx];

            while (idx < N && prices[idx + 1] > prices[idx]) {
                idx++;
            }

            sell = prices[idx];

            profit += sell - buy;
        }

        return profit;
    }
}
