class Solution {
    public int rob(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        int currHouse = 0, oneHouseAgo = 0, twoHousesAgo = 0;

        for (int i = 0; i < nums.length; i++) {
            currHouse = Math.max(twoHousesAgo + nums[i], oneHouseAgo);
            twoHousesAgo = oneHouseAgo;
            oneHouseAgo = currHouse;
        }

        return currHouse;
    }
}
