import java.util.*;

public class Java_Array_Practice {
    // printOneDArray accepts a one dimensional array
    // and prints all of the values in it
    //
    // If the array is null or the length is 0,
    // we should return to avoid null pointer exceptions
    public static void printOneDArray(int[] arr) {
        if (arr == null || arr.length == 0) {
            return;
        }

        // for (int i = 0; i < arr.length; i++) {
        // System.out.println(arr[i]);
        // }

        for (int num : arr) {
            System.out.print(num + ", ");
        }

        System.out.println();
    }

    // printTwoDArray accepts a two dimensional array
    // and prints all of the values for each row
    //
    // If the first row, or first array of arrays is null,
    // we should return to avoid null pointer exceptions
    //
    // Hint: For better code reusability, consider using
    // printOneDArray() for each row
    public static void printTwoDArray(int[][] arr) {
        if (arr == null || arr[0] == null) {
            return;
        }

        // for (int i = 0; i < arr.length; i++) {
        // printOneDArray(arr[i]);
        // }

        for (int[] row : arr) {
            printOneDArray(row);
        }
    }

    // evenFirst accepts an array and modifies it
    // to put all even values first and odd values after.
    // The order of the even and odd elements doesn't matter,
    // as long as all even elements come before all odd elements.
    //
    // Time complexity should be O(n)
    // Space complexity O(1)
    //
    // Hint: Use the two pointer method
    public static void evenFirst(int[] nums) {
        if (nums == null || nums.length == 0) {
            return;
        }

        int i = 0;
        int j = nums.length - 1;

        while (i <= j) {
            while (i <= j && nums[i] % 2 == 0) {
                i++;
            }
            while (i <= j && nums[j] % 2 != 0) {
                j--;
            }
            // Do swap
            int temp = nums[i];
            nums[i] = nums[j];
            nums[j] = temp;
            // something else
            i++;
            j--;
        }

    }

    public static void main(String[] args) {
        // Step 1.
        // Create an array, called oneDArr, with initializer values from
        // 1 through 10
        int[] oneDArr = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

        // Step 2.
        // Create a two dimensional array, call twoDArr, with initializer values
        // for three rows
        //
        // Row one should contain 2, 4, 6
        // Row two should contain 10, 20, 30
        // Row three should contain 100, 500, 1000
        int[][] twoDArr = new int[][] { { 2, 4, 6 }, { 10, 20, 30 }, { 100, 500, 1000 } };

        // printOneDArray(oneDArr);
        // printTwoDArray(twoDArr);

        // Step 7. Shiba Inu potats only like it when all even values come first
        // in an array.
        // Move all values from aArr that will offend potats using
        // evenFirst(), which modifies the original array
        //
        // Hint, the array might be modified to look like:
        // 10, 2, 8, 4, 6, 5, 7, 3, 9, 1

        int[] nums = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        evenFirst(nums);

        // Step 8. Print out all of the values in the returned array
        // from evenFirst()

        for (int i : nums) {
            System.out.print(i + ", ");
        }

        return;
    }
}
