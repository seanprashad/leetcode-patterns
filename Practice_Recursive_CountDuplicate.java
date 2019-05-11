public class Practice_Recursive_CountDuplicate {
    public static int count(int[] nums, int length, int val) {
        if (length == 0) {
            return 0;
        }

        int total = nums[length - 1] == val ? 1 : 0;
        total += count(nums, length - 1, val);
        return total;
    }

    public static void main(String[] args) {
        int[] arr = { 1, 2, 3, 3 };
        System.out.println(count(arr, arr.length, 3));
        return;
    }
}