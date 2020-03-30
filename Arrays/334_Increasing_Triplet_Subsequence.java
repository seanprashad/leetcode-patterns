class Solution {
    public boolean increasingTriplet(int[] nums) {
        int smallest = Integer.MAX_VALUE, secondSmallest = Integer.MAX_VALUE;

        for (int num : nums) {
            if (num <= smallest) {
                smallest = num;
            } else if (num < secondSmallest) {
                secondSmallest = num;
            } else if (num > secondSmallest) {
                return true;
            }
        }

        return false;
    }
}
