class RandomizedSet {
    HashMap<Integer, Integer> hm;
    ArrayList<Integer> keys;
    Random generator;

    /** Initialize your data structure here. */
    public RandomizedSet() {
        hm = new HashMap<Integer, Integer>();
        keys = new ArrayList<Integer>();
        generator = new Random();
    }

    /**
     * Inserts a value to the set. Returns true if the set did not already contain
     * the specified element.
     */
    public boolean insert(int val) {
        if (hm.containsKey(val)) {
            return false;
        }

        hm.put(val, keys.size());
        keys.add(val);
        return true;
    }

    /**
     * Removes a value from the set. Returns true if the set contained the specified
     * element.
     */
    public boolean remove(int val) {
        if (!hm.containsKey(val)) {
            return false;
        }

        int removeIdx = hm.get(val);

        if (removeIdx < keys.size() - 1) {
            int lastVal = keys.get(keys.size() - 1);
            keys.set(removeIdx, lastVal);
            hm.put(lastVal, removeIdx);
        }

        keys.remove(keys.size() - 1);
        hm.remove(val);
        return true;
    }

    /** Get a random element from the set. */
    public int getRandom() {
        return keys.get(generator.nextInt(hm.size()));
    }
}
