class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] dp = new int[nums.length];
        int len = 0;

        for (int num : nums) {
            int idx = binarySearch(dp, 0, len, num);
            dp[idx] = num;

            if (idx == len) {
                ++len;
            }
        }

        return len;
    }

    private int binarySearch(int[] nums, int low, int high, int target) {
        while (low < high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }
}
