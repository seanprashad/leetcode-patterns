class Solution {
    public int[][] intervalIntersection(int[][] A, int[][] B) {
        if (A == null || A.length == 0 || B == null || B.length == 0) {
            return new int[][] {};
        }

        List<int[]> result = new ArrayList<>();
        int i = 0, j = 0;

        while (i < A.length && j < B.length) {
            int startMax = Math.max(A[i][0], B[j][0]);
            int endMin = Math.min(A[i][1], B[j][1]);

            if (startMax <= endMin) {
                result.add(new int[] { startMax, endMin });
            }

            if (A[i][1] == endMin) {
                ++i;
            } else {
                ++j;
            }
        }

        return result.toArray(new int[result.size()][2]);
    }
}
