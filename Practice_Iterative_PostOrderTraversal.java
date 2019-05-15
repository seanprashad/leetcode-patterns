import java.util.Stack;

public class Practice_Iterative_PostOrderTraversal {
    public static void postOrderTraversal(TreeNode root) {
        if (root == null) {
            return;
        }

        Stack<TreeNode> st1 = new Stack<TreeNode>();
        Stack<Integer> st2 = new Stack<Integer>();

        st1.push(root);

        while (!st1.isEmpty()) {
            TreeNode curr = st1.pop();
            st2.push(curr.data);

            if (curr.left != null) {
                st1.push(curr.left);
            }

            if (curr.right != null) {
                st1.push(curr.right);
            }
        }

        while (!st2.isEmpty()) {
            System.out.println(st2.pop());
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

        postOrderTraversal(root);

        return;
    }
}
