class Solution {
    public List<List<Integer>> verticalOrder(TreeNode root) {
        if (root == null) {
            return Collections.emptyList();
        }

        List<List<Integer>> result = new ArrayList<>();
        Map<Integer, List<Integer>> map = new HashMap<>();
        Queue<TreeNode> q = new LinkedList<>();
        Queue<Integer> cols = new LinkedList<>();

        q.offer(root);
        cols.offer(0);

        int min = 0, max = 0;

        while (!q.isEmpty()) {
            TreeNode curr = q.poll();
            int colNum = cols.poll();

            if (!map.containsKey(colNum)) {
                map.put(colNum, new ArrayList<>());
            }

            map.get(colNum).add(curr.val);

            if (curr.left != null) {
                q.offer(curr.left);
                cols.offer(colNum - 1);
                min = Math.min(min, colNum - 1);
            }

            if (curr.right != null) {
                q.offer(curr.right);
                cols.offer(colNum + 1);
                max = Math.max(max, colNum + 1);
            }
        }

        for (int i = min; i <= max; i++) {
            result.add(map.get(i));
        }

        return result;
    }
}
