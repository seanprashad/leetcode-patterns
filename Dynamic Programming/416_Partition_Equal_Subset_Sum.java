class Solution {
    public boolean canPartition(int[] nums) {
        if (nums == null || nums.length == 0) {
            return false;
        }

        int totalSum = 0;
        for (int num : nums) {
            totalSum += num;
        }
        if (totalSum % 2 == 1) {
            return false;
        }
        totalSum /= 2;

        boolean[][] dp = new boolean[nums.length + 1][totalSum + 1];
        dp[0][0] = true;

        for (int i = 1; i <= nums.length; i++) {
            for (int j = 1; j <= totalSum; j++) {
                if (nums[i - 1] <= j) {
                    dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
        }

        return dp[nums.length][totalSum];
    }
}
