class Solution {
    public int minTransfers(int[][] transactions) {
        Map<Integer, Integer> balanceMap = new HashMap<>();

        for (int[] transaction : transactions) {
            int from = transaction[0];
            int to = transaction[1];
            int amount = transaction[2];

            balanceMap.put(from, balanceMap.getOrDefault(from, 0) - amount);
            balanceMap.put(to, balanceMap.getOrDefault(to, 0) + amount);
        }

        int idx = 0;
        int[] balances = new int[balanceMap.size()];

        for (int balance : balanceMap.values()) {
            balances[idx] = balance;
            ++idx;
        }

        return minTransfersHelper(balances, 0);
    }

    private int minTransfersHelper(int[] balances, int idx) {
        if (idx == balances.length) { return 0; }

        if (balances[idx] == 0) {
            return minTransfersHelper(balances, idx + 1);
        }

        int currBalance = balances[idx];
        int minNumberOfTransactions = Integer.MAX_VALUE;

        for (int i = idx + 1; i < balances.length; i++) {
            // Case 1: Both positive values - redundant to offset balance
            // Case 2: Both negative values - redundant to give even more debt
            if (currBalance * balances[i] >= 0) {
                continue;
            }

            balances[i] += currBalance;
            minNumberOfTransactions = Math.min(minNumberOfTransactions, 1 + minTransfersHelper(balances, idx + 1));
            balances[i] -= currBalance;
        }

        return minNumberOfTransactions;
    }
}
