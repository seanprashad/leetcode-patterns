class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> freqMap = new HashMap<>();
        List<List<Integer>> buckets = new ArrayList<>();

        for (int i = 0; i < nums.length; i++) {
            freqMap.merge(nums[i], 1, Integer::sum);
        }

        for (int i = 0; i <= nums.length; i++) {
            buckets.add(new ArrayList<>());
        }

        for (Map.Entry<Integer, Integer> entry : freqMap.entrySet()) {
            int number = entry.getKey();
            int freq = entry.getValue();

            buckets.get(freq).add(number);
        }

        int[] result = new int[k];
        int idx = 0;

        for (int i = buckets.size() - 1; i >= 0 && idx < k; i--) {
            for (int n : buckets.get(i)) {
                result[idx] = n;
                ++idx;
                if (idx == k) { break; }
            }
        }

        return result;
    }
}
