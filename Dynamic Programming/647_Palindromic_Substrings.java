class Solution {
    public int countSubstrings(String s) {
        if (s == null || s.length() == 0) {
            return 0;
        }

        int result = 0;

        for (int i = 0; i < s.length(); i++) {
            result += expand(s, i, i);
            result += expand(s, i, i + 1);
        }

        return result;
    }

    private int expand(String str, int s, int e) {
        int count = 0;

        while (s >= 0 && e < str.length() && str.charAt(s) == str.charAt(e)) {
            --s;
            ++e;
            ++count;
        }

        return count;
    }
}
