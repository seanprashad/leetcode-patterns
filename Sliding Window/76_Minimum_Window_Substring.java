class Solution {
    public String minWindow(String s, String t) {
        if (t == null || s.length() < t.length()) {
            return "";
        }

        Map<Character, Integer> hm = new HashMap<>();

        for (Character c : t.toCharArray()) {
            hm.put(c, hm.getOrDefault(c, 0) + 1);
        }

        int start = 0, end = 0, minLen = Integer.MAX_VALUE, counter = hm.size();
        String ans = "";

        while (end < s.length()) {
            char eCh = s.charAt(end);

            if (hm.containsKey(eCh)) {
                int cnt = hm.get(eCh);
                hm.put(eCh, --cnt);

                if (cnt == 0) {
                    --counter;
                }
            }

            end++;

            while (counter == 0) {
                if (minLen > end - start) {
                    minLen = end - start;
                    ans = s.substring(start, end);
                }

                char sCh = s.charAt(start);

                if (hm.containsKey(sCh)) {
                    int cnt = hm.get(sCh);
                    hm.put(sCh, ++cnt);

                    if (cnt > 0) {
                        ++counter;
                    }
                }

                start++;
            }
        }

        return ans;
    }
}
