class MedianFinder {
    PriorityQueue<Integer> lower, upper;

    public MedianFinder() {
        lower = new PriorityQueue<>(Comparator.reverseOrder());
        upper = new PriorityQueue<>();
    }

    public void addNum(int num) {
        lower.offer(num);
        upper.offer(lower.poll());

        if (lower.size() < upper.size()) {
            lower.offer(upper.poll());
        }
    }

    public double findMedian() {
        return lower.size() == upper.size() ? (double) (lower.peek() + upper.peek()) / 2 : lower.peek();
    }
}
