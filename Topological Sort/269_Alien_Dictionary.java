class Solution {
    public String alienOrder(String[] words) {
        if (words == null || words.length == 0) {
            return "";
        }

        Map<Character, List<Character>> graph = new HashMap<>();
        Map<Character, Integer> inorder = new HashMap<>();

        for (String w : words) {
            for (char c : w.toCharArray()) {
                graph.putIfAbsent(c, new ArrayList<>());
                inorder.putIfAbsent(c, 0);
            }
        }

        for (int i = 0; i < words.length - 1; i++) {
            String word1 = words[i], word2 = words[i + 1];

            if (word1.length() > word2.length() && word1.startsWith(word2)) {
                return "";
            }

            for (int j = 0; j < Math.min(word1.length(), word2.length()); j++) {
                char c1 = word1.charAt(j), c2 = word2.charAt(j);

                if (c1 != c2) {
                    graph.get(c1).add(c2);
                    inorder.put(c2, inorder.get(c2) + 1);
                    break;
                }
            }
        }

        Queue<Character> q = new LinkedList<>();
        StringBuilder sb = new StringBuilder();

        for (Character c : inorder.keySet()) {
            if (inorder.get(c) == 0) {
                q.offer(c);
            }
        }

        while (!q.isEmpty()) {
            char c = q.poll();
            sb.append(c);

            for (char neighbour : graph.get(c)) {
                inorder.put(neighbour, inorder.get(neighbour) - 1);

                if (inorder.get(neighbour) == 0) {
                    q.offer(neighbour);
                }
            }
        }

        if (sb.length() < inorder.size()) {
            return "";
        }
        ;
        return sb.toString();
    }
}
