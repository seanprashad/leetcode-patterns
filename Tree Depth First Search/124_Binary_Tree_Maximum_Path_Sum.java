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

        int leftSum = Math.max(0, helper(root.left));
        int rightSum = Math.max(0, helper(root.right));

        max = Math.max(max, root.val + leftSum + rightSum);

        return Math.max(root.val, root.val + Math.max(leftSum, rightSum));
    }
}
