class Solution {
    public int trap(int[] height) {
        if (height == null || height.length == 0) {
            return 0;
        }

        int water = 0;
        int leftMax = height[0], rightTallest = height[height.length - 1];
        int[] leftMaxes = new int[height.length];

        for (int i = 0; i < height.length; i++) {
            leftMax = Math.max(leftMax, height[i]);
            leftMaxes[i] = leftMax;
        }

        for (int i = height.length - 1; i >= 0; i--) {
            rightTallest = Math.max(rightTallest, height[i]);

            int leftTallest = Math.min(rightTallest, leftMaxes[i]);
            if (leftTallest > height[i]) {
                water += leftTallest - height[i];
            }
        }

        return water;
    }
}
