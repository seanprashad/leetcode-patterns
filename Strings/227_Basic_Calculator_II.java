class Solution {
    public int calculate(String s) {
        if (s == null || s.length() == 0) {
            return 0;
        }

        Stack<Integer> st = new Stack<>();
        int num = 0, total = 0;
        char sign = '+';

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);

            if (Character.isDigit(c)) {
                num = num * 10 + c - '0';
            }

            if (i == s.length() - 1 || !Character.isDigit(c) && c != ' ') {
                switch (sign) {
                    case '+':
                        st.push(num);
                        break;
                    case '-':
                        st.push(-num);
                        break;
                    case '*':
                        st.push(st.pop() * num);
                        break;
                    case '/':
                        st.push(st.pop() / num);
                        break;
                }

                sign = c;
                num = 0;
            }
        }

        while (!st.isEmpty()) {
            total += st.pop();
        }
        return total;
    }
}
