class Solution {
    public int longestConsecutive(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        int longestStreak = 0;
        Set<Integer> set = new HashSet<>();

        for (int n : nums) {
            set.add(n);
        }

        for (int n : nums) {
            if (!set.contains(n - 1)) {
                int currNum = n;
                int currStreak = 0;

                while (set.contains(currNum)) {
                    ++currNum;
                    ++currStreak;
                }

                longestStreak = Math.max(longestStreak, currStreak);
            }
        }

        return longestStreak;
    }
}