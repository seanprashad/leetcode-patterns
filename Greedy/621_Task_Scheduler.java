class Solution {
    public int leastInterval(char[] tasks, int n) {
        int result = 0;

        int[] map = new int[26];
        for (char t : tasks) {
            if (t > 0) {
                map[t - 'A']++;
            }
        }

        Arrays.sort(map);

        while (map[25] > 0) {
            int iterations = 0;

            while (iterations <= n) {
                if (map[25] == 0) {
                    break;
                }

                if (iterations < 26 && map[25 - iterations] > 0) {
                    map[25 - iterations]--;
                }

                ++iterations;
                ++result;
            }

            Arrays.sort(map);
        }

        return result;
    }
}
