class MaxStack {
    private Stack<Integer> stack, maxStack;

    public MaxStack() {
        stack = new Stack<>();
        maxStack = new Stack<>();
    }

    public void push(int x) {
        int tempMax = maxStack.isEmpty() ? Integer.MIN_VALUE : maxStack.peek();

        if (x > tempMax) {
            tempMax = x;
        }

        maxStack.push(tempMax);
        stack.push(x);
    }

    public int pop() {
        maxStack.pop();
        return stack.pop();
    }

    public int top() {
        return stack.peek();
    }

    public int peekMax() {
        return maxStack.peek();
    }

    public int popMax() {
        int max = peekMax();

        Stack<Integer> buffer = new Stack<>();

        while (stack.peek() != max) {
            buffer.push(stack.pop());
            maxStack.pop();
        }

        pop();

        while (!buffer.isEmpty()) {
            push(buffer.pop());
        }
        return max;
    }
}
