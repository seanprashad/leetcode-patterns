class MedianFinder {
    private PriorityQueue<Integer> minHeap, maxHeap;
    boolean isEven;

    public MedianFinder() {
        minHeap = new PriorityQueue<>();
        maxHeap = new PriorityQueue<>((a, b) -> b - a);
        isEven = true;
    }

    public void addNum(int num) {
        if (isEven) {
            maxHeap.offer(num);
            minHeap.offer(maxHeap.poll());
        } else {
            minHeap.offer(num);
            maxHeap.offer(minHeap.poll());
        }

        isEven = !isEven;
    }

    public double findMedian() {
        if (isEven) {
            return (double) (maxHeap.peek() + minHeap.peek()) / 2;
        } else {
            return minHeap.peek();
        }
    }
}
