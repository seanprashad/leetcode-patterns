class Solution {
    public int longestConsecutive(int[] nums) {
        if (nums.length == 0) {
            return 0;
        }

        Set<Integer> s = new HashSet<>();
        int result = 0;

        for (int i = 0; i < nums.length; i++) {
            s.add(nums[i]);
        }

        for (int num : s) {
            if (!s.contains(num - 1)) {
                int start = num;

                while (s.contains(start + 1)) {
                    ++start;
                }

                result = Math.max(result, start - num + 1);
            }
        }

        return result;
    }
}