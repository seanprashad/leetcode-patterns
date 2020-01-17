class Solution {
    public int longestConsecutive(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        int max = 0;
        Set<Integer> set = new HashSet<>();
        for (int n : nums) {
            set.add(n);
        }

        for (int n : nums) {
            int left = n - 1;
            int right = n + 1;

            while (set.remove(left)) {
                left--;
            }
            while (set.remove(right)) {
                right++;
            }

            max = Math.max(max, right - left - 1);
        }

        return max;
    }
}
