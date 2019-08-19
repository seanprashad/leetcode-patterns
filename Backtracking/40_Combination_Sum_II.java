class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        if (candidates == null || candidates.length == 0) {
            return Collections.emptyList();
        }

        Arrays.sort(candidates);

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
            if (i > idx && candidates[i] == candidates[i - 1]) {
                continue;
            }
            tempResult.add(candidates[i]);
            dfs(candidates, target - candidates[i], i + 1, tempResult, result);
            tempResult.remove(tempResult.size() - 1);
        }
    }
}
