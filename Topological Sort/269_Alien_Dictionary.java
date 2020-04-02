class Solution {
    public String alienOrder(String[] words) {
        if (words == null || words.length == 0) {
            return "";
        }

        int indegrees[] = new int[26];
        Map<Character, List<Character>> graph = buildGraph(words, indegrees);

        if (graph == null) {
            return "";
        }

        return topologicalSort(graph, indegrees);
    }

    private Map<Character, List<Character>> buildGraph(String[] words, int[] indegrees) {
        Map<Character, List<Character>> graph = new HashMap<>();

        for (String word : words) {
            for (char c : word.toCharArray()) {
                graph.putIfAbsent(c, new ArrayList<>());
            }
        }

        for (int i = 0; i < words.length - 1; i++) {
            String w1 = words[i];
            String w2 = words[i + 1];

            int len = Math.min(w1.length(), w2.length());

            for (int j = 0; j < len; j++) {
                char c1 = w1.charAt(j);
                char c2 = w2.charAt(j);

                if (c1 != c2) {
                    graph.get(c1).add(c2);
                    indegrees[c2 - 'a']++;
                    break;
                }

                if (j == w2.length() - 1 && w1.length() > w2.length()) {
                    return null;
                }
            }
        }

        return graph;
    }

    private String topologicalSort(Map<Character, List<Character>> graph, int[] indegrees) {
        StringBuilder sb = new StringBuilder();
        Queue<Character> q = new LinkedList<>();

        for (char c : graph.keySet()) {
            if (indegrees[c - 'a'] == 0) {
                q.offer(c);
            }
        }

        while (!q.isEmpty()) {
            char c = q.poll();
            sb.append(c);

            for (char neighbour : graph.get(c)) {
                indegrees[neighbour - 'a']--;

                if (indegrees[neighbour - 'a'] == 0) {
                    q.offer(neighbour);
                }
            }
        }

        return sb.length() == graph.size() ? sb.toString() : "";
    }
}
