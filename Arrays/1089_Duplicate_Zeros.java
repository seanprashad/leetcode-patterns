class Solution {
    public void duplicateZeros(int[] arr) {
        if (arr == null || arr.length == 0) {
            return;
        }

        int zeroCount = 0;

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == 0) {
                ++zeroCount;
            }
        }

        for (int i = arr.length - 1, j = arr.length + zeroCount - 1; i < j; i--, j--) {
            if (arr[i] == 0) {
                if (j < arr.length) {
                    arr[j] = 0;
                }

                --j;

                if (j < arr.length) {
                    arr[j] = 0;
                }
            } else {
                if (j < arr.length) {
                    arr[j] = arr[i];
                }
            }
        }
    }
}
