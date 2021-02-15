class Solution {
    public int pivotIndex(int[] nums) {
        if (nums == null || nums.length == 0) {
            return -1;
        }

        int currSum = 0, totalSum = 0;

        for (int n : nums) {
            totalSum += n;
        }

        for (int i = 0; i < nums.length; i++) {
            if (currSum + nums[i] == totalSum) {
                return i;
            }

            currSum += nums[i];
            totalSum -= nums[i];
        }

        return -1;
    }
}
