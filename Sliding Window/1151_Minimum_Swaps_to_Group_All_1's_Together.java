class Solution {
    public int minSwaps(int[] data) {
        int onesCount = 0;

        for (int d : data) {
            onesCount += d;
        }

        int left = 0, right = 0, maxOnesWindow = 0, result = 0;

        while (right < data.length) {
            maxOnesWindow += data[right];
            ++right;

            if (right - left > onesCount) {
                maxOnesWindow -= data[left];
                ++left;
            }

            if (right - left == onesCount) {
                result = Math.max(result, maxOnesWindow);
            }
        }

        return onesCount - result;
    }
}
