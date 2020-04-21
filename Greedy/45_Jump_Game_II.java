class Solution {
    public int jump(int[] nums) {
        if (nums == null || nums.length < 2) {
            return 0;
        }

        int currFarthest = 0, currEnd = 0, jumps = 0;

        for (int i = 0; i < nums.length; i++) {
            if (i > currEnd) {
                currEnd = currFarthest;
                ++jumps;
            }

            currFarthest = Math.max(currFarthest, i + nums[i]);
        }

        return jumps;
    }
}