class BSTIterator {
    private Stack<TreeNode> s;

    public BSTIterator(TreeNode root) {
        s = new Stack<>();
        pushAllLeftNodes(root);
    }

    /** @return the next smallest number */
    public int next() {
        TreeNode top = s.pop();
        pushAllLeftNodes(top.right);
        return top.val;
    }

    /** @return whether we have a next smallest number */
    public boolean hasNext() {
        return !s.isEmpty();
    }

    private void pushAllLeftNodes(TreeNode root) {
        while (root != null) {
            s.push(root);
            root = root.left;
        }
    }
}
