class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        if (nums == null || nums.length == 0) {
            return Collections.emptyList();
        }

        Arrays.sort(nums);

        List<List<Integer>> result = new ArrayList<>();
        boolean[] usedElements = new boolean[nums.length];
        dfs(nums, usedElements, new ArrayList<>(), result);
        return result;
    }

    private void dfs(int[] nums, boolean[] usedElements, List<Integer> tempResult, List<List<Integer>> result) {
        if (tempResult.size() == nums.length) {
            result.add(new ArrayList<>(tempResult));
            return;
        }

        for (int i = 0; i < nums.length; i++) {
            if (usedElements[i] || i > 0 && nums[i] == nums[i - 1] && !usedElements[i - 1]) {
                continue;
            }
            usedElements[i] = true;
            tempResult.add(nums[i]);
            dfs(nums, usedElements, tempResult, result);
            usedElements[i] = false;
            tempResult.remove(tempResult.size() - 1);
        }
    }
}
