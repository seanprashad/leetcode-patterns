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
        boolean contains = hm.containsKey(val);

        if (contains) {
            return false;
        }

        keys.add(val);
        hm.put(val, hm.getOrDefault(val, 0) + 1);
        return true;
    }

    /**
     * Removes a value from the set. Returns true if the set contained the specified
     * element.
     */
    public boolean remove(int val) {
        boolean contains = hm.containsKey(val);

        if (!contains) {
            return false;
        }

        keys.remove(new Integer(val));
        hm.remove(val);
        return true;
    }

    /** Get a random element from the set. */
    public int getRandom() {
        ;
        return keys.get(generator.nextInt(hm.size()));
    }
}
