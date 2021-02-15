class Solution {
    public int findShortestSubArray(int[] nums) {
        Map<Integer, int[]> idxMap = new HashMap<>();
        List<Integer> mostFreq = new ArrayList<>();

        int maxFreq = 0, result = Integer.MAX_VALUE;

        for (int i = 0; i < nums.length; i++) {
            int[] indices = idxMap.getOrDefault(nums[i], new int[2]);

            if (idxMap.containsKey(nums[i])) {
                indices[0]++;
            } else {
                indices[0] = 1;
                indices[1] = i;
            }

            idxMap.put(nums[i], indices);

            if (indices[0] > maxFreq) {
                maxFreq = indices[0];
                result = i - indices[1] + 1;
            } else if (indices[0] == maxFreq) {
                result = Math.min(result, i - indices[1] + 1);
            }
        }

        return result;
    }
}
