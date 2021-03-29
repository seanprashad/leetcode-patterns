class Solution {
    public int[] productExceptSelf(int[] nums) {
        int[] result = new int[nums.length];

        boolean hasZero = false;
        int product = 1, zeroIdx = 0;

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == 0) {
                if (hasZero) {
                    return new int[nums.length];
                }

                hasZero = true;
                zeroIdx = i;
                continue;
            }

            result[i] = product;
            product *= nums[i];
        }

        product = 1;

        for (int i = nums.length - 1; i >= 0; i--) {
            if (nums[i] == 0) {
                continue;
            }

            result[i] *= product;
            product *= nums[i];
        }

        if (hasZero) {
            Arrays.fill(result, 0);
            result[zeroIdx] = product;
        }

        return result;
    }
}
