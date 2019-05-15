public class Practice_Recursive_PreOrderTraversal {
    public static void preOrderTraversal(TreeNode root) {
        if (root == null) {
            return;
        }

        System.out.println(root.data);
        preOrderTraversal(root.left);
        preOrderTraversal(root.right);
    }

    public static void main(String[] args) {
        /* Let us create following BST
              50
           /     \
          30      70
         /  \    /  \
       20   40  60   80 */

        TreeNode root = new TreeNode(50);
        TreeNode n1 = new TreeNode(30);
        TreeNode n2 = new TreeNode(70);
        TreeNode n3 = new TreeNode(20);
        TreeNode n4 = new TreeNode(40);
        TreeNode n5 = new TreeNode(60);
        TreeNode n6 = new TreeNode(80);

        root.left = n1;
        root.right = n2;
        n1.left = n3;
        n1.right = n4;
        n2.left = n5;
        n2.right = n6;

        preOrderTraversal(root);

        return;
    }
}
