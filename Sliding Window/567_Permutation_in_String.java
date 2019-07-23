class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if (s1 == null || s2.length() < s1.length()) {
            return false;
        }

        int[] lookup = new int[26];

        for (int i = 0; i < s1.length(); i++) {
            lookup[s1.charAt(i) - 'a']++;
        }

        int start = 0, end = s1.length() - 1;

        while (end < s2.length()) {
            for (int i = start; i <= end; i++) {
                lookup[s2.charAt(i) - 'a']--;
            }

            if (allZeros(lookup)) {
                return true;
            }

            for (int i = start; i <= end; i++) {
                lookup[s2.charAt(i) - 'a']++;
            }

            start++;
            end++;
        }

        return false;
    }

    private boolean allZeros(int[] lookup) {
        for (int i = 0; i < lookup.length; i++) {
            if (lookup[i] != 0) {
                return false;
            }
        }

        return true;
    }
}
