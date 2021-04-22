class Solution {
    public int[] productExceptSelf(int[] nums) {
        int[] result = new int[nums.length];
        int product = 1;
        int zeroIdx = -1;
        boolean hasZero = false;

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == 0) {
                if (hasZero) {
                    return new int[nums.length];
                }

                zeroIdx = i;
                hasZero = true;
            } else {
                result[i] = product;
                product *= nums[i];
            }
        }

        if (hasZero) {
            Arrays.fill(result, 0);
            result[zeroIdx] = product;
            return result;
        }

        product = 1;

        for (int i = nums.length - 1; i >= 0; i--) {
            result[i] *= product;
            product *= nums[i];
        }

        return result;
    }
}
