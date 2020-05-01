class Solution {
    public int getSum(int a, int b) {
        while (b != 0) {
            int carry = a & b;
            int xor = a ^ b;

            a = xor;
            b = carry << 1;
        }

        return a;
    }
}
