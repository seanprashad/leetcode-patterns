public class Balanced_Binary_Tree_126 {
    public static boolean isBalanced(TreeNode root) {
        if (root == null) {
            return true;
        }

        return getHeight(root) != -1;
    }

    private static int getHeight(TreeNode root) {
        if (root == null) {
            return 0;
        }

        int leftHeight = getHeight(root.left);
        int rightHeight = getHeight(root.right);

        if (leftHeight < 0 || rightHeight < 0 || Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        }

        return Math.max(leftHeight, rightHeight) + 1;
    }

    public static void main(String[] args) {
        TreeNode rootOne = new TreeNode(1);
        TreeNode t1l1 = new TreeNode(2);
        TreeNode t1r1 = new TreeNode(2);
        TreeNode t1l2 = new TreeNode(3);
        TreeNode t1r2 = new TreeNode(3);
        TreeNode t1l3 = new TreeNode(4);
        TreeNode t1r3 = new TreeNode(4);

        rootOne.left = t1l1;
        rootOne.right = t1r1;
        t1l1.left = t1l2;
        t1l1.right = t1r2;
        t1r2.left = t1l3;
        t1r2.right = t1r3;

        TreeNode rootTwo = new TreeNode(3);
        TreeNode t2l1 = new TreeNode(9);
        TreeNode t2r1 = new TreeNode(20);
        TreeNode t2l2 = new TreeNode(15);
        TreeNode t2r2 = new TreeNode(7);

        rootTwo.left = t2l1;
        rootTwo.right = t2r1;
        t2l1.left = t2l2;
        t2l1.right = t2r2;

        System.out.println(isBalanced(rootOne));
        System.out.println(isBalanced(rootTwo));

        return;
    }
}
