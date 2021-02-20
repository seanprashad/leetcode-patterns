class MyHashMap {
    private class Node {
        private int key, value;

        public Node(int k, int v) {
            key = k;
            value = v;
        }
    }

    private Node[] map;
    private int size, maxSize;
    private double loadCapacity;

    /** Initialize your data structure here. */
    public MyHashMap() {
        size = 0;
        maxSize = 512;
        loadCapacity = 0.66;
        map = new Node[maxSize];
    }

    private int getHash(int key) {
        return key % map.length;
    }

    private void resize() {
        if (size < (int) (maxSize * loadCapacity)) {
            return;
        }

        maxSize *= 2;
        size = 0;

        Node[] temp = map;
        map = new Node[maxSize];

        for (Node n : temp) {
            if (n == null || n.key == -1) {
                continue;
            }
            put(n.key, n.value);
        }
    }

    /** value will always be non-negative. */
    public void put(int key, int value) {
        int idx = getHash(key);

        while (map[idx] != null && map[idx].key != key) {
            ++idx;
            idx %= maxSize;
        }

        if (map[idx] != null) {
            map[idx].value = value;
            return;
        }

        map[idx] = new Node(key, value);
        ++size;

        resize();
    }

    /**
     * Returns the value to which the specified key is mapped, or -1 if this map
     * contains no mapping for the key
     */
    public int get(int key) {
        int idx = getHash(key);

        while (map[idx] != null) {
            if (map[idx].key == key) {
                return map[idx].value;
            }

            ++idx;
            idx %= maxSize;
        }

        return -1;
    }

    /**
     * Removes the mapping of the specified value key if this map contains a mapping
     * for the key
     */
    public void remove(int key) {
        int idx = getHash(key);

        while (map[idx] != null) {
            if (map[idx].key == key) {
                // Mark the current spot as "deleted" since we
                // might have had multiple collisions for keys
                // that should have came before it and are placed
                // after it since we're using Linear Probing!
                map[idx] = new Node(-1, -1);
                --size;

                return;
            }

            ++idx;
            idx %= maxSize;
        }
    }
}
