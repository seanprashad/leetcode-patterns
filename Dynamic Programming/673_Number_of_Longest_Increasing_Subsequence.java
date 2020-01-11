class Solution {
    public int findNumberOfLIS(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        int[] dp = new int[nums.length], cnt = new int[nums.length];
        Arrays.fill(dp, 1);
        Arrays.fill(cnt, 1);

        int result = 0, max = 1;

        for (int i = 0; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    if (dp[j] + 1 == dp[i]) {
                        cnt[i] += cnt[j];
                    } else if (dp[j] + 1 > dp[i]) {
                        dp[i] = dp[j] + 1;
                        cnt[i] = cnt[j];
                    }
                }
            }

            if (dp[i] == max) {
                result += cnt[i];
            } else if (dp[i] > max) {
                max = dp[i];
                result = cnt[i];
            }
        }

        return result;
    }
}
