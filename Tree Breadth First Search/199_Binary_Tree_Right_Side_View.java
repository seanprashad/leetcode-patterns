class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        dfs(root, res, 0);
        return res;
    }

    private void dfs(TreeNode root, List<Integer> res, int level) {
        if (root == null) {
            return;
        }

        if (level == res.size()) {
            res.add(root.val);
        }

        dfs(root.right, res, level + 1);
        dfs(root.left, res, level + 1);
    }
}
