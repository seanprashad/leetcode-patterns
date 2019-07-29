class Solution {
    public int leastInterval(char[] tasks, int n) {
        if (tasks == null || tasks.length == 0) {
            return 0;
        }

        Map<Character, Integer> hm = new HashMap<>();
        int maxFreq = Integer.MIN_VALUE;

        for (char c : tasks) {
            hm.put(c, hm.getOrDefault(c, 0) + 1);
            maxFreq = Math.max(maxFreq, hm.get(c));
        }

        int cpuCycles = (maxFreq - 1) * (n + 1);

        for (int value : hm.values()) {
            if (maxFreq == value) {
                ++cpuCycles;
            }
        }

        return Math.max(cpuCycles, tasks.length);
    }
}
