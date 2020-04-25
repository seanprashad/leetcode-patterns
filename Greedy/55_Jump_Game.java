class Solution {
    public boolean canJump(int[] nums) {
        int maxJump = 0, currJump = 0;

        for (int i = 0; i < nums.length; i++) {
            maxJump = Math.max(maxJump, i + nums[i]);

            if (i == currJump) {
                currJump = Math.max(currJump, maxJump);

                if (currJump >= nums.length - 1) {
                    return true;
                }
            }
        }

        return false;
    }
}
