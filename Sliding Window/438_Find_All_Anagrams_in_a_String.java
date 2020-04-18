class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        if (p.length() > s.length()) {
            return Collections.emptyList();
        }

        int counter = 0;
        Map<Character, Integer> map = new HashMap<>();

        for (char c : p.toCharArray()) {
            map.put(c, map.getOrDefault(c, 0) + 1);
            if (map.get(c) == 1) {
                ++counter;
            }
        }

        int left = 0, right = 0;
        List<Integer> result = new ArrayList<>();

        while (right < s.length()) {
            char chR = s.charAt(right);

            if (map.containsKey(chR)) {
                map.put(chR, map.get(chR) - 1);
                if (map.get(chR) == 0) {
                    --counter;
                }
            }

            ++right;

            while (counter == 0) {
                char chL = s.charAt(left);

                if (map.containsKey(chL)) {
                    if (map.get(chL) == 0) {
                        ++counter;
                    }
                    map.put(chL, map.get(chL) + 1);
                }

                if (right - left == p.length()) {
                    result.add(left);
                }

                ++left;
            }
        }

        return result;
    }
}
