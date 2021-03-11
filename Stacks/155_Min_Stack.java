class MinStack {
    Stack<Integer> st, minSt;

    public MinStack() {
        st = new Stack<>();
        minSt = new Stack<>();
    }

    public void push(int x) {
        int minVal = minSt.isEmpty() || minSt.peek() > x ? x : minSt.peek();

        st.push(x);
        minSt.push(minVal);
    }

    public void pop() {
        minSt.pop();
        st.pop();
    }

    public int top() {
        return st.isEmpty() ? Integer.MAX_VALUE : st.peek();
    }

    public int getMin() {
        return minSt.isEmpty() ? Integer.MIN_VALUE : minSt.peek();
    }
}
