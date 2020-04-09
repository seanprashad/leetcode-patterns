class Solution {
    public int pathSum(TreeNode root, int sum) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);

        return helper(root, sum, 0, map);
    }

    private int helper(TreeNode root, int target, int currSum, Map<Integer, Integer> map) {
        if (root == null) {
            return 0;
        }

        currSum += root.val;

        int result = 0;
        if (map.containsKey(currSum - target)) {
            result += map.get(currSum - target);
        }

        map.put(currSum, map.getOrDefault(currSum, 0) + 1);
        result += helper(root.left, target, currSum, map) + helper(root.right, target, currSum, map);
        map.put(currSum, map.getOrDefault(currSum, 0) - 1);

        return result;
    }
}
