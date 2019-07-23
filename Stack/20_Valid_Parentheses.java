class Solution {
    public static boolean isValid(String s) {
        if (s == null || s.length() == 0) {
            return true;
        }

        Stack<Character> st = new Stack<Character>();

        for (Character c : s.toCharArray()) {
            if (c == '(') {
                st.push(')');
            } else if (c == '{') {
                st.push('}');
            } else if (c == '[') {
                st.push(']');
            } else if (st.empty() || st.pop() != c) {
                return false;
            }
        }

        if (!st.empty()) {
            return false;
        }

        return true;
    }
}
