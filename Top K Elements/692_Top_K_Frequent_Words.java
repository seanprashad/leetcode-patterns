class Solution {
    public List<String> topKFrequent(String[] words, int k) {
        List<String> result = new ArrayList<String>();
        HashMap<String, Integer> hm = new HashMap<String, Integer>();

        if (words == null || words.length == 0) {
            return result;
        }

        for (String s : words) {
            hm.put(s, hm.getOrDefault(s, 0) + 1);
        }

        PriorityQueue<Map.Entry<String, Integer>> maxHeap = new PriorityQueue<>(k,
                (a, b) -> a.getValue().equals(b.getValue()) ? a.getKey().compareTo(b.getKey())
                        : b.getValue() - a.getValue());

        for (Map.Entry<String, Integer> entry : hm.entrySet()) {
            maxHeap.add(entry);
        }

        while (result.size() < k) {
            result.add(maxHeap.poll().getKey());
        }

        return result;
    }
}
