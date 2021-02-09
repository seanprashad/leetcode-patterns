class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        return helper(preorder, inorder, 0, preorder.length - 1, 0, inorder.length - 1);
    }

    private TreeNode helper(int[] preorder, int[] inorder, int preStart, int preEnd, int inStart, int inEnd) {
        if (preStart > preEnd || inStart > inEnd) {
            return null;
        }

        int rootIdx = 0;

        for (int i = inStart; i <= inEnd; i++) {
            if (preorder[preStart] == inorder[i]) {
                rootIdx = i;
            }
        }

        TreeNode t = new TreeNode(preorder[preStart]);

        int leftSubtreeSize = rootIdx - inStart;

        t.left = helper(preorder, inorder, preStart + 1, preStart + leftSubtreeSize, inStart, rootIdx - 1);
        t.right = helper(preorder, inorder, preStart + leftSubtreeSize + 1, preEnd, rootIdx + 1, inEnd);

        return t;
    }
}
