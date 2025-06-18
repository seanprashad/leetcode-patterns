class Solution {
    public int shortestWay(String source, String target) {
        Map<Character, List<Integer>> hm = new HashMap<>();

        for (int i = 0; i < source.length(); i++) {
            char c = source.charAt(i);
            hm.putIfAbsent(c, new ArrayList<>());
            hm.get(c).add(i);
        }

        int i = 0, j = 0, result = 1;

        while (i < target.length()) {
            char ch = target.charAt(i);
            List<Integer> charIndexes = hm.get(ch);

            if (charIndexes == null) { return -1; }

            int idx = Collections.binarySearch(charIndexes, j);
            if (idx < 0) {
                idx = -idx - 1;
            }

            if (idx == charIndexes.size()) {
                ++result;
                j = 0;
            } else {
                j = charIndexes.get(idx) + 1;
                ++i;
            }
        }

        return result;
    }
}
