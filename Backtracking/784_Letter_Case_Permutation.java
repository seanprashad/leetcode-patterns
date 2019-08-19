class Solution {
    public List<String> letterCasePermutation(String S) {
        if (S == null || S.length() == 0) {
            return Collections.emptyList();
        }

        List<String> result = new ArrayList<>();
        dfs(S.toCharArray(), 0, result);
        return result;
    }

    private void dfs(char[] word, int idx, List<String> result) {
        if (idx == word.length) {
            result.add(new String(word));
            return;
        }

        if (Character.isDigit(word[idx])) {
            dfs(word, idx + 1, result);
            return;
        }

        word[idx] = Character.toLowerCase(word[idx]);
        dfs(word, idx + 1, result);

        word[idx] = Character.toUpperCase(word[idx]);
        dfs(word, idx + 1, result);
    }
}
