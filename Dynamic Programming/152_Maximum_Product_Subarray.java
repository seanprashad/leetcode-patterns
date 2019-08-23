class Solution {
    public int maxProduct(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        int max = nums[0];
        int iMax = nums[0], iMin = nums[0];

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] < 0) {
                int temp = iMax;
                iMax = iMin;
                iMin = temp;
            }

            iMax = Math.max(nums[i], iMax * nums[i]);
            iMin = Math.min(nums[i], iMin * nums[i]);

            max = Math.max(max, iMax);
        }

        return max;
    }
}
