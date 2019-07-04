public class Product_Of_Array_Except_Itself_238 {
    public static int[] productExceptSelf(int[] nums) {
        if (nums == null || nums.length == 0) {
            return new int[] {};
        }

        int[] result = new int[nums.length];
        int productSoFar = 1;

        for (int i = 0; i < nums.length; i++) {
            result[i] = productSoFar;
            productSoFar *= nums[i];
        }

        productSoFar = 1;

        int[] result2 = new int[nums.length];
        for (int i = nums.length - 1; i >= 0; i--) {
            result2[i] = productSoFar;
            productSoFar *= nums[i];
        }

        return result;
    }

    public static void main(String[] args) {
        // int[] nums = new int[] { 3, 1, 2, 5, 6, 4 };
        int[] nums = new int[] { 1, 2, 3, 4 };

        int[] result = productExceptSelf(nums);

        for (int i = 0; i < result.length; i++) {
            System.out.print(result[i]);
            if (i != result.length - 1) {
                System.out.print(", ");
            }
        }

        return;
    }
}
