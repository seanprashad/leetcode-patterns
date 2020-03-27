class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        return helper(preorder, inorder, 0, preorder.length - 1, 0, inorder.length - 1);
    }

    private TreeNode helper(int[] preorder, int[] inorder, int preStart, int preEnd, int inStart, int inEnd) {
        if (preStart > preEnd || inStart > inEnd) {
            return null;
        }

        TreeNode root = new TreeNode(preorder[preStart]);
        int rootIdx = 0;

        for (int i = inStart; i <= inEnd; i++) {
            if (inorder[i] == root.val) {
                rootIdx = i;
                break;
            }
        }

        root.left = helper(preorder, inorder, preStart + 1, preEnd, inStart, rootIdx - 1);
        root.right = helper(preorder, inorder, preStart + rootIdx - inStart + 1, preEnd, rootIdx + 1, inEnd);

        return root;
    }
}
