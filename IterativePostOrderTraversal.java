import java.util.*;

public class IterativePostOrderTraversal {
    public List<Integer> postorderTraversal(TreeNode root) {
        ArrayList<Integer> nodes = new ArrayList<Integer>();
        Stack<TreeNode> s = new Stack<TreeNode>();
        TreeNode t = root;

        if (root == null) {
            return nodes;
        }

        while (t != null || !s.isEmpty()) {
            if (t != null) {
                s.push(t);
                nodes.add(0, t.data);
                t = t.right;
            } else {
                t = s.pop();
                t = t.left;
            }
        }

        return nodes;
    }
}