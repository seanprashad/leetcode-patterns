class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        dfs(root, 0, result);
        return result;
    }

    private void dfs(TreeNode root, int currLevel, List<Integer> result) {
        if (root == null) {
            return;
        }

        if (result.size() == currLevel) {
            result.add(root.val);
        }

        dfs(root.right, currLevel + 1, result);
        dfs(root.left, currLevel + 1, result);
    }
}
