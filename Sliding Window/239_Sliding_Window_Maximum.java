class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0) {
            return new int[0];
        }

        int[] result = new int[nums.length - k + 1];
        Deque<Integer> dq = new LinkedList<>();

        for (int idx = 0; idx < nums.length; idx++) {
            if (!dq.isEmpty() && dq.peek() < idx - k + 1) {
                dq.pollFirst();
            }

            while (!dq.isEmpty() && nums[idx] >= nums[dq.peekLast()]) {
                dq.pollLast();
            }

            dq.offer(idx);

            if (idx - k + 1 >= 0) {
                result[idx - k + 1] = nums[dq.peekFirst()];
            }
        }

        return result;
    }
}
