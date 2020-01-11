class Solution {
    public int sumNumbers(TreeNode root) {
        if (root == null) {
            return 0;
        }
        return dfs(root, 0);
    }

    private int dfs(TreeNode root, int levelBase) {
        if (root == null) {
            return 0;
        }

        if (root.left == null && root.right == null) {
            return levelBase + root.val;
        }

        int nextLevelBase = 10 * (levelBase + root.val);
        int left = dfs(root.left, nextLevelBase);
        int right = dfs(root.right, nextLevelBase);

        return left + right;
    }
}
