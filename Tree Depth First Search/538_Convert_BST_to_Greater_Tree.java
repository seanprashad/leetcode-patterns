class Solution {
    public TreeNode convertBST(TreeNode root) {
        dfs(root, 0);
        return root;
    }

    private int dfs(TreeNode root, int value) {
        if (root == null) {
            return value;
        }

        int right = dfs(root.right, value);
        root.val += right;
        int left = dfs(root.left, root.val);
        return left;
    }
}
