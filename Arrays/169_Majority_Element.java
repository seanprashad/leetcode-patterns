class Solution {
    public int majorityElement(int[] nums) {
        if (nums == null || nums.length == 0) { return 0; }

        int candidate = 0, count = 0;

        for (int num : nums) {
            if (count == 0) {
                candidate = num;
                ++count;
            } else {
                if (candidate == num) { ++count; }
                else { --count; }
            }
        }

        return candidate;
    }
}
