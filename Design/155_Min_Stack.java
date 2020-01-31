class MinStack {
    private int minVal;
    private Stack<Integer> s;

    public MinStack() {
        minVal = Integer.MAX_VALUE;
        s = new Stack<>();
    }

    public void push(int x) {
        // Push the previous min value when we add a smaller one
        // to later be able to retrieve the previous min value
        // when popping off from the stack
        if (x <= minVal) {
            s.push(minVal);
            minVal = x;
        }

        s.push(x);
    }

    public void pop() {
        int topOfStack = s.pop();

        // If the top of the stack is the current minimum, we need to pop
        // from the stack another time to retrieve the previous minimum value
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
