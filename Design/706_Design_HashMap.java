class MyHashMap {
    private class Node {
        private int key, value;

        public Node(int k, int v) {
            key = k;
            value = v;
        }
    }

    private Node[] m;
    private int size, capacity;
    private static final double LOAD_CAPACITY = 0.66;

    public MyHashMap() {
        size = 0;
        capacity = 5000;
        m = new Node[capacity];
    }

    private int getHash(int key) {
        return key % capacity;
    }

    private void resize() {
        if (size <= LOAD_CAPACITY * capacity) {
            return;
        }

        size = 0;
        capacity *= 2;

        Node[] temp = m;
        m = new Node[capacity];

        for (int i = 0; i < temp.length; i++) {
            if (temp[i] == null || temp[i].key == -1) {
                continue;
            }
            put(temp[i].key, temp[i].value);
        }
    }

    public void put(int key, int value) {
        int idx = getHash(key);

        while (m[idx] != null) {
            if (m[idx].key == key) {
                m[idx].value = value;
                return;
            }

            ++idx;
            idx %= capacity;
        }

        m[idx] = new Node(key, value);
        ++size;

        resize();
    }

    public int get(int key) {
        int idx = getHash(key);

        while (m[idx] != null) {
            if (m[idx].key == key) {
                return m[idx].value;
            }

            ++idx;
            idx %= capacity;
        }

        return -1;
    }

    /**
     * Removes the mapping of the specified value key if this map contains a mapping
     * for the key
     */
    public void remove(int key) {
        int idx = getHash(key);

        while (m[idx] != null) {
            if (m[idx].key == key) {
                m[idx] = new Node(-1, -1);
                --size;
                return;
            }

            ++idx;
            idx %= capacity;
        }
    }
}
