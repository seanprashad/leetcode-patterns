class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if (s1 == null || s1.length() == 0 || s1.length() > s2.length()) {
            return false;
        }

        Map<Character, Integer> hm = new HashMap<>();

        for (char c : s1.toCharArray()) {
            hm.put(c, hm.getOrDefault(c, 0) + 1);
        }

        int s = 0, e = 0, counter = hm.size();

        while (e < s2.length()) {
            if (hm.containsKey(s2.charAt(e))) {
                hm.put(s2.charAt(e), hm.get(s2.charAt(e)) - 1);

                if (hm.get(s2.charAt(e)) == 0) {
                    --counter;
                }
            }

            ++e;

            if (e - s > s1.length()) {
                if (hm.containsKey(s2.charAt(s))) {
                    if (hm.get(s2.charAt(s)) == 0) {
                        ++counter;
                    }
                    hm.put(s2.charAt(s), hm.get(s2.charAt(s)) + 1);
                }

                ++s;
            }

            if (counter == 0 && e - s == s1.length()) {
                return true;
            }
        }

        return false;
    }
}
