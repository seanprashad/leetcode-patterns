class Solution {
    public int firstMissingPositive(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 1;
        }

        int len = nums.length;

        for (int i = 0; i < len; i++) {
            if (nums[i] <= 0 || nums[i] > len) {
                nums[i] = len + 1;
            }

            System.out.println(nums[i]);
        }

        for (int i = 0; i < len; i++) {
            int idx = Math.abs(nums[i]);

            if (idx > len) {
                continue;
            }

            --idx;

            if (nums[idx] > 0) {
                nums[idx] = -nums[idx];
            }
        }

        for (int i = 0; i < len; i++) {
            if (nums[i] >= 0) {
                return i + 1;
            }
        }

        return len + 1;
    }
}
