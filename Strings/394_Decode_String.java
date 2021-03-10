class Solution {
    public String decodeString(String s) {
        if (s == null || s.isEmpty()) {
            return "";
        }

        Stack<StringBuilder> sbStk = new Stack<>();
        Stack<Integer> multipliers = new Stack<>();
        StringBuilder result = new StringBuilder();
        int multiplier = 0;

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);

            if (Character.isDigit(c)) {
                multiplier = multiplier * 10 + c - '0';
            } else if (c == '[') {
                sbStk.push(result);
                multipliers.push(multiplier);

                result = new StringBuilder();
                multiplier = 0;
            } else if (c == ']') {
                StringBuilder previousString = sbStk.pop();
                int prevMultiplier = multipliers.pop();

                for (int j = 0; j < prevMultiplier; j++) {
                    previousString.append(result);
                }

                result = previousString;
            } else {
                result.append(c);
            }
        }

        return result.toString();
    }
}
