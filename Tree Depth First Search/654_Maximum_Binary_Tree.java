class Solution {
    public TreeNode constructMaximumBinaryTree(int[] nums) {
        if (nums == null || nums.length == 0) {
            return null;
        }
        return helper(nums, 0, nums.length - 1);
    }

    private TreeNode helper(int[] nums, int start, int end) {
        if (start > end) {
            return null;
        }

        int maxIdx = start;

        for (int i = start; i <= end; i++) {
            if (nums[i] > nums[maxIdx]) {
                maxIdx = i;
            }
        }

        TreeNode t = new TreeNode(nums[maxIdx]);

        t.left = helper(nums, start, maxIdx - 1);
        t.right = helper(nums, maxIdx + 1, end);

        return t;
    }
}
