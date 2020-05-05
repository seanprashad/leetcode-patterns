class Solution {
    public int rob(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }
        if (nums.length == 1) {
            return nums[0];
        }
        if (nums.length == 2) {
            return Math.max(nums[0], nums[1]);
        }

        return Math.max(helper(nums, 1, nums.length - 1), helper(nums, 0, nums.length - 2));
    }

    private int helper(int[] nums, int start, int end) {
        if (start > end) {
            return 0;
        }

        int prevHouse = 0, prevTwoHouses = 0, currHouse = 0;

        for (int i = start; i <= end; i++) {
            currHouse = Math.max(prevHouse, prevTwoHouses + nums[i]);
            prevTwoHouses = prevHouse;
            prevHouse = currHouse;
        }

        return currHouse;
    }
}
