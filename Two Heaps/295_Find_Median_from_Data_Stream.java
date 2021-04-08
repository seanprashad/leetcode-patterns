class MedianFinder {
    Queue<Integer> lower, upper;

    public MedianFinder() {
        lower = new PriorityQueue<>(Collections.reverseOrder());
        upper = new PriorityQueue<>();
    }

    public void addNum(int num) {
        upper.offer(num);
        lower.offer(upper.poll());

        if (lower.size() > upper.size()) {
            upper.offer(lower.poll());
        }
    }

    public double findMedian() {
        return lower.size() == upper.size() ? ((double) lower.peek() + upper.peek()) / 2.0 : (double) upper.peek();
    }
}
