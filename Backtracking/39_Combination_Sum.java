class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        if (candidates == null || candidates.length == 0) {
            return Collections.emptyList();
        }

        List<List<Integer>> result = new ArrayList<>();
        dfs(candidates, target, 0, new ArrayList<>(), result);
        return result;
    }

    private void dfs(int[] candidates, int target, int idx, List<Integer> tempResult, List<List<Integer>> result) {
        if (target < 0) {
            return;
        }
        if (target == 0) {
            result.add(new ArrayList<>(tempResult));
            return;
        }

        for (int i = idx; i < candidates.length; i++) {
            tempResult.add(candidates[i]);
            dfs(candidates, target - candidates[i], i, tempResult, result);
            tempResult.remove(tempResult.size() - 1);
        }
    }
}
