class Solution {
    public int minAddToMakeValid(String S) {
        if (S == null || S.length() == 0) {
            return 0;
        }

        int left = 0, right = 0, result = 0;

        for (int i = 0; i < S.length(); i++) {
            if (S.charAt(i) == '(') {
                ++open;
            } else if (open == 0) {
                ++result;
            } else {
                --open;
            }
        }

        return left + right;
    }
}
