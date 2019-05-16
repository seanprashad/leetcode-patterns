import java.util.Stack;

public class Practice_Iterative_InOrderTraversal {
    public static void inOrderTraversal(TreeNode root) {
        if (root == null) {
            return;
        }

        Stack<TreeNode> st = new Stack<TreeNode>();
        TreeNode curr = root;

        while (curr != null || !st.isEmpty()) {
            // Traverse to the left most TreeNode of the
            // current Node, according to inOrder traversals
            while (curr != null) {
                st.push(curr);
                curr = curr.left;
            }

            // When we reach the left most TreeNode,
            // pop and print its value then begin
            // going back up to its parent node
            // in order to traverse the right subtree
            curr = st.pop();
            System.out.println(curr.data);
            curr = curr.right;
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

        inOrderTraversal(root);

        return;
    }
}
