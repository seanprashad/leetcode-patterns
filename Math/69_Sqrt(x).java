class Solution {
    public int mySqrt(int x) {
        if (x < 2) {
            return x;
        }

        int left = 2, right = x / 2;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            long midSquared = (long) mid * mid;

            if (midSquared == x) {
                return mid;
            } else if (midSquared < x) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return right;
    }
}
