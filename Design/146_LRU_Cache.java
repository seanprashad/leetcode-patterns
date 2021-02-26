class LRUCache {
    private class DLLNode {
        private int key, value;
        private DLLNode next, prev;

        public DLLNode() {
            key = -1;
            value = -1;

            next = null;
            prev = null;
        }

        public DLLNode(int k, int v) {
            key = k;
            value = v;

            next = null;
            prev = null;
        }
    }

    private DLLNode head, tail;
    private Map<Integer, DLLNode> hm;
    private int cap, size;

    public LRUCache(int capacity) {
        cap = capacity;
        size = 0;

        hm = new HashMap<>();

        head = new DLLNode();
        tail = new DLLNode();

        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if (!hm.containsKey(key)) {
            return -1;
        }

        DLLNode node = hm.get(key);
        moveToHead(node);
        return node.value;
    }

    public void put(int key, int value) {
        if (hm.containsKey(key)) {
            DLLNode node = hm.get(key);
            node.value = value;
            hm.put(key, node);
            moveToHead(node);
            return;
        }

        DLLNode node = new DLLNode(key, value);
        hm.put(key, node);
        moveToHead(node);
        ++size;

        if (size > cap) {
            remove(tail.prev);
            --size;
        }
    }

    private void remove(DLLNode node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;

        hm.remove(node.key);
    }

    private void moveToHead(DLLNode node) {
        if (node.prev != null) {
            node.prev.next = node.next;
        }

        if (node.next != null) {
            node.next.prev = node.prev;
        }

        node.next = head.next;
        node.prev = head;

        head.next.prev = node;
        head.next = node;
    }
}
