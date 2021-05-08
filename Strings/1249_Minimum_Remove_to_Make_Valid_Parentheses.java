class Solution {
    public String minRemoveToMakeValid(String s) {
        if (s == null || s.isEmpty()) {
            return "";
        }

        StringBuilder sb = new StringBuilder();
        int counter = 0;

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);

            if (c == '(') {
                ++counter;
            } else if (c == ')') {
                if (counter == 0) {
                    continue;
                }
                --counter;
            }

            sb.append(c);
        }

        for (int i = sb.length() - 1; i >= 0; i--) {
            char c = sb.charAt(i);

            if (c == '(' && counter > 0) {
                --counter;
                sb.deleteCharAt(i);
            }
        }

        return sb.toString();
    }
}
