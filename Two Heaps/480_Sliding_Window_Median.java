class Solution {
    public double[] medianSlidingWindow(int[] nums, int k) {
        Comparator<Integer> comparator = (i, j) -> nums[i] != nums[j] ? Integer.compare(nums[i], nums[j]) : i - j;

        TreeSet<Integer> lower = new TreeSet<>(comparator.reversed());
        TreeSet<Integer> upper = new TreeSet<>(comparator);
        double[] result = new double[nums.length - k + 1];
        int idx = 0;

        for (int i = 0; i < k; i++) {
            lower.add(i);
        }

        balance(lower, upper);
        result[idx] = getMedian(lower, upper, nums, k);
        ++idx;

        for (int i = k; i < nums.length; i++) {
            int idxToRemove = i - k;

            if (!upper.remove(idxToRemove)) {
                lower.remove(idxToRemove);
            } else {
                upper.remove(idxToRemove);
            }

            upper.add(i);
            lower.add(upper.pollFirst());

            balance(lower, upper);
            result[idx] = getMedian(lower, upper, nums, k);
            ++idx;
        }

        return result;
    }

    private void balance(TreeSet<Integer> lower, TreeSet<Integer> upper) {
        while (lower.size() > upper.size()) {
            upper.add(lower.pollFirst());
        }
    }

    private double getMedian(TreeSet<Integer> lower, TreeSet<Integer> upper, int[] nums, int k) {
        if (k % 2 == 0) {
            return ((double) nums[lower.first()] + nums[upper.first()]) / 2;
        } else {
            return (double) nums[upper.first()];
        }
    }
}
