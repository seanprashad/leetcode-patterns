class Solution {
    public List<String> wordBreak(String s, List<String> wordDict) {
        return backtrack(s, wordDict, new HashMap<String, List<String>>());
    }

    private List<String> backtrack(String s, List<String> wordDict, Map<String, List<String>> memo) {
        if (memo.containsKey(s)) {
            return memo.get(s);
        }

        List<String> result = new ArrayList<>();

        for (String word : wordDict) {
            if (s.startsWith(word)) {
                String remainder = s.substring(word.length());

                if (remainder.length() == 0) {
                    result.add(word);
                } else {
                    for (String substring : backtrack(remainder, wordDict, memo)) {
                        result.add(word + " " + substring);
                    }
                }
            }
        }

        memo.put(s, result);
        return result;
    }
}
