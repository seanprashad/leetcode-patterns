class Solution {
    public List<List<Integer>> combinationSum3(int k, int n) {
        List<List<Integer>> result = new ArrayList<>();
        helper(n, k, 1, new ArrayList<>(), result);
        return result;
    }

    private void helper(int n, int numsAllowed, int start, List<Integer> temp, List<List<Integer>> result) {
        if (numsAllowed == 0 && n == 0) {
            result.add(new ArrayList<>(temp));
            return;
        }

        for (int i = start; i <= 9; i++) {
            temp.add(i);
            helper(n - i, numsAllowed - 1, i + 1, temp, result);
            temp.remove(temp.size() - 1);
        }
    }
}
