class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        if (preorder == null || inorder == null || preorder.length != inorder.length) {
            return null;
        }

        return buildTreeHelper(preorder, inorder, 0, 0, inorder.length - 1);
    }

    private TreeNode buildTreeHelper(int[] preorder, int[] inorder, int preStart, int inStart, int inEnd) {
        if (preStart > preorder.length - 1 || inStart > inEnd) {
            return null;
        }

        TreeNode root = new TreeNode(preorder[preStart]);

        int inOrderIdx = preStart;
        for (int i = 0; i < inorder.length; i++) {
            if (root.val == inorder[i]) {
                inOrderIdx = i;
                break;
            }
        }

        int leftTreeLength = inOrderIdx - inStart;

        root.left = buildTreeHelper(preorder, inorder, preStart + 1, inStart, inOrderIdx - 1);
        root.right = buildTreeHelper(preorder, inorder, preStart + leftTreeLength + 1, inOrderIdx + 1, inEnd);
    }
}
