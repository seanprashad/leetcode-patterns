class Solution {
    public String decodeString(String s) {
        Stack<Integer> multipliers = new Stack<>();
        Stack<StringBuilder> strings = new Stack<>();

        StringBuilder result = new StringBuilder();
        int idx = 0, multiplier = 0;

        while (idx < s.length()) {
            if (Character.isDigit(s.charAt(idx))) {
                multiplier = multiplier * 10 + s.charAt(idx) - '0';
            } else if (s.charAt(idx) == '[') {
                strings.push(result);
                multipliers.push(multiplier);

                multiplier = 0;
                result = new StringBuilder();
            } else if (s.charAt(idx) == ']') {
                StringBuilder temp = new StringBuilder(strings.pop());
                int repetitions = multipliers.pop();

                for (int i = 0; i < repetitions; i++) {
                    temp.append(result);
                }

                result = temp;
            } else {
                result.append(s.charAt(idx));
            }

            ++idx;
        }

        return result.toString();
    }
}
