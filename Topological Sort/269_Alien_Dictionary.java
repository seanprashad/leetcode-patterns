class Solution {
    public String alienOrder(String[] words) {
        Map<Character, List<Character>> graph = new HashMap<>();
        Map<Character, Integer> counts = new HashMap<>();

        for (String word : words) {
            for (char c : word.toCharArray()) {
                graph.put(c, new ArrayList<>());
                counts.put(c, 0);
            }
        }

        for (int i = 0; i < words.length - 1; i++) {
            String w1 = words[i], w2 = words[i + 1];
            if (w1.length() > w2.length() && w1.startsWith(w2)) { return ""; }

            for (int j = 0; j < Math.min(w1.length(), w2.length()); j++) {
                char c1 = w1.charAt(j), c2 = w2.charAt(j);

                if (c1 != c2) {
                    graph.get(c1).add(c2);
                    counts.put(c2, counts.get(c2) + 1);
                    break;
                }
            }
        }

        StringBuilder sb = new StringBuilder();
        Queue<Character> q = new LinkedList<>();

        for (char c : counts.keySet()) {
            if (counts.get(c) == 0) {
                q.offer(c);
            }
        }

        while (!q.isEmpty()) {
            char curr = q.poll();
            sb.append(curr);

            for (char neighbour : graph.get(curr)) {
                int newCount = counts.get(neighbour) - 1;
                counts.put(neighbour, newCount);

                if (newCount == 0) {
                    q.offer(neighbour);
                }
            }
        }

        if (sb.length() < counts.size()) { return ""; }

        return sb.toString();
    }
}
