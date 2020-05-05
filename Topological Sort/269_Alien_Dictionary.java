class Solution {
    public String alienOrder(String[] words) {
        Map<Character, List<Character>> adjList = new HashMap<>();
        Map<Character, Integer> inorderMap = new HashMap<>();

        for (String word : words) {
            for (char c : word.toCharArray()) {
                adjList.putIfAbsent(c, new ArrayList<>());
                inorderMap.putIfAbsent(c, 0);
            }
        }

        for (int i = 0; i < words.length - 1; i++) {
            String word1 = words[i];
            String word2 = words[i + 1];

            if (word1.length() > word2.length() && word1.startsWith(word2)) {
                return "";
            }

            for (int j = 0; j < Math.min(word1.length(), word2.length()); j++) {
                if (word1.charAt(j) != word2.charAt(j)) {
                    adjList.get(word1.charAt(j)).add(word2.charAt(j));
                    inorderMap.put(word2.charAt(j), inorderMap.get(word2.charAt(j)) + 1);
                    break;
                }
            }
        }

        Queue<Character> q = new LinkedList<>();
        StringBuilder sb = new StringBuilder();

        for (char c : inorderMap.keySet()) {
            if (inorderMap.get(c) == 0) {
                q.offer(c);
            }
        }

        while (!q.isEmpty()) {
            char c = q.poll();
            sb.append(c);

            for (char neighbour : adjList.get(c)) {
                inorderMap.put(neighbour, inorderMap.get(neighbour) - 1);
                if (inorderMap.get(neighbour) == 0) {
                    q.offer(neighbour);
                }
            }
        }

        if (sb.length() < inorderMap.size()) {
            return "";
        }
        return sb.toString();
    }
}
