class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        if (nums == null || nums.length == 0) {
            return Collections.emptyList();
        }

        Arrays.sort(nums);

        List<List<Integer>> result = new ArrayList<>();

        helper(nums, result, new ArrayList<>(), new boolean[nums.length]);
        return result;
    }

    private void helper(int[] nums, List<List<Integer>> result, List<Integer> temp, boolean[] used) {
        if (temp.size() == nums.length) {
            result.add(new ArrayList<>(temp));
            return;
        }

        for (int i = 0; i < nums.length; i++) {
            if (used[i] || i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) {
                continue;
            }

            used[i] = true;
            temp.add(nums[i]);

            helper(nums, result, temp, used);

            used[i] = false;
            temp.remove(temp.size() - 1);
        }
    }
}