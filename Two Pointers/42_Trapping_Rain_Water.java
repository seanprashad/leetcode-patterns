class Solution {
    public int trap(int[] height) {
        if (height == null || height.length <= 2) {
            return 0;
        }

        int water = 0, currIdx = 0;
        Stack<Integer> st = new Stack<>();

        while (currIdx < height.length) {
            while (!st.isEmpty() && height[currIdx] > height[st.peek()]) {
                int poppedElement = st.pop();

                // If the stack is empty, it is implied that we are at the first
                // peak in the array, of which there is no left boundary, or similar
                if (st.isEmpty()) {
                    break;
                }

                // st.peek() will represent the left pillar, whilst currIdx will
                // represent the right pillar. -1 is for array indexes starting at 0
                int distance = currIdx - st.peek() - 1;
                int minHeight = Math.min(height[currIdx], height[st.peek()]) - height[poppedElement];

                water += distance * minHeight;
            }

            st.push(currIdx);
            ++currIdx;
        }

        return water;
    }
}