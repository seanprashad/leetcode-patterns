class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        if (nums == null || nums.length == 0) {
            return null;
        }
        return createBST(nums, 0, nums.length - 1);
    }

    private TreeNode createBST(int[] nums, int start, int end) {
        if (start > end) {
            return null;
        }

        int mid = start + (end - start) / 2;

        TreeNode t = new TreeNode(nums[mid]);
        t.left = createBST(nums, start, mid - 1);
        t.right = createBST(nums, mid + 1, end);

        return t;
    }
}
