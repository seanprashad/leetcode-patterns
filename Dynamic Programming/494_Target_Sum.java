class Solution {
    public int findTargetSumWays(int[] nums, int S) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        return dfs(nums, S, 0, 0, new HashMap<>());
    }

    private int dfs(int[] nums, int S, int sum, int idx, Map<String, Integer> m) {
        String encodedVal = idx + "->" + sum;
        if (m.containsKey(encodedVal)) {
            return m.get(encodedVal);
        }

        if (idx == nums.length) {
            if (sum == S) {
                return 1;
            }
            return 0;
        }

        int add = dfs(nums, S, sum + nums[idx], idx + 1, m);
        int minus = dfs(nums, S, sum - nums[idx], idx + 1, m);

        m.put(encodedVal, add + minus);
        return add + minus;
    }
}
