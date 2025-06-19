class Solution {
    private class LetterCount {
        private char letter;
        private int count;

        public LetterCount(char letter, int count) {
            this.letter = letter;
            this.count = count;
        }
    }

    public String reorganizeString(String s) {
        Map<Character, Integer> hm = new HashMap<>();

        for (char c : s.toCharArray()) {
            hm.put(c, hm.getOrDefault(c, 0) + 1);
        }

        PriorityQueue<LetterCount> pq = new PriorityQueue<>((a, b) -> Integer.compare(b.count, a.count));

        for (Map.Entry<Character, Integer> entry : hm.entrySet()) {
            pq.offer(new LetterCount(entry.getKey(), entry.getValue()));
        }

        int idx = 0;
        char[] result = new char[s.length()];

        while (!pq.isEmpty()) {
            if (idx == 0 || pq.peek().letter != result[idx - 1]) {
                LetterCount l = pq.poll();
                result[idx] = l.letter;
                l.count--;

                if (l.count > 0) {
                    pq.offer(l);
                }
            } else {
                LetterCount firstResult = pq.poll();

                if (pq.isEmpty()) {
                    return "";
                }

                LetterCount secondResult = pq.poll();
                result[idx] = secondResult.letter;
                secondResult.count--;

                if (secondResult.count > 0) {
                    pq.offer(secondResult);
                }

                if (firstResult.count > 0) {
                    pq.offer(firstResult);
                }
            }

            ++idx;
        }

        return String.valueOf(result);
    }
}
