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

        int prevHouse = 0, prevTwoHouses = 0, currHouse = 0;

        for (int i = 0; i < nums.length; i++) {
            currHouse = Math.max(prevHouse, prevTwoHouses + nums[i]);
            prevTwoHouses = prevHouse;
            prevHouse = currHouse;
        }

        return currHouse;
    }
}
