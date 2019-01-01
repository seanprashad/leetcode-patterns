import java.util.*;

public class RecursivePostOrderTraversal {
    ArrayList<Integer> nodes = new ArrayList<Integer>();

    public List<Integer> postorderTraversal(TreeNode root) {
        if (root == null) {
            return nodes;
        }

        if (root.left != null) {
            postorderTraversal(root.left);
        }
        if (root.right != null) {
            postorderTraversal(root.right);
        }

        nodes.add(root.data);

        return nodes;
    }
}