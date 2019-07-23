class MinStack {
    int minimum = Integer.MAX_VALUE;
    Stack<Integer> stack = new Stack<Integer>();

    public void push(int x) {
        if (x <= minimum) {
            stack.push(minimum);
            minimum = x;
        }

        stack.push(x);
    }

    public void pop() {
        if (stack.pop() == minimum) {
            minimum = stack.pop();
        }
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minimum;
    }
}
