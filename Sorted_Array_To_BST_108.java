import java.util.List;

public class Sorted_Array_To_BST_108 {
    public static TreeNode sortedArrayToBST(int[] nums) {
        if (nums == null || nums.length == 0) {
            return null;
        }

        return createBST(nums, 0, nums.length - 1);
    }

    private static TreeNode createBST(int[] nums, int start, int end) {
        if (start > end) {
            return null;
        }

        int mid = start + (end - start) / 2;
        TreeNode t = new TreeNode(nums[mid]);
        t.left = createBST(nums, start, mid - 1);
        t.right = createBST(nums, mid + 1, end);

        return t;
    }

    public static void main(String[] args) {
        int[] nums = new int[] { -10, -3, 0, 5, 9 };
        TreeNode root = sortedArrayToBST(nums);

        List<List<Integer>> l = Practice_Iterative_LevelOrderTraversal_ListFormat.levelOrderTraversalListFormat(root);

        for (List<Integer> li : l) {
            for (Integer i : li) {
                System.out.print(i + ",");
            }
            System.out.println();
        }

        return;
    }
}
