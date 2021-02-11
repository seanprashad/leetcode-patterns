class Solution {
    public int findPairs(int[] nums, int k) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        Map<Integer, Integer> hm = new HashMap<>();
        int result = 0;

        for (int num : nums) {
            hm.put(num, hm.getOrDefault(num, 0) + 1);
        }

        for (int key : hm.keySet()) {
            if (k == 0) {
                if (hm.get(key) >= 2) {
                    ++result;
                }
            } else if (hm.containsKey(k + key)) {
                ++result;
            }
        }

        return result;
    }
}
