import java.util.Stack;

public class Practice_Iterative_PreOrderTraversal {
    public static void preOrderTraversal(TreeNode root) {
        if (root == null) {
            return;
        }

        Stack<TreeNode> st = new Stack<TreeNode>();
        st.push(root);

        while (!st.isEmpty()) {
            TreeNode curr = st.pop();
            System.out.println(curr.data);

            // Push the right child before the left, in order to use the
            // reverse ordering of the stack to always print the left
            // child first, than the right. This will push 50, 70, 30
            // and keep 70 at the very bottom of the stack until the entire
            // left subtree of the root has been traversed.
            if (curr.right != null) {
                st.push(curr.right);
            }

            if (curr.left != null) {
                st.push(curr.left);
            }
        }
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
