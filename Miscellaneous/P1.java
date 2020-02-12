public class P1 {
    public static int[] productOfArrayExceptItself(int[] nums) {
        if (nums == null || nums.length == 0) {
            return new int[] {};
        }

        int product = 1;
        int numZeroes = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == 0) {
                numZeroes += 1;
                continue;
            }
            product *= nums[i];
        }

        int[] result = new int[nums.length];

        if (numZeroes >= 2) {
            return result;
        }

        for (int i = 0; i < result.length; i++) {
            if (nums[i] == 0) {
                result[i] = product;
                continue;
            }
            result[i] = product / nums[i];
        }

        return result;
    }

    public static void main(String[] args) {
        int[] input1 = new int[] { 1, 2, 3, 4 };
        int[] input2 = new int[] { 0, 1, 2, 3 };
        int[] input3 = new int[] { 0, 1, 2, 3, 0 };

        int[] result1 = productOfArrayExceptItself(input1);
        int[] result2 = productOfArrayExceptItself(input2);
        int[] result3 = productOfArrayExceptItself(input3);

        System.out.println("Input1's answer should be: [24, 12, 8, 6]");
        for (int r : result1) {
            System.out.print(r + " ");
        }

        System.out.println();

        System.out.println("Input2's answer should be: [6, 6, 3, 2]");
        for (int r : result2) {
            System.out.print(r + " ");
        }

        System.out.println();

        System.out.println("Input2's answer should be: [0, 0, 0, 0, 0]");
        for (int r : result3) {
            System.out.print(r + " ");
        }

        return;
    }
}
