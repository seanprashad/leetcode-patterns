class Solution {
    public String reorganizeString(String S) {
        if (S == null || S.length() == 0) {
            return new String();
        }

        Map<Character, Integer> hm = new HashMap<>();
        char maxChar = S.charAt(0);

        for (char c : S.toCharArray()) {
            hm.put(c, hm.getOrDefault(c, 0) + 1);

            if (hm.get(c) > hm.get(maxChar)) {
                maxChar = c;
            }
        }

        if (hm.get(maxChar) > (S.length() + 1) / 2) {
            return "";
        }

        int idx = 0;
        char[] result = new char[S.length()];

        while (idx < S.length() && hm.get(maxChar) > 0) {
            result[idx] = maxChar;
            idx += 2;
            hm.put(maxChar, hm.get(maxChar) - 1);
        }

        for (char c : hm.keySet()) {
            while (hm.get(c) > 0) {
                if (idx >= S.length()) {
                    idx = 1;
                }

                result[idx] = c;
                idx += 2;
                hm.put(c, hm.get(c) - 1);
            }
        }

        return String.valueOf(result);
    }
}
