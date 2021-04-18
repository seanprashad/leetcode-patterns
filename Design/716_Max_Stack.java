class MaxStack {
    private Deque<Integer> dq;
    private PriorityQueue<Integer> pq;

    public MaxStack() {
        dq = new ArrayDeque<>();
        pq = new PriorityQueue<>(Collections.reverseOrder());
    }

    public void push(int x) {
        dq.offerLast(x);
        pq.offer(x);
    }

    public int pop() {
        int x = dq.pollLast();
        pq.remove(x);
        return x;
    }

    public int top() {
        return dq.peekLast();
    }

    public int peekMax() {
        return pq.peek();
    }

    public int popMax() {
        int x = pq.poll();
        dq.removeLastOccurrence(x);
        return x;
    }
}
