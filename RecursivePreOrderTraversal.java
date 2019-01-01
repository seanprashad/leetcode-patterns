import java.util.*;

public class RecursivePreOrderTraversal {
    ArrayList<Integer> nodes = new ArrayList<Integer>();

    public List<Integer> preorderTraversal(TreeNode root) {
        if (root == null) {
            return nodes;
        }

        nodes.add(root.data);

        if (root.left != null) {
            preorderTraversal(root.left);
        }
        if (root.right != null) {
            preorderTraversal(root.right);
        }

        return nodes;
    }
}