class Solution {
    public int trap(int[] height) {
        if (height == null || height.length == 0) {
            return 0;
        }

        int result = 0;
        Stack<Integer> st = new Stack<>();

        for (int i = 0; i < height.length; i++) {
            while (!st.isEmpty() && height[i] > height[st.peek()]) {
                int idx = st.pop();

                if (!st.isEmpty()) {
                    int leftPillar = st.peek();
                    int minHeight = Math.min(height[leftPillar], height[i]);

                    result += (minHeight - height[idx]) * (i - leftPillar - 1);
                }
            }

            st.push(i);
        }

        return result;
    }
}
