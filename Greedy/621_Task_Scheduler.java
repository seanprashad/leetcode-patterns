class Solution {
    public int leastInterval(char[] tasks, int n) {
        if (tasks == null || tasks.length == 0) {
            return 0;
        }

        Map<Character, Integer> hm = new HashMap<>();
        PriorityQueue<Map.Entry<Character, Integer>> pq = new PriorityQueue<>(
                (pair1, pair2) -> pair2.getValue() - pair1.getValue());

        for (char c : tasks) {
            hm.put(c, hm.getOrDefault(c, 0) + 1);
        }
        pq.addAll(hm.entrySet());

        int cycles = 0;

        while (!pq.isEmpty()) {
            List<Map.Entry<Character, Integer>> temp = new ArrayList<>();
            int emptyTaskSlots = n + 1;

            while (emptyTaskSlots > 0 && !pq.isEmpty()) {
                --emptyTaskSlots;
                ++cycles;

                Map.Entry<Character, Integer> entry = pq.poll();
                entry.setValue(entry.getValue() - 1);

                if (entry.getValue() > 0) {
                    temp.add(entry);
                }
            }

            pq.addAll(temp);

            if (pq.isEmpty()) {
                break;
            }

            cycles += emptyTaskSlots;
        }

        return cycles;
    }
}
