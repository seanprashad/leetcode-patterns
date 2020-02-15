import java.util.*;

public class BB1 {
    private class Letter {
        private char letter;
        private int count;

        public Letter(char letter, int count) {
            this.letter = letter;
            this.count = count;
        }

        public char getLetter() {
            return this.letter;
        }

        public int getCount() {
            return this.count;
        }

        public void setCount(int count) {
            this.count = count;
        }
    }

    private String crush(String s) {
        StringBuilder sb = new StringBuilder();
        Stack<Letter> st = new Stack<>();
        int threshold = 3;

        for (int i = 0; i < s.length(); i++) {
            if (st.isEmpty() || st.peek().getLetter() != s.charAt(i)) {
                if (!st.isEmpty() && st.peek().getCount() >= threshold) {
                    st.pop();
                }

                if (!st.isEmpty() && st.peek().getLetter() == s.charAt(i)) {
                    Letter l = st.pop();
                    l.setCount(l.getCount() + 1);
                    st.push(l);
                } else {
                    st.push(new Letter(s.charAt(i), 1));
                }
            } else {
                Letter l = st.pop();
                l.setCount(l.getCount() + 1);
                st.push(l);
            }
        }

        if (st.peek().getCount() >= threshold) {
            st.pop();
        }

        while (!st.isEmpty()) {
            Letter l = st.pop();

            for (int i = 0; i < l.getCount(); i++) {
                sb.append(l.getLetter());
            }
        }

        return sb.reverse().toString();
    }

    public static void main(String[] args) {
        BB1 candy = new BB1();
        String toCrush1 = "aaabbbbbacddddd";
        String toCrush2 = "deeeeedbbcccccbdaa";
        String toCrush3 = "aaabbbacd";

        // Should print "ac"
        System.out.println(candy.crush(toCrush1));

        // Should print "aa"
        System.out.println(candy.crush(toCrush2));

        // Should print "cd"
        System.out.println(candy.crush(toCrush3));

        return;
    }
}
