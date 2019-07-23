public class BinarySearch_Iterative {
    public static boolean binarySearch(int[] nums, int searchVal) {
        if (nums == null || nums.length == 0) {
            return false;
        }

        int low = 0, high = nums.length - 1;

        while (low <= high) {
            // Note: (low + high) / 2; fails for large values of the int
            // variables low and high. Specifically, it fails if the sum of low
            // and high is greater than the maximum positive int value
            // (2^31 - 1). The sum overflows to a negative value, and the value
            // stays negative when divided by two.
            int mid = low + (low + high) / 2;

            if (nums[mid] == searchVal) {
                return true;
            } else if (searchVal > nums[mid]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return false;
    }

    public static void main(String[] args) {
        int[] arr = { 1, 2, 3, 4, 6, 8, 11, 13, 14, 15, 18, 19, 20, 24, 25, 26, 27, 29, 30, 32, 35, 36, 37, 39, 40, 42,
                44, 49, 51, 52, 53, 54, 57, 58, 59, 61, 62, 63, 67, 70, 71, 73, 82, 86, 88, 92, 94, 96, 98, 99 };
        System.out.println(binarySearch(arr, 10));
        return;
    }
}