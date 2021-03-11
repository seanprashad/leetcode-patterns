class Solution {
    public int[] nextGreaterElements(int[] nums) {
        if (nums == null || nums.length == 0) {
            return new int[] {};
        }

        Stack<Integer> s = new Stack<>();
        int n = nums.length;
        int[] result = new int[n];

        for (int i = n - 1; i >= 0; i--) {
            s.push(i);
        }

        for (int i = n - 1; i >= 0; i--) {
            result[i] = -1;

            while (!s.isEmpty() && nums[i] >= nums[s.peek()]) {
                s.pop();
            }

            if (!s.isEmpty()) {
                result[i] = nums[s.peek()];
            }

            s.push(i);
        }

        return result;
    }
}
