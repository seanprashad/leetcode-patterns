class Solution {
    public int calculate(String s) {
        if (s.isEmpty()) {
            return 0;
        }

        int result = 0, sign = 1;

        Stack<Integer> st = new Stack<>();

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);

            if (c == ' ') {
                continue;
            }

            if (Character.isDigit(c)) {
                int sum = c - '0';

                while (i + 1 < s.length() && Character.isDigit(s.charAt(i + 1))) {
                    sum = sum * 10 + s.charAt(i + 1) - '0';
                    ++i;
                }

                result = result + sum * sign;
            } else if (c == '+') {
                sign = 1;
            } else if (c == '-') {
                sign = -1;
            } else if (c == '(') {
                st.push(result);
                st.push(sign);

                result = 0;
                sign = 1;
            } else if (c == ')') {
                int prevSign = st.pop();
                int prevResult = st.pop();

                result = result * prevSign + prevResult;
            }
        }

        return result;
    }
}
