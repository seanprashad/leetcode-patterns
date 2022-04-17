class Solution {
    public double myPow(double x, int n) {
        double result = 1;
        long N = Math.abs((long) n);

        if (n < 0) {
            x = 1.0 / x;
        }

        while (N > 0) {
            if (N % 2 != 0) {
                result *= x;
            }

            N >>= 1;
            x *= x;
        }

        return result;
    }
}
