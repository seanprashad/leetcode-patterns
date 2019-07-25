class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        List<Integer> result = new ArrayList<>();

        if (nums == null || nums.length <= 1) {
            return result;
        }

        for (int i = 0; i < nums.length; i++) {
            int idx = Math.abs(nums[i]) - 1;

            if (nums[idx] < 0) {
                result.add(idx + 1);
            }

            nums[idx] = -nums[idx];
        }

        return result;
    }
}
