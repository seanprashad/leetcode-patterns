class Solution {
    public int lengthOfLIS(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1);
        int max = 1;

        for (int currNum = 0; currNum < nums.length; currNum++) {
            for (int prevNum = 0; prevNum < currNum; prevNum++) {
                if (nums[currNum] > nums[prevNum]) {
                    dp[currNum] = Math.max(dp[currNum], dp[prevNum] + 1);
                }
            }
            max = Math.max(max, dp[currNum]);
        }

        return max;
    }
}
