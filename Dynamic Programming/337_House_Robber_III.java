sclass Solution {
    public int rob(TreeNode root) {
        Map<TreeNode, Integer> memo = new HashMap<>();
        return robHelper(root, memo);
    }

    private int robHelper(TreeNode root, Map<TreeNode, Integer> memo) {
        if (root == null) {
            return 0;
        }
        if (memo.containsKey(root)) {
            return memo.get(root);
        }

        int sum = 0;

        if (root.left != null) {
            sum += robHelper(root.left.left, memo) + robHelper(root.left.right, memo);
        }

        if (root.right != null) {
            sum += robHelper(root.right.left, memo) + robHelper(root.right.right, memo);
        }

        sum = Math.max(sum + root.val, robHelper(root.left, memo) + robHelper(root.right, memo));

        memo.put(root, sum);
        return sum;
    }
}
