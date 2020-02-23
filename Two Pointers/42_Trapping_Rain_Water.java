class Solution {
    public int trap(int[] height) {
        if (height == null || height.length == 0) {
            return 0;
        }

        int leftMax = 0, rightMax = 0;
        int left = 0, right = height.length - 1;
        int water = 0;

        while (left < right) {
            leftMax = Math.max(leftMax, height[left]);
            rightMax = Math.max(rightMax, height[right]);

            if (leftMax < rightMax) {
                water += leftMax - height[left];
                ++left;
            } else {
                water += rightMax - height[right];
                --right;
            }
        }

        return water;
    }
}
