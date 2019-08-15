class Solution {
    public int longestConsecutive(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        int max = 0;
        Set<Integer> set = new HashSet<>();
        for (int num : nums) {
            set.add(num);
        }

        for (int startingNum : nums) {
            if (!set.contains(startingNum - 1)) {
                int nextVal = startingNum;

                while (set.contains(nextVal)) {
                    ++nextVal;
                }

                max = Math.max(max, nextVal - startingNum);
            }
        }

        return max;
    }
}
