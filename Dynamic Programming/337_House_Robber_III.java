class Solution {
    public int rob(TreeNode root) {
        return helper(root, new HashMap<TreeNode, Integer>());
    }

    private int helper(TreeNode root, Map<TreeNode, Integer> m) {
        if (root == null) {
            return 0;
        }
        if (m.containsKey(root)) {
            return m.get(root);
        }

        int result = 0;

        if (root.left != null) {
            result += helper(root.left.left, m) + helper(root.left.right, m);
        }

        if (root.right != null) {
            result += helper(root.right.left, m) + helper(root.right.right, m);
        }

        result = Math.max(result + root.val, helper(root.left, m) + helper(root.right, m));
        m.put(root, result);
        return result;
    }
}
