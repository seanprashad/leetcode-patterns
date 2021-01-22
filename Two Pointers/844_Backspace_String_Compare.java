class Solution {
    public boolean backspaceCompare(String s, String t) {
        int i = s.length() - 1, j = t.length() - 1, sCounter = 0, tCounter = 0;

        while (i >= 0 || j >= 0) {
            while (i >= 0 && (s.charAt(i) == '#' || sCounter > 0)) {
                if (s.charAt(i) == '#') ++sCounter;
                else --sCounter;
                --i;
            }

            while (j >= 0 && (t.charAt(j) == '#' || tCounter > 0)) {
                if (t.charAt(j) == '#') ++tCounter;
                else --tCounter;
                --j;
            }

            if (i >= 0 && j >= 0 && s.charAt(i) == t.charAt(j)) {
                --i;
                --j;
            } else {
                break;
            }
        }

        return i < 0 && j < 0;
    }
}
