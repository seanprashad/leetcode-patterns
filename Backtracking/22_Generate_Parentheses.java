class Solution {
    public List<String> generateParenthesis(int n) {
        if (n <= 0) {
            return Collections.emptyList();
        }

        List<String> result = new ArrayList<>();
        dfs(n, 0, 0, new StringBuilder(), result);
        return result;
    }

    private void dfs(int n, int open, int close, StringBuilder sb, List<String> result) {
        if (open == n && close == n) {
            result.add(sb.toString());
            return;
        }

        if (open < n) {
            sb.append('(');
            dfs(n, open + 1, close, sb, result);
            sb.deleteCharAt(sb.length() - 1);
        }

        if (close < open) {
            sb.append(')');
            dfs(n, open, close + 1, sb, result);
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}
