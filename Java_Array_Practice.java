public class Java_Array_Practice {
    // printOneDArray accepts a one dimensional array
    // and prints all of the values in it
    //
    // If the array is null or the length is 0,
    // we should return to avoid null pointer exceptions
    public static void printOneDArray(int[] arr) {

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
    public static void evenFirst(int[] arr) {

    }

    public static void main(String[] args) {
        // Step 1.
        // Create an array, called oneDArr, with initializer values from
        // 1 through 10

        // Step 2.
        // Create a two dimensional array, call twoDArr, with initializer values
        // for three rows
        //
        // Row one should contain 2, 4, 6
        // Row two should contain 10, 20, 30
        // Row three should contain 100, 500, 1000

        // Step 3.
        // Create an ArrayList, called aList, using the existing oneDArr

        // Step 4.
        // Print out the size of aList, which should be 10

        // Step 5.
        // Convert aList into an array, called aArr

        // Step 6.
        // Print the newly created aArr

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
