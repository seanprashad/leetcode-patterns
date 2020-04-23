class Solution {
    public List<String> wordBreak(String s, List<String> wordDict) {
        Set<String> dict = new HashSet<>(wordDict);
        Map<String, List<String>> memo = new HashMap<>();

        return helper(s, dict, memo);
    }

    private List<String> helper(String s, Set<String> dict, Map<String, List<String>> memo) {
        if (memo.containsKey(s)) {
            return memo.get(s);
        }

        List<String> result = new ArrayList<>();
        if (dict.contains(s)) {
            result.add(s);
        }

        for (int i = 1; i < s.length(); i++) {
            String word = s.substring(0, i);

            if (dict.contains(word)) {
                List<String> tmp = helper(s.substring(i), dict, memo);

                for (String remainder : tmp) {
                    result.add(word + " " + remainder);
                }
            }
        }

        memo.put(s, result);
        return result;
    }
}
