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

    public String removeDuplicates(String S) {
        if (S == null || S.length() < 2) {
            return S;
        }

        Stack<Letter> st = new Stack<>();

        for (int i = 0; i < S.length(); i++) {
            char c = S.charAt(i);
            int count = 1;

            if (st.isEmpty() || st.peek().getChar() != c) {
                st.push(new Letter(c, count));
            } else {
                st.pop();
            }
        }

        StringBuilder sb = new StringBuilder();

        while (!st.isEmpty()) {
            sb.append(st.pop().getChar());
        }

        return sb.reverse().toString();
    }
}
