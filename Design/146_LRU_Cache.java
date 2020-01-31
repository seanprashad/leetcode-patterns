class LRUCache {
    private static class DLLNode {
        private DLLNode next, prev;
        private int key;
        private int value;

        public DLLNode(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    private int capacity;
    private DLLNode head, tail;
    private Map<Integer, DLLNode> hm;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        hm = new HashMap<>();

        head = tail = new DLLNode(-1, -1);
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        DLLNode node = hm.get(key);
        if (node == null) {
            return -1;
        }

        moveNodeToHead(node);
        return node.value;
    }

    public void put(int key, int value) {
        DLLNode node = hm.get(key);

        if (node != null) {
            node.value = value;
            moveNodeToHead(node);
            return;
        }

        node = new DLLNode(key, value);
        hm.put(key, node);
        addNode(node);

        if (hm.size() > capacity) {
            hm.remove(tail.prev.key);
            removeTail(tail.prev);
        }
    }

    private void moveNodeToHead(DLLNode node) {
        removeNode(node);
        addNode(node);
    }

    private void removeTail(DLLNode node) {
        removeNode(node);
    }

    private void addNode(DLLNode node) {
        node.next = head.next;
        node.prev = head;

        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(DLLNode node) {
        if (node == null) {
            return;
        }

        DLLNode prev = node.prev;
        DLLNode next = node.next;

        prev.next = next;
        next.prev = prev;
    }
}
