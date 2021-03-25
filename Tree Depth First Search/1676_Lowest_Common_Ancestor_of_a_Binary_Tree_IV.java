class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode[] nodes) {
        Set<TreeNode> s = new HashSet<>();

        for (TreeNode n : nodes) {
            s.add(n);
        }

        return helper(root, s);
    }

    private TreeNode helper(TreeNode root, Set<TreeNode> s) {
        if (root == null) {
            return null;
        }

        if (s.contains(root)) {
            return root;
        }

        TreeNode left = helper(root.left, s);
        TreeNode right = helper(root.right, s);

        if (left == null) {
            return right;
        }
        if (right == null) {
            return left;
        }

        return root;
    }
}
