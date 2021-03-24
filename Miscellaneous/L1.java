import java.util.*;

public class L1 {
    public static int[] getRangeForSum(int[] nums, int target) {
        if (nums == null || nums.length == 0 || target == 0) {
            return new int[2];
        }

        int[] result = new int[2];
        int left = 0, right = 0, currSum = 0;

        while (right < nums.length) {
            currSum += nums[right];
            ++right;

            if (currSum > target) {
                currSum -= nums[left];
                ++left;
            }

            if (currSum == target) {
                result[0] = left;
                result[1] = right;
                break;
            }
        }

        return result;
    }

    public static void main(String[] args) {
        int[] nums = new int[] { 1, 2, 3, 7, 5 };
        int target = 12;

        int[] result = getRangeForSum(nums, target);
        for (int r : result) {
            System.out.print(r + ", ");
        }

        return;
    }
}
