class Solution {
    public boolean checkPossibility(int[] nums) {
        if (nums == null || nums.length == 0) {
            return false;
        }

        int cnt = 0;

        for (int i = 1; i < nums.length && cnt <= 1; i++) {
            if (nums[i] < nums[i - 1]) {
                ++cnt;
                if (i - 2 < 0 || nums[i - 2] <= nums[i]) {
                    nums[i - 1] = nums[i];
                } else {
                    nums[i] = nums[i - 1];
                }
            }
        }

        return cnt <= 1;
    }
}
