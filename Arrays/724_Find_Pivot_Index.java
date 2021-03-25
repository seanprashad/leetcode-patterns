class Solution {
    public int pivotIndex(int[] nums) {
        int currSum = 0, totalSum = 0;

        for (int n : nums) {
            totalSum += n;
        }

        for (int i = 0; i < nums.length; i++) {
            currSum += nums[i];
            if (currSum == totalSum) {
                return i;
            }
            totalSum -= nums[i];
        }

        return -1;
    }
}
