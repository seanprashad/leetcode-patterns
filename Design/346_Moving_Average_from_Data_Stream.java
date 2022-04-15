class MovingAverage {
    private Queue<Integer> q;
    private int sum;
    private int maxSize;

    public MovingAverage(int size) {
        q = new LinkedList<>();
        maxSize = size;
        sum = 0;
    }

    public double next(int val) {
        sum += val;
        q.offer(val);

        if (q.size() > maxSize) {
            sum -= q.poll();
        }

        return (double) sum / q.size();
    }
}
