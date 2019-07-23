class Solution {
    public static boolean binarySearch(int[] nums, int searchVal) {
        if (nums == null || nums.length == 0) {
            return false;
        }

        return binarySearchRecursive(nums, 0, nums.length - 1, searchVal);
    }

    private static boolean binarySearchRecursive(int[] nums, int low, int high, int searchVal) {
        if (low > high) {
            return false;
        }

        int mid = low + (high - low) / 2;

        if (nums[mid] == searchVal) {
            return true;
        } else if (searchVal > nums[mid]) {
            return binarySearchRecursive(nums, mid + 1, high, searchVal);
        } else {
            return binarySearchRecursive(nums, low, mid - 1, searchVal);
        }
    }

    public static void main(String[] args) {
        int[] arr = { 1, 2, 3, 4, 6, 8, 11, 13, 14, 15, 18, 19, 20, 24, 25, 26, 27, 29, 30, 32, 35, 36, 37, 39, 40, 42,
                44, 49, 51, 52, 53, 54, 57, 58, 59, 61, 62, 63, 67, 70, 71, 73, 82, 86, 88, 92, 94, 96, 98, 99 };
        System.out.println(binarySearch(arr, 1));
        return;
    }
}
