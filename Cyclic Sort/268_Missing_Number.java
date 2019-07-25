class Solution {
    public int missingNumber(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        long sum = nums.length;

        for (int i = 0; i < nums.length; i++) {
            sum += (i - nums[i]);
        }

        return (int) sum;
    }
}
