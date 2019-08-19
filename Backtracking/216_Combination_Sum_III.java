class Solution {
    public List<List<Integer>> combinationSum3(int k, int n) {
        List<List<Integer>> result = new ArrayList<>();
        dfs(k, n, 1, new ArrayList<>(), result);
        return result;
    }

    private void dfs(int k, int n, int idx, List<Integer> tempResult, List<List<Integer>> result) {
        if (tempResult.size() == k && n == 0) {
            result.add(new ArrayList<>(tempResult));
            return;
        }

        for (int i = idx; i <= 9; i++) {
            tempResult.add(i);
            dfs(k, n - i, i + 1, tempResult, result);
            tempResult.remove(tempResult.size() - 1);
        }
    }
}
