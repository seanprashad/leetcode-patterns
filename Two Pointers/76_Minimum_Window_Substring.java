class Solution {
    public String minWindow(String s, String t) {
        Map<Character, Integer> map = new HashMap<>();
        for (Character c : t.toCharArray()) {
            map.put(c, map.getOrDefault(c, 0) + 1);
        }

        String ans = "";
        int start = 0, end = 0;
        int counter = map.size(), minLen = Integer.MAX_VALUE;

        while (end < s.length()) {
            Character eCh = s.charAt(end);
            if (map.containsKey(eCh)) {
                map.put(eCh, map.get(eCh) - 1);

                if (map.get(eCh) == 0) {
                    --counter;
                }
            }

            end++;

            while (counter == 0) {
                if (minLen > end - start) {
                    minLen = end - start;
                    ans = s.substring(start, end);
                }

                Character sCh = s.charAt(start);
                if (map.containsKey(sCh)) {
                    map.put(sCh, map.get(sCh) + 1);

                    if (map.get(sCh) > 0) {
                        ++counter;
                    }
                }

                start++;
            }
        }

        return ans;
    }
}
