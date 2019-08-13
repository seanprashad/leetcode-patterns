class Solution {
    public int findMin(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        int start = 0, end = nums.length - 1;

        while (start < end) {
            int mid = start + (end - start) / 2;

            if (nums[mid] == nums[end]) {
                --end;
            } else if (nums[mid] < nums[end]) {
                end = mid;
            } else {
                start = mid + 1;
            }
        }

        return nums[start];
    }
}
