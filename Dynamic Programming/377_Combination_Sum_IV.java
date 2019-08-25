class Solution {
    public int combinationSum4(int[] nums, int target) {
        int[] dp = new int[target + 1];
        Arrays.fill(dp, -1);
        dp[0] = 1;

        return helper(nums, target, dp);
    }

    private int helper(int[] nums, int remainder, int[] dp) {
        if (remainder < 0) {
            return 0;
        }
        if (remainder == 0) {
            return 1;
        }

        if (dp[remainder] != -1) {
            return dp[remainder];
        }

        int result = 0;
        for (int i = 0; i < nums.length; i++) {
            result += helper(nums, remainder - nums[i], dp);
        }

        dp[remainder] = result;
        return result;
    }
}
