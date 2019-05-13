import java.util.Stack;

public class Queue_Using_Two_Stacks<T> {
    private Stack<T> s1, s2;

    public Queue_Using_Two_Stacks() {
        s1 = new Stack<T>();
        s2 = new Stack<T>();
    }

    public boolean isEmpty() {
        return s1.isEmpty() && s2.isEmpty();
    }

    public int size() {
        return s1.size() + s2.size();
    }

    public void enqueue(T item) {
        s1.push(item);
    }

    public T dequeue() {
        if (s2.empty()) {
            while (!s1.empty()) {
                s2.push(s1.pop());
            }
        }
        return s2.pop();
    }

    public T front() {
        if (s2.empty()) {
            while (!s1.empty()) {
                s2.push(s1.pop());
            }
        }
        return s2.peek();
    }

    public static void main(String[] args) {
        Queue_Using_Two_Stacks<Integer> q = new Queue_Using_Two_Stacks<Integer>();

        System.out.println("Is the queue empty? " + q.isEmpty());

        q.enqueue(1);
        System.out.println("Is the queue empty? " + q.isEmpty());
        System.out.println("Queue should have 1 in the front: " + q.front());

        q.dequeue();
        System.out.println("Is the queue empty? " + q.isEmpty());

        q.enqueue(2);
        q.enqueue(3);
        q.enqueue(4);
        q.enqueue(5);

        System.out.println("Queue size is now: " + q.size());
        System.out.println("Queue should have 2 in the front: " + q.front());

        q.dequeue();
        System.out.println("Queue size is now: " + q.size());
        System.out.println("Queue should have 3 in the front: " + q.front());

        return;
    }
}