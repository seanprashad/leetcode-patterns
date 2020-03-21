class Solution {
    public List<String> letterCombinations(String digits) {
        if (digits == null || digits.length() == 0) {
            return Collections.emptyList();
        }
        Map<Character, String> keypad = buildKeypad();
        List<String> result = new ArrayList<>();

        helper(digits, 0, new StringBuilder(), result, keypad);
        return result;
    }

    private void helper(String digits, int idx, StringBuilder sb, List<String> result, Map<Character, String> keypad) {
        if (sb.length() == digits.length()) {
            result.add(sb.toString());
            return;
        }

        String letters = keypad.get(digits.charAt(idx));

        for (int i = 0; i < letters.length(); i++) {
            sb.append(letters.charAt(i));
            helper(digits, idx + 1, sb, result, keypad);
            sb.deleteCharAt(sb.length() - 1);
        }
    }

    private Map<Character, String> buildKeypad() {
        Map<Character, String> keypad = new HashMap<>();

        keypad.put('1', "");
        keypad.put('2', "abc");
        keypad.put('3', "def");
        keypad.put('4', "ghi");
        keypad.put('5', "jkl");
        keypad.put('6', "mno");
        keypad.put('7', "pqrs");
        keypad.put('8', "tuv");
        keypad.put('9', "wxyz");

        return keypad;
    }
}
