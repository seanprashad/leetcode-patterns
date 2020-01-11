class Solution {
    public int maxArea(int[] height) {
        if (height == null || height.length < 2) {
            return 0;
        }

        int start = 0, end = height.length - 1;
        int maxArea = Integer.MIN_VALUE;

        while (start < end) {
            maxArea = Math.max(maxArea, Math.min(height[start], height[end]) * (end - start));

            if (height[start] < height[end]) {
                start++;
            } else {
                end--;
            }
        }

        return maxArea;
    }
}
