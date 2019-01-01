/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
public class PathSum {
    public boolean hasPathSum(TreeNode root, int sum) {
        if (root == null) {
            return false;
        }

        // If we're at a leaf node and the node's value give us a remaider of 0, aka
        // we have found a path that adds up!
        if (root.left == null && root.right == null && sum - root.val == 0) {
            return true;
        }

        // Check the descendents, subtracting the values we've found so far from the
        // total to find
        return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);
    }
}
