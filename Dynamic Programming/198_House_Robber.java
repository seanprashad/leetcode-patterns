class Solution {
    public int rob(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        int[] memo = new int[nums.length + 1];
        Arrays.fill(memo, -1);
        return robHouses(nums, nums.length - 1, memo);
    }

    private int robHouses(int[] houses, int houseNo, int[] memo) {
        if (houseNo < 0) {
            return 0;
        }
        if (memo[houseNo] >= 0) {
            return memo[houseNo];
        }

        int result = Math.max(robHouses(houses, houseNo - 2, memo) + houses[houseNo],
                robHouses(houses, houseNo - 1, memo));
        memo[houseNo] = result;
        return result;
    }
}
