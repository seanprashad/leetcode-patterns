import java.util.List;
import java.util.Queue;
import java.util.ArrayList;
import java.util.LinkedList;

public class Practice_Iterative_LevelOrderTraversal_ListFormat {
    public static List<List<Integer>> levelOrderTraversalListFormat(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<TreeNode>();

        if (root == null) { return result; }
        q.add(root);

        while (!q.isEmpty()) {
            ArrayList<Integer> temp = new ArrayList<Integer>();
            int queueSize = q.size();

            for (int i = 0; i < queueSize; i++) {
                TreeNode curr = q.poll();
                temp.add(curr.data);
                
                if (curr.left != null) {
                    q.add(curr.left);
                }
                if (curr.right != null) {
                    q.add(curr.right);
                }
            }

            result.add(temp);
        }

        return result;
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

        List<List<Integer>> l = levelOrderTraversalListFormat(root);

        for (List<Integer> li : l) {
            for (Integer i : li) {
                System.out.print(i + ",");
            }
            System.out.println();
        }

        return;
    }
}
