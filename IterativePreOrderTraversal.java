import java.util.*;

public class IterativePreOrderTraversal {
    public List<Integer> preorderTraversal(TreeNode root) {
        ArrayList<Integer> nodes = new ArrayList<Integer>();
        Stack<TreeNode> q = new Stack<TreeNode>();

        if (root == null) {
            return nodes;
        }

        q.push(root);

        while (!q.isEmpty()) {
            TreeNode t = q.pop();

            nodes.add(t.data);

            if (t.right != null) {
                q.push(t.right);
            }
            if (t.left != null) {
                q.push(t.left);
            }
        }

        return nodes;
    }
}