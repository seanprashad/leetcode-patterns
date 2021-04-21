class Solution {
    public int[] searchRange(int[] nums, int target) {
        int firstIdx = binarySearch(nums, target, false);
        int secondIdx = binarySearch(nums, target, true);

        if (firstIdx == -1 || secondIdx == -1) {
            return new int[] { -1, -1 };
        }

        return new int[] { firstIdx, secondIdx };
    }

    private int binarySearch(int[] nums, int target, boolean moveRight) {
        int low = 0, high = nums.length - 1;
        int candidate = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                candidate = mid;
            }

            if (moveRight) {
                if (nums[mid] <= target) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            } else {
                if (nums[mid] >= target) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            }
        }

        return candidate;
    }
}
