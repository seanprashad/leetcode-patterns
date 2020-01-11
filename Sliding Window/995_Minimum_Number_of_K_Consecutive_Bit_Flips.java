class Solution {
    public int minKBitFlips(int[] A, int K) {
        if (A == null || A.length == 0) {
            return 0;
        }

        int result = 0, lastFlipIdx = A.length - K;

        for (int i = 0; i <= lastFlipIdx; i++) {
            if (A[i] == 1) {
                continue;
            }
            ++result;

            for (int j = 0; j < K; j++) {
                A[i + j] ^= 1;
            }
        }

        for (int i = lastFlipIdx + 1; i < A.length; i++) {
            if (A[i] == 0) {
                return -1;
            }
        }

        return result;
    }
}
