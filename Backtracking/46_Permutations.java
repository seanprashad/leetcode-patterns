class Solution {
    public List<List<Integer>> permute(int[] nums) {
        if (nums == null || nums.length == 0) {
            return Collections.emptyList();
        }

        List<List<Integer>> result = new ArrayList<>();
        dfs(nums, new ArrayList<>(), result);
        return result;
    }

    private void dfs(int[] nums, List<Integer> tempResult, List<List<Integer>> result) {
        if (tempResult.size() == nums.length) {
            result.add(new ArrayList<>(tempResult));
            return;
        }

        for (int i = 0; i < nums.length; i++) {
            if (tempResult.contains(nums[i])) {
                continue;
            }
            tempResult.add(nums[i]);
            dfs(nums, tempResult, result);
            tempResult.remove(tempResult.size() - 1);
        }
    }
}
