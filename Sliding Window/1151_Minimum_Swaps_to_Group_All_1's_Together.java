class Solution {
    public int minSwaps(int[] data) {
        if (data == null || data.length == 0) {
            return 0;
        }

        int windowSize = 0;

        for (int d : data) {
            if (d == 1) {
                ++windowSize;
            }
        }

        int result = 0, onesCount = 0;
        int left = 0, right = 0;

        while (right < data.length) {
            onesCount += data[right];
            ++right;

            if (right - left > windowSize) {
                onesCount -= data[left];
                ++left;
            }

            result = Math.max(result, onesCount);
        }

        return windowSize - result;
    }
}
