class Solution {
    private class TreeNode {
        private int value;
        private int count;
        private TreeNode left, right;

        public TreeNode(int v) {
            count = 1;
            value = v;
        }
    }

    public List<Integer> countSmaller(int[] nums) {
        if (nums == null || nums.length == 0) {
            return Collections.emptyList();
        }

        List<Integer> result = new ArrayList<>();
        TreeNode root = new TreeNode(nums[nums.length - 1]);
        result.add(0);

        for (int i = nums.length - 2; i >= 0; i--) {
            int count = insertNode(root, nums[i]);
            result.add(count);
        }

        Collections.reverse(result);
        return result;
    }

    private int insertNode(TreeNode root, int value) {
        int nodeCount = 0;

        while (true) {
            if (value <= root.value) {
                ++root.count;

                if (root.left == null) {
                    root.left = new TreeNode(value);
                    break;
                } else {
                    root = root.left;
                }
            } else {
                nodeCount += root.count;

                if (root.right == null) {
                    root.right = new TreeNode(value);
                    break;
                } else {
                    root = root.right;
                }
            }
        }

        return nodeCount;
    }
}
