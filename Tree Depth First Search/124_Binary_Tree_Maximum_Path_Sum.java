class Solution {
    public int maxPathSum(TreeNode root) {
        if (root == null) {
            return 0;
        }

        int[] result = new int[] { root.val };
        maxPathHelper(root, result);
        return result[0];
    }

    private int maxPathHelper(TreeNode root, int[] result) {
        if (root == null) {
            return 0;
        }

        int left = Math.max(0, maxPathHelper(root.left, result));
        int right = Math.max(0, maxPathHelper(root.right, result));

        int currMax = root.val + left + right;
        result[0] = Math.max(result[0], currMax);

        return root.val + Math.max(left, right);
    }
}
