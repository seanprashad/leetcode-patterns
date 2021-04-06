class Solution {
    public int lengthOfLIS(int[] nums) {
        List<Integer> piles = new ArrayList<>();

        for (int num : nums) {
            int idx = Collections.binarySearch(piles, num);
            if (idx < 0) {
                idx = ~idx;
            }

            if (idx == piles.size()) {
                piles.add(num);
            } else {
                piles.set(idx, num);
            }
        }

        return piles.size();
    }
}
