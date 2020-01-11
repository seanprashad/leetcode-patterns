class Solution {
    public TreeNode searchBST(TreeNode root, int val) {
        if (root == null) {
            return null;
        }

        TreeNode curr = root;

        while (curr != null) {
            if (curr.val == val) {
                return curr;
            } else if (curr.val > val) {
                curr = curr.left;
            } else {
                curr = curr.right;
            }
        }

        return null;
    }
}
