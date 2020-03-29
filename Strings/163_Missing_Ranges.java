class Solution {
    public List<String> findMissingRanges(int[] nums, int lower, int upper) {
        List<String> result = new ArrayList<>();

        if (nums.length == 0) {
            result.add(intervalToString(lower, upper));
            return result;
        }

        if (lower < nums[0]) {
            result.add(intervalToString(lower, nums[0] - 1));
        }

        for (int i = 0; i < nums.length - 1; i++) {
            if (nums[i] == nums[i + 1] || nums[i] + 1 == nums[i + 1]) {
                continue;
            }

            result.add(intervalToString(nums[i] + 1, nums[i + 1] - 1));
        }

        if (nums[nums.length - 1] < upper) {
            result.add(intervalToString(nums[nums.length - 1] + 1, upper));
        }

        return result;
    }

    private String intervalToString(int low, int high) {
        return low == high ? low + "" : low + "->" + high;
    }
}
