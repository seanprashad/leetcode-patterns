class Solution {
    public boolean isValid(String s) {
        if (s == null || s.length() == 0) {
            return true;
        }

        Stack<Character> st = new Stack<>();

        for (char c : s.toCharArray()) {
            if (c == '(') {
                st.push(')');
            } else if (c == '{') {
                st.push('}');
            } else if (c == '[') {
                st.push(']');
            } else if (st.isEmpty() || c != st.peek()) {
                return false;
            } else {
                st.pop();
            }
        }

        return st.isEmpty();
    }
}
