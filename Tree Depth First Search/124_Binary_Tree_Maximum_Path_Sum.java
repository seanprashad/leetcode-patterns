class Solution {
    int max = Integer.MIN_VALUE;

    public int maxPathSum(TreeNode root) {
        helper(root);
        return max;
    }

    private int helper(TreeNode root) {
        if (root == null) {
            return 0;
        }

        int left = Math.max(0, helper(root.left));
        int right = Math.max(0, helper(root.right));

        if (left < 0) {
            max = Math.max(max, root.val + right);
        } else if (right < 0) {
            max = Math.max(max, root.val + left);
        } else {
            max = Math.max(max, root.val + left + right);
        }

        return Math.max(root.val, Math.max(root.val + left, root.val + right));
    }
}