public class Symmetric_Tree_101 {
    public static boolean isSymmetric(TreeNode root) {
        if (root == null) {
            return true;
        }
        return isSymmetricHelper(root.left, root.right);
    }

    private static boolean isSymmetricHelper(TreeNode p, TreeNode q) {
        if (p == null && q == null) {
            return true;
        }
        if (p == null || q == null) {
            return false;
        }

        if (p.data != q.data) {
            return false;
        }

        return isSymmetricHelper(p.left, q.right) && isSymmetricHelper(p.right, q.left);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        TreeNode n1 = new TreeNode(2);
        TreeNode n2 = new TreeNode(2);
        TreeNode n3 = new TreeNode(3);
        TreeNode n4 = new TreeNode(4);
        TreeNode n5 = new TreeNode(4);
        TreeNode n6 = new TreeNode(3);

        root.left = n1;
        root.right = n2;
        n1.left = n3;
        n1.right = n4;
        n2.left = n5;
        n2.right = n6;

        System.out.println(isSymmetric(root));

        return;
    }
}
