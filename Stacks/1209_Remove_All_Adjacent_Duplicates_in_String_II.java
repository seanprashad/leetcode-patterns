class Solution {
    private class Letter {
        private char c;
        private int count;

        public Letter(char c, int count) {
            this.c = c;
            this.count = count;
        }

        public char getChar() {
            return this.c;
        }

        public int getCount() {
            return this.count;
        }

        private void setCount(int count) {
            this.count = count;
        }
    }

    public String removeDuplicates(String s, int k) {
        if (s == null || s.length() < k) {
            return s;
        }

        Stack<Letter> st = new Stack<>();

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            int count = 1;

            if (st.isEmpty() || st.peek().getChar() != c) {
                st.push(new Letter(c, count));
            } else {
                Letter l = st.pop();
                l.setCount(l.getCount() + 1);
                st.push(l);
            }

            if (st.peek().getCount() == k) {
                st.pop();
            }
        }

        StringBuilder sb = new StringBuilder();

        while (!st.isEmpty()) {
            Letter l = st.pop();

            for (int i = 0; i < l.getCount(); i++) {
                sb.append(l.getChar());
            }
        }

        return sb.reverse().toString();
    }
}
