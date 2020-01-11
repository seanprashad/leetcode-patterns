class Solution {
    public int maxSubArray(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        int max = nums[0], rollingMax = nums[0];

        for (int i = 1; i < nums.length; i++) {
            if (rollingMax < 0) {
                rollingMax = 0;
            }
            rollingMax += nums[i];
            max = Math.max(max, rollingMax);
        }

        return max;
    }
}
