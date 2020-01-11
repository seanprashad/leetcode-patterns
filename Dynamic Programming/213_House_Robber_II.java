class Solution {
    public int rob(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }
        if (nums.length == 1) {
            return nums[0];
        }

        return Math.max(helper(nums, 0, nums.length - 2), helper(nums, 1, nums.length - 1));
    }

    private int helper(int[] nums, int start, int end) {
        int currHouse = 0, twoHousesAgo = 0, oneHouseAgo = 0;

        for (int i = start; i <= end; i++) {
            currHouse = Math.max(twoHousesAgo + nums[i], oneHouseAgo);
            twoHousesAgo = oneHouseAgo;
            oneHouseAgo = currHouse;
        }

        return currHouse;
    }
}
