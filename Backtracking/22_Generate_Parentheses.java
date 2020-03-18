class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<>();

        helper(n, 0, 0, new StringBuilder(), result);
        return result;
    }

    private void helper(int n, int open, int close, StringBuilder temp, List<String> result) {
        if (temp.length() == n * 2) {
            result.add(temp.toString());
            return;
        }

        if (open < n) {
            temp.append("(");
            helper(n, open + 1, close, temp, result);
            temp.deleteCharAt(temp.length() - 1);
        }

        if (close < open) {
            temp.append(")");
            helper(n, open, close + 1, temp, result);
            temp.deleteCharAt(temp.length() - 1);
        }
    }
}
