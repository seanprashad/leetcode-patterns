class Solution {
    public List<List<String>> partition(String s) {
        if (s == null || s.length() == 0) {
            return Collections.emptyList();
        }

        List<List<String>> result = new ArrayList<>();
        dfs(0, s, new ArrayList<>(), result);
        return result;
    }

    private void dfs(int idx, String s, List<String> tempResult, List<List<String>> result) {
        if (idx == s.length()) {
            result.add(new ArrayList<>(tempResult));
            return;
        }

        for (int i = idx; i < s.length(); i++) {
            if (isPalindrome(s, idx, i)) {
                tempResult.add(s.substring(idx, i + 1));
                dfs(i + 1, s, tempResult, result);
                tempResult.remove(tempResult.size() - 1);
            }
        }
    }

    private boolean isPalindrome(String s, int start, int end) {
        while (start < end) {
            if (s.charAt(start++) != s.charAt(end--)) {
                return false;
            }
        }

        return true;
    }
}
