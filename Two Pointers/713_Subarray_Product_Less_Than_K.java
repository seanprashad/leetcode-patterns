class Solution {
    public int numSubarrayProductLessThanK(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k == 0) {
            return 0;
        }

        int result = 0, product = 1;

        for (int start = 0, end = 0; end < nums.length; end++) {
            product *= nums[end];

            while (start <= end && product >= k) {
                product /= nums[start];
                start++;
            }

            result += end - start + 1;
        }

        return result;
    }
}
