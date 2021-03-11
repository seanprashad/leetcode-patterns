class Solution {
    private class Node {
        private char letter;
        private int count;

        public Node(char l, int c) {
            letter = l;
            count = c;
        }
    }

    public String removeDuplicates(String s, int k) {
        if (s == null || s.isEmpty()) {
            return "";
        }

        StringBuilder sb = new StringBuilder();
        Stack<Node> st = new Stack<>();

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);

            if (!st.isEmpty() && st.peek().letter == c) {
                st.peek().count += 1;
            } else {
                st.push(new Node(c, 1));
            }

            while (!st.isEmpty() && st.peek().count >= k) {
                st.pop();
            }
        }

        for (Node n : st) {
            for (int i = 0; i < n.count; i++) {
                sb.append(n.letter);
            }
        }

        return sb.toString();
    }
}
