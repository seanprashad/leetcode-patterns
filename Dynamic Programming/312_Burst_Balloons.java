class Solution {
    public int maxCoins(int[] nums) {
        int n = nums.length;

        int[] newNums = new int[n + 2];
        newNums[0] = newNums[n + 1] = 1;

        for (int i = 0; i < n; i++) {
            newNums[i + 1] = nums[i];
        }

        int[][] memo = new int[n + 2][n + 2];
        return helper(newNums, memo, 1, n);
    }

    private int helper(int[] nums, int[][] memo, int start, int end) {
        if (start > end) {
            return 0;
        }
        if (memo[start][end] != 0) {
            return memo[start][end];
        }

        for (int i = start; i <= end; i++) {
            int value = nums[start - 1] * nums[i] * nums[end + 1];
            value += helper(nums, memo, start, i - 1);
            value += helper(nums, memo, i + 1, end);

            memo[start][end] = Math.max(memo[start][end], value);
        }

        return memo[start][end];
    }
}
