class Solution {
    public int maxFreq(String s, int maxLetters, int minSize, int maxSize) {
        int result = 0;
        Map<Character, Integer> cMap = new HashMap<>();
        Map<String, Integer> sMap = new HashMap<>();

        for (int i = 0, j = 0; j < s.length(); j++) {
            char c = s.charAt(j);
            cMap.put(c, cMap.getOrDefault(c, 0) + 1);

            if (j - i + 1 > minSize) {
                char l = s.charAt(i);
                cMap.put(l, cMap.get(l) - 1);

                if (cMap.get(l) == 0) {
                    cMap.remove(l);
                }

                ++i;
            }

            if (j - i + 1 >= minSize && cMap.size() <= maxLetters) {
                String str = s.substring(i, j + 1);
                sMap.put(str, sMap.getOrDefault(str, 0) + 1);
                result = Math.max(result, sMap.get(str));
            }
        }

        return result;
    }
}
