class MaxStack {
    private Stack<Integer> st, maxSt;

    public MaxStack() {
        st = new Stack<>();
        maxSt = new Stack<>();
    }

    public void push(int x) {
        int max = maxSt.isEmpty() ? Integer.MIN_VALUE : maxSt.peek();
        max = Math.max(max, x);

        st.push(x);
        maxSt.push(max);
    }

    public int pop() {
        maxSt.pop();
        return st.pop();
    }

    public int top() {
        return st.peek();
    }

    public int peekMax() {
        return maxSt.peek();
    }

    public int popMax() {
        int max = peekMax();

        Stack<Integer> buffer = new Stack<>();

        while (top() != max) {
            buffer.push(pop());
        }
        pop();
        while (!buffer.isEmpty()) {
            push(buffer.pop());
        }

        return max;
    }
}
