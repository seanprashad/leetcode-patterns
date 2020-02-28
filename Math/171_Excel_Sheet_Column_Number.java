class Solution {
    public int titleToNumber(String s) {
        if (s == null || s.length() == 0) {
            return -1;
        }

        int sum = 0;

        for (char c : s.toCharArray()) {
            sum *= 26;
            sum += (c - 'A') + 1;
        }

        return sum;
    }
}
