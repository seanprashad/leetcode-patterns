import java.util.*;

/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
public class IterativeInOrderTraversal {
    public List<Integer> inorderTraversal(TreeNode root) {
        ArrayList<Integer> nodes = new ArrayList<Integer>();
        Stack<TreeNode> s = new Stack<TreeNode>();
        TreeNode t = root;

        if (root == null) {
            return nodes;
        }

        while (t != null || !s.isEmpty()) {
            while (t != null) {
                System.out.println(t.val);
                s.push(t);
                t = t.left;
            }

            t = s.pop();
            nodes.add(t.val);
            t = t.right;
        }

        return nodes;
    }
}