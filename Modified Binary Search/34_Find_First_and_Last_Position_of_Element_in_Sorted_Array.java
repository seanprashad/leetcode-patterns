class Solution {
    public int[] searchRange(int[] nums, int target) {
        if (nums == null || nums.length == 0) {
            return new int[] { -1, -1 };
        }

        int[] result = new int[2];
        result[0] = binarySearchHelperLow(nums, target);
        result[1] = binarySearchHelperHigh(nums, target);

        return result;
    }

    private int binarySearchHelperLow(int[] nums, int target) {
        int low = 0, high = nums.length - 1;

        int idx = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                idx = mid;
            }

            if (nums[mid] >= target) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return idx;
    }

    private int binarySearchHelperHigh(int[] nums, int target) {
        int low = 0, high = nums.length - 1;

        int idx = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                idx = mid;
            }

            if (nums[mid] <= target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return idx;
    }
}
