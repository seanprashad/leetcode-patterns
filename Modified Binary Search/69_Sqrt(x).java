class Solution {
    public int mySqrt(int x) {
        if (x < 2) {
            return x;
        }

        int low = 1, high = x;

        while (low <= high) {
            int mid = low + ((high - low) / 2);

            long squaredVal = (long) mid * mid;

            if (squaredVal == x) {
                return mid;
            } else if (squaredVal > x) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return low - 1;
    }
}
