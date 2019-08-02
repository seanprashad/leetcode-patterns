class Solution {
    public int widthOfBinaryTree(TreeNode root) {
        if (root == null) {
            return 0;
        }

        Map<TreeNode, Integer> hm = new HashMap<>();
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        hm.put(root, 1);

        int maxWidth = Integer.MIN_VALUE;

        while (!q.isEmpty()) {
            int start = 0, end = 0;
            int size = q.size();

            for (int i = 0; i < size; i++) {
                TreeNode t = q.poll();

                if (i == 0) {
                    start = hm.get(t);
                }
                if (i == size - 1) {
                    end = hm.get(t);
                }

                if (t.left != null) {
                    q.offer(t.left);
                    hm.put(t.left, hm.get(t) * 2);
                }

                if (t.right != null) {
                    q.offer(t.right);
                    hm.put(t.right, hm.get(t) * 2 + 1);
                }
            }

            maxWidth = Math.max(maxWidth, end - start + 1);
        }

        return maxWidth;
    }
}
