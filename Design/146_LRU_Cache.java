class LRUCache {
    private class Node {
        private int key, value;
        private Node next, prev;

        public Node() {
            key = 0;
            value = 0;
        }

        public Node(int k, int v) {
            key = k;
            value = v;
        }
    }

    private int capacity, currSize;
    private Node head, tail;
    private Map<Integer, Node> map;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        currSize = 0;
        map = new HashMap<>();
        head = new Node();
        tail = new Node();
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if (!map.containsKey(key)) {
            return -1;
        }

        Node n = map.get(key);
        update(n);
        return n.value;
    }

    public void put(int key, int value) {
        Node n = map.get(key);

        if (n == null) {
            n = new Node(key, value);
            map.put(key, n);
            add(n);
            ++currSize;
        } else {
            n.value = value;
            map.put(key, n);
            update(n);
        }

        if (currSize > capacity) {
            Node toDelete = tail.prev;
            remove(toDelete);
            map.remove(toDelete.key);
            --currSize;
        }
    }

    private void update(Node n) {
        remove(n);
        add(n);
    }

    private void remove(Node n) {
        Node before = n.prev, after = n.next;
        before.next = after;
        after.prev = before;
    }

    private void add(Node n) {
        Node after = head.next;

        head.next = n;
        n.prev = head;
        n.next = after;
        after.prev = n;
    }
}
