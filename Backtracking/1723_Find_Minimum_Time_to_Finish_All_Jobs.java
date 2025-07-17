class Solution {
    int result = Integer.MAX_VALUE;

    public int minimumTimeRequired(int[] jobs, int k) {
        Arrays.sort(jobs);
        int[] workers = new int[k];

        minimumTimeRequiredHelper(jobs, workers, jobs.length - 1);
        return result;
    }

    private void minimumTimeRequiredHelper(int[] jobs, int[] workers, int idx) {
        if (idx < 0) {
            result = Math.min(result, findMaxValue(workers));
            return;
        }

        if (findMaxValue(workers) > result) { return; }

        for (int i = 0; i < workers.length; i++) {
            if (i > 0 && workers[i] == workers[i - 1]) { continue; }
            workers[i] += jobs[idx];
            minimumTimeRequiredHelper(jobs, workers, idx - 1);
            workers[i] -= jobs[idx];
        }
    }

    private int findMaxValue(int[] workers) {
        int result = Integer.MIN_VALUE;

        for (int worker : workers) {
            result = Math.max(result, worker);
        }

        return result;
    }
}
