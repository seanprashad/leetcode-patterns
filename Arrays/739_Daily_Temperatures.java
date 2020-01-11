class Solution {
    public int[] dailyTemperatures(int[] T) {
        Stack<Integer> stk = new Stack<>();
        int[] result = new int[T.length];

        for (int i = 0; i < T.length; i++) {
            while (!stk.isEmpty() && T[i] > T[stk.peek()]) {
                int idx = stk.pop();
                result[idx] = i - idx;
            }

            stk.push(i);
        }

        return result;
    }
}
