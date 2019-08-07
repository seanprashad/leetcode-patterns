class Solution {
    public String reorganizeString(String S) {
        if (S == null || S.length() == 0) {
            return "";
        }

        HashMap<Character, Integer> hm = new HashMap<>();
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> b[1] - a[1]);

        for (char c : S.toCharArray()) {
            hm.put(c, hm.getOrDefault(c, 0) + 1);

            if (hm.get(c) > (S.length() + 1) / 2) {
                return "";
            }
        }

        for (char key : hm.keySet()) {
            pq.offer(new int[] { key, hm.get(key) });
        }

        StringBuilder sb = new StringBuilder();
        int[] prev = new int[] { -1, 0 };

        while (!pq.isEmpty()) {
            int[] curr = pq.poll();

            if (--prev[1] > 0) {
                pq.offer(prev);
            }

            sb.append((char) curr[0]);
            prev = curr;
        }

        return sb.toString();
    }
}
