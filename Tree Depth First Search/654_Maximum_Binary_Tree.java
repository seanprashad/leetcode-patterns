class Solution {
    public TreeNode constructMaximumBinaryTree(int[] nums) {
        return createTree(nums, 0, nums.length - 1);
    }

    private TreeNode createTree(int[] nums, int start, int end) {
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
        t.left = createTree(nums, start, maxIdx - 1);
        t.right = createTree(nums, maxIdx + 1, end);

        return t;
    }
}
