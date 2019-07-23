class Solution {
    public int singleNumber(int[] nums) {
        int unique = 0;
        for (Integer n : nums) {
            unique ^= n;
        }
        return unique;
    }
}
