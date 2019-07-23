class Solution {
    public void moveZeroes(int[] nums) {
        if (nums == null || nums.length == 0) {
            return;
        }

        int curr = 0;

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) {
                nums[curr++] = nums[i];
            }
        }

        for (int j = curr; j < nums.length; j++) {
            nums[j] = 0;
        }
    }
}
