class Solution {
    public int kthSmallest(TreeNode root, int k) {
        Stack<TreeNode> stack = new Stack<>();
        int result = 0;

        while (root != null || !stack.isEmpty()) {
            while (root != null) {
                stack.push(root);
                root = root.left;
            }

            root = stack.pop();

            if (--k == 0) {
                result = root.val;
                break;
            }

            root = root.right;
        }

        return result;
    }
}
