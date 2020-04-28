class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();

        for (int num : nums) {
            map.put(num, map.getOrDefault(num, 0) + 1);
        }

        List<List<Integer>> buckets = new ArrayList<>();

        for (int i = 0; i <= nums.length; i++) {
            buckets.add(new ArrayList<>());
        }

        for (int key : map.keySet()) {
            int freq = map.get(key);
            buckets.get(freq).add(key);
        }

        int idx = 0;
        int[] result = new int[k];

        for (int i = buckets.size() - 1; i >= 0 && idx < k; i--) {
            for (int j = 0; j < buckets.get(i).size(); j++) {
                result[idx] = buckets.get(i).get(j);
                ++idx;
            }
        }

        return result;
    }
}
