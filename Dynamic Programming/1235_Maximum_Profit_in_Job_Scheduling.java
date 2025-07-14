class Solution {
    private class Job {
        private int start, end, profit;

        public Job(int s, int e, int p) {
            start = s;
            end = e;
            profit = p;
        }
    }

    public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {
        List<Job> jobs = new ArrayList<>();

        for (int i = 0; i < startTime.length; i++) {
            jobs.add(new Job(startTime[i], endTime[i], profit[i]));
        }

        jobs.sort(Comparator.comparingInt(j -> j.end));
        
        int[] dp = new int[jobs.size()];
        dp[0] = jobs.get(0).profit;
        
        for (int i = 1; i < jobs.size(); i++) {
            int potentialProfit = jobs.get(i).profit;

            int idx = binarySearch(jobs, i);
            if (idx != -1) {
                potentialProfit += dp[idx];
            }

            dp[i] = Math.max(dp[i - 1], potentialProfit);
        }

        return dp[jobs.size() - 1];
    }

    private int binarySearch(List<Job> jobs, int idx) {
        int low = 0, high = idx - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (jobs.get(mid).end <= jobs.get(idx).start) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return high;
    }
}
