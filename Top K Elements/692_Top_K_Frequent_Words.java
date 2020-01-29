class Solution {
    public List<String> topKFrequent(String[] words, int k) {
        if (words == null || words.length == 0) {
            return Collections.emptyList();
        }

        List<String> res = new ArrayList<>();
        Map<String, Integer> hm = new HashMap<>();
        PriorityQueue<Map.Entry<String, Integer>> pq = new PriorityQueue<>(
                (a, b) -> a.getValue().equals(b.getValue()) ? b.getKey().compareTo(a.getKey())
                        : a.getValue() - b.getValue());

        for (String w : words) {
            hm.put(w, hm.getOrDefault(w, 0) + 1);
        }

        for (Map.Entry<String, Integer> entry : hm.entrySet()) {
            pq.offer(entry);

            if (pq.size() > k) {
                pq.poll();
            }
        }

        while (!pq.isEmpty()) {
            res.add(pq.poll().getKey());
        }

        Collections.reverse(res);
        return res;
    }
}
