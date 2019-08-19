class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        if (nums == null || nums.length == 0) {
            return Collections.emptyList();
        }

        List<List<Integer>> result = new ArrayList<>();
        dfs(nums, 0, new ArrayList<>(), result);
        return result;
    }

    private void dfs(int[] nums, int idx, List<Integer> tempResult, List<List<Integer>> result) {
        result.add(new ArrayList<>(tempResult));

        for (int i = idx; i < nums.length; i++) {
            tempResult.add(nums[i]);
            dfs(nums, i + 1, tempResult, result);
            tempResult.remove(tempResult.size() - 1);
        }
    }
}
