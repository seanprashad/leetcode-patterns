class MedianFinder {
    PriorityQueue<Integer> p1, p2;

    /** initialize your data structure here. */
    public MedianFinder() {
        p1 = new PriorityQueue<>(Collections.reverseOrder());
        p2 = new PriorityQueue<>();
    }

    public void addNum(int num) {
        if (p1.isEmpty() || p1.peek() > num) {
            p1.offer(num);
        } else {
            p2.offer(num);
        }

        if (p1.size() > p2.size() + 1) {
            p2.offer(p1.poll());
        } else if (p2.size() > p1.size() + 1) {
            p1.offer(p2.poll());
        }
    }

    public double findMedian() {
        if (p1.size() == p2.size()) {
            return (double) (p1.peek() + p2.peek()) / 2.0;
        } else if (p1.size() > p2.size()) {
            return (double) p1.peek();
        } else {
            return (double) p2.peek();
        }
    }
}
