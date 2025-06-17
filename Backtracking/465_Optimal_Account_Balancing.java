class Solution {
    public int minTransfers(int[][] transactions) {
        Map<Integer, Integer> balances = new HashMap<>();

        for (int[] transaction : transactions) {
            int from = transaction[0];
            int to = transaction[1];
            int amount = transaction[2];
            
            balances.put(from, balances.getOrDefault(from, 0) - amount);
            balances.put(to, balances.getOrDefault(to, 0) + amount);
        }

        int idx = 0;
        int[] debts = new int[balances.size()];

        for (int debt : balances.values()) {
            debts[idx] = debt;
            ++idx;
        }

        return dfs(debts, 0);
    }

    private int dfs(int[] balances, int start) {
        if (start == balances.length) {
            return 0;
        }

        if (balances[start] == 0) {
            return dfs(balances, start + 1);
        }

        int minTransactions = Integer.MAX_VALUE;
        int currBalance = balances[start];

        for (int i = start + 1; i < balances.length; i++) {
            if (currBalance * balances[i] >= 0) { continue; }

            balances[i] += currBalance;
            minTransactions = Math.min(minTransactions, 1 + dfs(balances, start + 1));
            balances[i] -= currBalance;
        }

        return minTransactions;
    }
}
