class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        if (s == null || s.length() == 0) {
            return false;
        }
        return helper(s, new HashSet<>(wordDict), new HashMap<>());
    }

    private boolean helper(String s, Set<String> wordDict, Map<String, Boolean> memo) {
        if (s.length() == 0) {
            return true;
        }

        if (memo.containsKey(s)) {
            return memo.get(s);
        }

        for (int i = 0; i <= s.length(); i++) {
            String prefix = s.substring(0, i);
            String remainder = s.substring(i, s.length());

            if (wordDict.contains(prefix) && helper(remainder, wordDict, memo)) {
                memo.put(s, true);
                return memo.get(s);
            }
        }

        memo.put(s, false);
        return memo.get(s);
    }
}
