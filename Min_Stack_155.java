import java.util.Stack;

public class Min_Stack_155 {
    public static class MinStack {
        int minimum = Integer.MAX_VALUE;
        Stack<Integer> stack = new Stack<Integer>();

        public MinStack() {
        }

        public void push(int x) {
            // If we have a new minimum or equal value,
            // push the old minimum onto the stack
            // then update the minimum and add it
            // to the stack
            if (x <= minimum) {
                stack.push(minimum);
                minimum = x;
            }

            stack.push(x);
        }

        public void pop() {
            // If the current minimum is at the top of the stack,
            // and the stack
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

    public static void main(String[] args) {
        MinStack stack = new MinStack();
        stack.push(1);
        System.out.println(stack.top() + " " + stack.getMin());
        stack.push(-1);
        System.out.println(stack.top() + " " + stack.getMin());
        stack.push(2);
        System.out.println(stack.top() + " " + stack.getMin());
        stack.push(-10);
        System.out.println(stack.top() + " " + stack.getMin());
        stack.pop();
        System.out.println(stack.top() + " " + stack.getMin());
        stack.pop();
        System.out.println(stack.top() + " " + stack.getMin());

        return;
    }
}
