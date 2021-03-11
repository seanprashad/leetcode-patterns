class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        int max = 0;
        Stack<Integer> s = new Stack<>();

        for (int i = 0; i <= n; i++) {
            int h = i == n ? 0 : heights[i];

            while (!s.isEmpty() && heights[s.peek()] > h) {
                int currHeight = heights[s.pop()];
                int leftBoundary = s.isEmpty() ? -1 : s.peek();
                int rightBoundary = i - 1;
                max = Math.max(max, currHeight * (rightBoundary - leftBoundary));
            }

            s.push(i);
        }

        return max;
    }
}
