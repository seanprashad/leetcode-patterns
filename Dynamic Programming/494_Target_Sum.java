class Solution {
    public int findTargetSumWays(int[] nums, int S) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        return dfs(nums, S, 0, 0);
    }

    private int dfs(int[] nums, int S, int sum, int idx) {
        if (idx == nums.length) {
            if (sum == S) {
                return 1;
            }
            return 0;
        }

        int add = dfs(nums, S, sum + nums[idx], idx + 1);
        int minus = dfs(nums, S, sum - nums[idx], idx + 1);

        return add + minus;
    }
}
