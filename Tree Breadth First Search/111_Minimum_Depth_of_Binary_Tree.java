class Solution {
    public int minDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }

        Queue<TreeNode> q = new LinkedList<>();
        int depth = 0;
        q.offer(root);

        while (!q.isEmpty()) {
            int level = q.size();

            ++depth;

            for (int i = 0; i < level; i++) {
                TreeNode t = q.poll();
                if (t.left == null && t.right == null) {
                    return depth;
                }

                if (t.left != null) {
                    q.offer(t.left);
                }
                if (t.right != null) {
                    q.offer(t.right);
                }
            }
        }

        return 0;
    }
}
