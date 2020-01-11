class Solution {
    public int trap(int[] height) {
        if (height == null || height.length <= 2) {
            return 0;
        }

        int sum = 0, left = 0, right = height.length - 1;
        int leftMax = Integer.MIN_VALUE, rightMax = Integer.MIN_VALUE;

        while (left < right) {
            leftMax = Math.max(leftMax, height[left]);
            rightMax = Math.max(rightMax, height[right]);

            if (leftMax < rightMax) {
                sum += leftMax - height[left++];
            } else {
                sum += rightMax - height[right--];
            }
        }

        return sum;
    }
}
