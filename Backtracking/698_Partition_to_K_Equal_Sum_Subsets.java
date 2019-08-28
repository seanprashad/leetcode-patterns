class Solution {
    public boolean canPartitionKSubsets(int[] nums, int k) {
        if (nums == null || nums.length == 0) {
            return false;
        }

        int totalSum = 0;
        for (int num : nums) {
            totalSum += num;
        }
        if (totalSum % k != 0) {
            return false;
        }

        int target = totalSum / k;
        return helper(nums, k, 0, 0, target, new boolean[nums.length]);
    }

    private boolean helper(int[] nums, int k, int start, int currSum, int target, boolean[] used) {
        if (k == 1) {
            return true;
        }
        if (currSum == target) {
            return helper(nums, k - 1, 0, 0, target, used);
        }

        for (int i = start; i < nums.length; i++) {
            if (used[i]) {
                continue;
            }
            used[i] = true;
            if (helper(nums, k, i + 1, currSum + nums[i], target, used)) {
                return true;
            }
            used[i] = false;
        }

        return false;
    }
}
