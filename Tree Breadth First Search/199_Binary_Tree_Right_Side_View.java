class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> result = new ArrayList<>();

        if (root == null) {
            return result;
        }

        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);

        while (!q.isEmpty()) {
            int level = q.size();

            for (int i = 0; i < level; i++) {
                TreeNode t = q.poll();

                if (i + 1 == level) {
                    result.add(t.val);
                }

                if (t.left != null) {
                    q.offer(t.left);
                }
                if (t.right != null) {
                    q.offer(t.right);
                }
            }
        }

        return result;
    }
}
