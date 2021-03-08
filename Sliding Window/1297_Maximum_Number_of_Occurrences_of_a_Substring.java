class Solution {
    public int maxFreq(String s, int maxLetters, int minSize, int maxSize) {
        int result = 0;
        Map<String, Integer> freq = new HashMap<>();

        for (int i = 0; i < s.length() - minSize + 1; i++) {
            String str = s.substring(i, i + minSize);

            if (isValid(str, maxLetters)) {
                freq.put(str, freq.getOrDefault(str, 0) + 1);
                result = Math.max(result, freq.get(str));
            }
        }

        return result;
    }

    private boolean isValid(String s, int maxLetters) {
        Set<Character> set = new HashSet<>();

        for (char c : s.toCharArray()) {
            set.add(c);
        }

        return set.size() <= maxLetters;
    }
}
