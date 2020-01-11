class MinStack {
    private int minVal;
    private Stack<Integer> s;

    /** initialize your data structure here. */
    public MinStack() {
        minVal = Integer.MAX_VALUE;
        s = new Stack<>();
    }

    public void push(int x) {
        if (x <= minVal) {
            s.push(minVal);
            minVal = x;
        }

        s.push(x);
    }

    public void pop() {
        int topOfStack = s.pop();
        if (minVal == topOfStack) {
            minVal = s.pop();
        }
    }

    public int top() {
        return s.peek();
    }

    public int getMin() {
        return minVal;
    }
}
