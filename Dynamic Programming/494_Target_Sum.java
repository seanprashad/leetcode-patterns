class Solution {
    public int findTargetSumWays(int[] nums, int S) {
        Map<String, Integer> memo = new HashMap<>();
        return helper(nums, S, 0, memo);
    }

    private int helper(int[] nums, int sum, int idx, Map<String, Integer> memo) {
        if (idx == nums.length) {
            return sum == 0 ? 1 : 0;
        }

        String key = idx + "," + sum;

        if (memo.containsKey(key)) {
            return memo.get(key);
        }

        int result = 0;

        result += helper(nums, sum + nums[idx], idx + 1, memo);
        result += helper(nums, sum - nums[idx], idx + 1, memo);

        memo.put(key, result);
        return result;
    }
}
