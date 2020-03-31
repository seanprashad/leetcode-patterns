class Solution {
    public int longestSubstring(String s, int k) {
        char[] str = s.toCharArray();
        int[] map = new int[26];

        int result = 0;

        for (int maxUniqueChars = 1; maxUniqueChars <= 26; maxUniqueChars++) {
            Arrays.fill(map, 0);

            int left = 0, right = 0, unique = 0, kUnique = 0;

            while (right < str.length) {
                if (unique <= maxUniqueChars) {
                    int idx = str[right] - 'a';

                    if (map[idx] == 0) {
                        ++unique;
                    }
                    ++map[idx];
                    if (map[idx] == k) {
                        ++kUnique;
                    }
                    ++right;
                } else {
                    int idx = str[left] - 'a';

                    if (map[idx] == k) {
                        --kUnique;
                    }
                    --map[idx];
                    if (map[idx] == 0) {
                        --unique;
                    }
                    ++left;
                }

                if (unique == maxUniqueChars && unique == kUnique) {
                    result = Math.max(result, right - left);
                }
            }
        }

        return result;
    }
}
