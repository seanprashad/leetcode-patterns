class Solution {
    public int[] sortedSquares(int[] nums) {
        if (nums == null || nums.length == 0) {
            return new int[] {};
        }

        int[] result = new int[nums.length];
        int start = 0, end = result.length - 1, idx = end;

        while (start <= end) {
            if (Math.abs(nums[start]) < Math.abs(nums[end])) {
                result[idx] = nums[end] * nums[end];
                end--;
            } else {
                result[idx] = nums[start] * nums[start];
                start++;
            }

            idx--;
        }

        return result;
    }
}
