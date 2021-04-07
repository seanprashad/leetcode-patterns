class Solution {
    public int minTaps(int n, int[] ranges) {
        int[] garden = new int[ranges.length];

        for (int i = 0; i < ranges.length; i++) {
            if (ranges[i] == 0) {
                continue;
            }

            int left = Math.max(0, i - ranges[i]);
            garden[left] = Math.max(garden[left], i + ranges[i]);
        }

        int idx = 0, farthest = garden[0], steps = 1;

        while (farthest < n) {
            int temp = 0;

            while (idx <= farthest) {
                temp = Math.max(temp, garden[idx]);
                ++idx;
            }

            if (temp <= farthest) {
                return -1;
            }

            farthest = temp;
            ++steps;
        }

        return steps;
    }
}
