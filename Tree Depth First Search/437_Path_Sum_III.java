class Solution {
    public int pathSum(TreeNode root, int sum) {
        if (root == null) {
            return 0;
        }

        return traverseSubtree(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum);
    }

    private int traverseSubtree(TreeNode root, int sum) {
        int result = 0;
        if (root == null) {
            return result;
        }

        if (root.val == sum) {
            ++result;
        }

        return result + traverseSubtree(root.left, sum - root.val) + traverseSubtree(root.right, sum - root.val);
    }
}
