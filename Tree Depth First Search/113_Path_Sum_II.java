class Solution {
    public List<List<Integer>> pathSum(TreeNode root, int sum) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        traverseTree(root, sum, new ArrayList<>(), result);
        return result;
    }

    private void traverseTree(TreeNode root, int sum, List<Integer> temp, List<List<Integer>> result) {
        temp.add(root.val);

        if (root.left == null && root.right == null && sum == root.val) {
            result.add(new ArrayList<>(temp));
        }

        if (root.left != null) {
            traverseTree(root.left, sum - root.val, temp, result);
        }

        if (root.right != null) {
            traverseTree(root.right, sum - root.val, temp, result);
        }

        temp.remove(temp.size() - 1);
    }
}
