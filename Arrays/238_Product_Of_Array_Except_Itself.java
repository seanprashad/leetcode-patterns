class Solution {
    public int[] productExceptSelf(int[] nums) {
        if (nums == null || nums.length == 0) {
            return new int[] {};
        }

        int[] result = new int[nums.length];
        int productSoFar = 1;

        for (int i = 0; i < nums.length; i++) {
            result[i] = productSoFar;
            productSoFar *= nums[i];
        }

        productSoFar = 1;

        for (int i = nums.length - 1; i >= 0; i--) {
            result[i] *= productSoFar;
            productSoFar *= nums[i];
        }

        return result;
    }
}
