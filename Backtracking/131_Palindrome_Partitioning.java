class Solution {
    public List<List<String>> partition(String s) {
        if (s == null || s.length() == 0) {
            return Collections.emptyList();
        }

        List<List<String>> result = new ArrayList<>();
        helper(s, 0, result, new ArrayList<>());

        return result;
    }

    private void helper(String s, int idx, List<List<String>> result, List<String> temp) {
        if (idx == s.length()) {
            result.add(new ArrayList<>(temp));
            return;
        }

        for (int i = idx; i < s.length(); i++) {
            if (isPalindrome(s, idx, i)) {
                temp.add(s.substring(idx, i + 1));
                helper(s, i + 1, result, temp);
                temp.remove(temp.size() - 1);
            }
        }
    }

    private boolean isPalindrome(String s, int left, int right) {
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }

            ++left;
            --right;
        }

        return true;
    }
}
