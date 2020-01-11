class Solution {
    public int minAddToMakeValid(String S) {
        if (S == null || S.length() == 0) {
            return 0;
        }

        int result = 0;
        Stack<Character> s = new Stack<>();

        for (char c : S.toCharArray()) {
            if (c == '(') {
                s.push(c);
            } else if (s.isEmpty()) {
                ++result;
            } else {
                s.pop();
            }
        }

        return result + s.size();
    }
}
