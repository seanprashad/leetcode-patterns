class Solution {
    public int myAtoi(String str) {
        if (str == null || str.length() == 0) {
            return 0;
        }

        int result = 0, idx = 0, sign = 1;

        while (idx < str.length() && str.charAt(idx) == ' ') {
            ++idx;
        }

        if (idx == str.length()) {
            return 0;
        }

        if (str.charAt(idx) == '+' || str.charAt(idx) == '-') {
            sign = str.charAt(idx) == '+' ? 1 : -1;
            ++idx;
        }

        while (idx < str.length()) {
            if (!Character.isDigit(str.charAt(idx))) {
                break;
            }

            int digit = str.charAt(idx) - '0';

            if ((Integer.MAX_VALUE - digit) / 10 < result) {
                return sign == 1 ? Integer.MAX_VALUE : Integer.MIN_VALUE;
            }

            result = result * 10 + digit;
            ++idx;
        }

        return sign * result;
    }
}
