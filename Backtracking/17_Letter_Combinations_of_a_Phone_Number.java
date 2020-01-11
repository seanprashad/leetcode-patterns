class Solution {
    private static final String[] KEYS = new String[] { "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv",
            "wxyz" };

    public List<String> letterCombinations(String digits) {
        if (digits == null || digits.length() == 0) {
            return Collections.emptyList();
        }

        List<String> result = new ArrayList<>();
        dfs(digits, 0, new StringBuilder(), result);
        return result;
    }

    private void dfs(String digits, int offset, StringBuilder sb, List<String> result) {
        if (offset >= digits.length()) {
            result.add(sb.toString());
            return;
        }

        String letters = KEYS[digits.charAt(offset) - '0'];
        for (int i = 0; i < letters.length(); i++) {
            sb.append(letters.charAt(i));
            dfs(digits, offset + 1, sb, result);
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}
