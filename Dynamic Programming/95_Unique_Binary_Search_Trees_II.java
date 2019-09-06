class Solution {
    public List<TreeNode> generateTrees(int n) {
        if (n <= 0) {
            return Collections.emptyList();
        }

        return helper(1, n);
    }

    private List<TreeNode> helper(int start, int end) {
        List<TreeNode> l = new ArrayList<>();

        if (start > end) {
            l.add(null);
            return l;
        }

        for (int i = start; i <= end; i++) {
            List<TreeNode> leftList = helper(start, i - 1);
            List<TreeNode> rightList = helper(i + 1, end);

            for (TreeNode left : leftList) {
                for (TreeNode right : rightList) {
                    TreeNode t = new TreeNode(i);
                    t.left = left;
                    t.right = right;
                    l.add(t);
                }
            }
        }

        return l;
    }
}
