class Solution {
    public String reorganizeString(String s) {
        int[] counts = new int[26];

        for (char c : s.toCharArray()) {
            counts[c - 'a']++;
        }

        int maxCount = 0, letter = 0;

        for (int i = 0; i < 26; i++) {
            if (counts[i] > maxCount) {
                letter = i;
                maxCount = counts[i];
            }
        }

        if (maxCount > (s.length() + 1) / 2) { return ""; }
        
        char[] result = new char[s.length()];
        int idx = 0;

        while (counts[letter] > 0) {
            result[idx] = (char) (letter + 'a');
            counts[letter]--;
            idx += 2;
        }

        for (int i = 0; i < 26; i++) {
            while (counts[i] > 0) {
                if (idx >= result.length) {
                    idx = 1;
                }

                result[idx] = (char) (i + 'a');
                counts[i]--;
                idx += 2;
            }
        }

        return String.valueOf(result);
    }
}
