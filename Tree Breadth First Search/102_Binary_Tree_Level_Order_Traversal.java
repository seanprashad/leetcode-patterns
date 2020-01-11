class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();

        if (root == null) {
            return result;
        }

        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);

        while (!q.isEmpty()) {
            List<Integer> tempList = new ArrayList<>();
            int levelSize = q.size();

            for (int i = 0; i < levelSize; i++) {
                TreeNode t = q.poll();

                tempList.add(t.val);
                if (t.left != null) {
                    q.offer(t.left);
                }
                if (t.right != null) {
                    q.offer(t.right);
                }
            }

            result.add(new ArrayList<Integer>(tempList));
        }

        return result;
    }
}
