class Solution {
    public int maximalRectangle(char[][] matrix) {
        if (matrix == null || matrix.length == 0) {
            return 0;
        }

        int[] heights = new int[matrix[0].length];
        int max = 0;

        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == '0') {
                    heights[j] = 0;
                } else {
                    heights[j] += 1;
                }
            }

            int area = largestRectangleArea(heights);
            max = Math.max(max, area);
        }

        return max;
    }

    private int largestRectangleArea(int[] heights) {
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
