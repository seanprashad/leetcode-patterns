class Solution {
    public int diameterOfBinaryTree(TreeNode root) {
        if (root == null) {
            return 0;
        }

        int[] longestDiameter = new int[1];
        calculateDepth(root, longestDiameter);
        return longestDiameter[0];
    }

    private int calculateDepth(TreeNode root, int[] longestDiameter) {
        if (root == null) {
            return 0;
        }

        int leftHeight = calculateDepth(root.left, longestDiameter);
        int rightHeight = calculateDepth(root.right, longestDiameter);

        longestDiameter[0] = Math.max(longestDiameter[0], leftHeight + rightHeight);

        return Math.max(leftHeight, rightHeight) + 1;
    }
}
