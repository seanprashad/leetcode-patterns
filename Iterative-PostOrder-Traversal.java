import java.util.*;

/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
class Solution {
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
                nodes.add(0, t.val);
                t = t.right;
            } else {
                t = s.pop();
                t = t.left;
            }
        }

        return nodes;
    }
}