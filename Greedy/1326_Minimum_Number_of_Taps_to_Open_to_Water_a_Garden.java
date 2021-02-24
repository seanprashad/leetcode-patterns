class Solution {
    public int minTaps(int n, int[] ranges) {
        int[] nums = new int[ranges.length];

        for (int i = 0; i < ranges.length; i++) {
            if (ranges[i] == 0) {
                continue;
            }

            int left = Math.max(0, i - ranges[i]);
            nums[left] = Math.max(nums[left], i + ranges[i]);
        }

        int i = 0, end = 0, jumps = 0, maxReach = 0;

        while (i < nums.length && end < n) {
            ++jumps;

            while (i < nums.length && i <= end) {
                maxReach = Math.max(maxReach, nums[i]);
                ++i;
            }

            if (end == maxReach) {
                return -1;
            }

            end = maxReach;
        }

        return jumps;
    }
}
