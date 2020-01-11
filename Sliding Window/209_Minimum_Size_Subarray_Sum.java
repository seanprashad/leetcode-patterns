class Solution {
    public int minSubArrayLen(int s, int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        int result = Integer.MAX_VALUE;
        int start = 0, end = 0, sum = 0;

        while (end < nums.length) {
            sum += nums[end++];

            if (sum >= s) {
                while (sum >= s) {
                    result = Math.min(result, end - start);
                    sum -= nums[start++];
                }
            }
        }

        return result == Integer.MAX_VALUE ? 0 : result;
    }
}
