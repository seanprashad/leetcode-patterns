class Solution {
    public static int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> hm = new HashMap<>();
        int[] indices = new int[2];

        for (int i = 0; i < nums.length; i++) {
            int remainder = target - nums[i];
            if (hm.containsKey(remainder)) {
                indices[0] = hm.get(remainder);
                indices[1] = i;
                return indices;
            }

            hm.put(nums[i], i);
        }

        return new int[] {};
    }
}
