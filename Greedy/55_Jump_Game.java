class Solution {
    public boolean canJump(int[] nums) {
        if (nums == null || nums.length == 0) {
            return false;
        }

        int goal = nums.length - 1, maxJump = nums[0];

        for (int i = 0; i <= maxJump; i++) {
            if (maxJump >= goal) {
                return true;
            }
            maxJump = Math.max(maxJump, i + nums[i]);
        }

        return false;
    }
}
