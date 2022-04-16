class Solution {
    public boolean canJump(int[] nums) {
        int furthestSoFar = 0, goal = nums.length - 1;

        for (int i = 0; i <= furthestSoFar && furthestSoFar < goal; i++) {
            furthestSoFar = Math.max(furthestSoFar, nums[i] + i);
        }

        return furthestSoFar >= goal;
    }
}
